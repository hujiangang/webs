import math
import random
from pathlib import Path
from urllib.parse import quote, unquote

from mushroom_app.admin.image_repository import find_admin_image_credits, get_admin_image_index
from mushroom_app.collections.image_repository import find_collection_image_credits
from mushroom_app.collections.models import CollectionEntry, MushroomCollection
from mushroom_app.collections.repositories import read_yunnan_collection
from mushroom_app.config import PAGE_SIZE
from mushroom_app.image_repository import find_mushroom_image_credits, get_mushroom_image_keys
from mushroom_app.detail_sections import build_detail_sections
from mushroom_app.models import BannerItem, GalleryQuery, GameItem, ImageCredit, MushroomItem, MushroomPage
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


def get_mushroom_total() -> int:
    # 全站页脚展示的菌子总数
    return len(read_mushroom_rows())


def build_banner_item(row: dict[str, str]) -> BannerItem:
    name = row.get("资源相对路径", "").strip()
    suffix = Path(name).suffix.lower()
    media_type = "video" if suffix in {".mp4", ".webm", ".ogg"} else "image"
    return BannerItem(name=name, url=f"/banner/{name}", media_type=media_type)


def get_mushroom_page(query: GalleryQuery) -> MushroomPage:
    # 先用无图片的筛选摘要匹配，仅为当前页构造完整展示条目。
    collection = read_yunnan_collection() if query.collection == "yunnan" else None
    photo_keys = get_mushroom_image_keys() if query.with_photo or collection is not None else set()
    admin_photos = get_admin_image_index()
    admin_photo_keys = set(admin_photos)
    rows = read_mushroom_rows()
    entries = {}
    collection_credits = {}
    collection_photo_keys = set(admin_photo_keys)
    collection_total = collection_photos = 0
    if collection is not None:
        entries = {(entry.id, entry.scientific_name): entry for entry in collection.entries}
        rows = select_collection_rows(rows, collection)
        collection_credits = {get_mushroom_row_key(row): find_collection_image_credits(entries[get_mushroom_row_key(row)])
                              for row in rows}
        collection_photo_keys.update(key for key, credits in collection_credits.items() if credits)
        collection_total = len(rows)
        collection_photos = sum(match_source_photo(row, photo_keys, collection_photo_keys) for row in rows)
        # 稳定排序在分页前执行；同为有图或无图时保留审核清单顺序。
        rows = sorted(rows, key=lambda row: not match_source_photo(row, photo_keys, collection_photo_keys))
    filtered = [
        row for row in rows
        if match_mushroom_row(row, query, entries.get(get_mushroom_row_key(row)))
        and (not query.with_photo or match_source_photo(row, photo_keys, collection_photo_keys))
    ]
    total_pages = max(1, math.ceil(len(filtered) / PAGE_SIZE))
    page = min(query.page, total_pages)
    start = (page - 1) * PAGE_SIZE
    items = [build_mushroom_item(row, admin_photos.get(get_mushroom_row_key(row), []))
             for row in filtered[start : start + PAGE_SIZE]]
    for item in items:
        key = (item.id, item.latin_name)
        add_selection_details(item, entries.get(key), collection_credits.get(key))
    return MushroomPage(
        items=items,
        page=page,
        total_pages=total_pages,
        total_count=len(filtered),
        category=query.category,
        keyword=query.keyword.strip(),
        with_photo=query.with_photo,
        collection=query.collection,
        collection_title=collection.title if collection is not None else "",
        collection_description=collection.description if collection is not None else "",
        collection_total_count=collection_total,
        collection_photo_count=collection_photos,
    )


def select_collection_rows(rows: list[dict[str, str]], collection: MushroomCollection) -> list[dict[str, str]]:
    """精确关联编号与学名，按精选清单顺序返回原行，不修改输入。"""
    row_index = {get_mushroom_row_key(row): row for row in rows}
    return [row_index[key] for entry in collection.entries if (key := (entry.id, entry.scientific_name)) in row_index]


def get_mushroom_row_key(row: dict[str, str]) -> tuple[str, str]:
    """精选关联与图片筛选共用同一编号、学名键。"""
    return row.get(next(iter(row), "编号"), "").strip(), row.get("拉丁名", "").strip()


