import GameModel from "./GameModel";
import EventMgr from "../../../Base/Manager/EventMgr";
import { Event } from "../../Data/Const/Event";
import { PropType, ElimateType, CellType, WaringTips, MaxPowerCount } from '../../Data/Const/Constant';
import Common from '../../Common/Common';
import RuntimeMgr from '../../Data/RuntimeMgr';
import M from '../../../Base/Manager/M';
import { MsgType } from "./CellBase";
import { CellModel } from "./CellModel";
import { Util } from "../../../Base/Utils/Util";
import { CurrencyId } from "../../../Base/BaseConst";
import { AudioID } from "../../Common/AudioCtrl";
import EffLayerCtrl from "../View/EffLayerCtrl";


export class PropModel {

    public execType: PropType = null;

    private gameModel: GameModel = null;

    constructor(gameModel: GameModel) {
        this.gameModel = gameModel;
        EventMgr.ins.register(Event.GameCMD.PropClick, this.onTriggerProp, this);
    }

    public destory() {
        EventMgr.ins.unRegister(Event.GameCMD.PropClick, this.onTriggerProp, this);
    }

    public execute(pos: cc.Vec2, isChuizi: boolean) {
        if (this.execType) {
            pos = Common.convetPos(pos)
            M.runtime.addUsePropCount(this.execType);
            switch (this.execType) {
                case PropType.BeikeBomb:
                    this._execBeikeBomb(pos);
                    break;
                case PropType.Board:
                    this._execBoard(pos);
                    break;
                case PropType.Hammer:
                    this._execHammer(pos, isChuizi);
                    break;
            }
        }
    }

    private onTriggerProp(type: PropType) {
        this.execType = type;
        M.runtime.addUsePropCount(type);
        switch (type) {
            case PropType.ResetGrid:
                this._execResetGrid();
                break
            case PropType.Add3Step:
                this._execAddThreeStep();
                break;
            case PropType.StartBomb:
                this._execStartBomb();
                break;
            case PropType.StartStar:
                this._execStartStar();
                break;
            case PropType.PowerBottle1:
            case PropType.PowerBottle2:
                this._execAddPower(type);
                break;
        }
    }

    private _execAddPower(type: PropType) {
        const info = M.table.PropInfo.getByPrimaryKey(type);
        if (M.runtime.getCurrency(CurrencyId.Power) >= MaxPowerCount) {
            M.tips.show(WaringTips.PowerMax);
        } else {
            M.runtime.addCurrency(CurrencyId.Power, info.value);
            this.propUserOver();
        }
    }

    /**开始转换开始炸弹 */
    private _execStartBomb() {
        const types = [CellType.Bomb1, CellType.Bomb2];
        types.forEach(type => {
            const cell = this.findOneRandomCell();
            if (cell && cell.extCtrl) {
                cell.extCtrl.change2Bomb(type);
            }
        })
        this.propUserOver();
    }

    /**开始转换星星 */
    private _execStartStar() {
        const cell = this.findOneRandomCell();
        if (cell && cell.extCtrl) {
            cell.extCtrl.change2Bomb(CellType.Bomb5);
        }
        this.propUserOver();
    }

    /**加3步 */
    private _execAddThreeStep() {

        this.gameModel.stepLimit += M.table.PropInfo.getByPrimaryKey(PropType.Add3Step).value;
        M.event.send(Event.UI.UpdateInfoPanel);
        M.event.send(Event.Sound.PlaySoundEff, AudioID.AddThree);
        this.propUserOver();
        M.tips.show(WaringTips.PropAdd3StepTips);
    }



    /**执行锤子 */
    private async _execHammer(pos: cc.Vec2, isChuizi: boolean) {
        if (isChuizi == true) {
            cc.log("执行锤子" + Common.getPos(pos.x, pos.y).x + "   y: " + Common.getPos(pos.x, pos.y).y);
            await EffLayerCtrl.ins.playChuizi(Common.convertCurWorldPos(<any>Common.getPos(pos.x, pos.y)));
        } else {
            cc.log("执行锤子 false");
        }
        const data = M.runtime.getPropData(this.execType);
        if (data && data.count > 0) {
            const cell = Common.safeGet2ArrayValue(this.gameModel.CellList, pos);
            if (this.gameModel.isHold(pos) || (cell && cell.isInvincible)) {
                M.tips.show(WaringTips.CantUseForThat);
            } else {
                const count = this.gameModel.execElimateOneAtAll(pos, ElimateType.Hammer);
                M.event.send(Event.Sound.PlaySoundEff, AudioID.Hammer);
                console.error(count);
                this.propUserOver();
            }
        }
    }

    /**执行转换滑板 */
    private _execBoard(pos: cc.Vec2) {
        const data = M.runtime.getPropData(this.execType);
        if (data && data.count > 0) {
            const cell = Common.safeGet2ArrayValue(this.gameModel.CellList, pos);
            if (cell && cell.extCtrl) {
                if (this.checkCanUse(cell)) {
                    cell.extCtrl.change2Bomb(CellType.Bomb2);
                    cell.onMsg(MsgType.ComplexBomb, { type1: CellType.Bomb2, type2: CellType.Bomb3, isBoard: true })
                    this.propUserOver();
                } else {
                    M.tips.show(WaringTips.CantUseForThat);
                }
            } else {
                this.propUserOver(false);
            }
        }
    }

    /**执行重置棋盘 */
    private _execResetGrid() {
        const data = M.runtime.getPropData(this.execType);
        if (data && data.count > 0) {
            M.tips.show(WaringTips.PropResetGrid);
            this.gameModel.resetGrid(true);
            M.event.send(Event.Sound.PlaySoundEff, AudioID.Reset);
            this.propUserOver();
        }
    }

    /**执行转换贝壳炸弹 */
    private _execBeikeBomb(pos: cc.Vec2) {
        const data = M.runtime.getPropData(this.execType);
        if (data && data.count > 0) {
            const cell = Common.safeGet2ArrayValue(this.gameModel.CellList, pos);
            if (cell && cell.extCtrl) {
                if (this.checkCanUse(cell)) {
                    cell.isExecBomb = true;
                    cell.extCtrl.change2Bomb(CellType.Bomb1);
                    this.propUserOver();
                } else {
                    M.tips.show(WaringTips.CantUseForThat);
                }
            } else {
                this.propUserOver(false);
            }
        }
    }

    private _maxDepth = 10;
    private _curDepth = 0;
    private findOneRandomCell() {
        this._curDepth++;
        const list = this.gameModel.CellList;
        const y = Util.Tool.rangeInt(0, list.length, false);
        const x = Util.Tool.rangeInt(0, list[y].length, false);
        const cell = Common.safeGet2ArrayValue(list, cc.v2(x, y));
        if (!this.checkCanUse(cell)) {
            if (this._curDepth > this._maxDepth) {
                return null;
            } else {
                return this.findOneRandomCell();
            }
        }
        this._curDepth = 0;
        return cell;
    }

    private checkCanUse(cell: CellModel): boolean {
        if (!cell) {
            return false;
        }
        const type = cell.getType();
        return !(type == CellType.Ground || type == CellType.Banana || type == CellType.IceCream ||
            this.gameModel.isHavaSpe(cell.pos) || this.gameModel.isHold(cell.pos));
    }

    private propUserOver(isUpdateCount: boolean = true) {
        EventMgr.ins.send(Event.GameCMD.PropUsed);
        isUpdateCount && RuntimeMgr.ins.updatePropCount(this.execType, -1);
        this.execType = null;
    }
}