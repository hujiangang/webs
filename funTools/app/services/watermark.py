import base64
import binascii
import hashlib
import logging
import os
import threading
import urllib.request
import warnings
from pathlib import Path

from fastapi import HTTPException


warnings.filterwarnings("ignore", category=FutureWarning)
logger = logging.getLogger(__name__)
MODEL_NAME = "lama"
MODEL_DEVICE = "cpu"
LAMA_MODEL_URL = "https://github.com/Sanster/models/releases/download/add_big_lama/big-lama.pt"
LAMA_MODEL_MD5 = "e3aa4aaa15225a33ec84f9f4bc47e500"
PROJECT_ROOT = Path(__file__).resolve().parents[2]
PROJECT_LAMA_MODEL_PATH = PROJECT_ROOT / "models" / "remove_watermark" / "lama" / "big-lama.pt"

_model_manager = None
_model_lock = threading.Lock()


def normalize_base64(value: str) -> str:
    # 前端可能传入 data URL，这里统一转成纯 base64。
    data = value.split(",", 1)[1] if "," in value else value
    data = data.strip()
    if not data:
        raise HTTPException(status_code=400, detail="图片或遮罩不能为空")
    try:
        base64.b64decode(data, validate=True)
    except (ValueError, binascii.Error) as exc:
        raise HTTPException(status_code=400, detail="图片或遮罩格式不正确") from exc
    return data


def file_md5(path: Path) -> str:
    md5 = hashlib.md5()
    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b""):
            md5.update(chunk)
    return md5.hexdigest()


def ensure_project_lama_model() -> Path:
    PROJECT_LAMA_MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    if PROJECT_LAMA_MODEL_PATH.exists():
        if file_md5(PROJECT_LAMA_MODEL_PATH) == LAMA_MODEL_MD5:
            return PROJECT_LAMA_MODEL_PATH
        PROJECT_LAMA_MODEL_PATH.unlink()

    temp_path = PROJECT_LAMA_MODEL_PATH.with_suffix(".pt.part")
    if temp_path.exists():
        temp_path.unlink()

    try:
        urllib.request.urlretrieve(LAMA_MODEL_URL, temp_path)
    except Exception as exc:
        if temp_path.exists():
            temp_path.unlink()
        logger.error("LaMa 模型下载失败：%s", exc)
        raise HTTPException(status_code=500, detail=f"LaMa 模型下载失败：{exc}") from exc

    if file_md5(temp_path) != LAMA_MODEL_MD5:
        temp_path.unlink()
        logger.error("LaMa 模型校验失败")
        raise HTTPException(status_code=500, detail="LaMa 模型校验失败")

    temp_path.replace(PROJECT_LAMA_MODEL_PATH)
    return PROJECT_LAMA_MODEL_PATH


def get_model_manager():
    global _model_manager
    if _model_manager is not None:
        return _model_manager

    with _model_lock:
        if _model_manager is not None:
            return _model_manager

        try:
            # 屏蔽第三方依赖的普通输出，本项目只保留中文错误日志。
            warnings.filterwarnings("ignore", category=FutureWarning)
            model_path = ensure_project_lama_model()
            os.environ["LAMA_MODEL_URL"] = str(model_path)
            os.environ["LAMA_MODEL_MD5"] = LAMA_MODEL_MD5
            from loguru import logger as iopaint_logger
            import torch
            iopaint_logger.disable("iopaint")
            from iopaint.model_manager import ModelManager
        except ImportError as exc:
            raise HTTPException(
                status_code=500,
                detail="图片去水印依赖未安装，请先执行 pip install -r requirements.txt",
            ) from exc

        try:
            _model_manager = ModelManager(name=MODEL_NAME, device=torch.device(MODEL_DEVICE))
        except SystemExit as exc:
            logger.error("LaMa 模型下载或加载失败")
            raise HTTPException(status_code=500, detail="LaMa 模型下载或加载失败") from exc
        except Exception as exc:
            logger.error("LaMa 模型初始化失败：%s", exc)
            raise HTTPException(status_code=500, detail=f"LaMa 模型初始化失败：{exc}") from exc

        return _model_manager


def remove_watermark_image(image_base64: str, mask_base64: str) -> tuple[bytes, str]:
    try:
        import cv2
        import numpy as np
        from PIL import Image
        from iopaint.helper import concat_alpha_channel, decode_base64_to_image, pil_to_bytes
        from iopaint.model.utils import torch_gc
        from iopaint.schema import InpaintRequest
    except ImportError as exc:
        raise HTTPException(
            status_code=500,
            detail="图片去水印依赖未安装，请先执行 pip install -r requirements.txt",
        ) from exc

    image, alpha_channel, infos, ext = decode_base64_to_image(image_base64)
    mask, _, _, _ = decode_base64_to_image(mask_base64, gray=True)
    mask = cv2.threshold(mask, 127, 255, cv2.THRESH_BINARY)[1]

    if image.shape[:2] != mask.shape[:2]:
        raise HTTPException(status_code=400, detail="图片和遮罩尺寸不一致")
    if not np.any(mask):
        raise HTTPException(status_code=400, detail="请先标记需要擦除的区域")

    try:
        # IOPaint 的 ModelManager 返回 BGR，需要转回 RGB 后输出。
        manager = get_model_manager()
        result = manager(image, mask, InpaintRequest())
        result = cv2.cvtColor(result.astype(np.uint8), cv2.COLOR_BGR2RGB)
        result = concat_alpha_channel(result, alpha_channel)
        torch_gc()
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("图片去水印处理失败：%s", exc)
        raise HTTPException(status_code=500, detail=f"图片去水印处理失败：{exc}") from exc

    if ext == "jpeg":
        ext = "jpg"
    result_bytes = pil_to_bytes(Image.fromarray(result), ext=ext, quality=95, infos=infos)
    return result_bytes, f"image/{ext}"
