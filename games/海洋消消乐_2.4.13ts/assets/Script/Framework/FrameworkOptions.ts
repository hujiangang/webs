/** Application-owned policy hooks. Framework code never imports game configuration. */
export default class FrameworkOptions {
    public static debugEnabled: () => boolean = () => cc.sys.browserType !== "wechatgame";
    public static networkEnabled: () => boolean = () => true;
}
