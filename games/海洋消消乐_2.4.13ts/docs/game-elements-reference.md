# 游戏元素总表

本文档整理当前项目 Match3 主玩法中的所有核心元素、特殊元素、障碍、地块、收集目标与玩家道具。文档面向策划、美术和后续开发使用，重点说明：

- 当前代码中的元素类型和值。
- 现有功能逻辑。
- 现有表现方式。
- 后续改成“菌子元素消消乐”时的替换建议。

主要代码来源：

- `assets/Script/Logic/Data/Const/Constant.ts`
- `assets/Script/Logic/Match3/ResCtrl.ts`
- `assets/Script/Logic/Match3/Model/CellModel.ts`
- `assets/Script/Logic/Match3/Model/BombModel.ts`
- `assets/Script/Logic/Match3/Model/GroundCellModel.ts`
- `assets/Script/Logic/Match3/Model/UpGroundCellModel.ts`
- `assets/Script/Logic/Match3/View/ItemBasicCellCtrl.ts`
- `assets/Script/Logic/Match3/View/ItemGroundCtrl.ts`
- `assets/Script/Logic/Match3/View/ItemUpgroundCtrl.ts`
- `assets/Script/Logic/Match3/Model/PropModel.ts`

关卡配置文件路径：

- 源码/资源实际路径：`assets/resources/config/level/new/`
- 在 Cocos Creator 资源系统中的相对路径：`resources/config/level/new/`
- 常见文件名形式：`levels-01/0001.json`、`levels-02/0101.json`、`levels-05/0499.json`

## 1. 元素层级

当前棋盘每个格子最多由三层组成：

| 层级 | 数据类型 | 说明 | 表现位置 |
| --- | --- | --- | --- |
| 基础元素层 | `CellType` | 普通可交换元素、特殊炸弹、部分特殊目标 | `ItemBasicCellCtrl` |
| 上层覆盖物 | `UpGroundType` | 箱子、锁链、冰块、石头、引导草等覆盖障碍 | `ItemUpgroundCtrl` |
| 底层地块 | `GroundType` | 水、草地/叶子、藤蔓、花、萤火虫、蘑菇、传送/出口等 | `ItemGroundCtrl` |

实际玩法中，基础元素负责交换、下落、三消、炸弹合成；上层覆盖物会压住基础元素或跟随基础元素；底层地块决定格子是否可走、是否可出生、是否可掉落、是否承担特殊目标。

## 2. 普通可交换元素

这些是最基础的三消元素。它们通过 `CellType` 定义，通常参与交换、下落、三连消除、目标收集和炸弹匹配。

| CellType | 数值 | 当前代码名 | 当前含义/旧主题 | 功能 | 当前表现 | 菌子化建议 |
| --- | ---: | --- | --- | --- | --- | --- |
| `Apple` | 0 | 苹果 | 普通元素 1 | 可交换、可三消、可作为收集目标 | `ResCtrl.NormalCellFrame[0]`，森林背景时可能用 `Map2NormalCellFrame[0]` | 红帽蘑菇 |
| `Leaf` | 1 | 叶子 | 普通元素 2 | 可交换、可三消、可作为收集目标 | `NormalCellFrame[1]` | 绿伞菌 |
| `Grape` | 2 | 葡萄 | 普通元素 3 | 可交换、可三消、可作为收集目标 | `NormalCellFrame[2]` | 紫褶菌 |
| `Pear` | 3 | 梨 | 普通元素 4 | 可交换、可三消、可作为收集目标 | `NormalCellFrame[3]` | 黄油菌 |
| `Water` | 4 | 水 | 普通元素 5 | 可交换、可三消、可作为收集目标 | `NormalCellFrame[4]` | 蓝露菇 |
| `Flower` | 5 | 花 | 普通元素/特殊花机制目标 | 可作为普通元素消除；花地块机制会触发生成/替换 | `NormalCellFrame[5]`；在花机制存在时可能显示 `pearlFrame` | 粉孢菇或花菇 |
| `Coconut` | 8 | 椰子 | 普通元素/生成物 | 可交换、可消除、可作为目标；部分逻辑中由地图机制生成 | `NormalCellFrame[8]`，如果资源数组配置存在 | 栗色圆菇 |

