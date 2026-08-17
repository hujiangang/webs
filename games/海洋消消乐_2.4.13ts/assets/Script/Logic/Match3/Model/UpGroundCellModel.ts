
import { Grid } from "../../Data/Interface/Level/ILevel";
import { CellBase, MsgType } from "./CellBase";
import SpecialCell from "./SpecialCell";
import { CellModel } from "./CellModel";
import Common from "../../Common/Common";
import GameModel from "./GameModel";
import ItemUpgroundCtrl from "../View/ItemUpgroundCtrl";
import { CollectType } from "./CollectModel";
import M from "../../../Base/Manager/M";
import { UpGroundType } from "../../Data/Const/Constant";
/** */
export default class UpGroundCellModel extends CellBase<UpGroundType, ItemUpgroundCtrl> {

    private specials: Array<SpecialCell> = null;
    /**障碍物,可以消除那一类 */
    private isObstacles: boolean = false;
    private _isBox: boolean = false;
    private _boxType: number = null;
    private isFollowBindNode: boolean = false;

    //-1为入口 1为出口 0为没有
    public portalIdx: number = 0;

    public BindCell: CellModel = null;

    public isNov: boolean = false;

    /**完整的元素! 适用于石头等如果是完整状态需要被炸弹炸烂 */
    public isIntact: boolean = true;

    public isElimateing: boolean = false;

    private _groupId: number = null;

    constructor() {
        super();
        this.isObstacles = false;
        this.type = UpGroundType.None;
        this.ctrlName = 'ItemUpgroundCtrl';
    }

    public init(data: Grid, x?: number, y?: number, index?: number) {
        this._pos = cc.v2(x, y);
        if (!data) {
            this.type = UpGroundType.None;
            return;
        }
        this.mapIndex = index;
        this.data = data;
        this.specials = [];
        this.BindCell = null;
        this._boxType = null;
        this._groupId = null;
        //待重构
        /**引导用的水草 */
        if (data.nov_grass) {
            this.isNov = true;
            this.specials.push(new SpecialCell(UpGroundType.Nov_grass, data.nov_grass));
        }

        /**引导用的爆炸贝壳 */
        if (data.nov_conch) {
            this.isNov = true;
            this.isObstacles = true;
            this.specials.push(new SpecialCell(UpGroundType.Nov_conch, data.nov_conch));
        }

        /**冰块 */
        if (data.ice) {
            this.specials.push(new SpecialCell(UpGroundType.Ice, data.ice));
        }

        /**锁链 */
        if (data.locks) {

            this.specials.push(new SpecialCell(UpGroundType.Lock, data.locks));
        }

        /**箱子 */
        if (data.box_level) {
            this.specials.push(new SpecialCell(UpGroundType.Box, data.box_level));
            this.isObstacles = true;
            this._isBox = true;
            this._boxType = (data.box_type != null && data.box_type != undefined) ? data.box_type : null;
        }

        /**石头 */
        if (data.stone) {
            this.specials.push(new SpecialCell(UpGroundType.Stone, /*data.stone*/2));
            this.isObstacles = true;
        }

        /**会长的滕 ??*/
        if (data.ivy) {

        }

        if (data.portal_idx) {
            this.portalIdx = data.portal_idx;
        }

        const curSp = this.getCurrentSpecial()
        if (curSp) {
            this.type = curSp.type;
            this.lv = curSp.lv;
        }

        if (this.isNov) {
            GameModel.ins.isNovLv = true;
        }
    }

    public forcedElimateNov() {
        this.isNov = false;
        this.isObstacles = false;
        this.isFollowBindNode = false;
        this.specials.length = 0;
        this.type = UpGroundType.None;
        this.BindCell.onMsg(MsgType.Bomb);
    }

    public getNovWaringTitle(): string {
        let result = '';
        const cfg = M.table.Titles.getByPrimaryKey(M.runtime.getMatch3Level());
        if (cfg && cfg.novContent) {
            result = cfg.novContent;
        }
        return result;
    }

    public isCanFall(): boolean {
        let result = true;
        switch (this.type) {
            case UpGroundType.Lock:
            case UpGroundType.Box:
            case UpGroundType.Stone:
            case UpGroundType.Nov_grass:
                result = false;
                break
            case UpGroundType.Ice:
                break
        }
        return result;
    }

    public onMsg(type: MsgType, data?: any) {
        //有覆盖物 
        this._groupId = data ? data.groupId : null;
        switch (type) {
            case MsgType.Elimate:
                if (UpGroundType.Stone == this.type && Common.isBombType(data.type)) {
                    //破碎石头!
                    this.isIntact = false;
                }
                this.execElimate();
                break;
            case MsgType.BesideElimate:
                this.besideElimate(data.cell);
                break;
            case MsgType.ElimateAll:
                this.execElimateAll();
                break;
        }
    }

