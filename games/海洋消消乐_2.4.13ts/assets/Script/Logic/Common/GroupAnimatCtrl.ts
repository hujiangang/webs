

import { SingletonFactory } from "../../Base/Utils/SingletonFactory";
import { CellModel } from "../Match3/Model/CellModel";
import GameModel, { CreateType } from "../Match3/Model/GameModel";
import Common from "./Common";
import { GapTime } from "../Data/Const/TimeConfig";
import M from "../../Base/Manager/M";
import { Event } from "../Data/Const/Event";
import { CellType, ElimateType } from "../Data/Const/Constant";
import { Util } from "../../Base/Utils/Util";
import { AudioID } from "./AudioCtrl";


export default class GroupAnimatCtrl {

    public static ins: GroupAnimatCtrl = SingletonFactory.getInstance(GroupAnimatCtrl);

    private rainbowStarCount = 0;
    private overShootCount = 0;

    private _animationPool: Set<{ ts: number, v: gsap.Animation }> = null;

    constructor() {
        this._animationPool = new Set();
    }

    public playCrabBomb(closeAry: Set<CellModel>) {
        const timeline = this.createTimeLine();

        closeAry.forEach((cm) => {
            if (cm && cm.extCtrl) {
                timeline.add(gsap.TweenLite.delayedCall(GapTime.CrabElimateGap, () => {
                    cm.extCtrl.elimate(0, null, ElimateType.Bomb6);
                }, []));
            }
        });
    }

    public playRainbowBomb(closeAry: Set<CellModel>, centerPos: cc.Vec2, callback: Function) {
        const timeline = this.createTimeLine();

        this.rainbowStarCount = 0;
        const size = closeAry.size;
        const time = GapTime.RainbowShootStarCount / size;
        closeAry.forEach((cm) => {
            if (cm) {
                const targetPos = Common.convertCurWorldPos(cm.getPosition());
                timeline.add(gsap.TweenLite.delayedCall(time, this.onExecSingleRainbowShoot.bind(this), [targetPos, centerPos, size, callback]));
            }
        })
    }

    public overShootEff(closeAry: Set<CellModel>, centerPos: cc.Vec2, callback: Function) {
        const timeline = this.createTimeLine();;

        this.overShootCount = 0;
        const size = closeAry.size;
        let time = 2 / size;
        time = time > 0.15 ? 0.15 : time;
        closeAry.forEach((cm) => {
            if (cm) {
                const targetPos = Common.convertCurWorldPos(cm.getPosition());
                timeline.add(gsap.TweenLite.delayedCall(time, this.onExecOverShootEff.bind(this), [targetPos, centerPos, size, cm, callback]));
            }
        })
    }

    public playRowElimate(centerPos: cc.Vec2, closeAry: Set<CellModel>, elimateType: ElimateType, callback: Function) {
        if (closeAry.size > 0) {
            const timeline1 = this.createTimeLine();
            const timeline2 = this.createTimeLine();

            //找出左右!
            const left = [];
            const right = [];
            let isLeft = true;
            closeAry.forEach(cell => {
                if (cell) {
                    if (isLeft && cell.pos.equals(centerPos)) isLeft = false
                    if (isLeft) {
                        left.push(cell);
                    } else {
                        right.push(cell);
                    }
                }
            })
            for (let i = left.length; i--;) {
                timeline1.add(gsap.TweenLite.delayedCall(GapTime.RowAndColElimate, this.onExecSingleElimateEff, [left[i], callback, elimateType]));
            }
            for (let i = 0; i < right.length; i++) {
                timeline2.add(gsap.TweenLite.delayedCall(GapTime.RowAndColElimate, this.onExecSingleElimateEff, [right[i], callback, elimateType]));
            }
        }
    }

