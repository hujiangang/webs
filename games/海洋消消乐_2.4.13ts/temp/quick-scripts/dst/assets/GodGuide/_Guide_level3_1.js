
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/_Guide_level3_1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '781acgeGq9DupGyX7A1TVUk', '_Guide_level3_1');
// GodGuide/_Guide_level3_1.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideUtils_1 = require("./GuideUtils");
var EventMgr_1 = require("../Script/Base/Manager/EventMgr");
var Event_1 = require("../Script/Logic/Data/Const/Event");
var MapIslandUtils_1 = require("../Script/Logic/SimulationOperation/View/Map/MapIslandUtils");
var MoneyManager_1 = require("../Script/Logic/Data/MoneyManager");
var GuideData_1 = require("./GuideData");
exports.task = {
    name: "关卡3 引导海岛解锁游艇",
    debug: false,
    autorun: false,
    filename: "_Guide_level3_1",
    steps: [
        {
            guideId: 3030002,
            desc: "显示对话",
            onStart: function (next) {
                if (!MapIslandUtils_1.default.mapLoadFinished) {
                    next(GuideUtils_1.EGuideStart.Stop);
                    return;
                }
                var result = MapIslandUtils_1.default.checkBuildFixed(15) && MapIslandUtils_1.default.checkBuildFinished(15);
                if (result) {
                    GuideData_1.GuideData.pushFinishedTask("_Guide_level3_1");
                    next(GuideUtils_1.EGuideStart.Stop); //如果15游艇以及解锁和修理 停止后面引导
                    return;
                }
                next(GuideUtils_1.EGuideStart.None);
            },
            command: { cmd: "text", args: "天哪，小岛竟然变成这个样子了，我一定要将它还原成过去的样子！你能帮帮我么？", role: 1, positionY: -500 },
            delayTime: 1,
            if: "checkAtMapScene",
            noCheckDone: true,
        },
        {
            guideId: 3030003,
            desc: "显示对话",
            command: { cmd: "text", args: "首先，让我们先点击修复按钮，这艘船看起来能很快修好。", role: 1, positionY: -500 },
            if: "checkAtMapScene",
            noCheckDone: true,
        },
        {
            guideId: 3030004,
            desc: "指引船只的点击修理icon",
            onStart: function (next) {
                EventMgr_1.default.ins.send(Event_1.Event.Map.MapTouchMoveEnable, false);
                next(GuideUtils_1.EGuideStart.None);
            },
            command: { cmd: "finger", args: "Map > Wharf > B15_boat > LockItem", type: "MapItem", maskType: 1 },
            if: "checkAtMapScene",
            noCheckDone: true,
        },
        {
            guideId: 3030005,
            onStart: function (next) {
                var result = MapIslandUtils_1.default.checkBuildFixed(15);
                if (result) {
                    next(GuideUtils_1.EGuideStart.ConditionNotReach);
                }
                else {
                    var buildConfig = MapIslandUtils_1.default.getBuildConfigById(15);
                    var moneyCheck = MoneyManager_1.MoneyManager.CheckMoneyJson(buildConfig.price[0], false, MoneyManager_1.MoneyTipsType.None);
                    if (!moneyCheck) {
                        next(GuideUtils_1.EGuideStart.Stop);
                        return;
                    }
                    next(GuideUtils_1.EGuideStart.None);
                }
            },
            desc: "点击船只的修理icon",
            command: { cmd: "finger", args: "BuildTool/unlock", type: "MapUI", maskType: 1 },
            if: "checkAtMapScene",
            noCheckDone: true,
        },
        {
            guideId: 3030006,
            desc: "文字显示",
            onStart: function (next) {
                var result = MapIslandUtils_1.default.checkBuildFinished(15);
                if (result) {
                    next(GuideUtils_1.EGuideStart.Stop);
                }
                else {
                    next(GuideUtils_1.EGuideStart.None);
                }
            },
            command: { cmd: "text", args: "竟然有2种样式可以选择，选一种进行装扮吧！记得点击右边的'√'保存你的选择哟~", role: 1, positionY: -500 },
            if: "checkAtMapScene",
            noCheckDone: true,
        },
        {
            guideId: 3030007,
            desc: "点击船只icon的两个",
            // command: { cmd: "finger", args: "BuildTool/exchange/content/GuideNode", type: "MapUI", hideFinger: true },
            command: { cmd: "finger", args: "BuildTool/exchange/content", type: "MapUI", hideFinger: true, maskType: 1 },
            if: "checkAtMapScene",
            noCheckDone: true,
        },
        {
            guideId: 3030008,
            desc: "点击船只icon的确定按钮",
            command: { cmd: "finger", args: "BuildTool/exchange/btn_confirm", type: "MapUI" },
            if: "checkAtMapScene",
            noCheckDone: true
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXF9HdWlkZV9sZXZlbDNfMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyQ0FBMkM7QUFDM0MsNERBQXVEO0FBQ3ZELDBEQUF5RDtBQUN6RCw4RkFBeUY7QUFDekYsa0VBQWdGO0FBQ2hGLHlDQUF3QztBQUUzQixRQUFBLElBQUksR0FBRztJQUNoQixJQUFJLEVBQUUsY0FBYztJQUNwQixLQUFLLEVBQUUsS0FBSztJQUNaLE9BQU8sRUFBRSxLQUFLO0lBQ2QsUUFBUSxFQUFFLGlCQUFpQjtJQUMzQixLQUFLLEVBQUU7UUFDSDtZQUNJLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxZQUFDLElBQUk7Z0JBQ1IsSUFBSSxDQUFDLHdCQUFjLENBQUMsZUFBZSxFQUFFO29CQUNqQyxJQUFJLENBQUMsd0JBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdkIsT0FBTztpQkFDVjtnQkFDRCxJQUFJLE1BQU0sR0FBRyx3QkFBYyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsSUFBSSx3QkFBYyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RixJQUFJLE1BQU0sRUFBRTtvQkFDUixxQkFBUyxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQzlDLElBQUksQ0FBQyx3QkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUUsc0JBQXNCO29CQUMvQyxPQUFPO2lCQUNWO2dCQUNELElBQUksQ0FBQyx3QkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLENBQUM7WUFDRCxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSx1Q0FBdUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUNqRyxTQUFTLEVBQUUsQ0FBQztZQUNaLEVBQUUsRUFBRSxp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QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFO1lBQzVHLEVBQUUsRUFBRSxpQkFBaUI7WUFDckIsV0FBVyxFQUFFLElBQUk7U0FDcEI7UUFDRDtZQUNJLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLElBQUksRUFBRSxlQUFlO1lBQ3JCLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGdDQUFnQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7WUFDakYsRUFBRSxFQUFFLGlCQUFpQjtZQUNyQixXQUFXLEVBQUUsSUFBSTtTQUNwQjtLQUNKO0NBQ0osQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEd1aWRlQ29uZGl0aW9uIH0gZnJvbSBcIi4vR3VpZGVDb25kaXRpb25cIlxuaW1wb3J0IHsgRUd1aWRlU3RhcnQgfSBmcm9tIFwiLi9HdWlkZVV0aWxzXCI7XG5pbXBvcnQgRXZlbnRNZ3IgZnJvbSBcIi4uL1NjcmlwdC9CYXNlL01hbmFnZXIvRXZlbnRNZ3JcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uL1NjcmlwdC9Mb2dpYy9EYXRhL0NvbnN0L0V2ZW50XCI7XG5pbXBvcnQgTWFwSXNsYW5kVXRpbHMgZnJvbSBcIi4uL1NjcmlwdC9Mb2dpYy9TaW11bGF0aW9uT3BlcmF0aW9uL1ZpZXcvTWFwL01hcElzbGFuZFV0aWxzXCI7XG5pbXBvcnQgeyBNb25leU1hbmFnZXIsIE1vbmV5VGlwc1R5cGUgfSBmcm9tIFwiLi4vU2NyaXB0L0xvZ2ljL0RhdGEvTW9uZXlNYW5hZ2VyXCI7XG5pbXBvcnQgeyBHdWlkZURhdGEgfSBmcm9tIFwiLi9HdWlkZURhdGFcIjtcblxuZXhwb3J0IGNvbnN0IHRhc2sgPSB7XG4gICAgbmFtZTogXCLlhbPljaEzIOW8leWvvOa1t+Wym+ino+mUgea4uOiJh1wiLFxuICAgIGRlYnVnOiBmYWxzZSxcbiAgICBhdXRvcnVuOiBmYWxzZSxcbiAgICBmaWxlbmFtZTogXCJfR3VpZGVfbGV2ZWwzXzFcIixcbiAgICBzdGVwczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBndWlkZUlkOiAzMDMwMDAyLFxuICAgICAgICAgICAgZGVzYzogXCLmmL7npLrlr7nor51cIixcbiAgICAgICAgICAgIG9uU3RhcnQobmV4dCkge1xuICAgICAgICAgICAgICAgIGlmICghTWFwSXNsYW5kVXRpbHMubWFwTG9hZEZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoRUd1aWRlU3RhcnQuU3RvcCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IE1hcElzbGFuZFV0aWxzLmNoZWNrQnVpbGRGaXhlZCgxNSkgJiYgTWFwSXNsYW5kVXRpbHMuY2hlY2tCdWlsZEZpbmlzaGVkKDE1KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIEd1aWRlRGF0YS5wdXNoRmluaXNoZWRUYXNrKFwiX0d1aWRlX2xldmVsM18xXCIpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0KEVHdWlkZVN0YXJ0LlN0b3ApOyAgLy/lpoLmnpwxNea4uOiJh+S7peWPiuino+mUgeWSjOS/rueQhiDlgZzmraLlkI7pnaLlvJXlr7xcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0KEVHdWlkZVN0YXJ0Lk5vbmUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbW1hbmQ6IHsgY21kOiBcInRleHRcIiwgYXJnczogXCLlpKnlk6rvvIzlsI/lspvnq5/nhLblj5jmiJDov5nkuKrmoLflrZDkuobvvIzmiJHkuIDlrpropoHlsIblroPov5jljp/miJDov4fljrvnmoTmoLflrZDvvIHkvaDog73luK7luK7miJHkuYjvvJ9cIiwgcm9sZTogMSwgcG9zaXRpb25ZOiAtNTAwIH0sXG4gICAgICAgICAgICBkZWxheVRpbWU6IDEsXG4gICAgICAgICAgICBpZjogXCJjaGVja0F0TWFwU2NlbmVcIixcbiAgICAgICAgICAgIG5vQ2hlY2tEb25lOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBndWlkZUlkOiAzMDMwMDAzLFxuICAgICAgICAgICAgZGVzYzogXCLmmL7npLrlr7nor51cIixcbiAgICAgICAgICAgIGNvbW1hbmQ6IHsgY21kOiBcInRleHRcIiwgYXJnczogXCLpppblhYjvvIzorqnmiJHku6zlhYjngrnlh7vkv67lpI3mjInpkq7vvIzov5noiZjoiLnnnIvotbfmnaXog73lvojlv6vkv67lpb3jgIJcIiwgcm9sZTogMSwgcG9zaXRpb25ZOiAtNTAwIH0sXG4gICAgICAgICAgICBpZjogXCJjaGVja0F0TWFwU2NlbmVcIixcbiAgICAgICAgICAgIG5vQ2hlY2tEb25lOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBndWlkZUlkOiAzMDMwMDA0LFxuICAgICAgICAgICAgZGVzYzogXCLmjIflvJXoiLnlj6rnmoTngrnlh7vkv67nkIZpY29uXCIsXG4gICAgICAgICAgICBvblN0YXJ0KG5leHQpIHtcbiAgICAgICAgICAgICAgICBFdmVudE1nci5pbnMuc2VuZChFdmVudC5NYXAuTWFwVG91Y2hNb3ZlRW5hYmxlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgbmV4dChFR3VpZGVTdGFydC5Ob25lKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21tYW5kOiB7IGNtZDogXCJmaW5nZXJcIiwgYXJnczogXCJNYXAgPiBXaGFyZiA+IEIxNV9ib2F0ID4gTG9ja0l0ZW1cIiwgdHlwZTogXCJNYXBJdGVtXCIsIG1hc2tUeXBlOiAxIH0sXG4gICAgICAgICAgICBpZjogXCJjaGVja0F0TWFwU2NlbmVcIixcbiAgICAgICAgICAgIG5vQ2hlY2tEb25lOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBndWlkZUlkOiAzMDMwMDA1LFxuICAgICAgICAgICAgb25TdGFydChuZXh0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IE1hcElzbGFuZFV0aWxzLmNoZWNrQnVpbGRGaXhlZCgxNSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KEVHdWlkZVN0YXJ0LkNvbmRpdGlvbk5vdFJlYWNoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYnVpbGRDb25maWcgPSBNYXBJc2xhbmRVdGlscy5nZXRCdWlsZENvbmZpZ0J5SWQoMTUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW9uZXlDaGVjayA9IE1vbmV5TWFuYWdlci5DaGVja01vbmV5SnNvbihidWlsZENvbmZpZy5wcmljZVswXSwgZmFsc2UsIE1vbmV5VGlwc1R5cGUuTm9uZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbW9uZXlDaGVjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dChFR3VpZGVTdGFydC5TdG9wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBuZXh0KEVHdWlkZVN0YXJ0Lk5vbmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXNjOiBcIueCueWHu+iIueWPqueahOS/rueQhmljb25cIixcbiAgICAgICAgICAgIGNvbW1hbmQ6IHsgY21kOiBcImZpbmdlclwiLCBhcmdzOiBcIkJ1aWxkVG9vbC91bmxvY2tcIiwgdHlwZTogXCJNYXBVSVwiLCBtYXNrVHlwZTogMSB9LFxuICAgICAgICAgICAgaWY6IFwiY2hlY2tBdE1hcFNjZW5lXCIsXG4gICAgICAgICAgICBub0NoZWNrRG9uZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZ3VpZGVJZDogMzAzMDAwNixcbiAgICAgICAgICAgIGRlc2M6IFwi5paH5a2X5pi+56S6XCIsXG4gICAgICAgICAgICBvblN0YXJ0KG5leHQpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gTWFwSXNsYW5kVXRpbHMuY2hlY2tCdWlsZEZpbmlzaGVkKDE1KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoRUd1aWRlU3RhcnQuU3RvcCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChFR3VpZGVTdGFydC5Ob25lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tbWFuZDogeyBjbWQ6IFwidGV4dFwiLCBhcmdzOiBcIuern+eEtuaciTLnp43moLflvI/lj6/ku6XpgInmi6nvvIzpgInkuIDnp43ov5vooYzoo4Xmia7lkKfvvIHorrDlvpfngrnlh7vlj7PovrnnmoQn4oiaJ+S/neWtmOS9oOeahOmAieaLqeWTn35cIiwgcm9sZTogMSwgcG9zaXRpb25ZOiAtNTAwIH0sXG4gICAgICAgICAgICBpZjogXCJjaGVja0F0TWFwU2NlbmVcIixcbiAgICAgICAgICAgIG5vQ2hlY2tEb25lOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBndWlkZUlkOiAzMDMwMDA3LFxuICAgICAgICAgICAgZGVzYzogXCLngrnlh7voiLnlj6ppY29u55qE5Lik5LiqXCIsXG4gICAgICAgICAgICAvLyBjb21tYW5kOiB7IGNtZDogXCJmaW5nZXJcIiwgYXJnczogXCJCdWlsZFRvb2wvZXhjaGFuZ2UvY29udGVudC9HdWlkZU5vZGVcIiwgdHlwZTogXCJNYXBVSVwiLCBoaWRlRmluZ2VyOiB0cnVlIH0sXG4gICAgICAgICAgICBjb21tYW5kOiB7IGNtZDogXCJmaW5nZXJcIiwgYXJnczogXCJCdWlsZFRvb2wvZXhjaGFuZ2UvY29udGVudFwiLCB0eXBlOiBcIk1hcFVJXCIsIGhpZGVGaW5nZXI6IHRydWUsIG1hc2tUeXBlOiAxIH0sXG4gICAgICAgICAgICBpZjogXCJjaGVja0F0TWFwU2NlbmVcIixcbiAgICAgICAgICAgIG5vQ2hlY2tEb25lOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBndWlkZUlkOiAzMDMwMDA4LFxuICAgICAgICAgICAgZGVzYzogXCLngrnlh7voiLnlj6ppY29u55qE56Gu5a6a5oyJ6ZKuXCIsXG4gICAgICAgICAgICBjb21tYW5kOiB7IGNtZDogXCJmaW5nZXJcIiwgYXJnczogXCJCdWlsZFRvb2wvZXhjaGFuZ2UvYnRuX2NvbmZpcm1cIiwgdHlwZTogXCJNYXBVSVwiIH0sXG4gICAgICAgICAgICBpZjogXCJjaGVja0F0TWFwU2NlbmVcIixcbiAgICAgICAgICAgIG5vQ2hlY2tEb25lOiB0cnVlXG4gICAgICAgIH1cbiAgICBdXG59ICJdfQ==