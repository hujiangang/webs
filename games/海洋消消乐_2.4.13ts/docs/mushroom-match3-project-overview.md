# 菌子元素消消乐改造项目梳理

本文档用于梳理当前 Cocos Creator 三消项目结构，并标出后续改成“菌子元素消消乐”时需要关注的代码、资源、配置和文案入口。

## 1. 项目基本信息

- 项目类型：Cocos Creator 工程。
- 引擎版本：`2.4.13`，配置见 `project.json`。
- 脚本语言：TypeScript。
- 脚本配置：`tsconfig.json` 使用 `commonjs`、`es5`，排除了 `library`、`local`、`temp`、`build`、`settings`。
- 当前主题：整体是海洋/海岛/沙滩三消，局部已经有蘑菇森林章节和蘑菇障碍机制。

后续改造时应主要修改 `assets` 下的源码和资源。`temp`、`library` 属于编辑器生成/缓存产物，不应作为主要修改对象。

## 2. 顶层目录

```text
assets/
  GodGuide/               引导脚本
  res/                    编辑器资源、三消对象资源、prefab、动画、字体
  resources/              运行时 cc.loader.loadRes 可加载资源
  Scene/                  Cocos 场景
  Script/                 TypeScript 源码
library/                  Cocos 导入库缓存，勿手改
local/                    编辑器本地配置，勿作为业务改造入口
packages/                 Cocos 插件包
settings/                 项目设置
temp/                     临时编译产物，勿手改
tools/                    表/资源处理脚本
```

## 3. 场景结构

主要场景在 `assets/Scene`：

- `LoadingScene.fire`：启动和预加载场景。
- `LevelScene.fire`：关卡地图/选关场景。
- `Match3.fire`：三消主玩法场景，挂载了核心资源控制器 `ResCtrl`。
- `HotelScene.fire`：岛屿/酒店经营相关场景。
- `testScene.fire`：测试场景。

场景名常量在 `assets/Script/Logic/Data/Const/Constant.ts`：

```ts
export const Scene = {
    Loading: 'LoadingScene',
    Map: 'MapScene',
    Match: 'Match3',
    Level: 'LevelScene',
    Hotel: 'HotelScene'
}
```

## 4. 源码模块

源码根目录是 `assets/Script`，按职责大致分为：

- `Base/`：基础框架、管理器、网络、工具、表结构。
- `Logic/Common/`：通用 UI、音频、动作、通用枚举和接口。
- `Logic/Data/`：运行时数据、玩家数据、常量、关卡接口。
- `Logic/Match3/`：三消核心逻辑。
- `Logic/Hotel/`：酒店/经营相关逻辑。
- `Logic/SimulationOperation/`：岛屿地图/建造/对话等。
- `Views/`：关卡地图、GM、奖励、道具掉落等视图控制。

后续“菌子元素消消乐”最核心的代码入口是 `assets/Script/Logic/Match3` 和 `assets/Script/Logic/Data/Const/Constant.ts`。

## 5. 三消核心链路

三消核心模块在 `assets/Script/Logic/Match3`：

```text
Control/
  LockCtrl.ts             下落/出生/格子锁
  RotatingCtrl.ts         旋转控制
  TaskCtrl.ts             任务控制
Model/
  GameModel.ts            局内主数据模型
  CellModel.ts            基础棋子模型
  GroundCellModel.ts      地块/底层障碍模型
  UpGroundCellModel.ts    上层障碍模型
  BombModel.ts            炸弹和炸弹组合逻辑
  CollectModel.ts         收集目标逻辑
  SpecialPlug/            特殊机制插件
View/
  ItemBasicCellCtrl.ts    基础棋子显示控制
  ItemGroundCtrl.ts       地块/底层障碍显示控制
  ItemUpgroundCtrl.ts     上层障碍显示控制
  GroundViewCtrl.ts       棋盘地块层显示
  UI/                     局内 UI
MainCtrl.ts               三消主控制器
ResCtrl.ts                三消资源控制器
```

核心流程：

1. 关卡数据加载后传入 `GameModel`。
2. `GameModel.init()` 初始化步数、地图数量、收集目标、棋子权重池、插件和地图。
3. `GameModel.initChipSet()` 根据关卡 `chipset` 生成随机棋子池。
4. 每个格子由 `CellModel.init()` 根据关卡格子字段初始化类型。
5. 视图层由 `ItemBasicCellCtrl.updateDisplay()` 根据 `CellType` 显示图片或 prefab。
6. `ResCtrl` 提供所有三消对象的 SpriteFrame/Prefab 引用。

