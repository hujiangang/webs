import hashlib
import hmac
import json
import os
import secrets
import time
from collections import defaultdict
from threading import Lock

from fastapi import HTTPException, Request
from itsdangerous import BadSignature, URLSafeTimedSerializer

from app.services.settings import DATA_DIR


COOKIE_NAME = "funtools_admin"
ATTEMPTS = defaultdict(list)
ATTEMPT_LOCK = Lock()


def set_password(password: str):
    if len(password) < 12:
        raise ValueError("管理密码至少需要 12 个字符")
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    salt = secrets.token_hex(24)
    record = {
        "salt": salt,
        "digest": hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 600000).hex(),
        "secret": secrets.token_hex(48),
    }
    target = DATA_DIR / "admin.json"
    temporary = target.with_suffix(".tmp")
    temporary.write_text(json.dumps(record), encoding="utf-8")
    temporary.replace(target)
    return record


def load_credentials():
    password = os.environ.get("FUNTOOLS_ADMIN_PASSWORD")
    if password:
        if len(password) < 12:
            raise RuntimeError("FUNTOOLS_ADMIN_PASSWORD 至少需要 12 个字符")
        return {"environment_password": password, "secret": hashlib.sha256(password.encode()).hexdigest()}
    target = DATA_DIR / "admin.json"
    if target.exists():
        return json.loads(target.read_text(encoding="utf-8"))
    password = secrets.token_urlsafe(18)
    record = set_password(password)
    print(f"首次启动管理站，管理员密码：{password}", flush=True)
    print("请保存此密码；可用 python admin_main.py --set-password 重新设置。", flush=True)
    return record


def verify_password(record, password):
    if "environment_password" in record:
        return hmac.compare_digest(password.encode(), record["environment_password"].encode())
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), record["salt"].encode(), 600000).hex()
    return hmac.compare_digest(digest, record["digest"])


def serializer(request: Request):
    return URLSafeTimedSerializer(request.app.state.credentials["secret"], salt="funtools-admin-v1")


def session(request: Request):
    try:
        return serializer(request).loads(request.cookies.get(COOKIE_NAME, ""), max_age=28800)
    except BadSignature:
        return None


def require_admin(request: Request):
    value = session(request)
    if not value:
        raise HTTPException(401, "请先登录管理后台")
    if request.method not in {"GET", "HEAD"}:
        csrf = request.headers.get("X-CSRF-Token", "")
        if not csrf or not hmac.compare_digest(csrf, value["csrf"]):
            raise HTTPException(403, "请求校验失败，请刷新后重试")
    return value


def check_login_rate(address: str):
    now = time.monotonic()
    with ATTEMPT_LOCK:
        for key in list(ATTEMPTS):
            ATTEMPTS[key] = [stamp for stamp in ATTEMPTS[key] if now - stamp < 300]
            if not ATTEMPTS[key]:
                del ATTEMPTS[key]
        attempts = ATTEMPTS[address]
        if len(attempts) >= 8:
            raise HTTPException(429, "尝试次数过多，请 5 分钟后再试")
        attempts.append(now)
