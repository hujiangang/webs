import { CellType } from "../Data/Const/Constant";
import RuntimeMgr from "../Data/RuntimeMgr";
import Common from "../Common/Common";
import GameModel from "./Model/GameModel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResCtrl extends cc.Component {

    /**炸弹背后闪烁的背景方框 */
    @property([cc.SpriteFrame])
    BombFlashingBg: cc.SpriteFrame[] = [];
    /**炸弹的单张图 */
    @property([cc.SpriteFrame])
    BombStaticFrame: cc.SpriteFrame[] = [];
    /**普通元素的图 */
    @property([cc.SpriteFrame])
    NormalCellFrame: cc.SpriteFrame[] = [];
    /**珍珠的单图 */
    @property(cc.SpriteFrame)
    pearlFrame: cc.SpriteFrame = null;
    /**森林地图的元素图 */
    @property([cc.SpriteFrame])
    Map2NormalCellFrame: cc.SpriteFrame[] = [];
    /**特殊元素的动画文件 */
    @property([cc.Prefab])
    CellPrefab: cc.Prefab[] = [];
    /**锁链的图 */
    @property([cc.SpriteFrame])
    lockFrames: cc.SpriteFrame[] = [];
    /**木箱的图 */
    @property([cc.SpriteFrame])
    boxFrames: cc.SpriteFrame[] = [];
    /**冰块的图 */
    @property([cc.SpriteFrame])
    iceFrames: cc.SpriteFrame[] = [];
    /**石头的图 */
    @property([cc.SpriteFrame])
    stoneFrames: cc.SpriteFrame[] = [];
    /**草地的图 */
    @property([cc.SpriteFrame])
    LeaveFrames: cc.SpriteFrame[] = [];
    /**可移动土地的等级图 */
    @property([cc.SpriteFrame])
    GroundFrames: cc.SpriteFrame[] = [];
    /**宝石的图 */
    @property([cc.SpriteFrame])
    GemFrames: cc.SpriteFrame[] = [];
    /**花花的图 */
    @property([cc.SpriteFrame])
    FlowerFrames: cc.SpriteFrame[] = [];
    /**萤火虫的图,后期可能会改成动画 */
    @property([cc.SpriteFrame])
    FireflyFrames: cc.SpriteFrame[] = [];
    /**收集物目标icon */
    @property([cc.SpriteFrame])
    CollectIcon: cc.SpriteFrame[] = [];
    /**复杂地块(可移动土地的包边图) */
    @property([cc.Prefab])
    groundPrefabs: cc.Prefab[] = [];
    /**移动土地中间的地块! */
    @property(cc.SpriteFrame)
    groundCenter: cc.SpriteFrame = null;
    /**移动土地中间的地块! */
    @property(cc.SpriteFrame)
    tuituji: cc.SpriteFrame = null;
    /**小火箭的图 */
    @property(cc.Prefab)
    rocketPrefab: cc.Prefab = null;

    /**蘑菇 */
    @property([cc.SpriteFrame])
    mushroomFrames: cc.SpriteFrame[] = [];

    public static ins: ResCtrl = null;

    onLoad() {
        ResCtrl.ins = this;
    }

    onDestroy() {
        ResCtrl.ins = null;
    }

    public getCellPrefab(index: number): cc.Prefab {
        return this.CellPrefab[index];
    }

    public getBombBg(index: number): cc.SpriteFrame {
        return this.BombFlashingBg[index];
    }

    public getCellFrame(type: CellType, index: number) {
        let frames = this.NormalCellFrame;
        if (Common.isBombType(type)) {
            frames = this.BombStaticFrame;
        }
        let frame = frames[index];
        if (type == CellType.Flower && GameModel.ins.HaveFlowers) {
            frame = this.pearlFrame;
        }
        //应急
        if (type < CellType.Bomb1 && RuntimeMgr.ins.CurBgIndex == 2) {
            const bg2frame = this.Map2NormalCellFrame[index];
            if (bg2frame) {
                frame = bg2frame;
            }
        }
        return frame;
    }

    public getLockFrame(index: number): cc.SpriteFrame {
        return this.lockFrames[index];
    }

    public getBoxFrame(index: number, type: number = null): cc.SpriteFrame {
        let area = 0;
        if (type != null) {
            area = (type + 1) * 3
        }
        return this.boxFrames[area + index];
    }

    public getIceFrame(index: number): cc.SpriteFrame {
        return this.iceFrames[index];
    }

    public getStoneFrame(index: number): cc.SpriteFrame {
        return this.stoneFrames[index];
    }

    public getLeavesFrame(index: number): cc.SpriteFrame {
        return this.LeaveFrames[index];
    }

    public getGroundFrame(index: number): cc.SpriteFrame {
        return this.GroundFrames[index];
    }

    public getFlowerFrame(index: number): cc.SpriteFrame {
        return this.FlowerFrames[index];
    }

    public getFirefly(index: number): cc.SpriteFrame {
        return this.FireflyFrames[index];
    }

    public getGemFrame(index: number): cc.SpriteFrame {
        return this.GemFrames[index];
    }

    public getCollectFrame(index: number): cc.SpriteFrame {
        return this.CollectIcon[index];
    }

    public getGroundBorderPrefab(index: number): cc.Prefab {
        return this.groundPrefabs[index];
    }

    public getRoketPrefab(): cc.Prefab {
        return this.rocketPrefab
    }

    public getMushroomFrame(index: number) {
        return this.mushroomFrames[index];
    }
}
