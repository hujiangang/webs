"use strict";
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