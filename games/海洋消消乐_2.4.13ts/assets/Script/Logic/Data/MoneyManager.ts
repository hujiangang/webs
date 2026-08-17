import { CurrencyId } from "../../Base/BaseConst";
import M from "../../Base/Manager/M";
import { WaringTips } from "./Const/Constant";
import { IConfigItem } from "../Common/CommonInterfaces";

export enum MoneyTipsType {
    None = 0,   //不提示
    Panel = 1,  //面板提示
    Msg = 2,    //消息提示
}
export class MoneyManager {
    /**
     * 检查各种资产是否满足条件，会自己弹出购买或提示
     * moneyType 当为道具 需要传id参数
     * value 为所需的值
     * tipType 弹窗类型
     * return result是否通过满足，true为满足，false为不满足
     */
    public static CheckMoney(moneyType: CurrencyId, needNum: number, takeOff: boolean = false, tipsType: MoneyTipsType = MoneyTipsType.Msg): boolean {
        let result = true;
        let haveNum = M.runtime.getCurrency(moneyType);
        let addNum = 0;
        if (haveNum < needNum) {
            addNum = needNum - haveNum;
            result = false;
        }

        if (!result) {
            if (tipsType == MoneyTipsType.Msg) {
                switch (moneyType) {
                    case CurrencyId.Coin:
                        M.tips.show(WaringTips.NoMoreCoin);
                        break;
                    case CurrencyId.Diamond:
                        M.tips.show(WaringTips.NoMoreDiamond);
                        break;
                }
            }
        } else {
            if (takeOff) {
                M.runtime.addCurrency(moneyType, -needNum);
            }
        }

        return result;
    }

    /**
     * 检查通用消耗格式
     * {"itemId":3,"num":400}
     * @param takeOff 如果足够是否直接扣除
     */
    public static CheckMoneyJson(comJson: IConfigItem, takeOff: boolean = false, tipType = MoneyTipsType.Msg): boolean {
        let itemId = comJson.itemId as CurrencyId;
        let result = MoneyManager.CheckMoney(itemId, comJson.num, takeOff, tipType);
        return result;
    }


}