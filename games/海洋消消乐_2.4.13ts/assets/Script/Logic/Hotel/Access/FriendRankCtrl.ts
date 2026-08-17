import M from "../../../Base/Manager/M";
import Common from "../../Common/Common";
import FriendRankItemCtrl from "./FriendRankItemCtrl";
import UIBase from "../../../Base/UI/UIBase";
import { UIHudDef } from "../../Data/Interface/UIData";
import vistItemCtrl from "./vistItemCtrl";
import Paths from "../../../Base/Utils/Paths";

const { ccclass, property } = cc._decorator;


@ccclass
export default class RankPanelCtrl extends UIBase {

    @property(cc.Node)
    friendContent: cc.Node = null;

    @property(cc.Node)
    visitContent: cc.Node = null;

    @property(cc.Prefab)
    itemPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    visitItemPrefab: cc.Prefab = null;

    @property(cc.Label)
    selfLv: cc.Label = null;

    @property(cc.Label)
    selfScore: cc.Label = null;

    @property(cc.Label)
    selfRank: cc.Label = null;

    @property(cc.Sprite)
    selfIcon: cc.Sprite = null;

    @property(cc.Node)
    visitRedNode: cc.Node = null;

    @property(cc.Label)
    visitCountLab: cc.Label = null;

    @property(cc.Node)
    friendView: cc.Node = null;

    @property(cc.Node)
    visitView: cc.Node = null;

    @property(cc.Node)
    selfRankNode: cc.Node = null;

    private _itemPool: Array<cc.Node> = null;

    private _animation: cc.Animation = null;

    private _rankSize = 6;

    private _endNode: cc.Node = null;

    private _startNode: cc.Node = null;

    private content: cc.Node = null;

    private _currentSelectView: string = null;

    private _currentItemPrefab: cc.Prefab = null;

    private _currentDataList: Array<any> = null;

    private _currentCtrl: string = null;

    private _myRank: number = 100;

    /**好友列表 */
    private _friendList: { myrank: { rank: number, score: string }, list: Array<{ id: number, _hotelDatas: any, nickname: string, score: number, avatar_url: string }> } = null;
    /**互动列表 */
    private _interactiveList: Array<{ operator: number, event: number, nickname: string, avatar_url: string, created_at: number }> = null;

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

        if (!this._currentSelectView) {
            this._currentSelectView = '0';
        }

        //这里应该双份数据   
        // if (this._rankData) {
        //     this._cleanView();
        //     this._initView();
        // }
        // this.show();

