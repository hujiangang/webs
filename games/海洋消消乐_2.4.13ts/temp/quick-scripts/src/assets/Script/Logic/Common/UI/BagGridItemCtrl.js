"use strict";
cc._RF.push(module, 'ad0e8kmbSFK3arO+Qs17gWK', 'BagGridItemCtrl');
// Script/Logic/Common/UI/BagGridItemCtrl.ts

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
var Event_1 = require("../../Data/Const/Event");
var Common_1 = require("../Common");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BagGridItemCtrl = /** @class */ (function (_super) {
    __extends(BagGridItemCtrl, _super);
    function BagGridItemCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.icon = null;
        _this.count = null;
        // private _propInfo: PropInfo = null
        _this._type = null;
        _this._data = null;
        return _this;
    }
    BagGridItemCtrl.prototype.onLoad = function () {
        M_1.default.event.register(Event_1.Event.UI.PropCount, this.updatePorpCount, this);
    };
    BagGridItemCtrl.prototype.onDestroy = function () {
        M_1.default.event.unRegister(Event_1.Event.UI.PropCount, this.updatePorpCount, this);
    };
    BagGridItemCtrl.prototype.init = function (type, data, frame) {
        this.icon.spriteFrame = frame;
        this._type = type;
        this._data = data;
        this.count.string = data.count.toString();
        // this._propInfo = M.table.PropInfo.getByPrimaryKey(type);
        this.icon.enabled = data.count > 0;
    };
    BagGridItemCtrl.prototype.onClick = function () {
        M_1.default.event.send(Event_1.Event.UI.ShowBagTips, this._type, Common_1.default.getWorldPos(this.node), this._data.count);
    };
    BagGridItemCtrl.prototype.updatePorpCount = function (type) {
        if (type === this._type) {
            this.count.string = M_1.default.runtime.getPropData(type).count;
            this.icon.enabled = M_1.default.runtime.getPropData(type).count > 0;
        }
    };
    __decorate([
        property(cc.Sprite)
    ], BagGridItemCtrl.prototype, "icon", void 0);
    __decorate([
        property(cc.Label)
    ], BagGridItemCtrl.prototype, "count", void 0);
    BagGridItemCtrl = __decorate([
        ccclass
    ], BagGridItemCtrl);
    return BagGridItemCtrl;
}(cc.Component));
exports.default = BagGridItemCtrl;

cc._RF.pop();