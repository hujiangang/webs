
import Common from "../../Common/Common";
import M from "../../../Base/Manager/M";
import Paths from "../../../Base/Utils/Paths";
import { StorageMgr } from "../../../Base/Manager/StorageMgr";
import { NativeKey } from "../../Data/Const/Constant";

const { ccclass, property } = cc._decorator;

export enum FriendsEventIds {
    Zan = 10,
    CancelZan,
    Share
};

@ccclass
export default class GuestPanelCtrl extends cc.Component {

    @property(cc.Label)
    nameLab: cc.Label = null;

    @property(cc.Label)
    zanLab: cc.Label = null;

    @property(cc.Label)
    zan2Lab: cc.Label = null;

    @property(cc.Label)
    scoreLab: cc.Label = null;

    @property(cc.Sprite)
    headIcon: cc.Sprite = null;

    @property(cc.Toggle)
    zanHeart: cc.Toggle = null;

    private _uid: number = null;
    private _zanList: Set<string | number> = null;

    public init(data: { id: number, nickname: string, avatar_url: string, score: string, appreciate: number, _hotelDatas: any }) {
        if (data) {
            this._uid = M.runtime.CurrentGuestUserid = data.id;
            this.scoreLab.string = data.score;
            this.updateZanLab(data.appreciate || 0)
            this.nameLab.string = data.nickname;
            this._fillIcon(data.avatar_url);
            //同步赞的状态~
            this._syncZanState();
        }
    }

    private _syncZanState() {
        this.zanHeart.isChecked = false;
        ///request ......
        if (!this._zanList) {
            this._zanList = new Set(<Array<number | string>>StorageMgr.Storage.getObject(NativeKey.ZanList, []));
        }
        if (this._zanList.has(this._uid)) {
            this.zanHeart.isChecked = true;
            if (this.zanLab.string == '0') {
                this.updateZanLab(1);
            }
        }
    }

    private updateZanLab(count: number | string) {
        this.zanLab.string = count.toString();
        this.zan2Lab.string = this.zanLab.string;
    }

    /**填充头像 */
    private _fillIcon(url: string) {
        if (url) {
            Common.getRemotPic(url, this.headIcon.node.getContentSize()).then((frame) => {
                if (frame) {
                    this.headIcon.spriteFrame = frame;
                } else {
                    console.error('get avatar error!');
                }
            })
        }
    }

    public onZanClick() {
        if (!this._zanList.has(this._uid)) {
            this._zanList.add(this._uid)
            M.net.interactive(this._uid, FriendsEventIds.Zan);
            StorageMgr.Storage.setObject(NativeKey.ZanList, Array.from(this._zanList), true);
            this.updateZanLab((Number(this.zanLab.string) + 1).toString())
            this.zanHeart.isChecked = true;
        }
        // else {
        //       //当前已经赞了,则取消
        //       this._zanList.delete(this._uid);
        // }
    }

    public onShareClick() {
        M.platform.share('我好友xxx的酒店', Paths.ShareImgPath + "level_share_45.png").then(() => {
            M.net.interactive(this._uid, FriendsEventIds.Share);
        });
    }


}
