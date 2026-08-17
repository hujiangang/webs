"use strict";
cc._RF.push(module, 'c58b9hMLqtON5benlOqWtr4', 'CustomTaskItem');
// Script/Logic/Common/UI/dailyTask/CustomTaskItem.ts

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
var DailyTaskMgr_1 = require("../../../../Base/Manager/DailyTaskMgr");
var M_1 = require("../../../../Base/Manager/M");
var Event_1 = require("../../../Data/Const/Event");
var UIData_1 = require("../../../Data/Interface/UIData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CustomTaskItem = /** @class */ (function (_super) {
    __extends(CustomTaskItem, _super);
    function CustomTaskItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = null;
        _this.stateLabel = null;
        _this.icon = null;
        _this._isReceivd = false;
        _this._isComplet = false;
        _this._info = null;
        return _this;
    }
    CustomTaskItem.prototype.onLoad = function () {
        M_1.default.event.register(Event_1.Event.DailyTask.UpdateTaskKey, this._onUpdateTaskKey, this);
    };
    CustomTaskItem.prototype.start = function () {
        M_1.default.event.unRegister(Event_1.Event.DailyTask.UpdateTaskKey, this._onUpdateTaskKey, this);
    };
    CustomTaskItem.prototype.init = function (info, iconFrame) {
        this._info = info;
        this.icon.spriteFrame = iconFrame;
        this.icon.node.scale = 60 / this.icon.node.height;
        this.count.string = info.rewards[0].count.toString();
        this._isComplet = info.condition >= DailyTaskMgr_1.default.ins.getDailyTaskKey();
        if (M_1.default.runtime.DailyTaskProgress.progress && M_1.default.runtime.DailyTaskProgress.progress[this._info.id] == -1) {
            this._isReceivd = true;
        }
        this._isComplet = (DailyTaskMgr_1.default.ins.getDailyTaskKey() >= this._info.condition);
        if (this._isComplet) {
            this.stateLabel.node.active = true;
            if (this._isReceivd) {
                this.stateLabel.string = '已领取';
            }
            else {
                this.stateLabel.string = '待领取';
            }
        }
        else {
            this.stateLabel.node.active = false;
        }
    };
    CustomTaskItem.prototype.onClick = function () {
        if (this._isComplet && !this._isReceivd) {
            //領取獎勵!
            M_1.default.ui.showUI(UIData_1.UIHudDef.OpenBox, { config: { rewards: this._info.rewards }, text: '挂机奖励!', isHideBox: true });
            DailyTaskMgr_1.default.ins.receiveOK(this._info.id);
            M_1.default.runtime.DailyTaskProgress.progress[this._info.id] = -1;
            this._isReceivd = true;
            this.stateLabel.string = '已领取';
        }
    };
    CustomTaskItem.prototype._onUpdateTaskKey = function (count) {
        if (count >= this._info.condition && !this._isReceivd) {
            this._isComplet = true;
            //show complet state
            this.stateLabel.node.active = true;
            this.stateLabel.string = '待领取';
        }
    };
    __decorate([
        property(cc.Label)
    ], CustomTaskItem.prototype, "count", void 0);
    __decorate([
        property(cc.Label)
    ], CustomTaskItem.prototype, "stateLabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], CustomTaskItem.prototype, "icon", void 0);
    CustomTaskItem = __decorate([
        ccclass
    ], CustomTaskItem);
    return CustomTaskItem;
}(cc.Component));
exports.default = CustomTaskItem;

cc._RF.pop();