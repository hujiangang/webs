
export default class BoxRewardInfo {

    constructor(data: any) {
        this.id = data.id;
        this.content = data.content;
        this._parseRewardInfo();
    }

    public readonly id: number = null;

    public readonly content: Array<string> = null;

    public rewards: Array<{ type: number, count: number }> = null;

    private _parseRewardInfo() {
        if (this.content) {
            this.rewards = [];
            this.content.forEach(item => {
                if (item) {
                    const sc = <any>item.split('|');
                    const type = Number(sc[0]);
                    if (type != null && type != undefined) {
                        this.rewards.push({ type: type, count: Number(sc[1]) });
                    }
                }
            });
        }
    }
}