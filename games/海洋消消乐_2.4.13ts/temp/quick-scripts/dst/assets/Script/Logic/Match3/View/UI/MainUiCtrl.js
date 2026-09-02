
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/UI/MainUiCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
        this.infoPanelCtrl = this.getInfoPanelCtrl();
        if (this.infoPanelCtrl) {
            this.infoPanelCtrl.init();
        }
        else {
            console.error("[MainUiCtrl] missing InfoPanelCtrl on topBar");
        }
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
        var ctrl = this.getInfoPanelCtrl();
        return ctrl ? ctrl.getLevelLabPos() : null;
    };
    MainUiCtrl.prototype.getCollectPos = function (type) {
        var ctrl = this.getInfoPanelCtrl();
        return ctrl ? ctrl.getCollectPos(type) : cc.v2(0, 0);
    };
    MainUiCtrl.prototype.getStepPos = function () {
        var ctrl = this.getInfoPanelCtrl();
        return ctrl ? ctrl.getStepPos() : null;
    };
    MainUiCtrl.prototype.getInfoPanelCtrl = function () {
        if (!this.infoPanelCtrl && this.topBar) {
            this.infoPanelCtrl = this.topBar.getComponent(InfoPanelCtrl_1.default);
        }
        return this.infoPanelCtrl;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxVSVxcTWFpblVpQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBa0M7QUFDbEMsaURBQTRDO0FBQzVDLGdEQUEyQztBQUMzQyxtREFBa0Q7QUFDbEQsd0RBQW1EO0FBQ25ELHlEQUEwRDtBQUMxRCx5REFBOEg7QUFDOUgsb0RBQW1EO0FBQ25ELGlEQUE0QztBQUc1QyxnRUFBMkQ7QUFDM0QsOENBQXlDO0FBRW5DLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBcVNDO1FBbFNHLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFHdkIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixjQUFRLEdBQW1CLElBQUksQ0FBQztRQUdoQyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLDBCQUFvQixHQUFZLElBQUksQ0FBQztRQUdyQyxhQUFPLEdBQWEsSUFBSSxDQUFDO1FBRWpCLFVBQUksR0FBVyxJQUFJLENBQUM7UUFFcEIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUUzQixlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBRTlCLFdBQVc7UUFDSCxvQkFBYyxHQUFXLElBQUksQ0FBQztRQUV0QyxXQUFXO1FBQ0gsc0JBQWdCLEdBQXlCLElBQUksQ0FBQztRQUU5QyxjQUFRLEdBQWEsSUFBSSxDQUFDO1FBQzFCLG1CQUFhLEdBQWtCLElBQUksQ0FBQztRQUVwQyxpQkFBVyxHQUFZLEtBQUssQ0FBQzs7SUF5UHpDLENBQUM7SUF0UEcsMkJBQU0sR0FBTjtRQUNJLElBQUks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LFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ1E7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztnREFDTztJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NERBQ21CO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7K0NBQ007SUEzQlIsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQXFTOUI7SUFBRCxpQkFBQztDQXJTRCxBQXFTQyxDQXJTdUMsRUFBRSxDQUFDLFNBQVMsR0FxU25EO2tCQXJTb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wQ3RybCBmcm9tIFwiLi9Qcm9wQ3RybFwiO1xuaW1wb3J0IEluZm9QYW5lbEN0cmwgZnJvbSBcIi4vSW5mb1BhbmVsQ3RybFwiO1xuaW1wb3J0IE0gZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9EYXRhL0NvbnN0L0V2ZW50XCI7XG5pbXBvcnQgVUlNZ3IgZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9VSU1nclwiO1xuaW1wb3J0IHsgVUlIdWREZWYgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9JbnRlcmZhY2UvVUlEYXRhXCI7XG5pbXBvcnQgeyBQcm9wVHlwZSwgQ2VsbFR5cGUsIEVsaW1hdGVUeXBlLCBTY2VuZSwgUG93ZXJDb25maWcsIFdhcmluZ1RpcHMsIENvbmRpdGlvblR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL1V0aWxzL1V0aWxcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCB7IElMZXZlbCB9IGZyb20gXCIuLi8uLi8uLi9EYXRhL0ludGVyZmFjZS9MZXZlbC9JTGV2ZWxcIjtcbmltcG9ydCBNYWluQ3RybCBmcm9tICcuLi8uLi9NYWluQ3RybCc7XG5pbXBvcnQgUmVwb3J0TWdyIGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL01hbmFnZXIvUmVwb3J0TWdyXCI7XG5pbXBvcnQgQXBwcyBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9BcHBzXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluVWlDdHJsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRvcEJhcjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBib3R0b21CYXI6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJvcEJhcjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBjZW50ZXJCYXI6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBkb3RQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXG4gICAgc2NvcmVCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNjb3JlTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0bXBUZXN0UHJvcFNob3dMYWJsZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdmVyc2lvbjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfY2ZnOiBJTGV2ZWwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfbWFpbkN0cmw6IE1haW5DdHJsID0gbnVsbDtcblxuICAgIHByaXZhdGUgX21heFNjb3JlOiBudW1iZXIgPSAwO1xuXG4gICAgLyoq55u06KGM6L+b5bqm5p2hICovXG4gICAgcHJpdmF0ZSBfbmV4dFN0YXJTY29yZTogbnVtYmVyID0gbnVsbDtcblxuICAgIC8qKuW8p+W9oui/m+W6puadoSAqL1xuICAgIHByaXZhdGUgX3Njb3JlU3RhckxpZ2h0czogTWFwPG51bWJlciwgY2MuTm9kZT4gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBwcm9wQ3RybDogUHJvcEN0cmwgPSBudWxsO1xuICAgIHByaXZhdGUgaW5mb1BhbmVsQ3RybDogSW5mb1BhbmVsQ3RybCA9IG51bGw7XG5cbiAgICBwcml2YXRlIGlzU3F1YXJlQmFyOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5pbml0RXZlbnQoKTtcbiAgICAgICAgdGhpcy5pbml0U3ViQ3RybCgpO1xuICAgICAgICB0aGlzLmluaXRWaWV3KCk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRlc3RvcnlFdmVudCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEV2ZW50KCkge1xuICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LkdhbWVDTUQuUHJvcENsaWNrLCB0aGlzLm9uVXNlUHJvcCwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuR2FtZUNNRC5Qcm9wVXNlZCwgdGhpcy5vblByb3BPdmVyLCB0aGlzKVxuICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LkVmZmVjdC5TaG93RG90LCB0aGlzLm9uU2hvd0RvdCwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuVUkuQWRkU2NvcmUsIHRoaXMudXBkYXRlU2NvcmUsIHRoaXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVzdG9yeUV2ZW50KCkge1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuR2FtZUNNRC5Qcm9wQ2xpY2ssIHRoaXMub25Vc2VQcm9wLCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LkdhbWVDTUQuUHJvcFVzZWQsIHRoaXMub25Qcm9wT3ZlciwgdGhpcylcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LkVmZmVjdC5TaG93RG90LCB0aGlzLm9uU2hvd0RvdCwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5VSS5BZGRTY29yZSwgdGhpcy51cGRhdGVTY29yZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQobWM6IE1haW5DdHJsLCBjZmc6IElMZXZlbCkge1xuICAgICAgICB0aGlzLl9jZmcgPSBjZmc7XG4gICAgICAgIHRoaXMuX21haW5DdHJsID0gbWM7XG4gICAgICAgIHRoaXMuaW5pdFN0YXJQcm9ncmVzcyhjZmcubGV2ZWxJbmZvLnNjb3JlKTtcbiAgICAgICAgdGhpcy5pbmZvUGFuZWxDdHJsID0gdGhpcy5nZXRJbmZvUGFuZWxDdHJsKCk7XG4gICAgICAgIGlmICh0aGlzLmluZm9QYW5lbEN0cmwpIHtcbiAgICAgICAgICAgIHRoaXMuaW5mb1BhbmVsQ3RybC5pbml0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW01haW5VaUN0cmxdIG1pc3NpbmcgSW5mb1BhbmVsQ3RybCBvbiB0b3BCYXJcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRTdGFyUHJvZ3Jlc3Moc2NvcmVDZmc6IEFycmF5PG51bWJlcj4pIHtcbiAgICAgICAgaWYgKHNjb3JlQ2ZnKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFyUGFyZW50ID0gdGhpcy5zY29yZUJhci5ub2RlO1xuICAgICAgICAgICAgY29uc3QgdHJhamVjdG9yeSA9IHN0YXJQYXJlbnQuZ2V0Q2hpbGRCeU5hbWUoJ3RyYWplY3RvcnknKTtcbiAgICAgICAgICAgIHRoaXMuX21heFNjb3JlID0gc2NvcmVDZmdbc2NvcmVDZmcubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB0aGlzLl9tYXhTY29yZSArPSB0aGlzLl9tYXhTY29yZSAqIDAuMTU7XG4gICAgICAgICAgICB0aGlzLnNjb3JlQmFyLnByb2dyZXNzID0gMDtcbiAgICAgICAgICAgIGlmICh0cmFqZWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1NxdWFyZUJhciA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2NvcmVTdGFyTGlnaHRzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIC8v566X5Ye655m+5YiG5q+UXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29yZUNmZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFyID0gdGhpcy5zY29yZUJhci5ub2RlLmdldENoaWxkQnlOYW1lKGBzdGFyJHtpfWApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2VmZmljaWVudCA9IE1hdGgucm91bmQoKHNjb3JlQ2ZnW2ldIC8gdGhpcy5fbWF4U2NvcmUpICogMTApO1xuICAgICAgICAgICAgICAgICAgICBzdGFyLnNldFBvc2l0aW9uKHRyYWplY3RvcnkuZ2V0Q2hpbGRCeU5hbWUoYCR7Y29lZmZpY2llbnR9YCkucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zY29yZVN0YXJMaWdodHMuc2V0KGNvZWZmaWNpZW50LCBzdGFyKTtcbiAgICAgICAgICAgICAgICAgICAgQ29tbW9uLnN3aXRjaEdyYXkodHJ1ZSwgc3Rhcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3F1YXJlQmFyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmV4dFN0YXJTY29yZSA9IHNjb3JlQ2ZnWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Njb3JlU3RhckxpZ2h0cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjb3JlQ2ZnLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXIgPSB0aGlzLnNjb3JlQmFyLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoYHN0YXIke2l9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvZWZmaWNpZW50ID0gc2NvcmVDZmdbaV0gLyB0aGlzLl9tYXhTY29yZTtcbiAgICAgICAgICAgICAgICAgICAgc3Rhci54ID0gKHN0YXJQYXJlbnQud2lkdGggKiBjb2VmZmljaWVudCkgLSBzdGFyUGFyZW50LndpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgQ29tbW9uLnN3aXRjaEdyYXkodHJ1ZSwgc3Rhcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Njb3JlU3RhckxpZ2h0cy5zZXQoaSwgbnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0VmlldygpIHtcbiAgICAgICAgdGhpcy52ZXJzaW9uLnN0cmluZyA9IEFwcHMuVmVyc2lvbjtcbiAgICAgICAgdGhpcy51cGRhdGVTY29yZSgwLCBudWxsKTtcbiAgICAgICAgdGhpcy5jZW50ZXJCYXIueSAtPSBNLnBsYXRmb3JtLmdldFRvcEJhbmdQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAvL+W7tui/n+WKoOi9vSzliJ3lp4vnirbmgIHlj6/og73kvJrmsqHor7vlj5bliLDog7blm4rkvY3nva4hXG4gICAgICAgICAgICBjb25zdCBjOiBjYy5SZWN0ID0gTS5wbGF0Zm9ybS5nZXRNZW51QnV0dG9uQm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoYykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmVOb2RlLnNldFBvc2l0aW9uKGMueCArIGMud2lkdGggLyAyLCBjLnkgLSAxMCk7XG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuVG9vbC5pc0lweCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcmVOb2RlLnNldFNjYWxlKDAuOCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2VudGVyQmFyLnkgLT0gYy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NvcmVOb2RlLnkgKz0gYy5oZWlnaHQgKyB0aGlzLnNjb3JlTm9kZS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAwLjEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFN1YkN0cmwoKSB7XG4gICAgICAgIHRoaXMucHJvcEN0cmwgPSB0aGlzLnByb3BCYXIuZ2V0Q29tcG9uZW50KFByb3BDdHJsKTtcbiAgICAgICAgdGhpcy5wcm9wQ3RybC5pbml0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblVzZVByb3AodHlwZTogUHJvcFR5cGUpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFByb3BUeXBlLkJlaWtlQm9tYjpcbiAgICAgICAgICAgIGNhc2UgUHJvcFR5cGUuQm9hcmQ6XG4gICAgICAgICAgICBjYXNlIFByb3BUeXBlLkhhbW1lcjpcbiAgICAgICAgICAgICAgICB0aGlzLnRtcFRlc3RQcm9wU2hvd0xhYmxlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy50bXBUZXN0UHJvcFNob3dMYWJsZS5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuMiwgMS4xKSwgY2Muc2NhbGVUbygwLjIsIDEpKSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIG9uU2hvd0RvdCh0eXBlOiBFbGltYXRlVHlwZSwgc3RhcnRQb2ludDogY2MuVmVjMikge1xuICAgICAgICAvLyBsZXQgY291bnQgPSBVdGlsLlRvb2wucmFuZ2VJbnQoMiwgNSk7XG4gICAgICAgIC8vIGZvciAobGV0IGkgPSBjb3VudDsgaS0tOykge1xuICAgICAgICAvLyAgICAgY29uc3QgZG90Tm9kZSA9IE0ubm9kZVBvb2wuZ2V0SXRlbShOb2RlUG9vbEtleS5Eb3QsIHRoaXMuZG90UHJlZmFiKTtcbiAgICAgICAgLy8gICAgIGRvdE5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICAvLyAgICAgZG90Tm9kZS5zZXRTY2FsZShVdGlsLlRvb2wucmFuZ2VJbnQoMywgNykgLyAxMCk7XG4gICAgICAgIC8vICAgICAvLyBkb3ROb2RlLmNvbG9yID0gY2MuY29sb3IoVXRpbC5Ub29sLnJhbmdlSW50KDAsIDI1NSksIFV0aWwuVG9vbC5yYW5nZUludCgwLCAyNTUpLCBVdGlsLlRvb2wucmFuZ2VJbnQoMCwgMjU1KSk7XG4gICAgICAgIC8vICAgICBkb3ROb2RlLnNldFBvc2l0aW9uKHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihzdGFydFBvaW50KSk7XG4gICAgICAgIC8vICAgICBjb25zdCB0YXJnZXRQb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoQ29tbW9uLmdldFdvcmxkUG9zKHRoaXMuc2NvcmVCYXIubm9kZSkpIGFzIGNjLlZlYzI7XG4gICAgICAgIC8vICAgICAvLyB0YXJnZXRQb3MueCArPSB0aGlzLnNjb3JlQmFyLm5vZGUud2lkdGggLyAyO1xuICAgICAgICAvLyAgICAgbGV0IG1vdmVUaW1lID0gZG90Tm9kZS5wb3NpdGlvbi5zdWIodGFyZ2V0UG9zKS5tYWcoKSAqIChVdGlsLlRvb2wucmFuZ2VJbnQoMTAsIDIwKSAvIDEwMDAwKTtcblxuICAgICAgICAvLyAgICAgY29uc3QgYTAgPSBjYy5tb3ZlVG8obW92ZVRpbWUsIHRhcmdldFBvcyk7XG4gICAgICAgIC8vICAgICBjb25zdCBhMSA9IGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgLy8gICAgICAgICBNLm5vZGVQb29sLmZyZWVJdGVtKE5vZGVQb29sS2V5LkRvdCwgZG90Tm9kZSk7XG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyAgICAgZG90Tm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYTAsIGExKSk7XG5cbiAgICAgICAgLy8gICAgIGlmICh0eXBlICE9IEVsaW1hdGVUeXBlLkRlZmF1bHQpIHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnVwZGF0ZVNjb3JlKFNjb3JlQ29uZmlnLlNpbmdsZUVsaW1hdGVbdHlwZV0sIHN0YXJ0UG9pbnQpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblByb3BPdmVyKCkge1xuICAgICAgICB0aGlzLnRtcFRlc3RQcm9wU2hvd0xhYmxlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIHRoaXMudG1wVGVzdFByb3BTaG93TGFibGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGdldExldmVsTGFiZWxQb3MoKTogY2MuVmVjMiB7XG4gICAgICAgIGNvbnN0IGN0cmwgPSB0aGlzLmdldEluZm9QYW5lbEN0cmwoKTtcbiAgICAgICAgcmV0dXJuIGN0cmwgPyBjdHJsLmdldExldmVsTGFiUG9zKCkgOiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDb2xsZWN0UG9zKHR5cGU6IENlbGxUeXBlIHwgc3RyaW5nKTogY2MuVmVjMiB7XG4gICAgICAgIGNvbnN0IGN0cmwgPSB0aGlzLmdldEluZm9QYW5lbEN0cmwoKTtcbiAgICAgICAgcmV0dXJuIGN0cmwgPyBjdHJsLmdldENvbGxlY3RQb3ModHlwZSkgOiBjYy52MigwLCAwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U3RlcFBvcygpIHtcbiAgICAgICAgY29uc3QgY3RybCA9IHRoaXMuZ2V0SW5mb1BhbmVsQ3RybCgpO1xuICAgICAgICByZXR1cm4gY3RybCA/IGN0cmwuZ2V0U3RlcFBvcygpIDogbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEluZm9QYW5lbEN0cmwoKTogSW5mb1BhbmVsQ3RybCB7XG4gICAgICAgIGlmICghdGhpcy5pbmZvUGFuZWxDdHJsICYmIHRoaXMudG9wQmFyKSB7XG4gICAgICAgICAgICB0aGlzLmluZm9QYW5lbEN0cmwgPSB0aGlzLnRvcEJhci5nZXRDb21wb25lbnQoSW5mb1BhbmVsQ3RybCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5mb1BhbmVsQ3RybDtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25Hb01hcFNjZW5lKCkge1xuICAgICAgICAvLyBDb21tb24uanVtcFNjZW5lKFNjZW5lLk1hcClcbiAgICB9XG5cbiAgICBwdWJsaWMgb25UZXN0U2hvd1dpbigpIHtcbiAgICAgICAgVUlNZ3IuaW5zLnNob3dVSShVSUh1ZERlZi5HYW1lT3ZlcldpbiwgeyB0eXBlOiBVSUh1ZERlZi5HYW1lT3ZlcldpbiwgZGF0YTogMSB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25UZXN0U2hvd0ZhaWwoKSB7XG4gICAgICAgIHRoaXMuc2hvd1Jlc3VsdERpYWxvZyhmYWxzZSwgMCwgMCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dSZXN1bHREaWFsb2cocmVzdWx0OiBib29sZWFuLCBzdGVwQ291bnQ/OiBudW1iZXIsIHRpbWVDb3VudD86IG51bWJlcikge1xuICAgICAgICBSZXBvcnRNZ3IuaW5zLnJlcG9ydE1hdGNoT3ZlcihNLnJ1bnRpbWUuQ3VyTGV2ZWwsIHJlc3VsdCwgc3RlcENvdW50LCB0aW1lQ291bnQpO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICBNLnJ1bnRpbWUuU2VsZWN0TGV2ZWwgPSAwO1xuICAgICAgICAgICAgY29uc3Qgc3RhckNvdW50ID0gMzsvL3RoaXMuX3Njb3JlU3RhckxpZ2h0cyA/IDMgLSB0aGlzLl9zY29yZVN0YXJMaWdodHMuc2l6ZSA6IDA7XG4gICAgICAgICAgICBjb25zdCBpc05ldyA9IE0ucnVudGltZS5zYXZhTHZEYXRhKHN0YXJDb3VudCk7XG4gICAgICAgICAgICBpZiAoaXNOZXcpIHtcbiAgICAgICAgICAgICAgICAvL+WlluWKsSFcbiAgICAgICAgICAgICAgICBjb25zdCBpbmZvID0gTS50YWJsZS5MZXZlbFVwUmV3YXJkLmdldEJ5UHJpbWFyeUtleShNLnJ1bnRpbWUuQ3VyTGV2ZWwpO1xuICAgICAgICAgICAgICAgIGlmIChpbmZvICYmIGluZm8ucmV3YXJkcykge1xuICAgICAgICAgICAgICAgICAgICBpbmZvLnJld2FyZHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE0ucnVudGltZS5hZGRDdXJyZW5jeShpdGVtLnR5cGUsIGl0ZW0uY291bnQpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL+WIpOaWreaYr+WQpuacieaWsOino+mUgeeahOmBk+WFt1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BJbmZvcyA9IE0udGFibGUuUHJvcEluZm8uZ2V0RGF0YSgpO1xuICAgICAgICAgICAgICAgIGlmIChwcm9wSW5mb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcEluZm9zLmZvckVhY2goaW5mbyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5mby51bmxvY2tMdiA9PSBNLnJ1bnRpbWUuQ3VyTGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNLnRpcHMuc2hvdyhXYXJpbmdUaXBzLlVubG9ja1Byb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2MubG9nKFwi6LCD55So5pi+56S65oiQ5Yqf55WM6Z2iXCIpXG4gICAgICAgICAgICBVSU1nci5pbnMuc2hvd1VJKFVJSHVkRGVmLkdhbWVPdmVyV2luLCB7IHR5cGU6IFVJSHVkRGVmLkdhbWVPdmVyV2luLCBkYXRhOiBzdGFyQ291bnQgfSk7XG4gICAgICAgICAgICBNLnJ1bnRpbWUuc2V0TWF0Y2gzTGV2ZWwoTS5ydW50aW1lLkN1ckxldmVsICsgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL1VJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuR2FtZU92ZXJGYWlsLCB7IHR5cGU6IFVJSHVkRGVmLkdhbWVPdmVyRmFpbCwgZGF0YTogdGhpcy5fY2ZnLmNvbGxlY3QgfSk7XG4gICAgICAgICAgICBjYy5sb2coXCLosIPnlKjmmL7npLrlpLHotKXnlYzpnaJcIilcbiAgICAgICAgICAgIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuVUlHYW1lRmFpbEVuY291cmFnZSwgeyBkYXRhOiB0aGlzLl9jZmcuY29sbGVjdCB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVTY29yZShhczogbnVtYmVyLCBwb3M6IGNjLlZlYzIsIGlzT3ZlckVmZjogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChhcykge1xuICAgICAgICAgICAgcG9zICYmIE0uZXZlbnQuc2VuZChFdmVudC5FZmZlY3QuQWRkU2NvcmUsIGFzLCBwb3MsIGlzT3ZlckVmZik7XG4gICAgICAgICAgICBjb25zdCBzY29yZSA9IE0ucnVudGltZS5hZGRTY29yZShhcyk7XG4gICAgICAgICAgICB0aGlzLmluZm9QYW5lbEN0cmwgJiYgdGhpcy5pbmZvUGFuZWxDdHJsLm9uVXBkYXRlSW5mbygpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTY29yZVByb2dyZXNzKHNjb3JlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93VGFyZ2V0RGlhbG9nKGRpYWxvZ092ZXJDYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgZGF0YTogYW55ID0ge31cbiAgICAgICAgZGF0YS5jb2xsZWN0ID0gdGhpcy5fY2ZnLmNvbGxlY3Q7XG4gICAgICAgIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuR2FtZVNob3dUYXJnZXQsIHsgdHlwZTogVUlIdWREZWYuR2FtZVNob3dUYXJnZXQsIGRhdGEgfSwgbnVsbCwgKCkgPT4ge1xuICAgICAgICAgICAgZGlhbG9nT3ZlckNhbGxiYWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlU2NvcmVQcm9ncmVzcyhjdXJTY29yZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLl9jZmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVCYXIucHJvZ3Jlc3MgPSBjdXJTY29yZSAvIHRoaXMuX21heFNjb3JlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTcXVhcmVCYXIgJiYgdGhpcy5fc2NvcmVTdGFyTGlnaHRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29lZmZpY2llbnQgPSBNYXRoLnJvdW5kKHRoaXMuc2NvcmVCYXIucHJvZ3Jlc3MgKiAxMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2NvcmVTdGFyTGlnaHRzLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvZWZmaWNpZW50ID49IGspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5zd2l0Y2hHcmF5KGZhbHNlLCB2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Njb3JlU3RhckxpZ2h0cy5kZWxldGUoayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbmV4dFN0YXJTY29yZSAmJiBjdXJTY29yZSA+PSB0aGlzLl9uZXh0U3RhclNjb3JlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5fY2ZnLmxldmVsSW5mby5zY29yZS5pbmRleE9mKHRoaXMuX25leHRTdGFyU2NvcmUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXIgPSB0aGlzLnNjb3JlQmFyLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoYHN0YXIke2N1cnJlbnRJbmRleH1gKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY29yZVN0YXJMaWdodHMuZGVsZXRlKGN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgQ29tbW9uLnN3aXRjaEdyYXkoZmFsc2UsIHN0YXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX25leHRTdGFyU2NvcmUgPSB0aGlzLl9jZmcubGV2ZWxJbmZvLnNjb3JlW2N1cnJlbnRJbmRleCArIDFdO1xuICAgICAgICAgICAgICAgIHRoaXMuX25leHRTdGFyU2NvcmUgPT0gLTEgJiYgKHRoaXMuX25leHRTdGFyU2NvcmUgPSBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbk9wZW5HTSgpIHtcbiAgICAgICAgaWYgKEFwcHMuaXNPcGVuR00pIHtcbiAgICAgICAgICAgIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuR01WaWV3KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==