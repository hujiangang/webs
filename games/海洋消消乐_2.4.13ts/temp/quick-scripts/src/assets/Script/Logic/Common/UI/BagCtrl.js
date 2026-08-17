"use strict";
cc._RF.push(module, '60dfc/kJmZIuI3jKnCdvbZc', 'BagCtrl');
// Script/Logic/Common/UI/BagCtrl.ts

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
var M_1 = require("../../../Base/Manager/M");
var BagGridItemCtrl_1 = require("./BagGridItemCtrl");
var Constant_1 = require("../../Data/Const/Constant");
var Event_1 = require("../../Data/Const/Event");
var BaseConst_1 = require("../../../Base/BaseConst");
var Common_1 = require("../Common");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BagCtrl = /** @class */ (function (_super) {
    __extends(BagCtrl, _super);
    function BagCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemPrefab = null;
        _this.content = null;
        _this.tipsNode = null;
        _this.propFrams = [];
        _this._selectType = null;
        return _this;
    }
    BagCtrl.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        M_1.default.event.register(Event_1.Event.UI.ShowBagTips, this.showTips, this);
    };
    BagCtrl.prototype.onDestroy = function () {
        M_1.default.event.unRegister(Event_1.Event.UI.ShowBagTips, this.showTips, this);
    };
    BagCtrl.prototype.onInit = function () {
        var data = M_1.default.runtime.getPropData();
        this.content.destroyAllChildren();
        this.tipsNode.active = false;
        for (var id in data) {
            var type = Number(id);
            var item = M_1.default.nodePool.createItem(this.itemPrefab);
            item.getComponent(BagGridItemCtrl_1.default).init(type, data[id], this.propFrams[type - 100]);
            item.parent = this.content;
        }
    };
    BagCtrl.prototype.onCloseClick = function () {
        UIMgr_1.default.ins.hideUI(UIData_1.UIHudDef.Bag);
    };
    BagCtrl.prototype.onHideTips = function () {
        this.tipsNode.active = false;
        this._selectType = null;
    };
    BagCtrl.prototype.showTips = function (type, pos, count) {
        var info = M_1.default.table.PropInfo.getByPrimaryKey(type);
        pos = this.node.convertToNodeSpaceAR(pos);
        this.tipsNode.getChildByName('name').getComponent(cc.Label).string = info.name;
        this.tipsNode.getChildByName('detail').getComponent(cc.Label).string = info.detail;
        var button = this.tipsNode.getChildByName('useBtn').getComponent(cc.Button);
        pos.x = pos.x - 50;
        pos.y = pos.y + 40;
        this.tipsNode.setPosition(pos);
        this.tipsNode.active = true;
        var wpos = Common_1.default.getWorldPos(this.tipsNode);
        if (wpos.x + this.tipsNode.width * (1 - this.tipsNode.anchorX) > cc.winSize.width) {
            this.tipsNode.x -= this.tipsNode.width * 0.4;
            this.tipsNode.getChildByName('bg').scaleX = -1;
        }
        else {
            this.tipsNode.getChildByName('bg').scaleX = 1;
        }
        if (info.isBagUse && count > 0) {
            this._selectType = type;
            button.interactable = true;
        }
        else {
            button.interactable = false;
        }
    };
    BagCtrl.prototype.useProps = function () {
        switch (this._selectType) {
            case Constant_1.PropType.PowerBottle1:
            case Constant_1.PropType.PowerBottle2:
                var info = M_1.default.table.PropInfo.getByPrimaryKey(this._selectType);
                if (M_1.default.runtime.getCurrency(BaseConst_1.CurrencyId.Power) >= Constant_1.MaxPowerCount) {
                    M_1.default.tips.show(Constant_1.WaringTips.PowerMax);
                }
                else {
                    M_1.default.runtime.addCurrency(BaseConst_1.CurrencyId.Power, info.value);
                    M_1.default.event.send(Event_1.Event.GameCMD.PropUsed);
                    M_1.default.runtime.updatePropCount(this._selectType, -1);
                }
                break;
        }
    };
    __decorate([
        property(cc.Prefab)
    ], BagCtrl.prototype, "itemPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], BagCtrl.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], BagCtrl.prototype, "tipsNode", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], BagCtrl.prototype, "propFrams", void 0);
    BagCtrl = __decorate([
        ccclass
    ], BagCtrl);
    return BagCtrl;
}(UIBase_1.default));
exports.default = BagCtrl;

cc._RF.pop();