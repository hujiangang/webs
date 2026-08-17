
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Hotel/RoomDetailItemCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcSG90ZWxcXFJvb21EZXRhaWxJdGVtQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBbUQ7QUFDbkQsMkNBQXNDO0FBQ3RDLGdEQUEyQztBQUUzQywwQ0FBcUM7QUFDckMsNkNBQTRDO0FBQzVDLCtDQUE4QztBQUV4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFnRCxzQ0FBWTtJQUE1RDtRQUFBLHFFQTBJQztRQXZJRyxlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLFVBQUksR0FBYyxJQUFJLENBQUM7UUFHdkIsWUFBTSxHQUFjLElBQUksQ0FBQztRQUd6QixhQUFPLEdBQXFCLEVBQUUsQ0FBQztRQUcvQixjQUFRLEdBQVksSUFBSSxDQUFDO1FBRWpCLFVBQUksR0FBaUIsSUFBSSxDQUFDO1FBQzFCLGVBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsaUJBQVcsR0FBWSxLQUFLLENBQUM7UUFFN0IsZUFBUyxHQUFZLEtBQUssQ0FBQztRQUU1QixXQUFLLEdBQVcsSUFBSSxDQUFDOztJQW1IaEMsQ0FBQztJQWpIRyxtQ0FBTSxHQUFOO1FBQ0ksV0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwRSxXQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xFLFdBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFB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QUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQzVCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNUO2FBQU07WUFDSCxXQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzNEO0lBQ0wsQ0FBQztJQXJJRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3lEQUNRO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ0c7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztzREFDSztJQUd6QjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzt1REFDSTtJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dEQUNPO0lBZlIsa0JBQWtCO1FBRHRDLE9BQU87T0FDYSxrQkFBa0IsQ0EwSXRDO0lBQUQseUJBQUM7Q0ExSUQsQUEwSUMsQ0ExSStDLEVBQUUsQ0FBQyxTQUFTLEdBMEkzRDtrQkExSW9CLGtCQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhvdGVsRGF0YSwgSVNsb3REYXRhIH0gZnJvbSBcIi4vSG90ZWxEYXRhXCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuLi9Db21tb24vQ29tbW9uXCI7XG5pbXBvcnQgUGF0aHMgZnJvbSBcIi4uLy4uL0Jhc2UvVXRpbHMvUGF0aHNcIjtcbmltcG9ydCBIb3RlbFJvb21DZmcgZnJvbSBcIi4uLy4uL0Jhc2UvVGFibHMvSG90ZWxSb29tQ2ZnXCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCB7IEhvdGVsTWFuYWdlciB9IGZyb20gXCIuL0hvdGVsTWFuYWdlclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9vbURldGFpbEl0ZW1DdHJsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBuYW1lTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgYmdTcDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaWNvblNwOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgYmdGcmFtZTogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbG9ja05vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfY2ZnOiBIb3RlbFJvb21DZmcgPSBudWxsO1xuICAgIHByaXZhdGUgX2N1clN1YklkOiBudW1iZXIgPSAxO1xuICAgIHByaXZhdGUgX2lzU2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX2lzTG9ja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgaW5kZXg6IG51bWJlciA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuSG90ZWwuU2hvd1N1YlNsb3QsIHRoaXMuX3N0YXRlQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuSG90ZWwuSGlkZVN1YlNsb3QsIHRoaXMuX2hpZGVTZWxlY3QsIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LkhvdGVsLlNsb3RVbmxvY2ssIHRoaXMuX29uU3ViU2xvdFVwZGF0ZSwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuSG90ZWwuVG91Y2hTbG90SWNvbiwgdGhpcy5fb25TbG90SWNvbkNsaWNrLCB0aGlzKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5Ib3RlbC5TaG93U3ViU2xvdCwgdGhpcy5fc3RhdGVDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LkhvdGVsLkhpZGVTdWJTbG90LCB0aGlzLl9oaWRlU2VsZWN0LCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LkhvdGVsLlNsb3RVbmxvY2ssIHRoaXMuX29uU3ViU2xvdFVwZGF0ZSwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5Ib3RlbC5Ub3VjaFNsb3RJY29uLCB0aGlzLl9vblNsb3RJY29uQ2xpY2ssIHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KGluZGV4OiBudW1iZXIsIGNmZzogSG90ZWxSb29tQ2ZnKSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5pY29uU3Auc3ByaXRlRnJhbWUgPSBudWxsO1xuICAgICAgICB0aGlzLl9jZmcgPSBjZmc7XG4gICAgICAgIHRoaXMubmFtZUxhYmVsLnN0cmluZyA9IHRoaXMuX2NmZy5zbG90TmFtZTtcbiAgICAgICAgdGhpcy5faW5pdEljb24oKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlTG9jaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZUxvY2soKSB7XG4gICAgICAgIHRoaXMuX2lzTG9ja2VkID0gIUhvdGVsRGF0YS5nZXRTbG90RGF0YSh0aGlzLl9jZmcucm9vbUlkLCB0aGlzLl9jZmcuc2xvdElkKTtcbiAgICAgICAgdGhpcy5sb2NrTm9kZS5hY3RpdmUgPSB0aGlzLl9pc0xvY2tlZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0SWNvbigpIHtcbiAgICAgICAgY29uc3Qgc2xvdERhdGEgPSBIb3RlbERhdGEuZ2V0U2xvdERhdGEodGhpcy5fY2ZnLnJvb21JZCwgdGhpcy5fY2ZnLnNsb3RJZCk7XG4gICAgICAgIGlmIChzbG90RGF0YSAmJiBzbG90RGF0YS5zdGF0ZSA+IDApIHtcbiAgICAgICAgICAgIC8v5Y+W5b2T5YmN55qELi4uLFxuICAgICAgICAgICAgdGhpcy5fY3VyU3ViSWQgPSBzbG90RGF0YS5zdWJJZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVJY29uKHRoaXMuX2N1clN1YklkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vblN1YlNsb3RVcGRhdGUoZGF0YTogSVNsb3REYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0xvY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTG9jaygpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0xvY2tlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25DbGljaygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fY2ZnLnNsb3RJZCA9PSBkYXRhLnNsb3RJZCAmJiB0aGlzLl9jdXJTdWJJZCAhPSBkYXRhLnN1YklkKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVJY29uKGRhdGEuc3ViSWQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVJY29uKHN1YklkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fY3VyU3ViSWQgPSBzdWJJZDtcbiAgICAgICAgQ29tbW9uLmdldFJlczxjYy5TcHJpdGVGcmFtZT4oYCR7UGF0aHMuUm9vbVBpY1BhdGh9cm9vbSR7dGhpcy5fY2ZnLnJvb21JZH0vJHtzdWJJZH0vc2xvdF8ke3RoaXMuX2NmZy5zbG90SWR9YCwgY2MuU3ByaXRlRnJhbWUpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmljb25TcC5zcHJpdGVGcmFtZSA9IHJlcztcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNldEljb25Db250ZW50U2l6ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXNldEljb25Db250ZW50U2l6ZSgpIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMuaWNvblNwLm5vZGUuZ2V0Q29udGVudFNpemUoKTtcbiAgICAgICAgaWYgKHNpemUud2lkdGggPiBzaXplLmhlaWdodCkge1xuICAgICAgICAgICAgLy/plb/mr5Tlrr3lsI8s5Lul5a695Li65YeGXG4gICAgICAgICAgICB0aGlzLmljb25TcC5ub2RlLnNjYWxlID0gMTEwIC8gc2l6ZS53aWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v6ZW/5q+U5a695aSnLOS7pemVv+S4uuWHhlxuICAgICAgICAgICAgdGhpcy5pY29uU3Aubm9kZS5zY2FsZSA9IDExMCAvIHNpemUuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc3RhdGVDaGFuZ2VkKCkge1xuICAgICAgICBpZiAodGhpcy5faXNTZWxlY3RlZCkge1xuICAgICAgICAgICAgLy/lkIzmraXnirbmgIHliLDmiL/pl7TkuIohISBcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5Ib3RlbC5DaGFuZ2VTbG90LCB0aGlzLl9jZmcuc2xvdElkKTtcbiAgICAgICAgICAgIHRoaXMuYmdTcC5zcHJpdGVGcmFtZSA9IHRoaXMuYmdGcmFtZVswXTtcbiAgICAgICAgICAgIHRoaXMuX2lzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2hpZGVTZWxlY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc1NlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZUNoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX29uU2xvdEljb25DbGljayhzbG90SWQ6IG51bWJlciB8IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5fY2ZnLnNsb3RJZCA9PSBzbG90SWQpIHtcbiAgICAgICAgICAgIHRoaXMub25DbGljaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xpY2soKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0xvY2tlZCkge1xuICAgICAgICAgICAgaWYgKEhvdGVsTWFuYWdlci5jaGVja1Nsb3RVbmxvY2tTaG93KHRoaXMuX2NmZy5yb29tSWQsIHRoaXMuaW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNsb3REYXRhOiBJU2xvdERhdGEgPSB7IHJvb21JZDogdGhpcy5fY2ZnLnJvb21JZCwgc2xvdElkOiB0aGlzLl9jZmcuc2xvdElkLCBzdWJJZDogMSwgc3RhdGU6IDAgfTtcbiAgICAgICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuSG90ZWwuVUlSb29tVW5sb2NrLCBzbG90RGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIE0udGlwcy5zaG93KGDnu6fnu63oo4Xkv67miL/pl7Qs5bCx5Y+v5Lul6Kej6ZSBICR7dGhpcy5fY2ZnLnNsb3ROYW1lfSFgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX2lzU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5Ib3RlbC5TaG93U3ViU2xvdCwgdGhpcy5fY2ZnKTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJnU3Auc3ByaXRlRnJhbWUgPSB0aGlzLmJnRnJhbWVbMV07XG4gICAgICAgICAgICAgICAgdGhpcy5faXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5Ib3RlbC5IaWRlU3ViU2xvdCwgdGhpcy5fY2ZnLnNsb3RJZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==