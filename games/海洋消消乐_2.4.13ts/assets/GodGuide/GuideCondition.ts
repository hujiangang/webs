import { IGuideConfig } from "./GodGuide";
import M from "../Script/Base/Manager/M";
import Common from "../Script/Logic/Common/Common";
import { StorageMgr } from "../Script/Base/Manager/StorageMgr";
import { NativeKey } from "../Script/Logic/Data/Const/Constant";


export class GuideCondition {

    public static checkCondition(config: IGuideConfig): boolean {
        var condition = config.if;
        if (!condition) {
            return true;
        }
        let splitArr = condition.split(",");
        if (!splitArr) {
            return true;
        }

        let conditionRet = true;
        for (var i in splitArr) {
            var funcStrPre = splitArr[i];
            var hasNot = funcStrPre.indexOf("-") != -1;
            var funcStr = funcStrPre.replace("-", "");

            var ret = GuideCondition[funcStr](config.param);

            if (hasNot && ret) {
                conditionRet = false;
                break;
            }
            if (!hasNot && !ret) {
                conditionRet = false;
                break;
            }
        }
        return conditionRet;
    }

    // static _testNumber = 0;
    // public static checkTest(param) {
    //     if (param <= this._testNumber) {
    //         console.error("条件满足");
    //         return true;
    //     }
    //     this._testNumber++;
    //     return false;
    // }

    //当前关卡是否达到
    public static checkLevel(param) {
        let curLevel = M.runtime.CurLevel;
        if (curLevel == param) {
            return true;
        }
        return false;
    }

    /** 当前是否在关卡游戏场景 */
    public static checkAtMatch3Scene() {
        return Common.curScene == "Match3";
    }

    /** 当前是否在关卡游戏场景 */
    public static checkAtLevelScene() {
        return Common.curScene == "LevelScene";
    }

    public static checkAtMapScene() {
        return Common.curScene == "MapScene";
    }

    /** 判断UI面板是否打开了 */
    public static checkUIOpen(param) {
        var root = cc.find("UIRoot");
        return !!root.getChildByName(param);
    }

    //判断是否有弹窗弹出
    public static checkNoDialogUI(): boolean {
        return true;
    }

    /** 判断是否游玩了这个关卡 */
    public static checkLevelFinished(param) {
        const lvData = M.runtime.getNativeLvData(param);
        if (lvData && lvData.star > 0) {
            return true;
        }
        return false;
    }
}
window["GuideCondition"] = GuideCondition;