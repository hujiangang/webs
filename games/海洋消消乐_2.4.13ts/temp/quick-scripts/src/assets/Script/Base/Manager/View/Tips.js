"use strict";
cc._RF.push(module, '38444alxRVB0YEnkfY8rebN', 'Tips');
// Script/Base/Manager/View/Tips.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var View_1 = require("./View");
var Tips = /** @class */ (function (_super) {
    __extends(Tips, _super);
    function Tips() {
        var _this = _super.call(this, 'Tips') || this;
        /**排队展示未实现..... */
        _this.mTipsPool = [];
        _this.mPlayState = 0;
        _this.mTimer = null;
        return _this;
    }
    Object.defineProperty(Tips, "ins", {
        get: function () {
            if (this.instance == null) {
                this.instance = new Tips();
            }
            return this.instance;
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     * @param content
     * @param type 0是普通提示 1是图片提示
     * @param time
     */
    Tips.prototype.show = function (content, type, time) {
        if (type === void 0) { type = 0; }
        if (time === void 0) { time = 2; }
        //.......按照顺序显示tips 暂未实现.
        this.init();
        this.mTimer = time;
        if (this.mPlayState != 1 || this.isInvalidNode) {
            if (this.isInvalidNode)
                this.mNode = null;
            this.mPlayState = 1;
            if (!this.mNode) {
                this._initTipsView(content, type);
            }
            else {
                this._setContent(content, type);
                this.onShow();
            }
        }
    };
    Object.defineProperty(Tips.prototype, "isInvalidNode", {
        get: function () {
            return this.mNode && !this.mNode.parent;
        },
        enumerable: false,
        configurable: true
    });
    Tips.prototype._initTipsView = function (content, type) {
        var _this = this;
        if (content === void 0) { content = ''; }
        if (!this.mRootNode) {
            return;
        }
        cc.loader.loadRes('prefab/ui/tips', cc.Prefab, function (err, prefab) {
            if (err) {
                return console.error(err, prefab);
            }
            _this.mNode = cc.instantiate(prefab);
            _this.mRootNode.addChild(_this.mNode);
            _this._setContent(content, type);
            _this.onShow();
        });
    };
    Tips.prototype._setContent = function (content, type) {
        if (!this.mNode) {
            return console.error('Error: tips is not init ! ');
        }
        if (type == 0) {
            this.mNode.getChildByName('normal').active = true;
            this.mNode.getChildByName('gril').active = false;
            if (typeof content == 'string') {
                cc.find('normal/picContent', this.mNode).active = false;
                var c = cc.find('normal/content', this.mNode);
                c.active = true;
                c.getComponent(cc.Label).string = content;
            }
            else {
                cc.find('normal/content', this.mNode).active = false;
                var pic = cc.find('normal/picContent', this.mNode);
                pic.getComponent(cc.Sprite).spriteFrame = content;
            }
        }
        else {
            this.mNode.getChildByName('normal').active = false;
            this.mNode.getChildByName('gril').active = true;
            var c = cc.find('gril/content', this.mNode);
            c.getComponent(cc.Label).string = content;
        }
    };
    Tips.prototype.playHideAnimate = function () {
        this.mNode.opacity = 255;
        this.mNode.setPosition(0, 0);
        this.mNode.active = false;
        this.mPlayState = 0;
    };
    Tips.prototype.playShowAnimate = function () {
        var _this = this;
        this.mNode.active = true;
        var a1 = cc.moveBy(0.1, cc.v2(0, 40));
        var a2 = cc.moveBy(0.1, cc.v2(0, -20));
        var a3 = cc.delayTime(this.mTimer);
        var a4 = cc.callFunc(function () {
            _this.mNode.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () { return _this.onHide(); }, _this)));
        });
        this.mNode.runAction(cc.sequence(a1, a2, a3, a4));
    };
    // public static ins: Tips = SingletonFactory.getInstance(Tips);
    Tips.instance = null;
    return Tips;
}(View_1.default));
exports.default = Tips;

cc._RF.pop();