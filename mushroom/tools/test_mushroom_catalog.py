"""验证来源照片筛选与详情分组，不依赖生产数据及下载文件。"""

import copy
import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from mushroom_app import image_repository, services
from mushroom_app.detail_sections import build_detail_sections
from mushroom_app.models import GalleryQuery


def sample_row(mushroom_id, latin_name, name="目标菌", record_type="物种记录"):
    """使用虚构记录，避免测试夹具被误认为真实物种结论。"""
    return {
        "编号": mushroom_id, "名称": name, "拉丁名": latin_name,
        "记录类型": record_type, "是否有毒性": "毒性未知",
        "是否可食用": "有食用记载（测试文献）",
    }


class MushroomCatalogPhotoTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.data_dir = Path(temporary.name)
        self.rows = []
        self.photos = []
        for target, name, value in (
            (image_repository, "DATA_DIR", self.data_dir),
            (services, "read_mushroom_rows", None),
            (services, "find_mushroom_image_name", None),
            (services, "find_mushroom_gallery_names", None),
        ):
            if name == "DATA_DIR":
                patcher = patch.object(target, name, value)
            else:
                returns = {"read_mushroom_rows": self.rows,
                           "find_mushroom_image_name": "旧素材.jpg",
                           "find_mushroom_gallery_names": ["image/旧素材.jpg"]}
                patcher = patch.object(target, name, return_value=returns[name])
            patcher.start()
            self.addCleanup(patcher.stop)

    def add_photo(self, mushroom_id, scientific_name, exists=True, **overrides):
        relative = f"image/downloaded/{mushroom_id}/sample.jpg"
        photo = {
            "mushroom_id": mushroom_id, "scientific_name": scientific_name,
            "path": relative, "url": "/" + relative,
            "author": "测试摄影者", "license": "CC BY 4.0",
            "license_url": "https://creativecommons.org/licenses/by/4.0/",
            "source_url": f"https://example.org/observation/{mushroom_id}",
            "source_title": "测试来源", "location_label": "测试地点",
            "identification_status": "测试夹具，不用于实物鉴定",
        }
        photo.update(overrides)
        if exists:
            destination = self.data_dir / relative
            destination.parent.mkdir(parents=True, exist_ok=True)
            # 本组只验证来源登记与文件存在性；不宣称完成图片解码校验。
            destination.write_bytes(b"fixture")
        self.photos.append(photo)
        return photo

    def write_manifest(self):
        (self.data_dir / "image_sources.json").write_text(
            json.dumps({"images": self.photos}, ensure_ascii=False), encoding="utf-8"
        )

    def test_default_query_does_not_build_photo_index_or_hide_unpictured_rows(self):
        self.rows.extend([sample_row("1", "Testus alpha"), sample_row("2", "Testus beta")])
        with patch.object(services, "get_mushroom_image_keys") as index:
            page = services.get_mushroom_page(GalleryQuery())
        index.assert_not_called()
        self.assertFalse(page.with_photo)
        self.assertEqual([item.id for item in page.items], ["1", "2"])
        self.assertEqual(page.total_count, 2)

    def test_photo_filter_requires_exact_id_and_scientific_name(self):
        self.rows.extend([
            sample_row(" 1 ", " Testus alpha "),
            sample_row("2", "Testus beta"),
            sample_row("3", "Testus alpha"),
            sample_row("4", "Testus delta"),
            sample_row("5", "Testus alpha var. minor"),
        ])
        for mushroom_id, scientific_name in (
            ("1", "Testus alpha"), ("2", "Testus alpha"),
            ("4", "testus delta"), ("5", "Testus alpha"),
        ):
            self.add_photo(mushroom_id, scientific_name)
        self.write_manifest()
        page = services.get_mushroom_page(GalleryQuery(with_photo=True))
        self.assertEqual([item.id for item in page.items], ["1"])
        self.assertEqual(page.items[0].image_url, "/image/downloaded/1/sample.jpg")
        self.assertEqual((page.total_count, page.total_pages, page.with_photo), (1, 1, True))

    def test_historical_common_and_alias_records_are_excluded_even_with_matching_photos(self):
        record_types = (
            "物种记录", "俗名集合", "俗名待鉴定", "别名条目",
            "中国历史种名待复核", "物种记录（历史定名须复核）",
        )
        for index, record_type in enumerate(record_types, 1):
            self.rows.append(sample_row(str(index), "Testus alpha", record_type=record_type))
            self.add_photo(str(index), "Testus alpha")
        self.write_manifest()
        page = services.get_mushroom_page(GalleryQuery(with_photo=True))
        self.assertEqual([item.id for item in page.items], ["1"])
        self.assertEqual(page.total_count, 1)

    def test_missing_invalid_and_legacy_only_images_do_not_inflate_photo_count(self):
        self.rows.extend(sample_row(str(index), "Testus alpha") for index in range(1, 5))
        good = self.add_photo("1", "Testus alpha")
        self.photos.append(dict(good))
        self.add_photo("2", "Testus alpha", exists=False)
        self.add_photo("3", "Testus alpha", license_url="file:///missing-license")
        self.write_manifest()
        self.assertEqual(image_repository.get_mushroom_image_keys(), {("1", "Testus alpha")})
        page = services.get_mushroom_page(GalleryQuery(with_photo=True))
        self.assertEqual([item.id for item in page.items], ["1"])
        self.assertEqual(page.total_count, 1)
        self.assertEqual(list(page.items[0].image_credits), [good["url"]])

    def test_deleted_photo_is_excluded_without_manifest_change(self):
        self.rows.append(sample_row("1", "Testus alpha"))
        photo = self.add_photo("1", "Testus alpha")
        self.write_manifest()
        self.assertEqual(services.get_mushroom_page(GalleryQuery(with_photo=True)).total_count, 1)
        (self.data_dir / photo["path"]).unlink()
        self.assertEqual(services.get_mushroom_page(GalleryQuery(with_photo=True)).total_count, 0)

    def test_empty_scientific_name_does_not_count_as_source_photo(self):
        self.rows.append(sample_row("1", ""))
        self.add_photo("1", "")
        self.write_manifest()
        self.assertEqual(image_repository.find_mushroom_image_credits("1", ""), [])
        page = services.get_mushroom_page(GalleryQuery(with_photo=True))
        self.assertEqual((page.items, page.total_count), ([], 0))

    def test_missing_manifest_returns_empty_first_page_without_building_cards(self):
        self.rows.append(sample_row("1", "Testus alpha"))
        with patch.object(services, "build_mushroom_item", wraps=services.build_mushroom_item) as builder:
            page = services.get_mushroom_page(GalleryQuery(with_photo=True, page=99))
        self.assertEqual((page.items, page.page, page.total_pages, page.total_count), ([], 1, 1, 0))
        builder.assert_not_called()

    def test_photo_category_keyword_filters_run_before_pagination(self):
        self.rows.extend(sample_row(str(index), f"Targetus species{index}") for index in range(1, 10))
        self.rows[2]["是否有毒性"] = "有中毒关联记录"
        self.rows[3].update({"名称": "其他菌", "拉丁名": "Otherus species4"})
        self.rows[6]["是否可食用"] = "食用性待核实"
        self.rows[7]["记录类型"] = "历史种名待核实"
        for row in self.rows:
            if row["编号"] != "2":
                self.add_photo(row["编号"], row["拉丁名"])
        self.write_manifest()
        for keyword, requested_page in ((" 目标 ", 2), (" TaRgEtUs ", 99)):
            with self.subTest(keyword=keyword, page=requested_page), \
                    patch.object(services, "PAGE_SIZE", 2), \
                    patch.object(services, "get_mushroom_image_keys", wraps=image_repository.get_mushroom_image_keys) as index, \
                    patch.object(services, "build_mushroom_item", wraps=services.build_mushroom_item) as builder:
                page = services.get_mushroom_page(GalleryQuery(
                    category="edible", keyword=keyword, page=requested_page, with_photo=True
                ))
                self.assertEqual([item.id for item in page.items], ["6", "9"])
                self.assertEqual((page.page, page.total_pages, page.total_count), (2, 2, 4))
                self.assertEqual((page.category, page.keyword, page.with_photo), ("edible", keyword.strip(), True))
                index.assert_called_once_with()
                self.assertEqual(builder.call_count, 2, "仅构造当前页的最终匹配条目")
        toxic = services.get_mushroom_page(GalleryQuery(category="toxic", keyword="目标", with_photo=True))
        self.assertEqual([item.id for item in toxic.items], ["3"])

    def test_detail_service_groups_every_non_identity_field(self):
        row = sample_row("1", "Testus alpha")
        row.update({"生长环境": " 测试生境 ", "参考价格": "无可比报价", "资料来源": "测试文献", "新增资料列": ""})
        self.rows.append(row)
        item = services.get_mushroom_detail("1")
        self.assertIsNotNone(item)
        expected = [{"label": key, "value": value.strip()} for key, value in row.items() if key not in {"编号", "名称"}]
        flattened = [field for section in item.detail_sections for field in section["fields"]]
        self.assertEqual(item.detail_fields, expected)
        self.assertCountEqual(flattened, expected)
        self.assertEqual(len(flattened), len(expected))


