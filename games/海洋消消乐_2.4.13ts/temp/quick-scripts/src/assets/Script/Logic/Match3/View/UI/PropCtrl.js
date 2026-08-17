"use strict";
cc._RF.push(module, 'ec6de7rJXhK7pLWTMebmnWo', 'PropCtrl');
// Script/Logic/Match3/View/UI/PropCtrl.ts

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
var PropItemCtrl_1 = require("./PropItemCtrl");
var Constant_1 = require("../../../Data/Const/Constant");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PropCtrl = /** @class */ (function (_super) {
    __extends(PropCtrl, _super);
    function PropCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.propItemPrefab = null;
        _this.propIcons = [];
        return _this;
    }
    PropCtrl.prototype.onLoad = function () {
    };
    PropCtrl.prototype.init = function () {
        for (var type = Constant_1.PropType.BeikeBomb; type <= Constant_1.PropType.Board; type++) {
            var data = M_1.default.runtime.getPropData(type) || { count: 0 };
            this._createItem(type, data.count);
        }
    };
    PropCtrl.prototype._createItem = function (type, count) {
        var item = M_1.default.nodePool.createItem(this.propItemPrefab);
        var itemCtrl = item.getComponent(PropItemCtrl_1.default);
        itemCtrl && itemCtrl.init(type, this.propIcons[type - 100], count);
        item.name = "item_" + type;
        item.parent = this.node;
    };
    __decorate([
        property(cc.Prefab)
    ], PropCtrl.prototype, "propItemPrefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], PropCtrl.prototype, "propIcons", void 0);
    PropCtrl = __decorate([
        ccclass
    ], PropCtrl);
    return PropCtrl;
}(cc.Component));
exports.default = PropCtrl;

cc._RF.pop();