
const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseItemView<T> extends cc.Component {

    protected model: T = null;

    public init(model: T) {
        this.model = model;
    }

}
