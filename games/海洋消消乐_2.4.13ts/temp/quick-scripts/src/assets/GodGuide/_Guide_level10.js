"use strict";
cc._RF.push(module, '970f7WMayZF65DZ2893/bvs', '_Guide_level10');
// GodGuide/_Guide_level10.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideUtils_1 = require("./GuideUtils");
var M_1 = require("../Script/Base/Manager/M");
exports.task = {
    name: "关卡10 结束",
    debug: false,
    autorun: false,
    filename: "_Guide_level10",
    steps: [
        {
            guideId: 1001,
            onStart: function (next) {
                var boxData = M_1.default.runtime.getBoxGiftDataByLv(10);
                if (!boxData) {
                    next(GuideUtils_1.EGuideStart.Stop);
                    return;
                }
                if (boxData && boxData.received) {
                    next(GuideUtils_1.EGuideStart.Stop);
                    return;
                }
                next(GuideUtils_1.EGuideStart.None);
            },
            desc: '10关结束引导去领取宝箱',
            command: { cmd: 'text', args: '太棒了！每过10关能打捞到一个宝箱。', role: 2 },
            noCheckDone: true,
            mask: true,
        },
        {
            guideId: 1002,
            desc: "手指指引点击宝箱",
            command: { cmd: "finger", args: "Canvas/boxProgress/box1" }
        }
    ]
};

cc._RF.pop();