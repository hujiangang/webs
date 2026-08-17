"use strict";
cc._RF.push(module, '96ff4dC059N/KDA6vr6Zvry', '_Guide_level3_2');
// GodGuide/_Guide_level3_2.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideUtils_1 = require("./GuideUtils");
var MapIslandUtils_1 = require("../Script/Logic/SimulationOperation/View/Map/MapIslandUtils");
var MoneyManager_1 = require("../Script/Logic/Data/MoneyManager");
var GuideData_1 = require("./GuideData");
exports.task = {
    name: "关卡3 引导海岛解锁码头",
    debug: false,
    autorun: false,
    filename: "_Guide_level3_2",
    steps: [
        {
            guideId: 3031001,
            desc: "文字 ",
            onStart: function (next) {
                var result = MapIslandUtils_1.default.checkBuildFixed(16) || MapIslandUtils_1.default.checkBuildFinished(16);
                if (result) {
                    next(GuideUtils_1.EGuideStart.Stop); //如果16游艇以及解锁和修理 停止后面引导
                    GuideData_1.GuideData.pushFinishedTask("_Guide_level3_2");
                }
                else {
                    next(GuideUtils_1.EGuideStart.None);
                }
            },
            command: { cmd: "text", args: "接下来让我们来修理一下小码头吧~", role: 1, positionY: -500 },
            if: "checkNoDialogUI,checkAtMapScene",
            noCheckDone: true
        },
        {
            guideId: 3031002,
            desc: "指引修复小码头",
            onStart: function (next) {
                var result = MapIslandUtils_1.default.checkBuildFixed(16);
                if (result) {
                    next(GuideUtils_1.EGuideStart.Stop); //如果码头16以及解锁和修理 停止后面引导
                }
                else {
                    next(GuideUtils_1.EGuideStart.None);
                }
            },
            command: { cmd: "finger", args: "Map > Wharf > B16_xiaomatou > LockItem", type: "MapItem", maskType: 1 },
            if: "checkNoDialogUI,checkAtMapScene",
        },
        {
            guideId: 3031004,
            desc: "点击小码头的修理icon",
            command: { cmd: "finger", args: "BuildTool/unlock", type: "MapUI", maskType: 1 },
            if: "checkAtMapScene",
        },
        {
            guideId: 3031005,
            desc: "文字提示去游玩关卡",
            onStart: function (next) {
                var buildConfig = MapIslandUtils_1.default.getBuildConfigById(16);
                var moneyCheck = MoneyManager_1.MoneyManager.CheckMoneyJson(buildConfig.price[0], false, MoneyManager_1.MoneyTipsType.None);
                if (moneyCheck) {
                    next(GuideUtils_1.EGuideStart.Stop); //如果15游艇以及解锁和修理 停止后面引导
                }
                else {
                    next(GuideUtils_1.EGuideStart.None);
                }
            },
            command: { cmd: "text", args: "金币不太够啊，消除可以获得金币和星级，我们先去进行消除游戏吧！", role: 1, positionY: -500 },
        },
        {
            guideId: 3031006,
            desc: "点击开始游戏按钮",
            command: { cmd: 'finger', args: 'UIRoot:SelectShowTarget/btn_green' },
        },
    ]
};

cc._RF.pop();