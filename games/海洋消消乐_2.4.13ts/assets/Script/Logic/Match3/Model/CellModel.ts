import Common from "../../Common/Common";
import GameModel from "./GameModel";
import Girl from "./SpecialPlug/Girl";
import { BombModel } from "./BombModel";
import { CellBase, MsgType } from "./CellBase";
import GroundCellModel from "./GroundCellModel";
import { Util } from "../../../Base/Utils/Util";
import UpGroundCellModel from "./UpGroundCellModel";
import { Grid } from "../../Data/Interface/Level/ILevel";
import ItemBasicCellCtrl from "../View/ItemBasicCellCtrl";
import { GapTime } from "../../Data/Const/TimeConfig";
import { CellType, ElimateType, BrokenConchHp, UpGroundType, GameState } from "../../Data/Const/Constant";
import M from "../../../Base/Manager/M";
import EventMgr from "../../../Base/Manager/EventMgr";
import { Event } from "../../Data/Const/Event";
import { AudioID } from "../../Common/AudioCtrl";

export class CellModel extends CellBase<CellType, ItemBasicCellCtrl> {

    public id: number = 0;

    public isRandom: boolean = false;
    public isCollect: boolean = false;

    /**当前道具绑定基础元素,跟随基础元素移动 */
    public bindGModel: GroundCellModel = null;
    public bindUpGModel: UpGroundCellModel = null;

    public isEmpty: boolean = false;
    /**是否是可以下落的状态 */
    private _isFall: boolean = false;
    /**下落速度 */
    public speed: cc.Vec2 = cc.v2(0, 0);
    /**下一个下落目的地 */
    public fallDes: cc.Vec2 = null;
    /**下落方向 */
    public fallDir: cc.Vec2 = null;
    /**是否是炸弹 */
    public isBomb: boolean = false;
    /**可否是土块 */
    public isGround: boolean = false;
    /**被飞机选中标记 */
    public isPlaneSelected: boolean = false;
    /**立即执行爆炸! */
    public isExecBomb: boolean = false;
    /**炸弹是否已经准备好爆炸了,有可能处于创建前摇 */
    public isBombReady: boolean = true;
    /**只能被炸弹消除 */
    public isJustBombElimate: boolean = false;
    /**无敌的 */
    public isInvincible: boolean = false;
    /**已经处于完全销毁完全状态! */
    public isDestoryed: boolean = false;
    /**是否处于传送中! */
    public isPortaling: boolean = false;
    /**宝石的等级 */
    public GemLv: number = 0;
    /**是否是火箭 */
    public isRocket: boolean = false;

    private _destoryGroup: number = null;

    private bombModel: BombModel = null;

    private _hp = 1;

    constructor() {
        super();
        this.type = CellType.Empty;
        this.ctrlName = 'ItemBasicCellCtrl';
    }

    public init(data: Grid | {}, index?: number, pos?: cc.Vec2, isInit?: boolean, sync2gm?: boolean) {
        this.data = <any>data;
        this.mapIndex = index;
        this.lv = 0;
        this._hp = 1;
        this.GemLv = 0;
        this._pos = pos;
        this.fallDir = null;
        this.bombModel = null;
        this._destoryGroup = null;
        this.isCollect = false;
        this._isDeath = false;
        this._isFall = false;
        this.isBomb = false;
        this.isGround = false;
        this.isInvincible = false;
        this.isExecBomb = false;
        this.isRocket = false;
        this.isBombReady = true;
        this.isDestoryed = false;
        this.isPlaneSelected = false;
        this.isJustBombElimate = false;

        this.speed = cc.v2(0, 0);
        if (sync2gm) {
            Common.safeSet2ArrayValue(GameModel.ins.CellList, pos, this);
        }
        if (this.data) {
            this.initType(isInit);
            // this.id = GameModel.ins.seq.next();
        }
    }

    public onBind() {

    }

