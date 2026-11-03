"""精选清单的数据结构与来源链接校验，不改变主表物种身份。"""

from pydantic import BaseModel, ConfigDict, Field, HttpUrl, model_validator


class CollectionSource(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    title: str = Field(min_length=1)
    url: HttpUrl


class CollectionEntry(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    id: str = Field(pattern=r"^\d+$")
    scientific_name: str = Field(min_length=1)
    group: str = Field(min_length=1)
    reason: str = Field(min_length=1)
    sources: list[CollectionSource] = Field(min_length=1)


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
