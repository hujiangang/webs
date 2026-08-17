import IPlatform, { Options } from "./IPlatform";
import { IUserInfo, PlatformType } from "../../BaseConst";
import { Log } from "../../Utils/Log";
import Apps from "../../Apps";
import { StorageMgr } from "../StorageMgr";

export default class Webapp implements IPlatform {

    public share(text: string, imgUrl: string): Promise<boolean> {
        return new Promise((rsolve) => {
            rsolve(true);
        })
    }

    public showBanner() {

    }

    public hideBanner() {

    }

    public showInterstitialAd() {

    }

    public showVideoAd() {

    }

    public type: PlatformType = PlatformType.Web;

    private options: Options = null;

    constructor() {

    }

    public init(o: Options) {
        this.options = o;
    }


    public exit() {
    }

    public authorize(): Promise<any> {
        return new Promise((resolve) => {
            resolve(true);
        })
    }

    public login(): Promise<{ code: string }> {
        return new Promise((resolve) => {
            let userId = 'test19';//StorageMgr.Storage.getString("__userId");
            if (!userId) {
                userId = "" + Date.now();
                StorageMgr.Storage.setString("__userId", userId, true);
            }
            resolve({ code: `${this.options ? this.options.appId : 'tt.tang'}_${userId}` });
        })
    }

    public getTopBangPosition(): number {

        return 0;
    }

    public getSystemInfoSync(): any {
        return {};
    }

    public onShow() {

    }

    public offShow() {

    }

    public onHide() {

    }

    public onNetworkStatusChange() {

    }

    public createAuthButton(box): any {
        return new Promise((resolve) => {
            resolve(null);
        });
    }

    public getUserInfo(): Promise<IUserInfo> {
        return new Promise((resolve) => {
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
        })
    }

    public getPlatfromVersion(): string {
        return null;
    }

    public getFileSystemMgr() {
        return null;
    }

    public downLoadFile(data: { url: string, filePath: string }): Promise<any> {
        return new Promise((resolve) => {
            resolve(null);
        });
    }

    public loadRemotPicture(url: string, type: string = 'jpg'): Promise<cc.SpriteFrame> {
        return new Promise<cc.SpriteFrame>((resolve, reject) => {
            if (url.indexOf('http') != -1) {
                cc.loader.load({ url, type }, (err, tex) => {
                    if (err) {
                        Log.e(err);
                        return resolve(null);
                    }
                    resolve(new cc.SpriteFrame(tex));
                })
            } else {
                cc.loader.loadRes(url, (err, tex) => {
                    if (err) {
                        Log.e(err);
                        return resolve(null);
                    }
                    resolve(new cc.SpriteFrame(tex));
                });
            }
        })
    }

    public checkUpdate() {

    }

    public unzip(path: string): boolean {
        return false;
    }

    public vibrateShort(): void {


    }

    public getMenuButtonBoundingClientRect() {
        return null;
    }

    public vibrateLong(): void {

    }
}


