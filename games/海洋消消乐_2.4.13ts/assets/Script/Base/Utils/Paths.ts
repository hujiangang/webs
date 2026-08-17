import Apps from "../Apps";
import { PropType } from "../../Logic/Data/Const/Constant";


export default class Paths {

    public static readonly ReportHost: string = 'https://dlog.uu.cc'

    public static readonly MainHost: string = Apps.isDebug ? 'http://10.1.0.5:9501/api/v1/' : 'https://xyhy.ifusky.com/api/v1/';

    public static readonly MainCDNHost: string = 'https://mini-er.dl.gxpan.cn/soe/'; //'https://mini-er-12510060.cos.ap-guangzhou.myqcloud.com/soe/'

    public static readonly ShareImgPath: string = `${Paths.MainCDNHost}share/`;

    public static readonly CDNTablePath: string = `${Paths.MainCDNHost}table/`;

    public static readonly NativeTablePath: string = 'csv/';

    public static readonly SoundPath: string = 'sound/';

    public static readonly LevelCfgPath: string = 'config/level/new/';

    public static readonly RoomPrefabPath: string = 'prefab/hotel/room/'

    public static readonly RoomPicPath: string = 'texture/hotel/';

    public static readonly LevelMapPath: string = 'prefab/LevelMap/';

    public static readonly LevelRemotPath: string = `${Paths.MainCDNHost}level/`;

    public static readonly TurorialCfgPath: string = 'config/level/turorial/';

    public static readonly TurorialRemotPath: string = `${Paths.MainCDNHost}turorial/`;

    public static readonly Match3Bg: string = 'texture/match3/bg/';

    public static readonly SoMap: string = 'texture/map/';

    public static readonly Match3BgEff: string = 'prefab/eff/';

    public static readonly DailyTaskConfig: string = 'https://mini-center.dl.gan.cn/configcenter/soe-wx/tasklist.json'

    //道具图片路径
    public static getItemPath(itemId: PropType): string {
        return `texture/ui/item/item_${itemId}.png`;
    }
}