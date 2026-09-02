"use strict";
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