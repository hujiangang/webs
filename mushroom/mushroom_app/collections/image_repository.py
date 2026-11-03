"""读取精选条目的显式照片，仅返回图片目录内当前可用的本地文件。"""

from urllib.parse import quote

from mushroom_app.collections.models import CollectionEntry
from mushroom_app.config import DATA_DIR
from mushroom_app.models import ImageCredit


def find_collection_image_credits(entry: CollectionEntry) -> list[ImageCredit]:
    """按条目声明顺序返回照片，文件缺失、空文件或链接越界均不计为有图。"""
    credits = []
    seen = set()
    image_root = (DATA_DIR / "image").resolve()
    for photo in entry.photos:
        try:
            path = (DATA_DIR / photo.path).resolve()
            if not path.is_relative_to(image_root) or not path.is_file():
                continue
            with path.open("rb") as file:
                if not file.read(1):
                    continue
        except (OSError, ValueError):
            continue
        url = "/" + quote(photo.path, safe="/")
        if url in seen:
            continue
        values = photo.model_dump(mode="json", exclude={"path"})
        values["classification_scope"] = photo.classification_scope or entry.classification_scope
        credits.append(ImageCredit(url=url, **values))
        seen.add(url)
    return credits
