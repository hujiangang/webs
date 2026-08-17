import { IConfigItem } from "../../Logic/Common/CommonInterfaces";


export default class DailyTaskInfo {

    public readonly id: number = null;
    public readonly type: number = null;
    public readonly name: string = null;
    public readonly condition: number = null;
    public conditionType: string = null;
    public conditionSubType: string = null;
    public readonly rewards: { type: number, count: number }[] = null;

    public constructor(data) {

        this.id = Number(data.id);
        this.type = Number(data.type);
        this.condition = Number(data.condition);

        this.name = data.name;

        this._parseConditionType(data.conditionType);
        this.rewards = [{ type: Number(data.rewards.name), count: data.rewards.count }];
    }

    private _parseConditionType(type: string) {
        if (type) {
            const tmpData = type.split('|')
            if (tmpData.length == 1) {
                this.conditionType = type;
            } else {
                this.conditionType = tmpData[0];
                this.conditionSubType = tmpData[1];
            }
        }
    }

}