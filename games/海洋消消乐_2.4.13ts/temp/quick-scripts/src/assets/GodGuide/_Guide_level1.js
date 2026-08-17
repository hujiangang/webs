"use strict";
cc._RF.push(module, '84b9biq5ktMyrmxHOKMwthF', '_Guide_level1');
// GodGuide/_Guide_level1.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideCondition_1 = require("./GuideCondition");
var GuideUtils_1 = require("./GuideUtils");
var GuideData_1 = require("./GuideData");
exports.task = {
    name: "关卡1 首次进入游戏",
    debug: false,
    autorun: false,
    filename: "_Guide_level1",
    steps: [
        {
            guideId: 1,
            onStart: function (next) {
                var result = GuideCondition_1.GuideCondition.checkLevelFinished(1);
                // GuideUtils.logError("guide result ", result);
                if (result) {
                    GuideData_1.GuideData.pushFinishedTask("_Guide_level1");
                    next(GuideUtils_1.EGuideStart.Stop);
                }
                else {
                    next(GuideUtils_1.EGuideStart.None);
                }
            },
            desc: '首次进入游戏',
            command: { cmd: 'text', args: '欢迎来到小岛！先来一局游戏吧！', role: 2 },
            noCheckDone: true,
            mask: true,
        },
        {
            guideId: 2,
            desc: '点击开始游戏',
            command: { cmd: 'finger', args: 'UI > Bottom > goMatchBtn' },
            // delayTime: 1,
            if: "-checkLevelFinished",
            param: 1,
            noCheckDone: true,
        },
        {
            guideId: 3,
            desc: '点击开始关卡按钮',
            command: { cmd: 'finger', args: 'UIRoot:SelectShowTarget/btn_green' },
            delayTime: 0.5,
            noCheckDone: true,
        },
    ]
};

cc._RF.pop();