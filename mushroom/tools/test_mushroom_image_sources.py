"""验证新图片的对应关系、文件边界、刷新和网页署名。"""

import asyncio
import json
import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import httpx

from main import app
from mushroom_app import image_repository, services


class MushroomImageSourceTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.data_dir = Path(self.temporary.name)
        self.manifest = self.data_dir / "image_sources.json"
        self.row = {"编号": "8", "名称": "干巴菌", "拉丁名": "Thelephora ganbajun", "记录类型": "物种记录"}
        self.photo = {
            "mushroom_id": "8", "scientific_name": "Thelephora ganbajun",
            "path": "image/downloaded/8/example.jpg", "url": "/image/downloaded/8/example.jpg",
            "author": "测试摄影者", "license": "CC BY 4.0",
            "license_url": "https://creativecommons.org/licenses/by/4.0/",
            "source_url": "https://example.org/observation/8", "source_title": "公开观察记录",
            "location_label": "中国云南（来源标注）", "china_record": True,
            "identification_status": "来源学名匹配，未经本项目独立鉴定", "changes": "未裁切或改色",
        }
        self.create_file(self.photo["path"])
        self.write_manifest([self.photo])
        patch.object(image_repository, "DATA_DIR", self.data_dir).start()
        patch.object(services, "find_mushroom_image_name", return_value="干巴菌.jpg").start()
        patch.object(services, "find_mushroom_gallery_names", return_value=["image/干巴菌.jpg", "image_ex/干巴菌_1.jpg"]).start()
        self.addCleanup(patch.stopall)

    def create_file(self, relative):
        path = self.data_dir / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(b"fixture")

    def write_manifest(self, photos):
        previous = self.manifest.stat().st_mtime_ns if self.manifest.exists() else 0
        self.manifest.write_text(json.dumps({"images": photos}, ensure_ascii=False), encoding="utf-8")
        current = self.manifest.stat()
        os.utime(self.manifest, ns=(current.st_atime_ns, max(current.st_mtime_ns, previous + 1000000)))

    def get_credits(self, scientific_name="Thelephora ganbajun", mushroom_id="8"):
        return image_repository.find_mushroom_image_credits(mushroom_id, scientific_name)

    def test_same_id_different_scientific_name_is_not_matched(self):
        self.assertEqual(self.get_credits("Thelephora terrestris"), [])
        self.assertEqual(self.get_credits(mushroom_id="9"), [])
        self.assertEqual(len(self.get_credits()), 1)

    def test_traversal_absolute_and_mismatched_urls_are_rejected(self):
        self.create_file("outside.jpg")
        for invalid_path in ("image/downloaded/8/../../../outside.jpg", str(self.data_dir / "outside.jpg"), "image\\downloaded\\8\\example.jpg", "image/downloaded/9/example.jpg"):
            with self.subTest(path=invalid_path):
                self.write_manifest([{**self.photo, "path": invalid_path}])
                self.assertEqual(self.get_credits(), [])
        self.write_manifest([{**self.photo, "url": "https://example.org/image.jpg"}])
        self.assertEqual(self.get_credits(), [])

    def test_non_web_source_and_license_links_are_rejected(self):
        for key in ("source_url", "license_url"):
            for url in ("javascript:alert(1)", "file:///tmp/local", "//example.org/x", "https:///missing-host"):
                with self.subTest(key=key, url=url):
                    self.write_manifest([{**self.photo, key: url}])
                    self.assertEqual(self.get_credits(), [])

    def test_non_image_files_are_rejected(self):
        self.create_file("image/downloaded/8/page.html")
        self.write_manifest([{**self.photo, "path": "image/downloaded/8/page.html", "url": "/image/downloaded/8/page.html"}])
        self.assertEqual(self.get_credits(), [])

    def test_manifest_change_is_visible_without_restart(self):
        self.assertEqual(self.get_credits()[0].author, "测试摄影者")
        self.write_manifest([{**self.photo, "author": "第二摄影者"}])
        self.assertEqual(self.get_credits()[0].author, "第二摄影者")

    def test_manifest_is_not_parsed_for_each_card(self):
        with patch.object(image_repository.json, "loads", wraps=json.loads) as loader:
            self.get_credits()
            self.get_credits()
        self.assertEqual(loader.call_count, 1)

    def test_removed_file_is_not_kept_by_manifest_cache(self):
        self.assertEqual(len(self.get_credits()), 1)
        (self.data_dir / self.photo["path"]).unlink()
        self.assertEqual(self.get_credits(), [])

    def test_missing_manifest_and_malformed_rows_keep_page_available(self):
        self.manifest.unlink()
        self.assertEqual(self.get_credits(), [])
        self.write_manifest([None, {"mushroom_id": []}, self.photo])
        self.assertEqual(len(self.get_credits()), 1)
        self.manifest.write_text("{", encoding="utf-8")
        self.assertEqual(self.get_credits(), [])

    def test_china_images_precede_reference_images_and_keep_legacy_gallery(self):
        reference = {**self.photo, "path": "image/downloaded/8/foreign.jpg", "url": "/image/downloaded/8/foreign.jpg", "china_record": False}
        self.create_file(reference["path"])
        self.write_manifest([reference, self.photo])
        item = services.build_mushroom_item(self.row)
        self.assertEqual(item.image_url, self.photo["url"])
        self.assertEqual(item.gallery_images, [self.photo["url"], reference["url"], "/image/干巴菌.jpg", "/image_ex/干巴菌_1.jpg"])

    def test_ambiguous_and_historical_records_do_not_receive_new_species_image(self):
        for record_type in ("俗名集合", "俗名待鉴定", "别名条目", "中国历史种名待复核", "物种记录（历史定名须复核）"):
            with self.subTest(record_type=record_type):
                item = services.build_mushroom_item({**self.row, "记录类型": record_type})
                self.assertEqual(item.image_credits, {})
                self.assertEqual(item.image_url, "/image/干巴菌.jpg")

    def test_missing_new_file_falls_back_to_existing_image(self):
        (self.data_dir / self.photo["path"]).unlink()
        item = services.build_mushroom_item(self.row)
        self.assertEqual(item.image_url, "/image/干巴菌.jpg")
        self.assertEqual(item.image_credits, {})
        with patch.object(services, "find_mushroom_image_name", return_value=None):
            self.assertEqual(services.build_mushroom_item(self.row).image_url, "/static/images/image-fallback.svg")

    def test_reference_scene_follows_other_photos_at_same_location_confidence(self):
        reference = {**self.photo, "path": "image/downloaded/8/market.jpg", "url": "/image/downloaded/8/market.jpg", "reference_only": True, "usage_note": "商品场景，非原位照片"}
        self.create_file(reference["path"])
        self.write_manifest([reference, self.photo])
        credits = self.get_credits()
        self.assertEqual(credits[0].url, self.photo["url"])
        self.assertEqual(credits[1].usage_note, reference["usage_note"])

    def test_detail_and_card_render_attribution_and_escape_author(self):
        self.write_manifest([{**self.photo, "author": "摄影者 <script>测试</script>"}])
        # 直接通过 ASGI 请求真实模板，兼容当前 Starlette 与 httpx 的组合。
        async def request_pages():
            async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://testserver") as client:
                return await client.get("/mushrooms/8"), await client.get("/mushrooms")

        with patch.object(services, "read_mushroom_rows", return_value=[self.row]):
            detail, gallery = asyncio.run(request_pages())
        self.assertEqual((detail.status_code, gallery.status_code), (200, 200))
        for text in ("摄影者 &lt;script&gt;测试&lt;/script&gt;", self.photo["license"], self.photo["source_url"], self.photo["license_url"], self.photo["location_label"], self.photo["identification_status"]):
            self.assertIn(text, detail.text)
        self.assertNotIn("<script>测试</script>", detail.text)
        self.assertIn("图片来源见详情", gallery.text)

    def request_page(self, url):
        async def request():
            async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://testserver") as client:
                return await client.get(url)
        with patch.object(services, "read_mushroom_rows", return_value=[self.row]):
            return asyncio.run(request())

    def test_unverified_legacy_images_are_not_identification_photos(self):
        detail = self.request_page("/mushrooms/8").text
        primary, legacy = detail.split('<details class="detail-legacy-images">', 1)
        self.assertIn(self.photo["url"], primary)
        self.assertNotIn('src="/image/干巴菌.jpg"', primary)
        self.assertIn('src="/image/干巴菌.jpg"', legacy)
        self.assertEqual(detail.count("data-viewer-open"), 1)
        self.write_manifest([])
        gallery = self.request_page("/mushrooms").text
        self.assertIn("照片待核", gallery)
        self.assertNotIn('src="/image/干巴菌.jpg"', gallery)
        self.assertIn("图片待补", self.request_page("/mushrooms/8").text)

    def test_source_urls_separated_by_chinese_semicolon_are_independent_safe_links(self):
        self.row["资料来源"] = 'https://example.org/paper-a；https://example.org/paper-b\n<script>资料</script>'
        detail = self.request_page("/mushrooms/8").text
        self.assertIn('href="https://example.org/paper-a"', detail)
        self.assertIn('href="https://example.org/paper-b"', detail)
        self.assertIn('&lt;script&gt;资料&lt;/script&gt;', detail)
        self.assertNotIn('<script>资料</script>', detail)


if __name__ == "__main__":
    unittest.main()
