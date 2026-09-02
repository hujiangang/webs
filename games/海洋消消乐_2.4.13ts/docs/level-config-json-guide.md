# 关卡配置 JSON 填写指南

本文档说明 `assets/resources/config/level/new/` 下关卡配置 JSON 的字段如何填写、各字段在运行时如何生效、以及常见写法和注意事项。

适用范围：

- 当前 Match3 主玩法
- 现有代码版本对应的关卡资源结构
- 后续菌子主题关卡制作

主要代码依据：

- `assets/Script/Logic/Data/Interface/Level/ILevel.ts`
- `assets/Script/Logic/Data/Interface/Level.ts`
- `assets/Script/Logic/Match3/Model/GameModel.ts`
- `assets/Script/Logic/Match3/Model/CellModel.ts`
- `assets/Script/Logic/Match3/Model/GroundCellModel.ts`
- `assets/Script/Logic/Match3/Model/UpGroundCellModel.ts`
- `assets/Script/Logic/Match3/Model/MultipleGridColModel.ts`
- `assets/Script/Logic/Match3/Model/SpecialPlug/Girl.ts`
- `assets/Script/Logic/Match3/Model/SpecialPlug/Conveyer.ts`
- `assets/Script/Logic/Match3/Model/multipleGridCol/GnomeModel.ts`
- `assets/Script/Logic/Match3/Model/multipleGridCol/TurtlesModel.ts`
- `assets/Script/Logic/Match3/Model/multipleGridCol/CrabModel.ts`

关卡资源路径：

- 实际目录：`assets/resources/config/level/new/`
- 资源引用写法：`resources/config/level/new/`
- 典型文件：`levels-01/0001.json`

## 1. 顶层结构

一个关卡 JSON 顶层通常包含以下字段：

```json
{
  "grid": [],
  "gnome": [],
  "crab": [],
  "turtles": [],
  "monkeyTree": [],
  "lawnmower": [],
  "girl": {},
  "collect": [],
  "chipset": [],
  "levelInfo": {},
  "conveyerList": [],
  "mergeLimit": {}
}
```

其中最重要的是：

- `grid`
- `collect`
- `chipset`
- `levelInfo`

这四类决定了关卡的棋盘、目标、元素池和基础规则。

其余字段是特殊玩法插件或历史兼容字段。

## 2. 最小可用关卡

如果你想写一个最简单、能跑起来的关卡，最少建议写：

```json
{
  "grid": [
    {
      "collect": null,
      "map": [
        [
          { "born": true, "type": 0 },
          { "born": true, "type": 1 },
          { "born": true, "type": 2 }
        ],
        [
          { "type": 0 },
          { "type": 1 },
          { "type": 2 }
        ],
        [
          { "type": 1 },
          { "type": 2 },
          { "type": 0 }
        ]
      ]
    }
  ],
  "collect": [
    { "type": 0, "count": 10 }
  ],
  "chipset": [
    { "type": 0, "percent": 100 },
    { "type": 1, "percent": 100 },
    { "type": 2, "percent": 100 }
  ],
  "levelInfo": {
    "TO_LIGHTNING_ENOUGH": 10,
    "background": 1,
    "cellColorSeed": 0,
    "levelReward": 50,
    "movesLimit": 20,
    "version": "0",
    "timeLimit": 0,
    "entry": false,
    "hardness": false,
    "showTargetTitle": "",
    "forceUpdate": false,
    "score": [1000, 2000, 3000]
  },
  "mergeLimit": {}
}
```

这个最小例子能说明核心结构，但正式关卡一般还会加障碍、底层地块、出生点、目标物和特殊插件。

## 3. `grid` 字段

### 3.1 类型

```ts
grid: Array<IMapData>
```

每个 `grid[i]` 表示一张子地图。

当前项目支持多张横向地图切换，但大多数关卡只有一张，所以通常只写一个 `grid` 项。

### 3.2 结构

```ts
interface IMapData {
  collect: { [key: string]: number };
  map: Grid[][];
}
```

其中：

- `collect` 是这一张子地图局部目标计数
- `map` 是二维格子数组

