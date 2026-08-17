
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/dailyTask/CustomTaskItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcZGFpbHlUYXNrXFxDdXN0b21UYXNrSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxzRUFBaUU7QUFDakUsZ0RBQTJDO0FBQzNDLG1EQUFrRDtBQUNsRCx5REFBMEQ7QUFHcEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUFxRUM7UUFsRUcsV0FBSyxHQUFhLElBQUksQ0FBQztRQUd2QixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixVQUFJLEdBQWMsSUFBSSxDQUFDO1FBRWYsZ0JBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUIsZ0JBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUIsV0FBSyxHQUFrQixJQUFJLENBQUM7O0lBc0R4QyxDQUFDO0lBcERHLCtCQUFNLEdBQU47UUFDSSxXQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDaEYsQ0FBQztJQUVELDhCQUFLLEdBQUw7UUFDSSxXQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxhQUFLLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDbEYsQ0FBQztJQUVNLDZCQUFJLEdBQVgsVUFBWSxJQUFtQixFQUFFLFNBQXlCO1FBQ3RELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWxCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdB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O0lBQUQscUJBQUM7Q0FyRUQsQUFxRUMsQ0FyRTJDLEVBQUUsQ0FBQyxTQUFTLEdBcUV2RDtrQkFyRW9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGFpbHlUYXNrSW5mbyBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9UYWJscy9EYWlseVRhc2tJbmZvXCI7XG5pbXBvcnQgRGFpbHlUYXNrTWdyIGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL01hbmFnZXIvRGFpbHlUYXNrTWdyXCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCB7IFVJSHVkRGVmIH0gZnJvbSBcIi4uLy4uLy4uL0RhdGEvSW50ZXJmYWNlL1VJRGF0YVwiO1xuaW1wb3J0IHsgU3RvcmFnZU1nciB9IGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL01hbmFnZXIvU3RvcmFnZU1nclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9tVGFza0l0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGNvdW50OiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc3RhdGVMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBpY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfaXNSZWNlaXZkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9pc0NvbXBsZXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX2luZm86IERhaWx5VGFza0luZm8gPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LkRhaWx5VGFzay5VcGRhdGVUYXNrS2V5LCB0aGlzLl9vblVwZGF0ZVRhc2tLZXksIHRoaXMpXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5EYWlseVRhc2suVXBkYXRlVGFza0tleSwgdGhpcy5fb25VcGRhdGVUYXNrS2V5LCB0aGlzKVxuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KGluZm86IERhaWx5VGFza0luZm8sIGljb25GcmFtZTogY2MuU3ByaXRlRnJhbWUpIHtcbiAgICAgICAgdGhpcy5faW5mbyA9IGluZm87XG5cbiAgICAgICAgdGhpcy5pY29uLnNwcml0ZUZyYW1lID0gaWNvbkZyYW1lO1xuICAgICAgICB0aGlzLmljb24ubm9kZS5zY2FsZSA9IDYwIC8gdGhpcy5pY29uLm5vZGUuaGVpZ2h0O1xuICAgICAgICB0aGlzLmNvdW50LnN0cmluZyA9IGluZm8ucmV3YXJkc1swXS5jb3VudC50b1N0cmluZygpO1xuXG4gICAgICAgIHRoaXMuX2lzQ29tcGxldCA9IGluZm8uY29uZGl0aW9uID49IERhaWx5VGFza01nci5pbnMuZ2V0RGFpbHlUYXNrS2V5KCk7XG4gICAgICAgIGlmIChNLnJ1bnRpbWUuRGFpbHlUYXNrUHJvZ3Jlc3MucHJvZ3Jlc3MgJiYgTS5ydW50aW1lLkRhaWx5VGFza1Byb2dyZXNzLnByb2dyZXNzW3RoaXMuX2luZm8uaWRdID09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9pc1JlY2VpdmQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzQ29tcGxldCA9IChEYWlseVRhc2tNZ3IuaW5zLmdldERhaWx5VGFza0tleSgpID49IHRoaXMuX2luZm8uY29uZGl0aW9uKVxuICAgICAgICBpZiAodGhpcy5faXNDb21wbGV0KSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzUmVjZWl2ZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVMYWJlbC5zdHJpbmcgPSAn5bey6aKG5Y+WJ1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlTGFiZWwuc3RyaW5nID0gJ+W+hemihuWPlidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xpY2soKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0NvbXBsZXQgJiYgIXRoaXMuX2lzUmVjZWl2ZCkge1xuICAgICAgICAgICAgLy/poJjlj5bnjY7li7UhXG4gICAgICAgICAgICBNLnVpLnNob3dVSShVSUh1ZERlZi5PcGVuQm94LCB7IGNvbmZpZzogeyByZXdhcmRzOiB0aGlzLl9pbmZvLnJld2FyZHMgfSwgdGV4dDogJ+aMguacuuWlluWKsSEnLCBpc0hpZGVCb3g6IHRydWUgfSk7XG4gICAgICAgICAgICBEYWlseVRhc2tNZ3IuaW5zLnJlY2VpdmVPSyh0aGlzLl9pbmZvLmlkKTtcbiAgICAgICAgICAgIE0ucnVudGltZS5EYWlseVRhc2tQcm9ncmVzcy5wcm9ncmVzc1t0aGlzLl9pbmZvLmlkXSA9IC0xXG4gICAgICAgICAgICB0aGlzLl9pc1JlY2VpdmQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUxhYmVsLnN0cmluZyA9ICflt7Lpooblj5YnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9vblVwZGF0ZVRhc2tLZXkoY291bnQpIHtcbiAgICAgICAgaWYgKGNvdW50ID49IHRoaXMuX2luZm8uY29uZGl0aW9uICYmICF0aGlzLl9pc1JlY2VpdmQpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzQ29tcGxldCA9IHRydWU7XG4gICAgICAgICAgICAvL3Nob3cgY29tcGxldCBzdGF0ZVxuICAgICAgICAgICAgdGhpcy5zdGF0ZUxhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVMYWJlbC5zdHJpbmcgPSAn5b6F6aKG5Y+WJ1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=