说明：

- 普通元素的实际出现概率由关卡配置 `chipset` 控制。
- 三个及以上同色普通元素可消除。
- 普通元素被消除后会触发小爆特效、声音、计分、掉落补位。
- 目前 `CellType` 中普通元素编号不完全连续：`Banana/IceCream/BrokenConch/Fish/Conch/BottleCaps/Ground` 穿插在普通和特殊之间，因此后续菌子化时不要只按数字连续替换资源，要按代码含义替换。

## 3. 基础层特殊目标/不可普通消除元素

这些元素属于 `CellType`，但不是普通三消元素，往往有特殊消除条件或特殊移动规则。

| CellType | 数值 | 当前代码名 | 当前含义/旧主题 | 功能 | 当前表现 | 菌子化建议 |
| --- | ---: | --- | --- | --- | --- | --- |
| `Banana` | 6 | 香蕉 | 旁消障碍 | 不能普通三消直接消除；旁边发生普通消除或特定炸弹时扣层/消除 | `CellPrefab[8]` prefab 动画；受击时播放 prefab 动画 | 硬壳菌/厚皮蘑菇，需要旁边消除破壳 |
| `IceCream` | 7 | 冰淇淋 | 出口收集物 | 不可普通消除；会随重力移动，到达出口格 `exit` 后自动收集 | `CellPrefab[9]` prefab 动画；落地时可播放动画 | 孢子瓶/菌篮，需要运送到出口 |
| `BrokenConch` | 9 | 破碎贝壳 | 旁消障碍 | 当前生命值来自 `BrokenConchHp`，只能旁消或炸弹处理 | 静态或普通 frame，受击播放破碎特效 | 裂纹菌石 |
| `Fish` | 10 | 爆炸鱼 | 特殊可引爆元素 | 本身不是 `Bomb1~Bomb5` 范围内，但被代码作为炸弹鱼处理；三消或被炸弹波及会触发 3x3 爆炸 | `CellPrefab[5]` Spine；idle 名 `baozhayu_xiuxian`，爆炸 `baozhayu_bom` | 孢子鱼可替换为“爆孢菇” |
| `Conch` | 11 | 完整贝壳 | 女孩路径目标 | 无敌，不普通掉落；只能被女孩/特殊路径机制踩掉 | `CellPrefab[7]` Spine | 封印菌核 |
| `BottleCaps` | 12 | 水杯/计数器 | 旁消计数器 | 只能旁消；带 `counter_level` 层数/数值；被消除可影响步数或目标 | 静态 frame 加数字 label | 菌液瓶/孢子罐 |
| `Ground` | 13 | 可移动土地 | 携带宝石的移动地块 | 基础层地块元素，可移动；可能带 `gem` 等级，消除后收集宝石 | 使用 `groundCenter`、`groundPrefabs`、`GroundFrames`、`GemFrames` | 菌土块/菌丝土，宝石改为发光孢晶 |
| `Girl` | 199 左右 | 小女孩/美人鱼 | 路径型特殊对象 | 无敌，不普通消除；通过 `girl.path` 移动并踩掉 `Conch` 等目标 | `CellPrefab[6]` Spine，动画包括跳跃 | 菌灵角色/采菇人 |
| `Lighting` | 枚举在 `Girl` 后 | 闪电 | 预留/少见 | 当前主逻辑中未看到稳定主流程使用 | 未确认 | 后续可改为菌丝闪电或移除 |

## 4. 可合成特殊元素/炸弹

`CellType.Bomb1` 到 `CellType.Bomb100` 之间被 `Common.isBombType()` 判断为炸弹。当前有效炸弹主要是 `Bomb1~Bomb5`，另有 `Bomb6/Bomb7` 枚举但核心逻辑里不是常规合成产物。