### 3.3 `map` 的基本写法

`map[y][x]` 是一个格子对象，支持同时写多种属性，例如：

```json
{
  "type": 2,
  "born": true,
  "leaves": 1,
  "box_level": 2,
  "locks": 1
}
```

表示：

- 该格初始基础元素类型为 `2`
- 该格是出生点
- 该格底层有 1 层叶子
- 该格上层有 2 层箱子
- 该格上层还有 1 层锁链

### 3.4 `map` 中常见值

| 值 | 类型 | 含义 | 运行时影响 |
| --- | --- | --- | --- |
| `null` | 空 | 这一格不参与棋盘 | 直接为空位 |
| `{}` | 对象 | 普通可用格，但不指定具体元素 | 默认随机生成 |
| `-1` | 数字 | 常见历史写法，表示空位/不生成位置 | 具体效果依赖初始化逻辑，建议新关少用 |
| `{ "empty": true }` | 对象 | 基础元素为空 | 该格不放普通元素 |
| `{ "type": 0 }` | 对象 | 固定初始元素 | 以指定类型开局 |
| `{ "born": true }` | 对象 | 出生点 | 会从上方生成新元素 |
| `{ "exit": true }` | 对象 | 出口点 | 冰淇淋/目标类到达后处理收集 |
| `{ "passable": true }` | 对象 | 可穿透格 | 掉落时可穿过 |

### 3.5 `type` 的意义

`type` 是基础元素类型。常见对应如下：

| type | 元素 |
| ---: | --- |
| 0 | Apple / 普通元素 1 |
| 1 | Leaf / 普通元素 2 |
| 2 | Grape / 普通元素 3 |
| 3 | Pear / 普通元素 4 |
| 4 | Water / 普通元素 5 |
| 5 | Flower |
| 6 | Banana |
| 7 | IceCream |
| 8 | Coconut |
| 9 | BrokenConch |
| 10 | Fish |
| 11 | Conch |
| 12 | BottleCaps |
| 13 | Ground |
| 100~104 | `Bomb1~Bomb5` |
| 105~106 | 预留/少见炸弹类型 |

注意：

- `type >= 100` 会被当成炸弹类型处理。
- `type < 100` 才是普通基础元素或特殊普通层元素。
- 一些关卡里会把 `type` 和覆盖物一起写，例如 `box_level` + `type`。

### 3.6 一个格子可以同时写什么

同一格可以组合多个层次：

- `type`
- `born`
- `empty`
- `leaves`
- `flowers`
- `stone`
- `firefly`
- `counter_level`
- `water`
- `exit`
- `ivy`
- `box_level`
- `rocket_type`
- `box_type`
- `ice`
- `locks`
- `portal_idx`
- `passable`
- `wall_left/right/top/bottom`
- `ground`
- `gem`
- `mushroom`
- `nov_grass`
- `nov_conch`

写法上就是在同一个对象里同时写这些键。

## 4. `collect` 字段

### 4.1 顶层 `collect`

```ts
collect: Array<{ count: number; type: string | number }>
```

这是关卡总目标。

示例：

```json
[
  { "type": 0, "count": 35 },
  { "type": 2, "count": 35 }
]
```

表示本关需要收集 35 个 `type=0` 和 35 个 `type=2`。

### 4.2 目标类型

`type` 可以是数字，也可以是字符串。

常见字符串目标：

- `gnome`
- `box`
- `colorbox`
- `stone`
- `gem`
- `firefly`
- `turtles`
- `crab`
- `tree`

### 4.3 局部 `collect`

`grid[i].collect` 也是一个对象，但目前大多数关卡不用它，更多是历史兼容或局部子地图目标。

如果没有特殊需要，建议写：

```json
"collect": null
```

## 5. `chipset` 字段

### 5.1 含义

`chipset` 决定关卡中普通元素的随机生成池。

格式：

```ts
chipset: Array<{
  type: number;
  percent: number;
  isNoInitCreate?: boolean;
}>
```

### 5.2 示例

