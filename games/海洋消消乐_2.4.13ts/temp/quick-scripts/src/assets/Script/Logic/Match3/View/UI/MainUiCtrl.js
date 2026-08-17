"use strict";
cc._RF.push(module, '6c69bLGHLpD0ZesIClYcPLN', 'MainUiCtrl');
// Script/Logic/Match3/View/UI/MainUiCtrl.ts

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
var PropCtrl_1 = require("./PropCtrl");
var InfoPanelCtrl_1 = require("./InfoPanelCtrl");
var M_1 = require("../../../../Base/Manager/M");
var Event_1 = require("../../../Data/Const/Event");
var UIMgr_1 = require("../../../../Base/Manager/UIMgr");
var UIData_1 = require("../../../Data/Interface/UIData");
var Constant_1 = require("../../../Data/Const/Constant");
var Util_1 = require("../../../../Base/Utils/Util");
var Common_1 = require("../../../Common/Common");
var ReportMgr_1 = require("../../../../Base/Manager/ReportMgr");
var Apps_1 = require("../../../../Base/Apps");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MainUiCtrl = /** @class */ (function (_super) {
    __extends(MainUiCtrl, _super);
    function MainUiCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.topBar = null;
        _this.bottomBar = null;
        _this.propBar = null;
        _this.centerBar = null;
        _this.dotPrefab = null;
        _this.scoreBar = null;
        _this.scoreNode = null;
        _this.tmpTestPropShowLable = null;
        _this.version = null;
        _this._cfg = null;
        _this._mainCtrl = null;
        _this._maxScore = 0;
        /**直行进度条 */
        _this._nextStarScore = null;
        /**弧形进度条 */
        _this._scoreStarLights = null;
        _this.propCtrl = null;
        _this.infoPanelCtrl = null;
        _this.isSquareBar = false;
        return _this;
    }
    MainUiCtrl.prototype.onLoad = function () {
        this.initEvent();
        this.initSubCtrl();
        this.initView();
    };
    MainUiCtrl.prototype.onDestroy = function () {
        this.destoryEvent();
    };
    MainUiCtrl.prototype.initEvent = function () {
        M_1.default.event.register(Event_1.Event.GameCMD.PropClick, this.onUseProp, this);
        M_1.default.event.register(Event_1.Event.GameCMD.PropUsed, this.onPropOver, this);
        M_1.default.event.register(Event_1.Event.Effect.ShowDot, this.onShowDot, this);
        M_1.default.event.register(Event_1.Event.UI.AddScore, this.updateScore, this);
    };
    MainUiCtrl.prototype.destoryEvent = function () {
        M_1.default.event.unRegister(Event_1.Event.GameCMD.PropClick, this.onUseProp, this);
        M_1.default.event.unRegister(Event_1.Event.GameCMD.PropUsed, this.onPropOver, this);
        M_1.default.event.unRegister(Event_1.Event.Effect.ShowDot, this.onShowDot, this);
        M_1.default.event.unRegister(Event_1.Event.UI.AddScore, this.updateScore, this);
    };
    MainUiCtrl.prototype.init = function (mc, cfg) {
        this._cfg = cfg;
        this._mainCtrl = mc;
        this.initStarProgress(cfg.levelInfo.score);
        if (!this.infoPanelCtrl) {
            this.infoPanelCtrl = this.topBar.getComponent(InfoPanelCtrl_1.default);
        }
        this.infoPanelCtrl.init();
    };
    MainUiCtrl.prototype.initStarProgress = function (scoreCfg) {
        if (scoreCfg) {
            var starParent = this.scoreBar.node;
            var trajectory = starParent.getChildByName('trajectory');
            this._maxScore = scoreCfg[scoreCfg.length - 1];
            this._maxScore += this._maxScore * 0.15;
            this.scoreBar.progress = 0;
            if (trajectory) {
                this.isSquareBar = true;
                this._scoreStarLights = new Map();
                //算出百分比
                for (var i = 0; i < scoreCfg.length; i++) {
                    var star = this.scoreBar.node.getChildByName("star" + i);
                    var coefficient = Math.round((scoreCfg[i] / this._maxScore) * 10);
                    star.setPosition(trajectory.getChildByName("" + coefficient).position);
                    this._scoreStarLights.set(coefficient, star);
                    Common_1.default.switchGray(true, star);
                }
            }
            else {
                this.isSquareBar = false;
                this._nextStarScore = scoreCfg[0];
                this._scoreStarLights = new Map();
                for (var i = 0; i < scoreCfg.length; i++) {
                    var star = this.scoreBar.node.getChildByName("star" + i);
                    var coefficient = scoreCfg[i] / this._maxScore;
                    star.x = (starParent.width * coefficient) - starParent.width / 2;
                    Common_1.default.switchGray(true, star);
                    this._scoreStarLights.set(i, null);
                }
            }
        }
    };
    MainUiCtrl.prototype.initView = function () {
        var _this = this;
        this.version.string = Apps_1.default.Version;
        this.updateScore(0, null);
        this.centerBar.y -= M_1.default.platform.getTopBangPosition();
        this.scheduleOnce(function () {
            //延迟加载,初始状态可能会没读取到胶囊位置!
            var c = M_1.default.platform.getMenuButtonBoundingClientRect();
            if (c) {
                _this.scoreNode.setPosition(c.x + c.width / 2, c.y - 10);
                if (Util_1.Util.Tool.isIpx()) {
                    _this.scoreNode.setScale(0.8);
                    _this.centerBar.y -= c.height;
                    _this.scoreNode.y += c.height + _this.scoreNode.height;
                }
            }
        }, 0.1);
    };
    MainUiCtrl.prototype.initSubCtrl = function () {
        this.propCtrl = this.propBar.getComponent(PropCtrl_1.default);
        this.propCtrl.init();
    };
    MainUiCtrl.prototype.onUseProp = function (type) {
        switch (type) {
            case Constant_1.PropType.BeikeBomb:
            case Constant_1.PropType.Board:
            case Constant_1.PropType.Hammer:
                this.tmpTestPropShowLable.active = true;
                this.tmpTestPropShowLable.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.2, 1.1), cc.scaleTo(0.2, 1))));
                break;
        }
    };
    MainUiCtrl.prototype.onShowDot = function (type, startPoint) {
        // let count = Util.Tool.rangeInt(2, 5);
        // for (let i = count; i--;) {
        //     const dotNode = M.nodePool.getItem(NodePoolKey.Dot, this.dotPrefab);
        //     dotNode.parent = this.node;
        //     dotNode.setScale(Util.Tool.rangeInt(3, 7) / 10);
        //     // dotNode.color = cc.color(Util.Tool.rangeInt(0, 255), Util.Tool.rangeInt(0, 255), Util.Tool.rangeInt(0, 255));
        //     dotNode.setPosition(this.node.convertToNodeSpaceAR(startPoint));
        //     const targetPos = this.node.convertToNodeSpaceAR(Common.getWorldPos(this.scoreBar.node)) as cc.Vec2;
        //     // targetPos.x += this.scoreBar.node.width / 2;
        //     let moveTime = dotNode.position.sub(targetPos).mag() * (Util.Tool.rangeInt(10, 20) / 10000);
        //     const a0 = cc.moveTo(moveTime, targetPos);
        //     const a1 = cc.callFunc(() => {
        //         M.nodePool.freeItem(NodePoolKey.Dot, dotNode);
        //     })
        //     dotNode.runAction(cc.sequence(a0, a1));
        //     if (type != ElimateType.Default) {
        //         this.updateScore(ScoreConfig.SingleElimate[type], startPoint);
        //     }
        // }
    };
    MainUiCtrl.prototype.onPropOver = function () {
        this.tmpTestPropShowLable.stopAllActions();
        this.tmpTestPropShowLable.active = false;
    };
    MainUiCtrl.prototype.getLevelLabelPos = function () {
        return this.infoPanelCtrl.getLevelLabPos();
    };
    MainUiCtrl.prototype.getCollectPos = function (type) {
        return this.infoPanelCtrl.getCollectPos(type);
    };
    MainUiCtrl.prototype.getStepPos = function () {
        return this.infoPanelCtrl.getStepPos();
    };
    MainUiCtrl.prototype.onGoMapScene = function () {
        // Common.jumpScene(Scene.Map)
    };
    MainUiCtrl.prototype.onTestShowWin = function () {
        UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.GameOverWin, { type: UIData_1.UIHudDef.GameOverWin, data: 1 });
    };
    MainUiCtrl.prototype.onTestShowFail = function () {
        this.showResultDialog(false, 0, 0);
    };
    MainUiCtrl.prototype.showResultDialog = function (result, stepCount, timeCount) {
        ReportMgr_1.default.ins.reportMatchOver(M_1.default.runtime.CurLevel, result, stepCount, timeCount);
        if (result) {
            M_1.default.runtime.SelectLevel = 0;
            var starCount = 3; //this._scoreStarLights ? 3 - this._scoreStarLights.size : 0;
            var isNew = M_1.default.runtime.savaLvData(starCount);
            if (isNew) {
                //奖励!
                var info = M_1.default.table.LevelUpReward.getByPrimaryKey(M_1.default.runtime.CurLevel);
                if (info && info.rewards) {
                    info.rewards.forEach(function (item) {
                        M_1.default.runtime.addCurrency(item.type, item.count);
                    });
                }
                //判断是否有新解锁的道具
                var propInfos = M_1.default.table.PropInfo.getData();
                if (propInfos) {
                    propInfos.forEach(function (info) {
                        if (info.unlockLv == M_1.default.runtime.CurLevel) {
                            M_1.default.tips.show(Constant_1.WaringTips.UnlockProp);
                        }
                    });
                }
            }
            cc.log("调用显示成功界面");
            UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.GameOverWin, { type: UIData_1.UIHudDef.GameOverWin, data: starCount });
            M_1.default.runtime.setMatch3Level(M_1.default.runtime.CurLevel + 1);
        }
        else {
            //UIMgr.ins.showUI(UIHudDef.GameOverFail, { type: UIHudDef.GameOverFail, data: this._cfg.collect });
            cc.log("调用显示失败界面");
            UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.UIGameFailEncourage, { data: this._cfg.collect });
        }
    };
    MainUiCtrl.prototype.updateScore = function (as, pos, isOverEff) {
        if (isOverEff === void 0) { isOverEff = false; }
        if (as) {
            pos && M_1.default.event.send(Event_1.Event.Effect.AddScore, as, pos, isOverEff);
            var score = M_1.default.runtime.addScore(as);
            this.infoPanelCtrl && this.infoPanelCtrl.onUpdateInfo();
            this.updateScoreProgress(score);
        }
    };
    MainUiCtrl.prototype.showTargetDialog = function (dialogOverCallback) {
        var data = {};
        data.collect = this._cfg.collect;
        UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.GameShowTarget, { type: UIData_1.UIHudDef.GameShowTarget, data: data }, null, function () {
            dialogOverCallback();
        });
    };
    MainUiCtrl.prototype.updateScoreProgress = function (curScore) {
        var _this = this;
        if (this._cfg) {
            this.scoreBar.progress = curScore / this._maxScore;
            if (this.isSquareBar && this._scoreStarLights) {
                var coefficient_1 = Math.round(this.scoreBar.progress * 10);
                this._scoreStarLights.forEach(function (v, k) {
                    if (coefficient_1 >= k) {
                        Common_1.default.switchGray(false, v);
                        _this._scoreStarLights.delete(k);
                    }
                });
            }
            else if (this._nextStarScore && curScore >= this._nextStarScore) {
                var currentIndex = this._cfg.levelInfo.score.indexOf(this._nextStarScore);
                var star = this.scoreBar.node.getChildByName("star" + currentIndex);
                this._scoreStarLights.delete(currentIndex);
                Common_1.default.switchGray(false, star);
                this._nextStarScore = this._cfg.levelInfo.score[currentIndex + 1];
                this._nextStarScore == -1 && (this._nextStarScore = null);
            }
        }
    };
    MainUiCtrl.prototype.onOpenGM = function () {
        if (Apps_1.default.isOpenGM) {
            UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.GMView);
        }
    };
    __decorate([
        property(cc.Node)
    ], MainUiCtrl.prototype, "topBar", void 0);
    __decorate([
        property(cc.Node)
    ], MainUiCtrl.prototype, "bottomBar", void 0);
    __decorate([
        property(cc.Node)
    ], MainUiCtrl.prototype, "propBar", void 0);
    __decorate([
        property(cc.Node)
    ], MainUiCtrl.prototype, "centerBar", void 0);
    __decorate([
        property(cc.Prefab)
    ], MainUiCtrl.prototype, "dotPrefab", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], MainUiCtrl.prototype, "scoreBar", void 0);
    __decorate([
        property(cc.Node)
    ], MainUiCtrl.prototype, "scoreNode", void 0);
    __decorate([
        property(cc.Node)
    ], MainUiCtrl.prototype, "tmpTestPropShowLable", void 0);
    __decorate([
        property(cc.Label)
    ], MainUiCtrl.prototype, "version", void 0);
    MainUiCtrl = __decorate([
        ccclass
    ], MainUiCtrl);
    return MainUiCtrl;
}(cc.Component));
exports.default = MainUiCtrl;

cc._RF.pop();