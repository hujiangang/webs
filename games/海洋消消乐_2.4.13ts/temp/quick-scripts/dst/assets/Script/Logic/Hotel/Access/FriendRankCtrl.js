
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Hotel/Access/FriendRankCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcSG90ZWxcXEFjY2Vzc1xcRnJpZW5kUmFua0N0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXdDO0FBQ3hDLDhDQUF5QztBQUV6QyxrREFBNkM7QUFDN0Msc0RBQXVEO0FBRXZELG1EQUE4QztBQUV4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUk1QztJQUEyQyxpQ0FBTTtJQUFqRDtRQUFBLHFFQTJUQztRQXhURyxtQkFBYSxHQUFZLElBQUksQ0FBQztRQUc5QixrQkFBWSxHQUFZLElBQUksQ0FBQztRQUc3QixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixxQkFBZSxHQUFjLElBQUksQ0FBQztRQUdsQyxZQUFNLEdBQWEsSUFBSSxDQUFDO1FBR3hCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsY0FBUSxHQUFhLElBQUksQ0FBQztRQUcxQixjQUFRLEdBQWMsSUFBSSxDQUFDO1FBRzNCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRzdCLG1CQUFhLEdBQWEsSUFBSSxDQUFDO1FBRy9CLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFFckIsZUFBUyxHQUFtQixJQUFJLENBQUM7UUFFakMsZ0JBQVUsR0FBaUIsSUFBSSxDQUFDO1FBRWhDLGVBQVMsR0FBRyxDQUFDLENBQUM7UUFFZCxjQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFFeEIsd0JBQWtCLEdBQVcsSUFBSSxDQUFDO1FBRWxDLHdCQUFrQixHQUFjLElB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QyxNQUFNLENBQUM7MERBQ2M7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztpREFDSztJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNRO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7bURBQ087SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDTztJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNXO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ1k7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDUztJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ1c7SUF2Q1osYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQTJUakM7SUFBRCxvQkFBQztDQTNURCxBQTJUQyxDQTNUMEMsZ0JBQU0sR0EyVGhEO2tCQTNUb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IENvbW1vbiBmcm9tIFwiLi4vLi4vQ29tbW9uL0NvbW1vblwiO1xuaW1wb3J0IEZyaWVuZFJhbmtJdGVtQ3RybCBmcm9tIFwiLi9GcmllbmRSYW5rSXRlbUN0cmxcIjtcbmltcG9ydCBVSUJhc2UgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvVUkvVUlCYXNlXCI7XG5pbXBvcnQgeyBVSUh1ZERlZiB9IGZyb20gXCIuLi8uLi9EYXRhL0ludGVyZmFjZS9VSURhdGFcIjtcbmltcG9ydCB2aXN0SXRlbUN0cmwgZnJvbSBcIi4vdmlzdEl0ZW1DdHJsXCI7XG5pbXBvcnQgUGF0aHMgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvVXRpbHMvUGF0aHNcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFua1BhbmVsQ3RybCBleHRlbmRzIFVJQmFzZSB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBmcmllbmRDb250ZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHZpc2l0Q29udGVudDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGl0ZW1QcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHZpc2l0SXRlbVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzZWxmTHY6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzZWxmU2NvcmU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBzZWxmUmFuazogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBzZWxmSWNvbjogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHZpc2l0UmVkTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdmlzaXRDb3VudExhYjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgZnJpZW5kVmlldzogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB2aXNpdFZpZXc6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2VsZlJhbmtOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2l0ZW1Qb29sOiBBcnJheTxjYy5Ob2RlPiA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9hbmltYXRpb246IGNjLkFuaW1hdGlvbiA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9yYW5rU2l6ZSA9IDY7XG5cbiAgICBwcml2YXRlIF9lbmROb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIHByaXZhdGUgX3N0YXJ0Tm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBwcml2YXRlIGNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfY3VycmVudFNlbGVjdFZpZXc6IHN0cmluZyA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9jdXJyZW50SXRlbVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2N1cnJlbnREYXRhTGlzdDogQXJyYXk8YW55PiA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9jdXJyZW50Q3RybDogc3RyaW5nID0gbnVsbDtcblxuICAgIHByaXZhdGUgX215UmFuazogbnVtYmVyID0gMTAwO1xuXG4gICAgLyoq5aW95Y+L5YiX6KGoICovXG4gICAgcHJpdmF0ZSBfZnJpZW5kTGlzdDogeyBteXJhbms6IHsgcmFuazogbnVtYmVyLCBzY29yZTogc3RyaW5nIH0sIGxpc3Q6IEFycmF5PHsgaWQ6IG51bWJlciwgX2hvdGVsRGF0YXM6IGFueSwgbmlja25hbWU6IHN0cmluZywgc2NvcmU6IG51bWJlciwgYXZhdGFyX3VybDogc3RyaW5nIH0+IH0gPSBudWxsO1xuICAgIC8qKuS6kuWKqOWIl+ihqCAqL1xuICAgIHByaXZhdGUgX2ludGVyYWN0aXZlTGlzdDogQXJyYXk8eyBvcGVyYXRvcjogbnVtYmVyLCBldmVudDogbnVtYmVyLCBuaWNrbmFtZTogc3RyaW5nLCBhdmF0YXJfdXJsOiBzdHJpbmcsIGNyZWF0ZWRfYXQ6IG51bWJlciB9PiA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICAvLyB0aGlzLm9uSW5pdCgpXG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbiA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25Jbml0KCkge1xuXG4gICAgICAgIC8v6I635Y+W5pWw5o2uIVxuICAgICAgICB0aGlzLl9pbml0RGF0YSgpO1xuICAgICAgICBpZiAoIXRoaXMuX2l0ZW1Qb29sKSB7XG4gICAgICAgICAgICB0aGlzLl9pdGVtUG9vbCA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb24gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIF9pbml0RGF0YSgpIHtcblxuICAgICAgICBpZiAoIXRoaXMuX2N1cnJlbnRTZWxlY3RWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U2VsZWN0VmlldyA9ICcwJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8v6L+Z6YeM5bqU6K+l5Y+M5Lu95pWw5o2uICAgXG4gICAgICAgIC8vIGlmICh0aGlzLl9yYW5rRGF0YSkge1xuICAgICAgICAvLyAgICAgdGhpcy5fY2xlYW5WaWV3KCk7XG4gICAgICAgIC8vICAgICB0aGlzLl9pbml0VmlldygpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHRoaXMuc2hvdygpO1xuXG4gICAgICAgIHRoaXMub25Td2l0Y2hCdG5DbGljayhudWxsLCB0aGlzLl9jdXJyZW50U2VsZWN0Vmlldyk7XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSBfcHJlTG9hZEFjY0RhdGEoKSB7XG4gICAgLy8gICAgIC8v6K+35rGC6K6/5a6i5L+h5oGvXG4gICAgLy8gICAgIE0ubmV0LmdldE9ubGluZUxpc3QoKS50aGVuKChkYXRhOiBBcnJheTx7IGlkOiBudW1iZXIsIG5pY2tuYW1lOiBzdHJpbmcsIGF2YXRhcl91cmw6IHN0cmluZyB9PikgPT4ge1xuICAgIC8vICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLl92aXNpdExpc3QgPSBkYXRhO1xuICAgIC8vICAgICAgICAgICAgIC8vIHRoaXMudmlzaXRDb3VudExhYmVsLnN0cmluZyA9IHRoaXMuX3Zpc2l0TGlzdC5sZW5ndGgudG9TdHJpbmcoKTtcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICAgICAgLy8gdGhpcy52aXNpdENvdW50TGFiZWwuc3RyaW5nID0gJzAnO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KTtcbiAgICAvLyAgICAgLy/or7fmsYLlpb3lj4vkv6Hmga9cbiAgICAvLyAgICAgTS5uZXQuZ2V0RnJpZW5kTGlzdCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgLy8gICAgICAgICB0aGlzLl9mcmllbmRMaXN0ID0gZGF0YTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICAgIC8v6K+35rGC5LqL5Lu25L+h5oGvXG4gICAgLy8gICAgIE0ubmV0LmdldEludGVyYWN0aXZlTGlzdCgpLnRoZW4oZGF0YSA9PiB7XG4gICAgLy8gICAgICAgICB0aGlzLl9pbnRlcmFjdGl2ZUxpc3QgPSBkYXRhO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyB9XG5cbiAgICBwdWJsaWMgc2hvdygpIHtcbiAgICAgICAgLy8gdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2NsZWFuVmlldygpO1xuICAgICAgICB0aGlzLl9pbml0VmlldygpO1xuICAgIH1cblxuICAgIG9uSGlkZSgpIHtcbiAgICAgICAgdGhpcy5fZnJpZW5kTGlzdCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2ludGVyYWN0aXZlTGlzdCA9IG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdFZpZXcoKSB7XG4gICAgICAgIC8vIHRoaXMuX2luaXRTZWxmRGlzcGxheSh0aGlzLl9yYW5rRGF0YS5teSk7XG5cbiAgICAgICAgdGhpcy5faW5pdFJhbmtDb250ZW50KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdFJhbmtDb250ZW50KCkge1xuICAgICAgICBpZiAodGhpcy5fY3VycmVudERhdGFMaXN0ICYmIHRoaXMuX2N1cnJlbnREYXRhTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3JhbmtTaXplOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtRGF0YSA9IHRoaXMuX2N1cnJlbnREYXRhTGlzdFtpXTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbURhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbU5vZGUgPSBNLm5vZGVQb29sLmNyZWF0ZUl0ZW0odGhpcy5fY3VycmVudEl0ZW1QcmVmYWIpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtTm9kZS55ID0gLShpICogaXRlbU5vZGUuaGVpZ2h0ICsgKDEwICsgaXRlbU5vZGUuaGVpZ2h0IC8gMikgKyAoaSAqIDUpKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbU5vZGUucGFyZW50ID0gdGhpcy5jb250ZW50O1xuICAgICAgICAgICAgICAgICAgICBpdGVtTm9kZVsnaW5kZXgnXSA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1Ob2RlLmdldENvbXBvbmVudCh0aGlzLl9jdXJyZW50Q3RybCkuaW5pdChpdGVtRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VuZE5vZGUgPSBpdGVtTm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzaXplID0gdGhpcy5fY3VycmVudERhdGFMaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIC8vIHRoaXMuX2VuZE5vZGUgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5bdGhpcy5fcmFua1NpemUgLSAxXTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0Tm9kZSA9IHRoaXMuY29udGVudC5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5oZWlnaHQgPSAoc2l6ZSAqIHRoaXMuX2N1cnJlbnRJdGVtUHJlZmFiLmRhdGEuaGVpZ2h0KSArIChzaXplICogNSkgKyAxMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v5pi+56S65rKh5pyJ5pWw5o2uISFcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2xlYW5WaWV3KCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0U2VsZkRpc3BsYXkobXlEYXRhOiB7IGFwcHJlY2lhdGU6IHN0cmluZyB8IG51bWJlciwgcmFuazogbnVtYmVyLCBzY29yZTogc3RyaW5nIH0pIHtcbiAgICAgICAgaWYgKG15RGF0YSkge1xuICAgICAgICAgICAgdGhpcy5zZWxmUmFua05vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIC8v5YiG5pWwXG4gICAgICAgICAgICB0aGlzLnNlbGZTY29yZS5zdHJpbmcgPSBteURhdGEuc2NvcmUgfHwgJzAnO1xuICAgICAgICAgICAgLy/otZ4uLi5cbiAgICAgICAgICAgIHRoaXMuc2VsZkx2LnN0cmluZyA9IGAke215RGF0YS5hcHByZWNpYXRlIHx8IDB9YDtcblxuICAgICAgICAgICAgdGhpcy5zZWxmUmFuay5zdHJpbmcgPSB0aGlzLl9teVJhbmsgPiAxMDAgPyAnOTkrJyA6IHRoaXMuX215UmFuay50b1N0cmluZygpO1xuICAgICAgICAgICAgTS5wbGF0Zm9ybS5nZXRVc2VySW5mbygpLnRoZW4oKHVzZXJkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXJkYXRhICYmIHVzZXJkYXRhLmF2YXRhclVybCkge1xuICAgICAgICAgICAgICAgICAgICBDb21tb24uZ2V0UmVtb3RQaWModXNlcmRhdGEuYXZhdGFyVXJsKS50aGVuKChmcmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWUgJiYgKHRoaXMuc2VsZkljb24uc3ByaXRlRnJhbWUgPSBmcmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGZSYW5rTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xvc2VCdG5DbGljaygpIHtcbiAgICAgICAgTS51aS5oaWRlVUkoVUlIdWREZWYuRnJpZW5kUmFuayk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2Nyb2xsQ2FsbEJhY2soYSwgYiwgYykge1xuICAgICAgICBpZiAoIXRoaXMuX2N1cnJlbnREYXRhTGlzdCkgcmV0dXJuO1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5jb250ZW50LmNoaWxkcmVuLmxlbmd0aDsgaS0tOykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuY29udGVudC5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChub2RlLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvcyA9IHRoaXMuY29udGVudC5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIoQ29tbW9uLmdldFdvcmxkUG9zKG5vZGUpKTtcbiAgICAgICAgICAgICAgICAvL+WFiOWkhOeQhuS4i+enu+aXtizkuIroioLngrnnmoTlpITnkIYuXG4gICAgICAgICAgICAgICAgaWYgKHBvcy55ID49IChub2RlLmhlaWdodCAvIDIgKyAxMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/lt7Lnu4/lj6/ku6Xooqvnp7vliLDkuIvpnaIhIFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0SW5kZXggPSB0aGlzLl9lbmROb2RlWydpbmRleCddICsgMTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX2N1cnJlbnREYXRhTGlzdFtuZXh0SW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0Tm9kZSA9IHRoaXMuX2dldE5vZGVCeUluZGV4KG5vZGVbJ2luZGV4J10gKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVbJ2luZGV4J10gPSBuZXh0SW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCh0aGlzLl9jdXJyZW50Q3RybCkuaW5pdChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUueSA9IHRoaXMuX2VuZE5vZGUueSAtIChub2RlLmhlaWdodCArIDUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW5kTm9kZSA9IG5vZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc3RhcnROb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydFBvcyA9IHRoaXMuY29udGVudC5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIoQ29tbW9uLmdldFdvcmxkUG9zKHRoaXMuX3N0YXJ0Tm9kZSkpO1xuICAgICAgICAgICAgLy/lsIbmnIDkuIvnmoTmi4nkuIrmnaVcbiAgICAgICAgICAgIGlmIChzdGFydFBvcy55ICsgdGhpcy5fc3RhcnROb2RlLmhlaWdodCAvIDIgKyAxMCA8IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5fY3VycmVudERhdGFMaXN0W3RoaXMuX3N0YXJ0Tm9kZVsnaW5kZXgnXSAtIDFdO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIC8v56e75Lqk5pyA5ZCO5LiA5Liq5L2N572uIFxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wTm9kZSA9IHRoaXMuX2VuZE5vZGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VuZE5vZGUgPSB0aGlzLl9nZXROb2RlQnlJbmRleCh0aGlzLl9lbmROb2RlWydpbmRleCddIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnkgPSB0aGlzLl9zdGFydE5vZGUueSArICh0aGlzLl9zdGFydE5vZGUuaGVpZ2h0ICsgNSk7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlWydpbmRleCddID0gdGhpcy5fc3RhcnROb2RlWydpbmRleCddIC0gMVxuICAgICAgICAgICAgICAgICAgICB0ZW1wTm9kZS5nZXRDb21wb25lbnQodGhpcy5fY3VycmVudEN0cmwpLmluaXQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIC8v56e75Lqkc3RhcnROb2RlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0Tm9kZSA9IHRlbXBOb2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5b6F5LyY5YyWXG4gICAgcHJpdmF0ZSBfZ2V0Tm9kZUJ5SW5kZXgoaW5kZXg6IG51bWJlcik6IGNjLk5vZGUge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuY29udGVudC5jaGlsZHJlbi5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAobm9kZVsnaW5kZXgnXSA9PSBpbmRleCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5vZGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zaG93UmVkRG90KGNvdW50OiBudW1iZXIgPSAwKSB7XG4gICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgICAgdGhpcy52aXNpdFJlZE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudmlzaXRDb3VudExhYi5zdHJpbmcgPSBjb3VudC50b1N0cmluZygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52aXNpdFJlZE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25TaGFyZUNsaWNrKCkge1xuICAgICAgICBNLnBsYXRmb3JtLnNoYXJlKCfnnIvnnIvmiJHnmoTlpb3lj4vlkKchISEnLCBQYXRocy5TaGFyZUltZ1BhdGggKyBcImxldmVsX3NoYXJlXzQ1LnBuZ1wiKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgb25Td2l0Y2hCdG5DbGljayhldmVudCwgY3VzdG9tVmFsdWUpIHtcbiAgICAgICAgc3dpdGNoIChjdXN0b21WYWx1ZSkge1xuICAgICAgICAgICAgY2FzZSAnMCc6XG4gICAgICAgICAgICAgICAgdGhpcy5mcmllbmRWaWV3LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy52aXNpdFZpZXcuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5mcmllbmRDb250ZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRDdHJsID0gJ0ZyaWVuZFJhbmtJdGVtQ3RybCc7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudEl0ZW1QcmVmYWIgPSB0aGlzLml0ZW1QcmVmYWI7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9mcmllbmRMaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8v6K+35rGC5aW95Y+L5L+h5oGvXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZyaWVuZExpc3QgPSBhd2FpdCBNLm5ldC5nZXRGcmllbmRMaXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9mcmllbmRMaXN0Lmxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZyaWVuZExpc3QubGlzdC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGIuc2NvcmUgLSBhLnNjb3JlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fZnJpZW5kTGlzdC5saXN0Lmxlbmd0aDsgaS0tOykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9mcmllbmRMaXN0Lmxpc3RbaV0uaWQgPT0gTS5ydW50aW1lLlVzZXJJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9teVJhbmsgPSAoaSArIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcigndGhpcy5fZnJpZW5kTGlzdDonLCB0aGlzLl9mcmllbmRMaXN0KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZnJpZW5kTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0U2VsZkRpc3BsYXkoPGFueT50aGlzLl9mcmllbmRMaXN0Lm15cmFuayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnREYXRhTGlzdCA9IHRoaXMuX2ZyaWVuZExpc3QubGlzdDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgICAgIHRoaXMuZnJpZW5kVmlldy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2l0Vmlldy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZlJhbmtOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMudmlzaXRDb250ZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRDdHJsID0gJ1Zpc3RJdGVtQ3RybCc7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudEl0ZW1QcmVmYWIgPSB0aGlzLnZpc2l0SXRlbVByZWZhYjtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2ludGVyYWN0aXZlTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAvL+ivt+axguS6i+S7tuS/oeaBr1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcmFjdGl2ZUxpc3QgPSBhd2FpdCBNLm5ldC5nZXRJbnRlcmFjdGl2ZUxpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW50ZXJhY3RpdmVMaXN0ICYmIHRoaXMuX2ludGVyYWN0aXZlTGlzdC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYi5jcmVhdGVkX2F0IC0gYS5jcmVhdGVkX2F0O1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnREYXRhTGlzdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCd0aGlzLl9pbnRlcmFjdGl2ZUxpc3Q6JywgdGhpcy5faW50ZXJhY3RpdmVMaXN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50RGF0YUxpc3QgPSB0aGlzLl9pbnRlcmFjdGl2ZUxpc3RcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRTZWxlY3RWaWV3ID0gY3VzdG9tVmFsdWU7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cblxufVxuIl19