```json
[
  { "type": 0, "percent": 100 },
  { "type": 1, "percent": 100 },
  { "type": 2, "percent": 100 },
  { "type": 3, "percent": 100 },
  { "type": 4, "percent": 100 }
]
```

### 5.3 如何理解 `percent`

代码里会把 `percent / 5` 作为权重分片，因此它不是百分比的严格数学意义，而是“出现权重”。

建议写法：

- `100` 表示高频
- `80`、`60`、`40` 表示降低出现概率

### 5.4 `isNoInitCreate`

```json
{ "type": 2, "percent": 100, "isNoInitCreate": true }
```

表示：

- 开局初始不会生成这种元素
- 但后续掉落/补位时仍可能出现

这个字段适合用于避免开局死局或人为控制特殊元素出现时机。

## 6. `levelInfo` 字段

这是最重要的关卡基础规则配置。

### 6.1 结构

```ts
levelInfo: {
  TO_LIGHTNING_ENOUGH: number;
  background: number;
  cellColorSeed: number;
  levelReward: number;
  movesLimit: number;
  version: string;
  timeLimit: number;
  entry: boolean;
  hardness: boolean;
  showTargetTitle: string;
  forceUpdate: boolean;
  score: Array<number>;
}
```

### 6.2 字段逐项说明

| 字段 | 类型 | 是否必填 | 作用 | 典型写法 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `TO_LIGHTNING_ENOUGH` | number | 建议保留 | 预留/历史字段 | `10` | 当前主流程里几乎没直接用到，建议按旧项目保留 |
| `background` | number | 是 | 决定关卡背景样式 | `1`, `2`, `3` | `MainCtrl` 会读取它决定背景资源 |
| `cellColorSeed` | number | 可保留 | 颜色随机种子 | `0` | 当前大多时候保留默认即可 |
| `levelReward` | number | 可保留 | 通关奖励基数 | `50`、`100` | 可能用于结算或奖励配置 |
| `movesLimit` | number | 是 | 关卡步数限制 | `20`, `25`, `30` | **这是当前真正生效的步数字段** |
| `version` | string | 建议保留 | 版本标记 | `"0"` | 兼容字段 |
| `timeLimit` | number | 是/可选 | 时间限制 | `0` | `0` 通常表示不限时 |
| `entry` | boolean | 可保留 | 入口/引导标记 | `false` | 当前未见核心主玩法依赖 |
| `hardness` | boolean | 可保留 | 难度标记 | `false` | 可能给活动或统计使用 |
| `showTargetTitle` | string | 可选 | 目标标题文案 | `"收集蘑菇"` | 当前代码里只定义了字段，未见广泛使用 |
| `forceUpdate` | boolean | 可保留 | 强制更新标记 | `false` | 历史兼容字段 |
| `score` | number[] | 是 | 星级分数线 | `[10000, 20000, 30000]` | 结算星星、进度条使用 |

### 6.3 `score` 怎么填

`score` 是三档星级分数线。

例子：

```json
"score": [10000, 20000, 30000]
```

含义：

- 达到 10000 分，第一颗星
- 达到 20000 分，第二颗星
- 达到 30000 分，第三颗星

建议：

- 第一关分数线不要太高
- 后期关卡分数线可以提高
- 末尾保持递增

### 6.4 `movesLimit` 怎么填

这是最容易填错的字段。

当前代码真正用的是：

```ts
this.stepLimit = this.stepCount = data.levelInfo.movesLimit;
```

所以：

- 关卡步数一定要写在 `levelInfo.movesLimit`
- 顶层的 `moveCnt` 更像历史遗留字段，不建议再依赖

建议例子：

```json
"movesLimit": 25
```

### 6.5 `background` 怎么填

当前背景编号会影响：

- 关卡背景图
- 关卡场景氛围
- 有些普通元素在特定背景下会换一套图

常见写法：

- `1`：默认海洋/基础背景
- `2`：森林背景
- `3`：沙滩/其他背景

建议先按已有资源编号填，不要随便写一个新数字，除非你已经补了对应背景资源。

## 7. `mergeLimit` 字段

### 7.1 含义

