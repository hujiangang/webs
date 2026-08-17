
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/_Guide_level11.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd0746abwGBFDZPI0a5bMJl8', '_Guide_level11');
// GodGuide/_Guide_level11.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideUtils_1 = require("./GuideUtils");
exports.task = {
    name: "关卡11 局内道具使用",
    debug: false,
    autorun: false,
    filename: "_Guide_level11",
    steps: [
        {
            guideId: 1101,
            onStart: function (next) {
                // let boxData = M.runtime.getBoxGiftDataByLv(10);
                // if (!boxData) {
                //     next(EGuideStart.Stop);
                //     return;
                // }
                // if (boxData && boxData.received) {
                //     next(EGuideStart.Stop);
                //     return;
                // }
                next(GuideUtils_1.EGuideStart.None);
            },
            desc: '11关引导去使用道具',
            command: { cmd: 'text', args: '棋盘好像很难消除了，试试新道具刷新一下棋盘吧。', role: 2 },
            // noCheckDone: true,
            mask: true,
            delayTime: 2,
        },
        {
            guideId: 1102,
            desc: "手指指引使用道具",
            command: { cmd: "finger", args: "Canvas/ui/bottom/propsBar/item_102/bg", maskType: 1 },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXF9HdWlkZV9sZXZlbDExLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDJDQUEyQztBQUU5QixRQUFBLElBQUksR0FBRztJQUNoQixJQUFJLEVBQUUsYUFBYTtJQUNuQixLQUFLLEVBQUUsS0FBSztJQUNaLE9BQU8sRUFBRSxLQUFLO0lBQ2QsUUFBUSxFQUFFLGdCQUFnQjtJQUMxQixLQUFLLEVBQUU7UUFDSDtZQUNJLE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxZQUFDLElBQUk7Z0JBQ1Isa0RBQWtEO2dCQUNsRCxrQkFBa0I7Z0JBQ2xCLDhCQUE4QjtnQkFDOUIsY0FBYztnQkFDZCxJQUFJO2dCQUNKLHFDQUFxQztnQkFDckMsOEJBQThCO2dCQUM5QixjQUFjO2dCQUNkLElBQUk7Z0JBQ0osSUFBSSxDQUFDLHdCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUNELElBQUksRUFBRSxZQUFZO1lBQ2xCLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7WUFDbEUscUJBQXFCO1lBQ3JCLElBQUksRUFBRSxJQUFJO1lBQ1YsU0FBUyxFQUFFLENBQUM7U0FDZjtRQUNEO1lBQ0ksT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsVUFBVTtZQUNoQixPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSx1Q0FBdUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFO1NBQ3pGO0tBQ0o7Q0FDSixDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE0gZnJvbSBcIi4uL1NjcmlwdC9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgRUd1aWRlU3RhcnQgfSBmcm9tIFwiLi9HdWlkZVV0aWxzXCI7XG5cbmV4cG9ydCBjb25zdCB0YXNrID0ge1xuICAgIG5hbWU6IFwi5YWz5Y2hMTEg5bGA5YaF6YGT5YW35L2/55SoXCIsXG4gICAgZGVidWc6IGZhbHNlLFxuICAgIGF1dG9ydW46IGZhbHNlLFxuICAgIGZpbGVuYW1lOiBcIl9HdWlkZV9sZXZlbDExXCIsXG4gICAgc3RlcHM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZ3VpZGVJZDogMTEwMSxcbiAgICAgICAgICAgIG9uU3RhcnQobmV4dCkge1xuICAgICAgICAgICAgICAgIC8vIGxldCBib3hEYXRhID0gTS5ydW50aW1lLmdldEJveEdpZnREYXRhQnlMdigxMCk7XG4gICAgICAgICAgICAgICAgLy8gaWYgKCFib3hEYXRhKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIG5leHQoRUd1aWRlU3RhcnQuU3RvcCk7XG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgLy8gaWYgKGJveERhdGEgJiYgYm94RGF0YS5yZWNlaXZlZCkge1xuICAgICAgICAgICAgICAgIC8vICAgICBuZXh0KEVHdWlkZVN0YXJ0LlN0b3ApO1xuICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIG5leHQoRUd1aWRlU3RhcnQuTm9uZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzYzogJzEx5YWz5byV5a+85Y675L2/55So6YGT5YW3JyxcbiAgICAgICAgICAgIGNvbW1hbmQ6IHsgY21kOiAndGV4dCcsIGFyZ3M6ICfmo4vnm5jlpb3lg4/lvojpmr7mtojpmaTkuobvvIzor5Xor5XmlrDpgZPlhbfliLfmlrDkuIDkuIvmo4vnm5jlkKfjgIInLCByb2xlOiAyIH0sXG4gICAgICAgICAgICAvLyBub0NoZWNrRG9uZTogdHJ1ZSxcbiAgICAgICAgICAgIG1hc2s6IHRydWUsXG4gICAgICAgICAgICBkZWxheVRpbWU6IDIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGd1aWRlSWQ6IDExMDIsXG4gICAgICAgICAgICBkZXNjOiBcIuaJi+aMh+aMh+W8leS9v+eUqOmBk+WFt1wiLFxuICAgICAgICAgICAgY29tbWFuZDogeyBjbWQ6IFwiZmluZ2VyXCIsIGFyZ3M6IFwiQ2FudmFzL3VpL2JvdHRvbS9wcm9wc0Jhci9pdGVtXzEwMi9iZ1wiLCBtYXNrVHlwZTogMSB9LFxuICAgICAgICB9XG4gICAgXVxufTsiXX0=