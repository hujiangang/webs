
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/BagCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcQmFnQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBNkM7QUFDN0MscURBQWdEO0FBQ2hELHNEQUF1RDtBQUN2RCw2Q0FBd0M7QUFDeEMscURBQWdEO0FBQ2hELHNEQUFnRjtBQUVoRixnREFBK0M7QUFDL0MscURBQXFEO0FBQ3JELG9DQUErQjtBQUV6QixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFxQywyQkFBTTtJQUEzQztRQUFBLHFFQTBGQztRQXZGRyxnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsZUFBUyxHQUFxQixFQUFFLENBQUM7UUFFekIsaUJBQVcsR0FBYSxJQUFJLENBQUM7O0lBNEV6QyxDQUFDO0lBMUVHLHdCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLFdBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQUssQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELDJCQUFTLEdBQVQ7UUFDSSxXQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxhQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSx3QkFBTSxHQUFiO1FBQ0ksSUFBTSxJQUFJLEdBQUcsV0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDbEMs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NkNBQ087SUFHekI7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7OENBQ007SUFaaEIsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQTBGM0I7SUFBRCxjQUFDO0NBMUZELEFBMEZDLENBMUZvQyxnQkFBTSxHQTBGMUM7a0JBMUZvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVJQmFzZSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VSS9VSUJhc2VcIjtcbmltcG9ydCBVSU1nciBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL1VJTWdyXCI7XG5pbXBvcnQgeyBVSUh1ZERlZiB9IGZyb20gXCIuLi8uLi9EYXRhL0ludGVyZmFjZS9VSURhdGFcIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IEJhZ0dyaWRJdGVtQ3RybCBmcm9tIFwiLi9CYWdHcmlkSXRlbUN0cmxcIjtcbmltcG9ydCB7IFByb3BUeXBlLCBNYXhQb3dlckNvdW50LCBXYXJpbmdUaXBzIH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCB7IGFjY2Vzc1N5bmMgfSBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCB7IEN1cnJlbmN5SWQgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9CYXNlQ29uc3RcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uL0NvbW1vblwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFnQ3RybCBleHRlbmRzIFVJQmFzZSB7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGl0ZW1QcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBjb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRpcHNOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIHByb3BGcmFtczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBfc2VsZWN0VHlwZTogUHJvcFR5cGUgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgTS5ldmVudC5yZWdpc3RlcihFdmVudC5VSS5TaG93QmFnVGlwcywgdGhpcy5zaG93VGlwcywgdGhpcyk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuVUkuU2hvd0JhZ1RpcHMsIHRoaXMuc2hvd1RpcHMsIHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkluaXQoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBNLnJ1bnRpbWUuZ2V0UHJvcERhdGEoKTtcbiAgICAgICAgdGhpcy5jb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xuICAgICAgICB0aGlzLnRpcHNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IGlkIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBOdW1iZXIoaWQpO1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IE0ubm9kZVBvb2wuY3JlYXRlSXRlbSh0aGlzLml0ZW1QcmVmYWIpO1xuICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoQmFnR3JpZEl0ZW1DdHJsKS5pbml0KHR5cGUsIGRhdGFbaWRdLCB0aGlzLnByb3BGcmFtc1t0eXBlIC0gMTAwXSk7XG4gICAgICAgICAgICBpdGVtLnBhcmVudCA9IHRoaXMuY29udGVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsb3NlQ2xpY2soKSB7XG4gICAgICAgIFVJTWdyLmlucy5oaWRlVUkoVUlIdWREZWYuQmFnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25IaWRlVGlwcygpIHtcbiAgICAgICAgdGhpcy50aXBzTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc2VsZWN0VHlwZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dUaXBzKHR5cGU6IFByb3BUeXBlLCBwb3M6IGNjLlZlYzIsIGNvdW50OiBudW1iZXIpIHtcblxuICAgICAgICBjb25zdCBpbmZvID0gTS50YWJsZS5Qcm9wSW5mby5nZXRCeVByaW1hcnlLZXkodHlwZSk7XG4gICAgICAgIHBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3MpIGFzIGNjLlZlYzI7XG4gICAgICAgIHRoaXMudGlwc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ25hbWUnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGluZm8ubmFtZTtcbiAgICAgICAgdGhpcy50aXBzTm9kZS5nZXRDaGlsZEJ5TmFtZSgnZGV0YWlsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBpbmZvLmRldGFpbDtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gdGhpcy50aXBzTm9kZS5nZXRDaGlsZEJ5TmFtZSgndXNlQnRuJykuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG5cbiAgICAgICAgcG9zLnggPSBwb3MueC01MDtcbiAgICAgICAgcG9zLnkgPSBwb3MueSs0MDtcblxuICAgICAgICB0aGlzLnRpcHNOb2RlLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIHRoaXMudGlwc05vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgY29uc3Qgd3BvcyA9IENvbW1vbi5nZXRXb3JsZFBvcyh0aGlzLnRpcHNOb2RlKTtcbiAgICAgICAgaWYgKHdwb3MueCArIHRoaXMudGlwc05vZGUud2lkdGggKiAoMSAtIHRoaXMudGlwc05vZGUuYW5jaG9yWCkgPiBjYy53aW5TaXplLndpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLnRpcHNOb2RlLnggLT0gdGhpcy50aXBzTm9kZS53aWR0aCAqIDAuNDtcbiAgICAgICAgICAgIHRoaXMudGlwc05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuc2NhbGVYID0gLTE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRpcHNOb2RlLmdldENoaWxkQnlOYW1lKCdiZycpLnNjYWxlWCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZm8uaXNCYWdVc2UgJiYgY291bnQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RUeXBlID0gdHlwZTtcbiAgICAgICAgICAgIGJ1dHRvbi5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnV0dG9uLmludGVyYWN0YWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVzZVByb3BzKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuX3NlbGVjdFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgUHJvcFR5cGUuUG93ZXJCb3R0bGUxOlxuICAgICAgICAgICAgY2FzZSBQcm9wVHlwZS5Qb3dlckJvdHRsZTI6XG4gICAgICAgICAgICAgICAgY29uc3QgaW5mbyA9IE0udGFibGUuUHJvcEluZm8uZ2V0QnlQcmltYXJ5S2V5KHRoaXMuX3NlbGVjdFR5cGUpO1xuICAgICAgICAgICAgICAgIGlmIChNLnJ1bnRpbWUuZ2V0Q3VycmVuY3koQ3VycmVuY3lJZC5Qb3dlcikgPj0gTWF4UG93ZXJDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBNLnRpcHMuc2hvdyhXYXJpbmdUaXBzLlBvd2VyTWF4KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBNLnJ1bnRpbWUuYWRkQ3VycmVuY3koQ3VycmVuY3lJZC5Qb3dlciwgaW5mby52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5HYW1lQ01ELlByb3BVc2VkKTtcbiAgICAgICAgICAgICAgICAgICAgTS5ydW50aW1lLnVwZGF0ZVByb3BDb3VudCh0aGlzLl9zZWxlY3RUeXBlLCAtMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=