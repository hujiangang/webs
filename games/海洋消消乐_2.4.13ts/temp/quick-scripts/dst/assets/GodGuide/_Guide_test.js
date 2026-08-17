
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/_Guide_test.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXF9HdWlkZV90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFhLFFBQUEsSUFBSSxHQUFHO0lBQ2hCLElBQUksRUFBRSxNQUFNO0lBQ1osS0FBSyxFQUFFLEtBQUs7SUFDWixPQUFPLEVBQUUsS0FBSztJQUNkLEtBQUssRUFBRTtRQUNIO1lBQ0ksT0FBTyxZQUFDLFFBQVE7Z0JBQ1osUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7Z0JBQ2hDLGNBQWM7WUFDbEIsQ0FBQztZQUNELE9BQU8sRUFBRSxRQUFRO1lBQ2pCLElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtTQUM3RDtRQUNEO1lBQ0ksT0FBTyxFQUFFLFFBQVE7WUFDakIsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSwwQkFBMEIsRUFBRTtZQUM1RCxTQUFTLEVBQUUsR0FBRztTQUNqQjtLQUNKO0NBQ0osQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCB0YXNrID0ge1xuICAgIG5hbWU6IFwi5rWL6K+V5byV5a+8XCIsXG4gICAgZGVidWc6IGZhbHNlLFxuICAgIGF1dG9ydW46IGZhbHNlLFxuICAgIHN0ZXBzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG9uU3RhcnQoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygnY29uZGl0aW9uX25vdF9yZWFjaCcpO1xuICAgICAgICAgICAgICAgIC8vIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ3VpZGVJZDogMTAwMDAwMDEsXG4gICAgICAgICAgICBkZXNjOiAn6aaW5qyh6L+b5YWl5ri45oiPJyxcbiAgICAgICAgICAgIGNvbW1hbmQ6IHsgY21kOiAndGV4dCcsIGFyZ3M6ICfmrKLov47mnaXliLDlsI/lspvvvIHlhYjmnaXkuIDlsYDmuLjmiI/lkKfvvIEnLCByb2xlOiAyIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGd1aWRlSWQ6IDEwMDAwMDAyLFxuICAgICAgICAgICAgZGVzYzogJ+eCueWHu+W8gOWni+a4uOaIjycsXG4gICAgICAgICAgICBjb21tYW5kOiB7IGNtZDogJ2ZpbmdlcicsIGFyZ3M6ICdVSSA+IEJvdHRvbSA+IGdvTWF0Y2hCdG4nIH0sXG4gICAgICAgICAgICBkZWxheVRpbWU6IDAuNSxcbiAgICAgICAgfSxcbiAgICBdXG59ICJdfQ==