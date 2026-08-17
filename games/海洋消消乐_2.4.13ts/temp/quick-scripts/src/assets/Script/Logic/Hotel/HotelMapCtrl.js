"use strict";
cc._RF.push(module, '095c2+1R8ZGWpYnts/931L/', 'HotelMapCtrl');
// Script/Logic/Hotel/HotelMapCtrl.ts

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
exports.HotelMapCtrl = void 0;
var M_1 = require("../../Base/Manager/M");
var HotelManager_1 = require("./HotelManager");
var HotelRoomCtrl_1 = require("./HotelRoomCtrl");
var EventMgr_1 = require("../../Base/Manager/EventMgr");
var Event_1 = require("../Data/Const/Event");
var UIMgr_1 = require("../../Base/Manager/UIMgr");
var UIData_1 = require("../Data/Interface/UIData");
var Apps_1 = require("../../Base/Apps");
var Common_1 = require("../Common/Common");
var Paths_1 = require("../../Base/Utils/Paths");
var RoomDetailCtrl_1 = require("./RoomDetailCtrl");
var HotelData_1 = require("./HotelData");
var Util_1 = require("../../Base/Utils/Util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HotelMapCtrl = /** @class */ (function (_super) {
    __extends(HotelMapCtrl, _super);
    function HotelMapCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollView = null;
        _this.bg = null;
        _this.roomView = null;
        _this.roomItemContent = null;
        _this.roomItemPrefab = null;
        _this.roomBotItemPrefab = null;
        _this.roomTopItemPrefab = null;
        // @property(cc.Label)
        // labelCoin: cc.Label = null;
        _this._curOpenRoomId = 0;
        /** roomItem脚本存放 */
        _this._roomItemMaps = new Map();
        /** roomItem的y轴间隔 */
        _this._roomItemGapY = 372;
        _this._roomItemTopHeight = 450; //房间高度 -上层
        _this._roomItemHeight = 703; //房间高度 -中层
        _this._roomItemBotHeight = 703; //房间高度 -下层
        _this._roomItemTopGapY = 300; //房间距离顶部空隙
        _this._roomItemBottomGapY = 230; //340;  //房间距离底部空隙
        _this.roomCounter = 0;
        return _this;
    }
    //#region -------房间相关---------
    /** 初始化房间Item */
    HotelMapCtrl.prototype.initRoomItem = function () {
        var _this = this;
        if (Apps_1.default.isDebug) {
            Util_1.Util.Tool.showDebugView(true);
        }
        this.roomItemContent.removeAllChildren();
        this._roomItemMaps.clear();
        // this.addRoomTopItem();
        var datas = M_1.default.table.HotelCfg.getData();
        var lastRoomId = 0;
        datas.forEach(function (data, index) {
            // 判断是否全部完成??? 或者达成某种程度
            var lastRoomFinished = HotelManager_1.HotelManager.checkRoomSlotsFinished(lastRoomId);
            if (lastRoomFinished) {
                //添加RoomItem
                _this.addRoomItem(data.roomId);
                _this._curOpenRoomId = data.roomId;
            }
            lastRoomId = data.roomId;
        });
    };
    /** 添加一个头部展示room */
    HotelMapCtrl.prototype.addRoomTopItem = function () {
        var roomNode = cc.instantiate(this.roomTopItemPrefab);
        this.roomItemContent.addChild(roomNode);
        roomNode.setPosition(cc.v2(0, -roomNode.height / 2 - this._roomItemTopGapY));
    };
    HotelMapCtrl.prototype.addRoomItem = function (roomId) {
        var _this = this;
        this.roomCounter++;
        Common_1.default.getRes(Paths_1.default.RoomPrefabPath + "RoomItem_" + roomId, cc.Prefab).then(function (roomPrefab) {
            if (roomPrefab) {
                var curChildNum = _this.roomItemContent.childrenCount - 1;
                var roomNode = cc.instantiate(roomPrefab);
                roomNode.name = roomId.toString();
                roomNode.setPosition(cc.v2(0, _this._getRoomPosY(curChildNum) - _this._roomItemHeight / 2));
                roomNode.parent = _this.roomItemContent;
                var roomCtrl = roomNode.getComponent(HotelRoomCtrl_1.HotelRoomCtrl);
                roomCtrl.init(roomId);
                _this._roomItemMaps.set(roomId, roomCtrl);
                _this.roomCounter--;
                if (_this.roomCounter <= 0) {
                    _this._loadRoomItemComplet();
                }
            }
        });
    };
    HotelMapCtrl.prototype._loadRoomItemComplet = function () {
        if (this.roomItemContent.childrenCount <= 1) {
            this.addRoomBotItem();
            this.addRoomBotItem();
        }
        else {
            this.addRoomBotItem();
        }
        this.updateRoomItemZIndex();
        this.updateScrollHeight();
        if (this.roomItemContent.childrenCount > 3) {
            this.scrollTo(this._curOpenRoomId);
        }
    };
    /** 添加最底部的一个未解锁的酒店 */
    HotelMapCtrl.prototype.addRoomBotItem = function () {
        var curChildNum = this.roomItemContent.childrenCount - 1;
        var roomNode = cc.instantiate(this.roomBotItemPrefab);
        this.roomItemContent.addChild(roomNode);
        roomNode.setPosition(cc.v2(0, this._getRoomPosY(curChildNum) - this._roomItemBotHeight / 2));
    };
    HotelMapCtrl.prototype._getRoomPosY = function (index) {
        return -this._roomItemTopGapY - this._roomItemTopHeight / 2 + (this._roomItemHeight - this._roomItemTopHeight) / 2 - 25
            - index * this._roomItemHeight
            + (1 + index - 1) * this._roomItemGapY;
    };
    HotelMapCtrl.prototype.updateRoomItemZIndex = function () {
        var numChildren = this.roomItemContent.childrenCount;
        for (var i = numChildren - 1; i >= 0; --i) {
            var child = this.roomItemContent.children[i];
            child.zIndex = numChildren - 1 - i;
        }
    };
    //更新scrollView的内容高度
    HotelMapCtrl.prototype.updateScrollHeight = function () {
        var numChildren = this.roomItemContent.childrenCount;
        this.scrollView.content.height = this.roomItemContent.height = ((numChildren - 2) * this._roomItemHeight) - ((numChildren - 1) * this._roomItemGapY) + this._roomItemBotHeight + this._roomItemTopHeight + this._roomItemTopGapY + this._roomItemBottomGapY;
        this.bg.height = this.scrollView.content.height * 1.2;
        this.bg.y += this.bg.height * 0.1;
    };
    //定位到当前房间
    HotelMapCtrl.prototype.scrollTo = function (curRoomId) {
        var _this = this;
        this.scheduleOnce(function () {
            var curRoom = _this.getRoomCtrlById(1);
            if (curRoom) {
                var roomPos = curRoom.node.position;
                var ss = Math.abs((roomPos.y) / _this.roomItemContent.height);
                console.error(roomPos.y, _this.roomItemContent.height, 1 - ss, ss);
                _this.scrollView.scrollTo(cc.v2(0, 1 - ss));
            }
        }, 0.02);
    };
    HotelMapCtrl.prototype.onScrollEvent = function (sender, eventType, customEventData) {
        console.error(eventType);
        if (eventType == cc.ScrollView.EventType.SCROLL_BEGAN) {
            EventMgr_1.default.ins.send(Event_1.Event.Hotel.MapScrollBegin);
        }
    };
    /** 有房间解锁完毕 下一步操作 */
    HotelMapCtrl.prototype.doUnlockRoom = function () {
        M_1.default.tips.show("恭喜开启了新房间!");
        this.initRoomItem();
    };
    /** 返回roomItem控制脚本 */
    HotelMapCtrl.prototype.getRoomCtrlById = function (roomId) {
        return this._roomItemMaps.get(roomId);
    };
    //#endregion
    //#region -------界面UI相关------- 
    HotelMapCtrl.prototype.updateInfo = function () {
        // this.labelCoin.string = M.runtime.getFormateCoin();
    };
    HotelMapCtrl.prototype.onClickHead = function () {
        if (Apps_1.default.isOpenGM) {
            UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.GMView);
        }
    };
    //#endregion
    HotelMapCtrl.prototype.onLoad = function () {
        var _this = this;
        EventMgr_1.default.ins.register(Event_1.Event.UI.UpdateCurrency, this.updateInfo, this);
        EventMgr_1.default.ins.register(Event_1.Event.Hotel.RoomFinished, this.doUnlockRoom, this);
        M_1.default.init();
        M_1.default.table.execute().then(function () {
            HotelData_1.HotelData.initData();
            _this.initRoomItem();
            _this.updateInfo();
            _this.initTouch();
        });
    };
    HotelMapCtrl.prototype.onTouchBegin = function (event) {
        var pos = event.touch.getLocation();
    };
    HotelMapCtrl.prototype.onRoomClick = function (event) {
        var rooms = this._roomItemMaps.values();
        var room = null;
        while (room = rooms.next(), !room.done) {
            var ctrl = room.value;
            if (ctrl.touch(event.touch.getLocation())) {
                console.error('点到了!', ctrl.name);
                this._showBigView(Number(ctrl.node.name));
                break;
            }
        }
    };
    HotelMapCtrl.prototype._showBigView = function (roomId) {
        this.roomView.active = true;
        this.roomView.getComponent(RoomDetailCtrl_1.default).show(roomId);
    };
    HotelMapCtrl.prototype.initTouch = function () {
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
    };
    HotelMapCtrl.prototype.onDestroy = function () {
        this._roomItemMaps.clear();
        EventMgr_1.default.ins.unRegister(Event_1.Event.UI.UpdateCurrency, this.updateInfo, this);
        EventMgr_1.default.ins.unRegister(Event_1.Event.Hotel.RoomFinished, this.doUnlockRoom, this);
    };
    __decorate([
        property(cc.ScrollView)
    ], HotelMapCtrl.prototype, "scrollView", void 0);
    __decorate([
        property(cc.Node)
    ], HotelMapCtrl.prototype, "bg", void 0);
    __decorate([
        property(cc.Node)
    ], HotelMapCtrl.prototype, "roomView", void 0);
    __decorate([
        property(cc.Node)
    ], HotelMapCtrl.prototype, "roomItemContent", void 0);
    __decorate([
        property(cc.Prefab)
    ], HotelMapCtrl.prototype, "roomItemPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], HotelMapCtrl.prototype, "roomBotItemPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], HotelMapCtrl.prototype, "roomTopItemPrefab", void 0);
    HotelMapCtrl = __decorate([
        ccclass
    ], HotelMapCtrl);
    return HotelMapCtrl;
}(cc.Component));
exports.HotelMapCtrl = HotelMapCtrl;

cc._RF.pop();