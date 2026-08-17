"use strict";
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