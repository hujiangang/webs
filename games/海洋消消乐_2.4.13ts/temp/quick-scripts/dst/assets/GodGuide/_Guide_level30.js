
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/_Guide_level30.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '39fc7gYLKBCG6m23j7ITgWA', '_Guide_level30');
// GodGuide/_Guide_level30.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideUtils_1 = require("./GuideUtils");
var M_1 = require("../Script/Base/Manager/M");
var Event_1 = require("../Script/Logic/Data/Const/Event");
var EventMgr_1 = require("../Script/Base/Manager/EventMgr");
exports.task = {
    name: "关卡30 章节解锁引导",
    debug: false,
    autorun: false,
    filename: "_Guide_level30",
    steps: [
        {
            guideId: 3001,
            onStart: function (next) {
                // M.event.send(Event.UI.ChapterUnlock, { index: 0, play: false });
                EventMgr_1.default.ins.send(Event_1.Event.UI.LevelSceneTouched, false);
                next(GuideUtils_1.EGuideStart.None);
            },
            desc: '关卡30 章节引导解锁',
            command: { cmd: 'text', args: '丛林的探险告一段落了，我们去看看下一章的海滩吧', role: 2 },
            onEnd: function (next) {
                M_1.default.tips.show("\u606D\u559C\u7B2C\u4E8C\u7AE0 \u201C\u9633\u5149\u6C99\u6EE9\u201D \u89E3\u9501\u4E86\uFF01");
                M_1.default.event.send(Event_1.Event.UI.ChapterUnlock, { index: 1, play: true });
                next(GuideUtils_1.EGuideStart.None);
            },
            mask: true,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXF9HdWlkZV9sZXZlbDMwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUF1RDtBQUN2RCw4Q0FBeUM7QUFDekMsMERBQXlEO0FBQ3pELDREQUF1RDtBQUUxQyxRQUFBLElBQUksR0FBRztJQUNoQixJQUFJLEVBQUUsYUFBYTtJQUNuQixLQUFLLEVBQUUsS0FBSztJQUNaLE9BQU8sRUFBRSxLQUFLO0lBQ2QsUUFBUSxFQUFFLGdCQUFnQjtJQUMxQixLQUFLLEVBQUU7UUFDSDtZQUNJLE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxZQUFDLElBQUk7Z0JBQ1IsbUVBQW1FO2dCQUNuRSxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLHdCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUNELElBQUksRUFBRSxhQUFhO1lBQ25CLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7WUFDbEUsS0FBSyxZQUFDLElBQUk7Z0JBQ04sV0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsOEZBQW1CLENBQUMsQ0FBQztnQkFDakMsV0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRCxJQUFJLENBQUMsd0JBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQ0QsSUFBSSxFQUFFLElBQUk7U0FFYjtLQVFKO0NBQ0osQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEd1aWRlVXRpbHMsIEVHdWlkZVN0YXJ0IH0gZnJvbSBcIi4vR3VpZGVVdGlsc1wiO1xuaW1wb3J0IE0gZnJvbSBcIi4uL1NjcmlwdC9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vU2NyaXB0L0xvZ2ljL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCBFdmVudE1nciBmcm9tIFwiLi4vU2NyaXB0L0Jhc2UvTWFuYWdlci9FdmVudE1nclwiO1xuXG5leHBvcnQgY29uc3QgdGFzayA9IHtcbiAgICBuYW1lOiBcIuWFs+WNoTMwIOeroOiKguino+mUgeW8leWvvFwiLFxuICAgIGRlYnVnOiBmYWxzZSxcbiAgICBhdXRvcnVuOiBmYWxzZSxcbiAgICBmaWxlbmFtZTogXCJfR3VpZGVfbGV2ZWwzMFwiLFxuICAgIHN0ZXBzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGd1aWRlSWQ6IDMwMDEsXG4gICAgICAgICAgICBvblN0YXJ0KG5leHQpIHtcbiAgICAgICAgICAgICAgICAvLyBNLmV2ZW50LnNlbmQoRXZlbnQuVUkuQ2hhcHRlclVubG9jaywgeyBpbmRleDogMCwgcGxheTogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuVUkuTGV2ZWxTY2VuZVRvdWNoZWQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBuZXh0KEVHdWlkZVN0YXJ0Lk5vbmUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2M6ICflhbPljaEzMCDnq6DoioLlvJXlr7zop6PplIEnLFxuICAgICAgICAgICAgY29tbWFuZDogeyBjbWQ6ICd0ZXh0JywgYXJnczogJ+S4m+ael+eahOaOoumZqeWRiuS4gOauteiQveS6hu+8jOaIkeS7rOWOu+eci+eci+S4i+S4gOeroOeahOa1t+a7qeWQpycsIHJvbGU6IDIgfSxcbiAgICAgICAgICAgIG9uRW5kKG5leHQpIHtcbiAgICAgICAgICAgICAgICBNLnRpcHMuc2hvdyhg5oGt5Zac56ys5LqM56ugIOKAnOmYs+WFieaymea7qeKAnSDop6PplIHkuobvvIFgKTtcbiAgICAgICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuVUkuQ2hhcHRlclVubG9jaywgeyBpbmRleDogMSwgcGxheTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICBuZXh0KEVHdWlkZVN0YXJ0Lk5vbmUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1hc2s6IHRydWUsXG4gICAgICAgICAgICAvLyBub0NoZWNrRG9uZTogdHJ1ZSxcbiAgICAgICAgfSxcblxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICBndWlkZUlkOiAzMDAyLFxuICAgICAgICAvLyAgICAgZGVzYzogXCLmiYvmjIfmjIflvJXngrnlh7vmjpLooYzmppxcIixcbiAgICAgICAgLy8gICAgIGNvbW1hbmQ6IHsgY21kOiAnZmluZ2VyJywgYXJnczogJ1VJUm9vdDpTZWxlY3RTaG93VGFyZ2V0L3Byb3BDb250ZW50L2NvbnRlbnQvcHJvcDEnLCBtYXNrVHlwZTogMSB9LFxuICAgICAgICAvLyAgICAgbm9DaGVja0RvbmU6IHRydWUsXG4gICAgICAgIC8vIH1cbiAgICBdXG59OyJdfQ==