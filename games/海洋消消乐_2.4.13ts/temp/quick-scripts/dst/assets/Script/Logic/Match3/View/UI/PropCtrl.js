
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/UI/PropCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ec6de7rJXhK7pLWTMebmnWo', 'PropCtrl');
// Script/Logic/Match3/View/UI/PropCtrl.ts

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
var PropItemCtrl_1 = require("./PropItemCtrl");
var Constant_1 = require("../../../Data/Const/Constant");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PropCtrl = /** @class */ (function (_super) {
    __extends(PropCtrl, _super);
    function PropCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propItemPrefab = null;
        _this.propIcons = [];
        return _this;
    }
    PropCtrl.prototype.onLoad = function () {
    };
    PropCtrl.prototype.init = function () {
        for (var type = Constant_1.PropType.BeikeBomb; type <= Constant_1.PropType.Board; type++) {
            var data = M_1.default.runtime.getPropData(type) || { count: 0 };
            this._createItem(type, data.count);
        }
    };
    PropCtrl.prototype._createItem = function (type, count) {
        var item = M_1.default.nodePool.createItem(this.propItemPrefab);
        var itemCtrl = item.getComponent(PropItemCtrl_1.default);
        itemCtrl && itemCtrl.init(type, this.propIcons[type - 100], count);
        item.name = "item_" + type;
        item.parent = this.node;
    };
    __decorate([
        property(cc.Prefab)
    ], PropCtrl.prototype, "propItemPrefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], PropCtrl.prototype, "propIcons", void 0);
    PropCtrl = __decorate([
        ccclass
    ], PropCtrl);
    return PropCtrl;
}(cc.Component));
exports.default = PropCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxVSVxcUHJvcEN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0RBQTJDO0FBQzNDLCtDQUEwQztBQUMxQyx5REFBd0Q7QUFFbEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUEwQkM7UUF2Qkcsb0JBQWMsR0FBYyxJQUFJLENBQUM7UUFHakMsZUFBUyxHQUFxQixFQUFFLENBQUM7O0lBb0JyQyxDQUFDO0lBbEJHLHlCQUFNLEdBQU47SUFFQSxDQUFDO0lBRU0sdUJBQUksR0FBWDtRQUNJLEtBQUssSUFBSSxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxJQUFJLG1CQUFRLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ2hFLElBQU0sSUFBSSxHQUFHLFdBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3pELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN0QztJQUNMLENBQUM7SUFFTyw4QkFBVyxHQUFuQixVQUFvQixJQUFjLEVBQUUsS0FBYTtRQUM3QyxJQUFNLElBQUksR0FBRyxXQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDeEQsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBWSxDQUFDLENBQUM7UUFDakQsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQXRCRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO29EQUNhO0lBR2pDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDOytDQUNNO0lBTmhCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0EwQjVCO0lBQUQsZUFBQztDQTFCRCxBQTBCQyxDQTFCcUMsRUFBRSxDQUFDLFNBQVMsR0EwQmpEO2tCQTFCb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IE0gZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgUHJvcEl0ZW1DdHJsIGZyb20gXCIuL1Byb3BJdGVtQ3RybFwiO1xuaW1wb3J0IHsgUHJvcFR5cGUgfSBmcm9tICcuLi8uLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50JztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb3BDdHJsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgcHJvcEl0ZW1QcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBwcm9wSWNvbnM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KCkge1xuICAgICAgICBmb3IgKGxldCB0eXBlID0gUHJvcFR5cGUuQmVpa2VCb21iOyB0eXBlIDw9IFByb3BUeXBlLkJvYXJkOyB0eXBlKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBNLnJ1bnRpbWUuZ2V0UHJvcERhdGEodHlwZSkgfHwgeyBjb3VudDogMCB9O1xuICAgICAgICAgICAgdGhpcy5fY3JlYXRlSXRlbSh0eXBlLCBkYXRhLmNvdW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZUl0ZW0odHlwZTogUHJvcFR5cGUsIGNvdW50OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IE0ubm9kZVBvb2wuY3JlYXRlSXRlbSh0aGlzLnByb3BJdGVtUHJlZmFiKTtcbiAgICAgICAgY29uc3QgaXRlbUN0cmwgPSBpdGVtLmdldENvbXBvbmVudChQcm9wSXRlbUN0cmwpO1xuICAgICAgICBpdGVtQ3RybCAmJiBpdGVtQ3RybC5pbml0KHR5cGUsIHRoaXMucHJvcEljb25zW3R5cGUgLSAxMDBdLCBjb3VudCk7XG4gICAgICAgIGl0ZW0ubmFtZSA9IFwiaXRlbV9cIiArIHR5cGU7XG4gICAgICAgIGl0ZW0ucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgIH1cbn1cbiJdfQ==