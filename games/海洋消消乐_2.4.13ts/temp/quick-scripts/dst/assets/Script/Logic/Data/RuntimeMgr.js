
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
            return 500;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcRGF0YVxcUnVudGltZU1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUE2QztBQUM3QyxzRUFBcUU7QUFDckUsa0RBQWtEO0FBQ2xELHdEQUFtRDtBQUNuRCx1Q0FBc0M7QUFDdEMsNkNBQXlIO0FBQ3pILDBDQUFxQztBQUNyQyw0REFBMkQ7QUFFM0QsMERBQXFEO0FBQ3JELDJDQUFzQztBQUN0QyxnRUFBMkQ7QUFHM0Q7SUFzREk7UUFsREEsK0JBQStCO1FBQ3ZCLFNBQUksR0FBZSxJQUFJLENBQUM7UUFFaEMsWUFBWTtRQUNKLHNCQUFpQixHQUFrQixFQUFFLENBQUM7UUFDdEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBRTFDLFlBQVk7UUFDTCxZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ2hDLFlBQVk7UUFDTCxjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQzdCLGtCQUFrQjtRQUNYLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQ2pDLGVBQWU7UUFDUixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUMvQixhQUFhO1FBQ04sYUFBUSxHQUFXLENBQUMsQ0FBQztRQUM1QixZQUFZO1FBQ0wsY0FBUyxHQUFrQixJQUFJLENBQUM7UUFDdkMsZUFBZTtRQUNSLGVBQVUsR0FBYSxJQUFJLENBQUM7UUFDbkMsY0FBYztRQUNQLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDOUIsY0FBYztRQUNQLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFDNUIsYUFBYTtRQUNOLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQ2pDLE1BQU07UUFDQyxlQUFVLEdBQW1FLEVBQUUsQ0FBQztRQUN2RixrRUFBa0U7UUFFbEUsb0JBQW9CO1FBQ2Isc0JBQWlCLEdBQXlHLElBQUksQ0FBQztRQUUvSCxnQ0FBMkIsR0FBZ0IsSUFBSSxDQUFDO1FBQ3ZELFlB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QUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sbUNBQWMsR0FBckIsVUFBc0IsSUFBSTtRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztTQUN6QjtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTyxxQ0FBZ0IsR0FBeEI7UUFDSSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2pELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEMsV0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBNWVhLGNBQUcsR0FBZSxtQ0FBZ0IsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUE4ZTdFLGlCQUFDO0NBaGZELEFBZ2ZDLElBQUE7a0JBaGZvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYXllckluZm8gZnJvbSBcIi4vUGxheWVyL1BsYXllckluZm9cIjtcbmltcG9ydCB7IFNpbmdsZXRvbkZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vQmFzZS9VdGlscy9TaW5nbGV0b25GYWN0b3J5XCI7XG5pbXBvcnQgeyBDdXJyZW5jeUlkIH0gZnJvbSBcIi4uLy4uL0Jhc2UvQmFzZUNvbnN0XCI7XG5pbXBvcnQgRXZlbnRNZ3IgZnJvbSBcIi4uLy4uL0Jhc2UvTWFuYWdlci9FdmVudE1nclwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi9Db25zdC9FdmVudFwiO1xuaW1wb3J0IHsgUHJvcFR5cGUsIEdhbWVTdGF0ZSwgTmF0aXZlS2V5LCBQb3dlckNvbmZpZywgTWF4UG93ZXJDb3VudCwgV2FyaW5nVGlwcywgQ29uZGl0aW9uVHlwZSB9IGZyb20gXCIuL0NvbnN0L0NvbnN0YW50XCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IFN0b3JhZ2VNZ3IgfSBmcm9tIFwiLi4vLi4vQmFzZS9NYW5hZ2VyL1N0b3JhZ2VNZ3JcIjtcbmltcG9ydCB7IElTZXJ2ZXJDb25maWcgfSBmcm9tIFwiLi4vLi4vQmFzZS9NYW5hZ2VyL05ldE1nclwiO1xuaW1wb3J0IFJlcG9ydE1nciBmcm9tIFwiLi4vLi4vQmFzZS9NYW5hZ2VyL1JlcG9ydE1nclwiO1xuaW1wb3J0IENvbW1vbiBmcm9tIFwiLi4vQ29tbW9uL0NvbW1vblwiO1xuaW1wb3J0IERhaWx5VGFza01nciBmcm9tIFwiLi4vLi4vQmFzZS9NYW5hZ2VyL0RhaWx5VGFza01nclwiO1xuaW1wb3J0IHsgSUNvbmZpZ0l0ZW0gfSBmcm9tIFwiLi4vQ29tbW9uL0NvbW1vbkludGVyZmFjZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUnVudGltZU1nciB7XG5cbiAgICBwdWJsaWMgc3RhdGljIGluczogUnVudGltZU1nciA9IFNpbmdsZXRvbkZhY3RvcnkuZ2V0SW5zdGFuY2UoUnVudGltZU1ncik7XG5cbiAgICAvKirkvZPph4/kuI3lpKcs5bqU6K+l5LiA5LiqaW5mb+WwseiDveaQnuWumizkuI3pnIDopoHog4zljIXkvZPns7sgKi9cbiAgICBwcml2YXRlIGluZm86IFBsYXllckluZm8gPSBudWxsO1xuXG4gICAgLyoq5pWw5o2u5a2Y5YKo6Zif5YiXICovXG4gICAgcHJpdmF0ZSBfZGF0YVNhdmVUYXNrUG9vbDogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIHByaXZhdGUgX2V4ZWNTYXZlVGFza2luZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoq5piv5ZCm5bey57uP55m75b2VICovXG4gICAgcHVibGljIElzTG9naW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKirntK/orqHniIbngrjmrKHmlbAgKi9cbiAgICBwdWJsaWMgQm9tYkNvdW50OiBudW1iZXIgPSAwO1xuICAgIC8qKue7k+adn+WQjuatpeaVsOi9rOaNoueCuOW8ueeahOe7n+iuoSAqL1xuICAgIHB1YmxpYyBPdmVyU3RlcENvdW50OiBudW1iZXIgPSAwO1xuICAgIC8qKueUqOaIt+W9k+WJjemAieaLqeeahOWFs+WNoSAqL1xuICAgIHB1YmxpYyBTZWxlY3RMZXZlbDogbnVtYmVyID0gMDtcbiAgICAvKirlvZPliY3liqDovb3nmoTlhbPljaEgKi9cbiAgICBwdWJsaWMgQ3VyTGV2ZWw6IG51bWJlciA9IDA7XG4gICAgLyoq6Lez5Zy65pmv5Lu75YqhISAqL1xuICAgIHB1YmxpYyBTY2VuZVRhc2s6IEFycmF5PG51bWJlcj4gPSBudWxsO1xuICAgIC8qKuW9k+WJjemAieaLqeeahOS9v+eUqOmBk+WFtyAqL1xuICAgIHB1YmxpYyBTZWxlY3RQcm9wOiBQcm9wVHlwZSA9IG51bGw7XG4gICAgLyoq5LiJ5raI5b2T5YmN6IOM5pmvSUQgKi9cbiAgICBwdWJsaWMgQ3VyQmdJbmRleDogbnVtYmVyID0gMDtcbiAgICAvKirlvZPliY1jb21ib+aVsCAqL1xuICAgIHB1YmxpYyBDdXJDb21ibzogbnVtYmVyID0gMDtcbiAgICAvKirkuIDlhbPkvb/nlKjnmoTml7bpl7QgKi9cbiAgICBwdWJsaWMgTWF0Y2hHYW1lVGltZTogbnVtYmVyID0gMDtcbiAgICAvKiogKi9cbiAgICBwdWJsaWMgUmV3YXJkVGFzazogeyB0ZXh0OiBzdHJpbmcsIHJld2FyZDogQXJyYXk8eyBbaWQ6IG51bWJlcl06IG51bWJlciB9PiB9ID0gPGFueT57fTtcbiAgICAvLyBwdWJsaWMgVXNlUG9ycFJlY29yZDogQXJyYXk8eyBbdHlwZTogbnVtYmVyXTogbnVtYmVyIH0+ID0gbnVsbDtcblxuICAgIC8qKuavj+aXpeS7u+WKoei/m+W6piAtMeS4uuW3sue7j+mihuWPliAqL1xuICAgIHB1YmxpYyBEYWlseVRhc2tQcm9ncmVzczogeyBwcm9ncmVzczogeyBba2V5OiBudW1iZXJdOiBudW1iZXIgfSwgZXhwaXJlczogeyBkYWlseTogbnVtYmVyLCBtb250aGx5OiBudW1iZXIsIGN1c3RvbTogbnVtYmVyIH0gfSA9IG51bGw7XG5cbiAgICBwdWJsaWMgUm9vbUN1cnJlbnRTZWxlY3RTdWJTbG90Q2ZnOiBJQ29uZmlnSXRlbSA9IG51bGw7XG4gICAgLyoq5oyC5py65pe26Ze06L+b5bqmICovXG4gICAgcHJpdmF0ZSBfZGFpbHlUaW1lOiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBfc2VydmVyQ29uZmlnOiBJU2VydmVyQ29uZmlnID0gbnVsbDtcblxuICAgIHByaXZhdGUgX3Njb3JlOiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBfdGltZUhhbmRsZTogYW55ID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2dhbWVTdGF0YTogR2FtZVN0YXRlID0gR2FtZVN0YXRlLnByZVJlYWR5O1xuXG4gICAgcHJpdmF0ZSBfb25TaG93VGFzazogYW55ID0gbnVsbDtcblxuICAgIHB1YmxpYyBDdXJyZW50R3Vlc3RVc2VyaWQ6IG51bWJlciA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5TY2VuZVRhc2sgPSBbXTtcbiAgICAgICAgdGhpcy5pbmZvID0gbmV3IFBsYXllckluZm8oKTtcbiAgICAgICAgdGhpcy5fb25TaG93VGFzayA9IFtdO1xuICAgICAgICB0aGlzLl9vcGVuVGltZXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdFJlbW90RGF0YShkYXRhOiB7IHVpZDogYW55LCB1c2VyZGF0YTogYW55LCBhd2FyZHM6IGFueSB9KSB7XG4gICAgICAgIGNvbnN0IHVzZXJkYXRhID0gZGF0YSA/IGRhdGEudXNlcmRhdGEgOiBudWxsO1xuICAgICAgICB0aGlzLlJld2FyZFRhc2sgPSBkYXRhID8gZGF0YS5hd2FyZHMgOiBudWxsO1xuICAgICAgICB0aGlzLmluZm8uaW5pdFJlbW90RGF0YSh1c2VyZGF0YSk7XG5cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuaW5mby51c2VySWQgPSBkYXRhLnVpZFxuICAgICAgICAgICAgdGhpcy5Jc0xvZ2luID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrT25TaG93VGFzaygpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ+W9k+WJjeeUqOaIt0lEOicsIHRoaXMuaW5mby51c2VySWQpO1xuICAgICAgICBTdG9yYWdlTWdyLlN0b3JhZ2UuaW5pdCh1c2VyZGF0YSk7XG4gICAgICAgIHRoaXMuc2V0RGFpbHlUaW1lKFN0b3JhZ2VNZ3IuUmluZ1N0b3JhZ2UuZGF5KCkuZ2V0VmFsdWUoTmF0aXZlS2V5LkRhaWx5VGltZSwgMCkpO1xuICAgICAgICB0aGlzLmdldFNlcnZlckNvbmZpZygpO1xuICAgICAgICBSZXBvcnRNZ3IuaW5zLmxvZ2luKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBVc2VySWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZm8udXNlcklkO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0VGFza05hdGl2ZURhdGEoKSB7XG4gICAgICAgIGlmICh0aGlzLkRhaWx5VGFza1Byb2dyZXNzKSB7XG4gICAgICAgICAgICBEYWlseVRhc2tNZ3IuaW5zLnN5bmNQcm8yTmF0aXZlKHRoaXMuRGFpbHlUYXNrUHJvZ3Jlc3MucHJvZ3Jlc3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5b2T5YmN55qE5ri45oiP6YGT5YW35pWw5o2uXG4gICAgICogQHBhcmFtIHR5cGUgXG4gICAgICogQHJldHVybnMgeyBjb3VudDogbnVtYmVyIH0gfCBBcnJheTx7IGNvdW50OiBudW1iZXIgfT5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UHJvcERhdGEodHlwZTogUHJvcFR5cGUgPSBudWxsKSB7XG5cdFx0XG5cdFx0XHR2YXIgZGRkID0gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJkYW9qdVwiKSk7XG5cdFx0XG5cdFx0XG5cdFx0aWYoIGRkZD09IG51bGwgKVxuXHRcdHtcblx0XHRcdGRkZCA9IHt9XG5cdFx0XHRjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJkYW9qdVwiLEpTT04uc3RyaW5naWZ5KGRkZCkpXG5cdFx0XHRcblx0XHR9XG5cdFx0dGhpcy5pbmZvLnByb3BEYXRhID0gZGRkO1xuXHRcdFxuICAgICAgICBsZXQgcnN0ID0gbnVsbFxuICAgICAgICBpZiAodHlwZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByc3QgPSB0aGlzLmluZm8ucHJvcERhdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByc3QgPSB0aGlzLmluZm8ucHJvcERhdGFbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJzdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VXNlcklkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmZvLnVzZXJJZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNQcm9wVW5Mb2NrZWQodHlwZTogUHJvcFR5cGUpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IE0udGFibGUuUHJvcEluZm8uZ2V0QnlQcmltYXJ5S2V5KHR5cGUpO1xuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIGlmIChpbmZvICYmICh0aGlzLmdldE1hdGNoM0xldmVsKCkgPj0gaW5mby51bmxvY2tMdikpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Q3VycmVuY3kodHlwZTogQ3VycmVuY3lJZCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZm9bdGhpcy5nZXRDdXJyZW5jeUtleSh0eXBlKV07XG4gICAgfVxuXG4gICAgcHVibGljIGdldEN1cnJlbmN5U3RyKHR5cGU6IEN1cnJlbmN5SWQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW5jeSh0eXBlKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRGb3JtYXRlQ29pbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gQ29tbW9uLmJ5dGVzVG9TaXplKHRoaXMuZ2V0Q3VycmVuY3koQ3VycmVuY3lJZC5Db2luKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEN1ckNoYXB0ZXIoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5mby5jaGFwdGVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTZXJ2ZXJUaW1lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZm8uc2VydmVyVGltZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TGFzdFRpbWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5mby5nZXRMYXN0VGltZSgpO1xuICAgIH1cblxuICAgIC8qKuS4iea2iOa4uOaIj+eahOeKtuaAgeacuiAqL1xuICAgIHB1YmxpYyBzZXQgR2FtZVN0YXRlKHN0YXRlOiBHYW1lU3RhdGUpIHtcbiAgICAgICAgdGhpcy5fZ2FtZVN0YXRhID0gc3RhdGU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBHYW1lU3RhdGUoKTogR2FtZVN0YXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWVTdGF0YVxuICAgIH1cblxuICAgIC8qKuS4iea2iOetiee6pyjlvZPliY3mnIDlpKfnmoQpICovXG4gICAgcHVibGljIGdldE1hdGNoM0xldmVsKCk6IG51bWJlciB7XG5cdFx0XHR0aGlzLmluZm8ubWF0aGMzTGV2ZWwgPSBOdW1iZXIoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiZ2FtZWxldmVsXCIpKVxuICAgICAgICByZXR1cm4gdGhpcy5pbmZvLm1hdGhjM0xldmVsIHx8IDE7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBtYXhNYXRjaDNMZXZlbCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gNTAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY3VycmVudFNjb3JlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY29yZSB8fCAwO1xuICAgIH1cblxuICAgIC8qKuaJgOacieeahOaYn+aYn+aVsCAqL1xuICAgIHB1YmxpYyBnZXRTdGFyQ291bnQoKSB7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIHRoaXMuaW5mby5sdk1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBjb3VudCArPSB2YWx1ZS5zdGFyO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnYW1lU3RhcigpIHtcbiAgICAgICAgdGhpcy5fcHJlR2FtZVN0YXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2NvcmUgPSAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0U2NvcmUoc2NvcmUpIHtcbiAgICAgICAgdGhpcy5fc2NvcmUgPSBzY29yZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0U2VydmVyVGltZSh0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5pbmZvLnNlcnZlclRpbWUgPSB0aW1lO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRTY29yZShzY29yZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgdGhpcy5zZXRTY29yZSh0aGlzLmN1cnJlbnRTY29yZSArIChzY29yZSB8fCAwKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTY29yZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGRDb3VudEJ5VHlwZShrZXksIHR5cGUsIGNvdW50ID0gMSkge1xuICAgICAgICBjb25zdCBkZCA9IFN0b3JhZ2VNZ3IuUmluZ1N0b3JhZ2UuZGF5KCkuZ2V0VmFsdWUoa2V5LCB7fSk7XG4gICAgICAgIGRkW3R5cGVdID0gZGRbdHlwZV0gPyAoZGRbdHlwZV0gKyBjb3VudCkgOiBjb3VudDtcbiAgICAgICAgU3RvcmFnZU1nci5SaW5nU3RvcmFnZS5kYXkoKS5zZXRWYWx1ZShrZXksIGRkKTtcbiAgICAgICAgY29uc3QgbWQgPSBTdG9yYWdlTWdyLlJpbmdTdG9yYWdlLm1vbnRoKCkuZ2V0VmFsdWUoa2V5ICsgMSwge30pO1xuICAgICAgICBtZFt0eXBlXSA9IG1kW3R5cGVdID8gKG1kW3R5cGVdICsgY291bnQpIDogY291bnQ7XG4gICAgICAgIFN0b3JhZ2VNZ3IuUmluZ1N0b3JhZ2UubW9udGgoKS5zZXRWYWx1ZShrZXkgKyAxLCBtZCk7XG4gICAgICAgIGNvbnN0IGFkID0gU3RvcmFnZU1nci5TdG9yYWdlLmdldE9iamVjdChrZXkgKyAyLCB7fSk7XG4gICAgICAgIGFkW3R5cGVdID0gYWRbdHlwZV0gPyAoYWRbdHlwZV0gKyBjb3VudCkgOiBjb3VudDtcbiAgICAgICAgU3RvcmFnZU1nci5TdG9yYWdlLnNldE9iamVjdChrZXkgKyAyLCBhZCk7XG4gICAgICAgIERhaWx5VGFza01nci5pbnMuc3luY1BybzJTZXIoa2V5LCB0eXBlLCBkZFt0eXBlXSwgbWRbdHlwZV0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FkZENvdW50KGtleSkge1xuICAgICAgICBjb25zdCBkYyA9IFN0b3JhZ2VNZ3IuUmluZ1N0b3JhZ2UuZGF5KCkuZ2V0VmFsdWUoa2V5LCAwKTtcbiAgICAgICAgU3RvcmFnZU1nci5SaW5nU3RvcmFnZS5kYXkoKS5zZXRWYWx1ZShrZXksIGRjICsgMSk7XG4gICAgICAgIGNvbnN0IG1jID0gU3RvcmFnZU1nci5SaW5nU3RvcmFnZS5tb250aCgpLmdldFZhbHVlKGtleSArIDEsIDApO1xuICAgICAgICBTdG9yYWdlTWdyLlJpbmdTdG9yYWdlLm1vbnRoKCkuc2V0VmFsdWUoa2V5ICsgMSwgbWMgKyAxKTtcbiAgICAgICAgY29uc3QgYWMgPSBTdG9yYWdlTWdyLlN0b3JhZ2UuZ2V0SW50KGtleSArIDIsIDApO1xuICAgICAgICBTdG9yYWdlTWdyLlN0b3JhZ2Uuc2V0SW50KGtleSArIDIsIGFjICsgMSk7XG4gICAgICAgIERhaWx5VGFza01nci5pbnMuc3luY1BybzJTZXIoa2V5LCBudWxsLCBkYyArIDEsIG1jICsgMSk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgYWRkQ29sbGVjdENvdW50KHR5cGUsIGNvdW50ID0gMSkge1xuICAgICAgICB0aGlzLl9hZGRDb3VudEJ5VHlwZShOYXRpdmVLZXkuRGFpbHlDb2xsZWN0LCB0eXBlLCBjb3VudCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZE1lcmdlQ291bnQodHlwZSkge1xuICAgICAgICB0aGlzLl9hZGRDb3VudEJ5VHlwZShOYXRpdmVLZXkuRGFpbHlNZXJnZSwgdHlwZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFkZEdhbWVDb3VudCgpIHtcbiAgICAgICAgdGhpcy5fYWRkQ291bnQoTmF0aXZlS2V5LkRhaWx5R2FtZUNvdW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkVXNlUHJvcENvdW50KHR5cGUpIHtcbiAgICAgICAgdGhpcy5fYWRkQ291bnQoTmF0aXZlS2V5LkRhaWx5VXNlUHJvcENvdW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlop7ph4/mm7TmlrDkuIDkuKrpgZPlhbfnmoTmlbDph49cbiAgICAgKiBAcGFyYW0gdHlwZSBcbiAgICAgKiBAcGFyYW0gbnVtIFxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVQcm9wQ291bnQodHlwZTogUHJvcFR5cGUsIG51bTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHAgPSB0aGlzLmluZm8ucHJvcERhdGFbdHlwZV0gfHwgeyBjb3VudDogMCB9O1xuICAgICAgICBwLmNvdW50ICs9IG51bTtcbiAgICAgICAgcC5jb3VudCA9IHAuY291bnQgPCAwID8gMCA6IHAuY291bnRcbiAgICAgICAgdGhpcy5pbmZvLnByb3BEYXRhW3R5cGVdID0gcDtcblx0XHRjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJkYW9qdVwiLEpTT04uc3RyaW5naWZ5KHRoaXMuaW5mby5wcm9wRGF0YSkpXG4gICAgICAgIEV2ZW50TWdyLmlucy5zZW5kKEV2ZW50LlVJLlByb3BDb3VudCwgdHlwZSk7XG4gICAgICAgIHRoaXMuX3B1c2hTYXZlVGFzaygncHJvcERhdGEnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0TWF0Y2gzTGV2ZWwobHY6IG51bWJlciwgcWo6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBpZiAobHYgPiB0aGlzLmluZm8ubWF0aGMzTGV2ZWwgfHwgcWopIHtcbiAgICAgICAgICAgIC8v5LiK5oql5o6S6KGM5L+h5oGvXG4gICAgICAgICAgICBjb25zdCBsdkRhdGEgPSB0aGlzLmdldE5hdGl2ZUx2RGF0YSh0aGlzLmluZm8ubWF0aGMzTGV2ZWwpO1xuICAgICAgICAgICAgTS5uZXQucHV0UmFua0RhdGEoeyBuYW1lOiAnQmFycmllclJhbmsnLCB2YWx1ZTogQ29tbW9uLnN0cmluZ2lmeVJhbmtEYXRhKHRoaXMuaW5mby5tYXRoYzNMZXZlbCwgbHZEYXRhLnNjb3JlKSB9KTtcbiAgICAgICAgICAgIHRoaXMuaW5mby5tYXRoYzNMZXZlbCA9IGx2O1xuXHRcdFx0Y2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZ2FtZWxldmVsXCIsbHYpXG4gICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuVUkuVXBkYXRlTHYsIGx2KTtcbiAgICAgICAgICAgIHRoaXMuX3B1c2hTYXZlVGFzaygnbWF0aGMzTGV2ZWwnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuU2VsZWN0TGV2ZWwgPSBsdjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICog5aKe6YeP6K6+572u5LiA5Liq6LSn5biB55qE5pWw6YePXG4gICAgKiBAcGFyYW0gdHlwZSBcbiAgICAqIEBwYXJhbSBudW0gXG4gICAgKi9cbiAgICBwdWJsaWMgYWRkQ3VycmVuY3kodHlwZTogQ3VycmVuY3lJZCwgbnVtOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHR5cGUgPT0gQ3VycmVuY3lJZC5UYXNrS2V5KSB7XG4gICAgICAgICAgICBEYWlseVRhc2tNZ3IuaW5zLmFkZERhaWx5VGFza0tleShudW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gdGhpcy5nZXRDdXJyZW5jeUtleSh0eXBlKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuaW5mb1trZXldO1xuICAgICAgICAgICAgaWYgKHR5cGUgPT0gQ3VycmVuY3lJZC5Qb3dlciAmJiBudW0gPiAwICYmIGN1cnJlbnRWYWx1ZSA+PSBNYXhQb3dlckNvdW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbmZvW2tleV0gKz0gbnVtO1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5mb1trZXldIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5mb1trZXldID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEV2ZW50TWdyLmlucy5zZW5kKEV2ZW50LlVJLlVwZGF0ZUN1cnJlbmN5LCB0eXBlLCB0aGlzLmdldEN1cnJlbmN5KHR5cGUpKTtcbiAgICAgICAgICAgIHRoaXMuX3B1c2hTYXZlVGFzayhrZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGlzUG93ZXJFbm91Z2goKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmluZm8ucG93ZXIgPj0gUG93ZXJDb25maWcuTHZDb25zdW1wdGlvbjtcbiAgICB9XG5cbiAgICAvKirojrflj5bmjIflrprlhbPljaHnmoTpgJrlhbPmlbDmja4gKi9cbiAgICBwdWJsaWMgZ2V0TmF0aXZlTHZEYXRhKGx2OiBudW1iZXIgPSBudWxsKTogeyBzY29yZTogbnVtYmVyLCBzdGFyOiBudW1iZXIgfSB7XG4gICAgICAgIGx2ID0gbHYgfHwgdGhpcy5DdXJMZXZlbDtcbiAgICAgICAgY29uc3Qga2V5ID0gYCR7TmF0aXZlS2V5Lkx2RGF0YUtleX1fJHtsdn1gO1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5pbmZvLmx2TWFwLmdldChrZXkpO1xuICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gPGFueT5TdG9yYWdlTWdyLlN0b3JhZ2UuZ2V0T2JqZWN0KGtleSwgeyBzY29yZTogMCwgc3RhcjogMCB9KTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LnNjb3JlICE9IDAgJiYgcmVzdWx0LnN0YXIgIT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5mby5sdk1hcC5zZXQoa2V5LCByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEJveEdpZnREYXRhQnlMdihsdjogbnVtYmVyKTogeyByZWNlaXZlZDogYm9vbGVhbiB9IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IFN0b3JhZ2VNZ3IuU3RvcmFnZS5nZXRPYmplY3QoTmF0aXZlS2V5LkJveEdpZnRzLCB7fSk7XG4gICAgICAgIHJldHVybiBkYXRhW2x2XTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Qm94R2lmdERhdGEobHY6IG51bWJlciwgcmVjZWl2ZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IFN0b3JhZ2VNZ3IuU3RvcmFnZS5nZXRPYmplY3QoTmF0aXZlS2V5LkJveEdpZnRzLCB7fSk7XG4gICAgICAgIGlmIChkYXRhW2x2XSAmJiBkYXRhW2x2XVsncmVjZWl2ZWQnXSkgcmV0dXJuO1xuICAgICAgICBkYXRhW2x2XSA9IHsgcmVjZWl2ZWQgfTtcbiAgICAgICAgU3RvcmFnZU1nci5TdG9yYWdlLnNldE9iamVjdChOYXRpdmVLZXkuQm94R2lmdHMsIGRhdGEsIHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS/neWtmOWFs+WNoeaVsOaNrlxuICAgICAqIEBwYXJhbSBzdGFyIOaYn+aYn+aVsFxuICAgICAqIEByZXR1cm4gQm9vbGVhbiDmmK/lkKbmmK/mlrDpgJrlhbNcbiAgICAgKi9cbiAgICBwdWJsaWMgc2F2YUx2RGF0YShzdGFyOiBudW1iZXIsIHNjb3JlPzogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGx2RGF0YSA9IHRoaXMuZ2V0TmF0aXZlTHZEYXRhKHRoaXMuQ3VyTGV2ZWwpO1xuICAgICAgICBsZXQgaXNOZXcgPSBmYWxzZTtcbiAgICAgICAgaWYgKGx2RGF0YS5zY29yZSA9PSAwICYmIGx2RGF0YS5zdGFyID09IDApIHtcbiAgICAgICAgICAgIGlzTmV3ID0gdHJ1ZTtcbiAgICAgICAgICAgIE0ucnVudGltZS5hZGRDb2xsZWN0Q291bnQoJ3N0YXInLCBzdGFyKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdGFyIC0gbHZEYXRhLnN0YXIgPiAwKSB7XG4gICAgICAgICAgICBNLnJ1bnRpbWUuYWRkQ29sbGVjdENvdW50KCdzdGFyJywgc3RhciAtIGx2RGF0YS5zdGFyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3JlID0gc2NvcmUgfHwgdGhpcy5fc2NvcmU7XG4gICAgICAgIGlmIChzY29yZSA+IGx2RGF0YS5zY29yZSkge1xuICAgICAgICAgICAgbHZEYXRhLnNjb3JlID0gc2NvcmU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXIgPiBsdkRhdGEuc3Rhcikge1xuICAgICAgICAgICAgbHZEYXRhLnN0YXIgPSBzdGFyO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGtleSA9IGAke05hdGl2ZUtleS5MdkRhdGFLZXl9XyR7dGhpcy5DdXJMZXZlbH1gO1xuICAgICAgICB0aGlzLmluZm8ubHZNYXAuc2V0KGtleSwgbHZEYXRhKTtcbiAgICAgICAgU3RvcmFnZU1nci5TdG9yYWdlLnNldE9iamVjdChrZXksIGx2RGF0YSwgdHJ1ZSk7XG4gICAgICAgIGlmICgvKmlzTmV3ICYmICovdGhpcy5DdXJMZXZlbCAlIDEwID09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBNLnRhYmxlLkJveFJld2FyZEluZm8uZ2V0QnlQcmltYXJ5S2V5KHRoaXMuQ3VyTGV2ZWwpO1xuICAgICAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgICAgICAvL+WIpOaWreacieWlluWKsS4uLuaPkuWFpeW+hemihuWPllxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Qm94R2lmdERhdGEodGhpcy5DdXJMZXZlbCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc05ldztcbiAgICB9XG5cblxuICAgIHByaXZhdGUgX3ByZUdhbWVTdGF0ZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfenlUaW1lVGFza1Bvb2wgPSAwO1xuXG4gICAgcHVibGljIHB1c2haaGFuZ3l1VGltZVBhdXNlKCkge1xuICAgICAgICB0aGlzLl96eVRpbWVUYXNrUG9vbCsrO1xuICAgICAgICB0aGlzLnBhdXNlR2FtZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGVaaGFuZ3l1VGltZSgpIHtcbiAgICAgICAgdGhpcy5fenlUaW1lVGFza1Bvb2wtLTtcbiAgICAgICAgaWYgKHRoaXMuX3p5VGltZVRhc2tQb29sIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVzdW1lR2FtZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHBhdXNlR2FtZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2dhbWVTdGF0YSA+PSBHYW1lU3RhdGUuV2luKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmVHYW1lU3RhdGUgPSB0aGlzLl9nYW1lU3RhdGE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZ2FtZVN0YXRhID0gR2FtZVN0YXRlLlBhdXNlO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXN1bWVHYW1lKCkge1xuICAgICAgICBpZiAodGhpcy5fZ2FtZVN0YXRhID09IEdhbWVTdGF0ZS5QYXVzZSkge1xuICAgICAgICAgICAgdGhpcy5fZ2FtZVN0YXRhID0gdGhpcy5fcHJlR2FtZVN0YXRlID09IG51bGwgPyBHYW1lU3RhdGUuTm9ybWFsIDogdGhpcy5fcHJlR2FtZVN0YXRlO1xuICAgICAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuR2FtZUNNRC5HYW1lUmVzdW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDdXJyZW5jeUtleShpZDogQ3VycmVuY3lJZCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBbJ2NvaW4nLCAnZGlhbW9uZCcsICdwb3dlciddW2lkXTtcbiAgICB9XG5cbiAgICAvKirlvIDlkK/lrprml7blmaggKi9cbiAgICBwcml2YXRlIF9vcGVuVGltZXIoKSB7XG4gICAgICAgIC8v6L+Z6YeM5Zyo5ZCO5Y+w5Lmf5piv5Lya6L+Q6KGM55qELi4u54m55Yir5rOo5oSPIVxuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgdGhpcy5fdGltZUhhbmRsZSA9IHNldEludGVydmFsKHRoaXMudXBkYXRlLmJpbmQodGhpcyksIDEwMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5o+S5YWl6IOM5YyF5pWw5o2uICovXG4gICAgcHJpdmF0ZSBfcHVzaFNhdmVUYXNrKGtleSkge1xuICAgICAgICB0aGlzLl9kYXRhU2F2ZVRhc2tQb29sLnB1c2goa2V5KTtcbiAgICB9XG5cbiAgICAvKirojrflj5blvZPliY3mnI3liqHlmajphY3nva4gKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0U2VydmVyQ29uZmlnKCk6IFByb21pc2U8SVNlcnZlckNvbmZpZz4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fc2VydmVyQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgTS5uZXQuZ2V0U2VydmVyRGF0YSgpLnRoZW4oc2VydmVyQ29uZmlnID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VydmVyQ29uZmlnID0gc2VydmVyQ29uZmlnO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHNlcnZlckNvbmZpZyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5fc2VydmVyQ29uZmlnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKirmiafooYzkv53lrZjmlbDmja7ku7vliqEhICovXG4gICAgcHJpdmF0ZSBhc3luYyBfZXhlY1NhdmVUYXNrKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2V4ZWNTYXZlVGFza2luZykge1xuICAgICAgICAgICAgdGhpcy5fZXhlY1NhdmVUYXNraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IHRhc2sgPSB0aGlzLl9kYXRhU2F2ZVRhc2tQb29sLnNoaWZ0KCk7XG4gICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuaW5mby5zYXZlRGF0YSh0YXNrKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9leGVjU2F2ZVRhc2tpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9leGVjU2F2ZVRhc2soKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXhlY1NhdmVUYXNraW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVQb3dlclRpbWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldEN1cnJlbmN5KEN1cnJlbmN5SWQuUG93ZXIpIDwgTWF4UG93ZXJDb3VudCkge1xuICAgICAgICAgICAgdGhpcy5pbmZvLnRpbWVDb3VudGVyKytcbiAgICAgICAgICAgIGlmICh0aGlzLmluZm8udGltZUNvdW50ZXIgPj0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZm8udGltZUNvdW50ZXIgPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5pbmZvLnRpbWVDb3VudGVyICUgMzAgPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3B1c2hTYXZlVGFzaygndGltZUNvdW50ZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmluZm8udGltZUNvdW50ZXIgJSBQb3dlckNvbmZpZy5Ob3JtYWxUaW1lID09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEN1cnJlbmN5KEN1cnJlbmN5SWQuUG93ZXIsIFBvd2VyQ29uZmlnLk5vcm1hbENvdW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEV2ZW50TWdyLmlucy5zZW5kKEV2ZW50LlVJLlVwZGF0ZVJlbWFpbkFkZFBvd2VyVGltZSwgdGhpcy5pbmZvLnRpbWVDb3VudGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZURhaWx5VGltZSgpIHtcbiAgICAgICAgdGhpcy5zZXREYWlseVRpbWUodGhpcy5fZGFpbHlUaW1lICsgMSk7XG4gICAgICAgLy8gTS5ldmVudC5zZW5kKEV2ZW50LkRhaWx5VGFzay5VcGRhdGVQcm9ncmVzcywgQ29uZGl0aW9uVHlwZS50aW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IERhaWx5VGltZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhaWx5VGltZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RGFpbHlUaW1lKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZGFpbHlUaW1lID0gdmFsdWU7XG4gICAgICAgIFN0b3JhZ2VNZ3IuUmluZ1N0b3JhZ2UuZGF5KCkuc2V0VmFsdWUoTmF0aXZlS2V5LkRhaWx5VGltZSwgdGhpcy5fZGFpbHlUaW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5fZGF0YVNhdmVUYXNrUG9vbC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9leGVjU2F2ZVRhc2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmluZm8uc2VydmVyVGltZSAhPSAwKSB7XG4gICAgICAgICAgICB0aGlzLmluZm8uc2VydmVyVGltZSsrO1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5mby5zZXJ2ZXJUaW1lICUgMzAgPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5mby5zYXZlTGFzdFRpbWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5fdXBkYXRlUG93ZXJUaW1lKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZURhaWx5VGltZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwdXNoT25TaG93VGFzayh0YXNrKSB7XG4gICAgICAgIGlmICghdGhpcy5fb25TaG93VGFzaykge1xuICAgICAgICAgICAgdGhpcy5fb25TaG93VGFzayA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29uU2hvd1Rhc2sucHVzaCh0YXNrKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jaGVja09uU2hvd1Rhc2soKSB7XG4gICAgICAgIGlmICh0aGlzLl9vblNob3dUYXNrICYmIHRoaXMuX29uU2hvd1Rhc2subGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgdXNlcmlkID0gdGhpcy5fb25TaG93VGFzay5zaGlmdCgpO1xuICAgICAgICAgICAgTS5uZXQuYWRkRnJpZW5kKHVzZXJpZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=