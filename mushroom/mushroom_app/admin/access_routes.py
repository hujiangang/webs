import time
from threading import Lock

from fastapi import APIRouter, Form, HTTPException, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates

from mushroom_app.admin.auth import COOKIE_NAME, SESSION_SECONDS, get_auth, initialize_admin, issue_session, verify_password
from mushroom_app.config import TEMPLATES_DIR


access_router = APIRouter()
templates = Jinja2Templates(directory=str(TEMPLATES_DIR))
ATTEMPTS = {}
ATTEMPT_LOCK = Lock()


def allow_setup(request: Request) -> bool:
    return bool(request.client and request.client.host in {'127.0.0.1', '::1', 'testclient'})


@access_router.get('/login', response_class=HTMLResponse, summary='管理员登录')
def login_page(request: Request):
    return templates.TemplateResponse('admin_login.html', {'request': request, 'setup': get_auth() is None, 'local': allow_setup(request), 'error': ''})


@access_router.post('/setup', summary='首次设置管理员密码')
def setup(request: Request, password: str = Form(..., min_length=12, max_length=128)):
    if not allow_setup(request):
        raise HTTPException(403, '首次设置必须在服务器本机访问 127.0.0.1 完成')
    initialize_admin(password)
    return logged_in_response(request)


@access_router.post('/login', summary='验证管理员密码')
def login(request: Request, password: str = Form(..., max_length=128)):
    address = request.client.host if request.client else 'unknown'
    with ATTEMPT_LOCK:
        recent = [moment for moment in ATTEMPTS.get(address, []) if time.monotonic() - moment < 300]
        if len(recent) >= 10:
            raise HTTPException(429, '尝试过于频繁，请五分钟后重试')
        ATTEMPTS[address] = recent + [time.monotonic()]
    if not verify_password(password):
        return templates.TemplateResponse('admin_login.html', {'request': request, 'setup': False, 'local': allow_setup(request), 'error': '密码不正确，请重试'}, status_code=401)
    ATTEMPTS.pop(address, None)
    return logged_in_response(request)


def logged_in_response(request: Request):
    response = RedirectResponse('/admin/content', status_code=303)
    response.set_cookie(COOKIE_NAME, issue_session(), max_age=SESSION_SECONDS, httponly=True, samesite='strict', secure=request.url.scheme == 'https')
    return response


@access_router.post('/logout', summary='退出管理端')
def logout():
    response = RedirectResponse('/login', status_code=303)
    response.delete_cookie(COOKIE_NAME)
    return response
