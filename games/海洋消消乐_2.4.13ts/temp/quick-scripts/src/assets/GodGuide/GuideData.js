"use strict";
cc._RF.push(module, '21f8dYXwHRCmbBr35l3Uehs', 'GuideData');
// GodGuide/GuideData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuideData = void 0;
var GuideData = /** @class */ (function () {
    function GuideData() {
    }
    Object.defineProperty(GuideData, "firstFailed", {
        get: function () {
            return this._firstFailed;
        },
        set: function (v) {
            this._firstFailed = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GuideData, "finishedTaskName", {
        get: function () {
            return this._finishedTaskName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GuideData, "markNoConditionTask", {
        get: function () {
            return this._markNoConditionTask;
        },
        enumerable: false,
        configurable: true
    });
    GuideData.pushNoConditionTask = function (filename) {
        if (this._markNoConditionTask.indexOf(filename) == -1) {
            this._markNoConditionTask.push(filename);
        }
        // console.error("标记条件不满足的task", this._markNoConditionTask);
    };
    GuideData.pushFinishedTask = function (filename) {
        if (this._finishedTaskName.indexOf(filename) == -1) {
            this._finishedTaskName.push(filename);
        }
        // console.error("标记删除的task", this._finishedTaskName);
    };
    GuideData.clearMarkTasks = function () {
        this._finishedTaskName = [];
        this._markNoConditionTask = [];
    };
    //11关之后首次失败
    GuideData._firstFailed = false;
    //任务已经完成的Task文件
    GuideData._finishedTaskName = [];
    //标记未完成且条件不满足的task
    GuideData._markNoConditionTask = [];
    return GuideData;
}());
exports.GuideData = GuideData;
window["GuideData"] = GuideData;

cc._RF.pop();