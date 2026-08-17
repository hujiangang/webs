"use strict";
cc._RF.push(module, 'ea46clZRZ5CV5m49ThgGmCR', 'LoadGuide');
// GodGuide/LoadGuide.ts

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
var Locator_1 = require("./Locator");
var GuideUtils_1 = require("./GuideUtils");
var GuideData_1 = require("./GuideData");
var async = require('async');
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoadGuide = /** @class */ (function (_super) {
    __extends(LoadGuide, _super);
    function LoadGuide() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.PREFAB = null; //预制件
        _this.parent = null; //预制件实例化后所在的父节点
        _this.zIndex = 0;
        _this.tasks = [];
        //当前所有的指引文件 顺序很重要
        _this.taskFiles = ["_Guide_level1", "_Guide_level3", "_Guide_level3_1", "_Guide_level3_2",
            "_Guide_level4", "_Guide_level10", "_Guide_level11", "_Guide_level11_1", "_Guide_level15_rank",
            "_Guide_level21", "_Guide_level30"];
        return _this;
    }
    // onLoad() {
    //     if (!CC_EDITOR) {
    //         this.loadPrefab();
    //     }
    // }
    // start() {
    //     this.runTask();
    // }
    LoadGuide.prototype.loadPrefab = function () {
        try {
            var node = cc.instantiate(this.PREFAB);
            node.zIndex = this.zIndex;
            node.setPosition(cc.v2(0, 0));
            //不持久化到编辑器
            // node._objFlags = cc.Object.Flags.DontSave;
            node.parent = this.parent || this.node;
            this._godGuide = node.getComponent('GodGuide');
        }
        catch (error) {
            cc.error(this.PREFAB);
            cc.error(error);
        }
    };
    LoadGuide.prototype.init = function () {
        this.loadPrefab();
        this.runTask();
        Locator_1.Locator.init();
    };
    LoadGuide.prototype.runTask = function () {
        var _this = this;
        GuideUtils_1.GuideUtils.logError("LoadGuide runTask");
        async.eachSeries(this.tasks, function (taskFile, cb) {
            GuideUtils_1.GuideUtils.logError('taskFile---------->', taskFile);
            var task = require(taskFile).task;
            _this._godGuide.setTask(task);
            _this._godGuide.run(cb);
        }, function (err) {
            // if (err) {
            //     console.error('task err = ', err);
            // }
            GuideUtils_1.GuideUtils.logError('任务全部完成');
            _this.checkTaskFile();
        });
    };
    LoadGuide.prototype.checkTaskFile = function () {
        var finishedTask = GuideData_1.GuideData.finishedTaskName;
        var noConditionTask = GuideData_1.GuideData.markNoConditionTask;
        // console.error(" ------ ", finishedTask, noConditionTask);
        for (var j = 0; j < this.tasks.length; ++j) {
            if (finishedTask.indexOf(this.tasks[j]) != -1 && noConditionTask.indexOf(this.tasks[j]) == -1) {
                this.tasks.splice(j, 1);
                // console.error("删除文件", this.tasks[j]);
                j = j - 1;
            }
        }
        // console.error("当前task文件", this.tasks);
        GuideData_1.GuideData.clearMarkTasks();
    };
    //实时推入引导文件
    LoadGuide.prototype.pushTask = function (taskName, forceRun) {
        if (!taskName)
            return;
        if (this.tasks.indexOf(taskName) == -1) {
            var newTask = [];
            var taskIndex = this.taskFiles.indexOf(taskName);
            if (taskIndex == -1) {
                console.error("没有添加配置文件到TaskFiles中", taskName);
                return;
            }
            newTask[taskIndex] = taskName;
            for (var i = 0; i < this.tasks.length; ++i) {
                taskIndex = this.taskFiles.indexOf(this.tasks[i]);
                if (taskIndex == -1) {
                    console.error("没有添加配置文件到TaskFiles中", this.tasks[i]);
                    break;
                }
                newTask[taskIndex] = this.tasks[i];
            }
            for (var j = 0; j < newTask.length; ++j) {
                if (newTask[j] == null) {
                    newTask.splice(j, 1);
                    j = j - 1;
                }
            }
            this.tasks = newTask;
            this.runTask();
        }
        else {
            forceRun && this.runTask();
        }
        // console.error(this.tasks);
    };
    //移除引导文件 如果本引导全部执行完毕
    LoadGuide.prototype.removeTask = function (taskName) {
        console.error(taskName);
    };
    __decorate([
        property(cc.Prefab)
    ], LoadGuide.prototype, "PREFAB", void 0);
    __decorate([
        property(cc.Node)
    ], LoadGuide.prototype, "parent", void 0);
    __decorate([
        property()
    ], LoadGuide.prototype, "zIndex", void 0);
    __decorate([
        property([cc.String])
    ], LoadGuide.prototype, "tasks", void 0);
    LoadGuide = __decorate([
        ccclass
    ], LoadGuide);
    return LoadGuide;
}(cc.Component));
exports.default = LoadGuide;

cc._RF.pop();