```ts
mergeLimit: { [key: string]: boolean }
```

这个字段用于限制哪些炸弹组合可以生成特殊炸弹。

代码里会在 `GameModel.isCanMergeBomb(type, cell)` 中读取它。

### 7.2 示例

```json
{
  "100": true,
  "101": true,
  "102": true,
  "103": true,
  "104": true
}
```

如果不写，当前逻辑通常默认允许。

### 7.3 怎么理解

- 键名是炸弹类型数字转字符串
- 值 `true` 表示允许生成或保留该合成限制

如果后续你希望某些关卡禁止生成某种炸弹，可以在这里限制。

## 8. 多格目标字段

这类字段用于“不是单个格子”的目标，例如蘑菇人、乌龟、螃蟹、树等。

### 8.1 `gnome`

结构：

```ts
gnome: Array<{ index: number; type: number; x: number; y: number }>
```

例子：

```json
[
  { "x": 4, "y": 7, "type": 1 },
  { "x": 3, "y": 6, "type": 1 }
]
```

作用：

- 用来在底层地块上标记多个目标区域
- 由 `GnomeModel` 处理

### 8.2 `crab`

结构和 `gnome` 一样：

```ts
crab: Array<{ index: number; type: number; x: number; y: number }>
```

作用：

- 生成螃蟹目标区域
- 由 `CrabModel` 处理

### 8.3 `turtles`

结构和 `gnome` 一样：

```ts
turtles: Array<{ index: number; type: number; x: number; y: number }>
```

作用：

- 生成乌龟目标区域
- 由 `TurtlesModel` 处理

### 8.4 `monkeyTree`

这个字段在接口里存在，但在当前主要代码里没有完整整理成主流程字段。

如果以后要用，需要单独确认对应插件逻辑。

### 8.5 `index` 字段怎么填

`index` 用来区分多组同类目标。

如果一个关卡里有多组蘑菇/螃蟹/乌龟目标，建议分组写不同 `index`。

如果不填，代码通常会把同类项都视为当前关卡同一组目标的一部分。

### 8.6 `type` 字段怎么填

`type` 在多格目标里不是元素类型，而是“形状/朝向/扩展规则”。

例如：

- 偶数时往往表示横向
- 奇数时往往表示纵向

不同模型的实际扩展规则略有区别，最稳妥做法是参考现成关卡数据。

## 9. `lawnmower` 字段

### 9.1 含义

用于除草机/推土机类特殊目标。

结构：

```ts
lawnmower: Array<{
  x: number;
  y: number;
  type: number;
  count: number;
  degree: number;
}>
```

### 9.2 示例

```json
[
  { "x": 0, "y": 7, "type": 0, "count": 16, "degree": 0 },
  { "x": 11, "y": 5, "type": 1, "count": 16, "degree": 180 }
]
```

### 9.3 字段说明

| 字段 | 作用 |
| --- | --- |
| `x` / `y` | 起始坐标 |
| `type` | 目标类型或方向类别 |
| `count` | 需要收集/充能数量 |
| `degree` | 朝向角度，0 右、90 上、180 左、270 下 |

## 10. `girl` 字段

### 10.1 含义

用于女孩/美人鱼路径关卡。

结构：

```ts
girl?: {
  index: number;
  path: number[][];
}
```

### 10.2 示例

```json
{
  "index": 0,
  "path": [[4, 7], [4, 6], [4, 5], [4, 4]]
}
```

### 10.3 字段说明

| 字段 | 作用 |
| --- | --- |
| `index` | 路径分组编号 |
| `path` | 路径坐标数组，按顺序填写 |

### 10.4 路径怎么理解

- 第一个点是起点
- 最后一个点是终点
- 中间点是移动路径

代码会把起点变成 `Girl`，终点变成 `Conch`，中间地块标记成女孩行走路径。

## 11. `conveyerList` 字段

### 11.1 含义

用于传送带/输送带。

结构：

```ts
conveyerList?: Array<Array<{ x: number; y: number; exist: boolean }>>
```

### 11.2 示例

