"use strict";
cc._RF.push(module, '9295frIkkZKSpNbKWKcmWXh', 'RoomDetailItemCtrl');
// Script/Logic/Hotel/RoomDetailItemCtrl.ts

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
var Common_1 = require("../Common/Common");
var Paths_1 = require("../../Base/Utils/Paths");
var M_1 = require("../../Base/Manager/M");
var Event_1 = require("../Data/Const/Event");
var HotelManager_1 = require("./HotelManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RoomDetailItemCtrl = /** @class */ (function (_super) {
    __extends(RoomDetailItemCtrl, _super);
    function RoomDetailItemCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nameLabel = null;
        _this.bgSp = null;
        _this.iconSp = null;
        _this.bgFrame = [];
        _this.lockNode = null;
        _this._cfg = null;
        _this._curSubId = 1;
        _this._isSelected = false;
        _this._isLocked = false;
        _this.index = null;
        return _this;
    }
    RoomDetailItemCtrl.prototype.onLoad = function () {
        M_1.default.event.register(Event_1.Event.Hotel.ShowSubSlot, this._stateChanged, this);
        M_1.default.event.register(Event_1.Event.Hotel.HideSubSlot, this._hideSelect, this);
        M_1.default.event.register(Event_1.Event.Hotel.SlotUnlock, this._onSubSlotUpdate, this);
        M_1.default.event.register(Event_1.Event.Hotel.TouchSlotIcon, this._onSlotIconClick, this);
    };
    RoomDetailItemCtrl.prototype.onDestroy = function () {
        M_1.default.event.unRegister(Event_1.Event.Hotel.ShowSubSlot, this._stateChanged, this);
        M_1.default.event.unRegister(Event_1.Event.Hotel.HideSubSlot, this._hideSelect, this);
        M_1.default.event.unRegister(Event_1.Event.Hotel.SlotUnlock, this._onSubSlotUpdate, this);
        M_1.default.event.unRegister(Event_1.Event.Hotel.TouchSlotIcon, this._onSlotIconClick, this);
    };
    RoomDetailItemCtrl.prototype.init = function (index, cfg) {
        this.index = index;
        this.iconSp.spriteFrame = null;
        this._cfg = cfg;
        this.nameLabel.string = this._cfg.slotName;
        this._initIcon();
        this._updateLock();
    };
    RoomDetailItemCtrl.prototype._updateLock = function () {
        this._isLocked = !HotelData_1.HotelData.getSlotData(this._cfg.roomId, this._cfg.slotId);
        this.lockNode.active = this._isLocked;
    };
    RoomDetailItemCtrl.prototype._initIcon = function () {
        var slotData = HotelData_1.HotelData.getSlotData(this._cfg.roomId, this._cfg.slotId);
        if (slotData && slotData.state > 0) {
            //取当前的...,
            this._curSubId = slotData.subId;
        }
        this._updateIcon(this._curSubId);
    };
    RoomDetailItemCtrl.prototype._onSubSlotUpdate = function (data) {
        if (this._isLocked) {
            this._updateLock();
            if (!this._isLocked) {
                this.onClick();
            }
        }
        if (this._cfg.slotId == data.slotId && this._curSubId != data.subId) {
            this._updateIcon(data.subId);
        }
    };
    RoomDetailItemCtrl.prototype._updateIcon = function (subId) {
        var _this = this;
        this._curSubId = subId;
        Common_1.default.getRes(Paths_1.default.RoomPicPath + "room" + this._cfg.roomId + "/" + subId + "/slot_" + this._cfg.slotId, cc.SpriteFrame).then(function (res) {
            if (res) {
                _this.iconSp.spriteFrame = res;
                _this._resetIconContentSize();
            }
        });
    };
    RoomDetailItemCtrl.prototype._resetIconContentSize = function () {
        var size = this.iconSp.node.getContentSize();
        if (size.width > size.height) {
            //长比宽小,以宽为准
            this.iconSp.node.scale = 110 / size.width;
        }
        else {
            //长比宽大,以长为准
            this.iconSp.node.scale = 110 / size.height;
        }
    };
    RoomDetailItemCtrl.prototype._stateChanged = function () {
        if (this._isSelected) {
            //同步状态到房间上!! 
            M_1.default.event.send(Event_1.Event.Hotel.ChangeSlot, this._cfg.slotId);
            this.bgSp.spriteFrame = this.bgFrame[0];
            this._isSelected = false;
        }
    };
    RoomDetailItemCtrl.prototype._hideSelect = function () {
        if (this._isSelected) {
            this._stateChanged();
        }
    };
    RoomDetailItemCtrl.prototype._onSlotIconClick = function (slotId) {
        if (this._cfg.slotId == slotId) {
            this.onClick();
        }
    };
    RoomDetailItemCtrl.prototype.onClick = function () {
        var _this = this;
        if (this._isLocked) {
            if (HotelManager_1.HotelManager.checkSlotUnlockShow(this._cfg.roomId, this.index)) {
                var slotData = { roomId: this._cfg.roomId, slotId: this._cfg.slotId, subId: 1, state: 0 };
                M_1.default.event.send(Event_1.Event.Hotel.UIRoomUnlock, slotData);
            }
            else {
                M_1.default.tips.show("\u7EE7\u7EED\u88C5\u4FEE\u623F\u95F4,\u5C31\u53EF\u4EE5\u89E3\u9501 " + this._cfg.slotName + "!");
            }
            return;
        }
        if (!this._isSelected) {
            M_1.default.event.send(Event_1.Event.Hotel.ShowSubSlot, this._cfg);
            this.scheduleOnce(function () {
                _this.bgSp.spriteFrame = _this.bgFrame[1];
                _this._isSelected = true;
            }, 0);
        }
        else {
            M_1.default.event.send(Event_1.Event.Hotel.HideSubSlot, this._cfg.slotId);
        }
    };
    __decorate([
        property(cc.Label)
    ], RoomDetailItemCtrl.prototype, "nameLabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], RoomDetailItemCtrl.prototype, "bgSp", void 0);
    __decorate([
        property(cc.Sprite)
    ], RoomDetailItemCtrl.prototype, "iconSp", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], RoomDetailItemCtrl.prototype, "bgFrame", void 0);
    __decorate([
        property(cc.Node)
    ], RoomDetailItemCtrl.prototype, "lockNode", void 0);
    RoomDetailItemCtrl = __decorate([
        ccclass
    ], RoomDetailItemCtrl);
    return RoomDetailItemCtrl;
}(cc.Component));
exports.default = RoomDetailItemCtrl;

cc._RF.pop();