| CellType | 数值 | 当前代码名 | 当前旧主题 | 生成方式 | 功能 | 表现 |
| --- | ---: | --- | --- | --- | --- | --- |
| `Bomb1` | 100 | 圆形炸弹 | 气泡鱼/贝壳炸弹 | 4 个以上合成；道具 `BeikeBomb` 可指定生成 | 范围爆炸，默认使用 5x5 去角范围；组合时可扩大 | `CellPrefab[0]` Spine；背景光 `BombFlashingBg[0]`；爆炸特效 `bombEffPrefab` |
| `Bomb2` | 101 | 横向炸弹 | 剑鱼/横向弹 | 4 连或特定形状合成；开始道具可生成 | 消除整行 | `CellPrefab[1]` Spine；发射特效 `rowColBombPrefab`，水平 |
| `Bomb3` | 102 | 竖向炸弹 | 竖向弹 | 4 连或特定形状合成 | 消除整列 | `CellPrefab[2]` Spine；发射特效 `rowColBombPrefab` 旋转 90 度 |
| `Bomb4` | 103 | 章鱼 | 飞机/章鱼 | 特定合成或关卡预置 | 飞向目标优先级最高的目标格，并对落点执行一次爆炸/消除 | `CellPrefab[3]` Spine；跳跃特效 `zyJumpPrefab`、落点特效 `zyJumpOverPrefab` |
| `Bomb5` | 104 | 彩虹炸弹 | 海马/闪星 | 五连或开始道具生成 | 消除棋盘上同一种元素；和其他炸弹交换时批量转换并引爆 | `CellPrefab[4]` Spine；彩虹特效 `rainbowBombPrefab`、射线 `shootStarPrefab` |
| `Bomb6` | 105 | 螃蟹炸弹 | 螃蟹 | 枚举存在，主要作为 `ElimateType.Bomb6` 和多格螃蟹目标相关 | 可触发范围/多格目标消除，非普通合成主线 | 表现依赖多格目标/特效，需二次确认 |
| `Bomb7` | 106 | 十字蛋 | 十字特殊 | 枚举存在，当前核心合成逻辑未完整使用 | 预留或旧版本功能 | 需二次确认 |

### 4.1 特殊元素替换方向

当前 `Bomb1~Bomb5` 的表现强绑定海洋主题，例如气泡鱼、剑鱼、章鱼、海马。菌子化版本不建议继续使用这些具体生物形象。更稳妥的方向是改成通用消除特效件：功能沿用原逻辑，视觉表现简化为图形、光效、孢子、菌丝和能量扩散。

这样做有三个好处：

- 不需要重写复杂炸弹逻辑，只替换资源和显示名称。
- 美术制作成本低，不必做大量角色 Spine。
- 玩家更容易理解功能：看到横线就是横消，看到竖线就是竖消，看到彩色核心就是同色清除。

推荐替换方案：

| 底层类型 | 当前海洋表现 | 推荐新名称 | 功能说明 | 简化表现建议 | 资源复杂度 |
| --- | --- | --- | --- | --- | --- |
| `Bomb1` | 气泡鱼/贝壳炸弹 | 孢子爆弹 | 以自身为中心范围爆炸 | 一个圆形孢子球，触发时向外扩散一圈半透明冲击波 | 低 |
| `Bomb2` | 横向剑鱼 | 横向菌丝 | 清除整行 | 元素上叠一条横向发光菌丝，触发时左右扫光 | 低 |
| `Bomb3` | 竖向炸弹 | 纵向菌丝 | 清除整列 | 元素上叠一条竖向发光菌丝，触发时上下扫光 | 低 |
| `Bomb4` | 章鱼/飞机 | 追踪孢子 | 飞向目标并消除落点 | 一个小孢子光点或小蘑菇弹跳到目标，不需要复杂角色动作 | 中低 |
| `Bomb5` | 海马/彩虹炸弹 | 彩孢核心 | 清除同色元素；组合时批量转化 | 彩色菌核/发光核心，触发时发出多条光线连接同色元素 | 中 |

