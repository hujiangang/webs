"use strict";
cc._RF.push(module, 'e52fcW8xJ1DVa7fjDLfmLXH', 'RoomSlotDetailItemCtrl');
// Script/Logic/Hotel/RoomSlotDetailItemCtrl.ts

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
var HotelData_1 = require("./HotelData");
var M_1 = require("../../Base/Manager/M");
var Event_1 = require("../Data/Const/Event");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RoomSlotDetailItemCtrl = /** @class */ (function (_super) {
    __extends(RoomSlotDetailItemCtrl, _super);
    function RoomSlotDetailItemCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.money = null;
        _this.bgSp = null;
        _this.iconSp = null;
        _this.unitSp = null;
        _this.selectNode = null;
        _this.priceNode = null;
        _this.bgFrame = [];
        _this.currencyFrames = [];
        _this._cfg = null;
        _this._isUnlock = true;
        _this._isSelect = false;
        // private _slotData: ISlotData = null;
        _this.roomId = null;
        _this.slotId = null;
        _this.subId = null;
        _this._state = 1;
        _this._confirmLabel = null;
        return _this;
    }
    RoomSlotDetailItemCtrl.prototype.onLoad = function () {
        M_1.default.event.register(Event_1.Event.Hotel.UpateSubSlotState, this._updateState, this);
        M_1.default.event.register(Event_1.Event.Hotel.SelectSubSlot, this._onSelectConfirm, this);
    };
    RoomSlotDetailItemCtrl.prototype.onDestroy = function () {
        M_1.default.event.unRegister(Event_1.Event.Hotel.UpateSubSlotState, this._updateState, this);
        M_1.default.event.unRegister(Event_1.Event.Hotel.SelectSubSlot, this._onSelectConfirm, this);
    };
    RoomSlotDetailItemCtrl.prototype.init = function (roomId, slotId, data, frame) {
        // this._confirmLabel = btnLabel;
        this.roomId = roomId;
        this.subId = data.id;
        this.slotId = slotId;
        // this._slotData = {
        //     roomId,
        //     slotId,
        //     subId: data.id,
        //     state: 1,
        // };
        this._cfg = data;
        this._initIcon(frame);
        this._initPrice();
    };
    RoomSlotDetailItemCtrl.prototype._initPrice = function () {
        var slotData = HotelData_1.HotelData.getSlotData(this.roomId, this.slotId);
        //判断是否装备了.
        if (slotData && slotData.subId == this.subId) {
            this._showSelect(true);
        }
        else if (HotelData_1.HotelData.getSubSlotStateData({ roomId: this.roomId, slotId: this.slotId, subId: this.subId, state: this._state, })) {
            //判断是否已经购买
            this._showSelect(false);
        }
        else {
            //没有购买
            this._isUnlock = false;
            this._state = 0;
            this.money.string = this._cfg.num.toString();
            this.unitSp.spriteFrame = this.currencyFrames[this._cfg.itemId];
            this._showSelect(false);
        }
    };
    RoomSlotDetailItemCtrl.prototype._initIcon = function (frame) {
        this.iconSp.spriteFrame = frame;
        this._resetIconSize();
        // Common.getRes<cc.SpriteFrame>(`${Paths.RoomPicPath}room${this.roomId}/${this.subId}/slot_${this.slotId}`, cc.SpriteFrame).then((res) => {
        //     if (res) {
        //         this.iconSp.spriteFrame = frame;
        //         this._resetIconSize();
        //     }
        // })
    };
    RoomSlotDetailItemCtrl.prototype._resetIconSize = function () {
        var size = this.iconSp.node.getContentSize();
        if (size.width > size.height) {
            //长比宽小,以宽为准
            this.iconSp.node.scale = 120 / size.width;
        }
        else {
            //长比宽大,以长为准
            this.iconSp.node.scale = 120 / size.height;
        }
    };
    RoomSlotDetailItemCtrl.prototype._showSelect = function (opt) {
        this.selectNode.active = opt;
        // this.priceNode.active = !opt;
        this._isSelect = opt;
        if (this._isUnlock) {
            this.priceNode.active = false;
        }
        if (opt) {
            var data = HotelData_1.HotelData.getSlotData(this.roomId, this.slotId);
            //是否是当前选择
            if (!data || (data && data.subId != this.subId)) {
                M_1.default.runtime.RoomCurrentSelectSubSlotCfg = this._cfg;
            }
        }
        this.bgSp.spriteFrame = this.bgFrame[opt ? 1 : 0];
    };
    RoomSlotDetailItemCtrl.prototype._updateState = function (from) {
        if (this != from) {
            this._showSelect(false);
        }
    };
    RoomSlotDetailItemCtrl.prototype._onSelectConfirm = function () {
        if (this._isSelect) {
            var data = HotelData_1.HotelData.getSlotData(this.roomId, this.slotId);
            if (data && data.subId == this.subId) {
                //如果当前选中是这个就不进行解锁操作.....
                return;
            }
            var slotData = { roomId: this.roomId, slotId: this.slotId, subId: this.subId, state: this._state, };
            slotData.state = this._state = 1;
            this._isUnlock = true;
            this._showSelect(true);
            HotelData_1.HotelData.setSubSlotStateData(slotData);
            M_1.default.event.send(Event_1.Event.Hotel.UpateSubSlotState, this);
            M_1.default.event.send(Event_1.Event.Hotel.SlotUnlock, slotData);
        }
    };
    RoomSlotDetailItemCtrl.prototype.onClick = function () {
        //开始购买!
        if (!this._isSelect) {
            if (this._isUnlock) {
                this._isUnlock = true;
            }
            this._showSelect(true);
            M_1.default.event.send(Event_1.Event.Hotel.UpateSubSlotState, this);
        }
    };
    __decorate([
        property(cc.Label)
    ], RoomSlotDetailItemCtrl.prototype, "money", void 0);
    __decorate([
        property(cc.Sprite)
    ], RoomSlotDetailItemCtrl.prototype, "bgSp", void 0);
    __decorate([
        property(cc.Sprite)
    ], RoomSlotDetailItemCtrl.prototype, "iconSp", void 0);
    __decorate([
        property(cc.Sprite)
    ], RoomSlotDetailItemCtrl.prototype, "unitSp", void 0);
    __decorate([
        property(cc.Node)
    ], RoomSlotDetailItemCtrl.prototype, "selectNode", void 0);
    __decorate([
        property(cc.Node)
    ], RoomSlotDetailItemCtrl.prototype, "priceNode", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], RoomSlotDetailItemCtrl.prototype, "bgFrame", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], RoomSlotDetailItemCtrl.prototype, "currencyFrames", void 0);
    RoomSlotDetailItemCtrl = __decorate([
        ccclass
    ], RoomSlotDetailItemCtrl);
    return RoomSlotDetailItemCtrl;
}(cc.Component));
exports.default = RoomSlotDetailItemCtrl;

cc._RF.pop();