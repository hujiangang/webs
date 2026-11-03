"""验证精选常用名、显式照片边界与全国图鉴的行为隔离。"""

import asyncio
import base64
import copy
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from urllib.parse import quote

import httpx
from pydantic import ValidationError

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from main import app
from mushroom_app import services
from mushroom_app.collections import image_repository
from mushroom_app.collections.models import CollectionPhoto, MushroomCollection
from mushroom_app.models import GalleryQuery, ImageCredit
from tools.test_mushroom_yunnan import sample_entry, sample_row


class CollectionPhotoModelTests(unittest.TestCase):
    def test_source_type_is_required_even_when_source_metadata_is_present(self):
        values = {"path": "image/source.jpg", "source_url": "https://example.org/photo",
                  "source_title": "网络来源照片", "identification_status": "来源对应关系已核"}
        with self.assertRaises(ValidationError) as error:
            CollectionPhoto(**values)
        self.assertEqual(error.exception.errors()[0]["loc"], ("source_type",))
        self.assertEqual(error.exception.errors()[0]["type"], "missing")

    def test_old_collection_without_photos_remains_compatible(self):
        collection = MushroomCollection(entries=[sample_entry(1)])
        self.assertEqual(collection.entries[0].photos, [])

    def test_user_confirmation_does_not_invent_author_or_permission(self):
        photo = CollectionPhoto(path="image/用户确认.png", source_type="user_confirmed")
        self.assertEqual(photo.source_type, "user_confirmed")
        self.assertEqual((photo.author, photo.license, photo.source_url, photo.license_url), ("", "", "", ""))

    def test_path_validation_rejects_outside_non_image_and_unsafe_paths(self):
        for path in ("/image/a.jpg", "C:/image/a.jpg", "image/../a.jpg", "image\\a.jpg",
                     "image/a.svg", "uploads/a.jpg", "image/a.gif", "image/./a.png", "image/a.jpg?x=1"):
            with self.subTest(path=path), self.assertRaises(ValidationError):
                CollectionPhoto(path=path, source_type="user_confirmed")

    def test_open_license_requires_all_attribution_fields(self):
        values = {"path": "image/a.jpg", "source_type": "open_license", "author": "测试作者",
                  "license": "CC BY 4.0", "license_url": "https://creativecommons.org/licenses/by/4.0/",
                  "source_url": "https://example.org/a"}
        self.assertEqual(CollectionPhoto(**values).source_type, "open_license")
        for field in ("author", "license", "license_url", "source_url"):
            with self.subTest(field=field), self.assertRaises(ValidationError):
                CollectionPhoto(**{**values, field: ""})

    def test_source_reference_requires_evidence_without_claiming_open_license(self):
        values = {"path": "image/a.jpg", "source_type": "source_reference",
                  "source_url": "https://example.org/a", "source_title": "单种原始来源",
                  "identification_status": "来源单种条目与精选名称一致，未作实物鉴定"}
        photo = CollectionPhoto(**values)
        self.assertEqual((photo.author, photo.license, photo.license_url), ("", "", ""))
        for field in ("source_url", "source_title", "identification_status"):
            with self.subTest(field=field), self.assertRaises(ValidationError):
                CollectionPhoto(**{**values, field: ""})

    def test_nonempty_links_are_web_urls_for_every_source_type(self):
        for field in ("license_url", "source_url"):
            for link in ("file:///a", "javascript:alert(1)", "//example.org/a", "https:///missing-host"):
                with self.subTest(field=field, link=link), self.assertRaises(ValidationError):
                    CollectionPhoto(path="image/a.jpg", source_type="user_confirmed", **{field: link})


class CollectionPhotoServiceTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.data_dir = Path(temporary.name)
        self.rows = [sample_row(number) for number in range(1, 5)]
        self.collection = MushroomCollection(entries=[sample_entry(number) for number in (4, 3, 2, 1)])
        self.global_photos = {}
        for target, name, value in (
            (image_repository, "DATA_DIR", self.data_dir),
        ):
            patcher = patch.object(target, name, value)
            patcher.start()
            self.addCleanup(patcher.stop)
        for name, options in (
            ("read_mushroom_rows", {"return_value": self.rows}),
            ("read_yunnan_collection", {"side_effect": lambda: self.collection}),
            ("get_mushroom_image_keys", {"side_effect": lambda: set(self.global_photos)}),
            ("find_mushroom_image_credits", {"side_effect": lambda number, latin: self.global_photos.get((number, latin), [])}),
            ("find_mushroom_image_name", {"return_value": "旧素材.jpg"}),
            ("find_mushroom_gallery_names", {"return_value": ["image/旧素材.jpg"]}),
        ):
            patcher = patch.object(services, name, **options)
            patcher.start()
            self.addCleanup(patcher.stop)

    def add_photo(self, number, relative=None, source_type="user_confirmed", **values):
        relative = relative or f"image/confirmed/{number}.png"
        destination = self.data_dir / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(base64.b64decode(
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jR1cAAAAASUVORK5CYII="
        ))
        entry = next(entry for entry in self.collection.entries if entry.id == str(number))
        photo = CollectionPhoto(path=relative, source_type=source_type, **values)
        entry.photos.append(photo)
        return photo

    def add_global_photo(self, number):
        credit = ImageCredit(
            url=f"/image/downloaded/{number}/source.jpg", author="来源作者", license="CC BY 4.0",
            license_url="https://creativecommons.org/licenses/by/4.0/", source_url="https://example.org/source",
            source_title="公开来源", location_label="", identification_status="测试来源配图",
        )
        self.global_photos[(str(number), f"Testus species{number}")] = [credit]
        return credit

    def test_explicit_common_name_photo_counts_sorts_and_filters_before_pagination(self):
        self.rows[1]["记录类型"] = "俗名集合"
        self.rows[2]["记录类型"] = "中国历史种名待复核"
        self.add_photo(2)
        self.add_photo(3)
        self.add_global_photo(1)
        with patch.object(services, "PAGE_SIZE", 2):
            first = services.get_mushroom_page(GalleryQuery(collection="yunnan", with_photo=True))
            last = services.get_mushroom_page(GalleryQuery(collection="yunnan", with_photo=True, page=99))
        self.assertEqual([item.id for item in first.items], ["3", "2"])
        self.assertEqual([item.id for item in last.items], ["1"])
        self.assertEqual((first.collection_total_count, first.collection_photo_count, first.total_count), (4, 3, 3))
        self.assertEqual((last.page, last.total_pages), (2, 2))

    def test_user_photo_is_primary_and_keeps_global_credits_then_references(self):
        global_photo = self.add_global_photo(1)
        reference = self.add_photo(1, "image/reference.png", source_type="source_reference",
                                   source_url="https://example.org/reference", source_title="单种来源",
                                   identification_status="来源条目对应已核")
        user = self.add_photo(1)
        item = services.get_mushroom_detail("1")
        self.assertEqual(item.image_url, "/" + user.path)
        self.assertEqual(list(item.image_credits), ["/" + user.path, global_photo.url, "/" + reference.path])
        self.assertEqual(item.image_credits[item.image_url].license, "")
        self.assertEqual(item.image_credits[global_photo.url].source_type, "open_license")

    def test_encoded_chinese_filename_deduplicates_confirmed_and_legacy_gallery(self):
        photo = self.add_photo(1, "image/珊瑚菌 确认.png")
        global_photo = self.add_global_photo(1)
        global_photo.url = "/" + photo.path
        encoded = "/" + quote(photo.path, safe="/")
        with patch.object(services, "find_mushroom_gallery_names", return_value=[photo.path, "image/旧素材.jpg"]):
            item = services.get_mushroom_detail("1")
        self.assertEqual(item.image_url, encoded)
        self.assertEqual(item.gallery_images, [encoded, "/image/" + quote("旧素材.jpg")])
        self.assertEqual(list(item.image_credits), [encoded])
        self.assertEqual(item.image_credits[encoded].source_type, "user_confirmed")
        self.assertEqual(global_photo.url, "/" + photo.path)
        self.assertNotIn("/" + photo.path, item.gallery_images)

    def test_missing_empty_and_deleted_files_are_not_kept_as_photo_records(self):
        photo = self.add_photo(1)
        path = self.data_dir / photo.path
        self.assertEqual(services.get_mushroom_page(GalleryQuery(collection="yunnan")).collection_photo_count, 1)
        path.write_bytes(b"")
        self.assertEqual(services.get_mushroom_page(GalleryQuery(collection="yunnan")).collection_photo_count, 0)
        path.unlink()
        page = services.get_mushroom_page(GalleryQuery(collection="yunnan", with_photo=True))
        self.assertEqual((page.collection_photo_count, page.total_count, page.items), (0, 0, []))

    def test_symlink_outside_image_root_is_rejected(self):
        outside = self.data_dir / "outside"
        outside.mkdir()
        (outside / "photo.png").write_bytes(b"outside")
        image_dir = self.data_dir / "image"
        image_dir.mkdir()
        try:
            (image_dir / "linked").symlink_to(outside, target_is_directory=True)
        except OSError as error:
            self.skipTest("当前系统未允许创建符号链接：" + str(error))
        entry = self.collection.entries[0]
        entry.photos = [CollectionPhoto(path="image/linked/photo.png", source_type="user_confirmed")]
        self.assertEqual(image_repository.find_collection_image_credits(entry), [])

    def test_selection_names_search_in_yunnan_only_and_preserve_csv_risk(self):
        entry = self.collection.entries[-1]
        entry.display_name, entry.aliases = "地方常用名", ["地方别称", "Local Alias"]
        entry.classification_scope, entry.summary = "俗名类群", "仅描述确认范围"
        self.rows[0]["是否有毒性"], self.rows[0]["是否可食用"] = "有毒", "不可食用"
        before = copy.deepcopy(self.rows)
        for term in ("常用名", "地方别称", "local alias", "测试菌1", "SPECIES1"):
            page = services.get_mushroom_page(GalleryQuery(collection="yunnan", keyword=term))
            self.assertEqual([item.id for item in page.items], ["1"], term)
        item = services.get_mushroom_detail("1")
        self.assertEqual((item.selection_name, item.selection_aliases, item.selection_scope, item.selection_summary),
                         (entry.display_name, entry.aliases, entry.classification_scope, entry.summary))
        self.assertEqual((item.name, item.latin_name, item.risk_class), ("测试菌1", "Testus species1", "danger"))
        self.assertEqual(services.get_mushroom_page(GalleryQuery(keyword="常用名")).items, [])
        self.assertEqual(self.rows, before)

    def test_photo_scope_inherits_entry_scope_without_overwriting_explicit_scope(self):
        entry = self.collection.entries[-1]
        entry.classification_scope = "类群观察"
        self.add_photo(1)
        self.add_photo(1, "image/second.png", classification_scope="照片仅确认商品名")
        credits = image_repository.find_collection_image_credits(entry)
        self.assertEqual([credit.classification_scope for credit in credits], ["类群观察", "照片仅确认商品名"])

    def test_national_list_ignores_collection_photos_and_preserves_order(self):
        self.add_photo(4)
        self.add_global_photo(2)
        with patch.object(services, "read_yunnan_collection") as reader:
            normal = services.get_mushroom_page(GalleryQuery())
            photos = services.get_mushroom_page(GalleryQuery(with_photo=True))
        reader.assert_not_called()
        self.assertEqual([item.id for item in normal.items], ["1", "2", "3", "4"])
        self.assertEqual([item.id for item in photos.items], ["2"])
        self.assertTrue(all(not item.selection_name for item in normal.items))

    def test_mismatched_scientific_name_does_not_overlay_any_photo_or_label(self):
        self.add_photo(1)
        self.collection.entries[-1].scientific_name = "Testus different"
        detail = services.get_mushroom_detail("1")
        self.assertEqual((detail.selection_name, detail.image_credits), ("", {}))
        page = services.get_mushroom_page(GalleryQuery(collection="yunnan", with_photo=True))
        self.assertEqual((page.collection_total_count, page.total_count), (3, 0))

    def test_asgi_request_uses_alias_filter_and_explicit_photo(self):
        self.collection.entries[-1].aliases = ["请求别称"]
        photo = self.add_photo(1)

        async def request():
            async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://testserver") as client:
                gallery = await client.get("/mushrooms", params={"collection": "yunnan", "keyword": "请求别称", "with_photo": "true"})
                detail = await client.get("/mushrooms/1", params={"collection": "yunnan"})
                return gallery, detail

        gallery, detail = asyncio.run(request())
        self.assertEqual((gallery.status_code, detail.status_code), (200, 200))
        self.assertIn('/mushrooms/1?collection=yunnan', gallery.text)
        self.assertNotIn('/mushrooms/2?collection=yunnan', gallery.text)
        self.assertIn("/" + photo.path, gallery.text)
        self.assertIn("/" + photo.path, detail.text)


if __name__ == "__main__":
    unittest.main()
