"use strict";
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