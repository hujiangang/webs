"use strict";
cc._RF.push(module, '749f8IuUVFP/aSiPV8gUGIh', 'TempLoadingPanel');
// Script/Logic/Common/UI/TempLoadingPanel.ts

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
var Constant_1 = require("../../Data/Const/Constant");
var Util_1 = require("../../../Base/Utils/Util");
var EventMgr_1 = require("../../../Base/Manager/EventMgr");
var Event_1 = require("../../Data/Const/Event");
var UIBase_1 = require("../../../Base/UI/UIBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TempLoadingPanel = /** @class */ (function (_super) {
    __extends(TempLoadingPanel, _super);
    function TempLoadingPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tipsLabel = null;
        _this.sprite = null;
        _this.progrss = null;
        _this.frames = [];
        return _this;
    }
    TempLoadingPanel.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this._initView();
        this._initEvent();
    };
    TempLoadingPanel.prototype.onDestroy = function () {
        EventMgr_1.default.ins.unRegister(Event_1.Event.UI.UpdateTmpLoadingProgress, this._onUpdateProgress, this);
    };
    TempLoadingPanel.prototype._initEvent = function () {
        EventMgr_1.default.ins.register(Event_1.Event.UI.UpdateTmpLoadingProgress, this._onUpdateProgress, this);
    };
    TempLoadingPanel.prototype._initView = function () {
        var keys = Object.keys(Constant_1.TempLoadingTip);
        var index = Util_1.Util.Tool.rangeInt(0, keys.length, false);
        this.sprite.spriteFrame = this.frames[index];
        this.tipsLabel.string = Constant_1.TempLoadingTip[index + 1];
    };
    TempLoadingPanel.prototype._onUpdateProgress = function (jd) {
        this.progrss.string = Math.ceil(jd) + "%";
    };
    TempLoadingPanel.prototype.start = function () {
    };
    __decorate([
        property(cc.Label)
    ], TempLoadingPanel.prototype, "tipsLabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], TempLoadingPanel.prototype, "sprite", void 0);
    __decorate([
        property(cc.Label)
    ], TempLoadingPanel.prototype, "progrss", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], TempLoadingPanel.prototype, "frames", void 0);
    TempLoadingPanel = __decorate([
        ccclass
    ], TempLoadingPanel);
    return TempLoadingPanel;
}(UIBase_1.default));
exports.default = TempLoadingPanel;

cc._RF.pop();