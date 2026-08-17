
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/BombModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcQm9tYk1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBK0M7QUFHL0MseUNBQW9DO0FBQ3BDLDhDQUF5QztBQUN6QyxvREFBK0M7QUFDL0Msc0RBQStFO0FBQy9FLDBEQUFzRDtBQUV0RCxxREFBZ0Q7QUFFaEQ7SUFBK0IsNkJBQXFDO0lBRWhFO1FBQUEsWUFDSSxpQkFBTyxTQUVWO1FBaUlPLGtCQUFZLEdBQUcsSUFBSSxDQUFDO1FBbEl4QixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7SUFDckIsQ0FBQztJQUVNLHdCQUFJLEdBQVgsVUFBWSxJQUFTLEVBQUUsQ0FBVSxFQUFFLENBQVU7UUFDekMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVZLDRCQUFRLEdBQXJCLFVBQXNCLFFBQW1CLEVBQUUsSUFBcUIsRUFBRSxPQUFzQjtRQUE3QyxxQkFBQSxFQUFBLFdBQXFCO1FBQUUsd0JBQUEsRUFBQSxjQUFzQjs7OztnQkFFcEYsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksbUJBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLElBQUk7b0JBQUUsc0JBQU87Z0JBQzNELFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM5RSxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLG1CQUFRLENBQUMsS0FBSyxFQUFFO29CQUNoRixRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztv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Q0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDZixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDZixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDZixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDbEIsRUFBRTtRQUNDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3hCO0lBQ0Q7UUFDSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUM5QjtDQUNKLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZWxsQmFzZSwgTXNnVHlwZSB9IGZyb20gXCIuL0NlbGxCYXNlXCI7XG5pbXBvcnQgeyBDZWxsTW9kZWwgfSBmcm9tIFwiLi9DZWxsTW9kZWxcIjtcbmltcG9ydCBJdGVtQmFzaWNDZWxsQ3RybCBmcm9tIFwiLi4vVmlldy9JdGVtQmFzaWNDZWxsQ3RybFwiO1xuaW1wb3J0IEdhbWVNb2RlbCBmcm9tIFwiLi9HYW1lTW9kZWxcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCBSdW50aW1lTWdyIGZyb20gXCIuLi8uLi9EYXRhL1J1bnRpbWVNZ3JcIjtcbmltcG9ydCB7IENlbGxUeXBlLCBFbGltYXRlVHlwZSwgTm9kZVBvb2xLZXkgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IHsgR2FwVGltZSB9IGZyb20gXCIuLi8uLi9EYXRhL0NvbnN0L1RpbWVDb25maWdcIjtcbmltcG9ydCB7IENoaXBzZXQgfSBmcm9tIFwiLi4vLi4vRGF0YS9JbnRlcmZhY2UvTGV2ZWwvSUxldmVsXCI7XG5pbXBvcnQgRWZmTGF5ZXJDdHJsIGZyb20gXCIuLi9WaWV3L0VmZkxheWVyQ3RybFwiO1xuXG5leHBvcnQgY2xhc3MgQm9tYk1vZGVsIGV4dGVuZHMgQ2VsbEJhc2U8Q2VsbFR5cGUsIEl0ZW1CYXNpY0NlbGxDdHJsPiB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50eXBlID0gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdCh0eXBlOiBhbnksIHg/OiBudW1iZXIsIHk/OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZXhlY0JvbWIoYm9tYkNlbGw6IENlbGxNb2RlbCwgdHlwZTogQ2VsbFR5cGUgPSBudWxsLCBncm91cElkOiBudW1iZXIgPSBudWxsKSB7XG5cbiAgICAgICAgaWYgKGJvbWJDZWxsLmdldFR5cGUoKSA9PSBDZWxsVHlwZS5Cb21iNSAmJiB0eXBlID09IG51bGwpIHJldHVybjtcbiAgICAgICAgY29uc3QgY2xvc2VBcnkgPSB0aGlzLmdldEJvbWJDbG9zZUFyeShib21iQ2VsbC5nZXRUeXBlKCksIGJvbWJDZWxsLnBvcywgdHlwZSk7XG4gICAgICAgIGlmIChib21iQ2VsbC5pc0RlYXRoICYmIGNsb3NlQXJ5LnNpemUgPT0gMCAmJiBib21iQ2VsbC5nZXRUeXBlKCkgIT0gQ2VsbFR5cGUuQm9tYjQpIHtcbiAgICAgICAgICAgIGJvbWJDZWxsLmlzQm9tYiA9IGZhbHNlO1xuICAgICAgICAgICAgYm9tYkNlbGwuZXh0Q3RybC5lbGltYXRlKDEsIG51bGwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qga2VlcFRpbWUgPSB0aGlzLmdldEJvbWJEZWxheUV4ZWNEZXN0b3J5VGltZShib21iQ2VsbC5nZXRUeXBlKCkpO1xuICAgICAgICBjb25zdCBib29tTGV2ZWwgPSB0aGlzLmdldEJvbWJMdih0aGlzLnR5cGUpO1xuXG4gICAgICAgIC8vIGF3YWl0IHRoaXMucGxheUJvbWJFZmYodGhpcy50eXBlKTsgXG4gICAgICAgIEdhbWVNb2RlbC5pbnMuZXhlY0VsaW1hdGUoYm9tYkNlbGwsIGNsb3NlQXJ5LCA8YW55PmJvbWJDZWxsLmdldFR5cGUoKSwgYm9vbUxldmVsLCBrZWVwVGltZSwgZ3JvdXBJZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZXhlY09uZUJvbWJCeVBvcyh0eXBlOiBDZWxsVHlwZSwgcG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIGlmIChDb21tb24uaXNCb21iVHlwZSh0eXBlKSAmJiBwb3MpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsb3NlQXJ5ID0gdGhpcy5nZXRCb21iQ2xvc2VBcnkodHlwZSwgcG9zLCB0eXBlKTtcbiAgICAgICAgICAgIGNvbnN0IGtlZXBUaW1lID0gdGhpcy5nZXRCb21iRGVsYXlFeGVjRGVzdG9yeVRpbWUodHlwZSk7XG4gICAgICAgICAgICBjb25zdCBib29tTGV2ZWwgPSB0aGlzLmdldEJvbWJMdih0aGlzLnR5cGUpO1xuICAgICAgICAgICAgY29uc3QgY2VudGVyQ2VsbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUoR2FtZU1vZGVsLmlucy5DZWxsTGlzdCwgcG9zKTtcbiAgICAgICAgICAgIEdhbWVNb2RlbC5pbnMuZXhlY0VsaW1hdGUoY2VudGVyQ2VsbCwgY2xvc2VBcnksIDxhbnk+dHlwZSwgYm9vbUxldmVsLCBrZWVwVGltZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25DaGFuZ2VQb3MocG9zOiBjYy5WZWMyKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgb25Nc2codHlwZTogTXNnVHlwZSkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIG9uQmluZCgpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBvblVuQmluZCgpIHtcblxuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiDojrflj5bngrjlvLnlu7bov5/miafooYzplIDmr4HliqjnlLvnmoTml7bpl7RcbiAgICAgKiBAcGFyYW0gdHlwZSBcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEJvbWJEZWxheUV4ZWNEZXN0b3J5VGltZSh0eXBlOiBDZWxsVHlwZSk6IG51bWJlciB7XG4gICAgICAgIGxldCB0aW1lID0gbnVsbDtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIENlbGxUeXBlLkJvbWIxOlxuICAgICAgICAgICAgICAgIHRpbWUgPSBHYXBUaW1lLk5vcm1hbEJvbWJEZWxheUVsaW1hdGU7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgQ2VsbFR5cGUuQm9tYjQ6XG4gICAgICAgICAgICAgICAgdGltZSA9IEdhcFRpbWUuT2N0b3B1c0RlbGF5RWxpbWF0ZTtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBDZWxsVHlwZS5GaXNoOlxuICAgICAgICAgICAgICAgIHRpbWUgPSBHYXBUaW1lLkZpc2hCb21iRGVsYXlFbGltYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRCb21iTHYodHlwZTogQ2VsbFR5cGUpOiBudW1iZXIge1xuICAgICAgICBsZXQgbHYgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgQ2VsbFR5cGUuQm9tYjE6XG4gICAgICAgICAgICAgICAgbHYgPSBCT01CU19MRVZFTFswXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ2VsbFR5cGUuRmlzaDpcbiAgICAgICAgICAgICAgICBsdiA9IEJPTUJTX0xFVkVMWzNdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDZWxsVHlwZS5Cb21iMjpcbiAgICAgICAgICAgIGNhc2UgQ2VsbFR5cGUuQm9tYjM6XG4gICAgICAgICAgICAgICAgbHYgPSB0eXBlO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGx2O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWQiOiuoeS4gOS4queCuOW8ueeahOiMg+WbtFxuICAgICAqIEBwYXJhbSB0eXBlIOexu+Wei1xuICAgICAqIEBwYXJhbSBwb3Mg5Z2Q5qCHXG4gICAgICogQHBhcmFtIHJhaW5ib3dUeXBlIOW9qeiZueWMuemFjeeahOWFg+e0oCFcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldEJvbWJDbG9zZUFyeSh0eXBlOiBDZWxsVHlwZSwgcG9zOiBjYy5WZWMyLCByYWluYm93VHlwZTogQ2VsbFR5cGUgPSBudWxsKTogU2V0PENlbGxNb2RlbD4ge1xuICAgICAgICBsZXQgY2xvc2VBcnkgPSBudWxsO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBDZWxsVHlwZS5Cb21iMTogICAgICAgIC8v5ZyG5b2i54K45by5XG4gICAgICAgICAgICAgICAgY2xvc2VBcnkgPSB0aGlzLmdldEJvbWJSYW5nZUNlbGwocG9zLCAyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ2VsbFR5cGUuQm9tYjI6ICAgICAgICAvL+aoquWQkeeCuOW8uVxuICAgICAgICAgICAgICAgIGNsb3NlQXJ5ID0gdGhpcy5yb3dCb21iKHBvcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENlbGxUeXBlLkJvbWIzOiAgICAgICAgLy/nq5blkJHngrjlvLlcbiAgICAgICAgICAgICAgICBjbG9zZUFyeSA9IHRoaXMuY29sQm9tYihwb3MpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDZWxsVHlwZS5Cb21iNTogICAgICAgIC8v5b2p6Jm554K45by5XG4gICAgICAgICAgICAgICAgaWYgKCFyYWluYm93VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGlwc2V0ID0gR2FtZU1vZGVsLmlucy5nZXRMdkRhdGEoKS5jaGlwc2V0O1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEl0ZW06IENoaXBzZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBjaGlwc2V0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLnR5cGUgPCBDZWxsVHlwZS5JY2VDcmVhbSAmJiAoIXRlbXBJdGVtIHx8IGl0ZW0ucGVyY2VudCA+IHRlbXBJdGVtLnBlcmNlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEl0ZW0gPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICByYWluYm93VHlwZSA9IHRlbXBJdGVtLnR5cGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsb3NlQXJ5ID0gdGhpcy5yYWluYm93KHJhaW5ib3dUeXBlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ2VsbFR5cGUuQm9tYjQ6ICAgICAgICAvL+mjnuaculxuICAgICAgICAgICAgICAgIGNsb3NlQXJ5ID0gdGhpcy5nZXRCb21iUmFuZ2VDZWxsKHBvcywgMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENlbGxUeXBlLkZpc2g6XG4gICAgICAgICAgICAgICAgY2xvc2VBcnkgPSB0aGlzLmdldEJvbWJSYW5nZUNlbGwocG9zLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xvc2VBcnk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdGVtcEdyb3VwSWQgPSBudWxsO1xuICAgIHB1YmxpYyBvbkJvbWJNZXJnZUJvbWIodHlwZTE6IENlbGxUeXBlLCB0eXBlMjogQ2VsbFR5cGUsIHRhcmdldDogQ2VsbE1vZGVsLCBncm91cElkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdGVtcEdyb3VwSWQgPSBncm91cElkO1xuICAgICAgICBpZiAoQ29tbW9uLmlzTWVyZ2VCb21iKENlbGxUeXBlLkJvbWI1LCBDZWxsVHlwZS5Cb21iMSwgdHlwZTEsIHR5cGUyKSkge1xuICAgICAgICAgICAgLy/mo4vnm5jkuIrpgInmi6noi6XlubLpmo/mnLrlhYPntKDlj5jmiJDlnIblvaLngrjlvLnvvIznhLblkI7lvJXniIZcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+W9qeiZueWchueIhiEnKTtcbiAgICAgICAgICAgIHRoaXMuZmlyZVJhaW5ib3codGFyZ2V0LCBDZWxsVHlwZS5Cb21iMSk7XG4gICAgICAgIH0gZWxzZSBpZiAoQ29tbW9uLmlzTWVyZ2VCb21iKENlbGxUeXBlLkJvbWI1LCBDZWxsVHlwZS5Cb21iMiwgdHlwZTEsIHR5cGUyKSkge1xuICAgICAgICAgICAgLy/mo4vnm5jkuIrpgInmi6noi6XlubLpmo/mnLrlhYPntKDlj5jmiJDmqKrlkJHngrjlvLnvvIznhLblkI7lvJXniIbjgIJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+W9qeiZueaoqueIhiEnKTtcbiAgICAgICAgICAgIHRoaXMuZmlyZVJhaW5ib3codGFyZ2V0LCBDZWxsVHlwZS5Cb21iMik7XG4gICAgICAgIH0gZWxzZSBpZiAoQ29tbW9uLmlzTWVyZ2VCb21iKENlbGxUeXBlLkJvbWI1LCBDZWxsVHlwZS5Cb21iMywgdHlwZTEsIHR5cGUyKSkge1xuICAgICAgICAgICAgLy/mo4vnm5jkuIrpgInmi6noi6XlubLpmo/mnLrlhYPntKDlj5jmiJDnq5blkJHngrjlvLnvvIznhLblkI7lvJXniIbjgIIgXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCflvanombnnq5bniIYhJyk7XG4gICAgICAgICAgICB0aGlzLmZpcmVSYWluYm93KHRhcmdldCwgQ2VsbFR5cGUuQm9tYjMpO1xuICAgICAgICB9IGVsc2UgaWYgKENvbW1vbi5pc01lcmdlQm9tYihDZWxsVHlwZS5Cb21iNSwgQ2VsbFR5cGUuQm9tYjQsIHR5cGUxLCB0eXBlMikpIHtcbiAgICAgICAgICAgIC8v5qOL55uY5LiK6YCJ5oup6Iul5bmy6ZqP5py65YWD57Sg5Y+Y5oiQ6aOe5py677yM54S25ZCO5omA5pyJ6aOe5py65byV54iG44CCIFxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign5b2p6Jm56aOe5py654iGIScpO1xuICAgICAgICAgICAgdGhpcy5fY2FpaG9uZ1poYW5neXUodGFyZ2V0LCBDZWxsVHlwZS5Cb21iNCk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChDb21tb24uaXNNZXJnZUJvbWIoQ2VsbFR5cGUuQm9tYjUsIENlbGxUeXBlLkJvbWI1LCB0eXBlMSwgdHlwZTIpKSB7XG4gICAgICAgICAgICAvL+aji+ebmOS4iuaJgOacieWFg+e0oOiiq+a2iOmZpOOAgiBcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+W9qeiZueW9qeiZueeIhiEnKTtcbiAgICAgICAgICAgIHRoaXMuZmlyZVJhaW5ib3codGFyZ2V0LCBDZWxsVHlwZS5Cb21iNSk7XG4gICAgICAgIH0gZWxzZSBpZiAoQ29tbW9uLmlzTWVyZ2VCb21iKENlbGxUeXBlLkJvbWI0LCBDZWxsVHlwZS5Cb21iMSwgdHlwZTEsIHR5cGUyKSkge1xuICAgICAgICAgICAgLy/po57mnLrpo57otbfvvIzpgInmi6npmo/mnLrlnLDngrnpmY3okL3lkI7vvIzpmY3okL3ngrnlnIblvaLngrjlvLnniIbngrjjgIJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+mjnuacuuWchueIhiEnKTtcbiAgICAgICAgICAgIHRoaXMuZmlyZUV4ZWNUeXBlUGxhbmUodGFyZ2V0LCBDZWxsVHlwZS5Cb21iNCwgQ2VsbFR5cGUuQm9tYjEpO1xuICAgICAgICB9IGVsc2UgaWYgKENvbW1vbi5pc01lcmdlQm9tYihDZWxsVHlwZS5Cb21iNCwgQ2VsbFR5cGUuQm9tYjIsIHR5cGUxLCB0eXBlMikpIHtcbiAgICAgICAgICAgIC8v6aOe5py66aOe6LW377yM6YCJ5oup6ZqP5py65Zyw54K56ZmN6JC95ZCO77yM6ZmN6JC954K55qiq5ZCR54K45by554iG54K444CCXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCfpo57mnLrmqKrniIYhJyk7XG4gICAgICAgICAgICB0aGlzLmZpcmVFeGVjVHlwZVBsYW5lKHRhcmdldCwgQ2VsbFR5cGUuQm9tYjQsIENlbGxUeXBlLkJvbWIyKTtcbiAgICAgICAgfSBlbHNlIGlmIChDb21tb24uaXNNZXJnZUJvbWIoQ2VsbFR5cGUuQm9tYjQsIENlbGxUeXBlLkJvbWIzLCB0eXBlMSwgdHlwZTIpKSB7XG4gICAgICAgICAgICAvL+mjnuacuumjnui1t++8jOmAieaLqemaj+acuuWcsOeCuemZjeiQveWQju+8jOmZjeiQveeCueerluWQkeeCuOW8ueeIhueCuOOAglxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign6aOe5py656uW54iGIScpO1xuICAgICAgICAgICAgdGhpcy5maXJlRXhlY1R5cGVQbGFuZSh0YXJnZXQsIENlbGxUeXBlLkJvbWI0LCBDZWxsVHlwZS5Cb21iMyk7XG4gICAgICAgIH0gZWxzZSBpZiAoQ29tbW9uLmlzTWVyZ2VCb21iKENlbGxUeXBlLkJvbWI0LCBDZWxsVHlwZS5Cb21iNCwgdHlwZTEsIHR5cGUyKSkge1xuICAgICAgICAgICAgLy/nlJ/miJAz5Liq6aOe5py65bm25LiU5r+A5rS744CCIFxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign56ug6bG856ug6bG8IScpO1xuICAgICAgICAgICAgdGhpcy5maXJlVGhyZWVQbGFuZSh0YXJnZXQpO1xuICAgICAgICB9IGVsc2UgaWYgKENvbW1vbi5pc01lcmdlQm9tYihDZWxsVHlwZS5Cb21iMywgQ2VsbFR5cGUuQm9tYjEsIHR5cGUxLCB0eXBlMikpIHtcbiAgICAgICAgICAgIC8v5b2i5oiQ5LiJ6KGM5a6955qE5Y2B5a2X5pa55ZCR54iG54K444CCXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCfkuInooYzljYHlrZfniIYhJyk7XG4gICAgICAgICAgICB0aGlzLnRocmVlQ29sQW5kUm93KHRhcmdldCwgMSk7XG4gICAgICAgIH0gZWxzZSBpZiAoQ29tbW9uLmlzTWVyZ2VCb21iKENlbGxUeXBlLkJvbWIzLCBDZWxsVHlwZS5Cb21iMiwgdHlwZTEsIHR5cGUyKSkge1xuICAgICAgICAgICAgLy/ljYHlrZfmlrnlkJHmqKrnq5bniIbnoLTjgIJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+WNgeWtl+eIhiEnKTtcbiAgICAgICAgICAgIHRoaXMuY29sQW5kUm93KHRhcmdldCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQ29tbW9uLmlzTWVyZ2VCb21iKENlbGxUeXBlLkJvbWIzLCBDZWxsVHlwZS5Cb21iMywgdHlwZTEsIHR5cGUyKSkge1xuICAgICAgICAgICAgLy/ljYHlrZfmlrnlkJHmqKrnq5bniIbnoLTjgIJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+WNgeWtl+eIhiEnKTtcbiAgICAgICAgICAgIHRoaXMuY29sQW5kUm93KHRhcmdldCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQ29tbW9uLmlzTWVyZ2VCb21iKENlbGxUeXBlLkJvbWIyLCBDZWxsVHlwZS5Cb21iMSwgdHlwZTEsIHR5cGUyKSkge1xuICAgICAgICAgICAgLy/lvaLmiJDkuInooYzlrr3nmoTljYHlrZfmlrnlkJHniIbngrjjgIJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+S4ieihjOWNgeWtl+eIhiEnKTtcbiAgICAgICAgICAgIHRoaXMudGhyZWVDb2xBbmRSb3codGFyZ2V0LCAwKTtcbiAgICAgICAgfSBlbHNlIGlmIChDb21tb24uaXNNZXJnZUJvbWIoQ2VsbFR5cGUuQm9tYjIsIENlbGxUeXBlLkJvbWIyLCB0eXBlMSwgdHlwZTIpKSB7XG4gICAgICAgICAgICAvL+WNgeWtl+aWueWQkeaoquerlueIhuegtOOAglxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign5Y2B5a2X54iGIScpO1xuICAgICAgICAgICAgdGhpcy5jb2xBbmRSb3codGFyZ2V0LCAxMDEpO1xuICAgICAgICB9IGVsc2UgaWYgKENvbW1vbi5pc01lcmdlQm9tYihDZWxsVHlwZS5Cb21iMSwgQ2VsbFR5cGUuQm9tYjEsIHR5cGUxLCB0eXBlMikpIHtcbiAgICAgICAgICAgIC8v5b2i5oiQNyo377yI5Y675o6J5Zub5Liq6KeS77yJ55qE6IyD5Zu055qE5aSn54iG54K444CCXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCflnIbniIblnIbniIYhJyk7XG4gICAgICAgICAgICB0aGlzLmRvdWJsZVJvdW5kQm9tYih0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RlbXBHcm91cElkID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGRvdWJsZVJvdW5kQm9tYih0YXJnZXQ6IENlbGxNb2RlbCkge1xuICAgICAgICBjb25zdCBncm91cElkID0gdGhpcy5fdGVtcEdyb3VwSWQ7XG4gICAgICAgIHRhcmdldC5leHRDdHJsLnBsYXlCb21iU2luZ2xlRGVzdG9yeUVmZigwLCBHYXBUaW1lLkJvbWJNZXJnZUJvbWJDaGFuZ2VUaW1lLCBmYWxzZSwgZ3JvdXBJZCk7XG4gICAgICAgIGF3YWl0IEVmZkxheWVyQ3RybC5pbnMucGxheUJvbWJBbmRCb21iKENvbW1vbi5jb252ZXJ0Q3VyV29ybGRQb3MoPGFueT50YXJnZXQuZXh0RGF0YS5wb3NpdGlvbikpO1xuICAgICAgICBjb25zdCBjbG9zZUFyeSA9IHRoaXMuZ2V0Qm9tYlJhbmdlQ2VsbCh0YXJnZXQucG9zLCAzKTtcbiAgICAgICAgY29uc3Qga2VlcFRpbWUgPSB0aGlzLmdldEJvbWJEZWxheUV4ZWNEZXN0b3J5VGltZShDZWxsVHlwZS5Cb21iMSk7XG4gICAgICAgIHRhcmdldC5mb3JjZWRSZXNldFR5cGUoQ2VsbFR5cGUuQm9tYjEpO1xuICAgICAgICBHYW1lTW9kZWwuaW5zLmV4ZWNFbGltYXRlKHRhcmdldCwgY2xvc2VBcnksIEVsaW1hdGVUeXBlLkRvdWJsZUJvbWIsIHRoaXMuZ2V0Qm9tYkx2KENlbGxUeXBlLkJvbWIxKSwga2VlcFRpbWUsIGdyb3VwSWQpO1xuICAgIH1cblxuICAgIC8vIHByaXZhdGUgY2VudGVyRmlsbChjZW50ZXJQb3M6IGNjLlZlYzIsIGNsb3NlQXJ5OiBTZXQ8Q2VsbE1vZGVsPiwgaXNSb3c6IGJvb2xlYW4gPSBmYWxzZSk6IENlbGxNb2RlbCB7XG4gICAgLy8gICAgIGlmIChjbG9zZUFyeS5zaXplIDw9IDApIHJldHVybjtcbiAgICAvLyAgICAgbGV0IG5ld0NlbnRlck1vZGVsID0gbnVsbDtcbiAgICAvLyAgICAgaWYgKGlzUm93KSB7XG4gICAgLy8gICAgICAgICBjb25zdCBhcnkgPSBBcnJheS5mcm9tKGNsb3NlQXJ5KTtcbiAgICAvLyAgICAgICAgIGNvbnN0IGRpcnMgPSBbY2MudjIoMCwgMSksIGNjLnYyKDAsIC0xKV07XG4gICAgLy8gICAgICAgICBmb3IgKGxldCBpID0gYXJ5Lmxlbmd0aDsgaS0tOykge1xuICAgIC8vICAgICAgICAgICAgIGZvciAobGV0IGogPSBkaXJzLmxlbmd0aDsgai0tOykge1xuICAgIC8vICAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShHYW1lTW9kZWwuaW5zLkNlbGxMaXN0LCBjZW50ZXJQb3MuYWRkKGRpcnNbal0pKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgaWYgKGNlbGwgJiYgY2xvc2VBcnkuaGFzKGNlbGwpKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBuZXdDZW50ZXJNb2RlbCA9IGNlbGw7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBpID0gMDsgYnJlYWs7XG4gICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0gZWxzZSB7XG5cbiAgICAvLyAgICAgfVxuICAgIC8vICAgICByZXR1cm4gbmV3Q2VudGVyTW9kZWw7XG4gICAgLy8gfVxuXG4gICAgcHJpdmF0ZSBhc3luYyB0aHJlZUNvbEFuZFJvdyh0YXJnZXQ6IENlbGxNb2RlbCwgY29udmVydFR5cGU6IG51bWJlcikge1xuICAgICAgICBjb25zdCBncm91cElkID0gdGhpcy5fdGVtcEdyb3VwSWQ7XG5cbiAgICAgICAgdGFyZ2V0LmV4dEN0cmwucGxheUJvbWJTaW5nbGVEZXN0b3J5RWZmKDAsIEdhcFRpbWUuQm9tYk1lcmdlQm9tYkNoYW5nZVRpbWUsIGZhbHNlLCBncm91cElkKTtcblxuICAgICAgICBhd2FpdCBFZmZMYXllckN0cmwuaW5zLnBsYXlCb21iQW5kRmlzaChDb21tb24uY29udmVydEN1cldvcmxkUG9zKDxhbnk+dGFyZ2V0LmV4dERhdGEucG9zaXRpb24pKTtcblxuICAgICAgICAvKlxuICAgICAgICBpZiAoY29udmVydFR5cGUgPT0gMCkge1xuICAgICAgICAgICAgICAgIC8v5rCU5rOh6bG8K+euremxvFxuICAgICAgICAgICAgICAgIGF3YWl0IEVmZkxheWVyQ3RybC5pbnMucGxheUl0ZW1IZXRpKENvbW1vbi5jb252ZXJ0Q3VyV29ybGRQb3MoPGFueT50YXJnZXQuZXh0RGF0YS5wb3NpdGlvbiksXG4gICAgICAgICAgICAgICAgTm9kZVBvb2xLZXkuaGV0dWFuQW5kSmlhbnl1LEVmZkxheWVyQ3RybC5pbnMuaGV0dWFuQW5kSmlhbnl1LFwiamlhbnl1SGV0dW5cIik7XG4gICAgICAgIH1lbHNlIGlmKGNvbnZlcnRUeXBlID09IDEpe1xuICAgICAgICAgICAgICAgXG4gICAgICAgIH0qL1xuXG4gICAgICAgIGxldCBfY2xvc2VBcnk6IENlbGxNb2RlbFtdID0gW107XG4gICAgICAgIGxldCBleHRJbmZvID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSBDb21tb24uRGlyNC5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgIGNvbnN0IGRpciA9IENvbW1vbi5EaXI0W2ldO1xuICAgICAgICAgICAgY29uc3QgcG9zID0gdGFyZ2V0LnBvcy5hZGQoZGlyKTtcbiAgICAgICAgICAgIGxldCB0eXBlID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChkaXIueCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9IENlbGxUeXBlLkJvbWIyXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHR5cGUgPSBDZWxsVHlwZS5Cb21iM1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY2xvc2VBcnkgPSB0aGlzLmdldEJvbWJDbG9zZUFyeSh0eXBlLCBwb3MpO1xuICAgICAgICAgICAgY29uc3Qga2VlcFRpbWUgPSB0aGlzLmdldEJvbWJEZWxheUV4ZWNEZXN0b3J5VGltZSh0eXBlKTtcbiAgICAgICAgICAgIGV4dEluZm8ucHVzaCh7IHBvcywga2VlcFRpbWUsIGNsb3NlQXJ5LCB0eXBlIH0pXG4gICAgICAgICAgICBfY2xvc2VBcnkgPSBfY2xvc2VBcnkuY29uY2F0KEFycmF5LmZyb20oY2xvc2VBcnkpKVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAyOyBpLS07KSB7XG4gICAgICAgICAgICBsZXQgdHlwZSA9IGkgJSAyID09IDAgPyBDZWxsVHlwZS5Cb21iMiA6IENlbGxUeXBlLkJvbWIzO1xuICAgICAgICAgICAgY29uc3QgY2xvc2VBcnkgPSB0aGlzLmdldEJvbWJDbG9zZUFyeSh0eXBlLCB0YXJnZXQucG9zKTtcbiAgICAgICAgICAgIGNvbnN0IGtlZXBUaW1lID0gdGhpcy5nZXRCb21iRGVsYXlFeGVjRGVzdG9yeVRpbWUodHlwZSk7XG4gICAgICAgICAgICBleHRJbmZvLnB1c2goeyBwb3M6IHRhcmdldC5wb3MsIGtlZXBUaW1lLCBjbG9zZUFyeSwgdHlwZSB9KVxuICAgICAgICAgICAgX2Nsb3NlQXJ5ID0gX2Nsb3NlQXJ5LmNvbmNhdChBcnJheS5mcm9tKGNsb3NlQXJ5KSlcbiAgICAgICAgfVxuICAgICAgICB0YXJnZXQuZXh0Q3RybC5wcmVEZXN0b3J5KCk7XG4gICAgICAgIEdhbWVNb2RlbC5pbnMuZXhlY0VsaW1hdGUodGFyZ2V0LCBuZXcgU2V0KF9jbG9zZUFyeSksIEVsaW1hdGVUeXBlLlRocmVlUm93QW5kQ29sLCBleHRJbmZvLCBudWxsLCBncm91cElkKTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgYXN5bmMgY29sQW5kUm93KHRhcmdldDogQ2VsbE1vZGVsLCBpbmRleDogbnVtYmVyID0gMCwgaXNTaG93QW5pOiBib29sZWFuID0gdHJ1ZSwgZVR5cGU6IEVsaW1hdGVUeXBlID0gRWxpbWF0ZVR5cGUuUm93QW5kQ29sKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwSWQgPSB0aGlzLl90ZW1wR3JvdXBJZDtcbiAgICAgICAgaWYgKGlzU2hvd0FuaSkge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSAxMDEpIHtcbiAgICAgICAgICAgIGF3YWl0IHRhcmdldC5leHRDdHJsLnBsYXlDb21wbGV4Qm9tYkFuaShudWxsKTtcbiAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgdGFyZ2V0LmV4dEN0cmwucGxheUJvbWJTaW5nbGVEZXN0b3J5RWZmKDAsIEdhcFRpbWUuQm9tYk1lcmdlQm9tYkNoYW5nZVRpbWUsIGZhbHNlLCBncm91cElkKTtcbiAgICAgICAgICAgIGF3YWl0IEVmZkxheWVyQ3RybC5pbnMucGxheUZpc2hBbmRGaXNoKENvbW1vbi5jb252ZXJ0Q3VyV29ybGRQb3MoPGFueT50YXJnZXQuZXh0RGF0YS5wb3NpdGlvbikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgaWYgKGluZGV4ID09IDEwMSkge1xuICAgICAgICAgICAgIC8v566t6bG8K+euremxvFxuICAgICAgICAgICAgIGF3YWl0IEVmZkxheWVyQ3RybC5pbnMucGxheUl0ZW1IZXRpKENvbW1vbi5jb252ZXJ0Q3VyV29ybGRQb3MoPGFueT50YXJnZXQuZXh0RGF0YS5wb3NpdGlvbiksXG4gICAgICAgICAgICAgTm9kZVBvb2xLZXkuaGV0dWFuQW5kSmlhbnl1LEVmZkxheWVyQ3RybC5pbnMuaGV0dWFuQW5kSmlhbnl1LFwiamlhbnl1Smlhbnl1XCIpO1xuICAgICAgICB9Ki9cblxuICAgICAgICBjb25zdCBjcyA9IFt0aGlzLnJvd0JvbWIodGFyZ2V0LnBvcyksIHRoaXMuY29sQm9tYih0YXJnZXQucG9zKV07XG4gICAgICAgIGNzLmZvckVhY2goKGNsb3NlQXJ5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5leGVjRWxpbWF0ZSh0YXJnZXQsIGNsb3NlQXJ5LCBlVHlwZSwgKGluZGV4ID09IDAgPyBDZWxsVHlwZS5Cb21iMiA6IENlbGxUeXBlLkJvbWIzKSwgbnVsbCwgZ3JvdXBJZCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfY2FpaG9uZ1poYW5neXUodGFyZ2V0OiBDZWxsTW9kZWwsIGNvbnZlcnRUeXBlOiBDZWxsVHlwZSkge1xuICAgICAgICBjb25zdCBncm91cElkID0gdGhpcy5fdGVtcEdyb3VwSWQ7XG4gICAgICAgIC8vYXdhaXQgdGFyZ2V0LmV4dEN0cmwucGxheUNvbXBsZXhCb21iQW5pKG51bGwpO1xuICAgICAgICB0YXJnZXQuZXh0Q3RybC5wbGF5Qm9tYlNpbmdsZURlc3RvcnlFZmYoMCwgR2FwVGltZS5Cb21iTWVyZ2VCb21iQ2hhbmdlVGltZSwgZmFsc2UsIGdyb3VwSWQpO1xuICAgICAgICBhd2FpdCBFZmZMYXllckN0cmwuaW5zLnBsYXlIYWltYUFuZFpoYW5neXUoQ29tbW9uLmNvbnZlcnRDdXJXb3JsZFBvcyg8YW55PnRhcmdldC5leHREYXRhLnBvc2l0aW9uKSk7XG4gICAgICAgIHRoaXMuZmlyZVJhaW5ib3codGFyZ2V0LCBjb252ZXJ0VHlwZSwgZ3JvdXBJZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBmaXJlUmFpbmJvdyh0YXJnZXQ6IENlbGxNb2RlbCwgY29udmVydFR5cGU6IENlbGxUeXBlLCBncm91cElkOiBudW1iZXIgPSBudWxsKSB7XG4gICAgICAgIGlmICghZ3JvdXBJZCkge1xuICAgICAgICAgICAgZ3JvdXBJZCA9IHRoaXMuX3RlbXBHcm91cElkOztcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRhcmdldC5leHRDdHJsLnBsYXlDb21wbGV4Qm9tYkFuaShudWxsKTtcblxuICAgICAgICBpZiAoY29udmVydFR5cGUgPT0gQ2VsbFR5cGUuQm9tYjUpIHtcblxuICAgICAgICAgICAgLy/mtbfpqawr5rW36amsXG4gICAgICAgICAgICAvLyBhd2FpdCBFZmZMYXllckN0cmwuaW5zLnBsYXlJdGVtSGV0aShDb21tb24uY29udmVydEN1cldvcmxkUG9zKDxhbnk+dGFyZ2V0LmV4dERhdGEucG9zaXRpb24pLFxuICAgICAgICAgICAgLy8gICAgIE5vZGVQb29sS2V5LkhhaW1hQW5kSGV0dW4sIEVmZkxheWVyQ3RybC5pbnMuaGFpbWFBbmRIZXR1YW5QcmVmYWIsIFwiaGFpbWFIYWltYVwiKTtcbiAgICAgICAgICAgIC8vIGF3YWl0IEVmZkxheWVyQ3RybC5pbnMucGxheUl0ZW1IZXRpKENvbW1vbi5jb252ZXJ0Q3VyV29ybGRQb3MoPGFueT50YXJnZXQuZXh0RGF0YS5wb3NpdGlvbiksXG4gICAgICAgICAgICAvLyAgICAgTm9kZVBvb2xLZXkuSGFpbWFBbmRIYWltYSwgRWZmTGF5ZXJDdHJsLmlucy5oYWltYUFuZEhhaW1hLCBcImhhaW1hSGFpbWFcIik7XG4gICAgICAgICAgICB0YXJnZXQuZXh0Q3RybC5wbGF5Qm9tYlNpbmdsZURlc3RvcnlFZmYoMCwgR2FwVGltZS5Cb21iTWVyZ2VCb21iQ2hhbmdlVGltZSwgZmFsc2UsIGdyb3VwSWQpO1xuICAgICAgICAgICAgYXdhaXQgRWZmTGF5ZXJDdHJsLmlucy5wbGF5SGFpbWFBbmRIYWltYShDb21tb24uY29udmVydEN1cldvcmxkUG9zKDxhbnk+dGFyZ2V0LmV4dERhdGEucG9zaXRpb24pKTtcblxuICAgICAgICAgICAgUnVudGltZU1nci5pbnMucGF1c2VHYW1lKCk7XG4gICAgICAgICAgICBjb25zdCB0aW1lbGluZSA9IG5ldyBnc2FwLlRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICB0aW1lbGluZS5hdXRvUmVtb3ZlQ2hpbGRyZW4gPSB0cnVlO1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTA7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFyeSA9IENvbW1vbi5nZXRBcm91bmRDaXJjbGVDZWxscyh0YXJnZXQucG9zLCBpLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgaWYgKGFyeS5zaXplID09IDApIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgdGltZWxpbmUuYWRkKGdzYXAuVHdlZW5MaXRlLmRlbGF5ZWRDYWxsKEdhcFRpbWUuRG91YmxlUmFpbmJvd1dhdmVzLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50LS07XG4gICAgICAgICAgICAgICAgICAgIEdhbWVNb2RlbC5pbnMuZXhlY0VsaW1hdGUodGFyZ2V0LCBhcnksIEVsaW1hdGVUeXBlLkFsbCwgY291bnQsIG51bGwsIGdyb3VwSWQpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGFyZ2V0LmV4dEN0cmwucGxheUJvbWJTaW5nbGVEZXN0b3J5RWZmKDAuMiwgMC4yLCBmYWxzZSwgZ3JvdXBJZCk7XG4gICAgICAgICAgICBpZiAoY29udmVydFR5cGUgPT0gQ2VsbFR5cGUuQm9tYjEpIHtcbiAgICAgICAgICAgICAgICAvL+awlOazoemxvCvmtbfpqaxcbiAgICAgICAgICAgICAgICBhd2FpdCBFZmZMYXllckN0cmwuaW5zLnBsYXlJdGVtSGV0aShDb21tb24uY29udmVydEN1cldvcmxkUG9zKDxhbnk+dGFyZ2V0LmV4dERhdGEucG9zaXRpb24pLFxuICAgICAgICAgICAgICAgICAgICBOb2RlUG9vbEtleS5IYWltYUFuZEhldHVuLCBFZmZMYXllckN0cmwuaW5zLmhhaW1hQW5kSGV0dWFuUHJlZmFiLCBcImhldHVuSGFpbWFcIik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnZlcnRUeXBlID09IENlbGxUeXBlLkJvbWIyKSB7XG4gICAgICAgICAgICAgICAgLy/nrq3psbwr5rW36amsXG4gICAgICAgICAgICAgICAgYXdhaXQgRWZmTGF5ZXJDdHJsLmlucy5wbGF5SXRlbUhldGkoQ29tbW9uLmNvbnZlcnRDdXJXb3JsZFBvcyg8YW55PnRhcmdldC5leHREYXRhLnBvc2l0aW9uKSxcbiAgICAgICAgICAgICAgICAgICAgTm9kZVBvb2xLZXkuSGFpbWFBbmRIZXR1biwgRWZmTGF5ZXJDdHJsLmlucy5oYWltYUFuZEhldHVhblByZWZhYiwgXCJqaWFueXVIYWltYVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbnZlcnRUeXBlID09IENlbGxUeXBlLkJvbWI0KSB7XG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAvL+eroOmxvCvmtbfpqaxcbiAgICAgICAgICAgICAgICAgYXdhaXQgRWZmTGF5ZXJDdHJsLmlucy5wbGF5SXRlbUhldGkoQ29tbW9uLmNvbnZlcnRDdXJXb3JsZFBvcyg8YW55PnRhcmdldC5leHREYXRhLnBvc2l0aW9uKSxcbiAgICAgICAgICAgICAgICAgTm9kZVBvb2xLZXkuSGFpbWFBbmRIZXR1bixFZmZMYXllckN0cmwuaW5zLmhhaW1hQW5kSGV0dWFuUHJlZmFiLFwiemhhbmd5dUhhaW1hXCIpO1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBjaGlwc2V0ID0gR2FtZU1vZGVsLmlucy5nZXRMdkRhdGEoKS5jaGlwc2V0O1xuICAgICAgICAgICAgbGV0IGNsb3NlQXJ5ID0gbnVsbDtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNoaXBzZXQubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IGNoaXBzZXRbaV0udHlwZTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA8IENlbGxUeXBlLkJhbmFuYSkge1xuICAgICAgICAgICAgICAgICAgICBjbG9zZUFyeSA9IHRoaXMucmFpbmJvdyh0eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb3NlQXJ5LnNpemUgPiA1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsb3NlQXJ5LmZvckVhY2goKGNlbGw6IENlbGxNb2RlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjZWxsICYmIGNlbGwuZXh0Q3RybCAmJiAhR2FtZU1vZGVsLmlucy5pc0hhdmFTcGUoY2VsbC5wb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuaXNFeGVjQm9tYiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuR3JvdXBJZCA9IGdyb3VwSWQ7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuZXh0Q3RybC5jaGFuZ2UyQm9tYihjb252ZXJ0VHlwZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGZpcmVFeGVjVHlwZVBsYW5lKHRhcmdldDogQ2VsbE1vZGVsLCB0eXBlMTogQ2VsbFR5cGUsIGV4ZWNUeXBlOiBDZWxsVHlwZSkge1xuICAgICAgICBjb25zdCBncm91cElkID0gdGhpcy5fdGVtcEdyb3VwSWQ7XG4gICAgICAgIGF3YWl0IHRhcmdldC5leHRDdHJsLnBsYXlDb21wbGV4Qm9tYkFuaShudWxsKTtcblxuXG4gICAgICAgIGlmIChleGVjVHlwZSA9PSBDZWxsVHlwZS5Cb21iMikge1xuICAgICAgICAgICAgLy/nq6Dpsbwr5YmR6bG8XG4gICAgICAgICAgICAvLyBhd2FpdCBFZmZMYXllckN0cmwuaW5zLnBsYXlJdGVtSGV0aShDb21tb24uY29udmVydEN1cldvcmxkUG9zKDxhbnk+dGFyZ2V0LmV4dERhdGEucG9zaXRpb24pLFxuICAgICAgICAgICAgLy8gICAgIE5vZGVQb29sS2V5LlpoYW5neXVBbmRKaWFueXUsIEVmZkxheWVyQ3RybC5pbnMuemhhbmd5dUFuZEppYW55dSwgXCJ6aGFuZ3l1X3RpYW9famlhbnl1XCIpO1xuXG4gICAgICAgICAgICAvLyBhd2FpdCBFZmZMYXllckN0cmwuaW5zLnBsYXlaaGFuZ3l1QW5kSmlhbnl1KENvbW1vbi5jb252ZXJ0Q3VyV29ybGRQb3MoPGFueT50YXJnZXQuZXh0RGF0YS5wb3NpdGlvbikpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoZXhlY1R5cGUgPT0gQ2VsbFR5cGUuQm9tYjEpIHtcbiAgICAgICAgICAgIC8v56ug6bG8K+awlOazoemxvFxuICAgICAgICAgICAgLy8gYXdhaXQgRWZmTGF5ZXJDdHJsLmlucy5wbGF5SXRlbUhldGkoQ29tbW9uLmNvbnZlcnRDdXJXb3JsZFBvcyg8YW55PnRhcmdldC5leHREYXRhLnBvc2l0aW9uKSxcbiAgICAgICAgICAgIC8vICAgICBOb2RlUG9vbEtleS5aaGFuZ3l1QW5kSmlhbnl1LCBFZmZMYXllckN0cmwuaW5zLnpoYW5neXVBbmRKaWFueXUsIFwiemhhbmd5dV90aWFvX2hldHVuXCIpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjbG9zZUFyeSA9IHRoaXMuZ2V0Qm9tYkNsb3NlQXJ5KHR5cGUxLCB0YXJnZXQucG9zKTtcbiAgICAgICAgdGFyZ2V0LmZvcmNlZFJlc2V0VHlwZSh0eXBlMSk7XG5cbiAgICAgICAgR2FtZU1vZGVsLmlucy5leGVjRWxpbWF0ZSh0YXJnZXQsIGNsb3NlQXJ5LCA8YW55PmV4ZWNUeXBlLCBleGVjVHlwZSwgbnVsbCwgZ3JvdXBJZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBmaXJlVGhyZWVQbGFuZSh0YXJnZXQ6IENlbGxNb2RlbCkge1xuICAgICAgICBjb25zdCBncm91cElkID0gdGhpcy5fdGVtcEdyb3VwSWQ7XG4gICAgICAgIC8vYXdhaXQgdGFyZ2V0LmV4dEN0cmwucGxheUNvbXBsZXhCb21iQW5pKG51bGwpO1xuXG4gICAgICAgIC8v56ug6bG8K+eroOmxvFxuICAgICAgICAvLyBhd2FpdCBFZmZMYXllckN0cmwuaW5zLnBsYXlJdGVtSGV0aShDb21tb24uY29udmVydEN1cldvcmxkUG9zKDxhbnk+dGFyZ2V0LmV4dERhdGEucG9zaXRpb24pLFxuICAgICAgICAvLyAgICAgTm9kZVBvb2xLZXkuSGFpbWFBbmRIZXR1biwgRWZmTGF5ZXJDdHJsLmlucy5oYWltYUFuZEhldHVhblByZWZhYiwgXCJ6aGFuZ3l1Wmhhbmd5dVwiKTtcblxuICAgICAgICAvL+eroOmxvCvnq6DpsbxcbiAgICAgICAgYXdhaXQgRWZmTGF5ZXJDdHJsLmlucy5wbGF5Wmhhbmd5dUFuZFpoYW5neXUoQ29tbW9uLmNvbnZlcnRDdXJXb3JsZFBvcyg8YW55PnRhcmdldC5leHREYXRhLnBvc2l0aW9uKSk7XG5cblxuICAgICAgICBjb25zdCB0aW1lbGluZTEgPSBuZXcgZ3NhcC5UaW1lbGluZU1heCgpO1xuICAgICAgICB0aW1lbGluZTEuYXV0b1JlbW92ZUNoaWxkcmVuID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgY2xvc2VBcnkgPSB0aGlzLmdldEJvbWJDbG9zZUFyeSh0YXJnZXQuZ2V0VHlwZSgpLCB0YXJnZXQucG9zKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDM7IGktLTspIHtcbiAgICAgICAgICAgIHRpbWVsaW5lMS5hZGQoZ3NhcC5Ud2VlbkxpdGUuZGVsYXllZENhbGwoR2FwVGltZS5UaHJlZVBsYW5lQ3JlYXRlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5leGVjRWxpbWF0ZSh0YXJnZXQsIGNsb3NlQXJ5LCBFbGltYXRlVHlwZS5UaHJlZU9jdG9wdXMsIG51bGwsIG51bGwsIGdyb3VwSWQpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyBwdWJsaWMgc3RhdGljIHRlc3QxMTExMShib21iUG9zOiBjYy5WZWMyLCBsZXZlbDogbnVtYmVyKTogU2V0PENlbGxNb2RlbD4ge1xuICAgIC8vICAgICBjb25zdCBjbG9zZUFyeSA9IG5ldyBTZXQ8Q2VsbE1vZGVsPigpO1xuICAgIC8vICAgICBjb25zdCByYW5nZSA9IEJPTUJTX1JBTkdFW2xldmVsXTsvL0JPTUJTX1JBTkdFW3RoaXMudHlwZSAtIDEwXTtcbiAgICAvLyAgICAgLy/mib7liLDkuK3lv4NcbiAgICAvLyAgICAgY29uc3QgY3kgPSAocmFuZ2UubGVuZ3RoIC0gMSkgLyAyO1xuICAgIC8vICAgICBjb25zdCBjZWxscyA9IEdhbWVNb2RlbC5pbnMuQ2VsbExpc3Q7XG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAtY3k7IGkgPD0gY3k7IGkrKykge1xuICAgIC8vICAgICAgICAgZm9yIChsZXQgaiA9IC1jeTsgaiA8PSBjeTsgaisrKSB7XG4gICAgLy8gICAgICAgICAgICAgaWYgKGkgPT0gMCAmJiBqID09IDApIGNvbnRpbnVlO1xuICAgIC8vICAgICAgICAgICAgIGlmIChyYW5nZVtpICsgY3ldW2ogKyBjeV0gPT0gMSkge1xuICAgIC8vICAgICAgICAgICAgICAgICBjb25zdCBjZWxsUG9zID0gY2MudjIoYm9tYlBvcy54ICsgaiwgYm9tYlBvcy55ICsgaSk7XG4gICAgLy8gICAgICAgICAgICAgICAgIC8v6L6555WM55qE5LiN6IO954K4IVxuICAgIC8vICAgICAgICAgICAgICAgICBpZiAoY2VsbFBvcy54IDwgMCB8fCBjZWxsUG9zLnkgPCAwKSBjb250aW51ZTtcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc3QgbW9kZWwgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKGNlbGxzLCBjZWxsUG9zKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgaWYgKG1vZGVsICYmICFtb2RlbC5pc0RlYXRoIC8qICYmICFtb2RlbC5pc0ZhbGxpbmcoKSovKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBjbG9zZUFyeS5hZGQobW9kZWwpO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5Mb2NrLnVuTG9ja0ZhbGxQb3MoY2VsbFBvcyk7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBHYW1lTW9kZWwuaW5zLkxvY2sudW5Mb2NrRmFsbExvY2tCeUtleShjZWxsUG9zKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vICAgICByZXR1cm4gY2xvc2VBcnk7XG4gICAgLy8gfVxuXG5cbiAgICBwcml2YXRlIGdldEJvbWJSYW5nZUNlbGwoYm9tYlBvczogY2MuVmVjMiwgbGV2ZWw6IG51bWJlcik6IFNldDxDZWxsTW9kZWw+IHtcbiAgICAgICAgY29uc3QgY2xvc2VBcnkgPSBuZXcgU2V0PENlbGxNb2RlbD4oKTtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBCT01CU19SQU5HRVtsZXZlbF07Ly9CT01CU19SQU5HRVt0aGlzLnR5cGUgLSAxMF07XG4gICAgICAgIC8v5om+5Yiw5Lit5b+DXG4gICAgICAgIGNvbnN0IGN5ID0gKHJhbmdlLmxlbmd0aCAtIDEpIC8gMjtcbiAgICAgICAgY29uc3QgY2VsbHMgPSBHYW1lTW9kZWwuaW5zLkNlbGxMaXN0O1xuICAgICAgICBmb3IgKGxldCBpID0gLWN5OyBpIDw9IGN5OyBpKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAtY3k7IGogPD0gY3k7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChpID09IDAgJiYgaiA9PSAwKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBpZiAocmFuZ2VbaSArIGN5XVtqICsgY3ldID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbFBvcyA9IGNjLnYyKGJvbWJQb3MueCArIGosIGJvbWJQb3MueSArIGkpO1xuICAgICAgICAgICAgICAgICAgICAvL+i+ueeVjOeahOS4jeiDveeCuCFcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGxQb3MueCA8IDAgfHwgY2VsbFBvcy55IDwgMCkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUoY2VsbHMsIGNlbGxQb3MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbCAmJiAhY2VsbC5pc0RlYXRoIC8qJiYgIWNlbGwuaXNGYWxsaW5nKCkqLykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VBcnkuYWRkKGNlbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5Mb2NrLnVuTG9ja0ZhbGxQb3MoY2VsbFBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTW9kZWwuaW5zLkxvY2sudW5Mb2NrRmFsbExvY2tCeUtleShjZWxsUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xvc2VBcnk7XG4gICAgfVxuXG4gICAgLy/mqKrmtoggXG4gICAgcHJpdmF0ZSByb3dCb21iKHBvczogY2MuVmVjMik6IFNldDxDZWxsTW9kZWw+IHtcbiAgICAgICAgY29uc3QgY21MaXN0ID0gR2FtZU1vZGVsLmlucy5DZWxsTGlzdDtcbiAgICAgICAgY29uc3QgY2xvc2VBcnkgPSBuZXcgU2V0PENlbGxNb2RlbD4oY21MaXN0W3Bvcy55XSk7XG4gICAgICAgIHJldHVybiBjbG9zZUFyeVxuICAgIH1cblxuICAgIC8v56uW5raIXG4gICAgcHJpdmF0ZSBjb2xCb21iKHBvczogY2MuVmVjMik6IFNldDxDZWxsTW9kZWw+IHtcbiAgICAgICAgY29uc3QgY21MaXN0ID0gR2FtZU1vZGVsLmlucy5DZWxsTGlzdDtcbiAgICAgICAgY29uc3QgY2xvc2VBcnkgPSBuZXcgU2V0PENlbGxNb2RlbD4oKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IEdhbWVNb2RlbC5HcmlkU2l6ZS5IOyBpLS07KSB7XG4gICAgICAgICAgICBjb25zdCBjbSA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUoY21MaXN0LCBjYy52Mihwb3MueCwgaSkpO1xuICAgICAgICAgICAgY20gJiYgY2xvc2VBcnkuYWRkKGNtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xvc2VBcnk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByYWluYm93KHJhaW5UeXBlOiBDZWxsVHlwZSk6IFNldDxDZWxsTW9kZWw+IHtcbiAgICAgICAgLy/lkIzoibJcbiAgICAgICAgY29uc3QgY21MaXN0ID0gR2FtZU1vZGVsLmlucy5DZWxsTGlzdDtcbiAgICAgICAgY29uc3QgY2xvc2VBcnkgPSBuZXcgU2V0PENlbGxNb2RlbD4oKTtcbiAgICAgICAgZm9yIChsZXQgeSA9IGNtTGlzdC5sZW5ndGg7IHktLTspIHtcbiAgICAgICAgICAgIGNvbnN0IHhMaXN0ID0gY21MaXN0W3ldO1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IHhMaXN0Lmxlbmd0aDsgeC0tOykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNtID0geExpc3RbeF07XG4gICAgICAgICAgICAgICAgaWYgKGNtICYmIGNtLmdldFR5cGUoKSA9PSByYWluVHlwZSAmJiAhR2FtZU1vZGVsLmlucy5pc0hhdmFPYnMoY20ucG9zKSkge1xuICAgICAgICAgICAgICAgICAgICBjbG9zZUFyeS5hZGQoY20pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xvc2VBcnlcbiAgICB9XG5cbn1cblxuXG5jb25zdCBCT01CU19MRVZFTCA9IFtcbiAgICAyLCAyLCAyLCAxLCAxLCAxXG5dO1xuY29uc3QgQk9NQlNfUkFOR0UgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAxXSxcbiAgICAgICAgWzAsIDEsIDBdXG4gICAgXSwgW1xuICAgICAgICBbMSwgMSwgMV0sXG4gICAgICAgIFsxLCAxLCAxXSxcbiAgICAgICAgWzEsIDEsIDFdXG4gICAgXSwgW1xuICAgICAgICBbMCwgMSwgMSwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAxLCAxXSxcbiAgICAgICAgWzEsIDEsIDEsIDEsIDFdLFxuICAgICAgICBbMSwgMSwgMSwgMSwgMV0sXG4gICAgICAgIFswLCAxLCAxLCAxLCAwXSxcbiAgICBdLCBbXG4gICAgICAgIFswLCAwLCAxLCAxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDEsIDEsIDEsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMSwgMSwgMSwgMV0sXG4gICAgICAgIFsxLCAxLCAxLCAxLCAxLCAxLCAxXSxcbiAgICAgICAgWzEsIDEsIDEsIDEsIDEsIDEsIDFdLFxuICAgICAgICBbMCwgMSwgMSwgMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAxLCAxLCAwLCAwXSxcbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxXSxcbiAgICAgICAgWzEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDFdLFxuICAgICAgICBbMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMV0sXG4gICAgICAgIFsxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxXSxcbiAgICAgICAgWzEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDFdLFxuICAgICAgICBbMCwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAxLCAxLCAxLCAxLCAwLCAwXSxcbiAgICBdXG5dXG5cbiJdfQ==