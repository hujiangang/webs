"use strict";
cc._RF.push(module, 'e6116Ek6phKq4ba3e2Q6X82', 'RankPanelCtrl');
// Script/Views/LevelMap/RankPanelCtrl.ts

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
var UIBase_1 = require("../../Base/UI/UIBase");
var M_1 = require("../../Base/Manager/M");
var RankItemCtrl_1 = require("./RankItemCtrl");
var Common_1 = require("../../Logic/Common/Common");
var UIData_1 = require("../../Logic/Data/Interface/UIData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankPanelCtrl = /** @class */ (function (_super) {
    __extends(RankPanelCtrl, _super);
    function RankPanelCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.itemPrefab = null;
        _this.selfLv = null;
        _this.selfScore = null;
        _this.selfRank = null;
        _this.selfIcon = null;
        _this.operatingHead = null;
        _this.rankScrollView = null;
        _this._rankData = null;
        _this._itemPool = null;
        _this._animation = null;
        _this._rankSize = 6;
        _this._endNode = null;
        _this._startNode = null;
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
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, M_1.default.net.getRankData()];
                    case 1:
                        _a._rankData = _b.sent();
                        if (this._rankData) {
                            this._cleanView();
                            this._initView();
                        }
                        this.show();
                        return [2 /*return*/];
                }
            });
        });
    };
    RankPanelCtrl.prototype.show = function () {
        this.node.active = true;
        this._animation.play('ShowSelectLevel');
    };
    RankPanelCtrl.prototype._initView = function () {
        this._initSelfDisplay(this._rankData.my);
        this._initOperatingHead();
        this._initRankContent();
    };
    RankPanelCtrl.prototype._initRankContent = function () {
        for (var i = 0; i < this._rankSize; i++) {
            var itemData = this._rankData.list[i];
            var itemNode = M_1.default.nodePool.createItem(this.itemPrefab);
            itemNode.y = -(i * itemNode.height + (10 + itemNode.height / 2) + (i * 5));
            itemNode.parent = this.content;
            itemNode['index'] = i;
            itemNode.getComponent(RankItemCtrl_1.default).init(itemData);
        }
        var size = this._rankData.list.length;
        this._endNode = this.content.children[this._rankSize - 1];
        this._startNode = this.content.children[0];
        this.content.height = (size * this.itemPrefab.data.height) + (size * 5) + 10;
    };
    RankPanelCtrl.prototype._cleanView = function () {
        this.content.removeAllChildren();
    };
    RankPanelCtrl.prototype._initSelfDisplay = function (myData) {
        var _this = this;
        if (myData) {
            var rd = Common_1.default.parseRankData(myData.value);
            this.selfScore.string = rd.score.toString();
            this.selfLv.string = rd.level + "\u5173";
            this.selfRank.string = myData.rank <= 0 ? '未上榜' : myData.rank.toString();
        }
        M_1.default.platform.getUserInfo().then(function (userdata) {
            if (userdata && userdata.avatarUrl) {
                Common_1.default.getRemotPic(userdata.avatarUrl).then(function (frame) {
                    frame && (_this.selfIcon.spriteFrame = frame);
                });
            }
        });
    };
    RankPanelCtrl.prototype._initOperatingHead = function () {
        var _this = this;
        M_1.default.runtime.getServerConfig().then(function (config) {
            if (config && config.rank_banner) {
                Common_1.default.getRemotPic(config.rank_banner, null, 'png').then(function (frame) {
                    frame && (_this.operatingHead.spriteFrame = frame);
                });
            }
        });
    };
    RankPanelCtrl.prototype.onCloseBtnClick = function () {
        var _this = this;
        this._animation.play('HideSelectLevel');
        this.scheduleOnce(function () {
            _this.node.active = false;
        }, 0.30);
    };
    RankPanelCtrl.prototype.onOperatingHeadClick = function () {
        //展示公告!
        M_1.default.ui.showUI(UIData_1.UIHudDef.NoticePanel);
    };
    RankPanelCtrl.prototype.onScrollCallBack = function (a, b, c) {
        for (var i = this.content.children.length; i--;) {
            var node = this.content.children[i];
            if (node.active) {
                var pos = this.content.parent.convertToNodeSpaceAR(Common_1.default.getWorldPos(node));
                //先处理下移时,上节点的处理.
                if (pos.y >= (node.height / 2 + 10)) {
                    //已经可以被移到下面! 
                    var nextIndex = this._endNode['index'] + 1;
                    var data = this._rankData.list[nextIndex];
                    if (data) {
                        node.active = false;
                        this._startNode = this._getNodeByIndex(node['index'] + 1);
                        node['index'] = nextIndex;
                        node.getComponent(RankItemCtrl_1.default).init(data);
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
                var data = this._rankData.list[this._startNode['index'] - 1];
                if (data) {
                    //移交最后一个位置 
                    var tempNode = this._endNode;
                    this._endNode = this._getNodeByIndex(this._endNode['index'] - 1);
                    tempNode.y = this._startNode.y + (this._startNode.height + 5);
                    tempNode.getComponent(RankItemCtrl_1.default).init(data);
                    tempNode['index'] = this._startNode['index'] - 1;
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
    RankPanelCtrl.prototype.start = function () {
    };
    RankPanelCtrl.prototype.update = function (dt) {
    };
    __decorate([
        property(cc.Node)
    ], RankPanelCtrl.prototype, "content", void 0);
    __decorate([
        property(cc.Prefab)
    ], RankPanelCtrl.prototype, "itemPrefab", void 0);
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
        property(cc.Sprite)
    ], RankPanelCtrl.prototype, "operatingHead", void 0);
    __decorate([
        property(cc.ScrollView)
    ], RankPanelCtrl.prototype, "rankScrollView", void 0);
    RankPanelCtrl = __decorate([
        ccclass
    ], RankPanelCtrl);
    return RankPanelCtrl;
}(UIBase_1.default));
exports.default = RankPanelCtrl;

cc._RF.pop();