"use strict";
cc._RF.push(module, '9bed4fEwmBC14GiOkls+Ntp', 'GuideCondition');
// GodGuide/GuideCondition.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuideCondition = void 0;
var M_1 = require("../Script/Base/Manager/M");
var Common_1 = require("../Script/Logic/Common/Common");
var GuideCondition = /** @class */ (function () {
    function GuideCondition() {
    }
    GuideCondition.checkCondition = function (config) {
        var condition = config.if;
        if (!condition) {
            return true;
        }
        var splitArr = condition.split(",");
        if (!splitArr) {
            return true;
        }
        var conditionRet = true;
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
    };
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
    GuideCondition.checkLevel = function (param) {
        var curLevel = M_1.default.runtime.CurLevel;
        if (curLevel == param) {
            return true;
        }
        return false;
    };
    /** 当前是否在关卡游戏场景 */
    GuideCondition.checkAtMatch3Scene = function () {
        return Common_1.default.curScene == "Match3";
    };
    /** 当前是否在关卡游戏场景 */
    GuideCondition.checkAtLevelScene = function () {
        return Common_1.default.curScene == "LevelScene";
    };
    GuideCondition.checkAtMapScene = function () {
        return Common_1.default.curScene == "MapScene";
    };
    /** 判断UI面板是否打开了 */
    GuideCondition.checkUIOpen = function (param) {
        var root = cc.find("UIRoot");
        return !!root.getChildByName(param);
    };
    //判断是否有弹窗弹出
    GuideCondition.checkNoDialogUI = function () {
        return true;
    };
    /** 判断是否游玩了这个关卡 */
    GuideCondition.checkLevelFinished = function (param) {
        var lvData = M_1.default.runtime.getNativeLvData(param);
        if (lvData && lvData.star > 0) {
            return true;
        }
        return false;
    };
    return GuideCondition;
}());
exports.GuideCondition = GuideCondition;
window["GuideCondition"] = GuideCondition;

cc._RF.pop();