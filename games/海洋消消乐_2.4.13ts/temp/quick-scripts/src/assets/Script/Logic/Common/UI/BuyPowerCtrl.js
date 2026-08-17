"use strict";
cc._RF.push(module, '3870eslbRNDkLHbfHyHZpiE', 'BuyPowerCtrl');
// Script/Logic/Common/UI/BuyPowerCtrl.ts

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
var Constant_1 = require("../../Data/Const/Constant");
var BaseConst_1 = require("../../../Base/BaseConst");
var Common_1 = require("../Common");
var Event_1 = require("../../Data/Const/Event");
var Util_1 = require("../../../Base/Utils/Util");
var MoneyManager_1 = require("../../Data/MoneyManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BuyPowerCtrl = /** @class */ (function (_super) {
    __extends(BuyPowerCtrl, _super);
    function BuyPowerCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.remainPowerCount = null;
        _this.countDown = null;
        _this.fillFullLabl = null;
        _this.littleMoney = null;
        _this.littlePrice = null;
        _this.littleCount = null;
        _this.bigPrice = null;
        _this.bigCount = null;
        _this.bigMoney = null;
        _this.fillallPrice = 0;
        _this.fullCount = 0;
        _this._animation = null;
        return _this;
    }
    BuyPowerCtrl.prototype.onLoad = function () {
        this._initView();
        this._animation = this.node.getComponent(cc.Animation);
        M_1.default.event.register(Event_1.Event.UI.UpdateRemainAddPowerTime, this.updateCountDown, this);
    };
    BuyPowerCtrl.prototype.onDestroy = function () {
        M_1.default.event.unRegister(Event_1.Event.UI.UpdateRemainAddPowerTime, this.updateCountDown, this);
    };
    BuyPowerCtrl.prototype._initView = function () {
        this._updateFillFull();
        this._initTowBottle();
    };
    BuyPowerCtrl.prototype._updateFillFull = function () {
        var unityPrice = M_1.default.table.PropInfo.getByPrimaryKey(Constant_1.PropType.PowerUnitPrice).price;
        var curPower = M_1.default.runtime.getCurrency(BaseConst_1.CurrencyId.Power);
        this.fullCount = Constant_1.MaxPowerCount - curPower;
        this.fillallPrice = unityPrice * this.fullCount;
        this.fillFullLabl.string = Common_1.default.bytesToSize(this.fillallPrice) + "\u8865\u6EE1\u7CBE\u529B";
        this.remainPowerCount.string = curPower + "/" + Constant_1.MaxPowerCount;
    };
    BuyPowerCtrl.prototype._initTowBottle = function () {
        var keys = [Constant_1.PropType.PowerBottle1, Constant_1.PropType.PowerBottle2];
        var countLabs = [this.littleCount, this.bigCount];
        var moneyNodes = [this.littleMoney, this.bigMoney];
        var prices = [this.littlePrice, this.bigPrice];
        keys.forEach(function (key, index) {
            var info = M_1.default.table.PropInfo.getByPrimaryKey(key);
            var data = M_1.default.runtime.getPropData(key);
            if (info) {
                if (data && data.count) {
                    countLabs[index].node.active = true;
                    countLabs[index].string = "x" + data.count;
                    moneyNodes[index].active = false;
                }
                else {
                    countLabs[index].node.active = false;
                    moneyNodes[index].active = true;
                    prices[index].string = Common_1.default.bytesToSize(info.price);
                }
            }
        });
    };
    BuyPowerCtrl.prototype.show = function () {
        this.node.active = true;
        this._animation.play('ShowSelectLevel');
    };
    BuyPowerCtrl.prototype.onCloseBtnClick = function () {
        var _this = this;
        M_1.default.event.send(Event_1.Event.UI.UpdateRemainAddPowerTime);
        this._animation.play('HideSelectLevel');
        this.scheduleOnce(function () {
            _this.node.active = false;
        }, 0.30);
    };
    BuyPowerCtrl.prototype.updateCountDown = function (time) {
        if (this.node.active) {
            //当前能力值
            var currentPower = M_1.default.runtime.getCurrency(BaseConst_1.CurrencyId.Power);
            //计算增量
            var incremental = time % Constant_1.PowerConfig.NormalTime; //Math.ceil((time / PowerConfig.NormalTime)) * (time % PowerConfig.NormalTime);
            //计算现在的总量 
            var maxTime = (Constant_1.MaxPowerCount - currentPower) * Constant_1.PowerConfig.NormalTime;
            this.countDown.string = Util_1.Util.Timer.conversionTime(maxTime - incremental, false);
            this._updateFillFull();
        }
    };
    BuyPowerCtrl.prototype.onFillFullClick = function () {
        if (MoneyManager_1.MoneyManager.CheckMoney(BaseConst_1.CurrencyId.Coin, this.fillallPrice, true)) {
            M_1.default.tips.show(Constant_1.WaringTips.BuyOk);
            M_1.default.runtime.addCurrency(BaseConst_1.CurrencyId.Power, this.fullCount);
            this._initView();
            this.onCloseBtnClick();
        }
    };
    BuyPowerCtrl.prototype.onLittleClick = function () {
        this._doBottle(Constant_1.PropType.PowerBottle1);
    };
    BuyPowerCtrl.prototype.onBigClick = function () {
        this._doBottle(Constant_1.PropType.PowerBottle2);
    };
    BuyPowerCtrl.prototype._doBottle = function (type) {
        var data = M_1.default.runtime.getPropData(type);
        var info = M_1.default.table.PropInfo.getByPrimaryKey(type);
        if (data && data.count > 0) {
            //直接使用!
            M_1.default.runtime.addCurrency(BaseConst_1.CurrencyId.Power, info.value);
            M_1.default.runtime.updatePropCount(type, -1);
            if (M_1.default.runtime.getCurrency(BaseConst_1.CurrencyId.Power) >= Constant_1.MaxPowerCount) {
                this.onCloseBtnClick();
            }
        }
        else {
            //直接购买!
            if (MoneyManager_1.MoneyManager.CheckMoney(BaseConst_1.CurrencyId.Coin, info.price, true)) {
                M_1.default.tips.show(Constant_1.WaringTips.BuyOk);
                M_1.default.runtime.updatePropCount(type, 1);
            }
        }
        this._initView();
    };
    __decorate([
        property(cc.Label)
    ], BuyPowerCtrl.prototype, "remainPowerCount", void 0);
    __decorate([
        property(cc.Label)
    ], BuyPowerCtrl.prototype, "countDown", void 0);
    __decorate([
        property(cc.Label)
    ], BuyPowerCtrl.prototype, "fillFullLabl", void 0);
    __decorate([
        property(cc.Node)
    ], BuyPowerCtrl.prototype, "littleMoney", void 0);
    __decorate([
        property(cc.Label)
    ], BuyPowerCtrl.prototype, "littlePrice", void 0);
    __decorate([
        property(cc.Label)
    ], BuyPowerCtrl.prototype, "littleCount", void 0);
    __decorate([
        property(cc.Label)
    ], BuyPowerCtrl.prototype, "bigPrice", void 0);
    __decorate([
        property(cc.Label)
    ], BuyPowerCtrl.prototype, "bigCount", void 0);
    __decorate([
        property(cc.Node)
    ], BuyPowerCtrl.prototype, "bigMoney", void 0);
    BuyPowerCtrl = __decorate([
        ccclass
    ], BuyPowerCtrl);
    return BuyPowerCtrl;
}(cc.Component));
exports.default = BuyPowerCtrl;

cc._RF.pop();