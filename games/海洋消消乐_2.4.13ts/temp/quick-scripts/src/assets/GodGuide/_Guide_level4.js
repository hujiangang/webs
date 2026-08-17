"use strict";
cc._RF.push(module, '12ae3DBMSBEwbBqxddK5KZH', '_Guide_level4');
// GodGuide/_Guide_level4.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideCondition_1 = require("./GuideCondition");
var GuideUtils_1 = require("./GuideUtils");
var MapIslandUtils_1 = require("../Script/Logic/SimulationOperation/View/Map/MapIslandUtils");
var MoneyManager_1 = require("../Script/Logic/Data/MoneyManager");
var UIMgr_1 = require("../Script/Base/Manager/UIMgr");
var UIData_1 = require("../Script/Logic/Data/Interface/UIData");
var GuideData_1 = require("./GuideData");
exports.task = {
    name: "关卡4 游戏结束 引导会继续引导海岛",
    debug: false,
    autorun: false,
    filename: "_Guide_level4",
    steps: [
        {
            guideId: 401,
            onStart: function (next) {
                if (!GuideCondition_1.GuideCondition.checkLevelFinished(4)) {
                    next(GuideUtils_1.EGuideStart.Stop);
                    return;
                }
                var result = !MapIslandUtils_1.default.checkBuildFixed(15);
                if (result) {
                    next(GuideUtils_1.EGuideStart.Stop);
                    return;
                }
                result = MapIslandUtils_1.default.checkBuildFixed(16) && MapIslandUtils_1.default.checkBuildFinished(16);
                if (result) {
                    next(GuideUtils_1.EGuideStart.Stop);
                    return;
                }
                result = GuideCondition_1.GuideCondition.checkLevel(4) && GuideCondition_1.GuideCondition.checkUIOpen("GameWin");
                if (!result) {
                    next(GuideUtils_1.EGuideStart.ConditionNotReach);
                    return;
                }
                next(GuideUtils_1.EGuideStart.None);
            },
            desc: "第四关通关引导关闭",
            command: { cmd: "text", args: "哇，这么快就通关了！让我们再去海岛上逛逛吧~", role: 1, positionY: -500 },
            if: "checkAtMatch3Scene,checkUIOpen",
            delayTime: 1,
            param: "GameWin",
        },
        {
            guideId: 402,
            onStart: function (next) {
                var result = GuideCondition_1.GuideCondition.checkLevel(4) && GuideCondition_1.GuideCondition.checkUIOpen("GameWin");
                ;
                if (!result) {
                    next(GuideUtils_1.EGuideStart.ConditionNotReach);
                    return;
                }
                if (GuideCondition_1.GuideCondition.checkUIOpen("SelectShowTarget")) {
                    UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.SelectShowTarget);
                }
                next(GuideUtils_1.EGuideStart.None);
            },
            desc: "关闭箭头",
            command: { cmd: "finger", args: "UIRoot:GameWin/btn_back" },
            // delayTime: 1,
            if: "checkUIOpen",
            param: "GameWin",
        },
        {
            guideId: 403,
            desc: "点击去海岛按钮",
            onStart: function (next) {
                if (GuideCondition_1.GuideCondition.checkUIOpen("SelectShowTarget")) {
                    UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.SelectShowTarget);
                }
                next(GuideUtils_1.EGuideStart.None);
            },
            command: { cmd: 'finger', args: 'UI > Bottom > goMapBtn' },
            if: "checkAtLevelScene",
            delayTime: 1,
        },
        {
            guideId: 404,
            onStart: function (next) {
                if (GuideCondition_1.GuideCondition.checkUIOpen("BuildSuccess")) {
                    next(GuideUtils_1.EGuideStart.Stop);
                    return;
                }
                if (!MapIslandUtils_1.default.mapLoadFinished) {
                    next(GuideUtils_1.EGuideStart.Stop);
                    return;
                }
                var result = MapIslandUtils_1.default.checkBuildFixed(16) && MapIslandUtils_1.default.checkBuildFinished(16);
                if (result) {
                    GuideData_1.GuideData.pushFinishedTask("_Guide_level4");
                    next(GuideUtils_1.EGuideStart.Stop);
                }
                else {
                    next(GuideUtils_1.EGuideStart.None);
                }
            },
            desc: "文字 ",
            command: { cmd: "text", args: "再来修复一次吧，这次我们有足够的金币了~", role: 1, positionY: -500 },
            if: "checkAtMapScene",
            delayTime: 1,
            noCheckDone: true,
        },
        {
            guideId: 405,
            desc: "指引修复小码头",
            onStart: function (next) {
                var result = MapIslandUtils_1.default.checkBuildFixed(16) && MapIslandUtils_1.default.checkBuildFinished(16);
                if (result) {
                    next(GuideUtils_1.EGuideStart.Stop);
                }
                else {
                    next(GuideUtils_1.EGuideStart.None);
                }
            },
            command: { cmd: "finger", args: "Map > Wharf > B16_xiaomatou > LockItem", type: "MapItem", maskType: 1 },
            if: "checkNoDialogUI,checkAtMapScene",
            // delayTime: 1,
            noCheckDone: true,
        },
        {
            guideId: 406,
            desc: "指引修理小码头",
            onStart: function (next) {
                var result = MapIslandUtils_1.default.checkBuildFixed(16);
                if (result) {
                    next(GuideUtils_1.EGuideStart.ConditionNotReach);
                }
                else {
                    var buildConfig = MapIslandUtils_1.default.getBuildConfigById(16);
                    var moneyCheck = MoneyManager_1.MoneyManager.CheckMoneyJson(buildConfig.price[0], false, MoneyManager_1.MoneyTipsType.None);
                    if (!moneyCheck) {
                        next(GuideUtils_1.EGuideStart.Stop);
                        return;
                    }
                    next(GuideUtils_1.EGuideStart.None);
                }
            },
            command: { cmd: "finger", args: "BuildTool/unlock", type: "MapUI", maskType: 1 },
            if: "checkNoDialogUI,checkAtMapScene",
            // delayTime: 1,
            noCheckDone: true,
        },
        {
            guideId: 407,
            desc: "点击码头icon的两个",
            // command: { cmd: "finger", args: "BuildTool/exchange/content/GuideNode", type: "MapUI", hideFinger: true },
            command: { cmd: "finger", args: "BuildTool/exchange/content", type: "MapUI", hideFinger: true, maskType: 1 },
            if: "checkAtMapScene",
            noCheckDone: true,
        },
        {
            guideId: 408,
            desc: "点击码头icon的确定按钮",
            command: { cmd: "finger", args: "BuildTool/exchange/btn_confirm", type: "MapUI" },
            if: "checkAtMapScene",
            noCheckDone: true,
        }, {
            guideId: 409,
            desc: "结束语",
            command: { cmd: "text", args: "小岛的重建任重而道远啊，让我们一起加油吧！", role: 1, positionY: -500 },
            if: "checkAtMapScene",
        }
    ]
};

cc._RF.pop();