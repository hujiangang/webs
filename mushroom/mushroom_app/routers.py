from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.templating import Jinja2Templates

from mushroom_app.config import TEMPLATES_DIR
from mushroom_app.models import GalleryQuery
from mushroom_app.content.services import get_published_content
from mushroom_app.services import (
    get_home_picks,
    get_mushroom_detail,
    get_mushroom_page,
    get_mushroom_total,
    get_site_icon_path,
    get_site_icon_url,
)


router = APIRouter()
templates = Jinja2Templates(directory=str(TEMPLATES_DIR))


def build_template_context(request: Request, active: str, **kwargs: Any) -> dict[str, Any]:
    context: dict[str, Any] = {
        "request": request,
        "active": active,
        "site_icon_url": get_site_icon_url(),
        "mushroom_count": get_mushroom_total(),
        "content": get_published_content(),
    }
    context.update(kwargs)
    return context


async def public_error_handler(request: Request, exception: HTTPException):
    from starlette.concurrency import run_in_threadpool
    context = await run_in_threadpool(build_template_context, request, '', status=exception.status_code, message=exception.detail)
    return templates.TemplateResponse('error.html', context, status_code=exception.status_code)


@router.get("/site-icon", response_class=FileResponse, summary="网站头像")
def site_icon() -> FileResponse:
    icon_path = get_site_icon_path()
    if icon_path is None:
        raise HTTPException(status_code=404, detail="网站头像不存在")
    return FileResponse(icon_path)


@router.get("/", response_class=HTMLResponse, summary="首页")
def home_page(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(
        "home.html",
        build_template_context(
            request,
            "home",
            picks=get_home_picks(),
        ),
    )


@router.get("/games", response_class=HTMLResponse, summary="菌子小游戏")
def games_page(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(
        "games.html",
        build_template_context(request, "games"),
    )


@router.get('/games/{game_id}', response_class=HTMLResponse, summary='游戏游玩页面')
def game_player(request: Request, game_id: str):
    game = next((item for item in get_published_content().games if item.id == game_id), None)
    if game is None:
        raise HTTPException(404, '游戏不存在或已下架')
    return templates.TemplateResponse('game_player.html', build_template_context(request, 'games', game=game))


@router.get('/safety', response_class=HTMLResponse, summary='野生菌安全科普')
def safety_page(request: Request):
    return templates.TemplateResponse('safety.html', build_template_context(request, 'safety'))


@router.get('/safety/{article_id}', response_class=HTMLResponse, summary='科普文章详情')
def article_page(request: Request, article_id: str):
    article = next((item for item in get_published_content().articles if item.id == article_id), None)
    if article is None:
        raise HTTPException(404, '文章不存在或已下架')
    return templates.TemplateResponse('article.html', build_template_context(request, 'safety', article=article))


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
            search_keyword=mushroom_page.keyword,
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
