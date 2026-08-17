import { Event } from "../../Data/Const/Event";
import { CellModel } from "./CellModel";
import { IPoolData } from "../../../Base/DataPool";

export class GameTaskModel implements IPoolData {

    public type: number = 0;
    public action: Event.GameCMD = null;


    public model1: CellModel = null;
    public model2: any = null;

    public size: number = 0;
    /**额外附加的数据 */
    public extData: any = 0;
    /**待销毁的集合 */
    public closeAry: Set<any> = null;

    public cp1: cc.Vec2 = null;
    public cp2: cc.Vec2 = null;

    public keepTime: number = 0;

    public isNeedShowEff: boolean = true;

    constructor() {
        this.init();
    }

    destory() {
        this.init();
    }

    public init() {
        this.type = 0;
        this.action = null;

        this.model1 = null;
        this.model2 = null;

        this.size = 0;
        this.extData = 0
        this.closeAry = null;

        this.cp1 = null;
        this.cp2 = null;

        this.keepTime = 0;
    }

}