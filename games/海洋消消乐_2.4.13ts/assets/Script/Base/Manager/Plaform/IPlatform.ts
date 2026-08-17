import { IUserInfo, PlatformType } from "../../BaseConst";

export class Options {
    public appId: string;
    public token?: string;
    public adIds?: { Banner: string, Interstitial: string, Video: string };
}

export default interface IPlatform {

    type: PlatformType;

    init(o: Options);

    /** 退出小游戏 */
    exit(): void

    /** 授权接口 */
    authorize(): Promise<any>

    /**平台的登录接口 */
    login(): Promise<{ code: string }>

    /**获取当前的平台系统信息 */
    getSystemInfoSync(): any

    /**获取右上角胶囊位置 */
    getMenuButtonBoundingClientRect(): cc.Rect;

    /**获取刘海位置 */
    getTopBangPosition(): number;

    /** 注册进入界面监听 */
    onShow(): void

    /** 注册监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件 */
    onHide(): void

    /**注册网络变化事件 */
    onNetworkStatusChange(): void

    /**获取平台上的用户信息 */
    getUserInfo(): Promise<IUserInfo>

    /**创建授权按钮 */
    createAuthButton(box: { x: number, y: number, w: number, h: number }): Promise<IUserInfo>;

    /**获取当前平台版本 */
    getPlatfromVersion(): string;

    /**获取文件操作句柄 */
    getFileSystemMgr(): any;

    /**下载文件 */
    downLoadFile(data: { url: string, filePath: string }): Promise<any>;

    /**获取网络/本地图片 */
    loadRemotPicture(url: string, type?: string): Promise<cc.SpriteFrame>;

    /** 短振动 */
    vibrateShort(): void;

    /** 长振动 */
    vibrateLong(): void;

    /**分享 */
    share(text: string, imgUrl: string, levelFailAddStep? : number): Promise<boolean>

    /**Banner */
    showBanner(adId: string);

    hideBanner();

    showInterstitialAd(adId: string);

    showVideoAd(adId: string);

    /** 检测游戏是否有新版本需要更新 */
    checkUpdate(): void;

    /**解压文件 */
    unzip(path: string): boolean;
}
