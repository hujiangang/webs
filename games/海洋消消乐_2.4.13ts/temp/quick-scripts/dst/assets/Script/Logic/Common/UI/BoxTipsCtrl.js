
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/BoxTipsCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e169fjqJrJFoJcxdsYoFPFC', 'BoxTipsCtrl');
// Script/Logic/Common/UI/BoxTipsCtrl.ts

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
var M_1 = require("../../../Base/Manager/M");
var Constant_1 = require("../../Data/Const/Constant");
var BaseConst_1 = require("../../../Base/BaseConst");
var Common_1 = require("../Common");
var Util_1 = require("../../../Base/Utils/Util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BoxTipsCtrl = /** @class */ (function (_super) {
    __extends(BoxTipsCtrl, _super);
    function BoxTipsCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.title = null;
        _this.rewardPrefab = null;
        _this.rewardIconFrames = [];
        _this.isReady = false;
        return _this;
    }
    BoxTipsCtrl.prototype.onLoad = function () {
    };
    BoxTipsCtrl.prototype.updateData = function (title, contentSize) {
        this.title.string = title;
        if (contentSize) {
            this.node.setContentSize(contentSize);
        }
    };
    BoxTipsCtrl.prototype.show = function (data, pos) {
        var _this = this;
        if (data) {
            this.content.destroyAllChildren();
            data.forEach(function (item) {
                var node = M_1.default.nodePool.createItem(_this.rewardPrefab);
                var count = item.count.toString();
                node.parent = _this.content;
                node.setScale(0.8);
                var icon = node.getChildByName('icon');
                if (item.type < Constant_1.PropType.BeikeBomb) {
                    icon.setScale(1);
                }
                if (item.type == BaseConst_1.CurrencyId.Coin) {
                    count = Common_1.default.bytesToSize(item.count);
                }
                icon.getComponent(cc.Sprite).spriteFrame = _this._getRewardIcon(item.type);
                node.getChildByName('count').getComponent(cc.Label).string = "x" + count;
            });
            pos && this.node.setPosition(pos);
            this.node.active = true;
            this.scheduleOnce(function () {
                _this.isReady = true;
            }, 0.5);
            Util_1.Util.Tool.OpenUITween(this.node, null);
        }
    };
    BoxTipsCtrl.prototype.hide = function () {
        this.node.active = false;
        this.isReady = false;
        Util_1.Util.Tool.CloseUITween(this.node, null);
    };
    BoxTipsCtrl.prototype._getRewardIcon = function (type) {
        var result = null;
        if (type >= Constant_1.PropType.BeikeBomb) {
            result = this.rewardIconFrames[type - Constant_1.PropType.BeikeBomb];
        }
        else {
            result = this.rewardIconFrames[20 + type];
        }
        return result;
    };
    __decorate([
        property(cc.Node)
    ], BoxTipsCtrl.prototype, "content", void 0);
    __decorate([
        property(cc.Label)
    ], BoxTipsCtrl.prototype, "title", void 0);
    __decorate([
        property(cc.Prefab)
    ], BoxTipsCtrl.prototype, "rewardPrefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], BoxTipsCtrl.prototype, "rewardIconFrames", void 0);
    BoxTipsCtrl = __decorate([
        ccclass
    ], BoxTipsCtrl);
    return BoxTipsCtrl;
}(cc.Component));
exports.default = BoxTipsCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcQm94VGlwc0N0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXdDO0FBQ3hDLHNEQUFxRDtBQUNyRCxxREFBcUQ7QUFDckQsb0NBQStCO0FBQy9CLGlEQUFnRDtBQUUxQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQStFQztRQTVFRyxhQUFPLEdBQVksSUFBSSxDQUFDO1FBR3hCLFdBQUssR0FBYSxJQUFJLENBQUM7UUFHdkIsa0JBQVksR0FBYyxJQUFJLENBQUM7UUFHL0Isc0JBQWdCLEdBQXFCLEVBQUUsQ0FBQztRQUdqQyxhQUFPLEdBQVksS0FBSyxDQUFDOztJQWdFcEMsQ0FBQztJQTdERyw0QkFBTSxHQUFOO0lBRUEsQ0FBQztJQUVNLGdDQUFVLEdBQWpCLFVBQWtCLEtBQWEsRUFBRSxXQUFxQjtRQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxXQUFXLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN6QztJQUNMLENBQUM7SUFFTSwwQkFBSSxHQUFYLFVBQVksSUFBNEMsRUFBRSxHQUFhO1FBQXZFLGlCQThCQztRQTdCRyxJQUFJLElBQUksRUFBRTtZQUdOLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsQ0FBQTtZQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDYixJQUFNLElBQUksR0FBRyxXQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3RELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFbkIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDekMsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLG1CQUFRLENBQUMsU0FBUyxFQUFFO29CQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNwQjtnQkFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksc0JBQVUsQ0FBQyxJQUFJLEVBQUU7b0JBQzlCLEtBQUssR0FBRyxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzFDO2dCQUNELElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFJLEtBQU8sQ0FBQztZQUM3RSxDQUFDLENBQUMsQ0FBQTtZQUVGLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDZCxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUN4QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFFUCxXQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzFDO0lBQ0wsQ0FBQztJQUVNLDBCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFckIsV0FBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU8sb0NBQWMsR0FBdEIsVUFBdUIsSUFBWTtRQUMvQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxJQUFJLElBQUksbUJBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDNUIsTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsbUJBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtTQUM1RDthQUFNO1lBQ0gsTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDN0M7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBekVEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ007SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs4Q0FDSTtJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNXO0lBRy9CO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3lEQUNhO0lBWnZCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0ErRS9CO0lBQUQsa0JBQUM7Q0EvRUQsQUErRUMsQ0EvRXdDLEVBQUUsQ0FBQyxTQUFTLEdBK0VwRDtrQkEvRW9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IFByb3BUeXBlIH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCB7IEN1cnJlbmN5SWQgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9CYXNlQ29uc3RcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uL0NvbW1vblwiO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuLi8uLi8uLi9CYXNlL1V0aWxzL1V0aWxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJveFRpcHNDdHJsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHRpdGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHJld2FyZFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIHJld2FyZEljb25GcmFtZXM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuXG4gICAgcHVibGljIGlzUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZURhdGEodGl0bGU6IHN0cmluZywgY29udGVudFNpemU/OiBjYy5TaXplKSB7XG4gICAgICAgIHRoaXMudGl0bGUuc3RyaW5nID0gdGl0bGU7XG4gICAgICAgIGlmIChjb250ZW50U2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKGNvbnRlbnRTaXplKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KGRhdGE6IEFycmF5PHsgdHlwZTogbnVtYmVyLCBjb3VudDogbnVtYmVyIH0+LCBwb3M/OiBjYy5WZWMyKSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgdGhpcy5jb250ZW50LmRlc3Ryb3lBbGxDaGlsZHJlbigpXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IE0ubm9kZVBvb2wuY3JlYXRlSXRlbSh0aGlzLnJld2FyZFByZWZhYik7XG4gICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gaXRlbS5jb3VudC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5jb250ZW50O1xuICAgICAgICAgICAgICAgIG5vZGUuc2V0U2NhbGUoMC44KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGljb24gPSBub2RlLmdldENoaWxkQnlOYW1lKCdpY29uJyk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA8IFByb3BUeXBlLkJlaWtlQm9tYikge1xuICAgICAgICAgICAgICAgICAgICBpY29uLnNldFNjYWxlKDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09IEN1cnJlbmN5SWQuQ29pbikge1xuICAgICAgICAgICAgICAgICAgICBjb3VudCA9IENvbW1vbi5ieXRlc1RvU2l6ZShpdGVtLmNvdW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWNvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMuX2dldFJld2FyZEljb24oaXRlbS50eXBlKTtcbiAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdjb3VudCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gYHgke2NvdW50fWA7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBwb3MgJiYgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgfSwgMC41KVxuXG4gICAgICAgICAgICBVdGlsLlRvb2wuT3BlblVJVHdlZW4odGhpcy5ub2RlLCBudWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBoaWRlKCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xuXG4gICAgICAgIFV0aWwuVG9vbC5DbG9zZVVJVHdlZW4odGhpcy5ub2RlLCBudWxsKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRSZXdhcmRJY29uKHR5cGU6IG51bWJlcik6IGNjLlNwcml0ZUZyYW1lIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICAgIGlmICh0eXBlID49IFByb3BUeXBlLkJlaWtlQm9tYikge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5yZXdhcmRJY29uRnJhbWVzW3R5cGUgLSBQcm9wVHlwZS5CZWlrZUJvbWJdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLnJld2FyZEljb25GcmFtZXNbMjAgKyB0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuXG59XG4iXX0=