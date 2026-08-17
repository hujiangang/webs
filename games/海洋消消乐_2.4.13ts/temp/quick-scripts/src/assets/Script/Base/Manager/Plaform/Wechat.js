"use strict";
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