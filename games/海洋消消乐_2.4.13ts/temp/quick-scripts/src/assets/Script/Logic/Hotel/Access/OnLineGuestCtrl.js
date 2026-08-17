"use strict";
cc._RF.push(module, 'db156it5SxBq7PkGZgcJsTl', 'OnLineGuestCtrl');
// Script/Logic/Hotel/Access/OnLineGuestCtrl.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var OnLineGuestCtrl = /** @class */ (function (_super) {
    __extends(OnLineGuestCtrl, _super);
    function OnLineGuestCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.guestIconItem = null;
        return _this;
    }
    OnLineGuestCtrl.prototype.init = function (data) {
        if (data) {
            this.node.removeAllChildren();
            for (var i = 0; i < 9; i++) {
                var itemData = data[i];
                if (itemData) {
                    var item = cc.instantiate(this.guestIconItem);
                    item.parent = this.node;
                    this._syncIconFrame(cc.find('mask/icon', item).getComponent(cc.Sprite), itemData.avatar_url);
                }
            }
        }
    };
    OnLineGuestCtrl.prototype._syncIconFrame = function (sprite, url) {
        if (sprite && url) {
            Common_1.default.getRemotPic(url).then(function (frame) {
                if (frame) {
                    sprite.spriteFrame = frame;
                }
            });
        }
    };
    __decorate([
        property(cc.Prefab)
    ], OnLineGuestCtrl.prototype, "guestIconItem", void 0);
    OnLineGuestCtrl = __decorate([
        ccclass
    ], OnLineGuestCtrl);
    return OnLineGuestCtrl;
}(cc.Component));
exports.default = OnLineGuestCtrl;

cc._RF.pop();