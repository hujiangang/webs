import hashlib
import hmac
import secrets
import time
from threading import Lock

from fastapi import Request
from fastapi.responses import JSONResponse, RedirectResponse
from starlette.middleware.base import BaseHTTPMiddleware

from mushroom_app.admin.auth_repository import read_credentials, write_credentials
from mushroom_app.admin.password_models import AdminPassword, AdminPasswordChange


AUTH_LOCK = Lock()
COOKIE_NAME = 'mushroom_admin'
SESSION_SECONDS = 8 * 60 * 60


def get_auth() -> dict | None:
    return read_credentials()


def password_hash(password: str, salt: str) -> str:
    return hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 600000).hex()


def initialize_admin(password: str) -> None:
    AdminPassword(password=password)
    with AUTH_LOCK:
        if get_auth():
            raise ValueError("管理员已设置，请登录")
        salt = secrets.token_hex(20)
        data = {'salt': salt, 'password': password_hash(password, salt), 'secret': secrets.token_hex(32)}
        write_credentials(data)


def reset_admin_password(password: str) -> None:
    """仅供服务器本机命令调用；轮换会话密钥，使旧登录立即失效。"""
    AdminPassword(password=password)
    with AUTH_LOCK:
        salt = secrets.token_hex(20)
        write_credentials({'salt': salt, 'password': password_hash(password, salt),
                           'secret': secrets.token_hex(32)})


def change_admin_password(form: AdminPasswordChange) -> None:
    """登录后的密码修改仍核对当前密码，避免共享电脑上的误操作。"""
    with AUTH_LOCK:
        if not verify_password(form.current_password):
            raise ValueError('当前密码不正确')
        salt = secrets.token_hex(20)
        write_credentials({'salt': salt, 'password': password_hash(form.new_password, salt),
                           'secret': secrets.token_hex(32)})


def verify_password(password: str) -> bool:
    config = get_auth()
    return bool(config and hmac.compare_digest(password_hash(password, config['salt']), config['password']))


def issue_session() -> str:
    config = get_auth()
    expires = str(int(time.time()) + SESSION_SECONDS)
    signature = hmac.new(config['secret'].encode(), expires.encode(), hashlib.sha256).hexdigest()
    return f'{expires}.{signature}'


def valid_session(token: str) -> bool:
    config = get_auth()
    if not config or '.' not in token:
        return False
    expires, signature = token.split('.', 1)
    if not expires.isdigit() or int(expires) < time.time():
        return False
    expected = hmac.new(config['secret'].encode(), expires.encode(), hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)


class AdminAccessMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        path = request.url.path
        if request.method not in {'GET', 'HEAD', 'OPTIONS'}:
            origin = request.headers.get('origin')
            if (origin and origin != str(request.base_url).rstrip('/')) or request.headers.get('sec-fetch-site') == 'cross-site':
                return JSONResponse({'detail': '请求来源不匹配，请从管理页面操作'}, status_code=403)
        public = path in {'/login', '/setup'} or path.startswith('/static/')
        if not public and not valid_session(request.cookies.get(COOKIE_NAME, '')):
            if path.startswith('/admin/api/'):
                return JSONResponse({'detail': '登录已过期，请重新登录'}, status_code=401)
            return RedirectResponse('/login', status_code=303)
        response = await call_next(request)
        response.headers['Cache-Control'] = 'no-store'
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        return response
