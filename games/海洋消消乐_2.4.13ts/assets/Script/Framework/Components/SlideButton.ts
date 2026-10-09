
const { ccclass, property, } = cc._decorator;

@ccclass
export default class SlideButton extends cc.Component {

    @property(cc.Sprite)
    openSprite: cc.Sprite = null;

    @property(cc.Sprite)
    closeSprite: cc.Sprite = null;

    @property(cc.Sprite)
    bar: cc.Sprite = null;

    @property(cc.Component.EventHandler)
    eventHandler: cc.Component.EventHandler = null;

    private _isOpen: boolean = true;
    private _isPlaying: boolean = false;

    onLoad() {
        this._isOpen = true;
        this._isPlaying = false;

    }

    private _change(isNeedPlayAction: boolean = true) {
        if (this._isOpen) {
            this.openSprite.node.active = true;
            this.closeSprite.node.active = false;
        } else {
            this.openSprite.node.active = false;
            this.closeSprite.node.active = true;
        }

        if (isNeedPlayAction) {
            this._playMoveBarAction();
        } else {
            this.eventHandler.emit([this._isOpen]);
            if (!this._isOpen || (this._isOpen && this.bar.node['open'] == false)) {
                this._playMoveBarAction();
            }
        }
    }

    private _playMoveBarAction() {
        let distance: number = this.openSprite.node.width / 2;
        if (this.bar.node['open'] != this._isOpen) {
            if (!this._isOpen) {
                distance = -distance;
            }
            this._isPlaying = true;
            this.bar.node['open'] = this._isOpen;
            this.bar.node.runAction(cc.sequence(cc.moveBy(0.1, cc.v2(distance, 0)), cc.callFunc(() => {
                this._isPlaying = false;
                this.eventHandler.emit([this._isOpen]);
            }, this)));
        }
    }

    public onChange(event, opt: boolean = null) {
        if (this._isPlaying) return;
        let isMove = true;
        if (opt != null) {
            this._isOpen = opt;
            isMove = false;
        } else {
            this._isOpen = !this._isOpen
        }
        this._change(isMove);
    }
}
