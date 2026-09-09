import asyncio
import base64
import io

from fastapi import APIRouter, HTTPException, Response
from PIL import Image, UnidentifiedImageError
from pydantic import BaseModel, Field
from starlette.concurrency import run_in_threadpool

from app.services.image_resize import ResizeOptions, batch_resize_images
from app.services.image_similarity_rename import apply_rename_operations, build_similarity_preview
from app.services.watermark import normalize_base64, remove_watermark_image


router = APIRouter(tags=["image"])
watermark_slot = asyncio.Semaphore(1)


class RemoveWatermarkRequest(BaseModel):
    image: str = Field(max_length=12 * 1024 * 1024)
    mask: str = Field(max_length=12 * 1024 * 1024)


def validate_watermark_images(image: str, mask: str):
    sizes = []
    try:
        for content in (image, mask):
            with Image.open(io.BytesIO(base64.b64decode(content))) as candidate:
                if candidate.width * candidate.height > 4000000:
                    raise HTTPException(413, "AI 去水印仅支持 400 万像素以内的图片，请先压缩")
                sizes.append(candidate.size)
                candidate.verify()
    except (UnidentifiedImageError, OSError, ValueError, Image.DecompressionBombError) as exc:
        raise HTTPException(400, "图片或遮罩无法读取") from exc
    if sizes[0] != sizes[1]:
        raise HTTPException(400, "图片和遮罩尺寸不一致")


@router.post("/remove-watermark")
async def remove_watermark(payload: RemoveWatermarkRequest):
    # 单进程只运行一次模型推理，避免并行任务耗尽内存。
    if watermark_slot.locked():
        raise HTTPException(429, "当前正在处理其他图片，请稍后重试")
    async with watermark_slot:
        image = normalize_base64(payload.image)
        mask = normalize_base64(payload.mask)
        await run_in_threadpool(validate_watermark_images, image, mask)
        result, media_type = await run_in_threadpool(remove_watermark_image, image, mask)
    return Response(content=result, media_type=media_type)


class ImageRenamePreviewRequest(BaseModel):
    source_dir: str
    reference_dir: str
    min_score: float = 0.45
    recursive: bool = False
    keep_extension: bool = True


class ImageRenameOperation(BaseModel):
    source_path: str
    target_name: str
    reference_path: str | None = None
    score: float | None = None


class ImageRenameApplyRequest(BaseModel):
    source_dir: str
    operations: list[ImageRenameOperation]


@router.post("/image-rename/preview")
async def image_rename_preview(payload: ImageRenamePreviewRequest):
    try:
        return await run_in_threadpool(
            build_similarity_preview,
            payload.source_dir,
            payload.reference_dir,
            payload.min_score,
            payload.recursive,
            payload.keep_extension,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@router.post("/image-rename/apply")
async def image_rename_apply(payload: ImageRenameApplyRequest):
    operations = [operation.dict() for operation in payload.operations]
    try:
        return await run_in_threadpool(apply_rename_operations, payload.source_dir, operations)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

class ImageResizeRequest(BaseModel):
    source_dir: str
    output_dir: str
    mode: str = "fit_width"
    width: int | None = None
    height: int | None = None
    output_format: str = "original"
    quality: int = 92
    recursive: bool = False
    preserve_subfolders: bool = True
    overwrite: bool = False


@router.post("/image-resize/batch")
async def image_resize_batch(payload: ImageResizeRequest):
    try:
        options = ResizeOptions(
            source_dir=payload.source_dir,
            output_dir=payload.output_dir,
            mode=payload.mode,
            width=payload.width,
            height=payload.height,
            output_format=payload.output_format,
            quality=payload.quality,
            recursive=payload.recursive,
            preserve_subfolders=payload.preserve_subfolders,
            overwrite=payload.overwrite,
        )
        return await run_in_threadpool(batch_resize_images, options)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
