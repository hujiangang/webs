"use strict";
cc._RF.push(module, '776a1dCP5xJX6KuFJoQzMby', 'FriendRankCtrl');
// Script/Logic/Hotel/Access/FriendRankCtrl.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var M_1 = require("../../../Base/Manager/M");
var Common_1 = require("../../Common/Common");
var UIBase_1 = require("../../../Base/UI/UIBase");
var UIData_1 = require("../../Data/Interface/UIData");
var Paths_1 = require("../../../Base/Utils/Paths");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankPanelCtrl = /** @class */ (function (_super) {
    __extends(RankPanelCtrl, _super);
    function RankPanelCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.friendContent = null;
        _this.visitContent = null;
        _this.itemPrefab = null;
        _this.visitItemPrefab = null;
        _this.selfLv = null;
        _this.selfScore = null;
        _this.selfRank = null;
        _this.selfIcon = null;
        _this.visitRedNode = null;
        _this.visitCountLab = null;
        _this.friendView = null;
        _this.visitView = null;
        _this.selfRankNode = null;
        _this._itemPool = null;
        _this._animation = null;
        _this._rankSize = 6;
        _this._endNode = null;
        _this._startNode = null;
        _this.content = null;
        _this._currentSelectView = null;
        _this._currentItemPrefab = null;
        _this._currentDataList = null;
        _this._currentCtrl = null;
        _this._myRank = 100;
        /**好友列表 */
        _this._friendList = null;
        /**互动列表 */
        _this._interactiveList = null;
        return _this;
    }
    RankPanelCtrl.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        // this.onInit()
        this._animation = this.node.getComponent(cc.Animation);
    };
    RankPanelCtrl.prototype.onInit = function () {
        //获取数据!
        this._initData();
        if (!this._itemPool) {
            this._itemPool = [];
        }
        if (!this._animation) {
            this._animation = this.node.getComponent(cc.Animation);
        }
    };
    RankPanelCtrl.prototype._initData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
                return [2 /*return*/];
            });
        });
    };
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
    RankPanelCtrl.prototype.show = function () {
        // this.node.active = true;
        this._cleanView();
        this._initView();
    };
    RankPanelCtrl.prototype.onHide = function () {
        this._friendList = null;
        this._interactiveList = null;
    };
    RankPanelCtrl.prototype._initView = function () {
        // this._initSelfDisplay(this._rankData.my);
        this._initRankContent();
    };
    RankPanelCtrl.prototype._initRankContent = function () {
        if (this._currentDataList && this._currentDataList.length > 0) {
            for (var i = 0; i < this._rankSize; i++) {
                var itemData = this._currentDataList[i];
                if (itemData) {
                    var itemNode = M_1.default.nodePool.createItem(this._currentItemPrefab);
                    itemNode.y = -(i * itemNode.height + (10 + itemNode.height / 2) + (i * 5));
                    itemNode.parent = this.content;
                    itemNode['index'] = i;
                    itemNode.getComponent(this._currentCtrl).init(itemData);
                    this._endNode = itemNode;
                }
            }
            var size = this._currentDataList.length;
            // this._endNode = this.content.children[this._rankSize - 1];
            this._startNode = this.content.children[0];
            this.content.height = (size * this._currentItemPrefab.data.height) + (size * 5) + 10;
        }
        else {
            //显示没有数据!!
        }
    };
    RankPanelCtrl.prototype._cleanView = function () {
        this.content.removeAllChildren();
    };
    RankPanelCtrl.prototype._initSelfDisplay = function (myData) {
        var _this = this;
        if (myData) {
            this.selfRankNode.active = true;
            //分数
            this.selfScore.string = myData.score || '0';
            //赞...
            this.selfLv.string = "" + (myData.appreciate || 0);
            this.selfRank.string = this._myRank > 100 ? '99+' : this._myRank.toString();
            M_1.default.platform.getUserInfo().then(function (userdata) {
                if (userdata && userdata.avatarUrl) {
                    Common_1.default.getRemotPic(userdata.avatarUrl).then(function (frame) {
                        frame && (_this.selfIcon.spriteFrame = frame);
                    });
                }
            });
        }
        else {
            this.selfRankNode.active = false;
        }
    };
    RankPanelCtrl.prototype.onCloseBtnClick = function () {
        M_1.default.ui.hideUI(UIData_1.UIHudDef.FriendRank);
    };
    RankPanelCtrl.prototype.onScrollCallBack = function (a, b, c) {
        if (!this._currentDataList)
            return;
        for (var i = this.content.children.length; i--;) {
            var node = this.content.children[i];
            if (node.active) {
                var pos = this.content.parent.convertToNodeSpaceAR(Common_1.default.getWorldPos(node));
                //先处理下移时,上节点的处理.
                if (pos.y >= (node.height / 2 + 10)) {
                    //已经可以被移到下面! 
                    var nextIndex = this._endNode['index'] + 1;
                    var data = this._currentDataList[nextIndex];
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
            var startPos = this.content.parent.convertToNodeSpaceAR(Common_1.default.getWorldPos(this._startNode));
            //将最下的拉上来
            if (startPos.y + this._startNode.height / 2 + 10 < 0) {
                var data = this._currentDataList[this._startNode['index'] - 1];
                if (data) {
                    //移交最后一个位置 
                    var tempNode = this._endNode;
                    this._endNode = this._getNodeByIndex(this._endNode['index'] - 1);
                    tempNode.y = this._startNode.y + (this._startNode.height + 5);
                    tempNode['index'] = this._startNode['index'] - 1;
                    tempNode.getComponent(this._currentCtrl).init(data);
                    //移交startNode
                    this._startNode = tempNode;
                }
            }
        }
    };
    //待优化
    RankPanelCtrl.prototype._getNodeByIndex = function (index) {
        var result = null;
        for (var i = this.content.children.length; i--;) {
            var node = this.content.children[i];
            if (node['index'] == index) {
                result = node;
                break;
            }
        }
        return result;
    };
    RankPanelCtrl.prototype._showRedDot = function (count) {
        if (count === void 0) { count = 0; }
        if (count) {
            this.visitRedNode.active = true;
            this.visitCountLab.string = count.toString();
        }
        else {
            this.visitRedNode.active = false;
        }
    };
    RankPanelCtrl.prototype.onShareClick = function () {
        M_1.default.platform.share('看看我的好友吧!!!', Paths_1.default.ShareImgPath + "level_share_45.png");
    };
    RankPanelCtrl.prototype.onSwitchBtnClick = function (event, customValue) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, i, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = customValue;
                        switch (_a) {
                            case '0': return [3 /*break*/, 1];
                            case '1': return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 8];
                    case 1:
                        this.friendView.active = true;
                        this.visitView.active = false;
                        this.content = this.friendContent;
                        this._currentCtrl = 'FriendRankItemCtrl';
                        this._currentItemPrefab = this.itemPrefab;
                        if (!!this._friendList) return [3 /*break*/, 3];
                        //请求好友信息
                        _b = this;
                        return [4 /*yield*/, M_1.default.net.getFriendList()];
                    case 2:
                        //请求好友信息
                        _b._friendList = _d.sent();
                        if (this._friendList.list) {
                            this._friendList.list.sort(function (a, b) {
                                return b.score - a.score;
                            });
                            for (i = this._friendList.list.length; i--;) {
                                if (this._friendList.list[i].id == M_1.default.runtime.UserId) {
                                    this._myRank = (i + 1);
                                    break;
                                }
                            }
                        }
                        _d.label = 3;
                    case 3:
                        console.error('this._friendList:', this._friendList);
                        if (this._friendList) {
                            this._initSelfDisplay(this._friendList.myrank);
                        }
                        this._currentDataList = this._friendList.list;
                        return [3 /*break*/, 8];
                    case 4:
                        this.friendView.active = false;
                        this.visitView.active = true;
                        this.selfRankNode.active = false;
                        this.content = this.visitContent;
                        this._currentCtrl = 'VistItemCtrl';
                        this._currentItemPrefab = this.visitItemPrefab;
                        if (!!this._interactiveList) return [3 /*break*/, 6];
                        //请求事件信息
                        _c = this;
                        return [4 /*yield*/, M_1.default.net.getInteractiveList()];
                    case 5:
                        //请求事件信息
                        _c._interactiveList = _d.sent();
                        this._interactiveList && this._interactiveList.sort(function (a, b) {
                            return b.created_at - a.created_at;
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        this._currentDataList;
                        _d.label = 7;
                    case 7:
                        console.error('this._interactiveList:', this._interactiveList);
                        this._currentDataList = this._interactiveList;
                        return [3 /*break*/, 8];
                    case 8:
                        this._currentSelectView = customValue;
                        this.show();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        property(cc.Node)
    ], RankPanelCtrl.prototype, "friendContent", void 0);
    __decorate([
        property(cc.Node)
    ], RankPanelCtrl.prototype, "visitContent", void 0);
    __decorate([
        property(cc.Prefab)
    ], RankPanelCtrl.prototype, "itemPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], RankPanelCtrl.prototype, "visitItemPrefab", void 0);
    __decorate([
        property(cc.Label)
    ], RankPanelCtrl.prototype, "selfLv", void 0);
    __decorate([
        property(cc.Label)
    ], RankPanelCtrl.prototype, "selfScore", void 0);
    __decorate([
        property(cc.Label)
    ], RankPanelCtrl.prototype, "selfRank", void 0);
    __decorate([
        property(cc.Sprite)
    ], RankPanelCtrl.prototype, "selfIcon", void 0);
    __decorate([
        property(cc.Node)
    ], RankPanelCtrl.prototype, "visitRedNode", void 0);
    __decorate([
        property(cc.Label)
    ], RankPanelCtrl.prototype, "visitCountLab", void 0);
    __decorate([
        property(cc.Node)
    ], RankPanelCtrl.prototype, "friendView", void 0);
    __decorate([
        property(cc.Node)
    ], RankPanelCtrl.prototype, "visitView", void 0);
    __decorate([
        property(cc.Node)
    ], RankPanelCtrl.prototype, "selfRankNode", void 0);
    RankPanelCtrl = __decorate([
        ccclass
    ], RankPanelCtrl);
    return RankPanelCtrl;
}(UIBase_1.default));
exports.default = RankPanelCtrl;

cc._RF.pop();