
import Common from "../../Common/Common";
import M from "../../../Base/Manager/M";
import BaseItemView from "./BaseItemView";
import { MsgType } from "../Model/CellBase";
import { NodePoolKey, CellType, ElimateType, GameState, RunTimeGate, FallMaxGateLimit } from "../../Data/Const/Constant";
import { CellModel } from "../Model/CellModel";
import { Event } from "../../Data/Const/Event";
import { GapTime } from "../../Data/Const/TimeConfig";
import SpinePlayerCtrl from "../../../Base/CustomComponent/SpinePlayerCtrl";
import { Util } from "../../../Base/Utils/Util";
import RotatingCtrl from "../Control/RotatingCtrl";
import GameModel, { CreateType } from "../Model/GameModel";
import { AudioID } from "../../Common/AudioCtrl";
import ResCtrl from "../ResCtrl";
import { CollectType } from "../Model/CollectModel";
import Apps from "../../../Base/Apps";
import GroupAnimatCtrl from "../../Common/GroupAnimatCtrl";

const { ccclass, property } = cc._decorator;

const AniName = {
    fall: 'fall',
    fallPause: 'fallPause',
    elimate: 'elimate',
    fallOver: 'fallOver',
    bombCreate: 'bombCreate',
    bombIdle: 'bombIdle',
    portalIn: 'portalIn',
    portalOut: 'portalOut',
    prompt: 'prompt',
    collect: 'collect',
    shaking: 'shaking',
    change2cell: 'change2cell'
}
const BombGap: number = 100;
const SpineCellIdelName = ['beike_xiuxian', 'hengsudan_xiuxian', 'hengsudan_xiuxian2', 'zhangyu_xiuxian', 'idle_haima', '', '', '', 'baozhayu_xiuxian']
const SpineCellBombName = ['', 'hengsudan_bao', 'hengsudan_bao', '', ''];

const MoveGroundNames = ['up', 'down', 'left', 'right'];

@ccclass
export default class ItemBasicCellCtrl extends BaseItemView<CellModel> {

    @property(cc.Sprite)
    cellSprite: cc.Sprite = null;

    @property(cc.Sprite)
    ground: cc.Sprite = null;

    @property(cc.Sprite)
    levelSprite: cc.Sprite = null;

    @property(cc.Node)
    lowerNode: cc.Node = null;

    @property(cc.Node)
    shadowNode: cc.Node = null;

    @property(cc.Prefab)
    teshuLight: cc.Prefab = null;

    public BindAddScoreTask: Function = null;

    private showType: CellType = CellType.Empty;
    private _showLv: number = 0;
    private animation: cc.Animation = null;
    private animationState: cc.AnimationState = null;

    private moveActionAry: Array<{ t: number, pos: cc.Vec2, ep: CellModel }> = <any>[];
    public isRunMove = false;

    private isPlayFall = false;
    private isPlayBombShocks = false;

    private spineCellCtrl: SpinePlayerCtrl = null;
    private prefabAnimation: cc.Animation = null;

    private elimateType: ElimateType | number = ElimateType.Default;
    private elimateSize: number = 0;
    private elimateNotify: Function = null;

    /**锁,动画 */
    private portalResolve = null;

    private destoryTime = null;

    private deathTimeout = 0;

    private rotatingCtrl: RotatingCtrl = null;

    private createType: CreateType = null;

    onLoad() {

    }

    public init(model: CellModel, createType?: CreateType) {
        super.init(model);
        this.initAnimation();
        this.updatePosition();
        if (!model.isEmpty) {
            this.resetDisplayInfo();
            this.updateDisplay();
            this.BindAddScoreTask = null;
            this.createType = createType;
            if (createType) {
                this.initPlayCreateAnimation(createType);
            } else if (Common.isBombType(model.getType()) || model.getType() == CellType.Fish) {
                this.scheduleOnce(this.playBombIdel.bind(this), 0);
            }
        }
    }

    public easyInit(type: CellType) {
        this.resetDisplayInfo();
        this.updateDisplay(type);
    }

    public exchange(targetPos: cc.Vec2, time: number, ep: CellModel) {
        if (this.moveActionAry) {
            this.moveActionAry.push({ t: time, pos: targetPos, ep });
            this.execExchangeAni();
        }
    }

