
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/SimulationOperation/View/Map/MapCamera.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcU2ltdWxhdGlvbk9wZXJhdGlvblxcVmlld1xcTWFwXFxNYXBDYW1lcmEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOERBQXlEO0FBQ3pELG1EQUFrRDtBQUNsRCxtREFBOEM7QUFFeEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBdUMsNkJBQVk7SUFBbkQ7UUFBQSxxRUEyVkM7UUF4VkcsWUFBTSxHQUFjLElBQUksQ0FBQztRQUd6QixXQUFLLEdBQVksSUFBSSxDQUFDO1FBR3RCLFVBQUksR0FBWSxJQUFJLENBQUM7UUFFckIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFDM0Isb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFDL0IscUJBQWUsR0FBWSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUV4QyxlQUFTLEdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUM1QixrQkFBWSxHQUFXLEdBQUcsQ0FBQztRQUMzQixrQkFBWSxHQUFXLElBQUksQ0FBQztRQUM1QixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixtQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixrQkFBWSxHQUFZLEtBQUssQ0FBQztRQUU5QixhQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCLGNBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUVsQixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUU5QixlQUFTLEdBQVksS0FBSyxDQUFDLENBQUUsVUFBVTs7SUE4VDNDLENBQUM7SUE1VEcsMEJBQU0sR0FBTjtRQUFBLGlCQWVDO1FBZEcsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxD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Q0FBQyxJQUFJLENBQUM7MkNBQ0c7SUFUSixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBMlY3QjtJQUFELGdCQUFDO0NBM1ZELEFBMlZDLENBM1ZzQyxFQUFFLENBQUMsU0FBUyxHQTJWbEQ7a0JBM1ZvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL01hbmFnZXIvRXZlbnRNZ3JcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCBNYXBJc2xhbmRVdGlscyBmcm9tIFwiLi9NYXBJc2xhbmRVdGlsc1wiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwQ2FtZXJhIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5DYW1lcmEpXG4gICAgY2FtZXJhOiBjYy5DYW1lcmEgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbWFwQmc6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgd2FsbDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBvbGREaXN0YW5jZTogbnVtYmVyID0gbnVsbDtcbiAgICBiYWNrZ3JvdW5kUmVjdDogY2MuUmVjdCA9IG51bGw7XG4gICAgYmFja2dyb3VuZFBvaW50OiBjYy5WZWMyID0gY2MuVmVjMi5aRVJPO1xuXG4gICAgbW92ZVNwZWVkOiBudW1iZXIgPSA4MDAgKiAyO1xuICAgIHpvb21SYXRpb01heDogbnVtYmVyID0gMS44O1xuICAgIHpvb21SYXRpb01pbjogbnVtYmVyID0gMC4zNTtcbiAgICBjYW1lcmFSZWN0OiBjYy5SZWN0ID0gbnVsbDtcblxuICAgIGlzVG91Y2hNb3Zpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjYW5Ub3VjaE1vdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGxhc3RQb3M6IGNjLlZlYzIgPSBudWxsO1xuICAgIGxhc3RUaW1lOiBudW1iZXIgPSAwO1xuICAgIGR0aW1lOiBudW1iZXIgPSAwO1xuXG4gICAgbGFzdENhbWVyYVBvczogY2MuVmVjMiA9IG51bGw7XG5cbiAgICBfY2FuTW92ZVk6IGJvb2xlYW4gPSBmYWxzZTsgIC8v5piv5ZCm5Y+v5Lul56e75YqoWei9tFxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmNhbWVyYVJlY3QgPSBjYy5yZWN0KDAsIDAsIGNjLndpblNpemUud2lkdGgsIGNjLndpblNpemUuaGVpZ2h0KTtcblxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaEJlZ2luLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMudG91Y2hDb250cm9sQ2FtZXJhLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzKTtcbiAgICAgICAgdGhpcy5jYW1lcmEubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELCB0aGlzLnVwZGF0ZU1hcFZpc2libGUsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfV0hFRUwsIChldmVudCkgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy5jYW1lcmFab29tKGV2ZW50Ll9zY3JvbGxZKTtcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIHRoaXMuaW5pdEV2ZW50KCk7XG4gICAgICAgIHRoaXMubWFwQmcuY2hpbGRyZW4uZm9yRWFjaCgobm9kZTogY2MuTm9kZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkTWFwQmcoMSwgbm9kZSk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICBNYXBJc2xhbmRVdGlscy5tYXBDYW1lcmEgPSB0aGlzLmNhbWVyYTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdmFyIG1hcFJlY3QgPSB0aGlzLm1hcEJnLmdldEJvdW5kaW5nQm94VG9Xb3JsZCgpO1xuICAgICAgICB2YXIgc2NhbGUgPSBNYXBJc2xhbmRVdGlscy5NYXBTY2FsZTtcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLmJhY2tncm91bmRSZWN0ID0gbmV3IGNjLlJlY3QobWFwUmVjdC54LCBtYXBSZWN0LnksIG1hcFJlY3Qud2lkdGggKiBzY2FsZSwgbWFwUmVjdC5oZWlnaHQgKiBzY2FsZSk7Ly8gdGhpcy5tYXBCZy5nZXRCb3VuZGluZ0JveFRvV29ybGQoKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kUG9pbnQgPSBjYy52MihyZWN0LngsIHJlY3QueSk7XG4gICAgfVxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIC8vIGlmKENDX0VESVRPUil7XG4gICAgICAgIC8vIHRoaXMubWFwQmcuY2hpbGRyZW4uZm9yRWFjaCgobm9kZTogY2MuTm9kZSkgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy5sb2FkTWFwQmcoMSwgbm9kZSk7XG4gICAgICAgIC8vIH0sIHRoaXMpO1xuXG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaEJlZ2luLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLnRvdWNoQ29udHJvbENhbWVyYSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnQoKTtcbiAgICAgICAgdGhpcy5jYW1lcmEubm9kZSAmJiB0aGlzLmNhbWVyYS5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELCB0aGlzLnVwZGF0ZU1hcFZpc2libGUsIHRoaXMpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RXZlbnQoKSB7XG4gICAgICAgIEV2ZW50TWdyLmlucy5yZWdpc3RlcihFdmVudC5NYXAuQ2FtZXJhTW92ZVRvLCB0aGlzLm1vdmVDYW1lcmFUbywgdGhpcyk7XG4gICAgICAgIEV2ZW50TWdyLmlucy5yZWdpc3RlcihFdmVudC5NYXAuTWFwVG91Y2hNb3ZlRW5hYmxlLCB0aGlzLnNldFRvdWNoRW5hYmxlLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUV2ZW50KCkge1xuICAgICAgICBFdmVudE1nci5pbnMudW5SZWdpc3RlcihFdmVudC5NYXAuQ2FtZXJhTW92ZVRvLCB0aGlzLm1vdmVDYW1lcmFUbywgdGhpcyk7XG4gICAgICAgIEV2ZW50TWdyLmlucy51blJlZ2lzdGVyKEV2ZW50Lk1hcC5NYXBUb3VjaE1vdmVFbmFibGUsIHRoaXMuc2V0VG91Y2hFbmFibGUsIHRoaXMpO1xuICAgIH1cblxuICAgIHNldFRvdWNoRW5hYmxlKGVuYWJsZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmNhblRvdWNoTW92ZSA9IGVuYWJsZTtcbiAgICB9XG5cbiAgICBtb3ZlQ2FtZXJhVG8oZXZlbnQ6IGFueSwgbW92ZWROZXh0KSB7Ly9jYy5FdmVudC5FdmVudEN1c3RvbSkge1xuICAgICAgICB0aGlzLmNhblRvdWNoTW92ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzVG91Y2hNb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jYW1lcmEubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuXG4gICAgICAgIGxldCBwb3NpdGlvbjogY2MuVmVjMiA9IGNjLnYyKCk7XG4gICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIGNjLlZlYzIpIHtcbiAgICAgICAgICAgIHZhciBtYXBTY2FsZSA9IE1hcElzbGFuZFV0aWxzLk1hcFNjYWxlO1xuICAgICAgICAgICAgZXZlbnQuc2NhbGUoY2MudjIobWFwU2NhbGUsIG1hcFNjYWxlKSwgcG9zaXRpb24pO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9jYW5Nb3ZlWSkgcG9zaXRpb24ueSA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBjYy5Ob2RlKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGV2ZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMyLlpFUk8pIGFzIGNjLlZlYzI7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGVsdGEgPSB0aGlzLmNhbWVyYS5ub2RlLnBvc2l0aW9uLnN1Yihwb3NpdGlvbik7XG4gICAgICAgIGxldCBlbmRQb3NpdGlvbiA9IGNjLnYyKCk7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrQ2FtZXJhQ2FuTW92ZShkZWx0YSkpIHtcbiAgICAgICAgICAgIGVuZFBvc2l0aW9uID0gcG9zaXRpb24uY2xvbmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGxldCBkZXRhbDEgPSB0aGlzLmNhbWVyYS5ub2RlLnBvc2l0aW9uLnN1YihkZWx0YSk7XG4gICAgICAgICAgICAvLyBjYy53YXJuKFwi5pGE5YOP5py65LiN6IO956e75Ye65Zyw5Zu+XCIsIGRlbHRhLCBkZXRhbDEpO1xuICAgICAgICAgICAgZW5kUG9zaXRpb24gPSBkZWx0YS5jbG9uZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJNb3ZldG8gXCIsIGVuZFBvc2l0aW9uKTtcbiAgICAgICAgbGV0IG1vdmUgPSBjYy5tb3ZlVG8oZW5kUG9zaXRpb24ubWFnKCkgLyB0aGlzLm1vdmVTcGVlZCwgZW5kUG9zaXRpb24pO1xuICAgICAgICBsZXQgbW92ZUVuZE5leHQgPSBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhblRvdWNoTW92ZSA9IHRydWU7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwiY2FtZXJhIG1vdmUgZW5kXCIsIHRoaXMuY2FtZXJhLm5vZGUucG9zaXRpb24pO1xuICAgICAgICAgICAgbW92ZWROZXh0ICYmIG1vdmVkTmV4dCgpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgbGV0IHNlcTEgPSBjYy5zZXF1ZW5jZShbbW92ZSwgbW92ZUVuZE5leHRdKTtcbiAgICAgICAgdGhpcy5jYW1lcmEubm9kZS5ydW5BY3Rpb24oc2VxMSk7XG4gICAgfVxuXG4gICAgb25Ub3VjaEJlZ2luKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XG4gICAgICAgIGlmICghdGhpcy5jYW5Ub3VjaE1vdmUpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbkltbWVkaWF0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FtZXJhLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICB9XG5cbiAgICBvblRvdWNoRW5kKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XG4gICAgICAgIGlmICghdGhpcy5jYW5Ub3VjaE1vdmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdG91Y2hlcyA9IGV2ZW50LmdldFRvdWNoZXMoKTtcbiAgICAgICAgaWYgKHRoaXMuaXNUb3VjaE1vdmluZyAmJiB0b3VjaGVzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICBsZXQgY3VyWm9vbVJhdGlvID0gdGhpcy5jYW1lcmEuem9vbVJhdGlvO1xuICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gZXZlbnQuZ2V0U3RhcnRMb2NhdGlvbigpLnN1YihldmVudC5nZXRQcmV2aW91c0xvY2F0aW9uKCkpO1xuICAgICAgICAgICAgbGV0IGRlbHRhID0gZGlzdGFuY2UubXVsKDAuMykubXVsKDEgLyBjdXJab29tUmF0aW8pO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9jYW5Nb3ZlWSkgZGVsdGEueSA9IDA7XG4gICAgICAgICAgICBsZXQgc3BlZWQgPSB0aGlzLmxhc3RQb3Muc3ViKHRoaXMuY2FtZXJhLm5vZGUucG9zaXRpb24pLm1hZygpIC8gdGhpcy5kdGltZTtcbiAgICAgICAgICAgIGlmIChzcGVlZCA+IDIgJiYgZGVsdGEubWFnKCkgPiAxMDAgJiYgdGhpcy5jaGVja0NhbWVyYUNhbk1vdmUoZGVsdGEubXVsKC0xKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbWVyYS5ub2RlLnJ1bkFjdGlvbihcbiAgICAgICAgICAgICAgICAgICAgY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5tb3ZlQnkoZGVsdGEubWFnKCkgLyAoc3BlZWQgKiAxMDApLCBkZWx0YSkuZWFzaW5nKGNjLmVhc2VRdWFkcmF0aWNBY3Rpb25PdXQoKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1RvdWNoTW92aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzVG91Y2hNb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvdWNoQ29udHJvbENhbWVyYShldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xuXG4gICAgICAgIGlmICghdGhpcy5jYW5Ub3VjaE1vdmUpIHJldHVybjtcbiAgICAgICAgbGV0IGN1clpvb21SYXRpbyA9IDEvL01hcElzbGFuZFV0aWxzLk1hcFNjYWxlOy8vdGhpcy5jYW1lcmEuem9vbVJhdGlvO1xuXG4gICAgICAgIHZhciB0b3VjaGVzID0gZXZlbnQuZ2V0VG91Y2hlcygpO1xuICAgICAgICBpZiAodG91Y2hlcy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgbGV0IGRlbHRhID0gZXZlbnQuZ2V0RGVsdGEoKS5tdWwoMSAvIGN1clpvb21SYXRpbyk7XG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja0NhbWVyYUNhbk1vdmUoZGVsdGEsIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9jYW5Nb3ZlWSkgZGVsdGEueSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1RvdWNoTW92aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RQb3MgPSB0aGlzLmNhbWVyYS5ub2RlLnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIGxldCBub3cgPSBjYy5zeXMubm93KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kdGltZSA9IG5vdyAtIHRoaXMubGFzdFRpbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0VGltZSA9IG5vdztcbiAgICAgICAgICAgICAgICB0aGlzLmNhbWVyYS5ub2RlLnBvc2l0aW9uID0gdGhpcy5jYW1lcmEubm9kZS5wb3NpdGlvbi5zdWJTZWxmKGRlbHRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0b3VjaGVzLmxlbmd0aCA9PSAyKSB7ICAvL+emgeatouWPr+S7pee8qeaUvlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgLy8gY2MubG9nKCdzZmRnZy0tLS0tLScsIHRvdWNoZXMpXG4gICAgICAgICAgICB2YXIgdG91Y2hQb2ludDEgPSB0b3VjaGVzWzBdLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICB2YXIgdG91Y2hQb2ludDIgPSB0b3VjaGVzWzFdLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3codG91Y2hQb2ludDEueCAtIHRvdWNoUG9pbnQyLngsIDIpICsgTWF0aC5wb3codG91Y2hQb2ludDEueSAtIHRvdWNoUG9pbnQyLnksIDIpKTtcbiAgICAgICAgICAgIGxldCBkaXMgPSBkaXN0YW5jZSAtIHRoaXMub2xkRGlzdGFuY2U7XG4gICAgICAgICAgICBkaXMgIT0gMCAmJiB0aGlzLmNhbWVyYVpvb20oZGlzKTtcblxuICAgICAgICAgICAgdGhpcy5vbGREaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tDYW1lcmFDYW5Nb3ZlKGRlbHRhOiBjYy5WZWMyLCB0b3VjaDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIHZhciBjYW1lcmFQb3NpdGlvbiA9IHRoaXMuY2FtZXJhLm5vZGUucG9zaXRpb247XG4gICAgICAgIHZhciBtYXBTY2FsZSA9IE1hcElzbGFuZFV0aWxzLk1hcFNjYWxlO1xuICAgICAgICAvLyBjb25zb2xlLmVycm9yKGNhbWVyYVBvc2l0aW9uLnggLSB0aGlzLmNhbWVyYS5ub2RlLndpZHRoIC8gMiAtIGRlbHRhLngpO1xuICAgICAgICBpZiAoY2FtZXJhUG9zaXRpb24ueCAtIHRoaXMuY2FtZXJhLm5vZGUud2lkdGggLyAyIC0gZGVsdGEueCA8PSAtIHRoaXMubWFwQmcud2lkdGggKiBtYXBTY2FsZSAvIDIpIHtcbiAgICAgICAgICAgIGRlbHRhLnggPSAtIHRoaXMubWFwQmcud2lkdGggKiBtYXBTY2FsZSAvIDIgKyB0aGlzLmNhbWVyYS5ub2RlLndpZHRoIC8gMjtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmVycm9yKGNhbWVyYVBvc2l0aW9uLnggKyB0aGlzLmNhbWVyYS5ub2RlLndpZHRoIC8gMiAtIGRlbHRhLngpO1xuICAgICAgICBpZiAoY2FtZXJhUG9zaXRpb24ueCArIHRoaXMuY2FtZXJhLm5vZGUud2lkdGggLyAyIC0gZGVsdGEueCA+PSB0aGlzLm1hcEJnLndpZHRoICogbWFwU2NhbGUgLyAyKSB7XG4gICAgICAgICAgICBkZWx0YS54ID0gdGhpcy5tYXBCZy53aWR0aCAqIG1hcFNjYWxlIC8gMiAtIHRoaXMuY2FtZXJhLm5vZGUud2lkdGggLyAyO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoY2FtZXJhUG9zaXRpb24sIHRoaXMubWFwQmcud2lkdGggKiBtYXBTY2FsZSk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgbGV0IFtsZWZ0LCByaWdodCwgYm90dG9tLCB0b3BdID0gdGhpcy5nZXRCb3VuZGFyeURpc3RhbmNlKCk7XG5cbiAgICAgICAgbGV0IHhDYW5Nb3ZlID0gdHJ1ZTtcbiAgICAgICAgbGV0IHlDYW5Nb3ZlID0gdGhpcy5fY2FuTW92ZVk7XG5cbiAgICAgICAgaWYgKGxlZnQgPD0gMCAmJiBkZWx0YS54IDwgMCB8fCByaWdodCA8PSAwICYmIGRlbHRhLnggPiAwKSB4Q2FuTW92ZSA9IGZhbHNlO1xuICAgICAgICBpZiAoYm90dG9tIDw9IDAgJiYgZGVsdGEueSA8IDAgfHwgdG9wIDw9IDAgJiYgZGVsdGEueSA+IDApIHlDYW5Nb3ZlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHhDYW5Nb3ZlKSB7XG4gICAgICAgICAgICBsZXQgbW92ZVggPSBNYXRoLmFicyhkZWx0YS54KTtcbiAgICAgICAgICAgIGlmIChkZWx0YS54ID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChsZWZ0IDwgbW92ZVgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvdWNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWx0YS54ID0gbGVmdDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVsdGEueCA8IDApIHtcbiAgICAgICAgICAgICAgICBpZiAocmlnaHQgPCBtb3ZlWCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG91Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhLnggPSAtcmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeUNhbk1vdmUpIHtcbiAgICAgICAgICAgIGxldCBtb3ZlWSA9IE1hdGguYWJzKGRlbHRhLnkpO1xuICAgICAgICAgICAgaWYgKGRlbHRhLnkgPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJvdHRvbSA8IG1vdmVZKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3VjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGEueSA9IGJvdHRvbTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVsdGEueSA8IDApIHtcbiAgICAgICAgICAgICAgICBpZiAodG9wIDwgbW92ZVkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvdWNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWx0YS55ID0gLXRvcDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geENhbk1vdmUgfHwgeUNhbk1vdmU7XG4gICAgfVxuXG4gICAgZ2V0Qm91bmRhcnlEaXN0YW5jZSgpIHtcbiAgICAgICAgbGV0IGN1clpvb21SYXRpbyA9IE1hcElzbGFuZFV0aWxzLk1hcFNjYWxlO1xuICAgICAgICBsZXQgd2lkdGggPSB0aGlzLmJhY2tncm91bmRSZWN0LndpZHRoICogY3VyWm9vbVJhdGlvO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gdGhpcy5iYWNrZ3JvdW5kUmVjdC5oZWlnaHQgKiBjdXJab29tUmF0aW87XG4gICAgICAgIGxldCBwb2ludCA9IHRoaXMuY2FtZXJhLmdldFdvcmxkVG9TY3JlZW5Qb2ludCh0aGlzLmJhY2tncm91bmRQb2ludCwgY2MuVmVjMi5aRVJPKTtcbiAgICAgICAgcmV0dXJuIFstIHBvaW50LngsIHBvaW50LnggKyB3aWR0aCAtIGNjLndpblNpemUud2lkdGgsIC0gcG9pbnQueSwgcG9pbnQueSArIGhlaWdodCAtIGNjLndpblNpemUuaGVpZ2h0XTtcbiAgICB9XG5cbiAgICBjYW1lcmFab29tKG9yaWVudGF0aW9uKSB7XG4gICAgICAgIGxldCBzdGVwID0gb3JpZW50YXRpb24gPiAwID8gMC4wNCA6IC0wLjA0O1xuICAgICAgICBsZXQgY3VyWm9vbVJhdGlvID0gdGhpcy5jYW1lcmEuem9vbVJhdGlvO1xuICAgICAgICBjdXJab29tUmF0aW8gKz0gc3RlcDtcbiAgICAgICAgaWYgKGN1clpvb21SYXRpbyA8IHRoaXMuem9vbVJhdGlvTWluIHx8IGN1clpvb21SYXRpbyA+IHRoaXMuem9vbVJhdGlvTWF4KSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5jYW1lcmEuem9vbVJhdGlvID0gY3VyWm9vbVJhdGlvO1xuXG4gICAgICAgIGxldCBbbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wXSA9IHRoaXMuZ2V0Qm91bmRhcnlEaXN0YW5jZSgpO1xuICAgICAgICBpZiAobGVmdCA8IDAgfHwgcmlnaHQgPCAwIHx8IGJvdHRvbSA8IDAgfHwgdG9wIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5jYW1lcmEuem9vbVJhdGlvID0gKGN1clpvb21SYXRpbyAtPSBzdGVwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWFwVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZU1hcFZpc2libGUoZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAoZm9yY2UgfHwgIXRoaXMubGFzdENhbWVyYVBvcyB8fCAodGhpcy5sYXN0Q2FtZXJhUG9zICYmIHRoaXMuY2FtZXJhLm5vZGUucG9zaXRpb24uc3ViKHRoaXMubGFzdENhbWVyYVBvcykubWFnKCkgPiAxKSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVOb2RlSW5DYW1lcmEodGhpcy5tYXBCZywgMC4zNSwgdGhpcy5sb2FkTWFwQmcsIHRoaXMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FuVG91Y2hNb3ZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVOb2RlSW5DYW1lcmEodGhpcy5tYXBCZywgdGhpcy5jYW1lcmEuem9vbVJhdGlvLCB0aGlzLnJlZHVjZURyYXdDYWxsLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU5vZGVJbkNhbWVyYSh0aGlzLndhbGwsIHRoaXMuY2FtZXJhLnpvb21SYXRpbywgdGhpcy5yZWR1Y2VEcmF3Q2FsbCwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxhc3RDYW1lcmFQb3MgPSB0aGlzLmNhbWVyYS5ub2RlLnBvc2l0aW9uO1xuICAgICAgICAgICAgLy8gRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuTWFwLkhpZGVUb29sKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgdXBkYXRlTm9kZUluQ2FtZXJhKHBhcmVudDogY2MuTm9kZSwgem9vbVJhdGlvOiBudW1iZXIsIGNhbGxGdW5jOiBGdW5jdGlvbiwgdGFyZ2V0OiBhbnkpIHtcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gcGFyZW50LmNoaWxkcmVuO1xuICAgICAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBjaGlsZHJlbi5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNoaWxkcmVuW2lkeF07XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5jaGVja05vZGVJbkNhbWVyYShub2RlLCB6b29tUmF0aW8pO1xuICAgICAgICAgICAgY2FsbEZ1bmMuY2FsbCh0YXJnZXQsIHJlc3VsdCwgbm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja05vZGVJbkNhbWVyYShub2RlOiBjYy5Ob2RlLCB6b29tUmF0aW86IG51bWJlcikge1xuICAgICAgICBsZXQgY3VyWm9vbVJhdGlvID0gem9vbVJhdGlvIHx8IHRoaXMuY2FtZXJhLnpvb21SYXRpbztcbiAgICAgICAgbGV0IG5vZGVSZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0JveFRvV29ybGQoKTtcblxuICAgICAgICBsZXQgbm9kZUluQ2FtZXJhUG9zID0gdGhpcy5jYW1lcmEuZ2V0V29ybGRUb1NjcmVlblBvaW50KGNjLnYyKG5vZGVSZWN0LngsIG5vZGVSZWN0LnkpLCBjYy5WZWMyLlpFUk8pO1xuICAgICAgICBsZXQgbm9kZUluQ2FtZXJhUmVjdCA9IGNjLnJlY3Qobm9kZUluQ2FtZXJhUG9zLngsIG5vZGVJbkNhbWVyYVBvcy55LCBub2RlUmVjdC53aWR0aCAqIGN1clpvb21SYXRpbywgbm9kZVJlY3QuaGVpZ2h0ICogY3VyWm9vbVJhdGlvKTtcblxuICAgICAgICBpZiAodGhpcy5jYW1lcmFSZWN0LmludGVyc2VjdHMobm9kZUluQ2FtZXJhUmVjdCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbWVyYVJlY3QuY29udGFpbnNSZWN0KG5vZGVJbkNhbWVyYVJlY3QpKSByZXR1cm4gMTsgLy/ljIXlkKtcbiAgICAgICAgICAgIHJldHVybiAwOyAgIC8v55u45LqkXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xOyAgLy/nm7jnprtcbiAgICB9XG5cbiAgICByZWR1Y2VEcmF3Q2FsbChyZXN1bHQ6IG51bWJlciwgbm9kZTogY2MuTm9kZSkge1xuICAgICAgICBpZiAocmVzdWx0ID09IDEpIHtcbiAgICAgICAgICAgIG5vZGUub3BhY2l0eSA9IG5vZGUub3BhY2l0eSB8fCAyNTU7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09IDApIHtcbiAgICAgICAgICAgIG5vZGUub3BhY2l0eSA9IG5vZGUub3BhY2l0eSB8fCAyNTU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU5vZGVJbkNhbWVyYShub2RlLCB0aGlzLmNhbWVyYS56b29tUmF0aW8sIHRoaXMucmVkdWNlRHJhd0NhbGwsIHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRNYXBCZyhyZXN1bHQ6IG51bWJlciwgbm9kZTogY2MuTm9kZSkge1xuICAgICAgICB0aGlzLmxvYWRTcHJpdGVGcmFtZShyZXN1bHQsIG5vZGUsICd0ZXh0dXJlL21hcC9iZy8nKTtcbiAgICB9XG5cbiAgICBsb2FkV2FsbChyZXN1bHQ6IG51bWJlciwgbm9kZTogY2MuTm9kZSkge1xuICAgICAgICB0aGlzLmxvYWRTcHJpdGVGcmFtZShyZXN1bHQsIG5vZGUsICd0ZXh0dXJlL21hcC93YWxsLycpO1xuICAgIH1cblxuICAgIGxvYWRTcHJpdGVGcmFtZShyZXN1bHQ6IG51bWJlciwgbm9kZTogY2MuTm9kZSwgcGF0aDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBzcHJpdGUgPSBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBpZiAoKHJlc3VsdCA9PSAxIHx8IHJlc3VsdCA9PSAwKSAmJiAhc3ByaXRlLnNwcml0ZUZyYW1lKSB7XG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhwYXRoICsgbm9kZS5uYW1lLCBjYy5TcHJpdGVGcmFtZSwgKGVycm9yLCBzcHJpdGVGcmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZXJyb3IpIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuY2FtZXJhLm5vZGUuY2xlYW51cCgpO1xuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0V29ybGRNYXRyaXhcbiAgICB9XG5cbn1cbiJdfQ==