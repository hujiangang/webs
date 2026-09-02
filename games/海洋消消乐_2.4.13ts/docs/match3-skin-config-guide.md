# Match3 资源配置说明

这份文档只讲一件事：`Match3` 主玩法里，哪些资源已经可以完全通过配置替换，应该改哪里，怎么改才不会碰到代码。

当前这套改造的目标是：

- 不在场景里拖资源
- 不在 prefab Inspector 里拖资源
- 资源路径统一写到 JSON
- 代码只认配置键名，不再认 prefab 面板

配置文件位置：

```text
assets/resources/config/match3_skin/default.json
```

对应代码入口：

- `assets/Script/Logic/Match3/Skin/Match3Skin.ts`

## 1. 资源放置规则

所有希望通过配置替换的资源，都必须放在 `assets/resources/` 下。

原因很简单：

- `cc.loader.loadRes` 只能稳定加载 `resources` 下的资源
- 代码里现在已经统一按资源路径加载
- 场景和 prefab 中原来的引用只是历史兜底，不再作为维护入口

### 路径写法

JSON 里填写的是资源相对路径，不要带 `assets/resources/` 根目录，但要写真实文件后缀。

现在推荐使用“基础路径 + 短文件名”的写法，避免每个字段都写完整路径。

例如：

实际文件：

```text
assets/resources/texture/match3/skin/current/ground/border/water_bg_1.png
```

完整写法也能识别：

```json
"texture/match3/skin/current/ground/border/water_bg_1.png"
```

但当前推荐写法是：

```json
{
  "_bases": {
    "texture": "texture/match3/skin/current/ground/border"
  },
  "themes": {
    "water": {
      "_base": "texture",
      "cellBase": [
        "water_bg_1.png"
      ]
    }
  }
}
```

不要写：

```text
assets/resources/texture/match3/skin/current/ground/border/water_bg_1.png
```

### prefab 也一样

例如：

实际文件：

```text
assets/resources/prefab/match3/gridBoard.prefab
```

完整写法：

```json
"prefab/match3/gridBoard.prefab"
```

当前推荐写法：

```json
{
  "prefabs": {
    "_base": "prefab/match3",
    "gridBoard": "gridBoard.prefab"
  }
}
```

### `_bases`

`_bases` 是顶层基础路径表。

当前默认值：

| 名称 | 实际路径 | 用途 |
| --- | --- | --- |
| `prefab` | `prefab/match3` | 主玩法 prefab |
| `texture` | `texture/match3/skin/current/ground/border` | 格子底图、边框和地面装饰 |

### `_base`

`_base` 可以写在 `prefabs`、某个主题、`ground` 里，表示这一组资源默认从哪个基础路径开始找。

示例：

```json
"prefabs": {
  "_base": "prefab/match3",
  "gridBoard": "gridBoard.prefab",
  "cellItem": "cellBase.prefab"
}
```

这里实际会加载：

```text
assets/resources/prefab/match3/gridBoard.prefab
assets/resources/prefab/match3/cellBase.prefab
```

## 2. 当前 JSON 结构

现在 `default.json` 分成 4 个大块：

```json
{
  "_bases": {},
  "prefabs": {},
  "themes": {},
  "ground": {}
}
```

### 2.1 `prefabs`

这一层管“节点模板”，也就是可以直接 `cc.instantiate()` 的 prefab。

### 2.2 `themes`

这一层管“棋盘皮肤”，包括：

- 格子底图
- 棋盘外圈边框
- 棋盘内侧边框
- 水面/复杂地块拼接图

### 2.3 `ground`

这一层管“底层装饰图”，比如：

- 荷叶
- 女孩路径

## 3. `prefabs` 字段说明

`prefabs` 里放的是资源键名和路径。代码只认键名，具体资源路径由你改。

当前推荐字段如下：

| key | 作用 | 默认资源 |
| --- | --- | --- |
| `gridBoard` | 主玩法棋盘根节点 | `gridBoard.prefab` |
| `groundBase` | 格子底板/底图节点 | `ground.prefab` |
| `groundItem` | 地块主 item 节点 | `groundUp.prefab` |
| `cellItem` | 普通元素节点 | `cellBase.prefab` |
| `upGroundItem` | 上层覆盖物节点 | `upGround.prefab` |
| `gnome` | 蘑菇/收集角色节点 | `gnome.prefab` |
| `turtles` | 乌龟收集角色节点 | `turtles.prefab` |
| `crab` | 螃蟹收集角色节点 | `crab.prefab` |
| `monkeyTree` | 猴子树节点 | `monkeyTree.prefab` |
| `gem` | 宝石收集节点 | `Cells/Gem.prefab` |
| `firefly` | 萤火虫收集节点 | `Cells/Firefly.prefab` |
| `wall` | 墙体节点 | `Cells/Wall.prefab` |
| `tuituji` | 推土机/除草机节点 | `Cells/ground/o2box.prefab` |
| `ivy` | 藤蔓/水草节点 | `Cells/Shuicao.prefab` |
| `exit` | 出口节点 | `Cells/Exit.prefab` |
| `shanhuAni` | 珊瑚/破碎动画节点 | `Cells/shanhuFX.prefab` |
| `portal` | 传送门节点 | `Cells/Portal.prefab` |
| `novice` | 新手引导节点数组 | `Cells/Nov_grass.prefab`, `Cells/Bomb.prefab` |

