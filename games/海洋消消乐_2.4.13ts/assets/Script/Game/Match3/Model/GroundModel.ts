import { Grid } from "../../Data/Interface/Level/ILevel";
import GroundCellModel from "./GroundCellModel";


export class GroundModel {

    //地面网格数据列表(一些不会动的东西)
    private gCellList: GroundCellModel[][] = null;

    constructor() {
        this.gCellList = [];
    }

    /**初始化网格数据 */
    public initGroupCell(data: Grid, x: number, y: number, index: number): GroundCellModel {
        const item = new GroundCellModel(data, cc.v2(x, y), index);
        const warr = this.gCellList[y] || [];
        warr.push(item);
        this.gCellList[y] = warr;
        return item;
    }

    public getGroupCellList(): Array<Array<GroundCellModel>> {
        return this.gCellList;
    }

    /**通过网格坐标获取cell值 */
    public getGCellByPos(pos: { x: number, y: number }): GroundCellModel {
        return this.gCellList[pos.y][pos.x]
    }

}
