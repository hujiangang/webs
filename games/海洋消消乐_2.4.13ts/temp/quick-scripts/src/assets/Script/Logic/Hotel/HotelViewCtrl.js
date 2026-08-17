"use strict";
cc._RF.push(module, 'becb3ZRwRNHxbWxObmwUma6', 'HotelViewCtrl');
// Script/Logic/Hotel/HotelViewCtrl.ts

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
var UIData_1 = require("../Data/Interface/UIData");
var CloudView_1 = require("../SimulationOperation/View/Map/CloudView");
var HotelUiCtrl_1 = require("./HotelUiCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HotelViewCtrl = /** @class */ (function (_super) {
    __extends(HotelViewCtrl, _super);
    function HotelViewCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollView = null;
        _this.mainView = null;
        _this.topBox = null;
        _this._isTouchTopBox = false;
        _this._boxOrginPosY = null;
        return _this;
    }
    HotelViewCtrl.prototype.onLoad = function () {
        var _this = this;
        this.topBox.on(cc.Node.EventType.TOUCH_START, this.onTopBoxClick, this);
        this.node.on('bounce-top', this._onBounceTop, this);
        this.scheduleOnce(function () {
            if (!_this._boxOrginPosY) {
                _this._boxOrginPosY = _this.topBox.y;
            }
        }, 0.3);
    };
    HotelViewCtrl.prototype.init = function () {
        if (this._boxOrginPosY) {
            this.topBox.y = this._boxOrginPosY;
        }
    };
    HotelViewCtrl.prototype.onTopBoxClick = function () {
        this._isTouchTopBox = true;
    };
    HotelViewCtrl.prototype._cancelBoxClick = function () {
        this._isTouchTopBox = false;
        console.error('_cancelBoxClick');
    };
    /**顶部回弹 */
    HotelViewCtrl.prototype._onBounceTop = function () {
        var _this = this;
        if (this._isTouchTopBox) {
            var a0 = cc.moveTo(0.2, cc.v2(0, this.topBox.y - 50));
            var a1 = cc.moveTo(0.1, cc.v2(0, this.topBox.y + 100));
            var a2 = cc.callFunc(function () {
                M_1.default.ui.showUI(UIData_1.UIHudDef.CloudView, CloudView_1.ICloudData.OpenHotel, function () {
                    //开
                    _this.node.active = false;
                    _this.mainView.active = true;
                    _this.mainView.getComponent(HotelUiCtrl_1.default).initBottomBoxPosition();
                }, function () {
                    //关 
                });
            });
            this.topBox.runAction(cc.sequence(a0, a1, a2));
        }
        this._cancelBoxClick();
    };
    __decorate([
        property(cc.ScrollView)
    ], HotelViewCtrl.prototype, "scrollView", void 0);
    __decorate([
        property(cc.Node)
    ], HotelViewCtrl.prototype, "mainView", void 0);
    __decorate([
        property(cc.Node)
    ], HotelViewCtrl.prototype, "topBox", void 0);
    HotelViewCtrl = __decorate([
        ccclass
    ], HotelViewCtrl);
    return HotelViewCtrl;
}(cc.Component));
exports.default = HotelViewCtrl;

cc._RF.pop();