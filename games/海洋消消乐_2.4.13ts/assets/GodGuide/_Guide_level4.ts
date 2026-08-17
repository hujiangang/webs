import { GuideCondition } from "./GuideCondition"
import { EGuideStart } from "./GuideUtils";
import EventMgr from "../Script/Base/Manager/EventMgr";
import { Event } from "../Script/Logic/Data/Const/Event";
import MapIslandUtils from "../Script/Logic/SimulationOperation/View/Map/MapIslandUtils";
import { MoneyManager, MoneyTipsType } from "../Script/Logic/Data/MoneyManager";
import UIMgr from "../Script/Base/Manager/UIMgr";
import { UIHudDef } from "../Script/Logic/Data/Interface/UIData";
import { GuideData } from "./GuideData";

export const task = {
    name: "关卡4 游戏结束 引导会继续引导海岛",
    debug: false,
    autorun: false,
    filename: "_Guide_level4",
    steps: [
        {
            guideId: 401,
            onStart(next) {
                if (!GuideCondition.checkLevelFinished(4)) {
                    next(EGuideStart.Stop);
                    return;
                }
                let result = !MapIslandUtils.checkBuildFixed(15);
                if (result) {
                    next(EGuideStart.Stop);
                    return;
                }
                result = MapIslandUtils.checkBuildFixed(16) && MapIslandUtils.checkBuildFinished(16);
                if (result) {
                    next(EGuideStart.Stop);
                    return;
                }
                result = GuideCondition.checkLevel(4) && GuideCondition.checkUIOpen("GameWin");
                if (!result) {
                    next(EGuideStart.ConditionNotReach);
                    return;
                }
                next(EGuideStart.None);
            },
            desc: "第四关通关引导关闭",
            command: { cmd: "text", args: "哇，这么快就通关了！让我们再去海岛上逛逛吧~", role: 1, positionY: -500 },
            if: "checkAtMatch3Scene,checkUIOpen",
            delayTime: 1,
            param: "GameWin",
        },
        {
            guideId: 402,
            onStart(next) {
                let result = GuideCondition.checkLevel(4) && GuideCondition.checkUIOpen("GameWin");;
                if (!result) {
                    next(EGuideStart.ConditionNotReach);
                    return;
                }
                if (GuideCondition.checkUIOpen("SelectShowTarget")) {
                    UIMgr.ins.closeUI(UIHudDef.SelectShowTarget);
                }
                next(EGuideStart.None);
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
            onStart(next) {
                if (GuideCondition.checkUIOpen("SelectShowTarget")) {
                    UIMgr.ins.closeUI(UIHudDef.SelectShowTarget);
                }
                next(EGuideStart.None);
            },
            command: { cmd: 'finger', args: 'UI > Bottom > goMapBtn' },
            if: "checkAtLevelScene",
            delayTime: 1,
        },
        {
            guideId: 404,
            onStart(next) {
                if (GuideCondition.checkUIOpen("BuildSuccess")) {
                    next(EGuideStart.Stop);
                    return;
                }
                if (!MapIslandUtils.mapLoadFinished) {
                    next(EGuideStart.Stop);
                    return;
                }
                let result = MapIslandUtils.checkBuildFixed(16) && MapIslandUtils.checkBuildFinished(16);
                if (result) {
                    GuideData.pushFinishedTask("_Guide_level4");
                    next(EGuideStart.Stop);
                } else {
                    next(EGuideStart.None);
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
            onStart(next) {
                let result = MapIslandUtils.checkBuildFixed(16) && MapIslandUtils.checkBuildFinished(16);
                if (result) {
                    next(EGuideStart.Stop);
                } else {
                    next(EGuideStart.None);
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
            onStart(next) {
                let result = MapIslandUtils.checkBuildFixed(16);
                if (result) {
                    next(EGuideStart.ConditionNotReach);
                } else {
                    let buildConfig = MapIslandUtils.getBuildConfigById(16);
                    let moneyCheck = MoneyManager.CheckMoneyJson(buildConfig.price[0], false, MoneyTipsType.None);
                    if (!moneyCheck) {
                        next(EGuideStart.Stop);
                        return;
                    }
                    next(EGuideStart.None);
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
} 