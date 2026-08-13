from pydantic import BaseModel


class AdminField(BaseModel):
    key: str
    label: str
    value: str
    multiline: bool = False


class AdminExtraImage(BaseModel):
    index: int
    url: str


class AdminMushroomItem(BaseModel):
    id: str
    name: str
    fields: list[AdminField]
    main_image_url: str = ""
    extra_images: list[AdminExtraImage] = []


class AdminMushroomList(BaseModel):
    items: list[AdminMushroomItem]
    keyword: str = ""


class AdminMushroomForm(BaseModel):
    fields: dict[str, str]
