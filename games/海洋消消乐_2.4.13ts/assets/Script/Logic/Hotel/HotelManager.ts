import { HotelData } from "./HotelData";
import HotelRoomCfg from "../../Base/Tabls/HotelRoomCfg";


export class HotelManager {

    /** 查看该物件是否已经修缮完毕 */
    public static getSlotUnlock(roomId, slotId): boolean {
        let slotData = HotelData.getSlotData(roomId, slotId);
        return (slotData && slotData.state > 0);
    }

    /** 判断该物件是否显示解锁icon //显示逻辑: 每次最多显示两个可以解锁物件。按顺序显示 */
    public static checkSlotUnlockShow(roomId: number, index: number) {
        const config = HotelData.getRoomSlotsConfig(roomId);

        let isOpen = this.getSlotUnlock(roomId, config.get(index - 1).slotId);
        if (isOpen) return false;
        //检查前一组是否都解锁完毕
        let lastGroupIndex = index % 2 == 0 ? [index - 3, index - 2] : [index - 2, index - 1];
        for (let i = 0; i < lastGroupIndex.length; ++i) {
            if (lastGroupIndex[i] <= 0) {
                continue;
            }
            if (!this.getSlotUnlock(roomId, config.get(lastGroupIndex[i] - 1).slotId)) {
                return false;
            }
        }
        return true;
    }

    /** 判断房间内物件全部解锁完毕 */
    public static checkRoomSlotsFinished(roomId) {
        if (roomId < 1) return true;
        let result = true
        let configs = HotelData.getRoomSlotsConfig(roomId).values();
        let cfg: IteratorResult<HotelRoomCfg> = null
        while (cfg = configs.next(), !cfg.done) {
            let checkOpen = HotelManager.getSlotUnlock(roomId, cfg.value.slotId);
            if (!checkOpen) {
                result = false;
                break;
            }
        }
        return result;
    }
}