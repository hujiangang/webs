from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any

import cv2
import numpy as np
from PIL import Image, ImageOps, UnidentifiedImageError
from skimage.metrics import structural_similarity

try:
    import imagehash
except ImportError:  # ImageHash is optional at runtime; requirements.txt includes it for fresh installs.
    imagehash = None


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


@dataclass(frozen=True)
class ImageFeature:
    path: Path
    name: str
    width: int
    height: int
    average_hash: int
    difference_hash: int
    perceptual_hash: int
    gray_128: np.ndarray
    edge_128: np.ndarray
    hsv_histogram: np.ndarray
    orb_points: np.ndarray
    orb_descriptors: np.ndarray | None


@dataclass(frozen=True)
class MatchScores:
    score: float
    hash_score: float
    ssim_score: float
    edge_score: float
    color_score: float
    orb_score: float
    orb_inlier_score: float


def build_similarity_preview(
    source_dir: str,
    reference_dir: str,
    min_score: float = 0.45,
    recursive: bool = False,
    keep_extension: bool = True,
) -> dict[str, Any]:
    source_root = _resolve_existing_dir(source_dir, "源文件夹不存在")
    reference_root = _resolve_existing_dir(reference_dir, "参考文件夹不存在")

    source_features, source_warnings = _load_features(source_root, recursive)
    reference_features, reference_warnings = _load_features(reference_root, recursive)
    warnings = source_warnings + reference_warnings

    matches = _match_features(source_features, reference_features, min_score)
    occupied_names = {path.name.lower() for path in _list_images(source_root, recursive)}
    planned_matches = []

    for match in matches:
        source = match["source"]
        reference = match["reference"]
        scores = match["scores"]
        occupied_names.discard(source.name.lower())
        target_name = _build_target_name(source, reference, occupied_names, keep_extension)
        occupied_names.add(target_name.lower())
        planned_matches.append(
            {
                "source_path": str(source.path),
                "source_name": source.name,
                "reference_path": str(reference.path),
                "reference_name": reference.name,
                "target_name": target_name,
                "score": round(scores.score, 4),
                "confidence": _confidence_label(scores),
                "source_size": f"{source.width}x{source.height}",
                "reference_size": f"{reference.width}x{reference.height}",
            }
        )

    matched_source_paths = {item["source_path"] for item in planned_matches}
    unmatched_sources = [
        {"source_path": str(feature.path), "source_name": feature.name}
        for feature in source_features
        if str(feature.path) not in matched_source_paths
    ]

    return {
        "source_dir": str(source_root),
        "reference_dir": str(reference_root),
        "source_count": len(source_features),
        "reference_count": len(reference_features),
        "matched_count": len(planned_matches),
        "unmatched_count": len(unmatched_sources),
        "min_score": min_score,
        "recursive": recursive,
        "keep_extension": keep_extension,
        "matches": planned_matches,
        "unmatched_sources": unmatched_sources,
        "warnings": warnings,
    }


def apply_rename_operations(source_dir: str, operations: list[dict[str, Any]]) -> dict[str, Any]:
    source_root = _resolve_existing_dir(source_dir, "源文件夹不存在")
    applied = []
    failed = []
    reserved_targets: set[str] = set()

    for operation in operations:
        source_value = str(operation.get("source_path") or "")
        target_name = str(operation.get("target_name") or "").strip()

        try:
            source_path = Path(source_value).expanduser().resolve()
            if not source_path.is_file():
                raise ValueError("源图片不存在")
            source_path.relative_to(source_root)
            if not _is_supported_image(source_path):
                raise ValueError("源文件不是支持的图片格式")
            if not target_name or Path(target_name).name != target_name:
                raise ValueError("目标文件名无效")

            target_path = (source_root / target_name).resolve()
            target_path.relative_to(source_root)
            target_key = str(target_path).lower()
            if target_key in reserved_targets:
                raise ValueError("目标文件名重复")
            if source_path == target_path:
                applied.append(
                    {
                        "source_path": str(source_path),
                        "target_path": str(target_path),
                        "source_name": source_path.name,
                        "target_name": target_path.name,
                        "status": "skipped",
                        "message": "文件名已经一致",
                    }
                )
                reserved_targets.add(target_key)
                continue
            if target_path.exists():
                raise ValueError("目标文件已存在")

            source_path.rename(target_path)
            reserved_targets.add(target_key)
            applied.append(
                {
                    "source_path": str(source_path),
                    "target_path": str(target_path),
                    "source_name": source_path.name,
                    "target_name": target_path.name,
                    "status": "renamed",
                    "message": "已重命名",
                }
            )
        except Exception as exc:
            failed.append(
                {
                    "source_path": source_value,
                    "target_name": target_name,
                    "message": str(exc),
                }
            )

    return {
        "applied_count": len(applied),
        "failed_count": len(failed),
        "applied": applied,
        "failed": failed,
    }