    public elimate(count: number, basePos: cc.Vec2, type: ElimateType = ElimateType.Default, callback?: Function) {
        if (this.model) {
            if (!this.model.isDeath) {
                this.model.execUpElimate(type);
                return;
            }
            this.elimateType = type;
            this.elimateSize = count;
            this.elimateNotify = callback;
            this._execBindAddScoreFun(count);

            if (count > 3 && type == ElimateType.Default) {
                this.playMergeNormalBomb(basePos);
            } else {
                if (this.model.isBomb && type != ElimateType.Girl && !this.isPreDestory()) {
                    //这里有可能是性能热点.
                    this.execBomb();
                } else {
                    this.playElimate();
                }
            }
        }
    }

    private execBomb(data = null) {
        // if (RuntimeMgr.ins.GameState < GameState.Win) {
        let extBombData = null;
        //彩虹炸弹分配类型!
        if (this.model.getType() == CellType.Bomb5) {
            const pos = Common.getRoundOnePos(this.model.pos);
            extBombData = { pos };
        } else if (this.model.isRocket) {
            this.execRoket();
        }
        this.model.onMsg(MsgType.Bomb, data || extBombData);
        // }
    }

    private initAnimation() {
        this.animation = this.getComponent(cc.Animation);
        this.animation.on('stop', <any>this.onAnimationStop, this);
    }

    private resetDisplayInfo() {
        this.node.angle = 0;
        this.node.scale = 1;
        this.node.zIndex = 0;
        this.node.opacity = 255;
        this.isRunMove = false;
        this.spineCellCtrl = null;
        this.prefabAnimation = null;
        this.showType = CellType.Empty;

        this.destoryTime = null;
        this.portalResolve = null;
        this.rotatingCtrl = null;
        this.deathTimeout = 0;

        this.cellSprite.node.active = true;
        this.cellSprite.node.scale = 1;
        this.cellSprite.node.angle = 0;
        this.cellSprite.node.opacity = 255;
        this.cellSprite.node.setPosition(0, 0);

        this.shadowNode.active = false;
        this.levelSprite.node.active = false;
        this.ground.node.active = false;
        this.cellSprite.node.destroyAllChildren();


        this.lowerNode.destroyAllChildren();
        this.lowerNode.active = false;
        if (this.model && this.model.getType() == CellType.Girl) {
            this.node.zIndex = 10;
        }
    }

    private initPlayCreateAnimation(createType: CreateType) {

        if (createType == CreateType.Nov || this.model.isEmpty) return;

        if (this.model.isBomb) {
            this.playCreateBombAni();
        } else {
            if (createType == CreateType.Bron) {
                // this.node.y -= Common.GRID_H / 2;
                this.playEnterAni()
                this.node.active = false;
            } else {
                this.model.onMsg(MsgType.Fall);
            }
        }
    }

    private isPreDestory(): boolean {
        return !this.cellSprite.node.active;
    }

    private isHavaSpe(): boolean {
        if (this.model && this.model.bindUpGModel && this.model.bindUpGModel.isHavaSpe) {
            return true;
        }
        return false;
    }

    private _updateLvDisplay() {
        if (this.model && this.model.isGround && this.model.getLv() != this._showLv) {
            this._showLv = this.model.getLv();
            this.levelSprite.node.active = true;
            this.levelSprite.spriteFrame = ResCtrl.ins.getGroundFrame(this._showLv - 1);
        }
    }

    public updateDisplay(t: CellType = null) {
        if ((this.model && !this.model.isEmpty && this.showType != this.model.getType()) || (t != null)) {
            let displayType = Number((t === null ? this.model.getType() : t));
            let spritIndex = null;
            this.prefabAnimation = null;
            this.spineCellCtrl = null;

            switch (displayType) {
                case CellType.Bomb1:
                case CellType.Bomb2:         //横向炸弹
                case CellType.Bomb3:         //竖向炸弹
                case CellType.Bomb4:
                case CellType.Bomb5:
                    this.createSpineCell(displayType, ResCtrl.ins.getCellPrefab(displayType - BombGap));
                    spritIndex -= BombGap;
                    this.addTeshuLight();
                    break;
                case CellType.Fish:
                    this.createSpineCell(displayType, ResCtrl.ins.getCellPrefab(5));
                    break;
                case CellType.Girl:
                    this.createSpineCell(displayType, ResCtrl.ins.getCellPrefab(6));
                    break;
                case CellType.Conch:
                    this.createSpineCell(displayType, ResCtrl.ins.getCellPrefab(7));
                    break;
                case CellType.Banana:
                    this.createPrefab(ResCtrl.ins.getCellPrefab(8))
                    break;
                case CellType.IceCream:
                    this.createPrefab(ResCtrl.ins.getCellPrefab(9))
                    break;
                default:
                    spritIndex = displayType;
                    break
            }

            if (displayType != CellType.Ground) {
                if (this.model && this.model.isRocket) {
                    // 火箭的处理!
                    // this.cellSprite.spriteFrame = ResCtrl.ins.getRoketFrames(spritIndex);
                    this.createPrefab(ResCtrl.ins.getRoketPrefab())
                } else if (spritIndex != null) {
                    this.cellSprite.spriteFrame = ResCtrl.ins.getCellFrame(displayType, spritIndex);
                }
                this.showLv();
            } else {
                this.showGround();
                this._addGem();
            }

            this.showType = displayType;
            if ((this.spineCellCtrl || this.prefabAnimation) && this.model) {
                this.scheduleOnce(() => {
                    this.playBombIdel(spritIndex);
                    if (this.createType == CreateType.Nov) {
                        this.model.isExecBomb && this.execBomb();
                    }
                }, 0);
            }
        }
        this._updateLvDisplay();
    }

