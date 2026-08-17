
import { IUserInfo, PlatformEvenType, PlatformType } from '../../BaseConst';
import IPlatform, { Options } from "./IPlatform";
import EventMgr from '../EventMgr';
import { Log } from '../../Utils/Log';
import { Util } from '../../Utils/Util';
import Paths from '../../Utils/Paths';
import M from '../M';
import RuntimeMgr from '../../../Logic/Data/RuntimeMgr';
import NetMgr from '../NetMgr';

export default class Wechat implements IPlatform {

    public type: PlatformType = PlatformType.WxGame;

    /**当前平台的系统信息 */
    private systemInfo: wx.systemInfo = null;
    /**当前的用户信息 */
    private userInfo: IUserInfo = null
    /**初始化的基础信息 */
    private options: Options = null;
    /**分享回调 */
    private _shareResolve: Function = null;

    private _bannerAD: wx.BannerAd = null;

    private _interstitialAD: any = null;

    // private _videoAd: wx.RewardedVideoAd = null;

    /**注册onShow onHide */
    private _onShow = null;
    private _onHide = null;
    /**注册Banner的 onError onResize */
    private _onBannerError = null;
    private _onBannerResize = null;
    /**注册插屏 */
    private _isIntrstitialReady: boolean = false;
    /**注册视频 */
    private _videoResolve: Function = null;
    private _videoMap: Map<string, wx.RewardedVideoAd> = null;

    /**开放域中的字段 */
    public wxOpenDataKey = {
        Score: "Score",
    }

    public launchOptions: wx.launchOption;

    constructor() {
        wx.showShareMenu({ withShareTicket: true });
        wx.setKeepScreenOn({ keepScreenOn: true });
        wx.onMemoryWarning((res: { level: number }) => {
            EventMgr.ins.send(PlatformEvenType.OnMemoryWarning);
        })
        this._videoMap = new Map();
        this._onShow = this._showCallBack.bind(this);
        this._onHide = this._hideCallBack.bind(this);

        this.onShow();
        this.onHide();
    }

    public init(o: Options) {
        this.options = o;
        if (o && o.adIds && o.adIds.Interstitial) {
            this._createInterstitialAd(o.adIds.Interstitial);
        }
        if (o && o.adIds && o.adIds.Video) {
            this._createInterstitialAd(o.adIds.Interstitial);
        }
    }

    public exit() {
        wx.exitMiniProgram({})
    }

    public async authorize(): Promise<any> {
        return this.getUserInfo();
    }

    public login(): Promise<{ code: string }> {
        return new Promise((resolve, reject) => {
            wx.login({
                success: async (codeObj) => {
                    resolve({ code: codeObj.code });
                },
                fail: (e) => {
                    Log.e('WeChat Login Error : ', e);
                    resolve(null);
                }
            });
        })
    }

    public getTopBangPosition() {
        let top = this.getSystemInfoSync().safeArea.top;
        if (top != 0) {
            top = (top - 20) * 2; //cc.view.getDevicePixelRatio()
        }
        return top;
    }

    public getMenuButtonBoundingClientRect() {
        let result = null;
        if (wx.getMenuButtonBoundingClientRect) {
            let rect = wx.getMenuButtonBoundingClientRect();
            let dpr = cc.view.getDevicePixelRatio();
            let vsp = cc.v2(Math.ceil(cc.view.getCanvasSize().width / dpr), Math.ceil(cc.view.getCanvasSize().height / dpr));
            let vs = cc.view.getVisibleSize();
            let t = vsp.x / cc.view.getVisibleSize().width;
            // 转换为游戏里的坐标
            result = cc.rect(Math.ceil((rect.left / t) - vs.width * 0.5), Math.ceil(vs.height * 0.5 - (rect.bottom / t)), Math.ceil(rect.width / t), Math.ceil(rect.height / t));
        }
        return result
    }

    public getSystemInfoSync(): wx.systemInfo {
        if (!this.systemInfo) {
            this.systemInfo = wx.getSystemInfoSync();
        }
        return this.systemInfo;
    }

    public getLaunchOptionsSync() {
        this.launchOptions = wx.getLaunchOptionsSync();
    }

    public onShow() {
        wx.onShow(this._onShow);
        this._onShow(wx.getLaunchOptionsSync())
        wx.onShareAppMessage(() => {
            return {
                title: ['梦幻海岛的旅行,一定要和最爱的人去', '快来和小野一起挖海底的宝石吧'][Util.Tool.rangeInt(0, 1)],
                imageUrl: [`${Paths.ShareImgPath}level_share_25.png`, `${Paths.ShareImgPath}level_share_45.png`][Util.Tool.rangeInt(0, 1)],// 图片 URL
                query: `timeStamp=${Date.parse(new Date().toString())}&uid=${M.runtime.UserId}`
            }
        })
    }

    public offShow() {
        wx.offShow(this._onShow);
    }

    public onHide() {
        wx.onHide(this._onHide);
    }

    public offHide() {
        wx.offHide(this._onHide);
    }

