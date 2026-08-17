"use strict";
cc._RF.push(module, '5d8e7XMDmpOyKqop1Z0Xp1O', 'RankItemCtrl');
// Script/Views/LevelMap/RankItemCtrl.ts

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
var Common_1 = require("../../Logic/Common/Common");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankItemCtrl = /** @class */ (function (_super) {
    __extends(RankItemCtrl, _super);
    function RankItemCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nickName = null;
        _this.score = null;
        _this.rank = null;
        _this.icon = null;
        _this.rankIcon = null;
        _this.rankIconFrame = [];
        _this.level = null;
        return _this;
    }
    RankItemCtrl.prototype.init = function (data) {
        if (data) {
            this.nickName.string = data.nickname;
            Common_1.default.parseRankData(data.value);
            var rd = Common_1.default.parseRankData(data.value);
            this.rank.string = data.rank.toString();
            this.score.string = rd.score.toString();
            this.level.string = rd.level + "\u5173";
            this._fillIcon(data.avatar_url);
            if (data.rank <= 3) {
                this.rank.node.active = false;
                this.rankIcon.node.active = true;
                this.rankIcon.spriteFrame = this.rankIconFrame[data.rank - 1];
            }
            else {
                this.rank.node.active = true;
                this.rankIcon.node.active = false;
            }
        }
    };
    /**填充头像 */
    RankItemCtrl.prototype._fillIcon = function (url) {
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
    RankItemCtrl.prototype.update = function () {
    };
    __decorate([
        property(cc.Label)
    ], RankItemCtrl.prototype, "nickName", void 0);
    __decorate([
        property(cc.Label)
    ], RankItemCtrl.prototype, "score", void 0);
    __decorate([
        property(cc.Label)
    ], RankItemCtrl.prototype, "rank", void 0);
    __decorate([
        property(cc.Sprite)
    ], RankItemCtrl.prototype, "icon", void 0);
    __decorate([
        property(cc.Sprite)
    ], RankItemCtrl.prototype, "rankIcon", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], RankItemCtrl.prototype, "rankIconFrame", void 0);
    __decorate([
        property(cc.Label)
    ], RankItemCtrl.prototype, "level", void 0);
    RankItemCtrl = __decorate([
        ccclass
    ], RankItemCtrl);
    return RankItemCtrl;
}(cc.Component));
exports.default = RankItemCtrl;

cc._RF.pop();