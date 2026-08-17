"use strict";
cc._RF.push(module, '63603frOBBDxLHcQmZID8Bb', 'CacheMgr');
// Script/Base/Manager/CacheMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = require("../Utils/Log");
var LRUCache_1 = require("../Utils/LRUCache");
var EventMgr_1 = require("./EventMgr");
var SingletonFactory_1 = require("../Utils/SingletonFactory");
var Event_1 = require("../../Logic/Data/Const/Event");
var CacheMgr = /** @class */ (function () {
    function CacheMgr() {
        this.lru = new LRUCache_1.LRUCache(300); //内存中存在的缓存资源数的警告值
        var self = this;
        cc.loader['_cache'] = new Proxy(cc.loader['_cache'], {
            get: function (target, property) {
                if (property in target) {
                    self.getCache(property, target[property]);
                    return target[property];
                }
            },
            set: function (target, property, value) {
                self.setCache(property, value);
                target[property] = value;
                return true;
            },
            deleteProperty: function (target, property) {
                self.deleteCache(property, target[property]) &&
                    delete target[property];
                return true;
            }
        });
    }
    CacheMgr.prototype.getCache = function (property, cache) {
        Log_1.Log.log(Log_1.LOG_TAG.CACHE, property);
        this.lru.get(property);
    };
    CacheMgr.prototype.setCache = function (property, cache) {
        Log_1.Log.log(Log_1.LOG_TAG.CACHE, property);
        var remove = this.lru.pack(property, cache);
        if (remove) {
            EventMgr_1.default.ins.send(Event_1.Event.System.CacheWarning);
        }
    };
    CacheMgr.prototype.deleteCache = function (property, cache) {
        Log_1.Log.log(Log_1.LOG_TAG.CACHE, property);
        this.lru.remove(property);
        return true;
    };
    CacheMgr.ins = SingletonFactory_1.SingletonFactory.getInstance(CacheMgr);
    return CacheMgr;
}());
exports.default = CacheMgr;

cc._RF.pop();