const { ccclass, property } = cc._decorator;

@ccclass
export default class GodFinger extends cc.Component {

    private _animation: cc.Animation = null;

    onLoad() {
        this._animation = this.getComponent(cc.Animation);
    }

    public doFinger() {
        this._animation.play("GodFinger");
    }

    public stopFinger() {
        this._animation.stop();
    }

    public set active(active) {
        this.node.active = active;
        if (!active) {
            this.stopFinger();
        }
    }
}