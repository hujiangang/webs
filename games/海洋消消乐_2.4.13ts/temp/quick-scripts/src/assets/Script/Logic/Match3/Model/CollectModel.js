"use strict";
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