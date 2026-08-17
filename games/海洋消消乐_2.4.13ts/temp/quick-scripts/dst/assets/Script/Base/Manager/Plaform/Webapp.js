
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/Plaform/Webapp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxQbGFmb3JtXFxXZWJhcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2Q0FBMEQ7QUFDMUQsdUNBQXNDO0FBRXRDLDRDQUEyQztBQUUzQztJQTRCSTtRQUpPLFNBQUksR0FBaUIsd0JBQVksQ0FBQyxHQUFHLENBQUM7UUFFckMsWUFBTyxHQUFZLElBQUksQ0FBQztJQUloQyxDQUFDO0lBNUJNLHNCQUFLLEdBQVosVUFBYSxJQUFZLEVBQUUsTUFBYztRQUNyQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsTUFBTTtZQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sMkJBQVUsR0FBakI7SUFFQSxDQUFDO0lBRU0sMkJBQVUsR0FBakI7SUFFQSxDQUFDO0lBRU0sbUNBQWtCLEdBQXpCO0lBRUEsQ0FBQztJQUVNLDRCQUFXLEdBQWxCO0lBRUEsQ0FBQztJQVVNLHFCQUFJLEdBQVgsVUFBWSxDQUFVO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFHTSxxQkFBSSxHQUFYO0lBQ0EsQ0FBQztJQUVNLDBCQUFTLEdBQWhCO1FBQ0ksT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLHNCQUFLLEdBQVo7UUFBQSxpQkFTQztRQVJHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO1lBQ3ZCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFBLDJDQUEyQztZQUNqRSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE1BQU0sR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUN6Qix1QkFBVSxDQUFDLE9B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QUFaLFVBQWEsSUFBWTtRQUNyQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU0sNkJBQVksR0FBbkI7SUFHQSxDQUFDO0lBRU0sZ0RBQStCLEdBQXRDO1FBQ0ksT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLDRCQUFXLEdBQWxCO0lBRUEsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQS9KQSxBQStKQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElQbGF0Zm9ybSwgeyBPcHRpb25zIH0gZnJvbSBcIi4vSVBsYXRmb3JtXCI7XG5pbXBvcnQgeyBJVXNlckluZm8sIFBsYXRmb3JtVHlwZSB9IGZyb20gXCIuLi8uLi9CYXNlQ29uc3RcIjtcbmltcG9ydCB7IExvZyB9IGZyb20gXCIuLi8uLi9VdGlscy9Mb2dcIjtcbmltcG9ydCBBcHBzIGZyb20gXCIuLi8uLi9BcHBzXCI7XG5pbXBvcnQgeyBTdG9yYWdlTWdyIH0gZnJvbSBcIi4uL1N0b3JhZ2VNZ3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViYXBwIGltcGxlbWVudHMgSVBsYXRmb3JtIHtcblxuICAgIHB1YmxpYyBzaGFyZSh0ZXh0OiBzdHJpbmcsIGltZ1VybDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocnNvbHZlKSA9PiB7XG4gICAgICAgICAgICByc29sdmUodHJ1ZSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIHNob3dCYW5uZXIoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZUJhbm5lcigpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93SW50ZXJzdGl0aWFsQWQoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd1ZpZGVvQWQoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgdHlwZTogUGxhdGZvcm1UeXBlID0gUGxhdGZvcm1UeXBlLldlYjtcblxuICAgIHByaXZhdGUgb3B0aW9uczogT3B0aW9ucyA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KG86IE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gbztcbiAgICB9XG5cblxuICAgIHB1YmxpYyBleGl0KCkge1xuICAgIH1cblxuICAgIHB1YmxpYyBhdXRob3JpemUoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBsb2dpbigpOiBQcm9taXNlPHsgY29kZTogc3RyaW5nIH0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBsZXQgdXNlcklkID0gJ3Rlc3QxOSc7Ly9TdG9yYWdlTWdyLlN0b3JhZ2UuZ2V0U3RyaW5nKFwiX191c2VySWRcIik7XG4gICAgICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgICAgIHVzZXJJZCA9IFwiXCIgKyBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIFN0b3JhZ2VNZ3IuU3RvcmFnZS5zZXRTdHJpbmcoXCJfX3VzZXJJZFwiLCB1c2VySWQsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzb2x2ZSh7IGNvZGU6IGAke3RoaXMub3B0aW9ucyA/IHRoaXMub3B0aW9ucy5hcHBJZCA6ICd0dC50YW5nJ31fJHt1c2VySWR9YCB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VG9wQmFuZ1Bvc2l0aW9uKCk6IG51bWJlciB7XG5cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFN5c3RlbUluZm9TeW5jKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TaG93KCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIG9mZlNob3coKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgb25IaWRlKCkge1xuXG4gICAgfVxuXG4gICAgcHVibGljIG9uTmV0d29ya1N0YXR1c0NoYW5nZSgpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVBdXRoQnV0dG9uKGJveCk6IGFueSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVzZXJJbmZvKCk6IFByb21pc2U8SVVzZXJJbmZvPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIC8vIHJlc29sdmUoe1xuICAgICAgICAgICAgLy8gICAgIGxhbmd1YWdlOiAnZW4nLFxuICAgICAgICAgICAgLy8gICAgIGF2YXRhclVybDogJycsXG4gICAgICAgICAgICAvLyAgICAgY2l0eTogJycsXG4gICAgICAgICAgICAvLyAgICAgY291bnRyeTogJ2NuJyxcbiAgICAgICAgICAgIC8vICAgICBnZW5kZXI6IDAsXG4gICAgICAgICAgICAvLyAgICAgbmlja05hbWU6ICd0dCcsXG4gICAgICAgICAgICAvLyAgICAgcHJvdmluY2U6ICdnZCdcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQbGF0ZnJvbVZlcnNpb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEZpbGVTeXN0ZW1NZ3IoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBkb3duTG9hZEZpbGUoZGF0YTogeyB1cmw6IHN0cmluZywgZmlsZVBhdGg6IHN0cmluZyB9KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZFJlbW90UGljdHVyZSh1cmw6IHN0cmluZywgdHlwZTogc3RyaW5nID0gJ2pwZycpOiBQcm9taXNlPGNjLlNwcml0ZUZyYW1lPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxjYy5TcHJpdGVGcmFtZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHVybC5pbmRleE9mKCdodHRwJykgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZCh7IHVybCwgdHlwZSB9LCAoZXJyLCB0ZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nLmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobmV3IGNjLlNwcml0ZUZyYW1lKHRleCkpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHVybCwgKGVyciwgdGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXgpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgY2hlY2tVcGRhdGUoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgdW56aXAocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdmlicmF0ZVNob3J0KCk6IHZvaWQge1xuXG5cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TWVudUJ1dHRvbkJvdW5kaW5nQ2xpZW50UmVjdCgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHZpYnJhdGVMb25nKCk6IHZvaWQge1xuXG4gICAgfVxufVxuXG5cbiJdfQ==