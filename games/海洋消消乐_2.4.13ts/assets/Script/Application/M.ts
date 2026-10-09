import { Event } from "../Game/Data/Const/Event";
import PlatformMgr from "../Game/Platform/PlatformMgr";
import DeviceMgr from "../Game/Platform/DeviceMgr";
import NodePoolMgr from "../Framework/Pool/NodePoolMgr";
import EventMgr from "../Framework/Events/EventMgr";
import IPlatform from "../Game/Platform/Adapters/IPlatform";
import { GameTableMgr } from "../Game/Config/GameTableMgr";
import CacheMgr from "../Framework/Resources/CacheMgr";
import UIMgr from "../Game/Common/UI/UIMgr";
import RuntimeMgr from "../Game/Data/RuntimeMgr";
import Tips from "../Game/Common/Views/Tips";
import AudioCtrl from "../Game/Common/AudioCtrl";
import NetMgr from "../Game/Services/NetMgr";

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

    private static initialized = false;

    public static init(): void {
        if (this.initialized) return;

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

        this.cache.onWarning = () => this.event.send(Event.System.CacheWarning);
        this.cache.start();
        this.initialized = true;
        this.table.execute().catch(error => console.warn("配置表加载失败:", error));
    }

    public static changeScene() {

    }

    public static destory() {

    }
}

window["M"] = M;