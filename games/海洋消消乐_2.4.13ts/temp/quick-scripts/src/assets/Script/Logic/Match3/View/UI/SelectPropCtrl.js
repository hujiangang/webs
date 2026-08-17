"use strict";
cc._RF.push(module, '284fcdVga5K8qWYoC2UQCUB', 'SelectPropCtrl');
// Script/Logic/Match3/View/UI/SelectPropCtrl.ts

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
var Constant_1 = require("../../../Data/Const/Constant");
var M_1 = require("../../../../Base/Manager/M");
var UIData_1 = require("../../../Data/Interface/UIData");
var Event_1 = require("../../../Data/Const/Event");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SelectPropCtrl = /** @class */ (function (_super) {
    __extends(SelectPropCtrl, _super);
    function SelectPropCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prop1 = null;
        _this.prop2 = null;
        _this.prop3 = null;
        _this.tipsNode = null;
        _this.tipsContent = null;
        _this.propFrames = [];
        return _this;
    }
    SelectPropCtrl.prototype.onLoad = function () {
        M_1.default.event.register(Event_1.Event.UI.PropCount, this.onPropCountChanged, this);
    };
    SelectPropCtrl.prototype.onDestroy = function () {
        M_1.default.event.unRegister(Event_1.Event.UI.PropCount, this.onPropCountChanged, this);
    };
    SelectPropCtrl.prototype.init = function () {
        this._hideTips();
        this._initPropLockState();
        this._initSelect();
    };
    SelectPropCtrl.prototype._initPropLockState = function () {
        var _this = this;
        var types = [Constant_1.PropType.Add3Step, Constant_1.PropType.StartBomb, Constant_1.PropType.StartStar];
        types.forEach(function (type) {
            var index = type - Constant_1.PropType.Add3Step;
            if (M_1.default.runtime.isPropUnLocked(type)) {
                var sprite_1 = _this["prop" + (index + 1)];
                var node_1 = sprite_1.node;
                //sprite.spriteFrame = this.propFrames[index];
                //node.y = 0;
                //node.scale = 0.6;
                // this._updateIconState(type, node);
                node_1.getChildByName('add').active = true;
                var lbNum = node_1.getChildByName('titleNoOpen').getComponent(cc.Label);
                lbNum.string = "暂未开启";
            }
            else if (!_this.tipsNode.active) {
                var sprite_2 = _this["prop" + (index + 1)];
                var node_2 = sprite_2.node;
                _this._showTips(sprite_2.node.position, type);
                node_2.getChildByName('add').active = false;
                var lbNum = node_2.getChildByName('titleNoOpen').getComponent(cc.Label);
                lbNum.string = "暂未开启";
            }
            //显示加号
            var sprite = _this["prop" + (index + 1)];
            var node = sprite.node;
            _this._updateIconState(type, node);
            //暂未解锁提示是否显示
            //const sprite2: cc.Sprite = this[`prop${index + 1}`]
            //sprite2.node.getChildByName('titleNoOpen').active = !M.runtime.isPropUnLocked(type);
        });
    };
    SelectPropCtrl.prototype._updateIconState = function (type, node) {
        var data = M_1.default.runtime.getPropData(type);
        if (!data || data.count <= 0) {
            //node.getChildByName('add').active = true;
            //node.getChildByName('titleNoOpen').active=true;
        }
        else {
            node.getChildByName('add').active = false;
            // node.getChildByName('titleNoOpen').active=true;
            var lbNum = node.getChildByName('titleNoOpen').getComponent(cc.Label);
            lbNum.string = data.count.toString();
            cc.log("数量： " + data.count);
        }
        // node.getChildByName('titleNoOpen').active = !M.runtime.isPropUnLocked(type);
    };
    SelectPropCtrl.prototype._hideTips = function () {
        this.tipsNode.active = false;
    };
    SelectPropCtrl.prototype._showTips = function (pos, type) {
        this.tipsNode.x = pos.x;
        this.tipsNode.active = true;
        var info = M_1.default.table.PropInfo.getByPrimaryKey(type);
        this.tipsContent.string = info.unlockLv + "\u5173\u5F00\u542F!";
    };
    SelectPropCtrl.prototype._initSelect = function () {
        for (var i = 1; i <= 3; i++) {
            var node = this["prop" + i].node.getChildByName('selected');
            if (M_1.default.runtime.SelectProp && M_1.default.runtime.SelectProp == (Constant_1.PropType.Add3Step + (i - 1))) {
                node.active = true;
            }
            else {
                node.active = false;
            }
        }
    };
    SelectPropCtrl.prototype.onPropCountChanged = function (type) {
        if (this.node.active && this.node.activeInHierarchy) {
            var index = type - Constant_1.PropType.Add3Step;
            var sprite = this["prop" + (index + 1)];
            this._updateIconState(type, sprite.node);
        }
    };
    SelectPropCtrl.prototype.onClick = function (event, cv) {
        var type = Number(cv);
        var data = M_1.default.runtime.getPropData(type);
        if (M_1.default.runtime.isPropUnLocked(type)) {
            if (!data || data.count <= 0) {
                M_1.default.ui.showUI(UIData_1.UIHudDef.BuyProp, type);
                cc.log("选中: " + type);
            }
            else {
                this._updateSelectPropDisplay(type);
                M_1.default.runtime.SelectProp = type;
                cc.log("选中data.count: " + data.count);
            }
        }
        else {
            cc.log("选中 isPropUnLocked: false");
        }
    };
    SelectPropCtrl.prototype._updateSelectPropDisplay = function (type) {
        var index = type - Constant_1.PropType.Add3Step + 1;
        if (M_1.default.runtime.SelectProp == type) {
            var node = this["prop" + (type - Constant_1.PropType.Add3Step + 1)].node.getChildByName('selected');
            if (node.active == true) {
                node.active = false;
            }
            else {
                node.active = true;
            }
            //node.active = !node.active;
            if (node.active == true)
                M_1.default.runtime.SelectProp = null;
            var node1 = this["prop" + (type - Constant_1.PropType.Add3Step + 1)].node;
            //node1.getChildByName('titleNoOpen').active = !M.runtime.isPropUnLocked(type);
        }
        else {
            for (var i = 1; i <= 3; i++) {
                var node = this["prop" + i].node.getChildByName('selected');
                if (index == i) {
                    node.active = true;
                }
                else {
                    node.active = false;
                }
                var node1 = this["prop" + i].node;
                //node1.getChildByName('titleNoOpen').active = !M.runtime.isPropUnLocked(type);
            }
        }
    };
    __decorate([
        property(cc.Sprite)
    ], SelectPropCtrl.prototype, "prop1", void 0);
    __decorate([
        property(cc.Sprite)
    ], SelectPropCtrl.prototype, "prop2", void 0);
    __decorate([
        property(cc.Sprite)
    ], SelectPropCtrl.prototype, "prop3", void 0);
    __decorate([
        property(cc.Node)
    ], SelectPropCtrl.prototype, "tipsNode", void 0);
    __decorate([
        property(cc.Label)
    ], SelectPropCtrl.prototype, "tipsContent", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], SelectPropCtrl.prototype, "propFrames", void 0);
    SelectPropCtrl = __decorate([
        ccclass
    ], SelectPropCtrl);
    return SelectPropCtrl;
}(cc.Component));
exports.default = SelectPropCtrl;

cc._RF.pop();