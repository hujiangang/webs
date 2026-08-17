"use strict";
cc._RF.push(module, '3ea9b5rViJEM5u1W8eVK6QS', 'MapCamera');
// Script/Logic/SimulationOperation/View/Map/MapCamera.ts

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
var MapIslandUtils_1 = require("./MapIslandUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MapCamera = /** @class */ (function (_super) {
    __extends(MapCamera, _super);
    function MapCamera() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.camera = null;
        _this.mapBg = null;
        _this.wall = null;
        _this.oldDistance = null;
        _this.backgroundRect = null;
        _this.backgroundPoint = cc.Vec2.ZERO;
        _this.moveSpeed = 800 * 2;
        _this.zoomRatioMax = 1.8;
        _this.zoomRatioMin = 0.35;
        _this.cameraRect = null;
        _this.isTouchMoving = false;
        _this.canTouchMove = false;
        _this.lastPos = null;
        _this.lastTime = 0;
        _this.dtime = 0;
        _this.lastCameraPos = null;
        _this._canMoveY = false; //是否可以移动Y轴
        return _this;
    }
    MapCamera.prototype.onLoad = function () {
        var _this = this;
        this.cameraRect = cc.rect(0, 0, cc.winSize.width, cc.winSize.height);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchControlCamera, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.camera.node.on(cc.Node.EventType.POSITION_CHANGED, this.updateMapVisible, this);
        // this.node.on(cc.Node.EventType.MOUSE_WHEEL, (event) => {
        //     this.cameraZoom(event._scrollY);
        // });
        this.initEvent();
        this.mapBg.children.forEach(function (node) {
            _this.loadMapBg(1, node);
        }, this);
        MapIslandUtils_1.default.mapCamera = this.camera;
    };
    MapCamera.prototype.start = function () {
        var mapRect = this.mapBg.getBoundingBoxToWorld();
        var scale = MapIslandUtils_1.default.MapScale;
        var rect = this.backgroundRect = new cc.Rect(mapRect.x, mapRect.y, mapRect.width * scale, mapRect.height * scale); // this.mapBg.getBoundingBoxToWorld();
        this.backgroundPoint = cc.v2(rect.x, rect.y);
    };
    MapCamera.prototype.onEnable = function () {
        // if(CC_EDITOR){
        // this.mapBg.children.forEach((node: cc.Node) => {
        //     this.loadMapBg(1, node);
        // }, this);
        // }
    };
    MapCamera.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchControlCamera, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.removeEvent();
        this.camera.node && this.camera.node.off(cc.Node.EventType.POSITION_CHANGED, this.updateMapVisible, this);
    };
    MapCamera.prototype.initEvent = function () {
        EventMgr_1.default.ins.register(Event_1.Event.Map.CameraMoveTo, this.moveCameraTo, this);
        EventMgr_1.default.ins.register(Event_1.Event.Map.MapTouchMoveEnable, this.setTouchEnable, this);
    };
    MapCamera.prototype.removeEvent = function () {
        EventMgr_1.default.ins.unRegister(Event_1.Event.Map.CameraMoveTo, this.moveCameraTo, this);
        EventMgr_1.default.ins.unRegister(Event_1.Event.Map.MapTouchMoveEnable, this.setTouchEnable, this);
    };
    MapCamera.prototype.setTouchEnable = function (enable) {
        this.canTouchMove = enable;
    };
    MapCamera.prototype.moveCameraTo = function (event, movedNext) {
        var _this = this;
        this.canTouchMove = false;
        this.isTouchMoving = false;
        this.camera.node.stopAllActions();
        var position = cc.v2();
        if (event instanceof cc.Vec2) {
            var mapScale = MapIslandUtils_1.default.MapScale;
            event.scale(cc.v2(mapScale, mapScale), position);
            if (!this._canMoveY)
                position.y = 0;
        }
        else if (event instanceof cc.Node) {
            position = event.convertToWorldSpaceAR(cc.Vec2.ZERO);
        }
        var delta = this.camera.node.position.sub(position);
        var endPosition = cc.v2();
        if (this.checkCameraCanMove(delta)) {
            endPosition = position.clone();
        }
        else {
            // let detal1 = this.camera.node.position.sub(delta);
            // cc.warn("摄像机不能移出地图", delta, detal1);
            endPosition = delta.clone();
        }
        // console.error("Moveto ", endPosition);
        var move = cc.moveTo(endPosition.mag() / this.moveSpeed, endPosition);
        var moveEndNext = cc.callFunc(function () {
            _this.canTouchMove = true;
            // console.error("camera move end", this.camera.node.position);
            movedNext && movedNext();
        }, this);
        var seq1 = cc.sequence([move, moveEndNext]);
        this.camera.node.runAction(seq1);
    };
    MapCamera.prototype.onTouchBegin = function (event) {
        if (!this.canTouchMove) {
            event.stopPropagationImmediate();
            return;
        }
        this.camera.node.stopAllActions();
    };
    MapCamera.prototype.onTouchEnd = function (event) {
        var _this = this;
        if (!this.canTouchMove) {
            return;
        }
        var touches = event.getTouches();
        if (this.isTouchMoving && touches.length == 1) {
            var curZoomRatio = this.camera.zoomRatio;
            var distance = event.getStartLocation().sub(event.getPreviousLocation());
            var delta = distance.mul(0.3).mul(1 / curZoomRatio);
            if (!this._canMoveY)
                delta.y = 0;
            var speed = this.lastPos.sub(this.camera.node.position).mag() / this.dtime;
            if (speed > 2 && delta.mag() > 100 && this.checkCameraCanMove(delta.mul(-1))) {
                this.camera.node.runAction(cc.sequence(cc.moveBy(delta.mag() / (speed * 100), delta).easing(cc.easeQuadraticActionOut()), cc.callFunc(function () {
                    _this.isTouchMoving = false;
                }, this)));
            }
            else {
                this.isTouchMoving = false;
            }
        }
    };
    MapCamera.prototype.touchControlCamera = function (event) {
        if (!this.canTouchMove)
            return;
        var curZoomRatio = 1; //MapIslandUtils.MapScale;//this.camera.zoomRatio;
        var touches = event.getTouches();
        if (touches.length == 1) {
            var delta = event.getDelta().mul(1 / curZoomRatio);
            if (this.checkCameraCanMove(delta, true)) {
                if (!this._canMoveY)
                    delta.y = 0;
                this.isTouchMoving = true;
                this.lastPos = this.camera.node.position;
                var now = cc.sys.now();
                this.dtime = now - this.lastTime;
                this.lastTime = now;
                this.camera.node.position = this.camera.node.position.subSelf(delta);
            }
        }
        else if (touches.length == 2) { //禁止可以缩放
            return;
            // cc.log('sfdgg------', touches)
            var touchPoint1 = touches[0].getLocation();
            var touchPoint2 = touches[1].getLocation();
            var distance = Math.sqrt(Math.pow(touchPoint1.x - touchPoint2.x, 2) + Math.pow(touchPoint1.y - touchPoint2.y, 2));
            var dis = distance - this.oldDistance;
            dis != 0 && this.cameraZoom(dis);
            this.oldDistance = distance;
        }
    };
    MapCamera.prototype.checkCameraCanMove = function (delta, touch) {
        if (touch === void 0) { touch = false; }
        var cameraPosition = this.camera.node.position;
        var mapScale = MapIslandUtils_1.default.MapScale;
        // console.error(cameraPosition.x - this.camera.node.width / 2 - delta.x);
        if (cameraPosition.x - this.camera.node.width / 2 - delta.x <= -this.mapBg.width * mapScale / 2) {
            delta.x = -this.mapBg.width * mapScale / 2 + this.camera.node.width / 2;
            return false;
        }
        // console.error(cameraPosition.x + this.camera.node.width / 2 - delta.x);
        if (cameraPosition.x + this.camera.node.width / 2 - delta.x >= this.mapBg.width * mapScale / 2) {
            delta.x = this.mapBg.width * mapScale / 2 - this.camera.node.width / 2;
            return false;
        }
        // console.error(cameraPosition, this.mapBg.width * mapScale);
        return true;
        var _a = this.getBoundaryDistance(), left = _a[0], right = _a[1], bottom = _a[2], top = _a[3];
        var xCanMove = true;
        var yCanMove = this._canMoveY;
        if (left <= 0 && delta.x < 0 || right <= 0 && delta.x > 0)
            xCanMove = false;
        if (bottom <= 0 && delta.y < 0 || top <= 0 && delta.y > 0)
            yCanMove = false;
        if (xCanMove) {
            var moveX = Math.abs(delta.x);
            if (delta.x > 0) {
                if (left < moveX) {
                    if (touch) {
                        delta.x = left;
                    }
                    else {
                        return false;
                    }
                }
            }
            else if (delta.x < 0) {
                if (right < moveX) {
                    if (touch) {
                        delta.x = -right;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
        if (yCanMove) {
            var moveY = Math.abs(delta.y);
            if (delta.y > 0) {
                if (bottom < moveY) {
                    if (touch) {
                        delta.y = bottom;
                    }
                    else {
                        return false;
                    }
                }
            }
            else if (delta.y < 0) {
                if (top < moveY) {
                    if (touch) {
                        delta.y = -top;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
        return xCanMove || yCanMove;
    };
    MapCamera.prototype.getBoundaryDistance = function () {
        var curZoomRatio = MapIslandUtils_1.default.MapScale;
        var width = this.backgroundRect.width * curZoomRatio;
        var height = this.backgroundRect.height * curZoomRatio;
        var point = this.camera.getWorldToScreenPoint(this.backgroundPoint, cc.Vec2.ZERO);
        return [-point.x, point.x + width - cc.winSize.width, -point.y, point.y + height - cc.winSize.height];
    };
    MapCamera.prototype.cameraZoom = function (orientation) {
        var step = orientation > 0 ? 0.04 : -0.04;
        var curZoomRatio = this.camera.zoomRatio;
        curZoomRatio += step;
        if (curZoomRatio < this.zoomRatioMin || curZoomRatio > this.zoomRatioMax)
            return;
        this.camera.zoomRatio = curZoomRatio;
        var _a = this.getBoundaryDistance(), left = _a[0], right = _a[1], bottom = _a[2], top = _a[3];
        if (left < 0 || right < 0 || bottom < 0 || top < 0) {
            this.camera.zoomRatio = (curZoomRatio -= step);
        }
        else {
            this.updateMapVisible(true);
        }
    };
    MapCamera.prototype.updateMapVisible = function (force) {
        if (force === void 0) { force = false; }
        if (force || !this.lastCameraPos || (this.lastCameraPos && this.camera.node.position.sub(this.lastCameraPos).mag() > 1)) {
            this.updateNodeInCamera(this.mapBg, 0.35, this.loadMapBg, this);
            if (this.canTouchMove) {
                this.updateNodeInCamera(this.mapBg, this.camera.zoomRatio, this.reduceDrawCall, this);
                this.updateNodeInCamera(this.wall, this.camera.zoomRatio, this.reduceDrawCall, this);
            }
            this.lastCameraPos = this.camera.node.position;
            // EventMgr.ins.send(Event.Map.HideTool);
        }
    };
    MapCamera.prototype.updateNodeInCamera = function (parent, zoomRatio, callFunc, target) {
        var children = parent.children;
        for (var idx = 0; idx < children.length; idx++) {
            var node = children[idx];
            var result = this.checkNodeInCamera(node, zoomRatio);
            callFunc.call(target, result, node);
        }
    };
    MapCamera.prototype.checkNodeInCamera = function (node, zoomRatio) {
        var curZoomRatio = zoomRatio || this.camera.zoomRatio;
        var nodeRect = node.getBoundingBoxToWorld();
        var nodeInCameraPos = this.camera.getWorldToScreenPoint(cc.v2(nodeRect.x, nodeRect.y), cc.Vec2.ZERO);
        var nodeInCameraRect = cc.rect(nodeInCameraPos.x, nodeInCameraPos.y, nodeRect.width * curZoomRatio, nodeRect.height * curZoomRatio);
        if (this.cameraRect.intersects(nodeInCameraRect)) {
            if (this.cameraRect.containsRect(nodeInCameraRect))
                return 1; //包含
            return 0; //相交
        }
        return -1; //相离
    };
    MapCamera.prototype.reduceDrawCall = function (result, node) {
        if (result == 1) {
            node.opacity = node.opacity || 255;
        }
        else if (result == 0) {
            node.opacity = node.opacity || 255;
            this.updateNodeInCamera(node, this.camera.zoomRatio, this.reduceDrawCall, this);
        }
        else {
            node.opacity = 0;
        }
    };
    MapCamera.prototype.loadMapBg = function (result, node) {
        this.loadSpriteFrame(result, node, 'texture/map/bg/');
    };
    MapCamera.prototype.loadWall = function (result, node) {
        this.loadSpriteFrame(result, node, 'texture/map/wall/');
    };
    MapCamera.prototype.loadSpriteFrame = function (result, node, path) {
        var sprite = node.getComponent(cc.Sprite);
        if ((result == 1 || result == 0) && !sprite.spriteFrame) {
            cc.loader.loadRes(path + node.name, cc.SpriteFrame, function (error, spriteFrame) {
                if (!error)
                    sprite.spriteFrame = spriteFrame;
            });
        }
    };
    MapCamera.prototype.onDisable = function () {
        this.camera.node.cleanup();
        // this.node.getWorldMatrix
    };
    __decorate([
        property(cc.Camera)
    ], MapCamera.prototype, "camera", void 0);
    __decorate([
        property(cc.Node)
    ], MapCamera.prototype, "mapBg", void 0);
    __decorate([
        property(cc.Node)
    ], MapCamera.prototype, "wall", void 0);
    MapCamera = __decorate([
        ccclass
    ], MapCamera);
    return MapCamera;
}(cc.Component));
exports.default = MapCamera;

cc._RF.pop();