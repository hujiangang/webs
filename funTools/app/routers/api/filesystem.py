from fastapi import APIRouter, HTTPException, Response
from starlette.concurrency import run_in_threadpool

from app.services.filesystem import build_image_thumbnail, list_directories, select_directory


router = APIRouter(tags=["filesystem"])


@router.get("/filesystem/directories")
async def filesystem_directories(path: str | None = None):
    try:
        return await run_in_threadpool(list_directories, path)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except OSError as exc:
        raise HTTPException(status_code=400, detail=f"无法读取文件夹：{exc}") from exc

@router.get("/filesystem/thumbnail")
async def filesystem_thumbnail(path: str, size: int = 96):
    try:
        content, media_type = await run_in_threadpool(build_image_thumbnail, path, size)
        return Response(content=content, media_type=media_type)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except OSError as exc:
        raise HTTPException(status_code=400, detail=f"无法读取图片：{exc}") from exc

@router.get("/filesystem/select-directory")
async def filesystem_select_directory(initial_dir: str | None = None, title: str = "选择文件夹"):
    try:
        return {"path": await run_in_threadpool(select_directory, initial_dir, title)}
    except RuntimeError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except OSError as exc:
        raise HTTPException(status_code=400, detail=f"无法打开文件夹选择框：{exc}") from exc
