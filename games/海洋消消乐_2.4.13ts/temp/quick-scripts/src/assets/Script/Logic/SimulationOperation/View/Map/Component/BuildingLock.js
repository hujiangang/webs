"use strict";
cc._RF.push(module, 'daf244pS2NBn6h5f6yP/d+6', 'BuildingLock');
// Script/Logic/SimulationOperation/View/Map/Component/BuildingLock.ts

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
var EventMgr_1 = require("../../../../../Base/Manager/EventMgr");
var Event_1 = require("../../../../Data/Const/Event");
var Common_1 = require("../../../../Common/Common");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BuildingLock = /** @class */ (function (_super) {
    __extends(BuildingLock, _super);
    function BuildingLock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.icon = null;
        _this._iconId = 0;
        _this._buildingId = 0;
        _this._exchange = null;
        /**   新海岛酒店 */
        _this._roomId = -1;
        _this._slotId = -1;
        return _this;
        //返回世界坐标
        // public getWorldPosition() {
        //     return this.node.parent.convertToWorldSpaceAR(this.node.position);
        // }
    }
    BuildingLock.prototype.setData = function (iconId, buildingId, exchange) {
        this._iconId = iconId;
        this._buildingId = buildingId;
        this._exchange = exchange;
    };
    BuildingLock.prototype.onEnable = function () {
        this.setIcon();
    };
    BuildingLock.prototype.setIcon = function () {
        // cc.loader.loadRes("texture/map/ui/icon/building_icon_" + this._iconId, cc.SpriteFrame, (err, spriteFrame) => {
        //     this.icon.spriteFrame = spriteFrame;
        // });
        // cc.loader.loadRes("texture/hotel/slotIcon/slot_icon_1"  /*this._iconId*/, cc.SpriteFrame, (err, res: cc.SpriteFrame) => {
        //     this.icon.spriteFrame = res;
        // });
    };
    BuildingLock.prototype.onIconClick = function () {
        // EventMgr.ins.send(Event.Map.ShowTool, this._buildingId, this.node.position, this._exchange);
        //解锁时默认子id为第一套!!
        var slotData = { roomId: this._roomId, slotId: this._slotId, subId: 1, state: 0 };
        EventMgr_1.default.ins.send(Event_1.Event.Hotel.UIRoomUnlock, slotData, Common_1.default.getWorldPos(this.node));
    };
    BuildingLock.prototype.onDestroy = function () {
        this._exchange = null;
        this._buildingId = null;
        this._iconId = null;
    };
    BuildingLock.prototype.setHotelData = function (roomId, slotId) {
        this._roomId = roomId;
        this._slotId = this._iconId = slotId;
    };
    __decorate([
        property(cc.Sprite)
    ], BuildingLock.prototype, "icon", void 0);
    BuildingLock = __decorate([
        ccclass
    ], BuildingLock);
    return BuildingLock;
}(cc.Component));
exports.default = BuildingLock;

cc._RF.pop();