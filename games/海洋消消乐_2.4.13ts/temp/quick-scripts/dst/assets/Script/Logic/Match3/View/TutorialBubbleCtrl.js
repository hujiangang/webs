
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/TutorialBubbleCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '84ef0l2CcpDDYFfIhrgo5Gb', 'TutorialBubbleCtrl');
// Script/Logic/Match3/View/TutorialBubbleCtrl.ts

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
var TutroialBubbleCtrl = /** @class */ (function (_super) {
    __extends(TutroialBubbleCtrl, _super);
    function TutroialBubbleCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.bg = null;
        _this.touchHint = null;
        _this.role = null;
        return _this;
    }
    // onLoad () {}
    TutroialBubbleCtrl.prototype.setData = function (bubble) {
        if (bubble) {
            this.node.active = true;
            this.content.string = bubble.text["zh"];
            this.bg.height = this.content.node.height + 60;
            this.node.x = bubble.x;
            this.node.y = bubble.y;
        }
        else {
            this.node.active = false;
        }
    };
    TutroialBubbleCtrl.prototype.update = function (dt) {
    };
    __decorate([
        property(cc.RichText)
    ], TutroialBubbleCtrl.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], TutroialBubbleCtrl.prototype, "bg", void 0);
    __decorate([
        property(cc.Node)
    ], TutroialBubbleCtrl.prototype, "touchHint", void 0);
    __decorate([
        property(cc.Node)
    ], TutroialBubbleCtrl.prototype, "role", void 0);
    TutroialBubbleCtrl = __decorate([
        ccclass
    ], TutroialBubbleCtrl);
    return TutroialBubbleCtrl;
}(cc.Component));
exports.default = TutroialBubbleCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxUdXRvcmlhbEJ1YmJsZUN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBZ0Qsc0NBQVk7SUFBNUQ7UUFBQSxxRUFxQ0M7UUFsQ0csYUFBTyxHQUFnQixJQUFJLENBQUM7UUFHNUIsUUFBRSxHQUFZLElBQUksQ0FBQztRQUduQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLFVBQUksR0FBWSxJQUFJLENBQUM7O0lBeUJ6QixDQUFDO0lBdkJHLGVBQWU7SUFFZixvQ0FBTyxHQUFQLFVBQVEsTUFBZTtRQUVuQixJQUFJLE1BQU0sRUFBRTtZQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUV4QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFHL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBRTFCO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBR0QsbUNBQU0sR0FBTixVQUFPLEVBQUU7SUFFVCxDQUFDO0lBakNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7dURBQ007SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDQztJQUduQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ0c7SUFaSixrQkFBa0I7UUFEdEMsT0FBTztPQUNhLGtCQUFrQixDQXFDdEM7SUFBRCx5QkFBQztDQXJDRCxBQXFDQyxDQXJDK0MsRUFBRSxDQUFDLFNBQVMsR0FxQzNEO2tCQXJDb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUJ1YmJsZSB9IGZyb20gJy4uLy4uL0RhdGEvSW50ZXJmYWNlL0xldmVsL0lUdXRvcmlhbCc7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUdXRyb2lhbEJ1YmJsZUN0cmwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxuICAgIGNvbnRlbnQ6IGNjLlJpY2hUZXh0ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGJnOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRvdWNoSGludDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICByb2xlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIC8vIG9uTG9hZCAoKSB7fVxuXG4gICAgc2V0RGF0YShidWJibGU6IElCdWJibGUpIHtcblxuICAgICAgICBpZiAoYnViYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5jb250ZW50LnN0cmluZyA9IGJ1YmJsZS50ZXh0W1wiemhcIl07XG4gICAgICAgICAgICB0aGlzLmJnLmhlaWdodCA9IHRoaXMuY29udGVudC5ub2RlLmhlaWdodCArIDYwO1xuXG5cbiAgICAgICAgICAgIHRoaXMubm9kZS54ID0gYnViYmxlLng7XG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IGJ1YmJsZS55O1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHVwZGF0ZShkdCkge1xuXG4gICAgfVxufVxuIl19