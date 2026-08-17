
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/StorageMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxTdG9yYWdlTWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG1DQUE4QjtBQUM5Qiw2Q0FBd0M7QUFDeEMsMENBQTRDO0FBRTVDLElBQU0sZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUVsQyxJQUFpQixVQUFVLENBd2UxQjtBQXhlRCxXQUFpQixVQUFVO0lBRXZCO1FBQUE7UUF1VkEsQ0FBQztRQS9VRzs7V0FFRztRQUNXLFlBQUksR0FBbEIsVUFBbUIsR0FBTztZQUN0QixJQUFJLEdBQUcsRUFBRTtnQkFDTCxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtvQkFDakIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ3JDO2FBQ0o7WUFDRCxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUU7Z0JBQ3JCLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO2FBQzdCO1lBQ0QsU0FBUztZQUNULE9BQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBRUQ7Ozs7V0FJRztRQUNXLGtCQUFVLEdBQXhCLFVBQXlCLEdBQW9CLEVBQUUsSUFBUyxFQUFFLFVBQTJCO1lBQTNCLDJCQUFBLEVBQUEsa0JBQTJCO1lBRWpGLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtnQkFDZCxJQUFJLEdBQUcsRUFBRSxDQUFDO2FBQ2I7WUFDRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLEVBQUU7Z0JBQzNCLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9CO1lBQ0QsSUFB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QWMsRUFBRSxDQUFDO1lBQ2pDLElBQUksS0FBSyxHQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO2dCQUNmLE9BQU8sTUFBTSxDQUFBO2FBQ2hCO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQXpJc0IsbUJBQU8sR0FBVyxrQkFBa0IsQ0FBQTtRQUNwQyxvQkFBUSxHQUFXLG1CQUFtQixDQUFBO1FBQ3RDLHFCQUFTLEdBQVcsb0JBQW9CLENBQUE7UUF3SW5FLGtCQUFDO0tBNUlELEFBNElDLElBQUE7SUE1SVksc0JBQVcsY0E0SXZCLENBQUE7QUFDTCxDQUFDLEVBeGVnQixVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQXdlMUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBOZXRNZ3IgZnJvbSBcIi4vTmV0TWdyXCI7XG5pbXBvcnQgUGxhdGZvcm1NZ3IgZnJvbSBcIi4vUGxhdGZvcm1NZ3JcIjtcbmltcG9ydCB7IFBsYXRmb3JtVHlwZSB9IGZyb20gXCIuLi9CYXNlQ29uc3RcIjtcblxuY29uc3QgRkxVU0hfMl9ORVRfVElNRSA9IDMgKiAxMDAwO1xuXG5leHBvcnQgbmFtZXNwYWNlIFN0b3JhZ2VNZ3Ige1xuXG4gICAgZXhwb3J0IGNsYXNzIFN0b3JhZ2Uge1xuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEJ1aWxkaW5nU3RhdGU6IHN0cmluZyA9IFwiX2lzbGFuZFwiO1xuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEd1aWRlSWRzOiBzdHJpbmcgPSBcIl9ndWlkZU1hcFwiO1xuICAgICAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEhvdGVsRGF0YTogc3RyaW5nID0gXCJfaG90ZWxEYXRhc1wiO1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBfbG9jYWxTdG9yYWdlcyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9hd2FpdFNlcnZlclN0b3JhZ2VzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2ZsdXNoVGltZXIgPSBudWxsO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDliJ3lp4vljJbnvJPlrZjvvIzkuLvopoHmmK/kuLrkuoblkIzmraXmnI3liqHlmajnmoTotYTmupBcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW5pdChyZXM6IHt9KSB7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHJlcykge1xuICAgICAgICAgICAgICAgICAgICBTdG9yYWdlLnNldFN0b3JhZ2Uoa2V5LCByZXNba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFN0b3JhZ2UuX2ZsdXNoVGltZXIpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKFN0b3JhZ2UuX2ZsdXNoVGltZXIpO1xuICAgICAgICAgICAgICAgIFN0b3JhZ2UuX2ZsdXNoVGltZXIgPSBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL+WumuaXtuWQjOatpeWIsOe9kee7nFxuICAgICAgICAgICAgU3RvcmFnZS5fZmx1c2hUaW1lciA9IHNldEludGVydmFsKFN0b3JhZ2UuZmx1c2gsIEZMVVNIXzJfTkVUX1RJTUUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOiuvue9rue8k+WtmOaVsOaNrlxuICAgICAgICAgKiBAcGFyYW0ga2V5IFxuICAgICAgICAgKiBAcGFyYW0gZGF0YSBcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc2V0U3RvcmFnZShrZXk6IHN0cmluZyB8IG51bWJlciwgZGF0YTogYW55LCBzeW5jUmVtb3RlOiBib29sZWFuID0gZmFsc2UpIHtcblxuICAgICAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiAoZGF0YSkgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3luY1JlbW90ZSkge1xuICAgICAgICAgICAgICAgIFN0b3JhZ2UuX2F3YWl0U2VydmVyU3RvcmFnZXMuc2V0KGtleSArICcnLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFN0b3JhZ2UuX3NldExvY2FsU3RvcmFnZURhdGEoa2V5LCBkYXRhKVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOiuvue9rk9iamVjdOe8k+WtmFxuICAgICAgICAgKiBAcGFyYW0ga2V5IFxuICAgICAgICAgKiBAcGFyYW0gZGF0YSBcbiAgICAgICAgICogQHBhcmFtIHN5bmNSZW1vdGUgXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc3RhdGljIHNldE9iamVjdChrZXk6IHN0cmluZyB8IG51bWJlciwgZGF0YTogT2JqZWN0LCBzeW5jUmVtb3RlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSB7fVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgU3RvcmFnZS5zZXRTdG9yYWdlKGtleSwgZGF0YSwgc3luY1JlbW90ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog6K6+572uSW5057yT5a2YXG4gICAgICAgICAqIEBwYXJhbSBrZXkgXG4gICAgICAgICAqIEBwYXJhbSBkYXRhIFxuICAgICAgICAgKiBAcGFyYW0gc3luY1JlbW90ZSBcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc2V0SW50KGtleTogc3RyaW5nIHwgbnVtYmVyLCBkYXRhOiBOdW1iZXIsIHN5bmNSZW1vdGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuXG4gICAgICAgICAgICBTdG9yYWdlLnNldFN0b3JhZ2Uoa2V5LCBkYXRhIHx8IDAsIHN5bmNSZW1vdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOiuvue9rkZsb2F057yT5a2YXG4gICAgICAgICAqIEBwYXJhbSBrZXkgXG4gICAgICAgICAqIEBwYXJhbSBkYXRhIFxuICAgICAgICAgKiBAcGFyYW0gc3luY1JlbW90ZSBcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc2V0RmxvYXQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIGRhdGE6IE51bWJlciwgc3luY1JlbW90ZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFN0b3JhZ2Uuc2V0U3RvcmFnZShrZXksIGRhdGEsIHN5bmNSZW1vdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOiuvue9rkJvb2xlYW7nvJPlrZhcbiAgICAgICAgICogQHBhcmFtIGtleSBcbiAgICAgICAgICogQHBhcmFtIGRhdGEgXG4gICAgICAgICAqIEBwYXJhbSBzeW5jUmVtb3RlIFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHN0YXRpYyBzZXRCb29sZWFuKGtleTogc3RyaW5nIHwgbnVtYmVyLCBkYXRhOiBib29sZWFuLCBzeW5jUmVtb3RlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGRhdGEgPyBcIjFcIiA6IFwiMFwiO1xuICAgICAgICAgICAgU3RvcmFnZS5zZXRTdG9yYWdlKGtleSwgdmFsdWUsIHN5bmNSZW1vdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOiuvue9rnN0cmluZ+exu+Wei1xuICAgICAgICAgKiBAcGFyYW0ga2V5IFxuICAgICAgICAgKiBAcGFyYW0gZGF0YSBcbiAgICAgICAgICogQHBhcmFtIHN5bmNSZW1vdGUgXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc3RhdGljIHNldFN0cmluZyhrZXk6IHN0cmluZyB8IG51bWJlciwgZGF0YTogc3RyaW5nLCBzeW5jUmVtb3RlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgICAgIFN0b3JhZ2Uuc2V0U3RvcmFnZShrZXksIGRhdGEgfHwgXCJcIiwgc3luY1JlbW90ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog6I635Y+W57yT5a2Y5pWw5o2uXG4gICAgICAgICAqIEBwYXJhbSBrZXkgXG4gICAgICAgICAqIEBwYXJhbSBkZWZEYXRhIFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRTdG9yYWdlKGtleTogc3RyaW5nIHwgbnVtYmVyLCBkZWZEYXRhPzogYW55KTogc3RyaW5nIHtcbiAgICAgICAgICAgIHJldHVybiBTdG9yYWdlLl9nZXRMb2NhbFN0b3JhZ2VEYXRhKGtleSwgZGVmRGF0YSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDojrflj5bnvJPlrZjmlbDmja5cbiAgICAgICAgICogQHBhcmFtIGtleSBcbiAgICAgICAgICogQHBhcmFtIGRlZkRhdGEgXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc3RhdGljIGdldE9iamVjdChrZXk6IHN0cmluZyB8IG51bWJlciwgZGVmRGF0YT86IE9iamVjdCk6IE9iamVjdCB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBTdG9yYWdlLl9nZXRMb2NhbFN0b3JhZ2VEYXRhKGtleSwgZGVmRGF0YSk7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZkRhdGE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB0eXBlID0gdHlwZW9mICh2YWx1ZSlcbiAgICAgICAgICAgIGlmICh0eXBlID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgIT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UodmFsdWUpXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA/IHZhbHVlIDogZGVmRGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDojrflj5bnvJPlrZjmlbDmja5cbiAgICAgICAgICogQHBhcmFtIGtleSBcbiAgICAgICAgICogQHBhcmFtIGRlZkRhdGEgXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc3RhdGljIGdldFN0cmluZyhrZXk6IHN0cmluZyB8IG51bWJlciwgZGVmRGF0YT86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBTdG9yYWdlLl9nZXRMb2NhbFN0b3JhZ2VEYXRhKGtleSwgZGVmRGF0YSk7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZkRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICog6I635Y+W57yT5a2Y5pWw5o2uXG4gICAgICAgICogQHBhcmFtIGtleSBcbiAgICAgICAgKiBAcGFyYW0gZGVmRGF0YSBcbiAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRJbnQoa2V5OiBzdHJpbmcgfCBudW1iZXIsIGRlZkRhdGE/OiBudW1iZXIpOiBudW1iZXIge1xuXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBTdG9yYWdlLl9nZXRMb2NhbFN0b3JhZ2VEYXRhKGtleSwgZGVmRGF0YSk7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZkRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdHlwZSA9IHR5cGVvZiAodmFsdWUpXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQodmFsdWUpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBOdW1iZXIodmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlICE9IG51bGwgJiYgdHlwZW9mICh2YWx1ZSkgIT0gXCJ1bmRlZmluZWRcIikgPyB2YWx1ZSA6IGRlZkRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgKiDojrflj5bnvJPlrZjmlbDmja5cbiAgICAgICAgKiBAcGFyYW0ga2V5IFxuICAgICAgICAqIEBwYXJhbSBkZWZEYXRhIFxuICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc3RhdGljIGdldFN0b3JhZ2VGbG9hdChrZXk6IHN0cmluZyB8IG51bWJlciwgZGVmRGF0YT86IE51bWJlcik6IE51bWJlciB7XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IFN0b3JhZ2UuX2dldExvY2FsU3RvcmFnZURhdGEoa2V5LCBkZWZEYXRhKTtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmRGF0YTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHR5cGUgPSB0eXBlb2YgKHZhbHVlKVxuICAgICAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IE51bWJlcih2YWx1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgKHZhbHVlKSAhPSBcInVuZGVmaW5lZFwiKSA/IHZhbHVlIDogZGVmRGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmuIXpmaTmiYDmnInmlbDmja5cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlQWxsKCkge1xuICAgICAgICAgICAgLy8gY2Muc3lzLmxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICAgICAgaWYgKFBsYXRmb3JtTWdyLmlucy50eXBlID09IFBsYXRmb3JtVHlwZS5XZWIpIHsgIC8v572R6aG15LiK55So5L2c5YiH5o2i6LSm5Y+3XG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBjYy5zeXMubG9jYWxTdG9yYWdlO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5rZXkoaSkgPT0gXCJfX3VzZXJJZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkYXRhLnJlbW92ZUl0ZW0oZGF0YS5rZXkoaSkpO1xuICAgICAgICAgICAgICAgICAgICBpID0gaSAtIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog6I635Y+W57yT5a2Y5pWw5o2uXG4gICAgICAgICAqIEBwYXJhbSBrZXkgXG4gICAgICAgICAqIEBwYXJhbSBkZWZEYXRhIFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRCb29sZWFuKGtleTogc3RyaW5nIHwgbnVtYmVyLCBkZWZEYXRhPzogYm9vbGVhbik6IGJvb2xlYW4ge1xuXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBTdG9yYWdlLl9nZXRMb2NhbFN0b3JhZ2VEYXRhKGtleSwgZGVmRGF0YSk7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZkRhdGE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB0eXBlID0gdHlwZW9mICh2YWx1ZSlcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAodmFsdWUgPT0gJ3RydWUnIHx8IHZhbHVlID09ICcxJylcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IEJvb2xlYW4odmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgKHZhbHVlKSAhPSBcInVuZGVmaW5lZFwiKSA/IHZhbHVlIDogZGVmRGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDliKDpmaTnvJPlrZjmlbDmja5cbiAgICAgICAgICogQHBhcmFtIGtleSBcbiAgICAgICAgICogQHBhcmFtIHN5bmNSZW1vdGUgXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc3RhdGljIHJlbW92ZVN0b3JhZ2Uoa2V5OiBzdHJpbmcgfCBudW1iZXIsIHN5bmNSZW1vdGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKHN5bmNSZW1vdGUpIHtcbiAgICAgICAgICAgICAgICAvLyDku47ov5znqIvmnI3liqHlmajkuIrliKDpmaQsIOWFiOWcqOi/memHjOW8hOaIkG51bGxcbiAgICAgICAgICAgICAgICBTdG9yYWdlLl9hd2FpdFNlcnZlclN0b3JhZ2VzLnNldChrZXkgKyAnJywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgU3RvcmFnZS5fcmVtb3ZlU3RvcmFnZURhdGEoa2V5KVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOaOqOmAgeWIsOacjeWKoeWZqFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHN0YXRpYyBmbHVzaCgpIHtcblxuICAgICAgICAgICAgaWYgKFN0b3JhZ2UuX2F3YWl0U2VydmVyU3RvcmFnZXMuc2l6ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBkYXRhID0ge307XG4gICAgICAgICAgICBTdG9yYWdlLl9hd2FpdFNlcnZlclN0b3JhZ2VzLmZvckVhY2goKHYsIGspID0+IHtcbiAgICAgICAgICAgICAgICBkYXRhW2tdID0gdjtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIE5ldE1nci5pbnMucHV0VXNlckRhdGEoZGF0YSkudGhlbigocmVzdWx0OiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIC8vIFN0b3JhZ2UuX2F3YWl0U2VydmVyU3RvcmFnZXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgU3RvcmFnZS5fYXdhaXRTZXJ2ZXJTdG9yYWdlcy5jbGVhcigpO1xuXG4gICAgICAgICAgICAvLyBsZXQga2V5cyA9IFtdXG4gICAgICAgICAgICAvLyBTdG9yYWdlLl9hd2FpdFNlcnZlclN0b3JhZ2VzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIC8vICAgICBrZXlzLnB1c2goa2V5KVxuICAgICAgICAgICAgLy8gICAgIGNvbnN0IGRhdGE6IHsga2V5LCB2YWx1ZTogc3RyaW5nLCBvcHQsIHRva2VuPywgbWF4PywgbWluP30gPSA8YW55Pnt9O1xuICAgICAgICAgICAgLy8gICAgIGRhdGEua2V5ID0ga2V5XG4gICAgICAgICAgICAvLyAgICAgZGF0YS52YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgICAgICAgICAvLyAgICAgZGF0YS5vcHQgPSAnc2V0JztcbiAgICAgICAgICAgIC8vICAgICBuZXRNZ3IucHVzaFJlcyhkYXRhLCBmYWxzZSlcbiAgICAgICAgICAgIC8vIH0pXG5cbiAgICAgICAgICAgIC8vIGlmIChrZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vICAgICBsZXQgcmVzdWx0ID0gbmV0TWdyLnN1Ym1pdFJlcygpO1xuICAgICAgICAgICAgLy8gICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgcmVzdWx0LnRoZW4odiA9PiB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBpZiAodi5lcnIgPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIFN0b3JhZ2UuX2F3YWl0U2VydmVyU3RvcmFnZXMuZGVsZXRlKGtleSlcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOiOt+WPluacrOWcsOe8k+WtmFxuICAgICAgICAgKiBAcGFyYW0ga2V5IFxuICAgICAgICAgKiBAcGFyYW0gZGVmRGF0YSBcbiAgICAgICAgICovXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9nZXRMb2NhbFN0b3JhZ2VEYXRhKGtleTogc3RyaW5nIHwgbnVtYmVyLCBkZWZEYXRhPzogYW55KTogYW55IHtcblxuICAgICAgICAgICAgbGV0IGRhdGEgPSBTdG9yYWdlLl9sb2NhbFN0b3JhZ2VzLmdldChrZXkgKyAnJylcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGEgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5ICsgJycpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGEgfHwgZGVmRGF0YVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOiuvue9ruacrOWcsOe8k+WtmFxuICAgICAgICAgKiBAcGFyYW0ga2V5IFxuICAgICAgICAgKiBAcGFyYW0gZGF0YSBcbiAgICAgICAgICovXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9zZXRMb2NhbFN0b3JhZ2VEYXRhKGtleTogc3RyaW5nIHwgbnVtYmVyLCBkYXRhOiBhbnkpIHtcbiAgICAgICAgICAgIFN0b3JhZ2UuX2xvY2FsU3RvcmFnZXMuc2V0KGtleSArICcnLCBkYXRhKTtcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXkgKyAnJywgZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog56e76Zmk5pys5Zyw57yT5a2YXG4gICAgICAgICAqIEBwYXJhbSBrZXkgXG4gICAgICAgICAqL1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBfcmVtb3ZlU3RvcmFnZURhdGEoa2V5OiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICAgICAgICAgIFN0b3JhZ2UuX2xvY2FsU3RvcmFnZXMuZGVsZXRlKGtleSArICcnKVxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSArICcnKVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgUmluZ1N0b3JhZ2Uge1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgREFZX0tFWTogc3RyaW5nID0gJ19fUklOR19EQVlfS0VZX18nXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgV0VFS19LRVk6IHN0cmluZyA9ICdfX1JJTkdfV0VFS19LRVlfXydcbiAgICAgICAgcHVibGljIHN0YXRpYyByZWFkb25seSBNT05USF9LRVk6IHN0cmluZyA9ICdfX1JJTkdfTU9OVEhfS0VZX18nXG5cbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX3JzOiBNYXA8c3RyaW5nLCBSaW5nU3RvcmFnZT47XG4gICAgICAgIHByaXZhdGUgX19SSU5HX0tFWV9fOiBzdHJpbmcgPSBcIlwiXG5cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBcbiAgICAgICAgICogQHBhcmFtIGtleSBcbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKGtleTogc3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9fUklOR19LRVlfXyA9IGtleTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgZ2V0Tm93VGltZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBEYXRlLm5vdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2coazogc3RyaW5nKTogUmluZ1N0b3JhZ2Uge1xuICAgICAgICAgICAgaWYgKFJpbmdTdG9yYWdlLl9ycyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgUmluZ1N0b3JhZ2UuX3JzID0gbmV3IE1hcDxzdHJpbmcsIFJpbmdTdG9yYWdlPigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHM6IFJpbmdTdG9yYWdlID0gUmluZ1N0b3JhZ2UuX3JzLmdldChrKVxuICAgICAgICAgICAgaWYgKCFzKSB7XG4gICAgICAgICAgICAgICAgcyA9IG5ldyBSaW5nU3RvcmFnZShrKVxuICAgICAgICAgICAgICAgIFJpbmdTdG9yYWdlLl9ycy5zZXQoaywgcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOavj+WkqVxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHN0YXRpYyBkYXkoKTogUmluZ1N0b3JhZ2Uge1xuICAgICAgICAgICAgcmV0dXJuIFJpbmdTdG9yYWdlLl9nKFJpbmdTdG9yYWdlLkRBWV9LRVkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOavj+WRqFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHN0YXRpYyB3ZWVrKCk6IFJpbmdTdG9yYWdlIHtcbiAgICAgICAgICAgIHJldHVybiBSaW5nU3RvcmFnZS5fZyhSaW5nU3RvcmFnZS5XRUVLX0tFWSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog5q+P5ZGoXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc3RhdGljIG1vbnRoKCk6IFJpbmdTdG9yYWdlIHtcbiAgICAgICAgICAgIHJldHVybiBSaW5nU3RvcmFnZS5fZyhSaW5nU3RvcmFnZS5NT05USF9LRVkpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICog5p6E6YCg5LiA5Liq5pe26Ze05oizXG4gICAgICAgICAqL1xuICAgICAgICBwcml2YXRlIGNyZWF0ZVRpbWVzdGFtcCgpOiBudW1iZXIge1xuICAgICAgICAgICAgbGV0IGQ6IERhdGUgPSBuZXcgRGF0ZSh0aGlzLmdldE5vd1RpbWUoKSk7XG4gICAgICAgICAgICBpZiAodGhpcy5fX1JJTkdfS0VZX18gPT0gUmluZ1N0b3JhZ2UuTU9OVEhfS0VZKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuZ2V0RnVsbFllYXIoKSA8PCAxNiB8IGQuZ2V0TW9udGgoKSA8PCA4O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9fUklOR19LRVlfXyA9PSBSaW5nU3RvcmFnZS5XRUVLX0tFWSkge1xuICAgICAgICAgICAgICAgIGQuc2V0SG91cnMoMCk7XG4gICAgICAgICAgICAgICAgZC5zZXRNaW51dGVzKDApO1xuICAgICAgICAgICAgICAgIGQuc2V0U2Vjb25kcygwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5nZXRUaW1lKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmdldEZ1bGxZZWFyKCkgPDwgMTYgfCBkLmdldE1vbnRoKCkgPDwgOCB8IGQuZ2V0RGF0ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICog5ZKM5LuK5aSp55qE5beu5YC8XG4gICAgICAgICAqIEBwYXJhbSB0IFxuICAgICAgICAgKi9cbiAgICAgICAgcHJpdmF0ZSBkaWZmRGF5KHQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgICAgICBsZXQgZDogRGF0ZSA9IG5ldyBEYXRlKHRoaXMuZ2V0Tm93VGltZSgpKVxuICAgICAgICAgICAgZC5zZXRIb3VycygwKVxuICAgICAgICAgICAgZC5zZXRNaW51dGVzKDApXG4gICAgICAgICAgICBkLnNldFNlY29uZHMoMClcbiAgICAgICAgICAgIHJldHVybiAoZC5nZXRUaW1lKCkgLSB0KSAvIDg2NDAwMDAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOiOt+WPlmRhdGFcbiAgICAgICAgICovXG4gICAgICAgIHByaXZhdGUgZ2V0U3RvcmFnZURhdGEoKTogYW55IHtcbiAgICAgICAgICAgIGxldCBjaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgICAgICBsZXQgdDogbnVtYmVyID0gdGhpcy5jcmVhdGVUaW1lc3RhbXAoKVxuICAgICAgICAgICAgbGV0IGRhdGEgPSBTdG9yYWdlLmdldE9iamVjdCh0aGlzLl9fUklOR19LRVlfXywgeyB0OiAwLCBkOiB7fSB9KSBhcyBhbnlcbiAgICAgICAgICAgIGlmICh0aGlzLl9fUklOR19LRVlfXyA9PSBSaW5nU3RvcmFnZS5XRUVLX0tFWSkge1xuICAgICAgICAgICAgICAgIGNoYW5nZWQgPSB0aGlzLmRpZmZEYXkoZGF0YS50KSA+IDdcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlZCA9IGRhdGEudCAhPSB0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgZGF0YS50ID0gdDtcbiAgICAgICAgICAgICAgICBkYXRhLmQgPSB7fVxuICAgICAgICAgICAgICAgIFN0b3JhZ2Uuc2V0T2JqZWN0KHRoaXMuX19SSU5HX0tFWV9fLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGRlbGV0ZVZhbHVlKGtleTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgICAgICBrZXkgPSBrZXkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXRTdG9yYWdlRGF0YSgpO1xuICAgICAgICAgICAgZGVsZXRlIGRhdGFba2V5XTtcbiAgICAgICAgICAgIFN0b3JhZ2Uuc2V0T2JqZWN0KHRoaXMuX19SSU5HX0tFWV9fLCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDorr7nva7lgLxcbiAgICAgICAgICogQHBhcmFtIGtleSBcbiAgICAgICAgICogQHBhcmFtIHZhbHVlIFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNldFZhbHVlKGtleTogc3RyaW5nIHwgbnVtYmVyLCB2YWx1ZTogYW55KSB7XG4gICAgICAgICAgICBrZXkgPSBrZXkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXRTdG9yYWdlRGF0YSgpO1xuICAgICAgICAgICAgZGF0YS5kW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIFN0b3JhZ2Uuc2V0T2JqZWN0KHRoaXMuX19SSU5HX0tFWV9fLCBkYXRhKVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOiOt+WPluWAvFxuICAgICAgICAgKiBAcGFyYW0ga2V5IFxuICAgICAgICAgKiBAcGFyYW0gdmFsdWUgXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZ2V0VmFsdWUoa2V5OiBzdHJpbmcgfCBudW1iZXIsIGRlZlZhbDogYW55KTogYW55IHtcbiAgICAgICAgICAgIGtleSA9IGtleS50b1N0cmluZygpO1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldFN0b3JhZ2VEYXRhKCk7XG4gICAgICAgICAgICBsZXQgdmFsdWU6IGFueSA9IGRhdGEuZFtrZXldO1xuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmVmFsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiJdfQ==