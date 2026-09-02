# Match3 项目代码结构梳理

本文档从后续维护角度说明当前 Match3 主玩法代码怎么分层，以及后续“全部由代码开发、配置人员只改 JSON 和资源”的推荐推进方式。

## 1. 当前主流程

现在目标流程是：

```text
开始游戏 -> LoadingScene -> Match3 主玩法
```

进入 `Match3` 后：

1. `MainCtrl.onLoad()` 初始化基础管理器和事件。
2. `MainCtrl.initGame()` 读取当前关卡 JSON。
3. 加载换皮配置 `Match3Skin.load()`。
4. 加载元素资源配置 `ResCtrl.load()`。
5. 初始化 UI。
6. 初始化背景。
7. 初始化棋盘。
8. Loading 结束后显示目标 UI。
9. 关闭目标 UI 后正式开始可操作。

关键文件：

| 文件 | 职责 |
| --- | --- |
| `assets/Script/Logic/Loading/LoadingScene.ts` | Loading 场景流程 |
| `assets/Script/Logic/Match3/MainCtrl.ts` | Match3 主控制器 |
| `assets/Script/Logic/Match3/Skin/Match3Skin.ts` | 棋盘皮肤和棋盘 prefab 配置加载 |
| `assets/Script/Logic/Match3/ResCtrl.ts` | 元素、障碍、目标图标资源配置加载 |
| `assets/resources/config/match3_skin/default.json` | 棋盘皮肤配置 |
| `assets/resources/config/match3_res/default.json` | 元素和障碍资源配置 |

## 2. 代码分层

### 2.1 数据层

路径：

```text
assets/Script/Logic/Data/
```

主要职责：

- 定义常量、枚举、事件。
- 读取关卡 JSON。
- 保存运行时状态。

关键文件：

| 文件 | 职责 |
| --- | --- |
| `Const/Constant.ts` | 元素类型、场景名、游戏状态等 |
| `Const/Event.ts` | 事件名 |
| `Interface/Level.ts` | 关卡配置读取入口 |
| `Interface/Level/ILevel.ts` | 关卡配置结构 |
| `RuntimeMgr.ts` | 当前关卡、游戏状态、步数、收集进度等运行时数据 |

### 2.2 模型层

路径：

```text
assets/Script/Logic/Match3/Model/
```

主要职责：

- 不负责显示图片。
- 负责棋盘数据、元素状态、掉落、消除、目标统计、障碍状态。

关键文件：

| 文件 | 职责 |
| --- | --- |
| `GameModel.ts` | 主棋盘模型，生成棋盘、驱动掉落和任务 |
| `CellModel.ts` | 基础元素模型 |
| `GroundCellModel.ts` | 底层地块模型 |
| `UpGroundCellModel.ts` | 上层覆盖物模型 |
| `BombModel.ts` | 炸弹和炸弹组合逻辑 |
| `CollectModel.ts` | 收集目标统计 |
| `PropModel.ts` | 玩家道具逻辑 |

### 2.3 视图层

路径：

```text
assets/Script/Logic/Match3/View/
```

主要职责：

- 把模型数据展示出来。
- 播放节点动画。
- 不应该决定关卡规则。

关键文件：

| 文件 | 职责 |
| --- | --- |
| `GroundViewCtrl.ts` | 底层地块视图和棋盘底板边框 |
| `BasicCellViewCtrl.ts` | 基础元素视图容器 |
| `UpGroundViewCtrl.ts` | 上层覆盖物视图容器 |
| `ItemBasicCellCtrl.ts` | 单个基础元素显示 |
| `ItemGroundCtrl.ts` | 单个底层地块显示 |
| `ItemUpgroundCtrl.ts` | 单个上层覆盖物显示 |
| `EffLayerCtrl.ts` | 特效层 |

### 2.4 UI 层

路径：

```text
assets/Script/Logic/Match3/View/UI/
```

主要职责：

- 步数、目标、分数、道具、进度等 UI。

关键文件：

| 文件 | 职责 |
| --- | --- |
| `MainUiCtrl.ts` | 主玩法 UI |
| `InfoPanelCtrl.ts` | 信息栏 |
| `CollectItemCtrl.ts` | 单个目标 UI |
| `PropCtrl.ts` | 道具栏 |
| `PropItemCtrl.ts` | 单个道具 UI |
| `SelectPropCtrl.ts` | 选择道具 UI |

### 2.5 配置加载层

路径：

```text
assets/Script/Logic/Match3/Skin/
assets/Script/Logic/Match3/ResCtrl.ts
```

当前已经拆成两类：

| 类 | 负责内容 |
| --- | --- |
| `Match3Skin` | 棋盘 prefab、格子底图、格子边框、棋盘皮肤 |
| `ResCtrl` | 元素图片、特殊元素 prefab、障碍图、目标图标 |

后续建议把特效也独立成：

```text
Match3EffectRes
```

这样最终资源配置中心会变成：

| 配置 | 内容 |
| --- | --- |
| `match3_skin/default.json` | 棋盘皮肤 |
| `match3_res/default.json` | 元素和障碍 |
| `match3_effect/default.json` | 消除、炸弹、组合特效 |
| `match3_ui/default.json` | UI 图标、道具图标 |

## 3. 当前已经完成的整理

### 3.1 去掉部分场景依赖

已推进方向：

- 不再通过 LevelScene 选择历史关卡进入主玩法。
- 不再依赖 HotelScene 流程。
- 主流程收敛为直接开始一局。

### 3.2 棋盘皮肤配置化

已新增：

```text
assets/resources/config/match3_skin/default.json
assets/Script/Logic/Match3/Skin/Match3Skin.ts
```

当前覆盖：

- 棋盘根 prefab。
- 格子底板 prefab。
- 基础元素 item prefab。
- 上层覆盖物 item prefab。
- 底层地块 item prefab。
- 格子底图。
- 格子边框。
- 水面/复杂地块拼接图。
- 荷叶、女孩路径图。

### 3.3 ResCtrl 资源配置化

已新增：

```text
assets/resources/config/match3_res/default.json
assets/resources/config/match3_res.meta
assets/resources/config/match3_res/default.json.meta
```

当前覆盖：

- 普通元素图。
- 炸弹图和特殊 prefab。
- 箱子、锁链、冰块、石头。
- 底层地块图。
- 可移动土地中心图和四边 prefab。
- 目标 UI 图标。
- 蘑菇地块图。

## 4. 当前仍未完全配置化的区域

下面这些还存在 Inspector 绑定或旧代码绑定，后续建议继续迁移。

| 区域 | 当前问题 | 建议 |
| --- | --- | --- |
| `EffLayerCtrl` | 大量特效 prefab 仍在组件属性里拖拽 | 新增 `match3_effect/default.json` |
| `CollectItemCtrl` | 部分目标图标 fallback 仍靠 Inspector 数组 | 并入 `match3_res` 或新建 `match3_ui` |
| `PropCtrl / SelectPropCtrl` | 道具图标仍靠 Inspector | 新增 `match3_ui/default.json` |
| `MainCtrl` | 背景逻辑仍按 `Paths.Match3Bg + background` 加载 | 后续可做 `match3_background/default.json` |
| 场景节点引用 | `MainCtrl` 仍需要 `bg / uiNode / effNode / maskNode` 等节点引用 | 保留节点引用，资源不要放场景里 |
| prefab 内节点引用 | `ItemBasicCellCtrl` 等仍需要 Sprite/Node 引用 | 保留结构引用，图片资源走配置 |

这里要区分两件事：

- 节点结构引用可以留在场景和 prefab 里，因为它们是界面结构。
- 图片、prefab、SpriteFrame、动画资源应该尽量走 JSON 配置。

也就是说，后续目标不是“场景里什么都没有”，而是“场景只负责摆节点，资源不在场景里维护”。

## 5. 后续重构优先级

建议按风险从低到高推进。

### 第一阶段：资源配置化收口

1. 完成 `ResCtrl` 资源配置化。
2. 完成 `Match3Skin` 棋盘皮肤配置化。
3. 整理资源表格，让每个配置字段都能对应到资源路径和用途。

当前已经基本完成。

### 第二阶段：特效配置化

新增：

```text
assets/resources/config/match3_effect/default.json
assets/Script/Logic/Match3/Skin/Match3EffectRes.ts
```

迁移：

- 普通消除特效。
- 炸弹特效。
- 行列消除特效。
- 彩虹特效。
- 组合特效。
- 破碎特效。

### 第三阶段：UI 配置化

新增：

```text
assets/resources/config/match3_ui/default.json
assets/Script/Logic/Match3/Skin/Match3UiRes.ts
```

迁移：

- 目标图标。
- 道具图标。
- loading 图。
- 主玩法 HUD 图。
- 弹窗通用图。

### 第四阶段：主题命名和代码语义整理

当前代码里还有大量旧海洋/森林命名，比如：

- `Fish`
- `Conch`
- `Zhangyu`
- `Haima`
- `Shuicao`
- `Shanhu`

不要现在立刻全局重命名。全局重命名风险高，会牵动动画名、prefab、关卡字段和旧数据。

推荐做法：

1. 先在文档中建立“旧代码名 -> 新策划名”的映射。
2. 新资源按菌子主题命名。
3. 代码继续兼容旧枚举值。
4. 等玩法稳定后，再做内部语义重命名。

## 6. 当前运行问题排查结论

本轮发现的高概率问题：

1. `assets/resources/config/match3_res/default.json` 新增后缺 `.meta`，Cocos 可能无法把它作为 `resources` 资源导入。
2. `ResCtrl.load()` 使用了 `Promise.finally`，但当前 `tsconfig` 只配置到 `es2017`，旧环境可能编译或运行失败。
3. `ResCtrl` 原来只按 UUID 加载，本轮已补充 `resources` 路径写法，后续更适合非程序人员维护。

本轮已处理：

1. 补充 `match3_res.meta`。
2. 补充 `default.json.meta`。
3. 去掉 `Promise.finally`。
4. 给 `cc.assetManager.loadAny` 增加兼容判断和明确报错。
5. 保持配置中的 UUID 可继续加载，同时支持后续改成资源路径。

## 7. 后续维护原则

### 7.1 非程序人员只改这些地方

```text
assets/resources/config/match3_res/default.json
assets/resources/config/match3_skin/default.json
assets/resources/config/level/new/
```

资源文件放：

```text
assets/resources/
```

### 7.2 不建议非程序人员改这些地方

```text
assets/Scene/Match3.fire
assets/res/prefab/
assets/resources/prefab/
assets/Script/
```

如果一定要改 prefab，建议只替换图片节点，不调整脚本组件和节点层级。

### 7.3 后续开发方式

你的定位可以是：

- 提供玩法需求。
- 提供美术资源。
- 填关卡 JSON。
- 调配置 JSON。
- 测试效果并反馈问题。

代码层面由开发来做：

- 新字段支持。
- 新玩法逻辑。
- 新资源配置入口。
- prefab 结构调整。
- 旧流程清理。
- 报错修复和运行验证。
