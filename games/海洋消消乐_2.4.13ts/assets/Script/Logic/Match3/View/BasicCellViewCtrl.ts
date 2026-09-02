import M from "../../../Base/Manager/M";
import { NodePoolKey, CellType, ElimateType } from "../../Data/Const/Constant";
import { CellModel } from "../Model/CellModel";
import ItemCellBaseCtrl from "./ItemBasicCellCtrl";
import BaseView from "./BaseView";
import { Event } from "../../Data/Const/Event";
import ActionCtrl from "../../Common/ActionCtrl";
import GameModel, { CreateType } from "../Model/GameModel";
import MainUiCtrl from "./UI/MainUiCtrl";
import { CellBase } from "../Model/CellBase";
import Match3Skin from "../Skin/Match3Skin";
const { ccclass } = cc._decorator;

@ccclass
export default class BasicCellViewCtrl extends BaseView<CellModel[][]> {

    public initView(models: CellModel[][]) {
        super.initView(models);
        const itemPrefab = Match3Skin.requirePrefab("cellItem");
        M.nodePool.create(NodePoolKey.Cell, itemPrefab, 150);
        for (let y = models.length; y--;) {
            const yItem = models[y];
            for (let x = yItem.length; x--;) {
                const model = yItem[x];
                if (model /*&& !model.isEmpty*/) {
                    this.createNewCell(model, CreateType.Initial);
                }
            }
        }
    }

    public createNewCell(model: CellModel, createType: CreateType) {
        const node = M.nodePool.getItem(NodePoolKey.Cell, Match3Skin.requirePrefab("cellItem"));
        node.getComponent(ItemCellBaseCtrl).init(model, createType);
        model.extData = node;
        node.parent = this.node;
    }

    public playCollectPower(parent: cc.Node, startCell: CellBase<any, any>, endCell: CellBase<any, any>) {
        const node = M.nodePool.getItem(NodePoolKey.Cell, Match3Skin.requirePrefab("cellItem"));
        node.parent = parent;
        const pos = parent.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(startCell.getPosition()));
        node.setPosition(pos);
        node.getComponent(ItemCellBaseCtrl).easyInit(startCell.getType());
        const targetPos = parent.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(endCell.getPosition()));
        ActionCtrl.ins.runCollectNormalCell(node, targetPos).then(() => {
            M.nodePool.freeItem(NodePoolKey.Cell, node);
        });
    }

    public playCollectAni(parent: cc.Node, type: CellType, pos: cc.Vec2, targetPos: cc.Vec2, elimateType?: ElimateType, callback?: Function) {
        const node = M.nodePool.getItem(NodePoolKey.Cell, Match3Skin.requirePrefab("cellItem"));
        node.parent = parent;
        const wpos = this.node.convertToWorldSpaceAR(pos);
        node.setPosition(parent.convertToNodeSpaceAR(wpos));
        node.getComponent(ItemCellBaseCtrl).easyInit(type);
        targetPos = parent.convertToNodeSpaceAR(targetPos) as cc.Vec2;
        ActionCtrl.ins.runCollectNormalCell(node, targetPos, elimateType).then(() => {
            M.nodePool.freeItem(NodePoolKey.Cell, node)
            callback && callback();
            M.event.send(Event.UI.UpdateInfoPanel, type);
            M.event.send(Event.Effect.CollectOver, targetPos);
        });
    }

    public playCollectStepAni(uictrl: MainUiCtrl, cm: CellModel) {
        const parent = uictrl.node;
        const centerPos = parent.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(cm.getPosition()));
        const targetPos = parent.convertToNodeSpaceAR(uictrl.getStepPos()) as cc.Vec2;
        const label = cc.instantiate(cm.extCtrl.cellSprite.node.getChildByName('lv'));
        label.parent = parent;
        label.setPosition(centerPos);

        const a0 = cc.moveTo(1, targetPos);
        const a1 = cc.callFunc(() => {
            GameModel.ins.stepLimit += cm.getLv();
            M.event.send(Event.UI.UpdateInfoPanel);
            label.destroy();
        })
        label.runAction(cc.sequence(a0, a1));
    }



}
