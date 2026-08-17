import GroundCellModel from "../Model/GroundCellModel";
import BaseItemView from "./BaseItemView";
import M from "../../../Base/Manager/M";
import { NodePoolKey, CellType, GroundType } from "../../Data/Const/Constant";
import SpinePlayerCtrl from "../../../Base/CustomComponent/SpinePlayerCtrl";
import { Event } from "../../Data/Const/Event";
import { GapTime } from "../../Data/Const/TimeConfig";
import ResCtrl from "../ResCtrl";
import Common from "../../Common/Common";
import Tuituji from "./Comp/Tuituji";
import GameModel from "../Model/GameModel";


const { ccclass, property } = cc._decorator;
const ShuiCaoIdleAniName = ['shuicao_2', 'shuicao'];
const ShuiCaoHitAni = ['shuicao_hit2', 'shuicao_hit'];

@ccclass
export default class ItemGroundCtrl extends BaseItemView<GroundCellModel> {

    @property(cc.Sprite)
    elementSprite: cc.Sprite = null;

    @property(cc.Sprite)
    buriedSprite: cc.Sprite = null;

    @property(cc.Prefab)
    WallPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    tuitujiPrefab: cc.Prefab = null;

    @property(cc.SpriteFrame)
    LotusleafFrame: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    girlRoadFrame: cc.SpriteFrame = null;

    @property(cc.Prefab)
    Ivy: cc.Prefab = null;

    @property(cc.Prefab)
    exitPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    shanhuAni: cc.Prefab = null;

    private ivyCtrl: SpinePlayerCtrl = null;

    private showLv: number = -1;

    private _downLayer: cc.Node = null;

    private _tuitujiCtrl: Tuituji = null

    public complexViewNode: cc.Node = null


    onLoad() {

    }

    start() {

    }

    public init(model: GroundCellModel, downLayer?: cc.Node) {
        super.init(model);
        if (model) {
            this._downLayer = downLayer;
            this.cleanDisplay();
            this.buriedSprite.node.active = false;
            this.node.setPosition(model.getPosition());
            this.showPlug();
            this.showExit();
            this.showWall();
        }
    }

    public cleanDisplay() {
        this.elementSprite.node.scale = 1;
        this.elementSprite.node.angle = 0;
        this.elementSprite.node.active = false;
        this.elementSprite.node.destroyAllChildren();
    }


    //播放珊瑚动画，销毁"
    public PlayShanhuAnim() {

        if ((this.model.getType() == GroundType.Mushroom)) {
            //cc.log("播放珊瑚动画");

            const node = M.nodePool.getItem(NodePoolKey.ShanhuAnim, this.shanhuAni);
            var _animation = node.getComponent(cc.Animation);
            node.parent = this.elementSprite.node;
            //node.setPosition(0, 0);
            _animation.play("shanhuFX");

            //回收
            const a1 = cc.delayTime(1.2);
            var a2 = cc.callFunc(() => {
                M.nodePool.freeItem(NodePoolKey.ShanhuAnim, node);
            });

            node.runAction(cc.sequence(a1, a2));
        }

    }

    public updateView() {
        if (this.showLv != this.model.getLv()) {
            switch (this.model.getType()) {
                case GroundType.Water:
                    break;
                case GroundType.Leaves:
                    this.showLeaves();
                    break;
                case GroundType.Ivy:
                    this.showIvy();
                    break;
                case GroundType.Flower:
                    this.showFlower();
                    break;
                case GroundType.Firefly:
                    this.showFirefly();
                    break;
                case GroundType.Tuituji:
                    this.showTuituji();
                    break;
                case GroundType.Mushroom:
                    this.showMushroom();
                    break;
                case GroundType.None:
                    this.elementSprite.node.active = false;
                    break;
            }
        }
    }

    public showExit() {
        if (this.model.isExit) {
            const exitNode = M.nodePool.createItem(this.exitPrefab);
            exitNode.parent = this.node;
        }
    }

    public showPlug() {
        if (this.model.isGirlRoad) {
            this.node['baseSprite'].spriteFrame = this.girlRoadFrame;
        } else if (this.model.isConveyer) {
            this.addLotusleaf();
        }
    }

    public updateTuitujiPower() {
        if (this._tuitujiCtrl) {
            this._tuitujiCtrl.collectItem();
        }
    }

    public hideMushroom() {
        //播放动画咯!
        this.cleanDisplay();
        // cc.log("播放珊瑚动画，销毁");
    }

    private showMushroom() {
        this.elementSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        this.elementSprite.node.active = true;
        this.elementSprite.spriteFrame = ResCtrl.ins.getMushroomFrame(this.model.getLv());
        this.elementSprite.node.setScale(90 / this.elementSprite.node.width);
        this.showLv = this.model.getLv();

        if (this.model.getLv() == 0) {
            this.PlayShanhuAnim();
        }
    }

    private showTuituji() {
        this.elementSprite.node.active = true;
        const node = cc.instantiate(this.tuitujiPrefab);
        node.parent = this.elementSprite.node;
        this._tuitujiCtrl = node.getComponent(Tuituji)
        this._tuitujiCtrl.init(this.model.tuitujiCfg);
        this.showLv = this.model.getLv();
    }

    private showFirefly() {
        this.elementSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        this.elementSprite.node.active = true;
        this.elementSprite.spriteFrame = ResCtrl.ins.getFirefly(this.model.getLv() - 1);
        this.elementSprite.node.setScale(86 / this.elementSprite.node.width);
        this.showLv = this.model.getLv();
    }

    private showFlower() {
        this.elementSprite.sizeMode = cc.Sprite.SizeMode.TRIMMED;
        this.elementSprite.node.active = true;
        this.elementSprite.spriteFrame = ResCtrl.ins.getFlowerFrame(this.model.getLv() - 1);
        this.showLv = this.model.getLv();
        if (this.showLv <= 0) {
            M.event.send(Event.GameCMD.ChangeCell, CellType.Flower, 4, false);
            this.model.setLv(this.model.gridData.flowers);
        }
    }

    private showWall() {
        if (this.model && this.model.Wall) {
            for (const key in this.model.Wall) {
                const angle = this.model.Wall[key]
                if (angle != undefined) {
                    const wn = cc.instantiate(this.WallPrefab);
                    wn.parent = this.node;
                    wn.angle = angle;
                    let gap = angle < 90 ? 7 : -7;
                    if (Math.abs(angle) / 90 == 1) {
                        wn.x += gap;
                    } else {
                        wn.y += gap;
                    }
                }
            }
        }
    }

    private showIvy() {
        if (!this.ivyCtrl) {
            this.elementSprite.node.active = true;
            const node = M.nodePool.getItem(NodePoolKey.ShuiCao, this.Ivy);
            this.ivyCtrl = node.getComponent(SpinePlayerCtrl);
            if (this.model.zIndex == -1) {
                node.parent = this._downLayer
                node.zIndex = 3;
                node.setPosition(this.model.getPosition());
            } else {
                node.parent = this.elementSprite.node;
                node.setPosition(0, 0);
            }
            this.ivyCtrl.play(ShuiCaoIdleAniName[this.model.getLv() - 1], 0, true);
            node.y -= Common.GRID_H / 2 - 10;
        } else {
            this.ivyCtrl.play(ShuiCaoHitAni[this.showLv - 1], 0, false, () => {
                if (this.model.getLv() != 0) {
                    this.ivyCtrl.play(ShuiCaoIdleAniName[this.model.getLv() - 1], 0, true);
                } else {
                    M.nodePool.freeItem(NodePoolKey.ShuiCao, this.ivyCtrl.node);
                }
            });
        }
        this.showLv = this.model.getLv();
    }

    public addBorder(border: cc.Node) {
        this.elementSprite.node.active = true;
        border.parent = this.elementSprite.node;
    }

    public cleanOtherDisplay() {
        this.buriedSprite.spriteFrame = null;
        this.buriedSprite.node.active = false;
    }

    private addLotusleaf() {
        this.elementSprite.node.active = true;
        const node = cc.instantiate(this.elementSprite.node);
        node.name = 'Lotusleaf';
        node.parent = this.elementSprite.node;
        node.getComponent(cc.Sprite).spriteFrame = this.LotusleafFrame;
    }

    /**有可能是性能热点.....待优化.. */
    public playAnimation(): Promise<any> {
        return new Promise((resolve) => {
            const score = Common.getSpecialAddScoreByType(this.model.getType());
            const wpos = Common.convertCurWorldPos(this.model.getPosition());
            M.event.send(Event.Effect.Broken, wpos, null, this.model.getType());
            if (score) {
                M.event.send(Event.UI.AddScore, score, wpos)
            }
            this.scheduleOnce(resolve, GapTime.DelayChangeBroken);
        });
    }

    private showLeaves() {
        this.elementSprite.node.active = true;
        this.elementSprite.spriteFrame = ResCtrl.ins.getLeavesFrame(this.model.getLv() - 1);
        this.showLv = this.model.getLv();
    }

    update(dt) {
        if (this.model) {
            this.updateView();
        }
    }
}
