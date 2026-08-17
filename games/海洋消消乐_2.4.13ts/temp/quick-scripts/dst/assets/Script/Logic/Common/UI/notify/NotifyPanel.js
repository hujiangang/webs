
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/notify/NotifyPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcbm90aWZ5XFxOb3RpZnlQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBZ0Q7QUFDaEQsZ0RBQTJDO0FBQzNDLHdEQUFtRDtBQUNuRCx5REFBMEQ7QUFDMUQsK0RBQTBEO0FBQzFELDhDQUF5QztBQUduQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5QywrQkFBTTtJQUEvQztRQUFBLHFFQW1HQztRQWhHRyxjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGFBQU8sR0FBYSxJQUFJLENBQUM7UUFHekIsa0JBQVksR0FBYyxJQUFJLENBQUM7UUFHL0IsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFHN0IsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixlQUFTLEdBQXFCLEVBQUUsQ0FBQztRQUV6QixXQUFLLEdBQWdCLElBQUksQ0FBQztRQUMxQixtQkFBYSxHQUFZLEtBQUssQ0FBQzs7SUEyRTNDLENBQUM7SUF6RUcsNEJBQU0sR0FBTjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCwrQkFBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVNLDRCQUFNLEdBQWIsVUFBYyxZQUE2QjtRQUE3Qiw2QkFBQSxFQUFBLG9CQUE2QjtRQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTywrQkFBUyxHQUFqQjtRQUFBLGlCQTZCQztRQTVCRyxJQUFJLENBQUMs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LENBQUM7SUFFTSxnQ0FBVSxHQUFqQjtRQUNJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVPLGlDQUFXLEdBQW5CLFVBQW9CLElBQTRDLEVBQUUsUUFBaUI7UUFDL0UsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyRjtJQUNMLENBQUM7SUE5RkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2dEQUNNO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ1c7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDUztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNNO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ1U7SUFHNUI7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7a0RBQ007SUFyQmhCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FtRy9CO0lBQUQsa0JBQUM7Q0FuR0QsQUFtR0MsQ0FuR3dDLGdCQUFNLEdBbUc5QztrQkFuR29CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVUlCYXNlIGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL1VJL1VJQmFzZVwiO1xuaW1wb3J0IE0gZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgVUlNZ3IgZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9VSU1nclwiO1xuaW1wb3J0IHsgVUlIdWREZWYgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9JbnRlcmZhY2UvVUlEYXRhXCI7XG5pbXBvcnQgTm90aWZ5UmV3YXJkSXRlbUN0cmwgZnJvbSBcIi4vTm90aWZ5UmV3YXJkSXRlbUN0cmxcIjtcbmltcG9ydCBCb3hUaXBzQ3RybCBmcm9tIFwiLi4vQm94VGlwc0N0cmxcIjtcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90aWZ5UGFuZWwgZXh0ZW5kcyBVSUJhc2Uge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHRpdGxlTGFiOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdGV4dExhYjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICByZXdhcmRQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHRpcHNQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBjb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGNsb3NlQnV0dG9uOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIHByb3BGcmFtczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBfdGlwczogQm94VGlwc0N0cmwgPSBudWxsO1xuICAgIHByaXZhdGUgX2lzTWFpbnRhaW5PbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX3RpcHMgPSBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkluaXQoaXNNYWludGFpbk9uOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5faXNNYWludGFpbk9uID0gaXNNYWludGFpbk9uO1xuICAgICAgICB0aGlzLl9pbml0VmlldygpO1xuICAgICAgICB0aGlzLl9pbml0VGlwcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRWaWV3KCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgTS5ydW50aW1lLmdldFNlcnZlckNvbmZpZygpLnRoZW4oKGNvbmZpZykgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzTWFpbnRhaW5Pbikge1xuICAgICAgICAgICAgICAgIHRoaXMudGl0bGVMYWIuc3RyaW5nID0gJ+WFrOWRiic7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dExhYi5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0TGFiLnN0cmluZyA9IGNvbmZpZy5tYWludGFpbl9jb250ZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VCdXR0b24uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VCdXR0b24uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5hbm5vdW5jZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXRsZUxhYi5zdHJpbmcgPSAn5rS75Yqo6KeE5YiZJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0TGFiLm5vZGUuYWN0aXZlID0gISFjb25maWcuYW5ub3VuY2VtZW50LnRleHQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5hY3RpdmUgPSAhIWNvbmZpZy5hbm5vdW5jZW1lbnQuZ3JpZDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5hbm5vdW5jZW1lbnQudGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0TGFiLnN0cmluZyA9IGNvbmZpZy5hbm5vdW5jZW1lbnQudGV4dDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmFubm91bmNlbWVudC5ncmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcuYW5ub3VuY2VtZW50LmdyaWQuZm9yRWFjaCgoaXRlbURhdGEsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IE0ubm9kZVBvb2wuY3JlYXRlSXRlbSh0aGlzLnJld2FyZFByZWZhYik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXJlbnQgPSB0aGlzLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoTm90aWZ5UmV3YXJkSXRlbUN0cmwpLmluaXQoaXRlbURhdGEsIGluZGV4ID09IChjb25maWcuYW5ub3VuY2VtZW50LmdyaWQubGVuZ3RoIC0gMSksIHRoaXMuX29uU2hvd1RpcHMuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbG9zZUNsaWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2lzTWFpbnRhaW5Pbikge1xuICAgICAgICAgICAgVUlNZ3IuaW5zLmhpZGVVSShVSUh1ZERlZi5Ob3RpY2VQYW5lbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0VGlwcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl90aXBzKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gTS5ub2RlUG9vbC5jcmVhdGVJdGVtKHRoaXMudGlwc1ByZWZhYik7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIHRoaXMuX3RpcHMgPSBub2RlLmdldENvbXBvbmVudChCb3hUaXBzQ3RybCk7XG4gICAgICAgICAgICB0aGlzLl90aXBzLnVwZGF0ZURhdGEoJ+W8gOWQr+WuneeuseiOt+W+l+S7peS4i+WlluWKsTonLCBjYy5zaXplKDMzMCwgMzY2KSk7XG4gICAgICAgICAgICB0aGlzLl90aXBzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkhpZGVUaXBzKCkge1xuICAgICAgICBpZiAodGhpcy5fdGlwcyAmJiB0aGlzLl90aXBzLmlzUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMuX3RpcHMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25TaG93VGlwcyhkYXRhOiBBcnJheTx7IHR5cGU6IG51bWJlciwgY291bnQ6IG51bWJlciB9Piwgd29scmRQb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RpcHMpIHtcbiAgICAgICAgICAgIHRoaXMuX3RpcHMuc2hvdyhkYXRhLCB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIod29scmRQb3MpLmFkZChjYy52MigwLCAzNSkpKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19