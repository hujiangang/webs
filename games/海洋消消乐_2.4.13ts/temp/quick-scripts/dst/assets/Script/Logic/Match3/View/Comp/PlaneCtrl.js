
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/Comp/PlaneCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxDb21wXFxQbGFuZUN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQTRDO0FBQzVDLDZEQUF5RDtBQUN6RCx5REFBMkQ7QUFDM0QsZ0RBQTJDO0FBSXJDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBb0hDO1FBakhHLFVBQUksR0FBYyxJQUFJLENBQUM7UUFHdkIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUVqQixVQUFJLEdBQWlCLElBQUksQ0FBQzs7SUE0R3RDLENBQUM7SUExR0csMEJBQU0sR0FBTjtJQUVBLENBQUM7SUFFTSw4QkFBVSxHQUFqQixVQUFrQixJQUFhLEVBQUUsRUFBVyxFQUFFLEtBQWlCLEVBQUUsa0JBQW1DO1FBQXBHLGlCQWlDQztRQWpDNkMsc0JBQUEsRUFBQSxTQUFpQjtRQUFFLG1DQUFBLEVBQUEsMEJBQW1DO1FBQ2hHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM3QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDL0IsSUFBSSxHQUFHLGdCQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLEVBQUUsR0FBRyxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUvQixJQUFJLEdBQUcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1lBQzdCLEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLEtBQUksQ0FB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TyxFQUFFLENBQUM7WUFDZCxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUN0QjtJQUVMLENBQUM7SUFFRCw2QkFBUyxHQUFUO0lBRUEsQ0FBQztJQUVELDBCQUFNLEdBQU4sVUFBTyxFQUFFO1FBQ0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBOUdEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MkNBQ0c7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDTztJQU5SLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0FvSDdCO0lBQUQsZ0JBQUM7Q0FwSEQsQUFvSEMsQ0FwSHNDLEVBQUUsQ0FBQyxTQUFTLEdBb0hsRDtrQkFwSG9CLFNBQVM7QUF1SDlCO0lBQUE7UUFDSSxTQUFJLEdBQVksSUFBSSxDQUFDO1FBRXJCLFVBQUssR0FBVyxDQUFDLENBQUM7UUFFbEIsT0FBRSxHQUFHLENBQUMsQ0FBQztRQUNQLE9BQUUsR0FBRyxDQUFDLENBQUM7UUFDUCxNQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRU4sVUFBSyxHQUFHLENBQUMsQ0FBQztRQUVWLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRWYsWUFBTyxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQWZBLEFBZUMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCB7IEdhcFRpbWUgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9Db25zdC9UaW1lQ29uZmlnXCI7XG5pbXBvcnQgeyBOb2RlUG9vbEtleSB9IGZyb20gXCIuLi8uLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcblxuXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGFuZUN0cmwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBpY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcGFydGljbGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfYXJnOiBGbHlQbGFuZUFyZ3MgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIHNob290UGxhbmUoZnJvbTogY2MuVmVjMiwgdG86IGNjLlZlYzIsIGRlbGF5OiBudW1iZXIgPSAwLCBpc0NvdW50ZXJDbG9ja1dpc2U6IGJvb2xlYW4gPSBmYWxzZSk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHRoaXMucGFydGljbGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBmcm9tID0gQ29tbW9uLmdldFBvcyhmcm9tLngsIGZyb20ueSk7XG4gICAgICAgICAgICB0byA9IENvbW1vbi5nZXRQb3ModG8ueCwgdG8ueSk7XG5cbiAgICAgICAgICAgIGxldCBhcmcgPSBuZXcgRmx5UGxhbmVBcmdzKCk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oZnJvbSk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSAwO1xuXG4gICAgICAgICAgICBhcmcubm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIGxldCBzdGFydFBvaW50ID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xuICAgICAgICAgICAgbGV0IGVuZFBvaW50ID0gdG87XG4gICAgICAgICAgICBsZXQgcyA9IEdhcFRpbWUuQmVpa2VTdWN0aW9uU3BlZWQoKTtcbiAgICAgICAgICAgIGFyZy5tb3ZlX3NwZWVkID0gaXNDb3VudGVyQ2xvY2tXaXNlID8gLXMgOiBzO1xuXG4gICAgICAgICAgICBsZXQgY2VudGVyUG9pbnQgPSBjYy52Migoc3RhcnRQb2ludC54ICsgZW5kUG9pbnQueCkgKiAwLjUsIChzdGFydFBvaW50LnkgKyBlbmRQb2ludC55KSAqIDAuNSk7XG4gICAgICAgICAgICBsZXQgciA9IE1hdGguc3FydChNYXRoLnBvdyhzdGFydFBvaW50LnggLSBjZW50ZXJQb2ludC54LCAyKSArIE1hdGgucG93KHN0YXJ0UG9pbnQueSAtIGNlbnRlclBvaW50LnksIDIpKTtcblxuICAgICAgICAgICAgYXJnLnIgPSByO1xuXG4gICAgICAgICAgICBhcmcueGMgPSBjZW50ZXJQb2ludC54O1xuICAgICAgICAgICAgYXJnLnljID0gY2VudGVyUG9pbnQueTtcblxuICAgICAgICAgICAgYXJnLmFuZ2xlID0gdGhpcy5nZXRQbGFuZUFuZ2xlKHN0YXJ0UG9pbnQsIGNjLnYyKGNlbnRlclBvaW50LngsIGNlbnRlclBvaW50LnkgKyByKSwgcik7XG5cbiAgICAgICAgICAgIGFyZy5tb3ZlX2FuZ2xlID0gMTgwO1xuICAgICAgICAgICAgYXJnLmRlbGF5ID0gZGVsYXk7XG5cbiAgICAgICAgICAgIGFyZy5yZXNvbHZlID0gcmVzb2x2ZTtcblxuICAgICAgICAgICAgdGhpcy5fYXJnID0gYXJnO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UGxhbmVBbmdsZShwYTogY2MuVmVjMywgcGM6IGNjLlZlYzIsIHI6IG51bWJlcikge1xuICAgICAgICBsZXQgYW5nbGUgPSAwO1xuICAgICAgICBsZXQgeCA9IDA7XG4gICAgICAgIGxldCB5ID0gMDtcbiAgICAgICAgaWYgKHBhLnggPCBwYy54KSB7XG4gICAgICAgICAgICB4ID0gcGEueCAtIHBjLng7XG4gICAgICAgICAgICB5ID0gcGMueSAtIHBhLnk7XG4gICAgICAgICAgICBhbmdsZSA9IDM2MCAtIE1hdGguYXNpbihNYXRoLnNxcnQoeCAqIHggKyB5ICogeSkgLyByICogMC41KSAqIDIgKiAxODAgLyBNYXRoLlBJO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeCA9IHBjLnggLSBwYS54O1xuICAgICAgICAgICAgeSA9IHBjLnkgLSBwYS55O1xuICAgICAgICAgICAgYW5nbGUgPSBNYXRoLmFzaW4oTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpIC8gciAqIDAuNSkgKiAyICogMTgwIC8gTWF0aC5QSTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYW5nbGU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVGbHlQbGFuZShkdCkge1xuICAgICAgICBpZiAoIXRoaXMuX2FyZykgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0aGlzLl9hcmcuZGVsYXkgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9hcmcuZGVsYXkgLT0gZHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fYXJnLm1vdmVfYW5nbGUgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxhbmVBcnJpdmUodGhpcy5fYXJnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJ0aWNsZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCB4YyA9IHRoaXMuX2FyZy54YztcbiAgICAgICAgICAgICAgICBsZXQgeWMgPSB0aGlzLl9hcmcueWM7XG4gICAgICAgICAgICAgICAgbGV0IHIgPSB0aGlzLl9hcmcucjtcblxuICAgICAgICAgICAgICAgIGxldCBtb3ZlRGlzID0gZHQgKiB0aGlzLl9hcmcubW92ZV9zcGVlZDtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2FyZy5hbmdsZSArPSBtb3ZlRGlzO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FyZy5tb3ZlX2FuZ2xlIC09IE1hdGguYWJzKG1vdmVEaXMpO1xuICAgICAgICAgICAgICAgIGxldCBjdXJYID0geGMgKyByICogTWF0aC5zaW4odGhpcy5fYXJnLmFuZ2xlIC8gMTgwICogTWF0aC5QSSk7XG4gICAgICAgICAgICAgICAgbGV0IGN1clkgPSB5YyArIChyICogTWF0aC5jb3ModGhpcy5fYXJnLmFuZ2xlIC8gMTgwICogTWF0aC5QSSkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FyZy5ub2RlLmFjdGl2ZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcmcubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcmcubm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9hcmcubm9kZS5wb3NpdGlvbiA9IGNjLnYzKGN1clgsIGN1clkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FyZy5ub2RlLmFuZ2xlID0gLSAodGhpcy5fYXJnLmFuZ2xlIC0gKHRoaXMuX2FyZy5tb3ZlX3NwZWVkID4gMCA/IDEyMCA6IC02MCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwbGFuZUFycml2ZShhcmc6IEZseVBsYW5lQXJncykge1xuICAgICAgICBjb25zb2xlLmxvZyhgcGxhbmVBcnJpdmUhYCk7XG4gICAgICAgIHRoaXMucGFydGljbGUuZ2V0Q29tcG9uZW50KGNjLlBhcnRpY2xlU3lzdGVtKS5yZXNldFN5c3RlbSgpO1xuICAgICAgICBNLm5vZGVQb29sLmZyZWVJdGVtKE5vZGVQb29sS2V5LlBsYW5lLCB0aGlzLm5vZGUpO1xuICAgICAgICBpZiAoYXJnLnJlc29sdmUpIHtcbiAgICAgICAgICAgIGFyZy5yZXNvbHZlKCk7XG4gICAgICAgICAgICBhcmcucmVzb2x2ZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcblxuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUZseVBsYW5lKGR0KTtcbiAgICB9XG5cblxufVxuXG5cbmNsYXNzIEZseVBsYW5lQXJncyB7XG4gICAgbm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBkZWxheTogbnVtYmVyID0gMDtcblxuICAgIHhjID0gMDtcbiAgICB5YyA9IDA7XG4gICAgciA9IDA7XG5cbiAgICBhbmdsZSA9IDA7XG5cbiAgICBtb3ZlX3NwZWVkID0gMDtcbiAgICBtb3ZlX2FuZ2xlID0gMDtcblxuICAgIHJlc29sdmUgPSBudWxsO1xufVxuIl19