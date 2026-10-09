import { Gnome } from "../../../Data/Interface/Level/ILevel";
import GroundCellModel from "../GroundCellModel";

export default abstract class MultipleGridColBase {

    protected index: number = 0;

    protected _cfg: Gnome[] = null;

    protected _count = 0;

    protected _pool: { [inx: number]: cc.Vec2[] } = {};

    constructor(data: Gnome[], index) {
        this.index = index;
        this._cfg = [];
        for (let i = data.length; i--;) {
            if (data[i].index == undefined || data[i].index == index) {
                this._cfg.push(data[i]);
            }
        }
        this._cfg.sort((a, b) => {
            return a.y - b.y
        });
    }

    public get config(): Gnome[] {
        return this._cfg;
    }

    public get count(): number {
        return this._count;
    }

    public getData(): { [inx: number]: cc.Vec2[] } {
        return this._pool;
    }

    public checkItemCompletByIndex(idx: number | string): boolean {
        const result = (this._pool[idx] && this._pool[idx].length <= 0);
        if (result) {
            this._count--;
            delete this._pool[idx];
        }
        return result;
    }

    public updateItemCountByPos(pos: cc.Vec2): number | string {
        for (let idx in this._pool) {
            const items = this._pool[idx];
            for (let i = items.length; i--;) {
                const item = items[i];
                if (pos.x == item.x && pos.y == item.y) {
                    items.splice(i, 1);
                    return idx;
                }
            }
        }
    }

    public abstract sync2View(groundList: GroundCellModel[][]);
    public abstract onComplet(index: number, topPoint: cc.Vec2);

}