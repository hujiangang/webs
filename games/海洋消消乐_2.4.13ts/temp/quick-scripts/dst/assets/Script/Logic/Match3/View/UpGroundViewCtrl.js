
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
var Match3Skin_1 = require("../Skin/Match3Skin");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UpGroundViewCtrl = /** @class */ (function (_super) {
    __extends(UpGroundViewCtrl, _super);
    function UpGroundViewCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultNode = null;
        _this.portal = null;
        return _this;
    }
    UpGroundViewCtrl.prototype.initView = function (models) {
        _super.prototype.initView.call(this, models);
        var itemPrefab = Match3Skin_1.default.requirePrefab("upGroundItem");
        M_1.default.nodePool.create(Constant_1.NodePoolKey.UpGroundCell, itemPrefab, 150);
        for (var y = models.length; y--;) {
            var yItems = models[y];
            for (var x = yItems.length; x--;) {
                var item = yItems[x];
                var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.UpGroundCell, Match3Skin_1.default.requirePrefab("upGroundItem"));
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
            var node = M_1.default.nodePool.createItem(Match3Skin_1.default.requirePrefab("portal"));
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
        var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.UpGroundCell, Match3Skin_1.default.requirePrefab("upGroundItem"));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxVcEdyb3VuZFZpZXdDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUEyRDtBQUMzRCw2Q0FBd0M7QUFDeEMsc0RBQXdEO0FBQ3hELHVEQUFrRDtBQUNsRCx1Q0FBa0M7QUFDbEMsZ0RBQTJDO0FBQzNDLHNEQUFpRDtBQUNqRCxnREFBK0M7QUFFL0MsOENBQXlDO0FBQ3pDLGlGQUE0RTtBQUM1RSxpREFBNEM7QUFFdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBOEMsb0NBQStCO0lBQTdFO1FBQUEscUVBbUVDO1FBaEVHLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLFlBQU0sR0FBWSxJQUFJLENBQUM7O0lBNkQzQixDQUFDO0lBMURVLG1DQUFRLEdBQWYsVUFBZ0IsTUFBNkI7UUFDekMsaUJBQU0sUUFBUSxZQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQU0sVUFBVSxHQUFHLG9CQUFVLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVELFdBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLHNCQUFXLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3RCxLQUFLLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUc7WUFDOUIsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRztnQkFDOUIsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFNLElBQUksR0FBRyxX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QUFHLENBQUMsQ0FBQyxFQUFFLG1CQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLElBQU0sSUFBSSxHQUFHLFdBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLHNCQUFXLENBQUMsWUFBWSxFQUFFLG9CQUFVLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQywwQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBL0REO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eURBQ1U7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDSztJQU5OLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBbUVwQztJQUFELHVCQUFDO0NBbkVELEFBbUVDLENBbkU2QyxrQkFBUSxHQW1FckQ7a0JBbkVvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXBHcm91bmRDZWxsTW9kZWwgZnJvbSBcIi4uL01vZGVsL1VwR3JvdW5kQ2VsbE1vZGVsXCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IE5vZGVQb29sS2V5IH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCBJdGVtVXBncm91bmRDdHJsIGZyb20gXCIuL0l0ZW1VcGdyb3VuZEN0cmxcIjtcbmltcG9ydCBCYXNlVmlldyBmcm9tIFwiLi9CYXNlVmlld1wiO1xuaW1wb3J0IEdhbWVNb2RlbCBmcm9tIFwiLi4vTW9kZWwvR2FtZU1vZGVsXCI7XG5pbXBvcnQgQWN0aW9uQ3RybCBmcm9tIFwiLi4vLi4vQ29tbW9uL0FjdGlvbkN0cmxcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCB7IENvbGxlY3RUeXBlIH0gZnJvbSAnLi4vTW9kZWwvQ29sbGVjdE1vZGVsJztcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCBTcGluZVBsYXllckN0cmwgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvQ3VzdG9tQ29tcG9uZW50L1NwaW5lUGxheWVyQ3RybFwiO1xuaW1wb3J0IE1hdGNoM1NraW4gZnJvbSBcIi4uL1NraW4vTWF0Y2gzU2tpblwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBHcm91bmRWaWV3Q3RybCBleHRlbmRzIEJhc2VWaWV3PFVwR3JvdW5kQ2VsbE1vZGVsW11bXT4ge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZGVmYXVsdE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcG9ydGFsOiBjYy5Ob2RlID0gbnVsbDtcblxuXG4gICAgcHVibGljIGluaXRWaWV3KG1vZGVsczogVXBHcm91bmRDZWxsTW9kZWxbXVtdKSB7XG4gICAgICAgIHN1cGVyLmluaXRWaWV3KG1vZGVscyk7XG4gICAgICAgIGNvbnN0IGl0ZW1QcmVmYWIgPSBNYXRjaDNTa2luLnJlcXVpcmVQcmVmYWIoXCJ1cEdyb3VuZEl0ZW1cIik7XG4gICAgICAgIE0ubm9kZVBvb2wuY3JlYXRlKE5vZGVQb29sS2V5LlVwR3JvdW5kQ2VsbCwgaXRlbVByZWZhYiwgMTUwKTtcbiAgICAgICAgZm9yIChsZXQgeSA9IG1vZGVscy5sZW5ndGg7IHktLTspIHtcbiAgICAgICAgICAgIGNvbnN0IHlJdGVtcyA9IG1vZGVsc1t5XTtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSB5SXRlbXMubGVuZ3RoOyB4LS07KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHlJdGVtc1t4XTtcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlID0gTS5ub2RlUG9vbC5nZXRJdGVtKE5vZGVQb29sS2V5LlVwR3JvdW5kQ2VsbCwgTWF0Y2gzU2tpbi5yZXF1aXJlUHJlZmFiKFwidXBHcm91bmRJdGVtXCIpKTtcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChJdGVtVXBncm91bmRDdHJsKS5pbml0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIGl0ZW0uZXh0RGF0YSA9IG5vZGU7XG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmRlZmF1bHROb2RlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3luY1BvcnRhbChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3luY1BvcnRhbChtb2RlbDogVXBHcm91bmRDZWxsTW9kZWwpIHtcbiAgICAgICAgdGhpcy5wb3J0YWwueSA9IDA7XG4gICAgICAgIGlmIChtb2RlbC5wb3J0YWxJZHggIT0gMCkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IE0ubm9kZVBvb2wuY3JlYXRlSXRlbShNYXRjaDNTa2luLnJlcXVpcmVQcmVmYWIoXCJwb3J0YWxcIikpO1xuICAgICAgICAgICAgY29uc3QgY3RybCA9IG5vZGUuZ2V0Q29tcG9uZW50KFNwaW5lUGxheWVyQ3RybCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMucG9ydGFsO1xuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihtb2RlbC5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIGxldCBwbGF5TmFtZSA9IG51bGw7XG4gICAgICAgICAgICBpZiAobW9kZWwucG9ydGFsSWR4ID4gMCkge1xuICAgICAgICAgICAgICAgIG5vZGUueSArPSBDb21tb24uR1JJRF9IIC8gMjtcbiAgICAgICAgICAgICAgICBwbGF5TmFtZSA9ICdjaHVhbnNvbmdtZW5fYmx1ZSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vZGVsLnBvcnRhbElkeCA8IDApIHtcbiAgICAgICAgICAgICAgICBub2RlLnkgLT0gQ29tbW9uLkdSSURfSCAvIDI7XG4gICAgICAgICAgICAgICAgcGxheU5hbWUgPSAnY2h1YW5zb25nbWVuX29yYWdlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjdHJsLnBsYXkocGxheU5hbWUsIDAsIHRydWUpXG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHVibGljIHBsYXlDb2xsZWN0QW5pQnlUeXBlKHBhcmVudDogY2MuTm9kZSwgcG9zOiBjYy5WZWMyLCB0YXJnZXRQb3M6IGNjLlZlYzIsIHR5cGU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBib3hOb2RlID0gdGhpcy5jcmVhdGVUZW1wQm94Tm9kZShwb3MpO1xuICAgICAgICBib3hOb2RlLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgdGFyZ2V0UG9zID0gcGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcykgYXMgY2MuVmVjMjtcbiAgICAgICAgQWN0aW9uQ3RybC5pbnMucnVuQ29sbGVjdE5vcm1hbENlbGwoYm94Tm9kZSwgdGFyZ2V0UG9zKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIE0ubm9kZVBvb2wuZnJlZUl0ZW0oTm9kZVBvb2xLZXkuVXBHcm91bmRDZWxsLCBib3hOb2RlKTtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5FZmZlY3QuQ29sbGVjdE92ZXIsIHRhcmdldFBvcyk7XG4gICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuVUkuVXBkYXRlSW5mb1BhbmVsLCB0eXBlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVUZW1wQm94Tm9kZShwb3M6IGNjLlZlYzIpOiBjYy5Ob2RlIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ldyBVcEdyb3VuZENlbGxNb2RlbCgpO1xuICAgICAgICBpdGVtLmluaXQoeyBib3hfbGV2ZWw6IDEgfSwgcG9zLngsIHBvcy55LCBHYW1lTW9kZWwuaW5zLm1hcEluZGV4KTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IE0ubm9kZVBvb2wuZ2V0SXRlbShOb2RlUG9vbEtleS5VcEdyb3VuZENlbGwsIE1hdGNoM1NraW4ucmVxdWlyZVByZWZhYihcInVwR3JvdW5kSXRlbVwiKSk7XG4gICAgICAgIGl0ZW0uZXh0RGF0YSA9IG5vZGU7XG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEl0ZW1VcGdyb3VuZEN0cmwpLmluaXQoaXRlbSk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbn1cbiJdfQ==