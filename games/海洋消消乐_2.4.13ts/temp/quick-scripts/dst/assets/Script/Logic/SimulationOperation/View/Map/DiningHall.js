
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/SimulationOperation/View/Map/DiningHall.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9cf99WPNKRITKn63x49g3kT', 'DiningHall');
// Script/Logic/SimulationOperation/View/Map/DiningHall.ts

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
var Exchange_1 = require("./Exchange");
var SpinePlayerCtrl_1 = require("../../../../Base/CustomComponent/SpinePlayerCtrl");
var EventMgr_1 = require("../../../../Base/Manager/EventMgr");
var Event_1 = require("../../../Data/Const/Event");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DiningHall = /** @class */ (function (_super) {
    __extends(DiningHall, _super);
    function DiningHall() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiningHall.prototype.onLoad = function () {
        var _this = this;
        var exchange = this.node.getComponent(Exchange_1.default);
        cc.loader.loadRes('prefab/map/canting/canting', cc.Prefab, function (err, prefab) {
            if (!err) {
                var node = cc.instantiate(prefab);
                _this.node.addChild(node);
                var sp = _this.sp = node.getComponentInChildren(SpinePlayerCtrl_1.default);
                sp.play("dianmian_jinzhi" + (exchange.state + 1), 0);
                EventMgr_1.default.ins.register(Event_1.Event.Map.Upgrade, _this.exchangeState, _this);
            }
        });
    };
    DiningHall.prototype.onDestroy = function () {
        EventMgr_1.default.ins.unRegister(Event_1.Event.Map.Upgrade, this.exchangeState, this);
    };
    DiningHall.prototype.exchangeState = function (state) {
        var exchange = this.node.getComponent(Exchange_1.default);
        this.sp.play(state == 1 ? 'dianmian' : 'dianmian2', 0, false, function () {
            exchange.inAnim = false;
        });
    };
    DiningHall.prototype.showState = function (state) {
        this.sp.play("dianmian_jinzhi" + (state + 1), 0);
    };
    DiningHall.prototype.start = function () {
    };
    DiningHall = __decorate([
        ccclass
    ], DiningHall);
    return DiningHall;
}(cc.Component));
exports.default = DiningHall;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcU2ltdWxhdGlvbk9wZXJhdGlvblxcVmlld1xcTWFwXFxEaW5pbmdIYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFrQztBQUNsQyxvRkFBK0U7QUFDL0UsOERBQXlEO0FBQ3pELG1EQUFrRDtBQUU1QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF3Qyw4QkFBWTtJQUFwRDs7SUFxQ0EsQ0FBQztJQWxDRywyQkFBTSxHQUFOO1FBQUEsaUJBWUM7UUFYRyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUM7UUFDaEQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFpQjtZQUM5RSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNOLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xDLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUV6QixJQUFJLEVBQUUsR0FBRyxLQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyx5QkFBZSxDQUFDLENBQUM7Z0JBQ2hFLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQWtCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELGtCQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsYUFBYSxFQUFFLEtBQUksQ0FBQyxDQUFDO2FBQ3RFO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsOEJBQVMsR0FBVDtRQUNJLGtCQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxhQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFTyxrQ0FBYSxHQUFyQixVQUFzQixLQUFhO1FBQy9CLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFRLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFO1lBQzFELFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLDhCQUFTLEdBQWpCLFVBQWtCLEtBQWE7UUFDM0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQWtCLEtBQUssR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsMEJBQUssR0FBTDtJQUVBLENBQUM7SUFsQ2dCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FxQzlCO0lBQUQsaUJBQUM7Q0FyQ0QsQUFxQ0MsQ0FyQ3VDLEVBQUUsQ0FBQyxTQUFTLEdBcUNuRDtrQkFyQ29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXhjaGFuZ2UgZnJvbSBcIi4vRXhjaGFuZ2VcIjtcbmltcG9ydCBTcGluZVBsYXllckN0cmwgZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvQ3VzdG9tQ29tcG9uZW50L1NwaW5lUGxheWVyQ3RybFwiO1xuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL01hbmFnZXIvRXZlbnRNZ3JcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpbmluZ0hhbGwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgcHJpdmF0ZSBzcDogU3BpbmVQbGF5ZXJDdHJsO1xuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgbGV0IGV4Y2hhbmdlID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChFeGNoYW5nZSk7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKCdwcmVmYWIvbWFwL2NhbnRpbmcvY2FudGluZycsIGNjLlByZWZhYiwgKGVyciwgcHJlZmFiOiBjYy5QcmVmYWIpID0+IHtcbiAgICAgICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcblxuICAgICAgICAgICAgICAgIGxldCBzcCA9IHRoaXMuc3AgPSBub2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oU3BpbmVQbGF5ZXJDdHJsKTtcbiAgICAgICAgICAgICAgICBzcC5wbGF5KGBkaWFubWlhbl9qaW56aGkke2V4Y2hhbmdlLnN0YXRlICsgMX1gLCAwKTtcbiAgICAgICAgICAgICAgICBFdmVudE1nci5pbnMucmVnaXN0ZXIoRXZlbnQuTWFwLlVwZ3JhZGUsIHRoaXMuZXhjaGFuZ2VTdGF0ZSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBFdmVudE1nci5pbnMudW5SZWdpc3RlcihFdmVudC5NYXAuVXBncmFkZSwgdGhpcy5leGNoYW5nZVN0YXRlLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGV4Y2hhbmdlU3RhdGUoc3RhdGU6IG51bWJlcikge1xuICAgICAgICBsZXQgZXhjaGFuZ2UgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KEV4Y2hhbmdlKTtcbiAgICAgICAgdGhpcy5zcC5wbGF5KHN0YXRlID09IDEgPyAnZGlhbm1pYW4nIDogJ2RpYW5taWFuMicsIDAsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICBleGNoYW5nZS5pbkFuaW0gPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93U3RhdGUoc3RhdGU6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNwLnBsYXkoYGRpYW5taWFuX2ppbnpoaSR7c3RhdGUgKyAxfWAsIDApO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==