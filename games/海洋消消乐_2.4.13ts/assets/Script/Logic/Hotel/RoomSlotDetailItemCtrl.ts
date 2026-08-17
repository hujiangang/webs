import { IConfigItem } from "../Common/CommonInterfaces";
import Common from "../Common/Common";
import Paths from "../../Base/Utils/Paths";
import { HotelData, ISlotData } from "./HotelData";
import { MoneyManager } from "../Data/MoneyManager";
import M from "../../Base/Manager/M";
import { Event } from "../Data/Const/Event";
import { UIHudDef } from "../Data/Interface/UIData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RoomSlotDetailItemCtrl extends cc.Component {

    @property(cc.Label)
    money: cc.Label = null;

    @property(cc.Sprite)
    bgSp: cc.Sprite = null;

    @property(cc.Sprite)
    iconSp: cc.Sprite = null;

    @property(cc.Sprite)
    unitSp: cc.Sprite = null;

    @property(cc.Node)
    selectNode: cc.Node = null;

    @property(cc.Node)
    priceNode: cc.Node = null;

    @property([cc.SpriteFrame])
    bgFrame: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    currencyFrames: cc.SpriteFrame[] = [];

    private _cfg: IConfigItem = null;
    private _isUnlock: boolean = true;
    private _isSelect: boolean = false;


    // private _slotData: ISlotData = null;

    public roomId: number = null;
    public slotId: number = null;
    public subId: number = null;
    private _state: number = 1;

    private _confirmLabel: cc.Label = null;

    onLoad() {
        M.event.register(Event.Hotel.UpateSubSlotState, this._updateState, this);
        M.event.register(Event.Hotel.SelectSubSlot, this._onSelectConfirm, this);

    }

    onDestroy() {
        M.event.unRegister(Event.Hotel.UpateSubSlotState, this._updateState, this);
        M.event.unRegister(Event.Hotel.SelectSubSlot, this._onSelectConfirm, this);

    }

    public init(roomId: number, slotId: number, data: IConfigItem, frame: cc.SpriteFrame) {

        // this._confirmLabel = btnLabel;

        this.roomId = roomId;
        this.subId = data.id;
        this.slotId = slotId;

        // this._slotData = {
        //     roomId,
        //     slotId,
        //     subId: data.id,
        //     state: 1,
        // };

        this._cfg = data;
        this._initIcon(frame);
        this._initPrice();
    }

    private _initPrice() {

        const slotData = HotelData.getSlotData(this.roomId, this.slotId);
        //判断是否装备了.
        if (slotData && slotData.subId == this.subId) {
            this._showSelect(true);
        } else if (HotelData.getSubSlotStateData({ roomId: this.roomId, slotId: this.slotId, subId: this.subId, state: this._state, })) {
            //判断是否已经购买
            this._showSelect(false);
        } else {
            //没有购买
            this._isUnlock = false;
            this._state = 0;
            this.money.string = this._cfg.num.toString();
            this.unitSp.spriteFrame = this.currencyFrames[this._cfg.itemId];
            this._showSelect(false);
        }
    }

    private _initIcon(frame) {

        this.iconSp.spriteFrame = frame;
        this._resetIconSize();
        // Common.getRes<cc.SpriteFrame>(`${Paths.RoomPicPath}room${this.roomId}/${this.subId}/slot_${this.slotId}`, cc.SpriteFrame).then((res) => {
        //     if (res) {
        //         this.iconSp.spriteFrame = frame;
        //         this._resetIconSize();
        //     }
        // })

    }

    private _resetIconSize() {
        const size = this.iconSp.node.getContentSize();
        if (size.width > size.height) {
            //长比宽小,以宽为准
            this.iconSp.node.scale = 120 / size.width;
        } else {
            //长比宽大,以长为准
            this.iconSp.node.scale = 120 / size.height;
        }
    }

    private _showSelect(opt: boolean) {
        this.selectNode.active = opt;
        // this.priceNode.active = !opt;
        this._isSelect = opt;
        if (this._isUnlock) {
            this.priceNode.active = false;
        }

        if (opt) {
            const data = HotelData.getSlotData(this.roomId, this.slotId);
            //是否是当前选择
            if (!data || (data && data.subId != this.subId)) {
                M.runtime.RoomCurrentSelectSubSlotCfg = this._cfg;
            }
        }
        this.bgSp.spriteFrame = this.bgFrame[opt ? 1 : 0];
    }

    private _updateState(from) {
        if (this != from) {
            this._showSelect(false);
        }
    }

    private _onSelectConfirm() {
        if (this._isSelect) {
            const data = HotelData.getSlotData(this.roomId, this.slotId);
            if (data && data.subId == this.subId) {
                //如果当前选中是这个就不进行解锁操作.....
                return;
            }
            const slotData: ISlotData = { roomId: this.roomId, slotId: this.slotId, subId: this.subId, state: this._state, }
            slotData.state = this._state = 1
            this._isUnlock = true;
            this._showSelect(true);
            HotelData.setSubSlotStateData(slotData);
            M.event.send(Event.Hotel.UpateSubSlotState, this);
            M.event.send(Event.Hotel.SlotUnlock, slotData);
        }
    }

    public onClick() {
        //开始购买!
        if (!this._isSelect) {
            if (this._isUnlock) {
                this._isUnlock = true;
            }
            this._showSelect(true);
            M.event.send(Event.Hotel.UpateSubSlotState, this);
        }
    }


}
