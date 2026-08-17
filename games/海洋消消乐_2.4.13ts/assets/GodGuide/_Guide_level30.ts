import { GuideUtils, EGuideStart } from "./GuideUtils";
import M from "../Script/Base/Manager/M";
import { Event } from "../Script/Logic/Data/Const/Event";
import EventMgr from "../Script/Base/Manager/EventMgr";

export const task = {
    name: "关卡30 章节解锁引导",
    debug: false,
    autorun: false,
    filename: "_Guide_level30",
    steps: [
        {
            guideId: 3001,
            onStart(next) {
                // M.event.send(Event.UI.ChapterUnlock, { index: 0, play: false });
                EventMgr.ins.send(Event.UI.LevelSceneTouched, false);
                next(EGuideStart.None);
            },
            desc: '关卡30 章节引导解锁',
            command: { cmd: 'text', args: '丛林的探险告一段落了，我们去看看下一章的海滩吧', role: 2 },
            onEnd(next) {
                M.tips.show(`恭喜第二章 “阳光沙滩” 解锁了！`);
                M.event.send(Event.UI.ChapterUnlock, { index: 1, play: true });
                next(EGuideStart.None);
            },
            mask: true,
            // noCheckDone: true,
        },

        // {
        //     guideId: 3002,
        //     desc: "手指指引点击排行榜",
        //     command: { cmd: 'finger', args: 'UIRoot:SelectShowTarget/propContent/content/prop1', maskType: 1 },
        //     noCheckDone: true,
        // }
    ]
};