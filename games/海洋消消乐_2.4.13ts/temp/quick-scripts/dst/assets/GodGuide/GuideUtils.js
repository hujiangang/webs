
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/GuideUtils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '478d24lRFJECpxw2IU0DYHA', 'GuideUtils');
// GodGuide/GuideUtils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuideUtils = exports.EGuideStart = void 0;
var LoadGuide_1 = require("./LoadGuide");
var StorageMgr_1 = require("../Script/Base/Manager/StorageMgr");
var ReportMgr_1 = require("../Script/Base/Manager/ReportMgr");
var DLogId_1 = require("../Script/Base/Utils/DLogId");
var GodGuide_1 = require("./GodGuide");
var GuideData_1 = require("./GuideData");
var M_1 = require("../Script/Base/Manager/M");
/** 引导 onStart条件判断状态 */
var EGuideStart;
(function (EGuideStart) {
    EGuideStart[EGuideStart["None"] = 0] = "None";
    EGuideStart[EGuideStart["ConditionNotReach"] = 1] = "ConditionNotReach";
    EGuideStart[EGuideStart["Stop"] = 2] = "Stop";
})(EGuideStart = exports.EGuideStart || (exports.EGuideStart = {}));
var GuideUtils = /** @class */ (function () {
    function GuideUtils() {
    }
    Object.defineProperty(GuideUtils, "godGuideNode", {
        //GodGuide的node
        get: function () {
            if (this._loadGuide && this._loadGuide._godGuide) {
                return this._loadGuide._godGuide.node;
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GuideUtils, "stopGuide", {
        get: function () {
            return this._stopGuide;
        },
        //手动停止引导
        set: function (stop) {
            this._stopGuide = stop;
            if (this.godGuideNode) {
                if (this.godGuideNode.hasEventListener(GodGuide_1.EGuideEvent.Stop)) {
                    this.godGuideNode.emit(GodGuide_1.EGuideEvent.Stop);
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    GuideUtils.initGuide = function (guidePrefab) {
        if (cc.find("GuideLayer") != null) {
            return;
        }
        return;
        this._doneGuideId = StorageMgr_1.StorageMgr.Storage.getObject(StorageMgr_1.StorageMgr.Storage.GuideIds) || {};
        var guideLayer = new cc.Node('GuideLayer');
        guideLayer.x = cc.winSize.width / 2;
        guideLayer.y = cc.winSize.height / 2;
        guideLayer.width = cc.winSize.width;
        guideLayer.height = cc.winSize.height;
        cc.game.addPersistRootNode(guideLayer);
        var loadGuide = guideLayer.addComponent(LoadGuide_1.default);
        loadGuide.parent = guideLayer;
        loadGuide.tasks = this.getGuideConfig();
        loadGuide.PREFAB = guidePrefab;
        loadGuide.init();
        GuideUtils.setLoadGuide(loadGuide);
    };
    GuideUtils.getGuideConfig = function () {
        return ["_Guide_level1", "_Guide_level3", /* "_Guide_level3_1", "_Guide_level3_2",*/ "_Guide_level4"];
    };
    GuideUtils.setLoadGuide = function (loadGuide) {
        this._loadGuide = loadGuide;
    };
    Object.defineProperty(GuideUtils, "curGuideId", {
        get: function () {
            return this._curGuideId;
        },
        set: function (id) {
            this._curGuideId = id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GuideUtils, "doneGuideId", {
        set: function (id) {
            this._doneGuideId[id] = 1;
            StorageMgr_1.StorageMgr.Storage.setObject(StorageMgr_1.StorageMgr.Storage.GuideIds, this._doneGuideId, true);
            GuideUtils.reportDLog(id);
        },
        enumerable: false,
        configurable: true
    });
    //检查这个指引是否完成
    GuideUtils.checkGuideDone = function (id) {
        // if (id == 303) return false;
        if (this._doneGuideId[id]) {
            return true;
        }
        return false;
    };
    GuideUtils.checkGuide = function () {
        if (this._loadGuide) {
            this._stopGuide = false;
            GuideUtils.logError("Guide checkGuide");
            this._loadGuide.runTask();
        }
    };
    //实施推入配置文件
    GuideUtils.pushGuide = function (taskName, forceRun) {
        if (forceRun === void 0) { forceRun = false; }
        if (this._loadGuide) {
            this._loadGuide.pushTask(taskName, forceRun);
        }
    };
    GuideUtils.logError = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        // Apps.isOpenGM && console.error(message, ...optionalParams);
    };
    //消除关卡开始
    GuideUtils.onMatch3Begin = function (level) {
        console.error("关卡开始", level);
        if (level == 11) {
            this.pushGuide("_Guide_level11");
        }
        else {
            if (GuideData_1.GuideData.firstFailed) {
                GuideUtils.pushGuide("_Guide_level11_1");
            }
        }
    };
    /*** 消除关卡结束
    * @param isWin 是否胜利
    */
    GuideUtils.onMatch3Over = function (level, isWin) {
        if (!isWin && level > 11) {
            if (!this.checkGuideDone(1100001)) {
                GuideData_1.GuideData.firstFailed = true;
            }
        }
    };
    //消除关卡结束点击下一关
    GuideUtils.onMatch3Next = function (level) {
        if (level == 10) {
            GuideUtils.pushGuide("_Guide_level10");
        }
        else if (level == 15) {
            GuideUtils.pushGuide("_Guide_level15_rank");
        }
        else if (level == 30) {
            GuideUtils.pushGuide("_Guide_level30");
        }
    };
    //打开关卡开始游戏界面
    GuideUtils.onMatch3SelectShowTarget = function (level) {
        if (!level)
            level = M_1.default.runtime.getMatch3Level();
        if (level == 21 && !GuideUtils.checkGuideDone(2101)) {
            GuideUtils.pushGuide("_Guide_level21");
        }
    };
    /** 判断游戏结束是否弹出下一关继续游戏 */
    GuideUtils.checkMatchNext = function () {
        var noNext = [1001, 1501, 3001]; //1001=引导领取10关宝箱 1501=引导去排行榜 3001=引导章节解锁
        if (noNext.indexOf(GuideUtils.curGuideId) != -1) {
            return false;
        }
        return true;
    };
    //上报引导
    GuideUtils.reportDLog = function (guidId) {
        var dlogStr = null;
        if (guidId == 2) {
            dlogStr = DLogId_1.DLogIdTutorial.lv1_click;
        }
        else if (guidId == 3) {
            dlogStr = DLogId_1.DLogIdTutorial.lv1_clickgame;
        }
        else if (guidId == 302) {
            dlogStr = DLogId_1.DLogIdTutorial.lv3_clickback;
        }
        else if (guidId == 303) {
            dlogStr = DLogId_1.DLogIdTutorial.lv3_clickbeach;
        }
        else if (guidId == 3030004) {
            dlogStr = DLogId_1.DLogIdTutorial.lv3_clickrepair1;
        }
        else if (guidId == 3030005) {
            dlogStr = DLogId_1.DLogIdTutorial.lv3_clickbuy1;
        }
        else if (guidId == 3030008) {
            dlogStr = DLogId_1.DLogIdTutorial.lv3_clickchoose1;
        }
        else if (guidId == 3031002) {
            dlogStr = DLogId_1.DLogIdTutorial.lv3_clickrepair2;
        }
        else if (guidId == 3031004) {
            dlogStr = DLogId_1.DLogIdTutorial.lv3_clickbuy2;
        }
        else if (guidId == 3031006) {
            dlogStr = DLogId_1.DLogIdTutorial.lv3_clickgame;
        }
        else if (guidId == 402) {
            dlogStr = DLogId_1.DLogIdTutorial.lv4_clickback;
        }
        else if (guidId == 403) {
            dlogStr = DLogId_1.DLogIdTutorial.lv4_clickbeach;
        }
        else if (guidId == 405) {
            dlogStr = DLogId_1.DLogIdTutorial.lv4_clickrepair2;
        }
        else if (guidId == 406) {
            dlogStr = DLogId_1.DLogIdTutorial.lv4_clickbuy2;
        }
        else if (guidId == 408) {
            dlogStr = DLogId_1.DLogIdTutorial.lv4_clickchoose2;
        }
        else {
            return;
        }
        // console.error(dlogStr);
        ReportMgr_1.default.ins.reportTutorial(dlogStr);
    };
    GuideUtils.test = function (index) {
        // UIMgr.ins.showUI(UIHudDef.PropDropView, { itemId: 100, num: 1 });
        // M.event.send(Event.UI.ChapterUnlock, { index: index, play: false });
        var async = require("async");
        var tasks = [1, 2, 3, 4, 5, 6];
        async.eachSeries(tasks, function (task, cb) {
            console.error(task);
            if (task == 2) {
                // tasks.splice(0, 1);
            }
            else {
                cb();
            }
        }, function (err) {
            console.error("run ", err);
        });
    };
    GuideUtils._loadGuide = null;
    /** 当前指引id */
    GuideUtils._curGuideId = -1;
    /** 已经完成的id */
    GuideUtils._doneGuideId = {};
    //手动停止引导
    GuideUtils._stopGuide = false;
    return GuideUtils;
}());
exports.GuideUtils = GuideUtils;
window["GuideUtils"] = GuideUtils;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXEd1aWRlVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQW9DO0FBQ3BDLGdFQUErRDtBQUMvRCw4REFBeUQ7QUFDekQsc0RBQTZEO0FBQzdELHVDQUF5QztBQUN6Qyx5Q0FBd0M7QUFHeEMsOENBQXlDO0FBSXpDLHVCQUF1QjtBQUN2QixJQUFZLFdBSVg7QUFKRCxXQUFZLFdBQVc7SUFDbkIsNkNBQVEsQ0FBQTtJQUNSLHVFQUFpQixDQUFBO0lBQ2pCLDZDQUFJLENBQUE7QUFDUixDQUFDLEVBSlcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFJdEI7QUFFRDtJQUFBO0lBbU5BLENBQUM7SUF4TUcsc0JBQWtCLDBCQUFZO1FBRDlCLGVBQWU7YUFDZjtZQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRTtnQkFDOUMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7YUFDekM7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDOzs7T0FBQTtJQUdELHNCQUFrQix1QkFBUzthQVMzQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDO1FBWkQsUUFBUTthQUNSLFVBQTRCLElBQUk7WUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNuQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsc0JBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDdEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsc0JBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDNUM7YUFDSjtRQUNMLENBQUM7OztPQUFBO0lBTWEsb0JBQVMsR0FBdkIsVUFBd0IsV0FBVztRQUMvQixJ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S0FBSztRQUNwQixvRUFBb0U7UUFFcEUsdUVBQXVFO1FBRXZFLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0IsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBQyxJQUFJLEVBQUUsRUFBRTtZQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BCLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRTtnQkFDWCxzQkFBc0I7YUFDekI7aUJBQU07Z0JBQ0gsRUFBRSxFQUFFLENBQUM7YUFDUjtRQUNMLENBQUMsRUFBRSxVQUFBLEdBQUc7WUFDRixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFqTmMscUJBQVUsR0FBYyxJQUFJLENBQUM7SUFDNUMsYUFBYTtJQUNFLHNCQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEMsY0FBYztJQUNDLHVCQUFZLEdBQUcsRUFBRSxDQUFDO0lBRWpDLFFBQVE7SUFDTyxxQkFBVSxHQUFZLEtBQUssQ0FBQztJQTJNL0MsaUJBQUM7Q0FuTkQsQUFtTkMsSUFBQTtBQW5OWSxnQ0FBVTtBQXFOdkIsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLFVBQVUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2FkR3VpZGUgZnJvbSBcIi4vTG9hZEd1aWRlXCI7XG5pbXBvcnQgeyBTdG9yYWdlTWdyIH0gZnJvbSBcIi4uL1NjcmlwdC9CYXNlL01hbmFnZXIvU3RvcmFnZU1nclwiO1xuaW1wb3J0IFJlcG9ydE1nciBmcm9tIFwiLi4vU2NyaXB0L0Jhc2UvTWFuYWdlci9SZXBvcnRNZ3JcIjtcbmltcG9ydCB7IERMb2dJZFR1dG9yaWFsIH0gZnJvbSBcIi4uL1NjcmlwdC9CYXNlL1V0aWxzL0RMb2dJZFwiO1xuaW1wb3J0IHsgRUd1aWRlRXZlbnQgfSBmcm9tIFwiLi9Hb2RHdWlkZVwiO1xuaW1wb3J0IHsgR3VpZGVEYXRhIH0gZnJvbSBcIi4vR3VpZGVEYXRhXCI7XG5pbXBvcnQgVUlNZ3IgZnJvbSBcIi4uL1NjcmlwdC9CYXNlL01hbmFnZXIvVUlNZ3JcIjtcbmltcG9ydCB7IFVJSHVkRGVmIH0gZnJvbSBcIi4uL1NjcmlwdC9Mb2dpYy9EYXRhL0ludGVyZmFjZS9VSURhdGFcIjtcbmltcG9ydCBNIGZyb20gXCIuLi9TY3JpcHQvQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uL1NjcmlwdC9Mb2dpYy9EYXRhL0NvbnN0L0V2ZW50XCI7XG5pbXBvcnQgQXBwcyBmcm9tIFwiLi4vU2NyaXB0L0Jhc2UvQXBwc1wiO1xuXG4vKiog5byV5a+8IG9uU3RhcnTmnaHku7bliKTmlq3nirbmgIEgKi9cbmV4cG9ydCBlbnVtIEVHdWlkZVN0YXJ0IHtcbiAgICBOb25lID0gMCxcbiAgICBDb25kaXRpb25Ob3RSZWFjaCwgIC8v5p2h5Lu25rKh5pyJ5ruh6LazXG4gICAgU3RvcCwgICAgICAgICAgICAgICAvL+S4reaWreacrOW8leWvvOWQjue7rSBcbn1cblxuZXhwb3J0IGNsYXNzIEd1aWRlVXRpbHMge1xuICAgIHByaXZhdGUgc3RhdGljIF9sb2FkR3VpZGU6IExvYWRHdWlkZSA9IG51bGw7XG4gICAgLyoqIOW9k+WJjeaMh+W8lWlkICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2N1ckd1aWRlSWQgPSAtMTtcbiAgICAvKiog5bey57uP5a6M5oiQ55qEaWQgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBfZG9uZUd1aWRlSWQgPSB7fTtcblxuICAgIC8v5omL5Yqo5YGc5q2i5byV5a+8XG4gICAgcHJpdmF0ZSBzdGF0aWMgX3N0b3BHdWlkZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLy9Hb2RHdWlkZeeahG5vZGVcbiAgICBwdWJsaWMgc3RhdGljIGdldCBnb2RHdWlkZU5vZGUoKTogY2MuTm9kZSB7XG4gICAgICAgIGlmICh0aGlzLl9sb2FkR3VpZGUgJiYgdGhpcy5fbG9hZEd1aWRlLl9nb2RHdWlkZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRHdWlkZS5fZ29kR3VpZGUubm9kZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvL+aJi+WKqOWBnOatouW8leWvvFxuICAgIHB1YmxpYyBzdGF0aWMgc2V0IHN0b3BHdWlkZShzdG9wKSB7XG4gICAgICAgIHRoaXMuX3N0b3BHdWlkZSA9IHN0b3A7XG4gICAgICAgIGlmICh0aGlzLmdvZEd1aWRlTm9kZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ29kR3VpZGVOb2RlLmhhc0V2ZW50TGlzdGVuZXIoRUd1aWRlRXZlbnQuU3RvcCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdvZEd1aWRlTm9kZS5lbWl0KEVHdWlkZUV2ZW50LlN0b3ApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgc3RvcEd1aWRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RvcEd1aWRlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdEd1aWRlKGd1aWRlUHJlZmFiKSB7XG4gICAgICAgIGlmIChjYy5maW5kKFwiR3VpZGVMYXllclwiKSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLl9kb25lR3VpZGVJZCA9IFN0b3JhZ2VNZ3IuU3RvcmFnZS5nZXRPYmplY3QoU3RvcmFnZU1nci5TdG9yYWdlLkd1aWRlSWRzKSB8fCB7fTtcbiAgICAgICAgdmFyIGd1aWRlTGF5ZXIgPSBuZXcgY2MuTm9kZSgnR3VpZGVMYXllcicpO1xuICAgICAgICBndWlkZUxheWVyLnggPSBjYy53aW5TaXplLndpZHRoIC8gMjtcbiAgICAgICAgZ3VpZGVMYXllci55ID0gY2Mud2luU2l6ZS5oZWlnaHQgLyAyO1xuICAgICAgICBndWlkZUxheWVyLndpZHRoID0gY2Mud2luU2l6ZS53aWR0aDtcbiAgICAgICAgZ3VpZGVMYXllci5oZWlnaHQgPSBjYy53aW5TaXplLmhlaWdodDtcbiAgICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUoZ3VpZGVMYXllcik7XG5cbiAgICAgICAgY29uc3QgbG9hZEd1aWRlID0gZ3VpZGVMYXllci5hZGRDb21wb25lbnQoTG9hZEd1aWRlKTtcbiAgICAgICAgbG9hZEd1aWRlLnBhcmVudCA9IGd1aWRlTGF5ZXI7XG4gICAgICAgIGxvYWRHdWlkZS50YXNrcyA9IHRoaXMuZ2V0R3VpZGVDb25maWcoKTtcbiAgICAgICAgbG9hZEd1aWRlLlBSRUZBQiA9IGd1aWRlUHJlZmFiO1xuICAgICAgICBsb2FkR3VpZGUuaW5pdCgpO1xuICAgICAgICBHdWlkZVV0aWxzLnNldExvYWRHdWlkZShsb2FkR3VpZGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0R3VpZGVDb25maWcoKSB7XG4gICAgICAgIHJldHVybiBbXCJfR3VpZGVfbGV2ZWwxXCIsIFwiX0d1aWRlX2xldmVsM1wiLC8qIFwiX0d1aWRlX2xldmVsM18xXCIsIFwiX0d1aWRlX2xldmVsM18yXCIsKi8gXCJfR3VpZGVfbGV2ZWw0XCJdO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2V0TG9hZEd1aWRlKGxvYWRHdWlkZTogTG9hZEd1aWRlKSB7XG4gICAgICAgIHRoaXMuX2xvYWRHdWlkZSA9IGxvYWRHdWlkZTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBzZXQgY3VyR3VpZGVJZChpZCkge1xuICAgICAgICB0aGlzLl9jdXJHdWlkZUlkID0gaWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgY3VyR3VpZGVJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1ckd1aWRlSWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzZXQgZG9uZUd1aWRlSWQoaWQpIHtcbiAgICAgICAgdGhpcy5fZG9uZUd1aWRlSWRbaWRdID0gMTtcbiAgICAgICAgU3RvcmFnZU1nci5TdG9yYWdlLnNldE9iamVjdChTdG9yYWdlTWdyLlN0b3JhZ2UuR3VpZGVJZHMsIHRoaXMuX2RvbmVHdWlkZUlkLCB0cnVlKTtcbiAgICAgICAgR3VpZGVVdGlscy5yZXBvcnRETG9nKGlkKTtcbiAgICB9XG5cbiAgICAvL+ajgOafpei/meS4quaMh+W8leaYr+WQpuWujOaIkFxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tHdWlkZURvbmUoaWQpIHtcbiAgICAgICAgLy8gaWYgKGlkID09IDMwMykgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5fZG9uZUd1aWRlSWRbaWRdKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjaGVja0d1aWRlKCkge1xuICAgICAgICBpZiAodGhpcy5fbG9hZEd1aWRlKSB7XG4gICAgICAgICAgICB0aGlzLl9zdG9wR3VpZGUgPSBmYWxzZTtcbiAgICAgICAgICAgIEd1aWRlVXRpbHMubG9nRXJyb3IoXCJHdWlkZSBjaGVja0d1aWRlXCIpO1xuICAgICAgICAgICAgdGhpcy5fbG9hZEd1aWRlLnJ1blRhc2soKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5a6e5pa95o6o5YWl6YWN572u5paH5Lu2XG4gICAgcHVibGljIHN0YXRpYyBwdXNoR3VpZGUodGFza05hbWUsIGZvcmNlUnVuOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuX2xvYWRHdWlkZSkge1xuICAgICAgICAgICAgdGhpcy5fbG9hZEd1aWRlLnB1c2hUYXNrKHRhc2tOYW1lLCBmb3JjZVJ1bik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGxvZ0Vycm9yKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSkge1xuICAgICAgICAvLyBBcHBzLmlzT3BlbkdNICYmIGNvbnNvbGUuZXJyb3IobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xuICAgIH1cblxuICAgIC8v5raI6Zmk5YWz5Y2h5byA5aeLXG4gICAgcHVibGljIHN0YXRpYyBvbk1hdGNoM0JlZ2luKGxldmVsOiBudW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIuWFs+WNoeW8gOWni1wiLCBsZXZlbCk7XG4gICAgICAgIGlmIChsZXZlbCA9PSAxMSkge1xuICAgICAgICAgICAgdGhpcy5wdXNoR3VpZGUoXCJfR3VpZGVfbGV2ZWwxMVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChHdWlkZURhdGEuZmlyc3RGYWlsZWQpIHtcbiAgICAgICAgICAgICAgICBHdWlkZVV0aWxzLnB1c2hHdWlkZShcIl9HdWlkZV9sZXZlbDExXzFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKioqIOa2iOmZpOWFs+WNoee7k+adnyBcbiAgICAqIEBwYXJhbSBpc1dpbiDmmK/lkKbog5zliKlcbiAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgb25NYXRjaDNPdmVyKGxldmVsOiBudW1iZXIsIGlzV2luOiBib29sZWFuKSB7XG4gICAgICAgIGlmICghaXNXaW4gJiYgbGV2ZWwgPiAxMSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrR3VpZGVEb25lKDExMDAwMDEpKSB7XG4gICAgICAgICAgICAgICAgR3VpZGVEYXRhLmZpcnN0RmFpbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5raI6Zmk5YWz5Y2h57uT5p2f54K55Ye75LiL5LiA5YWzXG4gICAgcHVibGljIHN0YXRpYyBvbk1hdGNoM05leHQobGV2ZWw6IG51bWJlcikge1xuICAgICAgICBpZiAobGV2ZWwgPT0gMTApIHtcbiAgICAgICAgICAgIEd1aWRlVXRpbHMucHVzaEd1aWRlKFwiX0d1aWRlX2xldmVsMTBcIik7XG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT0gMTUpIHtcbiAgICAgICAgICAgIEd1aWRlVXRpbHMucHVzaEd1aWRlKFwiX0d1aWRlX2xldmVsMTVfcmFua1wiKTtcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PSAzMCkge1xuICAgICAgICAgICAgR3VpZGVVdGlscy5wdXNoR3VpZGUoXCJfR3VpZGVfbGV2ZWwzMFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5omT5byA5YWz5Y2h5byA5aeL5ri45oiP55WM6Z2iXG4gICAgcHVibGljIHN0YXRpYyBvbk1hdGNoM1NlbGVjdFNob3dUYXJnZXQobGV2ZWw6IG51bWJlcikge1xuICAgICAgICBpZiAoIWxldmVsKSBsZXZlbCA9IE0ucnVudGltZS5nZXRNYXRjaDNMZXZlbCgpO1xuICAgICAgICBpZiAobGV2ZWwgPT0gMjEgJiYgIUd1aWRlVXRpbHMuY2hlY2tHdWlkZURvbmUoMjEwMSkpIHtcbiAgICAgICAgICAgIEd1aWRlVXRpbHMucHVzaEd1aWRlKFwiX0d1aWRlX2xldmVsMjFcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiog5Yik5pat5ri45oiP57uT5p2f5piv5ZCm5by55Ye65LiL5LiA5YWz57un57ut5ri45oiPICovXG4gICAgcHVibGljIHN0YXRpYyBjaGVja01hdGNoTmV4dCgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IG5vTmV4dCA9IFsxMDAxLCAxNTAxLCAzMDAxXTsgLy8xMDAxPeW8leWvvOmihuWPljEw5YWz5a6d566xIDE1MDE95byV5a+85Y675o6S6KGM5qacIDMwMDE95byV5a+856ug6IqC6Kej6ZSBXG4gICAgICAgIGlmIChub05leHQuaW5kZXhPZihHdWlkZVV0aWxzLmN1ckd1aWRlSWQpICE9IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy/kuIrmiqXlvJXlr7xcbiAgICBwdWJsaWMgc3RhdGljIHJlcG9ydERMb2coZ3VpZElkKSB7XG4gICAgICAgIGxldCBkbG9nU3RyID0gbnVsbDtcbiAgICAgICAgaWYgKGd1aWRJZCA9PSAyKSB7XG4gICAgICAgICAgICBkbG9nU3RyID0gRExvZ0lkVHV0b3JpYWwubHYxX2NsaWNrO1xuICAgICAgICB9IGVsc2UgaWYgKGd1aWRJZCA9PSAzKSB7XG4gICAgICAgICAgICBkbG9nU3RyID0gRExvZ0lkVHV0b3JpYWwubHYxX2NsaWNrZ2FtZTtcbiAgICAgICAgfSBlbHNlIGlmIChndWlkSWQgPT0gMzAyKSB7XG4gICAgICAgICAgICBkbG9nU3RyID0gRExvZ0lkVHV0b3JpYWwubHYzX2NsaWNrYmFjaztcbiAgICAgICAgfSBlbHNlIGlmIChndWlkSWQgPT0gMzAzKSB7XG4gICAgICAgICAgICBkbG9nU3RyID0gRExvZ0lkVHV0b3JpYWwubHYzX2NsaWNrYmVhY2g7XG4gICAgICAgIH0gZWxzZSBpZiAoZ3VpZElkID09IDMwMzAwMDQpIHtcbiAgICAgICAgICAgIGRsb2dTdHIgPSBETG9nSWRUdXRvcmlhbC5sdjNfY2xpY2tyZXBhaXIxO1xuICAgICAgICB9IGVsc2UgaWYgKGd1aWRJZCA9PSAzMDMwMDA1KSB7XG4gICAgICAgICAgICBkbG9nU3RyID0gRExvZ0lkVHV0b3JpYWwubHYzX2NsaWNrYnV5MTtcbiAgICAgICAgfSBlbHNlIGlmIChndWlkSWQgPT0gMzAzMDAwOCkge1xuICAgICAgICAgICAgZGxvZ1N0ciA9IERMb2dJZFR1dG9yaWFsLmx2M19jbGlja2Nob29zZTE7XG4gICAgICAgIH0gZWxzZSBpZiAoZ3VpZElkID09IDMwMzEwMDIpIHtcbiAgICAgICAgICAgIGRsb2dTdHIgPSBETG9nSWRUdXRvcmlhbC5sdjNfY2xpY2tyZXBhaXIyO1xuICAgICAgICB9IGVsc2UgaWYgKGd1aWRJZCA9PSAzMDMxMDA0KSB7XG4gICAgICAgICAgICBkbG9nU3RyID0gRExvZ0lkVHV0b3JpYWwubHYzX2NsaWNrYnV5MjtcbiAgICAgICAgfSBlbHNlIGlmIChndWlkSWQgPT0gMzAzMTAwNikge1xuICAgICAgICAgICAgZGxvZ1N0ciA9IERMb2dJZFR1dG9yaWFsLmx2M19jbGlja2dhbWU7XG4gICAgICAgIH0gZWxzZSBpZiAoZ3VpZElkID09IDQwMikge1xuICAgICAgICAgICAgZGxvZ1N0ciA9IERMb2dJZFR1dG9yaWFsLmx2NF9jbGlja2JhY2s7XG4gICAgICAgIH0gZWxzZSBpZiAoZ3VpZElkID09IDQwMykge1xuICAgICAgICAgICAgZGxvZ1N0ciA9IERMb2dJZFR1dG9yaWFsLmx2NF9jbGlja2JlYWNoO1xuICAgICAgICB9IGVsc2UgaWYgKGd1aWRJZCA9PSA0MDUpIHtcbiAgICAgICAgICAgIGRsb2dTdHIgPSBETG9nSWRUdXRvcmlhbC5sdjRfY2xpY2tyZXBhaXIyO1xuICAgICAgICB9IGVsc2UgaWYgKGd1aWRJZCA9PSA0MDYpIHtcbiAgICAgICAgICAgIGRsb2dTdHIgPSBETG9nSWRUdXRvcmlhbC5sdjRfY2xpY2tidXkyO1xuICAgICAgICB9IGVsc2UgaWYgKGd1aWRJZCA9PSA0MDgpIHtcbiAgICAgICAgICAgIGRsb2dTdHIgPSBETG9nSWRUdXRvcmlhbC5sdjRfY2xpY2tjaG9vc2UyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZGxvZ1N0cik7XG4gICAgICAgIFJlcG9ydE1nci5pbnMucmVwb3J0VHV0b3JpYWwoZGxvZ1N0cik7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyB0ZXN0KGluZGV4KSB7XG4gICAgICAgIC8vIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuUHJvcERyb3BWaWV3LCB7IGl0ZW1JZDogMTAwLCBudW06IDEgfSk7XG5cbiAgICAgICAgLy8gTS5ldmVudC5zZW5kKEV2ZW50LlVJLkNoYXB0ZXJVbmxvY2ssIHsgaW5kZXg6IGluZGV4LCBwbGF5OiBmYWxzZSB9KTtcblxuICAgICAgICBsZXQgYXN5bmMgPSByZXF1aXJlKFwiYXN5bmNcIik7XG4gICAgICAgIGxldCB0YXNrcyA9IFsxLCAyLCAzLCA0LCA1LCA2XTtcbiAgICAgICAgYXN5bmMuZWFjaFNlcmllcyh0YXNrcywgKHRhc2ssIGNiKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHRhc2spO1xuICAgICAgICAgICAgaWYgKHRhc2sgPT0gMikge1xuICAgICAgICAgICAgICAgIC8vIHRhc2tzLnNwbGljZSgwLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJydW4gXCIsIGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxud2luZG93W1wiR3VpZGVVdGlsc1wiXSA9IEd1aWRlVXRpbHM7Il19