    /**
     * 
     * @param type 创建的炸弹类型
     * @param pos 炸弹生成的位置
     * @param isExec 是否立即执行爆炸
     * @param time 延时时间
     * @param insertGrid 是否加入棋盘控制
     * @param groupId 合成前的group
     */
    public playCreateBomb(type: CellType, pos: cc.Vec2, isExec: boolean, time: number = 0.3, insertGrid: boolean = true, groupId: number = null) {
        const timeline = this.createTimeLine();
        timeline.add(gsap.TweenLite.delayedCall(time, () => {
            const bombCell = GameModel.ins.createCell({ cfg: { type }, pos, createType: CreateType.Midway, isInsert2Ary: insertGrid });
            // const bombCell = GameModel.ins.createNewCellModel({ type }, pos, CreateType.Midway, null, false, insertGrid);
            bombCell.isBombReady = false;
            // bombCell.GroupId = groupId;
            bombCell.isExecBomb = isExec;
            if (!isExec) {
                bombCell.continue2Fall(true);
            }
        }));
    }

    public playCellBombShocks(centerPos: cc.Vec2, bombLv: number, depth: number = 2, lastRound: boolean = false) {
        const timeline = this.createTimeLine();
        for (let i = 0; i < depth; i++) {
            const ary = Common.getAroundCircleCells(centerPos, bombLv + i, lastRound ? false : i == (depth - 1));
            timeline.add(gsap.TweenLite.delayedCall(GapTime.BombShocks, this.onExecBombAftershocks, [ary, i, centerPos]))
        }
    }

    public gameOverCreateBomb(count: number, callback: any) {
        const timeline = this.createTimeLine();
        for (let i = count; i--;) {
            timeline.add(gsap.TweenLite.delayedCall(0.20, callback))
        }
    }

    /**
     * 执行独圈动画
     * @param cells 需要执行动画的元素
     * @param distance 当前距离中心的距离
     */
    private onExecBombAftershocks(cells: Set<CellModel>, distance: number, centerPos: cc.Vec2) {
        distance = 5 - distance;
        cells.forEach((cell: CellModel) => {
            if (cell && cell.extCtrl) {
                cell.extCtrl.execBombAfterShocks(distance, centerPos);
            }
        })
    }

    private onExecSingleElimateEff(cm: CellModel, callback: Function, type: ElimateType) {
        if (cm) {
            cm.extCtrl && cm.extCtrl.elimate(0, cm.pos, type, callback);
        }
    }

    private onExecSingleRainbowShoot(targetPos: cc.Vec2, centerPos: cc.Vec2, size: number, callback: Function) {
        M.event.send(Event.Effect.ShootStar, centerPos, targetPos, () => {
            this.rainbowStarCount++;
            if (this.rainbowStarCount >= size) {
                this.rainbowStarCount = 0;
                gsap.TweenLite.delayedCall(GapTime.RainbowShootOverElimate, () => { callback() })
            }
        });
    }

    private onExecOverShootEff(targetPos: cc.Vec2, centerPos: cc.Vec2, size: number, cm: CellModel, callback: Function) {
        const bombContent = [CellType.Bomb2, CellType.Bomb3, CellType.Bomb1];
        GameModel.ins.stepLimit--;
        M.event.send(Event.UI.UpdateInfoPanel);
        M.event.send(Event.Effect.OverShoot, centerPos, targetPos, cm, (c: CellModel) => {
            M.event.send(Event.Sound.PlaySoundEff, AudioID.partytime_change);
            this.overShootCount++;
            c.change2Bomb(bombContent[Util.Tool.rangeInt(0, bombContent.length, false)]);
            c.extCtrl && c.extCtrl.playCreateBombAni();
            if (this.overShootCount >= size) {
                this.overShootCount = 0;
                callback();
                // gsap.TweenLite.delayedCall(GapTime.RainbowShootOverElimate, () => { callback() })
            }
        });
    }

    public createTimeLine(): gsap.TimelineMax {
        const timeline = new gsap.TimelineMax();
        timeline.autoRemoveChildren = true;
        this._insertPool(timeline);
        return timeline;
    }

    private _insertPool(timeLine: gsap.Animation) {
        this._animationPool.add({ ts: Date.now(), v: timeLine });
        this._animationPool.forEach(item => {
            if (Date.now() - item.ts > 3 * 1000) {
                this._animationPool.delete(item);
            }
        });
    }

    public destory() {
        this._animationPool.forEach(item => {
            item.v.kill();
            this._animationPool.delete(item);
        });

    }
}