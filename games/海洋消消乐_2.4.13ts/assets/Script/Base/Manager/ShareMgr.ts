import M from "./M";
import { PlatformType } from "../BaseConst";
import Paths from "../Utils/Paths";

export default class ShareMgr {

    public static instance: ShareMgr = null;

    private _shareCdnPath = "";

    public static get ins(): ShareMgr {
        if (this.instance == null) {
            this.instance = new ShareMgr();
        }
        return this.instance;
    }

    //关卡的分享点
    public doShareLevel(level: number, next) {
        let config = this.getConfig(level, "level");
        if (config) {
            this.doShare(config.shareText, config.shareImg, next);
        } else {
            console.error("拿不到分享配置level =", level);
            next(false);
        }
    }

    //建筑的分享点
    public doShareBuild(buildId: number, next) {
        let config = this.getConfig(buildId, "buildId");
        if (config) {
            this.doShare(config.shareText, config.shareImg, next);
        } else {
            console.error("拿不到分享配置buildId =", buildId);
            next(false);
        }
    }


    //关卡失败，加步数的分享
    public LevelFailAddStepShare() {
        M.platform.share("快来一起玩游戏", Paths.ShareImgPath + "level_share_45.png", 1)
    }


    private doShare(text, img, next) {
        if (M.platform.type == PlatformType.Web) {
            next && next(true);
        } else {
            M.platform.share(text, Paths.ShareImgPath + img + ".png").then((result: boolean) => {
                next && next(result);
            });
        }
    }

    public getConfig(value, key) {
        var config = M.table.ShareCfg.getData();
        for (var i = 0; i < config.length; ++i) {
            if (config[i][key] == value) {
                return config[i];
            }
        }
        return null;
    }
}