import { EGuideStart } from "./GuideUtils";
import M from "../Script/Base/Manager/M";

export const task = {
    name: "关卡10 结束",
    debug: false,
    autorun: false,
    filename: "_Guide_level10",
    steps: [
        {
            guideId: 1001,
            onStart(next) {
                let boxData = M.runtime.getBoxGiftDataByLv(10);
                if (!boxData) {
                    next(EGuideStart.Stop);
                    return;
                }
                if (boxData && boxData.received) {
                    next(EGuideStart.Stop);
                    return;
                }
                next(EGuideStart.None);
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