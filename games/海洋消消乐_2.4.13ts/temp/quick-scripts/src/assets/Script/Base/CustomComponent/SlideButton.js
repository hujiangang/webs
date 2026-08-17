"use strict";
cc._RF.push(module, 'fb316Sfe3dKOYmAJ3fiEojP', 'SlideButton');
// Script/Base/CustomComponent/SlideButton.ts

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
var SlideButton = /** @class */ (function (_super) {
    __extends(SlideButton, _super);
    function SlideButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.openSprite = null;
        _this.closeSprite = null;
        _this.bar = null;
        _this.eventHandler = null;
        _this._isOpen = true;
        _this._isPlaying = false;
        return _this;
    }
    SlideButton.prototype.onLoad = function () {
        this._isOpen = true;
        this._isPlaying = false;
    };
    SlideButton.prototype._change = function (isNeedPlayAction) {
        if (isNeedPlayAction === void 0) { isNeedPlayAction = true; }
        if (this._isOpen) {
            this.openSprite.node.active = true;
            this.closeSprite.node.active = false;
        }
        else {
            this.openSprite.node.active = false;
            this.closeSprite.node.active = true;
        }
        if (isNeedPlayAction) {
            this._playMoveBarAction();
        }
        else {
            this.eventHandler.emit([this._isOpen]);
            if (!this._isOpen || (this._isOpen && this.bar.node['open'] == false)) {
                this._playMoveBarAction();
            }
        }
    };
    SlideButton.prototype._playMoveBarAction = function () {
        var _this = this;
        var distance = this.openSprite.node.width / 2;
        if (this.bar.node['open'] != this._isOpen) {
            if (!this._isOpen) {
                distance = -distance;
            }
            this._isPlaying = true;
            this.bar.node['open'] = this._isOpen;
            this.bar.node.runAction(cc.sequence(cc.moveBy(0.1, cc.v2(distance, 0)), cc.callFunc(function () {
                _this._isPlaying = false;
                _this.eventHandler.emit([_this._isOpen]);
            }, this)));
        }
    };
    SlideButton.prototype.onChange = function (event, opt) {
        if (opt === void 0) { opt = null; }
        if (this._isPlaying)
            return;
        var isMove = true;
        if (opt != null) {
            this._isOpen = opt;
            isMove = false;
        }
        else {
            this._isOpen = !this._isOpen;
        }
        this._change(isMove);
    };
    __decorate([
        property(cc.Sprite)
    ], SlideButton.prototype, "openSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], SlideButton.prototype, "closeSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], SlideButton.prototype, "bar", void 0);
    __decorate([
        property(cc.Component.EventHandler)
    ], SlideButton.prototype, "eventHandler", void 0);
    SlideButton = __decorate([
        ccclass
    ], SlideButton);
    return SlideButton;
}(cc.Component));
exports.default = SlideButton;

cc._RF.pop();