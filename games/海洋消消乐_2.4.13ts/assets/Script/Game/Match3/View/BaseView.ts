
const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseView<T> extends cc.Component {

    protected models: T = null;

    public initView(models: T) {
        this.models = models;
    }

}
