from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class AdminField(BaseModel):
    key: str
    label: str
    value: str
    multiline: bool = False
    readonly: bool = False


class AdminExtraImage(BaseModel):
    index: int
    url: str


class AdminMushroomItem(BaseModel):
    id: str
    name: str
    fields: list[AdminField]
    main_image_url: str = ""
    extra_images: list[AdminExtraImage] = []
    revision: str = ""
    selection: "AdminSelectionForm | None" = None
    has_admin_main: bool = False
    image_revision: str = ""


class AdminMushroomSummary(BaseModel):
    id: str
    name: str
    latin_name: str = ""
    display_name: str = ""


class AdminMushroomList(BaseModel):
    items: list[AdminMushroomSummary]
    keyword: str = ""
    collection: Literal["yunnan", "all"] = "yunnan"
    total_count: int = 0
    page: int = 1
    total_pages: int = 1


class AdminSelectionForm(BaseModel):
    """地方展示信息与主表物种身份分开维护。"""
    model_config = ConfigDict(str_strip_whitespace=True)

    display_name: str = Field(default="", max_length=100)
    aliases: list[str] = Field(default_factory=list, max_length=30)
    summary: str = Field(default="", max_length=5000)
    order: int = Field(ge=1)


class AdminMushroomForm(BaseModel):
    fields: dict[str, str]
    revision: str
    selection: AdminSelectionForm | None = None
