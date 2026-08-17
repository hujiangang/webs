
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Hotel/ItemZIndex.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcSG90ZWxcXEl0ZW1aSW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBMkMsRUFBRSxDQUFDLFVBQVUsRUFBdEQsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsaUJBQWlCLHVCQUFrQixDQUFDO0FBRy9EO0lBQWdDLDhCQUFZO0lBQTVDO1FBQUEscUVBU0M7UUFORyxZQUFNLEdBQVcsQ0FBQyxDQUFDOztJQU12QixDQUFDO0lBSkcsMkJBQU0sR0FBTjtRQUNJLGtDQUFrQztRQUNsQyx5QkFBeUI7SUFDN0IsQ0FBQztJQUxEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7OENBQ0Y7SUFIVixVQUFVO1FBRnRCLE9BQU87UUFDUCxpQkFBaUI7T0FDTCxVQUFVLENBU3RCO0lBQUQsaUJBQUM7Q0FURCxBQVNDLENBVCtCLEVBQUUsQ0FBQyxTQUFTLEdBUzNDO0FBVFksZ0NBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBleGVjdXRlSW5FZGl0TW9kZSB9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5AZXhlY3V0ZUluRWRpdE1vZGVcbmV4cG9ydCBjbGFzcyBJdGVtWkluZGV4IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5JbnRlZ2VyKVxuICAgIHpJbmRleDogbnVtYmVyID0gMDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgLy8gdGhpcy5ub2RlLnpJbmRleCA9IHRoaXMuekluZGV4O1xuICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwic3Nzc1wiKTtcbiAgICB9XG59Il19