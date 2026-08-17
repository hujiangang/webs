"use strict";
cc._RF.push(module, '9e6d0jNcFNMwLJcsFI9ptOg', 'UIBase');
// Script/Base/UI/UIBase.ts

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
var EventMgr_1 = require("../Manager/EventMgr");
var UIData_1 = require("../../Logic/Data/Interface/UIData");
var GuideUtils_1 = require("../../../GodGuide/GuideUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIBase = /** @class */ (function (_super) {
    __extends(UIBase, _super);
    function UIBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**通知事件列表 */
        _this.uiEventList = null;
        _this._closeCallBack = null;
        _this.isShow = false;
        return _this;
    }
    /* ----------------------------- 以下方法不能在子类重写 ----------------------------- */
    /**初始化函数，在onLoad之前被调用，params为打开ui时传入的不定参数数组 */
    UIBase.prototype.init = function (params) {
        this.onInit(params);
    };
    /**onLoad 会在组件被首次加载的时候被回调。且优先于任何start */
    UIBase.prototype.onLoad = function () {
        var _this = this;
        this.uiEventList = new Map(this.initUIEvent());
        this.uiEventList.forEach(function (cb, key) {
            EventMgr_1.default.ins.register(key, cb, _this);
        }, this);
        this.onUILoad();
    };
    UIBase.prototype.onDestroy = function () {
        var _this = this;
        if (this.uiEventList) {
            this.uiEventList.forEach(function (cb, key) {
                EventMgr_1.default.ins.unRegister(key, cb, _this);
            }, this);
            this.uiEventList.clear();
        }
        this.onUIDestroy();
    };
    UIBase.prototype.onEnable = function () {
    };
    UIBase.prototype.onDisable = function () {
        this.onHide();
    };
    UIBase.prototype.start = function () {
        this.onStart();
    };
    UIBase.prototype.update = function (dt) {
        this.onUpdate(dt);
    };
    /* ---------------------------------------------------------------------------------- */
    /**注册notice事件，disable的时候会自动移除 */
    UIBase.prototype.addUIEventListener = function (eventName, cb) {
        EventMgr_1.default.ins.register(eventName, cb, this);
        this.uiEventList.set(eventName, cb);
    };
    UIBase.prototype.initUIEvent = function () {
        return [];
    };
    UIBase.prototype.onInit = function (params) {
    };
    UIBase.prototype.onUILoad = function () {
    };
    UIBase.prototype.onUIDestroy = function () {
    };
    UIBase.prototype.onShow = function (closeCallBack) {
        this._closeCallBack = closeCallBack;
        if (this.uiHudDef == UIData_1.UIHudDef.GameOverWin) {
            GuideUtils_1.GuideUtils.checkGuide();
        }
    };
    UIBase.prototype.onHide = function () {
        this._closeCallBack && this._closeCallBack();
        this._closeCallBack = null;
    };
    UIBase.prototype.onStart = function () {
    };
    UIBase.prototype.onUpdate = function (dt) {
    };
    UIBase.prototype.onClose = function () {
        this._closeCallBack && this._closeCallBack();
        this._closeCallBack = null;
    };
    UIBase = __decorate([
        ccclass
    ], UIBase);
    return UIBase;
}(cc.Component));
exports.default = UIBase;

cc._RF.pop();