备选通用命名：

| 类型 | 偏菌子主题 | 更通用主题 | 极简功能名 |
| --- | --- | --- | --- |
| `Bomb1` | 孢子爆弹 | 能量爆弹 | 范围炸弹 |
| `Bomb2` | 横向菌丝 | 横向光束 | 横消 |
| `Bomb3` | 纵向菌丝 | 纵向光束 | 竖消 |
| `Bomb4` | 追踪孢子 | 追踪光点 | 定点消除 |
| `Bomb5` | 彩孢核心 | 彩虹核心 | 同色消除 |

建议最终采用“偏菌子主题”的第一列：`孢子爆弹 / 横向菌丝 / 纵向菌丝 / 追踪孢子 / 彩孢核心`。它们既贴合新主题，又不会像海洋动物一样要求复杂角色动画。

表现原则：

- 图标必须直接表达功能，不要让玩家猜。
- 特效优先用缩放、发光、扫线、粒子和冲击波，不优先做复杂骨骼角色。
- `Bomb2` 和 `Bomb3` 必须在静态状态下明显区分横竖方向。
- `Bomb4` 需要有“自动找目标”的感觉，但不需要保留章鱼跳跃角色，可以改成小光点弹射。
- `Bomb5` 需要保留最高级特殊元素的感觉，可用彩色核心、彩色孢子环或多色光线。

合成表现：

- 合成时普通元素会向中心移动，播放速度线 `mergeBombPrefab`。
- 新炸弹生成后播放 `bombCreate` 动画，再进入 idle 动画。
- 炸弹底部会显示特殊光效 `teshuLight`，由 `BombFlashingBg` 决定颜色/样式。

## 5. 炸弹互换组合

两个炸弹交换时会触发复合效果，由 `BombModel.onBombMergeBomb()` 处理。

| 组合 | 功能 | 当前表现 |
| --- | --- | --- |
| `Bomb1 + Bomb1` | 形成大范围爆炸，范围约 7x7 去角 | `playBombAndBomb()`，动画名 `hetunHeti`，随后大爆炸 |
| `Bomb1 + Bomb2` | 三行宽十字方向爆炸 | `threeColAndRow()`，组合特效 `jianyuHetun` |
| `Bomb1 + Bomb3` | 三列/三行宽十字方向爆炸 | `threeColAndRow()` |
| `Bomb2 + Bomb2` | 横竖十字爆破 | `colAndRow()`，组合特效 `jianyuJianyu` |
| `Bomb2 + Bomb3` | 横竖十字爆破 | `colAndRow()` |
| `Bomb3 + Bomb3` | 横竖十字爆破 | `colAndRow()` |
| `Bomb4 + Bomb1` | 章鱼飞向目标，在落点生成/执行圆形爆炸 | `playZyJump()`，可带 `zhangyu_tiao_hetun` |
| `Bomb4 + Bomb2` | 章鱼飞向目标，在落点生成/执行横向炸弹 | `playZyJump()`，可带 `zhangyu_tiao_jianyu` |
| `Bomb4 + Bomb3` | 章鱼飞向目标，在落点生成/执行竖向炸弹 | `playZyJump()` |
| `Bomb4 + Bomb4` | 生成/触发 3 次章鱼飞行消除 | `playZhangyuAndZhangyu()`，动画名 `zhangyuZhangyu` |
| `Bomb5 + Bomb1` | 随机/指定一批普通元素变成圆形炸弹并引爆 | `fireRainbow()`，组合动画 `hetunHaima` |
| `Bomb5 + Bomb2` | 一批普通元素变成横向炸弹并引爆 | `fireRainbow()`，组合动画 `jianyuHaima` |
| `Bomb5 + Bomb3` | 一批普通元素变成竖向炸弹并引爆 | `fireRainbow()` |
| `Bomb5 + Bomb4` | 一批普通元素变成章鱼并触发 | `playHaimaAndZhangyu()` |
| `Bomb5 + Bomb5` | 全棋盘波纹式清除 | `playHaimaAndHaima()`，全局多圈消除 |

