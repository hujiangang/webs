"use strict";
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