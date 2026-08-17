
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/PropModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcUHJvcE1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDJEQUFzRDtBQUN0RCxnREFBK0M7QUFDL0Msc0RBQXVHO0FBQ3ZHLDhDQUF5QztBQUN6QyxvREFBK0M7QUFDL0MsNkNBQXdDO0FBQ3hDLHVDQUFxQztBQUVyQyxpREFBZ0Q7QUFDaEQscURBQXFEO0FBQ3JELG9EQUFpRDtBQUNqRCxxREFBZ0Q7QUFHaEQ7SUFNSSxtQkFBWSxTQUFvQjtRQUp6QixhQUFRLEdBQWEsSUFBSSxDQUFDO1FBRXpCLGNBQVMsR0FBYyxJQUFJLENBQUM7UUFzSzVCLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBcEtsQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixrQkFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU0sMkJBQU8sR0FBZDtRQUNJLGtCQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxhQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFTSwyQkFBTyxHQUFkLFVBQWUsR0FBWSxFQUFFLFFBQWlCO1FBQzFDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLEdBQUcsR0FBRyxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUMzQixXQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekMsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNuQixLQUFLLG1CQUFRLENBQUMsU0FBUztvQkFDbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDekIsTUFBTTtnQkFDVixLQUFLLG1CQUFRLENBQUMsS0FBSztvQkFDZixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNyQixNQUFNO2dCQUNWLEtBQUssbUJBQVEsQ0FBQyxNQUFNO29CQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDaEMsTUFBTTthQUNiO1NBQ0o7SUFDTCxDQUFDO0lBRU8saUNBQWEsR0FBckIsVUFBc0IsSUFBYztRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixXQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxRQUFRLElBQUksRUFBRTtZQUNWLEtBQUssbUJBQVEsQ0FBQyxTQUFTO2dCQUNuQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RCLE1BQUs7WUFDVCxLQUFLLG1CQUFRLENBQUMsUUFBUTtnQkFDbEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3pCLE1BQU07WUFDVixLQUFLLG1CQUFRLENBQUMsU0FBUztnQkFDbkIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN0QixNQUFNO1lBQ1YsS0FBSyxtQkFBUSxDQUFDLFNBQVM7Z0JBQ25CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsTUFBTTtZQUNWLEtBQUssbUJBQVEsQ0FBQyxZQUFZLENBQUM7WUFDM0IsS0FBSyxtQkFBUSxDQUFDLFlBQVk7Z0JBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pCLE1BQU07U0FDYjtJQUNMLENBQUM7SUFFTyxpQ0FBYSxHQUFyQixVQUFzQixJQUFjO1FBQ2hDLElBQU0sSUFBSSxHQUFHLFdBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLFdBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLHNCQUFVLENBQUMsS0FBSyxDQUFDLElBQUksd0JBQWEsRUFBRTtZQUMxRCxXQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3BDO2FBQU07WUFDSCxXQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxzQkFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVELGNBQWM7SUFDTixrQ0FBYyxHQUF0QjtRQUFBLGlCQVNDO1FBUkcsSUFBTSxLQUFLLEdBQUcsQ0FBQyxtQkFBUSxDQUFDLEtBQUssRUFBRSxtQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ2QsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDdEMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEM7UUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsWUFBWTtJQUNKLGtDQUFjLEdBQXRCO1FBQ0ksSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdEMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxtQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxTQUFTO0lBQ0QscUNBQWlCLEdBQXpCO1FBRUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLElBQUksV0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLG1CQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RGLFdBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQUssQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdkMsV0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsbUJBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsV0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFJRCxVQUFVO0lBQ0ksK0JBQVcsR0FBekIsVUFBMEIsR0FBWSxFQUFFLFFBQWlCOzs7Ozs7NkJBQ2pELENBQUEsUUFBUSxJQUFJLElBQUksQ0FBQSxFQUFoQix3QkFBZ0I7d0JBQ2hCLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLGdCQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsZ0JBQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzFGLHFCQUFNLHNCQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBTSxDQUFDLGtCQUFrQixDQUFNLGdCQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQTs7d0JBQTlGLFNBQThGLENBQUM7Ozt3QkFFL0YsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzs7O3dCQUVuQixJQUFJLEdBQUcsV0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUNsRCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTs0QkFDbEIsSUFBSSxHQUFHLGdCQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7NEJBQ3JFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO2dDQUMzRCxXQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzZCQUMxQztpQ0FBTTtnQ0FDRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsc0JBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDMUUsV0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsbUJBQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDdkQsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDckIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOzZCQUN2Qjt5QkFDSjs7Ozs7S0FDSjtJQUVELFlBQVk7SUFDSiw4QkFBVSxHQUFsQixVQUFtQixHQUFZO1FBQzNCLElBQU0sSUFBSSxHQUFHLFdBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtZQUN4QixJQUFNLElBQUksR0FBRyxnQkFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3JFLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ3RCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsbUJBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssRUFBRSxtQkFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsbUJBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7b0JBQ2hHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDdkI7cUJBQU07b0JBQ0gsV0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDMUM7YUFDSjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVCO1NBQ0o7SUFDTCxDQUFDO0lBRUQsWUFBWTtJQUNKLGtDQUFjLEdBQXRCO1FBQ0ksSUFBTSxJQUFJLEdBQUcsV0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLFdBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsV0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsbUJBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRUQsY0FBYztJQUNOLGtDQUFjLEdBQXRCLFVBQXVCLEdBQVk7UUFDL0IsSUFBTSxJQUFJLEdBQUcsV0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ3hCLElBQU0sSUFBSSxHQUFHLGdCQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDckUsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDdEIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsbUJBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUN2QjtxQkFBTTtvQkFDSCxXQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2lCQUMxQzthQUNKO2lCQUFNO2dCQUNILElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUI7U0FDSjtJQUNMLENBQUM7SUFJTyxxQ0FBaUIsR0FBekI7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDckMsSUFBTSxDQUFDLEdBQUcsV0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEQsSUFBTSxDQUFDLEdBQUcsV0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkQsSUFBTSxJQUFJLEdBQUcsZ0JBQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QixJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDakMsT0FBTyxJQUFJLENBQUM7YUFDZjtpQkFBTTtnQkFDSCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQ25DO1NBQ0o7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU8sK0JBQVcsR0FBbkIsVUFBb0IsSUFBZTtRQUMvQixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUIsT0FBTyxDQUFDLENBQUMsSUFBSSxJQUFJLG1CQUFRLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxtQkFBUSxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksbUJBQVEsQ0FBQyxRQUFRO1lBQ3BGLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRU8sZ0NBQVksR0FBcEIsVUFBcUIsYUFBNkI7UUFBN0IsOEJBQUEsRUFBQSxvQkFBNkI7UUFDOUMsa0JBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsYUFBYSxJQUFJLG9CQUFVLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0EzTUEsQUEyTUMsSUFBQTtBQTNNWSw4QkFBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lTW9kZWwgZnJvbSBcIi4vR2FtZU1vZGVsXCI7XG5pbXBvcnQgRXZlbnRNZ3IgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvTWFuYWdlci9FdmVudE1nclwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IHsgUHJvcFR5cGUsIEVsaW1hdGVUeXBlLCBDZWxsVHlwZSwgV2FyaW5nVGlwcywgTWF4UG93ZXJDb3VudCB9IGZyb20gJy4uLy4uL0RhdGEvQ29uc3QvQ29uc3RhbnQnO1xuaW1wb3J0IENvbW1vbiBmcm9tICcuLi8uLi9Db21tb24vQ29tbW9uJztcbmltcG9ydCBSdW50aW1lTWdyIGZyb20gJy4uLy4uL0RhdGEvUnVudGltZU1ncic7XG5pbXBvcnQgTSBmcm9tICcuLi8uLi8uLi9CYXNlL01hbmFnZXIvTSc7XG5pbXBvcnQgeyBNc2dUeXBlIH0gZnJvbSBcIi4vQ2VsbEJhc2VcIjtcbmltcG9ydCB7IENlbGxNb2RlbCB9IGZyb20gXCIuL0NlbGxNb2RlbFwiO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuLi8uLi8uLi9CYXNlL1V0aWxzL1V0aWxcIjtcbmltcG9ydCB7IEN1cnJlbmN5SWQgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9CYXNlQ29uc3RcIjtcbmltcG9ydCB7IEF1ZGlvSUQgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0F1ZGlvQ3RybFwiO1xuaW1wb3J0IEVmZkxheWVyQ3RybCBmcm9tIFwiLi4vVmlldy9FZmZMYXllckN0cmxcIjtcblxuXG5leHBvcnQgY2xhc3MgUHJvcE1vZGVsIHtcblxuICAgIHB1YmxpYyBleGVjVHlwZTogUHJvcFR5cGUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBnYW1lTW9kZWw6IEdhbWVNb2RlbCA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lTW9kZWw6IEdhbWVNb2RlbCkge1xuICAgICAgICB0aGlzLmdhbWVNb2RlbCA9IGdhbWVNb2RlbDtcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnJlZ2lzdGVyKEV2ZW50LkdhbWVDTUQuUHJvcENsaWNrLCB0aGlzLm9uVHJpZ2dlclByb3AsIHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZXN0b3J5KCkge1xuICAgICAgICBFdmVudE1nci5pbnMudW5SZWdpc3RlcihFdmVudC5HYW1lQ01ELlByb3BDbGljaywgdGhpcy5vblRyaWdnZXJQcm9wLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhlY3V0ZShwb3M6IGNjLlZlYzIsIGlzQ2h1aXppOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLmV4ZWNUeXBlKSB7XG4gICAgICAgICAgICBwb3MgPSBDb21tb24uY29udmV0UG9zKHBvcylcbiAgICAgICAgICAgIE0ucnVudGltZS5hZGRVc2VQcm9wQ291bnQodGhpcy5leGVjVHlwZSk7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZXhlY1R5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFByb3BUeXBlLkJlaWtlQm9tYjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXhlY0JlaWtlQm9tYihwb3MpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFByb3BUeXBlLkJvYXJkOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9leGVjQm9hcmQocG9zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBQcm9wVHlwZS5IYW1tZXI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V4ZWNIYW1tZXIocG9zLCBpc0NodWl6aSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblRyaWdnZXJQcm9wKHR5cGU6IFByb3BUeXBlKSB7XG4gICAgICAgIHRoaXMuZXhlY1R5cGUgPSB0eXBlO1xuICAgICAgICBNLnJ1bnRpbWUuYWRkVXNlUHJvcENvdW50KHR5cGUpO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgUHJvcFR5cGUuUmVzZXRHcmlkOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V4ZWNSZXNldEdyaWQoKTtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBQcm9wVHlwZS5BZGQzU3RlcDpcbiAgICAgICAgICAgICAgICB0aGlzLl9leGVjQWRkVGhyZWVTdGVwKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFByb3BUeXBlLlN0YXJ0Qm9tYjpcbiAgICAgICAgICAgICAgICB0aGlzLl9leGVjU3RhcnRCb21iKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFByb3BUeXBlLlN0YXJ0U3RhcjpcbiAgICAgICAgICAgICAgICB0aGlzLl9leGVjU3RhcnRTdGFyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFByb3BUeXBlLlBvd2VyQm90dGxlMTpcbiAgICAgICAgICAgIGNhc2UgUHJvcFR5cGUuUG93ZXJCb3R0bGUyOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V4ZWNBZGRQb3dlcih0eXBlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2V4ZWNBZGRQb3dlcih0eXBlOiBQcm9wVHlwZSkge1xuICAgICAgICBjb25zdCBpbmZvID0gTS50YWJsZS5Qcm9wSW5mby5nZXRCeVByaW1hcnlLZXkodHlwZSk7XG4gICAgICAgIGlmIChNLnJ1bnRpbWUuZ2V0Q3VycmVuY3koQ3VycmVuY3lJZC5Qb3dlcikgPj0gTWF4UG93ZXJDb3VudCkge1xuICAgICAgICAgICAgTS50aXBzLnNob3coV2FyaW5nVGlwcy5Qb3dlck1heCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBNLnJ1bnRpbWUuYWRkQ3VycmVuY3koQ3VycmVuY3lJZC5Qb3dlciwgaW5mby52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnByb3BVc2VyT3ZlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5byA5aeL6L2s5o2i5byA5aeL54K45by5ICovXG4gICAgcHJpdmF0ZSBfZXhlY1N0YXJ0Qm9tYigpIHtcbiAgICAgICAgY29uc3QgdHlwZXMgPSBbQ2VsbFR5cGUuQm9tYjEsIENlbGxUeXBlLkJvbWIyXTtcbiAgICAgICAgdHlwZXMuZm9yRWFjaCh0eXBlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmZpbmRPbmVSYW5kb21DZWxsKCk7XG4gICAgICAgICAgICBpZiAoY2VsbCAmJiBjZWxsLmV4dEN0cmwpIHtcbiAgICAgICAgICAgICAgICBjZWxsLmV4dEN0cmwuY2hhbmdlMkJvbWIodHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMucHJvcFVzZXJPdmVyKCk7XG4gICAgfVxuXG4gICAgLyoq5byA5aeL6L2s5o2i5pif5pifICovXG4gICAgcHJpdmF0ZSBfZXhlY1N0YXJ0U3RhcigpIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZmluZE9uZVJhbmRvbUNlbGwoKTtcbiAgICAgICAgaWYgKGNlbGwgJiYgY2VsbC5leHRDdHJsKSB7XG4gICAgICAgICAgICBjZWxsLmV4dEN0cmwuY2hhbmdlMkJvbWIoQ2VsbFR5cGUuQm9tYjUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcFVzZXJPdmVyKCk7XG4gICAgfVxuXG4gICAgLyoq5YqgM+atpSAqL1xuICAgIHByaXZhdGUgX2V4ZWNBZGRUaHJlZVN0ZXAoKSB7XG5cbiAgICAgICAgdGhpcy5nYW1lTW9kZWwuc3RlcExpbWl0ICs9IE0udGFibGUuUHJvcEluZm8uZ2V0QnlQcmltYXJ5S2V5KFByb3BUeXBlLkFkZDNTdGVwKS52YWx1ZTtcbiAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LlVJLlVwZGF0ZUluZm9QYW5lbCk7XG4gICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5Tb3VuZC5QbGF5U291bmRFZmYsIEF1ZGlvSUQuQWRkVGhyZWUpO1xuICAgICAgICB0aGlzLnByb3BVc2VyT3ZlcigpO1xuICAgICAgICBNLnRpcHMuc2hvdyhXYXJpbmdUaXBzLlByb3BBZGQzU3RlcFRpcHMpO1xuICAgIH1cblxuXG5cbiAgICAvKirmiafooYzplKTlrZAgKi9cbiAgICBwcml2YXRlIGFzeW5jIF9leGVjSGFtbWVyKHBvczogY2MuVmVjMiwgaXNDaHVpemk6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKGlzQ2h1aXppID09IHRydWUpIHtcbiAgICAgICAgICAgIGNjLmxvZyhcIuaJp+ihjOmUpOWtkFwiICsgQ29tbW9uLmdldFBvcyhwb3MueCwgcG9zLnkpLnggKyBcIiAgIHk6IFwiICsgQ29tbW9uLmdldFBvcyhwb3MueCwgcG9zLnkpLnkpO1xuICAgICAgICAgICAgYXdhaXQgRWZmTGF5ZXJDdHJsLmlucy5wbGF5Q2h1aXppKENvbW1vbi5jb252ZXJ0Q3VyV29ybGRQb3MoPGFueT5Db21tb24uZ2V0UG9zKHBvcy54LCBwb3MueSkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNjLmxvZyhcIuaJp+ihjOmUpOWtkCBmYWxzZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0gTS5ydW50aW1lLmdldFByb3BEYXRhKHRoaXMuZXhlY1R5cGUpO1xuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmNvdW50ID4gMCkge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5nYW1lTW9kZWwuQ2VsbExpc3QsIHBvcyk7XG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lTW9kZWwuaXNIb2xkKHBvcykgfHwgKGNlbGwgJiYgY2VsbC5pc0ludmluY2libGUpKSB7XG4gICAgICAgICAgICAgICAgTS50aXBzLnNob3coV2FyaW5nVGlwcy5DYW50VXNlRm9yVGhhdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gdGhpcy5nYW1lTW9kZWwuZXhlY0VsaW1hdGVPbmVBdEFsbChwb3MsIEVsaW1hdGVUeXBlLkhhbW1lcik7XG4gICAgICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LlNvdW5kLlBsYXlTb3VuZEVmZiwgQXVkaW9JRC5IYW1tZXIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoY291bnQpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcFVzZXJPdmVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirmiafooYzovazmjaLmu5Hmnb8gKi9cbiAgICBwcml2YXRlIF9leGVjQm9hcmQocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBNLnJ1bnRpbWUuZ2V0UHJvcERhdGEodGhpcy5leGVjVHlwZSk7XG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEuY291bnQgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZSh0aGlzLmdhbWVNb2RlbC5DZWxsTGlzdCwgcG9zKTtcbiAgICAgICAgICAgIGlmIChjZWxsICYmIGNlbGwuZXh0Q3RybCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrQ2FuVXNlKGNlbGwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuZXh0Q3RybC5jaGFuZ2UyQm9tYihDZWxsVHlwZS5Cb21iMik7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwub25Nc2coTXNnVHlwZS5Db21wbGV4Qm9tYiwgeyB0eXBlMTogQ2VsbFR5cGUuQm9tYjIsIHR5cGUyOiBDZWxsVHlwZS5Cb21iMywgaXNCb2FyZDogdHJ1ZSB9KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BVc2VyT3ZlcigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIE0udGlwcy5zaG93KFdhcmluZ1RpcHMuQ2FudFVzZUZvclRoYXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wVXNlck92ZXIoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5omn6KGM6YeN572u5qOL55uYICovXG4gICAgcHJpdmF0ZSBfZXhlY1Jlc2V0R3JpZCgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IE0ucnVudGltZS5nZXRQcm9wRGF0YSh0aGlzLmV4ZWNUeXBlKTtcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5jb3VudCA+IDApIHtcbiAgICAgICAgICAgIE0udGlwcy5zaG93KFdhcmluZ1RpcHMuUHJvcFJlc2V0R3JpZCk7XG4gICAgICAgICAgICB0aGlzLmdhbWVNb2RlbC5yZXNldEdyaWQodHJ1ZSk7XG4gICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuU291bmQuUGxheVNvdW5kRWZmLCBBdWRpb0lELlJlc2V0KTtcbiAgICAgICAgICAgIHRoaXMucHJvcFVzZXJPdmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirmiafooYzovazmjaLotJ3lo7PngrjlvLkgKi9cbiAgICBwcml2YXRlIF9leGVjQmVpa2VCb21iKHBvczogY2MuVmVjMikge1xuICAgICAgICBjb25zdCBkYXRhID0gTS5ydW50aW1lLmdldFByb3BEYXRhKHRoaXMuZXhlY1R5cGUpO1xuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmNvdW50ID4gMCkge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUodGhpcy5nYW1lTW9kZWwuQ2VsbExpc3QsIHBvcyk7XG4gICAgICAgICAgICBpZiAoY2VsbCAmJiBjZWxsLmV4dEN0cmwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja0NhblVzZShjZWxsKSkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmlzRXhlY0JvbWIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmV4dEN0cmwuY2hhbmdlMkJvbWIoQ2VsbFR5cGUuQm9tYjEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BVc2VyT3ZlcigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIE0udGlwcy5zaG93KFdhcmluZ1RpcHMuQ2FudFVzZUZvclRoYXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wVXNlck92ZXIoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWF4RGVwdGggPSAxMDtcbiAgICBwcml2YXRlIF9jdXJEZXB0aCA9IDA7XG4gICAgcHJpdmF0ZSBmaW5kT25lUmFuZG9tQ2VsbCgpIHtcbiAgICAgICAgdGhpcy5fY3VyRGVwdGgrKztcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMuZ2FtZU1vZGVsLkNlbGxMaXN0O1xuICAgICAgICBjb25zdCB5ID0gVXRpbC5Ub29sLnJhbmdlSW50KDAsIGxpc3QubGVuZ3RoLCBmYWxzZSk7XG4gICAgICAgIGNvbnN0IHggPSBVdGlsLlRvb2wucmFuZ2VJbnQoMCwgbGlzdFt5XS5sZW5ndGgsIGZhbHNlKTtcbiAgICAgICAgY29uc3QgY2VsbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUobGlzdCwgY2MudjIoeCwgeSkpO1xuICAgICAgICBpZiAoIXRoaXMuY2hlY2tDYW5Vc2UoY2VsbCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJEZXB0aCA+IHRoaXMuX21heERlcHRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmRPbmVSYW5kb21DZWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY3VyRGVwdGggPSAwO1xuICAgICAgICByZXR1cm4gY2VsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrQ2FuVXNlKGNlbGw6IENlbGxNb2RlbCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIWNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0eXBlID0gY2VsbC5nZXRUeXBlKCk7XG4gICAgICAgIHJldHVybiAhKHR5cGUgPT0gQ2VsbFR5cGUuR3JvdW5kIHx8IHR5cGUgPT0gQ2VsbFR5cGUuQmFuYW5hIHx8IHR5cGUgPT0gQ2VsbFR5cGUuSWNlQ3JlYW0gfHxcbiAgICAgICAgICAgIHRoaXMuZ2FtZU1vZGVsLmlzSGF2YVNwZShjZWxsLnBvcykgfHwgdGhpcy5nYW1lTW9kZWwuaXNIb2xkKGNlbGwucG9zKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwcm9wVXNlck92ZXIoaXNVcGRhdGVDb3VudDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuR2FtZUNNRC5Qcm9wVXNlZCk7XG4gICAgICAgIGlzVXBkYXRlQ291bnQgJiYgUnVudGltZU1nci5pbnMudXBkYXRlUHJvcENvdW50KHRoaXMuZXhlY1R5cGUsIC0xKTtcbiAgICAgICAgdGhpcy5leGVjVHlwZSA9IG51bGw7XG4gICAgfVxufSJdfQ==