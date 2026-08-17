"use strict";
cc._RF.push(module, 'fce55gWXklC94HtJAPn/viu', 'OverHightLightCtrl');
// Script/Logic/Common/UI/OverHightLightCtrl.ts

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
var GameModel_1 = require("../../Match3/Model/GameModel");
var M_1 = require("../../../Base/Manager/M");
var Event_1 = require("../../Data/Const/Event");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var OverHightLightCtrl = /** @class */ (function (_super) {
    __extends(OverHightLightCtrl, _super);
    function OverHightLightCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.countDownNode = null;
        _this.stepNode = null;
        _this.stepLabel = null;
        _this.countDownLabel = null;
        _this._animation = null;
        return _this;
    }
    OverHightLightCtrl.prototype.onLoad = function () {
        this._animation = this.getComponent(cc.Animation);
    };
    OverHightLightCtrl.prototype.onDestroy = function () {
        this.unscheduleAllCallbacks();
    };
    OverHightLightCtrl.prototype.showStepNode = function () {
        this.stepNode.scale = 1;
        this.countDownNode.active = false;
    };
    OverHightLightCtrl.prototype.showCountDown = function () {
        var _this = this;
        //开始减少步数
        var currentCount = this.stepLabel.string;
        this.schedule(function () {
            _this.stepLabel.string = (Number(_this.stepLabel.string) - 1).toString();
            //减少到0,展示倒计时
            if (_this.stepLabel.string == '0') {
                _this.countDownNode.active = true;
                _this._animation.play('gameOverCountdown');
                _this._startCountDown();
            }
        }, 0.03, Number(currentCount));
    };
    OverHightLightCtrl.prototype._startCountDown = function () {
        var _this = this;
        var count = GameModel_1.default.ins.stepLimit + 5;
        this.countDownLabel.string = count.toString();
        M_1.default.event.send(Event_1.Event.GameCMD.GameOverFall);
        this.schedule(function () {
            _this.countDownLabel.string = (Number(_this.countDownLabel.string) - 1).toString();
            if (_this.countDownLabel.string == '0') {
                console.error('倒计时结束,进去结算界面!');
                M_1.default.event.send(Event_1.Event.GameCMD.ShowGameResult, true);
            }
        }, 1, count - 1);
    };
    __decorate([
        property(cc.Node)
    ], OverHightLightCtrl.prototype, "countDownNode", void 0);
    __decorate([
        property(cc.Node)
    ], OverHightLightCtrl.prototype, "stepNode", void 0);
    __decorate([
        property(cc.Label)
    ], OverHightLightCtrl.prototype, "stepLabel", void 0);
    __decorate([
        property(cc.Label)
    ], OverHightLightCtrl.prototype, "countDownLabel", void 0);
    OverHightLightCtrl = __decorate([
        ccclass
    ], OverHightLightCtrl);
    return OverHightLightCtrl;
}(cc.Component));
exports.default = OverHightLightCtrl;

cc._RF.pop();