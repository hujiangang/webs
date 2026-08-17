"use strict";
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