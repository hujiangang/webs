
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/SimulationOperation/View/Map/TrafficSystem/Walk.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcU2ltdWxhdGlvbk9wZXJhdGlvblxcVmlld1xcTWFwXFxUcmFmZmljU3lzdGVtXFxXYWxrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFxRDtBQUNyRCxpRUFBNEQ7QUFDNUQsdURBQXNEO0FBU2hELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWtDLHdCQUFZO0lBQTlDO1FBQUEscUVBMEdDO1FBeEdXLFdBQUssR0FBVyxFQUFFLENBQUM7UUFFbkIsZUFBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixnQkFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixjQUFRLEdBQVcsQ0FBQyxDQUFDOztJQW9HakMsQ0FBQztJQTVGVSx3QkFBUyxHQUFoQixVQUFpQixJQUFVLEVBQUUsTUFBdUI7UUFBdkIsdUJBQUEsRUFBQSxjQUF1QjtRQUNoRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRU8seUJBQVUsR0FBbEIsVUFBbUIsTUFBZTtRQUFsQyxpQkFjQztRQWJHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZ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QUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUMxRTtpQkFBTTtnQkFDSCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUMxRTtTQUNKO0lBRUwsQ0FBQztJQXhHZ0IsSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQTBHeEI7SUFBRCxXQUFDO0NBMUdELEFBMEdDLENBMUdpQyxFQUFFLENBQUMsU0FBUyxHQTBHN0M7a0JBMUdvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9CYXNlL01hbmFnZXIvRXZlbnRNZ3JcIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vQmFzZS9VdGlscy9VdGlsXCI7XG5cblxuZXhwb3J0IGludGVyZmFjZSBSb2FkIHtcbiAgICBzdGFydDogc3RyaW5nO1xuICAgIGVuZDogc3RyaW5nO1xuICAgIHBhdGg6IGNjLlZlYzJbXTtcbn1cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhbGsgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIHB1YmxpYyByb2FkOiBSb2FkO1xuICAgIHByaXZhdGUgc3BlZWQ6IG51bWJlciA9IDIwO1xuXG4gICAgcHJpdmF0ZSBpc1dhbGtpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHBhc3NlZFRpbWU6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBuZXh0U3RlcDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHdhbGtUaW1lOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIHZ4OiBudW1iZXI7XG4gICAgcHJpdmF0ZSB2eTogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSBzbG9wZTogbnVtYmVyO1xuXG4gICAgcHVibGljIHN0YXJ0V2Fsayhyb2FkOiBSb2FkLCBpc05leHQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmlzV2Fsa2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBhc3NlZFRpbWUgPSAwO1xuICAgICAgICB0aGlzLnJvYWQgPSByb2FkO1xuICAgICAgICB0aGlzLm5leHRTdGVwID0gaXNOZXh0ID8gMSA6IFV0aWwuVG9vbC5yYW5nZUludCgxLCByb2FkLnBhdGgubGVuZ3RoLCBmYWxzZSk7XG4gICAgICAgIHRoaXMud2Fsa09uUm9hZChpc05leHQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgd2Fsa09uUm9hZChpc05leHQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMucm9hZC5wYXRoLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5yb2FkLnBhdGhbdGhpcy5uZXh0U3RlcCAtIDFdKTtcblxuICAgICAgICBpZiAoaXNOZXh0KSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmZhZGVJbigwLjUpLFxuICAgICAgICAgICAgICAgIGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWxrVG9OZXh0KCk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcykpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53YWxrVG9OZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHdhbGtUb05leHQoKSB7XG4gICAgICAgIGlmICh0aGlzLm5leHRTdGVwID49IHRoaXMucm9hZC5wYXRoLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5pc1dhbGtpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMud2Fsa0VuZCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNyYyA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgZHN0ID0gdGhpcy5yb2FkLnBhdGhbdGhpcy5uZXh0U3RlcF07XG4gICAgICAgIHZhciBkaXIgPSBkc3Quc3ViKHNyYyk7XG4gICAgICAgIHZhciBsZW4gPSBkaXIubWFnKCk7XG5cbiAgICAgICAgdGhpcy5zbG9wZSA9IGRpci54IC8gZGlyLnk7XG4gICAgICAgIHRoaXMudnggPSB0aGlzLnNwZWVkICogZGlyLnggLyBsZW47XG4gICAgICAgIHRoaXMudnkgPSB0aGlzLnNwZWVkICogZGlyLnkgLyBsZW47XG4gICAgICAgIHRoaXMud2Fsa1RpbWUgPSBsZW4gLyB0aGlzLnNwZWVkO1xuICAgICAgICB0aGlzLnBhc3NlZFRpbWUgPSAwO1xuXG4gICAgICAgIHRoaXMuaXNXYWxraW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHdhbGtFbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJvYWQuZW5kID09ICcwJyB8fCB0aGlzLnJvYWQuZW5kID09ICcxJykge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5mYWRlVG8oMC41LCAwLjAwMSksXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKFV0aWwuVG9vbC5yYW5nZSgyLCA1KSksIGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuTWFwLldhbGtFbmQsIHRoaXMpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMpKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICAgICAgY2MuZGVsYXlUaW1lKDEpLCBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWdyLmlucy5zZW5kKEV2ZW50Lk1hcC5XYWxrRW5kLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKSkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNXYWxraW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wYXNzZWRUaW1lICs9IGR0O1xuICAgICAgICBpZiAodGhpcy5wYXNzZWRUaW1lID4gdGhpcy53YWxrVGltZSkge1xuICAgICAgICAgICAgZHQgLT0gKHRoaXMucGFzc2VkVGltZSAtIHRoaXMud2Fsa1RpbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ub2RlLnggKz0gKHRoaXMudnggKiBkdCk7XG4gICAgICAgIHRoaXMubm9kZS55ICs9ICh0aGlzLnZ5ICogZHQpO1xuICAgICAgICB0aGlzLnVwZGF0ZVpJbmRleCgpO1xuICAgICAgICBpZiAodGhpcy5wYXNzZWRUaW1lID49IHRoaXMud2Fsa1RpbWUpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dFN0ZXArKztcbiAgICAgICAgICAgIHRoaXMud2Fsa1RvTmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlWkluZGV4KCkge1xuICAgICAgICBsZXQgcGFyZW50ID0gdGhpcy5ub2RlLnBhcmVudDtcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgcGFyZW50LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBsZXQgYm94MSA9IGNoaWxkLmdldEJvdW5kaW5nQm94KCk7XG4gICAgICAgICAgICBsZXQgYm94MiA9IHRoaXMubm9kZS5nZXRCb3VuZGluZ0JveCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2xvcGUgPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJveDEuY2VudGVyLnkgPiBib3gyLmNlbnRlci55KSB0aGlzLm5vZGUuekluZGV4ID0gY2hpbGQuekluZGV4IC0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGJveDEuY2VudGVyLnggPiBib3gyLmNlbnRlci54KSB0aGlzLm5vZGUuekluZGV4ID0gY2hpbGQuekluZGV4ICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG59Il19