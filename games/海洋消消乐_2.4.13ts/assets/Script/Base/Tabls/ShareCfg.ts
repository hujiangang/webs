import { IConfigItem } from "../../Logic/Common/CommonInterfaces"

export interface ISharecfg {
    id: number
    shareType: number
    shareImg: string
    shareText: string
    reward: IConfigItem[]
    level: number
    buildId: number
}

export default class ShareCfg implements ISharecfg {
    id: number
    shareType: number
    shareImg: string
    shareText: string
    reward: IConfigItem[]
    level: number
    buildId: number

    public constructor(data: ISharecfg) {
        this.id = data.id;
        this.shareType = data.shareType;
        this.buildId = data.buildId;
        this.shareImg = data.shareImg;
        this.shareText = data.shareText;
        this.reward = data.reward;
        this.level = data.level;
        this.buildId = data.buildId;
    }
}