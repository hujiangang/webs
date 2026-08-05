# funTools

一个基于 FastAPI 的 Web 骨架项目，当前已经整理好基础结构：

- 左侧可伸缩导航栏
- 右侧功能区
- 路由分层
- 静态资源分离
- 启动入口收敛到 `main.py`

已支持和预留功能：

- 图片去水印：已接入本地 LaMa 模型
- 视频帧截取：浏览器本地截取当前视频帧并下载 PNG
- 图片相似命名：根据参考文件夹中的相似图片名称，批量重命名源文件夹图片
- PDF 转 Word：功能入口已预留，处理逻辑暂未接入
## 目录结构

- `main.py`：应用组装、静态目录挂载、启动入口
- `app/features.py`：功能清单、导航元数据、页面模板路径和静态资源版本号
- `app/routers/pages.py`：页面路由，只负责把指定功能渲染到模板
- `app/routers/api/`：接口路由包，按业务大类拆分
  - `image.py`：图片类接口，例如去水印、图片相似命名、批量修改图片尺寸
  - `filesystem.py`：文件系统接口，例如系统文件夹选择框、缩略图读取
  - `__init__.py`：接口总入口
- `app/services/`：后端业务服务
  - `watermark.py`：图片去水印模型加载和处理逻辑
  - `image_similarity_rename.py`：图片相似度计算、匹配预览和重命名执行
  - `filesystem.py`：本机文件夹列表读取
- `templates/index.html`：页面壳，只负责引入布局片段和静态资源
- `templates/partials/`：通用页面片段
  - `topbar.html`：顶部栏
  - `sidebar.html`：左侧导航
  - `main.html`：右侧功能承载区
- `templates/features/`：按功能拆分的页面片段
  - `watermark.html`：图片去水印页面
  - `video-frame.html`：视频帧截取页面
  - `image-rename.html`：图片相似命名页面
  - `placeholder.html`：暂未接入处理逻辑的占位页面
- `static/css/app.css`：样式入口，只通过 `@import` 聚合样式模块
- `static/css/base.css`：全局变量和基础样式
- `static/css/layout.css`：顶栏、侧栏、主内容区等通用布局
- `static/css/placeholder.css`：占位功能页面样式
- `static/css/features/`：按功能拆分的样式文件，例如 `watermark.css`、`video-frame.css`、`image-rename.css`、`image-resize.css`
- `static/js/app.js`：前端入口，只负责初始化各模块
- `static/js/layout/`：布局交互模块，例如侧栏显示隐藏
- `static/js/shared/`：跨功能共享的小工具，例如状态栏、文件读取
- `static/js/features/`：按功能拆分的交互模块，例如 `watermark.js`、`video-frame.js`、`image-rename.js`、`image-resize.js`
- `models/remove_watermark/lama/`：图片去水印模型目录
- `scripts/download_remove_watermark_model.bat`：Windows 双击下载图片去水印模型
- `scripts/download_remove_watermark_model.py`：图片去水印模型下载脚本
- `requirements.txt`：Python 依赖
## 环境要求

- Python 3.11 或更高版本

## 安装依赖

建议先创建虚拟环境，再安装依赖。

Windows：

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Linux 或 macOS：

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## 图片去水印模型

图片去水印使用 `IOPaint` 内置的 LaMa 模型，运行在本项目 FastAPI 后端中，不需要单独启动 `iopaint start`。

模型文件按功能放在本工程目录：

```text
models/remove_watermark/lama/big-lama.pt
```

Windows 下可以双击执行：

```text
scripts/download_remove_watermark_model.bat
```

也可以用命令执行：

```bash
python scripts/download_remove_watermark_model.py
```

首次处理图片时，如果项目模型目录没有 LaMa 模型，后端也会自动下载到上述目录。默认使用 CPU 推理，首次下载和首次加载模型会慢一些。

## Python 包说明

项目里多个 `__init__.py` 的作用很简单：

- 让对应目录被 Python 识别为包，可以被 `import`。
- 让上层入口更清晰，例如 `app.routers.api` 现在是一个包，里面再按 `image`、`document` 之类的大类继续拆分。
- 文件本身不一定要写代码，很多时候只放一段很短的说明或者保持为空就够了。

简单说，`__init__.py` 不是“多余文件”，它是把目录变成包的标记，也是包级入口的常用位置。

## 启动项目

方式一，直接运行入口文件：

```bash
python main.py
```

方式二，用 Uvicorn 启动：

```bash
uvicorn main:app --host 127.0.0.1 --port 8000
```

方式三，直接运行入口并指定端口：

```bash
python main.py --port 8001
```

启动后访问：

```text
http://127.0.0.1:8000/
```

功能入口：

```text
http://127.0.0.1:8000/                  图片去水印
http://127.0.0.1:8000/video-frame-capture 视频帧截取
http://127.0.0.1:8000/pdf-to-word        PDF 转 Word
```

如果你看到端口占用提示，说明 `8000` 正在被别的程序使用。此时可以直接按启动日志里的备用端口访问。

## 说明

- 图片去水印会在鼠标释放后调用本项目后端接口处理
- 视频帧截取在浏览器端完成，不需要额外后端接口；上传视频后，停在目标画面点击“截取当前帧”，再点击“下载截图”即可
- 当前页面只保留结构，不执行 PDF 转 Word 处理
- 后续新增功能时，建议继续按“功能配置、页面路由、接口路由、服务、JS 功能模块、CSS 功能模块、模板”分层扩展
