
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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BasicCellViewCtrl = /** @class */ (function (_super) {
    __extends(BasicCellViewCtrl, _super);
    function BasicCellViewCtrl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicCellViewCtrl.prototype.initView = function (models) {
        _super.prototype.initView.call(this, models);
        M_1.default.nodePool.create(Constant_1.NodePoolKey.Cell, this.ItemPrefab, 150);
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
        var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.Cell, this.ItemPrefab);
        node.getComponent(ItemBasicCellCtrl_1.default).init(model, createType);
        model.extData = node;
        node.parent = this.node;
    };
    BasicCellViewCtrl.prototype.playCollectPower = function (parent, startCell, endCell) {
        var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.Cell, this.ItemPrefab);
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
        var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.Cell, this.ItemPrefab);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxCYXNpY0NlbGxWaWV3Q3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBd0M7QUFDeEMsc0RBQStFO0FBRS9FLHlEQUFtRDtBQUNuRCx1Q0FBa0M7QUFDbEMsZ0RBQStDO0FBQy9DLHNEQUFpRDtBQUNqRCxnREFBMkQ7QUFHckQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBK0MscUNBQXVCO0lBQXRFOztJQXFFQSxDQUFDO0lBbkVVLG9DQUFRLEdBQWYsVUFBZ0IsTUFBcUI7UUFDakMsaUJBQU0sUUFBUSxZQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLFdBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLHNCQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDMUQsS0FBSyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHO1lBQzlCLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUc7Z0JBQzdCLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxLQUFLLENBQUMscUJBQXFCLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLHNCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2pEO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFTSx5Q0FBYSxHQUFwQixVQUFxQixLQUFnQixFQUFFLFVBQXNCO1FBQ3pELElBQU0sSUFBSSxHQUFHLFdB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ckU4QyxrQkFBUSxHQXFFdEQ7a0JBckVvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IE5vZGVQb29sS2V5LCBDZWxsVHlwZSwgRWxpbWF0ZVR5cGUgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IHsgQ2VsbE1vZGVsIH0gZnJvbSBcIi4uL01vZGVsL0NlbGxNb2RlbFwiO1xuaW1wb3J0IEl0ZW1DZWxsQmFzZUN0cmwgZnJvbSBcIi4vSXRlbUJhc2ljQ2VsbEN0cmxcIjtcbmltcG9ydCBCYXNlVmlldyBmcm9tIFwiLi9CYXNlVmlld1wiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IEFjdGlvbkN0cmwgZnJvbSBcIi4uLy4uL0NvbW1vbi9BY3Rpb25DdHJsXCI7XG5pbXBvcnQgR2FtZU1vZGVsLCB7IENyZWF0ZVR5cGUgfSBmcm9tIFwiLi4vTW9kZWwvR2FtZU1vZGVsXCI7XG5pbXBvcnQgTWFpblVpQ3RybCBmcm9tIFwiLi9VSS9NYWluVWlDdHJsXCI7XG5pbXBvcnQgeyBDZWxsQmFzZSB9IGZyb20gXCIuLi9Nb2RlbC9DZWxsQmFzZVwiO1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2ljQ2VsbFZpZXdDdHJsIGV4dGVuZHMgQmFzZVZpZXc8Q2VsbE1vZGVsW11bXT4ge1xuXG4gICAgcHVibGljIGluaXRWaWV3KG1vZGVsczogQ2VsbE1vZGVsW11bXSkge1xuICAgICAgICBzdXBlci5pbml0Vmlldyhtb2RlbHMpO1xuICAgICAgICBNLm5vZGVQb29sLmNyZWF0ZShOb2RlUG9vbEtleS5DZWxsLCB0aGlzLkl0ZW1QcmVmYWIsIDE1MCk7XG4gICAgICAgIGZvciAobGV0IHkgPSBtb2RlbHMubGVuZ3RoOyB5LS07KSB7XG4gICAgICAgICAgICBjb25zdCB5SXRlbSA9IG1vZGVsc1t5XTtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSB5SXRlbS5sZW5ndGg7IHgtLTspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RlbCA9IHlJdGVtW3hdO1xuICAgICAgICAgICAgICAgIGlmIChtb2RlbCAvKiYmICFtb2RlbC5pc0VtcHR5Ki8pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVOZXdDZWxsKG1vZGVsLCBDcmVhdGVUeXBlLkluaXRpYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVOZXdDZWxsKG1vZGVsOiBDZWxsTW9kZWwsIGNyZWF0ZVR5cGU6IENyZWF0ZVR5cGUpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IE0ubm9kZVBvb2wuZ2V0SXRlbShOb2RlUG9vbEtleS5DZWxsLCB0aGlzLkl0ZW1QcmVmYWIpO1xuICAgICAgICBub2RlLmdldENvbXBvbmVudChJdGVtQ2VsbEJhc2VDdHJsKS5pbml0KG1vZGVsLCBjcmVhdGVUeXBlKTtcbiAgICAgICAgbW9kZWwuZXh0RGF0YSA9IG5vZGU7XG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5Q29sbGVjdFBvd2VyKHBhcmVudDogY2MuTm9kZSwgc3RhcnRDZWxsOiBDZWxsQmFzZTxhbnksIGFueT4sIGVuZENlbGw6IENlbGxCYXNlPGFueSwgYW55Pikge1xuICAgICAgICBjb25zdCBub2RlID0gTS5ub2RlUG9vbC5nZXRJdGVtKE5vZGVQb29sS2V5LkNlbGwsIHRoaXMuSXRlbVByZWZhYik7XG4gICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50O1xuICAgICAgICBjb25zdCBwb3MgPSBwYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihzdGFydENlbGwuZ2V0UG9zaXRpb24oKSkpO1xuICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEl0ZW1DZWxsQmFzZUN0cmwpLmVhc3lJbml0KHN0YXJ0Q2VsbC5nZXRUeXBlKCkpO1xuICAgICAgICBjb25zdCB0YXJnZXRQb3MgPSBwYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihlbmRDZWxsLmdldFBvc2l0aW9uKCkpKTtcbiAgICAgICAgQWN0aW9uQ3RybC5pbnMucnVuQ29sbGVjdE5vcm1hbENlbGwobm9kZSwgdGFyZ2V0UG9zKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIE0ubm9kZVBvb2wuZnJlZUl0ZW0oTm9kZVBvb2xLZXkuQ2VsbCwgbm9kZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5Q29sbGVjdEFuaShwYXJlbnQ6IGNjLk5vZGUsIHR5cGU6IENlbGxUeXBlLCBwb3M6IGNjLlZlYzIsIHRhcmdldFBvczogY2MuVmVjMiwgZWxpbWF0ZVR5cGU/OiBFbGltYXRlVHlwZSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICBjb25zdCBub2RlID0gTS5ub2RlUG9vbC5nZXRJdGVtKE5vZGVQb29sS2V5LkNlbGwsIHRoaXMuSXRlbVByZWZhYik7XG4gICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50O1xuICAgICAgICBjb25zdCB3cG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwb3MpO1xuICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3cG9zKSk7XG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEl0ZW1DZWxsQmFzZUN0cmwpLmVhc3lJbml0KHR5cGUpO1xuICAgICAgICB0YXJnZXRQb3MgPSBwYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKSBhcyBjYy5WZWMyO1xuICAgICAgICBBY3Rpb25DdHJsLmlucy5ydW5Db2xsZWN0Tm9ybWFsQ2VsbChub2RlLCB0YXJnZXRQb3MsIGVsaW1hdGVUeXBlKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIE0ubm9kZVBvb2wuZnJlZUl0ZW0oTm9kZVBvb2xLZXkuQ2VsbCwgbm9kZSlcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuVUkuVXBkYXRlSW5mb1BhbmVsLCB0eXBlKTtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5FZmZlY3QuQ29sbGVjdE92ZXIsIHRhcmdldFBvcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5Q29sbGVjdFN0ZXBBbmkodWljdHJsOiBNYWluVWlDdHJsLCBjbTogQ2VsbE1vZGVsKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHVpY3RybC5ub2RlO1xuICAgICAgICBjb25zdCBjZW50ZXJQb3MgPSBwYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjbS5nZXRQb3NpdGlvbigpKSk7XG4gICAgICAgIGNvbnN0IHRhcmdldFBvcyA9IHBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih1aWN0cmwuZ2V0U3RlcFBvcygpKSBhcyBjYy5WZWMyO1xuICAgICAgICBjb25zdCBsYWJlbCA9IGNjLmluc3RhbnRpYXRlKGNtLmV4dEN0cmwuY2VsbFNwcml0ZS5ub2RlLmdldENoaWxkQnlOYW1lKCdsdicpKTtcbiAgICAgICAgbGFiZWwucGFyZW50ID0gcGFyZW50O1xuICAgICAgICBsYWJlbC5zZXRQb3NpdGlvbihjZW50ZXJQb3MpO1xuXG4gICAgICAgIGNvbnN0IGEwID0gY2MubW92ZVRvKDEsIHRhcmdldFBvcyk7XG4gICAgICAgIGNvbnN0IGExID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5zdGVwTGltaXQgKz0gY20uZ2V0THYoKTtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5VSS5VcGRhdGVJbmZvUGFuZWwpO1xuICAgICAgICAgICAgbGFiZWwuZGVzdHJveSgpO1xuICAgICAgICB9KVxuICAgICAgICBsYWJlbC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYTAsIGExKSk7XG4gICAgfVxuXG5cblxufVxuIl19