"use strict";
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