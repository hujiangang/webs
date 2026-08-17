
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Hotel/Access/VistItemCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7a70f8pf4VNH41ZWLCDyBLw', 'VistItemCtrl');
// Script/Logic/Hotel/Access/VistItemCtrl.ts

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
var GuestPanelCtrl_1 = require("./GuestPanelCtrl");
var Util_1 = require("../../../Base/Utils/Util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var VistItemCtrl = /** @class */ (function (_super) {
    __extends(VistItemCtrl, _super);
    function VistItemCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeLabel = null;
        _this.eventLabel = null;
        return _this;
    }
    VistItemCtrl.prototype.onLoad = function () {
    };
    VistItemCtrl.prototype.init = function (data) {
        if (data) {
            this.eventLabel.string = "<color=#00AB00>" + data.nickname + "</c> <color=#0076A4>" + this._getEventMsg(data.event) + "</color>";
            this.timeLabel.string = Util_1.Util.Timer.dateFtt('yyyy MM dd hh:mm:ss', new Date(data.created_at * 1000));
        }
    };
    VistItemCtrl.prototype._getEventMsg = function (id) {
        var result = '';
        switch (id) {
            case GuestPanelCtrl_1.FriendsEventIds.Zan:
                result = '给你的酒店点了赞!';
                break;
            case GuestPanelCtrl_1.FriendsEventIds.Share:
                result = '分享了你的酒店喔!';
                break;
        }
        return result;
    };
    __decorate([
        property(cc.Label)
    ], VistItemCtrl.prototype, "timeLabel", void 0);
    __decorate([
        property(cc.RichText)
    ], VistItemCtrl.prototype, "eventLabel", void 0);
    VistItemCtrl = __decorate([
        ccclass
    ], VistItemCtrl);
    return VistItemCtrl;
}(cc.Component));
exports.default = VistItemCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcSG90ZWxcXEFjY2Vzc1xcVmlzdEl0ZW1DdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFtRDtBQUNuRCxpREFBZ0Q7QUFFMUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFnQ0M7UUE3QkcsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixnQkFBVSxHQUFnQixJQUFJLENBQUM7O0lBMEJuQyxDQUFDO0lBeEJHLDZCQUFNLEdBQU47SUFFQSxDQUFDO0lBRU0sMkJBQUksR0FBWCxVQUFZLElBQThGO1FBQ3RHLElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsb0JBQWtCLElBQUksQ0FBQyxRQUFRLDRCQUF1QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBVSxDQUFDO1lBQ3ZILElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFdBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQTtTQUN0RztJQUNMLENBQUM7SUFFTyxtQ0FBWSxHQUFwQixVQUFxQixFQUFVO1FBQzNCLElBQUksTUFBTSxHQUFXLEVBQUUsQ0FBQztRQUN4QixRQUFRLEVBQUUsRUFBRTtZQUNSLEtBQUssZ0NBQWUsQ0FBQyxHQUFHO2dCQUNwQixNQUFNLEdBQUcsV0FBVyxDQUFBO2dCQUNwQixNQUFNO1lBQ1YsS0FBSyxnQ0FBZSxDQUFDLEtBQUs7Z0JBQ3RCLE1BQU0sR0FBRyxXQUFXLENBQUE7Z0JBQ3BCLE1BQU07U0FDYjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUEzQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDUTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO29EQUNTO0lBTmQsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQWdDaEM7SUFBRCxtQkFBQztDQWhDRCxBQWdDQyxDQWhDeUMsRUFBRSxDQUFDLFNBQVMsR0FnQ3JEO2tCQWhDb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZyaWVuZHNFdmVudElkcyB9IGZyb20gXCIuL0d1ZXN0UGFuZWxDdHJsXCI7XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uLy4uLy4uL0Jhc2UvVXRpbHMvVXRpbFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlzdEl0ZW1DdHJsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB0aW1lTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5SaWNoVGV4dClcbiAgICBldmVudExhYmVsOiBjYy5SaWNoVGV4dCA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdChkYXRhOiB7IHVpZDogbnVtYmVyLCBldmVudDogbnVtYmVyLCBuaWNrbmFtZTogc3RyaW5nLCBhdmF0YXJfdXJsOiBzdHJpbmcsIGNyZWF0ZWRfYXQ6IG51bWJlciB9KSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50TGFiZWwuc3RyaW5nID0gYDxjb2xvcj0jMDBBQjAwPiR7ZGF0YS5uaWNrbmFtZX08L2M+IDxjb2xvcj0jMDA3NkE0PiR7dGhpcy5fZ2V0RXZlbnRNc2coZGF0YS5ldmVudCl9PC9jb2xvcj5gO1xuICAgICAgICAgICAgdGhpcy50aW1lTGFiZWwuc3RyaW5nID0gVXRpbC5UaW1lci5kYXRlRnR0KCd5eXl5IE1NIGRkIGhoOm1tOnNzJywgbmV3IERhdGUoZGF0YS5jcmVhdGVkX2F0ICogMTAwMCkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRFdmVudE1zZyhpZDogbnVtYmVyKSB7XG4gICAgICAgIGxldCByZXN1bHQ6IHN0cmluZyA9ICcnO1xuICAgICAgICBzd2l0Y2ggKGlkKSB7XG4gICAgICAgICAgICBjYXNlIEZyaWVuZHNFdmVudElkcy5aYW46XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gJ+e7meS9oOeahOmFkuW6l+eCueS6hui1niEnXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEZyaWVuZHNFdmVudElkcy5TaGFyZTpcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAn5YiG5Lqr5LqG5L2g55qE6YWS5bqX5ZaUISdcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxufVxuIl19