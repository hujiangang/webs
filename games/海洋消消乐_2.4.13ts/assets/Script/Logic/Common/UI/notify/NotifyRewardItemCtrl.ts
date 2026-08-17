import Common from "../../Common";
import { PropType } from "../../../Data/Const/Constant";
import { CurrencyId } from "../../../../Base/BaseConst";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NotifyRewardItemCtrl extends cc.Component {

    @property(cc.Label)
    text: cc.Label = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    line: cc.Node = null;

    @property(cc.SpriteFrame)
    boxFrame: cc.SpriteFrame = null;

    @property([cc.SpriteFrame])
    CurrencyFrames: cc.SpriteFrame[] = [];

    private _showTipsCB: Function = null;

    private _reward = null;
    private _box: cc.Node = null;

    public init(data: { text: string, reward: { [type: number]: number | { [key: number]: { [key: number]: number } } } }, isLast: boolean = false, showTips) {
        this.line.active = false;
        this._showTipsCB = showTips;
        if (data) {
            let index = 0;
            this._reward = data.reward;
            this.text.string = data.text;
            if (!isLast) {
                this.line.active = true;
            }
            for (const key in data.reward) {
                if (index != 0) {
                    this._createLable('+');
                }
                if (key == 'box') {
                    const sprite = this._createSprite(this.boxFrame);
                    this._box = sprite.node;
                    sprite.node.setContentSize(sprite.node.width * 0.65, sprite.node.height * 0.65);
                    sprite.node.on(cc.Node.EventType.TOUCH_END, this._showTips, this);
                } else {
                    if (Number(key) < PropType.BeikeBomb) {
                        const sprite = this._createSprite(this.CurrencyFrames[key]);
                        sprite.node.setContentSize(sprite.node.width * 0.5, sprite.node.height * 0.5);
                        sprite.node.y -= 4;
                        let count: any = data.reward[key];
                        if (Number(key) == CurrencyId.Coin) {
                            count = Common.bytesToSize(count);
                        }
                        this._createLable(count);
                    }
                }
                index++;
            }
        }
    }

    private _showTips() {
        this._showTipsCB && this._showTipsCB(Common.getRewardArray(this._reward), Common.getWorldPos(this._box));
    }

    private _createSprite(frame: cc.SpriteFrame): cc.Sprite {
        const sprite = Common.createSprite(null, frame);
        sprite.trim = false;
        sprite.node.parent = this.content;
        return sprite
    }

    private _createLable(count): cc.Label {
        const node = cc.instantiate(this.text.node);
        const label = node.getComponent(cc.Label);
        label.overflow = cc.Label.Overflow.NONE;
        label.string = `${count}`;
        node.anchorX = 0
        node.parent = this.content;
        return label;
    }
}
