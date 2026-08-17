import { GuideCondition } from "./GuideCondition"
import { EGuideStart } from "./GuideUtils";
import EventMgr from "../Script/Base/Manager/EventMgr";
import { Event } from "../Script/Logic/Data/Const/Event";
import MapIslandUtils from "../Script/Logic/SimulationOperation/View/Map/MapIslandUtils";
import { MoneyManager, MoneyTipsType } from "../Script/Logic/Data/MoneyManager";
import { GuideData } from "./GuideData";

export const task = {
    name: "关卡3 引导海岛解锁游艇",
    debug: false,
    autorun: false,
    filename: "_Guide_level3_1",
    steps: [
        {
            guideId: 3030002,
            desc: "显示对话",
            onStart(next) {
                if (!MapIslandUtils.mapLoadFinished) {
                    next(EGuideStart.Stop);
                    return;
                }
                let result = MapIslandUtils.checkBuildFixed(15) && MapIslandUtils.checkBuildFinished(15);
                if (result) {
                    GuideData.pushFinishedTask("_Guide_level3_1");
                    next(EGuideStart.Stop);  //如果15游艇以及解锁和修理 停止后面引导
                    return;
                }
                next(EGuideStart.None);
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
            onStart(next) {
                EventMgr.ins.send(Event.Map.MapTouchMoveEnable, false);
                next(EGuideStart.None);
            },
            command: { cmd: "finger", args: "Map > Wharf > B15_boat > LockItem", type: "MapItem", maskType: 1 },
            if: "checkAtMapScene",
            noCheckDone: true,
        },
        {
            guideId: 3030005,
            onStart(next) {
                let result = MapIslandUtils.checkBuildFixed(15);
                if (result) {
                    next(EGuideStart.ConditionNotReach);
                } else {
                    let buildConfig = MapIslandUtils.getBuildConfigById(15);
                    let moneyCheck = MoneyManager.CheckMoneyJson(buildConfig.price[0], false, MoneyTipsType.None);
                    if (!moneyCheck) {
                        next(EGuideStart.Stop);
                        return;
                    }
                    next(EGuideStart.None);
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
            onStart(next) {
                let result = MapIslandUtils.checkBuildFinished(15);
                if (result) {
                    next(EGuideStart.Stop);
                } else {
                    next(EGuideStart.None);
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
} 