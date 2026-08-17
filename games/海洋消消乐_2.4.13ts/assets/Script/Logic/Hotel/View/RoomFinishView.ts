import UIBase from "../../../Base/UI/UIBase";
import { HotelData } from "../HotelData";
import Common from "../../Common/Common";
import UIMgr from "../../../Base/Manager/UIMgr";
import { UIHudDef } from "../../Data/Interface/UIData";
import M from "../../../Base/Manager/M";
import { CurrencyId } from "../../../Base/BaseConst";

const { ccclass, property } = cc._decorator;

@ccclass
export class RoomFinishView extends UIBase {

    @property(cc.Label)
    labelCoin: cc.Label = null;

    // @property(cc.Label)
    // labelButton: cc.Label = null;

    private _buildingId: number = null;

    // private _isShare: boolean = false;

    public onInit(buildingId: number) {
        this._buildingId = buildingId;
    }

    onStart() {
        this.initRoomData();
    }
    /** 新海岛酒店版本 */
    private initRoomData() {
        //检查是否有下一个房间可以解锁
        // let nextRoomConfig = HotelData.getHotelRoomConfig(this._buildingId + 1);
        // if (nextRoomConfig == null) {
        //     console.error("没有下一个房间可以解锁了");
        //     // return;
        // }

        let roomConfig = HotelData.getHotelRoomConfig(this._buildingId);
        if (roomConfig) {
            this.labelCoin.string = "x" + Common.bytesToSize(roomConfig.finishReward[0].num);
        }
    }

    public onClickBtn() {
        let roomConfig = HotelData.getHotelRoomConfig(this._buildingId);
        if (roomConfig) {
            M.runtime.addCurrency(CurrencyId.Coin, roomConfig.finishReward[0].num);
        }
        this.close();
    }

    public close() {
        UIMgr.ins.closeUI(UIHudDef.RoomFinishView);
    }
}