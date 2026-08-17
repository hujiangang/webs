"use strict";
cc._RF.push(module, '3cda9FkkthC8bFU0HOV3p4T', 'GroundCellModel');
// Script/Logic/Match3/Model/GroundCellModel.ts

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
var Common_1 = require("../../Common/Common");
var GameModel_1 = require("./GameModel");
var CollectModel_1 = require("./CollectModel");
var Conveyer_1 = require("./SpecialPlug/Conveyer");
var Constant_1 = require("../../Data/Const/Constant");
var Mushroom_1 = require("./SpecialPlug/Mushroom");
/** */
var GroundCellModel = /** @class */ (function (_super) {
    __extends(GroundCellModel, _super);
    function GroundCellModel(data, pos, index) {
        var _this = _super.call(this) || this;
        /**隔断 */
        _this.wall = null;
        /**强占不可生成元素 */
        _this._isHold = false;
        /**是否占有老头子部分 */
        _this._isGnome = false;
        /**是否是乌龟占有的部分 */
        _this._isTurtles = false;
        /**是否正在销毁中 */
        _this._isDestorying = false;
        /**-1为入口 1为出口 0为没有*/
        _this.portalIdx = 0;
        /**宝石的等级 */
        _this.gemLv = 0;
        _this.tuitujiCfg = null;
        _this.BindCell = null;
        _this.isGirlRoad = false;
        _this.isConveyer = false;
        _this.zIndex = 0;
        _this.mapIndex = index;
        _this._pos = pos;
        //初始处于不可动状态.如果有东西存在则重置此属性.
        _this._isHold = true;
        _this.BindCell = null;
        _this.type = Constant_1.GroundType.None;
        _this.ctrlName = 'ItemGroundCtrl';
        _this.init(data);
        return _this;
    }
    GroundCellModel.prototype.showGirlGround = function () {
        this.isGirlRoad = true;
    };
    GroundCellModel.prototype.onUnBind = function (pos) {
        this.BindCell && this.BindCell.unBindGround(this);
    };
    GroundCellModel.prototype.onBind = function (model) {
        this.BindCell = model;
    };
    GroundCellModel.prototype.init = function (data) {
        if (!data) {
            this.type = null;
            return;
        }
        this._isHold = false;
        this._isGnome = false;
        this._isTurtles = false;
        this._isDestorying = false;
        this.zIndex = 0;
        this.data = data;
        /**树叶 */
        if (data.leaves) {
            this.type = Constant_1.GroundType.Leaves;
            this.lv = data.leaves;
        }
        /**是否是不可移动的水 , 同时需要检测是否有传送荷叶!*/
        if (data.water) {
            this.type = Constant_1.GroundType.Water;
            this._isHold = true;
            var plug = GameModel_1.default.ins.getPlug(Conveyer_1.default);
            if (plug && plug.checkIsConveyerItemForPos(this.pos)) {
                this.isConveyer = true;
                this._isHold = false;
            }
        }
        // if (data.ground) {
        //     this.gemLv = data.gem || 0;
        //     this._isHold = true;
        //     this.lv = data.ground;
        //     this.type = GroundType.Ground;
        // }
        /**wall */
        this.setWall(data);
        if (data.flowers) {
            this._isHold = true;
            this.lv = data.flowers;
            GameModel_1.default.ins.HaveFlowers = true;
            this.type = Constant_1.GroundType.Flower;
        }
        /**萤火虫 */
        if (data.firefly) {
            this._isHold = true;
            this.lv = data.firefly;
            this.type = Constant_1.GroundType.Firefly;
        }
        /**会长的滕 */
        if (data.ivy) {
            this.type = Constant_1.GroundType.Ivy;
            this.lv = data.ivy;
            this._isHold = true;
        }
        /**蘑菇 */
        if (data.mushroom) {
            this.type = Constant_1.GroundType.Mushroom;
            this.lv = data.mushroom;
            this._isHold = true;
            var mrPlug = GameModel_1.default.ins.getPlug(Mushroom_1.default);
            if (!mrPlug) {
                mrPlug = GameModel_1.default.ins.mountPlug(Mushroom_1.default);
            }
            ;
            mrPlug.add(this.pos, this);
        }
        if (data.portal_idx) {
            this.portalIdx = data.portal_idx;
        }
        if (this.isPassable) {
            // this.type = null;
        }
    };
    GroundCellModel.prototype.initMonkeyTreePos = function () {
        this.type = Constant_1.GroundType.MoneyTree;
        this.accountForPos();
    };
    GroundCellModel.prototype.initCrab = function (index) {
        this.type = Constant_1.GroundType.Crab;
        this.zIndex = index;
        this.accountForPos();
    };
    GroundCellModel.prototype.initTurtles = function (topPoint) {
        this.type = Constant_1.GroundType.Ivy;
        this.lv = 2;
        this.zIndex = 0;
        this._isTurtles = true;
        this.accountForPos();
        if (this._pos.y == topPoint.y) {
            this.zIndex = -1;
        }
    };
    GroundCellModel.prototype.change2TargetType = function (type, cfg) {
        this.type = type;
        if (Constant_1.GroundType.Tuituji || Constant_1.GroundType.Firefly || Constant_1.GroundType.Flower) {
            this.BindCell && this.BindCell.change2Cell(Constant_1.CellType.Empty);
            this.accountForPos();
        }
        if (cfg) {
            switch (type) {
                case Constant_1.GroundType.Flower:
                case Constant_1.GroundType.Firefly:
                    if (cfg && typeof cfg.lv == 'number') {
                        this.lv = cfg.lv;
                    }
                    break;
                case Constant_1.GroundType.Tuituji:
                    this.tuitujiCfg = cfg;
                    break;
            }
        }
    };
    GroundCellModel.prototype.accountForPos = function () {
        this._isHold = true;
    };
    GroundCellModel.prototype.freeThisPos = function () {
        this._isHold = false;
    };
    GroundCellModel.prototype.onMsg = function (type, data) {
        var eliamteType = data ? data.type : null;
        switch (type) {
            case CellBase_1.MsgType.Elimate:
                this.execElimate(eliamteType);
                break;
            case CellBase_1.MsgType.BesideElimate:
                if (this.type == Constant_1.GroundType.Firefly || this.type == Constant_1.GroundType.Ivy || this.type == Constant_1.GroundType.Flower || this.type == Constant_1.GroundType.Mushroom) {
                    this.execElimate(eliamteType);
                }
                break;
            case CellBase_1.MsgType.UpGroundDone:
                this.checkCoverItem();
                break;
        }
    };
    GroundCellModel.prototype.execElimateAll = function () {
        if (this.getType() != null) {
            this._updateCollectItemCount();
            this.cleanGround(true);
        }
    };
    //位置发生改变
    GroundCellModel.prototype.onChangePos = function (pos) {
        Common_1.default.safeSet2ArrayValue(GameModel_1.default.ins.GroundList, pos, this);
    };
    Object.defineProperty(GroundCellModel.prototype, "Wall", {
        get: function () {
            return this.wall;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GroundCellModel.prototype, "isGem", {
        get: function () {
            return this.gemLv > 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GroundCellModel.prototype, "isBorn", {
        /**是否是出生元素点 */
        get: function () {
            return this.data ? this.data.born : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GroundCellModel.prototype, "isExit", {
        /**是否下落点 */
        get: function () {
            return this.data ? this.data.exit : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GroundCellModel.prototype, "isPassable", {
        /**障碍物地块是否可以通过 */
        get: function () {
            return this.data ? this.data.passable : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GroundCellModel.prototype, "isCanCreateCell", {
        get: function () {
            var result = !this._isHold;
            if (this.type == Constant_1.GroundType.Flower ||
                this.type == Constant_1.GroundType.Ivy ||
                this.type == Constant_1.GroundType.Firefly ||
                this.type == Constant_1.GroundType.Mushroom
            /*|| this.type == GroundType.Ground*/ ) {
                result = true;
            }
            return result;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GroundCellModel.prototype, "isHold", {
        get: function () {
            return this._isHold;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GroundCellModel.prototype, "isGnome", {
        get: function () {
            return this._isGnome;
        },
        set: function (opt) {
            this._isGnome = opt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GroundCellModel.prototype, "isTurtles", {
        get: function () {
            return this._isTurtles;
        },
        enumerable: false,
        configurable: true
    });
    GroundCellModel.prototype.isPortalOut = function () {
        if (this.portalIdx > 0) {
            return this.portalIdx;
        }
        return 0;
    };
    GroundCellModel.prototype.isPortalIn = function () {
        if (this.portalIdx < 0) {
            return this.portalIdx;
        }
        return 0;
    };
    /**
     * 检测该方向是否有墙存在
     * @param dir  left, right, top, bottom
     */
    GroundCellModel.prototype.checkWall = function (dir) {
        var result = false;
        if (this.wall && this.wall[dir] != undefined) {
            result = true;
        }
        return result;
    };
    GroundCellModel.prototype.cleanGround = function (isPlayAnimation) {
        if (isPlayAnimation === void 0) { isPlayAnimation = false; }
        if (this.type != Constant_1.GroundType.None && this.type != Constant_1.GroundType.Water) {
            this.type = Constant_1.GroundType.None;
            this.lv = 0;
            this._isHold = false;
            isPlayAnimation && this.extCtrl.playAnimation();
        }
    };
    GroundCellModel.prototype.setWall = function (data) {
        var dirDatas = { left: 90, right: -90, top: 0, bottom: 180 };
        for (var key in dirDatas) {
            if (data["wall_" + key]) {
                if (!this.wall)
                    this.wall = {};
                this.wall[key] = dirDatas[key];
            }
        }
    };
    GroundCellModel.prototype.lvOverTrigger = function (type) {
        switch (this.type) {
            case Constant_1.GroundType.Firefly:
                this.cleanGround();
                var groupId = GameModel_1.default.ins.seq.next();
                if (this.isBorn) {
                    GameModel_1.default.ins.checkNeedCreateNewCell(this.pos, groupId);
                }
                else {
                    GameModel_1.default.ins.testFindCanFallCell(this.pos, groupId);
                }
                break;
            case Constant_1.GroundType.Mushroom:
                GameModel_1.default.ins.getPlug(Mushroom_1.default).del(this.pos);
                break;
            // case GroundType.Ground:
            //     if (this.gemLv > 0) {
            //         GameModel.ins.updateCollectCount(CollectType.gem, this.getPosition(), type, this.gemLv);
            //     }
            //     this.cleanGround();
            //     GameModel.ins.testFindCanFallCell(this.pos);
            //     M.event.send(Event.GameCMD.UpdateComplexView, this.pos);
            //     break;
        }
    };
    GroundCellModel.prototype.checkCoverItem = function () {
        var mg = GameModel_1.default.ins.getMgModel();
        if (this.getType() == Constant_1.GroundType.Crab) {
            var type = CollectModel_1.CollectType.crab;
            var idx = mg.updateItemCountByPos(type, this.pos);
            if (mg.checkItemOver(type, idx)) {
                GameModel_1.default.ins.updateCollectCount(type, idx);
            }
        }
    };
    /**如果消除的地有人头,则返回人头下标 */
    GroundCellModel.prototype.execElimate = function (eType) {
        if (eType === void 0) { eType = Constant_1.ElimateType.Default; }
        return __awaiter(this, void 0, void 0, function () {
            var idx, type;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idx = null;
                        type = null;
                        if (!(this.getType() >= Constant_1.GroundType.Leaves && this.lv > 0 && !this._isDestorying)) return [3 /*break*/, 2];
                        this._isDestorying = true;
                        //前摇
                        return [4 /*yield*/, this.extCtrl.playAnimation()];
                    case 1:
                        //前摇
                        _a.sent();
                        this._isDestorying = false;
                        this.setLv(-1);
                        if (this.type == Constant_1.GroundType.Firefly) {
                            GameModel_1.default.ins.updateCollectCount(CollectModel_1.CollectType.firefly, this.getPosition());
                        }
                        if (this.lv == 0) {
                            this.extCtrl.cleanOtherDisplay();
                            this.lvOverTrigger(eType);
                        }
                        _a.label = 2;
                    case 2:
                        this._updateCollectItemCount();
                        return [2 /*return*/];
                }
            });
        });
    };
    GroundCellModel.prototype._updateCollectItemCount = function () {
        var _a;
        var _this = this;
        var types = [CollectModel_1.CollectType.turtles, CollectModel_1.CollectType.gnome];
        var opt = (_a = {}, _a[CollectModel_1.CollectType.turtles] = this.isTurtles, _a[CollectModel_1.CollectType.gnome] = this.isGnome, _a);
        types.forEach(function (type) {
            var idx = null;
            var mg = GameModel_1.default.ins.getMgModel();
            if (opt[type] && _this.lv <= 0) {
                idx = mg.updateItemCountByPos(type, _this.pos);
            }
            if (mg.checkItemOver(type, idx)) {
                GameModel_1.default.ins.updateCollectCount(type, idx);
            }
        });
    };
    return GroundCellModel;
}(CellBase_1.CellBase));
exports.default = GroundCellModel;

cc._RF.pop();