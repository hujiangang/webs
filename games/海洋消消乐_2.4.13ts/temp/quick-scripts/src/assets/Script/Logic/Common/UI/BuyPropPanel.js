"use strict";
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