    private _addGem() {
        if (this.model && this.model.GemLv > 0) {
            const sprite = Common.createSprite(null, ResCtrl.ins.getGemFrame(this.model.GemLv - 1));
            sprite.node.setScale(0.8);
            sprite.node.parent = this.ground.node;
        }
    }

    public updateGroundView() {
        if (GameModel.ins.isHavaMoveGround) {
            const dirs = [cc.v2(0, 1), cc.v2(0, -1), cc.v2(1, 0), cc.v2(-1, 0)];
            for (let index = 0; index < dirs.length; index++) {
                const targetPos = this.model.pos.add(dirs[index]);
                const cell = Common.safeGet2ArrayValue(GameModel.ins.CellList, targetPos);
                if (cell && cell.extCtrl) {
                    cell.extCtrl.showGround();
                }
            }
        }
    }

    public showGround() {
        if (this.model && this.model.isGround) {
            // 先添加 
            this.ground.node.active = true;
            this.shadowNode.active = false;
            const opt = Common.testGroundBorderDisplay(this.model.pos.x, this.model.pos.y, GameModel.ins.CellList, this.model.getType());
            for (let i = 4; i--;) {
                const name = MoveGroundNames[i];
                let border = this.ground.node.getChildByName(name)
                if (opt[i]) {
                    if (!border) {
                        border = M.nodePool.createItem(ResCtrl.ins.getGroundBorderPrefab(i));
                        border.parent = this.ground.node;
                        border.name = name;
                    }
                } else {
                    border && border.destroy();
                }
            }
            this.ground.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            this.ground.spriteFrame = ResCtrl.ins.groundCenter;
            this.ground.node.setContentSize(cc.size(Common.GRID_W, Common.GRID_H));
        }
    }

    private showLv() {
        if (this.model && this.model.getLv()) {
            const lv = cc.instantiate(this.node.getChildByName('pos'))
            lv.name = 'lv';
            lv.active = true;
            lv.parent = this.cellSprite.node;
            lv.getComponent(cc.Label).string = this.model.getLv() + '';
        }
    }

    private addTeshuLight() {
        this.lowerNode.active = true;
        const node = M.nodePool.getItem(NodePoolKey.TeshuLight, this.teshuLight);
        node.getComponent(cc.Sprite).spriteFrame = ResCtrl.ins.getBombBg(this.model.getType() - BombGap);
        node.parent = this.lowerNode;
    }

    private createPrefab(pb: cc.Prefab) {
        const result = Common.createEffPrefab(this.cellSprite.node, /*NodePoolKey.Roket*/null, pb)
        this.prefabAnimation = result.ctrl;
    }

    private createSpineCell(type: CellType, cellPrefab: cc.Prefab) {
        this.cellSprite.node.destroyAllChildren();
        const result = Common.createSpineNode(this.cellSprite.node, cellPrefab, <any>type);
        this.spineCellCtrl = result.ctrl;
    }

    private notifyDestory() {
        if (this.elimateNotify) {
            let isBorn = this.model.bindGModel ? this.model.bindGModel.isBorn : false;
            this.elimateNotify(isBorn);
        }
    }

    private checkSpecialCollect() {
        M.event.send(Event.GameCMD.SpeCollect, this.model);
    }

    public preDestory() {
        if (this.cellSprite) {
            this.cellSprite.node.active = false;
            this.checkSpecialCollect();
            if (this.model.GemLv > 0) {
                GameModel.ins.updateCollectCount(CollectType.gem, this.node.getPosition(), null, this.model.GemLv);
            }
            this.model && this.model.preDestory();
            this.animation.stop();
            this.animation.off('off', this.onAnimationStop, this);
            this.updateGroundView();
        }
        if (this.isDelayType()) {
            this.destoryTime = this.getDelayElimateTime();
        } else {
            this.destoryTime = 0;
        }
    }

