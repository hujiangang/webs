"use strict";
cc._RF.push(module, 'e49dcc/kc1ODq3SjVDT4yWz', 'MapIslandManager');
// Script/Logic/SimulationOperation/View/Map/MapIslandManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapIslandManager = void 0;
var M_1 = require("../../../../Base/Manager/M");
var MapIslandManager = /** @class */ (function () {
    function MapIslandManager() {
    }
    /**获取建筑的配置 */
    MapIslandManager.getBuildConfigById = function (id) {
        var config = M_1.default.table.IslandUnlockCfg.getData();
        for (var i = 0; i < config.length; ++i) {
            if (config[i].buildId == id) {
                return config[i];
            }
        }
        console.error("\u83B7\u53D6\u4E0D\u5230\u5EFA\u7B51id=" + id + "\u7684\u914D\u7F6E");
        return null;
    };
    return MapIslandManager;
}());
exports.MapIslandManager = MapIslandManager;

cc._RF.pop();