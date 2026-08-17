"use strict";
cc._RF.push(module, '8815488dtlJgaSAiNjulOpR', 'PropModel');
// Script/Logic/Match3/Model/PropModel.ts

"use strict";
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
exports.PropModel = void 0;
var EventMgr_1 = require("../../../Base/Manager/EventMgr");
var Event_1 = require("../../Data/Const/Event");
var Constant_1 = require("../../Data/Const/Constant");
var Common_1 = require("../../Common/Common");
var RuntimeMgr_1 = require("../../Data/RuntimeMgr");
var M_1 = require("../../../Base/Manager/M");
var CellBase_1 = require("./CellBase");
var Util_1 = require("../../../Base/Utils/Util");
var BaseConst_1 = require("../../../Base/BaseConst");
var AudioCtrl_1 = require("../../Common/AudioCtrl");
var EffLayerCtrl_1 = require("../View/EffLayerCtrl");
var PropModel = /** @class */ (function () {
    function PropModel(gameModel) {
        this.execType = null;
        this.gameModel = null;
        this._maxDepth = 10;
        this._curDepth = 0;
        this.gameModel = gameModel;
        EventMgr_1.default.ins.register(Event_1.Event.GameCMD.PropClick, this.onTriggerProp, this);
    }
    PropModel.prototype.destory = function () {
        EventMgr_1.default.ins.unRegister(Event_1.Event.GameCMD.PropClick, this.onTriggerProp, this);
    };
    PropModel.prototype.execute = function (pos, isChuizi) {
        if (this.execType) {
            pos = Common_1.default.convetPos(pos);
            M_1.default.runtime.addUsePropCount(this.execType);
            switch (this.execType) {
                case Constant_1.PropType.BeikeBomb:
                    this._execBeikeBomb(pos);
                    break;
                case Constant_1.PropType.Board:
                    this._execBoard(pos);
                    break;
                case Constant_1.PropType.Hammer:
                    this._execHammer(pos, isChuizi);
                    break;
            }
        }
    };
    PropModel.prototype.onTriggerProp = function (type) {
        this.execType = type;
        M_1.default.runtime.addUsePropCount(type);
        switch (type) {
            case Constant_1.PropType.ResetGrid:
                this._execResetGrid();
                break;
            case Constant_1.PropType.Add3Step:
                this._execAddThreeStep();
                break;
            case Constant_1.PropType.StartBomb:
                this._execStartBomb();
                break;
            case Constant_1.PropType.StartStar:
                this._execStartStar();
                break;
            case Constant_1.PropType.PowerBottle1:
            case Constant_1.PropType.PowerBottle2:
                this._execAddPower(type);
                break;
        }
    };
    PropModel.prototype._execAddPower = function (type) {
        var info = M_1.default.table.PropInfo.getByPrimaryKey(type);
        if (M_1.default.runtime.getCurrency(BaseConst_1.CurrencyId.Power) >= Constant_1.MaxPowerCount) {
            M_1.default.tips.show(Constant_1.WaringTips.PowerMax);
        }
        else {
            M_1.default.runtime.addCurrency(BaseConst_1.CurrencyId.Power, info.value);
            this.propUserOver();
        }
    };
    /**开始转换开始炸弹 */
    PropModel.prototype._execStartBomb = function () {
        var _this = this;
        var types = [Constant_1.CellType.Bomb1, Constant_1.CellType.Bomb2];
        types.forEach(function (type) {
            var cell = _this.findOneRandomCell();
            if (cell && cell.extCtrl) {
                cell.extCtrl.change2Bomb(type);
            }
        });
        this.propUserOver();
    };
    /**开始转换星星 */
    PropModel.prototype._execStartStar = function () {
        var cell = this.findOneRandomCell();
        if (cell && cell.extCtrl) {
            cell.extCtrl.change2Bomb(Constant_1.CellType.Bomb5);
        }
        this.propUserOver();
    };
    /**加3步 */
    PropModel.prototype._execAddThreeStep = function () {
        this.gameModel.stepLimit += M_1.default.table.PropInfo.getByPrimaryKey(Constant_1.PropType.Add3Step).value;
        M_1.default.event.send(Event_1.Event.UI.UpdateInfoPanel);
        M_1.default.event.send(Event_1.Event.Sound.PlaySoundEff, AudioCtrl_1.AudioID.AddThree);
        this.propUserOver();
        M_1.default.tips.show(Constant_1.WaringTips.PropAdd3StepTips);
    };
    /**执行锤子 */
    PropModel.prototype._execHammer = function (pos, isChuizi) {
        return __awaiter(this, void 0, void 0, function () {
            var data, cell, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(isChuizi == true)) return [3 /*break*/, 2];
                        cc.log("执行锤子" + Common_1.default.getPos(pos.x, pos.y).x + "   y: " + Common_1.default.getPos(pos.x, pos.y).y);
                        return [4 /*yield*/, EffLayerCtrl_1.default.ins.playChuizi(Common_1.default.convertCurWorldPos(Common_1.default.getPos(pos.x, pos.y)))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        cc.log("执行锤子 false");
                        _a.label = 3;
                    case 3:
                        data = M_1.default.runtime.getPropData(this.execType);
                        if (data && data.count > 0) {
                            cell = Common_1.default.safeGet2ArrayValue(this.gameModel.CellList, pos);
                            if (this.gameModel.isHold(pos) || (cell && cell.isInvincible)) {
                                M_1.default.tips.show(Constant_1.WaringTips.CantUseForThat);
                            }
                            else {
                                count = this.gameModel.execElimateOneAtAll(pos, Constant_1.ElimateType.Hammer);
                                M_1.default.event.send(Event_1.Event.Sound.PlaySoundEff, AudioCtrl_1.AudioID.Hammer);
                                console.error(count);
                                this.propUserOver();
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**执行转换滑板 */
    PropModel.prototype._execBoard = function (pos) {
        var data = M_1.default.runtime.getPropData(this.execType);
        if (data && data.count > 0) {
            var cell = Common_1.default.safeGet2ArrayValue(this.gameModel.CellList, pos);
            if (cell && cell.extCtrl) {
                if (this.checkCanUse(cell)) {
                    cell.extCtrl.change2Bomb(Constant_1.CellType.Bomb2);
                    cell.onMsg(CellBase_1.MsgType.ComplexBomb, { type1: Constant_1.CellType.Bomb2, type2: Constant_1.CellType.Bomb3, isBoard: true });
                    this.propUserOver();
                }
                else {
                    M_1.default.tips.show(Constant_1.WaringTips.CantUseForThat);
                }
            }
            else {
                this.propUserOver(false);
            }
        }
    };
    /**执行重置棋盘 */
    PropModel.prototype._execResetGrid = function () {
        var data = M_1.default.runtime.getPropData(this.execType);
        if (data && data.count > 0) {
            M_1.default.tips.show(Constant_1.WaringTips.PropResetGrid);
            this.gameModel.resetGrid(true);
            M_1.default.event.send(Event_1.Event.Sound.PlaySoundEff, AudioCtrl_1.AudioID.Reset);
            this.propUserOver();
        }
    };
    /**执行转换贝壳炸弹 */
    PropModel.prototype._execBeikeBomb = function (pos) {
        var data = M_1.default.runtime.getPropData(this.execType);
        if (data && data.count > 0) {
            var cell = Common_1.default.safeGet2ArrayValue(this.gameModel.CellList, pos);
            if (cell && cell.extCtrl) {
                if (this.checkCanUse(cell)) {
                    cell.isExecBomb = true;
                    cell.extCtrl.change2Bomb(Constant_1.CellType.Bomb1);
                    this.propUserOver();
                }
                else {
                    M_1.default.tips.show(Constant_1.WaringTips.CantUseForThat);
                }
            }
            else {
                this.propUserOver(false);
            }
        }
    };
    PropModel.prototype.findOneRandomCell = function () {
        this._curDepth++;
        var list = this.gameModel.CellList;
        var y = Util_1.Util.Tool.rangeInt(0, list.length, false);
        var x = Util_1.Util.Tool.rangeInt(0, list[y].length, false);
        var cell = Common_1.default.safeGet2ArrayValue(list, cc.v2(x, y));
        if (!this.checkCanUse(cell)) {
            if (this._curDepth > this._maxDepth) {
                return null;
            }
            else {
                return this.findOneRandomCell();
            }
        }
        this._curDepth = 0;
        return cell;
    };
    PropModel.prototype.checkCanUse = function (cell) {
        if (!cell) {
            return false;
        }
        var type = cell.getType();
        return !(type == Constant_1.CellType.Ground || type == Constant_1.CellType.Banana || type == Constant_1.CellType.IceCream ||
            this.gameModel.isHavaSpe(cell.pos) || this.gameModel.isHold(cell.pos));
    };
    PropModel.prototype.propUserOver = function (isUpdateCount) {
        if (isUpdateCount === void 0) { isUpdateCount = true; }
        EventMgr_1.default.ins.send(Event_1.Event.GameCMD.PropUsed);
        isUpdateCount && RuntimeMgr_1.default.ins.updatePropCount(this.execType, -1);
        this.execType = null;
    };
    return PropModel;
}());
exports.PropModel = PropModel;

cc._RF.pop();