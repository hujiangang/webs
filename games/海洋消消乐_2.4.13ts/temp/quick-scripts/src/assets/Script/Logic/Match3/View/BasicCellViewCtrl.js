"use strict";
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