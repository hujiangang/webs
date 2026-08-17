
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/dailyTask/DailyItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'beeaeD0WI5IZLXg8wlkMlRc', 'DailyItem');
// Script/Logic/Common/UI/dailyTask/DailyItem.ts

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
var M_1 = require("../../../../Base/Manager/M");
var Constant_1 = require("../../../Data/Const/Constant");
var StorageMgr_1 = require("../../../../Base/Manager/StorageMgr");
var DailyTaskMgr_1 = require("../../../../Base/Manager/DailyTaskMgr");
var UIData_1 = require("../../../Data/Interface/UIData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DailyItem = /** @class */ (function (_super) {
    __extends(DailyItem, _super);
    function DailyItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg = null;
        _this.nameLab = null;
        _this.count = null;
        _this.progressLab = null;
        _this.stateLab = null;
        _this.icon = null;
        _this.progress = null;
        _this._info = null;
        //目标主类型
        _this._conditionType = null;
        //目标子类型
        _this._conditionSubType = null;
        //是否完成
        _this._isComplet = false;
        //是否领取
        _this._isReceivd = false;
        return _this;
    }
    DailyItem.prototype.onLoad = function () {
    };
    DailyItem.prototype.onDestroy = function () {
    };
    DailyItem.prototype.init = function (info, icon) {
        this._info = info;
        this.count.string = "x" + info.rewards[0].count;
        this.icon.spriteFrame = icon;
        this.nameLab.string = info.name;
        this._parseCondition();
        this._updateProgress();
    };
    DailyItem.prototype._parseCondition = function () {
        this._conditionType = this._info.conditionType;
        this._conditionSubType = this._info.conditionSubType;
    };
    DailyItem.prototype._updateProgress = function () {
        var count = this._getConditionCount();
        var max = this._info.condition;
        count = count == -1 ? max : count;
        this.progress.progress = count / max;
        this.progressLab.string = (count > max ? max : count) + "/" + max;
        var data = M_1.default.runtime.DailyTaskProgress.progress ? M_1.default.runtime.DailyTaskProgress.progress[this._info.id] : null;
        if (data == -1 || count >= this._info.condition) {
            //满足要求!
            this._isComplet = true;
            this.stateLab.node.active = true;
            if (data == -1) {
                this._isReceivd = true;
                this.stateLab.string = '已领取!';
            }
            else {
                this.stateLab.string = '待领取!';
            }
        }
        else {
            this.stateLab.node.active = false;
        }
    };
    DailyItem.prototype.onClick = function () {
        var _this = this;
        //判断当前是否可以完成任务.
        if (this._isComplet && !this._isReceivd) {
            M_1.default.net.checkTaskIsOK(this._info.id).then(function (result) {
                if (result) {
                    M_1.default.ui.showUI(UIData_1.UIHudDef.OpenBox, { config: { rewards: _this._info.rewards }, isHideBox: true, text: _this._info.type == 2 ? '日任務獎勵!' : '月任務獎勵!' });
                    //发放奖励!  
                    _this.stateLab.string = '已领取!';
                    _this._isReceivd = true;
                    M_1.default.runtime.DailyTaskProgress[_this._info.id] = -1;
                    DailyTaskMgr_1.default.ins.receiveOK(_this._info.id);
                }
            });
        }
    };
    DailyItem.prototype._getConditionCount = function () {
        var count = 0;
        var dateStr = ['day', 'month'][this._info.type - 2];
        var key = null;
        switch (this._conditionType) {
            case Constant_1.ConditionType.collect:
                key = [Constant_1.NativeKey.DailyCollect, Constant_1.NativeKey.MonthCollect][this._info.type - 2];
                var cd = StorageMgr_1.StorageMgr.RingStorage[dateStr]().getValue(key, null);
                if (cd) {
                    count = cd[this._conditionSubType] || 0;
                }
                break;
            case Constant_1.ConditionType.merge:
                key = [Constant_1.NativeKey.DailyMerge, Constant_1.NativeKey.MonthMerge][this._info.type - 2];
                var md = StorageMgr_1.StorageMgr.RingStorage[dateStr]().getValue(key, null);
                if (md) {
                    count = md[this._conditionSubType] || 0;
                }
                break;
            case Constant_1.ConditionType.doprop:
                key = [Constant_1.NativeKey.DailyUsePropCount, Constant_1.NativeKey.MonthUsePropCount][this._info.type - 2];
                count = StorageMgr_1.StorageMgr.RingStorage[dateStr]().getValue(key, 0);
                break;
            case Constant_1.ConditionType.gameCount:
                key = [Constant_1.NativeKey.DailyGameCount, Constant_1.NativeKey.MonthGameCount][this._info.type - 2];
                count = StorageMgr_1.StorageMgr.RingStorage[dateStr]().getValue(key, 0);
                break;
        }
        return count;
    };
    __decorate([
        property(cc.Sprite)
    ], DailyItem.prototype, "bg", void 0);
    __decorate([
        property(cc.Label)
    ], DailyItem.prototype, "nameLab", void 0);
    __decorate([
        property(cc.Label)
    ], DailyItem.prototype, "count", void 0);
    __decorate([
        property(cc.Label)
    ], DailyItem.prototype, "progressLab", void 0);
    __decorate([
        property(cc.Label)
    ], DailyItem.prototype, "stateLab", void 0);
    __decorate([
        property(cc.Sprite)
    ], DailyItem.prototype, "icon", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], DailyItem.prototype, "progress", void 0);
    DailyItem = __decorate([
        ccclass
    ], DailyItem);
    return DailyItem;
}(cc.Component));
exports.default = DailyItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcZGFpbHlUYXNrXFxEYWlseUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0RBQTJDO0FBRTNDLHlEQUF3RTtBQUN4RSxrRUFBaUU7QUFDakUsc0VBQWlFO0FBQ2pFLHlEQUEwRDtBQUVwRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQW1JQztRQWhJRyxRQUFFLEdBQWMsSUFBSSxDQUFDO1FBR3JCLGFBQU8sR0FBYSxJQUFJLENBQUM7UUFHekIsV0FBSyxHQUFhLElBQUksQ0FBQztRQUd2QixpQkFBVyxHQUFhLElBQUksQ0FBQztRQUc3QixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLFVBQUksR0FBYyxJQUFJLENBQUM7UUFHdkIsY0FBUSxHQUFtQixJQUFJLENBQUM7UUFFeEIsV0FBSyxHQUFrQixJQUFJLENBQUM7UUFFcEMsT0FBTztRQUNDLG9CQUFjLEdBQVEsSUFBSSxDQUFDO1FBQ25DLE9BQU87UUFDQyx1QkFBaUIsR0FBUSxJQUFJLENBQUM7UUFDdEMsTUFBTTtRQUNFLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBQ3BDLE1BQU07UUFDRSxnQkFBVSxHQUFZLEtBQUssQ0FBQzs7SUFtR3hDLENBQUM7SUFoR0csMEJBQU0sR0FBTjtJQUVBLENBQUM7SUFFRCw2QkFBUyxHQUFUO0lBRUEsQ0FBQztJQUVNLHdCQUFJLEdBQVgsVUFBWSxJQUFtQixFQUFFLElBQW9CO1FBQ2pELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWxCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFPLENBQUM7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R3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ1U7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsrQ0FDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzJDQUNHO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7K0NBQ087SUFyQmYsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQW1JN0I7SUFBRCxnQkFBQztDQW5JRCxBQW1JQyxDQW5Jc0MsRUFBRSxDQUFDLFNBQVMsR0FtSWxEO2tCQW5Jb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEYWlseVRhc2tJbmZvIGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL1RhYmxzL0RhaWx5VGFza0luZm9cIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IHsgQ29uZGl0aW9uVHlwZSwgTmF0aXZlS2V5IH0gZnJvbSBcIi4uLy4uLy4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCB7IFN0b3JhZ2VNZ3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL1N0b3JhZ2VNZ3JcIjtcbmltcG9ydCBEYWlseVRhc2tNZ3IgZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9EYWlseVRhc2tNZ3JcIjtcbmltcG9ydCB7IFVJSHVkRGVmIH0gZnJvbSBcIi4uLy4uLy4uL0RhdGEvSW50ZXJmYWNlL1VJRGF0YVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFpbHlJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgYmc6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbmFtZUxhYjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGNvdW50OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcHJvZ3Jlc3NMYWI6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzdGF0ZUxhYjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBpY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxuICAgIHByb2dyZXNzOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9pbmZvOiBEYWlseVRhc2tJbmZvID0gbnVsbDtcblxuICAgIC8v55uu5qCH5Li757G75Z6LXG4gICAgcHJpdmF0ZSBfY29uZGl0aW9uVHlwZTogYW55ID0gbnVsbDtcbiAgICAvL+ebruagh+WtkOexu+Wei1xuICAgIHByaXZhdGUgX2NvbmRpdGlvblN1YlR5cGU6IGFueSA9IG51bGw7XG4gICAgLy/mmK/lkKblrozmiJBcbiAgICBwcml2YXRlIF9pc0NvbXBsZXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvL+aYr+WQpumihuWPllxuICAgIHByaXZhdGUgX2lzUmVjZWl2ZDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdChpbmZvOiBEYWlseVRhc2tJbmZvLCBpY29uOiBjYy5TcHJpdGVGcmFtZSkge1xuICAgICAgICB0aGlzLl9pbmZvID0gaW5mbztcblxuICAgICAgICB0aGlzLmNvdW50LnN0cmluZyA9IGB4JHtpbmZvLnJld2FyZHNbMF0uY291bnR9YDtcbiAgICAgICAgdGhpcy5pY29uLnNwcml0ZUZyYW1lID0gaWNvbjtcbiAgICAgICAgdGhpcy5uYW1lTGFiLnN0cmluZyA9IGluZm8ubmFtZTtcblxuICAgICAgICB0aGlzLl9wYXJzZUNvbmRpdGlvbigpO1xuICAgICAgICB0aGlzLl91cGRhdGVQcm9ncmVzcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3BhcnNlQ29uZGl0aW9uKCkge1xuICAgICAgICB0aGlzLl9jb25kaXRpb25UeXBlID0gdGhpcy5faW5mby5jb25kaXRpb25UeXBlO1xuICAgICAgICB0aGlzLl9jb25kaXRpb25TdWJUeXBlID0gdGhpcy5faW5mby5jb25kaXRpb25TdWJUeXBlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZVByb2dyZXNzKCkge1xuICAgICAgICBsZXQgY291bnQgPSB0aGlzLl9nZXRDb25kaXRpb25Db3VudCgpO1xuICAgICAgICBsZXQgbWF4ID0gdGhpcy5faW5mby5jb25kaXRpb247XG4gICAgICAgIGNvdW50ID0gY291bnQgPT0gLTEgPyBtYXggOiBjb3VudFxuICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gY291bnQgLyBtYXg7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NMYWIuc3RyaW5nID0gYCR7Y291bnQgPiBtYXggPyBtYXggOiBjb3VudH0vJHttYXh9YFxuICAgICAgICBjb25zdCBkYXRhID0gTS5ydW50aW1lLkRhaWx5VGFza1Byb2dyZXNzLnByb2dyZXNzID8gTS5ydW50aW1lLkRhaWx5VGFza1Byb2dyZXNzLnByb2dyZXNzW3RoaXMuX2luZm8uaWRdIDogbnVsbDtcbiAgICAgICAgaWYgKGRhdGEgPT0gLTEgfHwgY291bnQgPj0gdGhpcy5faW5mby5jb25kaXRpb24pIHtcbiAgICAgICAgICAgIC8v5ruh6Laz6KaB5rGCIVxuICAgICAgICAgICAgdGhpcy5faXNDb21wbGV0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVMYWIubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGRhdGEgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1JlY2VpdmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVMYWIuc3RyaW5nID0gJ+W3sumihuWPliEnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlTGFiLnN0cmluZyA9ICflvoXpooblj5YhJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVMYWIubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsaWNrKCkge1xuICAgICAgICAvL+WIpOaWreW9k+WJjeaYr+WQpuWPr+S7peWujOaIkOS7u+WKoS5cbiAgICAgICAgaWYgKHRoaXMuX2lzQ29tcGxldCAmJiAhdGhpcy5faXNSZWNlaXZkKSB7XG4gICAgICAgICAgICBNLm5ldC5jaGVja1Rhc2tJc09LKHRoaXMuX2luZm8uaWQpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgTS51aS5zaG93VUkoVUlIdWREZWYuT3BlbkJveCwgeyBjb25maWc6IHsgcmV3YXJkczogdGhpcy5faW5mby5yZXdhcmRzIH0sIGlzSGlkZUJveDogdHJ1ZSwgdGV4dDogdGhpcy5faW5mby50eXBlID09IDIgPyAn5pel5Lu75YuZ542O5Yu1IScgOiAn5pyI5Lu75YuZ542O5Yu1IScgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy/lj5HmlL7lpZblirEhICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUxhYi5zdHJpbmcgPSAn5bey6aKG5Y+WISc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzUmVjZWl2ZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIE0ucnVudGltZS5EYWlseVRhc2tQcm9ncmVzc1t0aGlzLl9pbmZvLmlkXSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICBEYWlseVRhc2tNZ3IuaW5zLnJlY2VpdmVPSyh0aGlzLl9pbmZvLmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2dldENvbmRpdGlvbkNvdW50KCkge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBjb25zdCBkYXRlU3RyID0gWydkYXknLCAnbW9udGgnXVt0aGlzLl9pbmZvLnR5cGUgLSAyXTtcbiAgICAgICAgbGV0IGtleSA9IG51bGw7XG4gICAgICAgIHN3aXRjaCAodGhpcy5fY29uZGl0aW9uVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBDb25kaXRpb25UeXBlLmNvbGxlY3Q6XG4gICAgICAgICAgICAgICAga2V5ID0gW05hdGl2ZUtleS5EYWlseUNvbGxlY3QsIE5hdGl2ZUtleS5Nb250aENvbGxlY3RdW3RoaXMuX2luZm8udHlwZSAtIDJdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNkID0gU3RvcmFnZU1nci5SaW5nU3RvcmFnZVtkYXRlU3RyXSgpLmdldFZhbHVlKGtleSwgbnVsbCk7XG4gICAgICAgICAgICAgICAgaWYgKGNkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ID0gY2RbdGhpcy5fY29uZGl0aW9uU3ViVHlwZV0gfHwgMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENvbmRpdGlvblR5cGUubWVyZ2U6XG4gICAgICAgICAgICAgICAga2V5ID0gW05hdGl2ZUtleS5EYWlseU1lcmdlLCBOYXRpdmVLZXkuTW9udGhNZXJnZV1bdGhpcy5faW5mby50eXBlIC0gMl07XG4gICAgICAgICAgICAgICAgY29uc3QgbWQgPSBTdG9yYWdlTWdyLlJpbmdTdG9yYWdlW2RhdGVTdHJdKCkuZ2V0VmFsdWUoa2V5LCBudWxsKTtcbiAgICAgICAgICAgICAgICBpZiAobWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQgPSBtZFt0aGlzLl9jb25kaXRpb25TdWJUeXBlXSB8fCAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ29uZGl0aW9uVHlwZS5kb3Byb3A6XG4gICAgICAgICAgICAgICAga2V5ID0gW05hdGl2ZUtleS5EYWlseVVzZVByb3BDb3VudCwgTmF0aXZlS2V5Lk1vbnRoVXNlUHJvcENvdW50XVt0aGlzLl9pbmZvLnR5cGUgLSAyXTtcbiAgICAgICAgICAgICAgICBjb3VudCA9IFN0b3JhZ2VNZ3IuUmluZ1N0b3JhZ2VbZGF0ZVN0cl0oKS5nZXRWYWx1ZShrZXksIDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDb25kaXRpb25UeXBlLmdhbWVDb3VudDpcbiAgICAgICAgICAgICAgICBrZXkgPSBbTmF0aXZlS2V5LkRhaWx5R2FtZUNvdW50LCBOYXRpdmVLZXkuTW9udGhHYW1lQ291bnRdW3RoaXMuX2luZm8udHlwZSAtIDJdO1xuICAgICAgICAgICAgICAgIGNvdW50ID0gU3RvcmFnZU1nci5SaW5nU3RvcmFnZVtkYXRlU3RyXSgpLmdldFZhbHVlKGtleSwgMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH1cblxuXG59XG4iXX0=