"use strict";
cc._RF.push(module, '7d8f30zJBhEor6VWQiX3GJ4', 'MoreCoin');
// Script/Logic/Common/UI/MoreCoin.ts

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
var UIMgr_1 = require("../../../Base/Manager/UIMgr");
var UIData_1 = require("../../Data/Interface/UIData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MoreCoin = /** @class */ (function (_super) {
    __extends(MoreCoin, _super);
    function MoreCoin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contentLabel = null;
        _this._animation = null;
        return _this;
    }
    MoreCoin.prototype.onInit = function () {
        if (!this._animation) {
            this._animation = this.getComponent(cc.Animation);
        }
        this._animation.play('moreCoin');
    };
    MoreCoin.prototype.onGo = function () {
        UIMgr_1.default.ins.hideUI(UIData_1.UIHudDef.MoreCoin);
        UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.SelectShowTarget, { type: UIData_1.UIHudDef.SelectShowTarget, data: null });
    };
    MoreCoin.prototype.onNotGo = function () {
        UIMgr_1.default.ins.hideUI(UIData_1.UIHudDef.MoreCoin);
    };
    __decorate([
        property(cc.Label)
    ], MoreCoin.prototype, "contentLabel", void 0);
    MoreCoin = __decorate([
        ccclass
    ], MoreCoin);
    return MoreCoin;
}(UIBase_1.default));
exports.default = MoreCoin;

cc._RF.pop();