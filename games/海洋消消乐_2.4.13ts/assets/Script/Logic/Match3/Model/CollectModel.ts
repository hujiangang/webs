import { Collect, Gnome } from "../../Data/Interface/Level/ILevel";
import M from "../../../Base/Manager/M";
import { Event } from "../../Data/Const/Event";
import { Log } from "../../../Base/Utils/Log";
import GameModel from "./GameModel";
import Common from "../../Common/Common";
import { ElimateType, CellType } from "../../Data/Const/Constant";
import GroundCellModel from "./GroundCellModel";
import { CellModel } from "./CellModel";

export const CollectType = {
    normal: 'normal',
    gnome: 'gnome',
    box: 'box',
    colorbox: 'colorbox',
    stone: 'stone',
    tree: 'tree',
    turtles: 'turtles',
    crab: 'crab',
    gem: 'gem',
    firefly: 'firefly'
}

export class CollectModel {

    //全部的收集目标
    private collect: Map<string, number> = null;
    //单张界面的收集目标
    private singleCollect: { [key: string]: number } = null;

    //推土机这种收集物的对照信息!
    public collectPowerCells: { [key: string]: GroundCellModel } = null;

    private _marked: Set<string> = null;

    constructor(collect: Collect[]) {
        if (collect) {
            this.initMainCollect(collect);
        }
        this.collectPowerCells = {};
        this._marked = new Set();
    }

    public async updateCollectCount(type: string, num: number, index?: number | cc.Vec2, elimateType?: ElimateType, ) {
        type = type;
        let count = this.collect.get(type);
        let isOver: boolean = false;
        if (count) {
            count = (count - num) <= 0 ? 0 : (count - num);
            this.collect.set(type, count);
            isOver = await this.checkCollectOK();
            M.event.send(Event.UI.CollectComplet, type, index, elimateType);
        }
        //检测单张界面是否回收完毕,触发切换地图
        this.checkSingleCollectState(type, isOver);
        if (type == CollectType.gnome) {
            Log.i(`完成一个散装收集物的回收! 总还需要收集:${this.collect.get(type)},当前地图还有:${this.singleCollect && this.singleCollect[type]}`);
        }
    }

    public updateCollectPowerCell(cell: CellModel) {
        let result = false;
        let groundCell = this.collectPowerCells[`${cell.getType()}`];
        if (groundCell) {
            groundCell.extCtrl.updateTuitujiPower();
            result = true;
            //界面动画!
            M.event.send(Event.GameCMD.UpdateCollectPower, cell, groundCell);
        }
        return result;
    }

    public get mainCollect(): Map<string, number> {
        return this.collect;
    }

    public updateCurSingleCollect(singleCollect: { [key: string]: number }) {
        this.singleCollect = singleCollect;
    }

    private _markPos(pos: cc.Vec2) {
        this._marked.add(Common.getStringkey(pos));
    }

    private _isMarked(pos: cc.Vec2): boolean {
        return this._marked.has(Common.getStringkey(pos));
    }

    public removeMark(pos: cc.Vec2) {
        this._marked.delete(Common.getStringkey(pos));
    }

    /**
     * 章鱼目标的寻找!
     * "章鱼机制优化：
     *  1.在翡翠关卡，应该能够飞到翡翠的位置
     *  2.如果当前关卡没有目标物（比如椰子还没生成），章鱼飞往元素的优先级为：香蕉>石头>铁链>箱子>冰块>土块>普通元素"
     * @param isHavaExecType 
     */
    public findOneCollectPos(isHavaExecType: boolean = false): cc.Vec2 {
        //先不考虑多张地图的情况!
        let result = null;
        //检测木箱
        if (this.collect.get(CollectType.box) > 0) {
            result = this._findBoxPos();
        }
        //检测蘑菇
        if (!result && this.collect.get(CollectType.gnome) > 0) {
            result = this.findMGPos(CollectType.gnome, isHavaExecType);
        }
        //检测螃蟹
        if (!result && this.collect.get(CollectType.crab) > 0) {
            result = this.findMGPos(CollectType.crab, isHavaExecType);
        }
        //检测宝石
        if (!result && this.collect.get(CollectType.gem) > 0) {
            result = this._findGemPos();
        }
        //检测冰激凌
        if (!result && this.collect.get(CellType.IceCream + '') > 0) {
            result = this._findIceCreamPos();
        }
        //最后检测普通元素
        if (!result) {
            result = this._findNormalCollectPos();
        }
        //如果普通元素也没有,就随便拿一个!
        if (!result) {
            result = this._findNotCollectCellPos();
        }

        if (result) {
            this._markPos(result);
        }

        return result;
    }

    /**
     * 找宝石位
     */
    private _findGemPos() {
        let result = null;
        const list = Array.from(GameModel.ins.CellDict);
        for (let i = list.length; i--;) {
            const cell = list[i];
            if (cell && !cell.isDeath && !cell.isFalling() && cell.GemLv > 0 && !this._isMarked(cell.pos)) {
                result = cell.pos;
                break;
            }
        }
        return result;
    }

