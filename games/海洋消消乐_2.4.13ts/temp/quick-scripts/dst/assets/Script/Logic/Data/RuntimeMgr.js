
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Data/RuntimeMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f6cc0HzBSxGm5ePVq2g3XAJ', 'RuntimeMgr');
// Script/Logic/Data/RuntimeMgr.ts

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerInfo_1 = require("./Player/PlayerInfo");
var SingletonFactory_1 = require("../../Base/Utils/SingletonFactory");
var BaseConst_1 = require("../../Base/BaseConst");
var EventMgr_1 = require("../../Base/Manager/EventMgr");
var Event_1 = require("./Const/Event");
var Constant_1 = require("./Const/Constant");
var M_1 = require("../../Base/Manager/M");
var Apps_1 = require("../../Base/Apps");
var StorageMgr_1 = require("../../Base/Manager/StorageMgr");
var ReportMgr_1 = require("../../Base/Manager/ReportMgr");
var Common_1 = require("../Common/Common");
var DailyTaskMgr_1 = require("../../Base/Manager/DailyTaskMgr");
var RuntimeMgr = /** @class */ (function () {
    function RuntimeMgr() {
        /**体量不大,应该一个info就能搞定,不需要背包体系 */
        this.info = null;
        /**数据存储队列 */
        this._dataSaveTaskPool = [];
        this._execSaveTasking = false;
        /**是否已经登录 */
        this.IsLogin = false;
        /**累计爆炸次数 */
        this.BombCount = 0;
        /**结束后步数转换炸弹的统计 */
        this.OverStepCount = 0;
        /**用户当前选择的关卡 */
        this.SelectLevel = 0;
        /**当前加载的关卡 */
        this.CurLevel = 0;
        /**跳场景任务! */
        this.SceneTask = null;
        /**当前选择的使用道具 */
        this.SelectProp = null;
        /**三消当前背景ID */
        this.CurBgIndex = 0;
        /**当前combo数 */
        this.CurCombo = 0;
        /**一关使用的时间 */
        this.MatchGameTime = 0;
        /** */
        this.RewardTask = {};
        // public UsePorpRecord: Array<{ [type: number]: number }> = null;
        /**每日任务进度 -1为已经领取 */
        this.DailyTaskProgress = null;
        this.RoomCurrentSelectSubSlotCfg = null;
        /**挂机时间进度 */
        this._dailyTime = 0;
        this._serverConfig = null;
        this._score = 0;
        this._timeHandle = null;
        this._gameStata = Constant_1.GameState.preReady;
        this._onShowTask = null;
        this.CurrentGuestUserid = null;
        this._preGameState = null;
        this._zyTimeTaskPool = 0;
        this.SceneTask = [];
        this.info = new PlayerInfo_1.default();
        this._onShowTask = [];
        this._openTimer();
    }
    RuntimeMgr.prototype.initRemotData = function (data) {
        var userdata = data ? data.userdata : null;
        this.RewardTask = data ? data.awards : null;
        this.info.initRemotData(userdata);
        if (data) {
            this.info.userId = data.uid;
            this.IsLogin = true;
            this._checkOnShowTask();
        }
        console.error('当前用户ID:', this.info.userId);
        StorageMgr_1.StorageMgr.Storage.init(userdata);
        this.setDailyTime(StorageMgr_1.StorageMgr.RingStorage.day().getValue(Constant_1.NativeKey.DailyTime, 0));
        this.getServerConfig();
        ReportMgr_1.default.ins.login();
    };
    Object.defineProperty(RuntimeMgr.prototype, "UserId", {
        get: function () {
            return this.info.userId;
        },
        enumerable: false,
        configurable: true
    });
    RuntimeMgr.prototype.initTaskNativeData = function () {
        if (this.DailyTaskProgress) {
            DailyTaskMgr_1.default.ins.syncPro2Native(this.DailyTaskProgress.progress);
        }
    };
    /**
     * 获取当前的游戏道具数据
     * @param type
     * @returns { count: number } | Array<{ count: number }>
     */
    RuntimeMgr.prototype.getPropData = function (type) {
        if (type === void 0) { type = null; }
        var ddd = JSON.parse(cc.sys.localStorage.getItem("daoju"));
        if (ddd == null) {
            ddd = {};
            cc.sys.localStorage.setItem("daoju", JSON.stringify(ddd));
        }
        this.info.propData = ddd;
        var rst = null;
        if (type == null) {
            rst = this.info.propData;
        }
        else {
            rst = this.info.propData[type];
        }
        return rst;
    };
    RuntimeMgr.prototype.getUserId = function () {
        return this.info.userId;
    };
    RuntimeMgr.prototype.isPropUnLocked = function (type) {
        var info = M_1.default.table.PropInfo.getByPrimaryKey(type);
        var result = false;
        if (info && (this.getMatch3Level() >= info.unlockLv)) {
            result = true;
        }
        return result;
    };
    RuntimeMgr.prototype.getCurrency = function (type) {
        return this.info[this.getCurrencyKey(type)];
    };
    RuntimeMgr.prototype.getCurrencyStr = function (type) {
        return this.getCurrency(type).toString();
    };
    RuntimeMgr.prototype.getFormateCoin = function () {
        return Common_1.default.bytesToSize(this.getCurrency(BaseConst_1.CurrencyId.Coin));
    };
    RuntimeMgr.prototype.getCurChapter = function () {
        return this.info.chapter;
    };
    RuntimeMgr.prototype.getServerTime = function () {
        return this.info.serverTime;
    };
    RuntimeMgr.prototype.getLastTime = function () {
        return this.info.getLastTime();
    };
    Object.defineProperty(RuntimeMgr.prototype, "GameState", {
        get: function () {
            return this._gameStata;
        },
        /**三消游戏的状态机 */
        set: function (state) {
            this._gameStata = state;
        },
        enumerable: false,
        configurable: true
    });
    /**三消等级(当前最大的) */
    RuntimeMgr.prototype.getMatch3Level = function () {
        this.info.mathc3Level = Number(cc.sys.localStorage.getItem("gamelevel"));
        return this.info.mathc3Level || 1;
    };
    Object.defineProperty(RuntimeMgr.prototype, "maxMatch3Level", {
        get: function () {
            return Apps_1.default.isDebug ? 9999 : 500;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RuntimeMgr.prototype, "currentScore", {
        get: function () {
            return this._score || 0;
        },
        enumerable: false,
        configurable: true
    });
    /**所有的星星数 */
    RuntimeMgr.prototype.getStarCount = function () {
        var count = 0;
        this.info.lvMap.forEach(function (value, key) {
            count += value.star;
        });
        return count;
    };
    RuntimeMgr.prototype.gameStar = function () {
        this._preGameState = null;
        this._score = 0;
    };
    RuntimeMgr.prototype.setScore = function (score) {
        this._score = score;
    };
    RuntimeMgr.prototype.setServerTime = function (time) {
        this.info.serverTime = time;
    };
    RuntimeMgr.prototype.addScore = function (score) {
        this.setScore(this.currentScore + (score || 0));
        return this.currentScore;
    };
    RuntimeMgr.prototype._addCountByType = function (key, type, count) {
        if (count === void 0) { count = 1; }
        var dd = StorageMgr_1.StorageMgr.RingStorage.day().getValue(key, {});
        dd[type] = dd[type] ? (dd[type] + count) : count;
        StorageMgr_1.StorageMgr.RingStorage.day().setValue(key, dd);
        var md = StorageMgr_1.StorageMgr.RingStorage.month().getValue(key + 1, {});
        md[type] = md[type] ? (md[type] + count) : count;
        StorageMgr_1.StorageMgr.RingStorage.month().setValue(key + 1, md);
        var ad = StorageMgr_1.StorageMgr.Storage.getObject(key + 2, {});
        ad[type] = ad[type] ? (ad[type] + count) : count;
        StorageMgr_1.StorageMgr.Storage.setObject(key + 2, ad);
        DailyTaskMgr_1.default.ins.syncPro2Ser(key, type, dd[type], md[type]);
    };
    RuntimeMgr.prototype._addCount = function (key) {
        var dc = StorageMgr_1.StorageMgr.RingStorage.day().getValue(key, 0);
        StorageMgr_1.StorageMgr.RingStorage.day().setValue(key, dc + 1);
        var mc = StorageMgr_1.StorageMgr.RingStorage.month().getValue(key + 1, 0);
        StorageMgr_1.StorageMgr.RingStorage.month().setValue(key + 1, mc + 1);
        var ac = StorageMgr_1.StorageMgr.Storage.getInt(key + 2, 0);
        StorageMgr_1.StorageMgr.Storage.setInt(key + 2, ac + 1);
        DailyTaskMgr_1.default.ins.syncPro2Ser(key, null, dc + 1, mc + 1);
    };
    RuntimeMgr.prototype.addCollectCount = function (type, count) {
        if (count === void 0) { count = 1; }
        this._addCountByType(Constant_1.NativeKey.DailyCollect, type, count);
    };
    RuntimeMgr.prototype.addMergeCount = function (type) {
        this._addCountByType(Constant_1.NativeKey.DailyMerge, type);
    };
    RuntimeMgr.prototype.addGameCount = function () {
        this._addCount(Constant_1.NativeKey.DailyGameCount);
    };
    RuntimeMgr.prototype.addUsePropCount = function (type) {
        this._addCount(Constant_1.NativeKey.DailyUsePropCount);
    };
    /**
     * 增量更新一个道具的数量
     * @param type
     * @param num
     */
    RuntimeMgr.prototype.updatePropCount = function (type, num) {
        var p = this.info.propData[type] || { count: 0 };
        p.count += num;
        p.count = p.count < 0 ? 0 : p.count;
        this.info.propData[type] = p;
        cc.sys.localStorage.setItem("daoju", JSON.stringify(this.info.propData));
        EventMgr_1.default.ins.send(Event_1.Event.UI.PropCount, type);
        this._pushSaveTask('propData');
    };
    RuntimeMgr.prototype.setMatch3Level = function (lv, qj) {
        if (qj === void 0) { qj = false; }
        if (lv > this.info.mathc3Level || qj) {
            //上报排行信息
            var lvData = this.getNativeLvData(this.info.mathc3Level);
            M_1.default.net.putRankData({ name: 'BarrierRank', value: Common_1.default.stringifyRankData(this.info.mathc3Level, lvData.score) });
            this.info.mathc3Level = lv;
            cc.sys.localStorage.setItem("gamelevel", lv);
            M_1.default.event.send(Event_1.Event.UI.UpdateLv, lv);
            this._pushSaveTask('mathc3Level');
        }
        else {
            this.SelectLevel = lv;
        }
    };
    /**
    * 增量设置一个货币的数量
    * @param type
    * @param num
    */
    RuntimeMgr.prototype.addCurrency = function (type, num) {
        if (type == BaseConst_1.CurrencyId.TaskKey) {
            DailyTaskMgr_1.default.ins.addDailyTaskKey(num);
        }
        else {
            var key = this.getCurrencyKey(type);
            var currentValue = this.info[key];
            if (type == BaseConst_1.CurrencyId.Power && num > 0 && currentValue >= Constant_1.MaxPowerCount) {
                return;
            }
            this.info[key] += num;
            if (this.info[key] < 0) {
                this.info[key] = 0;
            }
            EventMgr_1.default.ins.send(Event_1.Event.UI.UpdateCurrency, type, this.getCurrency(type));
            this._pushSaveTask(key);
        }
    };
    RuntimeMgr.prototype.isPowerEnough = function () {
        return this.info.power >= Constant_1.PowerConfig.LvConsumption;
    };
    /**获取指定关卡的通关数据 */
    RuntimeMgr.prototype.getNativeLvData = function (lv) {
        if (lv === void 0) { lv = null; }
        lv = lv || this.CurLevel;
        var key = Constant_1.NativeKey.LvDataKey + "_" + lv;
        var result = this.info.lvMap.get(key);
        if (!result) {
            result = StorageMgr_1.StorageMgr.Storage.getObject(key, { score: 0, star: 0 });
            if (result && result.score != 0 && result.star != 0) {
                this.info.lvMap.set(key, result);
            }
        }
        return result;
    };
    RuntimeMgr.prototype.getBoxGiftDataByLv = function (lv) {
        var data = StorageMgr_1.StorageMgr.Storage.getObject(Constant_1.NativeKey.BoxGifts, {});
        return data[lv];
    };
    RuntimeMgr.prototype.setBoxGiftData = function (lv, received) {
        var data = StorageMgr_1.StorageMgr.Storage.getObject(Constant_1.NativeKey.BoxGifts, {});
        if (data[lv] && data[lv]['received'])
            return;
        data[lv] = { received: received };
        StorageMgr_1.StorageMgr.Storage.setObject(Constant_1.NativeKey.BoxGifts, data, true);
    };
    /**
     * 保存关卡数据
     * @param star 星星数
     * @return Boolean 是否是新通关
     */
    RuntimeMgr.prototype.savaLvData = function (star, score) {
        var lvData = this.getNativeLvData(this.CurLevel);
        var isNew = false;
        if (lvData.score == 0 && lvData.star == 0) {
            isNew = true;
            M_1.default.runtime.addCollectCount('star', star);
        }
        else if (star - lvData.star > 0) {
            M_1.default.runtime.addCollectCount('star', star - lvData.star);
        }
        score = score || this._score;
        if (score > lvData.score) {
            lvData.score = score;
        }
        if (star > lvData.star) {
            lvData.star = star;
        }
        var key = Constant_1.NativeKey.LvDataKey + "_" + this.CurLevel;
        this.info.lvMap.set(key, lvData);
        StorageMgr_1.StorageMgr.Storage.setObject(key, lvData, true);
        if ( /*isNew && */this.CurLevel % 10 == 0) {
            var info = M_1.default.table.BoxRewardInfo.getByPrimaryKey(this.CurLevel);
            if (info) {
                //判断有奖励...插入待领取
                this.setBoxGiftData(this.CurLevel, false);
            }
        }
        return isNew;
    };
    RuntimeMgr.prototype.pushZhangyuTimePause = function () {
        this._zyTimeTaskPool++;
        this.pauseGame();
    };
    RuntimeMgr.prototype.deleteZhangyuTime = function () {
        this._zyTimeTaskPool--;
        if (this._zyTimeTaskPool <= 0) {
            this.resumeGame();
        }
    };
    RuntimeMgr.prototype.pauseGame = function () {
        if (this._gameStata >= Constant_1.GameState.Win) {
            this._preGameState = this._gameStata;
        }
        this._gameStata = Constant_1.GameState.Pause;
    };
    RuntimeMgr.prototype.resumeGame = function () {
        if (this._gameStata == Constant_1.GameState.Pause) {
            this._gameStata = this._preGameState == null ? Constant_1.GameState.Normal : this._preGameState;
            EventMgr_1.default.ins.send(Event_1.Event.GameCMD.GameResume);
        }
    };
    RuntimeMgr.prototype.getCurrencyKey = function (id) {
        return ['coin', 'diamond', 'power'][id];
    };
    /**开启定时器 */
    RuntimeMgr.prototype._openTimer = function () {
        //这里在后台也是会运行的...特别注意!
        if (!CC_EDITOR) {
            this._timeHandle = setInterval(this.update.bind(this), 1000);
        }
    };
    /**插入背包数据 */
    RuntimeMgr.prototype._pushSaveTask = function (key) {
        this._dataSaveTaskPool.push(key);
    };
    /**获取当前服务器配置 */
    RuntimeMgr.prototype.getServerConfig = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        if (!_this._serverConfig) {
                            M_1.default.net.getServerData().then(function (serverConfig) {
                                _this._serverConfig = serverConfig;
                                resolve(serverConfig);
                            });
                        }
                        else {
                            resolve(_this._serverConfig);
                        }
                    })];
            });
        });
    };
    /**执行保存数据任务! */
    RuntimeMgr.prototype._execSaveTask = function () {
        return __awaiter(this, void 0, void 0, function () {
            var task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this._execSaveTasking) return [3 /*break*/, 3];
                        this._execSaveTasking = true;
                        task = this._dataSaveTaskPool.shift();
                        if (!task) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.info.saveData(task)];
                    case 1:
                        _a.sent();
                        this._execSaveTasking = false;
                        this._execSaveTask();
                        return [3 /*break*/, 3];
                    case 2:
                        this._execSaveTasking = false;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RuntimeMgr.prototype._updatePowerTime = function () {
        if (this.getCurrency(BaseConst_1.CurrencyId.Power) < Constant_1.MaxPowerCount) {
            this.info.timeCounter++;
            if (this.info.timeCounter >= Number.MAX_SAFE_INTEGER) {
                this.info.timeCounter = 0;
            }
            if (this.info.timeCounter % 30 == 0) {
                this._pushSaveTask('timeCounter');
            }
            if (this.info.timeCounter % Constant_1.PowerConfig.NormalTime == 0) {
                this.addCurrency(BaseConst_1.CurrencyId.Power, Constant_1.PowerConfig.NormalCount);
            }
            EventMgr_1.default.ins.send(Event_1.Event.UI.UpdateRemainAddPowerTime, this.info.timeCounter);
        }
    };
    RuntimeMgr.prototype._updateDailyTime = function () {
        this.setDailyTime(this._dailyTime + 1);
        // M.event.send(Event.DailyTask.UpdateProgress, ConditionType.time);
    };
    Object.defineProperty(RuntimeMgr.prototype, "DailyTime", {
        get: function () {
            return this._dailyTime;
        },
        enumerable: false,
        configurable: true
    });
    RuntimeMgr.prototype.setDailyTime = function (value) {
        this._dailyTime = value;
        StorageMgr_1.StorageMgr.RingStorage.day().setValue(Constant_1.NativeKey.DailyTime, this._dailyTime);
    };
    RuntimeMgr.prototype.update = function () {
        if (this._dataSaveTaskPool.length > 0) {
            this._execSaveTask();
        }
        if (this.info.serverTime != 0) {
            this.info.serverTime++;
            if (this.info.serverTime % 30 == 0) {
                this.info.saveLastTime();
            }
        }
        this._updatePowerTime();
        this._updateDailyTime();
    };
    RuntimeMgr.prototype.pushOnShowTask = function (task) {
        if (!this._onShowTask) {
            this._onShowTask = [];
        }
        this._onShowTask.push(task);
    };
    RuntimeMgr.prototype._checkOnShowTask = function () {
        if (this._onShowTask && this._onShowTask.length > 0) {
            var userid = this._onShowTask.shift();
            M_1.default.net.addFriend(userid);
        }
    };
    RuntimeMgr.ins = SingletonFactory_1.SingletonFactory.getInstance(RuntimeMgr);
    return RuntimeMgr;
}());
exports.default = RuntimeMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcRGF0YVxcUnVudGltZU1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUE2QztBQUM3QyxzRUFBcUU7QUFDckUsa0RBQWtEO0FBQ2xELHdEQUFtRDtBQUNuRCx1Q0FBc0M7QUFDdEMsNkNBQXlIO0FBQ3pILDBDQUFxQztBQUNyQyx3Q0FBbUM7QUFDbkMsNERBQTJEO0FBRTNELDBEQUFxRDtBQUNyRCwyQ0FBc0M7QUFDdEMsZ0VBQTJEO0FBRzNEO0lBc0RJO1FBbERBLCtCQUErQjtRQUN2QixTQUFJLEdBQWUsSUFBSSxDQUFDO1FBRWhDLFlBQVk7UUFDSixzQkFBaUIsR0FBa0IsRUFBRSxDQUFDO1FBQ3RDLHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUUxQyxZQUFZO1FBQ0wsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUNoQyxZQUFZO1FBQ0wsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUM3QixrQkFBa0I7UUFDWCxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUNqQyxlQUFlO1FBQ1IsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDL0IsYUFBYTtRQUNOLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFDNUIsWUFBWTtRQUNMLGNBQVMsR0FBa0IsSUFBSSxDQUFDO1FBQ3ZDLGVBQWU7UUFDUixlQUFVLEdBQWEsSUFBSSxDQUFDO1FBQ25DLGNBQWM7UUFDUCxlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQzlCLGNBQWM7UUFDUCxhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQzVCLGFBQWE7UUFDTixrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUNqQyxNQUFNO1FBQ0MsZUFBVSxHQUFtRSxFQUFFLENBQUM7UUFDdkYsa0VBQWtFO1FBRWxFLG9CQUFvQjtRQUNiLHNCQUFpQixHQUF5RyxJQUFJLENBQUM7UUFFL0gsZ0NBQTJCLEdBQWdCLElBQUks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QkFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUM1QjtTQUNKO1FBR0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVNLG1DQUFjLEdBQXJCLFVBQXNCLElBQUk7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7U0FDekI7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU8scUNBQWdCLEdBQXhCO1FBQ0ksSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNqRCxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hDLFdBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQTVlYSxjQUFHLEdBQWUsbUNBQWdCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBOGU3RSxpQkFBQztDQWhmRCxBQWdmQyxJQUFBO2tCQWhmb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF5ZXJJbmZvIGZyb20gXCIuL1BsYXllci9QbGF5ZXJJbmZvXCI7XG5pbXBvcnQgeyBTaW5nbGV0b25GYWN0b3J5IH0gZnJvbSBcIi4uLy4uL0Jhc2UvVXRpbHMvU2luZ2xldG9uRmFjdG9yeVwiO1xuaW1wb3J0IHsgQ3VycmVuY3lJZCB9IGZyb20gXCIuLi8uLi9CYXNlL0Jhc2VDb25zdFwiO1xuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi8uLi9CYXNlL01hbmFnZXIvRXZlbnRNZ3JcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4vQ29uc3QvRXZlbnRcIjtcbmltcG9ydCB7IFByb3BUeXBlLCBHYW1lU3RhdGUsIE5hdGl2ZUtleSwgUG93ZXJDb25maWcsIE1heFBvd2VyQ291bnQsIFdhcmluZ1RpcHMsIENvbmRpdGlvblR5cGUgfSBmcm9tIFwiLi9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IE0gZnJvbSBcIi4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgQXBwcyBmcm9tIFwiLi4vLi4vQmFzZS9BcHBzXCI7XG5pbXBvcnQgeyBTdG9yYWdlTWdyIH0gZnJvbSBcIi4uLy4uL0Jhc2UvTWFuYWdlci9TdG9yYWdlTWdyXCI7XG5pbXBvcnQgeyBJU2VydmVyQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0Jhc2UvTWFuYWdlci9OZXRNZ3JcIjtcbmltcG9ydCBSZXBvcnRNZ3IgZnJvbSBcIi4uLy4uL0Jhc2UvTWFuYWdlci9SZXBvcnRNZ3JcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCBEYWlseVRhc2tNZ3IgZnJvbSBcIi4uLy4uL0Jhc2UvTWFuYWdlci9EYWlseVRhc2tNZ3JcIjtcbmltcG9ydCB7IElDb25maWdJdGVtIH0gZnJvbSBcIi4uL0NvbW1vbi9Db21tb25JbnRlcmZhY2VzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1bnRpbWVNZ3Ige1xuXG4gICAgcHVibGljIHN0YXRpYyBpbnM6IFJ1bnRpbWVNZ3IgPSBTaW5nbGV0b25GYWN0b3J5LmdldEluc3RhbmNlKFJ1bnRpbWVNZ3IpO1xuXG4gICAgLyoq5L2T6YeP5LiN5aSnLOW6lOivpeS4gOS4qmluZm/lsLHog73mkJ7lrpos5LiN6ZyA6KaB6IOM5YyF5L2T57O7ICovXG4gICAgcHJpdmF0ZSBpbmZvOiBQbGF5ZXJJbmZvID0gbnVsbDtcblxuICAgIC8qKuaVsOaNruWtmOWCqOmYn+WIlyAqL1xuICAgIHByaXZhdGUgX2RhdGFTYXZlVGFza1Bvb2w6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBwcml2YXRlIF9leGVjU2F2ZVRhc2tpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKuaYr+WQpuW3sue7j+eZu+W9lSAqL1xuICAgIHB1YmxpYyBJc0xvZ2luOiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoq57Sv6K6h54iG54K45qyh5pWwICovXG4gICAgcHVibGljIEJvbWJDb3VudDogbnVtYmVyID0gMDtcbiAgICAvKirnu5PmnZ/lkI7mraXmlbDovazmjaLngrjlvLnnmoTnu5/orqEgKi9cbiAgICBwdWJsaWMgT3ZlclN0ZXBDb3VudDogbnVtYmVyID0gMDtcbiAgICAvKirnlKjmiLflvZPliY3pgInmi6nnmoTlhbPljaEgKi9cbiAgICBwdWJsaWMgU2VsZWN0TGV2ZWw6IG51bWJlciA9IDA7XG4gICAgLyoq5b2T5YmN5Yqg6L2955qE5YWz5Y2hICovXG4gICAgcHVibGljIEN1ckxldmVsOiBudW1iZXIgPSAwO1xuICAgIC8qKui3s+WcuuaZr+S7u+WKoSEgKi9cbiAgICBwdWJsaWMgU2NlbmVUYXNrOiBBcnJheTxudW1iZXI+ID0gbnVsbDtcbiAgICAvKirlvZPliY3pgInmi6nnmoTkvb/nlKjpgZPlhbcgKi9cbiAgICBwdWJsaWMgU2VsZWN0UHJvcDogUHJvcFR5cGUgPSBudWxsO1xuICAgIC8qKuS4iea2iOW9k+WJjeiDjOaZr0lEICovXG4gICAgcHVibGljIEN1ckJnSW5kZXg6IG51bWJlciA9IDA7XG4gICAgLyoq5b2T5YmNY29tYm/mlbAgKi9cbiAgICBwdWJsaWMgQ3VyQ29tYm86IG51bWJlciA9IDA7XG4gICAgLyoq5LiA5YWz5L2/55So55qE5pe26Ze0ICovXG4gICAgcHVibGljIE1hdGNoR2FtZVRpbWU6IG51bWJlciA9IDA7XG4gICAgLyoqICovXG4gICAgcHVibGljIFJld2FyZFRhc2s6IHsgdGV4dDogc3RyaW5nLCByZXdhcmQ6IEFycmF5PHsgW2lkOiBudW1iZXJdOiBudW1iZXIgfT4gfSA9IDxhbnk+e307XG4gICAgLy8gcHVibGljIFVzZVBvcnBSZWNvcmQ6IEFycmF5PHsgW3R5cGU6IG51bWJlcl06IG51bWJlciB9PiA9IG51bGw7XG5cbiAgICAvKirmr4/ml6Xku7vliqHov5vluqYgLTHkuLrlt7Lnu4/pooblj5YgKi9cbiAgICBwdWJsaWMgRGFpbHlUYXNrUHJvZ3Jlc3M6IHsgcHJvZ3Jlc3M6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0sIGV4cGlyZXM6IHsgZGFpbHk6IG51bWJlciwgbW9udGhseTogbnVtYmVyLCBjdXN0b206IG51bWJlciB9IH0gPSBudWxsO1xuXG4gICAgcHVibGljIFJvb21DdXJyZW50U2VsZWN0U3ViU2xvdENmZzogSUNvbmZpZ0l0ZW0gPSBudWxsO1xuICAgIC8qKuaMguacuuaXtumXtOi/m+W6piAqL1xuICAgIHByaXZhdGUgX2RhaWx5VGltZTogbnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgX3NlcnZlckNvbmZpZzogSVNlcnZlckNvbmZpZyA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9zY29yZTogbnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgX3RpbWVIYW5kbGU6IGFueSA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9nYW1lU3RhdGE6IEdhbWVTdGF0ZSA9IEdhbWVTdGF0ZS5wcmVSZWFkeTtcblxuICAgIHByaXZhdGUgX29uU2hvd1Rhc2s6IGFueSA9IG51bGw7XG5cbiAgICBwdWJsaWMgQ3VycmVudEd1ZXN0VXNlcmlkOiBudW1iZXIgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuU2NlbmVUYXNrID0gW107XG4gICAgICAgIHRoaXMuaW5mbyA9IG5ldyBQbGF5ZXJJbmZvKCk7XG4gICAgICAgIHRoaXMuX29uU2hvd1Rhc2sgPSBbXTtcbiAgICAgICAgdGhpcy5fb3BlblRpbWVyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXRSZW1vdERhdGEoZGF0YTogeyB1aWQ6IGFueSwgdXNlcmRhdGE6IGFueSwgYXdhcmRzOiBhbnkgfSkge1xuICAgICAgICBjb25zdCB1c2VyZGF0YSA9IGRhdGEgPyBkYXRhLnVzZXJkYXRhIDogbnVsbDtcbiAgICAgICAgdGhpcy5SZXdhcmRUYXNrID0gZGF0YSA/IGRhdGEuYXdhcmRzIDogbnVsbDtcbiAgICAgICAgdGhpcy5pbmZvLmluaXRSZW1vdERhdGEodXNlcmRhdGEpO1xuXG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmluZm8udXNlcklkID0gZGF0YS51aWRcbiAgICAgICAgICAgIHRoaXMuSXNMb2dpbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9jaGVja09uU2hvd1Rhc2soKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmVycm9yKCflvZPliY3nlKjmiLdJRDonLCB0aGlzLmluZm8udXNlcklkKTtcbiAgICAgICAgU3RvcmFnZU1nci5TdG9yYWdlLmluaXQodXNlcmRhdGEpO1xuICAgICAgICB0aGlzLnNldERhaWx5VGltZShTdG9yYWdlTWdyLlJpbmdTdG9yYWdlLmRheSgpLmdldFZhbHVlKE5hdGl2ZUtleS5EYWlseVRpbWUsIDApKTtcbiAgICAgICAgdGhpcy5nZXRTZXJ2ZXJDb25maWcoKTtcbiAgICAgICAgUmVwb3J0TWdyLmlucy5sb2dpbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgVXNlcklkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmZvLnVzZXJJZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdFRhc2tOYXRpdmVEYXRhKCkge1xuICAgICAgICBpZiAodGhpcy5EYWlseVRhc2tQcm9ncmVzcykge1xuICAgICAgICAgICAgRGFpbHlUYXNrTWdyLmlucy5zeW5jUHJvMk5hdGl2ZSh0aGlzLkRhaWx5VGFza1Byb2dyZXNzLnByb2dyZXNzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluW9k+WJjeeahOa4uOaIj+mBk+WFt+aVsOaNrlxuICAgICAqIEBwYXJhbSB0eXBlIFxuICAgICAqIEByZXR1cm5zIHsgY291bnQ6IG51bWJlciB9IHwgQXJyYXk8eyBjb3VudDogbnVtYmVyIH0+XG4gICAgICovXG4gICAgcHVibGljIGdldFByb3BEYXRhKHR5cGU6IFByb3BUeXBlID0gbnVsbCkge1xuXHRcdFxuXHRcdFx0dmFyIGRkZCA9IEpTT04ucGFyc2UoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZGFvanVcIikpO1xuXHRcdFxuXHRcdFxuXHRcdGlmKCBkZGQ9PSBudWxsIClcblx0XHR7XG5cdFx0XHRkZGQgPSB7fVxuXHRcdFx0Y2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZGFvanVcIixKU09OLnN0cmluZ2lmeShkZGQpKVxuXHRcdFx0XG5cdFx0fVxuXHRcdHRoaXMuaW5mby5wcm9wRGF0YSA9IGRkZDtcblx0XHRcbiAgICAgICAgbGV0IHJzdCA9IG51bGxcbiAgICAgICAgaWYgKHR5cGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcnN0ID0gdGhpcy5pbmZvLnByb3BEYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcnN0ID0gdGhpcy5pbmZvLnByb3BEYXRhW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByc3Q7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVzZXJJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5mby51c2VySWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGlzUHJvcFVuTG9ja2VkKHR5cGU6IFByb3BUeXBlKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSBNLnRhYmxlLlByb3BJbmZvLmdldEJ5UHJpbWFyeUtleSh0eXBlKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBpZiAoaW5mbyAmJiAodGhpcy5nZXRNYXRjaDNMZXZlbCgpID49IGluZm8udW5sb2NrTHYpKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEN1cnJlbmN5KHR5cGU6IEN1cnJlbmN5SWQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmZvW3RoaXMuZ2V0Q3VycmVuY3lLZXkodHlwZSldO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDdXJyZW5jeVN0cih0eXBlOiBDdXJyZW5jeUlkKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q3VycmVuY3kodHlwZSkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Rm9ybWF0ZUNvaW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIENvbW1vbi5ieXRlc1RvU2l6ZSh0aGlzLmdldEN1cnJlbmN5KEN1cnJlbmN5SWQuQ29pbikpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDdXJDaGFwdGVyKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZm8uY2hhcHRlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0U2VydmVyVGltZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmZvLnNlcnZlclRpbWU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldExhc3RUaW1lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZm8uZ2V0TGFzdFRpbWUoKTtcbiAgICB9XG5cbiAgICAvKirkuInmtojmuLjmiI/nmoTnirbmgIHmnLogKi9cbiAgICBwdWJsaWMgc2V0IEdhbWVTdGF0ZShzdGF0ZTogR2FtZVN0YXRlKSB7XG4gICAgICAgIHRoaXMuX2dhbWVTdGF0YSA9IHN0YXRlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgR2FtZVN0YXRlKCk6IEdhbWVTdGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nYW1lU3RhdGFcbiAgICB9XG5cbiAgICAvKirkuInmtojnrYnnuqco5b2T5YmN5pyA5aSn55qEKSAqL1xuICAgIHB1YmxpYyBnZXRNYXRjaDNMZXZlbCgpOiBudW1iZXIge1xuXHRcdFx0dGhpcy5pbmZvLm1hdGhjM0xldmVsID0gTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImdhbWVsZXZlbFwiKSlcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5mby5tYXRoYzNMZXZlbCB8fCAxO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbWF4TWF0Y2gzTGV2ZWwoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIEFwcHMuaXNEZWJ1ZyA/IDk5OTkgOiA1MDA7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjdXJyZW50U2NvcmUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njb3JlIHx8IDA7XG4gICAgfVxuXG4gICAgLyoq5omA5pyJ55qE5pif5pif5pWwICovXG4gICAgcHVibGljIGdldFN0YXJDb3VudCgpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5pbmZvLmx2TWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGNvdW50ICs9IHZhbHVlLnN0YXI7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdhbWVTdGFyKCkge1xuICAgICAgICB0aGlzLl9wcmVHYW1lU3RhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLl9zY29yZSA9IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRTY29yZShzY29yZSkge1xuICAgICAgICB0aGlzLl9zY29yZSA9IHNjb3JlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRTZXJ2ZXJUaW1lKHRpbWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmluZm8uc2VydmVyVGltZSA9IHRpbWU7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZFNjb3JlKHNjb3JlOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICB0aGlzLnNldFNjb3JlKHRoaXMuY3VycmVudFNjb3JlICsgKHNjb3JlIHx8IDApKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFNjb3JlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FkZENvdW50QnlUeXBlKGtleSwgdHlwZSwgY291bnQgPSAxKSB7XG4gICAgICAgIGNvbnN0IGRkID0gU3RvcmFnZU1nci5SaW5nU3RvcmFnZS5kYXkoKS5nZXRWYWx1ZShrZXksIHt9KTtcbiAgICAgICAgZGRbdHlwZV0gPSBkZFt0eXBlXSA/IChkZFt0eXBlXSArIGNvdW50KSA6IGNvdW50O1xuICAgICAgICBTdG9yYWdlTWdyLlJpbmdTdG9yYWdlLmRheSgpLnNldFZhbHVlKGtleSwgZGQpO1xuICAgICAgICBjb25zdCBtZCA9IFN0b3JhZ2VNZ3IuUmluZ1N0b3JhZ2UubW9udGgoKS5nZXRWYWx1ZShrZXkgKyAxLCB7fSk7XG4gICAgICAgIG1kW3R5cGVdID0gbWRbdHlwZV0gPyAobWRbdHlwZV0gKyBjb3VudCkgOiBjb3VudDtcbiAgICAgICAgU3RvcmFnZU1nci5SaW5nU3RvcmFnZS5tb250aCgpLnNldFZhbHVlKGtleSArIDEsIG1kKTtcbiAgICAgICAgY29uc3QgYWQgPSBTdG9yYWdlTWdyLlN0b3JhZ2UuZ2V0T2JqZWN0KGtleSArIDIsIHt9KTtcbiAgICAgICAgYWRbdHlwZV0gPSBhZFt0eXBlXSA/IChhZFt0eXBlXSArIGNvdW50KSA6IGNvdW50O1xuICAgICAgICBTdG9yYWdlTWdyLlN0b3JhZ2Uuc2V0T2JqZWN0KGtleSArIDIsIGFkKTtcbiAgICAgICAgRGFpbHlUYXNrTWdyLmlucy5zeW5jUHJvMlNlcihrZXksIHR5cGUsIGRkW3R5cGVdLCBtZFt0eXBlXSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYWRkQ291bnQoa2V5KSB7XG4gICAgICAgIGNvbnN0IGRjID0gU3RvcmFnZU1nci5SaW5nU3RvcmFnZS5kYXkoKS5nZXRWYWx1ZShrZXksIDApO1xuICAgICAgICBTdG9yYWdlTWdyLlJpbmdTdG9yYWdlLmRheSgpLnNldFZhbHVlKGtleSwgZGMgKyAxKTtcbiAgICAgICAgY29uc3QgbWMgPSBTdG9yYWdlTWdyLlJpbmdTdG9yYWdlLm1vbnRoKCkuZ2V0VmFsdWUoa2V5ICsgMSwgMCk7XG4gICAgICAgIFN0b3JhZ2VNZ3IuUmluZ1N0b3JhZ2UubW9udGgoKS5zZXRWYWx1ZShrZXkgKyAxLCBtYyArIDEpO1xuICAgICAgICBjb25zdCBhYyA9IFN0b3JhZ2VNZ3IuU3RvcmFnZS5nZXRJbnQoa2V5ICsgMiwgMCk7XG4gICAgICAgIFN0b3JhZ2VNZ3IuU3RvcmFnZS5zZXRJbnQoa2V5ICsgMiwgYWMgKyAxKTtcbiAgICAgICAgRGFpbHlUYXNrTWdyLmlucy5zeW5jUHJvMlNlcihrZXksIG51bGwsIGRjICsgMSwgbWMgKyAxKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBhZGRDb2xsZWN0Q291bnQodHlwZSwgY291bnQgPSAxKSB7XG4gICAgICAgIHRoaXMuX2FkZENvdW50QnlUeXBlKE5hdGl2ZUtleS5EYWlseUNvbGxlY3QsIHR5cGUsIGNvdW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkTWVyZ2VDb3VudCh0eXBlKSB7XG4gICAgICAgIHRoaXMuX2FkZENvdW50QnlUeXBlKE5hdGl2ZUtleS5EYWlseU1lcmdlLCB0eXBlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkR2FtZUNvdW50KCkge1xuICAgICAgICB0aGlzLl9hZGRDb3VudChOYXRpdmVLZXkuRGFpbHlHYW1lQ291bnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRVc2VQcm9wQ291bnQodHlwZSkge1xuICAgICAgICB0aGlzLl9hZGRDb3VudChOYXRpdmVLZXkuRGFpbHlVc2VQcm9wQ291bnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWinumHj+abtOaWsOS4gOS4qumBk+WFt+eahOaVsOmHj1xuICAgICAqIEBwYXJhbSB0eXBlIFxuICAgICAqIEBwYXJhbSBudW0gXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZVByb3BDb3VudCh0eXBlOiBQcm9wVHlwZSwgbnVtOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgcCA9IHRoaXMuaW5mby5wcm9wRGF0YVt0eXBlXSB8fCB7IGNvdW50OiAwIH07XG4gICAgICAgIHAuY291bnQgKz0gbnVtO1xuICAgICAgICBwLmNvdW50ID0gcC5jb3VudCA8IDAgPyAwIDogcC5jb3VudFxuICAgICAgICB0aGlzLmluZm8ucHJvcERhdGFbdHlwZV0gPSBwO1xuXHRcdGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImRhb2p1XCIsSlNPTi5zdHJpbmdpZnkodGhpcy5pbmZvLnByb3BEYXRhKSlcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuVUkuUHJvcENvdW50LCB0eXBlKTtcbiAgICAgICAgdGhpcy5fcHVzaFNhdmVUYXNrKCdwcm9wRGF0YScpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRNYXRjaDNMZXZlbChsdjogbnVtYmVyLCBxajogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChsdiA+IHRoaXMuaW5mby5tYXRoYzNMZXZlbCB8fCBxaikge1xuICAgICAgICAgICAgLy/kuIrmiqXmjpLooYzkv6Hmga9cbiAgICAgICAgICAgIGNvbnN0IGx2RGF0YSA9IHRoaXMuZ2V0TmF0aXZlTHZEYXRhKHRoaXMuaW5mby5tYXRoYzNMZXZlbCk7XG4gICAgICAgICAgICBNLm5ldC5wdXRSYW5rRGF0YSh7IG5hbWU6ICdCYXJyaWVyUmFuaycsIHZhbHVlOiBDb21tb24uc3RyaW5naWZ5UmFua0RhdGEodGhpcy5pbmZvLm1hdGhjM0xldmVsLCBsdkRhdGEuc2NvcmUpIH0pO1xuICAgICAgICAgICAgdGhpcy5pbmZvLm1hdGhjM0xldmVsID0gbHY7XG5cdFx0XHRjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJnYW1lbGV2ZWxcIixsdilcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5VSS5VcGRhdGVMdiwgbHYpO1xuICAgICAgICAgICAgdGhpcy5fcHVzaFNhdmVUYXNrKCdtYXRoYzNMZXZlbCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5TZWxlY3RMZXZlbCA9IGx2O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDlop7ph4/orr7nva7kuIDkuKrotKfluIHnmoTmlbDph49cbiAgICAqIEBwYXJhbSB0eXBlIFxuICAgICogQHBhcmFtIG51bSBcbiAgICAqL1xuICAgIHB1YmxpYyBhZGRDdXJyZW5jeSh0eXBlOiBDdXJyZW5jeUlkLCBudW06IG51bWJlcikge1xuICAgICAgICBpZiAodHlwZSA9PSBDdXJyZW5jeUlkLlRhc2tLZXkpIHtcbiAgICAgICAgICAgIERhaWx5VGFza01nci5pbnMuYWRkRGFpbHlUYXNrS2V5KG51bSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmdldEN1cnJlbmN5S2V5KHR5cGUpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5pbmZvW2tleV07XG4gICAgICAgICAgICBpZiAodHlwZSA9PSBDdXJyZW5jeUlkLlBvd2VyICYmIG51bSA+IDAgJiYgY3VycmVudFZhbHVlID49IE1heFBvd2VyQ291bnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmluZm9ba2V5XSArPSBudW07XG4gICAgICAgICAgICBpZiAodGhpcy5pbmZvW2tleV0gPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmZvW2tleV0gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuVUkuVXBkYXRlQ3VycmVuY3ksIHR5cGUsIHRoaXMuZ2V0Q3VycmVuY3kodHlwZSkpO1xuICAgICAgICAgICAgdGhpcy5fcHVzaFNhdmVUYXNrKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaXNQb3dlckVub3VnaCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5mby5wb3dlciA+PSBQb3dlckNvbmZpZy5MdkNvbnN1bXB0aW9uO1xuICAgIH1cblxuICAgIC8qKuiOt+WPluaMh+WumuWFs+WNoeeahOmAmuWFs+aVsOaNriAqL1xuICAgIHB1YmxpYyBnZXROYXRpdmVMdkRhdGEobHY6IG51bWJlciA9IG51bGwpOiB7IHNjb3JlOiBudW1iZXIsIHN0YXI6IG51bWJlciB9IHtcbiAgICAgICAgbHYgPSBsdiB8fCB0aGlzLkN1ckxldmVsO1xuICAgICAgICBjb25zdCBrZXkgPSBgJHtOYXRpdmVLZXkuTHZEYXRhS2V5fV8ke2x2fWA7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmluZm8ubHZNYXAuZ2V0KGtleSk7XG4gICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICByZXN1bHQgPSA8YW55PlN0b3JhZ2VNZ3IuU3RvcmFnZS5nZXRPYmplY3Qoa2V5LCB7IHNjb3JlOiAwLCBzdGFyOiAwIH0pO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuc2NvcmUgIT0gMCAmJiByZXN1bHQuc3RhciAhPSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmZvLmx2TWFwLnNldChrZXksIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Qm94R2lmdERhdGFCeUx2KGx2OiBudW1iZXIpOiB7IHJlY2VpdmVkOiBib29sZWFuIH0ge1xuICAgICAgICBjb25zdCBkYXRhID0gU3RvcmFnZU1nci5TdG9yYWdlLmdldE9iamVjdChOYXRpdmVLZXkuQm94R2lmdHMsIHt9KTtcbiAgICAgICAgcmV0dXJuIGRhdGFbbHZdO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRCb3hHaWZ0RGF0YShsdjogbnVtYmVyLCByZWNlaXZlZDogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBkYXRhID0gU3RvcmFnZU1nci5TdG9yYWdlLmdldE9iamVjdChOYXRpdmVLZXkuQm94R2lmdHMsIHt9KTtcbiAgICAgICAgaWYgKGRhdGFbbHZdICYmIGRhdGFbbHZdWydyZWNlaXZlZCddKSByZXR1cm47XG4gICAgICAgIGRhdGFbbHZdID0geyByZWNlaXZlZCB9O1xuICAgICAgICBTdG9yYWdlTWdyLlN0b3JhZ2Uuc2V0T2JqZWN0KE5hdGl2ZUtleS5Cb3hHaWZ0cywgZGF0YSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5L+d5a2Y5YWz5Y2h5pWw5o2uXG4gICAgICogQHBhcmFtIHN0YXIg5pif5pif5pWwXG4gICAgICogQHJldHVybiBCb29sZWFuIOaYr+WQpuaYr+aWsOmAmuWFs1xuICAgICAqL1xuICAgIHB1YmxpYyBzYXZhTHZEYXRhKHN0YXI6IG51bWJlciwgc2NvcmU/OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgbHZEYXRhID0gdGhpcy5nZXROYXRpdmVMdkRhdGEodGhpcy5DdXJMZXZlbCk7XG4gICAgICAgIGxldCBpc05ldyA9IGZhbHNlO1xuICAgICAgICBpZiAobHZEYXRhLnNjb3JlID09IDAgJiYgbHZEYXRhLnN0YXIgPT0gMCkge1xuICAgICAgICAgICAgaXNOZXcgPSB0cnVlO1xuICAgICAgICAgICAgTS5ydW50aW1lLmFkZENvbGxlY3RDb3VudCgnc3RhcicsIHN0YXIpO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXIgLSBsdkRhdGEuc3RhciA+IDApIHtcbiAgICAgICAgICAgIE0ucnVudGltZS5hZGRDb2xsZWN0Q291bnQoJ3N0YXInLCBzdGFyIC0gbHZEYXRhLnN0YXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NvcmUgPSBzY29yZSB8fCB0aGlzLl9zY29yZTtcbiAgICAgICAgaWYgKHNjb3JlID4gbHZEYXRhLnNjb3JlKSB7XG4gICAgICAgICAgICBsdkRhdGEuc2NvcmUgPSBzY29yZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhciA+IGx2RGF0YS5zdGFyKSB7XG4gICAgICAgICAgICBsdkRhdGEuc3RhciA9IHN0YXI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qga2V5ID0gYCR7TmF0aXZlS2V5Lkx2RGF0YUtleX1fJHt0aGlzLkN1ckxldmVsfWA7XG4gICAgICAgIHRoaXMuaW5mby5sdk1hcC5zZXQoa2V5LCBsdkRhdGEpO1xuICAgICAgICBTdG9yYWdlTWdyLlN0b3JhZ2Uuc2V0T2JqZWN0KGtleSwgbHZEYXRhLCB0cnVlKTtcbiAgICAgICAgaWYgKC8qaXNOZXcgJiYgKi90aGlzLkN1ckxldmVsICUgMTAgPT0gMCkge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IE0udGFibGUuQm94UmV3YXJkSW5mby5nZXRCeVByaW1hcnlLZXkodGhpcy5DdXJMZXZlbCk7XG4gICAgICAgICAgICBpZiAoaW5mbykge1xuICAgICAgICAgICAgICAgIC8v5Yik5pat5pyJ5aWW5YqxLi4u5o+S5YWl5b6F6aKG5Y+WXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRCb3hHaWZ0RGF0YSh0aGlzLkN1ckxldmVsLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzTmV3O1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBfcHJlR2FtZVN0YXRlID0gbnVsbDtcbiAgICBwcml2YXRlIF96eVRpbWVUYXNrUG9vbCA9IDA7XG5cbiAgICBwdWJsaWMgcHVzaFpoYW5neXVUaW1lUGF1c2UoKSB7XG4gICAgICAgIHRoaXMuX3p5VGltZVRhc2tQb29sKys7XG4gICAgICAgIHRoaXMucGF1c2VHYW1lKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZVpoYW5neXVUaW1lKCkge1xuICAgICAgICB0aGlzLl96eVRpbWVUYXNrUG9vbC0tO1xuICAgICAgICBpZiAodGhpcy5fenlUaW1lVGFza1Bvb2wgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5yZXN1bWVHYW1lKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcGF1c2VHYW1lKCkge1xuICAgICAgICBpZiAodGhpcy5fZ2FtZVN0YXRhID49IEdhbWVTdGF0ZS5XaW4pIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZUdhbWVTdGF0ZSA9IHRoaXMuX2dhbWVTdGF0YTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9nYW1lU3RhdGEgPSBHYW1lU3RhdGUuUGF1c2U7XG4gICAgfVxuXG4gICAgcHVibGljIHJlc3VtZUdhbWUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9nYW1lU3RhdGEgPT0gR2FtZVN0YXRlLlBhdXNlKSB7XG4gICAgICAgICAgICB0aGlzLl9nYW1lU3RhdGEgPSB0aGlzLl9wcmVHYW1lU3RhdGUgPT0gbnVsbCA/IEdhbWVTdGF0ZS5Ob3JtYWwgOiB0aGlzLl9wcmVHYW1lU3RhdGU7XG4gICAgICAgICAgICBFdmVudE1nci5pbnMuc2VuZChFdmVudC5HYW1lQ01ELkdhbWVSZXN1bWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldEN1cnJlbmN5S2V5KGlkOiBDdXJyZW5jeUlkKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFsnY29pbicsICdkaWFtb25kJywgJ3Bvd2VyJ11baWRdO1xuICAgIH1cblxuICAgIC8qKuW8gOWQr+WumuaXtuWZqCAqL1xuICAgIHByaXZhdGUgX29wZW5UaW1lcigpIHtcbiAgICAgICAgLy/ov5nph4zlnKjlkI7lj7DkuZ/mmK/kvJrov5DooYznmoQuLi7nibnliKvms6jmhI8hXG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB0aGlzLl90aW1lSGFuZGxlID0gc2V0SW50ZXJ2YWwodGhpcy51cGRhdGUuYmluZCh0aGlzKSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirmj5LlhaXog4zljIXmlbDmja4gKi9cbiAgICBwcml2YXRlIF9wdXNoU2F2ZVRhc2soa2V5KSB7XG4gICAgICAgIHRoaXMuX2RhdGFTYXZlVGFza1Bvb2wucHVzaChrZXkpO1xuICAgIH1cblxuICAgIC8qKuiOt+WPluW9k+WJjeacjeWKoeWZqOmFjee9riAqL1xuICAgIHB1YmxpYyBhc3luYyBnZXRTZXJ2ZXJDb25maWcoKTogUHJvbWlzZTxJU2VydmVyQ29uZmlnPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9zZXJ2ZXJDb25maWcpIHtcbiAgICAgICAgICAgICAgICBNLm5ldC5nZXRTZXJ2ZXJEYXRhKCkudGhlbihzZXJ2ZXJDb25maWcgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2ZXJDb25maWcgPSBzZXJ2ZXJDb25maWc7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoc2VydmVyQ29uZmlnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLl9zZXJ2ZXJDb25maWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKuaJp+ihjOS/neWtmOaVsOaNruS7u+WKoSEgKi9cbiAgICBwcml2YXRlIGFzeW5jIF9leGVjU2F2ZVRhc2soKSB7XG4gICAgICAgIGlmICghdGhpcy5fZXhlY1NhdmVUYXNraW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9leGVjU2F2ZVRhc2tpbmcgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgdGFzayA9IHRoaXMuX2RhdGFTYXZlVGFza1Bvb2wuc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5pbmZvLnNhdmVEYXRhKHRhc2spO1xuICAgICAgICAgICAgICAgIHRoaXMuX2V4ZWNTYXZlVGFza2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2V4ZWNTYXZlVGFzaygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9leGVjU2F2ZVRhc2tpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZVBvd2VyVGltZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0Q3VycmVuY3koQ3VycmVuY3lJZC5Qb3dlcikgPCBNYXhQb3dlckNvdW50KSB7XG4gICAgICAgICAgICB0aGlzLmluZm8udGltZUNvdW50ZXIrK1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5mby50aW1lQ291bnRlciA+PSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUikge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5mby50aW1lQ291bnRlciA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmluZm8udGltZUNvdW50ZXIgJSAzMCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHVzaFNhdmVUYXNrKCd0aW1lQ291bnRlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuaW5mby50aW1lQ291bnRlciAlIFBvd2VyQ29uZmlnLk5vcm1hbFRpbWUgPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ3VycmVuY3koQ3VycmVuY3lJZC5Qb3dlciwgUG93ZXJDb25maWcuTm9ybWFsQ291bnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuVUkuVXBkYXRlUmVtYWluQWRkUG93ZXJUaW1lLCB0aGlzLmluZm8udGltZUNvdW50ZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlRGFpbHlUaW1lKCkge1xuICAgICAgICB0aGlzLnNldERhaWx5VGltZSh0aGlzLl9kYWlseVRpbWUgKyAxKTtcbiAgICAgICAvLyBNLmV2ZW50LnNlbmQoRXZlbnQuRGFpbHlUYXNrLlVwZGF0ZVByb2dyZXNzLCBDb25kaXRpb25UeXBlLnRpbWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgRGFpbHlUaW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGFpbHlUaW1lO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXREYWlseVRpbWUodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9kYWlseVRpbWUgPSB2YWx1ZTtcbiAgICAgICAgU3RvcmFnZU1nci5SaW5nU3RvcmFnZS5kYXkoKS5zZXRWYWx1ZShOYXRpdmVLZXkuRGFpbHlUaW1lLCB0aGlzLl9kYWlseVRpbWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhU2F2ZVRhc2tQb29sLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2V4ZWNTYXZlVGFzaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaW5mby5zZXJ2ZXJUaW1lICE9IDApIHtcbiAgICAgICAgICAgIHRoaXMuaW5mby5zZXJ2ZXJUaW1lKys7XG4gICAgICAgICAgICBpZiAodGhpcy5pbmZvLnNlcnZlclRpbWUgJSAzMCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmZvLnNhdmVMYXN0VGltZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICB0aGlzLl91cGRhdGVQb3dlclRpbWUoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlRGFpbHlUaW1lKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHB1c2hPblNob3dUYXNrKHRhc2spIHtcbiAgICAgICAgaWYgKCF0aGlzLl9vblNob3dUYXNrKSB7XG4gICAgICAgICAgICB0aGlzLl9vblNob3dUYXNrID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb25TaG93VGFzay5wdXNoKHRhc2spO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NoZWNrT25TaG93VGFzaygpIHtcbiAgICAgICAgaWYgKHRoaXMuX29uU2hvd1Rhc2sgJiYgdGhpcy5fb25TaG93VGFzay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCB1c2VyaWQgPSB0aGlzLl9vblNob3dUYXNrLnNoaWZ0KCk7XG4gICAgICAgICAgICBNLm5ldC5hZGRGcmllbmQodXNlcmlkKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19