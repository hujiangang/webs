"""验证图片文件、来源、物种连接和原素材保留；不代替专家物种鉴定。"""
import csv
import hashlib
import json
from collections import Counter
from pathlib import Path
import sys

from PIL import Image

PROJECT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT))
from mushroom_app.image_repository import find_mushroom_image_credits
from validate_mushroom_data import validate

REVIEW = PROJECT / "data" / "image-review-20261026"


def main():
    manifest = json.loads((PROJECT / "data" / "image_sources.json").read_text(encoding="utf-8"))
    with (PROJECT / "data" / "mushroom.csv").open(encoding="utf-8-sig", newline="") as file:
        rows = {row["编号"]: row for row in csv.DictReader(file)}
    errors = []
    images = manifest["images"]
    identities = {(item["source"], item["source_id"]) for item in images}
    if len(identities) != len(images):
        errors.append("展示清单存在重复来源图片")
    if len({(item["mushroom_id"], item["sha256"]) for item in images}) != len(images):
        errors.append("同一档案重复展示完全相同的图片文件")
    decisions = json.loads((REVIEW / "image-review-decisions.json").read_text(encoding="utf-8"))
    for item in decisions:
        if item["action"] == "exclude" and (item["source"], item["source_id"]) in identities:
            errors.append("审阅排除图片重新进入展示清单：" + item["source_id"])
    for image in images:
        number = image["mushroom_id"]
        row = rows.get(number)
        if row is None or row["拉丁名"] != image["scientific_name"]:
            errors.append("图片与当前编号/学名不一致：" + number)
            continue
        path = PROJECT / "data" / image["path"]
        if hashlib.sha256(path.read_bytes()).hexdigest() != image["sha256"]:
            errors.append("文件哈希不一致：" + image["path"])
        with Image.open(path) as picture:
            picture.load()
            if list(picture.size) != image["dimensions"] or min(picture.size) < 300:
                errors.append("图片尺寸异常：" + image["path"])
        for key in ("source_url", "author", "license", "license_url", "identification_status", "location_label"):
            if not image.get(key):
                errors.append("缺少" + key + "：" + image["path"])
        if not image["license_url"].startswith(("https://creativecommons.org/licenses/by/", "https://creativecommons.org/licenses/by-sa/", "https://creativecommons.org/publicdomain/zero/")):
            errors.append("图片许可不在本次接收范围：" + image["path"])
        if image["url"] not in [credit.url for credit in find_mushroom_image_credits(number, row["拉丁名"])]:
            errors.append("前台来源读取拒绝：" + image["path"])
    original = json.loads((REVIEW / "existing-image-audit.json").read_text(encoding="utf-8"))
    for item in original["files"]:
        path = PROJECT / "data" / item["path"]
        if not path.exists() or hashlib.sha256(path.read_bytes()).hexdigest() != item["sha256"]:
            errors.append("原图片被修改：" + item["path"])
    csv_hash = hashlib.sha256((PROJECT / "data" / "mushroom.csv").read_bytes()).hexdigest()
    # CSV可通过单独审阅的补证修订更新，仍须完整通过基线与差异重放检查。
    data_errors, _ = validate(PROJECT / "data" / "mushroom.csv")
    errors.extend("关联数据校验：" + error for error in data_errors)
    ids = {item["mushroom_id"] for item in images}
    files = [path for path in (PROJECT / "data" / "image" / "downloaded").rglob("*") if path.is_file() and path.suffix != ".part"]
    report = {"通过": not errors, "错误": errors, "本地新增下载文件": len(files), "纳入展示图片": len(images), "新图对应条目": len(ids),
              "未纳入展示文件": len(files) - len(images),
              "中国地点有来源的图片": sum(item["china_record"] for item in images),
              "中国地点有来源的条目": len({item["mushroom_id"] for item in images if item["china_record"]}),
              "来源": dict(Counter(item["source"] for item in images)), "总字节": sum(item["bytes"] for item in images),
              "保留原图片": len(original["files"]), "主CSV未修改": csv_hash == original["original_csv_sha256"],
              "主CSV通过审阅差异校验": not data_errors,
              "限制": "文件解码、哈希、来源字段、许可和学名连接检查；不是对照片物种或拍摄地的独立专家鉴定"}
    (REVIEW / "image-validation.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    raise SystemExit(1 if errors else 0)


if __name__ == "__main__":
    main()
