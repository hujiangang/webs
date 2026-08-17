
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/UI/UIBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxVSVxcVUlCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUEyQztBQUUzQyw0REFBNkQ7QUFDN0QsMkRBQTBEO0FBRXBELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDO0lBQTZDLDBCQUFZO0lBQXpEO1FBQUEscUVBaUdDO1FBaEdHLFlBQVk7UUFDSixpQkFBVyxHQUE0QixJQUFJLENBQUM7UUFFNUMsb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFJakMsWUFBTSxHQUFZLEtBQUssQ0FBQzs7SUF5Rm5DLENBQUM7SUF4RkcsNkVBQTZFO0lBQzdFLDhDQUE4QztJQUM5QyxxQkFBSSxHQUFKLFVBQUssTUFBTTtRQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELHdDQUF3QztJQUN4Qyx1QkFBTSxHQUFOO1FBQUEsaUJBTUM7UUFMRyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxDQUFxQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEVBQUUsRUFBRSxHQUFHO1lBQzdCLGtCQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNSLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsMEJBQVMsR0FBVDtRQUFBLGlCQVFDO1FBUEcsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBRSxFQUFFLEdBQUc7Z0JBQzdCLGtCQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUksQ0FBQyxDQUFDO1lBQzNDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNULElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDNUI7UUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELHlCQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsMEJBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsc0JBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsdUJBQU0sR0FBTixVQUFPLEVBQUU7UUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFDRCx3RkFBd0Y7SUFFeEYsZ0NBQWdDO0lBQ3pCLG1DQUFrQixHQUF6QixVQUEwQixTQUFtQixFQUFFLEVBQVk7UUFDdkQsa0JBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSw0QkFBVyxHQUFsQjtRQUNJLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVNLHVCQUFNLEdBQWIsVUFBYyxNQUFNO0lBRXBCLENBQUM7SUFFTSx5QkFBUSxHQUFmO0lBRUEsQ0FBQztJQUVNLDRCQUFXLEdBQWxCO0lBRUEsQ0FBQztJQUVNLHVCQUFNLEdBQWIsVUFBYyxhQUF3QjtRQUNsQyxJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUVwQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksaUJBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDdkMsdUJBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFTSx1QkFBTSxHQUFiO1FBQ0ksSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDL0IsQ0FBQztJQUVNLHdCQUFPLEdBQWQ7SUFFQSxDQUFDO0lBRU0seUJBQVEsR0FBZixVQUFnQixFQUFFO0lBRWxCLENBQUM7SUFFTSx3QkFBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDL0IsQ0FBQztJQWhHeUIsTUFBTTtRQURuQyxPQUFPO09BQ3NCLE1BQU0sQ0FpR25DO0lBQUQsYUFBQztDQWpHRCxBQWlHQyxDQWpHNEMsRUFBRSxDQUFDLFNBQVMsR0FpR3hEO2tCQWpHNkIsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudE1nciBmcm9tIFwiLi4vTWFuYWdlci9FdmVudE1nclwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vTG9naWMvRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IHsgVUlIdWREZWYgfSBmcm9tIFwiLi4vLi4vTG9naWMvRGF0YS9JbnRlcmZhY2UvVUlEYXRhXCI7XG5pbXBvcnQgeyBHdWlkZVV0aWxzIH0gZnJvbSBcIi4uLy4uLy4uL0dvZEd1aWRlL0d1aWRlVXRpbHNcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBVSUJhc2UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIC8qKumAmuefpeS6i+S7tuWIl+ihqCAqL1xuICAgIHByaXZhdGUgdWlFdmVudExpc3Q6IE1hcDxFdmVudC5VSSwgRnVuY3Rpb24+ID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2Nsb3NlQ2FsbEJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcblxuICAgIHB1YmxpYyB1aUh1ZERlZjogVUlIdWREZWY7XG5cbiAgICBwdWJsaWMgaXNTaG93OiBib29sZWFuID0gZmFsc2U7XG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0g5Lul5LiL5pa55rOV5LiN6IO95Zyo5a2Q57G76YeN5YaZIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gICAgLyoq5Yid5aeL5YyW5Ye95pWw77yM5Zyob25Mb2Fk5LmL5YmN6KKr6LCD55So77yMcGFyYW1z5Li65omT5byAdWnml7bkvKDlhaXnmoTkuI3lrprlj4LmlbDmlbDnu4QgKi9cbiAgICBpbml0KHBhcmFtcykge1xuICAgICAgICB0aGlzLm9uSW5pdChwYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKm9uTG9hZCDkvJrlnKjnu4Tku7booqvpppbmrKHliqDovb3nmoTml7blgJnooqvlm57osIPjgILkuJTkvJjlhYjkuo7ku7vkvZVzdGFydCAqL1xuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy51aUV2ZW50TGlzdCA9IG5ldyBNYXA8RXZlbnQuVUksIEZ1bmN0aW9uPih0aGlzLmluaXRVSUV2ZW50KCkpO1xuICAgICAgICB0aGlzLnVpRXZlbnRMaXN0LmZvckVhY2goKGNiLCBrZXkpID0+IHtcbiAgICAgICAgICAgIEV2ZW50TWdyLmlucy5yZWdpc3RlcihrZXksIGNiLCB0aGlzKTtcbiAgICAgICAgfSwgdGhpcylcbiAgICAgICAgdGhpcy5vblVJTG9hZCgpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMudWlFdmVudExpc3QpIHtcbiAgICAgICAgICAgIHRoaXMudWlFdmVudExpc3QuZm9yRWFjaCgoY2IsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIEV2ZW50TWdyLmlucy51blJlZ2lzdGVyKGtleSwgY2IsIHRoaXMpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnVpRXZlbnRMaXN0LmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vblVJRGVzdHJveSgpO1xuICAgIH1cblxuICAgIG9uRW5hYmxlKCkge1xuICAgIH1cblxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5vbkhpZGUoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5vblN0YXJ0KCk7XG4gICAgfVxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIHRoaXMub25VcGRhdGUoZHQpO1xuICAgIH1cbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgICAvKirms6jlhoxub3RpY2Xkuovku7bvvIxkaXNhYmxl55qE5pe25YCZ5Lya6Ieq5Yqo56e76ZmkICovXG4gICAgcHVibGljIGFkZFVJRXZlbnRMaXN0ZW5lcihldmVudE5hbWU6IEV2ZW50LlVJLCBjYjogRnVuY3Rpb24pIHtcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnJlZ2lzdGVyKGV2ZW50TmFtZSwgY2IsIHRoaXMpO1xuICAgICAgICB0aGlzLnVpRXZlbnRMaXN0LnNldChldmVudE5hbWUsIGNiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdFVJRXZlbnQoKTogQXJyYXk8W0V2ZW50LlVJLCBGdW5jdGlvbl0+IHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkluaXQocGFyYW1zKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgb25VSUxvYWQoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgb25VSURlc3Ryb3koKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgb25TaG93KGNsb3NlQ2FsbEJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLl9jbG9zZUNhbGxCYWNrID0gY2xvc2VDYWxsQmFjaztcblxuICAgICAgICBpZiAodGhpcy51aUh1ZERlZiA9PSBVSUh1ZERlZi5HYW1lT3Zlcldpbikge1xuICAgICAgICAgICAgR3VpZGVVdGlscy5jaGVja0d1aWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25IaWRlKCkge1xuICAgICAgICB0aGlzLl9jbG9zZUNhbGxCYWNrICYmIHRoaXMuX2Nsb3NlQ2FsbEJhY2soKTtcbiAgICAgICAgdGhpcy5fY2xvc2VDYWxsQmFjayA9IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIG9uU3RhcnQoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgb25VcGRhdGUoZHQpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsb3NlKCkge1xuICAgICAgICB0aGlzLl9jbG9zZUNhbGxCYWNrICYmIHRoaXMuX2Nsb3NlQ2FsbEJhY2soKTtcbiAgICAgICAgdGhpcy5fY2xvc2VDYWxsQmFjayA9IG51bGw7XG4gICAgfVxufSJdfQ==