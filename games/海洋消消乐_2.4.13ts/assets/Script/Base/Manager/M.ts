import PlatformMgr from "./PlatformMgr";
import DeviceMgr from "./DeviceMgr";
import NodePoolMgr from "./NodePoolMgr";
import EventMgr from "./EventMgr";
import IPlatform from "./Plaform/IPlatform";
import { GameTableMgr } from "./GameTableMgr";
import CacheMgr from "./CacheMgr";
import UIMgr from "./UIMgr";
import RuntimeMgr from "../../Logic/Data/RuntimeMgr";
import Tips from "./View/Tips";
import AudioCtrl from "../../Logic/Common/AudioCtrl";
import NetMgr from "./NetMgr";

/** 管理类合集 */
export default class M {

    /**UI 管理 */
    public static ui: UIMgr = null;
    /**缓存管理 */
    public static cache: CacheMgr = null;
    /**平台管理 */
    public static platform: IPlatform = null;
    /**设备信息管理 */
    public static device: DeviceMgr = null;
    /**对象池管理 */
    public static nodePool: NodePoolMgr = null;
    /**事件管理 */
    public static event: EventMgr = null;
    /**事件管理 */
    public static table: GameTableMgr = null;
    /**用户数据管理 */
    public static runtime: RuntimeMgr = null;
    /**弹框 */
    public static tips: Tips = null;
    /**http连接管理 */
    public static net: NetMgr = null;

    public static audio: AudioCtrl = null;

    public static init(): void {

        this.platform = PlatformMgr.ins;
        this.device = DeviceMgr.ins;
        this.nodePool = NodePoolMgr.ins;
        this.event = EventMgr.ins;
        this.table = GameTableMgr.ins;
        this.tips = Tips.ins;
        this.audio = AudioCtrl.ins;
        this.net = NetMgr.ins;
        this.cache = CacheMgr.ins;
        this.ui = UIMgr.ins;
        this.runtime = RuntimeMgr.ins;

        this.table.execute();
    }

    public static changeScene() {

    }

    public static destory() {

    }
}

window["M"] = M;