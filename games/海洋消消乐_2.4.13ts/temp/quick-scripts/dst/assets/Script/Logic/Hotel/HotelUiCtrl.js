
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Hotel/HotelUiCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ae5danQxXxPV4LorP+MIYQH', 'HotelUiCtrl');
// Script/Logic/Hotel/HotelUiCtrl.ts

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
var M_1 = require("../../Base/Manager/M");
var BaseConst_1 = require("../../Base/BaseConst");
var Common_1 = require("../Common/Common");
var Constant_1 = require("../Data/Const/Constant");
var Util_1 = require("../../Base/Utils/Util");
var Event_1 = require("../Data/Const/Event");
var BuyPowerCtrl_1 = require("../Common/UI/BuyPowerCtrl");
var Apps_1 = require("../../Base/Apps");
var UIMgr_1 = require("../../Base/Manager/UIMgr");
var UIData_1 = require("../Data/Interface/UIData");
var GuideUtils_1 = require("../../../GodGuide/GuideUtils");
var CloudView_1 = require("../SimulationOperation/View/Map/CloudView");
var HotelViewCtrl_1 = require("./HotelViewCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HotelUiCtrl = /** @class */ (function (_super) {
    __extends(HotelUiCtrl, _super);
    function HotelUiCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.topNode = null;
        _this.buyPowerPanel = null;
        _this.buyPowerBtn = null;
        _this.bottomBox = null;
        _this.coinLabel = null;
        _this.diamondLabel = null;
        _this.powerLabel = null;
        _this.countDownLabel = null;
        _this.lvLabelOnStartBtn = null;
        _this.avatarSprite = null;
        _this.rankPanel = null;
        _this.hotelView = null;
        _this._orginBottomBoxPosY = null;
        _this._startPos = null;
        _this._movePos = null;
        return _this;
    }
    HotelUiCtrl.prototype.onLoad = function () {
        M_1.default.runtime.addCurrency(BaseConst_1.CurrencyId.Coin, 100000);
        M_1.default.runtime.addCurrency(BaseConst_1.CurrencyId.Diamond, 100000);
        M_1.default.runtime.addCurrency(BaseConst_1.CurrencyId.Power, 1000);
        this._initView();
        this._initEvent();
        this._initTouch();
        this._checkHavaReward();
        this._onUpdateReminTime();
        this._checkOfflineReward();
        this._checkJumpSceneTask();
    };
    HotelUiCtrl.prototype.onDestroy = function () {
        this._destoryEvent();
    };
    HotelUiCtrl.prototype._destoryEvent = function () {
        M_1.default.event.unRegister(Event_1.Event.UI.UpdateCurrency, this._onUpdateCrrencyView, this);
        M_1.default.event.unRegister(Event_1.Event.UI.UpdateRemainAddPowerTime, this._onUpdateReminTime, this);
    };
    HotelUiCtrl.prototype._initEvent = function () {
        M_1.default.event.register(Event_1.Event.UI.UpdateCurrency, this._onUpdateCrrencyView, this);
        M_1.default.event.register(Event_1.Event.UI.UpdateRemainAddPowerTime, this._onUpdateReminTime, this);
    };
    HotelUiCtrl.prototype._initTouch = function () {
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancel, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this._touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._touchEnd, this);
    };
    HotelUiCtrl.prototype._initView = function () {
        this._initLevelDisplay();
        this._initCrrencyDisplay();
        this._checkAuth();
        this._orginBottomBoxPosY = this.bottomBox.y;
        if (Util_1.Util.Tool.isIpx()) {
            var widget = this.topNode.getComponent(cc.Widget);
            widget.top = 70;
            widget.updateAlignment();
            // this.coinLab.node.parent.setPosition(-24, -12);
        }
    };
    HotelUiCtrl.prototype._touchStart = function (event) {
        this._startPos = event.touch.getLocation();
    };
    HotelUiCtrl.prototype._touchEnd = function (event) {
        var _this = this;
        if (this._movePos && this._startPos) {
            //判断x的距离
            if (Math.abs(this._startPos.x - this._movePos.x) < 100) {
                //判断y的距离
                if (this._startPos.y < 200 && this._movePos.y > this._startPos.y && Math.abs(this._movePos.y - this._startPos.y) > 100) {
                    var a0 = cc.moveTo(0.2, cc.v2(0, this.bottomBox.y + 50));
                    var a1 = cc.moveTo(0.1, cc.v2(0, this.bottomBox.y - 100));
                    var a2 = cc.callFunc(function () {
                        UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.CloudView, CloudView_1.ICloudData.OpenHotel, function () {
                            //开
                            _this.node.active = false;
                            _this.hotelView.active = true;
                            _this.hotelView.getComponent(HotelViewCtrl_1.default).init();
                        }, function () {
                            //关
                        });
                    });
                    this.bottomBox.runAction(cc.sequence(a0, a1, a2));
                }
            }
        }
        this._touchCancel();
    };
    HotelUiCtrl.prototype._touchCancel = function () {
        this._startPos = null;
        this._movePos = null;
    };
    HotelUiCtrl.prototype._touchMove = function (event) {
        if (this._startPos) {
            this._movePos = event.touch.getLocation();
        }
    };
    HotelUiCtrl.prototype._initLevelDisplay = function () {
        this.lvLabelOnStartBtn.string = "" + M_1.default.runtime.getMatch3Level();
    };
    HotelUiCtrl.prototype._checkAuth = function () {
        var _this = this;
        M_1.default.platform.getUserInfo().then(function (info) {
            var result = null;
            if (!info) {
                result = M_1.default.platform.createAuthButton({ x: 0, y: 0, w: cc.winSize.width, h: cc.winSize.height });
            }
            else {
                result = new Promise(function (resolve) { return resolve(info); });
            }
            return result;
        }).then(function (userinfo) {
            if (userinfo) {
                M_1.default.net.login(true);
                _this._updateAvatar(userinfo);
            }
        });
    };
    HotelUiCtrl.prototype._onUpdateCrrencyView = function (type, count) {
        if (count === void 0) { count = 0; }
        var label = this[M_1.default.runtime.getCurrencyKey(type) + "Lab"];
        if (label) {
            if (type == BaseConst_1.CurrencyId.Power) {
                var curPower = M_1.default.runtime.getCurrency(BaseConst_1.CurrencyId.Power);
                label.string = curPower + "/" + Constant_1.MaxPowerCount;
                this.buyPowerBtn.active = !(curPower >= Constant_1.MaxPowerCount);
            }
            else if (type == BaseConst_1.CurrencyId.Coin) {
                var v = count.toString();
                if (type == BaseConst_1.CurrencyId.Coin) {
                    v = Common_1.default.bytesToSize(count);
                }
                label.string = v;
            }
            else if (type == BaseConst_1.CurrencyId.Diamond) {
                label.string = M_1.default.runtime.getCurrency(BaseConst_1.CurrencyId.Diamond);
            }
        }
    };
    HotelUiCtrl.prototype._updateAvatar = function (userinfo) {
        var _this = this;
        if (userinfo.avatarUrl) {
            Common_1.default.getRemotPic(userinfo.avatarUrl).then(function (frame) {
                if (frame) {
                    _this.avatarSprite.spriteFrame = frame;
                }
            });
        }
    };
    HotelUiCtrl.prototype._initCrrencyDisplay = function () {
        this.coinLabel.string = M_1.default.runtime.getFormateCoin();
        this.diamondLabel.string = M_1.default.runtime.getCurrencyStr(BaseConst_1.CurrencyId.Diamond);
        // this..string = M.runtime.getStarCount().toString();
        var curPower = M_1.default.runtime.getCurrency(BaseConst_1.CurrencyId.Power);
        this.powerLabel.string = curPower + "/" + Constant_1.MaxPowerCount;
        this.buyPowerBtn.active = !(curPower > Constant_1.MaxPowerCount);
    };
    HotelUiCtrl.prototype._showSelectDlg = function () {
        var next = GuideUtils_1.GuideUtils.checkMatchNext();
        next && UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.SelectShowTarget, { type: UIData_1.UIHudDef.SelectShowTarget, data: M_1.default.runtime.SelectLevel || null });
    };
    HotelUiCtrl.prototype.onAddBtnClick = function (event, customValue) {
        var type = BaseConst_1.CurrencyId.Diamond;
        switch (customValue) {
            case 'coin':
                type = BaseConst_1.CurrencyId.Coin;
                this._addCrrencyClick(type);
                break;
            case 'power':
                type = BaseConst_1.CurrencyId.Power;
                this.buyPowerPanel.getComponent(BuyPowerCtrl_1.default).show();
                break;
            case 'diamond':
                type = BaseConst_1.CurrencyId.Diamond;
                this._addCrrencyClick(type);
                break;
        }
    };
    HotelUiCtrl.prototype.initBottomBoxPosition = function () {
        if (this._orginBottomBoxPosY) {
            this.bottomBox.y = this._orginBottomBoxPosY;
        }
    };
    HotelUiCtrl.prototype.onLevelBtnClick = function () {
        M_1.default.runtime.SelectLevel = 0;
        this._showSelectDlg();
    };
    HotelUiCtrl.prototype.onShowDailyTaskBtnClick = function () {
        UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.DailyTaskPanel);
    };
    HotelUiCtrl.prototype._showOfflineRewar = function (currentSerTime) {
        var lastTime = M_1.default.runtime.getLastTime();
        var gapTime = currentSerTime - lastTime;
        if (lastTime > 1000000 && gapTime > Constant_1.PowerConfig.NormalTime) {
            var offlinePower = (gapTime / Constant_1.PowerConfig.NormalTime) >> 0;
            var cpower = M_1.default.runtime.getCurrency(BaseConst_1.CurrencyId.Power);
            if (cpower < Constant_1.MaxPowerCount) {
                var power = (cpower + offlinePower) > Constant_1.MaxPowerCount ? Constant_1.MaxPowerCount - cpower : offlinePower;
                if (power > 0) {
                    M_1.default.runtime.addCurrency(BaseConst_1.CurrencyId.Power, power);
                    M_1.default.tips.show("" + Constant_1.WaringTips.OfflineReward + power + "\u80FD\u91CF");
                }
            }
        }
        M_1.default.runtime.setServerTime(currentSerTime);
        this._onUpdateReminTime();
    };
    HotelUiCtrl.prototype._onUpdateReminTime = function (curTimeCount) {
        if (curTimeCount === void 0) { curTimeCount = 0; }
        if (M_1.default.runtime.getCurrency(BaseConst_1.CurrencyId.Power) >= Constant_1.MaxPowerCount) {
            this.countDownLabel.string = '满了!';
        }
        else if (curTimeCount) {
            var time = Constant_1.PowerConfig.NormalTime - (curTimeCount % Constant_1.PowerConfig.NormalTime);
            this.countDownLabel.string = Util_1.Util.Timer.conversionTime(time, true, { m: true }) + " \u540E +" + Constant_1.PowerConfig.NormalCount;
        }
    };
    /**检测是否有界面跳转任务 */
    HotelUiCtrl.prototype._checkJumpSceneTask = function () {
        if (M_1.default.runtime.SceneTask && M_1.default.runtime.SceneTask.length > 0) {
            var task = M_1.default.runtime.SceneTask.shift();
            switch (task) {
                case Constant_1.SceneTaskKey.ShowTargetDlg:
                    M_1.default.ui.closeAllUI();
                    this._showSelectDlg();
                    break;
            }
            this._checkJumpSceneTask();
        }
    };
    //离线奖励!
    HotelUiCtrl.prototype._checkOfflineReward = function () {
        var _this = this;
        M_1.default.runtime.getServerConfig().then(function (config) {
            config && _this._showOfflineRewar(config.time);
        });
    };
    HotelUiCtrl.prototype._checkHavaReward = function () {
        if (M_1.default.runtime.RewardTask && M_1.default.runtime.RewardTask.reward) {
            var rewards = Common_1.default.getRewardArray(M_1.default.runtime.RewardTask.reward);
            M_1.default.ui.showUI(UIData_1.UIHudDef.OpenBox, { config: { rewards: rewards, text: M_1.default.runtime.RewardTask.text } });
            M_1.default.runtime.RewardTask = null;
            GuideUtils_1.GuideUtils.stopGuide = true;
        }
        //for test
        // if (M.runtime.CurLevel > 3) {
        //     M.runtime.setBoxGiftData(10, false);
        //     const boxConfig = M.table.BoxRewardInfo.getByPrimaryKey(10);
        //     if (boxConfig) {
        //         //展示奖励ui . 发放奖励
        //         M.ui.showUI(UIHudDef.OpenBox, { config: boxConfig });
        //     }
        //     GuideUtils.stopGuide = true;
        // }
    };
    // public onSelectLvClick() {
    //     // UIMgr.ins.hideUI(UIHudDef.MenuPanel);
    //     // Common.jumpScene(Scene.Level);
    //     // MapIslandUtils.leaveMapIsland();
    //     UIMgr.ins.showUI(UIHudDef.CloudView, ICloudData.LeaveIsland);
    // }
    /**执行添加货币操作! */
    HotelUiCtrl.prototype._addCrrencyClick = function (type) {
        if (Apps_1.default.isDebug) {
            M_1.default.runtime.addCurrency(type, 10000000);
        }
    };
    __decorate([
        property(cc.Node)
    ], HotelUiCtrl.prototype, "topNode", void 0);
    __decorate([
        property(cc.Node)
    ], HotelUiCtrl.prototype, "buyPowerPanel", void 0);
    __decorate([
        property(cc.Node)
    ], HotelUiCtrl.prototype, "buyPowerBtn", void 0);
    __decorate([
        property(cc.Node)
    ], HotelUiCtrl.prototype, "bottomBox", void 0);
    __decorate([
        property(cc.Label)
    ], HotelUiCtrl.prototype, "coinLabel", void 0);
    __decorate([
        property(cc.Label)
    ], HotelUiCtrl.prototype, "diamondLabel", void 0);
    __decorate([
        property(cc.Label)
    ], HotelUiCtrl.prototype, "powerLabel", void 0);
    __decorate([
        property(cc.Label)
    ], HotelUiCtrl.prototype, "countDownLabel", void 0);
    __decorate([
        property(cc.Label)
    ], HotelUiCtrl.prototype, "lvLabelOnStartBtn", void 0);
    __decorate([
        property(cc.Sprite)
    ], HotelUiCtrl.prototype, "avatarSprite", void 0);
    __decorate([
        property(cc.Node)
    ], HotelUiCtrl.prototype, "rankPanel", void 0);
    __decorate([
        property(cc.Node)
    ], HotelUiCtrl.prototype, "hotelView", void 0);
    HotelUiCtrl = __decorate([
        ccclass
    ], HotelUiCtrl);
    return HotelUiCtrl;
}(cc.Component));
exports.default = HotelUiCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcSG90ZWxcXEhvdGVsVWlDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUFxQztBQUNyQyxrREFBNkQ7QUFDN0QsMkNBQXNDO0FBQ3RDLG1EQUE4RjtBQUM5Riw4Q0FBNkM7QUFDN0MsNkNBQTRDO0FBQzVDLDBEQUFxRDtBQUNyRCx3Q0FBbUM7QUFDbkMsa0RBQTZDO0FBQzdDLG1EQUFvRDtBQUNwRCwyREFBMEQ7QUFDMUQsdUVBQXVFO0FBQ3ZFLGlEQUE0QztBQUV0QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQTBUQztRQXZURyxhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRzlCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixrQkFBWSxHQUFhLElBQUksQ0FBQztRQUc5QixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUdoQyx1QkFBaUIsR0FBYSxJQUFJLENBQUM7UUFHbkMsa0JBQVksR0FBYyxJQUFJLENBQUM7UUFHL0IsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBR2xCLHlCQUFtQixHQUFXLElBQUksQ0FBQztRQWtEbkMsZUFBUyxHQUFHLElBQUksQ0FBQztRQW1DakIsY0FBUSxHQUFHLElBQUksQ0FBQzs7SUE4TDVCLENBQUM7SUFqUkcsNEJBQU0sR0FBTjtRQUVJLFdBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLHNCQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FB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UCxzQ0FBZ0IsR0FBeEIsVUFBeUIsSUFBZ0I7UUFDckMsSUFBSSxjQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsV0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0wsQ0FBQztJQXBURDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNNO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ1k7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDVTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ1E7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxREFDVztJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO21EQUNTO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dURBQ2E7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzswREFDZ0I7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztxREFDVztJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ1E7SUFwQ1QsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQTBUL0I7SUFBRCxrQkFBQztDQTFURCxBQTBUQyxDQTFUd0MsRUFBRSxDQUFDLFNBQVMsR0EwVHBEO2tCQTFUb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNIGZyb20gXCIuLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgSVVzZXJJbmZvLCBDdXJyZW5jeUlkIH0gZnJvbSBcIi4uLy4uL0Jhc2UvQmFzZUNvbnN0XCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuLi9Db21tb24vQ29tbW9uXCI7XG5pbXBvcnQgeyBNYXhQb3dlckNvdW50LCBQb3dlckNvbmZpZywgV2FyaW5nVGlwcywgU2NlbmVUYXNrS2V5IH0gZnJvbSBcIi4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vQmFzZS9VdGlscy9VdGlsXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi9EYXRhL0NvbnN0L0V2ZW50XCI7XG5pbXBvcnQgQnV5UG93ZXJDdHJsIGZyb20gXCIuLi9Db21tb24vVUkvQnV5UG93ZXJDdHJsXCI7XG5pbXBvcnQgQXBwcyBmcm9tIFwiLi4vLi4vQmFzZS9BcHBzXCI7XG5pbXBvcnQgVUlNZ3IgZnJvbSBcIi4uLy4uL0Jhc2UvTWFuYWdlci9VSU1nclwiO1xuaW1wb3J0IHsgVUlIdWREZWYgfSBmcm9tIFwiLi4vRGF0YS9JbnRlcmZhY2UvVUlEYXRhXCI7XG5pbXBvcnQgeyBHdWlkZVV0aWxzIH0gZnJvbSBcIi4uLy4uLy4uL0dvZEd1aWRlL0d1aWRlVXRpbHNcIjtcbmltcG9ydCB7IElDbG91ZERhdGEgfSBmcm9tIFwiLi4vU2ltdWxhdGlvbk9wZXJhdGlvbi9WaWV3L01hcC9DbG91ZFZpZXdcIjtcbmltcG9ydCBIb3RlbFZpZXdDdHJsIGZyb20gXCIuL0hvdGVsVmlld0N0cmxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvdGVsVWlDdHJsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRvcE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYnV5UG93ZXJQYW5lbDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBidXlQb3dlckJ0bjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBib3R0b21Cb3g6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGNvaW5MYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGRpYW1vbmRMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHBvd2VyTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBjb3VudERvd25MYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGx2TGFiZWxPblN0YXJ0QnRuOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGF2YXRhclNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHJhbmtQYW5lbDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBob3RlbFZpZXc6IGNjLk5vZGUgPSBudWxsO1xuXG5cbiAgICBwcml2YXRlIF9vcmdpbkJvdHRvbUJveFBvc1k6IG51bWJlciA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICAgICAgTS5ydW50aW1lLmFkZEN1cnJlbmN5KEN1cnJlbmN5SWQuQ29pbiwgMTAwMDAwKTtcbiAgICAgICAgTS5ydW50aW1lLmFkZEN1cnJlbmN5KEN1cnJlbmN5SWQuRGlhbW9uZCwgMTAwMDAwKTtcbiAgICAgICAgTS5ydW50aW1lLmFkZEN1cnJlbmN5KEN1cnJlbmN5SWQuUG93ZXIsIDEwMDApO1xuXG4gICAgICAgIHRoaXMuX2luaXRWaWV3KCk7XG4gICAgICAgIHRoaXMuX2luaXRFdmVudCgpO1xuICAgICAgICB0aGlzLl9pbml0VG91Y2goKTtcbiAgICAgICAgdGhpcy5fY2hlY2tIYXZhUmV3YXJkKCk7XG4gICAgICAgIHRoaXMuX29uVXBkYXRlUmVtaW5UaW1lKCk7XG4gICAgICAgIHRoaXMuX2NoZWNrT2ZmbGluZVJld2FyZCgpO1xuICAgICAgICB0aGlzLl9jaGVja0p1bXBTY2VuZVRhc2soKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2Rlc3RvcnlFdmVudCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rlc3RvcnlFdmVudCgpIHtcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LlVJLlVwZGF0ZUN1cnJlbmN5LCB0aGlzLl9vblVwZGF0ZUNycmVuY3lWaWV3LCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LlVJLlVwZGF0ZVJlbWFpbkFkZFBvd2VyVGltZSwgdGhpcy5fb25VcGRhdGVSZW1pblRpbWUsIHRoaXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRFdmVudCgpIHtcbiAgICAgICAgTS5ldmVudC5yZWdpc3RlcihFdmVudC5VSS5VcGRhdGVDdXJyZW5jeSwgdGhpcy5fb25VcGRhdGVDcnJlbmN5VmlldywgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuVUkuVXBkYXRlUmVtYWluQWRkUG93ZXJUaW1lLCB0aGlzLl9vblVwZGF0ZVJlbWluVGltZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdFRvdWNoKCkge1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLl90b3VjaENhbmNlbCwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fdG91Y2hTdGFydCwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLl90b3VjaE1vdmUsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl90b3VjaEVuZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdFZpZXcoKSB7XG4gICAgICAgIHRoaXMuX2luaXRMZXZlbERpc3BsYXkoKTtcbiAgICAgICAgdGhpcy5faW5pdENycmVuY3lEaXNwbGF5KCk7XG4gICAgICAgIHRoaXMuX2NoZWNrQXV0aCgpO1xuICAgICAgICB0aGlzLl9vcmdpbkJvdHRvbUJveFBvc1kgPSB0aGlzLmJvdHRvbUJveC55O1xuICAgICAgICBpZiAoVXRpbC5Ub29sLmlzSXB4KCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IHRoaXMudG9wTm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcbiAgICAgICAgICAgIHdpZGdldC50b3AgPSA3MDtcbiAgICAgICAgICAgIHdpZGdldC51cGRhdGVBbGlnbm1lbnQoKTtcbiAgICAgICAgICAgIC8vIHRoaXMuY29pbkxhYi5ub2RlLnBhcmVudC5zZXRQb3NpdGlvbigtMjQsIC0xMik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBfc3RhcnRQb3MgPSBudWxsO1xuICAgIHByaXZhdGUgX3RvdWNoU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5fc3RhcnRQb3MgPSBldmVudC50b3VjaC5nZXRMb2NhdGlvbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLl9tb3ZlUG9zICYmIHRoaXMuX3N0YXJ0UG9zKSB7XG4gICAgICAgICAgICAvL+WIpOaWrXjnmoTot53nprtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLl9zdGFydFBvcy54IC0gdGhpcy5fbW92ZVBvcy54KSA8IDEwMCkge1xuICAgICAgICAgICAgICAgIC8v5Yik5pateeeahOi3neemu1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdGFydFBvcy55IDwgMjAwICYmIHRoaXMuX21vdmVQb3MueSA+IHRoaXMuX3N0YXJ0UG9zLnkgJiYgTWF0aC5hYnModGhpcy5fbW92ZVBvcy55IC0gdGhpcy5fc3RhcnRQb3MueSkgPiAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYTAgPSBjYy5tb3ZlVG8oMC4yLCBjYy52MigwLCB0aGlzLmJvdHRvbUJveC55ICsgNTApKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYTEgPSBjYy5tb3ZlVG8oMC4xLCBjYy52MigwLCB0aGlzLmJvdHRvbUJveC55IC0gMTAwKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGEyID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgVUlNZ3IuaW5zLnNob3dVSShVSUh1ZERlZi5DbG91ZFZpZXcsIElDbG91ZERhdGEuT3BlbkhvdGVsLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lvIBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3RlbFZpZXcuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhvdGVsVmlldy5nZXRDb21wb25lbnQoSG90ZWxWaWV3Q3RybCkuaW5pdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5YWzXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm90dG9tQm94LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhMCwgYTEsIGEyKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RvdWNoQ2FuY2VsKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdG91Y2hDYW5jZWwoKSB7XG4gICAgICAgIHRoaXMuX3N0YXJ0UG9zID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbW92ZVBvcyA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbW92ZVBvcyA9IG51bGw7XG4gICAgcHJpdmF0ZSBfdG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLl9zdGFydFBvcykge1xuICAgICAgICAgICAgdGhpcy5fbW92ZVBvcyA9IGV2ZW50LnRvdWNoLmdldExvY2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHByaXZhdGUgX2luaXRMZXZlbERpc3BsYXkoKSB7XG4gICAgICAgIHRoaXMubHZMYWJlbE9uU3RhcnRCdG4uc3RyaW5nID0gYCR7TS5ydW50aW1lLmdldE1hdGNoM0xldmVsKCl9YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jaGVja0F1dGgoKSB7XG4gICAgICAgIE0ucGxhdGZvcm0uZ2V0VXNlckluZm8oKS50aGVuKChpbmZvKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgICAgIGlmICghaW5mbykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IE0ucGxhdGZvcm0uY3JlYXRlQXV0aEJ1dHRvbih7IHg6IDAsIHk6IDAsIHc6IGNjLndpblNpemUud2lkdGgsIGg6IGNjLndpblNpemUuaGVpZ2h0IH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gcmVzb2x2ZShpbmZvKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KS50aGVuKCh1c2VyaW5mbykgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXJpbmZvKSB7XG4gICAgICAgICAgICAgICAgTS5uZXQubG9naW4odHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQXZhdGFyKHVzZXJpbmZvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25VcGRhdGVDcnJlbmN5Vmlldyh0eXBlOiBDdXJyZW5jeUlkLCBjb3VudDogbnVtYmVyID0gMCkge1xuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXNbYCR7TS5ydW50aW1lLmdldEN1cnJlbmN5S2V5KHR5cGUpfUxhYmBdO1xuICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlID09IEN1cnJlbmN5SWQuUG93ZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJQb3dlciA9IE0ucnVudGltZS5nZXRDdXJyZW5jeShDdXJyZW5jeUlkLlBvd2VyKTtcbiAgICAgICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBgJHtjdXJQb3dlcn0vJHtNYXhQb3dlckNvdW50fWA7XG4gICAgICAgICAgICAgICAgdGhpcy5idXlQb3dlckJ0bi5hY3RpdmUgPSAhKGN1clBvd2VyID49IE1heFBvd2VyQ291bnQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IEN1cnJlbmN5SWQuQ29pbikge1xuICAgICAgICAgICAgICAgIGxldCB2ID0gY291bnQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSBDdXJyZW5jeUlkLkNvaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdiA9IENvbW1vbi5ieXRlc1RvU2l6ZShjb3VudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IHY7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gQ3VycmVuY3lJZC5EaWFtb25kKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwuc3RyaW5nID0gTS5ydW50aW1lLmdldEN1cnJlbmN5KEN1cnJlbmN5SWQuRGlhbW9uZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVBdmF0YXIodXNlcmluZm86IElVc2VySW5mbykge1xuICAgICAgICBpZiAodXNlcmluZm8uYXZhdGFyVXJsKSB7XG4gICAgICAgICAgICBDb21tb24uZ2V0UmVtb3RQaWModXNlcmluZm8uYXZhdGFyVXJsKS50aGVuKGZyYW1lID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdmF0YXJTcHJpdGUuc3ByaXRlRnJhbWUgPSBmcmFtZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0Q3JyZW5jeURpc3BsYXkoKSB7XG4gICAgICAgIHRoaXMuY29pbkxhYmVsLnN0cmluZyA9IE0ucnVudGltZS5nZXRGb3JtYXRlQ29pbigpO1xuICAgICAgICB0aGlzLmRpYW1vbmRMYWJlbC5zdHJpbmcgPSBNLnJ1bnRpbWUuZ2V0Q3VycmVuY3lTdHIoQ3VycmVuY3lJZC5EaWFtb25kKTtcbiAgICAgICAgLy8gdGhpcy4uc3RyaW5nID0gTS5ydW50aW1lLmdldFN0YXJDb3VudCgpLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGN1clBvd2VyID0gTS5ydW50aW1lLmdldEN1cnJlbmN5KEN1cnJlbmN5SWQuUG93ZXIpO1xuICAgICAgICB0aGlzLnBvd2VyTGFiZWwuc3RyaW5nID0gYCR7Y3VyUG93ZXJ9LyR7TWF4UG93ZXJDb3VudH1gO1xuICAgICAgICB0aGlzLmJ1eVBvd2VyQnRuLmFjdGl2ZSA9ICEoY3VyUG93ZXIgPiBNYXhQb3dlckNvdW50KVxuICAgIH1cblxuICAgIHByaXZhdGUgX3Nob3dTZWxlY3REbGcoKSB7XG4gICAgICAgIGxldCBuZXh0ID0gR3VpZGVVdGlscy5jaGVja01hdGNoTmV4dCgpO1xuICAgICAgICBuZXh0ICYmIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuU2VsZWN0U2hvd1RhcmdldCwgeyB0eXBlOiBVSUh1ZERlZi5TZWxlY3RTaG93VGFyZ2V0LCBkYXRhOiBNLnJ1bnRpbWUuU2VsZWN0TGV2ZWwgfHwgbnVsbCB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25BZGRCdG5DbGljayhldmVudCwgY3VzdG9tVmFsdWU6IHN0cmluZykge1xuICAgICAgICBsZXQgdHlwZTogQ3VycmVuY3lJZCA9IEN1cnJlbmN5SWQuRGlhbW9uZDtcbiAgICAgICAgc3dpdGNoIChjdXN0b21WYWx1ZSkge1xuICAgICAgICAgICAgY2FzZSAnY29pbic6XG4gICAgICAgICAgICAgICAgdHlwZSA9IEN1cnJlbmN5SWQuQ29pbjtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRDcnJlbmN5Q2xpY2sodHlwZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdwb3dlcic6XG4gICAgICAgICAgICAgICAgdHlwZSA9IEN1cnJlbmN5SWQuUG93ZXI7XG4gICAgICAgICAgICAgICAgdGhpcy5idXlQb3dlclBhbmVsLmdldENvbXBvbmVudChCdXlQb3dlckN0cmwpLnNob3coKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RpYW1vbmQnOlxuICAgICAgICAgICAgICAgIHR5cGUgPSBDdXJyZW5jeUlkLkRpYW1vbmQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkQ3JyZW5jeUNsaWNrKHR5cGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRCb3R0b21Cb3hQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX29yZ2luQm90dG9tQm94UG9zWSkge1xuICAgICAgICAgICAgdGhpcy5ib3R0b21Cb3gueSA9IHRoaXMuX29yZ2luQm90dG9tQm94UG9zWTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkxldmVsQnRuQ2xpY2soKSB7XG4gICAgICAgIE0ucnVudGltZS5TZWxlY3RMZXZlbCA9IDA7XG4gICAgICAgIHRoaXMuX3Nob3dTZWxlY3REbGcoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TaG93RGFpbHlUYXNrQnRuQ2xpY2soKSB7XG4gICAgICAgIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuRGFpbHlUYXNrUGFuZWwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Nob3dPZmZsaW5lUmV3YXIoY3VycmVudFNlclRpbWU6IG51bWJlcikge1xuICAgICAgICBjb25zdCBsYXN0VGltZSA9IE0ucnVudGltZS5nZXRMYXN0VGltZSgpO1xuICAgICAgICBjb25zdCBnYXBUaW1lID0gY3VycmVudFNlclRpbWUgLSBsYXN0VGltZTtcbiAgICAgICAgaWYgKGxhc3RUaW1lID4gMTAwMDAwMCAmJiBnYXBUaW1lID4gUG93ZXJDb25maWcuTm9ybWFsVGltZSkge1xuICAgICAgICAgICAgbGV0IG9mZmxpbmVQb3dlciA9IChnYXBUaW1lIC8gUG93ZXJDb25maWcuTm9ybWFsVGltZSkgPj4gMDtcbiAgICAgICAgICAgIGNvbnN0IGNwb3dlciA9IE0ucnVudGltZS5nZXRDdXJyZW5jeShDdXJyZW5jeUlkLlBvd2VyKTtcbiAgICAgICAgICAgIGlmIChjcG93ZXIgPCBNYXhQb3dlckNvdW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcG93ZXIgPSAoY3Bvd2VyICsgb2ZmbGluZVBvd2VyKSA+IE1heFBvd2VyQ291bnQgPyBNYXhQb3dlckNvdW50IC0gY3Bvd2VyIDogb2ZmbGluZVBvd2VyO1xuICAgICAgICAgICAgICAgIGlmIChwb3dlciA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgTS5ydW50aW1lLmFkZEN1cnJlbmN5KEN1cnJlbmN5SWQuUG93ZXIsIHBvd2VyKTtcbiAgICAgICAgICAgICAgICAgICAgTS50aXBzLnNob3coYCR7V2FyaW5nVGlwcy5PZmZsaW5lUmV3YXJkfSR7cG93ZXJ96IO96YePYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIE0ucnVudGltZS5zZXRTZXJ2ZXJUaW1lKGN1cnJlbnRTZXJUaW1lKTtcbiAgICAgICAgdGhpcy5fb25VcGRhdGVSZW1pblRpbWUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vblVwZGF0ZVJlbWluVGltZShjdXJUaW1lQ291bnQ6IG51bWJlciA9IDApIHtcbiAgICAgICAgaWYgKE0ucnVudGltZS5nZXRDdXJyZW5jeShDdXJyZW5jeUlkLlBvd2VyKSA+PSBNYXhQb3dlckNvdW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50RG93bkxhYmVsLnN0cmluZyA9ICfmu6HkuoYhJ1xuICAgICAgICB9IGVsc2UgaWYgKGN1clRpbWVDb3VudCkge1xuICAgICAgICAgICAgY29uc3QgdGltZSA9IFBvd2VyQ29uZmlnLk5vcm1hbFRpbWUgLSAoY3VyVGltZUNvdW50ICUgUG93ZXJDb25maWcuTm9ybWFsVGltZSk7XG4gICAgICAgICAgICB0aGlzLmNvdW50RG93bkxhYmVsLnN0cmluZyA9IGAke1V0aWwuVGltZXIuY29udmVyc2lvblRpbWUodGltZSwgdHJ1ZSwgeyBtOiB0cnVlIH0pfSDlkI4gKyR7UG93ZXJDb25maWcuTm9ybWFsQ291bnR9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuajgOa1i+aYr+WQpuacieeVjOmdoui3s+i9rOS7u+WKoSAqL1xuICAgIHByaXZhdGUgX2NoZWNrSnVtcFNjZW5lVGFzaygpIHtcbiAgICAgICAgaWYgKE0ucnVudGltZS5TY2VuZVRhc2sgJiYgTS5ydW50aW1lLlNjZW5lVGFzay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCB0YXNrID0gTS5ydW50aW1lLlNjZW5lVGFzay5zaGlmdCgpO1xuICAgICAgICAgICAgc3dpdGNoICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBTY2VuZVRhc2tLZXkuU2hvd1RhcmdldERsZzpcbiAgICAgICAgICAgICAgICAgICAgTS51aS5jbG9zZUFsbFVJKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dTZWxlY3REbGcoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jaGVja0p1bXBTY2VuZVRhc2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v56a757q/5aWW5YqxIVxuICAgIHByaXZhdGUgX2NoZWNrT2ZmbGluZVJld2FyZCgpIHtcbiAgICAgICAgTS5ydW50aW1lLmdldFNlcnZlckNvbmZpZygpLnRoZW4oY29uZmlnID0+IHtcbiAgICAgICAgICAgIGNvbmZpZyAmJiB0aGlzLl9zaG93T2ZmbGluZVJld2FyKGNvbmZpZy50aW1lKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jaGVja0hhdmFSZXdhcmQoKSB7XG4gICAgICAgIGlmIChNLnJ1bnRpbWUuUmV3YXJkVGFzayAmJiBNLnJ1bnRpbWUuUmV3YXJkVGFzay5yZXdhcmQpIHtcbiAgICAgICAgICAgIGNvbnN0IHJld2FyZHMgPSBDb21tb24uZ2V0UmV3YXJkQXJyYXkoTS5ydW50aW1lLlJld2FyZFRhc2sucmV3YXJkKTtcbiAgICAgICAgICAgIE0udWkuc2hvd1VJKFVJSHVkRGVmLk9wZW5Cb3gsIHsgY29uZmlnOiB7IHJld2FyZHMsIHRleHQ6IE0ucnVudGltZS5SZXdhcmRUYXNrLnRleHQgfSB9KTtcbiAgICAgICAgICAgIE0ucnVudGltZS5SZXdhcmRUYXNrID0gbnVsbDtcbiAgICAgICAgICAgIEd1aWRlVXRpbHMuc3RvcEd1aWRlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvL2ZvciB0ZXN0XG4gICAgICAgIC8vIGlmIChNLnJ1bnRpbWUuQ3VyTGV2ZWwgPiAzKSB7XG4gICAgICAgIC8vICAgICBNLnJ1bnRpbWUuc2V0Qm94R2lmdERhdGEoMTAsIGZhbHNlKTtcbiAgICAgICAgLy8gICAgIGNvbnN0IGJveENvbmZpZyA9IE0udGFibGUuQm94UmV3YXJkSW5mby5nZXRCeVByaW1hcnlLZXkoMTApO1xuICAgICAgICAvLyAgICAgaWYgKGJveENvbmZpZykge1xuICAgICAgICAvLyAgICAgICAgIC8v5bGV56S65aWW5YqxdWkgLiDlj5HmlL7lpZblirFcbiAgICAgICAgLy8gICAgICAgICBNLnVpLnNob3dVSShVSUh1ZERlZi5PcGVuQm94LCB7IGNvbmZpZzogYm94Q29uZmlnIH0pO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgR3VpZGVVdGlscy5zdG9wR3VpZGUgPSB0cnVlO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG5cblxuICAgIC8vIHB1YmxpYyBvblNlbGVjdEx2Q2xpY2soKSB7XG4gICAgLy8gICAgIC8vIFVJTWdyLmlucy5oaWRlVUkoVUlIdWREZWYuTWVudVBhbmVsKTtcbiAgICAvLyAgICAgLy8gQ29tbW9uLmp1bXBTY2VuZShTY2VuZS5MZXZlbCk7XG4gICAgLy8gICAgIC8vIE1hcElzbGFuZFV0aWxzLmxlYXZlTWFwSXNsYW5kKCk7XG4gICAgLy8gICAgIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuQ2xvdWRWaWV3LCBJQ2xvdWREYXRhLkxlYXZlSXNsYW5kKTtcbiAgICAvLyB9XG5cblxuICAgIC8qKuaJp+ihjOa3u+WKoOi0p+W4geaTjeS9nCEgKi9cbiAgICBwcml2YXRlIF9hZGRDcnJlbmN5Q2xpY2sodHlwZTogQ3VycmVuY3lJZCkge1xuICAgICAgICBpZiAoQXBwcy5pc0RlYnVnKSB7XG4gICAgICAgICAgICBNLnJ1bnRpbWUuYWRkQ3VycmVuY3kodHlwZSwgMTAwMDAwMDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbiJdfQ==