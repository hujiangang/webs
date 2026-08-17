
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/UpGroundCellModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9e9ba+ISJJFbIgvN1tYOq5u', 'UpGroundCellModel');
// Script/Logic/Match3/Model/UpGroundCellModel.ts

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
var CellBase_1 = require("./CellBase");
var SpecialCell_1 = require("./SpecialCell");
var Common_1 = require("../../Common/Common");
var GameModel_1 = require("./GameModel");
var CollectModel_1 = require("./CollectModel");
var M_1 = require("../../../Base/Manager/M");
var Constant_1 = require("../../Data/Const/Constant");
/** */
var UpGroundCellModel = /** @class */ (function (_super) {
    __extends(UpGroundCellModel, _super);
    function UpGroundCellModel() {
        var _this = _super.call(this) || this;
        _this.specials = null;
        /**障碍物,可以消除那一类 */
        _this.isObstacles = false;
        _this._isBox = false;
        _this._boxType = null;
        _this.isFollowBindNode = false;
        //-1为入口 1为出口 0为没有
        _this.portalIdx = 0;
        _this.BindCell = null;
        _this.isNov = false;
        /**完整的元素! 适用于石头等如果是完整状态需要被炸弹炸烂 */
        _this.isIntact = true;
        _this.isElimateing = false;
        _this._groupId = null;
        _this._elimateCount = 0;
        _this.isObstacles = false;
        _this.type = Constant_1.UpGroundType.None;
        _this.ctrlName = 'ItemUpgroundCtrl';
        return _this;
    }
    UpGroundCellModel.prototype.init = function (data, x, y, index) {
        this._pos = cc.v2(x, y);
        if (!data) {
            this.type = Constant_1.UpGroundType.None;
            return;
        }
        this.mapIndex = index;
        this.data = data;
        this.specials = [];
        this.BindCell = null;
        this._boxType = null;
        this._groupId = null;
        //待重构
        /**引导用的水草 */
        if (data.nov_grass) {
            this.isNov = true;
            this.specials.push(new SpecialCell_1.default(Constant_1.UpGroundType.Nov_grass, data.nov_grass));
        }
        /**引导用的爆炸贝壳 */
        if (data.nov_conch) {
            this.isNov = true;
            this.isObstacles = true;
            this.specials.push(new SpecialCell_1.default(Constant_1.UpGroundType.Nov_conch, data.nov_conch));
        }
        /**冰块 */
        if (data.ice) {
            this.specials.push(new SpecialCell_1.default(Constant_1.UpGroundType.Ice, data.ice));
        }
        /**锁链 */
        if (data.locks) {
            this.specials.push(new SpecialCell_1.default(Constant_1.UpGroundType.Lock, data.locks));
        }
        /**箱子 */
        if (data.box_level) {
            this.specials.push(new SpecialCell_1.default(Constant_1.UpGroundType.Box, data.box_level));
            this.isObstacles = true;
            this._isBox = true;
            this._boxType = (data.box_type != null && data.box_type != undefined) ? data.box_type : null;
        }
        /**石头 */
        if (data.stone) {
            this.specials.push(new SpecialCell_1.default(Constant_1.UpGroundType.Stone, /*data.stone*/ 2));
            this.isObstacles = true;
        }
        /**会长的滕 ??*/
        if (data.ivy) {
        }
        if (data.portal_idx) {
            this.portalIdx = data.portal_idx;
        }
        var curSp = this.getCurrentSpecial();
        if (curSp) {
            this.type = curSp.type;
            this.lv = curSp.lv;
        }
        if (this.isNov) {
            GameModel_1.default.ins.isNovLv = true;
        }
    };
    UpGroundCellModel.prototype.forcedElimateNov = function () {
        this.isNov = false;
        this.isObstacles = false;
        this.isFollowBindNode = false;
        this.specials.length = 0;
        this.type = Constant_1.UpGroundType.None;
        this.BindCell.onMsg(CellBase_1.MsgType.Bomb);
    };
    UpGroundCellModel.prototype.getNovWaringTitle = function () {
        var result = '';
        var cfg = M_1.default.table.Titles.getByPrimaryKey(M_1.default.runtime.getMatch3Level());
        if (cfg && cfg.novContent) {
            result = cfg.novContent;
        }
        return result;
    };
    UpGroundCellModel.prototype.isCanFall = function () {
        var result = true;
        switch (this.type) {
            case Constant_1.UpGroundType.Lock:
            case Constant_1.UpGroundType.Box:
            case Constant_1.UpGroundType.Stone:
            case Constant_1.UpGroundType.Nov_grass:
                result = false;
                break;
            case Constant_1.UpGroundType.Ice:
                break;
        }
        return result;
    };
    UpGroundCellModel.prototype.onMsg = function (type, data) {
        //有覆盖物 
        this._groupId = data ? data.groupId : null;
        switch (type) {
            case CellBase_1.MsgType.Elimate:
                if (Constant_1.UpGroundType.Stone == this.type && Common_1.default.isBombType(data.type)) {
                    //破碎石头!
                    this.isIntact = false;
                }
                this.execElimate();
                break;
            case CellBase_1.MsgType.BesideElimate:
                this.besideElimate(data.cell);
                break;
            case CellBase_1.MsgType.ElimateAll:
                this.execElimateAll();
                break;
        }
    };
    //位置发生改变
    UpGroundCellModel.prototype.onChangePos = function (pos) {
        //置空之前的空位
        Common_1.default.safeSet2ArrayValue(GameModel_1.default.ins.UpGroundList, this._pos, null);
        //重设当前的位置句柄
        Common_1.default.safeSet2ArrayValue(GameModel_1.default.ins.UpGroundList, pos, this);
    };
    UpGroundCellModel.prototype.onUnBind = function (pos) {
    };
    UpGroundCellModel.prototype.onBind = function (model) {
        this.BindCell = model;
        this.changeSpecialPlug();
    };
    UpGroundCellModel.prototype.besideElimate = function (cell) {
        switch (this.type) {
            case Constant_1.UpGroundType.Box:
                if (this.isBox && (this.boxType == null || !cell || (cell.getType() == this.boxType))) {
                    this.execElimate();
                }
                break;
            case Constant_1.UpGroundType.Stone:
                if (!this.isIntact) {
                    this.execElimate();
                }
                break;
        }
    };
    UpGroundCellModel.prototype.execElimateAll = function () {
        var _this = this;
        this._elimateCount = 0;
        if (this.specials && this.specials.length > 0 && this.lv > 0) {
            this.lv = 0;
            this.type = Constant_1.UpGroundType.None;
            this.specials.forEach(function (spe) {
                _this._elimateCount += spe.lv;
                if (spe.type == Constant_1.UpGroundType.Box) {
                    _this.updateCollect(Constant_1.UpGroundType.Box);
                }
            });
            this._isBox = false;
            this.specials.length = 0;
            this.isObstacles = false;
            this.isFollowBindNode = false;
            this.notifyOver(Constant_1.UpGroundType.Box);
        }
        this.extCtrl.playAnimation(this.type);
        return this._elimateCount;
    };
    UpGroundCellModel.prototype.updateCollect = function (type) {
        GameModel_1.default.ins.updateCollectCount(this.getCollectName(type, this._boxType), this.pos);
    };
    UpGroundCellModel.prototype.execElimate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isNeedCheckElimate, preType, currentSp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.type != Constant_1.UpGroundType.None && !this.isElimateing && !this.isNov)) return [3 /*break*/, 2];
                        this.isElimateing = true;
                        return [4 /*yield*/, this.extCtrl.playAnimation(this.type)];
                    case 1:
                        _a.sent();
                        //等待播放动画完成后才去做类型/等级操作
                        if (!this.isHavaSpe) {
                            return [2 /*return*/];
                        }
                        ;
                        this.lv = this.getCurrentSpecial().setLv(-1);
                        if (this.lv <= 0) {
                            isNeedCheckElimate = this._checkNeedOverCheck();
                            if (this.type == Constant_1.UpGroundType.Box) {
                                this._isBox = false;
                                this.updateCollect(null);
                            }
                            this.specials.splice(this.specials.length - 1, 1);
                            preType = this.type;
                            currentSp = this.getCurrentSpecial();
                            if (currentSp) {
                                this.type = currentSp.type;
                                this.lv = currentSp.lv;
                                this.changeSpecialPlug();
                            }
                            else {
                                this.type = Constant_1.UpGroundType.None;
                            }
                            this.checkChangeObs(preType);
                            if (isNeedCheckElimate) {
                                GameModel_1.default.ins.checkHavaElimate(this.pos);
                            }
                        }
                        this.isElimateing = false;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    UpGroundCellModel.prototype._checkNeedOverCheck = function () {
        return (this.type == Constant_1.UpGroundType.Box || this.type == Constant_1.UpGroundType.Stone || this.type == Constant_1.UpGroundType.Ice);
    };
    UpGroundCellModel.prototype.getCollectName = function (type, boxType) {
        if (type === void 0) { type = null; }
        if (boxType === void 0) { boxType = null; }
        var result = null;
        type = type || this.type;
        switch (type) {
            case Constant_1.UpGroundType.Box:
                if (boxType != null) {
                    result = CollectModel_1.CollectType.colorbox;
                }
                else {
                    result = CollectModel_1.CollectType.box;
                }
                break;
            case Constant_1.UpGroundType.Stone:
                result = CollectModel_1.CollectType.stone;
                break;
        }
        return result;
    };
    UpGroundCellModel.prototype.changeSpecialPlug = function () {
        if (this.type == Constant_1.UpGroundType.Ice) {
            this.isFollowBindNode = true;
        }
    };
    UpGroundCellModel.prototype.checkChangeObs = function (preType) {
        return __awaiter(this, void 0, void 0, function () {
            var obs, i, type;
            return __generator(this, function (_a) {
                if (this.isHavaSpe) {
                    obs = false;
                    for (i = this.specials.length; i--;) {
                        type = this.specials[i].type;
                        if (type == Constant_1.UpGroundType.Box || type == Constant_1.UpGroundType.Stone) {
                            obs = true;
                            break;
                        }
                    }
                    this.isObstacles = obs;
                }
                else {
                    this.isObstacles = false;
                    this.isFollowBindNode = false;
                    this.notifyOver(preType);
                }
                return [2 /*return*/];
            });
        });
    };
    UpGroundCellModel.prototype.notifyOver = function (preType) {
        var ground = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.GroundList, this.pos);
        ground && ground.onMsg(CellBase_1.MsgType.UpGroundDone, preType);
        this.BindCell && this.BindCell.onMsg(CellBase_1.MsgType.UpGroundDone, this._groupId /* preType == UpGroundType.Box*/);
    };
    UpGroundCellModel.prototype.clear = function () {
        this.specials = [];
    };
    Object.defineProperty(UpGroundCellModel.prototype, "isFollowNode", {
        get: function () {
            return this.isFollowBindNode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UpGroundCellModel.prototype, "boxType", {
        get: function () {
            return this._boxType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UpGroundCellModel.prototype, "isBox", {
        get: function () {
            return this._isBox;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UpGroundCellModel.prototype, "isObs", {
        /**是否是不会参与消除的障碍物 */
        get: function () {
            return this.isObstacles;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UpGroundCellModel.prototype, "isHavaSpe", {
        get: function () {
            return (this.specials && this.specials.length > 0);
        },
        enumerable: false,
        configurable: true
    });
    UpGroundCellModel.prototype.getSpecials = function () {
        return this.specials;
    };
    /**获取最顶层的多功能道具 */
    UpGroundCellModel.prototype.getCurrentSpecial = function () {
        return this.specials[this.specials.length - 1];
    };
    return UpGroundCellModel;
}(CellBase_1.CellBase));
exports.default = UpGroundCellModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcVXBHcm91bmRDZWxsTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsdUNBQStDO0FBQy9DLDZDQUF3QztBQUV4Qyw4Q0FBeUM7QUFDekMseUNBQW9DO0FBRXBDLCtDQUE2QztBQUM3Qyw2Q0FBd0M7QUFDeEMsc0RBQXlEO0FBQ3pELE1BQU07QUFDTjtJQUErQyxxQ0FBd0M7SUF1Qm5GO1FBQUEsWUFDSSxpQkFBTyxTQUlWO1FBMUJPLGNBQVEsR0FBdUIsSUFBSSxDQUFDO1FBQzVDLGlCQUFpQjtRQUNULGlCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsY0FBUSxHQUFXLElBQUksQ0FBQztRQUN4QixzQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFFMUMsaUJBQWlCO1FBQ1YsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUV0QixjQUFRLEdBQWMsSUFBSSxDQUFDO1FBRTNCLFdBQUssR0FBWSxLQUFLLENBQUM7UUFFOUIsaUNBQWlDO1FBQzFCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsa0JBQVksR0FBWSxLQUFLLENBQUM7UUFFN0IsY0FBUSxHQUFXLElBQUksQ0FBQztRQXFLeEIsbUJBQWEsR0FBRyxDQUFDLENBQUM7UUFqS3RCLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLEtBQUksQ0FBQyxJQUFJLEdBQUcsdUJBQVksQ0FBQyxJQUFJLENBQUM7UUFDOUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQzs7SUFDdkMsQ0FBQztJQUVNLGdDQUFJLEdBQVgsVUFBWSxJQUFVLEVBQUUsQ0FBVSxFQUFFLENBQVUsRUFBRSxLQUFjO1FBQzFELElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxD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Q0FBQztRQUNqQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHNDQUFPO2FBQWxCO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsb0NBQUs7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyxvQ0FBSztRQURoQixtQkFBbUI7YUFDbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyx3Q0FBUzthQUFwQjtZQUNJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7OztPQUFBO0lBRU0sdUNBQVcsR0FBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELGlCQUFpQjtJQUNWLDZDQUFpQixHQUF4QjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQTlVQSxBQThVQyxDQTlVOEMsbUJBQVEsR0E4VXREIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBHcmlkIH0gZnJvbSBcIi4uLy4uL0RhdGEvSW50ZXJmYWNlL0xldmVsL0lMZXZlbFwiO1xuaW1wb3J0IHsgQ2VsbEJhc2UsIE1zZ1R5cGUgfSBmcm9tIFwiLi9DZWxsQmFzZVwiO1xuaW1wb3J0IFNwZWNpYWxDZWxsIGZyb20gXCIuL1NwZWNpYWxDZWxsXCI7XG5pbXBvcnQgeyBDZWxsTW9kZWwgfSBmcm9tIFwiLi9DZWxsTW9kZWxcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCBHYW1lTW9kZWwgZnJvbSBcIi4vR2FtZU1vZGVsXCI7XG5pbXBvcnQgSXRlbVVwZ3JvdW5kQ3RybCBmcm9tIFwiLi4vVmlldy9JdGVtVXBncm91bmRDdHJsXCI7XG5pbXBvcnQgeyBDb2xsZWN0VHlwZSB9IGZyb20gXCIuL0NvbGxlY3RNb2RlbFwiO1xuaW1wb3J0IE0gZnJvbSBcIi4uLy4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgeyBVcEdyb3VuZFR5cGUgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuLyoqICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcEdyb3VuZENlbGxNb2RlbCBleHRlbmRzIENlbGxCYXNlPFVwR3JvdW5kVHlwZSwgSXRlbVVwZ3JvdW5kQ3RybD4ge1xuXG4gICAgcHJpdmF0ZSBzcGVjaWFsczogQXJyYXk8U3BlY2lhbENlbGw+ID0gbnVsbDtcbiAgICAvKirpmpznoo3niaks5Y+v5Lul5raI6Zmk6YKj5LiA57G7ICovXG4gICAgcHJpdmF0ZSBpc09ic3RhY2xlczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2lzQm94OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfYm94VHlwZTogbnVtYmVyID0gbnVsbDtcbiAgICBwcml2YXRlIGlzRm9sbG93QmluZE5vZGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8vLTHkuLrlhaXlj6MgMeS4uuWHuuWPoyAw5Li65rKh5pyJXG4gICAgcHVibGljIHBvcnRhbElkeDogbnVtYmVyID0gMDtcblxuICAgIHB1YmxpYyBCaW5kQ2VsbDogQ2VsbE1vZGVsID0gbnVsbDtcblxuICAgIHB1YmxpYyBpc05vdjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoq5a6M5pW055qE5YWD57SgISDpgILnlKjkuo7nn7PlpLTnrYnlpoLmnpzmmK/lrozmlbTnirbmgIHpnIDopoHooqvngrjlvLnngrjng4IgKi9cbiAgICBwdWJsaWMgaXNJbnRhY3Q6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgcHVibGljIGlzRWxpbWF0ZWluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfZ3JvdXBJZDogbnVtYmVyID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmlzT2JzdGFjbGVzID0gZmFsc2U7XG4gICAgICAgIHRoaXMudHlwZSA9IFVwR3JvdW5kVHlwZS5Ob25lO1xuICAgICAgICB0aGlzLmN0cmxOYW1lID0gJ0l0ZW1VcGdyb3VuZEN0cmwnO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KGRhdGE6IEdyaWQsIHg/OiBudW1iZXIsIHk/OiBudW1iZXIsIGluZGV4PzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3BvcyA9IGNjLnYyKHgsIHkpO1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IFVwR3JvdW5kVHlwZS5Ob25lO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWFwSW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5zcGVjaWFscyA9IFtdO1xuICAgICAgICB0aGlzLkJpbmRDZWxsID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYm94VHlwZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2dyb3VwSWQgPSBudWxsO1xuICAgICAgICAvL+W+hemHjeaehFxuICAgICAgICAvKirlvJXlr7znlKjnmoTmsLTojYkgKi9cbiAgICAgICAgaWYgKGRhdGEubm92X2dyYXNzKSB7XG4gICAgICAgICAgICB0aGlzLmlzTm92ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3BlY2lhbHMucHVzaChuZXcgU3BlY2lhbENlbGwoVXBHcm91bmRUeXBlLk5vdl9ncmFzcywgZGF0YS5ub3ZfZ3Jhc3MpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKuW8leWvvOeUqOeahOeIhueCuOi0neWjsyAqL1xuICAgICAgICBpZiAoZGF0YS5ub3ZfY29uY2gpIHtcbiAgICAgICAgICAgIHRoaXMuaXNOb3YgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pc09ic3RhY2xlcyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNwZWNpYWxzLnB1c2gobmV3IFNwZWNpYWxDZWxsKFVwR3JvdW5kVHlwZS5Ob3ZfY29uY2gsIGRhdGEubm92X2NvbmNoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKirlhrDlnZcgKi9cbiAgICAgICAgaWYgKGRhdGEuaWNlKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWNpYWxzLnB1c2gobmV3IFNwZWNpYWxDZWxsKFVwR3JvdW5kVHlwZS5JY2UsIGRhdGEuaWNlKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKirplIHpk74gKi9cbiAgICAgICAgaWYgKGRhdGEubG9ja3MpIHtcblxuICAgICAgICAgICAgdGhpcy5zcGVjaWFscy5wdXNoKG5ldyBTcGVjaWFsQ2VsbChVcEdyb3VuZFR5cGUuTG9jaywgZGF0YS5sb2NrcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoq566x5a2QICovXG4gICAgICAgIGlmIChkYXRhLmJveF9sZXZlbCkge1xuICAgICAgICAgICAgdGhpcy5zcGVjaWFscy5wdXNoKG5ldyBTcGVjaWFsQ2VsbChVcEdyb3VuZFR5cGUuQm94LCBkYXRhLmJveF9sZXZlbCkpO1xuICAgICAgICAgICAgdGhpcy5pc09ic3RhY2xlcyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9pc0JveCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9ib3hUeXBlID0gKGRhdGEuYm94X3R5cGUgIT0gbnVsbCAmJiBkYXRhLmJveF90eXBlICE9IHVuZGVmaW5lZCkgPyBkYXRhLmJveF90eXBlIDogbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKuefs+WktCAqL1xuICAgICAgICBpZiAoZGF0YS5zdG9uZSkge1xuICAgICAgICAgICAgdGhpcy5zcGVjaWFscy5wdXNoKG5ldyBTcGVjaWFsQ2VsbChVcEdyb3VuZFR5cGUuU3RvbmUsIC8qZGF0YS5zdG9uZSovMikpO1xuICAgICAgICAgICAgdGhpcy5pc09ic3RhY2xlcyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKirkvJrplb/nmoTmu5UgPz8qL1xuICAgICAgICBpZiAoZGF0YS5pdnkpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEucG9ydGFsX2lkeCkge1xuICAgICAgICAgICAgdGhpcy5wb3J0YWxJZHggPSBkYXRhLnBvcnRhbF9pZHg7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJTcCA9IHRoaXMuZ2V0Q3VycmVudFNwZWNpYWwoKVxuICAgICAgICBpZiAoY3VyU3ApIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IGN1clNwLnR5cGU7XG4gICAgICAgICAgICB0aGlzLmx2ID0gY3VyU3AubHY7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc05vdikge1xuICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5pc05vdkx2ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBmb3JjZWRFbGltYXRlTm92KCkge1xuICAgICAgICB0aGlzLmlzTm92ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNPYnN0YWNsZXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0ZvbGxvd0JpbmROb2RlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3BlY2lhbHMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy50eXBlID0gVXBHcm91bmRUeXBlLk5vbmU7XG4gICAgICAgIHRoaXMuQmluZENlbGwub25Nc2coTXNnVHlwZS5Cb21iKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Tm92V2FyaW5nVGl0bGUoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgICBjb25zdCBjZmcgPSBNLnRhYmxlLlRpdGxlcy5nZXRCeVByaW1hcnlLZXkoTS5ydW50aW1lLmdldE1hdGNoM0xldmVsKCkpO1xuICAgICAgICBpZiAoY2ZnICYmIGNmZy5ub3ZDb250ZW50KSB7XG4gICAgICAgICAgICByZXN1bHQgPSBjZmcubm92Q29udGVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0NhbkZhbGwoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCByZXN1bHQgPSB0cnVlO1xuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBVcEdyb3VuZFR5cGUuTG9jazpcbiAgICAgICAgICAgIGNhc2UgVXBHcm91bmRUeXBlLkJveDpcbiAgICAgICAgICAgIGNhc2UgVXBHcm91bmRUeXBlLlN0b25lOlxuICAgICAgICAgICAgY2FzZSBVcEdyb3VuZFR5cGUuTm92X2dyYXNzOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIFVwR3JvdW5kVHlwZS5JY2U6XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBvbk1zZyh0eXBlOiBNc2dUeXBlLCBkYXRhPzogYW55KSB7XG4gICAgICAgIC8v5pyJ6KaG55uW54mpIFxuICAgICAgICB0aGlzLl9ncm91cElkID0gZGF0YSA/IGRhdGEuZ3JvdXBJZCA6IG51bGw7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBNc2dUeXBlLkVsaW1hdGU6XG4gICAgICAgICAgICAgICAgaWYgKFVwR3JvdW5kVHlwZS5TdG9uZSA9PSB0aGlzLnR5cGUgJiYgQ29tbW9uLmlzQm9tYlR5cGUoZGF0YS50eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICAvL+egtOeijuefs+WktCFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0ludGFjdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWNFbGltYXRlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE1zZ1R5cGUuQmVzaWRlRWxpbWF0ZTpcbiAgICAgICAgICAgICAgICB0aGlzLmJlc2lkZUVsaW1hdGUoZGF0YS5jZWxsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTXNnVHlwZS5FbGltYXRlQWxsOlxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY0VsaW1hdGVBbGwoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5L2N572u5Y+R55Sf5pS55Y+YXG4gICAgcHVibGljIG9uQ2hhbmdlUG9zKHBvczogY2MuVmVjMikge1xuICAgICAgICAvL+e9ruepuuS5i+WJjeeahOepuuS9jVxuICAgICAgICBDb21tb24uc2FmZVNldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuVXBHcm91bmRMaXN0LCB0aGlzLl9wb3MsIG51bGwpO1xuICAgICAgICAvL+mHjeiuvuW9k+WJjeeahOS9jee9ruWPpeafhFxuICAgICAgICBDb21tb24uc2FmZVNldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuVXBHcm91bmRMaXN0LCBwb3MsIHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblVuQmluZChwb3M6IGNjLlZlYzIpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBvbkJpbmQobW9kZWw6IENlbGxNb2RlbCkge1xuICAgICAgICB0aGlzLkJpbmRDZWxsID0gbW9kZWw7XG4gICAgICAgIHRoaXMuY2hhbmdlU3BlY2lhbFBsdWcoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYmVzaWRlRWxpbWF0ZShjZWxsOiBDZWxsTW9kZWwpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgVXBHcm91bmRUeXBlLkJveDpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0JveCAmJiAodGhpcy5ib3hUeXBlID09IG51bGwgfHwgIWNlbGwgfHwgKGNlbGwuZ2V0VHlwZSgpID09IHRoaXMuYm94VHlwZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhlY0VsaW1hdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgVXBHcm91bmRUeXBlLlN0b25lOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0ludGFjdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4ZWNFbGltYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9lbGltYXRlQ291bnQgPSAwO1xuICAgIHB1YmxpYyBleGVjRWxpbWF0ZUFsbCgpOiBudW1iZXIge1xuICAgICAgICB0aGlzLl9lbGltYXRlQ291bnQgPSAwO1xuICAgICAgICBpZiAodGhpcy5zcGVjaWFscyAmJiB0aGlzLnNwZWNpYWxzLmxlbmd0aCA+IDAgJiYgdGhpcy5sdiA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubHYgPSAwXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBVcEdyb3VuZFR5cGUuTm9uZTtcbiAgICAgICAgICAgIHRoaXMuc3BlY2lhbHMuZm9yRWFjaCgoc3BlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWxpbWF0ZUNvdW50ICs9IHNwZS5sdlxuICAgICAgICAgICAgICAgIGlmIChzcGUudHlwZSA9PSBVcEdyb3VuZFR5cGUuQm94KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29sbGVjdChVcEdyb3VuZFR5cGUuQm94KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2lzQm94ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNwZWNpYWxzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB0aGlzLmlzT2JzdGFjbGVzID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzRm9sbG93QmluZE5vZGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5T3ZlcihVcEdyb3VuZFR5cGUuQm94KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV4dEN0cmwucGxheUFuaW1hdGlvbih0aGlzLnR5cGUpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxpbWF0ZUNvdW50O1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlQ29sbGVjdCh0eXBlOiBVcEdyb3VuZFR5cGUpIHtcbiAgICAgICAgR2FtZU1vZGVsLmlucy51cGRhdGVDb2xsZWN0Q291bnQodGhpcy5nZXRDb2xsZWN0TmFtZSh0eXBlLCB0aGlzLl9ib3hUeXBlKSwgdGhpcy5wb3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgZXhlY0VsaW1hdGUoKSB7XG4gICAgICAgIC8v6L+Z6YeM5pyJ6aG65bqPIFxuICAgICAgICBpZiAodGhpcy50eXBlICE9IFVwR3JvdW5kVHlwZS5Ob25lICYmICF0aGlzLmlzRWxpbWF0ZWluZyAmJiAhdGhpcy5pc05vdikge1xuICAgICAgICAgICAgdGhpcy5pc0VsaW1hdGVpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmV4dEN0cmwucGxheUFuaW1hdGlvbih0aGlzLnR5cGUpO1xuXG4gICAgICAgICAgICAvL+etieW+heaSreaUvuWKqOeUu+WujOaIkOWQjuaJjeWOu+WBmuexu+Weiy/nrYnnuqfmk43kvZxcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0hhdmFTcGUpIHsgcmV0dXJuIH07XG5cbiAgICAgICAgICAgIHRoaXMubHYgPSB0aGlzLmdldEN1cnJlbnRTcGVjaWFsKCkuc2V0THYoLTEpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5sdiA8PSAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlzTmVlZENoZWNrRWxpbWF0ZTogYm9vbGVhbiA9IHRoaXMuX2NoZWNrTmVlZE92ZXJDaGVjaygpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gVXBHcm91bmRUeXBlLkJveCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0JveCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbGxlY3QobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc3BlY2lhbHMuc3BsaWNlKHRoaXMuc3BlY2lhbHMubGVuZ3RoIC0gMSwgMSk7XG4gICAgICAgICAgICAgICAgbGV0IHByZVR5cGUgPSB0aGlzLnR5cGU7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFNwID0gdGhpcy5nZXRDdXJyZW50U3BlY2lhbCgpXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRTcCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cGUgPSBjdXJyZW50U3AudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sdiA9IGN1cnJlbnRTcC5sdjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTcGVjaWFsUGx1ZygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZSA9IFVwR3JvdW5kVHlwZS5Ob25lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQ2hhbmdlT2JzKHByZVR5cGUpO1xuICAgICAgICAgICAgICAgIGlmIChpc05lZWRDaGVja0VsaW1hdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5jaGVja0hhdmFFbGltYXRlKHRoaXMucG9zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlzRWxpbWF0ZWluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2hlY2tOZWVkT3ZlckNoZWNrKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMudHlwZSA9PSBVcEdyb3VuZFR5cGUuQm94IHx8IHRoaXMudHlwZSA9PSBVcEdyb3VuZFR5cGUuU3RvbmUgfHwgdGhpcy50eXBlID09IFVwR3JvdW5kVHlwZS5JY2UpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDb2xsZWN0TmFtZSh0eXBlOiBVcEdyb3VuZFR5cGUgPSBudWxsLCBib3hUeXBlOiBudW1iZXIgPSBudWxsKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHJlc3VsdDogc3RyaW5nID0gbnVsbDtcbiAgICAgICAgdHlwZSA9IHR5cGUgfHwgdGhpcy50eXBlO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgVXBHcm91bmRUeXBlLkJveDpcbiAgICAgICAgICAgICAgICBpZiAoYm94VHlwZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IENvbGxlY3RUeXBlLmNvbG9yYm94XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gQ29sbGVjdFR5cGUuYm94O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVXBHcm91bmRUeXBlLlN0b25lOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IENvbGxlY3RUeXBlLnN0b25lO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoYW5nZVNwZWNpYWxQbHVnKCkge1xuICAgICAgICBpZiAodGhpcy50eXBlID09IFVwR3JvdW5kVHlwZS5JY2UpIHtcbiAgICAgICAgICAgIHRoaXMuaXNGb2xsb3dCaW5kTm9kZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGNoZWNrQ2hhbmdlT2JzKHByZVR5cGU6IFVwR3JvdW5kVHlwZSkge1xuICAgICAgICBpZiAodGhpcy5pc0hhdmFTcGUpIHtcbiAgICAgICAgICAgIGxldCBvYnMgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnNwZWNpYWxzLmxlbmd0aDsgaS0tOykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLnNwZWNpYWxzW2ldLnR5cGU7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gVXBHcm91bmRUeXBlLkJveCB8fCB0eXBlID09IFVwR3JvdW5kVHlwZS5TdG9uZSkge1xuICAgICAgICAgICAgICAgICAgICBvYnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlzT2JzdGFjbGVzID0gb2JzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc09ic3RhY2xlcyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc0ZvbGxvd0JpbmROb2RlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeU92ZXIocHJlVHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG5vdGlmeU92ZXIocHJlVHlwZSkge1xuICAgICAgICBjb25zdCBncm91bmQgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuR3JvdW5kTGlzdCwgdGhpcy5wb3MpO1xuICAgICAgICBncm91bmQgJiYgZ3JvdW5kLm9uTXNnKE1zZ1R5cGUuVXBHcm91bmREb25lLCBwcmVUeXBlKTtcbiAgICAgICAgdGhpcy5CaW5kQ2VsbCAmJiB0aGlzLkJpbmRDZWxsLm9uTXNnKE1zZ1R5cGUuVXBHcm91bmREb25lLCB0aGlzLl9ncm91cElkLyogcHJlVHlwZSA9PSBVcEdyb3VuZFR5cGUuQm94Ki8pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5zcGVjaWFscyA9IFtdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNGb2xsb3dOb2RlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0ZvbGxvd0JpbmROb2RlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgYm94VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JveFR5cGU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc0JveCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzQm94O1xuICAgIH1cblxuICAgIC8qKuaYr+WQpuaYr+S4jeS8muWPguS4jua2iOmZpOeahOmanOeijeeJqSAqL1xuICAgIHB1YmxpYyBnZXQgaXNPYnMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzT2JzdGFjbGVzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNIYXZhU3BlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMuc3BlY2lhbHMgJiYgdGhpcy5zcGVjaWFscy5sZW5ndGggPiAwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U3BlY2lhbHMoKTogQXJyYXk8U3BlY2lhbENlbGw+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BlY2lhbHM7XG4gICAgfVxuXG4gICAgLyoq6I635Y+W5pyA6aG25bGC55qE5aSa5Yqf6IO96YGT5YW3ICovXG4gICAgcHVibGljIGdldEN1cnJlbnRTcGVjaWFsKCk6IFNwZWNpYWxDZWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BlY2lhbHNbdGhpcy5zcGVjaWFscy5sZW5ndGggLSAxXTtcbiAgICB9XG59Il19