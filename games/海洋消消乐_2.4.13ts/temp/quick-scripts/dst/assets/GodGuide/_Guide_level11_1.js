
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/_Guide_level11_1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e1292N0NbFI5Z536RjBmDPr', '_Guide_level11_1');
// GodGuide/_Guide_level11_1.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideUtils_1 = require("./GuideUtils");
var UIMgr_1 = require("../Script/Base/Manager/UIMgr");
var UIData_1 = require("../Script/Logic/Data/Interface/UIData");
exports.task = {
    name: "关卡11 之后如若首次失败",
    debug: false,
    autorun: false,
    filename: "_Guide_level11_1",
    steps: [
        {
            guideId: 1100001,
            onStart: function (next) {
                next(GuideUtils_1.EGuideStart.None);
            },
            desc: '11关引导去使用道具',
            command: { cmd: 'text', args: '失败了不要紧，送你个【炸弹】道具再来一把', role: 2 },
            onEnd: function (next) {
                if (!GuideUtils_1.GuideUtils.checkGuideDone(1100001)) {
                    UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.PropDropView, { itemId: 100, num: 1 });
                }
                next(GuideUtils_1.EGuideStart.None);
            },
            mask: true,
            delayTime: 2,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXF9HdWlkZV9sZXZlbDExXzEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMkNBQXVEO0FBQ3ZELHNEQUFpRDtBQUNqRCxnRUFBaUU7QUFFcEQsUUFBQSxJQUFJLEdBQUc7SUFDaEIsSUFBSSxFQUFFLGVBQWU7SUFDckIsS0FBSyxFQUFFLEtBQUs7SUFDWixPQUFPLEVBQUUsS0FBSztJQUNkLFFBQVEsRUFBRSxrQkFBa0I7SUFDNUIsS0FBSyxFQUFFO1FBQ0g7WUFDSSxPQUFPLEVBQUUsT0FBTztZQUNoQixPQUFPLFlBQUMsSUFBSTtnQkFDUixJQUFJLENBQUMsd0JBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQ0QsSUFBSSxFQUFFLFlBQVk7WUFDbEIsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtZQUMvRCxLQUFLLFlBQUMsSUFBSTtnQkFDTixJQUFJLENBQUMsdUJBQVUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ3JDLGVBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDcEU7Z0JBQ0QsSUFBSSxDQUFDLHdCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUNELElBQUksRUFBRSxJQUFJO1lBQ1YsU0FBUyxFQUFFLENBQUM7U0FFZjtLQUNKO0NBQ0osQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNIGZyb20gXCIuLi9TY3JpcHQvQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IEVHdWlkZVN0YXJ0LCBHdWlkZVV0aWxzIH0gZnJvbSBcIi4vR3VpZGVVdGlsc1wiO1xuaW1wb3J0IFVJTWdyIGZyb20gXCIuLi9TY3JpcHQvQmFzZS9NYW5hZ2VyL1VJTWdyXCI7XG5pbXBvcnQgeyBVSUh1ZERlZiB9IGZyb20gXCIuLi9TY3JpcHQvTG9naWMvRGF0YS9JbnRlcmZhY2UvVUlEYXRhXCI7XG5cbmV4cG9ydCBjb25zdCB0YXNrID0ge1xuICAgIG5hbWU6IFwi5YWz5Y2hMTEg5LmL5ZCO5aaC6Iul6aaW5qyh5aSx6LSlXCIsXG4gICAgZGVidWc6IGZhbHNlLFxuICAgIGF1dG9ydW46IGZhbHNlLFxuICAgIGZpbGVuYW1lOiBcIl9HdWlkZV9sZXZlbDExXzFcIixcbiAgICBzdGVwczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBndWlkZUlkOiAxMTAwMDAxLFxuICAgICAgICAgICAgb25TdGFydChuZXh0KSB7XG4gICAgICAgICAgICAgICAgbmV4dChFR3VpZGVTdGFydC5Ob25lKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjOiAnMTHlhbPlvJXlr7zljrvkvb/nlKjpgZPlhbcnLFxuICAgICAgICAgICAgY29tbWFuZDogeyBjbWQ6ICd0ZXh0JywgYXJnczogJ+Wksei0peS6huS4jeimgee0p++8jOmAgeS9oOS4quOAkOeCuOW8ueOAkemBk+WFt+WGjeadpeS4gOaKiicsIHJvbGU6IDIgfSxcbiAgICAgICAgICAgIG9uRW5kKG5leHQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIUd1aWRlVXRpbHMuY2hlY2tHdWlkZURvbmUoMTEwMDAwMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgVUlNZ3IuaW5zLnNob3dVSShVSUh1ZERlZi5Qcm9wRHJvcFZpZXcsIHsgaXRlbUlkOiAxMDAsIG51bTogMSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV4dChFR3VpZGVTdGFydC5Ob25lKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYXNrOiB0cnVlLFxuICAgICAgICAgICAgZGVsYXlUaW1lOiAyLFxuICAgICAgICAgICAgLy8gbm9DaGVja0RvbmU6IHRydWUsXG4gICAgICAgIH1cbiAgICBdXG59OyJdfQ==