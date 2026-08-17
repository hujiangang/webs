
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/shop/ShopToolsItemCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '915cbh4SmhLi7MCenfKLAl4', 'ShopToolsItemCtrl');
// Script/Logic/Common/UI/shop/ShopToolsItemCtrl.ts

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
var Common_1 = require("../../Common");
var MoneyManager_1 = require("../../../Data/MoneyManager");
var M_1 = require("../../../../Base/Manager/M");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShopToolsItemCtrl = /** @class */ (function (_super) {
    __extends(ShopToolsItemCtrl, _super);
    function ShopToolsItemCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.title = null;
        _this.bg = null;
        _this.flag = null;
        _this.icon = null;
        _this.unit = null;
        _this.singleCount = null;
        _this.price = null;
        _this.propItemPrefab = null;
        _this.content = null;
        _this.nameFrames = [];
        _this.flagFrames = [];
        _this.bgFrames = [];
        _this._data = null;
        _this._frames = null;
        return _this;
    }
    ShopToolsItemCtrl.prototype.onLoad = function () {
    };
    ShopToolsItemCtrl.prototype.init = function (info, frames, index) {
        var _this = this;
        this._frames = frames;
        this._data = info;
        if (info) {
            this.unit.spriteFrame = this._getRewardIcon(info.currencyType);
            this.title && (this.title.spriteFrame = this.nameFrames[index]);
            this.price.string = "x " + info.price.toString();
            if (this.flag) {
                if (info.flag) {
                    this.flag.spriteFrame = this.flagFrames[info.flag];
                }
                else {
                    this.flag.node.active = false;
                }
            }
            if (this.bg) {
                this.bg.spriteFrame = this.bgFrames[index] || this.bgFrames[this.bgFrames.length - 1];
            }
            if (this.content) {
                if (info.res && this.icon) {
                    Common_1.default.getRemotPic(info.res, this.icon.node.getContentSize()).then(function (frame) {
                        if (frame) {
                            _this.icon.spriteFrame = frame;
                        }
                    });
                }
                if (info.content && info.content.length > 0) {
                    this.content.removeAllChildren();
                    info.content.forEach(function (itemData) {
                        _this._createContentItem(itemData);
                    });
                }
            }
            else {
                this.icon.spriteFrame = this.nameFrames[index];
                this.singleCount.string = info.content[0].count.toString();
            }
        }
    };
    ShopToolsItemCtrl.prototype.onBuyClick = function () {
        var _this = this;
        var result = MoneyManager_1.MoneyManager.CheckMoney(this._data.currencyType, this._data.price, true);
        if (result) {
            //发放东西!
            this._data.content.forEach(function (item) {
                _this._setItem(item);
            });
        }
    };
    ShopToolsItemCtrl.prototype._createContentItem = function (data) {
        var item = cc.instantiate(this.propItemPrefab);
        item.parent = this.content;
        var iconNode = item.getChildByName('icon');
        iconNode.getComponent(cc.Sprite).spriteFrame = this._getRewardIcon(data.type);
        var value = data.count.toString();
        if (data.type < 100) {
            value = Common_1.default.bytesToSize(data.count);
            iconNode.scale = 0.5;
        }
        item.getChildByName('count').getComponent(cc.Label).string = "x" + value;
    };
    ShopToolsItemCtrl.prototype._setItem = function (item) {
        var type = Number(item.type);
        if (type >= 100) {
            M_1.default.runtime.updatePropCount(type, item.count);
        }
        else {
            M_1.default.runtime.addCurrency(type, item.count);
        }
    };
    ShopToolsItemCtrl.prototype._getRewardIcon = function (type) {
        var result = null;
        if (type >= 100) {
            result = this._frames[type - 100];
        }
        else {
            result = this._frames[type + 20];
        }
        return result;
    };
    __decorate([
        property(cc.Sprite)
    ], ShopToolsItemCtrl.prototype, "title", void 0);
    __decorate([
        property(cc.Sprite)
    ], ShopToolsItemCtrl.prototype, "bg", void 0);
    __decorate([
        property(cc.Sprite)
    ], ShopToolsItemCtrl.prototype, "flag", void 0);
    __decorate([
        property(cc.Sprite)
    ], ShopToolsItemCtrl.prototype, "icon", void 0);
    __decorate([
        property(cc.Sprite)
    ], ShopToolsItemCtrl.prototype, "unit", void 0);
    __decorate([
        property(cc.Label)
    ], ShopToolsItemCtrl.prototype, "singleCount", void 0);
    __decorate([
        property(cc.Label)
    ], ShopToolsItemCtrl.prototype, "price", void 0);
    __decorate([
        property(cc.Prefab)
    ], ShopToolsItemCtrl.prototype, "propItemPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], ShopToolsItemCtrl.prototype, "content", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ShopToolsItemCtrl.prototype, "nameFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ShopToolsItemCtrl.prototype, "flagFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ShopToolsItemCtrl.prototype, "bgFrames", void 0);
    ShopToolsItemCtrl = __decorate([
        ccclass
    ], ShopToolsItemCtrl);
    return ShopToolsItemCtrl;
}(cc.Component));
exports.default = ShopToolsItemCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcc2hvcFxcU2hvcFRvb2xzSXRlbUN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdUNBQWtDO0FBQ2xDLDJEQUEwRDtBQUMxRCxnREFBMkM7QUFFckMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBK0MscUNBQVk7SUFBM0Q7UUFBQSxxRUFpSUM7UUE5SEcsV0FBSyxHQUFjLElBQUksQ0FBQztRQUd4QixRQUFFLEdBQWMsSUFBSSxDQUFDO1FBR3JCLFVBQUksR0FBYyxJQUFJLENBQUM7UUFHdkIsVUFBSSxHQUFjLElBQUksQ0FBQztRQUd2QixVQUFJLEdBQWMsSUFBSSxDQUFDO1FBR3ZCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRzdCLFdBQUssR0FBYSxJQUFJLENBQUM7UUFHdkIsb0JBQWMsR0FBYyxJQUFJLENBQUM7UUFHakMsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixnQkFBVSxHQUFxQixFQUFFLENBQUM7UUFHbEMsZ0JBQVUsR0FBcUIsRUFBRSxDQUFDO1FBR2xDLGNBQVEsR0FBcUIsRUFBRSxDQUFDO1FBRXhCLFdBQUssR0FBYSxJQUFJLENBQUM7UUFDdkIsYUFBTyxHQUFxQixJQUFJLENBQUM7O0lBMEY3QyxDQUFDO0lBeEZHLGtDQUFNLEdBQU47SUFFQSxDQUFDO0lBRU0sZ0NBQUksR0FBWCxVQUFZLElBQWMsRUFBRSxNQUF3QixFQUFFLEtBQWE7UUFBbkUsaUJBd0NDO1FBdkNHLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFD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O1NBQ3BDO2FBQU07WUFDSCxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUE7U0FDbkM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBNUhEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ0k7SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDQztJQUdyQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNHO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ0c7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDRztJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzBEQUNVO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ0k7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2REFDYTtJQUdqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNNO0lBR3hCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3lEQUNPO0lBR2xDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3lEQUNPO0lBR2xDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3VEQUNLO0lBcENmLGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBaUlyQztJQUFELHdCQUFDO0NBaklELEFBaUlDLENBakk4QyxFQUFFLENBQUMsU0FBUyxHQWlJMUQ7a0JBaklvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hvcEluZm8gZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvVGFibHMvU2hvcEluZm9cIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uL0NvbW1vblwiO1xuaW1wb3J0IHsgTW9uZXlNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL0RhdGEvTW9uZXlNYW5hZ2VyXCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BUb29sc0l0ZW1DdHJsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgdGl0bGU6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGJnOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBmbGFnOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBpY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICB1bml0OiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHNpbmdsZUNvdW50OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJpY2U6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgcHJvcEl0ZW1QcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBjb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIG5hbWVGcmFtZXM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIGZsYWdGcmFtZXM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIGJnRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBwcml2YXRlIF9kYXRhOiBTaG9wSW5mbyA9IG51bGw7XG4gICAgcHJpdmF0ZSBfZnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KGluZm86IFNob3BJbmZvLCBmcmFtZXM6IGNjLlNwcml0ZUZyYW1lW10sIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZnJhbWVzID0gZnJhbWVzO1xuICAgICAgICB0aGlzLl9kYXRhID0gaW5mbztcbiAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgIHRoaXMudW5pdC5zcHJpdGVGcmFtZSA9IHRoaXMuX2dldFJld2FyZEljb24oaW5mby5jdXJyZW5jeVR5cGUpO1xuICAgICAgICAgICAgdGhpcy50aXRsZSAmJiAodGhpcy50aXRsZS5zcHJpdGVGcmFtZSA9IHRoaXMubmFtZUZyYW1lc1tpbmRleF0pO1xuICAgICAgICAgICAgdGhpcy5wcmljZS5zdHJpbmcgPSBgeCAke2luZm8ucHJpY2UudG9TdHJpbmcoKX1gO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5mbGFnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGluZm8uZmxhZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZsYWcuc3ByaXRlRnJhbWUgPSB0aGlzLmZsYWdGcmFtZXNbaW5mby5mbGFnXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZsYWcubm9kZS5hY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuYmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJnLnNwcml0ZUZyYW1lID0gdGhpcy5iZ0ZyYW1lc1tpbmRleF0gfHwgdGhpcy5iZ0ZyYW1lc1t0aGlzLmJnRnJhbWVzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGluZm8ucmVzICYmIHRoaXMuaWNvbikge1xuICAgICAgICAgICAgICAgICAgICBDb21tb24uZ2V0UmVtb3RQaWMoaW5mby5yZXMsIHRoaXMuaWNvbi5ub2RlLmdldENvbnRlbnRTaXplKCkpLnRoZW4oZnJhbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pY29uLnNwcml0ZUZyYW1lID0gZnJhbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaW5mby5jb250ZW50ICYmIGluZm8uY29udGVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgICAgICAgICAgICAgICAgICBpbmZvLmNvbnRlbnQuZm9yRWFjaChpdGVtRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVDb250ZW50SXRlbShpdGVtRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbi5zcHJpdGVGcmFtZSA9IHRoaXMubmFtZUZyYW1lc1tpbmRleF07XG4gICAgICAgICAgICAgICAgdGhpcy5zaW5nbGVDb3VudC5zdHJpbmcgPSBpbmZvLmNvbnRlbnRbMF0uY291bnQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkJ1eUNsaWNrKCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBNb25leU1hbmFnZXIuQ2hlY2tNb25leSh0aGlzLl9kYXRhLmN1cnJlbmN5VHlwZSwgdGhpcy5fZGF0YS5wcmljZSwgdHJ1ZSlcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgLy/lj5HmlL7kuJzopb8hXG4gICAgICAgICAgICB0aGlzLl9kYXRhLmNvbnRlbnQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRJdGVtKGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9jcmVhdGVDb250ZW50SXRlbShkYXRhOiB7IHR5cGU6IG51bWJlciwgY291bnQ6IG51bWJlciB9KSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByb3BJdGVtUHJlZmFiKVxuICAgICAgICBpdGVtLnBhcmVudCA9IHRoaXMuY29udGVudDtcbiAgICAgICAgY29uc3QgaWNvbk5vZGUgPSBpdGVtLmdldENoaWxkQnlOYW1lKCdpY29uJylcbiAgICAgICAgaWNvbk5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLl9nZXRSZXdhcmRJY29uKGRhdGEudHlwZSk7XG4gICAgICAgIGxldCB2YWx1ZSA9IGRhdGEuY291bnQudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKGRhdGEudHlwZSA8IDEwMCkge1xuICAgICAgICAgICAgdmFsdWUgPSBDb21tb24uYnl0ZXNUb1NpemUoZGF0YS5jb3VudCk7XG4gICAgICAgICAgICBpY29uTm9kZS5zY2FsZSA9IDAuNTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCdjb3VudCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYHgke3ZhbHVlfWA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2V0SXRlbShpdGVtOiB7IHR5cGU6IG51bWJlciwgY291bnQ6IG51bWJlciB9KSB7XG4gICAgICAgIGxldCB0eXBlID0gTnVtYmVyKGl0ZW0udHlwZSk7XG4gICAgICAgIGlmICh0eXBlID49IDEwMCkge1xuICAgICAgICAgICAgTS5ydW50aW1lLnVwZGF0ZVByb3BDb3VudCh0eXBlLCBpdGVtLmNvdW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIE0ucnVudGltZS5hZGRDdXJyZW5jeSh0eXBlLCBpdGVtLmNvdW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFJld2FyZEljb24odHlwZTogbnVtYmVyKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgaWYgKHR5cGUgPj0gMTAwKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9mcmFtZXNbdHlwZSAtIDEwMF1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2ZyYW1lc1t0eXBlICsgMjBdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbn1cbiJdfQ==