"use strict";
cc._RF.push(module, 'd0746abwGBFDZPI0a5bMJl8', '_Guide_level11');
// GodGuide/_Guide_level11.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideUtils_1 = require("./GuideUtils");
exports.task = {
    name: "关卡11 局内道具使用",
    debug: false,
    autorun: false,
    filename: "_Guide_level11",
    steps: [
        {
            guideId: 1101,
            onStart: function (next) {
                // let boxData = M.runtime.getBoxGiftDataByLv(10);
                // if (!boxData) {
                //     next(EGuideStart.Stop);
                //     return;
                // }
                // if (boxData && boxData.received) {
                //     next(EGuideStart.Stop);
                //     return;
                // }
                next(GuideUtils_1.EGuideStart.None);
            },
            desc: '11关引导去使用道具',
            command: { cmd: 'text', args: '棋盘好像很难消除了，试试新道具刷新一下棋盘吧。', role: 2 },
            // noCheckDone: true,
            mask: true,
            delayTime: 2,
        },
        {
            guideId: 1102,
            desc: "手指指引使用道具",
            command: { cmd: "finger", args: "Canvas/ui/bottom/propsBar/item_102/bg", maskType: 1 },
        }
    ]
};

cc._RF.pop();