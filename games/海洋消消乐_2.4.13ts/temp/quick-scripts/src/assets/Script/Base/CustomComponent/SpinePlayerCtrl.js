"use strict";
cc._RF.push(module, '6a7017uvUJEoKGgXET9l4Ei', 'SpinePlayerCtrl');
// Script/Base/CustomComponent/SpinePlayerCtrl.ts

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
/**
 * spine动画控制器
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SpinePlayerCtrl = /** @class */ (function (_super) {
    __extends(SpinePlayerCtrl, _super);
    function SpinePlayerCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.callback = null;
        _this.frameCallback = null;
        _this._curPlayName = null;
        _this._timeout = null;
        return _this;
    }
    SpinePlayerCtrl.prototype.onLoad = function () {
        this.setCompleteListener(this._handleAniCompleteEvent.bind(this));
        this.setEventListener(this._handleFrameEvent.bind(this));
    };
    /**
     * 播放动画
     * @param name 动画名字
     * @param trackIndex ..搞不清这是个什么玩意
     * @param isloop 是否循环
     * @param callback 动画播放完成回调
     * @param frameEventCallback 动画自定义事件回调
     * @param nextData 如果需要播放下一个动画的数据
     */
    SpinePlayerCtrl.prototype.play = function (name, trackIndex, isloop, callback, frameEventCallback, nextData) {
        if (isloop === void 0) { isloop = false; }
        this.callback = callback;
        this.frameCallback = frameEventCallback;
        this.node.active = true;
        this._curPlayName = name;
        // if (this.callback) {
        //     this._timeout = setTimeout(() => {
        //         this.callback && this.callback();
        //         this.callback = null;
        //         this._curPlayName = null;
        //     }, 5 * 1000);
        // }
        this.setAnimation(trackIndex, name, isloop);
        if (nextData) {
            this.addAnimation(0, nextData.name, nextData.loop, 0);
        }
    };
    SpinePlayerCtrl.prototype.isStopSpine = function (isPaused) {
        this.paused = isPaused;
    };
    /**
     * 动画播放完成处理
     */
    SpinePlayerCtrl.prototype._handleAniCompleteEvent = function (trackEntry, loopCount) {
        // console.error("播放完毕");
        clearTimeout(this._timeout);
        this._curPlayName = null;
        if (this.callback) {
            this.callback();
            // this.callback = null;
        }
    };
    /**动画帧监听 */
    SpinePlayerCtrl.prototype._handleFrameEvent = function (event) {
        if (this.frameCallback) {
            this.frameCallback(event);
        }
    };
    SpinePlayerCtrl.prototype.onDestroy = function () {
        this.callback = null;
        this.frameCallback = null;
    };
    SpinePlayerCtrl.prototype._setMix = function (anim1, anim2) {
        this.setMix(anim1, anim2, 0.5);
        this.setMix(anim2, anim1, 0.5);
    };
    Object.defineProperty(SpinePlayerCtrl.prototype, "curPlay", {
        /**
         * 获得当前节点
         */
        get: function () {
            return this._curPlayName;
        },
        enumerable: false,
        configurable: true
    });
    SpinePlayerCtrl = __decorate([
        ccclass
    ], SpinePlayerCtrl);
    return SpinePlayerCtrl;
}(sp.Skeleton));
exports.default = SpinePlayerCtrl;

cc._RF.pop();