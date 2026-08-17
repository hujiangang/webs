
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Utils/Paths.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxVdGlsc1xcUGF0aHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnQ0FBMkI7QUFJM0I7SUFBQTtJQTBDQSxDQUFDO0lBSkcsUUFBUTtJQUNNLGlCQUFXLEdBQXpCLFVBQTBCLE1BQWdCO1FBQ3RDLE9BQU8sMEJBQXdCLE1BQU0sU0FBTSxDQUFDO0lBQ2hELENBQUM7SUF2Q3NCLGdCQUFVLEdBQVcsb0JBQW9CLENBQUE7SUFFekMsY0FBUSxHQUFXLGNBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQyxpQ0FBaUMsQ0FBQztJQUVyRyxpQkFBVyxHQUFXLGtDQUFrQyxDQUFDLENBQUMsK0RBQStEO0lBRXpILGtCQUFZLEdBQWMsS0FBSyxDQUFDLFdBQVcsV0FBUSxDQUFDO0lBRXBELGtCQUFZLEdBQWMsS0FBSyxDQUFDLFdBQVcsV0FBUSxDQUFDO0lBRXBELHFCQUFlLEdBQVcsTUFBTSxDQUFDO0lBRWpDLGVBQVMsR0FBVyxRQUFRLENBQUM7SUFFN0Isa0JBQVksR0FBVyxtQkFBbUIsQ0FBQztJQUUzQyxvQkFBYyxHQUFXLG9CQUFvQixDQUFBO0lBRTdDLGlCQUFXLEdBQVcsZ0JBQWdCLENBQUM7SUFFdkMsa0JBQVksR0FBVyxrQkFBa0IsQ0FBQztJQUUxQyxvQkFBYyxHQUFjLEtBQUssQ0FBQyxXQUFXLFdBQVEsQ0FBQztJQUV0RCxxQkFBZSxHQUFXLHdCQUF3QixDQUFDO0lBRW5ELHVCQUFpQixHQUFjLEtBQUssQ0FBQyxXQUFXLGNBQVcsQ0FBQztJQUU1RCxjQUFRLEdBQVcsb0JBQW9CLENBQUM7SUFFeEMsV0FBSyxHQUFXLGNBQWMsQ0FBQztJQUUvQixpQkFBVyxHQUFXLGFBQWEsQ0FBQztJQUVwQyxxQkFBZSxHQUFXLGlFQUFpRSxDQUFBO0lBTXRILFlBQUM7Q0ExQ0QsQUEwQ0MsSUFBQTtrQkExQ29CLEtBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBwcyBmcm9tIFwiLi4vQXBwc1wiO1xuaW1wb3J0IHsgUHJvcFR5cGUgfSBmcm9tIFwiLi4vLi4vTG9naWMvRGF0YS9Db25zdC9Db25zdGFudFwiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhdGhzIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUmVwb3J0SG9zdDogc3RyaW5nID0gJ2h0dHBzOi8vZGxvZy51dS5jYydcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTWFpbkhvc3Q6IHN0cmluZyA9IEFwcHMuaXNEZWJ1ZyA/ICdodHRwOi8vMTAuMS4wLjU6OTUwMS9hcGkvdjEvJyA6ICdodHRwczovL3h5aHkuaWZ1c2t5LmNvbS9hcGkvdjEvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTWFpbkNETkhvc3Q6IHN0cmluZyA9ICdodHRwczovL21pbmktZXIuZGwuZ3hwYW4uY24vc29lLyc7IC8vJ2h0dHBzOi8vbWluaS1lci0xMjUxMDA2MC5jb3MuYXAtZ3Vhbmd6aG91Lm15cWNsb3VkLmNvbS9zb2UvJ1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBTaGFyZUltZ1BhdGg6IHN0cmluZyA9IGAke1BhdGhzLk1haW5DRE5Ib3N0fXNoYXJlL2A7XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IENETlRhYmxlUGF0aDogc3RyaW5nID0gYCR7UGF0aHMuTWFpbkNETkhvc3R9dGFibGUvYDtcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTmF0aXZlVGFibGVQYXRoOiBzdHJpbmcgPSAnY3N2Lyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFNvdW5kUGF0aDogc3RyaW5nID0gJ3NvdW5kLyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IExldmVsQ2ZnUGF0aDogc3RyaW5nID0gJ2NvbmZpZy9sZXZlbC9uZXcvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUm9vbVByZWZhYlBhdGg6IHN0cmluZyA9ICdwcmVmYWIvaG90ZWwvcm9vbS8nXG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJvb21QaWNQYXRoOiBzdHJpbmcgPSAndGV4dHVyZS9ob3RlbC8nO1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBMZXZlbE1hcFBhdGg6IHN0cmluZyA9ICdwcmVmYWIvTGV2ZWxNYXAvJztcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTGV2ZWxSZW1vdFBhdGg6IHN0cmluZyA9IGAke1BhdGhzLk1haW5DRE5Ib3N0fWxldmVsL2A7XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR1cm9yaWFsQ2ZnUGF0aDogc3RyaW5nID0gJ2NvbmZpZy9sZXZlbC90dXJvcmlhbC8nO1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBUdXJvcmlhbFJlbW90UGF0aDogc3RyaW5nID0gYCR7UGF0aHMuTWFpbkNETkhvc3R9dHVyb3JpYWwvYDtcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTWF0Y2gzQmc6IHN0cmluZyA9ICd0ZXh0dXJlL21hdGNoMy9iZy8nO1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBTb01hcDogc3RyaW5nID0gJ3RleHR1cmUvbWFwLyc7XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IE1hdGNoM0JnRWZmOiBzdHJpbmcgPSAncHJlZmFiL2VmZi8nO1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBEYWlseVRhc2tDb25maWc6IHN0cmluZyA9ICdodHRwczovL21pbmktY2VudGVyLmRsLmdhbi5jbi9jb25maWdjZW50ZXIvc29lLXd4L3Rhc2tsaXN0Lmpzb24nXG5cbiAgICAvL+mBk+WFt+WbvueJh+i3r+W+hFxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SXRlbVBhdGgoaXRlbUlkOiBQcm9wVHlwZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgdGV4dHVyZS91aS9pdGVtL2l0ZW1fJHtpdGVtSWR9LnBuZ2A7XG4gICAgfVxufSJdfQ==