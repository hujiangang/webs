import UpGroundCellModel from "../Model/UpGroundCellModel";
import M from "../../../Base/Manager/M";
import { NodePoolKey } from "../../Data/Const/Constant";
import ItemUpgroundCtrl from "./ItemUpgroundCtrl";
import BaseView from "./BaseView";
import GameModel from "../Model/GameModel";
import ActionCtrl from "../../Common/ActionCtrl";
import { Event } from "../../Data/Const/Event";
import { CollectType } from '../Model/CollectModel';
import Common from "../../Common/Common";
import SpinePlayerCtrl from "../../../Base/CustomComponent/SpinePlayerCtrl";
import Match3Skin from "../Skin/Match3Skin";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UpGroundViewCtrl extends BaseView<UpGroundCellModel[][]> {

    @property(cc.Node)
    defaultNode: cc.Node = null;

    @property(cc.Node)
    portal: cc.Node = null;


    public initView(models: UpGroundCellModel[][]) {
        super.initView(models);
        const itemPrefab = Match3Skin.requirePrefab("upGroundItem");
        M.nodePool.create(NodePoolKey.UpGroundCell, itemPrefab, 150);
        for (let y = models.length; y--;) {
            const yItems = models[y];
            for (let x = yItems.length; x--;) {
                const item = yItems[x];
                const node = M.nodePool.getItem(NodePoolKey.UpGroundCell, Match3Skin.requirePrefab("upGroundItem"));
                node.getComponent(ItemUpgroundCtrl).init(item);
                item.extData = node;
                node.parent = this.defaultNode;
                this.syncPortal(item);
            }
        }
    }

    private syncPortal(model: UpGroundCellModel) {
        this.portal.y = 0;
        if (model.portalIdx != 0) {
            const node = M.nodePool.createItem(Match3Skin.requirePrefab("portal"));
            const ctrl = node.getComponent(SpinePlayerCtrl);
            node.parent = this.portal;
            node.setPosition(model.getPosition());
            let playName = null;
            if (model.portalIdx > 0) {
                node.y += Common.GRID_H / 2;
                playName = 'chuansongmen_blue';
            } else if (model.portalIdx < 0) {
                node.y -= Common.GRID_H / 2;
                playName = 'chuansongmen_orage';
            }
            this.scheduleOnce(() => {
                ctrl.play(playName, 0, true)
            }, 0);
        }
    }


    public playCollectAniByType(parent: cc.Node, pos: cc.Vec2, targetPos: cc.Vec2, type: string) {
        const boxNode = this.createTempBoxNode(pos);
        boxNode.parent = parent;
        targetPos = parent.convertToNodeSpaceAR(targetPos) as cc.Vec2;
        ActionCtrl.ins.runCollectNormalCell(boxNode, targetPos).then(() => {
            M.nodePool.freeItem(NodePoolKey.UpGroundCell, boxNode);
            M.event.send(Event.Effect.CollectOver, targetPos);
            M.event.send(Event.UI.UpdateInfoPanel, type);
        });
    }

    private createTempBoxNode(pos: cc.Vec2): cc.Node {
        const item = new UpGroundCellModel();
        item.init({ box_level: 1 }, pos.x, pos.y, GameModel.ins.mapIndex);
        const node = M.nodePool.getItem(NodePoolKey.UpGroundCell, Match3Skin.requirePrefab("upGroundItem"));
        item.extData = node;
        node.getComponent(ItemUpgroundCtrl).init(item);
        return node;
    }
}
