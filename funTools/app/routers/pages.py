from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates


router = APIRouter()
templates = Jinja2Templates(directory="templates")


FEATURES = {
    "remove_watermark": {
        "path": "/",
        "index": "1",
        "title": "图片去水印",
        "description": "上传图片后，按住鼠标左键拖动标记需要擦除的区域，释放鼠标后由后端模型处理。",
        "view": "watermark_mask",
        "input_items": ["原图上传位", "遮罩绘制位"],
        "output_items": ["结果预览位", "下载位"],
    },
    "pdf_to_word": {
        "path": "/pdf-to-word",
        "index": "2",
        "title": "PDF 转 Word",
        "description": "当前只增加功能入口和页面占位，PDF 转 Word 的具体处理逻辑暂未接入。",
        "view": "placeholder",
        "input_items": ["PDF 上传位", "转换参数位"],
        "output_items": ["Word 文件预览位", "下载位"],
    },
}


def render_feature(request: Request, feature_key: str):
    # 页面模板共用，新增功能只补充页面数据。
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "features": FEATURES.values(),
            "active_feature": FEATURES[feature_key],
            "asset_version": "20260723_erase_flow_4",
        },
    )


@router.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return render_feature(request, "remove_watermark")


@router.get("/pdf-to-word", response_class=HTMLResponse)
async def pdf_to_word(request: Request):
    return render_feature(request, "pdf_to_word")
