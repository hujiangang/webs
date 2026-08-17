import { IConfigItem } from "../Logic/Common/CommonInterfaces";
import UIBase from "../Base/UI/UIBase";
import M from "../Base/Manager/M";
import PropItemCtrl from "../Logic/Match3/View/UI/PropItemCtrl";
import { PropType } from "../Logic/Data/Const/Constant";
import UIMgr from "../Base/Manager/UIMgr";
import { UIHudDef } from "../Logic/Data/Interface/UIData";

const { ccclass, property } = cc._decorator;
/**
 * 用法： 在三消场景获得道具 在界面上弹一下飞往道具列表
 * 注意： 仅限于三消场景
 */
@ccclass
export default class PropDropView extends UIBase {

    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    private _curItem: cc.Node = null;
    private _curData: IConfigItem = null;

    onLoad() {
        super.onLoad();
    }

    //目前只支持一个道具飘落 如需多个道具依次飘落 自己写！
    public onInit(itemData: IConfigItem) {
        const item = M.nodePool.createItem(this.itemPrefab);
        const itemCtrl = item.getComponent(PropItemCtrl);
        itemCtrl && itemCtrl.initOnlyType(itemData.itemId as PropType, itemData.num);
        item.parent = this.node;
        item.setScale(0.2);
        this._curItem = item;
        this._curData = itemData;
        this.flyToPropsBar();
    }

    private flyToPropsBar() {
        let node = this._curItem;

        let destinationPos = this.getDestination(this._curData.itemId);
        // console.error(destinationPos);
        const timeline = new gsap.TimelineMax();
        timeline
            .to(node, 0.6, { scale: 1.1, x: 0, y: 100 })
            .to(node, 0.6, { x: destinationPos.x, y: destinationPos.y, scale: 0.5, ease: gsap.Back.easeIn })
            .add(() => {
                M.runtime.updatePropCount(this._curData.itemId as PropType, this._curData.num);
                timeline.remove(timeline);
                UIMgr.ins.closeUI(UIHudDef.PropDropView);

            });
    }

    public getDestination(itemId) {
        let propBar = cc.find("Canvas/ui/bottom/propsBar");
        if (propBar) {
            let itemNode = propBar.getChildByName("item_" + itemId);
            if (itemNode) {
                let itemNodeWorldPos = propBar.convertToWorldSpaceAR(itemNode.position);
                return itemNodeWorldPos.sub(cc.v3(cc.winSize.width / 2, cc.winSize.height / 2));
            }
        }
        return cc.v2(0, -600);
    }
}