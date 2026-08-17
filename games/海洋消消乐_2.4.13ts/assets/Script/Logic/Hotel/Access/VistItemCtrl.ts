import { FriendsEventIds } from "./GuestPanelCtrl";
import { Util } from "../../../Base/Utils/Util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class VistItemCtrl extends cc.Component {

    @property(cc.Label)
    timeLabel: cc.Label = null;

    @property(cc.RichText)
    eventLabel: cc.RichText = null;

    onLoad() {

    }

    public init(data: { uid: number, event: number, nickname: string, avatar_url: string, created_at: number }) {
        if (data) {
            this.eventLabel.string = `<color=#00AB00>${data.nickname}</c> <color=#0076A4>${this._getEventMsg(data.event)}</color>`;
            this.timeLabel.string = Util.Timer.dateFtt('yyyy MM dd hh:mm:ss', new Date(data.created_at * 1000))
        }
    }

    private _getEventMsg(id: number) {
        let result: string = '';
        switch (id) {
            case FriendsEventIds.Zan:
                result = '给你的酒店点了赞!'
                break;
            case FriendsEventIds.Share:
                result = '分享了你的酒店喔!'
                break;
        }
        return result;
    }

}
