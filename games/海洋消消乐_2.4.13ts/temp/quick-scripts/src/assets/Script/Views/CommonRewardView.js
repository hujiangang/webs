"use strict";
cc._RF.push(module, 'fdb7fczOR1MWoV1Maqp6lNV', 'CommonRewardView');
// Script/Views/CommonRewardView.ts

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
exports.CommonRewardView = void 0;
var UIBase_1 = require("../Base/UI/UIBase");
var UIMgr_1 = require("../Base/Manager/UIMgr");
var UIData_1 = require("../Logic/Data/Interface/UIData");
var M_1 = require("../Base/Manager/M");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CommonRewardView = /** @class */ (function (_super) {
    __extends(CommonRewardView, _super);
    function CommonRewardView() {
        //目前只支持一个 item 如需多个后面再加
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemSp = null;
        _this.itemLabel = null;
        _this._itemData = null;
        return _this;
    }
    CommonRewardView.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
    };
    CommonRewardView.prototype.onInit = function (itemData) {
        this._itemData = itemData;
        this.itemLabel.string = "x" + itemData.num;
    };
    CommonRewardView.prototype.onClickClose = function () {
        if (this._itemData) {
            M_1.default.runtime.addCurrency(this._itemData.itemId, this._itemData.num);
        }
        UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.CommonReward);
    };
    __decorate([
        property(cc.Sprite)
    ], CommonRewardView.prototype, "itemSp", void 0);
    __decorate([
        property(cc.Label)
    ], CommonRewardView.prototype, "itemLabel", void 0);
    CommonRewardView = __decorate([
        ccclass
    ], CommonRewardView);
    return CommonRewardView;
}(UIBase_1.default));
exports.CommonRewardView = CommonRewardView;

cc._RF.pop();