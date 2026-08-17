"use strict";
cc._RF.push(module, 'f9accg3Ss1KN7hvavMudbJt', 'ShopPanel');
// Script/Logic/Common/UI/shop/ShopPanel.ts

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
var UIBase_1 = require("../../../../Base/UI/UIBase");
var UIData_1 = require("../../../Data/Interface/UIData");
var M_1 = require("../../../../Base/Manager/M");
var ShopToolsItemCtrl_1 = require("./ShopToolsItemCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShopPanel = /** @class */ (function (_super) {
    __extends(ShopPanel, _super);
    function ShopPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolsNode = null;
        _this.decNode = null;
        _this.toolsPrefab = null;
        _this.onlyCoinPrefab = null;
        _this.frames = [];
        return _this;
    }
    ShopPanel.prototype.onLoad = function () {
    };
    ShopPanel.prototype.onInit = function () {
        this.toolsNode.active = false;
        this.onMainBtnChanged({ node: { name: 'tools' } });
    };
    ShopPanel.prototype.onCloseClick = function () {
        M_1.default.ui.hideUI(UIData_1.UIHudDef.ShopPanel);
    };
    ShopPanel.prototype.onShowVideoClick = function () {
    };
    ShopPanel.prototype.onMainBtnChanged = function (event) {
        switch (event.node.name) {
            case 'tools':
                if (!this.toolsNode.active) {
                    this.toolsNode.active = true;
                    this.decNode.active = false;
                    this.initToolsContent();
                }
                break;
            case 'dec':
                // this.toolsNode.active = false;
                // this.decNode.active = true;
                break;
        }
    };
    ShopPanel.prototype.initToolsContent = function () {
        var _this = this;
        var content = cc.find('view/content', this.toolsNode);
        content.removeAllChildren();
        var singleIndex = null;
        M_1.default.table.ShopInfo.getData().forEach(function (info, index) {
            var node = null;
            if (info.content.length == 1) {
                index = singleIndex == null ? (singleIndex = 0) : (singleIndex++);
                node = M_1.default.nodePool.createItem(_this.onlyCoinPrefab);
            }
            else {
                node = M_1.default.nodePool.createItem(_this.toolsPrefab);
            }
            node.parent = content;
            node.getComponent(ShopToolsItemCtrl_1.default).init(info, _this.frames, index);
        });
    };
    __decorate([
        property(cc.Node)
    ], ShopPanel.prototype, "toolsNode", void 0);
    __decorate([
        property(cc.Node)
    ], ShopPanel.prototype, "decNode", void 0);
    __decorate([
        property(cc.Prefab)
    ], ShopPanel.prototype, "toolsPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], ShopPanel.prototype, "onlyCoinPrefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ShopPanel.prototype, "frames", void 0);
    ShopPanel = __decorate([
        ccclass
    ], ShopPanel);
    return ShopPanel;
}(UIBase_1.default));
exports.default = ShopPanel;

cc._RF.pop();