    public execDestory() {
        this.notifyDestory();
        this.model.destory(this.elimateType);
        this.model.onUnBind(this.model.pos);
        this.model = null;
        this.destoryTime = null;
        this.animationState = null;
        this.BindAddScoreTask = null;
        this.showType = CellType.Empty;
        this.cellSprite.node.stopAllActions();

        this.node.stopAllActions();
        this.unscheduleAllCallbacks();

        this.cellSprite.spriteFrame = null;
        if (this.spineCellCtrl) {
            M.nodePool.freeItem(this.showType, this.spineCellCtrl.node)
            this.spineCellCtrl = null;
        }
        if (this.prefabAnimation) {
            this.prefabAnimation = null;
        }
        M.nodePool.freeItem(NodePoolKey.Cell, this.node);
    }

    private getDelayElimateTime(): number {
        let time = 0;
        switch (this.elimateType) {
            case ElimateType.Bomb2:
            case ElimateType.Bomb3:
                time = GapTime.DelayDestoryColAndRow;
                break;
            case ElimateType.Bomb1:
                time = GapTime.DelayDestoryBomb;
                break;
            case ElimateType.Bomb4:
                time = GapTime.DelayDestoryOctopus;
                break;
            default:
                if (this.isFishBomb()) {
                    time = GapTime.DelayDestoryFishBomb;
                }
                break;
        }
        return time;
    }


    private isDelayType() {
        if (this.elimateType == ElimateType.Bomb3 ||
            this.elimateType == ElimateType.Bomb2 ||
            this.elimateType <= ElimateType.All && this.elimateType > ElimateType.Default ||
            this.isFishBomb()) {
            return true;
        }
        return false;
    }

    private checkBomb(targetModel: CellModel): boolean {
        let isBomb = false;
        if (this.model && this.model.isBomb) {
            let pos = null
            if (targetModel) {
                pos = targetModel.pos;
                if (targetModel.isBomb) {
                    return;
                }
            }
            isBomb = true;
            this.scheduleOnce(() => {
                this.execBomb({ pos })
            }, 0.1)
        }
        return isBomb;
    }

    public updatePosition() {
        this.node.setPosition(this.model.getPosition());
        this.cellSprite.node.setPosition(0, 0);
    }

    private onAnimationStop(eventName: string, aniState: cc.AnimationState) {
        if (!this.model) return;
        switch (aniState.name) {
            case AniName.elimate:
            case AniName.collect:
                this.preDestory();
                break;
            case AniName.fallOver:
                if (this.model.isBomb) {
                    this.playBombIdel();
                }
                break;
            case AniName.bombCreate:
                if (this.model.isBomb) {
                    this.cellSprite.node.angle = 0;
                    this.playBombIdel();
                    this.model.isBombReady = true;
                    this.model.unlockCreateBombPos();
                    if (this.model.isExecBomb) {
                        this.execBomb();
                    } else {
                        this.model.continue2Fall();
                    }
                }
                break;
            case AniName.portalIn:
            case AniName.portalOut:
                this.execPortalResolve();
                break;
        }
    }

    /******************************************动画执行区域 *************************************************/
    private execExchangeAni() {
        if (!this.isRunMove && this.moveActionAry.length > 0) {
            this.isRunMove = true;
            const moveData = this.moveActionAry.shift();
            const a1 = cc.moveTo(moveData.t, Common.getPos(moveData.pos.x, moveData.pos.y));
            const a2 = cc.callFunc(() => {
                this.checkBomb(moveData.ep);
                this.isRunMove = false;
                this.execExchangeAni();
            }, this);
            this.node.runAction(cc.sequence(a1, a2));
        }
    }

    private meirenyuJumpPool = [];
    private isJumping: boolean = false;
    public mermaidJumpTo(targetPos: cc.Vec2, callback?: Function) {
        this.meirenyuJumpPool.push({ pos: targetPos, cb: callback });
        if (!this.isJumping) {
            this._execMermaidJumpTask();
        }
    }

