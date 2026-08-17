
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/CellModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1bbd2gCHSlCbLAjoWunrV08', 'CellModel');
// Script/Logic/Match3/Model/CellModel.ts

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
exports.CellModel = void 0;
var Common_1 = require("../../Common/Common");
var GameModel_1 = require("./GameModel");
var Girl_1 = require("./SpecialPlug/Girl");
var BombModel_1 = require("./BombModel");
var CellBase_1 = require("./CellBase");
var Util_1 = require("../../../Base/Utils/Util");
var TimeConfig_1 = require("../../Data/Const/TimeConfig");
var Constant_1 = require("../../Data/Const/Constant");
var M_1 = require("../../../Base/Manager/M");
var EventMgr_1 = require("../../../Base/Manager/EventMgr");
var Event_1 = require("../../Data/Const/Event");
var AudioCtrl_1 = require("../../Common/AudioCtrl");
var CellModel = /** @class */ (function (_super) {
    __extends(CellModel, _super);
    function CellModel() {
        var _this = _super.call(this) || this;
        _this.id = 0;
        _this.isRandom = false;
        _this.isCollect = false;
        /**当前道具绑定基础元素,跟随基础元素移动 */
        _this.bindGModel = null;
        _this.bindUpGModel = null;
        _this.isEmpty = false;
        /**是否是可以下落的状态 */
        _this._isFall = false;
        /**下落速度 */
        _this.speed = cc.v2(0, 0);
        /**下一个下落目的地 */
        _this.fallDes = null;
        /**下落方向 */
        _this.fallDir = null;
        /**是否是炸弹 */
        _this.isBomb = false;
        /**可否是土块 */
        _this.isGround = false;
        /**被飞机选中标记 */
        _this.isPlaneSelected = false;
        /**立即执行爆炸! */
        _this.isExecBomb = false;
        /**炸弹是否已经准备好爆炸了,有可能处于创建前摇 */
        _this.isBombReady = true;
        /**只能被炸弹消除 */
        _this.isJustBombElimate = false;
        /**无敌的 */
        _this.isInvincible = false;
        /**已经处于完全销毁完全状态! */
        _this.isDestoryed = false;
        /**是否处于传送中! */
        _this.isPortaling = false;
        /**宝石的等级 */
        _this.GemLv = 0;
        /**是否是火箭 */
        _this.isRocket = false;
        _this._destoryGroup = null;
        _this.bombModel = null;
        _this._hp = 1;
        _this.type = Constant_1.CellType.Empty;
        _this.ctrlName = 'ItemBasicCellCtrl';
        return _this;
    }
    CellModel.prototype.init = function (data, index, pos, isInit, sync2gm) {
        this.data = data;
        this.mapIndex = index;
        this.lv = 0;
        this._hp = 1;
        this.GemLv = 0;
        this._pos = pos;
        this.fallDir = null;
        this.bombModel = null;
        this._destoryGroup = null;
        this.isCollect = false;
        this._isDeath = false;
        this._isFall = false;
        this.isBomb = false;
        this.isGround = false;
        this.isInvincible = false;
        this.isExecBomb = false;
        this.isRocket = false;
        this.isBombReady = true;
        this.isDestoryed = false;
        this.isPlaneSelected = false;
        this.isJustBombElimate = false;
        this.speed = cc.v2(0, 0);
        if (sync2gm) {
            Common_1.default.safeSet2ArrayValue(GameModel_1.default.ins.CellList, pos, this);
        }
        if (this.data) {
            this.initType(isInit);
            // this.id = GameModel.ins.seq.next();
        }
    };
    CellModel.prototype.onBind = function () {
    };
    CellModel.prototype.onUnBind = function (pos) {
        this.bindGModel && this.bindGModel.onUnBind(pos);
        this.bindUpGModel && this.bindUpGModel.onUnBind(pos);
    };
    CellModel.prototype.initBindGround = function (gCell, upCell) {
        this.bindGround(gCell);
        this.bindGround(upCell, true);
    };
    CellModel.prototype.initBombModel = function (type) {
        if (type === void 0) { type = null; }
        this.isBomb = true;
        this.bombModel = new BombModel_1.BombModel();
        this.bombModel.init(type || this.type, this.pos.x, this.pos.y);
    };
    CellModel.prototype.initType = function (isInit) {
        this.isEmpty = false;
        if (this.data.ground) {
            this.lv = this.data.ground;
            this.isGround = true;
            this.GemLv = this.data.gem;
            if (this.GemLv) {
                GameModel_1.default.ins.isHaveGem = true;
            }
            GameModel_1.default.ins.isHavaMoveGround = true;
            this.setNormalType(Constant_1.CellType.Ground);
        }
        else if (this.data.rocket_type != null && this.data.rocket_type != undefined) {
            this.isRocket = true;
            this.setNormalType(this.data.rocket_type);
        }
        else if (this.data.empty || this.data.flowers || this.data.firefly || this.data.mushroom) {
            this.type = Constant_1.CellType.Empty;
            this.isEmpty = true;
        }
        else if (this.data.counter_level) {
            this.setNormalType(Constant_1.CellType.BottleCaps);
            this.setLv(this.data.counter_level);
        }
        else if (this.data.type == undefined) {
            this.setRandomType(isInit);
        }
        else if (this.data.type < Constant_1.CellType.Bomb1) {
            this.setNormalType(this.data.type);
        }
        else if (Common_1.default.isBombType(this.data.type)) {
            this.type = this.data.type;
            this.initBombModel();
        }
        if (this.type == Constant_1.CellType.BrokenConch) {
            this._hp = Constant_1.BrokenConchHp;
        }
    };
    CellModel.prototype.onMsg = function (type, parame) {
        switch (type) {
            case CellBase_1.MsgType.BesideElimate:
                this.execBesideElimate(parame);
                break;
            case CellBase_1.MsgType.Elimate:
                this.execElimate(parame);
                break;
            case CellBase_1.MsgType.Fall:
                // this.execFall(parame);
                break;
            case CellBase_1.MsgType.FallEnd:
                // this.notifyRoundFall();
                this.stopFall();
                // this.execCheckElimate();
                this.checkIsExit(this.pos);
                this._updateGroundView();
                break;
            case CellBase_1.MsgType.Bomb:
                this.execBomb(parame);
                break;
            case CellBase_1.MsgType.Portal:
                this.execPortal();
                break;
            case CellBase_1.MsgType.ComplexBomb:
                this.execComplexBomb(parame);
                break;
            case CellBase_1.MsgType.UpGroundDone:
                // this.GroupId = parame;
                if (this.isEmpty) {
                    this.notifyRoundFall();
                    if (GameModel_1.default.ins._isBorn(this.pos) && this.extCtrl) {
                        //如果出生为有个empty,销毁.创建下落元素
                        this.extCtrl.preDestory();
                    }
                }
                else {
                    this.continue2Fall();
                }
                this.execPortal();
                // parame && this.execCheckElimate();
                break;
        }
    };
    CellModel.prototype.resetTypeAttribute = function () {
        switch (this.type) {
            case Constant_1.CellType.BrokenConch:
            case Constant_1.CellType.Banana:
            case Constant_1.CellType.Ground:
            case Constant_1.CellType.BottleCaps:
                this.isJustBombElimate = true;
                break;
            case Constant_1.CellType.Girl:
            case Constant_1.CellType.Conch:
                this.isInvincible = true;
                break;
            case Constant_1.CellType.IceCream:
                this.isInvincible = true;
                GameModel_1.default.ins.IceCreamPool.add(this);
                break;
            case Constant_1.CellType.Empty:
                this.isEmpty = true;
                break;
        }
    };
    CellModel.prototype.setNormalType = function (type) {
        this.type = type;
        this.resetTypeAttribute();
    };
    CellModel.prototype.changeBindGround = function (pos) {
        //根据当前坐标来重新绑定地面元素 
        this.bindGround(Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.GroundList, pos));
        this.bindGround(Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.UpGroundList, pos), true);
    };
    CellModel.prototype.lockCreateBombPos = function (size, type) {
        if (size >= 4 && type == Constant_1.ElimateType.Default) {
            GameModel_1.default.ins.Lock.lockFallPos(this.pos, this.pos);
        }
    };
    CellModel.prototype.unlockCreateBombPos = function () {
        GameModel_1.default.ins.Lock.unLockFallPos(this.pos);
    };
    CellModel.prototype.doTestDeath = function () {
        if (!this.isInvincible) {
            this._hp--;
        }
        this._isDeath = this._hp <= 0;
        return this.isDeath;
    };
    CellModel.prototype.execUpElimate = function (type) {
        var data = { id: this.GroupId, type: type };
        if (this.isCanElimate()) {
            if (this.isEmpty && this.bindGModel) {
                this.bindGModel.onMsg(CellBase_1.MsgType.Elimate, data);
            }
        }
        else if (this.bindUpGModel) {
            this.bindUpGModel.onMsg(CellBase_1.MsgType.Elimate, data);
        }
    };
    CellModel.prototype.execElimate = function (data) {
        if (this.isCanElimate()) {
            if (data && data.isForced)
                this._isDeath = true;
            // if (this.isEmpty && this.bindGModel) {
            //     this.bindGModel.onMsg(MsgType.Elimate, data);
            // }
            this.GroupId = data.id;
        }
        else {
            // this.bindUpGModel.onMsg(MsgType.Elimate, data);
        }
    };
    CellModel.prototype.execBesideElimate = function (data) {
        if (this.isCanBesideElimate() && data.type != Constant_1.ElimateType.Beside && !data.cell.isCanBesideElimate()) {
            this.lv--;
            if (this.lv > 0) {
                this.extCtrl && this.extCtrl.playBrokenEff();
            }
            else {
                this.elimateSelf(Constant_1.ElimateType.Beside);
            }
        }
    };
    CellModel.prototype.notifyRoundElimate = function (type) {
        var _this = this;
        if (type === void 0) { type = Constant_1.ElimateType.Default; }
        if (GameModel_1.default.ins) {
            Common_1.default.Dir4.forEach(function (dir) {
                var pos = _this.pos.add(dir);
                var threeLayer = [GameModel_1.default.ins.UpGroundList, GameModel_1.default.ins.GroundList, GameModel_1.default.ins.CellList];
                for (var i = threeLayer.length; i--;) {
                    var cell = Common_1.default.safeGet2ArrayValue(threeLayer[i], pos);
                    /**只允许普通消除的类型进行旁边消除. */
                    if (cell && (type == Constant_1.ElimateType.Default || type == Constant_1.ElimateType.Bomb5)) {
                        cell.onMsg(CellBase_1.MsgType.BesideElimate, { type: type, cell: _this, groupId: _this._destoryGroup });
                    }
                }
            });
        }
    };
    // private notifyFall(pos: cc.Vec2) {
    //     const cm = Common.safeGet2ArrayValue(GameModel.ins.CellList, pos);
    //     if (cm) {
    //         cm.onMsg(MsgType.Fall);
    //     }
    //     return cm;
    // }
    // private notifyPassbleUpFall(pos: cc.Vec2) {
    //     const upGm = Common.safeGet2ArrayValue(GameModel.ins.GroundList, pos);
    //     if (upGm && upGm.isPassable) {
    //         this.notifyFall(GameModel.ins.findNextNotPassblePos(pos, cc.v2(0, -1)));
    //     }
    // }
    /**
     *  检测上方是否有可落下的元素!
     */
    CellModel.prototype.notifyRoundFall = function () {
        GameModel_1.default.ins.testFindCanFallCell(this.pos, this._destoryGroup);
    };
    CellModel.prototype.notifyPlugEvent = function () {
        if (this.type == Constant_1.CellType.BrokenConch) {
            GameModel_1.default.ins.notifyPlug(Girl_1.default);
        }
    };
    /**更新移动地块的边界显示 */
    CellModel.prototype._updateGroundView = function () {
        if (this.isGround && this.extCtrl) {
            this.extCtrl.showGround();
            this.extCtrl.updateGroundView();
        }
    };
    /**是否已经被固定住了 */
    CellModel.prototype.isNotFixed = function () {
        var result = true;
        //检测上层
        if (this.bindUpGModel) {
            result = this.bindUpGModel.isCanFall();
        }
        switch (this.type) {
            case Constant_1.CellType.Conch:
            case Constant_1.CellType.Girl:
                result = false;
                break;
        }
        return result;
    };
    CellModel.prototype.startFall = function (dir) {
        if (dir === void 0) { dir = null; }
        this.fallDir = dir || cc.v2(0, 1);
        this._isFall = true;
        GameModel_1.default.ins.Lock.lockFallPos(this.pos.add(this.fallDir), this.pos);
        EventMgr_1.default.ins.send(Event_1.Event.Sound.PlaySoundEff, AudioCtrl_1.AudioID.CellFall);
    };
    CellModel.prototype._deleteOutOfGridCell = function () {
        var groundCell = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.GroundList, this.pos);
        if (!groundCell || groundCell.getType() == null) {
            this.extCtrl && this.extCtrl.preDestory();
            //解锁
            var nextPos = this.pos.add(this.fallDir);
            GameModel_1.default.ins.Lock.unLockBornPos(nextPos);
            GameModel_1.default.ins.Lock.unLockFallLockByKey(this.pos);
        }
    };
    CellModel.prototype.stopFall = function () {
        this.extCtrl.playFallOverAni();
        this._isFall = false;
        GameModel_1.default.ins.completFall(this._destoryGroup, this);
        GameModel_1.default.ins.removeFallDict(this);
        this._deleteOutOfGridCell();
        if (!this.isDeath)
            this._destoryGroup = null;
    };
    /**重置元素的下落方向 */
    CellModel.prototype.resetFallDir = function (dir) {
        if (dir === void 0) { dir = null; }
        this.fallDes = null;
        GameModel_1.default.ins.Lock.unLockFallLockByKey(this.pos);
        this.startFall(dir);
        this.notifyRoundFall();
    };
    /**地面被解绑 */
    CellModel.prototype.unBindGround = function (gm) {
        //与地面解绑,检测当前地面是否有传送门 
        if (gm.isPortalOut()) {
            //找到传送阵的入口!
            var portalPos = GameModel_1.default.ins.getUpGroundModel().getPortalPos(gm.portalIdx);
            var cell = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.CellList, portalPos.in);
            //激发入口的传送阵
            cell && cell.onMsg(CellBase_1.MsgType.Portal);
        }
    };
    /**绑定地面元素 */
    CellModel.prototype.bindGround = function (model, isUp) {
        if (isUp === void 0) { isUp = false; }
        if (!model)
            return;
        if (isUp) {
            if (model.getType() != Constant_1.UpGroundType.None)
                this.bindUpGModel = model;
        }
        else {
            if (model.getType() != null)
                this.bindGModel = model;
        }
        model.onBind(this);
    };
    //位置发生改变
    CellModel.prototype.onChangePos = function (pos) {
        this.onUnBind(this.pos);
        //重新绑定现有的元素位
        Common_1.default.safeSet2ArrayValue(GameModel_1.default.ins.CellList, pos, this);
        //重新绑定地面
        this.bindGround(Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.GroundList, pos));
        //上层元素应该跟着基础元素一起落.  
        this.bindUpGModel && (this.bindUpGModel.pos = pos);
    };
    CellModel.prototype.setRandomType = function (isInit, mapIndex) {
        if (isInit === void 0) { isInit = false; }
        if (mapIndex === void 0) { mapIndex = null; }
        this.isRandom = true;
        var tempType = GameModel_1.default.ins.getRandomCellType();
        if (Common_1.default.isBombType(tempType) && !isInit) {
            this.type = tempType;
            this.initBombModel();
        }
        else if (this.type == tempType) {
            this.setRandomType(isInit, mapIndex);
        }
        else {
            this.type = tempType;
            var isxx = GameModel_1.default.ins.checkPoint(this.pos, null, mapIndex);
            if (isInit && (GameModel_1.default.ins.checkIsNoInitCreate(tempType) || isxx)) {
                this.setRandomType(isInit, mapIndex);
            }
        }
        this.resetTypeAttribute();
    };
    CellModel.prototype.triggerPortal = function (pos) {
        return __awaiter(this, void 0, void 0, function () {
            var rOut;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 标记准备传送的元素!  
                        if (!this.extCtrl)
                            return [2 /*return*/];
                        this.isPortaling = true;
                        GameModel_1.default.ins.Lock.lockBornPos(pos.out);
                        return [4 /*yield*/, this.extCtrl.portalOut()];
                    case 1:
                        rOut = _a.sent();
                        if (rOut) {
                            //如果这是个出生点.则删除出生点锁
                            GameModel_1.default.ins.Lock.unLockBornPos(pos.out);
                            Common_1.default.safeSet2ArrayValue(GameModel_1.default.ins.CellList, this.pos, null);
                            //通知上面可以开始掉落了.
                            // this.notifyRoundFall(false);
                            // this._isFall = true;
                            this.notifyRoundFall();
                            this.pos = pos.out;
                            this.isPortaling = false;
                            this.extCtrl.portalIn().then(function (rIn) {
                                if (rIn && !_this._isFall) {
                                    //检测下方是否可以下落
                                    _this.continue2Fall();
                                }
                            });
                            if (!this.continue2Fall()) {
                                //传送完成如果没有移动,则检测一次是否有消除的!
                                GameModel_1.default.ins.checkHavaElimate(this.pos);
                                this._updateGroundView();
                            }
                            this.extCtrl.updatePosition();
                            GameModel_1.default.ins.PortalDict.delete(this);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**检测该位置是否有已经到出口的物件 */
    CellModel.prototype.checkIsExit = function (pos) {
        if (this.type == Constant_1.CellType.IceCream) {
            var gm = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.GroundList, pos);
            if (gm && gm.isExit) {
                this.elimateSelf(null);
                GameModel_1.default.ins.IceCreamPool.delete(this);
            }
        }
    };
    CellModel.prototype.isCanTriggerPortal = function (gm) {
        return !this.isEmpty && gm && gm.isPortalIn() && this.isNotFixed();
    };
    CellModel.prototype.elimateSelf = function (type) {
        GameModel_1.default.ins.execElimateOne(this.pos, type || Constant_1.ElimateType.Default, true);
    };
    CellModel.prototype.execPortal = function () {
        var result = false;
        if (GameModel_1.default.ins.PortalDict.has(this)) {
            //正在传送中
            return true;
        }
        var groudModel = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.GroundList, this.pos);
        if (!groudModel)
            return false;
        if (groudModel.isPortalOut()) {
            var portalPos = GameModel_1.default.ins.getUpGroundModel().getPortalPos(groudModel.portalIdx);
            var portalInCell = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.CellList, portalPos.in);
            if (portalInCell && !portalInCell.isRemoved() && !portalInCell.isFall) {
                portalInCell.onMsg(CellBase_1.MsgType.Portal);
            }
        }
        else if (!this.isDeath && this.isCanTriggerPortal(groudModel)) {
            //定位传送节点
            var portalPos = GameModel_1.default.ins.getUpGroundModel().getPortalPos(groudModel.portalIdx);
            //激活传送阵 
            if (GameModel_1.default.ins.isCanFall(portalPos.out, this.pos) && !GameModel_1.default.ins.Lock.isBornPosLocked(portalPos.out)) {
                result = true;
                GameModel_1.default.ins.PortalDict.add(this);
                this.triggerPortal(portalPos);
            }
        }
        return result;
    };
    // private execCheckElimate() {
    //     GameModel.ins.checkHavaElimate(this.pos);
    //     this.checkIsExit(this.pos);
    // }
    CellModel.prototype.execComplexBomb = function (data) {
        if (this.bombModel) {
            this.bombModel.onBombMergeBomb(data.type1, data.type2, this, data.groupId);
            if (!data.isBoard) {
                GameModel_1.default.ins.updateStepCount();
            }
        }
    };
    CellModel.prototype.execBomb = function (data) {
        if (this.bombModel && !this.isRemoved()) {
            var type = null;
            if (data) {
                type = data.type;
                if (!type) {
                    var target = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.CellList, data.pos);
                    if (target) {
                        type = target.getType();
                    }
                }
            }
            this.unlockCreateBombPos();
            if (this.bombModel.getType() == Constant_1.CellType.Bomb5) {
                if (type != null) {
                    this.bombModel.execBomb(this, type, this._destoryGroup);
                    // this.execElimate(null);
                }
            }
            else {
                this.bombModel.execBomb(this, type, this._destoryGroup);
                // this.execElimate(null);
            }
        }
    };
    Object.defineProperty(CellModel.prototype, "GroupId", {
        get: function () {
            return this._destoryGroup;
        },
        set: function (id) {
            if (this._destoryGroup == null) {
                this._destoryGroup = id;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CellModel.prototype, "fallingDir", {
        get: function () {
            return this.fallDir;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CellModel.prototype, "isFall", {
        get: function () {
            return this._isFall;
        },
        enumerable: false,
        configurable: true
    });
    CellModel.prototype.change2Cell = function (type) {
        if (type === void 0) { type = null; }
        this.setNormalType(type);
        // this._destoryGroup = null;  //当初是因为什么设计成这里要置空呢 ??????
        GameModel_1.default.ins.checkHavaElimate(this.pos);
    };
    CellModel.prototype.change2Bomb = function (type) {
        if (type === void 0) { type = null; }
        this.data = {};
        this.data.type = type || Util_1.Util.Tool.rangeInt(10, Constant_1.CellType.Bomb4);
        // this._destoryGroup = null;
        this.initType(false);
    };
    CellModel.prototype.isCanBesideElimate = function () {
        return (this.type == Constant_1.CellType.Banana || this.type == Constant_1.CellType.BottleCaps || this.type == Constant_1.CellType.Ground);
    };
    CellModel.prototype.isCanElimate = function () {
        return !this.bindUpGModel || (this.bindUpGModel && !this.bindUpGModel.isHavaSpe);
    };
    CellModel.prototype.isFalling = function () {
        return (this.isFall && (this.speed.y > 0 || this.speed.x > 0));
    };
    CellModel.prototype.isRemoved = function () {
        return this.isDeath && (!this.extData); //this.isDestoryed;
    };
    /**美人鱼往下踩一次 */
    CellModel.prototype.mermaidJumpTo = function (targetPos) {
        var _this = this;
        if (this.extCtrl) {
            GameModel_1.default.ins.Lock.lockFallPos(targetPos, this.pos, true);
            this.extCtrl.mermaidJumpTo(targetPos, function () {
                Common_1.default.safeSet2ArrayValue(GameModel_1.default.ins.CellList, _this.pos, null);
                _this._moveOver(targetPos);
                _this.notifyRoundFall();
            });
        }
    };
    /**传输带移动 */
    CellModel.prototype.conveyerMoveTo = function (targetPos, callback) {
        var _this = this;
        if (this.extCtrl) {
            GameModel_1.default.ins.Lock.lockFallPos(targetPos, this.pos, true);
            Common_1.default.safeSet2ArrayValue(GameModel_1.default.ins.CellList, this.pos, null);
            this.extCtrl.moveTo(targetPos, function () {
                _this._moveOver(targetPos);
                callback && callback();
            });
        }
    };
    CellModel.prototype._moveOver = function (targetPos) {
        GameModel_1.default.ins.Lock.unLockFallPos(targetPos);
        this.pos = targetPos;
    };
    CellModel.prototype.preDestory = function () {
        _super.prototype.destory.call(this);
    };
    CellModel.prototype.destory = function (tType) {
        this._isDeath = true;
        if (!this.isEmpty) {
            M_1.default.runtime.addCollectCount(this.type);
        }
        //发送插件事件,让插件自己决定是否做处理
        this.notifyPlugEvent();
        //通知绑定地面,元素消除!
        if (this.bindGModel && !this.isEmpty) {
            this.bindGModel.onMsg(CellBase_1.MsgType.Elimate, { type: tType });
        }
        if (!this.isRocket) {
            //检测是否有除草机
            var havePowerCollect = GameModel_1.default.ins.CollectModel.updateCollectPowerCell(this);
            //检测完成回收!!! 
            if (!havePowerCollect && M_1.default.runtime.GameState != Constant_1.GameState.End) {
                GameModel_1.default.ins.updateCollectCount(this.type, this.getPosition(), tType);
            }
        }
        //解锁出生点 (这个时候解锁出生点,如果有正在掉落的新生元素,会导致重复掉落)
        // GameModel.ins.Lock.unLockBornPos(this.pos);
        if (GameModel_1.default.ins._isBorn(this.pos)) {
            GameModel_1.default.ins.checkNeedCreateNewCell(this.pos, this._destoryGroup);
        }
        GameModel_1.default.ins.removeDeathDict(this);
        //如果位置被炸弹锁住,要解锁吗? 会出问题吗? 
        if (Common_1.default.isBombType(this.getType())) {
            this.unlockCreateBombPos();
        }
        //销毁后是否要将他移出棋盘?????
        // Common.safeSet2ArrayValue(GameModel.ins.CellList, this.pos, null);
        this.type = Constant_1.CellType.Empty;
        //解除绑定的视图
        this.isDestoryed = true;
        //移出掉落
        GameModel_1.default.ins.removeFallDict(this);
        //通知掉落!
        this.notifyRoundFall();
        //回收入池
        GameModel_1.default.ins.freeCell(this);
        this._destoryGroup = null;
    };
    CellModel.prototype.forcedResetType = function (type) {
        this.type = type;
    };
    /**下落已经改变位置 */
    CellModel.prototype.isGridPosChanged = function (nextpos) {
        if (this.fallDir.x != 0 && this.fallDir.y != 0) {
            return (nextpos.x != this.pos.x && nextpos.y != this.pos.y);
        }
        else {
            return (nextpos.x != this.pos.x || nextpos.y != this.pos.y);
        }
    };
    /**
     * 检测是否已经结束掉落!
     * @param nextCell
     * @param nextPos
     * @returns boolean 是否已经结束!
     */
    CellModel.prototype.isFallOver = function (nextPos) {
        var result = false;
        //检测下个位置是否已经不动了!
        var nextCell = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.CellList, nextPos);
        if (nextCell && !nextCell.isDeath && !nextCell.isEmpty && !nextCell.isFall) {
            result = true;
        }
        else if (GameModel_1.default.ins.isBorder(nextPos)) {
            //检测下个位置是否已经是边界了!
            result = true;
        }
        else if (!GameModel_1.default.ins.isPassable(nextPos, this.pos)) {
            //检测下个位置是否有障碍物
            result = true;
        }
        return result;
    };
    /**
     * 触发坐标改变!
     * @param pos 改变的目标坐标!
     * @returns next Cell
     */
    CellModel.prototype.triggerFallChangePos = function (pos) {
        //这边需要处理,如果前面元素还正在移动并没有出格,这时候进入新位置会导致前面元素游离
        pos = GameModel_1.default.ins.getNotPassblePoss(pos);
        var testCell = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.CellList, pos);
        if (testCell) {
            if (!testCell.isDeath && !testCell.isEmpty) {
                return null;
            }
            else if (testCell.isEmpty && !GameModel_1.default.ins.isHavaSpe(pos)) {
                testCell.extCtrl && testCell.extCtrl.preDestory();
            }
        }
        //将原来的位置置空!
        if (Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.CellList, this.pos) == this) {
            Common_1.default.safeSet2ArrayValue(GameModel_1.default.ins.CellList, this.pos, null);
        }
        //解锁释放当前位置锁与出生锁
        if (GameModel_1.default.ins._isBorn(pos)) {
            GameModel_1.default.ins.Lock.unLockBornPos(pos);
            GameModel_1.default.ins.removeNewCreateCell(this);
        }
        GameModel_1.default.ins.Lock.unLockFallLockByKey(this.pos);
        //放入新的位置!
        this.pos = pos;
        //如果是结束的时候
        // if (M.runtime.GameState == GameState.End && this.pos.y >= GameModel.ins.CellList.length - 1) {
        //     this.extCtrl && this.extCtrl.playBombSingleDestoryEff();
        // }
        //判断直下是否可以掉落
        if (GameModel_1.default.ins.isCanFall(this.pos.add(cc.v2(0, 1)), this.pos)) {
            this.fallDir = cc.v2(0, 1);
        }
        //如果这时候是斜着走,需要判断是否可以斜着走  
        if (this.fallDir.x != 0 && !GameModel_1.default.ins.isCanDiagonallyFall(this.pos.add(this.fallDir), this)) {
            this.fallDir = cc.v2(0, 1);
        }
        var nextpos = GameModel_1.default.ins.getNotPassblePoss(this.pos.add(this.fallDir));
        return nextpos;
    };
    /**
     * 检测继续往下移动!
     * @return 如果会继续移动则 true
     */
    CellModel.prototype.continue2Fall = function (isCreateBomb) {
        if (isCreateBomb === void 0) { isCreateBomb = false; }
        var result = false;
        var dirs = [cc.v2(0, 1), cc.v2(-1, 1), cc.v2(1, 1)];
        //如果棋盘里没有这个位置.
        if (!Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.CellList, this.pos)) {
            dirs = [cc.v2(0, 1)];
        }
        for (var i = 0; i < dirs.length; i++) {
            var dir = dirs[i];
            var targetPos = this.pos.add(dir);
            if (this.isNotFixed() &&
                !GameModel_1.default.ins.isBorder(targetPos) &&
                GameModel_1.default.ins.isCanFall(targetPos, this.pos, false, isCreateBomb)) {
                if (dir.x != 0 && !GameModel_1.default.ins.isCanDiagonallyFall(targetPos, this)) {
                    continue;
                }
                if (!this._destoryGroup) {
                    this.GroupId = GameModel_1.default.ins.seq.next();
                }
                GameModel_1.default.ins.addFallCell(this, dir, this._destoryGroup);
                this.notifyRoundFall();
                result = true;
                break;
            }
        }
        return result;
    };
    /**
     * 重置元素状态(停止移动)
     */
    CellModel.prototype.resetFallState = function () {
        this.speed = cc.v2(0, 0);
        // this.fallDir = cc.v2(0, 1);
        this.fallDes = null;
        //解开原先的锁,顺序不能错!!!!
        GameModel_1.default.ins.Lock.unLockFallLockByKey(this.pos);
        //开始检测是否需要继续斜着移动! 
        var isObl = this.continue2Fall(); //  this.obliqueMove();
        var isPor = this.execPortal();
        if (!isPor && !isObl) {
            this.onMsg(CellBase_1.MsgType.FallEnd);
        }
    };
    CellModel.prototype.applySpeed = function (nextpos) {
        this.speed = cc.v2(0, 0);
        this.fallDes = Common_1.default.getPos(nextpos.x, nextpos.y);
        if (GameModel_1.default.ins.isCanFall(nextpos, this.pos)) {
            //施加速度!
            this.speed.x = this.speed.y = TimeConfig_1.GapTime.FallingSpeed; //(M.runtime.GameState == GameState.End ? GapTime.EndFallingSpeed : GapTime.FallingSpeed);
        }
    };
    CellModel.prototype.updateFall = function (dt) {
        if (this.extCtrl) {
            this.extCtrl.orderlyUpdate(dt);
        }
    };
    CellModel.prototype.posDetection = function (position) {
        var result = false;
        if (this._isFall && !this.isEmpty) {
            GameModel_1.default.ins.isFalling = true;
            var currpos = Common_1.default.convetPos(position.add(cc.v3(0, Common_1.default.GRID_H / 2)));
            var nextpos = this.pos.add(this.fallDir);
            if (this.isGridPosChanged(currpos)) {
                nextpos = this.triggerFallChangePos(currpos) || nextpos;
            }
            else {
                //如果下一个位置是个passble,就跳过这个passble寻找下一个位置!
                nextpos = GameModel_1.default.ins.getNotPassblePoss(nextpos);
            }
            this.applySpeed(nextpos);
            if (this.speed.equals(cc.v2(0, 0))) {
                this.extCtrl.playFallPauseAni();
            }
            else if (this.fallDir.x == 0) {
                M_1.default.runtime.GameState != Constant_1.GameState.End && this.extCtrl.playFallStartAni();
            }
            result = this.isFallOver(nextpos);
            if (result) {
                this.resetFallState();
            }
            else {
                //下面如果还有,给下面上锁!
                GameModel_1.default.ins.Lock.lockFallPos(nextpos, this.pos);
            }
        }
        return result;
    };
    CellModel.prototype.update = function (dt) {
        this.extCtrl && this.extCtrl.orderlyUpdate(dt);
    };
    return CellModel;
}(CellBase_1.CellBase));
exports.CellModel = CellModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcQ2VsbE1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBeUM7QUFDekMseUNBQW9DO0FBQ3BDLDJDQUFzQztBQUN0Qyx5Q0FBd0M7QUFDeEMsdUNBQStDO0FBRS9DLGlEQUFnRDtBQUloRCwwREFBc0Q7QUFDdEQsc0RBQTBHO0FBQzFHLDZDQUF3QztBQUN4QywyREFBc0Q7QUFDdEQsZ0RBQStDO0FBQy9DLG9EQUFpRDtBQUVqRDtJQUErQiw2QkFBcUM7SUFpRGhFO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBbkRNLFFBQUUsR0FBVyxDQUFDLENBQUM7UUFFZixjQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFFbEMseUJBQXlCO1FBQ2xCLGdCQUFVLEdBQW9CLElBQUksQ0FBQztRQUNuQyxrQkFBWSxHQUFzQixJQUFJLENBQUM7UUFFdkMsYUFBTyxHQUFZLEtBQUssQ0FBQztRQUNoQyxnQkFBZ0I7UUFDUixhQUFPLEdBQVksS0FBSyxDQUFDO1FBQ2pDLFVBQVU7UUFDSCxXQUFLLEdBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEMsY0FBYztRQUNQLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFDL0IsVUFBVTtRQUNILGFBQU8sR0FBWSxJQUFJLENBQUM7UUFDL0IsV0FBVztRQUNKLFlBQU0sR0FBWSxLQUFLLENBQUM7UUFDL0IsV0FBVztRQUNKLGNBQVEsR0FBWSxLQUFLLENBQUM7UUFDakMsYUFBYTtRQUNOLHFCQUFlLEdBQVksS0FBSyxDQUFDO1FBQ3hDLGFBQWE7UUFDTixnQkFBVSxHQUFZLEtBQUssQ0FBQztRQUNuQyw0QkFBNEI7UUFDckIsaUJBQVcsR0FBWSxJ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LEFBZzJCQyxDQWgyQjhCLG1CQUFRLEdBZzJCdEM7QUFoMkJZLDhCQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbW1vbiBmcm9tIFwiLi4vLi4vQ29tbW9uL0NvbW1vblwiO1xuaW1wb3J0IEdhbWVNb2RlbCBmcm9tIFwiLi9HYW1lTW9kZWxcIjtcbmltcG9ydCBHaXJsIGZyb20gXCIuL1NwZWNpYWxQbHVnL0dpcmxcIjtcbmltcG9ydCB7IEJvbWJNb2RlbCB9IGZyb20gXCIuL0JvbWJNb2RlbFwiO1xuaW1wb3J0IHsgQ2VsbEJhc2UsIE1zZ1R5cGUgfSBmcm9tIFwiLi9DZWxsQmFzZVwiO1xuaW1wb3J0IEdyb3VuZENlbGxNb2RlbCBmcm9tIFwiLi9Hcm91bmRDZWxsTW9kZWxcIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VdGlscy9VdGlsXCI7XG5pbXBvcnQgVXBHcm91bmRDZWxsTW9kZWwgZnJvbSBcIi4vVXBHcm91bmRDZWxsTW9kZWxcIjtcbmltcG9ydCB7IEdyaWQgfSBmcm9tIFwiLi4vLi4vRGF0YS9JbnRlcmZhY2UvTGV2ZWwvSUxldmVsXCI7XG5pbXBvcnQgSXRlbUJhc2ljQ2VsbEN0cmwgZnJvbSBcIi4uL1ZpZXcvSXRlbUJhc2ljQ2VsbEN0cmxcIjtcbmltcG9ydCB7IEdhcFRpbWUgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9UaW1lQ29uZmlnXCI7XG5pbXBvcnQgeyBDZWxsVHlwZSwgRWxpbWF0ZVR5cGUsIEJyb2tlbkNvbmNoSHAsIFVwR3JvdW5kVHlwZSwgR2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvRXZlbnRNZ3JcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCB7IEF1ZGlvSUQgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0F1ZGlvQ3RybFwiO1xuXG5leHBvcnQgY2xhc3MgQ2VsbE1vZGVsIGV4dGVuZHMgQ2VsbEJhc2U8Q2VsbFR5cGUsIEl0ZW1CYXNpY0NlbGxDdHJsPiB7XG5cbiAgICBwdWJsaWMgaWQ6IG51bWJlciA9IDA7XG5cbiAgICBwdWJsaWMgaXNSYW5kb206IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgaXNDb2xsZWN0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKirlvZPliY3pgZPlhbfnu5Hlrprln7rnoYDlhYPntKAs6Lef6ZqP5Z+656GA5YWD57Sg56e75YqoICovXG4gICAgcHVibGljIGJpbmRHTW9kZWw6IEdyb3VuZENlbGxNb2RlbCA9IG51bGw7XG4gICAgcHVibGljIGJpbmRVcEdNb2RlbDogVXBHcm91bmRDZWxsTW9kZWwgPSBudWxsO1xuXG4gICAgcHVibGljIGlzRW1wdHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKirmmK/lkKbmmK/lj6/ku6XkuIvokL3nmoTnirbmgIEgKi9cbiAgICBwcml2YXRlIF9pc0ZhbGw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKirkuIvokL3pgJ/luqYgKi9cbiAgICBwdWJsaWMgc3BlZWQ6IGNjLlZlYzIgPSBjYy52MigwLCAwKTtcbiAgICAvKirkuIvkuIDkuKrkuIvokL3nm67nmoTlnLAgKi9cbiAgICBwdWJsaWMgZmFsbERlczogY2MuVmVjMiA9IG51bGw7XG4gICAgLyoq5LiL6JC95pa55ZCRICovXG4gICAgcHVibGljIGZhbGxEaXI6IGNjLlZlYzIgPSBudWxsO1xuICAgIC8qKuaYr+WQpuaYr+eCuOW8uSAqL1xuICAgIHB1YmxpYyBpc0JvbWI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKirlj6/lkKbmmK/lnJ/lnZcgKi9cbiAgICBwdWJsaWMgaXNHcm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKirooqvpo57mnLrpgInkuK3moIforrAgKi9cbiAgICBwdWJsaWMgaXNQbGFuZVNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoq56uL5Y2z5omn6KGM54iG54K4ISAqL1xuICAgIHB1YmxpYyBpc0V4ZWNCb21iOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoq54K45by55piv5ZCm5bey57uP5YeG5aSH5aW954iG54K45LqGLOacieWPr+iDveWkhOS6juWIm+W7uuWJjeaRhyAqL1xuICAgIHB1YmxpYyBpc0JvbWJSZWFkeTogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoq5Y+q6IO96KKr54K45by55raI6ZmkICovXG4gICAgcHVibGljIGlzSnVzdEJvbWJFbGltYXRlOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoq5peg5pWM55qEICovXG4gICAgcHVibGljIGlzSW52aW5jaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKuW3sue7j+WkhOS6juWujOWFqOmUgOavgeWujOWFqOeKtuaAgSEgKi9cbiAgICBwdWJsaWMgaXNEZXN0b3J5ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKirmmK/lkKblpITkuo7kvKDpgIHkuK0hICovXG4gICAgcHVibGljIGlzUG9ydGFsaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoq5a6d55+z55qE562J57qnICovXG4gICAgcHVibGljIEdlbUx2OiBudW1iZXIgPSAwO1xuICAgIC8qKuaYr+WQpuaYr+eBq+eurSAqL1xuICAgIHB1YmxpYyBpc1JvY2tldDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfZGVzdG9yeUdyb3VwOiBudW1iZXIgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBib21iTW9kZWw6IEJvbWJNb2RlbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9ocCA9IDE7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50eXBlID0gQ2VsbFR5cGUuRW1wdHk7XG4gICAgICAgIHRoaXMuY3RybE5hbWUgPSAnSXRlbUJhc2ljQ2VsbEN0cmwnO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KGRhdGE6IEdyaWQgfCB7fSwgaW5kZXg/OiBudW1iZXIsIHBvcz86IGNjLlZlYzIsIGlzSW5pdD86IGJvb2xlYW4sIHN5bmMyZ20/OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IDxhbnk+ZGF0YTtcbiAgICAgICAgdGhpcy5tYXBJbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLmx2ID0gMDtcbiAgICAgICAgdGhpcy5faHAgPSAxO1xuICAgICAgICB0aGlzLkdlbUx2ID0gMDtcbiAgICAgICAgdGhpcy5fcG9zID0gcG9zO1xuICAgICAgICB0aGlzLmZhbGxEaXIgPSBudWxsO1xuICAgICAgICB0aGlzLmJvbWJNb2RlbCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2Rlc3RvcnlHcm91cCA9IG51bGw7XG4gICAgICAgIHRoaXMuaXNDb2xsZWN0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzRGVhdGggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNGYWxsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNCb21iID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNHcm91bmQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0ludmluY2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0V4ZWNCb21iID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNSb2NrZXQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0JvbWJSZWFkeSA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNEZXN0b3J5ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1BsYW5lU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0p1c3RCb21iRWxpbWF0ZSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuc3BlZWQgPSBjYy52MigwLCAwKTtcbiAgICAgICAgaWYgKHN5bmMyZ20pIHtcbiAgICAgICAgICAgIENvbW1vbi5zYWZlU2V0MkFycmF5VmFsdWUoR2FtZU1vZGVsLmlucy5DZWxsTGlzdCwgcG9zLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRUeXBlKGlzSW5pdCk7XG4gICAgICAgICAgICAvLyB0aGlzLmlkID0gR2FtZU1vZGVsLmlucy5zZXEubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uQmluZCgpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBvblVuQmluZChwb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgdGhpcy5iaW5kR01vZGVsICYmIHRoaXMuYmluZEdNb2RlbC5vblVuQmluZChwb3MpO1xuICAgICAgICB0aGlzLmJpbmRVcEdNb2RlbCAmJiB0aGlzLmJpbmRVcEdNb2RlbC5vblVuQmluZChwb3MpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0QmluZEdyb3VuZChnQ2VsbDogR3JvdW5kQ2VsbE1vZGVsLCB1cENlbGw6IFVwR3JvdW5kQ2VsbE1vZGVsKSB7XG4gICAgICAgIHRoaXMuYmluZEdyb3VuZChnQ2VsbCk7XG4gICAgICAgIHRoaXMuYmluZEdyb3VuZCh1cENlbGwsIHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0Qm9tYk1vZGVsKHR5cGU6IENlbGxUeXBlID0gbnVsbCkge1xuICAgICAgICB0aGlzLmlzQm9tYiA9IHRydWU7XG4gICAgICAgIHRoaXMuYm9tYk1vZGVsID0gbmV3IEJvbWJNb2RlbCgpO1xuICAgICAgICB0aGlzLmJvbWJNb2RlbC5pbml0KHR5cGUgfHwgdGhpcy50eXBlLCB0aGlzLnBvcy54LCB0aGlzLnBvcy55KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRUeXBlKGlzSW5pdDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmlzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5ncm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMubHYgPSB0aGlzLmRhdGEuZ3JvdW5kO1xuICAgICAgICAgICAgdGhpcy5pc0dyb3VuZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLkdlbUx2ID0gdGhpcy5kYXRhLmdlbTtcbiAgICAgICAgICAgIGlmICh0aGlzLkdlbUx2KSB7XG4gICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5pc0hhdmVHZW0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5pc0hhdmFNb3ZlR3JvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0Tm9ybWFsVHlwZShDZWxsVHlwZS5Hcm91bmQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5yb2NrZXRfdHlwZSAhPSBudWxsICYmIHRoaXMuZGF0YS5yb2NrZXRfdHlwZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNSb2NrZXQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zZXROb3JtYWxUeXBlKHRoaXMuZGF0YS5yb2NrZXRfdHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhLmVtcHR5IHx8IHRoaXMuZGF0YS5mbG93ZXJzIHx8IHRoaXMuZGF0YS5maXJlZmx5IHx8IHRoaXMuZGF0YS5tdXNocm9vbSkge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gQ2VsbFR5cGUuRW1wdHk7XG4gICAgICAgICAgICB0aGlzLmlzRW1wdHkgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5jb3VudGVyX2xldmVsKSB7XG4gICAgICAgICAgICB0aGlzLnNldE5vcm1hbFR5cGUoQ2VsbFR5cGUuQm90dGxlQ2Fwcyk7XG4gICAgICAgICAgICB0aGlzLnNldEx2KHRoaXMuZGF0YS5jb3VudGVyX2xldmVsKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGEudHlwZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UmFuZG9tVHlwZShpc0luaXQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS50eXBlIDwgQ2VsbFR5cGUuQm9tYjEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Tm9ybWFsVHlwZSh0aGlzLmRhdGEudHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoQ29tbW9uLmlzQm9tYlR5cGUodGhpcy5kYXRhLnR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLmRhdGEudHlwZTtcbiAgICAgICAgICAgIHRoaXMuaW5pdEJvbWJNb2RlbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSBDZWxsVHlwZS5Ccm9rZW5Db25jaCkge1xuICAgICAgICAgICAgdGhpcy5faHAgPSBCcm9rZW5Db25jaEhwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uTXNnKHR5cGU6IE1zZ1R5cGUsIHBhcmFtZT86IGFueSkge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgTXNnVHlwZS5CZXNpZGVFbGltYXRlOlxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY0Jlc2lkZUVsaW1hdGUocGFyYW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTXNnVHlwZS5FbGltYXRlOlxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY0VsaW1hdGUocGFyYW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTXNnVHlwZS5GYWxsOlxuICAgICAgICAgICAgICAgIC8vIHRoaXMuZXhlY0ZhbGwocGFyYW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTXNnVHlwZS5GYWxsRW5kOlxuICAgICAgICAgICAgICAgIC8vIHRoaXMubm90aWZ5Um91bmRGYWxsKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wRmFsbCgpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuZXhlY0NoZWNrRWxpbWF0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tJc0V4aXQodGhpcy5wb3MpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUdyb3VuZFZpZXcoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTXNnVHlwZS5Cb21iOlxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY0JvbWIocGFyYW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTXNnVHlwZS5Qb3J0YWw6XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjUG9ydGFsKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE1zZ1R5cGUuQ29tcGxleEJvbWI6XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjQ29tcGxleEJvbWIocGFyYW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgTXNnVHlwZS5VcEdyb3VuZERvbmU6XG5cbiAgICAgICAgICAgICAgICAvLyB0aGlzLkdyb3VwSWQgPSBwYXJhbWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeVJvdW5kRmFsbCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoR2FtZU1vZGVsLmlucy5faXNCb3JuKHRoaXMucG9zKSAmJiB0aGlzLmV4dEN0cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5aaC5p6c5Ye655Sf5Li65pyJ5LiqZW1wdHks6ZSA5q+BLuWIm+W7uuS4i+iQveWFg+e0oFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHRDdHJsLnByZURlc3RvcnkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGludWUyRmFsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWNQb3J0YWwoKTtcblxuICAgICAgICAgICAgICAgIC8vIHBhcmFtZSAmJiB0aGlzLmV4ZWNDaGVja0VsaW1hdGUoKTtcblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldFR5cGVBdHRyaWJ1dGUoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIENlbGxUeXBlLkJyb2tlbkNvbmNoOlxuICAgICAgICAgICAgY2FzZSBDZWxsVHlwZS5CYW5hbmE6XG4gICAgICAgICAgICBjYXNlIENlbGxUeXBlLkdyb3VuZDpcbiAgICAgICAgICAgIGNhc2UgQ2VsbFR5cGUuQm90dGxlQ2FwczpcbiAgICAgICAgICAgICAgICB0aGlzLmlzSnVzdEJvbWJFbGltYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ2VsbFR5cGUuR2lybDpcbiAgICAgICAgICAgIGNhc2UgQ2VsbFR5cGUuQ29uY2g6XG4gICAgICAgICAgICAgICAgdGhpcy5pc0ludmluY2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDZWxsVHlwZS5JY2VDcmVhbTpcbiAgICAgICAgICAgICAgICB0aGlzLmlzSW52aW5jaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5JY2VDcmVhbVBvb2wuYWRkKHRoaXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDZWxsVHlwZS5FbXB0eTpcbiAgICAgICAgICAgICAgICB0aGlzLmlzRW1wdHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXROb3JtYWxUeXBlKHR5cGUpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5yZXNldFR5cGVBdHRyaWJ1dGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2hhbmdlQmluZEdyb3VuZChwb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgLy/moLnmja7lvZPliY3lnZDmoIfmnaXph43mlrDnu5HlrprlnLDpnaLlhYPntKAgXG4gICAgICAgIHRoaXMuYmluZEdyb3VuZChDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuR3JvdW5kTGlzdCwgcG9zKSk7XG4gICAgICAgIHRoaXMuYmluZEdyb3VuZChDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuVXBHcm91bmRMaXN0LCBwb3MpLCB0cnVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9ja0NyZWF0ZUJvbWJQb3Moc2l6ZTogbnVtYmVyLCB0eXBlOiBFbGltYXRlVHlwZSkge1xuICAgICAgICBpZiAoc2l6ZSA+PSA0ICYmIHR5cGUgPT0gRWxpbWF0ZVR5cGUuRGVmYXVsdCkge1xuICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5Mb2NrLmxvY2tGYWxsUG9zKHRoaXMucG9zLCB0aGlzLnBvcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdW5sb2NrQ3JlYXRlQm9tYlBvcygpIHtcbiAgICAgICAgR2FtZU1vZGVsLmlucy5Mb2NrLnVuTG9ja0ZhbGxQb3ModGhpcy5wb3MpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkb1Rlc3REZWF0aCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzSW52aW5jaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5faHAtLVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzRGVhdGggPSB0aGlzLl9ocCA8PSAwO1xuICAgICAgICByZXR1cm4gdGhpcy5pc0RlYXRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBleGVjVXBFbGltYXRlKHR5cGUpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHsgaWQ6IHRoaXMuR3JvdXBJZCwgdHlwZSB9O1xuICAgICAgICBpZiAodGhpcy5pc0NhbkVsaW1hdGUoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSAmJiB0aGlzLmJpbmRHTW9kZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRHTW9kZWwub25Nc2coTXNnVHlwZS5FbGltYXRlLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpbmRVcEdNb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5iaW5kVXBHTW9kZWwub25Nc2coTXNnVHlwZS5FbGltYXRlLCBkYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZXhlY0VsaW1hdGUoZGF0YTogeyBpZDogbnVtYmVyLCB0eXBlOiBFbGltYXRlVHlwZSwgaXNGb3JjZWQ6IGJvb2xlYW4gfSkge1xuICAgICAgICBpZiAodGhpcy5pc0NhbkVsaW1hdGUoKSkge1xuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5pc0ZvcmNlZCkgdGhpcy5faXNEZWF0aCA9IHRydWU7XG4gICAgICAgICAgICAvLyBpZiAodGhpcy5pc0VtcHR5ICYmIHRoaXMuYmluZEdNb2RlbCkge1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuYmluZEdNb2RlbC5vbk1zZyhNc2dUeXBlLkVsaW1hdGUsIGRhdGEpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdGhpcy5Hcm91cElkID0gZGF0YS5pZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMuYmluZFVwR01vZGVsLm9uTXNnKE1zZ1R5cGUuRWxpbWF0ZSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGV4ZWNCZXNpZGVFbGltYXRlKGRhdGE6IHsgdHlwZTogRWxpbWF0ZVR5cGUsIGNlbGw6IENlbGxNb2RlbCB9KSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ2FuQmVzaWRlRWxpbWF0ZSgpICYmIGRhdGEudHlwZSAhPSBFbGltYXRlVHlwZS5CZXNpZGUgJiYgIWRhdGEuY2VsbC5pc0NhbkJlc2lkZUVsaW1hdGUoKSkge1xuICAgICAgICAgICAgdGhpcy5sdi0tO1xuICAgICAgICAgICAgaWYgKHRoaXMubHYgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHRDdHJsICYmIHRoaXMuZXh0Q3RybC5wbGF5QnJva2VuRWZmKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxpbWF0ZVNlbGYoRWxpbWF0ZVR5cGUuQmVzaWRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBub3RpZnlSb3VuZEVsaW1hdGUodHlwZTogRWxpbWF0ZVR5cGUgPSBFbGltYXRlVHlwZS5EZWZhdWx0KSB7XG4gICAgICAgIGlmIChHYW1lTW9kZWwuaW5zKSB7XG4gICAgICAgICAgICBDb21tb24uRGlyNC5mb3JFYWNoKGRpciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zID0gdGhpcy5wb3MuYWRkKGRpcik7XG4gICAgICAgICAgICAgICAgY29uc3QgdGhyZWVMYXllciA9IFtHYW1lTW9kZWwuaW5zLlVwR3JvdW5kTGlzdCwgR2FtZU1vZGVsLmlucy5Hcm91bmRMaXN0LCBHYW1lTW9kZWwuaW5zLkNlbGxMaXN0XTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gdGhyZWVMYXllci5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbDogYW55ID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZSg8YW55PnRocmVlTGF5ZXJbaV0sIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIC8qKuWPquWFgeiuuOaZrumAmua2iOmZpOeahOexu+Wei+i/m+ihjOaXgei+uea2iOmZpC4gKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwgJiYgKHR5cGUgPT0gRWxpbWF0ZVR5cGUuRGVmYXVsdCB8fCB0eXBlID09IEVsaW1hdGVUeXBlLkJvbWI1KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5vbk1zZyhNc2dUeXBlLkJlc2lkZUVsaW1hdGUsIHsgdHlwZSwgY2VsbDogdGhpcywgZ3JvdXBJZDogdGhpcy5fZGVzdG9yeUdyb3VwIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwcml2YXRlIG5vdGlmeUZhbGwocG9zOiBjYy5WZWMyKSB7XG4gICAgLy8gICAgIGNvbnN0IGNtID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShHYW1lTW9kZWwuaW5zLkNlbGxMaXN0LCBwb3MpO1xuICAgIC8vICAgICBpZiAoY20pIHtcbiAgICAvLyAgICAgICAgIGNtLm9uTXNnKE1zZ1R5cGUuRmFsbCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgcmV0dXJuIGNtO1xuICAgIC8vIH1cblxuICAgIC8vIHByaXZhdGUgbm90aWZ5UGFzc2JsZVVwRmFsbChwb3M6IGNjLlZlYzIpIHtcbiAgICAvLyAgICAgY29uc3QgdXBHbSA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUoR2FtZU1vZGVsLmlucy5Hcm91bmRMaXN0LCBwb3MpO1xuICAgIC8vICAgICBpZiAodXBHbSAmJiB1cEdtLmlzUGFzc2FibGUpIHtcbiAgICAvLyAgICAgICAgIHRoaXMubm90aWZ5RmFsbChHYW1lTW9kZWwuaW5zLmZpbmROZXh0Tm90UGFzc2JsZVBvcyhwb3MsIGNjLnYyKDAsIC0xKSkpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICogIOajgOa1i+S4iuaWueaYr+WQpuacieWPr+iQveS4i+eahOWFg+e0oCFcbiAgICAgKi9cbiAgICBwdWJsaWMgbm90aWZ5Um91bmRGYWxsKCkge1xuICAgICAgICBHYW1lTW9kZWwuaW5zLnRlc3RGaW5kQ2FuRmFsbENlbGwodGhpcy5wb3MsIHRoaXMuX2Rlc3RvcnlHcm91cCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBub3RpZnlQbHVnRXZlbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gQ2VsbFR5cGUuQnJva2VuQ29uY2gpIHtcbiAgICAgICAgICAgIEdhbWVNb2RlbC5pbnMubm90aWZ5UGx1ZyhHaXJsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuabtOaWsOenu+WKqOWcsOWdl+eahOi+ueeVjOaYvuekuiAqL1xuICAgIHByaXZhdGUgX3VwZGF0ZUdyb3VuZFZpZXcoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzR3JvdW5kICYmIHRoaXMuZXh0Q3RybCkge1xuICAgICAgICAgICAgdGhpcy5leHRDdHJsLnNob3dHcm91bmQoKTtcbiAgICAgICAgICAgIHRoaXMuZXh0Q3RybC51cGRhdGVHcm91bmRWaWV3KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirmmK/lkKblt7Lnu4/ooqvlm7rlrprkvY/kuoYgKi9cbiAgICBwdWJsaWMgaXNOb3RGaXhlZCgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRydWU7XG4gICAgICAgIC8v5qOA5rWL5LiK5bGCXG4gICAgICAgIGlmICh0aGlzLmJpbmRVcEdNb2RlbCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5iaW5kVXBHTW9kZWwuaXNDYW5GYWxsKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgQ2VsbFR5cGUuQ29uY2g6XG4gICAgICAgICAgICBjYXNlIENlbGxUeXBlLkdpcmw6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2VcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGFydEZhbGwoZGlyOiBjYy5WZWMyID0gbnVsbCkge1xuICAgICAgICB0aGlzLmZhbGxEaXIgPSBkaXIgfHwgY2MudjIoMCwgMSk7XG4gICAgICAgIHRoaXMuX2lzRmFsbCA9IHRydWU7XG4gICAgICAgIEdhbWVNb2RlbC5pbnMuTG9jay5sb2NrRmFsbFBvcyh0aGlzLnBvcy5hZGQodGhpcy5mYWxsRGlyKSwgdGhpcy5wb3MpO1xuICAgICAgICBFdmVudE1nci5pbnMuc2VuZChFdmVudC5Tb3VuZC5QbGF5U291bmRFZmYsIEF1ZGlvSUQuQ2VsbEZhbGwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RlbGV0ZU91dE9mR3JpZENlbGwoKSB7XG4gICAgICAgIGNvbnN0IGdyb3VuZENlbGwgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuR3JvdW5kTGlzdCwgdGhpcy5wb3MpXG4gICAgICAgIGlmICghZ3JvdW5kQ2VsbCB8fCBncm91bmRDZWxsLmdldFR5cGUoKSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmV4dEN0cmwgJiYgdGhpcy5leHRDdHJsLnByZURlc3RvcnkoKTtcbiAgICAgICAgICAgIC8v6Kej6ZSBXG4gICAgICAgICAgICBjb25zdCBuZXh0UG9zID0gdGhpcy5wb3MuYWRkKHRoaXMuZmFsbERpcilcbiAgICAgICAgICAgIEdhbWVNb2RlbC5pbnMuTG9jay51bkxvY2tCb3JuUG9zKG5leHRQb3MpO1xuICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5Mb2NrLnVuTG9ja0ZhbGxMb2NrQnlLZXkodGhpcy5wb3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdG9wRmFsbCgpIHtcbiAgICAgICAgdGhpcy5leHRDdHJsLnBsYXlGYWxsT3ZlckFuaSgpO1xuICAgICAgICB0aGlzLl9pc0ZhbGwgPSBmYWxzZTtcbiAgICAgICAgR2FtZU1vZGVsLmlucy5jb21wbGV0RmFsbCh0aGlzLl9kZXN0b3J5R3JvdXAsIHRoaXMpO1xuICAgICAgICBHYW1lTW9kZWwuaW5zLnJlbW92ZUZhbGxEaWN0KHRoaXMpO1xuICAgICAgICB0aGlzLl9kZWxldGVPdXRPZkdyaWRDZWxsKCk7XG4gICAgICAgIGlmICghdGhpcy5pc0RlYXRoKSB0aGlzLl9kZXN0b3J5R3JvdXAgPSBudWxsO1xuICAgIH1cblxuICAgIC8qKumHjee9ruWFg+e0oOeahOS4i+iQveaWueWQkSAqL1xuICAgIHB1YmxpYyByZXNldEZhbGxEaXIoZGlyOiBjYy5WZWMyID0gbnVsbCkge1xuICAgICAgICB0aGlzLmZhbGxEZXMgPSBudWxsO1xuICAgICAgICBHYW1lTW9kZWwuaW5zLkxvY2sudW5Mb2NrRmFsbExvY2tCeUtleSh0aGlzLnBvcyk7XG4gICAgICAgIHRoaXMuc3RhcnRGYWxsKGRpcik7XG4gICAgICAgIHRoaXMubm90aWZ5Um91bmRGYWxsKCk7XG4gICAgfVxuXG4gICAgLyoq5Zyw6Z2i6KKr6Kej57uRICovXG4gICAgcHVibGljIHVuQmluZEdyb3VuZChnbTogR3JvdW5kQ2VsbE1vZGVsKSB7XG4gICAgICAgIC8v5LiO5Zyw6Z2i6Kej57uRLOajgOa1i+W9k+WJjeWcsOmdouaYr+WQpuacieS8oOmAgemXqCBcbiAgICAgICAgaWYgKGdtLmlzUG9ydGFsT3V0KCkpIHtcbiAgICAgICAgICAgIC8v5om+5Yiw5Lyg6YCB6Zi155qE5YWl5Y+jIVxuICAgICAgICAgICAgY29uc3QgcG9ydGFsUG9zID0gR2FtZU1vZGVsLmlucy5nZXRVcEdyb3VuZE1vZGVsKCkuZ2V0UG9ydGFsUG9zKGdtLnBvcnRhbElkeCk7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShHYW1lTW9kZWwuaW5zLkNlbGxMaXN0LCBwb3J0YWxQb3MuaW4pO1xuICAgICAgICAgICAgLy/mv4Dlj5HlhaXlj6PnmoTkvKDpgIHpmLVcbiAgICAgICAgICAgIGNlbGwgJiYgY2VsbC5vbk1zZyhNc2dUeXBlLlBvcnRhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirnu5HlrprlnLDpnaLlhYPntKAgKi9cbiAgICBwdWJsaWMgYmluZEdyb3VuZChtb2RlbDogYW55LCBpc1VwOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCFtb2RlbCkgcmV0dXJuO1xuICAgICAgICBpZiAoaXNVcCkge1xuICAgICAgICAgICAgaWYgKG1vZGVsLmdldFR5cGUoKSAhPSBVcEdyb3VuZFR5cGUuTm9uZSkgdGhpcy5iaW5kVXBHTW9kZWwgPSBtb2RlbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChtb2RlbC5nZXRUeXBlKCkgIT0gbnVsbCkgdGhpcy5iaW5kR01vZGVsID0gbW9kZWw7XG4gICAgICAgIH1cbiAgICAgICAgbW9kZWwub25CaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIC8v5L2N572u5Y+R55Sf5pS55Y+YXG4gICAgcHVibGljIG9uQ2hhbmdlUG9zKHBvczogY2MuVmVjMikge1xuICAgICAgICB0aGlzLm9uVW5CaW5kKHRoaXMucG9zKTtcbiAgICAgICAgLy/ph43mlrDnu5HlrprnjrDmnInnmoTlhYPntKDkvY1cbiAgICAgICAgQ29tbW9uLnNhZmVTZXQyQXJyYXlWYWx1ZShHYW1lTW9kZWwuaW5zLkNlbGxMaXN0LCBwb3MsIHRoaXMpO1xuICAgICAgICAvL+mHjeaWsOe7keWumuWcsOmdolxuICAgICAgICB0aGlzLmJpbmRHcm91bmQoQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShHYW1lTW9kZWwuaW5zLkdyb3VuZExpc3QsIHBvcykpO1xuICAgICAgICAvL+S4iuWxguWFg+e0oOW6lOivpei3n+edgOWfuuehgOWFg+e0oOS4gOi1t+iQvS4gIFxuICAgICAgICB0aGlzLmJpbmRVcEdNb2RlbCAmJiAodGhpcy5iaW5kVXBHTW9kZWwucG9zID0gcG9zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UmFuZG9tVHlwZShpc0luaXQ6IGJvb2xlYW4gPSBmYWxzZSwgbWFwSW5kZXg6IG51bWJlciA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5pc1JhbmRvbSA9IHRydWU7XG4gICAgICAgIGNvbnN0IHRlbXBUeXBlID0gR2FtZU1vZGVsLmlucy5nZXRSYW5kb21DZWxsVHlwZSgpO1xuICAgICAgICBpZiAoQ29tbW9uLmlzQm9tYlR5cGUodGVtcFR5cGUpICYmICFpc0luaXQpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHRlbXBUeXBlO1xuICAgICAgICAgICAgdGhpcy5pbml0Qm9tYk1vZGVsKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09IHRlbXBUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFJhbmRvbVR5cGUoaXNJbml0LCBtYXBJbmRleCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0ZW1wVHlwZTtcbiAgICAgICAgICAgIGNvbnN0IGlzeHggPSBHYW1lTW9kZWwuaW5zLmNoZWNrUG9pbnQodGhpcy5wb3MsIG51bGwsIG1hcEluZGV4KTtcbiAgICAgICAgICAgIGlmIChpc0luaXQgJiYgKEdhbWVNb2RlbC5pbnMuY2hlY2tJc05vSW5pdENyZWF0ZSh0ZW1wVHlwZSkgfHwgaXN4eCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFJhbmRvbVR5cGUoaXNJbml0LCBtYXBJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNldFR5cGVBdHRyaWJ1dGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgdHJpZ2dlclBvcnRhbChwb3M6IHsgaW46IGNjLlZlYzIsIG91dDogY2MuVmVjMiB9KSB7XG4gICAgICAgIC8vIOagh+iusOWHhuWkh+S8oOmAgeeahOWFg+e0oCEgIFxuICAgICAgICBpZiAoIXRoaXMuZXh0Q3RybCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzUG9ydGFsaW5nID0gdHJ1ZTtcbiAgICAgICAgR2FtZU1vZGVsLmlucy5Mb2NrLmxvY2tCb3JuUG9zKHBvcy5vdXQpO1xuICAgICAgICBjb25zdCByT3V0ID0gYXdhaXQgdGhpcy5leHRDdHJsLnBvcnRhbE91dCgpO1xuICAgICAgICBpZiAock91dCkge1xuICAgICAgICAgICAgLy/lpoLmnpzov5nmmK/kuKrlh7rnlJ/ngrku5YiZ5Yig6Zmk5Ye655Sf54K56ZSBXG4gICAgICAgICAgICBHYW1lTW9kZWwuaW5zLkxvY2sudW5Mb2NrQm9yblBvcyhwb3Mub3V0KTtcbiAgICAgICAgICAgIENvbW1vbi5zYWZlU2V0MkFycmF5VmFsdWUoR2FtZU1vZGVsLmlucy5DZWxsTGlzdCwgdGhpcy5wb3MsIG51bGwpO1xuICAgICAgICAgICAgLy/pgJrnn6XkuIrpnaLlj6/ku6XlvIDlp4vmjonokL3kuoYuXG4gICAgICAgICAgICAvLyB0aGlzLm5vdGlmeVJvdW5kRmFsbChmYWxzZSk7XG4gICAgICAgICAgICAvLyB0aGlzLl9pc0ZhbGwgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLm5vdGlmeVJvdW5kRmFsbCgpO1xuICAgICAgICAgICAgdGhpcy5wb3MgPSBwb3Mub3V0O1xuICAgICAgICAgICAgdGhpcy5pc1BvcnRhbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5leHRDdHJsLnBvcnRhbEluKCkudGhlbihySW4gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChySW4gJiYgIXRoaXMuX2lzRmFsbCkge1xuICAgICAgICAgICAgICAgICAgICAvL+ajgOa1i+S4i+aWueaYr+WQpuWPr+S7peS4i+iQvVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRpbnVlMkZhbGwoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuY29udGludWUyRmFsbCgpKSB7XG4gICAgICAgICAgICAgICAgLy/kvKDpgIHlrozmiJDlpoLmnpzmsqHmnInnp7vliqgs5YiZ5qOA5rWL5LiA5qyh5piv5ZCm5pyJ5raI6Zmk55qEIVxuICAgICAgICAgICAgICAgIEdhbWVNb2RlbC5pbnMuY2hlY2tIYXZhRWxpbWF0ZSh0aGlzLnBvcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlR3JvdW5kVmlldygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5leHRDdHJsLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgICAgICBHYW1lTW9kZWwuaW5zLlBvcnRhbERpY3QuZGVsZXRlKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5qOA5rWL6K+l5L2N572u5piv5ZCm5pyJ5bey57uP5Yiw5Ye65Y+j55qE54mp5Lu2ICovXG4gICAgcHVibGljIGNoZWNrSXNFeGl0KHBvczogY2MuVmVjMikge1xuICAgICAgICBpZiAodGhpcy50eXBlID09IENlbGxUeXBlLkljZUNyZWFtKSB7XG4gICAgICAgICAgICBjb25zdCBnbSA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUoR2FtZU1vZGVsLmlucy5Hcm91bmRMaXN0LCBwb3MpO1xuICAgICAgICAgICAgaWYgKGdtICYmIGdtLmlzRXhpdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxpbWF0ZVNlbGYobnVsbCk7XG4gICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5JY2VDcmVhbVBvb2wuZGVsZXRlKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0NhblRyaWdnZXJQb3J0YWwoZ206IEdyb3VuZENlbGxNb2RlbCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuaXNFbXB0eSAmJiBnbSAmJiBnbS5pc1BvcnRhbEluKCkgJiYgdGhpcy5pc05vdEZpeGVkKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbGltYXRlU2VsZih0eXBlOiBFbGltYXRlVHlwZSkge1xuICAgICAgICBHYW1lTW9kZWwuaW5zLmV4ZWNFbGltYXRlT25lKHRoaXMucG9zLCB0eXBlIHx8IEVsaW1hdGVUeXBlLkRlZmF1bHQsIHRydWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZXhlY1BvcnRhbCgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBpZiAoR2FtZU1vZGVsLmlucy5Qb3J0YWxEaWN0Lmhhcyh0aGlzKSkge1xuICAgICAgICAgICAgLy/mraPlnKjkvKDpgIHkuK1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGdyb3VkTW9kZWwgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuR3JvdW5kTGlzdCwgdGhpcy5wb3MpO1xuICAgICAgICBpZiAoIWdyb3VkTW9kZWwpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAoZ3JvdWRNb2RlbC5pc1BvcnRhbE91dCgpKSB7XG4gICAgICAgICAgICBjb25zdCBwb3J0YWxQb3MgPSBHYW1lTW9kZWwuaW5zLmdldFVwR3JvdW5kTW9kZWwoKS5nZXRQb3J0YWxQb3MoZ3JvdWRNb2RlbC5wb3J0YWxJZHgpO1xuICAgICAgICAgICAgY29uc3QgcG9ydGFsSW5DZWxsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShHYW1lTW9kZWwuaW5zLkNlbGxMaXN0LCBwb3J0YWxQb3MuaW4pO1xuICAgICAgICAgICAgaWYgKHBvcnRhbEluQ2VsbCAmJiAhcG9ydGFsSW5DZWxsLmlzUmVtb3ZlZCgpICYmICFwb3J0YWxJbkNlbGwuaXNGYWxsKSB7XG4gICAgICAgICAgICAgICAgcG9ydGFsSW5DZWxsLm9uTXNnKE1zZ1R5cGUuUG9ydGFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5pc0RlYXRoICYmIHRoaXMuaXNDYW5UcmlnZ2VyUG9ydGFsKGdyb3VkTW9kZWwpKSB7XG4gICAgICAgICAgICAvL+WumuS9jeS8oOmAgeiKgueCuVxuICAgICAgICAgICAgY29uc3QgcG9ydGFsUG9zID0gR2FtZU1vZGVsLmlucy5nZXRVcEdyb3VuZE1vZGVsKCkuZ2V0UG9ydGFsUG9zKGdyb3VkTW9kZWwucG9ydGFsSWR4KTtcbiAgICAgICAgICAgIC8v5r+A5rS75Lyg6YCB6Zi1IFxuICAgICAgICAgICAgaWYgKEdhbWVNb2RlbC5pbnMuaXNDYW5GYWxsKHBvcnRhbFBvcy5vdXQsIHRoaXMucG9zKSAmJiAhR2FtZU1vZGVsLmlucy5Mb2NrLmlzQm9yblBvc0xvY2tlZChwb3J0YWxQb3Mub3V0KSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWVcbiAgICAgICAgICAgICAgICBHYW1lTW9kZWwuaW5zLlBvcnRhbERpY3QuYWRkKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlclBvcnRhbChwb3J0YWxQb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSBleGVjQ2hlY2tFbGltYXRlKCkge1xuICAgIC8vICAgICBHYW1lTW9kZWwuaW5zLmNoZWNrSGF2YUVsaW1hdGUodGhpcy5wb3MpO1xuICAgIC8vICAgICB0aGlzLmNoZWNrSXNFeGl0KHRoaXMucG9zKTtcbiAgICAvLyB9XG5cbiAgICBwcml2YXRlIGV4ZWNDb21wbGV4Qm9tYihkYXRhOiB7IHR5cGUxOiBDZWxsVHlwZSwgdHlwZTI6IENlbGxUeXBlLCBpc0JvYXJkOiBib29sZWFuLCBncm91cElkOiBudW1iZXIgfSkge1xuICAgICAgICBpZiAodGhpcy5ib21iTW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMuYm9tYk1vZGVsLm9uQm9tYk1lcmdlQm9tYihkYXRhLnR5cGUxLCBkYXRhLnR5cGUyLCB0aGlzLCBkYXRhLmdyb3VwSWQpO1xuICAgICAgICAgICAgaWYgKCFkYXRhLmlzQm9hcmQpIHtcbiAgICAgICAgICAgICAgICBHYW1lTW9kZWwuaW5zLnVwZGF0ZVN0ZXBDb3VudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBleGVjQm9tYihkYXRhOiB7IHBvczogY2MuVmVjMiwgdHlwZT86IENlbGxUeXBlIH0pIHtcbiAgICAgICAgaWYgKHRoaXMuYm9tYk1vZGVsICYmICF0aGlzLmlzUmVtb3ZlZCgpKSB7XG4gICAgICAgICAgICBsZXQgdHlwZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHR5cGUgPSBkYXRhLnR5cGU7XG4gICAgICAgICAgICAgICAgaWYgKCF0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUoR2FtZU1vZGVsLmlucy5DZWxsTGlzdCwgZGF0YS5wb3MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0gdGFyZ2V0LmdldFR5cGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudW5sb2NrQ3JlYXRlQm9tYlBvcygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYm9tYk1vZGVsLmdldFR5cGUoKSA9PSBDZWxsVHlwZS5Cb21iNSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib21iTW9kZWwuZXhlY0JvbWIodGhpcywgdHlwZSwgdGhpcy5fZGVzdG9yeUdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5leGVjRWxpbWF0ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9tYk1vZGVsLmV4ZWNCb21iKHRoaXMsIHR5cGUsIHRoaXMuX2Rlc3RvcnlHcm91cCk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5leGVjRWxpbWF0ZShudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgR3JvdXBJZChpZDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLl9kZXN0b3J5R3JvdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fZGVzdG9yeUdyb3VwID0gaWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IEdyb3VwSWQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc3RvcnlHcm91cDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGZhbGxpbmdEaXIoKTogY2MuVmVjMiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZhbGxEaXI7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc0ZhbGwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0ZhbGw7XG4gICAgfVxuXG4gICAgcHVibGljIGNoYW5nZTJDZWxsKHR5cGU6IENlbGxUeXBlID0gbnVsbCkge1xuICAgICAgICB0aGlzLnNldE5vcm1hbFR5cGUodHlwZSk7XG4gICAgICAgIC8vIHRoaXMuX2Rlc3RvcnlHcm91cCA9IG51bGw7ICAvL+W9k+WIneaYr+WboOS4uuS7gOS5iOiuvuiuoeaIkOi/memHjOimgee9ruepuuWRoiA/Pz8/Pz9cbiAgICAgICAgR2FtZU1vZGVsLmlucy5jaGVja0hhdmFFbGltYXRlKHRoaXMucG9zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2hhbmdlMkJvbWIodHlwZTogQ2VsbFR5cGUgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IDxhbnk+e307XG4gICAgICAgIHRoaXMuZGF0YS50eXBlID0gdHlwZSB8fCBVdGlsLlRvb2wucmFuZ2VJbnQoMTAsIENlbGxUeXBlLkJvbWI0KTtcbiAgICAgICAgLy8gdGhpcy5fZGVzdG9yeUdyb3VwID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbml0VHlwZShmYWxzZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGlzQ2FuQmVzaWRlRWxpbWF0ZSgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnR5cGUgPT0gQ2VsbFR5cGUuQmFuYW5hIHx8IHRoaXMudHlwZSA9PSBDZWxsVHlwZS5Cb3R0bGVDYXBzIHx8IHRoaXMudHlwZSA9PSBDZWxsVHlwZS5Hcm91bmQpXG4gICAgfVxuXG4gICAgcHVibGljIGlzQ2FuRWxpbWF0ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmJpbmRVcEdNb2RlbCB8fCAodGhpcy5iaW5kVXBHTW9kZWwgJiYgIXRoaXMuYmluZFVwR01vZGVsLmlzSGF2YVNwZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGlzRmFsbGluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmlzRmFsbCAmJiAodGhpcy5zcGVlZC55ID4gMCB8fCB0aGlzLnNwZWVkLnggPiAwKSlcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNSZW1vdmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0RlYXRoICYmICghdGhpcy5leHREYXRhKTsgLy90aGlzLmlzRGVzdG9yeWVkO1xuICAgIH1cblxuICAgIC8qKue+juS6uumxvOW+gOS4i+i4qeS4gOasoSAqL1xuICAgIHB1YmxpYyBtZXJtYWlkSnVtcFRvKHRhcmdldFBvczogY2MuVmVjMikge1xuICAgICAgICBpZiAodGhpcy5leHRDdHJsKSB7XG4gICAgICAgICAgICBHYW1lTW9kZWwuaW5zLkxvY2subG9ja0ZhbGxQb3ModGFyZ2V0UG9zLCB0aGlzLnBvcywgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmV4dEN0cmwubWVybWFpZEp1bXBUbyh0YXJnZXRQb3MsICgpID0+IHtcbiAgICAgICAgICAgICAgICBDb21tb24uc2FmZVNldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuQ2VsbExpc3QsIHRoaXMucG9zLCBudWxsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlT3Zlcih0YXJnZXRQb3MpO1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5Um91bmRGYWxsKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuS8oOi+k+W4puenu+WKqCAqL1xuICAgIHB1YmxpYyBjb252ZXllck1vdmVUbyh0YXJnZXRQb3M6IGNjLlZlYzIsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICBpZiAodGhpcy5leHRDdHJsKSB7XG4gICAgICAgICAgICBHYW1lTW9kZWwuaW5zLkxvY2subG9ja0ZhbGxQb3ModGFyZ2V0UG9zLCB0aGlzLnBvcywgdHJ1ZSk7XG4gICAgICAgICAgICBDb21tb24uc2FmZVNldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuQ2VsbExpc3QsIHRoaXMucG9zLCBudWxsKTtcbiAgICAgICAgICAgIHRoaXMuZXh0Q3RybC5tb3ZlVG8odGFyZ2V0UG9zLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW92ZU92ZXIodGFyZ2V0UG9zKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tb3ZlT3Zlcih0YXJnZXRQb3MpIHtcbiAgICAgICAgR2FtZU1vZGVsLmlucy5Mb2NrLnVuTG9ja0ZhbGxQb3ModGFyZ2V0UG9zKTtcbiAgICAgICAgdGhpcy5wb3MgPSB0YXJnZXRQb3M7XG4gICAgfVxuXG4gICAgcHVibGljIHByZURlc3RvcnkoKSB7XG4gICAgICAgIHN1cGVyLmRlc3RvcnkoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVzdG9yeSh0VHlwZT86IEVsaW1hdGVUeXBlKSB7XG4gICAgICAgIHRoaXMuX2lzRGVhdGggPSB0cnVlO1xuICAgICAgICBpZiAoIXRoaXMuaXNFbXB0eSkge1xuICAgICAgICAgICAgTS5ydW50aW1lLmFkZENvbGxlY3RDb3VudCh0aGlzLnR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIC8v5Y+R6YCB5o+S5Lu25LqL5Lu2LOiuqeaPkuS7tuiHquW3seWGs+WumuaYr+WQpuWBmuWkhOeQhlxuICAgICAgICB0aGlzLm5vdGlmeVBsdWdFdmVudCgpO1xuICAgICAgICAvL+mAmuefpee7keWumuWcsOmdoizlhYPntKDmtojpmaQhXG4gICAgICAgIGlmICh0aGlzLmJpbmRHTW9kZWwgJiYgIXRoaXMuaXNFbXB0eSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kR01vZGVsLm9uTXNnKE1zZ1R5cGUuRWxpbWF0ZSwgeyB0eXBlOiB0VHlwZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5pc1JvY2tldCkge1xuICAgICAgICAgICAgLy/mo4DmtYvmmK/lkKbmnInpmaTojYnmnLpcbiAgICAgICAgICAgIGNvbnN0IGhhdmVQb3dlckNvbGxlY3QgPSBHYW1lTW9kZWwuaW5zLkNvbGxlY3RNb2RlbC51cGRhdGVDb2xsZWN0UG93ZXJDZWxsKHRoaXMpO1xuICAgICAgICAgICAgLy/mo4DmtYvlrozmiJDlm57mlLYhISEgXG4gICAgICAgICAgICBpZiAoIWhhdmVQb3dlckNvbGxlY3QgJiYgTS5ydW50aW1lLkdhbWVTdGF0ZSAhPSBHYW1lU3RhdGUuRW5kKSB7XG4gICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy51cGRhdGVDb2xsZWN0Q291bnQodGhpcy50eXBlLCB0aGlzLmdldFBvc2l0aW9uKCksIHRUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL+ino+mUgeWHuueUn+eCuSAo6L+Z5Liq5pe25YCZ6Kej6ZSB5Ye655Sf54K5LOWmguaenOacieato+WcqOaOieiQveeahOaWsOeUn+WFg+e0oCzkvJrlr7zoh7Tph43lpI3mjonokL0pXG4gICAgICAgIC8vIEdhbWVNb2RlbC5pbnMuTG9jay51bkxvY2tCb3JuUG9zKHRoaXMucG9zKTtcblxuICAgICAgICBpZiAoR2FtZU1vZGVsLmlucy5faXNCb3JuKHRoaXMucG9zKSkge1xuICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5jaGVja05lZWRDcmVhdGVOZXdDZWxsKHRoaXMucG9zLCB0aGlzLl9kZXN0b3J5R3JvdXApO1xuICAgICAgICB9XG5cbiAgICAgICAgR2FtZU1vZGVsLmlucy5yZW1vdmVEZWF0aERpY3QodGhpcyk7XG4gICAgICAgIC8v5aaC5p6c5L2N572u6KKr54K45by56ZSB5L2PLOimgeino+mUgeWQlz8g5Lya5Ye66Zeu6aKY5ZCXPyBcbiAgICAgICAgaWYgKENvbW1vbi5pc0JvbWJUeXBlKHRoaXMuZ2V0VHlwZSgpKSkge1xuICAgICAgICAgICAgdGhpcy51bmxvY2tDcmVhdGVCb21iUG9zKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy/plIDmr4HlkI7mmK/lkKbopoHlsIbku5bnp7vlh7rmo4vnm5g/Pz8/P1xuICAgICAgICAvLyBDb21tb24uc2FmZVNldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuQ2VsbExpc3QsIHRoaXMucG9zLCBudWxsKTtcbiAgICAgICAgdGhpcy50eXBlID0gQ2VsbFR5cGUuRW1wdHk7XG5cbiAgICAgICAgLy/op6PpmaTnu5HlrprnmoTop4blm75cbiAgICAgICAgdGhpcy5pc0Rlc3RvcnllZCA9IHRydWU7XG4gICAgICAgIC8v56e75Ye65o6J6JC9XG4gICAgICAgIEdhbWVNb2RlbC5pbnMucmVtb3ZlRmFsbERpY3QodGhpcyk7XG4gICAgICAgIC8v6YCa55+l5o6J6JC9IVxuICAgICAgICB0aGlzLm5vdGlmeVJvdW5kRmFsbCgpO1xuICAgICAgICAvL+WbnuaUtuWFpeaxoFxuICAgICAgICBHYW1lTW9kZWwuaW5zLmZyZWVDZWxsKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX2Rlc3RvcnlHcm91cCA9IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGZvcmNlZFJlc2V0VHlwZSh0eXBlOiBDZWxsVHlwZSkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIH1cblxuICAgIC8qKuS4i+iQveW3sue7j+aUueWPmOS9jee9riAqL1xuICAgIHByaXZhdGUgaXNHcmlkUG9zQ2hhbmdlZChuZXh0cG9zOiBjYy5WZWMyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmZhbGxEaXIueCAhPSAwICYmIHRoaXMuZmFsbERpci55ICE9IDApIHtcbiAgICAgICAgICAgIHJldHVybiAobmV4dHBvcy54ICE9IHRoaXMucG9zLnggJiYgbmV4dHBvcy55ICE9IHRoaXMucG9zLnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChuZXh0cG9zLnggIT0gdGhpcy5wb3MueCB8fCBuZXh0cG9zLnkgIT0gdGhpcy5wb3MueSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmo4DmtYvmmK/lkKblt7Lnu4/nu5PmnZ/mjonokL0hXG4gICAgICogQHBhcmFtIG5leHRDZWxsIFxuICAgICAqIEBwYXJhbSBuZXh0UG9zIFxuICAgICAqIEByZXR1cm5zIGJvb2xlYW4g5piv5ZCm5bey57uP57uT5p2fIVxuICAgICAqL1xuICAgIHByaXZhdGUgaXNGYWxsT3ZlcihuZXh0UG9zOiBjYy5WZWMyKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgLy/mo4DmtYvkuIvkuKrkvY3nva7mmK/lkKblt7Lnu4/kuI3liqjkuoYhXG4gICAgICAgIGNvbnN0IG5leHRDZWxsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShHYW1lTW9kZWwuaW5zLkNlbGxMaXN0LCBuZXh0UG9zKTtcbiAgICAgICAgaWYgKG5leHRDZWxsICYmICFuZXh0Q2VsbC5pc0RlYXRoICYmICFuZXh0Q2VsbC5pc0VtcHR5ICYmICFuZXh0Q2VsbC5pc0ZhbGwpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoR2FtZU1vZGVsLmlucy5pc0JvcmRlcihuZXh0UG9zKSkge1xuICAgICAgICAgICAgLy/mo4DmtYvkuIvkuKrkvY3nva7mmK/lkKblt7Lnu4/mmK/ovrnnlYzkuoYhXG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCFHYW1lTW9kZWwuaW5zLmlzUGFzc2FibGUobmV4dFBvcywgdGhpcy5wb3MpKSB7XG4gICAgICAgICAgICAvL+ajgOa1i+S4i+S4quS9jee9ruaYr+WQpuaciemanOeijeeJqVxuICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOinpuWPkeWdkOagh+aUueWPmCFcbiAgICAgKiBAcGFyYW0gcG9zIOaUueWPmOeahOebruagh+WdkOaghyFcbiAgICAgKiBAcmV0dXJucyBuZXh0IENlbGxcbiAgICAgKi9cbiAgICBwcml2YXRlIHRyaWdnZXJGYWxsQ2hhbmdlUG9zKHBvczogY2MuVmVjMik6IGNjLlZlYzIge1xuICAgICAgICAvL+i/mei+uemcgOimgeWkhOeQhizlpoLmnpzliY3pnaLlhYPntKDov5jmraPlnKjnp7vliqjlubbmsqHmnInlh7rmoLws6L+Z5pe25YCZ6L+b5YWl5paw5L2N572u5Lya5a+86Ie05YmN6Z2i5YWD57Sg5ri456a7XG4gICAgICAgIHBvcyA9IEdhbWVNb2RlbC5pbnMuZ2V0Tm90UGFzc2JsZVBvc3MocG9zKTtcblxuICAgICAgICBjb25zdCB0ZXN0Q2VsbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUoR2FtZU1vZGVsLmlucy5DZWxsTGlzdCwgcG9zKTtcbiAgICAgICAgaWYgKHRlc3RDZWxsKSB7XG4gICAgICAgICAgICBpZiAoIXRlc3RDZWxsLmlzRGVhdGggJiYgIXRlc3RDZWxsLmlzRW1wdHkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGVzdENlbGwuaXNFbXB0eSAmJiAhR2FtZU1vZGVsLmlucy5pc0hhdmFTcGUocG9zKSkge1xuICAgICAgICAgICAgICAgIHRlc3RDZWxsLmV4dEN0cmwgJiYgdGVzdENlbGwuZXh0Q3RybC5wcmVEZXN0b3J5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy/lsIbljp/mnaXnmoTkvY3nva7nva7nqbohXG4gICAgICAgIGlmIChDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuQ2VsbExpc3QsIHRoaXMucG9zKSA9PSB0aGlzKSB7XG4gICAgICAgICAgICBDb21tb24uc2FmZVNldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuQ2VsbExpc3QsIHRoaXMucG9zLCBudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v6Kej6ZSB6YeK5pS+5b2T5YmN5L2N572u6ZSB5LiO5Ye655Sf6ZSBXG4gICAgICAgIGlmIChHYW1lTW9kZWwuaW5zLl9pc0Jvcm4ocG9zKSkge1xuICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5Mb2NrLnVuTG9ja0Jvcm5Qb3MocG9zKTtcbiAgICAgICAgICAgIEdhbWVNb2RlbC5pbnMucmVtb3ZlTmV3Q3JlYXRlQ2VsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBHYW1lTW9kZWwuaW5zLkxvY2sudW5Mb2NrRmFsbExvY2tCeUtleSh0aGlzLnBvcyk7XG5cbiAgICAgICAgLy/mlL7lhaXmlrDnmoTkvY3nva4hXG4gICAgICAgIHRoaXMucG9zID0gcG9zO1xuXG4gICAgICAgIC8v5aaC5p6c5piv57uT5p2f55qE5pe25YCZXG4gICAgICAgIC8vIGlmIChNLnJ1bnRpbWUuR2FtZVN0YXRlID09IEdhbWVTdGF0ZS5FbmQgJiYgdGhpcy5wb3MueSA+PSBHYW1lTW9kZWwuaW5zLkNlbGxMaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuZXh0Q3RybCAmJiB0aGlzLmV4dEN0cmwucGxheUJvbWJTaW5nbGVEZXN0b3J5RWZmKCk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvL+WIpOaWreebtOS4i+aYr+WQpuWPr+S7peaOieiQvVxuICAgICAgICBpZiAoR2FtZU1vZGVsLmlucy5pc0NhbkZhbGwodGhpcy5wb3MuYWRkKGNjLnYyKDAsIDEpKSwgdGhpcy5wb3MpKSB7XG4gICAgICAgICAgICB0aGlzLmZhbGxEaXIgPSBjYy52MigwLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v5aaC5p6c6L+Z5pe25YCZ5piv5pac552A6LWwLOmcgOimgeWIpOaWreaYr+WQpuWPr+S7peaWnOedgOi1sCAgXG4gICAgICAgIGlmICh0aGlzLmZhbGxEaXIueCAhPSAwICYmICFHYW1lTW9kZWwuaW5zLmlzQ2FuRGlhZ29uYWxseUZhbGwodGhpcy5wb3MuYWRkKHRoaXMuZmFsbERpciksIHRoaXMpKSB7XG4gICAgICAgICAgICB0aGlzLmZhbGxEaXIgPSBjYy52MigwLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuZXh0cG9zID0gR2FtZU1vZGVsLmlucy5nZXROb3RQYXNzYmxlUG9zcyh0aGlzLnBvcy5hZGQodGhpcy5mYWxsRGlyKSk7XG4gICAgICAgIHJldHVybiBuZXh0cG9zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOajgOa1i+e7p+e7reW+gOS4i+enu+WKqCFcbiAgICAgKiBAcmV0dXJuIOWmguaenOS8mue7p+e7reenu+WKqOWImSB0cnVlIFxuICAgICAqL1xuICAgIHB1YmxpYyBjb250aW51ZTJGYWxsKGlzQ3JlYXRlQm9tYjogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgbGV0IGRpcnMgPSBbY2MudjIoMCwgMSksIGNjLnYyKC0xLCAxKSwgY2MudjIoMSwgMSldO1xuICAgICAgICAvL+WmguaenOaji+ebmOmHjOayoeaciei/meS4quS9jee9ri5cbiAgICAgICAgaWYgKCFDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuQ2VsbExpc3QsIHRoaXMucG9zKSkge1xuICAgICAgICAgICAgZGlycyA9IFtjYy52MigwLCAxKV07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkaXIgPSBkaXJzW2ldO1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0UG9zID0gdGhpcy5wb3MuYWRkKGRpcik7XG4gICAgICAgICAgICBpZiAodGhpcy5pc05vdEZpeGVkKCkgJiZcbiAgICAgICAgICAgICAgICAhR2FtZU1vZGVsLmlucy5pc0JvcmRlcih0YXJnZXRQb3MpICYmXG4gICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5pc0NhbkZhbGwodGFyZ2V0UG9zLCB0aGlzLnBvcywgZmFsc2UsIGlzQ3JlYXRlQm9tYikpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGlyLnggIT0gMCAmJiAhR2FtZU1vZGVsLmlucy5pc0NhbkRpYWdvbmFsbHlGYWxsKHRhcmdldFBvcywgdGhpcykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fZGVzdG9yeUdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuR3JvdXBJZCA9IEdhbWVNb2RlbC5pbnMuc2VxLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5hZGRGYWxsQ2VsbCh0aGlzLCBkaXIsIHRoaXMuX2Rlc3RvcnlHcm91cCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZnlSb3VuZEZhbGwoKTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6YeN572u5YWD57Sg54q25oCBKOWBnOatouenu+WKqClcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlc2V0RmFsbFN0YXRlKCkge1xuICAgICAgICB0aGlzLnNwZWVkID0gY2MudjIoMCwgMCk7XG4gICAgICAgIC8vIHRoaXMuZmFsbERpciA9IGNjLnYyKDAsIDEpO1xuICAgICAgICB0aGlzLmZhbGxEZXMgPSBudWxsO1xuICAgICAgICAvL+ino+W8gOWOn+WFiOeahOmUgSzpobrluo/kuI3og73plJkhISEhXG4gICAgICAgIEdhbWVNb2RlbC5pbnMuTG9jay51bkxvY2tGYWxsTG9ja0J5S2V5KHRoaXMucG9zKTtcbiAgICAgICAgLy/lvIDlp4vmo4DmtYvmmK/lkKbpnIDopoHnu6fnu63mlpznnYDnp7vliqghIFxuICAgICAgICBjb25zdCBpc09ibCA9IHRoaXMuY29udGludWUyRmFsbCgpOyAgLy8gIHRoaXMub2JsaXF1ZU1vdmUoKTtcbiAgICAgICAgY29uc3QgaXNQb3IgPSB0aGlzLmV4ZWNQb3J0YWwoKTtcbiAgICAgICAgaWYgKCFpc1BvciAmJiAhaXNPYmwpIHtcbiAgICAgICAgICAgIHRoaXMub25Nc2coTXNnVHlwZS5GYWxsRW5kKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBseVNwZWVkKG5leHRwb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgdGhpcy5zcGVlZCA9IGNjLnYyKDAsIDApO1xuICAgICAgICB0aGlzLmZhbGxEZXMgPSBDb21tb24uZ2V0UG9zKG5leHRwb3MueCwgbmV4dHBvcy55KTtcbiAgICAgICAgaWYgKEdhbWVNb2RlbC5pbnMuaXNDYW5GYWxsKG5leHRwb3MsIHRoaXMucG9zKSkge1xuICAgICAgICAgICAgLy/mlr3liqDpgJ/luqYhXG4gICAgICAgICAgICB0aGlzLnNwZWVkLnggPSB0aGlzLnNwZWVkLnkgPSBHYXBUaW1lLkZhbGxpbmdTcGVlZDsvLyhNLnJ1bnRpbWUuR2FtZVN0YXRlID09IEdhbWVTdGF0ZS5FbmQgPyBHYXBUaW1lLkVuZEZhbGxpbmdTcGVlZCA6IEdhcFRpbWUuRmFsbGluZ1NwZWVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVGYWxsKGR0OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuZXh0Q3RybCkge1xuICAgICAgICAgICAgdGhpcy5leHRDdHJsLm9yZGVybHlVcGRhdGUoZHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHBvc0RldGVjdGlvbihwb3NpdGlvbjogY2MuVmVjMyk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLl9pc0ZhbGwgJiYgIXRoaXMuaXNFbXB0eSkge1xuXG4gICAgICAgICAgICBHYW1lTW9kZWwuaW5zLmlzRmFsbGluZyA9IHRydWU7XG5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJwb3MgPSBDb21tb24uY29udmV0UG9zKHBvc2l0aW9uLmFkZChjYy52MygwLCBDb21tb24uR1JJRF9IIC8gMikpKTtcblxuICAgICAgICAgICAgbGV0IG5leHRwb3MgPSB0aGlzLnBvcy5hZGQodGhpcy5mYWxsRGlyKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzR3JpZFBvc0NoYW5nZWQoY3VycnBvcykpIHtcbiAgICAgICAgICAgICAgICBuZXh0cG9zID0gdGhpcy50cmlnZ2VyRmFsbENoYW5nZVBvcyhjdXJycG9zKSB8fCBuZXh0cG9zO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL+WmguaenOS4i+S4gOS4quS9jee9ruaYr+S4qnBhc3NibGUs5bCx6Lez6L+H6L+Z5LiqcGFzc2JsZeWvu+aJvuS4i+S4gOS4quS9jee9riFcbiAgICAgICAgICAgICAgICBuZXh0cG9zID0gR2FtZU1vZGVsLmlucy5nZXROb3RQYXNzYmxlUG9zcyhuZXh0cG9zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5hcHBseVNwZWVkKG5leHRwb3MpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zcGVlZC5lcXVhbHMoY2MudjIoMCwgMCkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHRDdHJsLnBsYXlGYWxsUGF1c2VBbmkoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5mYWxsRGlyLnggPT0gMCkge1xuICAgICAgICAgICAgICAgIE0ucnVudGltZS5HYW1lU3RhdGUgIT0gR2FtZVN0YXRlLkVuZCAmJiB0aGlzLmV4dEN0cmwucGxheUZhbGxTdGFydEFuaSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5pc0ZhbGxPdmVyKG5leHRwb3MpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRGYWxsU3RhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy/kuIvpnaLlpoLmnpzov5jmnIks57uZ5LiL6Z2i5LiK6ZSBIVxuICAgICAgICAgICAgICAgIEdhbWVNb2RlbC5pbnMuTG9jay5sb2NrRmFsbFBvcyhuZXh0cG9zLCB0aGlzLnBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKGR0KSB7XG4gICAgICAgIHRoaXMuZXh0Q3RybCAmJiB0aGlzLmV4dEN0cmwub3JkZXJseVVwZGF0ZShkdCk7XG4gICAgfVxufSAgICJdfQ==