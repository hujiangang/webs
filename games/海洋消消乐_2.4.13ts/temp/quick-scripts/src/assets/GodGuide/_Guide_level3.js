"use strict";
cc._RF.push(module, 'f1940T5lnJECZieqjNQ4KW1', '_Guide_level3');
// GodGuide/_Guide_level3.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideCondition_1 = require("./GuideCondition");
var GuideUtils_1 = require("./GuideUtils");
var EventMgr_1 = require("../Script/Base/Manager/EventMgr");
var Event_1 = require("../Script/Logic/Data/Const/Event");
var MapIslandUtils_1 = require("../Script/Logic/SimulationOperation/View/Map/MapIslandUtils");
var M_1 = require("../Script/Base/Manager/M");
var UIMgr_1 = require("../Script/Base/Manager/UIMgr");
var UIData_1 = require("../Script/Logic/Data/Interface/UIData");
exports.task = {
    name: "关卡3 游戏结束",
    debug: false,
    autorun: false,
    filename: "_Guide_level3",
    steps: [
        {
            guideId: 301,
            onStart: function (next) {
                var result = GuideCondition_1.GuideCondition.checkLevel(3) && GuideCondition_1.GuideCondition.checkUIOpen("GameWin");
                // console.error("301", GuideCondition.checkLevel(3), GuideCondition.checkUIOpen("GameWin"), cc.find("UIRoot"));
                if (!result) {
                    next(GuideUtils_1.EGuideStart.ConditionNotReach);
                    return;
                }
                next(GuideUtils_1.EGuideStart.None);
            },
            desc: "第三关通关引导关闭",
            command: { cmd: "text", args: "通往海岛的航道开通咯！我们一起回爷爷的岛上看望一下他吧！", role: 1, positionY: -500 },
            delayTime: 2,
        },
        {
            guideId: 302,
            onStart: function (next) {
                var result = GuideCondition_1.GuideCondition.checkLevel(3) && GuideCondition_1.GuideCondition.checkUIOpen("GameWin");
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
            onStart: function (callback) {
                // let result = !GuideCondition.checkLevelFinished(4) && !GuideUtils.checkGuideDone(303);
                if (GuideCondition_1.GuideCondition.checkUIOpen("SelectShowTarget")) {
                    UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.SelectShowTarget);
                }
                var result = !GuideUtils_1.GuideUtils.checkGuideDone(303) && (M_1.default.runtime.getStarCount() == MapIslandUtils_1.default.openMapNeedStar());
                if (result) {
                    EventMgr_1.default.ins.send(Event_1.Event.UI.LevelSceneTouched, false);
                    // EventMgr.ins.send(Event.Map.GuideMask, false);
                    setTimeout(function () {
                        EventMgr_1.default.ins.send(Event_1.Event.Map.UnLockIsland);
                        callback(GuideUtils_1.EGuideStart.None);
                    }, 1 * 1000);
                }
                else {
                    callback(GuideUtils_1.EGuideStart.ConditionNotReach);
                }
            },
            guideId: 303,
            desc: "此时正在解锁海岛按钮",
            command: { cmd: 'finger', args: 'UI > Bottom > goMapBtn' },
            if: "checkAtLevelScene",
        },
    ]
};

cc._RF.pop();