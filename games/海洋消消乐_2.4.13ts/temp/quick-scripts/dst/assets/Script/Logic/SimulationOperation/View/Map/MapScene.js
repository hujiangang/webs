
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/SimulationOperation/View/Map/MapScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c18edLWRGhAKInihPZoc02V', 'MapScene');
// Script/Logic/SimulationOperation/View/Map/MapScene.ts

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
var UIMgr_1 = require("../../../../Base/Manager/UIMgr");
var UIData_1 = require("../../../Data/Interface/UIData");
var EventMgr_1 = require("../../../../Base/Manager/EventMgr");
var Event_1 = require("../../../Data/Const/Event");
var TrafficSystem_1 = require("./TrafficSystem/TrafficSystem");
var M_1 = require("../../../../Base/Manager/M");
var MapIslandUtils_1 = require("./MapIslandUtils");
var Exchange_1 = require("./Exchange");
var Util_1 = require("../../../../Base/Utils/Util");
var GuideUtils_1 = require("../../../../../GodGuide/GuideUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MapScene = /** @class */ (function (_super) {
    __extends(MapScene, _super);
    function MapScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mapCamera = null;
        _this.buildingCamera = null;
        _this.trafficSystem = null;
        _this.mapNode = null;
        _this.mapBg = null;
        return _this;
    }
    // buildingSpMap: Map<cc.Node, cc.Sprite> = new Map<cc.Node, cc.Sprite>();
    MapScene.prototype.onLoad = function () {
        // M.init();
        M_1.default.changeScene();
    };
    MapScene.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_END);
        gsap.TweenLite.killTweensOf(this.mapNode);
        MapIslandUtils_1.default.mapLoadFinished = false;
    };
    MapScene.prototype.start = function () {
        // this.mapCamera.zoomRatio = 0.75;
        var _this = this;
        var windowSize = cc.view.getVisibleSize();
        var minRatio = windowSize.height / this.mapBg.height;
        gsap.TweenLite.to(this.mapNode, 1.5, {
            scale: minRatio,
            onComplete: function () {
                UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.MenuPanel);
                // this.test();
                MapIslandUtils_1.default.mapLoadFinished = true;
                MapIslandUtils_1.default.MapScale = minRatio;
                EventMgr_1.default.ins.send(Event_1.Event.Map.MapTouchMoveEnable, true);
                GuideUtils_1.GuideUtils.stopGuide = true;
                _this.moveToLastBuild(function () {
                    GuideUtils_1.GuideUtils.stopGuide = false;
                    GuideUtils_1.GuideUtils.pushGuide("_Guide_level3_1", true);
                });
            }
        });
        // this.mapCamera.zoomRatio = 1;
        // EventMgr.ins.send(Event.Map.MapTouchMoveEnable, true);
    };
    /** 进入的时候定位到最小一个id开放了但是未修理或者未二选一 */
    MapScene.prototype.moveToLastBuild = function (moveEndNext) {
        var buildId = 0;
        if (!MapIslandUtils_1.default.checkBuildFinished(15)) { //如果引导没有完成 先定位到引导
            buildId = 15;
        }
        else if (!MapIslandUtils_1.default.checkBuildFinished(16)) {
            buildId = 16;
        }
        else {
            buildId = MapIslandUtils_1.default.getSmallOpenBuildingId();
        }
        MapIslandUtils_1.default.mapMoveTo(buildId, moveEndNext);
    };
    MapScene.prototype.onEnable = function () {
        // console.error("MapScene onEnable");
    };
    MapScene.prototype.onDisable = function () {
        UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.MenuPanel);
    };
    MapScene.prototype.test = function () {
        var exchanges = this.node.getComponentsInChildren(Exchange_1.default);
        var buidlingPosition = {};
        exchanges.forEach(function (exchange) {
            if (exchange.enabled) {
                var key = exchange.buildingId;
                var lock = Util_1.Util.Tool.getChildByName(exchange.node, "Lock");
                if (lock) {
                    console.error(key, lock.position);
                    buidlingPosition[key] = lock.position;
                }
            }
        });
        console.error(JSON.stringify(buidlingPosition));
    };
    __decorate([
        property(cc.Camera)
    ], MapScene.prototype, "mapCamera", void 0);
    __decorate([
        property(cc.Camera)
    ], MapScene.prototype, "buildingCamera", void 0);
    __decorate([
        property(TrafficSystem_1.default)
    ], MapScene.prototype, "trafficSystem", void 0);
    __decorate([
        property(cc.Node)
    ], MapScene.prototype, "mapNode", void 0);
    __decorate([
        property(cc.Node)
    ], MapScene.prototype, "mapBg", void 0);
    MapScene = __decorate([
        ccclass
    ], MapScene);
    return MapScene;
}(cc.Component));
exports.default = MapScene;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcU2ltdWxhdGlvbk9wZXJhdGlvblxcVmlld1xcTWFwXFxNYXBTY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBbUQ7QUFDbkQseURBQTBEO0FBQzFELDhEQUF5RDtBQUN6RCxtREFBa0Q7QUFDbEQsK0RBQTBEO0FBQzFELGdEQUEyQztBQUUzQyxtREFBOEM7QUFDOUMsdUNBQWtDO0FBQ2xDLG9EQUFtRDtBQUNuRCxpRUFBZ0U7QUFHMUQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUEwRkM7UUF4RkcsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixvQkFBYyxHQUFjLElBQUksQ0FBQztRQUdqQyxtQkFBYSxHQUFrQixJQUFJLENBQUM7UUFHcEMsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixXQUFLLEdBQVksSUFBSSxDQUFDOztJQTRFMUIsQ0FBQztJQTFFRywwRUFBMEU7SUFDMUUseUJBQU0sR0FBTjtRQUNJLFlBQVk7UUFDWixXQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELDRCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsd0JBQWMsQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQzNDLENBQUM7SUFFRCx3QkFBSyxHQUFMO1FBQ0ksbUNBQW1DO1FBRHZDLGlCQXVCQztRQXBCRyxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFD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QyxNQUFNLENBQUM7b0RBQ2E7SUFHakM7UUFEQyxRQUFRLENBQUMsdUJBQWEsQ0FBQzttREFDWTtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZDQUNNO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ0k7SUFkTCxRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBMEY1QjtJQUFELGVBQUM7Q0ExRkQsQUEwRkMsQ0ExRnFDLEVBQUUsQ0FBQyxTQUFTLEdBMEZqRDtrQkExRm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlNZ3IgZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9VSU1nclwiO1xuaW1wb3J0IHsgVUlIdWREZWYgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9JbnRlcmZhY2UvVUlEYXRhXCI7XG5pbXBvcnQgRXZlbnRNZ3IgZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9FdmVudE1nclwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IFRyYWZmaWNTeXN0ZW0gZnJvbSBcIi4vVHJhZmZpY1N5c3RlbS9UcmFmZmljU3lzdGVtXCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCBMZXZlbCBmcm9tIFwiLi4vLi4vLi4vRGF0YS9JbnRlcmZhY2UvTGV2ZWxcIjtcbmltcG9ydCBNYXBJc2xhbmRVdGlscyBmcm9tIFwiLi9NYXBJc2xhbmRVdGlsc1wiO1xuaW1wb3J0IEV4Y2hhbmdlIGZyb20gXCIuL0V4Y2hhbmdlXCI7XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvVXRpbHMvVXRpbFwiO1xuaW1wb3J0IHsgR3VpZGVVdGlscyB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9Hb2RHdWlkZS9HdWlkZVV0aWxzXCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcFNjZW5lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBAcHJvcGVydHkoY2MuQ2FtZXJhKVxuICAgIG1hcENhbWVyYTogY2MuQ2FtZXJhID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5DYW1lcmEpXG4gICAgYnVpbGRpbmdDYW1lcmE6IGNjLkNhbWVyYSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoVHJhZmZpY1N5c3RlbSlcbiAgICB0cmFmZmljU3lzdGVtOiBUcmFmZmljU3lzdGVtID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG1hcE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbWFwQmc6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgLy8gYnVpbGRpbmdTcE1hcDogTWFwPGNjLk5vZGUsIGNjLlNwcml0ZT4gPSBuZXcgTWFwPGNjLk5vZGUsIGNjLlNwcml0ZT4oKTtcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIC8vIE0uaW5pdCgpO1xuICAgICAgICBNLmNoYW5nZVNjZW5lKCk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCk7XG4gICAgICAgIGdzYXAuVHdlZW5MaXRlLmtpbGxUd2VlbnNPZih0aGlzLm1hcE5vZGUpO1xuICAgICAgICBNYXBJc2xhbmRVdGlscy5tYXBMb2FkRmluaXNoZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgLy8gdGhpcy5tYXBDYW1lcmEuem9vbVJhdGlvID0gMC43NTtcblxuICAgICAgICBsZXQgd2luZG93U2l6ZSA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKTtcbiAgICAgICAgbGV0IG1pblJhdGlvID0gd2luZG93U2l6ZS5oZWlnaHQgLyB0aGlzLm1hcEJnLmhlaWdodDtcblxuICAgICAgICBnc2FwLlR3ZWVuTGl0ZS50byh0aGlzLm1hcE5vZGUsIDEuNSwge1xuICAgICAgICAgICAgc2NhbGU6IG1pblJhdGlvLCBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgVUlNZ3IuaW5zLnNob3dVSShVSUh1ZERlZi5NZW51UGFuZWwpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMudGVzdCgpO1xuICAgICAgICAgICAgICAgIE1hcElzbGFuZFV0aWxzLm1hcExvYWRGaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgTWFwSXNsYW5kVXRpbHMuTWFwU2NhbGUgPSBtaW5SYXRpbztcbiAgICAgICAgICAgICAgICBFdmVudE1nci5pbnMuc2VuZChFdmVudC5NYXAuTWFwVG91Y2hNb3ZlRW5hYmxlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBHdWlkZVV0aWxzLnN0b3BHdWlkZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9MYXN0QnVpbGQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBHdWlkZVV0aWxzLnN0b3BHdWlkZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBHdWlkZVV0aWxzLnB1c2hHdWlkZShcIl9HdWlkZV9sZXZlbDNfMVwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdGhpcy5tYXBDYW1lcmEuem9vbVJhdGlvID0gMTtcbiAgICAgICAgLy8gRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuTWFwLk1hcFRvdWNoTW92ZUVuYWJsZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqIOi/m+WFpeeahOaXtuWAmeWumuS9jeWIsOacgOWwj+S4gOS4qmlk5byA5pS+5LqG5L2G5piv5pyq5L+u55CG5oiW6ICF5pyq5LqM6YCJ5LiAICovXG4gICAgcHVibGljIG1vdmVUb0xhc3RCdWlsZChtb3ZlRW5kTmV4dCkge1xuICAgICAgICB2YXIgYnVpbGRJZCA9IDA7XG4gICAgICAgIGlmICghTWFwSXNsYW5kVXRpbHMuY2hlY2tCdWlsZEZpbmlzaGVkKDE1KSkgeyAgIC8v5aaC5p6c5byV5a+85rKh5pyJ5a6M5oiQIOWFiOWumuS9jeWIsOW8leWvvFxuICAgICAgICAgICAgYnVpbGRJZCA9IDE1O1xuICAgICAgICB9IGVsc2UgaWYgKCFNYXBJc2xhbmRVdGlscy5jaGVja0J1aWxkRmluaXNoZWQoMTYpKSB7XG4gICAgICAgICAgICBidWlsZElkID0gMTY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBidWlsZElkID0gTWFwSXNsYW5kVXRpbHMuZ2V0U21hbGxPcGVuQnVpbGRpbmdJZCgpO1xuICAgICAgICB9XG4gICAgICAgIE1hcElzbGFuZFV0aWxzLm1hcE1vdmVUbyhidWlsZElkLCBtb3ZlRW5kTmV4dCk7XG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJNYXBTY2VuZSBvbkVuYWJsZVwiKTtcbiAgICB9XG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIFVJTWdyLmlucy5jbG9zZVVJKFVJSHVkRGVmLk1lbnVQYW5lbCk7XG4gICAgfVxuXG4gICAgcHVibGljIHRlc3QoKSB7XG4gICAgICAgIGxldCBleGNoYW5nZXMgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4oRXhjaGFuZ2UpO1xuICAgICAgICB2YXIgYnVpZGxpbmdQb3NpdGlvbiA9IHt9O1xuICAgICAgICBleGNoYW5nZXMuZm9yRWFjaCgoZXhjaGFuZ2U6IEV4Y2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXhjaGFuZ2UuZW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBleGNoYW5nZS5idWlsZGluZ0lkO1xuICAgICAgICAgICAgICAgIGxldCBsb2NrID0gVXRpbC5Ub29sLmdldENoaWxkQnlOYW1lKGV4Y2hhbmdlLm5vZGUsIFwiTG9ja1wiKTtcbiAgICAgICAgICAgICAgICBpZiAobG9jaykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGtleSwgbG9jay5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGJ1aWRsaW5nUG9zaXRpb25ba2V5XSA9IGxvY2sucG9zaXRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zb2xlLmVycm9yKEpTT04uc3RyaW5naWZ5KGJ1aWRsaW5nUG9zaXRpb24pKTtcbiAgICB9XG59XG4iXX0=