    public onNetworkStatusChange() {
        wx.onNetworkStatusChange(this._netWorkStatusChanged);
    }

    public getUserInfo(): Promise<IUserInfo> {
        return new Promise((resolve, reject) => {
            if (!this.userInfo) {
                wx.getUserInfo({
                    withCredentials: false,
                    success: (res) => {
                        res && (this.userInfo = res.userInfo);
                        resolve(res.userInfo);
                    },
                    fail: async (err) => {
                        //没有取得授权,获取授权后再拿信息!
                        Log.e('没有取得授权,获取用户信息失败!', err);
                        resolve(null);
                    }
                });
            } else {
                resolve(this.userInfo);
            }
        });
    }

    /**返回微信基础库版本号 */
    public getPlatfromVersion(): string {
        return this.systemInfo.SDKVersion;
    }

    /**获取文件管理操作对象 */
    public getFileSystemMgr(): any {
        return wx.getFileSystemManager();
    }

    public share(text: string, imgUrl: string, levelFailAddStep: number = 0): Promise<boolean> {
        cc.log("好友助力分享levelFailAddStep  " + levelFailAddStep);
        return new Promise((resolve) => {
            this._shareResolve = resolve;
            wx.shareAppMessage({
                title: text,
                imageUrl: imgUrl,
                query: `timeStamp=${Date.parse(new Date().toString())}&uid=${M.runtime.UserId}&levelAddStep=${levelFailAddStep}`,
            });
        });
    }

    private _execShareReward(res: wx.launchOption | any) {
        if (this._shareResolve) {
            if (res && res.query) {
                if (res.query.timeStamp) {
                    const gap = Date.now() - Number(res.query.timeStamp);
                    if (gap >= 3000) {
                        this._shareResolve(true);
                    } else {
                        this._shareResolve(false);
                    }
                } else {
                    this._shareResolve(true);
                }
            }
        }
        if (RuntimeMgr.ins.IsLogin) {
            NetMgr.ins.addFriend(res.query.uid)
        } else {
            //如果现在还没有登录...怎么办 ?????
            RuntimeMgr.ins.pushOnShowTask(res.query.uid);
        }
    }

    public downLoadFile(data: { url: string, filePath: string }): Promise<any> {
        return new Promise((resolve) => {
            wx.downloadFile({
                url: data.url,
                filePath: data.filePath,
                success: (res) => {
                    console.error('downLoadFile : ', res);
                    console.error('wx.env:', wx.env.USER_DATA_PATH);
                    resolve(res);
                },
                fail: (err) => {
                    Log.e('downLoadFile Err : ', err);
                    resolve(null);
                }
            });
        });
    }

    public loadRemotPicture(url: string, type: string = 'jpg'): Promise<cc.SpriteFrame> {
        return new Promise<cc.SpriteFrame>((resolve, reject) => {
            if (!url) return resolve(null);
            cc.loader.load({ url, type }, (err, tex) => {
                if (err) {
                    Log.e(err);
                    return resolve(null);
                }
                resolve(new cc.SpriteFrame(tex));
            })
        })
    };

    /**检测游戏是否有更新 */
    public checkUpdate() {
        const updateManager = wx.getUpdateManager();
        if (updateManager) {
            updateManager.onCheckForUpdate((res) => {
                // 请求完新版本信息的回调
                Log.i('onCheckForUpdate: ', res.hasUpdate)
            })
            updateManager.onUpdateReady(() => {
                // 请求完新版本信息的回调 
                wx.showModal({
                    title: '更新提示',
                    content: '发现新版本,请重新打开游戏.',
                    success(res) {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager.applyUpdate();
                        }
                    }
                })
            });

            updateManager.onUpdateFailed(() => {
                // 新的版本下载失败

            })
        }
    }

    public unzip(path: string): boolean {
        return false;
    }

    public vibrateShort(): void {
        wx.vibrateShort({});
    }

    public vibrateLong(): void {
        wx.vibrateLong({});
    }

    public showBanner(adId?: string) {
        if (!this._bannerAD) {
            this._createBanner(adId);
        }
        this._bannerAD.show().then(() => {

        }).catch((err) => {
            console.error('catch show banner error : ', err);
        })
    }

    public hideBanner() {
        this._bannerAD && this._bannerAD.hide();
    }

    public showVideoAd(adId: string): Promise<boolean> {
        return new Promise((resolve) => {
            this._videoResolve = resolve;
            let _videoAd = this._videoMap.get(adId);
            if (!_videoAd) {
                _videoAd = this._createVideo(adId);
            }
            const play = () => {
                _videoAd.show().then(() => {

                }).catch((err) => {
                    console.error('catch show video error : ', err);
                    _videoAd.load().then(() => {
                        play();
                    })
                });
            }
            play();
        })
    }

    private _createVideo(adId: string): wx.RewardedVideoAd {
        const _videoAd = wx.createRewardedVideoAd({ adUnitId: adId });
        _videoAd.onClose(this._onVideoClose.bind(this));
        _videoAd.onError(this._onVideoError.bind(this));
        _videoAd.load();
        this._videoMap.set(adId, _videoAd);
        return _videoAd
    }

    private _onVideoError(err) {
        console.error('show video error : ', err);
        if (this._videoResolve) {
            // this._videoResolve(false);
        }
    }

    private _onVideoClose(res: { isEnded: boolean }) {
        if (this._videoResolve) {
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                this._videoResolve(true);
            } else {
                // 播放中途退出，不下发游戏奖励
                this._videoResolve(false);
            }
        }
    }

    public showInterstitialAd(adId: string) {
        if (!this._interstitialAD) {
            this._createInterstitialAd(adId);
        }
        this._interstitialAD.show().then(() => {

        }).catch((err) => {
            console.error('catch show Interstitial error : ', err);
        })
    }

    private _createInterstitialAd(adId: string) {
        this._interstitialAD = wx.createInterstitialAd({ adUnitId: adId });
        this._interstitialAD.onLoad(this._onInterstitialLoad.bind(this));
        this._interstitialAD.onClose(this._onInterstitialClose.bind(this));
        this._interstitialAD.onError(this._onInterstitialError.bind(this));
    }

    private _onInterstitialClose() {
        this._isIntrstitialReady = false;
    }

    private _onInterstitialError(err) {
        console.error('show Interstitial error : ', err);
    }

    private _onInterstitialLoad() {
        this._isIntrstitialReady = true;
    }

    /**创建一个banner广告! */
    private _createBanner(bannerId: string) {
        if (!this._onBannerError) {
            this._onBannerError = this._bannerOnError.bind(this);
            this._onBannerResize = this._bannerOnResize.bind(this);
        } else if (this._bannerAD) {
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
        this._bannerAD.onError(this._onBannerError)
        this._bannerAD.onResize(this._onBannerResize)
    }

    private _bannerOnError(err) {
        console.error('show banner error : ', err);
    }

    private _bannerOnResize() {
        console.error('banner resize : ');
    }

    /**网络发生变化 */
    private _netWorkStatusChanged(res: { isConnected: boolean, networkType: string }) {
        EventMgr.ins.send(PlatformEvenType.OnNetWorkChanged, res);
    }

    /**微信进入界面监听 */
    private _showCallBack(res?: wx.launchOption) {
        console.warn('on show!', res.query);
        this.launchOptions = res;

        this._execShareReward(res);
        EventMgr.ins.send(PlatformEvenType.OnShow, res);

        /*
        //上报服务器，好友分享进入游戏 
        cc.log("上报服务器，好友分享进入游戏: " + M.runtime.UserId);
        if (res.query && res.query['uid'] && res.query['levelAddStep']) {
            M.net.clickShareEnterGame(res.query['uid']);
        }
        */
    }


    /**微信隐藏后后台界面监听 */
    private _hideCallBack() {
        EventMgr.ins.send(PlatformEvenType.OnHide);
    }

    /********************************** 平台自定义方法 ***********************************/

    /**
     * 创建一个透明的授权按钮在Node上!
     * @param box 创建盒子的大小与位置
     */
    public createAuthButton(box: { x: number, y: number, w: number, h: number }): Promise<IUserInfo> {
        if (!box) return null;
        return new Promise((resolve) => {
            const btnSize = cc.size(box.w + 10, box.h + 10);
            const frameSize = cc.view.getFrameSize();
            const winSize = cc.winSize;

            //适配不同机型来创建微信授权按钮
            const left = (winSize.width / 2 + box.x - btnSize.width / 2) / winSize.width * frameSize.width;
            const top = (winSize.height / 2 - box.y - btnSize.height / 2) / winSize.height * frameSize.height;
            const width = btnSize.width / winSize.width * frameSize.width;
            const height = btnSize.height / winSize.height * frameSize.height;

            const wxButton = wx.createUserInfoButton({
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

            wxButton.onTap((uinfo) => {
                if (uinfo.userInfo) {
                    this.userInfo = uinfo.userInfo;
                    resolve(this.userInfo);
                    wxButton.hide();
                } else {
                    resolve(null);
                }
            });
        });
    }

    /**
     * 向开放域发送信息!
     * @param msg 消息
     */
    public sendMsgToOpenData(msg: any) {
        wx.getOpenDataContext().postMessage(msg)
    }

    /**
     * 提交信息到开放域!
     * @param key 
     * @param score 
     */
    public uploadDataToWx(key: string, score: number) {
        wx.setUserCloudStorage({
            KVDataList: [
                { key: key, value: `${score}` }
            ],
            success: (msg) => {

            },
            fail: (err) => {
                console.error('失败!', err);
            }
        })
    }

    /**
     * 删除微信开放域上所含的keys的数据!
     * @param keys 
     */
    public deleteWxDataForKeys(keys: Array<string>) {
        if (typeof (keys) === "string") {
            keys = [keys]
        }
        wx.removeUserCloudStorage({
            keyList: keys
        })
    }


}