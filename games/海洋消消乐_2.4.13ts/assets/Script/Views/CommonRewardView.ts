import UIBase from "../Base/UI/UIBase";
import UIMgr from "../Base/Manager/UIMgr";
import { UIHudDef } from "../Logic/Data/Interface/UIData";
import M from "../Base/Manager/M";
import { CurrencyId } from "../Base/BaseConst";
import { IConfigItem } from "../Logic/Common/CommonInterfaces";

const { ccclass, property } = cc._decorator;

@ccclass
export class CommonRewardView extends UIBase {

    //目前只支持一个 item 如需多个后面再加

    @property(cc.Sprite)
    itemSp: cc.Sprite = null;

    @property(cc.Label)
    itemLabel: cc.Label = null;

    private _itemData: IConfigItem = null;

    onLoad() {
        super.onLoad();
    }

    public onInit(itemData: any) {
        this._itemData = itemData;
        this.itemLabel.string = "x" + itemData.num;
    }

    public onClickClose() {
        if (this._itemData) {
            M.runtime.addCurrency(this._itemData.itemId as CurrencyId, this._itemData.num);
        }
        UIMgr.ins.closeUI(UIHudDef.CommonReward);
    }
}