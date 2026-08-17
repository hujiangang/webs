
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/UI/PropItemCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '351b4fMa2ZMYajQIUvDZ90J', 'PropItemCtrl');
// Script/Logic/Match3/View/UI/PropItemCtrl.ts

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
var M_1 = require("../../../../Base/Manager/M");
var Event_1 = require("../../../Data/Const/Event");
var UIData_1 = require("../../../Data/Interface/UIData");
var Util_1 = require("../../../../Base/Utils/Util");
var Paths_1 = require("../../../../Base/Utils/Paths");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PropItemCtrl = /** @class */ (function (_super) {
    __extends(PropItemCtrl, _super);
    function PropItemCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.countLab = null;
        _this.icon = null;
        _this.addBtn = null;
        _this._type = null;
        return _this;
    }
    PropItemCtrl.prototype.onDestroy = function () {
        M_1.default.event.unRegister(Event_1.Event.UI.PropCount, this.onPropCountChanged, this);
    };
    PropItemCtrl.prototype.init = function (type, icon, count) {
        this._type = type;
        this.icon.spriteFrame = icon;
        this._showCount(count);
        M_1.default.event.register(Event_1.Event.UI.PropCount, this.onPropCountChanged, this);
    };
    //初始化 没有带道具icon
    PropItemCtrl.prototype.initOnlyType = function (type, count) {
        var _this = this;
        this._type = type;
        this._showCount(count);
        M_1.default.event.register(Event_1.Event.UI.PropCount, this.onPropCountChanged, this);
        Util_1.Util.Loader.loadSpriteFrame(Paths_1.default.getItemPath(type), function (err, texture) {
            if (texture && _this.icon)
                _this.icon.spriteFrame = texture;
        });
    };
    PropItemCtrl.prototype.onClick = function () {
        var propInfo = M_1.default.runtime.getPropData(this._type);
        if (propInfo && propInfo.count > 0) {
            M_1.default.event.send(Event_1.Event.GameCMD.PropClick, this._type);
        }
        else {
            // M.tips.show(WaringTips.PropNotEnough);
            //弹框购买!
            M_1.default.ui.showUI(UIData_1.UIHudDef.BuyProp, this._type);
        }
    };
    PropItemCtrl.prototype._showCount = function (count) {
        if (count <= 0) {
            this.addBtn.active = true;
            this.countLab.node.parent.active = false;
        }
        else {
            this.addBtn.active = false;
            this.countLab.string = count.toString();
            this.countLab.node.parent.active = true;
        }
    };
    PropItemCtrl.prototype.onPropCountChanged = function (type) {
        if (this._type == type) {
            var cd = M_1.default.runtime.getPropData(type);
            if (cd) {
                this.countLab.string = cd.count;
                this._showCount(cd.count);
            }
        }
    };
    __decorate([
        property(cc.Label)
    ], PropItemCtrl.prototype, "countLab", void 0);
    __decorate([
        property(cc.Sprite)
    ], PropItemCtrl.prototype, "icon", void 0);
    __decorate([
        property(cc.Node)
    ], PropItemCtrl.prototype, "addBtn", void 0);
    PropItemCtrl = __decorate([
        ccclass
    ], PropItemCtrl);
    return PropItemCtrl;
}(cc.Component));
exports.default = PropItemCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxVSVxcUHJvcEl0ZW1DdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUEyQztBQUMzQyxtREFBa0Q7QUFDbEQseURBQTBEO0FBQzFELG9EQUFtRDtBQUNuRCxzREFBaUQ7QUFFM0MsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFrRUM7UUEvREcsY0FBUSxHQUFhLElBQUksQ0FBQztRQUcxQixVQUFJLEdBQWMsSUFBSSxDQUFDO1FBR3ZCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFFZixXQUFLLEdBQWEsSUFBSSxDQUFDOztJQXVEbkMsQ0FBQztJQXJERyxnQ0FBUyxHQUFUO1FBQ0ksV0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3pFLENBQUM7SUFFTSwyQkFBSSxHQUFYLFVBQVksSUFBYyxFQUFFLElBQW9CLEVBQUUsS0FBYTtRQUMzRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixXQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELGVBQWU7SUFDUixtQ0FBWSxHQUFuQixVQUFvQixJQUFjLEVBQUUsS0FBYTtRQUFqRCxpQkFPQztRQU5HLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsV0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BFLFdBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLGVBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTztZQUM5RCxJQUFJLE9BQU8sSUFBSSxLQUFJLENBQUMsSUFBSTtnQkFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sOEJBQU8sR0FBZDtRQUNJLElBQU0sUUFBUSxHQUFHLFdBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRCxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNoQyxXQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckQ7YUFBTTtZQUNILHlDQUF5QztZQUN6QyxPQUFPO1lBQ1AsV0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsaUJBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdDO0lBQ0wsQ0FBQztJQUVPLGlDQUFVLEdBQWxCLFVBQW1CLEtBQWE7UUFDNUIsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQzVDO2FBQU07WUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQzNDO0lBQ0wsQ0FBQztJQUVPLHlDQUFrQixHQUExQixVQUEyQixJQUFjO1FBQ3JDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDcEIsSUFBTSxFQUFFLEdBQUcsV0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkMsSUFBSSxFQUFFLEVBQUU7Z0JBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDN0I7U0FDSjtJQUNMLENBQUM7SUE3REQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzhDQUNHO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ0s7SUFUTixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBa0VoQztJQUFELG1CQUFDO0NBbEVELEFBa0VDLENBbEV5QyxFQUFFLENBQUMsU0FBUyxHQWtFckQ7a0JBbEVvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvcFR5cGUsIFdhcmluZ1RpcHMgfSBmcm9tICcuLi8uLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50JztcbmltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IHsgVUlIdWREZWYgfSBmcm9tICcuLi8uLi8uLi9EYXRhL0ludGVyZmFjZS9VSURhdGEnO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gJy4uLy4uLy4uLy4uL0Jhc2UvVXRpbHMvVXRpbCc7XG5pbXBvcnQgUGF0aHMgZnJvbSAnLi4vLi4vLi4vLi4vQmFzZS9VdGlscy9QYXRocyc7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9wSXRlbUN0cmwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGNvdW50TGFiOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGljb246IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBhZGRCdG46IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfdHlwZTogUHJvcFR5cGUgPSBudWxsO1xuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuVUkuUHJvcENvdW50LCB0aGlzLm9uUHJvcENvdW50Q2hhbmdlZCwgdGhpcylcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdCh0eXBlOiBQcm9wVHlwZSwgaWNvbjogY2MuU3ByaXRlRnJhbWUsIGNvdW50OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuaWNvbi5zcHJpdGVGcmFtZSA9IGljb247XG4gICAgICAgIHRoaXMuX3Nob3dDb3VudChjb3VudCk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuVUkuUHJvcENvdW50LCB0aGlzLm9uUHJvcENvdW50Q2hhbmdlZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgLy/liJ3lp4vljJYg5rKh5pyJ5bim6YGT5YW3aWNvblxuICAgIHB1YmxpYyBpbml0T25seVR5cGUodHlwZTogUHJvcFR5cGUsIGNvdW50OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuX3Nob3dDb3VudChjb3VudCk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuVUkuUHJvcENvdW50LCB0aGlzLm9uUHJvcENvdW50Q2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIFV0aWwuTG9hZGVyLmxvYWRTcHJpdGVGcmFtZShQYXRocy5nZXRJdGVtUGF0aCh0eXBlKSwgKGVyciwgdGV4dHVyZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRleHR1cmUgJiYgdGhpcy5pY29uKSB0aGlzLmljb24uc3ByaXRlRnJhbWUgPSB0ZXh0dXJlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbGljaygpIHtcbiAgICAgICAgY29uc3QgcHJvcEluZm8gPSBNLnJ1bnRpbWUuZ2V0UHJvcERhdGEodGhpcy5fdHlwZSk7XG4gICAgICAgIGlmIChwcm9wSW5mbyAmJiBwcm9wSW5mby5jb3VudCA+IDApIHtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5HYW1lQ01ELlByb3BDbGljaywgdGhpcy5fdHlwZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBNLnRpcHMuc2hvdyhXYXJpbmdUaXBzLlByb3BOb3RFbm91Z2gpO1xuICAgICAgICAgICAgLy/lvLnmoYbotK3kubAhXG4gICAgICAgICAgICBNLnVpLnNob3dVSShVSUh1ZERlZi5CdXlQcm9wLCB0aGlzLl90eXBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3Nob3dDb3VudChjb3VudDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChjb3VudCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEJ0bi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jb3VudExhYi5ub2RlLnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQnRuLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jb3VudExhYi5zdHJpbmcgPSBjb3VudC50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5jb3VudExhYi5ub2RlLnBhcmVudC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblByb3BDb3VudENoYW5nZWQodHlwZTogUHJvcFR5cGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3R5cGUgPT0gdHlwZSkge1xuICAgICAgICAgICAgY29uc3QgY2QgPSBNLnJ1bnRpbWUuZ2V0UHJvcERhdGEodHlwZSk7XG4gICAgICAgICAgICBpZiAoY2QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50TGFiLnN0cmluZyA9IGNkLmNvdW50O1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dDb3VudChjZC5jb3VudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==