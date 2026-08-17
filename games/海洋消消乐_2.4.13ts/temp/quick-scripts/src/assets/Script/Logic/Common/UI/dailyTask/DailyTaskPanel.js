"use strict";
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