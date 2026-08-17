
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/BaseItemView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '34a4cLF1UpPlKOTUJ4WfmLg', 'BaseItemView');
// Script/Logic/Match3/View/BaseItemView.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BaseItemView = /** @class */ (function (_super) {
    __extends(BaseItemView, _super);
    function BaseItemView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = null;
        return _this;
    }
    BaseItemView.prototype.init = function (model) {
        this.model = model;
    };
    BaseItemView = __decorate([
        ccclass
    ], BaseItemView);
    return BaseItemView;
}(cc.Component));
exports.default = BaseItemView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxCYXNlSXRlbVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNkMsZ0NBQVk7SUFBekQ7UUFBQSxxRUFRQztRQU5hLFdBQUssR0FBTSxJQUFJLENBQUM7O0lBTTlCLENBQUM7SUFKVSwyQkFBSSxHQUFYLFVBQVksS0FBUTtRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBTmdCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FRaEM7SUFBRCxtQkFBQztDQVJELEFBUUMsQ0FSNEMsRUFBRSxDQUFDLFNBQVMsR0FReEQ7a0JBUm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlSXRlbVZpZXc8VD4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgcHJvdGVjdGVkIG1vZGVsOiBUID0gbnVsbDtcblxuICAgIHB1YmxpYyBpbml0KG1vZGVsOiBUKSB7XG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB9XG5cbn1cbiJdfQ==