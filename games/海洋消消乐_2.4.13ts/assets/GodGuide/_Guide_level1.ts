import { GuideCondition } from "./GuideCondition"
import { EGuideStart } from "./GuideUtils";
import { GuideData } from "./GuideData";

export const task = {
    name: "关卡1 首次进入游戏",
    debug: false,
    autorun: false,
    filename: "_Guide_level1",
    steps: [
        {
            guideId: 1,
            onStart(next) {
                let result = GuideCondition.checkLevelFinished(1);
                // GuideUtils.logError("guide result ", result);
                if (result) {
                    GuideData.pushFinishedTask("_Guide_level1");
                    next(EGuideStart.Stop);
                } else {
                    next(EGuideStart.None);
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
} 