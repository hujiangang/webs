import { Util } from "./Utils/Util";

export default class Apps {

    public static readonly Version: string = "1.0.2";
    /** 当前国家的语言版本 */
    public static readonly country: string = "cn";
    /** 是否开启加密传输 */
    public static readonly isEncode: boolean = false;
    /** 是否开发模式 */
    public static readonly isDebug: boolean = !Util.Tool.isWechatGame();
    /** 是否打印消息 */
    public static readonly isLog: boolean = true;
    /** 是否打开网络同步开关 */
    public static readonly isOpenNet: boolean = true;
    /** 是否打开GM面板 */
    public static readonly isOpenGM: boolean = true;// !Util.Tool.isWechatGame();

}