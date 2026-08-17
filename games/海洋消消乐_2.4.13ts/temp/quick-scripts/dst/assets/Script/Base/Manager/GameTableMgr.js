
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/GameTableMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3b65fbC0rFChYM1cvxZmvb6', 'GameTableMgr');
// Script/Base/Manager/GameTableMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameTableMgr = void 0;
var BaseTable_1 = require("./Table/BaseTable");
var SingletonFactory_1 = require("../Utils/SingletonFactory");
var Titles_1 = require("../Tabls/Titles");
var ChapterStory_1 = require("../Tabls/ChapterStory");
var ChapterInfo_1 = require("../Tabls/ChapterInfo");
var PropInfo_1 = require("../Tabls/PropInfo");
var BoxRewardInfo_1 = require("../Tabls/BoxRewardInfo");
var IslandUnlockCfg_1 = require("../Tabls/IslandUnlockCfg");
var SlotBonusCfg_1 = require("../Tabls/SlotBonusCfg");
var LevelUpReward_1 = require("../Tabls/LevelUpReward");
var ShareCfg_1 = require("../Tabls/ShareCfg");
var HotelCfg_1 = require("../Tabls/HotelCfg");
var HotelRoomCfg_1 = require("../Tabls/HotelRoomCfg");
var ShopInfo_1 = require("../Tabls/ShopInfo");
var GameTableMgr = /** @class */ (function () {
    function GameTableMgr() {
        // public readonly PopCfg = new BaseTable<number, proto.aladinfun.mini.SuperPopCfgConfig>("Id", "SuperPopCfgConfigAry", null, afpb);
        /**展示目标时的信息*/
        this.Titles = new BaseTable_1.BaseTable("lv", "titles", Titles_1.default, null);
        /**章节对话表 */
        this.ChapterStory = new BaseTable_1.BaseTable("trigger", "ChapterStory", ChapterStory_1.default, null);
        /**岛屿的章节信息 */
        this.ChapterInfo = new BaseTable_1.BaseTable("id", "ChapterInfo", ChapterInfo_1.default, null);
        /**岛屿的章节信息 */
        this.PropInfo = new BaseTable_1.BaseTable("id", "PropInfo", PropInfo_1.default, null);
        /**宝箱的掉落信息 */
        this.BoxRewardInfo = new BaseTable_1.BaseTable("id", "BoxReward", BoxRewardInfo_1.default, null);
        /**关卡结算信息 */
        this.LevelUpReward = new BaseTable_1.BaseTable("id", "LevelUpReward", LevelUpReward_1.default, null);
        /**商城配置信息 */
        this.ShopInfo = new BaseTable_1.BaseTable("id", "ShopTools", ShopInfo_1.default, null);
        this.IslandUnlockCfg = new BaseTable_1.BaseTable("id", "IslandUnlockCfg", IslandUnlockCfg_1.default, null);
        this.ShareCfg = new BaseTable_1.BaseTable("id", "ShareCfg", ShareCfg_1.default, null);
        /**酒店的配置 */
        this.HotelCfg = new BaseTable_1.BaseTable("id", "HotelCfg", HotelCfg_1.default, null);
        /**酒店的房间配置 */
        this.HotelRoomCfg = new BaseTable_1.BaseTable(["roomId", "slotId"], "HotelRoomCfg", HotelRoomCfg_1.default, null);
        /**酒店房间部位的积分信息配置 */
        this.SlotBonusCfg = new BaseTable_1.BaseTable(["roomId", "count"], 'SlotBonus', SlotBonusCfg_1.default, null);
        /**每日任务配置 */
        this.DailyTaskInfo = null;
        this.isReady = false;
    }
    GameTableMgr.prototype.execute = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.checkAllReady() || _this.isReady) {
                return resolve(true);
            }
            var timer = setInterval(function () {
                if (_this.checkAllReady()) {
                    clearInterval(timer);
                    resolve(true);
                    _this.isReady = true;
                }
            }, 10);
        });
    };
    // 检查所有的表是否都加载完成了
    GameTableMgr.prototype.checkAllReady = function () {
        var c;
        var isReady = true;
        var keys = Object.keys(this);
        for (var i = 0; i < keys.length; i++) {
            c = this[keys[i]];
            if (c && c instanceof BaseTable_1.BaseTable && !c.isReady) {
                isReady = false;
                // break;
            }
        }
        return isReady;
    };
    GameTableMgr.ins = SingletonFactory_1.SingletonFactory.getInstance(GameTableMgr);
    return GameTableMgr;
}());
exports.GameTableMgr = GameTableMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxHYW1lVGFibGVNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsK0NBQThDO0FBQzlDLDhEQUE2RDtBQUM3RCwwQ0FBcUM7QUFDckMsc0RBQWlEO0FBQ2pELG9EQUErQztBQUMvQyw4Q0FBeUM7QUFDekMsd0RBQW1EO0FBQ25ELDREQUF1RDtBQUN2RCxzREFBaUQ7QUFDakQsd0RBQW1EO0FBQ25ELDhDQUF5QztBQUN6Qyw4Q0FBeUM7QUFDekMsc0RBQWlEO0FBQ2pELDhDQUF5QztBQUd6QztJQUFBO1FBSUksb0lBQW9JO1FBRXBJLGFBQWE7UUFDRyxXQUFNLEdBQUcsSUFBSSxxQkFBUyxDQUFpQixJQUFJLEVBQUUsUUFBUSxFQUFFLGdCQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckYsV0FBVztRQUNLLGlCQUFZLEdBQUcsSUFBSSxxQkFBUyxDQUF1QixTQUFTLEVBQUUsY0FBYyxFQUFFLHNCQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEgsYUFBYTtRQUNHLGdCQUFXLEdBQUcsSUFBSSxxQkFBUyxDQUFzQixJQUFJLEVBQUUsYUFBYSxFQUFFLHFCQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekcsYUFBYTtRQUNHLGFBQVEsR0FBRyxJQUFJLHFCQUFTLENBQW1CLElBQUksRUFBRSxVQUFVLEVBQUUsa0JBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3RixhQUFhO1FBQ0csa0JBQWEsR0FBRyxJQUFJLHFCQUFTLENBQXdCLElBQUksRUFBRSxXQUFXLEVBQUUsdUJBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3RyxZQUFZO1FBQ0ksa0JBQWEsR0FBRyxJQUFJLHFCQUFTLENBQXdCLElBQUksRUFBRSxlQUFlLEVBQUUsdUJBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqSCxZQUFZO1FBQ0ksYUFBUSxHQUFHLElBQUkscUJBQVMsQ0FBbUIsSUFBSSxFQUFFLFdBQVcsRUFBRSxrQkFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTlFLG9CQUFlLEdBQUcsSUFBSSxxQkFBUyxDQUEwQixJQUFJLEVBQUUsaUJBQWlCLEVBQUUseUJBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV6RyxhQUFRLEdBQUcsSUFBSSxxQkFBUyxDQUFtQixJQUFJLEVBQUUsVUFBVSxFQUFFLGtCQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0YsV0FBVztRQUNLLGFBQVEsR0FBRyxJQUFJLHFCQUFTLENBQW1CLElBQUksRUFBRSxVQUFVLEVBQUUsa0JBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3RixhQUFhO1FBQ0csaUJBQVksR0FBRyxJQUFJLHFCQUFTLENBQXVCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLGNBQWMsRUFBRSxzQkFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdILG1CQUFtQjtRQUNILGlCQUFZLEdBQUcsSUFBSSxxQkFBUyxDQUF1QixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxXQUFXLEVBQUUsc0JBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6SCxZQUFZO1FBQ0wsa0JBQWEsR0FBcUMsSUFBSSxDQUFDO1FBRXZELFlBQU8sR0FBRyxLQUFLLENBQUM7SUFnQzNCLENBQUM7SUE5QlUsOEJBQU8sR0FBZDtRQUFBLGlCQWFDO1FBWkcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLElBQUksS0FBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLEtBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ3RDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3hCO1lBQ0QsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDO2dCQUNwQixJQUFJLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRTtvQkFDdEIsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2QsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7aUJBQ3ZCO1lBQ0wsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQ1YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsaUJBQWlCO0lBQ1Qsb0NBQWEsR0FBckI7UUFDSSxJQUFJLENBQUMsQ0FBQztRQUNOLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQTtRQUNsQixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLHFCQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFO2dCQUMzQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNoQixTQUFTO2FBQ1o7U0FDSjtRQUNELE9BQU8sT0FBTyxDQUFBO0lBQ2xCLENBQUM7SUE3RGEsZ0JBQUcsR0FBaUIsbUNBQWdCLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBK0RqRixtQkFBQztDQWpFRCxBQWlFQyxJQUFBO0FBakVZLG9DQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBCYXNlVGFibGUgfSBmcm9tIFwiLi9UYWJsZS9CYXNlVGFibGVcIjtcbmltcG9ydCB7IFNpbmdsZXRvbkZhY3RvcnkgfSBmcm9tIFwiLi4vVXRpbHMvU2luZ2xldG9uRmFjdG9yeVwiO1xuaW1wb3J0IFRpdGxlcyBmcm9tIFwiLi4vVGFibHMvVGl0bGVzXCI7XG5pbXBvcnQgQ2hhcHRlclN0b3J5IGZyb20gJy4uL1RhYmxzL0NoYXB0ZXJTdG9yeSc7XG5pbXBvcnQgQ2hhcHRlckluZm8gZnJvbSBcIi4uL1RhYmxzL0NoYXB0ZXJJbmZvXCI7XG5pbXBvcnQgUHJvcEluZm8gZnJvbSBcIi4uL1RhYmxzL1Byb3BJbmZvXCI7XG5pbXBvcnQgQm94UmV3YXJkSW5mbyBmcm9tIFwiLi4vVGFibHMvQm94UmV3YXJkSW5mb1wiO1xuaW1wb3J0IElzbGFuZFVubG9ja0NmZyBmcm9tIFwiLi4vVGFibHMvSXNsYW5kVW5sb2NrQ2ZnXCI7XG5pbXBvcnQgU2xvdEJvbnVzQ2ZnIGZyb20gXCIuLi9UYWJscy9TbG90Qm9udXNDZmdcIjtcbmltcG9ydCBMZXZlbFVwUmV3YXJkIGZyb20gJy4uL1RhYmxzL0xldmVsVXBSZXdhcmQnO1xuaW1wb3J0IFNoYXJlQ2ZnIGZyb20gXCIuLi9UYWJscy9TaGFyZUNmZ1wiO1xuaW1wb3J0IEhvdGVsQ2ZnIGZyb20gXCIuLi9UYWJscy9Ib3RlbENmZ1wiO1xuaW1wb3J0IEhvdGVsUm9vbUNmZyBmcm9tIFwiLi4vVGFibHMvSG90ZWxSb29tQ2ZnXCI7XG5pbXBvcnQgU2hvcEluZm8gZnJvbSBcIi4uL1RhYmxzL1Nob3BJbmZvXCI7XG5pbXBvcnQgRGFpbHlUYXNrSW5mbyBmcm9tIFwiLi4vVGFibHMvRGFpbHlUYXNrSW5mb1wiO1xuXG5leHBvcnQgY2xhc3MgR2FtZVRhYmxlTWdyIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgaW5zOiBHYW1lVGFibGVNZ3IgPSBTaW5nbGV0b25GYWN0b3J5LmdldEluc3RhbmNlKEdhbWVUYWJsZU1ncik7XG5cbiAgICAvLyBwdWJsaWMgcmVhZG9ubHkgUG9wQ2ZnID0gbmV3IEJhc2VUYWJsZTxudW1iZXIsIHByb3RvLmFsYWRpbmZ1bi5taW5pLlN1cGVyUG9wQ2ZnQ29uZmlnPihcIklkXCIsIFwiU3VwZXJQb3BDZmdDb25maWdBcnlcIiwgbnVsbCwgYWZwYik7XG5cbiAgICAvKirlsZXnpLrnm67moIfml7bnmoTkv6Hmga8qL1xuICAgIHB1YmxpYyByZWFkb25seSBUaXRsZXMgPSBuZXcgQmFzZVRhYmxlPG51bWJlciwgVGl0bGVzPihcImx2XCIsIFwidGl0bGVzXCIsIFRpdGxlcywgbnVsbCk7XG4gICAgLyoq56ug6IqC5a+56K+d6KGoICovXG4gICAgcHVibGljIHJlYWRvbmx5IENoYXB0ZXJTdG9yeSA9IG5ldyBCYXNlVGFibGU8bnVtYmVyLCBDaGFwdGVyU3Rvcnk+KFwidHJpZ2dlclwiLCBcIkNoYXB0ZXJTdG9yeVwiLCBDaGFwdGVyU3RvcnksIG51bGwpO1xuICAgIC8qKuWym+Wxv+eahOeroOiKguS/oeaBryAqL1xuICAgIHB1YmxpYyByZWFkb25seSBDaGFwdGVySW5mbyA9IG5ldyBCYXNlVGFibGU8bnVtYmVyLCBDaGFwdGVySW5mbz4oXCJpZFwiLCBcIkNoYXB0ZXJJbmZvXCIsIENoYXB0ZXJJbmZvLCBudWxsKTtcbiAgICAvKirlspvlsb/nmoTnq6DoioLkv6Hmga8gKi9cbiAgICBwdWJsaWMgcmVhZG9ubHkgUHJvcEluZm8gPSBuZXcgQmFzZVRhYmxlPG51bWJlciwgUHJvcEluZm8+KFwiaWRcIiwgXCJQcm9wSW5mb1wiLCBQcm9wSW5mbywgbnVsbCk7XG4gICAgLyoq5a6d566x55qE5o6J6JC95L+h5oGvICovXG4gICAgcHVibGljIHJlYWRvbmx5IEJveFJld2FyZEluZm8gPSBuZXcgQmFzZVRhYmxlPG51bWJlciwgQm94UmV3YXJkSW5mbz4oXCJpZFwiLCBcIkJveFJld2FyZFwiLCBCb3hSZXdhcmRJbmZvLCBudWxsKTtcbiAgICAvKirlhbPljaHnu5Pnrpfkv6Hmga8gKi9cbiAgICBwdWJsaWMgcmVhZG9ubHkgTGV2ZWxVcFJld2FyZCA9IG5ldyBCYXNlVGFibGU8bnVtYmVyLCBMZXZlbFVwUmV3YXJkPihcImlkXCIsIFwiTGV2ZWxVcFJld2FyZFwiLCBMZXZlbFVwUmV3YXJkLCBudWxsKTtcbiAgICAvKirllYbln47phY3nva7kv6Hmga8gKi9cbiAgICBwdWJsaWMgcmVhZG9ubHkgU2hvcEluZm8gPSBuZXcgQmFzZVRhYmxlPG51bWJlciwgU2hvcEluZm8+KFwiaWRcIiwgXCJTaG9wVG9vbHNcIiwgU2hvcEluZm8sIG51bGwpO1xuXG4gICAgcHVibGljIHJlYWRvbmx5IElzbGFuZFVubG9ja0NmZyA9IG5ldyBCYXNlVGFibGU8bnVtYmVyLCBJc2xhbmRVbmxvY2tDZmc+KFwiaWRcIiwgXCJJc2xhbmRVbmxvY2tDZmdcIiwgSXNsYW5kVW5sb2NrQ2ZnLCBudWxsKTtcblxuICAgIHB1YmxpYyByZWFkb25seSBTaGFyZUNmZyA9IG5ldyBCYXNlVGFibGU8bnVtYmVyLCBTaGFyZUNmZz4oXCJpZFwiLCBcIlNoYXJlQ2ZnXCIsIFNoYXJlQ2ZnLCBudWxsKTtcbiAgICAvKirphZLlupfnmoTphY3nva4gKi9cbiAgICBwdWJsaWMgcmVhZG9ubHkgSG90ZWxDZmcgPSBuZXcgQmFzZVRhYmxlPG51bWJlciwgSG90ZWxDZmc+KFwiaWRcIiwgXCJIb3RlbENmZ1wiLCBIb3RlbENmZywgbnVsbCk7XG4gICAgLyoq6YWS5bqX55qE5oi/6Ze06YWN572uICovXG4gICAgcHVibGljIHJlYWRvbmx5IEhvdGVsUm9vbUNmZyA9IG5ldyBCYXNlVGFibGU8bnVtYmVyLCBIb3RlbFJvb21DZmc+KFtcInJvb21JZFwiLCBcInNsb3RJZFwiXSwgXCJIb3RlbFJvb21DZmdcIiwgSG90ZWxSb29tQ2ZnLCBudWxsKTtcbiAgICAvKirphZLlupfmiL/pl7Tpg6jkvY3nmoTnp6/liIbkv6Hmga/phY3nva4gKi9cbiAgICBwdWJsaWMgcmVhZG9ubHkgU2xvdEJvbnVzQ2ZnID0gbmV3IEJhc2VUYWJsZTxudW1iZXIsIFNsb3RCb251c0NmZz4oW1wicm9vbUlkXCIsIFwiY291bnRcIl0sICdTbG90Qm9udXMnLCBTbG90Qm9udXNDZmcsIG51bGwpO1xuICAgIC8qKuavj+aXpeS7u+WKoemFjee9riAqL1xuICAgIHB1YmxpYyBEYWlseVRhc2tJbmZvOiBCYXNlVGFibGU8bnVtYmVyLCBEYWlseVRhc2tJbmZvPiA9IG51bGw7XG5cbiAgICBwdWJsaWMgaXNSZWFkeSA9IGZhbHNlO1xuXG4gICAgcHVibGljIGV4ZWN1dGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja0FsbFJlYWR5KCkgfHwgdGhpcy5pc1JlYWR5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tBbGxSZWFkeSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTApXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIOajgOafpeaJgOacieeahOihqOaYr+WQpumDveWKoOi9veWujOaIkOS6hlxuICAgIHByaXZhdGUgY2hlY2tBbGxSZWFkeSgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGM7XG4gICAgICAgIGxldCBpc1JlYWR5ID0gdHJ1ZVxuICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGhpcyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYyA9IHRoaXNba2V5c1tpXV07XG4gICAgICAgICAgICBpZiAoYyAmJiBjIGluc3RhbmNlb2YgQmFzZVRhYmxlICYmICFjLmlzUmVhZHkpIHtcbiAgICAgICAgICAgICAgICBpc1JlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy8gYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzUmVhZHlcbiAgICB9XG5cbn1cblxuIl19