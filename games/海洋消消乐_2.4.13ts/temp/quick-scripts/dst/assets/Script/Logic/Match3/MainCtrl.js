
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/MainCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9517dpB0FtF360gsWHLfv7H', 'MainCtrl');
// Script/Logic/Match3/MainCtrl.ts

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
var Common_1 = require("../Common/Common");
var M_1 = require("../../Base/Manager/M");
var Level_1 = require("../Data/Interface/Level");
var Tutorial_1 = require("../Data/Interface/Tutorial");
var GameModel_1 = require("./Model/GameModel");
var Paths_1 = require("../../Base/Utils/Paths");
var Log_1 = require("../../Base/Utils/Log");
var Event_1 = require("../Data/Const/Event");
var MainUiCtrl_1 = require("./View/UI/MainUiCtrl");
var GroundViewCtrl_1 = require("./View/GroundViewCtrl");
var UpGroundViewCtrl_1 = require("./View/UpGroundViewCtrl");
var BasicCellViewCtrl_1 = require("./View/BasicCellViewCtrl");
var EffLayerCtrl_1 = require("./View/EffLayerCtrl");
var Util_1 = require("../../Base/Utils/Util");
var Constant_1 = require("../Data/Const/Constant");
var ActionCtrl_1 = require("../Common/ActionCtrl");
var CollectModel_1 = require("./Model/CollectModel");
var GroupAnimatCtrl_1 = require("../Common/GroupAnimatCtrl");
var TimeConfig_1 = require("../Data/Const/TimeConfig");
var CellBase_1 = require("./Model/CellBase");
var UIMgr_1 = require("../../Base/Manager/UIMgr");
var UIData_1 = require("../Data/Interface/UIData");
var Match3TutorialCtrl_1 = require("./View/Match3TutorialCtrl");
var Apps_1 = require("../../Base/Apps");
var GuideUtils_1 = require("../../../GodGuide/GuideUtils");
var ShaderHelper_1 = require("../../Base/Shader/ShaderHelper");
var ShaderTime_1 = require("../../Base/Shader/ShaderTime");
var AudioCtrl_1 = require("../Common/AudioCtrl");
var OverHightLightCtrl_1 = require("../Common/UI/OverHightLightCtrl");
var Match3Skin_1 = require("./Skin/Match3Skin");
var ResCtrl_1 = require("./ResCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MainCtrl = /** @class */ (function (_super) {
    __extends(MainCtrl, _super);
    function MainCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg = null;
        _this.uiNode = null;
        _this.effNode = null;
        _this.planePrefab = null;
        _this.maskNode = null;
        // @property(cc.Node)
        // GmPanel: cc.Node = null;
        _this.TutorialPanel = null;
        _this.overMask = null;
        _this.overHightLightNode = null;
        _this.gameModel = null;
        _this.touchCount = 0;
        _this.groundType = null;
        _this.uiCtrl = null;
        _this.effCtrl = null;
        _this.touchTimer = null;
        _this.touchLock = false;
        _this.touchOpenGMPanelCount = 0;
        _this.touchStartPos = cc.v2(0, 0);
        _this.groundViewCtrl = null;
        _this.basicCellViewCtrl = null;
        _this.upGroundViewCtrl = null;
        // private gameOverBombPool: Array<CellModel> = [];
        _this.gridCtrlPool = null;
        _this.gridViewPool = null;
        _this.currentBgIndex = null;
        _this.currentCtrlView = null;
        _this.isShowEndView = false;
        _this._isOverMark = null;
        _this.tutorialData = null;
        _this._useStepCount = 0;
        _this._loadingCount = 0;
        _this._loadingProgre = 0;
        _this._overClickCount = -1;
        _this._moveRowLock = false;
        _this._moveCrossLock = false;
        return _this;
    }
    // private overTuoweiNode: cc.Node = null;
    MainCtrl.prototype.onLoad = function () {
        cc.game.setFrameRate(Constant_1.RunTimeGate);
        if (Apps_1.default.isDebug) {
            Util_1.Util.Tool.showDebugView(true);
        }
        M_1.default.init();
        M_1.default.changeScene();
        this.initGame();
        this.initEvent();
        this.initTimerEvent();
    };
    MainCtrl.prototype.onDestroy = function () {
        this.removeEvent();
        GameModel_1.default.destory();
        M_1.default.nodePool.destory();
        GroupAnimatCtrl_1.default.ins.destory();
        ResCtrl_1.default.destory();
        Common_1.default.CurrentCtrlView = null;
        this.unscheduleAllCallbacks();
        clearTimeout(this.touchTimer);
    };
    MainCtrl.prototype.removeEvent = function () {
        M_1.default.event.unRegister(Event_1.Event.GameCMD.GameOver, this.onGameOver, this);
        M_1.default.event.unRegister(Event_1.Event.GameCMD.GameResume, this.onGameResume, this);
        M_1.default.event.unRegister(Event_1.Event.GameCMD.MoveGrid, this.onMoveGrid, this);
        M_1.default.event.unRegister(Event_1.Event.GameCMD.GameReset, this.reStartGame, this);
        M_1.default.event.unRegister(Event_1.Event.GameCMD.MainCMD, this.onGameViewTask, this);
        M_1.default.event.unRegister(Event_1.Event.GameCMD.StopPrompts, this.onStopPrompts, this);
        M_1.default.event.unRegister(Event_1.Event.UI.CollectComplet, this.onCollectComplet, this);
        M_1.default.event.unRegister(Event_1.Event.GameCMD.SpeCollect, this.onSpeCollectComplet, this);
        M_1.default.event.unRegister(Event_1.Event.GameCMD.ChangeCell, this.onChangeCellType, this);
        M_1.default.event.unRegister(Event_1.Event.GameCMD.ShowGameResult, this.showGameOverDialog, this);
        M_1.default.event.unRegister(Event_1.Event.GameCMD.UpdateComplexView, this.onUpdateComplexView, this);
        M_1.default.event.unRegister(Event_1.Event.GameCMD.UpdateCollectPower, this.collectPower, this);
        M_1.default.event.unRegister(Event_1.Event.GameCMD.GameOverFall, this._startFall, this);
    };
    MainCtrl.prototype.initEvent = function () {
        M_1.default.event.register(Event_1.Event.GameCMD.GameOver, this.onGameOver, this);
        M_1.default.event.register(Event_1.Event.GameCMD.GameResume, this.onGameResume, this);
        M_1.default.event.register(Event_1.Event.GameCMD.MoveGrid, this.onMoveGrid, this);
        M_1.default.event.register(Event_1.Event.GameCMD.GameReset, this.reStartGame, this);
        M_1.default.event.register(Event_1.Event.GameCMD.MainCMD, this.onGameViewTask, this);
        M_1.default.event.register(Event_1.Event.GameCMD.StopPrompts, this.onStopPrompts, this);
        M_1.default.event.register(Event_1.Event.UI.CollectComplet, this.onCollectComplet, this);
        M_1.default.event.register(Event_1.Event.GameCMD.ChangeCell, this.onChangeCellType, this);
        M_1.default.event.register(Event_1.Event.GameCMD.SpeCollect, this.onSpeCollectComplet, this);
        M_1.default.event.register(Event_1.Event.GameCMD.UpdateComplexView, this.onUpdateComplexView, this);
        M_1.default.event.register(Event_1.Event.GameCMD.UpdateCollectPower, this.collectPower, this);
        M_1.default.event.register(Event_1.Event.GameCMD.ShowGameResult, this.showGameOverDialog, this);
        M_1.default.event.register(Event_1.Event.GameCMD.GameOverFall, this._startFall, this);
    };
    MainCtrl.prototype.initGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lv, data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        M_1.default.runtime.addGameCount();
                        this.setZorder(0);
                        this.overHightLightNode.getComponent(OverHightLightCtrl_1.default).showStepNode();
                        this._useStepCount = M_1.default.runtime.MatchGameTime = 0;
                        // M.runtime.UsePorpRecord = [];
                        this._isOverMark = null;
                        this.overMask.active = false;
                        this._overClickCount = -1;
                        this.isShowEndView = false;
                        lv = M_1.default.runtime.SelectLevel || null;
                        return [4 /*yield*/, Level_1.default.ins.getLvCfgData(lv)];
                    case 1:
                        data = _b.sent();
                        M_1.default.event.send(Event_1.Event.UI.UpdateTmpLoadingProgress, 60);
                        if (!Constant_1.NewbieOpt) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, Tutorial_1.default.ins.getTurCfgData(lv)];
                    case 2:
                        _a.tutorialData = _b.sent();
                        _b.label = 3;
                    case 3:
                        if (!data)
                            return [2 /*return*/];
                        Level_1.default.ins.preLoadNextCfg(lv);
                        M_1.default.runtime.gameStar();
                        M_1.default.runtime.GameState = Constant_1.GameState.preReady;
                        this.uiCtrl = this.uiNode.getComponent(MainUiCtrl_1.default);
                        this.effCtrl = this.effNode.getComponent(EffLayerCtrl_1.default);
                        this.gameModel = new GameModel_1.default(data);
                        return [4 /*yield*/, Match3Skin_1.default.load()];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, ResCtrl_1.default.load()];
                    case 5:
                        _b.sent();
                        this.uiCtrl.init(this, data);
                        this.initBg();
                        this.initMapGridView();
                        return [2 /*return*/];
                }
            });
        });
    };
    MainCtrl.prototype.setZorder = function (index) {
        if (index === void 0) { index = 0; }
        if (index == 0) {
            this.node.zIndex = 0;
            this.uiNode.zIndex = 1;
        }
        else {
            this.node.zIndex = 1;
            this.uiNode.zIndex = 0;
        }
    };
    MainCtrl.prototype.startGame = function () {
        var _this = this;
        if (UIMgr_1.default.ins.isShowing(UIData_1.UIHudDef.GameLoading)) {
            this.scheduleOnce(function () {
                UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.GameLoading, false, function () {
                    _this.showTargetView();
                });
            }, 1);
        }
        else {
            this.showTargetView();
        }
    };
    MainCtrl.prototype.reStartGame = function () {
        this.removeCurrentGame();
        this.initGame();
    };
    MainCtrl.prototype.removeCurrentGame = function () {
        GameModel_1.default.destory();
        GroupAnimatCtrl_1.default.ins.destory();
        Common_1.default.CurrentCtrlView = null;
        this.gameModel = null;
        this.maskNode.destroyAllChildren(); // removeAllChildren
    };
    MainCtrl.prototype.showTargetView = function () {
        M_1.default.event.send(Event_1.Event.Sound.PlayBGM, AudioCtrl_1.AudioID.BGM2);
        this.uiCtrl.showTargetDialog(this.preStartShowGrid.bind(this));
        GuideUtils_1.GuideUtils.onMatch3Begin(M_1.default.runtime.SelectLevel || M_1.default.runtime.CurLevel);
    };
    /** 开启触发器 */
    MainCtrl.prototype.initTimerEvent = function () {
        var _this = this;
        this.schedule(function () {
            _this.gameModel && _this.gameModel.timerTrigger();
            _this.checkShowGameOver();
            M_1.default.runtime.MatchGameTime++;
        }, 1, cc.macro.REPEAT_FOREVER, 1);
    };
    MainCtrl.prototype.showCurrentMemory = function () {
        var deps = cc.loader.getDependsRecursively(this.node);
        console.error('m:', deps);
    };
    MainCtrl.prototype.initBg = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lvData, bgIndex, bgInfo, task;
            var _this = this;
            return __generator(this, function (_a) {
                lvData = this.gameModel.getLvData();
                bgIndex = M_1.default.runtime.CurBgIndex = lvData.levelInfo.background || 1;
                if (this.currentBgIndex != bgIndex) {
                    this.currentBgIndex = bgIndex;
                    //移除老旧背景与效果!
                    this.bg.node.destroyAllChildren();
                    this.bg.node.parent.getChildByName('bbg').destroyAllChildren();
                    cc.find('top/Auto_record/collectNode/role', this.uiNode).destroyAllChildren();
                    bgInfo = Common_1.default.getBgInfo(bgIndex);
                    this.groundType = bgInfo.type;
                    if (!bgInfo.isWater) {
                        this.bg.node.removeComponent(ShaderHelper_1.default);
                        this.bg.node.removeComponent(ShaderTime_1.default);
                    }
                    task = [];
                    task.push(Common_1.default.getRes("" + Paths_1.default.Match3Bg + bgIndex + "/" + bgInfo.name, cc.SpriteFrame));
                    task.push(Common_1.default.getRes("" + Paths_1.default.Match3Bg + bgIndex + "/" + bgInfo.cfg, cc.JsonAsset));
                    Promise.all(task).then(function (data) {
                        _this.bg.spriteFrame = data[0];
                        var cfg = data[1];
                        if (cfg && cfg.json) {
                            _this.updateBgTopAlign(cfg.json.top);
                            var t1 = [];
                            var sub = cfg.json.sub;
                            if (sub) {
                                for (var i = sub.length; i--;) {
                                    t1.push(_this.addItem2Bg(sub[i]));
                                }
                            }
                            var txu = cfg.json.texture;
                            if (txu) {
                                for (var i = txu.length; i--;) {
                                    t1.push(_this.fillItemTexture(txu[i]));
                                }
                            }
                            _this._loadingCount = t1.length;
                            Promise.all(t1).then(function (res) {
                                console.error('全部加载完成!!!!', res.length);
                                _this.sendUpdateLoadingEvent(100);
                                _this.startGame();
                            });
                        }
                    });
                }
                else {
                    this.startGame();
                }
                return [2 /*return*/];
            });
        });
    };
    MainCtrl.prototype.fillItemTexture = function (textureCfg) {
        var _this = this;
        if (textureCfg) {
            var path = "" + Paths_1.default.Match3Bg + this.currentBgIndex + "/" + textureCfg.path;
            return Common_1.default.getRes(path, cc.SpriteFrame).then(function (res) {
                if (res) {
                    var node = cc.find("Canvas/" + textureCfg.parent);
                    if (node) {
                        node.getComponent(cc.Sprite).spriteFrame = res;
                    }
                    _this.sendUpdateLoadingEvent();
                }
            });
        }
    };
    MainCtrl.prototype.addItem2Bg = function (itemCfg) {
        var _this = this;
        if (itemCfg) {
            var path = "" + Paths_1.default.Match3Bg + this.currentBgIndex + "/" + itemCfg.path;
            var type = null;
            switch (itemCfg.type) {
                case 'sprite':
                    type = cc.SpriteFrame;
                    break;
                case 'prefab':
                    type = cc.Prefab;
                    break;
            }
            return Common_1.default.getRes(path, type).then(function (res) {
                if (res) {
                    var node_1 = null;
                    switch (itemCfg.type) {
                        case 'sprite':
                            node_1 = M_1.default.nodePool.createItem(null);
                            var sprite = node_1.addComponent(cc.Sprite);
                            sprite.spriteFrame = res;
                            break;
                        case 'prefab':
                            node_1 = M_1.default.nodePool.createItem(res);
                            break;
                    }
                    if (node_1) {
                        node_1.parent = cc.find("Canvas/" + itemCfg.parent);
                        if (itemCfg.pos) {
                            node_1.setPosition(itemCfg.pos[0], itemCfg.pos[1]);
                        }
                        var dirs = ['top', 'left', 'right', 'bottom'];
                        dirs.forEach(function (d) {
                            if (itemCfg[d] != null && itemCfg[d] != undefined) {
                                (Common_1.default.setAlignment(node_1, d, itemCfg[d]));
                            }
                        });
                        var anc = itemCfg.anchor;
                        if (anc) {
                            node_1.setAnchorPoint(anc[0], anc[1]);
                        }
                        var z = itemCfg.z;
                        if (z != null && z != undefined) {
                            node_1.zIndex = z;
                        }
                    }
                }
                _this.sendUpdateLoadingEvent();
            });
        }
    };
    MainCtrl.prototype.sendUpdateLoadingEvent = function (zdtarget) {
        if (zdtarget === void 0) { zdtarget = null; }
        this._loadingProgre++;
        M_1.default.event.send(Event_1.Event.UI.UpdateTmpLoadingProgress, zdtarget || Math.ceil((60 + (this._loadingProgre / this._loadingCount) * 60)));
    };
    MainCtrl.prototype.updateBgTopAlign = function (top) {
        var lvLabPos = this.uiCtrl && this.uiCtrl.getLevelLabelPos ? this.uiCtrl.getLevelLabelPos() : null;
        //根据上部关卡节点来确认偏移量
        var topGap = 0;
        if (this.currentBgIndex == 1 && lvLabPos) {
            topGap = (cc.winSize.height - lvLabPos.y) - 307;
        }
        Common_1.default.setAlignment(this.bg.node, 'top', top + topGap);
    };
    MainCtrl.prototype.onSpeCollectComplet = function (cm) {
        var _this = this;
        var type = cm.getType();
        var pos = cm.getPosition();
        if (type == Constant_1.CellType.Banana) {
            var tree_1 = this.groundViewCtrl.getRandMonkeyTree();
            if (tree_1) {
                var targetPos = Common_1.default.getWorldPos(tree_1.data.tree.node);
                var offset = cc.v2(50, 50);
                this.basicCellViewCtrl.playCollectAni(this.uiNode, type, pos, targetPos.add(offset), null, function () {
                    _this.groundViewCtrl.monkeyTreeExpUp(_this.uiNode, tree_1.index);
                });
            }
        }
        else if (type == Constant_1.CellType.BottleCaps) {
            this.basicCellViewCtrl.playCollectStepAni(this.uiCtrl, cm);
        }
    };
    MainCtrl.prototype.onCollectComplet = function (type, index, elimateType) {
        var targetPos = this.gameModel.CollectPos || this.uiCtrl.getCollectPos(type);
        var isCanCollect = true;
        switch (type) {
            case CollectModel_1.CollectType.gnome:
                this.groundViewCtrl.playGnomeAni(this.uiNode, index, targetPos);
                break;
            case CollectModel_1.CollectType.box:
                this.upGroundViewCtrl.playCollectAniByType(this.uiNode, index, targetPos, CollectModel_1.CollectType.box);
                break;
            case CollectModel_1.CollectType.colorbox:
                this.upGroundViewCtrl.playCollectAniByType(this.uiNode, index, targetPos, CollectModel_1.CollectType.colorbox);
                break;
            case CollectModel_1.CollectType.gem:
                this.groundViewCtrl.playGemAni(this.uiNode, index, targetPos);
                break;
            case CollectModel_1.CollectType.firefly:
                this.groundViewCtrl.playFireflyAni(this.uiNode, index, targetPos);
                break;
            case CollectModel_1.CollectType.turtles:
                this.groundViewCtrl.playTurtlesAni(this.uiNode, index);
                break;
            case CollectModel_1.CollectType.crab:
                this.groundViewCtrl.playCrabAni(this.uiNode, index);
                break;
            case Constant_1.CellType.Conch:
                console.error('收集收集收集收集收集贝壳');
                isCanCollect = false;
                break;
            default:
                isCanCollect = false;
                this.basicCellViewCtrl.playCollectAni(this.uiNode, type, index, targetPos, elimateType);
        }
        if (isCanCollect) {
            M_1.default.runtime.addCollectCount(type);
        }
    };
    /**同步当前棋盘状态! */
    MainCtrl.prototype.syncGridBoard = function () {
        var index = this.gameModel.mapIndex;
        var cd = this.gridCtrlPool.get(index);
        Common_1.default.CurrentCtrlView = this.currentCtrlView = this.gridViewPool.get(index);
        if (cd) {
            this.groundViewCtrl = cd.gc;
            this.basicCellViewCtrl = cd.mc;
            this.upGroundViewCtrl = cd.ugc;
        }
        this.gridViewPool.forEach(function (item, key) {
            if (key != index) {
                item.active = false;
            }
        });
    };
    MainCtrl.prototype.initMapGridView = function () {
        var maps = this.gameModel.getMaps();
        this.gridCtrlPool = new Map();
        this.gridViewPool = new Map();
        var gridBoardPrefab = Match3Skin_1.default.requirePrefab("gridBoard");
        for (var i = 0; i < this.gameModel.mapCount; i++) {
            var gridCtrlView = cc.instantiate(gridBoardPrefab);
            var gridData = maps[i];
            var gc = this.initGround(gridCtrlView, gridData);
            var mc = this.initMainLayer(gridCtrlView, gridData);
            var ugc = this.initUpGround(gridCtrlView, gridData);
            this.gridCtrlPool.set(i, { gc: gc, mc: mc, ugc: ugc });
            this.gridViewPool.set(i, gridCtrlView);
            this.setGirdViewSize(gridCtrlView, i);
            gridCtrlView.parent = this.maskNode;
            gridCtrlView.x = i * cc.winSize.width;
        }
    };
    MainCtrl.prototype.setGirdViewSize = function (view, index) {
        var topPos = this.gameModel.getTopPosition(index);
        var height = topPos.y * 2 + Common_1.default.GRID_H;
        if (height > this.maskNode.height) {
            this.gameModel.setLongHeight(true);
            view.setContentSize(this.node.width, height);
        }
    };
    MainCtrl.prototype.gameReadyOK = function () {
        this.syncGridBoard();
        M_1.default.runtime.GameState = Constant_1.GameState.Normal;
        Log_1.Log.w('准备完毕,开启触摸!');
        //开局检测一次!
        this.gameModel.openAutoCheckOpt();
        this.checkUseProp();
        this.initTouch();
        this.checkTutorial();
    };
    MainCtrl.prototype.onMoveGrid = function (target, type) {
        var _this = this;
        var checkIsNoFall = function () {
            if (!_this.gameModel.isFalling) {
                Log_1.Log.i('开始检测棋盘移动!');
                if (type == 0) {
                    M_1.default.runtime.GameState = Constant_1.GameState.preReady;
                    _this.moveCross(target);
                }
                else {
                    _this.moveRow(_this.groundViewCtrl.checkCollectMoveDistance(_this.currentCtrlView, _this.maskNode));
                }
                _this.unschedule(checkIsNoFall);
            }
        };
        this.schedule(checkIsNoFall, 1);
    };
    MainCtrl.prototype.moveRow = function (distance) {
        var _this = this;
        //检测是否够长度 
        if (distance != 0 && !this._moveRowLock) {
            this._moveRowLock = true;
            M_1.default.runtime.GameState = Constant_1.GameState.preReady;
            ActionCtrl_1.default.ins.runMoveRow(this.currentCtrlView, distance).then(function () {
                _this._moveRowLock = false;
                M_1.default.runtime.GameState = Constant_1.GameState.Normal;
            });
        }
    };
    MainCtrl.prototype.moveCross = function (nextIndex) {
        var _this = this;
        if (!this._moveCrossLock) {
            this._moveCrossLock = true;
            if (this.gridViewPool.size > 0) {
                this._moveCrossLock = false;
                this.gridViewPool.forEach(function (value, key) {
                    value.active = true;
                    ActionCtrl_1.default.ins.runMoveCross(value).then(function () {
                        console.error('移动结束!!');
                        M_1.default.runtime.GameState = Constant_1.GameState.Normal;
                        _this.gameModel.changeMap(nextIndex);
                        _this.syncGridBoard();
                    });
                });
            }
            else {
                this._moveCrossLock = false;
            }
        }
    };
    /**开始游戏前展示棋盘,不支持同时展示横向与纵向 */
    MainCtrl.prototype.preStartShowGrid = function () {
        //如果有多个屏幕,或者当前关卡长度超过设定长度
        var gridView = this.gridViewPool.get(this.gameModel.mapIndex);
        if (this.gameModel.mapCount > 1) {
            //展示所有的地图
            this.maskNode.removeComponent(cc.Mask);
            this.playShowCross();
        }
        else if (gridView.height > 0) {
            this.playShowRow(gridView);
        }
        else {
            this.gameReadyOK();
        }
    };
    MainCtrl.prototype.playShowRow = function (gridView) {
        ActionCtrl_1.default.ins.runShowRow(gridView, this.maskNode.height).then(this.gameReadyOK.bind(this));
    };
    MainCtrl.prototype.playShowCross = function () {
        ActionCtrl_1.default.ins.runShowCross(this.node, this.gridViewPool).then(this.gameReadyOK.bind(this));
    };
    MainCtrl.prototype.initGround = function (node, data) {
        node = node.getChildByName('ground');
        var gCtrl = node.getComponent(GroundViewCtrl_1.default);
        gCtrl.initView(data.gm.getGroupCellList(), data, this.gameModel.getLvData(), this.groundType);
        return gCtrl;
    };
    MainCtrl.prototype.initMainLayer = function (node, data) {
        node = node.getChildByName('mainLayer');
        var mCtrl = node.getComponent(BasicCellViewCtrl_1.default);
        mCtrl.initView(data.cellList);
        return mCtrl;
    };
    MainCtrl.prototype.initUpGround = function (node, data) {
        node = node.getChildByName('upGround');
        var ugCtrl = node.getComponent(UpGroundViewCtrl_1.default);
        ugCtrl.initView(data.ugm.getUGroupCellList());
        return ugCtrl;
    };
    MainCtrl.prototype.initTouch = function () {
        var curMapView = this.gridViewPool.get(this.gameModel.mapIndex);
        var node = this.node;
        if (curMapView.height > 0)
            node = curMapView;
        node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    };
    MainCtrl.prototype.onTouchStart = function (event) {
        this.touchStartPos = event.touch.getLocation();
    };
    MainCtrl.prototype.onTouchMove = function (event) {
        this.checkMoveCell(event.touch.getLocation());
    };
    MainCtrl.prototype.onTouchEnd = function (event) {
        var _this = this;
        //加上操作区域移动后的偏移量,修正触摸坐标取棋盘坐标!  
        var pos = this.currentCtrlView.convertToNodeSpaceAR(event.touch.getLocation());
        this._overClick(event.touch.getLocation());
        if (M_1.default.runtime.GameState != Constant_1.GameState.Normal)
            return;
        this.touchLock = false;
        clearTimeout(this.touchTimer);
        this.touchCount++;
        if (this.touchCount >= 2) {
            this.touchCount = 0;
            this.doubleClick(pos);
        }
        this.touchTimer = setTimeout(function () {
            _this.touchCount = 0;
            _this.touchOpenGMPanelCount = 0;
        }, 500);
        if (!event || (event && !event.istutorial)) {
            this.click(pos);
        }
    };
    MainCtrl.prototype.click = function (curPos) {
        this.gameModel.onClick(curPos, true);
        // const model = Common.safeGet2ArrayValue(GameModel.ins.GroundList, Common.convetPos(curPos));
        // model.cleanGround();
        // this.groundViewCtrl.updateComlexIteamByPos(Common.convetPos(curPos));
    };
    MainCtrl.prototype.doubleClick = function (curPos) {
        this.gameModel.onDoubleClick(Common_1.default.convetPos(curPos));
    };
    MainCtrl.prototype.checkMoveCell = function (curPos) {
        if (this.touchLock || M_1.default.runtime.GameState != Constant_1.GameState.Normal) {
            return;
        }
        var sp = curPos.sub(this.touchStartPos);
        if (Math.abs(sp.x) > Common_1.default.GRID_W / 3 || Math.abs(sp.y) > Common_1.default.GRID_H / 3) {
            var dir = cc.v2(0, 0);
            if (Math.abs(sp.x) > Math.abs(sp.y)) {
                dir.x = sp.x > 0 ? 1 : -1;
            }
            else {
                dir.y = sp.y > 0 ? -1 : 1;
            }
            var pos = this.currentCtrlView.convertToNodeSpaceAR(this.touchStartPos);
            this.gameModel.touchMove(Common_1.default.convetPos(pos), dir);
            this.touchLock = true;
        }
    };
    MainCtrl.prototype.onGameViewTask = function (task) {
        switch (task.action) {
            case Event_1.Event.GameCMD.Elimate:
                this.execElimate(task);
                break;
            case Event_1.Event.GameCMD.Exchange:
                this.execExchange(task);
                break;
            case Event_1.Event.GameCMD.AddNewCell:
                this.execAddNewCell(task);
                break;
            case Event_1.Event.GameCMD.PromptCanElimate:
                this.execTisAnimation(task);
                break;
        }
    };
    MainCtrl.prototype.testGameOver = function () {
        // this.onGameOver(true);\
        this.reStartGame();
    };
    MainCtrl.prototype.onGameResume = function () {
        if (this._isOverMark != null) {
            this.onGameOver(this._isOverMark);
        }
    };
    MainCtrl.prototype.onGameOver = function (result) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.error('游戏结束', result);
                if (M_1.default.runtime.GameState == Constant_1.GameState.Normal) {
                    this._useStepCount = (this.gameModel.stepCount - this.gameModel.stepLimit);
                    if (result) {
                        //设置不不可操作
                        M_1.default.runtime.GameState = Constant_1.GameState.Win;
                        // this.showGameOverDialog(result);
                        this.gameOverStartBomb();
                    }
                    else {
                        M_1.default.runtime.GameState = Constant_1.GameState.Fail;
                        this.showGameOverDialog(result);
                    }
                }
                else {
                    this._isOverMark = true;
                }
                return [2 /*return*/];
            });
        });
    };
    MainCtrl.prototype._startOverClick = function () {
        var _this = this;
        M_1.default.runtime.GameState = Constant_1.GameState.End;
        UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.OverShow, { type: UIData_1.UIHudDef.OverShow }, null, function () {
            //高亮棋盘与步数!开启黑色遮罩~
            _this.setZorder(1);
            _this.overMask.active = true;
            _this.overHightLightNode.getComponent(OverHightLightCtrl_1.default).showCountDown();
        });
        // UIMgr.ins.showUI(UIHudDef.OverShow, { type: UIHudDef.OverShow }, null, () => {
        //     //开启显示效果...开启点消 
        //     if (this.gameModel.stepLimit > 0) {
        //         this._overClickCount = this.gameModel.stepLimit;
        //         this.setZorder(1);
        //         this.overMask.active = true;
        //         M.runtime.OverStepCount = 0;
        //         M.tips.show('请点击棋盘,进行疯狂的消除吧!', 1)
        //     } else {
        //         this.showGameOverDialog(true);
        //     }
        // });
    };
    MainCtrl.prototype._overClick = function (pos) {
        this.gameModel.onClick(pos, false);
        // if (this._overClickCount != -1) {
        //     if (this.gameModel.stepLimit > 0) {
        //         const pos = Common.convetPos(position);
        //         const cell = Common.safeGet2ArrayValue(this.gameModel.CellList, pos);
        //         if (cell) {
        //             cell.change2Bomb(CellType.Bomb1);
        //             cell.onMsg(MsgType.Bomb, null);
        //             this.gameModel.stepLimit--;
        //             M.event.send(Event.UI.UpdateInfoPanel);
        //             M.runtime.OverStepCount++
        //             if (M.runtime.OverStepCount > 7) {
        //                 M.runtime.OverStepCount = 7;
        //             }
        //             M.event.send(Event.UI.AddScore, ScoreConfig.OverStep[M.runtime.OverStepCount], position, true)
        //         }
        //     }
        // }
    };
    // private checkShowGameOver() {
    //     if (M.runtime.GameState == GameState.Win && !this.gameModel.isFalling) {
    //         // this._startOverClick();
    //     }
    //     // else if (M.runtime.GameState == GameState.End && !this.isShowEndView) {
    //     // if (this.gameModel.stepLimit <= 0 && !this.gameModel.isFalling) {
    //     //     this.showGameOverDialog(true);
    //     // }
    //     // }
    // }
    MainCtrl.prototype.checkShowGameOver = function () {
        var _this = this;
        if (M_1.default.runtime.GameState == Constant_1.GameState.Win) {
            if (!this.gameModel.isFalling) {
                M_1.default.runtime.GameState = Constant_1.GameState.ChangeBomb;
                if (this.gameModel.CellDict.size <= 0 || this.gameModel.stepLimit <= 0) {
                    this.showGameOverDialog(true);
                }
                else {
                    UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.OverShow, { type: UIData_1.UIHudDef.OverShow }, null, function () {
                        //开始将步数转换成炸弹.! 
                        _this.delayExecFun(0.2, _this.conversionStep2Bomb.bind(_this));
                    });
                }
            }
        }
        else if (M_1.default.runtime.GameState == Constant_1.GameState.End && !this.isShowEndView) {
            if (!this.gameModel.isFalling) {
                this.showGameOverDialog(true);
            }
        }
    };
    MainCtrl.prototype.conversionStep2Bomb = function () {
        var _this = this;
        // return new Promise((resolve) => {
        if (!this.gameModel)
            return;
        var closeAry = new Set();
        M_1.default.runtime.OverStepCount = 0;
        this.gameModel.CellDict.forEach(function (cell) {
            if (cell && !cell.isEmpty && !cell.isDeath && !cell.isBomb && !cell.isGround && !_this.gameModel.isHavaSpe(cell.pos)) {
                if (closeAry.size < _this.gameModel.stepLimit) {
                    closeAry.add(cell);
                }
            }
        });
        var centerPos = this.uiCtrl.getStepPos();
        GroupAnimatCtrl_1.default.ins.overShootEff(closeAry, centerPos, function () {
            _this && _this.gameOverStartBomb(0.3, true);
        });
        // });
    };
    MainCtrl.prototype._startFall = function () {
        this.gameModel.startOverFall();
    };
    MainCtrl.prototype.showGameOverDialog = function (result) {
        var _this = this;
        this.isShowEndView = true;
        var storyData = M_1.default.table.ChapterStory.getByPrimaryKey(M_1.default.runtime.CurLevel);
        this.gameModel.stopOverFall();
        if (result && storyData) {
            //展示对话框!
            UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.StoryTalkPanel, storyData, null, function () {
                _this.delayExecFun(1, function () {
                    _this.uiCtrl.showResultDialog(result, _this._useStepCount, M_1.default.runtime.MatchGameTime);
                });
            });
        }
        else {
            this.delayExecFun(1, function () {
                _this.uiCtrl.showResultDialog(result, _this._useStepCount, M_1.default.runtime.MatchGameTime);
            });
        }
    };
    MainCtrl.prototype.gameOverStartBomb = function (gaptime, isOver) {
        var _this = this;
        if (gaptime === void 0) { gaptime = 0; }
        if (isOver === void 0) { isOver = false; }
        var index = 0;
        this.gameModel.CellDict.forEach(function (cell) {
            if (cell && cell.isBomb) {
                index++;
                var time = gaptime;
                if (gaptime) {
                    time *= index;
                }
                else {
                    time = 0.1;
                }
                _this.delayExecFun(time, function () {
                    cell.onMsg(CellBase_1.MsgType.Bomb);
                    if (isOver) {
                        M_1.default.runtime.GameState = Constant_1.GameState.End;
                    }
                });
            }
        });
    };
    MainCtrl.prototype.onStopPrompts = function (task) {
        if (task.model1 && task.model1.extCtrl) {
            task.model1.extCtrl.stopPromptAction();
        }
        task.closeAry.forEach(function (cm) {
            cm.extCtrl && cm.extCtrl.stopPromptAction();
        });
    };
    MainCtrl.prototype.execTisAnimation = function (task) {
        if (task.model1 && task.model1.extCtrl) {
            task.model1.extCtrl.playSinglePrompt(task.cp1);
        }
        task.closeAry.forEach(function (cm) {
            cm.extCtrl && cm.extCtrl.playMulPrompt();
        });
        // this.gameModel.task.freeTask(task);
    };
    MainCtrl.prototype.execAddNewCell = function (task) {
        // if (this.basicCellViewCtrl) {
        this.basicCellViewCtrl.createNewCell(task.model1, task.extData);
        // }
        this.gameModel.task.freeTask(task);
    };
    MainCtrl.prototype.execElimate = function (task) {
        switch (task.type) {
            case Constant_1.ElimateType.Default:
                this.checkMergeBomb(task);
                break;
            case Constant_1.ElimateType.All:
                this.execDoubleRainbow(task);
                break;
            case Constant_1.ElimateType.Bomb6:
                GroupAnimatCtrl_1.default.ins.playCrabBomb(task.closeAry);
                break;
            case Constant_1.ElimateType.ThreeRowAndCol:
                this.execThreeRowAndCol(task);
                break;
            default:
                this.execBomb(task);
                break;
        }
        if (task.type > Constant_1.ElimateType.Prop) {
            //   this.playPropEff(task);
        }
    };
    /**
     * 执行普通消除接口
     * @param task 消除任务
     * @param forcedElimate 强制消除(不会触发炸弹连爆)
     */
    MainCtrl.prototype.execNormalElimate = function (task, forcedElimate) {
        var _this = this;
        if (forcedElimate === void 0) { forcedElimate = false; }
        if (task.size == 0) {
            (task.model1.extCtrl && task.model1.isDeath) && task.model1.extCtrl.elimate(task.size, task.model1.pos, task.type);
        }
        else {
            this.delayExecFun(task.keepTime, function () {
                _this.checkFishBomb(task.model1, task.size);
                task.closeAry.forEach(function (m) {
                    if (m && m.extCtrl && m.isDeath) {
                        m.isBomb = forcedElimate ? false : m.isBomb;
                        m.extCtrl.elimate(task.size, task.model1.pos, task.type);
                    }
                    /**销毁上位或者下位的障碍物 */
                    m && m.execUpElimate(task.type);
                });
                _this.gameModel.task.freeTask(task);
            });
        }
    };
    MainCtrl.prototype.execExchange = function (task) {
        var c2 = task.model2.extCtrl;
        //这里的 extData 指定是否单个移动
        if (task.model1.isBomb && task.model2.isBomb || task.extData) {
            c2 && c2.exchangeDoubleBombAni(task.model1);
        }
        else {
            var c1 = task.model1.extCtrl;
            c1 && c1.exchange(task.cp1, task.keepTime, task.model2);
            c2 && c2.exchange(task.cp2, task.keepTime, task.model1);
        }
        this.gameModel.task.freeTask(task);
    };
    MainCtrl.prototype.checkFishBomb = function (model, size) {
        if (model && model.getType() == Constant_1.CellType.Fish && size == 3) {
            //炸弹鱼爆炸!
            model.extCtrl && model.extCtrl.execFishBomb();
        }
    };
    MainCtrl.prototype.checkMergeBomb = function (task) {
        var _this = this;
        //普通消除!
        var scoreModel = task.model1;
        if (task.size >= 4) {
            if (this.gameModel.isCanMergeBomb(task.extData, task.model1)) {
                M_1.default.event.send(Event_1.Event.Sound.PlaySoundEff, AudioCtrl_1.AudioID.merge_boom);
                var isExec = false;
                if (M_1.default.runtime.GameState == Constant_1.GameState.End) {
                    isExec = true;
                }
                GroupAnimatCtrl_1.default.ins.playCreateBomb(task.extData, task.model1.pos, isExec, TimeConfig_1.GapTime.MergeBombSpeed + 0.2, true, scoreModel.GroupId);
                M_1.default.runtime.addMergeCount(task.extData);
            }
            else {
                task.model1.unlockCreateBombPos();
            }
        }
        else if (task.closeAry) {
            //找出边界的那个 横的左边,竖的右边
            var tempModel_1 = null;
            task.closeAry.forEach(function (model) {
                if (!tempModel_1) {
                    tempModel_1 = model;
                }
                else if (tempModel_1.pos.x == model.pos.x && model.pos.y < tempModel_1.pos.y) {
                    tempModel_1 = model;
                }
                else if (tempModel_1.pos.y == model.pos.y && model.pos.x < tempModel_1.pos.x) {
                    tempModel_1 = model;
                }
            });
            scoreModel = tempModel_1;
        }
        //绑定添加分数回调
        if (scoreModel && scoreModel.extCtrl) {
            scoreModel.extCtrl.BindAddScoreTask = function (pos, count) {
                count = count > 5 ? 5 : count;
                var comboName = Constant_1.ComboLevel[M_1.default.runtime.CurCombo];
                if (comboName) {
                    var ratio = Constant_1.comboRatio[comboName];
                    ratio = ratio > 2 ? 2 : ratio;
                    Log_1.Log.i('combo:', ratio, Constant_1.ScoreConfig.Combo[ratio]);
                    _this.uiCtrl.updateScore(Constant_1.ScoreConfig.Combo[ratio], pos);
                }
                else {
                    _this.uiCtrl.updateScore(Constant_1.ScoreConfig.Normal[count], pos);
                }
            };
        }
        this.execNormalElimate(task);
    };
    MainCtrl.prototype.execBomb = function (task) {
        var _this = this;
        //执行爆炸动画!  
        if (task.type == Constant_1.ElimateType.Girl) {
            var ctrl = task.model1.extCtrl;
            ctrl.elimate(0, task.model1.pos, task.type);
            this.gameModel.task.freeTask(task);
            return;
        }
        if (task.type == Constant_1.ElimateType.Rocket) {
            this.execOctopus(task);
            return;
        }
        if (task.model1 && task.model1.extCtrl) {
            task.model1.extCtrl.BindAddScoreTask = function (pos, size) {
                var socre = Constant_1.ScoreConfig.Special[task.model1.getType()];
                if (task.model1.isBomb) {
                    socre = Constant_1.ScoreConfig.BombElimate[task.model1.getType()];
                }
                _this.uiCtrl.updateScore(socre, pos);
            };
        }
        switch (task.model1.getType()) {
            case Constant_1.CellType.Bomb1:
                this.execBeikeBomb(task);
                break;
            case Constant_1.CellType.Fish:
                this.execFishBomb(task);
                break;
            case Constant_1.CellType.Bomb4:
                this.execOctopus(task);
                break;
            case Constant_1.CellType.Bomb2:
            case Constant_1.CellType.Bomb3:
                this.execRowAndCol(task);
                break;
            case Constant_1.CellType.Bomb5:
                task.model1.isBomb = false;
                this.execRainbow(task);
                break;
            default:
                this.execNormalElimate(task);
                break;
        }
    };
    MainCtrl.prototype.execThreeRowAndCol = function (task) {
        var _this = this;
        var elimateData = task.extData;
        elimateData.forEach(function (item) {
            _this.playRowAndColAni(item.type, item.pos, task.closeAry, task.type);
        });
        this.gameModel.task.freeTask(task);
    };
    /**
     * 执行双彩虹全局消除!
     * @param task
     */
    MainCtrl.prototype.execDoubleRainbow = function (task) {
        task.size = null;
        task.type = Constant_1.ElimateType.Default;
        if (task.extData == 0) {
            this.delayExecFun(TimeConfig_1.GapTime.DoubleRainbowResume, function () {
                M_1.default.runtime.resumeGame();
            });
        }
        this.execNormalElimate(task, true);
    };
    /**
     * 执行章鱼跳跃
     * @param task
     */
    MainCtrl.prototype.execOctopus = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var targetPos, conveType, wpos, tpos;
            var _this = this;
            return __generator(this, function (_a) {
                task.model1.isBomb = false;
                task.type = Constant_1.ElimateType.Bomb4;
                if (task.model1.extCtrl) {
                    task.model1.extCtrl.playBombSingleDestoryEff(0, 0.5);
                }
                targetPos = task.extData.pos;
                conveType = task.extData.type;
                wpos = Common_1.default.convertCurWorldPos(task.model1.getPosition());
                if (targetPos) {
                    tpos = Common_1.default.convertCurWorldPos(Common_1.default.getPos(targetPos.x, targetPos.y));
                    M_1.default.runtime.pushZhangyuTimePause();
                    /* 策划说这种效果不太好，还是沿用原来的抛物线
                    if(conveType){
        
                        var animName = "";
                        if (conveType == CellType.Bomb2) {
                            //章鱼+剑鱼
                            animName= "zhangyu_tiao_jianyu";
                        } else if (conveType == CellType.Bomb1) {
                            //章鱼+气泡鱼
                            animName= "zhangyu_tiao_hetun";
                        }
        
                        await EffLayerCtrl.ins.playZhangyuAndJianyu(animName,Common.convertCurWorldPos(<any>task.model1.extData.position),
                        Common.getPos(targetPos.x, targetPos.y),() => {
                           
                            //cc.log("这里有什么毛病 ???")
                             // 这里有什么毛病 ???
                            GroupAnimatCtrl.ins.playCreateBomb(conveType, targetPos, true, 0, false);
        
                            this.delayExecFun(0.5, () => {
                            M.runtime.deleteZhangyuTime()
                              });
                            GameModel.ins.CollectModel.removeMark(targetPos);
                            GroupAnimatCtrl.ins.playCellBombShocks(targetPos, 1, 1, true);
                        });
                    }else{
        
                        this.effCtrl.playZyJump(wpos, tpos, () => {
                            if (conveType) {
                                this.gameModel.execElimateOne(targetPos, ElimateType.Bomb4);
                                // 这里有什么毛病 ???
                                GroupAnimatCtrl.ins.playCreateBomb(conveType, targetPos, true, 0, false);
                            } else {
                                this.gameModel.execElimateOne(targetPos, ElimateType.Bomb4);
                            }
                            this.delayExecFun(0.5, () => {
                                M.runtime.deleteZhangyuTime()
                            });
                            GameModel.ins.CollectModel.removeMark(targetPos);
                            GroupAnimatCtrl.ins.playCellBombShocks(targetPos, 1, 1, true);
                        });
                    }*/
                    this.effCtrl.playZyJump(wpos, tpos, function () {
                        if (conveType) {
                            _this.gameModel.execElimateOne(targetPos, Constant_1.ElimateType.Bomb4);
                            // 这里有什么毛病 ???
                            GroupAnimatCtrl_1.default.ins.playCreateBomb(conveType, targetPos, true, 0, false);
                        }
                        else {
                            _this.gameModel.execElimateOne(targetPos, Constant_1.ElimateType.Bomb4);
                        }
                        _this.delayExecFun(0.5, function () {
                            M_1.default.runtime.deleteZhangyuTime();
                        });
                        GameModel_1.default.ins.CollectModel.removeMark(targetPos);
                        GroupAnimatCtrl_1.default.ins.playCellBombShocks(targetPos, 1, 1, true);
                    }, conveType);
                }
                this.execNormalElimate(task);
                return [2 /*return*/];
            });
        });
    };
    MainCtrl.prototype.execBeikeBomb = function (task) {
        if (task.model1.extCtrl) {
            var ctrl = task.model1.extCtrl;
            ctrl.playBombSingleDestoryEff(0, 1);
            var _a = [task.model1.pos, task.extData], centerPos_1 = _a[0], bombLv_1 = _a[1];
            var pos = Common_1.default.convertCurWorldPos(task.model1.extData.position);
            if (task.type != Constant_1.ElimateType.DoubleBomb) {
                this.effCtrl.playBombEff(bombLv_1, pos);
            }
            M_1.default.event.send(Event_1.Event.Sound.PlaySoundEff, AudioCtrl_1.AudioID.Bomb);
            this.execNormalElimate(task);
            this.delayExecFun(task.keepTime, function () {
                GroupAnimatCtrl_1.default.ins.playCellBombShocks(centerPos_1, bombLv_1);
            });
        }
    };
    // 吸附型爆炸
    // private execBeikeBomb(task) {
    //     if (task.model1.extCtrl) {
    //         const ctrl: ItemBasicCellCtrl = task.model1.extCtrl;
    //         ctrl.playBombSingleDestoryEff(0, 1 + GapTime.BeikeDelayShaking + GapTime.BeikeDelaySuction);
    //         const pos = Common.convertCurWorldPos(task.model1.extData.position);
    //         this.effCtrl.playBombEff(task.extData, pos);
    //         this.delayExecFun(GapTime.BeikeDelayShaking, () => {
    //             //吸他 
    //             task.closeAry.forEach((cell: CellModel) => {
    //                 if (cell && cell.extCtrl) {
    //                     cell.extCtrl.playShaking();
    //                 }
    //             });
    //             this.delayExecFun(GapTime.BeikeDelaySuction, () => {
    //                 task.closeAry.forEach((cell: CellModel) => {
    //                     if (cell && cell.extCtrl && cell.getType() < CellType.Bomb1 && task.model1.extData && cell.getType() != CellType.Fish) {
    //                         cell.extCtrl.playRotatingMerge(task.model1.extData.position);
    //                     }
    //                 });
    //                 this.execNormalElimate(task);
    //             })
    //         });
    //         this.delayExecFun(GapTime.BombPreShocks, () => {
    //             GroupAnimatCtrl.ins.playCellBombShocks(task.model1.pos, task.extData);
    //         });
    //     }
    // }
    MainCtrl.prototype.execFishBomb = function (task) {
        this.execNormalElimate(task);
        var pos = Common_1.default.convertCurWorldPos(task.model1.getPosition());
        this.effCtrl.playFishBombEff(pos);
        var _a = [task.model1.pos, task.extData], centerPos = _a[0], bombLv = _a[1];
        this.delayExecFun(TimeConfig_1.GapTime.FishBombPreShocks, function () {
            GroupAnimatCtrl_1.default.ins.playCellBombShocks(centerPos, bombLv);
        });
        task.model1.extCtrl && task.model1.extCtrl.playBombSingleDestoryEff(0, task.keepTime);
    };
    /**
     * 创建一个飞机,网格坐标!
     * @param startPos 起点位置
     * @param targetPos 终点位置
    
    private createPlane(startPos: cc.Vec2, targetData: { pos: cc.Vec2, type: CellType }) {
        const planeNode = M.nodePool.getItem(NodePoolKey.Plane, this.planePrefab);
        planeNode.parent = this.maskNode;
        const ctrl = planeNode.getComponent(PlaneCtrl);
        ctrl.shootPlane(startPos, targetData.pos, GapTime.CreatePlaneDelayTime).then(() => {
            if (targetData.type) {
                this.gameModel.execElimateOne(targetData.pos, ElimateType.Bomb4);
                GroupAnimatCtrl.ins.playCreateBomb(targetData.type, targetData.pos, true, 0);
            } else {
                this.gameModel.execElimateOne(targetData.pos, ElimateType.Bomb4);
            }
        });
    }
    */
    /**
     * 执行横竖消除
     * @param task
     */
    MainCtrl.prototype.execRowAndCol = function (task) {
        // const type = task.model1.getType();
        var pos = task.model1.pos;
        if (task.model1.extCtrl) {
            task.model1.isBomb = false;
            task.model1.extCtrl.playBombSingleDestoryEff(0, TimeConfig_1.GapTime.RowAndColSelfElimate, true);
        }
        this.playRowAndColAni(task.extData, pos, task.closeAry);
        this.gameModel.task.freeTask(task);
    };
    /**
     *
     * @param type 横的还是竖的
     * @param pos
     * @param closeAry
     */
    MainCtrl.prototype.playRowAndColAni = function (type, pos, closeAry, elimateType) {
        var _this = this;
        this.effCtrl.playRowColEff(type, Common_1.default.convertCurWorldPos(Common_1.default.getPos(pos.x, pos.y)));
        if (closeAry && closeAry.size > 0) {
            var _a = [1, closeAry.size, false], count_1 = _a[0], maxCount_1 = _a[1], isHavaBorn_1 = _a[2];
            var eType = elimateType || type;
            GroupAnimatCtrl_1.default.ins.playRowElimate(pos, closeAry, eType, function (isborn) {
                if (!_this.gameModel)
                    return;
                if (isborn)
                    isHavaBorn_1 = true;
                count_1++;
                if (type == Constant_1.CellType.Bomb3 && !isHavaBorn_1) {
                    if (maxCount_1 == count_1) {
                        console.error('竖消结束!');
                        _this.gameModel.notifyFallColumnOver(pos);
                    }
                }
            });
        }
    };
    MainCtrl.prototype.collectPower = function (start, end) {
        this.basicCellViewCtrl.playCollectPower(this.uiNode, start, end);
    };
    MainCtrl.prototype.onUpdateComplexView = function (pos) {
        this.groundViewCtrl.updateComlexIteamByPos(pos);
    };
    MainCtrl.prototype.delayExecFun = function (time, fun) {
        this.scheduleOnce(fun.bind(this), time);
    };
    /**
     * 执行彩虹消除
     * @param task
     */
    MainCtrl.prototype.execRainbow = function (task) {
        var _this = this;
        task.type = Constant_1.ElimateType.Bomb5;
        var centerModel = task.model1;
        var worldPos = Common_1.default.getWorldPos(centerModel.extData);
        M_1.default.runtime.pauseGame();
        centerModel.extCtrl.playBombSingleDestoryEff(0, TimeConfig_1.GapTime.RainbowCenterDelayElimate);
        this.effCtrl.playRainbowBomb(worldPos, function () {
            GroupAnimatCtrl_1.default.ins.playRainbowBomb(task.closeAry, worldPos, function () {
                M_1.default.runtime.resumeGame();
                if (!_this.gameModel)
                    return;
                _this.delayExecFun(TimeConfig_1.GapTime.StarsElimate, function () { _this.effCtrl.removeShootStars(); });
                _this.execNormalElimate(task);
            });
        });
    };
    MainCtrl.prototype.playPropEff = function (task) {
        //执行道具消除动画 
        // if (task.extData == PropType.Bomb1) {
        //     task.model1.extCtrl && task.model1.extCtrl.elimate(task.size, task.model1.pos, task.type);
        //     GroupAnimatCtrl.ins.playRowElimate(task.model1, task.closeAry, task.type, null);
        // } else if (task.extData == PropType.Bomb2) {
        //     task.model1.extCtrl && task.model1.extCtrl.elimate(task.size, task.model1.pos, task.type);
        //     GroupAnimatCtrl.ins.playRowElimate(task.model1, task.closeAry, task.type, null);
        // } else if (task.extData == PropType.Rainbow) {
        //     this.execNormalElimate(task);
        // } 
    };
    MainCtrl.prototype.onChangeCellType = function (type, count, isDelayCreate) {
        var _this = this;
        if (count === void 0) { count = 3; }
        if (isDelayCreate === void 0) { isDelayCreate = true; }
        if (M_1.default.runtime.GameState == Constant_1.GameState.Normal) {
            //随机获取n个位置用来转换成指定类型
            var getOneCell_1 = function () {
                var y = Util_1.Util.Tool.rangeInt(0, GameModel_1.default.GridSize.H, false);
                var x = Util_1.Util.Tool.rangeInt(0, GameModel_1.default.GridSize.W, false);
                var cell = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.CellList, cc.v2(x, y));
                if (cell && cell.extCtrl && !cell.isDeath && !_this.gameModel.isHavaObs(cell.pos) && cell.getType() < Constant_1.CellType.Banana && cell.getType() != type) {
                    return cell;
                }
                else {
                    return getOneCell_1();
                }
            };
            if (!this.gameModel.checkIsAllDeath()) {
                for (var i = count; i--;) {
                    this.scheduleOnce(function () {
                        var cell = getOneCell_1();
                        cell.change2Cell(type);
                        cell.extCtrl.playChange2Cell();
                        var pos = _this.uiNode.convertToNodeSpaceAR(Common_1.default.getWorldPos(cell.extData));
                        M_1.default.event.send(Event_1.Event.Effect.CollectOver, pos, 'shanxian');
                    }, isDelayCreate ? i * 0.5 : 0);
                }
            }
        }
    };
    MainCtrl.prototype.onTestBtnClick = function () {
        // const data = M.table.ChapterStory.getByPrimaryKey(7);
        // UIMgr.ins.showUI(UIHudDef.StoryTalkPanel, data);
        // M.runtime.setMatch3Level(M.runtime.CurLevel + 1);
        // cc.director.loadScene('Match3');
        // const closeAry = BombModel.test11111(cc.v2(3, 3), 2);
        // console.error(closeAry);
        // closeAry.forEach(cell => {
        //     if (cell && cell.extCtrl) {
        //         cell.extData.setScale(1.1);
        //         // private createPlane(startPos: cc.Vec2, targetData: { pos: cc.Vec2, type: CellType })
        //         this.createPlane(cell.pos, { pos: cc.v2(3, 3), type: 1 });
        //     }
        // }); 
    };
    MainCtrl.prototype.checkUseProp = function () {
        if (M_1.default.runtime.SelectProp) {
            M_1.default.event.send(Event_1.Event.GameCMD.PropClick, M_1.default.runtime.SelectProp);
            M_1.default.runtime.SelectProp = null;
        }
    };
    MainCtrl.prototype.checkTutorial = function () {
        // this.TutorialPanel.active = false;
        if (!this.tutorialData) {
            this.TutorialPanel.active = false;
        }
        else {
            this.TutorialPanel.active = true;
            this.TutorialPanel.getComponent(Match3TutorialCtrl_1.default).initView(this.tutorialData, this);
            this.startTutorial();
        }
    };
    MainCtrl.prototype.startTutorial = function () {
        this.TutorialPanel.getComponent(Match3TutorialCtrl_1.default).startTutorial();
    };
    MainCtrl.prototype.closeTutorial = function () {
        this.TutorialPanel.getComponent(Match3TutorialCtrl_1.default).closeTutorial();
    };
    /**********************GM ctrl star***********************/
    // private openGMPanel() {
    //     this.touchOpenGMPanelCount++;
    //     if (this.touchOpenGMPanelCount > 10 /*&& Apps.isDebug*/) {
    //         this.GmPanel.active = true;
    //         this.touchOpenGMPanelCount = 0;
    //     }
    // }
    // public onCloseGmPanel() {
    //     this.GmPanel.active = false;
    // }
    // public onJumpLv() {
    //     M.runtime.SelectLevel = 0;
    //     const edit: cc.EditBox = cc.find('jumpLv/box', this.GmPanel).getComponent(cc.EditBox);
    //     const nextLv = Number(edit.string);
    //     M.runtime.setMatch3Level(nextLv, true);
    //     Common.jumpScene(Scene.Match);
    // }
    /**********************GM ctrl end***********************/
    MainCtrl.prototype.update = function (dt) {
        this.gameModel && this.gameModel.update(dt);
    };
    __decorate([
        property(cc.Sprite)
    ], MainCtrl.prototype, "bg", void 0);
    __decorate([
        property(cc.Node)
    ], MainCtrl.prototype, "uiNode", void 0);
    __decorate([
        property(cc.Node)
    ], MainCtrl.prototype, "effNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], MainCtrl.prototype, "planePrefab", void 0);
    __decorate([
        property(cc.Node)
    ], MainCtrl.prototype, "maskNode", void 0);
    __decorate([
        property(cc.Node)
    ], MainCtrl.prototype, "TutorialPanel", void 0);
    __decorate([
        property(cc.Node)
    ], MainCtrl.prototype, "overMask", void 0);
    __decorate([
        property(cc.Node)
    ], MainCtrl.prototype, "overHightLightNode", void 0);
    MainCtrl = __decorate([
        ccclass
    ], MainCtrl);
    return MainCtrl;
}(cc.Component));
exports.default = MainCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNYWluQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBc0M7QUFDdEMsMENBQXFDO0FBQ3JDLGlEQUE0QztBQUM1Qyx1REFBa0Q7QUFDbEQsK0NBQXlEO0FBQ3pELGdEQUEyQztBQUMzQyw0Q0FBMkM7QUFDM0MsNkNBQTRDO0FBRTVDLG1EQUE4QztBQUM5Qyx3REFBbUQ7QUFDbkQsNERBQXVEO0FBRXZELDhEQUF5RDtBQUV6RCxvREFBK0M7QUFDL0MsOENBQTZDO0FBQzdDLG1EQUE4STtBQUM5SSxtREFBOEM7QUFDOUMscURBQW1EO0FBQ25ELDZEQUF3RDtBQUN4RCx1REFBbUQ7QUFDbkQsNkNBQXFEO0FBQ3JELGtEQUE2QztBQUM3QyxtREFBb0Q7QUFDcEQsZ0VBQTJEO0FBRTNELHdDQUFtQztBQUNuQywyREFBMEQ7QUFDMUQsK0RBQTBEO0FBQzFELDJEQUFzRDtBQUN0RCxpREFBOEM7QUFDOUMsc0VBQWlFO0FBQ2pFLGdEQUEyQztBQUMzQyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUE2MUNDO1FBMTFDRyxRQUFFLEdBQWMsSUFBSSxDQUFDO1FBR3JCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFHdkIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixpQkFBVyxHQUFjLElBQUksQ0FBQztRQUc5QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLHFCQUFxQjtRQUNyQiwyQkFBMkI7UUFHM0IsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUFHOUIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6Qix3QkFBa0IsR0FB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QUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUF6MUNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0NBQ0M7SUFHckI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0Q0FDSztJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZDQUNNO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ1U7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDTztJQU16QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNZO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ087SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt3REFDaUI7SUEzQmxCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0E2MUM1QjtJQUFELGVBQUM7Q0E3MUNELEFBNjFDQyxDQTcxQ3FDLEVBQUUsQ0FBQyxTQUFTLEdBNjFDakQ7a0JBNzFDb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21tb24gZnJvbSAnLi4vQ29tbW9uL0NvbW1vbic7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCBMZXZlbCBmcm9tIFwiLi4vRGF0YS9JbnRlcmZhY2UvTGV2ZWxcIjtcbmltcG9ydCBUdXRvcmlhbCBmcm9tIFwiLi4vRGF0YS9JbnRlcmZhY2UvVHV0b3JpYWxcIjtcbmltcG9ydCBHYW1lTW9kZWwsIHsgSUdyaWREYXRhIH0gZnJvbSBcIi4vTW9kZWwvR2FtZU1vZGVsXCI7XG5pbXBvcnQgUGF0aHMgZnJvbSBcIi4uLy4uL0Jhc2UvVXRpbHMvUGF0aHNcIjtcbmltcG9ydCB7IExvZyB9IGZyb20gXCIuLi8uLi9CYXNlL1V0aWxzL0xvZ1wiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IHsgQ2VsbE1vZGVsIH0gZnJvbSBcIi4vTW9kZWwvQ2VsbE1vZGVsXCJcbmltcG9ydCBNYWluVWlDdHJsIGZyb20gXCIuL1ZpZXcvVUkvTWFpblVpQ3RybFwiO1xuaW1wb3J0IEdyb3VuZFZpZXdDdHJsIGZyb20gXCIuL1ZpZXcvR3JvdW5kVmlld0N0cmxcIjtcbmltcG9ydCBVcEdyb3VuZFZpZXdDdHJsIGZyb20gXCIuL1ZpZXcvVXBHcm91bmRWaWV3Q3RybFwiO1xuaW1wb3J0IEl0ZW1CYXNpY0NlbGxDdHJsIGZyb20gXCIuL1ZpZXcvSXRlbUJhc2ljQ2VsbEN0cmxcIjtcbmltcG9ydCBCYXNpY0NlbGxWaWV3Q3RybCBmcm9tIFwiLi9WaWV3L0Jhc2ljQ2VsbFZpZXdDdHJsXCI7XG5pbXBvcnQgeyBHYW1lVGFza01vZGVsIH0gZnJvbSBcIi4vTW9kZWwvR2FtZVRhc2tNb2RlbFwiO1xuaW1wb3J0IEVmZkxheWVyQ3RybCBmcm9tIFwiLi9WaWV3L0VmZkxheWVyQ3RybFwiO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuLi8uLi9CYXNlL1V0aWxzL1V0aWxcIjtcbmltcG9ydCB7IEdhbWVTdGF0ZSwgU2NvcmVDb25maWcsIENlbGxUeXBlLCBFbGltYXRlVHlwZSwgUnVuVGltZUdhdGUsIE5ld2JpZU9wdCwgU2NlbmUsIENvbWJvTGV2ZWwsIGNvbWJvUmF0aW8gfSBmcm9tIFwiLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IEFjdGlvbkN0cmwgZnJvbSBcIi4uL0NvbW1vbi9BY3Rpb25DdHJsXCI7XG5pbXBvcnQgeyBDb2xsZWN0VHlwZSB9IGZyb20gXCIuL01vZGVsL0NvbGxlY3RNb2RlbFwiO1xuaW1wb3J0IEdyb3VwQW5pbWF0Q3RybCBmcm9tIFwiLi4vQ29tbW9uL0dyb3VwQW5pbWF0Q3RybFwiO1xuaW1wb3J0IHsgR2FwVGltZSB9IGZyb20gXCIuLi9EYXRhL0NvbnN0L1RpbWVDb25maWdcIjtcbmltcG9ydCB7IE1zZ1R5cGUsIENlbGxCYXNlIH0gZnJvbSBcIi4vTW9kZWwvQ2VsbEJhc2VcIjtcbmltcG9ydCBVSU1nciBmcm9tIFwiLi4vLi4vQmFzZS9NYW5hZ2VyL1VJTWdyXCI7XG5pbXBvcnQgeyBVSUh1ZERlZiB9IGZyb20gXCIuLi9EYXRhL0ludGVyZmFjZS9VSURhdGFcIjtcbmltcG9ydCBNYXRjaDNUdXRvcmlhbEN0cmwgZnJvbSBcIi4vVmlldy9NYXRjaDNUdXRvcmlhbEN0cmxcIjtcbmltcG9ydCB7IElUdXRvcmlhbCB9IGZyb20gXCIuLi9EYXRhL0ludGVyZmFjZS9MZXZlbC9JVHV0b3JpYWxcIjtcbmltcG9ydCBBcHBzIGZyb20gJy4uLy4uL0Jhc2UvQXBwcyc7XG5pbXBvcnQgeyBHdWlkZVV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vR29kR3VpZGUvR3VpZGVVdGlscyc7XG5pbXBvcnQgU2hhZGVySGVscGVyIGZyb20gJy4uLy4uL0Jhc2UvU2hhZGVyL1NoYWRlckhlbHBlcic7XG5pbXBvcnQgU2hhZGVyVGltZSBmcm9tICcuLi8uLi9CYXNlL1NoYWRlci9TaGFkZXJUaW1lJztcbmltcG9ydCB7IEF1ZGlvSUQgfSBmcm9tICcuLi9Db21tb24vQXVkaW9DdHJsJztcbmltcG9ydCBPdmVySGlnaHRMaWdodEN0cmwgZnJvbSAnLi4vQ29tbW9uL1VJL092ZXJIaWdodExpZ2h0Q3RybCc7XG5pbXBvcnQgTWF0Y2gzU2tpbiBmcm9tICcuL1NraW4vTWF0Y2gzU2tpbic7XG5pbXBvcnQgUmVzQ3RybCBmcm9tICcuL1Jlc0N0cmwnO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbkN0cmwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBiZzogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHVpTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBlZmZOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgcGxhbmVQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBtYXNrTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICAvLyBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICAvLyBHbVBhbmVsOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIFR1dG9yaWFsUGFuZWw6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgb3Zlck1hc2s6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgb3ZlckhpZ2h0TGlnaHROb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIHB1YmxpYyBnYW1lTW9kZWw6IEdhbWVNb2RlbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIHRvdWNoQ291bnQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBncm91bmRUeXBlOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSB1aUN0cmw6IE1haW5VaUN0cmwgPSBudWxsO1xuICAgIHByaXZhdGUgZWZmQ3RybDogRWZmTGF5ZXJDdHJsID0gbnVsbDtcblxuICAgIHByaXZhdGUgdG91Y2hUaW1lciA9IG51bGw7XG4gICAgcHJpdmF0ZSB0b3VjaExvY2s6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHRvdWNoT3BlbkdNUGFuZWxDb3VudCA9IDA7XG4gICAgcHJpdmF0ZSB0b3VjaFN0YXJ0UG9zOiBjYy5WZWMyID0gY2MudjIoMCwgMCk7XG5cbiAgICBwcml2YXRlIGdyb3VuZFZpZXdDdHJsOiBHcm91bmRWaWV3Q3RybCA9IG51bGw7XG4gICAgcHJpdmF0ZSBiYXNpY0NlbGxWaWV3Q3RybDogQmFzaWNDZWxsVmlld0N0cmwgPSBudWxsO1xuICAgIHByaXZhdGUgdXBHcm91bmRWaWV3Q3RybDogVXBHcm91bmRWaWV3Q3RybCA9IG51bGw7XG5cbiAgICAvLyBwcml2YXRlIGdhbWVPdmVyQm9tYlBvb2w6IEFycmF5PENlbGxNb2RlbD4gPSBbXTtcblxuICAgIHByaXZhdGUgZ3JpZEN0cmxQb29sOiBNYXA8bnVtYmVyLCB7IGdjOiBHcm91bmRWaWV3Q3RybCwgbWM6IEJhc2ljQ2VsbFZpZXdDdHJsLCB1Z2M6IFVwR3JvdW5kVmlld0N0cmwgfT4gPSBudWxsO1xuICAgIHByaXZhdGUgZ3JpZFZpZXdQb29sOiBNYXA8bnVtYmVyLCBjYy5Ob2RlPiA9IG51bGw7XG5cbiAgICBwcml2YXRlIGN1cnJlbnRCZ0luZGV4OiBudW1iZXIgPSBudWxsO1xuICAgIHByaXZhdGUgY3VycmVudEN0cmxWaWV3OiBjYy5Ob2RlID0gbnVsbDtcbiAgICBwcml2YXRlIGlzU2hvd0VuZFZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX2lzT3Zlck1hcms6IGJvb2xlYW4gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSB0dXRvcmlhbERhdGE6IElUdXRvcmlhbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIF91c2VTdGVwQ291bnQgPSAwO1xuXG4gICAgcHJpdmF0ZSBfbG9hZGluZ0NvdW50OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX2xvYWRpbmdQcm9ncmU6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIF9vdmVyQ2xpY2tDb3VudDogbnVtYmVyID0gLTE7XG5cbiAgICAvLyBwcml2YXRlIG92ZXJUdW93ZWlOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgICAgICBjYy5nYW1lLnNldEZyYW1lUmF0ZShSdW5UaW1lR2F0ZSk7XG5cbiAgICAgICAgaWYgKEFwcHMuaXNEZWJ1Zykge1xuICAgICAgICAgICAgVXRpbC5Ub29sLnNob3dEZWJ1Z1ZpZXcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgTS5pbml0KCk7XG4gICAgICAgIE0uY2hhbmdlU2NlbmUoKTtcbiAgICAgICAgdGhpcy5pbml0R2FtZSgpO1xuICAgICAgICB0aGlzLmluaXRFdmVudCgpO1xuICAgICAgICB0aGlzLmluaXRUaW1lckV2ZW50KCk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50KCk7XG4gICAgICAgIEdhbWVNb2RlbC5kZXN0b3J5KCk7XG4gICAgICAgIE0ubm9kZVBvb2wuZGVzdG9yeSgpO1xuICAgICAgICBHcm91cEFuaW1hdEN0cmwuaW5zLmRlc3RvcnkoKTtcbiAgICAgICAgUmVzQ3RybC5kZXN0b3J5KCk7XG4gICAgICAgIENvbW1vbi5DdXJyZW50Q3RybFZpZXcgPSBudWxsO1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudG91Y2hUaW1lcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVFdmVudCgpIHtcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LkdhbWVDTUQuR2FtZU92ZXIsIHRoaXMub25HYW1lT3ZlciwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5HYW1lQ01ELkdhbWVSZXN1bWUsIHRoaXMub25HYW1lUmVzdW1lLCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LkdhbWVDTUQuTW92ZUdyaWQsIHRoaXMub25Nb3ZlR3JpZCwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5HYW1lQ01ELkdhbWVSZXNldCwgdGhpcy5yZVN0YXJ0R2FtZSwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5HYW1lQ01ELk1haW5DTUQsIHRoaXMub25HYW1lVmlld1Rhc2ssIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuR2FtZUNNRC5TdG9wUHJvbXB0cywgdGhpcy5vblN0b3BQcm9tcHRzLCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LlVJLkNvbGxlY3RDb21wbGV0LCB0aGlzLm9uQ29sbGVjdENvbXBsZXQsIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuR2FtZUNNRC5TcGVDb2xsZWN0LCB0aGlzLm9uU3BlQ29sbGVjdENvbXBsZXQsIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuR2FtZUNNRC5DaGFuZ2VDZWxsLCB0aGlzLm9uQ2hhbmdlQ2VsbFR5cGUsIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuR2FtZUNNRC5TaG93R2FtZVJlc3VsdCwgdGhpcy5zaG93R2FtZU92ZXJEaWFsb2csIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuR2FtZUNNRC5VcGRhdGVDb21wbGV4VmlldywgdGhpcy5vblVwZGF0ZUNvbXBsZXhWaWV3LCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LkdhbWVDTUQuVXBkYXRlQ29sbGVjdFBvd2VyLCB0aGlzLmNvbGxlY3RQb3dlciwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5HYW1lQ01ELkdhbWVPdmVyRmFsbCwgdGhpcy5fc3RhcnRGYWxsLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRFdmVudCgpIHtcbiAgICAgICAgTS5ldmVudC5yZWdpc3RlcihFdmVudC5HYW1lQ01ELkdhbWVPdmVyLCB0aGlzLm9uR2FtZU92ZXIsIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LkdhbWVDTUQuR2FtZVJlc3VtZSwgdGhpcy5vbkdhbWVSZXN1bWUsIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LkdhbWVDTUQuTW92ZUdyaWQsIHRoaXMub25Nb3ZlR3JpZCwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuR2FtZUNNRC5HYW1lUmVzZXQsIHRoaXMucmVTdGFydEdhbWUsIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LkdhbWVDTUQuTWFpbkNNRCwgdGhpcy5vbkdhbWVWaWV3VGFzaywgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuR2FtZUNNRC5TdG9wUHJvbXB0cywgdGhpcy5vblN0b3BQcm9tcHRzLCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC5yZWdpc3RlcihFdmVudC5VSS5Db2xsZWN0Q29tcGxldCwgdGhpcy5vbkNvbGxlY3RDb21wbGV0LCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC5yZWdpc3RlcihFdmVudC5HYW1lQ01ELkNoYW5nZUNlbGwsIHRoaXMub25DaGFuZ2VDZWxsVHlwZSwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuR2FtZUNNRC5TcGVDb2xsZWN0LCB0aGlzLm9uU3BlQ29sbGVjdENvbXBsZXQsIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LkdhbWVDTUQuVXBkYXRlQ29tcGxleFZpZXcsIHRoaXMub25VcGRhdGVDb21wbGV4VmlldywgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuR2FtZUNNRC5VcGRhdGVDb2xsZWN0UG93ZXIsIHRoaXMuY29sbGVjdFBvd2VyLCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC5yZWdpc3RlcihFdmVudC5HYW1lQ01ELlNob3dHYW1lUmVzdWx0LCB0aGlzLnNob3dHYW1lT3ZlckRpYWxvZywgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuR2FtZUNNRC5HYW1lT3ZlckZhbGwsIHRoaXMuX3N0YXJ0RmFsbCwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBpbml0R2FtZSgpIHtcbiAgICAgICAgTS5ydW50aW1lLmFkZEdhbWVDb3VudCgpO1xuICAgICAgICB0aGlzLnNldFpvcmRlcigwKTtcbiAgICAgICAgdGhpcy5vdmVySGlnaHRMaWdodE5vZGUuZ2V0Q29tcG9uZW50KE92ZXJIaWdodExpZ2h0Q3RybCkuc2hvd1N0ZXBOb2RlKCk7XG5cbiAgICAgICAgdGhpcy5fdXNlU3RlcENvdW50ID0gTS5ydW50aW1lLk1hdGNoR2FtZVRpbWUgPSAwO1xuXG4gICAgICAgIC8vIE0ucnVudGltZS5Vc2VQb3JwUmVjb3JkID0gW107XG5cbiAgICAgICAgdGhpcy5faXNPdmVyTWFyayA9IG51bGw7XG4gICAgICAgIHRoaXMub3Zlck1hc2suYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX292ZXJDbGlja0NvdW50ID0gLTE7XG4gICAgICAgIHRoaXMuaXNTaG93RW5kVmlldyA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IGx2ID0gTS5ydW50aW1lLlNlbGVjdExldmVsIHx8IG51bGw7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBMZXZlbC5pbnMuZ2V0THZDZmdEYXRhKGx2KTtcbiAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LlVJLlVwZGF0ZVRtcExvYWRpbmdQcm9ncmVzcywgNjApO1xuICAgICAgICBpZiAoTmV3YmllT3B0KSB7XG4gICAgICAgICAgICB0aGlzLnR1dG9yaWFsRGF0YSA9IGF3YWl0IFR1dG9yaWFsLmlucy5nZXRUdXJDZmdEYXRhKGx2KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWRhdGEpIHJldHVybjtcbiAgICAgICAgTGV2ZWwuaW5zLnByZUxvYWROZXh0Q2ZnKGx2KTtcbiAgICAgICAgTS5ydW50aW1lLmdhbWVTdGFyKCk7XG4gICAgICAgIE0ucnVudGltZS5HYW1lU3RhdGUgPSBHYW1lU3RhdGUucHJlUmVhZHk7XG4gICAgICAgIHRoaXMudWlDdHJsID0gdGhpcy51aU5vZGUuZ2V0Q29tcG9uZW50KE1haW5VaUN0cmwpO1xuICAgICAgICB0aGlzLmVmZkN0cmwgPSB0aGlzLmVmZk5vZGUuZ2V0Q29tcG9uZW50KEVmZkxheWVyQ3RybCk7XG4gICAgICAgIHRoaXMuZ2FtZU1vZGVsID0gbmV3IEdhbWVNb2RlbChkYXRhKTtcblxuICAgICAgICBhd2FpdCBNYXRjaDNTa2luLmxvYWQoKTtcbiAgICAgICAgYXdhaXQgUmVzQ3RybC5sb2FkKCk7XG5cbiAgICAgICAgdGhpcy51aUN0cmwuaW5pdCh0aGlzLCBkYXRhKTtcblxuICAgICAgICB0aGlzLmluaXRCZygpO1xuICAgICAgICB0aGlzLmluaXRNYXBHcmlkVmlldygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0Wm9yZGVyKGluZGV4OiBudW1iZXIgPSAwKSB7XG4gICAgICAgIGlmIChpbmRleCA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMDtcbiAgICAgICAgICAgIHRoaXMudWlOb2RlLnpJbmRleCA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMTtcbiAgICAgICAgICAgIHRoaXMudWlOb2RlLnpJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgaWYgKFVJTWdyLmlucy5pc1Nob3dpbmcoVUlIdWREZWYuR2FtZUxvYWRpbmcpKSB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgVUlNZ3IuaW5zLmNsb3NlVUkoVUlIdWREZWYuR2FtZUxvYWRpbmcsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RhcmdldFZpZXcoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dUYXJnZXRWaWV3KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlU3RhcnRHYW1lKCkge1xuICAgICAgICB0aGlzLnJlbW92ZUN1cnJlbnRHYW1lKCk7XG4gICAgICAgIHRoaXMuaW5pdEdhbWUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUN1cnJlbnRHYW1lKCkge1xuICAgICAgICBHYW1lTW9kZWwuZGVzdG9yeSgpO1xuICAgICAgICBHcm91cEFuaW1hdEN0cmwuaW5zLmRlc3RvcnkoKTtcbiAgICAgICAgQ29tbW9uLkN1cnJlbnRDdHJsVmlldyA9IG51bGw7XG4gICAgICAgIHRoaXMuZ2FtZU1vZGVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5tYXNrTm9kZS5kZXN0cm95QWxsQ2hpbGRyZW4oKTsgLy8gcmVtb3ZlQWxsQ2hpbGRyZW5cbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dUYXJnZXRWaWV3KCkge1xuICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuU291bmQuUGxheUJHTSwgQXVkaW9JRC5CR00yKTtcbiAgICAgICAgdGhpcy51aUN0cmwuc2hvd1RhcmdldERpYWxvZyh0aGlzLnByZVN0YXJ0U2hvd0dyaWQuYmluZCh0aGlzKSk7XG4gICAgICAgIEd1aWRlVXRpbHMub25NYXRjaDNCZWdpbihNLnJ1bnRpbWUuU2VsZWN0TGV2ZWwgfHwgTS5ydW50aW1lLkN1ckxldmVsKTtcbiAgICB9XG5cbiAgICAvKiog5byA5ZCv6Kem5Y+R5ZmoICovXG4gICAgcHJpdmF0ZSBpbml0VGltZXJFdmVudCgpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdhbWVNb2RlbCAmJiB0aGlzLmdhbWVNb2RlbC50aW1lclRyaWdnZXIoKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tTaG93R2FtZU92ZXIoKTtcbiAgICAgICAgICAgIE0ucnVudGltZS5NYXRjaEdhbWVUaW1lKys7XG4gICAgICAgIH0sIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSLCAxKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0N1cnJlbnRNZW1vcnkoKSB7XG4gICAgICAgIGxldCBkZXBzID0gY2MubG9hZGVyLmdldERlcGVuZHNSZWN1cnNpdmVseSh0aGlzLm5vZGUpO1xuICAgICAgICBjb25zb2xlLmVycm9yKCdtOicsIGRlcHMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgaW5pdEJnKCkge1xuICAgICAgICBjb25zdCBsdkRhdGEgPSB0aGlzLmdhbWVNb2RlbC5nZXRMdkRhdGEoKTtcbiAgICAgICAgY29uc3QgYmdJbmRleCA9IE0ucnVudGltZS5DdXJCZ0luZGV4ID0gbHZEYXRhLmxldmVsSW5mby5iYWNrZ3JvdW5kIHx8IDE7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRCZ0luZGV4ICE9IGJnSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEJnSW5kZXggPSBiZ0luZGV4O1xuICAgICAgICAgICAgLy/np7vpmaTogIHml6fog4zmma/kuI7mlYjmnpwhXG4gICAgICAgICAgICB0aGlzLmJnLm5vZGUuZGVzdHJveUFsbENoaWxkcmVuKCk7XG4gICAgICAgICAgICB0aGlzLmJnLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKCdiYmcnKS5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIGNjLmZpbmQoJ3RvcC9BdXRvX3JlY29yZC9jb2xsZWN0Tm9kZS9yb2xlJywgdGhpcy51aU5vZGUpLmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xuXG4gICAgICAgICAgICBjb25zdCBiZ0luZm8gPSBDb21tb24uZ2V0QmdJbmZvKGJnSW5kZXgpXG4gICAgICAgICAgICB0aGlzLmdyb3VuZFR5cGUgPSBiZ0luZm8udHlwZTtcblxuICAgICAgICAgICAgaWYgKCFiZ0luZm8uaXNXYXRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuYmcubm9kZS5yZW1vdmVDb21wb25lbnQoU2hhZGVySGVscGVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJnLm5vZGUucmVtb3ZlQ29tcG9uZW50KFNoYWRlclRpbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB0YXNrID0gW107XG5cbiAgICAgICAgICAgIHRhc2sucHVzaChDb21tb24uZ2V0UmVzKGAke1BhdGhzLk1hdGNoM0JnfSR7YmdJbmRleH0vJHtiZ0luZm8ubmFtZX1gLCBjYy5TcHJpdGVGcmFtZSkpO1xuICAgICAgICAgICAgdGFzay5wdXNoKENvbW1vbi5nZXRSZXMoYCR7UGF0aHMuTWF0Y2gzQmd9JHtiZ0luZGV4fS8ke2JnSW5mby5jZmd9YCwgY2MuSnNvbkFzc2V0KSk7XG5cbiAgICAgICAgICAgIFByb21pc2UuYWxsKHRhc2spLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5iZy5zcHJpdGVGcmFtZSA9IGRhdGFbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgY2ZnID0gZGF0YVsxXTtcbiAgICAgICAgICAgICAgICBpZiAoY2ZnICYmIGNmZy5qc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQmdUb3BBbGlnbihjZmcuanNvbi50b3ApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0MSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWI6IEFycmF5PGFueT4gPSBjZmcuanNvbi5zdWI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBzdWIubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdDEucHVzaCh0aGlzLmFkZEl0ZW0yQmcoc3ViW2ldKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHh1OiBBcnJheTxhbnk+ID0gY2ZnLmpzb24udGV4dHVyZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR4dSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHR4dS5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0MS5wdXNoKHRoaXMuZmlsbEl0ZW1UZXh0dXJlKHR4dVtpXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRpbmdDb3VudCA9IHQxLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwodDEpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+WFqOmDqOWKoOi9veWujOaIkCEhISEnLCByZXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZFVwZGF0ZUxvYWRpbmdFdmVudCgxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0R2FtZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaWxsSXRlbVRleHR1cmUodGV4dHVyZUNmZzogeyBwYXRoOiBzdHJpbmcsIHBhcmVudDogc3RyaW5nIH0pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBpZiAodGV4dHVyZUNmZykge1xuICAgICAgICAgICAgY29uc3QgcGF0aCA9IGAke1BhdGhzLk1hdGNoM0JnfSR7dGhpcy5jdXJyZW50QmdJbmRleH0vJHt0ZXh0dXJlQ2ZnLnBhdGh9YDtcbiAgICAgICAgICAgIHJldHVybiBDb21tb24uZ2V0UmVzPGNjLlNwcml0ZUZyYW1lPihwYXRoLCBjYy5TcHJpdGVGcmFtZSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZTogY2MuTm9kZSA9IGNjLmZpbmQoYENhbnZhcy8ke3RleHR1cmVDZmcucGFyZW50fWApO1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRVcGRhdGVMb2FkaW5nRXZlbnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRJdGVtMkJnKGl0ZW1DZmc6IHsgcGF0aDogc3RyaW5nLCBwYXJlbnQ6IHN0cmluZywgejogbnVtYmVyLCB0eXBlOiBzdHJpbmcsIGFuY2hvcj86IEFycmF5PG51bWJlcj4sIHBvcz86IEFycmF5PG51bWJlcj4sIHRvcD86IG51bWJlciB9KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgaWYgKGl0ZW1DZmcpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBgJHtQYXRocy5NYXRjaDNCZ30ke3RoaXMuY3VycmVudEJnSW5kZXh9LyR7aXRlbUNmZy5wYXRofWA7XG4gICAgICAgICAgICBsZXQgdHlwZSA9IG51bGw7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW1DZmcudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Nwcml0ZSc6IHR5cGUgPSBjYy5TcHJpdGVGcmFtZTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncHJlZmFiJzogdHlwZSA9IGNjLlByZWZhYjsgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gQ29tbW9uLmdldFJlcyhwYXRoLCB0eXBlKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoaXRlbUNmZy50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzcHJpdGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBNLm5vZGVQb29sLmNyZWF0ZUl0ZW0obnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ByaXRlID0gbm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSByZXMgYXMgY2MuU3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwcmVmYWInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSBNLm5vZGVQb29sLmNyZWF0ZUl0ZW0ocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBjYy5maW5kKGBDYW52YXMvJHtpdGVtQ2ZnLnBhcmVudH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQ2ZnLnBvcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oaXRlbUNmZy5wb3NbMF0sIGl0ZW1DZmcucG9zWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpcnMgPSBbJ3RvcCcsICdsZWZ0JywgJ3JpZ2h0JywgJ2JvdHRvbSddO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlycy5mb3JFYWNoKGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQ2ZnW2RdICE9IG51bGwgJiYgaXRlbUNmZ1tkXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKENvbW1vbi5zZXRBbGlnbm1lbnQobm9kZSwgZCwgaXRlbUNmZ1tkXSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmMgPSBpdGVtQ2ZnLmFuY2hvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNldEFuY2hvclBvaW50KGFuY1swXSwgYW5jWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHogPSBpdGVtQ2ZnLno7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeiAhPSBudWxsICYmIHogIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS56SW5kZXggPSB6O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZFVwZGF0ZUxvYWRpbmdFdmVudCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNlbmRVcGRhdGVMb2FkaW5nRXZlbnQoemR0YXJnZXQ6IG51bWJlciA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fbG9hZGluZ1Byb2dyZSsrO1xuICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuVUkuVXBkYXRlVG1wTG9hZGluZ1Byb2dyZXNzLCB6ZHRhcmdldCB8fCBNYXRoLmNlaWwoKDYwICsgKHRoaXMuX2xvYWRpbmdQcm9ncmUgLyB0aGlzLl9sb2FkaW5nQ291bnQpICogNjApKSlcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUJnVG9wQWxpZ24odG9wOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgbHZMYWJQb3MgPSB0aGlzLnVpQ3RybCAmJiB0aGlzLnVpQ3RybC5nZXRMZXZlbExhYmVsUG9zID8gdGhpcy51aUN0cmwuZ2V0TGV2ZWxMYWJlbFBvcygpIDogbnVsbDtcbiAgICAgICAgLy/moLnmja7kuIrpg6jlhbPljaHoioLngrnmnaXnoa7orqTlgY/np7vph49cbiAgICAgICAgbGV0IHRvcEdhcCA9IDA7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRCZ0luZGV4ID09IDEgJiYgbHZMYWJQb3MpIHtcbiAgICAgICAgICAgIHRvcEdhcCA9IChjYy53aW5TaXplLmhlaWdodCAtIGx2TGFiUG9zLnkpIC0gMzA3O1xuICAgICAgICB9XG4gICAgICAgIENvbW1vbi5zZXRBbGlnbm1lbnQodGhpcy5iZy5ub2RlLCAndG9wJywgdG9wICsgdG9wR2FwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU3BlQ29sbGVjdENvbXBsZXQoY206IENlbGxNb2RlbCkge1xuICAgICAgICBjb25zdCB0eXBlID0gY20uZ2V0VHlwZSgpO1xuICAgICAgICBjb25zdCBwb3MgPSBjbS5nZXRQb3NpdGlvbigpO1xuICAgICAgICBpZiAodHlwZSA9PSBDZWxsVHlwZS5CYW5hbmEpIHtcbiAgICAgICAgICAgIGNvbnN0IHRyZWUgPSB0aGlzLmdyb3VuZFZpZXdDdHJsLmdldFJhbmRNb25rZXlUcmVlKCk7XG4gICAgICAgICAgICBpZiAodHJlZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFBvczogY2MuVmVjMiA9IENvbW1vbi5nZXRXb3JsZFBvcyh0cmVlLmRhdGEudHJlZS5ub2RlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvZmZzZXQgPSBjYy52Mig1MCwgNTApO1xuICAgICAgICAgICAgICAgIHRoaXMuYmFzaWNDZWxsVmlld0N0cmwucGxheUNvbGxlY3RBbmkodGhpcy51aU5vZGUsIHR5cGUsIHBvcywgdGFyZ2V0UG9zLmFkZChvZmZzZXQpLCBudWxsLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdW5kVmlld0N0cmwubW9ua2V5VHJlZUV4cFVwKHRoaXMudWlOb2RlLCB0cmVlLmluZGV4KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IENlbGxUeXBlLkJvdHRsZUNhcHMpIHtcbiAgICAgICAgICAgIHRoaXMuYmFzaWNDZWxsVmlld0N0cmwucGxheUNvbGxlY3RTdGVwQW5pKHRoaXMudWlDdHJsLCBjbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29sbGVjdENvbXBsZXQodHlwZTogQ2VsbFR5cGUgfCBzdHJpbmcsIGluZGV4PzogbnVtYmVyLCBlbGltYXRlVHlwZT86IEVsaW1hdGVUeXBlKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldFBvcyA9IHRoaXMuZ2FtZU1vZGVsLkNvbGxlY3RQb3MgfHwgdGhpcy51aUN0cmwuZ2V0Q29sbGVjdFBvcyh0eXBlKTtcbiAgICAgICAgbGV0IGlzQ2FuQ29sbGVjdCA9IHRydWU7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBDb2xsZWN0VHlwZS5nbm9tZTpcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VuZFZpZXdDdHJsLnBsYXlHbm9tZUFuaSh0aGlzLnVpTm9kZSwgaW5kZXgsIHRhcmdldFBvcyk7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgQ29sbGVjdFR5cGUuYm94OlxuICAgICAgICAgICAgICAgIHRoaXMudXBHcm91bmRWaWV3Q3RybC5wbGF5Q29sbGVjdEFuaUJ5VHlwZSh0aGlzLnVpTm9kZSwgPGFueT5pbmRleCwgdGFyZ2V0UG9zLCBDb2xsZWN0VHlwZS5ib3gpO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIENvbGxlY3RUeXBlLmNvbG9yYm94OlxuICAgICAgICAgICAgICAgIHRoaXMudXBHcm91bmRWaWV3Q3RybC5wbGF5Q29sbGVjdEFuaUJ5VHlwZSh0aGlzLnVpTm9kZSwgPGFueT5pbmRleCwgdGFyZ2V0UG9zLCBDb2xsZWN0VHlwZS5jb2xvcmJveCk7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgQ29sbGVjdFR5cGUuZ2VtOlxuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdW5kVmlld0N0cmwucGxheUdlbUFuaSh0aGlzLnVpTm9kZSwgPGFueT5pbmRleCwgdGFyZ2V0UG9zKTtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBDb2xsZWN0VHlwZS5maXJlZmx5OlxuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdW5kVmlld0N0cmwucGxheUZpcmVmbHlBbmkodGhpcy51aU5vZGUsIDxhbnk+aW5kZXgsIHRhcmdldFBvcyk7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgQ29sbGVjdFR5cGUudHVydGxlczpcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VuZFZpZXdDdHJsLnBsYXlUdXJ0bGVzQW5pKHRoaXMudWlOb2RlLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgQ29sbGVjdFR5cGUuY3JhYjpcbiAgICAgICAgICAgICAgICB0aGlzLmdyb3VuZFZpZXdDdHJsLnBsYXlDcmFiQW5pKHRoaXMudWlOb2RlLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgQ2VsbFR5cGUuQ29uY2g6XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign5pS26ZuG5pS26ZuG5pS26ZuG5pS26ZuG5pS26ZuG6LSd5aOzJyk7XG4gICAgICAgICAgICAgICAgaXNDYW5Db2xsZWN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlzQ2FuQ29sbGVjdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuYmFzaWNDZWxsVmlld0N0cmwucGxheUNvbGxlY3RBbmkodGhpcy51aU5vZGUsIDxhbnk+dHlwZSwgPGFueT5pbmRleCwgdGFyZ2V0UG9zLCBlbGltYXRlVHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQ2FuQ29sbGVjdCkge1xuICAgICAgICAgICAgTS5ydW50aW1lLmFkZENvbGxlY3RDb3VudCh0eXBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuWQjOatpeW9k+WJjeaji+ebmOeKtuaAgSEgKi9cbiAgICBwdWJsaWMgc3luY0dyaWRCb2FyZCgpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmdhbWVNb2RlbC5tYXBJbmRleDtcbiAgICAgICAgY29uc3QgY2QgPSB0aGlzLmdyaWRDdHJsUG9vbC5nZXQoaW5kZXgpXG4gICAgICAgIENvbW1vbi5DdXJyZW50Q3RybFZpZXcgPSB0aGlzLmN1cnJlbnRDdHJsVmlldyA9IHRoaXMuZ3JpZFZpZXdQb29sLmdldChpbmRleCk7XG4gICAgICAgIGlmIChjZCkge1xuICAgICAgICAgICAgdGhpcy5ncm91bmRWaWV3Q3RybCA9IGNkLmdjO1xuICAgICAgICAgICAgdGhpcy5iYXNpY0NlbGxWaWV3Q3RybCA9IGNkLm1jO1xuICAgICAgICAgICAgdGhpcy51cEdyb3VuZFZpZXdDdHJsID0gY2QudWdjO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ3JpZFZpZXdQb29sLmZvckVhY2goKGl0ZW0sIGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSAhPSBpbmRleCkge1xuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0TWFwR3JpZFZpZXcoKSB7XG4gICAgICAgIGNvbnN0IG1hcHMgPSB0aGlzLmdhbWVNb2RlbC5nZXRNYXBzKCk7XG4gICAgICAgIHRoaXMuZ3JpZEN0cmxQb29sID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmdyaWRWaWV3UG9vbCA9IG5ldyBNYXAoKTtcbiAgICAgICAgY29uc3QgZ3JpZEJvYXJkUHJlZmFiID0gTWF0Y2gzU2tpbi5yZXF1aXJlUHJlZmFiKFwiZ3JpZEJvYXJkXCIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ2FtZU1vZGVsLm1hcENvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGdyaWRDdHJsVmlldyA9IGNjLmluc3RhbnRpYXRlKGdyaWRCb2FyZFByZWZhYik7XG4gICAgICAgICAgICBjb25zdCBncmlkRGF0YSA9IG1hcHNbaV07XG4gICAgICAgICAgICBjb25zdCBnYyA9IHRoaXMuaW5pdEdyb3VuZChncmlkQ3RybFZpZXcsIGdyaWREYXRhKTtcbiAgICAgICAgICAgIGNvbnN0IG1jID0gdGhpcy5pbml0TWFpbkxheWVyKGdyaWRDdHJsVmlldywgZ3JpZERhdGEpO1xuICAgICAgICAgICAgY29uc3QgdWdjID0gdGhpcy5pbml0VXBHcm91bmQoZ3JpZEN0cmxWaWV3LCBncmlkRGF0YSk7XG4gICAgICAgICAgICB0aGlzLmdyaWRDdHJsUG9vbC5zZXQoaSwgeyBnYywgbWMsIHVnYyB9KVxuICAgICAgICAgICAgdGhpcy5ncmlkVmlld1Bvb2wuc2V0KGksIGdyaWRDdHJsVmlldyk7XG4gICAgICAgICAgICB0aGlzLnNldEdpcmRWaWV3U2l6ZShncmlkQ3RybFZpZXcsIGkpO1xuICAgICAgICAgICAgZ3JpZEN0cmxWaWV3LnBhcmVudCA9IHRoaXMubWFza05vZGU7XG4gICAgICAgICAgICBncmlkQ3RybFZpZXcueCA9IGkgKiBjYy53aW5TaXplLndpZHRoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRHaXJkVmlld1NpemUodmlldzogY2MuTm9kZSwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBjb25zdCB0b3BQb3MgPSB0aGlzLmdhbWVNb2RlbC5nZXRUb3BQb3NpdGlvbihpbmRleCk7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRvcFBvcy55ICogMiArIENvbW1vbi5HUklEX0g7XG4gICAgICAgIGlmIChoZWlnaHQgPiB0aGlzLm1hc2tOb2RlLmhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lTW9kZWwuc2V0TG9uZ0hlaWdodCh0cnVlKTtcbiAgICAgICAgICAgIHZpZXcuc2V0Q29udGVudFNpemUodGhpcy5ub2RlLndpZHRoLCBoZWlnaHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnYW1lUmVhZHlPSygpIHtcbiAgICAgICAgdGhpcy5zeW5jR3JpZEJvYXJkKCk7XG4gICAgICAgIE0ucnVudGltZS5HYW1lU3RhdGUgPSBHYW1lU3RhdGUuTm9ybWFsO1xuICAgICAgICBMb2cudygn5YeG5aSH5a6M5q+VLOW8gOWQr+inpuaRuCEnKTtcbiAgICAgICAgLy/lvIDlsYDmo4DmtYvkuIDmrKEhXG4gICAgICAgIHRoaXMuZ2FtZU1vZGVsLm9wZW5BdXRvQ2hlY2tPcHQoKTtcbiAgICAgICAgdGhpcy5jaGVja1VzZVByb3AoKTtcbiAgICAgICAgdGhpcy5pbml0VG91Y2goKTtcbiAgICAgICAgdGhpcy5jaGVja1R1dG9yaWFsKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk1vdmVHcmlkKHRhcmdldDogbnVtYmVyLCB0eXBlOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgY2hlY2tJc05vRmFsbCA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5nYW1lTW9kZWwuaXNGYWxsaW5nKSB7XG4gICAgICAgICAgICAgICAgTG9nLmkoJ+W8gOWni+ajgOa1i+aji+ebmOenu+WKqCEnKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIE0ucnVudGltZS5HYW1lU3RhdGUgPSBHYW1lU3RhdGUucHJlUmVhZHk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUNyb3NzKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlUm93KHRoaXMuZ3JvdW5kVmlld0N0cmwuY2hlY2tDb2xsZWN0TW92ZURpc3RhbmNlKHRoaXMuY3VycmVudEN0cmxWaWV3LCB0aGlzLm1hc2tOb2RlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZShjaGVja0lzTm9GYWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNjaGVkdWxlKGNoZWNrSXNOb0ZhbGwsIDEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21vdmVSb3dMb2NrID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBtb3ZlUm93KGRpc3RhbmNlOiBudW1iZXIpIHtcbiAgICAgICAgLy/mo4DmtYvmmK/lkKblpJ/plb/luqYgXG4gICAgICAgIGlmIChkaXN0YW5jZSAhPSAwICYmICF0aGlzLl9tb3ZlUm93TG9jaykge1xuICAgICAgICAgICAgdGhpcy5fbW92ZVJvd0xvY2sgPSB0cnVlO1xuICAgICAgICAgICAgTS5ydW50aW1lLkdhbWVTdGF0ZSA9IEdhbWVTdGF0ZS5wcmVSZWFkeTtcbiAgICAgICAgICAgIEFjdGlvbkN0cmwuaW5zLnJ1bk1vdmVSb3codGhpcy5jdXJyZW50Q3RybFZpZXcsIGRpc3RhbmNlKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlUm93TG9jayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIE0ucnVudGltZS5HYW1lU3RhdGUgPSBHYW1lU3RhdGUuTm9ybWFsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9tb3ZlQ3Jvc3NMb2NrID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBtb3ZlQ3Jvc3MobmV4dEluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9tb3ZlQ3Jvc3NMb2NrKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlQ3Jvc3NMb2NrID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmdyaWRWaWV3UG9vbC5zaXplID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdmVDcm9zc0xvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRWaWV3UG9vbC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIEFjdGlvbkN0cmwuaW5zLnJ1bk1vdmVDcm9zcyh2YWx1ZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfnp7vliqjnu5PmnZ8hIScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgTS5ydW50aW1lLkdhbWVTdGF0ZSA9IEdhbWVTdGF0ZS5Ob3JtYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVNb2RlbC5jaGFuZ2VNYXAobmV4dEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY0dyaWRCb2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW92ZUNyb3NzTG9jayA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5byA5aeL5ri45oiP5YmN5bGV56S65qOL55uYLOS4jeaUr+aMgeWQjOaXtuWxleekuuaoquWQkeS4jue6teWQkSAqL1xuICAgIHByaXZhdGUgcHJlU3RhcnRTaG93R3JpZCgpIHtcbiAgICAgICAgLy/lpoLmnpzmnInlpJrkuKrlsY/luZUs5oiW6ICF5b2T5YmN5YWz5Y2h6ZW/5bqm6LaF6L+H6K6+5a6a6ZW/5bqmXG4gICAgICAgIGNvbnN0IGdyaWRWaWV3ID0gdGhpcy5ncmlkVmlld1Bvb2wuZ2V0KHRoaXMuZ2FtZU1vZGVsLm1hcEluZGV4KTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZU1vZGVsLm1hcENvdW50ID4gMSkge1xuICAgICAgICAgICAgLy/lsZXnpLrmiYDmnInnmoTlnLDlm75cbiAgICAgICAgICAgIHRoaXMubWFza05vZGUucmVtb3ZlQ29tcG9uZW50KGNjLk1hc2spO1xuICAgICAgICAgICAgdGhpcy5wbGF5U2hvd0Nyb3NzKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZ3JpZFZpZXcuaGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5wbGF5U2hvd1JvdyhncmlkVmlldyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVSZWFkeU9LKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBsYXlTaG93Um93KGdyaWRWaWV3KSB7XG4gICAgICAgIEFjdGlvbkN0cmwuaW5zLnJ1blNob3dSb3coZ3JpZFZpZXcsIHRoaXMubWFza05vZGUuaGVpZ2h0KS50aGVuKHRoaXMuZ2FtZVJlYWR5T0suYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwbGF5U2hvd0Nyb3NzKCkge1xuICAgICAgICBBY3Rpb25DdHJsLmlucy5ydW5TaG93Q3Jvc3ModGhpcy5ub2RlLCB0aGlzLmdyaWRWaWV3UG9vbCkudGhlbih0aGlzLmdhbWVSZWFkeU9LLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEdyb3VuZChub2RlOiBjYy5Ob2RlLCBkYXRhOiBJR3JpZERhdGEpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2dyb3VuZCcpXG4gICAgICAgIGNvbnN0IGdDdHJsID0gbm9kZS5nZXRDb21wb25lbnQoR3JvdW5kVmlld0N0cmwpO1xuICAgICAgICBnQ3RybC5pbml0VmlldyhkYXRhLmdtLmdldEdyb3VwQ2VsbExpc3QoKSwgZGF0YSwgdGhpcy5nYW1lTW9kZWwuZ2V0THZEYXRhKCksIHRoaXMuZ3JvdW5kVHlwZSk7XG4gICAgICAgIHJldHVybiBnQ3RybDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRNYWluTGF5ZXIobm9kZTogY2MuTm9kZSwgZGF0YTogSUdyaWREYXRhKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLmdldENoaWxkQnlOYW1lKCdtYWluTGF5ZXInKVxuICAgICAgICBjb25zdCBtQ3RybCA9IG5vZGUuZ2V0Q29tcG9uZW50KEJhc2ljQ2VsbFZpZXdDdHJsKTtcbiAgICAgICAgbUN0cmwuaW5pdFZpZXcoZGF0YS5jZWxsTGlzdCk7XG4gICAgICAgIHJldHVybiBtQ3RybDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRVcEdyb3VuZChub2RlOiBjYy5Ob2RlLCBkYXRhOiBJR3JpZERhdGEpIHtcbiAgICAgICAgbm9kZSA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3VwR3JvdW5kJylcbiAgICAgICAgY29uc3QgdWdDdHJsID0gbm9kZS5nZXRDb21wb25lbnQoVXBHcm91bmRWaWV3Q3RybCk7XG4gICAgICAgIHVnQ3RybC5pbml0VmlldyhkYXRhLnVnbS5nZXRVR3JvdXBDZWxsTGlzdCgpKTtcbiAgICAgICAgcmV0dXJuIHVnQ3RybDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRUb3VjaCgpIHtcbiAgICAgICAgY29uc3QgY3VyTWFwVmlldyA9IHRoaXMuZ3JpZFZpZXdQb29sLmdldCh0aGlzLmdhbWVNb2RlbC5tYXBJbmRleCk7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy5ub2RlO1xuICAgICAgICBpZiAoY3VyTWFwVmlldy5oZWlnaHQgPiAwKSBub2RlID0gY3VyTWFwVmlldztcbiAgICAgICAgbm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vblRvdWNoU3RhcnQsIHRoaXMpO1xuICAgICAgICBub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzKTtcbiAgICAgICAgbm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLm9uVG91Y2hNb3ZlLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uVG91Y2hTdGFydChldmVudCkge1xuICAgICAgICB0aGlzLnRvdWNoU3RhcnRQb3MgPSBldmVudC50b3VjaC5nZXRMb2NhdGlvbigpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblRvdWNoTW92ZShldmVudCkge1xuICAgICAgICB0aGlzLmNoZWNrTW92ZUNlbGwoZXZlbnQudG91Y2guZ2V0TG9jYXRpb24oKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIC8v5Yqg5LiK5pON5L2c5Yy65Z+f56e75Yqo5ZCO55qE5YGP56e76YePLOS/ruato+inpuaRuOWdkOagh+WPluaji+ebmOWdkOaghyEgIFxuICAgICAgICBsZXQgcG9zID0gdGhpcy5jdXJyZW50Q3RybFZpZXcuY29udmVydFRvTm9kZVNwYWNlQVIoZXZlbnQudG91Y2guZ2V0TG9jYXRpb24oKSk7XG5cbiAgICAgICAgdGhpcy5fb3ZlckNsaWNrKGV2ZW50LnRvdWNoLmdldExvY2F0aW9uKCkpO1xuXG4gICAgICAgIGlmIChNLnJ1bnRpbWUuR2FtZVN0YXRlICE9IEdhbWVTdGF0ZS5Ob3JtYWwpIHJldHVybjtcblxuICAgICAgICB0aGlzLnRvdWNoTG9jayA9IGZhbHNlO1xuXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRvdWNoVGltZXIpO1xuICAgICAgICB0aGlzLnRvdWNoQ291bnQrKztcbiAgICAgICAgaWYgKHRoaXMudG91Y2hDb3VudCA+PSAyKSB7XG4gICAgICAgICAgICB0aGlzLnRvdWNoQ291bnQgPSAwO1xuICAgICAgICAgICAgdGhpcy5kb3VibGVDbGljayhwb3MpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudG91Y2hUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50b3VjaENvdW50ID0gMDtcbiAgICAgICAgICAgIHRoaXMudG91Y2hPcGVuR01QYW5lbENvdW50ID0gMDtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgaWYgKCFldmVudCB8fCAoZXZlbnQgJiYgIWV2ZW50LmlzdHV0b3JpYWwpKSB7XG4gICAgICAgICAgICB0aGlzLmNsaWNrKHBvcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNsaWNrKGN1clBvczogY2MuVmVjMikge1xuICAgICAgICB0aGlzLmdhbWVNb2RlbC5vbkNsaWNrKGN1clBvcywgdHJ1ZSk7XG5cbiAgICAgICAgLy8gY29uc3QgbW9kZWwgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuR3JvdW5kTGlzdCwgQ29tbW9uLmNvbnZldFBvcyhjdXJQb3MpKTtcbiAgICAgICAgLy8gbW9kZWwuY2xlYW5Hcm91bmQoKTtcbiAgICAgICAgLy8gdGhpcy5ncm91bmRWaWV3Q3RybC51cGRhdGVDb21sZXhJdGVhbUJ5UG9zKENvbW1vbi5jb252ZXRQb3MoY3VyUG9zKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkb3VibGVDbGljayhjdXJQb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgdGhpcy5nYW1lTW9kZWwub25Eb3VibGVDbGljayhDb21tb24uY29udmV0UG9zKGN1clBvcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tNb3ZlQ2VsbChjdXJQb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgaWYgKHRoaXMudG91Y2hMb2NrIHx8IE0ucnVudGltZS5HYW1lU3RhdGUgIT0gR2FtZVN0YXRlLk5vcm1hbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNwID0gY3VyUG9zLnN1Yih0aGlzLnRvdWNoU3RhcnRQb3MpO1xuICAgICAgICBpZiAoTWF0aC5hYnMoc3AueCkgPiBDb21tb24uR1JJRF9XIC8gMyB8fCBNYXRoLmFicyhzcC55KSA+IENvbW1vbi5HUklEX0ggLyAzKSB7XG4gICAgICAgICAgICBsZXQgZGlyID0gY2MudjIoMCwgMCk7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoc3AueCkgPiBNYXRoLmFicyhzcC55KSkge1xuICAgICAgICAgICAgICAgIGRpci54ID0gc3AueCA+IDAgPyAxIDogLTE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpci55ID0gc3AueSA+IDAgPyAtMSA6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcG9zID0gdGhpcy5jdXJyZW50Q3RybFZpZXcuY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy50b3VjaFN0YXJ0UG9zKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZU1vZGVsLnRvdWNoTW92ZShDb21tb24uY29udmV0UG9zKHBvcyksIGRpcik7XG4gICAgICAgICAgICB0aGlzLnRvdWNoTG9jayA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2FtZVZpZXdUYXNrKHRhc2s6IEdhbWVUYXNrTW9kZWwpIHtcbiAgICAgICAgc3dpdGNoICh0YXNrLmFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBFdmVudC5HYW1lQ01ELkVsaW1hdGU6XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjRWxpbWF0ZSh0YXNrKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnQuR2FtZUNNRC5FeGNoYW5nZTpcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWNFeGNoYW5nZSh0YXNrKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRXZlbnQuR2FtZUNNRC5BZGROZXdDZWxsOlxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY0FkZE5ld0NlbGwodGFzayk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEV2ZW50LkdhbWVDTUQuUHJvbXB0Q2FuRWxpbWF0ZTpcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWNUaXNBbmltYXRpb24odGFzayk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdGVzdEdhbWVPdmVyKCkge1xuICAgICAgICAvLyB0aGlzLm9uR2FtZU92ZXIodHJ1ZSk7XFxcbiAgICAgICAgdGhpcy5yZVN0YXJ0R2FtZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25HYW1lUmVzdW1lKCkge1xuICAgICAgICBpZiAodGhpcy5faXNPdmVyTWFyayAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm9uR2FtZU92ZXIodGhpcy5faXNPdmVyTWFyayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIG9uR2FtZU92ZXIocmVzdWx0OiBib29sZWFuKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ+a4uOaIj+e7k+adnycsIHJlc3VsdCk7XG4gICAgICAgIGlmIChNLnJ1bnRpbWUuR2FtZVN0YXRlID09IEdhbWVTdGF0ZS5Ob3JtYWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3VzZVN0ZXBDb3VudCA9ICh0aGlzLmdhbWVNb2RlbC5zdGVwQ291bnQgLSB0aGlzLmdhbWVNb2RlbC5zdGVwTGltaXQpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIC8v6K6+572u5LiN5LiN5Y+v5pON5L2cXG4gICAgICAgICAgICAgICAgTS5ydW50aW1lLkdhbWVTdGF0ZSA9IEdhbWVTdGF0ZS5XaW47XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5zaG93R2FtZU92ZXJEaWFsb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVPdmVyU3RhcnRCb21iKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIE0ucnVudGltZS5HYW1lU3RhdGUgPSBHYW1lU3RhdGUuRmFpbDtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dHYW1lT3ZlckRpYWxvZyhyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faXNPdmVyTWFyayA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zdGFydE92ZXJDbGljaygpIHtcbiAgICAgICAgTS5ydW50aW1lLkdhbWVTdGF0ZSA9IEdhbWVTdGF0ZS5FbmQ7XG4gICAgICAgIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuT3ZlclNob3csIHsgdHlwZTogVUlIdWREZWYuT3ZlclNob3cgfSwgbnVsbCwgKCkgPT4ge1xuICAgICAgICAgICAgLy/pq5jkuq7mo4vnm5jkuI7mraXmlbAh5byA5ZCv6buR6Imy6YGu572pflxuICAgICAgICAgICAgdGhpcy5zZXRab3JkZXIoMSk7XG4gICAgICAgICAgICB0aGlzLm92ZXJNYXNrLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm92ZXJIaWdodExpZ2h0Tm9kZS5nZXRDb21wb25lbnQoT3ZlckhpZ2h0TGlnaHRDdHJsKS5zaG93Q291bnREb3duKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuT3ZlclNob3csIHsgdHlwZTogVUlIdWREZWYuT3ZlclNob3cgfSwgbnVsbCwgKCkgPT4ge1xuICAgICAgICAvLyAgICAgLy/lvIDlkK/mmL7npLrmlYjmnpwuLi7lvIDlkK/ngrnmtoggXG4gICAgICAgIC8vICAgICBpZiAodGhpcy5nYW1lTW9kZWwuc3RlcExpbWl0ID4gMCkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX292ZXJDbGlja0NvdW50ID0gdGhpcy5nYW1lTW9kZWwuc3RlcExpbWl0O1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2V0Wm9yZGVyKDEpO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMub3Zlck1hc2suYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICBNLnJ1bnRpbWUuT3ZlclN0ZXBDb3VudCA9IDA7XG4gICAgICAgIC8vICAgICAgICAgTS50aXBzLnNob3coJ+ivt+eCueWHu+aji+ebmCzov5vooYznlq/ni4LnmoTmtojpmaTlkKchJywgMSlcbiAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zaG93R2FtZU92ZXJEaWFsb2codHJ1ZSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX292ZXJDbGljayhwb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgdGhpcy5nYW1lTW9kZWwub25DbGljayhwb3MsIGZhbHNlKVxuXG4gICAgICAgIC8vIGlmICh0aGlzLl9vdmVyQ2xpY2tDb3VudCAhPSAtMSkge1xuICAgICAgICAvLyAgICAgaWYgKHRoaXMuZ2FtZU1vZGVsLnN0ZXBMaW1pdCA+IDApIHtcbiAgICAgICAgLy8gICAgICAgICBjb25zdCBwb3MgPSBDb21tb24uY29udmV0UG9zKHBvc2l0aW9uKTtcbiAgICAgICAgLy8gICAgICAgICBjb25zdCBjZWxsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZSh0aGlzLmdhbWVNb2RlbC5DZWxsTGlzdCwgcG9zKTtcbiAgICAgICAgLy8gICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAvLyAgICAgICAgICAgICBjZWxsLmNoYW5nZTJCb21iKENlbGxUeXBlLkJvbWIxKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgY2VsbC5vbk1zZyhNc2dUeXBlLkJvbWIsIG51bGwpO1xuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmdhbWVNb2RlbC5zdGVwTGltaXQtLTtcbiAgICAgICAgLy8gICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LlVJLlVwZGF0ZUluZm9QYW5lbCk7XG4gICAgICAgIC8vICAgICAgICAgICAgIE0ucnVudGltZS5PdmVyU3RlcENvdW50KytcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKE0ucnVudGltZS5PdmVyU3RlcENvdW50ID4gNykge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgTS5ydW50aW1lLk92ZXJTdGVwQ291bnQgPSA3O1xuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5VSS5BZGRTY29yZSwgU2NvcmVDb25maWcuT3ZlclN0ZXBbTS5ydW50aW1lLk92ZXJTdGVwQ291bnRdLCBwb3NpdGlvbiwgdHJ1ZSlcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICAvLyBwcml2YXRlIGNoZWNrU2hvd0dhbWVPdmVyKCkge1xuICAgIC8vICAgICBpZiAoTS5ydW50aW1lLkdhbWVTdGF0ZSA9PSBHYW1lU3RhdGUuV2luICYmICF0aGlzLmdhbWVNb2RlbC5pc0ZhbGxpbmcpIHtcbiAgICAvLyAgICAgICAgIC8vIHRoaXMuX3N0YXJ0T3ZlckNsaWNrKCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgLy8gZWxzZSBpZiAoTS5ydW50aW1lLkdhbWVTdGF0ZSA9PSBHYW1lU3RhdGUuRW5kICYmICF0aGlzLmlzU2hvd0VuZFZpZXcpIHtcbiAgICAvLyAgICAgLy8gaWYgKHRoaXMuZ2FtZU1vZGVsLnN0ZXBMaW1pdCA8PSAwICYmICF0aGlzLmdhbWVNb2RlbC5pc0ZhbGxpbmcpIHtcbiAgICAvLyAgICAgLy8gICAgIHRoaXMuc2hvd0dhbWVPdmVyRGlhbG9nKHRydWUpO1xuICAgIC8vICAgICAvLyB9XG4gICAgLy8gICAgIC8vIH1cbiAgICAvLyB9XG5cbiAgICBwcml2YXRlIGNoZWNrU2hvd0dhbWVPdmVyKCkge1xuICAgICAgICBpZiAoTS5ydW50aW1lLkdhbWVTdGF0ZSA9PSBHYW1lU3RhdGUuV2luKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZ2FtZU1vZGVsLmlzRmFsbGluZykge1xuICAgICAgICAgICAgICAgIE0ucnVudGltZS5HYW1lU3RhdGUgPSBHYW1lU3RhdGUuQ2hhbmdlQm9tYjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lTW9kZWwuQ2VsbERpY3Quc2l6ZSA8PSAwIHx8IHRoaXMuZ2FtZU1vZGVsLnN0ZXBMaW1pdCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0dhbWVPdmVyRGlhbG9nKHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuT3ZlclNob3csIHsgdHlwZTogVUlIdWREZWYuT3ZlclNob3cgfSwgbnVsbCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/lvIDlp4vlsIbmraXmlbDovazmjaLmiJDngrjlvLkuISBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlFeGVjRnVuKDAuMiwgdGhpcy5jb252ZXJzaW9uU3RlcDJCb21iLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoTS5ydW50aW1lLkdhbWVTdGF0ZSA9PSBHYW1lU3RhdGUuRW5kICYmICF0aGlzLmlzU2hvd0VuZFZpZXcpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5nYW1lTW9kZWwuaXNGYWxsaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93R2FtZU92ZXJEaWFsb2codHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnZlcnNpb25TdGVwMkJvbWIoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgLy8gcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5nYW1lTW9kZWwpIHJldHVybjtcbiAgICAgICAgY29uc3QgY2xvc2VBcnk6IFNldDxDZWxsTW9kZWw+ID0gbmV3IFNldCgpO1xuICAgICAgICBNLnJ1bnRpbWUuT3ZlclN0ZXBDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuZ2FtZU1vZGVsLkNlbGxEaWN0LmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICBpZiAoY2VsbCAmJiAhY2VsbC5pc0VtcHR5ICYmICFjZWxsLmlzRGVhdGggJiYgIWNlbGwuaXNCb21iICYmICFjZWxsLmlzR3JvdW5kICYmICF0aGlzLmdhbWVNb2RlbC5pc0hhdmFTcGUoY2VsbC5wb3MpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNsb3NlQXJ5LnNpemUgPCB0aGlzLmdhbWVNb2RlbC5zdGVwTGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VBcnkuYWRkKGNlbGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgY2VudGVyUG9zID0gdGhpcy51aUN0cmwuZ2V0U3RlcFBvcygpO1xuICAgICAgICBHcm91cEFuaW1hdEN0cmwuaW5zLm92ZXJTaG9vdEVmZihjbG9zZUFyeSwgY2VudGVyUG9zLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzICYmIHRoaXMuZ2FtZU92ZXJTdGFydEJvbWIoMC4zLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3N0YXJ0RmFsbCgpIHtcbiAgICAgICAgdGhpcy5nYW1lTW9kZWwuc3RhcnRPdmVyRmFsbCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0dhbWVPdmVyRGlhbG9nKHJlc3VsdDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmlzU2hvd0VuZFZpZXcgPSB0cnVlO1xuICAgICAgICBjb25zdCBzdG9yeURhdGEgPSBNLnRhYmxlLkNoYXB0ZXJTdG9yeS5nZXRCeVByaW1hcnlLZXkoTS5ydW50aW1lLkN1ckxldmVsKTtcblxuICAgICAgICB0aGlzLmdhbWVNb2RlbC5zdG9wT3ZlckZhbGwoKTtcbiAgICAgICAgaWYgKHJlc3VsdCAmJiBzdG9yeURhdGEpIHtcbiAgICAgICAgICAgIC8v5bGV56S65a+56K+d5qGGIVxuICAgICAgICAgICAgVUlNZ3IuaW5zLnNob3dVSShVSUh1ZERlZi5TdG9yeVRhbGtQYW5lbCwgc3RvcnlEYXRhLCBudWxsLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxheUV4ZWNGdW4oMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVpQ3RybC5zaG93UmVzdWx0RGlhbG9nKHJlc3VsdCwgdGhpcy5fdXNlU3RlcENvdW50LCBNLnJ1bnRpbWUuTWF0Y2hHYW1lVGltZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVsYXlFeGVjRnVuKDEsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVpQ3RybC5zaG93UmVzdWx0RGlhbG9nKHJlc3VsdCwgdGhpcy5fdXNlU3RlcENvdW50LCBNLnJ1bnRpbWUuTWF0Y2hHYW1lVGltZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2FtZU92ZXJTdGFydEJvbWIoZ2FwdGltZTogbnVtYmVyID0gMCwgaXNPdmVyOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5nYW1lTW9kZWwuQ2VsbERpY3QuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgIGlmIChjZWxsICYmIGNlbGwuaXNCb21iKSB7XG4gICAgICAgICAgICAgICAgaW5kZXgrK1xuICAgICAgICAgICAgICAgIGxldCB0aW1lID0gZ2FwdGltZTtcbiAgICAgICAgICAgICAgICBpZiAoZ2FwdGltZSkge1xuICAgICAgICAgICAgICAgICAgICB0aW1lICo9IGluZGV4O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRpbWUgPSAwLjE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZGVsYXlFeGVjRnVuKHRpbWUsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5vbk1zZyhNc2dUeXBlLkJvbWIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNPdmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBNLnJ1bnRpbWUuR2FtZVN0YXRlID0gR2FtZVN0YXRlLkVuZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU3RvcFByb21wdHModGFzazogR2FtZVRhc2tNb2RlbCkge1xuICAgICAgICBpZiAodGFzay5tb2RlbDEgJiYgdGFzay5tb2RlbDEuZXh0Q3RybCkge1xuICAgICAgICAgICAgKDxDZWxsTW9kZWw+dGFzay5tb2RlbDEpLmV4dEN0cmwuc3RvcFByb21wdEFjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRhc2suY2xvc2VBcnkuZm9yRWFjaCgoY206IENlbGxNb2RlbCkgPT4ge1xuICAgICAgICAgICAgY20uZXh0Q3RybCAmJiBjbS5leHRDdHJsLnN0b3BQcm9tcHRBY3Rpb24oKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIGV4ZWNUaXNBbmltYXRpb24odGFzazogR2FtZVRhc2tNb2RlbCkge1xuICAgICAgICBpZiAodGFzay5tb2RlbDEgJiYgdGFzay5tb2RlbDEuZXh0Q3RybCkge1xuICAgICAgICAgICAgKDxDZWxsTW9kZWw+dGFzay5tb2RlbDEpLmV4dEN0cmwucGxheVNpbmdsZVByb21wdCh0YXNrLmNwMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGFzay5jbG9zZUFyeS5mb3JFYWNoKChjbTogQ2VsbE1vZGVsKSA9PiB7XG4gICAgICAgICAgICBjbS5leHRDdHJsICYmIGNtLmV4dEN0cmwucGxheU11bFByb21wdCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gdGhpcy5nYW1lTW9kZWwudGFzay5mcmVlVGFzayh0YXNrKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGV4ZWNBZGROZXdDZWxsKHRhc2s6IEdhbWVUYXNrTW9kZWwpIHtcbiAgICAgICAgLy8gaWYgKHRoaXMuYmFzaWNDZWxsVmlld0N0cmwpIHtcbiAgICAgICAgdGhpcy5iYXNpY0NlbGxWaWV3Q3RybC5jcmVhdGVOZXdDZWxsKHRhc2subW9kZWwxLCB0YXNrLmV4dERhdGEpO1xuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMuZ2FtZU1vZGVsLnRhc2suZnJlZVRhc2sodGFzayk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBleGVjRWxpbWF0ZSh0YXNrOiBHYW1lVGFza01vZGVsKSB7XG4gICAgICAgIHN3aXRjaCAodGFzay50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIEVsaW1hdGVUeXBlLkRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja01lcmdlQm9tYih0YXNrKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRWxpbWF0ZVR5cGUuQWxsOlxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY0RvdWJsZVJhaW5ib3codGFzayk7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgRWxpbWF0ZVR5cGUuQm9tYjY6XG4gICAgICAgICAgICAgICAgR3JvdXBBbmltYXRDdHJsLmlucy5wbGF5Q3JhYkJvbWIodGFzay5jbG9zZUFyeSk7XG4gICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgY2FzZSBFbGltYXRlVHlwZS5UaHJlZVJvd0FuZENvbDpcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWNUaHJlZVJvd0FuZENvbCh0YXNrKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjQm9tYih0YXNrKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFzay50eXBlID4gRWxpbWF0ZVR5cGUuUHJvcCkge1xuICAgICAgICAgICAgLy8gICB0aGlzLnBsYXlQcm9wRWZmKHRhc2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5omn6KGM5pmu6YCa5raI6Zmk5o6l5Y+jXG4gICAgICogQHBhcmFtIHRhc2sg5raI6Zmk5Lu75YqhXG4gICAgICogQHBhcmFtIGZvcmNlZEVsaW1hdGUg5by65Yi25raI6ZmkKOS4jeS8muinpuWPkeeCuOW8uei/nueIhilcbiAgICAgKi9cbiAgICBwcml2YXRlIGV4ZWNOb3JtYWxFbGltYXRlKHRhc2s6IEdhbWVUYXNrTW9kZWwsIGZvcmNlZEVsaW1hdGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAodGFzay5zaXplID09IDApIHtcbiAgICAgICAgICAgICh0YXNrLm1vZGVsMS5leHRDdHJsICYmIHRhc2subW9kZWwxLmlzRGVhdGgpICYmIHRhc2subW9kZWwxLmV4dEN0cmwuZWxpbWF0ZSh0YXNrLnNpemUsIHRhc2subW9kZWwxLnBvcywgdGFzay50eXBlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVsYXlFeGVjRnVuKHRhc2sua2VlcFRpbWUsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrRmlzaEJvbWIodGFzay5tb2RlbDEsIHRhc2suc2l6ZSk7XG4gICAgICAgICAgICAgICAgdGFzay5jbG9zZUFyeS5mb3JFYWNoKChtOiBDZWxsTW9kZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG0gJiYgbS5leHRDdHJsICYmIG0uaXNEZWF0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbS5pc0JvbWIgPSBmb3JjZWRFbGltYXRlID8gZmFsc2UgOiBtLmlzQm9tYjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG0uZXh0Q3RybC5lbGltYXRlKHRhc2suc2l6ZSwgdGFzay5tb2RlbDEucG9zLCB0YXNrLnR5cGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8qKumUgOavgeS4iuS9jeaIluiAheS4i+S9jeeahOmanOeijeeJqSAqL1xuICAgICAgICAgICAgICAgICAgICBtICYmIG0uZXhlY1VwRWxpbWF0ZSh0YXNrLnR5cGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZU1vZGVsLnRhc2suZnJlZVRhc2sodGFzayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZXhlY0V4Y2hhbmdlKHRhc2s6IEdhbWVUYXNrTW9kZWwpIHtcbiAgICAgICAgY29uc3QgYzIgPSA8SXRlbUJhc2ljQ2VsbEN0cmw+dGFzay5tb2RlbDIuZXh0Q3RybFxuICAgICAgICAvL+i/memHjOeahCBleHREYXRhIOaMh+WumuaYr+WQpuWNleS4quenu+WKqFxuICAgICAgICBpZiAodGFzay5tb2RlbDEuaXNCb21iICYmIHRhc2subW9kZWwyLmlzQm9tYiB8fCB0YXNrLmV4dERhdGEpIHtcbiAgICAgICAgICAgIGMyICYmIGMyLmV4Y2hhbmdlRG91YmxlQm9tYkFuaSh0YXNrLm1vZGVsMSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGMxID0gPEl0ZW1CYXNpY0NlbGxDdHJsPnRhc2subW9kZWwxLmV4dEN0cmw7XG4gICAgICAgICAgICBjMSAmJiBjMS5leGNoYW5nZSh0YXNrLmNwMSwgdGFzay5rZWVwVGltZSwgdGFzay5tb2RlbDIpO1xuICAgICAgICAgICAgYzIgJiYgYzIuZXhjaGFuZ2UodGFzay5jcDIsIHRhc2sua2VlcFRpbWUsIHRhc2subW9kZWwxKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdhbWVNb2RlbC50YXNrLmZyZWVUYXNrKHRhc2spO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tGaXNoQm9tYihtb2RlbDogQ2VsbE1vZGVsLCBzaXplOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKG1vZGVsICYmIG1vZGVsLmdldFR5cGUoKSA9PSBDZWxsVHlwZS5GaXNoICYmIHNpemUgPT0gMykge1xuICAgICAgICAgICAgLy/ngrjlvLnpsbzniIbngrghXG4gICAgICAgICAgICBtb2RlbC5leHRDdHJsICYmIG1vZGVsLmV4dEN0cmwuZXhlY0Zpc2hCb21iKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrTWVyZ2VCb21iKHRhc2s6IEdhbWVUYXNrTW9kZWwpIHtcbiAgICAgICAgLy/mma7pgJrmtojpmaQhXG4gICAgICAgIGxldCBzY29yZU1vZGVsID0gdGFzay5tb2RlbDE7XG4gICAgICAgIGlmICh0YXNrLnNpemUgPj0gNCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZU1vZGVsLmlzQ2FuTWVyZ2VCb21iKHRhc2suZXh0RGF0YSwgdGFzay5tb2RlbDEpKSB7XG4gICAgICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LlNvdW5kLlBsYXlTb3VuZEVmZiwgQXVkaW9JRC5tZXJnZV9ib29tKTtcbiAgICAgICAgICAgICAgICBsZXQgaXNFeGVjID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKE0ucnVudGltZS5HYW1lU3RhdGUgPT0gR2FtZVN0YXRlLkVuZCkge1xuICAgICAgICAgICAgICAgICAgICBpc0V4ZWMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBHcm91cEFuaW1hdEN0cmwuaW5zLnBsYXlDcmVhdGVCb21iKHRhc2suZXh0RGF0YSwgdGFzay5tb2RlbDEucG9zLCBpc0V4ZWMsIEdhcFRpbWUuTWVyZ2VCb21iU3BlZWQgKyAwLjIsIHRydWUsIHNjb3JlTW9kZWwuR3JvdXBJZCk7XG4gICAgICAgICAgICAgICAgTS5ydW50aW1lLmFkZE1lcmdlQ291bnQodGFzay5leHREYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFzay5tb2RlbDEudW5sb2NrQ3JlYXRlQm9tYlBvcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRhc2suY2xvc2VBcnkpIHtcbiAgICAgICAgICAgIC8v5om+5Ye66L6555WM55qE6YKj5LiqIOaoqueahOW3pui+uSznq5bnmoTlj7PovrlcbiAgICAgICAgICAgIGxldCB0ZW1wTW9kZWwgPSBudWxsO1xuICAgICAgICAgICAgdGFzay5jbG9zZUFyeS5mb3JFYWNoKChtb2RlbDogQ2VsbE1vZGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0ZW1wTW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcE1vZGVsID0gbW9kZWxcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRlbXBNb2RlbC5wb3MueCA9PSBtb2RlbC5wb3MueCAmJiBtb2RlbC5wb3MueSA8IHRlbXBNb2RlbC5wb3MueSkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTW9kZWwgPSBtb2RlbDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRlbXBNb2RlbC5wb3MueSA9PSBtb2RlbC5wb3MueSAmJiBtb2RlbC5wb3MueCA8IHRlbXBNb2RlbC5wb3MueCkge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wTW9kZWwgPSBtb2RlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNjb3JlTW9kZWwgPSB0ZW1wTW9kZWw7XG4gICAgICAgIH1cbiAgICAgICAgLy/nu5Hlrprmt7vliqDliIbmlbDlm57osINcbiAgICAgICAgaWYgKHNjb3JlTW9kZWwgJiYgc2NvcmVNb2RlbC5leHRDdHJsKSB7XG4gICAgICAgICAgICBzY29yZU1vZGVsLmV4dEN0cmwuQmluZEFkZFNjb3JlVGFzayA9IChwb3MsIGNvdW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY291bnQgPSBjb3VudCA+IDUgPyA1IDogY291bnRcbiAgICAgICAgICAgICAgICBjb25zdCBjb21ib05hbWUgPSBDb21ib0xldmVsW00ucnVudGltZS5DdXJDb21ib107XG4gICAgICAgICAgICAgICAgaWYgKGNvbWJvTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmF0aW8gPSBjb21ib1JhdGlvW2NvbWJvTmFtZV07XG4gICAgICAgICAgICAgICAgICAgIHJhdGlvID0gcmF0aW8gPiAyID8gMiA6IHJhdGlvO1xuICAgICAgICAgICAgICAgICAgICBMb2cuaSgnY29tYm86JywgcmF0aW8sIFNjb3JlQ29uZmlnLkNvbWJvW3JhdGlvXSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudWlDdHJsLnVwZGF0ZVNjb3JlKFNjb3JlQ29uZmlnLkNvbWJvW3JhdGlvXSwgcG9zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVpQ3RybC51cGRhdGVTY29yZShTY29yZUNvbmZpZy5Ob3JtYWxbY291bnRdLCBwb3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV4ZWNOb3JtYWxFbGltYXRlKHRhc2spO1xuICAgIH1cblxuICAgIHByaXZhdGUgZXhlY0JvbWIodGFzazogR2FtZVRhc2tNb2RlbCkge1xuICAgICAgICAvL+aJp+ihjOeIhueCuOWKqOeUuyEgIFxuICAgICAgICBpZiAodGFzay50eXBlID09IEVsaW1hdGVUeXBlLkdpcmwpIHtcbiAgICAgICAgICAgIGNvbnN0IGN0cmw6IEl0ZW1CYXNpY0NlbGxDdHJsID0gdGFzay5tb2RlbDEuZXh0Q3RybDtcbiAgICAgICAgICAgIGN0cmwuZWxpbWF0ZSgwLCB0YXNrLm1vZGVsMS5wb3MsIHRhc2sudHlwZSk7XG4gICAgICAgICAgICB0aGlzLmdhbWVNb2RlbC50YXNrLmZyZWVUYXNrKHRhc2spO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhc2sudHlwZSA9PSBFbGltYXRlVHlwZS5Sb2NrZXQpIHtcbiAgICAgICAgICAgIHRoaXMuZXhlY09jdG9wdXModGFzayk7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YXNrLm1vZGVsMSAmJiB0YXNrLm1vZGVsMS5leHRDdHJsKSB7XG4gICAgICAgICAgICB0YXNrLm1vZGVsMS5leHRDdHJsLkJpbmRBZGRTY29yZVRhc2sgPSAocG9zLCBzaXplKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNvY3JlID0gU2NvcmVDb25maWcuU3BlY2lhbFt0YXNrLm1vZGVsMS5nZXRUeXBlKCldO1xuICAgICAgICAgICAgICAgIGlmICh0YXNrLm1vZGVsMS5pc0JvbWIpIHtcbiAgICAgICAgICAgICAgICAgICAgc29jcmUgPSBTY29yZUNvbmZpZy5Cb21iRWxpbWF0ZVt0YXNrLm1vZGVsMS5nZXRUeXBlKCldXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudWlDdHJsLnVwZGF0ZVNjb3JlKHNvY3JlLCBwb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICh0YXNrLm1vZGVsMS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgIGNhc2UgQ2VsbFR5cGUuQm9tYjE6XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjQmVpa2VCb21iKHRhc2spO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDZWxsVHlwZS5GaXNoOlxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY0Zpc2hCb21iKHRhc2spO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDZWxsVHlwZS5Cb21iNDpcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWNPY3RvcHVzKHRhc2spO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDZWxsVHlwZS5Cb21iMjpcbiAgICAgICAgICAgIGNhc2UgQ2VsbFR5cGUuQm9tYjM6XG4gICAgICAgICAgICAgICAgdGhpcy5leGVjUm93QW5kQ29sKHRhc2spO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDZWxsVHlwZS5Cb21iNTpcbiAgICAgICAgICAgICAgICB0YXNrLm1vZGVsMS5pc0JvbWIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmV4ZWNSYWluYm93KHRhc2spO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuZXhlY05vcm1hbEVsaW1hdGUodGFzayk7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZXhlY1RocmVlUm93QW5kQ29sKHRhc2s6IEdhbWVUYXNrTW9kZWwpIHtcbiAgICAgICAgY29uc3QgZWxpbWF0ZURhdGE6IEFycmF5PHsgcG9zOiBjYy5WZWMyLCBrZWVwVGltZTogbnVtYmVyLCB0eXBlLCBjbG9zZUFyeTogU2V0PENlbGxNb2RlbD4gfT4gPSB0YXNrLmV4dERhdGE7XG4gICAgICAgIGVsaW1hdGVEYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsYXlSb3dBbmRDb2xBbmkoaXRlbS50eXBlLCBpdGVtLnBvcywgdGFzay5jbG9zZUFyeSwgdGFzay50eXBlKVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5nYW1lTW9kZWwudGFzay5mcmVlVGFzayh0YXNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmiafooYzlj4zlvanombnlhajlsYDmtojpmaQhXG4gICAgICogQHBhcmFtIHRhc2sgXG4gICAgICovXG4gICAgcHJpdmF0ZSBleGVjRG91YmxlUmFpbmJvdyh0YXNrOiBHYW1lVGFza01vZGVsKSB7XG4gICAgICAgIHRhc2suc2l6ZSA9IG51bGw7XG4gICAgICAgIHRhc2sudHlwZSA9IEVsaW1hdGVUeXBlLkRlZmF1bHQ7XG4gICAgICAgIGlmICh0YXNrLmV4dERhdGEgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5kZWxheUV4ZWNGdW4oR2FwVGltZS5Eb3VibGVSYWluYm93UmVzdW1lLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgTS5ydW50aW1lLnJlc3VtZUdhbWUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5leGVjTm9ybWFsRWxpbWF0ZSh0YXNrLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmiafooYznq6Dpsbzot7Pot4NcbiAgICAgKiBAcGFyYW0gdGFzayBcbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIGV4ZWNPY3RvcHVzKHRhc2spIHtcbiAgICAgICAgdGFzay5tb2RlbDEuaXNCb21iID0gZmFsc2U7XG4gICAgICAgIHRhc2sudHlwZSA9IEVsaW1hdGVUeXBlLkJvbWI0O1xuICAgICAgICBpZiAodGFzay5tb2RlbDEuZXh0Q3RybCkge1xuICAgICAgICAgICAgdGFzay5tb2RlbDEuZXh0Q3RybC5wbGF5Qm9tYlNpbmdsZURlc3RvcnlFZmYoMCwgMC41KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0YXJnZXRQb3MgPSB0YXNrLmV4dERhdGEucG9zO1xuICAgICAgICBjb25zdCBjb252ZVR5cGUgPSB0YXNrLmV4dERhdGEudHlwZTtcbiAgICAgICAgY29uc3Qgd3BvcyA9IENvbW1vbi5jb252ZXJ0Q3VyV29ybGRQb3ModGFzay5tb2RlbDEuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIGlmICh0YXJnZXRQb3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHRwb3MgPSBDb21tb24uY29udmVydEN1cldvcmxkUG9zKENvbW1vbi5nZXRQb3ModGFyZ2V0UG9zLngsIHRhcmdldFBvcy55KSk7XG5cblxuICAgICAgICAgICAgTS5ydW50aW1lLnB1c2haaGFuZ3l1VGltZVBhdXNlKCk7XG5cbiAgICAgICAgICAgIC8qIOetluWIkuivtOi/meenjeaViOaenOS4jeWkquWlve+8jOi/mOaYr+ayv+eUqOWOn+adpeeahOaKm+eJqee6v1xuICAgICAgICAgICAgaWYoY29udmVUeXBlKXsgXG5cbiAgICAgICAgICAgICAgICB2YXIgYW5pbU5hbWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmIChjb252ZVR5cGUgPT0gQ2VsbFR5cGUuQm9tYjIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/nq6Dpsbwr5YmR6bG8XG4gICAgICAgICAgICAgICAgICAgIGFuaW1OYW1lPSBcInpoYW5neXVfdGlhb19qaWFueXVcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnZlVHlwZSA9PSBDZWxsVHlwZS5Cb21iMSkge1xuICAgICAgICAgICAgICAgICAgICAvL+eroOmxvCvmsJTms6HpsbxcbiAgICAgICAgICAgICAgICAgICAgYW5pbU5hbWU9IFwiemhhbmd5dV90aWFvX2hldHVuXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYXdhaXQgRWZmTGF5ZXJDdHJsLmlucy5wbGF5Wmhhbmd5dUFuZEppYW55dShhbmltTmFtZSxDb21tb24uY29udmVydEN1cldvcmxkUG9zKDxhbnk+dGFzay5tb2RlbDEuZXh0RGF0YS5wb3NpdGlvbiksXG4gICAgICAgICAgICAgICAgQ29tbW9uLmdldFBvcyh0YXJnZXRQb3MueCwgdGFyZ2V0UG9zLnkpLCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy9jYy5sb2coXCLov5nph4zmnInku4DkuYjmr5vnl4UgPz8/XCIpXG4gICAgICAgICAgICAgICAgICAgICAvLyDov5nph4zmnInku4DkuYjmr5vnl4UgPz8/XG4gICAgICAgICAgICAgICAgICAgIEdyb3VwQW5pbWF0Q3RybC5pbnMucGxheUNyZWF0ZUJvbWIoY29udmVUeXBlLCB0YXJnZXRQb3MsIHRydWUsIDAsIGZhbHNlKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGF5RXhlY0Z1bigwLjUsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgTS5ydW50aW1lLmRlbGV0ZVpoYW5neXVUaW1lKClcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5Db2xsZWN0TW9kZWwucmVtb3ZlTWFyayh0YXJnZXRQb3MpO1xuICAgICAgICAgICAgICAgICAgICBHcm91cEFuaW1hdEN0cmwuaW5zLnBsYXlDZWxsQm9tYlNob2Nrcyh0YXJnZXRQb3MsIDEsIDEsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVmZkN0cmwucGxheVp5SnVtcCh3cG9zLCB0cG9zLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb252ZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZU1vZGVsLmV4ZWNFbGltYXRlT25lKHRhcmdldFBvcywgRWxpbWF0ZVR5cGUuQm9tYjQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g6L+Z6YeM5pyJ5LuA5LmI5q+b55eFID8/P1xuICAgICAgICAgICAgICAgICAgICAgICAgR3JvdXBBbmltYXRDdHJsLmlucy5wbGF5Q3JlYXRlQm9tYihjb252ZVR5cGUsIHRhcmdldFBvcywgdHJ1ZSwgMCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lTW9kZWwuZXhlY0VsaW1hdGVPbmUodGFyZ2V0UG9zLCBFbGltYXRlVHlwZS5Cb21iNCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxheUV4ZWNGdW4oMC41LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBNLnJ1bnRpbWUuZGVsZXRlWmhhbmd5dVRpbWUoKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5Db2xsZWN0TW9kZWwucmVtb3ZlTWFyayh0YXJnZXRQb3MpO1xuICAgICAgICAgICAgICAgICAgICBHcm91cEFuaW1hdEN0cmwuaW5zLnBsYXlDZWxsQm9tYlNob2Nrcyh0YXJnZXRQb3MsIDEsIDEsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSovXG5cblxuICAgICAgICAgICAgdGhpcy5lZmZDdHJsLnBsYXlaeUp1bXAod3BvcywgdHBvcywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb252ZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lTW9kZWwuZXhlY0VsaW1hdGVPbmUodGFyZ2V0UG9zLCBFbGltYXRlVHlwZS5Cb21iNCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIOi/memHjOacieS7gOS5iOavm+eXhSA/Pz9cbiAgICAgICAgICAgICAgICAgICAgR3JvdXBBbmltYXRDdHJsLmlucy5wbGF5Q3JlYXRlQm9tYihjb252ZVR5cGUsIHRhcmdldFBvcywgdHJ1ZSwgMCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZU1vZGVsLmV4ZWNFbGltYXRlT25lKHRhcmdldFBvcywgRWxpbWF0ZVR5cGUuQm9tYjQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmRlbGF5RXhlY0Z1bigwLjUsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgTS5ydW50aW1lLmRlbGV0ZVpoYW5neXVUaW1lKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBHYW1lTW9kZWwuaW5zLkNvbGxlY3RNb2RlbC5yZW1vdmVNYXJrKHRhcmdldFBvcyk7XG4gICAgICAgICAgICAgICAgR3JvdXBBbmltYXRDdHJsLmlucy5wbGF5Q2VsbEJvbWJTaG9ja3ModGFyZ2V0UG9zLCAxLCAxLCB0cnVlKTtcbiAgICAgICAgICAgIH0sIGNvbnZlVHlwZSk7XG5cblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXhlY05vcm1hbEVsaW1hdGUodGFzayk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBleGVjQmVpa2VCb21iKHRhc2s6IEdhbWVUYXNrTW9kZWwpIHtcbiAgICAgICAgaWYgKHRhc2subW9kZWwxLmV4dEN0cmwpIHtcbiAgICAgICAgICAgIGNvbnN0IGN0cmw6IEl0ZW1CYXNpY0NlbGxDdHJsID0gdGFzay5tb2RlbDEuZXh0Q3RybDtcbiAgICAgICAgICAgIGN0cmwucGxheUJvbWJTaW5nbGVEZXN0b3J5RWZmKDAsIDEpO1xuICAgICAgICAgICAgY29uc3QgW2NlbnRlclBvcywgYm9tYkx2XSA9IFt0YXNrLm1vZGVsMS5wb3MsIHRhc2suZXh0RGF0YV07XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBDb21tb24uY29udmVydEN1cldvcmxkUG9zKDxhbnk+dGFzay5tb2RlbDEuZXh0RGF0YS5wb3NpdGlvbik7XG4gICAgICAgICAgICBpZiAodGFzay50eXBlICE9IEVsaW1hdGVUeXBlLkRvdWJsZUJvbWIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVmZkN0cmwucGxheUJvbWJFZmYoYm9tYkx2LCBwb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LlNvdW5kLlBsYXlTb3VuZEVmZiwgQXVkaW9JRC5Cb21iKTtcbiAgICAgICAgICAgIHRoaXMuZXhlY05vcm1hbEVsaW1hdGUodGFzayk7XG4gICAgICAgICAgICB0aGlzLmRlbGF5RXhlY0Z1bih0YXNrLmtlZXBUaW1lLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgR3JvdXBBbmltYXRDdHJsLmlucy5wbGF5Q2VsbEJvbWJTaG9ja3MoY2VudGVyUG9zLCBib21iTHYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDlkLjpmYTlnovniIbngrhcbiAgICAvLyBwcml2YXRlIGV4ZWNCZWlrZUJvbWIodGFzaykge1xuICAgIC8vICAgICBpZiAodGFzay5tb2RlbDEuZXh0Q3RybCkge1xuICAgIC8vICAgICAgICAgY29uc3QgY3RybDogSXRlbUJhc2ljQ2VsbEN0cmwgPSB0YXNrLm1vZGVsMS5leHRDdHJsO1xuICAgIC8vICAgICAgICAgY3RybC5wbGF5Qm9tYlNpbmdsZURlc3RvcnlFZmYoMCwgMSArIEdhcFRpbWUuQmVpa2VEZWxheVNoYWtpbmcgKyBHYXBUaW1lLkJlaWtlRGVsYXlTdWN0aW9uKTtcbiAgICAvLyAgICAgICAgIGNvbnN0IHBvcyA9IENvbW1vbi5jb252ZXJ0Q3VyV29ybGRQb3ModGFzay5tb2RlbDEuZXh0RGF0YS5wb3NpdGlvbik7XG4gICAgLy8gICAgICAgICB0aGlzLmVmZkN0cmwucGxheUJvbWJFZmYodGFzay5leHREYXRhLCBwb3MpO1xuICAgIC8vICAgICAgICAgdGhpcy5kZWxheUV4ZWNGdW4oR2FwVGltZS5CZWlrZURlbGF5U2hha2luZywgKCkgPT4ge1xuICAgIC8vICAgICAgICAgICAgIC8v5ZC45LuWIFxuICAgIC8vICAgICAgICAgICAgIHRhc2suY2xvc2VBcnkuZm9yRWFjaCgoY2VsbDogQ2VsbE1vZGVsKSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgICAgIGlmIChjZWxsICYmIGNlbGwuZXh0Q3RybCkge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgY2VsbC5leHRDdHJsLnBsYXlTaGFraW5nKCk7XG4gICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICB9KTtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmRlbGF5RXhlY0Z1bihHYXBUaW1lLkJlaWtlRGVsYXlTdWN0aW9uLCAoKSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHRhc2suY2xvc2VBcnkuZm9yRWFjaCgoY2VsbDogQ2VsbE1vZGVsKSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbCAmJiBjZWxsLmV4dEN0cmwgJiYgY2VsbC5nZXRUeXBlKCkgPCBDZWxsVHlwZS5Cb21iMSAmJiB0YXNrLm1vZGVsMS5leHREYXRhICYmIGNlbGwuZ2V0VHlwZSgpICE9IENlbGxUeXBlLkZpc2gpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmV4dEN0cmwucGxheVJvdGF0aW5nTWVyZ2UodGFzay5tb2RlbDEuZXh0RGF0YS5wb3NpdGlvbik7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgICAgIH0pO1xuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLmV4ZWNOb3JtYWxFbGltYXRlKHRhc2spO1xuICAgIC8vICAgICAgICAgICAgIH0pXG4gICAgLy8gICAgICAgICB9KTtcbiAgICAvLyAgICAgICAgIHRoaXMuZGVsYXlFeGVjRnVuKEdhcFRpbWUuQm9tYlByZVNob2NrcywgKCkgPT4ge1xuICAgIC8vICAgICAgICAgICAgIEdyb3VwQW5pbWF0Q3RybC5pbnMucGxheUNlbGxCb21iU2hvY2tzKHRhc2subW9kZWwxLnBvcywgdGFzay5leHREYXRhKTtcbiAgICAvLyAgICAgICAgIH0pO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgcHJpdmF0ZSBleGVjRmlzaEJvbWIodGFzaykge1xuICAgICAgICB0aGlzLmV4ZWNOb3JtYWxFbGltYXRlKHRhc2spO1xuICAgICAgICBjb25zdCBwb3MgPSBDb21tb24uY29udmVydEN1cldvcmxkUG9zKHRhc2subW9kZWwxLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICB0aGlzLmVmZkN0cmwucGxheUZpc2hCb21iRWZmKHBvcyk7XG4gICAgICAgIGNvbnN0IFtjZW50ZXJQb3MsIGJvbWJMdl0gPSBbdGFzay5tb2RlbDEucG9zLCB0YXNrLmV4dERhdGFdXG4gICAgICAgIHRoaXMuZGVsYXlFeGVjRnVuKEdhcFRpbWUuRmlzaEJvbWJQcmVTaG9ja3MsICgpID0+IHtcbiAgICAgICAgICAgIEdyb3VwQW5pbWF0Q3RybC5pbnMucGxheUNlbGxCb21iU2hvY2tzKGNlbnRlclBvcywgYm9tYkx2KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRhc2subW9kZWwxLmV4dEN0cmwgJiYgdGFzay5tb2RlbDEuZXh0Q3RybC5wbGF5Qm9tYlNpbmdsZURlc3RvcnlFZmYoMCwgdGFzay5rZWVwVGltZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yib5bu65LiA5Liq6aOe5py6LOe9keagvOWdkOaghyFcbiAgICAgKiBAcGFyYW0gc3RhcnRQb3Mg6LW354K55L2N572uIFxuICAgICAqIEBwYXJhbSB0YXJnZXRQb3Mg57uI54K55L2N572uXG4gICAgXG4gICAgcHJpdmF0ZSBjcmVhdGVQbGFuZShzdGFydFBvczogY2MuVmVjMiwgdGFyZ2V0RGF0YTogeyBwb3M6IGNjLlZlYzIsIHR5cGU6IENlbGxUeXBlIH0pIHtcbiAgICAgICAgY29uc3QgcGxhbmVOb2RlID0gTS5ub2RlUG9vbC5nZXRJdGVtKE5vZGVQb29sS2V5LlBsYW5lLCB0aGlzLnBsYW5lUHJlZmFiKTtcbiAgICAgICAgcGxhbmVOb2RlLnBhcmVudCA9IHRoaXMubWFza05vZGU7XG4gICAgICAgIGNvbnN0IGN0cmwgPSBwbGFuZU5vZGUuZ2V0Q29tcG9uZW50KFBsYW5lQ3RybCk7XG4gICAgICAgIGN0cmwuc2hvb3RQbGFuZShzdGFydFBvcywgdGFyZ2V0RGF0YS5wb3MsIEdhcFRpbWUuQ3JlYXRlUGxhbmVEZWxheVRpbWUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRhcmdldERhdGEudHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZU1vZGVsLmV4ZWNFbGltYXRlT25lKHRhcmdldERhdGEucG9zLCBFbGltYXRlVHlwZS5Cb21iNCk7XG4gICAgICAgICAgICAgICAgR3JvdXBBbmltYXRDdHJsLmlucy5wbGF5Q3JlYXRlQm9tYih0YXJnZXREYXRhLnR5cGUsIHRhcmdldERhdGEucG9zLCB0cnVlLCAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lTW9kZWwuZXhlY0VsaW1hdGVPbmUodGFyZ2V0RGF0YS5wb3MsIEVsaW1hdGVUeXBlLkJvbWI0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgICovXG5cbiAgICAvKipcbiAgICAgKiDmiafooYzmqKrnq5bmtojpmaRcbiAgICAgKiBAcGFyYW0gdGFzayBcbiAgICAgKi9cbiAgICBwcml2YXRlIGV4ZWNSb3dBbmRDb2wodGFzazogR2FtZVRhc2tNb2RlbCkge1xuICAgICAgICAvLyBjb25zdCB0eXBlID0gdGFzay5tb2RlbDEuZ2V0VHlwZSgpO1xuICAgICAgICBjb25zdCBwb3MgPSB0YXNrLm1vZGVsMS5wb3M7XG4gICAgICAgIGlmICh0YXNrLm1vZGVsMS5leHRDdHJsKSB7XG4gICAgICAgICAgICB0YXNrLm1vZGVsMS5pc0JvbWIgPSBmYWxzZTtcbiAgICAgICAgICAgIHRhc2subW9kZWwxLmV4dEN0cmwucGxheUJvbWJTaW5nbGVEZXN0b3J5RWZmKDAsIEdhcFRpbWUuUm93QW5kQ29sU2VsZkVsaW1hdGUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGxheVJvd0FuZENvbEFuaSh0YXNrLmV4dERhdGEsIHBvcywgdGFzay5jbG9zZUFyeSk7XG4gICAgICAgIHRoaXMuZ2FtZU1vZGVsLnRhc2suZnJlZVRhc2sodGFzayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHR5cGUg5qiq55qE6L+Y5piv56uW55qEXG4gICAgICogQHBhcmFtIHBvc1xuICAgICAqIEBwYXJhbSBjbG9zZUFyeVxuICAgICAqL1xuICAgIHByaXZhdGUgcGxheVJvd0FuZENvbEFuaSh0eXBlOiBDZWxsVHlwZSwgcG9zOiBjYy5WZWMyLCBjbG9zZUFyeTogU2V0PENlbGxNb2RlbD4sIGVsaW1hdGVUeXBlPzogRWxpbWF0ZVR5cGUpIHtcbiAgICAgICAgdGhpcy5lZmZDdHJsLnBsYXlSb3dDb2xFZmYodHlwZSwgQ29tbW9uLmNvbnZlcnRDdXJXb3JsZFBvcyhDb21tb24uZ2V0UG9zKHBvcy54LCBwb3MueSkpKTtcbiAgICAgICAgaWYgKGNsb3NlQXJ5ICYmIGNsb3NlQXJ5LnNpemUgPiAwKSB7XG4gICAgICAgICAgICBsZXQgW2NvdW50LCBtYXhDb3VudCwgaXNIYXZhQm9ybl0gPSBbMSwgY2xvc2VBcnkuc2l6ZSwgZmFsc2VdO1xuICAgICAgICAgICAgbGV0IGVUeXBlID0gZWxpbWF0ZVR5cGUgfHwgdHlwZTtcbiAgICAgICAgICAgIEdyb3VwQW5pbWF0Q3RybC5pbnMucGxheVJvd0VsaW1hdGUocG9zLCBjbG9zZUFyeSwgPGFueT5lVHlwZSwgKGlzYm9ybikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5nYW1lTW9kZWwpIHJldHVyblxuICAgICAgICAgICAgICAgIGlmIChpc2Jvcm4pIGlzSGF2YUJvcm4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gQ2VsbFR5cGUuQm9tYjMgJiYgIWlzSGF2YUJvcm4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1heENvdW50ID09IGNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfnq5bmtojnu5PmnZ8hJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVNb2RlbC5ub3RpZnlGYWxsQ29sdW1uT3Zlcihwb3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbGxlY3RQb3dlcihzdGFydDogQ2VsbEJhc2U8YW55LCBhbnk+LCBlbmQ6IENlbGxCYXNlPGFueSwgYW55Pikge1xuXG4gICAgICAgIHRoaXMuYmFzaWNDZWxsVmlld0N0cmwucGxheUNvbGxlY3RQb3dlcih0aGlzLnVpTm9kZSwgc3RhcnQsIGVuZCk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uVXBkYXRlQ29tcGxleFZpZXcocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIHRoaXMuZ3JvdW5kVmlld0N0cmwudXBkYXRlQ29tbGV4SXRlYW1CeVBvcyhwb3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVsYXlFeGVjRnVuKHRpbWU6IG51bWJlciwgZnVuOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZShmdW4uYmluZCh0aGlzKSwgdGltZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5omn6KGM5b2p6Jm55raI6ZmkXG4gICAgICogQHBhcmFtIHRhc2sgXG4gICAgICovXG4gICAgcHJpdmF0ZSBleGVjUmFpbmJvdyh0YXNrOiBHYW1lVGFza01vZGVsKSB7XG4gICAgICAgIHRhc2sudHlwZSA9IEVsaW1hdGVUeXBlLkJvbWI1O1xuICAgICAgICBjb25zdCBjZW50ZXJNb2RlbCA9IDxDZWxsTW9kZWw+dGFzay5tb2RlbDE7XG4gICAgICAgIGNvbnN0IHdvcmxkUG9zID0gQ29tbW9uLmdldFdvcmxkUG9zKGNlbnRlck1vZGVsLmV4dERhdGEpO1xuXG4gICAgICAgIE0ucnVudGltZS5wYXVzZUdhbWUoKTtcbiAgICAgICAgY2VudGVyTW9kZWwuZXh0Q3RybC5wbGF5Qm9tYlNpbmdsZURlc3RvcnlFZmYoMCwgR2FwVGltZS5SYWluYm93Q2VudGVyRGVsYXlFbGltYXRlKTtcbiAgICAgICAgdGhpcy5lZmZDdHJsLnBsYXlSYWluYm93Qm9tYih3b3JsZFBvcywgKCkgPT4ge1xuICAgICAgICAgICAgR3JvdXBBbmltYXRDdHJsLmlucy5wbGF5UmFpbmJvd0JvbWIodGFzay5jbG9zZUFyeSwgd29ybGRQb3MsICgpID0+IHtcbiAgICAgICAgICAgICAgICBNLnJ1bnRpbWUucmVzdW1lR2FtZSgpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5nYW1lTW9kZWwpIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGF5RXhlY0Z1bihHYXBUaW1lLlN0YXJzRWxpbWF0ZSwgKCkgPT4geyB0aGlzLmVmZkN0cmwucmVtb3ZlU2hvb3RTdGFycygpIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZXhlY05vcm1hbEVsaW1hdGUodGFzayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cblxuICAgIHByaXZhdGUgcGxheVByb3BFZmYodGFzazogR2FtZVRhc2tNb2RlbCkge1xuICAgICAgICAvL+aJp+ihjOmBk+WFt+a2iOmZpOWKqOeUuyBcbiAgICAgICAgLy8gaWYgKHRhc2suZXh0RGF0YSA9PSBQcm9wVHlwZS5Cb21iMSkge1xuICAgICAgICAvLyAgICAgdGFzay5tb2RlbDEuZXh0Q3RybCAmJiB0YXNrLm1vZGVsMS5leHRDdHJsLmVsaW1hdGUodGFzay5zaXplLCB0YXNrLm1vZGVsMS5wb3MsIHRhc2sudHlwZSk7XG4gICAgICAgIC8vICAgICBHcm91cEFuaW1hdEN0cmwuaW5zLnBsYXlSb3dFbGltYXRlKHRhc2subW9kZWwxLCB0YXNrLmNsb3NlQXJ5LCB0YXNrLnR5cGUsIG51bGwpO1xuICAgICAgICAvLyB9IGVsc2UgaWYgKHRhc2suZXh0RGF0YSA9PSBQcm9wVHlwZS5Cb21iMikge1xuICAgICAgICAvLyAgICAgdGFzay5tb2RlbDEuZXh0Q3RybCAmJiB0YXNrLm1vZGVsMS5leHRDdHJsLmVsaW1hdGUodGFzay5zaXplLCB0YXNrLm1vZGVsMS5wb3MsIHRhc2sudHlwZSk7XG4gICAgICAgIC8vICAgICBHcm91cEFuaW1hdEN0cmwuaW5zLnBsYXlSb3dFbGltYXRlKHRhc2subW9kZWwxLCB0YXNrLmNsb3NlQXJ5LCB0YXNrLnR5cGUsIG51bGwpO1xuICAgICAgICAvLyB9IGVsc2UgaWYgKHRhc2suZXh0RGF0YSA9PSBQcm9wVHlwZS5SYWluYm93KSB7XG4gICAgICAgIC8vICAgICB0aGlzLmV4ZWNOb3JtYWxFbGltYXRlKHRhc2spO1xuICAgICAgICAvLyB9IFxuICAgIH1cblxuICAgIHByaXZhdGUgb25DaGFuZ2VDZWxsVHlwZSh0eXBlOiBDZWxsVHlwZSwgY291bnQ6IG51bWJlciA9IDMsIGlzRGVsYXlDcmVhdGU6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIGlmIChNLnJ1bnRpbWUuR2FtZVN0YXRlID09IEdhbWVTdGF0ZS5Ob3JtYWwpIHtcbiAgICAgICAgICAgIC8v6ZqP5py66I635Y+WbuS4quS9jee9rueUqOadpei9rOaNouaIkOaMh+Wumuexu+Wei1xuICAgICAgICAgICAgY29uc3QgZ2V0T25lQ2VsbCA9ICgpOiBDZWxsTW9kZWwgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBVdGlsLlRvb2wucmFuZ2VJbnQoMCwgR2FtZU1vZGVsLkdyaWRTaXplLkgsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gVXRpbC5Ub29sLnJhbmdlSW50KDAsIEdhbWVNb2RlbC5HcmlkU2l6ZS5XLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUoR2FtZU1vZGVsLmlucy5DZWxsTGlzdCwgY2MudjIoeCwgeSkpO1xuICAgICAgICAgICAgICAgIGlmIChjZWxsICYmIGNlbGwuZXh0Q3RybCAmJiAhY2VsbC5pc0RlYXRoICYmICF0aGlzLmdhbWVNb2RlbC5pc0hhdmFPYnMoY2VsbC5wb3MpICYmIGNlbGwuZ2V0VHlwZSgpIDwgQ2VsbFR5cGUuQmFuYW5hICYmIGNlbGwuZ2V0VHlwZSgpICE9IHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldE9uZUNlbGwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5nYW1lTW9kZWwuY2hlY2tJc0FsbERlYXRoKCkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gY291bnQ7IGktLTspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGdldE9uZUNlbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuY2hhbmdlMkNlbGwodHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmV4dEN0cmwucGxheUNoYW5nZTJDZWxsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3MgPSB0aGlzLnVpTm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihDb21tb24uZ2V0V29ybGRQb3MoY2VsbC5leHREYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuRWZmZWN0LkNvbGxlY3RPdmVyLCBwb3MsICdzaGFueGlhbicpO1xuICAgICAgICAgICAgICAgICAgICB9LCBpc0RlbGF5Q3JlYXRlID8gaSAqIDAuNSA6IDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHVibGljIG9uVGVzdEJ0bkNsaWNrKCkge1xuICAgICAgICAvLyBjb25zdCBkYXRhID0gTS50YWJsZS5DaGFwdGVyU3RvcnkuZ2V0QnlQcmltYXJ5S2V5KDcpO1xuICAgICAgICAvLyBVSU1nci5pbnMuc2hvd1VJKFVJSHVkRGVmLlN0b3J5VGFsa1BhbmVsLCBkYXRhKTtcblxuICAgICAgICAvLyBNLnJ1bnRpbWUuc2V0TWF0Y2gzTGV2ZWwoTS5ydW50aW1lLkN1ckxldmVsICsgMSk7XG4gICAgICAgIC8vIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnTWF0Y2gzJyk7XG5cbiAgICAgICAgLy8gY29uc3QgY2xvc2VBcnkgPSBCb21iTW9kZWwudGVzdDExMTExKGNjLnYyKDMsIDMpLCAyKTtcbiAgICAgICAgLy8gY29uc29sZS5lcnJvcihjbG9zZUFyeSk7XG4gICAgICAgIC8vIGNsb3NlQXJ5LmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgIC8vICAgICBpZiAoY2VsbCAmJiBjZWxsLmV4dEN0cmwpIHtcbiAgICAgICAgLy8gICAgICAgICBjZWxsLmV4dERhdGEuc2V0U2NhbGUoMS4xKTtcbiAgICAgICAgLy8gICAgICAgICAvLyBwcml2YXRlIGNyZWF0ZVBsYW5lKHN0YXJ0UG9zOiBjYy5WZWMyLCB0YXJnZXREYXRhOiB7IHBvczogY2MuVmVjMiwgdHlwZTogQ2VsbFR5cGUgfSlcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNyZWF0ZVBsYW5lKGNlbGwucG9zLCB7IHBvczogY2MudjIoMywgMyksIHR5cGU6IDEgfSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pOyBcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrVXNlUHJvcCgpIHtcbiAgICAgICAgaWYgKE0ucnVudGltZS5TZWxlY3RQcm9wKSB7XG4gICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuR2FtZUNNRC5Qcm9wQ2xpY2ssIE0ucnVudGltZS5TZWxlY3RQcm9wKTtcbiAgICAgICAgICAgIE0ucnVudGltZS5TZWxlY3RQcm9wID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tUdXRvcmlhbCgpIHtcbiAgICAgICAgLy8gdGhpcy5UdXRvcmlhbFBhbmVsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMudHV0b3JpYWxEYXRhKSB7XG4gICAgICAgICAgICB0aGlzLlR1dG9yaWFsUGFuZWwuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLlR1dG9yaWFsUGFuZWwuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuVHV0b3JpYWxQYW5lbC5nZXRDb21wb25lbnQoTWF0Y2gzVHV0b3JpYWxDdHJsKS5pbml0Vmlldyh0aGlzLnR1dG9yaWFsRGF0YSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VHV0b3JpYWwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0VHV0b3JpYWwoKSB7XG4gICAgICAgIHRoaXMuVHV0b3JpYWxQYW5lbC5nZXRDb21wb25lbnQoTWF0Y2gzVHV0b3JpYWxDdHJsKS5zdGFydFR1dG9yaWFsKCk7XG4gICAgfVxuXG4gICAgY2xvc2VUdXRvcmlhbCgpIHtcbiAgICAgICAgdGhpcy5UdXRvcmlhbFBhbmVsLmdldENvbXBvbmVudChNYXRjaDNUdXRvcmlhbEN0cmwpLmNsb3NlVHV0b3JpYWwoKTtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKkdNIGN0cmwgc3RhcioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIC8vIHByaXZhdGUgb3BlbkdNUGFuZWwoKSB7XG4gICAgLy8gICAgIHRoaXMudG91Y2hPcGVuR01QYW5lbENvdW50Kys7XG4gICAgLy8gICAgIGlmICh0aGlzLnRvdWNoT3BlbkdNUGFuZWxDb3VudCA+IDEwIC8qJiYgQXBwcy5pc0RlYnVnKi8pIHtcbiAgICAvLyAgICAgICAgIHRoaXMuR21QYW5lbC5hY3RpdmUgPSB0cnVlO1xuICAgIC8vICAgICAgICAgdGhpcy50b3VjaE9wZW5HTVBhbmVsQ291bnQgPSAwO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgLy8gcHVibGljIG9uQ2xvc2VHbVBhbmVsKCkge1xuICAgIC8vICAgICB0aGlzLkdtUGFuZWwuYWN0aXZlID0gZmFsc2U7XG4gICAgLy8gfVxuXG4gICAgLy8gcHVibGljIG9uSnVtcEx2KCkge1xuICAgIC8vICAgICBNLnJ1bnRpbWUuU2VsZWN0TGV2ZWwgPSAwO1xuICAgIC8vICAgICBjb25zdCBlZGl0OiBjYy5FZGl0Qm94ID0gY2MuZmluZCgnanVtcEx2L2JveCcsIHRoaXMuR21QYW5lbCkuZ2V0Q29tcG9uZW50KGNjLkVkaXRCb3gpO1xuICAgIC8vICAgICBjb25zdCBuZXh0THYgPSBOdW1iZXIoZWRpdC5zdHJpbmcpO1xuICAgIC8vICAgICBNLnJ1bnRpbWUuc2V0TWF0Y2gzTGV2ZWwobmV4dEx2LCB0cnVlKTtcbiAgICAvLyAgICAgQ29tbW9uLmp1bXBTY2VuZShTY2VuZS5NYXRjaCk7XG4gICAgLy8gfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKipHTSBjdHJsIGVuZCoqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgdGhpcy5nYW1lTW9kZWwgJiYgdGhpcy5nYW1lTW9kZWwudXBkYXRlKGR0KTtcbiAgICB9XG59XG4iXX0=