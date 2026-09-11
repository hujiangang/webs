import ipaddress
import os
from urllib.parse import urlparse

from starlette.concurrency import run_in_threadpool
from starlette.responses import JSONResponse

from app.features import feature_enabled
from app.services.settings import get_settings


API_FEATURES = {
    "/api/remove-watermark": "remove_watermark",
    "/api/image-rename": "image_similarity_rename",
    "/api/image-resize": "image_batch_resize",
    "/api/public-ip": "public_ip",
    "/api/qr": "qr_generator",
    "/api/hash": "hash_generator",
}


class SiteGuardMiddleware:
    def __init__(self, app, admin=False):
        self.app = app
        self.admin = admin

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            return await self.app(scope, receive, send)
        path = scope["path"]
        headers = dict(scope["headers"])
        limit = 6 * 1024 * 1024 if self.admin else 24 * 1024 * 1024
        try:
            declared = int(headers.get(b"content-length", b"0"))
        except ValueError:
            return await JSONResponse({"detail": "请求长度不正确"}, 400)(scope, receive, send)
        if declared > limit:
            return await JSONResponse({"detail": "上传内容过大"}, 413)(scope, receive, send)
        settings = None
        if not self.admin and not path.startswith(("/static/", "/media/")):
            settings = await run_in_threadpool(get_settings)
            scope.setdefault("state", {})["settings"] = settings
            key = next((key for prefix, key in API_FEATURES.items() if path == prefix or path.startswith(prefix + "/")), None)
            if key and not feature_enabled(key, settings):
                return await JSONResponse({"detail": "工具已下架或当前不可用"}, 404)(scope, receive, send)
            if path.startswith(("/api/filesystem", "/api/image-rename", "/api/image-resize")):
                try:
                    loopback = ipaddress.ip_address(scope["client"][0]).is_loopback
                except (ValueError, TypeError):
                    loopback = False
                if os.environ.get("FUNTOOLS_LOCAL_MODE") != "1" or not loopback:
                    return await JSONResponse({"detail": "文件夹工具仅在本机模式开放"}, 403)(scope, receive, send)
                origin = headers.get(b"origin")
                host = headers.get(b"host", b"")
                expected = scope["scheme"].encode() + b"://" + host
                hostname = urlparse("//" + host.decode()).hostname
                if hostname not in {"127.0.0.1", "localhost", "::1"}:
                    return await JSONResponse({"detail": "本机模式仅允许本机地址访问"}, 403)(scope, receive, send)
                same_origin_thumbnail = path == "/api/filesystem/thumbnail" and headers.get(b"sec-fetch-site") == b"same-origin"
                if (headers.get(b"x-funtools-local") != b"1" and not same_origin_thumbnail) or (origin and origin != expected):
                    return await JSONResponse({"detail": "本机请求校验失败"}, 403)(scope, receive, send)
        received = 0

        async def limited_receive():
            nonlocal received
            message = await receive()
            received += len(message.get("body", b""))
            if received > limit:
                from starlette.exceptions import HTTPException
                raise HTTPException(413, "上传内容过大")
            return message

        async def secure_send(message):
            if message["type"] == "http.response.start":
                response_headers = list(message.get("headers", []))
                response_headers.extend([
                    (b"x-content-type-options", b"nosniff"),
                    (b"x-frame-options", b"DENY"),
                    (b"referrer-policy", b"strict-origin-when-cross-origin"),
                    (b"content-security-policy", b"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self' https://api.ipify.org https://api64.ipify.org; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'"),
                ])
                if self.admin or not path.startswith(("/static/", "/media/")):
                    response_headers.append((b"cache-control", b"no-store"))
                elif path.startswith("/static/"):
                    # 子模块也需校验缓存，防止新页面混用旧版样式和脚本。
                    response_headers.append((b"cache-control", b"no-cache"))
                message["headers"] = response_headers
            await send(message)

        await self.app(scope, limited_receive, secure_send)
