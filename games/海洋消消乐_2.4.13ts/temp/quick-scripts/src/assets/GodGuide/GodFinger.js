"use strict";
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