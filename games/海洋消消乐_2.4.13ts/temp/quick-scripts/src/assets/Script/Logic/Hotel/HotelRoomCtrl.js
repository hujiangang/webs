"use strict";
cc._RF.push(module, '18fc4pNVkdC57cbXHmEfvza', 'HotelRoomCtrl');
// Script/Logic/Hotel/HotelRoomCtrl.ts

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
exports.HotelRoomCtrl = void 0;
var RoomSlotCtrl_1 = require("./RoomSlotCtrl");
var Event_1 = require("../Data/Const/Event");
var EventMgr_1 = require("../../Base/Manager/EventMgr");
var HotelData_1 = require("./HotelData");
var HotelManager_1 = require("./HotelManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HotelRoomCtrl = /** @class */ (function (_super) {
    __extends(HotelRoomCtrl, _super);
    function HotelRoomCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgSp = null;
        _this.unlockItem = null;
        _this.maskItem = null;
        _this.LabelTips = null;
        _this.slotThumbnail = [];
        _this._roomId = 1;
        _this._detailCtrl = null;
        _this._currentTouchPoints = null;
        _this._slotMap = null;
        return _this;
    }
    HotelRoomCtrl.prototype.onLoad = function () {
        EventMgr_1.default.ins.register(Event_1.Event.Hotel.SlotUnlock, this.onSlotUnlock, this);
        this._currentTouchPoints = this.getComponent(cc.PolygonCollider).points;
    };
    HotelRoomCtrl.prototype.onDestroy = function () {
        EventMgr_1.default.ins.unRegister(Event_1.Event.Hotel.SlotUnlock, this.onSlotUnlock, this);
        this._slotMap.clear();
    };
    HotelRoomCtrl.prototype.init = function (roomId, roomData, detailCtrl) {
        if (detailCtrl === void 0) { detailCtrl = null; }
        this._detailCtrl = detailCtrl;
        this._roomId = roomId;
        this.updateSlots(roomData);
    };
    HotelRoomCtrl.prototype.getSoltFrames = function (slotId) {
        var rst = [];
        for (var i = 0; i < 3; i++) {
            rst.push(this.slotThumbnail[(i * 16) + (slotId - 1)]);
        }
        return rst;
    };
    HotelRoomCtrl.prototype.touch = function (pos) {
        return cc.Intersection.pointInPolygon(this.node.convertToNodeSpaceAR(pos), this._currentTouchPoints);
    };
    HotelRoomCtrl.prototype.updateSlots = function (roomData) {
        var _this = this;
        var config = HotelData_1.HotelData.getRoomSlotsConfig(this._roomId);
        config.forEach(function (value, key) {
            if (value.slotId == 15) {
                for (var i = 1; i <= 3; i++) {
                    _this._initSlotById(roomData, value.slotId, "slot" + value.slotId + "_" + i, key);
                }
            }
            else {
                _this._initSlotById(roomData, value.slotId, "slot" + value.slotId, key);
            }
        });
    };
    HotelRoomCtrl.prototype._initSlotById = function (roomData, slotId, slotName, index) {
        var slotCtrl = this.node.getChildByName(slotName).getComponent(RoomSlotCtrl_1.RoomSlotCtrl);
        //如果是自己房间就用这个
        var data = null;
        if (roomData) {
            data = this._getGuestSlotData(roomData, slotId);
        }
        else {
            data = HotelData_1.HotelData.getSlotData(this._roomId, slotId);
        }
        //如果是客人房间就用客人房间的数据填充! 
        slotCtrl.init(index + 1, roomData ? roomData.roomId : this._roomId, slotId, data, this.unlockItem, !!this._detailCtrl);
        if (!this._slotMap) {
            this._slotMap = new Map();
        }
        var rst = this._slotMap.get(slotId);
        if (slotId == 15) {
            //灯特殊处理.!
            if (!rst) {
                rst = [];
            }
            rst.push(slotCtrl);
        }
        else {
            rst = slotCtrl;
        }
        this._slotMap.set(slotId, rst);
    };
    HotelRoomCtrl.prototype._getGuestSlotData = function (roomData, slotId) {
        if (roomData && roomData.slots && roomData.slots[slotId]) {
            return roomData.slots[slotId];
        }
    };
    //物件解锁 todo
    HotelRoomCtrl.prototype.onSlotUnlock = function (data) {
        var _this = this;
        if (this._roomId != data.roomId) {
            return;
        }
        var roomdata = HotelData_1.HotelData.updateSlotData(data);
        if (this._detailCtrl) {
            this._detailCtrl.updateSlotData(roomdata);
        }
        var result = this.getSlot(data.slotId);
        if (result) {
            if (result instanceof Array) {
                result.forEach(function (ctrl) {
                    _this._unLockSlot(ctrl, data.subId);
                });
            }
            else {
                this._unLockSlot(result, data.subId);
            }
        }
    };
    HotelRoomCtrl.prototype._unLockSlot = function (slotCtrl, subId) {
        var _this = this;
        slotCtrl && slotCtrl.doUnlock(subId, function () {
            _this.updateSlots(null);
            var finished = HotelManager_1.HotelManager.checkRoomSlotsFinished(_this._roomId);
            if (finished) {
                // let nextRoomConfig = HotelData.getHotelRoomConfig(this._roomId + 1);
                // var root = cc.find("UIRoot");
                // if (nextRoomConfig) {
                //     //整个房间解锁完毕 弹出成功面板
                //     if (!!root.getChildByName("BuildSeccess")) {
                //         return;
                //     };
                //     UIMgr.ins.showUI(UIHudDef.BuildSuccess, this._roomId);
                // } else {
                //     if (!!root.getChildByName("RoomFinishView")) {
                //         return;
                //     };
                //     UIMgr.ins.showUI(UIHudDef.RoomFinishView, this._roomId);
                // }
            }
        });
    };
    //获取物件脚本文件
    HotelRoomCtrl.prototype.getSlot = function (slotId) {
        var result = null;
        if (slotId == 15) {
            result = [];
            for (var i = 1; i <= 3; i++) {
                result.push(this.node.getChildByName("slot" + slotId + "_" + i).getComponent(RoomSlotCtrl_1.RoomSlotCtrl));
            }
        }
        else {
            result = this.node.getChildByName("slot" + slotId).getComponent(RoomSlotCtrl_1.RoomSlotCtrl);
        }
        return result;
    };
    __decorate([
        property(cc.Sprite)
    ], HotelRoomCtrl.prototype, "bgSp", void 0);
    __decorate([
        property(cc.Prefab)
    ], HotelRoomCtrl.prototype, "unlockItem", void 0);
    __decorate([
        property(cc.Mask)
    ], HotelRoomCtrl.prototype, "maskItem", void 0);
    __decorate([
        property(cc.Label)
    ], HotelRoomCtrl.prototype, "LabelTips", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], HotelRoomCtrl.prototype, "slotThumbnail", void 0);
    HotelRoomCtrl = __decorate([
        ccclass
    ], HotelRoomCtrl);
    return HotelRoomCtrl;
}(cc.Component));
exports.HotelRoomCtrl = HotelRoomCtrl;

cc._RF.pop();