    public onUnBind(pos: cc.Vec2) {
        this.bindGModel && this.bindGModel.onUnBind(pos);
        this.bindUpGModel && this.bindUpGModel.onUnBind(pos);
    }

    public initBindGround(gCell: GroundCellModel, upCell: UpGroundCellModel) {
        this.bindGround(gCell);
        this.bindGround(upCell, true);
    }

    public initBombModel(type: CellType = null) {
        this.isBomb = true;
        this.bombModel = new BombModel();
        this.bombModel.init(type || this.type, this.pos.x, this.pos.y);
    }

    private initType(isInit: boolean) {
        this.isEmpty = false;
        if (this.data.ground) {
            this.lv = this.data.ground;
            this.isGround = true;
            this.GemLv = this.data.gem;
            if (this.GemLv) {
                GameModel.ins.isHaveGem = true;
            }
            GameModel.ins.isHavaMoveGround = true;
            this.setNormalType(CellType.Ground);
        } else if (this.data.rocket_type != null && this.data.rocket_type != undefined) {
            this.isRocket = true;
            this.setNormalType(this.data.rocket_type);
        } else if (this.data.empty || this.data.flowers || this.data.firefly || this.data.mushroom) {
            this.type = CellType.Empty;
            this.isEmpty = true;
        } else if (this.data.counter_level) {
            this.setNormalType(CellType.BottleCaps);
            this.setLv(this.data.counter_level);
        } else if (this.data.type == undefined) {
            this.setRandomType(isInit);
        } else if (this.data.type < CellType.Bomb1) {
            this.setNormalType(this.data.type);
        } else if (Common.isBombType(this.data.type)) {
            this.type = this.data.type;
            this.initBombModel();
        }

        if (this.type == CellType.BrokenConch) {
            this._hp = BrokenConchHp;
        }
    }

    public onMsg(type: MsgType, parame?: any) {
        switch (type) {
            case MsgType.BesideElimate:
                this.execBesideElimate(parame);
                break;
            case MsgType.Elimate:
                this.execElimate(parame);
                break;
            case MsgType.Fall:
                // this.execFall(parame);
                break;
            case MsgType.FallEnd:
                // this.notifyRoundFall();
                this.stopFall();
                // this.execCheckElimate();
                this.checkIsExit(this.pos);
                this._updateGroundView();
                break;
            case MsgType.Bomb:
                this.execBomb(parame);
                break;
            case MsgType.Portal:
                this.execPortal();
                break;
            case MsgType.ComplexBomb:
                this.execComplexBomb(parame);
                break;
            case MsgType.UpGroundDone:

                // this.GroupId = parame;
                if (this.isEmpty) {
                    this.notifyRoundFall();
                    if (GameModel.ins._isBorn(this.pos) && this.extCtrl) {
                        //如果出生为有个empty,销毁.创建下落元素
                        this.extCtrl.preDestory();
                    }
                } else {
                    this.continue2Fall();
                }
                this.execPortal();

                // parame && this.execCheckElimate();

                break;
        }
    }

    private resetTypeAttribute() {
        switch (this.type) {
            case CellType.BrokenConch:
            case CellType.Banana:
            case CellType.Ground:
            case CellType.BottleCaps:
                this.isJustBombElimate = true;
                break;
            case CellType.Girl:
            case CellType.Conch:
                this.isInvincible = true;
                break;
            case CellType.IceCream:
                this.isInvincible = true;
                GameModel.ins.IceCreamPool.add(this);
                break;
            case CellType.Empty:
                this.isEmpty = true;
                break;
        }
    }

    private setNormalType(type) {
        this.type = type;
        this.resetTypeAttribute();
    }

    public changeBindGround(pos: cc.Vec2) {
        //根据当前坐标来重新绑定地面元素 
        this.bindGround(Common.safeGet2ArrayValue(GameModel.ins.GroundList, pos));
        this.bindGround(Common.safeGet2ArrayValue(GameModel.ins.UpGroundList, pos), true);
    }

