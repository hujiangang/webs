
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/BuyPropPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8cabarQ+shIy6lL3CnGjBw3', 'BuyPropPanel');
// Script/Logic/Common/UI/BuyPropPanel.ts

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
var UIBase_1 = require("../../../Base/UI/UIBase");
var Constant_1 = require("../../Data/Const/Constant");
var M_1 = require("../../../Base/Manager/M");
var Common_1 = require("../Common");
var UIData_1 = require("../../Data/Interface/UIData");
var ReportMgr_1 = require("../../../Base/Manager/ReportMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BuyPropPanel = /** @class */ (function (_super) {
    __extends(BuyPropPanel, _super);
    function BuyPropPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propName = null;
        _this.propDetail = null;
        _this.buyCount = null;
        _this.buyMoney = null;
        _this.havaCoinLab = null;
        _this.propIcon = null;
        _this.currencyIcon = null;
        _this.propFrames = [];
        _this.currencyFrames = [];
        _this._type = null;
        _this._buyCount = 1;
        _this._buyMaxCount = 10;
        _this._cfg = null;
        _this._content = null;
        _this._isRuning = false;
        _this._originY = null;
        return _this;
    }
    BuyPropPanel.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        this._content.on(cc.Node.EventType.POSITION_CHANGED, function () {
            if (!_this._originY) {
                _this._originY = _this._content.y;
                _this._playIn(null);
            }
        }, this);
    };
    BuyPropPanel.prototype.onInit = function (type) {
        this._buyCount = 1;
        this._content = this.node.getChildByName('content');
        this._initView(type);
    };
    BuyPropPanel.prototype.onShow = function () {
        if (this._originY) {
            this._playIn(null);
        }
    };
    BuyPropPanel.prototype._initView = function (type) {
        this._type = type;
        this._cfg = M_1.default.table.PropInfo.getByPrimaryKey(type);
        if (this._cfg) {
            this.propName.string = this._cfg.name;
            this.propDetail.string = this._cfg.detail;
            this.propIcon.spriteFrame = this.propFrames[this._type - 100];
            this.currencyIcon.spriteFrame = this.currencyFrames[this._cfg.currencyType];
            this._updateView();
            this._updateBuyCount();
        }
    };
    BuyPropPanel.prototype._updateView = function () {
        this.havaCoinLab.string = "\u5F53\u524D\u91D1\u5E01:" + M_1.default.runtime.getFormateCoin();
    };
    BuyPropPanel.prototype.onAdd = function () {
        this._buyCount++;
        if (this._buyCount > this._buyMaxCount) {
            this._buyCount = this._buyMaxCount;
        }
        this._updateBuyCount();
    };
    BuyPropPanel.prototype.onSub = function () {
        this._buyCount--;
        if (this._buyCount < 1) {
            this._buyCount = 1;
        }
        this._updateBuyCount();
    };
    BuyPropPanel.prototype.onCloseBtnClick = function () {
        if (!this._isRuning) {
            this._playOut(function () {
                M_1.default.ui.hideUI(UIData_1.UIHudDef.BuyProp);
            });
        }
    };
    BuyPropPanel.prototype.onBuy = function () {
        if (this._buyCount > 0) {
            var price = this._buyCount * this._cfg.price;
            var currency = this._cfg.currencyType;
            if (price <= M_1.default.runtime.getCurrency(currency)) {
                M_1.default.runtime.addCurrency(currency, -price);
                M_1.default.runtime.updatePropCount(this._type, this._buyCount);
                M_1.default.tips.show(Constant_1.WaringTips.BuyOk);
                this._updateView();
                ReportMgr_1.default.ins.reportBuyProp(this._type, this._buyCount, M_1.default.runtime.getMatch3Level());
            }
            else {
                M_1.default.tips.show(Common_1.default.getCurrencyName(currency) + "\u4E0D\u591F!");
            }
        }
    };
    BuyPropPanel.prototype._updateBuyCount = function () {
        this.buyCount.string = this._buyCount.toString();
        this.buyMoney.string = (this._buyCount * this._cfg.price).toString();
    };
    BuyPropPanel.prototype._playIn = function (callback) {
        var _this = this;
        if (!this._isRuning) {
            this._content.y = this._originY - this._content.height;
            var a0 = cc.delayTime(0.0);
            var a1 = cc.moveTo(0.3, cc.v2(0, this._originY));
            var a2 = cc.callFunc(function () {
                callback && callback();
                _this._isRuning = false;
            }, this);
            this._isRuning = true;
            this._content.runAction(cc.sequence(a0, a1, a2));
        }
    };
    BuyPropPanel.prototype._playOut = function (callback) {
        var _this = this;
        if (!this._isRuning) {
            var a1 = cc.moveTo(0.3, cc.v2(0, this._originY - this._content.height));
            var a2 = cc.callFunc(function () {
                callback && callback();
                _this._isRuning = false;
            }, this);
            this._isRuning = true;
            this._content.runAction(cc.sequence(a1, a2));
        }
    };
    __decorate([
        property(cc.Label)
    ], BuyPropPanel.prototype, "propName", void 0);
    __decorate([
        property(cc.Label)
    ], BuyPropPanel.prototype, "propDetail", void 0);
    __decorate([
        property(cc.Label)
    ], BuyPropPanel.prototype, "buyCount", void 0);
    __decorate([
        property(cc.Label)
    ], BuyPropPanel.prototype, "buyMoney", void 0);
    __decorate([
        property(cc.Label)
    ], BuyPropPanel.prototype, "havaCoinLab", void 0);
    __decorate([
        property(cc.Sprite)
    ], BuyPropPanel.prototype, "propIcon", void 0);
    __decorate([
        property(cc.Sprite)
    ], BuyPropPanel.prototype, "currencyIcon", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], BuyPropPanel.prototype, "propFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], BuyPropPanel.prototype, "currencyFrames", void 0);
    BuyPropPanel = __decorate([
        ccclass
    ], BuyPropPanel);
    return BuyPropPanel;
}(UIBase_1.default));
exports.default = BuyPropPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcQnV5UHJvcFBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUE2QztBQUM3QyxzREFBaUU7QUFDakUsNkNBQXdDO0FBRXhDLG9DQUErQjtBQUMvQixzREFBdUQ7QUFFdkQsNkRBQXdEO0FBRWxELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBDLGdDQUFNO0lBQWhEO1FBQUEscUVBb0pDO1FBakpHLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsZ0JBQVUsR0FBYSxJQUFJLENBQUM7UUFHNUIsY0FBUSxHQUFhLElBQUksQ0FBQztRQUcxQixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLGNBQVEsR0FBYyxJQUFJLENBQUM7UUFHM0Isa0JBQVksR0FBYyxJQUFJLENBQUM7UUFHL0IsZ0JBQVUsR0FBcUIsRUFBRSxDQUFDO1FBR2xDLG9CQUFjLEdBQXFCLEVBQUUsQ0FBQztRQUU5QixXQUFLLEdBQWEsSUFBSSxDQUFDO1FBQ3ZCLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsa0JBQVksR0FBVyxFQUFFLENBQUM7UUFDMUIsVUFBSSxHQUFhLElBQUksQ0FBQztRQUN0QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsY0FBUSxHQUFXLElBQUksQ0FBQzs7SUFpSHBDLENBQUM7SUEvR0csNkJBQU0sR0FBTjtRQUFBLGlCQVFDO1FBUEcsaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNqRCxJQUFJLENB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QztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hEO0lBQ0wsQ0FBQztJQS9JRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNPO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ1M7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNPO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ1U7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztrREFDTztJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3NEQUNXO0lBRy9CO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29EQUNPO0lBR2xDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dEQUNXO0lBM0JyQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBb0poQztJQUFELG1CQUFDO0NBcEpELEFBb0pDLENBcEp5QyxnQkFBTSxHQW9KL0M7a0JBcEpvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVJQmFzZSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VSS9VSUJhc2VcIjtcbmltcG9ydCB7IFByb3BUeXBlLCBXYXJpbmdUaXBzIH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IFByb3BJbmZvIGZyb20gXCIuLi8uLi8uLi9CYXNlL1RhYmxzL1Byb3BJbmZvXCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuLi9Db21tb25cIjtcbmltcG9ydCB7IFVJSHVkRGVmIH0gZnJvbSBcIi4uLy4uL0RhdGEvSW50ZXJmYWNlL1VJRGF0YVwiO1xuaW1wb3J0IHsgQ3VycmVuY3lJZCB9IGZyb20gJy4uLy4uLy4uL0Jhc2UvQmFzZUNvbnN0JztcbmltcG9ydCBSZXBvcnRNZ3IgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvTWFuYWdlci9SZXBvcnRNZ3JcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1eVByb3BQYW5lbCBleHRlbmRzIFVJQmFzZSB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJvcE5hbWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcm9wRGV0YWlsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgYnV5Q291bnQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBidXlNb25leTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGhhdmFDb2luTGFiOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHByb3BJY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBjdXJyZW5jeUljb246IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBwcm9wRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBjdXJyZW5jeUZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBfdHlwZTogUHJvcFR5cGUgPSBudWxsO1xuICAgIHByaXZhdGUgX2J1eUNvdW50OiBudW1iZXIgPSAxO1xuICAgIHByaXZhdGUgX2J1eU1heENvdW50OiBudW1iZXIgPSAxMDtcbiAgICBwcml2YXRlIF9jZmc6IFByb3BJbmZvID0gbnVsbDtcbiAgICBwcml2YXRlIF9jb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcbiAgICBwcml2YXRlIF9pc1J1bmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX29yaWdpblk6IG51bWJlciA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLl9jb250ZW50Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsICgpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fb3JpZ2luWSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpblkgPSB0aGlzLl9jb250ZW50Lnk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheUluKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25Jbml0KHR5cGU6IFByb3BUeXBlKSB7XG4gICAgICAgIHRoaXMuX2J1eUNvdW50ID0gMTtcbiAgICAgICAgdGhpcy5fY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY29udGVudCcpO1xuICAgICAgICB0aGlzLl9pbml0Vmlldyh0eXBlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TaG93KCkge1xuICAgICAgICBpZiAodGhpcy5fb3JpZ2luWSkge1xuICAgICAgICAgICAgdGhpcy5fcGxheUluKG51bGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdFZpZXcodHlwZTogUHJvcFR5cGUpIHtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuX2NmZyA9IE0udGFibGUuUHJvcEluZm8uZ2V0QnlQcmltYXJ5S2V5KHR5cGUpO1xuICAgICAgICBpZiAodGhpcy5fY2ZnKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BOYW1lLnN0cmluZyA9IHRoaXMuX2NmZy5uYW1lO1xuICAgICAgICAgICAgdGhpcy5wcm9wRGV0YWlsLnN0cmluZyA9IHRoaXMuX2NmZy5kZXRhaWw7XG4gICAgICAgICAgICB0aGlzLnByb3BJY29uLnNwcml0ZUZyYW1lID0gdGhpcy5wcm9wRnJhbWVzW3RoaXMuX3R5cGUgLSAxMDBdO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW5jeUljb24uc3ByaXRlRnJhbWUgPSB0aGlzLmN1cnJlbmN5RnJhbWVzW3RoaXMuX2NmZy5jdXJyZW5jeVR5cGVdO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmlldygpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQnV5Q291bnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZVZpZXcoKSB7XG4gICAgICAgIHRoaXMuaGF2YUNvaW5MYWIuc3RyaW5nID0gYOW9k+WJjemHkeW4gToke00ucnVudGltZS5nZXRGb3JtYXRlQ29pbigpfWA7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQWRkKCkge1xuICAgICAgICB0aGlzLl9idXlDb3VudCsrO1xuICAgICAgICBpZiAodGhpcy5fYnV5Q291bnQgPiB0aGlzLl9idXlNYXhDb3VudCkge1xuICAgICAgICAgICAgdGhpcy5fYnV5Q291bnQgPSB0aGlzLl9idXlNYXhDb3VudDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVCdXlDb3VudCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblN1YigpIHtcbiAgICAgICAgdGhpcy5fYnV5Q291bnQtLVxuICAgICAgICBpZiAodGhpcy5fYnV5Q291bnQgPCAxKSB7XG4gICAgICAgICAgICB0aGlzLl9idXlDb3VudCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlQnV5Q291bnQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbG9zZUJ0bkNsaWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2lzUnVuaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9wbGF5T3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBNLnVpLmhpZGVVSShVSUh1ZERlZi5CdXlQcm9wKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25CdXkoKSB7XG4gICAgICAgIGlmICh0aGlzLl9idXlDb3VudCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHByaWNlID0gdGhpcy5fYnV5Q291bnQgKiB0aGlzLl9jZmcucHJpY2VcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbmN5ID0gdGhpcy5fY2ZnLmN1cnJlbmN5VHlwZTtcblxuICAgICAgICAgICAgaWYgKHByaWNlIDw9IE0ucnVudGltZS5nZXRDdXJyZW5jeShjdXJyZW5jeSkpIHtcbiAgICAgICAgICAgICAgICBNLnJ1bnRpbWUuYWRkQ3VycmVuY3koY3VycmVuY3ksIC1wcmljZSk7XG4gICAgICAgICAgICAgICAgTS5ydW50aW1lLnVwZGF0ZVByb3BDb3VudCh0aGlzLl90eXBlLCB0aGlzLl9idXlDb3VudCk7XG4gICAgICAgICAgICAgICAgTS50aXBzLnNob3coV2FyaW5nVGlwcy5CdXlPayk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmlldygpO1xuICAgICAgICAgICAgICAgIFJlcG9ydE1nci5pbnMucmVwb3J0QnV5UHJvcCh0aGlzLl90eXBlLCB0aGlzLl9idXlDb3VudCwgTS5ydW50aW1lLmdldE1hdGNoM0xldmVsKCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBNLnRpcHMuc2hvdyhgJHtDb21tb24uZ2V0Q3VycmVuY3lOYW1lKGN1cnJlbmN5KX3kuI3lpJ8hYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVCdXlDb3VudCgpIHtcbiAgICAgICAgdGhpcy5idXlDb3VudC5zdHJpbmcgPSB0aGlzLl9idXlDb3VudC50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmJ1eU1vbmV5LnN0cmluZyA9ICh0aGlzLl9idXlDb3VudCAqIHRoaXMuX2NmZy5wcmljZSkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wbGF5SW4oY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICBpZiAoIXRoaXMuX2lzUnVuaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZW50LnkgPSB0aGlzLl9vcmlnaW5ZIC0gdGhpcy5fY29udGVudC5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBhMCA9IGNjLmRlbGF5VGltZSgwLjApO1xuICAgICAgICAgICAgY29uc3QgYTEgPSBjYy5tb3ZlVG8oMC4zLCBjYy52MigwLCB0aGlzLl9vcmlnaW5ZKSk7XG4gICAgICAgICAgICBjb25zdCBhMiA9IGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzUnVuaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9LCB0aGlzKVxuICAgICAgICAgICAgdGhpcy5faXNSdW5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fY29udGVudC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYTAsIGExLCBhMikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGxheU91dChjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmICghdGhpcy5faXNSdW5pbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGExID0gY2MubW92ZVRvKDAuMywgY2MudjIoMCwgdGhpcy5fb3JpZ2luWSAtIHRoaXMuX2NvbnRlbnQuaGVpZ2h0KSlcbiAgICAgICAgICAgIGNvbnN0IGEyID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNSdW5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIHRoaXMpXG4gICAgICAgICAgICB0aGlzLl9pc1J1bmluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9jb250ZW50LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhMSwgYTIpKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5cbiJdfQ==