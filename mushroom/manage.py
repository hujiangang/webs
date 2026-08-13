import argparse
import socket
import sys

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from mushroom_app.admin.routers import admin_router
from mushroom_app.config import IMAGE_DIR, IMAGE_EX_DIR, STATIC_DIR
from mushroom_app.routers import router


def create_admin_app() -> FastAPI:
    app = FastAPI(title="mushroom-admin")
    app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")
    app.mount("/image", StaticFiles(directory=str(IMAGE_DIR)), name="image")
    app.mount("/image_ex", StaticFiles(directory=str(IMAGE_EX_DIR)), name="image_ex")
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
    args = parser.parse_args()

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

    print(f"菌子管理端已启动：http://{host}:{port}/admin/mushrooms", flush=True)

    import uvicorn

    uvicorn.run(app, host=host, port=port, reload=False)


if __name__ == "__main__":
    main()
