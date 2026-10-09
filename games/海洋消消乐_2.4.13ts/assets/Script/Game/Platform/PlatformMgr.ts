import IPlatform from "./Adapters/IPlatform";
import Webapp from "./Adapters/Webapp";
import Wechat from "./Adapters/Wechat";
import { Util } from "../../Framework/Utils/Util";
import { PlatformType } from "../Data/Const/BaseConst";

/**平台管理类 */
export default class PlatformMgr {

    private static _instance: IPlatform;

    public static get ins(): IPlatform {

        if (PlatformMgr._instance) {
            return PlatformMgr._instance;
        }
        switch (this.getCurrentPlatformType()) {
            case PlatformType.Web:
                PlatformMgr._instance = new Webapp();
                break
            case PlatformType.WxGame:
                PlatformMgr._instance = new Wechat()
                break
        }
        return PlatformMgr._instance;
    }

    /**获取当前平台类型 */
    public static getCurrentPlatformType(): PlatformType {
        let type = PlatformType.Web;
        if (Util.Tool.isWechatGame()) {
            type = PlatformType.WxGame;
        }
        return type;
    }

}