    public lockCreateBombPos(size: number, type: ElimateType) {
        if (size >= 4 && type == ElimateType.Default) {
            GameModel.ins.Lock.lockFallPos(this.pos, this.pos);
        }
    }

    public unlockCreateBombPos() {
        GameModel.ins.Lock.unLockFallPos(this.pos);
    }

    public doTestDeath(): boolean {
        if (!this.isInvincible) {
            this._hp--
        }
        this._isDeath = this._hp <= 0;
        return this.isDeath;
    }

    public execUpElimate(type) {
        const data = { id: this.GroupId, type };
        if (this.isCanElimate()) {
            if (this.isEmpty && this.bindGModel) {
                this.bindGModel.onMsg(MsgType.Elimate, data);
            }
        } else if (this.bindUpGModel) {
            this.bindUpGModel.onMsg(MsgType.Elimate, data);
        }
    }

    private execElimate(data: { id: number, type: ElimateType, isForced: boolean }) {
        if (this.isCanElimate()) {
            if (data && data.isForced) this._isDeath = true;
            // if (this.isEmpty && this.bindGModel) {
            //     this.bindGModel.onMsg(MsgType.Elimate, data);
            // }
            this.GroupId = data.id;
        } else {
            // this.bindUpGModel.onMsg(MsgType.Elimate, data);
        }
    }

    private execBesideElimate(data: { type: ElimateType, cell: CellModel }) {
        if (this.isCanBesideElimate() && data.type != ElimateType.Beside && !data.cell.isCanBesideElimate()) {
            this.lv--;
            if (this.lv > 0) {
                this.extCtrl && this.extCtrl.playBrokenEff();
            } else {
                this.elimateSelf(ElimateType.Beside);
            }
        }
    }

    public notifyRoundElimate(type: ElimateType = ElimateType.Default) {
        if (GameModel.ins) {
            Common.Dir4.forEach(dir => {
                const pos = this.pos.add(dir);
                const threeLayer = [GameModel.ins.UpGroundList, GameModel.ins.GroundList, GameModel.ins.CellList];
                for (let i = threeLayer.length; i--;) {
                    const cell: any = Common.safeGet2ArrayValue(<any>threeLayer[i], pos);
                    /**只允许普通消除的类型进行旁边消除. */
                    if (cell && (type == ElimateType.Default || type == ElimateType.Bomb5)) {
                        cell.onMsg(MsgType.BesideElimate, { type, cell: this, groupId: this._destoryGroup });
                    }
                }
            });
        }
    }

    // private notifyFall(pos: cc.Vec2) {
    //     const cm = Common.safeGet2ArrayValue(GameModel.ins.CellList, pos);
    //     if (cm) {
    //         cm.onMsg(MsgType.Fall);
    //     }
    //     return cm;
    // }

    // private notifyPassbleUpFall(pos: cc.Vec2) {
    //     const upGm = Common.safeGet2ArrayValue(GameModel.ins.GroundList, pos);
    //     if (upGm && upGm.isPassable) {
    //         this.notifyFall(GameModel.ins.findNextNotPassblePos(pos, cc.v2(0, -1)));
    //     }
    // }

    /**
     *  检测上方是否有可落下的元素!
     */
    public notifyRoundFall() {
        GameModel.ins.testFindCanFallCell(this.pos, this._destoryGroup);
    }

    private notifyPlugEvent() {
        if (this.type == CellType.BrokenConch) {
            GameModel.ins.notifyPlug(Girl);
        }
    }

    /**更新移动地块的边界显示 */
    private _updateGroundView() {
        if (this.isGround && this.extCtrl) {
            this.extCtrl.showGround();
            this.extCtrl.updateGroundView();
        }
    }

