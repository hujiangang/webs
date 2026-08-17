import { CurrencyId } from "../BaseConst";
import { promisify } from "util";

export default class PropInfo {

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.detail = data.detail || '';
        this.res = data.res;
        this.value = data.v;
        this.isBagUse = data.baguse;
        this.unlockLv = data.unlock || 0;
        this._parsePrice(data.price);

    }

    public readonly id: number = null;

    public currencyType: CurrencyId = CurrencyId.Coin;

    public price: number = null;

    public readonly name: string = null;

    public readonly detail: string = null;

    public readonly res: string = null;

    public readonly value: number = null;

    public readonly isBagUse: boolean = false;

    public readonly unlockLv: number = 0;

    private _parsePrice(price: string) {
        if (price) {
            const cfg = price.split('|')
            this.currencyType = Number(cfg[0]);
            this.price = Number(cfg[1]);
        }
    }

}