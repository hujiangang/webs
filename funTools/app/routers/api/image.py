from fastapi import APIRouter, Response
from pydantic import BaseModel
from starlette.concurrency import run_in_threadpool

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
