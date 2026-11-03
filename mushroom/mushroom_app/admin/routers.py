from typing import Annotated
from urllib.parse import urlencode

from fastapi import APIRouter, Depends, File, Form, HTTPException, Request, UploadFile
from fastapi.responses import HTMLResponse, RedirectResponse, Response
from fastapi.templating import Jinja2Templates
from pydantic import ValidationError
from starlette.concurrency import run_in_threadpool

from mushroom_app.admin.maintenance_repository import AdminRevisionConflict
from mushroom_app.admin.models import AdminMushroomForm, AdminSelectionForm
from mushroom_app.admin.route_models import AdminBrowseQuery
from mushroom_app.admin.services import (
    clear_admin_main_image, delete_admin_extra_image, get_admin_mushroom,
    get_admin_mushroom_list, update_admin_mushroom, upload_admin_extra_image,
    upload_admin_main_image,
)
from mushroom_app.config import TEMPLATES_DIR


admin_router = APIRouter()
templates = Jinja2Templates(directory=str(TEMPLATES_DIR))
CONTROL_FIELDS = {"revision", "keyword", "collection", "page", "image_revision",
                  "selection_display_name", "selection_aliases", "selection_summary", "selection_order"}


def build_admin_context(request: Request, **kwargs) -> dict:
    return {"request": request, "submitted": None, **kwargs}


def editor_response(request: Request, mushroom_id: str, query: AdminBrowseQuery,
                    message: str = "", error: str = "", submitted: dict | None = None,
                    status_code: int = 200) -> HTMLResponse:
    mushroom = get_admin_mushroom(mushroom_id) if mushroom_id else None
    if mushroom_id and mushroom is None:
        raise HTTPException(status_code=404, detail="菌子不存在")
    return templates.TemplateResponse("admin_mushrooms.html", build_admin_context(
        request, mushroom_list=get_admin_mushroom_list(**query.model_dump()),
        mushroom=mushroom, message=message, error=error, submitted=submitted,
    ), status_code=status_code)


def editor_redirect(mushroom_id: str, query: AdminBrowseQuery, message: str) -> RedirectResponse:
    parameters = {**query.model_dump(), "message": message}
    return RedirectResponse(f"/admin/mushrooms/{mushroom_id}?{urlencode(parameters)}", status_code=303)


def validation_message(exception: ValidationError) -> str:
    return "；".join(error["msg"].removeprefix("Value error, ") for error in exception.errors())


@admin_router.get("/", response_class=HTMLResponse, summary="管理首页")
def admin_home() -> RedirectResponse:
    return RedirectResponse(url="/admin/content", status_code=303)


@admin_router.get("/admin", response_class=HTMLResponse, summary="管理入口")
def admin_entry() -> RedirectResponse:
    return RedirectResponse(url="/admin/content", status_code=303)


@admin_router.get("/admin/mushrooms", response_class=HTMLResponse, summary="菌子管理列表")
def admin_mushroom_list(request: Request, query: Annotated[AdminBrowseQuery, Depends()],
                        message: str = "") -> HTMLResponse:
    mushroom_list = get_admin_mushroom_list(**query.model_dump())
    current = get_admin_mushroom(mushroom_list.items[0].id) if mushroom_list.items else None
    return templates.TemplateResponse("admin_mushrooms.html", build_admin_context(
        request, mushroom_list=mushroom_list, mushroom=current, message=message, error="",
    ))


@admin_router.get("/admin/mushrooms/{mushroom_id}", response_class=HTMLResponse, summary="菌子编辑页")
def admin_mushroom_edit(request: Request, mushroom_id: str,
                        query: Annotated[AdminBrowseQuery, Depends()], message: str = "") -> HTMLResponse:
    return editor_response(request, mushroom_id, query, message=message)


