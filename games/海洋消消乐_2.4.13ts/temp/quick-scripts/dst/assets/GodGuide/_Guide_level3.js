
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/_Guide_level3.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f1940T5lnJECZieqjNQ4KW1', '_Guide_level3');
// GodGuide/_Guide_level3.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideCondition_1 = require("./GuideCondition");
var GuideUtils_1 = require("./GuideUtils");
var EventMgr_1 = require("../Script/Base/Manager/EventMgr");
var Event_1 = require("../Script/Logic/Data/Const/Event");
var MapIslandUtils_1 = require("../Script/Logic/SimulationOperation/View/Map/MapIslandUtils");
var M_1 = require("../Script/Base/Manager/M");
var UIMgr_1 = require("../Script/Base/Manager/UIMgr");
var UIData_1 = require("../Script/Logic/Data/Interface/UIData");
exports.task = {
    name: "关卡3 游戏结束",
    debug: false,
    autorun: false,
    filename: "_Guide_level3",
    steps: [
        {
            guideId: 301,
            onStart: function (next) {
                var result = GuideCondition_1.GuideCondition.checkLevel(3) && GuideCondition_1.GuideCondition.checkUIOpen("GameWin");
                // console.error("301", GuideCondition.checkLevel(3), GuideCondition.checkUIOpen("GameWin"), cc.find("UIRoot"));
                if (!result) {
                    next(GuideUtils_1.EGuideStart.ConditionNotReach);
                    return;
                }
                next(GuideUtils_1.EGuideStart.None);
            },
            desc: "第三关通关引导关闭",
            command: { cmd: "text", args: "通往海岛的航道开通咯！我们一起回爷爷的岛上看望一下他吧！", role: 1, positionY: -500 },
            delayTime: 2,
        },
        {
            guideId: 302,
            onStart: function (next) {
                var result = GuideCondition_1.GuideCondition.checkLevel(3) && GuideCondition_1.GuideCondition.checkUIOpen("GameWin");
                ;
                if (!result) {
                    next(GuideUtils_1.EGuideStart.ConditionNotReach);
                    return;
                }
                if (GuideCondition_1.GuideCondition.checkUIOpen("SelectShowTarget")) {
                    UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.SelectShowTarget);
                }
                next(GuideUtils_1.EGuideStart.None);
            },
            desc: "关闭箭头",
            command: { cmd: "finger", args: "UIRoot:GameWin/btn_back" },
            // delayTime: 1,
            if: "checkUIOpen",
            param: "GameWin",
        },
        {
            onStart: function (callback) {
                // let result = !GuideCondition.checkLevelFinished(4) && !GuideUtils.checkGuideDone(303);
                if (GuideCondition_1.GuideCondition.checkUIOpen("SelectShowTarget")) {
                    UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.SelectShowTarget);
                }
                var result = !GuideUtils_1.GuideUtils.checkGuideDone(303) && (M_1.default.runtime.getStarCount() == MapIslandUtils_1.default.openMapNeedStar());
                if (result) {
                    EventMgr_1.default.ins.send(Event_1.Event.UI.LevelSceneTouched, false);
                    // EventMgr.ins.send(Event.Map.GuideMask, false);
                    setTimeout(function () {
                        EventMgr_1.default.ins.send(Event_1.Event.Map.UnLockIsland);
                        callback(GuideUtils_1.EGuideStart.None);
                    }, 1 * 1000);
                }
                else {
                    callback(GuideUtils_1.EGuideStart.ConditionNotReach);
                }
            },
            guideId: 303,
            desc: "此时正在解锁海岛按钮",
            command: { cmd: 'finger', args: 'UI > Bottom > goMapBtn' },
            if: "checkAtLevelScene",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXF9HdWlkZV9sZXZlbDMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQWlEO0FBQ2pELDJDQUF1RDtBQUN2RCw0REFBdUQ7QUFDdkQsMERBQXlEO0FBQ3pELDhGQUF5RjtBQUN6Riw4Q0FBeUM7QUFDekMsc0RBQWlEO0FBQ2pELGdFQUFpRTtBQUVwRCxRQUFBLElBQUksR0FBRztJQUNoQixJQUFJLEVBQUUsVUFBVTtJQUNoQixLQUFLLEVBQUUsS0FBSztJQUNaLE9BQU8sRUFBRSxLQUFLO0lBQ2QsUUFBUSxFQUFFLGVBQWU7SUFDekIsS0FBSyxFQUFFO1FBQ0g7WUFDSSxPQUFPLEVBQUUsR0FBRztZQUNaLE9BQU8sWUFBQyxJQUFJO2dCQUNSLElBQUksTUFBTSxHQUFHLCtCQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLCtCQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNuRixnSEFBZ0g7Z0JBQ2hILElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ1QsSUFBSSxDQUFDLHdCQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDcEMsT0FBTztpQkFDVjtnQkFDRCxJQUFJLENBQUMsd0JBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQ0QsSUFBSSxFQUFFLFdBQVc7WUFDakIsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsOEJBQThCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDeEYsU0FBUyxFQUFFLENBQUM7U0FDZjtRQUNEO1lBQ0ksT0FBTyxFQUFFLEdBQUc7WUFDWixPQUFPLFlBQUMsSUFBSTtnQkFDUixJQUFJLE1BQU0sR0FBRywrQkFBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSwrQkFBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFBQSxDQUFDO2dCQUNwRixJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNULElBQUksQ0FBQyx3QkFBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQ3BDLE9BQU87aUJBQ1Y7Z0JBQ0QsSUFBSSwrQkFBYyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO29CQUNoRCxlQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7aUJBQ2hEO2dCQUNELElBQUksQ0FBQyx3QkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLENBQUM7WUFDRCxJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFO1lBQzNELGdCQUFnQjtZQUNoQixFQUFFLEVBQUUsYUFBYTtZQUNqQixLQUFLLEVBQUUsU0FBUztTQUNuQjtRQUNEO1lBQ0ksT0FBTyxZQUFDLFFBQVE7Z0JBQ1oseUZBQXlGO2dCQUN6RixJQUFJLCtCQUFjLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLEVBQUU7b0JBQ2hELGVBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztpQkFDaEQ7Z0JBQ0QsSUFBSSxNQUFNLEdBQUcsQ0FBQyx1QkFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLElBQUksd0JBQWMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRyxJQUFJLE1BQU0sRUFBRTtvQkFDUixrQkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDckQsaURBQWlEO29CQUNqRCxVQUFVLENBQUM7d0JBQ1Asa0JBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQzFDLFFBQVEsQ0FBQyx3QkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMvQixDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2lCQUNoQjtxQkFBTTtvQkFDSCxRQUFRLENBQUMsd0JBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lCQUMzQztZQUNMLENBQUM7WUFDRCxPQUFPLEVBQUUsR0FBRztZQUNaLElBQUksRUFBRSxZQUFZO1lBQ2xCLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQzFELEVBQUUsRUFBRSxtQkFBbUI7U0FDMUI7S0FDSjtDQUNKLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHdWlkZUNvbmRpdGlvbiB9IGZyb20gXCIuL0d1aWRlQ29uZGl0aW9uXCJcbmltcG9ydCB7IEVHdWlkZVN0YXJ0LCBHdWlkZVV0aWxzIH0gZnJvbSBcIi4vR3VpZGVVdGlsc1wiO1xuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi9TY3JpcHQvQmFzZS9NYW5hZ2VyL0V2ZW50TWdyXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi9TY3JpcHQvTG9naWMvRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IE1hcElzbGFuZFV0aWxzIGZyb20gXCIuLi9TY3JpcHQvTG9naWMvU2ltdWxhdGlvbk9wZXJhdGlvbi9WaWV3L01hcC9NYXBJc2xhbmRVdGlsc1wiO1xuaW1wb3J0IE0gZnJvbSBcIi4uL1NjcmlwdC9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IFVJTWdyIGZyb20gXCIuLi9TY3JpcHQvQmFzZS9NYW5hZ2VyL1VJTWdyXCI7XG5pbXBvcnQgeyBVSUh1ZERlZiB9IGZyb20gXCIuLi9TY3JpcHQvTG9naWMvRGF0YS9JbnRlcmZhY2UvVUlEYXRhXCI7XG5cbmV4cG9ydCBjb25zdCB0YXNrID0ge1xuICAgIG5hbWU6IFwi5YWz5Y2hMyDmuLjmiI/nu5PmnZ9cIixcbiAgICBkZWJ1ZzogZmFsc2UsXG4gICAgYXV0b3J1bjogZmFsc2UsXG4gICAgZmlsZW5hbWU6IFwiX0d1aWRlX2xldmVsM1wiLFxuICAgIHN0ZXBzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGd1aWRlSWQ6IDMwMSxcbiAgICAgICAgICAgIG9uU3RhcnQobmV4dCkge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBHdWlkZUNvbmRpdGlvbi5jaGVja0xldmVsKDMpICYmIEd1aWRlQ29uZGl0aW9uLmNoZWNrVUlPcGVuKFwiR2FtZVdpblwiKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwiMzAxXCIsIEd1aWRlQ29uZGl0aW9uLmNoZWNrTGV2ZWwoMyksIEd1aWRlQ29uZGl0aW9uLmNoZWNrVUlPcGVuKFwiR2FtZVdpblwiKSwgY2MuZmluZChcIlVJUm9vdFwiKSk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChFR3VpZGVTdGFydC5Db25kaXRpb25Ob3RSZWFjaCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV4dChFR3VpZGVTdGFydC5Ob25lKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjOiBcIuesrOS4ieWFs+mAmuWFs+W8leWvvOWFs+mXrVwiLFxuICAgICAgICAgICAgY29tbWFuZDogeyBjbWQ6IFwidGV4dFwiLCBhcmdzOiBcIumAmuW+gOa1t+Wym+eahOiIqumBk+W8gOmAmuWSr++8geaIkeS7rOS4gOi1t+WbnueIt+eIt+eahOWym+S4iueci+acm+S4gOS4i+S7luWQp++8gVwiLCByb2xlOiAxLCBwb3NpdGlvblk6IC01MDAgfSxcbiAgICAgICAgICAgIGRlbGF5VGltZTogMixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZ3VpZGVJZDogMzAyLFxuICAgICAgICAgICAgb25TdGFydChuZXh0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEd1aWRlQ29uZGl0aW9uLmNoZWNrTGV2ZWwoMykgJiYgR3VpZGVDb25kaXRpb24uY2hlY2tVSU9wZW4oXCJHYW1lV2luXCIpOztcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KEVHdWlkZVN0YXJ0LkNvbmRpdGlvbk5vdFJlYWNoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoR3VpZGVDb25kaXRpb24uY2hlY2tVSU9wZW4oXCJTZWxlY3RTaG93VGFyZ2V0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIFVJTWdyLmlucy5jbG9zZVVJKFVJSHVkRGVmLlNlbGVjdFNob3dUYXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0KEVHdWlkZVN0YXJ0Lk5vbmUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2M6IFwi5YWz6Zet566t5aS0XCIsXG4gICAgICAgICAgICBjb21tYW5kOiB7IGNtZDogXCJmaW5nZXJcIiwgYXJnczogXCJVSVJvb3Q6R2FtZVdpbi9idG5fYmFja1wiIH0sXG4gICAgICAgICAgICAvLyBkZWxheVRpbWU6IDEsXG4gICAgICAgICAgICBpZjogXCJjaGVja1VJT3BlblwiLFxuICAgICAgICAgICAgcGFyYW06IFwiR2FtZVdpblwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBvblN0YXJ0KGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgLy8gbGV0IHJlc3VsdCA9ICFHdWlkZUNvbmRpdGlvbi5jaGVja0xldmVsRmluaXNoZWQoNCkgJiYgIUd1aWRlVXRpbHMuY2hlY2tHdWlkZURvbmUoMzAzKTtcbiAgICAgICAgICAgICAgICBpZiAoR3VpZGVDb25kaXRpb24uY2hlY2tVSU9wZW4oXCJTZWxlY3RTaG93VGFyZ2V0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIFVJTWdyLmlucy5jbG9zZVVJKFVJSHVkRGVmLlNlbGVjdFNob3dUYXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gIUd1aWRlVXRpbHMuY2hlY2tHdWlkZURvbmUoMzAzKSAmJiAoTS5ydW50aW1lLmdldFN0YXJDb3VudCgpID09IE1hcElzbGFuZFV0aWxzLm9wZW5NYXBOZWVkU3RhcigpKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWdyLmlucy5zZW5kKEV2ZW50LlVJLkxldmVsU2NlbmVUb3VjaGVkLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEV2ZW50TWdyLmlucy5zZW5kKEV2ZW50Lk1hcC5HdWlkZU1hc2ssIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBFdmVudE1nci5pbnMuc2VuZChFdmVudC5NYXAuVW5Mb2NrSXNsYW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKEVHdWlkZVN0YXJ0Lk5vbmUpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxICogMTAwMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soRUd1aWRlU3RhcnQuQ29uZGl0aW9uTm90UmVhY2gpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBndWlkZUlkOiAzMDMsXG4gICAgICAgICAgICBkZXNjOiBcIuatpOaXtuato+WcqOino+mUgea1t+Wym+aMiemSrlwiLFxuICAgICAgICAgICAgY29tbWFuZDogeyBjbWQ6ICdmaW5nZXInLCBhcmdzOiAnVUkgPiBCb3R0b20gPiBnb01hcEJ0bicgfSxcbiAgICAgICAgICAgIGlmOiBcImNoZWNrQXRMZXZlbFNjZW5lXCIsXG4gICAgICAgIH0sXG4gICAgXVxufSAiXX0=