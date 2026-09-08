import argparse
import socket
import sys

from fastapi import FastAPI
from starlette.exceptions import HTTPException as StarletteHTTPException
from mushroom_app.routers import router, public_error_handler
from mushroom_app.web_assets import mount_assets, value_error_handler


def create_app() -> FastAPI:
    app = FastAPI(title="菌野 · 中国野生菌探索指南", docs_url=None, redoc_url=None)
    mount_assets(app)
    app.add_exception_handler(ValueError, value_error_handler)
    app.add_exception_handler(StarletteHTTPException, public_error_handler)
    app.include_router(router)
    return app


app = create_app()


def is_port_in_use(host: str, port: int) -> bool:
    # 先检查端口是否被占用，启动失败时给出明确提示。
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(0.2)
        return sock.connect_ex((host, port)) == 0


def main() -> None:
    parser = argparse.ArgumentParser(description="启动菌野网站")
    parser.add_argument("--host", default="192.168.1.11", help="监听地址")
    parser.add_argument("--port", type=int, default=8000, help="监听端口")
    args = parser.parse_args()

    host = args.host
    port = args.port

    if is_port_in_use(host, port):
        for candidate in range(port + 1, port + 11):
            if not is_port_in_use(host, candidate):
                print(f"端口 {port} 已被占用，已自动切换到 {candidate}", flush=True)
                port = candidate
                break
        else:
            print(
                f"端口 {port} 已被占用，且未找到可用备用端口。"
                f"请关闭占用程序后重试，或执行：python main.py --port {port + 1}",
                file=sys.stderr,
                flush=True,
            )
            raise SystemExit(1)

    print(f"菌野网站已启动：http://{host}:{port}/", flush=True)

    import uvicorn

    try:
        uvicorn.run(app, host=host, port=port, reload=False)
    except OSError as exc:
        print(f"启动失败：{exc}", file=sys.stderr, flush=True)
        raise


if __name__ == "__main__":
    main()