## 6. 上层覆盖物/障碍

上层覆盖物通过 `UpGroundType` 管理。它们覆盖在基础元素上，可能阻止下落、阻止交换、阻止基础元素被直接消除。

| UpGroundType | 数值 | 当前名称 | 配置字段 | 功能 | 消除方式 | 表现 |
| --- | ---: | --- | --- | --- | --- | --- |
| `Box` | 10001 | 木箱 | `box_level`, `box_type` | 阻挡格子或覆盖元素，可作为收集目标 `box/colorbox` | 旁边消除或炸弹命中扣层；`box_type` 指定颜色时需要对应类型旁消 | `boxFrames`；破碎特效 `boxBrokenPrefab`；动画名如 `box2to1` |
| `Lock` | 10002 | 锁链 | `locks` | 锁住基础元素，阻止下落/交换 | 消除覆盖元素或炸弹命中扣层 | `lockFrames` |
| `Ice` | 10003 | 冰块 | `ice` | 覆盖基础元素，跟随绑定元素移动 | 消除覆盖元素或炸弹命中扣层 | `iceFrames`；会跟随基础元素位置 |
| `Portal` | 10004 | 传送门 | `portal_idx` | 传送入口/出口逻辑实际在底层格子上处理 | 不作为普通可消除障碍 | `portalPrefab`，当前 `syncPortal` 逻辑注释较多，需实测 |
| `Stone` | 10005 | 石头 | `stone` | 阻挡型障碍，可作为收集目标 `stone` | 先被炸弹打碎，再可旁消扣层 | `stoneFrames` |
| `Nov_grass` | 11000 | 新手草 | `nov_grass` | 新手引导专用覆盖物 | 引导流程强制清除 | `novicePrefab` Spine |
| `Nov_conch` | 11001 | 新手贝壳 | `nov_conch` | 新手引导专用覆盖物/爆炸贝壳教学 | 引导流程强制触发 | `novicePrefab` Spine，相关代码大多注释 |

## 7. 底层地块/格子机制

底层地块通过 `GroundType` 管理，决定棋盘可走性、阻挡、收集目标和特殊机制。

| GroundType | 数值 | 当前名称 | 配置字段 | 功能 | 消除/触发 | 表现 |
| --- | ---: | --- | --- | --- | --- | --- |
| `None` | 20000 | 无特殊地块 | 无 | 普通可用格 | 无 | 默认底板 |
| `Water` | 20001 | 水/不可移动水面 | `water` | 默认占位阻挡；如果是传送荷叶则可通行 | 通常不可消除 | 地块底图或荷叶 `LotusleafFrame` |
| `MoneyTree` | 20002 | 猴子树/生成树 | `monkeyTree` | 多格目标或生成机制 | 根据目标逻辑处理 | 需结合多格模型实测 |
| `Crab` | 20003 | 螃蟹 | `crab` | 多格目标，覆盖多个格子 | 覆盖格被清理后统计完成 | 多格模型表现 |
| `Tuituji` | 20004 | 推土机/除草机 | `lawnmower` | 收集指定类型元素给它充能，充满后按方向清障 | 收集充能触发 | `tuitujiPrefab`，`Tuituji` 组件 |
| `Leaves` | 20005 | 叶子/草地 | `leaves` | 可扣层地块，常作为清除目标或阻挡层 | 上方元素消除或炸弹命中扣层 | `LeaveFrames`；破碎特效 `LeavesBrokenPrefab` |
| `Flower` | 20006 | 花 | `flowers` | 固定地块，可能触发生成 `CellType.Flower` | 旁消/炸弹扣层；归零后触发变花逻辑 | `FlowerFrames` |
| `Firefly` | 20007 | 萤火虫 | `firefly` | 固定收集目标 | 旁消/炸弹扣层；扣到 0 后计入 `firefly` 收集 | `FireflyFrames` |
| `Ivy` | 20008 | 藤蔓/水草 | `ivy` | 固定阻挡/多格目标组成部分，也用于乌龟目标占位 | 旁消/炸弹扣层 | `Ivy` Spine；idle `shuicao_2/shuicao`，受击 `shuicao_hit2/shuicao_hit` |
| `Mushroom` | 20009 | 蘑菇 | `mushroom` | 固定阻挡地块，已经有专门插件 `SpecialPlug/Mushroom` | 旁消/炸弹扣层；归零后从蘑菇插件移除 | `mushroomFrames`；清除时播放 `shanhuAni` 的 `shanhuFX` |

