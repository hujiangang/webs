
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/EventMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxFdmVudE1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUFrRDtBQUNsRCw4REFBNkQ7QUFFN0Q7SUFBQTtJQVVBLENBQUM7SUFMVSwyQkFBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7SUFDdkIsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FWQSxBQVVDLElBQUE7QUFFRDtJQVFJO1FBSlEsY0FBUyxHQUF3QixJQUFJLENBQUM7UUFFdEMsV0FBTSxHQUF5QyxJQUFJLENBQUE7UUFHdkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLG1CQUFRLENBQVksRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQW1DLENBQUE7SUFDNUQsQ0FBQztJQUVELFFBQVE7SUFDQSw4QkFBVyxHQUFuQixVQUFvQixLQUFxQixFQUFFLFlBQXNCLEVBQUUsT0FBYTtRQUM1RSxJQUFJLEVBQUUsR0FBYyxJQUFJLENBQUE7UUFDeEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7WUFDWCxJQUFJLENBQUMsQ0FBQyxZQUFZLElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxFQUFFO2dCQUN4RCxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ1Y7UUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNGLE9BQU8sRUFBRSxDQUFBO0lBQ2IsQ0FBQztJQUVNLDJCQUFRLEdBQWYsVUFBZ0IsRUFBbUIsRUFBRSxZQUFzQixFQUFFLE9BQWE7UUFFdEUsSUFBSSxLQUFLLEdBQStCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxD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QyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUNyQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ1YsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDZixLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUM3QjtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQTFHYSxZQUFHLEdBQWEsbUNBQWdCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBNEd6RSxlQUFDO0NBOUdELEFBOEdDLElBQUE7a0JBOUdvQixRQUFRO0FBZ0g3QixNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YVBvb2wsIElQb29sRGF0YSB9IGZyb20gXCIuLi9EYXRhUG9vbFwiO1xuaW1wb3J0IHsgU2luZ2xldG9uRmFjdG9yeSB9IGZyb20gXCIuLi9VdGlscy9TaW5nbGV0b25GYWN0b3J5XCI7XG5cbmNsYXNzIEV2ZW50RGF0YSBpbXBsZW1lbnRzIElQb29sRGF0YSB7XG4gICAgcHVibGljIGV2ZW50SGFuZGxlcjogRnVuY3Rpb25cbiAgICBwdWJsaWMgdGhpc0FyZzogYW55XG4gICAgcHVibGljIGlzT25jZTogYm9vbGVhbjtcblxuICAgIHB1YmxpYyBkZXN0b3J5KCkge1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlciA9IG51bGw7XG4gICAgICAgIHRoaXMudGhpc0FyZyA9IG51bGw7XG4gICAgICAgIHRoaXMuaXNPbmNlID0gZmFsc2VcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50TWdyIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgaW5zOiBFdmVudE1nciA9IFNpbmdsZXRvbkZhY3RvcnkuZ2V0SW5zdGFuY2UoRXZlbnRNZ3IpO1xuXG4gICAgcHJpdmF0ZSBfZGF0YVBvb2w6IERhdGFQb29sPEV2ZW50RGF0YT4gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBldmVudHM6IE1hcDxzdHJpbmcgfCBudW1iZXIsIFNldDxFdmVudERhdGE+PiA9IG51bGxcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fZGF0YVBvb2wgPSBuZXcgRGF0YVBvb2w8RXZlbnREYXRhPigyMCwgRXZlbnREYXRhKTtcbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgTWFwPHN0cmluZyB8IG51bWJlciwgU2V0PEV2ZW50RGF0YT4+KClcbiAgICB9XG5cbiAgICAvLyDmmK/lkKblt7Lms6jlhoxcbiAgICBwcml2YXRlIGhhc1JlZ2lzdGVyKGV2ZW50OiBTZXQ8RXZlbnREYXRhPiwgZXZlbnRIYW5kbGVyOiBGdW5jdGlvbiwgdGhpc0FyZz86IGFueSk6IEV2ZW50RGF0YSB7XG4gICAgICAgIGxldCBlZDogRXZlbnREYXRhID0gbnVsbFxuICAgICAgICBldmVudC5mb3JFYWNoKGUgPT4ge1xuICAgICAgICAgICAgaWYgKGUuZXZlbnRIYW5kbGVyID09IGV2ZW50SGFuZGxlciAmJiBlLnRoaXNBcmcgPT0gdGhpc0FyZykge1xuICAgICAgICAgICAgICAgIGVkID0gZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGVkXG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyKGlkOiBzdHJpbmcgfCBudW1iZXIsIGV2ZW50SGFuZGxlcjogRnVuY3Rpb24sIHRoaXNBcmc/OiBhbnkpOiB2b2lkIHtcblxuICAgICAgICBsZXQgZXZlbnQ6IFNldDxFdmVudERhdGE+IHwgdW5kZWZpbmVkID0gdGhpcy5ldmVudHMuZ2V0KGlkKVxuICAgICAgICBpZiAoIWV2ZW50KSB7XG4gICAgICAgICAgICBldmVudCA9IG5ldyBTZXQ8RXZlbnREYXRhPigpXG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXQoaWQsIGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhhc1JlZ2lzdGVyKGV2ZW50LCBldmVudEhhbmRsZXIsIHRoaXNBcmcpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5LqL5Lu26YeN5aSN5rOo5YaMXCIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgZXZlbnREYXRhID0gdGhpcy5fZGF0YVBvb2wuZ2V0RGF0YSgpXG4gICAgICAgICAgICBldmVudERhdGEuZXZlbnRIYW5kbGVyID0gZXZlbnRIYW5kbGVyXG4gICAgICAgICAgICBldmVudERhdGEudGhpc0FyZyA9IHRoaXNBcmdcbiAgICAgICAgICAgIGV2ZW50RGF0YS5pc09uY2UgPSBmYWxzZVxuICAgICAgICAgICAgZXZlbnQuYWRkKGV2ZW50RGF0YSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbmNlKGlkOiBzdHJpbmcgfCBudW1iZXIsIGV2ZW50SGFuZGxlcjogRnVuY3Rpb24sIHRoaXNBcmc/OiBhbnkpOiB2b2lkIHtcblxuICAgICAgICBsZXQgZXZlbnQ6IFNldDxFdmVudERhdGE+IHwgdW5kZWZpbmVkID0gdGhpcy5ldmVudHMuZ2V0KGlkKVxuICAgICAgICBpZiAoIWV2ZW50KSB7XG4gICAgICAgICAgICBldmVudCA9IG5ldyBTZXQ8RXZlbnREYXRhPigpXG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXQoaWQsIGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhhc1JlZ2lzdGVyKGV2ZW50LCBldmVudEhhbmRsZXIpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5LqL5Lu26YeN5aSN5rOo5YaMXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGV2ZW50RGF0YSA9IHRoaXMuX2RhdGFQb29sLmdldERhdGEoKVxuICAgICAgICAgICAgZXZlbnREYXRhLmV2ZW50SGFuZGxlciA9IGV2ZW50SGFuZGxlclxuICAgICAgICAgICAgZXZlbnREYXRhLnRoaXNBcmcgPSB0aGlzQXJnXG4gICAgICAgICAgICBldmVudERhdGEuaXNPbmNlID0gdHJ1ZVxuICAgICAgICAgICAgZXZlbnQuYWRkKGV2ZW50RGF0YSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWPjeazqOWGjFxuICAgICAqIEBwYXJhbSBpZCBcbiAgICAgKiBAcGFyYW0gdGhpc0FyZyBcbiAgICAgKi9cbiAgICBwdWJsaWMgdW5SZWdpc3RlcihpZDogc3RyaW5nIHwgbnVtYmVyLCBldmVudEhhbmRsZXI6IEZ1bmN0aW9uLCB0aGlzQXJnOiBhbnkpOiB2b2lkIHtcblxuICAgICAgICBsZXQgZXZlbnQ6IFNldDxFdmVudERhdGE+IHwgdW5kZWZpbmVkID0gdGhpcy5ldmVudHMuZ2V0KGlkKVxuICAgICAgICBpZiAoIWV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkID0gdGhpcy5oYXNSZWdpc3RlcihldmVudCwgZXZlbnRIYW5kbGVyLCB0aGlzQXJnKTtcbiAgICAgICAgaWYgKGQgIT0gbnVsbCkge1xuICAgICAgICAgICAgZXZlbnQuZGVsZXRlKGQpO1xuICAgICAgICAgICAgdGhpcy5fZGF0YVBvb2wuZnJlZURhdGEoZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWPjeazqOWGjOaJgOacieS6i+S7tlxuICAgICAqL1xuICAgIHB1YmxpYyBkZXN0b3J5KCkge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG51bGw7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IE1hcDxzdHJpbmcgfCBudW1iZXIsIFNldDxFdmVudERhdGE+PigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWPkemAgeS6i+S7tlxuICAgICAqIEBwYXJhbSBpZCBcbiAgICAgKiBAcGFyYW0gZGF0YSBcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VuZChpZDogc3RyaW5nIHwgbnVtYmVyLCAuLi5kYXRhOiBhbnkpIHtcblxuICAgICAgICBsZXQgZXZlbnQ6IFNldDxFdmVudERhdGE+IHwgdW5kZWZpbmVkID0gdGhpcy5ldmVudHMuZ2V0KGlkKVxuICAgICAgICBpZiAoIWV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LmZvckVhY2goKGQpID0+IHtcbiAgICAgICAgICAgIGQuZXZlbnRIYW5kbGVyLmFwcGx5KGQudGhpc0FyZywgZGF0YSlcbiAgICAgICAgICAgIGlmIChkLmlzT25jZSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LmRlbGV0ZShkKVxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFQb29sLmZyZWVEYXRhKGQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG59XG5cbndpbmRvd1tcIkV2ZW50TWdyXCJdID0gRXZlbnRNZ3I7Il19