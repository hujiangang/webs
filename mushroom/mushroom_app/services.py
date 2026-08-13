import math
from pathlib import Path

from mushroom_app.config import PAGE_SIZE
from mushroom_app.models import BannerItem, GalleryQuery, MushroomItem, MushroomPage
from mushroom_app.repositories import (
    find_mushroom_gallery_names,
    find_mushroom_image_name,
    find_site_icon_path,
    read_banner_rows,
    read_mushroom_headers,
    read_mushroom_rows,
)


def get_banner_items() -> list[BannerItem]:
    return [build_banner_item(row) for row in read_banner_rows()]


def get_site_icon_path() -> Path | None:
    return find_site_icon_path()


def get_site_icon_url() -> str | None:
    if get_site_icon_path() is None:
        return None
    return "/site-icon"


def build_banner_item(row: dict[str, str]) -> BannerItem:
    name = row.get("资源相对路径", "").strip()
    suffix = Path(name).suffix.lower()
    media_type = "video" if suffix in {".mp4", ".webm", ".ogg"} else "image"
    return BannerItem(name=name, url=f"/banner/{name}", media_type=media_type)


def get_mushroom_page(query: GalleryQuery) -> MushroomPage:
    mushrooms = [build_mushroom_item(row) for row in read_mushroom_rows()]
    filtered = [item for item in mushrooms if match_category(item, query.category)]
    filtered = [item for item in filtered if match_keyword(item, query.keyword)]
    total_pages = max(1, math.ceil(len(filtered) / PAGE_SIZE))
    page = min(query.page, total_pages)
    start = (page - 1) * PAGE_SIZE
    return MushroomPage(
        items=filtered[start : start + PAGE_SIZE],
        page=page,
        total_pages=total_pages,
        total_count=len(filtered),
        category=query.category,
        keyword=query.keyword.strip(),
    )


def get_mushroom_detail(mushroom_id: str) -> MushroomItem | None:
    for row in read_mushroom_rows():
        mushroom = build_mushroom_item(row)
        if mushroom.id == mushroom_id:
            return mushroom
    return None


def build_mushroom_item(row: dict[str, str]) -> MushroomItem:
    headers = read_mushroom_headers()
    id_key = headers[0] if headers else "编号"
    name_key = headers[1] if len(headers) > 1 else "名称"
    name = row.get(name_key, "").strip()
    image_name = find_mushroom_image_name(name) or f"{name}.png"
    return MushroomItem(
        id=row.get(id_key, "").strip(),
        name=name,
        toxicity=get_row_value(row, ("是否有毒性", "毒性", "毒性说明")),
        edible=get_row_value(row, ("是否可食用", "可食用性", "食用性")),
        image_url=f"/image/{image_name}",
        # 拼接为 /image、/image_ex 静态路由的访问 URL，第一张为主图
        gallery_images=[f"/{item}" for item in find_mushroom_gallery_names(name)],
        detail_fields=[
            {"label": key, "value": row.get(key, "").strip()}
            for key in headers
            if key not in {id_key, name_key}
        ],
    )


def match_category(item: MushroomItem, category: str) -> bool:
    # 分类按钮对应草图中的三类展示入口。
    if category == "edible":
        return "可食用" in item.edible and "不可食用" not in item.edible
    if category == "inedible":
        return "不可食用" in item.edible
    if category == "toxic":
        return bool(item.toxicity and "无毒" not in item.toxicity)
    return True


def match_keyword(item: MushroomItem, keyword: str) -> bool:
    word = keyword.strip()
    if not word:
        return True
    return word in item.name


def get_row_value(row: dict[str, str], aliases: tuple[str, ...]) -> str:
    for key in aliases:
        if key in row:
            return row.get(key, "").strip()
    return ""
