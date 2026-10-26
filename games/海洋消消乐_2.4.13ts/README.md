# 海洋消消乐 / 菌子主题三消

Cocos Creator **2.4.13**、TypeScript 项目。当前主流程为 `LoadingScene → HomeScene → Match3 → HomeScene`。主页为三个页面，酒店、海岛经营及旧地图引导已退役。

## 先看哪里

| 目的 | 入口 |
| --- | --- |
| 理解框架、业务职责和调用关系 | [项目架构](docs/project-architecture.md) |
| 了解本次修改和实际验收范围 | [整理与验收记录](docs/reorganization-validation.md) |
| 三页主页范围、基础菌子与特殊元素分工 | [菌子主题方向](docs/mushroom-direction.md) |
| 特殊元素造型与程序消除效果 | [特殊元素设计](docs/special-elements-design.md) |
| 查旧文件搬到了哪里 | [源码迁移清单](docs/source-migration.json) |
| 修改关卡 | [关卡 JSON 说明](docs/level-config-json-guide.md) |
| 修改棋盘皮肤 | [换皮配置说明](docs/match3-skin-config-guide.md) |
| 修改棋子和障碍资源 | [元素资源配置说明](docs/match3-res-config-guide.md) |
| 查看山林配乐、反馈音与处理参数 | [音乐与音效](docs/audio/woodland-v1/README.md) |

## 代码目录

```text
assets/Script/
├─ Application/       启动、管理器组装、应用开关
├─ Framework/         事件、对象池、网络传输、缓存监测、工具和通用组件
├─ Game/              三页主页、三消、数据、配置、平台接入和业务 UI
├─ ThirdParty/        TweenMax 等第三方脚本
└─ Debug/             测试场景脚本、特殊元素验收关
```

框架层只能依赖框架或第三方代码。带有关卡、货币、任务、登录、业务弹窗含义的代码放在 `Game`。`Application/M.ts` 是当前业务代码共享的管理器入口。

## 运行与检查

1. 使用 **Cocos Creator 2.4.13** 打开本目录，不要用 Creator 3.x 升级项目。
2. 等待资源导入完成，打开 `assets/Scene/LoadingScene.fire`，点击预览。
3. 加载后进入中间的“游戏”页；左右为金币商店、菌子图鉴。“开始”进入当前关卡，已解锁的关卡支持重玩。浏览器调试环境可在右上角菜单打开“开发验收”，提供六种单体、十五种组合和胜负结算测试；“连消预览”可查看四档新字稿与声音。微信环境隐藏开发入口。

维护工具需要 Node.js 和 npm；本次验证使用 Node.js 24.11.1、TypeScript 4.9.5。

```powershell
npm ci
npm run check
npm run build:preview
```

`check` 包含完整 TypeScript 检查、框架依赖检查、迁移 UUID 检查、场景脚本绑定检查、退役美术引用检查和 49 项回归测试。

构建脚本优先使用环境变量 `COCOS_CREATOR_PATH`，本机默认路径为 `D:\CocosEditors\Creator\2.4.13\CocosCreator.exe`。其他电脑可指定：

```powershell
$env:COCOS_CREATOR_PATH = '你的安装目录\CocosCreator.exe'
npm run build:preview
```

输出为 `build/web-mobile/`，日志为 `temp/build-preview.log`。通过 HTTP 服务打开构建结果：

```powershell
python -m http.server 8768 --bind 127.0.0.1 --directory build/web-mobile
```

