from __future__ import annotations

import io
import string
from pathlib import Path
from typing import Any

from PIL import Image, ImageOps


def list_directories(path: str | None = None) -> dict[str, Any]:
    if not path:
        return {
            "current_path": "",
            "display_path": "此电脑",
            "parent_path": None,
            "items": _list_roots(),
        }

    current = Path(path).expanduser().resolve()
    if not current.exists() or not current.is_dir():
        raise ValueError("文件夹不存在")

    items = []
    for child in sorted(current.iterdir(), key=lambda item: item.name.lower()):
        if not child.is_dir():
            continue
        try:
            child.iterdir()
        except OSError:
            readable = False
        else:
            readable = True
        items.append(
            {
                "name": child.name or str(child),
                "path": str(child),
                "readable": readable,
            }
        )

    parent = current.parent
    parent_path = "" if parent == current else str(parent)
    if current.anchor and str(current) == current.anchor:
        parent_path = ""

    return {
        "current_path": str(current),
        "display_path": str(current),
        "parent_path": parent_path,
        "items": items,
    }


def _list_roots() -> list[dict[str, Any]]:
    roots = []
    for letter in string.ascii_uppercase:
        drive = Path(f"{letter}:\\")
        if drive.exists():
            roots.append({"name": f"{letter}:\\", "path": str(drive), "readable": True})

    if roots:
        return roots

    root = Path(Path.cwd().anchor or "/")
    return [{"name": str(root), "path": str(root), "readable": True}]

def build_image_thumbnail(path: str, max_size: int = 96) -> tuple[bytes, str]:
    image_path = Path(path).expanduser().resolve()
    if not image_path.exists() or not image_path.is_file():
        raise ValueError("图片不存在")

    max_size = max(40, min(int(max_size), 320))
    with Image.open(image_path) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        image.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
        output = io.BytesIO()
        image.save(output, format="JPEG", quality=82, optimize=True)
        return output.getvalue(), "image/jpeg"

def select_directory(initial_dir: str | None = None, title: str = "选择文件夹") -> str:
    try:
        import tkinter as tk
        from tkinter import filedialog
    except ImportError as exc:
        raise RuntimeError("当前 Python 环境不支持系统文件夹选择框") from exc

    root = tk.Tk()
    root.withdraw()
    root.attributes("-topmost", True)
    root.update()
    try:
        kwargs: dict[str, str] = {"title": title}
        if initial_dir:
            folder = Path(initial_dir).expanduser()
            if folder.exists() and folder.is_dir():
                kwargs["initialdir"] = str(folder.resolve())
        selected = filedialog.askdirectory(parent=root, **kwargs)
        return str(Path(selected).resolve()) if selected else ""
    finally:
        root.destroy()
