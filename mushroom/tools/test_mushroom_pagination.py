"""验证大名录只为最终展示条目读取图片，且分页、分类和搜索结果保持一致。"""

import sys
import unittest
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from mushroom_app import services
from mushroom_app.config import PAGE_SIZE
from mushroom_app.models import GalleryQuery


def sample_rows():
    """同时覆盖危险优先、未知、不可食与旧版可食标签。"""
    labels = [("无毒", "可食用"), ("有中毒关联记录", "有食用记载"), ("毒性未知", "食用性未核实"), ("毒性未知", "不可食用")]
    names = {0: "奶浆菌", 2: "羊肚菌", 10: "鸡油菌", 30: "毒蝇鹅膏菌"}
    return [
        {"编号": f" {index} ", "名称": f" {names.get(index, '基线菌' + str(index))} ",
         "是否有毒性": labels[index % 4][0], "是否可食用": labels[index % 4][1],
         "拉丁名": f"Testus species{index}", "生长环境": "测试林地"}
        for index in range(PAGE_SIZE * 4)
    ]


class MushroomPaginationTests(unittest.TestCase):
    def setUp(self):
        self.rows = sample_rows()
        self.reader = patch.object(services, "read_mushroom_rows", return_value=self.rows).start()
        self.image = patch.object(services, "find_mushroom_image_name", side_effect=lambda name: name + ".png").start()
        self.gallery = patch.object(services, "find_mushroom_gallery_names", side_effect=lambda name: ["image/" + name + ".png"]).start()
        self.builder = patch.object(services, "build_mushroom_item", wraps=services.build_mushroom_item).start()
        self.addCleanup(patch.stopall)

    def assert_image_reads(self, expected):
        self.assertEqual(self.builder.call_count, expected, "只构造最终展示条目")
        self.assertEqual(self.image.call_count, expected, "只查找最终展示条目的主图")
        self.assertEqual(self.gallery.call_count, expected, "只查找最终展示条目的图库")

    def test_page_reads_only_visible_items(self):
        page = services.get_mushroom_page(GalleryQuery(page=2))
        self.assertEqual([item.id for item in page.items], [str(i) for i in range(PAGE_SIZE, PAGE_SIZE * 2)])
        self.assertEqual((page.page, page.total_pages, page.total_count), (2, 4, PAGE_SIZE * 4))
        self.assert_image_reads(PAGE_SIZE)

    def test_category_results_keep_existing_risk_semantics(self):
        for category, offset in (("edible", 0), ("toxic", 1), ("inedible", 3)):
            with self.subTest(category=category):
                page = services.get_mushroom_page(GalleryQuery(category=category))
                self.assertEqual([item.id for item in page.items], [str(i) for i in range(offset, PAGE_SIZE * 4, 4)])
                self.assertEqual(page.total_count, PAGE_SIZE)

    def test_literature_record_is_searchable_without_safety_inference(self):
        self.rows[2]["是否可食用"] = "有食用记载（2026编目）"
        page = services.get_mushroom_page(GalleryQuery(category="edible", keyword=" 羊肚 "))
        self.assertEqual([item.id for item in page.items], ["2"])
        self.assertEqual((page.keyword, page.category, page.total_count), ("羊肚", "edible", 1))
        self.assert_image_reads(1)

    def test_latin_keyword_remains_case_insensitive(self):
        page = services.get_mushroom_page(GalleryQuery(keyword=" tEsTuS species1 "))
        self.assertEqual([item.id for item in page.items], ["1"] + [str(i) for i in range(10, 20)])
        self.assertEqual(page.total_count, 11)
        self.assert_image_reads(11)

    def test_keyword_and_category_are_combined(self):
        page = services.get_mushroom_page(GalleryQuery(category="toxic", keyword="species1"))
        self.assertEqual([item.id for item in page.items], ["1", "13", "17"])
        self.assert_image_reads(3)

    def test_out_of_range_page_is_clamped(self):
        page = services.get_mushroom_page(GalleryQuery(page=999))
        self.assertEqual(page.page, 4)
        self.assertEqual([item.id for item in page.items], [str(i) for i in range(PAGE_SIZE * 3, PAGE_SIZE * 4)])
        self.assert_image_reads(PAGE_SIZE)

    def test_no_matches_does_not_read_images(self):
        page = services.get_mushroom_page(GalleryQuery(page=9, keyword="不存在的学名"))
        self.assertEqual((page.items, page.page, page.total_pages, page.total_count), ([], 1, 1, 0))
        self.assert_image_reads(0)

    def test_detail_reads_only_selected_row(self):
        item = services.get_mushroom_detail(str(PAGE_SIZE * 4 - 1))
        self.assertEqual(item.id, str(PAGE_SIZE * 4 - 1))
        self.assertIn({"label": "生长环境", "value": "测试林地"}, item.detail_fields)
        self.assert_image_reads(1)

    def test_missing_detail_does_not_read_images(self):
        self.assertIsNone(services.get_mushroom_detail("不存在"))
        self.assert_image_reads(0)

    def test_home_keeps_preferred_order_and_reads_four_items(self):
        items = services.get_home_picks()
        self.assertEqual([item.id for item in items], ["0", "2", "10", "30"])
        self.assert_image_reads(4)

    def test_home_small_dataset_keeps_source_order(self):
        self.reader.return_value = [self.rows[10], self.rows[2], self.rows[0]]
        self.assertEqual([item.id for item in services.get_home_picks()], ["10", "2", "0"])
        self.assert_image_reads(3)

    def test_home_fills_remainder_in_source_order(self):
        items = services.get_home_picks(6)
        self.assertEqual([item.id for item in items], ["0", "2", "10", "30", "1", "3"])
        self.assert_image_reads(6)

    def test_empty_home_does_not_read_images(self):
        self.assertEqual(services.get_home_picks(0), [])
        self.assert_image_reads(0)

    def test_rows_are_reread_after_data_changes(self):
        first = services.get_mushroom_page(GalleryQuery(keyword="新增物种"))
        self.assertEqual(first.total_count, 0)
        self.reader.return_value = [{"编号": "新增", "名称": "新增物种", "是否有毒性": "毒性未知", "是否可食用": "食用性未核实"}]
        second = services.get_mushroom_page(GalleryQuery(keyword="新增物种"))
        self.assertEqual([item.id for item in second.items], ["新增"])
        self.assertEqual(self.reader.call_count, 2)

    def test_header_positions_and_aliases_remain_compatible(self):
        self.reader.return_value = [{"序号": " a ", "菌名": " 奶浆菌 ", "毒性说明": "无毒", "食用性": "可食用", "拉丁名": "Testus alias"}]
        page = services.get_mushroom_page(GalleryQuery(category="edible", keyword="ALIAS"))
        self.assertEqual([item.id for item in page.items], ["a"])
        self.assertEqual(services.get_mushroom_detail("a").name, "奶浆菌")
        self.assertEqual(services.get_home_picks()[0].name, "奶浆菌")


if __name__ == "__main__":
    unittest.main()