        this.onSwitchBtnClick(null, this._currentSelectView);
    }

    // private _preLoadAccData() {
    //     //请求访客信息
    //     M.net.getOnlineList().then((data: Array<{ id: number, nickname: string, avatar_url: string }>) => {
    //         if (data) {
    //             this._visitList = data;
    //             // this.visitCountLabel.string = this._visitList.length.toString();
    //         } else {
    //             // this.visitCountLabel.string = '0';
    //         }
    //     });
    //     //请求好友信息
    //     M.net.getFriendList().then(data => {
    //         this._friendList = data;
    //     });
    //     //请求事件信息
    //     M.net.getInteractiveList().then(data => {
    //         this._interactiveList = data;
    //     });
    // }

    public show() {
        // this.node.active = true;
        this._cleanView();
        this._initView();
    }

    onHide() {
        this._friendList = null;
        this._interactiveList = null;
    }

    private _initView() {
        // this._initSelfDisplay(this._rankData.my);

        this._initRankContent();
    }

    private _initRankContent() {
        if (this._currentDataList && this._currentDataList.length > 0) {
            for (let i = 0; i < this._rankSize; i++) {
                const itemData = this._currentDataList[i];
                if (itemData) {
                    const itemNode = M.nodePool.createItem(this._currentItemPrefab);
                    itemNode.y = -(i * itemNode.height + (10 + itemNode.height / 2) + (i * 5));
                    itemNode.parent = this.content;
                    itemNode['index'] = i;
                    itemNode.getComponent(this._currentCtrl).init(itemData);
                    this._endNode = itemNode;
                }
            }
            const size = this._currentDataList.length;
            // this._endNode = this.content.children[this._rankSize - 1];
            this._startNode = this.content.children[0];
            this.content.height = (size * this._currentItemPrefab.data.height) + (size * 5) + 10;
        } else {
            //显示没有数据!!

        }
    }

    private _cleanView() {
        this.content.removeAllChildren();
    }

    private _initSelfDisplay(myData: { appreciate: string | number, rank: number, score: string }) {
        if (myData) {
            this.selfRankNode.active = true;
            //分数
            this.selfScore.string = myData.score || '0';
            //赞...
            this.selfLv.string = `${myData.appreciate || 0}`;

            this.selfRank.string = this._myRank > 100 ? '99+' : this._myRank.toString();
            M.platform.getUserInfo().then((userdata) => {
                if (userdata && userdata.avatarUrl) {
                    Common.getRemotPic(userdata.avatarUrl).then((frame) => {
                        frame && (this.selfIcon.spriteFrame = frame);
                    })
                }
            });
        } else {
            this.selfRankNode.active = false;
        }

    }

    public onCloseBtnClick() {
        M.ui.hideUI(UIHudDef.FriendRank);
    }

    public onScrollCallBack(a, b, c) {
        if (!this._currentDataList) return;
        for (let i = this.content.children.length; i--;) {
            const node = this.content.children[i];
            if (node.active) {
                const pos = this.content.parent.convertToNodeSpaceAR(Common.getWorldPos(node));
                //先处理下移时,上节点的处理.
                if (pos.y >= (node.height / 2 + 10)) {
                    //已经可以被移到下面! 
                    const nextIndex = this._endNode['index'] + 1;
                    const data = this._currentDataList[nextIndex];
                    if (data) {
                        node.active = false;
                        this._startNode = this._getNodeByIndex(node['index'] + 1);
                        node['index'] = nextIndex;
                        node.getComponent(this._currentCtrl).init(data);
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
                const data = this._currentDataList[this._startNode['index'] - 1];
                if (data) {
                    //移交最后一个位置 
                    const tempNode = this._endNode;
                    this._endNode = this._getNodeByIndex(this._endNode['index'] - 1);
                    tempNode.y = this._startNode.y + (this._startNode.height + 5);
                    tempNode['index'] = this._startNode['index'] - 1
                    tempNode.getComponent(this._currentCtrl).init(data);
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

    private _showRedDot(count: number = 0) {
        if (count) {
            this.visitRedNode.active = true;
            this.visitCountLab.string = count.toString();
        } else {
            this.visitRedNode.active = false;
        }
    }

    public onShareClick() {
        M.platform.share('看看我的好友吧!!!', Paths.ShareImgPath + "level_share_45.png");
    }

    public async onSwitchBtnClick(event, customValue) {
        switch (customValue) {
            case '0':
                this.friendView.active = true;
                this.visitView.active = false;
                this.content = this.friendContent;
                this._currentCtrl = 'FriendRankItemCtrl';
                this._currentItemPrefab = this.itemPrefab;
                if (!this._friendList) {
                    //请求好友信息
                    this._friendList = await M.net.getFriendList();
                    if (this._friendList.list) {
                        this._friendList.list.sort((a, b) => {
                            return b.score - a.score;
                        });
                        for (let i = this._friendList.list.length; i--;) {
                            if (this._friendList.list[i].id == M.runtime.UserId) {
                                this._myRank = (i + 1);
                                break;
                            }
                        }
                    }
                }
                console.error('this._friendList:', this._friendList);
                if (this._friendList) {
                    this._initSelfDisplay(<any>this._friendList.myrank);
                }
                this._currentDataList = this._friendList.list;
                break;
            case '1':
                this.friendView.active = false;
                this.visitView.active = true;
                this.selfRankNode.active = false;
                this.content = this.visitContent;
                this._currentCtrl = 'VistItemCtrl';
                this._currentItemPrefab = this.visitItemPrefab;
                if (!this._interactiveList) {
                    //请求事件信息
                    this._interactiveList = await M.net.getInteractiveList();
                    this._interactiveList && this._interactiveList.sort((a, b) => {
                        return b.created_at - a.created_at;
                    })
                } else {
                    this._currentDataList
                }
                console.error('this._interactiveList:', this._interactiveList);
                this._currentDataList = this._interactiveList
                break;
        }

        this._currentSelectView = customValue;
        this.show();
    }

}
