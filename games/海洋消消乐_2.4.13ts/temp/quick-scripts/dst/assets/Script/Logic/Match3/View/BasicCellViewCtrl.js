
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/BasicCellViewCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b9492O7mupLb59YQcC/vKJ2', 'BasicCellViewCtrl');
// Script/Logic/Match3/View/BasicCellViewCtrl.ts

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
var Constant_1 = require("../../Data/Const/Constant");
var ItemBasicCellCtrl_1 = require("./ItemBasicCellCtrl");
var BaseView_1 = require("./BaseView");
var Event_1 = require("../../Data/Const/Event");
var ActionCtrl_1 = require("../../Common/ActionCtrl");
var GameModel_1 = require("../Model/GameModel");
var Match3Skin_1 = require("../Skin/Match3Skin");
var ccclass = cc._decorator.ccclass;
var BasicCellViewCtrl = /** @class */ (function (_super) {
    __extends(BasicCellViewCtrl, _super);
    function BasicCellViewCtrl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicCellViewCtrl.prototype.initView = function (models) {
        _super.prototype.initView.call(this, models);
        var itemPrefab = Match3Skin_1.default.requirePrefab("cellItem");
        M_1.default.nodePool.create(Constant_1.NodePoolKey.Cell, itemPrefab, 150);
        for (var y = models.length; y--;) {
            var yItem = models[y];
            for (var x = yItem.length; x--;) {
                var model = yItem[x];
                if (model /*&& !model.isEmpty*/) {
                    this.createNewCell(model, GameModel_1.CreateType.Initial);
                }
            }
        }
    };
    BasicCellViewCtrl.prototype.createNewCell = function (model, createType) {
        var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.Cell, Match3Skin_1.default.requirePrefab("cellItem"));
        node.getComponent(ItemBasicCellCtrl_1.default).init(model, createType);
        model.extData = node;
        node.parent = this.node;
    };
    BasicCellViewCtrl.prototype.playCollectPower = function (parent, startCell, endCell) {
        var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.Cell, Match3Skin_1.default.requirePrefab("cellItem"));
        node.parent = parent;
        var pos = parent.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(startCell.getPosition()));
        node.setPosition(pos);
        node.getComponent(ItemBasicCellCtrl_1.default).easyInit(startCell.getType());
        var targetPos = parent.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(endCell.getPosition()));
        ActionCtrl_1.default.ins.runCollectNormalCell(node, targetPos).then(function () {
            M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.Cell, node);
        });
    };
    BasicCellViewCtrl.prototype.playCollectAni = function (parent, type, pos, targetPos, elimateType, callback) {
        var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.Cell, Match3Skin_1.default.requirePrefab("cellItem"));
        node.parent = parent;
        var wpos = this.node.convertToWorldSpaceAR(pos);
        node.setPosition(parent.convertToNodeSpaceAR(wpos));
        node.getComponent(ItemBasicCellCtrl_1.default).easyInit(type);
        targetPos = parent.convertToNodeSpaceAR(targetPos);
        ActionCtrl_1.default.ins.runCollectNormalCell(node, targetPos, elimateType).then(function () {
            M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.Cell, node);
            callback && callback();
            M_1.default.event.send(Event_1.Event.UI.UpdateInfoPanel, type);
            M_1.default.event.send(Event_1.Event.Effect.CollectOver, targetPos);
        });
    };
    BasicCellViewCtrl.prototype.playCollectStepAni = function (uictrl, cm) {
        var parent = uictrl.node;
        var centerPos = parent.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(cm.getPosition()));
        var targetPos = parent.convertToNodeSpaceAR(uictrl.getStepPos());
        var label = cc.instantiate(cm.extCtrl.cellSprite.node.getChildByName('lv'));
        label.parent = parent;
        label.setPosition(centerPos);
        var a0 = cc.moveTo(1, targetPos);
        var a1 = cc.callFunc(function () {
            GameModel_1.default.ins.stepLimit += cm.getLv();
            M_1.default.event.send(Event_1.Event.UI.UpdateInfoPanel);
            label.destroy();
        });
        label.runAction(cc.sequence(a0, a1));
    };
    BasicCellViewCtrl = __decorate([
        ccclass
    ], BasicCellViewCtrl);
    return BasicCellViewCtrl;
}(BaseView_1.default));
exports.default = BasicCellViewCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxCYXNpY0NlbGxWaWV3Q3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBd0M7QUFDeEMsc0RBQStFO0FBRS9FLHlEQUFtRDtBQUNuRCx1Q0FBa0M7QUFDbEMsZ0RBQStDO0FBQy9DLHNEQUFpRDtBQUNqRCxnREFBMkQ7QUFHM0QsaURBQTRDO0FBQ3BDLElBQUEsT0FBTyxHQUFLLEVBQUUsQ0FBQyxVQUFVLFFBQWxCLENBQW1CO0FBR2xDO0lBQStDLHFDQUF1QjtJQUF0RTs7SUFzRUEsQ0FBQztJQXBFVSxvQ0FBUSxHQUFmLFVBQWdCLE1BQXFCO1FBQ2pDLGlCQUFNLFFBQVEsWUFBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixJQUFNLFVBQVUsR0FBRyxvQkFBVSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4RCxXQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxzQkFBVyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDckQsS0FBSyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHO1lBQzlCLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUc7Z0JBQzdCLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxLQUFLLENBQUMscUJBQXFCLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLHNCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2pEO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFTSx5Q0FBYSxHQUFwQixVQUFxQixL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QyxDQUFDO0lBQ3pDLENBQUM7SUFsRWdCLGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBc0VyQztJQUFELHdCQUFDO0NBdEVELEFBc0VDLENBdEU4QyxrQkFBUSxHQXNFdEQ7a0JBdEVvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IE5vZGVQb29sS2V5LCBDZWxsVHlwZSwgRWxpbWF0ZVR5cGUgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IHsgQ2VsbE1vZGVsIH0gZnJvbSBcIi4uL01vZGVsL0NlbGxNb2RlbFwiO1xuaW1wb3J0IEl0ZW1DZWxsQmFzZUN0cmwgZnJvbSBcIi4vSXRlbUJhc2ljQ2VsbEN0cmxcIjtcbmltcG9ydCBCYXNlVmlldyBmcm9tIFwiLi9CYXNlVmlld1wiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IEFjdGlvbkN0cmwgZnJvbSBcIi4uLy4uL0NvbW1vbi9BY3Rpb25DdHJsXCI7XG5pbXBvcnQgR2FtZU1vZGVsLCB7IENyZWF0ZVR5cGUgfSBmcm9tIFwiLi4vTW9kZWwvR2FtZU1vZGVsXCI7XG5pbXBvcnQgTWFpblVpQ3RybCBmcm9tIFwiLi9VSS9NYWluVWlDdHJsXCI7XG5pbXBvcnQgeyBDZWxsQmFzZSB9IGZyb20gXCIuLi9Nb2RlbC9DZWxsQmFzZVwiO1xuaW1wb3J0IE1hdGNoM1NraW4gZnJvbSBcIi4uL1NraW4vTWF0Y2gzU2tpblwiO1xuY29uc3QgeyBjY2NsYXNzIH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzaWNDZWxsVmlld0N0cmwgZXh0ZW5kcyBCYXNlVmlldzxDZWxsTW9kZWxbXVtdPiB7XG5cbiAgICBwdWJsaWMgaW5pdFZpZXcobW9kZWxzOiBDZWxsTW9kZWxbXVtdKSB7XG4gICAgICAgIHN1cGVyLmluaXRWaWV3KG1vZGVscyk7XG4gICAgICAgIGNvbnN0IGl0ZW1QcmVmYWIgPSBNYXRjaDNTa2luLnJlcXVpcmVQcmVmYWIoXCJjZWxsSXRlbVwiKTtcbiAgICAgICAgTS5ub2RlUG9vbC5jcmVhdGUoTm9kZVBvb2xLZXkuQ2VsbCwgaXRlbVByZWZhYiwgMTUwKTtcbiAgICAgICAgZm9yIChsZXQgeSA9IG1vZGVscy5sZW5ndGg7IHktLTspIHtcbiAgICAgICAgICAgIGNvbnN0IHlJdGVtID0gbW9kZWxzW3ldO1xuICAgICAgICAgICAgZm9yIChsZXQgeCA9IHlJdGVtLmxlbmd0aDsgeC0tOykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsID0geUl0ZW1beF07XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsIC8qJiYgIW1vZGVsLmlzRW1wdHkqLykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU5ld0NlbGwobW9kZWwsIENyZWF0ZVR5cGUuSW5pdGlhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZU5ld0NlbGwobW9kZWw6IENlbGxNb2RlbCwgY3JlYXRlVHlwZTogQ3JlYXRlVHlwZSkge1xuICAgICAgICBjb25zdCBub2RlID0gTS5ub2RlUG9vbC5nZXRJdGVtKE5vZGVQb29sS2V5LkNlbGwsIE1hdGNoM1NraW4ucmVxdWlyZVByZWZhYihcImNlbGxJdGVtXCIpKTtcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoSXRlbUNlbGxCYXNlQ3RybCkuaW5pdChtb2RlbCwgY3JlYXRlVHlwZSk7XG4gICAgICAgIG1vZGVsLmV4dERhdGEgPSBub2RlO1xuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcGxheUNvbGxlY3RQb3dlcihwYXJlbnQ6IGNjLk5vZGUsIHN0YXJ0Q2VsbDogQ2VsbEJhc2U8YW55LCBhbnk+LCBlbmRDZWxsOiBDZWxsQmFzZTxhbnksIGFueT4pIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IE0ubm9kZVBvb2wuZ2V0SXRlbShOb2RlUG9vbEtleS5DZWxsLCBNYXRjaDNTa2luLnJlcXVpcmVQcmVmYWIoXCJjZWxsSXRlbVwiKSk7XG4gICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50O1xuICAgICAgICBjb25zdCBwb3MgPSBwYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihzdGFydENlbGwuZ2V0UG9zaXRpb24oKSkpO1xuICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEl0ZW1DZWxsQmFzZUN0cmwpLmVhc3lJbml0KHN0YXJ0Q2VsbC5nZXRUeXBlKCkpO1xuICAgICAgICBjb25zdCB0YXJnZXRQb3MgPSBwYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihlbmRDZWxsLmdldFBvc2l0aW9uKCkpKTtcbiAgICAgICAgQWN0aW9uQ3RybC5pbnMucnVuQ29sbGVjdE5vcm1hbENlbGwobm9kZSwgdGFyZ2V0UG9zKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIE0ubm9kZVBvb2wuZnJlZUl0ZW0oTm9kZVBvb2xLZXkuQ2VsbCwgbm9kZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5Q29sbGVjdEFuaShwYXJlbnQ6IGNjLk5vZGUsIHR5cGU6IENlbGxUeXBlLCBwb3M6IGNjLlZlYzIsIHRhcmdldFBvczogY2MuVmVjMiwgZWxpbWF0ZVR5cGU/OiBFbGltYXRlVHlwZSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICBjb25zdCBub2RlID0gTS5ub2RlUG9vbC5nZXRJdGVtKE5vZGVQb29sS2V5LkNlbGwsIE1hdGNoM1NraW4ucmVxdWlyZVByZWZhYihcImNlbGxJdGVtXCIpKTtcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIGNvbnN0IHdwb3MgPSB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKHBvcyk7XG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdwb3MpKTtcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoSXRlbUNlbGxCYXNlQ3RybCkuZWFzeUluaXQodHlwZSk7XG4gICAgICAgIHRhcmdldFBvcyA9IHBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRQb3MpIGFzIGNjLlZlYzI7XG4gICAgICAgIEFjdGlvbkN0cmwuaW5zLnJ1bkNvbGxlY3ROb3JtYWxDZWxsKG5vZGUsIHRhcmdldFBvcywgZWxpbWF0ZVR5cGUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgTS5ub2RlUG9vbC5mcmVlSXRlbShOb2RlUG9vbEtleS5DZWxsLCBub2RlKVxuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5VSS5VcGRhdGVJbmZvUGFuZWwsIHR5cGUpO1xuICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LkVmZmVjdC5Db2xsZWN0T3ZlciwgdGFyZ2V0UG9zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlDb2xsZWN0U3RlcEFuaSh1aWN0cmw6IE1haW5VaUN0cmwsIGNtOiBDZWxsTW9kZWwpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdWljdHJsLm5vZGU7XG4gICAgICAgIGNvbnN0IGNlbnRlclBvcyA9IHBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNtLmdldFBvc2l0aW9uKCkpKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0UG9zID0gcGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHVpY3RybC5nZXRTdGVwUG9zKCkpIGFzIGNjLlZlYzI7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gY2MuaW5zdGFudGlhdGUoY20uZXh0Q3RybC5jZWxsU3ByaXRlLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2x2JykpO1xuICAgICAgICBsYWJlbC5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIGxhYmVsLnNldFBvc2l0aW9uKGNlbnRlclBvcyk7XG5cbiAgICAgICAgY29uc3QgYTAgPSBjYy5tb3ZlVG8oMSwgdGFyZ2V0UG9zKTtcbiAgICAgICAgY29uc3QgYTEgPSBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICBHYW1lTW9kZWwuaW5zLnN0ZXBMaW1pdCArPSBjbS5nZXRMdigpO1xuICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LlVJLlVwZGF0ZUluZm9QYW5lbCk7XG4gICAgICAgICAgICBsYWJlbC5kZXN0cm95KCk7XG4gICAgICAgIH0pXG4gICAgICAgIGxhYmVsLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhMCwgYTEpKTtcbiAgICB9XG5cblxuXG59XG4iXX0=