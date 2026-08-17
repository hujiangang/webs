"use strict";
cc._RF.push(module, 'd9332z2r8VFuYuiE7zsSFKC', 'SelectLevelCtrl');
// Script/Logic/Common/UI/SelectLevelCtrl.ts

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
var LevelMarkItem_1 = require("../../../Views/LevelMap/LevelMarkItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SelectLevelCtrl = /** @class */ (function (_super) {
    __extends(SelectLevelCtrl, _super);
    function SelectLevelCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.lvItem = null;
        _this.nameLab = null;
        return _this;
    }
    SelectLevelCtrl.prototype.init = function (data) {
        if (data) {
            this.content.removeAllChildren();
            for (var i = data.minLv; i <= data.maxLv; i++) {
                var item = M_1.default.nodePool.createItem(this.lvItem);
                item.parent = this.content;
                item.getComponent(LevelMarkItem_1.default).updateData(i);
            }
            this.nameLab.string = data.name;
            this.nameLab.node.getChildByName('shadow').getComponent(cc.Label).string = data.name;
        }
    };
    __decorate([
        property(cc.Node)
    ], SelectLevelCtrl.prototype, "content", void 0);
    __decorate([
        property(cc.Prefab)
    ], SelectLevelCtrl.prototype, "lvItem", void 0);
    __decorate([
        property(cc.Label)
    ], SelectLevelCtrl.prototype, "nameLab", void 0);
    SelectLevelCtrl = __decorate([
        ccclass
    ], SelectLevelCtrl);
    return SelectLevelCtrl;
}(cc.Component));
exports.default = SelectLevelCtrl;

cc._RF.pop();