    /**执行美人鱼的跳跃任务! */
    private _execMermaidJumpTask() {
        const item = this.meirenyuJumpPool.shift();
        if (item) {
            this.isJumping = true;
            this.spineCellCtrl.play('meirenyu_tiao', 0, false, null, null, { name: 'meirenyu_xiuxian', loop: true });
            this.moveTo(item.pos, () => {
                GameModel.ins.execElimateOne(item.pos, ElimateType.Girl, true);
                this.isJumping = false;
                item.cb && item.cb();
                this._execMermaidJumpTask();
            });
        }
    }

    public moveTo(targetPos: cc.Vec2, callback?: Function) {
        const pos = Common.getPos(targetPos.x, targetPos.y);
        const a0 = cc.delayTime(0.2);
        const a1 = cc.moveTo(0.2, pos);
        const a2 = cc.callFunc(() => {
            callback && callback();
        });
        this.node.runAction(cc.sequence(a0, a1, a2));
    }


    /**播放复合炸弹爆炸前的动画! */
    public playComplexBombAni(type): Promise<any> {
        return new Promise((resolve) => {
            switch (type) {

            }

            this.scheduleOnce(resolve, 0);
        })
    }

    public playChange2Cell() {
        this.animation.play(AniName.change2cell);
    }

    public exchangeDoubleBombAni(targetModel: CellModel) {
        if (targetModel) {
            //Todo 待播放相应的骨骼动画..... 但是这里不知道要播放哪种类型呀.?
            const a1 = cc.moveTo(0.15, Common.getPos(targetModel.pos.x, targetModel.pos.y));
            const a2 = cc.callFunc(async () => {
                const groupId = GameModel.ins.seq.next();
                targetModel.onMsg(MsgType.ComplexBomb, { type1: this.model.getType(), type2: targetModel.getType(), groupId });
                this.playBombSingleDestoryEff(0.1, GapTime.BombMergeBombChangeTime, false, groupId);
                // targetModel.extCtrl.playBombSingleDestoryEff(0.1, GapTime.BombMergeBombChangeTime, false, groupId);
            }, this)
            this.node.runAction(cc.sequence(a1, a2));
        }
    }

    public execFishBomb() {
        //是炸弹鱼,并且被其他炸弹炸死的!执行爆炸!
        this.model.initBombModel(CellType.Fish);
        this.model.onMsg(MsgType.Bomb);
        this.model.isBomb = false;
    }

    private execRoket() {
        const timeLine = GroupAnimatCtrl.ins.createTimeLine();
        const groundId = this.model.GroupId;
        let count = 0;
        for (let i = 3; i--;) {
            timeLine.add(gsap.TweenLite.delayedCall(GapTime.ThreePlaneCreate, () => {
                GameModel.ins.execElimate(this.model, null, ElimateType.Rocket, null, null, groundId);
                count++;
                if (count >= 3) {

                }
            }));
        }
    }

    /**是否是3个鱼炸弹消除.此时滞空3个鱼 */
    private isFishSingleBomb(): boolean {
        return (this.model.getType() == CellType.Fish && this.elimateType != ElimateType.Default);
    }

    private isFishBomb(): boolean {
        return (this.model.getType() == CellType.Fish && (this.elimateSize == 3 || this.elimateType != ElimateType.Default));
    }

    /**单个销毁动画 */
    public playElimate() {
        if (this.isFishSingleBomb() && !this.animationState && this.elimateType != ElimateType.Girl) {
            this.execFishBomb();
        }
        if (this.model && !this.model.isEmpty) {
            if (this.model.isRocket && this.elimateSize != 0) {
                this.execRoket();
            }
            else if (this.model.isCollect && GameModel.ins.getCollect().get(this.model.getType() + '') > 0 && this.elimateType == ElimateType.Default) {
                //收集物!!
                this.playCollectAni();
            } else {
                if (this._isPlayElimateAnimation() && (!this.animationState || (this.animationState && this.animationState.name != AniName.elimate))) {
                    this.animationState = this.animation.play(AniName.elimate);
                }
                this.playLittleElimateEff();
            }
        }
    }

    private _isPlayElimateAnimation(): boolean {
        return (this.model.getType() != CellType.Banana)
    }

    /**合成炸弹时,炸弹的补间动画 */
    public playCreateBombAni() {
        if (!this.animation) {
            this.initAnimation();
        }
        this.model.isBombReady = false;
        this.animation.play(AniName.bombCreate);
    }