补充格子字段：

| 字段 | 功能 |
| --- | --- |
| `born` | 出生点，会生成新基础元素 |
| `exit` | 出口点，`IceCream` 等运输目标到达后被收集 |
| `empty` | 空基础元素，占位但不显示普通元素 |
| `passable` | 可通过格，常用于特殊下落路径 |
| `portal_idx` | 传送门编号，负数为入口，正数为出口 |
| `wall_left/right/top/bottom` | 单方向墙，阻挡交换/连通 |
| `ground` | 可移动土地等级 |
| `gem` | 可移动土地携带宝石等级 |

## 8. 收集目标类型

关卡 `collect` 字段会配置目标。目标可以是普通 `CellType` 数字，也可以是字符串型目标。

| 目标类型 | 来源 | 功能 | UI 图标来源 | 备注 |
| --- | --- | --- | --- | --- |
| 数字 `0/1/2/3/4/5/8...` | 普通或特殊 `CellType` | 收集对应基础元素 | `ResCtrl.getCellFrame(type, type)` | 普通三消目标 |
| `box` | `UpGroundType.Box` | 收集普通木箱 | `CollectIcon[0]` | 木箱被清完时计数 |
| `gnome` | 多格目标 | 收集隐藏/散装目标 | `CollectIcon[1]` | 代码注释中也称“老头子/蘑菇”类多格目标 |
| `turtles` | 多格目标 | 收集乌龟目标 | `CollectIcon[2]` | 由 `GroundCellModel.isTurtles` 判断完成 |
| `tree` | 多格目标 | 树目标 | `CollectIcon[3]` | 当前主逻辑较少见 |
| `crab` | 多格目标 | 螃蟹目标 | `CollectIcon[4]` | 覆盖格清除后完成 |
| `stone` | `UpGroundType.Stone` | 收集石头 | `CollectIcon[5]` | 当前更新逻辑中石头目标名称存在，但计数链路需实测 |
| `gem` | `CellType.Ground` 携带 | 收集宝石 | `CollectIcon[6]` | 消除带 `gem` 的可移动土地后计数 |
| `firefly` | `GroundType.Firefly` | 收集萤火虫 | `CollectIcon[7]` | 萤火虫地块扣到 0 后计数 |
| `colorbox` | `Box` + `box_type` | 收集指定颜色箱子 | `CollectIcon[8]` | 只有指定颜色旁消才扣箱子 |

章鱼自动寻路优先级：

1. 木箱目标。
2. `gnome` 多格目标。
3. 螃蟹目标。
4. 宝石目标。
5. 冰淇淋出口目标。
6. 普通元素目标。
7. 如果没有目标，优先找香蕉、障碍、土块、普通元素。

## 9. 玩家道具

道具由 `PropType` 和 `PropModel` 处理，图标资源在 `assets/resources/texture/ui/item/item_100.png` 到 `item_108.png`。