class MushroomDetailSectionTests(unittest.TestCase):
    def setUp(self):
        labels = (
            "拉丁名", "规范中文名", "记录类型", "科名", "分类与异名说明", "关联编号",
            "生长环境", "中国记录与分布", "识别特征", "近似种与鉴别局限", "红色名录评估（2018）",
            "是否有毒性", "是否可食用", "食用价值", "其他价值", "文献食药用途（2026）",
            "参考价格", "价格地区", "价格日期", "价格商品与口径", "价格来源",
            "资料来源", "来源定位", "字段核查状态", "核查日期", "图片核查状态",
        )
        self.fields = [{"label": label, "value": f" {label}原文 "} for label in reversed(labels)]
        self.fields.extend([{"label": "新增资料列", "value": "未被既有分组定义"}, {"label": "空值新列", "value": ""}])

    def test_all_fields_survive_exactly_once_without_changing_source_values(self):
        original = copy.deepcopy(self.fields)
        sections = build_detail_sections(self.fields)
        flattened = [field for section in sections for field in section["fields"]]
        self.assertCountEqual(flattened, original)
        self.assertEqual(len(flattened), len(original))
        self.assertEqual(self.fields, original)

    def test_expected_groups_and_initial_expansion_are_preserved(self):
        sections = build_detail_sections(self.fields)
        self.assertEqual([(section["id"], section["title"], section["expanded"]) for section in sections], [
            ("basic", "基本资料", True), ("habitat", "生境与识别", True),
            ("risk", "毒性与用途", True), ("price", "参考行情", False),
            ("sources", "来源与核查", False), ("other", "其他资料", True),
        ])

    def test_unknown_fields_keep_order_and_empty_values_in_other_group(self):
        other = build_detail_sections(self.fields)[-1]
        self.assertEqual(other["id"], "other")
        self.assertEqual(other["fields"], self.fields[-2:])

    def test_empty_and_partial_records_do_not_add_empty_groups(self):
        self.assertEqual(build_detail_sections([]), [])
        fields = [{"label": "生长环境", "value": ""}, {"label": "新增资料列", "value": "待补"}]
        sections = build_detail_sections(fields)
        self.assertEqual([section["id"] for section in sections], ["habitat", "other"])
        self.assertEqual([field for section in sections for field in section["fields"]], fields)


if __name__ == "__main__":
    unittest.main()
