
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxVSVxcTWFpblVpQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBa0M7QUFDbEMsaURBQTRDO0FBQzVDLGdEQUEyQztBQUMzQyxtREFBa0Q7QUFDbEQsd0RBQW1EO0FBQ25ELHlEQUEwRDtBQUMxRCx5REFBOEg7QUFDOUgsb0RBQW1EO0FBQ25ELGlEQUE0QztBQUc1QyxnRUFBMkQ7QUFDM0QsOENBQXlDO0FBRW5DLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBeVJDO1FBdFJHLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFHdkIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixjQUFRLEdBQW1CLElBQUksQ0FBQztRQUdoQyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLDBCQUFvQixHQUFZLElBQUksQ0FBQztRQUdyQyxhQUFPLEdBQWEsSUFBSSxDQUFDO1FBRWpCLFVBQUksR0FBVyxJQUFJLENBQUM7UUFFcEIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUUzQixlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBRTlCLFdBQVc7UUFDSCxvQkFBYyxHQUFXLElBQUksQ0FBQztRQUV0QyxXQUFXO1FBQ0gsc0JBQWdCLEdBQXlCLElBQUksQ0FBQztRQUU5QyxjQUFRLEdBQWEsSUFBSSxDQUFDO1FBQzFCLG1CQUFhLEdBQWtCLElBQUksQ0FBQztRQUVwQyxpQkFBVyxHQUFZLEtBQUssQ0FBQzs7SUE2T3pDLENBQUM7SUExT0csMkJBQU0sR0FBTjtRQUNJLElBQUks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QUssQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQzdEO1NBQ0o7SUFDTCxDQUFDO0lBRU0sNkJBQVEsR0FBZjtRQUNJLElBQUksY0FBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLGVBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckM7SUFDTCxDQUFDO0lBclJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ0s7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDUTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNNO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDUTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2dEQUNPO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0REFDbUI7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsrQ0FDTTtJQTNCUixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBeVI5QjtJQUFELGlCQUFDO0NBelJELEFBeVJDLENBelJ1QyxFQUFFLENBQUMsU0FBUyxHQXlSbkQ7a0JBelJvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BDdHJsIGZyb20gXCIuL1Byb3BDdHJsXCI7XG5pbXBvcnQgSW5mb1BhbmVsQ3RybCBmcm9tIFwiLi9JbmZvUGFuZWxDdHJsXCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCBVSU1nciBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL1VJTWdyXCI7XG5pbXBvcnQgeyBVSUh1ZERlZiB9IGZyb20gXCIuLi8uLi8uLi9EYXRhL0ludGVyZmFjZS9VSURhdGFcIjtcbmltcG9ydCB7IFByb3BUeXBlLCBDZWxsVHlwZSwgRWxpbWF0ZVR5cGUsIFNjZW5lLCBQb3dlckNvbmZpZywgV2FyaW5nVGlwcywgQ29uZGl0aW9uVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvVXRpbHMvVXRpbFwiO1xuaW1wb3J0IENvbW1vbiBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0NvbW1vblwiO1xuaW1wb3J0IHsgSUxldmVsIH0gZnJvbSBcIi4uLy4uLy4uL0RhdGEvSW50ZXJmYWNlL0xldmVsL0lMZXZlbFwiO1xuaW1wb3J0IE1haW5DdHJsIGZyb20gJy4uLy4uL01haW5DdHJsJztcbmltcG9ydCBSZXBvcnRNZ3IgZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9SZXBvcnRNZ3JcIjtcbmltcG9ydCBBcHBzIGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL0FwcHNcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5VaUN0cmwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgdG9wQmFyOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJvdHRvbUJhcjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcm9wQmFyOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGNlbnRlckJhcjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGRvdFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcbiAgICBzY29yZUJhcjogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2NvcmVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRtcFRlc3RQcm9wU2hvd0xhYmxlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB2ZXJzaW9uOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9jZmc6IElMZXZlbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9tYWluQ3RybDogTWFpbkN0cmwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfbWF4U2NvcmU6IG51bWJlciA9IDA7XG5cbiAgICAvKirnm7TooYzov5vluqbmnaEgKi9cbiAgICBwcml2YXRlIF9uZXh0U3RhclNjb3JlOiBudW1iZXIgPSBudWxsO1xuXG4gICAgLyoq5byn5b2i6L+b5bqm5p2hICovXG4gICAgcHJpdmF0ZSBfc2NvcmVTdGFyTGlnaHRzOiBNYXA8bnVtYmVyLCBjYy5Ob2RlPiA9IG51bGw7XG5cbiAgICBwcml2YXRlIHByb3BDdHJsOiBQcm9wQ3RybCA9IG51bGw7XG4gICAgcHJpdmF0ZSBpbmZvUGFuZWxDdHJsOiBJbmZvUGFuZWxDdHJsID0gbnVsbDtcblxuICAgIHByaXZhdGUgaXNTcXVhcmVCYXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmluaXRFdmVudCgpO1xuICAgICAgICB0aGlzLmluaXRTdWJDdHJsKCk7XG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGVzdG9yeUV2ZW50KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RXZlbnQoKSB7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuR2FtZUNNRC5Qcm9wQ2xpY2ssIHRoaXMub25Vc2VQcm9wLCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC5yZWdpc3RlcihFdmVudC5HYW1lQ01ELlByb3BVc2VkLCB0aGlzLm9uUHJvcE92ZXIsIHRoaXMpXG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuRWZmZWN0LlNob3dEb3QsIHRoaXMub25TaG93RG90LCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC5yZWdpc3RlcihFdmVudC5VSS5BZGRTY29yZSwgdGhpcy51cGRhdGVTY29yZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZXN0b3J5RXZlbnQoKSB7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5HYW1lQ01ELlByb3BDbGljaywgdGhpcy5vblVzZVByb3AsIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuR2FtZUNNRC5Qcm9wVXNlZCwgdGhpcy5vblByb3BPdmVyLCB0aGlzKVxuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuRWZmZWN0LlNob3dEb3QsIHRoaXMub25TaG93RG90LCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LlVJLkFkZFNjb3JlLCB0aGlzLnVwZGF0ZVNjb3JlLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdChtYzogTWFpbkN0cmwsIGNmZzogSUxldmVsKSB7XG4gICAgICAgIHRoaXMuX2NmZyA9IGNmZztcbiAgICAgICAgdGhpcy5fbWFpbkN0cmwgPSBtYztcbiAgICAgICAgdGhpcy5pbml0U3RhclByb2dyZXNzKGNmZy5sZXZlbEluZm8uc2NvcmUpO1xuICAgICAgICBpZiAoIXRoaXMuaW5mb1BhbmVsQ3RybCkge1xuICAgICAgICAgICAgdGhpcy5pbmZvUGFuZWxDdHJsID0gdGhpcy50b3BCYXIuZ2V0Q29tcG9uZW50KEluZm9QYW5lbEN0cmwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5mb1BhbmVsQ3RybC5pbml0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0U3RhclByb2dyZXNzKHNjb3JlQ2ZnOiBBcnJheTxudW1iZXI+KSB7XG4gICAgICAgIGlmIChzY29yZUNmZykge1xuICAgICAgICAgICAgY29uc3Qgc3RhclBhcmVudCA9IHRoaXMuc2NvcmVCYXIubm9kZTtcbiAgICAgICAgICAgIGNvbnN0IHRyYWplY3RvcnkgPSBzdGFyUGFyZW50LmdldENoaWxkQnlOYW1lKCd0cmFqZWN0b3J5Jyk7XG4gICAgICAgICAgICB0aGlzLl9tYXhTY29yZSA9IHNjb3JlQ2ZnW3Njb3JlQ2ZnLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgdGhpcy5fbWF4U2NvcmUgKz0gdGhpcy5fbWF4U2NvcmUgKiAwLjE1O1xuICAgICAgICAgICAgdGhpcy5zY29yZUJhci5wcm9ncmVzcyA9IDA7XG4gICAgICAgICAgICBpZiAodHJhamVjdG9yeSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNTcXVhcmVCYXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Njb3JlU3RhckxpZ2h0cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICAvL+eul+WHuueZvuWIhuavlFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NvcmVDZmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhciA9IHRoaXMuc2NvcmVCYXIubm9kZS5nZXRDaGlsZEJ5TmFtZShgc3RhciR7aX1gKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29lZmZpY2llbnQgPSBNYXRoLnJvdW5kKChzY29yZUNmZ1tpXSAvIHRoaXMuX21heFNjb3JlKSAqIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgc3Rhci5zZXRQb3NpdGlvbih0cmFqZWN0b3J5LmdldENoaWxkQnlOYW1lKGAke2NvZWZmaWNpZW50fWApLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2NvcmVTdGFyTGlnaHRzLnNldChjb2VmZmljaWVudCwgc3Rhcik7XG4gICAgICAgICAgICAgICAgICAgIENvbW1vbi5zd2l0Y2hHcmF5KHRydWUsIHN0YXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1NxdWFyZUJhciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX25leHRTdGFyU2NvcmUgPSBzY29yZUNmZ1swXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY29yZVN0YXJMaWdodHMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY29yZUNmZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFyID0gdGhpcy5zY29yZUJhci5ub2RlLmdldENoaWxkQnlOYW1lKGBzdGFyJHtpfWApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2VmZmljaWVudCA9IHNjb3JlQ2ZnW2ldIC8gdGhpcy5fbWF4U2NvcmU7XG4gICAgICAgICAgICAgICAgICAgIHN0YXIueCA9IChzdGFyUGFyZW50LndpZHRoICogY29lZmZpY2llbnQpIC0gc3RhclBhcmVudC53aWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIENvbW1vbi5zd2l0Y2hHcmF5KHRydWUsIHN0YXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zY29yZVN0YXJMaWdodHMuc2V0KGksIG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFZpZXcoKSB7XG4gICAgICAgIHRoaXMudmVyc2lvbi5zdHJpbmcgPSBBcHBzLlZlcnNpb247XG4gICAgICAgIHRoaXMudXBkYXRlU2NvcmUoMCwgbnVsbCk7XG4gICAgICAgIHRoaXMuY2VudGVyQmFyLnkgLT0gTS5wbGF0Zm9ybS5nZXRUb3BCYW5nUG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgLy/lu7bov5/liqDovb0s5Yid5aeL54q25oCB5Y+v6IO95Lya5rKh6K+75Y+W5Yiw6IO25ZuK5L2N572uIVxuICAgICAgICAgICAgY29uc3QgYzogY2MuUmVjdCA9IE0ucGxhdGZvcm0uZ2V0TWVudUJ1dHRvbkJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgaWYgKGMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlTm9kZS5zZXRQb3NpdGlvbihjLnggKyBjLndpZHRoIC8gMiwgYy55IC0gMTApO1xuICAgICAgICAgICAgICAgIGlmIChVdGlsLlRvb2wuaXNJcHgoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlTm9kZS5zZXRTY2FsZSgwLjgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbnRlckJhci55IC09IGMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjb3JlTm9kZS55ICs9IGMuaGVpZ2h0ICsgdGhpcy5zY29yZU5vZGUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMC4xKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRTdWJDdHJsKCkge1xuICAgICAgICB0aGlzLnByb3BDdHJsID0gdGhpcy5wcm9wQmFyLmdldENvbXBvbmVudChQcm9wQ3RybCk7XG4gICAgICAgIHRoaXMucHJvcEN0cmwuaW5pdCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Vc2VQcm9wKHR5cGU6IFByb3BUeXBlKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBQcm9wVHlwZS5CZWlrZUJvbWI6XG4gICAgICAgICAgICBjYXNlIFByb3BUeXBlLkJvYXJkOlxuICAgICAgICAgICAgY2FzZSBQcm9wVHlwZS5IYW1tZXI6XG4gICAgICAgICAgICAgICAgdGhpcy50bXBUZXN0UHJvcFNob3dMYWJsZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudG1wVGVzdFByb3BTaG93TGFibGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjIsIDEuMSksIGNjLnNjYWxlVG8oMC4yLCAxKSkpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBvblNob3dEb3QodHlwZTogRWxpbWF0ZVR5cGUsIHN0YXJ0UG9pbnQ6IGNjLlZlYzIpIHtcbiAgICAgICAgLy8gbGV0IGNvdW50ID0gVXRpbC5Ub29sLnJhbmdlSW50KDIsIDUpO1xuICAgICAgICAvLyBmb3IgKGxldCBpID0gY291bnQ7IGktLTspIHtcbiAgICAgICAgLy8gICAgIGNvbnN0IGRvdE5vZGUgPSBNLm5vZGVQb29sLmdldEl0ZW0oTm9kZVBvb2xLZXkuRG90LCB0aGlzLmRvdFByZWZhYik7XG4gICAgICAgIC8vICAgICBkb3ROb2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgLy8gICAgIGRvdE5vZGUuc2V0U2NhbGUoVXRpbC5Ub29sLnJhbmdlSW50KDMsIDcpIC8gMTApO1xuICAgICAgICAvLyAgICAgLy8gZG90Tm9kZS5jb2xvciA9IGNjLmNvbG9yKFV0aWwuVG9vbC5yYW5nZUludCgwLCAyNTUpLCBVdGlsLlRvb2wucmFuZ2VJbnQoMCwgMjU1KSwgVXRpbC5Ub29sLnJhbmdlSW50KDAsIDI1NSkpO1xuICAgICAgICAvLyAgICAgZG90Tm9kZS5zZXRQb3NpdGlvbih0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoc3RhcnRQb2ludCkpO1xuICAgICAgICAvLyAgICAgY29uc3QgdGFyZ2V0UG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKENvbW1vbi5nZXRXb3JsZFBvcyh0aGlzLnNjb3JlQmFyLm5vZGUpKSBhcyBjYy5WZWMyO1xuICAgICAgICAvLyAgICAgLy8gdGFyZ2V0UG9zLnggKz0gdGhpcy5zY29yZUJhci5ub2RlLndpZHRoIC8gMjtcbiAgICAgICAgLy8gICAgIGxldCBtb3ZlVGltZSA9IGRvdE5vZGUucG9zaXRpb24uc3ViKHRhcmdldFBvcykubWFnKCkgKiAoVXRpbC5Ub29sLnJhbmdlSW50KDEwLCAyMCkgLyAxMDAwMCk7XG5cbiAgICAgICAgLy8gICAgIGNvbnN0IGEwID0gY2MubW92ZVRvKG1vdmVUaW1lLCB0YXJnZXRQb3MpO1xuICAgICAgICAvLyAgICAgY29uc3QgYTEgPSBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgTS5ub2RlUG9vbC5mcmVlSXRlbShOb2RlUG9vbEtleS5Eb3QsIGRvdE5vZGUpO1xuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gICAgIGRvdE5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGEwLCBhMSkpO1xuXG4gICAgICAgIC8vICAgICBpZiAodHlwZSAhPSBFbGltYXRlVHlwZS5EZWZhdWx0KSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy51cGRhdGVTY29yZShTY29yZUNvbmZpZy5TaW5nbGVFbGltYXRlW3R5cGVdLCBzdGFydFBvaW50KTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25Qcm9wT3ZlcigpIHtcbiAgICAgICAgdGhpcy50bXBUZXN0UHJvcFNob3dMYWJsZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICB0aGlzLnRtcFRlc3RQcm9wU2hvd0xhYmxlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRMZXZlbExhYmVsUG9zKCk6IGNjLlZlYzIge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmZvUGFuZWxDdHJsLmdldExldmVsTGFiUG9zKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENvbGxlY3RQb3ModHlwZTogQ2VsbFR5cGUgfCBzdHJpbmcpOiBjYy5WZWMyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5mb1BhbmVsQ3RybC5nZXRDb2xsZWN0UG9zKHR5cGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTdGVwUG9zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmZvUGFuZWxDdHJsLmdldFN0ZXBQb3MoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25Hb01hcFNjZW5lKCkge1xuICAgICAgICAvLyBDb21tb24uanVtcFNjZW5lKFNjZW5lLk1hcClcbiAgICB9XG5cbiAgICBwdWJsaWMgb25UZXN0U2hvd1dpbigpIHtcbiAgICAgICAgVUlNZ3IuaW5zLnNob3dVSShVSUh1ZERlZi5HYW1lT3ZlcldpbiwgeyB0eXBlOiBVSUh1ZERlZi5HYW1lT3ZlcldpbiwgZGF0YTogMSB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25UZXN0U2hvd0ZhaWwoKSB7XG4gICAgICAgIHRoaXMuc2hvd1Jlc3VsdERpYWxvZyhmYWxzZSwgMCwgMCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dSZXN1bHREaWFsb2cocmVzdWx0OiBib29sZWFuLCBzdGVwQ291bnQ/OiBudW1iZXIsIHRpbWVDb3VudD86IG51bWJlcikge1xuICAgICAgICBSZXBvcnRNZ3IuaW5zLnJlcG9ydE1hdGNoT3ZlcihNLnJ1bnRpbWUuQ3VyTGV2ZWwsIHJlc3VsdCwgc3RlcENvdW50LCB0aW1lQ291bnQpO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICBNLnJ1bnRpbWUuU2VsZWN0TGV2ZWwgPSAwO1xuICAgICAgICAgICAgY29uc3Qgc3RhckNvdW50ID0gMzsvL3RoaXMuX3Njb3JlU3RhckxpZ2h0cyA/IDMgLSB0aGlzLl9zY29yZVN0YXJMaWdodHMuc2l6ZSA6IDA7XG4gICAgICAgICAgICBjb25zdCBpc05ldyA9IE0ucnVudGltZS5zYXZhTHZEYXRhKHN0YXJDb3VudCk7XG4gICAgICAgICAgICBpZiAoaXNOZXcpIHtcbiAgICAgICAgICAgICAgICAvL+WlluWKsSFcbiAgICAgICAgICAgICAgICBjb25zdCBpbmZvID0gTS50YWJsZS5MZXZlbFVwUmV3YXJkLmdldEJ5UHJpbWFyeUtleShNLnJ1bnRpbWUuQ3VyTGV2ZWwpO1xuICAgICAgICAgICAgICAgIGlmIChpbmZvICYmIGluZm8ucmV3YXJkcykge1xuICAgICAgICAgICAgICAgICAgICBpbmZvLnJld2FyZHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE0ucnVudGltZS5hZGRDdXJyZW5jeShpdGVtLnR5cGUsIGl0ZW0uY291bnQpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL+WIpOaWreaYr+WQpuacieaWsOino+mUgeeahOmBk+WFt1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BJbmZvcyA9IE0udGFibGUuUHJvcEluZm8uZ2V0RGF0YSgpO1xuICAgICAgICAgICAgICAgIGlmIChwcm9wSW5mb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcEluZm9zLmZvckVhY2goaW5mbyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5mby51bmxvY2tMdiA9PSBNLnJ1bnRpbWUuQ3VyTGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNLnRpcHMuc2hvdyhXYXJpbmdUaXBzLlVubG9ja1Byb3ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2MubG9nKFwi6LCD55So5pi+56S65oiQ5Yqf55WM6Z2iXCIpXG4gICAgICAgICAgICBVSU1nci5pbnMuc2hvd1VJKFVJSHVkRGVmLkdhbWVPdmVyV2luLCB7IHR5cGU6IFVJSHVkRGVmLkdhbWVPdmVyV2luLCBkYXRhOiBzdGFyQ291bnQgfSk7XG4gICAgICAgICAgICBNLnJ1bnRpbWUuc2V0TWF0Y2gzTGV2ZWwoTS5ydW50aW1lLkN1ckxldmVsICsgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL1VJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuR2FtZU92ZXJGYWlsLCB7IHR5cGU6IFVJSHVkRGVmLkdhbWVPdmVyRmFpbCwgZGF0YTogdGhpcy5fY2ZnLmNvbGxlY3QgfSk7XG4gICAgICAgICAgICBjYy5sb2coXCLosIPnlKjmmL7npLrlpLHotKXnlYzpnaJcIilcbiAgICAgICAgICAgIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuVUlHYW1lRmFpbEVuY291cmFnZSwgeyBkYXRhOiB0aGlzLl9jZmcuY29sbGVjdCB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVTY29yZShhczogbnVtYmVyLCBwb3M6IGNjLlZlYzIsIGlzT3ZlckVmZjogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChhcykge1xuICAgICAgICAgICAgcG9zICYmIE0uZXZlbnQuc2VuZChFdmVudC5FZmZlY3QuQWRkU2NvcmUsIGFzLCBwb3MsIGlzT3ZlckVmZik7XG4gICAgICAgICAgICBjb25zdCBzY29yZSA9IE0ucnVudGltZS5hZGRTY29yZShhcyk7XG4gICAgICAgICAgICB0aGlzLmluZm9QYW5lbEN0cmwgJiYgdGhpcy5pbmZvUGFuZWxDdHJsLm9uVXBkYXRlSW5mbygpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTY29yZVByb2dyZXNzKHNjb3JlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93VGFyZ2V0RGlhbG9nKGRpYWxvZ092ZXJDYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgZGF0YTogYW55ID0ge31cbiAgICAgICAgZGF0YS5jb2xsZWN0ID0gdGhpcy5fY2ZnLmNvbGxlY3Q7XG4gICAgICAgIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuR2FtZVNob3dUYXJnZXQsIHsgdHlwZTogVUlIdWREZWYuR2FtZVNob3dUYXJnZXQsIGRhdGEgfSwgbnVsbCwgKCkgPT4ge1xuICAgICAgICAgICAgZGlhbG9nT3ZlckNhbGxiYWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlU2NvcmVQcm9ncmVzcyhjdXJTY29yZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLl9jZmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2NvcmVCYXIucHJvZ3Jlc3MgPSBjdXJTY29yZSAvIHRoaXMuX21heFNjb3JlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTcXVhcmVCYXIgJiYgdGhpcy5fc2NvcmVTdGFyTGlnaHRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29lZmZpY2llbnQgPSBNYXRoLnJvdW5kKHRoaXMuc2NvcmVCYXIucHJvZ3Jlc3MgKiAxMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2NvcmVTdGFyTGlnaHRzLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvZWZmaWNpZW50ID49IGspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5zd2l0Y2hHcmF5KGZhbHNlLCB2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Njb3JlU3RhckxpZ2h0cy5kZWxldGUoayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbmV4dFN0YXJTY29yZSAmJiBjdXJTY29yZSA+PSB0aGlzLl9uZXh0U3RhclNjb3JlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5fY2ZnLmxldmVsSW5mby5zY29yZS5pbmRleE9mKHRoaXMuX25leHRTdGFyU2NvcmUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXIgPSB0aGlzLnNjb3JlQmFyLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoYHN0YXIke2N1cnJlbnRJbmRleH1gKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY29yZVN0YXJMaWdodHMuZGVsZXRlKGN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICAgICAgQ29tbW9uLnN3aXRjaEdyYXkoZmFsc2UsIHN0YXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX25leHRTdGFyU2NvcmUgPSB0aGlzLl9jZmcubGV2ZWxJbmZvLnNjb3JlW2N1cnJlbnRJbmRleCArIDFdO1xuICAgICAgICAgICAgICAgIHRoaXMuX25leHRTdGFyU2NvcmUgPT0gLTEgJiYgKHRoaXMuX25leHRTdGFyU2NvcmUgPSBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbk9wZW5HTSgpIHtcbiAgICAgICAgaWYgKEFwcHMuaXNPcGVuR00pIHtcbiAgICAgICAgICAgIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuR01WaWV3KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==