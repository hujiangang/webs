"use strict";
cc._RF.push(module, 'c2494y7ly5NTZCVSjRYZreh', '_Guide_test');
// GodGuide/_Guide_test.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
exports.task = {
    name: "测试引导",
    debug: false,
    autorun: false,
    steps: [
        {
            onStart: function (callback) {
                callback('condition_not_reach');
                // callback();
            },
            guideId: 10000001,
            desc: '首次进入游戏',
            command: { cmd: 'text', args: '欢迎来到小岛！先来一局游戏吧！', role: 2 },
        },
        {
            guideId: 10000002,
            desc: '点击开始游戏',
            command: { cmd: 'finger', args: 'UI > Bottom > goMatchBtn' },
            delayTime: 0.5,
        },
    ]
};

cc._RF.pop();