

export default class ShopInfo {

    public readonly id: number = null;
    public readonly name: string = null;
    public readonly flag: number = null;
    public readonly res: string = null;
    public currencyType: number = null;
    public price: number = null;
    public content: Array<{ type: number, count: number }> = null;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.flag = data.flag;
        this.res = data.res;
        this._parsePrice(data.price);
        this._parseContent(data.content);
    }

    private _parsePrice(priceCfg: string) {
        const sc = priceCfg.split('|');
        this.currencyType = Number(sc[0]);
        this.price = Number(sc[1]);
    }

    private _parseContent(reward: Array<string>) {
        if (reward) {
            this.content = [];
            reward.forEach(item => {
                if (item) {
                    const sc = <any>item.split('|');
                    const type = Number(sc[0]);
                    if (type != null && type != undefined) {
                        this.content.push({ type, count: Number(sc[1]) });
                    }
                }
            });
        }
    }
}