## 6. 关卡数据

关卡接口在 `assets/Script/Logic/Data/Interface/Level/ILevel.ts`。

关卡 JSON 位于：

```text
assets/resources/config/level/new/
assets/resources/config/level/turorial/
```

常见字段：

```ts
export interface ILevel {
    grid: Array<IMapData>;
    collect: Collect[];
    chipset: Chipset[];
    levelInfo: LevelInfo;
}

export interface Grid {
    born?: boolean;
    type?: number;
    leaves?: number;
    flowers?: number;
    stone?: number;
    firefly?: number;
    counter_level?: number;
    water?: boolean;
    exit?: boolean;
    ivy?: number;
    box_level?: number;
    rocket_type?: number;
    box_type?: number;
    ice?: number;
    locks?: number;
    portal_idx?: number;
    passable?: boolean;
    empty?: boolean;
    ground?: number;
    gem?: number;
    mushroom?: number;
}
```

以 `assets/resources/config/level/new/levels-01/0001.json` 为例：

- `grid[].map` 是二维棋盘。
- `type` 是棋子类型数字。
- `born: true` 表示出生点。
- `collect` 是本关目标。
- `chipset` 是随机掉落类型和权重。
- `levelInfo.background` 控制局内背景。
- `levelInfo.movesLimit` 控制步数。

注意：关卡里 `type` 和 `collect.type` 都依赖 `CellType` 数字。如果只做换皮，不需要批量改关卡。如果要把类型语义彻底改为菌子主题，需要同步维护类型映射、目标标题和教程。

## 7. 棋子和障碍类型

核心枚举在 `assets/Script/Logic/Data/Const/Constant.ts`。

### 7.1 普通棋子

```ts
export enum CellType {
    Back = -2,
    Empty = -1,

    Apple = 0,
    Leaf,
    Grape,
    Pear,
    Water,
    Flower,
    Banana,
    IceCream,
    Coconut,
    BrokenConch,
    Fish,
    Conch,
    BottleCaps,
    Ground,
    Bomb1 = 100,
    Bomb2,
    Bomb3,
    Bomb4,
    Bomb5,
    Bomb6,
    Bomb7,
    Bomb100 = 199,
    Girl,
    Lighting,
    Temp = 200,
}
```

普通可交换/可消除元素主要是 `0-5`，部分特殊普通元素是 `6-13`。

### 7.2 炸弹和特殊棋子

- `Bomb1 = 100`：圆形炸弹，注释中是气泡鱼。
- `Bomb2 = 101`：横向炸弹，注释中是剑鱼。
- `Bomb3 = 102`：竖向炸弹。
- `Bomb4 = 103`：章鱼。
- `Bomb5 = 104`：彩虹炸弹，注释中是海马。
- `Fish = 10`：爆炸鱼。
- `Conch = 11`：完整贝壳。
- `Girl`：小女孩/美人鱼逻辑。

这些通常不仅是静态图，还涉及 prefab、Spine 动画和组合特效。

### 7.3 地块和障碍

```ts
export enum GroundType {
    None = 20000,
    Water,
    MoneyTree,
    Crab,
    Tuituji,
    Leaves,
    Flower,
    Firefly,
    Ivy,
    Mushroom
}
```

项目已有 `GroundType.Mushroom`，但它是底层障碍/插件机制，不是普通可交换菌子棋子。

相关逻辑：

- `assets/Script/Logic/Match3/Model/GroundCellModel.ts`
- `assets/Script/Logic/Match3/Model/SpecialPlug/Mushroom.ts`
- `assets/Script/Logic/Match3/View/ItemGroundCtrl.ts`

## 8. 资源绑定方式

三消棋子不是运行时按文件名动态加载，而是通过 `Match3.fire` 中挂载的 `ResCtrl` 绑定资源数组。

`ResCtrl` 位于：

```text
assets/Script/Logic/Match3/ResCtrl.ts
```

重要属性：

