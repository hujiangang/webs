"use strict";
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