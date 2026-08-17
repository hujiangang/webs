
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Hotel/HotelViewCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'becb3ZRwRNHxbWxObmwUma6', 'HotelViewCtrl');
// Script/Logic/Hotel/HotelViewCtrl.ts

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
var M_1 = require("../../Base/Manager/M");
var UIData_1 = require("../Data/Interface/UIData");
var CloudView_1 = require("../SimulationOperation/View/Map/CloudView");
var HotelUiCtrl_1 = require("./HotelUiCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HotelViewCtrl = /** @class */ (function (_super) {
    __extends(HotelViewCtrl, _super);
    function HotelViewCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollView = null;
        _this.mainView = null;
        _this.topBox = null;
        _this._isTouchTopBox = false;
        _this._boxOrginPosY = null;
        return _this;
    }
    HotelViewCtrl.prototype.onLoad = function () {
        var _this = this;
        this.topBox.on(cc.Node.EventType.TOUCH_START, this.onTopBoxClick, this);
        this.node.on('bounce-top', this._onBounceTop, this);
        this.scheduleOnce(function () {
            if (!_this._boxOrginPosY) {
                _this._boxOrginPosY = _this.topBox.y;
            }
        }, 0.3);
    };
    HotelViewCtrl.prototype.init = function () {
        if (this._boxOrginPosY) {
            this.topBox.y = this._boxOrginPosY;
        }
    };
    HotelViewCtrl.prototype.onTopBoxClick = function () {
        this._isTouchTopBox = true;
    };
    HotelViewCtrl.prototype._cancelBoxClick = function () {
        this._isTouchTopBox = false;
        console.error('_cancelBoxClick');
    };
    /**顶部回弹 */
    HotelViewCtrl.prototype._onBounceTop = function () {
        var _this = this;
        if (this._isTouchTopBox) {
            var a0 = cc.moveTo(0.2, cc.v2(0, this.topBox.y - 50));
            var a1 = cc.moveTo(0.1, cc.v2(0, this.topBox.y + 100));
            var a2 = cc.callFunc(function () {
                M_1.default.ui.showUI(UIData_1.UIHudDef.CloudView, CloudView_1.ICloudData.OpenHotel, function () {
                    //开
                    _this.node.active = false;
                    _this.mainView.active = true;
                    _this.mainView.getComponent(HotelUiCtrl_1.default).initBottomBoxPosition();
                }, function () {
                    //关 
                });
            });
            this.topBox.runAction(cc.sequence(a0, a1, a2));
        }
        this._cancelBoxClick();
    };
    __decorate([
        property(cc.ScrollView)
    ], HotelViewCtrl.prototype, "scrollView", void 0);
    __decorate([
        property(cc.Node)
    ], HotelViewCtrl.prototype, "mainView", void 0);
    __decorate([
        property(cc.Node)
    ], HotelViewCtrl.prototype, "topBox", void 0);
    HotelViewCtrl = __decorate([
        ccclass
    ], HotelViewCtrl);
    return HotelViewCtrl;
}(cc.Component));
exports.default = HotelViewCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcSG90ZWxcXEhvdGVsVmlld0N0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQXFDO0FBQ3JDLG1EQUFvRDtBQUNwRCx1RUFBdUU7QUFDdkUsNkNBQXdDO0FBRWxDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBNkRDO1FBMURHLGdCQUFVLEdBQWtCLElBQUksQ0FBQztRQUdqQyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFFZixvQkFBYyxHQUFZLEtBQUssQ0FBQztRQUNoQyxtQkFBYSxHQUFXLElBQUksQ0FBQzs7SUFpRHpDLENBQUM7SUEvQ0csOEJBQU0sR0FBTjtRQUFBLGlCQVNDO1FBUkcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFcEQsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLElBQUksQ0FBQyxLQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNyQixLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO1FBQ0wsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVNLDRCQUFJLEdBQVg7UUFDSSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUN0QztJQUNMLENBQUM7SUFFTSxxQ0FBYSxHQUFwQjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFFTyx1Q0FBZSxHQUF2QjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUVyQyxDQUFDO0lBRUQsVUFBVTtJQUNGLG9DQUFZLEdBQXBCO1FBQUEsaUJBaUJDO1FBaEJHLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQixJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDekQsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDbkIsV0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsaUJBQVEsQ0FBQyxTQUFTLEVBQUUsc0JBQVUsQ0FBQyxTQUFTLEVBQUU7b0JBQ2xELEdBQUc7b0JBQ0gsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUN6QixLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQzVCLEtBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLHFCQUFXLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUNwRSxDQUFDLEVBQUU7b0JBQ0MsSUFBSTtnQkFDUixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFBO1lBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbEQ7UUFDRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQXhERDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO3FEQUNTO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ087SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDSztJQVROLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0E2RGpDO0lBQUQsb0JBQUM7Q0E3REQsQUE2REMsQ0E3RDBDLEVBQUUsQ0FBQyxTQUFTLEdBNkR0RDtrQkE3RG9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTSBmcm9tIFwiLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IFVJSHVkRGVmIH0gZnJvbSBcIi4uL0RhdGEvSW50ZXJmYWNlL1VJRGF0YVwiO1xuaW1wb3J0IHsgSUNsb3VkRGF0YSB9IGZyb20gXCIuLi9TaW11bGF0aW9uT3BlcmF0aW9uL1ZpZXcvTWFwL0Nsb3VkVmlld1wiO1xuaW1wb3J0IEhvdGVsVWlDdHJsIGZyb20gXCIuL0hvdGVsVWlDdHJsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb3RlbFZpZXdDdHJsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5TY3JvbGxWaWV3KVxuICAgIHNjcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXcgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbWFpblZpZXc6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgdG9wQm94OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2lzVG91Y2hUb3BCb3g6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9ib3hPcmdpblBvc1k6IG51bWJlciA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMudG9wQm94Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG9wQm94Q2xpY2ssIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oJ2JvdW5jZS10b3AnLCB0aGlzLl9vbkJvdW5jZVRvcCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9ib3hPcmdpblBvc1kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ib3hPcmdpblBvc1kgPSB0aGlzLnRvcEJveC55O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAwLjMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KCkge1xuICAgICAgICBpZiAodGhpcy5fYm94T3JnaW5Qb3NZKSB7XG4gICAgICAgICAgICB0aGlzLnRvcEJveC55ID0gdGhpcy5fYm94T3JnaW5Qb3NZO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uVG9wQm94Q2xpY2soKSB7XG4gICAgICAgIHRoaXMuX2lzVG91Y2hUb3BCb3ggPSB0cnVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NhbmNlbEJveENsaWNrKCkge1xuICAgICAgICB0aGlzLl9pc1RvdWNoVG9wQm94ID0gZmFsc2U7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ19jYW5jZWxCb3hDbGljaycpO1xuXG4gICAgfVxuXG4gICAgLyoq6aG26YOo5Zue5by5ICovXG4gICAgcHJpdmF0ZSBfb25Cb3VuY2VUb3AoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc1RvdWNoVG9wQm94KSB7XG4gICAgICAgICAgICBjb25zdCBhMCA9IGNjLm1vdmVUbygwLjIsIGNjLnYyKDAsIHRoaXMudG9wQm94LnkgLSA1MCkpO1xuICAgICAgICAgICAgY29uc3QgYTEgPSBjYy5tb3ZlVG8oMC4xLCBjYy52MigwLCB0aGlzLnRvcEJveC55ICsgMTAwKSk7XG4gICAgICAgICAgICBjb25zdCBhMiA9IGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgICAgICBNLnVpLnNob3dVSShVSUh1ZERlZi5DbG91ZFZpZXcsIElDbG91ZERhdGEuT3BlbkhvdGVsLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8v5byAXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluVmlldy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW5WaWV3LmdldENvbXBvbmVudChIb3RlbFVpQ3RybCkuaW5pdEJvdHRvbUJveFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL+WFsyBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLnRvcEJveC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYTAsIGExLCBhMikpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NhbmNlbEJveENsaWNrKCk7XG4gICAgfVxuXG59XG4iXX0=