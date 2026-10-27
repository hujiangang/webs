from pydantic import BaseModel, Field


class BannerItem(BaseModel):
    name: str
    url: str
    media_type: str


class ImageCredit(BaseModel):
    # 图片来源独立于菌物资料，许可与鉴定结论均按单张图片保存。
    url: str
    author: str
    license: str
    license_url: str
    source_url: str
    source_title: str
    location_label: str
    china_record: bool = False
    identification_status: str
    changes: str = ""
    usage_note: str = ""
    reference_only: bool = False


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
    image_credits: dict[str, ImageCredit] = Field(default_factory=dict)
    # 详情页按数据表表头动态展示，避免列名变化后页面缺字段。
    detail_fields: list[dict[str, str]] = []
    detail_sections: list[dict] = Field(default_factory=list)


class GalleryQuery(BaseModel):
    category: str = "all"
    page: int = Field(default=1, ge=1)
    keyword: str = ""
    with_photo: bool = False


class MushroomPage(BaseModel):
    items: list[MushroomItem]
    page: int
    total_pages: int
    total_count: int
    category: str
    keyword: str
    with_photo: bool = False


class GameItem(BaseModel):
    # 毒菌挑战赛的题目数据：仅暴露判断所需字段
    id: str
    name: str
    is_edible: bool
    image_url: str
