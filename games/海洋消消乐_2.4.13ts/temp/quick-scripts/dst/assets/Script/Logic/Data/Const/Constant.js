
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Data/Const/Constant.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcRGF0YVxcQ29uc3RcXENvbnN0YW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFFaEQsbURBQW1EO0FBQ25ELGlDQUFpQztBQUVwQixRQUFBLEtBQUssR0FBRyxvQkFBb0IsQ0FBQztBQUMxQyxXQUFXO0FBQ0UsUUFBQSxTQUFTLEdBQVksS0FBSyxDQUFDO0FBQzNCLFFBQUEsYUFBYSxHQUFXLEVBQUUsQ0FBQztBQUMzQixRQUFBLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDakIsUUFBQSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLFFBQUEsYUFBYSxHQUFXLENBQUMsQ0FBQztBQUUxQixRQUFBLGlCQUFpQixHQUFHLEdBQUcsQ0FBQztBQUV4QixRQUFBLGdCQUFnQixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFFMUIsUUFBQSxXQUFXLEdBQUc7SUFDdkIsY0FBYztJQUNkLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRTtJQUNsQixjQUFjO0lBQ2QsV0FBVyxFQUFFLENBQUM7SUFDZCxXQUFXO0lBQ1gsVUFBVSxFQUFFLENBQUM7SUFDYixXQUFXO0lBQ1gsYUFBYSxFQUFFLENBQUM7Q0FDbkIsQ0FBQTtBQUVZLFFBQUEsY0FBYyxHQUFHO0lBQzFCLENBQUMsRUFBRSxPQUFPO0lBQ1YsQ0FBQyxFQUFFLG1CQUFtQjtDQUN6QixDQUFBO0FBRVksUUFBQSxVQUFVLEdBQUc7SUFDdEIsY0FBYyxFQUFFLFNBQVM7SUFDekIsYUFBYSxFQUFFLFdBQVc7SUFDMUIsY0FBYyxFQUFFLFlBQVk7SUFDNUIsU0FBUyxFQUFFLGdCQUFnQjtJQUMzQixnQkFBZ0IsRUFBRSxXQUFXO0lBQzdCLGFBQWEsRUFBRSxZQUFZO0lBQzNCLFFBQVEsRUFBRSxNQUFNO0lBQ2hCLGFBQWEsRUFBRSxVQUFVO0lBQ3pCLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLGFBQWEsRUFBRSxNQUFN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LFNBQVMsRUFBRSxXQUFXO0lBQ3RCLFVBQVUsRUFBRSxZQUFZO0lBQ3hCLGdCQUFnQixFQUFFLGtCQUFrQjtJQUNwQyxrQkFBa0IsRUFBRSxvQkFBb0I7SUFDeEMsb0JBQW9CLEVBQUUsc0JBQXNCO0NBQy9DLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uLy4uLy4uL0Jhc2UvVXRpbHMvVXRpbFwiO1xuXG4vL2h0dHBzOi8vbWluaS1nYW1lLWFuZ3pob3UubXlxY2xvdWQuY29tL3NvZS93ZWNoYXRcbi8vaHR0cDovLzE5Mi4xNjguNTYuNDcvd2VjaGF0L3NvZVxuXG5leHBvcnQgY29uc3QgQVBQSUQgPSAnd3hmNTZiYWVhYTI4OWNlNmNkJztcbi8qKuacgOWkp+S9k+WKm+WAvCAqL1xuZXhwb3J0IGNvbnN0IE5ld2JpZU9wdDogYm9vbGVhbiA9IGZhbHNlO1xuZXhwb3J0IGNvbnN0IE1heFBvd2VyQ291bnQ6IG51bWJlciA9IDMwO1xuZXhwb3J0IGNvbnN0IFJ1blRpbWVHYXRlID0gNjA7XG5leHBvcnQgY29uc3QgTWluT2ZmbGluZVRpbWUgPSAzO1xuZXhwb3J0IGNvbnN0IEJyb2tlbkNvbmNoSHA6IG51bWJlciA9IDE7XG5cbmV4cG9ydCBjb25zdCBST09NX0RFVEFJTF9TQ0FMRSA9IDEuNTtcblxuZXhwb3J0IGNvbnN0IEZhbGxNYXhHYXRlTGltaXQgPSAxIC8gMzA7XG5cbmV4cG9ydCBjb25zdCBQb3dlckNvbmZpZyA9IHtcbiAgICAvKirliqDkuIDmrKHnmoTpl7TpmpTml7bpl7QgKi9cbiAgICBOb3JtYWxUaW1lOiA4ICogNjAsXG4gICAgLyoq5q2j5bi45pe26Ze05q615aKe5Yqg6YePICovXG4gICAgTm9ybWFsQ291bnQ6IDEsXG4gICAgLyoq5paw6YCa5YWz5aWW5YqxICovXG4gICAgTmV3THZDb3VudDogNSxcbiAgICAvKirmr4/lhbPnmoTmtojogJcgKi9cbiAgICBMdkNvbnN1bXB0aW9uOiA1XG59XG5cbmV4cG9ydCBjb25zdCBUZW1wTG9hZGluZ1RpcCA9IHtcbiAgICAxOiBcIuWQiOaIkOWFq+eIqumxvFwiLFxuICAgIDI6IFwi5YWr54iq6bG854iG54K45pe255u46YK755qE5YWD57Sg5Lmf5Lya6KKr5raI6Zmk5ZOmXCJcbn1cblxuZXhwb3J0IGNvbnN0IFdhcmluZ1RpcHMgPSB7XG4gICAgUG93ZXJOb3RFbm91Z2g6ICfog73ph4/kuI3lpJ/kuoblkaIhJyxcbiAgICBQcm9wTm90RW5vdWdoOiAn6YGT5YW35pWw6YeP5LiN5aSf5LqG5ZGiIScsXG4gICAgQ2FudFVzZUZvclRoYXQ6ICfkuI3og73lnKjlvZPliY3kvY3nva7kvb/nlKghJyxcbiAgICBOb0VsaW1hdGU6ICfmsqHmnInmtojpmaTnmoTlhYPntKDllaYs5biu5oKo6YeN572uIScsXG4gICAgUHJvcEFkZDNTdGVwVGlwczogJ+e7meaCqOWKoOS4iuS6hjPmraXlkaIhJyxcbiAgICBQcm9wUmVzZXRHcmlkOiAn57uZ5oKo6YeN5paw5pCe5LqG5LiA5LiL5ZGiIScsXG4gICAgUG93ZXJNYXg6ICfkvZPlipvlt7Lmu6EnLFxuICAgIE9mZmxpbmVSZXdhcmQ6ICfnprvnur/mnJ/pl7Tnu5nkvaDliqDkuoYnLFxuICAgIE5vTW9yZUNvaW46ICfph5HluIHkuI3otrMnLFxuICAgIE5vTW9yZURpYW1vbmQ6ICfpkrvnn7PkuI3otrMnLFxuICAgIEJ1eU9rOiAn6LSt5Lmw5oiQ5YqfJyxcbiAgICBVbmxvY2tQcm9wOiAn6Kej6ZSB5LqG5paw6YGT5YW3IScsXG4gICAgQ2Fubm90T3BlbklzbGFuZDogJ+i+vuWIsCVz6aKX5pif5byA5ZCv5rW35bKbJyxcbiAgICBTaGFyZVRpcDogYOaIkOWKn+WIhuS6q+WNs+WPr+iOt+W+l1wiPGNvbG9yPSNGRTk4MEE+6YeR5biBIHglczwvYz5cIn5gXG59XG5cbi8qKuavj+aXpeS7u+WKoeeahOWujOaIkOexu+WeiyAqL1xuZXhwb3J0IGNvbnN0IENvbmRpdGlvblR5cGUgPSB7XG4gICAgLyoq5oyC5pe26Ze05Lu75YqhICovXG4gICAgdGltZTogJ3RpbWUnLFxuICAgIC8qKuWQiOaIkOS7u+WKoSAqL1xuICAgIG1lcmdlOiAnbWVyZ2UnLFxuICAgIC8qKuS9v+eUqOmBk+WFtyAqL1xuICAgIGRvcHJvcDogJ2RvcG9ycCcsXG4gICAgLyoq5ri45oiP5qyh5pWwICovXG4gICAgZ2FtZUNvdW50OiAnZ2FtZScsXG4gICAgLyoq57Sv6K6h5pS26ZuG5Lu75YqhIENlbGxUeXBlICovXG4gICAgY29sbGVjdDogJ2NvbGxlY3QnXG59XG5cblxuZXhwb3J0IGNvbnN0IFNjZW5lID0ge1xuICAgIExvYWRpbmc6ICdMb2FkaW5nU2NlbmUnLFxuICAgIE1hcDogJ01hcFNjZW5lJyxcbiAgICBNYXRjaDogJ01hdGNoMycsXG4gICAgTGV2ZWw6ICdMZXZlbFNjZW5lJyxcbiAgICBIb3RlbDogJ0hvdGVsU2NlbmUnXG59XG5cbmV4cG9ydCBlbnVtIFNjZW5lVGFza0tleSB7XG4gICAgU2hvd1RhcmdldERsZ1xufVxuXG5leHBvcnQgZW51bSBOb2RlUG9vbEtleSB7XG4gICAgR3JvdW5kQ2VsbCA9IDEwLFxuICAgIEdyb3VuZE11bHRpLFxuICAgIENlbGwsXG4gICAgVXBHcm91bmRDZWxsLFxuICAgIEJvbWJFZmYsXG4gICAgRmlzaEJvbWJFZmYsXG4gICAgUm93Q29sRWZmLFxuICAgIExpdHRsZUJvbWIsXG4gICAgUmFpbmJvd0JvbWIsXG4gICAgU2hvb3RTdGFyLFxuICAgIE92ZXJTaG9vdCxcbiAgICBNZXJnZUJvbWIsXG4gICAgQm9tYkFuZEJvbWIsXG4gICAgQm9tYkFuZEZpc2gsXG4gICAgSGFpbWFBbmRIZXR1bixcbiAgICAvKiog5rW36amsK+a1t+mprCAqL0hhaW1hQW5kSGFpbWEsXG4gICAgWmhhbmd5dUFuZEppYW55dSxcbiAgICBoZXR1YW5BbmRKaWFueXUsXG4gICAgSGFpbWFBbmRaaGFuZ3l1LFxuICAgIFBsYW5lLFxuICAgIENvbWJvRWZmLFxuICAgIFp5SnVtcCxcbiAgICBaeUp1bXBPdmVyLFxuICAgIFp5SnVtcEVsaW1hdGUsXG4gICAgU2h1aUNhbyxcbiAgICBEb3QsXG4gICAgVGVzaHVMaWdodCxcbiAgICBMZWFmQnJva2VuLFxuICAgIEJveEJyb2tlbixcbiAgICBCcm9rZW4sXG4gICAgQ29tcGxleEdyb3VuZCxcbiAgICBHZW1Ob2RlLFxuICAgIEZpcmVmbHksXG4gICAgQWRkU2NvcmVFZmYsXG4gICAgSGFpTWFPdmVyLFxuICAgIEFkZFNjb3JlT3ZlckVmZixcbiAgICBSYW5rSXRlbSxcbiAgICBDaHVpemksXG4gICAgU2hhbmh1QW5pbSxcbiAgICBSb2tldFxufVxuVXRpbC5FbnVtLmNvbnZlcnQyRXZlbnRFbnVtKE5vZGVQb29sS2V5KTtcblxuXG5cblxuLyoq5pys5Zyw5a2Y5YKo6ZSu5YC8ICovXG5leHBvcnQgZW51bSBOYXRpdmVLZXkge1xuICAgIEx2RGF0YUtleSA9IDEwMDAwLFxuICAgIEJveEdpZnRzLFxuICAgIFBsYXllckluZm8sXG4gICAgU291bmQsXG4gICAgTGFzdFRpbWUsXG4gICAgRGFpbHlUaW1lLFxuICAgIERhaWx5Q29sbGVjdCxcbiAgICBNb250aENvbGxlY3QsXG4gICAgQ29sbGVjdCxcbiAgICBEYWlseU1lcmdlLFxuICAgIE1vbnRoTWVyZ2UsXG4gICAgTWVyZ2UsXG4gICAgRGFpbHlHYW1lQ291bnQsXG4gICAgTW9udGhHYW1lQ291bnQsXG4gICAgR2FtZUNvdW50LFxuICAgIERhaWx5VXNlUHJvcENvdW50LFxuICAgIE1vbnRoVXNlUHJvcENvdW50LFxuICAgIFVzZVByb3BDb3VudCxcbiAgICBDdXJyZW5jeVRhc2tLZXksXG4gICAgSG90ZWxTbG90RGF0YSxcbiAgICBaYW5MaXN0LFxuICAgIExldmVsRmFpbFRhZywvL+WFs+WNoeWksei0peasoeaVsOagh+W/l1xuICAgIExldmVsRmFpbFNoYXJlVGFnLC8v5YWz5Y2h5aSx6LSl5YiG5Lqr5LiA5aSp5Y+q6IO95LiA5qyhXG4gICAgTGV2ZWxGYWlsU2hhcmVUaW1lVGFnLC8v5YWz5Y2h5aSx6LSl5YiG5Lqr5LiA5aSp5Y+q6IO95LiA5qyhVGltZVxufVxuXG5leHBvcnQgZW51bSBHcm91bmRUeXBlIHtcbiAgICBOb25lID0gMjAwMDAsXG4gICAgV2F0ZXIsXG4gICAgTW9uZXlUcmVlLFxuICAgIENyYWIsXG4gICAgVHVpdHVqaSxcbiAgICBMZWF2ZXMsIC8v5YiG55WM57q/LuS4i+mdouaYr+aciWx255qEXG4gICAgRmxvd2VyLFxuICAgIC8qKuiQpOeBq+iZqyAqL1xuICAgIEZpcmVmbHksXG4gICAgSXZ5LFxuICAgIE11c2hyb29tXG59XG5cbmV4cG9ydCBlbnVtIFVwR3JvdW5kVHlwZSB7XG4gICAgTm9uZSA9IDEwMDAwLFxuICAgIEJveCxcbiAgICBMb2NrLFxuICAgIEljZSxcbiAgICBQb3J0YWwsXG4gICAgU3RvbmUsXG4gICAgTm92X2dyYXNzID0gMTEwMDAsICAgICAgIC8v5byV5a+8LOWbsOS9j+eroOmxvOeahOiNiVxuICAgIE5vdl9jb25jaFxufVxuXG4vKirpgZPlhbfnsbvlnosgKi9cbmV4cG9ydCBlbnVtIFByb3BUeXBlIHtcbiAgICAvKirotJ3lo7PngrjlvLkgKi9cbiAgICBCZWlrZUJvbWIgPSAxMDAsXG4gICAgLyoq5Y2V5Liq6ZSk5a2QICovXG4gICAgSGFtbWVyLFxuICAgIC8qKumHjee9ruaji+ebmCAqL1xuICAgIFJlc2V0R3JpZCxcbiAgICAvKirlhrLmtarmnb8gKi9cbiAgICBCb2FyZCxcbiAgICAvKirliqDkuInmraUgKi9cbiAgICBBZGQzU3RlcCxcbiAgICAvKirlvIDlp4vpmo/mnLrngrjlvLkgKi9cbiAgICBTdGFydEJvbWIsXG4gICAgLyoq5byA5aeL6ZqP5py65pif5pifICovXG4gICAgU3RhcnRTdGFyLFxuICAgIC8qKueyvuWKm+eTtijlsI8pICovXG4gICAgUG93ZXJCb3R0bGUxLFxuICAgIC8qKueyvuWKm+eTtijlpKcpICovXG4gICAgUG93ZXJCb3R0bGUyLFxuXG4gICAgLyoq5L2T5Yqb5Y2V5Lu3LOaaguaXtuaUvui/mS4u5Yiw5pe25YCZ5oq95Ye6ICovXG4gICAgUG93ZXJVbml0UHJpY2UgPSAyMDBcbn1cblxuLyoq5YWD57Sg57G75Z6LICovXG5leHBvcnQgZW51bSBDZWxsVHlwZSB7XG4gICAgQmFjayA9IC0yLFxuICAgIEVtcHR5ID0gLTEsXG5cbiAgICBBcHBsZSA9IDAsXG4gICAgTGVhZixcbiAgICBHcmFwZSxcbiAgICBQZWFyLFxuICAgIFdhdGVyLFxuICAgIC8qKuS8mumVv+eahOiKseWEvyAqL1xuICAgIEZsb3dlcixcbiAgICAvKirpppnolYks5Y+q6IO95raI6Zmk5peB6L6555qE6L+b6KGM5raI6ZmkICovXG4gICAgQmFuYW5hLFxuICAgIC8qKuWGsOa3h+a3iyzlj6rog73pgJrov4flm7rlrprlh7rlj6PmtojpmaQhICovXG4gICAgSWNlQ3JlYW0sXG4gICAgLyoq5qSw5a2QLOeMtOWtkOaRh+WHuuadpeeahOeOqeaEjyzmma7pgJrlhYPntKAgKi9cbiAgICBDb2NvbnV0LFxuICAgIC8qKuegtOeijueahOi0neWjsyzlj6rog73pgJrov4fmtojpmaTml4HovrnnmoTmtojpmaQgKi9cbiAgICBCcm9rZW5Db25jaCxcbiAgICAvKirniIbngrjpsbwgKi9cbiAgICBGaXNoLFxuICAgIC8qKuWujOaVtOeahOi0neWjsyzlj6rog73ooqvlsI/lpbPlranlhL/ouKnmtojpmaQgKi9cbiAgICBDb25jaCxcbiAgICAvKirmsLTmna8s5Y+q6IO96YCa6L+H5peB6L6555qE5raI6ZmkLOS8muW+l+WIsOaMh+WumueahOatpeaVsCEgKi9cbiAgICBCb3R0bGVDYXBzLFxuICAgIC8qKirlnJ/lnLAs5Y+q6IO95raI6Zmk5peB6L6555qE6L+b6KGM5raI6ZmkICovXG4gICAgR3JvdW5kLFxuICAgIC8qKuWchuW9oueCuOW8uSDmsJTms6HpsbwqL1xuICAgIEJvbWIxID0gMTAwLFxuICAgIC8qKuaoquWQkeeCuOW8uSDliZHpsbwgKi9cbiAgICBCb21iMixcbiAgICAvKirnq5blkJHngrjlvLkgKi9cbiAgICBCb21iMyxcbiAgICAvKirnq6DpsbwgKi9cbiAgICBCb21iNCxcbiAgICAvKirlvanombnngrjlvLkg5rW36amsKi9cbiAgICBCb21iNSxcbiAgICAvKironoPon7kgICovXG4gICAgQm9tYjYsXG4gICAgLyoq5Y2B5a2X6JuLICAqL1xuICAgIEJvbWI3LFxuICAgIEJvbWIxMDAgPSAxOTksXG5cbiAgICBHaXJsLFxuICAgIExpZ2h0aW5nLFxuXG4gICAgVGVtcCA9IDIwMCxcbn1cblxuLyoq6ZSA5q+B55qE5qCH6K6w57G75Z6LICovXG5leHBvcnQgZW51bSBFbGltYXRlVHlwZSB7XG4gICAgRGVmYXVsdCxcbiAgICBCZXNpZGUsXG4gICAgR2lybCxcbiAgICAvKirlnIblvaLngrjlvLkgKi9cbiAgICBCb21iMSA9IDEwMCxcbiAgICAvKirmqKrlkJHngrjlvLkgKi9cbiAgICBCb21iMixcbiAgICAvKirnq5blkJHngrjlvLkgKi9cbiAgICBCb21iMyxcbiAgICAvKirnq6DpsbwgKi9cbiAgICBCb21iNCxcbiAgICAvKirlvanombnngrjlvLkgKi9cbiAgICBCb21iNSxcbiAgICAvKironoPon7nngrjlvLkgKi9cbiAgICBCb21iNixcbiAgICBUaHJlZU9jdG9wdXMsXG4gICAgVGhyZWVSb3dBbmRDb2wsXG4gICAgUm93QW5kQ29sLFxuICAgIERvdWJsZUJvbWIsXG4gICAgVHVpdHVqaSxcbiAgICBSb2NrZXQsXG4gICAgQWxsLFxuICAgIFByb3AgPSAyMDAsXG4gICAgSGFtbWVyXG59XG5cbmV4cG9ydCBjb25zdCBTY29yZUNvbmZpZyA9IHtcbiAgICBNZXJnZTogMTAwLFxuICAgIE5vcm1hbDogeyAzOiA2MCwgNDogODAsIDU6IDEwMCB9LFxuICAgIEJvbWJFbGltYXRlOiB7XG4gICAgICAgIFtDZWxsVHlwZS5Cb21iMV06IDUwMCxcbiAgICAgICAgW0NlbGxUeXBlLkJvbWIyXTogMzAwLFxuICAgICAgICBbQ2VsbFR5cGUuQm9tYjNdOiAzMDAsXG4gICAgICAgIFtDZWxsVHlwZS5Cb21iNF06IDMwMCxcbiAgICAgICAgW0NlbGxUeXBlLkJvbWI1XTogNTAwXG4gICAgfSxcbiAgICBTaW5nbGVFbGltYXRlOiB7XG4gICAgICAgIFtDZWxsVHlwZS5Cb21iMV06IDQwLFxuICAgICAgICBbQ2VsbFR5cGUuQm9tYjJdOiA0MCxcbiAgICAgICAgW0NlbGxUeXBlLkJvbWIzXTogNDAsXG4gICAgICAgIFtDZWxsVHlwZS5Cb21iNF06IDQwLFxuICAgICAgICBbQ2VsbFR5cGUuQm9tYjVdOiA0MFxuICAgIH0sXG4gICAgQ29tYm86IHtcbiAgICAgICAgMDogNjAwLCAxOiA4MDAsIDI6IDEwMDBcbiAgICB9LFxuICAgIFNwZWNpYWw6IHtcbiAgICAgICAgW1VwR3JvdW5kVHlwZS5Cb3hdOiA1MDAsXG4gICAgICAgIFtHcm91bmRUeXBlLkxlYXZlc106IDUwMCxcbiAgICAgICAgW1VwR3JvdW5kVHlwZS5Mb2NrXTogNTAwLFxuICAgICAgICBbVXBHcm91bmRUeXBlLkljZV06IDUwMCxcbiAgICAgICAgW0NlbGxUeXBlLkJhbmFuYV06IDUwMCxcbiAgICAgICAgW0NlbGxUeXBlLkljZUNyZWFtXTogNTAwLFxuICAgICAgICBnbm9tZTogNTAwMFxuICAgIH0sXG4gICAgT3ZlclN0ZXA6IHtcbiAgICAgICAgMTogNTAwMCwgMjogNjAwMCwgMzogNzAwMCwgNDogODAwMCwgNTogODAwMCwgNjogOTAwMCwgNzogMTAwMDBcbiAgICB9XG59XG5cbmV4cG9ydCBlbnVtIENvbWJvTGV2ZWwge1xuICAgIGdyZWF0ID0gMyxcbiAgICBhd2Vzb21lID0gNixcbiAgICBmYW50YXN0aWMgPSA5LFxuICAgIGJsb3Nzb20gPSAxMlxufVxuXG5leHBvcnQgZW51bSBjb21ib1JhdGlvIHtcbiAgICBncmVhdCA9IDAsXG4gICAgYXdlc29tZSxcbiAgICBmYW50YXN0aWMsXG4gICAgYmxvc3NvbVxufVxuXG5leHBvcnQgZW51bSBHYW1lU3RhdGUge1xuICAgIHByZVJlYWR5LFxuICAgIE5vcm1hbCxcbiAgICBQYXVzZSxcbiAgICBXaW4sXG4gICAgRmFpbCxcbiAgICBDaGFuZ2VCb21iLFxuICAgIEVuZFxufVxuXG5leHBvcnQgY29uc3QgV1hfT1BFTkRBVEFfS0VZID0ge1xuICAgIFNDT1JFOiBcIlNDT1JFXCJcbn1cblxuZXhwb3J0IGNvbnN0IFdYX09QRU5EQVRBX0NPTU1BTkRfS0VZID0ge1xuICAgIFNIT1dfUkFOSzogXCJTSE9XX1JBTktcIiwgICAgICAvLyDmmL7npLrmjpLooYzmppxcbiAgICBISURFX1JBTks6IFwiSElERV9SQU5LXCIsICAgICAgLy8g6ZqQ6JeP5o6S6KGM5qacXG4gICAgTkVYVF9QQUdFOiBcIk5FWFRfUEFHRVwiLCAgICAgIC8vIOS4i+S4gOmhtVxuICAgIFBSRVZfUEFHRTogXCJQUkVWX1BBR0VcIiwgICAgICAvLyDkuIrkuIDpobVcbiAgICBTV0lUQ0hfVEFCOiBcIlNXSVRDSF9UQUJcIiwgICAgLy8g5YiH5o2i5qCH562+77yM5aW95Y+L5o6S6KGM5qac5ZKM5LiW55WM5o6S6KGM5qacXG4gICAgU0hPV19GUklFTkRfQ09NUDogXCJTSE9XX0ZSSUVORF9DT01QXCIsICAvLyDmmL7npLrlpb3lj4vlr7nmr5TvvIznlKjkuo7nu5PnrpfpobXpnaLml7bmmL7npLrnmoTnlKjmiLflvZPliY3mjpLlkI3nmoTpmYTov5Ez5Liq55So5oi35pWw5o2uXG4gICAgU0hPV19CRVlPTkRfRlJJRU5EOiBcIlNIT1dfQkVZT05EX0ZSSUVORFwiLCAvLyDmmL7npLrotoXotorlpb3lj4tcbiAgICBVUERBVEVfQkVZT05EX0ZSSUVORDogXCJVUERBVEVfQkVZT05EX0ZSSUVORFwiLCAvLyDliLfmlrDotoXotorlpb3lj4tcbn0iXX0=