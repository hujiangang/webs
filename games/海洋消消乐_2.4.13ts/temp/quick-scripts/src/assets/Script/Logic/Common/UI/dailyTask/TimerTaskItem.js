"use strict";
cc._RF.push(module, '53d71XNb5BDi7lbuQx2+kkb', 'TimerTaskItem');
// Script/Logic/Common/UI/dailyTask/TimerTaskItem.ts

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
var StorageMgr_1 = require("../../../../Base/Manager/StorageMgr");
var M_1 = require("../../../../Base/Manager/M");
var Event_1 = require("../../../Data/Const/Event");
var Util_1 = require("../../../../Base/Utils/Util");
var UIData_1 = require("../../../Data/Interface/UIData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DAILY_TASK_DATA_KEY = 'DAILY_TASK_DATA';
var TimerTaskItem = /** @class */ (function (_super) {
    __extends(TimerTaskItem, _super);
    function TimerTaskItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = null;
        _this.icon = null;
        _this.countDown = null;
        _this._info = null;
        //目标主类型
        _this._conditionType = null;
        _this._active = false;
        _this._isReceivd = false;
        _this._isComplet = false;
        return _this;
    }
    TimerTaskItem.prototype.onLoad = function () {
        M_1.default.event.register(Event_1.Event.DailyTask.UpdateProgress, this.updateProgress, this);
        M_1.default.event.register(Event_1.Event.DailyTask.UpdateTimerTaskActive, this.updateActive, this);
    };
    TimerTaskItem.prototype.onDestroy = function () {
        M_1.default.event.unRegister(Event_1.Event.DailyTask.UpdateProgress, this.updateProgress, this);
        M_1.default.event.unRegister(Event_1.Event.DailyTask.UpdateTimerTaskActive, this.updateActive, this);
    };
    TimerTaskItem.prototype.init = function (info, iconFrame) {
        this._info = info;
        this._conditionType = info.conditionType;
        this.icon.spriteFrame = iconFrame;
        this.icon.node.scale = 70 / this.icon.node.height;
        this.count.string = "x" + info.rewards[0].count;
        this.updateActive();
    };
    TimerTaskItem.prototype.updateActive = function () {
        //是否开启
        this._active = false;
        var data = StorageMgr_1.StorageMgr.RingStorage.day().getValue(DAILY_TASK_DATA_KEY, {})[this._info.id];
        if (data) {
            this._isReceivd = data.isReceivd;
            if (this._isReceivd) {
                this.countDown.string = '领完';
            }
        }
        var preIndex = this._info.id - 1;
        var preData = StorageMgr_1.StorageMgr.RingStorage.day().getValue(DAILY_TASK_DATA_KEY, {})[preIndex];
        if (preIndex < 1 || (preData && preData.isReceivd)) {
            if (!this._isReceivd) {
                this._active = true;
                this.countDown.node.active = true;
            }
        }
        else {
            this.countDown.node.active = false;
        }
    };
    TimerTaskItem.prototype.onClick = function () {
        if (this._isComplet && !this._isReceivd) {
            //领取奖励 
            M_1.default.ui.showUI(UIData_1.UIHudDef.OpenBox, { config: { rewards: this._info.rewards }, text: '挂机奖励!', isHideBox: true });
            //重置状态
            M_1.default.runtime.setDailyTime(0);
            var datas = StorageMgr_1.StorageMgr.RingStorage.day().getValue(DAILY_TASK_DATA_KEY, {});
            this._isReceivd = true;
            datas[this._info.id] = { isReceivd: true };
            StorageMgr_1.StorageMgr.RingStorage.day().setValue(DAILY_TASK_DATA_KEY, datas);
            //开启下一个!
            M_1.default.event.send(Event_1.Event.DailyTask.UpdateTimerTaskActive);
        }
    };
    TimerTaskItem.prototype.updateProgress = function (type) {
        if (type == this._conditionType && this._active) {
            var num = this._info.condition - M_1.default.runtime.DailyTime;
            if (num < 0) {
                this._isComplet = true;
                this.countDown.string = '待领取';
            }
            else {
                this.countDown.string = Util_1.Util.Timer.conversionTime(num);
            }
        }
    };
    __decorate([
        property(cc.Label)
    ], TimerTaskItem.prototype, "count", void 0);
    __decorate([
        property(cc.Sprite)
    ], TimerTaskItem.prototype, "icon", void 0);
    __decorate([
        property(cc.Label)
    ], TimerTaskItem.prototype, "countDown", void 0);
    TimerTaskItem = __decorate([
        ccclass
    ], TimerTaskItem);
    return TimerTaskItem;
}(cc.Component));
exports.default = TimerTaskItem;

cc._RF.pop();