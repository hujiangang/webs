from typing import Annotated, Literal
from urllib.parse import unquote, urlsplit

from pydantic import AfterValidator, BaseModel, Field, model_validator


def validate_url(value: str) -> str:
    value = value.strip()
    if not value:
        return value
    decoded = unquote(value)
    if any(character in decoded for character in ('\\', '\r', '\n', '\x00')) or decoded.startswith('//'):
        raise ValueError("链接包含非法字符")
    parsed = urlsplit(value)
    if value.startswith('/') and not value.startswith('//'):
        if '..' in decoded.split('/'):
            raise ValueError("链接不能跳出资源目录")
        return value
    if parsed.scheme in {'http', 'https'} and parsed.hostname and not parsed.username:
        return value
    raise ValueError("请输入以 / 开头的站内路径或完整的 http/https 链接")


ResourceURL = Annotated[str, Field(max_length=1500), AfterValidator(validate_url)]
Slug = Annotated[str, Field(pattern=r'^[a-z0-9][a-z0-9-]{0,59}$')]


class SiteSettings(BaseModel):
    name: str = Field(default="菌野", min_length=1, max_length=20)
    tagline: str = Field(default="中国野生菌探索指南", max_length=60)
    description: str = Field(default="走进森林，认识中国野生菌。探索菌子图鉴、自然小游戏与野生菌安全知识。", max_length=200)
    contact: str = Field(default="", max_length=150)
    icp: str = Field(default="", max_length=80)
    public_url: ResourceURL = "http://127.0.0.1:8000"
    footer_note: str = Field(default="保持好奇，也保持敬畏。图鉴信息仅供科普，不作为采食依据。", max_length=200)


class Slide(BaseModel):
    id: Slug
    title: str = Field(min_length=1, max_length=60)
    subtitle: str = Field(default="", max_length=200)
    eyebrow: str = Field(default="走进菌子的世界", max_length=60)
    media_type: Literal['image', 'video'] = 'image'
    url: ResourceURL
    poster: ResourceURL = ""
    link: ResourceURL = "/mushrooms"
    button: str = Field(default="探索菌子图鉴", max_length=30)
    enabled: bool = True

    @model_validator(mode='after')
    def require_published_media(self):
        if self.enabled and (not self.url or not self.link):
            raise ValueError('启用的轮播必须填写媒体地址和按钮链接')
        return self


class GameCard(BaseModel):
    id: Slug
    title: str = Field(min_length=1, max_length=60)
    description: str = Field(default="", max_length=250)
    cover: ResourceURL = ""
    entry_url: ResourceURL
    engine: Literal['HTML5', 'Cocos', 'Unity', 'Three.js'] = 'HTML5'
    category: str = Field(default="益智", max_length=20)
    mode: Literal['embed', 'new_tab'] = 'embed'
    enabled: bool = True

    @model_validator(mode='after')
    def require_published_entry(self):
        if self.enabled and not self.entry_url:
            raise ValueError('上架的游戏必须填写入口地址')
        return self


class Article(BaseModel):
    id: Slug
    title: str = Field(min_length=1, max_length=80)
    category: str = Field(default="基本常识", max_length=30)
    summary: str = Field(default="", max_length=250)
    body: str = Field(min_length=1, max_length=20000)
    cover: ResourceURL = ""
    source_name: str = Field(default="", max_length=100)
    source_url: ResourceURL = ""
    enabled: bool = True


class Advertisement(BaseModel):
    id: Slug
    title: str = Field(min_length=1, max_length=80)
    description: str = Field(default="", max_length=180)
    image: ResourceURL = ""
    link: ResourceURL
    placement: Literal['home', 'gallery', 'games', 'safety'] = 'home'
    enabled: bool = False

    @model_validator(mode='after')
    def require_ad_link(self):
        if self.enabled and not self.link:
            raise ValueError('启用的广告必须填写跳转链接')
        return self


class SiteContent(BaseModel):
    settings: SiteSettings = Field(default_factory=SiteSettings)
    slides: list[Slide] = Field(default_factory=list, max_length=30)
    games: list[GameCard] = Field(default_factory=list, max_length=100)
    articles: list[Article] = Field(default_factory=list, max_length=200)
    ads: list[Advertisement] = Field(default_factory=list, max_length=30)

    @model_validator(mode='after')
    def check_unique_ids(self):
        for field in ('slides', 'games', 'articles', 'ads'):
            identities = [item.id for item in getattr(self, field)]
            if len(identities) != len(set(identities)):
                raise ValueError(f"{field} 存在重复标识，请修改后保存")
        return self


class ContentSave(BaseModel):
    revision: str
    content: SiteContent


class GameUpload(BaseModel):
    slug: Slug
