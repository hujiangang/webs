"use strict";
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