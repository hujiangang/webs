import { GuideUtils, EGuideStart } from "./GuideUtils";

export const task = {
    name: "关卡21 引导使用道具",
    debug: false,
    autorun: false,
    filename: "_Guide_level21",
    steps: [
        {
            guideId: 2101,
            onStart(next) {
                if (GuideUtils.checkGuideDone(2101)) {
                    next(EGuideStart.Stop);
                    return;
                }
                next(EGuideStart.None);
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