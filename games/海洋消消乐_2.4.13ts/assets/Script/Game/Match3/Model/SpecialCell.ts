import { UpGroundType } from "../../Data/Const/Constant";

export default class SpecialCell {

    private _type: UpGroundType = UpGroundType.None;

    private _lv: number = 0;

    private plug = null;

    constructor(type: UpGroundType, lv: number) {
        this._type = type;
        this._lv = lv;

        this.initPlug();
    }

    private initPlug() {
        switch (this.type) {
            case UpGroundType.Box:
                this.plug = null;
                break;
            case UpGroundType.Ice:
                this.plug = null;
                break;
            case UpGroundType.Lock:
                this.plug = null;
                break;
        }
    }

    public get lv(): number {
        return this._lv;
    }

    /**增量更新障碍物等级 */
    public setLv(num: number): number {
        this._lv += num;
        this._lv = this._lv < 0 ? 0 : this._lv;
        return this._lv;
    }

    public get type(): UpGroundType {
        return this._type;
    }

    public getFeaturePlug() {
        return this.plug;
    }

}
