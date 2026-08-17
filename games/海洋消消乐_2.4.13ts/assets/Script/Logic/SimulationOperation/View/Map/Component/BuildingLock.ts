import EventMgr from "../../../../../Base/Manager/EventMgr";
import { Event } from "../../../../Data/Const/Event";
import Exchange from "../Exchange";
import { ISlotData } from "../../../../Hotel/HotelData";
import Common from "../../../../Common/Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingLock extends cc.Component {
    @property(cc.Sprite)
    icon: cc.Sprite = null;

    private _iconId: number = 0;
    private _buildingId: number = 0;
    private _exchange: Exchange = null;

    public setData(iconId: number, buildingId: number, exchange: Exchange) {
        this._iconId = iconId;
        this._buildingId = buildingId;
        this._exchange = exchange;
    }

    public onEnable() {
        this.setIcon();
    }

    private setIcon() {
        // cc.loader.loadRes("texture/map/ui/icon/building_icon_" + this._iconId, cc.SpriteFrame, (err, spriteFrame) => {
        //     this.icon.spriteFrame = spriteFrame;
        // });

        // cc.loader.loadRes("texture/hotel/slotIcon/slot_icon_1"  /*this._iconId*/, cc.SpriteFrame, (err, res: cc.SpriteFrame) => {
        //     this.icon.spriteFrame = res;
        // });
    }

    public onIconClick() {
        // EventMgr.ins.send(Event.Map.ShowTool, this._buildingId, this.node.position, this._exchange);
        //解锁时默认子id为第一套!!
        let slotData: ISlotData = { roomId: this._roomId, slotId: this._slotId, subId: 1, state: 0 };
        EventMgr.ins.send(Event.Hotel.UIRoomUnlock, slotData, Common.getWorldPos(this.node));
    }

    public onDestroy() {
        this._exchange = null;
        this._buildingId = null;
        this._iconId = null;
    }

    /**   新海岛酒店 */
    private _roomId: number = -1;
    private _slotId: number = -1;
    public setHotelData(roomId: number, slotId: number) {
        this._roomId = roomId;
        this._slotId = this._iconId = slotId;
    }

    //返回世界坐标
    // public getWorldPosition() {
    //     return this.node.parent.convertToWorldSpaceAR(this.node.position);
    // }
}