
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Hotel/Access/OnLineGuestCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcSG90ZWxcXEFjY2Vzc1xcT25MaW5lR3Vlc3RDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUVuQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQStCQztRQTVCRyxtQkFBYSxHQUFjLElBQUksQ0FBQzs7SUE0QnBDLENBQUM7SUF6QlUsOEJBQUksR0FBWCxVQUFZLElBQWlFO1FBQ3pFLElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxRQUFRLEVBQUU7b0JBQ1YsSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ2hELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDaEc7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVPLHdDQUFjLEdBQXRCLFVBQXVCLE1BQWlCLEVBQUUsR0FBVztRQUNqRCxJQUFJLE1BQU0sSUFBSSxHQUFHLEVBQUU7WUFDZixnQkFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLO2dCQUM5QixJQUFJLEtBQUssRUFBRTtvQkFDUCxNQUFNLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQTtpQkFDN0I7WUFDTCxDQUFDLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztJQXpCRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzBEQUNZO0lBSGYsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQStCbkM7SUFBRCxzQkFBQztDQS9CRCxBQStCQyxDQS9CNEMsRUFBRSxDQUFDLFNBQVMsR0ErQnhEO2tCQS9Cb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uL0NvbW1vbi9Db21tb25cIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9uTGluZUd1ZXN0Q3RybCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGd1ZXN0SWNvbkl0ZW06IGNjLlByZWZhYiA9IG51bGw7XG5cblxuICAgIHB1YmxpYyBpbml0KGRhdGE6IEFycmF5PHsgaWQ6IG51bWJlciwgbmlja25hbWU6IHN0cmluZywgYXZhdGFyX3VybDogc3RyaW5nIH0+KSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbURhdGEgPSBkYXRhW2ldO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5ndWVzdEljb25JdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N5bmNJY29uRnJhbWUoY2MuZmluZCgnbWFzay9pY29uJywgaXRlbSkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIGl0ZW1EYXRhLmF2YXRhcl91cmwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3N5bmNJY29uRnJhbWUoc3ByaXRlOiBjYy5TcHJpdGUsIHVybDogc3RyaW5nKSB7XG4gICAgICAgIGlmIChzcHJpdGUgJiYgdXJsKSB7XG4gICAgICAgICAgICBDb21tb24uZ2V0UmVtb3RQaWModXJsKS50aGVuKGZyYW1lID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gZnJhbWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbiJdfQ==