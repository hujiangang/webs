"use strict";
cc._RF.push(module, '351b4fMa2ZMYajQIUvDZ90J', 'PropItemCtrl');
// Script/Logic/Match3/View/UI/PropItemCtrl.ts

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
var M_1 = require("../../../../Base/Manager/M");
var Event_1 = require("../../../Data/Const/Event");
var UIData_1 = require("../../../Data/Interface/UIData");
var Util_1 = require("../../../../Base/Utils/Util");
var Paths_1 = require("../../../../Base/Utils/Paths");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PropItemCtrl = /** @class */ (function (_super) {
    __extends(PropItemCtrl, _super);
    function PropItemCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.countLab = null;
        _this.icon = null;
        _this.addBtn = null;
        _this._type = null;
        return _this;
    }
    PropItemCtrl.prototype.onDestroy = function () {
        M_1.default.event.unRegister(Event_1.Event.UI.PropCount, this.onPropCountChanged, this);
    };
    PropItemCtrl.prototype.init = function (type, icon, count) {
        this._type = type;
        this.icon.spriteFrame = icon;
        this._showCount(count);
        M_1.default.event.register(Event_1.Event.UI.PropCount, this.onPropCountChanged, this);
    };
    //初始化 没有带道具icon
    PropItemCtrl.prototype.initOnlyType = function (type, count) {
        var _this = this;
        this._type = type;
        this._showCount(count);
        M_1.default.event.register(Event_1.Event.UI.PropCount, this.onPropCountChanged, this);
        Util_1.Util.Loader.loadSpriteFrame(Paths_1.default.getItemPath(type), function (err, texture) {
            if (texture && _this.icon)
                _this.icon.spriteFrame = texture;
        });
    };
    PropItemCtrl.prototype.onClick = function () {
        var propInfo = M_1.default.runtime.getPropData(this._type);
        if (propInfo && propInfo.count > 0) {
            M_1.default.event.send(Event_1.Event.GameCMD.PropClick, this._type);
        }
        else {
            // M.tips.show(WaringTips.PropNotEnough);
            //弹框购买!
            M_1.default.ui.showUI(UIData_1.UIHudDef.BuyProp, this._type);
        }
    };
    PropItemCtrl.prototype._showCount = function (count) {
        if (count <= 0) {
            this.addBtn.active = true;
            this.countLab.node.parent.active = false;
        }
        else {
            this.addBtn.active = false;
            this.countLab.string = count.toString();
            this.countLab.node.parent.active = true;
        }
    };
    PropItemCtrl.prototype.onPropCountChanged = function (type) {
        if (this._type == type) {
            var cd = M_1.default.runtime.getPropData(type);
            if (cd) {
                this.countLab.string = cd.count;
                this._showCount(cd.count);
            }
        }
    };
    __decorate([
        property(cc.Label)
    ], PropItemCtrl.prototype, "countLab", void 0);
    __decorate([
        property(cc.Sprite)
    ], PropItemCtrl.prototype, "icon", void 0);
    __decorate([
        property(cc.Node)
    ], PropItemCtrl.prototype, "addBtn", void 0);
    PropItemCtrl = __decorate([
        ccclass
    ], PropItemCtrl);
    return PropItemCtrl;
}(cc.Component));
exports.default = PropItemCtrl;

cc._RF.pop();