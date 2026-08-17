
import M from "../../../Base/Manager/M";
import ChapterInfo from "../../../Base/Tabls/ChapterInfo";
import LevelMarkItem from '../../../Views/LevelMap/LevelMarkItem';

const { ccclass, property } = cc._decorator;

@ccclass
export default class SelectLevelCtrl extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Prefab)
    lvItem: cc.Prefab = null;

    @property(cc.Label)
    nameLab: cc.Label = null;


    public init(data: ChapterInfo) {
        if (data) {
            this.content.removeAllChildren();
            for (let i = data.minLv; i <= data.maxLv; i++) {
                const item = M.nodePool.createItem(this.lvItem);
                item.parent = this.content;
                item.getComponent(LevelMarkItem).updateData(i);
            }
            this.nameLab.string = data.name;
            this.nameLab.node.getChildByName('shadow').getComponent(cc.Label).string = data.name;
        }
    }
}
