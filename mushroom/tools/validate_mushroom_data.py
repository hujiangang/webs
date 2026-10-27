"""校验菌物资料结构与安全字段一致性，不替代真菌分类或毒理专家鉴定。"""
import argparse
import csv
import hashlib
import json
import re
from collections import Counter
from pathlib import Path

PROJECT = Path(__file__).resolve().parents[1]
REVIEW = PROJECT / "data" / "review-20261026"
REVISION = PROJECT / "data" / "reviewed-revisions.json"
ORIGINAL_HEADERS = ["编号", "名称", "拉丁名", "是否有毒性", "是否可食用", "生长环境", "识别特征", "食用价值", "参考价格"]
EXTRA_HEADERS = ["规范中文名", "记录类型", "中国记录与分布", "资料来源", "来源定位", "字段核查状态", "核查日期", "关联编号", "价格地区", "价格日期", "价格商品与口径", "价格来源"]


def validate(path):
    errors = []
    raw = path.read_bytes()
    if not raw.startswith(b"\xef\xbb\xbf"):
        errors.append("文件应为带BOM的UTF-8，兼容现有中文表格工具")
    with path.open(encoding="utf-8-sig", newline="") as file:
        reader = csv.DictReader(file)
        rows = list(reader)
        headers = reader.fieldnames or []
    if headers[:9] != ORIGINAL_HEADERS:
        errors.append("原有前9个字段或顺序发生不兼容变化")
    missing = set(EXTRA_HEADERS) - set(headers)
    if missing:
        errors.append("缺少证据字段：" + "、".join(sorted(missing)))
        return errors, {"记录数": len(rows)}
    check_rows(rows, headers, errors)
    ids = {row["编号"] for row in rows}
    if not {str(number) for number in range(1, 62)} <= ids:
        errors.append("原有编号1至61未全部保留")
    by_id = {row["编号"]: row for row in rows}
    check_regressions(by_id, errors)
    prepared_path = REVIEW / "prepared_dataset.json"
    if prepared_path.exists():
        prepared = json.loads(prepared_path.read_text(encoding="utf-8"))
        expected_rows = replay_reviewed_changes(prepared["rows"], hashlib.sha256(raw).hexdigest(), errors)
        if expected_rows != rows:
            errors.append("写入CSV与已核查待写入数据不一致")
        mapping = prepared["catalog_mapping"]
        if len(mapping) != 7138 or len({item["id"] for item in mapping}) != 7138 or any(item["id"] not in ids for item in mapping):
            errors.append("7138条历史基线覆盖对账失败")
        for key, count in (("ecology_mapping", 100), ("toxic_mapping", 165)):
            if len(prepared[key]) != count or any(item["id"] not in ids for item in prepared[key]):
                errors.append(key + "来源覆盖对账失败")
        for item in prepared["toxic_mapping"]:
            row = by_id[item["id"]]
            if "中毒关联记录" not in row["是否有毒性"] or row["是否可食用"].startswith("有食用记载"):
                errors.append("中毒关联条目被食用属性覆盖：" + row["编号"])
    stats = {"记录数": len(rows), "字段数": len(headers), "记录类型": dict(Counter(r["记录类型"] for r in rows)),
             "有历史行情的条目数": sum(bool(r["价格来源"]) for r in rows),
             "生境待核条目数": sum(r["生长环境"].startswith("待核实") for r in rows),
             "识别特征待核条目数": sum(r["识别特征"].startswith("待核实") for r in rows),
             "食用性未定条目数": sum(r["是否可食用"].startswith("食用性未核实") for r in rows),
             "SHA256": hashlib.sha256(raw).hexdigest(),
             "校验边界": "结构、来源登记、基线对账及已知危险表述检查；不等于所有物种资料科学审核完成"}
    return errors, stats


def replay_reviewed_changes(rows, csv_sha256, errors, revision_path=REVISION):
    """按审阅差异重放后续补证，保留原基线并拒绝未登记的单元格变化。"""
    if not revision_path.exists():
        return rows
    document = json.loads(revision_path.read_text(encoding="utf-8"))
    paths = [revision_path]
    if "revisions" in document:
        paths = [(revision_path.parent / name).resolve() for name in document["revisions"]]
        if not paths or len(paths) != len(set(paths)) or any(not path.is_relative_to(revision_path.parent.resolve()) for path in paths):
            errors.append("审阅批次列表为空、重复或超出资料目录")
            return rows
    expected = [dict(row) for row in rows]
    previous_hash = None
    for path in paths:
        revision = json.loads(path.read_text(encoding="utf-8"))
        if previous_hash is not None and revision["source_sha256"] != previous_hash:
            errors.append("相邻审阅批次的输入输出散列不连续")
        expected = replay_one_revision(expected, revision, path, errors)
        previous_hash = revision["output_sha256"]
    if csv_sha256 != previous_hash:
        errors.append("当前CSV散列与审阅修订不一致")
    return expected


