
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Hotel/HotelMapCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcSG90ZWxcXEhvdGVsTWFwQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQXFDO0FBRXJDLCtDQUE4QztBQUM5QyxpREFBZ0Q7QUFDaEQsd0RBQW1EO0FBQ25ELDZDQUE0QztBQUM1QyxrREFBNkM7QUFDN0MsbURBQW9EO0FBQ3BELHdDQUFtQztBQUNuQywyQ0FBc0M7QUFDdEMsZ0RBQTJDO0FBQzNDLG1EQUE4QztBQUM5Qyx5Q0FBd0M7QUFDeEMsOENBQTZDO0FBRXZDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDO0lBQWtDLGdDQUFZO0lBQTlDO1FBQUEscUVBdU9DO1FBck9HLGdCQUFVLEdBQWtCLElBQUksQ0FBQztRQUdqQyxRQUFFLEdBQVksSUFBSSxDQUFDO1FBR25CLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIscUJBQWUsR0FBWSxJQUFJLENBQUM7UUFHaEMsb0JBQWMsR0FBYyxJQUFJLENBQUM7UUFHakMsdUJBQWlCLEdBQWMsSUFBSSxDQUFDO1FBR3BDLHVCQUFpQixHQUFjLElBQUksQ0FBQztRQUVwQyxzQkFBc0I7UUFDdEIsOEJBQThCO1FBR3RCLG9CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBQ25DLG1CQUFtQjtRQUNYLG1CQUFhLEdBQUcsSUFBSSxHQUFHLEVBQXlCLENBQUM7UUFDekQsb0JBQW9CO1FBQ1osbUJBQWEsR0FBRyxHQUFHLENBQUM7UUFDcEIsd0JBQWtCLEdBQUcsR0FBRyxDQUFDLENBQUcsVUFBVTtRQUN0QyxxQkFBZSxHQUFHLEdBQUcsQ0FBQyxDQUFNLFVBQVU7UUFDdEMsd0JBQWtCLEdBQUcsR0FBRyxDQUFDLENBQUcsVUFBVTtRQUN0QyxzQkFBZ0IsR0FBRyxHQUFHLENBQUMsQ0FBSyxVQUFVO1FBQ3RDLHlCQUFt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RSxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsYUFBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBbk9EO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0RBQ1M7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0Q0FDQztJQUduQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eURBQ2M7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt3REFDYTtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzJEQUNnQjtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzJEQUNnQjtJQXBCM0IsWUFBWTtRQUR4QixPQUFPO09BQ0ssWUFBWSxDQXVPeEI7SUFBRCxtQkFBQztDQXZPRCxBQXVPQyxDQXZPaUMsRUFBRSxDQUFDLFNBQVMsR0F1TzdDO0FBdk9ZLG9DQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE0gZnJvbSBcIi4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgeyBJSG90ZWxDZmcgfSBmcm9tIFwiLi4vLi4vQmFzZS9UYWJscy9Ib3RlbENmZ1wiO1xuaW1wb3J0IHsgSG90ZWxNYW5hZ2VyIH0gZnJvbSBcIi4vSG90ZWxNYW5hZ2VyXCI7XG5pbXBvcnQgeyBIb3RlbFJvb21DdHJsIH0gZnJvbSBcIi4vSG90ZWxSb29tQ3RybFwiO1xuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi8uLi9CYXNlL01hbmFnZXIvRXZlbnRNZ3JcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCBVSU1nciBmcm9tIFwiLi4vLi4vQmFzZS9NYW5hZ2VyL1VJTWdyXCI7XG5pbXBvcnQgeyBVSUh1ZERlZiB9IGZyb20gXCIuLi9EYXRhL0ludGVyZmFjZS9VSURhdGFcIjtcbmltcG9ydCBBcHBzIGZyb20gXCIuLi8uLi9CYXNlL0FwcHNcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCBQYXRocyBmcm9tIFwiLi4vLi4vQmFzZS9VdGlscy9QYXRoc1wiO1xuaW1wb3J0IFJvb21EZXRhaWxDdHJsIGZyb20gXCIuL1Jvb21EZXRhaWxDdHJsXCI7XG5pbXBvcnQgeyBIb3RlbERhdGEgfSBmcm9tIFwiLi9Ib3RlbERhdGFcIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vQmFzZS9VdGlscy9VdGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGNsYXNzIEhvdGVsTWFwQ3RybCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KGNjLlNjcm9sbFZpZXcpXG4gICAgc2Nyb2xsVmlldzogY2MuU2Nyb2xsVmlldyA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBiZzogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICByb29tVmlldzogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICByb29tSXRlbUNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICByb29tSXRlbVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgcm9vbUJvdEl0ZW1QcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHJvb21Ub3BJdGVtUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgLy8gQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIC8vIGxhYmVsQ29pbjogY2MuTGFiZWwgPSBudWxsO1xuXG5cbiAgICBwcml2YXRlIF9jdXJPcGVuUm9vbUlkOiBudW1iZXIgPSAwO1xuICAgIC8qKiByb29tSXRlbeiEmuacrOWtmOaUviAqL1xuICAgIHByaXZhdGUgX3Jvb21JdGVtTWFwcyA9IG5ldyBNYXA8bnVtYmVyLCBIb3RlbFJvb21DdHJsPigpO1xuICAgIC8qKiByb29tSXRlbeeahHnovbTpl7TpmpQgKi9cbiAgICBwcml2YXRlIF9yb29tSXRlbUdhcFkgPSAzNzI7XG4gICAgcHJpdmF0ZSBfcm9vbUl0ZW1Ub3BIZWlnaHQgPSA0NTA7ICAgLy/miL/pl7Tpq5jluqYgLeS4iuWxglxuICAgIHByaXZhdGUgX3Jvb21JdGVtSGVpZ2h0ID0gNzAzOyAgICAgIC8v5oi/6Ze06auY5bqmIC3kuK3lsYJcbiAgICBwcml2YXRlIF9yb29tSXRlbUJvdEhlaWdodCA9IDcwMzsgICAvL+aIv+mXtOmrmOW6piAt5LiL5bGCXG4gICAgcHJpdmF0ZSBfcm9vbUl0ZW1Ub3BHYXBZID0gMzAwOyAgICAgLy/miL/pl7Tot53nprvpobbpg6jnqbrpmplcbiAgICBwcml2YXRlIF9yb29tSXRlbUJvdHRvbUdhcFkgPSAyMzA7Ly8zNDA7ICAvL+aIv+mXtOi3neemu+W6lemDqOepuumamVxuXG4gICAgLy8jcmVnaW9uIC0tLS0tLS3miL/pl7Tnm7jlhbMtLS0tLS0tLS1cbiAgICAvKiog5Yid5aeL5YyW5oi/6Ze0SXRlbSAqL1xuICAgIHByaXZhdGUgaW5pdFJvb21JdGVtKCkge1xuXG4gICAgICAgIGlmIChBcHBzLmlzRGVidWcpIHtcbiAgICAgICAgICAgIFV0aWwuVG9vbC5zaG93RGVidWdWaWV3KHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucm9vbUl0ZW1Db250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICAgIHRoaXMuX3Jvb21JdGVtTWFwcy5jbGVhcigpO1xuXG4gICAgICAgIC8vIHRoaXMuYWRkUm9vbVRvcEl0ZW0oKTtcblxuICAgICAgICBsZXQgZGF0YXMgPSBNLnRhYmxlLkhvdGVsQ2ZnLmdldERhdGEoKTtcbiAgICAgICAgbGV0IGxhc3RSb29tSWQgPSAwO1xuXG4gICAgICAgIGRhdGFzLmZvckVhY2goKGRhdGE6IElIb3RlbENmZywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIC8vIOWIpOaWreaYr+WQpuWFqOmDqOWujOaIkD8/PyDmiJbogIXovr7miJDmn5Dnp43nqIvluqZcbiAgICAgICAgICAgIGxldCBsYXN0Um9vbUZpbmlzaGVkID0gSG90ZWxNYW5hZ2VyLmNoZWNrUm9vbVNsb3RzRmluaXNoZWQobGFzdFJvb21JZCk7XG4gICAgICAgICAgICBpZiAobGFzdFJvb21GaW5pc2hlZCkge1xuICAgICAgICAgICAgICAgIC8v5re75YqgUm9vbUl0ZW1cbiAgICAgICAgICAgICAgICB0aGlzLmFkZFJvb21JdGVtKGRhdGEucm9vbUlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJPcGVuUm9vbUlkID0gZGF0YS5yb29tSWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0Um9vbUlkID0gZGF0YS5yb29tSWQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiDmt7vliqDkuIDkuKrlpLTpg6jlsZXnpLpyb29tICovXG4gICAgcHJpdmF0ZSBhZGRSb29tVG9wSXRlbSgpIHtcbiAgICAgICAgbGV0IHJvb21Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5yb29tVG9wSXRlbVByZWZhYik7XG4gICAgICAgIHRoaXMucm9vbUl0ZW1Db250ZW50LmFkZENoaWxkKHJvb21Ob2RlKTtcbiAgICAgICAgcm9vbU5vZGUuc2V0UG9zaXRpb24oY2MudjIoMCwgLXJvb21Ob2RlLmhlaWdodCAvIDIgLSB0aGlzLl9yb29tSXRlbVRvcEdhcFkpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJvb21Db3VudGVyID0gMDtcbiAgICBwcml2YXRlIGFkZFJvb21JdGVtKHJvb21JZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucm9vbUNvdW50ZXIrKztcbiAgICAgICAgQ29tbW9uLmdldFJlczxjYy5QcmVmYWI+KGAke1BhdGhzLlJvb21QcmVmYWJQYXRofVJvb21JdGVtXyR7cm9vbUlkfWAsIGNjLlByZWZhYikudGhlbihyb29tUHJlZmFiID0+IHtcbiAgICAgICAgICAgIGlmIChyb29tUHJlZmFiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGN1ckNoaWxkTnVtID0gdGhpcy5yb29tSXRlbUNvbnRlbnQuY2hpbGRyZW5Db3VudCAtIDE7XG4gICAgICAgICAgICAgICAgbGV0IHJvb21Ob2RlID0gY2MuaW5zdGFudGlhdGUocm9vbVByZWZhYik7XG4gICAgICAgICAgICAgICAgcm9vbU5vZGUubmFtZSA9IHJvb21JZC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHJvb21Ob2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsIHRoaXMuX2dldFJvb21Qb3NZKGN1ckNoaWxkTnVtKSAtIHRoaXMuX3Jvb21JdGVtSGVpZ2h0IC8gMikpO1xuICAgICAgICAgICAgICAgIHJvb21Ob2RlLnBhcmVudCA9IHRoaXMucm9vbUl0ZW1Db250ZW50O1xuICAgICAgICAgICAgICAgIGxldCByb29tQ3RybCA9IHJvb21Ob2RlLmdldENvbXBvbmVudChIb3RlbFJvb21DdHJsKTtcbiAgICAgICAgICAgICAgICByb29tQ3RybC5pbml0KHJvb21JZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm9vbUl0ZW1NYXBzLnNldChyb29tSWQsIHJvb21DdHJsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb21Db3VudGVyLS07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm9vbUNvdW50ZXIgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkUm9vbUl0ZW1Db21wbGV0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgX2xvYWRSb29tSXRlbUNvbXBsZXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJvb21JdGVtQ29udGVudC5jaGlsZHJlbkNvdW50IDw9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkUm9vbUJvdEl0ZW0oKTtcbiAgICAgICAgICAgIHRoaXMuYWRkUm9vbUJvdEl0ZW0oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRkUm9vbUJvdEl0ZW0oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZVJvb21JdGVtWkluZGV4KCk7XG4gICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsSGVpZ2h0KCk7XG4gICAgICAgIGlmICh0aGlzLnJvb21JdGVtQ29udGVudC5jaGlsZHJlbkNvdW50ID4gMykge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxUbyh0aGlzLl9jdXJPcGVuUm9vbUlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiDmt7vliqDmnIDlupXpg6jnmoTkuIDkuKrmnKrop6PplIHnmoTphZLlupcgKi9cbiAgICBwcml2YXRlIGFkZFJvb21Cb3RJdGVtKCkge1xuICAgICAgICBsZXQgY3VyQ2hpbGROdW0gPSB0aGlzLnJvb21JdGVtQ29udGVudC5jaGlsZHJlbkNvdW50IC0gMTtcbiAgICAgICAgbGV0IHJvb21Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5yb29tQm90SXRlbVByZWZhYik7XG4gICAgICAgIHRoaXMucm9vbUl0ZW1Db250ZW50LmFkZENoaWxkKHJvb21Ob2RlKTtcbiAgICAgICAgcm9vbU5vZGUuc2V0UG9zaXRpb24oY2MudjIoMCwgdGhpcy5fZ2V0Um9vbVBvc1koY3VyQ2hpbGROdW0pIC0gdGhpcy5fcm9vbUl0ZW1Cb3RIZWlnaHQgLyAyKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0Um9vbVBvc1koaW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAtdGhpcy5fcm9vbUl0ZW1Ub3BHYXBZIC0gdGhpcy5fcm9vbUl0ZW1Ub3BIZWlnaHQgLyAyICsgKHRoaXMuX3Jvb21JdGVtSGVpZ2h0IC0gdGhpcy5fcm9vbUl0ZW1Ub3BIZWlnaHQpIC8gMiAtIDI1XG4gICAgICAgICAgICAtIGluZGV4ICogdGhpcy5fcm9vbUl0ZW1IZWlnaHRcbiAgICAgICAgICAgICsgKDEgKyBpbmRleCAtIDEpICogdGhpcy5fcm9vbUl0ZW1HYXBZXG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVSb29tSXRlbVpJbmRleCgpIHtcbiAgICAgICAgbGV0IG51bUNoaWxkcmVuID0gdGhpcy5yb29tSXRlbUNvbnRlbnQuY2hpbGRyZW5Db3VudDtcbiAgICAgICAgZm9yIChsZXQgaSA9IG51bUNoaWxkcmVuIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMucm9vbUl0ZW1Db250ZW50LmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgY2hpbGQuekluZGV4ID0gbnVtQ2hpbGRyZW4gLSAxIC0gaTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5pu05pawc2Nyb2xsVmlld+eahOWGheWuuemrmOW6plxuICAgIHByaXZhdGUgdXBkYXRlU2Nyb2xsSGVpZ2h0KCkge1xuICAgICAgICBsZXQgbnVtQ2hpbGRyZW4gPSB0aGlzLnJvb21JdGVtQ29udGVudC5jaGlsZHJlbkNvdW50O1xuICAgICAgICB0aGlzLnNjcm9sbFZpZXcuY29udGVudC5oZWlnaHQgPSB0aGlzLnJvb21JdGVtQ29udGVudC5oZWlnaHQgPSAoKG51bUNoaWxkcmVuIC0gMikgKiB0aGlzLl9yb29tSXRlbUhlaWdodCkgLSAoKG51bUNoaWxkcmVuIC0gMSkgKiB0aGlzLl9yb29tSXRlbUdhcFkpICsgdGhpcy5fcm9vbUl0ZW1Cb3RIZWlnaHQgKyB0aGlzLl9yb29tSXRlbVRvcEhlaWdodCArIHRoaXMuX3Jvb21JdGVtVG9wR2FwWSArIHRoaXMuX3Jvb21JdGVtQm90dG9tR2FwWTtcbiAgICAgICAgdGhpcy5iZy5oZWlnaHQgPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudC5oZWlnaHQgKiAxLjI7XG4gICAgICAgIHRoaXMuYmcueSArPSB0aGlzLmJnLmhlaWdodCAqIDAuMTtcbiAgICB9XG5cbiAgICAvL+WumuS9jeWIsOW9k+WJjeaIv+mXtFxuICAgIHByaXZhdGUgc2Nyb2xsVG8oY3VyUm9vbUlkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGN1clJvb20gPSB0aGlzLmdldFJvb21DdHJsQnlJZCgxKTtcbiAgICAgICAgICAgIGlmIChjdXJSb29tKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJvb21Qb3MgPSBjdXJSb29tLm5vZGUucG9zaXRpb247XG4gICAgICAgICAgICAgICAgbGV0IHNzID0gTWF0aC5hYnMoKHJvb21Qb3MueSkgLyB0aGlzLnJvb21JdGVtQ29udGVudC5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3Iocm9vbVBvcy55LCB0aGlzLnJvb21JdGVtQ29udGVudC5oZWlnaHQsIDEgLSBzcywgc3MpXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvKGNjLnYyKDAsIDEgLSBzcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAwLjAyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TY3JvbGxFdmVudChzZW5kZXIsIGV2ZW50VHlwZTogY2MuU2Nyb2xsVmlldy5FdmVudFR5cGUsIGN1c3RvbUV2ZW50RGF0YSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGV2ZW50VHlwZSk7XG4gICAgICAgIGlmIChldmVudFR5cGUgPT0gY2MuU2Nyb2xsVmlldy5FdmVudFR5cGUuU0NST0xMX0JFR0FOKSB7XG4gICAgICAgICAgICBFdmVudE1nci5pbnMuc2VuZChFdmVudC5Ib3RlbC5NYXBTY3JvbGxCZWdpbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiog5pyJ5oi/6Ze06Kej6ZSB5a6M5q+VIOS4i+S4gOatpeaTjeS9nCAqL1xuICAgIHByaXZhdGUgZG9VbmxvY2tSb29tKCkge1xuICAgICAgICBNLnRpcHMuc2hvdyhcIuaBreWWnOW8gOWQr+S6huaWsOaIv+mXtCFcIik7XG4gICAgICAgIHRoaXMuaW5pdFJvb21JdGVtKCk7XG4gICAgfVxuXG4gICAgLyoqIOi/lOWbnnJvb21JdGVt5o6n5Yi26ISa5pysICovXG4gICAgcHJpdmF0ZSBnZXRSb29tQ3RybEJ5SWQocm9vbUlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb29tSXRlbU1hcHMuZ2V0KHJvb21JZCk7XG4gICAgfVxuICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgLy8jcmVnaW9uIC0tLS0tLS3nlYzpnaJVSeebuOWFsy0tLS0tLS0gXG4gICAgcHVibGljIHVwZGF0ZUluZm8oKSB7XG4gICAgICAgIC8vIHRoaXMubGFiZWxDb2luLnN0cmluZyA9IE0ucnVudGltZS5nZXRGb3JtYXRlQ29pbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsaWNrSGVhZCgpIHtcbiAgICAgICAgaWYgKEFwcHMuaXNPcGVuR00pIHtcbiAgICAgICAgICAgIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuR01WaWV3KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vI2VuZHJlZ2lvblxuXG4gICAgcHVibGljIG9uTG9hZCgpIHtcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnJlZ2lzdGVyKEV2ZW50LlVJLlVwZGF0ZUN1cnJlbmN5LCB0aGlzLnVwZGF0ZUluZm8sIHRoaXMpO1xuICAgICAgICBFdmVudE1nci5pbnMucmVnaXN0ZXIoRXZlbnQuSG90ZWwuUm9vbUZpbmlzaGVkLCB0aGlzLmRvVW5sb2NrUm9vbSwgdGhpcyk7XG4gICAgICAgIE0uaW5pdCgpO1xuICAgICAgICBNLnRhYmxlLmV4ZWN1dGUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIEhvdGVsRGF0YS5pbml0RGF0YSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0Um9vbUl0ZW0oKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5mbygpO1xuICAgICAgICAgICAgdGhpcy5pbml0VG91Y2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Ub3VjaEJlZ2luKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XG4gICAgICAgIGNvbnN0IHBvcyA9IGV2ZW50LnRvdWNoLmdldExvY2F0aW9uKClcblxuICAgIH1cblxuICAgIHB1YmxpYyBvblJvb21DbGljayhldmVudCkge1xuICAgICAgICBjb25zdCByb29tcyA9IHRoaXMuX3Jvb21JdGVtTWFwcy52YWx1ZXMoKVxuICAgICAgICBsZXQgcm9vbTogSXRlcmF0b3JSZXN1bHQ8SG90ZWxSb29tQ3RybD4gPSBudWxsXG4gICAgICAgIHdoaWxlIChyb29tID0gcm9vbXMubmV4dCgpLCAhcm9vbS5kb25lKSB7XG4gICAgICAgICAgICBjb25zdCBjdHJsID0gcm9vbS52YWx1ZTtcbiAgICAgICAgICAgIGlmIChjdHJsLnRvdWNoKGV2ZW50LnRvdWNoLmdldExvY2F0aW9uKCkpKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign54K55Yiw5LqGIScsIGN0cmwubmFtZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd0JpZ1ZpZXcoTnVtYmVyKGN0cmwubm9kZS5uYW1lKSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBfc2hvd0JpZ1ZpZXcocm9vbUlkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yb29tVmlldy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJvb21WaWV3LmdldENvbXBvbmVudChSb29tRGV0YWlsQ3RybCkuc2hvdyhyb29tSWQpO1xuXG5cbiAgICB9XG5cbiAgICBpbml0VG91Y2goKSB7XG5cbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hCZWdpbiwgdGhpcyk7XG5cbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX3Jvb21JdGVtTWFwcy5jbGVhcigpO1xuICAgICAgICBFdmVudE1nci5pbnMudW5SZWdpc3RlcihFdmVudC5VSS5VcGRhdGVDdXJyZW5jeSwgdGhpcy51cGRhdGVJbmZvLCB0aGlzKTtcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnVuUmVnaXN0ZXIoRXZlbnQuSG90ZWwuUm9vbUZpbmlzaGVkLCB0aGlzLmRvVW5sb2NrUm9vbSwgdGhpcyk7XG4gICAgfVxuXG59Il19