### 3.1 哪些是必须有的

下面这些是主玩法棋盘链路的核心资源，建议保持可用：

- `gridBoard`
- `groundBase`
- `groundItem`
- `cellItem`
- `upGroundItem`

下面这些是常用特殊元素，建议也尽量保留：

- `gnome`
- `turtles`
- `crab`
- `monkeyTree`
- `gem`
- `firefly`
- `wall`
- `tuituji`
- `ivy`
- `exit`
- `shanhuAni`
- `portal`

### 3.2 `novice` 是数组

`novice` 不是单个 prefab，而是数组。

```json
"novice": [
  "Cells/Nov_grass.prefab",
  "Cells/Bomb.prefab"
]
```

如果后面你要换新手引导表现，只要按顺序替换数组里的资源即可。

## 4. `themes` 字段说明

`themes` 按背景类型拆分。

当前代码里使用的主题 key 是：

| key | 对应背景 |
| --- | --- |
| `water` | 水主题 |
| `grass` | 草地主题 |
| `sand` | 沙滩主题 |

背景类型不是随便写的，它和关卡 JSON 里的 `levelInfo.background` 相关。

### 4.1 `cellBase`

格子底图。

这是你最常调的地方，因为它决定“每个格子长什么样”。

示例：

```json
"cellBase": [
  "water_bg_1.png"
]
```

可以写 1 张，也可以写 2 张做交替底图。

### 4.2 `upBorders`

外圈边框图。

不要改 key，只改 value 路径。

当前 key：

- `0001`
- `0011`
- `0101`
- `0110`
- `0111`

如果你换成更通用的风格，比如菌丝、岩边、发光边，只要保持这些 key 不变即可。

### 4.3 `middleBorders`

内侧边框图。

当前 key：

- `0100`
- `1000`
- `1100`

这部分通常用于格子交界处、边缘收口、半边过渡。

### 4.4 `complexGround`

复杂拼接图。

当前主要用于水面拼接，但代码已经抽成通用配置。

可用 key：

- `0001`
- `0010`
- `0011`
- `0100`
- `0101`
- `0110`
- `0111`
- `1000`
- `1001`
- `1010`
- `1011`
- `1100`
- `1101`
- `1110`
- `1111`

如果某个主题不需要复杂拼接，可以留空对象：

```json
"complexGround": {}
```

## 5. `ground` 字段说明

这层只放底层装饰图。

### 5.1 `lotusleaf`

荷叶图，用于传送带/流水格之类的底层表现。

```json
"lotusleaf": "lotusleaf.png"
```

### 5.2 `girlRoad`

女孩路径底图。

```json
"girlRoad": "girlRoad.png"
```

## 6. 当前代码已经从哪里取资源

现在棋盘链路主要从 `Match3Skin` 取以下资源：

- `MainCtrl` 取 `gridBoard`
- `GroundViewCtrl` 取 `groundBase / groundItem / gnome / turtles / crab / monkeyTree / gem / firefly`
- `ItemGroundCtrl` 取 `wall / tuituji / ivy / exit / shanhuAni / lotusleaf / girlRoad`
- `UpGroundViewCtrl` 取 `upGroundItem / portal`
- `BasicCellViewCtrl` 取 `cellItem`
- `ItemUpgroundCtrl` 取 `novice`

所以你以后改图，主要就是改 JSON 里的路径，不要再去场景上拖资源。

## 7. 推荐测试顺序

如果你要测试换皮，按这个顺序来最稳：

1. 先换 `themes.water.cellBase`
2. 再换 `themes.water.upBorders`
3. 再换 `themes.water.middleBorders`
4. 再换 `themes.water.complexGround`
5. 再换 `ground.lotusleaf` / `ground.girlRoad`
6. 最后换 `prefabs` 里的特殊节点

这样一层层测，出问题也容易定位。

## 8. 尺寸建议

大部分棋盘格子相关资源建议控制在：

```text
84 x 84
```

如果是 prefab 节点：

- 视觉中心要尽量居中
- 锚点最好保持默认或和原资源一致
- 动画节点不要自己改得太大，不然会溢出格子

## 9. 常见错误

### 9.1 路径写错

如果控制台提示 `loadRes res is null`，通常是路径写错了。

优先检查：

- 是否放在 `assets/resources/`
- 是否少写了目录
- 是否没写真实后缀，例如 `.png`、`.jpg`、`.prefab`

### 9.2 资源放错目录

如果资源不在 `assets/resources/` 下，即使 JSON 写对了也加载不到。

### 9.3 只换了一个主题

如果关卡 `background` 是 `2`，但你只改了 `water` 主题，那么你看不到变化。

要么改关卡背景编号，要么把同样的资源也同步到对应主题里。

### 9.4 prefab 节点缺失

如果某个 `prefabs` 键没有资源，游戏会在控制台报缺失。

这类错误要优先修，不要靠场景里旧 prefab 兜底。

## 10. 你后面最常改的地方

如果你是“不懂程序，只改资源”的使用方式，后面最常碰的就是这三块：

1. 格子底图
2. 格子边框
3. 上层装饰和特殊元素

对应修改位置就是：

- `themes`
- `ground`
- `prefabs`

这就是现在这套资源中心的维护入口。
