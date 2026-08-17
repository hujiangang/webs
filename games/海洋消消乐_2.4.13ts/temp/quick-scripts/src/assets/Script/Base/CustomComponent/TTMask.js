"use strict";
cc._RF.push(module, '7f0b7zqwTFPLbUCU91kQsEV', 'TTMask');
// Script/Base/CustomComponent/TTMask.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, inspector = _a.inspector;
var TTMask = /** @class */ (function (_super) {
    __extends(TTMask, _super);
    function TTMask() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._curPoints = [];
        _this._polygonCom = null;
        return _this;
    }
    TTMask.prototype.updateMask = function () {
        var graphics = this['_graphics'];
        graphics.clear(false);
        for (var i = 0; i < this._curPoints.length; ++i) {
            var point = this._curPoints[i];
            if (i === 0) {
                graphics.moveTo(point.x, point.y);
            }
            else {
                graphics.lineTo(point.x, point.y);
            }
        }
        graphics.close();
        graphics.fill();
    };
    TTMask.prototype._compareArray = function (arr1, arr2) {
        var result = true;
        if (arr1 !== arr2 || arr1.length != arr2.length) {
            result = false;
        }
        else {
            for (var i = 0; i < arr1.length; i++) {
                var p1 = arr1[i];
                var p2 = arr2[i];
                if (p1.x !== p2.x || p1.y !== p2.y) {
                    result = false;
                    break;
                }
            }
        }
        return result;
    };
    TTMask.prototype.onEnable = function () {
        var _this = this;
        _super.prototype.onEnable.call(this);
        this._polygonCom = this.node.getComponent(cc.PolygonCollider);
        this.scheduleOnce(function () {
            _this.updateMask();
            // Editor.log("正在执行打包命令中，请稍候...");
        }, 0);
    };
    TTMask.prototype.update = function () {
        if (this._polygonCom && !this._compareArray(this._polygonCom.points, this._curPoints)) {
            this._curPoints = this._polygonCom.points;
            this.updateMask();
        }
    };
    TTMask = __decorate([
        ccclass
        // @executeInEditMode
        ,
        inspector('packages://CustomComponent/mask.js')
    ], TTMask);
    return TTMask;
}(cc.Mask));
exports.default = TTMask;

cc._RF.pop();