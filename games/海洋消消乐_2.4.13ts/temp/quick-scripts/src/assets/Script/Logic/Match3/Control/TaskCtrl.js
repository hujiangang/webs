"use strict";
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