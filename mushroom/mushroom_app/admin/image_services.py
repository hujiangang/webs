"""校验后台上传内容并维护主图、附图引用；原始文件只新增不删除。"""

import io
import warnings
from pathlib import Path
from uuid import uuid4

from PIL import Image, UnidentifiedImageError
from starlette.datastructures import UploadFile

from mushroom_app.admin.image_repository import (
    DATA_DIR,
    find_admin_image_entry,
    get_admin_photo_credit,
    read_admin_image_document,
    write_admin_image_document,
    write_image_file_atomic,
)
from mushroom_app.admin.maintenance_repository import AdminRevisionConflict, maintenance_lock
from mushroom_app.collections.models import CollectionPhoto


MAX_IMAGE_BYTES = 20 * 1024 * 1024
MAX_IMAGE_PIXELS = 50_000_000
IMAGE_FORMATS = {"JPEG": ".jpg", "PNG": ".png", "WEBP": ".webp"}


def get_admin_image_state(mushroom_id: str, scientific_name: str) -> dict:
    """返回后台指定主图、附图及提交时使用的清单版本。"""
    document, revision = read_admin_image_document()
    entry = find_admin_image_entry(document, mushroom_id, scientific_name)
    main = get_admin_photo_credit(entry["main"], True) if entry and entry.get("main") else None
    extras = []
    if entry:
        for item in sorted(entry["extras"], key=lambda item: item["index"]):
            credit = get_admin_photo_credit(item["photo"])
            if credit is not None:
                extras.append({"index": item["index"], "url": credit.url})
    return {"main_image_url": main.url if main else "", "has_admin_main": bool(entry and entry.get("main")),
            "extra_images": extras, "image_revision": revision}


def read_validated_upload(upload: UploadFile) -> tuple[bytes, str]:
    """按实际解码格式接收图片，限制大小和像素数，拒绝伪装后缀及坏图。"""
    suffix = Path(upload.filename or "").suffix.lower()
    if suffix not in {".jpg", ".jpeg", ".png", ".webp"}:
        raise ValueError("仅支持 JPG、PNG、WebP 图片")
    content = upload.file.read(MAX_IMAGE_BYTES + 1)
    if not content or len(content) > MAX_IMAGE_BYTES:
        raise ValueError("图片不能为空，且不能超过 20 MB")
    try:
        with warnings.catch_warnings():
            warnings.simplefilter("error", Image.DecompressionBombWarning)
            with Image.open(io.BytesIO(content)) as image:
                image_format = image.format
                if image_format not in IMAGE_FORMATS or image.width * image.height > MAX_IMAGE_PIXELS:
                    raise ValueError("图片格式不支持或像素数超过 5000 万")
                actual_suffix = IMAGE_FORMATS[image_format]
                if suffix != actual_suffix and not (suffix == ".jpeg" and actual_suffix == ".jpg"):
                    raise ValueError("图片扩展名与实际格式不一致")
                image.verify()
            with Image.open(io.BytesIO(content)) as image:
                image.load()
    except (UnidentifiedImageError, OSError, SyntaxError, Image.DecompressionBombError,
            Image.DecompressionBombWarning) as error:
        raise ValueError("图片无法完整解码，请重新导出后上传") from error
    return content, actual_suffix


def read_editable_entry(mushroom_id: str, scientific_name: str, expected_revision: str | None) -> tuple[dict, dict]:
    """调用方持有维护锁时，核对版本并取得可修改的完整清单。"""
    if not mushroom_id.isdigit() or not scientific_name.strip():
        raise ValueError("图片必须关联有效菌子编号与学名")
    document, revision = read_admin_image_document()
    if expected_revision is not None and expected_revision != revision:
        raise AdminRevisionConflict("图片已被其他页面更新，请刷新后再操作")
    entry = find_admin_image_entry(document, mushroom_id, scientific_name)
    if entry is None:
        entry = {"id": mushroom_id, "scientific_name": scientific_name, "main": None, "extras": []}
        document["entries"].append(entry)
    return document, entry


def upload_admin_image(mushroom_id: str, scientific_name: str, upload: UploadFile,
                       expected_revision: str | None, *, primary: bool) -> None:
    content, suffix = read_validated_upload(upload)
    with maintenance_lock():
        document, entry = read_editable_entry(mushroom_id, scientific_name, expected_revision)
        available = next((number for number in range(1, 4)
                          if number not in {item["index"] for item in entry["extras"]}), None)
        if not primary and available is None:
            raise ValueError("后台附图最多只能上传 3 张，请先撤下一张")
        relative = f"image/admin/{mushroom_id}/{uuid4().hex}{suffix}"
        photo = CollectionPhoto(
            path=relative, source_type="admin_uploaded", source_title="管理员上传",
            identification_status="名称由维护者关联；拍摄者、拍摄地与许可未提供",
            usage_note="后台上传仅记录维护者的关联，未自动赋予开放许可或科学鉴定结论。",
            reference_only=True, classification_scope="维护者关联到当前档案，具体鉴定范围待补充",
        ).model_dump(mode="json")
        if primary:
            entry["main"] = photo
        else:
            entry["extras"].append({"index": available, "photo": photo})
        try:
            # 先完整落盘图片，再替换清单；任一步失败均不更改既有照片引用。
            write_image_file_atomic(DATA_DIR / relative, content)
            write_admin_image_document(document)
        except OSError as error:
            raise ValueError("图片保存失败，原有图片保持不变") from error


def upload_admin_main_image(mushroom_id: str, scientific_name: str, upload: UploadFile,
                            expected_revision: str | None = None) -> None:
    upload_admin_image(mushroom_id, scientific_name, upload, expected_revision, primary=True)


def upload_admin_extra_image(mushroom_id: str, scientific_name: str, upload: UploadFile,
                             expected_revision: str | None = None) -> None:
    upload_admin_image(mushroom_id, scientific_name, upload, expected_revision, primary=False)


def clear_admin_main_image(mushroom_id: str, scientific_name: str,
                           expected_revision: str | None = None) -> None:
    with maintenance_lock():
        document, entry = read_editable_entry(mushroom_id, scientific_name, expected_revision)
        if entry["main"] is None:
            raise ValueError("当前没有后台指定的主图")
        entry["main"] = None
        persist_reference_change(document)


def delete_admin_extra_image(mushroom_id: str, scientific_name: str, index: int,
                             expected_revision: str | None = None) -> None:
    with maintenance_lock():
        document, entry = read_editable_entry(mushroom_id, scientific_name, expected_revision)
        if index not in {item["index"] for item in entry["extras"]}:
            raise ValueError("后台附图不存在")
        entry["extras"] = [item for item in entry["extras"] if item["index"] != index]
        persist_reference_change(document)


def persist_reference_change(document: dict) -> None:
    """撤下只变更引用，文件保留供日后恢复和核查。"""
    try:
        write_admin_image_document(document)
    except OSError as error:
        raise ValueError("图片引用保存失败，原有图片保持不变") from error
