ASSET_VERSION = "20260729_template_modules"


FEATURES = {
    "remove_watermark": {
        "path": "/",
        "index": "1",
        "title": "图片去水印",
        "description": "上传图片后，按住鼠标左键拖动标记需要擦除的区域，释放鼠标后由后端模型处理。",
        "view": "watermark_mask",
        "template": "features/watermark.html",
        "main_class": "canvas-main",
        "workspace_class": "watermark-workspace",
        "status_text": "上传图片后拖动擦除区域，释放鼠标开始处理",
        "input_items": ["原图上传位", "遮罩绘制位"],
        "output_items": ["结果预览位", "下载位"],
    },
    "pdf_to_word": {
        "path": "/pdf-to-word",
        "index": "2",
        "title": "PDF 转 Word",
        "description": "当前只增加功能入口和页面占位，PDF 转 Word 的具体处理逻辑暂未接入。",
        "view": "placeholder",
        "template": "features/placeholder.html",
        "main_class": "",
        "workspace_class": "",
        "status_text": "处理逻辑暂未接入，结构已预留",
        "input_items": ["PDF 上传位", "转换参数位"],
        "output_items": ["Word 文件预览位", "下载位"],
    },
    "video_frame_capture": {
        "path": "/video-frame-capture",
        "index": "3",
        "title": "视频帧截取",
        "description": "上传视频，播放或拖动到目标画面后截取当前帧并下载图片。",
        "view": "video_frame_capture",
        "template": "features/video-frame.html",
        "main_class": "video-main",
        "workspace_class": "video-frame-workspace",
        "status_text": "上传视频，停在目标画面后截取当前帧",
        "input_items": ["视频上传位", "播放定位位"],
        "output_items": ["截图预览位", "下载位"],
    },
}