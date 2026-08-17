
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Hotel/RoomSlotDetailItemCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcSG90ZWxcXFJvb21TbG90RGV0YWlsSXRlbUN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EseUNBQW1EO0FBRW5ELDBDQUFxQztBQUNyQyw2Q0FBNEM7QUFHdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBb0QsMENBQVk7SUFBaEU7UUFBQSxxRUF3S0M7UUFyS0csV0FBSyxHQUFhLElBQUksQ0FBQztRQUd2QixVQUFJLEdBQWMsSUFBSSxDQUFDO1FBR3ZCLFlBQU0sR0FBYyxJQUFJLENBQUM7UUFHekIsWUFBTSxHQUFjLElBQUksQ0FBQztRQUd6QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUczQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGFBQU8sR0FBcUIsRUFBRSxDQUFDO1FBRy9CLG9CQUFjLEdBQXFCLEVBQUUsQ0FBQztRQUU5QixVQUFJLEdBQWdCLElBQUksQ0FBQztRQUN6QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFHbkMsdUNBQXVDO1FBRWhDLFlBQU0sR0FBVyxJQUFJLENBQUM7UUFDdEIsWUFBTSxHQUFXLElBQUksQ0FBQztRQUN0QixXQUFLLEdBQVcsSUFBSSxDQUFDO1FBQ3BCLFlBQU0sR0FBVyxDQUFDLENBQUM7UUFFbkIsbUJBQWEsR0FBYSxJQUFJLENBQUM7O0lBa0kzQyxDQUFDO0lBaElHLHVDQUFNLEdBQU47UUFDSSxXQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekUsV0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBSyxDQUFDLEtB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QUFDLElBQUksQ0FBQyxhQUFLLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3JEO0lBQ0wsQ0FBQztJQWxLRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3lEQUNJO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0RBQ0c7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzswREFDSztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzBEQUNLO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OERBQ1M7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2REFDUTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzsyREFDSTtJQUcvQjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztrRUFDVztJQXhCckIsc0JBQXNCO1FBRDFDLE9BQU87T0FDYSxzQkFBc0IsQ0F3SzFDO0lBQUQsNkJBQUM7Q0F4S0QsQUF3S0MsQ0F4S21ELEVBQUUsQ0FBQyxTQUFTLEdBd0svRDtrQkF4S29CLHNCQUFzQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb25maWdJdGVtIH0gZnJvbSBcIi4uL0NvbW1vbi9Db21tb25JbnRlcmZhY2VzXCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuLi9Db21tb24vQ29tbW9uXCI7XG5pbXBvcnQgUGF0aHMgZnJvbSBcIi4uLy4uL0Jhc2UvVXRpbHMvUGF0aHNcIjtcbmltcG9ydCB7IEhvdGVsRGF0YSwgSVNsb3REYXRhIH0gZnJvbSBcIi4vSG90ZWxEYXRhXCI7XG5pbXBvcnQgeyBNb25leU1hbmFnZXIgfSBmcm9tIFwiLi4vRGF0YS9Nb25leU1hbmFnZXJcIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IHsgVUlIdWREZWYgfSBmcm9tIFwiLi4vRGF0YS9JbnRlcmZhY2UvVUlEYXRhXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tU2xvdERldGFpbEl0ZW1DdHJsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBtb25leTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBiZ1NwOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBpY29uU3A6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHVuaXRTcDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNlbGVjdE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJpY2VOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIGJnRnJhbWU6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIGN1cnJlbmN5RnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBwcml2YXRlIF9jZmc6IElDb25maWdJdGVtID0gbnVsbDtcbiAgICBwcml2YXRlIF9pc1VubG9jazogYm9vbGVhbiA9IHRydWU7XG4gICAgcHJpdmF0ZSBfaXNTZWxlY3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgLy8gcHJpdmF0ZSBfc2xvdERhdGE6IElTbG90RGF0YSA9IG51bGw7XG5cbiAgICBwdWJsaWMgcm9vbUlkOiBudW1iZXIgPSBudWxsO1xuICAgIHB1YmxpYyBzbG90SWQ6IG51bWJlciA9IG51bGw7XG4gICAgcHVibGljIHN1YklkOiBudW1iZXIgPSBudWxsO1xuICAgIHByaXZhdGUgX3N0YXRlOiBudW1iZXIgPSAxO1xuXG4gICAgcHJpdmF0ZSBfY29uZmlybUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuSG90ZWwuVXBhdGVTdWJTbG90U3RhdGUsIHRoaXMuX3VwZGF0ZVN0YXRlLCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC5yZWdpc3RlcihFdmVudC5Ib3RlbC5TZWxlY3RTdWJTbG90LCB0aGlzLl9vblNlbGVjdENvbmZpcm0sIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuSG90ZWwuVXBhdGVTdWJTbG90U3RhdGUsIHRoaXMuX3VwZGF0ZVN0YXRlLCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LkhvdGVsLlNlbGVjdFN1YlNsb3QsIHRoaXMuX29uU2VsZWN0Q29uZmlybSwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdChyb29tSWQ6IG51bWJlciwgc2xvdElkOiBudW1iZXIsIGRhdGE6IElDb25maWdJdGVtLCBmcmFtZTogY2MuU3ByaXRlRnJhbWUpIHtcblxuICAgICAgICAvLyB0aGlzLl9jb25maXJtTGFiZWwgPSBidG5MYWJlbDtcblxuICAgICAgICB0aGlzLnJvb21JZCA9IHJvb21JZDtcbiAgICAgICAgdGhpcy5zdWJJZCA9IGRhdGEuaWQ7XG4gICAgICAgIHRoaXMuc2xvdElkID0gc2xvdElkO1xuXG4gICAgICAgIC8vIHRoaXMuX3Nsb3REYXRhID0ge1xuICAgICAgICAvLyAgICAgcm9vbUlkLFxuICAgICAgICAvLyAgICAgc2xvdElkLFxuICAgICAgICAvLyAgICAgc3ViSWQ6IGRhdGEuaWQsXG4gICAgICAgIC8vICAgICBzdGF0ZTogMSxcbiAgICAgICAgLy8gfTtcblxuICAgICAgICB0aGlzLl9jZmcgPSBkYXRhO1xuICAgICAgICB0aGlzLl9pbml0SWNvbihmcmFtZSk7XG4gICAgICAgIHRoaXMuX2luaXRQcmljZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRQcmljZSgpIHtcblxuICAgICAgICBjb25zdCBzbG90RGF0YSA9IEhvdGVsRGF0YS5nZXRTbG90RGF0YSh0aGlzLnJvb21JZCwgdGhpcy5zbG90SWQpO1xuICAgICAgICAvL+WIpOaWreaYr+WQpuijheWkh+S6hi5cbiAgICAgICAgaWYgKHNsb3REYXRhICYmIHNsb3REYXRhLnN1YklkID09IHRoaXMuc3ViSWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dTZWxlY3QodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoSG90ZWxEYXRhLmdldFN1YlNsb3RTdGF0ZURhdGEoeyByb29tSWQ6IHRoaXMucm9vbUlkLCBzbG90SWQ6IHRoaXMuc2xvdElkLCBzdWJJZDogdGhpcy5zdWJJZCwgc3RhdGU6IHRoaXMuX3N0YXRlLCB9KSkge1xuICAgICAgICAgICAgLy/liKTmlq3mmK/lkKblt7Lnu4/otK3kubBcbiAgICAgICAgICAgIHRoaXMuX3Nob3dTZWxlY3QoZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy/msqHmnInotK3kubBcbiAgICAgICAgICAgIHRoaXMuX2lzVW5sb2NrID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IDA7XG4gICAgICAgICAgICB0aGlzLm1vbmV5LnN0cmluZyA9IHRoaXMuX2NmZy5udW0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMudW5pdFNwLnNwcml0ZUZyYW1lID0gdGhpcy5jdXJyZW5jeUZyYW1lc1t0aGlzLl9jZmcuaXRlbUlkXTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dTZWxlY3QoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdEljb24oZnJhbWUpIHtcblxuICAgICAgICB0aGlzLmljb25TcC5zcHJpdGVGcmFtZSA9IGZyYW1lO1xuICAgICAgICB0aGlzLl9yZXNldEljb25TaXplKCk7XG4gICAgICAgIC8vIENvbW1vbi5nZXRSZXM8Y2MuU3ByaXRlRnJhbWU+KGAke1BhdGhzLlJvb21QaWNQYXRofXJvb20ke3RoaXMucm9vbUlkfS8ke3RoaXMuc3ViSWR9L3Nsb3RfJHt0aGlzLnNsb3RJZH1gLCBjYy5TcHJpdGVGcmFtZSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIC8vICAgICBpZiAocmVzKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5pY29uU3Auc3ByaXRlRnJhbWUgPSBmcmFtZTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9yZXNldEljb25TaXplKCk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pXG5cbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXNldEljb25TaXplKCkge1xuICAgICAgICBjb25zdCBzaXplID0gdGhpcy5pY29uU3Aubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xuICAgICAgICBpZiAoc2l6ZS53aWR0aCA+IHNpemUuaGVpZ2h0KSB7XG4gICAgICAgICAgICAvL+mVv+avlOWuveWwjyzku6Xlrr3kuLrlh4ZcbiAgICAgICAgICAgIHRoaXMuaWNvblNwLm5vZGUuc2NhbGUgPSAxMjAgLyBzaXplLndpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy/plb/mr5Tlrr3lpKcs5Lul6ZW/5Li65YeGXG4gICAgICAgICAgICB0aGlzLmljb25TcC5ub2RlLnNjYWxlID0gMTIwIC8gc2l6ZS5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zaG93U2VsZWN0KG9wdDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnNlbGVjdE5vZGUuYWN0aXZlID0gb3B0O1xuICAgICAgICAvLyB0aGlzLnByaWNlTm9kZS5hY3RpdmUgPSAhb3B0O1xuICAgICAgICB0aGlzLl9pc1NlbGVjdCA9IG9wdDtcbiAgICAgICAgaWYgKHRoaXMuX2lzVW5sb2NrKSB7XG4gICAgICAgICAgICB0aGlzLnByaWNlTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHQpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBIb3RlbERhdGEuZ2V0U2xvdERhdGEodGhpcy5yb29tSWQsIHRoaXMuc2xvdElkKTtcbiAgICAgICAgICAgIC8v5piv5ZCm5piv5b2T5YmN6YCJ5oupXG4gICAgICAgICAgICBpZiAoIWRhdGEgfHwgKGRhdGEgJiYgZGF0YS5zdWJJZCAhPSB0aGlzLnN1YklkKSkge1xuICAgICAgICAgICAgICAgIE0ucnVudGltZS5Sb29tQ3VycmVudFNlbGVjdFN1YlNsb3RDZmcgPSB0aGlzLl9jZmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5iZ1NwLnNwcml0ZUZyYW1lID0gdGhpcy5iZ0ZyYW1lW29wdCA/IDEgOiAwXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVTdGF0ZShmcm9tKSB7XG4gICAgICAgIGlmICh0aGlzICE9IGZyb20pIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dTZWxlY3QoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25TZWxlY3RDb25maXJtKCkge1xuICAgICAgICBpZiAodGhpcy5faXNTZWxlY3QpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBIb3RlbERhdGEuZ2V0U2xvdERhdGEodGhpcy5yb29tSWQsIHRoaXMuc2xvdElkKTtcbiAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuc3ViSWQgPT0gdGhpcy5zdWJJZCkge1xuICAgICAgICAgICAgICAgIC8v5aaC5p6c5b2T5YmN6YCJ5Lit5piv6L+Z5Liq5bCx5LiN6L+b6KGM6Kej6ZSB5pON5L2cLi4uLi5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzbG90RGF0YTogSVNsb3REYXRhID0geyByb29tSWQ6IHRoaXMucm9vbUlkLCBzbG90SWQ6IHRoaXMuc2xvdElkLCBzdWJJZDogdGhpcy5zdWJJZCwgc3RhdGU6IHRoaXMuX3N0YXRlLCB9XG4gICAgICAgICAgICBzbG90RGF0YS5zdGF0ZSA9IHRoaXMuX3N0YXRlID0gMVxuICAgICAgICAgICAgdGhpcy5faXNVbmxvY2sgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fc2hvd1NlbGVjdCh0cnVlKTtcbiAgICAgICAgICAgIEhvdGVsRGF0YS5zZXRTdWJTbG90U3RhdGVEYXRhKHNsb3REYXRhKTtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5Ib3RlbC5VcGF0ZVN1YlNsb3RTdGF0ZSwgdGhpcyk7XG4gICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuSG90ZWwuU2xvdFVubG9jaywgc2xvdERhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xpY2soKSB7XG4gICAgICAgIC8v5byA5aeL6LSt5LmwIVxuICAgICAgICBpZiAoIXRoaXMuX2lzU2VsZWN0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNVbmxvY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1VubG9jayA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zaG93U2VsZWN0KHRydWUpO1xuICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LkhvdGVsLlVwYXRlU3ViU2xvdFN0YXRlLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG4iXX0=