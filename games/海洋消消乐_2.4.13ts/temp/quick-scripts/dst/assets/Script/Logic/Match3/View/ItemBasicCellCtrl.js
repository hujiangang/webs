
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
            this.ground.spriteFrame = ResCtrl_1.default.ins.groundCenter;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxJdGVtQmFzaWNDZWxsQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4Q0FBeUM7QUFDekMsNkNBQXdDO0FBQ3hDLCtDQUEwQztBQUMxQyw4Q0FBNEM7QUFDNUMsc0RBQXlIO0FBRXpILGdEQUErQztBQUMvQywwREFBc0Q7QUFFdEQsaURBQWdEO0FBQ2hELHdEQUFtRDtBQUNuRCxnREFBMkQ7QUFDM0Qsb0RBQWlEO0FBQ2pELHNDQUFpQztBQUNqQyxzREFBb0Q7QUFDcEQsMkNBQXNDO0FBQ3RDLGdFQUEyRDtBQUVyRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFNLE9BQU8sR0FBRztJQUNaLElBQUksRUFBRSxNQUFNO0lBQ1osU0FBUyxFQUFFLFdBQVc7SUFDdEIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsUUFBUSxFQUFFLFVBQVU7SUFDcEIsVUFBVSxFQUFFLFlBQVk7SUFDeEIsUUFBUSxFQUFFLFVBQVU7SUFDcEIsUUFBUSxFQUFFLFVBQVU7SUFDcEIsU0FBUyxFQUFFLFdBQVc7SUFDdEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsV0FBVyxFQUFFLGFBQWE7Q0FDN0IsQ0FBQTtBQUNELElBQU0sT0FBTyxHQUFXLEdBQUcsQ0FBQztBQUM1QixJQUFNLGlCQUFpQixHQUFHLENBQUMsZUFBZSxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFBO0FBQ3ZKLElBQU0saUJB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Y2VzQ29udGVudCI6WyJcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IEJhc2VJdGVtVmlldyBmcm9tIFwiLi9CYXNlSXRlbVZpZXdcIjtcbmltcG9ydCB7IE1zZ1R5cGUgfSBmcm9tIFwiLi4vTW9kZWwvQ2VsbEJhc2VcIjtcbmltcG9ydCB7IE5vZGVQb29sS2V5LCBDZWxsVHlwZSwgRWxpbWF0ZVR5cGUsIEdhbWVTdGF0ZSwgUnVuVGltZUdhdGUsIEZhbGxNYXhHYXRlTGltaXQgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IHsgQ2VsbE1vZGVsIH0gZnJvbSBcIi4uL01vZGVsL0NlbGxNb2RlbFwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IHsgR2FwVGltZSB9IGZyb20gXCIuLi8uLi9EYXRhL0NvbnN0L1RpbWVDb25maWdcIjtcbmltcG9ydCBTcGluZVBsYXllckN0cmwgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvQ3VzdG9tQ29tcG9uZW50L1NwaW5lUGxheWVyQ3RybFwiO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuLi8uLi8uLi9CYXNlL1V0aWxzL1V0aWxcIjtcbmltcG9ydCBSb3RhdGluZ0N0cmwgZnJvbSBcIi4uL0NvbnRyb2wvUm90YXRpbmdDdHJsXCI7XG5pbXBvcnQgR2FtZU1vZGVsLCB7IENyZWF0ZVR5cGUgfSBmcm9tIFwiLi4vTW9kZWwvR2FtZU1vZGVsXCI7XG5pbXBvcnQgeyBBdWRpb0lEIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9BdWRpb0N0cmxcIjtcbmltcG9ydCBSZXNDdHJsIGZyb20gXCIuLi9SZXNDdHJsXCI7XG5pbXBvcnQgeyBDb2xsZWN0VHlwZSB9IGZyb20gXCIuLi9Nb2RlbC9Db2xsZWN0TW9kZWxcIjtcbmltcG9ydCBBcHBzIGZyb20gXCIuLi8uLi8uLi9CYXNlL0FwcHNcIjtcbmltcG9ydCBHcm91cEFuaW1hdEN0cmwgZnJvbSBcIi4uLy4uL0NvbW1vbi9Hcm91cEFuaW1hdEN0cmxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuY29uc3QgQW5pTmFtZSA9IHtcbiAgICBmYWxsOiAnZmFsbCcsXG4gICAgZmFsbFBhdXNlOiAnZmFsbFBhdXNlJyxcbiAgICBlbGltYXRlOiAnZWxpbWF0ZScsXG4gICAgZmFsbE92ZXI6ICdmYWxsT3ZlcicsXG4gICAgYm9tYkNyZWF0ZTogJ2JvbWJDcmVhdGUnLFxuICAgIGJvbWJJZGxlOiAnYm9tYklkbGUnLFxuICAgIHBvcnRhbEluOiAncG9ydGFsSW4nLFxuICAgIHBvcnRhbE91dDogJ3BvcnRhbE91dCcsXG4gICAgcHJvbXB0OiAncHJvbXB0JyxcbiAgICBjb2xsZWN0OiAnY29sbGVjdCcsXG4gICAgc2hha2luZzogJ3NoYWtpbmcnLFxuICAgIGNoYW5nZTJjZWxsOiAnY2hhbmdlMmNlbGwnXG59XG5jb25zdCBCb21iR2FwOiBudW1iZXIgPSAxMDA7XG5jb25zdCBTcGluZUNlbGxJZGVsTmFtZSA9IFsnYmVpa2VfeGl1eGlhbicsICdoZW5nc3VkYW5feGl1eGlhbicsICdoZW5nc3VkYW5feGl1eGlhbjInLCAnemhhbmd5dV94aXV4aWFuJywgJ2lkbGVfaGFpbWEnLCAnJywgJycsICcnLCAnYmFvemhheXVfeGl1eGlhbiddXG5jb25zdCBTcGluZUNlbGxCb21iTmFtZSA9IFsnJywgJ2hlbmdzdWRhbl9iYW8nLCAnaGVuZ3N1ZGFuX2JhbycsICcnLCAnJ107XG5cbmNvbnN0IE1vdmVHcm91bmROYW1lcyA9IFsndXAnLCAnZG93bicsICdsZWZ0JywgJ3JpZ2h0J107XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtQmFzaWNDZWxsQ3RybCBleHRlbmRzIEJhc2VJdGVtVmlldzxDZWxsTW9kZWw+IHtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgY2VsbFNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgZ3JvdW5kOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBsZXZlbFNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGxvd2VyTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBzaGFkb3dOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgdGVzaHVMaWdodDogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIHB1YmxpYyBCaW5kQWRkU2NvcmVUYXNrOiBGdW5jdGlvbiA9IG51bGw7XG5cbiAgICBwcml2YXRlIHNob3dUeXBlOiBDZWxsVHlwZSA9IENlbGxUeXBlLkVtcHR5O1xuICAgIHByaXZhdGUgX3Nob3dMdjogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGFuaW1hdGlvbjogY2MuQW5pbWF0aW9uID0gbnVsbDtcbiAgICBwcml2YXRlIGFuaW1hdGlvblN0YXRlOiBjYy5BbmltYXRpb25TdGF0ZSA9IG51bGw7XG5cbiAgICBwcml2YXRlIG1vdmVBY3Rpb25Bcnk6IEFycmF5PHsgdDogbnVtYmVyLCBwb3M6IGNjLlZlYzIsIGVwOiBDZWxsTW9kZWwgfT4gPSA8YW55PltdO1xuICAgIHB1YmxpYyBpc1J1bk1vdmUgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgaXNQbGF5RmFsbCA9IGZhbHNlO1xuICAgIHByaXZhdGUgaXNQbGF5Qm9tYlNob2NrcyA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBzcGluZUNlbGxDdHJsOiBTcGluZVBsYXllckN0cmwgPSBudWxsO1xuICAgIHByaXZhdGUgcHJlZmFiQW5pbWF0aW9uOiBjYy5BbmltYXRpb24gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBlbGltYXRlVHlwZTogRWxpbWF0ZVR5cGUgfCBudW1iZXIgPSBFbGltYXRlVHlwZS5EZWZhdWx0O1xuICAgIHByaXZhdGUgZWxpbWF0ZVNpemU6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBlbGltYXRlTm90aWZ5OiBGdW5jdGlvbiA9IG51bGw7XG5cbiAgICAvKirplIEs5Yqo55S7ICovXG4gICAgcHJpdmF0ZSBwb3J0YWxSZXNvbHZlID0gbnVsbDtcblxuICAgIHByaXZhdGUgZGVzdG9yeVRpbWUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBkZWF0aFRpbWVvdXQgPSAwO1xuXG4gICAgcHJpdmF0ZSByb3RhdGluZ0N0cmw6IFJvdGF0aW5nQ3RybCA9IG51bGw7XG5cbiAgICBwcml2YXRlIGNyZWF0ZVR5cGU6IENyZWF0ZVR5cGUgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIGluaXQobW9kZWw6IENlbGxNb2RlbCwgY3JlYXRlVHlwZT86IENyZWF0ZVR5cGUpIHtcbiAgICAgICAgc3VwZXIuaW5pdChtb2RlbCk7XG4gICAgICAgIHRoaXMuaW5pdEFuaW1hdGlvbigpO1xuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIGlmICghbW9kZWwuaXNFbXB0eSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldERpc3BsYXlJbmZvKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcbiAgICAgICAgICAgIHRoaXMuQmluZEFkZFNjb3JlVGFzayA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVR5cGUgPSBjcmVhdGVUeXBlO1xuICAgICAgICAgICAgaWYgKGNyZWF0ZVR5cGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRQbGF5Q3JlYXRlQW5pbWF0aW9uKGNyZWF0ZVR5cGUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChDb21tb24uaXNCb21iVHlwZShtb2RlbC5nZXRUeXBlKCkpIHx8IG1vZGVsLmdldFR5cGUoKSA9PSBDZWxsVHlwZS5GaXNoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5wbGF5Qm9tYklkZWwuYmluZCh0aGlzKSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZWFzeUluaXQodHlwZTogQ2VsbFR5cGUpIHtcbiAgICAgICAgdGhpcy5yZXNldERpc3BsYXlJbmZvKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRGlzcGxheSh0eXBlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhjaGFuZ2UodGFyZ2V0UG9zOiBjYy5WZWMyLCB0aW1lOiBudW1iZXIsIGVwOiBDZWxsTW9kZWwpIHtcbiAgICAgICAgaWYgKHRoaXMubW92ZUFjdGlvbkFyeSkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlQWN0aW9uQXJ5LnB1c2goeyB0OiB0aW1lLCBwb3M6IHRhcmdldFBvcywgZXAgfSk7XG4gICAgICAgICAgICB0aGlzLmV4ZWNFeGNoYW5nZUFuaSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGVsaW1hdGUoY291bnQ6IG51bWJlciwgYmFzZVBvczogY2MuVmVjMiwgdHlwZTogRWxpbWF0ZVR5cGUgPSBFbGltYXRlVHlwZS5EZWZhdWx0LCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMubW9kZWwuaXNEZWF0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuZXhlY1VwRWxpbWF0ZSh0eXBlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVsaW1hdGVUeXBlID0gdHlwZTtcbiAgICAgICAgICAgIHRoaXMuZWxpbWF0ZVNpemUgPSBjb3VudDtcbiAgICAgICAgICAgIHRoaXMuZWxpbWF0ZU5vdGlmeSA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgdGhpcy5fZXhlY0JpbmRBZGRTY29yZUZ1bihjb3VudCk7XG5cbiAgICAgICAgICAgIGlmIChjb3VudCA+IDMgJiYgdHlwZSA9PSBFbGltYXRlVHlwZS5EZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5TWVyZ2VOb3JtYWxCb21iKGJhc2VQb3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5pc0JvbWIgJiYgdHlwZSAhPSBFbGltYXRlVHlwZS5HaXJsICYmICF0aGlzLmlzUHJlRGVzdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8v6L+Z6YeM5pyJ5Y+v6IO95piv5oCn6IO954Ot54K5LlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4ZWNCb21iKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5RWxpbWF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZXhlY0JvbWIoZGF0YSA9IG51bGwpIHtcbiAgICAgICAgLy8gaWYgKFJ1bnRpbWVNZ3IuaW5zLkdhbWVTdGF0ZSA8IEdhbWVTdGF0ZS5XaW4pIHtcbiAgICAgICAgbGV0IGV4dEJvbWJEYXRhID0gbnVsbDtcbiAgICAgICAgLy/lvanombnngrjlvLnliIbphY3nsbvlnoshXG4gICAgICAgIGlmICh0aGlzLm1vZGVsLmdldFR5cGUoKSA9PSBDZWxsVHlwZS5Cb21iNSkge1xuICAgICAgICAgICAgY29uc3QgcG9zID0gQ29tbW9uLmdldFJvdW5kT25lUG9zKHRoaXMubW9kZWwucG9zKTtcbiAgICAgICAgICAgIGV4dEJvbWJEYXRhID0geyBwb3MgfTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZGVsLmlzUm9ja2V0KSB7XG4gICAgICAgICAgICB0aGlzLmV4ZWNSb2tldCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9kZWwub25Nc2coTXNnVHlwZS5Cb21iLCBkYXRhIHx8IGV4dEJvbWJEYXRhKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEFuaW1hdGlvbigpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5vbignc3RvcCcsIDxhbnk+dGhpcy5vbkFuaW1hdGlvblN0b3AsIHRoaXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzZXREaXNwbGF5SW5mbygpIHtcbiAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gMDtcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMTtcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDA7XG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICB0aGlzLmlzUnVuTW92ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNwaW5lQ2VsbEN0cmwgPSBudWxsO1xuICAgICAgICB0aGlzLnByZWZhYkFuaW1hdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuc2hvd1R5cGUgPSBDZWxsVHlwZS5FbXB0eTtcblxuICAgICAgICB0aGlzLmRlc3RvcnlUaW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5wb3J0YWxSZXNvbHZlID0gbnVsbDtcbiAgICAgICAgdGhpcy5yb3RhdGluZ0N0cmwgPSBudWxsO1xuICAgICAgICB0aGlzLmRlYXRoVGltZW91dCA9IDA7XG5cbiAgICAgICAgdGhpcy5jZWxsU3ByaXRlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jZWxsU3ByaXRlLm5vZGUuc2NhbGUgPSAxO1xuICAgICAgICB0aGlzLmNlbGxTcHJpdGUubm9kZS5hbmdsZSA9IDA7XG4gICAgICAgIHRoaXMuY2VsbFNwcml0ZS5ub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgIHRoaXMuY2VsbFNwcml0ZS5ub2RlLnNldFBvc2l0aW9uKDAsIDApO1xuXG4gICAgICAgIHRoaXMuc2hhZG93Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sZXZlbFNwcml0ZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdyb3VuZC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNlbGxTcHJpdGUubm9kZS5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcblxuXG4gICAgICAgIHRoaXMubG93ZXJOb2RlLmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xuICAgICAgICB0aGlzLmxvd2VyTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5nZXRUeXBlKCkgPT0gQ2VsbFR5cGUuR2lybCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDEwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0UGxheUNyZWF0ZUFuaW1hdGlvbihjcmVhdGVUeXBlOiBDcmVhdGVUeXBlKSB7XG5cbiAgICAgICAgaWYgKGNyZWF0ZVR5cGUgPT0gQ3JlYXRlVHlwZS5Ob3YgfHwgdGhpcy5tb2RlbC5pc0VtcHR5KSByZXR1cm47XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZWwuaXNCb21iKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlDcmVhdGVCb21iQW5pKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY3JlYXRlVHlwZSA9PSBDcmVhdGVUeXBlLkJyb24pIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm5vZGUueSAtPSBDb21tb24uR1JJRF9IIC8gMjtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlFbnRlckFuaSgpXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLm9uTXNnKE1zZ1R5cGUuRmFsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGlzUHJlRGVzdG9yeSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmNlbGxTcHJpdGUubm9kZS5hY3RpdmU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0hhdmFTcGUoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwuYmluZFVwR01vZGVsICYmIHRoaXMubW9kZWwuYmluZFVwR01vZGVsLmlzSGF2YVNwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZUx2RGlzcGxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5pc0dyb3VuZCAmJiB0aGlzLm1vZGVsLmdldEx2KCkgIT0gdGhpcy5fc2hvd0x2KSB7XG4gICAgICAgICAgICB0aGlzLl9zaG93THYgPSB0aGlzLm1vZGVsLmdldEx2KCk7XG4gICAgICAgICAgICB0aGlzLmxldmVsU3ByaXRlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubGV2ZWxTcHJpdGUuc3ByaXRlRnJhbWUgPSBSZXNDdHJsLmlucy5nZXRHcm91bmRGcmFtZSh0aGlzLl9zaG93THYgLSAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVEaXNwbGF5KHQ6IENlbGxUeXBlID0gbnVsbCkge1xuICAgICAgICBpZiAoKHRoaXMubW9kZWwgJiYgIXRoaXMubW9kZWwuaXNFbXB0eSAmJiB0aGlzLnNob3dUeXBlICE9IHRoaXMubW9kZWwuZ2V0VHlwZSgpKSB8fCAodCAhPSBudWxsKSkge1xuICAgICAgICAgICAgbGV0IGRpc3BsYXlUeXBlID0gTnVtYmVyKCh0ID09PSBudWxsID8gdGhpcy5tb2RlbC5nZXRUeXBlKCkgOiB0KSk7XG4gICAgICAgICAgICBsZXQgc3ByaXRJbmRleCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnByZWZhYkFuaW1hdGlvbiA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnNwaW5lQ2VsbEN0cmwgPSBudWxsO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGRpc3BsYXlUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBDZWxsVHlwZS5Cb21iMTpcbiAgICAgICAgICAgICAgICBjYXNlIENlbGxUeXBlLkJvbWIyOiAgICAgICAgIC8v5qiq5ZCR54K45by5XG4gICAgICAgICAgICAgICAgY2FzZSBDZWxsVHlwZS5Cb21iMzogICAgICAgICAvL+erluWQkeeCuOW8uVxuICAgICAgICAgICAgICAgIGNhc2UgQ2VsbFR5cGUuQm9tYjQ6XG4gICAgICAgICAgICAgICAgY2FzZSBDZWxsVHlwZS5Cb21iNTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTcGluZUNlbGwoZGlzcGxheVR5cGUsIFJlc0N0cmwuaW5zLmdldENlbGxQcmVmYWIoZGlzcGxheVR5cGUgLSBCb21iR2FwKSk7XG4gICAgICAgICAgICAgICAgICAgIHNwcml0SW5kZXggLT0gQm9tYkdhcDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRUZXNodUxpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgQ2VsbFR5cGUuRmlzaDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTcGluZUNlbGwoZGlzcGxheVR5cGUsIFJlc0N0cmwuaW5zLmdldENlbGxQcmVmYWIoNSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIENlbGxUeXBlLkdpcmw6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU3BpbmVDZWxsKGRpc3BsYXlUeXBlLCBSZXNDdHJsLmlucy5nZXRDZWxsUHJlZmFiKDYpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBDZWxsVHlwZS5Db25jaDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTcGluZUNlbGwoZGlzcGxheVR5cGUsIFJlc0N0cmwuaW5zLmdldENlbGxQcmVmYWIoNykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIENlbGxUeXBlLkJhbmFuYTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQcmVmYWIoUmVzQ3RybC5pbnMuZ2V0Q2VsbFByZWZhYig4KSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBDZWxsVHlwZS5JY2VDcmVhbTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQcmVmYWIoUmVzQ3RybC5pbnMuZ2V0Q2VsbFByZWZhYig5KSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRJbmRleCA9IGRpc3BsYXlUeXBlO1xuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGlzcGxheVR5cGUgIT0gQ2VsbFR5cGUuR3JvdW5kKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5pc1JvY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAvLyDngavnrq3nmoTlpITnkIYhXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY2VsbFNwcml0ZS5zcHJpdGVGcmFtZSA9IFJlc0N0cmwuaW5zLmdldFJva2V0RnJhbWVzKHNwcml0SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVByZWZhYihSZXNDdHJsLmlucy5nZXRSb2tldFByZWZhYigpKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ByaXRJbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbFNwcml0ZS5zcHJpdGVGcmFtZSA9IFJlc0N0cmwuaW5zLmdldENlbGxGcmFtZShkaXNwbGF5VHlwZSwgc3ByaXRJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0x2KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0dyb3VuZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZEdlbSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNob3dUeXBlID0gZGlzcGxheVR5cGU7XG4gICAgICAgICAgICBpZiAoKHRoaXMuc3BpbmVDZWxsQ3RybCB8fCB0aGlzLnByZWZhYkFuaW1hdGlvbikgJiYgdGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm9tYklkZWwoc3ByaXRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNyZWF0ZVR5cGUgPT0gQ3JlYXRlVHlwZS5Ob3YpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuaXNFeGVjQm9tYiAmJiB0aGlzLmV4ZWNCb21iKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVMdkRpc3BsYXkoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGRHZW0oKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwuR2VtTHYgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBzcHJpdGUgPSBDb21tb24uY3JlYXRlU3ByaXRlKG51bGwsIFJlc0N0cmwuaW5zLmdldEdlbUZyYW1lKHRoaXMubW9kZWwuR2VtTHYgLSAxKSk7XG4gICAgICAgICAgICBzcHJpdGUubm9kZS5zZXRTY2FsZSgwLjgpO1xuICAgICAgICAgICAgc3ByaXRlLm5vZGUucGFyZW50ID0gdGhpcy5ncm91bmQubm9kZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVHcm91bmRWaWV3KCkge1xuICAgICAgICBpZiAoR2FtZU1vZGVsLmlucy5pc0hhdmFNb3ZlR3JvdW5kKSB7XG4gICAgICAgICAgICBjb25zdCBkaXJzID0gW2NjLnYyKDAsIDEpLCBjYy52MigwLCAtMSksIGNjLnYyKDEsIDApLCBjYy52MigtMSwgMCldO1xuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGRpcnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0UG9zID0gdGhpcy5tb2RlbC5wb3MuYWRkKGRpcnNbaW5kZXhdKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShHYW1lTW9kZWwuaW5zLkNlbGxMaXN0LCB0YXJnZXRQb3MpO1xuICAgICAgICAgICAgICAgIGlmIChjZWxsICYmIGNlbGwuZXh0Q3RybCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmV4dEN0cmwuc2hvd0dyb3VuZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93R3JvdW5kKCkge1xuICAgICAgICBpZiAodGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLmlzR3JvdW5kKSB7XG4gICAgICAgICAgICAvLyDlhYjmt7vliqAgXG4gICAgICAgICAgICB0aGlzLmdyb3VuZC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNoYWRvd05vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBvcHQgPSBDb21tb24udGVzdEdyb3VuZEJvcmRlckRpc3BsYXkodGhpcy5tb2RlbC5wb3MueCwgdGhpcy5tb2RlbC5wb3MueSwgR2FtZU1vZGVsLmlucy5DZWxsTGlzdCwgdGhpcy5tb2RlbC5nZXRUeXBlKCkpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDQ7IGktLTspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gTW92ZUdyb3VuZE5hbWVzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBib3JkZXIgPSB0aGlzLmdyb3VuZC5ub2RlLmdldENoaWxkQnlOYW1lKG5hbWUpXG4gICAgICAgICAgICAgICAgaWYgKG9wdFtpXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWJvcmRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyID0gTS5ub2RlUG9vbC5jcmVhdGVJdGVtKFJlc0N0cmwuaW5zLmdldEdyb3VuZEJvcmRlclByZWZhYihpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXIucGFyZW50ID0gdGhpcy5ncm91bmQubm9kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlci5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlciAmJiBib3JkZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZ3JvdW5kLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTTtcbiAgICAgICAgICAgIHRoaXMuZ3JvdW5kLnNwcml0ZUZyYW1lID0gUmVzQ3RybC5pbnMuZ3JvdW5kQ2VudGVyO1xuICAgICAgICAgICAgdGhpcy5ncm91bmQubm9kZS5zZXRDb250ZW50U2l6ZShjYy5zaXplKENvbW1vbi5HUklEX1csIENvbW1vbi5HUklEX0gpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0x2KCkge1xuICAgICAgICBpZiAodGhpcy5tb2RlbCAmJiB0aGlzLm1vZGVsLmdldEx2KCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGx2ID0gY2MuaW5zdGFudGlhdGUodGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdwb3MnKSlcbiAgICAgICAgICAgIGx2Lm5hbWUgPSAnbHYnO1xuICAgICAgICAgICAgbHYuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGx2LnBhcmVudCA9IHRoaXMuY2VsbFNwcml0ZS5ub2RlO1xuICAgICAgICAgICAgbHYuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLm1vZGVsLmdldEx2KCkgKyAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkVGVzaHVMaWdodCgpIHtcbiAgICAgICAgdGhpcy5sb3dlck5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IE0ubm9kZVBvb2wuZ2V0SXRlbShOb2RlUG9vbEtleS5UZXNodUxpZ2h0LCB0aGlzLnRlc2h1TGlnaHQpO1xuICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUmVzQ3RybC5pbnMuZ2V0Qm9tYkJnKHRoaXMubW9kZWwuZ2V0VHlwZSgpIC0gQm9tYkdhcCk7XG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5sb3dlck5vZGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVQcmVmYWIocGI6IGNjLlByZWZhYikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBDb21tb24uY3JlYXRlRWZmUHJlZmFiKHRoaXMuY2VsbFNwcml0ZS5ub2RlLCAvKk5vZGVQb29sS2V5LlJva2V0Ki9udWxsLCBwYilcbiAgICAgICAgdGhpcy5wcmVmYWJBbmltYXRpb24gPSByZXN1bHQuY3RybDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVNwaW5lQ2VsbCh0eXBlOiBDZWxsVHlwZSwgY2VsbFByZWZhYjogY2MuUHJlZmFiKSB7XG4gICAgICAgIHRoaXMuY2VsbFNwcml0ZS5ub2RlLmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBDb21tb24uY3JlYXRlU3BpbmVOb2RlKHRoaXMuY2VsbFNwcml0ZS5ub2RlLCBjZWxsUHJlZmFiLCA8YW55PnR5cGUpO1xuICAgICAgICB0aGlzLnNwaW5lQ2VsbEN0cmwgPSByZXN1bHQuY3RybDtcbiAgICB9XG5cbiAgICBwcml2YXRlIG5vdGlmeURlc3RvcnkoKSB7XG4gICAgICAgIGlmICh0aGlzLmVsaW1hdGVOb3RpZnkpIHtcbiAgICAgICAgICAgIGxldCBpc0Jvcm4gPSB0aGlzLm1vZGVsLmJpbmRHTW9kZWwgPyB0aGlzLm1vZGVsLmJpbmRHTW9kZWwuaXNCb3JuIDogZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVsaW1hdGVOb3RpZnkoaXNCb3JuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tTcGVjaWFsQ29sbGVjdCgpIHtcbiAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LkdhbWVDTUQuU3BlQ29sbGVjdCwgdGhpcy5tb2RlbCk7XG4gICAgfVxuXG4gICAgcHVibGljIHByZURlc3RvcnkoKSB7XG4gICAgICAgIGlmICh0aGlzLmNlbGxTcHJpdGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbFNwcml0ZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jaGVja1NwZWNpYWxDb2xsZWN0KCk7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5HZW1MdiA+IDApIHtcbiAgICAgICAgICAgICAgICBHYW1lTW9kZWwuaW5zLnVwZGF0ZUNvbGxlY3RDb3VudChDb2xsZWN0VHlwZS5nZW0sIHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLCBudWxsLCB0aGlzLm1vZGVsLkdlbUx2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5wcmVEZXN0b3J5KCk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5zdG9wKCk7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5vZmYoJ29mZicsIHRoaXMub25BbmltYXRpb25TdG9wLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlR3JvdW5kVmlldygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzRGVsYXlUeXBlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdG9yeVRpbWUgPSB0aGlzLmdldERlbGF5RWxpbWF0ZVRpbWUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdG9yeVRpbWUgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGV4ZWNEZXN0b3J5KCkge1xuICAgICAgICB0aGlzLm5vdGlmeURlc3RvcnkoKTtcbiAgICAgICAgdGhpcy5tb2RlbC5kZXN0b3J5KHRoaXMuZWxpbWF0ZVR5cGUpO1xuICAgICAgICB0aGlzLm1vZGVsLm9uVW5CaW5kKHRoaXMubW9kZWwucG9zKTtcbiAgICAgICAgdGhpcy5tb2RlbCA9IG51bGw7XG4gICAgICAgIHRoaXMuZGVzdG9yeVRpbWUgPSBudWxsO1xuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5CaW5kQWRkU2NvcmVUYXNrID0gbnVsbDtcbiAgICAgICAgdGhpcy5zaG93VHlwZSA9IENlbGxUeXBlLkVtcHR5O1xuICAgICAgICB0aGlzLmNlbGxTcHJpdGUubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcblxuICAgICAgICB0aGlzLmNlbGxTcHJpdGUuc3ByaXRlRnJhbWUgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5zcGluZUNlbGxDdHJsKSB7XG4gICAgICAgICAgICBNLm5vZGVQb29sLmZyZWVJdGVtKHRoaXMuc2hvd1R5cGUsIHRoaXMuc3BpbmVDZWxsQ3RybC5ub2RlKVxuICAgICAgICAgICAgdGhpcy5zcGluZUNlbGxDdHJsID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcmVmYWJBbmltYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMucHJlZmFiQW5pbWF0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBNLm5vZGVQb29sLmZyZWVJdGVtKE5vZGVQb29sS2V5LkNlbGwsIHRoaXMubm9kZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREZWxheUVsaW1hdGVUaW1lKCk6IG51bWJlciB7XG4gICAgICAgIGxldCB0aW1lID0gMDtcbiAgICAgICAgc3dpdGNoICh0aGlzLmVsaW1hdGVUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIEVsaW1hdGVUeXBlLkJvbWIyOlxuICAgICAgICAgICAgY2FzZSBFbGltYXRlVHlwZS5Cb21iMzpcbiAgICAgICAgICAgICAgICB0aW1lID0gR2FwVGltZS5EZWxheURlc3RvcnlDb2xBbmRSb3c7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVsaW1hdGVUeXBlLkJvbWIxOlxuICAgICAgICAgICAgICAgIHRpbWUgPSBHYXBUaW1lLkRlbGF5RGVzdG9yeUJvbWI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEVsaW1hdGVUeXBlLkJvbWI0OlxuICAgICAgICAgICAgICAgIHRpbWUgPSBHYXBUaW1lLkRlbGF5RGVzdG9yeU9jdG9wdXM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRmlzaEJvbWIoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aW1lID0gR2FwVGltZS5EZWxheURlc3RvcnlGaXNoQm9tYjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbWU7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGlzRGVsYXlUeXBlKCkge1xuICAgICAgICBpZiAodGhpcy5lbGltYXRlVHlwZSA9PSBFbGltYXRlVHlwZS5Cb21iMyB8fFxuICAgICAgICAgICAgdGhpcy5lbGltYXRlVHlwZSA9PSBFbGltYXRlVHlwZS5Cb21iMiB8fFxuICAgICAgICAgICAgdGhpcy5lbGltYXRlVHlwZSA8PSBFbGltYXRlVHlwZS5BbGwgJiYgdGhpcy5lbGltYXRlVHlwZSA+IEVsaW1hdGVUeXBlLkRlZmF1bHQgfHxcbiAgICAgICAgICAgIHRoaXMuaXNGaXNoQm9tYigpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0JvbWIodGFyZ2V0TW9kZWw6IENlbGxNb2RlbCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgaXNCb21iID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwuaXNCb21iKSB7XG4gICAgICAgICAgICBsZXQgcG9zID0gbnVsbFxuICAgICAgICAgICAgaWYgKHRhcmdldE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgcG9zID0gdGFyZ2V0TW9kZWwucG9zO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRNb2RlbC5pc0JvbWIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlzQm9tYiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjQm9tYih7IHBvcyB9KVxuICAgICAgICAgICAgfSwgMC4xKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc0JvbWI7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVBvc2l0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5tb2RlbC5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgdGhpcy5jZWxsU3ByaXRlLm5vZGUuc2V0UG9zaXRpb24oMCwgMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkFuaW1hdGlvblN0b3AoZXZlbnROYW1lOiBzdHJpbmcsIGFuaVN0YXRlOiBjYy5BbmltYXRpb25TdGF0ZSkge1xuICAgICAgICBpZiAoIXRoaXMubW9kZWwpIHJldHVybjtcbiAgICAgICAgc3dpdGNoIChhbmlTdGF0ZS5uYW1lKSB7XG4gICAgICAgICAgICBjYXNlIEFuaU5hbWUuZWxpbWF0ZTpcbiAgICAgICAgICAgIGNhc2UgQW5pTmFtZS5jb2xsZWN0OlxuICAgICAgICAgICAgICAgIHRoaXMucHJlRGVzdG9yeSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBbmlOYW1lLmZhbGxPdmVyOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLmlzQm9tYikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlCb21iSWRlbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQW5pTmFtZS5ib21iQ3JlYXRlOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLmlzQm9tYikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxTcHJpdGUubm9kZS5hbmdsZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUJvbWJJZGVsKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuaXNCb21iUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnVubG9ja0NyZWF0ZUJvbWJQb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwuaXNFeGVjQm9tYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leGVjQm9tYigpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5jb250aW51ZTJGYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFuaU5hbWUucG9ydGFsSW46XG4gICAgICAgICAgICBjYXNlIEFuaU5hbWUucG9ydGFsT3V0OlxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY1BvcnRhbFJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirliqjnlLvmiafooYzljLrln58gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBwcml2YXRlIGV4ZWNFeGNoYW5nZUFuaSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUnVuTW92ZSAmJiB0aGlzLm1vdmVBY3Rpb25BcnkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5pc1J1bk1vdmUgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgbW92ZURhdGEgPSB0aGlzLm1vdmVBY3Rpb25Bcnkuc2hpZnQoKTtcbiAgICAgICAgICAgIGNvbnN0IGExID0gY2MubW92ZVRvKG1vdmVEYXRhLnQsIENvbW1vbi5nZXRQb3MobW92ZURhdGEucG9zLngsIG1vdmVEYXRhLnBvcy55KSk7XG4gICAgICAgICAgICBjb25zdCBhMiA9IGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQm9tYihtb3ZlRGF0YS5lcCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1J1bk1vdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWNFeGNoYW5nZUFuaSgpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGExLCBhMikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtZWlyZW55dUp1bXBQb29sID0gW107XG4gICAgcHJpdmF0ZSBpc0p1bXBpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgbWVybWFpZEp1bXBUbyh0YXJnZXRQb3M6IGNjLlZlYzIsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5tZWlyZW55dUp1bXBQb29sLnB1c2goeyBwb3M6IHRhcmdldFBvcywgY2I6IGNhbGxiYWNrIH0pO1xuICAgICAgICBpZiAoIXRoaXMuaXNKdW1waW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9leGVjTWVybWFpZEp1bXBUYXNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirmiafooYznvo7kurrpsbznmoTot7Pot4Pku7vliqEhICovXG4gICAgcHJpdmF0ZSBfZXhlY01lcm1haWRKdW1wVGFzaygpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMubWVpcmVueXVKdW1wUG9vbC5zaGlmdCgpO1xuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5pc0p1bXBpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zcGluZUNlbGxDdHJsLnBsYXkoJ21laXJlbnl1X3RpYW8nLCAwLCBmYWxzZSwgbnVsbCwgbnVsbCwgeyBuYW1lOiAnbWVpcmVueXVfeGl1eGlhbicsIGxvb3A6IHRydWUgfSk7XG4gICAgICAgICAgICB0aGlzLm1vdmVUbyhpdGVtLnBvcywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIEdhbWVNb2RlbC5pbnMuZXhlY0VsaW1hdGVPbmUoaXRlbS5wb3MsIEVsaW1hdGVUeXBlLkdpcmwsIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNKdW1waW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaXRlbS5jYiAmJiBpdGVtLmNiKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXhlY01lcm1haWRKdW1wVGFzaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbW92ZVRvKHRhcmdldFBvczogY2MuVmVjMiwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICBjb25zdCBwb3MgPSBDb21tb24uZ2V0UG9zKHRhcmdldFBvcy54LCB0YXJnZXRQb3MueSk7XG4gICAgICAgIGNvbnN0IGEwID0gY2MuZGVsYXlUaW1lKDAuMik7XG4gICAgICAgIGNvbnN0IGExID0gY2MubW92ZVRvKDAuMiwgcG9zKTtcbiAgICAgICAgY29uc3QgYTIgPSBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhMCwgYTEsIGEyKSk7XG4gICAgfVxuXG5cbiAgICAvKirmkq3mlL7lpI3lkIjngrjlvLnniIbngrjliY3nmoTliqjnlLshICovXG4gICAgcHVibGljIHBsYXlDb21wbGV4Qm9tYkFuaSh0eXBlKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShyZXNvbHZlLCAwKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgcGxheUNoYW5nZTJDZWxsKCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5wbGF5KEFuaU5hbWUuY2hhbmdlMmNlbGwpO1xuICAgIH1cblxuICAgIHB1YmxpYyBleGNoYW5nZURvdWJsZUJvbWJBbmkodGFyZ2V0TW9kZWw6IENlbGxNb2RlbCkge1xuICAgICAgICBpZiAodGFyZ2V0TW9kZWwpIHtcbiAgICAgICAgICAgIC8vVG9kbyDlvoXmkq3mlL7nm7jlupTnmoTpqqjpqrzliqjnlLsuLi4uLiDkvYbmmK/ov5nph4zkuI3nn6XpgZPopoHmkq3mlL7lk6rnp43nsbvlnovlkYAuP1xuICAgICAgICAgICAgY29uc3QgYTEgPSBjYy5tb3ZlVG8oMC4xNSwgQ29tbW9uLmdldFBvcyh0YXJnZXRNb2RlbC5wb3MueCwgdGFyZ2V0TW9kZWwucG9zLnkpKTtcbiAgICAgICAgICAgIGNvbnN0IGEyID0gY2MuY2FsbEZ1bmMoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VwSWQgPSBHYW1lTW9kZWwuaW5zLnNlcS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0TW9kZWwub25Nc2coTXNnVHlwZS5Db21wbGV4Qm9tYiwgeyB0eXBlMTogdGhpcy5tb2RlbC5nZXRUeXBlKCksIHR5cGUyOiB0YXJnZXRNb2RlbC5nZXRUeXBlKCksIGdyb3VwSWQgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5Qm9tYlNpbmdsZURlc3RvcnlFZmYoMC4xLCBHYXBUaW1lLkJvbWJNZXJnZUJvbWJDaGFuZ2VUaW1lLCBmYWxzZSwgZ3JvdXBJZCk7XG4gICAgICAgICAgICAgICAgLy8gdGFyZ2V0TW9kZWwuZXh0Q3RybC5wbGF5Qm9tYlNpbmdsZURlc3RvcnlFZmYoMC4xLCBHYXBUaW1lLkJvbWJNZXJnZUJvbWJDaGFuZ2VUaW1lLCBmYWxzZSwgZ3JvdXBJZCk7XG4gICAgICAgICAgICB9LCB0aGlzKVxuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhMSwgYTIpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBleGVjRmlzaEJvbWIoKSB7XG4gICAgICAgIC8v5piv54K45by56bG8LOW5tuS4lOiiq+WFtuS7lueCuOW8ueeCuOatu+eahCHmiafooYzniIbngrghXG4gICAgICAgIHRoaXMubW9kZWwuaW5pdEJvbWJNb2RlbChDZWxsVHlwZS5GaXNoKTtcbiAgICAgICAgdGhpcy5tb2RlbC5vbk1zZyhNc2dUeXBlLkJvbWIpO1xuICAgICAgICB0aGlzLm1vZGVsLmlzQm9tYiA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZXhlY1Jva2V0KCkge1xuICAgICAgICBjb25zdCB0aW1lTGluZSA9IEdyb3VwQW5pbWF0Q3RybC5pbnMuY3JlYXRlVGltZUxpbmUoKTtcbiAgICAgICAgY29uc3QgZ3JvdW5kSWQgPSB0aGlzLm1vZGVsLkdyb3VwSWQ7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAzOyBpLS07KSB7XG4gICAgICAgICAgICB0aW1lTGluZS5hZGQoZ3NhcC5Ud2VlbkxpdGUuZGVsYXllZENhbGwoR2FwVGltZS5UaHJlZVBsYW5lQ3JlYXRlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5leGVjRWxpbWF0ZSh0aGlzLm1vZGVsLCBudWxsLCBFbGltYXRlVHlwZS5Sb2NrZXQsIG51bGwsIG51bGwsIGdyb3VuZElkKTtcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCA+PSAzKSB7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirmmK/lkKbmmK8z5Liq6bG854K45by55raI6ZmkLuatpOaXtua7nuepujPkuKrpsbwgKi9cbiAgICBwcml2YXRlIGlzRmlzaFNpbmdsZUJvbWIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAodGhpcy5tb2RlbC5nZXRUeXBlKCkgPT0gQ2VsbFR5cGUuRmlzaCAmJiB0aGlzLmVsaW1hdGVUeXBlICE9IEVsaW1hdGVUeXBlLkRlZmF1bHQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNGaXNoQm9tYigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm1vZGVsLmdldFR5cGUoKSA9PSBDZWxsVHlwZS5GaXNoICYmICh0aGlzLmVsaW1hdGVTaXplID09IDMgfHwgdGhpcy5lbGltYXRlVHlwZSAhPSBFbGltYXRlVHlwZS5EZWZhdWx0KSk7XG4gICAgfVxuXG4gICAgLyoq5Y2V5Liq6ZSA5q+B5Yqo55S7ICovXG4gICAgcHVibGljIHBsYXlFbGltYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Zpc2hTaW5nbGVCb21iKCkgJiYgIXRoaXMuYW5pbWF0aW9uU3RhdGUgJiYgdGhpcy5lbGltYXRlVHlwZSAhPSBFbGltYXRlVHlwZS5HaXJsKSB7XG4gICAgICAgICAgICB0aGlzLmV4ZWNGaXNoQm9tYigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm1vZGVsICYmICF0aGlzLm1vZGVsLmlzRW1wdHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLmlzUm9ja2V0ICYmIHRoaXMuZWxpbWF0ZVNpemUgIT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhlY1Jva2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLm1vZGVsLmlzQ29sbGVjdCAmJiBHYW1lTW9kZWwuaW5zLmdldENvbGxlY3QoKS5nZXQodGhpcy5tb2RlbC5nZXRUeXBlKCkgKyAnJykgPiAwICYmIHRoaXMuZWxpbWF0ZVR5cGUgPT0gRWxpbWF0ZVR5cGUuRGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIC8v5pS26ZuG54mpISFcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlDb2xsZWN0QW5pKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc1BsYXlFbGltYXRlQW5pbWF0aW9uKCkgJiYgKCF0aGlzLmFuaW1hdGlvblN0YXRlIHx8ICh0aGlzLmFuaW1hdGlvblN0YXRlICYmIHRoaXMuYW5pbWF0aW9uU3RhdGUubmFtZSAhPSBBbmlOYW1lLmVsaW1hdGUpKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gdGhpcy5hbmltYXRpb24ucGxheShBbmlOYW1lLmVsaW1hdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlMaXR0bGVFbGltYXRlRWZmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9pc1BsYXlFbGltYXRlQW5pbWF0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKHRoaXMubW9kZWwuZ2V0VHlwZSgpICE9IENlbGxUeXBlLkJhbmFuYSlcbiAgICB9XG5cbiAgICAvKirlkIjmiJDngrjlvLnml7Ys54K45by555qE6KGl6Ze05Yqo55S7ICovXG4gICAgcHVibGljIHBsYXlDcmVhdGVCb21iQW5pKCkge1xuICAgICAgICBpZiAoIXRoaXMuYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRBbmltYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGVsLmlzQm9tYlJlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoQW5pTmFtZS5ib21iQ3JlYXRlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBsYXlMaXR0bGVFbGltYXRlRWZmKCkge1xuICAgICAgICBjb25zdCB3b2xyZFBvcyA9IENvbW1vbi5nZXRXb3JsZFBvcyh0aGlzLm5vZGUpO1xuXG4gICAgICAgIGlmICh0aGlzLm1vZGVsLmdldFR5cGUoKSA9PSBDZWxsVHlwZS5CYW5hbmEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZWZhYkFuaW1hdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMucHJlZmFiQW5pbWF0aW9uLnBsYXkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnByZURlc3RvcnkuYmluZCh0aGlzKSwgMC41KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZURlc3RvcnkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmVsaW1hdGVUeXBlICE9IEVsaW1hdGVUeXBlLkJvbWIxICYmIHRoaXMubW9kZWwuZ2V0VHlwZSgpICE9IENlbGxUeXBlLkljZUNyZWFtKSB7XG4gICAgICAgICAgICAvLyBNLnBsYXRmb3JtLnZpYnJhdGVTaG9ydCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwuaXNHcm91bmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlCcm9rZW5FZmYod29scmRQb3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuRWZmZWN0LkxpdHRsZUJvbWIsIHdvbHJkUG9zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5Tb3VuZC5QbGF5U291bmRFZmYsIEF1ZGlvSUQuRWxpbWF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vZGVsLm5vdGlmeVJvdW5kRWxpbWF0ZSh0aGlzLmVsaW1hdGVUeXBlKTtcbiAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAvLyAgICAgTS5ldmVudC5zZW5kKEV2ZW50LkVmZmVjdC5TaG93RG90LCB0aGlzLmVsaW1hdGVUeXBlLCB3b2xyZFBvcyk7XG4gICAgICAgIC8vIH0sIEdhcFRpbWUuRGVsYXlMaWdodFBvaW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcGxheUJyb2tlbkVmZihwb3M/OiBjYy5WZWMyKSB7XG4gICAgICAgIHBvcyA9IHBvcyB8fCBDb21tb24uZ2V0V29ybGRQb3ModGhpcy5ub2RlKTtcbiAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LkVmZmVjdC5Ccm9rZW4sIHBvcyk7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwuZ2V0THYoKSA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdyb3VuZFZpZXcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKueCuOW8ueWcqOahjOmdouS4iueahOWRvOWQuOWKqOeUuyAqL1xuICAgIHByaXZhdGUgcGxheUJvbWJJZGVsKHR5cGU/OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuc3BpbmVDZWxsQ3RybCkge1xuICAgICAgICAgICAgdGhpcy5jZWxsU3ByaXRlLnNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICAgICAgICAgIC8v5pKt5ZG85ZC45Yqo55S75LiN5bqU6K+l5Yay5o6J6ZSA5q+B5Yqo55S7IVxuICAgICAgICAgICAgbGV0IG5hbWUgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwuZ2V0VHlwZSgpID09IENlbGxUeXBlLkZpc2gpIHtcbiAgICAgICAgICAgICAgICBuYW1lID0gU3BpbmVDZWxsSWRlbE5hbWVbU3BpbmVDZWxsSWRlbE5hbWUubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3BpbmVDZWxsQ3RybC5jdXJQbGF5ICE9IFNwaW5lQ2VsbEJvbWJOYW1lW3RoaXMubW9kZWwuZ2V0VHlwZSgpIC0gQm9tYkdhcF0pIHtcbiAgICAgICAgICAgICAgICBuYW1lID0gU3BpbmVDZWxsSWRlbE5hbWVbdGhpcy5tb2RlbC5nZXRUeXBlKCkgLSBCb21iR2FwXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3BpbmVDZWxsQ3RybC5wbGF5KG5hbWUsIDAsIHRydWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kZWwuaXNSb2NrZXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZWZhYkFuaW1hdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMucHJlZmFiQW5pbWF0aW9uLnBsYXkoYCR7dHlwZX1femhhbmd5dUdHSWRsZWApO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3ByZWZhYkFuaW1hdGlvbjonLCBgJHt0eXBlfV96aGFuZ3l1R0dJZGxlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hbmltYXRpb24gJiYgdGhpcy5tb2RlbC5pc0JvbWIpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoQW5pTmFtZS5ib21iSWRsZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirmiafooYznu5Hlrprlpb3nmoTliqDliIbmlbDmlrnms5UgKi9cbiAgICBwcml2YXRlIF9leGVjQmluZEFkZFNjb3JlRnVuKGNvdW50OiBudW1iZXIgPSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLkJpbmRBZGRTY29yZVRhc2spIHtcbiAgICAgICAgICAgIHRoaXMuQmluZEFkZFNjb3JlVGFzayhDb21tb24uZ2V0V29ybGRQb3ModGhpcy5ub2RlKSwgY291bnQpO1xuICAgICAgICAgICAgdGhpcy5CaW5kQWRkU2NvcmVUYXNrID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKueCuOW8ueiHqumUgOavgeWKqOeUuyAqL1xuICAgIHB1YmxpYyBwbGF5Qm9tYlNpbmdsZURlc3RvcnlFZmYoa2VlcFRpbWU6IG51bWJlciA9IDAuMiwgcGxheVRpbWU6IG51bWJlciA9IDAuMiwgaXNTcGluZUVmZjogYm9vbGVhbiA9IGZhbHNlLCBncm91cElkOiBudW1iZXIgPSBudWxsKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKGdyb3VwSWQgJiYgIXRoaXMubW9kZWwuR3JvdXBJZCkgJiYgKHRoaXMubW9kZWwuR3JvdXBJZCA9IGdyb3VwSWQpO1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5vbk1zZyhNc2dUeXBlLkVsaW1hdGUsIHsgaWQ6IGdyb3VwSWQsIGlzRm9yY2VkOiB0cnVlIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBvdmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudW5sb2NrQ3JlYXRlQm9tYlBvcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnByZURlc3RvcnkoKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVsaW1hdGVUeXBlID0gdGhpcy5tb2RlbC5nZXRUeXBlKCk7XG4gICAgICAgICAgICB0aGlzLl9leGVjQmluZEFkZFNjb3JlRnVuKCk7XG5cbiAgICAgICAgICAgIGlmIChpc1NwaW5lRWZmICYmIHRoaXMuc3BpbmVDZWxsQ3RybCAmJiAhdGhpcy5pc1ByZURlc3RvcnkoKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBTcGluZUNlbGxCb21iTmFtZVt0aGlzLm1vZGVsLmdldFR5cGUoKSAtIEJvbWJHYXBdO1xuICAgICAgICAgICAgICAgIHRoaXMuc3BpbmVDZWxsQ3RybC5wbGF5KG5hbWUsIDAsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShvdmVyLCAwLjMgKyBwbGF5VGltZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kZWwuaXNSb2NrZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcmVmYWJBbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVmYWJBbmltYXRpb24ucGxheShgJHt0aGlzLm1vZGVsLmdldFR5cGUoKX1femhhbmd5dUdHYCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKG92ZXIsIDAuMyArIHBsYXlUaW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGEwID0gY2MuZmFkZU91dChrZWVwVGltZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgYTEgPSBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2VsbFNwcml0ZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGEyID0gY2MuZGVsYXlUaW1lKHBsYXlUaW1lKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhMyA9IGNjLmNhbGxGdW5jKG92ZXIsIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYTAsIGExLCBhMiwgYTMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIOaJp+ihjOeIhueCuOaXtuS9memch+eahOWKqOeUu1xuICAgICogQHBhcmFtIGJvbWJMdiDlvZPliY3nmoTkvZnms6LnrYnnuqdcbiAgICAqIEBwYXJhbSBjZW50ZXJQb3Mg5Lit5b+D54K555qE5L2N572uKOe9keagvCkhXG4gICAgKi9cbiAgICBwdWJsaWMgZXhlY0JvbWJBZnRlclNob2Nrcyhib21iTHY6IG51bWJlciwgY2VudGVyUG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsICYmICF0aGlzLm1vZGVsLmlzRGVhdGggJiYgIXRoaXMuaXNIYXZhU3BlKCkgJiYgIXRoaXMuaXNQbGF5Qm9tYlNob2Nrcykge1xuICAgICAgICAgICAgdGhpcy5pc1BsYXlCb21iU2hvY2tzID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IGNwID0gQ29tbW9uLmdldFBvcyhjZW50ZXJQb3MueCwgY2VudGVyUG9zLnkpO1xuICAgICAgICAgICAgY29uc3Qgc3AgPSB0aGlzLm1vZGVsLmdldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAvLyAg6K6h566X6KeS5bqmIFxuICAgICAgICAgICAgY29uc3QgcmFkaWFuczogbnVtYmVyID0gTWF0aC5hdGFuMigoY3AueCAtIHNwLngpLCAoY3AueSAtIHNwLnkpKTtcbiAgICAgICAgICAgIGNvbnN0IGRlZ3JlZXM6IG51bWJlciA9IHJhZGlhbnMgKiAtMTgwIC8gTWF0aC5QSTtcblxuICAgICAgICAgICAgY29uc3QgZGlyID0gQ29tbW9uLmdldERpcmN0aW9uKGNwLCBzcCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGEwID0gY2MubW92ZUJ5KDAuMiwgY2MudjIoLWRpci54ICogKGJvbWJMdiAqIDQpLCAtZGlyLnkgKiAoYm9tYkx2ICogNCkpKTtcbiAgICAgICAgICAgIGNvbnN0IGExID0gY2MubW92ZUJ5KDAuMiwgY2MudjIoZGlyLnggKiAoYm9tYkx2ICogOCksIGRpci55ICogKGJvbWJMdiAqIDgpKSk7XG4gICAgICAgICAgICBjb25zdCBhMiA9IGNjLm1vdmVUbygwLjIsIGNjLnYyKDAsIDApKTsgLy8gPGFueT5hMS5yZXZlcnNlKCk7XG4gICAgICAgICAgICBjb25zdCBhMyA9IGNjLnNlcXVlbmNlKGNjLnJvdGF0ZVRvKDAuMSwgKGRlZ3JlZXMgKiAwLjEpICogKGJvbWJMdiAqIDAuNSkpLCBjYy5yb3RhdGVUbygwLjEsIDApKTtcblxuICAgICAgICAgICAgLy8g5b2i5Y+Y5Yqo55S7Luaague8uuacquWujOaIkFxuICAgICAgICAgICAgLy8gY29uc3QgYTEgPSBjYy5zY2FsZVRvKDAuMSwgKDEuMSAqIChib21iTHYgKiAwLjQpKSk7XG4gICAgICAgICAgICAvLyBjb25zdCBhMiA9IGNjLnNjYWxlVG8oMC4xLCAwLjk1KTtcbiAgICAgICAgICAgIC8vIGNvbnN0IGEzID0gY2Muc2NhbGVUbygwLjEsIDEpO1xuXG4gICAgICAgICAgICBjb25zdCBvdmVyID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2VsbFNwcml0ZS5ub2RlLnNldFBvc2l0aW9uKDAsIDApO1xuICAgICAgICAgICAgICAgIHRoaXMuY2VsbFNwcml0ZS5ub2RlLmFuZ2xlID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUGxheUJvbWJTaG9ja3MgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgICAgICB0aGlzLmNlbGxTcHJpdGUubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc3Bhd24oY2Muc2VxdWVuY2UoYTAsIGExLCBhMiksIGEzKSwgb3ZlcikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5ri45oiP57uT5p2f5bCG5pmu6YCa5YWD57Sg6L2s5o2i5oiQ54K45by55Yqo55S7ICovXG4gICAgcHVibGljIGNoYW5nZTJCb21iKHR5cGU/OiBDZWxsVHlwZSkge1xuICAgICAgICBpZiAodGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5jaGFuZ2UyQm9tYih0eXBlKTtcbiAgICAgICAgICAgIHRoaXMuY2VsbFNwcml0ZS5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcbiAgICAgICAgICAgIHRoaXMucGxheUNyZWF0ZUJvbWJBbmkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuWHuueUn+eCueWIm+W7uuaXtizlhYPntKDlh7rnlJ/liqjnlLsgKi9cbiAgICBwcml2YXRlIHBsYXlFbnRlckFuaSgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLmZhZGVJbigwLjE1KSk7XG4gICAgfVxuXG4gICAgLyoq5LiL6JC95Lit55qE5Yqo55S7ICovXG4gICAgcHVibGljIHBsYXlGYWxsU3RhcnRBbmkoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1BsYXlGYWxsICYmICF0aGlzLmlzSGF2YVNwZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmlzUGxheUZhbGwgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheUFkZGl0aXZlKEFuaU5hbWUuZmFsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirotJ3lo7PmipbliqggKi9cbiAgICBwdWJsaWMgcGxheVNoYWtpbmcoKSB7XG4gICAgICAgIGNvbnN0IGEwID0gY2MubW92ZUJ5KDAuMDUsIGNjLnYyKFV0aWwuVG9vbC5yYW5nZUludCgyLCA1KSwgVXRpbC5Ub29sLnJhbmdlSW50KDIsIDUpKSlcbiAgICAgICAgY29uc3QgYTEgPSA8YW55PmEwLnJldmVyc2UoKTtcbiAgICAgICAgdGhpcy5jZWxsU3ByaXRlLm5vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoYTAsIGExKSkpO1xuICAgICAgICAvLyB0aGlzLmFuaW1hdGlvbi5wbGF5KEFuaU5hbWUuc2hha2luZyk7XG4gICAgfVxuXG4gICAgLyoq5LiL6JC95pqC5YGcICovXG4gICAgcHVibGljIHBsYXlGYWxsUGF1c2VBbmkoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUGxheUZhbGwpIHtcbiAgICAgICAgICAgIHRoaXMuaXNQbGF5RmFsbCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheShBbmlOYW1lLmZhbGxQYXVzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirkuIvokL3nu5PmnZ/ml7bnmoTliqjnlLsgKi9cbiAgICBwdWJsaWMgcGxheUZhbGxPdmVyQW5pKCkge1xuICAgICAgICBpZiAoIXRoaXMucG9ydGFsUmVzb2x2ZSAmJiAhdGhpcy5pc0hhdmFTcGUoKSkge1xuICAgICAgICAgICAgdGhpcy5pc1BsYXlGYWxsID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5nZXRUeXBlKCkgPT0gQ2VsbFR5cGUuSWNlQ3JlYW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZWZhYkFuaW1hdGlvbiAmJiB0aGlzLnByZWZhYkFuaW1hdGlvbi5wbGF5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoQW5pTmFtZS5mYWxsT3Zlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirmtojpmaTmj5DnpLrml7bljZXkuKrnmoTpgqPkuKogKi9cbiAgICBwdWJsaWMgcGxheVNpbmdsZVByb21wdChtdWxQb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpciA9IENvbW1vbi5nZXREaXJjdGlvbihtdWxQb3MsIHRoaXMubW9kZWwucG9zKTtcblxuICAgICAgICAgICAgY29uc3QgZ2FwID0gNjtcbiAgICAgICAgICAgIGNvbnN0IHNob2NrR2FwID0gNTtcbiAgICAgICAgICAgIGNvbnN0IGExID0gY2Muc3Bhd24oY2Muc2NhbGVUbygwLjUsIDEuMDUpLCBjYy5tb3ZlVG8oMC41LCBjYy52MihkaXIueCAqIGdhcCwgZGlyLnkgKiAtZ2FwKSkpO1xuICAgICAgICAgICAgY29uc3QgYTIgPSBjYy5yZXBlYXQoY2Muc2VxdWVuY2UoY2MubW92ZUJ5KDAuMiwgY2MudjIoZGlyLnggKiBzaG9ja0dhcCwgZGlyLnkgKiAtc2hvY2tHYXApKSwgY2MubW92ZUJ5KDAuMiwgY2MudjIoZGlyLnggKiAtc2hvY2tHYXAsIGRpci55ICogc2hvY2tHYXApKSksIDIpO1xuICAgICAgICAgICAgY29uc3QgYTMgPSBjYy5zcGF3bihjYy5zY2FsZVRvKDAuMiwgMS4wKSwgY2MubW92ZVRvKDAuMiwgY2MudjIoMCwgMCkpKTtcbiAgICAgICAgICAgIGNvbnN0IGE0ID0gY2MuZGVsYXlUaW1lKDAuNSk7XG4gICAgICAgICAgICB0aGlzLmNlbGxTcHJpdGUubm9kZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShhMSwgYTIsIGEzLCBhNCkpKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5raI6Zmk5o+Q56S65pe25aSa5Liq55qE6YKj5LiqICovXG4gICAgcHVibGljIHBsYXlNdWxQcm9tcHQoKSB7XG4gICAgICAgIGlmICh0aGlzLmFuaW1hdGlvbikge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheUFkZGl0aXZlKEFuaU5hbWUucHJvbXB0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5Um90YXRpbmdNZXJnZShjZW50ZXJQb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgdGhpcy5yb3RhdGluZ0N0cmwgPSBuZXcgUm90YXRpbmdDdHJsKHRoaXMubm9kZSwgY2VudGVyUG9zKTtcbiAgICAgICAgdGhpcy5yb3RhdGluZ0N0cmwuc3RhcnQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2VsbFNwcml0ZSAmJiAodGhpcy5jZWxsU3ByaXRlLm5vZGUuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5yb3RhdGluZ0N0cmwgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcGxheU1lcmdlTm9ybWFsQm9tYihjZW50ZXJQb3M6IGNjLlZlYzIsIHRpbWU6IG51bWJlciA9IEdhcFRpbWUuTWVyZ2VCb21iU3BlZWQsIGlzTmVlZERlc3Rvcnk6IGJvb2xlYW4gPSB0cnVlLCBpc1Nob3dTcGVlZExpbmU6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIC8v5qC55o2u5pa55ZCRLOWBmuWPmOW9oiEgIFxuICAgICAgICBpZiAodGhpcy5tb2RlbC5pc1JvY2tldCAmJiB0aGlzLmVsaW1hdGVTaXplICE9IDApIHtcbiAgICAgICAgICAgIHRoaXMuZXhlY1Jva2V0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGlyID0gQ29tbW9uLmdldERpcmN0aW9uKGNlbnRlclBvcywgdGhpcy5tb2RlbC5wb3MpO1xuICAgICAgICBjb25zdCBjZW50ZXJQb3NpdGlvbiA9IENvbW1vbi5nZXRQb3MoY2VudGVyUG9zLngsIGNlbnRlclBvcy55KTtcbiAgICAgICAgbGV0IHsgc3gsIHN5IH0gPSB7IHN4OiAxLCBzeTogMSB9O1xuICAgICAgICBpZiAoZGlyLnggIT0gMCkge1xuICAgICAgICAgICAgc3ggPSAxLjI7IHN5ID0gMC44O1xuICAgICAgICB9IGVsc2UgaWYgKGRpci55ICE9IDApIHtcbiAgICAgICAgICAgIHN4ID0gMC44OyBzeSA9IDEuMjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhMCA9IGNjLnNjYWxlVG8oMC4wNSwgc3gsIHN5KTtcbiAgICAgICAgY29uc3QgYTEgPSBjYy5tb3ZlVG8odGltZSwgY2VudGVyUG9zaXRpb24pO1xuICAgICAgICBjb25zdCBhMiA9IGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgIGlmIChpc05lZWREZXN0b3J5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVEZXN0b3J5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2VsbFNwcml0ZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgdGhpcy5tb2RlbC5ub3RpZnlSb3VuZEVsaW1hdGUodGhpcy5lbGltYXRlVHlwZSk7XG4gICAgICAgIGlmIChpc1Nob3dTcGVlZExpbmUpIHtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5FZmZlY3QuU3BlZWRMaW5lLCBDb21tb24uZ2V0V29ybGRQb3ModGhpcy5ub2RlKSwgZGlyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNwYXduKGEwLCBhMSksIGEyKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0b3BQcm9tcHRBY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmNlbGxTcHJpdGUpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnN0b3AoKTtcbiAgICAgICAgICAgIHRoaXMuY2VsbFNwcml0ZS5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICB0aGlzLmNlbGxTcHJpdGUubm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLnJlc2V0RGlzcGxheUluZm8oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcG9ydGFsT3V0KCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGlmICghdGhpcy5wb3J0YWxSZXNvbHZlKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcnRhbFJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoQW5pTmFtZS5wb3J0YWxPdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHBvcnRhbEluKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGlmICghdGhpcy5wb3J0YWxSZXNvbHZlKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcnRhbFJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkoQW5pTmFtZS5wb3J0YWxJbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGV4ZWNQb3J0YWxSZXNvbHZlKCkge1xuICAgICAgICB0aGlzLnBvcnRhbFJlc29sdmUgJiYgdGhpcy5wb3J0YWxSZXNvbHZlKHRydWUpO1xuICAgICAgICB0aGlzLnBvcnRhbFJlc29sdmUgPSBudWxsO1xuICAgIH1cblxuICAgIC8qKuacrOi6q+aYr+aUtumbhueJqSzpnIDopoHlgZrku4DkuYjmoLfnmoTov4fluqbliqjnlLsgPz8/PyAqL1xuICAgIHByaXZhdGUgcGxheUNvbGxlY3RBbmkoKSB7XG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAxMDA7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSB0aGlzLmFuaW1hdGlvbi5wbGF5KEFuaU5hbWUuY29sbGVjdCk7XG4gICAgICAgIHRoaXMucGxheUxpdHRsZUVsaW1hdGVFZmYoKTtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIOWKqOeUu+aJp+ihjOWMuuWfnyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIHByaXZhdGUgY2hlY2tEZXN0b3J5KGR0KSB7XG4gICAgICAgIGlmICh0aGlzLmRlc3RvcnlUaW1lICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdG9yeVRpbWUgLT0gZHQ7XG4gICAgICAgICAgICBpZiAodGhpcy5kZXN0b3J5VGltZSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjRGVzdG9yeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwuaXNEZWF0aCkge1xuICAgICAgICAgICAgdGhpcy5kZWF0aFRpbWVvdXQgKz0gZHQ7XG4gICAgICAgICAgICBpZiAoLyohdGhpcy5hbmltYXRpb25TdGF0ZSAmJiovIHRoaXMuZGVhdGhUaW1lb3V0ID4gNSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVhdGhUaW1lb3V0ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlFbGltYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVRlc3RMYWJlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncG9zJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgJHt0aGlzLm1vZGVsLnBvcy54fS0ke3RoaXMubW9kZWwucG9zLnl9YFxuICAgICAgICAgICAgLy8gaWYgKHRoaXMubW9kZWwuR3JvdXBJZCkge1xuICAgICAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncG9zJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgJHt0aGlzLm1vZGVsLkdyb3VwSWR9YFxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3BvcycpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJyc7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb3JkZXJseVVwZGF0ZShkdCkge1xuICAgICAgICAvL+W4p+eOh+mZkOWIti4uLuW9k+eOsOacieW4p+eOh+aXtumXtOi/nOi/nOi2hei/h+WNleagvOWNleS9jeaXtumXtCzliJnpmZDliLYhIFxuICAgICAgICBpZiAoZHQgPiBGYWxsTWF4R2F0ZUxpbWl0KSB7XG4gICAgICAgICAgICBkdCA9IEZhbGxNYXhHYXRlTGltaXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubW9kZWwgJiYgdGhpcy5tb2RlbC5pc0ZhbGwgJiYgIXRoaXMuaXNSdW5Nb3ZlKSB7XG5cbiAgICAgICAgICAgIGxldCB4ID0gdGhpcy5ub2RlLnggKyB0aGlzLm1vZGVsLnNwZWVkLnggKiB0aGlzLm1vZGVsLmZhbGxpbmdEaXIueCAqIGR0O1xuICAgICAgICAgICAgbGV0IHkgPSB0aGlzLm5vZGUueSAtIHRoaXMubW9kZWwuc3BlZWQueSAqIHRoaXMubW9kZWwuZmFsbGluZ0Rpci55ICogZHQ7XG5cbiAgICAgICAgICAgIC8v54K45by56ZyA6KaB5YeG5aSH5aW95LqGLuaJjeiDveaOieiQvSFcbiAgICAgICAgICAgIGlmICghdGhpcy5tb2RlbC5pc0JvbWIgfHwgKHRoaXMubW9kZWwuaXNCb21iICYmIHRoaXMubW9kZWwuaXNCb21iUmVhZHkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwuZmFsbERlcykge1xuICAgICAgICAgICAgICAgICAgICAvL+WkhOeQhuebruagh+WdkOagh+S/ruatoyEgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLmZhbGxpbmdEaXIueCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHggPSB4ID4gdGhpcy5tb2RlbC5mYWxsRGVzLnggPyB0aGlzLm1vZGVsLmZhbGxEZXMueCA6IHg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0geCA8IHRoaXMubW9kZWwuZmFsbERlcy54ID8gdGhpcy5tb2RlbC5mYWxsRGVzLnggOiB4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHkgPSB5IDwgdGhpcy5tb2RlbC5mYWxsRGVzLnkgPyB0aGlzLm1vZGVsLmZhbGxEZXMueSA6IHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh4ICE9IDAgfHwgeSAhPSAwIHx8ICF0aGlzLm5vZGUuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oeCwgeSk7XG4gICAgICAgICAgICAgICAgLy/mmK/lkKblt7Lnu4/kuIvokL3nu5PmnZ8hXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwucG9zRGV0ZWN0aW9uKHRoaXMubm9kZS5wb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnBsYXlGYWxsT3ZlckFuaSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcbiAgICAgICAgdGhpcy5jaGVja0Rlc3RvcnkoZHQpO1xuICAgICAgICBpZiAoQXBwcy5pc0RlYnVnKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRlc3RMYWJlbCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmICh0aGlzLnJvdGF0aW5nQ3RybCkge1xuICAgICAgICAvLyAgICAgdGhpcy5yb3RhdGluZ0N0cmwudXBkYXRlKGR0KTtcbiAgICAgICAgLy8gfVxuICAgIH1cbn1cbiJdfQ==