    private playLittleElimateEff() {
        const wolrdPos = Common.getWorldPos(this.node);

        if (this.model.getType() == CellType.Banana) {
            if (this.prefabAnimation) {
                this.prefabAnimation.play();
                this.scheduleOnce(this.preDestory.bind(this), 0.5)
            } else {
                this.preDestory();
            }
        } else if (this.elimateType != ElimateType.Bomb1 && this.model.getType() != CellType.IceCream) {
            // M.platform.vibrateShort();
            if (this.model.isGround) {
                this.playBrokenEff(wolrdPos);
            } else {
                M.event.send(Event.Effect.LittleBomb, wolrdPos);
            }
            M.event.send(Event.Sound.PlaySoundEff, AudioID.Elimate);
        }

        this.model.notifyRoundElimate(this.elimateType);
        // this.scheduleOnce(() => {
        //     M.event.send(Event.Effect.ShowDot, this.elimateType, wolrdPos);
        // }, GapTime.DelayLightPoint);
    }

    public playBrokenEff(pos?: cc.Vec2) {
        pos = pos || Common.getWorldPos(this.node);
        M.event.send(Event.Effect.Broken, pos);
        if (this.model && this.model.getLv() <= 0) {
            this.updateGroundView();
        }
    }

    /**炸弹在桌面上的呼吸动画 */
    private playBombIdel(type?: number) {
        if (this.spineCellCtrl) {
            this.cellSprite.spriteFrame = null;
            //播呼吸动画不应该冲掉销毁动画!
            let name = null;
            if (this.model.getType() == CellType.Fish) {
                name = SpineCellIdelName[SpineCellIdelName.length - 1];
            } else if (this.spineCellCtrl.curPlay != SpineCellBombName[this.model.getType() - BombGap]) {
                name = SpineCellIdelName[this.model.getType() - BombGap];
            }
            this.spineCellCtrl.play(name, 0, true);
        } else if (this.model.isRocket) {
            if (this.prefabAnimation) {
                this.prefabAnimation.play(`${type}_zhangyuGGIdle`);
                console.error('prefabAnimation:', `${type}_zhangyuGGIdle`);
            }
        } else if (this.animation && this.model.isBomb) {
            this.animation.play(AniName.bombIdle);
        }
    }

    /**执行绑定好的加分数方法 */
    private _execBindAddScoreFun(count: number = null) {
        if (this.BindAddScoreTask) {
            this.BindAddScoreTask(Common.getWorldPos(this.node), count);
            this.BindAddScoreTask = null;
        }
    }

    /**炸弹自销毁动画 */
    public playBombSingleDestoryEff(keepTime: number = 0.2, playTime: number = 0.2, isSpineEff: boolean = false, groupId: number = null): Promise<any> {
        return new Promise((resolve) => {
            if (!this.model) {
                return resolve();
            }
            (groupId && !this.model.GroupId) && (this.model.GroupId = groupId);
            this.model.onMsg(MsgType.Elimate, { id: groupId, isForced: true });

            const over = () => {
                if (this.model) {
                    this.model.unlockCreateBombPos();
                }
                this.preDestory();
                resolve();
            }
            this.elimateType = this.model.getType();
            this._execBindAddScoreFun();

            if (isSpineEff && this.spineCellCtrl && !this.isPreDestory()) {
                const name = SpineCellBombName[this.model.getType() - BombGap];
                this.spineCellCtrl.play(name, 0, false);
                this.scheduleOnce(over, 0.3 + playTime);
            } else if (this.model.isRocket) {
                if (this.prefabAnimation) {
                    this.prefabAnimation.play(`${this.model.getType()}_zhangyuGG`);
                    this.scheduleOnce(over, 0.3 + playTime);
                }
            } else {
                const a0 = cc.fadeOut(keepTime);
                const a1 = cc.callFunc(() => {
                    this.cellSprite.node.active = false;
                }, this);
                const a2 = cc.delayTime(playTime);
                const a3 = cc.callFunc(over, this);
                this.node.runAction(cc.sequence(a0, a1, a2, a3));
            }
        })
    }

