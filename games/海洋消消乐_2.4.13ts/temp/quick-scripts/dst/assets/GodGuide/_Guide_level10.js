
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/_Guide_level10.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '970f7WMayZF65DZ2893/bvs', '_Guide_level10');
// GodGuide/_Guide_level10.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideUtils_1 = require("./GuideUtils");
var M_1 = require("../Script/Base/Manager/M");
exports.task = {
    name: "关卡10 结束",
    debug: false,
    autorun: false,
    filename: "_Guide_level10",
    steps: [
        {
            guideId: 1001,
            onStart: function (next) {
                var boxData = M_1.default.runtime.getBoxGiftDataByLv(10);
                if (!boxData) {
                    next(GuideUtils_1.EGuideStart.Stop);
                    return;
                }
                if (boxData && boxData.received) {
                    next(GuideUtils_1.EGuideStart.Stop);
                    return;
                }
                next(GuideUtils_1.EGuideStart.None);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXF9HdWlkZV9sZXZlbDEwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUEyQztBQUMzQyw4Q0FBeUM7QUFFNUIsUUFBQSxJQUFJLEdBQUc7SUFDaEIsSUFBSSxFQUFFLFNBQVM7SUFDZixLQUFLLEVBQUUsS0FBSztJQUNaLE9BQU8sRUFBRSxLQUFLO0lBQ2QsUUFBUSxFQUFFLGdCQUFnQjtJQUMxQixLQUFLLEVBQUU7UUFDSDtZQUNJLE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxZQUFDLElBQUk7Z0JBQ1IsSUFBSSxPQUFPLEdBQUcsV0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDVixJQUFJLENBQUMsd0JBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdkIsT0FBTztpQkFDVjtnQkFDRCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO29CQUM3QixJQUFJLENBQUMsd0JBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdkIsT0FBTztpQkFDVjtnQkFDRCxJQUFJLENBQUMsd0JBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQ0QsSUFBSSxFQUFFLGNBQWM7WUFDcEIsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtZQUM3RCxXQUFXLEVBQUUsSUFBSTtZQUNqQixJQUFJLEVBQUUsSUFBSTtTQUNiO1FBQ0Q7WUFDSSxPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxVQUFVO1lBQ2hCLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFO1NBQzlEO0tBQ0o7Q0FDSixDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRUd1aWRlU3RhcnQgfSBmcm9tIFwiLi9HdWlkZVV0aWxzXCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vU2NyaXB0L0Jhc2UvTWFuYWdlci9NXCI7XG5cbmV4cG9ydCBjb25zdCB0YXNrID0ge1xuICAgIG5hbWU6IFwi5YWz5Y2hMTAg57uT5p2fXCIsXG4gICAgZGVidWc6IGZhbHNlLFxuICAgIGF1dG9ydW46IGZhbHNlLFxuICAgIGZpbGVuYW1lOiBcIl9HdWlkZV9sZXZlbDEwXCIsXG4gICAgc3RlcHM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZ3VpZGVJZDogMTAwMSxcbiAgICAgICAgICAgIG9uU3RhcnQobmV4dCkge1xuICAgICAgICAgICAgICAgIGxldCBib3hEYXRhID0gTS5ydW50aW1lLmdldEJveEdpZnREYXRhQnlMdigxMCk7XG4gICAgICAgICAgICAgICAgaWYgKCFib3hEYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoRUd1aWRlU3RhcnQuU3RvcCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGJveERhdGEgJiYgYm94RGF0YS5yZWNlaXZlZCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KEVHdWlkZVN0YXJ0LlN0b3ApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5leHQoRUd1aWRlU3RhcnQuTm9uZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzYzogJzEw5YWz57uT5p2f5byV5a+85Y676aKG5Y+W5a6d566xJyxcbiAgICAgICAgICAgIGNvbW1hbmQ6IHsgY21kOiAndGV4dCcsIGFyZ3M6ICflpKrmo5LkuobvvIHmr4/ov4cxMOWFs+iDveaJk+aNnuWIsOS4gOS4quWuneeuseOAgicsIHJvbGU6IDIgfSxcbiAgICAgICAgICAgIG5vQ2hlY2tEb25lOiB0cnVlLFxuICAgICAgICAgICAgbWFzazogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZ3VpZGVJZDogMTAwMixcbiAgICAgICAgICAgIGRlc2M6IFwi5omL5oyH5oyH5byV54K55Ye75a6d566xXCIsXG4gICAgICAgICAgICBjb21tYW5kOiB7IGNtZDogXCJmaW5nZXJcIiwgYXJnczogXCJDYW52YXMvYm94UHJvZ3Jlc3MvYm94MVwiIH1cbiAgICAgICAgfVxuICAgIF1cbn07Il19