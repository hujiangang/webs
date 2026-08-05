from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any, Literal

from PIL import Image, ImageOps, UnidentifiedImageError


SUPPORTED_IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".webp",
    ".tif",
    ".tiff",
    ".gif",
}

ResizeMode = Literal["fit_width", "fit_height", "fit_box", "exact"]
OutputFormat = Literal["original", "jpg", "png", "webp", "bmp", "tiff"]

FORMAT_SUFFIX = {
    "jpg": ".jpg",
    "png": ".png",
    "webp": ".webp",
    "bmp": ".bmp",
    "tiff": ".tiff",
}

PIL_FORMAT = {
    ".jpg": "JPEG",
    ".jpeg": "JPEG",
    ".png": "PNG",
    ".webp": "WEBP",
    ".bmp": "BMP",
    ".tif": "TIFF",
    ".tiff": "TIFF",
    ".gif": "GIF",
}


@dataclass(frozen=True)
class ResizeOptions:
    source_dir: str
    output_dir: str
    mode: ResizeMode
    width: int | None = None
    height: int | None = None
    output_format: OutputFormat = "original"
    quality: int = 92
    recursive: bool = False
    preserve_subfolders: bool = True
    overwrite: bool = False


def batch_resize_images(options: ResizeOptions) -> dict[str, Any]:
    source_root = _resolve_existing_dir(options.source_dir, "源文件夹不存在")
    output_root = Path(options.output_dir).expanduser().resolve()
    if source_root == output_root:
        raise ValueError("输出文件夹不能和源文件夹相同")

    output_root.mkdir(parents=True, exist_ok=True)
    if not output_root.is_dir():
        raise ValueError("输出路径不是文件夹")

    _validate_output_format(options.output_format)
    width = _normalize_dimension(options.width, "宽度")
    height = _normalize_dimension(options.height, "高度")
    quality = max(1, min(int(options.quality), 100))
    images = _list_images(source_root, options.recursive)
    processed = []
    failed = []

    for image_path in images:
        try:
            with Image.open(image_path) as image:
                image = ImageOps.exif_transpose(image)
                original_width, original_height = image.size
                target_width, target_height = _target_size(original_width, original_height, options.mode, width, height)
                resized = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
                suffix = _target_suffix(image_path, options.output_format)
                target_path = _build_output_path(
                    image_path,
                    source_root,
                    output_root,
                    suffix,
                    options.preserve_subfolders,
                    options.overwrite,
                )
                target_path.parent.mkdir(parents=True, exist_ok=True)
                _save_image(resized, target_path, suffix, quality)

            processed.append(
                {
                    "source_path": str(image_path),
                    "source_name": image_path.name,
                    "output_path": str(target_path),
                    "output_name": target_path.name,
                    "original_size": f"{original_width}x{original_height}",
                    "target_size": f"{target_width}x{target_height}",
                    "format": PIL_FORMAT[suffix],
                }
            )
        except (OSError, UnidentifiedImageError, ValueError) as exc:
            failed.append(
                {
                    "source_path": str(image_path),
                    "source_name": image_path.name,
                    "message": str(exc),
                }
            )

    return {
        "source_dir": str(source_root),
        "output_dir": str(output_root),
        "source_count": len(images),
        "processed_count": len(processed),
        "failed_count": len(failed),
        "processed": processed,
        "failed": failed,
    }



def _validate_output_format(output_format: str) -> None:
    if output_format != "original" and output_format not in FORMAT_SUFFIX:
        raise ValueError("保存格式无效")

def _resolve_existing_dir(value: str, error_message: str) -> Path:
    folder = Path(value).expanduser().resolve()
    if not folder.exists() or not folder.is_dir():
        raise ValueError(error_message)
    return folder


def _list_images(folder: Path, recursive: bool) -> list[Path]:
    iterator = folder.rglob("*") if recursive else folder.iterdir()
    return sorted(
        [path for path in iterator if path.is_file() and path.suffix.lower() in SUPPORTED_IMAGE_EXTENSIONS],
        key=lambda item: str(item).lower(),
    )


def _normalize_dimension(value: int | None, label: str) -> int | None:
    if value in (None, ""):
        return None
    dimension = int(value)
    if dimension <= 0:
        raise ValueError(f"{label}必须大于 0")
    if dimension > 20000:
        raise ValueError(f"{label}不能超过 20000")
    return dimension


def _target_size(original_width: int, original_height: int, mode: ResizeMode, width: int | None, height: int | None) -> tuple[int, int]:
    if mode == "fit_width":
        if not width:
            raise ValueError("按宽等比时必须输入宽度")
        ratio = width / original_width
        return width, max(1, round(original_height * ratio))

    if mode == "fit_height":
        if not height:
            raise ValueError("按高等比时必须输入高度")
        ratio = height / original_height
        return max(1, round(original_width * ratio)), height

    if mode == "fit_box":
        if not width or not height:
            raise ValueError("等比适配范围时必须输入宽度和高度")
        ratio = min(width / original_width, height / original_height)
        return max(1, round(original_width * ratio)), max(1, round(original_height * ratio))

    if mode == "exact":
        if not width or not height:
            raise ValueError("强制指定宽高时必须输入宽度和高度")
        return width, height

    raise ValueError("尺寸模式无效")


def _target_suffix(image_path: Path, output_format: OutputFormat) -> str:
    if output_format == "original":
        suffix = image_path.suffix.lower()
        if suffix == ".jpeg":
            return ".jpg"
        if suffix == ".tif":
            return ".tiff"
        return suffix
    return FORMAT_SUFFIX[output_format]


def _build_output_path(
    image_path: Path,
    source_root: Path,
    output_root: Path,
    suffix: str,
    preserve_subfolders: bool,
    overwrite: bool,
) -> Path:
    relative = image_path.relative_to(source_root)
    parent = relative.parent if preserve_subfolders else Path()
    candidate = output_root / parent / f"{image_path.stem}{suffix}"
    if overwrite or not candidate.exists():
        return candidate

    index = 1
    while True:
        indexed = candidate.with_name(f"{candidate.stem}_{index}{candidate.suffix}")
        if not indexed.exists():
            return indexed
        index += 1


def _save_image(image: Image.Image, target_path: Path, suffix: str, quality: int) -> None:
    pil_format = PIL_FORMAT[suffix]
    save_kwargs: dict[str, Any] = {}
    output = image

    if pil_format in {"JPEG", "BMP"}:
        output = _flatten_transparency(image)
    elif pil_format == "WEBP":
        save_kwargs["quality"] = quality
        save_kwargs["method"] = 6
    elif pil_format == "PNG":
        save_kwargs["optimize"] = True
    elif pil_format == "JPEG":
        save_kwargs["quality"] = quality
        save_kwargs["optimize"] = True

    if pil_format == "JPEG":
        save_kwargs["quality"] = quality
        save_kwargs["optimize"] = True
        save_kwargs["progressive"] = True

    output.save(target_path, format=pil_format, **save_kwargs)


def _flatten_transparency(image: Image.Image) -> Image.Image:
    if image.mode in {"RGBA", "LA"} or (image.mode == "P" and "transparency" in image.info):
        rgba = image.convert("RGBA")
        background = Image.new("RGBA", rgba.size, (255, 255, 255, 255))
        background.alpha_composite(rgba)
        return background.convert("RGB")
    if image.mode != "RGB":
        return image.convert("RGB")
    return image