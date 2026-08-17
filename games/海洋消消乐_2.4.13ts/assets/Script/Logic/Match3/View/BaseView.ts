
const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseView<T> extends cc.Component {

    @property(cc.Prefab)
    ItemPrefab: cc.Prefab = null;

    protected models: T = null;

    public initView(models: T) {
        this.models = models;
    }

}
