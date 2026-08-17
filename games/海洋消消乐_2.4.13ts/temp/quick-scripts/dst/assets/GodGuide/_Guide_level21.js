
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/_Guide_level21.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '96ee6OehGxB066T+hWQ5eks', '_Guide_level21');
// GodGuide/_Guide_level21.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideUtils_1 = require("./GuideUtils");
exports.task = {
    name: "关卡21 引导使用道具",
    debug: false,
    autorun: false,
    filename: "_Guide_level21",
    steps: [
        {
            guideId: 2101,
            onStart: function (next) {
                if (GuideUtils_1.GuideUtils.checkGuideDone(2101)) {
                    next(GuideUtils_1.EGuideStart.Stop);
                    return;
                }
                next(GuideUtils_1.EGuideStart.None);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXF9HdWlkZV9sZXZlbDIxLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUF1RDtBQUUxQyxRQUFBLElBQUksR0FBRztJQUNoQixJQUFJLEVBQUUsYUFBYTtJQUNuQixLQUFLLEVBQUUsS0FBSztJQUNaLE9BQU8sRUFBRSxLQUFLO0lBQ2QsUUFBUSxFQUFFLGdCQUFnQjtJQUMxQixLQUFLLEVBQUU7UUFDSDtZQUNJLE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxZQUFDLElBQUk7Z0JBQ1IsSUFBSSx1QkFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDakMsSUFBSSxDQUFDLHdCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3ZCLE9BQU87aUJBQ1Y7Z0JBQ0QsSUFBSSxDQUFDLHdCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUNELElBQUksRUFBRSxXQUFXO1lBQ2pCLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7WUFDbEUsSUFBSSxFQUFFLElBQUk7U0FDYjtRQUVEO1lBQ0ksT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsV0FBVztZQUNqQixPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxtREFBbUQsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFO1NBQ3JHO0tBQ0o7Q0FDSixDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3VpZGVVdGlscywgRUd1aWRlU3RhcnQgfSBmcm9tIFwiLi9HdWlkZVV0aWxzXCI7XG5cbmV4cG9ydCBjb25zdCB0YXNrID0ge1xuICAgIG5hbWU6IFwi5YWz5Y2hMjEg5byV5a+85L2/55So6YGT5YW3XCIsXG4gICAgZGVidWc6IGZhbHNlLFxuICAgIGF1dG9ydW46IGZhbHNlLFxuICAgIGZpbGVuYW1lOiBcIl9HdWlkZV9sZXZlbDIxXCIsXG4gICAgc3RlcHM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZ3VpZGVJZDogMjEwMSxcbiAgICAgICAgICAgIG9uU3RhcnQobmV4dCkge1xuICAgICAgICAgICAgICAgIGlmIChHdWlkZVV0aWxzLmNoZWNrR3VpZGVEb25lKDIxMDEpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoRUd1aWRlU3RhcnQuU3RvcCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV4dChFR3VpZGVTdGFydC5Ob25lKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjOiAn5YWz5Y2hMjEg5L2/55So6YGT5YW3JyxcbiAgICAgICAgICAgIGNvbW1hbmQ6IHsgY21kOiAndGV4dCcsIGFyZ3M6ICfkvb/nlKjjgJDmraXmlbDjgJHpgZPlhbflj6/ku6Xlop7liqDpop3lpJbmraXmlbDvvIzmj5DliY3lgZrlpb3lh4blpIcnLCByb2xlOiAyIH0sXG4gICAgICAgICAgICBtYXNrOiB0cnVlLFxuICAgICAgICB9LFxuXG4gICAgICAgIHtcbiAgICAgICAgICAgIGd1aWRlSWQ6IDIxMDIsXG4gICAgICAgICAgICBkZXNjOiBcIuaJi+aMh+aMh+W8leeCueWHu+mBk+WFtzFcIixcbiAgICAgICAgICAgIGNvbW1hbmQ6IHsgY21kOiAnZmluZ2VyJywgYXJnczogJ1VJUm9vdDpTZWxlY3RTaG93VGFyZ2V0L3Byb3BDb250ZW50L2NvbnRlbnQvcHJvcDEnLCBtYXNrVHlwZTogMSB9LFxuICAgICAgICB9XG4gICAgXVxufTsiXX0=