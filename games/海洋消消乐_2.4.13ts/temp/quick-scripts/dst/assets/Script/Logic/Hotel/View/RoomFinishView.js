
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Hotel/View/RoomFinishView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cef84Bny+ZJw7bsKh9D3BPr', 'RoomFinishView');
// Script/Logic/Hotel/View/RoomFinishView.ts

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
exports.RoomFinishView = void 0;
var UIBase_1 = require("../../../Base/UI/UIBase");
var HotelData_1 = require("../HotelData");
var Common_1 = require("../../Common/Common");
var UIMgr_1 = require("../../../Base/Manager/UIMgr");
var UIData_1 = require("../../Data/Interface/UIData");
var M_1 = require("../../../Base/Manager/M");
var BaseConst_1 = require("../../../Base/BaseConst");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RoomFinishView = /** @class */ (function (_super) {
    __extends(RoomFinishView, _super);
    function RoomFinishView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelCoin = null;
        // @property(cc.Label)
        // labelButton: cc.Label = null;
        _this._buildingId = null;
        return _this;
    }
    // private _isShare: boolean = false;
    RoomFinishView.prototype.onInit = function (buildingId) {
        this._buildingId = buildingId;
    };
    RoomFinishView.prototype.onStart = function () {
        this.initRoomData();
    };
    /** 新海岛酒店版本 */
    RoomFinishView.prototype.initRoomData = function () {
        //检查是否有下一个房间可以解锁
        // let nextRoomConfig = HotelData.getHotelRoomConfig(this._buildingId + 1);
        // if (nextRoomConfig == null) {
        //     console.error("没有下一个房间可以解锁了");
        //     // return;
        // }
        var roomConfig = HotelData_1.HotelData.getHotelRoomConfig(this._buildingId);
        if (roomConfig) {
            this.labelCoin.string = "x" + Common_1.default.bytesToSize(roomConfig.finishReward[0].num);
        }
    };
    RoomFinishView.prototype.onClickBtn = function () {
        var roomConfig = HotelData_1.HotelData.getHotelRoomConfig(this._buildingId);
        if (roomConfig) {
            M_1.default.runtime.addCurrency(BaseConst_1.CurrencyId.Coin, roomConfig.finishReward[0].num);
        }
        this.close();
    };
    RoomFinishView.prototype.close = function () {
        UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.RoomFinishView);
    };
    __decorate([
        property(cc.Label)
    ], RoomFinishView.prototype, "labelCoin", void 0);
    RoomFinishView = __decorate([
        ccclass
    ], RoomFinishView);
    return RoomFinishView;
}(UIBase_1.default));
exports.RoomFinishView = RoomFinishView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcSG90ZWxcXFZpZXdcXFJvb21GaW5pc2hWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBNkM7QUFDN0MsMENBQXlDO0FBQ3pDLDhDQUF5QztBQUN6QyxxREFBZ0Q7QUFDaEQsc0RBQXVEO0FBQ3ZELDZDQUF3QztBQUN4QyxxREFBcUQ7QUFFL0MsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBb0Msa0NBQU07SUFBMUM7UUFBQSxxRUE2Q0M7UUExQ0csZUFBUyxHQUFhLElBQUksQ0FBQztRQUUzQixzQkFBc0I7UUFDdEIsZ0NBQWdDO1FBRXhCLGlCQUFXLEdBQVcsSUFBSSxDQUFDOztJQXFDdkMsQ0FBQztJQW5DRyxxQ0FBcUM7SUFFOUIsK0JBQU0sR0FBYixVQUFjLFVBQWtCO1FBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxnQ0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDRCxjQUFjO0lBQ04scUNBQVksR0FBcEI7UUFDSSxnQkFBZ0I7UUFDaEIsMkVBQTJFO1FBQzNFLGdDQUFnQztRQUNoQyxxQ0FBcUM7UUFDckMsaUJBQWlCO1FBQ2pCLElBQUk7UUFFSixJQUFJLFVBQVUsR0FBRyxxQkFBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoRSxJQUFJLFVBQVUsRUFBRTtZQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3BGO0lBQ0wsQ0FBQztJQUVNLG1DQUFVLEdBQWpCO1FBQ0ksSUFBSSxVQUFVLEdBQUcscUJBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEUsSUFBSSxVQUFVLEVBQUU7WUFDWixXQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxzQkFBVSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFFO1FBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTSw4QkFBSyxHQUFaO1FBQ0ksZUFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBekNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ1E7SUFIbEIsY0FBYztRQUQxQixPQUFPO09BQ0ssY0FBYyxDQTZDMUI7SUFBRCxxQkFBQztDQTdDRCxBQTZDQyxDQTdDbUMsZ0JBQU0sR0E2Q3pDO0FBN0NZLHdDQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVJQmFzZSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VSS9VSUJhc2VcIjtcbmltcG9ydCB7IEhvdGVsRGF0YSB9IGZyb20gXCIuLi9Ib3RlbERhdGFcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCBVSU1nciBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL1VJTWdyXCI7XG5pbXBvcnQgeyBVSUh1ZERlZiB9IGZyb20gXCIuLi8uLi9EYXRhL0ludGVyZmFjZS9VSURhdGFcIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgQ3VycmVuY3lJZCB9IGZyb20gXCIuLi8uLi8uLi9CYXNlL0Jhc2VDb25zdFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGNsYXNzIFJvb21GaW5pc2hWaWV3IGV4dGVuZHMgVUlCYXNlIHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJlbENvaW46IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIC8vIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICAvLyBsYWJlbEJ1dHRvbjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfYnVpbGRpbmdJZDogbnVtYmVyID0gbnVsbDtcblxuICAgIC8vIHByaXZhdGUgX2lzU2hhcmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBvbkluaXQoYnVpbGRpbmdJZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2J1aWxkaW5nSWQgPSBidWlsZGluZ0lkO1xuICAgIH1cblxuICAgIG9uU3RhcnQoKSB7XG4gICAgICAgIHRoaXMuaW5pdFJvb21EYXRhKCk7XG4gICAgfVxuICAgIC8qKiDmlrDmtbflspvphZLlupfniYjmnKwgKi9cbiAgICBwcml2YXRlIGluaXRSb29tRGF0YSgpIHtcbiAgICAgICAgLy/mo4Dmn6XmmK/lkKbmnInkuIvkuIDkuKrmiL/pl7Tlj6/ku6Xop6PplIFcbiAgICAgICAgLy8gbGV0IG5leHRSb29tQ29uZmlnID0gSG90ZWxEYXRhLmdldEhvdGVsUm9vbUNvbmZpZyh0aGlzLl9idWlsZGluZ0lkICsgMSk7XG4gICAgICAgIC8vIGlmIChuZXh0Um9vbUNvbmZpZyA9PSBudWxsKSB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmVycm9yKFwi5rKh5pyJ5LiL5LiA5Liq5oi/6Ze05Y+v5Lul6Kej6ZSB5LqGXCIpO1xuICAgICAgICAvLyAgICAgLy8gcmV0dXJuO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgbGV0IHJvb21Db25maWcgPSBIb3RlbERhdGEuZ2V0SG90ZWxSb29tQ29uZmlnKHRoaXMuX2J1aWxkaW5nSWQpO1xuICAgICAgICBpZiAocm9vbUNvbmZpZykge1xuICAgICAgICAgICAgdGhpcy5sYWJlbENvaW4uc3RyaW5nID0gXCJ4XCIgKyBDb21tb24uYnl0ZXNUb1NpemUocm9vbUNvbmZpZy5maW5pc2hSZXdhcmRbMF0ubnVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsaWNrQnRuKCkge1xuICAgICAgICBsZXQgcm9vbUNvbmZpZyA9IEhvdGVsRGF0YS5nZXRIb3RlbFJvb21Db25maWcodGhpcy5fYnVpbGRpbmdJZCk7XG4gICAgICAgIGlmIChyb29tQ29uZmlnKSB7XG4gICAgICAgICAgICBNLnJ1bnRpbWUuYWRkQ3VycmVuY3koQ3VycmVuY3lJZC5Db2luLCByb29tQ29uZmlnLmZpbmlzaFJld2FyZFswXS5udW0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xvc2UoKSB7XG4gICAgICAgIFVJTWdyLmlucy5jbG9zZVVJKFVJSHVkRGVmLlJvb21GaW5pc2hWaWV3KTtcbiAgICB9XG59Il19