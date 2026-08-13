from starlette.datastructures import UploadFile

from mushroom_app.admin.models import (
    AdminExtraImage,
    AdminField,
    AdminMushroomForm,
    AdminMushroomItem,
    AdminMushroomList,
)
from mushroom_app.admin.repositories import (
    delete_extra_image,
    find_extra_image_paths,
    find_main_image_path,
    read_admin_headers,
    read_admin_rows,
    rename_mushroom_images,
    save_extra_image,
    save_main_image,
    write_admin_rows,
)


def get_admin_mushroom_list(keyword: str = "") -> AdminMushroomList:
    word = keyword.strip()
    items = [build_admin_item(row) for row in read_admin_rows()]
    if word:
        items = [
            item
            for item in items
            if word in item.name or any(word.lower() in field.value.lower() for field in item.fields)
        ]
    return AdminMushroomList(items=items, keyword=word)


def get_admin_mushroom(mushroom_id: str) -> AdminMushroomItem | None:
    id_key = get_id_key()
    for row in read_admin_rows():
        if row.get(id_key, "").strip() == mushroom_id:
            return build_admin_item(row)
    return None


def update_admin_mushroom(mushroom_id: str, form: AdminMushroomForm) -> None:
    rows = read_admin_rows()
    id_key = get_id_key()
    name_key = get_name_key()
    for row in rows:
        if row.get(id_key, "").strip() != mushroom_id:
            continue

        old_name = row.get(name_key, "").strip()
        new_name = form.fields.get(name_key, "").strip()
        if not new_name:
            raise ValueError("菌子名称不能为空")

        rename_mushroom_images(old_name, new_name)
        for key in get_headers():
            if key == id_key:
                continue
            row[key] = form.fields.get(key, "").strip()
        write_admin_rows(rows)
        return

    raise ValueError("菌子不存在")


def upload_admin_main_image(mushroom_id: str, upload: UploadFile) -> None:
    mushroom = get_admin_mushroom(mushroom_id)
    if mushroom is None:
        raise ValueError("菌子不存在")
    if not upload.filename:
        raise ValueError("请选择主图文件")
    save_main_image(mushroom.name, upload)


def upload_admin_extra_image(mushroom_id: str, upload: UploadFile) -> None:
    mushroom = get_admin_mushroom(mushroom_id)
    if mushroom is None:
        raise ValueError("菌子不存在")
    if not upload.filename:
        raise ValueError("请选择扩展图片")
    save_extra_image(mushroom.name, upload)


def delete_admin_extra_image(mushroom_id: str, index: int) -> None:
    mushroom = get_admin_mushroom(mushroom_id)
    if mushroom is None:
        raise ValueError("菌子不存在")
    delete_extra_image(mushroom.name, index)


def build_admin_item(row: dict[str, str]) -> AdminMushroomItem:
    id_key = get_id_key()
    name_key = get_name_key()
    name = row.get(name_key, "").strip()
    main_image = find_main_image_path(name)
    extra_paths = find_extra_image_paths(name)
    return AdminMushroomItem(
        id=row.get(id_key, "").strip(),
        name=name,
        fields=[
            AdminField(
                key=key,
                label=key,
                value=row.get(key, "").strip(),
                multiline=is_multiline_field(row.get(key, "")),
            )
            for key in get_headers()
            if key != id_key
        ],
        main_image_url=f"/image/{main_image.name}" if main_image is not None else "",
        extra_images=[
            AdminExtraImage(
                index=int(path.stem.rsplit("_", 1)[-1]),
                url=f"/image_ex/{path.name}",
            )
            for path in extra_paths
        ],
    )


def get_headers() -> list[str]:
    return read_admin_headers()


def get_id_key() -> str:
    headers = get_headers()
    if not headers:
        raise ValueError("数据表缺少表头")
    return headers[0]


def get_name_key() -> str:
    headers = get_headers()
    if len(headers) < 2:
        raise ValueError("数据表缺少名称列")
    return headers[1]


def is_multiline_field(value: str) -> bool:
    return len(value) > 32 or "\n" in value