    /**
     * 找冰激凌位置!
     */
    private _findIceCreamPos() {
        let result = null;
        const dir = [cc.v2(0, 1), cc.v2(1, 1), cc.v2(-1, 1)];
        const iceCreamList = Array.from(GameModel.ins.IceCreamPool);
        iceCreamList.sort((a, b) => {
            return a.pos.y - b.pos.y;
        })
        for (let j = iceCreamList.length; j--;) {
            const cell = iceCreamList[j];
            if (cell && !cell.isDeath && !cell.isEmpty && cell.getType() == CellType.IceCream && !GameModel.ins.isHavaSpe(cell.pos)) {
                for (let i = 0; i < dir.length; i++) {
                    const cp = cell.pos.add(dir[i]);
                    const gc = Common.safeGet2ArrayValue(GameModel.ins.GroundList, cp);
                    if (gc && !gc.isHold && !this._isMarked(cp)) {
                        result = cp;
                        j = 0;
                        break;
                    }
                }
            }
        }
        return result;
    }

    /**
     * 获取一个箱子的坐标!
     */
    private _findBoxPos() {
        const boxList = GameModel.ins.getUpGroundModel().BoxMap;
        let result = null;
        if (boxList.size > 0) {
            const ary = Array.from(boxList);
            for (let i = 0; i < ary.length; i++) {
                const pos = ary[i][1];
                if (!this._isMarked(pos)) {
                    result = pos;
                    break;
                }
            }
        }
        return result;
    }

    /**
     * 如果当前关卡没有目标物（比如椰子还没生成），章鱼飞往元素的优先级为：香蕉>石头>铁链>箱子>冰块>土块>普通元素"
     */
    private _findNotCollectCellPos(): cc.Vec2 {
        let result = null;
        const list = Array.from(GameModel.ins.CellDict);
        for (let i = list.length; i--;) {
            const cell = list[i];
            if (cell && !cell.isDeath && !cell.isEmpty && !cell.isFalling() && !this._isMarked(cell.pos)) {
                const gc = Common.safeGet2ArrayValue(GameModel.ins.GroundList, cell.pos);
                if (!gc || (gc && !gc.isHold)) {
                    if (cell.getType() == CellType.Banana) {
                        result = cell.pos;
                        break;
                    }
                    if (GameModel.ins.isHavaSpe(cell.pos)) {
                        result = cell.pos;
                        break;
                    }
                    if (cell.getType() == CellType.Ground) {
                        result = cell.pos;
                        break;
                    }
                    result = cell.pos;
                    break;
                }
            }
        }
        return result;
    }

    /**
     * 获取一个普通收集物的位置!
     */
    private _findNormalCollectPos(): cc.Vec2 {
        let result: cc.Vec2 = null;
        const collectTypes = Array.from(this.collect.keys());
        for (let j = collectTypes.length; j--;) {
            const type = Number(collectTypes[j]);
            if (!Number.isNaN(type) && type != CellType.IceCream && this.collect.get(type + '') > 0) {
                const list = Array.from(GameModel.ins.CellDict);
                for (let i = list.length; i--;) {
                    const cell = list[i];
                    if (cell && !cell.isEmpty && !cell.isDeath && !cell.isFalling() && cell.getType() == type && !this._isMarked(cell.pos)) {
                        const gc = Common.safeGet2ArrayValue(GameModel.ins.GroundList, cell.pos);
                        if (!gc.isHold) {
                            j = 0;
                            result = cell.pos;
                            break;
                        }
                    }
                }
            }
        }
        return result;
    }

    /**
     * 寻找一个复杂的多个收集物
     * @param type 
     * @param isHavaExecType 
     */
    private findMGPos(type: string, isHavaExecType: boolean) {
        let result = null;
        const data = GameModel.ins.getMgModel().getData(type);
        if (data) {
            const keys = Object.keys(data)
            for (let i = keys.length; i--;) {
                const index = keys[i];
                const posPool = data[index];
                if (posPool) {
                    for (let j = posPool.length; j--;) {
                        const pos = posPool[j];
                        if (!pos || this._isMarked(pos) || (isHavaExecType && GameModel.ins.isHavaSpe(pos))) {
                            continue;
                        } else {
                            result = pos;
                            i = 0;
                            break;
                        }
                    }
                } else {
                    result = null;
                }
            }
        }
        return result;
    }

    private async checkCollectOK(): Promise<boolean> {
        let result = true;
        this.collect.forEach((remainCount, type) => {
            if (remainCount > 0) {
                result = false;
            }
        })
        if (result) {
            if (GameModel.ins.isNovLv) {
                await GameModel.ins.checkGameOver()
            }
            M.event.send(Event.GameCMD.GameOver, true);
        }
        return result;
    }

    private checkSingleCollectState(type: string, isOver: boolean) {
        if (!this.singleCollect) return;
        let singleCount = this.singleCollect[type];
        if (singleCount && !isOver) {
            singleCount = singleCount - 1;
            if (singleCount <= 0) {
                const nextIndex = GameModel.ins.mapIndex + 1;
                if (nextIndex < GameModel.ins.mapCount) {
                    this.singleCollect[type] = 0;
                    Log.i('触发转移棋盘,nextIndex:', nextIndex, ',singleCount:', singleCount);
                    M.event.send(Event.GameCMD.MoveGrid, nextIndex, 0);
                }
            } else {
                this.singleCollect[type] = singleCount;
                //需要检测所收集物品是否在屏幕中间 
                M.event.send(Event.GameCMD.MoveGrid, null, 1);
            }
        }
    }

    /**初始化任务目标 */
    private initMainCollect(collect: Collect[]) {
        this.collect = new Map();
        //总共需要收集的物品
        collect.forEach((data: Collect) => {
            this.collect.set(data.type + '', data.count);
        })
    }

}