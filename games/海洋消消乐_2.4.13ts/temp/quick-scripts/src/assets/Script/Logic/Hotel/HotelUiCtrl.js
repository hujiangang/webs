"use strict";
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