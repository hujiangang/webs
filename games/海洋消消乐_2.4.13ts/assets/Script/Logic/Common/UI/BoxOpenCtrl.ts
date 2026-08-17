import UIBase from "../../../Base/UI/UIBase";
import BoxRewardInfo from "../../../Base/Tabls/BoxRewardInfo";
import M from "../../../Base/Manager/M";
import { UIHudDef } from "../../Data/Interface/UIData";
import { Event } from "../../Data/Const/Event";
import { GuideUtils } from "../../../../GodGuide/GuideUtils";
import EventMgr from "../../../Base/Manager/EventMgr";
import { AudioID } from "../AudioCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BoxOpenCtrl extends UIBase {

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    boxNode: cc.Node = null;

    @property(cc.Label)
    titleLab: cc.Label = null;

    @property(cc.Prefab)
    rewardNode: cc.Prefab = null;

    @property([cc.SpriteFrame])
    frames: cc.SpriteFrame[] = [];

    private _isOpened: boolean = false;
    private _info: BoxRewardInfo = null;

    public onInit(data: { config: BoxRewardInfo, text: string, isHideBox: boolean }) {
        this._isOpened = false;
        this.content.destroyAllChildren();
        if (data.text) {
            this.titleLab.string = data.text;
        } else {
            this.titleLab.string = '恭喜你开启了宝箱 , 获得以下奖励:';
            EventMgr.ins.send(Event.Sound.PlaySoundEff, AudioID.OpenBox);
        }
        data.config.rewards.forEach(item => {
            this._setItem(item, this.rewardNode, this.frames);
        });
        this._info = data.config;
        M.runtime.setBoxGiftData(this._info.id, true);
        this.boxNode.active = !data.isHideBox;
    }

    private _setItem(item: { type: number, count: number }, prefab, frames) {
        let type = Number(item.type);
        const node = M.nodePool.createItem(prefab);
        node.getChildByName('count').getComponent(cc.Label).string = `x${item.count}`;
        node.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = this._getRewardIcon(frames, type);
        node.parent = this.content;
        if (type >= 100) {
            M.runtime.updatePropCount(type, item.count);
        } else {
            M.runtime.addCurrency(type, item.count);
        }
    }

    private _getRewardIcon(frames: cc.SpriteFrame[], type: number): cc.SpriteFrame {
        let result = null;
        if (type >= 100) {
            result = frames[type - 100]
        } else {
            result = frames[type + 20]
        }
        return result;
    }


    onShow() {
        this._isOpened = true;
    }

    public onCloseClick() {
        if (this._isOpened) {
            M.ui.hideUI(UIHudDef.OpenBox);
            M.event.send(Event.UI.updateBoxState, this._info.id);
            this._info = null;
            GuideUtils.checkGuide();
        }
    }
}
