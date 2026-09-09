import os


ASSET_VERSION = "20260909_workspace_v2"


FEATURES = {
    "remove_watermark": {
        "path": "/remove-watermark",
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
    "image_similarity_rename": {
        "path": "/image-similarity-rename",
        "index": "4",
        "title": "图片相似命名",
        "description": "按图片内容相似度，把源文件夹中的图片重命名为参考文件夹中最相似图片的名称。",
        "view": "image_similarity_rename",
        "template": "features/image-rename.html",
        "main_class": "",
        "workspace_class": "image-rename-workspace",
        "status_text": "先分析匹配结果，确认后再批量重命名",
        "input_items": ["源文件夹", "参考文件夹"],
        "output_items": ["匹配预览", "确认重命名"],
    },
    "image_batch_resize": {
        "path": "/image-batch-resize",
        "index": "5",
        "title": "批量修改图片尺寸",
        "description": "批量调整源文件夹图片尺寸，按选定格式保存到另一个输出文件夹。",
        "view": "image_batch_resize",
        "template": "features/image-resize.html",
        "main_class": "",
        "workspace_class": "image-resize-workspace",
        "status_text": "选择源文件夹和输出文件夹，设置尺寸后开始处理",
        "input_items": ["源文件夹", "尺寸参数", "输出格式"],
        "output_items": ["输出文件夹", "处理日志"],
    },
}

# 首页按大模块展示，页面路由仍然复用现有功能模板。
EXTRA_FEATURES = [
    ("image_compress", "图片压缩", "在保证清晰度的前提下快速压缩 JPG、PNG、WebP", "图片工具", "◉"),
    ("image_convert", "图片格式转换", "JPG、PNG、WebP 本地转换", "图片工具", "◌"),
    ("image_crop", "图片裁剪", "按像素精确裁剪自定义图片区域", "图片工具", "⌗"),
    ("image_watermark", "图片加水印", "为图片添加可调节的文字水印", "图片工具", "✦"),
    ("image_to_base64", "图片转 Base64", "生成可直接用于网页的 Base64 数据", "开发工具", "{}"),
    ("json_formatter", "JSON 格式化", "格式化、压缩并校验 JSON 数据", "开发工具", "{}"),
    ("url_encoder", "URL 编解码", "安全处理 URL 参数与中文字符", "开发工具", "↗"),
    ("hash_generator", "哈希计算", "计算文本的 MD5、SHA-1、SHA-256 摘要", "开发工具", "#"),
    ("uuid_generator", "UUID 生成器", "批量生成随机 UUID", "开发工具", "◇"),
    ("timestamp_converter", "时间戳转换", "时间戳与日期时间互转", "效率工具", "◷"),
    ("qr_generator", "二维码生成", "把文本、链接生成二维码图片", "效率工具", "▦"),
    ("password_generator", "密码生成", "生成高强度随机密码", "效率工具", "⌁"),
    ("text_diff", "文本对比", "快速找出两段文本的差异", "效率工具", "≋"),
    ("color_picker", "颜色转换", "HEX、RGB、HSL 颜色值互转", "设计工具", "◈"),
    ("public_ip", "我的公网 IP", "查看当前网络出口 IP 地址", "网络工具", "◎"),
]

for offset, (key, title, description, category, icon) in enumerate(EXTRA_FEATURES, start=6):
    FEATURES[key] = {
        "path": f"/tools/{key}", "index": str(offset), "title": title,
        "description": description, "view": "tool", "template": "features/tool.html",
        "main_class": "", "workspace_class": "", "status_text": "准备就绪",
        "input_items": ["输入内容", "处理参数"], "output_items": ["处理结果", "复制或下载"],
        "category": category, "icon": icon, "featured": key in {"image_compress", "json_formatter", "public_ip", "qr_generator"},
    }

for feature in FEATURES.values():
    feature.setdefault("category", "图片工具")
    feature.setdefault("icon", "✦")
    feature.setdefault("featured", False)

for key, feature in FEATURES.items():
    feature.setdefault("key", key)

FEATURES["pdf_to_word"].update(category="文档工具", ready=False, icon="▤")
FEATURES["video_frame_capture"].update(category="音视频工具", icon="▷")
FEATURES["remove_watermark"].update(icon="✦", featured=True)
FEATURES["image_similarity_rename"].update(local_only=True, icon="≋")
FEATURES["image_batch_resize"].update(local_only=True, icon="⌗")
CATEGORIES = ["全部", "图片工具", "开发工具", "效率工具", "设计工具", "网络工具", "音视频工具", "文档工具"]


def feature_availability(feature):
    if not feature.get("ready", True):
        return "待接入"
    if feature.get("local_only") and os.environ.get("FUNTOOLS_LOCAL_MODE") != "1":
        return "仅本机模式"
    return ""


def feature_enabled(key, settings):
    return key in FEATURES and key not in settings["disabled_features"] and not feature_availability(FEATURES[key])
