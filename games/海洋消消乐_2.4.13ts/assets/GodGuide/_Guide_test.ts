export const task = {
    name: "测试引导",
    debug: false,
    autorun: false,
    steps: [
        {
            onStart(callback) {
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
} 