"use strict";
cc._RF.push(module, '589033LajhPCIQVvxL+baE2', 'DialogPanel');
// Script/Logic/Common/UI/DialogPanel.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var M_1 = require("../../../Base/Manager/M");
var UIBase_1 = require("../../../Base/UI/UIBase");
var UIMgr_1 = require("../../../Base/Manager/UIMgr");
var UIData_1 = require("../../Data/Interface/UIData");
var CollectItemCtrl_1 = require("../../Match3/View/UI/CollectItemCtrl");
var Event_1 = require("../../Data/Const/Event");
var Constant_1 = require("../../Data/Const/Constant");
var SlideButton_1 = require("../../../Base/CustomComponent/SlideButton");
var RuntimeMgr_1 = require("../../Data/RuntimeMgr");
var Common_1 = require("../Common");
var EventMgr_1 = require("../../../Base/Manager/EventMgr");
var BaseConst_1 = require("../../../Base/BaseConst");
var SelectPropCtrl_1 = require("../../Match3/View/UI/SelectPropCtrl");
var StorageMgr_1 = require("../../../Base/Manager/StorageMgr");
var GuideUtils_1 = require("../../../../GodGuide/GuideUtils");
var ShareMgr_1 = require("../../../Base/Manager/ShareMgr");
var AudioCtrl_1 = require("../AudioCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DialogPanel = /** @class */ (function (_super) {
    __extends(DialogPanel, _super);
    function DialogPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.collectPrefab = null;
        _this.frames = [];
        _this.curData = null;
        _this._animation = null;
        return _this;
    }
    DialogPanel.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.initEvent();
        this.initAnimation();
    };
    DialogPanel.prototype.onDestroy = function () {
        this.node.stopAllActions();
        this.unscheduleAllCallbacks();
        this.removeEvent();
    };
    DialogPanel.prototype.initEvent = function () {
        M_1.default.event.register(Event_1.Event.UI.ChangeScene, this.onSceneChanged, this);
    };
    DialogPanel.prototype.removeEvent = function () {
        M_1.default.event.unRegister(Event_1.Event.UI.ChangeScene, this.onSceneChanged, this);
    };
    DialogPanel.prototype._clearDisplay = function () {
        if (this.curData && this.curData.type == UIData_1.UIHudDef.SelectShowTarget) {
            this.node.getChildByName('lab_lv').getComponent(cc.Label).string = '';
        }
    };
    DialogPanel.prototype.onInit = function (params) {
        if (params) {
            this.curData = params;
            switch (params.type) {
                case UIData_1.UIHudDef.GameOverWin:
                    EventMgr_1.default.ins.send(Event_1.Event.Sound.PlaySoundEff, AudioCtrl_1.AudioID.GameWin);
                    this.fillGameWinData();
                    break;
                case UIData_1.UIHudDef.SelectShowTarget:
                    this.fillShowSelectTargetData(params.data);
                    this.node.getChildByName('propContent').getComponent(SelectPropCtrl_1.default).init();
                    break;
                case UIData_1.UIHudDef.GameShowTarget:
                    EventMgr_1.default.ins.send(Event_1.Event.Sound.PlaySoundEff, AudioCtrl_1.AudioID.GameShowTarget);
                    this.fillShowTargetData();
                    this.initShowTargetContent(params.data.collect);
                    break;
                case UIData_1.UIHudDef.GameOverFail:
                    EventMgr_1.default.ins.send(Event_1.Event.Sound.PlaySoundEff, AudioCtrl_1.AudioID.GameFail);
                    this.fillGameFailData();
                    this.initShowTargetContent(params.data);
                    break;
                case UIData_1.UIHudDef.GamePause:
                    this.initSoundOpt();
                    break;
            }
        }
    };
    DialogPanel.prototype.onHide = function () {
        _super.prototype.onHide.call(this);
        this._animation && this._animation.stop();
        this._clearDisplay();
    };
    DialogPanel.prototype.onShow = function (closeCallBack) {
        _super.prototype.onShow.call(this, closeCallBack);
        this.initAnimation();
        this.playAnimation();
    };
    DialogPanel.prototype.onUILoad = function () {
    };
    DialogPanel.prototype.onStartGame = function () {
        UIMgr_1.default.ins.hideUI(UIData_1.UIHudDef.MenuPanel);
        this.hide();
        M_1.default.event.send(Event_1.Event.Sound.PlaySoundEff, AudioCtrl_1.AudioID.StartGame);
        if (Common_1.default.curScene == Constant_1.Scene.Match) {
            M_1.default.event.send(Event_1.Event.GameCMD.GameReset);
        }
        else {
            UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.GameLoading, null, function () {
                cc.director.preloadScene(Constant_1.Scene.Match, function (completedCount, totalCount, item) {
                    EventMgr_1.default.ins.send(Event_1.Event.UI.UpdateTmpLoadingProgress, Math.ceil((completedCount / totalCount) * 50));
                }, function () {
                    M_1.default.runtime.SelectLevel = 0;
                    Common_1.default.jumpScene(Constant_1.Scene.Match);
                    //进入关卡，设置每个指定id的关卡的失败步数为0
                    StorageMgr_1.StorageMgr.Storage.setInt(Constant_1.NativeKey.LevelFailTag, 0);
                });
            });
        }
    };
    DialogPanel.prototype.onGameOverClose = function () {
        if (this.curData && this.curData.type == UIData_1.UIHudDef.GameOverWin) {
            this.onGameOverNext();
        }
        else {
            this.onGameOverRestart();
        }
    };
    DialogPanel.prototype.onGameOverRestart = function () {
        var currentType = this.curData && this.curData.type;
        M_1.default.runtime.SelectLevel = M_1.default.runtime.CurLevel;
        currentType != null ? UIMgr_1.default.ins.hideUI(currentType, this.resetMatch3Scene.bind(this)) : this.resetMatch3Scene();
    };
    DialogPanel.prototype.onGameOverNext = function () {
        // console.error("GudieUtis", GuideUtils.curGuideId);
        if (GuideUtils_1.GuideUtils.curGuideId != -1)
            return;
        var curLevel = M_1.default.runtime.CurLevel;
        GuideUtils_1.GuideUtils.onMatch3Next(curLevel);
        M_1.default.runtime.SelectLevel = 0;
        var currentType = this.curData && this.curData.type;
        currentType != null ? UIMgr_1.default.ins.hideUI(currentType, this.resetMatch3Scene.bind(this)) : this.resetMatch3Scene();
        // if (M.runtime.isPowerEnough()) {
        //     M.runtime.addCurrency(CurrencyId.Power, -PowerConfig.LvConsumption);
        //     UIMgr.ins.hideUI(this.curData.type);
        //     M.event.send(Event.UI.ChangeScene);
        //     this.resetMatch3Scene();
        // } else {
        //     M.tips.show(WaringTips.PowerNotEnough);
        // }
    };
    //关卡分享
    DialogPanel.prototype.onGameShare = function () {
        var level = M_1.default.runtime.CurLevel;
        var shareConfig = ShareMgr_1.default.ins.getConfig(level, "level");
        if (shareConfig) {
            var bottom = this.node.getChildByName('bottom');
            if (bottom) {
                var ButtonShare_1 = bottom.getChildByName("ButtonShare");
                ButtonShare_1 && ShareMgr_1.default.ins.doShareLevel(level, function () {
                    ButtonShare_1 && (ButtonShare_1.active = false);
                });
            }
        }
    };
    DialogPanel.prototype.onShowGameTargetOver = function () {
        UIMgr_1.default.ins.hideUI(UIData_1.UIHudDef.GameShowTarget);
    };
    DialogPanel.prototype.onBgmOptChanged = function (opt) {
        console.error('onBgmOptChanged:', opt);
        M_1.default.event.send(Event_1.Event.Sound.UpdateOpt, 'bgm', opt);
    };
    DialogPanel.prototype.resetMatch3Scene = function () {
        M_1.default.event.send(Event_1.Event.GameCMD.GameReset);
    };
    DialogPanel.prototype.onEffSoundOptChanged = function (opt) {
        console.error('onEffSoundOptChanged:', opt);
        M_1.default.event.send(Event_1.Event.Sound.UpdateOpt, 'eff', opt);
    };
    DialogPanel.prototype.onSceneChanged = function () {
        this.hide();
        this.unscheduleAllCallbacks();
        this.node.stopAllActions();
    };
    DialogPanel.prototype.initAnimation = function () {
        if (!this._animation) {
            this._animation = this.getComponent(cc.Animation);
            if (this._animation) {
                this._animation.stop();
                this._animation.on('stop', this.onAnimationStop, this);
            }
        }
    };
    DialogPanel.prototype.initSoundOpt = function () {
        var opt = StorageMgr_1.StorageMgr.Storage.getObject(Constant_1.NativeKey.Sound, { eff: false, bgm: true });
        var bgmBtn = this.node.getChildByName('bgm').getComponent(SlideButton_1.default);
        var effBtn = this.node.getChildByName('eff').getComponent(SlideButton_1.default);
        bgmBtn.onChange(null, opt['bgm']);
        effBtn.onChange(null, opt['eff']);
    };
    DialogPanel.prototype.onAnimationFrameEvent = function () {
        //console.error('play get start sound : ', Date.now());
        EventMgr_1.default.ins.send(Event_1.Event.Sound.PlaySoundEff, AudioCtrl_1.AudioID.GetStar);
    };
    DialogPanel.prototype.onAnimationStop = function (eventName, aniState) {
        switch (aniState.name) {
            case 'gameWin':
                this._animation.play("star" + (this.curData.data || 0));
                break;
            case 'overShow':
                this.scheduleOnce(this.hide.bind(this), 0.3);
                break;
        }
    };
    DialogPanel.prototype.hide = function () {
        UIMgr_1.default.ins.hideUI(this.curData.type);
        this.unscheduleAllCallbacks();
    };
    DialogPanel.prototype.goMainScene = function () {
        M_1.default.runtime.SelectLevel = 0;
        this.resetMatch3Scene();
    };
    DialogPanel.prototype.playAnimation = function () {
        this._animation && this._animation.play();
    };
    DialogPanel.prototype.fillShowSelectTargetData = function (lv) {
        GuideUtils_1.GuideUtils.onMatch3SelectShowTarget(lv);
        M_1.default.runtime.SelectLevel = lv = lv || M_1.default.runtime.getMatch3Level();
        this.setLv(this.node.getChildByName('lab_lv'), lv, '');
        var lvData = RuntimeMgr_1.default.ins.getNativeLvData(lv);
        var parent = this.node.getChildByName('starContent');
        for (var i = 1; i <= 3; ++i) {
            parent.getChildByName(i.toString()).active = lvData.star >= i;
        }
        //init tips!
    };
    DialogPanel.prototype.fillShowTargetData = function () {
        var cfg = M_1.default.table.Titles.getByPrimaryKey(M_1.default.runtime.CurLevel);
        if (cfg && cfg.showTargetContent) {
            cc.find('kunag/di/title', this.node).getComponent(cc.Label).string = cfg.showTargetContent;
        }
        // this.setLv(this.node.getChildByName('lab_lv'));
        this.unscheduleAllCallbacks();
        this.scheduleOnce(this.hide.bind(this), 2);
    };
    DialogPanel.prototype.fillGameFailData = function () {
        this.runContinueAction();
        this.setLv2(this.node.getChildByName('lab_lv'));
        GuideUtils_1.GuideUtils.onMatch3Over(M_1.default.runtime.CurLevel, false);
    };
    DialogPanel.prototype.fillGameWinData = function () {
        var _this = this;
        var score = this.node.getChildByName('lab_score').getComponent(cc.Label);
        var bestScore = this.node.getChildByName('lab_best').getComponent(cc.Label);
        var curLevel = M_1.default.runtime.CurLevel;
        this.runContinueAction();
        this.setLv2(this.node.getChildByName('lab_lv'));
        var data = M_1.default.runtime.getNativeLvData();
        score.string = M_1.default.runtime.currentScore + '';
        bestScore.string = (data.score || M_1.default.runtime.currentScore) + '';
        var configInfo = M_1.default.table.LevelUpReward.getByPrimaryKey(curLevel);
        if (configInfo && configInfo.rewards) {
            this.content.removeAllChildren();
            configInfo.rewards.forEach(function (item) {
                var count = item.count;
                if (item.type == BaseConst_1.CurrencyId.Coin) {
                    count = Common_1.default.bytesToSize(count);
                }
                var node = M_1.default.nodePool.createItem(_this.collectPrefab);
                node.parent = _this.content;
                node.getComponent(cc.Sprite).spriteFrame = _this.frames[item.type];
                node.getChildByName('count').getComponent(cc.Label).string = "x" + count;
            });
        }
        var shareConfig = ShareMgr_1.default.ins.getConfig(curLevel, "level");
        if (shareConfig) {
            var bottom = this.node.getChildByName('bottom');
            if (bottom) {
                var ButtonShare = bottom.getChildByName("ButtonShare");
                ButtonShare && (ButtonShare.active = true);
            }
        }
    };
    DialogPanel.prototype.runContinueAction = function () {
        var node = cc.find('bottom/continue', this.node);
        if (node) {
            var a0 = cc.scaleTo(0.5, 1.1);
            var a1 = cc.scaleTo(0.5, 1);
            node.runAction(cc.repeatForever(cc.sequence(a0, a1)));
        }
    };
    DialogPanel.prototype.setLv = function (node, lv, content) {
        if (lv === void 0) { lv = 0; }
        if (content === void 0) { content = '关卡'; }
        node.getComponent(cc.Label).string = "" + content + (lv || RuntimeMgr_1.default.ins.CurLevel);
    };
    DialogPanel.prototype.setLv2 = function (node, lv, content) {
        if (lv === void 0) { lv = 0; }
        if (content === void 0) { content = '第'; }
        node.getComponent(cc.Label).string = "" + content + (lv || RuntimeMgr_1.default.ins.CurLevel) + "关";
    };
    DialogPanel.prototype.initShowTargetContent = function (data) {
        var _this = this;
        if (data) {
            this.content.destroyAllChildren();
            data.forEach(function (data) {
                var collect = M_1.default.nodePool.createItem(_this.collectPrefab);
                var itemCtrl = collect.getComponent(CollectItemCtrl_1.default);
                collect.parent = _this.content;
                itemCtrl.init(data.type, data.count);
            });
        }
    };
    __decorate([
        property(cc.Node)
    ], DialogPanel.prototype, "content", void 0);
    __decorate([
        property(cc.Prefab)
    ], DialogPanel.prototype, "collectPrefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], DialogPanel.prototype, "frames", void 0);
    DialogPanel = __decorate([
        ccclass
    ], DialogPanel);
    return DialogPanel;
}(UIBase_1.default));
exports.default = DialogPanel;

cc._RF.pop();