
import View from "./View";
import { SingletonFactory } from "../../Utils/SingletonFactory";

export default class Tips extends View {

    /**排队展示未实现..... */
    private mTipsPool = [];

    private mPlayState = 0;
    private mTimer = null;

    // public static ins: Tips = SingletonFactory.getInstance(Tips);

    public static instance: Tips = null;

    public static get ins(): Tips {
        if (this.instance == null) {
            this.instance = new Tips();
        }
        return this.instance;
    }


    constructor() {
        super('Tips');
    }

    /**
     * 
     * @param content 
     * @param type 0是普通提示 1是图片提示
     * @param time 
     */
    public show(content: string | cc.SpriteFrame, type: number = 0, time: number = 2) {
        //.......按照顺序显示tips 暂未实现.
        this.init();
        this.mTimer = time;
        if (this.mPlayState != 1 || this.isInvalidNode) {
            if (this.isInvalidNode) this.mNode = null;
            this.mPlayState = 1;
            if (!this.mNode) {
                this._initTipsView(content, type);
            } else {
                this._setContent(content, type);
                this.onShow();
            }
        }
    }

    private get isInvalidNode() {
        return this.mNode && !this.mNode.parent
    }

    private _initTipsView(content: string | cc.SpriteFrame = '', type: number) {
        if (!this.mRootNode) {
            return
        }
        cc.loader.loadRes('prefab/ui/tips', cc.Prefab, (err, prefab) => {
            if (err) {
                return console.error(err, prefab);
            }
            this.mNode = cc.instantiate(prefab);
            this.mRootNode.addChild(this.mNode);
            this._setContent(content, type);
            this.onShow();
        });
    }

    private _setContent(content: string | cc.SpriteFrame, type: number) {
        if (!this.mNode) {
            return console.error('Error: tips is not init ! ');
        }
        if (type == 0) {
            this.mNode.getChildByName('normal').active = true;
            this.mNode.getChildByName('gril').active = false;
            if (typeof content == 'string') {
                cc.find('normal/picContent', this.mNode).active = false;
                const c = cc.find('normal/content', this.mNode);
                c.active = true;
                c.getComponent(cc.Label).string = content;
            } else {
                cc.find('normal/content', this.mNode).active = false;
                const pic = cc.find('normal/picContent', this.mNode)
                pic.getComponent(cc.Sprite).spriteFrame = content;
            }
        } else {
            this.mNode.getChildByName('normal').active = false;
            this.mNode.getChildByName('gril').active = true;
            const c = cc.find('gril/content', this.mNode);
            c.getComponent(cc.Label).string = content as string;
        }
    }

    protected playHideAnimate() {
        this.mNode.opacity = 255;
        this.mNode.setPosition(0, 0);
        this.mNode.active = false;
        this.mPlayState = 0;
    }

    protected playShowAnimate() {
        this.mNode.active = true;
        const a1 = cc.moveBy(0.1, cc.v2(0, 40));
        const a2 = cc.moveBy(0.1, cc.v2(0, -20));
        const a3 = cc.delayTime(this.mTimer);
        const a4 = cc.callFunc(() => {
            this.mNode.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(() => this.onHide(), this)));
        });
        this.mNode.runAction(cc.sequence(a1, a2, a3, a4));
    }
}