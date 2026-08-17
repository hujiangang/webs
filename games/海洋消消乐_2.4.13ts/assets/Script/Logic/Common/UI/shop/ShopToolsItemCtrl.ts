import ShopInfo from "../../../../Base/Tabls/ShopInfo";
import Common from "../../Common";
import { MoneyManager } from "../../../Data/MoneyManager";
import M from "../../../../Base/Manager/M";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ShopToolsItemCtrl extends cc.Component {

    @property(cc.Sprite)
    title: cc.Sprite = null;

    @property(cc.Sprite)
    bg: cc.Sprite = null;

    @property(cc.Sprite)
    flag: cc.Sprite = null;

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Sprite)
    unit: cc.Sprite = null;

    @property(cc.Label)
    singleCount: cc.Label = null;

    @property(cc.Label)
    price: cc.Label = null;

    @property(cc.Prefab)
    propItemPrefab: cc.Prefab = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property([cc.SpriteFrame])
    nameFrames: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    flagFrames: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    bgFrames: cc.SpriteFrame[] = [];

    private _data: ShopInfo = null;
    private _frames: cc.SpriteFrame[] = null;

    onLoad() {

    }

    public init(info: ShopInfo, frames: cc.SpriteFrame[], index: number) {
        this._frames = frames;
        this._data = info;
        if (info) {
            this.unit.spriteFrame = this._getRewardIcon(info.currencyType);
            this.title && (this.title.spriteFrame = this.nameFrames[index]);
            this.price.string = `x ${info.price.toString()}`;

            if (this.flag) {
                if (info.flag) {
                    this.flag.spriteFrame = this.flagFrames[info.flag];
                } else {
                    this.flag.node.active = false
                }
            }

            if (this.bg) {
                this.bg.spriteFrame = this.bgFrames[index] || this.bgFrames[this.bgFrames.length - 1];
            }

            if (this.content) {
                if (info.res && this.icon) {
                    Common.getRemotPic(info.res, this.icon.node.getContentSize()).then(frame => {
                        if (frame) {
                            this.icon.spriteFrame = frame;
                        }
                    });
                }
                if (info.content && info.content.length > 0) {
                    this.content.removeAllChildren();
                    info.content.forEach(itemData => {
                        this._createContentItem(itemData);
                    })
                }
            } else {

                this.icon.spriteFrame = this.nameFrames[index];
                this.singleCount.string = info.content[0].count.toString();
            }
        }
    }

    public onBuyClick() {
        const result = MoneyManager.CheckMoney(this._data.currencyType, this._data.price, true)
        if (result) {
            //发放东西!
            this._data.content.forEach(item => {
                this._setItem(item);
            });
        }
    }

    private _createContentItem(data: { type: number, count: number }) {
        const item = cc.instantiate(this.propItemPrefab)
        item.parent = this.content;
        const iconNode = item.getChildByName('icon')
        iconNode.getComponent(cc.Sprite).spriteFrame = this._getRewardIcon(data.type);
        let value = data.count.toString();
        if (data.type < 100) {
            value = Common.bytesToSize(data.count);
            iconNode.scale = 0.5;
        }
        item.getChildByName('count').getComponent(cc.Label).string = `x${value}`;
    }

    private _setItem(item: { type: number, count: number }) {
        let type = Number(item.type);
        if (type >= 100) {
            M.runtime.updatePropCount(type, item.count);
        } else {
            M.runtime.addCurrency(type, item.count);
        }
    }

    private _getRewardIcon(type: number): cc.SpriteFrame {
        let result = null;
        if (type >= 100) {
            result = this._frames[type - 100]
        } else {
            result = this._frames[type + 20]
        }
        return result;
    }

}
