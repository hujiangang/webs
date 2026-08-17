
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/_Guide_level4.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '12ae3DBMSBEwbBqxddK5KZH', '_Guide_level4');
// GodGuide/_Guide_level4.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideCondition_1 = require("./GuideCondition");
var GuideUtils_1 = require("./GuideUtils");
var MapIslandUtils_1 = require("../Script/Logic/SimulationOperation/View/Map/MapIslandUtils");
var MoneyManager_1 = require("../Script/Logic/Data/MoneyManager");
var UIMgr_1 = require("../Script/Base/Manager/UIMgr");
var UIData_1 = require("../Script/Logic/Data/Interface/UIData");
var GuideData_1 = require("./GuideData");
exports.task = {
    name: "关卡4 游戏结束 引导会继续引导海岛",
    debug: false,
    autorun: false,
    filename: "_Guide_level4",
    steps: [
        {
            guideId: 401,
            onStart: function (next) {
                if (!GuideCondition_1.GuideCondition.checkLevelFinished(4)) {
                    next(GuideUtils_1.EGuideStart.Stop);
                    return;
                }
                var result = !MapIslandUtils_1.default.checkBuildFixed(15);
                if (result) {
                    next(GuideUtils_1.EGuideStart.Stop);
                    return;
                }
                result = MapIslandUtils_1.default.checkBuildFixed(16) && MapIslandUtils_1.default.checkBuildFinished(16);
                if (result) {
                    next(GuideUtils_1.EGuideStart.Stop);
                    return;
                }
                result = GuideCondition_1.GuideCondition.checkLevel(4) && GuideCondition_1.GuideCondition.checkUIOpen("GameWin");
                if (!result) {
                    next(GuideUtils_1.EGuideStart.ConditionNotReach);
                    return;
                }
                next(GuideUtils_1.EGuideStart.None);
            },
            desc: "第四关通关引导关闭",
            command: { cmd: "text", args: "哇，这么快就通关了！让我们再去海岛上逛逛吧~", role: 1, positionY: -500 },
            if: "checkAtMatch3Scene,checkUIOpen",
            delayTime: 1,
            param: "GameWin",
        },
        {
            guideId: 402,
            onStart: function (next) {
                var result = GuideCondition_1.GuideCondition.checkLevel(4) && GuideCondition_1.GuideCondition.checkUIOpen("GameWin");
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
            guideId: 403,
            desc: "点击去海岛按钮",
            onStart: function (next) {
                if (GuideCondition_1.GuideCondition.checkUIOpen("SelectShowTarget")) {
                    UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.SelectShowTarget);
                }
                next(GuideUtils_1.EGuideStart.None);
            },
            command: { cmd: 'finger', args: 'UI > Bottom > goMapBtn' },
            if: "checkAtLevelScene",
            delayTime: 1,
        },
        {
            guideId: 404,
            onStart: function (next) {
                if (GuideCondition_1.GuideCondition.checkUIOpen("BuildSuccess")) {
                    next(GuideUtils_1.EGuideStart.Stop);
                    return;
                }
                if (!MapIslandUtils_1.default.mapLoadFinished) {
                    next(GuideUtils_1.EGuideStart.Stop);
                    return;
                }
                var result = MapIslandUtils_1.default.checkBuildFixed(16) && MapIslandUtils_1.default.checkBuildFinished(16);
                if (result) {
                    GuideData_1.GuideData.pushFinishedTask("_Guide_level4");
                    next(GuideUtils_1.EGuideStart.Stop);
                }
                else {
                    next(GuideUtils_1.EGuideStart.None);
                }
            },
            desc: "文字 ",
            command: { cmd: "text", args: "再来修复一次吧，这次我们有足够的金币了~", role: 1, positionY: -500 },
            if: "checkAtMapScene",
            delayTime: 1,
            noCheckDone: true,
        },
        {
            guideId: 405,
            desc: "指引修复小码头",
            onStart: function (next) {
                var result = MapIslandUtils_1.default.checkBuildFixed(16) && MapIslandUtils_1.default.checkBuildFinished(16);
                if (result) {
                    next(GuideUtils_1.EGuideStart.Stop);
                }
                else {
                    next(GuideUtils_1.EGuideStart.None);
                }
            },
            command: { cmd: "finger", args: "Map > Wharf > B16_xiaomatou > LockItem", type: "MapItem", maskType: 1 },
            if: "checkNoDialogUI,checkAtMapScene",
            // delayTime: 1,
            noCheckDone: true,
        },
        {
            guideId: 406,
            desc: "指引修理小码头",
            onStart: function (next) {
                var result = MapIslandUtils_1.default.checkBuildFixed(16);
                if (result) {
                    next(GuideUtils_1.EGuideStart.ConditionNotReach);
                }
                else {
                    var buildConfig = MapIslandUtils_1.default.getBuildConfigById(16);
                    var moneyCheck = MoneyManager_1.MoneyManager.CheckMoneyJson(buildConfig.price[0], false, MoneyManager_1.MoneyTipsType.None);
                    if (!moneyCheck) {
                        next(GuideUtils_1.EGuideStart.Stop);
                        return;
                    }
                    next(GuideUtils_1.EGuideStart.None);
                }
            },
            command: { cmd: "finger", args: "BuildTool/unlock", type: "MapUI", maskType: 1 },
            if: "checkNoDialogUI,checkAtMapScene",
            // delayTime: 1,
            noCheckDone: true,
        },
        {
            guideId: 407,
            desc: "点击码头icon的两个",
            // command: { cmd: "finger", args: "BuildTool/exchange/content/GuideNode", type: "MapUI", hideFinger: true },
            command: { cmd: "finger", args: "BuildTool/exchange/content", type: "MapUI", hideFinger: true, maskType: 1 },
            if: "checkAtMapScene",
            noCheckDone: true,
        },
        {
            guideId: 408,
            desc: "点击码头icon的确定按钮",
            command: { cmd: "finger", args: "BuildTool/exchange/btn_confirm", type: "MapUI" },
            if: "checkAtMapScene",
            noCheckDone: true,
        }, {
            guideId: 409,
            desc: "结束语",
            command: { cmd: "text", args: "小岛的重建任重而道远啊，让我们一起加油吧！", role: 1, positionY: -500 },
            if: "checkAtMapScene",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXF9HdWlkZV9sZXZlbDQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQWlEO0FBQ2pELDJDQUEyQztBQUczQyw4RkFBeUY7QUFDekYsa0VBQWdGO0FBQ2hGLHNEQUFpRDtBQUNqRCxnRUFBaUU7QUFDakUseUNBQXdDO0FBRTNCLFFBQUEsSUFBSSxHQUFHO0lBQ2hCLElBQUksRUFBRSxvQkFBb0I7SUFDMUIsS0FBSyxFQUFFLEtBQUs7SUFDWixPQUFPLEVBQUUsS0FBSztJQUNkLFFBQVEsRUFBRSxlQUFlO0lBQ3pCLEtBQUssRUFBRTtRQUNIO1lBQ0ksT0FBTyxFQUFFLEdBQUc7WUFDWixPQUFPLFlBQUMsSUFBSTtnQkFDUixJQUFJLENBQUMsK0JBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDdkMsSUFBSSxDQUFDLHdCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3ZCLE9BQU87aUJBQ1Y7Z0JBQ0QsSUFBSSxNQUFNLEdBQUcsQ0FBQyx3QkFBYyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakQsSUFBSSxNQUFNLEVBQUU7b0JBQ1IsSUFBSSxDQUFDLHdCQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3ZCLE9BQU87aUJBQ1Y7Z0JBQ0QsTUFBTSxHQUFHLHdCQUFjLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxJQUFJLHdCQUFjLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3JGLElBQUksTUFBTSxFQUFFO29CQUNSLElBQUksQ0FBQyx3QkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN2QixPQUFPO2lCQUNWO2dCQUNELE1BQU0sR0FBRywrQkFBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSwrQkFBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDL0UsSUFBSSxDQUFDLE1BQU0s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QXVCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDakYsRUFBRSxFQUFFLGlCQUFpQjtTQUN4QjtLQUNKO0NBQ0osQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEd1aWRlQ29uZGl0aW9uIH0gZnJvbSBcIi4vR3VpZGVDb25kaXRpb25cIlxuaW1wb3J0IHsgRUd1aWRlU3RhcnQgfSBmcm9tIFwiLi9HdWlkZVV0aWxzXCI7XG5pbXBvcnQgRXZlbnRNZ3IgZnJvbSBcIi4uL1NjcmlwdC9CYXNlL01hbmFnZXIvRXZlbnRNZ3JcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uL1NjcmlwdC9Mb2dpYy9EYXRhL0NvbnN0L0V2ZW50XCI7XG5pbXBvcnQgTWFwSXNsYW5kVXRpbHMgZnJvbSBcIi4uL1NjcmlwdC9Mb2dpYy9TaW11bGF0aW9uT3BlcmF0aW9uL1ZpZXcvTWFwL01hcElzbGFuZFV0aWxzXCI7XG5pbXBvcnQgeyBNb25leU1hbmFnZXIsIE1vbmV5VGlwc1R5cGUgfSBmcm9tIFwiLi4vU2NyaXB0L0xvZ2ljL0RhdGEvTW9uZXlNYW5hZ2VyXCI7XG5pbXBvcnQgVUlNZ3IgZnJvbSBcIi4uL1NjcmlwdC9CYXNlL01hbmFnZXIvVUlNZ3JcIjtcbmltcG9ydCB7IFVJSHVkRGVmIH0gZnJvbSBcIi4uL1NjcmlwdC9Mb2dpYy9EYXRhL0ludGVyZmFjZS9VSURhdGFcIjtcbmltcG9ydCB7IEd1aWRlRGF0YSB9IGZyb20gXCIuL0d1aWRlRGF0YVwiO1xuXG5leHBvcnQgY29uc3QgdGFzayA9IHtcbiAgICBuYW1lOiBcIuWFs+WNoTQg5ri45oiP57uT5p2fIOW8leWvvOS8mue7p+e7reW8leWvvOa1t+Wym1wiLFxuICAgIGRlYnVnOiBmYWxzZSxcbiAgICBhdXRvcnVuOiBmYWxzZSxcbiAgICBmaWxlbmFtZTogXCJfR3VpZGVfbGV2ZWw0XCIsXG4gICAgc3RlcHM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgZ3VpZGVJZDogNDAxLFxuICAgICAgICAgICAgb25TdGFydChuZXh0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFHdWlkZUNvbmRpdGlvbi5jaGVja0xldmVsRmluaXNoZWQoNCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChFR3VpZGVTdGFydC5TdG9wKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gIU1hcElzbGFuZFV0aWxzLmNoZWNrQnVpbGRGaXhlZCgxNSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KEVHdWlkZVN0YXJ0LlN0b3ApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IE1hcElzbGFuZFV0aWxzLmNoZWNrQnVpbGRGaXhlZCgxNikgJiYgTWFwSXNsYW5kVXRpbHMuY2hlY2tCdWlsZEZpbmlzaGVkKDE2KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoRUd1aWRlU3RhcnQuU3RvcCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gR3VpZGVDb25kaXRpb24uY2hlY2tMZXZlbCg0KSAmJiBHdWlkZUNvbmRpdGlvbi5jaGVja1VJT3BlbihcIkdhbWVXaW5cIik7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChFR3VpZGVTdGFydC5Db25kaXRpb25Ob3RSZWFjaCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV4dChFR3VpZGVTdGFydC5Ob25lKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjOiBcIuesrOWbm+WFs+mAmuWFs+W8leWvvOWFs+mXrVwiLFxuICAgICAgICAgICAgY29tbWFuZDogeyBjbWQ6IFwidGV4dFwiLCBhcmdzOiBcIuWTh++8jOi/meS5iOW/q+WwsemAmuWFs+S6hu+8geiuqeaIkeS7rOWGjeWOu+a1t+Wym+S4iumAm+mAm+WQp35cIiwgcm9sZTogMSwgcG9zaXRpb25ZOiAtNTAwIH0sXG4gICAgICAgICAgICBpZjogXCJjaGVja0F0TWF0Y2gzU2NlbmUsY2hlY2tVSU9wZW5cIixcbiAgICAgICAgICAgIGRlbGF5VGltZTogMSxcbiAgICAgICAgICAgIHBhcmFtOiBcIkdhbWVXaW5cIixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZ3VpZGVJZDogNDAyLFxuICAgICAgICAgICAgb25TdGFydChuZXh0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IEd1aWRlQ29uZGl0aW9uLmNoZWNrTGV2ZWwoNCkgJiYgR3VpZGVDb25kaXRpb24uY2hlY2tVSU9wZW4oXCJHYW1lV2luXCIpOztcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KEVHdWlkZVN0YXJ0LkNvbmRpdGlvbk5vdFJlYWNoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoR3VpZGVDb25kaXRpb24uY2hlY2tVSU9wZW4oXCJTZWxlY3RTaG93VGFyZ2V0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIFVJTWdyLmlucy5jbG9zZVVJKFVJSHVkRGVmLlNlbGVjdFNob3dUYXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0KEVHdWlkZVN0YXJ0Lk5vbmUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2M6IFwi5YWz6Zet566t5aS0XCIsXG4gICAgICAgICAgICBjb21tYW5kOiB7IGNtZDogXCJmaW5nZXJcIiwgYXJnczogXCJVSVJvb3Q6R2FtZVdpbi9idG5fYmFja1wiIH0sXG4gICAgICAgICAgICAvLyBkZWxheVRpbWU6IDEsXG4gICAgICAgICAgICBpZjogXCJjaGVja1VJT3BlblwiLFxuICAgICAgICAgICAgcGFyYW06IFwiR2FtZVdpblwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBndWlkZUlkOiA0MDMsXG4gICAgICAgICAgICBkZXNjOiBcIueCueWHu+WOu+a1t+Wym+aMiemSrlwiLFxuICAgICAgICAgICAgb25TdGFydChuZXh0KSB7XG4gICAgICAgICAgICAgICAgaWYgKEd1aWRlQ29uZGl0aW9uLmNoZWNrVUlPcGVuKFwiU2VsZWN0U2hvd1RhcmdldFwiKSkge1xuICAgICAgICAgICAgICAgICAgICBVSU1nci5pbnMuY2xvc2VVSShVSUh1ZERlZi5TZWxlY3RTaG93VGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV4dChFR3VpZGVTdGFydC5Ob25lKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21tYW5kOiB7IGNtZDogJ2ZpbmdlcicsIGFyZ3M6ICdVSSA+IEJvdHRvbSA+IGdvTWFwQnRuJyB9LFxuICAgICAgICAgICAgaWY6IFwiY2hlY2tBdExldmVsU2NlbmVcIixcbiAgICAgICAgICAgIGRlbGF5VGltZTogMSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZ3VpZGVJZDogNDA0LFxuICAgICAgICAgICAgb25TdGFydChuZXh0KSB7XG4gICAgICAgICAgICAgICAgaWYgKEd1aWRlQ29uZGl0aW9uLmNoZWNrVUlPcGVuKFwiQnVpbGRTdWNjZXNzXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoRUd1aWRlU3RhcnQuU3RvcCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFNYXBJc2xhbmRVdGlscy5tYXBMb2FkRmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChFR3VpZGVTdGFydC5TdG9wKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gTWFwSXNsYW5kVXRpbHMuY2hlY2tCdWlsZEZpeGVkKDE2KSAmJiBNYXBJc2xhbmRVdGlscy5jaGVja0J1aWxkRmluaXNoZWQoMTYpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgR3VpZGVEYXRhLnB1c2hGaW5pc2hlZFRhc2soXCJfR3VpZGVfbGV2ZWw0XCIpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0KEVHdWlkZVN0YXJ0LlN0b3ApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoRUd1aWRlU3RhcnQuTm9uZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc2M6IFwi5paH5a2XIFwiLFxuICAgICAgICAgICAgY29tbWFuZDogeyBjbWQ6IFwidGV4dFwiLCBhcmdzOiBcIuWGjeadpeS/ruWkjeS4gOasoeWQp++8jOi/measoeaIkeS7rOaciei2s+Wkn+eahOmHkeW4geS6hn5cIiwgcm9sZTogMSwgcG9zaXRpb25ZOiAtNTAwIH0sXG4gICAgICAgICAgICBpZjogXCJjaGVja0F0TWFwU2NlbmVcIixcbiAgICAgICAgICAgIGRlbGF5VGltZTogMSxcbiAgICAgICAgICAgIG5vQ2hlY2tEb25lOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBndWlkZUlkOiA0MDUsXG4gICAgICAgICAgICBkZXNjOiBcIuaMh+W8leS/ruWkjeWwj+eggeWktFwiLFxuICAgICAgICAgICAgb25TdGFydChuZXh0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IE1hcElzbGFuZFV0aWxzLmNoZWNrQnVpbGRGaXhlZCgxNikgJiYgTWFwSXNsYW5kVXRpbHMuY2hlY2tCdWlsZEZpbmlzaGVkKDE2KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoRUd1aWRlU3RhcnQuU3RvcCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChFR3VpZGVTdGFydC5Ob25lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tbWFuZDogeyBjbWQ6IFwiZmluZ2VyXCIsIGFyZ3M6IFwiTWFwID4gV2hhcmYgPiBCMTZfeGlhb21hdG91ID4gTG9ja0l0ZW1cIiwgdHlwZTogXCJNYXBJdGVtXCIsIG1hc2tUeXBlOiAxIH0sXG4gICAgICAgICAgICBpZjogXCJjaGVja05vRGlhbG9nVUksY2hlY2tBdE1hcFNjZW5lXCIsXG4gICAgICAgICAgICAvLyBkZWxheVRpbWU6IDEsXG4gICAgICAgICAgICBub0NoZWNrRG9uZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZ3VpZGVJZDogNDA2LFxuICAgICAgICAgICAgZGVzYzogXCLmjIflvJXkv67nkIblsI/noIHlpLRcIixcbiAgICAgICAgICAgIG9uU3RhcnQobmV4dCkge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBNYXBJc2xhbmRVdGlscy5jaGVja0J1aWxkRml4ZWQoMTYpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChFR3VpZGVTdGFydC5Db25kaXRpb25Ob3RSZWFjaCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1aWxkQ29uZmlnID0gTWFwSXNsYW5kVXRpbHMuZ2V0QnVpbGRDb25maWdCeUlkKDE2KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vbmV5Q2hlY2sgPSBNb25leU1hbmFnZXIuQ2hlY2tNb25leUpzb24oYnVpbGRDb25maWcucHJpY2VbMF0sIGZhbHNlLCBNb25leVRpcHNUeXBlLk5vbmUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW1vbmV5Q2hlY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQoRUd1aWRlU3RhcnQuU3RvcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbmV4dChFR3VpZGVTdGFydC5Ob25lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tbWFuZDogeyBjbWQ6IFwiZmluZ2VyXCIsIGFyZ3M6IFwiQnVpbGRUb29sL3VubG9ja1wiLCB0eXBlOiBcIk1hcFVJXCIsIG1hc2tUeXBlOiAxIH0sXG4gICAgICAgICAgICBpZjogXCJjaGVja05vRGlhbG9nVUksY2hlY2tBdE1hcFNjZW5lXCIsXG4gICAgICAgICAgICAvLyBkZWxheVRpbWU6IDEsXG4gICAgICAgICAgICBub0NoZWNrRG9uZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZ3VpZGVJZDogNDA3LFxuICAgICAgICAgICAgZGVzYzogXCLngrnlh7vnoIHlpLRpY29u55qE5Lik5LiqXCIsXG4gICAgICAgICAgICAvLyBjb21tYW5kOiB7IGNtZDogXCJmaW5nZXJcIiwgYXJnczogXCJCdWlsZFRvb2wvZXhjaGFuZ2UvY29udGVudC9HdWlkZU5vZGVcIiwgdHlwZTogXCJNYXBVSVwiLCBoaWRlRmluZ2VyOiB0cnVlIH0sXG4gICAgICAgICAgICBjb21tYW5kOiB7IGNtZDogXCJmaW5nZXJcIiwgYXJnczogXCJCdWlsZFRvb2wvZXhjaGFuZ2UvY29udGVudFwiLCB0eXBlOiBcIk1hcFVJXCIsIGhpZGVGaW5nZXI6IHRydWUsIG1hc2tUeXBlOiAxIH0sXG4gICAgICAgICAgICBpZjogXCJjaGVja0F0TWFwU2NlbmVcIixcbiAgICAgICAgICAgIG5vQ2hlY2tEb25lOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBndWlkZUlkOiA0MDgsXG4gICAgICAgICAgICBkZXNjOiBcIueCueWHu+eggeWktGljb27nmoTnoa7lrprmjInpkq5cIixcbiAgICAgICAgICAgIGNvbW1hbmQ6IHsgY21kOiBcImZpbmdlclwiLCBhcmdzOiBcIkJ1aWxkVG9vbC9leGNoYW5nZS9idG5fY29uZmlybVwiLCB0eXBlOiBcIk1hcFVJXCIgfSxcbiAgICAgICAgICAgIGlmOiBcImNoZWNrQXRNYXBTY2VuZVwiLFxuICAgICAgICAgICAgbm9DaGVja0RvbmU6IHRydWUsXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGd1aWRlSWQ6IDQwOSxcbiAgICAgICAgICAgIGRlc2M6IFwi57uT5p2f6K+tXCIsXG4gICAgICAgICAgICBjb21tYW5kOiB7IGNtZDogXCJ0ZXh0XCIsIGFyZ3M6IFwi5bCP5bKb55qE6YeN5bu65Lu76YeN6ICM6YGT6L+c5ZWK77yM6K6p5oiR5Lus5LiA6LW35Yqg5rK55ZCn77yBXCIsIHJvbGU6IDEsIHBvc2l0aW9uWTogLTUwMCB9LFxuICAgICAgICAgICAgaWY6IFwiY2hlY2tBdE1hcFNjZW5lXCIsXG4gICAgICAgIH1cbiAgICBdXG59ICJdfQ==