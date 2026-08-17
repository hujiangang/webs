
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/SimulationOperation/View/Map/MapIslandManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcU2ltdWxhdGlvbk9wZXJhdGlvblxcVmlld1xcTWFwXFxNYXBJc2xhbmRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUEyQztBQUczQztJQUFBO0lBYUEsQ0FBQztJQVhHLGFBQWE7SUFDQyxtQ0FBa0IsR0FBaEMsVUFBaUMsRUFBVTtRQUN2QyxJQUFJLE1BQU0sR0FBRyxXQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMvQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtZQUNwQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFO2dCQUN6QixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwQjtTQUNKO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyw0Q0FBWSxFQUFFLHVCQUFLLENBQUMsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQWJBLEFBYUMsSUFBQTtBQWJZLDRDQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgSUlzbGFuZFVubG9ja0NmZyB9IGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL1RhYmxzL0lzbGFuZFVubG9ja0NmZ1wiO1xuXG5leHBvcnQgY2xhc3MgTWFwSXNsYW5kTWFuYWdlciB7XG5cbiAgICAvKirojrflj5blu7rnrZHnmoTphY3nva4gKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldEJ1aWxkQ29uZmlnQnlJZChpZDogbnVtYmVyKTogSUlzbGFuZFVubG9ja0NmZyB7XG4gICAgICAgIHZhciBjb25maWcgPSBNLnRhYmxlLklzbGFuZFVubG9ja0NmZy5nZXREYXRhKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29uZmlnLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoY29uZmlnW2ldLmJ1aWxkSWQgPT0gaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYOiOt+WPluS4jeWIsOW7uuetkWlkPSR7aWR955qE6YWN572uYCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn0iXX0=