import M from "../../../../Base/Manager/M";
import GameModel from "../../Model/GameModel";
import { Event } from "../../../Data/Const/Event";
import CollectItemCtrl from "./CollectItemCtrl";
import RuntimeMgr from "../../../Data/RuntimeMgr";
import { EnergyModel } from "../../Model/EnergyModel";
import Common from "../../../Common/Common";
import { CellType } from "../../../Data/Const/Constant";

const { ccclass, property } = cc._decorator;

@ccclass
export default class InfoPanelCtrl extends cc.Component {

    @property(cc.Label)
    stepLable: cc.Label = null;

    @property(cc.Label)
    currentLvLable: cc.Label = null;

    @property(cc.Label)
    scoreLable: cc.Label = null;

    @property(cc.Node)
    collectContent: cc.Node = null;

    @property(cc.Prefab)
    collectItemPrefab: cc.Prefab = null;

    @property(cc.ProgressBar)
    energyProgress: cc.ProgressBar = null;

    private colletctPool: Map<string, cc.Node> = null;

    onLoad() {
        M.event.register(Event.UI.UpdateInfoPanel, this.onUpdateInfo, this);
        M.event.register(Event.GameCMD.EnergyStorage, this.updataEnergy, this);

    }

    onDestroy() {
        M.event.unRegister(Event.UI.UpdateInfoPanel, this.onUpdateInfo, this);
        M.event.unRegister(Event.GameCMD.EnergyStorage, this.updataEnergy, this);

    }

    public init() {
        if (this.currentLvLable) {
            this.currentLvLable.string = `关卡 : ${RuntimeMgr.ins.CurLevel}`;
        }
        this.onUpdateInfo();
        this.initCollectTarget();
        EnergyModel.ins.setCurLevel();
    }

    public onUpdateInfo() {
        if (this.stepLable && GameModel.ins) {
            this.stepLable.string = `${GameModel.ins.stepLimit}`;
        }
        if (this.scoreLable && Number(this.scoreLable.string) != RuntimeMgr.ins.currentScore) {
            this.scoreLable.string = `${RuntimeMgr.ins.currentScore}`;
            const animation = this.scoreLable.getComponent(cc.Animation);
            animation && animation.play('scoreJump');
        }
    }

    private initCollectTarget() {
        const cs = GameModel.ins.getCollect();
        this.colletctPool = new Map();
        if (cs) {
            this.collectContent.width = [158, 208, 258][cs.size - 1];
            if (cs.size > 1) {
                // this.collectContent.x += 25 * (cs.size - 1);
            }
            this.collectContent.destroyAllChildren();
            cs.forEach((collect, key) => {
                const item = M.nodePool.createItem(this.collectItemPrefab);
                const itemCtrl = item.getComponent(CollectItemCtrl);
                itemCtrl.init(key, collect);
                item.parent = this.collectContent;
                this.colletctPool.set(key, item);
            })
        }
    }

    //获取关卡文字的世界坐标
    public getLevelLabPos() {
        return this.currentLvLable ? Common.getWorldPos(this.currentLvLable.node) : null;
    }

    //获得步数坐标
    public getStepPos() {
        return this.stepLable ? Common.getWorldPos(this.stepLable.node) : null;
    }

    //获取收集物的UI坐标
    public getCollectPos(type: CellType | string) {
        let pos = cc.v2(0, 0);
        const cNode = this.colletctPool ? this.colletctPool.get(type + '') : null;
        if (cNode) {
            // const rect = cNode.getBoundingBoxToWorld()
            // pos = cc.v2(rect.x, rect.y);
            pos = Common.getWorldPos(cNode);
        }
        return pos;
    }

    private progress: number = 0;
    private max: number = 0;
    private updataEnergy(progress: number, max: number) {
        this.progress = progress;
        this.max = max;
    }

    public update() {
        if (this.max) {
            let progress = Math.floor(this.energyProgress.progress * this.max);
            if (progress < this.progress) {
                progress++;
            } else if (progress == this.progress && progress == this.max) {
                progress = 0;
                this.progress = 0;
            } else if (progress >= this.progress) {
                progress = this.progress;
            }
            this.energyProgress.progress = progress / this.max;
        }

    }
}