    /**
    * 执行爆炸时余震的动画
    * @param bombLv 当前的余波等级
    * @param centerPos 中心点的位置(网格)!
    */
    public execBombAfterShocks(bombLv: number, centerPos: cc.Vec2) {
        if (this.model && !this.model.isDeath && !this.isHavaSpe() && !this.isPlayBombShocks) {
            this.isPlayBombShocks = true;
            const cp = Common.getPos(centerPos.x, centerPos.y);
            const sp = this.model.getPosition();
            //  计算角度 
            const radians: number = Math.atan2((cp.x - sp.x), (cp.y - sp.y));
            const degrees: number = radians * -180 / Math.PI;

            const dir = Common.getDirction(cp, sp);

            const a0 = cc.moveBy(0.2, cc.v2(-dir.x * (bombLv * 4), -dir.y * (bombLv * 4)));
            const a1 = cc.moveBy(0.2, cc.v2(dir.x * (bombLv * 8), dir.y * (bombLv * 8)));
            const a2 = cc.moveTo(0.2, cc.v2(0, 0)); // <any>a1.reverse();
            const a3 = cc.sequence(cc.rotateTo(0.1, (degrees * 0.1) * (bombLv * 0.5)), cc.rotateTo(0.1, 0));

            // 形变动画.暂缺未完成
            // const a1 = cc.scaleTo(0.1, (1.1 * (bombLv * 0.4)));
            // const a2 = cc.scaleTo(0.1, 0.95);
            // const a3 = cc.scaleTo(0.1, 1);

            const over = cc.callFunc(() => {
                this.cellSprite.node.setPosition(0, 0);
                this.cellSprite.node.angle = 0;
                this.isPlayBombShocks = false;
            }, this);

            this.cellSprite.node.runAction(cc.sequence(cc.spawn(cc.sequence(a0, a1, a2), a3), over));
        }
    }

    /**游戏结束将普通元素转换成炸弹动画 */
    public change2Bomb(type?: CellType) {
        if (this.model) {
            this.model.change2Bomb(type);
            this.cellSprite.node.active = true;
            this.updatePosition();
            this.updateDisplay();
            this.playCreateBombAni();
        }
    }

    /**出生点创建时,元素出生动画 */
    private playEnterAni() {
        this.node.opacity = 0;
        this.node.runAction(cc.fadeIn(0.15));
    }

    /**下落中的动画 */
    public playFallStartAni() {
        if (!this.isPlayFall && !this.isHavaSpe()) {
            this.isPlayFall = true;
            this.animation.playAdditive(AniName.fall);
        }
    }

    /**贝壳抖动 */
    public playShaking() {
        const a0 = cc.moveBy(0.05, cc.v2(Util.Tool.rangeInt(2, 5), Util.Tool.rangeInt(2, 5)))
        const a1 = <any>a0.reverse();
        this.cellSprite.node.runAction(cc.repeatForever(cc.sequence(a0, a1)));
        // this.animation.play(AniName.shaking);
    }

    /**下落暂停 */
    public playFallPauseAni() {
        if (this.isPlayFall) {
            this.isPlayFall = false;
            this.animation.play(AniName.fallPause);
        }
    }

    /**下落结束时的动画 */
    public playFallOverAni() {
        if (!this.portalResolve && !this.isHavaSpe()) {
            this.isPlayFall = false;
            if (this.model.getType() == CellType.IceCream) {
                this.prefabAnimation && this.prefabAnimation.play();
            } else {
                this.animation.play(AniName.fallOver);
            }
        }
    }

    /**消除提示时单个的那个 */
    public playSinglePrompt(mulPos: cc.Vec2) {
        if (this.model) {
            const dir = Common.getDirction(mulPos, this.model.pos);

            const gap = 6;
            const shockGap = 5;
            const a1 = cc.spawn(cc.scaleTo(0.5, 1.05), cc.moveTo(0.5, cc.v2(dir.x * gap, dir.y * -gap)));
            const a2 = cc.repeat(cc.sequence(cc.moveBy(0.2, cc.v2(dir.x * shockGap, dir.y * -shockGap)), cc.moveBy(0.2, cc.v2(dir.x * -shockGap, dir.y * shockGap))), 2);
            const a3 = cc.spawn(cc.scaleTo(0.2, 1.0), cc.moveTo(0.2, cc.v2(0, 0)));
            const a4 = cc.delayTime(0.5);
            this.cellSprite.node.runAction(cc.repeatForever(cc.sequence(a1, a2, a3, a4)));

        }
    }

    /**消除提示时多个的那个 */
    public playMulPrompt() {
        if (this.animation) {
            this.animation.playAdditive(AniName.prompt);
        }
    }

    public playRotatingMerge(centerPos: cc.Vec2) {
        this.rotatingCtrl = new RotatingCtrl(this.node, centerPos);
        this.rotatingCtrl.start().then(() => {
            this.cellSprite && (this.cellSprite.node.active = false);
            this.rotatingCtrl = null;
        });
    }

