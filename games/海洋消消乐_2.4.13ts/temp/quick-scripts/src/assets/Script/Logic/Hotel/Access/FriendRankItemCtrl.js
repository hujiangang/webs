"use strict";
cc._RF.push(module, '3aab1UfWNhECbFKxnEwkPbK', 'FriendRankItemCtrl');
// Script/Logic/Hotel/Access/FriendRankItemCtrl.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var Common_1 = require("../../Common/Common");
var M_1 = require("../../../Base/Manager/M");
var UIData_1 = require("../../Data/Interface/UIData");
var CloudView_1 = require("../../SimulationOperation/View/Map/CloudView");
var Event_1 = require("../../Data/Const/Event");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FriendRankItemCtrl = /** @class */ (function (_super) {
    __extends(FriendRankItemCtrl, _super);
    function FriendRankItemCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hotelName = null;
        _this.score = null;
        _this.rank = null;
        _this.icon = null;
        _this.rankIcon = null;
        _this.zanLab = null;
        _this.rankIconFrame = [];
        _this._userId = null;
        _this._data = null;
        return _this;
    }
    FriendRankItemCtrl.prototype.init = function (data) {
        if (data) {
            this._userId = data.id;
            this._data = data;
            this._data._hotelDatas = ((typeof data._hotelDatas) == 'string') ? JSON.parse(data._hotelDatas) : data._hotelDatas;
            this.hotelName.string = data.nickname + "\u7684\u9152\u5E97";
            this.zanLab.string = data.appreciate || '0';
            this.score.string = data.score;
            this._fillIcon(data.avatar_url);
            var rank = this.rank.string = this.node['index'] + 1;
            if (rank <= 3) {
                this.rank.node.active = false;
                this.rankIcon.node.active = true;
                this.rankIcon.spriteFrame = this.rankIconFrame[rank - 1];
            }
            else {
                this.rank.node.active = true;
                this.rankIcon.node.active = false;
            }
        }
    };
    /**填充头像 */
    FriendRankItemCtrl.prototype._fillIcon = function (url) {
        var _this = this;
        if (url) {
            Common_1.default.getRemotPic(url, this.icon.node.getContentSize()).then(function (frame) {
                if (frame) {
                    _this.icon.spriteFrame = frame;
                }
                else {
                    console.error('get avatar error!');
                }
            });
        }
    };
    FriendRankItemCtrl.prototype.onAccessClick = function () {
        var _this = this;
        M_1.default.net.visitFriend(this._userId).then(function (item) {
            console.error(_this._data, item);
            M_1.default.ui.showUI(UIData_1.UIHudDef.CloudView, CloudView_1.ICloudData.VisitFriendHotel, function () {
                M_1.default.ui.hideUI(UIData_1.UIHudDef.FriendRank);
                M_1.default.event.send(Event_1.Event.Hotel.ShowGuestRoom, _this._data);
            });
        });
    };
    FriendRankItemCtrl.prototype.update = function () {
    };
    __decorate([
        property(cc.Label)
    ], FriendRankItemCtrl.prototype, "hotelName", void 0);
    __decorate([
        property(cc.Label)
    ], FriendRankItemCtrl.prototype, "score", void 0);
    __decorate([
        property(cc.Label)
    ], FriendRankItemCtrl.prototype, "rank", void 0);
    __decorate([
        property(cc.Sprite)
    ], FriendRankItemCtrl.prototype, "icon", void 0);
    __decorate([
        property(cc.Sprite)
    ], FriendRankItemCtrl.prototype, "rankIcon", void 0);
    __decorate([
        property(cc.Label)
    ], FriendRankItemCtrl.prototype, "zanLab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], FriendRankItemCtrl.prototype, "rankIconFrame", void 0);
    FriendRankItemCtrl = __decorate([
        ccclass
    ], FriendRankItemCtrl);
    return FriendRankItemCtrl;
}(cc.Component));
exports.default = FriendRankItemCtrl;

cc._RF.pop();