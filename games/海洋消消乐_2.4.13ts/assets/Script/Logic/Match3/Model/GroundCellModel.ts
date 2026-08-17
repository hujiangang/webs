import { Grid, ILawnmower } from "../../Data/Interface/Level/ILevel";
import { CellBase, MsgType } from "./CellBase";
import { CellModel } from "./CellModel";
import Common from "../../Common/Common";
import GameModel from "./GameModel";
import ItemGroundCtrl from "../View/ItemGroundCtrl";
import { CollectType } from "./CollectModel";
import Conveyer from "./SpecialPlug/Conveyer";
import { ElimateType, GroundType, CellType } from '../../Data/Const/Constant';
import Mushroom from "./SpecialPlug/Mushroom";

/** */
export default class GroundCellModel extends CellBase<GroundType, ItemGroundCtrl> {

    /**隔断 */
    private wall: { left: number, right: number, top: number, bottom: number } = null;
    /**强占不可生成元素 */
    private _isHold: boolean = false;
    /**是否占有老头子部分 */
    private _isGnome: boolean = false;
    /**是否是乌龟占有的部分 */
    private _isTurtles: boolean = false;
    /**是否正在销毁中 */
    private _isDestorying: boolean = false;
    /**-1为入口 1为出口 0为没有*/
    public portalIdx: number = 0;
    /**宝石的等级 */
    public gemLv: number = 0;

    public tuitujiCfg: ILawnmower = null;

    public BindCell: CellModel = null;

    public isGirlRoad: boolean = false;
    public isConveyer: boolean = false;


    public zIndex: number = 0;

    constructor(data: any, pos: cc.Vec2, index: number) {
        super();
        this.mapIndex = index;
        this._pos = pos;
        //初始处于不可动状态.如果有东西存在则重置此属性.
        this._isHold = true;
        this.BindCell = null;
        this.type = GroundType.None;
        this.ctrlName = 'ItemGroundCtrl';
        this.init(data);
    }

    public showGirlGround() {
        this.isGirlRoad = true;
    }

    public onUnBind(pos: cc.Vec2) {
        this.BindCell && this.BindCell.unBindGround(this);
    }

    public onBind(model: CellModel) {
        this.BindCell = model;
    }

    public init(data: Grid) {
        if (!data) {
            this.type = null;
            return;
        }
        this._isHold = false;
        this._isGnome = false;
        this._isTurtles = false;
        this._isDestorying = false;
        this.zIndex = 0;

        this.data = data;

        /**树叶 */
        if (data.leaves) {
            this.type = GroundType.Leaves;
            this.lv = data.leaves;
        }

        /**是否是不可移动的水 , 同时需要检测是否有传送荷叶!*/
        if (data.water) {
            this.type = GroundType.Water;
            this._isHold = true;
            const plug = GameModel.ins.getPlug(Conveyer);
            if (plug && plug.checkIsConveyerItemForPos(this.pos)) {
                this.isConveyer = true;
                this._isHold = false;
            }
        }

        // if (data.ground) {
        //     this.gemLv = data.gem || 0;
        //     this._isHold = true;
        //     this.lv = data.ground;
        //     this.type = GroundType.Ground;
        // }

        /**wall */
        this.setWall(data);

        if (data.flowers) {
            this._isHold = true;
            this.lv = data.flowers;
            GameModel.ins.HaveFlowers = true;
            this.type = GroundType.Flower;
        }
        /**萤火虫 */
        if (data.firefly) {
            this._isHold = true;
            this.lv = data.firefly;
            this.type = GroundType.Firefly;
        }

        /**会长的滕 */
        if (data.ivy) {
            this.type = GroundType.Ivy;
            this.lv = data.ivy;
            this._isHold = true;
        }

        /**蘑菇 */
        if (data.mushroom) {
            this.type = GroundType.Mushroom;
            this.lv = data.mushroom;
            this._isHold = true;

            let mrPlug = GameModel.ins.getPlug(Mushroom);
            if (!mrPlug) {
                mrPlug = GameModel.ins.mountPlug(Mushroom);
            };
            mrPlug.add(this.pos, this);
        }

        if (data.portal_idx) {
            this.portalIdx = data.portal_idx;
        }

        if (this.isPassable) {
            // this.type = null;
        }
    }

    public initMonkeyTreePos() {
        this.type = GroundType.MoneyTree;
        this.accountForPos();
    }

    public initCrab(index: number) {
        this.type = GroundType.Crab;
        this.zIndex = index;
        this.accountForPos();
    }

    public initTurtles(topPoint: cc.Vec2) {
        this.type = GroundType.Ivy;
        this.lv = 2;
        this.zIndex = 0;
        this._isTurtles = true;
        this.accountForPos();

        if (this._pos.y == topPoint.y) {
            this.zIndex = -1;
        }
    }

    public change2TargetType(type: GroundType, cfg: any) {
        this.type = type;
        if (GroundType.Tuituji || GroundType.Firefly || GroundType.Flower) {
            this.BindCell && this.BindCell.change2Cell(CellType.Empty);
            this.accountForPos();
        }
        if (cfg) {
            switch (type) {
                case GroundType.Flower:
                case GroundType.Firefly:
                    if (cfg && typeof cfg.lv == 'number') {
                        this.lv = cfg.lv;
                    }
                    break;
                case GroundType.Tuituji:
                    this.tuitujiCfg = cfg;
                    break;
            }
        }
    }

    public accountForPos() {
        this._isHold = true;
    }

    public freeThisPos() {
        this._isHold = false;
    }

