
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/BagGridItemCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ad0e8kmbSFK3arO+Qs17gWK', 'BagGridItemCtrl');
// Script/Logic/Common/UI/BagGridItemCtrl.ts

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
var M_1 = require("../../../Base/Manager/M");
var Event_1 = require("../../Data/Const/Event");
var Common_1 = require("../Common");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BagGridItemCtrl = /** @class */ (function (_super) {
    __extends(BagGridItemCtrl, _super);
    function BagGridItemCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.icon = null;
        _this.count = null;
        // private _propInfo: PropInfo = null
        _this._type = null;
        _this._data = null;
        return _this;
    }
    BagGridItemCtrl.prototype.onLoad = function () {
        M_1.default.event.register(Event_1.Event.UI.PropCount, this.updatePorpCount, this);
    };
    BagGridItemCtrl.prototype.onDestroy = function () {
        M_1.default.event.unRegister(Event_1.Event.UI.PropCount, this.updatePorpCount, this);
    };
    BagGridItemCtrl.prototype.init = function (type, data, frame) {
        this.icon.spriteFrame = frame;
        this._type = type;
        this._data = data;
        this.count.string = data.count.toString();
        // this._propInfo = M.table.PropInfo.getByPrimaryKey(type);
        this.icon.enabled = data.count > 0;
    };
    BagGridItemCtrl.prototype.onClick = function () {
        M_1.default.event.send(Event_1.Event.UI.ShowBagTips, this._type, Common_1.default.getWorldPos(this.node), this._data.count);
    };
    BagGridItemCtrl.prototype.updatePorpCount = function (type) {
        if (type === this._type) {
            this.count.string = M_1.default.runtime.getPropData(type).count;
            this.icon.enabled = M_1.default.runtime.getPropData(type).count > 0;
        }
    };
    __decorate([
        property(cc.Sprite)
    ], BagGridItemCtrl.prototype, "icon", void 0);
    __decorate([
        property(cc.Label)
    ], BagGridItemCtrl.prototype, "count", void 0);
    BagGridItemCtrl = __decorate([
        ccclass
    ], BagGridItemCtrl);
    return BagGridItemCtrl;
}(cc.Component));
exports.default = BagGridItemCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcQmFnR3JpZEl0ZW1DdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDZDQUF3QztBQUN4QyxnREFBK0M7QUFDL0Msb0NBQStCO0FBRXpCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTZDLG1DQUFZO0lBQXpEO1FBQUEscUVBd0NDO1FBckNHLFVBQUksR0FBYyxJQUFJLENBQUM7UUFHdkIsV0FBSyxHQUFhLElBQUksQ0FBQztRQUV2QixxQ0FBcUM7UUFDN0IsV0FBSyxHQUFhLElBQUksQ0FBQztRQUN2QixXQUFLLEdBQUcsSUFBSSxDQUFDOztJQThCekIsQ0FBQztJQTNCRyxnQ0FBTSxHQUFOO1FBQ0ksV0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsbUNBQVMsR0FBVDtRQUNJLFdBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLGFBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVNLDhCQUFJLEdBQVgsVUFBWSxJQUFjLEVBQUUsSUFBdUIsRUFBRSxLQUFxQjtRQUN0RSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQywyREFBMkQ7UUFDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLGlDQUFPLEdBQWQ7UUFDSSxXQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLGdCQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUFFTSx5Q0FBZSxHQUF0QixVQUF1QixJQUFjO1FBQ2pDLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsV0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDN0Q7SUFDTCxDQUFDO0lBcENEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ0c7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDSTtJQU5OLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0F3Q25DO0lBQUQsc0JBQUM7Q0F4Q0QsQUF3Q0MsQ0F4QzRDLEVBQUUsQ0FBQyxTQUFTLEdBd0N4RDtrQkF4Q29CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9wVHlwZSB9IGZyb20gXCIuLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5pbXBvcnQgUHJvcEluZm8gZnJvbSBcIi4uLy4uLy4uL0Jhc2UvVGFibHMvUHJvcEluZm9cIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IENvbW1vbiBmcm9tIFwiLi4vQ29tbW9uXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWdHcmlkSXRlbUN0cmwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBpY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGNvdW50OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICAvLyBwcml2YXRlIF9wcm9wSW5mbzogUHJvcEluZm8gPSBudWxsXG4gICAgcHJpdmF0ZSBfdHlwZTogUHJvcFR5cGUgPSBudWxsO1xuICAgIHByaXZhdGUgX2RhdGEgPSBudWxsO1xuXG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuVUkuUHJvcENvdW50LCB0aGlzLnVwZGF0ZVBvcnBDb3VudCwgdGhpcyk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuVUkuUHJvcENvdW50LCB0aGlzLnVwZGF0ZVBvcnBDb3VudCwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQodHlwZTogUHJvcFR5cGUsIGRhdGE6IHsgY291bnQ6IG51bWJlciB9LCBmcmFtZTogY2MuU3ByaXRlRnJhbWUpIHtcbiAgICAgICAgdGhpcy5pY29uLnNwcml0ZUZyYW1lID0gZnJhbWU7XG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5jb3VudC5zdHJpbmcgPSBkYXRhLmNvdW50LnRvU3RyaW5nKCk7XG4gICAgICAgIC8vIHRoaXMuX3Byb3BJbmZvID0gTS50YWJsZS5Qcm9wSW5mby5nZXRCeVByaW1hcnlLZXkodHlwZSk7XG4gICAgICAgIHRoaXMuaWNvbi5lbmFibGVkID0gIGRhdGEuY291bnQgPiAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsaWNrKCkge1xuICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuVUkuU2hvd0JhZ1RpcHMsIHRoaXMuX3R5cGUsIENvbW1vbi5nZXRXb3JsZFBvcyh0aGlzLm5vZGUpLCB0aGlzLl9kYXRhLmNvdW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlUG9ycENvdW50KHR5cGU6IFByb3BUeXBlKSB7XG4gICAgICAgIGlmICh0eXBlID09PSB0aGlzLl90eXBlKSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50LnN0cmluZyA9IE0ucnVudGltZS5nZXRQcm9wRGF0YSh0eXBlKS5jb3VudDtcbiAgICAgICAgICAgIHRoaXMuaWNvbi5lbmFibGVkID0gTS5ydW50aW1lLmdldFByb3BEYXRhKHR5cGUpLmNvdW50ID4gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==