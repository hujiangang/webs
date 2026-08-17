import { Util } from "../Script/Base/Utils/Util";

const { ccclass, property } = cc._decorator;
@ccclass
export default class GodText extends cc.Component {

    //显示的文本
    @property(cc.Label)
    label: cc.Label = null;
    callback: any;

    @property(cc.Node)
    contentNode: cc.Node = null;

    @property(cc.Sprite)
    personSp: cc.Sprite = null;

    @property([cc.SpriteFrame])
    roleSprites: cc.SpriteFrame[] = [];

    private _positionY: number = 0;
    private _loaded = false;
    private _curText: string = "";
    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.node["_touchListener"].setSwallowTouches(false);
            //隐藏文本提示
            if (this.node.active) {
                // this.node.active = false;
                this.hide();
                this.node.emit('click');
                return;
            }
        });
        // this.contentNode.position.y = this._positionY;
        this.contentNode.active = true;
        this.contentNode.setPosition(0, this._positionY);
        this._loaded = true;
    }

    setText(txt, role, positionY, cb?) {
        this.callback = cb;
        this._positionY = positionY;
        if (!this.label) {
            // this.label = this.node.getComponentInChildren(cc.Label);
            return;
        }
        this.personSp.spriteFrame = this.roleSprites[role - 1];
        this.label.string = "";
        this.showText(txt);
        // this.label.string = txt;
        this._curText = txt;
        if (this._loaded) {
            this.contentNode.active = true;
            this.contentNode.setPosition(0, this._positionY);
        } else {
            this.contentNode.active = false;
        }
        gsap.TweenLite.to(this.node, 0.5, { opacity: 255 });
        this.node.active = true;
    }

    showText(text) {
        this.unscheduleAllCallbacks();
        var i = 0;
        this.schedule(function () {
            this.label.string += text[i];
            i++;
        }, 0.08, text.length - 1, 0);
    }

    hide() {
        this.unscheduleAllCallbacks();
        this.label.string = this._curText;
        gsap.TweenLite.to(this.node, 0.5, {
            opacity: 0, onComplete: () => {
                this.node.active = false;
            }
        });
    }
}