    /**是否已经被固定住了 */
    public isNotFixed(): boolean {
        let result = true;
        //检测上层
        if (this.bindUpGModel) {
            result = this.bindUpGModel.isCanFall();
        }
        switch (this.type) {
            case CellType.Conch:
            case CellType.Girl:
                result = false
                break;
        }
        return result;
    }

    public startFall(dir: cc.Vec2 = null) {
        this.fallDir = dir || cc.v2(0, 1);
        this._isFall = true;
        GameModel.ins.Lock.lockFallPos(this.pos.add(this.fallDir), this.pos);
        EventMgr.ins.send(Event.Sound.PlaySoundEff, AudioID.CellFall);
    }

    private _deleteOutOfGridCell() {
        const groundCell = Common.safeGet2ArrayValue(GameModel.ins.GroundList, this.pos)
        if (!groundCell || groundCell.getType() == null) {
            this.extCtrl && this.extCtrl.preDestory();
            //解锁
            const nextPos = this.pos.add(this.fallDir)
            GameModel.ins.Lock.unLockBornPos(nextPos);
            GameModel.ins.Lock.unLockFallLockByKey(this.pos);
        }
    }

    private stopFall() {
        this.extCtrl.playFallOverAni();
        this._isFall = false;
        GameModel.ins.completFall(this._destoryGroup, this);
        GameModel.ins.removeFallDict(this);
        this._deleteOutOfGridCell();
        if (!this.isDeath) this._destoryGroup = null;
    }

    /**重置元素的下落方向 */
    public resetFallDir(dir: cc.Vec2 = null) {
        this.fallDes = null;
        GameModel.ins.Lock.unLockFallLockByKey(this.pos);
        this.startFall(dir);
        this.notifyRoundFall();
    }

    /**地面被解绑 */
    public unBindGround(gm: GroundCellModel) {
        //与地面解绑,检测当前地面是否有传送门 
        if (gm.isPortalOut()) {
            //找到传送阵的入口!
            const portalPos = GameModel.ins.getUpGroundModel().getPortalPos(gm.portalIdx);
            const cell = Common.safeGet2ArrayValue(GameModel.ins.CellList, portalPos.in);
            //激发入口的传送阵
            cell && cell.onMsg(MsgType.Portal);
        }
    }

    /**绑定地面元素 */
    public bindGround(model: any, isUp: boolean = false) {
        if (!model) return;
        if (isUp) {
            if (model.getType() != UpGroundType.None) this.bindUpGModel = model;
        } else {
            if (model.getType() != null) this.bindGModel = model;
        }
        model.onBind(this);
    }

    //位置发生改变
    public onChangePos(pos: cc.Vec2) {
        this.onUnBind(this.pos);
        //重新绑定现有的元素位
        Common.safeSet2ArrayValue(GameModel.ins.CellList, pos, this);
        //重新绑定地面
        this.bindGround(Common.safeGet2ArrayValue(GameModel.ins.GroundList, pos));
        //上层元素应该跟着基础元素一起落.  
        this.bindUpGModel && (this.bindUpGModel.pos = pos);
    }

    public setRandomType(isInit: boolean = false, mapIndex: number = null) {
        this.isRandom = true;
        const tempType = GameModel.ins.getRandomCellType();
        if (Common.isBombType(tempType) && !isInit) {
            this.type = tempType;
            this.initBombModel();
        } else if (this.type == tempType) {
            this.setRandomType(isInit, mapIndex);
        } else {
            this.type = tempType;
            const isxx = GameModel.ins.checkPoint(this.pos, null, mapIndex);
            if (isInit && (GameModel.ins.checkIsNoInitCreate(tempType) || isxx)) {
                this.setRandomType(isInit, mapIndex);
            }
        }
        this.resetTypeAttribute();
    }

