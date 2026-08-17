
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/UpGroundViewCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '49bedhsMQFN5bN0vZhab2EM', 'UpGroundViewCtrl');
// Script/Logic/Match3/View/UpGroundViewCtrl.ts

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
var UpGroundCellModel_1 = require("../Model/UpGroundCellModel");
var M_1 = require("../../../Base/Manager/M");
var Constant_1 = require("../../Data/Const/Constant");
var ItemUpgroundCtrl_1 = require("./ItemUpgroundCtrl");
var BaseView_1 = require("./BaseView");
var GameModel_1 = require("../Model/GameModel");
var ActionCtrl_1 = require("../../Common/ActionCtrl");
var Event_1 = require("../../Data/Const/Event");
var Common_1 = require("../../Common/Common");
var SpinePlayerCtrl_1 = require("../../../Base/CustomComponent/SpinePlayerCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UpGroundViewCtrl = /** @class */ (function (_super) {
    __extends(UpGroundViewCtrl, _super);
    function UpGroundViewCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultNode = null;
        _this.portal = null;
        _this.portalPrefab = null;
        return _this;
    }
    UpGroundViewCtrl.prototype.initView = function (models) {
        _super.prototype.initView.call(this, models);
        M_1.default.nodePool.create(Constant_1.NodePoolKey.UpGroundCell, this.ItemPrefab, 150);
        for (var y = models.length; y--;) {
            var yItems = models[y];
            for (var x = yItems.length; x--;) {
                var item = yItems[x];
                var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.UpGroundCell, this.ItemPrefab);
                node.getComponent(ItemUpgroundCtrl_1.default).init(item);
                item.extData = node;
                node.parent = this.defaultNode;
                this.syncPortal(item);
            }
        }
    };
    UpGroundViewCtrl.prototype.syncPortal = function (model) {
        this.portal.y = 0;
        if (model.portalIdx != 0) {
            var node = M_1.default.nodePool.createItem(this.portalPrefab);
            var ctrl_1 = node.getComponent(SpinePlayerCtrl_1.default);
            node.parent = this.portal;
            node.setPosition(model.getPosition());
            var playName_1 = null;
            if (model.portalIdx > 0) {
                node.y += Common_1.default.GRID_H / 2;
                playName_1 = 'chuansongmen_blue';
            }
            else if (model.portalIdx < 0) {
                node.y -= Common_1.default.GRID_H / 2;
                playName_1 = 'chuansongmen_orage';
            }
            this.scheduleOnce(function () {
                ctrl_1.play(playName_1, 0, true);
            }, 0);
        }
    };
    UpGroundViewCtrl.prototype.playCollectAniByType = function (parent, pos, targetPos, type) {
        var boxNode = this.createTempBoxNode(pos);
        boxNode.parent = parent;
        targetPos = parent.convertToNodeSpaceAR(targetPos);
        ActionCtrl_1.default.ins.runCollectNormalCell(boxNode, targetPos).then(function () {
            M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.UpGroundCell, boxNode);
            M_1.default.event.send(Event_1.Event.Effect.CollectOver, targetPos);
            M_1.default.event.send(Event_1.Event.UI.UpdateInfoPanel, type);
        });
    };
    UpGroundViewCtrl.prototype.createTempBoxNode = function (pos) {
        var item = new UpGroundCellModel_1.default();
        item.init({ box_level: 1 }, pos.x, pos.y, GameModel_1.default.ins.mapIndex);
        var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.UpGroundCell, this.ItemPrefab);
        item.extData = node;
        node.getComponent(ItemUpgroundCtrl_1.default).init(item);
        return node;
    };
    __decorate([
        property(cc.Node)
    ], UpGroundViewCtrl.prototype, "defaultNode", void 0);
    __decorate([
        property(cc.Node)
    ], UpGroundViewCtrl.prototype, "portal", void 0);
    __decorate([
        property(cc.Prefab)
    ], UpGroundViewCtrl.prototype, "portalPrefab", void 0);
    UpGroundViewCtrl = __decorate([
        ccclass
    ], UpGroundViewCtrl);
    return UpGroundViewCtrl;
}(BaseView_1.default));
exports.default = UpGroundViewCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxVcEdyb3VuZFZpZXdDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUEyRDtBQUMzRCw2Q0FBd0M7QUFDeEMsc0RBQXdEO0FBQ3hELHVEQUFrRDtBQUNsRCx1Q0FBa0M7QUFDbEMsZ0RBQTJDO0FBQzNDLHNEQUFpRDtBQUNqRCxnREFBK0M7QUFFL0MsOENBQXlDO0FBQ3pDLGlGQUE0RTtBQUV0RSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE4QyxvQ0FBK0I7SUFBN0U7UUFBQSxxRUFxRUM7UUFsRUcsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsWUFBTSxHQUFZLElBQUksQ0FBQztRQUd2QixrQkFBWSxHQUFjLElBQUksQ0FBQzs7SUE0RG5DLENBQUM7SUF6RFUsbUNBQVEsR0FBZixVQUFnQixNQUE2QjtRQUN6QyxpQkFBTSxRQUFRLFlBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsV0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsc0JBQVcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNsRSxLQUFLLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUc7WUFDOUIsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRztnQkFDOUIsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFNLElBQUksR0FBRyxXQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxzQkFB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LElBQUksR0FBRyxXQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxzQkFBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQywwQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBakVEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eURBQ1U7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDSztJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzBEQUNXO0lBVGQsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0FxRXBDO0lBQUQsdUJBQUM7Q0FyRUQsQUFxRUMsQ0FyRTZDLGtCQUFRLEdBcUVyRDtrQkFyRW9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVcEdyb3VuZENlbGxNb2RlbCBmcm9tIFwiLi4vTW9kZWwvVXBHcm91bmRDZWxsTW9kZWxcIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgTm9kZVBvb2xLZXkgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IEl0ZW1VcGdyb3VuZEN0cmwgZnJvbSBcIi4vSXRlbVVwZ3JvdW5kQ3RybFwiO1xuaW1wb3J0IEJhc2VWaWV3IGZyb20gXCIuL0Jhc2VWaWV3XCI7XG5pbXBvcnQgR2FtZU1vZGVsIGZyb20gXCIuLi9Nb2RlbC9HYW1lTW9kZWxcIjtcbmltcG9ydCBBY3Rpb25DdHJsIGZyb20gXCIuLi8uLi9Db21tb24vQWN0aW9uQ3RybFwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IHsgQ29sbGVjdFR5cGUgfSBmcm9tICcuLi9Nb2RlbC9Db2xsZWN0TW9kZWwnO1xuaW1wb3J0IENvbW1vbiBmcm9tIFwiLi4vLi4vQ29tbW9uL0NvbW1vblwiO1xuaW1wb3J0IFNwaW5lUGxheWVyQ3RybCBmcm9tIFwiLi4vLi4vLi4vQmFzZS9DdXN0b21Db21wb25lbnQvU3BpbmVQbGF5ZXJDdHJsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcEdyb3VuZFZpZXdDdHJsIGV4dGVuZHMgQmFzZVZpZXc8VXBHcm91bmRDZWxsTW9kZWxbXVtdPiB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBkZWZhdWx0Tm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwb3J0YWw6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBwb3J0YWxQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cblxuICAgIHB1YmxpYyBpbml0Vmlldyhtb2RlbHM6IFVwR3JvdW5kQ2VsbE1vZGVsW11bXSkge1xuICAgICAgICBzdXBlci5pbml0Vmlldyhtb2RlbHMpO1xuICAgICAgICBNLm5vZGVQb29sLmNyZWF0ZShOb2RlUG9vbEtleS5VcEdyb3VuZENlbGwsIHRoaXMuSXRlbVByZWZhYiwgMTUwKTtcbiAgICAgICAgZm9yIChsZXQgeSA9IG1vZGVscy5sZW5ndGg7IHktLTspIHtcbiAgICAgICAgICAgIGNvbnN0IHlJdGVtcyA9IG1vZGVsc1t5XTtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSB5SXRlbXMubGVuZ3RoOyB4LS07KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHlJdGVtc1t4XTtcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlID0gTS5ub2RlUG9vbC5nZXRJdGVtKE5vZGVQb29sS2V5LlVwR3JvdW5kQ2VsbCwgdGhpcy5JdGVtUHJlZmFiKTtcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChJdGVtVXBncm91bmRDdHJsKS5pbml0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIGl0ZW0uZXh0RGF0YSA9IG5vZGU7XG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmRlZmF1bHROb2RlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3luY1BvcnRhbChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3luY1BvcnRhbChtb2RlbDogVXBHcm91bmRDZWxsTW9kZWwpIHtcbiAgICAgICAgdGhpcy5wb3J0YWwueSA9IDA7XG4gICAgICAgIGlmIChtb2RlbC5wb3J0YWxJZHggIT0gMCkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IE0ubm9kZVBvb2wuY3JlYXRlSXRlbSh0aGlzLnBvcnRhbFByZWZhYik7XG4gICAgICAgICAgICBjb25zdCBjdHJsID0gbm9kZS5nZXRDb21wb25lbnQoU3BpbmVQbGF5ZXJDdHJsKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5wb3J0YWw7XG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKG1vZGVsLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgbGV0IHBsYXlOYW1lID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChtb2RlbC5wb3J0YWxJZHggPiAwKSB7XG4gICAgICAgICAgICAgICAgbm9kZS55ICs9IENvbW1vbi5HUklEX0ggLyAyO1xuICAgICAgICAgICAgICAgIHBsYXlOYW1lID0gJ2NodWFuc29uZ21lbl9ibHVlJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobW9kZWwucG9ydGFsSWR4IDwgMCkge1xuICAgICAgICAgICAgICAgIG5vZGUueSAtPSBDb21tb24uR1JJRF9IIC8gMjtcbiAgICAgICAgICAgICAgICBwbGF5TmFtZSA9ICdjaHVhbnNvbmdtZW5fb3JhZ2UnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGN0cmwucGxheShwbGF5TmFtZSwgMCwgdHJ1ZSlcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgcGxheUNvbGxlY3RBbmlCeVR5cGUocGFyZW50OiBjYy5Ob2RlLCBwb3M6IGNjLlZlYzIsIHRhcmdldFBvczogY2MuVmVjMiwgdHlwZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGJveE5vZGUgPSB0aGlzLmNyZWF0ZVRlbXBCb3hOb2RlKHBvcyk7XG4gICAgICAgIGJveE5vZGUucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0YXJnZXRQb3MgPSBwYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKSBhcyBjYy5WZWMyO1xuICAgICAgICBBY3Rpb25DdHJsLmlucy5ydW5Db2xsZWN0Tm9ybWFsQ2VsbChib3hOb2RlLCB0YXJnZXRQb3MpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgTS5ub2RlUG9vbC5mcmVlSXRlbShOb2RlUG9vbEtleS5VcEdyb3VuZENlbGwsIGJveE5vZGUpO1xuICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LkVmZmVjdC5Db2xsZWN0T3ZlciwgdGFyZ2V0UG9zKTtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5VSS5VcGRhdGVJbmZvUGFuZWwsIHR5cGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVRlbXBCb3hOb2RlKHBvczogY2MuVmVjMik6IGNjLk5vZGUge1xuICAgICAgICBjb25zdCBpdGVtID0gbmV3IFVwR3JvdW5kQ2VsbE1vZGVsKCk7XG4gICAgICAgIGl0ZW0uaW5pdCh7IGJveF9sZXZlbDogMSB9LCBwb3MueCwgcG9zLnksIEdhbWVNb2RlbC5pbnMubWFwSW5kZXgpO1xuICAgICAgICBjb25zdCBub2RlID0gTS5ub2RlUG9vbC5nZXRJdGVtKE5vZGVQb29sS2V5LlVwR3JvdW5kQ2VsbCwgdGhpcy5JdGVtUHJlZmFiKTtcbiAgICAgICAgaXRlbS5leHREYXRhID0gbm9kZTtcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoSXRlbVVwZ3JvdW5kQ3RybCkuaW5pdChpdGVtKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxufVxuIl19