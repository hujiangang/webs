from fastapi import APIRouter, HTTPException, Response
from pydantic import BaseModel
from starlette.concurrency import run_in_threadpool

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
