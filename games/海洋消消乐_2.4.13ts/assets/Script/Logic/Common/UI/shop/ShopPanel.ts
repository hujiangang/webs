import UIBase from "../../../../Base/UI/UIBase";
import { UIHudDef } from "../../../Data/Interface/UIData";
import M from "../../../../Base/Manager/M";
import ShopInfo from "../../../../Base/Tabls/ShopInfo";
import ShopToolsItemCtrl from "./ShopToolsItemCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopPanel extends UIBase {

    @property(cc.Node)
    toolsNode: cc.Node = null;

    @property(cc.Node)
    decNode: cc.Node = null;

    @property(cc.Prefab)
    toolsPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    onlyCoinPrefab: cc.Prefab = null;

    @property([cc.SpriteFrame])
    frames: cc.SpriteFrame[] = [];

    onLoad() {



    }

    public onInit() {
        this.toolsNode.active = false;
        this.onMainBtnChanged({ node: { name: 'tools' } });

    }

    public onCloseClick() {
        M.ui.hideUI(UIHudDef.ShopPanel);
    }

    public onShowVideoClick() {

    }

    public onMainBtnChanged(event) {
        switch (event.node.name) {
            case 'tools':
                if (!this.toolsNode.active) {
                    this.toolsNode.active = true;
                    this.decNode.active = false;
                    this.initToolsContent();
                }
                break;
            case 'dec':
                // this.toolsNode.active = false;
                // this.decNode.active = true;
                break;
        }
    }

    private initToolsContent() {
        const content = cc.find('view/content', this.toolsNode);
        content.removeAllChildren();
        let singleIndex = null;
        M.table.ShopInfo.getData().forEach((info, index) => {
            let node = null;
            if (info.content.length == 1) {
                index = singleIndex == null ? (singleIndex = 0) : (singleIndex++)
                node = M.nodePool.createItem(this.onlyCoinPrefab);
            } else {
                node = M.nodePool.createItem(this.toolsPrefab);
            }
            node.parent = content
            node.getComponent(ShopToolsItemCtrl).init(info, this.frames, index);
        })
    }

}
