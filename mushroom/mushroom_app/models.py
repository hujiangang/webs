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
    description: str
    image_url: str


class GalleryQuery(BaseModel):
    category: str = "all"
    page: int = Field(default=1, ge=1)


class MushroomPage(BaseModel):
    items: list[MushroomItem]
    page: int
    total_pages: int
    total_count: int
    category: str
