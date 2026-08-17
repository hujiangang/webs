import EventMgr from "../../Base/Manager/EventMgr";
import { Event } from "../Data/Const/Event";
import { ISlotData, HotelData } from "./HotelData";
import { MoneyManager } from "../Data/MoneyManager";
import UIMgr from "../../Base/Manager/UIMgr";
import { UIHudDef } from "../Data/Interface/UIData";
import Common from "../Common/Common";

const { ccclass, property } = cc._decorator;
@ccclass
export class RoomBuyCtrl extends cc.Component {
    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    priceLabel: cc.Label = null;

    @property(cc.Sprite)
    iconSp: cc.Sprite = null;

    @property(cc.Sprite)
    moneyIcon: cc.Sprite = null;

    @property([cc.SpriteFrame])
    moneyIconFrames: cc.SpriteFrame[] = [];

    onLoad() {
        EventMgr.ins.register(Event.Hotel.UIRoomUnlock, this.showUnlock, this);
        EventMgr.ins.register(Event.Hotel.MapScrollBegin, this.hideUnlock, this);
        this.node.zIndex = 100;
    }

    onDestroy() {
        EventMgr.ins.unRegister(Event.Hotel.UIRoomUnlock, this.showUnlock, this);
        EventMgr.ins.unRegister(Event.Hotel.MapScrollBegin, this.hideUnlock, this);

        this._slotData = null;
    }

    public onClickBuy() {

        this.node.active = false;
        this._slotData.state = 1;

        //需要确定这里的 subid
        this._slotData.subId = 1;

        let slotConfig = HotelData.getSlotConfig(this._slotData.roomId, this._slotData.slotId);
        if (slotConfig) {
            let moneyCheck = MoneyManager.CheckMoneyJson(slotConfig.prices[0], true);
            if (moneyCheck) {
                HotelData.setSubSlotStateData(this._slotData);
                EventMgr.ins.send(Event.Hotel.SlotUnlock, this._slotData);
                EventMgr.ins.send(Event.Hotel.TouchSlotIcon, this._slotData.slotId);
            } else {
                // UIMgr.ins.showUI(UIHudDef.SelectShowTarget, { type: UIHudDef.SelectShowTarget, data: null });
                UIMgr.ins.showUI(UIHudDef.MoreCoin);
            }
        }
    }

    private _slotData: ISlotData = null;
    private showUnlock(data: ISlotData, position) {
        this._slotData = data;
        if (!position) {
            position = Common.getWorldPos(HotelData.getLockItem(this._slotData.roomId, this._slotData.slotId));
        }
        this.node.active = true;
        let slotPosition = this.node.parent.convertToNodeSpaceAR(position);
        this.node.setPosition(cc.v2(slotPosition.x, slotPosition.y + this.node.height / 2 + 80));
        let slotConfig = HotelData.getSlotConfig(this._slotData.roomId, this._slotData.slotId);

        if (slotConfig) {
            const p = slotConfig.prices[0];
            this.nameLabel.string = slotConfig.slotName;
            if (p) {
                this.moneyIcon.spriteFrame = this.moneyIconFrames[p.itemId]
                this.priceLabel.string = "x" + Common.bytesToSize(p.num);
            }
        }
        // cc.loader.loadRes("texture/hotel/slotIcon/slot_icon_1"/* + data.slotId*/, cc.SpriteFrame, (err, spriteFrame) => {
        //     this.iconSp.spriteFrame = spriteFrame;
        // }); 
        this.show();
    }

    private hideUnlock() {
        this.node.active = false;
    }

    public show() {
        let animation = this.node.getComponent(cc.Animation);
        animation.play();
    }
}