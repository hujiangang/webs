
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/GroundCellModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcR3JvdW5kQ2VsbE1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUErQztBQUUvQyw4Q0FBeUM7QUFDekMseUNBQW9DO0FBRXBDLCtDQUE2QztBQUM3QyxtREFBOEM7QUFDOUMsc0RBQThFO0FBQzlFLG1EQUE4QztBQUU5QyxNQUFNO0FBQ047SUFBNkMsbUNBQW9DO0lBMkI3RSx5QkFBWSxJQUFTLEVBQUUsR0FBWSxFQUFFLEtBQWE7UUFBbEQsWUFDSSxpQkFBTyxTQVNWO1FBbkNELFFBQVE7UUFDQSxVQUFJLEdBQWlFLElBQUksQ0FBQztRQUNsRixjQUFjO1FBQ04sYUFBTyxHQUFZLEtBQUssQ0FBQztRQUNqQyxlQUFlO1FBQ1AsY0FBUSxHQUFZLEtBQUssQ0FBQztRQUNsQyxnQkFBZ0I7UUFDUixnQkFBVSxHQUFZLEtBQUssQ0FBQztRQUNwQyxhQUFhO1FBQ0wsbUJBQWEsR0FBWSxLQUFLLENBQUM7UUFDdkMsb0JBQW9CO1FBQ2IsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUM3QixXQUFXO1FBQ0osV0FBSyxHQUFXLENBQUMsQ0FBQztRQUVsQixnQkFBVSxHQUFlLElBQUksQ0FBQztRQUU5QixjQUFRLEdBQWMsSUFBSSxDQUFDO1FBRTNCLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBRzVCLFlBQU0sR0FBVyxDQUFDLENBQUM7UUFJdEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsS0FBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDaEIsMEJBQTBCO1FBQzFCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFD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QUMsVUFBQSxJQUFJO1lBQ2QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ2YsSUFBTSxFQUFFLEdBQUcsbUJBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDdEMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQzNCLEdBQUcsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNqRDtZQUNELElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQzdCLG1CQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzthQUMvQztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVMLHNCQUFDO0FBQUQsQ0FsWUEsQUFrWUMsQ0FsWTRDLG1CQUFRLEdBa1lwRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdyaWQsIElMYXdubW93ZXIgfSBmcm9tIFwiLi4vLi4vRGF0YS9JbnRlcmZhY2UvTGV2ZWwvSUxldmVsXCI7XG5pbXBvcnQgeyBDZWxsQmFzZSwgTXNnVHlwZSB9IGZyb20gXCIuL0NlbGxCYXNlXCI7XG5pbXBvcnQgeyBDZWxsTW9kZWwgfSBmcm9tIFwiLi9DZWxsTW9kZWxcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCBHYW1lTW9kZWwgZnJvbSBcIi4vR2FtZU1vZGVsXCI7XG5pbXBvcnQgSXRlbUdyb3VuZEN0cmwgZnJvbSBcIi4uL1ZpZXcvSXRlbUdyb3VuZEN0cmxcIjtcbmltcG9ydCB7IENvbGxlY3RUeXBlIH0gZnJvbSBcIi4vQ29sbGVjdE1vZGVsXCI7XG5pbXBvcnQgQ29udmV5ZXIgZnJvbSBcIi4vU3BlY2lhbFBsdWcvQ29udmV5ZXJcIjtcbmltcG9ydCB7IEVsaW1hdGVUeXBlLCBHcm91bmRUeXBlLCBDZWxsVHlwZSB9IGZyb20gJy4uLy4uL0RhdGEvQ29uc3QvQ29uc3RhbnQnO1xuaW1wb3J0IE11c2hyb29tIGZyb20gXCIuL1NwZWNpYWxQbHVnL011c2hyb29tXCI7XG5cbi8qKiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdW5kQ2VsbE1vZGVsIGV4dGVuZHMgQ2VsbEJhc2U8R3JvdW5kVHlwZSwgSXRlbUdyb3VuZEN0cmw+IHtcblxuICAgIC8qKumalOaWrSAqL1xuICAgIHByaXZhdGUgd2FsbDogeyBsZWZ0OiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIHRvcDogbnVtYmVyLCBib3R0b206IG51bWJlciB9ID0gbnVsbDtcbiAgICAvKirlvLrljaDkuI3lj6/nlJ/miJDlhYPntKAgKi9cbiAgICBwcml2YXRlIF9pc0hvbGQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKirmmK/lkKbljaDmnInogIHlpLTlrZDpg6jliIYgKi9cbiAgICBwcml2YXRlIF9pc0dub21lOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoq5piv5ZCm5piv5LmM6b6f5Y2g5pyJ55qE6YOo5YiGICovXG4gICAgcHJpdmF0ZSBfaXNUdXJ0bGVzOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoq5piv5ZCm5q2j5Zyo6ZSA5q+B5LitICovXG4gICAgcHJpdmF0ZSBfaXNEZXN0b3J5aW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqLTHkuLrlhaXlj6MgMeS4uuWHuuWPoyAw5Li65rKh5pyJKi9cbiAgICBwdWJsaWMgcG9ydGFsSWR4OiBudW1iZXIgPSAwO1xuICAgIC8qKuWuneefs+eahOetiee6pyAqL1xuICAgIHB1YmxpYyBnZW1MdjogbnVtYmVyID0gMDtcblxuICAgIHB1YmxpYyB0dWl0dWppQ2ZnOiBJTGF3bm1vd2VyID0gbnVsbDtcblxuICAgIHB1YmxpYyBCaW5kQ2VsbDogQ2VsbE1vZGVsID0gbnVsbDtcblxuICAgIHB1YmxpYyBpc0dpcmxSb2FkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGlzQ29udmV5ZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgcHVibGljIHpJbmRleDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IGFueSwgcG9zOiBjYy5WZWMyLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubWFwSW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5fcG9zID0gcG9zO1xuICAgICAgICAvL+WIneWni+WkhOS6juS4jeWPr+WKqOeKtuaAgS7lpoLmnpzmnInkuJzopb/lrZjlnKjliJnph43nva7mraTlsZ7mgKcuXG4gICAgICAgIHRoaXMuX2lzSG9sZCA9IHRydWU7XG4gICAgICAgIHRoaXMuQmluZENlbGwgPSBudWxsO1xuICAgICAgICB0aGlzLnR5cGUgPSBHcm91bmRUeXBlLk5vbmU7XG4gICAgICAgIHRoaXMuY3RybE5hbWUgPSAnSXRlbUdyb3VuZEN0cmwnO1xuICAgICAgICB0aGlzLmluaXQoZGF0YSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dHaXJsR3JvdW5kKCkge1xuICAgICAgICB0aGlzLmlzR2lybFJvYWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblVuQmluZChwb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgdGhpcy5CaW5kQ2VsbCAmJiB0aGlzLkJpbmRDZWxsLnVuQmluZEdyb3VuZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25CaW5kKG1vZGVsOiBDZWxsTW9kZWwpIHtcbiAgICAgICAgdGhpcy5CaW5kQ2VsbCA9IG1vZGVsO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KGRhdGE6IEdyaWQpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzSG9sZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc0dub21lID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzVHVydGxlcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc0Rlc3RvcnlpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy56SW5kZXggPSAwO1xuXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICAgICAgLyoq5qCR5Y+2ICovXG4gICAgICAgIGlmIChkYXRhLmxlYXZlcykge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gR3JvdW5kVHlwZS5MZWF2ZXM7XG4gICAgICAgICAgICB0aGlzLmx2ID0gZGF0YS5sZWF2ZXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKirmmK/lkKbmmK/kuI3lj6/np7vliqjnmoTmsLQgLCDlkIzml7bpnIDopoHmo4DmtYvmmK/lkKbmnInkvKDpgIHojbflj7YhKi9cbiAgICAgICAgaWYgKGRhdGEud2F0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IEdyb3VuZFR5cGUuV2F0ZXI7XG4gICAgICAgICAgICB0aGlzLl9pc0hvbGQgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgcGx1ZyA9IEdhbWVNb2RlbC5pbnMuZ2V0UGx1ZyhDb252ZXllcik7XG4gICAgICAgICAgICBpZiAocGx1ZyAmJiBwbHVnLmNoZWNrSXNDb252ZXllckl0ZW1Gb3JQb3ModGhpcy5wb3MpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0NvbnZleWVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0hvbGQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIChkYXRhLmdyb3VuZCkge1xuICAgICAgICAvLyAgICAgdGhpcy5nZW1MdiA9IGRhdGEuZ2VtIHx8IDA7XG4gICAgICAgIC8vICAgICB0aGlzLl9pc0hvbGQgPSB0cnVlO1xuICAgICAgICAvLyAgICAgdGhpcy5sdiA9IGRhdGEuZ3JvdW5kO1xuICAgICAgICAvLyAgICAgdGhpcy50eXBlID0gR3JvdW5kVHlwZS5Hcm91bmQ7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvKip3YWxsICovXG4gICAgICAgIHRoaXMuc2V0V2FsbChkYXRhKTtcblxuICAgICAgICBpZiAoZGF0YS5mbG93ZXJzKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0hvbGQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sdiA9IGRhdGEuZmxvd2VycztcbiAgICAgICAgICAgIEdhbWVNb2RlbC5pbnMuSGF2ZUZsb3dlcnMgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy50eXBlID0gR3JvdW5kVHlwZS5GbG93ZXI7XG4gICAgICAgIH1cbiAgICAgICAgLyoq6JCk54Gr6JmrICovXG4gICAgICAgIGlmIChkYXRhLmZpcmVmbHkpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzSG9sZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmx2ID0gZGF0YS5maXJlZmx5O1xuICAgICAgICAgICAgdGhpcy50eXBlID0gR3JvdW5kVHlwZS5GaXJlZmx5O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoq5Lya6ZW/55qE5ruVICovXG4gICAgICAgIGlmIChkYXRhLml2eSkge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gR3JvdW5kVHlwZS5Jdnk7XG4gICAgICAgICAgICB0aGlzLmx2ID0gZGF0YS5pdnk7XG4gICAgICAgICAgICB0aGlzLl9pc0hvbGQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoq6JiR6I+HICovXG4gICAgICAgIGlmIChkYXRhLm11c2hyb29tKSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBHcm91bmRUeXBlLk11c2hyb29tO1xuICAgICAgICAgICAgdGhpcy5sdiA9IGRhdGEubXVzaHJvb207XG4gICAgICAgICAgICB0aGlzLl9pc0hvbGQgPSB0cnVlO1xuXG4gICAgICAgICAgICBsZXQgbXJQbHVnID0gR2FtZU1vZGVsLmlucy5nZXRQbHVnKE11c2hyb29tKTtcbiAgICAgICAgICAgIGlmICghbXJQbHVnKSB7XG4gICAgICAgICAgICAgICAgbXJQbHVnID0gR2FtZU1vZGVsLmlucy5tb3VudFBsdWcoTXVzaHJvb20pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG1yUGx1Zy5hZGQodGhpcy5wb3MsIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEucG9ydGFsX2lkeCkge1xuICAgICAgICAgICAgdGhpcy5wb3J0YWxJZHggPSBkYXRhLnBvcnRhbF9pZHg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1Bhc3NhYmxlKSB7XG4gICAgICAgICAgICAvLyB0aGlzLnR5cGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRNb25rZXlUcmVlUG9zKCkge1xuICAgICAgICB0aGlzLnR5cGUgPSBHcm91bmRUeXBlLk1vbmV5VHJlZTtcbiAgICAgICAgdGhpcy5hY2NvdW50Rm9yUG9zKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRDcmFiKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy50eXBlID0gR3JvdW5kVHlwZS5DcmFiO1xuICAgICAgICB0aGlzLnpJbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLmFjY291bnRGb3JQb3MoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdFR1cnRsZXModG9wUG9pbnQ6IGNjLlZlYzIpIHtcbiAgICAgICAgdGhpcy50eXBlID0gR3JvdW5kVHlwZS5Jdnk7XG4gICAgICAgIHRoaXMubHYgPSAyO1xuICAgICAgICB0aGlzLnpJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX2lzVHVydGxlcyA9IHRydWU7XG4gICAgICAgIHRoaXMuYWNjb3VudEZvclBvcygpO1xuXG4gICAgICAgIGlmICh0aGlzLl9wb3MueSA9PSB0b3BQb2ludC55KSB7XG4gICAgICAgICAgICB0aGlzLnpJbmRleCA9IC0xO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNoYW5nZTJUYXJnZXRUeXBlKHR5cGU6IEdyb3VuZFR5cGUsIGNmZzogYW55KSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIGlmIChHcm91bmRUeXBlLlR1aXR1amkgfHwgR3JvdW5kVHlwZS5GaXJlZmx5IHx8IEdyb3VuZFR5cGUuRmxvd2VyKSB7XG4gICAgICAgICAgICB0aGlzLkJpbmRDZWxsICYmIHRoaXMuQmluZENlbGwuY2hhbmdlMkNlbGwoQ2VsbFR5cGUuRW1wdHkpO1xuICAgICAgICAgICAgdGhpcy5hY2NvdW50Rm9yUG9zKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNmZykge1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBHcm91bmRUeXBlLkZsb3dlcjpcbiAgICAgICAgICAgICAgICBjYXNlIEdyb3VuZFR5cGUuRmlyZWZseTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNmZyAmJiB0eXBlb2YgY2ZnLmx2ID09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmx2ID0gY2ZnLmx2O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgR3JvdW5kVHlwZS5UdWl0dWppOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnR1aXR1amlDZmcgPSBjZmc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFjY291bnRGb3JQb3MoKSB7XG4gICAgICAgIHRoaXMuX2lzSG9sZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIGZyZWVUaGlzUG9zKCkge1xuICAgICAgICB0aGlzLl9pc0hvbGQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25Nc2codHlwZTogTXNnVHlwZSwgZGF0YT86IGFueSkge1xuICAgICAgICBjb25zdCBlbGlhbXRlVHlwZSA9IGRhdGEgPyBkYXRhLnR5cGUgOiBudWxsO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBNc2dUeXBlLkVsaW1hdGU6XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjRWxpbWF0ZShlbGlhbXRlVHlwZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE1zZ1R5cGUuQmVzaWRlRWxpbWF0ZTpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09IEdyb3VuZFR5cGUuRmlyZWZseSB8fCB0aGlzLnR5cGUgPT0gR3JvdW5kVHlwZS5JdnkgfHwgdGhpcy50eXBlID09IEdyb3VuZFR5cGUuRmxvd2VyIHx8IHRoaXMudHlwZSA9PSBHcm91bmRUeXBlLk11c2hyb29tKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhlY0VsaW1hdGUoZWxpYW10ZVR5cGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTXNnVHlwZS5VcEdyb3VuZERvbmU6XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0NvdmVySXRlbSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZXhlY0VsaW1hdGVBbGwoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldFR5cGUoKSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDb2xsZWN0SXRlbUNvdW50KCk7XG4gICAgICAgICAgICB0aGlzLmNsZWFuR3JvdW5kKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/kvY3nva7lj5HnlJ/mlLnlj5hcbiAgICBwdWJsaWMgb25DaGFuZ2VQb3MocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIENvbW1vbi5zYWZlU2V0MkFycmF5VmFsdWUoR2FtZU1vZGVsLmlucy5Hcm91bmRMaXN0LCBwb3MsIHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgV2FsbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2FsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzR2VtKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZW1MdiA+IDA7XG4gICAgfVxuXG4gICAgLyoq5piv5ZCm5piv5Ye655Sf5YWD57Sg54K5ICovXG4gICAgcHVibGljIGdldCBpc0Jvcm4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEgPyB0aGlzLmRhdGEuYm9ybiA6IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKuaYr+WQpuS4i+iQveeCuSAqL1xuICAgIHB1YmxpYyBnZXQgaXNFeGl0KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhID8gdGhpcy5kYXRhLmV4aXQgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKirpmpznoo3nianlnLDlnZfmmK/lkKblj6/ku6XpgJrov4cgKi9cbiAgICBwdWJsaWMgZ2V0IGlzUGFzc2FibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEgPyB0aGlzLmRhdGEucGFzc2FibGUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzQ2FuQ3JlYXRlQ2VsbCgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9ICF0aGlzLl9pc0hvbGQ7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gR3JvdW5kVHlwZS5GbG93ZXIgfHxcbiAgICAgICAgICAgIHRoaXMudHlwZSA9PSBHcm91bmRUeXBlLkl2eSB8fFxuICAgICAgICAgICAgdGhpcy50eXBlID09IEdyb3VuZFR5cGUuRmlyZWZseSB8fFxuICAgICAgICAgICAgdGhpcy50eXBlID09IEdyb3VuZFR5cGUuTXVzaHJvb21cbiAgICAgICAgICAgIC8qfHwgdGhpcy50eXBlID09IEdyb3VuZFR5cGUuR3JvdW5kKi8pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGlzSG9sZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzSG9sZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGlzR25vbWUob3B0OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2lzR25vbWUgPSBvcHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc1R1cnRsZXMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1R1cnRsZXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc0dub21lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNHbm9tZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNQb3J0YWxPdXQoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMucG9ydGFsSWR4ID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9ydGFsSWR4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1BvcnRhbEluKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLnBvcnRhbElkeCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBvcnRhbElkeDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmo4DmtYvor6XmlrnlkJHmmK/lkKbmnInlopnlrZjlnKhcbiAgICAgKiBAcGFyYW0gZGlyICBsZWZ0LCByaWdodCwgdG9wLCBib3R0b21cbiAgICAgKi9cbiAgICBwdWJsaWMgY2hlY2tXYWxsKGRpcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMud2FsbCAmJiB0aGlzLndhbGxbZGlyXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYW5Hcm91bmQoaXNQbGF5QW5pbWF0aW9uOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPSBHcm91bmRUeXBlLk5vbmUgJiYgdGhpcy50eXBlICE9IEdyb3VuZFR5cGUuV2F0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IEdyb3VuZFR5cGUuTm9uZTtcbiAgICAgICAgICAgIHRoaXMubHYgPSAwO1xuICAgICAgICAgICAgdGhpcy5faXNIb2xkID0gZmFsc2U7XG4gICAgICAgICAgICBpc1BsYXlBbmltYXRpb24gJiYgdGhpcy5leHRDdHJsLnBsYXlBbmltYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0V2FsbChkYXRhOiBHcmlkKSB7XG4gICAgICAgIGNvbnN0IGRpckRhdGFzID0geyBsZWZ0OiA5MCwgcmlnaHQ6IC05MCwgdG9wOiAwLCBib3R0b206IDE4MCB9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkaXJEYXRhcykge1xuICAgICAgICAgICAgaWYgKGRhdGFbYHdhbGxfJHtrZXl9YF0pIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMud2FsbCkgdGhpcy53YWxsID0gPGFueT57fTtcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxba2V5XSA9IGRpckRhdGFzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGx2T3ZlclRyaWdnZXIodHlwZTogRWxpbWF0ZVR5cGUpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgR3JvdW5kVHlwZS5GaXJlZmx5OlxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYW5Hcm91bmQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cElkID0gR2FtZU1vZGVsLmlucy5zZXEubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQm9ybikge1xuICAgICAgICAgICAgICAgICAgICBHYW1lTW9kZWwuaW5zLmNoZWNrTmVlZENyZWF0ZU5ld0NlbGwodGhpcy5wb3MsIGdyb3VwSWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEdhbWVNb2RlbC5pbnMudGVzdEZpbmRDYW5GYWxsQ2VsbCh0aGlzLnBvcywgZ3JvdXBJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIEdyb3VuZFR5cGUuTXVzaHJvb206XG4gICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5nZXRQbHVnKE11c2hyb29tKS5kZWwodGhpcy5wb3MpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBjYXNlIEdyb3VuZFR5cGUuR3JvdW5kOlxuICAgICAgICAgICAgLy8gICAgIGlmICh0aGlzLmdlbUx2ID4gMCkge1xuICAgICAgICAgICAgLy8gICAgICAgICBHYW1lTW9kZWwuaW5zLnVwZGF0ZUNvbGxlY3RDb3VudChDb2xsZWN0VHlwZS5nZW0sIHRoaXMuZ2V0UG9zaXRpb24oKSwgdHlwZSwgdGhpcy5nZW1Mdik7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gICAgIHRoaXMuY2xlYW5Hcm91bmQoKTtcbiAgICAgICAgICAgIC8vICAgICBHYW1lTW9kZWwuaW5zLnRlc3RGaW5kQ2FuRmFsbENlbGwodGhpcy5wb3MpO1xuICAgICAgICAgICAgLy8gICAgIE0uZXZlbnQuc2VuZChFdmVudC5HYW1lQ01ELlVwZGF0ZUNvbXBsZXhWaWV3LCB0aGlzLnBvcyk7XG4gICAgICAgICAgICAvLyAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrQ292ZXJJdGVtKCkge1xuICAgICAgICBjb25zdCBtZyA9IEdhbWVNb2RlbC5pbnMuZ2V0TWdNb2RlbCgpO1xuICAgICAgICBpZiAodGhpcy5nZXRUeXBlKCkgPT0gR3JvdW5kVHlwZS5DcmFiKSB7XG4gICAgICAgICAgICBjb25zdCB0eXBlID0gQ29sbGVjdFR5cGUuY3JhYjtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IG1nLnVwZGF0ZUl0ZW1Db3VudEJ5UG9zKHR5cGUsIHRoaXMucG9zKSBhcyBhbnk7XG4gICAgICAgICAgICBpZiAobWcuY2hlY2tJdGVtT3Zlcih0eXBlLCBpZHgpKSB7XG4gICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy51cGRhdGVDb2xsZWN0Q291bnQodHlwZSwgaWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuWmguaenOa2iOmZpOeahOWcsOacieS6uuWktCzliJnov5Tlm57kurrlpLTkuIvmoIcgKi9cbiAgICBwcml2YXRlIGFzeW5jIGV4ZWNFbGltYXRlKGVUeXBlOiBFbGltYXRlVHlwZSA9IEVsaW1hdGVUeXBlLkRlZmF1bHQpIHtcbiAgICAgICAgbGV0IGlkeCA9IG51bGw7XG4gICAgICAgIGxldCB0eXBlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuZ2V0VHlwZSgpID49IEdyb3VuZFR5cGUuTGVhdmVzICYmIHRoaXMubHYgPiAwICYmICF0aGlzLl9pc0Rlc3RvcnlpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzRGVzdG9yeWluZyA9IHRydWU7XG4gICAgICAgICAgICAvL+WJjeaRh1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5leHRDdHJsLnBsYXlBbmltYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuX2lzRGVzdG9yeWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zZXRMdigtMSk7XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09IEdyb3VuZFR5cGUuRmlyZWZseSkge1xuICAgICAgICAgICAgICAgIEdhbWVNb2RlbC5pbnMudXBkYXRlQ29sbGVjdENvdW50KENvbGxlY3RUeXBlLmZpcmVmbHksIHRoaXMuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5sdiA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHRDdHJsLmNsZWFuT3RoZXJEaXNwbGF5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sdk92ZXJUcmlnZ2VyKGVUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVDb2xsZWN0SXRlbUNvdW50KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlQ29sbGVjdEl0ZW1Db3VudCgpIHtcbiAgICAgICAgY29uc3QgdHlwZXMgPSBbQ29sbGVjdFR5cGUudHVydGxlcywgQ29sbGVjdFR5cGUuZ25vbWVdO1xuICAgICAgICBjb25zdCBvcHQgPSB7IFtDb2xsZWN0VHlwZS50dXJ0bGVzXTogdGhpcy5pc1R1cnRsZXMsIFtDb2xsZWN0VHlwZS5nbm9tZV06IHRoaXMuaXNHbm9tZSB9XG4gICAgICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiB7XG4gICAgICAgICAgICBsZXQgaWR4ID0gbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IG1nID0gR2FtZU1vZGVsLmlucy5nZXRNZ01vZGVsKCk7XG4gICAgICAgICAgICBpZiAob3B0W3R5cGVdICYmIHRoaXMubHYgPD0gMCkge1xuICAgICAgICAgICAgICAgIGlkeCA9IG1nLnVwZGF0ZUl0ZW1Db3VudEJ5UG9zKHR5cGUsIHRoaXMucG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtZy5jaGVja0l0ZW1PdmVyKHR5cGUsIGlkeCkpIHtcbiAgICAgICAgICAgICAgICBHYW1lTW9kZWwuaW5zLnVwZGF0ZUNvbGxlY3RDb3VudCh0eXBlLCBpZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxufSJdfQ==