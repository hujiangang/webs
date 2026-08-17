import Common from "../../Logic/Common/Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankItemCtrl extends cc.Component {

    @property(cc.Label)
    nickName: cc.Label = null;

    @property(cc.Label)
    score: cc.Label = null;

    @property(cc.Label)
    rank: cc.Label = null;

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Sprite)
    rankIcon: cc.Sprite = null;

    @property([cc.SpriteFrame])
    rankIconFrame: cc.SpriteFrame[] = [];

    @property(cc.Label)
    level: cc.Label = null;

    public init(data: { rank: number, uid: number, nickname: string, avatar_url: string, value: number, extra: any }) {
        if (data) {
            this.nickName.string = data.nickname;
            Common.parseRankData(data.value);
            const rd = Common.parseRankData(data.value);
            this.rank.string = data.rank.toString();
            this.score.string = rd.score.toString();
            this.level.string = `${rd.level}关`;
            this._fillIcon(data.avatar_url);
            if (data.rank <= 3) {
                this.rank.node.active = false;
                this.rankIcon.node.active = true;
                this.rankIcon.spriteFrame = this.rankIconFrame[data.rank - 1]
            } else {
                this.rank.node.active = true;
                this.rankIcon.node.active = false;
            }
        }
    }

    /**填充头像 */
    private _fillIcon(url: string) {
        if (url) {
            Common.getRemotPic(url, this.icon.node.getContentSize()).then((frame) => {
                if (frame) {
                    this.icon.spriteFrame = frame;
                } else {
                    console.error('get avatar error!');
                }
            })
        }
    }

    update() {

    }

}
