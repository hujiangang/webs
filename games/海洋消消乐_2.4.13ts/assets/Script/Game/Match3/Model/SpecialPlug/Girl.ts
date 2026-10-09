import GameModel from "../GameModel";
import Common from "../../../Common/Common";
import { CellType } from "../../../Data/Const/Constant";
import { CellModel } from "../CellModel";

interface IGirl { index: number, path: number[][] }

export default class Girl {

    private _cfg: IGirl = null;
    private _path: cc.Vec2[] = null;
    private _currentStep: number = 0;
    private _triggerCount: number = 0;
    private _girlCell: CellModel = null;

    constructor(cfg: IGirl) {
        this._cfg = cfg;
        this._path = [];
    }

    private initStartPoint() {
        this._currentStep = 0;
        this._girlCell = Common.safeGet2ArrayValue(GameModel.ins.CellList, this._path[0]);
        this._girlCell.change2Cell(CellType.Girl);
    }

    private initEndPoint() {
        const endPos = this._path[this._path.length - 1];
        const endCellModel = Common.safeGet2ArrayValue(GameModel.ins.CellList, endPos);
        endCellModel.change2Cell(CellType.Conch);
    }

    private initRoad(pos: cc.Vec2) {
        //渲染路面
        const groundCellModel = Common.safeGet2ArrayValue(GameModel.ins.GroundList, pos);
        if (groundCellModel) {
            groundCellModel.showGirlGround();
        }
    }

    private execJump2NextStep() {
        if (this._girlCell) {
            this._currentStep++;
            if (this.nextPos) {
                if (GameModel.ins.isPassable(this.nextPos, null)) {
                    //开始跳动
                    this._girlCell.mermaidJumpTo(this.nextPos);
                }
            }
        }
    }

    private get nextPos(): cc.Vec2 {
        return this._path[this._currentStep];
    }

    public get path(): cc.Vec2[] {
        return this._path
    }

    public get index(): number {
        return this._cfg.index;
    }

    public onTrigger() {
        this._triggerCount++;
        this.execJump2NextStep();
    }

    public init() {
        for (let i = 0; i < this._cfg.path.length; i++) {
            let pos = cc.v2(this._cfg.path[i][0], this._cfg.path[i][1]);
            this._path.push(pos);
            this.initRoad(pos);
        }
        this.initStartPoint();
        this.initEndPoint();
    }
}