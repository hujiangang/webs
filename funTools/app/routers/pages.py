from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from app.features import ASSET_VERSION, FEATURES


router = APIRouter()
templates = Jinja2Templates(directory="templates")


def render_feature(request: Request, feature_key: str):
    # 页面模板共用，新增功能只补充页面数据。
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "features": FEATURES.values(),
            "active_feature": FEATURES[feature_key],
            "asset_version": ASSET_VERSION,
        },
    )


@router.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return render_feature(request, "remove_watermark")


@router.get("/pdf-to-word", response_class=HTMLResponse)
async def pdf_to_word(request: Request):
    return render_feature(request, "pdf_to_word")


@router.get("/video-frame-capture", response_class=HTMLResponse)
async def video_frame_capture(request: Request):
    return render_feature(request, "video_frame_capture")


@router.get("/image-similarity-rename", response_class=HTMLResponse)
async def image_similarity_rename(request: Request):
    return render_feature(request, "image_similarity_rename")
