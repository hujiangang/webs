
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/BuyPowerCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcQnV5UG93ZXJDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUF3QztBQUN4QyxzREFBNkY7QUFDN0YscURBQXFEO0FBQ3JELG9DQUErQjtBQUMvQixnREFBK0M7QUFDL0MsaURBQWdEO0FBQ2hELHdEQUF1RDtBQUVqRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQWdKQztRQTdJRyxzQkFBZ0IsR0FBYSxJQUFJLENBQUM7UUFHbEMsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixrQkFBWSxHQUFhLElBQUksQ0FBQztRQUc5QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixpQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixpQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUVqQixrQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRWQsZ0JBQVUsR0FBaUIsSUFBSSxDQUFDOztJQWdINUMsQ0FBQztJQTlHRyw2QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELFdBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQUssQ0FBQyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNw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QUFFO2dCQUM1RCxXQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5QixXQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDdEM7U0FDSjtRQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBM0lEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MERBQ2U7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDUTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3NEQUNXO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1U7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxREFDVTtJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3FEQUNVO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ087SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNPO0lBM0JSLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FnSmhDO0lBQUQsbUJBQUM7Q0FoSkQsQUFnSkMsQ0FoSnlDLEVBQUUsQ0FBQyxTQUFTLEdBZ0pyRDtrQkFoSm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IFByb3BUeXBlLCBQb3dlckNvbmZpZywgTWF4UG93ZXJDb3VudCwgV2FyaW5nVGlwcyB9IGZyb20gXCIuLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5pbXBvcnQgeyBDdXJyZW5jeUlkIH0gZnJvbSBcIi4uLy4uLy4uL0Jhc2UvQmFzZUNvbnN0XCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuLi9Db21tb25cIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VdGlscy9VdGlsXCI7XG5pbXBvcnQgeyBNb25leU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vRGF0YS9Nb25leU1hbmFnZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1eVBvd2VyQ3RybCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcmVtYWluUG93ZXJDb3VudDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGNvdW50RG93bjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGZpbGxGdWxsTGFibDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbGl0dGxlTW9uZXk6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxpdHRsZVByaWNlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbGl0dGxlQ291bnQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBiaWdQcmljZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGJpZ0NvdW50OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBiaWdNb25leTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBwcml2YXRlIGZpbGxhbGxQcmljZSA9IDA7XG4gICAgcHJpdmF0ZSBmdWxsQ291bnQgPSAwO1xuXG4gICAgcHJpdmF0ZSBfYW5pbWF0aW9uOiBjYy5BbmltYXRpb24gPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLl9pbml0VmlldygpO1xuICAgICAgICB0aGlzLl9hbmltYXRpb24gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuVUkuVXBkYXRlUmVtYWluQWRkUG93ZXJUaW1lLCB0aGlzLnVwZGF0ZUNvdW50RG93biwgdGhpcyk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuVUkuVXBkYXRlUmVtYWluQWRkUG93ZXJUaW1lLCB0aGlzLnVwZGF0ZUNvdW50RG93biwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdFZpZXcoKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUZpbGxGdWxsKCk7XG4gICAgICAgIHRoaXMuX2luaXRUb3dCb3R0bGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVGaWxsRnVsbCgpIHtcbiAgICAgICAgY29uc3QgdW5pdHlQcmljZSA9IE0udGFibGUuUHJvcEluZm8uZ2V0QnlQcmltYXJ5S2V5KFByb3BUeXBlLlBvd2VyVW5pdFByaWNlKS5wcmljZTtcbiAgICAgICAgY29uc3QgY3VyUG93ZXIgPSBNLnJ1bnRpbWUuZ2V0Q3VycmVuY3koQ3VycmVuY3lJZC5Qb3dlcik7XG5cbiAgICAgICAgdGhpcy5mdWxsQ291bnQgPSBNYXhQb3dlckNvdW50IC0gY3VyUG93ZXJcbiAgICAgICAgdGhpcy5maWxsYWxsUHJpY2UgPSB1bml0eVByaWNlICogdGhpcy5mdWxsQ291bnQ7XG4gICAgICAgIHRoaXMuZmlsbEZ1bGxMYWJsLnN0cmluZyA9IGAke0NvbW1vbi5ieXRlc1RvU2l6ZSh0aGlzLmZpbGxhbGxQcmljZSl96KGl5ruh57K+5YqbYDtcbiAgICAgICAgdGhpcy5yZW1haW5Qb3dlckNvdW50LnN0cmluZyA9IGAke2N1clBvd2VyfS8ke01heFBvd2VyQ291bnR9YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0VG93Qm90dGxlKCkge1xuICAgICAgICBjb25zdCBrZXlzID0gW1Byb3BUeXBlLlBvd2VyQm90dGxlMSwgUHJvcFR5cGUuUG93ZXJCb3R0bGUyXTtcbiAgICAgICAgY29uc3QgY291bnRMYWJzID0gW3RoaXMubGl0dGxlQ291bnQsIHRoaXMuYmlnQ291bnRdO1xuICAgICAgICBjb25zdCBtb25leU5vZGVzID0gW3RoaXMubGl0dGxlTW9uZXksIHRoaXMuYmlnTW9uZXldO1xuICAgICAgICBjb25zdCBwcmljZXMgPSBbdGhpcy5saXR0bGVQcmljZSwgdGhpcy5iaWdQcmljZV07XG4gICAgICAgIGtleXMuZm9yRWFjaCgoa2V5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IE0udGFibGUuUHJvcEluZm8uZ2V0QnlQcmltYXJ5S2V5KGtleSk7XG4gICAgICAgICAgICBjb25zdCBkYXRhOiB7IGNvdW50OiBudW1iZXIgfSA9IE0ucnVudGltZS5nZXRQcm9wRGF0YShrZXkpO1xuICAgICAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50TGFic1tpbmRleF0ubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjb3VudExhYnNbaW5kZXhdLnN0cmluZyA9IGB4JHtkYXRhLmNvdW50fWA7XG4gICAgICAgICAgICAgICAgICAgIG1vbmV5Tm9kZXNbaW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50TGFic1tpbmRleF0ubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbW9uZXlOb2Rlc1tpbmRleF0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcHJpY2VzW2luZGV4XS5zdHJpbmcgPSBDb21tb24uYnl0ZXNUb1NpemUoaW5mby5wcmljZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoJ1Nob3dTZWxlY3RMZXZlbCcpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsb3NlQnRuQ2xpY2soKSB7XG4gICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5VSS5VcGRhdGVSZW1haW5BZGRQb3dlclRpbWUpO1xuICAgICAgICB0aGlzLl9hbmltYXRpb24ucGxheSgnSGlkZVNlbGVjdExldmVsJyk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSwgMC4zMCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZUNvdW50RG93bih0aW1lKSB7XG4gICAgICAgIGlmICh0aGlzLm5vZGUuYWN0aXZlKSB7XG4gICAgICAgICAgICAvL+W9k+WJjeiDveWKm+WAvFxuICAgICAgICAgICAgY29uc3QgY3VycmVudFBvd2VyID0gTS5ydW50aW1lLmdldEN1cnJlbmN5KEN1cnJlbmN5SWQuUG93ZXIpO1xuICAgICAgICAgICAgLy/orqHnrpflop7ph49cbiAgICAgICAgICAgIGNvbnN0IGluY3JlbWVudGFsID0gdGltZSAlIFBvd2VyQ29uZmlnLk5vcm1hbFRpbWU7Ly9NYXRoLmNlaWwoKHRpbWUgLyBQb3dlckNvbmZpZy5Ob3JtYWxUaW1lKSkgKiAodGltZSAlIFBvd2VyQ29uZmlnLk5vcm1hbFRpbWUpO1xuICAgICAgICAgICAgLy/orqHnrpfnjrDlnKjnmoTmgLvph48gXG4gICAgICAgICAgICBjb25zdCBtYXhUaW1lID0gKE1heFBvd2VyQ291bnQgLSBjdXJyZW50UG93ZXIpICogUG93ZXJDb25maWcuTm9ybWFsVGltZTtcbiAgICAgICAgICAgIHRoaXMuY291bnREb3duLnN0cmluZyA9IFV0aWwuVGltZXIuY29udmVyc2lvblRpbWUobWF4VGltZSAtIGluY3JlbWVudGFsLCBmYWxzZSlcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUZpbGxGdWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25GaWxsRnVsbENsaWNrKCkge1xuICAgICAgICBpZiAoTW9uZXlNYW5hZ2VyLkNoZWNrTW9uZXkoQ3VycmVuY3lJZC5Db2luLCB0aGlzLmZpbGxhbGxQcmljZSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgIE0udGlwcy5zaG93KFdhcmluZ1RpcHMuQnV5T2spO1xuICAgICAgICAgICAgTS5ydW50aW1lLmFkZEN1cnJlbmN5KEN1cnJlbmN5SWQuUG93ZXIsIHRoaXMuZnVsbENvdW50KTtcbiAgICAgICAgICAgIHRoaXMuX2luaXRWaWV3KCk7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2VCdG5DbGljaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uTGl0dGxlQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuX2RvQm90dGxlKFByb3BUeXBlLlBvd2VyQm90dGxlMSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQmlnQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuX2RvQm90dGxlKFByb3BUeXBlLlBvd2VyQm90dGxlMik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZG9Cb3R0bGUodHlwZTogUHJvcFR5cGUpIHtcbiAgICAgICAgY29uc3QgZGF0YTogeyBjb3VudDogbnVtYmVyIH0gPSBNLnJ1bnRpbWUuZ2V0UHJvcERhdGEodHlwZSk7XG4gICAgICAgIGNvbnN0IGluZm8gPSBNLnRhYmxlLlByb3BJbmZvLmdldEJ5UHJpbWFyeUtleSh0eXBlKTtcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5jb3VudCA+IDApIHtcbiAgICAgICAgICAgIC8v55u05o6l5L2/55SoIVxuICAgICAgICAgICAgTS5ydW50aW1lLmFkZEN1cnJlbmN5KEN1cnJlbmN5SWQuUG93ZXIsIGluZm8udmFsdWUpO1xuICAgICAgICAgICAgTS5ydW50aW1lLnVwZGF0ZVByb3BDb3VudCh0eXBlLCAtMSk7XG4gICAgICAgICAgICBpZiAoTS5ydW50aW1lLmdldEN1cnJlbmN5KEN1cnJlbmN5SWQuUG93ZXIpID49IE1heFBvd2VyQ291bnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xvc2VCdG5DbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy/nm7TmjqXotK3kubAhXG4gICAgICAgICAgICBpZiAoTW9uZXlNYW5hZ2VyLkNoZWNrTW9uZXkoQ3VycmVuY3lJZC5Db2luLCBpbmZvLnByaWNlLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgIE0udGlwcy5zaG93KFdhcmluZ1RpcHMuQnV5T2spO1xuICAgICAgICAgICAgICAgIE0ucnVudGltZS51cGRhdGVQcm9wQ291bnQodHlwZSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW5pdFZpZXcoKTtcbiAgICB9XG5cbn1cbiJdfQ==