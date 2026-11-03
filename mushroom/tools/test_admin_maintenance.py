"""使用临时资料验证后台维护、版本保护和修订链，不触碰真实菌物资料。"""

import hashlib
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from mushroom_app.admin import maintenance_repository as maintenance
from mushroom_app.admin import repositories, services
from mushroom_app.admin.models import AdminMushroomForm, AdminSelectionForm
from mushroom_app.collections import repositories as collection_repository
from validate_mushroom_data import replay_reviewed_changes


class AdminMaintenanceTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        self.csv = self.root / "mushroom.csv"
        self.collection = self.root / "yunnan-common.json"
        self.revisions = self.root / "reviewed-revisions.json"
        self.images = self.root / "admin-images.json"
        self.history = self.root / "admin-history"
        self.rows = [
            {"编号": "5", "名称": "大红菌", "拉丁名": "Russula griseocarnosa", "识别特征": "原始描述", "生长环境": "原始生境"},
            {"编号": "20", "名称": "珊瑚菌", "拉丁名": "Ramaria spp.", "识别特征": "另一描述", "生长环境": "另一生境"},
            {"编号": "80", "名称": "其他菌", "拉丁名": "Other taxon", "识别特征": "未选入", "生长环境": "林地"},
        ]
        self.original = repositories.serialize_admin_rows(self.rows, list(self.rows[0]))
        self.csv.write_bytes(self.original)
        self.document = {"title": "云南精选", "updated_at": "2026-11-03", "entries": [
            self.entry("5", "Russula griseocarnosa", "大红菌", ["红大菌"]),
            self.entry("20", "Ramaria spp.", "珊瑚菌", ["扫把菌"]),
        ]}
        self.collection.write_bytes(maintenance.json_bytes(self.document))
        baseline = self.root / "baseline" / "backup" / "data"
        baseline.mkdir(parents=True)
        (baseline / "mushroom.csv").write_bytes(self.original)
        digest = hashlib.sha256(self.original).hexdigest()
        (self.root / "baseline" / "accepted-changes.json").write_bytes(maintenance.json_bytes({
            "source_sha256": digest, "output_sha256": digest, "changes": [],
        }))
        self.revisions.write_bytes(maintenance.json_bytes({"schema_version": 1, "revisions": ["baseline/accepted-changes.json"]}))
        patches = [patch.object(repositories, "MUSHROOM_CSV", self.csv),
                   patch.object(collection_repository, "DATA_DIR", self.root)]
        for name, path in (("CSV_PATH", self.csv), ("COLLECTION_PATH", self.collection),
                           ("REVISIONS_PATH", self.revisions), ("ADMIN_IMAGES_PATH", self.images),
                           ("HISTORY_DIR", self.history)):
            patches.append(patch.object(maintenance, name, path))
        for mock in patches:
            mock.start()
            self.addCleanup(mock.stop)

    def entry(self, number, scientific_name, display_name, aliases):
        return {"id": number, "scientific_name": scientific_name, "display_name": display_name,
                "aliases": aliases, "summary": "原展示说明", "group": "精选", "reason": "收录依据",
                "sources": [{"title": "来源", "url": "https://example.com/"}]}

    def form(self, fields=None, selection=None, revision=None):
        return AdminMushroomForm(fields=fields or {}, selection=selection,
                                 revision=revision or maintenance.get_admin_revision())

    def test_list_searches_aliases_and_only_builds_page_summaries(self):
        with patch.object(services, "build_admin_item", side_effect=AssertionError("列表不应构造编辑对象")):
            result = services.get_admin_mushroom_list("扫把菌")
            self.assertEqual(["20"], [item.id for item in result.items])
            self.assertEqual(2, services.get_admin_mushroom_list().total_count)
            self.assertEqual(3, services.get_admin_mushroom_list(collection="all").total_count)
            with patch.object(services, "ADMIN_PAGE_SIZE", 1):
                result = services.get_admin_mushroom_list(collection="all", page=99)
                self.assertEqual((3, 3, "80"), (result.page, result.total_pages, result.items[0].id))

    def test_csv_save_backs_up_and_replays_without_clearing_omitted_fields(self):
        services.update_admin_mushroom("5", self.form({"识别特征": "管理员补充"}))
        rows = repositories.read_admin_rows()
        self.assertEqual("管理员补充", rows[0]["识别特征"])
        self.assertEqual("原始生境", rows[0]["生长环境"])
        self.assertEqual(self.rows[1:], rows[1:])
        document = json.loads(self.revisions.read_text(encoding="utf-8"))
        batch = self.root / document["revisions"][-1]
        accepted = json.loads(batch.read_text(encoding="utf-8"))
        self.assertEqual("administrator_edit", accepted["review_type"])
        self.assertEqual(self.original, (batch.parent / "backup/data/mushroom.csv").read_bytes())
        errors = []
        replayed = replay_reviewed_changes(self.rows, hashlib.sha256(self.csv.read_bytes()).hexdigest(), errors, self.revisions)
        self.assertEqual([], errors)
        self.assertEqual(rows, replayed)

    def test_selection_reorders_and_backs_up_without_changing_species_identity(self):
        original_collection = self.collection.read_bytes()
        selection = AdminSelectionForm(display_name="我的大红菌", aliases=["红大菌", " 红大菌 ", ""],
                                       summary="我自己的观察", order=2)
        services.update_admin_mushroom("5", self.form(selection=selection))
        result = json.loads(self.collection.read_text(encoding="utf-8"))
        self.assertEqual(["20", "5"], [entry["id"] for entry in result["entries"]])
        self.assertEqual("Russula griseocarnosa", result["entries"][1]["scientific_name"])
        self.assertEqual(["红大菌"], result["entries"][1]["aliases"])
        self.assertEqual(self.original, self.csv.read_bytes())
        backup = next(self.history.glob("*/backup/data/yunnan-common.json"))
        self.assertEqual(original_collection, backup.read_bytes())
        errors = []
        replay_reviewed_changes(self.rows, hashlib.sha256(self.original).hexdigest(), errors, self.revisions)
        self.assertEqual([], errors)

    def test_no_change_does_not_write_or_create_batch(self):
        before = (self.csv.read_bytes(), self.collection.read_bytes(), self.revisions.read_bytes())
        selection = AdminSelectionForm(display_name="大红菌", aliases=["红大菌"], summary="原展示说明", order=1)
        services.update_admin_mushroom("5", self.form({"识别特征": "原始描述"}, selection))
        self.assertEqual(before, (self.csv.read_bytes(), self.collection.read_bytes(), self.revisions.read_bytes()))
        self.assertFalse(self.history.exists())

    def test_identity_unknown_field_and_invalid_order_rejected_without_writes(self):
        for fields in ({"名称": "新名字"}, {"拉丁名": "Russula other"}, {"编号": "9"}, {"不存在": "内容"}):
            with self.subTest(fields=fields), self.assertRaises(ValueError):
                services.update_admin_mushroom("5", self.form(fields))
        with self.assertRaises(ValueError):
            services.update_admin_mushroom("5", self.form(selection=AdminSelectionForm(order=3)))
        self.assertEqual(self.original, self.csv.read_bytes())
        self.assertFalse(self.history.exists())

    def test_stale_or_blank_revision_rejected_after_csv_collection_or_image_change(self):
        for path in (self.csv, self.collection, self.images):
            with self.subTest(path=path):
                old = path.read_bytes() if path.exists() else None
                revision = maintenance.get_admin_revision()
                path.write_bytes((old or b"") + b" ")
                with self.assertRaises(maintenance.AdminRevisionConflict):
                    services.update_admin_mushroom("5", self.form({"识别特征": "旧页面"}, revision=revision))
                if old is None:
                    path.unlink()
                else:
                    path.write_bytes(old)
        with self.assertRaises(maintenance.AdminRevisionConflict):
            services.update_admin_mushroom("5", AdminMushroomForm(fields={}, revision=""))
        self.assertFalse(self.history.exists())

    def test_failed_second_replace_restores_csv_collection_and_chain(self):
        original = {path: path.read_bytes() for path in (self.csv, self.collection, self.revisions)}
        replace = maintenance.os.replace
        failed = False

        def replace_once(source, target):
            nonlocal failed
            if Path(target) == self.collection and not failed:
                failed = True
                raise OSError("模拟集合文件替换失败")
            return replace(source, target)

        with patch.object(maintenance.os, "replace", side_effect=replace_once):
            with self.assertRaises(ValueError):
                services.update_admin_mushroom("5", self.form({"识别特征": "新描述"}, AdminSelectionForm(order=2)))
        self.assertEqual(original, {path: path.read_bytes() for path in original})
        self.assertTrue(list(self.history.glob("*/failed.json")))
        self.assertFalse(list(self.root.glob(".*.tmp")))

    def test_external_unregistered_csv_change_is_not_added_to_review_chain(self):
        self.csv.write_bytes(self.original.replace("原始描述".encode(), "外部改动".encode()))
        with self.assertRaises(maintenance.AdminRevisionConflict):
            services.update_admin_mushroom("5", self.form({"识别特征": "继续修改"}))
        self.assertFalse(self.history.exists())

    def test_failed_chain_replace_restores_both_data_files(self):
        original = {path: path.read_bytes() for path in (self.csv, self.collection, self.revisions)}
        replace = maintenance.os.replace

        def reject_chain(source, target):
            if Path(target) == self.revisions:
                raise OSError("模拟修订清单替换失败")
            return replace(source, target)

        with patch.object(maintenance.os, "replace", side_effect=reject_chain):
            with self.assertRaises(ValueError):
                services.update_admin_mushroom("5", self.form({"识别特征": "新描述"}, AdminSelectionForm(order=2)))
        self.assertEqual(original, {path: path.read_bytes() for path in original})


if __name__ == "__main__":
    unittest.main()
