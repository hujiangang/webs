"use strict";
cc._RF.push(module, '83aa0WddPdOa6LnZ49stCZ5', 'GodText');
// GodGuide/GodText.ts

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
var GodText = /** @class */ (function (_super) {
    __extends(GodText, _super);
    function GodText() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //显示的文本
        _this.label = null;
        _this.contentNode = null;
        _this.personSp = null;
        _this.roleSprites = [];
        _this._positionY = 0;
        _this._loaded = false;
        _this._curText = "";
        return _this;
    }
    GodText.prototype.start = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            _this.node["_touchListener"].setSwallowTouches(false);
            //隐藏文本提示
            if (_this.node.active) {
                // this.node.active = false;
                _this.hide();
                _this.node.emit('click');
                return;
            }
        });
        // this.contentNode.position.y = this._positionY;
        this.contentNode.active = true;
        this.contentNode.setPosition(0, this._positionY);
        this._loaded = true;
    };
    GodText.prototype.setText = function (txt, role, positionY, cb) {
        this.callback = cb;
        this._positionY = positionY;
        if (!this.label) {
            // this.label = this.node.getComponentInChildren(cc.Label);
            return;
        }
        this.personSp.spriteFrame = this.roleSprites[role - 1];
        this.label.string = "";
        this.showText(txt);
        // this.label.string = txt;
        this._curText = txt;
        if (this._loaded) {
            this.contentNode.active = true;
            this.contentNode.setPosition(0, this._positionY);
        }
        else {
            this.contentNode.active = false;
        }
        gsap.TweenLite.to(this.node, 0.5, { opacity: 255 });
        this.node.active = true;
    };
    GodText.prototype.showText = function (text) {
        this.unscheduleAllCallbacks();
        var i = 0;
        this.schedule(function () {
            this.label.string += text[i];
            i++;
        }, 0.08, text.length - 1, 0);
    };
    GodText.prototype.hide = function () {
        var _this = this;
        this.unscheduleAllCallbacks();
        this.label.string = this._curText;
        gsap.TweenLite.to(this.node, 0.5, {
            opacity: 0,
            onComplete: function () {
                _this.node.active = false;
            }
        });
    };
    __decorate([
        property(cc.Label)
    ], GodText.prototype, "label", void 0);
    __decorate([
        property(cc.Node)
    ], GodText.prototype, "contentNode", void 0);
    __decorate([
        property(cc.Sprite)
    ], GodText.prototype, "personSp", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], GodText.prototype, "roleSprites", void 0);
    GodText = __decorate([
        ccclass
    ], GodText);
    return GodText;
}(cc.Component));
exports.default = GodText;

cc._RF.pop();