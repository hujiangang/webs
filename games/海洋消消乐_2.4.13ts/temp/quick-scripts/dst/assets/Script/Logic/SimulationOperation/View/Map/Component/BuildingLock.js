
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/SimulationOperation/View/Map/Component/BuildingLock.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcU2ltdWxhdGlvbk9wZXJhdGlvblxcVmlld1xcTWFwXFxDb21wb25lbnRcXEJ1aWxkaW5nTG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBNEQ7QUFDNUQsc0RBQXFEO0FBR3JELG9EQUErQztBQUV6QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQXFEQztRQW5ERyxVQUFJLEdBQWMsSUFBSSxDQUFDO1FBRWYsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixpQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBbUNuQyxjQUFjO1FBQ04sYUFBTyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLGFBQU8sR0FBVyxDQUFDLENBQUMsQ0FBQzs7UUFNN0IsUUFBUTtRQUNSLDhCQUE4QjtRQUM5Qix5RUFBeUU7UUFDekUsSUFBSTtJQUNSLENBQUM7SUE3Q1UsOEJBQU8sR0FBZCxVQUFlLE1BQWMsRUFBRSxVQUFrQixFQUFFLFFBQWtCO1FBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzlCLENBQUM7SUFFTSwrQkFBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFTyw4QkFBTyxHQUFmO1FBQ0ksaUhBQWlIO1FBQ2pILDJDQUEyQztRQUMzQyxNQUFNO1FBRU4sNEhBQTRIO1FBQzVILG1DQUFtQztRQUNuQyxNQUFNO0lBQ1YsQ0FBQztJQUVNLGtDQUFXLEdBQWxCO1FBQ0ksK0ZBQStGO1FBQy9GLGdCQUFnQjtRQUNoQixJQUFJLFFBQVEsR0FBYyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzdGLGtCQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsZ0JBQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVNLGdDQUFTLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUtNLG1DQUFZLEdBQW5CLFVBQW9CLE1BQWMsRUFBRSxNQUFjO1FBQzlDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDekMsQ0FBQztJQTdDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzhDQUNHO0lBRk4sWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQXFEaEM7SUFBRCxtQkFBQztDQXJERCxBQXFEQyxDQXJEeUMsRUFBRSxDQUFDLFNBQVMsR0FxRHJEO2tCQXJEb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudE1nciBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL0V2ZW50TWdyXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi8uLi8uLi9EYXRhL0NvbnN0L0V2ZW50XCI7XG5pbXBvcnQgRXhjaGFuZ2UgZnJvbSBcIi4uL0V4Y2hhbmdlXCI7XG5pbXBvcnQgeyBJU2xvdERhdGEgfSBmcm9tIFwiLi4vLi4vLi4vLi4vSG90ZWwvSG90ZWxEYXRhXCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuLi8uLi8uLi8uLi9Db21tb24vQ29tbW9uXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWlsZGluZ0xvY2sgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaWNvbjogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2ljb25JZDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9idWlsZGluZ0lkOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX2V4Y2hhbmdlOiBFeGNoYW5nZSA9IG51bGw7XG5cbiAgICBwdWJsaWMgc2V0RGF0YShpY29uSWQ6IG51bWJlciwgYnVpbGRpbmdJZDogbnVtYmVyLCBleGNoYW5nZTogRXhjaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5faWNvbklkID0gaWNvbklkO1xuICAgICAgICB0aGlzLl9idWlsZGluZ0lkID0gYnVpbGRpbmdJZDtcbiAgICAgICAgdGhpcy5fZXhjaGFuZ2UgPSBleGNoYW5nZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25FbmFibGUoKSB7XG4gICAgICAgIHRoaXMuc2V0SWNvbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0SWNvbigpIHtcbiAgICAgICAgLy8gY2MubG9hZGVyLmxvYWRSZXMoXCJ0ZXh0dXJlL21hcC91aS9pY29uL2J1aWxkaW5nX2ljb25fXCIgKyB0aGlzLl9pY29uSWQsIGNjLlNwcml0ZUZyYW1lLCAoZXJyLCBzcHJpdGVGcmFtZSkgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy5pY29uLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8vIGNjLmxvYWRlci5sb2FkUmVzKFwidGV4dHVyZS9ob3RlbC9zbG90SWNvbi9zbG90X2ljb25fMVwiICAvKnRoaXMuX2ljb25JZCovLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgcmVzOiBjYy5TcHJpdGVGcmFtZSkgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy5pY29uLnNwcml0ZUZyYW1lID0gcmVzO1xuICAgICAgICAvLyB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25JY29uQ2xpY2soKSB7XG4gICAgICAgIC8vIEV2ZW50TWdyLmlucy5zZW5kKEV2ZW50Lk1hcC5TaG93VG9vbCwgdGhpcy5fYnVpbGRpbmdJZCwgdGhpcy5ub2RlLnBvc2l0aW9uLCB0aGlzLl9leGNoYW5nZSk7XG4gICAgICAgIC8v6Kej6ZSB5pe26buY6K6k5a2QaWTkuLrnrKzkuIDlpZchIVxuICAgICAgICBsZXQgc2xvdERhdGE6IElTbG90RGF0YSA9IHsgcm9vbUlkOiB0aGlzLl9yb29tSWQsIHNsb3RJZDogdGhpcy5fc2xvdElkLCBzdWJJZDogMSwgc3RhdGU6IDAgfTtcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuSG90ZWwuVUlSb29tVW5sb2NrLCBzbG90RGF0YSwgQ29tbW9uLmdldFdvcmxkUG9zKHRoaXMubm9kZSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2V4Y2hhbmdlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYnVpbGRpbmdJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2ljb25JZCA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqICAg5paw5rW35bKb6YWS5bqXICovXG4gICAgcHJpdmF0ZSBfcm9vbUlkOiBudW1iZXIgPSAtMTtcbiAgICBwcml2YXRlIF9zbG90SWQ6IG51bWJlciA9IC0xO1xuICAgIHB1YmxpYyBzZXRIb3RlbERhdGEocm9vbUlkOiBudW1iZXIsIHNsb3RJZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3Jvb21JZCA9IHJvb21JZDtcbiAgICAgICAgdGhpcy5fc2xvdElkID0gdGhpcy5faWNvbklkID0gc2xvdElkO1xuICAgIH1cblxuICAgIC8v6L+U5Zue5LiW55WM5Z2Q5qCHXG4gICAgLy8gcHVibGljIGdldFdvcmxkUG9zaXRpb24oKSB7XG4gICAgLy8gICAgIHJldHVybiB0aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0aGlzLm5vZGUucG9zaXRpb24pO1xuICAgIC8vIH1cbn0iXX0=