"""验证下载筛选不会把近似种、类群或无授权素材当成明确物种图片。"""
import copy
import unittest
from unittest.mock import patch

from mushroom_image_sources import commons_candidate
from download_mushroom_images import apply_review


class ImageDownloadTests(unittest.TestCase):
    def setUp(self):
        self.row = {"编号": "8", "名称": "干巴菌", "拉丁名": "Thelephora ganbajun"}
        metadata = {"Artist": "作者甲", "LicenseShortName": "CC BY-SA 4.0",
                    "LicenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
                    "Categories": "Thelephora ganbajun|Fungi of Yunnan", "ImageDescription": "云南标注的照片"}
        self.page = {"pageid": 1, "title": "File:Thelephora ganbajun.jpg", "imageinfo": [{
            "mime": "image/jpeg", "width": 1200, "height": 900, "url": "https://example.org/photo.jpg",
            "descriptionurl": "https://example.org/source", "extmetadata": {key: {"value": value} for key, value in metadata.items()}}]}

    def test_exact_species_and_photo_license_are_kept(self):
        result = commons_candidate(self.row, self.page)
        self.assertTrue(result["china_record"])
        self.assertEqual(result["author"], "作者甲")
        self.assertEqual(result["license_url"], "https://creativecommons.org/licenses/by-sa/4.0/")

    def test_similar_spelling_is_not_a_match(self):
        self.page["title"] = "File:Thelephora ganbajunii.jpg"
        self.assertIsNone(commons_candidate(self.row, self.page))

    def test_species_group_does_not_become_species_photo(self):
        self.page["title"] = "File:Thelephora ganbajun group.jpg"
        self.assertIsNone(commons_candidate(self.row, self.page))

    def test_drawing_in_description_or_category_is_not_a_photo(self):
        for field, text in (("ImageDescription", "Artist's drawing of Thelephora ganbajun"),
                            ("Categories", "Watercolor illustrations of fungi")):
            page = copy.deepcopy(self.page)
            page["imageinfo"][0]["extmetadata"][field]["value"] = text
            self.assertIsNone(commons_candidate(self.row, page))

    def test_noncommercial_and_unknown_licenses_are_not_published(self):
        for license_url in ("https://creativecommons.org/licenses/by-nc/4.0/", "", "https://example.org/copyright"):
            page = copy.deepcopy(self.page)
            page["imageinfo"][0]["extmetadata"]["LicenseUrl"]["value"] = license_url
            self.assertIsNone(commons_candidate(self.row, page))

    def test_missing_author_is_not_silently_filled(self):
        self.page["imageinfo"][0]["extmetadata"]["Artist"]["value"] = ""
        self.assertIsNone(commons_candidate(self.row, self.page))

    def test_location_is_not_inferred_from_species_range(self):
        self.page["imageinfo"][0]["extmetadata"]["Categories"]["value"] = "Thelephora ganbajun"
        result = commons_candidate(self.row, self.page)
        self.assertFalse(result["china_record"])
        self.assertIn("未核定", result["location_label"])

    def test_reviewed_exclusions_cannot_be_republished_by_manifest_sync(self):
        image = commons_candidate(self.row, self.page)
        image["sha256"] = "已审阅文件的哈希"
        decision = {"source": image["source"], "source_id": image["source_id"], "action": "exclude"}
        with patch("download_mushroom_images.read_json", side_effect=[[decision], [image]]):
            self.assertEqual(apply_review([image]), [])

    def test_reference_scene_is_annotated_without_altering_original_record(self):
        image = commons_candidate(self.row, self.page)
        image["sha256"] = "已审阅文件的哈希"
        decision = {"source": image["source"], "source_id": image["source_id"], "action": "annotate", "reason": "商品参考，非原位照片"}
        with patch("download_mushroom_images.read_json", side_effect=[[decision], [image]]):
            result = apply_review([image])[0]
        self.assertEqual(result["usage_note"], decision["reason"])
        self.assertTrue(result["reference_only"])
        self.assertNotIn("usage_note", image)

    def test_new_or_changed_file_requires_content_review_before_display(self):
        image = commons_candidate(self.row, self.page)
        image["sha256"] = "新下载内容的哈希"
        with patch("download_mushroom_images.read_json", side_effect=[[], []]):
            self.assertEqual(apply_review([image]), [])
        previous = {**image, "sha256": "先前文件的哈希"}
        with patch("download_mushroom_images.read_json", side_effect=[[], [previous]]):
            self.assertEqual(apply_review([image]), [])


if __name__ == "__main__":
    unittest.main()
