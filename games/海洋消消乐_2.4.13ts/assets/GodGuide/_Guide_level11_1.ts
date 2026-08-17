import M from "../Script/Base/Manager/M";
import { EGuideStart, GuideUtils } from "./GuideUtils";
import UIMgr from "../Script/Base/Manager/UIMgr";
import { UIHudDef } from "../Script/Logic/Data/Interface/UIData";

export const task = {
    name: "关卡11 之后如若首次失败",
    debug: false,
    autorun: false,
    filename: "_Guide_level11_1",
    steps: [
        {
            guideId: 1100001,
            onStart(next) {
                next(EGuideStart.None);
            },
            desc: '11关引导去使用道具',
            command: { cmd: 'text', args: '失败了不要紧，送你个【炸弹】道具再来一把', role: 2 },
            onEnd(next) {
                if (!GuideUtils.checkGuideDone(1100001)) {
                    UIMgr.ins.showUI(UIHudDef.PropDropView, { itemId: 100, num: 1 });
                }
                next(EGuideStart.None);
            },
            mask: true,
            delayTime: 2,
            // noCheckDone: true,
        }
    ]
};