"use strict";
cc._RF.push(module, 'd9c84Zm8N1KZYoOuT2eQFKY', 'Webapp');
// Script/Base/Manager/Plaform/Webapp.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseConst_1 = require("../../BaseConst");
var Log_1 = require("../../Utils/Log");
var StorageMgr_1 = require("../StorageMgr");
var Webapp = /** @class */ (function () {
    function Webapp() {
        this.type = BaseConst_1.PlatformType.Web;
        this.options = null;
    }
    Webapp.prototype.share = function (text, imgUrl) {
        return new Promise(function (rsolve) {
            rsolve(true);
        });
    };
    Webapp.prototype.showBanner = function () {
    };
    Webapp.prototype.hideBanner = function () {
    };
    Webapp.prototype.showInterstitialAd = function () {
    };
    Webapp.prototype.showVideoAd = function () {
    };
    Webapp.prototype.init = function (o) {
        this.options = o;
    };
    Webapp.prototype.exit = function () {
    };
    Webapp.prototype.authorize = function () {
        return new Promise(function (resolve) {
            resolve(true);
        });
    };
    Webapp.prototype.login = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var userId = 'test19'; //StorageMgr.Storage.getString("__userId");
            if (!userId) {
                userId = "" + Date.now();
                StorageMgr_1.StorageMgr.Storage.setString("__userId", userId, true);
            }
            resolve({ code: (_this.options ? _this.options.appId : 'tt.tang') + "_" + userId });
        });
    };
    Webapp.prototype.getTopBangPosition = function () {
        return 0;
    };
    Webapp.prototype.getSystemInfoSync = function () {
        return {};
    };
    Webapp.prototype.onShow = function () {
    };
    Webapp.prototype.offShow = function () {
    };
    Webapp.prototype.onHide = function () {
    };
    Webapp.prototype.onNetworkStatusChange = function () {
    };
    Webapp.prototype.createAuthButton = function (box) {
        return new Promise(function (resolve) {
            resolve(null);
        });
    };
    Webapp.prototype.getUserInfo = function () {
        return new Promise(function (resolve) {
            resolve(null);
            // resolve({
            //     language: 'en',
            //     avatarUrl: '',
            //     city: '',
            //     country: 'cn',
            //     gender: 0,
            //     nickName: 'tt',
            //     province: 'gd'
            // });
        });
    };
    Webapp.prototype.getPlatfromVersion = function () {
        return null;
    };
    Webapp.prototype.getFileSystemMgr = function () {
        return null;
    };
    Webapp.prototype.downLoadFile = function (data) {
        return new Promise(function (resolve) {
            resolve(null);
        });
    };
    Webapp.prototype.loadRemotPicture = function (url, type) {
        if (type === void 0) { type = 'jpg'; }
        return new Promise(function (resolve, reject) {
            if (url.indexOf('http') != -1) {
                cc.loader.load({ url: url, type: type }, function (err, tex) {
                    if (err) {
                        Log_1.Log.e(err);
                        return resolve(null);
                    }
                    resolve(new cc.SpriteFrame(tex));
                });
            }
            else {
                cc.loader.loadRes(url, function (err, tex) {
                    if (err) {
                        Log_1.Log.e(err);
                        return resolve(null);
                    }
                    resolve(new cc.SpriteFrame(tex));
                });
            }
        });
    };
    Webapp.prototype.checkUpdate = function () {
    };
    Webapp.prototype.unzip = function (path) {
        return false;
    };
    Webapp.prototype.vibrateShort = function () {
    };
    Webapp.prototype.getMenuButtonBoundingClientRect = function () {
        return null;
    };
    Webapp.prototype.vibrateLong = function () {
    };
    return Webapp;
}());
exports.default = Webapp;

cc._RF.pop();