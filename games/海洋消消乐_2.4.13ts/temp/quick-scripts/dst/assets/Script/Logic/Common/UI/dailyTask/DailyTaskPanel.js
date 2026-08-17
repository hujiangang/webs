
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/dailyTask/DailyTaskPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e37f1UoGFRAA75j36BGyPMK', 'DailyTaskPanel');
// Script/Logic/Common/UI/dailyTask/DailyTaskPanel.ts

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
var UIData_1 = require("../../../Data/Interface/UIData");
var DailyItem_1 = require("./DailyItem");
var TimerTaskItem_1 = require("./TimerTaskItem");
var Event_1 = require("../../../Data/Const/Event");
var Util_1 = require("../../../../Base/Utils/Util");
var CustomTaskItem_1 = require("./CustomTaskItem");
var DailyTaskMgr_1 = require("../../../../Base/Manager/DailyTaskMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DailyTaskPanel = /** @class */ (function (_super) {
    __extends(DailyTaskPanel, _super);
    function DailyTaskPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.customContent = null;
        _this.dailyContent = null;
        _this.monthContent = null;
        _this.timerContent = null;
        _this.dailyNode = null;
        _this.monthNode = null;
        _this.customCountDown = null;
        _this.dailyCountDown = null;
        _this.monthCountDown = null;
        _this.customItemPrefab = null;
        _this.timerItemPrefab = null;
        _this.dailyItemPrefab = null;
        _this.monthItemPrefab = null;
        _this.rewardIconFrames = [];
        _this._customProgressPool = [];
        _this._customProgress = null;
        _this._isCanUpdateRemoteData = true;
        return _this;
    }
    DailyTaskPanel.prototype.onLoad = function () {
        M_1.default.event.register(Event_1.Event.DailyTask.UpdateProgress, this._onTimerTick, this);
        M_1.default.event.register(Event_1.Event.DailyTask.UpdateTaskKey, this._onUpdateTaskKey, this);
    };
    DailyTaskPanel.prototype.onDestroy = function () {
        M_1.default.event.unRegister(Event_1.Event.DailyTask.UpdateProgress, this._onTimerTick, this);
        M_1.default.event.unRegister(Event_1.Event.DailyTask.UpdateTaskKey, this._onUpdateTaskKey, this);
    };
    DailyTaskPanel.prototype.onShow = function () {
        _super.prototype.onShow.call(this);
        this._isCanUpdateRemoteData = true;
    };
    DailyTaskPanel.prototype.onInit = function () {
        var datas = M_1.default.table.DailyTaskInfo.getData();
        var isNeedCreateCustomItem = this.customContent.children.length === 0;
        this.timerContent.removeAllChildren();
        this.dailyContent.removeAllChildren();
        this.monthContent.removeAllChildren();
        for (var i = 0; i < datas.length; i++) {
            var data = datas[i];
            //初始化显示!
            isNeedCreateCustomItem && this._initCustomTask(data);
            this._initDailyTask(data);
            this._initMonthTask(data);
        }
        this.scheduleOnce(this._delayInitTask.bind(this), 0.2);
        this._updateCountDown();
    };
    DailyTaskPanel.prototype._initCustomTask = function (data) {
        if (data.type == 4) {
            var node = M_1.default.nodePool.createItem(this.customItemPrefab);
            node.parent = this.customContent;
            node.getComponent(CustomTaskItem_1.default).init(data, this._getIconByType(data.rewards[0].type));
            this._customProgressPool.push({ data: data, node: node });
        }
    };
    DailyTaskPanel.prototype._updateCountDown = function () {
        var _this = this;
        if (this.node.active && M_1.default.runtime.DailyTaskProgress && M_1.default.runtime.DailyTaskProgress.expires) {
            var now = (Date.now() / 1000) >> 0;
            var dailyCountDown = M_1.default.runtime.DailyTaskProgress.expires.daily - now;
            this.dailyCountDown.string = Util_1.Util.Timer.conversionTime(dailyCountDown);
            this.monthCountDown.string = Util_1.Util.Timer.conversionTime(M_1.default.runtime.DailyTaskProgress.expires.monthly - now);
            this.customCountDown.string = Util_1.Util.Timer.conversionTime(M_1.default.runtime.DailyTaskProgress.expires.custom - now);
            if (dailyCountDown < 0 && this._isCanUpdateRemoteData) {
                //重新更新进度信息! 
                this._isCanUpdateRemoteData = false;
                this.scheduleOnce(function () {
                    M_1.default.net.getDailyTask().then(function (res) {
                        M_1.default.runtime.DailyTaskProgress = res;
                        M_1.default.runtime.initTaskNativeData();
                        _this.customContent.removeAllChildren();
                        _this._customProgress.parent = _this.customContent.parent.parent;
                        _this._customProgress.active = false;
                        _this._customProgress = null;
                        _this.customContent.getComponent(cc.Layout).enabled = true;
                        _this.onInit();
                    });
                }, 1);
            }
        }
    };
    DailyTaskPanel.prototype._delayInitTask = function () {
        this.customContent.getComponent(cc.Layout).enabled = false;
        if (!this._customProgress) {
            this._customProgress = this.customContent.parent.parent.getChildByName('keyProgress');
            this._customProgress.parent = this.customContent;
        }
        this._customProgress.active = true;
        this._customProgress.x = 21;
        this._customProgress.y = -58;
        this._customProgress.width = this.customContent.width - 50;
        this._onUpdateTaskKey();
    };
    DailyTaskPanel.prototype._initTimerTask = function (data) {
        if (data.type == 1) {
            var node = M_1.default.nodePool.createItem(this.timerItemPrefab);
            node.parent = this.timerContent;
            node.getComponent(TimerTaskItem_1.default).init(data, this._getIconByType(data.rewards[0].type));
        }
    };
    DailyTaskPanel.prototype._initDailyTask = function (data) {
        if (data.type == 2) {
            var node = M_1.default.nodePool.createItem(this.dailyItemPrefab);
            node.parent = this.dailyContent;
            node.getComponent(DailyItem_1.default).init(data, this._getIconByType(data.rewards[0].type));
        }
        else {
            this._initTimerTask(data);
        }
    };
    DailyTaskPanel.prototype._initMonthTask = function (data) {
        if (data.type == 3) {
            var node = M_1.default.nodePool.createItem(this.dailyItemPrefab);
            node.parent = this.monthContent;
            node.getComponent(DailyItem_1.default).init(data, this._getIconByType(data.rewards[0].type));
        }
    };
    DailyTaskPanel.prototype.onCloseBtnClick = function () {
        M_1.default.ui.hideUI(UIData_1.UIHudDef.DailyTaskPanel);
    };
    DailyTaskPanel.prototype._onUpdateTaskKey = function () {
        ///更新进度条!
        var lastData = this._customProgressPool[this._customProgressPool.length - 1].data;
        var unit = this._customProgress.width / lastData.condition;
        this._customProgress.getChildByName('bar').width = unit * DailyTaskMgr_1.default.ins.getDailyTaskKey();
        this._customProgress.getChildByName('label').getComponent(cc.Label).string = DailyTaskMgr_1.default.ins.getDailyTaskKey();
    };
    DailyTaskPanel.prototype.onChangeTaskTypeClick = function (event) {
        switch (event.node.name) {
            case 'daily':
                this.dailyNode.active = true;
                this.monthNode.active = false;
                break;
            case 'monty':
                this.dailyNode.active = false;
                this.monthNode.active = true;
                break;
        }
    };
    DailyTaskPanel.prototype._getIconByType = function (type) {
        var frame = null;
        if (type < 100) {
            frame = this.rewardIconFrames[20 + type];
        }
        else {
            frame = this.rewardIconFrames[type - 100];
        }
        return frame;
    };
    DailyTaskPanel.prototype._onTimerTick = function () {
        this._updateCountDown();
    };
    __decorate([
        property(cc.Node)
    ], DailyTaskPanel.prototype, "customContent", void 0);
    __decorate([
        property(cc.Node)
    ], DailyTaskPanel.prototype, "dailyContent", void 0);
    __decorate([
        property(cc.Node)
    ], DailyTaskPanel.prototype, "monthContent", void 0);
    __decorate([
        property(cc.Node)
    ], DailyTaskPanel.prototype, "timerContent", void 0);
    __decorate([
        property(cc.Node)
    ], DailyTaskPanel.prototype, "dailyNode", void 0);
    __decorate([
        property(cc.Node)
    ], DailyTaskPanel.prototype, "monthNode", void 0);
    __decorate([
        property(cc.Label)
    ], DailyTaskPanel.prototype, "customCountDown", void 0);
    __decorate([
        property(cc.Label)
    ], DailyTaskPanel.prototype, "dailyCountDown", void 0);
    __decorate([
        property(cc.Label)
    ], DailyTaskPanel.prototype, "monthCountDown", void 0);
    __decorate([
        property(cc.Prefab)
    ], DailyTaskPanel.prototype, "customItemPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], DailyTaskPanel.prototype, "timerItemPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], DailyTaskPanel.prototype, "dailyItemPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], DailyTaskPanel.prototype, "monthItemPrefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], DailyTaskPanel.prototype, "rewardIconFrames", void 0);
    DailyTaskPanel = __decorate([
        ccclass
    ], DailyTaskPanel);
    return DailyTaskPanel;
}(UIBase_1.default));
exports.default = DailyTaskPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcZGFpbHlUYXNrXFxEYWlseVRhc2tQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBZ0Q7QUFDaEQsZ0RBQTJDO0FBQzNDLHlEQUEwRDtBQUUxRCx5Q0FBb0M7QUFDcEMsaURBQTRDO0FBQzVDLG1EQUFrRDtBQUNsRCxvREFBbUQ7QUFDbkQsbURBQThDO0FBQzlDLHNFQUFpRTtBQUczRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE0QyxrQ0FBTTtJQUFsRDtRQUFBLHFFQXVNQztRQXBNRyxtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIscUJBQWUsR0FBYSxJQUFJLENBQUM7UUFHakMsb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFHaEMsb0JBQWMsR0FBYSxJQUFJLENBQUM7UUFHaEMsc0JBQWdCLEdBQWMsSUFBSSxDQUFDO1FBR25DLHFCQUFlLEdBQWMsSUFBSSxDQUFDO1FBR2xDLHFCQUFlLEdBQWMsSUFBSSxDQUFDO1FBR2xDLHFCQUFlLEdBQWMsSUFBSSxDQUFDO1FBR2xDLHNCQUFnQixHQUFxQixFQUFFLENBQUM7UUFFaEMseUJBQW1CLEdBQWtELEVBQUUsQ0FBQztRQUV4RSxxQkFBZSxHQUFHLElBQUksQ0FBQztRQUV2Qiw0QkFBc0IsR0FBRyxJQUFJLENBQUM7O0lBdUoxQyxDQUFDO0lBckpHLCtCQUFNLEdBQU47UUFDSSxXQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxh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QUUsQ0FBQyxNQUFNLENBQUM7MkRBQ2M7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsyREFDYztJQUdsQztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzs0REFDYTtJQTFDdkIsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQXVNbEM7SUFBRCxxQkFBQztDQXZNRCxBQXVNQyxDQXZNMkMsZ0JBQU0sR0F1TWpEO2tCQXZNb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVSUJhc2UgZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvVUkvVUlCYXNlXCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IFVJSHVkRGVmIH0gZnJvbSBcIi4uLy4uLy4uL0RhdGEvSW50ZXJmYWNlL1VJRGF0YVwiO1xuaW1wb3J0IERhaWx5VGFza0luZm8gZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvVGFibHMvRGFpbHlUYXNrSW5mb1wiO1xuaW1wb3J0IERhaWx5SXRlbSBmcm9tIFwiLi9EYWlseUl0ZW1cIjtcbmltcG9ydCBUaW1lclRhc2tJdGVtIGZyb20gXCIuL1RpbWVyVGFza0l0ZW1cIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9VdGlscy9VdGlsXCI7XG5pbXBvcnQgQ3VzdG9tVGFza0l0ZW0gZnJvbSBcIi4vQ3VzdG9tVGFza0l0ZW1cIjtcbmltcG9ydCBEYWlseVRhc2tNZ3IgZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9EYWlseVRhc2tNZ3JcIjtcblxuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFpbHlUYXNrUGFuZWwgZXh0ZW5kcyBVSUJhc2Uge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY3VzdG9tQ29udGVudDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBkYWlseUNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbW9udGhDb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRpbWVyQ29udGVudDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBkYWlseU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbW9udGhOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBjdXN0b21Db3VudERvd246IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBkYWlseUNvdW50RG93bjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIG1vbnRoQ291bnREb3duOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGN1c3RvbUl0ZW1QcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHRpbWVySXRlbVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgZGFpbHlJdGVtUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBtb250aEl0ZW1QcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICByZXdhcmRJY29uRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBwcml2YXRlIF9jdXN0b21Qcm9ncmVzc1Bvb2w6IEFycmF5PHsgZGF0YTogRGFpbHlUYXNrSW5mbywgbm9kZTogY2MuTm9kZSB9PiA9IFtdO1xuXG4gICAgcHJpdmF0ZSBfY3VzdG9tUHJvZ3Jlc3MgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfaXNDYW5VcGRhdGVSZW1vdGVEYXRhID0gdHJ1ZTtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgTS5ldmVudC5yZWdpc3RlcihFdmVudC5EYWlseVRhc2suVXBkYXRlUHJvZ3Jlc3MsIHRoaXMuX29uVGltZXJUaWNrLCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC5yZWdpc3RlcihFdmVudC5EYWlseVRhc2suVXBkYXRlVGFza0tleSwgdGhpcy5fb25VcGRhdGVUYXNrS2V5LCB0aGlzKVxuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LkRhaWx5VGFzay5VcGRhdGVQcm9ncmVzcywgdGhpcy5fb25UaW1lclRpY2ssIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuRGFpbHlUYXNrLlVwZGF0ZVRhc2tLZXksIHRoaXMuX29uVXBkYXRlVGFza0tleSwgdGhpcylcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TaG93KCkge1xuICAgICAgICBzdXBlci5vblNob3coKVxuICAgICAgICB0aGlzLl9pc0NhblVwZGF0ZVJlbW90ZURhdGEgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkluaXQoKSB7XG4gICAgICAgIGNvbnN0IGRhdGFzID0gTS50YWJsZS5EYWlseVRhc2tJbmZvLmdldERhdGEoKTtcbiAgICAgICAgY29uc3QgaXNOZWVkQ3JlYXRlQ3VzdG9tSXRlbTogYm9vbGVhbiA9IHRoaXMuY3VzdG9tQ29udGVudC5jaGlsZHJlbi5sZW5ndGggPT09IDA7XG5cbiAgICAgICAgdGhpcy50aW1lckNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgdGhpcy5kYWlseUNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgdGhpcy5tb250aENvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gZGF0YXNbaV07XG4gICAgICAgICAgICAvL+WIneWni+WMluaYvuekuiFcbiAgICAgICAgICAgIGlzTmVlZENyZWF0ZUN1c3RvbUl0ZW0gJiYgdGhpcy5faW5pdEN1c3RvbVRhc2soZGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9pbml0RGFpbHlUYXNrKGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5faW5pdE1vbnRoVGFzayhkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLl9kZWxheUluaXRUYXNrLmJpbmQodGhpcyksIDAuMik7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNvdW50RG93bigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRDdXN0b21UYXNrKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEudHlwZSA9PSA0KSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gTS5ub2RlUG9vbC5jcmVhdGVJdGVtKHRoaXMuY3VzdG9tSXRlbVByZWZhYik7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuY3VzdG9tQ29udGVudDtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEN1c3RvbVRhc2tJdGVtKS5pbml0KGRhdGEsIHRoaXMuX2dldEljb25CeVR5cGUoZGF0YS5yZXdhcmRzWzBdLnR5cGUpKTtcbiAgICAgICAgICAgIHRoaXMuX2N1c3RvbVByb2dyZXNzUG9vbC5wdXNoKHsgZGF0YSwgbm9kZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZUNvdW50RG93bigpIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZS5hY3RpdmUgJiYgTS5ydW50aW1lLkRhaWx5VGFza1Byb2dyZXNzICYmIE0ucnVudGltZS5EYWlseVRhc2tQcm9ncmVzcy5leHBpcmVzKSB7XG4gICAgICAgICAgICBjb25zdCBub3cgPSAoRGF0ZS5ub3coKSAvIDEwMDApID4+IDA7XG4gICAgICAgICAgICBjb25zdCBkYWlseUNvdW50RG93biA9IE0ucnVudGltZS5EYWlseVRhc2tQcm9ncmVzcy5leHBpcmVzLmRhaWx5IC0gbm93O1xuICAgICAgICAgICAgdGhpcy5kYWlseUNvdW50RG93bi5zdHJpbmcgPSBVdGlsLlRpbWVyLmNvbnZlcnNpb25UaW1lKGRhaWx5Q291bnREb3duKTtcbiAgICAgICAgICAgIHRoaXMubW9udGhDb3VudERvd24uc3RyaW5nID0gVXRpbC5UaW1lci5jb252ZXJzaW9uVGltZShNLnJ1bnRpbWUuRGFpbHlUYXNrUHJvZ3Jlc3MuZXhwaXJlcy5tb250aGx5IC0gbm93KTtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tQ291bnREb3duLnN0cmluZyA9IFV0aWwuVGltZXIuY29udmVyc2lvblRpbWUoTS5ydW50aW1lLkRhaWx5VGFza1Byb2dyZXNzLmV4cGlyZXMuY3VzdG9tIC0gbm93KTtcbiAgICAgICAgICAgIGlmIChkYWlseUNvdW50RG93biA8IDAgJiYgdGhpcy5faXNDYW5VcGRhdGVSZW1vdGVEYXRhKSB7XG4gICAgICAgICAgICAgICAgLy/ph43mlrDmm7TmlrDov5vluqbkv6Hmga8hIFxuICAgICAgICAgICAgICAgIHRoaXMuX2lzQ2FuVXBkYXRlUmVtb3RlRGF0YSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgTS5uZXQuZ2V0RGFpbHlUYXNrKCkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBNLnJ1bnRpbWUuRGFpbHlUYXNrUHJvZ3Jlc3MgPSByZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICBNLnJ1bnRpbWUuaW5pdFRhc2tOYXRpdmVEYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbUNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1c3RvbVByb2dyZXNzLnBhcmVudCA9IHRoaXMuY3VzdG9tQ29udGVudC5wYXJlbnQucGFyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VzdG9tUHJvZ3Jlc3MuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXN0b21Qcm9ncmVzcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbUNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkxheW91dCkuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uSW5pdCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCAxKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGVsYXlJbml0VGFzaygpIHtcblxuICAgICAgICB0aGlzLmN1c3RvbUNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkxheW91dCkuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMuX2N1c3RvbVByb2dyZXNzKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXN0b21Qcm9ncmVzcyA9IHRoaXMuY3VzdG9tQ29udGVudC5wYXJlbnQucGFyZW50LmdldENoaWxkQnlOYW1lKCdrZXlQcm9ncmVzcycpO1xuICAgICAgICAgICAgdGhpcy5fY3VzdG9tUHJvZ3Jlc3MucGFyZW50ID0gdGhpcy5jdXN0b21Db250ZW50O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1c3RvbVByb2dyZXNzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2N1c3RvbVByb2dyZXNzLnggPSAyMVxuICAgICAgICB0aGlzLl9jdXN0b21Qcm9ncmVzcy55ID0gLTU4O1xuICAgICAgICB0aGlzLl9jdXN0b21Qcm9ncmVzcy53aWR0aCA9IHRoaXMuY3VzdG9tQ29udGVudC53aWR0aCAtIDUwO1xuICAgICAgICB0aGlzLl9vblVwZGF0ZVRhc2tLZXkoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0VGltZXJUYXNrKGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEudHlwZSA9PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gTS5ub2RlUG9vbC5jcmVhdGVJdGVtKHRoaXMudGltZXJJdGVtUHJlZmFiKTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy50aW1lckNvbnRlbnQ7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChUaW1lclRhc2tJdGVtKS5pbml0KGRhdGEsIHRoaXMuX2dldEljb25CeVR5cGUoZGF0YS5yZXdhcmRzWzBdLnR5cGUpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXREYWlseVRhc2soZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS50eXBlID09IDIpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBNLm5vZGVQb29sLmNyZWF0ZUl0ZW0odGhpcy5kYWlseUl0ZW1QcmVmYWIpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmRhaWx5Q29udGVudDtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KERhaWx5SXRlbSkuaW5pdChkYXRhLCB0aGlzLl9nZXRJY29uQnlUeXBlKGRhdGEucmV3YXJkc1swXS50eXBlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0VGltZXJUYXNrKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdE1vbnRoVGFzayhkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLnR5cGUgPT0gMykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IE0ubm9kZVBvb2wuY3JlYXRlSXRlbSh0aGlzLmRhaWx5SXRlbVByZWZhYik7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubW9udGhDb250ZW50O1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoRGFpbHlJdGVtKS5pbml0KGRhdGEsIHRoaXMuX2dldEljb25CeVR5cGUoZGF0YS5yZXdhcmRzWzBdLnR5cGUpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsb3NlQnRuQ2xpY2soKSB7IFxuICAgICAgICBNLnVpLmhpZGVVSShVSUh1ZERlZi5EYWlseVRhc2tQYW5lbCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25VcGRhdGVUYXNrS2V5KCkge1xuICAgICAgICAvLy/mm7TmlrDov5vluqbmnaEhXG4gICAgICAgIGxldCBsYXN0RGF0YSA9IHRoaXMuX2N1c3RvbVByb2dyZXNzUG9vbFt0aGlzLl9jdXN0b21Qcm9ncmVzc1Bvb2wubGVuZ3RoIC0gMV0uZGF0YTtcbiAgICAgICAgY29uc3QgdW5pdCA9IHRoaXMuX2N1c3RvbVByb2dyZXNzLndpZHRoIC8gbGFzdERhdGEuY29uZGl0aW9uXG4gICAgICAgIHRoaXMuX2N1c3RvbVByb2dyZXNzLmdldENoaWxkQnlOYW1lKCdiYXInKS53aWR0aCA9IHVuaXQgKiBEYWlseVRhc2tNZ3IuaW5zLmdldERhaWx5VGFza0tleSgpO1xuICAgICAgICB0aGlzLl9jdXN0b21Qcm9ncmVzcy5nZXRDaGlsZEJ5TmFtZSgnbGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IERhaWx5VGFza01nci5pbnMuZ2V0RGFpbHlUYXNrS2V5KClcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DaGFuZ2VUYXNrVHlwZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQubm9kZS5uYW1lKSB7XG4gICAgICAgICAgICBjYXNlICdkYWlseSc6XG4gICAgICAgICAgICAgICAgdGhpcy5kYWlseU5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vbnRoTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vbnR5JzpcbiAgICAgICAgICAgICAgICB0aGlzLmRhaWx5Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vbnRoTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0SWNvbkJ5VHlwZSh0eXBlKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICBsZXQgZnJhbWUgPSBudWxsO1xuICAgICAgICBpZiAodHlwZSA8IDEwMCkge1xuICAgICAgICAgICAgZnJhbWUgPSB0aGlzLnJld2FyZEljb25GcmFtZXNbMjAgKyB0eXBlXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyYW1lID0gdGhpcy5yZXdhcmRJY29uRnJhbWVzW3R5cGUgLSAxMDBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmcmFtZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vblRpbWVyVGljaygpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ291bnREb3duKCk7XG4gICAgfVxuXG5cbn1cbiJdfQ==