"""验证云南精选的精确关联、照片排序与筛选，不使用真实物种夹具。"""

import copy
import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from pydantic import ValidationError

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from mushroom_app import image_repository, services
from mushroom_app.collections import repositories
from mushroom_app.collections.models import MushroomCollection
from mushroom_app.models import CollectionQuery, GalleryQuery


def sample_row(number, record_type="物种记录"):
    """虚构物种只用于校验数据关系与筛选行为。"""
    return {
        "编号": str(number), "名称": f"测试菌{number}",
        "拉丁名": f"Testus species{number}", "记录类型": record_type,
        "是否有毒性": "毒性未知", "是否可食用": "有食用记载（测试文献）",
    }


def sample_entry(number, **overrides):
    entry = {
        "id": str(number), "scientific_name": f"Testus species{number}",
        "group": "观察记录", "reason": f"测试精选理由{number}",
        "sources": [{"title": "测试来源", "url": "https://example.org/source"}],
    }
    entry.update(overrides)
    return entry


class YunnanCollectionTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.data_dir = Path(temporary.name)
        self.rows = []
        self.photos = []
        for target, name, value in (
            (image_repository, "DATA_DIR", self.data_dir),
            (repositories, "DATA_DIR", self.data_dir),
        ):
            patcher = patch.object(target, name, value)
            patcher.start()
            self.addCleanup(patcher.stop)
        for name, value in (
            ("read_mushroom_rows", self.rows),
            ("find_mushroom_image_name", "旧素材.jpg"),
            ("find_mushroom_gallery_names", ["image/旧素材.jpg"]),
        ):
            patcher = patch.object(services, name, return_value=value)
            patcher.start()
            self.addCleanup(patcher.stop)

    def write_collection(self, entries):
        payload = {
            "title": "云南常见菌", "description": "仅用于验证的精选清单",
            "updated_at": "2026-11-02", "entries": entries,
        }
        (self.data_dir / "yunnan-common.json").write_text(
            json.dumps(payload, ensure_ascii=False), encoding="utf-8"
        )
        return payload

    def add_photo(self, number, exists=True, **overrides):
        relative = f"image/downloaded/{number}/sample.jpg"
        photo = {
            "mushroom_id": str(number), "scientific_name": f"Testus species{number}",
            "path": relative, "url": "/" + relative,
            "author": "测试摄影者", "license": "CC BY 4.0",
            "license_url": "https://creativecommons.org/licenses/by/4.0/",
            "source_url": f"https://example.org/observation/{number}",
            "source_title": "测试来源", "location_label": "测试地点",
            "identification_status": "测试夹具，不用于实物鉴定",
        }
        photo.update(overrides)
        self.photos.append(photo)
        if exists:
            destination = self.data_dir / relative
            destination.parent.mkdir(parents=True, exist_ok=True)
            # 此处只检查来源登记和文件存在性，不宣称完成图片内容验证。
            destination.write_bytes(b"fixture")
        (self.data_dir / "image_sources.json").write_text(
            json.dumps({"images": self.photos}, ensure_ascii=False), encoding="utf-8"
        )
        return photo

    def test_photo_sort_precedes_pagination_and_preserves_collection_order(self):
        self.rows.extend(sample_row(number) for number in range(1, 9))
        order = [4, 2, 8, 1, 7, 3, 6, 5]
        self.write_collection([sample_entry(number) for number in order])
        for number in (3, 5, 7):
            self.add_photo(number)
        original_rows = copy.deepcopy(self.rows)
        actual = []
        for requested_page in range(1, 5):
            with patch.object(services, "PAGE_SIZE", 2), \
                    patch.object(services, "get_mushroom_image_keys", wraps=image_repository.get_mushroom_image_keys) as index, \
                    patch.object(services, "build_mushroom_item", wraps=services.build_mushroom_item) as builder:
                result = services.get_mushroom_page(GalleryQuery(collection="yunnan", page=requested_page))
            actual.extend(item.id for item in result.items)
            index.assert_called_once_with()
            self.assertEqual(builder.call_count, 2, "只构造本页条目")
            self.assertEqual((result.collection_total_count, result.collection_photo_count), (8, 3))
            self.assertEqual((result.collection, result.collection_title), ("yunnan", "云南常见菌"))
            self.assertEqual(result.collection_description, "仅用于验证的精选清单")
        self.assertEqual(actual, ["7", "3", "5", "4", "2", "8", "1", "6"])
        self.assertEqual(self.rows, original_rows)

    def test_photo_count_excludes_historical_common_alias_missing_and_invalid_files(self):
        kinds = ["物种记录", "历史种名待核实", "俗名集合", "别名条目", "物种记录", "物种记录"]
        self.rows.extend(sample_row(number, kind) for number, kind in enumerate(kinds, 1))
        self.write_collection([sample_entry(number) for number in (2, 3, 4, 5, 6, 1)])
        for number in range(1, 6):
            self.add_photo(number, exists=number != 5)
        self.add_photo(6, license_url="file:///invalid")
        page = services.get_mushroom_page(GalleryQuery(collection="yunnan"))
        self.assertEqual([item.id for item in page.items], ["1", "2", "3", "4", "5", "6"])
        self.assertEqual((page.collection_total_count, page.collection_photo_count), (6, 1))
        filtered = services.get_mushroom_page(GalleryQuery(collection="yunnan", with_photo=True))
        self.assertEqual([item.id for item in filtered.items], ["1"])

    def test_collection_requires_exact_id_and_scientific_name(self):
        self.rows.extend(sample_row(number) for number in range(1, 5))
        self.rows[0]["编号"] = " 1 "
        self.rows[0]["拉丁名"] = " Testus species1 "
        self.write_collection([
            sample_entry(1), sample_entry(2, scientific_name="Testus different"),
            sample_entry(3, scientific_name="testus species3"), sample_entry(99),
        ])
        page = services.get_mushroom_page(GalleryQuery(collection="yunnan"))
        self.assertEqual([item.id for item in page.items], ["1"])
        self.assertEqual(page.collection_total_count, 1)
        self.assertEqual(services.get_mushroom_detail("2").selection_sources, [])

    def test_search_category_and_photo_intersect_before_page_clamping(self):
        self.rows.extend(sample_row(number) for number in range(1, 9))
        self.rows[1]["是否有毒性"] = "有中毒关联记录"
        self.rows[2]["名称"] = "其他菌"
        self.rows[4]["是否可食用"] = "食用性待核实"
        self.write_collection([sample_entry(number) for number in range(8, 0, -1)])
        for number in range(1, 9):
            if number != 4:
                self.add_photo(number)
        with patch.object(services, "PAGE_SIZE", 2):
            page = services.get_mushroom_page(GalleryQuery(
                collection="yunnan", category="edible", keyword=" 测试菌 ", with_photo=True, page=99,
            ))
        self.assertEqual([item.id for item in page.items], ["6", "1"])
        self.assertEqual((page.page, page.total_pages, page.total_count), (2, 2, 4))
        self.assertEqual((page.collection_total_count, page.collection_photo_count), (8, 7))
        self.assertEqual(page.keyword, "测试菌")
        toxic = services.get_mushroom_page(GalleryQuery(collection="yunnan", category="toxic", keyword="sPeCiEs2"))
        self.assertEqual([item.id for item in toxic.items], ["2"])

    def test_empty_or_missing_collection_returns_empty_first_page(self):
        self.rows.append(sample_row(1))
        for empty_file in (False, True):
            if empty_file:
                self.write_collection([])
            with self.subTest(empty_file=empty_file), \
                    patch.object(services, "build_mushroom_item", wraps=services.build_mushroom_item) as builder:
                page = services.get_mushroom_page(GalleryQuery(collection="yunnan", page=99))
            self.assertEqual((page.items, page.page, page.total_pages, page.total_count), ([], 1, 1, 0))
            self.assertEqual((page.collection_total_count, page.collection_photo_count), (0, 0))
            builder.assert_not_called()

    def test_national_default_preserves_order_and_does_not_read_collection_or_photo_index(self):
        self.rows.extend([sample_row(2), sample_row(1)])
        self.write_collection([sample_entry(1)])
        with patch.object(services, "read_yunnan_collection") as collection, \
                patch.object(services, "get_mushroom_image_keys") as index:
            page = services.get_mushroom_page(GalleryQuery())
        collection.assert_not_called()
        index.assert_not_called()
        self.assertEqual([item.id for item in page.items], ["2", "1"])
        self.assertEqual(page.collection, "all")
        self.assertTrue(all(not item.selection_note for item in page.items))

    def test_detail_adds_selection_without_changing_risk_or_source_order(self):
        self.rows.append(sample_row(1))
        self.rows[0]["是否有毒性"] = "有毒"
        sources = [
            {"title": "来源乙", "url": "https://example.org/b"},
            {"title": "来源甲", "url": "https://example.org/a"},
        ]
        payload = self.write_collection([sample_entry(1, sources=sources)])
        original = copy.deepcopy(payload)
        for item in (services.get_mushroom_detail("1"), services.get_mushroom_page(GalleryQuery(collection="yunnan")).items[0]):
            self.assertEqual((item.selection_group, item.selection_note), ("观察记录", "测试精选理由1"))
            self.assertEqual([source.model_dump(mode="json") for source in item.selection_sources], sources)
            self.assertEqual((item.risk_class, item.risk_label, item.toxicity), ("danger", "有毒 / 风险", "有毒"))
            self.assertIn({"label": "是否有毒性", "value": "有毒"}, item.detail_fields)
        self.assertEqual(payload, original)
        self.assertEqual(json.loads((self.data_dir / "yunnan-common.json").read_text(encoding="utf-8")), original)

    def test_repository_reads_updates_and_preserves_entry_and_source_order(self):
        self.write_collection([sample_entry(2), sample_entry(1)])
        first = repositories.read_yunnan_collection()
        self.write_collection([sample_entry(3)])
        second = repositories.read_yunnan_collection()
        self.assertEqual([entry.id for entry in first.entries], ["2", "1"])
        self.assertEqual([entry.id for entry in second.entries], ["3"])

    def test_deleted_photo_changes_collection_count_without_manifest_change(self):
        self.rows.append(sample_row(1))
        self.write_collection([sample_entry(1)])
        photo = self.add_photo(1)
        self.assertEqual(services.get_mushroom_page(GalleryQuery(collection="yunnan")).collection_photo_count, 1)
        (self.data_dir / photo["path"]).unlink()
        self.assertEqual(services.get_mushroom_page(GalleryQuery(collection="yunnan")).collection_photo_count, 0)

    def test_models_reject_duplicate_ids_names_and_invalid_sources(self):
        for entries in (
            [sample_entry(1), sample_entry(1, scientific_name="Testus other")],
            [sample_entry(1), sample_entry(2, scientific_name="TESTUS SPECIES1")],
            [sample_entry(1, sources=[])],
            [sample_entry(1, sources=[{"title": "无效链接", "url": "javascript:alert(1)"}])],
            [sample_entry(1, sources=[{"title": "无效链接", "url": "file:///local"}])],
            [sample_entry(1, sources=[{"title": " ", "url": "https://example.org/source"}])],
        ):
            with self.subTest(entries=entries), self.assertRaises(ValidationError):
                MushroomCollection(entries=entries)
        self.write_collection([sample_entry(1), sample_entry(1)])
        with self.assertRaises(ValidationError):
            repositories.read_yunnan_collection()

    def test_query_models_reject_invalid_collection_values(self):
        for query_type in (CollectionQuery, GalleryQuery):
            self.assertEqual(query_type().collection, "all")
            self.assertEqual(query_type(collection="yunnan").collection, "yunnan")
            for value in ("unknown", "Yunnan", "", "../yunnan"):
                with self.subTest(query_type=query_type, value=value), self.assertRaises(ValidationError):
                    query_type(collection=value)


if __name__ == "__main__":
    unittest.main()
