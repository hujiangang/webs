"use strict";
cc._RF.push(module, '5b1afnYUzFKvqBU0fpIMh4E', 'StorageMgr');
// Script/Base/Manager/StorageMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageMgr = void 0;
var NetMgr_1 = require("./NetMgr");
var PlatformMgr_1 = require("./PlatformMgr");
var BaseConst_1 = require("../BaseConst");
var FLUSH_2_NET_TIME = 3 * 1000;
var StorageMgr;
(function (StorageMgr) {
    var Storage = /** @class */ (function () {
        function Storage() {
        }
        /**
         * 初始化缓存，主要是为了同步服务器的资源
         */
        Storage.init = function (res) {
            if (res) {
                for (var key in res) {
                    Storage.setStorage(key, res[key]);
                }
            }
            if (Storage._flushTimer) {
                clearInterval(Storage._flushTimer);
                Storage._flushTimer = null;
            }
            //定时同步到网络
            Storage._flushTimer = setInterval(Storage.flush, FLUSH_2_NET_TIME);
        };
        /**
         * 设置缓存数据
         * @param key
         * @param data
         */
        Storage.setStorage = function (key, data, syncRemote) {
            if (syncRemote === void 0) { syncRemote = false; }
            if (data == null) {
                data = "";
            }
            if (typeof (data) == 'object') {
                data = JSON.stringify(data);
            }
            if (syncRemote) {
                Storage._awaitServerStorages.set(key + '', data);
            }
            Storage._setLocalStorageData(key, data);
        };
        /**
         * 设置Object缓存
         * @param key
         * @param data
         * @param syncRemote
         */
        Storage.setObject = function (key, data, syncRemote) {
            if (syncRemote === void 0) { syncRemote = false; }
            if (data == null) {
                data = {};
            }
            try {
                data = JSON.stringify(data);
            }
            catch (e) {
                data = {};
            }
            Storage.setStorage(key, data, syncRemote);
        };
        /**
         * 设置Int缓存
         * @param key
         * @param data
         * @param syncRemote
         */
        Storage.setInt = function (key, data, syncRemote) {
            if (syncRemote === void 0) { syncRemote = false; }
            Storage.setStorage(key, data || 0, syncRemote);
        };
        /**
         * 设置Float缓存
         * @param key
         * @param data
         * @param syncRemote
         */
        Storage.setFloat = function (key, data, syncRemote) {
            if (syncRemote === void 0) { syncRemote = false; }
            if (!data) {
                data = 0;
            }
            Storage.setStorage(key, data, syncRemote);
        };
        /**
         * 设置Boolean缓存
         * @param key
         * @param data
         * @param syncRemote
         */
        Storage.setBoolean = function (key, data, syncRemote) {
            if (syncRemote === void 0) { syncRemote = false; }
            var value = data ? "1" : "0";
            Storage.setStorage(key, value, syncRemote);
        };
        /**
         * 设置string类型
         * @param key
         * @param data
         * @param syncRemote
         */
        Storage.setString = function (key, data, syncRemote) {
            if (syncRemote === void 0) { syncRemote = false; }
            Storage.setStorage(key, data || "", syncRemote);
        };
        /**
         * 获取缓存数据
         * @param key
         * @param defData
         */
        Storage.getStorage = function (key, defData) {
            return Storage._getLocalStorageData(key, defData);
        };
        /**
         * 获取缓存数据
         * @param key
         * @param defData
         */
        Storage.getObject = function (key, defData) {
            var value = Storage._getLocalStorageData(key, defData);
            if (!value) {
                return defData;
            }
            var type = typeof (value);
            if (type == 'object') {
                return value;
            }
            else if (type != 'string') {
                value = String(value);
            }
            try {
                value = JSON.parse(value);
            }
            catch (e) {
            }
            return value ? value : defData;
        };
        /**
         * 获取缓存数据
         * @param key
         * @param defData
         */
        Storage.getString = function (key, defData) {
            var value = Storage._getLocalStorageData(key, defData);
            if (!value) {
                return defData;
            }
            return String(value);
        };
        /**
        * 获取缓存数据
        * @param key
        * @param defData
        */
        Storage.getInt = function (key, defData) {
            var value = Storage._getLocalStorageData(key, defData);
            if (!value) {
                return defData;
            }
            var type = typeof (value);
            try {
                if (type == 'string') {
                    value = parseInt(value);
                }
                else {
                    value = Number(value);
                }
            }
            catch (e) {
            }
            return (value != null && typeof (value) != "undefined") ? value : defData;
        };
        /**
        * 获取缓存数据
        * @param key
        * @param defData
        */
        Storage.getStorageFloat = function (key, defData) {
            var value = Storage._getLocalStorageData(key, defData);
            if (!value) {
                return defData;
            }
            var type = typeof (value);
            try {
                if (type == 'string') {
                    value = parseFloat(value);
                }
                else {
                    value = Number(value);
                }
            }
            catch (e) {
            }
            return (value != null && typeof (value) != "undefined") ? value : defData;
        };
        /**
         * 清除所有数据
         */
        Storage.removeAll = function () {
            // cc.sys.localStorage.clear();
            if (PlatformMgr_1.default.ins.type == BaseConst_1.PlatformType.Web) { //网页上用作切换账号
                var data = cc.sys.localStorage;
                for (var i = 0; i < data.length; ++i) {
                    if (data.key(i) == "__userId") {
                        continue;
                    }
                    data.removeItem(data.key(i));
                    i = i - 1;
                }
            }
            else {
                cc.sys.localStorage.clear();
            }
        };
        /**
         * 获取缓存数据
         * @param key
         * @param defData
         */
        Storage.getBoolean = function (key, defData) {
            var value = Storage._getLocalStorageData(key, defData);
            if (!value) {
                return defData;
            }
            var type = typeof (value);
            try {
                if (type == 'string') {
                    value = (value == 'true' || value == '1');
                }
                else {
                    value = Boolean(value);
                }
            }
            catch (e) {
            }
            return (value != null && typeof (value) != "undefined") ? value : defData;
        };
        /**
         * 删除缓存数据
         * @param key
         * @param syncRemote
         */
        Storage.removeStorage = function (key, syncRemote) {
            if (syncRemote === void 0) { syncRemote = false; }
            if (syncRemote) {
                // 从远程服务器上删除, 先在这里弄成null
                Storage._awaitServerStorages.set(key + '', '');
            }
            Storage._removeStorageData(key);
        };
        /**
         * 推送到服务器
         */
        Storage.flush = function () {
            if (Storage._awaitServerStorages.size == 0) {
                return;
            }
            var data = {};
            Storage._awaitServerStorages.forEach(function (v, k) {
                data[k] = v;
            });
            NetMgr_1.default.ins.putUserData(data).then(function (result) {
                // if (result) {
                // Storage._awaitServerStorages.clear();
                // }
            });
            Storage._awaitServerStorages.clear();
            // let keys = []
            // Storage._awaitServerStorages.forEach((value, key) => {
            //     keys.push(key)
            //     const data: { key, value: string, opt, token?, max?, min?} = <any>{};
            //     data.key = key
            //     data.value = String(value);
            //     data.opt = 'set';
            //     netMgr.pushRes(data, false)
            // })
            // if (keys.length > 0) {
            //     let result = netMgr.submitRes();
            //     if (result) {
            //         result.then(v => {
            //             if (v.err == null) {
            //                 for (let key of keys) {
            //                     Storage._awaitServerStorages.delete(key)
            //                 }
            //             }
            //         })
            //     }
            // }
        };
        /**
         * 获取本地缓存
         * @param key
         * @param defData
         */
        Storage._getLocalStorageData = function (key, defData) {
            var data = Storage._localStorages.get(key + '');
            if (data) {
                return data;
            }
            data = cc.sys.localStorage.getItem(key + '');
            return data || defData;
        };
        /**
         * 设置本地缓存
         * @param key
         * @param data
         */
        Storage._setLocalStorageData = function (key, data) {
            Storage._localStorages.set(key + '', data);
            cc.sys.localStorage.setItem(key + '', data);
        };
        /**
         * 移除本地缓存
         * @param key
         */
        Storage._removeStorageData = function (key) {
            Storage._localStorages.delete(key + '');
            cc.sys.localStorage.removeItem(key + '');
        };
        Storage.BuildingState = "_island";
        Storage.GuideIds = "_guideMap";
        Storage.HotelData = "_hotelDatas";
        Storage._localStorages = new Map();
        Storage._awaitServerStorages = new Map();
        Storage._flushTimer = null;
        return Storage;
    }());
    StorageMgr.Storage = Storage;
    var RingStorage = /** @class */ (function () {
        /**
         *
         * @param key
         */
        function RingStorage(key) {
            this.__RING_KEY__ = "";
            this.__RING_KEY__ = key;
        }
        RingStorage.prototype.getNowTime = function () {
            return Date.now();
        };
        RingStorage._g = function (k) {
            if (RingStorage._rs == null) {
                RingStorage._rs = new Map();
            }
            var s = RingStorage._rs.get(k);
            if (!s) {
                s = new RingStorage(k);
                RingStorage._rs.set(k, s);
            }
            return s;
        };
        /**
         * 每天
         */
        RingStorage.day = function () {
            return RingStorage._g(RingStorage.DAY_KEY);
        };
        /**
         * 每周
         */
        RingStorage.week = function () {
            return RingStorage._g(RingStorage.WEEK_KEY);
        };
        /**
         * 每周
         */
        RingStorage.month = function () {
            return RingStorage._g(RingStorage.MONTH_KEY);
        };
        /**
         * 构造一个时间戳
         */
        RingStorage.prototype.createTimestamp = function () {
            var d = new Date(this.getNowTime());
            if (this.__RING_KEY__ == RingStorage.MONTH_KEY) {
                return d.getFullYear() << 16 | d.getMonth() << 8;
            }
            else if (this.__RING_KEY__ == RingStorage.WEEK_KEY) {
                d.setHours(0);
                d.setMinutes(0);
                d.setSeconds(0);
                return d.getTime();
            }
            else {
                return d.getFullYear() << 16 | d.getMonth() << 8 | d.getDate();
            }
        };
        /**
         * 和今天的差值
         * @param t
         */
        RingStorage.prototype.diffDay = function (t) {
            var d = new Date(this.getNowTime());
            d.setHours(0);
            d.setMinutes(0);
            d.setSeconds(0);
            return (d.getTime() - t) / 86400000;
        };
        /**
         * 获取data
         */
        RingStorage.prototype.getStorageData = function () {
            var changed = false;
            var t = this.createTimestamp();
            var data = Storage.getObject(this.__RING_KEY__, { t: 0, d: {} });
            if (this.__RING_KEY__ == RingStorage.WEEK_KEY) {
                changed = this.diffDay(data.t) > 7;
            }
            else {
                changed = data.t != t;
            }
            if (changed) {
                data.t = t;
                data.d = {};
                Storage.setObject(this.__RING_KEY__, data);
            }
            return data;
        };
        RingStorage.prototype.deleteValue = function (key) {
            key = key.toString();
            var data = this.getStorageData();
            delete data[key];
            Storage.setObject(this.__RING_KEY__, data);
        };
        /**
         * 设置值
         * @param key
         * @param value
         */
        RingStorage.prototype.setValue = function (key, value) {
            key = key.toString();
            var data = this.getStorageData();
            data.d[key] = value;
            Storage.setObject(this.__RING_KEY__, data);
        };
        /**
         * 获取值
         * @param key
         * @param value
         */
        RingStorage.prototype.getValue = function (key, defVal) {
            key = key.toString();
            var data = this.getStorageData();
            var value = data.d[key];
            if (value == null) {
                return defVal;
            }
            return value;
        };
        RingStorage.DAY_KEY = '__RING_DAY_KEY__';
        RingStorage.WEEK_KEY = '__RING_WEEK_KEY__';
        RingStorage.MONTH_KEY = '__RING_MONTH_KEY__';
        return RingStorage;
    }());
    StorageMgr.RingStorage = RingStorage;
})(StorageMgr = exports.StorageMgr || (exports.StorageMgr = {}));

cc._RF.pop();