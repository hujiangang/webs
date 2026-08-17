
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Views/LevelMap/RankItemCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxWaWV3c1xcTGV2ZWxNYXBcXFJhbmtJdGVtQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBK0M7QUFFekMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUE0REM7UUF6REcsY0FBUSxHQUFhLElBQUksQ0FBQztRQUcxQixXQUFLLEdBQWEsSUFBSSxDQUFDO1FBR3ZCLFVBQUksR0FBYSxJQUFJLENBQUM7UUFHdEIsVUFBSSxHQUFjLElBQUksQ0FBQztRQUd2QixjQUFRLEdBQWMsSUFBSSxDQUFDO1FBRzNCLG1CQUFhLEdBQXFCLEVBQUUsQ0FBQztRQUdyQyxXQUFLLEdBQWEsSUFBSSxDQUFDOztJQXVDM0IsQ0FBQztJQXJDVSwyQkFBSSxHQUFYLFVBQVksSUFBb0c7UUFDNUcsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3JDLGdCQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxJQUFNLEVBQUUsR0FBRyxnQkFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFNLEVBQUUsQ0FBQyxLQUFLLFdBQUcsQ0FBQztZQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNoQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO2dCQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUE7YUFDaEU7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUNyQztTQUNKO0lBQ0wsQ0FBQztJQUVELFVBQVU7SUFDRixnQ0FBUyxHQUFqQixVQUFrQixHQUFXO1FBQTdCLGlCQVVDO1FBVEcsSUFBSSxHQUFHLEVBQUU7WUFDTCxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFLO2dCQUNoRSxJQUFJLEtBQUssRUFBRTtvQkFDUCxLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7aUJBQ2pDO3FCQUFNO29CQUNILE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztpQkFDdEM7WUFDTCxDQUFDLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztJQUVELDZCQUFNLEdBQU47SUFFQSxDQUFDO0lBdkREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ087SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsrQ0FDSTtJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzhDQUNHO0lBR3RCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7OENBQ0c7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztrREFDTztJQUczQjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzt1REFDVTtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytDQUNJO0lBckJOLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0E0RGhDO0lBQUQsbUJBQUM7Q0E1REQsQUE0REMsQ0E1RHlDLEVBQUUsQ0FBQyxTQUFTLEdBNERyRDtrQkE1RG9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbW9uIGZyb20gXCIuLi8uLi9Mb2dpYy9Db21tb24vQ29tbW9uXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5rSXRlbUN0cmwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIG5pY2tOYW1lOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc2NvcmU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICByYW5rOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGljb246IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHJhbmtJY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgcmFua0ljb25GcmFtZTogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGxldmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBwdWJsaWMgaW5pdChkYXRhOiB7IHJhbms6IG51bWJlciwgdWlkOiBudW1iZXIsIG5pY2tuYW1lOiBzdHJpbmcsIGF2YXRhcl91cmw6IHN0cmluZywgdmFsdWU6IG51bWJlciwgZXh0cmE6IGFueSB9KSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLm5pY2tOYW1lLnN0cmluZyA9IGRhdGEubmlja25hbWU7XG4gICAgICAgICAgICBDb21tb24ucGFyc2VSYW5rRGF0YShkYXRhLnZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHJkID0gQ29tbW9uLnBhcnNlUmFua0RhdGEoZGF0YS52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnJhbmsuc3RyaW5nID0gZGF0YS5yYW5rLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLnNjb3JlLnN0cmluZyA9IHJkLnNjb3JlLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmxldmVsLnN0cmluZyA9IGAke3JkLmxldmVsfeWFs2A7XG4gICAgICAgICAgICB0aGlzLl9maWxsSWNvbihkYXRhLmF2YXRhcl91cmwpO1xuICAgICAgICAgICAgaWYgKGRhdGEucmFuayA8PSAzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYW5rLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5yYW5rSWNvbi5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5yYW5rSWNvbi5zcHJpdGVGcmFtZSA9IHRoaXMucmFua0ljb25GcmFtZVtkYXRhLnJhbmsgLSAxXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmsubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucmFua0ljb24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuWhq+WFheWktOWDjyAqL1xuICAgIHByaXZhdGUgX2ZpbGxJY29uKHVybDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgIENvbW1vbi5nZXRSZW1vdFBpYyh1cmwsIHRoaXMuaWNvbi5ub2RlLmdldENvbnRlbnRTaXplKCkpLnRoZW4oKGZyYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWNvbi5zcHJpdGVGcmFtZSA9IGZyYW1lO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2dldCBhdmF0YXIgZXJyb3IhJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcblxuICAgIH1cblxufVxuIl19