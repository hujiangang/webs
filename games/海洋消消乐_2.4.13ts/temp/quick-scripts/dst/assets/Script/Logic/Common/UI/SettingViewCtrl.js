
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/SettingViewCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcU2V0dGluZ1ZpZXdDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUF3RTtBQUN4RSw2Q0FBd0M7QUFFeEMsZ0RBQStDO0FBQy9DLG9DQUErQjtBQUMvQixzREFBdUQ7QUFDdkQsK0RBQThEO0FBQzlELDZEQUF3RDtBQUN4RCwwREFBcUQ7QUFFL0MsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNkMsbUNBQVk7SUFBekQ7UUFBQSxxRUEyRkM7UUF4Rkcsb0JBQWMsR0FBcUIsRUFBRSxDQUFDO1FBR3RDLGlCQUFXLEdBQXFCLEVBQUUsQ0FBQztRQUduQyxpQkFBVyxHQUFjLElBQUksQ0FBQztRQUc5QixvQkFBYyxHQUFjLElBQUksQ0FBQztRQUV6QixrQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixnQkFBVSxHQUFpQixJQUFJLENBQUM7UUFDaEMscUJBQWUsR0FBc0IsSUFBSSxDQUFDO1FBRTFDLFVBQUksR0FBbUMsSUFBSSxDQUFDOztJQXlFeEQsQ0FBQztJQXZFRyxnQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEgsQ0FBQztJQUVELCtCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRU0sdUNBQWEsR0FBcEI7UUFDSSxJQUFJLFdBQUMsQ0FBQyxPQUFPLENBQUMs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Tyw4Q0FBb0IsR0FBNUIsVUFBNkIsR0FBWTtRQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RCxXQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVPLDRDQUFrQixHQUExQixVQUEyQixHQUFZO1FBQ25DLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25FLFdBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBdkZEO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzJEQUNXO0lBR3RDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dEQUNRO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0RBQ1U7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsyREFDYTtJQVpoQixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBMkZuQztJQUFELHNCQUFDO0NBM0ZELEFBMkZDLENBM0Y0QyxFQUFFLENBQUMsU0FBUyxHQTJGeEQ7a0JBM0ZvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZVN0YXRlLCBOYXRpdmVLZXksIFNjZW5lIH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuLi8uLi8uLi9CYXNlL1V0aWxzL1V0aWxcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uL0NvbW1vblwiO1xuaW1wb3J0IHsgVUlIdWREZWYgfSBmcm9tIFwiLi4vLi4vRGF0YS9JbnRlcmZhY2UvVUlEYXRhXCI7XG5pbXBvcnQgeyBTdG9yYWdlTWdyIH0gZnJvbSBcIi4uLy4uLy4uL0Jhc2UvTWFuYWdlci9TdG9yYWdlTWdyXCI7XG5pbXBvcnQgUmVwb3J0TWdyIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvUmVwb3J0TWdyXCI7XG5pbXBvcnQgR2FtZU1vZGVsIGZyb20gXCIuLi8uLi9NYXRjaDMvTW9kZWwvR2FtZU1vZGVsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXR0aW5nVmlld0N0cmwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgc291bmRFZmZGcmFtZXM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIG11c2ljRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIG11c2ljU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBzb3VuZEVmZlNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2lzT3BlblBhdXNlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfYW5pbWF0aW9uOiBjYy5BbmltYXRpb24gPSBudWxsO1xuICAgIHByaXZhdGUgX2FuaW1hdGlvblN0YXRlOiBjYy5BbmltYXRpb25TdGF0ZSA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9vcHQ6IHsgZWZmOiBib29sZWFuLCBiZ206IGJvb2xlYW4gfSA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbiA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uU3RhdGUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikuZ2V0QW5pbWF0aW9uU3RhdGUodGhpcy5fYW5pbWF0aW9uLmRlZmF1bHRDbGlwLm5hbWUpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIG9uUmVzdGFydEdhbWUoKSB7XG4gICAgICAgIGlmIChNLnJ1bnRpbWUuR2FtZVN0YXRlIDw9IEdhbWVTdGF0ZS5QYXVzZSkge1xuICAgICAgICAgICAgTS5ydW50aW1lLlNlbGVjdExldmVsID0gTS5ydW50aW1lLkN1ckxldmVsO1xuICAgICAgICAgICAgdGhpcy5vblNob3dQYXVzZSgpO1xuICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LkdhbWVDTUQuR2FtZVJlc2V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkV4aXRHYW1lKCkge1xuICAgICAgICBNLnVpLmNsb3NlQWxsVUkoKTtcbiAgICAgICAgY29uc3QgdXNlU3RlcCA9IEdhbWVNb2RlbC5pbnMuc3RlcENvdW50IC0gR2FtZU1vZGVsLmlucy5zdGVwTGltaXQ7XG4gICAgICAgIFJlcG9ydE1nci5pbnMucmVwb3J0TWF0Y2hPdmVyKE0ucnVudGltZS5DdXJMZXZlbCwgZmFsc2UsIHVzZVN0ZXAsIE0ucnVudGltZS5NYXRjaEdhbWVUaW1lKTtcblxuICAgICAgICBNLnJ1bnRpbWUuU2VsZWN0TGV2ZWwgPSBNLnJ1bnRpbWUuQ3VyTGV2ZWw7XG4gICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5HYW1lQ01ELkdhbWVSZXNldCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uTXVzaWNPcHQoKSB7XG4gICAgICAgIHRoaXMuX29wdC5iZ20gPSAhdGhpcy5fb3B0LmJnbVxuICAgICAgICB0aGlzLl9jaGFuZ2VNdXNpY0J0blN0YXRlKHRoaXMuX29wdC5iZ20pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblNvdW5kRWZmT3B0KCkge1xuICAgICAgICB0aGlzLl9vcHQuZWZmID0gIXRoaXMuX29wdC5lZmZcbiAgICAgICAgdGhpcy5fY2hhbmdlRWZmQnRuU3RhdGUodGhpcy5fb3B0LmVmZik7XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2hvd1BhdXNlKCkge1xuICAgICAgICBpZiAoQ29tbW9uLmN1clNjZW5lID09IFNjZW5lLk1hdGNoICYmIE0ucnVudGltZS5HYW1lU3RhdGUgPT0gR2FtZVN0YXRlLnByZVJlYWR5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW5pdFNvdW5kT3B0KCk7XG4gICAgICAgIC8vIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuR2FtZVBhdXNlLCB7IHR5cGU6IFVJSHVkRGVmLkdhbWVQYXVzZSB9KTsgXG4gICAgICAgIHRoaXMuX2lzT3BlblBhdXNlID0gIXRoaXMuX2lzT3BlblBhdXNlO1xuICAgICAgICBpZiAoIXRoaXMuX2lzT3BlblBhdXNlKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25TdGF0ZS53cmFwTW9kZSA9IGNjLldyYXBNb2RlLlJldmVyc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25TdGF0ZS53cmFwTW9kZSA9IGNjLldyYXBNb2RlLk5vcm1hbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hbmltYXRpb25TdGF0ZS5wbGF5KCk7XG4gICAgfVxuXG4gICAgLyoq5bGV56S66IOM5YyFICovXG4gICAgcHVibGljIG9uU2hvd0JhZygpIHtcbiAgICAgICAgTS51aS5zaG93VUkoVUlIdWREZWYuQmFnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0U291bmRPcHQoKSB7XG4gICAgICAgIHRoaXMuX29wdCA9IDxhbnk+U3RvcmFnZU1nci5TdG9yYWdlLmdldE9iamVjdChOYXRpdmVLZXkuU291bmQsIHsgZWZmOiBmYWxzZSwgYmdtOiB0cnVlIH0pO1xuICAgICAgICB0aGlzLl9jaGFuZ2VNdXNpY0J0blN0YXRlKHRoaXMuX29wdC5iZ20pO1xuICAgICAgICB0aGlzLl9jaGFuZ2VFZmZCdG5TdGF0ZSh0aGlzLl9vcHQuZWZmKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jaGFuZ2VNdXNpY0J0blN0YXRlKG9wdDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLm11c2ljU3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5tdXNpY0ZyYW1lc1tvcHQgPyAwIDogMV07XG4gICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5Tb3VuZC5VcGRhdGVPcHQsICdiZ20nLCBvcHQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NoYW5nZUVmZkJ0blN0YXRlKG9wdDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnNvdW5kRWZmU3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zb3VuZEVmZkZyYW1lc1tvcHQgPyAwIDogMV07XG4gICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5Tb3VuZC5VcGRhdGVPcHQsICdlZmYnLCBvcHQpO1xuICAgIH1cbn1cbiJdfQ==