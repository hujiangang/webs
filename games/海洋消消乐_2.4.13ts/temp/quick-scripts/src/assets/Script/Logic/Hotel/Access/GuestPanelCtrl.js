"use strict";
cc._RF.push(module, 'f2fb8ykLLlGv7a884A6Ip25', 'GuestPanelCtrl');
// Script/Logic/Hotel/Access/GuestPanelCtrl.ts

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
exports.FriendsEventIds = void 0;
var Common_1 = require("../../Common/Common");
var M_1 = require("../../../Base/Manager/M");
var Paths_1 = require("../../../Base/Utils/Paths");
var StorageMgr_1 = require("../../../Base/Manager/StorageMgr");
var Constant_1 = require("../../Data/Const/Constant");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FriendsEventIds;
(function (FriendsEventIds) {
    FriendsEventIds[FriendsEventIds["Zan"] = 10] = "Zan";
    FriendsEventIds[FriendsEventIds["CancelZan"] = 11] = "CancelZan";
    FriendsEventIds[FriendsEventIds["Share"] = 12] = "Share";
})(FriendsEventIds = exports.FriendsEventIds || (exports.FriendsEventIds = {}));
;
var GuestPanelCtrl = /** @class */ (function (_super) {
    __extends(GuestPanelCtrl, _super);
    function GuestPanelCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nameLab = null;
        _this.zanLab = null;
        _this.zan2Lab = null;
        _this.scoreLab = null;
        _this.headIcon = null;
        _this.zanHeart = null;
        _this._uid = null;
        _this._zanList = null;
        return _this;
    }
    GuestPanelCtrl.prototype.init = function (data) {
        if (data) {
            this._uid = M_1.default.runtime.CurrentGuestUserid = data.id;
            this.scoreLab.string = data.score;
            this.updateZanLab(data.appreciate || 0);
            this.nameLab.string = data.nickname;
            this._fillIcon(data.avatar_url);
            //同步赞的状态~
            this._syncZanState();
        }
    };
    GuestPanelCtrl.prototype._syncZanState = function () {
        this.zanHeart.isChecked = false;
        ///request ......
        if (!this._zanList) {
            this._zanList = new Set(StorageMgr_1.StorageMgr.Storage.getObject(Constant_1.NativeKey.ZanList, []));
        }
        if (this._zanList.has(this._uid)) {
            this.zanHeart.isChecked = true;
            if (this.zanLab.string == '0') {
                this.updateZanLab(1);
            }
        }
    };
    GuestPanelCtrl.prototype.updateZanLab = function (count) {
        this.zanLab.string = count.toString();
        this.zan2Lab.string = this.zanLab.string;
    };
    /**填充头像 */
    GuestPanelCtrl.prototype._fillIcon = function (url) {
        var _this = this;
        if (url) {
            Common_1.default.getRemotPic(url, this.headIcon.node.getContentSize()).then(function (frame) {
                if (frame) {
                    _this.headIcon.spriteFrame = frame;
                }
                else {
                    console.error('get avatar error!');
                }
            });
        }
    };
    GuestPanelCtrl.prototype.onZanClick = function () {
        if (!this._zanList.has(this._uid)) {
            this._zanList.add(this._uid);
            M_1.default.net.interactive(this._uid, FriendsEventIds.Zan);
            StorageMgr_1.StorageMgr.Storage.setObject(Constant_1.NativeKey.ZanList, Array.from(this._zanList), true);
            this.updateZanLab((Number(this.zanLab.string) + 1).toString());
            this.zanHeart.isChecked = true;
        }
        // else {
        //       //当前已经赞了,则取消
        //       this._zanList.delete(this._uid);
        // }
    };
    GuestPanelCtrl.prototype.onShareClick = function () {
        var _this = this;
        M_1.default.platform.share('我好友xxx的酒店', Paths_1.default.ShareImgPath + "level_share_45.png").then(function () {
            M_1.default.net.interactive(_this._uid, FriendsEventIds.Share);
        });
    };
    __decorate([
        property(cc.Label)
    ], GuestPanelCtrl.prototype, "nameLab", void 0);
    __decorate([
        property(cc.Label)
    ], GuestPanelCtrl.prototype, "zanLab", void 0);
    __decorate([
        property(cc.Label)
    ], GuestPanelCtrl.prototype, "zan2Lab", void 0);
    __decorate([
        property(cc.Label)
    ], GuestPanelCtrl.prototype, "scoreLab", void 0);
    __decorate([
        property(cc.Sprite)
    ], GuestPanelCtrl.prototype, "headIcon", void 0);
    __decorate([
        property(cc.Toggle)
    ], GuestPanelCtrl.prototype, "zanHeart", void 0);
    GuestPanelCtrl = __decorate([
        ccclass
    ], GuestPanelCtrl);
    return GuestPanelCtrl;
}(cc.Component));
exports.default = GuestPanelCtrl;

cc._RF.pop();