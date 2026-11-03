"""后台资料浏览、精选展示维护与已登记的主表修订。"""

import math
from datetime import date

from starlette.datastructures import UploadFile

from mushroom_app.admin.maintenance_repository import (
    check_admin_revision,
    commit_admin_changes,
    get_admin_revision,
    json_bytes,
    maintenance_lock,
)
from mushroom_app.admin.models import (
    AdminExtraImage,
    AdminField,
    AdminMushroomForm,
    AdminMushroomItem,
    AdminMushroomList,
    AdminMushroomSummary,
    AdminSelectionForm,
)
from mushroom_app.admin.repositories import read_admin_csv_bytes, read_admin_rows, serialize_admin_rows
from mushroom_app.collections.models import CollectionEntry, MushroomCollection
from mushroom_app.collections.repositories import read_yunnan_collection
from mushroom_app.services import get_mushroom_detail


ADMIN_PAGE_SIZE = 50
IDENTITY_FIELDS = {"编号", "名称", "拉丁名"}


def get_admin_mushroom_list(keyword: str = "", collection: str = "yunnan",
                            page: int = 1) -> AdminMushroomList:
    """只为当页生成轻量摘要，搜索无需为全表扫描图片或创建编辑字段。"""
    if collection not in {"yunnan", "all"}:
        raise ValueError("请选择云南精选或全部资料")
    with maintenance_lock():
        selected = read_yunnan_collection()
        rows = read_admin_rows()
    entries = {(entry.id, entry.scientific_name): entry for entry in selected.entries}
    if collection == "yunnan":
        by_key = {(row["编号"], row["拉丁名"]): row for row in rows}
        rows = [by_key[key] for key in entries if key in by_key]
    word = keyword.strip().casefold()
    filtered = [row for row in rows if matches_admin_search(row, word, entries)]
    total_pages = max(1, math.ceil(len(filtered) / ADMIN_PAGE_SIZE))
    page = min(max(1, page), total_pages)
    start = (page - 1) * ADMIN_PAGE_SIZE
    items = []
    for row in filtered[start:start + ADMIN_PAGE_SIZE]:
        entry = entries.get((row["编号"], row["拉丁名"]))
        items.append(AdminMushroomSummary(
            id=row["编号"], name=row["名称"], latin_name=row["拉丁名"],
            display_name=entry.display_name if entry else "",
        ))
    return AdminMushroomList(items=items, keyword=keyword.strip(), collection=collection,
                            total_count=len(filtered), page=page, total_pages=total_pages)


def matches_admin_search(row: dict[str, str], word: str,
                         entries: dict[tuple[str, str], CollectionEntry]) -> bool:
    if not word:
        return True
    entry = entries.get((row["编号"], row["拉丁名"]))
    values = [row["编号"], row["名称"], row["拉丁名"]]
    if entry is not None:
        values.extend([entry.display_name, *entry.aliases])
    return any(word in value.casefold() for value in values)


def get_admin_mushroom(mushroom_id: str) -> AdminMushroomItem | None:
    with maintenance_lock():
        row = find_admin_row(mushroom_id)
        if row is None:
            return None
        return build_admin_item(row, read_yunnan_collection())


def find_admin_row(mushroom_id: str) -> dict[str, str] | None:
    return next((row for row in read_admin_rows() if row["编号"] == mushroom_id), None)


def build_admin_item(row: dict[str, str], collection: MushroomCollection) -> AdminMushroomItem:
    from mushroom_app.admin.image_services import get_admin_image_state

    detail = get_mushroom_detail(row["编号"])
    image_state = get_admin_image_state(row["编号"], row["拉丁名"])
    selection = None
    for order, entry in enumerate(collection.entries, 1):
        if entry.id == row["编号"] and entry.scientific_name == row["拉丁名"]:
            selection = AdminSelectionForm(display_name=entry.display_name, aliases=entry.aliases,
                                           summary=entry.summary, order=order)
            break
    return AdminMushroomItem(
        id=row["编号"], name=row["名称"],
        fields=[AdminField(key=key, label=key, value=value,
                           multiline=is_multiline_field(value), readonly=key in IDENTITY_FIELDS)
                for key, value in row.items() if key != "编号"],
        main_image_url=detail.image_url if detail else image_state["main_image_url"],
        extra_images=[AdminExtraImage(**image) for image in image_state["extra_images"]],
        revision=get_admin_revision(), selection=selection,
        has_admin_main=image_state["has_admin_main"], image_revision=image_state["image_revision"],
    )