    public async triggerPortal(pos: { in: cc.Vec2, out: cc.Vec2 }) {
        // 标记准备传送的元素!  
        if (!this.extCtrl) return;
        this.isPortaling = true;
        GameModel.ins.Lock.lockBornPos(pos.out);
        const rOut = await this.extCtrl.portalOut();
        if (rOut) {
            //如果这是个出生点.则删除出生点锁
            GameModel.ins.Lock.unLockBornPos(pos.out);
            Common.safeSet2ArrayValue(GameModel.ins.CellList, this.pos, null);
            //通知上面可以开始掉落了.
            // this.notifyRoundFall(false);
            // this._isFall = true;

            this.notifyRoundFall();
            this.pos = pos.out;
            this.isPortaling = false;
            this.extCtrl.portalIn().then(rIn => {
                if (rIn && !this._isFall) {
                    //检测下方是否可以下落
                    this.continue2Fall()
                }
            });

            if (!this.continue2Fall()) {
                //传送完成如果没有移动,则检测一次是否有消除的!
                GameModel.ins.checkHavaElimate(this.pos);
                this._updateGroundView();
            }
            this.extCtrl.updatePosition();
            GameModel.ins.PortalDict.delete(this);
        }
    }

    /**检测该位置是否有已经到出口的物件 */
    public checkIsExit(pos: cc.Vec2) {
        if (this.type == CellType.IceCream) {
            const gm = Common.safeGet2ArrayValue(GameModel.ins.GroundList, pos);
            if (gm && gm.isExit) {
                this.elimateSelf(null);
                GameModel.ins.IceCreamPool.delete(this);
            }
        }
    }

    private isCanTriggerPortal(gm: GroundCellModel): boolean {
        return !this.isEmpty && gm && gm.isPortalIn() && this.isNotFixed();
    }

    private elimateSelf(type: ElimateType) {
        GameModel.ins.execElimateOne(this.pos, type || ElimateType.Default, true);
    }

    private execPortal(): boolean {
        let result = false;
        if (GameModel.ins.PortalDict.has(this)) {
            //正在传送中
            return true;
        }
        const groudModel = Common.safeGet2ArrayValue(GameModel.ins.GroundList, this.pos);
        if (!groudModel) return false;

        if (groudModel.isPortalOut()) {
            const portalPos = GameModel.ins.getUpGroundModel().getPortalPos(groudModel.portalIdx);
            const portalInCell = Common.safeGet2ArrayValue(GameModel.ins.CellList, portalPos.in);
            if (portalInCell && !portalInCell.isRemoved() && !portalInCell.isFall) {
                portalInCell.onMsg(MsgType.Portal);
            }
        } else if (!this.isDeath && this.isCanTriggerPortal(groudModel)) {
            //定位传送节点
            const portalPos = GameModel.ins.getUpGroundModel().getPortalPos(groudModel.portalIdx);
            //激活传送阵 
            if (GameModel.ins.isCanFall(portalPos.out, this.pos) && !GameModel.ins.Lock.isBornPosLocked(portalPos.out)) {
                result = true
                GameModel.ins.PortalDict.add(this);
                this.triggerPortal(portalPos);
            }
        }
        return result;
    }

    // private execCheckElimate() {
    //     GameModel.ins.checkHavaElimate(this.pos);
    //     this.checkIsExit(this.pos);
    // }

    private execComplexBomb(data: { type1: CellType, type2: CellType, isBoard: boolean, groupId: number }) {
        if (this.bombModel) {
            this.bombModel.onBombMergeBomb(data.type1, data.type2, this, data.groupId);
            if (!data.isBoard) {
                GameModel.ins.updateStepCount();
            }
        }
    }

    private execBomb(data: { pos: cc.Vec2, type?: CellType }) {
        if (this.bombModel && !this.isRemoved()) {
            let type = null;
            if (data) {
                type = data.type;
                if (!type) {
                    const target = Common.safeGet2ArrayValue(GameModel.ins.CellList, data.pos);
                    if (target) {
                        type = target.getType();
                    }
                }
            }
            this.unlockCreateBombPos();
            if (this.bombModel.getType() == CellType.Bomb5) {
                if (type != null) {
                    this.bombModel.execBomb(this, type, this._destoryGroup);
                    // this.execElimate(null);
                }
            } else {
                this.bombModel.execBomb(this, type, this._destoryGroup);
                // this.execElimate(null);
            }
        }
    }

