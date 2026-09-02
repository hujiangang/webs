# Match3 ResCtrl 资源配置说明

本文档说明 `Match3.fire` 场景里原来挂在 `ResCtrl` 组件上的资源，现在应该如何通过配置文件维护。

面向对象：

- 不懂程序、只需要替换资源的人。
- 后续关卡、美术、换皮整理人员。
- 后续继续重构 Match3 的开发人员。

## 1. 配置文件位置

```text
assets/resources/config/match3_res/default.json
```

对应代码入口：

```text
assets/Script/Logic/Match3/ResCtrl.ts
```

旧位置：

```text
assets/Scene/Match3.fire
```

旧场景里的 `ResCtrl` 组件只保留脚本挂载关系，不再作为资源维护入口。以后不要再去 `Match3.fire` 里给 `ResCtrl` 拖资源。

## 2. 当前加载规则

`match3_res/default.json` 现在不再写 UUID。所有资源都通过 `assets/resources/` 下的路径加载。

配置采用“基础路径 + 短文件名”的写法，避免每一项都写完整路径。

实际文件：

```text
assets/resources/texture/match3/objects/cells/obj0.png
```

配置写法：

```json
{
  "_bases": {
    "cells": "texture/match3/objects/cells"
  },
  "NormalCellFrame": {
    "_base": "cells",
    "items": [
      "obj0.png"
    ]
  }
}
```

不要写：

```text
assets/resources/texture/match3/cell/red_mushroom.png
```

配置里建议写真实后缀，比如 `.png`、`.jpg`、`.prefab`。代码加载时会自动去掉后缀，所以写后缀主要是为了让人一眼看出资源格式。

### 2.1 `_bases`

`_bases` 是基础路径表，放在 JSON 顶层。

当前默认值：

| 名称 | 实际路径 | 用途 |
| --- | --- | --- |
| `cells` | `texture/match3/objects/cells` | 普通元素、障碍、目标图标 |
| `boxes` | `texture/match3/objects/cells/box` | 箱子图片 |
| `groundTexture` | `texture/match3/ground/border` | 地块相关图片 |
| `cellPrefabs` | `prefab/match3/Cells` | 元素和特殊元素 prefab |
| `moveGround` | `prefab/match3/Cells/ground` | 可移动土地边框 prefab 和中心图 |

### 2.2 `_base`

每个资源模块可以指定自己的 `_base`。

示例：

```json
"boxFrames": {
  "_base": "boxes",
  "items": [
    "fullbox1.png",
    "fullbox2.png",
    "fullbox3.png"
  ]
}
```

这里实际会加载：

```text
assets/resources/texture/match3/objects/cells/box/fullbox1.png
assets/resources/texture/match3/objects/cells/box/fullbox2.png
assets/resources/texture/match3/objects/cells/box/fullbox3.png
```

### 2.3 `items`

`items` 是数组，表示一组资源。数组顺序不能随便改，因为代码按下标取资源。

示例：

```json
"BombStaticFrame": {
  "_base": "cells",
  "items": [
    "obj100.png",
    "obj101.png",
    "obj101.png",
    "obj103.png",
    "obj104.png"
  ]
}
```

### 2.4 `path`

`path` 用于单个资源。

示例：

```json
"groundCenter": {
  "_base": "moveGround",
  "path": "center.png"
}
```

实际会加载：

```text
assets/resources/prefab/match3/Cells/ground/center.png
```

## 3. 字段总览

