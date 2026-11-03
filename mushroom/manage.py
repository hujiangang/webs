import argparse
import getpass
import secrets
import socket
import sys

from fastapi import FastAPI

from mushroom_app.admin.routers import admin_router
from mushroom_app.routers import router
from mushroom_app.admin.auth import AdminAccessMiddleware
from mushroom_app.admin.access_routes import access_router
from mushroom_app.content.admin_routes import content_admin_router
from mushroom_app.web_assets import mount_assets, value_error_handler
from mushroom_app.admin.auth import reset_admin_password
from pydantic import ValidationError


def create_admin_app() -> FastAPI:
    app = FastAPI(title="菌野内容管理", docs_url=None, redoc_url=None, openapi_url=None)
    mount_assets(app)
    app.add_middleware(AdminAccessMiddleware)
    app.add_exception_handler(ValueError, value_error_handler)
    app.include_router(access_router)
    app.include_router(content_admin_router)
    app.include_router(admin_router)
    app.include_router(router)
    return app


app = create_admin_app()


def is_port_in_use(host: str, port: int) -> bool:
    # 管理端单独启动前检查端口，避免覆盖前台服务。
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(0.2)
        return sock.connect_ex((host, port)) == 0


def main() -> None:
    parser = argparse.ArgumentParser(description="启动菌子管理端")
    parser.add_argument("--host", default="127.0.0.1", help="监听地址")
    parser.add_argument("--port", type=int, default=8002, help="监听端口")
    parser.add_argument("--reset-password", action="store_true", help="在本机重置管理员密码，不启动服务")
    parser.add_argument("--generate-password", action="store_true", help="配合重置命令生成临时随机密码")
    args = parser.parse_args()

    if args.generate_password and not args.reset_password:
        parser.error("生成密码须同时指定 --reset-password")
    if args.reset_password:
        reset_password_from_console(args.generate_password)
        return

    host = args.host
    port = args.port
    if is_port_in_use(host, port):
        for candidate in range(port + 1, port + 11):
            if not is_port_in_use(host, candidate):
                print(f"管理端口 {port} 已被占用，已自动切换到 {candidate}", flush=True)
                port = candidate
                break
        else:
            print(
                f"管理端口 {port} 已被占用，且未找到可用备用端口。"
                f"请关闭占用程序后重试，或执行：python manage.py --port {port + 1}",
                file=sys.stderr,
                flush=True,
            )
            raise SystemExit(1)

    print(f"菌野管理端已启动：http://{host}:{port}/admin/content", flush=True)

    import uvicorn

    uvicorn.run(app, host=host, port=port, reload=False)


def reset_password_from_console(generate: bool = False) -> None:
    """本机维护入口不经网页提供，也不把密码放进命令行参数。"""
    if generate:
        password = secrets.token_urlsafe(18)
    else:
        password = getpass.getpass("请输入新管理员密码（12至128位）：")
        if password != getpass.getpass("请再次输入新密码："):
            print("两次输入不一致，原密码未修改。", file=sys.stderr)
            raise SystemExit(1)
    try:
        reset_admin_password(password)
    except ValidationError:
        print("密码必须为12至128位，原密码未修改。", file=sys.stderr)
        raise SystemExit(1)
    print("管理员密码已重置，旧登录会话已失效。")
    if generate:
        print("临时密码：" + password)
        print("登录后可在“修改密码”页面设置自己的密码。")


if __name__ == "__main__":
    main()
