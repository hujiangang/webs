import { StorageMgr } from "../../Base/Manager/StorageMgr";
import M from "../../Base/Manager/M";
import HotelRoomCfg from "../../Base/Tabls/HotelRoomCfg";
import HotelCfg from "../../Base/Tabls/HotelCfg";
import { NativeKey } from "../Data/Const/Constant";
import SlotBonusCfg from "../../Base/Tabls/SlotBonusCfg";

//一个房间内的所有数据
export interface IRoomData {
    roomId: number,  //房间id
    slots: { [key: number]: ISlotData },  //物件id
    score: number
}

//一个物件的数据
export interface ISlotData {
    roomId: number,  //所属房间id
    slotId: number,  //本物件id
    subId: number,   //物件的子id,因为有多个皮肤
    state: number,   //物件的状态 0=未解锁 1=已解锁默认皮肤
    position?: cc.Vec2,       //物件的位置   
}

export class HotelData {

    //所有房间的数据
    private static _roomData: { [key: number]: IRoomData } = null;
    private static _slotData = null;

    private static _lockItems: Map<string, cc.Node> = null;


    public static initData() {
        this._roomData = {};
        let roomDatas = StorageMgr.Storage.getObject(StorageMgr.Storage.HotelData, {});
        for (let i in roomDatas) {
            // roomDatas[i]['slots'] 
            this._roomData[Number(i)] = roomDatas[i];
        }
        this._slotData = StorageMgr.Storage.getObject(NativeKey.HotelSlotData, {});
        console.error("房间数据", this._roomData);
    }

    public static addLockItem(roomid, slotid, item) {
        if (!this._lockItems) {
            this._lockItems = new Map();
        }
        this._lockItems.set([roomid, slotid].join('_'), item);
    }

    public static getLockItem(roomid, slotid): cc.Node {
        let result = null;
        if (this._lockItems) {
            result = this._lockItems.get([roomid, slotid].join('_'));
        }
        return result;
    }

    /**获取配件的购买状态 */
    public static getSubSlotStateData(data: ISlotData): boolean {
        return this._slotData[[data.roomId, data.slotId, data.subId].join('')];
    }

    /**设置配件的购买状态 */
    public static setSubSlotStateData(data: ISlotData) {
        const key = [data.roomId, data.slotId, data.subId].join('');
        this._slotData[key] = 1;
        StorageMgr.Storage.setObject(NativeKey.HotelSlotData, this._slotData);
    }

    /** 返回酒店房间的配置 */
    public static getHotelRoomConfig(roomId: number): HotelCfg {
        let configs = M.table.HotelCfg.getData();
        for (let i = 0; i < configs.length; ++i) {
            if (configs[i].roomId == roomId) {
                return configs[i];
            }
        }
        return null;
    }

    /**返回该房间所有物件的配置*/
    public static getRoomSlotsConfig(roomId: number): Map<number, HotelRoomCfg> {
        let configs = M.table.HotelRoomCfg.getData();
        let curConfig: Map<number, HotelRoomCfg> = new Map();
        configs.forEach((iconfig, i) => {
            if (iconfig.roomId == roomId) {
                curConfig.set(i, iconfig);
            }
        });
        return curConfig;
    }

    public static getSlotBonusByCount(roomId: number, count: number) {
        const data = M.table.SlotBonusCfg.getData();
        let result = 0;
        let roomCfg: Array<SlotBonusCfg> = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].roomId == roomId) {
                roomCfg.push(data[i])
            }
        }
        for (let i = 0; i < roomCfg.length; i++) {
            const cfg = roomCfg[i];
            const nextCfg = roomCfg[i + 1];
            if (nextCfg && count >= cfg.count && count < nextCfg.count) {
                result = cfg.bonus;
                break;
            } else if (count == cfg.count) {
                result = cfg.bonus;
                break;
            }
        }
        return result;
    }

    /** 获取房间单个物件的配置 */
    public static getSlotConfig(roomId: number, slotId: number): HotelRoomCfg {
        return M.table.HotelRoomCfg.getByPrimaryKeys(roomId, slotId);
    }

    //返回房间的数据
    public static getRoomData(roomId): IRoomData {
        return this._roomData[roomId];
    }

    //放回房间物件的数据
    public static getSlotData(roomId: number, slotId: number | string): ISlotData {
        let roomData = this.getRoomData(roomId);
        if (roomData && roomData.slots && roomData.slots[slotId]) {
            return roomData.slots[slotId];
        }
        return null;
    }

    //更新物件数据
    public static updateSlotData(slotData: ISlotData) {

        let roomData = this.getRoomData(slotData.roomId) as IRoomData;
        if (roomData == null) {
            roomData = { roomId: slotData.roomId, slots: {}, score: 0 };
        }
        roomData.slots[slotData.slotId] = slotData;  //[slotData.roomId, slotData.slotId, slotData.subId, slotData.state];
        this._roomData[slotData.roomId] = roomData;
        StorageMgr.Storage.setObject(StorageMgr.Storage.HotelData, this._roomData, true);
        return roomData;
    }

    public static getScoreByRoomId(roomId: number): number {
        let roomData = this.getRoomData(roomId) as IRoomData;
        return roomData ? roomData.score || 0 : 0;
    }

    public static updateRoomScore(roomId: number, score: number) {
        let roomData = this.getRoomData(roomId) as IRoomData;
        if (!roomData) {
            roomData = { roomId, slots: {}, score };
        } else {
            roomData.score = score;
        }
        this._roomData[roomId] = roomData;
        StorageMgr.Storage.setObject(StorageMgr.Storage.HotelData, this._roomData, true);
    }

}

window["HotelData"] = HotelData;