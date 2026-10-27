"""图片采集公共规则：只按确切学名连接，逐图保留许可和来源。"""
import csv
import hashlib
import html
import json
import re
import time
from pathlib import Path

import requests

PROJECT = Path(__file__).resolve().parents[1]
REVIEW = PROJECT / "data" / "image-review-20261026"
IMAGE_ROOT = PROJECT / "data" / "image" / "downloaded"
COMMONS_API = "https://commons.wikimedia.org/w/api.php"
HEADERS = {"User-Agent": "MushroomReferenceResearch/1.0 (public fungal image metadata; local reference project)"}


def save_json(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    temporary.replace(path)


def read_json(path, default=None):
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else default


def plain(value):
    return " ".join(html.unescape(re.sub(r"<[^>]*>", " ", str(value or ""))).split())


def eligible_rows():
    with (PROJECT / "data" / "mushroom.csv").open(encoding="utf-8-sig", newline="") as file:
        rows = list(csv.DictReader(file))
    return [row for row in rows if re.fullmatch(r"[A-Za-z-]+ [a-z-]+(?: (?:var\.|subsp\.|f\.) [a-z-]+)?", row["拉丁名"])
            and not any(word in row["记录类型"] for word in ("俗名", "别名", "待复核", "历史定名"))]


def request_json(parameters):
    # 只作少量有界重试；遇到访问拒绝、验证码等不更换身份或绕过限制。
    for attempt in range(3):
        try:
            response = requests.get(COMMONS_API, params={"action": "query", "format": "json", "formatversion": 2, "maxlag": 5, **parameters},
                                    headers=HEADERS, timeout=45)
        except (requests.ConnectionError, requests.Timeout):
            if attempt == 2:
                raise
            time.sleep(2 * (attempt + 1))
            continue
        if response.status_code in (429, 503):
            retry_after = response.headers.get("Retry-After", "5")
            if not retry_after.isdigit() or int(retry_after) > 30:
                raise RuntimeError("来源要求较长等待，停止本项请求，后续再试")
            time.sleep(int(retry_after))
            continue
        response.raise_for_status()
        data = response.json()
        if data.get("error", {}).get("code") == "maxlag":
            time.sleep(5)
            continue
        if "error" in data:
            raise ValueError(str(data["error"]))
        return data
    raise RuntimeError("来源限流或繁忙，停止本项请求，保留状态后续重试")


def metadata_value(info, key):
    return plain(info.get("extmetadata", {}).get(key, {}).get("value", ""))


def commons_candidate(row, page):
    info = (page.get("imageinfo") or [{}])[0]
    title = page["title"]
    latin = row["拉丁名"]
    # 类别来自确切学名；文件标题或描述还需出现同一完整学名，拒绝近似词匹配。
    description = metadata_value(info, "ImageDescription")
    categories = metadata_value(info, "Categories")
    if not re.search(r"(?<![A-Za-z])" + re.escape(latin) + r"(?![A-Za-z-])", title + " " + description, re.I):
        return None
    if re.search(r"\b(cf|aff)\.?\s+" + re.escape(latin.split()[-1]), title + " " + description, re.I):
        return None
    if re.search(r"\b(group|complex|sensu)\b", title + " " + description, re.I):
        return None
    if info.get("mime") not in {"image/jpeg", "image/png", "image/webp"} or min(info.get("width", 0), info.get("height", 0)) < 360:
        return None
    if re.search(r"\b(spore|spores|microscopic|microscopy|phylogeny|phylogenetic|map|drawing|illustration|stamp|herbarium)\b", title, re.I):
        return None
    if re.search(r"\b(drawings?|illustrations?|paintings?|watercolou?rs?)\b", title + " " + description + " " + categories, re.I):
        return None
    license_url = metadata_value(info, "LicenseUrl").replace("http://", "https://")
    if not license_url.startswith(("https://creativecommons.org/licenses/by/", "https://creativecommons.org/licenses/by-sa/", "https://creativecommons.org/publicdomain/zero/")):
        return None
    author = metadata_value(info, "Artist")
    if not author or metadata_value(info, "Restrictions"):
        return None
    chinese_location = re.search(r"Fungi (?:of|in) (China|Yunnan|Sichuan|Tibet|Hong Kong|Taiwan|Macau|Guangdong|Guangxi|Fujian|Zhejiang|Hainan|Hubei|Hunan|Beijing)", categories, re.I)
    return {"mushroom_id": row["编号"], "mushroom_name": row["名称"], "scientific_name": latin,
            "source": "Wikimedia Commons", "source_id": str(page["pageid"]), "source_title": title,
            "source_url": info["descriptionurl"], "download_url": info.get("thumburl") or info["url"], "original_url": info["url"],
            "author": author, "license": metadata_value(info, "LicenseShortName"), "license_url": license_url,
            "source_description": description, "source_categories": categories,
            "location_label": "中国拍摄：" + chinese_location.group(1) + "（来源分类标注）" if chinese_location else "拍摄地未核定；同名物种参考图",
            "china_record": bool(chinese_location), "identification_status": "来源类别及文件标注学名一致；未经本项目标本或专家复核",
            "changes": "使用来源提供的缩略图，未裁切或改色", "checked_at": "2026-10-26"}


def download_image(item):
    from PIL import Image
    extension = Path(item["download_url"].split("?", 1)[0]).suffix.lower()
    if extension not in {".jpg", ".jpeg", ".png", ".webp"}:
        raise ValueError("来源图片扩展名不支持")
    folder = IMAGE_ROOT / item["mushroom_id"]
    folder.mkdir(parents=True, exist_ok=True)
    prefix = "commons" if item["source"] == "Wikimedia Commons" else "inat"
    target = folder / (prefix + "-" + item["source_id"] + extension)
    if not target.exists():
        with requests.get(item["download_url"], headers=HEADERS, timeout=60, stream=True) as response:
            response.raise_for_status()
            content = bytearray()
            for chunk in response.iter_content(65536):
                content.extend(chunk)
                if len(content) > 15_000_000:
                    raise ValueError("图片超过15MB，保留来源但不自动下载")
        temporary = target.with_suffix(target.suffix + ".part")
        temporary.write_bytes(content)
        try:
            with Image.open(temporary) as picture:
                picture.verify()
            temporary.replace(target)
        finally:
            temporary.unlink(missing_ok=True)
    with Image.open(target) as picture:
        picture.load()
        if min(picture.size) < 300:
            raise ValueError("下载图片尺寸不足")
        dimensions = list(picture.size)
    result = dict(item)
    result.update({"path": target.relative_to(PROJECT / "data").as_posix(), "url": "/" + target.relative_to(PROJECT / "data").as_posix(),
                   "dimensions": dimensions, "bytes": target.stat().st_size, "sha256": hashlib.sha256(target.read_bytes()).hexdigest()})
    return result
