
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Hotel/HotelRoomCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcSG90ZWxcXEhvdGVsUm9vbUN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUM5Qyw2Q0FBNEM7QUFDNUMsd0RBQW1EO0FBQ25ELHlDQUE4RDtBQUM5RCwrQ0FBOEM7QUFHeEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7SUFBbUMsaUNBQVk7SUFBL0M7UUFBQSxxRUE0SkM7UUF6SkcsVUFBSSxHQUFjLElBQUksQ0FBQztRQUd2QixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsbUJBQWEsR0FBcUIsRUFBRSxDQUFDO1FBRTdCLGFBQU8sR0FBVyxDQUFDLENBQUM7UUFDcEIsaUJBQVcsR0FBbUIsSUFBSSxDQUFDO1FBQ25DLHlCQUFtQixHQUFjLElBQUksQ0FBQztRQUV0QyxjQUFRLEdBQW9ELElBQUksQ0FBQzs7SUF1STdFLENBQUM7SUFySUcsOEJBQU0sR0FBTjtRQUNJLGtCQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDNUUsQ0FBQztJQUVELGlDQUFTLEdBQVQ7UUFDSSxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsYUFBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6RSxJQUFJLENB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LElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQU8sTUFBTSxTQUFJLENBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQywyQkFBWSxDQUFDLENBQUMsQ0FBQzthQUMxRjtTQUNKO2FBQU07WUFDSCxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBTyxNQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsMkJBQVksQ0FBQyxDQUFDO1NBQ2pGO1FBQ0QsT0FBTyxNQUFNLENBQUE7SUFDakIsQ0FBQztJQXZKRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOytDQUNHO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ1M7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNRO0lBRzNCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dEQUNVO0lBZjVCLGFBQWE7UUFEekIsT0FBTztPQUNLLGFBQWEsQ0E0SnpCO0lBQUQsb0JBQUM7Q0E1SkQsQUE0SkMsQ0E1SmtDLEVBQUUsQ0FBQyxTQUFTLEdBNEo5QztBQTVKWSxzQ0FBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvb21TbG90Q3RybCB9IGZyb20gXCIuL1Jvb21TbG90Q3RybFwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi8uLi9CYXNlL01hbmFnZXIvRXZlbnRNZ3JcIjtcbmltcG9ydCB7IEhvdGVsRGF0YSwgSVNsb3REYXRhLCBJUm9vbURhdGEgfSBmcm9tIFwiLi9Ib3RlbERhdGFcIjtcbmltcG9ydCB7IEhvdGVsTWFuYWdlciB9IGZyb20gXCIuL0hvdGVsTWFuYWdlclwiO1xuaW1wb3J0IFJvb21EZXRhaWxDdHJsIGZyb20gXCIuL1Jvb21EZXRhaWxDdHJsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGNsYXNzIEhvdGVsUm9vbUN0cmwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBiZ1NwOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICB1bmxvY2tJdGVtOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk1hc2spXG4gICAgbWFza0l0ZW06IGNjLk1hc2sgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIExhYmVsVGlwczogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgc2xvdFRodW1ibmFpbDogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBfcm9vbUlkOiBudW1iZXIgPSAxO1xuICAgIHByaXZhdGUgX2RldGFpbEN0cmw6IFJvb21EZXRhaWxDdHJsID0gbnVsbDtcbiAgICBwcml2YXRlIF9jdXJyZW50VG91Y2hQb2ludHM6IGNjLlZlYzJbXSA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9zbG90TWFwOiBNYXA8bnVtYmVyLCBSb29tU2xvdEN0cmwgfCBBcnJheTxSb29tU2xvdEN0cmw+PiA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIEV2ZW50TWdyLmlucy5yZWdpc3RlcihFdmVudC5Ib3RlbC5TbG90VW5sb2NrLCB0aGlzLm9uU2xvdFVubG9jaywgdGhpcyk7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRUb3VjaFBvaW50cyA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLlBvbHlnb25Db2xsaWRlcikucG9pbnRzO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnVuUmVnaXN0ZXIoRXZlbnQuSG90ZWwuU2xvdFVubG9jaywgdGhpcy5vblNsb3RVbmxvY2ssIHRoaXMpO1xuICAgICAgICB0aGlzLl9zbG90TWFwLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQocm9vbUlkLCByb29tRGF0YT86IElSb29tRGF0YSwgZGV0YWlsQ3RybDogUm9vbURldGFpbEN0cmwgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2RldGFpbEN0cmwgPSBkZXRhaWxDdHJsO1xuICAgICAgICB0aGlzLl9yb29tSWQgPSByb29tSWQ7XG4gICAgICAgIHRoaXMudXBkYXRlU2xvdHMocm9vbURhdGEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTb2x0RnJhbWVzKHNsb3RJZDogbnVtYmVyKTogQXJyYXk8Y2MuU3ByaXRlRnJhbWU+IHtcbiAgICAgICAgY29uc3QgcnN0ID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICByc3QucHVzaCh0aGlzLnNsb3RUaHVtYm5haWxbKGkgKiAxNikgKyAoc2xvdElkIC0gMSldKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByc3Q7XG4gICAgfVxuXG4gICAgcHVibGljIHRvdWNoKHBvczogY2MuVmVjMikge1xuICAgICAgICByZXR1cm4gY2MuSW50ZXJzZWN0aW9uLnBvaW50SW5Qb2x5Z29uKHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3MpLCB0aGlzLl9jdXJyZW50VG91Y2hQb2ludHMpO1xuICAgIH1cbiAgICBwcml2YXRlIHVwZGF0ZVNsb3RzKHJvb21EYXRhOiBJUm9vbURhdGEpIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gSG90ZWxEYXRhLmdldFJvb21TbG90c0NvbmZpZyh0aGlzLl9yb29tSWQpXG4gICAgICAgIGNvbmZpZy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUuc2xvdElkID09IDE1KSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRTbG90QnlJZChyb29tRGF0YSwgdmFsdWUuc2xvdElkLCBgc2xvdCR7dmFsdWUuc2xvdElkfV8ke2l9YCwga2V5KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5pdFNsb3RCeUlkKHJvb21EYXRhLCB2YWx1ZS5zbG90SWQsIGBzbG90JHt2YWx1ZS5zbG90SWR9YCwga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdFNsb3RCeUlkKHJvb21EYXRhOiBJUm9vbURhdGEsIHNsb3RJZDogbnVtYmVyLCBzbG90TmFtZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHNsb3RDdHJsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKHNsb3ROYW1lKS5nZXRDb21wb25lbnQoUm9vbVNsb3RDdHJsKTtcbiAgICAgICAgLy/lpoLmnpzmmK/oh6rlt7HmiL/pl7TlsLHnlKjov5nkuKpcbiAgICAgICAgbGV0IGRhdGEgPSBudWxsO1xuICAgICAgICBpZiAocm9vbURhdGEpIHtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLl9nZXRHdWVzdFNsb3REYXRhKHJvb21EYXRhLCBzbG90SWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YSA9IEhvdGVsRGF0YS5nZXRTbG90RGF0YSh0aGlzLl9yb29tSWQsIHNsb3RJZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy/lpoLmnpzmmK/lrqLkurrmiL/pl7TlsLHnlKjlrqLkurrmiL/pl7TnmoTmlbDmja7loavlhYUhIFxuICAgICAgICBzbG90Q3RybC5pbml0KGluZGV4ICsgMSwgcm9vbURhdGEgPyByb29tRGF0YS5yb29tSWQgOiB0aGlzLl9yb29tSWQsIHNsb3RJZCwgZGF0YSwgdGhpcy51bmxvY2tJdGVtLCAhIXRoaXMuX2RldGFpbEN0cmwpO1xuICAgICAgICBpZiAoIXRoaXMuX3Nsb3RNYXApIHtcbiAgICAgICAgICAgIHRoaXMuX3Nsb3RNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJzdCA9IHRoaXMuX3Nsb3RNYXAuZ2V0KHNsb3RJZCk7XG4gICAgICAgIGlmIChzbG90SWQgPT0gMTUpIHtcbiAgICAgICAgICAgIC8v54Gv54m55q6K5aSE55CGLiFcbiAgICAgICAgICAgIGlmICghcnN0KSB7XG4gICAgICAgICAgICAgICAgcnN0ID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAoPEFycmF5PFJvb21TbG90Q3RybD4+cnN0KS5wdXNoKHNsb3RDdHJsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJzdCA9IHNsb3RDdHJsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Nsb3RNYXAuc2V0KHNsb3RJZCwgcnN0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRHdWVzdFNsb3REYXRhKHJvb21EYXRhLCBzbG90SWQpOiBJU2xvdERhdGEge1xuICAgICAgICBpZiAocm9vbURhdGEgJiYgcm9vbURhdGEuc2xvdHMgJiYgcm9vbURhdGEuc2xvdHNbc2xvdElkXSkge1xuICAgICAgICAgICAgcmV0dXJuIHJvb21EYXRhLnNsb3RzW3Nsb3RJZF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+eJqeS7tuino+mUgSB0b2RvXG4gICAgcHJpdmF0ZSBvblNsb3RVbmxvY2soZGF0YTogSVNsb3REYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLl9yb29tSWQgIT0gZGF0YS5yb29tSWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb29tZGF0YSA9IEhvdGVsRGF0YS51cGRhdGVTbG90RGF0YShkYXRhKTtcbiAgICAgICAgaWYgKHRoaXMuX2RldGFpbEN0cmwpIHtcbiAgICAgICAgICAgIHRoaXMuX2RldGFpbEN0cmwudXBkYXRlU2xvdERhdGEocm9vbWRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZ2V0U2xvdChkYXRhLnNsb3RJZCk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKGN0cmwgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl91bkxvY2tTbG90KGN0cmwsIGRhdGEuc3ViSWQpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdW5Mb2NrU2xvdChyZXN1bHQsIGRhdGEuc3ViSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdW5Mb2NrU2xvdChzbG90Q3RybDogUm9vbVNsb3RDdHJsLCBzdWJJZDogbnVtYmVyKSB7XG4gICAgICAgIHNsb3RDdHJsICYmIHNsb3RDdHJsLmRvVW5sb2NrKHN1YklkLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNsb3RzKG51bGwpO1xuICAgICAgICAgICAgbGV0IGZpbmlzaGVkID0gSG90ZWxNYW5hZ2VyLmNoZWNrUm9vbVNsb3RzRmluaXNoZWQodGhpcy5fcm9vbUlkKTtcbiAgICAgICAgICAgIGlmIChmaW5pc2hlZCkge1xuICAgICAgICAgICAgICAgIC8vIGxldCBuZXh0Um9vbUNvbmZpZyA9IEhvdGVsRGF0YS5nZXRIb3RlbFJvb21Db25maWcodGhpcy5fcm9vbUlkICsgMSk7XG4gICAgICAgICAgICAgICAgLy8gdmFyIHJvb3QgPSBjYy5maW5kKFwiVUlSb290XCIpO1xuICAgICAgICAgICAgICAgIC8vIGlmIChuZXh0Um9vbUNvbmZpZykge1xuICAgICAgICAgICAgICAgIC8vICAgICAvL+aVtOS4quaIv+mXtOino+mUgeWujOavlSDlvLnlh7rmiJDlip/pnaLmnb9cbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKCEhcm9vdC5nZXRDaGlsZEJ5TmFtZShcIkJ1aWxkU2VjY2Vzc1wiKSkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIC8vICAgICB9O1xuICAgICAgICAgICAgICAgIC8vICAgICBVSU1nci5pbnMuc2hvd1VJKFVJSHVkRGVmLkJ1aWxkU3VjY2VzcywgdGhpcy5fcm9vbUlkKTtcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoISFyb290LmdldENoaWxkQnlOYW1lKFwiUm9vbUZpbmlzaFZpZXdcIikpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAvLyAgICAgfTtcbiAgICAgICAgICAgICAgICAvLyAgICAgVUlNZ3IuaW5zLnNob3dVSShVSUh1ZERlZi5Sb29tRmluaXNoVmlldywgdGhpcy5fcm9vbUlkKTtcbiAgICAgICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy/ojrflj5bnianku7bohJrmnKzmlofku7ZcbiAgICBwcml2YXRlIGdldFNsb3Qoc2xvdElkOiBudW1iZXIpOiBSb29tU2xvdEN0cmwgfCBBcnJheTxSb29tU2xvdEN0cmw+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICAgIGlmIChzbG90SWQgPT0gMTUpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKGBzbG90JHtzbG90SWR9XyR7aX1gKS5nZXRDb21wb25lbnQoUm9vbVNsb3RDdHJsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoYHNsb3Qke3Nsb3RJZH1gKS5nZXRDb21wb25lbnQoUm9vbVNsb3RDdHJsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuXG59Il19