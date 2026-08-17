
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/MoreCoin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7d8f30zJBhEor6VWQiX3GJ4', 'MoreCoin');
// Script/Logic/Common/UI/MoreCoin.ts

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
var UIBase_1 = require("../../../Base/UI/UIBase");
var UIMgr_1 = require("../../../Base/Manager/UIMgr");
var UIData_1 = require("../../Data/Interface/UIData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MoreCoin = /** @class */ (function (_super) {
    __extends(MoreCoin, _super);
    function MoreCoin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contentLabel = null;
        _this._animation = null;
        return _this;
    }
    MoreCoin.prototype.onInit = function () {
        if (!this._animation) {
            this._animation = this.getComponent(cc.Animation);
        }
        this._animation.play('moreCoin');
    };
    MoreCoin.prototype.onGo = function () {
        UIMgr_1.default.ins.hideUI(UIData_1.UIHudDef.MoreCoin);
        UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.SelectShowTarget, { type: UIData_1.UIHudDef.SelectShowTarget, data: null });
    };
    MoreCoin.prototype.onNotGo = function () {
        UIMgr_1.default.ins.hideUI(UIData_1.UIHudDef.MoreCoin);
    };
    __decorate([
        property(cc.Label)
    ], MoreCoin.prototype, "contentLabel", void 0);
    MoreCoin = __decorate([
        ccclass
    ], MoreCoin);
    return MoreCoin;
}(UIBase_1.default));
exports.default = MoreCoin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcTW9yZUNvaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQTZDO0FBQzdDLHFEQUFnRDtBQUNoRCxzREFBdUQ7QUFFakQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBc0MsNEJBQU07SUFBNUM7UUFBQSxxRUF3QkM7UUFyQkcsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFHdEIsZ0JBQVUsR0FBaUIsSUFBSSxDQUFDOztJQWtCNUMsQ0FBQztJQWhCRyx5QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNyRDtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSx1QkFBSSxHQUFYO1FBQ0ksZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxlQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxpQkFBUSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFRLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDakcsQ0FBQztJQUVNLDBCQUFPLEdBQWQ7UUFDSSxlQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxpQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFuQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDVztJQUhiLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0F3QjVCO0lBQUQsZUFBQztDQXhCRCxBQXdCQyxDQXhCcUMsZ0JBQU0sR0F3QjNDO2tCQXhCb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVSUJhc2UgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvVUkvVUlCYXNlXCI7XG5pbXBvcnQgVUlNZ3IgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvTWFuYWdlci9VSU1nclwiO1xuaW1wb3J0IHsgVUlIdWREZWYgfSBmcm9tIFwiLi4vLi4vRGF0YS9JbnRlcmZhY2UvVUlEYXRhXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3JlQ29pbiBleHRlbmRzIFVJQmFzZSB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgY29udGVudExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cblxuICAgIHByaXZhdGUgX2FuaW1hdGlvbjogY2MuQW5pbWF0aW9uID0gbnVsbDtcblxuICAgIG9uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbmltYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbiA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoJ21vcmVDb2luJyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uR28oKSB7XG4gICAgICAgIFVJTWdyLmlucy5oaWRlVUkoVUlIdWREZWYuTW9yZUNvaW4pO1xuICAgICAgICBVSU1nci5pbnMuc2hvd1VJKFVJSHVkRGVmLlNlbGVjdFNob3dUYXJnZXQsIHsgdHlwZTogVUlIdWREZWYuU2VsZWN0U2hvd1RhcmdldCwgZGF0YTogbnVsbCB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25Ob3RHbygpIHtcbiAgICAgICAgVUlNZ3IuaW5zLmhpZGVVSShVSUh1ZERlZi5Nb3JlQ29pbik7XG4gICAgfVxuXG59XG4iXX0=