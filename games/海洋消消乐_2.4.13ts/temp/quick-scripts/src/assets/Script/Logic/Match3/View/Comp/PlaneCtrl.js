"use strict";
cc._RF.push(module, '17282rM5v1LiqqghFSUThov', 'PlaneCtrl');
// Script/Logic/Match3/View/Comp/PlaneCtrl.ts

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
var Common_1 = require("../../../Common/Common");
var TimeConfig_1 = require("../../../Data/Const/TimeConfig");
var Constant_1 = require("../../../Data/Const/Constant");
var M_1 = require("../../../../Base/Manager/M");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PlaneCtrl = /** @class */ (function (_super) {
    __extends(PlaneCtrl, _super);
    function PlaneCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.icon = null;
        _this.particle = null;
        _this._arg = null;
        return _this;
    }
    PlaneCtrl.prototype.onLoad = function () {
    };
    PlaneCtrl.prototype.shootPlane = function (from, to, delay, isCounterClockWise) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        if (isCounterClockWise === void 0) { isCounterClockWise = false; }
        this.particle.active = false;
        return new Promise(function (resolve, reject) {
            from = Common_1.default.getPos(from.x, from.y);
            to = Common_1.default.getPos(to.x, to.y);
            var arg = new FlyPlaneArgs();
            _this.node.setPosition(from);
            _this.node.angle = 0;
            arg.node = _this.node;
            var startPoint = _this.node.position;
            var endPoint = to;
            var s = TimeConfig_1.GapTime.BeikeSuctionSpeed();
            arg.move_speed = isCounterClockWise ? -s : s;
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
    PlaneCtrl.prototype.getPlaneAngle = function (pa, pc, r) {
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
    PlaneCtrl.prototype.updateFlyPlane = function (dt) {
        if (!this._arg)
            return;
        if (this._arg.delay > 0) {
            this._arg.delay -= dt;
        }
        else {
            if (this._arg.move_angle <= 0) {
                this.planeArrive(this._arg);
            }
            else {
                this.particle.active = true;
                var xc = this._arg.xc;
                var yc = this._arg.yc;
                var r = this._arg.r;
                var moveDis = dt * this._arg.move_speed;
                this._arg.angle += moveDis;
                this._arg.move_angle -= Math.abs(moveDis);
                var curX = xc + r * Math.sin(this._arg.angle / 180 * Math.PI);
                var curY = yc + (r * Math.cos(this._arg.angle / 180 * Math.PI));
                if (this._arg.node.active == false) {
                    this._arg.node.active = true;
                    this._arg.node.opacity = 255;
                }
                this._arg.node.position = cc.v3(curX, curY);
                this._arg.node.angle = -(this._arg.angle - (this._arg.move_speed > 0 ? 120 : -60));
            }
        }
    };
    PlaneCtrl.prototype.planeArrive = function (arg) {
        console.log("planeArrive!");
        this.particle.getComponent(cc.ParticleSystem).resetSystem();
        M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.Plane, this.node);
        if (arg.resolve) {
            arg.resolve();
            arg.resolve = null;
        }
    };
    PlaneCtrl.prototype.onDestroy = function () {
    };
    PlaneCtrl.prototype.update = function (dt) {
        this.updateFlyPlane(dt);
    };
    __decorate([
        property(cc.Sprite)
    ], PlaneCtrl.prototype, "icon", void 0);
    __decorate([
        property(cc.Node)
    ], PlaneCtrl.prototype, "particle", void 0);
    PlaneCtrl = __decorate([
        ccclass
    ], PlaneCtrl);
    return PlaneCtrl;
}(cc.Component));
exports.default = PlaneCtrl;
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