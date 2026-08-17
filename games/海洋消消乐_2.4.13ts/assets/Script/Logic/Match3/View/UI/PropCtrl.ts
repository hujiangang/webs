
import M from "../../../../Base/Manager/M";
import PropItemCtrl from "./PropItemCtrl";
import { PropType } from '../../../Data/Const/Constant';

const { ccclass, property } = cc._decorator;

@ccclass
export default class PropCtrl extends cc.Component {

    @property(cc.Prefab)
    propItemPrefab: cc.Prefab = null;

    @property([cc.SpriteFrame])
    propIcons: cc.SpriteFrame[] = [];

    onLoad() {

    }

    public init() {
        for (let type = PropType.BeikeBomb; type <= PropType.Board; type++) {
            const data = M.runtime.getPropData(type) || { count: 0 };
            this._createItem(type, data.count);
        }
    }

    private _createItem(type: PropType, count: number) {
        const item = M.nodePool.createItem(this.propItemPrefab);
        const itemCtrl = item.getComponent(PropItemCtrl);
        itemCtrl && itemCtrl.init(type, this.propIcons[type - 100], count);
        item.name = "item_" + type;
        item.parent = this.node;
    }
}
