
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Views/LevelMap/RankPanelCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxWaWV3c1xcTGV2ZWxNYXBcXFJhbmtQYW5lbEN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBDO0FBQzFDLDBDQUFxQztBQUNyQywrQ0FBMEM7QUFDMUMsb0RBQStDO0FBQy9DLDREQUE2RDtBQUV2RCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQVE1QztJQUEyQyxpQ0FBTTtJQUFqRDtRQUFBLHFFQWtNQztRQS9MRyxhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLFlBQU0sR0FBYSxJQUFJLENBQUM7UUFHeEIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGNBQVEsR0FBYyxJQUFJLENBQUM7UUFHM0IsbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFHaEMsb0JBQWMsR0FBa0IsSUFBSSxDQUFDO1FBRTdCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFFM0IsZUFBUyxHQUFtQixJQUFJLENBQUM7UUFFakMsZ0JBQVUsR0FBaUIsSUFBSSxDQUFDO1FBRWhDLGVBQVMsR0FBRyxDQUFDLENBQUM7UUFFZCxjQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLGdCQUFVLEdBQVksSUFBSSxDQUFDOztJQStKdkMsQ0FBQztJQTdKRyw4QkFBTSxHQUFOO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVNLDhCQUFNLEdBQWI7UUFDSSxPQUFPO1FB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RUFBRSxDQUFDLElBQUksQ0FBQztrREFDTTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNTO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7aURBQ0s7SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztvREFDUTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO21EQUNPO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ087SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt3REFDWTtJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDO3lEQUNhO0lBeEJwQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBa01qQztJQUFELG9CQUFDO0NBbE1ELEFBa01DLENBbE0wQyxnQkFBTSxHQWtNaEQ7a0JBbE1vQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVJQmFzZSBmcm9tIFwiLi4vLi4vQmFzZS9VSS9VSUJhc2VcIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IFJhbmtJdGVtQ3RybCBmcm9tIFwiLi9SYW5rSXRlbUN0cmxcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uL0xvZ2ljL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCB7IFVJSHVkRGVmIH0gZnJvbSBcIi4uLy4uL0xvZ2ljL0RhdGEvSW50ZXJmYWNlL1VJRGF0YVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5pbnRlcmZhY2UgUmFua0RhdGEge1xuICAgIG15OiB7IHJhbms6IG51bWJlciwgdmFsdWU6IG51bWJlciwgZXh0cmE6IGFueSB9O1xuICAgIGxpc3Q6IEFycmF5PHsgcmFuazogbnVtYmVyLCB1aWQ6IG51bWJlciwgbmlja25hbWU6IHN0cmluZywgYXZhdGFyX3VybDogc3RyaW5nLCB2YWx1ZTogbnVtYmVyLCBleHRyYTogYW55IH0+XG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5rUGFuZWxDdHJsIGV4dGVuZHMgVUlCYXNlIHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBpdGVtUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHNlbGZMdjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHNlbGZTY29yZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHNlbGZSYW5rOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHNlbGZJY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBvcGVyYXRpbmdIZWFkOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNjcm9sbFZpZXcpXG4gICAgcmFua1Njcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXcgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfcmFua0RhdGE6IFJhbmtEYXRhID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2l0ZW1Qb29sOiBBcnJheTxjYy5Ob2RlPiA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9hbmltYXRpb246IGNjLkFuaW1hdGlvbiA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9yYW5rU2l6ZSA9IDY7XG5cbiAgICBwcml2YXRlIF9lbmROb2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBwcml2YXRlIF9zdGFydE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICAgICAgLy8gdGhpcy5vbkluaXQoKVxuICAgICAgICB0aGlzLl9hbmltYXRpb24gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgfVxuXG4gICAgcHVibGljIG9uSW5pdCgpIHtcbiAgICAgICAgLy/ojrflj5bmlbDmja4hXG4gICAgICAgIHRoaXMuX2luaXREYXRhKCk7XG4gICAgICAgIGlmICghdGhpcy5faXRlbVBvb2wpIHtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1Qb29sID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9hbmltYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbiA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgX2luaXREYXRhKCkge1xuICAgICAgICB0aGlzLl9yYW5rRGF0YSA9IGF3YWl0IE0ubmV0LmdldFJhbmtEYXRhKCk7XG4gICAgICAgIGlmICh0aGlzLl9yYW5rRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5fY2xlYW5WaWV3KCk7XG4gICAgICAgICAgICB0aGlzLl9pbml0VmlldygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoJ1Nob3dTZWxlY3RMZXZlbCcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRWaWV3KCkge1xuICAgICAgICB0aGlzLl9pbml0U2VsZkRpc3BsYXkodGhpcy5fcmFua0RhdGEubXkpO1xuICAgICAgICB0aGlzLl9pbml0T3BlcmF0aW5nSGVhZCgpO1xuICAgICAgICB0aGlzLl9pbml0UmFua0NvbnRlbnQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0UmFua0NvbnRlbnQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcmFua1NpemU7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaXRlbURhdGEgPSB0aGlzLl9yYW5rRGF0YS5saXN0W2ldO1xuICAgICAgICAgICAgY29uc3QgaXRlbU5vZGUgPSBNLm5vZGVQb29sLmNyZWF0ZUl0ZW0odGhpcy5pdGVtUHJlZmFiKTtcbiAgICAgICAgICAgIGl0ZW1Ob2RlLnkgPSAtKGkgKiBpdGVtTm9kZS5oZWlnaHQgKyAoMTAgKyBpdGVtTm9kZS5oZWlnaHQgLyAyKSArIChpICogNSkpO1xuICAgICAgICAgICAgaXRlbU5vZGUucGFyZW50ID0gdGhpcy5jb250ZW50O1xuICAgICAgICAgICAgaXRlbU5vZGVbJ2luZGV4J10gPSBpO1xuICAgICAgICAgICAgaXRlbU5vZGUuZ2V0Q29tcG9uZW50KFJhbmtJdGVtQ3RybCkuaW5pdChpdGVtRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMuX3JhbmtEYXRhLmxpc3QubGVuZ3RoO1xuICAgICAgICB0aGlzLl9lbmROb2RlID0gdGhpcy5jb250ZW50LmNoaWxkcmVuW3RoaXMuX3JhbmtTaXplIC0gMV07XG4gICAgICAgIHRoaXMuX3N0YXJ0Tm9kZSA9IHRoaXMuY29udGVudC5jaGlsZHJlblswXTtcbiAgICAgICAgdGhpcy5jb250ZW50LmhlaWdodCA9IChzaXplICogdGhpcy5pdGVtUHJlZmFiLmRhdGEuaGVpZ2h0KSArIChzaXplICogNSkgKyAxMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jbGVhblZpZXcoKSB7XG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRTZWxmRGlzcGxheShteURhdGE6IHsgcmFuazogbnVtYmVyLCB2YWx1ZTogbnVtYmVyLCBleHRyYTogYW55IH0pIHtcbiAgICAgICAgaWYgKG15RGF0YSkge1xuICAgICAgICAgICAgY29uc3QgcmQgPSBDb21tb24ucGFyc2VSYW5rRGF0YShteURhdGEudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5zZWxmU2NvcmUuc3RyaW5nID0gcmQuc2NvcmUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZkx2LnN0cmluZyA9IGAke3JkLmxldmVsfeWFs2A7XG4gICAgICAgICAgICB0aGlzLnNlbGZSYW5rLnN0cmluZyA9IG15RGF0YS5yYW5rIDw9IDAgPyAn5pyq5LiK5qacJyA6IG15RGF0YS5yYW5rLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgTS5wbGF0Zm9ybS5nZXRVc2VySW5mbygpLnRoZW4oKHVzZXJkYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcmRhdGEgJiYgdXNlcmRhdGEuYXZhdGFyVXJsKSB7XG4gICAgICAgICAgICAgICAgQ29tbW9uLmdldFJlbW90UGljKHVzZXJkYXRhLmF2YXRhclVybCkudGhlbigoZnJhbWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZnJhbWUgJiYgKHRoaXMuc2VsZkljb24uc3ByaXRlRnJhbWUgPSBmcmFtZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdE9wZXJhdGluZ0hlYWQoKSB7XG4gICAgICAgIE0ucnVudGltZS5nZXRTZXJ2ZXJDb25maWcoKS50aGVuKChjb25maWcpID0+IHtcbiAgICAgICAgICAgIGlmIChjb25maWcgJiYgY29uZmlnLnJhbmtfYmFubmVyKSB7XG4gICAgICAgICAgICAgICAgQ29tbW9uLmdldFJlbW90UGljKGNvbmZpZy5yYW5rX2Jhbm5lciwgbnVsbCwgJ3BuZycpLnRoZW4oZnJhbWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmcmFtZSAmJiAodGhpcy5vcGVyYXRpbmdIZWFkLnNwcml0ZUZyYW1lID0gZnJhbWUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIG9uQ2xvc2VCdG5DbGljaygpIHtcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uLnBsYXkoJ0hpZGVTZWxlY3RMZXZlbCcpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0sIDAuMzApO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbk9wZXJhdGluZ0hlYWRDbGljaygpIHtcbiAgICAgICAgLy/lsZXnpLrlhazlkYohXG4gICAgICAgIE0udWkuc2hvd1VJKFVJSHVkRGVmLk5vdGljZVBhbmVsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TY3JvbGxDYWxsQmFjayhhLCBiLCBjKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKG5vZGUuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zID0gdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihDb21tb24uZ2V0V29ybGRQb3Mobm9kZSkpO1xuICAgICAgICAgICAgICAgIC8v5YWI5aSE55CG5LiL56e75pe2LOS4iuiKgueCueeahOWkhOeQhi5cbiAgICAgICAgICAgICAgICBpZiAocG9zLnkgPj0gKG5vZGUuaGVpZ2h0IC8gMiArIDEwKSkge1xuICAgICAgICAgICAgICAgICAgICAvL+W3sue7j+WPr+S7peiiq+enu+WIsOS4i+mdoiEgXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRJbmRleCA9IHRoaXMuX2VuZE5vZGVbJ2luZGV4J10gKyAxO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5fcmFua0RhdGEubGlzdFtuZXh0SW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0Tm9kZSA9IHRoaXMuX2dldE5vZGVCeUluZGV4KG5vZGVbJ2luZGV4J10gKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVbJ2luZGV4J10gPSBuZXh0SW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChSYW5rSXRlbUN0cmwpLmluaXQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnkgPSB0aGlzLl9lbmROb2RlLnkgLSAobm9kZS5oZWlnaHQgKyA1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2VuZE5vZGUgPSBub2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9zdGFydE5vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0UG9zID0gdGhpcy5jb250ZW50LnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihDb21tb24uZ2V0V29ybGRQb3ModGhpcy5fc3RhcnROb2RlKSk7XG4gICAgICAgICAgICAvL+WwhuacgOS4i+eahOaLieS4iuadpVxuICAgICAgICAgICAgaWYgKHN0YXJ0UG9zLnkgKyB0aGlzLl9zdGFydE5vZGUuaGVpZ2h0IC8gMiArIDEwIDwgMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9yYW5rRGF0YS5saXN0W3RoaXMuX3N0YXJ0Tm9kZVsnaW5kZXgnXSAtIDFdO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIC8v56e75Lqk5pyA5ZCO5LiA5Liq5L2N572uIFxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wTm9kZSA9IHRoaXMuX2VuZE5vZGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VuZE5vZGUgPSB0aGlzLl9nZXROb2RlQnlJbmRleCh0aGlzLl9lbmROb2RlWydpbmRleCddIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLnkgPSB0aGlzLl9zdGFydE5vZGUueSArICh0aGlzLl9zdGFydE5vZGUuaGVpZ2h0ICsgNSk7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlLmdldENvbXBvbmVudChSYW5rSXRlbUN0cmwpLmluaXQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBOb2RlWydpbmRleCddID0gdGhpcy5fc3RhcnROb2RlWydpbmRleCddIC0gMVxuICAgICAgICAgICAgICAgICAgICAvL+enu+S6pHN0YXJ0Tm9kZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGFydE5vZGUgPSB0ZW1wTm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+W+heS8mOWMllxuICAgIHByaXZhdGUgX2dldE5vZGVCeUluZGV4KGluZGV4OiBudW1iZXIpOiBjYy5Ob2RlIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gdGhpcy5jb250ZW50LmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKG5vZGVbJ2luZGV4J10gPT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBub2RlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuXG5cbiAgICB9XG59XG4iXX0=