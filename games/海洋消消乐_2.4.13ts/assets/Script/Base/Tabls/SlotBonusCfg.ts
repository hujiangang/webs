
export default class SlotBonusCfg {

    public readonly id: number = null;
    public readonly roomId: number = null;
    public readonly count: number = null;
    public readonly bonus: number = null;

    public constructor(data) {
        this.id = data.id;
        this.roomId = data.roomId;
        this.count = data.count;
        this.bonus = data.bonus;
    }


} 