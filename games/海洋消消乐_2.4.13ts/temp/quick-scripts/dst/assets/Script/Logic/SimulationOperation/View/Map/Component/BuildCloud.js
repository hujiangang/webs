
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/SimulationOperation/View/Map/Component/BuildCloud.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '664b3LoSHhG2ZlVBqJNvOLf', 'BuildCloud');
// Script/Logic/SimulationOperation/View/Map/Component/BuildCloud.ts

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
var M_1 = require("../../../../../Base/Manager/M");
var MapIslandUtils_1 = require("../MapIslandUtils");
var Util_1 = require("../../../../../Base/Utils/Util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 海岛装扮云的遮挡层
 */
var BuildCloud = /** @class */ (function (_super) {
    __extends(BuildCloud, _super);
    function BuildCloud() {
        // @property(cc.Integer)
        // beginId: number = -1;  //遮挡起始建筑id
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cloudId = -1; //遮挡结束建筑id
        _this.buildingIds = [];
        return _this;
        // onDestroy() {
        // cc.loader.releaseRes("texture/map/cloud/map_cloud_" + this.cloudId);
        // }
    }
    BuildCloud.prototype.onLoad = function () {
        var _this = this;
        if (this.buildingIds.length <= 0)
            return;
        // // var beginConfig = MapIslandUtils.getBuildConfigById(this.beginId);
        // // if (beginConfig) {
        // //     if (star >= beginConfig.starlv) {
        // //         console.error("隐藏");
        // //         this.node.active = false;
        // //     } else {
        // //         this.node.active = true;
        // //     }
        // // }
        var show = true;
        var star = M_1.default.runtime.getStarCount();
        for (var i = 0; i < this.buildingIds.length; ++i) {
            var iconfig = MapIslandUtils_1.default.getBuildConfigById(this.buildingIds[i]);
            if (iconfig && star >= iconfig.starlv) {
                show = false;
                break;
            }
        }
        this.node.active = show;
        if (show) {
            Util_1.Util.Loader.loadSpriteFrame("texture/map/cloud/map_cloud_" + this.cloudId, function (err, texture) {
                var Sprite = _this.node.getComponent(cc.Sprite);
                Sprite && (Sprite.spriteFrame = texture);
            });
        }
    };
    __decorate([
        property(cc.Integer)
    ], BuildCloud.prototype, "cloudId", void 0);
    __decorate([
        property([cc.Integer])
    ], BuildCloud.prototype, "buildingIds", void 0);
    BuildCloud = __decorate([
        ccclass
    ], BuildCloud);
    return BuildCloud;
}(cc.Component));
exports.default = BuildCloud;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcU2ltdWxhdGlvbk9wZXJhdGlvblxcVmlld1xcTWFwXFxDb21wb25lbnRcXEJ1aWxkQ2xvdWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBQzlDLG9EQUErQztBQUMvQyx1REFBc0Q7QUFFaEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7O0dBRUc7QUFFSDtJQUF3Qyw4QkFBWTtJQUFwRDtRQUVJLHdCQUF3QjtRQUN4QixvQ0FBb0M7UUFIeEMscUVBOENDO1FBeENHLGFBQU8sR0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFJLFVBQVU7UUFHbkMsaUJBQVcsR0FBYSxFQUFFLENBQUM7O1FBa0MzQixnQkFBZ0I7UUFDWix1RUFBdUU7UUFDM0UsSUFBSTtJQUNSLENBQUM7SUFuQ1UsMkJBQU0sR0FBYjtRQUFBLGlCQThCQztRQTdCRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUM7WUFBRSxPQUFPO1FBRXpDLHdFQUF3RTtRQUN4RSx3QkFBd0I7UUFDeEIsMkNBQTJDO1FBQzNDLGtDQUFrQztRQUNsQyx1Q0FBdUM7UUFDdkMsa0JBQWtCO1FBQ2xCLHNDQUFzQztRQUN0QyxXQUFXO1FBQ1gsT0FBTztRQUVQLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLElBQUksR0FBRyxXQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtZQUM5QyxJQUFJLE9BQU8sR0FBRyx3QkFBYyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRSxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDbkMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFDYixNQUFNO2FBQ1Q7U0FDSjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUV4QixJQUFJLElBQUksRUFBRTtZQUNOLFdBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLDhCQUE4QixHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTztnQkFDcEYsSUFBSSxNQUFNLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBbkNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7K0NBQ0E7SUFHckI7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7bURBQ0k7SUFUVixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBOEM5QjtJQUFELGlCQUFDO0NBOUNELEFBOENDLENBOUN1QyxFQUFFLENBQUMsU0FBUyxHQThDbkQ7a0JBOUNvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgTWFwSXNsYW5kVXRpbHMgZnJvbSBcIi4uL01hcElzbGFuZFV0aWxzXCI7XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL0Jhc2UvVXRpbHMvVXRpbFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG4vKipcbiAqIOa1t+Wym+ijheaJruS6keeahOmBruaMoeWxglxuICovXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVpbGRDbG91ZCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICAvLyBAcHJvcGVydHkoY2MuSW50ZWdlcilcbiAgICAvLyBiZWdpbklkOiBudW1iZXIgPSAtMTsgIC8v6YGu5oyh6LW35aeL5bu6562RaWRcblxuICAgIEBwcm9wZXJ0eShjYy5JbnRlZ2VyKVxuICAgIGNsb3VkSWQ6IG51bWJlciA9IC0xOyAgICAvL+mBruaMoee7k+adn+W7uuetkWlkXG5cbiAgICBAcHJvcGVydHkoW2NjLkludGVnZXJdKVxuICAgIGJ1aWxkaW5nSWRzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgcHVibGljIG9uTG9hZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYnVpbGRpbmdJZHMubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgICAgICAvLyAvLyB2YXIgYmVnaW5Db25maWcgPSBNYXBJc2xhbmRVdGlscy5nZXRCdWlsZENvbmZpZ0J5SWQodGhpcy5iZWdpbklkKTtcbiAgICAgICAgLy8gLy8gaWYgKGJlZ2luQ29uZmlnKSB7XG4gICAgICAgIC8vIC8vICAgICBpZiAoc3RhciA+PSBiZWdpbkNvbmZpZy5zdGFybHYpIHtcbiAgICAgICAgLy8gLy8gICAgICAgICBjb25zb2xlLmVycm9yKFwi6ZqQ6JePXCIpO1xuICAgICAgICAvLyAvLyAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgLy8gLy8gICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIC8vICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIC8vIC8vICAgICB9XG4gICAgICAgIC8vIC8vIH1cblxuICAgICAgICBsZXQgc2hvdyA9IHRydWU7XG4gICAgICAgIHZhciBzdGFyID0gTS5ydW50aW1lLmdldFN0YXJDb3VudCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYnVpbGRpbmdJZHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBpY29uZmlnID0gTWFwSXNsYW5kVXRpbHMuZ2V0QnVpbGRDb25maWdCeUlkKHRoaXMuYnVpbGRpbmdJZHNbaV0pO1xuICAgICAgICAgICAgaWYgKGljb25maWcgJiYgc3RhciA+PSBpY29uZmlnLnN0YXJsdikge1xuICAgICAgICAgICAgICAgIHNob3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gc2hvdztcblxuICAgICAgICBpZiAoc2hvdykge1xuICAgICAgICAgICAgVXRpbC5Mb2FkZXIubG9hZFNwcml0ZUZyYW1lKFwidGV4dHVyZS9tYXAvY2xvdWQvbWFwX2Nsb3VkX1wiICsgdGhpcy5jbG91ZElkLCAoZXJyLCB0ZXh0dXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IFNwcml0ZSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgICAgICAgICBTcHJpdGUgJiYgKFNwcml0ZS5zcHJpdGVGcmFtZSA9IHRleHR1cmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBvbkRlc3Ryb3koKSB7XG4gICAgICAgIC8vIGNjLmxvYWRlci5yZWxlYXNlUmVzKFwidGV4dHVyZS9tYXAvY2xvdWQvbWFwX2Nsb3VkX1wiICsgdGhpcy5jbG91ZElkKTtcbiAgICAvLyB9XG59Il19