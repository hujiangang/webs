import M from "../../Base/Manager/M";
import ChapterItemCtrl from "./ChapterItemCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SelectChapterCtrl extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    onLoad() {

    }

    public init(callback?: Function) {
        const datas = M.table.ChapterInfo.getData()
        datas.forEach(info => {
            const item = M.nodePool.createItem(this.itemPrefab);
            item.parent = this.content;
            item.getComponent(ChapterItemCtrl).init(info, 0.7, callback);
        });
    }

}
