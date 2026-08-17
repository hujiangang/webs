
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Hotel/Access/GuestPanelCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcSG90ZWxcXEFjY2Vzc1xcR3Vlc3RQYW5lbEN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUF5QztBQUN6Qyw2Q0FBd0M7QUFDeEMsbURBQThDO0FBQzlDLCtEQUE4RDtBQUM5RCxzREFBc0Q7QUFFaEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBWSxlQUlYO0FBSkQsV0FBWSxlQUFlO0lBQ3ZCLG9EQUFRLENBQUE7SUFDUixnRUFBUyxDQUFBO0lBQ1Qsd0RBQUssQ0FBQTtBQUNULENBQUMsRUFKVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQUkxQjtBQUFBLENBQUM7QUFHRjtJQUE0QyxrQ0FBWTtJQUF4RDtRQUFBLHFFQXdGQztRQXJGRyxhQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLFlBQU0sR0FBYSxJQUFJLENBQUM7UUFHeEIsYUFBTyxHQUFhLElBQUksQ0FBQztRQUd6QixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGNBQVEsR0FBYyxJQUFJLENBQUM7UUFHM0IsY0FBUSxHQUFjLElBQUksQ0FBQztRQUVuQixVQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ3BCLGNBQVEsR0FBeUIsSUFBSSxDQUFDOztJQW1FbEQsQ0FBQztJQWpFVSw2QkFBSSxHQUFYLFVBQVksSUFBK0c7UUFDdkgsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLENBQUMsSUFBSSxHQUFHLFdBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxD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RyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMxRSxXQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFsRkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDTTtJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNLO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7bURBQ007SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztvREFDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO29EQUNPO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ087SUFsQlYsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQXdGbEM7SUFBRCxxQkFBQztDQXhGRCxBQXdGQyxDQXhGMkMsRUFBRSxDQUFDLFNBQVMsR0F3RnZEO2tCQXhGb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IENvbW1vbiBmcm9tIFwiLi4vLi4vQ29tbW9uL0NvbW1vblwiO1xuaW1wb3J0IE0gZnJvbSBcIi4uLy4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgUGF0aHMgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvVXRpbHMvUGF0aHNcIjtcbmltcG9ydCB7IFN0b3JhZ2VNZ3IgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL1N0b3JhZ2VNZ3JcIjtcbmltcG9ydCB7IE5hdGl2ZUtleSB9IGZyb20gXCIuLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbmV4cG9ydCBlbnVtIEZyaWVuZHNFdmVudElkcyB7XG4gICAgWmFuID0gMTAsXG4gICAgQ2FuY2VsWmFuLFxuICAgIFNoYXJlXG59O1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3Vlc3RQYW5lbEN0cmwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIG5hbWVMYWI6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB6YW5MYWI6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB6YW4yTGFiOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgc2NvcmVMYWI6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaGVhZEljb246IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuVG9nZ2xlKVxuICAgIHphbkhlYXJ0OiBjYy5Ub2dnbGUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfdWlkOiBudW1iZXIgPSBudWxsO1xuICAgIHByaXZhdGUgX3phbkxpc3Q6IFNldDxzdHJpbmcgfCBudW1iZXI+ID0gbnVsbDtcblxuICAgIHB1YmxpYyBpbml0KGRhdGE6IHsgaWQ6IG51bWJlciwgbmlja25hbWU6IHN0cmluZywgYXZhdGFyX3VybDogc3RyaW5nLCBzY29yZTogc3RyaW5nLCBhcHByZWNpYXRlOiBudW1iZXIsIF9ob3RlbERhdGFzOiBhbnkgfSkge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5fdWlkID0gTS5ydW50aW1lLkN1cnJlbnRHdWVzdFVzZXJpZCA9IGRhdGEuaWQ7XG4gICAgICAgICAgICB0aGlzLnNjb3JlTGFiLnN0cmluZyA9IGRhdGEuc2NvcmU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVphbkxhYihkYXRhLmFwcHJlY2lhdGUgfHwgMClcbiAgICAgICAgICAgIHRoaXMubmFtZUxhYi5zdHJpbmcgPSBkYXRhLm5pY2tuYW1lO1xuICAgICAgICAgICAgdGhpcy5fZmlsbEljb24oZGF0YS5hdmF0YXJfdXJsKTtcbiAgICAgICAgICAgIC8v5ZCM5q2l6LWe55qE54q25oCBflxuICAgICAgICAgICAgdGhpcy5fc3luY1phblN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zeW5jWmFuU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuemFuSGVhcnQuaXNDaGVja2VkID0gZmFsc2U7XG4gICAgICAgIC8vL3JlcXVlc3QgLi4uLi4uXG4gICAgICAgIGlmICghdGhpcy5femFuTGlzdCkge1xuICAgICAgICAgICAgdGhpcy5femFuTGlzdCA9IG5ldyBTZXQoPEFycmF5PG51bWJlciB8IHN0cmluZz4+U3RvcmFnZU1nci5TdG9yYWdlLmdldE9iamVjdChOYXRpdmVLZXkuWmFuTGlzdCwgW10pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5femFuTGlzdC5oYXModGhpcy5fdWlkKSkge1xuICAgICAgICAgICAgdGhpcy56YW5IZWFydC5pc0NoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuemFuTGFiLnN0cmluZyA9PSAnMCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVphbkxhYigxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlWmFuTGFiKGNvdW50OiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy56YW5MYWIuc3RyaW5nID0gY291bnQudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy56YW4yTGFiLnN0cmluZyA9IHRoaXMuemFuTGFiLnN0cmluZztcbiAgICB9XG5cbiAgICAvKirloavlhYXlpLTlg48gKi9cbiAgICBwcml2YXRlIF9maWxsSWNvbih1cmw6IHN0cmluZykge1xuICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICBDb21tb24uZ2V0UmVtb3RQaWModXJsLCB0aGlzLmhlYWRJY29uLm5vZGUuZ2V0Q29udGVudFNpemUoKSkudGhlbigoZnJhbWUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkSWNvbi5zcHJpdGVGcmFtZSA9IGZyYW1lO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2dldCBhdmF0YXIgZXJyb3IhJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvblphbkNsaWNrKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3phbkxpc3QuaGFzKHRoaXMuX3VpZCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3phbkxpc3QuYWRkKHRoaXMuX3VpZClcbiAgICAgICAgICAgIE0ubmV0LmludGVyYWN0aXZlKHRoaXMuX3VpZCwgRnJpZW5kc0V2ZW50SWRzLlphbik7XG4gICAgICAgICAgICBTdG9yYWdlTWdyLlN0b3JhZ2Uuc2V0T2JqZWN0KE5hdGl2ZUtleS5aYW5MaXN0LCBBcnJheS5mcm9tKHRoaXMuX3phbkxpc3QpLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlWmFuTGFiKChOdW1iZXIodGhpcy56YW5MYWIuc3RyaW5nKSArIDEpLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICB0aGlzLnphbkhlYXJ0LmlzQ2hlY2tlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgIC8vICAgICAgIC8v5b2T5YmN5bey57uP6LWe5LqGLOWImeWPlua2iFxuICAgICAgICAvLyAgICAgICB0aGlzLl96YW5MaXN0LmRlbGV0ZSh0aGlzLl91aWQpO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2hhcmVDbGljaygpIHtcbiAgICAgICAgTS5wbGF0Zm9ybS5zaGFyZSgn5oiR5aW95Y+LeHh455qE6YWS5bqXJywgUGF0aHMuU2hhcmVJbWdQYXRoICsgXCJsZXZlbF9zaGFyZV80NS5wbmdcIikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBNLm5ldC5pbnRlcmFjdGl2ZSh0aGlzLl91aWQsIEZyaWVuZHNFdmVudElkcy5TaGFyZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG59XG4iXX0=