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
3. 加载后进入中间的“游戏”页；左右为金币商店、菌子图鉴。“开始”进入当前关卡，已解锁的关卡支持重玩。浏览器调试环境可在右上角菜单打开“开发验收”，提供六种单体、十五种组合和胜负结算测试；微信环境隐藏该入口。

维护工具需要 Node.js 和 npm；本次验证使用 Node.js 24.11.1、TypeScript 4.9.5。

```powershell
npm ci
npm run check
npm run build:preview
```

`check` 包含完整 TypeScript 检查、框架依赖检查、迁移 UUID 检查、场景脚本绑定检查、退役美术引用检查和 27 项回归测试。

构建脚本优先使用环境变量 `COCOS_CREATOR_PATH`，本机默认路径为 `D:\CocosEditors\Creator\2.4.13\CocosCreator.exe`。其他电脑可指定：

```powershell
$env:COCOS_CREATOR_PATH = '你的安装目录\CocosCreator.exe'
npm run build:preview
```

输出为 `build/web-mobile/`，日志为 `temp/build-preview.log`。通过 HTTP 服务打开构建结果：

```powershell
python -m http.server 8765 --bind 127.0.0.1 --directory build/web-mobile
```

访问 `http://127.0.0.1:8765`。游戏按竖屏设计，本次交互验收视口为 390 × 844。

## 资源与版本管理

- `assets/resources/`：通过资源路径动态加载的 JSON、图片、预制体等。
- `assets/res/`：编辑器引用的美术、预制体等；部分仍被动态资源间接引用。
- 退役代码与专用场景／预制体见 `docs/retired-hotel-island.json`，删除前的工作状态备份为 `temp/mushroom-scope-before.zip`。
- 特殊元素已换成双箭头、爆破弹、流星球和彩虹球。退役旧美术清单见 `docs/retired-special-art.json`，备份为 `temp/retired-special-art.zip`；共享资源继续保留。
- 脚本移动必须同时移动同名 `.meta`，保持 UUID。资源路径和序列化字段不能只凭代码搜索随意更名。
- `library/`、`local/`、`temp/`、`build/` 是生成或本机文件。本仓库此前跟踪了部分缓存；新增 `.gitignore` 不会自动取消已跟踪文件。
- 本次整理前的源码与文档备份：`temp/reorganization-before.zip`。修改前逐文件验证了备份 SHA-256；用户原有资源表未改动。

主页采用宝蓝至青蓝渐变、立体按钮与玩具质感图标；局内采用紫蓝背景和深蓝灰底格，弹窗使用蓝色边框与奶油色内页。设计和美术来源见 [美术方案](docs/art-style-redesign.md) 与 [生成记录](docs/art-preview/generation-prompts.md)。图鉴资料入口为 `assets/resources/config/mushroom-journal.json`，当前名称与介绍等待作者提供。旧草地边框已由程序底格替代；冰块特效仍有缺资源警告，可选远程每日任务接口仍可能访问失败。详细位置和验证边界见验收记录。
