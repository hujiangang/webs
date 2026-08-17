
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/shop/ShopPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcc2hvcFxcU2hvcFBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUFnRDtBQUNoRCx5REFBMEQ7QUFDMUQsZ0RBQTJDO0FBRTNDLHlEQUFvRDtBQUU5QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF1Qyw2QkFBTTtJQUE3QztRQUFBLHFFQXNFQztRQW5FRyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsaUJBQVcsR0FBYyxJQUFJLENBQUM7UUFHOUIsb0JBQWMsR0FBYyxJQUFJLENBQUM7UUFHakMsWUFBTSxHQUFxQixFQUFFLENBQUM7O0lBdURsQyxDQUFDO0lBckRHLDBCQUFNLEdBQU47SUFJQSxDQUFDO0lBRU0sMEJBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXZELENBQUM7SUFFTSxnQ0FBWSxHQUFuQjtRQUNJLFdBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLGlCQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVNLG9DQUFnQixHQUF2QjtJQUVBLENBQUM7SUFFTSxvQ0FBZ0IsR0FBdkIsVUFBd0IsS0FBSztRQUN6QixRQUFRLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ3JCLEtBQUssT0FBTztnQkFDUixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUM1QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztpQkFDM0I7Z0JBQ0QsTUFBTTtZQUNWLEtBQUssS0FBSztnQkFDTixpQ0FBaUM7Z0JBQ2pDLDhCQUE4QjtnQkFDOUIsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUVPLG9DQUFnQixHQUF4QjtRQUFBLGlCQWVDO1FBZEcsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzVCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztRQUN2QixXQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSztZQUMzQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQzFCLEtBQUssR0FBRyxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBO2dCQUNqRSxJQUFJLEdBQUcsV0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ3JEO2lCQUFNO2dCQUNILElBQUksR0FBRyxXQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDbEQ7WUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLDJCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hFLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQWpFRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7OENBQ007SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztrREFDVTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNhO0lBR2pDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzZDQUNHO0lBZmIsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXNFN0I7SUFBRCxnQkFBQztDQXRFRCxBQXNFQyxDQXRFc0MsZ0JBQU0sR0FzRTVDO2tCQXRFb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVSUJhc2UgZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvVUkvVUlCYXNlXCI7XG5pbXBvcnQgeyBVSUh1ZERlZiB9IGZyb20gXCIuLi8uLi8uLi9EYXRhL0ludGVyZmFjZS9VSURhdGFcIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IFNob3BJbmZvIGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL1RhYmxzL1Nob3BJbmZvXCI7XG5pbXBvcnQgU2hvcFRvb2xzSXRlbUN0cmwgZnJvbSBcIi4vU2hvcFRvb2xzSXRlbUN0cmxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BQYW5lbCBleHRlbmRzIFVJQmFzZSB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0b29sc05vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZGVjTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHRvb2xzUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBvbmx5Q29pblByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIGZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgb25Mb2FkKCkge1xuXG5cblxuICAgIH1cblxuICAgIHB1YmxpYyBvbkluaXQoKSB7XG4gICAgICAgIHRoaXMudG9vbHNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uTWFpbkJ0bkNoYW5nZWQoeyBub2RlOiB7IG5hbWU6ICd0b29scycgfSB9KTtcblxuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsb3NlQ2xpY2soKSB7XG4gICAgICAgIE0udWkuaGlkZVVJKFVJSHVkRGVmLlNob3BQYW5lbCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2hvd1ZpZGVvQ2xpY2soKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgb25NYWluQnRuQ2hhbmdlZChldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50Lm5vZGUubmFtZSkge1xuICAgICAgICAgICAgY2FzZSAndG9vbHMnOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy50b29sc05vZGUuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9vbHNOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0VG9vbHNDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGVjJzpcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnRvb2xzTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmRlY05vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFRvb2xzQ29udGVudCgpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IGNjLmZpbmQoJ3ZpZXcvY29udGVudCcsIHRoaXMudG9vbHNOb2RlKTtcbiAgICAgICAgY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgICAgICBsZXQgc2luZ2xlSW5kZXggPSBudWxsO1xuICAgICAgICBNLnRhYmxlLlNob3BJbmZvLmdldERhdGEoKS5mb3JFYWNoKChpbmZvLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGluZm8uY29udGVudC5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gc2luZ2xlSW5kZXggPT0gbnVsbCA/IChzaW5nbGVJbmRleCA9IDApIDogKHNpbmdsZUluZGV4KyspXG4gICAgICAgICAgICAgICAgbm9kZSA9IE0ubm9kZVBvb2wuY3JlYXRlSXRlbSh0aGlzLm9ubHlDb2luUHJlZmFiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IE0ubm9kZVBvb2wuY3JlYXRlSXRlbSh0aGlzLnRvb2xzUHJlZmFiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gY29udGVudFxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoU2hvcFRvb2xzSXRlbUN0cmwpLmluaXQoaW5mbywgdGhpcy5mcmFtZXMsIGluZGV4KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbn1cbiJdfQ==