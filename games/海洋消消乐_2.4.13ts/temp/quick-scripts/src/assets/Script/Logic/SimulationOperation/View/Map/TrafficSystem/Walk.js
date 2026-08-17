"use strict";
cc._RF.push(module, '2e4e8UM9NdIOYwzBHVCpnDs', 'Walk');
// Script/Logic/SimulationOperation/View/Map/TrafficSystem/Walk.ts

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
var Event_1 = require("../../../../Data/Const/Event");
var EventMgr_1 = require("../../../../../Base/Manager/EventMgr");
var Util_1 = require("../../../../../Base/Utils/Util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Walk = /** @class */ (function (_super) {
    __extends(Walk, _super);
    function Walk() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 20;
        _this.isWalking = false;
        _this.passedTime = 0;
        _this.nextStep = 0;
        return _this;
    }
    Walk.prototype.startWalk = function (road, isNext) {
        if (isNext === void 0) { isNext = false; }
        this.isWalking = false;
        this.passedTime = 0;
        this.road = road;
        this.nextStep = isNext ? 1 : Util_1.Util.Tool.rangeInt(1, road.path.length, false);
        this.walkOnRoad(isNext);
    };
    Walk.prototype.walkOnRoad = function (isNext) {
        var _this = this;
        if (this.road.path.length < 2) {
            return;
        }
        this.node.setPosition(this.road.path[this.nextStep - 1]);
        if (isNext) {
            this.node.runAction(cc.sequence(cc.fadeIn(0.5), cc.callFunc(function () {
                _this.walkToNext();
            }, this)));
        }
        else {
            this.walkToNext();
        }
    };
    Walk.prototype.walkToNext = function () {
        if (this.nextStep >= this.road.path.length) {
            this.isWalking = false;
            this.walkEnd();
            return;
        }
        var src = this.node.getPosition();
        var dst = this.road.path[this.nextStep];
        var dir = dst.sub(src);
        var len = dir.mag();
        this.slope = dir.x / dir.y;
        this.vx = this.speed * dir.x / len;
        this.vy = this.speed * dir.y / len;
        this.walkTime = len / this.speed;
        this.passedTime = 0;
        this.isWalking = true;
    };
    Walk.prototype.walkEnd = function () {
        var _this = this;
        if (this.road.end == '0' || this.road.end == '1') {
            this.node.runAction(cc.sequence(cc.fadeTo(0.5, 0.001), cc.delayTime(Util_1.Util.Tool.range(2, 5)), cc.callFunc(function () {
                EventMgr_1.default.ins.send(Event_1.Event.Map.WalkEnd, _this);
            }, this)));
        }
        else {
            this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () {
                EventMgr_1.default.ins.send(Event_1.Event.Map.WalkEnd, _this);
            }, this)));
        }
    };
    Walk.prototype.update = function (dt) {
        if (this.isWalking === false) {
            return;
        }
        this.passedTime += dt;
        if (this.passedTime > this.walkTime) {
            dt -= (this.passedTime - this.walkTime);
        }
        this.node.x += (this.vx * dt);
        this.node.y += (this.vy * dt);
        this.updateZIndex();
        if (this.passedTime >= this.walkTime) {
            this.nextStep++;
            this.walkToNext();
        }
    };
    Walk.prototype.updateZIndex = function () {
        var parent = this.node.parent;
        for (var _i = 0, _a = parent.children; _i < _a.length; _i++) {
            var child = _a[_i];
            var box1 = child.getBoundingBox();
            var box2 = this.node.getBoundingBox();
            if (this.slope > 0) {
                if (box1.center.y > box2.center.y)
                    this.node.zIndex = child.zIndex - 1;
            }
            else {
                if (box1.center.x > box2.center.x)
                    this.node.zIndex = child.zIndex + 1;
            }
        }
    };
    Walk = __decorate([
        ccclass
    ], Walk);
    return Walk;
}(cc.Component));
exports.default = Walk;

cc._RF.pop();