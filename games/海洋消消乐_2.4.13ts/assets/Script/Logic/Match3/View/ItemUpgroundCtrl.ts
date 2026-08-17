import UpGroundCellModel from "../Model/UpGroundCellModel";
import SpecialCell from "../Model/SpecialCell";
import BaseItemView from "./BaseItemView";
import M from "../../../Base/Manager/M";
import { Event } from "../../Data/Const/Event";
import Common from "../../Common/Common";
import { GapTime } from "../../Data/Const/TimeConfig";
import SpinePlayerCtrl from "../../../Base/CustomComponent/SpinePlayerCtrl";
import { UpGroundType } from "../../Data/Const/Constant";
import ResCtrl from "../ResCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemUpgroundCtrl extends BaseItemView<UpGroundCellModel> {

    @property(cc.Sprite)
    ice: cc.Sprite = null;

    @property(cc.Sprite)
    lock: cc.Sprite = null;

    @property(cc.Sprite)
    box: cc.Sprite = null;

    @property(cc.Node)
    portal: cc.Node = null;

    @property(cc.Prefab)
    portalPrefab: cc.Prefab = null;

    @property([cc.Prefab])
    novicePrefab: cc.Prefab[] = [];

    private n_conchItem: { node: cc.Node, ctrl: SpinePlayerCtrl } = null;
    private n_grassItem: { node: cc.Node, ctrl: SpinePlayerCtrl } = null;

    private curShowType: UpGroundType = -1;
    private curShowLv: number = -1;

    onLoad() {

    }

    start() {

    }

    onDestroy() {
        this.unscheduleAllCallbacks();
        // M.event.unRegister(Event.Model.CheckGameOver, this.execNov, this);
    }

    private registerEvent() {
        // if (this.model && this.model.isNov) {
        // M.event.register(Event.Model.CheckGameOver, this.execNov, this);
        // }
    }

    public init(model: UpGroundCellModel) {
        super.init(model);
        if (model) {
            if (model.isHavaSpe) {
                this.node.scale = 1;
                this.node.angle = 0;
                //初始化所有特殊元素显示
                const specials = model.getSpecials();
                specials.forEach((spe: SpecialCell) => {
                    this.showItem(spe.type, spe.lv);
                });
            }
            // this.syncPortal();
            this.node.setPosition(model.getPosition());
        }
        this.registerEvent();
    }

    private setBox(lv: number) {
        this.setFrame(this.box, ResCtrl.ins.getBoxFrame(lv - 1, this.model.boxType));
    }

    private setStone(lv: number) {
        this.box.sizeMode = cc.Sprite.SizeMode.TRIMMED;
        this.setFrame(this.box, ResCtrl.ins.getStoneFrame(lv - 1));
    }

    private setIce(lv: number) {
        this.setFrame(this.ice, ResCtrl.ins.getIceFrame(lv - 1));
    }

    private setLock(lv: number) {
        this.setFrame(this.lock, ResCtrl.ins.getLockFrame(lv - 1));
    }


    private setFrame(target: cc.Sprite, frame: cc.SpriteFrame) {
        if (!target) return;
        // target.node.scale = 1;
        target.node.setScale(90 / target.node.width);
        target.node.setPosition(0, 0);
        target.node.setAnchorPoint(cc.v2(0.5, 0.5))
        if (frame) {
            target.node.active = true;
            target.spriteFrame = frame
        } else {
            target.node.active = false;
        }
    }

    private syncShowData() {
        this.curShowLv = this.model.getLv();
        this.curShowType = this.model.getType();
    }

    private showItem(type: UpGroundType, lv: number) {
        switch (type) {
            case UpGroundType.Box:
                this.setBox(lv);
                break;
            case UpGroundType.Ice:
                this.setIce(lv);
                break;
            case UpGroundType.Lock:
                this.setLock(lv);
                break;
            case UpGroundType.Stone:
                this.setStone(lv);
                break;
            case UpGroundType.Nov_grass:
                this.showCloseGrass(type);
                break;
            case UpGroundType.Nov_conch:
                this.showConchNov(type);
                break;
            case UpGroundType.None:
                const names = [, 'box', 'lock', 'ice'];
                this.setFrame(this[names[this.curShowType]], null);
                break
        }
        this.syncShowData();
    }

    public hideConchNov() {
        this.box.node.destroyAllChildren();
        this.box.spriteFrame = null;
    }

    private showCloseGrass(type) {
        this.n_grassItem = Common.createSpineNode(this.box.node, this.novicePrefab[type - 100]);
    }

    private showConchNov(type) {
        // if (this.model.getLv() > 0) {
        //     this.n_conchItem = Common.createSpineNode(this.box.node, this.novicePrefab[type - 100]);
        //     this.box.node.scale = 1.85;
        //     this.box.node.setAnchorPoint(cc.v2(0, 0));
        //     this.box.node.setPosition(this.box.node.position.add(cc.v3(Common.GRID_W / 2, Common.GRID_H / 2)));
        //     this.n_conchItem.node.color = cc.Color.GRAY;
        //     this.scheduleOnce(() => {
        //         this.n_conchItem.ctrl.play('beike_xiuxian_heibai', 0, true);
        //     }, 0);
        //     this.scheduleOnce(() => {
        //         const rect = this.box.node.getBoundingBoxToWorld();
        //         GameModel.ins.CollectPos = cc.v2(rect.x + 84, rect.y + 84);
        //     }, 1);
        // }
    }

    private updateShowSp() {
        if (this.curShowType != this.model.getType() || this.curShowLv != this.model.getLv()) {
            if (this.curShowType != this.model.getType()) {
                this.box.node.active = false;
                this.ice.node.active = false;
                this.lock.node.active = false;
            }
            this.showItem(this.model.getType(), this.model.getLv());
        }
    }

    private updateBindCellPos() {
        // 这里如果有传送阵或者其他的上层障碍物...会被冰块带着跑路.
        if (this.model.isFollowNode && this.model.BindCell && this.model.BindCell.extData) {
            this.node.setPosition(this.model.BindCell.extData.getPosition());
        }
    }

    /**有可能是性能热点.....待优化.. */
    public playAnimation(type: UpGroundType): Promise<any> {
        return new Promise((resolve) => {
            if (this.model && this.model.isHavaSpe) {
                //执行动画!   
                const worldPos = Common.convertCurWorldPos(this.model.getPosition());
                let name = null;
                if (type == UpGroundType.Box) {
                    if (this.model.getType() != 0) {
                        name = `box${this.model.getLv()}to${this.model.getLv() - 1}`
                    }
                    resolve();
                } else {
                    this.scheduleOnce(resolve, GapTime.DelayChangeBroken);
                }
                M.event.send(Event.Effect.Broken, worldPos, null, type, name);
                const score = Common.getSpecialAddScoreByType(this.model.getType())
                if (score) {
                    M.event.send(Event.UI.AddScore, score, worldPos);
                }
            } else {
                resolve(true)
            }
        })
    }

    // private execNov(callback) {
    //     if (this.model) {
    //         if (this.model.getType() == UpGroundType.Nov_grass) {
    //             if (this.n_grassItem) {
    //                 this.n_grassItem.node.runAction(cc.fadeOut(1));
    //                 this.scheduleOnce(() => {
    //                     this.playAnimation().then(() => {
    //                         this.model.forcedElimateNov();
    //                         callback();
    //                     });
    //                 }, 1)
    //             }
    //         } else if (this.model.getType() == UpGroundType.Nov_conch) {
    //             if (this.n_conchItem) {
    //                 const a0 = cc.delayTime(0.3);
    //                 const a1 = cc.tintTo(0.5, 255, 255, 255);
    //                 const a2 = cc.callFunc(() => {
    //                     const b0 = cc.scaleTo(0.3, 1);
    //                     const b1 = cc.fadeOut(0.3);
    //                     const b2 = cc.callFunc(() => {
    //                         const bombCell = GameModel.ins.createCell({ cfg: { type: CellType.Bomb1 }, pos: this.model.pos, createType: CreateType.Nov });
    //                         bombCell.isExecBomb = true;
    //                         bombCell.extData.setPosition(bombCell.extData.position.add(cc.v3(Common.GRID_W / 2, Common.GRID_H / 2)))
    //                         this.hideConchNov();
    //                     }, this)
    //                     const b3 = cc.delayTime(GapTime.BeikeDelaySuction);
    //                     const b4 = cc.callFunc(() => {
    //                         callback();
    //                     })
    //                     this.box.node.runAction(cc.sequence(cc.spawn(b0, b1), b2, b3, b4));
    //                 })
    //                 this.n_conchItem.node.runAction(cc.sequence(a0, a1, a2));
    //             }
    //         } else {
    //             callback();
    //         }
    //     }
    // }

    update(dt) {
        if (this.model) {
            this.updateShowSp();
            this.updateBindCellPos();
        }
    }
}
