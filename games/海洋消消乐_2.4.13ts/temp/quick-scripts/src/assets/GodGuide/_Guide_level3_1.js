"use strict";
cc._RF.push(module, '781acgeGq9DupGyX7A1TVUk', '_Guide_level3_1');
// GodGuide/_Guide_level3_1.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideUtils_1 = require("./GuideUtils");
var EventMgr_1 = require("../Script/Base/Manager/EventMgr");
var Event_1 = require("../Script/Logic/Data/Const/Event");
var MapIslandUtils_1 = require("../Script/Logic/SimulationOperation/View/Map/MapIslandUtils");
var MoneyManager_1 = require("../Script/Logic/Data/MoneyManager");
var GuideData_1 = require("./GuideData");
exports.task = {
    name: "关卡3 引导海岛解锁游艇",
    debug: false,
    autorun: false,
    filename: "_Guide_level3_1",
    steps: [
        {
            guideId: 3030002,
            desc: "显示对话",
            onStart: function (next) {
                if (!MapIslandUtils_1.default.mapLoadFinished) {
                    next(GuideUtils_1.EGuideStart.Stop);
                    return;
                }
                var result = MapIslandUtils_1.default.checkBuildFixed(15) && MapIslandUtils_1.default.checkBuildFinished(15);
                if (result) {
                    GuideData_1.GuideData.pushFinishedTask("_Guide_level3_1");
                    next(GuideUtils_1.EGuideStart.Stop); //如果15游艇以及解锁和修理 停止后面引导
                    return;
                }
                next(GuideUtils_1.EGuideStart.None);
            },
            command: { cmd: "text", args: "天哪，小岛竟然变成这个样子了，我一定要将它还原成过去的样子！你能帮帮我么？", role: 1, positionY: -500 },
            delayTime: 1,
            if: "checkAtMapScene",
            noCheckDone: true,
        },
        {
            guideId: 3030003,
            desc: "显示对话",
            command: { cmd: "text", args: "首先，让我们先点击修复按钮，这艘船看起来能很快修好。", role: 1, positionY: -500 },
            if: "checkAtMapScene",
            noCheckDone: true,
        },
        {
            guideId: 3030004,
            desc: "指引船只的点击修理icon",
            onStart: function (next) {
                EventMgr_1.default.ins.send(Event_1.Event.Map.MapTouchMoveEnable, false);
                next(GuideUtils_1.EGuideStart.None);
            },
            command: { cmd: "finger", args: "Map > Wharf > B15_boat > LockItem", type: "MapItem", maskType: 1 },
            if: "checkAtMapScene",
            noCheckDone: true,
        },
        {
            guideId: 3030005,
            onStart: function (next) {
                var result = MapIslandUtils_1.default.checkBuildFixed(15);
                if (result) {
                    next(GuideUtils_1.EGuideStart.ConditionNotReach);
                }
                else {
                    var buildConfig = MapIslandUtils_1.default.getBuildConfigById(15);
                    var moneyCheck = MoneyManager_1.MoneyManager.CheckMoneyJson(buildConfig.price[0], false, MoneyManager_1.MoneyTipsType.None);
                    if (!moneyCheck) {
                        next(GuideUtils_1.EGuideStart.Stop);
                        return;
                    }
                    next(GuideUtils_1.EGuideStart.None);
                }
            },
            desc: "点击船只的修理icon",
            command: { cmd: "finger", args: "BuildTool/unlock", type: "MapUI", maskType: 1 },
            if: "checkAtMapScene",
            noCheckDone: true,
        },
        {
            guideId: 3030006,
            desc: "文字显示",
            onStart: function (next) {
                var result = MapIslandUtils_1.default.checkBuildFinished(15);
                if (result) {
                    next(GuideUtils_1.EGuideStart.Stop);
                }
                else {
                    next(GuideUtils_1.EGuideStart.None);
                }
            },
            command: { cmd: "text", args: "竟然有2种样式可以选择，选一种进行装扮吧！记得点击右边的'√'保存你的选择哟~", role: 1, positionY: -500 },
            if: "checkAtMapScene",
            noCheckDone: true,
        },
        {
            guideId: 3030007,
            desc: "点击船只icon的两个",
            // command: { cmd: "finger", args: "BuildTool/exchange/content/GuideNode", type: "MapUI", hideFinger: true },
            command: { cmd: "finger", args: "BuildTool/exchange/content", type: "MapUI", hideFinger: true, maskType: 1 },
            if: "checkAtMapScene",
            noCheckDone: true,
        },
        {
            guideId: 3030008,
            desc: "点击船只icon的确定按钮",
            command: { cmd: "finger", args: "BuildTool/exchange/btn_confirm", type: "MapUI" },
            if: "checkAtMapScene",
            noCheckDone: true
        }
    ]
};

cc._RF.pop();