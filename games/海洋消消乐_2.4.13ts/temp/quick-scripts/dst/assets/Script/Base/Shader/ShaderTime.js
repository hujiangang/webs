
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Shader/ShaderTime.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4b0c9b6HtpMo4aDeBTmlvUP', 'ShaderTime');
// Script/Base/Shader/ShaderTime.ts

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
var ShaderTime = /** @class */ (function (_super) {
    __extends(ShaderTime, _super);
    function ShaderTime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._max = 65535;
        _this.step = 0.01;
        _this._start = 0;
        return _this;
    }
    Object.defineProperty(ShaderTime.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (value) {
            this._max = value;
            if (!CC_EDITOR) {
                return;
            }
            var sprite = this.node.getComponent(cc.Sprite);
            if (sprite) {
                this._material = this.getComponent(cc.Sprite).getMaterials()[0];
                if (this._material.effect._properties.time) {
                    var material = sprite.getMaterials()[0];
                    material.effect.setProperty('time', value);
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    ShaderTime.prototype.update = function (dt) {
        this._material = this.node.getComponent(cc.Sprite).getMaterials()[0];
        if (this.node.active && this._material && this._material.effect.getProperty('time')) {
            this._setShaderTime(dt);
        }
    };
    ShaderTime.prototype._setShaderTime = function (dt) {
        var start = this._start;
        if (start > this.max)
            start = 0;
        start += this.step;
        this._material.effect.setProperty('time', start);
        this._start = start;
    };
    __decorate([
        property
    ], ShaderTime.prototype, "_max", void 0);
    __decorate([
        property
    ], ShaderTime.prototype, "step", void 0);
    __decorate([
        property
    ], ShaderTime.prototype, "max", null);
    ShaderTime = __decorate([
        ccclass
    ], ShaderTime);
    return ShaderTime;
}(cc.Component));
exports.default = ShaderTime;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxTaGFkZXJcXFNoYWRlclRpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUErQ0M7UUEzQ0csVUFBSSxHQUFXLEtBQUssQ0FBQztRQUdyQixVQUFJLEdBQVcsSUFBSSxDQUFDO1FBd0JaLFlBQU0sR0FBRyxDQUFDLENBQUM7O0lBZ0J2QixDQUFDO0lBbkNHLHNCQUFJLDJCQUFHO2FBQVA7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzthQUNELFVBQVEsS0FBSztZQUNULElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ1osT0FBTzthQUNWO1lBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9DLElBQUksTUFBTSxFQUFFO2dCQUNSLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtvQkFDeEMsSUFBSSxRQUFRLEdBQVEsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQzlDO2FBQ0o7UUFDTCxDQUFDOzs7T0FmQTtJQW1CUywyQkFBTSxHQUFoQixVQUFpQixFQUFFO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNqRixJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVPLG1DQUFjLEdBQXRCLFVBQXVCLEVBQUU7UUFDckIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN4QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRztZQUFFLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDaEMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBMUNEO1FBREMsUUFBUTs0Q0FDWTtJQUdyQjtRQURDLFFBQVE7NENBQ1c7SUFLcEI7UUFEQyxRQUFRO3lDQUdSO0lBZGdCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0ErQzlCO0lBQUQsaUJBQUM7Q0EvQ0QsQUErQ0MsQ0EvQ3VDLEVBQUUsQ0FBQyxTQUFTLEdBK0NuRDtrQkEvQ29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFkZXJUaW1lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBfbWF0ZXJpYWw6IGNjLk1hdGVyaWFsO1xuXG4gICAgQHByb3BlcnR5XG4gICAgX21heDogbnVtYmVyID0gNjU1MzU7XG5cbiAgICBAcHJvcGVydHlcbiAgICBzdGVwOiBudW1iZXIgPSAwLjAxO1xuXG4gICAgaXNVcGRhdGU6IGJvb2xlYW47XG5cbiAgICBAcHJvcGVydHlcbiAgICBnZXQgbWF4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXg7XG4gICAgfVxuICAgIHNldCBtYXgodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbWF4ID0gdmFsdWU7XG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3ByaXRlID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBpZiAoc3ByaXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXRlcmlhbCA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuZ2V0TWF0ZXJpYWxzKClbMF07XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF0ZXJpYWwuZWZmZWN0Ll9wcm9wZXJ0aWVzLnRpbWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWF0ZXJpYWw6IGFueSA9IHNwcml0ZS5nZXRNYXRlcmlhbHMoKVswXTtcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5lZmZlY3Quc2V0UHJvcGVydHkoJ3RpbWUnLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zdGFydCA9IDA7XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlKGR0KSB7XG4gICAgICAgIHRoaXMuX21hdGVyaWFsID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmdldE1hdGVyaWFscygpWzBdO1xuICAgICAgICBpZiAodGhpcy5ub2RlLmFjdGl2ZSAmJiB0aGlzLl9tYXRlcmlhbCAmJiB0aGlzLl9tYXRlcmlhbC5lZmZlY3QuZ2V0UHJvcGVydHkoJ3RpbWUnKSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0U2hhZGVyVGltZShkdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRTaGFkZXJUaW1lKGR0KSB7XG4gICAgICAgIGxldCBzdGFydCA9IHRoaXMuX3N0YXJ0O1xuICAgICAgICBpZiAoc3RhcnQgPiB0aGlzLm1heCkgc3RhcnQgPSAwO1xuICAgICAgICBzdGFydCArPSB0aGlzLnN0ZXA7XG4gICAgICAgIHRoaXMuX21hdGVyaWFsLmVmZmVjdC5zZXRQcm9wZXJ0eSgndGltZScsIHN0YXJ0KTtcbiAgICAgICAgdGhpcy5fc3RhcnQgPSBzdGFydDtcbiAgICB9XG59XG4iXX0=