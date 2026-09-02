"use strict";
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