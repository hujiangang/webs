import { GuideCondition } from "./GuideCondition"
import { EGuideStart, GuideUtils } from "./GuideUtils";
import EventMgr from "../Script/Base/Manager/EventMgr";
import { Event } from "../Script/Logic/Data/Const/Event";
import MapIslandUtils from "../Script/Logic/SimulationOperation/View/Map/MapIslandUtils";
import M from "../Script/Base/Manager/M";
import UIMgr from "../Script/Base/Manager/UIMgr";
import { UIHudDef } from "../Script/Logic/Data/Interface/UIData";

export const task = {
    name: "关卡3 游戏结束",
    debug: false,
    autorun: false,
    filename: "_Guide_level3",
    steps: [
        {
            guideId: 301,
            onStart(next) {
                let result = GuideCondition.checkLevel(3) && GuideCondition.checkUIOpen("GameWin");
                // console.error("301", GuideCondition.checkLevel(3), GuideCondition.checkUIOpen("GameWin"), cc.find("UIRoot"));
                if (!result) {
                    next(EGuideStart.ConditionNotReach);
                    return;
                }
                next(EGuideStart.None);
            },
            desc: "第三关通关引导关闭",
            command: { cmd: "text", args: "通往海岛的航道开通咯！我们一起回爷爷的岛上看望一下他吧！", role: 1, positionY: -500 },
            delayTime: 2,
        },
        {
            guideId: 302,
            onStart(next) {
                let result = GuideCondition.checkLevel(3) && GuideCondition.checkUIOpen("GameWin");;
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
            onStart(callback) {
                // let result = !GuideCondition.checkLevelFinished(4) && !GuideUtils.checkGuideDone(303);
                if (GuideCondition.checkUIOpen("SelectShowTarget")) {
                    UIMgr.ins.closeUI(UIHudDef.SelectShowTarget);
                }
                let result = !GuideUtils.checkGuideDone(303) && (M.runtime.getStarCount() == MapIslandUtils.openMapNeedStar());
                if (result) {
                    EventMgr.ins.send(Event.UI.LevelSceneTouched, false);
                    // EventMgr.ins.send(Event.Map.GuideMask, false);
                    setTimeout(() => {
                        EventMgr.ins.send(Event.Map.UnLockIsland);
                        callback(EGuideStart.None);
                    }, 1 * 1000);
                } else {
                    callback(EGuideStart.ConditionNotReach);
                }
            },
            guideId: 303,
            desc: "此时正在解锁海岛按钮",
            command: { cmd: 'finger', args: 'UI > Bottom > goMapBtn' },
            if: "checkAtLevelScene",
        },
    ]
} 