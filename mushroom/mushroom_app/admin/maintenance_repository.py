"""后台维护的版本检查、原始备份和多文件一致写入，不负责资料内容判断。"""

import hashlib
import json
import os
from datetime import datetime, timezone
from pathlib import Path
from threading import RLock
from uuid import uuid4

from mushroom_app.config import DATA_DIR


CSV_PATH = DATA_DIR / "mushroom.csv"
COLLECTION_PATH = DATA_DIR / "yunnan-common.json"
REVISIONS_PATH = DATA_DIR / "reviewed-revisions.json"
ADMIN_IMAGES_PATH = DATA_DIR / "admin-images.json"
HISTORY_DIR = DATA_DIR / "admin-history"
_MAINTENANCE_LOCK = RLock()


class AdminRevisionConflict(ValueError):
    """页面读取后资料被更新，必须重新加载再保存。"""


def maintenance_lock():
    """资料与图片维护共用本进程写锁，避免互相覆盖。"""
    return _MAINTENANCE_LOCK


def get_admin_revision() -> str:
    digest = hashlib.sha256()
    for path in (CSV_PATH, COLLECTION_PATH, ADMIN_IMAGES_PATH):
        raw = path.read_bytes() if path.is_file() else b""
        digest.update(path.name.encode("utf-8") + b"\0")
        digest.update(str(len(raw)).encode("ascii") + b"\0" + raw)
    return digest.hexdigest()


def check_admin_revision(expected: str) -> None:
    if not expected or expected != get_admin_revision():
        raise AdminRevisionConflict("资料或图片已被更新，请先重新加载页面，再合并并保存你的修改。")


def json_bytes(document: dict) -> bytes:
    return (json.dumps(document, ensure_ascii=False, indent=2) + "\n").encode("utf-8")


def write_atomic_bytes(path: Path, raw: bytes) -> None:
    """先写同目录临时文件，完整落盘后替换目标。"""
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(f".{path.name}.{uuid4().hex}.tmp")
    try:
        with temporary.open("wb") as file:
            file.write(raw)
            file.flush()
            os.fsync(file.fileno())
        os.replace(temporary, path)
    finally:
        temporary.unlink(missing_ok=True)


def read_revision_document() -> dict:
    if not REVISIONS_PATH.exists():
        return {"schema_version": 1, "revisions": []}
    document = json.loads(REVISIONS_PATH.read_text(encoding="utf-8-sig"))
    if not isinstance(document, dict) or not isinstance(document.get("revisions"), list):
        raise ValueError("资料修订清单格式不正确，未保存；请先检查修订清单。")
    return document


def commit_admin_changes(csv_raw: bytes, collection_raw: bytes | None,
                         changes: list[dict]) -> Path:
    """调用方持有维护锁；写入兼容既有验证器的管理员维护批次。"""
    old_csv = CSV_PATH.read_bytes()
    document = read_revision_document()
    check_revision_tail(document, old_csv)
    now = datetime.now(timezone.utc)
    batch = HISTORY_DIR / (now.strftime("%Y%m%dT%H%M%S") + "-" + uuid4().hex[:12])
    backup = batch / "backup" / "data"
    backup.mkdir(parents=True)
    targets = {CSV_PATH: csv_raw}
    if collection_raw is not None:
        targets[COLLECTION_PATH] = collection_raw
    relative = (batch / "accepted-changes.json").relative_to(REVISIONS_PATH.parent).as_posix()
    document["revisions"].append(relative)
    targets[REVISIONS_PATH] = json_bytes(document)
    originals = {path: path.read_bytes() if path.exists() else None for path in targets}
    for path, raw in originals.items():
        if raw is not None:
            (backup / path.name).write_bytes(raw)
    revision = {
        "review_type": "administrator_edit", "updated_at": now.isoformat(),
        "note": "管理员自行维护，保留修改前后差异；不代表文献或专家复核。",
        "source_sha256": hashlib.sha256(old_csv).hexdigest(),
        "output_sha256": hashlib.sha256(csv_raw).hexdigest(), "changes": changes,
        "collection_changed": collection_raw is not None,
    }
    (batch / "accepted-changes.json").write_bytes(json_bytes(revision))
    replace_with_rollback(targets, originals, batch)
    return batch


def check_revision_tail(document: dict, old_csv: bytes) -> None:
    """拒绝把未登记的外部主表变更悄悄接到已有修订链。"""
    if not document["revisions"]:
        return
    path = (REVISIONS_PATH.parent / document["revisions"][-1]).resolve()
    if not path.is_relative_to(REVISIONS_PATH.parent.resolve()):
        raise ValueError("资料修订批次路径不正确，未保存。")
    previous = json.loads(path.read_text(encoding="utf-8-sig"))
    if previous.get("output_sha256") != hashlib.sha256(old_csv).hexdigest():
        raise AdminRevisionConflict("主资料表存在未登记的外部修改，请先核对修订记录，避免覆盖。")


def replace_with_rollback(targets: dict[Path, bytes], originals: dict[Path, bytes | None],
                          batch: Path) -> None:
    """任一替换失败则恢复此前目标；备份始终留在批次目录供恢复。"""
    replaced = []
    try:
        for path, raw in targets.items():
            write_atomic_bytes(path, raw)
            replaced.append(path)
    except Exception:
        try:
            for path in reversed(replaced):
                raw = originals[path]
                if raw is None:
                    path.unlink(missing_ok=True)
                else:
                    write_atomic_bytes(path, raw)
        except OSError as error:
            raise ValueError(f"保存失败，自动恢复未完成。请保留现场并从此备份恢复：{batch / 'backup' / 'data'}") from error
        (batch / "failed.json").write_bytes(json_bytes({"status": "已回滚", "note": "保存未完成，原始备份保留。"}))
        raise