```ts
@property([cc.SpriteFrame])
BombFlashingBg: cc.SpriteFrame[] = [];

@property([cc.SpriteFrame])
BombStaticFrame: cc.SpriteFrame[] = [];

@property([cc.SpriteFrame])
NormalCellFrame: cc.SpriteFrame[] = [];

@property([cc.SpriteFrame])
Map2NormalCellFrame: cc.SpriteFrame[] = [];

@property([cc.Prefab])
CellPrefab: cc.Prefab[] = [];

@property([cc.SpriteFrame])
CollectIcon: cc.SpriteFrame[] = [];

@property([cc.SpriteFrame])
mushroomFrames: cc.SpriteFrame[] = [];
```

显示入口在 `ItemBasicCellCtrl.updateDisplay()`：

- 普通棋子：`ResCtrl.ins.getCellFrame(displayType, spritIndex)`。
- 炸弹和特殊棋子：`ResCtrl.ins.getCellPrefab(index)` 创建 prefab 或 Spine。
- 地块/特殊底层障碍：`ItemGroundCtrl` 根据 `GroundType` 取对应 SpriteFrame。

资源绑定在 `assets/Scene/Match3.fire` 中：

- `NormalCellFrame`：普通棋子图，数组下标对应 `CellType` 数字。
- `BombStaticFrame`：炸弹静态图。
- `CellPrefab`：炸弹、鱼、女孩、贝壳、香蕉、冰淇淋等 prefab。
- `CollectIcon`：特殊目标 icon。
- `mushroomFrames`：现有蘑菇障碍图。

因此后续改菌子主题时，仅替换图片文件有可能不够。若新增资源 uuid 发生变化，还需要在 Cocos Creator 编辑器里重新绑定 `ResCtrl` 数组，或谨慎维护 `.meta` uuid。

## 9. 三消资源位置

### 9.1 普通棋子静态图

```text
assets/res/texture/match3/objects/cells/obj0.png
assets/res/texture/match3/objects/cells/obj1.png
assets/res/texture/match3/objects/cells/obj2.png
assets/res/texture/match3/objects/cells/obj3.png
assets/res/texture/match3/objects/cells/obj4.png
assets/res/texture/match3/objects/cells/obj5.png
...
assets/res/texture/match3/objects/cells/obj13.png
```

`NormalCellFrame[0]` 对应 `obj0.png`，`NormalCellFrame[1]` 对应 `obj1.png`，依次类推。

### 9.2 炸弹静态图

```text
assets/res/texture/match3/objects/cells/obj100.png
assets/res/texture/match3/objects/cells/obj101.png
assets/res/texture/match3/objects/cells/obj103.png
assets/res/texture/match3/objects/cells/obj104.png
```

### 9.3 棋子 prefab 和 Spine 资源

```text
assets/res/prefab/match3/Cells/
assets/res/texture/match3/objects/bomb/
assets/res/texture/match3/objects/caihong/
assets/res/texture/match3/objects/conch/
assets/res/texture/match3/objects/fishBomb/
assets/res/texture/match3/objects/gril/
assets/res/texture/match3/objects/hengshu/
assets/res/texture/match3/objects/octopus/
```

重要 prefab：

- `Bomb.prefab`
- `Hengshu.prefab`
- `Octopus.prefab`
- `Caihong.prefab`
- `FishBomb.prefab`
- `Conch.prefab`
- `banana.prefab`
- `egg.prefab`
- `Gril.prefab`

### 9.4 地块和障碍资源

```text
assets/res/texture/match3/objects/cells/box/
assets/res/texture/match3/objects/cells/chain/
assets/res/texture/match3/objects/cells/ice/
assets/res/texture/match3/objects/cells/leaves1.png
assets/res/texture/match3/objects/cells/leaves2.png
assets/res/texture/match3/objects/cells/leaves3.png
assets/res/texture/match3/objects/cells/stone1.png
assets/res/texture/match3/objects/cells/stone2.png
assets/res/texture/match3/objects/cells/stone3.png
assets/res/texture/match3/objects/cells/mushroom0.png
assets/res/texture/match3/objects/cells/mushroom1.png
```

### 9.5 局内背景

```text
assets/resources/texture/match3/bg/1/
assets/resources/texture/match3/bg/2/
assets/resources/texture/match3/bg/3/
```

背景加载路径常量在 `assets/Script/Base/Utils/Paths.ts`：

```ts
public static readonly Match3Bg: string = 'texture/match3/bg/';
```

`MainCtrl` 会根据 `levelInfo.background` 加载对应背景资源。

## 10. 目标显示

目标 UI 控制在：

