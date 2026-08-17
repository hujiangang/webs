"use strict";
cc._RF.push(module, '6efe3wputNIJJPqqx3Q0G8J', 'View');
// Script/Base/Manager/View/View.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHOW_ACT_TYPE = void 0;
// View显示的动画类型
var SHOW_ACT_TYPE;
(function (SHOW_ACT_TYPE) {
    SHOW_ACT_TYPE[SHOW_ACT_TYPE["DEFAULT"] = 1] = "DEFAULT";
    SHOW_ACT_TYPE[SHOW_ACT_TYPE["SCALE"] = 2] = "SCALE";
})(SHOW_ACT_TYPE = exports.SHOW_ACT_TYPE || (exports.SHOW_ACT_TYPE = {}));
var View = /** @class */ (function () {
    function View(type) {
        this.mRootNode = null;
        this.mNode = null;
        this.mType = null;
        this.showActType = SHOW_ACT_TYPE.DEFAULT;
        this.mType = type;
        this.init();
    }
    View.prototype.init = function () {
        this.mRootNode = new cc.Node; //cc.find('Canvas');
        this.mRootNode.x = cc.winSize.width / 2;
        this.mRootNode.y = cc.winSize.height / 2;
        this.mRootNode.width = cc.winSize.width;
        this.mRootNode.height = cc.winSize.height;
        cc.game.addPersistRootNode(this.mRootNode);
    };
    //有关闭
    View.prototype.onHide = function () {
        this.mNode && (this.playHideAnimate());
    };
    //有开启
    View.prototype.onShow = function () {
        if (this.mNode) {
            this.playShowAnimate();
        }
        else {
            throw (new Error('Error: View must be init ! '));
        }
    };
    // 显示的动画类型
    View.prototype.setShowActType = function (showActType) {
        this.showActType = showActType;
    };
    View.prototype.destroy = function () {
        this.mNode = null;
        this.mRootNode = null;
    };
    return View;
}());
exports.default = View;
;

cc._RF.pop();