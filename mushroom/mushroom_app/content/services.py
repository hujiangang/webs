from threading import Lock

from mushroom_app.content.models import SiteContent, ContentSave
from mushroom_app.content.repositories import read_content, write_content


CONTENT_LOCK = Lock()


def get_content() -> SiteContent:
    content, _revision = read_content()
    return SiteContent.model_validate(content)


def get_editor_content() -> dict:
    content, revision = read_content()
    return {'content': SiteContent.model_validate(content).model_dump(), 'revision': revision}


def save_content(form: ContentSave) -> dict:
    with CONTENT_LOCK:
        _content, revision = read_content()
        if revision != form.revision:
            raise ValueError("其他管理员已更新内容，请刷新页面后重新编辑，避免覆盖他人的修改")
        write_content(form.content.model_dump())
        return get_editor_content()


def get_published_content() -> SiteContent:
    content = get_content()
    for field in ('slides', 'games', 'articles', 'ads'):
        setattr(content, field, [item for item in getattr(content, field) if item.enabled])
    return content