| PropType | 数值 | 当前名称 | 功能 | 使用方式 | 表现 |
| --- | ---: | --- | --- | --- | --- |
| `BeikeBomb` | 100 | 贝壳炸弹 | 将所选普通元素变为 `Bomb1` 并立即引爆 | 局内点选格子 | 生成 `Bomb1`，播放炸弹创建/爆炸 |
| `Hammer` | 101 | 锤子 | 消除任意可作用格子一层 | 局内点选格子 | `chuizi` Spine，动画名 `animation` |
| `ResetGrid` | 102 | 重置棋盘 | 重新排列当前棋盘元素 | 点击后立即执行 | 声音 `prop_reset`，提示文字 |
| `Board` | 103 | 冲浪板/十字星 | 将所选格变成横竖组合并清一行一列 | 局内点选格子 | 转 `Bomb2` 后触发 `Bomb2 + Bomb3` 复合 |
| `Add3Step` | 104 | 加 3 步 | 增加剩余步数 | 点击后立即执行 | 声音 `prop_add3`，提示文字 |
| `StartBomb` | 105 | 开局直线和贝壳炸弹 | 开局随机生成 `Bomb1` 和 `Bomb2` 各一个 | 关前/局内触发 | 炸弹创建动画 |
| `StartStar` | 106 | 开局闪星 | 开局随机生成一个 `Bomb5` | 关前/局内触发 | 彩虹/闪星创建动画 |
| `PowerBottle1` | 107 | 小体力瓶 | 恢复 5 点体力 | 背包使用 | UI 道具表现 |
| `PowerBottle2` | 108 | 大体力瓶 | 恢复 30 点体力 | 背包使用 | UI 道具表现 |
| `PowerUnitPrice` | 200 | 体力单价 | 购买体力用配置项 | 非棋盘道具 | 无棋盘表现 |

## 10. 当前表现资源归类

| 表现类型 | 资源/属性 | 说明 |
| --- | --- | --- |
| 普通元素贴图 | `ResCtrl.NormalCellFrame` | 大部分基础元素静态图 |
| 森林背景普通元素贴图 | `ResCtrl.Map2NormalCellFrame` | 背景 ID 为 2 时可替换普通元素图 |
| 炸弹静态图 | `ResCtrl.BombStaticFrame` | 炸弹 UI 或静态表现 |
| 炸弹 Spine/prefab | `ResCtrl.CellPrefab[0..4]` | `Bomb1~Bomb5` |
| 鱼/女孩/贝壳/香蕉/冰淇淋 | `ResCtrl.CellPrefab[5..9]` | 特殊基础层元素 |
| 木箱 | `boxFrames`, `boxBrokenPrefab` | 支持等级和颜色箱 |
| 冰块 | `iceFrames` | 覆盖物 |
| 锁链 | `lockFrames` | 覆盖物 |
| 石头 | `stoneFrames` | 覆盖物 |
| 叶子/草地 | `LeaveFrames`, `LeavesBrokenPrefab` | 底层地块 |
| 可移动土地 | `groundCenter`, `groundPrefabs`, `GroundFrames` | 基础层 `Ground` |
| 宝石 | `GemFrames` | 附着在可移动土地上 |
| 花 | `FlowerFrames`, `pearlFrame` | 花机制 |
| 萤火虫 | `FireflyFrames` | 地块目标 |
| 蘑菇 | `mushroomFrames`, `shanhuAni` | 当前已有蘑菇地块表现 |
| 收集目标图标 | `CollectIcon` | 目标 UI 与开场目标弹窗 |
| 小消除特效 | `littleBombPrefab` | 普通消除 |
| 范围爆炸特效 | `bombEffPrefab` | `Bomb1` |
| 行列特效 | `rowColBombPrefab` | `Bomb2/Bomb3` |
| 鱼爆炸特效 | `fishBombPrefab` | `Fish` |
| 彩虹特效 | `rainbowBombPrefab`, `shootStarPrefab`, `haimaShootOverEff` | `Bomb5` |
| 章鱼跳跃特效 | `zyJumpPrefab`, `zyJumpOverPrefab`, `zyJumpElimatePrefab` | `Bomb4` |
| 组合特效 | `bombAndBombPrefab`, `bombAndFishPrefab`, `haimaAndHetuanPrefab`, `haimaAndHaimaPrefab`, `haimaAndZhangyuPrefab` | 炸弹互换 |

