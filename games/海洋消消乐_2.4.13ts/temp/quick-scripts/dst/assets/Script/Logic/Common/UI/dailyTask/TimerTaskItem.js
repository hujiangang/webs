
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/dailyTask/TimerTaskItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcZGFpbHlUYXNrXFxUaW1lclRhc2tJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGtFQUFpRTtBQUNqRSxnREFBMkM7QUFDM0MsbURBQWtEO0FBQ2xELG9EQUFtRDtBQUNuRCx5REFBMEQ7QUFFcEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBTSxtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQztBQUk5QztJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQTZGQztRQTFGRyxXQUFLLEdBQWEsSUFBSSxDQUFDO1FBR3ZCLFVBQUksR0FBYyxJQUFJLENBQUM7UUFHdkIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUVuQixXQUFLLEdBQWtCLElBQUksQ0FBQztRQUVwQyxPQUFPO1FBQ0Msb0JBQWMsR0FBVyxJQUFJLENBQUM7UUFFOUIsYUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QixnQkFBVSxHQUFZLEtBQUssQ0FBQztRQUU1QixnQkFBVSxHQUFZLEtBQUssQ0FBQzs7SUF5RXhDLENBQUM7SUF2RUcsOEJBQU0sR0FBTjtRQUNJLFdBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQUssQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUUsV0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBSyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQ0ksV0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUs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c291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGFpbHlUYXNrSW5mbyBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9UYWJscy9EYWlseVRhc2tJbmZvXCI7XG5pbXBvcnQgeyBDb25kaXRpb25UeXBlLCBOYXRpdmVLZXkgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IHsgU3RvcmFnZU1nciB9IGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL01hbmFnZXIvU3RvcmFnZU1nclwiO1xuaW1wb3J0IE0gZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9EYXRhL0NvbnN0L0V2ZW50XCI7XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvVXRpbHMvVXRpbFwiO1xuaW1wb3J0IHsgVUlIdWREZWYgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9JbnRlcmZhY2UvVUlEYXRhXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbmNvbnN0IERBSUxZX1RBU0tfREFUQV9LRVkgPSAnREFJTFlfVEFTS19EQVRBJztcblxuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXJUYXNrSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgY291bnQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaWNvbjogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBjb3VudERvd246IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2luZm86IERhaWx5VGFza0luZm8gPSBudWxsO1xuXG4gICAgLy/nm67moIfkuLvnsbvlnotcbiAgICBwcml2YXRlIF9jb25kaXRpb25UeXBlOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9pc1JlY2VpdmQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX2lzQ29tcGxldDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LkRhaWx5VGFzay5VcGRhdGVQcm9ncmVzcywgdGhpcy51cGRhdGVQcm9ncmVzcywgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuRGFpbHlUYXNrLlVwZGF0ZVRpbWVyVGFza0FjdGl2ZSwgdGhpcy51cGRhdGVBY3RpdmUsIHRoaXMpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LkRhaWx5VGFzay5VcGRhdGVQcm9ncmVzcywgdGhpcy51cGRhdGVQcm9ncmVzcywgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5EYWlseVRhc2suVXBkYXRlVGltZXJUYXNrQWN0aXZlLCB0aGlzLnVwZGF0ZUFjdGl2ZSwgdGhpcyk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgaW5pdChpbmZvOiBEYWlseVRhc2tJbmZvLCBpY29uRnJhbWU6IGNjLlNwcml0ZUZyYW1lKSB7XG5cbiAgICAgICAgdGhpcy5faW5mbyA9IGluZm87XG4gICAgICAgIHRoaXMuX2NvbmRpdGlvblR5cGUgPSBpbmZvLmNvbmRpdGlvblR5cGU7XG4gICAgICAgIHRoaXMuaWNvbi5zcHJpdGVGcmFtZSA9IGljb25GcmFtZTtcbiAgICAgICAgdGhpcy5pY29uLm5vZGUuc2NhbGUgPSA3MCAvIHRoaXMuaWNvbi5ub2RlLmhlaWdodDtcbiAgICAgICAgdGhpcy5jb3VudC5zdHJpbmcgPSBgeCR7aW5mby5yZXdhcmRzWzBdLmNvdW50fWA7XG5cbiAgICAgICAgdGhpcy51cGRhdGVBY3RpdmUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQWN0aXZlKCkge1xuICAgICAgICAvL+aYr+WQpuW8gOWQr1xuICAgICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgZGF0YTogeyBpc1JlY2VpdmQ6IGJvb2xlYW4gfSA9IFN0b3JhZ2VNZ3IuUmluZ1N0b3JhZ2UuZGF5KCkuZ2V0VmFsdWUoREFJTFlfVEFTS19EQVRBX0tFWSwge30pW3RoaXMuX2luZm8uaWRdO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5faXNSZWNlaXZkID0gZGF0YS5pc1JlY2VpdmQ7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNSZWNlaXZkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudERvd24uc3RyaW5nID0gJ+mihuWujCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcmVJbmRleCA9IHRoaXMuX2luZm8uaWQgLSAxO1xuICAgICAgICBjb25zdCBwcmVEYXRhID0gU3RvcmFnZU1nci5SaW5nU3RvcmFnZS5kYXkoKS5nZXRWYWx1ZShEQUlMWV9UQVNLX0RBVEFfS0VZLCB7fSlbcHJlSW5kZXhdO1xuICAgICAgICBpZiAocHJlSW5kZXggPCAxIHx8IChwcmVEYXRhICYmIHByZURhdGEuaXNSZWNlaXZkKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc1JlY2VpdmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnREb3duLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY291bnREb3duLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzQ29tcGxldCAmJiAhdGhpcy5faXNSZWNlaXZkKSB7XG4gICAgICAgICAgICAvL+mihuWPluWlluWKsSBcbiAgICAgICAgICAgIE0udWkuc2hvd1VJKFVJSHVkRGVmLk9wZW5Cb3gsIHsgY29uZmlnOiB7IHJld2FyZHM6IHRoaXMuX2luZm8ucmV3YXJkcyB9LCB0ZXh0OiAn5oyC5py65aWW5YqxIScsIGlzSGlkZUJveDogdHJ1ZSB9KTtcbiAgICAgICAgICAgIC8v6YeN572u54q25oCBXG4gICAgICAgICAgICBNLnJ1bnRpbWUuc2V0RGFpbHlUaW1lKDApO1xuICAgICAgICAgICAgbGV0IGRhdGFzID0gU3RvcmFnZU1nci5SaW5nU3RvcmFnZS5kYXkoKS5nZXRWYWx1ZShEQUlMWV9UQVNLX0RBVEFfS0VZLCB7fSk7XG4gICAgICAgICAgICB0aGlzLl9pc1JlY2VpdmQgPSB0cnVlO1xuICAgICAgICAgICAgZGF0YXNbdGhpcy5faW5mby5pZF0gPSB7IGlzUmVjZWl2ZDogdHJ1ZSB9O1xuICAgICAgICAgICAgU3RvcmFnZU1nci5SaW5nU3RvcmFnZS5kYXkoKS5zZXRWYWx1ZShEQUlMWV9UQVNLX0RBVEFfS0VZLCBkYXRhcyk7XG4gICAgICAgICAgICAvL+W8gOWQr+S4i+S4gOS4qiFcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5EYWlseVRhc2suVXBkYXRlVGltZXJUYXNrQWN0aXZlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlUHJvZ3Jlc3ModHlwZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0eXBlID09IHRoaXMuX2NvbmRpdGlvblR5cGUgJiYgdGhpcy5fYWN0aXZlKSB7XG4gICAgICAgICAgICBjb25zdCBudW0gPSB0aGlzLl9pbmZvLmNvbmRpdGlvbiAtIE0ucnVudGltZS5EYWlseVRpbWU7XG4gICAgICAgICAgICBpZiAobnVtIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzQ29tcGxldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudERvd24uc3RyaW5nID0gJ+W+hemihuWPlidcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudERvd24uc3RyaW5nID0gVXRpbC5UaW1lci5jb252ZXJzaW9uVGltZShudW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=