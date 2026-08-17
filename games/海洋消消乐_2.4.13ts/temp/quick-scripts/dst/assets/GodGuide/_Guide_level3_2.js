
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/_Guide_level3_2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '96ff4dC059N/KDA6vr6Zvry', '_Guide_level3_2');
// GodGuide/_Guide_level3_2.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideUtils_1 = require("./GuideUtils");
var MapIslandUtils_1 = require("../Script/Logic/SimulationOperation/View/Map/MapIslandUtils");
var MoneyManager_1 = require("../Script/Logic/Data/MoneyManager");
var GuideData_1 = require("./GuideData");
exports.task = {
    name: "关卡3 引导海岛解锁码头",
    debug: false,
    autorun: false,
    filename: "_Guide_level3_2",
    steps: [
        {
            guideId: 3031001,
            desc: "文字 ",
            onStart: function (next) {
                var result = MapIslandUtils_1.default.checkBuildFixed(16) || MapIslandUtils_1.default.checkBuildFinished(16);
                if (result) {
                    next(GuideUtils_1.EGuideStart.Stop); //如果16游艇以及解锁和修理 停止后面引导
                    GuideData_1.GuideData.pushFinishedTask("_Guide_level3_2");
                }
                else {
                    next(GuideUtils_1.EGuideStart.None);
                }
            },
            command: { cmd: "text", args: "接下来让我们来修理一下小码头吧~", role: 1, positionY: -500 },
            if: "checkNoDialogUI,checkAtMapScene",
            noCheckDone: true
        },
        {
            guideId: 3031002,
            desc: "指引修复小码头",
            onStart: function (next) {
                var result = MapIslandUtils_1.default.checkBuildFixed(16);
                if (result) {
                    next(GuideUtils_1.EGuideStart.Stop); //如果码头16以及解锁和修理 停止后面引导
                }
                else {
                    next(GuideUtils_1.EGuideStart.None);
                }
            },
            command: { cmd: "finger", args: "Map > Wharf > B16_xiaomatou > LockItem", type: "MapItem", maskType: 1 },
            if: "checkNoDialogUI,checkAtMapScene",
        },
        {
            guideId: 3031004,
            desc: "点击小码头的修理icon",
            command: { cmd: "finger", args: "BuildTool/unlock", type: "MapUI", maskType: 1 },
            if: "checkAtMapScene",
        },
        {
            guideId: 3031005,
            desc: "文字提示去游玩关卡",
            onStart: function (next) {
                var buildConfig = MapIslandUtils_1.default.getBuildConfigById(16);
                var moneyCheck = MoneyManager_1.MoneyManager.CheckMoneyJson(buildConfig.price[0], false, MoneyManager_1.MoneyTipsType.None);
                if (moneyCheck) {
                    next(GuideUtils_1.EGuideStart.Stop); //如果15游艇以及解锁和修理 停止后面引导
                }
                else {
                    next(GuideUtils_1.EGuideStart.None);
                }
            },
            command: { cmd: "text", args: "金币不太够啊，消除可以获得金币和星级，我们先去进行消除游戏吧！", role: 1, positionY: -500 },
        },
        {
            guideId: 3031006,
            desc: "点击开始游戏按钮",
            command: { cmd: 'finger', args: 'UIRoot:SelectShowTarget/btn_green' },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXF9HdWlkZV9sZXZlbDNfMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyQ0FBMkM7QUFHM0MsOEZBQXlGO0FBQ3pGLGtFQUFnRjtBQUNoRix5Q0FBd0M7QUFFM0IsUUFBQSxJQUFJLEdBQUc7SUFDaEIsSUFBSSxFQUFFLGNBQWM7SUFDcEIsS0FBSyxFQUFFLEtBQUs7SUFDWixPQUFPLEVBQUUsS0FBSztJQUNkLFFBQVEsRUFBRSxpQkFBaUI7SUFDM0IsS0FBSyxFQUFFO1FBQ0g7WUFDSSxPQUFPLEVBQUUsT0FBTztZQUNoQixJQUFJLEVBQUUsS0FBSztZQUNYLE9BQU8sWUFBQyxJQUFJO2dCQUNSLElBQUksTUFBTSxHQUFHLHdCQUFjLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxJQUFJLHdCQUFjLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pGLElBQUksTUFBTSxFQUFFO29CQUNSLElBQUksQ0FBQyx3QkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUUsc0JBQXNCO29CQUMvQyxxQkFBUyxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUM7aUJBQ2pEO3FCQUFNO29CQUNILElBQUksQ0FBQyx3QkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMxQjtZQUNMLENBQUM7WUFDRCxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUM1RSxFQUFFLEVBQUUsaUNBQWlDO1lBQ3JDLFdBQVcsRUFBRSxJQUFJO1NBQ3BCO1FBQ0Q7WUFDSSxPQUFPLEVBQUUsT0FBTztZQUNoQixJQUFJLEVBQUUsU0FBUztZQUNmLE9BQU8sWUFBQyxJQUFJO2dCQUNSLElBQUksTUFBTSxHQUFHLHdCQUFjLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLE1BQU0sRUFBRTtvQkFDUixJQUFJLENBQUMsd0JBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFFLHNCQUFzQjtpQkFDbEQ7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLHdCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzFCO1lBQ0wsQ0FBQztZQUNELE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLHdDQUF3QyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRTtZQUN4RyxFQUFFLEVBQUUsaUNBQWlDO1NBQ3hDO1FBQ0Q7WUFDSSxPQUFPLEVBQUUsT0FBTztZQUNoQixJQUFJLEVBQUUsY0FBYztZQUNwQixPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUU7WUFDaEYsRUFBRSxFQUFFLGlCQUFpQjtTQUN4QjtRQUNEO1lBQ0ksT0FBTyxFQUFFLE9BQU87WUFDaEIsSUFBSSxFQUFFLFdBQVc7WUFDakIsT0FBTyxZQUFDLElBQUk7Z0JBQ1IsSUFBSSxXQUFXLEdBQUcsd0JBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDeEQsSUFBSSxVQUFVLEdBQUcsMkJBQVksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsNEJBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDOUYsSUFBSSxVQUFVLEVBQUU7b0JBQ1osSUFBSSxDQUFDLHdCQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBRSxzQkFBc0I7aUJBQ2xEO3FCQUFNO29CQUNILElBQUksQ0FBQyx3QkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMxQjtZQUNMLENBQUM7WUFDRCxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRTtTQUU5RjtRQUNEO1lBQ0ksT0FBTyxFQUFFLE9BQU87WUFDaEIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsbUNBQW1DLEVBQUU7U0FFeEU7S0FDSjtDQUNKLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHdWlkZUNvbmRpdGlvbiB9IGZyb20gXCIuL0d1aWRlQ29uZGl0aW9uXCJcbmltcG9ydCB7IEVHdWlkZVN0YXJ0IH0gZnJvbSBcIi4vR3VpZGVVdGlsc1wiO1xuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi9TY3JpcHQvQmFzZS9NYW5hZ2VyL0V2ZW50TWdyXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi9TY3JpcHQvTG9naWMvRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IE1hcElzbGFuZFV0aWxzIGZyb20gXCIuLi9TY3JpcHQvTG9naWMvU2ltdWxhdGlvbk9wZXJhdGlvbi9WaWV3L01hcC9NYXBJc2xhbmRVdGlsc1wiO1xuaW1wb3J0IHsgTW9uZXlNYW5hZ2VyLCBNb25leVRpcHNUeXBlIH0gZnJvbSBcIi4uL1NjcmlwdC9Mb2dpYy9EYXRhL01vbmV5TWFuYWdlclwiO1xuaW1wb3J0IHsgR3VpZGVEYXRhIH0gZnJvbSBcIi4vR3VpZGVEYXRhXCI7XG5cbmV4cG9ydCBjb25zdCB0YXNrID0ge1xuICAgIG5hbWU6IFwi5YWz5Y2hMyDlvJXlr7zmtbflspvop6PplIHnoIHlpLRcIixcbiAgICBkZWJ1ZzogZmFsc2UsXG4gICAgYXV0b3J1bjogZmFsc2UsXG4gICAgZmlsZW5hbWU6IFwiX0d1aWRlX2xldmVsM18yXCIsXG4gICAgc3RlcHM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZ3VpZGVJZDogMzAzMTAwMSxcbiAgICAgICAgICAgIGRlc2M6IFwi5paH5a2XIFwiLFxuICAgICAgICAgICAgb25TdGFydChuZXh0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IE1hcElzbGFuZFV0aWxzLmNoZWNrQnVpbGRGaXhlZCgxNikgfHwgTWFwSXNsYW5kVXRpbHMuY2hlY2tCdWlsZEZpbmlzaGVkKDE2KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoRUd1aWRlU3RhcnQuU3RvcCk7ICAvL+WmguaenDE25ri46ImH5Lul5Y+K6Kej6ZSB5ZKM5L+u55CGIOWBnOatouWQjumdouW8leWvvFxuICAgICAgICAgICAgICAgICAgICBHdWlkZURhdGEucHVzaEZpbmlzaGVkVGFzayhcIl9HdWlkZV9sZXZlbDNfMlwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KEVHdWlkZVN0YXJ0Lk5vbmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21tYW5kOiB7IGNtZDogXCJ0ZXh0XCIsIGFyZ3M6IFwi5o6l5LiL5p2l6K6p5oiR5Lus5p2l5L+u55CG5LiA5LiL5bCP56CB5aS05ZCnflwiLCByb2xlOiAxLCBwb3NpdGlvblk6IC01MDAgfSxcbiAgICAgICAgICAgIGlmOiBcImNoZWNrTm9EaWFsb2dVSSxjaGVja0F0TWFwU2NlbmVcIixcbiAgICAgICAgICAgIG5vQ2hlY2tEb25lOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGd1aWRlSWQ6IDMwMzEwMDIsXG4gICAgICAgICAgICBkZXNjOiBcIuaMh+W8leS/ruWkjeWwj+eggeWktFwiLFxuICAgICAgICAgICAgb25TdGFydChuZXh0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IE1hcElzbGFuZFV0aWxzLmNoZWNrQnVpbGRGaXhlZCgxNik7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KEVHdWlkZVN0YXJ0LlN0b3ApOyAgLy/lpoLmnpznoIHlpLQxNuS7peWPiuino+mUgeWSjOS/rueQhiDlgZzmraLlkI7pnaLlvJXlr7xcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KEVHdWlkZVN0YXJ0Lk5vbmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21tYW5kOiB7IGNtZDogXCJmaW5nZXJcIiwgYXJnczogXCJNYXAgPiBXaGFyZiA+IEIxNl94aWFvbWF0b3UgPiBMb2NrSXRlbVwiLCB0eXBlOiBcIk1hcEl0ZW1cIiwgbWFza1R5cGU6IDEgfSxcbiAgICAgICAgICAgIGlmOiBcImNoZWNrTm9EaWFsb2dVSSxjaGVja0F0TWFwU2NlbmVcIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZ3VpZGVJZDogMzAzMTAwNCxcbiAgICAgICAgICAgIGRlc2M6IFwi54K55Ye75bCP56CB5aS055qE5L+u55CGaWNvblwiLFxuICAgICAgICAgICAgY29tbWFuZDogeyBjbWQ6IFwiZmluZ2VyXCIsIGFyZ3M6IFwiQnVpbGRUb29sL3VubG9ja1wiLCB0eXBlOiBcIk1hcFVJXCIsIG1hc2tUeXBlOiAxIH0sXG4gICAgICAgICAgICBpZjogXCJjaGVja0F0TWFwU2NlbmVcIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZ3VpZGVJZDogMzAzMTAwNSxcbiAgICAgICAgICAgIGRlc2M6IFwi5paH5a2X5o+Q56S65Y675ri4546p5YWz5Y2hXCIsXG4gICAgICAgICAgICBvblN0YXJ0KG5leHQpIHtcbiAgICAgICAgICAgICAgICBsZXQgYnVpbGRDb25maWcgPSBNYXBJc2xhbmRVdGlscy5nZXRCdWlsZENvbmZpZ0J5SWQoMTYpO1xuICAgICAgICAgICAgICAgIGxldCBtb25leUNoZWNrID0gTW9uZXlNYW5hZ2VyLkNoZWNrTW9uZXlKc29uKGJ1aWxkQ29uZmlnLnByaWNlWzBdLCBmYWxzZSwgTW9uZXlUaXBzVHlwZS5Ob25lKTtcbiAgICAgICAgICAgICAgICBpZiAobW9uZXlDaGVjaykge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KEVHdWlkZVN0YXJ0LlN0b3ApOyAgLy/lpoLmnpwxNea4uOiJh+S7peWPiuino+mUgeWSjOS/rueQhiDlgZzmraLlkI7pnaLlvJXlr7xcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KEVHdWlkZVN0YXJ0Lk5vbmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21tYW5kOiB7IGNtZDogXCJ0ZXh0XCIsIGFyZ3M6IFwi6YeR5biB5LiN5aSq5aSf5ZWK77yM5raI6Zmk5Y+v5Lul6I635b6X6YeR5biB5ZKM5pif57qn77yM5oiR5Lus5YWI5Y676L+b6KGM5raI6Zmk5ri45oiP5ZCn77yBXCIsIHJvbGU6IDEsIHBvc2l0aW9uWTogLTUwMCB9LFxuICAgICAgICAgICAgLy8gZGVsYXlUaW1lOiAxLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBndWlkZUlkOiAzMDMxMDA2LFxuICAgICAgICAgICAgZGVzYzogXCLngrnlh7vlvIDlp4vmuLjmiI/mjInpkq5cIixcbiAgICAgICAgICAgIGNvbW1hbmQ6IHsgY21kOiAnZmluZ2VyJywgYXJnczogJ1VJUm9vdDpTZWxlY3RTaG93VGFyZ2V0L2J0bl9ncmVlbicgfSxcbiAgICAgICAgICAgIC8vIGRlbGF5VGltZTogMC41LFxuICAgICAgICB9LFxuICAgIF1cbn0gIl19