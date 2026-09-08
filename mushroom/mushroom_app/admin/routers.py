from typing import Any

from fastapi import APIRouter, File, HTTPException, Request, UploadFile
from fastapi.responses import HTMLResponse, RedirectResponse, Response
from fastapi.templating import Jinja2Templates

from mushroom_app.admin.models import AdminMushroomForm
from mushroom_app.admin.services import (
    delete_admin_extra_image,
    get_admin_mushroom,
    get_admin_mushroom_list,
    update_admin_mushroom,
    upload_admin_extra_image,
    upload_admin_main_image,
)
from mushroom_app.config import TEMPLATES_DIR


admin_router = APIRouter()
templates = Jinja2Templates(directory=str(TEMPLATES_DIR))


def build_admin_context(request: Request, **kwargs: Any) -> dict[str, Any]:
    context: dict[str, Any] = {"request": request}
    context.update(kwargs)
    return context


@admin_router.get("/", response_class=HTMLResponse, summary="管理首页")
def admin_home() -> RedirectResponse:
    return RedirectResponse(url="/admin/content", status_code=303)


@admin_router.get("/admin", response_class=HTMLResponse, summary="管理入口")
def admin_entry() -> RedirectResponse:
    return RedirectResponse(url="/admin/content", status_code=303)


@admin_router.get("/admin/mushrooms", response_class=HTMLResponse, summary="菌子管理列表")
def admin_mushroom_list(request: Request, keyword: str = "") -> HTMLResponse:
    mushroom_list = get_admin_mushroom_list(keyword)
    first_id = mushroom_list.items[0].id if mushroom_list.items else ""
    current = get_admin_mushroom(first_id) if first_id else None
    return templates.TemplateResponse(
        "admin_mushrooms.html",
        build_admin_context(
            request,
            mushroom_list=mushroom_list,
            mushroom=current,
            message="",
            error="",
        ),
    )


@admin_router.get("/admin/mushrooms/{mushroom_id}", response_class=HTMLResponse, summary="菌子编辑页")
def admin_mushroom_edit(
    request: Request,
    mushroom_id: str,
    keyword: str = "",
    message: str = "",
) -> HTMLResponse:
    mushroom = get_admin_mushroom(mushroom_id)
    if mushroom is None:
        raise HTTPException(status_code=404, detail="菌子不存在")

    return templates.TemplateResponse(
        "admin_mushrooms.html",
        build_admin_context(
            request,
            mushroom_list=get_admin_mushroom_list(keyword),
            mushroom=mushroom,
            message=message,
            error="",
        ),
    )


@admin_router.post("/admin/mushrooms/{mushroom_id}", response_class=HTMLResponse, summary="保存菌子信息")
async def admin_mushroom_save(
    request: Request,
    mushroom_id: str,
) -> Response:
    form_data = dict(await request.form())
    form = AdminMushroomForm(fields={key: str(value) for key, value in form_data.items()})
    try:
        update_admin_mushroom(mushroom_id, form)
    except ValueError as exc:
        return render_admin_error(request, mushroom_id, str(exc))
    return RedirectResponse(url=f"/admin/mushrooms/{mushroom_id}?message=保存成功", status_code=303)


@admin_router.post("/admin/mushrooms/{mushroom_id}/main-image", summary="上传菌子主图")
def admin_main_image_upload(
    request: Request,
    mushroom_id: str,
    image: UploadFile = File(...),
) -> Response:
    try:
        upload_admin_main_image(mushroom_id, image)
    except ValueError as exc:
        return render_admin_error(request, mushroom_id, str(exc))
    return RedirectResponse(url=f"/admin/mushrooms/{mushroom_id}?message=主图已更新", status_code=303)


@admin_router.post("/admin/mushrooms/{mushroom_id}/extra-images", summary="上传菌子扩展图")
def admin_extra_image_upload(
    request: Request,
    mushroom_id: str,
    image: UploadFile = File(...),
) -> Response:
    try:
        upload_admin_extra_image(mushroom_id, image)
    except ValueError as exc:
        return render_admin_error(request, mushroom_id, str(exc))
    return RedirectResponse(url=f"/admin/mushrooms/{mushroom_id}?message=扩展图已上传", status_code=303)


@admin_router.post("/admin/mushrooms/{mushroom_id}/extra-images/{index}/delete", summary="删除菌子扩展图")
def admin_extra_image_delete(
    request: Request,
    mushroom_id: str,
    index: int,
) -> Response:
    try:
        delete_admin_extra_image(mushroom_id, index)
    except ValueError as exc:
        return render_admin_error(request, mushroom_id, str(exc))
    return RedirectResponse(url=f"/admin/mushrooms/{mushroom_id}?message=扩展图已删除", status_code=303)


def render_admin_error(request: Request, mushroom_id: str, error: str) -> HTMLResponse:
    mushroom = get_admin_mushroom(mushroom_id)
    return templates.TemplateResponse(
        "admin_mushrooms.html",
        build_admin_context(
            request,
            mushroom_list=get_admin_mushroom_list(),
            mushroom=mushroom,
            message="",
            error=error,
        ),
    )
