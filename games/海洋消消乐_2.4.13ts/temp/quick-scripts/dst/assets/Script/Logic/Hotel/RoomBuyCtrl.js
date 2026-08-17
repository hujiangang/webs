
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Hotel/RoomBuyCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcSG90ZWxcXFJvb21CdXlDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBbUQ7QUFDbkQsNkNBQTRDO0FBQzVDLHlDQUFtRDtBQUNuRCxxREFBb0Q7QUFDcEQsa0RBQTZDO0FBQzdDLG1EQUFvRDtBQUNwRCwyQ0FBc0M7QUFFaEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7SUFBaUMsK0JBQVk7SUFBN0M7UUFBQSxxRUFvRkM7UUFsRkcsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixZQUFNLEdBQWMsSUFBSSxDQUFDO1FBR3pCLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFHNUIscUJBQWUsR0FBcUIsRUFBRSxDQUFDO1FBcUMvQixlQUFTLEdBQWMsSUFBSSxDQUFDOztJQWlDeEMsQ0FBQztJQXBFRyw0QkFBTSxHQUFOO1FBQ0ksa0JBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGFBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkUsa0JBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGFBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQzNCLENBQUM7SUFFRCwrQkFBUyxHQUFUO1FBQ0ksa0JBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGFBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekUs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LEdBQUcsZ0JBQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzVEO1NBQ0o7UUFDRCxvSEFBb0g7UUFDcEgsNkNBQTZDO1FBQzdDLE9BQU87UUFDUCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVPLGdDQUFVLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFTSwwQkFBSSxHQUFYO1FBQ0ksSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBakZEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ1E7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDUztJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOytDQUNLO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7a0RBQ1E7SUFHNUI7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7d0RBQ1k7SUFkOUIsV0FBVztRQUR2QixPQUFPO09BQ0ssV0FBVyxDQW9GdkI7SUFBRCxrQkFBQztDQXBGRCxBQW9GQyxDQXBGZ0MsRUFBRSxDQUFDLFNBQVMsR0FvRjVDO0FBcEZZLGtDQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi8uLi9CYXNlL01hbmFnZXIvRXZlbnRNZ3JcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCB7IElTbG90RGF0YSwgSG90ZWxEYXRhIH0gZnJvbSBcIi4vSG90ZWxEYXRhXCI7XG5pbXBvcnQgeyBNb25leU1hbmFnZXIgfSBmcm9tIFwiLi4vRGF0YS9Nb25leU1hbmFnZXJcIjtcbmltcG9ydCBVSU1nciBmcm9tIFwiLi4vLi4vQmFzZS9NYW5hZ2VyL1VJTWdyXCI7XG5pbXBvcnQgeyBVSUh1ZERlZiB9IGZyb20gXCIuLi9EYXRhL0ludGVyZmFjZS9VSURhdGFcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uL0NvbW1vbi9Db21tb25cIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5leHBvcnQgY2xhc3MgUm9vbUJ1eUN0cmwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBuYW1lTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBwcmljZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGljb25TcDogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgbW9uZXlJY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgbW9uZXlJY29uRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIEV2ZW50TWdyLmlucy5yZWdpc3RlcihFdmVudC5Ib3RlbC5VSVJvb21VbmxvY2ssIHRoaXMuc2hvd1VubG9jaywgdGhpcyk7XG4gICAgICAgIEV2ZW50TWdyLmlucy5yZWdpc3RlcihFdmVudC5Ib3RlbC5NYXBTY3JvbGxCZWdpbiwgdGhpcy5oaWRlVW5sb2NrLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IDEwMDtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIEV2ZW50TWdyLmlucy51blJlZ2lzdGVyKEV2ZW50LkhvdGVsLlVJUm9vbVVubG9jaywgdGhpcy5zaG93VW5sb2NrLCB0aGlzKTtcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnVuUmVnaXN0ZXIoRXZlbnQuSG90ZWwuTWFwU2Nyb2xsQmVnaW4sIHRoaXMuaGlkZVVubG9jaywgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5fc2xvdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsaWNrQnV5KCkge1xuXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc2xvdERhdGEuc3RhdGUgPSAxO1xuXG4gICAgICAgIC8v6ZyA6KaB56Gu5a6a6L+Z6YeM55qEIHN1YmlkXG4gICAgICAgIHRoaXMuX3Nsb3REYXRhLnN1YklkID0gMTtcblxuICAgICAgICBsZXQgc2xvdENvbmZpZyA9IEhvdGVsRGF0YS5nZXRTbG90Q29uZmlnKHRoaXMuX3Nsb3REYXRhLnJvb21JZCwgdGhpcy5fc2xvdERhdGEuc2xvdElkKTtcbiAgICAgICAgaWYgKHNsb3RDb25maWcpIHtcbiAgICAgICAgICAgIGxldCBtb25leUNoZWNrID0gTW9uZXlNYW5hZ2VyLkNoZWNrTW9uZXlKc29uKHNsb3RDb25maWcucHJpY2VzWzBdLCB0cnVlKTtcbiAgICAgICAgICAgIGlmIChtb25leUNoZWNrKSB7XG4gICAgICAgICAgICAgICAgSG90ZWxEYXRhLnNldFN1YlNsb3RTdGF0ZURhdGEodGhpcy5fc2xvdERhdGEpO1xuICAgICAgICAgICAgICAgIEV2ZW50TWdyLmlucy5zZW5kKEV2ZW50LkhvdGVsLlNsb3RVbmxvY2ssIHRoaXMuX3Nsb3REYXRhKTtcbiAgICAgICAgICAgICAgICBFdmVudE1nci5pbnMuc2VuZChFdmVudC5Ib3RlbC5Ub3VjaFNsb3RJY29uLCB0aGlzLl9zbG90RGF0YS5zbG90SWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBVSU1nci5pbnMuc2hvd1VJKFVJSHVkRGVmLlNlbGVjdFNob3dUYXJnZXQsIHsgdHlwZTogVUlIdWREZWYuU2VsZWN0U2hvd1RhcmdldCwgZGF0YTogbnVsbCB9KTtcbiAgICAgICAgICAgICAgICBVSU1nci5pbnMuc2hvd1VJKFVJSHVkRGVmLk1vcmVDb2luKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3Nsb3REYXRhOiBJU2xvdERhdGEgPSBudWxsO1xuICAgIHByaXZhdGUgc2hvd1VubG9jayhkYXRhOiBJU2xvdERhdGEsIHBvc2l0aW9uKSB7XG4gICAgICAgIHRoaXMuX3Nsb3REYXRhID0gZGF0YTtcbiAgICAgICAgaWYgKCFwb3NpdGlvbikge1xuICAgICAgICAgICAgcG9zaXRpb24gPSBDb21tb24uZ2V0V29ybGRQb3MoSG90ZWxEYXRhLmdldExvY2tJdGVtKHRoaXMuX3Nsb3REYXRhLnJvb21JZCwgdGhpcy5fc2xvdERhdGEuc2xvdElkKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGxldCBzbG90UG9zaXRpb24gPSB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGNjLnYyKHNsb3RQb3NpdGlvbi54LCBzbG90UG9zaXRpb24ueSArIHRoaXMubm9kZS5oZWlnaHQgLyAyICsgODApKTtcbiAgICAgICAgbGV0IHNsb3RDb25maWcgPSBIb3RlbERhdGEuZ2V0U2xvdENvbmZpZyh0aGlzLl9zbG90RGF0YS5yb29tSWQsIHRoaXMuX3Nsb3REYXRhLnNsb3RJZCk7XG5cbiAgICAgICAgaWYgKHNsb3RDb25maWcpIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSBzbG90Q29uZmlnLnByaWNlc1swXTtcbiAgICAgICAgICAgIHRoaXMubmFtZUxhYmVsLnN0cmluZyA9IHNsb3RDb25maWcuc2xvdE5hbWU7XG4gICAgICAgICAgICBpZiAocCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9uZXlJY29uLnNwcml0ZUZyYW1lID0gdGhpcy5tb25leUljb25GcmFtZXNbcC5pdGVtSWRdXG4gICAgICAgICAgICAgICAgdGhpcy5wcmljZUxhYmVsLnN0cmluZyA9IFwieFwiICsgQ29tbW9uLmJ5dGVzVG9TaXplKHAubnVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjYy5sb2FkZXIubG9hZFJlcyhcInRleHR1cmUvaG90ZWwvc2xvdEljb24vc2xvdF9pY29uXzFcIi8qICsgZGF0YS5zbG90SWQqLywgY2MuU3ByaXRlRnJhbWUsIChlcnIsIHNwcml0ZUZyYW1lKSA9PiB7XG4gICAgICAgIC8vICAgICB0aGlzLmljb25TcC5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xuICAgICAgICAvLyB9KTsgXG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGlkZVVubG9jaygpIHtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KCkge1xuICAgICAgICBsZXQgYW5pbWF0aW9uID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICBhbmltYXRpb24ucGxheSgpO1xuICAgIH1cbn0iXX0=