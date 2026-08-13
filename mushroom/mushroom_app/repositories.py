import csv
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

from mushroom_app.config import DATA_DIR, IMAGE_DIR, IMAGE_EX_DIR


def read_banner_rows() -> list[dict[str, str]]:
    with (DATA_DIR / "banner.csv").open("r", encoding="utf-8-sig", newline="") as file:
        return list(csv.DictReader(file))


def read_mushroom_rows() -> list[dict[str, str]]:
    path = DATA_DIR / "mushroom.csv"
    # mushroom.csv 当前实际是 xlsx 文件内容，这里仅在读取层做兼容。
    if zipfile.is_zipfile(path):
        return read_xlsx_rows(path)

    with path.open("r", encoding="utf-8-sig", newline="") as file:
        return list(csv.DictReader(file))


def read_mushroom_headers() -> list[str]:
    path = DATA_DIR / "mushroom.csv"
    if zipfile.is_zipfile(path):
        rows = read_xlsx_rows(path)
        return list(rows[0].keys()) if rows else []

    with path.open("r", encoding="utf-8-sig", newline="") as file:
        reader = csv.reader(file)
        return next(reader, [])


def find_mushroom_image_name(mushroom_name: str) -> str | None:
    for path in sorted(IMAGE_DIR.iterdir()):
        if path.is_file() and path.stem == mushroom_name:
            return path.name
    return None


def find_mushroom_gallery_names(mushroom_name: str) -> list[str]:
    # 详情页图片列表：第一张为主图，其余为 image_ex 目录下按 菌子名_序号 命名的附加图，按序号升序。
    names: list[str] = []
    main_name = find_mushroom_image_name(mushroom_name)
    if main_name is not None:
        names.append(f"image/{main_name}")
    if IMAGE_EX_DIR.is_dir():
        extras = [
            path
            for path in IMAGE_EX_DIR.iterdir()
            if path.is_file()
            and path.stem.startswith(f"{mushroom_name}_")
            and path.stem.rsplit("_", 1)[-1].isdigit()
        ]
        extras.sort(key=lambda path: int(path.stem.rsplit("_", 1)[-1]))
        names.extend(f"image_ex/{path.name}" for path in extras)
    return names


def find_site_icon_path() -> Path | None:
    for path in sorted(DATA_DIR.iterdir()):
        if path.is_file() and path.stem == "icon":
            return path
    return None


def read_xlsx_rows(path: Path) -> list[dict[str, str]]:
    with zipfile.ZipFile(path) as workbook:
        shared_strings = read_shared_strings(workbook)
        sheet_name = next(
            name
            for name in workbook.namelist()
            if name.startswith("xl/worksheets/") and name.endswith(".xml")
        )
        rows = read_sheet_rows(workbook, sheet_name, shared_strings)

    if not rows:
        return []
    headers = rows[0]
    return [dict(zip(headers, row)) for row in rows[1:] if any(row)]


def read_shared_strings(workbook: zipfile.ZipFile) -> list[str]:
    if "xl/sharedStrings.xml" not in workbook.namelist():
        return []

    namespace = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
    root = ET.fromstring(workbook.read("xl/sharedStrings.xml"))
    return [
        "".join(text.text or "" for text in item.findall(".//m:t", namespace))
        for item in root.findall("m:si", namespace)
    ]


def read_sheet_rows(
    workbook: zipfile.ZipFile,
    sheet_name: str,
    shared_strings: list[str],
) -> list[list[str]]:
    namespace = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
    root = ET.fromstring(workbook.read(sheet_name))
    rows: list[list[str]] = []
    for row in root.findall(".//m:row", namespace):
        values = [
            read_cell_value(cell, shared_strings, namespace)
            for cell in row.findall("m:c", namespace)
        ]
        rows.append(values)
    return rows


def read_cell_value(
    cell: ET.Element,
    shared_strings: list[str],
    namespace: dict[str, str],
) -> str:
    value = cell.findtext("m:v", default="", namespaces=namespace)
    if cell.attrib.get("t") == "s" and value:
        return shared_strings[int(value)]
    return value