def replay_one_revision(rows, revision, revision_path, errors):
    """每批以自己的基线核对旧值，允许下一批继续修订同一字段。"""
    baseline = revision_path.parent / "backup" / "data" / "mushroom.csv"
    if hashlib.sha256(baseline.read_bytes()).hexdigest() != revision["source_sha256"]:
        errors.append("补证基线CSV散列不一致")
    expected = [dict(row) for row in rows]
    by_id = {row["编号"]: row for row in expected}
    changed = set()
    for change in revision["changes"]:
        key = (change["id"], change["field"])
        row = by_id.get(change["id"])
        field = change["field"]
        if (key in changed or row is None or field not in row
                or field in ("编号", "名称", "拉丁名") or row[field] != change["before"]
                or row["拉丁名"] != change["scientific_name"]):
            errors.append("补证差异无法重放：" + "/".join(key))
            continue
        changed.add(key)
        row[field] = change["after"]
    replay_additions(expected, revision.get("added_records", []), errors)
    return expected


def replay_additions(expected, additions, errors):
    """只追加经过完整行批准的新物种，拒绝身份冲突或缺列。"""
    if not additions:
        return
    headers = set(expected[0])
    ids = {row["编号"] for row in expected}
    names = {row["名称"] for row in expected}
    scientific_names = {row["拉丁名"].strip().casefold() for row in expected}
    old_max = max(int(number) for number in ids)
    for addition in additions:
        row = addition.get("row", {})
        number = row.get("编号", "")
        scientific_name = row.get("拉丁名", "")
        if (set(row) != headers or any(not isinstance(value, str) for value in row.values())
                or not number.isdigit() or int(number) <= old_max
                or number != addition.get("id") or scientific_name != addition.get("scientific_name")
                or not row.get("名称", "").strip() or not re.fullmatch(r"[A-Z][a-z-]+ [a-z][a-z-]+", scientific_name)
                or number in ids or row["名称"] in names or scientific_name.casefold() in scientific_names):
            errors.append("新增记录无法重放：" + str(addition.get("id", "缺编号")))
            continue
        expected.append(dict(row))
        ids.add(number)
        names.add(row["名称"])
        scientific_names.add(scientific_name.casefold())


def check_rows(rows, headers, errors):
    ids = [row["编号"] for row in rows]
    names = [row["名称"] for row in rows]
    for label, values in [("编号", ids), ("名称", names)]:
        if len(values) != len(set(values)):
            errors.append(label + "重复")
    seen_species = {}
    for row in rows:
        number = row["编号"]
        if set(row) != set(headers) or any(value is None for value in row.values()):
            errors.append(f"编号{number}列数不一致")
            continue
        if not number.isdigit() or not row["名称"].strip():
            errors.append(f"编号{number}标识不合法")
        if row["关联编号"] and row["关联编号"] not in ids:
            errors.append(f"编号{number}关联目标不存在")
        if re.fullmatch(r"[A-Za-z-]+ [a-z-]+", row["拉丁名"]) and row["记录类型"] != "别名条目":
            key = row["拉丁名"].casefold()
            if key in seen_species:
                errors.append(f"编号{number}与{seen_species[key]}学名完全重复")
            seen_species[key] = number
        if re.search(r"\d", row["参考价格"]) and not row["参考价格"].startswith("参见编号"):
            if not all(row[key] for key in ("价格地区", "价格日期", "价格商品与口径", "价格来源")):
                errors.append(f"编号{number}数字价格缺少口径或来源")
        if row["是否可食用"].startswith("有食用记载") and any(x in row["是否有毒性"] for x in ("有毒", "剧毒", "中毒", "潜在毒性")):
            errors.append(f"编号{number}食用标记与毒性冲突")
        for text in ("充分煮熟可食", "煮熟后方可食用", "新手友好", "有抗癌功效", "有补血养颜功效", "无毒（幼时）"):
            if any(text in row[key] for key in ORIGINAL_HEADERS[3:9]):
                errors.append(f"编号{number}残留未经证实的安全或疗效结论：{text}")
        if row["是否有毒性"] == "无毒":
            errors.append(f"编号{number}仍为无条件无毒结论")
        if int(number) > 61 and not row["资料来源"].startswith("http"):
            errors.append(f"编号{number}新增记录无来源")


def check_regressions(by_id, errors):
    required = {"8": ("名称", "干巴菌"), "9": ("是否有毒性", "肾"),
                "15": ("规范中文名", "纹缘盔孢伞"), "32": ("规范中文名", "条盖盔孢伞"),
                "16": ("食用价值", "蝇蕈醇"), "30": ("是否有毒性", "神经精神"),
                "43": ("拉丁名", "Lactarius hatsudake"), "56": ("关联编号", "52"), "60": ("关联编号", "2")}
    for number, (key, expected) in required.items():
        if number not in by_id or expected not in by_id[number][key]:
            errors.append(f"已知错误回归：编号{number}的{key}")


def main():
    parser = argparse.ArgumentParser(description="校验菌物资料与来源登记")
    parser.add_argument("--csv", type=Path, default=PROJECT / "data" / "mushroom.csv")
    parser.add_argument("--report", type=Path)
    args = parser.parse_args()
    errors, stats = validate(args.csv)
    report = {"通过": not errors, "错误": errors, "统计": stats}
    if args.report:
        args.report.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    raise SystemExit(1 if errors else 0)


if __name__ == "__main__":
    main()
