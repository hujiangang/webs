import M from "../../../../Application/M";
import GameModel from "../../Model/GameModel";
import { Event } from "../../../Data/Const/Event";
import CollectItemCtrl from "./CollectItemCtrl";
import RuntimeMgr from "../../../Data/RuntimeMgr";
import { EnergyModel } from "../../Model/EnergyModel";
import Common from "../../../Common/Common";
import ForestUI, {Palette} from '../../../Common/UI/ForestUI';
import { CellType } from "../../../Data/Const/Constant";

const { ccclass, property } = cc._decorator;

@ccclass
export default class InfoPanelCtrl extends cc.Component {

    stepLable: cc.Label = null;

    currentLvLable: cc.Label = null;

    scoreLable: cc.Label = null;

    collectContent: cc.Node = null;

    @property(cc.Prefab)
    collectItemPrefab: cc.Prefab = null;

    private colletctPool: Map<string, cc.Node> = null;
    private collectWidth: number = 0;

    public bindView(view: {
        stepLabel: cc.Label;
        levelLabel: cc.Label;
        scoreLabel: cc.Label;
        collectContent: cc.Node;
        collectWidth: number;
    }) {
        this.stepLable = view.stepLabel;
        this.currentLvLable = view.levelLabel;
        this.scoreLable = view.scoreLabel;
        this.collectContent = view.collectContent;
        this.collectWidth = Math.max(0, view.collectWidth);
    }

    onLoad() {
        M.event.register(Event.UI.UpdateInfoPanel, this.onUpdateInfo, this);

    }

    onDestroy() {
        M.event.unRegister(Event.UI.UpdateInfoPanel, this.onUpdateInfo, this);

    }

    public init() {
        if (this.currentLvLable) {
            this.currentLvLable.string = `第 ${RuntimeMgr.ins.CurLevel} 关`;
        }
        this.onUpdateInfo();
        this.initCollectTarget();
        EnergyModel.ins.setCurLevel();
    }

    public onUpdateInfo() {
        if (this.stepLable && GameModel.ins) {
            this.stepLable.string = `${GameModel.ins.stepLimit}`;
        }
        if (this.scoreLable && this.scoreLable.string !== String(RuntimeMgr.ins.currentScore)) {
            this.scoreLable.string = `${RuntimeMgr.ins.currentScore}`;
            const animation = this.scoreLable.getComponent(cc.Animation);
            animation && animation.play('scoreJump');
        }
    }

    private initCollectTarget() {
        this.colletctPool = new Map();
        if (!this.collectContent) return;

        // 重试关卡时立即移出旧目标，避免本帧新旧目标同时参与布局。
        this.collectContent.children.slice().forEach(child => {
            child.removeFromParent();
            child.destroy();
        });
        const cs = GameModel.ins.getCollect();
        const targetCount = cs ? cs.size : 0;
        const contentWidth = targetCount * 112;
        this.collectContent.setContentSize(contentWidth, 110);
        this.collectContent.setAnchorPoint(.5, .5);
        this.collectContent.setScale(contentWidth > 0 && this.collectWidth > 0
            ? Math.min(1, this.collectWidth / contentWidth) : 1);
        if (!cs) return;

        let index = 0;
        cs.forEach((collect, key) => {
            const item = M.nodePool.createItem(this.collectItemPrefab);
            const itemCtrl = item.getComponent(CollectItemCtrl);
            itemCtrl.init(key, collect);
            item.setContentSize(104, 110);
            item.setPosition((index++ - (targetCount - 1) / 2) * 112, 0);
            itemCtrl.icon.node.setPosition(0, 15);
            itemCtrl.icon.node.setScale(76 / Math.max(1, itemCtrl.icon.node.height));
            itemCtrl.count.node.active = false;
            itemCtrl.count = ForestUI.text(item, String(collect), 30, 0, -41, Palette.ink, 100, 42);
            item.parent = this.collectContent;
            this.colletctPool.set(key, item);
        });
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

}
