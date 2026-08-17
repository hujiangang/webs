
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/Plaform/Wechat.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'eea1doqNGhKAaXgztbwxzCS', 'Wechat');
// Script/Base/Manager/Plaform/Wechat.ts

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseConst_1 = require("../../BaseConst");
var EventMgr_1 = require("../EventMgr");
var Log_1 = require("../../Utils/Log");
var Util_1 = require("../../Utils/Util");
var Paths_1 = require("../../Utils/Paths");
var M_1 = require("../M");
var RuntimeMgr_1 = require("../../../Logic/Data/RuntimeMgr");
var NetMgr_1 = require("../NetMgr");
var Wechat = /** @class */ (function () {
    function Wechat() {
        this.type = BaseConst_1.PlatformType.WxGame;
        /**当前平台的系统信息 */
        this.systemInfo = null;
        /**当前的用户信息 */
        this.userInfo = null;
        /**初始化的基础信息 */
        this.options = null;
        /**分享回调 */
        this._shareResolve = null;
        this._bannerAD = null;
        this._interstitialAD = null;
        // private _videoAd: wx.RewardedVideoAd = null;
        /**注册onShow onHide */
        this._onShow = null;
        this._onHide = null;
        /**注册Banner的 onError onResize */
        this._onBannerError = null;
        this._onBannerResize = null;
        /**注册插屏 */
        this._isIntrstitialReady = false;
        /**注册视频 */
        this._videoResolve = null;
        this._videoMap = null;
        /**开放域中的字段 */
        this.wxOpenDataKey = {
            Score: "Score",
        };
        wx.showShareMenu({ withShareTicket: true });
        wx.setKeepScreenOn({ keepScreenOn: true });
        wx.onMemoryWarning(function (res) {
            EventMgr_1.default.ins.send(BaseConst_1.PlatformEvenType.OnMemoryWarning);
        });
        this._videoMap = new Map();
        this._onShow = this._showCallBack.bind(this);
        this._onHide = this._hideCallBack.bind(this);
        this.onShow();
        this.onHide();
    }
    Wechat.prototype.init = function (o) {
        this.options = o;
        if (o && o.adIds && o.adIds.Interstitial) {
            this._createInterstitialAd(o.adIds.Interstitial);
        }
        if (o && o.adIds && o.adIds.Video) {
            this._createInterstitialAd(o.adIds.Interstitial);
        }
    };
    Wechat.prototype.exit = function () {
        wx.exitMiniProgram({});
    };
    Wechat.prototype.authorize = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getUserInfo()];
            });
        });
    };
    Wechat.prototype.login = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            wx.login({
                success: function (codeObj) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        resolve({ code: codeObj.code });
                        return [2 /*return*/];
                    });
                }); },
                fail: function (e) {
                    Log_1.Log.e('WeChat Login Error : ', e);
                    resolve(null);
                }
            });
        });
    };
    Wechat.prototype.getTopBangPosition = function () {
        var top = this.getSystemInfoSync().safeArea.top;
        if (top != 0) {
            top = (top - 20) * 2; //cc.view.getDevicePixelRatio()
        }
        return top;
    };
    Wechat.prototype.getMenuButtonBoundingClientRect = function () {
        var result = null;
        if (wx.getMenuButtonBoundingClientRect) {
            var rect = wx.getMenuButtonBoundingClientRect();
            var dpr = cc.view.getDevicePixelRatio();
            var vsp = cc.v2(Math.ceil(cc.view.getCanvasSize().width / dpr), Math.ceil(cc.view.getCanvasSize().height / dpr));
            var vs = cc.view.getVisibleSize();
            var t = vsp.x / cc.view.getVisibleSize().width;
            // 转换为游戏里的坐标
            result = cc.rect(Math.ceil((rect.left / t) - vs.width * 0.5), Math.ceil(vs.height * 0.5 - (rect.bottom / t)), Math.ceil(rect.width / t), Math.ceil(rect.height / t));
        }
        return result;
    };
    Wechat.prototype.getSystemInfoSync = function () {
        if (!this.systemInfo) {
            this.systemInfo = wx.getSystemInfoSync();
        }
        return this.systemInfo;
    };
    Wechat.prototype.getLaunchOptionsSync = function () {
        this.launchOptions = wx.getLaunchOptionsSync();
    };
    Wechat.prototype.onShow = function () {
        wx.onShow(this._onShow);
        this._onShow(wx.getLaunchOptionsSync());
        wx.onShareAppMessage(function () {
            return {
                title: ['梦幻海岛的旅行,一定要和最爱的人去', '快来和小野一起挖海底的宝石吧'][Util_1.Util.Tool.rangeInt(0, 1)],
                imageUrl: [Paths_1.default.ShareImgPath + "level_share_25.png", Paths_1.default.ShareImgPath + "level_share_45.png"][Util_1.Util.Tool.rangeInt(0, 1)],
                query: "timeStamp=" + Date.parse(new Date().toString()) + "&uid=" + M_1.default.runtime.UserId
            };
        });
    };
    Wechat.prototype.offShow = function () {
        wx.offShow(this._onShow);
    };
    Wechat.prototype.onHide = function () {
        wx.onHide(this._onHide);
    };
    Wechat.prototype.offHide = function () {
        wx.offHide(this._onHide);
    };
    Wechat.prototype.onNetworkStatusChange = function () {
        wx.onNetworkStatusChange(this._netWorkStatusChanged);
    };
    Wechat.prototype.getUserInfo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.userInfo) {
                wx.getUserInfo({
                    withCredentials: false,
                    success: function (res) {
                        res && (_this.userInfo = res.userInfo);
                        resolve(res.userInfo);
                    },
                    fail: function (err) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            //没有取得授权,获取授权后再拿信息!
                            Log_1.Log.e('没有取得授权,获取用户信息失败!', err);
                            resolve(null);
                            return [2 /*return*/];
                        });
                    }); }
                });
            }
            else {
                resolve(_this.userInfo);
            }
        });
    };
    /**返回微信基础库版本号 */
    Wechat.prototype.getPlatfromVersion = function () {
        return this.systemInfo.SDKVersion;
    };
    /**获取文件管理操作对象 */
    Wechat.prototype.getFileSystemMgr = function () {
        return wx.getFileSystemManager();
    };
    Wechat.prototype.share = function (text, imgUrl, levelFailAddStep) {
        var _this = this;
        if (levelFailAddStep === void 0) { levelFailAddStep = 0; }
        cc.log("好友助力分享levelFailAddStep  " + levelFailAddStep);
        return new Promise(function (resolve) {
            _this._shareResolve = resolve;
            wx.shareAppMessage({
                title: text,
                imageUrl: imgUrl,
                query: "timeStamp=" + Date.parse(new Date().toString()) + "&uid=" + M_1.default.runtime.UserId + "&levelAddStep=" + levelFailAddStep,
            });
        });
    };
    Wechat.prototype._execShareReward = function (res) {
        if (this._shareResolve) {
            if (res && res.query) {
                if (res.query.timeStamp) {
                    var gap = Date.now() - Number(res.query.timeStamp);
                    if (gap >= 3000) {
                        this._shareResolve(true);
                    }
                    else {
                        this._shareResolve(false);
                    }
                }
                else {
                    this._shareResolve(true);
                }
            }
        }
        if (RuntimeMgr_1.default.ins.IsLogin) {
            NetMgr_1.default.ins.addFriend(res.query.uid);
        }
        else {
            //如果现在还没有登录...怎么办 ?????
            RuntimeMgr_1.default.ins.pushOnShowTask(res.query.uid);
        }
    };
    Wechat.prototype.downLoadFile = function (data) {
        return new Promise(function (resolve) {
            wx.downloadFile({
                url: data.url,
                filePath: data.filePath,
                success: function (res) {
                    console.error('downLoadFile : ', res);
                    console.error('wx.env:', wx.env.USER_DATA_PATH);
                    resolve(res);
                },
                fail: function (err) {
                    Log_1.Log.e('downLoadFile Err : ', err);
                    resolve(null);
                }
            });
        });
    };
    Wechat.prototype.loadRemotPicture = function (url, type) {
        if (type === void 0) { type = 'jpg'; }
        return new Promise(function (resolve, reject) {
            if (!url)
                return resolve(null);
            cc.loader.load({ url: url, type: type }, function (err, tex) {
                if (err) {
                    Log_1.Log.e(err);
                    return resolve(null);
                }
                resolve(new cc.SpriteFrame(tex));
            });
        });
    };
    ;
    /**检测游戏是否有更新 */
    Wechat.prototype.checkUpdate = function () {
        var updateManager = wx.getUpdateManager();
        if (updateManager) {
            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                Log_1.Log.i('onCheckForUpdate: ', res.hasUpdate);
            });
            updateManager.onUpdateReady(function () {
                // 请求完新版本信息的回调 
                wx.showModal({
                    title: '更新提示',
                    content: '发现新版本,请重新打开游戏.',
                    success: function (res) {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager.applyUpdate();
                        }
                    }
                });
            });
            updateManager.onUpdateFailed(function () {
                // 新的版本下载失败
            });
        }
    };
    Wechat.prototype.unzip = function (path) {
        return false;
    };
    Wechat.prototype.vibrateShort = function () {
        wx.vibrateShort({});
    };
    Wechat.prototype.vibrateLong = function () {
        wx.vibrateLong({});
    };
    Wechat.prototype.showBanner = function (adId) {
        if (!this._bannerAD) {
            this._createBanner(adId);
        }
        this._bannerAD.show().then(function () {
        }).catch(function (err) {
            console.error('catch show banner error : ', err);
        });
    };
    Wechat.prototype.hideBanner = function () {
        this._bannerAD && this._bannerAD.hide();
    };
    Wechat.prototype.showVideoAd = function (adId) {
        var _this = this;
        return new Promise(function (resolve) {
            _this._videoResolve = resolve;
            var _videoAd = _this._videoMap.get(adId);
            if (!_videoAd) {
                _videoAd = _this._createVideo(adId);
            }
            var play = function () {
                _videoAd.show().then(function () {
                }).catch(function (err) {
                    console.error('catch show video error : ', err);
                    _videoAd.load().then(function () {
                        play();
                    });
                });
            };
            play();
        });
    };
    Wechat.prototype._createVideo = function (adId) {
        var _videoAd = wx.createRewardedVideoAd({ adUnitId: adId });
        _videoAd.onClose(this._onVideoClose.bind(this));
        _videoAd.onError(this._onVideoError.bind(this));
        _videoAd.load();
        this._videoMap.set(adId, _videoAd);
        return _videoAd;
    };
    Wechat.prototype._onVideoError = function (err) {
        console.error('show video error : ', err);
        if (this._videoResolve) {
            // this._videoResolve(false);
        }
    };
    Wechat.prototype._onVideoClose = function (res) {
        if (this._videoResolve) {
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                this._videoResolve(true);
            }
            else {
                // 播放中途退出，不下发游戏奖励
                this._videoResolve(false);
            }
        }
    };
    Wechat.prototype.showInterstitialAd = function (adId) {
        if (!this._interstitialAD) {
            this._createInterstitialAd(adId);
        }
        this._interstitialAD.show().then(function () {
        }).catch(function (err) {
            console.error('catch show Interstitial error : ', err);
        });
    };
    Wechat.prototype._createInterstitialAd = function (adId) {
        this._interstitialAD = wx.createInterstitialAd({ adUnitId: adId });
        this._interstitialAD.onLoad(this._onInterstitialLoad.bind(this));
        this._interstitialAD.onClose(this._onInterstitialClose.bind(this));
        this._interstitialAD.onError(this._onInterstitialError.bind(this));
    };
    Wechat.prototype._onInterstitialClose = function () {
        this._isIntrstitialReady = false;
    };
    Wechat.prototype._onInterstitialError = function (err) {
        console.error('show Interstitial error : ', err);
    };
    Wechat.prototype._onInterstitialLoad = function () {
        this._isIntrstitialReady = true;
    };
    /**创建一个banner广告! */
    Wechat.prototype._createBanner = function (bannerId) {
        if (!this._onBannerError) {
            this._onBannerError = this._bannerOnError.bind(this);
            this._onBannerResize = this._bannerOnResize.bind(this);
        }
        else if (this._bannerAD) {
            this._bannerAD.offError(this._bannerOnError);
            this._bannerAD.offResize(this._bannerOnResize);
        }
        this._bannerAD = wx.createBannerAd({
            adUnitId: bannerId,
            adIntervals: 30,
            style: {
                left: 10,
                top: 76,
                width: 320
            }
        });
        this._bannerAD.onError(this._onBannerError);
        this._bannerAD.onResize(this._onBannerResize);
    };
    Wechat.prototype._bannerOnError = function (err) {
        console.error('show banner error : ', err);
    };
    Wechat.prototype._bannerOnResize = function () {
        console.error('banner resize : ');
    };
    /**网络发生变化 */
    Wechat.prototype._netWorkStatusChanged = function (res) {
        EventMgr_1.default.ins.send(BaseConst_1.PlatformEvenType.OnNetWorkChanged, res);
    };
    /**微信进入界面监听 */
    Wechat.prototype._showCallBack = function (res) {
        console.warn('on show!', res.query);
        this.launchOptions = res;
        this._execShareReward(res);
        EventMgr_1.default.ins.send(BaseConst_1.PlatformEvenType.OnShow, res);
        /*
        //上报服务器，好友分享进入游戏
        cc.log("上报服务器，好友分享进入游戏: " + M.runtime.UserId);
        if (res.query && res.query['uid'] && res.query['levelAddStep']) {
            M.net.clickShareEnterGame(res.query['uid']);
        }
        */
    };
    /**微信隐藏后后台界面监听 */
    Wechat.prototype._hideCallBack = function () {
        EventMgr_1.default.ins.send(BaseConst_1.PlatformEvenType.OnHide);
    };
    /********************************** 平台自定义方法 ***********************************/
    /**
     * 创建一个透明的授权按钮在Node上!
     * @param box 创建盒子的大小与位置
     */
    Wechat.prototype.createAuthButton = function (box) {
        var _this = this;
        if (!box)
            return null;
        return new Promise(function (resolve) {
            var btnSize = cc.size(box.w + 10, box.h + 10);
            var frameSize = cc.view.getFrameSize();
            var winSize = cc.winSize;
            //适配不同机型来创建微信授权按钮
            var left = (winSize.width / 2 + box.x - btnSize.width / 2) / winSize.width * frameSize.width;
            var top = (winSize.height / 2 - box.y - btnSize.height / 2) / winSize.height * frameSize.height;
            var width = btnSize.width / winSize.width * frameSize.width;
            var height = btnSize.height / winSize.height * frameSize.height;
            var wxButton = wx.createUserInfoButton({
                type: 'text',
                text: '',
                withCredentials: false,
                style: {
                    left: left,
                    top: top,
                    width: width,
                    height: height,
                    backgroundColor: '',
                    color: '#ffffff',
                    borderColor: '',
                    borderWidth: 0,
                    borderRadius: 4,
                    textAlign: "center",
                    fontSize: 16,
                    lineHeight: 0
                }
            });
            wxButton.onTap(function (uinfo) {
                if (uinfo.userInfo) {
                    _this.userInfo = uinfo.userInfo;
                    resolve(_this.userInfo);
                    wxButton.hide();
                }
                else {
                    resolve(null);
                }
            });
        });
    };
    /**
     * 向开放域发送信息!
     * @param msg 消息
     */
    Wechat.prototype.sendMsgToOpenData = function (msg) {
        wx.getOpenDataContext().postMessage(msg);
    };
    /**
     * 提交信息到开放域!
     * @param key
     * @param score
     */
    Wechat.prototype.uploadDataToWx = function (key, score) {
        wx.setUserCloudStorage({
            KVDataList: [
                { key: key, value: "" + score }
            ],
            success: function (msg) {
            },
            fail: function (err) {
                console.error('失败!', err);
            }
        });
    };
    /**
     * 删除微信开放域上所含的keys的数据!
     * @param keys
     */
    Wechat.prototype.deleteWxDataForKeys = function (keys) {
        if (typeof (keys) === "string") {
            keys = [keys];
        }
        wx.removeUserCloudStorage({
            keyList: keys
        });
    };
    return Wechat;
}());
exports.default = Wechat;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxQbGFmb3JtXFxXZWNoYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2Q0FBNEU7QUFFNUUsd0NBQW1DO0FBQ25DLHVDQUFzQztBQUN0Qyx5Q0FBd0M7QUFDeEMsMkNBQXNDO0FBQ3RDLDBCQUFxQjtBQUNyQiw2REFBd0Q7QUFDeEQsb0NBQStCO0FBRS9CO0lBc0NJO1FBcENPLFNBQUksR0FBaUIsd0JBQVksQ0FBQyxNQUFNLENBQUM7UUFFaEQsZUFBZTtRQUNQLGVBQVUsR0FBa0IsSUFBSSxDQUFDO1FBQ3pDLGFBQWE7UUFDTCxhQUFRLEdBQWMsSUFBSSxDQUFBO1FBQ2xDLGNBQWM7UUFDTixZQUFPLEdBQVksSUFBSSxDQUFDO1FBQ2hDLFVBQVU7UUFDRixrQkFBYSxHQUFhLElBQUksQ0FBQztRQUUvQixjQUFTLEdBQWdCLElBQUksQ0FBQztRQUU5QixvQkFBZSxHQUFRLElBQUksQ0FBQztRQUVwQywrQ0FBK0M7UUFFL0MscUJBQXFCO1FBQ2IsWUFBTyxHQUFHLElBQUksQ0FBQztRQUNmLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDdkIsZ0NBQWdDO1FBQ3hCLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBQy9CLFVBQVU7UUFDRix3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDN0MsVUFBVTtRQUNGLGtCQUFhLEdBQWEsSUFBSSxDQUFDO1FBQy9CLGNBQVMsR0FBb0MsSUFBSSxDQUFDO1FBRTFELGFBQWE7UUFDTixrQkFBYSxHQUFHO1lBQ25CLEtBQUssRUFBRSxPQUFPO1NBQ2pCLENBQUE7UUFLRyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDNUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUFF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QUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGtDQUFpQixHQUF4QixVQUF5QixHQUFRO1FBQzdCLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLCtCQUFjLEdBQXJCLFVBQXNCLEdBQVcsRUFBRSxLQUFhO1FBQzVDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztZQUNuQixVQUFVLEVBQUU7Z0JBQ1IsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFHLEtBQU8sRUFBRTthQUNsQztZQUNELE9BQU8sRUFBRSxVQUFDLEdBQUc7WUFFYixDQUFDO1lBQ0QsSUFBSSxFQUFFLFVBQUMsR0FBRztnQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM5QixDQUFDO1NBQ0osQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVEOzs7T0FHRztJQUNJLG9DQUFtQixHQUExQixVQUEyQixJQUFtQjtRQUMxQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDNUIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDaEI7UUFDRCxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDdEIsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUdMLGFBQUM7QUFBRCxDQS9nQkEsQUErZ0JDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IElVc2VySW5mbywgUGxhdGZvcm1FdmVuVHlwZSwgUGxhdGZvcm1UeXBlIH0gZnJvbSAnLi4vLi4vQmFzZUNvbnN0JztcbmltcG9ydCBJUGxhdGZvcm0sIHsgT3B0aW9ucyB9IGZyb20gXCIuL0lQbGF0Zm9ybVwiO1xuaW1wb3J0IEV2ZW50TWdyIGZyb20gJy4uL0V2ZW50TWdyJztcbmltcG9ydCB7IExvZyB9IGZyb20gJy4uLy4uL1V0aWxzL0xvZyc7XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSAnLi4vLi4vVXRpbHMvVXRpbCc7XG5pbXBvcnQgUGF0aHMgZnJvbSAnLi4vLi4vVXRpbHMvUGF0aHMnO1xuaW1wb3J0IE0gZnJvbSAnLi4vTSc7XG5pbXBvcnQgUnVudGltZU1nciBmcm9tICcuLi8uLi8uLi9Mb2dpYy9EYXRhL1J1bnRpbWVNZ3InO1xuaW1wb3J0IE5ldE1nciBmcm9tICcuLi9OZXRNZ3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWNoYXQgaW1wbGVtZW50cyBJUGxhdGZvcm0ge1xuXG4gICAgcHVibGljIHR5cGU6IFBsYXRmb3JtVHlwZSA9IFBsYXRmb3JtVHlwZS5XeEdhbWU7XG5cbiAgICAvKirlvZPliY3lubPlj7DnmoTns7vnu5/kv6Hmga8gKi9cbiAgICBwcml2YXRlIHN5c3RlbUluZm86IHd4LnN5c3RlbUluZm8gPSBudWxsO1xuICAgIC8qKuW9k+WJjeeahOeUqOaIt+S/oeaBryAqL1xuICAgIHByaXZhdGUgdXNlckluZm86IElVc2VySW5mbyA9IG51bGxcbiAgICAvKirliJ3lp4vljJbnmoTln7rnoYDkv6Hmga8gKi9cbiAgICBwcml2YXRlIG9wdGlvbnM6IE9wdGlvbnMgPSBudWxsO1xuICAgIC8qKuWIhuS6q+WbnuiwgyAqL1xuICAgIHByaXZhdGUgX3NoYXJlUmVzb2x2ZTogRnVuY3Rpb24gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfYmFubmVyQUQ6IHd4LkJhbm5lckFkID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2ludGVyc3RpdGlhbEFEOiBhbnkgPSBudWxsO1xuXG4gICAgLy8gcHJpdmF0ZSBfdmlkZW9BZDogd3guUmV3YXJkZWRWaWRlb0FkID0gbnVsbDtcblxuICAgIC8qKuazqOWGjG9uU2hvdyBvbkhpZGUgKi9cbiAgICBwcml2YXRlIF9vblNob3cgPSBudWxsO1xuICAgIHByaXZhdGUgX29uSGlkZSA9IG51bGw7XG4gICAgLyoq5rOo5YaMQmFubmVy55qEIG9uRXJyb3Igb25SZXNpemUgKi9cbiAgICBwcml2YXRlIF9vbkJhbm5lckVycm9yID0gbnVsbDtcbiAgICBwcml2YXRlIF9vbkJhbm5lclJlc2l6ZSA9IG51bGw7XG4gICAgLyoq5rOo5YaM5o+S5bGPICovXG4gICAgcHJpdmF0ZSBfaXNJbnRyc3RpdGlhbFJlYWR5OiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoq5rOo5YaM6KeG6aKRICovXG4gICAgcHJpdmF0ZSBfdmlkZW9SZXNvbHZlOiBGdW5jdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBfdmlkZW9NYXA6IE1hcDxzdHJpbmcsIHd4LlJld2FyZGVkVmlkZW9BZD4gPSBudWxsO1xuXG4gICAgLyoq5byA5pS+5Z+f5Lit55qE5a2X5q61ICovXG4gICAgcHVibGljIHd4T3BlbkRhdGFLZXkgPSB7XG4gICAgICAgIFNjb3JlOiBcIlNjb3JlXCIsXG4gICAgfVxuXG4gICAgcHVibGljIGxhdW5jaE9wdGlvbnM6IHd4LmxhdW5jaE9wdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB3eC5zaG93U2hhcmVNZW51KHsgd2l0aFNoYXJlVGlja2V0OiB0cnVlIH0pO1xuICAgICAgICB3eC5zZXRLZWVwU2NyZWVuT24oeyBrZWVwU2NyZWVuT246IHRydWUgfSk7XG4gICAgICAgIHd4Lm9uTWVtb3J5V2FybmluZygocmVzOiB7IGxldmVsOiBudW1iZXIgfSkgPT4ge1xuICAgICAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoUGxhdGZvcm1FdmVuVHlwZS5Pbk1lbW9yeVdhcm5pbmcpO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLl92aWRlb01hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fb25TaG93ID0gdGhpcy5fc2hvd0NhbGxCYWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX29uSGlkZSA9IHRoaXMuX2hpZGVDYWxsQmFjay5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMub25TaG93KCk7XG4gICAgICAgIHRoaXMub25IaWRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQobzogT3B0aW9ucykge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvO1xuICAgICAgICBpZiAobyAmJiBvLmFkSWRzICYmIG8uYWRJZHMuSW50ZXJzdGl0aWFsKSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVJbnRlcnN0aXRpYWxBZChvLmFkSWRzLkludGVyc3RpdGlhbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG8gJiYgby5hZElkcyAmJiBvLmFkSWRzLlZpZGVvKSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVJbnRlcnN0aXRpYWxBZChvLmFkSWRzLkludGVyc3RpdGlhbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZXhpdCgpIHtcbiAgICAgICAgd3guZXhpdE1pbmlQcm9ncmFtKHt9KVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBhdXRob3JpemUoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VXNlckluZm8oKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9naW4oKTogUHJvbWlzZTx7IGNvZGU6IHN0cmluZyB9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB3eC5sb2dpbih7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogYXN5bmMgKGNvZGVPYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7IGNvZGU6IGNvZGVPYmouY29kZSB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhaWw6IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5lKCdXZUNoYXQgTG9naW4gRXJyb3IgOiAnLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VG9wQmFuZ1Bvc2l0aW9uKCkge1xuICAgICAgICBsZXQgdG9wID0gdGhpcy5nZXRTeXN0ZW1JbmZvU3luYygpLnNhZmVBcmVhLnRvcDtcbiAgICAgICAgaWYgKHRvcCAhPSAwKSB7XG4gICAgICAgICAgICB0b3AgPSAodG9wIC0gMjApICogMjsgLy9jYy52aWV3LmdldERldmljZVBpeGVsUmF0aW8oKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b3A7XG4gICAgfVxuXG4gICAgcHVibGljIGdldE1lbnVCdXR0b25Cb3VuZGluZ0NsaWVudFJlY3QoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgICBpZiAod3guZ2V0TWVudUJ1dHRvbkJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgICAgICAgICAgbGV0IHJlY3QgPSB3eC5nZXRNZW51QnV0dG9uQm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBsZXQgZHByID0gY2Mudmlldy5nZXREZXZpY2VQaXhlbFJhdGlvKCk7XG4gICAgICAgICAgICBsZXQgdnNwID0gY2MudjIoTWF0aC5jZWlsKGNjLnZpZXcuZ2V0Q2FudmFzU2l6ZSgpLndpZHRoIC8gZHByKSwgTWF0aC5jZWlsKGNjLnZpZXcuZ2V0Q2FudmFzU2l6ZSgpLmhlaWdodCAvIGRwcikpO1xuICAgICAgICAgICAgbGV0IHZzID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpO1xuICAgICAgICAgICAgbGV0IHQgPSB2c3AueCAvIGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aDtcbiAgICAgICAgICAgIC8vIOi9rOaNouS4uua4uOaIj+mHjOeahOWdkOagh1xuICAgICAgICAgICAgcmVzdWx0ID0gY2MucmVjdChNYXRoLmNlaWwoKHJlY3QubGVmdCAvIHQpIC0gdnMud2lkdGggKiAwLjUpLCBNYXRoLmNlaWwodnMuaGVpZ2h0ICogMC41IC0gKHJlY3QuYm90dG9tIC8gdCkpLCBNYXRoLmNlaWwocmVjdC53aWR0aCAvIHQpLCBNYXRoLmNlaWwocmVjdC5oZWlnaHQgLyB0KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTeXN0ZW1JbmZvU3luYygpOiB3eC5zeXN0ZW1JbmZvIHtcbiAgICAgICAgaWYgKCF0aGlzLnN5c3RlbUluZm8pIHtcbiAgICAgICAgICAgIHRoaXMuc3lzdGVtSW5mbyA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtSW5mbztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TGF1bmNoT3B0aW9uc1N5bmMoKSB7XG4gICAgICAgIHRoaXMubGF1bmNoT3B0aW9ucyA9IHd4LmdldExhdW5jaE9wdGlvbnNTeW5jKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2hvdygpIHtcbiAgICAgICAgd3gub25TaG93KHRoaXMuX29uU2hvdyk7XG4gICAgICAgIHRoaXMuX29uU2hvdyh3eC5nZXRMYXVuY2hPcHRpb25zU3luYygpKVxuICAgICAgICB3eC5vblNoYXJlQXBwTWVzc2FnZSgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBbJ+aipuW5u+a1t+Wym+eahOaXheihjCzkuIDlrpropoHlkozmnIDniLHnmoTkurrljrsnLCAn5b+r5p2l5ZKM5bCP6YeO5LiA6LW35oyW5rW35bqV55qE5a6d55+z5ZCnJ11bVXRpbC5Ub29sLnJhbmdlSW50KDAsIDEpXSxcbiAgICAgICAgICAgICAgICBpbWFnZVVybDogW2Ake1BhdGhzLlNoYXJlSW1nUGF0aH1sZXZlbF9zaGFyZV8yNS5wbmdgLCBgJHtQYXRocy5TaGFyZUltZ1BhdGh9bGV2ZWxfc2hhcmVfNDUucG5nYF1bVXRpbC5Ub29sLnJhbmdlSW50KDAsIDEpXSwvLyDlm77niYcgVVJMXG4gICAgICAgICAgICAgICAgcXVlcnk6IGB0aW1lU3RhbXA9JHtEYXRlLnBhcnNlKG5ldyBEYXRlKCkudG9TdHJpbmcoKSl9JnVpZD0ke00ucnVudGltZS5Vc2VySWR9YFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBvZmZTaG93KCkge1xuICAgICAgICB3eC5vZmZTaG93KHRoaXMuX29uU2hvdyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uSGlkZSgpIHtcbiAgICAgICAgd3gub25IaWRlKHRoaXMuX29uSGlkZSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9mZkhpZGUoKSB7XG4gICAgICAgIHd4Lm9mZkhpZGUodGhpcy5fb25IaWRlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25OZXR3b3JrU3RhdHVzQ2hhbmdlKCkge1xuICAgICAgICB3eC5vbk5ldHdvcmtTdGF0dXNDaGFuZ2UodGhpcy5fbmV0V29ya1N0YXR1c0NoYW5nZWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRVc2VySW5mbygpOiBQcm9taXNlPElVc2VySW5mbz4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnVzZXJJbmZvKSB7XG4gICAgICAgICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xuICAgICAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMgJiYgKHRoaXMudXNlckluZm8gPSByZXMudXNlckluZm8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMudXNlckluZm8pO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmYWlsOiBhc3luYyAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL+ayoeacieWPluW+l+aOiOadgyzojrflj5bmjojmnYPlkI7lho3mi7/kv6Hmga8hXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2cuZSgn5rKh5pyJ5Y+W5b6X5o6I5p2DLOiOt+WPlueUqOaIt+S/oeaBr+Wksei0pSEnLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMudXNlckluZm8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKirov5Tlm57lvq7kv6Hln7rnoYDlupPniYjmnKzlj7cgKi9cbiAgICBwdWJsaWMgZ2V0UGxhdGZyb21WZXJzaW9uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbUluZm8uU0RLVmVyc2lvbjtcbiAgICB9XG5cbiAgICAvKirojrflj5bmlofku7bnrqHnkIbmk43kvZzlr7nosaEgKi9cbiAgICBwdWJsaWMgZ2V0RmlsZVN5c3RlbU1ncigpOiBhbnkge1xuICAgICAgICByZXR1cm4gd3guZ2V0RmlsZVN5c3RlbU1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hhcmUodGV4dDogc3RyaW5nLCBpbWdVcmw6IHN0cmluZywgbGV2ZWxGYWlsQWRkU3RlcDogbnVtYmVyID0gMCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBjYy5sb2coXCLlpb3lj4vliqnlipvliIbkuqtsZXZlbEZhaWxBZGRTdGVwICBcIiArIGxldmVsRmFpbEFkZFN0ZXApO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3NoYXJlUmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgICAgICB3eC5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiB0ZXh0LFxuICAgICAgICAgICAgICAgIGltYWdlVXJsOiBpbWdVcmwsXG4gICAgICAgICAgICAgICAgcXVlcnk6IGB0aW1lU3RhbXA9JHtEYXRlLnBhcnNlKG5ldyBEYXRlKCkudG9TdHJpbmcoKSl9JnVpZD0ke00ucnVudGltZS5Vc2VySWR9JmxldmVsQWRkU3RlcD0ke2xldmVsRmFpbEFkZFN0ZXB9YCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9leGVjU2hhcmVSZXdhcmQocmVzOiB3eC5sYXVuY2hPcHRpb24gfCBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NoYXJlUmVzb2x2ZSkge1xuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMucXVlcnkpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzLnF1ZXJ5LnRpbWVTdGFtcCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBnYXAgPSBEYXRlLm5vdygpIC0gTnVtYmVyKHJlcy5xdWVyeS50aW1lU3RhbXApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2FwID49IDMwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NoYXJlUmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NoYXJlUmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaGFyZVJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChSdW50aW1lTWdyLmlucy5Jc0xvZ2luKSB7XG4gICAgICAgICAgICBOZXRNZ3IuaW5zLmFkZEZyaWVuZChyZXMucXVlcnkudWlkKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy/lpoLmnpznjrDlnKjov5jmsqHmnInnmbvlvZUuLi7mgI7kuYjlip4gPz8/Pz9cbiAgICAgICAgICAgIFJ1bnRpbWVNZ3IuaW5zLnB1c2hPblNob3dUYXNrKHJlcy5xdWVyeS51aWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGRvd25Mb2FkRmlsZShkYXRhOiB7IHVybDogc3RyaW5nLCBmaWxlUGF0aDogc3RyaW5nIH0pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICAgICAgICAgICAgdXJsOiBkYXRhLnVybCxcbiAgICAgICAgICAgICAgICBmaWxlUGF0aDogZGF0YS5maWxlUGF0aCxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Rvd25Mb2FkRmlsZSA6ICcsIHJlcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3d4LmVudjonLCB3eC5lbnYuVVNFUl9EQVRBX1BBVEgpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIExvZy5lKCdkb3duTG9hZEZpbGUgRXJyIDogJywgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGxvYWRSZW1vdFBpY3R1cmUodXJsOiBzdHJpbmcsIHR5cGU6IHN0cmluZyA9ICdqcGcnKTogUHJvbWlzZTxjYy5TcHJpdGVGcmFtZT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Y2MuU3ByaXRlRnJhbWU+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICghdXJsKSByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKHsgdXJsLCB0eXBlIH0sIChlcnIsIHRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUobmV3IGNjLlNwcml0ZUZyYW1lKHRleCkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9O1xuXG4gICAgLyoq5qOA5rWL5ri45oiP5piv5ZCm5pyJ5pu05pawICovXG4gICAgcHVibGljIGNoZWNrVXBkYXRlKCkge1xuICAgICAgICBjb25zdCB1cGRhdGVNYW5hZ2VyID0gd3guZ2V0VXBkYXRlTWFuYWdlcigpO1xuICAgICAgICBpZiAodXBkYXRlTWFuYWdlcikge1xuICAgICAgICAgICAgdXBkYXRlTWFuYWdlci5vbkNoZWNrRm9yVXBkYXRlKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAvLyDor7fmsYLlrozmlrDniYjmnKzkv6Hmga/nmoTlm57osINcbiAgICAgICAgICAgICAgICBMb2cuaSgnb25DaGVja0ZvclVwZGF0ZTogJywgcmVzLmhhc1VwZGF0ZSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB1cGRhdGVNYW5hZ2VyLm9uVXBkYXRlUmVhZHkoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIOivt+axguWujOaWsOeJiOacrOS/oeaBr+eahOWbnuiwgyBcbiAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+abtOaWsOaPkOekuicsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICflj5HnjrDmlrDniYjmnKws6K+36YeN5paw5omT5byA5ri45oiPLicsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDmlrDnmoTniYjmnKzlt7Lnu4/kuIvovb3lpb3vvIzosIPnlKggYXBwbHlVcGRhdGUg5bqU55So5paw54mI5pys5bm26YeN5ZCvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTWFuYWdlci5hcHBseVVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB1cGRhdGVNYW5hZ2VyLm9uVXBkYXRlRmFpbGVkKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyDmlrDnmoTniYjmnKzkuIvovb3lpLHotKVcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1bnppcChwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyB2aWJyYXRlU2hvcnQoKTogdm9pZCB7XG4gICAgICAgIHd4LnZpYnJhdGVTaG9ydCh7fSk7XG4gICAgfVxuXG4gICAgcHVibGljIHZpYnJhdGVMb25nKCk6IHZvaWQge1xuICAgICAgICB3eC52aWJyYXRlTG9uZyh7fSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3dCYW5uZXIoYWRJZD86IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuX2Jhbm5lckFEKSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVCYW5uZXIoYWRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYmFubmVyQUQuc2hvdygpLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NhdGNoIHNob3cgYmFubmVyIGVycm9yIDogJywgZXJyKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZUJhbm5lcigpIHtcbiAgICAgICAgdGhpcy5fYmFubmVyQUQgJiYgdGhpcy5fYmFubmVyQUQuaGlkZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93VmlkZW9BZChhZElkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl92aWRlb1Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICAgICAgbGV0IF92aWRlb0FkID0gdGhpcy5fdmlkZW9NYXAuZ2V0KGFkSWQpO1xuICAgICAgICAgICAgaWYgKCFfdmlkZW9BZCkge1xuICAgICAgICAgICAgICAgIF92aWRlb0FkID0gdGhpcy5fY3JlYXRlVmlkZW8oYWRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwbGF5ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIF92aWRlb0FkLnNob3coKS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignY2F0Y2ggc2hvdyB2aWRlbyBlcnJvciA6ICcsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIF92aWRlb0FkLmxvYWQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBsYXkoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jcmVhdGVWaWRlbyhhZElkOiBzdHJpbmcpOiB3eC5SZXdhcmRlZFZpZGVvQWQge1xuICAgICAgICBjb25zdCBfdmlkZW9BZCA9IHd4LmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7IGFkVW5pdElkOiBhZElkIH0pO1xuICAgICAgICBfdmlkZW9BZC5vbkNsb3NlKHRoaXMuX29uVmlkZW9DbG9zZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgX3ZpZGVvQWQub25FcnJvcih0aGlzLl9vblZpZGVvRXJyb3IuYmluZCh0aGlzKSk7XG4gICAgICAgIF92aWRlb0FkLmxvYWQoKTtcbiAgICAgICAgdGhpcy5fdmlkZW9NYXAuc2V0KGFkSWQsIF92aWRlb0FkKTtcbiAgICAgICAgcmV0dXJuIF92aWRlb0FkXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25WaWRlb0Vycm9yKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdzaG93IHZpZGVvIGVycm9yIDogJywgZXJyKTtcbiAgICAgICAgaWYgKHRoaXMuX3ZpZGVvUmVzb2x2ZSkge1xuICAgICAgICAgICAgLy8gdGhpcy5fdmlkZW9SZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX29uVmlkZW9DbG9zZShyZXM6IHsgaXNFbmRlZDogYm9vbGVhbiB9KSB7XG4gICAgICAgIGlmICh0aGlzLl92aWRlb1Jlc29sdmUpIHtcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmlzRW5kZWQgfHwgcmVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyDmraPluLjmkq3mlL7nu5PmnZ/vvIzlj6/ku6XkuIvlj5HmuLjmiI/lpZblirFcbiAgICAgICAgICAgICAgICB0aGlzLl92aWRlb1Jlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOaSreaUvuS4remAlOmAgOWHuu+8jOS4jeS4i+WPkea4uOaIj+WlluWKsVxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvUmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0ludGVyc3RpdGlhbEFkKGFkSWQ6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuX2ludGVyc3RpdGlhbEFEKSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVJbnRlcnN0aXRpYWxBZChhZElkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxBRC5zaG93KCkudGhlbigoKSA9PiB7XG5cbiAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignY2F0Y2ggc2hvdyBJbnRlcnN0aXRpYWwgZXJyb3IgOiAnLCBlcnIpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZUludGVyc3RpdGlhbEFkKGFkSWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pbnRlcnN0aXRpYWxBRCA9IHd4LmNyZWF0ZUludGVyc3RpdGlhbEFkKHsgYWRVbml0SWQ6IGFkSWQgfSk7XG4gICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbEFELm9uTG9hZCh0aGlzLl9vbkludGVyc3RpdGlhbExvYWQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuX2ludGVyc3RpdGlhbEFELm9uQ2xvc2UodGhpcy5fb25JbnRlcnN0aXRpYWxDbG9zZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5faW50ZXJzdGl0aWFsQUQub25FcnJvcih0aGlzLl9vbkludGVyc3RpdGlhbEVycm9yLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX29uSW50ZXJzdGl0aWFsQ2xvc2UoKSB7XG4gICAgICAgIHRoaXMuX2lzSW50cnN0aXRpYWxSZWFkeSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX29uSW50ZXJzdGl0aWFsRXJyb3IoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3Nob3cgSW50ZXJzdGl0aWFsIGVycm9yIDogJywgZXJyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vbkludGVyc3RpdGlhbExvYWQoKSB7XG4gICAgICAgIHRoaXMuX2lzSW50cnN0aXRpYWxSZWFkeSA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoq5Yib5bu65LiA5LiqYmFubmVy5bm/5ZGKISAqL1xuICAgIHByaXZhdGUgX2NyZWF0ZUJhbm5lcihiYW5uZXJJZDogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5fb25CYW5uZXJFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5fb25CYW5uZXJFcnJvciA9IHRoaXMuX2Jhbm5lck9uRXJyb3IuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX29uQmFubmVyUmVzaXplID0gdGhpcy5fYmFubmVyT25SZXNpemUuYmluZCh0aGlzKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9iYW5uZXJBRCkge1xuICAgICAgICAgICAgdGhpcy5fYmFubmVyQUQub2ZmRXJyb3IodGhpcy5fYmFubmVyT25FcnJvcik7XG4gICAgICAgICAgICB0aGlzLl9iYW5uZXJBRC5vZmZSZXNpemUodGhpcy5fYmFubmVyT25SZXNpemUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Jhbm5lckFEID0gd3guY3JlYXRlQmFubmVyQWQoe1xuICAgICAgICAgICAgYWRVbml0SWQ6IGJhbm5lcklkLFxuICAgICAgICAgICAgYWRJbnRlcnZhbHM6IDMwLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBsZWZ0OiAxMCxcbiAgICAgICAgICAgICAgICB0b3A6IDc2LFxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMjBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2Jhbm5lckFELm9uRXJyb3IodGhpcy5fb25CYW5uZXJFcnJvcilcbiAgICAgICAgdGhpcy5fYmFubmVyQUQub25SZXNpemUodGhpcy5fb25CYW5uZXJSZXNpemUpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYmFubmVyT25FcnJvcihlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignc2hvdyBiYW5uZXIgZXJyb3IgOiAnLCBlcnIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Jhbm5lck9uUmVzaXplKCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdiYW5uZXIgcmVzaXplIDogJyk7XG4gICAgfVxuXG4gICAgLyoq572R57uc5Y+R55Sf5Y+Y5YyWICovXG4gICAgcHJpdmF0ZSBfbmV0V29ya1N0YXR1c0NoYW5nZWQocmVzOiB7IGlzQ29ubmVjdGVkOiBib29sZWFuLCBuZXR3b3JrVHlwZTogc3RyaW5nIH0pIHtcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoUGxhdGZvcm1FdmVuVHlwZS5Pbk5ldFdvcmtDaGFuZ2VkLCByZXMpO1xuICAgIH1cblxuICAgIC8qKuW+ruS/oei/m+WFpeeVjOmdouebkeWQrCAqL1xuICAgIHByaXZhdGUgX3Nob3dDYWxsQmFjayhyZXM/OiB3eC5sYXVuY2hPcHRpb24pIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdvbiBzaG93IScsIHJlcy5xdWVyeSk7XG4gICAgICAgIHRoaXMubGF1bmNoT3B0aW9ucyA9IHJlcztcblxuICAgICAgICB0aGlzLl9leGVjU2hhcmVSZXdhcmQocmVzKTtcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoUGxhdGZvcm1FdmVuVHlwZS5PblNob3csIHJlcyk7XG5cbiAgICAgICAgLypcbiAgICAgICAgLy/kuIrmiqXmnI3liqHlmajvvIzlpb3lj4vliIbkuqvov5vlhaXmuLjmiI8gXG4gICAgICAgIGNjLmxvZyhcIuS4iuaKpeacjeWKoeWZqO+8jOWlveWPi+WIhuS6q+i/m+WFpea4uOaIjzogXCIgKyBNLnJ1bnRpbWUuVXNlcklkKTtcbiAgICAgICAgaWYgKHJlcy5xdWVyeSAmJiByZXMucXVlcnlbJ3VpZCddICYmIHJlcy5xdWVyeVsnbGV2ZWxBZGRTdGVwJ10pIHtcbiAgICAgICAgICAgIE0ubmV0LmNsaWNrU2hhcmVFbnRlckdhbWUocmVzLnF1ZXJ5Wyd1aWQnXSk7XG4gICAgICAgIH1cbiAgICAgICAgKi9cbiAgICB9XG5cblxuICAgIC8qKuW+ruS/oemakOiXj+WQjuWQjuWPsOeVjOmdouebkeWQrCAqL1xuICAgIHByaXZhdGUgX2hpZGVDYWxsQmFjaygpIHtcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoUGxhdGZvcm1FdmVuVHlwZS5PbkhpZGUpO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIOW5s+WPsOiHquWumuS5ieaWueazlSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIC8qKlxuICAgICAqIOWIm+W7uuS4gOS4qumAj+aYjueahOaOiOadg+aMiemSruWcqE5vZGXkuIohXG4gICAgICogQHBhcmFtIGJveCDliJvlu7rnm5LlrZDnmoTlpKflsI/kuI7kvY3nva5cbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlQXV0aEJ1dHRvbihib3g6IHsgeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyIH0pOiBQcm9taXNlPElVc2VySW5mbz4ge1xuICAgICAgICBpZiAoIWJveCkgcmV0dXJuIG51bGw7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYnRuU2l6ZSA9IGNjLnNpemUoYm94LncgKyAxMCwgYm94LmggKyAxMCk7XG4gICAgICAgICAgICBjb25zdCBmcmFtZVNpemUgPSBjYy52aWV3LmdldEZyYW1lU2l6ZSgpO1xuICAgICAgICAgICAgY29uc3Qgd2luU2l6ZSA9IGNjLndpblNpemU7XG5cbiAgICAgICAgICAgIC8v6YCC6YWN5LiN5ZCM5py65Z6L5p2l5Yib5bu65b6u5L+h5o6I5p2D5oyJ6ZKuXG4gICAgICAgICAgICBjb25zdCBsZWZ0ID0gKHdpblNpemUud2lkdGggLyAyICsgYm94LnggLSBidG5TaXplLndpZHRoIC8gMikgLyB3aW5TaXplLndpZHRoICogZnJhbWVTaXplLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgdG9wID0gKHdpblNpemUuaGVpZ2h0IC8gMiAtIGJveC55IC0gYnRuU2l6ZS5oZWlnaHQgLyAyKSAvIHdpblNpemUuaGVpZ2h0ICogZnJhbWVTaXplLmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gYnRuU2l6ZS53aWR0aCAvIHdpblNpemUud2lkdGggKiBmcmFtZVNpemUud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBidG5TaXplLmhlaWdodCAvIHdpblNpemUuaGVpZ2h0ICogZnJhbWVTaXplLmhlaWdodDtcblxuICAgICAgICAgICAgY29uc3Qgd3hCdXR0b24gPSB3eC5jcmVhdGVVc2VySW5mb0J1dHRvbih7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgIHRleHQ6ICcnLFxuICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogbGVmdCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0b3AsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJycsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogNCxcbiAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTYsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgd3hCdXR0b24ub25UYXAoKHVpbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVpbmZvLnVzZXJJbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlckluZm8gPSB1aW5mby51c2VySW5mbztcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgd3hCdXR0b24uaGlkZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWQkeW8gOaUvuWfn+WPkemAgeS/oeaBryFcbiAgICAgKiBAcGFyYW0gbXNnIOa2iOaBr1xuICAgICAqL1xuICAgIHB1YmxpYyBzZW5kTXNnVG9PcGVuRGF0YShtc2c6IGFueSkge1xuICAgICAgICB3eC5nZXRPcGVuRGF0YUNvbnRleHQoKS5wb3N0TWVzc2FnZShtc2cpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5o+Q5Lqk5L+h5oGv5Yiw5byA5pS+5Z+fIVxuICAgICAqIEBwYXJhbSBrZXkgXG4gICAgICogQHBhcmFtIHNjb3JlIFxuICAgICAqL1xuICAgIHB1YmxpYyB1cGxvYWREYXRhVG9XeChrZXk6IHN0cmluZywgc2NvcmU6IG51bWJlcikge1xuICAgICAgICB3eC5zZXRVc2VyQ2xvdWRTdG9yYWdlKHtcbiAgICAgICAgICAgIEtWRGF0YUxpc3Q6IFtcbiAgICAgICAgICAgICAgICB7IGtleToga2V5LCB2YWx1ZTogYCR7c2NvcmV9YCB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc3VjY2VzczogKG1zZykgPT4ge1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+Wksei0pSEnLCBlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIoOmZpOW+ruS/oeW8gOaUvuWfn+S4iuaJgOWQq+eahGtleXPnmoTmlbDmja4hXG4gICAgICogQHBhcmFtIGtleXMgXG4gICAgICovXG4gICAgcHVibGljIGRlbGV0ZVd4RGF0YUZvcktleXMoa2V5czogQXJyYXk8c3RyaW5nPikge1xuICAgICAgICBpZiAodHlwZW9mIChrZXlzKSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAga2V5cyA9IFtrZXlzXVxuICAgICAgICB9XG4gICAgICAgIHd4LnJlbW92ZVVzZXJDbG91ZFN0b3JhZ2Uoe1xuICAgICAgICAgICAga2V5TGlzdDoga2V5c1xuICAgICAgICB9KVxuICAgIH1cblxuXG59Il19