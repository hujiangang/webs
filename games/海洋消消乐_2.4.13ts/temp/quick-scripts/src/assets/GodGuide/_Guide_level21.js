"use strict";
cc._RF.push(module, '96ee6OehGxB066T+hWQ5eks', '_Guide_level21');
// GodGuide/_Guide_level21.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideUtils_1 = require("./GuideUtils");
exports.task = {
    name: "关卡21 引导使用道具",
    debug: false,
    autorun: false,
    filename: "_Guide_level21",
    steps: [
        {
            guideId: 2101,
            onStart: function (next) {
                if (GuideUtils_1.GuideUtils.checkGuideDone(2101)) {
                    next(GuideUtils_1.EGuideStart.Stop);
                    return;
                }
                next(GuideUtils_1.EGuideStart.None);
            },
            desc: '关卡21 使用道具',
            command: { cmd: 'text', args: '使用【步数】道具可以增加额外步数，提前做好准备', role: 2 },
            mask: true,
        },
        {
            guideId: 2102,
            desc: "手指指引点击道具1",
            command: { cmd: 'finger', args: 'UIRoot:SelectShowTarget/propContent/content/prop1', maskType: 1 },
        }
    ]
};

cc._RF.pop();