| 字段 | 类型 | 作用 | 当前来源 |
| --- | --- | --- | --- |
| `BombFlashingBg` | SpriteFrame 数组 | 炸弹底部闪光背景 | `cells` |
| `BombStaticFrame` | SpriteFrame 数组 | 炸弹静态图 | `cells` |
| `NormalCellFrame` | SpriteFrame 数组 | 普通基础元素图片 | `cells` |
| `pearlFrame` | SpriteFrame | 花机制下的珍珠/替代表现 | `cells` |
| `Map2NormalCellFrame` | SpriteFrame 数组 | 背景 2 下的普通元素替换图 | `cells` |
| `CellPrefab` | Prefab 数组 | 特殊基础元素 prefab | `cellPrefabs` |
| `lockFrames` | SpriteFrame 数组 | 锁链图片 | `cells` |
| `boxFrames` | SpriteFrame 数组 | 木箱/彩箱图片 | `boxes` |
| `iceFrames` | SpriteFrame 数组 | 冰块图片 | `cells` |
| `stoneFrames` | SpriteFrame 数组 | 石头图片 | `cells` |
| `LeaveFrames` | SpriteFrame 数组 | 叶子/草地/菌苔地块图片 | `cells` |
| `GroundFrames` | SpriteFrame 数组 | 可移动土地等级图 | `cells` |
| `GemFrames` | SpriteFrame 数组 | 宝石/孢晶图片 | `groundTexture` |
| `FlowerFrames` | SpriteFrame 数组 | 花地块等级图 | `cells` |
| `FireflyFrames` | SpriteFrame 数组 | 萤火虫/发光孢子图片 | `cells` |
| `CollectIcon` | SpriteFrame 数组 | 目标 UI 图标 | `cells` |
| `groundPrefabs` | Prefab 数组 | 可移动土地四方向边框 prefab | `moveGround` |
| `groundCenter` | SpriteFrame | 可移动土地中心底图 | `moveGround` |
| `rocketPrefab` | Prefab | 火箭/追踪组合 prefab | `cellPrefabs` |
| `mushroomFrames` | SpriteFrame 数组 | 蘑菇地块图片 | `cells` |

## 4. 数组顺序说明

配置里的数组顺序不能随便改，因为代码按下标读取。

### 4.1 `NormalCellFrame`

普通元素贴图，按 `CellType` 数字下标取图。

| 下标 | 当前类型 | 菌子化建议 |
| ---: | --- | --- |
| 0 | Apple | 红帽菇 |
| 1 | Leaf | 绿伞菇 |
| 2 | Grape | 紫褶菇 |
| 3 | Pear | 黄油菇 |
| 4 | Water | 蓝露菇 |
| 5 | Flower | 粉孢菇 |
| 6 | Banana 位置，但实际使用 prefab | 通常可留原值或空 |
| 7 | IceCream 位置，但实际使用 prefab | 通常可留原值或空 |
| 8 | Coconut | 栗圆菇 |
| 9 | BrokenConch | 裂菌石 |
| 10 | Fish 位置，但实际使用 prefab | 通常可留原值或空 |
| 11 | Conch 位置，但实际使用 prefab | 通常可留原值或空 |
| 12 | BottleCaps | 菌液瓶 |
| 13 | Ground 位置 | 通常由 `groundCenter / groundPrefabs` 控制 |
| 14 | 预留 | 可留 `null` |

### 4.2 `BombFlashingBg`

炸弹底部光效背景。

| 下标 | 对应类型 | 功能 |
| ---: | --- | --- |
| 0 | `Bomb1` | 范围爆炸 |
| 1 | `Bomb2` | 横向消除 |
| 2 | `Bomb3` | 竖向消除 |
| 3 | `Bomb4` | 追踪目标 |
| 4 | `Bomb5` | 同色消除 |

### 4.3 `BombStaticFrame`

炸弹静态图，顺序同 `BombFlashingBg`。

### 4.4 `CellPrefab`

特殊基础元素 prefab。

| 下标 | 对应类型 | 功能 |
| ---: | --- | --- |
| 0 | `Bomb1` | 范围爆炸 prefab |
| 1 | `Bomb2` | 横向消除 prefab |
| 2 | `Bomb3` | 竖向消除 prefab |
| 3 | `Bomb4` | 追踪目标 prefab |
| 4 | `Bomb5` | 同色消除 prefab |
| 5 | `Fish` | 爆炸鱼/爆孢菇 |
| 6 | `Girl` | 路径角色 |
| 7 | `Conch` | 路径目标 |
| 8 | `Banana` | 旁消障碍 |
| 9 | `IceCream` | 出口收集物 |

### 4.5 `boxFrames`

木箱图片。当前代码按下面规则取图：

```text
最终下标 = (box_type + 1) * 3 + (box_level - 1)
```

如果没有 `box_type`，使用普通箱子：

```text
最终下标 = box_level - 1
```

因此建议每一种箱子颜色准备 3 层图。

### 4.6 `groundPrefabs`

可移动土地四方向边框 prefab。

| 下标 | 方向 | 节点名 |
| ---: | --- | --- |
| 0 | 上 | `up` |
| 1 | 下 | `down` |
| 2 | 左 | `left` |
| 3 | 右 | `right` |

