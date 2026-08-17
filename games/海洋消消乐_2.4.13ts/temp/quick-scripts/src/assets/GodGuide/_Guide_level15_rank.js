"use strict";
cc._RF.push(module, '29d8bvE4mRB+LfgVoxDf1W5', '_Guide_level15_rank');
// GodGuide/_Guide_level15_rank.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
exports.task = {
    name: "关卡15 游戏结束后去排行榜",
    debug: false,
    autorun: false,
    filename: "_Guide_level5_rank",
    steps: [
        {
            guideId: 1501,
            // onStart(next) {
            //     next(EGuideStart.None);
            // },
            desc: '关卡15 游戏结束后去排行榜',
            command: { cmd: 'text', args: '我们已经获得足够的积分，来看看我们在全服的排名吧。', role: 2 },
            mask: true,
        },
        {
            guideId: 1502,
            desc: "手指指引点击排行榜",
            command: { cmd: "finger", args: "Canvas/UI/Bottom/leftBtns/main_icon_phb" },
        }
    ]
};

cc._RF.pop();