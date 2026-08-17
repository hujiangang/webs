import { CurrencyId } from "../../Base/BaseConst";
import { PropType } from "../Data/Const/Constant";

/** 配置的道具格式 可用于消耗、奖励等 */
export interface IConfigItem {
    /**id */
    id?: number
    /**道具类型 */
    itemId: CurrencyId | PropType
    /**数量 */
    num: number
    /**附加数据 */
    extData?: any
}