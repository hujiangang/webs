
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/GodFinger.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fb7adJU6jVMwLpq0Hhj17dq', 'GodFinger');
// GodGuide/GodFinger.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GodFinger = /** @class */ (function (_super) {
    __extends(GodFinger, _super);
    function GodFinger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._animation = null;
        return _this;
    }
    GodFinger.prototype.onLoad = function () {
        this._animation = this.getComponent(cc.Animation);
    };
    GodFinger.prototype.doFinger = function () {
        this._animation.play("GodFinger");
    };
    GodFinger.prototype.stopFinger = function () {
        this._animation.stop();
    };
    Object.defineProperty(GodFinger.prototype, "active", {
        set: function (active) {
            this.node.active = active;
            if (!active) {
                this.stopFinger();
            }
        },
        enumerable: false,
        configurable: true
    });
    GodFinger = __decorate([
        ccclass
    ], GodFinger);
    return GodFinger;
}(cc.Component));
exports.default = GodFinger;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXEdvZEZpbmdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQXNCQztRQXBCVyxnQkFBVSxHQUFpQixJQUFJLENBQUM7O0lBb0I1QyxDQUFDO0lBbEJHLDBCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSw0QkFBUSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLDhCQUFVLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsc0JBQVcsNkJBQU07YUFBakIsVUFBa0IsTUFBTTtZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDVCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDckI7UUFDTCxDQUFDOzs7T0FBQTtJQXJCZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXNCN0I7SUFBRCxnQkFBQztDQXRCRCxBQXNCQyxDQXRCc0MsRUFBRSxDQUFDLFNBQVMsR0FzQmxEO2tCQXRCb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb2RGaW5nZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgcHJpdmF0ZSBfYW5pbWF0aW9uOiBjYy5BbmltYXRpb24gPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLl9hbmltYXRpb24gPSB0aGlzLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgIH1cblxuICAgIHB1YmxpYyBkb0ZpbmdlcigpIHtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoXCJHb2RGaW5nZXJcIik7XG4gICAgfVxuXG4gICAgcHVibGljIHN0b3BGaW5nZXIoKSB7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbi5zdG9wKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBhY3RpdmUoYWN0aXZlKSB7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBhY3RpdmU7XG4gICAgICAgIGlmICghYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BGaW5nZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=