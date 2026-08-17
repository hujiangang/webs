"use strict";
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