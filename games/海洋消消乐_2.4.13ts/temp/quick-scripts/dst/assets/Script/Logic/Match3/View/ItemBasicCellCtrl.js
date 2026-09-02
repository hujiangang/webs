
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/ItemBasicCellCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '88928TPU7VDA6C9KI6Sae2g', 'ItemBasicCellCtrl');
// Script/Logic/Match3/View/ItemBasicCellCtrl.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var Common_1 = require("../../Common/Common");
var M_1 = require("../../../Base/Manager/M");
var BaseItemView_1 = require("./BaseItemView");
var CellBase_1 = require("../Model/CellBase");
var Constant_1 = require("../../Data/Const/Constant");
var Event_1 = require("../../Data/Const/Event");
var TimeConfig_1 = require("../../Data/Const/TimeConfig");
var Util_1 = require("../../../Base/Utils/Util");
var RotatingCtrl_1 = require("../Control/RotatingCtrl");
var GameModel_1 = require("../Model/GameModel");
var AudioCtrl_1 = require("../../Common/AudioCtrl");
var ResCtrl_1 = require("../ResCtrl");
var CollectModel_1 = require("../Model/CollectModel");
var Apps_1 = require("../../../Base/Apps");
var GroupAnimatCtrl_1 = require("../../Common/GroupAnimatCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AniName = {
    fall: 'fall',
    fallPause: 'fallPause',
    elimate: 'elimate',
    fallOver: 'fallOver',
    bombCreate: 'bombCreate',
    bombIdle: 'bombIdle',
    portalIn: 'portalIn',
    portalOut: 'portalOut',
    prompt: 'prompt',
    collect: 'collect',
    shaking: 'shaking',
    change2cell: 'change2cell'
};
var BombGap = 100;
var SpineCellIdelName = ['beike_xiuxian', 'hengsudan_xiuxian', 'hengsudan_xiuxian2', 'zhangyu_xiuxian', 'idle_haima', '', '', '', 'baozhayu_xiuxian'];
var SpineCellBombName = ['', 'hengsudan_bao', 'hengsudan_bao', '', ''];
var MoveGroundNames = ['up', 'down', 'left', 'right'];
var ItemBasicCellCtrl = /** @class */ (function (_super) {
    __extends(ItemBasicCellCtrl, _super);
    function ItemBasicCellCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cellSprite = null;
        _this.ground = null;
        _this.levelSprite = null;
        _this.lowerNode = null;
        _this.shadowNode = null;
        _this.teshuLight = null;
        _this.BindAddScoreTask = null;
        _this.showType = Constant_1.CellType.Empty;
        _this._showLv = 0;
        _this.animation = null;
        _this.animationState = null;
        _this.moveActionAry = [];
        _this.isRunMove = false;
        _this.isPlayFall = false;
        _this.isPlayBombShocks = false;
        _this.spineCellCtrl = null;
        _this.prefabAnimation = null;
        _this.elimateType = Constant_1.ElimateType.Default;
        _this.elimateSize = 0;
        _this.elimateNotify = null;
        /**锁,动画 */
        _this.portalResolve = null;
        _this.destoryTime = null;
        _this.deathTimeout = 0;
        _this.rotatingCtrl = null;
        _this.createType = null;
        _this.meirenyuJumpPool = [];
        _this.isJumping = false;
        return _this;
    }
    ItemBasicCellCtrl.prototype.onLoad = function () {
    };
    ItemBasicCellCtrl.prototype.init = function (model, createType) {
        _super.prototype.init.call(this, model);
        this.initAnimation();
        this.updatePosition();
        if (!model.isEmpty) {
            this.resetDisplayInfo();
            this.updateDisplay();
            this.BindAddScoreTask = null;
            this.createType = createType;
            if (createType) {
                this.initPlayCreateAnimation(createType);
            }
            else if (Common_1.default.isBombType(model.getType()) || model.getType() == Constant_1.CellType.Fish) {
                this.scheduleOnce(this.playBombIdel.bind(this), 0);
            }
        }
    };
    ItemBasicCellCtrl.prototype.easyInit = function (type) {
        this.resetDisplayInfo();
        this.updateDisplay(type);
    };
    ItemBasicCellCtrl.prototype.exchange = function (targetPos, time, ep) {
        if (this.moveActionAry) {
            this.moveActionAry.push({ t: time, pos: targetPos, ep: ep });
            this.execExchangeAni();
        }
    };
    ItemBasicCellCtrl.prototype.elimate = function (count, basePos, type, callback) {
        if (type === void 0) { type = Constant_1.ElimateType.Default; }
        if (this.model) {
            if (!this.model.isDeath) {
                this.model.execUpElimate(type);
                return;
            }
            this.elimateType = type;
            this.elimateSize = count;
            this.elimateNotify = callback;
            this._execBindAddScoreFun(count);
            if (count > 3 && type == Constant_1.ElimateType.Default) {
                this.playMergeNormalBomb(basePos);
            }
            else {
                if (this.model.isBomb && type != Constant_1.ElimateType.Girl && !this.isPreDestory()) {
                    //这里有可能是性能热点.
                    this.execBomb();
                }
                else {
                    this.playElimate();
                }
            }
        }
    };
    ItemBasicCellCtrl.prototype.execBomb = function (data) {
        if (data === void 0) { data = null; }
        // if (RuntimeMgr.ins.GameState < GameState.Win) {
        var extBombData = null;
        //彩虹炸弹分配类型!
        if (this.model.getType() == Constant_1.CellType.Bomb5) {
            var pos = Common_1.default.getRoundOnePos(this.model.pos);
            extBombData = { pos: pos };
        }
        else if (this.model.isRocket) {
            this.execRoket();
        }
        this.model.onMsg(CellBase_1.MsgType.Bomb, data || extBombData);
        // }
    };
    ItemBasicCellCtrl.prototype.initAnimation = function () {
        this.animation = this.getComponent(cc.Animation);
        this.animation.on('stop', this.onAnimationStop, this);
    };
    ItemBasicCellCtrl.prototype.resetDisplayInfo = function () {
        this.node.angle = 0;
        this.node.scale = 1;
        this.node.zIndex = 0;
        this.node.opacity = 255;
        this.isRunMove = false;
        this.spineCellCtrl = null;
        this.prefabAnimation = null;
        this.showType = Constant_1.CellType.Empty;
        this.destoryTime = null;
        this.portalResolve = null;
        this.rotatingCtrl = null;
        this.deathTimeout = 0;
        this.cellSprite.node.active = true;
        this.cellSprite.node.scale = 1;
        this.cellSprite.node.angle = 0;
        this.cellSprite.node.opacity = 255;
        this.cellSprite.node.setPosition(0, 0);
        this.shadowNode.active = false;
        this.levelSprite.node.active = false;
        this.ground.node.active = false;
        this.cellSprite.node.destroyAllChildren();
        this.lowerNode.destroyAllChildren();
        this.lowerNode.active = false;
        if (this.model && this.model.getType() == Constant_1.CellType.Girl) {
            this.node.zIndex = 10;
        }
    };
    ItemBasicCellCtrl.prototype.initPlayCreateAnimation = function (createType) {
        if (createType == GameModel_1.CreateType.Nov || this.model.isEmpty)
            return;
        if (this.model.isBomb) {
            this.playCreateBombAni();
        }
        else {
            if (createType == GameModel_1.CreateType.Bron) {
                // this.node.y -= Common.GRID_H / 2;
                this.playEnterAni();
                this.node.active = false;
            }
            else {
                this.model.onMsg(CellBase_1.MsgType.Fall);
            }
        }
    };
    ItemBasicCellCtrl.prototype.isPreDestory = function () {
        return !this.cellSprite.node.active;
    };
    ItemBasicCellCtrl.prototype.isHavaSpe = function () {
        if (this.model && this.model.bindUpGModel && this.model.bindUpGModel.isHavaSpe) {
            return true;
        }
        return false;
    };
    ItemBasicCellCtrl.prototype._updateLvDisplay = function () {
        if (this.model && this.model.isGround && this.model.getLv() != this._showLv) {
            this._showLv = this.model.getLv();
            this.levelSprite.node.active = true;
            this.levelSprite.spriteFrame = ResCtrl_1.default.ins.getGroundFrame(this._showLv - 1);
        }
    };
    ItemBasicCellCtrl.prototype.updateDisplay = function (t) {
        var _this = this;
        if (t === void 0) { t = null; }
        if ((this.model && !this.model.isEmpty && this.showType != this.model.getType()) || (t != null)) {
            var displayType = Number((t === null ? this.model.getType() : t));
            var spritIndex_1 = null;
            this.prefabAnimation = null;
            this.spineCellCtrl = null;
            switch (displayType) {
                case Constant_1.CellType.Bomb1:
                case Constant_1.CellType.Bomb2: //横向炸弹
                case Constant_1.CellType.Bomb3: //竖向炸弹
                case Constant_1.CellType.Bomb4:
                case Constant_1.CellType.Bomb5:
                    this.createSpineCell(displayType, ResCtrl_1.default.ins.getCellPrefab(displayType - BombGap));
                    spritIndex_1 -= BombGap;
                    this.addTeshuLight();
                    break;
                case Constant_1.CellType.Fish:
                    this.createSpineCell(displayType, ResCtrl_1.default.ins.getCellPrefab(5));
                    break;
                case Constant_1.CellType.Girl:
                    this.createSpineCell(displayType, ResCtrl_1.default.ins.getCellPrefab(6));
                    break;
                case Constant_1.CellType.Conch:
                    this.createSpineCell(displayType, ResCtrl_1.default.ins.getCellPrefab(7));
                    break;
                case Constant_1.CellType.Banana:
                    this.createPrefab(ResCtrl_1.default.ins.getCellPrefab(8));
                    break;
                case Constant_1.CellType.IceCream:
                    this.createPrefab(ResCtrl_1.default.ins.getCellPrefab(9));
                    break;
                default:
                    spritIndex_1 = displayType;
                    break;
            }
            if (displayType != Constant_1.CellType.Ground) {
                if (this.model && this.model.isRocket) {
                    // 火箭的处理!
                    // this.cellSprite.spriteFrame = ResCtrl.ins.getRoketFrames(spritIndex);
                    this.createPrefab(ResCtrl_1.default.ins.getRoketPrefab());
                }
                else if (spritIndex_1 != null) {
                    this.cellSprite.spriteFrame = ResCtrl_1.default.ins.getCellFrame(displayType, spritIndex_1);
                }
                this.showLv();
            }
            else {
                this.showGround();
                this._addGem();
            }
            this.showType = displayType;
            if ((this.spineCellCtrl || this.prefabAnimation) && this.model) {
                this.scheduleOnce(function () {
                    _this.playBombIdel(spritIndex_1);
                    if (_this.createType == GameModel_1.CreateType.Nov) {
                        _this.model.isExecBomb && _this.execBomb();
                    }
                }, 0);
            }
        }
        this._updateLvDisplay();
    };
    ItemBasicCellCtrl.prototype._addGem = function () {
        if (this.model && this.model.GemLv > 0) {
            var sprite = Common_1.default.createSprite(null, ResCtrl_1.default.ins.getGemFrame(this.model.GemLv - 1));
            sprite.node.setScale(0.8);
            sprite.node.parent = this.ground.node;
        }
    };
    ItemBasicCellCtrl.prototype.updateGroundView = function () {
        if (GameModel_1.default.ins.isHavaMoveGround) {
            var dirs = [cc.v2(0, 1), cc.v2(0, -1), cc.v2(1, 0), cc.v2(-1, 0)];
            for (var index = 0; index < dirs.length; index++) {
                var targetPos = this.model.pos.add(dirs[index]);
                var cell = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.CellList, targetPos);
                if (cell && cell.extCtrl) {
                    cell.extCtrl.showGround();
                }
            }
        }
    };
    ItemBasicCellCtrl.prototype.showGround = function () {
        if (this.model && this.model.isGround) {
            // 先添加 
            this.ground.node.active = true;
            this.shadowNode.active = false;
            var opt = Common_1.default.testGroundBorderDisplay(this.model.pos.x, this.model.pos.y, GameModel_1.default.ins.CellList, this.model.getType());
            for (var i = 4; i--;) {
                var name = MoveGroundNames[i];
                var border = this.ground.node.getChildByName(name);
                if (opt[i]) {
                    if (!border) {
                        border = M_1.default.nodePool.createItem(ResCtrl_1.default.ins.getGroundBorderPrefab(i));
                        border.parent = this.ground.node;
                        border.name = name;
                    }
                }
                else {
                    border && border.destroy();
                }
            }
            this.ground.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            this.ground.spriteFrame = ResCtrl_1.default.ins.getGroundCenter();
            this.ground.node.setContentSize(cc.size(Common_1.default.GRID_W, Common_1.default.GRID_H));
        }
    };
    ItemBasicCellCtrl.prototype.showLv = function () {
        if (this.model && this.model.getLv()) {
            var lv = cc.instantiate(this.node.getChildByName('pos'));
            lv.name = 'lv';
            lv.active = true;
            lv.parent = this.cellSprite.node;
            lv.getComponent(cc.Label).string = this.model.getLv() + '';
        }
    };
    ItemBasicCellCtrl.prototype.addTeshuLight = function () {
        this.lowerNode.active = true;
        var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.TeshuLight, this.teshuLight);
        node.getComponent(cc.Sprite).spriteFrame = ResCtrl_1.default.ins.getBombBg(this.model.getType() - BombGap);
        node.parent = this.lowerNode;
    };
    ItemBasicCellCtrl.prototype.createPrefab = function (pb) {
        var result = Common_1.default.createEffPrefab(this.cellSprite.node, /*NodePoolKey.Roket*/ null, pb);
        this.prefabAnimation = result.ctrl;
    };
    ItemBasicCellCtrl.prototype.createSpineCell = function (type, cellPrefab) {
        this.cellSprite.node.destroyAllChildren();
        var result = Common_1.default.createSpineNode(this.cellSprite.node, cellPrefab, type);
        this.spineCellCtrl = result.ctrl;
    };
    ItemBasicCellCtrl.prototype.notifyDestory = function () {
        if (this.elimateNotify) {
            var isBorn = this.model.bindGModel ? this.model.bindGModel.isBorn : false;
            this.elimateNotify(isBorn);
        }
    };
    ItemBasicCellCtrl.prototype.checkSpecialCollect = function () {
        M_1.default.event.send(Event_1.Event.GameCMD.SpeCollect, this.model);
    };
    ItemBasicCellCtrl.prototype.preDestory = function () {
        if (this.cellSprite) {
            this.cellSprite.node.active = false;
            this.checkSpecialCollect();
            if (this.model.GemLv > 0) {
                GameModel_1.default.ins.updateCollectCount(CollectModel_1.CollectType.gem, this.node.getPosition(), null, this.model.GemLv);
            }
            this.model && this.model.preDestory();
            this.animation.stop();
            this.animation.off('off', this.onAnimationStop, this);
            this.updateGroundView();
        }
        if (this.isDelayType()) {
            this.destoryTime = this.getDelayElimateTime();
        }
        else {
            this.destoryTime = 0;
        }
    };
    ItemBasicCellCtrl.prototype.execDestory = function () {
        this.notifyDestory();
        this.model.destory(this.elimateType);
        this.model.onUnBind(this.model.pos);
        this.model = null;
        this.destoryTime = null;
        this.animationState = null;
        this.BindAddScoreTask = null;
        this.showType = Constant_1.CellType.Empty;
        this.cellSprite.node.stopAllActions();
        this.node.stopAllActions();
        this.unscheduleAllCallbacks();
        this.cellSprite.spriteFrame = null;
        if (this.spineCellCtrl) {
            M_1.default.nodePool.freeItem(this.showType, this.spineCellCtrl.node);
            this.spineCellCtrl = null;
        }
        if (this.prefabAnimation) {
            this.prefabAnimation = null;
        }
        M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.Cell, this.node);
    };
    ItemBasicCellCtrl.prototype.getDelayElimateTime = function () {
        var time = 0;
        switch (this.elimateType) {
            case Constant_1.ElimateType.Bomb2:
            case Constant_1.ElimateType.Bomb3:
                time = TimeConfig_1.GapTime.DelayDestoryColAndRow;
                break;
            case Constant_1.ElimateType.Bomb1:
                time = TimeConfig_1.GapTime.DelayDestoryBomb;
                break;
            case Constant_1.ElimateType.Bomb4:
                time = TimeConfig_1.GapTime.DelayDestoryOctopus;
                break;
            default:
                if (this.isFishBomb()) {
                    time = TimeConfig_1.GapTime.DelayDestoryFishBomb;
                }
                break;
        }
        return time;
    };
    ItemBasicCellCtrl.prototype.isDelayType = function () {
        if (this.elimateType == Constant_1.ElimateType.Bomb3 ||
            this.elimateType == Constant_1.ElimateType.Bomb2 ||
            this.elimateType <= Constant_1.ElimateType.All && this.elimateType > Constant_1.ElimateType.Default ||
            this.isFishBomb()) {
            return true;
        }
        return false;
    };
    ItemBasicCellCtrl.prototype.checkBomb = function (targetModel) {
        var _this = this;
        var isBomb = false;
        if (this.model && this.model.isBomb) {
            var pos_1 = null;
            if (targetModel) {
                pos_1 = targetModel.pos;
                if (targetModel.isBomb) {
                    return;
                }
            }
            isBomb = true;
            this.scheduleOnce(function () {
                _this.execBomb({ pos: pos_1 });
            }, 0.1);
        }
        return isBomb;
    };
    ItemBasicCellCtrl.prototype.updatePosition = function () {
        this.node.setPosition(this.model.getPosition());
        this.cellSprite.node.setPosition(0, 0);
    };
    ItemBasicCellCtrl.prototype.onAnimationStop = function (eventName, aniState) {
        if (!this.model)
            return;
        switch (aniState.name) {
            case AniName.elimate:
            case AniName.collect:
                this.preDestory();
                break;
            case AniName.fallOver:
                if (this.model.isBomb) {
                    this.playBombIdel();
                }
                break;
            case AniName.bombCreate:
                if (this.model.isBomb) {
                    this.cellSprite.node.angle = 0;
                    this.playBombIdel();
                    this.model.isBombReady = true;
                    this.model.unlockCreateBombPos();
                    if (this.model.isExecBomb) {
                        this.execBomb();
                    }
                    else {
                        this.model.continue2Fall();
                    }
                }
                break;
            case AniName.portalIn:
            case AniName.portalOut:
                this.execPortalResolve();
                break;
        }
    };
    /******************************************动画执行区域 *************************************************/
    ItemBasicCellCtrl.prototype.execExchangeAni = function () {
        var _this = this;
        if (!this.isRunMove && this.moveActionAry.length > 0) {
            this.isRunMove = true;
            var moveData_1 = this.moveActionAry.shift();
            var a1 = cc.moveTo(moveData_1.t, Common_1.default.getPos(moveData_1.pos.x, moveData_1.pos.y));
            var a2 = cc.callFunc(function () {
                _this.checkBomb(moveData_1.ep);
                _this.isRunMove = false;
                _this.execExchangeAni();
            }, this);
            this.node.runAction(cc.sequence(a1, a2));
        }
    };
    ItemBasicCellCtrl.prototype.mermaidJumpTo = function (targetPos, callback) {
        this.meirenyuJumpPool.push({ pos: targetPos, cb: callback });
        if (!this.isJumping) {
            this._execMermaidJumpTask();
        }
    };
    /**执行美人鱼的跳跃任务! */
    ItemBasicCellCtrl.prototype._execMermaidJumpTask = function () {
        var _this = this;
        var item = this.meirenyuJumpPool.shift();
        if (item) {
            this.isJumping = true;
            this.spineCellCtrl.play('meirenyu_tiao', 0, false, null, null, { name: 'meirenyu_xiuxian', loop: true });
            this.moveTo(item.pos, function () {
                GameModel_1.default.ins.execElimateOne(item.pos, Constant_1.ElimateType.Girl, true);
                _this.isJumping = false;
                item.cb && item.cb();
                _this._execMermaidJumpTask();
            });
        }
    };
    ItemBasicCellCtrl.prototype.moveTo = function (targetPos, callback) {
        var pos = Common_1.default.getPos(targetPos.x, targetPos.y);
        var a0 = cc.delayTime(0.2);
        var a1 = cc.moveTo(0.2, pos);
        var a2 = cc.callFunc(function () {
            callback && callback();
        });
        this.node.runAction(cc.sequence(a0, a1, a2));
    };
    /**播放复合炸弹爆炸前的动画! */
    ItemBasicCellCtrl.prototype.playComplexBombAni = function (type) {
        var _this = this;
        return new Promise(function (resolve) {
            switch (type) {
            }
            _this.scheduleOnce(resolve, 0);
        });
    };
    ItemBasicCellCtrl.prototype.playChange2Cell = function () {
        this.animation.play(AniName.change2cell);
    };
    ItemBasicCellCtrl.prototype.exchangeDoubleBombAni = function (targetModel) {
        var _this = this;
        if (targetModel) {
            //Todo 待播放相应的骨骼动画..... 但是这里不知道要播放哪种类型呀.?
            var a1 = cc.moveTo(0.15, Common_1.default.getPos(targetModel.pos.x, targetModel.pos.y));
            var a2 = cc.callFunc(function () { return __awaiter(_this, void 0, void 0, function () {
                var groupId;
                return __generator(this, function (_a) {
                    groupId = GameModel_1.default.ins.seq.next();
                    targetModel.onMsg(CellBase_1.MsgType.ComplexBomb, { type1: this.model.getType(), type2: targetModel.getType(), groupId: groupId });
                    this.playBombSingleDestoryEff(0.1, TimeConfig_1.GapTime.BombMergeBombChangeTime, false, groupId);
                    return [2 /*return*/];
                });
            }); }, this);
            this.node.runAction(cc.sequence(a1, a2));
        }
    };
    ItemBasicCellCtrl.prototype.execFishBomb = function () {
        //是炸弹鱼,并且被其他炸弹炸死的!执行爆炸!
        this.model.initBombModel(Constant_1.CellType.Fish);
        this.model.onMsg(CellBase_1.MsgType.Bomb);
        this.model.isBomb = false;
    };
    ItemBasicCellCtrl.prototype.execRoket = function () {
        var _this = this;
        var timeLine = GroupAnimatCtrl_1.default.ins.createTimeLine();
        var groundId = this.model.GroupId;
        var count = 0;
        for (var i = 3; i--;) {
            timeLine.add(gsap.TweenLite.delayedCall(TimeConfig_1.GapTime.ThreePlaneCreate, function () {
                GameModel_1.default.ins.execElimate(_this.model, null, Constant_1.ElimateType.Rocket, null, null, groundId);
                count++;
                if (count >= 3) {
                }
            }));
        }
    };
    /**是否是3个鱼炸弹消除.此时滞空3个鱼 */
    ItemBasicCellCtrl.prototype.isFishSingleBomb = function () {
        return (this.model.getType() == Constant_1.CellType.Fish && this.elimateType != Constant_1.ElimateType.Default);
    };
    ItemBasicCellCtrl.prototype.isFishBomb = function () {
        return (this.model.getType() == Constant_1.CellType.Fish && (this.elimateSize == 3 || this.elimateType != Constant_1.ElimateType.Default));
    };
    /**单个销毁动画 */
    ItemBasicCellCtrl.prototype.playElimate = function () {
        if (this.isFishSingleBomb() && !this.animationState && this.elimateType != Constant_1.ElimateType.Girl) {
            this.execFishBomb();
        }
        if (this.model && !this.model.isEmpty) {
            if (this.model.isRocket && this.elimateSize != 0) {
                this.execRoket();
            }
            else if (this.model.isCollect && GameModel_1.default.ins.getCollect().get(this.model.getType() + '') > 0 && this.elimateType == Constant_1.ElimateType.Default) {
                //收集物!!
                this.playCollectAni();
            }
            else {
                if (this._isPlayElimateAnimation() && (!this.animationState || (this.animationState && this.animationState.name != AniName.elimate))) {
                    this.animationState = this.animation.play(AniName.elimate);
                }
                this.playLittleElimateEff();
            }
        }
    };
    ItemBasicCellCtrl.prototype._isPlayElimateAnimation = function () {
        return (this.model.getType() != Constant_1.CellType.Banana);
    };
    /**合成炸弹时,炸弹的补间动画 */
    ItemBasicCellCtrl.prototype.playCreateBombAni = function () {
        if (!this.animation) {
            this.initAnimation();
        }
        this.model.isBombReady = false;
        this.animation.play(AniName.bombCreate);
    };
    ItemBasicCellCtrl.prototype.playLittleElimateEff = function () {
        var wolrdPos = Common_1.default.getWorldPos(this.node);
        if (this.model.getType() == Constant_1.CellType.Banana) {
            if (this.prefabAnimation) {
                this.prefabAnimation.play();
                this.scheduleOnce(this.preDestory.bind(this), 0.5);
            }
            else {
                this.preDestory();
            }
        }
        else if (this.elimateType != Constant_1.ElimateType.Bomb1 && this.model.getType() != Constant_1.CellType.IceCream) {
            // M.platform.vibrateShort();
            if (this.model.isGround) {
                this.playBrokenEff(wolrdPos);
            }
            else {
                M_1.default.event.send(Event_1.Event.Effect.LittleBomb, wolrdPos);
            }
            M_1.default.event.send(Event_1.Event.Sound.PlaySoundEff, AudioCtrl_1.AudioID.Elimate);
        }
        this.model.notifyRoundElimate(this.elimateType);
        // this.scheduleOnce(() => {
        //     M.event.send(Event.Effect.ShowDot, this.elimateType, wolrdPos);
        // }, GapTime.DelayLightPoint);
    };
    ItemBasicCellCtrl.prototype.playBrokenEff = function (pos) {
        pos = pos || Common_1.default.getWorldPos(this.node);
        M_1.default.event.send(Event_1.Event.Effect.Broken, pos);
        if (this.model && this.model.getLv() <= 0) {
            this.updateGroundView();
        }
    };
    /**炸弹在桌面上的呼吸动画 */
    ItemBasicCellCtrl.prototype.playBombIdel = function (type) {
        if (this.spineCellCtrl) {
            this.cellSprite.spriteFrame = null;
            //播呼吸动画不应该冲掉销毁动画!
            var name = null;
            if (this.model.getType() == Constant_1.CellType.Fish) {
                name = SpineCellIdelName[SpineCellIdelName.length - 1];
            }
            else if (this.spineCellCtrl.curPlay != SpineCellBombName[this.model.getType() - BombGap]) {
                name = SpineCellIdelName[this.model.getType() - BombGap];
            }
            this.spineCellCtrl.play(name, 0, true);
        }
        else if (this.model.isRocket) {
            if (this.prefabAnimation) {
                this.prefabAnimation.play(type + "_zhangyuGGIdle");
                console.error('prefabAnimation:', type + "_zhangyuGGIdle");
            }
        }
        else if (this.animation && this.model.isBomb) {
            this.animation.play(AniName.bombIdle);
        }
    };
    /**执行绑定好的加分数方法 */
    ItemBasicCellCtrl.prototype._execBindAddScoreFun = function (count) {
        if (count === void 0) { count = null; }
        if (this.BindAddScoreTask) {
            this.BindAddScoreTask(Common_1.default.getWorldPos(this.node), count);
            this.BindAddScoreTask = null;
        }
    };
    /**炸弹自销毁动画 */
    ItemBasicCellCtrl.prototype.playBombSingleDestoryEff = function (keepTime, playTime, isSpineEff, groupId) {
        var _this = this;
        if (keepTime === void 0) { keepTime = 0.2; }
        if (playTime === void 0) { playTime = 0.2; }
        if (isSpineEff === void 0) { isSpineEff = false; }
        if (groupId === void 0) { groupId = null; }
        return new Promise(function (resolve) {
            if (!_this.model) {
                return resolve();
            }
            (groupId && !_this.model.GroupId) && (_this.model.GroupId = groupId);
            _this.model.onMsg(CellBase_1.MsgType.Elimate, { id: groupId, isForced: true });
            var over = function () {
                if (_this.model) {
                    _this.model.unlockCreateBombPos();
                }
                _this.preDestory();
                resolve();
            };
            _this.elimateType = _this.model.getType();
            _this._execBindAddScoreFun();
            if (isSpineEff && _this.spineCellCtrl && !_this.isPreDestory()) {
                var name = SpineCellBombName[_this.model.getType() - BombGap];
                _this.spineCellCtrl.play(name, 0, false);
                _this.scheduleOnce(over, 0.3 + playTime);
            }
            else if (_this.model.isRocket) {
                if (_this.prefabAnimation) {
                    _this.prefabAnimation.play(_this.model.getType() + "_zhangyuGG");
                    _this.scheduleOnce(over, 0.3 + playTime);
                }
            }
            else {
                var a0 = cc.fadeOut(keepTime);
                var a1 = cc.callFunc(function () {
                    _this.cellSprite.node.active = false;
                }, _this);
                var a2 = cc.delayTime(playTime);
                var a3 = cc.callFunc(over, _this);
                _this.node.runAction(cc.sequence(a0, a1, a2, a3));
            }
        });
    };
    /**
    * 执行爆炸时余震的动画
    * @param bombLv 当前的余波等级
    * @param centerPos 中心点的位置(网格)!
    */
    ItemBasicCellCtrl.prototype.execBombAfterShocks = function (bombLv, centerPos) {
        var _this = this;
        if (this.model && !this.model.isDeath && !this.isHavaSpe() && !this.isPlayBombShocks) {
            this.isPlayBombShocks = true;
            var cp = Common_1.default.getPos(centerPos.x, centerPos.y);
            var sp = this.model.getPosition();
            //  计算角度 
            var radians = Math.atan2((cp.x - sp.x), (cp.y - sp.y));
            var degrees = radians * -180 / Math.PI;
            var dir = Common_1.default.getDirction(cp, sp);
            var a0 = cc.moveBy(0.2, cc.v2(-dir.x * (bombLv * 4), -dir.y * (bombLv * 4)));
            var a1 = cc.moveBy(0.2, cc.v2(dir.x * (bombLv * 8), dir.y * (bombLv * 8)));
            var a2 = cc.moveTo(0.2, cc.v2(0, 0)); // <any>a1.reverse();
            var a3 = cc.sequence(cc.rotateTo(0.1, (degrees * 0.1) * (bombLv * 0.5)), cc.rotateTo(0.1, 0));
            // 形变动画.暂缺未完成
            // const a1 = cc.scaleTo(0.1, (1.1 * (bombLv * 0.4)));
            // const a2 = cc.scaleTo(0.1, 0.95);
            // const a3 = cc.scaleTo(0.1, 1);
            var over = cc.callFunc(function () {
                _this.cellSprite.node.setPosition(0, 0);
                _this.cellSprite.node.angle = 0;
                _this.isPlayBombShocks = false;
            }, this);
            this.cellSprite.node.runAction(cc.sequence(cc.spawn(cc.sequence(a0, a1, a2), a3), over));
        }
    };
    /**游戏结束将普通元素转换成炸弹动画 */
    ItemBasicCellCtrl.prototype.change2Bomb = function (type) {
        if (this.model) {
            this.model.change2Bomb(type);
            this.cellSprite.node.active = true;
            this.updatePosition();
            this.updateDisplay();
            this.playCreateBombAni();
        }
    };
    /**出生点创建时,元素出生动画 */
    ItemBasicCellCtrl.prototype.playEnterAni = function () {
        this.node.opacity = 0;
        this.node.runAction(cc.fadeIn(0.15));
    };
    /**下落中的动画 */
    ItemBasicCellCtrl.prototype.playFallStartAni = function () {
        if (!this.isPlayFall && !this.isHavaSpe()) {
            this.isPlayFall = true;
            this.animation.playAdditive(AniName.fall);
        }
    };
    /**贝壳抖动 */
    ItemBasicCellCtrl.prototype.playShaking = function () {
        var a0 = cc.moveBy(0.05, cc.v2(Util_1.Util.Tool.rangeInt(2, 5), Util_1.Util.Tool.rangeInt(2, 5)));
        var a1 = a0.reverse();
        this.cellSprite.node.runAction(cc.repeatForever(cc.sequence(a0, a1)));
        // this.animation.play(AniName.shaking);
    };
    /**下落暂停 */
    ItemBasicCellCtrl.prototype.playFallPauseAni = function () {
        if (this.isPlayFall) {
            this.isPlayFall = false;
            this.animation.play(AniName.fallPause);
        }
    };
    /**下落结束时的动画 */
    ItemBasicCellCtrl.prototype.playFallOverAni = function () {
        if (!this.portalResolve && !this.isHavaSpe()) {
            this.isPlayFall = false;
            if (this.model.getType() == Constant_1.CellType.IceCream) {
                this.prefabAnimation && this.prefabAnimation.play();
            }
            else {
                this.animation.play(AniName.fallOver);
            }
        }
    };
    /**消除提示时单个的那个 */
    ItemBasicCellCtrl.prototype.playSinglePrompt = function (mulPos) {
        if (this.model) {
            var dir = Common_1.default.getDirction(mulPos, this.model.pos);
            var gap = 6;
            var shockGap = 5;
            var a1 = cc.spawn(cc.scaleTo(0.5, 1.05), cc.moveTo(0.5, cc.v2(dir.x * gap, dir.y * -gap)));
            var a2 = cc.repeat(cc.sequence(cc.moveBy(0.2, cc.v2(dir.x * shockGap, dir.y * -shockGap)), cc.moveBy(0.2, cc.v2(dir.x * -shockGap, dir.y * shockGap))), 2);
            var a3 = cc.spawn(cc.scaleTo(0.2, 1.0), cc.moveTo(0.2, cc.v2(0, 0)));
            var a4 = cc.delayTime(0.5);
            this.cellSprite.node.runAction(cc.repeatForever(cc.sequence(a1, a2, a3, a4)));
        }
    };
    /**消除提示时多个的那个 */
    ItemBasicCellCtrl.prototype.playMulPrompt = function () {
        if (this.animation) {
            this.animation.playAdditive(AniName.prompt);
        }
    };
    ItemBasicCellCtrl.prototype.playRotatingMerge = function (centerPos) {
        var _this = this;
        this.rotatingCtrl = new RotatingCtrl_1.default(this.node, centerPos);
        this.rotatingCtrl.start().then(function () {
            _this.cellSprite && (_this.cellSprite.node.active = false);
            _this.rotatingCtrl = null;
        });
    };
    ItemBasicCellCtrl.prototype.playMergeNormalBomb = function (centerPos, time, isNeedDestory, isShowSpeedLine) {
        var _this = this;
        if (time === void 0) { time = TimeConfig_1.GapTime.MergeBombSpeed; }
        if (isNeedDestory === void 0) { isNeedDestory = true; }
        if (isShowSpeedLine === void 0) { isShowSpeedLine = true; }
        //根据方向,做变形!  
        if (this.model.isRocket && this.elimateSize != 0) {
            this.execRoket();
            return;
        }
        var dir = Common_1.default.getDirction(centerPos, this.model.pos);
        var centerPosition = Common_1.default.getPos(centerPos.x, centerPos.y);
        var _a = { sx: 1, sy: 1 }, sx = _a.sx, sy = _a.sy;
        if (dir.x != 0) {
            sx = 1.2;
            sy = 0.8;
        }
        else if (dir.y != 0) {
            sx = 0.8;
            sy = 1.2;
        }
        var a0 = cc.scaleTo(0.05, sx, sy);
        var a1 = cc.moveTo(time, centerPosition);
        var a2 = cc.callFunc(function () {
            if (isNeedDestory) {
                _this.preDestory();
            }
            else {
                _this.cellSprite.node.active = false;
            }
        }, this);
        this.model.notifyRoundElimate(this.elimateType);
        if (isShowSpeedLine) {
            M_1.default.event.send(Event_1.Event.Effect.SpeedLine, Common_1.default.getWorldPos(this.node), dir);
        }
        this.node.runAction(cc.sequence(cc.spawn(a0, a1), a2));
    };
    ItemBasicCellCtrl.prototype.stopPromptAction = function () {
        if (this.cellSprite) {
            this.animation.stop();
            this.cellSprite.node.stopAllActions();
            this.cellSprite.node.setPosition(0, 0);
        }
        // this.resetDisplayInfo();
    };
    ItemBasicCellCtrl.prototype.portalOut = function () {
        var _this = this;
        if (!this.portalResolve) {
            return new Promise(function (resolve) {
                _this.portalResolve = resolve;
                _this.animation.play(AniName.portalOut);
            });
        }
        return null;
    };
    ItemBasicCellCtrl.prototype.portalIn = function () {
        var _this = this;
        if (!this.portalResolve) {
            return new Promise(function (resolve) {
                _this.portalResolve = resolve;
                _this.animation.play(AniName.portalIn);
            });
        }
        return null;
    };
    ItemBasicCellCtrl.prototype.execPortalResolve = function () {
        this.portalResolve && this.portalResolve(true);
        this.portalResolve = null;
    };
    /**本身是收集物,需要做什么样的过度动画 ???? */
    ItemBasicCellCtrl.prototype.playCollectAni = function () {
        this.node.zIndex = 100;
        this.animationState = this.animation.play(AniName.collect);
        this.playLittleElimateEff();
    };
    /****************************************** 动画执行区域 *************************************************/
    ItemBasicCellCtrl.prototype.checkDestory = function (dt) {
        if (this.destoryTime != null) {
            this.destoryTime -= dt;
            if (this.destoryTime <= 0) {
                this.execDestory();
            }
        }
        if (this.model && this.model.isDeath) {
            this.deathTimeout += dt;
            if ( /*!this.animationState &&*/this.deathTimeout > 5) {
                this.deathTimeout = 0;
                this.playElimate();
            }
        }
    };
    ItemBasicCellCtrl.prototype.updateTestLabel = function () {
        if (this.model) {
            this.node.getChildByName('pos').getComponent(cc.Label).string = this.model.pos.x + "-" + this.model.pos.y;
            // if (this.model.GroupId) {
            //     this.node.getChildByName('pos').getComponent(cc.Label).string = `${this.model.GroupId}`
            // } else {
            //     this.node.getChildByName('pos').getComponent(cc.Label).string = '';
            // }
        }
    };
    ItemBasicCellCtrl.prototype.orderlyUpdate = function (dt) {
        //帧率限制...当现有帧率时间远远超过单格单位时间,则限制! 
        if (dt > Constant_1.FallMaxGateLimit) {
            dt = Constant_1.FallMaxGateLimit;
        }
        if (this.model && this.model.isFall && !this.isRunMove) {
            var x = this.node.x + this.model.speed.x * this.model.fallingDir.x * dt;
            var y = this.node.y - this.model.speed.y * this.model.fallingDir.y * dt;
            //炸弹需要准备好了.才能掉落!
            if (!this.model.isBomb || (this.model.isBomb && this.model.isBombReady)) {
                if (this.model.fallDes) {
                    //处理目标坐标修正! 
                    if (this.model.fallingDir.x > 0) {
                        x = x > this.model.fallDes.x ? this.model.fallDes.x : x;
                    }
                    else {
                        x = x < this.model.fallDes.x ? this.model.fallDes.x : x;
                    }
                    y = y < this.model.fallDes.y ? this.model.fallDes.y : y;
                }
                if (x != 0 || y != 0 || !this.node.active) {
                    this.node.active = true;
                }
                this.node.setPosition(x, y);
                //是否已经下落结束!
                if (this.model.posDetection(this.node.position)) {
                    this.updatePosition();
                    // this.playFallOverAni();
                }
            }
        }
    };
    ItemBasicCellCtrl.prototype.update = function (dt) {
        this.updateDisplay();
        this.checkDestory(dt);
        if (Apps_1.default.isDebug) {
            this.updateTestLabel();
        }
        // if (this.rotatingCtrl) {
        //     this.rotatingCtrl.update(dt);
        // }
    };
    __decorate([
        property(cc.Sprite)
    ], ItemBasicCellCtrl.prototype, "cellSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], ItemBasicCellCtrl.prototype, "ground", void 0);
    __decorate([
        property(cc.Sprite)
    ], ItemBasicCellCtrl.prototype, "levelSprite", void 0);
    __decorate([
        property(cc.Node)
    ], ItemBasicCellCtrl.prototype, "lowerNode", void 0);
    __decorate([
        property(cc.Node)
    ], ItemBasicCellCtrl.prototype, "shadowNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], ItemBasicCellCtrl.prototype, "teshuLight", void 0);
    ItemBasicCellCtrl = __decorate([
        ccclass
    ], ItemBasicCellCtrl);
    return ItemBasicCellCtrl;
}(BaseItemView_1.default));
exports.default = ItemBasicCellCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxJdGVtQmFzaWNDZWxsQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4Q0FBeUM7QUFDekMsNkNBQXdDO0FBQ3hDLCtDQUEwQztBQUMxQyw4Q0FBNEM7QUFDNUMsc0RBQXlIO0FBRXpILGdEQUErQztBQUMvQywwREFBc0Q7QUFFdEQsaURBQWdEO0FBQ2hELHdEQUFtRDtBQUNuRCxnREFBMkQ7QUFDM0Qsb0RBQWlEO0FBQ2pELHNDQUFpQztBQUNqQyxzREFBb0Q7QUFDcEQsMkNBQXNDO0FBQ3RDLGdFQUEyRDtBQUVyRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFNLE9BQU8sR0FBRztJQUNaLElBQUksRUFBRSxNQUFNO0lBQ1osU0FBUyxFQUFFLFdBQVc7SUFDdEIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsUUFBUSxFQUFFLFVBQVU7SUFDcEIsVUFBVSxFQUFFLFlBQVk7SUFDeEIsUUFBUSxFQUFFLFVBQVU7SUFDcEIsUUFBUSxFQUFFLFVBQVU7SUFDcEIsU0FBUyxFQUFFLFdBQVc7SUFDdEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsV0FBVyxFQUFFLGFBQWE7Q0FDN0IsQ0FBQTtBQUNELElBQU0sT0FBTyxHQUFXLEdBQUcsQ0FBQztBQUM1QixJQUFNLGlCQUFpQixHQUFHLENBQUMsZUFBZSxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFBO0FBQ3ZKLElBQU0saUJB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InNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IENvbW1vbiBmcm9tIFwiLi4vLi4vQ29tbW9uL0NvbW1vblwiO1xuaW1wb3J0IE0gZnJvbSBcIi4uLy4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgQmFzZUl0ZW1WaWV3IGZyb20gXCIuL0Jhc2VJdGVtVmlld1wiO1xuaW1wb3J0IHsgTXNnVHlwZSB9IGZyb20gXCIuLi9Nb2RlbC9DZWxsQmFzZVwiO1xuaW1wb3J0IHsgTm9kZVBvb2xLZXksIENlbGxUeXBlLCBFbGltYXRlVHlwZSwgR2FtZVN0YXRlLCBSdW5UaW1lR2F0ZSwgRmFsbE1heEdhdGVMaW1pdCB9IGZyb20gXCIuLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5pbXBvcnQgeyBDZWxsTW9kZWwgfSBmcm9tIFwiLi4vTW9kZWwvQ2VsbE1vZGVsXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi9EYXRhL0NvbnN0L0V2ZW50XCI7XG5pbXBvcnQgeyBHYXBUaW1lIH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvVGltZUNvbmZpZ1wiO1xuaW1wb3J0IFNwaW5lUGxheWVyQ3RybCBmcm9tIFwiLi4vLi4vLi4vQmFzZS9DdXN0b21Db21wb25lbnQvU3BpbmVQbGF5ZXJDdHJsXCI7XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uLy4uLy4uL0Jhc2UvVXRpbHMvVXRpbFwiO1xuaW1wb3J0IFJvdGF0aW5nQ3RybCBmcm9tIFwiLi4vQ29udHJvbC9Sb3RhdGluZ0N0cmxcIjtcbmltcG9ydCBHYW1lTW9kZWwsIHsgQ3JlYXRlVHlwZSB9IGZyb20gXCIuLi9Nb2RlbC9HYW1lTW9kZWxcIjtcbmltcG9ydCB7IEF1ZGlvSUQgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0F1ZGlvQ3RybFwiO1xuaW1wb3J0IFJlc0N0cmwgZnJvbSBcIi4uL1Jlc0N0cmxcIjtcbmltcG9ydCB7IENvbGxlY3RUeXBlIH0gZnJvbSBcIi4uL01vZGVsL0NvbGxlY3RNb2RlbFwiO1xuaW1wb3J0IEFwcHMgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvQXBwc1wiO1xuaW1wb3J0IEdyb3VwQW5pbWF0Q3RybCBmcm9tIFwiLi4vLi4vQ29tbW9uL0dyb3VwQW5pbWF0Q3RybFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5jb25zdCBBbmlOYW1lID0ge1xuICAgIGZhbGw6ICdmYWxsJyxcbiAgICBmYWxsUGF1c2U6ICdmYWxsUGF1c2UnLFxuICAgIGVsaW1hdGU6ICdlbGltYXRlJyxcbiAgICBmYWxsT3ZlcjogJ2ZhbGxPdmVyJyxcbiAgICBib21iQ3JlYXRlOiAnYm9tYkNyZWF0ZScsXG4gICAgYm9tYklkbGU6ICdib21iSWRsZScsXG4gICAgcG9ydGFsSW46ICdwb3J0YWxJbicsXG4gICAgcG9ydGFsT3V0OiAncG9ydGFsT3V0JyxcbiAgICBwcm9tcHQ6ICdwcm9tcHQnLFxuICAgIGNvbGxlY3Q6ICdjb2xsZWN0JyxcbiAgICBzaGFraW5nOiAnc2hha2luZycsXG4gICAgY2hhbmdlMmNlbGw6ICdjaGFuZ2UyY2VsbCdcbn1cbmNvbnN0IEJvbWJHYXA6IG51bWJlciA9IDEwMDtcbmNvbnN0IFNwaW5lQ2VsbElkZWxOYW1lID0gWydiZWlrZV94aXV4aWFuJywgJ2hlbmdzdWRhbl94aXV4aWFuJywgJ2hlbmdzdWRhbl94aXV4aWFuMicsICd6aGFuZ3l1X3hpdXhpYW4nLCAnaWRsZV9oYWltYScsICcnLCAnJywgJycsICdiYW96aGF5dV94aXV4aWFuJ11cbmNvbnN0IFNwaW5lQ2VsbEJvbWJOYW1lID0gWycnLCAnaGVuZ3N1ZGFuX2JhbycsICdoZW5nc3VkYW5fYmFvJywgJycsICcnXTtcblxuY29uc3QgTW92ZUdyb3VuZE5hbWVzID0gWyd1cCcsICdkb3duJywgJ2xlZnQnLCAncmlnaHQnXTtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1CYXNpY0NlbGxDdHJsIGV4dGVuZHMgQmFzZUl0ZW1WaWV3PENlbGxNb2RlbD4ge1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBjZWxsU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBncm91bmQ6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGxldmVsU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbG93ZXJOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNoYWRvd05vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICB0ZXNodUxpZ2h0OiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgcHVibGljIEJpbmRBZGRTY29yZVRhc2s6IEZ1bmN0aW9uID0gbnVsbDtcblxuICAgIHByaXZhdGUgc2hvd1R5cGU6IENlbGxUeXBlID0gQ2VsbFR5cGUuRW1wdHk7XG4gICAgcHJpdmF0ZSBfc2hvd0x2OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgYW5pbWF0aW9uOiBjYy5BbmltYXRpb24gPSBudWxsO1xuICAgIHByaXZhdGUgYW5pbWF0aW9uU3RhdGU6IGNjLkFuaW1hdGlvblN0YXRlID0gbnVsbDtcblxuICAgIHByaXZhdGUgbW92ZUFjdGlvbkFyeTogQXJyYXk8eyB0OiBudW1iZXIsIHBvczogY2MuVmVjMiwgZXA6IENlbGxNb2RlbCB9PiA9IDxhbnk+W107XG4gICAgcHVibGljIGlzUnVuTW92ZSA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBpc1BsYXlGYWxsID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBpc1BsYXlCb21iU2hvY2tzID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHNwaW5lQ2VsbEN0cmw6IFNwaW5lUGxheWVyQ3RybCA9IG51bGw7XG4gICAgcHJpdmF0ZSBwcmVmYWJBbmltYXRpb246IGNjLkFuaW1hdGlvbiA9IG51bGw7XG5cbiAgICBwcml2YXRlIGVsaW1hdGVUeXBlOiBFbGltYXRlVHlwZSB8IG51bWJlciA9IEVsaW1hdGVUeXBlLkRlZmF1bHQ7XG4gICAgcHJpdmF0ZSBlbGltYXRlU2l6ZTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGVsaW1hdGVOb3RpZnk6IEZ1bmN0aW9uID0gbnVsbDtcblxuICAgIC8qKumUgSzliqjnlLsgKi9cbiAgICBwcml2YXRlIHBvcnRhbFJlc29sdmUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBkZXN0b3J5VGltZSA9IG51bGw7XG5cbiAgICBwcml2YXRlIGRlYXRoVGltZW91dCA9IDA7XG5cbiAgICBwcml2YXRlIHJvdGF0aW5nQ3RybDogUm90YXRpbmdDdHJsID0gbnVsbDtcblxuICAgIHByaXZhdGUgY3JlYXRlVHlwZTogQ3JlYXRlVHlwZSA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdChtb2RlbDogQ2VsbE1vZGVsLCBjcmVhdGVUeXBlPzogQ3JlYXRlVHlwZSkge1xuICAgICAgICBzdXBlci5pbml0KG1vZGVsKTtcbiAgICAgICAgdGhpcy5pbml0QW5pbWF0aW9uKCk7XG4gICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgICAgaWYgKCFtb2RlbC5pc0VtcHR5KSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0RGlzcGxheUluZm8oKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xuICAgICAgICAgICAgdGhpcy5CaW5kQWRkU2NvcmVUYXNrID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVHlwZSA9IGNyZWF0ZVR5cGU7XG4gICAgICAgICAgICBpZiAoY3JlYXRlVHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5pdFBsYXlDcmVhdGVBbmltYXRpb24oY3JlYXRlVHlwZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKENvbW1vbi5pc0JvbWJUeXBlKG1vZGVsLmdldFR5cGUoKSkgfHwgbW9kZWwuZ2V0VHlwZSgpID09IENlbGxUeXBlLkZpc2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnBsYXlCb21iSWRlbC5iaW5kKHRoaXMpLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBlYXN5SW5pdCh0eXBlOiBDZWxsVHlwZSkge1xuICAgICAgICB0aGlzLnJlc2V0RGlzcGxheUluZm8oKTtcbiAgICAgICAgdGhpcy51cGRhdGVEaXNwbGF5KHR5cGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBleGNoYW5nZSh0YXJnZXRQb3M6IGNjLlZlYzIsIHRpbWU6IG51bWJlciwgZXA6IENlbGxNb2RlbCkge1xuICAgICAgICBpZiAodGhpcy5tb3ZlQWN0aW9uQXJ5KSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVBY3Rpb25BcnkucHVzaCh7IHQ6IHRpbWUsIHBvczogdGFyZ2V0UG9zLCBlcCB9KTtcbiAgICAgICAgICAgIHRoaXMuZXhlY0V4Y2hhbmdlQW5pKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZWxpbWF0ZShjb3VudDogbnVtYmVyLCBiYXNlUG9zOiBjYy5WZWMyLCB0eXBlOiBFbGltYXRlVHlwZSA9IEVsaW1hdGVUeXBlLkRlZmF1bHQsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5tb2RlbC5pc0RlYXRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5leGVjVXBFbGltYXRlKHR5cGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZWxpbWF0ZVR5cGUgPSB0eXBlO1xuICAgICAgICAgICAgdGhpcy5lbGltYXRlU2l6ZSA9IGNvdW50O1xuICAgICAgICAgICAgdGhpcy5lbGltYXRlTm90aWZ5ID0gY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLl9leGVjQmluZEFkZFNjb3JlRnVuKGNvdW50KTtcblxuICAgICAgICAgICAgaWYgKGNvdW50ID4gMyAmJiB0eXBlID09IEVsaW1hdGVUeXBlLkRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlNZXJnZU5vcm1hbEJvbWIoYmFzZVBvcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLmlzQm9tYiAmJiB0eXBlICE9IEVsaW1hdGVUeXBlLkdpcmwgJiYgIXRoaXMuaXNQcmVEZXN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/ov5nph4zmnInlj6/og73mmK/mgKfog73ng63ngrkuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhlY0JvbWIoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlFbGltYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBleGVjQm9tYihkYXRhID0gbnVsbCkge1xuICAgICAgICAvLyBpZiAoUnVudGltZU1nci5pbnMuR2FtZVN0YXRlIDwgR2FtZVN0YXRlLldpbikge1xuICAgICAgICBsZXQgZXh0Qm9tYkRhdGEgPSBudWxsO1xuICAgICAgICAvL+W9qeiZueeCuOW8ueWIhumFjeexu+WeiyFcbiAgICAgICAgaWYgKHRoaXMubW9kZWwuZ2V0VHlwZSgpID09IENlbGxUeXBlLkJvbWI1KSB7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBDb21tb24uZ2V0Um91bmRPbmVQb3ModGhpcy5tb2RlbC5wb3MpO1xuICAgICAgICAgICAgZXh0Qm9tYkRhdGEgPSB7IHBvcyB9O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kZWwuaXNSb2NrZXQpIHtcbiAgICAgICAgICAgIHRoaXMuZXhlY1Jva2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2RlbC5vbk1zZyhNc2dUeXBlLkJvbWIsIGRhdGEgfHwgZXh0Qm9tYkRhdGEpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0QW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLm9uKCdzdG9wJywgPGFueT50aGlzLm9uQW5pbWF0aW9uU3RvcCwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXNldERpc3BsYXlJbmZvKCkge1xuICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSAwO1xuICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSAxO1xuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgIHRoaXMuaXNSdW5Nb3ZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3BpbmVDZWxsQ3RybCA9IG51bGw7XG4gICAgICAgIHRoaXMucHJlZmFiQW5pbWF0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5zaG93VHlwZSA9IENlbGxUeXBlLkVtcHR5O1xuXG4gICAgICAgIHRoaXMuZGVzdG9yeVRpbWUgPSBudWxsO1xuICAgICAgICB0aGlzLnBvcnRhbFJlc29sdmUgPSBudWxsO1xuICAgICAgICB0aGlzLnJvdGF0aW5nQ3RybCA9IG51bGw7XG4gICAgICAgIHRoaXMuZGVhdGhUaW1lb3V0ID0gMDtcblxuICAgICAgICB0aGlzLmNlbGxTcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNlbGxTcHJpdGUubm9kZS5zY2FsZSA9IDE7XG4gICAgICAgIHRoaXMuY2VsbFNwcml0ZS5ub2RlLmFuZ2xlID0gMDtcbiAgICAgICAgdGhpcy5jZWxsU3ByaXRlLm5vZGUub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgdGhpcy5jZWxsU3ByaXRlLm5vZGUuc2V0UG9zaXRpb24oMCwgMCk7XG5cbiAgICAgICAgdGhpcy5zaGFkb3dOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxldmVsU3ByaXRlLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ3JvdW5kLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2VsbFNwcml0ZS5ub2RlLmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xuXG5cbiAgICAgICAgdGhpcy5sb3dlck5vZGUuZGVzdHJveUFsbENoaWxkcmVuKCk7XG4gICAgICAgIHRoaXMubG93ZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLmdldFR5cGUoKSA9PSBDZWxsVHlwZS5HaXJsKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMTA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRQbGF5Q3JlYXRlQW5pbWF0aW9uKGNyZWF0ZVR5cGU6IENyZWF0ZVR5cGUpIHtcblxuICAgICAgICBpZiAoY3JlYXRlVHlwZSA9PSBDcmVhdGVUeXBlLk5vdiB8fCB0aGlzLm1vZGVsLmlzRW1wdHkpIHJldHVybjtcblxuICAgICAgICBpZiAodGhpcy5tb2RlbC5pc0JvbWIpIHtcbiAgICAgICAgICAgIHRoaXMucGxheUNyZWF0ZUJvbWJBbmkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjcmVhdGVUeXBlID09IENyZWF0ZVR5cGUuQnJvbikge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMubm9kZS55IC09IENvbW1vbi5HUklEX0ggLyAyO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUVudGVyQW5pKClcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwub25Nc2coTXNnVHlwZS5GYWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNQcmVEZXN0b3J5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRoaXMuY2VsbFNwcml0ZS5ub2RlLmFjdGl2ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzSGF2YVNwZSgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5iaW5kVXBHTW9kZWwgJiYgdGhpcy5tb2RlbC5iaW5kVXBHTW9kZWwuaXNIYXZhU3BlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlTHZEaXNwbGF5KCkge1xuICAgICAgICBpZiAodGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLmlzR3JvdW5kICYmIHRoaXMubW9kZWwuZ2V0THYoKSAhPSB0aGlzLl9zaG93THYpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dMdiA9IHRoaXMubW9kZWwuZ2V0THYoKTtcbiAgICAgICAgICAgIHRoaXMubGV2ZWxTcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sZXZlbFNwcml0ZS5zcHJpdGVGcmFtZSA9IFJlc0N0cmwuaW5zLmdldEdyb3VuZEZyYW1lKHRoaXMuX3Nob3dMdiAtIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZURpc3BsYXkodDogQ2VsbFR5cGUgPSBudWxsKSB7XG4gICAgICAgIGlmICgodGhpcy5tb2RlbCAmJiAhdGhpcy5tb2RlbC5pc0VtcHR5ICYmIHRoaXMuc2hvd1R5cGUgIT0gdGhpcy5tb2RlbC5nZXRUeXBlKCkpIHx8ICh0ICE9IG51bGwpKSB7XG4gICAgICAgICAgICBsZXQgZGlzcGxheVR5cGUgPSBOdW1iZXIoKHQgPT09IG51bGwgPyB0aGlzLm1vZGVsLmdldFR5cGUoKSA6IHQpKTtcbiAgICAgICAgICAgIGxldCBzcHJpdEluZGV4ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMucHJlZmFiQW5pbWF0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuc3BpbmVDZWxsQ3RybCA9IG51bGw7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoZGlzcGxheVR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIENlbGxUeXBlLkJvbWIxOlxuICAgICAgICAgICAgICAgIGNhc2UgQ2VsbFR5cGUuQm9tYjI6ICAgICAgICAgLy/mqKrlkJHngrjlvLlcbiAgICAgICAgICAgICAgICBjYXNlIENlbGxUeXBlLkJvbWIzOiAgICAgICAgIC8v56uW5ZCR54K45by5XG4gICAgICAgICAgICAgICAgY2FzZSBDZWxsVHlwZS5Cb21iNDpcbiAgICAgICAgICAgICAgICBjYXNlIENlbGxUeXBlLkJvbWI1OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNwaW5lQ2VsbChkaXNwbGF5VHlwZSwgUmVzQ3RybC5pbnMuZ2V0Q2VsbFByZWZhYihkaXNwbGF5VHlwZSAtIEJvbWJHYXApKTtcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRJbmRleCAtPSBCb21iR2FwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFRlc2h1TGlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBDZWxsVHlwZS5GaXNoOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNwaW5lQ2VsbChkaXNwbGF5VHlwZSwgUmVzQ3RybC5pbnMuZ2V0Q2VsbFByZWZhYig1KSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgQ2VsbFR5cGUuR2lybDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTcGluZUNlbGwoZGlzcGxheVR5cGUsIFJlc0N0cmwuaW5zLmdldENlbGxQcmVmYWIoNikpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIENlbGxUeXBlLkNvbmNoOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNwaW5lQ2VsbChkaXNwbGF5VHlwZSwgUmVzQ3RybC5pbnMuZ2V0Q2VsbFByZWZhYig3KSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgQ2VsbFR5cGUuQmFuYW5hOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVByZWZhYihSZXNDdHJsLmlucy5nZXRDZWxsUHJlZmFiKDgpKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIENlbGxUeXBlLkljZUNyZWFtOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVByZWZhYihSZXNDdHJsLmlucy5nZXRDZWxsUHJlZmFiKDkpKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBzcHJpdEluZGV4ID0gZGlzcGxheVR5cGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkaXNwbGF5VHlwZSAhPSBDZWxsVHlwZS5Hcm91bmQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLmlzUm9ja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOeBq+eureeahOWkhOeQhiFcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5jZWxsU3ByaXRlLnNwcml0ZUZyYW1lID0gUmVzQ3RybC5pbnMuZ2V0Um9rZXRGcmFtZXMoc3ByaXRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlUHJlZmFiKFJlc0N0cmwuaW5zLmdldFJva2V0UHJlZmFiKCkpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzcHJpdEluZGV4ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsU3ByaXRlLnNwcml0ZUZyYW1lID0gUmVzQ3RybC5pbnMuZ2V0Q2VsbEZyYW1lKGRpc3BsYXlUeXBlLCBzcHJpdEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93THYoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93R3JvdW5kKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkR2VtKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2hvd1R5cGUgPSBkaXNwbGF5VHlwZTtcbiAgICAgICAgICAgIGlmICgodGhpcy5zcGluZUNlbGxDdHJsIHx8IHRoaXMucHJlZmFiQW5pbWF0aW9uKSAmJiB0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlCb21iSWRlbChzcHJpdEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3JlYXRlVHlwZSA9PSBDcmVhdGVUeXBlLk5vdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5pc0V4ZWNCb21iICYmIHRoaXMuZXhlY0JvbWIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUx2RGlzcGxheSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FkZEdlbSgpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5HZW1MdiA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHNwcml0ZSA9IENvbW1vbi5jcmVhdGVTcHJpdGUobnVsbCwgUmVzQ3RybC5pbnMuZ2V0R2VtRnJhbWUodGhpcy5tb2RlbC5HZW1MdiAtIDEpKTtcbiAgICAgICAgICAgIHNwcml0ZS5ub2RlLnNldFNjYWxlKDAuOCk7XG4gICAgICAgICAgICBzcHJpdGUubm9kZS5wYXJlbnQgPSB0aGlzLmdyb3VuZC5ub2RlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUdyb3VuZFZpZXcoKSB7XG4gICAgICAgIGlmIChHYW1lTW9kZWwuaW5zLmlzSGF2YU1vdmVHcm91bmQpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcnMgPSBbY2MudjIoMCwgMSksIGNjLnYyKDAsIC0xKSwgY2MudjIoMSwgMCksIGNjLnYyKC0xLCAwKV07XG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGlycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRQb3MgPSB0aGlzLm1vZGVsLnBvcy5hZGQoZGlyc1tpbmRleF0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuQ2VsbExpc3QsIHRhcmdldFBvcyk7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwgJiYgY2VsbC5leHRDdHJsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuZXh0Q3RybC5zaG93R3JvdW5kKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dHcm91bmQoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwuaXNHcm91bmQpIHtcbiAgICAgICAgICAgIC8vIOWFiOa3u+WKoCBcbiAgICAgICAgICAgIHRoaXMuZ3JvdW5kLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2hhZG93Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IG9wdCA9IENvbW1vbi50ZXN0R3JvdW5kQm9yZGVyRGlzcGxheSh0aGlzLm1vZGVsLnBvcy54LCB0aGlzLm1vZGVsLnBvcy55LCBHYW1lTW9kZWwuaW5zLkNlbGxMaXN0LCB0aGlzLm1vZGVsLmdldFR5cGUoKSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gNDsgaS0tOykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBNb3ZlR3JvdW5kTmFtZXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IGJvcmRlciA9IHRoaXMuZ3JvdW5kLm5vZGUuZ2V0Q2hpbGRCeU5hbWUobmFtZSlcbiAgICAgICAgICAgICAgICBpZiAob3B0W2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghYm9yZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXIgPSBNLm5vZGVQb29sLmNyZWF0ZUl0ZW0oUmVzQ3RybC5pbnMuZ2V0R3JvdW5kQm9yZGVyUHJlZmFiKGkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlci5wYXJlbnQgPSB0aGlzLmdyb3VuZC5ub2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyICYmIGJvcmRlci5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ncm91bmQuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xuICAgICAgICAgICAgdGhpcy5ncm91bmQuc3ByaXRlRnJhbWUgPSBSZXNDdHJsLmlucy5nZXRHcm91bmRDZW50ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZ3JvdW5kLm5vZGUuc2V0Q29udGVudFNpemUoY2Muc2l6ZShDb21tb24uR1JJRF9XLCBDb21tb24uR1JJRF9IKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dMdigpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5nZXRMdigpKSB7XG4gICAgICAgICAgICBjb25zdCBsdiA9IGNjLmluc3RhbnRpYXRlKHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncG9zJykpXG4gICAgICAgICAgICBsdi5uYW1lID0gJ2x2JztcbiAgICAgICAgICAgIGx2LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBsdi5wYXJlbnQgPSB0aGlzLmNlbGxTcHJpdGUubm9kZTtcbiAgICAgICAgICAgIGx2LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5tb2RlbC5nZXRMdigpICsgJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRlc2h1TGlnaHQoKSB7XG4gICAgICAgIHRoaXMubG93ZXJOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBNLm5vZGVQb29sLmdldEl0ZW0oTm9kZVBvb2xLZXkuVGVzaHVMaWdodCwgdGhpcy50ZXNodUxpZ2h0KTtcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFJlc0N0cmwuaW5zLmdldEJvbWJCZyh0aGlzLm1vZGVsLmdldFR5cGUoKSAtIEJvbWJHYXApO1xuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubG93ZXJOb2RlO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlUHJlZmFiKHBiOiBjYy5QcmVmYWIpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gQ29tbW9uLmNyZWF0ZUVmZlByZWZhYih0aGlzLmNlbGxTcHJpdGUubm9kZSwgLypOb2RlUG9vbEtleS5Sb2tldCovbnVsbCwgcGIpXG4gICAgICAgIHRoaXMucHJlZmFiQW5pbWF0aW9uID0gcmVzdWx0LmN0cmw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVTcGluZUNlbGwodHlwZTogQ2VsbFR5cGUsIGNlbGxQcmVmYWI6IGNjLlByZWZhYikge1xuICAgICAgICB0aGlzLmNlbGxTcHJpdGUubm9kZS5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gQ29tbW9uLmNyZWF0ZVNwaW5lTm9kZSh0aGlzLmNlbGxTcHJpdGUubm9kZSwgY2VsbFByZWZhYiwgPGFueT50eXBlKTtcbiAgICAgICAgdGhpcy5zcGluZUNlbGxDdHJsID0gcmVzdWx0LmN0cmw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBub3RpZnlEZXN0b3J5KCkge1xuICAgICAgICBpZiAodGhpcy5lbGltYXRlTm90aWZ5KSB7XG4gICAgICAgICAgICBsZXQgaXNCb3JuID0gdGhpcy5tb2RlbC5iaW5kR01vZGVsID8gdGhpcy5tb2RlbC5iaW5kR01vZGVsLmlzQm9ybiA6IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbGltYXRlTm90aWZ5KGlzQm9ybik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrU3BlY2lhbENvbGxlY3QoKSB7XG4gICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5HYW1lQ01ELlNwZUNvbGxlY3QsIHRoaXMubW9kZWwpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwcmVEZXN0b3J5KCkge1xuICAgICAgICBpZiAodGhpcy5jZWxsU3ByaXRlKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxTcHJpdGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tTcGVjaWFsQ29sbGVjdCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwuR2VtTHYgPiAwKSB7XG4gICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy51cGRhdGVDb2xsZWN0Q291bnQoQ29sbGVjdFR5cGUuZ2VtLCB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSwgbnVsbCwgdGhpcy5tb2RlbC5HZW1Mdik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwucHJlRGVzdG9yeSgpO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uc3RvcCgpO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ub2ZmKCdvZmYnLCB0aGlzLm9uQW5pbWF0aW9uU3RvcCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdyb3VuZFZpZXcoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0RlbGF5VHlwZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RvcnlUaW1lID0gdGhpcy5nZXREZWxheUVsaW1hdGVUaW1lKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RvcnlUaW1lID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBleGVjRGVzdG9yeSgpIHtcbiAgICAgICAgdGhpcy5ub3RpZnlEZXN0b3J5KCk7XG4gICAgICAgIHRoaXMubW9kZWwuZGVzdG9yeSh0aGlzLmVsaW1hdGVUeXBlKTtcbiAgICAgICAgdGhpcy5tb2RlbC5vblVuQmluZCh0aGlzLm1vZGVsLnBvcyk7XG4gICAgICAgIHRoaXMubW9kZWwgPSBudWxsO1xuICAgICAgICB0aGlzLmRlc3RvcnlUaW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuQmluZEFkZFNjb3JlVGFzayA9IG51bGw7XG4gICAgICAgIHRoaXMuc2hvd1R5cGUgPSBDZWxsVHlwZS5FbXB0eTtcbiAgICAgICAgdGhpcy5jZWxsU3ByaXRlLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcblxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XG5cbiAgICAgICAgdGhpcy5jZWxsU3ByaXRlLnNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuc3BpbmVDZWxsQ3RybCkge1xuICAgICAgICAgICAgTS5ub2RlUG9vbC5mcmVlSXRlbSh0aGlzLnNob3dUeXBlLCB0aGlzLnNwaW5lQ2VsbEN0cmwubm9kZSlcbiAgICAgICAgICAgIHRoaXMuc3BpbmVDZWxsQ3RybCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJlZmFiQW5pbWF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnByZWZhYkFuaW1hdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgTS5ub2RlUG9vbC5mcmVlSXRlbShOb2RlUG9vbEtleS5DZWxsLCB0aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGVsYXlFbGltYXRlVGltZSgpOiBudW1iZXIge1xuICAgICAgICBsZXQgdGltZSA9IDA7XG4gICAgICAgIHN3aXRjaCAodGhpcy5lbGltYXRlVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBFbGltYXRlVHlwZS5Cb21iMjpcbiAgICAgICAgICAgIGNhc2UgRWxpbWF0ZVR5cGUuQm9tYjM6XG4gICAgICAgICAgICAgICAgdGltZSA9IEdhcFRpbWUuRGVsYXlEZXN0b3J5Q29sQW5kUm93O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFbGltYXRlVHlwZS5Cb21iMTpcbiAgICAgICAgICAgICAgICB0aW1lID0gR2FwVGltZS5EZWxheURlc3RvcnlCb21iO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBFbGltYXRlVHlwZS5Cb21iNDpcbiAgICAgICAgICAgICAgICB0aW1lID0gR2FwVGltZS5EZWxheURlc3RvcnlPY3RvcHVzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0Zpc2hCb21iKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGltZSA9IEdhcFRpbWUuRGVsYXlEZXN0b3J5RmlzaEJvbWI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aW1lO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBpc0RlbGF5VHlwZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZWxpbWF0ZVR5cGUgPT0gRWxpbWF0ZVR5cGUuQm9tYjMgfHxcbiAgICAgICAgICAgIHRoaXMuZWxpbWF0ZVR5cGUgPT0gRWxpbWF0ZVR5cGUuQm9tYjIgfHxcbiAgICAgICAgICAgIHRoaXMuZWxpbWF0ZVR5cGUgPD0gRWxpbWF0ZVR5cGUuQWxsICYmIHRoaXMuZWxpbWF0ZVR5cGUgPiBFbGltYXRlVHlwZS5EZWZhdWx0IHx8XG4gICAgICAgICAgICB0aGlzLmlzRmlzaEJvbWIoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tCb21iKHRhcmdldE1vZGVsOiBDZWxsTW9kZWwpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGlzQm9tYiA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLmlzQm9tYikge1xuICAgICAgICAgICAgbGV0IHBvcyA9IG51bGxcbiAgICAgICAgICAgIGlmICh0YXJnZXRNb2RlbCkge1xuICAgICAgICAgICAgICAgIHBvcyA9IHRhcmdldE1vZGVsLnBvcztcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0TW9kZWwuaXNCb21iKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpc0JvbWIgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhlY0JvbWIoeyBwb3MgfSlcbiAgICAgICAgICAgIH0sIDAuMSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNCb21iO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVQb3NpdGlvbigpIHtcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMubW9kZWwuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIHRoaXMuY2VsbFNwcml0ZS5ub2RlLnNldFBvc2l0aW9uKDAsIDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25BbmltYXRpb25TdG9wKGV2ZW50TmFtZTogc3RyaW5nLCBhbmlTdGF0ZTogY2MuQW5pbWF0aW9uU3RhdGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1vZGVsKSByZXR1cm47XG4gICAgICAgIHN3aXRjaCAoYW5pU3RhdGUubmFtZSkge1xuICAgICAgICAgICAgY2FzZSBBbmlOYW1lLmVsaW1hdGU6XG4gICAgICAgICAgICBjYXNlIEFuaU5hbWUuY29sbGVjdDpcbiAgICAgICAgICAgICAgICB0aGlzLnByZURlc3RvcnkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQW5pTmFtZS5mYWxsT3ZlcjpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5pc0JvbWIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm9tYklkZWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFuaU5hbWUuYm9tYkNyZWF0ZTpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5pc0JvbWIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsU3ByaXRlLm5vZGUuYW5nbGUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlCb21iSWRlbCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmlzQm9tYlJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC51bmxvY2tDcmVhdGVCb21iUG9zKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLmlzRXhlY0JvbWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhlY0JvbWIoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuY29udGludWUyRmFsbCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBbmlOYW1lLnBvcnRhbEluOlxuICAgICAgICAgICAgY2FzZSBBbmlOYW1lLnBvcnRhbE91dDpcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWNQb3J0YWxSZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5Yqo55S75omn6KGM5Yy65Z+fICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgcHJpdmF0ZSBleGVjRXhjaGFuZ2VBbmkoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1J1bk1vdmUgJiYgdGhpcy5tb3ZlQWN0aW9uQXJ5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaXNSdW5Nb3ZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IG1vdmVEYXRhID0gdGhpcy5tb3ZlQWN0aW9uQXJ5LnNoaWZ0KCk7XG4gICAgICAgICAgICBjb25zdCBhMSA9IGNjLm1vdmVUbyhtb3ZlRGF0YS50LCBDb21tb24uZ2V0UG9zKG1vdmVEYXRhLnBvcy54LCBtb3ZlRGF0YS5wb3MueSkpO1xuICAgICAgICAgICAgY29uc3QgYTIgPSBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0JvbWIobW92ZURhdGEuZXApO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNSdW5Nb3ZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjRXhjaGFuZ2VBbmkoKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhMSwgYTIpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbWVpcmVueXVKdW1wUG9vbCA9IFtdO1xuICAgIHByaXZhdGUgaXNKdW1waW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIG1lcm1haWRKdW1wVG8odGFyZ2V0UG9zOiBjYy5WZWMyLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMubWVpcmVueXVKdW1wUG9vbC5wdXNoKHsgcG9zOiB0YXJnZXRQb3MsIGNiOiBjYWxsYmFjayB9KTtcbiAgICAgICAgaWYgKCF0aGlzLmlzSnVtcGluZykge1xuICAgICAgICAgICAgdGhpcy5fZXhlY01lcm1haWRKdW1wVGFzaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5omn6KGM576O5Lq66bG855qE6Lez6LeD5Lu75YqhISAqL1xuICAgIHByaXZhdGUgX2V4ZWNNZXJtYWlkSnVtcFRhc2soKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLm1laXJlbnl1SnVtcFBvb2wuc2hpZnQoKTtcbiAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuaXNKdW1waW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3BpbmVDZWxsQ3RybC5wbGF5KCdtZWlyZW55dV90aWFvJywgMCwgZmFsc2UsIG51bGwsIG51bGwsIHsgbmFtZTogJ21laXJlbnl1X3hpdXhpYW4nLCBsb29wOiB0cnVlIH0pO1xuICAgICAgICAgICAgdGhpcy5tb3ZlVG8oaXRlbS5wb3MsICgpID0+IHtcbiAgICAgICAgICAgICAgICBHYW1lTW9kZWwuaW5zLmV4ZWNFbGltYXRlT25lKGl0ZW0ucG9zLCBFbGltYXRlVHlwZS5HaXJsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzSnVtcGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGl0ZW0uY2IgJiYgaXRlbS5jYigpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2V4ZWNNZXJtYWlkSnVtcFRhc2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG1vdmVUbyh0YXJnZXRQb3M6IGNjLlZlYzIsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgcG9zID0gQ29tbW9uLmdldFBvcyh0YXJnZXRQb3MueCwgdGFyZ2V0UG9zLnkpO1xuICAgICAgICBjb25zdCBhMCA9IGNjLmRlbGF5VGltZSgwLjIpO1xuICAgICAgICBjb25zdCBhMSA9IGNjLm1vdmVUbygwLjIsIHBvcyk7XG4gICAgICAgIGNvbnN0IGEyID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYTAsIGExLCBhMikpO1xuICAgIH1cblxuXG4gICAgLyoq5pKt5pS+5aSN5ZCI54K45by554iG54K45YmN55qE5Yqo55S7ISAqL1xuICAgIHB1YmxpYyBwbGF5Q29tcGxleEJvbWJBbmkodHlwZSk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UocmVzb2x2ZSwgMCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlDaGFuZ2UyQ2VsbCgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheShBbmlOYW1lLmNoYW5nZTJjZWxsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhjaGFuZ2VEb3VibGVCb21iQW5pKHRhcmdldE1vZGVsOiBDZWxsTW9kZWwpIHtcbiAgICAgICAgaWYgKHRhcmdldE1vZGVsKSB7XG4gICAgICAgICAgICAvL1RvZG8g5b6F5pKt5pS+55u45bqU55qE6aqo6aq85Yqo55S7Li4uLi4g5L2G5piv6L+Z6YeM5LiN55+l6YGT6KaB5pKt5pS+5ZOq56eN57G75Z6L5ZGALj9cbiAgICAgICAgICAgIGNvbnN0IGExID0gY2MubW92ZVRvKDAuMTUsIENvbW1vbi5nZXRQb3ModGFyZ2V0TW9kZWwucG9zLngsIHRhcmdldE1vZGVsLnBvcy55KSk7XG4gICAgICAgICAgICBjb25zdCBhMiA9IGNjLmNhbGxGdW5jKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBncm91cElkID0gR2FtZU1vZGVsLmlucy5zZXEubmV4dCgpO1xuICAgICAgICAgICAgICAgIHRhcmdldE1vZGVsLm9uTXNnKE1zZ1R5cGUuQ29tcGxleEJvbWIsIHsgdHlwZTE6IHRoaXMubW9kZWwuZ2V0VHlwZSgpLCB0eXBlMjogdGFyZ2V0TW9kZWwuZ2V0VHlwZSgpLCBncm91cElkIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUJvbWJTaW5nbGVEZXN0b3J5RWZmKDAuMSwgR2FwVGltZS5Cb21iTWVyZ2VCb21iQ2hhbmdlVGltZSwgZmFsc2UsIGdyb3VwSWQpO1xuICAgICAgICAgICAgICAgIC8vIHRhcmdldE1vZGVsLmV4dEN0cmwucGxheUJvbWJTaW5nbGVEZXN0b3J5RWZmKDAuMSwgR2FwVGltZS5Cb21iTWVyZ2VCb21iQ2hhbmdlVGltZSwgZmFsc2UsIGdyb3VwSWQpO1xuICAgICAgICAgICAgfSwgdGhpcylcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYTEsIGEyKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZXhlY0Zpc2hCb21iKCkge1xuICAgICAgICAvL+aYr+eCuOW8uemxvCzlubbkuJTooqvlhbbku5bngrjlvLnngrjmrbvnmoQh5omn6KGM54iG54K4IVxuICAgICAgICB0aGlzLm1vZGVsLmluaXRCb21iTW9kZWwoQ2VsbFR5cGUuRmlzaCk7XG4gICAgICAgIHRoaXMubW9kZWwub25Nc2coTXNnVHlwZS5Cb21iKTtcbiAgICAgICAgdGhpcy5tb2RlbC5pc0JvbWIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGV4ZWNSb2tldCgpIHtcbiAgICAgICAgY29uc3QgdGltZUxpbmUgPSBHcm91cEFuaW1hdEN0cmwuaW5zLmNyZWF0ZVRpbWVMaW5lKCk7XG4gICAgICAgIGNvbnN0IGdyb3VuZElkID0gdGhpcy5tb2RlbC5Hcm91cElkO1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMzsgaS0tOykge1xuICAgICAgICAgICAgdGltZUxpbmUuYWRkKGdzYXAuVHdlZW5MaXRlLmRlbGF5ZWRDYWxsKEdhcFRpbWUuVGhyZWVQbGFuZUNyZWF0ZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIEdhbWVNb2RlbC5pbnMuZXhlY0VsaW1hdGUodGhpcy5tb2RlbCwgbnVsbCwgRWxpbWF0ZVR5cGUuUm9ja2V0LCBudWxsLCBudWxsLCBncm91bmRJZCk7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPj0gMykge1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5piv5ZCm5pivM+S4qumxvOeCuOW8uea2iOmZpC7mraTml7bmu57nqboz5Liq6bG8ICovXG4gICAgcHJpdmF0ZSBpc0Zpc2hTaW5nbGVCb21iKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMubW9kZWwuZ2V0VHlwZSgpID09IENlbGxUeXBlLkZpc2ggJiYgdGhpcy5lbGltYXRlVHlwZSAhPSBFbGltYXRlVHlwZS5EZWZhdWx0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRmlzaEJvbWIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAodGhpcy5tb2RlbC5nZXRUeXBlKCkgPT0gQ2VsbFR5cGUuRmlzaCAmJiAodGhpcy5lbGltYXRlU2l6ZSA9PSAzIHx8IHRoaXMuZWxpbWF0ZVR5cGUgIT0gRWxpbWF0ZVR5cGUuRGVmYXVsdCkpO1xuICAgIH1cblxuICAgIC8qKuWNleS4qumUgOavgeWKqOeUuyAqL1xuICAgIHB1YmxpYyBwbGF5RWxpbWF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNGaXNoU2luZ2xlQm9tYigpICYmICF0aGlzLmFuaW1hdGlvblN0YXRlICYmIHRoaXMuZWxpbWF0ZVR5cGUgIT0gRWxpbWF0ZVR5cGUuR2lybCkge1xuICAgICAgICAgICAgdGhpcy5leGVjRmlzaEJvbWIoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5tb2RlbCAmJiAhdGhpcy5tb2RlbC5pc0VtcHR5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5pc1JvY2tldCAmJiB0aGlzLmVsaW1hdGVTaXplICE9IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWNSb2tldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5tb2RlbC5pc0NvbGxlY3QgJiYgR2FtZU1vZGVsLmlucy5nZXRDb2xsZWN0KCkuZ2V0KHRoaXMubW9kZWwuZ2V0VHlwZSgpICsgJycpID4gMCAmJiB0aGlzLmVsaW1hdGVUeXBlID09IEVsaW1hdGVUeXBlLkRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAvL+aUtumbhueJqSEhXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5Q29sbGVjdEFuaSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNQbGF5RWxpbWF0ZUFuaW1hdGlvbigpICYmICghdGhpcy5hbmltYXRpb25TdGF0ZSB8fCAodGhpcy5hbmltYXRpb25TdGF0ZSAmJiB0aGlzLmFuaW1hdGlvblN0YXRlLm5hbWUgIT0gQW5pTmFtZS5lbGltYXRlKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9IHRoaXMuYW5pbWF0aW9uLnBsYXkoQW5pTmFtZS5lbGltYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5TGl0dGxlRWxpbWF0ZUVmZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNQbGF5RWxpbWF0ZUFuaW1hdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm1vZGVsLmdldFR5cGUoKSAhPSBDZWxsVHlwZS5CYW5hbmEpXG4gICAgfVxuXG4gICAgLyoq5ZCI5oiQ54K45by55pe2LOeCuOW8ueeahOihpemXtOWKqOeUuyAqL1xuICAgIHB1YmxpYyBwbGF5Q3JlYXRlQm9tYkFuaSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFuaW1hdGlvbikge1xuICAgICAgICAgICAgdGhpcy5pbml0QW5pbWF0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2RlbC5pc0JvbWJSZWFkeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5wbGF5KEFuaU5hbWUuYm9tYkNyZWF0ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwbGF5TGl0dGxlRWxpbWF0ZUVmZigpIHtcbiAgICAgICAgY29uc3Qgd29scmRQb3MgPSBDb21tb24uZ2V0V29ybGRQb3ModGhpcy5ub2RlKTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlbC5nZXRUeXBlKCkgPT0gQ2VsbFR5cGUuQmFuYW5hKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmVmYWJBbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZWZhYkFuaW1hdGlvbi5wbGF5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5wcmVEZXN0b3J5LmJpbmQodGhpcyksIDAuNSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVEZXN0b3J5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5lbGltYXRlVHlwZSAhPSBFbGltYXRlVHlwZS5Cb21iMSAmJiB0aGlzLm1vZGVsLmdldFR5cGUoKSAhPSBDZWxsVHlwZS5JY2VDcmVhbSkge1xuICAgICAgICAgICAgLy8gTS5wbGF0Zm9ybS52aWJyYXRlU2hvcnQoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLmlzR3JvdW5kKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5QnJva2VuRWZmKHdvbHJkUG9zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LkVmZmVjdC5MaXR0bGVCb21iLCB3b2xyZFBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuU291bmQuUGxheVNvdW5kRWZmLCBBdWRpb0lELkVsaW1hdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb2RlbC5ub3RpZnlSb3VuZEVsaW1hdGUodGhpcy5lbGltYXRlVHlwZSk7XG4gICAgICAgIC8vIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgLy8gICAgIE0uZXZlbnQuc2VuZChFdmVudC5FZmZlY3QuU2hvd0RvdCwgdGhpcy5lbGltYXRlVHlwZSwgd29scmRQb3MpO1xuICAgICAgICAvLyB9LCBHYXBUaW1lLkRlbGF5TGlnaHRQb2ludCk7XG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlCcm9rZW5FZmYocG9zPzogY2MuVmVjMikge1xuICAgICAgICBwb3MgPSBwb3MgfHwgQ29tbW9uLmdldFdvcmxkUG9zKHRoaXMubm9kZSk7XG4gICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5FZmZlY3QuQnJva2VuLCBwb3MpO1xuICAgICAgICBpZiAodGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLmdldEx2KCkgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHcm91bmRWaWV3KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirngrjlvLnlnKjmoYzpnaLkuIrnmoTlkbzlkLjliqjnlLsgKi9cbiAgICBwcml2YXRlIHBsYXlCb21iSWRlbCh0eXBlPzogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnNwaW5lQ2VsbEN0cmwpIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbFNwcml0ZS5zcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgICAgICAgICAvL+aSreWRvOWQuOWKqOeUu+S4jeW6lOivpeWGsuaOiemUgOavgeWKqOeUuyFcbiAgICAgICAgICAgIGxldCBuYW1lID0gbnVsbDtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLmdldFR5cGUoKSA9PSBDZWxsVHlwZS5GaXNoKSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9IFNwaW5lQ2VsbElkZWxOYW1lW1NwaW5lQ2VsbElkZWxOYW1lLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNwaW5lQ2VsbEN0cmwuY3VyUGxheSAhPSBTcGluZUNlbGxCb21iTmFtZVt0aGlzLm1vZGVsLmdldFR5cGUoKSAtIEJvbWJHYXBdKSB7XG4gICAgICAgICAgICAgICAgbmFtZSA9IFNwaW5lQ2VsbElkZWxOYW1lW3RoaXMubW9kZWwuZ2V0VHlwZSgpIC0gQm9tYkdhcF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNwaW5lQ2VsbEN0cmwucGxheShuYW1lLCAwLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZGVsLmlzUm9ja2V0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmVmYWJBbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZWZhYkFuaW1hdGlvbi5wbGF5KGAke3R5cGV9X3poYW5neXVHR0lkbGVgKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdwcmVmYWJBbmltYXRpb246JywgYCR7dHlwZX1femhhbmd5dUdHSWRsZWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYW5pbWF0aW9uICYmIHRoaXMubW9kZWwuaXNCb21iKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5wbGF5KEFuaU5hbWUuYm9tYklkbGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5omn6KGM57uR5a6a5aW955qE5Yqg5YiG5pWw5pa55rOVICovXG4gICAgcHJpdmF0ZSBfZXhlY0JpbmRBZGRTY29yZUZ1bihjb3VudDogbnVtYmVyID0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5CaW5kQWRkU2NvcmVUYXNrKSB7XG4gICAgICAgICAgICB0aGlzLkJpbmRBZGRTY29yZVRhc2soQ29tbW9uLmdldFdvcmxkUG9zKHRoaXMubm9kZSksIGNvdW50KTtcbiAgICAgICAgICAgIHRoaXMuQmluZEFkZFNjb3JlVGFzayA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirngrjlvLnoh6rplIDmr4HliqjnlLsgKi9cbiAgICBwdWJsaWMgcGxheUJvbWJTaW5nbGVEZXN0b3J5RWZmKGtlZXBUaW1lOiBudW1iZXIgPSAwLjIsIHBsYXlUaW1lOiBudW1iZXIgPSAwLjIsIGlzU3BpbmVFZmY6IGJvb2xlYW4gPSBmYWxzZSwgZ3JvdXBJZDogbnVtYmVyID0gbnVsbCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIChncm91cElkICYmICF0aGlzLm1vZGVsLkdyb3VwSWQpICYmICh0aGlzLm1vZGVsLkdyb3VwSWQgPSBncm91cElkKTtcbiAgICAgICAgICAgIHRoaXMubW9kZWwub25Nc2coTXNnVHlwZS5FbGltYXRlLCB7IGlkOiBncm91cElkLCBpc0ZvcmNlZDogdHJ1ZSB9KTtcblxuICAgICAgICAgICAgY29uc3Qgb3ZlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnVubG9ja0NyZWF0ZUJvbWJQb3MoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVEZXN0b3J5KCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lbGltYXRlVHlwZSA9IHRoaXMubW9kZWwuZ2V0VHlwZSgpO1xuICAgICAgICAgICAgdGhpcy5fZXhlY0JpbmRBZGRTY29yZUZ1bigpO1xuXG4gICAgICAgICAgICBpZiAoaXNTcGluZUVmZiAmJiB0aGlzLnNwaW5lQ2VsbEN0cmwgJiYgIXRoaXMuaXNQcmVEZXN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gU3BpbmVDZWxsQm9tYk5hbWVbdGhpcy5tb2RlbC5nZXRUeXBlKCkgLSBCb21iR2FwXTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5lQ2VsbEN0cmwucGxheShuYW1lLCAwLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2Uob3ZlciwgMC4zICsgcGxheVRpbWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZGVsLmlzUm9ja2V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJlZmFiQW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJlZmFiQW5pbWF0aW9uLnBsYXkoYCR7dGhpcy5tb2RlbC5nZXRUeXBlKCl9X3poYW5neXVHR2ApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShvdmVyLCAwLjMgKyBwbGF5VGltZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhMCA9IGNjLmZhZGVPdXQoa2VlcFRpbWUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGExID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxTcHJpdGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhMiA9IGNjLmRlbGF5VGltZShwbGF5VGltZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgYTMgPSBjYy5jYWxsRnVuYyhvdmVyLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGEwLCBhMSwgYTIsIGEzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDmiafooYzniIbngrjml7bkvZnpnIfnmoTliqjnlLtcbiAgICAqIEBwYXJhbSBib21iTHYg5b2T5YmN55qE5L2Z5rOi562J57qnXG4gICAgKiBAcGFyYW0gY2VudGVyUG9zIOS4reW/g+eCueeahOS9jee9rijnvZHmoLwpIVxuICAgICovXG4gICAgcHVibGljIGV4ZWNCb21iQWZ0ZXJTaG9ja3MoYm9tYkx2OiBudW1iZXIsIGNlbnRlclBvczogY2MuVmVjMikge1xuICAgICAgICBpZiAodGhpcy5tb2RlbCAmJiAhdGhpcy5tb2RlbC5pc0RlYXRoICYmICF0aGlzLmlzSGF2YVNwZSgpICYmICF0aGlzLmlzUGxheUJvbWJTaG9ja3MpIHtcbiAgICAgICAgICAgIHRoaXMuaXNQbGF5Qm9tYlNob2NrcyA9IHRydWU7XG4gICAgICAgICAgICBjb25zdCBjcCA9IENvbW1vbi5nZXRQb3MoY2VudGVyUG9zLngsIGNlbnRlclBvcy55KTtcbiAgICAgICAgICAgIGNvbnN0IHNwID0gdGhpcy5tb2RlbC5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgLy8gIOiuoeeul+inkuW6piBcbiAgICAgICAgICAgIGNvbnN0IHJhZGlhbnM6IG51bWJlciA9IE1hdGguYXRhbjIoKGNwLnggLSBzcC54KSwgKGNwLnkgLSBzcC55KSk7XG4gICAgICAgICAgICBjb25zdCBkZWdyZWVzOiBudW1iZXIgPSByYWRpYW5zICogLTE4MCAvIE1hdGguUEk7XG5cbiAgICAgICAgICAgIGNvbnN0IGRpciA9IENvbW1vbi5nZXREaXJjdGlvbihjcCwgc3ApO1xuXG4gICAgICAgICAgICBjb25zdCBhMCA9IGNjLm1vdmVCeSgwLjIsIGNjLnYyKC1kaXIueCAqIChib21iTHYgKiA0KSwgLWRpci55ICogKGJvbWJMdiAqIDQpKSk7XG4gICAgICAgICAgICBjb25zdCBhMSA9IGNjLm1vdmVCeSgwLjIsIGNjLnYyKGRpci54ICogKGJvbWJMdiAqIDgpLCBkaXIueSAqIChib21iTHYgKiA4KSkpO1xuICAgICAgICAgICAgY29uc3QgYTIgPSBjYy5tb3ZlVG8oMC4yLCBjYy52MigwLCAwKSk7IC8vIDxhbnk+YTEucmV2ZXJzZSgpO1xuICAgICAgICAgICAgY29uc3QgYTMgPSBjYy5zZXF1ZW5jZShjYy5yb3RhdGVUbygwLjEsIChkZWdyZWVzICogMC4xKSAqIChib21iTHYgKiAwLjUpKSwgY2Mucm90YXRlVG8oMC4xLCAwKSk7XG5cbiAgICAgICAgICAgIC8vIOW9ouWPmOWKqOeUuy7mmoLnvLrmnKrlrozmiJBcbiAgICAgICAgICAgIC8vIGNvbnN0IGExID0gY2Muc2NhbGVUbygwLjEsICgxLjEgKiAoYm9tYkx2ICogMC40KSkpO1xuICAgICAgICAgICAgLy8gY29uc3QgYTIgPSBjYy5zY2FsZVRvKDAuMSwgMC45NSk7XG4gICAgICAgICAgICAvLyBjb25zdCBhMyA9IGNjLnNjYWxlVG8oMC4xLCAxKTtcblxuICAgICAgICAgICAgY29uc3Qgb3ZlciA9IGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxTcHJpdGUubm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxTcHJpdGUubm9kZS5hbmdsZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1BsYXlCb21iU2hvY2tzID0gZmFsc2U7XG4gICAgICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICAgICAgdGhpcy5jZWxsU3ByaXRlLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNwYXduKGNjLnNlcXVlbmNlKGEwLCBhMSwgYTIpLCBhMyksIG92ZXIpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKua4uOaIj+e7k+adn+WwhuaZrumAmuWFg+e0oOi9rOaNouaIkOeCuOW8ueWKqOeUuyAqL1xuICAgIHB1YmxpYyBjaGFuZ2UyQm9tYih0eXBlPzogQ2VsbFR5cGUpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwuY2hhbmdlMkJvbWIodHlwZSk7XG4gICAgICAgICAgICB0aGlzLmNlbGxTcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG4gICAgICAgICAgICB0aGlzLnBsYXlDcmVhdGVCb21iQW5pKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirlh7rnlJ/ngrnliJvlu7rml7Ys5YWD57Sg5Ye655Sf5Yqo55S7ICovXG4gICAgcHJpdmF0ZSBwbGF5RW50ZXJBbmkoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5mYWRlSW4oMC4xNSkpO1xuICAgIH1cblxuICAgIC8qKuS4i+iQveS4reeahOWKqOeUuyAqL1xuICAgIHB1YmxpYyBwbGF5RmFsbFN0YXJ0QW5pKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5RmFsbCAmJiAhdGhpcy5pc0hhdmFTcGUoKSkge1xuICAgICAgICAgICAgdGhpcy5pc1BsYXlGYWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXlBZGRpdGl2ZShBbmlOYW1lLmZhbGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq6LSd5aOz5oqW5YqoICovXG4gICAgcHVibGljIHBsYXlTaGFraW5nKCkge1xuICAgICAgICBjb25zdCBhMCA9IGNjLm1vdmVCeSgwLjA1LCBjYy52MihVdGlsLlRvb2wucmFuZ2VJbnQoMiwgNSksIFV0aWwuVG9vbC5yYW5nZUludCgyLCA1KSkpXG4gICAgICAgIGNvbnN0IGExID0gPGFueT5hMC5yZXZlcnNlKCk7XG4gICAgICAgIHRoaXMuY2VsbFNwcml0ZS5ub2RlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKGNjLnNlcXVlbmNlKGEwLCBhMSkpKTtcbiAgICAgICAgLy8gdGhpcy5hbmltYXRpb24ucGxheShBbmlOYW1lLnNoYWtpbmcpO1xuICAgIH1cblxuICAgIC8qKuS4i+iQveaaguWBnCAqL1xuICAgIHB1YmxpYyBwbGF5RmFsbFBhdXNlQW5pKCkge1xuICAgICAgICBpZiAodGhpcy5pc1BsYXlGYWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlzUGxheUZhbGwgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoQW5pTmFtZS5mYWxsUGF1c2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5LiL6JC957uT5p2f5pe255qE5Yqo55S7ICovXG4gICAgcHVibGljIHBsYXlGYWxsT3ZlckFuaSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBvcnRhbFJlc29sdmUgJiYgIXRoaXMuaXNIYXZhU3BlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaXNQbGF5RmFsbCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwuZ2V0VHlwZSgpID09IENlbGxUeXBlLkljZUNyZWFtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVmYWJBbmltYXRpb24gJiYgdGhpcy5wcmVmYWJBbmltYXRpb24ucGxheSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5wbGF5KEFuaU5hbWUuZmFsbE92ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5raI6Zmk5o+Q56S65pe25Y2V5Liq55qE6YKj5LiqICovXG4gICAgcHVibGljIHBsYXlTaW5nbGVQcm9tcHQobXVsUG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBjb25zdCBkaXIgPSBDb21tb24uZ2V0RGlyY3Rpb24obXVsUG9zLCB0aGlzLm1vZGVsLnBvcyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGdhcCA9IDY7XG4gICAgICAgICAgICBjb25zdCBzaG9ja0dhcCA9IDU7XG4gICAgICAgICAgICBjb25zdCBhMSA9IGNjLnNwYXduKGNjLnNjYWxlVG8oMC41LCAxLjA1KSwgY2MubW92ZVRvKDAuNSwgY2MudjIoZGlyLnggKiBnYXAsIGRpci55ICogLWdhcCkpKTtcbiAgICAgICAgICAgIGNvbnN0IGEyID0gY2MucmVwZWF0KGNjLnNlcXVlbmNlKGNjLm1vdmVCeSgwLjIsIGNjLnYyKGRpci54ICogc2hvY2tHYXAsIGRpci55ICogLXNob2NrR2FwKSksIGNjLm1vdmVCeSgwLjIsIGNjLnYyKGRpci54ICogLXNob2NrR2FwLCBkaXIueSAqIHNob2NrR2FwKSkpLCAyKTtcbiAgICAgICAgICAgIGNvbnN0IGEzID0gY2Muc3Bhd24oY2Muc2NhbGVUbygwLjIsIDEuMCksIGNjLm1vdmVUbygwLjIsIGNjLnYyKDAsIDApKSk7XG4gICAgICAgICAgICBjb25zdCBhNCA9IGNjLmRlbGF5VGltZSgwLjUpO1xuICAgICAgICAgICAgdGhpcy5jZWxsU3ByaXRlLm5vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoYTEsIGEyLCBhMywgYTQpKSk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKua2iOmZpOaPkOekuuaXtuWkmuS4queahOmCo+S4qiAqL1xuICAgIHB1YmxpYyBwbGF5TXVsUHJvbXB0KCkge1xuICAgICAgICBpZiAodGhpcy5hbmltYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXlBZGRpdGl2ZShBbmlOYW1lLnByb21wdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcGxheVJvdGF0aW5nTWVyZ2UoY2VudGVyUG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIHRoaXMucm90YXRpbmdDdHJsID0gbmV3IFJvdGF0aW5nQ3RybCh0aGlzLm5vZGUsIGNlbnRlclBvcyk7XG4gICAgICAgIHRoaXMucm90YXRpbmdDdHJsLnN0YXJ0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNlbGxTcHJpdGUgJiYgKHRoaXMuY2VsbFNwcml0ZS5ub2RlLmFjdGl2ZSA9IGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMucm90YXRpbmdDdHJsID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlNZXJnZU5vcm1hbEJvbWIoY2VudGVyUG9zOiBjYy5WZWMyLCB0aW1lOiBudW1iZXIgPSBHYXBUaW1lLk1lcmdlQm9tYlNwZWVkLCBpc05lZWREZXN0b3J5OiBib29sZWFuID0gdHJ1ZSwgaXNTaG93U3BlZWRMaW5lOiBib29sZWFuID0gdHJ1ZSkge1xuICAgICAgICAvL+agueaNruaWueWQkSzlgZrlj5jlvaIhICBcbiAgICAgICAgaWYgKHRoaXMubW9kZWwuaXNSb2NrZXQgJiYgdGhpcy5lbGltYXRlU2l6ZSAhPSAwKSB7XG4gICAgICAgICAgICB0aGlzLmV4ZWNSb2tldCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRpciA9IENvbW1vbi5nZXREaXJjdGlvbihjZW50ZXJQb3MsIHRoaXMubW9kZWwucG9zKTtcbiAgICAgICAgY29uc3QgY2VudGVyUG9zaXRpb24gPSBDb21tb24uZ2V0UG9zKGNlbnRlclBvcy54LCBjZW50ZXJQb3MueSk7XG4gICAgICAgIGxldCB7IHN4LCBzeSB9ID0geyBzeDogMSwgc3k6IDEgfTtcbiAgICAgICAgaWYgKGRpci54ICE9IDApIHtcbiAgICAgICAgICAgIHN4ID0gMS4yOyBzeSA9IDAuODtcbiAgICAgICAgfSBlbHNlIGlmIChkaXIueSAhPSAwKSB7XG4gICAgICAgICAgICBzeCA9IDAuODsgc3kgPSAxLjI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYTAgPSBjYy5zY2FsZVRvKDAuMDUsIHN4LCBzeSk7XG4gICAgICAgIGNvbnN0IGExID0gY2MubW92ZVRvKHRpbWUsIGNlbnRlclBvc2l0aW9uKTtcbiAgICAgICAgY29uc3QgYTIgPSBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNOZWVkRGVzdG9yeSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJlRGVzdG9yeSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxTcHJpdGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHRoaXMubW9kZWwubm90aWZ5Um91bmRFbGltYXRlKHRoaXMuZWxpbWF0ZVR5cGUpO1xuICAgICAgICBpZiAoaXNTaG93U3BlZWRMaW5lKSB7XG4gICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuRWZmZWN0LlNwZWVkTGluZSwgQ29tbW9uLmdldFdvcmxkUG9zKHRoaXMubm9kZSksIGRpcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zcGF3bihhMCwgYTEpLCBhMikpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdG9wUHJvbXB0QWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5jZWxsU3ByaXRlKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5zdG9wKCk7XG4gICAgICAgICAgICB0aGlzLmNlbGxTcHJpdGUubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5jZWxsU3ByaXRlLm5vZGUuc2V0UG9zaXRpb24oMCwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5yZXNldERpc3BsYXlJbmZvKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHBvcnRhbE91dCgpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBpZiAoIXRoaXMucG9ydGFsUmVzb2x2ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3J0YWxSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5wbGF5KEFuaU5hbWUucG9ydGFsT3V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBwb3J0YWxJbigpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBpZiAoIXRoaXMucG9ydGFsUmVzb2x2ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3J0YWxSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5wbGF5KEFuaU5hbWUucG9ydGFsSW4pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBleGVjUG9ydGFsUmVzb2x2ZSgpIHtcbiAgICAgICAgdGhpcy5wb3J0YWxSZXNvbHZlICYmIHRoaXMucG9ydGFsUmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgdGhpcy5wb3J0YWxSZXNvbHZlID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKirmnKzouqvmmK/mlLbpm4bniaks6ZyA6KaB5YGa5LuA5LmI5qC355qE6L+H5bqm5Yqo55S7ID8/Pz8gKi9cbiAgICBwcml2YXRlIHBsYXlDb2xsZWN0QW5pKCkge1xuICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMTAwO1xuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gdGhpcy5hbmltYXRpb24ucGxheShBbmlOYW1lLmNvbGxlY3QpO1xuICAgICAgICB0aGlzLnBsYXlMaXR0bGVFbGltYXRlRWZmKCk7XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiDliqjnlLvmiafooYzljLrln58gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBwcml2YXRlIGNoZWNrRGVzdG9yeShkdCkge1xuICAgICAgICBpZiAodGhpcy5kZXN0b3J5VGltZSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RvcnlUaW1lIC09IGR0O1xuICAgICAgICAgICAgaWYgKHRoaXMuZGVzdG9yeVRpbWUgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhlY0Rlc3RvcnkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLmlzRGVhdGgpIHtcbiAgICAgICAgICAgIHRoaXMuZGVhdGhUaW1lb3V0ICs9IGR0O1xuICAgICAgICAgICAgaWYgKC8qIXRoaXMuYW5pbWF0aW9uU3RhdGUgJiYqLyB0aGlzLmRlYXRoVGltZW91dCA+IDUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlYXRoVGltZW91dCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5RWxpbWF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVUZXN0TGFiZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3BvcycpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYCR7dGhpcy5tb2RlbC5wb3MueH0tJHt0aGlzLm1vZGVsLnBvcy55fWBcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLm1vZGVsLkdyb3VwSWQpIHtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3BvcycpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYCR7dGhpcy5tb2RlbC5Hcm91cElkfWBcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdwb3MnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICcnO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9yZGVybHlVcGRhdGUoZHQpIHtcbiAgICAgICAgLy/luKfnjofpmZDliLYuLi7lvZPnjrDmnInluKfnjofml7bpl7Tov5zov5zotoXov4fljZXmoLzljZXkvY3ml7bpl7Qs5YiZ6ZmQ5Yi2ISBcbiAgICAgICAgaWYgKGR0ID4gRmFsbE1heEdhdGVMaW1pdCkge1xuICAgICAgICAgICAgZHQgPSBGYWxsTWF4R2F0ZUxpbWl0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwuaXNGYWxsICYmICF0aGlzLmlzUnVuTW92ZSkge1xuXG4gICAgICAgICAgICBsZXQgeCA9IHRoaXMubm9kZS54ICsgdGhpcy5tb2RlbC5zcGVlZC54ICogdGhpcy5tb2RlbC5mYWxsaW5nRGlyLnggKiBkdDtcbiAgICAgICAgICAgIGxldCB5ID0gdGhpcy5ub2RlLnkgLSB0aGlzLm1vZGVsLnNwZWVkLnkgKiB0aGlzLm1vZGVsLmZhbGxpbmdEaXIueSAqIGR0O1xuXG4gICAgICAgICAgICAvL+eCuOW8uemcgOimgeWHhuWkh+WlveS6hi7miY3og73mjonokL0hXG4gICAgICAgICAgICBpZiAoIXRoaXMubW9kZWwuaXNCb21iIHx8ICh0aGlzLm1vZGVsLmlzQm9tYiAmJiB0aGlzLm1vZGVsLmlzQm9tYlJlYWR5KSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLmZhbGxEZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/lpITnkIbnm67moIflnZDmoIfkv67mraMhIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5mYWxsaW5nRGlyLnggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0geCA+IHRoaXMubW9kZWwuZmFsbERlcy54ID8gdGhpcy5tb2RlbC5mYWxsRGVzLnggOiB4O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgeCA9IHggPCB0aGlzLm1vZGVsLmZhbGxEZXMueCA/IHRoaXMubW9kZWwuZmFsbERlcy54IDogeDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB5ID0geSA8IHRoaXMubW9kZWwuZmFsbERlcy55ID8gdGhpcy5tb2RlbC5mYWxsRGVzLnkgOiB5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoeCAhPSAwIHx8IHkgIT0gMCB8fCAhdGhpcy5ub2RlLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHgsIHkpO1xuICAgICAgICAgICAgICAgIC8v5piv5ZCm5bey57uP5LiL6JC957uT5p2fIVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLnBvc0RldGVjdGlvbih0aGlzLm5vZGUucG9zaXRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5wbGF5RmFsbE92ZXJBbmkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG4gICAgICAgIHRoaXMuY2hlY2tEZXN0b3J5KGR0KTtcbiAgICAgICAgaWYgKEFwcHMuaXNEZWJ1Zykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUZXN0TGFiZWwoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiAodGhpcy5yb3RhdGluZ0N0cmwpIHtcbiAgICAgICAgLy8gICAgIHRoaXMucm90YXRpbmdDdHJsLnVwZGF0ZShkdCk7XG4gICAgICAgIC8vIH1cbiAgICB9XG59XG4iXX0=