    public onMsg(type: MsgType, data?: any) {
        const eliamteType = data ? data.type : null;

        switch (type) {
            case MsgType.Elimate:
                this.execElimate(eliamteType);
                break;
            case MsgType.BesideElimate:
                if (this.type == GroundType.Firefly || this.type == GroundType.Ivy || this.type == GroundType.Flower || this.type == GroundType.Mushroom) {
                    this.execElimate(eliamteType);
                }
                break;
            case MsgType.UpGroundDone:
                this.checkCoverItem();
                break;

        }
    }

    public execElimateAll() {
        if (this.getType() != null) {
            this._updateCollectItemCount();
            this.cleanGround(true);
        }
    }

    //位置发生改变
    public onChangePos(pos: cc.Vec2) {
        Common.safeSet2ArrayValue(GameModel.ins.GroundList, pos, this);
    }

    public get Wall() {
        return this.wall;
    }

    public get isGem(): boolean {
        return this.gemLv > 0;
    }

    /**是否是出生元素点 */
    public get isBorn(): boolean {
        return this.data ? this.data.born : false;
    }

    /**是否下落点 */
    public get isExit(): boolean {
        return this.data ? this.data.exit : false;
    }

    /**障碍物地块是否可以通过 */
    public get isPassable(): boolean {
        return this.data ? this.data.passable : false;
    }

    public get isCanCreateCell(): boolean {
        let result = !this._isHold;
        if (this.type == GroundType.Flower ||
            this.type == GroundType.Ivy ||
            this.type == GroundType.Firefly ||
            this.type == GroundType.Mushroom
            /*|| this.type == GroundType.Ground*/) {
            result = true;
        }
        return result;
    }

    public get isHold(): boolean {
        return this._isHold;
    }

    public set isGnome(opt: boolean) {
        this._isGnome = opt;
    }

    public get isTurtles(): boolean {
        return this._isTurtles;
    }

    public get isGnome() {
        return this._isGnome;
    }

    public isPortalOut(): number {
        if (this.portalIdx > 0) {
            return this.portalIdx;
        }
        return 0;
    }

    public isPortalIn(): number {
        if (this.portalIdx < 0) {
            return this.portalIdx;
        }
        return 0;
    }

    /**
     * 检测该方向是否有墙存在
     * @param dir  left, right, top, bottom
     */
    public checkWall(dir: string): boolean {
        let result = false;
        if (this.wall && this.wall[dir] != undefined) {
            result = true;
        }
        return result;
    }

    public cleanGround(isPlayAnimation: boolean = false) {
        if (this.type != GroundType.None && this.type != GroundType.Water) {
            this.type = GroundType.None;
            this.lv = 0;
            this._isHold = false;
            isPlayAnimation && this.extCtrl.playAnimation();
        }
    }

    private setWall(data: Grid) {
        const dirDatas = { left: 90, right: -90, top: 0, bottom: 180 };
        for (const key in dirDatas) {
            if (data[`wall_${key}`]) {
                if (!this.wall) this.wall = <any>{};
                this.wall[key] = dirDatas[key];
            }
        }
    }

    private lvOverTrigger(type: ElimateType) {
        switch (this.type) {
            case GroundType.Firefly:
                this.cleanGround();
                const groupId = GameModel.ins.seq.next();
                if (this.isBorn) {
                    GameModel.ins.checkNeedCreateNewCell(this.pos, groupId);
                } else {
                    GameModel.ins.testFindCanFallCell(this.pos, groupId);
                }
                break;

            case GroundType.Mushroom:
                GameModel.ins.getPlug(Mushroom).del(this.pos);
                break;

            // case GroundType.Ground:
            //     if (this.gemLv > 0) {
            //         GameModel.ins.updateCollectCount(CollectType.gem, this.getPosition(), type, this.gemLv);
            //     }
            //     this.cleanGround();
            //     GameModel.ins.testFindCanFallCell(this.pos);
            //     M.event.send(Event.GameCMD.UpdateComplexView, this.pos);
            //     break;
        }
    }

    private checkCoverItem() {
        const mg = GameModel.ins.getMgModel();
        if (this.getType() == GroundType.Crab) {
            const type = CollectType.crab;
            const idx = mg.updateItemCountByPos(type, this.pos) as any;
            if (mg.checkItemOver(type, idx)) {
                GameModel.ins.updateCollectCount(type, idx);
            }
        }
    }

    /**如果消除的地有人头,则返回人头下标 */
    private async execElimate(eType: ElimateType = ElimateType.Default) {
        let idx = null;
        let type = null;
        if (this.getType() >= GroundType.Leaves && this.lv > 0 && !this._isDestorying) {
            this._isDestorying = true;
            //前摇
            await this.extCtrl.playAnimation();
            this._isDestorying = false;
            this.setLv(-1);
            if (this.type == GroundType.Firefly) {
                GameModel.ins.updateCollectCount(CollectType.firefly, this.getPosition());
            }
            if (this.lv == 0) {
                this.extCtrl.cleanOtherDisplay();
                this.lvOverTrigger(eType);
            }
        }
        this._updateCollectItemCount();
    }

    private _updateCollectItemCount() {
        const types = [CollectType.turtles, CollectType.gnome];
        const opt = { [CollectType.turtles]: this.isTurtles, [CollectType.gnome]: this.isGnome }
        types.forEach(type => {
            let idx = null;
            const mg = GameModel.ins.getMgModel();
            if (opt[type] && this.lv <= 0) {
                idx = mg.updateItemCountByPos(type, this.pos);
            }
            if (mg.checkItemOver(type, idx)) {
                GameModel.ins.updateCollectCount(type, idx);
            }
        })
    }

}