"use strict";
cc._RF.push(module, '60e9eLuphxDh75GUZUcWk7D', 'Constant');
// Script/Logic/Data/Const/Constant.ts

"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WX_OPENDATA_COMMAND_KEY = exports.WX_OPENDATA_KEY = exports.GameState = exports.comboRatio = exports.ComboLevel = exports.ScoreConfig = exports.ElimateType = exports.CellType = exports.PropType = exports.UpGroundType = exports.GroundType = exports.NativeKey = exports.NodePoolKey = exports.SceneTaskKey = exports.Scene = exports.ConditionType = exports.WaringTips = exports.TempLoadingTip = exports.PowerConfig = exports.FallMaxGateLimit = exports.ROOM_DETAIL_SCALE = exports.BrokenConchHp = exports.MinOfflineTime = exports.RunTimeGate = exports.MaxPowerCount = exports.NewbieOpt = exports.APPID = void 0;
var Util_1 = require("../../../Base/Utils/Util");
//https://mini-game-angzhou.myqcloud.com/soe/wechat
//http://192.168.56.47/wechat/soe
exports.APPID = 'wxf56baeaa289ce6cd';
/**最大体力值 */
exports.NewbieOpt = false;
exports.MaxPowerCount = 30;
exports.RunTimeGate = 60;
exports.MinOfflineTime = 3;
exports.BrokenConchHp = 1;
exports.ROOM_DETAIL_SCALE = 1.5;
exports.FallMaxGateLimit = 1 / 30;
exports.PowerConfig = {
    /**加一次的间隔时间 */
    NormalTime: 8 * 60,
    /**正常时间段增加量 */
    NormalCount: 1,
    /**新通关奖励 */
    NewLvCount: 5,
    /**每关的消耗 */
    LvConsumption: 5
};
exports.TempLoadingTip = {
    1: "合成八爪鱼",
    2: "八爪鱼爆炸时相邻的元素也会被消除哦"
};
exports.WaringTips = {
    PowerNotEnough: '能量不够了呢!',
    PropNotEnough: '道具数量不够了呢!',
    CantUseForThat: '不能在当前位置使用!',
    NoElimate: '没有消除的元素啦,帮您重置!',
    PropAdd3StepTips: '给您加上了3步呢!',
    PropResetGrid: '给您重新搞了一下呢!',
    PowerMax: '体力已满',
    OfflineReward: '离线期间给你加了',
    NoMoreCoin: '金币不足',
    NoMoreDiamond: '钻石不足',
    BuyOk: '购买成功',
    UnlockProp: '解锁了新道具!',
    CannotOpenIsland: '达到%s颗星开启海岛',
    ShareTip: "\u6210\u529F\u5206\u4EAB\u5373\u53EF\u83B7\u5F97\"<color=#FE980A>\u91D1\u5E01 x%s</c>\"~"
};
/**每日任务的完成类型 */
exports.ConditionType = {
    /**挂时间任务 */
    time: 'time',
    /**合成任务 */
    merge: 'merge',
    /**使用道具 */
    doprop: 'doporp',
    /**游戏次数 */
    gameCount: 'game',
    /**累计收集任务 CellType */
    collect: 'collect'
};
exports.Scene = {
    Loading: 'LoadingScene',
    Map: 'MapScene',
    Match: 'Match3',
    Level: 'LevelScene',
    Hotel: 'HotelScene'
};
var SceneTaskKey;
(function (SceneTaskKey) {
    SceneTaskKey[SceneTaskKey["ShowTargetDlg"] = 0] = "ShowTargetDlg";
})(SceneTaskKey = exports.SceneTaskKey || (exports.SceneTaskKey = {}));
var NodePoolKey;
(function (NodePoolKey) {
    NodePoolKey[NodePoolKey["GroundCell"] = 10] = "GroundCell";
    NodePoolKey[NodePoolKey["GroundMulti"] = 11] = "GroundMulti";
    NodePoolKey[NodePoolKey["Cell"] = 12] = "Cell";
    NodePoolKey[NodePoolKey["UpGroundCell"] = 13] = "UpGroundCell";
    NodePoolKey[NodePoolKey["BombEff"] = 14] = "BombEff";
    NodePoolKey[NodePoolKey["FishBombEff"] = 15] = "FishBombEff";
    NodePoolKey[NodePoolKey["RowColEff"] = 16] = "RowColEff";
    NodePoolKey[NodePoolKey["LittleBomb"] = 17] = "LittleBomb";
    NodePoolKey[NodePoolKey["RainbowBomb"] = 18] = "RainbowBomb";
    NodePoolKey[NodePoolKey["ShootStar"] = 19] = "ShootStar";
    NodePoolKey[NodePoolKey["OverShoot"] = 20] = "OverShoot";
    NodePoolKey[NodePoolKey["MergeBomb"] = 21] = "MergeBomb";
    NodePoolKey[NodePoolKey["BombAndBomb"] = 22] = "BombAndBomb";
    NodePoolKey[NodePoolKey["BombAndFish"] = 23] = "BombAndFish";
    NodePoolKey[NodePoolKey["HaimaAndHetun"] = 24] = "HaimaAndHetun";
    /** 海马+海马 */ NodePoolKey[NodePoolKey["HaimaAndHaima"] = 25] = "HaimaAndHaima";
    NodePoolKey[NodePoolKey["ZhangyuAndJianyu"] = 26] = "ZhangyuAndJianyu";
    NodePoolKey[NodePoolKey["hetuanAndJianyu"] = 27] = "hetuanAndJianyu";
    NodePoolKey[NodePoolKey["HaimaAndZhangyu"] = 28] = "HaimaAndZhangyu";
    NodePoolKey[NodePoolKey["Plane"] = 29] = "Plane";
    NodePoolKey[NodePoolKey["ComboEff"] = 30] = "ComboEff";
    NodePoolKey[NodePoolKey["ZyJump"] = 31] = "ZyJump";
    NodePoolKey[NodePoolKey["ZyJumpOver"] = 32] = "ZyJumpOver";
    NodePoolKey[NodePoolKey["ZyJumpElimate"] = 33] = "ZyJumpElimate";
    NodePoolKey[NodePoolKey["ShuiCao"] = 34] = "ShuiCao";
    NodePoolKey[NodePoolKey["Dot"] = 35] = "Dot";
    NodePoolKey[NodePoolKey["TeshuLight"] = 36] = "TeshuLight";
    NodePoolKey[NodePoolKey["LeafBroken"] = 37] = "LeafBroken";
    NodePoolKey[NodePoolKey["BoxBroken"] = 38] = "BoxBroken";
    NodePoolKey[NodePoolKey["Broken"] = 39] = "Broken";
    NodePoolKey[NodePoolKey["ComplexGround"] = 40] = "ComplexGround";
    NodePoolKey[NodePoolKey["GemNode"] = 41] = "GemNode";
    NodePoolKey[NodePoolKey["Firefly"] = 42] = "Firefly";
    NodePoolKey[NodePoolKey["AddScoreEff"] = 43] = "AddScoreEff";
    NodePoolKey[NodePoolKey["HaiMaOver"] = 44] = "HaiMaOver";
    NodePoolKey[NodePoolKey["AddScoreOverEff"] = 45] = "AddScoreOverEff";
    NodePoolKey[NodePoolKey["RankItem"] = 46] = "RankItem";
    NodePoolKey[NodePoolKey["Chuizi"] = 47] = "Chuizi";
    NodePoolKey[NodePoolKey["ShanhuAnim"] = 48] = "ShanhuAnim";
    NodePoolKey[NodePoolKey["Roket"] = 49] = "Roket";
})(NodePoolKey = exports.NodePoolKey || (exports.NodePoolKey = {}));
Util_1.Util.Enum.convert2EventEnum(NodePoolKey);
/**本地存储键值 */
var NativeKey;
(function (NativeKey) {
    NativeKey[NativeKey["LvDataKey"] = 10000] = "LvDataKey";
    NativeKey[NativeKey["BoxGifts"] = 10001] = "BoxGifts";
    NativeKey[NativeKey["PlayerInfo"] = 10002] = "PlayerInfo";
    NativeKey[NativeKey["Sound"] = 10003] = "Sound";
    NativeKey[NativeKey["LastTime"] = 10004] = "LastTime";
    NativeKey[NativeKey["DailyTime"] = 10005] = "DailyTime";
    NativeKey[NativeKey["DailyCollect"] = 10006] = "DailyCollect";
    NativeKey[NativeKey["MonthCollect"] = 10007] = "MonthCollect";
    NativeKey[NativeKey["Collect"] = 10008] = "Collect";
    NativeKey[NativeKey["DailyMerge"] = 10009] = "DailyMerge";
    NativeKey[NativeKey["MonthMerge"] = 10010] = "MonthMerge";
    NativeKey[NativeKey["Merge"] = 10011] = "Merge";
    NativeKey[NativeKey["DailyGameCount"] = 10012] = "DailyGameCount";
    NativeKey[NativeKey["MonthGameCount"] = 10013] = "MonthGameCount";
    NativeKey[NativeKey["GameCount"] = 10014] = "GameCount";
    NativeKey[NativeKey["DailyUsePropCount"] = 10015] = "DailyUsePropCount";
    NativeKey[NativeKey["MonthUsePropCount"] = 10016] = "MonthUsePropCount";
    NativeKey[NativeKey["UsePropCount"] = 10017] = "UsePropCount";
    NativeKey[NativeKey["CurrencyTaskKey"] = 10018] = "CurrencyTaskKey";
    NativeKey[NativeKey["HotelSlotData"] = 10019] = "HotelSlotData";
    NativeKey[NativeKey["ZanList"] = 10020] = "ZanList";
    NativeKey[NativeKey["LevelFailTag"] = 10021] = "LevelFailTag";
    NativeKey[NativeKey["LevelFailShareTag"] = 10022] = "LevelFailShareTag";
    NativeKey[NativeKey["LevelFailShareTimeTag"] = 10023] = "LevelFailShareTimeTag";
})(NativeKey = exports.NativeKey || (exports.NativeKey = {}));
var GroundType;
(function (GroundType) {
    GroundType[GroundType["None"] = 20000] = "None";
    GroundType[GroundType["Water"] = 20001] = "Water";
    GroundType[GroundType["MoneyTree"] = 20002] = "MoneyTree";
    GroundType[GroundType["Crab"] = 20003] = "Crab";
    GroundType[GroundType["Tuituji"] = 20004] = "Tuituji";
    GroundType[GroundType["Leaves"] = 20005] = "Leaves";
    GroundType[GroundType["Flower"] = 20006] = "Flower";
    /**萤火虫 */
    GroundType[GroundType["Firefly"] = 20007] = "Firefly";
    GroundType[GroundType["Ivy"] = 20008] = "Ivy";
    GroundType[GroundType["Mushroom"] = 20009] = "Mushroom";
})(GroundType = exports.GroundType || (exports.GroundType = {}));
var UpGroundType;
(function (UpGroundType) {
    UpGroundType[UpGroundType["None"] = 10000] = "None";
    UpGroundType[UpGroundType["Box"] = 10001] = "Box";
    UpGroundType[UpGroundType["Lock"] = 10002] = "Lock";
    UpGroundType[UpGroundType["Ice"] = 10003] = "Ice";
    UpGroundType[UpGroundType["Portal"] = 10004] = "Portal";
    UpGroundType[UpGroundType["Stone"] = 10005] = "Stone";
    UpGroundType[UpGroundType["Nov_grass"] = 11000] = "Nov_grass";
    UpGroundType[UpGroundType["Nov_conch"] = 11001] = "Nov_conch";
})(UpGroundType = exports.UpGroundType || (exports.UpGroundType = {}));
/**道具类型 */
var PropType;
(function (PropType) {
    /**贝壳炸弹 */
    PropType[PropType["BeikeBomb"] = 100] = "BeikeBomb";
    /**单个锤子 */
    PropType[PropType["Hammer"] = 101] = "Hammer";
    /**重置棋盘 */
    PropType[PropType["ResetGrid"] = 102] = "ResetGrid";
    /**冲浪板 */
    PropType[PropType["Board"] = 103] = "Board";
    /**加三步 */
    PropType[PropType["Add3Step"] = 104] = "Add3Step";
    /**开始随机炸弹 */
    PropType[PropType["StartBomb"] = 105] = "StartBomb";
    /**开始随机星星 */
    PropType[PropType["StartStar"] = 106] = "StartStar";
    /**精力瓶(小) */
    PropType[PropType["PowerBottle1"] = 107] = "PowerBottle1";
    /**精力瓶(大) */
    PropType[PropType["PowerBottle2"] = 108] = "PowerBottle2";
    /**体力单价,暂时放这..到时候抽出 */
    PropType[PropType["PowerUnitPrice"] = 200] = "PowerUnitPrice";
})(PropType = exports.PropType || (exports.PropType = {}));
/**元素类型 */
var CellType;
(function (CellType) {
    CellType[CellType["Back"] = -2] = "Back";
    CellType[CellType["Empty"] = -1] = "Empty";
    CellType[CellType["Apple"] = 0] = "Apple";
    CellType[CellType["Leaf"] = 1] = "Leaf";
    CellType[CellType["Grape"] = 2] = "Grape";
    CellType[CellType["Pear"] = 3] = "Pear";
    CellType[CellType["Water"] = 4] = "Water";
    /**会长的花儿 */
    CellType[CellType["Flower"] = 5] = "Flower";
    /**香蕉,只能消除旁边的进行消除 */
    CellType[CellType["Banana"] = 6] = "Banana";
    /**冰淇淋,只能通过固定出口消除! */
    CellType[CellType["IceCream"] = 7] = "IceCream";
    /**椰子,猴子摇出来的玩意,普通元素 */
    CellType[CellType["Coconut"] = 8] = "Coconut";
    /**破碎的贝壳,只能通过消除旁边的消除 */
    CellType[CellType["BrokenConch"] = 9] = "BrokenConch";
    /**爆炸鱼 */
    CellType[CellType["Fish"] = 10] = "Fish";
    /**完整的贝壳,只能被小女孩儿踩消除 */
    CellType[CellType["Conch"] = 11] = "Conch";
    /**水杯,只能通过旁边的消除,会得到指定的步数! */
    CellType[CellType["BottleCaps"] = 12] = "BottleCaps";
    /***土地,只能消除旁边的进行消除 */
    CellType[CellType["Ground"] = 13] = "Ground";
    /**圆形炸弹 气泡鱼*/
    CellType[CellType["Bomb1"] = 100] = "Bomb1";
    /**横向炸弹 剑鱼 */
    CellType[CellType["Bomb2"] = 101] = "Bomb2";
    /**竖向炸弹 */
    CellType[CellType["Bomb3"] = 102] = "Bomb3";
    /**章鱼 */
    CellType[CellType["Bomb4"] = 103] = "Bomb4";
    /**彩虹炸弹 海马*/
    CellType[CellType["Bomb5"] = 104] = "Bomb5";
    /**螃蟹  */
    CellType[CellType["Bomb6"] = 105] = "Bomb6";
    /**十字蛋  */
    CellType[CellType["Bomb7"] = 106] = "Bomb7";
    CellType[CellType["Bomb100"] = 199] = "Bomb100";
    CellType[CellType["Girl"] = 200] = "Girl";
    CellType[CellType["Lighting"] = 201] = "Lighting";
    CellType[CellType["Temp"] = 200] = "Temp";
})(CellType = exports.CellType || (exports.CellType = {}));
/**销毁的标记类型 */
var ElimateType;
(function (ElimateType) {
    ElimateType[ElimateType["Default"] = 0] = "Default";
    ElimateType[ElimateType["Beside"] = 1] = "Beside";
    ElimateType[ElimateType["Girl"] = 2] = "Girl";
    /**圆形炸弹 */
    ElimateType[ElimateType["Bomb1"] = 100] = "Bomb1";
    /**横向炸弹 */
    ElimateType[ElimateType["Bomb2"] = 101] = "Bomb2";
    /**竖向炸弹 */
    ElimateType[ElimateType["Bomb3"] = 102] = "Bomb3";
    /**章鱼 */
    ElimateType[ElimateType["Bomb4"] = 103] = "Bomb4";
    /**彩虹炸弹 */
    ElimateType[ElimateType["Bomb5"] = 104] = "Bomb5";
    /**螃蟹炸弹 */
    ElimateType[ElimateType["Bomb6"] = 105] = "Bomb6";
    ElimateType[ElimateType["ThreeOctopus"] = 106] = "ThreeOctopus";
    ElimateType[ElimateType["ThreeRowAndCol"] = 107] = "ThreeRowAndCol";
    ElimateType[ElimateType["RowAndCol"] = 108] = "RowAndCol";
    ElimateType[ElimateType["DoubleBomb"] = 109] = "DoubleBomb";
    ElimateType[ElimateType["Tuituji"] = 110] = "Tuituji";
    ElimateType[ElimateType["Rocket"] = 111] = "Rocket";
    ElimateType[ElimateType["All"] = 112] = "All";
    ElimateType[ElimateType["Prop"] = 200] = "Prop";
    ElimateType[ElimateType["Hammer"] = 201] = "Hammer";
})(ElimateType = exports.ElimateType || (exports.ElimateType = {}));
exports.ScoreConfig = {
    Merge: 100,
    Normal: { 3: 60, 4: 80, 5: 100 },
    BombElimate: (_a = {},
        _a[CellType.Bomb1] = 500,
        _a[CellType.Bomb2] = 300,
        _a[CellType.Bomb3] = 300,
        _a[CellType.Bomb4] = 300,
        _a[CellType.Bomb5] = 500,
        _a),
    SingleElimate: (_b = {},
        _b[CellType.Bomb1] = 40,
        _b[CellType.Bomb2] = 40,
        _b[CellType.Bomb3] = 40,
        _b[CellType.Bomb4] = 40,
        _b[CellType.Bomb5] = 40,
        _b),
    Combo: {
        0: 600, 1: 800, 2: 1000
    },
    Special: (_c = {},
        _c[UpGroundType.Box] = 500,
        _c[GroundType.Leaves] = 500,
        _c[UpGroundType.Lock] = 500,
        _c[UpGroundType.Ice] = 500,
        _c[CellType.Banana] = 500,
        _c[CellType.IceCream] = 500,
        _c.gnome = 5000,
        _c),
    OverStep: {
        1: 5000, 2: 6000, 3: 7000, 4: 8000, 5: 8000, 6: 9000, 7: 10000
    }
};
var ComboLevel;
(function (ComboLevel) {
    ComboLevel[ComboLevel["great"] = 3] = "great";
    ComboLevel[ComboLevel["awesome"] = 6] = "awesome";
    ComboLevel[ComboLevel["fantastic"] = 9] = "fantastic";
    ComboLevel[ComboLevel["blossom"] = 12] = "blossom";
})(ComboLevel = exports.ComboLevel || (exports.ComboLevel = {}));
var comboRatio;
(function (comboRatio) {
    comboRatio[comboRatio["great"] = 0] = "great";
    comboRatio[comboRatio["awesome"] = 1] = "awesome";
    comboRatio[comboRatio["fantastic"] = 2] = "fantastic";
    comboRatio[comboRatio["blossom"] = 3] = "blossom";
})(comboRatio = exports.comboRatio || (exports.comboRatio = {}));
var GameState;
(function (GameState) {
    GameState[GameState["preReady"] = 0] = "preReady";
    GameState[GameState["Normal"] = 1] = "Normal";
    GameState[GameState["Pause"] = 2] = "Pause";
    GameState[GameState["Win"] = 3] = "Win";
    GameState[GameState["Fail"] = 4] = "Fail";
    GameState[GameState["ChangeBomb"] = 5] = "ChangeBomb";
    GameState[GameState["End"] = 6] = "End";
})(GameState = exports.GameState || (exports.GameState = {}));
exports.WX_OPENDATA_KEY = {
    SCORE: "SCORE"
};
exports.WX_OPENDATA_COMMAND_KEY = {
    SHOW_RANK: "SHOW_RANK",
    HIDE_RANK: "HIDE_RANK",
    NEXT_PAGE: "NEXT_PAGE",
    PREV_PAGE: "PREV_PAGE",
    SWITCH_TAB: "SWITCH_TAB",
    SHOW_FRIEND_COMP: "SHOW_FRIEND_COMP",
    SHOW_BEYOND_FRIEND: "SHOW_BEYOND_FRIEND",
    UPDATE_BEYOND_FRIEND: "UPDATE_BEYOND_FRIEND",
};

cc._RF.pop();