    public set GroupId(id: number) {
        if (this._destoryGroup == null) {
            this._destoryGroup = id;
        }
    }

    public get GroupId(): number {
        return this._destoryGroup;
    }

    public get fallingDir(): cc.Vec2 {
        return this.fallDir;
    }

    public get isFall(): boolean {
        return this._isFall;
    }

    public change2Cell(type: CellType = null) {
        this.setNormalType(type);
        // this._destoryGroup = null;  //当初是因为什么设计成这里要置空呢 ??????
        GameModel.ins.checkHavaElimate(this.pos);
    }

    public change2Bomb(type: CellType = null) {
        this.data = <any>{};
        this.data.type = type || Util.Tool.rangeInt(10, CellType.Bomb4);
        // this._destoryGroup = null;
        this.initType(false);
    }

    public isCanBesideElimate() {
        return (this.type == CellType.Banana || this.type == CellType.BottleCaps || this.type == CellType.Ground)
    }

    public isCanElimate(): boolean {
        return !this.bindUpGModel || (this.bindUpGModel && !this.bindUpGModel.isHavaSpe);
    }

    public isFalling(): boolean {
        return (this.isFall && (this.speed.y > 0 || this.speed.x > 0))
    }

    public isRemoved(): boolean {
        return this.isDeath && (!this.extData); //this.isDestoryed;
    }

    /**美人鱼往下踩一次 */
    public mermaidJumpTo(targetPos: cc.Vec2) {
        if (this.extCtrl) {
            GameModel.ins.Lock.lockFallPos(targetPos, this.pos, true);
            this.extCtrl.mermaidJumpTo(targetPos, () => {
                Common.safeSet2ArrayValue(GameModel.ins.CellList, this.pos, null);
                this._moveOver(targetPos);
                this.notifyRoundFall();
            });
        }
    }

    /**传输带移动 */
    public conveyerMoveTo(targetPos: cc.Vec2, callback: Function) {
        if (this.extCtrl) {
            GameModel.ins.Lock.lockFallPos(targetPos, this.pos, true);
            Common.safeSet2ArrayValue(GameModel.ins.CellList, this.pos, null);
            this.extCtrl.moveTo(targetPos, () => {
                this._moveOver(targetPos);
                callback && callback();
            });
        }
    }

    private _moveOver(targetPos) {
        GameModel.ins.Lock.unLockFallPos(targetPos);
        this.pos = targetPos;
    }

    public preDestory() {
        super.destory();
    }

    public destory(tType?: ElimateType) {
        this._isDeath = true;
        if (!this.isEmpty) {
            M.runtime.addCollectCount(this.type);
        }
        //发送插件事件,让插件自己决定是否做处理
        this.notifyPlugEvent();
        //通知绑定地面,元素消除!
        if (this.bindGModel && !this.isEmpty) {
            this.bindGModel.onMsg(MsgType.Elimate, { type: tType });
        }

        if (!this.isRocket) {
            //检测是否有除草机
            const havePowerCollect = GameModel.ins.CollectModel.updateCollectPowerCell(this);
            //检测完成回收!!! 
            if (!havePowerCollect && M.runtime.GameState != GameState.End) {
                GameModel.ins.updateCollectCount(this.type, this.getPosition(), tType);
            }
        }
        //解锁出生点 (这个时候解锁出生点,如果有正在掉落的新生元素,会导致重复掉落)
        // GameModel.ins.Lock.unLockBornPos(this.pos);

        if (GameModel.ins._isBorn(this.pos)) {
            GameModel.ins.checkNeedCreateNewCell(this.pos, this._destoryGroup);
        }

        GameModel.ins.removeDeathDict(this);
        //如果位置被炸弹锁住,要解锁吗? 会出问题吗? 
        if (Common.isBombType(this.getType())) {
            this.unlockCreateBombPos();
        }
        //销毁后是否要将他移出棋盘?????
        // Common.safeSet2ArrayValue(GameModel.ins.CellList, this.pos, null);
        this.type = CellType.Empty;

        //解除绑定的视图
        this.isDestoryed = true;
        //移出掉落
        GameModel.ins.removeFallDict(this);
        //通知掉落!
        this.notifyRoundFall();
        //回收入池
        GameModel.ins.freeCell(this);

        this._destoryGroup = null;
    }

