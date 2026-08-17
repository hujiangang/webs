"use strict";
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