中心底图不在这里，而在：

```json
"groundCenter": "..."
```

## 5. 和 Match3Skin 的分工

现在 Match3 有两个资源配置入口。

### 5.1 `match3_res/default.json`

负责元素和障碍：

- 普通元素图片。
- 炸弹图片和 prefab。
- 箱子、锁链、冰块、石头。
- 叶子、花、萤火虫、蘑菇。
- 可移动土地中心和四边 prefab。
- 目标 UI 图标。

### 5.2 `match3_skin/default.json`

负责棋盘皮肤和场景节点：

- `gridBoard` 棋盘根 prefab。
- `groundBase` 格子底板 prefab。
- `groundItem` 底层 item prefab。
- `cellItem` 基础元素 item prefab。
- `upGroundItem` 上层覆盖物 item prefab。
- 格子底图 `cellBase`。
- 棋盘边框 `upBorders / middleBorders / complexGround`。
- 荷叶、女孩路径等底层装饰。

简单判断：

- 想换“元素图标、障碍图标、目标图标”，改 `match3_res/default.json`。
- 想换“棋盘格子底、格子边框、棋盘相关 prefab”，改 `match3_skin/default.json`。

## 6. 推荐资源替换流程

1. 把新图片或 prefab 放到 `assets/resources/` 下。
2. 在 Cocos Creator 中等待资源导入完成，确认生成 `.meta`。
3. 打开 `assets/resources/config/match3_res/default.json`。
4. 把对应字段的短文件名替换成新资源短文件名。
5. 运行游戏，从 `开始游戏 -> LoadingScene -> Match3` 进入第一关验证。
6. 如果控制台出现 `[ResCtrl] load asset failed` 或 `loadRes res is null`，优先检查路径。

## 7. 常见错误

### 7.1 配置文件没有 meta

如果新增了：

```text
assets/resources/config/match3_res/default.json
```

但没有：

```text
assets/resources/config/match3_res/default.json.meta
```

Cocos 可能不会把它导入资源系统，运行时就会加载不到配置。

本项目已经补上：

```text
assets/resources/config/match3_res.meta
assets/resources/config/match3_res/default.json.meta
```

### 7.2 resources 路径写错

控制台常见错误：

```text
loadRes res is null
```

处理方式：

- 不要写 `assets/resources/` 前缀。
- 要写真实文件后缀，例如 `.png`、`.jpg`、`.prefab`。
- 确认资源已经在 Cocos Creator 里导入成功。

### 7.3 `_base` 写错

如果 `_base` 写错，整组资源都会加载失败。

例如：

```json
"NormalCellFrame": {
  "_base": "cells",
  "items": [
    "obj0.png"
  ]
}
```

这里的 `cells` 必须能在顶层 `_bases` 找到：

```json
"_bases": {
  "cells": "texture/match3/objects/cells"
}
```

### 7.4 prefab 里缺组件

如果替换 prefab 后报错，通常不是图片问题，而是 prefab 上缺脚本组件。

例如：

- `groundItem` 必须有 `ItemGroundCtrl`。
- `cellItem` 必须有 `ItemBasicCellCtrl`。
- `upGroundItem` 必须有 `ItemUpgroundCtrl`。
- `gridBoard` 必须保留原有层级节点和 `GroundViewCtrl / BasicCellViewCtrl / UpGroundViewCtrl` 所需节点。

只换视觉时，推荐复制原 prefab 后替换里面的图片，不要从空节点重新做。

## 8. 后续重构建议

当前已经完成第一步：把 `Match3.fire -> ResCtrl` 上的资源迁到配置文件。

后续建议继续做三件事：

1. 把 `EffLayerCtrl` 上的大量特效 prefab 也迁到配置。
2. 把 `CollectItemCtrl / PropCtrl / SelectPropCtrl` 中仍靠 Inspector 配置的 UI 图标迁到配置。
3. 等资源都走配置后，再清理 `Match3.fire` 里旧的 `ResCtrl` 序列化字段，并在编辑器里重新保存场景。

不要现在直接手删 `Match3.fire` 的旧序列化字段。Cocos 场景文件结构复杂，手删容易破坏场景。建议等编辑器能正常打开后，在 Inspector 中确认脚本字段已不显示，再保存场景让编辑器自动清理。
