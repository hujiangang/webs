const { ccclass, property, executeInEditMode } = cc._decorator;
@ccclass
@executeInEditMode
export class ItemZIndex extends cc.Component {

    @property(cc.Integer)
    zIndex: number = 0;

    onLoad() {
        // this.node.zIndex = this.zIndex;
        // console.error("ssss");
    }
}