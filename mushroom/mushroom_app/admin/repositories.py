import csv
import os
from pathlib import Path

from starlette.datastructures import UploadFile

from mushroom_app.config import DATA_DIR, IMAGE_DIR, IMAGE_EX_DIR


MUSHROOM_CSV = DATA_DIR / "mushroom.csv"
IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp", ".gif"}


def read_admin_rows() -> list[dict[str, str]]:
    with MUSHROOM_CSV.open("r", encoding="utf-8-sig", newline="") as file:
        return list(csv.DictReader(file))


def read_admin_headers() -> list[str]:
    with MUSHROOM_CSV.open("r", encoding="utf-8-sig", newline="") as file:
        reader = csv.reader(file)
        return next(reader, [])


def write_admin_rows(rows: list[dict[str, str]]) -> None:
    if not rows:
        return

    temp_path = MUSHROOM_CSV.with_suffix(".csv.tmp")
    fieldnames = read_admin_headers() or list(rows[0].keys())
    with temp_path.open("w", encoding="utf-8-sig", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    os.replace(temp_path, MUSHROOM_CSV)


def find_main_image_path(mushroom_name: str) -> Path | None:
    for path in sorted(IMAGE_DIR.iterdir()):
        if path.is_file() and path.stem == mushroom_name:
            return path
    return None


def find_extra_image_paths(mushroom_name: str) -> list[Path]:
    if not IMAGE_EX_DIR.is_dir():
        return []
    paths = [
        path
        for path in IMAGE_EX_DIR.iterdir()
        if path.is_file()
        and path.stem.startswith(f"{mushroom_name}_")
        and path.stem.rsplit("_", 1)[-1].isdigit()
    ]
    paths.sort(key=lambda path: int(path.stem.rsplit("_", 1)[-1]))
    return paths


def rename_mushroom_images(old_name: str, new_name: str) -> None:
    if old_name == new_name:
        return

    main_image = find_main_image_path(old_name)
    if main_image is not None:
        main_image.rename(main_image.with_name(f"{new_name}{main_image.suffix}"))

    for path in find_extra_image_paths(old_name):
        index = path.stem.rsplit("_", 1)[-1]
        path.rename(path.with_name(f"{new_name}_{index}{path.suffix}"))


def next_extra_image_index(mushroom_name: str) -> int:
    indexes = {
        int(path.stem.rsplit("_", 1)[-1])
        for path in find_extra_image_paths(mushroom_name)
    }
    for index in range(1, 4):
        if index not in indexes:
            return index
    raise ValueError("扩展图片最多只能上传 3 张")


def save_main_image(mushroom_name: str, upload: UploadFile) -> Path:
    suffix = get_image_suffix(upload.filename or "")
    old_image = find_main_image_path(mushroom_name)
    if old_image is not None:
        old_image.unlink()

    target = IMAGE_DIR / f"{mushroom_name}{suffix}"
    save_upload_file(upload, target)
    return target


def save_extra_image(mushroom_name: str, upload: UploadFile) -> Path:
    suffix = get_image_suffix(upload.filename or "")
    index = next_extra_image_index(mushroom_name)
    target = IMAGE_EX_DIR / f"{mushroom_name}_{index}{suffix}"
    save_upload_file(upload, target)
    return target


def delete_extra_image(mushroom_name: str, index: int) -> None:
    if index < 1 or index > 3:
        raise ValueError("扩展图片序号不正确")
    for path in find_extra_image_paths(mushroom_name):
        if int(path.stem.rsplit("_", 1)[-1]) == index:
            path.unlink()
            return
    raise ValueError("扩展图片不存在")


def get_image_suffix(filename: str) -> str:
    suffix = Path(filename).suffix.lower()
    if suffix not in IMAGE_SUFFIXES:
        raise ValueError("仅支持 jpg、jpeg、png、webp、gif 图片")
    return suffix


def save_upload_file(upload: UploadFile, target: Path) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    with target.open("wb") as file:
        file.write(upload.file.read())
