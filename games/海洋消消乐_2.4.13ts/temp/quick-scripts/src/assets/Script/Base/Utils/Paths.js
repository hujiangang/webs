"use strict";
cc._RF.push(module, 'f74b0OgDfxKlJRRaowt0zUw', 'Paths');
// Script/Base/Utils/Paths.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Apps_1 = require("../Apps");
var Paths = /** @class */ (function () {
    function Paths() {
    }
    //道具图片路径
    Paths.getItemPath = function (itemId) {
        return "texture/ui/item/item_" + itemId + ".png";
    };
    Paths.ReportHost = 'https://dlog.uu.cc';
    Paths.MainHost = Apps_1.default.isDebug ? 'http://10.1.0.5:9501/api/v1/' : 'https://xyhy.ifusky.com/api/v1/';
    Paths.MainCDNHost = 'https://mini-er.dl.gxpan.cn/soe/'; //'https://mini-er-12510060.cos.ap-guangzhou.myqcloud.com/soe/'
    Paths.ShareImgPath = Paths.MainCDNHost + "share/";
    Paths.CDNTablePath = Paths.MainCDNHost + "table/";
    Paths.NativeTablePath = 'csv/';
    Paths.SoundPath = 'sound/';
    Paths.LevelCfgPath = 'config/level/new/';
    Paths.RoomPrefabPath = 'prefab/hotel/room/';
    Paths.RoomPicPath = 'texture/hotel/';
    Paths.LevelMapPath = 'prefab/LevelMap/';
    Paths.LevelRemotPath = Paths.MainCDNHost + "level/";
    Paths.TurorialCfgPath = 'config/level/turorial/';
    Paths.TurorialRemotPath = Paths.MainCDNHost + "turorial/";
    Paths.Match3Bg = 'texture/match3/bg/';
    Paths.SoMap = 'texture/map/';
    Paths.Match3BgEff = 'prefab/eff/';
    Paths.DailyTaskConfig = 'https://mini-center.dl.gan.cn/configcenter/soe-wx/tasklist.json';
    return Paths;
}());
exports.default = Paths;

cc._RF.pop();