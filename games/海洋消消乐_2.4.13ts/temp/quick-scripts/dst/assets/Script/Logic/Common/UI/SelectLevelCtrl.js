
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/SelectLevelCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd9332z2r8VFuYuiE7zsSFKC', 'SelectLevelCtrl');
// Script/Logic/Common/UI/SelectLevelCtrl.ts

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
var LevelMarkItem_1 = require("../../../Views/LevelMap/LevelMarkItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SelectLevelCtrl = /** @class */ (function (_super) {
    __extends(SelectLevelCtrl, _super);
    function SelectLevelCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.lvItem = null;
        _this.nameLab = null;
        return _this;
    }
    SelectLevelCtrl.prototype.init = function (data) {
        if (data) {
            this.content.removeAllChildren();
            for (var i = data.minLv; i <= data.maxLv; i++) {
                var item = M_1.default.nodePool.createItem(this.lvItem);
                item.parent = this.content;
                item.getComponent(LevelMarkItem_1.default).updateData(i);
            }
            this.nameLab.string = data.name;
            this.nameLab.node.getChildByName('shadow').getComponent(cc.Label).string = data.name;
        }
    };
    __decorate([
        property(cc.Node)
    ], SelectLevelCtrl.prototype, "content", void 0);
    __decorate([
        property(cc.Prefab)
    ], SelectLevelCtrl.prototype, "lvItem", void 0);
    __decorate([
        property(cc.Label)
    ], SelectLevelCtrl.prototype, "nameLab", void 0);
    SelectLevelCtrl = __decorate([
        ccclass
    ], SelectLevelCtrl);
    return SelectLevelCtrl;
}(cc.Component));
exports.default = SelectLevelCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcU2VsZWN0TGV2ZWxDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZDQUF3QztBQUV4Qyx1RUFBa0U7QUFFNUQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNkMsbUNBQVk7SUFBekQ7UUFBQSxxRUF3QkM7UUFyQkcsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixZQUFNLEdBQWMsSUFBSSxDQUFDO1FBR3pCLGFBQU8sR0FBYSxJQUFJLENBQUM7O0lBZTdCLENBQUM7SUFaVSw4QkFBSSxHQUFYLFVBQVksSUFBaUI7UUFDekIsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMzQyxJQUFNLElBQUksR0FBRyxXQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBYSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2xEO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN4RjtJQUNMLENBQUM7SUFwQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDTTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNLO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ007SUFUUixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBd0JuQztJQUFELHNCQUFDO0NBeEJELEFBd0JDLENBeEI0QyxFQUFFLENBQUMsU0FBUyxHQXdCeEQ7a0JBeEJvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCBDaGFwdGVySW5mbyBmcm9tIFwiLi4vLi4vLi4vQmFzZS9UYWJscy9DaGFwdGVySW5mb1wiO1xuaW1wb3J0IExldmVsTWFya0l0ZW0gZnJvbSAnLi4vLi4vLi4vVmlld3MvTGV2ZWxNYXAvTGV2ZWxNYXJrSXRlbSc7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWxlY3RMZXZlbEN0cmwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY29udGVudDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGx2SXRlbTogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBuYW1lTGFiOiBjYy5MYWJlbCA9IG51bGw7XG5cblxuICAgIHB1YmxpYyBpbml0KGRhdGE6IENoYXB0ZXJJbmZvKSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBkYXRhLm1pbkx2OyBpIDw9IGRhdGEubWF4THY7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBNLm5vZGVQb29sLmNyZWF0ZUl0ZW0odGhpcy5sdkl0ZW0pO1xuICAgICAgICAgICAgICAgIGl0ZW0ucGFyZW50ID0gdGhpcy5jb250ZW50O1xuICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KExldmVsTWFya0l0ZW0pLnVwZGF0ZURhdGEoaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5hbWVMYWIuc3RyaW5nID0gZGF0YS5uYW1lO1xuICAgICAgICAgICAgdGhpcy5uYW1lTGFiLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3NoYWRvdycpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZGF0YS5uYW1lO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19