"use strict";
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