```json
[
  [
    { "x": 3, "y": 8, "exist": true },
    { "x": 3, "y": 7, "exist": false },
    { "x": 3, "y": 6, "exist": true }
  ],
  [
    { "x": 7, "y": 2, "exist": true },
    { "x": 8, "y": 2, "exist": true },
    { "x": 9, "y": 2, "exist": true }
  ]
]
```

### 11.3 字段说明

| 字段 | 作用 |
| --- | --- |
| `x` / `y` | 传送带格子坐标 |
| `exist` | 该点是否真实存在/是否显示为有效传送点 |

### 11.4 规则

- 一个数组代表一条传送带路径
- 多个数组代表多条传送带
- 代码会按数组顺序把格子依次移动到下一个点

## 12. 格子字段详解

下面是 `Grid` 里支持的常见字段。

### 12.1 基础类

| 字段 | 类型 | 含义 |
| --- | --- | --- |
| `born` | boolean | 出生点 |
| `type` | number | 基础元素或特殊元素类型 |
| `empty` | boolean | 基础元素空位 |
| `passable` | boolean | 可穿透格 |

### 12.2 底层地块类

| 字段 | 类型 | 含义 |
| --- | --- | --- |
| `ground` | number | 可移动土地等级 |
| `gem` | number | 土地上的宝石等级 |
| `water` | boolean | 水面/不可移动地块 |
| `exit` | boolean | 出口 |
| `leaves` | number | 叶子/草地等级 |
| `flowers` | number | 花等级 |
| `firefly` | number | 萤火虫等级 |
| `ivy` | number | 藤蔓等级 |
| `mushroom` | number | 蘑菇等级 |
| `nov_grass` | number | 新手草 |
| `nov_conch` | number | 新手贝壳 |

### 12.3 上层覆盖物类

| 字段 | 类型 | 含义 |
| --- | --- | --- |
| `box_level` | number | 木箱等级 |
| `box_type` | number | 箱子颜色类型 |
| `ice` | number | 冰块等级 |
| `locks` | number | 锁链等级 |
| `stone` | number | 石头等级 |
| `counter_level` | number | 计数器层数 |
| `rocket_type` | number | 火箭/特殊生成类型 |
| `portal_idx` | number | 传送门编号 |

### 12.4 墙体类

| 字段 | 类型 | 含义 |
| --- | --- | --- |
| `wall_left` | boolean | 左墙 |
| `wall_right` | boolean | 右墙 |
| `wall_top` | boolean | 上墙 |
| `wall_bottom` | boolean | 下墙 |

### 12.5 结构性说明

同一个格子对象里可以同时写多个字段，比如：

```json
{
  "born": true,
  "type": 2,
  "leaves": 1,
  "box_level": 2,
  "locks": 1,
  "wall_left": true
}
```

表示：

- 这个格子可以出生
- 初始基础元素为 `type=2`
- 底层有 1 层叶子
- 上层有 2 层箱子
- 还有 1 层锁链
- 左侧有墙

## 13. 顶层 `moveCnt` 字段

你在很多 JSON 里会看到：

```json
"moveCnt": 25
```

这个字段在当前代码里**不建议作为主步数来源**。

当前真正生效的是：

```json
"levelInfo": {
  "movesLimit": 25
}
```

所以建议：

- `moveCnt` 保留与旧数据兼容
- 实际填写步数时以 `levelInfo.movesLimit` 为准

## 14. 历史字段 / 兼容字段

这些字段在资源里能看到，但当前主逻辑没有形成统一主流程，或作用不够稳定。建议先当作兼容字段，不要盲目依赖。

| 字段 | 备注 |
| --- | --- |
| `trashChips` | 历史/旧机制字段，部分旧关卡存在 |
| `carryChips` | 历史/旧机制字段，部分旧关卡存在 |
| `surpriseInfo` | 随机事件配置，旧版本中使用较多 |
| `rocketsInfo` | 火箭随机生成配置，旧版本字段 |
| `butterflyInfo` | 蝴蝶机制字段，旧版本字段 |
| `bigPie` | 特殊大范围机制，旧版本字段 |
| `born_type` | 旧版出生规则扩展字段 |
| `lock_reflect` | 旧版反射/锁定扩展字段 |
| `coral` / `coralPot` | 海洋旧主题扩展字段 |

