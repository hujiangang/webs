import M from "../../../Base/Manager/M";
import { PropType } from "../../Data/Const/Constant";
import { CurrencyId } from "../../../Base/BaseConst";
import Common from "../Common";
import { Util } from "../../../Base/Utils/Util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BoxTipsCtrl extends cc.Component {

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.Prefab)
    rewardPrefab: cc.Prefab = null;

    @property([cc.SpriteFrame])
    rewardIconFrames: cc.SpriteFrame[] = [];


    public isReady: boolean = false;


    onLoad() {

    }

    public updateData(title: string, contentSize?: cc.Size) {
        this.title.string = title;
        if (contentSize) {
            this.node.setContentSize(contentSize);
        }
    }

    public show(data: Array<{ type: number, count: number }>, pos?: cc.Vec2) {
        if (data) {
            

            this.content.destroyAllChildren()
            data.forEach(item => {
                const node = M.nodePool.createItem(this.rewardPrefab);
                let count = item.count.toString();
                node.parent = this.content;
                node.setScale(0.8);

                const icon = node.getChildByName('icon');
                if (item.type < PropType.BeikeBomb) {
                    icon.setScale(1);
                }
                if (item.type == CurrencyId.Coin) {
                    count = Common.bytesToSize(item.count);
                }
                icon.getComponent(cc.Sprite).spriteFrame = this._getRewardIcon(item.type);
                node.getChildByName('count').getComponent(cc.Label).string = `x${count}`;
            })

            pos && this.node.setPosition(pos);
            this.node.active = true;
            this.scheduleOnce(() => {
                this.isReady = true;
            }, 0.5)

            Util.Tool.OpenUITween(this.node, null);
        }
    }

    public hide() {
        this.node.active = false;
        this.isReady = false;

        Util.Tool.CloseUITween(this.node, null);
    }

    private _getRewardIcon(type: number): cc.SpriteFrame {
        let result = null;
        if (type >= PropType.BeikeBomb) {
            result = this.rewardIconFrames[type - PropType.BeikeBomb]
        } else {
            result = this.rewardIconFrames[20 + type];
        }
        return result;
    }


}
