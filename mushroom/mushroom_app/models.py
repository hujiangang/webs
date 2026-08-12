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
    # 详情页图片列表（主图 + 素材图）
    gallery_images: list[str] = []
    # 详情页导航区块对应的四个内容字段
    habitat: str = ""
    features: str = ""
    food_value: str = ""
    price: str = ""


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
