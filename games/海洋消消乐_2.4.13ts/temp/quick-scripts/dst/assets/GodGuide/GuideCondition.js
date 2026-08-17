
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/GuideCondition.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXEd1aWRlQ29uZGl0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUF5QztBQUN6Qyx3REFBbUQ7QUFLbkQ7SUFBQTtJQW9GQSxDQUFDO0lBbEZpQiw2QkFBYyxHQUE1QixVQUE2QixNQUFvQjtRQUM3QyxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDWixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUVELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQztRQUN4QixLQUFLLElBQUksQ0FBQyxJQUFJLFFBQVEsRUFBRTtZQUNwQixJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUUxQyxJQUFJLEdBQUcsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWhELElBQUksTUFBTSxJQUFJLEdBQUcsRUFBRTtnQkFDZixZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixNQUFNO2FBQ1Q7WUFDRCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNqQixZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixNQUFNO2FBQ1Q7U0FDSjtRQUNELE9BQU8sWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUFFRCwwQkFBMEI7SUFDMUIsbUNBQW1DO0lBQ25DLHVDQUF1QztJQUN2QyxpQ0FBaUM7SUFDakMsdUJBQXVCO0lBQ3ZCLFFBQVE7SUFDUiwwQkFBMEI7SUFDMUIsb0JBQW9CO0lBQ3BCLElBQUk7SUFFSixVQUFVO0lBQ0kseUJBQVUsR0FBeEIsVUFBeUIsS0FBSztRQUMxQixJQUFJLFFBQVEsR0FBRyxXQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNsQyxJQUFJLFFBQVEsSUFBSSxLQUFLLEVBQUU7WUFDbkIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxrQkFBa0I7SUFDSixpQ0FBa0IsR0FBaEM7UUFDSSxPQUFPLGdCQUFNLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsa0JBQWtCO0lBQ0osZ0NBQWlCLEdBQS9CO1FBQ0ksT0FBTyxnQkFBTSxDQUFDLFFBQVEsSUFBSSxZQUFZLENBQUM7SUFDM0MsQ0FBQztJQUVhLDhCQUFlLEdBQTdCO1FBQ0ksT0FBTyxnQkFBTSxDQUFDLFFBQVEsSUFBSSxVQUFVLENBQUM7SUFDekMsQ0FBQztJQUVELGtCQUFrQjtJQUNKLDBCQUFXLEdBQXpCLFVBQTBCLEtBQUs7UUFDM0IsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxXQUFXO0lBQ0csOEJBQWUsR0FBN0I7UUFDSSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsa0JBQWtCO0lBQ0osaUNBQWtCLEdBQWhDLFVBQWlDLEtBQUs7UUFDbEMsSUFBTSxNQUFNLEdBQUcsV0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDM0IsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDTCxxQkFBQztBQUFELENBcEZBLEFBb0ZDLElBQUE7QUFwRlksd0NBQWM7QUFxRjNCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLGNBQWMsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElHdWlkZUNvbmZpZyB9IGZyb20gXCIuL0dvZEd1aWRlXCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vU2NyaXB0L0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuLi9TY3JpcHQvTG9naWMvQ29tbW9uL0NvbW1vblwiO1xuaW1wb3J0IHsgU3RvcmFnZU1nciB9IGZyb20gXCIuLi9TY3JpcHQvQmFzZS9NYW5hZ2VyL1N0b3JhZ2VNZ3JcIjtcbmltcG9ydCB7IE5hdGl2ZUtleSB9IGZyb20gXCIuLi9TY3JpcHQvTG9naWMvRGF0YS9Db25zdC9Db25zdGFudFwiO1xuXG5cbmV4cG9ydCBjbGFzcyBHdWlkZUNvbmRpdGlvbiB7XG5cbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrQ29uZGl0aW9uKGNvbmZpZzogSUd1aWRlQ29uZmlnKTogYm9vbGVhbiB7XG4gICAgICAgIHZhciBjb25kaXRpb24gPSBjb25maWcuaWY7XG4gICAgICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3BsaXRBcnIgPSBjb25kaXRpb24uc3BsaXQoXCIsXCIpO1xuICAgICAgICBpZiAoIXNwbGl0QXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb25kaXRpb25SZXQgPSB0cnVlO1xuICAgICAgICBmb3IgKHZhciBpIGluIHNwbGl0QXJyKSB7XG4gICAgICAgICAgICB2YXIgZnVuY1N0clByZSA9IHNwbGl0QXJyW2ldO1xuICAgICAgICAgICAgdmFyIGhhc05vdCA9IGZ1bmNTdHJQcmUuaW5kZXhPZihcIi1cIikgIT0gLTE7XG4gICAgICAgICAgICB2YXIgZnVuY1N0ciA9IGZ1bmNTdHJQcmUucmVwbGFjZShcIi1cIiwgXCJcIik7XG5cbiAgICAgICAgICAgIHZhciByZXQgPSBHdWlkZUNvbmRpdGlvbltmdW5jU3RyXShjb25maWcucGFyYW0pO1xuXG4gICAgICAgICAgICBpZiAoaGFzTm90ICYmIHJldCkge1xuICAgICAgICAgICAgICAgIGNvbmRpdGlvblJldCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFoYXNOb3QgJiYgIXJldCkge1xuICAgICAgICAgICAgICAgIGNvbmRpdGlvblJldCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25kaXRpb25SZXQ7XG4gICAgfVxuXG4gICAgLy8gc3RhdGljIF90ZXN0TnVtYmVyID0gMDtcbiAgICAvLyBwdWJsaWMgc3RhdGljIGNoZWNrVGVzdChwYXJhbSkge1xuICAgIC8vICAgICBpZiAocGFyYW0gPD0gdGhpcy5fdGVzdE51bWJlcikge1xuICAgIC8vICAgICAgICAgY29uc29sZS5lcnJvcihcIuadoeS7tua7oei2s1wiKTtcbiAgICAvLyAgICAgICAgIHJldHVybiB0cnVlO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHRoaXMuX3Rlc3ROdW1iZXIrKztcbiAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xuICAgIC8vIH1cblxuICAgIC8v5b2T5YmN5YWz5Y2h5piv5ZCm6L6+5YiwXG4gICAgcHVibGljIHN0YXRpYyBjaGVja0xldmVsKHBhcmFtKSB7XG4gICAgICAgIGxldCBjdXJMZXZlbCA9IE0ucnVudGltZS5DdXJMZXZlbDtcbiAgICAgICAgaWYgKGN1ckxldmVsID09IHBhcmFtKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqIOW9k+WJjeaYr+WQpuWcqOWFs+WNoea4uOaIj+WcuuaZryAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tBdE1hdGNoM1NjZW5lKCkge1xuICAgICAgICByZXR1cm4gQ29tbW9uLmN1clNjZW5lID09IFwiTWF0Y2gzXCI7XG4gICAgfVxuXG4gICAgLyoqIOW9k+WJjeaYr+WQpuWcqOWFs+WNoea4uOaIj+WcuuaZryAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tBdExldmVsU2NlbmUoKSB7XG4gICAgICAgIHJldHVybiBDb21tb24uY3VyU2NlbmUgPT0gXCJMZXZlbFNjZW5lXCI7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjaGVja0F0TWFwU2NlbmUoKSB7XG4gICAgICAgIHJldHVybiBDb21tb24uY3VyU2NlbmUgPT0gXCJNYXBTY2VuZVwiO1xuICAgIH1cblxuICAgIC8qKiDliKTmlq1VSemdouadv+aYr+WQpuaJk+W8gOS6hiAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tVSU9wZW4ocGFyYW0pIHtcbiAgICAgICAgdmFyIHJvb3QgPSBjYy5maW5kKFwiVUlSb290XCIpO1xuICAgICAgICByZXR1cm4gISFyb290LmdldENoaWxkQnlOYW1lKHBhcmFtKTtcbiAgICB9XG5cbiAgICAvL+WIpOaWreaYr+WQpuacieW8ueeql+W8ueWHulxuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tOb0RpYWxvZ1VJKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKiog5Yik5pat5piv5ZCm5ri4546p5LqG6L+Z5Liq5YWz5Y2hICovXG4gICAgcHVibGljIHN0YXRpYyBjaGVja0xldmVsRmluaXNoZWQocGFyYW0pIHtcbiAgICAgICAgY29uc3QgbHZEYXRhID0gTS5ydW50aW1lLmdldE5hdGl2ZUx2RGF0YShwYXJhbSk7XG4gICAgICAgIGlmIChsdkRhdGEgJiYgbHZEYXRhLnN0YXIgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxud2luZG93W1wiR3VpZGVDb25kaXRpb25cIl0gPSBHdWlkZUNvbmRpdGlvbjsiXX0=