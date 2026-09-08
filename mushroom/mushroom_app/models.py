from pydantic import BaseModel, Field


class BannerItem(BaseModel):
    name: str
    url: str
    media_type: str


class MushroomItem(BaseModel):
    id: str
    name: str
    toxicity: str
    edible: str
    image_url: str
    latin_name: str = ""
    risk_label: str = "资料待核实"
    risk_class: str = "unknown"
    # 详情页图片列表（主图 + 素材图）
    gallery_images: list[str] = []
    # 详情页按数据表表头动态展示，避免列名变化后页面缺字段。
    detail_fields: list[dict[str, str]] = []


class GalleryQuery(BaseModel):
    category: str = "all"
    page: int = Field(default=1, ge=1)
    keyword: str = ""


class MushroomPage(BaseModel):
    items: list[MushroomItem]
    page: int
    total_pages: int
    total_count: int
    category: str
    keyword: str


class GameItem(BaseModel):
    # 毒菌挑战赛的题目数据：仅暴露判断所需字段
    id: str
    name: str
    is_edible: bool
    image_url: str
