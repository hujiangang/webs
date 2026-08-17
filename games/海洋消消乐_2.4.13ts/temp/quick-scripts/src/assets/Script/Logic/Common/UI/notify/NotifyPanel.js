"use strict";
cc._RF.push(module, 'e2b48eWZk5O45zG6Gnjiv/8', 'NotifyPanel');
// Script/Logic/Common/UI/notify/NotifyPanel.ts

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
var M_1 = require("../../../../Base/Manager/M");
var UIMgr_1 = require("../../../../Base/Manager/UIMgr");
var UIData_1 = require("../../../Data/Interface/UIData");
var NotifyRewardItemCtrl_1 = require("./NotifyRewardItemCtrl");
var BoxTipsCtrl_1 = require("../BoxTipsCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NotifyPanel = /** @class */ (function (_super) {
    __extends(NotifyPanel, _super);
    function NotifyPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.titleLab = null;
        _this.textLab = null;
        _this.rewardPrefab = null;
        _this.tipsPrefab = null;
        _this.content = null;
        _this.closeButton = null;
        _this.propFrams = [];
        _this._tips = null;
        _this._isMaintainOn = false;
        return _this;
    }
    NotifyPanel.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
    };
    NotifyPanel.prototype.onDestroy = function () {
        this._tips = null;
    };
    NotifyPanel.prototype.onInit = function (isMaintainOn) {
        if (isMaintainOn === void 0) { isMaintainOn = false; }
        this._isMaintainOn = isMaintainOn;
        this._initView();
        this._initTips();
    };
    NotifyPanel.prototype._initView = function () {
        var _this = this;
        this.content.removeAllChildren();
        M_1.default.runtime.getServerConfig().then(function (config) {
            if (_this._isMaintainOn) {
                _this.titleLab.string = '公告';
                _this.content.active = false;
                _this.textLab.node.active = true;
                _this.textLab.string = config.maintain_content;
                _this.closeButton.active = false;
            }
            else {
                _this.closeButton.active = true;
                if (config && config.announcement) {
                    _this.titleLab.string = '活动规则';
                    _this.textLab.node.active = !!config.announcement.text;
                    _this.content.active = !!config.announcement.grid;
                    if (config.announcement.text) {
                        _this.textLab.string = config.announcement.text;
                    }
                    if (config.announcement.grid) {
                        config.announcement.grid.forEach(function (itemData, index) {
                            var item = M_1.default.nodePool.createItem(_this.rewardPrefab);
                            item.parent = _this.content;
                            item.getComponent(NotifyRewardItemCtrl_1.default).init(itemData, index == (config.announcement.grid.length - 1), _this._onShowTips.bind(_this));
                        });
                    }
                }
            }
        });
    };
    NotifyPanel.prototype.onCloseClick = function () {
        if (!this._isMaintainOn) {
            UIMgr_1.default.ins.hideUI(UIData_1.UIHudDef.NoticePanel);
        }
    };
    NotifyPanel.prototype._initTips = function () {
        if (!this._tips) {
            var node = M_1.default.nodePool.createItem(this.tipsPrefab);
            node.parent = this.node;
            this._tips = node.getComponent(BoxTipsCtrl_1.default);
            this._tips.updateData('开启宝箱获得以下奖励:', cc.size(330, 366));
            this._tips.hide();
        }
    };
    NotifyPanel.prototype.onHideTips = function () {
        if (this._tips && this._tips.isReady) {
            this._tips.hide();
        }
    };
    NotifyPanel.prototype._onShowTips = function (data, wolrdPos) {
        if (this._tips) {
            this._tips.show(data, this.node.convertToNodeSpaceAR(wolrdPos).add(cc.v2(0, 35)));
        }
    };
    __decorate([
        property(cc.Label)
    ], NotifyPanel.prototype, "titleLab", void 0);
    __decorate([
        property(cc.Label)
    ], NotifyPanel.prototype, "textLab", void 0);
    __decorate([
        property(cc.Prefab)
    ], NotifyPanel.prototype, "rewardPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], NotifyPanel.prototype, "tipsPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], NotifyPanel.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], NotifyPanel.prototype, "closeButton", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], NotifyPanel.prototype, "propFrams", void 0);
    NotifyPanel = __decorate([
        ccclass
    ], NotifyPanel);
    return NotifyPanel;
}(UIBase_1.default));
exports.default = NotifyPanel;

cc._RF.pop();