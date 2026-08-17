
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Data/MoneyManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '239bbN7EhhLHKmRmeKBWpzn', 'MoneyManager');
// Script/Logic/Data/MoneyManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyManager = exports.MoneyTipsType = void 0;
var BaseConst_1 = require("../../Base/BaseConst");
var M_1 = require("../../Base/Manager/M");
var Constant_1 = require("./Const/Constant");
var MoneyTipsType;
(function (MoneyTipsType) {
    MoneyTipsType[MoneyTipsType["None"] = 0] = "None";
    MoneyTipsType[MoneyTipsType["Panel"] = 1] = "Panel";
    MoneyTipsType[MoneyTipsType["Msg"] = 2] = "Msg";
})(MoneyTipsType = exports.MoneyTipsType || (exports.MoneyTipsType = {}));
var MoneyManager = /** @class */ (function () {
    function MoneyManager() {
    }
    /**
     * 检查各种资产是否满足条件，会自己弹出购买或提示
     * moneyType 当为道具 需要传id参数
     * value 为所需的值
     * tipType 弹窗类型
     * return result是否通过满足，true为满足，false为不满足
     */
    MoneyManager.CheckMoney = function (moneyType, needNum, takeOff, tipsType) {
        if (takeOff === void 0) { takeOff = false; }
        if (tipsType === void 0) { tipsType = MoneyTipsType.Msg; }
        var result = true;
        var haveNum = M_1.default.runtime.getCurrency(moneyType);
        var addNum = 0;
        if (haveNum < needNum) {
            addNum = needNum - haveNum;
            result = false;
        }
        if (!result) {
            if (tipsType == MoneyTipsType.Msg) {
                switch (moneyType) {
                    case BaseConst_1.CurrencyId.Coin:
                        M_1.default.tips.show(Constant_1.WaringTips.NoMoreCoin);
                        break;
                    case BaseConst_1.CurrencyId.Diamond:
                        M_1.default.tips.show(Constant_1.WaringTips.NoMoreDiamond);
                        break;
                }
            }
        }
        else {
            if (takeOff) {
                M_1.default.runtime.addCurrency(moneyType, -needNum);
            }
        }
        return result;
    };
    /**
     * 检查通用消耗格式
     * {"itemId":3,"num":400}
     * @param takeOff 如果足够是否直接扣除
     */
    MoneyManager.CheckMoneyJson = function (comJson, takeOff, tipType) {
        if (takeOff === void 0) { takeOff = false; }
        if (tipType === void 0) { tipType = MoneyTipsType.Msg; }
        var itemId = comJson.itemId;
        var result = MoneyManager.CheckMoney(itemId, comJson.num, takeOff, tipType);
        return result;
    };
    return MoneyManager;
}());
exports.MoneyManager = MoneyManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcRGF0YVxcTW9uZXlNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUFrRDtBQUNsRCwwQ0FBcUM7QUFDckMsNkNBQThDO0FBRzlDLElBQVksYUFJWDtBQUpELFdBQVksYUFBYTtJQUNyQixpREFBUSxDQUFBO0lBQ1IsbURBQVMsQ0FBQTtJQUNULCtDQUFPLENBQUE7QUFDWCxDQUFDLEVBSlcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFJeEI7QUFDRDtJQUFBO0lBaURBLENBQUM7SUFoREc7Ozs7OztPQU1HO0lBQ1csdUJBQVUsR0FBeEIsVUFBeUIsU0FBcUIsRUFBRSxPQUFlLEVBQUUsT0FBd0IsRUFBRSxRQUEyQztRQUFyRSx3QkFBQSxFQUFBLGVBQXdCO1FBQUUseUJBQUEsRUFBQSxXQUEwQixhQUFhLENBQUMsR0FBRztRQUNsSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxPQUFPLEdBQUcsV0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0MsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxPQUFPLEdBQUcsT0FBTyxFQUFFO1lBQ25CLE1BQU0sR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQzNCLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDbEI7UUFFRCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsSUFBSSxRQUFRLElBQUksYUFBYSxDQUFDLEdBQUcsRUFBRTtnQkFDL0IsUUFBUSxTQUFTLEVBQUU7b0JBQ2YsS0FBSyxzQkFBVSxDQUFDLElBQUk7d0JBQ2hCLFdBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQ25DLE1BQU07b0JBQ1YsS0FBSyxzQkFBVSxDQUFDLE9BQU87d0JBQ25CLFdBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQ3RDLE1BQU07aUJBQ2I7YUFDSjtTQUNKO2FBQU07WUFDSCxJQUFJLE9BQU8sRUFBRTtnQkFDVCxXQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM5QztTQUNKO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDVywyQkFBYyxHQUE1QixVQUE2QixPQUFvQixFQUFFLE9BQXdCLEVBQUUsT0FBMkI7UUFBckQsd0JBQUEsRUFBQSxlQUF3QjtRQUFFLHdCQUFBLEVBQUEsVUFBVSxhQUFhLENBQUMsR0FBRztRQUNwRyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBb0IsQ0FBQztRQUMxQyxJQUFJLE1BQU0sR0FBRyxZQUFZLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1RSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBR0wsbUJBQUM7QUFBRCxDQWpEQSxBQWlEQyxJQUFBO0FBakRZLG9DQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3VycmVuY3lJZCB9IGZyb20gXCIuLi8uLi9CYXNlL0Jhc2VDb25zdFwiO1xuaW1wb3J0IE0gZnJvbSBcIi4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgeyBXYXJpbmdUaXBzIH0gZnJvbSBcIi4vQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCB7IElDb25maWdJdGVtIH0gZnJvbSBcIi4uL0NvbW1vbi9Db21tb25JbnRlcmZhY2VzXCI7XG5cbmV4cG9ydCBlbnVtIE1vbmV5VGlwc1R5cGUge1xuICAgIE5vbmUgPSAwLCAgIC8v5LiN5o+Q56S6XG4gICAgUGFuZWwgPSAxLCAgLy/pnaLmnb/mj5DnpLpcbiAgICBNc2cgPSAyLCAgICAvL+a2iOaBr+aPkOekulxufVxuZXhwb3J0IGNsYXNzIE1vbmV5TWFuYWdlciB7XG4gICAgLyoqXG4gICAgICog5qOA5p+l5ZCE56eN6LWE5Lqn5piv5ZCm5ruh6Laz5p2h5Lu277yM5Lya6Ieq5bex5by55Ye66LSt5Lmw5oiW5o+Q56S6XG4gICAgICogbW9uZXlUeXBlIOW9k+S4uumBk+WFtyDpnIDopoHkvKBpZOWPguaVsFxuICAgICAqIHZhbHVlIOS4uuaJgOmcgOeahOWAvFxuICAgICAqIHRpcFR5cGUg5by556qX57G75Z6LXG4gICAgICogcmV0dXJuIHJlc3VsdOaYr+WQpumAmui/h+a7oei2s++8jHRydWXkuLrmu6HotrPvvIxmYWxzZeS4uuS4jea7oei2s1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgQ2hlY2tNb25leShtb25leVR5cGU6IEN1cnJlbmN5SWQsIG5lZWROdW06IG51bWJlciwgdGFrZU9mZjogYm9vbGVhbiA9IGZhbHNlLCB0aXBzVHlwZTogTW9uZXlUaXBzVHlwZSA9IE1vbmV5VGlwc1R5cGUuTXNnKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCByZXN1bHQgPSB0cnVlO1xuICAgICAgICBsZXQgaGF2ZU51bSA9IE0ucnVudGltZS5nZXRDdXJyZW5jeShtb25leVR5cGUpO1xuICAgICAgICBsZXQgYWRkTnVtID0gMDtcbiAgICAgICAgaWYgKGhhdmVOdW0gPCBuZWVkTnVtKSB7XG4gICAgICAgICAgICBhZGROdW0gPSBuZWVkTnVtIC0gaGF2ZU51bTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmICh0aXBzVHlwZSA9PSBNb25leVRpcHNUeXBlLk1zZykge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAobW9uZXlUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQ3VycmVuY3lJZC5Db2luOlxuICAgICAgICAgICAgICAgICAgICAgICAgTS50aXBzLnNob3coV2FyaW5nVGlwcy5Ob01vcmVDb2luKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEN1cnJlbmN5SWQuRGlhbW9uZDpcbiAgICAgICAgICAgICAgICAgICAgICAgIE0udGlwcy5zaG93KFdhcmluZ1RpcHMuTm9Nb3JlRGlhbW9uZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGFrZU9mZikge1xuICAgICAgICAgICAgICAgIE0ucnVudGltZS5hZGRDdXJyZW5jeShtb25leVR5cGUsIC1uZWVkTnVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5qOA5p+l6YCa55So5raI6ICX5qC85byPXG4gICAgICoge1wiaXRlbUlkXCI6MyxcIm51bVwiOjQwMH1cbiAgICAgKiBAcGFyYW0gdGFrZU9mZiDlpoLmnpzotrPlpJ/mmK/lkKbnm7TmjqXmiaPpmaRcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIENoZWNrTW9uZXlKc29uKGNvbUpzb246IElDb25maWdJdGVtLCB0YWtlT2ZmOiBib29sZWFuID0gZmFsc2UsIHRpcFR5cGUgPSBNb25leVRpcHNUeXBlLk1zZyk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgaXRlbUlkID0gY29tSnNvbi5pdGVtSWQgYXMgQ3VycmVuY3lJZDtcbiAgICAgICAgbGV0IHJlc3VsdCA9IE1vbmV5TWFuYWdlci5DaGVja01vbmV5KGl0ZW1JZCwgY29tSnNvbi5udW0sIHRha2VPZmYsIHRpcFR5cGUpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG59Il19