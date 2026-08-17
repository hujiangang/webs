
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Hotel/RoomDetailCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '37f67a0azhH+a0tpXfXdi4Q', 'RoomDetailCtrl');
// Script/Logic/Hotel/RoomDetailCtrl.ts

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
var Common_1 = require("../Common/Common");
var Paths_1 = require("../../Base/Utils/Paths");
var HotelRoomCtrl_1 = require("./HotelRoomCtrl");
var M_1 = require("../../Base/Manager/M");
var HotelData_1 = require("./HotelData");
var Event_1 = require("../Data/Const/Event");
var RoomSlotDetailItemCtrl_1 = require("./RoomSlotDetailItemCtrl");
var BaseConst_1 = require("../../Base/BaseConst");
var OnLineGuestCtrl_1 = require("./Access/OnLineGuestCtrl");
var UIData_1 = require("../Data/Interface/UIData");
var GuestPanelCtrl_1 = require("./Access/GuestPanelCtrl");
var CloudView_1 = require("../SimulationOperation/View/Map/CloudView");
var Constant_1 = require("../Data/Const/Constant");
var MoneyManager_1 = require("../Data/MoneyManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RoomDetailCtrl = /** @class */ (function (_super) {
    __extends(RoomDetailCtrl, _super);
    function RoomDetailCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bottomSlotContent = null;
        _this.bottomNode = null;
        _this.guestInfoPanel = null;
        _this.selfInfoPanel = null;
        _this.roomContent = null;
        _this.partsPrefab = null;
        _this.slotDetailView = null;
        _this.slotDetailContent = null;
        _this.slotDetailItemPrefab = null;
        _this.diamondLabel = null;
        _this.coinLabel = null;
        _this.scoreLabel = null;
        _this.visitCountLabel = null;
        _this.guestListView = null;
        _this.onlineEye = null;
        _this.onlineCount = null;
        _this.moneyBox = null;
        _this.socreBox = null;
        _this.slotScrollView = null;
        _this.confirmBtnLab = null;
        _this._roomCtrl = null;
        _this._roomId = null;
        _this._myView = null;
        _this._guestView = null;
        /**访客列表 */
        _this._visitList = null;
        return _this;
    }
    RoomDetailCtrl.prototype.onLoad = function () {
        M_1.default.event.register(Event_1.Event.Hotel.ShowSubSlot, this._onShowSubSlot, this);
        M_1.default.event.register(Event_1.Event.Hotel.HideSubSlot, this._onHideSubSlot, this);
        M_1.default.event.register(Event_1.Event.Hotel.ShowGuestRoom, this.showGuestRoom, this);
        M_1.default.event.register(Event_1.Event.Hotel.TouchSlotIcon, this._onSlotIconClick, this);
    };
    RoomDetailCtrl.prototype.onDestroy = function () {
        M_1.default.event.unRegister(Event_1.Event.Hotel.ShowSubSlot, this._onShowSubSlot, this);
        M_1.default.event.unRegister(Event_1.Event.Hotel.HideSubSlot, this._onHideSubSlot, this);
        M_1.default.event.unRegister(Event_1.Event.Hotel.ShowGuestRoom, this.showGuestRoom, this);
        M_1.default.event.unRegister(Event_1.Event.Hotel.TouchSlotIcon, this._onSlotIconClick, this);
    };
    RoomDetailCtrl.prototype._onSlotIconClick = function (slotid) {
        // const slotNode = this._slotMap.get(slotid);
        // let baseX = slotNode.x / slotNode.parent.width;
        // if (baseX > 0.75) {
        //     baseX = 1;
        // } else if (baseX < 0.22) {
        //     baseX = 0;
        // }
        // this.slotScrollView.scrollTo(cc.v2(baseX, 0), 0.3);
        this._onShowSubSlot(HotelData_1.HotelData.getSlotConfig(this._roomId, slotid));
    };
    RoomDetailCtrl.prototype.showGuestRoom = function (data) {
        var _this = this;
        if (data && data._hotelDatas) {
            this._showGuestPanel(true);
            this._myView.active = false;
            this.onlineEye.active = false;
            var roomData_1 = data._hotelDatas[1];
            this.guestInfoPanel.getComponent(GuestPanelCtrl_1.default).init(data);
            if (roomData_1) {
                Common_1.default.getRes(Paths_1.default.RoomPrefabPath + "RoomItem_" + roomData_1.roomId, cc.Prefab).then(function (roomPrefab) {
                    if (roomPrefab) {
                        var roomItem = _this._guestView = cc.instantiate(roomPrefab);
                        roomItem.parent = _this.roomContent;
                        roomItem.scale = Constant_1.ROOM_DETAIL_SCALE;
                        roomItem.setPosition(cc.v2(0, 0));
                        _this.roomContent.setContentSize(roomItem.width * Constant_1.ROOM_DETAIL_SCALE, roomItem.height * Constant_1.ROOM_DETAIL_SCALE);
                        _this.roomContent.y = 0;
                        _this.roomContent.parent.y = 0;
                        _this._roomCtrl = roomItem.getComponent(HotelRoomCtrl_1.HotelRoomCtrl);
                        _this._roomCtrl.init(roomData_1.roomId, roomData_1);
                    }
                });
            }
        }
    };
    RoomDetailCtrl.prototype.show = function (roomId) {
        var _this = this;
        this.onlineEye.active = false;
        this.slotDetailView.active = false;
        this.bottomNode.active = true;
        this._showGuestPanel(false);
        this._showMoneyBox(false);
        this.diamondLabel.string = M_1.default.runtime.getCurrencyStr(BaseConst_1.CurrencyId.Diamond);
        this.coinLabel.string = M_1.default.runtime.getFormateCoin();
        this.guestListView.active = false;
        this.guestListView.parent.getChildByName('jt').active = false;
        if (!this._roomCtrl && this._roomId != roomId) {
            this.roomContent.destroyAllChildren();
            Common_1.default.getRes(Paths_1.default.RoomPrefabPath + "RoomItem_" + roomId, cc.Prefab).then(function (roomPrefab) {
                if (roomPrefab) {
                    var roomItem = _this._myView = cc.instantiate(roomPrefab);
                    roomItem.parent = _this.roomContent;
                    roomItem.scale = Constant_1.ROOM_DETAIL_SCALE;
                    roomItem.setPosition(cc.v2(0, 0));
                    _this.roomContent.parent.setContentSize(roomItem.width * Constant_1.ROOM_DETAIL_SCALE, roomItem.height * Constant_1.ROOM_DETAIL_SCALE);
                    _this.roomContent.parent.y = 0;
                    _this._roomCtrl = roomItem.getComponent(HotelRoomCtrl_1.HotelRoomCtrl);
                    _this._roomCtrl.init(roomId, null, _this);
                    _this.updateSlotData({ roomId: roomId, slots: null, score: 0 });
                }
            });
        }
        else {
            this._roomCtrl.init(roomId, null, this);
        }
        this._roomId = roomId;
        this.bottomSlotContent.removeAllChildren();
        this._initSlot();
        this._showOnlineList();
    };
    RoomDetailCtrl.prototype._showOnlineList = function () {
        var _this = this;
        M_1.default.net.getOnlineList().then(function (list) {
            console.error('online list', list);
            _this._visitList = list;
            if (list && list.length > 0) {
                _this.onlineEye.active = true;
                _this.onlineCount.string = list.length;
            }
        });
    };
    RoomDetailCtrl.prototype._showMoneyBox = function (opt) {
        if (opt === void 0) { opt = false; }
        if (opt) {
            this.moneyBox.active = true;
            this.socreBox.active = false;
            this.moneyBox.opacity = 0;
            this.moneyBox.runAction(cc.fadeIn(0.3));
        }
        else {
            this.moneyBox.active = false;
            this.socreBox.active = true;
            this.socreBox.opacity = 0;
            this.socreBox.runAction(cc.fadeIn(0.3));
        }
    };
    RoomDetailCtrl.prototype._showGuestPanel = function (opt) {
        if (opt === void 0) { opt = true; }
        this.guestInfoPanel.active = opt;
        this.bottomNode.active = !opt;
        this.selfInfoPanel.active = !opt;
    };
    RoomDetailCtrl.prototype._initSlot = function () {
        // if (!this._slotMap) {
        //     this._slotMap = new Map();
        // }
        // const config = HotelData.getRoomSlotsConfig(this._roomId);
        // if (config) {
        //     config.forEach((value, key) => {
        //         const slot = cc.instantiate(this.partsPrefab)
        //         slot.parent = this.bottomSlotContent;
        //         slot.getComponent(RoomDetailItemCtrl).init(key + 1, value);
        //         this._slotMap.set(value.slotId, slot);
        //     });
        // }
    };
    RoomDetailCtrl.prototype._onHideSubSlot = function () {
        this._showMoneyBox(false);
        this.slotDetailView.active = false;
    };
    RoomDetailCtrl.prototype.onCloseSelectSubSlostView = function () {
        M_1.default.event.send(Event_1.Event.Hotel.HideSubSlot);
    };
    RoomDetailCtrl.prototype.onConfirmSelectSubSlostView = function () {
        if (M_1.default.runtime.RoomCurrentSelectSubSlotCfg) {
            if (MoneyManager_1.MoneyManager.CheckMoneyJson(M_1.default.runtime.RoomCurrentSelectSubSlotCfg, true)) {
                M_1.default.event.send(Event_1.Event.Hotel.SelectSubSlot);
            }
            else {
                M_1.default.ui.showUI(UIData_1.UIHudDef.SelectShowTarget, { type: UIData_1.UIHudDef.SelectShowTarget, data: null });
            }
        }
    };
    RoomDetailCtrl.prototype.onGuestCloseBtnClick = function () {
        var _this = this;
        M_1.default.ui.showUI(UIData_1.UIHudDef.CloudView, CloudView_1.ICloudData.VisitFriendHotel, function () {
            M_1.default.ui.hideUI(UIData_1.UIHudDef.FriendRank);
            _this._guestView && _this._guestView.destroy();
            _this._myView && (_this._myView.active = true);
            _this._showGuestPanel(false);
            M_1.default.net.exitVisit(M_1.default.runtime.CurrentGuestUserid);
            M_1.default.runtime.CurrentGuestUserid = null;
        });
    };
    RoomDetailCtrl.prototype.onFriendListBtnClick = function () {
        //sdfsdfs
        M_1.default.ui.showUI(UIData_1.UIHudDef.FriendRank);
    };
    RoomDetailCtrl.prototype.onGuestBtnClick = function () {
        if (this._visitList) {
            this.guestListView.active = true;
            this.guestListView.parent.getChildByName('jt').active = true;
            this.guestListView.getComponent(OnLineGuestCtrl_1.default).init(this._visitList);
        }
    };
    RoomDetailCtrl.prototype.updateSlotData = function (roomData) {
        var socre = 0;
        if (this._roomCtrl && this._roomCtrl.node.scale != 1) {
            //计算当前房间的积分值
            if (roomData.slots) {
                var suit = {};
                for (var key in roomData.slots) {
                    var data = roomData.slots[key];
                    var cfg = HotelData_1.HotelData.getSlotConfig(data.roomId, data.slotId);
                    if (cfg && cfg.prices[data.subId]) {
                        socre += cfg.prices[data.subId].extData;
                    }
                    if (!suit[data.roomId]) {
                        suit[data.roomId] = 0;
                    }
                    suit[data.roomId]++;
                }
                //确认套装数量!
                for (var roomid in suit) {
                    var count = suit[roomid];
                    var bonus = HotelData_1.HotelData.getSlotBonusByCount(Number(roomid), count);
                    if (bonus) {
                        socre += Math.round((socre * (bonus / 100)));
                        if (roomData.roomId == Number(roomid)) {
                            //show tips
                            console.error(roomid);
                            M_1.default.tips.show('激活了套装加成!');
                        }
                    }
                }
                HotelData_1.HotelData.updateRoomScore(roomData.roomId, socre);
            }
            else {
                socre = HotelData_1.HotelData.getScoreByRoomId(roomData.roomId);
            }
            this.scoreLabel.string = "" + socre;
        }
    };
    RoomDetailCtrl.prototype._onShowSubSlot = function (slotCfg) {
        var _this = this;
        //是否需要动画 ???? 
        if (slotCfg) {
            this._showMoneyBox(true);
            this.slotDetailContent.removeAllChildren();
            this.slotDetailView.active = true;
            M_1.default.runtime.RoomCurrentSelectSubSlotCfg = null;
            var frames_1 = this._roomCtrl.getSoltFrames(slotCfg.slotId);
            slotCfg.prices.forEach(function (item) {
                var slotSubNode = cc.instantiate(_this.slotDetailItemPrefab);
                slotSubNode.parent = _this.slotDetailContent;
                slotSubNode.getComponent(RoomSlotDetailItemCtrl_1.default).init(slotCfg.roomId, slotCfg.slotId, item, frames_1[item.id - 1]);
            });
            // M.event.send(Event.Hotel.ChangeSlot, slotCfg.slotId);
        }
    };
    RoomDetailCtrl.prototype.onOtherClick = function (a) {
        // M.event.send(Event.Hotel.HideSubSlot);
        M_1.default.event.send(Event_1.Event.Hotel.MapScrollBegin);
        this.guestListView.active = false;
        this.guestListView.parent.getChildByName('jt').active = false;
    };
    RoomDetailCtrl.prototype.onExitBtnClick = function () {
        M_1.default.event.send(Event_1.Event.Hotel.HideSubSlot);
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], RoomDetailCtrl.prototype, "bottomSlotContent", void 0);
    __decorate([
        property(cc.Node)
    ], RoomDetailCtrl.prototype, "bottomNode", void 0);
    __decorate([
        property(cc.Node)
    ], RoomDetailCtrl.prototype, "guestInfoPanel", void 0);
    __decorate([
        property(cc.Node)
    ], RoomDetailCtrl.prototype, "selfInfoPanel", void 0);
    __decorate([
        property(cc.Node)
    ], RoomDetailCtrl.prototype, "roomContent", void 0);
    __decorate([
        property(cc.Prefab)
    ], RoomDetailCtrl.prototype, "partsPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], RoomDetailCtrl.prototype, "slotDetailView", void 0);
    __decorate([
        property(cc.Node)
    ], RoomDetailCtrl.prototype, "slotDetailContent", void 0);
    __decorate([
        property(cc.Prefab)
    ], RoomDetailCtrl.prototype, "slotDetailItemPrefab", void 0);
    __decorate([
        property(cc.Label)
    ], RoomDetailCtrl.prototype, "diamondLabel", void 0);
    __decorate([
        property(cc.Label)
    ], RoomDetailCtrl.prototype, "coinLabel", void 0);
    __decorate([
        property(cc.Label)
    ], RoomDetailCtrl.prototype, "scoreLabel", void 0);
    __decorate([
        property(cc.Label)
    ], RoomDetailCtrl.prototype, "visitCountLabel", void 0);
    __decorate([
        property(cc.Node)
    ], RoomDetailCtrl.prototype, "guestListView", void 0);
    __decorate([
        property(cc.Node)
    ], RoomDetailCtrl.prototype, "onlineEye", void 0);
    __decorate([
        property(cc.Label)
    ], RoomDetailCtrl.prototype, "onlineCount", void 0);
    __decorate([
        property(cc.Node)
    ], RoomDetailCtrl.prototype, "moneyBox", void 0);
    __decorate([
        property(cc.Node)
    ], RoomDetailCtrl.prototype, "socreBox", void 0);
    __decorate([
        property(cc.ScrollView)
    ], RoomDetailCtrl.prototype, "slotScrollView", void 0);
    __decorate([
        property(cc.Label)
    ], RoomDetailCtrl.prototype, "confirmBtnLab", void 0);
    RoomDetailCtrl = __decorate([
        ccclass
    ], RoomDetailCtrl);
    return RoomDetailCtrl;
}(cc.Component));
exports.default = RoomDetailCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcSG90ZWxcXFJvb21EZXRhaWxDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFzQztBQUN0QyxnREFBMkM7QUFDM0MsaURBQWdEO0FBQ2hELDBDQUFxQztBQUNyQyx5Q0FBbUQ7QUFFbkQsNkNBQTRDO0FBQzVDLG1FQUE4RDtBQUU5RCxrREFBa0Q7QUFDbEQsNERBQXVEO0FBQ3ZELG1EQUFvRDtBQUNwRCwwREFBcUQ7QUFDckQsdUVBQXVFO0FBQ3ZFLG1EQUEyRDtBQUMzRCxxREFBb0Q7QUFFOUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUFrVUM7UUEvVEcsdUJBQWlCLEdBQVksSUFBSSxDQUFDO1FBR2xDLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBRy9CLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRzlCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRzlCLG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBRy9CLHVCQUFpQixHQUFZLElBQUksQ0FBQztRQUlsQywwQkFBb0IsR0FBYyxJQUFJLENBQUM7UUFHdkMsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFHOUIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixxQkFBZSxHQUFhLElBQUksQ0FBQztRQUdqQyxtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsY0FBUSxHQUFZLElBQUks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QyxFQUFFLENBQUMsS0FBSyxDQUFDO3NEQUNTO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MkRBQ2M7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5REFDWTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dURBQ1U7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7MERBQ2E7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt5REFDWTtJQTdEZCxjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBa1VsQztJQUFELHFCQUFDO0NBbFVELEFBa1VDLENBbFUyQyxFQUFFLENBQUMsU0FBUyxHQWtVdkQ7a0JBbFVvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbW1vbiBmcm9tIFwiLi4vQ29tbW9uL0NvbW1vblwiO1xuaW1wb3J0IFBhdGhzIGZyb20gXCIuLi8uLi9CYXNlL1V0aWxzL1BhdGhzXCI7XG5pbXBvcnQgeyBIb3RlbFJvb21DdHJsIH0gZnJvbSBcIi4vSG90ZWxSb29tQ3RybFwiO1xuaW1wb3J0IE0gZnJvbSBcIi4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgeyBIb3RlbERhdGEsIElSb29tRGF0YSB9IGZyb20gXCIuL0hvdGVsRGF0YVwiO1xuaW1wb3J0IFJvb21EZXRhaWxJdGVtQ3RybCBmcm9tIFwiLi9Sb29tRGV0YWlsSXRlbUN0cmxcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCBSb29tU2xvdERldGFpbEl0ZW1DdHJsIGZyb20gXCIuL1Jvb21TbG90RGV0YWlsSXRlbUN0cmxcIjtcbmltcG9ydCBIb3RlbFJvb21DZmcgZnJvbSBcIi4uLy4uL0Jhc2UvVGFibHMvSG90ZWxSb29tQ2ZnXCI7XG5pbXBvcnQgeyBDdXJyZW5jeUlkIH0gZnJvbSBcIi4uLy4uL0Jhc2UvQmFzZUNvbnN0XCI7XG5pbXBvcnQgT25MaW5lR3Vlc3RDdHJsIGZyb20gXCIuL0FjY2Vzcy9PbkxpbmVHdWVzdEN0cmxcIjtcbmltcG9ydCB7IFVJSHVkRGVmIH0gZnJvbSBcIi4uL0RhdGEvSW50ZXJmYWNlL1VJRGF0YVwiO1xuaW1wb3J0IEd1ZXN0UGFuZWxDdHJsIGZyb20gXCIuL0FjY2Vzcy9HdWVzdFBhbmVsQ3RybFwiO1xuaW1wb3J0IHsgSUNsb3VkRGF0YSB9IGZyb20gXCIuLi9TaW11bGF0aW9uT3BlcmF0aW9uL1ZpZXcvTWFwL0Nsb3VkVmlld1wiO1xuaW1wb3J0IHsgUk9PTV9ERVRBSUxfU0NBTEUgfSBmcm9tIFwiLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IHsgTW9uZXlNYW5hZ2VyIH0gZnJvbSBcIi4uL0RhdGEvTW9uZXlNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tRGV0YWlsQ3RybCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBib3R0b21TbG90Q29udGVudDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBib3R0b21Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGd1ZXN0SW5mb1BhbmVsOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNlbGZJbmZvUGFuZWw6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcm9vbUNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBwYXJ0c1ByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNsb3REZXRhaWxWaWV3OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNsb3REZXRhaWxDb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBzbG90RGV0YWlsSXRlbVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBkaWFtb25kTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBjb2luTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzY29yZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdmlzaXRDb3VudExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBndWVzdExpc3RWaWV3OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG9ubGluZUV5ZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgb25saW5lQ291bnQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG1vbmV5Qm94OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNvY3JlQm94OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TY3JvbGxWaWV3KVxuICAgIHNsb3RTY3JvbGxWaWV3OiBjYy5TY3JvbGxWaWV3ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBjb25maXJtQnRuTGFiOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9yb29tQ3RybDogSG90ZWxSb29tQ3RybCA9IG51bGw7XG4gICAgcHJpdmF0ZSBfcm9vbUlkOiBudW1iZXIgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfbXlWaWV3OiBjYy5Ob2RlID0gbnVsbDtcbiAgICBwcml2YXRlIF9ndWVzdFZpZXc6IGNjLk5vZGUgPSBudWxsO1xuXG5cblxuXG4gICAgLyoq6K6/5a6i5YiX6KGoICovXG4gICAgcHJpdmF0ZSBfdmlzaXRMaXN0OiBBcnJheTx7IGlkOiBudW1iZXIsIG5pY2tuYW1lOiBzdHJpbmcsIGF2YXRhcl91cmw6IHN0cmluZyB9PiA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICAgICAgTS5ldmVudC5yZWdpc3RlcihFdmVudC5Ib3RlbC5TaG93U3ViU2xvdCwgdGhpcy5fb25TaG93U3ViU2xvdCwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuSG90ZWwuSGlkZVN1YlNsb3QsIHRoaXMuX29uSGlkZVN1YlNsb3QsIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LkhvdGVsLlNob3dHdWVzdFJvb20sIHRoaXMuc2hvd0d1ZXN0Um9vbSwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuSG90ZWwuVG91Y2hTbG90SWNvbiwgdGhpcy5fb25TbG90SWNvbkNsaWNrLCB0aGlzKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5Ib3RlbC5TaG93U3ViU2xvdCwgdGhpcy5fb25TaG93U3ViU2xvdCwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5Ib3RlbC5IaWRlU3ViU2xvdCwgdGhpcy5fb25IaWRlU3ViU2xvdCwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5Ib3RlbC5TaG93R3Vlc3RSb29tLCB0aGlzLnNob3dHdWVzdFJvb20sIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuSG90ZWwuVG91Y2hTbG90SWNvbiwgdGhpcy5fb25TbG90SWNvbkNsaWNrLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vblNsb3RJY29uQ2xpY2soc2xvdGlkOiBudW1iZXIpIHtcbiAgICAgICAgLy8gY29uc3Qgc2xvdE5vZGUgPSB0aGlzLl9zbG90TWFwLmdldChzbG90aWQpO1xuICAgICAgICAvLyBsZXQgYmFzZVggPSBzbG90Tm9kZS54IC8gc2xvdE5vZGUucGFyZW50LndpZHRoO1xuICAgICAgICAvLyBpZiAoYmFzZVggPiAwLjc1KSB7XG4gICAgICAgIC8vICAgICBiYXNlWCA9IDE7XG4gICAgICAgIC8vIH0gZWxzZSBpZiAoYmFzZVggPCAwLjIyKSB7XG4gICAgICAgIC8vICAgICBiYXNlWCA9IDA7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gdGhpcy5zbG90U2Nyb2xsVmlldy5zY3JvbGxUbyhjYy52MihiYXNlWCwgMCksIDAuMyk7XG5cblxuICAgICAgICB0aGlzLl9vblNob3dTdWJTbG90KEhvdGVsRGF0YS5nZXRTbG90Q29uZmlnKHRoaXMuX3Jvb21JZCwgc2xvdGlkKSk7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0d1ZXN0Um9vbShkYXRhOiB7IGlkOiBudW1iZXIsIG5pY2tuYW1lOiBzdHJpbmcsIGF2YXRhcl91cmw6IHN0cmluZywgc2NvcmU6IHN0cmluZywgYXBwcmVjaWF0ZTogbnVtYmVyLCBfaG90ZWxEYXRhczogYW55IH0pIHtcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5faG90ZWxEYXRhcykge1xuICAgICAgICAgICAgdGhpcy5fc2hvd0d1ZXN0UGFuZWwodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLl9teVZpZXcuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm9ubGluZUV5ZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IHJvb21EYXRhOiBJUm9vbURhdGEgPSBkYXRhLl9ob3RlbERhdGFzWzFdO1xuICAgICAgICAgICAgdGhpcy5ndWVzdEluZm9QYW5lbC5nZXRDb21wb25lbnQoR3Vlc3RQYW5lbEN0cmwpLmluaXQoZGF0YSk7XG4gICAgICAgICAgICBpZiAocm9vbURhdGEpIHtcbiAgICAgICAgICAgICAgICBDb21tb24uZ2V0UmVzPGNjLlByZWZhYj4oYCR7UGF0aHMuUm9vbVByZWZhYlBhdGh9Um9vbUl0ZW1fJHtyb29tRGF0YS5yb29tSWR9YCwgY2MuUHJlZmFiKS50aGVuKHJvb21QcmVmYWIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocm9vbVByZWZhYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm9vbUl0ZW0gPSB0aGlzLl9ndWVzdFZpZXcgPSBjYy5pbnN0YW50aWF0ZShyb29tUHJlZmFiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb21JdGVtLnBhcmVudCA9IHRoaXMucm9vbUNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByb29tSXRlbS5zY2FsZSA9IFJPT01fREVUQUlMX1NDQUxFO1xuICAgICAgICAgICAgICAgICAgICAgICAgcm9vbUl0ZW0uc2V0UG9zaXRpb24oY2MudjIoMCwgMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tQ29udGVudC5zZXRDb250ZW50U2l6ZShyb29tSXRlbS53aWR0aCAqIFJPT01fREVUQUlMX1NDQUxFLCByb29tSXRlbS5oZWlnaHQgKiBST09NX0RFVEFJTF9TQ0FMRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb21Db250ZW50LnkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tQ29udGVudC5wYXJlbnQueSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb29tQ3RybCA9IHJvb21JdGVtLmdldENvbXBvbmVudChIb3RlbFJvb21DdHJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvb21DdHJsLmluaXQocm9vbURhdGEucm9vbUlkLCByb29tRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KHJvb21JZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub25saW5lRXllLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNsb3REZXRhaWxWaWV3LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJvdHRvbU5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fc2hvd0d1ZXN0UGFuZWwoZmFsc2UpO1xuICAgICAgICB0aGlzLl9zaG93TW9uZXlCb3goZmFsc2UpO1xuICAgICAgICB0aGlzLmRpYW1vbmRMYWJlbC5zdHJpbmcgPSBNLnJ1bnRpbWUuZ2V0Q3VycmVuY3lTdHIoQ3VycmVuY3lJZC5EaWFtb25kKTtcbiAgICAgICAgdGhpcy5jb2luTGFiZWwuc3RyaW5nID0gTS5ydW50aW1lLmdldEZvcm1hdGVDb2luKCk7XG4gICAgICAgIHRoaXMuZ3Vlc3RMaXN0Vmlldy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ndWVzdExpc3RWaWV3LnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgnanQnKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLl9yb29tQ3RybCAmJiB0aGlzLl9yb29tSWQgIT0gcm9vbUlkKSB7XG4gICAgICAgICAgICB0aGlzLnJvb21Db250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xuICAgICAgICAgICAgQ29tbW9uLmdldFJlczxjYy5QcmVmYWI+KGAke1BhdGhzLlJvb21QcmVmYWJQYXRofVJvb21JdGVtXyR7cm9vbUlkfWAsIGNjLlByZWZhYikudGhlbihyb29tUHJlZmFiID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocm9vbVByZWZhYikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByb29tSXRlbSA9IHRoaXMuX215VmlldyA9IGNjLmluc3RhbnRpYXRlKHJvb21QcmVmYWIpO1xuICAgICAgICAgICAgICAgICAgICByb29tSXRlbS5wYXJlbnQgPSB0aGlzLnJvb21Db250ZW50O1xuICAgICAgICAgICAgICAgICAgICByb29tSXRlbS5zY2FsZSA9IFJPT01fREVUQUlMX1NDQUxFO1xuICAgICAgICAgICAgICAgICAgICByb29tSXRlbS5zZXRQb3NpdGlvbihjYy52MigwLCAwKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vbUNvbnRlbnQucGFyZW50LnNldENvbnRlbnRTaXplKHJvb21JdGVtLndpZHRoICogUk9PTV9ERVRBSUxfU0NBTEUsIHJvb21JdGVtLmhlaWdodCAqIFJPT01fREVUQUlMX1NDQUxFKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tQ29udGVudC5wYXJlbnQueSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvb21DdHJsID0gcm9vbUl0ZW0uZ2V0Q29tcG9uZW50KEhvdGVsUm9vbUN0cmwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb29tQ3RybC5pbml0KHJvb21JZCwgbnVsbCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2xvdERhdGEoeyByb29tSWQsIHNsb3RzOiBudWxsLCBzY29yZTogMCB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcm9vbUN0cmwuaW5pdChyb29tSWQsIG51bGwsIHRoaXMpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcm9vbUlkID0gcm9vbUlkO1xuICAgICAgICB0aGlzLmJvdHRvbVNsb3RDb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICAgIHRoaXMuX2luaXRTbG90KCk7XG4gICAgICAgIHRoaXMuX3Nob3dPbmxpbmVMaXN0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2hvd09ubGluZUxpc3QoKSB7XG4gICAgICAgIE0ubmV0LmdldE9ubGluZUxpc3QoKS50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignb25saW5lIGxpc3QnLCBsaXN0KTtcbiAgICAgICAgICAgIHRoaXMuX3Zpc2l0TGlzdCA9IGxpc3Q7XG4gICAgICAgICAgICBpZiAobGlzdCAmJiBsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9ubGluZUV5ZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMub25saW5lQ291bnQuc3RyaW5nID0gbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2hvd01vbmV5Qm94KG9wdDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChvcHQpIHtcbiAgICAgICAgICAgIHRoaXMubW9uZXlCb3guYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc29jcmVCb3guYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm1vbmV5Qm94Lm9wYWNpdHkgPSAwO1xuICAgICAgICAgICAgdGhpcy5tb25leUJveC5ydW5BY3Rpb24oY2MuZmFkZUluKDAuMykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb25leUJveC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc29jcmVCb3guYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc29jcmVCb3gub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICB0aGlzLnNvY3JlQm94LnJ1bkFjdGlvbihjYy5mYWRlSW4oMC4zKSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3Nob3dHdWVzdFBhbmVsKG9wdDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5ndWVzdEluZm9QYW5lbC5hY3RpdmUgPSBvcHQ7XG4gICAgICAgIHRoaXMuYm90dG9tTm9kZS5hY3RpdmUgPSAhb3B0O1xuICAgICAgICB0aGlzLnNlbGZJbmZvUGFuZWwuYWN0aXZlID0gIW9wdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0U2xvdCgpIHtcbiAgICAgICAgLy8gaWYgKCF0aGlzLl9zbG90TWFwKSB7XG4gICAgICAgIC8vICAgICB0aGlzLl9zbG90TWFwID0gbmV3IE1hcCgpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGNvbnN0IGNvbmZpZyA9IEhvdGVsRGF0YS5nZXRSb29tU2xvdHNDb25maWcodGhpcy5fcm9vbUlkKTtcbiAgICAgICAgLy8gaWYgKGNvbmZpZykge1xuICAgICAgICAvLyAgICAgY29uZmlnLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgLy8gICAgICAgICBjb25zdCBzbG90ID0gY2MuaW5zdGFudGlhdGUodGhpcy5wYXJ0c1ByZWZhYilcbiAgICAgICAgLy8gICAgICAgICBzbG90LnBhcmVudCA9IHRoaXMuYm90dG9tU2xvdENvbnRlbnQ7XG4gICAgICAgIC8vICAgICAgICAgc2xvdC5nZXRDb21wb25lbnQoUm9vbURldGFpbEl0ZW1DdHJsKS5pbml0KGtleSArIDEsIHZhbHVlKTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9zbG90TWFwLnNldCh2YWx1ZS5zbG90SWQsIHNsb3QpO1xuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9vbkhpZGVTdWJTbG90KCkge1xuICAgICAgICB0aGlzLl9zaG93TW9uZXlCb3goZmFsc2UpO1xuICAgICAgICB0aGlzLnNsb3REZXRhaWxWaWV3LmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsb3NlU2VsZWN0U3ViU2xvc3RWaWV3KCkge1xuXG4gICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5Ib3RlbC5IaWRlU3ViU2xvdCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ29uZmlybVNlbGVjdFN1YlNsb3N0VmlldygpIHtcbiAgICAgICAgaWYgKE0ucnVudGltZS5Sb29tQ3VycmVudFNlbGVjdFN1YlNsb3RDZmcpIHtcbiAgICAgICAgICAgIGlmIChNb25leU1hbmFnZXIuQ2hlY2tNb25leUpzb24oTS5ydW50aW1lLlJvb21DdXJyZW50U2VsZWN0U3ViU2xvdENmZywgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuSG90ZWwuU2VsZWN0U3ViU2xvdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIE0udWkuc2hvd1VJKFVJSHVkRGVmLlNlbGVjdFNob3dUYXJnZXQsIHsgdHlwZTogVUlIdWREZWYuU2VsZWN0U2hvd1RhcmdldCwgZGF0YTogbnVsbCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkd1ZXN0Q2xvc2VCdG5DbGljaygpIHtcbiAgICAgICAgTS51aS5zaG93VUkoVUlIdWREZWYuQ2xvdWRWaWV3LCBJQ2xvdWREYXRhLlZpc2l0RnJpZW5kSG90ZWwsICgpID0+IHtcbiAgICAgICAgICAgIE0udWkuaGlkZVVJKFVJSHVkRGVmLkZyaWVuZFJhbmspO1xuICAgICAgICAgICAgdGhpcy5fZ3Vlc3RWaWV3ICYmIHRoaXMuX2d1ZXN0Vmlldy5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLl9teVZpZXcgJiYgKHRoaXMuX215Vmlldy5hY3RpdmUgPSB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dHdWVzdFBhbmVsKGZhbHNlKTtcbiAgICAgICAgICAgIE0ubmV0LmV4aXRWaXNpdChNLnJ1bnRpbWUuQ3VycmVudEd1ZXN0VXNlcmlkKTtcbiAgICAgICAgICAgIE0ucnVudGltZS5DdXJyZW50R3Vlc3RVc2VyaWQgPSBudWxsO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkZyaWVuZExpc3RCdG5DbGljaygpIHtcbiAgICAgICAgLy9zZGZzZGZzXG4gICAgICAgIE0udWkuc2hvd1VJKFVJSHVkRGVmLkZyaWVuZFJhbmspO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkd1ZXN0QnRuQ2xpY2soKSB7XG4gICAgICAgIGlmICh0aGlzLl92aXNpdExpc3QpIHtcbiAgICAgICAgICAgIHRoaXMuZ3Vlc3RMaXN0Vmlldy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5ndWVzdExpc3RWaWV3LnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgnanQnKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5ndWVzdExpc3RWaWV3LmdldENvbXBvbmVudChPbkxpbmVHdWVzdEN0cmwpLmluaXQodGhpcy5fdmlzaXRMaXN0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVTbG90RGF0YShyb29tRGF0YTogSVJvb21EYXRhKSB7XG4gICAgICAgIGxldCBzb2NyZSA9IDA7XG4gICAgICAgIGlmICh0aGlzLl9yb29tQ3RybCAmJiB0aGlzLl9yb29tQ3RybC5ub2RlLnNjYWxlICE9IDEpIHtcbiAgICAgICAgICAgIC8v6K6h566X5b2T5YmN5oi/6Ze055qE56ev5YiG5YC8XG4gICAgICAgICAgICBpZiAocm9vbURhdGEuc2xvdHMpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3VpdCA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHJvb21EYXRhLnNsb3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByb29tRGF0YS5zbG90c1trZXldO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjZmcgPSBIb3RlbERhdGEuZ2V0U2xvdENvbmZpZyhkYXRhLnJvb21JZCwgZGF0YS5zbG90SWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2ZnICYmIGNmZy5wcmljZXNbZGF0YS5zdWJJZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvY3JlICs9IGNmZy5wcmljZXNbZGF0YS5zdWJJZF0uZXh0RGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXN1aXRbZGF0YS5yb29tSWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWl0W2RhdGEucm9vbUlkXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3VpdFtkYXRhLnJvb21JZF0rKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy/noa7orqTlpZfoo4XmlbDph48hXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCByb29taWQgaW4gc3VpdCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IHN1aXRbcm9vbWlkXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm9udXMgPSBIb3RlbERhdGEuZ2V0U2xvdEJvbnVzQnlDb3VudChOdW1iZXIocm9vbWlkKSwgY291bnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYm9udXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvY3JlICs9IE1hdGgucm91bmQoKHNvY3JlICogKGJvbnVzIC8gMTAwKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvb21EYXRhLnJvb21JZCA9PSBOdW1iZXIocm9vbWlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2hvdyB0aXBzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihyb29taWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE0udGlwcy5zaG93KCfmv4DmtLvkuoblpZfoo4XliqDmiJAhJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBIb3RlbERhdGEudXBkYXRlUm9vbVNjb3JlKHJvb21EYXRhLnJvb21JZCwgc29jcmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzb2NyZSA9IEhvdGVsRGF0YS5nZXRTY29yZUJ5Um9vbUlkKHJvb21EYXRhLnJvb21JZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNjb3JlTGFiZWwuc3RyaW5nID0gYCR7c29jcmV9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX29uU2hvd1N1YlNsb3Qoc2xvdENmZzogSG90ZWxSb29tQ2ZnKSB7XG4gICAgICAgIC8v5piv5ZCm6ZyA6KaB5Yqo55S7ID8/Pz8gXG4gICAgICAgIGlmIChzbG90Q2ZnKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG93TW9uZXlCb3godHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLnNsb3REZXRhaWxDb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICAgICAgICB0aGlzLnNsb3REZXRhaWxWaWV3LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBNLnJ1bnRpbWUuUm9vbUN1cnJlbnRTZWxlY3RTdWJTbG90Q2ZnID0gbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IGZyYW1lcyA9IHRoaXMuX3Jvb21DdHJsLmdldFNvbHRGcmFtZXMoc2xvdENmZy5zbG90SWQpO1xuICAgICAgICAgICAgc2xvdENmZy5wcmljZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzbG90U3ViTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc2xvdERldGFpbEl0ZW1QcmVmYWIpO1xuICAgICAgICAgICAgICAgIHNsb3RTdWJOb2RlLnBhcmVudCA9IHRoaXMuc2xvdERldGFpbENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgc2xvdFN1Yk5vZGUuZ2V0Q29tcG9uZW50KFJvb21TbG90RGV0YWlsSXRlbUN0cmwpLmluaXQoc2xvdENmZy5yb29tSWQsIHNsb3RDZmcuc2xvdElkLCBpdGVtLCBmcmFtZXNbaXRlbS5pZCAtIDFdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gTS5ldmVudC5zZW5kKEV2ZW50LkhvdGVsLkNoYW5nZVNsb3QsIHNsb3RDZmcuc2xvdElkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbk90aGVyQ2xpY2soYSkge1xuICAgICAgICAvLyBNLmV2ZW50LnNlbmQoRXZlbnQuSG90ZWwuSGlkZVN1YlNsb3QpO1xuICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuSG90ZWwuTWFwU2Nyb2xsQmVnaW4pO1xuXG4gICAgICAgIHRoaXMuZ3Vlc3RMaXN0Vmlldy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ndWVzdExpc3RWaWV3LnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgnanQnKS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25FeGl0QnRuQ2xpY2soKSB7XG4gICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5Ib3RlbC5IaWRlU3ViU2xvdCk7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbn1cbiJdfQ==