def add_selection_details(item: MushroomItem, entry: CollectionEntry | None,
                          photos: list[ImageCredit] | None = None) -> None:
    """精选说明单独附加，保留原档案字段和风险分类。"""
    if entry is not None:
        item.selection_group = entry.group
        item.selection_note = entry.reason
        item.selection_sources = list(entry.sources)
        item.selection_name = entry.display_name
        item.selection_aliases = list(entry.aliases)
        item.selection_scope = entry.classification_scope
        item.selection_summary = entry.summary
        add_selection_photos(item, find_collection_image_credits(entry) if photos is None else photos)


def add_selection_photos(item: MushroomItem, photos: list[ImageCredit]) -> None:
    """后台指定主图优先，保留用户确认图、原来源照片和精选参考照片。"""
    if not photos:
        return
    ordered = [photo for photo in item.image_credits.values() if photo.is_primary]
    ordered.extend(photo for photo in photos if photo.source_type == "user_confirmed")
    ordered.extend(photo for photo in item.image_credits.values() if not photo.is_primary)
    ordered.extend(photo for photo in photos if photo.source_type != "user_confirmed")
    credits = {}
    for photo in ordered:
        url = quote(unquote(photo.url), safe="/")
        credits.setdefault(url, photo.model_copy(update={"url": url}))
    item.image_credits = credits
    item.image_url = next(iter(credits))
    # 中文旧文件名与已编码来源URL指向同一照片时，只保留确认后的展示项。
    legacy_urls = [quote(unquote(url), safe="/") for url in item.gallery_images]
    item.gallery_images = list(dict.fromkeys([*credits, *legacy_urls]))


def get_mushroom_detail(mushroom_id: str) -> MushroomItem | None:
    for row in read_mushroom_rows():
        id_key = next(iter(row), "编号")
        if row.get(id_key, "").strip() == mushroom_id:
            item = build_mushroom_item(row)
            item.detail_sections = build_detail_sections(item.detail_fields)
            entry = next((entry for entry in read_yunnan_collection().entries
                          if entry.id == item.id and entry.scientific_name == item.latin_name), None)
            add_selection_details(item, entry)
            return item
    return None


def match_source_photo(row: dict[str, str], photo_keys: set[tuple[str, str]],
                       collection_photo_keys: set[tuple[str, str]] | None = None) -> bool:
    """仅匹配当前编号及学名，俗名和历史定名沿用既有配图限制。"""
    key = get_mushroom_row_key(row)
    # 显式精选照片带独立确认范围，不按旧学名自动套入物种照片。
    if collection_photo_keys and key in collection_photo_keys:
        return True
    if any(word in row.get("记录类型", "") for word in ("俗名", "别名", "历史")):
        return False
    return key in photo_keys


def get_home_picks(count: int = 4) -> list[MushroomItem]:
    # 首页雨季推荐：随机抽取若干菌子展示
    rows = read_mushroom_rows()
    admin_photos = get_admin_image_index()
    if len(rows) <= count:
        return [build_mushroom_item(row, admin_photos.get(get_mushroom_row_key(row), [])) for row in rows]
    names = ['奶浆菌', '羊肚菌', '鸡油菌', '毒蝇鹅膏菌']
    preferred = [row for name in names for row in rows if get_mushroom_row_name(row) == name]
    selected = (preferred + [row for row in rows if get_mushroom_row_name(row) not in names])[:count]
    return [build_mushroom_item(row, admin_photos.get(get_mushroom_row_key(row), [])) for row in selected]


def get_mushroom_row_name(row: dict[str, str]) -> str:
    headers = list(row)
    name_key = headers[1] if len(headers) > 1 else "名称"
    return row.get(name_key, "").strip()


def match_mushroom_row(row: dict[str, str], query: GalleryQuery,
                       entry: CollectionEntry | None = None) -> bool:
    # 筛选摘要不读取图库，也不创建详情字段；复用展示条目的分类和关键词规则。
    toxicity = get_row_value(row, ("是否有毒性", "毒性", "毒性说明"))
    edible = get_row_value(row, ("是否可食用", "可食用性", "食用性"))
    risk_class, risk_label = classify_risk(toxicity, edible)
    summary = MushroomItem(
        id="", name=get_mushroom_row_name(row), toxicity=toxicity, edible=edible,
        image_url="", latin_name=row.get("拉丁名", ""),
        risk_class=risk_class, risk_label=risk_label,
        selection_name=entry.display_name if entry is not None else "",
        selection_aliases=entry.aliases if entry is not None else [],
    )
    return match_category(summary, query.category) and match_keyword(summary, query.keyword)


