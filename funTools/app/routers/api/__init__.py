from fastapi import APIRouter

from .image import router as image_router


router = APIRouter(prefix="/api", tags=["api"])

# 这里按业务大类汇总子路由，后续新增 document、task 等分类时继续往这里挂。
router.include_router(image_router)
