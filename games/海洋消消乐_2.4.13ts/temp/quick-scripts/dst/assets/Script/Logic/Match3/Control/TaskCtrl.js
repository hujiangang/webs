
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Control/TaskCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '60bfdzf/1ZHf4oj5fg6k40v', 'TaskCtrl');
// Script/Logic/Match3/Control/TaskCtrl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var M_1 = require("../../../Base/Manager/M");
var Event_1 = require("../../Data/Const/Event");
var TimeConfig_1 = require("../../Data/Const/TimeConfig");
var GameTaskModel_1 = require("../Model/GameTaskModel");
var DataPool_1 = require("../../../Base/DataPool");
var TaskCtrl = /** @class */ (function () {
    function TaskCtrl() {
        this.gameTaskPool = null;
        this.taskNodePool = null;
        this.gameTaskPool = new Array();
        this.taskNodePool = new DataPool_1.DataPool(30, GameTaskModel_1.GameTaskModel, true);
    }
    TaskCtrl.prototype.pushAddNewTask = function (cell, createType) {
        var task = this._getTaskNode(); //new GameTaskModel();
        task.model1 = cell;
        task.extData = createType;
        task.action = Event_1.Event.GameCMD.AddNewCell;
        M_1.default.event.send(Event_1.Event.GameCMD.MainCMD, task);
    };
    /**发送消除到界面 */
    TaskCtrl.prototype.pushElimateTask = function (tm, closeAry, size, type, extInfo, keepTime) {
        var task = this._getTaskNode(); //new GameTaskModel();
        task.action = Event_1.Event.GameCMD.Elimate;
        task.model1 = tm;
        task.closeAry = closeAry;
        task.size = size;
        task.keepTime = keepTime || 0.2;
        task.type = type;
        task.extData = extInfo;
        // if (M.runtime.GameState != GameState.End) {
        this.gameTaskPool.push(task);
        // }
        // return task;
    };
    TaskCtrl.prototype.pushExchangeTask = function (model1, targetPos1, model2, targetPos2) {
        var task = this._getTaskNode(); //new GameTaskModel();
        task.action = Event_1.Event.GameCMD.Exchange;
        task.cp1 = targetPos1;
        task.model1 = model1;
        task.cp2 = targetPos2;
        task.model2 = model2;
        task.keepTime = TimeConfig_1.GapTime.ExchangeTime;
        this.gameTaskPool.push(task);
    };
    TaskCtrl.prototype.pushTisTask = function (model1, closeAry, mulPos) {
        var task = this._getTaskNode(); //new GameTaskModel();
        task.action = Event_1.Event.GameCMD.PromptCanElimate;
        task.model1 = model1;
        task.cp1 = mulPos;
        task.closeAry = closeAry;
        task.keepTime = 0.15;
        this.gameTaskPool.push(task);
        return task;
    };
    TaskCtrl.prototype.freeTask = function (task) {
        this.taskNodePool.freeData(task);
    };
    /**执行隔帧任务! */
    TaskCtrl.prototype.execGameTask = function () {
        // requestAnimationFrame(() => {
        if (this.gameTaskPool && this.gameTaskPool.length > 0) {
            var task = this.gameTaskPool.shift();
            M_1.default.event.send(Event_1.Event.GameCMD.MainCMD, task);
        }
        // })
    };
    TaskCtrl.prototype._getTaskNode = function () {
        var node = this.taskNodePool.getData();
        node.init();
        return node;
    };
    /**执行隔帧任务! */
    TaskCtrl.prototype.execViewTask = function () {
    };
    TaskCtrl.prototype.update = function (dt) {
        this.execGameTask();
        this.execViewTask();
    };
    return TaskCtrl;
}());
exports.default = TaskCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxDb250cm9sXFxUYXNrQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZDQUF3QztBQUN4QyxnREFBK0M7QUFFL0MsMERBQXNEO0FBQ3RELHdEQUF1RDtBQUV2RCxtREFBa0Q7QUFHbEQ7SUFLSTtRQUhPLGlCQUFZLEdBQXlCLElBQUksQ0FBQztRQUMxQyxpQkFBWSxHQUE0QixJQUFJLENBQUM7UUFHaEQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxtQkFBUSxDQUFDLEVBQUUsRUFBRSw2QkFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFTSxpQ0FBYyxHQUFyQixVQUFzQixJQUFlLEVBQUUsVUFBa0I7UUFFckQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUEsc0JBQXNCO1FBQ3ZELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDdkMsV0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELGFBQWE7SUFDTixrQ0FBZSxHQUF0QixVQUF1QixFQUFhLEVBQUUsUUFBd0IsRUFBRSxJQUFZLEVBQUUsSUFBaUIsRUFBRSxPQUFlLEVBQUUsUUFBZ0I7UUFDOUgsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUEsc0JBQXNCO1FBQ3ZELElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBSyxDQUFDLE9BQU8sQ0FBQyxPQUFP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QSxBQXFGQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCB7IENlbGxNb2RlbCB9IGZyb20gXCIuLi9Nb2RlbC9DZWxsTW9kZWxcIjtcbmltcG9ydCB7IEdhcFRpbWUgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9UaW1lQ29uZmlnXCI7XG5pbXBvcnQgeyBHYW1lVGFza01vZGVsIH0gZnJvbSBcIi4uL01vZGVsL0dhbWVUYXNrTW9kZWxcIjtcbmltcG9ydCB7IEVsaW1hdGVUeXBlLCBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IHsgRGF0YVBvb2wgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9EYXRhUG9vbFwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2tDdHJsIHtcblxuICAgIHB1YmxpYyBnYW1lVGFza1Bvb2w6IEFycmF5PEdhbWVUYXNrTW9kZWw+ID0gbnVsbDtcbiAgICBwdWJsaWMgdGFza05vZGVQb29sOiBEYXRhUG9vbDxHYW1lVGFza01vZGVsPiA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5nYW1lVGFza1Bvb2wgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdGhpcy50YXNrTm9kZVBvb2wgPSBuZXcgRGF0YVBvb2woMzAsIEdhbWVUYXNrTW9kZWwsIHRydWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwdXNoQWRkTmV3VGFzayhjZWxsOiBDZWxsTW9kZWwsIGNyZWF0ZVR5cGU6IG51bWJlcikge1xuXG4gICAgICAgIGNvbnN0IHRhc2sgPSB0aGlzLl9nZXRUYXNrTm9kZSgpOy8vbmV3IEdhbWVUYXNrTW9kZWwoKTtcbiAgICAgICAgdGFzay5tb2RlbDEgPSBjZWxsO1xuICAgICAgICB0YXNrLmV4dERhdGEgPSBjcmVhdGVUeXBlO1xuICAgICAgICB0YXNrLmFjdGlvbiA9IEV2ZW50LkdhbWVDTUQuQWRkTmV3Q2VsbDtcbiAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LkdhbWVDTUQuTWFpbkNNRCwgdGFzayk7XG4gICAgfVxuXG4gICAgLyoq5Y+R6YCB5raI6Zmk5Yiw55WM6Z2iICovXG4gICAgcHVibGljIHB1c2hFbGltYXRlVGFzayh0bTogQ2VsbE1vZGVsLCBjbG9zZUFyeTogU2V0PENlbGxNb2RlbD4sIHNpemU6IG51bWJlciwgdHlwZTogRWxpbWF0ZVR5cGUsIGV4dEluZm86IG51bWJlciwga2VlcFRpbWU6IG51bWJlcikge1xuICAgICAgICBjb25zdCB0YXNrID0gdGhpcy5fZ2V0VGFza05vZGUoKTsvL25ldyBHYW1lVGFza01vZGVsKCk7XG4gICAgICAgIHRhc2suYWN0aW9uID0gRXZlbnQuR2FtZUNNRC5FbGltYXRlO1xuICAgICAgICB0YXNrLm1vZGVsMSA9IHRtO1xuICAgICAgICB0YXNrLmNsb3NlQXJ5ID0gY2xvc2VBcnk7XG4gICAgICAgIHRhc2suc2l6ZSA9IHNpemU7XG4gICAgICAgIHRhc2sua2VlcFRpbWUgPSBrZWVwVGltZSB8fCAwLjI7XG4gICAgICAgIHRhc2sudHlwZSA9IHR5cGU7XG4gICAgICAgIHRhc2suZXh0RGF0YSA9IGV4dEluZm87XG4gICAgICAgIC8vIGlmIChNLnJ1bnRpbWUuR2FtZVN0YXRlICE9IEdhbWVTdGF0ZS5FbmQpIHtcbiAgICAgICAgdGhpcy5nYW1lVGFza1Bvb2wucHVzaCh0YXNrKTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyByZXR1cm4gdGFzaztcbiAgICB9XG5cbiAgICBwdWJsaWMgcHVzaEV4Y2hhbmdlVGFzayhtb2RlbDE6IENlbGxNb2RlbCwgdGFyZ2V0UG9zMTogY2MuVmVjMiwgbW9kZWwyOiBDZWxsTW9kZWwsIHRhcmdldFBvczI6IGNjLlZlYzIpIHtcbiAgICAgICAgY29uc3QgdGFzayA9IHRoaXMuX2dldFRhc2tOb2RlKCk7Ly9uZXcgR2FtZVRhc2tNb2RlbCgpO1xuICAgICAgICB0YXNrLmFjdGlvbiA9IEV2ZW50LkdhbWVDTUQuRXhjaGFuZ2U7XG4gICAgICAgIHRhc2suY3AxID0gdGFyZ2V0UG9zMTsgdGFzay5tb2RlbDEgPSBtb2RlbDE7XG4gICAgICAgIHRhc2suY3AyID0gdGFyZ2V0UG9zMjsgdGFzay5tb2RlbDIgPSBtb2RlbDI7XG4gICAgICAgIHRhc2sua2VlcFRpbWUgPSBHYXBUaW1lLkV4Y2hhbmdlVGltZTtcbiAgICAgICAgdGhpcy5nYW1lVGFza1Bvb2wucHVzaCh0YXNrKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHVzaFRpc1Rhc2sobW9kZWwxOiBDZWxsTW9kZWwsIGNsb3NlQXJ5OiBTZXQ8Q2VsbE1vZGVsPiwgbXVsUG9zOiBjYy5WZWMyKTogR2FtZVRhc2tNb2RlbCB7XG4gICAgICAgIGNvbnN0IHRhc2sgPSB0aGlzLl9nZXRUYXNrTm9kZSgpOy8vbmV3IEdhbWVUYXNrTW9kZWwoKTtcbiAgICAgICAgdGFzay5hY3Rpb24gPSBFdmVudC5HYW1lQ01ELlByb21wdENhbkVsaW1hdGU7XG4gICAgICAgIHRhc2subW9kZWwxID0gbW9kZWwxO1xuICAgICAgICB0YXNrLmNwMSA9IG11bFBvcztcbiAgICAgICAgdGFzay5jbG9zZUFyeSA9IGNsb3NlQXJ5O1xuICAgICAgICB0YXNrLmtlZXBUaW1lID0gMC4xNTtcbiAgICAgICAgdGhpcy5nYW1lVGFza1Bvb2wucHVzaCh0YXNrKTtcbiAgICAgICAgcmV0dXJuIHRhc2s7XG4gICAgfVxuXG4gICAgcHVibGljIGZyZWVUYXNrKHRhc2s6IEdhbWVUYXNrTW9kZWwpIHtcbiAgICAgICAgdGhpcy50YXNrTm9kZVBvb2wuZnJlZURhdGEodGFzayk7XG4gICAgfVxuXG4gICAgLyoq5omn6KGM6ZqU5bin5Lu75YqhISAqL1xuICAgIHByaXZhdGUgZXhlY0dhbWVUYXNrKCkge1xuICAgICAgICAvLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5nYW1lVGFza1Bvb2wgJiYgdGhpcy5nYW1lVGFza1Bvb2wubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgdGFzayA9IHRoaXMuZ2FtZVRhc2tQb29sLnNoaWZ0KCk7XG4gICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuR2FtZUNNRC5NYWluQ01ELCB0YXNrKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFRhc2tOb2RlKCkge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy50YXNrTm9kZVBvb2wuZ2V0RGF0YSgpO1xuICAgICAgICBub2RlLmluaXQoKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgLyoq5omn6KGM6ZqU5bin5Lu75YqhISAqL1xuICAgIHByaXZhdGUgZXhlY1ZpZXdUYXNrKCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZShkdCkge1xuICAgICAgICB0aGlzLmV4ZWNHYW1lVGFzaygpO1xuICAgICAgICB0aGlzLmV4ZWNWaWV3VGFzaygpO1xuICAgIH1cblxufSJdfQ==