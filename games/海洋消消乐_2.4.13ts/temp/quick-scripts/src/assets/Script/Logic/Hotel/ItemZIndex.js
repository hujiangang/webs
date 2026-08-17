"use strict";
cc._RF.push(module, 'b3722ognK9IMJHqoHDb5MBs', 'ItemZIndex');
// Script/Logic/Hotel/ItemZIndex.ts

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
exports.ItemZIndex = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
var ItemZIndex = /** @class */ (function (_super) {
    __extends(ItemZIndex, _super);
    function ItemZIndex() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.zIndex = 0;
        return _this;
    }
    ItemZIndex.prototype.onLoad = function () {
        // this.node.zIndex = this.zIndex;
        // console.error("ssss");
    };
    __decorate([
        property(cc.Integer)
    ], ItemZIndex.prototype, "zIndex", void 0);
    ItemZIndex = __decorate([
        ccclass,
        executeInEditMode
    ], ItemZIndex);
    return ItemZIndex;
}(cc.Component));
exports.ItemZIndex = ItemZIndex;

cc._RF.pop();