    public forcedResetType(type: CellType) {
        this.type = type;
    }

    /**下落已经改变位置 */
    private isGridPosChanged(nextpos: cc.Vec2): boolean {
        if (this.fallDir.x != 0 && this.fallDir.y != 0) {
            return (nextpos.x != this.pos.x && nextpos.y != this.pos.y);
        } else {
            return (nextpos.x != this.pos.x || nextpos.y != this.pos.y);
        }
    }

    /**
     * 检测是否已经结束掉落!
     * @param nextCell 
     * @param nextPos 
     * @returns boolean 是否已经结束!
     */
    private isFallOver(nextPos: cc.Vec2): boolean {
        let result = false;
        //检测下个位置是否已经不动了!
        const nextCell = Common.safeGet2ArrayValue(GameModel.ins.CellList, nextPos);
        if (nextCell && !nextCell.isDeath && !nextCell.isEmpty && !nextCell.isFall) {
            result = true;
        } else if (GameModel.ins.isBorder(nextPos)) {
            //检测下个位置是否已经是边界了!
            result = true;
        } else if (!GameModel.ins.isPassable(nextPos, this.pos)) {
            //检测下个位置是否有障碍物
            result = true;
        }
        return result;
    }

    /**
     * 触发坐标改变!
     * @param pos 改变的目标坐标!
     * @returns next Cell
     */
    private triggerFallChangePos(pos: cc.Vec2): cc.Vec2 {
        //这边需要处理,如果前面元素还正在移动并没有出格,这时候进入新位置会导致前面元素游离
        pos = GameModel.ins.getNotPassblePoss(pos);

        const testCell = Common.safeGet2ArrayValue(GameModel.ins.CellList, pos);
        if (testCell) {
            if (!testCell.isDeath && !testCell.isEmpty) {
                return null;
            } else if (testCell.isEmpty && !GameModel.ins.isHavaSpe(pos)) {
                testCell.extCtrl && testCell.extCtrl.preDestory();
            }
        }
        //将原来的位置置空!
        if (Common.safeGet2ArrayValue(GameModel.ins.CellList, this.pos) == this) {
            Common.safeSet2ArrayValue(GameModel.ins.CellList, this.pos, null);
        }

        //解锁释放当前位置锁与出生锁
        if (GameModel.ins._isBorn(pos)) {
            GameModel.ins.Lock.unLockBornPos(pos);
            GameModel.ins.removeNewCreateCell(this);
        }
        GameModel.ins.Lock.unLockFallLockByKey(this.pos);

        //放入新的位置!
        this.pos = pos;

        //如果是结束的时候
        // if (M.runtime.GameState == GameState.End && this.pos.y >= GameModel.ins.CellList.length - 1) {
        //     this.extCtrl && this.extCtrl.playBombSingleDestoryEff();
        // }

        //判断直下是否可以掉落
        if (GameModel.ins.isCanFall(this.pos.add(cc.v2(0, 1)), this.pos)) {
            this.fallDir = cc.v2(0, 1);
        }

        //如果这时候是斜着走,需要判断是否可以斜着走  
        if (this.fallDir.x != 0 && !GameModel.ins.isCanDiagonallyFall(this.pos.add(this.fallDir), this)) {
            this.fallDir = cc.v2(0, 1);
        }

        let nextpos = GameModel.ins.getNotPassblePoss(this.pos.add(this.fallDir));
        return nextpos;
    }