```text
assets/Script/Logic/Match3/View/UI/CollectItemCtrl.ts
```

逻辑要点：

- 普通棋子目标直接使用 `ResCtrl.ins.getCellFrame(type, type)`。
- 特殊字符串目标使用 `CollectIcon`。
- 如果 `ResCtrl.ins` 不存在，会使用 prefab 上绑定的备用 `NormalCellFrame`、`BombStaticFrame`、`CollectIcon`。

因此后续需要检查：

```text
assets/res/prefab/match3/UI/collectItemSPrefab.prefab
assets/res/prefab/level/showTargetPrefab.prefab
assets/resources/prefab/ui/GameShowTarget.prefab
assets/resources/prefab/ui/SelectShowTarget.prefab
```

避免目标弹窗仍然显示旧海洋元素。

## 11. 文案和表配置

需要改主题文案的重点文件：

```text
assets/Script/Logic/Data/Const/Constant.ts
assets/resources/csv/ChapterInfo.json
assets/resources/csv/PropInfo.json
assets/resources/csv/ShareCfg.json
assets/resources/csv/titles.json
assets/resources/config/level/turorial/
assets/GodGuide/
assets/resources/prefab/ui/GameShowTarget.prefab
```

当前明显的海洋/旧主题文案包括：

- `合成八爪鱼`
- `八爪鱼爆炸时相邻的元素也会被消除哦`
- `贝壳炸弹`
- `小章鱼`
- `蚌`
- `贝壳`
- `香蕉`
- `椰子`
- `珍珠`
- `阳光沙滩`
- `辽阔大海`
- `悬崖渔村`

注意：源码里也有大量中文注释包含旧主题名称。注释是否改取决于是否要彻底语义化。第一版换皮可以先改玩家可见文案，源码注释后续再统一整理。

## 12. 菌子主题改造建议

### 12.1 第一阶段：低风险换皮

目标：不改变玩法、不批量改关卡，只把玩家看到的核心元素换成菌子主题。

建议改造范围：

1. 替换 `obj0.png` 到 `obj5.png`，把普通可消除元素改为 5-6 种菌子。
2. 替换目标 icon 和普通棋子备用绑定，确保目标弹窗同步显示菌子。
3. 替换局内背景为菌子森林/苔藓地表/洞穴菌丝主题。
4. 替换主要玩家可见文案：道具名、目标标题、教程、章节名、分享文案。
5. 保留原 `CellType` 数字和关卡 JSON，不做玩法结构改动。

优点：改动范围可控，关卡稳定性风险低。

风险：内部枚举仍叫 `Apple`、`Leaf`、`Grape` 等，源码语义与视觉主题不一致。

### 12.2 第二阶段：特殊棋子主题化

目标：把炸弹、特殊元素、障碍表现也统一成菌子主题。

建议映射：

| 原类型 | 当前语义 | 菌子主题建议 |
| --- | --- | --- |
| `Bomb1` | 贝壳/圆形炸弹 | 爆孢菇 |
| `Bomb2` | 横向剑鱼 | 横扫菌丝 |
| `Bomb3` | 纵向炸弹 | 纵扫菌丝 |
| `Bomb4` | 章鱼追踪 | 追踪菌灵 |
| `Bomb5` | 海马/彩虹炸弹 | 彩虹孢子 |
| `Fish` | 爆炸鱼 | 跳孢球 |
| `Conch` | 完整贝壳 | 菌核封印 |
| `Banana` | 旁消采集 | 藤蔓菌 |
| `IceCream` | 出口收集 | 孢子瓶 |
| `Coconut` | 生成物 | 菌核 |
| `BrokenConch` | 旁消破壳 | 裂壳菌包 |

需要修改的资源包括 `CellPrefab` 绑定的 prefab、Spine atlas/png/json，以及组合特效 prefab。

### 12.3 第三阶段：彻底语义化

目标：代码、枚举、文案、资源命名都统一为菌子主题。

可能工作：

1. 重命名或新增类型映射表，例如把 `CellType.Apple` 对外展示为红伞菇。
2. 整理教程和关卡目标文案。
3. 统一资源命名，例如 `obj0.png` 保留兼容，另建资源映射文档。
4. 评估是否重做关卡目标分布，让关卡更像采菌/孢子扩散主题。

风险：枚举重命名会影响大量代码、关卡 JSON、教程富文本图片标签和数据表。建议不要第一阶段就做。

## 13. 推荐普通元素映射

在不改 `CellType` 数字的前提下，可以先建立视觉映射：

| `CellType` | 数字 | 当前枚举名 | 菌子主题名 | 资源文件 |
| --- | ---: | --- | --- | --- |
| `Apple` | 0 | 苹果 | 红伞菇 | `obj0.png` |
| `Leaf` | 1 | 叶子 | 青苔菇 | `obj1.png` |
| `Grape` | 2 | 葡萄 | 紫盖菇 | `obj2.png` |
| `Pear` | 3 | 梨 | 金针菇 | `obj3.png` |
| `Water` | 4 | 水 | 蓝露菇 | `obj4.png` |
| `Flower` | 5 | 花 | 花环菇 | `obj5.png` |

如果需要 7-9 种菌子，可以继续映射：

| `CellType` | 数字 | 当前枚举名 | 菌子主题名 | 资源文件 |
| --- | ---: | --- | --- | --- |
| `Banana` | 6 | 香蕉 | 藤蔓菌 | `obj6.png` 或 `banana.prefab` |
| `IceCream` | 7 | 冰淇淋 | 孢子瓶 | `obj7.png` 或 `egg.prefab` |
| `Coconut` | 8 | 椰子 | 菌核 | `obj8.png` |
| `BrokenConch` | 9 | 破碎贝壳 | 裂壳菌包 | `obj9.png` |

## 14. 重点风险

### 14.1 资源 uuid 绑定风险

Cocos Creator 2.x 资源引用依赖 `.meta` 里的 uuid。直接删除重建图片可能导致 `Match3.fire` 和 prefab 引用丢失。

建议：

- 如果只替换同名图片，尽量保留原 `.meta` 文件。
- 如果新增图片，使用 Cocos Creator 导入后在编辑器里重新绑定 `ResCtrl`。
- 不建议手工大规模替换场景里的 uuid，除非已完整验证引用。

### 14.2 场景和 prefab 有备用资源绑定

`CollectItemCtrl` 在 `ResCtrl.ins` 不存在时会读取当前 prefab 自己绑定的资源数组。因此只改 `Match3.fire` 可能不够，需要同时检查目标弹窗 prefab。

### 14.3 已有 Mushroom 不是普通棋子

`GroundType.Mushroom` 是底层障碍机制。不要误把它当作“菌子普通元素”的入口。

### 14.4 文案分散

玩家可见文案分散在源码、CSV、教程 JSON、场景和 prefab 中。后续建议用 `rg` 分批搜关键字：

```powershell
rg -n "章鱼|海马|剑鱼|贝壳|珍珠|海洋|沙滩|大海|渔村|香蕉|椰子|冰淇淋" assets --glob "!**/*.meta"
```

### 14.5 关卡 JSON 数字类型不可随意改

关卡中 `type` 是数字，直接对应 `CellType`。如果改枚举数值，会影响所有关卡。建议只改显示资源和文案，不改数字协议。

## 15. 建议执行顺序

1. 定义菌子主题映射表，确认每个 `CellType` 对应的新名字和新图。
2. 准备普通棋子 PNG，优先覆盖 `obj0.png` 到 `obj5.png` 并保留 `.meta`。
3. 在 Cocos Creator 打开 `Match3.fire`，检查 `ResCtrl.NormalCellFrame` 是否仍正确引用。
4. 替换目标弹窗和收集 UI 备用绑定。
5. 替换局内背景资源。
6. 修改 `ChapterInfo.json`、`PropInfo.json`、`titles.json`、教程 JSON。
7. 进入前几关验证：
   - 棋盘普通元素显示正确。
   - 随机掉落显示正确。
   - 收集目标 icon 正确。
   - 目标弹窗和结算 UI 不残留旧图。
   - 教程富文本图片标签仍能正常显示。
8. 再进入包含特殊棋子、障碍、炸弹组合的关卡验证特殊资源。

## 16. 后续可产出的清单

如果继续推进改造，建议补充以下文档或表格：

- `CellType` 到菌子主题的最终映射表。
- 资源替换清单：旧文件、新文件、是否保留 `.meta`、是否需要重绑 prefab。
- 文案替换清单：旧文案、新文案、文件路径。
- 关卡验证清单：覆盖普通棋子、目标收集、炸弹、障碍、教程、结算。

