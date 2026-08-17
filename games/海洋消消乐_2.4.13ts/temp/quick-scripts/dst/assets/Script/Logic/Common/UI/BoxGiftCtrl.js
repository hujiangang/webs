
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/BoxGiftCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcQm94R2lmdEN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXdDO0FBQ3hDLG9DQUErQjtBQUMvQixpREFBZ0Q7QUFDaEQsc0RBQXVEO0FBQ3ZELGdEQUErQztBQUMvQyw2Q0FBd0M7QUFFbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBRWpCO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBb0xDO1FBakxHLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFHN0IsU0FBRyxHQUFZLElBQUksQ0FBQztRQUdwQixjQUFRLEdBQWtCLEVBQUUsQ0FBQztRQUc3QixnQkFBVSxHQUFnQixFQUFFLENBQUM7UUFHN0IsY0FBUSxHQUFxQixFQUFFLENBQUM7UUFFaEMsMkJBQTJCO1FBRTNCLGVBQVMsR0FBcUIsRUFBRSxDQUFDO1FBRXpCLFdBQUssR0FBZ0IsSUFBSSxDQUFDO1FBRTFCLG1CQUFhLEdBQWtCLElBQUksQ0FBQztRQUNwQyxZQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLFlBQU0sR0FBVyxDQUFDLENBQUM7O0lBd0ovQixDQUFDO0lBdEpHLDRCQUFNLEdBQU47UUFDSSxXQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCwrQkFBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsV0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBSyxDQUFDLEVBQUUs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QUM7a0RBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDUztJQUc3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzRDQUNFO0lBR3BCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lEQUNLO0lBRzdCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO21EQUNPO0lBRzdCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lEQUNLO0lBSWhDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2tEQUNNO0lBdEJoQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBb0wvQjtJQUFELGtCQUFDO0NBcExELEFBb0xDLENBcEx3QyxFQUFFLENBQUMsU0FBUyxHQW9McEQ7a0JBcExvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE0gZnJvbSBcIi4uLy4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuLi9Db21tb25cIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VdGlscy9VdGlsXCI7XG5pbXBvcnQgeyBVSUh1ZERlZiB9IGZyb20gXCIuLi8uLi9EYXRhL0ludGVyZmFjZS9VSURhdGFcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCBCb3hUaXBzQ3RybCBmcm9tIFwiLi9Cb3hUaXBzQ3RybFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5jb25zdCBHYXBMdiA9IDMwO1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJveEdpZnRDdHJsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHBvaW50UGF0aDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHRpcHNQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBkb2c6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFtjYy5SaWNoVGV4dF0pXG4gICAgbHZMYWJlbHM6IGNjLlJpY2hUZXh0W10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlXSlcbiAgICBib3hTcHJpdGVzOiBjYy5TcHJpdGVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgYm94RnJhbWU6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuICAgIC8qKua1ruaghy4uLi4w5Li65bey57uP6LWw6L+H55qELiAx5Li65rKh6LWw6L+H55qEICovXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgYnVveUZyYW1lOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBwcml2YXRlIF90aXBzOiBCb3hUaXBzQ3RybCA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9jdXJTaG93TGV2ZWw6IEFycmF5PG51bWJlcj4gPSBudWxsO1xuICAgIHByaXZhdGUgX21pbkx2OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX21heEx2OiBudW1iZXIgPSAwO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LlVJLnVwZGF0ZUJveFN0YXRlLCB0aGlzLl91cGRhdGVCb3hTdGF0ZSwgdGhpcyk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl90aXBzID0gbnVsbDtcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LlVJLnVwZGF0ZUJveFN0YXRlLCB0aGlzLl91cGRhdGVCb3hTdGF0ZSwgdGhpcyk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIF9pbml0VGlwcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl90aXBzKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gTS5ub2RlUG9vbC5jcmVhdGVJdGVtKHRoaXMudGlwc1ByZWZhYik7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24oMCwgMTAwKTtcbiAgICAgICAgICAgIHRoaXMuX3RpcHMgPSBub2RlLmdldENvbXBvbmVudChCb3hUaXBzQ3RybCk7XG4gICAgICAgICAgICB0aGlzLl90aXBzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KG1pbjogbnVtYmVyID0gbnVsbCwgbWF4OiBudW1iZXIgPSBudWxsKSB7XG4gICAgICAgIG1pbiA9IG1pbiB8fCAxO1xuICAgICAgICBtYXggPSBtYXggfHwgTWF0aC5mbG9vcihNLnJ1bnRpbWUuZ2V0TWF0Y2gzTGV2ZWwoKSAvIDEwKTtcbiAgICAgICAgdGhpcy5faW5pdFRpcHMoKTtcbiAgICAgICAgbGV0IGZyaXN0Qm94ID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IG1pbjsgaSA8PSBtYXg7IGkrKykge1xuICAgICAgICAgICAgLy/lrprkvY3nrKzkuIDkuKrmnKrpooblj5bnmoTnrrHlrZDnrYnnuqchXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gTS5ydW50aW1lLmdldEJveEdpZnREYXRhQnlMdihpICogMTApO1xuICAgICAgICAgICAgaWYgKCFkYXRhIHx8IChkYXRhICYmICFkYXRhLnJlY2VpdmVkKSkge1xuICAgICAgICAgICAgICAgIC8v5byA5aeL6LWwM+S4qiFcbiAgICAgICAgICAgICAgICBmcmlzdEJveCA9IChpIC0gMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy/noa7orqTmmL7npLrljLrpl7QhXG4gICAgICAgIHRoaXMuX2N1clNob3dMZXZlbCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJhc2UgPSAoKGZyaXN0Qm94IC8gMyArIDEpID4+IDApIC0gMTtcbiAgICAgICAgICAgIHRoaXMuX2N1clNob3dMZXZlbC5wdXNoKCgoYmFzZSAqIDMpICsgaSkgKiAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2hvd1ZpZXcodGhpcy5fY3VyU2hvd0xldmVsKVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkJveENsaWNrKGV2ZW50LCBpbmRleCkge1xuICAgICAgICBpbmRleCA9IE51bWJlcihpbmRleCk7XG4gICAgICAgIGNvbnN0IGtleSA9IHRoaXMuX2N1clNob3dMZXZlbFtpbmRleF07XG4gICAgICAgIGNvbnN0IGJveERhdGEgPSBNLnJ1bnRpbWUuZ2V0Qm94R2lmdERhdGFCeUx2KGtleSk7XG4gICAgICAgIGlmIChib3hEYXRhICYmICFib3hEYXRhLnJlY2VpdmVkKSB7XG4gICAgICAgICAgICBjb25zdCBib3hDb25maWcgPSBNLnRhYmxlLkJveFJld2FyZEluZm8uZ2V0QnlQcmltYXJ5S2V5KGtleSk7XG4gICAgICAgICAgICBpZiAoYm94Q29uZmlnKSB7XG4gICAgICAgICAgICAgICAgLy/lsZXnpLrlpZblirF1aSAuIOWPkeaUvuWlluWKsVxuICAgICAgICAgICAgICAgIE0udWkuc2hvd1VJKFVJSHVkRGVmLk9wZW5Cb3gsIHsgY29uZmlnOiBib3hDb25maWcgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIWJveERhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dUaXBzKGluZGV4LCBrZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVBhZ2UobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX21pbkx2ID0gbWluOyB0aGlzLl9tYXhMdiA9IG1heDtcbiAgICAgICAgdGhpcy5pbml0KE1hdGguZmxvb3IobWluIC8gMTApICsgMSwgTWF0aC5mbG9vcihtYXggLyAxMCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbk90aGVyQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuX3RpcHMgJiYgdGhpcy5fdGlwcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlQm94U3RhdGUobHY6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5fY3VyU2hvd0xldmVsKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2N1clNob3dMZXZlbC5pbmRleE9mKGx2KTtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dCb3goaW5kZXgsIGx2KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3Nob3dWaWV3KGZpbGxEYXRhOiBBcnJheTxudW1iZXI+KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGx2ID0gZmlsbERhdGFbaV07XG4gICAgICAgICAgICB0aGlzLl9zaG93THZMYWJlbChpLCBsdik7XG4gICAgICAgICAgICB0aGlzLl9zaG93Qm94KGksIGx2KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zaG93RG9nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2hvd0x2TGFiZWwoaW5kZXg6IG51bWJlciwgbGV2ZWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLmx2TGFiZWxzW2luZGV4XS5zdHJpbmcgPSBg56ysIDxjb2xvcj0jZmZmODQxPiR7bGV2ZWx9PC9jb2xvcj4g5YWzYDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zaG93Qm94KGluZGV4OiBudW1iZXIsIGx2OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgYm94ID0gdGhpcy5ib3hTcHJpdGVzW2luZGV4XTtcbiAgICAgICAgY29uc3QgZGF0YSA9IE0ucnVudGltZS5nZXRCb3hHaWZ0RGF0YUJ5THYobHYpO1xuICAgICAgICBpZiAoIWJveCkgcmV0dXJuO1xuICAgICAgICBib3gubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnJlY2VpdmVkKSB7XG4gICAgICAgICAgICBib3guc3ByaXRlRnJhbWUgPSB0aGlzLmJveEZyYW1lWzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm94LnNwcml0ZUZyYW1lID0gdGhpcy5ib3hGcmFtZVswXTtcbiAgICAgICAgICAgIGlmIChkYXRhICYmICFkYXRhLnJlY2VpdmVkKSB7XG4gICAgICAgICAgICAgICAgLy/mipbliqhcbiAgICAgICAgICAgICAgICB0aGlzLl9zaGFraW5nQm94KGJveC5ub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3Nob3dUaXBzKGluZGV4OiBudW1iZXIsIGx2OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RpcHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IE0udGFibGUuQm94UmV3YXJkSW5mby5nZXRCeVByaW1hcnlLZXkobHYpO1xuICAgICAgICAgICAgdGhpcy5fdGlwcy5zaG93KGNvbmZpZy5yZXdhcmRzLCBjYy52Mih0aGlzLmJveFNwcml0ZXNbaW5kZXhdLm5vZGUueCwgdGhpcy5fdGlwcy5ub2RlLnkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3NoYWtpbmdCb3gobm9kZTogY2MuTm9kZSkge1xuICAgICAgICBjb25zdCBhMCA9IGNjLm1vdmVCeSgwLjA1LCBjYy52MihVdGlsLlRvb2wucmFuZ2VJbnQoMiwgNSksIFV0aWwuVG9vbC5yYW5nZUludCgyLCA1KSkpXG4gICAgICAgIGNvbnN0IGExID0gPGFueT5hMC5yZXZlcnNlKCk7XG4gICAgICAgIG5vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoYTAsIGExKSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Nob3dEb2coKSB7XG4gICAgICAgIGNvbnN0IG1heExlbmd0aCA9IHRoaXMucG9pbnRQYXRoLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgLy/lvZPliY3lhbPljaFcbiAgICAgICAgY29uc3QgY3VyTHYgPSBNLnJ1bnRpbWUuZ2V0TWF0Y2gzTGV2ZWwoKTtcbiAgICAgICAgbGV0IHBvaW50SW5kZXggPSAoY3VyTHYgJSBHYXBMdikgKiAobWF4TGVuZ3RoIC8gR2FwTHYpIC0gMTtcbiAgICAgICAgbGV0IGRvZ1BvaW50ID0gbnVsbDtcbiAgICAgICAgaWYgKGN1ckx2ID49IHRoaXMuX21heEx2KSB7XG4gICAgICAgICAgICBwb2ludEluZGV4ID0gbWF4TGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJMdiA8PSB0aGlzLl9taW5Mdikge1xuICAgICAgICAgICAgcG9pbnRJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXhMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMucG9pbnRQYXRoLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKGkgPD0gcG9pbnRJbmRleCkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLm5hbWUgPT0gJ3BvaW50Jykge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd5JykuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5idW95RnJhbWVbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRvZ1BvaW50ID0gbm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubmFtZSA9PSAncG9pbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3knKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5idW95RnJhbWVbMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChkb2dQb2ludCkge1xuICAgICAgICAgICAgdGhpcy5kb2cueCA9IHRoaXMuZG9nLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihDb21tb24uZ2V0V29ybGRQb3MoZG9nUG9pbnQpKS54O1xuICAgICAgICB9XG4gICAgfVxuXG59Il19