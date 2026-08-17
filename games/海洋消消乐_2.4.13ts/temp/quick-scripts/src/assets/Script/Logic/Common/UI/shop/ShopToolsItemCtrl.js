"use strict";
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