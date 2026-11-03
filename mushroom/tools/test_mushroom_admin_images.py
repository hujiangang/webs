"""使用临时图库验证后台照片替换、撤下、冲突与前台同步，不修改真实资料。"""

import asyncio
import io
import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import httpx
from PIL import Image
from starlette.datastructures import UploadFile

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from main import app
from mushroom_app import services
from mushroom_app.admin import image_repository, image_services
from mushroom_app.admin.maintenance_repository import AdminRevisionConflict
from mushroom_app.collections import image_repository as collection_images
from mushroom_app.collections.models import CollectionPhoto, MushroomCollection
from mushroom_app.models import GalleryQuery
from tools.test_mushroom_yunnan import sample_entry, sample_row


def image_upload(color="red", filename="菌子.png"):
    output = io.BytesIO()
    Image.new("RGB", (24, 18), color).save(output, format="PNG")
    output.seek(0)
    return UploadFile(file=output, filename=filename)


class AdminImageTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.data = Path(temporary.name)
        self.rows = [sample_row(number) for number in (1, 2, 3)]
        self.rows[2]["记录类型"] = "俗名集合"
        self.rows[2]["是否有毒性"] = "有毒"
        self.rows[2]["是否可食用"] = "不可食用"
        self.collection = MushroomCollection(entries=[sample_entry(number) for number in (1, 2, 3)])
        for target in (image_repository, image_services, collection_images):
            patcher = patch.object(target, "DATA_DIR", self.data)
            patcher.start()
            self.addCleanup(patcher.stop)
        for name, value in (("read_mushroom_rows", self.rows), ("read_yunnan_collection", self.collection),
                            ("get_mushroom_image_keys", set()), ("find_mushroom_image_credits", []),
                            ("find_mushroom_image_name", None), ("find_mushroom_gallery_names", [])):
            patcher = patch.object(services, name, return_value=value)
            patcher.start()
            self.addCleanup(patcher.stop)

    def state(self, number="1"):
        return image_services.get_admin_image_state(number, f"Testus species{number}")

    def upload(self, number="1", *, extra=False, color="red", revision=None):
        action = image_services.upload_admin_extra_image if extra else image_services.upload_admin_main_image
        action(number, f"Testus species{number}", image_upload(color), revision)

    def original_photo(self):
        path = self.data / "image" / "用户原图.png"
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(image_upload("green").file.read())
        self.collection.entries[0].photos.append(CollectionPhoto(path="image/用户原图.png", source_type="user_confirmed"))
        return path

    def test_main_upload_overrides_confirmed_photo_and_clear_restores_without_changing_files(self):
        original = self.original_photo()
        original_content = original.read_bytes()
        before = services.get_mushroom_detail("1").image_url
        self.upload(revision="absent")
        uploaded = self.state()["main_image_url"]
        item = services.get_mushroom_detail("1")
        self.assertEqual(item.image_url, uploaded)
        self.assertEqual(list(item.image_credits), [uploaded, before])
        self.assertEqual(item.image_credits[uploaded].source_type, "admin_uploaded")
        image_services.clear_admin_main_image("1", "Testus species1", self.state()["image_revision"])
        self.assertEqual(services.get_mushroom_detail("1").image_url, before)
        self.assertTrue((self.data / uploaded.lstrip("/")).is_file())
        self.assertEqual(original.read_bytes(), original_content)

    def test_three_extras_keep_original_primary_and_delete_only_reference(self):
        self.original_photo()
        original = services.get_mushroom_detail("1").image_url
        for color in ("red", "blue", "black"):
            self.upload(extra=True, color=color)
        self.assertEqual(services.get_mushroom_detail("1").image_url, original)
        state = self.state()
        self.assertEqual([image["index"] for image in state["extra_images"]], [1, 2, 3])
        with self.assertRaisesRegex(ValueError, "最多"):
            self.upload(extra=True)
        removed = state["extra_images"][1]["url"]
        image_services.delete_admin_extra_image("1", "Testus species1", 2, state["image_revision"])
        self.assertTrue((self.data / removed.lstrip("/")).exists())
        self.assertNotIn(removed, services.get_mushroom_detail("1").image_credits)
        self.upload(extra=True)
        self.assertEqual([image["index"] for image in self.state()["extra_images"]], [1, 2, 3])

    def test_invalid_images_and_extensions_leave_main_unchanged(self):
        self.upload()
        before = (self.data / "admin-images.json").read_bytes()
        for content, filename in ((b"not-image", "photo.jpg"), (image_upload().file.read()[:40], "photo.png"),
                                  (image_upload().file.read(), "photo.jpg"), (b"", "photo.png"),
                                  (b"GIF89a", "photo.gif")):
            with self.subTest(filename=filename, length=len(content)), self.assertRaises(ValueError):
                image_services.upload_admin_main_image("1", "Testus species1", UploadFile(file=io.BytesIO(content), filename=filename))
            self.assertEqual((self.data / "admin-images.json").read_bytes(), before)

    def test_upload_size_and_pixel_limits_are_enforced_before_replacement(self):
        self.upload()
        before = self.state()
        with patch.object(image_services, "MAX_IMAGE_BYTES", 10), self.assertRaisesRegex(ValueError, "20 MB"):
            self.upload(color="blue")
        with patch.object(image_services, "MAX_IMAGE_PIXELS", 100), self.assertRaisesRegex(ValueError, "像素"):
            self.upload(color="blue")
        self.assertEqual(self.state(), before)

    def test_disk_or_manifest_failure_keeps_old_reference_and_old_file(self):
        self.upload()
        old = self.state()
        for function in ("write_image_file_atomic", "write_admin_image_document"):
            with self.subTest(function=function), patch.object(image_services, function, side_effect=OSError("模拟磁盘故障")):
                with self.assertRaisesRegex(ValueError, "原有图片保持不变"):
                    self.upload(color="blue")
            self.assertEqual(self.state(), old)
            self.assertTrue((self.data / old["main_image_url"].lstrip("/")).exists())

    def test_stale_revision_does_not_write_an_image_or_replace_current_main(self):
        self.upload()
        old = self.state()
        self.upload(color="blue", revision=old["image_revision"])
        current = self.state()
        files = set(self.data.rglob("*.png"))
        for action in (
            lambda: self.upload(revision=old["image_revision"]),
            lambda: image_services.clear_admin_main_image("1", "Testus species1", old["image_revision"]),
        ):
            with self.assertRaises(AdminRevisionConflict):
                action()
        self.assertEqual(self.state(), current)
        self.assertEqual(set(self.data.rglob("*.png")), files)

    def test_identity_mismatch_and_missing_files_do_not_count_as_photos(self):
        self.upload()
        self.assertEqual(image_repository.find_admin_image_credits("1", "Testus other"), [])
        self.assertEqual(image_repository.find_admin_image_credits("2", "Testus species1"), [])
        (self.data / self.state()["main_image_url"].lstrip("/")).unlink()
        self.assertEqual(image_repository.get_admin_image_index(), {})
        self.assertEqual(services.get_mushroom_page(GalleryQuery(with_photo=True)).total_count, 0)
        self.assertEqual(services.get_mushroom_page(GalleryQuery(collection="yunnan")).collection_photo_count, 0)

    def test_malformed_manifest_is_not_overwritten_or_exposed_as_images(self):
        self.upload()
        manifest = self.data / "admin-images.json"
        document = json.loads(manifest.read_text(encoding="utf-8"))
        document["entries"][0]["main"]["path"] = "image/admin/2/other.png"
        manifest.write_text(json.dumps(document), encoding="utf-8")
        before = manifest.read_bytes()
        with self.assertRaises(ValueError):
            self.upload()
        self.assertEqual(manifest.read_bytes(), before)
        self.assertEqual(image_repository.get_admin_image_index(), {})

    def test_all_gallery_modes_share_admin_photo_filter_and_yunnan_sort(self):
        self.upload(number="3")
        for collection in ("all", "yunnan"):
            page = services.get_mushroom_page(GalleryQuery(collection=collection, with_photo=True))
            self.assertEqual([item.id for item in page.items], ["3"])
            self.assertEqual(page.items[0].image_url, self.state("3")["main_image_url"])
            toxic = services.get_mushroom_page(GalleryQuery(collection=collection, category="toxic", with_photo=True))
            edible = services.get_mushroom_page(GalleryQuery(collection=collection, category="edible", with_photo=True))
            self.assertEqual([item.id for item in toxic.items], ["3"])
            self.assertEqual(edible.total_count, 0)
        with patch.object(services, "PAGE_SIZE", 1):
            first = services.get_mushroom_page(GalleryQuery(collection="yunnan"))
        self.assertEqual((first.items[0].id, first.collection_photo_count, first.collection_total_count), ("3", 1, 3))
        self.assertEqual([item.id for item in services.get_mushroom_page(GalleryQuery()).items], ["1", "2", "3"])

    def test_asgi_renders_upload_with_distinct_attribution_and_no_empty_source_links(self):
        self.upload()
        uploaded = self.state()["main_image_url"]

        async def request_pages():
            async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://testserver") as client:
                return await client.get("/mushrooms", params={"with_photo": "true"}), await client.get("/mushrooms/1")

        gallery, detail = asyncio.run(request_pages())
        self.assertEqual((gallery.status_code, detail.status_code), (200, 200))
        for page in (gallery, detail):
            self.assertIn(uploaded, page.text)
            self.assertIn("管理员上传", page.text)
        self.assertIn("名称由维护者关联；拍摄者、拍摄地与许可未提供", detail.text)
        self.assertNotIn('href=""', detail.text)
        self.assertNotIn("本地图 · 用户确认地方名称对应", detail.text)


if __name__ == "__main__":
    unittest.main()
