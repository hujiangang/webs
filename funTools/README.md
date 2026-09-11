# funTools

一个基于 FastAPI 的工具网站，提供分类卡片、常用收藏与独立管理站：

- 左侧可伸缩导航栏
- 右侧功能区
- 顶栏主题切换：保留默认薄荷深色，提供参考 VS Code 的深色、浅色和高对比度主题；选择保存在当前浏览器，刷新和切换工具后继续生效
- 路由分层
- 静态资源分离
- 启动入口收敛到 `main.py`

已支持和预留功能：

- 图片去水印：已接入本地 LaMa 模型
- 视频帧截取：浏览器本地截取当前视频帧并下载 PNG
- 图片相似命名：根据参考文件夹中的相似图片名称，批量重命名源文件夹图片
- PDF 转 Word：功能入口已预留，处理逻辑暂未接入
- 工具总览：按分类、搜索和浏览器本地“我的常用”展示全部工具
- 图片工具：图片压缩、格式转换、裁剪、文字水印、Base64
- 开发工具：JSON 格式化、URL 编解码、哈希计算、UUID
- 效率工具：时间戳转换、二维码、密码生成、文本对比、颜色转换
- 网络工具：浏览器端公网 IP 检测
- 独立管理站：工具上下架、打赏二维码、广告图片与链接配置
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
- `static/css/themes.css`：主题配色和组件适配
- `static/js/layout/theme.js`：首次绘制前恢复主题和保存用户选择
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

管理站需要单独启动（默认 `8001` 端口）：

```bash
python admin_main.py
```

管理站首次启动会在终端打印一次随机管理员密码。建议立即使用以下命令修改为自己的密码：

```bash
python admin_main.py --set-password
```

管理站登录地址为 `http://127.0.0.1:8001/login`。站点配置和上传图片保存在项目 `data/` 目录；该目录已加入 `.gitignore`。

文件夹类工具默认只允许本机模式。需要在本机使用时设置 `FUNTOOLS_LOCAL_MODE=1`，并由本机页面发起带校验头的请求；公开部署不会暴露服务器文件系统。

启动后访问：

```text
http://127.0.0.1:8000/
```

功能入口：

```text
http://127.0.0.1:8000/                  工具总览
http://127.0.0.1:8000/remove-watermark   图片去水印
http://127.0.0.1:8000/video-frame-capture 视频帧截取
http://127.0.0.1:8001/login              独立管理站登录
```

如果你看到端口占用提示，说明 `8000` 正在被别的程序使用。此时可以直接按启动日志里的备用端口访问。

## 说明

- 更新静态资源时，请同步修改 `app/features.py` 中的 `ASSET_VERSION` 和 `static/css/app.css` 内各个导入地址的版本号，避免浏览器将新页面与旧样式混用。静态资源使用 `no-cache`，允许缓存但要求使用前校验。
- 主题与资源更新回归检查：`python -m unittest discover -s tests`、`node --test tests/theme.test.cjs`。Python 检查使用 `httpx`（未安装时执行 `pip install httpx`）。

- 图片去水印会在鼠标释放后调用本项目后端接口处理
- 视频帧截取在浏览器端完成，不需要额外后端接口；上传视频后，停在目标画面点击“截取当前帧”，再点击“下载截图”即可
- 当前页面只保留结构，不执行 PDF 转 Word 处理
- 后续新增功能时，建议继续按“功能配置、页面路由、接口路由、服务、JS 功能模块、CSS 功能模块、模板”分层扩展

## 部署与运营

完整的工具清单、数据存储、反向代理、启动参数和已知限制见 [DEPLOYMENT.md](DEPLOYMENT.md)。
Windows 可以双击 `scripts/run_site.bat` 与 `scripts/run_admin.bat` 分别启动前台和管理站。
当前共有 20 项注册功能：默认公开 17 项（原有 2 项 + 新增 15 项），2 项文件夹工具仅本机模式展示，PDF 转 Word 待接入且不在公开目录展示。
