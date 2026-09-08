import mimetypes
from pathlib import Path

from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from mushroom_app.config import BANNER_DIR, GAMES_DIR, IMAGE_DIR, IMAGE_EX_DIR, STATIC_DIR, UPLOAD_DIR


class GameStaticFiles(StaticFiles):
    async def get_response(self, path, scope):
        response = await super().get_response(path, scope)
        suffix = Path(path).suffix
        if suffix in {'.gz', '.br'}:
            original = str(Path(path).with_suffix(''))
            response.headers['Content-Encoding'] = 'gzip' if suffix == '.gz' else 'br'
            response.headers['Content-Type'] = mimetypes.guess_type(original)[0] or 'application/octet-stream'
        if path.endswith('.wasm'):
            response.headers['Content-Type'] = 'application/wasm'
        return response


def mount_assets(app):
    for url, directory in (('static', STATIC_DIR), ('banner', BANNER_DIR), ('image', IMAGE_DIR), ('image_ex', IMAGE_EX_DIR), ('uploads', UPLOAD_DIR)):
        directory.mkdir(parents=True, exist_ok=True)
        app.mount(f'/{url}', StaticFiles(directory=str(directory)), name=url)
    GAMES_DIR.mkdir(parents=True, exist_ok=True)
    app.mount('/play', GameStaticFiles(directory=str(GAMES_DIR), html=True), name='play')


async def value_error_handler(request: Request, exception: ValueError):
    return JSONResponse({'detail': str(exception)}, status_code=400)
