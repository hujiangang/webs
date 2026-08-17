import UIBase from "../../../Base/UI/UIBase";
import UIMgr from "../../../Base/Manager/UIMgr";
import { UIHudDef } from "../../Data/Interface/UIData";
import M from "../../../Base/Manager/M";
import BagGridItemCtrl from "./BagGridItemCtrl";
import { PropType, MaxPowerCount, WaringTips } from "../../Data/Const/Constant";
import { accessSync } from "fs";
import { Event } from "../../Data/Const/Event";
import { CurrencyId } from "../../../Base/BaseConst";
import Common from "../Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BagCtrl extends UIBase {

    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    tipsNode: cc.Node = null;

    @property([cc.SpriteFrame])
    propFrams: cc.SpriteFrame[] = [];

    private _selectType: PropType = null;

    onLoad() {
        super.onLoad();
        M.event.register(Event.UI.ShowBagTips, this.showTips, this);
    }

    onDestroy() {
        M.event.unRegister(Event.UI.ShowBagTips, this.showTips, this);
    }

    public onInit() {
        const data = M.runtime.getPropData();
        this.content.destroyAllChildren();
        this.tipsNode.active = false;
        for (const id in data) {
            const type = Number(id);
            const item = M.nodePool.createItem(this.itemPrefab);
            item.getComponent(BagGridItemCtrl).init(type, data[id], this.propFrams[type - 100]);
            item.parent = this.content;
        }
    }

    public onCloseClick() {
        UIMgr.ins.hideUI(UIHudDef.Bag);
    }

    public onHideTips() {
        this.tipsNode.active = false;
        this._selectType = null;
    }

    public showTips(type: PropType, pos: cc.Vec2, count: number) {

        const info = M.table.PropInfo.getByPrimaryKey(type);
        pos = this.node.convertToNodeSpaceAR(pos) as cc.Vec2;
        this.tipsNode.getChildByName('name').getComponent(cc.Label).string = info.name;
        this.tipsNode.getChildByName('detail').getComponent(cc.Label).string = info.detail;
        const button = this.tipsNode.getChildByName('useBtn').getComponent(cc.Button);

        pos.x = pos.x-50;
        pos.y = pos.y+40;

        this.tipsNode.setPosition(pos);
        this.tipsNode.active = true;
        const wpos = Common.getWorldPos(this.tipsNode);
        if (wpos.x + this.tipsNode.width * (1 - this.tipsNode.anchorX) > cc.winSize.width) {
            this.tipsNode.x -= this.tipsNode.width * 0.4;
            this.tipsNode.getChildByName('bg').scaleX = -1;
        } else {
            this.tipsNode.getChildByName('bg').scaleX = 1;
        }
        if (info.isBagUse && count > 0) {
            this._selectType = type;
            button.interactable = true;
        } else {
            button.interactable = false;
        }
    }

    public useProps() {
        switch (this._selectType) {
            case PropType.PowerBottle1:
            case PropType.PowerBottle2:
                const info = M.table.PropInfo.getByPrimaryKey(this._selectType);
                if (M.runtime.getCurrency(CurrencyId.Power) >= MaxPowerCount) {
                    M.tips.show(WaringTips.PowerMax);
                } else {
                    M.runtime.addCurrency(CurrencyId.Power, info.value);
                    M.event.send(Event.GameCMD.PropUsed);
                    M.runtime.updatePropCount(this._selectType, -1);
                }
                break;
        }
    }

}