如果你要做一个新的菌子主题关卡，建议优先使用本文已经说明的稳定字段，不要主动扩展这些历史字段，除非你确认代码已经完整支持。

## 15. 推荐填写顺序

做一关新关卡时，建议按这个顺序填：

1. 先定 `levelInfo.movesLimit`、`levelInfo.score`、`levelInfo.background`
2. 再填 `collect`
3. 再写 `chipset`
4. 再画 `grid.map`
5. 最后补 `gnome / crab / turtles / girl / conveyerList / lawnmower`
6. 需要限制炸弹合成时再写 `mergeLimit`

这个顺序最不容易出错。

## 16. 常见错误

### 16.1 只写了 `moveCnt`

问题：

- 关卡看起来有步数
- 运行时却可能不按你预期生效

修正：

- 把步数写到 `levelInfo.movesLimit`

### 16.2 `chipset` 没写或全写错

问题：

- 开局可能元素池不完整
- 生成类型异常

修正：

- 至少写入关卡实际要出现的普通元素类型

### 16.3 `grid` 尺寸不统一

问题：

- 某一行长度和其他行不一致
- 运行时报错或显示错位

修正：

- 每一行数组长度必须一致

### 16.4 `portal_idx` 只写了入口或只写了出口

问题：

- 传送门不会配对

修正：

- 同一个编号必须有一对：一个正数出口，一个负数入口

### 16.5 `girl.path` 坐标顺序写错

问题：

- 路径断裂
- 女孩无法正确移动

修正：

- 按路线顺序逐点填写

### 16.6 `conveyerList` 不是数组套数组

问题：

- 传送带插件不会初始化

修正：

- 外层是多条路径数组，内层是单条路径点数组

## 17. 一个稍完整的示例

```json
{
  "grid": [
    {
      "collect": null,
      "map": [
        [
          { "born": true, "type": 0 },
          { "born": true, "type": 1 },
          { "born": true, "type": 2 },
          { "born": true, "type": 3 }
        ],
        [
          { "type": 0, "leaves": 1 },
          { "type": 1, "leaves": 1 },
          { "type": 2, "leaves": 1 },
          { "type": 3, "leaves": 1 }
        ],
        [
          { "box_level": 1, "type": 0 },
          { "box_level": 1, "type": 1 },
          { "box_level": 1, "type": 2 },
          { "box_level": 1, "type": 3 }
        ],
        [
          { "water": true },
          { "water": true, "exit": true },
          { "water": true },
          { "water": true }
        ]
      ]
    }
  ],
  "collect": [
    { "type": 0, "count": 10 },
    { "type": "box", "count": 4 }
  ],
  "chipset": [
    { "type": 0, "percent": 100 },
    { "type": 1, "percent": 100 },
    { "type": 2, "percent": 100 },
    { "type": 3, "percent": 100 }
  ],
  "levelInfo": {
    "TO_LIGHTNING_ENOUGH": 10,
    "background": 1,
    "cellColorSeed": 0,
    "levelReward": 50,
    "movesLimit": 20,
    "version": "0",
    "timeLimit": 0,
    "entry": false,
    "hardness": false,
    "showTargetTitle": "收集蘑菇",
    "forceUpdate": false,
    "score": [1000, 2000, 3000]
  },
  "mergeLimit": {
    "100": true,
    "101": true,
    "102": true,
    "103": true,
    "104": true
  }
}
```

## 18. 给菌子主题关卡的建议

如果后面你要把整套游戏改成菌子主题，关卡配置 JSON 本身不用大改，优先只改这几块：

1. `collect` 里的目标名字和数量
2. `chipset` 里的普通元素类型
3. `grid.map` 里各类障碍、目标和特殊地块
4. `levelInfo.showTargetTitle`
5. 传送带、路径、特殊目标的表现资源

也就是说：

- 结构不动
- 类型值尽量不动
- 资源和文案换掉

这样最稳。

