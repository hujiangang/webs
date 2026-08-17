"use strict";
cc._RF.push(module, '32ca8wnFDtA9bWHjRC04K3m', 'RoomBuyCtrl');
// Script/Logic/Hotel/RoomBuyCtrl.ts

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
exports.RoomBuyCtrl = void 0;
var EventMgr_1 = require("../../Base/Manager/EventMgr");
var Event_1 = require("../Data/Const/Event");
var HotelData_1 = require("./HotelData");
var MoneyManager_1 = require("../Data/MoneyManager");
var UIMgr_1 = require("../../Base/Manager/UIMgr");
var UIData_1 = require("../Data/Interface/UIData");
var Common_1 = require("../Common/Common");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RoomBuyCtrl = /** @class */ (function (_super) {
    __extends(RoomBuyCtrl, _super);
    function RoomBuyCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nameLabel = null;
        _this.priceLabel = null;
        _this.iconSp = null;
        _this.moneyIcon = null;
        _this.moneyIconFrames = [];
        _this._slotData = null;
        return _this;
    }
    RoomBuyCtrl.prototype.onLoad = function () {
        EventMgr_1.default.ins.register(Event_1.Event.Hotel.UIRoomUnlock, this.showUnlock, this);
        EventMgr_1.default.ins.register(Event_1.Event.Hotel.MapScrollBegin, this.hideUnlock, this);
        this.node.zIndex = 100;
    };
    RoomBuyCtrl.prototype.onDestroy = function () {
        EventMgr_1.default.ins.unRegister(Event_1.Event.Hotel.UIRoomUnlock, this.showUnlock, this);
        EventMgr_1.default.ins.unRegister(Event_1.Event.Hotel.MapScrollBegin, this.hideUnlock, this);
        this._slotData = null;
    };
    RoomBuyCtrl.prototype.onClickBuy = function () {
        this.node.active = false;
        this._slotData.state = 1;
        //需要确定这里的 subid
        this._slotData.subId = 1;
        var slotConfig = HotelData_1.HotelData.getSlotConfig(this._slotData.roomId, this._slotData.slotId);
        if (slotConfig) {
            var moneyCheck = MoneyManager_1.MoneyManager.CheckMoneyJson(slotConfig.prices[0], true);
            if (moneyCheck) {
                HotelData_1.HotelData.setSubSlotStateData(this._slotData);
                EventMgr_1.default.ins.send(Event_1.Event.Hotel.SlotUnlock, this._slotData);
                EventMgr_1.default.ins.send(Event_1.Event.Hotel.TouchSlotIcon, this._slotData.slotId);
            }
            else {
                // UIMgr.ins.showUI(UIHudDef.SelectShowTarget, { type: UIHudDef.SelectShowTarget, data: null });
                UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.MoreCoin);
            }
        }
    };
    RoomBuyCtrl.prototype.showUnlock = function (data, position) {
        this._slotData = data;
        if (!position) {
            position = Common_1.default.getWorldPos(HotelData_1.HotelData.getLockItem(this._slotData.roomId, this._slotData.slotId));
        }
        this.node.active = true;
        var slotPosition = this.node.parent.convertToNodeSpaceAR(position);
        this.node.setPosition(cc.v2(slotPosition.x, slotPosition.y + this.node.height / 2 + 80));
        var slotConfig = HotelData_1.HotelData.getSlotConfig(this._slotData.roomId, this._slotData.slotId);
        if (slotConfig) {
            var p = slotConfig.prices[0];
            this.nameLabel.string = slotConfig.slotName;
            if (p) {
                this.moneyIcon.spriteFrame = this.moneyIconFrames[p.itemId];
                this.priceLabel.string = "x" + Common_1.default.bytesToSize(p.num);
            }
        }
        // cc.loader.loadRes("texture/hotel/slotIcon/slot_icon_1"/* + data.slotId*/, cc.SpriteFrame, (err, spriteFrame) => {
        //     this.iconSp.spriteFrame = spriteFrame;
        // }); 
        this.show();
    };
    RoomBuyCtrl.prototype.hideUnlock = function () {
        this.node.active = false;
    };
    RoomBuyCtrl.prototype.show = function () {
        var animation = this.node.getComponent(cc.Animation);
        animation.play();
    };
    __decorate([
        property(cc.Label)
    ], RoomBuyCtrl.prototype, "nameLabel", void 0);
    __decorate([
        property(cc.Label)
    ], RoomBuyCtrl.prototype, "priceLabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], RoomBuyCtrl.prototype, "iconSp", void 0);
    __decorate([
        property(cc.Sprite)
    ], RoomBuyCtrl.prototype, "moneyIcon", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], RoomBuyCtrl.prototype, "moneyIconFrames", void 0);
    RoomBuyCtrl = __decorate([
        ccclass
    ], RoomBuyCtrl);
    return RoomBuyCtrl;
}(cc.Component));
exports.RoomBuyCtrl = RoomBuyCtrl;

cc._RF.pop();