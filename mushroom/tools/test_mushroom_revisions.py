"""验证补证差异重放不会放过基线漂移、重复或错误物种修改。"""
import hashlib
import json
from pathlib import Path
import tempfile
import unittest

from validate_mushroom_data import replay_reviewed_changes


class ReviewedRevisionTests(unittest.TestCase):
    def setUp(self):
        self.folder = tempfile.TemporaryDirectory()
        self.addCleanup(self.folder.cleanup)
        self.path = Path(self.folder.name) / "accepted-changes.json"
        baseline = self.path.parent / "backup/data/mushroom.csv"
        baseline.parent.mkdir(parents=True)
        baseline.write_bytes(b"baseline")
        self.rows = [{"编号": "8", "名称": "干巴菌", "拉丁名": "Thelephora ganbajun", "识别特征": "待核实"}]
        self.change = {"id": "8", "scientific_name": "Thelephora ganbajun", "field": "识别特征", "before": "待核实", "after": "经文献核对的特征"}
        self.revision = {"source_sha256": hashlib.sha256(b"baseline").hexdigest(), "output_sha256": "approved", "changes": [self.change]}

    def replay(self, current_hash="approved"):
        self.path.write_text(json.dumps(self.revision), encoding="utf-8")
        errors = []
        result = replay_reviewed_changes(self.rows, current_hash, errors, self.path)
        return result, errors

    def test_approved_change_preserves_original_baseline(self):
        result, errors = self.replay()
        self.assertEqual([], errors)
        self.assertEqual("经文献核对的特征", result[0]["识别特征"])
        self.assertEqual("待核实", self.rows[0]["识别特征"])

    def test_unrecorded_file_change_is_rejected(self):
        _, errors = self.replay("unreviewed")
        self.assertIn("当前CSV散列与审阅修订不一致", errors)

    def test_modified_backup_bytes_are_rejected(self):
        (self.path.parent / "backup/data/mushroom.csv").write_bytes(b"changed-backup")
        self.assertIn("补证基线CSV散列不一致", self.replay()[1])

    def test_changed_baseline_or_wrong_taxon_is_rejected(self):
        for key, value in (("before", "另一份基线"), ("scientific_name", "Thelephora terrestris")):
            with self.subTest(key=key):
                original = self.change[key]
                self.change[key] = value
                result, errors = self.replay()
                self.assertTrue(errors)
                self.assertEqual(self.rows, result)
                self.change[key] = original

    def test_duplicate_or_identity_change_is_rejected(self):
        self.revision["changes"].append(dict(self.change))
        self.assertTrue(self.replay()[1])
        self.revision["changes"] = [{**self.change, "field": "拉丁名", "before": "Thelephora ganbajun", "after": "Thelephora terrestris"}]
        self.assertTrue(self.replay()[1])

    def prepare_chain(self):
        """建立两次连续补证，同一字段允许在下一批继续修订。"""
        first_hash = hashlib.sha256(b"first-output").hexdigest()
        revisions = [
            {**self.revision, "output_sha256": first_hash},
            {"source_sha256": first_hash, "output_sha256": "second-output",
             "changes": [{**self.change, "before": self.change["after"], "after": "补充第二篇文献后的特征"}]},
        ]
        paths = []
        for index, revision in enumerate(revisions):
            path = self.path.parent / f"batch-{index}" / "accepted-changes.json"
            baseline = path.parent / "backup/data/mushroom.csv"
            baseline.parent.mkdir(parents=True)
            baseline.write_bytes(b"baseline" if index == 0 else b"first-output")
            path.write_text(json.dumps(revision), encoding="utf-8")
            paths.append(path)
        self.path.write_text(json.dumps({"revisions": [str(path.relative_to(self.path.parent)) for path in paths]}), encoding="utf-8")
        return paths

    def test_sequential_batches_can_refine_same_field(self):
        self.prepare_chain()
        errors = []
        result = replay_reviewed_changes(self.rows, "second-output", errors, self.path)
        self.assertEqual([], errors)
        self.assertEqual("补充第二篇文献后的特征", result[0]["识别特征"])
        self.assertEqual("待核实", self.rows[0]["识别特征"])

    def test_disconnected_batch_hash_is_rejected(self):
        paths = self.prepare_chain()
        revision = json.loads(paths[1].read_text(encoding="utf-8"))
        revision["source_sha256"] = "unrelated-baseline"
        paths[1].write_text(json.dumps(revision), encoding="utf-8")
        errors = []
        replay_reviewed_changes(self.rows, "second-output", errors, self.path)
        self.assertIn("相邻审阅批次的输入输出散列不连续", errors)

    def test_empty_duplicate_or_outside_batch_path_is_rejected(self):
        paths = self.prepare_chain()
        relative = str(paths[0].relative_to(self.path.parent))
        for entries in ([], [relative, relative], ["../outside.json"]):
            with self.subTest(entries=entries):
                self.path.write_text(json.dumps({"revisions": entries}), encoding="utf-8")
                errors = []
                result = replay_reviewed_changes(self.rows, "second-output", errors, self.path)
                self.assertTrue(errors)
                self.assertEqual(self.rows, result)

    def addition(self):
        return {"id": "9", "scientific_name": "Russula discoidea", "row": {
            "编号": "9", "名称": "Russula discoidea", "拉丁名": "Russula discoidea", "识别特征": "有中国模式标本的文献描述"}}

    def test_approved_new_species_is_appended_without_changing_baseline(self):
        addition = self.addition()
        self.revision["added_records"] = [addition]
        result, errors = self.replay()
        self.assertEqual([], errors)
        self.assertEqual(addition["row"], result[1])
        self.assertEqual(1, len(self.rows))

    def test_new_species_rejects_duplicates_incomplete_fields_and_wrong_identity(self):
        for field, value in (("编号", "8"), ("名称", "干巴菌"), ("拉丁名", "Thelephora ganbajun"),
                             ("编号", "invalid"), ("识别特征", None)):
            with self.subTest(field=field, value=value):
                addition = self.addition()
                addition["row"][field] = value
                self.revision["added_records"] = [addition]
                result, errors = self.replay()
                self.assertTrue(errors)
                self.assertEqual(1, len(result))
        addition = self.addition()
        del addition["row"]["识别特征"]
        self.revision["added_records"] = [addition]
        self.assertTrue(self.replay()[1])
        self.revision["added_records"] = [self.addition(), self.addition()]
        self.assertTrue(self.replay()[1])

    def test_new_species_rejects_qualified_or_whitespace_variants(self):
        for name in ("Thelephora ganbajun ", " Russula discoidea", "Russula cf. discoidea", "Russula  discoidea"):
            with self.subTest(name=name):
                addition = self.addition()
                addition["scientific_name"] = name
                addition["row"]["拉丁名"] = name
                self.revision["added_records"] = [addition]
                result, errors = self.replay()
                self.assertTrue(errors)
                self.assertEqual(1, len(result))

    def test_later_batch_can_refine_previously_added_species(self):
        paths = self.prepare_chain()
        first = json.loads(paths[0].read_text(encoding="utf-8"))
        first["added_records"] = [self.addition()]
        paths[0].write_text(json.dumps(first), encoding="utf-8")
        second = json.loads(paths[1].read_text(encoding="utf-8"))
        second["changes"] = [{"id": "9", "scientific_name": "Russula discoidea", "field": "识别特征",
                              "before": self.addition()["row"]["识别特征"], "after": "再次补证的描述"}]
        paths[1].write_text(json.dumps(second), encoding="utf-8")
        errors = []
        result = replay_reviewed_changes(self.rows, "second-output", errors, self.path)
        self.assertEqual([], errors)
        self.assertEqual("再次补证的描述", result[1]["识别特征"])


if __name__ == "__main__":
    unittest.main()
