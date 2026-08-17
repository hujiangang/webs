import GameModel, { CreateType } from "../GameModel";
import Common from "../../../Common/Common";
import { ILevel } from "../../../Data/Interface/Level/ILevel";
import MainCtrl from "../../MainCtrl";

interface IConveyer { pos: cc.Vec2, exist: boolean }

export default class Conveyer {

    private _cfg: Map<number, IConveyer[]> = null;
    private _triggerCount: number = 0;
    private _nodeHandler: MainCtrl = null;
    private _cfgData: Array<Array<{ x: number, y: number, exist: boolean }>> = null;

    constructor(data: ILevel) {
        if (data && data.conveyerList) {
            this._cfgData = data.conveyerList
            this._nodeHandler = cc.find('Canvas/main').getComponent(MainCtrl);
        }
    }

    private moveTo() {
        this._cfg.forEach((valuse, index) => {
            for (let i = 0; i < valuse.length; i++) {
                const item = valuse[i];
                const nextItem = valuse[i + 1] || valuse[0];
                //判断下一个元素是否是相邻的..否则就渐影
                //每个元素往下一个点移动 
                const cell = Common.safeGet2ArrayValue(GameModel.ins.CellList, item.pos);
                if (cell) {
                    cell.conveyerMoveTo(nextItem.pos, null);
                }
            }
            this.moveOver(index);
        })
    }

    private moveOver(index: number) {
        if (this._nodeHandler) {
            this._nodeHandler.scheduleOnce(() => {
                const values = this._cfg.get(index);
                //全部移动完毕!做操作! 
                //检测是否有落下的  
                for (let i = values.length; i--;) {
                    const pos = values[i].pos;
                    const cell = Common.safeGet2ArrayValue(GameModel.ins.CellList, pos);
                    if (cell) {
                        if (!cell.isFall) {
                            cell.continue2Fall();
                            cell.notifyRoundFall();
                            //检测是否有需要消除 
                            GameModel.ins.checkHavaElimate(cell.pos);
                        }
                    } else {
                        GameModel.ins.testFindCanFallCell(pos, null);
                    }
                }
            }, 0.5);
        }
    }

    /**
     * 检测这个坐标是否是传输带中的一个
     * @param pos 
     */
    public checkIsConveyerItemForPos(pos: cc.Vec2) {
        let result = false;
        for (let i = this._cfgData.length; i--;) {
            const list = this._cfgData[i];
            for (let index = list.length; index--;) {
                const item = list[index];
                if (pos.x == item.x && pos.y == item.y) {
                    i = 0;
                    result = true;
                    break;
                }
            }
        }
        return result;
    }

    public init() {
        if (this._cfgData) {
            this._cfg = new Map();
            for (let i = 0; i < this._cfgData.length; i++) {
                const p: IConveyer[] = [];
                const m = this._cfgData[i]
                m.forEach(item => {
                    const c: IConveyer = { pos: cc.v2(item.x, item.y), exist: item.exist }
                    p.push(c);
                })
                this._cfg.set(i, p);
            }
        }
    }

    /**被触发 */
    public onTrigger() {
        this._triggerCount++;
        this.moveTo();
    }
}