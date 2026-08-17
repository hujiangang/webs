import M from "../Script/Base/Manager/M";
import { EGuideStart } from "./GuideUtils";

export const task = {
    name: "关卡11 局内道具使用",
    debug: false,
    autorun: false,
    filename: "_Guide_level11",
    steps: [
        {
            guideId: 1101,
            onStart(next) {
                // let boxData = M.runtime.getBoxGiftDataByLv(10);
                // if (!boxData) {
                //     next(EGuideStart.Stop);
                //     return;
                // }
                // if (boxData && boxData.received) {
                //     next(EGuideStart.Stop);
                //     return;
                // }
                next(EGuideStart.None);
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