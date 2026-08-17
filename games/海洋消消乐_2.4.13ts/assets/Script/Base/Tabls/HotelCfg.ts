import { IConfigItem } from "../../Logic/Common/CommonInterfaces";

export interface IHotelCfg {
    id: number
    roomId: number
    openLevel: number
    roomName: string
    finishReward: IConfigItem[]
}

export default class HotelCfg implements IHotelCfg {
    finishReward: IConfigItem[];
    roomName: string;
    id: number;
    roomId: number;
    openLevel: number;

    public constructor(data: IHotelCfg) {
        this.id = data.id;
        this.roomId = data.roomId;
        this.openLevel = data.openLevel;
        this.roomName = data.roomName;
        this.finishReward = data.finishReward;
    }
}