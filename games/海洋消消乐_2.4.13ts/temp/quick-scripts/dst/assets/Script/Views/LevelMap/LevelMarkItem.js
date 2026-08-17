
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Views/LevelMap/LevelMarkItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '99d13k/ZZZGvrUqgkxgjQtO', 'LevelMarkItem');
// Script/Views/LevelMap/LevelMarkItem.ts

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
var UIMgr_1 = require("../../Base/Manager/UIMgr");
var UIData_1 = require("../../Logic/Data/Interface/UIData");
var RuntimeMgr_1 = require("../../Logic/Data/RuntimeMgr");
var M_1 = require("../../Base/Manager/M");
var Event_1 = require("../../Logic/Data/Const/Event");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelMarkItem = /** @class */ (function (_super) {
    __extends(LevelMarkItem, _super);
    function LevelMarkItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.LabelLevel = null;
        _this.SpBg = null;
        _this.StarNode = null;
        _this.stars = [];
        _this.SpState_complete = null;
        _this.SpState_disable = null;
        _this.SpState_open = null;
        return _this;
    }
    LevelMarkItem.prototype.updateData = function (levelNum) {
        this.curLevelNum = levelNum;
        this.LabelLevel.string = levelNum.toString();
        var curLevel = RuntimeMgr_1.default.ins.getMatch3Level();
        if (levelNum > curLevel) { //未解锁
            this.SpBg.spriteFrame = this.SpState_disable;
        }
        else if (levelNum == curLevel) { //正在当前关卡
            this.SpBg.spriteFrame = this.SpState_open;
            this.setStar(0);
        }
        else { //已通关
            this.SpBg.spriteFrame = this.SpState_complete;
            this.StarNode.active = true;
            var lvData = RuntimeMgr_1.default.ins.getNativeLvData(levelNum);
            this.setStar(lvData.score);
        }
    };
    LevelMarkItem.prototype.setStar = function (star) {
        for (var i = 1; i <= 3; ++i) {
            this.stars[i - 1].active = star >= i;
        }
    };
    LevelMarkItem.prototype.onClickLevel = function () {
        if (this.curLevelNum > RuntimeMgr_1.default.ins.getMatch3Level()) {
            return;
        }
        M_1.default.event.send(Event_1.Event.UI.HideSelectLevelView);
        UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.SelectShowTarget, { type: UIData_1.UIHudDef.SelectShowTarget, data: this.curLevelNum });
    };
    __decorate([
        property(cc.Label)
    ], LevelMarkItem.prototype, "LabelLevel", void 0);
    __decorate([
        property(cc.Sprite)
    ], LevelMarkItem.prototype, "SpBg", void 0);
    __decorate([
        property(cc.Node)
    ], LevelMarkItem.prototype, "StarNode", void 0);
    __decorate([
        property([cc.Node])
    ], LevelMarkItem.prototype, "stars", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], LevelMarkItem.prototype, "SpState_complete", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], LevelMarkItem.prototype, "SpState_disable", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], LevelMarkItem.prototype, "SpState_open", void 0);
    LevelMarkItem = __decorate([
        ccclass
    ], LevelMarkItem);
    return LevelMarkItem;
}(cc.Component));
exports.default = LevelMarkItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxWaWV3c1xcTGV2ZWxNYXBcXExldmVsTWFya0l0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQTZDO0FBQzdDLDREQUE2RDtBQUM3RCwwREFBcUQ7QUFDckQsMENBQXFDO0FBQ3JDLHNEQUFxRDtBQUUvQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQXFEQztRQWxERyxnQkFBVSxHQUFhLElBQUksQ0FBQztRQUU1QixVQUFJLEdBQWMsSUFBSSxDQUFDO1FBRXZCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsV0FBSyxHQUFjLEVBQUUsQ0FBQztRQUd0QixzQkFBZ0IsR0FBbUIsSUFBSSxDQUFDO1FBRXhDLHFCQUFlLEdBQW1CLElBQUksQ0FBQztRQUV2QyxrQkFBWSxHQUFtQixJQUFJLENBQUM7O0lBb0N4QyxDQUFDO0lBaENVLGtDQUFVLEdBQWpCLFVBQWtCLFFBQWdCO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU3QyxJQUFJLFFBQVEsR0FBRyxvQkFBVSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMvQyxJQUFJLFFBQVEsR0FBRyxRQUFRLEVBQUUsRUFBVyxLQUFLO1lBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDaEQ7YUFBTSxJQUFJLFFBQVEsSUFBSSxRQUFRLEVBQUUsRUFBRyxRQUFRO1lBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQjthQUFNLEVBQTZCLEtBQUs7WUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUM1QixJQUFNLE1BQU0sR0FBRyxvQkFBVSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBRU0sK0JBQU8sR0FBZCxVQUFlLElBQVk7UUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7SUFFTSxvQ0FBWSxHQUFuQjtRQUNJLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxvQkFBVSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUNwRCxPQUFPO1NBQ1Y7UUFDRCxXQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFLLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDM0MsZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBUSxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUM3RyxDQUFDO0lBaEREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ1M7SUFFNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsrQ0FDRztJQUV2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO2dEQUNFO0lBR3RCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7MkRBQ2U7SUFFeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzswREFDYztJQUV2QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO3VEQUNXO0lBakJuQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBcURqQztJQUFELG9CQUFDO0NBckRELEFBcURDLENBckQwQyxFQUFFLENBQUMsU0FBUyxHQXFEdEQ7a0JBckRvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVJTWdyIGZyb20gXCIuLi8uLi9CYXNlL01hbmFnZXIvVUlNZ3JcIjtcbmltcG9ydCB7IFVJSHVkRGVmIH0gZnJvbSBcIi4uLy4uL0xvZ2ljL0RhdGEvSW50ZXJmYWNlL1VJRGF0YVwiO1xuaW1wb3J0IFJ1bnRpbWVNZ3IgZnJvbSBcIi4uLy4uL0xvZ2ljL0RhdGEvUnVudGltZU1nclwiO1xuaW1wb3J0IE0gZnJvbSBcIi4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi9Mb2dpYy9EYXRhL0NvbnN0L0V2ZW50XCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMZXZlbE1hcmtJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBMYWJlbExldmVsOiBjYy5MYWJlbCA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBTcEJnOiBjYy5TcHJpdGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIFN0YXJOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuTm9kZV0pXG4gICAgc3RhcnM6IGNjLk5vZGVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIFNwU3RhdGVfY29tcGxldGU6IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgU3BTdGF0ZV9kaXNhYmxlOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIFNwU3RhdGVfb3BlbjogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBjdXJMZXZlbE51bTogbnVtYmVyO1xuXG4gICAgcHVibGljIHVwZGF0ZURhdGEobGV2ZWxOdW06IG51bWJlcikge1xuICAgICAgICB0aGlzLmN1ckxldmVsTnVtID0gbGV2ZWxOdW07XG4gICAgICAgIHRoaXMuTGFiZWxMZXZlbC5zdHJpbmcgPSBsZXZlbE51bS50b1N0cmluZygpO1xuXG4gICAgICAgIHZhciBjdXJMZXZlbCA9IFJ1bnRpbWVNZ3IuaW5zLmdldE1hdGNoM0xldmVsKCk7XG4gICAgICAgIGlmIChsZXZlbE51bSA+IGN1ckxldmVsKSB7ICAgICAgICAgIC8v5pyq6Kej6ZSBXG4gICAgICAgICAgICB0aGlzLlNwQmcuc3ByaXRlRnJhbWUgPSB0aGlzLlNwU3RhdGVfZGlzYWJsZTtcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbE51bSA9PSBjdXJMZXZlbCkgeyAgLy/mraPlnKjlvZPliY3lhbPljaFcbiAgICAgICAgICAgIHRoaXMuU3BCZy5zcHJpdGVGcmFtZSA9IHRoaXMuU3BTdGF0ZV9vcGVuO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGFyKDApO1xuICAgICAgICB9IGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+W3sumAmuWFs1xuICAgICAgICAgICAgdGhpcy5TcEJnLnNwcml0ZUZyYW1lID0gdGhpcy5TcFN0YXRlX2NvbXBsZXRlO1xuICAgICAgICAgICAgdGhpcy5TdGFyTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgbHZEYXRhID0gUnVudGltZU1nci5pbnMuZ2V0TmF0aXZlTHZEYXRhKGxldmVsTnVtKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhcihsdkRhdGEuc2NvcmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldFN0YXIoc3RhcjogbnVtYmVyKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDM7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5zdGFyc1tpIC0gMV0uYWN0aXZlID0gc3RhciA+PSBpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xpY2tMZXZlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VyTGV2ZWxOdW0gPiBSdW50aW1lTWdyLmlucy5nZXRNYXRjaDNMZXZlbCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LlVJLkhpZGVTZWxlY3RMZXZlbFZpZXcpO1xuICAgICAgICBVSU1nci5pbnMuc2hvd1VJKFVJSHVkRGVmLlNlbGVjdFNob3dUYXJnZXQsIHsgdHlwZTogVUlIdWREZWYuU2VsZWN0U2hvd1RhcmdldCwgZGF0YTogdGhpcy5jdXJMZXZlbE51bSB9KTtcbiAgICB9XG5cbn0iXX0=