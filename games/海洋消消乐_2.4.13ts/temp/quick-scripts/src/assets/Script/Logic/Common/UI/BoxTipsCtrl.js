"use strict";
cc._RF.push(module, 'e169fjqJrJFoJcxdsYoFPFC', 'BoxTipsCtrl');
// Script/Logic/Common/UI/BoxTipsCtrl.ts

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
var Constant_1 = require("../../Data/Const/Constant");
var BaseConst_1 = require("../../../Base/BaseConst");
var Common_1 = require("../Common");
var Util_1 = require("../../../Base/Utils/Util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BoxTipsCtrl = /** @class */ (function (_super) {
    __extends(BoxTipsCtrl, _super);
    function BoxTipsCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.title = null;
        _this.rewardPrefab = null;
        _this.rewardIconFrames = [];
        _this.isReady = false;
        return _this;
    }
    BoxTipsCtrl.prototype.onLoad = function () {
    };
    BoxTipsCtrl.prototype.updateData = function (title, contentSize) {
        this.title.string = title;
        if (contentSize) {
            this.node.setContentSize(contentSize);
        }
    };
    BoxTipsCtrl.prototype.show = function (data, pos) {
        var _this = this;
        if (data) {
            this.content.destroyAllChildren();
            data.forEach(function (item) {
                var node = M_1.default.nodePool.createItem(_this.rewardPrefab);
                var count = item.count.toString();
                node.parent = _this.content;
                node.setScale(0.8);
                var icon = node.getChildByName('icon');
                if (item.type < Constant_1.PropType.BeikeBomb) {
                    icon.setScale(1);
                }
                if (item.type == BaseConst_1.CurrencyId.Coin) {
                    count = Common_1.default.bytesToSize(item.count);
                }
                icon.getComponent(cc.Sprite).spriteFrame = _this._getRewardIcon(item.type);
                node.getChildByName('count').getComponent(cc.Label).string = "x" + count;
            });
            pos && this.node.setPosition(pos);
            this.node.active = true;
            this.scheduleOnce(function () {
                _this.isReady = true;
            }, 0.5);
            Util_1.Util.Tool.OpenUITween(this.node, null);
        }
    };
    BoxTipsCtrl.prototype.hide = function () {
        this.node.active = false;
        this.isReady = false;
        Util_1.Util.Tool.CloseUITween(this.node, null);
    };
    BoxTipsCtrl.prototype._getRewardIcon = function (type) {
        var result = null;
        if (type >= Constant_1.PropType.BeikeBomb) {
            result = this.rewardIconFrames[type - Constant_1.PropType.BeikeBomb];
        }
        else {
            result = this.rewardIconFrames[20 + type];
        }
        return result;
    };
    __decorate([
        property(cc.Node)
    ], BoxTipsCtrl.prototype, "content", void 0);
    __decorate([
        property(cc.Label)
    ], BoxTipsCtrl.prototype, "title", void 0);
    __decorate([
        property(cc.Prefab)
    ], BoxTipsCtrl.prototype, "rewardPrefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], BoxTipsCtrl.prototype, "rewardIconFrames", void 0);
    BoxTipsCtrl = __decorate([
        ccclass
    ], BoxTipsCtrl);
    return BoxTipsCtrl;
}(cc.Component));
exports.default = BoxTipsCtrl;

cc._RF.pop();