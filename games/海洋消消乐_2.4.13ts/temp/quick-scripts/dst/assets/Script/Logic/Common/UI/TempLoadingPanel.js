
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/TempLoadingPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcVGVtcExvYWRpbmdQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBMkQ7QUFDM0QsaURBQWdEO0FBQ2hELDJEQUFzRDtBQUN0RCxnREFBK0M7QUFDL0Msa0RBQTZDO0FBRXZDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQThDLG9DQUFNO0lBQXBEO1FBQUEscUVBNENDO1FBekNHLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsWUFBTSxHQUFjLElBQUksQ0FBQztRQUd6QixhQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLFlBQU0sR0FBcUIsRUFBRSxDQUFDOztJQWdDbEMsQ0FBQztJQTlCRyxpQ0FBTSxHQUFOO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxvQ0FBUyxHQUFUO1FBQ0ksa0JBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGFBQUssQ0FBQyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFFTyxxQ0FBVSxHQUFsQjtRQUNJLGtCQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsRUFBRSxDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzRixDQUFDO0lBRU8sb0NBQVMsR0FBakI7UUFDSSxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUFjLENBQUMsQ0FBQTtRQUN4QyxJQUFNLEtBQUssR0FBRyxXQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4RCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLHlCQUFjLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFHTyw0Q0FBaUIsR0FBekIsVUFBMEIsRUFBVTtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFHLENBQUM7SUFDOUMsQ0FBQztJQUVELGdDQUFLLEdBQUw7SUFFQSxDQUFDO0lBeENEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dURBQ1E7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztvREFDSztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3FEQUNNO0lBR3pCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29EQUNHO0lBWmIsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0E0Q3BDO0lBQUQsdUJBQUM7Q0E1Q0QsQUE0Q0MsQ0E1QzZDLGdCQUFNLEdBNENuRDtrQkE1Q29CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBMb2FkaW5nVGlwIH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VdGlscy9VdGlsXCI7XG5pbXBvcnQgRXZlbnRNZ3IgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvTWFuYWdlci9FdmVudE1nclwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IFVJQmFzZSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VSS9VSUJhc2VcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlbXBMb2FkaW5nUGFuZWwgZXh0ZW5kcyBVSUJhc2Uge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHRpcHNMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBzcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJvZ3JzczogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgZnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLl9pbml0VmlldygpO1xuICAgICAgICB0aGlzLl9pbml0RXZlbnQoKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIEV2ZW50TWdyLmlucy51blJlZ2lzdGVyKEV2ZW50LlVJLlVwZGF0ZVRtcExvYWRpbmdQcm9ncmVzcywgdGhpcy5fb25VcGRhdGVQcm9ncmVzcywgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdEV2ZW50KCkge1xuICAgICAgICBFdmVudE1nci5pbnMucmVnaXN0ZXIoRXZlbnQuVUkuVXBkYXRlVG1wTG9hZGluZ1Byb2dyZXNzLCB0aGlzLl9vblVwZGF0ZVByb2dyZXNzLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0VmlldygpIHtcbiAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKFRlbXBMb2FkaW5nVGlwKVxuICAgICAgICBjb25zdCBpbmRleCA9IFV0aWwuVG9vbC5yYW5nZUludCgwLCBrZXlzLmxlbmd0aCwgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5mcmFtZXNbaW5kZXhdO1xuICAgICAgICB0aGlzLnRpcHNMYWJlbC5zdHJpbmcgPSBUZW1wTG9hZGluZ1RpcFtpbmRleCArIDFdO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBfb25VcGRhdGVQcm9ncmVzcyhqZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucHJvZ3Jzcy5zdHJpbmcgPSBgJHtNYXRoLmNlaWwoamQpfSVgO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxufVxuIl19