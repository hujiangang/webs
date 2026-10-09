
export default class LevelUpReward {

    constructor(data: any) {
        this.id = data.id;
        this._parseRewardInfo(data.reward);
    }

    public readonly id: number = null;

    public rewards: Array<{ type: number, count: number }> = null;

    private _parseRewardInfo(reward: Array<string>) {
        if (reward) {
            this.rewards = [];
            reward.forEach(item => {
                if (item) {
                    const sc = <any>item.split('|');
                    const type = Number(sc[0]);
                    if (type != null && type != undefined) {
                        this.rewards.push({ type, count: Number(sc[1]) });
                    }
                }
            });
        }
    }
}