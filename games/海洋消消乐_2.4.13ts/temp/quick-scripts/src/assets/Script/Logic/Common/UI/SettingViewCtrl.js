"use strict";
cc._RF.push(module, '506db6IhrpF84rzEkWUPbLC', 'SettingViewCtrl');
// Script/Logic/Common/UI/SettingViewCtrl.ts

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
var M_1 = require("../../../Base/Manager/M");
var Event_1 = require("../../Data/Const/Event");
var Common_1 = require("../Common");
var UIData_1 = require("../../Data/Interface/UIData");
var StorageMgr_1 = require("../../../Base/Manager/StorageMgr");
var ReportMgr_1 = require("../../../Base/Manager/ReportMgr");
var GameModel_1 = require("../../Match3/Model/GameModel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SettingViewCtrl = /** @class */ (function (_super) {
    __extends(SettingViewCtrl, _super);
    function SettingViewCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.soundEffFrames = [];
        _this.musicFrames = [];
        _this.musicSprite = null;
        _this.soundEffSprite = null;
        _this._isOpenPause = false;
        _this._animation = null;
        _this._animationState = null;
        _this._opt = null;
        return _this;
    }
    SettingViewCtrl.prototype.onLoad = function () {
        this._animation = this.node.getComponent(cc.Animation);
        this._animationState = this.node.getComponent(cc.Animation).getAnimationState(this._animation.defaultClip.name);
    };
    SettingViewCtrl.prototype.start = function () {
    };
    SettingViewCtrl.prototype.onRestartGame = function () {
        if (M_1.default.runtime.GameState <= Constant_1.GameState.Pause) {
            M_1.default.runtime.SelectLevel = M_1.default.runtime.CurLevel;
            this.onShowPause();
            M_1.default.event.send(Event_1.Event.GameCMD.GameReset);
        }
    };
    SettingViewCtrl.prototype.onExitGame = function () {
        M_1.default.ui.closeAllUI();
        var useStep = GameModel_1.default.ins.stepCount - GameModel_1.default.ins.stepLimit;
        ReportMgr_1.default.ins.reportMatchOver(M_1.default.runtime.CurLevel, false, useStep, M_1.default.runtime.MatchGameTime);
        M_1.default.runtime.SelectLevel = M_1.default.runtime.CurLevel;
        M_1.default.event.send(Event_1.Event.GameCMD.GameReset);
    };
    SettingViewCtrl.prototype.onMusicOpt = function () {
        this._opt.bgm = !this._opt.bgm;
        this._changeMusicBtnState(this._opt.bgm);
    };
    SettingViewCtrl.prototype.onSoundEffOpt = function () {
        this._opt.eff = !this._opt.eff;
        this._changeEffBtnState(this._opt.eff);
    };
    SettingViewCtrl.prototype.onShowPause = function () {
        if (Common_1.default.curScene == Constant_1.Scene.Match && M_1.default.runtime.GameState == Constant_1.GameState.preReady) {
            return;
        }
        this._initSoundOpt();
        // UIMgr.ins.showUI(UIHudDef.GamePause, { type: UIHudDef.GamePause }); 
        this._isOpenPause = !this._isOpenPause;
        if (!this._isOpenPause) {
            this._animationState.wrapMode = cc.WrapMode.Reverse;
        }
        else {
            this._animationState.wrapMode = cc.WrapMode.Normal;
        }
        this._animationState.play();
    };
    /**展示背包 */
    SettingViewCtrl.prototype.onShowBag = function () {
        M_1.default.ui.showUI(UIData_1.UIHudDef.Bag);
    };
    SettingViewCtrl.prototype._initSoundOpt = function () {
        this._opt = StorageMgr_1.StorageMgr.Storage.getObject(Constant_1.NativeKey.Sound, { eff: false, bgm: true });
        this._changeMusicBtnState(this._opt.bgm);
        this._changeEffBtnState(this._opt.eff);
    };
    SettingViewCtrl.prototype._changeMusicBtnState = function (opt) {
        this.musicSprite.spriteFrame = this.musicFrames[opt ? 0 : 1];
        M_1.default.event.send(Event_1.Event.Sound.UpdateOpt, 'bgm', opt);
    };
    SettingViewCtrl.prototype._changeEffBtnState = function (opt) {
        this.soundEffSprite.spriteFrame = this.soundEffFrames[opt ? 0 : 1];
        M_1.default.event.send(Event_1.Event.Sound.UpdateOpt, 'eff', opt);
    };
    __decorate([
        property([cc.SpriteFrame])
    ], SettingViewCtrl.prototype, "soundEffFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], SettingViewCtrl.prototype, "musicFrames", void 0);
    __decorate([
        property(cc.Sprite)
    ], SettingViewCtrl.prototype, "musicSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], SettingViewCtrl.prototype, "soundEffSprite", void 0);
    SettingViewCtrl = __decorate([
        ccclass
    ], SettingViewCtrl);
    return SettingViewCtrl;
}(cc.Component));
exports.default = SettingViewCtrl;

cc._RF.pop();