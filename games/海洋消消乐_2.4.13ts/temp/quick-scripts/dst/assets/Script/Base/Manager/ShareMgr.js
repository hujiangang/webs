
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/ShareMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8c89aw6Pl1C9pcG1LKJVQfS', 'ShareMgr');
// Script/Base/Manager/ShareMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var M_1 = require("./M");
var BaseConst_1 = require("../BaseConst");
var Paths_1 = require("../Utils/Paths");
var ShareMgr = /** @class */ (function () {
    function ShareMgr() {
        this._shareCdnPath = "";
    }
    Object.defineProperty(ShareMgr, "ins", {
        get: function () {
            if (this.instance == null) {
                this.instance = new ShareMgr();
            }
            return this.instance;
        },
        enumerable: false,
        configurable: true
    });
    //关卡的分享点
    ShareMgr.prototype.doShareLevel = function (level, next) {
        var config = this.getConfig(level, "level");
        if (config) {
            this.doShare(config.shareText, config.shareImg, next);
        }
        else {
            console.error("拿不到分享配置level =", level);
            next(false);
        }
    };
    //建筑的分享点
    ShareMgr.prototype.doShareBuild = function (buildId, next) {
        var config = this.getConfig(buildId, "buildId");
        if (config) {
            this.doShare(config.shareText, config.shareImg, next);
        }
        else {
            console.error("拿不到分享配置buildId =", buildId);
            next(false);
        }
    };
    //关卡失败，加步数的分享
    ShareMgr.prototype.LevelFailAddStepShare = function () {
        M_1.default.platform.share("快来一起玩游戏", Paths_1.default.ShareImgPath + "level_share_45.png", 1);
    };
    ShareMgr.prototype.doShare = function (text, img, next) {
        if (M_1.default.platform.type == BaseConst_1.PlatformType.Web) {
            next && next(true);
        }
        else {
            M_1.default.platform.share(text, Paths_1.default.ShareImgPath + img + ".png").then(function (result) {
                next && next(result);
            });
        }
    };
    ShareMgr.prototype.getConfig = function (value, key) {
        var config = M_1.default.table.ShareCfg.getData();
        for (var i = 0; i < config.length; ++i) {
            if (config[i][key] == value) {
                return config[i];
            }
        }
        return null;
    };
    ShareMgr.instance = null;
    return ShareMgr;
}());
exports.default = ShareMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxTaGFyZU1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlCQUFvQjtBQUNwQiwwQ0FBNEM7QUFDNUMsd0NBQW1DO0FBRW5DO0lBQUE7UUFJWSxrQkFBYSxHQUFHLEVBQUUsQ0FBQztJQXlEL0IsQ0FBQztJQXZERyxzQkFBa0IsZUFBRzthQUFyQjtZQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQzthQUNsQztZQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVELFFBQVE7SUFDRCwrQkFBWSxHQUFuQixVQUFvQixLQUFhLEVBQUUsSUFBSTtRQUNuQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1QyxJQUFJLE1BQU0sRUFBRTtZQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3pEO2FBQU07WUFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVELFFBQVE7SUFDRCwrQkFBWSxHQUFuQixVQUFvQixPQUFlLEVBQUUsSUFBSTtRQUNyQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNoRCxJQUFJLE1BQU0sRUFBRTtZQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3pEO2FBQU07WUFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUdELGFBQWE7SUFDTix3Q0FBcUIsR0FBNUI7UUFDSSxXQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsZUFBSyxDQUFDLFlBQVksR0FBRyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUM3RSxDQUFDO0lBR08sMEJBQU8sR0FBZixVQUFnQixJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDM0IsSUFBSSxXQUFDLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSx3QkFBWSxDQUFDLEdBQUcsRUFBRTtZQUNyQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RCO2FBQU07WUFDSCxXQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsZUFBSyxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBZTtnQkFDM0UsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVNLDRCQUFTLEdBQWhCLFVBQWlCLEtBQUssRUFBRSxHQUFHO1FBQ3ZCLElBQUksTUFBTSxHQUFHLFdBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3BDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssRUFBRTtnQkFDekIsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEI7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUExRGEsaUJBQVEsR0FBYSxJQUFJLENBQUM7SUEyRDVDLGVBQUM7Q0E3REQsQUE2REMsSUFBQTtrQkE3RG9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTSBmcm9tIFwiLi9NXCI7XG5pbXBvcnQgeyBQbGF0Zm9ybVR5cGUgfSBmcm9tIFwiLi4vQmFzZUNvbnN0XCI7XG5pbXBvcnQgUGF0aHMgZnJvbSBcIi4uL1V0aWxzL1BhdGhzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXJlTWdyIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgaW5zdGFuY2U6IFNoYXJlTWdyID0gbnVsbDtcblxuICAgIHByaXZhdGUgX3NoYXJlQ2RuUGF0aCA9IFwiXCI7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBpbnMoKTogU2hhcmVNZ3Ige1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IFNoYXJlTWdyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgLy/lhbPljaHnmoTliIbkuqvngrlcbiAgICBwdWJsaWMgZG9TaGFyZUxldmVsKGxldmVsOiBudW1iZXIsIG5leHQpIHtcbiAgICAgICAgbGV0IGNvbmZpZyA9IHRoaXMuZ2V0Q29uZmlnKGxldmVsLCBcImxldmVsXCIpO1xuICAgICAgICBpZiAoY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLmRvU2hhcmUoY29uZmlnLnNoYXJlVGV4dCwgY29uZmlnLnNoYXJlSW1nLCBuZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmi7/kuI3liLDliIbkuqvphY3nva5sZXZlbCA9XCIsIGxldmVsKTtcbiAgICAgICAgICAgIG5leHQoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/lu7rnrZHnmoTliIbkuqvngrlcbiAgICBwdWJsaWMgZG9TaGFyZUJ1aWxkKGJ1aWxkSWQ6IG51bWJlciwgbmV4dCkge1xuICAgICAgICBsZXQgY29uZmlnID0gdGhpcy5nZXRDb25maWcoYnVpbGRJZCwgXCJidWlsZElkXCIpO1xuICAgICAgICBpZiAoY29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLmRvU2hhcmUoY29uZmlnLnNoYXJlVGV4dCwgY29uZmlnLnNoYXJlSW1nLCBuZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmi7/kuI3liLDliIbkuqvphY3nva5idWlsZElkID1cIiwgYnVpbGRJZCk7XG4gICAgICAgICAgICBuZXh0KGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy/lhbPljaHlpLHotKXvvIzliqDmraXmlbDnmoTliIbkuqtcbiAgICBwdWJsaWMgTGV2ZWxGYWlsQWRkU3RlcFNoYXJlKCkge1xuICAgICAgICBNLnBsYXRmb3JtLnNoYXJlKFwi5b+r5p2l5LiA6LW3546p5ri45oiPXCIsIFBhdGhzLlNoYXJlSW1nUGF0aCArIFwibGV2ZWxfc2hhcmVfNDUucG5nXCIsIDEpXG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGRvU2hhcmUodGV4dCwgaW1nLCBuZXh0KSB7XG4gICAgICAgIGlmIChNLnBsYXRmb3JtLnR5cGUgPT0gUGxhdGZvcm1UeXBlLldlYikge1xuICAgICAgICAgICAgbmV4dCAmJiBuZXh0KHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTS5wbGF0Zm9ybS5zaGFyZSh0ZXh0LCBQYXRocy5TaGFyZUltZ1BhdGggKyBpbWcgKyBcIi5wbmdcIikudGhlbigocmVzdWx0OiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV4dCAmJiBuZXh0KHJlc3VsdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDb25maWcodmFsdWUsIGtleSkge1xuICAgICAgICB2YXIgY29uZmlnID0gTS50YWJsZS5TaGFyZUNmZy5nZXREYXRhKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29uZmlnLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoY29uZmlnW2ldW2tleV0gPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn0iXX0=