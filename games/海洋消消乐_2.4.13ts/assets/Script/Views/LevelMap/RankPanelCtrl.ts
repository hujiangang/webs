import UIBase from "../../Base/UI/UIBase";
import M from "../../Base/Manager/M";
import RankItemCtrl from "./RankItemCtrl";
import Common from "../../Logic/Common/Common";
import { UIHudDef } from "../../Logic/Data/Interface/UIData";

const { ccclass, property } = cc._decorator;

interface RankData {
    my: { rank: number, value: number, extra: any };
    list: Array<{ rank: number, uid: number, nickname: string, avatar_url: string, value: number, extra: any }>
}

@ccclass
export default class RankPanelCtrl extends UIBase {

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    @property(cc.Label)
    selfLv: cc.Label = null;

    @property(cc.Label)
    selfScore: cc.Label = null;

    @property(cc.Label)
    selfRank: cc.Label = null;

    @property(cc.Sprite)
    selfIcon: cc.Sprite = null;

    @property(cc.Sprite)
    operatingHead: cc.Sprite = null;

    @property(cc.ScrollView)
    rankScrollView: cc.ScrollView = null;

    private _rankData: RankData = null;

    private _itemPool: Array<cc.Node> = null;

    private _animation: cc.Animation = null;

    private _rankSize = 6;

    private _endNode: cc.Node = null;
    private _startNode: cc.Node = null;

    onLoad() {
        super.onLoad();
        // this.onInit()
        this._animation = this.node.getComponent(cc.Animation);
    }

    public onInit() {
        //获取数据!
        this._initData();
        if (!this._itemPool) {
            this._itemPool = [];
        }
        if (!this._animation) {
            this._animation = this.node.getComponent(cc.Animation);
        }
    }

    private async _initData() {
        this._rankData = await M.net.getRankData();
        if (this._rankData) {
            this._cleanView();
            this._initView();
        }
        this.show();
    }

    public show() {
        this.node.active = true;
        this._animation.play('ShowSelectLevel');
    }

    private _initView() {
        this._initSelfDisplay(this._rankData.my);
        this._initOperatingHead();
        this._initRankContent();
    }

    private _initRankContent() {
        for (let i = 0; i < this._rankSize; i++) {
            const itemData = this._rankData.list[i];
            const itemNode = M.nodePool.createItem(this.itemPrefab);
            itemNode.y = -(i * itemNode.height + (10 + itemNode.height / 2) + (i * 5));
            itemNode.parent = this.content;
            itemNode['index'] = i;
            itemNode.getComponent(RankItemCtrl).init(itemData);
        }
        const size = this._rankData.list.length;
        this._endNode = this.content.children[this._rankSize - 1];
        this._startNode = this.content.children[0];
        this.content.height = (size * this.itemPrefab.data.height) + (size * 5) + 10;
    }

    private _cleanView() {
        this.content.removeAllChildren();
    }

    private _initSelfDisplay(myData: { rank: number, value: number, extra: any }) {
        if (myData) {
            const rd = Common.parseRankData(myData.value);
            this.selfScore.string = rd.score.toString();
            this.selfLv.string = `${rd.level}关`;
            this.selfRank.string = myData.rank <= 0 ? '未上榜' : myData.rank.toString();
        }
        M.platform.getUserInfo().then((userdata) => {
            if (userdata && userdata.avatarUrl) {
                Common.getRemotPic(userdata.avatarUrl).then((frame) => {
                    frame && (this.selfIcon.spriteFrame = frame);
                })
            }
        });
    }

    private _initOperatingHead() {
        M.runtime.getServerConfig().then((config) => {
            if (config && config.rank_banner) {
                Common.getRemotPic(config.rank_banner, null, 'png').then(frame => {
                    frame && (this.operatingHead.spriteFrame = frame);
                })
            }
        })
    }

    public onCloseBtnClick() {
        this._animation.play('HideSelectLevel');
        this.scheduleOnce(() => {
            this.node.active = false;
        }, 0.30);
    }

    public onOperatingHeadClick() {
        //展示公告!
        M.ui.showUI(UIHudDef.NoticePanel);
    }

    public onScrollCallBack(a, b, c) {
        for (let i = this.content.children.length; i--;) {
            const node = this.content.children[i];
            if (node.active) {
                const pos = this.content.parent.convertToNodeSpaceAR(Common.getWorldPos(node));
                //先处理下移时,上节点的处理.
                if (pos.y >= (node.height / 2 + 10)) {
                    //已经可以被移到下面! 
                    const nextIndex = this._endNode['index'] + 1;
                    const data = this._rankData.list[nextIndex];
                    if (data) {
                        node.active = false;
                        this._startNode = this._getNodeByIndex(node['index'] + 1);
                        node['index'] = nextIndex;
                        node.getComponent(RankItemCtrl).init(data);
                        node.y = this._endNode.y - (node.height + 5);
                        this._endNode = node;
                        node.active = true;
                    }
                }
            }
        }
        if (this._startNode) {
            const startPos = this.content.parent.convertToNodeSpaceAR(Common.getWorldPos(this._startNode));
            //将最下的拉上来
            if (startPos.y + this._startNode.height / 2 + 10 < 0) {
                const data = this._rankData.list[this._startNode['index'] - 1];
                if (data) {
                    //移交最后一个位置 
                    const tempNode = this._endNode;
                    this._endNode = this._getNodeByIndex(this._endNode['index'] - 1);
                    tempNode.y = this._startNode.y + (this._startNode.height + 5);
                    tempNode.getComponent(RankItemCtrl).init(data);
                    tempNode['index'] = this._startNode['index'] - 1
                    //移交startNode
                    this._startNode = tempNode;
                }
            }
        }
    }

    //待优化
    private _getNodeByIndex(index: number): cc.Node {
        let result = null;
        for (let i = this.content.children.length; i--;) {
            const node = this.content.children[i];
            if (node['index'] == index) {
                result = node;
                break;
            }
        }
        return result;
    }


    start() {

    }

    update(dt) {


    }
}