访问 [实际游戏预览](http://127.0.0.1:8768/)。游戏按竖屏设计。Creator 本轮本地预览使用 `http://localhost:7457/`；端口可能随编辑器实例改变，以编辑器实际打开的地址为准。构建版与编辑器预览属于不同入口，具体交互验证范围见 [验收记录](docs/reorganization-validation.md)。

## 资源与版本管理

- `assets/resources/`：通过资源路径动态加载的 JSON、图片、预制体等。
- `assets/res/`：编辑器引用的美术、预制体等；部分仍被动态资源间接引用。
- 退役代码与专用场景／预制体见 `docs/retired-hotel-island.json`，删除前的工作状态备份为 `temp/mushroom-scope-before.zip`。
- 特殊元素已换成双箭头、爆破弹、流星球和彩虹球。退役旧美术清单见 `docs/retired-special-art.json`，备份为 `temp/retired-special-art.zip`；共享资源继续保留。
- 脚本移动必须同时移动同名 `.meta`，保持 UUID。资源路径和序列化字段不能只凭代码搜索随意更名。
- `library/`、`local/`、`temp/`、`build/` 是生成或本机文件。本仓库此前跟踪了部分缓存；新增 `.gitignore` 不会自动取消已跟踪文件。
- 本次整理前的源码与文档备份：`temp/reorganization-before.zip`。修改前逐文件验证了备份 SHA-256；用户原有资源表未改动。

2026-10-26 的 **catalog-v2 商店／图鉴调整**已接入：按作者反馈移除商店木框展柜，改为一块浅色底面上的四行道具列表，每行依次显示原道具图、名称与库存、金币按钮。商店和图鉴移除顶部重复标题，由底部页签标识页面；图鉴继续使用展开书，整体上移 46 个设计单位。原价格、购买流程、菌子原图和资料详情沿用。

上一轮 catalog-v1 的金边深绿加载槽、较大局内道具栏和金色购买弹窗继续使用。展开书 `journal-book.png` 保留在 `assets/resources/texture/mountain-ui/`；木框 `shop-display.png` 及其 `.meta` 已移至 `docs/art-preview/catalog-v1/retired-assets/`，退出运行时加载。原生成提示词、来源与当前资源状态见 [catalog-v1 素材记录](docs/art-preview/catalog-v1/generation-record.json)。本轮未新增生成图片。

**home-v4 游戏主页继续保留**：使用林间近景背景，把当前关卡和琥珀金“开始游戏”按钮合为一组石质关卡牌；相邻关卡使用较小的石牌与短踏石路径。顶栏与底栏减薄，底部商店／游戏／图鉴使用一组独立绘制的图标。当前关加一的锁定边界、弹性回弹、商店购买和图鉴资料入口沿用原有逻辑。实现与资源说明见 [美术方案](docs/art-style-redesign.md)，各版本的构建和浏览器验收范围以 [验收记录](docs/reorganization-validation.md) 为准。

主页专用四张素材位于 `assets/resources/texture/home-v4/`，由 `assets/Script/Game/Home/HomeArt.ts` 加载，并由 `HomeScene.ts` 组合成可交互界面。原 PNG 原样保留，透明留白和导航图标通过引擎的 `SpriteFrame` 矩形切片处理；关卡数字、锁定状态、文字和点击区域由代码生成。[home-v4 资源记录](docs/art-preview/home-v4/production-assets.json) 保存生成提示词、原始文件、透明通道及 SHA-256 信息。[主页效果稿](docs/art-preview/home-v4/home-concept.png) 作为构图和材质参考，运行时使用分离素材与真实控件组装。

同日较早的山林版本已接入加载、局内、玩家弹窗和结算；home-v4 当时沿用这些部分。后续 catalog-v1 更新了加载条、商店／图鉴内容、局内道具栏和购买弹窗，catalog-v2 再将商店改为四行列表并取消两页顶部标题；局内棋盘与结算继续沿用。最初的绿金圆盘主页、底部独立开始按钮、四张深绿商品卡、平米色图鉴板及 catalog-v1 木框展柜均保留为历史记录。

上一轮背景、标题和 UI 图集保留在 `assets/resources/texture/mountain-ui/`，由 `assets/Script/Game/Common/UI/MountainArt.ts`、`ForestUI.ts` 和 `ToyArt.ts` 接入。其中主页远景已由 home-v4 专用背景替换，加载与局内继续使用上一轮资源。五张背景从设计稿目录原样复制，基础菌子 `obj0.png` 至 `obj3.png` 保持原文件。图鉴资料入口为 `assets/resources/config/mushroom-journal.json`，名称与介绍等待作者提供；没有增加菌种知识、采集机制或新的消除规则。冰块特效缺图与可选远程任务接口问题的当前状态、具体运行验证和未覆盖范围，以 [验收记录](docs/reorganization-validation.md) 为准。

七张山林界面图片的原提示词、生成源文件、尺寸与 SHA-256 见 [资源来源记录](docs/art-preview/mountain-v3/generated-assets.json)。同一记录单独核对四张基础菌子 PNG 与 Git HEAD 的内容一致性，范围仅限 `obj0.png` 至 `obj3.png`。

## 山林方向的历史设计稿

2026-10-24 的 [交互设计预览](docs/art-preview/mountain-v2/design.html) 保留作历史对照，原本的本地地址为 `http://127.0.0.1:8767/design.html`。其中数值、图标和棋盘交互是展示内容，不代表当前 Cocos 游戏画面。实际运行请使用上面的 Creator 或构建入口。五张背景原图、生成提示词与文件校验信息仍位于 `docs/art-preview/mountain-v2/`；当前实现说明见 [山林视觉方案](docs/art-style-redesign.md)。
