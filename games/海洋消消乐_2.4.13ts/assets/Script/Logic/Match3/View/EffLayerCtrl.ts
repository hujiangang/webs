import SpinePlayerCtrl from "../../../Base/CustomComponent/SpinePlayerCtrl";
import M from "../../../Base/Manager/M";
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
    bombEffPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    littleBombPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    mergeBombPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    comboPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    rowColBombPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    fishBombPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    rainbowBombPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    shootStarPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    haimaShootOverEff: cc.Prefab = null;

    @property(cc.Prefab)
    zyJumpPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    zyJumpOverPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    zyJumpElimatePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    brokenPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    LeavesBrokenPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    boxBrokenPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    overShootPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    addScorePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    addScoreOverPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    dotPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    bombAndBombPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    haimaAndHetuanPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    haimaAndHaimaPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    zhangyuAndJianyu: cc.Prefab = null;//章鱼+剑鱼，章鱼+气泡鱼

    @property(cc.Prefab)
    hetuanAndJianyu: cc.Prefab = null;//气泡鱼+剑鱼，剑鱼+剑鱼

    @property(cc.Prefab)
    chuizi: cc.Prefab = null;//锤子

    @property(cc.Prefab)
    bombAndFishPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    haimaAndZhangyuPrefab: cc.Prefab = null;

    private _tmpShootStar: Array<cc.Node> = [];
    private _tmpShootOver: Array<cc.Node> = [];

    public static ins: EffLayerCtrl = null;

    onLoad() {
        EffLayerCtrl.ins = this;
        this.registerEvent();
        this._preLoadNodePool();
        this.node.zIndex = 100;
    }

    onDestroy() {
        this.removeEvent();
        M.nodePool.destory();
    }

    private _preLoadNodePool() {
        //这里可以做精细化加载.....
       // console.error(Date.now());
        const now = Date.now();
        M.nodePool.create(NodePoolKey.HaimaAndZhangyu, this.haimaAndZhangyuPrefab, 5);
        //console.error(Date.now() - now);
        M.nodePool.create(NodePoolKey.BombAndFish, this.bombAndFishPrefab, 5);
       // console.error(Date.now() - now);
        M.nodePool.create(NodePoolKey.BombAndBomb, this.bombAndBombPrefab, 5);
        //console.error(Date.now() - now);
        M.nodePool.create(NodePoolKey.MergeBomb, this.mergeBombPrefab, 20);
        //console.error(Date.now() - now);
        M.nodePool.create(NodePoolKey.LittleBomb, this.littleBombPrefab, 50);
       // console.error(Date.now() - now);
        M.nodePool.create(NodePoolKey.Broken, this.brokenPrefab, 50);
       // console.error(Date.now() - now);
        M.nodePool.create(NodePoolKey.LeafBroken, this.LeavesBrokenPrefab, 20);
        //console.error(Date.now() - now);
        M.nodePool.create(NodePoolKey.BombEff, this.bombEffPrefab, 20);
        //console.error(Date.now() - now);
        M.nodePool.create(NodePoolKey.RowColEff, this.rowColBombPrefab, 20);
        //console.error(Date.now() - now);
        M.nodePool.create(NodePoolKey.ZyJumpElimate, this.zyJumpElimatePrefab, 20);
        //console.error(Date.now() - now);
        M.nodePool.create(NodePoolKey.ZyJumpOver, this.zyJumpOverPrefab, 20);
       // console.error(Date.now() - now);
        M.nodePool.create(NodePoolKey.HaiMaOver, this.haimaShootOverEff, 20);
       // console.error(Date.now() - now);
        M.nodePool.create(NodePoolKey.AddScoreOverEff, this.addScoreOverPrefab, 20);
       // console.error(Date.now() - now);
        M.nodePool.create(NodePoolKey.AddScoreEff, this.addScorePrefab, 50);
        //console.error(Date.now() - now);
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

    public playZyJump(startPos: cc.Vec2, targetPos: cc.Vec2, callback?: Function, conveType?: CellType) {
        startPos = this.node.convertToNodeSpaceAR(startPos) as cc.Vec2;
        targetPos = this.node.convertToNodeSpaceAR(targetPos) as cc.Vec2;
        this.scheduleOnce(() => {
            this.playZyJumpEliamteEff(startPos);
            M.event.send(Event.Sound.PlaySoundEff, AudioID.Octopus);
        }, 0);
        const eff = this.createSpineNode(NodePoolKey.ZyJump, this.zyJumpPrefab, startPos);


        var animName = "zhangyu_tiao";
        if (conveType == CellType.Bomb2) {
            //章鱼+剑鱼
            animName = "zhangyu_tiao_jianyu";
        } else if (conveType == CellType.Bomb1) {
            //章鱼+气泡鱼
            animName = "zhangyu_tiao_hetun";
        }
        eff.ctrl.play(animName, 0, false, () => { });

        const tmpx = Math.abs(Math.abs(startPos.x) - Math.abs(targetPos.x)) / 2;
        const tmpy = (startPos.y > targetPos.y ? startPos.y : targetPos.y) + 400;
        const centerPos = cc.v2(startPos.x > targetPos.x ? -tmpx : tmpx, tmpy);

        const a0 = cc.delayTime(0.2);
        const a1 = cc.bezierTo(GapTime.OctopusJumpSpeed, [startPos, centerPos, targetPos]);
        const a2 = cc.callFunc(() => {
            M.nodePool.freeItem(NodePoolKey.ZyJump, eff.node);
            const bomb = this.createSpineNode(NodePoolKey.ZyJumpOver, this.zyJumpOverPrefab, targetPos);
            bomb.ctrl.play('FX_zhangyu_xiaochu', 0, false, () => {
                M.nodePool.freeItem(NodePoolKey.ZyJumpOver, bomb.node);
            });
            callback && callback();
        }, this)
        eff.node.runAction(cc.sequence(a0, a1, a2));
    }

    private playZyJumpEliamteEff(startPos: cc.Vec2 | cc.Vec3) {
        const eff = this.createSpineNode(NodePoolKey.ZyJumpElimate, this.zyJumpElimatePrefab, startPos);
        eff.node.zIndex = -1;
        eff.ctrl.play('zhangyu_tiaoFX', 0, false, () => {
            M.nodePool.freeItem(NodePoolKey.ZyJumpElimate, eff.node);
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

    public playRowColEff(type: CellType, centerPos: cc.Vec2) {
        let angle = 0;
        if (type == CellType.Bomb3) {
            //竖
            angle = 90;
        }
        centerPos = this.node.convertToNodeSpaceAR(centerPos) as cc.Vec2
        const item = this.createSpineNode(NodePoolKey.RowColEff, this.rowColBombPrefab, centerPos);
        item.node.angle = angle;
        item.ctrl.play('hengsudan_fashe', 0, false, () => {
            M.nodePool.freeItem(NodePoolKey.RowColEff, item.node);
        });
    }

    public playFishBombEff(pos: cc.Vec2) {
        pos = this.node.convertToNodeSpaceAR(pos) as cc.Vec2
        const item = this.createSpineNode(NodePoolKey.FishBombEff, this.fishBombPrefab, pos);
        item.ctrl.play('baozhayu_bom', 0, false, () => {
            M.nodePool.freeItem(NodePoolKey.FishBombEff, item.node);
        });
    }

    //播放道具2合1时的 动画
    public playItemHeti(pos: cc.Vec2, key: NodePoolKey, prefab: cc.Prefab, animName: string, isNeedPlayBombEff: boolean = true) {
        //位置 方向.都需要计算 
        return new Promise((resolve) => {
            const item = this.createSpineNode(key, prefab, this.node.convertToNodeSpaceAR(pos));
            cc.log("播放道具2合1时的动画，动画名称: " + animName);
            item.ctrl.play(animName, 0, false, () => {
                if (isNeedPlayBombEff == true) {
                    //this.playBombEff(0, pos, 1.5);
                    //cc.log("playBombEff");
                }
                M.nodePool.freeItem(key, item.node);
                resolve();
            });
        })
    }


    //章鱼+箭鱼
    public playZhangyuAndJianyu(animName: string, pos: cc.Vec2, targetPos: cc.Vec2, fun: Function) {
        return new Promise((resolve) => {
            const item = this.createSpineNode(NodePoolKey.ZhangyuAndJianyu, this.zhangyuAndJianyu, this.node.convertToNodeSpaceAR(pos));

            cc.log("跳跃动画名称: " + animName)

            // 创建一个移动动作
            var a1 = cc.moveTo(0.2, 150, 300);

            item.ctrl.scheduleOnce(resolve, 0.2)
            item.ctrl.play(animName, 0, false, () => {
                //M.nodePool.freeItem(NodePoolKey.ZhangyuAndJianyu, item.node);
                //resolve();
            });

            const a2 = cc.delayTime(0.2);
            var a3 = cc.moveTo(0.5, targetPos);

            var a4 = cc.callFunc(() => {
                if (fun) {
                    //cc.log("创建目标炸弹")
                    fun();
                    M.nodePool.freeItem(NodePoolKey.ZhangyuAndJianyu, item.node);
                }
            });

            item.node.runAction(cc.sequence(a1, a2, a3, a4));
        })
    }


    //章鱼+章鱼
    public playZhangyuAndZhangyu(pos: cc.Vec2) {
        return new Promise((resolve) => {
            const item = this.createSpineNode(NodePoolKey.HaimaAndHetun, this.haimaAndHetuanPrefab, this.node.convertToNodeSpaceAR(pos));
            item.ctrl.scheduleOnce(resolve, 0.6)
            item.ctrl.play('zhangyuZhangyu', 0, false, () => {
                M.nodePool.freeItem(NodePoolKey.HaimaAndHetun, item.node);
            });
        })
    }


    //锤子动画
    public playChuizi(pos: cc.Vec2) {
        return new Promise((resolve) => {
            const item = this.createSpineNode(NodePoolKey.Chuizi, this.chuizi, this.node.convertToNodeSpaceAR(pos));
            //item.ctrl.scheduleOnce(resolve, 0.6)
            item.ctrl.play('animation', 0, false, () => {
                M.nodePool.freeItem(NodePoolKey.Chuizi, item.node);
                resolve();
            });
        })
    }

    public playHaimaAndZhangyu(pos: cc.Vec2) {
        return new Promise((resolve) => {
            const item = this.createSpineNode(NodePoolKey.HaimaAndZhangyu, this.haimaAndZhangyuPrefab, this.node.convertToNodeSpaceAR(pos));
            // item.ctrl.scheduleOnce(resolve, 1)
            item.ctrl.play('hetunHaima', 0, false, () => {
                M.nodePool.freeItem(NodePoolKey.HaimaAndZhangyu, item.node);
                resolve();
            });
        })
    }

    public playHaimaAndHaima(pos: cc.Vec2) {
        return new Promise((resolve) => {
            const item = this.createSpineNode(NodePoolKey.HaimaAndHaima, this.haimaAndHaimaPrefab, this.node.convertToNodeSpaceAR(pos));
            item.ctrl.scheduleOnce(resolve, 4);
            item.ctrl.play('haimaHaima', 0, false, () => {
                M.nodePool.freeItem(NodePoolKey.HaimaAndHaima, item.node);
            });
        });
    }

    public playFishAndFish(pos: cc.Vec2) {
        return new Promise((resolve) => {
            const item = this.createSpineNode(NodePoolKey.BombAndFish, this.bombAndFishPrefab, this.node.convertToNodeSpaceAR(pos));
            item.ctrl.scheduleOnce(resolve, 1)
            item.ctrl.play('jianyuJianyu', 0, false, () => {
                M.nodePool.freeItem(NodePoolKey.BombAndFish, item.node);
            });
        })
    }

    public playBombAndFish(pos: cc.Vec2) {
        return new Promise((resolve) => {
            const item = this.createSpineNode(NodePoolKey.BombAndFish, this.bombAndFishPrefab, this.node.convertToNodeSpaceAR(pos));
            item.ctrl.scheduleOnce(resolve, 1)
            item.ctrl.play('jianyuHetun', 0, false, () => {
                M.nodePool.freeItem(NodePoolKey.BombAndFish, item.node);
            });
        })
    }

    public playBombAndBomb(pos: cc.Vec2) {
        //位置 方向.都需要计算 
        return new Promise((resolve) => {
            const item = this.createSpineNode(NodePoolKey.BombAndBomb, this.bombAndBombPrefab, this.node.convertToNodeSpaceAR(pos));
            item.ctrl.play('hetunHeti', 0, false, () => {
                this.playBombEff(0, pos, 1.5);
                M.nodePool.freeItem(NodePoolKey.BombAndBomb, item.node);
                resolve();
            });
        })
    }

    public playBombEff(bombLv: number, pos: cc.Vec2, scale: number = 1) {
        pos = this.node.convertToNodeSpaceAR(pos) as cc.Vec2
        const item = this.createSpineNode(NodePoolKey.BombEff, this.bombEffPrefab, pos);
        item.node.scale = scale;
        item.ctrl.play('beiek_baozha', 0, false, () => {
            M.nodePool.freeItem(NodePoolKey.BombEff, item.node);
        });
    }

    public playLittleBomb(pos: cc.Vec2) {
        pos = this.node.convertToNodeSpaceAR(pos) as cc.Vec2
        const item = this.createSpineNode(NodePoolKey.LittleBomb, this.littleBombPrefab, pos);
        item.ctrl.play('ciaochu01', 0, false, () => {
            M.nodePool.freeItem(NodePoolKey.LittleBomb, item.node);
        });
    }

    public playRainbowBomb(pos: cc.Vec2, callback) {
        pos = this.node.convertToNodeSpaceAR(pos) as cc.Vec2
        const rainbowBombNode = M.nodePool.getItem(NodePoolKey.RainbowBomb, this.rainbowBombPrefab);
        rainbowBombNode.parent = this.node;
        rainbowBombNode.setPosition(pos);
        const effCtrl = rainbowBombNode.getComponent(SpinePlayerCtrl);
        //caihong_baozha ,原来动画名称

        effCtrl.timeScale = 3;
        effCtrl.play('skill_haima1', 0, false, () => {
            callback();
            effCtrl.timeScale = 1;
            effCtrl.play('skill_haima2', 0, false, () => {
                M.nodePool.freeItem(NodePoolKey.RainbowBomb, rainbowBombNode);
            });
        });


    }

    private overShoot(centerPos: cc.Vec2, targetPos, cm: CellModel, callback: Function) {

        centerPos = this.node.convertToNodeSpaceAR(centerPos) as cc.Vec2
        targetPos = this.node.convertToNodeSpaceAR(targetPos) as cc.Vec2
        const handle = this.createSpineNode(NodePoolKey.OverShoot, this.overShootPrefab, centerPos);
        const a0 = cc.moveTo(1, targetPos);
        const a1 = cc.callFunc(() => {
            // node.removeFromParent(true); 
            M.runtime.OverStepCount++
            if (M.runtime.OverStepCount > 7) {
                M.runtime.OverStepCount = 7;
            }
            M.event.send(Event.UI.AddScore, ScoreConfig.OverStep[M.runtime.OverStepCount], targetPos, true)

            callback(cm);
        });
        M.event.send(Event.Sound.PlaySoundEff, AudioID.partytime_shoot);
        handle.node.runAction(cc.sequence(a0, a1));
    }

    private onShootStar(centerPos: cc.Vec2, targetPos: cc.Vec2, callback: Function) {
        centerPos = this.node.convertToNodeSpaceAR(centerPos) as cc.Vec2
        targetPos = this.node.convertToNodeSpaceAR(targetPos) as cc.Vec2

        const handle = this.createSpineNode(NodePoolKey.ShootStar, this.shootStarPrefab, centerPos);

        //设置特效长度，distance 就是算出来的距离了
        let distance = Math.sqrt(Math.pow(centerPos.x - targetPos.x, 2) + Math.pow(centerPos.y - targetPos.y, 2));
        //cc.log("scaleY: "+ (distance/309-0.2))
        // handle.node.setContentSize(68,distance);
        let scaleY = distance / 309 - 0.2;
        handle.node.scaleY = scaleY;
        // handle.ctrl.play(`anim_haimaDian${Util.Tool.rangeInt(1, 2)}`, 0, false);
        if (scaleY > 0.5) {
            handle.ctrl.play(`anim_haimaDian${2}`, 0, false);
        } else {
            handle.ctrl.play(`anim_haimaDian${1}`, 0, false);
        }


        //设置旋转角度
        let dirVec = targetPos.sub(centerPos);//获得从startPos指向endPos的方向向量
        let comVec = new cc.Vec2(1, 0);//计算夹角的参考方向，这里选择x轴正方向
        let radian = dirVec.signAngle(comVec);//获得带方向的夹角弧度值(参考方向顺时针为正值，逆时针为负值)
        let degree = Math.floor(cc.misc.radiansToDegrees(radian));
        //console.log("x角度：" + degree)
        handle.node.angle = -(degree - 90)
        // handle.node.setRotation(degree - 90);

        this._tmpShootStar.push(handle.node);

        //const a0 = cc.moveTo(GapTime.StarsShootSpeed, targetPos);
        const a1 = cc.repeatForever(cc.rotateBy(1.0, 360));
        const a2 = cc.callFunc(() => {
            const h = this.createSpineNode(NodePoolKey.HaiMaOver, this.haimaShootOverEff, targetPos);
            this._tmpShootOver.push(h.node);
            h.ctrl.play('mingzhong', 0, true);
            callback();
        }, this)

        //handle.node.runAction(a1);
        // handle.node.runAction(cc.sequence(a0, a2));
        handle.node.runAction(a2);
    }

    public removeShootStars() {
        if (this._tmpShootStar && this._tmpShootStar.length > 0) {
            this._tmpShootStar.forEach(node => {
                node.stopAllActions();
                M.nodePool.freeItem(NodePoolKey.ShootStar, node);
            })
        }
        if (this._tmpShootOver && this._tmpShootOver.length > 0) {
            this._tmpShootOver.forEach(node => {
                node.stopAllActions();
                M.nodePool.freeItem(NodePoolKey.HaiMaOver, node);
            })
        }
    }

    public normalCollectOverEff(pos: cc.Vec2, targetName: string = null) {
        const item = this.createSpineNode(NodePoolKey.MergeBomb, this.mergeBombPrefab, pos);
        item.ctrl.play(targetName || 'shouji', 0, false, () => {
            M.nodePool.freeItem(NodePoolKey.MergeBomb, item.node);
        });
    }

    //合成炸弹,  区分方向与个数!!!
    public playSpeedLine(pos: cc.Vec2, dir: cc.Vec2) {
        pos = this.node.convertToNodeSpaceAR(pos) as cc.Vec2;
        const item = this.createSpineNode(NodePoolKey.MergeBomb, this.mergeBombPrefab, pos);
        item.node.angle = 0;
        const over = () => {
            M.nodePool.freeItem(NodePoolKey.MergeBomb, item.node);
        }
        let isCenter = (dir.x == 0 && dir.y == 0);
        let isOblique = (dir.x != 0 && dir.y != 0);
        if (isCenter) {
            item.ctrl.play('hecheng01', 0, false, over);
        } else {
            let angle = [0, 90, 180, 270]; //左 上 右 下 斜 45
            let index = 0;
            let p = cc.v3(Common.GRID_W, Common.GRID_H);
            if (isOblique) {
                angle = [45, 225, -45, -225];
                if (dir.x == 1 && dir.y == -1) { index = 1; p.y = p.y; p.x = p.x };
                if (dir.x == -1 && dir.y == 1) { index = 0; p.y = -p.y; p.x = -p.x };
                if (dir.x == 1 && dir.y == 1) { index = 3; p.y = -p.y; p.x = p.x };
                if (dir.x == -1 && dir.y == -1) { index = 2; p.y = p.y; p.x = -p.x };
            } else {
                if (dir.x == 1) { index = 2; p.x = p.x; p.y = 0 };
                if (dir.x == -1) { index = 0; p.x = -p.x; p.y = 0 };
                if (dir.y == 1) { index = 1; p.y = -p.y; p.x = 0 };
                if (dir.y == -1) { index = 3; p.y = p.y; p.x = 0 };
            }
            item.node.angle = angle[index];
            item.node.position = item.node.position.add(p);
            item.ctrl.play('hecheng01_1', 0, false, over);
        }
    }

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
