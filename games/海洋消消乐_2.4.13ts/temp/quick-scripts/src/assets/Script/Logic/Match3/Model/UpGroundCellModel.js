"use strict";
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