    //位置发生改变
    public onChangePos(pos: cc.Vec2) {
        //置空之前的空位
        Common.safeSet2ArrayValue(GameModel.ins.UpGroundList, this._pos, null);
        //重设当前的位置句柄
        Common.safeSet2ArrayValue(GameModel.ins.UpGroundList, pos, this);
    }

    public onUnBind(pos: cc.Vec2) {

    }

    public onBind(model: CellModel) {
        this.BindCell = model;
        this.changeSpecialPlug();
    }

    public besideElimate(cell: CellModel) {
        switch (this.type) {
            case UpGroundType.Box:
                if (this.isBox && (this.boxType == null || !cell || (cell.getType() == this.boxType))) {
                    this.execElimate();
                }
                break
            case UpGroundType.Stone:
                if (!this.isIntact) {
                    this.execElimate();
                }
                break
        }
    }

    private _elimateCount = 0;
    public execElimateAll(): number {
        this._elimateCount = 0;
        if (this.specials && this.specials.length > 0 && this.lv > 0) {
            this.lv = 0
            this.type = UpGroundType.None;
            this.specials.forEach((spe) => {
                this._elimateCount += spe.lv
                if (spe.type == UpGroundType.Box) {
                    this.updateCollect(UpGroundType.Box);
                }
            });
            this._isBox = false;
            this.specials.length = 0;
            this.isObstacles = false;
            this.isFollowBindNode = false;
            this.notifyOver(UpGroundType.Box);
        }
        this.extCtrl.playAnimation(this.type);
        return this._elimateCount;
    }

    private updateCollect(type: UpGroundType) {
        GameModel.ins.updateCollectCount(this.getCollectName(type, this._boxType), this.pos);
    }

    private async execElimate() {
        //这里有顺序 
        if (this.type != UpGroundType.None && !this.isElimateing && !this.isNov) {
            this.isElimateing = true;

            await this.extCtrl.playAnimation(this.type);

            //等待播放动画完成后才去做类型/等级操作
            if (!this.isHavaSpe) { return };

            this.lv = this.getCurrentSpecial().setLv(-1);

            if (this.lv <= 0) {
                let isNeedCheckElimate: boolean = this._checkNeedOverCheck();
                if (this.type == UpGroundType.Box) {
                    this._isBox = false;
                    this.updateCollect(null);
                }
                this.specials.splice(this.specials.length - 1, 1);
                let preType = this.type;
                const currentSp = this.getCurrentSpecial()
                if (currentSp) {
                    this.type = currentSp.type;
                    this.lv = currentSp.lv;
                    this.changeSpecialPlug();
                } else {
                    this.type = UpGroundType.None;
                }
                this.checkChangeObs(preType);
                if (isNeedCheckElimate) {
                    GameModel.ins.checkHavaElimate(this.pos);
                }
            }
            this.isElimateing = false;
        }
    }

    private _checkNeedOverCheck(): boolean {
        return (this.type == UpGroundType.Box || this.type == UpGroundType.Stone || this.type == UpGroundType.Ice)
    }

    private getCollectName(type: UpGroundType = null, boxType: number = null): string {
        let result: string = null;
        type = type || this.type;
        switch (type) {
            case UpGroundType.Box:
                if (boxType != null) {
                    result = CollectType.colorbox
                } else {
                    result = CollectType.box;
                }
                break;
            case UpGroundType.Stone:
                result = CollectType.stone;
                break
        }
        return result;
    }

    private changeSpecialPlug() {
        if (this.type == UpGroundType.Ice) {
            this.isFollowBindNode = true;
        }
    }

    private async checkChangeObs(preType: UpGroundType) {
        if (this.isHavaSpe) {
            let obs = false;
            for (let i = this.specials.length; i--;) {
                const type = this.specials[i].type;
                if (type == UpGroundType.Box || type == UpGroundType.Stone) {
                    obs = true;
                    break;
                }
            }
            this.isObstacles = obs;
        } else {
            this.isObstacles = false;
            this.isFollowBindNode = false;
            this.notifyOver(preType);
        }
    }

    private notifyOver(preType) {
        const ground = Common.safeGet2ArrayValue(GameModel.ins.GroundList, this.pos);
        ground && ground.onMsg(MsgType.UpGroundDone, preType);
        this.BindCell && this.BindCell.onMsg(MsgType.UpGroundDone, this._groupId/* preType == UpGroundType.Box*/);
    }

    public clear() {
        this.specials = [];
    }

    public get isFollowNode(): boolean {
        return this.isFollowBindNode;
    }

    public get boxType() {
        return this._boxType;
    }

    public get isBox(): boolean {
        return this._isBox;
    }

    /**是否是不会参与消除的障碍物 */
    public get isObs(): boolean {
        return this.isObstacles;
    }

    public get isHavaSpe(): boolean {
        return (this.specials && this.specials.length > 0);
    }

    public getSpecials(): Array<SpecialCell> {
        return this.specials;
    }

    /**获取最顶层的多功能道具 */
    public getCurrentSpecial(): SpecialCell {
        return this.specials[this.specials.length - 1];
    }
}