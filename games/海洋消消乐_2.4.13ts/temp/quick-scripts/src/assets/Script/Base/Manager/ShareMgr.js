"use strict";
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