def _resolve_existing_dir(value: str, error_message: str) -> Path:
    folder = Path(value).expanduser().resolve()
    if not folder.exists() or not folder.is_dir():
        raise ValueError(error_message)
    return folder


def _list_images(folder: Path, recursive: bool) -> list[Path]:
    iterator = folder.rglob("*") if recursive else folder.iterdir()
    return sorted(
        [path for path in iterator if path.is_file() and _is_supported_image(path)],
        key=lambda item: str(item).lower(),
    )


def _is_supported_image(path: Path) -> bool:
    return path.suffix.lower() in SUPPORTED_IMAGE_EXTENSIONS


def _load_features(folder: Path, recursive: bool) -> tuple[list[ImageFeature], list[str]]:
    features = []
    warnings = []

    for image_path in _list_images(folder, recursive):
        try:
            features.append(_compute_feature(image_path))
        except (OSError, UnidentifiedImageError, ValueError) as exc:
            warnings.append(f"跳过无法读取的图片：{image_path}，原因：{exc}")

    return features, warnings


def _compute_feature(path: Path) -> ImageFeature:
    with Image.open(path) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        width, height = image.size
        gray = image.convert("L")
        gray_128 = _gray_array(gray, 128)
        orb_points, orb_descriptors = _orb_features(gray)
        return ImageFeature(
            path=path,
            name=path.name,
            width=width,
            height=height,
            average_hash=_average_hash(gray),
            difference_hash=_difference_hash(gray),
            perceptual_hash=_perceptual_hash(image, gray),
            gray_128=gray_128,
            edge_128=_edge_array(gray_128),
            hsv_histogram=_hsv_histogram(image),
            orb_points=orb_points,
            orb_descriptors=orb_descriptors,
        )


def _average_hash(image: Image.Image) -> int:
    resized = image.resize((8, 8), Image.Resampling.LANCZOS)
    pixels = list(resized.getdata())
    average = sum(pixels) / len(pixels)
    value = 0
    for pixel in pixels:
        value = (value << 1) | int(pixel >= average)
    return value


def _difference_hash(image: Image.Image) -> int:
    resized = image.resize((9, 8), Image.Resampling.LANCZOS)
    pixels = list(resized.getdata())
    value = 0
    for y in range(8):
        row_start = y * 9
        for x in range(8):
            value = (value << 1) | int(pixels[row_start + x] > pixels[row_start + x + 1])
    return value


def _perceptual_hash(rgb: Image.Image, gray: Image.Image) -> int:
    if imagehash is not None:
        return int(str(imagehash.phash(rgb, hash_size=8)), 16)

    resized = gray.resize((32, 32), Image.Resampling.LANCZOS)
    pixels = np.asarray(resized, dtype=np.float32)
    coefficients = cv2.dct(pixels)[:8, :8].flatten()
    median = float(np.median(coefficients[1:]))
    value = 0
    for coefficient in coefficients:
        value = (value << 1) | int(coefficient >= median)
    return value


def _gray_array(image: Image.Image, size: int) -> np.ndarray:
    resized = image.resize((size, size), Image.Resampling.LANCZOS)
    return np.asarray(resized, dtype=np.uint8)


