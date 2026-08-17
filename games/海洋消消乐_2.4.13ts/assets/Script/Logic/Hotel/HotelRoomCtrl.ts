import { RoomSlotCtrl } from "./RoomSlotCtrl";
import { Event } from "../Data/Const/Event";
import EventMgr from "../../Base/Manager/EventMgr";
import { HotelData, ISlotData, IRoomData } from "./HotelData";
import { HotelManager } from "./HotelManager";
import RoomDetailCtrl from "./RoomDetailCtrl";

const { ccclass, property } = cc._decorator;
@ccclass
export class HotelRoomCtrl extends cc.Component {

    @property(cc.Sprite)
    bgSp: cc.Sprite = null;

    @property(cc.Prefab)
    unlockItem: cc.Prefab = null;

    @property(cc.Mask)
    maskItem: cc.Mask = null;

    @property(cc.Label)
    LabelTips: cc.Label = null;

    @property([cc.SpriteFrame])
    slotThumbnail: cc.SpriteFrame[] = [];

    private _roomId: number = 1;
    private _detailCtrl: RoomDetailCtrl = null;
    private _currentTouchPoints: cc.Vec2[] = null;

    private _slotMap: Map<number, RoomSlotCtrl | Array<RoomSlotCtrl>> = null;

    onLoad() {
        EventMgr.ins.register(Event.Hotel.SlotUnlock, this.onSlotUnlock, this);
        this._currentTouchPoints = this.getComponent(cc.PolygonCollider).points;
    }

    onDestroy() {
        EventMgr.ins.unRegister(Event.Hotel.SlotUnlock, this.onSlotUnlock, this);
        this._slotMap.clear();
    }

    public init(roomId, roomData?: IRoomData, detailCtrl: RoomDetailCtrl = null) {
        this._detailCtrl = detailCtrl;
        this._roomId = roomId;
        this.updateSlots(roomData);
    }

    public getSoltFrames(slotId: number): Array<cc.SpriteFrame> {
        const rst = [];
        for (let i = 0; i < 3; i++) {
            rst.push(this.slotThumbnail[(i * 16) + (slotId - 1)])
        }
        return rst;
    }

    public touch(pos: cc.Vec2) {
        return cc.Intersection.pointInPolygon(this.node.convertToNodeSpaceAR(pos), this._currentTouchPoints);
    }
    private updateSlots(roomData: IRoomData) {
        const config = HotelData.getRoomSlotsConfig(this._roomId)
        config.forEach((value, key) => {
            if (value.slotId == 15) {
                for (let i = 1; i <= 3; i++) {
                    this._initSlotById(roomData, value.slotId, `slot${value.slotId}_${i}`, key)
                }
            } else {
                this._initSlotById(roomData, value.slotId, `slot${value.slotId}`, key);
            }
        });
    }

    private _initSlotById(roomData: IRoomData, slotId: number, slotName: string, index: number) {
        const slotCtrl = this.node.getChildByName(slotName).getComponent(RoomSlotCtrl);
        //如果是自己房间就用这个
        let data = null;
        if (roomData) {
            data = this._getGuestSlotData(roomData, slotId);
        } else {
            data = HotelData.getSlotData(this._roomId, slotId);
        }
        //如果是客人房间就用客人房间的数据填充! 
        slotCtrl.init(index + 1, roomData ? roomData.roomId : this._roomId, slotId, data, this.unlockItem, !!this._detailCtrl);
        if (!this._slotMap) {
            this._slotMap = new Map();
        }
        let rst = this._slotMap.get(slotId);
        if (slotId == 15) {
            //灯特殊处理.!
            if (!rst) {
                rst = [];
            }
            (<Array<RoomSlotCtrl>>rst).push(slotCtrl);
        } else {
            rst = slotCtrl;
        }
        this._slotMap.set(slotId, rst);
    }

    private _getGuestSlotData(roomData, slotId): ISlotData {
        if (roomData && roomData.slots && roomData.slots[slotId]) {
            return roomData.slots[slotId];
        }
    }

    //物件解锁 todo
    private onSlotUnlock(data: ISlotData) {
        if (this._roomId != data.roomId) {
            return;
        }
        const roomdata = HotelData.updateSlotData(data);
        if (this._detailCtrl) {
            this._detailCtrl.updateSlotData(roomdata);
        }

        let result = this.getSlot(data.slotId);
        if (result) {
            if (result instanceof Array) {
                result.forEach(ctrl => {
                    this._unLockSlot(ctrl, data.subId)
                })
            } else {
                this._unLockSlot(result, data.subId);
            }
        }
    }

    private _unLockSlot(slotCtrl: RoomSlotCtrl, subId: number) {
        slotCtrl && slotCtrl.doUnlock(subId, () => {
            this.updateSlots(null);
            let finished = HotelManager.checkRoomSlotsFinished(this._roomId);
            if (finished) {
                // let nextRoomConfig = HotelData.getHotelRoomConfig(this._roomId + 1);
                // var root = cc.find("UIRoot");
                // if (nextRoomConfig) {
                //     //整个房间解锁完毕 弹出成功面板
                //     if (!!root.getChildByName("BuildSeccess")) {
                //         return;
                //     };
                //     UIMgr.ins.showUI(UIHudDef.BuildSuccess, this._roomId);
                // } else {
                //     if (!!root.getChildByName("RoomFinishView")) {
                //         return;
                //     };
                //     UIMgr.ins.showUI(UIHudDef.RoomFinishView, this._roomId);
                // }

            }
        });
    }

    //获取物件脚本文件
    private getSlot(slotId: number): RoomSlotCtrl | Array<RoomSlotCtrl> {
        let result = null;
        if (slotId == 15) {
            result = [];
            for (let i = 1; i <= 3; i++) {
                result.push(this.node.getChildByName(`slot${slotId}_${i}`).getComponent(RoomSlotCtrl));
            }
        } else {
            result = this.node.getChildByName(`slot${slotId}`).getComponent(RoomSlotCtrl);
        }
        return result
    }

}