    /**
     * 检测继续往下移动!
     * @return 如果会继续移动则 true 
     */
    public continue2Fall(isCreateBomb: boolean = false): boolean {
        let result = false;
        let dirs = [cc.v2(0, 1), cc.v2(-1, 1), cc.v2(1, 1)];
        //如果棋盘里没有这个位置.
        if (!Common.safeGet2ArrayValue(GameModel.ins.CellList, this.pos)) {
            dirs = [cc.v2(0, 1)];
        }
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            const targetPos = this.pos.add(dir);
            if (this.isNotFixed() &&
                !GameModel.ins.isBorder(targetPos) &&
                GameModel.ins.isCanFall(targetPos, this.pos, false, isCreateBomb)) {
                if (dir.x != 0 && !GameModel.ins.isCanDiagonallyFall(targetPos, this)) {
                    continue;
                }
                if (!this._destoryGroup) {
                    this.GroupId = GameModel.ins.seq.next();
                }
                GameModel.ins.addFallCell(this, dir, this._destoryGroup);
                this.notifyRoundFall();
                result = true;
                break;
            }
        }
        return result;
    }

    /**
     * 重置元素状态(停止移动)
     */
    private resetFallState() {
        this.speed = cc.v2(0, 0);
        // this.fallDir = cc.v2(0, 1);
        this.fallDes = null;
        //解开原先的锁,顺序不能错!!!!
        GameModel.ins.Lock.unLockFallLockByKey(this.pos);
        //开始检测是否需要继续斜着移动! 
        const isObl = this.continue2Fall();  //  this.obliqueMove();
        const isPor = this.execPortal();
        if (!isPor && !isObl) {
            this.onMsg(MsgType.FallEnd)
        }
    }

    private applySpeed(nextpos: cc.Vec2) {
        this.speed = cc.v2(0, 0);
        this.fallDes = Common.getPos(nextpos.x, nextpos.y);
        if (GameModel.ins.isCanFall(nextpos, this.pos)) {
            //施加速度!
            this.speed.x = this.speed.y = GapTime.FallingSpeed;//(M.runtime.GameState == GameState.End ? GapTime.EndFallingSpeed : GapTime.FallingSpeed);
        }
    }

    public updateFall(dt: number) {
        if (this.extCtrl) {
            this.extCtrl.orderlyUpdate(dt);
        }
    }

    public posDetection(position: cc.Vec3): boolean {
        let result = false;
        if (this._isFall && !this.isEmpty) {

            GameModel.ins.isFalling = true;

            const currpos = Common.convetPos(position.add(cc.v3(0, Common.GRID_H / 2)));

            let nextpos = this.pos.add(this.fallDir);
            if (this.isGridPosChanged(currpos)) {
                nextpos = this.triggerFallChangePos(currpos) || nextpos;
            } else {
                //如果下一个位置是个passble,就跳过这个passble寻找下一个位置!
                nextpos = GameModel.ins.getNotPassblePoss(nextpos);
            }

            this.applySpeed(nextpos);

            if (this.speed.equals(cc.v2(0, 0))) {
                this.extCtrl.playFallPauseAni();
            } else if (this.fallDir.x == 0) {
                M.runtime.GameState != GameState.End && this.extCtrl.playFallStartAni();
            }
            result = this.isFallOver(nextpos);
            if (result) {
                this.resetFallState();
            } else {
                //下面如果还有,给下面上锁!
                GameModel.ins.Lock.lockFallPos(nextpos, this.pos);
            }
        }
        return result;
    }

    public update(dt) {
        this.extCtrl && this.extCtrl.orderlyUpdate(dt);
    }
}   