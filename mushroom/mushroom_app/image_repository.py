"""只读图片来源清单，按编号和学名返回可用图片及其署名。"""

import json
from functools import lru_cache
from pathlib import Path, PurePosixPath
from urllib.parse import urlsplit

from pydantic import ValidationError

from mushroom_app.config import DATA_DIR
from mushroom_app.models import ImageCredit


@lru_cache(maxsize=2)
def _read_source_index(path: str, mtime_ns: int, size: int) -> dict:
    # 修改时间与大小参与缓存键，下载清单替换后无需重启应用。
    try:
        document = json.loads(Path(path).read_text(encoding="utf-8-sig"))
    except (OSError, ValueError):
        return {}
    if not isinstance(document, dict) or not isinstance(document.get("images"), list):
        return {}
    index: dict[tuple[str, str], list[dict]] = {}
    for image in document["images"]:
        if not isinstance(image, dict):
            continue
        mushroom_id = image.get("mushroom_id")
        scientific_name = image.get("scientific_name")
        if isinstance(mushroom_id, str) and isinstance(scientific_name, str):
            index.setdefault((mushroom_id, scientific_name), []).append(image)
    return index


def _is_web_url(value: object) -> bool:
    if not isinstance(value, str):
        return False
    try:
        parsed = urlsplit(value)
        return parsed.scheme in {"http", "https"} and bool(parsed.hostname)
    except ValueError:
        return False


def _validated_credit(image: dict, mushroom_id: str) -> ImageCredit | None:
    # 仅允许下载目录内的真实文件，不能通过清单把任意文件暴露为图片。
    relative = image.get("path", "")
    if not isinstance(relative, str) or "\\" in relative:
        return None
    path = PurePosixPath(relative)
    if path.is_absolute() or ".." in path.parts or path.parts[:3] != ("image", "downloaded", mushroom_id):
        return None
    if path.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp", ".gif"}:
        return None
    try:
        resolved = (DATA_DIR / relative).resolve()
        if not resolved.is_relative_to((DATA_DIR / "image" / "downloaded").resolve()) or not resolved.is_file():
            return None
    except (OSError, ValueError):
        return None
    if image.get("url") != "/" + path.as_posix():
        return None
    if not all(_is_web_url(image.get(key)) for key in ("source_url", "license_url")):
        return None
    try:
        return ImageCredit.model_validate(image)
    except ValidationError:
        return None


def find_mushroom_image_credits(mushroom_id: str, scientific_name: str) -> list[ImageCredit]:
    """返回确切编号、学名匹配的本地图片，中国拍摄记录优先。"""
    if not mushroom_id or not scientific_name:
        return []
    manifest = DATA_DIR / "image_sources.json"
    try:
        status = manifest.stat()
    except OSError:
        return []
    images = _read_source_index(str(manifest), status.st_mtime_ns, status.st_size)
    credits: list[ImageCredit] = []
    seen: set[str] = set()
    for image in images.get((mushroom_id, scientific_name), []):
        credit = _validated_credit(image, mushroom_id)
        if credit is not None and credit.url not in seen:
            credits.append(credit)
            seen.add(credit.url)
    return sorted(credits, key=lambda credit: (not credit.china_record, credit.reference_only))


def get_mushroom_image_keys() -> set[tuple[str, str]]:
    """一次读取已登记且文件可用的图片键，供目录筛选使用。"""
    manifest = DATA_DIR / "image_sources.json"
    try:
        status = manifest.stat()
    except OSError:
        return set()
    index = _read_source_index(str(manifest), status.st_mtime_ns, status.st_size)
    return {key for key, images in index.items()
            if all(key) and any(_validated_credit(image, key[0]) is not None for image in images)}
