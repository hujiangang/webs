from fastapi import APIRouter, File, Form, Request, UploadFile
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from starlette.concurrency import run_in_threadpool

from mushroom_app.config import TEMPLATES_DIR
from mushroom_app.content.models import ContentSave, GameUpload
from mushroom_app.content.services import get_editor_content, save_content
from mushroom_app.content.uploads import GAME_LIMIT, MEDIA_LIMIT, save_uploaded_media, unpack_game


content_admin_router = APIRouter()
templates = Jinja2Templates(directory=str(TEMPLATES_DIR))


@content_admin_router.get('/admin/content', response_class=HTMLResponse, summary='站点内容管理')
def content_page(request: Request):
    return templates.TemplateResponse('admin_content.html', {'request': request, **get_editor_content()})


@content_admin_router.get('/admin/api/content', summary='读取站点配置')
def content_data():
    return get_editor_content()


@content_admin_router.put('/admin/api/content', summary='保存站点配置')
def content_save(form: ContentSave):
    return save_content(form)


@content_admin_router.post('/admin/api/media', summary='上传海报视频或封面')
async def media_upload(file: UploadFile = File(...)):
    content = await file.read(MEDIA_LIMIT + 1)
    return await run_in_threadpool(save_uploaded_media, file.filename or '', content)


@content_admin_router.post('/admin/api/game-package', summary='上传 Web 游戏 ZIP 包')
async def game_upload(slug: str = Form(..., pattern=r'^[a-z0-9][a-z0-9-]{0,59}$'), file: UploadFile = File(...)):
    form = GameUpload(slug=slug)
    content = await file.read(GAME_LIMIT + 1)
    return await run_in_threadpool(unpack_game, form.slug, content)
