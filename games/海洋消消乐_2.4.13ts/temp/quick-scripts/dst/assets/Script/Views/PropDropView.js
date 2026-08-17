
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Views/PropDropView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c280cedyGVDG7v+8Xo5Ts+t', 'PropDropView');
// Script/Views/PropDropView.ts

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
var UIBase_1 = require("../Base/UI/UIBase");
var M_1 = require("../Base/Manager/M");
var PropItemCtrl_1 = require("../Logic/Match3/View/UI/PropItemCtrl");
var UIMgr_1 = require("../Base/Manager/UIMgr");
var UIData_1 = require("../Logic/Data/Interface/UIData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 用法： 在三消场景获得道具 在界面上弹一下飞往道具列表
 * 注意： 仅限于三消场景
 */
var PropDropView = /** @class */ (function (_super) {
    __extends(PropDropView, _super);
    function PropDropView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemPrefab = null;
        _this._curItem = null;
        _this._curData = null;
        return _this;
    }
    PropDropView.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
    };
    //目前只支持一个道具飘落 如需多个道具依次飘落 自己写！
    PropDropView.prototype.onInit = function (itemData) {
        var item = M_1.default.nodePool.createItem(this.itemPrefab);
        var itemCtrl = item.getComponent(PropItemCtrl_1.default);
        itemCtrl && itemCtrl.initOnlyType(itemData.itemId, itemData.num);
        item.parent = this.node;
        item.setScale(0.2);
        this._curItem = item;
        this._curData = itemData;
        this.flyToPropsBar();
    };
    PropDropView.prototype.flyToPropsBar = function () {
        var _this = this;
        var node = this._curItem;
        var destinationPos = this.getDestination(this._curData.itemId);
        // console.error(destinationPos);
        var timeline = new gsap.TimelineMax();
        timeline
            .to(node, 0.6, { scale: 1.1, x: 0, y: 100 })
            .to(node, 0.6, { x: destinationPos.x, y: destinationPos.y, scale: 0.5, ease: gsap.Back.easeIn })
            .add(function () {
            M_1.default.runtime.updatePropCount(_this._curData.itemId, _this._curData.num);
            timeline.remove(timeline);
            UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.PropDropView);
        });
    };
    PropDropView.prototype.getDestination = function (itemId) {
        var propBar = cc.find("Canvas/ui/bottom/propsBar");
        if (propBar) {
            var itemNode = propBar.getChildByName("item_" + itemId);
            if (itemNode) {
                var itemNodeWorldPos = propBar.convertToWorldSpaceAR(itemNode.position);
                return itemNodeWorldPos.sub(cc.v3(cc.winSize.width / 2, cc.winSize.height / 2));
            }
        }
        return cc.v2(0, -600);
    };
    __decorate([
        property(cc.Prefab)
    ], PropDropView.prototype, "itemPrefab", void 0);
    PropDropView = __decorate([
        ccclass
    ], PropDropView);
    return PropDropView;
}(UIBase_1.default));
exports.default = PropDropView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxWaWV3c1xcUHJvcERyb3BWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDRDQUF1QztBQUN2Qyx1Q0FBa0M7QUFDbEMscUVBQWdFO0FBRWhFLCtDQUEwQztBQUMxQyx5REFBMEQ7QUFFcEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFDNUM7OztHQUdHO0FBRUg7SUFBMEMsZ0NBQU07SUFBaEQ7UUFBQSxxRUFvREM7UUFqREcsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFFckIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixjQUFRLEdBQWdCLElBQUksQ0FBQzs7SUE4Q3pDLENBQUM7SUE1Q0csNkJBQU0sR0FBTjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCw2QkFBNkI7SUFDdEIsNkJBQU0sR0FBYixVQUFjLFFBQXFCO1FBQy9CLElBQU0sSUFBSSxHQUFHLFdBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwRCxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQztRQUNqRCxRQUFRLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBa0IsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTyxvQ0FBYSxHQUFyQjtRQUFBLGlCQWVDO1FBZEcsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUV6QixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0QsaUNBQWlDO1FBQ2pDLElBQU0sUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hDLFFBQVE7YUFDSCxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7YUFDM0MsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQy9GLEdBQUcsQ0FBQztZQUNELFdBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBa0IsRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9FLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUIsZUFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUU3QyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFTSxxQ0FBYyxHQUFyQixVQUFzQixNQUFNO1FBQ3hCLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUNuRCxJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBQ3hELElBQUksUUFBUSxFQUFFO2dCQUNWLElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDeEUsT0FBTyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNuRjtTQUNKO1FBQ0QsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFoREQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztvREFDUztJQUhaLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FvRGhDO0lBQUQsbUJBQUM7Q0FwREQsQUFvREMsQ0FwRHlDLGdCQUFNLEdBb0QvQztrQkFwRG9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29uZmlnSXRlbSB9IGZyb20gXCIuLi9Mb2dpYy9Db21tb24vQ29tbW9uSW50ZXJmYWNlc1wiO1xuaW1wb3J0IFVJQmFzZSBmcm9tIFwiLi4vQmFzZS9VSS9VSUJhc2VcIjtcbmltcG9ydCBNIGZyb20gXCIuLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IFByb3BJdGVtQ3RybCBmcm9tIFwiLi4vTG9naWMvTWF0Y2gzL1ZpZXcvVUkvUHJvcEl0ZW1DdHJsXCI7XG5pbXBvcnQgeyBQcm9wVHlwZSB9IGZyb20gXCIuLi9Mb2dpYy9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5pbXBvcnQgVUlNZ3IgZnJvbSBcIi4uL0Jhc2UvTWFuYWdlci9VSU1nclwiO1xuaW1wb3J0IHsgVUlIdWREZWYgfSBmcm9tIFwiLi4vTG9naWMvRGF0YS9JbnRlcmZhY2UvVUlEYXRhXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG4vKipcbiAqIOeUqOazle+8miDlnKjkuInmtojlnLrmma/ojrflvpfpgZPlhbcg5Zyo55WM6Z2i5LiK5by55LiA5LiL6aOe5b6A6YGT5YW35YiX6KGoXG4gKiDms6jmhI/vvJog5LuF6ZmQ5LqO5LiJ5raI5Zy65pmvXG4gKi9cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9wRHJvcFZpZXcgZXh0ZW5kcyBVSUJhc2Uge1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBpdGVtUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfY3VySXRlbTogY2MuTm9kZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfY3VyRGF0YTogSUNvbmZpZ0l0ZW0gPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICB9XG5cbiAgICAvL+ebruWJjeWPquaUr+aMgeS4gOS4qumBk+WFt+mjmOiQvSDlpoLpnIDlpJrkuKrpgZPlhbfkvp3mrKHpo5jokL0g6Ieq5bex5YaZ77yBXG4gICAgcHVibGljIG9uSW5pdChpdGVtRGF0YTogSUNvbmZpZ0l0ZW0pIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IE0ubm9kZVBvb2wuY3JlYXRlSXRlbSh0aGlzLml0ZW1QcmVmYWIpO1xuICAgICAgICBjb25zdCBpdGVtQ3RybCA9IGl0ZW0uZ2V0Q29tcG9uZW50KFByb3BJdGVtQ3RybCk7XG4gICAgICAgIGl0ZW1DdHJsICYmIGl0ZW1DdHJsLmluaXRPbmx5VHlwZShpdGVtRGF0YS5pdGVtSWQgYXMgUHJvcFR5cGUsIGl0ZW1EYXRhLm51bSk7XG4gICAgICAgIGl0ZW0ucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICBpdGVtLnNldFNjYWxlKDAuMik7XG4gICAgICAgIHRoaXMuX2N1ckl0ZW0gPSBpdGVtO1xuICAgICAgICB0aGlzLl9jdXJEYXRhID0gaXRlbURhdGE7XG4gICAgICAgIHRoaXMuZmx5VG9Qcm9wc0JhcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmx5VG9Qcm9wc0JhcigpIHtcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLl9jdXJJdGVtO1xuXG4gICAgICAgIGxldCBkZXN0aW5hdGlvblBvcyA9IHRoaXMuZ2V0RGVzdGluYXRpb24odGhpcy5fY3VyRGF0YS5pdGVtSWQpO1xuICAgICAgICAvLyBjb25zb2xlLmVycm9yKGRlc3RpbmF0aW9uUG9zKTtcbiAgICAgICAgY29uc3QgdGltZWxpbmUgPSBuZXcgZ3NhcC5UaW1lbGluZU1heCgpO1xuICAgICAgICB0aW1lbGluZVxuICAgICAgICAgICAgLnRvKG5vZGUsIDAuNiwgeyBzY2FsZTogMS4xLCB4OiAwLCB5OiAxMDAgfSlcbiAgICAgICAgICAgIC50byhub2RlLCAwLjYsIHsgeDogZGVzdGluYXRpb25Qb3MueCwgeTogZGVzdGluYXRpb25Qb3MueSwgc2NhbGU6IDAuNSwgZWFzZTogZ3NhcC5CYWNrLmVhc2VJbiB9KVxuICAgICAgICAgICAgLmFkZCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgTS5ydW50aW1lLnVwZGF0ZVByb3BDb3VudCh0aGlzLl9jdXJEYXRhLml0ZW1JZCBhcyBQcm9wVHlwZSwgdGhpcy5fY3VyRGF0YS5udW0pO1xuICAgICAgICAgICAgICAgIHRpbWVsaW5lLnJlbW92ZSh0aW1lbGluZSk7XG4gICAgICAgICAgICAgICAgVUlNZ3IuaW5zLmNsb3NlVUkoVUlIdWREZWYuUHJvcERyb3BWaWV3KTtcblxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERlc3RpbmF0aW9uKGl0ZW1JZCkge1xuICAgICAgICBsZXQgcHJvcEJhciA9IGNjLmZpbmQoXCJDYW52YXMvdWkvYm90dG9tL3Byb3BzQmFyXCIpO1xuICAgICAgICBpZiAocHJvcEJhcikge1xuICAgICAgICAgICAgbGV0IGl0ZW1Ob2RlID0gcHJvcEJhci5nZXRDaGlsZEJ5TmFtZShcIml0ZW1fXCIgKyBpdGVtSWQpO1xuICAgICAgICAgICAgaWYgKGl0ZW1Ob2RlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1Ob2RlV29ybGRQb3MgPSBwcm9wQmFyLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihpdGVtTm9kZS5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1Ob2RlV29ybGRQb3Muc3ViKGNjLnYzKGNjLndpblNpemUud2lkdGggLyAyLCBjYy53aW5TaXplLmhlaWdodCAvIDIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2MudjIoMCwgLTYwMCk7XG4gICAgfVxufSJdfQ==