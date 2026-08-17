import UIBase from "../../../Base/UI/UIBase";
import UIMgr from "../../../Base/Manager/UIMgr";
import { UIHudDef } from "../../Data/Interface/UIData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MoreCoin extends UIBase {

    @property(cc.Label)
    contentLabel: cc.Label = null;


    private _animation: cc.Animation = null;

    onInit() {
        if (!this._animation) {
            this._animation = this.getComponent(cc.Animation);
        }
        this._animation.play('moreCoin');
    }

    public onGo() {
        UIMgr.ins.hideUI(UIHudDef.MoreCoin);
        UIMgr.ins.showUI(UIHudDef.SelectShowTarget, { type: UIHudDef.SelectShowTarget, data: null });
    }

    public onNotGo() {
        UIMgr.ins.hideUI(UIHudDef.MoreCoin);
    }

}
