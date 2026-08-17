import UIBase from "../../../../Base/UI/UIBase";
import M from "../../../../Base/Manager/M";
import UIMgr from "../../../../Base/Manager/UIMgr";
import { UIHudDef } from "../../../Data/Interface/UIData";
import NotifyRewardItemCtrl from "./NotifyRewardItemCtrl";
import BoxTipsCtrl from "../BoxTipsCtrl";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NotifyPanel extends UIBase {

    @property(cc.Label)
    titleLab: cc.Label = null;

    @property(cc.Label)
    textLab: cc.Label = null;

    @property(cc.Prefab)
    rewardPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    tipsPrefab: cc.Prefab = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    closeButton: cc.Node = null;

    @property([cc.SpriteFrame])
    propFrams: cc.SpriteFrame[] = [];

    private _tips: BoxTipsCtrl = null;
    private _isMaintainOn: boolean = false;

    onLoad() {
        super.onLoad();
    }

    onDestroy() {
        this._tips = null;
    }

    public onInit(isMaintainOn: boolean = false) {
        this._isMaintainOn = isMaintainOn;
        this._initView();
        this._initTips();
    }

    private _initView() {
        this.content.removeAllChildren();
        M.runtime.getServerConfig().then((config) => {
            if (this._isMaintainOn) {
                this.titleLab.string = '公告';
                this.content.active = false;
                this.textLab.node.active = true;
                this.textLab.string = config.maintain_content;
                this.closeButton.active = false;
            } else {
                this.closeButton.active = true;
                if (config && config.announcement) {
                    this.titleLab.string = '活动规则';
                    this.textLab.node.active = !!config.announcement.text;
                    this.content.active = !!config.announcement.grid;
                    if (config.announcement.text) {
                        this.textLab.string = config.announcement.text;
                    }
                    if (config.announcement.grid) {
                        config.announcement.grid.forEach((itemData, index) => {
                            const item = M.nodePool.createItem(this.rewardPrefab);
                            item.parent = this.content;
                            item.getComponent(NotifyRewardItemCtrl).init(itemData, index == (config.announcement.grid.length - 1), this._onShowTips.bind(this));
                        });
                    }
                }
            }
        });

    }

    public onCloseClick() {
        if (!this._isMaintainOn) {
            UIMgr.ins.hideUI(UIHudDef.NoticePanel);
        }
    }

    private _initTips() {
        if (!this._tips) {
            const node = M.nodePool.createItem(this.tipsPrefab);
            node.parent = this.node;
            this._tips = node.getComponent(BoxTipsCtrl);
            this._tips.updateData('开启宝箱获得以下奖励:', cc.size(330, 366));
            this._tips.hide();
        }
    }

    public onHideTips() {
        if (this._tips && this._tips.isReady) {
            this._tips.hide();
        }
    }

    private _onShowTips(data: Array<{ type: number, count: number }>, wolrdPos: cc.Vec2) {
        if (this._tips) {
            this._tips.show(data, this.node.convertToNodeSpaceAR(wolrdPos).add(cc.v2(0, 35)));
        }
    }

}
