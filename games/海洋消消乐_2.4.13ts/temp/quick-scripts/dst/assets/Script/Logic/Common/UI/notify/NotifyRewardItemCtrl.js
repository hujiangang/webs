
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/notify/NotifyRewardItemCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '603f3HyPvtBSYbePw8Nn3Ij', 'NotifyRewardItemCtrl');
// Script/Logic/Common/UI/notify/NotifyRewardItemCtrl.ts

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
var Common_1 = require("../../Common");
var Constant_1 = require("../../../Data/Const/Constant");
var BaseConst_1 = require("../../../../Base/BaseConst");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NotifyRewardItemCtrl = /** @class */ (function (_super) {
    __extends(NotifyRewardItemCtrl, _super);
    function NotifyRewardItemCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = null;
        _this.content = null;
        _this.line = null;
        _this.boxFrame = null;
        _this.CurrencyFrames = [];
        _this._showTipsCB = null;
        _this._reward = null;
        _this._box = null;
        return _this;
    }
    NotifyRewardItemCtrl.prototype.init = function (data, isLast, showTips) {
        if (isLast === void 0) { isLast = false; }
        this.line.active = false;
        this._showTipsCB = showTips;
        if (data) {
            var index = 0;
            this._reward = data.reward;
            this.text.string = data.text;
            if (!isLast) {
                this.line.active = true;
            }
            for (var key in data.reward) {
                if (index != 0) {
                    this._createLable('+');
                }
                if (key == 'box') {
                    var sprite = this._createSprite(this.boxFrame);
                    this._box = sprite.node;
                    sprite.node.setContentSize(sprite.node.width * 0.65, sprite.node.height * 0.65);
                    sprite.node.on(cc.Node.EventType.TOUCH_END, this._showTips, this);
                }
                else {
                    if (Number(key) < Constant_1.PropType.BeikeBomb) {
                        var sprite = this._createSprite(this.CurrencyFrames[key]);
                        sprite.node.setContentSize(sprite.node.width * 0.5, sprite.node.height * 0.5);
                        sprite.node.y -= 4;
                        var count = data.reward[key];
                        if (Number(key) == BaseConst_1.CurrencyId.Coin) {
                            count = Common_1.default.bytesToSize(count);
                        }
                        this._createLable(count);
                    }
                }
                index++;
            }
        }
    };
    NotifyRewardItemCtrl.prototype._showTips = function () {
        this._showTipsCB && this._showTipsCB(Common_1.default.getRewardArray(this._reward), Common_1.default.getWorldPos(this._box));
    };
    NotifyRewardItemCtrl.prototype._createSprite = function (frame) {
        var sprite = Common_1.default.createSprite(null, frame);
        sprite.trim = false;
        sprite.node.parent = this.content;
        return sprite;
    };
    NotifyRewardItemCtrl.prototype._createLable = function (count) {
        var node = cc.instantiate(this.text.node);
        var label = node.getComponent(cc.Label);
        label.overflow = cc.Label.Overflow.NONE;
        label.string = "" + count;
        node.anchorX = 0;
        node.parent = this.content;
        return label;
    };
    __decorate([
        property(cc.Label)
    ], NotifyRewardItemCtrl.prototype, "text", void 0);
    __decorate([
        property(cc.Node)
    ], NotifyRewardItemCtrl.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], NotifyRewardItemCtrl.prototype, "line", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], NotifyRewardItemCtrl.prototype, "boxFrame", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], NotifyRewardItemCtrl.prototype, "CurrencyFrames", void 0);
    NotifyRewardItemCtrl = __decorate([
        ccclass
    ], NotifyRewardItemCtrl);
    return NotifyRewardItemCtrl;
}(cc.Component));
exports.default = NotifyRewardItemCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcbm90aWZ5XFxOb3RpZnlSZXdhcmRJdGVtQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBa0M7QUFDbEMseURBQXdEO0FBQ3hELHdEQUF3RDtBQUVsRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFrRCx3Q0FBWTtJQUE5RDtRQUFBLHFFQThFQztRQTNFRyxVQUFJLEdBQWEsSUFBSSxDQUFDO1FBR3RCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsVUFBSSxHQUFZLElBQUksQ0FBQztRQUdyQixjQUFRLEdBQW1CLElBQUksQ0FBQztRQUdoQyxvQkFBYyxHQUFxQixFQUFFLENBQUM7UUFFOUIsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFFN0IsYUFBTyxHQUFHLElBQUksQ0FBQztRQUNmLFVBQUksR0FBWSxJQUFJLENBQUM7O0lBMERqQyxDQUFDO0lBeERVLG1DQUFJLEdBQVgsVUFBWSxJQUF5RyxFQUFFLE1BQXVCLEVBQUUsUUFBUTtRQUFqQyx1QkFBQSxFQUFBLGNBQXVCO1FBQzFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztRQUM1QixJQUFJLElBQUksRUFBRTtZQUNOLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzdCLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FB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O1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMzQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBMUVEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7c0RBQ0c7SUFHdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt5REFDTTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNHO0lBR3JCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7MERBQ087SUFHaEM7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7Z0VBQ1c7SUFmckIsb0JBQW9CO1FBRHhDLE9BQU87T0FDYSxvQkFBb0IsQ0E4RXhDO0lBQUQsMkJBQUM7Q0E5RUQsQUE4RUMsQ0E5RWlELEVBQUUsQ0FBQyxTQUFTLEdBOEU3RDtrQkE5RW9CLG9CQUFvQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uL0NvbW1vblwiO1xuaW1wb3J0IHsgUHJvcFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IHsgQ3VycmVuY3lJZCB9IGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL0Jhc2VDb25zdFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90aWZ5UmV3YXJkSXRlbUN0cmwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHRleHQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbGluZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgYm94RnJhbWU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIEN1cnJlbmN5RnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBwcml2YXRlIF9zaG93VGlwc0NCOiBGdW5jdGlvbiA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9yZXdhcmQgPSBudWxsO1xuICAgIHByaXZhdGUgX2JveDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBwdWJsaWMgaW5pdChkYXRhOiB7IHRleHQ6IHN0cmluZywgcmV3YXJkOiB7IFt0eXBlOiBudW1iZXJdOiBudW1iZXIgfCB7IFtrZXk6IG51bWJlcl06IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0gfSB9IH0sIGlzTGFzdDogYm9vbGVhbiA9IGZhbHNlLCBzaG93VGlwcykge1xuICAgICAgICB0aGlzLmxpbmUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3Nob3dUaXBzQ0IgPSBzaG93VGlwcztcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9yZXdhcmQgPSBkYXRhLnJld2FyZDtcbiAgICAgICAgICAgIHRoaXMudGV4dC5zdHJpbmcgPSBkYXRhLnRleHQ7XG4gICAgICAgICAgICBpZiAoIWlzTGFzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGluZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YS5yZXdhcmQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVMYWJsZSgnKycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09ICdib3gnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwcml0ZSA9IHRoaXMuX2NyZWF0ZVNwcml0ZSh0aGlzLmJveEZyYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYm94ID0gc3ByaXRlLm5vZGU7XG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZS5ub2RlLnNldENvbnRlbnRTaXplKHNwcml0ZS5ub2RlLndpZHRoICogMC42NSwgc3ByaXRlLm5vZGUuaGVpZ2h0ICogMC42NSk7XG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZS5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fc2hvd1RpcHMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChOdW1iZXIoa2V5KSA8IFByb3BUeXBlLkJlaWtlQm9tYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ByaXRlID0gdGhpcy5fY3JlYXRlU3ByaXRlKHRoaXMuQ3VycmVuY3lGcmFtZXNba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGUubm9kZS5zZXRDb250ZW50U2l6ZShzcHJpdGUubm9kZS53aWR0aCAqIDAuNSwgc3ByaXRlLm5vZGUuaGVpZ2h0ICogMC41KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZS5ub2RlLnkgLT0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb3VudDogYW55ID0gZGF0YS5yZXdhcmRba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChOdW1iZXIoa2V5KSA9PSBDdXJyZW5jeUlkLkNvaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudCA9IENvbW1vbi5ieXRlc1RvU2l6ZShjb3VudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVMYWJsZShjb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3Nob3dUaXBzKCkge1xuICAgICAgICB0aGlzLl9zaG93VGlwc0NCICYmIHRoaXMuX3Nob3dUaXBzQ0IoQ29tbW9uLmdldFJld2FyZEFycmF5KHRoaXMuX3Jld2FyZCksIENvbW1vbi5nZXRXb3JsZFBvcyh0aGlzLl9ib3gpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jcmVhdGVTcHJpdGUoZnJhbWU6IGNjLlNwcml0ZUZyYW1lKTogY2MuU3ByaXRlIHtcbiAgICAgICAgY29uc3Qgc3ByaXRlID0gQ29tbW9uLmNyZWF0ZVNwcml0ZShudWxsLCBmcmFtZSk7XG4gICAgICAgIHNwcml0ZS50cmltID0gZmFsc2U7XG4gICAgICAgIHNwcml0ZS5ub2RlLnBhcmVudCA9IHRoaXMuY29udGVudDtcbiAgICAgICAgcmV0dXJuIHNwcml0ZVxuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZUxhYmxlKGNvdW50KTogY2MuTGFiZWwge1xuICAgICAgICBjb25zdCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy50ZXh0Lm5vZGUpO1xuICAgICAgICBjb25zdCBsYWJlbCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgbGFiZWwub3ZlcmZsb3cgPSBjYy5MYWJlbC5PdmVyZmxvdy5OT05FO1xuICAgICAgICBsYWJlbC5zdHJpbmcgPSBgJHtjb3VudH1gO1xuICAgICAgICBub2RlLmFuY2hvclggPSAwXG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5jb250ZW50O1xuICAgICAgICByZXR1cm4gbGFiZWw7XG4gICAgfVxufVxuIl19