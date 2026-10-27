"""保证食用文献记录与危险、未知类别互不混淆。"""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from mushroom_app.models import MushroomItem
from mushroom_app.services import classify_risk, is_edible_mushroom


class MushroomRiskTests(unittest.TestCase):
    def test_literature_is_not_unconditional_safety(self):
        self.assertEqual(classify_risk("未作无毒保证；食用记载不等于实物鉴定", "有食用记载（2026编目）"), ("record", "食用记载"))

    def test_poison_evidence_takes_priority(self):
        self.assertEqual(classify_risk("有中毒关联记录（胃肠炎型）", "有食用记载"), ("danger", "有毒 / 风险"))

    def test_unknown_does_not_become_poison_or_food(self):
        self.assertEqual(classify_risk("毒性未知", "食用性未核实，不作为采食依据"), ("unknown", "资料待核实"))

    def test_potential_toxicity_remains_risk(self):
        self.assertEqual(classify_risk("有潜在毒性研究，人体安全性有争议", "不建议食用"), ("danger", "有毒 / 风险"))

    def test_game_cannot_label_risk_as_food(self):
        item = MushroomItem(id="测试", name="测试", toxicity="有中毒记录", edible="有食用记载", image_url="", risk_class="danger")
        self.assertFalse(is_edible_mushroom(item))

    def test_legacy_labels_remain_compatible(self):
        self.assertEqual(classify_risk("无毒", "可食用"), ("record", "食用记载"))
        self.assertEqual(classify_risk("剧毒", "不可食用"), ("danger", "有毒 / 风险"))


if __name__ == "__main__":
    unittest.main()
