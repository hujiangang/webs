from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from mushroom_app.config import TEMPLATES_DIR
from mushroom_app.models import GalleryQuery
from mushroom_app.services import get_banner_items, get_mushroom_detail, get_mushroom_page


router = APIRouter()
templates = Jinja2Templates(directory=str(TEMPLATES_DIR))


def build_template_context(request: Request, active: str, **kwargs: Any) -> dict[str, Any]:
    context: dict[str, Any] = {"request": request, "active": active}
    context.update(kwargs)
    return context


@router.get("/", response_class=HTMLResponse, summary="首页")
def home_page(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(
        "home.html",
        build_template_context(request, "home", banners=get_banner_items()),
    )


@router.get("/mushrooms", response_class=HTMLResponse, summary="菌子图鉴")
def mushroom_gallery_page(
    request: Request,
    query: GalleryQuery = Depends(),
) -> HTMLResponse:
    mushroom_page = get_mushroom_page(query)
    return templates.TemplateResponse(
        "gallery.html",
        build_template_context(
            request,
            "gallery",
            mushroom_page=mushroom_page,
            mushroom_count=mushroom_page.total_count,
        ),
    )


@router.get("/mushrooms/{mushroom_id}", response_class=HTMLResponse, summary="菌子详情")
def mushroom_detail_page(request: Request, mushroom_id: str) -> HTMLResponse:
    mushroom = get_mushroom_detail(mushroom_id)
    if mushroom is None:
        raise HTTPException(status_code=404, detail="菌子不存在")

    return templates.TemplateResponse(
        "mushroom_detail.html",
        build_template_context(request, "gallery", mushroom=mushroom),
    )
