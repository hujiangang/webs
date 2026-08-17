
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Hotel/Access/FriendRankItemCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcSG90ZWxcXEFjY2Vzc1xcRnJpZW5kUmFua0l0ZW1DdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUN6Qyw2Q0FBd0M7QUFDeEMsc0RBQXVEO0FBQ3ZELDBFQUEwRTtBQUMxRSxnREFBK0M7QUFFekMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBZ0Qsc0NBQVk7SUFBNUQ7UUFBQSxxRUEyRUM7UUF4RUcsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixXQUFLLEdBQWEsSUFBSSxDQUFDO1FBR3ZCLFVBQUksR0FBYSxJQUFJLENBQUM7UUFHdEIsVUFBSSxHQUFjLElBQUksQ0FBQztRQUd2QixjQUFRLEdBQWMsSUFBSSxDQUFDO1FBRzNCLFlBQU0sR0FBYSxJQUFJLENBQUM7UUFHeEIsbUJBQWEsR0FBcUIsRUFBRSxDQUFDO1FBRTdCLGFBQU8sR0FBVyxJQUFJLENBQUM7UUFDdkIsV0FBSyxHQUFHLElBQUksQ0FBQzs7SUFtRHpCLENBQUM7SUFqRFUsaUNBQUksR0FBWCxVQUFZLElBQWtIO1FBQzFILElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDbkgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFN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QUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzs2REFDVTtJQXJCcEIsa0JBQWtCO1FBRHRDLE9BQU87T0FDYSxrQkFBa0IsQ0EyRXRDO0lBQUQseUJBQUM7Q0EzRUQsQUEyRUMsQ0EzRStDLEVBQUUsQ0FBQyxTQUFTLEdBMkUzRDtrQkEzRW9CLGtCQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgVUlIdWREZWYgfSBmcm9tIFwiLi4vLi4vRGF0YS9JbnRlcmZhY2UvVUlEYXRhXCI7XG5pbXBvcnQgeyBJQ2xvdWREYXRhIH0gZnJvbSBcIi4uLy4uL1NpbXVsYXRpb25PcGVyYXRpb24vVmlldy9NYXAvQ2xvdWRWaWV3XCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi9EYXRhL0NvbnN0L0V2ZW50XCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcmllbmRSYW5rSXRlbUN0cmwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGhvdGVsTmFtZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHNjb3JlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgcmFuazogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBpY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICByYW5rSWNvbjogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB6YW5MYWI6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIHJhbmtJY29uRnJhbWU6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuICAgIHByaXZhdGUgX3VzZXJJZDogbnVtYmVyID0gbnVsbDtcbiAgICBwcml2YXRlIF9kYXRhID0gbnVsbDtcblxuICAgIHB1YmxpYyBpbml0KGRhdGE6IHsgaWQ6IG51bWJlciwgbmlja25hbWU6IHN0cmluZywgYXZhdGFyX3VybDogc3RyaW5nLCBzY29yZTogc3RyaW5nLCBhcHByZWNpYXRlOiBzdHJpbmcsIF9ob3RlbERhdGFzOiBzdHJpbmcgfSkge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5fdXNlcklkID0gZGF0YS5pZDtcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICAgICAgICAgICAgdGhpcy5fZGF0YS5faG90ZWxEYXRhcyA9ICgodHlwZW9mIGRhdGEuX2hvdGVsRGF0YXMpID09ICdzdHJpbmcnKSA/IEpTT04ucGFyc2UoZGF0YS5faG90ZWxEYXRhcykgOiBkYXRhLl9ob3RlbERhdGFzO1xuICAgICAgICAgICAgdGhpcy5ob3RlbE5hbWUuc3RyaW5nID0gYCR7ZGF0YS5uaWNrbmFtZX3nmoTphZLlupdgO1xuICAgICAgICAgICAgdGhpcy56YW5MYWIuc3RyaW5nID0gZGF0YS5hcHByZWNpYXRlIHx8ICcwJztcbiAgICAgICAgICAgIHRoaXMuc2NvcmUuc3RyaW5nID0gZGF0YS5zY29yZTtcbiAgICAgICAgICAgIHRoaXMuX2ZpbGxJY29uKGRhdGEuYXZhdGFyX3VybCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHJhbmsgPSB0aGlzLnJhbmsuc3RyaW5nID0gdGhpcy5ub2RlWydpbmRleCddICsgMTtcbiAgICAgICAgICAgIGlmIChyYW5rIDw9IDMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmsubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmtJY29uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmtJY29uLnNwcml0ZUZyYW1lID0gdGhpcy5yYW5rSWNvbkZyYW1lW3JhbmsgLSAxXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmsubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucmFua0ljb24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuWhq+WFheWktOWDjyAqL1xuICAgIHByaXZhdGUgX2ZpbGxJY29uKHVybDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgIENvbW1vbi5nZXRSZW1vdFBpYyh1cmwsIHRoaXMuaWNvbi5ub2RlLmdldENvbnRlbnRTaXplKCkpLnRoZW4oKGZyYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaWNvbi5zcHJpdGVGcmFtZSA9IGZyYW1lO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2dldCBhdmF0YXIgZXJyb3IhJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkFjY2Vzc0NsaWNrKCkge1xuICAgICAgICBNLm5ldC52aXNpdEZyaWVuZCh0aGlzLl91c2VySWQpLnRoZW4oaXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMuX2RhdGEsIGl0ZW0pO1xuICAgICAgICAgICAgTS51aS5zaG93VUkoVUlIdWREZWYuQ2xvdWRWaWV3LCBJQ2xvdWREYXRhLlZpc2l0RnJpZW5kSG90ZWwsICgpID0+IHtcbiAgICAgICAgICAgICAgICBNLnVpLmhpZGVVSShVSUh1ZERlZi5GcmllbmRSYW5rKTtcbiAgICAgICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuSG90ZWwuU2hvd0d1ZXN0Um9vbSwgdGhpcy5fZGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG5cbiAgICB9XG5cbn1cbiJdfQ==