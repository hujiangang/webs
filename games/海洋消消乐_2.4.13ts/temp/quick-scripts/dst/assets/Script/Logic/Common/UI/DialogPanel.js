
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/DialogPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcRGlhbG9nUGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXdDO0FBQ3hDLGtEQUE2QztBQUM3QyxxREFBZ0Q7QUFDaEQsc0RBQXVEO0FBQ3ZELHdFQUFtRTtBQUNuRSxnREFBK0M7QUFHL0Msc0RBQW9HO0FBQ3BHLHlFQUFvRTtBQUNwRSxvREFBK0M7QUFDL0Msb0NBQStCO0FBQy9CLDJEQUFzRDtBQUN0RCxxREFBcUQ7QUFDckQsc0VBQWlFO0FBQ2pFLCtEQUE4RDtBQUM5RCw4REFBNkQ7QUFDN0QsMkRBQXNEO0FBQ3RELDBDQUF1QztBQUVqQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5QywrQkFBTTtJQUEvQztRQUFBLHFFQTBVQztRQXZVRyxhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBR2hDLFlBQU0sR0FBcUIsRUFBRSxDQUFDO1FBR3RCLGFBQU8sR0FBNkIsSUFBSSxDQUFDO1FBRXpDLGdCQUFVLEdBQWlCLElBQUksQ0FBQzs7SUE0VDVDLENBQUM7SUExVEcsNEJBQU0sR0FBTjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsK0JBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRXZCLENBQUM7SUFFTywrQkFBUyxHQUFqQjtRQUNJLFdBQUMsQ0FBQyxLQUFLLENBQUMsUUFB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ImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IFVJQmFzZSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VSS9VSUJhc2VcIjtcbmltcG9ydCBVSU1nciBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL1VJTWdyXCI7XG5pbXBvcnQgeyBVSUh1ZERlZiB9IGZyb20gXCIuLi8uLi9EYXRhL0ludGVyZmFjZS9VSURhdGFcIjtcbmltcG9ydCBDb2xsZWN0SXRlbUN0cmwgZnJvbSBcIi4uLy4uL01hdGNoMy9WaWV3L1VJL0NvbGxlY3RJdGVtQ3RybFwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IHsgQ29sbGVjdCB9IGZyb20gXCIuLi8uLi9EYXRhL0ludGVyZmFjZS9MZXZlbC9JTGV2ZWxcIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VdGlscy9VdGlsXCI7XG5pbXBvcnQgeyBOYXRpdmVLZXksIFNjZW5lLCBQb3dlckNvbmZpZywgV2FyaW5nVGlwcywgU2NlbmVUYXNrS2V5IH0gZnJvbSAnLi4vLi4vRGF0YS9Db25zdC9Db25zdGFudCc7XG5pbXBvcnQgU2xpZGVCdXR0b24gZnJvbSAnLi4vLi4vLi4vQmFzZS9DdXN0b21Db21wb25lbnQvU2xpZGVCdXR0b24nO1xuaW1wb3J0IFJ1bnRpbWVNZ3IgZnJvbSAnLi4vLi4vRGF0YS9SdW50aW1lTWdyJztcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uL0NvbW1vblwiO1xuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvRXZlbnRNZ3JcIjtcbmltcG9ydCB7IEN1cnJlbmN5SWQgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9CYXNlQ29uc3RcIjtcbmltcG9ydCBTZWxlY3RQcm9wQ3RybCBmcm9tIFwiLi4vLi4vTWF0Y2gzL1ZpZXcvVUkvU2VsZWN0UHJvcEN0cmxcIjtcbmltcG9ydCB7IFN0b3JhZ2VNZ3IgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL1N0b3JhZ2VNZ3JcIjtcbmltcG9ydCB7IEd1aWRlVXRpbHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vR29kR3VpZGUvR3VpZGVVdGlsc1wiO1xuaW1wb3J0IFNoYXJlTWdyIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvU2hhcmVNZ3JcIjtcbmltcG9ydCB7IEF1ZGlvSUQgfSBmcm9tIFwiLi4vQXVkaW9DdHJsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaWFsb2dQYW5lbCBleHRlbmRzIFVJQmFzZSB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBjb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgY29sbGVjdFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIGZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG5cbiAgICBwcml2YXRlIGN1ckRhdGE6IHsgdHlwZTogYW55LCBkYXRhOiBhbnkgfSA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9hbmltYXRpb246IGNjLkFuaW1hdGlvbiA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLmluaXRFdmVudCgpO1xuICAgICAgICB0aGlzLmluaXRBbmltYXRpb24oKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudCgpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RXZlbnQoKSB7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuVUkuQ2hhbmdlU2NlbmUsIHRoaXMub25TY2VuZUNoYW5nZWQsIHRoaXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRXZlbnQoKSB7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5VSS5DaGFuZ2VTY2VuZSwgdGhpcy5vblNjZW5lQ2hhbmdlZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2xlYXJEaXNwbGF5KCkge1xuICAgICAgICBpZiAodGhpcy5jdXJEYXRhICYmIHRoaXMuY3VyRGF0YS50eXBlID09IFVJSHVkRGVmLlNlbGVjdFNob3dUYXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGFiX2x2JykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkluaXQocGFyYW1zOiB7IHR5cGU6IGFueSwgZGF0YTogYW55IH0pIHtcbiAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5jdXJEYXRhID0gcGFyYW1zO1xuICAgICAgICAgICAgc3dpdGNoIChwYXJhbXMudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgVUlIdWREZWYuR2FtZU92ZXJXaW46XG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWdyLmlucy5zZW5kKEV2ZW50LlNvdW5kLlBsYXlTb3VuZEVmZiwgQXVkaW9JRC5HYW1lV2luKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxsR2FtZVdpbkRhdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBVSUh1ZERlZi5TZWxlY3RTaG93VGFyZ2V0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGxTaG93U2VsZWN0VGFyZ2V0RGF0YShwYXJhbXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncHJvcENvbnRlbnQnKS5nZXRDb21wb25lbnQoU2VsZWN0UHJvcEN0cmwpLmluaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBVSUh1ZERlZi5HYW1lU2hvd1RhcmdldDpcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuU291bmQuUGxheVNvdW5kRWZmLCBBdWRpb0lELkdhbWVTaG93VGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxsU2hvd1RhcmdldERhdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0U2hvd1RhcmdldENvbnRlbnQocGFyYW1zLmRhdGEuY29sbGVjdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgVUlIdWREZWYuR2FtZU92ZXJGYWlsOlxuICAgICAgICAgICAgICAgICAgICBFdmVudE1nci5pbnMuc2VuZChFdmVudC5Tb3VuZC5QbGF5U291bmRFZmYsIEF1ZGlvSUQuR2FtZUZhaWwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGxHYW1lRmFpbERhdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0U2hvd1RhcmdldENvbnRlbnQocGFyYW1zLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFVJSHVkRGVmLkdhbWVQYXVzZTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0U291bmRPcHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25IaWRlKCkge1xuICAgICAgICBzdXBlci5vbkhpZGUoKTtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uICYmIHRoaXMuX2FuaW1hdGlvbi5zdG9wKCk7XG4gICAgICAgIHRoaXMuX2NsZWFyRGlzcGxheSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblNob3coY2xvc2VDYWxsQmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIHN1cGVyLm9uU2hvdyhjbG9zZUNhbGxCYWNrKTtcbiAgICAgICAgdGhpcy5pbml0QW5pbWF0aW9uKCk7XG4gICAgICAgIHRoaXMucGxheUFuaW1hdGlvbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblVJTG9hZCgpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBvblN0YXJ0R2FtZSgpIHtcbiAgICAgICAgVUlNZ3IuaW5zLmhpZGVVSShVSUh1ZERlZi5NZW51UGFuZWwpXG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuU291bmQuUGxheVNvdW5kRWZmLCBBdWRpb0lELlN0YXJ0R2FtZSk7XG5cbiAgICAgICAgaWYgKENvbW1vbi5jdXJTY2VuZSA9PSBTY2VuZS5NYXRjaCkge1xuICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LkdhbWVDTUQuR2FtZVJlc2V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuR2FtZUxvYWRpbmcsIG51bGwsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoU2NlbmUuTWF0Y2gsIChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBFdmVudE1nci5pbnMuc2VuZChFdmVudC5VSS5VcGRhdGVUbXBMb2FkaW5nUHJvZ3Jlc3MsIE1hdGguY2VpbCgoY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50KSAqIDUwKSk7XG4gICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBNLnJ1bnRpbWUuU2VsZWN0TGV2ZWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICBDb21tb24uanVtcFNjZW5lKFNjZW5lLk1hdGNoKTtcblxuICAgICAgICAgICAgICAgICAgICAvL+i/m+WFpeWFs+WNoe+8jOiuvue9ruavj+S4quaMh+Wummlk55qE5YWz5Y2h55qE5aSx6LSl5q2l5pWw5Li6MFxuICAgICAgICAgICAgICAgICAgICBTdG9yYWdlTWdyLlN0b3JhZ2Uuc2V0SW50KE5hdGl2ZUtleS5MZXZlbEZhaWxUYWcsIDApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25HYW1lT3ZlckNsb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5jdXJEYXRhICYmIHRoaXMuY3VyRGF0YS50eXBlID09IFVJSHVkRGVmLkdhbWVPdmVyV2luKSB7XG4gICAgICAgICAgICB0aGlzLm9uR2FtZU92ZXJOZXh0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uR2FtZU92ZXJSZXN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25HYW1lT3ZlclJlc3RhcnQoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUeXBlID0gdGhpcy5jdXJEYXRhICYmIHRoaXMuY3VyRGF0YS50eXBlO1xuICAgICAgICBNLnJ1bnRpbWUuU2VsZWN0TGV2ZWwgPSBNLnJ1bnRpbWUuQ3VyTGV2ZWw7XG4gICAgICAgIGN1cnJlbnRUeXBlICE9IG51bGwgPyBVSU1nci5pbnMuaGlkZVVJKGN1cnJlbnRUeXBlLCB0aGlzLnJlc2V0TWF0Y2gzU2NlbmUuYmluZCh0aGlzKSkgOiB0aGlzLnJlc2V0TWF0Y2gzU2NlbmUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25HYW1lT3Zlck5leHQoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJHdWRpZVV0aXNcIiwgR3VpZGVVdGlscy5jdXJHdWlkZUlkKTtcbiAgICAgICAgaWYgKEd1aWRlVXRpbHMuY3VyR3VpZGVJZCAhPSAtMSkgcmV0dXJuO1xuICAgICAgICBsZXQgY3VyTGV2ZWwgPSBNLnJ1bnRpbWUuQ3VyTGV2ZWw7XG4gICAgICAgIEd1aWRlVXRpbHMub25NYXRjaDNOZXh0KGN1ckxldmVsKTtcbiAgICAgICAgTS5ydW50aW1lLlNlbGVjdExldmVsID0gMDtcbiAgICAgICAgY29uc3QgY3VycmVudFR5cGUgPSB0aGlzLmN1ckRhdGEgJiYgdGhpcy5jdXJEYXRhLnR5cGU7XG4gICAgICAgIGN1cnJlbnRUeXBlICE9IG51bGwgPyBVSU1nci5pbnMuaGlkZVVJKGN1cnJlbnRUeXBlLCB0aGlzLnJlc2V0TWF0Y2gzU2NlbmUuYmluZCh0aGlzKSkgOiB0aGlzLnJlc2V0TWF0Y2gzU2NlbmUoKTtcblxuXG4gICAgICAgIC8vIGlmIChNLnJ1bnRpbWUuaXNQb3dlckVub3VnaCgpKSB7XG4gICAgICAgIC8vICAgICBNLnJ1bnRpbWUuYWRkQ3VycmVuY3koQ3VycmVuY3lJZC5Qb3dlciwgLVBvd2VyQ29uZmlnLkx2Q29uc3VtcHRpb24pO1xuICAgICAgICAvLyAgICAgVUlNZ3IuaW5zLmhpZGVVSSh0aGlzLmN1ckRhdGEudHlwZSk7XG4gICAgICAgIC8vICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuVUkuQ2hhbmdlU2NlbmUpO1xuICAgICAgICAvLyAgICAgdGhpcy5yZXNldE1hdGNoM1NjZW5lKCk7XG4gICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICBNLnRpcHMuc2hvdyhXYXJpbmdUaXBzLlBvd2VyTm90RW5vdWdoKTtcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIC8v5YWz5Y2h5YiG5LqrXG4gICAgcHVibGljIG9uR2FtZVNoYXJlKCkge1xuICAgICAgICBjb25zdCBsZXZlbCA9IE0ucnVudGltZS5DdXJMZXZlbDtcbiAgICAgICAgbGV0IHNoYXJlQ29uZmlnID0gU2hhcmVNZ3IuaW5zLmdldENvbmZpZyhsZXZlbCwgXCJsZXZlbFwiKTtcbiAgICAgICAgaWYgKHNoYXJlQ29uZmlnKSB7XG4gICAgICAgICAgICBjb25zdCBib3R0b20gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JvdHRvbScpO1xuICAgICAgICAgICAgaWYgKGJvdHRvbSkge1xuICAgICAgICAgICAgICAgIGxldCBCdXR0b25TaGFyZSA9IGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIkJ1dHRvblNoYXJlXCIpXG4gICAgICAgICAgICAgICAgQnV0dG9uU2hhcmUgJiYgU2hhcmVNZ3IuaW5zLmRvU2hhcmVMZXZlbChsZXZlbCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBCdXR0b25TaGFyZSAmJiAoQnV0dG9uU2hhcmUuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2hvd0dhbWVUYXJnZXRPdmVyKCkge1xuICAgICAgICBVSU1nci5pbnMuaGlkZVVJKFVJSHVkRGVmLkdhbWVTaG93VGFyZ2V0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25CZ21PcHRDaGFuZ2VkKG9wdDogYm9vbGVhbikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdvbkJnbU9wdENoYW5nZWQ6Jywgb3B0KTtcbiAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LlNvdW5kLlVwZGF0ZU9wdCwgJ2JnbScsIG9wdCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlc2V0TWF0Y2gzU2NlbmUoKSB7XG4gICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5HYW1lQ01ELkdhbWVSZXNldCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uRWZmU291bmRPcHRDaGFuZ2VkKG9wdDogYm9vbGVhbikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdvbkVmZlNvdW5kT3B0Q2hhbmdlZDonLCBvcHQpO1xuICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuU291bmQuVXBkYXRlT3B0LCAnZWZmJywgb3B0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU2NlbmVDaGFuZ2VkKCkge1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEFuaW1hdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbmltYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbiA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgICAgICBpZiAodGhpcy5fYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRpb24ub24oJ3N0b3AnLCA8YW55PnRoaXMub25BbmltYXRpb25TdG9wLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFNvdW5kT3B0KCkge1xuICAgICAgICBjb25zdCBvcHQgPSBTdG9yYWdlTWdyLlN0b3JhZ2UuZ2V0T2JqZWN0KE5hdGl2ZUtleS5Tb3VuZCwgeyBlZmY6IGZhbHNlLCBiZ206IHRydWUgfSk7XG4gICAgICAgIGNvbnN0IGJnbUJ0biA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmdtJykuZ2V0Q29tcG9uZW50KFNsaWRlQnV0dG9uKTtcbiAgICAgICAgY29uc3QgZWZmQnRuID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdlZmYnKS5nZXRDb21wb25lbnQoU2xpZGVCdXR0b24pO1xuICAgICAgICBiZ21CdG4ub25DaGFuZ2UobnVsbCwgb3B0WydiZ20nXSk7XG4gICAgICAgIGVmZkJ0bi5vbkNoYW5nZShudWxsLCBvcHRbJ2VmZiddKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25BbmltYXRpb25GcmFtZUV2ZW50KCkge1xuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoJ3BsYXkgZ2V0IHN0YXJ0IHNvdW5kIDogJywgRGF0ZS5ub3coKSk7XG4gICAgICAgIEV2ZW50TWdyLmlucy5zZW5kKEV2ZW50LlNvdW5kLlBsYXlTb3VuZEVmZiwgQXVkaW9JRC5HZXRTdGFyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQW5pbWF0aW9uU3RvcChldmVudE5hbWU6IHN0cmluZywgYW5pU3RhdGU6IGNjLkFuaW1hdGlvblN0YXRlKSB7XG4gICAgICAgIHN3aXRjaCAoYW5pU3RhdGUubmFtZSkge1xuICAgICAgICAgICAgY2FzZSAnZ2FtZVdpbic6XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoYHN0YXIke3RoaXMuY3VyRGF0YS5kYXRhIHx8IDB9YCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdvdmVyU2hvdyc6XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5oaWRlLmJpbmQodGhpcyksIDAuMyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGlkZSgpIHtcbiAgICAgICAgVUlNZ3IuaW5zLmhpZGVVSSh0aGlzLmN1ckRhdGEudHlwZSk7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ29NYWluU2NlbmUoKSB7XG4gICAgICAgIE0ucnVudGltZS5TZWxlY3RMZXZlbCA9IDA7XG4gICAgICAgIHRoaXMucmVzZXRNYXRjaDNTY2VuZSgpO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBwbGF5QW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLl9hbmltYXRpb24gJiYgdGhpcy5fYW5pbWF0aW9uLnBsYXkoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbGxTaG93U2VsZWN0VGFyZ2V0RGF0YShsdjogbnVtYmVyKSB7XG4gICAgICAgIEd1aWRlVXRpbHMub25NYXRjaDNTZWxlY3RTaG93VGFyZ2V0KGx2KTtcblxuICAgICAgICBNLnJ1bnRpbWUuU2VsZWN0TGV2ZWwgPSBsdiA9IGx2IHx8IE0ucnVudGltZS5nZXRNYXRjaDNMZXZlbCgpO1xuICAgICAgICB0aGlzLnNldEx2KHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGFiX2x2JyksIGx2LCAnJyk7XG5cblxuICAgICAgICBjb25zdCBsdkRhdGEgPSBSdW50aW1lTWdyLmlucy5nZXROYXRpdmVMdkRhdGEobHYpO1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3N0YXJDb250ZW50Jyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDM7ICsraSkge1xuICAgICAgICAgICAgcGFyZW50LmdldENoaWxkQnlOYW1lKGkudG9TdHJpbmcoKSkuYWN0aXZlID0gbHZEYXRhLnN0YXIgPj0gaTtcbiAgICAgICAgfVxuICAgICAgICAvL2luaXQgdGlwcyFcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbGxTaG93VGFyZ2V0RGF0YSgpIHtcbiAgICAgICAgY29uc3QgY2ZnID0gTS50YWJsZS5UaXRsZXMuZ2V0QnlQcmltYXJ5S2V5KE0ucnVudGltZS5DdXJMZXZlbCk7XG4gICAgICAgIGlmIChjZmcgJiYgY2ZnLnNob3dUYXJnZXRDb250ZW50KSB7XG4gICAgICAgICAgICBjYy5maW5kKCdrdW5hZy9kaS90aXRsZScsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBjZmcuc2hvd1RhcmdldENvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5zZXRMdih0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2xhYl9sdicpKTtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuaGlkZS5iaW5kKHRoaXMpLCAyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbGxHYW1lRmFpbERhdGEoKSB7XG4gICAgICAgIHRoaXMucnVuQ29udGludWVBY3Rpb24oKTtcbiAgICAgICAgdGhpcy5zZXRMdjIodGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsYWJfbHYnKSk7XG4gICAgICAgIEd1aWRlVXRpbHMub25NYXRjaDNPdmVyKE0ucnVudGltZS5DdXJMZXZlbCwgZmFsc2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmlsbEdhbWVXaW5EYXRhKCkge1xuICAgICAgICBjb25zdCBzY29yZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGFiX3Njb3JlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgY29uc3QgYmVzdFNjb3JlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsYWJfYmVzdCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIGNvbnN0IGN1ckxldmVsID0gTS5ydW50aW1lLkN1ckxldmVsO1xuICAgICAgICB0aGlzLnJ1bkNvbnRpbnVlQWN0aW9uKCk7XG4gICAgICAgIHRoaXMuc2V0THYyKHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGFiX2x2JykpO1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSBNLnJ1bnRpbWUuZ2V0TmF0aXZlTHZEYXRhKCk7XG4gICAgICAgIHNjb3JlLnN0cmluZyA9IE0ucnVudGltZS5jdXJyZW50U2NvcmUgKyAnJztcbiAgICAgICAgYmVzdFNjb3JlLnN0cmluZyA9IChkYXRhLnNjb3JlIHx8IE0ucnVudGltZS5jdXJyZW50U2NvcmUpICsgJyc7XG5cbiAgICAgICAgY29uc3QgY29uZmlnSW5mbyA9IE0udGFibGUuTGV2ZWxVcFJld2FyZC5nZXRCeVByaW1hcnlLZXkoY3VyTGV2ZWwpO1xuICAgICAgICBpZiAoY29uZmlnSW5mbyAmJiBjb25maWdJbmZvLnJld2FyZHMpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgICAgICAgICAgY29uZmlnSW5mby5yZXdhcmRzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvdW50OiBhbnkgPSBpdGVtLmNvdW50O1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT0gQ3VycmVuY3lJZC5Db2luKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ID0gQ29tbW9uLmJ5dGVzVG9TaXplKGNvdW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IE0ubm9kZVBvb2wuY3JlYXRlSXRlbSh0aGlzLmNvbGxlY3RQcmVmYWIpO1xuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5jb250ZW50O1xuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmZyYW1lc1tpdGVtLnR5cGVdO1xuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NvdW50JykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgeCR7Y291bnR9YDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2hhcmVDb25maWcgPSBTaGFyZU1nci5pbnMuZ2V0Q29uZmlnKGN1ckxldmVsLCBcImxldmVsXCIpO1xuICAgICAgICBpZiAoc2hhcmVDb25maWcpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYm90dG9tJyk7XG4gICAgICAgICAgICBpZiAoYm90dG9tKSB7XG4gICAgICAgICAgICAgICAgbGV0IEJ1dHRvblNoYXJlID0gYm90dG9tLmdldENoaWxkQnlOYW1lKFwiQnV0dG9uU2hhcmVcIilcbiAgICAgICAgICAgICAgICBCdXR0b25TaGFyZSAmJiAoQnV0dG9uU2hhcmUuYWN0aXZlID0gdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJ1bkNvbnRpbnVlQWN0aW9uKCkge1xuICAgICAgICBjb25zdCBub2RlID0gY2MuZmluZCgnYm90dG9tL2NvbnRpbnVlJywgdGhpcy5ub2RlKTtcbiAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGEwID0gY2Muc2NhbGVUbygwLjUsIDEuMSk7XG4gICAgICAgICAgICBjb25zdCBhMSA9IGNjLnNjYWxlVG8oMC41LCAxKTtcbiAgICAgICAgICAgIG5vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoYTAsIGExKSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRMdihub2RlOiBjYy5Ob2RlLCBsdjogbnVtYmVyID0gMCwgY29udGVudDogc3RyaW5nID0gJ+WFs+WNoScpIHtcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGAke2NvbnRlbnR9JHtsdiB8fCBSdW50aW1lTWdyLmlucy5DdXJMZXZlbH1gO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBzZXRMdjIobm9kZTogY2MuTm9kZSwgbHY6IG51bWJlciA9IDAsIGNvbnRlbnQ6IHN0cmluZyA9ICfnrKwnKSB7XG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBgJHtjb250ZW50fSR7bHYgfHwgUnVudGltZU1nci5pbnMuQ3VyTGV2ZWx9JHtcIuWFs1wifWA7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGluaXRTaG93VGFyZ2V0Q29udGVudChkYXRhOiBDb2xsZWN0W10pIHtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbGxlY3QgPSBNLm5vZGVQb29sLmNyZWF0ZUl0ZW0odGhpcy5jb2xsZWN0UHJlZmFiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtQ3RybCA9IGNvbGxlY3QuZ2V0Q29tcG9uZW50KENvbGxlY3RJdGVtQ3RybCk7XG4gICAgICAgICAgICAgICAgY29sbGVjdC5wYXJlbnQgPSB0aGlzLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgaXRlbUN0cmwuaW5pdChkYXRhLnR5cGUsIGRhdGEuY291bnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=