from fastapi import APIRouter

from .filesystem import router as filesystem_router
from .image import router as image_router
from .network import router as network_router
from .utilities import router as utilities_router


router = APIRouter(prefix="/api", tags=["api"])

# 这里按业务大类汇总子路由，后续新增 document、task 等分类时继续往这里挂。
router.include_router(filesystem_router)
router.include_router(image_router)
router.include_router(network_router)
router.include_router(utilities_router)
