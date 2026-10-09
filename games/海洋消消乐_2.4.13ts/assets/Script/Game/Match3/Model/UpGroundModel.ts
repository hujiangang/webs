import { Grid } from "../../Data/Interface/Level/ILevel";
import UGroundCellModel from "./UpGroundCellModel";
import { CellType } from "../../Data/Const/Constant";

export class UpGroundModel {

    //上层特殊元素
    private ugCellList: Array<Array<UGroundCellModel>> = null;

    private boxMap: Map<string, cc.Vec2> = null
    private portalMap: Map<number, { out: cc.Vec2, in: cc.Vec2 }> = null

    constructor() {
        this.ugCellList = [];
        this.boxMap = new Map();
        this.portalMap = new Map();
    }

    /**初始化网格数据 */
    public initUpGroupCell(data: Grid, x: number, y: number, index: number): UGroundCellModel {
        const item = new UGroundCellModel();
        item.init(data, x, y, index);
        const warr = this.ugCellList[y] || [];
        warr.push(item);
        this.ugCellList[y] = warr;
        if (item.isBox) {
            this.boxMap.set(this.getPosKey(item.pos), item.pos);
        }
        if (item.portalIdx) {
            this.syncPortal(item);
        }
        return item;
    }

    public getUGroupCellList(): Array<Array<UGroundCellModel>> {
        return this.ugCellList;
    }

    /**通过网格坐标获取cell值 */
    public getUGCellByPos(pos: { x: number, y: number }): UGroundCellModel {
        return this.ugCellList[pos.y][pos.x]
    }

    public updateCollectCount(type: CellType | string, pos: cc.Vec2) {
        if (type == 'box') {
            const key = this.getPosKey(pos);
            this.boxMap.has(key) && this.boxMap.delete(key);
        }
    }

    /**同步传送门的对照表! */
    private syncPortal(model: UGroundCellModel) {
        const key = Math.abs(model.portalIdx);
        const data = <any>this.portalMap.get(key) || {};
        if (model.portalIdx < 0) {
            data.in = model.pos;
        } else {
            data.out = model.pos;
        }
        this.portalMap.set(key, data);
    }

    private getPosKey(pos: cc.Vec2): string {
        return `${pos.x}-${pos.y}`
    }

    public getPortalPos(index: number): { in: cc.Vec2, out: cc.Vec2 } {
        return this.portalMap.get(Math.abs(index));
    }

    public getAllPortal() {
        return this.portalMap;
    }

    public get BoxMap(): Map<string, cc.Vec2> {
        return this.boxMap;
    }

}