def get_game_items() -> list[GameItem]:
    # 毒菌挑战赛题库：全部菌子的可食用判断数据
    admin_photos = get_admin_image_index()
    return [
        GameItem(
            id=mushroom.id,
            name=mushroom.name,
            is_edible=is_edible_mushroom(mushroom),
            image_url=mushroom.image_url,
        )
        for mushroom in (build_mushroom_item(row, admin_photos.get(get_mushroom_row_key(row), []))
                         for row in read_mushroom_rows())
    ]


def is_edible_mushroom(mushroom: MushroomItem) -> bool:
    # 文献记载与实物安全鉴定分开；已登记风险的条目不进入食用分类。
    return (
        mushroom.risk_class != 'danger'
        and "不可食用" not in mushroom.edible
        and ("可食用" in mushroom.edible or mushroom.edible.startswith("有食用记载"))
    )


def build_mushroom_item(row: dict[str, str], admin_photos: list[ImageCredit] | None = None) -> MushroomItem:
    headers = list(row)
    id_key = headers[0] if headers else "编号"
    name_key = headers[1] if len(headers) > 1 else "名称"
    name = row.get(name_key, "").strip()
    mushroom_id = row.get(id_key, "").strip()
    latin_name = row.get('拉丁名', '').strip()
    image_name = find_mushroom_image_name(name)
    # 历史定名及俗名条目不能凭旧学名自动配入新的种级图片。
    record_type = row.get("记录类型", "")
    image_credits = [] if any(word in record_type for word in ("俗名", "别名", "历史")) else find_mushroom_image_credits(mushroom_id, latin_name)
    admin_credits = find_admin_image_credits(mushroom_id, latin_name) if admin_photos is None else admin_photos
    image_credits = ([credit for credit in admin_credits if credit.is_primary]
                     + image_credits + [credit for credit in admin_credits if not credit.is_primary])
    gallery_images = [credit.url for credit in image_credits]
    gallery_images.extend(f"/{item}" for item in find_mushroom_gallery_names(name) if f"/{item}" not in gallery_images)
    toxicity = get_row_value(row, ("是否有毒性", "毒性", "毒性说明"))
    edible = get_row_value(row, ("是否可食用", "可食用性", "食用性"))
    risk_class, risk_label = classify_risk(toxicity, edible)
    return MushroomItem(
        id=mushroom_id,
        name=name,
        toxicity=get_row_value(row, ("是否有毒性", "毒性", "毒性说明")),
        edible=get_row_value(row, ("是否可食用", "可食用性", "食用性")),
        image_url=image_credits[0].url if image_credits else (f"/image/{image_name}" if image_name else '/static/images/image-fallback.svg'),
        latin_name=latin_name,
        risk_label=risk_label,
        risk_class=risk_class,
        # 拼接为 /image、/image_ex 静态路由的访问 URL，第一张为主图
        gallery_images=gallery_images,
        image_credits={credit.url: credit for credit in image_credits},
        detail_fields=[
            {"label": key, "value": row.get(key, "").strip()}
            for key in headers
            if key not in {id_key, name_key}
        ],
    )


def match_category(item: MushroomItem, category: str) -> bool:
    # 分类按钮对应草图中的三类展示入口。
    if category == "edible":
        return is_edible_mushroom(item) and item.risk_class == 'record'
    if category == "inedible":
        return "不可食用" in item.edible
    if category == "toxic":
        return item.risk_class == 'danger'
    return True


def match_keyword(item: MushroomItem, keyword: str) -> bool:
    word = keyword.strip()
    if not word:
        return True
    return any(word.casefold() in value.casefold()
               for value in (item.name, item.latin_name, item.selection_name, *item.selection_aliases))


def classify_risk(toxicity: str, edible: str) -> tuple[str, str]:
    if any(word in toxicity for word in ('有毒', '剧毒', '有小毒', '中毒', '致命', '潜在毒性')):
        return 'danger', '有毒 / 风险'
    if edible.startswith('有食用记载') or (toxicity == '无毒' and '可食用' in edible and '不可食用' not in edible):
        return 'record', '食用记载'
    return 'unknown', '资料待核实'


def get_row_value(row: dict[str, str], aliases: tuple[str, ...]) -> str:
    for key in aliases:
        if key in row:
            return row.get(key, "").strip()
    return ""
