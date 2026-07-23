# funTools

一个基于 FastAPI 的 Web 骨架项目，当前已经整理好基础结构：

- 左侧可伸缩导航栏
- 右侧功能区
- 路由分层
- 静态资源分离
- 启动入口收敛到 `main.py`

已预留功能：

- 图片去水印：已接入本地 LaMa 模型
- PDF 转 Word

## 目录结构

- `main.py`：应用组装、静态目录挂载、启动入口
- `app/routers/pages.py`：页面路由
- `app/routers/api/`：接口路由包，按业务大类拆分
  - `image.py`：图片类接口
  - `__init__.py`：接口总入口
- `app/services/watermark.py`：图片去水印模型加载和处理逻辑
- `models/remove_watermark/lama/`：图片去水印模型目录
- `scripts/download_remove_watermark_model.bat`：Windows 双击下载图片去水印模型
- `scripts/download_remove_watermark_model.py`：图片去水印模型下载脚本
- `templates/index.html`：页面模板
- `static/css/app.css`：页面样式
- `static/js/app.js`：页面交互脚本
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

如果你看到端口占用提示，说明 `8000` 正在被别的程序使用。此时可以直接按启动日志里的备用端口访问。

## 说明

- 图片去水印会在鼠标释放后调用本项目后端接口处理
- 当前页面只保留结构，不执行 PDF 转 Word 处理
- 后续新增功能时，建议继续按“页面路由、接口路由、静态资源、模板”分层扩展
