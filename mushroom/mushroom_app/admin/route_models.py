"""管理页面的筛选、分页与表单上下文校验。"""

from typing import Literal

from pydantic import BaseModel, Field


class AdminBrowseQuery(BaseModel):
    keyword: str = Field(default="", max_length=200)
    collection: Literal["yunnan", "all"] = "yunnan"
    page: int = Field(default=1, ge=1)
