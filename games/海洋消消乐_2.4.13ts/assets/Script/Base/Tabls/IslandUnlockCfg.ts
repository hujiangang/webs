import { IConfigItem } from "../../Logic/Common/CommonInterfaces";

export interface IIslandUnlockCfg {
    id: number
    starlv: number
    buildId: number
    buildName: string
    desc: string
    choose: number
    iconId: number
    price: IConfigItem[],
    isShare: number,
}

export default class IslandUnlockCfg implements IIslandUnlockCfg {
    price: any[];
    id: number;
    starlv: number;
    buildId: number;
    buildName: string;
    desc: string;
    choose: number;
    iconId: number;
    isShare: number;

    public constructor(data: IIslandUnlockCfg) {
        this.id = data.id;
        this.starlv = data.starlv;
        this.buildId = data.buildId;
        this.buildName = data.buildName;
        this.desc = data.desc;
        this.choose = data.choose;
        this.price = data.price;
        this.iconId = data.iconId;
        this.isShare = data.isShare;
    }
}