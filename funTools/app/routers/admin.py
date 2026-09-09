import io
import re
import secrets
from urllib.parse import urlparse

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from PIL import Image, UnidentifiedImageError
from pydantic import BaseModel, Field
from starlette.concurrency import run_in_threadpool

from app.features import ASSET_VERSION, FEATURES, feature_availability
from app.services.admin_auth import COOKIE_NAME, check_login_rate, require_admin, serializer, session, verify_password
from app.services.settings import PROJECT_ROOT, UPLOAD_DIR, get_settings, save_settings


router = APIRouter()
templates = Jinja2Templates(directory=str(PROJECT_ROOT / "templates"))


class LoginRequest(BaseModel):
    password: str = Field(min_length=1, max_length=512)


class DonationSettings(BaseModel):
    enabled: bool = False
    title: str = Field(default="请我喝杯咖啡", min_length=1, max_length=40)
    image: str = ""


class AdSettings(BaseModel):
    enabled: bool = False
    label: str = Field(default="发现更多好东西", min_length=1, max_length=60)
    image: str = ""
    link: str = Field(default="", max_length=2000)


class SiteSettings(BaseModel):
    disabled_features: list[str] = Field(default_factory=list)
    donation: DonationSettings
    ads: AdSettings
    revision: int = Field(ge=0)


@router.get("/", response_class=HTMLResponse)
@router.get("/admin", response_class=HTMLResponse)
async def admin_page(request: Request):
    if not session(request):
        return RedirectResponse("/login", status_code=303)
    features = [{**feature, "availability": feature_availability(feature)} for feature in FEATURES.values()]
    return templates.TemplateResponse("admin.html", {
        "request": request, "features": features, "settings": get_settings(),
        "csrf": session(request)["csrf"], "asset_version": ASSET_VERSION,
    })


@router.get("/login", response_class=HTMLResponse)
async def login_page(request: Request):
    if session(request):
        return RedirectResponse("/", status_code=303)
    return templates.TemplateResponse("admin-login.html", {"request": request, "asset_version": ASSET_VERSION})


@router.post("/api/login")
async def login(request: Request, payload: LoginRequest):
    origin = request.headers.get("origin")
    if origin and origin != str(request.base_url).rstrip("/"):
        raise HTTPException(403, "登录来源不匹配")
    check_login_rate(request.client.host if request.client else "unknown")
    valid = await run_in_threadpool(verify_password, request.app.state.credentials, payload.password)
    if not valid:
        raise HTTPException(401, "密码不正确")
    response = RedirectResponse("/", status_code=303)
    response.set_cookie(COOKIE_NAME, serializer(request).dumps({"csrf": secrets.token_urlsafe(32)}),
                        max_age=28800, httponly=True, samesite="strict",
                        secure=request.url.scheme == "https")
    return response


@router.post("/api/logout", dependencies=[Depends(require_admin)])
async def logout():
    response = RedirectResponse("/login", status_code=303)
    response.delete_cookie(COOKIE_NAME)
    return response


@router.get("/api/settings", dependencies=[Depends(require_admin)])
async def read_settings():
    return get_settings()


def validate_image_path(value: str):
    if value and (not re.fullmatch(r"/media/[a-f0-9]{32}\.png", value) or not (UPLOAD_DIR / value.split("/")[-1]).is_file()):
        raise HTTPException(422, "图片不存在，请重新上传")


@router.put("/api/settings", dependencies=[Depends(require_admin)])
async def update_settings(payload: SiteSettings):
    value = payload.dict()
    if any(key not in FEATURES for key in payload.disabled_features):
        raise HTTPException(422, "工具标识不正确")
    for section in (value["donation"], value["ads"]):
        validate_image_path(section["image"])
        if section["enabled"] and not section["image"]:
            raise HTTPException(422, "开启展示前请先上传图片")
    if payload.ads.link:
        try:
            parsed = urlparse(payload.ads.link)
        except ValueError as exc:
            raise HTTPException(422, "广告链接格式不正确") from exc
        if parsed.scheme not in {"https", "http"} or not parsed.hostname or parsed.username or parsed.password:
            raise HTTPException(422, "广告链接必须为有效的 HTTP 或 HTTPS 地址")
    if payload.ads.enabled and not payload.ads.link:
        raise HTTPException(422, "开启广告前请填写跳转链接")
    try:
        return await run_in_threadpool(save_settings, value)
    except ValueError as exc:
        raise HTTPException(409, str(exc)) from exc


def store_image(content: bytes):
    try:
        with Image.open(io.BytesIO(content)) as source:
            if source.format not in {"PNG", "JPEG", "WEBP"} or source.width * source.height > 16000000:
                raise ValueError("图片尺寸或格式不正确")
            source.load()
            cleaned = source.convert("RGBA")
            UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
            filename = secrets.token_hex(16) + ".png"
            cleaned.save(UPLOAD_DIR / filename, format="PNG")
            return {"image": f"/media/{filename}"}
    except (UnidentifiedImageError, OSError, ValueError, Image.DecompressionBombError) as exc:
        raise HTTPException(422, "请使用 1600 万像素以内的有效 PNG、JPG 或 WebP 图片") from exc


@router.post("/api/upload", dependencies=[Depends(require_admin)])
async def upload_image(request: Request):
    # 限制流式读取总量并重新编码，避免上传的脚本作为静态内容发布。
    content = bytearray()
    async for chunk in request.stream():
        content.extend(chunk)
        if len(content) > 5 * 1024 * 1024:
            raise HTTPException(413, "图片不能超过 5 MB")
    return await run_in_threadpool(store_image, bytes(content))
