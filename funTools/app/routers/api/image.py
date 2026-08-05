from fastapi import APIRouter, HTTPException, Response
from pydantic import BaseModel
from starlette.concurrency import run_in_threadpool

from app.services.image_resize import ResizeOptions, batch_resize_images
from app.services.image_similarity_rename import apply_rename_operations, build_similarity_preview
from app.services.watermark import normalize_base64, remove_watermark_image


router = APIRouter(tags=["image"])


class RemoveWatermarkRequest(BaseModel):
    image: str
    mask: str


@router.post("/remove-watermark")
async def remove_watermark(payload: RemoveWatermarkRequest):
    image = normalize_base64(payload.image)
    mask = normalize_base64(payload.mask)
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