## 11. 菌子化替换建议

后续做“菌子元素消消乐”时，建议先不改底层类型值，先替换命名、资源和表现。这样关卡数据、消除逻辑、炸弹组合可以继续复用。

建议映射如下：

| 当前元素 | 菌子化名称建议 | 替换重点 |
| --- | --- | --- |
| Apple | 红帽菇 | 普通元素贴图 |
| Leaf | 绿伞菇 | 普通元素贴图 |
| Grape | 紫褶菇 | 普通元素贴图 |
| Pear | 黄油菇 | 普通元素贴图 |
| Water | 蓝露菇 | 普通元素贴图 |
| Flower | 粉孢菇 | 普通元素贴图与花机制说明 |
| Coconut | 栗圆菇 | 普通元素贴图 |
| Banana | 厚皮菇 | 旁消障碍 prefab |
| IceCream | 孢子篮 | 出口收集物 prefab |
| BrokenConch | 裂菌石 | 旁消障碍贴图 |
| Fish | 爆孢菇 | 炸弹鱼 Spine |
| Conch | 封印菌核 | 路径目标 Spine |
| BottleCaps | 菌液瓶 | 计数器贴图和数字表现 |
| Ground | 菌土块 | 地块中心、边框、等级图 |
| Bomb1 | 孢子爆弹 | 范围炸弹图标、冲击波动画 |
| Bomb2 | 横向菌丝 | 横向清除图标、横向扫线动画 |
| Bomb3 | 纵向菌丝 | 竖向清除图标、竖向扫线动画 |
| Bomb4 | 追踪孢子 | 自动飞向目标动画 |
| Bomb5 | 彩孢核心 | 同色清除/全屏动画 |
| Box | 菌木箱 | 箱子贴图和破碎动画 |
| Lock | 菌丝锁 | 锁链贴图 |
| Ice | 霜菌膜 | 冰块贴图 |
| Stone | 菌石 | 石头贴图 |
| Leaves | 菌苔 | 草地/叶子底层 |
| Ivy | 缠绕菌丝 | 藤蔓 Spine |
| Firefly | 发光孢子 | 萤火虫目标 |
| Mushroom | 蘑菇丛 | 现有蘑菇资源可继续强化 |

优先级建议：

1. 先替换普通元素 `NormalCellFrame` 和目标 UI 图标，最快能让游戏变成菌子主题。
2. 再替换 `Bomb1~Bomb5` 的 Spine/prefab 和组合特效，这是主题感最强的部分。
3. 再替换障碍与底层地块：箱子、锁链、冰块、石头、菌苔、藤蔓、蘑菇。
4. 最后处理旧海洋命名、音效、文案、道具名称，让策划文档和代码命名逐步一致。

## 12. 配置中出现但当前核心代码未完整整理的旧字段

在 `assets/resources/config/level/new` 中还能看到一些字段，例如：

- `coral`
- `coralPot`
- `butterfly`
- `butterfly_born`
- `butterfly_plus`
- `surprise_type`
- `surpriseInfo`
- `trashChips`
- `carryChips`
- `rocketsInfo`
- `born_type`
- `bigPie`
- `lock_reflect`

这些字段在当前已查看的核心模型 `ILevel.ts / CellModel / GroundCellModel / UpGroundCellModel` 中没有完整稳定的类型定义，可能来自旧版本关卡、未迁移机制或外部编辑器字段。后续如果要保留 500 关完整玩法，需要单独开一轮“关卡字段兼容性排查”，确认这些字段是否仍被运行时代码读取，或者只是历史残留。

在当前“开始游戏 -> LoadingScene -> Match3 主玩法”的改造目标下，建议优先使用已确认稳定的元素体系，不主动扩展这些历史字段。
