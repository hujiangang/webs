"use strict";
cc._RF.push(module, 'b24efieD1REkLqHDECJlMDw', 'BombModel');
// Script/Logic/Match3/Model/BombModel.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BombModel = void 0;
var CellBase_1 = require("./CellBase");
var GameModel_1 = require("./GameModel");
var Common_1 = require("../../Common/Common");
var RuntimeMgr_1 = require("../../Data/RuntimeMgr");
var Constant_1 = require("../../Data/Const/Constant");
var TimeConfig_1 = require("../../Data/Const/TimeConfig");
var EffLayerCtrl_1 = require("../View/EffLayerCtrl");
var BombModel = /** @class */ (function (_super) {
    __extends(BombModel, _super);
    function BombModel() {
        var _this = _super.call(this) || this;
        _this._tempGroupId = null;
        _this.type = null;
        return _this;
    }
    BombModel.prototype.init = function (type, x, y) {
        this.type = type;
    };
    BombModel.prototype.execBomb = function (bombCell, type, groupId) {
        if (type === void 0) { type = null; }
        if (groupId === void 0) { groupId = null; }
        return __awaiter(this, void 0, void 0, function () {
            var closeAry, keepTime, boomLevel;
            return __generator(this, function (_a) {
                if (bombCell.getType() == Constant_1.CellType.Bomb5 && type == null)
                    return [2 /*return*/];
                closeAry = this.getBombCloseAry(bombCell.getType(), bombCell.pos, type);
                if (bombCell.isDeath && closeAry.size == 0 && bombCell.getType() != Constant_1.CellType.Bomb4) {
                    bombCell.isBomb = false;
                    bombCell.extCtrl.elimate(1, null);
                    return [2 /*return*/];
                }
                keepTime = this.getBombDelayExecDestoryTime(bombCell.getType());
                boomLevel = this.getBombLv(this.type);
                // await this.playBombEff(this.type); 
                GameModel_1.default.ins.execElimate(bombCell, closeAry, bombCell.getType(), boomLevel, keepTime, groupId);
                return [2 /*return*/];
            });
        });
    };
    BombModel.prototype._execOneBombByPos = function (type, pos) {
        if (Common_1.default.isBombType(type) && pos) {
            var closeAry = this.getBombCloseAry(type, pos, type);
            var keepTime = this.getBombDelayExecDestoryTime(type);
            var boomLevel = this.getBombLv(this.type);
            var centerCell = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.CellList, pos);
            GameModel_1.default.ins.execElimate(centerCell, closeAry, type, boomLevel, keepTime);
        }
    };
    BombModel.prototype.onChangePos = function (pos) {
    };
    BombModel.prototype.onMsg = function (type) {
    };
    BombModel.prototype.onBind = function () {
    };
    BombModel.prototype.onUnBind = function () {
    };
    /**
     * 获取炸弹延迟执行销毁动画的时间
     * @param type
     */
    BombModel.prototype.getBombDelayExecDestoryTime = function (type) {
        var time = null;
        switch (type) {
            case Constant_1.CellType.Bomb1:
                time = TimeConfig_1.GapTime.NormalBombDelayElimate;
                break;
            case Constant_1.CellType.Bomb4:
                time = TimeConfig_1.GapTime.OctopusDelayElimate;
                break;
            case Constant_1.CellType.Fish:
                time = TimeConfig_1.GapTime.FishBombDelayElimate;
                break;
        }
        return time;
    };
    BombModel.prototype.getBombLv = function (type) {
        var lv = null;
        switch (type) {
            case Constant_1.CellType.Bomb1:
                lv = BOMBS_LEVEL[0];
                break;
            case Constant_1.CellType.Fish:
                lv = BOMBS_LEVEL[3];
                break;
            case Constant_1.CellType.Bomb2:
            case Constant_1.CellType.Bomb3:
                lv = type;
                break;
        }
        return lv;
    };
    /**
     * 合计一个炸弹的范围
     * @param type 类型
     * @param pos 坐标
     * @param rainbowType 彩虹匹配的元素!
     */
    BombModel.prototype.getBombCloseAry = function (type, pos, rainbowType) {
        if (rainbowType === void 0) { rainbowType = null; }
        var closeAry = null;
        switch (type) {
            case Constant_1.CellType.Bomb1: //圆形炸弹
                closeAry = this.getBombRangeCell(pos, 2);
                break;
            case Constant_1.CellType.Bomb2: //横向炸弹
                closeAry = this.rowBomb(pos);
                break;
            case Constant_1.CellType.Bomb3: //竖向炸弹
                closeAry = this.colBomb(pos);
                break;
            case Constant_1.CellType.Bomb5: //彩虹炸弹
                if (!rainbowType) {
                    var chipset = GameModel_1.default.ins.getLvData().chipset;
                    var tempItem_1 = null;
                    chipset.forEach(function (item) {
                        if (item && item.type < Constant_1.CellType.IceCream && (!tempItem_1 || item.percent > tempItem_1.percent)) {
                            tempItem_1 = item;
                        }
                    });
                    rainbowType = tempItem_1.type;
                }
                closeAry = this.rainbow(rainbowType);
                break;
            case Constant_1.CellType.Bomb4: //飞机
                closeAry = this.getBombRangeCell(pos, 0);
                break;
            case Constant_1.CellType.Fish:
                closeAry = this.getBombRangeCell(pos, 1);
                break;
        }
        return closeAry;
    };
    BombModel.prototype.onBombMergeBomb = function (type1, type2, target, groupId) {
        this._tempGroupId = groupId;
        if (Common_1.default.isMergeBomb(Constant_1.CellType.Bomb5, Constant_1.CellType.Bomb1, type1, type2)) {
            //棋盘上选择若干随机元素变成圆形炸弹，然后引爆
            console.error('彩虹圆爆!');
            this.fireRainbow(target, Constant_1.CellType.Bomb1);
        }
        else if (Common_1.default.isMergeBomb(Constant_1.CellType.Bomb5, Constant_1.CellType.Bomb2, type1, type2)) {
            //棋盘上选择若干随机元素变成横向炸弹，然后引爆。
            console.error('彩虹横爆!');
            this.fireRainbow(target, Constant_1.CellType.Bomb2);
        }
        else if (Common_1.default.isMergeBomb(Constant_1.CellType.Bomb5, Constant_1.CellType.Bomb3, type1, type2)) {
            //棋盘上选择若干随机元素变成竖向炸弹，然后引爆。 
            console.error('彩虹竖爆!');
            this.fireRainbow(target, Constant_1.CellType.Bomb3);
        }
        else if (Common_1.default.isMergeBomb(Constant_1.CellType.Bomb5, Constant_1.CellType.Bomb4, type1, type2)) {
            //棋盘上选择若干随机元素变成飞机，然后所有飞机引爆。 
            console.error('彩虹飞机爆!');
            this._caihongZhangyu(target, Constant_1.CellType.Bomb4);
        }
        else if (Common_1.default.isMergeBomb(Constant_1.CellType.Bomb5, Constant_1.CellType.Bomb5, type1, type2)) {
            //棋盘上所有元素被消除。 
            console.error('彩虹彩虹爆!');
            this.fireRainbow(target, Constant_1.CellType.Bomb5);
        }
        else if (Common_1.default.isMergeBomb(Constant_1.CellType.Bomb4, Constant_1.CellType.Bomb1, type1, type2)) {
            //飞机飞起，选择随机地点降落后，降落点圆形炸弹爆炸。
            console.error('飞机圆爆!');
            this.fireExecTypePlane(target, Constant_1.CellType.Bomb4, Constant_1.CellType.Bomb1);
        }
        else if (Common_1.default.isMergeBomb(Constant_1.CellType.Bomb4, Constant_1.CellType.Bomb2, type1, type2)) {
            //飞机飞起，选择随机地点降落后，降落点横向炸弹爆炸。
            console.error('飞机横爆!');
            this.fireExecTypePlane(target, Constant_1.CellType.Bomb4, Constant_1.CellType.Bomb2);
        }
        else if (Common_1.default.isMergeBomb(Constant_1.CellType.Bomb4, Constant_1.CellType.Bomb3, type1, type2)) {
            //飞机飞起，选择随机地点降落后，降落点竖向炸弹爆炸。
            console.error('飞机竖爆!');
            this.fireExecTypePlane(target, Constant_1.CellType.Bomb4, Constant_1.CellType.Bomb3);
        }
        else if (Common_1.default.isMergeBomb(Constant_1.CellType.Bomb4, Constant_1.CellType.Bomb4, type1, type2)) {
            //生成3个飞机并且激活。 
            console.error('章鱼章鱼!');
            this.fireThreePlane(target);
        }
        else if (Common_1.default.isMergeBomb(Constant_1.CellType.Bomb3, Constant_1.CellType.Bomb1, type1, type2)) {
            //形成三行宽的十字方向爆炸。
            console.error('三行十字爆!');
            this.threeColAndRow(target, 1);
        }
        else if (Common_1.default.isMergeBomb(Constant_1.CellType.Bomb3, Constant_1.CellType.Bomb2, type1, type2)) {
            //十字方向横竖爆破。
            console.error('十字爆!');
            this.colAndRow(target);
        }
        else if (Common_1.default.isMergeBomb(Constant_1.CellType.Bomb3, Constant_1.CellType.Bomb3, type1, type2)) {
            //十字方向横竖爆破。
            console.error('十字爆!');
            this.colAndRow(target);
        }
        else if (Common_1.default.isMergeBomb(Constant_1.CellType.Bomb2, Constant_1.CellType.Bomb1, type1, type2)) {
            //形成三行宽的十字方向爆炸。
            console.error('三行十字爆!');
            this.threeColAndRow(target, 0);
        }
        else if (Common_1.default.isMergeBomb(Constant_1.CellType.Bomb2, Constant_1.CellType.Bomb2, type1, type2)) {
            //十字方向横竖爆破。
            console.error('十字爆!');
            this.colAndRow(target, 101);
        }
        else if (Common_1.default.isMergeBomb(Constant_1.CellType.Bomb1, Constant_1.CellType.Bomb1, type1, type2)) {
            //形成7*7（去掉四个角）的范围的大爆炸。
            console.error('圆爆圆爆!');
            this.doubleRoundBomb(target);
        }
        this._tempGroupId = null;
    };
    BombModel.prototype.doubleRoundBomb = function (target) {
        return __awaiter(this, void 0, void 0, function () {
            var groupId, closeAry, keepTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        groupId = this._tempGroupId;
                        target.extCtrl.playBombSingleDestoryEff(0, TimeConfig_1.GapTime.BombMergeBombChangeTime, false, groupId);
                        return [4 /*yield*/, EffLayerCtrl_1.default.ins.playBombAndBomb(Common_1.default.convertCurWorldPos(target.extData.position))];
                    case 1:
                        _a.sent();
                        closeAry = this.getBombRangeCell(target.pos, 3);
                        keepTime = this.getBombDelayExecDestoryTime(Constant_1.CellType.Bomb1);
                        target.forcedResetType(Constant_1.CellType.Bomb1);
                        GameModel_1.default.ins.execElimate(target, closeAry, Constant_1.ElimateType.DoubleBomb, this.getBombLv(Constant_1.CellType.Bomb1), keepTime, groupId);
                        return [2 /*return*/];
                }
            });
        });
    };
    // private centerFill(centerPos: cc.Vec2, closeAry: Set<CellModel>, isRow: boolean = false): CellModel {
    //     if (closeAry.size <= 0) return;
    //     let newCenterModel = null;
    //     if (isRow) {
    //         const ary = Array.from(closeAry);
    //         const dirs = [cc.v2(0, 1), cc.v2(0, -1)];
    //         for (let i = ary.length; i--;) {
    //             for (let j = dirs.length; j--;) {
    //                 const cell = Common.safeGet2ArrayValue(GameModel.ins.CellList, centerPos.add(dirs[j]));
    //                 if (cell && closeAry.has(cell)) {
    //                     newCenterModel = cell;
    //                     i = 0; break;
    //                 }
    //             }
    //         }
    //     } else {
    //     }
    //     return newCenterModel;
    // }
    BombModel.prototype.threeColAndRow = function (target, convertType) {
        return __awaiter(this, void 0, void 0, function () {
            var groupId, _closeAry, extInfo, i, dir, pos, type, closeAry, keepTime, i, type, closeAry, keepTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        groupId = this._tempGroupId;
                        target.extCtrl.playBombSingleDestoryEff(0, TimeConfig_1.GapTime.BombMergeBombChangeTime, false, groupId);
                        return [4 /*yield*/, EffLayerCtrl_1.default.ins.playBombAndFish(Common_1.default.convertCurWorldPos(target.extData.position))];
                    case 1:
                        _a.sent();
                        _closeAry = [];
                        extInfo = [];
                        for (i = Common_1.default.Dir4.length; i--;) {
                            dir = Common_1.default.Dir4[i];
                            pos = target.pos.add(dir);
                            type = null;
                            if (dir.x == 0) {
                                type = Constant_1.CellType.Bomb2;
                            }
                            else {
                                type = Constant_1.CellType.Bomb3;
                            }
                            closeAry = this.getBombCloseAry(type, pos);
                            keepTime = this.getBombDelayExecDestoryTime(type);
                            extInfo.push({ pos: pos, keepTime: keepTime, closeAry: closeAry, type: type });
                            _closeAry = _closeAry.concat(Array.from(closeAry));
                        }
                        for (i = 2; i--;) {
                            type = i % 2 == 0 ? Constant_1.CellType.Bomb2 : Constant_1.CellType.Bomb3;
                            closeAry = this.getBombCloseAry(type, target.pos);
                            keepTime = this.getBombDelayExecDestoryTime(type);
                            extInfo.push({ pos: target.pos, keepTime: keepTime, closeAry: closeAry, type: type });
                            _closeAry = _closeAry.concat(Array.from(closeAry));
                        }
                        target.extCtrl.preDestory();
                        GameModel_1.default.ins.execElimate(target, new Set(_closeAry), Constant_1.ElimateType.ThreeRowAndCol, extInfo, null, groupId);
                        return [2 /*return*/];
                }
            });
        });
    };
    BombModel.prototype.colAndRow = function (target, index, isShowAni, eType) {
        if (index === void 0) { index = 0; }
        if (isShowAni === void 0) { isShowAni = true; }
        if (eType === void 0) { eType = Constant_1.ElimateType.RowAndCol; }
        return __awaiter(this, void 0, void 0, function () {
            var groupId, cs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        groupId = this._tempGroupId;
                        if (!isShowAni) return [3 /*break*/, 2];
                        /*
                        if (index != 101) {
                        await target.extCtrl.playComplexBombAni(null);
                        }*/
                        target.extCtrl.playBombSingleDestoryEff(0, TimeConfig_1.GapTime.BombMergeBombChangeTime, false, groupId);
                        return [4 /*yield*/, EffLayerCtrl_1.default.ins.playFishAndFish(Common_1.default.convertCurWorldPos(target.extData.position))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        cs = [this.rowBomb(target.pos), this.colBomb(target.pos)];
                        cs.forEach(function (closeAry, index) {
                            GameModel_1.default.ins.execElimate(target, closeAry, eType, (index == 0 ? Constant_1.CellType.Bomb2 : Constant_1.CellType.Bomb3), null, groupId);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    BombModel.prototype._caihongZhangyu = function (target, convertType) {
        return __awaiter(this, void 0, void 0, function () {
            var groupId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        groupId = this._tempGroupId;
                        //await target.extCtrl.playComplexBombAni(null);
                        target.extCtrl.playBombSingleDestoryEff(0, TimeConfig_1.GapTime.BombMergeBombChangeTime, false, groupId);
                        return [4 /*yield*/, EffLayerCtrl_1.default.ins.playHaimaAndZhangyu(Common_1.default.convertCurWorldPos(target.extData.position))];
                    case 1:
                        _a.sent();
                        this.fireRainbow(target, convertType, groupId);
                        return [2 /*return*/];
                }
            });
        });
    };
    BombModel.prototype.fireRainbow = function (target, convertType, groupId) {
        if (groupId === void 0) { groupId = null; }
        return __awaiter(this, void 0, void 0, function () {
            var timeline, count_1, _loop_1, i, state_1, chipset, closeAry, i, type;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!groupId) {
                            groupId = this._tempGroupId;
                            ;
                        }
                        return [4 /*yield*/, target.extCtrl.playComplexBombAni(null)];
                    case 1:
                        _a.sent();
                        if (!(convertType == Constant_1.CellType.Bomb5)) return [3 /*break*/, 3];
                        //海马+海马
                        // await EffLayerCtrl.ins.playItemHeti(Common.convertCurWorldPos(<any>target.extData.position),
                        //     NodePoolKey.HaimaAndHetun, EffLayerCtrl.ins.haimaAndHetuanPrefab, "haimaHaima");
                        // await EffLayerCtrl.ins.playItemHeti(Common.convertCurWorldPos(<any>target.extData.position),
                        //     NodePoolKey.HaimaAndHaima, EffLayerCtrl.ins.haimaAndHaima, "haimaHaima");
                        target.extCtrl.playBombSingleDestoryEff(0, TimeConfig_1.GapTime.BombMergeBombChangeTime, false, groupId);
                        return [4 /*yield*/, EffLayerCtrl_1.default.ins.playHaimaAndHaima(Common_1.default.convertCurWorldPos(target.extData.position))];
                    case 2:
                        _a.sent();
                        RuntimeMgr_1.default.ins.pauseGame();
                        timeline = new gsap.TimelineMax();
                        timeline.autoRemoveChildren = true;
                        count_1 = 0;
                        _loop_1 = function (i) {
                            var ary = Common_1.default.getAroundCircleCells(target.pos, i, false);
                            if (ary.size == 0)
                                return "break";
                            count_1++;
                            timeline.add(gsap.TweenLite.delayedCall(TimeConfig_1.GapTime.DoubleRainbowWaves, function () {
                                count_1--;
                                GameModel_1.default.ins.execElimate(target, ary, Constant_1.ElimateType.All, count_1, null, groupId);
                            }));
                        };
                        for (i = 0; i < 50; i++) {
                            state_1 = _loop_1(i);
                            if (state_1 === "break")
                                break;
                        }
                        return [3 /*break*/, 9];
                    case 3:
                        target.extCtrl.playBombSingleDestoryEff(0.2, 0.2, false, groupId);
                        if (!(convertType == Constant_1.CellType.Bomb1)) return [3 /*break*/, 5];
                        //气泡鱼+海马
                        return [4 /*yield*/, EffLayerCtrl_1.default.ins.playItemHeti(Common_1.default.convertCurWorldPos(target.extData.position), Constant_1.NodePoolKey.HaimaAndHetun, EffLayerCtrl_1.default.ins.haimaAndHetuanPrefab, "hetunHaima")];
                    case 4:
                        //气泡鱼+海马
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 5:
                        if (!(convertType == Constant_1.CellType.Bomb2)) return [3 /*break*/, 7];
                        //箭鱼+海马
                        return [4 /*yield*/, EffLayerCtrl_1.default.ins.playItemHeti(Common_1.default.convertCurWorldPos(target.extData.position), Constant_1.NodePoolKey.HaimaAndHetun, EffLayerCtrl_1.default.ins.haimaAndHetuanPrefab, "jianyuHaima")];
                    case 6:
                        //箭鱼+海马
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        if (convertType == Constant_1.CellType.Bomb4) {
                            /*
                            //章鱼+海马
                             await EffLayerCtrl.ins.playItemHeti(Common.convertCurWorldPos(<any>target.extData.position),
                             NodePoolKey.HaimaAndHetun,EffLayerCtrl.ins.haimaAndHetuanPrefab,"zhangyuHaima");
                             */
                        }
                        _a.label = 8;
                    case 8:
                        chipset = GameModel_1.default.ins.getLvData().chipset;
                        closeAry = null;
                        for (i = chipset.length; i--;) {
                            type = chipset[i].type;
                            if (type < Constant_1.CellType.Banana) {
                                closeAry = this.rainbow(type);
                                if (closeAry.size > 5) {
                                    break;
                                }
                            }
                        }
                        closeAry.forEach(function (cell) {
                            if (cell && cell.extCtrl && !GameModel_1.default.ins.isHavaSpe(cell.pos)) {
                                cell.isExecBomb = true;
                                cell.GroupId = groupId;
                                cell.extCtrl.change2Bomb(convertType);
                            }
                        });
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    BombModel.prototype.fireExecTypePlane = function (target, type1, execType) {
        return __awaiter(this, void 0, void 0, function () {
            var groupId, closeAry;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        groupId = this._tempGroupId;
                        return [4 /*yield*/, target.extCtrl.playComplexBombAni(null)];
                    case 1:
                        _a.sent();
                        if (execType == Constant_1.CellType.Bomb2) {
                            //章鱼+剑鱼
                            // await EffLayerCtrl.ins.playItemHeti(Common.convertCurWorldPos(<any>target.extData.position),
                            //     NodePoolKey.ZhangyuAndJianyu, EffLayerCtrl.ins.zhangyuAndJianyu, "zhangyu_tiao_jianyu");
                            // await EffLayerCtrl.ins.playZhangyuAndJianyu(Common.convertCurWorldPos(<any>target.extData.position));
                        }
                        else if (execType == Constant_1.CellType.Bomb1) {
                            //章鱼+气泡鱼
                            // await EffLayerCtrl.ins.playItemHeti(Common.convertCurWorldPos(<any>target.extData.position),
                            //     NodePoolKey.ZhangyuAndJianyu, EffLayerCtrl.ins.zhangyuAndJianyu, "zhangyu_tiao_hetun");
                        }
                        closeAry = this.getBombCloseAry(type1, target.pos);
                        target.forcedResetType(type1);
                        GameModel_1.default.ins.execElimate(target, closeAry, execType, execType, null, groupId);
                        return [2 /*return*/];
                }
            });
        });
    };
    BombModel.prototype.fireThreePlane = function (target) {
        return __awaiter(this, void 0, void 0, function () {
            var groupId, timeline1, closeAry, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        groupId = this._tempGroupId;
                        //await target.extCtrl.playComplexBombAni(null);
                        //章鱼+章鱼
                        // await EffLayerCtrl.ins.playItemHeti(Common.convertCurWorldPos(<any>target.extData.position),
                        //     NodePoolKey.HaimaAndHetun, EffLayerCtrl.ins.haimaAndHetuanPrefab, "zhangyuZhangyu");
                        //章鱼+章鱼
                        return [4 /*yield*/, EffLayerCtrl_1.default.ins.playZhangyuAndZhangyu(Common_1.default.convertCurWorldPos(target.extData.position))];
                    case 1:
                        //await target.extCtrl.playComplexBombAni(null);
                        //章鱼+章鱼
                        // await EffLayerCtrl.ins.playItemHeti(Common.convertCurWorldPos(<any>target.extData.position),
                        //     NodePoolKey.HaimaAndHetun, EffLayerCtrl.ins.haimaAndHetuanPrefab, "zhangyuZhangyu");
                        //章鱼+章鱼
                        _a.sent();
                        timeline1 = new gsap.TimelineMax();
                        timeline1.autoRemoveChildren = true;
                        closeAry = this.getBombCloseAry(target.getType(), target.pos);
                        for (i = 3; i--;) {
                            timeline1.add(gsap.TweenLite.delayedCall(TimeConfig_1.GapTime.ThreePlaneCreate, function () {
                                GameModel_1.default.ins.execElimate(target, closeAry, Constant_1.ElimateType.ThreeOctopus, null, null, groupId);
                            }));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // public static test11111(bombPos: cc.Vec2, level: number): Set<CellModel> {
    //     const closeAry = new Set<CellModel>();
    //     const range = BOMBS_RANGE[level];//BOMBS_RANGE[this.type - 10];
    //     //找到中心
    //     const cy = (range.length - 1) / 2;
    //     const cells = GameModel.ins.CellList;
    //     for (let i = -cy; i <= cy; i++) {
    //         for (let j = -cy; j <= cy; j++) {
    //             if (i == 0 && j == 0) continue;
    //             if (range[i + cy][j + cy] == 1) {
    //                 const cellPos = cc.v2(bombPos.x + j, bombPos.y + i);
    //                 //边界的不能炸!
    //                 if (cellPos.x < 0 || cellPos.y < 0) continue;
    //                 const model = Common.safeGet2ArrayValue(cells, cellPos);
    //                 if (model && !model.isDeath /* && !model.isFalling()*/) {
    //                     closeAry.add(model);
    //                     GameModel.ins.Lock.unLockFallPos(cellPos);
    //                     GameModel.ins.Lock.unLockFallLockByKey(cellPos);
    //                 }
    //             }
    //         }
    //     }
    //     return closeAry;
    // }
    BombModel.prototype.getBombRangeCell = function (bombPos, level) {
        var closeAry = new Set();
        var range = BOMBS_RANGE[level]; //BOMBS_RANGE[this.type - 10];
        //找到中心
        var cy = (range.length - 1) / 2;
        var cells = GameModel_1.default.ins.CellList;
        for (var i = -cy; i <= cy; i++) {
            for (var j = -cy; j <= cy; j++) {
                if (i == 0 && j == 0)
                    continue;
                if (range[i + cy][j + cy] == 1) {
                    var cellPos = cc.v2(bombPos.x + j, bombPos.y + i);
                    //边界的不能炸!
                    if (cellPos.x < 0 || cellPos.y < 0)
                        continue;
                    var cell = Common_1.default.safeGet2ArrayValue(cells, cellPos);
                    if (cell && !cell.isDeath /*&& !cell.isFalling()*/) {
                        closeAry.add(cell);
                        GameModel_1.default.ins.Lock.unLockFallPos(cellPos);
                        GameModel_1.default.ins.Lock.unLockFallLockByKey(cellPos);
                    }
                }
            }
        }
        return closeAry;
    };
    //横消 
    BombModel.prototype.rowBomb = function (pos) {
        var cmList = GameModel_1.default.ins.CellList;
        var closeAry = new Set(cmList[pos.y]);
        return closeAry;
    };
    //竖消
    BombModel.prototype.colBomb = function (pos) {
        var cmList = GameModel_1.default.ins.CellList;
        var closeAry = new Set();
        for (var i = GameModel_1.default.GridSize.H; i--;) {
            var cm = Common_1.default.safeGet2ArrayValue(cmList, cc.v2(pos.x, i));
            cm && closeAry.add(cm);
        }
        return closeAry;
    };
    BombModel.prototype.rainbow = function (rainType) {
        //同色
        var cmList = GameModel_1.default.ins.CellList;
        var closeAry = new Set();
        for (var y = cmList.length; y--;) {
            var xList = cmList[y];
            for (var x = xList.length; x--;) {
                var cm = xList[x];
                if (cm && cm.getType() == rainType && !GameModel_1.default.ins.isHavaObs(cm.pos)) {
                    closeAry.add(cm);
                }
            }
        }
        return closeAry;
    };
    return BombModel;
}(CellBase_1.CellBase));
exports.BombModel = BombModel;
var BOMBS_LEVEL = [
    2, 2, 2, 1, 1, 1
];
var BOMBS_RANGE = [
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]
    ], [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ], [
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
    ], [
        [0, 0, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0],
    ],
    [
        [0, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0],
    ]
];

cc._RF.pop();