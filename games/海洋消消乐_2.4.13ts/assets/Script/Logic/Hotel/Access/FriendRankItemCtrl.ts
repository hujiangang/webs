import Common from "../../Common/Common";
import M from "../../../Base/Manager/M";
import { UIHudDef } from "../../Data/Interface/UIData";
import { ICloudData } from "../../SimulationOperation/View/Map/CloudView";
import { Event } from "../../Data/Const/Event";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FriendRankItemCtrl extends cc.Component {

    @property(cc.Label)
    hotelName: cc.Label = null;

    @property(cc.Label)
    score: cc.Label = null;

    @property(cc.Label)
    rank: cc.Label = null;

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Sprite)
    rankIcon: cc.Sprite = null;

    @property(cc.Label)
    zanLab: cc.Label = null;

    @property([cc.SpriteFrame])
    rankIconFrame: cc.SpriteFrame[] = [];

    private _userId: number = null;
    private _data = null;

    public init(data: { id: number, nickname: string, avatar_url: string, score: string, appreciate: string, _hotelDatas: string }) {
        if (data) {
            this._userId = data.id;
            this._data = data;
            this._data._hotelDatas = ((typeof data._hotelDatas) == 'string') ? JSON.parse(data._hotelDatas) : data._hotelDatas;
            this.hotelName.string = `${data.nickname}的酒店`;
            this.zanLab.string = data.appreciate || '0';
            this.score.string = data.score;
            this._fillIcon(data.avatar_url);

            const rank = this.rank.string = this.node['index'] + 1;
            if (rank <= 3) {
                this.rank.node.active = false;
                this.rankIcon.node.active = true;
                this.rankIcon.spriteFrame = this.rankIconFrame[rank - 1]
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

    public onAccessClick() {
        M.net.visitFriend(this._userId).then(item => {
            console.error(this._data, item);
            M.ui.showUI(UIHudDef.CloudView, ICloudData.VisitFriendHotel, () => {
                M.ui.hideUI(UIHudDef.FriendRank);
                M.event.send(Event.Hotel.ShowGuestRoom, this._data);
            })
        });
    }

    update() {

    }

}
