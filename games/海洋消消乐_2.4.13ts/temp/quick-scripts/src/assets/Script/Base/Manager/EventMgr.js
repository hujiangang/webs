"use strict";
cc._RF.push(module, 'e4b7057MSNBwZy6V+kZ0QsJ', 'EventMgr');
// Script/Base/Manager/EventMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataPool_1 = require("../DataPool");
var SingletonFactory_1 = require("../Utils/SingletonFactory");
var EventData = /** @class */ (function () {
    function EventData() {
    }
    EventData.prototype.destory = function () {
        this.eventHandler = null;
        this.thisArg = null;
        this.isOnce = false;
    };
    return EventData;
}());
var EventMgr = /** @class */ (function () {
    function EventMgr() {
        this._dataPool = null;
        this.events = null;
        this._dataPool = new DataPool_1.DataPool(20, EventData);
        this.events = new Map();
    }
    // 是否已注册
    EventMgr.prototype.hasRegister = function (event, eventHandler, thisArg) {
        var ed = null;
        event.forEach(function (e) {
            if (e.eventHandler == eventHandler && e.thisArg == thisArg) {
                ed = e;
            }
        });
        return ed;
    };
    EventMgr.prototype.register = function (id, eventHandler, thisArg) {
        var event = this.events.get(id);
        if (!event) {
            event = new Set();
            this.events.set(id, event);
        }
        if (this.hasRegister(event, eventHandler, thisArg)) {
            console.error("事件重复注册");
        }
        else {
            var eventData = this._dataPool.getData();
            eventData.eventHandler = eventHandler;
            eventData.thisArg = thisArg;
            eventData.isOnce = false;
            event.add(eventData);
        }
    };
    EventMgr.prototype.once = function (id, eventHandler, thisArg) {
        var event = this.events.get(id);
        if (!event) {
            event = new Set();
            this.events.set(id, event);
        }
        if (this.hasRegister(event, eventHandler)) {
            console.error("事件重复注册");
        }
        else {
            var eventData = this._dataPool.getData();
            eventData.eventHandler = eventHandler;
            eventData.thisArg = thisArg;
            eventData.isOnce = true;
            event.add(eventData);
        }
    };
    /**
     * 反注册
     * @param id
     * @param thisArg
     */
    EventMgr.prototype.unRegister = function (id, eventHandler, thisArg) {
        var event = this.events.get(id);
        if (!event) {
            return;
        }
        var d = this.hasRegister(event, eventHandler, thisArg);
        if (d != null) {
            event.delete(d);
            this._dataPool.freeData(d);
        }
    };
    /**
     * 反注册所有事件
     */
    EventMgr.prototype.destory = function () {
        this.events = null;
        this.events = new Map();
    };
    /**
     * 发送事件
     * @param id
     * @param data
     */
    EventMgr.prototype.send = function (id) {
        var _this = this;
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        var event = this.events.get(id);
        if (!event) {
            return;
        }
        event.forEach(function (d) {
            d.eventHandler.apply(d.thisArg, data);
            if (d.isOnce) {
                event.delete(d);
                _this._dataPool.freeData(d);
            }
        });
    };
    EventMgr.ins = SingletonFactory_1.SingletonFactory.getInstance(EventMgr);
    return EventMgr;
}());
exports.default = EventMgr;
window["EventMgr"] = EventMgr;

cc._RF.pop();