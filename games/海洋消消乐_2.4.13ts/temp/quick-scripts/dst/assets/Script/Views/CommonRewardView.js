
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Views/CommonRewardView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxWaWV3c1xcQ29tbW9uUmV3YXJkVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXVDO0FBQ3ZDLCtDQUEwQztBQUMxQyx5REFBMEQ7QUFDMUQsdUNBQWtDO0FBSTVCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLG9DQUFNO0lBQTVDO1FBRUksdUJBQXVCO1FBRjNCLHFFQTJCQztRQXRCRyxZQUFNLEdBQWMsSUFBSSxDQUFDO1FBR3pCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFFbkIsZUFBUyxHQUFnQixJQUFJLENBQUM7O0lBaUIxQyxDQUFDO0lBZkcsaUNBQU0sR0FBTjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO0lBQ25CLENBQUM7SUFFTSxpQ0FBTSxHQUFiLFVBQWMsUUFBYTtRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztJQUMvQyxDQUFDO0lBRU0sdUNBQVksR0FBbkI7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsV0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFvQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbEY7UUFDRCxlQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFyQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztvREFDSztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3VEQUNRO0lBUmxCLGdCQUFnQjtRQUQ1QixPQUFPO09BQ0ssZ0JBQWdCLENBMkI1QjtJQUFELHVCQUFDO0NBM0JELEFBMkJDLENBM0JxQyxnQkFBTSxHQTJCM0M7QUEzQlksNENBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVJQmFzZSBmcm9tIFwiLi4vQmFzZS9VSS9VSUJhc2VcIjtcbmltcG9ydCBVSU1nciBmcm9tIFwiLi4vQmFzZS9NYW5hZ2VyL1VJTWdyXCI7XG5pbXBvcnQgeyBVSUh1ZERlZiB9IGZyb20gXCIuLi9Mb2dpYy9EYXRhL0ludGVyZmFjZS9VSURhdGFcIjtcbmltcG9ydCBNIGZyb20gXCIuLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgQ3VycmVuY3lJZCB9IGZyb20gXCIuLi9CYXNlL0Jhc2VDb25zdFwiO1xuaW1wb3J0IHsgSUNvbmZpZ0l0ZW0gfSBmcm9tIFwiLi4vTG9naWMvQ29tbW9uL0NvbW1vbkludGVyZmFjZXNcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBjbGFzcyBDb21tb25SZXdhcmRWaWV3IGV4dGVuZHMgVUlCYXNlIHtcblxuICAgIC8v55uu5YmN5Y+q5pSv5oyB5LiA5LiqIGl0ZW0g5aaC6ZyA5aSa5Liq5ZCO6Z2i5YaN5YqgXG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGl0ZW1TcDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBpdGVtTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2l0ZW1EYXRhOiBJQ29uZmlnSXRlbSA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkluaXQoaXRlbURhdGE6IGFueSkge1xuICAgICAgICB0aGlzLl9pdGVtRGF0YSA9IGl0ZW1EYXRhO1xuICAgICAgICB0aGlzLml0ZW1MYWJlbC5zdHJpbmcgPSBcInhcIiArIGl0ZW1EYXRhLm51bTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbGlja0Nsb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5faXRlbURhdGEpIHtcbiAgICAgICAgICAgIE0ucnVudGltZS5hZGRDdXJyZW5jeSh0aGlzLl9pdGVtRGF0YS5pdGVtSWQgYXMgQ3VycmVuY3lJZCwgdGhpcy5faXRlbURhdGEubnVtKTtcbiAgICAgICAgfVxuICAgICAgICBVSU1nci5pbnMuY2xvc2VVSShVSUh1ZERlZi5Db21tb25SZXdhcmQpO1xuICAgIH1cbn0iXX0=