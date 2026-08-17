import M from "../../../Base/Manager/M";
import { Event } from "../../Data/Const/Event";
import { SingletonFactory } from "../../../Base/Utils/SingletonFactory";
import GameModel from "./GameModel";
import Common from "../../Common/Common";
import { Util } from "../../../Base/Utils/Util";
import { CellType, ElimateType } from "../../Data/Const/Constant";

const ComboMaxInterval = 2000;

const BoomScore = {
    [CellType.Bomb1]: 6,//圆形炸弹
    [CellType.Bomb2]: 5,//横向炸弹
    [CellType.Bomb3]: 5,//竖向炸弹
    [CellType.Bomb4]: 3,//飞机
    [CellType.Bomb5]: 9,//彩虹炸弹
}

const EnergyLevel = {
    1: 30,
    2: 35,
    3: 40
}

export class EnergyModel {

    public static ins: EnergyModel = SingletonFactory.getInstance(EnergyModel);

    private comboTimes: number = 0;
    private sendComboTimes: number = 0;
    private lastComboTime: number = 0;


    private energy: number = 0;
    private curLevel: number = 1;

    private curMaxEnergy: number = 0

    public setCurLevel() {
        const level = M.runtime.getMatch3Level();
        this.curLevel = Math.ceil(level / 10);
        this.curMaxEnergy = EnergyLevel[this.curLevel];
        this.energy = 0;
        this.comboTimes = 0;
        this.lastComboTime = 0;
    }

    public updataEnergy(type: ElimateType, cellType?: CellType) {
        let now = cc.sys.now();
        if (type == ElimateType.Default) {
            if (!this.lastComboTime || now - this.lastComboTime < ComboMaxInterval) {
                this.comboTimes++;
                this.lastComboTime = now;
                if (this.sendComboTimes != this.comboTimes) {
                    this.sendComboTimes = this.comboTimes
                    M.runtime.CurCombo = this.comboTimes;
                    M.event.send(Event.Effect.Combo, this.comboTimes);
                }
            } else {
                // if (this.comboTimes >= 5) {//每5个combo加3分
                // cc.log('comboTimes = ' + this.comboTimes)
                //     this.addEnergy(3 * Math.floor(this.comboTimes / 5));
                // }
                this.comboTimes = M.runtime.CurCombo = 0;
                this.lastComboTime = 0;
            }
        } else if (type >= ElimateType.Bomb1) {
            // this.addEnergy(BoomScore[cellType] || 0);
        }
    }

    private addEnergy(energy: number) {
        // let lastEnergy = this.energy;
        // lastEnergy += energy;
        // let curMax = this.curMaxEnergy;
        // if (lastEnergy > curMax) {
        //     // this.energy = lastEnergy - curMax;
        //     this.energy = 0;
        //     lastEnergy = curMax;
        //     this.addBoomToGame();
        // } else {
        //     this.energy = lastEnergy;
        // }
        // M.event.send(Event.GameCMD.EnergyStorage, lastEnergy, curMax);
    }

    private addBoomToGame() {
        if (this.curLevel == 1) {
            for (let i = 0; i < 3; i++) {
                this.randomChangeNormal2Boom(CellType.Bomb4);
            }
        } else if (this.curLevel == 2) {
            this.randomChangeNormal2Boom(CellType.Bomb1);
            this.randomChangeNormal2Boom(Math.random() > 0.5 ? CellType.Bomb2 : CellType.Bomb3);
        } else if (this.curLevel == 3) {
            this.randomChangeNormal2Boom(CellType.Bomb5);
        }
    }

    private randomChangeNormal2Boom(type) {
        const list = GameModel.ins.CellList;
        let x = Util.Tool.rangeInt(1, GameModel.GridSize.W, false);
        let y = Util.Tool.rangeInt(1, GameModel.GridSize.H, false);
        const cell = Common.safeGet2ArrayValue(list, cc.v2(x, y));
        if (cell && cell.extCtrl && cell.getType() < CellType.Bomb1 && cell.getType() != CellType.Fish && !cell.bindUpGModel) {
            cell.isExecBomb = false;
            cell.extCtrl.change2Bomb(type)
        } else {
            this.randomChangeNormal2Boom(type);
        }
    }
}