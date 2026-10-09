import Common from "../../Common/Common";
import { Grid } from "../../Data/Interface/Level/ILevel";

/**
 * 所有元素的基础爸爸
 */
export enum MsgType {
    BesideElimate,
    ElimateAll,
    Elimate,
    Fall,
    FallEnd,
    UpGroundDone,
    Bomb,
    Portal,
    ComplexBomb
}
export abstract class CellBase<T, K> {

    private _extData: cc.Node = null;

    protected lv: number = 0;
    protected type: T = null;
    protected data: Grid = null;
    /**属于哪个下标的地图 */
    protected mapIndex: number = 0;
    protected ctrlName: string = null;

    /**网络坐标 */
    protected _pos: cc.Vec2 = null;

    protected _isDeath: boolean = false;

    public extCtrl: K = null;

    public get isDeath(): boolean {
        return this._isDeath;
    }

    // public set isDeath(state: boolean) {
    //     this._isDeath = state
    // }

    /**当前的网格坐标 */
    public get pos(): cc.Vec2 {
        return this._pos;
    }

    public set pos(p: cc.Vec2) {
        this.onChangePos(p);
        this._pos = p;
    }

    /**界面坐标 */
    public getPosition(): cc.Vec2 {
        return Common.getPos(this._pos.x, this._pos.y, this.mapIndex);
    }

    /**获取障碍物等级 */
    public getLv(): number {
        return this.lv;
    }

    /**增量更新障碍物等级 */
    public setLv(num: number) {
        this.lv += num;
        this.lv = this.lv < 0 ? 0 : this.lv;
    }

    public getMapIndex(): number {
        return this.mapIndex
    }

    public getType(): T {
        return this.type;
    }

    public get gridData() {
        return this.data;
    }

    public get extData(): cc.Node {
        return this._extData;
    }

    public set extData(node: cc.Node) {
        this._extData = node;
        this.extCtrl = node.getComponent(this.ctrlName);
    }

    public destory() {
        this.data = null;
        this._extData = null;
        this.extCtrl = null;
    }

    public abstract init(data: Grid);

    public abstract onUnBind(unBindPos: cc.Vec2);

    public abstract onBind(bindModel: any);

    public abstract onMsg(type: MsgType);

    protected abstract onChangePos(pos: cc.Vec2);

}