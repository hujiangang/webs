import SpecialEffects from "./SpecialEffects";
import SpinePlayerCtrl from "../../../Framework/Components/SpinePlayerCtrl";
import M from "../../../Application/M";
import { NodePoolKey, CellType, ComboLevel, GroundType, ScoreConfig, UpGroundType } from '../../Data/Const/Constant';
import { Event } from "../../Data/Const/Event";
import { GapTime } from "../../Data/Const/TimeConfig";
import Common from "../../Common/Common";
import { CellModel } from "../Model/CellModel";
import { AudioID } from "../../Common/AudioCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EffLayerCtrl extends cc.Component {

    @property(cc.Prefab)
    mergeBombPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    comboPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    brokenPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    LeavesBrokenPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    boxBrokenPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    addScorePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    addScoreOverPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    dotPrefab: cc.Prefab = null;



    @property(cc.Prefab)
    chuizi: cc.Prefab = null;

    private special: SpecialEffects = null;

    public static ins: EffLayerCtrl = null;

    onLoad() {
        EffLayerCtrl.ins = this;
        this.special = this.node.addComponent(SpecialEffects);
        this.registerEvent();
        this._preLoadNodePool();
        this.node.zIndex = 100;
    }

    public cancelSpecialEffects(): void { if (this.special) this.special.cancel(); }

    onDestroy() {
        this.cancelSpecialEffects();
        if (EffLayerCtrl.ins === this) EffLayerCtrl.ins = null;
        this.removeEvent();
        M.nodePool.destory();
    }
    private _preLoadNodePool() {
        M.nodePool.create(NodePoolKey.MergeBomb, this.mergeBombPrefab, 8);
        M.nodePool.create(NodePoolKey.Broken, this.brokenPrefab, 12);
        M.nodePool.create(NodePoolKey.LeafBroken, this.LeavesBrokenPrefab, 8);
        M.nodePool.create(NodePoolKey.AddScoreOverEff, this.addScoreOverPrefab, 8);
        M.nodePool.create(NodePoolKey.AddScoreEff, this.addScorePrefab, 16);
    }

    private registerEvent() {
        M.event.register(Event.Effect.LittleBomb, this.playLittleBomb, this);
        M.event.register(Event.Effect.SpeedLine, this.playSpeedLine, this);
        M.event.register(Event.Effect.ShootStar, this.onShootStar, this);
        M.event.register(Event.Effect.OverShoot, this.overShoot, this);
        M.event.register(Event.Effect.Combo, this.playComboEff, this);
        M.event.register(Event.Effect.Broken, this.playBrokenEff, this);
        M.event.register(Event.Effect.CollectOver, this.normalCollectOverEff, this);
        M.event.register(Event.Effect.AddScore, this.playAddScoreEff, this);
        // M.event.register(Event.Effect.ShowDot, this.onShowDot, this);
    }

    private removeEvent() {
        M.event.unRegister(Event.Effect.LittleBomb, this.playLittleBomb, this);
        M.event.unRegister(Event.Effect.SpeedLine, this.playSpeedLine, this);
        M.event.unRegister(Event.Effect.OverShoot, this.overShoot, this);
        M.event.unRegister(Event.Effect.ShootStar, this.onShootStar, this);
        M.event.unRegister(Event.Effect.Combo, this.playComboEff, this);
        M.event.unRegister(Event.Effect.Broken, this.playBrokenEff, this);
        M.event.unRegister(Event.Effect.AddScore, this.playAddScoreEff, this);
        M.event.unRegister(Event.Effect.CollectOver, this.normalCollectOverEff, this);
        // M.event.unRegister(Event.Effect.ShowDot, this.onShowDot, this);
    }

    public playComboEff(level: number) {
        const name = ComboLevel[level];
        if (name) {
            const comboNode = M.nodePool.getItem(NodePoolKey.ComboEff, this.comboPrefab);
            comboNode.parent = this.node;
            const animation = comboNode.getComponent(cc.Animation);
            animation.play(name);
            animation.on('finished', this.effCompleted.bind(this, NodePoolKey.ComboEff, animation, comboNode), this);
        }
    }

    // private onShowDot(type: ElimateType, startPoint: cc.Vec2) {
    //     let count = Util.Tool.rangeInt(2, 5);
    //     for (let i = count; i--;) {
    //         const dotNode = M.nodePool.getItem(NodePoolKey.Dot, this.dotPrefab);
    //         dotNode.parent = this.node;

    //         dotNode.setScale(Util.Tool.rangeInt(3, 7) / 10);
    //         dotNode.setPosition(this.node.convertToNodeSpaceAR(startPoint));
    //         const targetPos = this.node.convertToNodeSpaceAR(Common.getWorldPos(this.scoreBar.node)) as cc.Vec2;
    //         let moveTime = dotNode.position.sub(targetPos).mag() * (Util.Tool.rangeInt(10, 20) / 10000);

    //         const a0 = cc.moveTo(moveTime, targetPos);
    //         const a1 = cc.callFunc(() => {
    //             M.nodePool.freeItem(NodePoolKey.Dot, dotNode);
    //         })
    //         dotNode.runAction(cc.sequence(a0, a1));

    //         if (type != ElimateType.Default) {
    //             M.event.send(Event.UI.AddScore, ScoreConfig.SingleElimate[type], startPoint)
    //         }
    //     }
    // }

    private effCompleted(key, anim, comboNode) {
        anim.off('finished', this.effCompleted, this);
        M.nodePool.freeItem(key, comboNode);
    }

    private playAddScoreEff(score: number, pos: cc.Vec2, isOver: boolean = false) {
        let node: cc.Node = null;
        if (isOver) {
            // pos = this.node.convertToNodeSpaceAR(pos) as cc.Vec2;
            node = M.nodePool.getItem(NodePoolKey.AddScoreOverEff, this.addScoreOverPrefab);
        } else {
            pos = this.node.convertToNodeSpaceAR(pos) as cc.Vec2;
            pos = pos.add(cc.v2(-Common.GRID_W / 4, Common.GRID_H / 2));
            node = M.nodePool.getItem(NodePoolKey.AddScoreEff, this.addScorePrefab);
        }
        node.parent = this.node;
        node.opacity = 255;
        node.setAnchorPoint(cc.v2(1, 0))
        node.setPosition(pos);
        if (isOver) {
            node.getChildByName('score').getComponent(cc.Label).string = score.toString();
            const animation = node.getComponent(cc.Animation);
            animation.play();
            // animation.on('finished', this.effCompleted.bind(this, NodePoolKey.AddScoreEffOver, animation, node), this);
            const a1 = cc.delayTime(0.5);
            const a2 = cc.fadeOut(0.5);
            const a3 = cc.callFunc(() => {
                M.nodePool.freeItem(NodePoolKey.AddScoreOverEff, node);
            })
            node.runAction(cc.sequence(a1, a2, a3));
        } else {
            node.getComponent(cc.Label).string = score.toString();
            const a1 = cc.scaleTo(0.2, 1.2);
            const a2 = cc.scaleTo(0.2, 1);
            const a3 = cc.moveBy(0.3, cc.v2(0, 30));
            const a4 = cc.fadeOut(0.2);
            const a5 = cc.callFunc(() => {
                M.nodePool.freeItem(NodePoolKey.AddScoreEff, node);
            })
            node.runAction(cc.sequence(a1, a2, a3, a4, a5));
        }
    }
    public playZyJump(start: cc.Vec2, end: cc.Vec2, callback?: Function, convertType?: CellType) {
        this.special.pulse(start, 103, .3, .7);
        this.special.flight(start, end, .2 + GapTime.OctopusJumpSpeed, convertType).then(done => {
            if (!done) return;
            this.special.pulse(end, 103, .38, .85);
            if (callback) callback();
        });
    }

    public playBrokenEff(pos: cc.Vec2, callback: Function, type?, name?) {
        let key = NodePoolKey.Broken;
        let prefab = this.brokenPrefab;
        let playName: string = 'tongyog_posui';
        let eff = null;
        if (type) {
            if (type == GroundType.Leaves) {
                key = NodePoolKey.LeafBroken;
                prefab = this.LeavesBrokenPrefab;
            } else if (type == UpGroundType.Box) {
                key = NodePoolKey.BoxBroken
                prefab = this.boxBrokenPrefab;
                playName = name;
            }
        }
        if (type == UpGroundType.Box) {
            eff = this.createEffPrefab(key, prefab, this.node.convertToNodeSpaceAR(pos))
            eff.ctrl.play(playName);
        } else {
            eff = this.createSpineNode(key, prefab, this.node.convertToNodeSpaceAR(pos));
            eff.ctrl.play(playName, 0, false, () => {
                M.nodePool.freeItem(key, eff.node);
                callback && callback();
            });
        }
    }
    private lastFeedback=0;
    private hapticFeedback() {
        if(cc.sys.localStorage.getItem('forest.vibration')==='false' || Date.now()-this.lastFeedback<250)return;
        this.lastFeedback=Date.now();M.platform.vibrateShort();
    }
    public playRowColEff(type: CellType, pos: cc.Vec2) { this.hapticFeedback();this.special.line(pos, type); }
    public playFishBombEff(pos: cc.Vec2) { this.special.pulse(pos, 10, .5, 1.4); }

    public playZhangyuAndZhangyu(pos: cc.Vec2) { return this.special.charge(pos, 103, .6); }

    //锤子动画
    public playChuizi(pos: cc.Vec2) {
        return new Promise((resolve) => {
            const item = this.createSpineNode(NodePoolKey.Chuizi, this.chuizi, this.node.convertToNodeSpaceAR(pos));
            //item.ctrl.scheduleOnce(resolve, 0.6)
            item.ctrl.play('animation', 0, false, () => {
                M.nodePool.freeItem(NodePoolKey.Chuizi, item.node);
                resolve(undefined);
            });
        })
    }
    public playHaimaAndZhangyu(pos: cc.Vec2) { return this.playRainbowCombination(pos, 103); }
    public playHaimaAndHaima(pos: cc.Vec2) { this.special.pulse(pos,104,1,4); return this.special.charge(pos,104,1); }
    public playFishAndFish(pos: cc.Vec2) { this.special.line(pos,101); return this.special.line(pos,102); }
    public playBombAndFish(pos: cc.Vec2) { this.special.pulse(pos,100,.5,2); return this.special.charge(pos,101,.5); }
    public playBombAndBomb(pos: cc.Vec2) { this.special.pulse(pos,100,.6,3); return this.special.charge(pos,100,.6); }
    public playRainbowCombination(pos: cc.Vec2, type: number) { this.special.pulse(pos,type,.5,1.5); return this.special.charge(pos,104,.5); }
    public playBombEff(level: number, pos: cc.Vec2, scale=1) { this.hapticFeedback();this.special.pulse(pos,100,.65,2.2*scale); }
    public playLittleBomb(pos: cc.Vec2) { this.special.pulse(pos,10,.22,.35); }
    public playRainbowBomb(pos: cc.Vec2, callback: Function) { this.special.charge(pos,104,.4).then(done=>{if(done && callback) callback();}); }
    private overShoot(start: cc.Vec2, end: cc.Vec2, cell: CellModel, callback: Function) {
        this.special.flight(start,end,1).then(done=>{
            if(!done) return;
            M.runtime.OverStepCount=Math.min(7,M.runtime.OverStepCount+1);
            M.event.send(Event.UI.AddScore,ScoreConfig.OverStep[M.runtime.OverStepCount],this.node.convertToNodeSpaceAR(end),true);
            if(callback) callback(cell);
        });
    }
    private onShootStar(start: cc.Vec2, end: cc.Vec2, callback: Function) { this.special.link(start,end).then(done=>{if(done&&callback)callback();}); }
    public removeShootStars() { /* Links expire independently; do not cancel other pending effects. */ }
    public normalCollectOverEff(pos: cc.Vec2, targetName: string = null) { this.special.pulse(this.node.convertToWorldSpaceAR(pos),10,.2,.35); }
    public playSpeedLine(pos: cc.Vec2, dir: cc.Vec2) { this.special.pulse(pos,101,.22,.4); }

    public preFallingCountDown(remainStep: number, callback: Function): Promise<any> {
        return new Promise((resolve) => {
            const node = this.node.getChildByName('tmpCountDown');
            node.active = true;
            node.y = 0;
            const lable = node.getComponent(cc.Label);
            const countDown = (count, isfrist, cb) => {
                this.schedule(() => {
                    lable.string = `抢分倒计时: ${count}`;
                    count--;
                    if (count < 0) {
                        node.runAction(cc.moveBy(1, cc.v2(0, 360)));
                        cb();
                        if (isfrist) {
                            countDown(remainStep, false, callback);
                        } else {
                            node.active = false;
                        }
                    }
                }, 1, count);
            }
            countDown(2, true, resolve);
        });
    }

    private createSpineNode(key: NodePoolKey, prefab: cc.Prefab, pos: cc.Vec2 | cc.Vec3 = null): { node: cc.Node, ctrl: SpinePlayerCtrl } {
        return Common.createSpineNode(this.node, prefab, key, pos);
    }

    private createEffPrefab(key: NodePoolKey, prefab: cc.Prefab, pos: cc.Vec2 | cc.Vec3 = null): { node: cc.Node, ctrl: cc.Animation } {
        return Common.createEffPrefab(this.node, key, prefab, pos)
    }
}
