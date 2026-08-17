
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/LoadGuide.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXExvYWRHdWlkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxxQ0FBb0M7QUFDcEMsMkNBQTBDO0FBQzFDLHlDQUF3QztBQUV4QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFdkIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7SUFBdUMsNkJBQVk7SUFBbkQ7UUFBQSxxRUErSEM7UUF4SEcsWUFBTSxHQUFjLElBQUksQ0FBQyxDQUFDLEtBQUs7UUFHL0IsWUFBTSxHQUFZLElBQUksQ0FBQyxDQUFFLGVBQWU7UUFHeEMsWUFBTSxHQUFHLENBQUMsQ0FBQztRQUdYLFdBQUssR0FBRyxFQUFFLENBQUE7UUEwR1YsaUJBQWlCO1FBQ1YsZUFBUyxHQUFHLENBQUMsZUFBZSxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUI7WUFDdEYsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLHFCQUFxQjtZQUM5RixnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDOztJQUU1QyxDQUFDO0lBM0dHLGFBQWE7SUFDYix3QkFBd0I7SUFDeEIsNkJBQTZCO0lBQzdCLFFBQVE7SUFDUixJQUFJO0lBRUosWUFBWTtJQUNaLHNCQUFzQjtJQUN0QixJQUFJO0lBR0osOEJBQVUsR0FBVjtRQUNJLElBQUk7WUFDQSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMs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QzVCLENBQUM7SUFqSEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2Q0FDSztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZDQUNLO0lBR3ZCO1FBREMsUUFBUSxFQUFFOzZDQUNBO0lBR1g7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7NENBQ1o7SUFoQk8sU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQStIN0I7SUFBRCxnQkFBQztDQS9IRCxBQStIQyxDQS9Ic0MsRUFBRSxDQUFDLFNBQVMsR0ErSGxEO2tCQS9Ib0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHb2RHdWlkZSBmcm9tIFwiLi9Hb2RHdWlkZVwiO1xuaW1wb3J0IHsgTG9jYXRvciB9IGZyb20gXCIuL0xvY2F0b3JcIjtcbmltcG9ydCB7IEd1aWRlVXRpbHMgfSBmcm9tIFwiLi9HdWlkZVV0aWxzXCI7XG5pbXBvcnQgeyBHdWlkZURhdGEgfSBmcm9tIFwiLi9HdWlkZURhdGFcIjtcblxubGV0IGFzeW5jID0gcmVxdWlyZSgnYXN5bmMnKTtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkR3VpZGUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgLy/mmL7npLrnmoTmlofmnKxcbiAgICBjYWxsYmFjazogYW55O1xuXG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIFBSRUZBQjogY2MuUHJlZmFiID0gbnVsbDsgLy/pooTliLbku7ZcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHBhcmVudDogY2MuTm9kZSA9IG51bGw7ICAvL+mihOWItuS7tuWunuS+i+WMluWQjuaJgOWcqOeahOeItuiKgueCuVxuXG4gICAgQHByb3BlcnR5KClcbiAgICB6SW5kZXggPSAwO1xuXG4gICAgQHByb3BlcnR5KFtjYy5TdHJpbmddKVxuICAgIHRhc2tzID0gW11cblxuICAgIF9nb2RHdWlkZTogR29kR3VpZGU7XG5cbiAgICAvLyBvbkxvYWQoKSB7XG4gICAgLy8gICAgIGlmICghQ0NfRURJVE9SKSB7XG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRQcmVmYWIoKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIC8vIHN0YXJ0KCkge1xuICAgIC8vICAgICB0aGlzLnJ1blRhc2soKTtcbiAgICAvLyB9XG5cblxuICAgIGxvYWRQcmVmYWIoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuUFJFRkFCKTtcbiAgICAgICAgICAgIG5vZGUuekluZGV4ID0gdGhpcy56SW5kZXg7XG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsIDApKTtcbiAgICAgICAgICAgIC8v5LiN5oyB5LmF5YyW5Yiw57yW6L6R5ZmoXG4gICAgICAgICAgICAvLyBub2RlLl9vYmpGbGFncyA9IGNjLk9iamVjdC5GbGFncy5Eb250U2F2ZTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5wYXJlbnQgfHwgdGhpcy5ub2RlO1xuICAgICAgICAgICAgdGhpcy5fZ29kR3VpZGUgPSBub2RlLmdldENvbXBvbmVudCgnR29kR3VpZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNjLmVycm9yKHRoaXMuUFJFRkFCKTtcbiAgICAgICAgICAgIGNjLmVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMubG9hZFByZWZhYigpO1xuICAgICAgICB0aGlzLnJ1blRhc2soKTtcbiAgICAgICAgTG9jYXRvci5pbml0KCk7XG4gICAgfVxuXG4gICAgcnVuVGFzaygpIHtcbiAgICAgICAgR3VpZGVVdGlscy5sb2dFcnJvcihcIkxvYWRHdWlkZSBydW5UYXNrXCIpO1xuICAgICAgICBhc3luYy5lYWNoU2VyaWVzKHRoaXMudGFza3MsICh0YXNrRmlsZSwgY2IpID0+IHtcbiAgICAgICAgICAgIEd1aWRlVXRpbHMubG9nRXJyb3IoJ3Rhc2tGaWxlLS0tLS0tLS0tLT4nLCB0YXNrRmlsZSlcbiAgICAgICAgICAgIGxldCB7IHRhc2sgfSA9IHJlcXVpcmUodGFza0ZpbGUpO1xuICAgICAgICAgICAgdGhpcy5fZ29kR3VpZGUuc2V0VGFzayh0YXNrKTtcbiAgICAgICAgICAgIHRoaXMuX2dvZEd1aWRlLnJ1bihjYik7XG4gICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICAgIC8vIGlmIChlcnIpIHtcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmVycm9yKCd0YXNrIGVyciA9ICcsIGVycik7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBHdWlkZVV0aWxzLmxvZ0Vycm9yKCfku7vliqHlhajpg6jlrozmiJAnKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tUYXNrRmlsZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2hlY2tUYXNrRmlsZSgpIHtcbiAgICAgICAgbGV0IGZpbmlzaGVkVGFzayA9IEd1aWRlRGF0YS5maW5pc2hlZFRhc2tOYW1lO1xuICAgICAgICBsZXQgbm9Db25kaXRpb25UYXNrID0gR3VpZGVEYXRhLm1hcmtOb0NvbmRpdGlvblRhc2s7XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCIgLS0tLS0tIFwiLCBmaW5pc2hlZFRhc2ssIG5vQ29uZGl0aW9uVGFzayk7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy50YXNrcy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgaWYgKGZpbmlzaGVkVGFzay5pbmRleE9mKHRoaXMudGFza3Nbal0pICE9IC0xICYmIG5vQ29uZGl0aW9uVGFzay5pbmRleE9mKHRoaXMudGFza3Nbal0pID09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrcy5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihcIuWIoOmZpOaWh+S7tlwiLCB0aGlzLnRhc2tzW2pdKTtcbiAgICAgICAgICAgICAgICBqID0gaiAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5lcnJvcihcIuW9k+WJjXRhc2vmlofku7ZcIiwgdGhpcy50YXNrcyk7XG4gICAgICAgIEd1aWRlRGF0YS5jbGVhck1hcmtUYXNrcygpO1xuICAgIH1cblxuICAgIC8v5a6e5pe25o6o5YWl5byV5a+85paH5Lu2XG4gICAgcHVibGljIHB1c2hUYXNrKHRhc2tOYW1lLCBmb3JjZVJ1bikge1xuICAgICAgICBpZiAoIXRhc2tOYW1lKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLnRhc2tzLmluZGV4T2YodGFza05hbWUpID09IC0xKSB7XG4gICAgICAgICAgICBsZXQgbmV3VGFzayA9IFtdO1xuICAgICAgICAgICAgbGV0IHRhc2tJbmRleCA9IHRoaXMudGFza0ZpbGVzLmluZGV4T2YodGFza05hbWUpO1xuICAgICAgICAgICAgaWYgKHRhc2tJbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmsqHmnInmt7vliqDphY3nva7mlofku7bliLBUYXNrRmlsZXPkuK1cIiwgdGFza05hbWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1Rhc2tbdGFza0luZGV4XSA9IHRhc2tOYW1lO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRhc2tzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGFza0luZGV4ID0gdGhpcy50YXNrRmlsZXMuaW5kZXhPZih0aGlzLnRhc2tzW2ldKTtcbiAgICAgICAgICAgICAgICBpZiAodGFza0luZGV4ID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmsqHmnInmt7vliqDphY3nva7mlofku7bliLBUYXNrRmlsZXPkuK1cIiwgdGhpcy50YXNrc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdUYXNrW3Rhc2tJbmRleF0gPSB0aGlzLnRhc2tzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBuZXdUYXNrLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1Rhc2tbal0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdUYXNrLnNwbGljZShqLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaiA9IGogLSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudGFza3MgPSBuZXdUYXNrO1xuICAgICAgICAgICAgdGhpcy5ydW5UYXNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3JjZVJ1biAmJiB0aGlzLnJ1blRhc2soKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmVycm9yKHRoaXMudGFza3MpO1xuICAgIH1cblxuICAgIC8v56e76Zmk5byV5a+85paH5Lu2IOWmguaenOacrOW8leWvvOWFqOmDqOaJp+ihjOWujOavlVxuICAgIHB1YmxpYyByZW1vdmVUYXNrKHRhc2tOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcih0YXNrTmFtZSk7XG4gICAgfVxuXG4gICAgLy/lvZPliY3miYDmnInnmoTmjIflvJXmlofku7Yg6aG65bqP5b6I6YeN6KaBXG4gICAgcHVibGljIHRhc2tGaWxlcyA9IFtcIl9HdWlkZV9sZXZlbDFcIiwgXCJfR3VpZGVfbGV2ZWwzXCIsIFwiX0d1aWRlX2xldmVsM18xXCIsIFwiX0d1aWRlX2xldmVsM18yXCIsXG4gICAgICAgIFwiX0d1aWRlX2xldmVsNFwiLCBcIl9HdWlkZV9sZXZlbDEwXCIsIFwiX0d1aWRlX2xldmVsMTFcIiwgXCJfR3VpZGVfbGV2ZWwxMV8xXCIsIFwiX0d1aWRlX2xldmVsMTVfcmFua1wiLFxuICAgICAgICBcIl9HdWlkZV9sZXZlbDIxXCIsIFwiX0d1aWRlX2xldmVsMzBcIl07XG5cbn1cbiJdfQ==