def _edge_array(gray_array: np.ndarray) -> np.ndarray:
    return cv2.Canny(gray_array, 80, 160).astype(np.uint8)


def _hsv_histogram(image: Image.Image) -> np.ndarray:
    resized = image.resize((160, 160), Image.Resampling.BILINEAR)
    rgb = np.asarray(resized, dtype=np.uint8)
    hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV)
    hist = cv2.calcHist([hsv], [0, 1, 2], None, [12, 8, 4], [0, 180, 0, 256, 0, 256])
    hist = hist.astype(np.float32).flatten()
    total = float(hist.sum())
    return hist / total if total else hist


def _orb_features(gray: Image.Image) -> tuple[np.ndarray, np.ndarray | None]:
    max_side = 640
    width, height = gray.size
    scale = min(max_side / max(width, height), 1.0)
    if scale < 1.0:
        gray = gray.resize((max(1, int(width * scale)), max(1, int(height * scale))), Image.Resampling.LANCZOS)

    array = np.asarray(gray, dtype=np.uint8)
    orb = cv2.ORB_create(nfeatures=900, scaleFactor=1.2, nlevels=8, fastThreshold=7)
    keypoints, descriptors = orb.detectAndCompute(array, None)
    if not keypoints or descriptors is None:
        return np.empty((0, 2), dtype=np.float32), None

    points = np.asarray([keypoint.pt for keypoint in keypoints], dtype=np.float32)
    return points, descriptors


def _match_features(
    source_features: list[ImageFeature],
    reference_features: list[ImageFeature],
    min_score: float,
) -> list[dict[str, Any]]:
    min_score = max(0.25, min(float(min_score), 0.98))
    candidates = []

    for source in source_features:
        source_candidates = []
        for reference in reference_features:
            scores = _similarity(source, reference)
            if _passes_similarity_gate(scores, min_score):
                source_candidates.append({"source": source, "reference": reference, "score": scores.score, "scores": scores})

        source_candidates.sort(key=lambda item: item["score"], reverse=True)
        if not source_candidates:
            continue

        best = source_candidates[0]
        second_score = source_candidates[1]["score"] if len(source_candidates) > 1 else 0.0
        if best["score"] < 0.38 and second_score and best["score"] - second_score < 0.02:
            continue
        candidates.append(best)

    candidates.sort(key=lambda item: item["score"], reverse=True)
    used_sources: set[Path] = set()
    used_references: set[Path] = set()
    matches = []

    for candidate in candidates:
        source = candidate["source"]
        reference = candidate["reference"]
        if source.path in used_sources or reference.path in used_references:
            continue
        used_sources.add(source.path)
        used_references.add(reference.path)
        matches.append(candidate)

    matches.sort(key=lambda item: str(item["source"].path).lower())
    return matches


def _similarity(source: ImageFeature, reference: ImageFeature) -> MatchScores:
    average_score = 1 - (_hamming_distance(source.average_hash, reference.average_hash) / 64)
    difference_score = 1 - (_hamming_distance(source.difference_hash, reference.difference_hash) / 64)
    perceptual_score = 1 - (_hamming_distance(source.perceptual_hash, reference.perceptual_hash) / 64)
    hash_score = _clamp(perceptual_score * 0.52 + difference_score * 0.30 + average_score * 0.18)

    ssim_score = _clamp(float(structural_similarity(source.gray_128, reference.gray_128, data_range=255)))
    edge_score = _clamp(float(structural_similarity(source.edge_128, reference.edge_128, data_range=255)))
    color_score = _histogram_intersection(source.hsv_histogram, reference.hsv_histogram)
    orb_score, orb_inlier_score = _orb_similarity(source, reference)

    structure_score = ssim_score * 0.72 + edge_score * 0.28
    local_feature_score = orb_score * 0.45 + orb_inlier_score * 0.55
    base_score = hash_score * 0.44 + structure_score * 0.36 + color_score * 0.20

    # ORB is excellent positive evidence, but many valid pairs have too few reliable keypoints.
    # Treat local features as a boost instead of making missing ORB matches drag the score down.
    score = base_score + local_feature_score * 0.12

    return MatchScores(
        score=_clamp(score),
        hash_score=hash_score,
        ssim_score=ssim_score,
        edge_score=edge_score,
        color_score=color_score,
        orb_score=orb_score,
        orb_inlier_score=orb_inlier_score,
    )


