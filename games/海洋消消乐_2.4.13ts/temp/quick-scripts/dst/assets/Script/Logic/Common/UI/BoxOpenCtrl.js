
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/BoxOpenCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcQm94T3BlbkN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQTZDO0FBRTdDLDZDQUF3QztBQUN4QyxzREFBdUQ7QUFDdkQsZ0RBQStDO0FBQy9DLDhEQUE2RDtBQUM3RCwyREFBc0Q7QUFDdEQsMENBQXVDO0FBRWpDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXlDLCtCQUFNO0lBQS9DO1FBQUEscUVBeUVDO1FBdEVHLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLFlBQU0sR0FBcUIsRUFBRSxDQUFDO1FBRXRCLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsV0FBSyxHQUFrQixJQUFJLENBQUM7O0lBdUR4QyxDQUFDO0lBckRVLDRCQUFNLEdBQWIsVUFBYyxJQUFpRTtRQUEvRSxpQkFlQztRQWRHLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUNsQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3BDO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQztZQUM1QyxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsbUJBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoRTtRQUNELElBQUks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O1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDOytDQUNHO0lBZmIsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQXlFL0I7SUFBRCxrQkFBQztDQXpFRCxBQXlFQyxDQXpFd0MsZ0JBQU0sR0F5RTlDO2tCQXpFb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVSUJhc2UgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvVUkvVUlCYXNlXCI7XG5pbXBvcnQgQm94UmV3YXJkSW5mbyBmcm9tIFwiLi4vLi4vLi4vQmFzZS9UYWJscy9Cb3hSZXdhcmRJbmZvXCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IFVJSHVkRGVmIH0gZnJvbSBcIi4uLy4uL0RhdGEvSW50ZXJmYWNlL1VJRGF0YVwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IHsgR3VpZGVVdGlscyB9IGZyb20gXCIuLi8uLi8uLi8uLi9Hb2RHdWlkZS9HdWlkZVV0aWxzXCI7XG5pbXBvcnQgRXZlbnRNZ3IgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvTWFuYWdlci9FdmVudE1nclwiO1xuaW1wb3J0IHsgQXVkaW9JRCB9IGZyb20gXCIuLi9BdWRpb0N0cmxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJveE9wZW5DdHJsIGV4dGVuZHMgVUlCYXNlIHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYm94Tm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdGl0bGVMYWI6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgcmV3YXJkTm9kZTogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIGZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBfaXNPcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9pbmZvOiBCb3hSZXdhcmRJbmZvID0gbnVsbDtcblxuICAgIHB1YmxpYyBvbkluaXQoZGF0YTogeyBjb25maWc6IEJveFJld2FyZEluZm8sIHRleHQ6IHN0cmluZywgaXNIaWRlQm94OiBib29sZWFuIH0pIHtcbiAgICAgICAgdGhpcy5faXNPcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpO1xuICAgICAgICBpZiAoZGF0YS50ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLnRpdGxlTGFiLnN0cmluZyA9IGRhdGEudGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGl0bGVMYWIuc3RyaW5nID0gJ+aBreWWnOS9oOW8gOWQr+S6huWuneeusSAsIOiOt+W+l+S7peS4i+WlluWKsTonO1xuICAgICAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuU291bmQuUGxheVNvdW5kRWZmLCBBdWRpb0lELk9wZW5Cb3gpO1xuICAgICAgICB9XG4gICAgICAgIGRhdGEuY29uZmlnLnJld2FyZHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3NldEl0ZW0oaXRlbSwgdGhpcy5yZXdhcmROb2RlLCB0aGlzLmZyYW1lcyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9pbmZvID0gZGF0YS5jb25maWc7XG4gICAgICAgIE0ucnVudGltZS5zZXRCb3hHaWZ0RGF0YSh0aGlzLl9pbmZvLmlkLCB0cnVlKTtcbiAgICAgICAgdGhpcy5ib3hOb2RlLmFjdGl2ZSA9ICFkYXRhLmlzSGlkZUJveDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRJdGVtKGl0ZW06IHsgdHlwZTogbnVtYmVyLCBjb3VudDogbnVtYmVyIH0sIHByZWZhYiwgZnJhbWVzKSB7XG4gICAgICAgIGxldCB0eXBlID0gTnVtYmVyKGl0ZW0udHlwZSk7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBNLm5vZGVQb29sLmNyZWF0ZUl0ZW0ocHJlZmFiKTtcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnY291bnQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGB4JHtpdGVtLmNvdW50fWA7XG4gICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ljb24nKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuX2dldFJld2FyZEljb24oZnJhbWVzLCB0eXBlKTtcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmNvbnRlbnQ7XG4gICAgICAgIGlmICh0eXBlID49IDEwMCkge1xuICAgICAgICAgICAgTS5ydW50aW1lLnVwZGF0ZVByb3BDb3VudCh0eXBlLCBpdGVtLmNvdW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIE0ucnVudGltZS5hZGRDdXJyZW5jeSh0eXBlLCBpdGVtLmNvdW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFJld2FyZEljb24oZnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdLCB0eXBlOiBudW1iZXIpOiBjYy5TcHJpdGVGcmFtZSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgICBpZiAodHlwZSA+PSAxMDApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZyYW1lc1t0eXBlIC0gMTAwXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gZnJhbWVzW3R5cGUgKyAyMF1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG4gICAgb25TaG93KCkge1xuICAgICAgICB0aGlzLl9pc09wZW5lZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xvc2VDbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzT3BlbmVkKSB7XG4gICAgICAgICAgICBNLnVpLmhpZGVVSShVSUh1ZERlZi5PcGVuQm94KTtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5VSS51cGRhdGVCb3hTdGF0ZSwgdGhpcy5faW5mby5pZCk7XG4gICAgICAgICAgICB0aGlzLl9pbmZvID0gbnVsbDtcbiAgICAgICAgICAgIEd1aWRlVXRpbHMuY2hlY2tHdWlkZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19