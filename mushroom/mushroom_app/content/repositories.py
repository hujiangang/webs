import hashlib
import json
import os
import tempfile
from pathlib import Path

from mushroom_app.config import DATA_DIR, BASE_DIR


CONTENT_PATH = DATA_DIR / 'site.json'
DEFAULT_PATH = BASE_DIR / 'mushroom_app' / 'content' / 'defaults.json'


def read_content() -> tuple[dict, str]:
    path = CONTENT_PATH if CONTENT_PATH.exists() else DEFAULT_PATH
    raw = path.read_bytes()
    return json.loads(raw.decode('utf-8-sig')), hashlib.sha256(raw).hexdigest()


def write_content(content: dict) -> None:
    atomic_write(CONTENT_PATH, json.dumps(content, ensure_ascii=False, indent=2).encode('utf-8'))


def atomic_write(path: Path, data: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    descriptor, filename = tempfile.mkstemp(dir=path.parent, suffix='.tmp')
    try:
        with os.fdopen(descriptor, 'wb') as handle:
            handle.write(data)
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(filename, path)
    finally:
        if os.path.exists(filename):
            os.unlink(filename)


def write_media(filename: str, data: bytes) -> None:
    atomic_write(DATA_DIR / 'uploads' / filename, data)


def store_game(slug: str, entries: list[tuple[str, bytes]]) -> None:
    for filename, data in entries:
        atomic_write(BASE_DIR / 'games' / slug / filename, data)


def game_exists(slug: str) -> bool:
    return (BASE_DIR / 'games' / slug).exists()

