
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/GuideData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXEd1aWRlRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO0lBOENBLENBQUM7SUFyQ0csc0JBQWtCLHdCQUFXO2FBSTdCO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7YUFORCxVQUE4QixDQUFVO1lBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBTUQsc0JBQWtCLDZCQUFnQjthQUFsQztZQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ2xDLENBQUM7OztPQUFBO0lBRUQsc0JBQWtCLGdDQUFtQjthQUFyQztZQUNJLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBQ3JDLENBQUM7OztPQUFBO0lBRWEsNkJBQW1CLEdBQWpDLFVBQWtDLFFBQWdCO1FBQzlDLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNuRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsNERBQTREO0lBRWhFLENBQUM7SUFFYSwwQkFBZ0IsR0FBOUIsVUFBK0IsUUFBZ0I7UUFDM0MsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ2hELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDekM7UUFDRCxzREFBc0Q7SUFDMUQsQ0FBQztJQUVhLHdCQUFjLEdBQTVCO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUExQ0QsV0FBVztJQUNJLHNCQUFZLEdBQVksS0FBSyxDQUFDO0lBRTdDLGVBQWU7SUFDQSwyQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDdEMsa0JBQWtCO0lBQ0gsOEJBQW9CLEdBQUcsRUFBRSxDQUFDO0lBdUM3QyxnQkFBQztDQTlDRCxBQThDQyxJQUFBO0FBOUNZLDhCQUFTO0FBK0N0QixNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsU0FBUyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEd1aWRlRGF0YSB7XG4gICAgLy8xMeWFs+S5i+WQjummluasoeWksei0pVxuICAgIHByaXZhdGUgc3RhdGljIF9maXJzdEZhaWxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy/ku7vliqHlt7Lnu4/lrozmiJDnmoRUYXNr5paH5Lu2XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2ZpbmlzaGVkVGFza05hbWUgPSBbXTtcbiAgICAvL+agh+iusOacquWujOaIkOS4lOadoeS7tuS4jea7oei2s+eahHRhc2tcbiAgICBwcml2YXRlIHN0YXRpYyBfbWFya05vQ29uZGl0aW9uVGFzayA9IFtdO1xuXG4gICAgcHVibGljIHN0YXRpYyBzZXQgZmlyc3RGYWlsZWQodjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9maXJzdEZhaWxlZCA9IHY7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgZmlyc3RGYWlsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXJzdEZhaWxlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBmaW5pc2hlZFRhc2tOYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmluaXNoZWRUYXNrTmFtZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBtYXJrTm9Db25kaXRpb25UYXNrKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFya05vQ29uZGl0aW9uVGFzaztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHB1c2hOb0NvbmRpdGlvblRhc2soZmlsZW5hbWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5fbWFya05vQ29uZGl0aW9uVGFzay5pbmRleE9mKGZpbGVuYW1lKSA9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fbWFya05vQ29uZGl0aW9uVGFzay5wdXNoKGZpbGVuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwi5qCH6K6w5p2h5Lu25LiN5ruh6Laz55qEdGFza1wiLCB0aGlzLl9tYXJrTm9Db25kaXRpb25UYXNrKTtcblxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcHVzaEZpbmlzaGVkVGFzayhmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLl9maW5pc2hlZFRhc2tOYW1lLmluZGV4T2YoZmlsZW5hbWUpID09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9maW5pc2hlZFRhc2tOYW1lLnB1c2goZmlsZW5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCLmoIforrDliKDpmaTnmoR0YXNrXCIsIHRoaXMuX2ZpbmlzaGVkVGFza05hbWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgY2xlYXJNYXJrVGFza3MoKSB7XG4gICAgICAgIHRoaXMuX2ZpbmlzaGVkVGFza05hbWUgPSBbXTtcbiAgICAgICAgdGhpcy5fbWFya05vQ29uZGl0aW9uVGFzayA9IFtdO1xuICAgIH1cblxuXG59XG53aW5kb3dbXCJHdWlkZURhdGFcIl0gPSBHdWlkZURhdGE7Il19