import { ILawnmower } from "../../../Data/Interface/Level/ILevel";
import GameModel from "../../Model/GameModel";
import { CellModel } from "../../Model/CellModel";
import GroupAnimatCtrl from "../../../Common/GroupAnimatCtrl";
import { ElimateType } from "../../../Data/Const/Constant";

const { ccclass, property } = cc._decorator;

const Dirs = { 0: cc.v2(1, 0), 90: cc.v2(0, 1), 180: cc.v2(-1, 0), 270: cc.v2(0, -1) };
const Speed = 2.5;

@ccclass
export default class Tuituji extends cc.Component {

    @property(cc.ProgressBar)
    prog: cc.ProgressBar = null;

    @property(cc.Sprite)
    body: cc.Sprite = null;

    @property([cc.SpriteFrame])
    bodyFrames: cc.SpriteFrame[] = [];

    private _cfg: ILawnmower = null;
    private _dir: cc.Vec2 = null;
    private _count = 0;

    private _uiNode: cc.Node = null;

    onLoad() {

    }

    public init(cfg: ILawnmower) {
        this._cfg = cfg;
        this._count = 0;
        this._dir = Dirs[this._cfg.degree];
        this.node.angle = (cfg.degree - 90);
        this.prog.node.angle = -this.node.angle;
        this.body.spriteFrame = this.bodyFrames[this._cfg.type];
        this._updateProgress();
    }

    private _updateProgress() {
        this.prog.progress = this._count / this._cfg.count;
        if (this._count >= this._cfg.count) {
            this._exec();
        }
    }

    private _exec() {
        console.error('收集完成,开始执行->');
        // this.prog.node.active = false;
        const groundCell = GameModel.ins.CollectModel.collectPowerCells[`${this._cfg.type}`];
        groundCell.freeThisPos();
        //改变元素的层级!

        delete GameModel.ins.CollectModel.collectPowerCells[`${this._cfg.type}`];
        //往一个方向一直跑!
        this._runMove();
    }

    private _runMove() {
        //确定方向! 
        if (this._dir) {
            const a0 = cc.delayTime(0.3);
            const a1 = cc.callFunc(() => {
                this._elimate();
            });
            const a2 = cc.moveTo(Speed, cc.v2(this._dir.x * 2000, this._dir.y * 2000));
            const a3 = cc.callFunc(() => {
                this.node.destroy()
            });
            this.node.runAction(cc.sequence(a0, a1, a2, a3));
        }
    }

    private _elimate() {
        const pos = cc.v2(this._cfg.x, this._cfg.y)
        const timeLine = GroupAnimatCtrl.ins.createTimeLine();
        if (this._dir.x != 0) {
            //拿横的
            for (let i = 0; i < GameModel.GridSize.W; i++) {
                timeLine.add(gsap.TweenLite.delayedCall(0.1, (p) => {
                    GameModel.ins.execElimateOneAtAll(p, ElimateType.Tuituji, this._cfg.type);
                }, [pos.add(this._dir.scale(cc.v2(i, 0)))]));
            }
        } else if (this._dir.y != 0) {
            //拿竖的
            for (let i = 0; i < GameModel.GridSize.H; i++) {
                timeLine.add(gsap.TweenLite.delayedCall(0.1, (p) => {
                    GameModel.ins.execElimateOneAtAll(p, ElimateType.Tuituji, this._cfg.type);
                }, [pos.add(this._dir.scale(cc.v2(0, -i)))]));
            }
        }
    }

    public collectItem() {
        this._count++;
        this._updateProgress();
    }
}
