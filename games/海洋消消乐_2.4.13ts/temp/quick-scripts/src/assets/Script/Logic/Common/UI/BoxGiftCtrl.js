"use strict";
cc._RF.push(module, '13dda3ki3pKDpr6c/KHY6a/', 'BoxGiftCtrl');
// Script/Logic/Common/UI/BoxGiftCtrl.ts

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
var Common_1 = require("../Common");
var Util_1 = require("../../../Base/Utils/Util");
var UIData_1 = require("../../Data/Interface/UIData");
var Event_1 = require("../../Data/Const/Event");
var BoxTipsCtrl_1 = require("./BoxTipsCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GapLv = 30;
var BoxGiftCtrl = /** @class */ (function (_super) {
    __extends(BoxGiftCtrl, _super);
    function BoxGiftCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pointPath = null;
        _this.tipsPrefab = null;
        _this.dog = null;
        _this.lvLabels = [];
        _this.boxSprites = [];
        _this.boxFrame = [];
        /**浮标....0为已经走过的. 1为没走过的 */
        _this.buoyFrame = [];
        _this._tips = null;
        _this._curShowLevel = null;
        _this._minLv = 0;
        _this._maxLv = 0;
        return _this;
    }
    BoxGiftCtrl.prototype.onLoad = function () {
        M_1.default.event.register(Event_1.Event.UI.updateBoxState, this._updateBoxState, this);
    };
    BoxGiftCtrl.prototype.onDestroy = function () {
        this._tips = null;
        M_1.default.event.unRegister(Event_1.Event.UI.updateBoxState, this._updateBoxState, this);
    };
    BoxGiftCtrl.prototype._initTips = function () {
        if (!this._tips) {
            var node = M_1.default.nodePool.createItem(this.tipsPrefab);
            node.parent = this.node;
            node.setPosition(0, 100);
            this._tips = node.getComponent(BoxTipsCtrl_1.default);
            this._tips.hide();
        }
    };
    BoxGiftCtrl.prototype.init = function (min, max) {
        if (min === void 0) { min = null; }
        if (max === void 0) { max = null; }
        min = min || 1;
        max = max || Math.floor(M_1.default.runtime.getMatch3Level() / 10);
        this._initTips();
        var fristBox = 0;
        for (var i = min; i <= max; i++) {
            //定位第一个未领取的箱子等级!
            var data = M_1.default.runtime.getBoxGiftDataByLv(i * 10);
            if (!data || (data && !data.received)) {
                //开始走3个!
                fristBox = (i - 1);
                break;
            }
        }
        //确认显示区间!
        this._curShowLevel = [];
        for (var i = 1; i <= 3; i++) {
            var base = ((fristBox / 3 + 1) >> 0) - 1;
            this._curShowLevel.push(((base * 3) + i) * 10);
        }
        this._showView(this._curShowLevel);
    };
    BoxGiftCtrl.prototype.onBoxClick = function (event, index) {
        index = Number(index);
        var key = this._curShowLevel[index];
        var boxData = M_1.default.runtime.getBoxGiftDataByLv(key);
        if (boxData && !boxData.received) {
            var boxConfig = M_1.default.table.BoxRewardInfo.getByPrimaryKey(key);
            if (boxConfig) {
                //展示奖励ui . 发放奖励
                M_1.default.ui.showUI(UIData_1.UIHudDef.OpenBox, { config: boxConfig });
            }
        }
        else if (!boxData) {
            this._showTips(index, key);
        }
    };
    BoxGiftCtrl.prototype.updatePage = function (min, max) {
        this._minLv = min;
        this._maxLv = max;
        this.init(Math.floor(min / 10) + 1, Math.floor(max / 10));
    };
    BoxGiftCtrl.prototype.onOtherClick = function () {
        this._tips && this._tips.hide();
    };
    BoxGiftCtrl.prototype._updateBoxState = function (lv) {
        if (this._curShowLevel) {
            var index = this._curShowLevel.indexOf(lv);
            this._showBox(index, lv);
        }
    };
    BoxGiftCtrl.prototype._showView = function (fillData) {
        for (var i = 0; i < fillData.length; i++) {
            var lv = fillData[i];
            this._showLvLabel(i, lv);
            this._showBox(i, lv);
        }
        this._showDog();
    };
    BoxGiftCtrl.prototype._showLvLabel = function (index, level) {
        this.lvLabels[index].string = "\u7B2C <color=#fff841>" + level + "</color> \u5173";
    };
    BoxGiftCtrl.prototype._showBox = function (index, lv) {
        var box = this.boxSprites[index];
        var data = M_1.default.runtime.getBoxGiftDataByLv(lv);
        if (!box)
            return;
        box.node.stopAllActions();
        if (data && data.received) {
            box.spriteFrame = this.boxFrame[1];
        }
        else {
            box.spriteFrame = this.boxFrame[0];
            if (data && !data.received) {
                //抖动
                this._shakingBox(box.node);
            }
        }
    };
    BoxGiftCtrl.prototype._showTips = function (index, lv) {
        if (this._tips) {
            var config = M_1.default.table.BoxRewardInfo.getByPrimaryKey(lv);
            this._tips.show(config.rewards, cc.v2(this.boxSprites[index].node.x, this._tips.node.y));
        }
    };
    BoxGiftCtrl.prototype._shakingBox = function (node) {
        var a0 = cc.moveBy(0.05, cc.v2(Util_1.Util.Tool.rangeInt(2, 5), Util_1.Util.Tool.rangeInt(2, 5)));
        var a1 = a0.reverse();
        node.runAction(cc.repeatForever(cc.sequence(a0, a1)));
    };
    BoxGiftCtrl.prototype._showDog = function () {
        var maxLength = this.pointPath.children.length;
        //当前关卡
        var curLv = M_1.default.runtime.getMatch3Level();
        var pointIndex = (curLv % GapLv) * (maxLength / GapLv) - 1;
        var dogPoint = null;
        if (curLv >= this._maxLv) {
            pointIndex = maxLength;
        }
        if (curLv <= this._minLv) {
            pointIndex = 0;
        }
        for (var i = 0; i < maxLength; i++) {
            var node = this.pointPath.children[i];
            if (i <= pointIndex) {
                if (node.name == 'point') {
                    node.getChildByName('y').active = true;
                }
                else {
                    node.getComponent(cc.Sprite).spriteFrame = this.buoyFrame[0];
                }
                dogPoint = node;
            }
            else {
                if (node.name == 'point') {
                    node.getChildByName('y').active = false;
                }
                else {
                    node.getComponent(cc.Sprite).spriteFrame = this.buoyFrame[1];
                }
            }
        }
        if (dogPoint) {
            this.dog.x = this.dog.parent.convertToNodeSpaceAR(Common_1.default.getWorldPos(dogPoint)).x;
        }
    };
    __decorate([
        property(cc.Node)
    ], BoxGiftCtrl.prototype, "pointPath", void 0);
    __decorate([
        property(cc.Prefab)
    ], BoxGiftCtrl.prototype, "tipsPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], BoxGiftCtrl.prototype, "dog", void 0);
    __decorate([
        property([cc.RichText])
    ], BoxGiftCtrl.prototype, "lvLabels", void 0);
    __decorate([
        property([cc.Sprite])
    ], BoxGiftCtrl.prototype, "boxSprites", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], BoxGiftCtrl.prototype, "boxFrame", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], BoxGiftCtrl.prototype, "buoyFrame", void 0);
    BoxGiftCtrl = __decorate([
        ccclass
    ], BoxGiftCtrl);
    return BoxGiftCtrl;
}(cc.Component));
exports.default = BoxGiftCtrl;

cc._RF.pop();