def _passes_similarity_gate(scores: MatchScores, min_score: float) -> bool:
    if scores.score < min_score:
        return False

    local_feature_score = scores.orb_score * 0.45 + scores.orb_inlier_score * 0.55

    # Only reject pairs that are almost certainly unrelated. The UI shows thumbnails and asks for confirmation,
    # so weak-but-plausible best candidates should be visible instead of silently discarded.
    if scores.color_score < 0.12 and local_feature_score < 0.12:
        return False
    if scores.color_score < 0.08 and scores.ssim_score < 0.28 and local_feature_score < 0.10:
        return False
    if scores.hash_score < 0.22 and scores.ssim_score < 0.20 and scores.color_score < 0.16:
        return False

    return True


def _orb_similarity(source: ImageFeature, reference: ImageFeature) -> tuple[float, float]:
    if source.orb_descriptors is None or reference.orb_descriptors is None:
        return 0.0, 0.0
    if len(source.orb_descriptors) < 8 or len(reference.orb_descriptors) < 8:
        return 0.0, 0.0

    matcher = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=False)
    raw_matches = matcher.knnMatch(source.orb_descriptors, reference.orb_descriptors, k=2)
    good_matches = []
    for pair in raw_matches:
        if len(pair) < 2:
            continue
        first, second = pair
        if first.distance <= 64 and first.distance < second.distance * 0.76:
            good_matches.append(first)

    if not good_matches:
        return 0.0, 0.0

    base = max(1, min(len(source.orb_descriptors), len(reference.orb_descriptors)))
    match_score = _clamp(len(good_matches) / base * 2.4)
    if len(good_matches) < 8:
        return match_score * 0.55, 0.0

    source_points = np.float32([source.orb_points[match.queryIdx] for match in good_matches]).reshape(-1, 1, 2)
    reference_points = np.float32([reference.orb_points[match.trainIdx] for match in good_matches]).reshape(-1, 1, 2)
    _, mask = cv2.findHomography(source_points, reference_points, cv2.RANSAC, 5.0)
    if mask is None:
        return match_score, 0.0

    inlier_ratio = float(mask.ravel().sum()) / len(good_matches)
    inlier_score = _clamp(inlier_ratio * min(1.0, len(good_matches) / 18))
    return match_score, inlier_score


def _histogram_intersection(left: np.ndarray, right: np.ndarray) -> float:
    return _clamp(float(np.minimum(left, right).sum()))


def _hamming_distance(left: int, right: int) -> int:
    return (left ^ right).bit_count()




def _clamp(value: float) -> float:
    return max(0.0, min(1.0, value))


def _build_target_name(
    source: ImageFeature,
    reference: ImageFeature,
    occupied_names: set[str],
    keep_extension: bool,
) -> str:
    if keep_extension:
        target_name = f"{reference.path.stem}{source.path.suffix.lower()}"
    else:
        target_name = reference.name

    if target_name.lower() not in occupied_names:
        return target_name

    stem = Path(target_name).stem
    suffix = Path(target_name).suffix
    index = 1
    while True:
        candidate = f"{stem}_{index}{suffix}"
        if candidate.lower() not in occupied_names:
            return candidate
        index += 1


def _confidence_label(scores: MatchScores) -> str:
    local_feature_score = scores.orb_score * 0.45 + scores.orb_inlier_score * 0.55
    if scores.score >= 0.78 or local_feature_score >= 0.62:
        return "高"
    if scores.score >= 0.58:
        return "中"
    return "低"