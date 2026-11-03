"""精选清单的数据结构与来源链接校验，不改变主表物种身份。"""

from pathlib import PurePosixPath
from typing import Literal
from urllib.parse import urlsplit

from pydantic import BaseModel, ConfigDict, Field, HttpUrl, field_validator, model_validator


class CollectionSource(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    title: str = Field(min_length=1)
    url: HttpUrl


class CollectionPhoto(BaseModel):
    """精选照片单独记录确认范围，不从用户确认推断作者或开放许可。"""
    model_config = ConfigDict(str_strip_whitespace=True)

    path: str
    source_type: Literal["user_confirmed", "open_license", "source_reference", "admin_uploaded"]
    author: str = ""
    license: str = ""
    license_url: HttpUrl | Literal[""] = ""
    source_url: HttpUrl | Literal[""] = ""
    source_title: str = ""
    location_label: str = ""
    china_record: bool = False
    identification_status: str = ""
    changes: str = ""
    usage_note: str = ""
    reference_only: bool = False
    classification_scope: str = ""

    @field_validator("path")
    @classmethod
    def validate_image_path(cls, value: str) -> str:
        path = PurePosixPath(value)
        if (any(token in value for token in ("\\", ":", "\x00", "?", "#"))
                or path.is_absolute() or ".." in path.parts or "." in value.split("/")
                or path.parts[:1] != ("image",) or len(path.parts) < 2
                or path.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}):
            raise ValueError("精选照片必须使用image目录内的安全相对图片路径")
        return path.as_posix()

    @field_validator("source_url", "license_url", mode="before")
    @classmethod
    def validate_web_url(cls, value):
        if value:
            parsed = urlsplit(str(value))
            if parsed.scheme not in {"http", "https"} or not parsed.netloc:
                raise ValueError("照片来源和许可链接必须是完整http或https网址")
        return value

    @model_validator(mode="after")
    def validate_source_requirements(self):
        if self.source_type == "open_license" and not all((
                self.source_url, self.author, self.license_url, self.license)):
            raise ValueError("开放许可照片必须注明来源、作者、许可和许可链接")
        if self.source_type == "source_reference" and not all((
                self.source_url, self.source_title, self.identification_status)):
            raise ValueError("来源参考照片必须注明来源链接、标题和对应关系核查说明")
        return self


class CollectionEntry(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    id: str = Field(pattern=r"^\d+$")
    scientific_name: str = Field(min_length=1)
    group: str = Field(min_length=1)
    reason: str = Field(min_length=1)
    sources: list[CollectionSource] = Field(min_length=1)
    display_name: str = ""
    aliases: list[str] = Field(default_factory=list)
    classification_scope: str = ""
    summary: str = ""
    photos: list[CollectionPhoto] = Field(default_factory=list)


class MushroomCollection(BaseModel):
    title: str = "云南常见菌"
    description: str = ""
    updated_at: str = ""
    entries: list[CollectionEntry] = Field(default_factory=list)

    @model_validator(mode="after")
    def validate_unique_entries(self):
        """同一编号或学名不能重复占据精选列表位置。"""
        if len({entry.id for entry in self.entries}) != len(self.entries):
            raise ValueError("精选清单存在重复编号")
        if len({entry.scientific_name.casefold() for entry in self.entries}) != len(self.entries):
            raise ValueError("精选清单存在重复学名")
        return self
