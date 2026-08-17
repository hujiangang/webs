
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/SimulationOperation/View/Map/ShowBuildTool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '93a8eCmwwhEL6A0bQ/SszKC', 'ShowBuildTool');
// Script/Logic/SimulationOperation/View/Map/ShowBuildTool.ts

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
var EventMgr_1 = require("../../../../Base/Manager/EventMgr");
var Event_1 = require("../../../Data/Const/Event");
var Exchange_1 = require("./Exchange");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShowBuildTool = /** @class */ (function (_super) {
    __extends(ShowBuildTool, _super);
    function ShowBuildTool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lockNode = null;
        return _this;
    }
    ShowBuildTool.prototype.onLoad = function () {
        this.mapCamera = cc.Camera.findCamera(this.node);
        var collider = this.node.getComponent(cc.PolygonCollider);
        if (collider)
            this.points = collider.points;
        this.rect = this.node.getBoundingBoxToWorld();
        this.node.on(cc.Node.EventType.TOUCH_END, this.checkClick, this);
        EventMgr_1.default.ins.register(Event_1.Event.Map.UnLock, this.hideLock, this);
        EventMgr_1.default.ins.register(Event_1.Event.Map.ShowLock, this.showLock, this);
    };
    ShowBuildTool.prototype.start = function () {
        this.exchange = this.node.parent.parent.getComponent(Exchange_1.default);
        this.showLock();
    };
    ShowBuildTool.prototype.onDestroy = function () {
        EventMgr_1.default.ins.unRegister(Event_1.Event.Map.UnLock, this.hideLock, this);
        EventMgr_1.default.ins.unRegister(Event_1.Event.Map.ShowLock, this.showLock, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.checkClick, this);
    };
    ShowBuildTool.prototype.showLock = function () {
        if (this.exchange.lockState == 0 && this.lockNode) {
            this.lockNode.active = true;
            this.lockNode.on(cc.Node.EventType.TOUCH_END, this.unlockClick, this);
            this.lockPos = this.lockNode.convertToWorldSpaceAR(cc.v2(0, 60));
            EventMgr_1.default.ins.unRegister(Event_1.Event.Map.ShowLock, this.showLock, this);
        }
    };
    ShowBuildTool.prototype.hideLock = function () {
        if (this.exchange.lockState == 1 && this.lockNode) {
            this.lockNode.off(cc.Node.EventType.TOUCH_END, this.unlockClick, this);
            this.lockNode.removeFromParent();
            this.lockNode.destroy();
        }
    };
    ShowBuildTool.prototype.getRectInMapCamera = function () {
        var rect = this.rect;
        var mapCamera = this.mapCamera;
        var curZoomRatio = mapCamera.zoomRatio;
        var nodeInCameraPos = mapCamera.getWorldToScreenPoint(rect.origin, cc.Vec2.ZERO);
        return cc.rect(nodeInCameraPos.x, nodeInCameraPos.y, rect.width * curZoomRatio, rect.height * curZoomRatio);
    };
    ShowBuildTool.prototype.checkClick = function (event) {
        var rect = this.getRectInMapCamera();
        var location = event.getLocation();
        if (event.getStartLocation().sub(location).mag() < 1 && rect.contains(location)) {
            var touchPointInNode = location.sub(rect.center).mul(1 / this.mapCamera.zoomRatio);
            if (cc.Intersection.pointInPolygon(touchPointInNode, this.points)) {
                this.node._touchListener.setSwallowTouches(true);
                EventMgr_1.default.ins.send(Event_1.Event.Map.ShowTool, location, this.node.parent);
            }
            else {
                this.node._touchListener.setSwallowTouches(false);
            }
        }
    };
    ShowBuildTool.prototype.unlockClick = function (event) {
        if (event.getStartLocation().sub(event.getLocation()).mag() < 1) {
            var position = this.mapCamera.getWorldToScreenPoint(this.lockPos);
            EventMgr_1.default.ins.send(Event_1.Event.Map.ShowTool, position, this.node.parent);
        }
    };
    __decorate([
        property(cc.Node)
    ], ShowBuildTool.prototype, "lockNode", void 0);
    ShowBuildTool = __decorate([
        ccclass
    ], ShowBuildTool);
    return ShowBuildTool;
}(cc.Component));
exports.default = ShowBuildTool;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcU2ltdWxhdGlvbk9wZXJhdGlvblxcVmlld1xcTWFwXFxTaG93QnVpbGRUb29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhEQUF5RDtBQUN6RCxtREFBa0Q7QUFDbEQsdUNBQWtDO0FBRTVCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBdUZDO1FBckZHLGNBQVEsR0FBWSxJQUFJLENBQUM7O0lBcUY3QixDQUFDO0lBekVHLDhCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVqRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDMUQsSUFBSSxRQUFRO1lBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBRTVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRTlDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBR2pFLGtCQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdELGtCQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsR0FB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QUUsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckU7SUFDTCxDQUFDO0lBcEZEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ087SUFGUixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBdUZqQztJQUFELG9CQUFDO0NBdkZELEFBdUZDLENBdkYwQyxFQUFFLENBQUMsU0FBUyxHQXVGdEQ7a0JBdkZvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL01hbmFnZXIvRXZlbnRNZ3JcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCBFeGNoYW5nZSBmcm9tIFwiLi9FeGNoYW5nZVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvd0J1aWxkVG9vbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbG9ja05vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBtYXBDYW1lcmE6IGNjLkNhbWVyYTtcblxuICAgIHB1YmxpYyBwb2ludHM6IGNjLlZlYzJbXTtcblxuICAgIHByaXZhdGUgcmVjdDogY2MuUmVjdDtcblxuICAgIHByaXZhdGUgbG9ja1BvczogY2MuVmVjMjtcblxuICAgIHByaXZhdGUgZXhjaGFuZ2U6IEV4Y2hhbmdlO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLm1hcENhbWVyYSA9IGNjLkNhbWVyYS5maW5kQ2FtZXJhKHRoaXMubm9kZSk7XG5cbiAgICAgICAgbGV0IGNvbGxpZGVyID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5Qb2x5Z29uQ29sbGlkZXIpO1xuICAgICAgICBpZiAoY29sbGlkZXIpIHRoaXMucG9pbnRzID0gY29sbGlkZXIucG9pbnRzO1xuXG4gICAgICAgIHRoaXMucmVjdCA9IHRoaXMubm9kZS5nZXRCb3VuZGluZ0JveFRvV29ybGQoKTtcblxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLmNoZWNrQ2xpY2ssIHRoaXMpO1xuXG5cbiAgICAgICAgRXZlbnRNZ3IuaW5zLnJlZ2lzdGVyKEV2ZW50Lk1hcC5VbkxvY2ssIHRoaXMuaGlkZUxvY2ssIHRoaXMpO1xuICAgICAgICBFdmVudE1nci5pbnMucmVnaXN0ZXIoRXZlbnQuTWFwLlNob3dMb2NrLCB0aGlzLnNob3dMb2NrLCB0aGlzKTtcblxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmV4Y2hhbmdlID0gdGhpcy5ub2RlLnBhcmVudC5wYXJlbnQuZ2V0Q29tcG9uZW50KEV4Y2hhbmdlKTtcbiAgICAgICAgdGhpcy5zaG93TG9jaygpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnVuUmVnaXN0ZXIoRXZlbnQuTWFwLlVuTG9jaywgdGhpcy5oaWRlTG9jaywgdGhpcyk7XG4gICAgICAgIEV2ZW50TWdyLmlucy51blJlZ2lzdGVyKEV2ZW50Lk1hcC5TaG93TG9jaywgdGhpcy5zaG93TG9jaywgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLmNoZWNrQ2xpY2ssIHRoaXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0xvY2soKSB7XG4gICAgICAgIGlmICh0aGlzLmV4Y2hhbmdlLmxvY2tTdGF0ZSA9PSAwICYmIHRoaXMubG9ja05vZGUpIHtcbiAgICAgICAgICAgIHRoaXMubG9ja05vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubG9ja05vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnVubG9ja0NsaWNrLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMubG9ja1BvcyA9IHRoaXMubG9ja05vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKDAsIDYwKSkgYXMgY2MuVmVjMjtcblxuICAgICAgICAgICAgRXZlbnRNZ3IuaW5zLnVuUmVnaXN0ZXIoRXZlbnQuTWFwLlNob3dMb2NrLCB0aGlzLnNob3dMb2NrLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGlkZUxvY2soKSB7XG4gICAgICAgIGlmICh0aGlzLmV4Y2hhbmdlLmxvY2tTdGF0ZSA9PSAxICYmIHRoaXMubG9ja05vZGUpIHtcbiAgICAgICAgICAgIHRoaXMubG9ja05vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy51bmxvY2tDbGljaywgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLmxvY2tOb2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcbiAgICAgICAgICAgIHRoaXMubG9ja05vZGUuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSZWN0SW5NYXBDYW1lcmEoKSB7XG4gICAgICAgIGxldCByZWN0ID0gdGhpcy5yZWN0O1xuICAgICAgICBsZXQgbWFwQ2FtZXJhID0gdGhpcy5tYXBDYW1lcmE7XG4gICAgICAgIGxldCBjdXJab29tUmF0aW8gPSBtYXBDYW1lcmEuem9vbVJhdGlvO1xuICAgICAgICBsZXQgbm9kZUluQ2FtZXJhUG9zID0gbWFwQ2FtZXJhLmdldFdvcmxkVG9TY3JlZW5Qb2ludChyZWN0Lm9yaWdpbiwgY2MuVmVjMi5aRVJPKTtcbiAgICAgICAgcmV0dXJuIGNjLnJlY3Qobm9kZUluQ2FtZXJhUG9zLngsIG5vZGVJbkNhbWVyYVBvcy55LCByZWN0LndpZHRoICogY3VyWm9vbVJhdGlvLCByZWN0LmhlaWdodCAqIGN1clpvb21SYXRpbyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0NsaWNrKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XG4gICAgICAgIGxldCByZWN0ID0gdGhpcy5nZXRSZWN0SW5NYXBDYW1lcmEoKTtcbiAgICAgICAgbGV0IGxvY2F0aW9uID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgaWYgKGV2ZW50LmdldFN0YXJ0TG9jYXRpb24oKS5zdWIobG9jYXRpb24pLm1hZygpIDwgMSAmJiByZWN0LmNvbnRhaW5zKGxvY2F0aW9uKSkge1xuICAgICAgICAgICAgbGV0IHRvdWNoUG9pbnRJbk5vZGUgPSBsb2NhdGlvbi5zdWIocmVjdC5jZW50ZXIpLm11bCgxIC8gdGhpcy5tYXBDYW1lcmEuem9vbVJhdGlvKTtcbiAgICAgICAgICAgIGlmIChjYy5JbnRlcnNlY3Rpb24ucG9pbnRJblBvbHlnb24odG91Y2hQb2ludEluTm9kZSwgdGhpcy5wb2ludHMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKHRydWUpO1xuICAgICAgICAgICAgICAgIEV2ZW50TWdyLmlucy5zZW5kKEV2ZW50Lk1hcC5TaG93VG9vbCwgbG9jYXRpb24sIHRoaXMubm9kZS5wYXJlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1bmxvY2tDbGljayhldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xuICAgICAgICBpZiAoZXZlbnQuZ2V0U3RhcnRMb2NhdGlvbigpLnN1YihldmVudC5nZXRMb2NhdGlvbigpKS5tYWcoKSA8IDEpIHtcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IHRoaXMubWFwQ2FtZXJhLmdldFdvcmxkVG9TY3JlZW5Qb2ludCh0aGlzLmxvY2tQb3MpO1xuICAgICAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuTWFwLlNob3dUb29sLCBwb3NpdGlvbiwgdGhpcy5ub2RlLnBhcmVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=