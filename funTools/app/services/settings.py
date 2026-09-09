import json
import os
import sqlite3
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[2]
DATA_DIR = Path(os.environ.get("FUNTOOLS_DATA_DIR", PROJECT_ROOT / "data"))
UPLOAD_DIR = DATA_DIR / "uploads"
DEFAULT_SETTINGS = {
    "disabled_features": [],
    "donation": {"enabled": False, "title": "请我喝杯咖啡", "image": ""},
    "ads": {"enabled": False, "image": "", "link": "", "label": "发现更多好东西"},
    "revision": 0,
}


def connect():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DATA_DIR / "site.db", timeout=10)
    connection.execute("CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY, value TEXT NOT NULL)")
    return connection


def get_settings() -> dict:
    connection = connect()
    try:
        row = connection.execute("SELECT value FROM settings WHERE id = 1").fetchone()
        return json.loads(row[0]) if row else json.loads(json.dumps(DEFAULT_SETTINGS))
    finally:
        connection.close()


def save_settings(value: dict) -> dict:
    # 事务和版本号防止多个后台页面相互覆盖配置。
    connection = connect()
    try:
        with connection:
            connection.execute("BEGIN IMMEDIATE")
            row = connection.execute("SELECT value FROM settings WHERE id = 1").fetchone()
            current = json.loads(row[0]) if row else DEFAULT_SETTINGS
            if value["revision"] != current["revision"]:
                raise ValueError("配置已被其他页面修改，请刷新后重新保存")
            value["revision"] += 1
            connection.execute(
                "INSERT OR REPLACE INTO settings (id, value) VALUES (1, ?)",
                (json.dumps(value, ensure_ascii=False),),
            )
        return value
    finally:
        connection.close()
