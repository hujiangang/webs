import { TempLoadingTip } from "../../Data/Const/Constant";
import { Util } from "../../../Base/Utils/Util";
import EventMgr from "../../../Base/Manager/EventMgr";
import { Event } from "../../Data/Const/Event";
import UIBase from "../../../Base/UI/UIBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TempLoadingPanel extends UIBase {

    @property(cc.Label)
    tipsLabel: cc.Label = null;

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    @property(cc.Label)
    progrss: cc.Label = null;

    @property([cc.SpriteFrame])
    frames: cc.SpriteFrame[] = [];

    onLoad() {
        super.onLoad();
        this._initView();
        this._initEvent();
    }

    onDestroy() {
        EventMgr.ins.unRegister(Event.UI.UpdateTmpLoadingProgress, this._onUpdateProgress, this);
    }

    private _initEvent() {
        EventMgr.ins.register(Event.UI.UpdateTmpLoadingProgress, this._onUpdateProgress, this);
    }

    private _initView() {
        const keys = Object.keys(TempLoadingTip)
        const index = Util.Tool.rangeInt(0, keys.length, false);

        this.sprite.spriteFrame = this.frames[index];
        this.tipsLabel.string = TempLoadingTip[index + 1];
    }


    private _onUpdateProgress(jd: number) {
        this.progrss.string = `${Math.ceil(jd)}%`;
    }

    start() {

    }
}
