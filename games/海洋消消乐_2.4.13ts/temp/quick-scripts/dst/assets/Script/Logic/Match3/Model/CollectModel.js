
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/CollectModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e7448VCyNZJu42qqE33adRu', 'CollectModel');
// Script/Logic/Match3/Model/CollectModel.ts

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
exports.CollectModel = exports.CollectType = void 0;
var M_1 = require("../../../Base/Manager/M");
var Event_1 = require("../../Data/Const/Event");
var Log_1 = require("../../../Base/Utils/Log");
var GameModel_1 = require("./GameModel");
var Common_1 = require("../../Common/Common");
var Constant_1 = require("../../Data/Const/Constant");
exports.CollectType = {
    normal: 'normal',
    gnome: 'gnome',
    box: 'box',
    colorbox: 'colorbox',
    stone: 'stone',
    tree: 'tree',
    turtles: 'turtles',
    crab: 'crab',
    gem: 'gem',
    firefly: 'firefly'
};
var CollectModel = /** @class */ (function () {
    function CollectModel(collect) {
        //全部的收集目标
        this.collect = null;
        //单张界面的收集目标
        this.singleCollect = null;
        //推土机这种收集物的对照信息!
        this.collectPowerCells = null;
        this._marked = null;
        if (collect) {
            this.initMainCollect(collect);
        }
        this.collectPowerCells = {};
        this._marked = new Set();
    }
    CollectModel.prototype.updateCollectCount = function (type, num, index, elimateType) {
        return __awaiter(this, void 0, void 0, function () {
            var count, isOver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type = type;
                        count = this.collect.get(type);
                        isOver = false;
                        if (!count) return [3 /*break*/, 2];
                        count = (count - num) <= 0 ? 0 : (count - num);
                        this.collect.set(type, count);
                        return [4 /*yield*/, this.checkCollectOK()];
                    case 1:
                        isOver = _a.sent();
                        M_1.default.event.send(Event_1.Event.UI.CollectComplet, type, index, elimateType);
                        _a.label = 2;
                    case 2:
                        //检测单张界面是否回收完毕,触发切换地图
                        this.checkSingleCollectState(type, isOver);
                        if (type == exports.CollectType.gnome) {
                            Log_1.Log.i("\u5B8C\u6210\u4E00\u4E2A\u6563\u88C5\u6536\u96C6\u7269\u7684\u56DE\u6536! \u603B\u8FD8\u9700\u8981\u6536\u96C6:" + this.collect.get(type) + ",\u5F53\u524D\u5730\u56FE\u8FD8\u6709:" + (this.singleCollect && this.singleCollect[type]));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CollectModel.prototype.updateCollectPowerCell = function (cell) {
        var result = false;
        var groundCell = this.collectPowerCells["" + cell.getType()];
        if (groundCell) {
            groundCell.extCtrl.updateTuitujiPower();
            result = true;
            //界面动画!
            M_1.default.event.send(Event_1.Event.GameCMD.UpdateCollectPower, cell, groundCell);
        }
        return result;
    };
    Object.defineProperty(CollectModel.prototype, "mainCollect", {
        get: function () {
            return this.collect;
        },
        enumerable: false,
        configurable: true
    });
    CollectModel.prototype.updateCurSingleCollect = function (singleCollect) {
        this.singleCollect = singleCollect;
    };
    CollectModel.prototype._markPos = function (pos) {
        this._marked.add(Common_1.default.getStringkey(pos));
    };
    CollectModel.prototype._isMarked = function (pos) {
        return this._marked.has(Common_1.default.getStringkey(pos));
    };
    CollectModel.prototype.removeMark = function (pos) {
        this._marked.delete(Common_1.default.getStringkey(pos));
    };
    /**
     * 章鱼目标的寻找!
     * "章鱼机制优化：
     *  1.在翡翠关卡，应该能够飞到翡翠的位置
     *  2.如果当前关卡没有目标物（比如椰子还没生成），章鱼飞往元素的优先级为：香蕉>石头>铁链>箱子>冰块>土块>普通元素"
     * @param isHavaExecType
     */
    CollectModel.prototype.findOneCollectPos = function (isHavaExecType) {
        if (isHavaExecType === void 0) { isHavaExecType = false; }
        //先不考虑多张地图的情况!
        var result = null;
        //检测木箱
        if (this.collect.get(exports.CollectType.box) > 0) {
            result = this._findBoxPos();
        }
        //检测蘑菇
        if (!result && this.collect.get(exports.CollectType.gnome) > 0) {
            result = this.findMGPos(exports.CollectType.gnome, isHavaExecType);
        }
        //检测螃蟹
        if (!result && this.collect.get(exports.CollectType.crab) > 0) {
            result = this.findMGPos(exports.CollectType.crab, isHavaExecType);
        }
        //检测宝石
        if (!result && this.collect.get(exports.CollectType.gem) > 0) {
            result = this._findGemPos();
        }
        //检测冰激凌
        if (!result && this.collect.get(Constant_1.CellType.IceCream + '') > 0) {
            result = this._findIceCreamPos();
        }
        //最后检测普通元素
        if (!result) {
            result = this._findNormalCollectPos();
        }
        //如果普通元素也没有,就随便拿一个!
        if (!result) {
            result = this._findNotCollectCellPos();
        }
        if (result) {
            this._markPos(result);
        }
        return result;
    };
    /**
     * 找宝石位
     */
    CollectModel.prototype._findGemPos = function () {
        var result = null;
        var list = Array.from(GameModel_1.default.ins.CellDict);
        for (var i = list.length; i--;) {
            var cell = list[i];
            if (cell && !cell.isDeath && !cell.isFalling() && cell.GemLv > 0 && !this._isMarked(cell.pos)) {
                result = cell.pos;
                break;
            }
        }
        return result;
    };
    /**
     * 找冰激凌位置!
     */
    CollectModel.prototype._findIceCreamPos = function () {
        var result = null;
        var dir = [cc.v2(0, 1), cc.v2(1, 1), cc.v2(-1, 1)];
        var iceCreamList = Array.from(GameModel_1.default.ins.IceCreamPool);
        iceCreamList.sort(function (a, b) {
            return a.pos.y - b.pos.y;
        });
        for (var j = iceCreamList.length; j--;) {
            var cell = iceCreamList[j];
            if (cell && !cell.isDeath && !cell.isEmpty && cell.getType() == Constant_1.CellType.IceCream && !GameModel_1.default.ins.isHavaSpe(cell.pos)) {
                for (var i = 0; i < dir.length; i++) {
                    var cp = cell.pos.add(dir[i]);
                    var gc = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.GroundList, cp);
                    if (gc && !gc.isHold && !this._isMarked(cp)) {
                        result = cp;
                        j = 0;
                        break;
                    }
                }
            }
        }
        return result;
    };
    /**
     * 获取一个箱子的坐标!
     */
    CollectModel.prototype._findBoxPos = function () {
        var boxList = GameModel_1.default.ins.getUpGroundModel().BoxMap;
        var result = null;
        if (boxList.size > 0) {
            var ary = Array.from(boxList);
            for (var i = 0; i < ary.length; i++) {
                var pos = ary[i][1];
                if (!this._isMarked(pos)) {
                    result = pos;
                    break;
                }
            }
        }
        return result;
    };
    /**
     * 如果当前关卡没有目标物（比如椰子还没生成），章鱼飞往元素的优先级为：香蕉>石头>铁链>箱子>冰块>土块>普通元素"
     */
    CollectModel.prototype._findNotCollectCellPos = function () {
        var result = null;
        var list = Array.from(GameModel_1.default.ins.CellDict);
        for (var i = list.length; i--;) {
            var cell = list[i];
            if (cell && !cell.isDeath && !cell.isEmpty && !cell.isFalling() && !this._isMarked(cell.pos)) {
                var gc = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.GroundList, cell.pos);
                if (!gc || (gc && !gc.isHold)) {
                    if (cell.getType() == Constant_1.CellType.Banana) {
                        result = cell.pos;
                        break;
                    }
                    if (GameModel_1.default.ins.isHavaSpe(cell.pos)) {
                        result = cell.pos;
                        break;
                    }
                    if (cell.getType() == Constant_1.CellType.Ground) {
                        result = cell.pos;
                        break;
                    }
                    result = cell.pos;
                    break;
                }
            }
        }
        return result;
    };
    /**
     * 获取一个普通收集物的位置!
     */
    CollectModel.prototype._findNormalCollectPos = function () {
        var result = null;
        var collectTypes = Array.from(this.collect.keys());
        for (var j = collectTypes.length; j--;) {
            var type = Number(collectTypes[j]);
            if (!Number.isNaN(type) && type != Constant_1.CellType.IceCream && this.collect.get(type + '') > 0) {
                var list = Array.from(GameModel_1.default.ins.CellDict);
                for (var i = list.length; i--;) {
                    var cell = list[i];
                    if (cell && !cell.isEmpty && !cell.isDeath && !cell.isFalling() && cell.getType() == type && !this._isMarked(cell.pos)) {
                        var gc = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.GroundList, cell.pos);
                        if (!gc.isHold) {
                            j = 0;
                            result = cell.pos;
                            break;
                        }
                    }
                }
            }
        }
        return result;
    };
    /**
     * 寻找一个复杂的多个收集物
     * @param type
     * @param isHavaExecType
     */
    CollectModel.prototype.findMGPos = function (type, isHavaExecType) {
        var result = null;
        var data = GameModel_1.default.ins.getMgModel().getData(type);
        if (data) {
            var keys = Object.keys(data);
            for (var i = keys.length; i--;) {
                var index = keys[i];
                var posPool = data[index];
                if (posPool) {
                    for (var j = posPool.length; j--;) {
                        var pos = posPool[j];
                        if (!pos || this._isMarked(pos) || (isHavaExecType && GameModel_1.default.ins.isHavaSpe(pos))) {
                            continue;
                        }
                        else {
                            result = pos;
                            i = 0;
                            break;
                        }
                    }
                }
                else {
                    result = null;
                }
            }
        }
        return result;
    };
    CollectModel.prototype.checkCollectOK = function () {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = true;
                        this.collect.forEach(function (remainCount, type) {
                            if (remainCount > 0) {
                                result = false;
                            }
                        });
                        if (!result) return [3 /*break*/, 3];
                        if (!GameModel_1.default.ins.isNovLv) return [3 /*break*/, 2];
                        return [4 /*yield*/, GameModel_1.default.ins.checkGameOver()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        M_1.default.event.send(Event_1.Event.GameCMD.GameOver, true);
                        _a.label = 3;
                    case 3: return [2 /*return*/, result];
                }
            });
        });
    };
    CollectModel.prototype.checkSingleCollectState = function (type, isOver) {
        if (!this.singleCollect)
            return;
        var singleCount = this.singleCollect[type];
        if (singleCount && !isOver) {
            singleCount = singleCount - 1;
            if (singleCount <= 0) {
                var nextIndex = GameModel_1.default.ins.mapIndex + 1;
                if (nextIndex < GameModel_1.default.ins.mapCount) {
                    this.singleCollect[type] = 0;
                    Log_1.Log.i('触发转移棋盘,nextIndex:', nextIndex, ',singleCount:', singleCount);
                    M_1.default.event.send(Event_1.Event.GameCMD.MoveGrid, nextIndex, 0);
                }
            }
            else {
                this.singleCollect[type] = singleCount;
                //需要检测所收集物品是否在屏幕中间 
                M_1.default.event.send(Event_1.Event.GameCMD.MoveGrid, null, 1);
            }
        }
    };
    /**初始化任务目标 */
    CollectModel.prototype.initMainCollect = function (collect) {
        var _this = this;
        this.collect = new Map();
        //总共需要收集的物品
        collect.forEach(function (data) {
            _this.collect.set(data.type + '', data.count);
        });
    };
    return CollectModel;
}());
exports.CollectModel = CollectModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcQ29sbGVjdE1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZDQUF3QztBQUN4QyxnREFBK0M7QUFDL0MsK0NBQThDO0FBQzlDLHlDQUFvQztBQUNwQyw4Q0FBeUM7QUFDekMsc0RBQWtFO0FBSXJELFFBQUEsV0FBVyxHQUFHO0lBQ3ZCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLEtBQUssRUFBRSxPQUFPO0lBQ2QsR0FBRyxFQUFFLEtBQUs7SUFDVixRQUFRLEVBQUUsVUFBVTtJQUNwQixLQUFLLEVBQUUsT0FBTztJQUNkLElBQUksRUFBRSxNQUFNO0lBQ1osT0FBTyxFQUFFLFNBQVM7SUFDbEIsSUFBSSxFQUFFLE1BQU07SUFDWixHQUFHLEVBQUUsS0FBSztJQUNWLE9BQU8sRUFBRSxTQUFTO0NBQ3JCLENBQUE7QUFFRDtJQVlJLHNCQUFZLE9BQWtCO1FBVjlCLFNBQVM7UUFDRCxZQUFPLEdBQXdCLElBQUksQ0FBQztRQUM1QyxXQUFXO1FBQ0gsa0JBQWEsR0FBOEIsSUFBSSxDQUFDO1FBRXhELGdCQUFnQjtRQUNULHNCQUFpQixHQUF1QyxJQUFJLENBQUM7UUFFNUQsWUFBTyxHQUFnQixJQUFJLENBQUM7UUFHaEMsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVZLHlDQUFrQixHQUEvQixVQUFnQyxJQUFZLEVBQUUsR0FBVyxFQUFFLEtBQXdCLEVBQUUsV0FBeUI7Ozs7Ozt3QkFDMUcsSUFBSSxHQUFHLElBQUksQ0FBQzt3QkFDUixLQUFL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LENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDakQ7U0FDSjtJQUNMLENBQUM7SUFFRCxhQUFhO0lBQ0wsc0NBQWUsR0FBdkIsVUFBd0IsT0FBa0I7UUFBMUMsaUJBTUM7UUFMRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDekIsV0FBVztRQUNYLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFhO1lBQzFCLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTCxtQkFBQztBQUFELENBdlRBLEFBdVRDLElBQUE7QUF2VFksb0NBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2xsZWN0LCBHbm9tZSB9IGZyb20gXCIuLi8uLi9EYXRhL0ludGVyZmFjZS9MZXZlbC9JTGV2ZWxcIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IHsgTG9nIH0gZnJvbSBcIi4uLy4uLy4uL0Jhc2UvVXRpbHMvTG9nXCI7XG5pbXBvcnQgR2FtZU1vZGVsIGZyb20gXCIuL0dhbWVNb2RlbFwiO1xuaW1wb3J0IENvbW1vbiBmcm9tIFwiLi4vLi4vQ29tbW9uL0NvbW1vblwiO1xuaW1wb3J0IHsgRWxpbWF0ZVR5cGUsIENlbGxUeXBlIH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCBHcm91bmRDZWxsTW9kZWwgZnJvbSBcIi4vR3JvdW5kQ2VsbE1vZGVsXCI7XG5pbXBvcnQgeyBDZWxsTW9kZWwgfSBmcm9tIFwiLi9DZWxsTW9kZWxcIjtcblxuZXhwb3J0IGNvbnN0IENvbGxlY3RUeXBlID0ge1xuICAgIG5vcm1hbDogJ25vcm1hbCcsXG4gICAgZ25vbWU6ICdnbm9tZScsXG4gICAgYm94OiAnYm94JyxcbiAgICBjb2xvcmJveDogJ2NvbG9yYm94JyxcbiAgICBzdG9uZTogJ3N0b25lJyxcbiAgICB0cmVlOiAndHJlZScsXG4gICAgdHVydGxlczogJ3R1cnRsZXMnLFxuICAgIGNyYWI6ICdjcmFiJyxcbiAgICBnZW06ICdnZW0nLFxuICAgIGZpcmVmbHk6ICdmaXJlZmx5J1xufVxuXG5leHBvcnQgY2xhc3MgQ29sbGVjdE1vZGVsIHtcblxuICAgIC8v5YWo6YOo55qE5pS26ZuG55uu5qCHXG4gICAgcHJpdmF0ZSBjb2xsZWN0OiBNYXA8c3RyaW5nLCBudW1iZXI+ID0gbnVsbDtcbiAgICAvL+WNleW8oOeVjOmdoueahOaUtumbhuebruagh1xuICAgIHByaXZhdGUgc2luZ2xlQ29sbGVjdDogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSA9IG51bGw7XG5cbiAgICAvL+aOqOWcn+acuui/meenjeaUtumbhueJqeeahOWvueeFp+S/oeaBryFcbiAgICBwdWJsaWMgY29sbGVjdFBvd2VyQ2VsbHM6IHsgW2tleTogc3RyaW5nXTogR3JvdW5kQ2VsbE1vZGVsIH0gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfbWFya2VkOiBTZXQ8c3RyaW5nPiA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb2xsZWN0OiBDb2xsZWN0W10pIHtcbiAgICAgICAgaWYgKGNvbGxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdE1haW5Db2xsZWN0KGNvbGxlY3QpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29sbGVjdFBvd2VyQ2VsbHMgPSB7fTtcbiAgICAgICAgdGhpcy5fbWFya2VkID0gbmV3IFNldCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyB1cGRhdGVDb2xsZWN0Q291bnQodHlwZTogc3RyaW5nLCBudW06IG51bWJlciwgaW5kZXg/OiBudW1iZXIgfCBjYy5WZWMyLCBlbGltYXRlVHlwZT86IEVsaW1hdGVUeXBlLCApIHtcbiAgICAgICAgdHlwZSA9IHR5cGU7XG4gICAgICAgIGxldCBjb3VudCA9IHRoaXMuY29sbGVjdC5nZXQodHlwZSk7XG4gICAgICAgIGxldCBpc092ZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgICAgICBjb3VudCA9IChjb3VudCAtIG51bSkgPD0gMCA/IDAgOiAoY291bnQgLSBudW0pO1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0LnNldCh0eXBlLCBjb3VudCk7XG4gICAgICAgICAgICBpc092ZXIgPSBhd2FpdCB0aGlzLmNoZWNrQ29sbGVjdE9LKCk7XG4gICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuVUkuQ29sbGVjdENvbXBsZXQsIHR5cGUsIGluZGV4LCBlbGltYXRlVHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy/mo4DmtYvljZXlvKDnlYzpnaLmmK/lkKblm57mlLblrozmr5Us6Kem5Y+R5YiH5o2i5Zyw5Zu+XG4gICAgICAgIHRoaXMuY2hlY2tTaW5nbGVDb2xsZWN0U3RhdGUodHlwZSwgaXNPdmVyKTtcbiAgICAgICAgaWYgKHR5cGUgPT0gQ29sbGVjdFR5cGUuZ25vbWUpIHtcbiAgICAgICAgICAgIExvZy5pKGDlrozmiJDkuIDkuKrmlaPoo4XmlLbpm4bniannmoTlm57mlLYhIOaAu+i/mOmcgOimgeaUtumbhjoke3RoaXMuY29sbGVjdC5nZXQodHlwZSl9LOW9k+WJjeWcsOWbvui/mOaciToke3RoaXMuc2luZ2xlQ29sbGVjdCAmJiB0aGlzLnNpbmdsZUNvbGxlY3RbdHlwZV19YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQ29sbGVjdFBvd2VyQ2VsbChjZWxsOiBDZWxsTW9kZWwpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBsZXQgZ3JvdW5kQ2VsbCA9IHRoaXMuY29sbGVjdFBvd2VyQ2VsbHNbYCR7Y2VsbC5nZXRUeXBlKCl9YF07XG4gICAgICAgIGlmIChncm91bmRDZWxsKSB7XG4gICAgICAgICAgICBncm91bmRDZWxsLmV4dEN0cmwudXBkYXRlVHVpdHVqaVBvd2VyKCk7XG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgLy/nlYzpnaLliqjnlLshXG4gICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuR2FtZUNNRC5VcGRhdGVDb2xsZWN0UG93ZXIsIGNlbGwsIGdyb3VuZENlbGwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBtYWluQ29sbGVjdCgpOiBNYXA8c3RyaW5nLCBudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGVjdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQ3VyU2luZ2xlQ29sbGVjdChzaW5nbGVDb2xsZWN0OiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9KSB7XG4gICAgICAgIHRoaXMuc2luZ2xlQ29sbGVjdCA9IHNpbmdsZUNvbGxlY3Q7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWFya1Bvcyhwb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgdGhpcy5fbWFya2VkLmFkZChDb21tb24uZ2V0U3RyaW5na2V5KHBvcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lzTWFya2VkKHBvczogY2MuVmVjMik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFya2VkLmhhcyhDb21tb24uZ2V0U3RyaW5na2V5KHBvcykpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVNYXJrKHBvczogY2MuVmVjMikge1xuICAgICAgICB0aGlzLl9tYXJrZWQuZGVsZXRlKENvbW1vbi5nZXRTdHJpbmdrZXkocG9zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog56ug6bG855uu5qCH55qE5a+75om+IVxuICAgICAqIFwi56ug6bG85py65Yi25LyY5YyW77yaXG4gICAgICogIDEu5Zyo57+h57+g5YWz5Y2h77yM5bqU6K+l6IO95aSf6aOe5Yiw57+h57+g55qE5L2N572uXG4gICAgICogIDIu5aaC5p6c5b2T5YmN5YWz5Y2h5rKh5pyJ55uu5qCH54mp77yI5q+U5aaC5qSw5a2Q6L+Y5rKh55Sf5oiQ77yJ77yM56ug6bG86aOe5b6A5YWD57Sg55qE5LyY5YWI57qn5Li677ya6aaZ6JWJPuefs+WktD7pk4Hpk74+566x5a2QPuWGsOWdlz7lnJ/lnZc+5pmu6YCa5YWD57SgXCJcbiAgICAgKiBAcGFyYW0gaXNIYXZhRXhlY1R5cGUgXG4gICAgICovXG4gICAgcHVibGljIGZpbmRPbmVDb2xsZWN0UG9zKGlzSGF2YUV4ZWNUeXBlOiBib29sZWFuID0gZmFsc2UpOiBjYy5WZWMyIHtcbiAgICAgICAgLy/lhYjkuI3ogIPomZHlpJrlvKDlnLDlm77nmoTmg4XlhrUhXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgICAvL+ajgOa1i+acqOeusVxuICAgICAgICBpZiAodGhpcy5jb2xsZWN0LmdldChDb2xsZWN0VHlwZS5ib3gpID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fZmluZEJveFBvcygpO1xuICAgICAgICB9XG4gICAgICAgIC8v5qOA5rWL6JiR6I+HXG4gICAgICAgIGlmICghcmVzdWx0ICYmIHRoaXMuY29sbGVjdC5nZXQoQ29sbGVjdFR5cGUuZ25vbWUpID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5maW5kTUdQb3MoQ29sbGVjdFR5cGUuZ25vbWUsIGlzSGF2YUV4ZWNUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICAvL+ajgOa1i+ieg+ifuVxuICAgICAgICBpZiAoIXJlc3VsdCAmJiB0aGlzLmNvbGxlY3QuZ2V0KENvbGxlY3RUeXBlLmNyYWIpID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5maW5kTUdQb3MoQ29sbGVjdFR5cGUuY3JhYiwgaXNIYXZhRXhlY1R5cGUpO1xuICAgICAgICB9XG4gICAgICAgIC8v5qOA5rWL5a6d55+zXG4gICAgICAgIGlmICghcmVzdWx0ICYmIHRoaXMuY29sbGVjdC5nZXQoQ29sbGVjdFR5cGUuZ2VtKSA+IDApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2ZpbmRHZW1Qb3MoKTtcbiAgICAgICAgfVxuICAgICAgICAvL+ajgOa1i+WGsOa/gOWHjFxuICAgICAgICBpZiAoIXJlc3VsdCAmJiB0aGlzLmNvbGxlY3QuZ2V0KENlbGxUeXBlLkljZUNyZWFtICsgJycpID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fZmluZEljZUNyZWFtUG9zKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy/mnIDlkI7mo4DmtYvmma7pgJrlhYPntKBcbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2ZpbmROb3JtYWxDb2xsZWN0UG9zKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy/lpoLmnpzmma7pgJrlhYPntKDkuZ/msqHmnIks5bCx6ZqP5L6/5ou/5LiA5LiqIVxuICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fZmluZE5vdENvbGxlY3RDZWxsUG9zKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJrUG9zKHJlc3VsdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaJvuWuneefs+S9jVxuICAgICAqL1xuICAgIHByaXZhdGUgX2ZpbmRHZW1Qb3MoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgICBjb25zdCBsaXN0ID0gQXJyYXkuZnJvbShHYW1lTW9kZWwuaW5zLkNlbGxEaWN0KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGxpc3QubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gbGlzdFtpXTtcbiAgICAgICAgICAgIGlmIChjZWxsICYmICFjZWxsLmlzRGVhdGggJiYgIWNlbGwuaXNGYWxsaW5nKCkgJiYgY2VsbC5HZW1MdiA+IDAgJiYgIXRoaXMuX2lzTWFya2VkKGNlbGwucG9zKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNlbGwucG9zO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5om+5Yaw5r+A5YeM5L2N572uIVxuICAgICAqL1xuICAgIHByaXZhdGUgX2ZpbmRJY2VDcmVhbVBvcygpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICAgIGNvbnN0IGRpciA9IFtjYy52MigwLCAxKSwgY2MudjIoMSwgMSksIGNjLnYyKC0xLCAxKV07XG4gICAgICAgIGNvbnN0IGljZUNyZWFtTGlzdCA9IEFycmF5LmZyb20oR2FtZU1vZGVsLmlucy5JY2VDcmVhbVBvb2wpO1xuICAgICAgICBpY2VDcmVhbUxpc3Quc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGEucG9zLnkgLSBiLnBvcy55O1xuICAgICAgICB9KVxuICAgICAgICBmb3IgKGxldCBqID0gaWNlQ3JlYW1MaXN0Lmxlbmd0aDsgai0tOykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IGljZUNyZWFtTGlzdFtqXTtcbiAgICAgICAgICAgIGlmIChjZWxsICYmICFjZWxsLmlzRGVhdGggJiYgIWNlbGwuaXNFbXB0eSAmJiBjZWxsLmdldFR5cGUoKSA9PSBDZWxsVHlwZS5JY2VDcmVhbSAmJiAhR2FtZU1vZGVsLmlucy5pc0hhdmFTcGUoY2VsbC5wb3MpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3AgPSBjZWxsLnBvcy5hZGQoZGlyW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2MgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuR3JvdW5kTGlzdCwgY3ApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2MgJiYgIWdjLmlzSG9sZCAmJiAhdGhpcy5faXNNYXJrZWQoY3ApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBjcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGogPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bkuIDkuKrnrrHlrZDnmoTlnZDmoIchXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZmluZEJveFBvcygpIHtcbiAgICAgICAgY29uc3QgYm94TGlzdCA9IEdhbWVNb2RlbC5pbnMuZ2V0VXBHcm91bmRNb2RlbCgpLkJveE1hcDtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICAgIGlmIChib3hMaXN0LnNpemUgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBhcnkgPSBBcnJheS5mcm9tKGJveExpc3QpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3MgPSBhcnlbaV1bMV07XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc01hcmtlZChwb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHBvcztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aaC5p6c5b2T5YmN5YWz5Y2h5rKh5pyJ55uu5qCH54mp77yI5q+U5aaC5qSw5a2Q6L+Y5rKh55Sf5oiQ77yJ77yM56ug6bG86aOe5b6A5YWD57Sg55qE5LyY5YWI57qn5Li677ya6aaZ6JWJPuefs+WktD7pk4Hpk74+566x5a2QPuWGsOWdlz7lnJ/lnZc+5pmu6YCa5YWD57SgXCJcbiAgICAgKi9cbiAgICBwcml2YXRlIF9maW5kTm90Q29sbGVjdENlbGxQb3MoKTogY2MuVmVjMiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgICBjb25zdCBsaXN0ID0gQXJyYXkuZnJvbShHYW1lTW9kZWwuaW5zLkNlbGxEaWN0KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGxpc3QubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gbGlzdFtpXTtcbiAgICAgICAgICAgIGlmIChjZWxsICYmICFjZWxsLmlzRGVhdGggJiYgIWNlbGwuaXNFbXB0eSAmJiAhY2VsbC5pc0ZhbGxpbmcoKSAmJiAhdGhpcy5faXNNYXJrZWQoY2VsbC5wb3MpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ2MgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuR3JvdW5kTGlzdCwgY2VsbC5wb3MpO1xuICAgICAgICAgICAgICAgIGlmICghZ2MgfHwgKGdjICYmICFnYy5pc0hvbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsLmdldFR5cGUoKSA9PSBDZWxsVHlwZS5CYW5hbmEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNlbGwucG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKEdhbWVNb2RlbC5pbnMuaXNIYXZhU3BlKGNlbGwucG9zKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gY2VsbC5wb3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbC5nZXRUeXBlKCkgPT0gQ2VsbFR5cGUuR3JvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBjZWxsLnBvcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNlbGwucG9zO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bkuIDkuKrmma7pgJrmlLbpm4bniannmoTkvY3nva4hXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZmluZE5vcm1hbENvbGxlY3RQb3MoKTogY2MuVmVjMiB7XG4gICAgICAgIGxldCByZXN1bHQ6IGNjLlZlYzIgPSBudWxsO1xuICAgICAgICBjb25zdCBjb2xsZWN0VHlwZXMgPSBBcnJheS5mcm9tKHRoaXMuY29sbGVjdC5rZXlzKCkpO1xuICAgICAgICBmb3IgKGxldCBqID0gY29sbGVjdFR5cGVzLmxlbmd0aDsgai0tOykge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IE51bWJlcihjb2xsZWN0VHlwZXNbal0pO1xuICAgICAgICAgICAgaWYgKCFOdW1iZXIuaXNOYU4odHlwZSkgJiYgdHlwZSAhPSBDZWxsVHlwZS5JY2VDcmVhbSAmJiB0aGlzLmNvbGxlY3QuZ2V0KHR5cGUgKyAnJykgPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IEFycmF5LmZyb20oR2FtZU1vZGVsLmlucy5DZWxsRGljdCk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGxpc3QubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbCAmJiAhY2VsbC5pc0VtcHR5ICYmICFjZWxsLmlzRGVhdGggJiYgIWNlbGwuaXNGYWxsaW5nKCkgJiYgY2VsbC5nZXRUeXBlKCkgPT0gdHlwZSAmJiAhdGhpcy5faXNNYXJrZWQoY2VsbC5wb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBnYyA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUoR2FtZU1vZGVsLmlucy5Hcm91bmRMaXN0LCBjZWxsLnBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWdjLmlzSG9sZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNlbGwucG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5a+75om+5LiA5Liq5aSN5p2C55qE5aSa5Liq5pS26ZuG54mpXG4gICAgICogQHBhcmFtIHR5cGUgXG4gICAgICogQHBhcmFtIGlzSGF2YUV4ZWNUeXBlIFxuICAgICAqL1xuICAgIHByaXZhdGUgZmluZE1HUG9zKHR5cGU6IHN0cmluZywgaXNIYXZhRXhlY1R5cGU6IGJvb2xlYW4pIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBHYW1lTW9kZWwuaW5zLmdldE1nTW9kZWwoKS5nZXREYXRhKHR5cGUpO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpXG4gICAgICAgICAgICBmb3IgKGxldCBpID0ga2V5cy5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zUG9vbCA9IGRhdGFbaW5kZXhdO1xuICAgICAgICAgICAgICAgIGlmIChwb3NQb29sKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBwb3NQb29sLmxlbmd0aDsgai0tOykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zID0gcG9zUG9vbFtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcG9zIHx8IHRoaXMuX2lzTWFya2VkKHBvcykgfHwgKGlzSGF2YUV4ZWNUeXBlICYmIEdhbWVNb2RlbC5pbnMuaXNIYXZhU3BlKHBvcykpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHBvcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBjaGVja0NvbGxlY3RPSygpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRydWU7XG4gICAgICAgIHRoaXMuY29sbGVjdC5mb3JFYWNoKChyZW1haW5Db3VudCwgdHlwZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlbWFpbkNvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoR2FtZU1vZGVsLmlucy5pc05vdkx2KSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgR2FtZU1vZGVsLmlucy5jaGVja0dhbWVPdmVyKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5HYW1lQ01ELkdhbWVPdmVyLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tTaW5nbGVDb2xsZWN0U3RhdGUodHlwZTogc3RyaW5nLCBpc092ZXI6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLnNpbmdsZUNvbGxlY3QpIHJldHVybjtcbiAgICAgICAgbGV0IHNpbmdsZUNvdW50ID0gdGhpcy5zaW5nbGVDb2xsZWN0W3R5cGVdO1xuICAgICAgICBpZiAoc2luZ2xlQ291bnQgJiYgIWlzT3Zlcikge1xuICAgICAgICAgICAgc2luZ2xlQ291bnQgPSBzaW5nbGVDb3VudCAtIDE7XG4gICAgICAgICAgICBpZiAoc2luZ2xlQ291bnQgPD0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRJbmRleCA9IEdhbWVNb2RlbC5pbnMubWFwSW5kZXggKyAxO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0SW5kZXggPCBHYW1lTW9kZWwuaW5zLm1hcENvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2luZ2xlQ29sbGVjdFt0eXBlXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIExvZy5pKCfop6blj5Hovaznp7vmo4vnm5gsbmV4dEluZGV4OicsIG5leHRJbmRleCwgJyxzaW5nbGVDb3VudDonLCBzaW5nbGVDb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5HYW1lQ01ELk1vdmVHcmlkLCBuZXh0SW5kZXgsIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaW5nbGVDb2xsZWN0W3R5cGVdID0gc2luZ2xlQ291bnQ7XG4gICAgICAgICAgICAgICAgLy/pnIDopoHmo4DmtYvmiYDmlLbpm4bnianlk4HmmK/lkKblnKjlsY/luZXkuK3pl7QgXG4gICAgICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LkdhbWVDTUQuTW92ZUdyaWQsIG51bGwsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5Yid5aeL5YyW5Lu75Yqh55uu5qCHICovXG4gICAgcHJpdmF0ZSBpbml0TWFpbkNvbGxlY3QoY29sbGVjdDogQ29sbGVjdFtdKSB7XG4gICAgICAgIHRoaXMuY29sbGVjdCA9IG5ldyBNYXAoKTtcbiAgICAgICAgLy/mgLvlhbHpnIDopoHmlLbpm4bnmoTnianlk4FcbiAgICAgICAgY29sbGVjdC5mb3JFYWNoKChkYXRhOiBDb2xsZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Quc2V0KGRhdGEudHlwZSArICcnLCBkYXRhLmNvdW50KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbn0iXX0=