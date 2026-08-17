"use strict";
cc._RF.push(module, '39fc7gYLKBCG6m23j7ITgWA', '_Guide_level30');
// GodGuide/_Guide_level30.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideUtils_1 = require("./GuideUtils");
var M_1 = require("../Script/Base/Manager/M");
var Event_1 = require("../Script/Logic/Data/Const/Event");
var EventMgr_1 = require("../Script/Base/Manager/EventMgr");
exports.task = {
    name: "关卡30 章节解锁引导",
    debug: false,
    autorun: false,
    filename: "_Guide_level30",
    steps: [
        {
            guideId: 3001,
            onStart: function (next) {
                // M.event.send(Event.UI.ChapterUnlock, { index: 0, play: false });
                EventMgr_1.default.ins.send(Event_1.Event.UI.LevelSceneTouched, false);
                next(GuideUtils_1.EGuideStart.None);
            },
            desc: '关卡30 章节引导解锁',
            command: { cmd: 'text', args: '丛林的探险告一段落了，我们去看看下一章的海滩吧', role: 2 },
            onEnd: function (next) {
                M_1.default.tips.show("\u606D\u559C\u7B2C\u4E8C\u7AE0 \u201C\u9633\u5149\u6C99\u6EE9\u201D \u89E3\u9501\u4E86\uFF01");
                M_1.default.event.send(Event_1.Event.UI.ChapterUnlock, { index: 1, play: true });
                next(GuideUtils_1.EGuideStart.None);
            },
            mask: true,
        },
    ]
};

cc._RF.pop();