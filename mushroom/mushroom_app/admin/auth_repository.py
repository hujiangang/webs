import json

from mushroom_app.config import DATA_DIR
from mushroom_app.content.repositories import atomic_write


AUTH_FILE = DATA_DIR / '.admin-auth.json'


def read_credentials() -> dict | None:
    if not AUTH_FILE.exists():
        return None
    return json.loads(AUTH_FILE.read_text(encoding='utf-8'))


def write_credentials(credentials: dict) -> None:
    atomic_write(AUTH_FILE, json.dumps(credentials).encode('utf-8'))
