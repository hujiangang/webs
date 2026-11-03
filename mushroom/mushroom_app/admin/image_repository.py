"""后台图片清单与文件持久化，不覆盖原始素材和来源图库。"""

import hashlib
import json
import os
import tempfile
from pathlib import Path
from urllib.parse import quote

from pydantic import ValidationError

from mushroom_app.collections.models import CollectionPhoto
from mushroom_app.config import DATA_DIR
from mushroom_app.models import ImageCredit


def read_admin_image_document() -> tuple[dict, str]:
    """返回完整清单与内容版本；损坏清单拒绝编辑，避免静默覆盖。"""
    path = DATA_DIR / "admin-images.json"
    if not path.exists():
        return {"version": 1, "entries": []}, "absent"
    try:
        content = path.read_bytes()
        document = json.loads(content.decode("utf-8-sig"))
        if not isinstance(document, dict) or document.get("version") != 1:
            raise ValueError("后台图片清单版本不正确")
        entries = document.get("entries")
        if not isinstance(entries, list):
            raise ValueError("后台图片清单缺少条目")
        keys = set()
        for entry in entries:
            validate_admin_image_entry(entry)
            key = (entry["id"], entry["scientific_name"])
            if key in keys:
                raise ValueError("后台图片清单存在重复条目")
            keys.add(key)
    except (OSError, UnicodeError, TypeError, KeyError, ValidationError) as error:
        raise ValueError("后台图片清单无法读取，请先检查文件") from error
    return document, hashlib.sha256(content).hexdigest()


def validate_admin_image_entry(entry: dict) -> None:
    """清单路径只能指向当前编号专属的后台图片目录。"""
    if (not isinstance(entry, dict) or not isinstance(entry.get("id"), str)
            or not entry["id"].isdigit() or not isinstance(entry.get("scientific_name"), str)
            or not entry["scientific_name"].strip() or not isinstance(entry.get("extras"), list)):
        raise ValueError("后台图片条目格式不正确")
    extras = entry["extras"]
    indexes = [item.get("index") for item in extras if isinstance(item, dict)]
    if len(indexes) != len(extras) or len(set(indexes)) != len(indexes) or any(index not in (1, 2, 3) for index in indexes):
        raise ValueError("后台附图序号不正确")
    photos = [item["photo"] for item in extras]
    if entry.get("main") is not None:
        photos.append(entry["main"])
    for value in photos:
        photo = CollectionPhoto.model_validate(value)
        if photo.source_type != "admin_uploaded" or not photo.path.startswith(f"image/admin/{entry['id']}/"):
            raise ValueError("后台图片清单路径与编号不一致")


def write_admin_image_document(document: dict) -> None:
    """以同目录临时文件原子替换清单，失败时保留旧引用。"""
    content = json.dumps(document, ensure_ascii=False, indent=2).encode("utf-8") + b"\n"
    write_image_file_atomic(DATA_DIR / "admin-images.json", content)


def write_image_file_atomic(target: Path, content: bytes) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary = tempfile.mkstemp(prefix=".upload-", suffix=".tmp", dir=target.parent)
    try:
        with os.fdopen(descriptor, "wb") as file:
            file.write(content)
            file.flush()
            os.fsync(file.fileno())
        os.replace(temporary, target)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def find_admin_image_entry(document: dict, mushroom_id: str, scientific_name: str) -> dict | None:
    return next((entry for entry in document["entries"]
                 if entry["id"] == mushroom_id and entry["scientific_name"] == scientific_name), None)


def get_admin_photo_credit(photo: dict, is_primary: bool = False) -> ImageCredit | None:
    """只返回仍可访问的后台图片，缺失文件不计入有图筛选。"""
    values = CollectionPhoto.model_validate(photo).model_dump(mode="json")
    relative = values.pop("path")
    path = (DATA_DIR / relative).resolve()
    try:
        if not path.is_relative_to((DATA_DIR / "image" / "admin").resolve()) or not path.is_file():
            return None
        if not path.stat().st_size:
            return None
    except OSError:
        return None
    return ImageCredit(url="/" + quote(relative, safe="/"), is_primary=is_primary, **values)


def get_admin_image_index() -> dict[tuple[str, str], list[ImageCredit]]:
    """一次读取后台配图索引，供全国与云南列表采用相同筛选口径。"""
    try:
        document, _ = read_admin_image_document()
    except ValueError:
        return {}
    index = {}
    for entry in document["entries"]:
        photos = [(entry["main"], True)] if entry.get("main") else []
        photos.extend((item["photo"], False) for item in sorted(entry["extras"], key=lambda item: item["index"]))
        credits = [credit for photo, primary in photos if (credit := get_admin_photo_credit(photo, primary)) is not None]
        if credits:
            index[(entry["id"], entry["scientific_name"])] = credits
    return index


def find_admin_image_credits(mushroom_id: str, scientific_name: str) -> list[ImageCredit]:
    return get_admin_image_index().get((mushroom_id, scientific_name), [])