@admin_router.post("/admin/mushrooms/{mushroom_id}", response_class=HTMLResponse, summary="保存菌子信息")
async def admin_mushroom_save(request: Request, mushroom_id: str) -> Response:
    submitted = {key: str(value) for key, value in (await request.form()).items()}
    query = AdminBrowseQuery.model_validate({key: submitted[key] for key in ("keyword", "collection", "page") if key in submitted})
    try:
        selection = None
        if "selection_display_name" in submitted:
            selection = AdminSelectionForm(
                display_name=submitted.get("selection_display_name", ""),
                aliases=submitted.get("selection_aliases", "").splitlines(),
                summary=submitted.get("selection_summary", ""),
                order=submitted.get("selection_order", ""),
            )
        form = AdminMushroomForm(fields={key: value for key, value in submitted.items() if key not in CONTROL_FIELDS},
                                 revision=submitted.get("revision", ""), selection=selection)
        await run_in_threadpool(update_admin_mushroom, mushroom_id, form)
    except (ValueError, ValidationError) as exception:
        message = validation_message(exception) if isinstance(exception, ValidationError) else str(exception)
        status = 409 if isinstance(exception, AdminRevisionConflict) else 400
        return await run_in_threadpool(editor_response, request, mushroom_id, query,
                                      error=message, submitted=submitted, status_code=status)
    return editor_redirect(mushroom_id, query, "资料已保存，前台刷新后生效")


async def image_action(request: Request, mushroom_id: str, query: AdminBrowseQuery,
                       action, arguments: tuple, message: str) -> Response:
    try:
        await run_in_threadpool(action, mushroom_id, *arguments)
    except ValueError as exception:
        status = 409 if isinstance(exception, AdminRevisionConflict) else 400
        return await run_in_threadpool(editor_response, request, mushroom_id, query,
                                      error=str(exception), status_code=status)
    return editor_redirect(mushroom_id, query, message)


@admin_router.post("/admin/mushrooms/{mushroom_id}/main-image", summary="上传菌子主图")
async def admin_main_image_upload(request: Request, mushroom_id: str, image: UploadFile = File(...),
                                  image_revision: str = Form(""), keyword: str = Form(""),
                                  collection: str = Form("yunnan"), page: int = Form(1)) -> Response:
    query = AdminBrowseQuery(keyword=keyword, collection=collection, page=page)
    return await image_action(request, mushroom_id, query, upload_admin_main_image,
                              (image, image_revision), "管理员主图已更新，原始图片仍保留")


@admin_router.post("/admin/mushrooms/{mushroom_id}/main-image/delete", summary="撤销管理员上传主图")
async def admin_main_image_delete(request: Request, mushroom_id: str, image_revision: str = Form(""),
                                  keyword: str = Form(""), collection: str = Form("yunnan"),
                                  page: int = Form(1)) -> Response:
    query = AdminBrowseQuery(keyword=keyword, collection=collection, page=page)
    return await image_action(request, mushroom_id, query, clear_admin_main_image,
                              (image_revision,), "管理员主图已撤销，前台恢复原有配图")


@admin_router.post("/admin/mushrooms/{mushroom_id}/extra-images", summary="上传菌子扩展图")
async def admin_extra_image_upload(request: Request, mushroom_id: str, image: UploadFile = File(...),
                                   image_revision: str = Form(""), keyword: str = Form(""),
                                   collection: str = Form("yunnan"), page: int = Form(1)) -> Response:
    query = AdminBrowseQuery(keyword=keyword, collection=collection, page=page)
    return await image_action(request, mushroom_id, query, upload_admin_extra_image,
                              (image, image_revision), "管理员附图已上传")


@admin_router.post("/admin/mushrooms/{mushroom_id}/extra-images/{index}/delete", summary="撤销管理员上传附图")
async def admin_extra_image_delete(request: Request, mushroom_id: str, index: int,
                                   image_revision: str = Form(""), keyword: str = Form(""),
                                   collection: str = Form("yunnan"), page: int = Form(1)) -> Response:
    query = AdminBrowseQuery(keyword=keyword, collection=collection, page=page)
    return await image_action(request, mushroom_id, query, delete_admin_extra_image,
                              (index, image_revision), "管理员附图已撤销，原始文件仍保留")
