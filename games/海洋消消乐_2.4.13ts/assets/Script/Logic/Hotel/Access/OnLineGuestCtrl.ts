import Common from "../../Common/Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OnLineGuestCtrl extends cc.Component {

    @property(cc.Prefab)
    guestIconItem: cc.Prefab = null;


    public init(data: Array<{ id: number, nickname: string, avatar_url: string }>) {
        if (data) {
            this.node.removeAllChildren();
            for (let i = 0; i < 9; i++) {
                const itemData = data[i];
                if (itemData) {
                    const item = cc.instantiate(this.guestIconItem);
                    item.parent = this.node;
                    this._syncIconFrame(cc.find('mask/icon', item).getComponent(cc.Sprite), itemData.avatar_url);
                }
            }
        }
    }

    private _syncIconFrame(sprite: cc.Sprite, url: string) {
        if (sprite && url) {
            Common.getRemotPic(url).then(frame => {
                if (frame) {
                    sprite.spriteFrame = frame
                }
            })
        }
    }


}
