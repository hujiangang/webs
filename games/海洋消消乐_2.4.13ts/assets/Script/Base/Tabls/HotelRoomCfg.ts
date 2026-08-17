import { IConfigItem } from "../../Logic/Common/CommonInterfaces";

export interface IHotelRoomCfg {
    id: number
    roomId: number
    slotId: number
    prices: IConfigItem[]
    slotName: string
}

export default class HotelRoomCfg implements IHotelRoomCfg {

    public readonly id: number = null;
    public readonly roomId: number = null;
    public readonly slotId: number = null;
    public readonly slotName: string = null;
    public prices: IConfigItem[] = null
    public animationOpts: Map<number, boolean> = null;

    public constructor(data) {
        this.id = data.id;
        this.roomId = data.roomId;
        this.slotId = data.slotId;
        this.slotName = data.name;
        this._parsePrices(data.price);
        this._parseAnimationOpt(data.animation);
    }

    private _parseAnimationOpt(opt: string) {
        if (opt) {
            this.animationOpts = new Map();
            const opts = opt.split('|')
            for (let i = 1; i <= opts.length; i++) {
                this.animationOpts.set(i, !!Number(opts[i - 1]));
            }
        }
    }

    private _parsePrices(data: string[]) {
        if (!this.prices && data) {
            this.prices = [];
            for (let i = 0; i < data.length; i++) {
                const sd = data[i].split('|')
                if (sd[0]) {
                    this.prices.push({ id: i + 1, itemId: Number(sd[0]), num: Number(sd[1]), extData: Number(sd[2]) });
                }
            }
        }
    }
}