    public playMergeNormalBomb(centerPos: cc.Vec2, time: number = GapTime.MergeBombSpeed, isNeedDestory: boolean = true, isShowSpeedLine: boolean = true) {
        //根据方向,做变形!  
        if (this.model.isRocket && this.elimateSize != 0) {
            this.execRoket();
            return;
        }
        const dir = Common.getDirction(centerPos, this.model.pos);
        const centerPosition = Common.getPos(centerPos.x, centerPos.y);
        let { sx, sy } = { sx: 1, sy: 1 };
        if (dir.x != 0) {
            sx = 1.2; sy = 0.8;
        } else if (dir.y != 0) {
            sx = 0.8; sy = 1.2;
        }
        const a0 = cc.scaleTo(0.05, sx, sy);
        const a1 = cc.moveTo(time, centerPosition);
        const a2 = cc.callFunc(() => {
            if (isNeedDestory) {
                this.preDestory();
            } else {
                this.cellSprite.node.active = false;
            }
        }, this);
        this.model.notifyRoundElimate(this.elimateType);
        if (isShowSpeedLine) {
            M.event.send(Event.Effect.SpeedLine, Common.getWorldPos(this.node), dir);
        }
        this.node.runAction(cc.sequence(cc.spawn(a0, a1), a2));
    }

    public stopPromptAction() {
        if (this.cellSprite) {
            this.animation.stop();
            this.cellSprite.node.stopAllActions();
            this.cellSprite.node.setPosition(0, 0);
        }
        // this.resetDisplayInfo();
    }

    public portalOut(): Promise<any> {
        if (!this.portalResolve) {
            return new Promise((resolve) => {
                this.portalResolve = resolve;
                this.animation.play(AniName.portalOut);
            });
        }
        return null;
    }

    public portalIn(): Promise<any> {
        if (!this.portalResolve) {
            return new Promise((resolve) => {
                this.portalResolve = resolve;
                this.animation.play(AniName.portalIn);
            });
        }
        return null;
    }

    private execPortalResolve() {
        this.portalResolve && this.portalResolve(true);
        this.portalResolve = null;
    }

    /**本身是收集物,需要做什么样的过度动画 ???? */
    private playCollectAni() {
        this.node.zIndex = 100;
        this.animationState = this.animation.play(AniName.collect);
        this.playLittleElimateEff();
    }

    /****************************************** 动画执行区域 *************************************************/
    private checkDestory(dt) {
        if (this.destoryTime != null) {
            this.destoryTime -= dt;
            if (this.destoryTime <= 0) {
                this.execDestory();
            }
        }
        if (this.model && this.model.isDeath) {
            this.deathTimeout += dt;
            if (/*!this.animationState &&*/ this.deathTimeout > 5) {
                this.deathTimeout = 0;
                this.playElimate();
            }
        }
    }

    private updateTestLabel() {
        if (this.model) {
            this.node.getChildByName('pos').getComponent(cc.Label).string = `${this.model.pos.x}-${this.model.pos.y}`
            // if (this.model.GroupId) {
            //     this.node.getChildByName('pos').getComponent(cc.Label).string = `${this.model.GroupId}`
            // } else {
            //     this.node.getChildByName('pos').getComponent(cc.Label).string = '';
            // }
        }
    }

    public orderlyUpdate(dt) {
        //帧率限制...当现有帧率时间远远超过单格单位时间,则限制! 
        if (dt > FallMaxGateLimit) {
            dt = FallMaxGateLimit;
        }
        if (this.model && this.model.isFall && !this.isRunMove) {

            let x = this.node.x + this.model.speed.x * this.model.fallingDir.x * dt;
            let y = this.node.y - this.model.speed.y * this.model.fallingDir.y * dt;

            //炸弹需要准备好了.才能掉落!
            if (!this.model.isBomb || (this.model.isBomb && this.model.isBombReady)) {
                if (this.model.fallDes) {
                    //处理目标坐标修正! 
                    if (this.model.fallingDir.x > 0) {
                        x = x > this.model.fallDes.x ? this.model.fallDes.x : x;
                    } else {
                        x = x < this.model.fallDes.x ? this.model.fallDes.x : x;
                    }
                    y = y < this.model.fallDes.y ? this.model.fallDes.y : y;
                }
                if (x != 0 || y != 0 || !this.node.active) {
                    this.node.active = true;
                }
                this.node.setPosition(x, y);
                //是否已经下落结束!
                if (this.model.posDetection(this.node.position)) {
                    this.updatePosition();
                    // this.playFallOverAni();
                }
            }
        }
    }

    update(dt) {
        this.updateDisplay();
        this.checkDestory(dt);
        if (Apps.isDebug) {
            this.updateTestLabel();
        }
        // if (this.rotatingCtrl) {
        //     this.rotatingCtrl.update(dt);
        // }
    }
}
