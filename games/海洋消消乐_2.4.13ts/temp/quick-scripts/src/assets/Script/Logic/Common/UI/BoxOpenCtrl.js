"use strict";
cc._RF.push(module, '7fd5eMSFxVE16nSQK7Pnnts', 'BoxOpenCtrl');
// Script/Logic/Common/UI/BoxOpenCtrl.ts

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
var UIBase_1 = require("../../../Base/UI/UIBase");
var M_1 = require("../../../Base/Manager/M");
var UIData_1 = require("../../Data/Interface/UIData");
var Event_1 = require("../../Data/Const/Event");
var GuideUtils_1 = require("../../../../GodGuide/GuideUtils");
var EventMgr_1 = require("../../../Base/Manager/EventMgr");
var AudioCtrl_1 = require("../AudioCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BoxOpenCtrl = /** @class */ (function (_super) {
    __extends(BoxOpenCtrl, _super);
    function BoxOpenCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.boxNode = null;
        _this.titleLab = null;
        _this.rewardNode = null;
        _this.frames = [];
        _this._isOpened = false;
        _this._info = null;
        return _this;
    }
    BoxOpenCtrl.prototype.onInit = function (data) {
        var _this = this;
        this._isOpened = false;
        this.content.destroyAllChildren();
        if (data.text) {
            this.titleLab.string = data.text;
        }
        else {
            this.titleLab.string = '恭喜你开启了宝箱 , 获得以下奖励:';
            EventMgr_1.default.ins.send(Event_1.Event.Sound.PlaySoundEff, AudioCtrl_1.AudioID.OpenBox);
        }
        data.config.rewards.forEach(function (item) {
            _this._setItem(item, _this.rewardNode, _this.frames);
        });
        this._info = data.config;
        M_1.default.runtime.setBoxGiftData(this._info.id, true);
        this.boxNode.active = !data.isHideBox;
    };
    BoxOpenCtrl.prototype._setItem = function (item, prefab, frames) {
        var type = Number(item.type);
        var node = M_1.default.nodePool.createItem(prefab);
        node.getChildByName('count').getComponent(cc.Label).string = "x" + item.count;
        node.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = this._getRewardIcon(frames, type);
        node.parent = this.content;
        if (type >= 100) {
            M_1.default.runtime.updatePropCount(type, item.count);
        }
        else {
            M_1.default.runtime.addCurrency(type, item.count);
        }
    };
    BoxOpenCtrl.prototype._getRewardIcon = function (frames, type) {
        var result = null;
        if (type >= 100) {
            result = frames[type - 100];
        }
        else {
            result = frames[type + 20];
        }
        return result;
    };
    BoxOpenCtrl.prototype.onShow = function () {
        this._isOpened = true;
    };
    BoxOpenCtrl.prototype.onCloseClick = function () {
        if (this._isOpened) {
            M_1.default.ui.hideUI(UIData_1.UIHudDef.OpenBox);
            M_1.default.event.send(Event_1.Event.UI.updateBoxState, this._info.id);
            this._info = null;
            GuideUtils_1.GuideUtils.checkGuide();
        }
    };
    __decorate([
        property(cc.Node)
    ], BoxOpenCtrl.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], BoxOpenCtrl.prototype, "boxNode", void 0);
    __decorate([
        property(cc.Label)
    ], BoxOpenCtrl.prototype, "titleLab", void 0);
    __decorate([
        property(cc.Prefab)
    ], BoxOpenCtrl.prototype, "rewardNode", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], BoxOpenCtrl.prototype, "frames", void 0);
    BoxOpenCtrl = __decorate([
        ccclass
    ], BoxOpenCtrl);
    return BoxOpenCtrl;
}(UIBase_1.default));
exports.default = BoxOpenCtrl;

cc._RF.pop();