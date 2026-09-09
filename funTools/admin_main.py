import argparse
import getpass
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.routers.admin import router
from app.services.admin_auth import load_credentials, set_password
from app.services.settings import PROJECT_ROOT, UPLOAD_DIR
from app.web import SiteGuardMiddleware


def create_app(credentials=None):
    @asynccontextmanager
    async def lifespan(application):
        application.state.credentials = credentials or load_credentials()
        yield

    application = FastAPI(title="funTools 管理站", lifespan=lifespan, docs_url=None, redoc_url=None, openapi_url=None)
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    application.mount("/static", StaticFiles(directory=PROJECT_ROOT / "static"), name="static")
    application.mount("/media", StaticFiles(directory=UPLOAD_DIR), name="media")
    application.add_middleware(SiteGuardMiddleware, admin=True)
    application.include_router(router)
    return application


app = create_app()


if __name__ == "__main__":
    import uvicorn

    parser = argparse.ArgumentParser(description="启动独立 funTools 管理站")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8001)
    parser.add_argument("--set-password", action="store_true", help="交互设置管理密码")
    args = parser.parse_args()
    if args.set_password:
        password = getpass.getpass("设置管理密码（至少 12 位）：")
        if password != getpass.getpass("再次输入密码："):
            raise SystemExit("两次密码不一致")
        try:
            set_password(password)
        except ValueError as exc:
            raise SystemExit(str(exc)) from exc
        print("管理密码已更新，请重启管理站。")
    else:
        uvicorn.run(app, host=args.host, port=args.port, proxy_headers=False)
