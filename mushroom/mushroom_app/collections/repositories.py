"""读取精选清单，每次读取均反映磁盘上的最新版本。"""

from mushroom_app.collections.models import MushroomCollection
from mushroom_app.config import DATA_DIR


def read_yunnan_collection() -> MushroomCollection:
    """缺少清单时返回空精选；已有文件必须通过结构与重复校验。"""
    path = DATA_DIR / "yunnan-common.json"
    if not path.is_file():
        return MushroomCollection()
    return MushroomCollection.model_validate_json(path.read_text(encoding="utf-8-sig"))
