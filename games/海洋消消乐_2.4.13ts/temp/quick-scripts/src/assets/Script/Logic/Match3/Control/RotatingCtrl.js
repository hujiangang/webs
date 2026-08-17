"use strict";
cc._RF.push(module, '5fe62GcHRlFs65lmrk3zBO1', 'RotatingCtrl');
// Script/Logic/Match3/Control/RotatingCtrl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimeConfig_1 = require("../../Data/Const/TimeConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RotatingCtrl = /** @class */ (function () {
    function RotatingCtrl(target, targetPosition) {
        this._arg = null;
        this._target = null;
        this._targetPosition = null;
        this._target = target;
        this._targetPosition = targetPosition;
    }
    RotatingCtrl.prototype.start = function (delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        return new Promise(function (resolve) {
            var arg = new FlyPlaneArgs();
            _this._target.angle = 0;
            arg.node = _this._target;
            var startPoint = _this._target.position;
            var endPoint = _this._targetPosition;
            var speed = TimeConfig_1.GapTime.BeikeSuctionSpeed();
            arg.move_speed = TimeConfig_1.GapTime.IsCounterClockWise ? -speed : speed;
            var centerPoint = cc.v2((startPoint.x + endPoint.x) * 0.5, (startPoint.y + endPoint.y) * 0.5);
            var r = Math.sqrt(Math.pow(startPoint.x - centerPoint.x, 2) + Math.pow(startPoint.y - centerPoint.y, 2));
            arg.r = r;
            arg.xc = centerPoint.x;
            arg.yc = centerPoint.y;
            arg.angle = _this.getPlaneAngle(startPoint, cc.v2(centerPoint.x, centerPoint.y + r), r);
            arg.move_angle = 180;
            arg.delay = delay;
            arg.resolve = resolve;
            _this._arg = arg;
        });
    };
    RotatingCtrl.prototype.getPlaneAngle = function (pa, pc, r) {
        var angle = 0;
        var x = 0;
        var y = 0;
        if (pa.x < pc.x) {
            x = pa.x - pc.x;
            y = pc.y - pa.y;
            angle = 360 - Math.asin(Math.sqrt(x * x + y * y) / r * 0.5) * 2 * 180 / Math.PI;
        }
        else {
            x = pc.x - pa.x;
            y = pc.y - pa.y;
            angle = Math.asin(Math.sqrt(x * x + y * y) / r * 0.5) * 2 * 180 / Math.PI;
        }
        return angle;
    };
    RotatingCtrl.prototype.updateFlyPlane = function (dt) {
        if (!this._arg)
            return;
        if (this._arg.delay > 0) {
            this._arg.delay -= dt;
        }
        else {
            if (this._arg.move_angle <= 0) {
                this._arg.node.scale = 0;
                this.planeArrive(this._arg);
            }
            else {
                var xc = this._arg.xc;
                var yc = this._arg.yc;
                var r = this._arg.r;
                var moveDis = dt * this._arg.move_speed;
                this._arg.angle += moveDis;
                this._arg.move_angle -= Math.abs(moveDis);
                var a = this._arg.angle / 180 * Math.PI;
                var curX = xc + r * Math.sin(a);
                var curY = yc + r * Math.cos(a);
                if (this._arg.node.active == false) {
                    this._arg.node.active = true;
                    this._arg.node.opacity = 255;
                }
                this._arg.node.scale -= 0.01;
                this._arg.node.position = cc.v3(curX, curY);
                this._arg.node.angle = -(this._arg.angle - (this._arg.move_speed > 0 ? 120 : -60));
            }
        }
    };
    RotatingCtrl.prototype.planeArrive = function (arg) {
        console.log("planeArrive!");
        if (arg.resolve) {
            arg.resolve();
            arg.resolve = null;
        }
    };
    RotatingCtrl.prototype.update = function (dt) {
        this.updateFlyPlane(dt);
    };
    return RotatingCtrl;
}());
exports.default = RotatingCtrl;
var FlyPlaneArgs = /** @class */ (function () {
    function FlyPlaneArgs() {
        this.node = null;
        this.delay = 0;
        this.xc = 0;
        this.yc = 0;
        this.r = 0;
        this.angle = 0;
        this.move_speed = 0;
        this.move_angle = 0;
        this.resolve = null;
    }
    return FlyPlaneArgs;
}());

cc._RF.pop();