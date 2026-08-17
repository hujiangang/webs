import { HotelData, ISlotData } from "./HotelData";
import Common from "../Common/Common";
import Paths from "../../Base/Utils/Paths";
import HotelRoomCfg from "../../Base/Tabls/HotelRoomCfg";
import M from "../../Base/Manager/M";
import { Event } from "../Data/Const/Event";
import { HotelManager } from "./HotelManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RoomDetailItemCtrl extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Sprite)
    bgSp: cc.Sprite = null;

    @property(cc.Sprite)
    iconSp: cc.Sprite = null;

    @property([cc.SpriteFrame])
    bgFrame: cc.SpriteFrame[] = [];

    @property(cc.Node)
    lockNode: cc.Node = null;

    private _cfg: HotelRoomCfg = null;
    private _curSubId: number = 1;
    private _isSelected: boolean = false;

    private _isLocked: boolean = false;

    public index: number = null;

    onLoad() {
        M.event.register(Event.Hotel.ShowSubSlot, this._stateChanged, this);
        M.event.register(Event.Hotel.HideSubSlot, this._hideSelect, this);
        M.event.register(Event.Hotel.SlotUnlock, this._onSubSlotUpdate, this);
        M.event.register(Event.Hotel.TouchSlotIcon, this._onSlotIconClick, this);
    }

    onDestroy() {
        M.event.unRegister(Event.Hotel.ShowSubSlot, this._stateChanged, this);
        M.event.unRegister(Event.Hotel.HideSubSlot, this._hideSelect, this);
        M.event.unRegister(Event.Hotel.SlotUnlock, this._onSubSlotUpdate, this);
        M.event.unRegister(Event.Hotel.TouchSlotIcon, this._onSlotIconClick, this);
    }

    public init(index: number, cfg: HotelRoomCfg) {
        this.index = index;
        this.iconSp.spriteFrame = null;
        this._cfg = cfg;
        this.nameLabel.string = this._cfg.slotName;
        this._initIcon();
        this._updateLock();
    }

    private _updateLock() {
        this._isLocked = !HotelData.getSlotData(this._cfg.roomId, this._cfg.slotId);
        this.lockNode.active = this._isLocked;
    }

    private _initIcon() {
        const slotData = HotelData.getSlotData(this._cfg.roomId, this._cfg.slotId);
        if (slotData && slotData.state > 0) {
            //取当前的...,
            this._curSubId = slotData.subId;
        }
        this._updateIcon(this._curSubId);
    }

    private _onSubSlotUpdate(data: ISlotData) {
        if (this._isLocked) {
            this._updateLock();
            if (!this._isLocked) {
                this.onClick()
            }
        }

        if (this._cfg.slotId == data.slotId && this._curSubId != data.subId) {
            this._updateIcon(data.subId)
        }
    }

    private _updateIcon(subId: number) {
        this._curSubId = subId;
        Common.getRes<cc.SpriteFrame>(`${Paths.RoomPicPath}room${this._cfg.roomId}/${subId}/slot_${this._cfg.slotId}`, cc.SpriteFrame).then(res => {
            if (res) {
                this.iconSp.spriteFrame = res;
                this._resetIconContentSize();
            }
        });
    }

    private _resetIconContentSize() {
        const size = this.iconSp.node.getContentSize();
        if (size.width > size.height) {
            //长比宽小,以宽为准
            this.iconSp.node.scale = 110 / size.width;
        } else {
            //长比宽大,以长为准
            this.iconSp.node.scale = 110 / size.height;
        }
    }

    private _stateChanged() {
        if (this._isSelected) {
            //同步状态到房间上!! 
            M.event.send(Event.Hotel.ChangeSlot, this._cfg.slotId);
            this.bgSp.spriteFrame = this.bgFrame[0];
            this._isSelected = false;
        }
    }

    private _hideSelect() {
        if (this._isSelected) {
            this._stateChanged();
        }
    }

    private _onSlotIconClick(slotId: number | string) {
        if (this._cfg.slotId == slotId) {
            this.onClick();
        }
    }

    public onClick() {
        if (this._isLocked) {
            if (HotelManager.checkSlotUnlockShow(this._cfg.roomId, this.index)) {
                let slotData: ISlotData = { roomId: this._cfg.roomId, slotId: this._cfg.slotId, subId: 1, state: 0 };
                M.event.send(Event.Hotel.UIRoomUnlock, slotData);
            } else {
                M.tips.show(`继续装修房间,就可以解锁 ${this._cfg.slotName}!`);
            }
            return;
        }
        if (!this._isSelected) {
            M.event.send(Event.Hotel.ShowSubSlot, this._cfg);
            this.scheduleOnce(() => {
                this.bgSp.spriteFrame = this.bgFrame[1];
                this._isSelected = true;
            }, 0);
        } else {
            M.event.send(Event.Hotel.HideSubSlot, this._cfg.slotId);
        }
    }

}
