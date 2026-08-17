
import M from "../../../Base/Manager/M";
import { Event } from "../../Data/Const/Event";
import { CellModel } from "../Model/CellModel";
import { GapTime } from "../../Data/Const/TimeConfig";
import { GameTaskModel } from "../Model/GameTaskModel";
import { ElimateType, GameState } from "../../Data/Const/Constant";
import { DataPool } from "../../../Base/DataPool";


export default class TaskCtrl {

    public gameTaskPool: Array<GameTaskModel> = null;
    public taskNodePool: DataPool<GameTaskModel> = null;

    constructor() {
        this.gameTaskPool = new Array();
        this.taskNodePool = new DataPool(30, GameTaskModel, true);
    }

    public pushAddNewTask(cell: CellModel, createType: number) {

        const task = this._getTaskNode();//new GameTaskModel();
        task.model1 = cell;
        task.extData = createType;
        task.action = Event.GameCMD.AddNewCell;
        M.event.send(Event.GameCMD.MainCMD, task);
    }

    /**发送消除到界面 */
    public pushElimateTask(tm: CellModel, closeAry: Set<CellModel>, size: number, type: ElimateType, extInfo: number, keepTime: number) {
        const task = this._getTaskNode();//new GameTaskModel();
        task.action = Event.GameCMD.Elimate;
        task.model1 = tm;
        task.closeAry = closeAry;
        task.size = size;
        task.keepTime = keepTime || 0.2;
        task.type = type;
        task.extData = extInfo;
        // if (M.runtime.GameState != GameState.End) {
        this.gameTaskPool.push(task);
        // }
        // return task;
    }

    public pushExchangeTask(model1: CellModel, targetPos1: cc.Vec2, model2: CellModel, targetPos2: cc.Vec2) {
        const task = this._getTaskNode();//new GameTaskModel();
        task.action = Event.GameCMD.Exchange;
        task.cp1 = targetPos1; task.model1 = model1;
        task.cp2 = targetPos2; task.model2 = model2;
        task.keepTime = GapTime.ExchangeTime;
        this.gameTaskPool.push(task);
    }

    public pushTisTask(model1: CellModel, closeAry: Set<CellModel>, mulPos: cc.Vec2): GameTaskModel {
        const task = this._getTaskNode();//new GameTaskModel();
        task.action = Event.GameCMD.PromptCanElimate;
        task.model1 = model1;
        task.cp1 = mulPos;
        task.closeAry = closeAry;
        task.keepTime = 0.15;
        this.gameTaskPool.push(task);
        return task;
    }

    public freeTask(task: GameTaskModel) {
        this.taskNodePool.freeData(task);
    }

    /**执行隔帧任务! */
    private execGameTask() {
        // requestAnimationFrame(() => {
        if (this.gameTaskPool && this.gameTaskPool.length > 0) {
            const task = this.gameTaskPool.shift();
            M.event.send(Event.GameCMD.MainCMD, task);
        }
        // })
    }

    private _getTaskNode() {
        const node = this.taskNodePool.getData();
        node.init();
        return node;
    }

    /**执行隔帧任务! */
    private execViewTask() {

    }

    public update(dt) {
        this.execGameTask();
        this.execViewTask();
    }

}