def update_admin_mushroom(mushroom_id: str, form: AdminMushroomForm) -> None:
    """身份字段不变；仅提交字段进入修订，所有写入先核对页面版本。"""
    with maintenance_lock():
        check_admin_revision(form.revision)
        rows = read_admin_rows()
        row = next((row for row in rows if row["编号"] == mushroom_id), None)
        if row is None:
            raise ValueError("菌子不存在")
        changes = apply_submitted_fields(row, form.fields)
        collection = read_yunnan_collection()
        collection_changed = apply_selection_fields(collection, row, form.selection)
        if not changes and not collection_changed:
            return
        csv_raw = serialize_admin_rows(rows, list(row)) if changes else read_admin_csv_bytes()
        collection_raw = json_bytes(collection.model_dump(mode="json")) if collection_changed else None
        try:
            commit_admin_changes(csv_raw, collection_raw, changes)
        except OSError as exc:
            raise ValueError("保存失败，未完成的写入已回滚，请检查磁盘空间和文件权限后重试。") from exc


def apply_submitted_fields(row: dict[str, str], fields: dict[str, str]) -> list[dict]:
    unknown = set(fields) - set(row)
    if unknown:
        raise ValueError("提交了资料表中不存在的字段：" + "、".join(sorted(unknown)))
    for key in IDENTITY_FIELDS:
        if key in fields and fields[key].strip() != row[key]:
            raise ValueError("编号、档案名称和拉丁名是关联身份，不能在普通编辑中更改；请修改云南精选常用名。")
    changes = []
    for key, submitted in fields.items():
        value = submitted.strip()
        if key not in IDENTITY_FIELDS and row[key] != value:
            changes.append({"id": row["编号"], "scientific_name": row["拉丁名"],
                            "field": key, "before": row[key], "after": value})
            row[key] = value
    return changes


def apply_selection_fields(collection: MushroomCollection, row: dict[str, str],
                           selection: AdminSelectionForm | None) -> bool:
    if selection is None:
        return False
    entry = next((entry for entry in collection.entries
                  if entry.id == row["编号"] and entry.scientific_name == row["拉丁名"]), None)
    if entry is None:
        raise ValueError("该档案不在云南精选清单中，不能保存精选展示字段。")
    if selection.order > len(collection.entries):
        raise ValueError(f"精选顺序应在 1 至 {len(collection.entries)} 之间。")
    old = collection.model_dump(mode="json")
    entry.display_name = selection.display_name
    entry.aliases = list(dict.fromkeys(alias.strip() for alias in selection.aliases if alias.strip()))
    if any(len(alias) > 100 for alias in entry.aliases):
        raise ValueError("每个别名最多 100 个字符。")
    entry.summary = selection.summary
    collection.entries.remove(entry)
    collection.entries.insert(selection.order - 1, entry)
    changed = old != collection.model_dump(mode="json")
    if changed:
        collection.updated_at = date.today().isoformat()
    return changed


def image_identity(mushroom_id: str) -> str:
    row = find_admin_row(mushroom_id)
    if row is None:
        raise ValueError("菌子不存在")
    return row["拉丁名"]


def upload_admin_main_image(mushroom_id: str, upload: UploadFile,
                            expected_revision: str | None = None) -> None:
    from mushroom_app.admin.image_services import upload_admin_main_image as upload_image

    upload_image(mushroom_id, image_identity(mushroom_id), upload, expected_revision)


def upload_admin_extra_image(mushroom_id: str, upload: UploadFile,
                             expected_revision: str | None = None) -> None:
    from mushroom_app.admin.image_services import upload_admin_extra_image as upload_image

    upload_image(mushroom_id, image_identity(mushroom_id), upload, expected_revision)


def delete_admin_extra_image(mushroom_id: str, index: int,
                             expected_revision: str | None = None) -> None:
    from mushroom_app.admin.image_services import delete_admin_extra_image as delete_image

    delete_image(mushroom_id, image_identity(mushroom_id), index, expected_revision)


def clear_admin_main_image(mushroom_id: str, expected_revision: str | None = None) -> None:
    from mushroom_app.admin.image_services import clear_admin_main_image as clear_image

    clear_image(mushroom_id, image_identity(mushroom_id), expected_revision)


def is_multiline_field(value: str) -> bool:
    return len(value) > 32 or "\n" in value
