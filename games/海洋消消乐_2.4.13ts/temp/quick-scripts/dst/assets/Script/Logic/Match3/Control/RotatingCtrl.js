
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Control/RotatingCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxDb250cm9sXFxSb3RhdGluZ0N0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBc0Q7QUFFaEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7SUFNSSxzQkFBWSxNQUFlLEVBQUUsY0FBdUI7UUFKNUMsU0FBSSxHQUFpQixJQUFJLENBQUM7UUFDMUIsWUFBTyxHQUFZLElBQUksQ0FBQztRQUN4QixvQkFBZSxHQUFZLElBQUksQ0FBQztRQUdwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQztJQUMxQyxDQUFDO0lBR00sNEJBQUssR0FBWixVQUFhLEtBQWlCO1FBQTlCLGlCQThCQztRQTlCWSxzQkFBQSxFQUFBLFNBQWlCO1FBQzFCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO1lBRXZCLElBQUksR0FBRyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7WUFDN0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBRXZCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixJQUFJLFVBQVUsR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUN2QyxJQUFJLFFBQVEsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDO1lBQ3BDLElBQU0sS0FBSyxHQUFHLG9CQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUUxQyxHQUFHLENBQUMsVUFBVSxHQUFHLG9CQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFFOUQsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLEVB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QWVDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYXBUaW1lIH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvVGltZUNvbmZpZ1wiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3RhdGluZ0N0cmwge1xuXG4gICAgcHJpdmF0ZSBfYXJnOiBGbHlQbGFuZUFyZ3MgPSBudWxsO1xuICAgIHByaXZhdGUgX3RhcmdldDogY2MuTm9kZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfdGFyZ2V0UG9zaXRpb246IGNjLlZlYzIgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IodGFyZ2V0OiBjYy5Ob2RlLCB0YXJnZXRQb3NpdGlvbjogY2MuVmVjMikge1xuICAgICAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIHRoaXMuX3RhcmdldFBvc2l0aW9uID0gdGFyZ2V0UG9zaXRpb247XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc3RhcnQoZGVsYXk6IG51bWJlciA9IDApOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcblxuICAgICAgICAgICAgbGV0IGFyZyA9IG5ldyBGbHlQbGFuZUFyZ3MoKTtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldC5hbmdsZSA9IDA7XG5cbiAgICAgICAgICAgIGFyZy5ub2RlID0gdGhpcy5fdGFyZ2V0O1xuICAgICAgICAgICAgbGV0IHN0YXJ0UG9pbnQgPSB0aGlzLl90YXJnZXQucG9zaXRpb247XG4gICAgICAgICAgICBsZXQgZW5kUG9pbnQgPSB0aGlzLl90YXJnZXRQb3NpdGlvbjtcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gR2FwVGltZS5CZWlrZVN1Y3Rpb25TcGVlZCgpO1xuXG4gICAgICAgICAgICBhcmcubW92ZV9zcGVlZCA9IEdhcFRpbWUuSXNDb3VudGVyQ2xvY2tXaXNlID8gLSBzcGVlZCA6IHNwZWVkO1xuXG4gICAgICAgICAgICBsZXQgY2VudGVyUG9pbnQgPSBjYy52Migoc3RhcnRQb2ludC54ICsgZW5kUG9pbnQueCkgKiAwLjUsIChzdGFydFBvaW50LnkgKyBlbmRQb2ludC55KSAqIDAuNSk7XG4gICAgICAgICAgICBsZXQgciA9IE1hdGguc3FydChNYXRoLnBvdyhzdGFydFBvaW50LnggLSBjZW50ZXJQb2ludC54LCAyKSArIE1hdGgucG93KHN0YXJ0UG9pbnQueSAtIGNlbnRlclBvaW50LnksIDIpKTtcblxuICAgICAgICAgICAgYXJnLnIgPSByO1xuXG4gICAgICAgICAgICBhcmcueGMgPSBjZW50ZXJQb2ludC54O1xuICAgICAgICAgICAgYXJnLnljID0gY2VudGVyUG9pbnQueTtcblxuICAgICAgICAgICAgYXJnLmFuZ2xlID0gdGhpcy5nZXRQbGFuZUFuZ2xlKHN0YXJ0UG9pbnQsIGNjLnYyKGNlbnRlclBvaW50LngsIGNlbnRlclBvaW50LnkgKyByKSwgcik7XG5cbiAgICAgICAgICAgIGFyZy5tb3ZlX2FuZ2xlID0gMTgwO1xuICAgICAgICAgICAgYXJnLmRlbGF5ID0gZGVsYXk7XG5cbiAgICAgICAgICAgIGFyZy5yZXNvbHZlID0gcmVzb2x2ZTtcblxuICAgICAgICAgICAgdGhpcy5fYXJnID0gYXJnO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UGxhbmVBbmdsZShwYTogY2MuVmVjMiwgcGM6IGNjLlZlYzIsIHI6IG51bWJlcikge1xuICAgICAgICBsZXQgYW5nbGUgPSAwO1xuICAgICAgICBsZXQgeCA9IDA7XG4gICAgICAgIGxldCB5ID0gMDtcbiAgICAgICAgaWYgKHBhLnggPCBwYy54KSB7XG4gICAgICAgICAgICB4ID0gcGEueCAtIHBjLng7XG4gICAgICAgICAgICB5ID0gcGMueSAtIHBhLnk7XG4gICAgICAgICAgICBhbmdsZSA9IDM2MCAtIE1hdGguYXNpbihNYXRoLnNxcnQoeCAqIHggKyB5ICogeSkgLyByICogMC41KSAqIDIgKiAxODAgLyBNYXRoLlBJO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeCA9IHBjLnggLSBwYS54O1xuICAgICAgICAgICAgeSA9IHBjLnkgLSBwYS55O1xuICAgICAgICAgICAgYW5nbGUgPSBNYXRoLmFzaW4oTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpIC8gciAqIDAuNSkgKiAyICogMTgwIC8gTWF0aC5QSTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYW5nbGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVGbHlQbGFuZShkdCkge1xuICAgICAgICBpZiAoIXRoaXMuX2FyZykgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0aGlzLl9hcmcuZGVsYXkgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9hcmcuZGVsYXkgLT0gZHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fYXJnLm1vdmVfYW5nbGUgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FyZy5ub2RlLnNjYWxlID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYW5lQXJyaXZlKHRoaXMuX2FyZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB4YyA9IHRoaXMuX2FyZy54YztcbiAgICAgICAgICAgICAgICBsZXQgeWMgPSB0aGlzLl9hcmcueWM7XG4gICAgICAgICAgICAgICAgbGV0IHIgPSB0aGlzLl9hcmcucjtcblxuICAgICAgICAgICAgICAgIGxldCBtb3ZlRGlzID0gZHQgKiB0aGlzLl9hcmcubW92ZV9zcGVlZDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2FyZy5hbmdsZSArPSBtb3ZlRGlzO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FyZy5tb3ZlX2FuZ2xlIC09IE1hdGguYWJzKG1vdmVEaXMpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGEgPSB0aGlzLl9hcmcuYW5nbGUgLyAxODAgKiBNYXRoLlBJO1xuICAgICAgICAgICAgICAgIGxldCBjdXJYID0geGMgKyByICogTWF0aC5zaW4oYSk7XG4gICAgICAgICAgICAgICAgbGV0IGN1clkgPSB5YyArIHIgKiBNYXRoLmNvcyhhKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hcmcubm9kZS5hY3RpdmUgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXJnLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXJnLm5vZGUub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fYXJnLm5vZGUuc2NhbGUgLT0gMC4wMTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcmcubm9kZS5wb3NpdGlvbiA9IGNjLnYzKGN1clgsIGN1clkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FyZy5ub2RlLmFuZ2xlID0gLSAodGhpcy5fYXJnLmFuZ2xlIC0gKHRoaXMuX2FyZy5tb3ZlX3NwZWVkID4gMCA/IDEyMCA6IC02MCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwbGFuZUFycml2ZShhcmc6IEZseVBsYW5lQXJncykge1xuICAgICAgICBjb25zb2xlLmxvZyhgcGxhbmVBcnJpdmUhYCk7XG4gICAgICAgIGlmIChhcmcucmVzb2x2ZSkge1xuICAgICAgICAgICAgYXJnLnJlc29sdmUoKTtcbiAgICAgICAgICAgIGFyZy5yZXNvbHZlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUZseVBsYW5lKGR0KTtcbiAgICB9XG5cbn1cblxuY2xhc3MgRmx5UGxhbmVBcmdzIHtcbiAgICBub2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIGRlbGF5OiBudW1iZXIgPSAwO1xuXG4gICAgeGMgPSAwO1xuICAgIHljID0gMDtcbiAgICByID0gMDtcblxuICAgIGFuZ2xlID0gMDtcblxuICAgIG1vdmVfc3BlZWQgPSAwO1xuICAgIG1vdmVfYW5nbGUgPSAwO1xuXG4gICAgcmVzb2x2ZSA9IG51bGw7XG59XG4iXX0=