"use strict";
cc._RF.push(module, 'e1292N0NbFI5Z536RjBmDPr', '_Guide_level11_1');
// GodGuide/_Guide_level11_1.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideUtils_1 = require("./GuideUtils");
var UIMgr_1 = require("../Script/Base/Manager/UIMgr");
var UIData_1 = require("../Script/Logic/Data/Interface/UIData");
exports.task = {
    name: "关卡11 之后如若首次失败",
    debug: false,
    autorun: false,
    filename: "_Guide_level11_1",
    steps: [
        {
            guideId: 1100001,
            onStart: function (next) {
                next(GuideUtils_1.EGuideStart.None);
            },
            desc: '11关引导去使用道具',
            command: { cmd: 'text', args: '失败了不要紧，送你个【炸弹】道具再来一把', role: 2 },
            onEnd: function (next) {
                if (!GuideUtils_1.GuideUtils.checkGuideDone(1100001)) {
                    UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.PropDropView, { itemId: 100, num: 1 });
                }
                next(GuideUtils_1.EGuideStart.None);
            },
            mask: true,
            delayTime: 2,
        }
    ]
};

cc._RF.pop();