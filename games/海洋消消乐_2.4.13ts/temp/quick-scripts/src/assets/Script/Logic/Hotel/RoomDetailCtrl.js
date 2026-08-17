"use strict";
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