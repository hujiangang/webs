
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/Table/BaseTable.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b0419LwSphOIbTyanvd2RyF', 'BaseTable');
// Script/Base/Manager/Table/BaseTable.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTable = void 0;
var BytesTable_1 = require("./BytesTable");
var Util_1 = require("../../Utils/Util");
var Log_1 = require("../../Utils/Log");
var BaseTable = /** @class */ (function (_super) {
    __extends(BaseTable, _super);
    function BaseTable(key, clsName, VOClass, afpb) {
        var _this = _super.call(this, afpb) || this;
        _this.KEY = null;
        _this._maxKey = 0;
        _this.KEY = key;
        _this.CLS = clsName;
        _this._VOClass = VOClass;
        return _this;
    }
    BaseTable.prototype.readyOK = function (data) {
        var _this = this;
        var _data = [];
        if (this._VOClass != null) {
            data.forEach(function (d) {
                var c = new _this._VOClass(d);
                _data.push(c);
            });
        }
        else {
            _data = data;
        }
        this._data = _data;
        this._tables = new Map();
        if (this.KEY != null && this.KEY.length > 0) {
            var k_1;
            _data.forEach(function (item) {
                k_1 = _this._createKey(item);
                if (k_1 != null && k_1 != undefined) {
                    if (Util_1.Util.Tool.isNumber(k_1)) {
                        _this._maxKey = Math.max(_this._maxKey, k_1);
                    }
                    _this._tables.set(k_1, item);
                }
            });
        }
        this._isReady = true;
        Log_1.Log.i("\u6570\u636E\u8868[" + this.CLS + "] \u52A0\u8F7D\u6210\u529F");
    };
    BaseTable.prototype._createKey = function (item) {
        var k = "";
        if (this.KEY instanceof Array) {
            var karr_1 = [];
            this.KEY.forEach(function (KEY) {
                karr_1.push(item[KEY]);
            });
            k = karr_1.join("_");
        }
        else {
            k = item[this.KEY];
        }
        return k;
    };
    /**
     * 通过传入的主键来获取对象
     * @param key
     */
    BaseTable.prototype.getByPrimaryKey = function (key) {
        return this._tables ? this._tables.get(key) : null;
    };
    /**
     * 多个主键时用这个取值
     * @param keys
     */
    BaseTable.prototype.getByPrimaryKeys = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        var k = keys.join("_");
        return this._tables.get(k);
    };
    /** 获取所有的data*/
    BaseTable.prototype.getData = function () {
        return this._data;
    };
    /**
     * 获得最大的key值
     */
    BaseTable.prototype.getMaxPrimaryKey = function () {
        return this._maxKey;
    };
    return BaseTable;
}(BytesTable_1.BytesTable));
exports.BaseTable = BaseTable;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxUYWJsZVxcQmFzZVRhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFDMUMseUNBQXdDO0FBQ3hDLHVDQUFzQztBQUV0QztJQUFxQyw2QkFBVTtJQVUzQyxtQkFBWSxHQUEyQixFQUFFLE9BQWUsRUFBRSxPQUEyQixFQUFFLElBQUk7UUFBM0YsWUFDSSxrQkFBTSxJQUFJLENBQUMsU0FJZDtRQVJTLFNBQUcsR0FBMkIsSUFBSSxDQUFDO1FBQ25DLGFBQU8sR0FBRyxDQUFDLENBQUM7UUFJbEIsS0FBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixLQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQztRQUNuQixLQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQzs7SUFDNUIsQ0FBQztJQUVTLDJCQUFPLEdBQWpCLFVBQWtCLElBQWM7UUFBaEMsaUJBMkJDO1FBMUJHLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQTtRQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7Z0JBQ1YsSUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2pCLENBQUMsQ0FBQyxDQUFBO1NBQ0w7YUFBTTtZQUNILEtBQUssR0FBRyxJQUFJLENBQUM7U0FDaEI7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFRLENBQUM7UUFDL0IsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekMsSUFBSSxHQUFDLENBQUM7WUFDTixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDZCxHQUFDLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDekIsSUFBSSxHQUFDLElBQUksSUFBSSxJQUFJLEdBQUMsSUFBSSxTQUFTLEVBQUU7b0JBQzdCLElBQUksV0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBQyxDQUFDLEVBQUU7d0JBQ3ZCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLEdBQUMsQ0FBQyxDQUFBO3FCQUMzQztvQkFDRCxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7aUJBQzVCO1lBQ0wsQ0FBQyxDQUFDLENBQUE7U0FDTDtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFNBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQU8sSUFBSSxDQUFDLEdBQUcsK0JBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTyw4QkFBVSxHQUFsQixVQUFtQixJQUFPO1FBQ3RCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNYLElBQUksSUFBSSxDQUFDLEdBQUcsWUFBWSxLQUFLLEVBQUU7WUFDM0IsSUFBSSxNQUFJLEdBQUcsRUFBRSxDQUFBO1lBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO2dCQUNoQixNQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ3hCLENBQUMsQ0FBQyxDQUFBO1lBQ0YsQ0FBQyxHQUFHLE1BQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDckI7YUFBTTtZQUNILENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ3JCO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksbUNBQWUsR0FBdEIsVUFBdUIsR0FBTTtRQUN6QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLG9DQUFnQixHQUF2QjtRQUF3QixjQUFtQjthQUFuQixVQUFtQixFQUFuQixxQkFBbUIsRUFBbkIsSUFBbUI7WUFBbkIseUJBQW1COztRQUN2QyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDOUIsQ0FBQztJQUVELGVBQWU7SUFDUiwyQkFBTyxHQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7T0FFRztJQUNJLG9DQUFnQixHQUF2QjtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQXhGQSxBQXdGQyxDQXhGb0MsdUJBQVUsR0F3RjlDO0FBeEZZLDhCQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnl0ZXNUYWJsZSB9IGZyb20gXCIuL0J5dGVzVGFibGVcIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vVXRpbHMvVXRpbFwiO1xuaW1wb3J0IHsgTG9nIH0gZnJvbSBcIi4uLy4uL1V0aWxzL0xvZ1wiO1xuXG5leHBvcnQgY2xhc3MgQmFzZVRhYmxlPEssIFQ+IGV4dGVuZHMgQnl0ZXNUYWJsZSB7XG5cbiAgICBwcm90ZWN0ZWQgX2RhdGE6IEFycmF5PFQ+O1xuICAgIHByb3RlY3RlZCBfdGFibGVzOiBNYXA8YW55LCBUPjtcbiAgICBwcm90ZWN0ZWQgX2NsYXNzOiBUO1xuICAgIHByb3RlY3RlZCBfVk9DbGFzczogeyBuZXcodHlwZTogYW55KSB9XG5cbiAgICBwcm90ZWN0ZWQgS0VZOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+ID0gbnVsbDtcbiAgICBwcm90ZWN0ZWQgX21heEtleSA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihrZXk6IHN0cmluZyB8IEFycmF5PHN0cmluZz4sIGNsc05hbWU6IHN0cmluZywgVk9DbGFzczogeyBuZXcodHlwZTogYW55KSB9LCBhZnBiKSB7XG4gICAgICAgIHN1cGVyKGFmcGIpO1xuICAgICAgICB0aGlzLktFWSA9IGtleTtcbiAgICAgICAgdGhpcy5DTFMgPSBjbHNOYW1lO1xuICAgICAgICB0aGlzLl9WT0NsYXNzID0gVk9DbGFzcztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlPSyhkYXRhOiBBcnJheTxUPikge1xuICAgICAgICBsZXQgX2RhdGEgPSBbXVxuICAgICAgICBpZiAodGhpcy5fVk9DbGFzcyAhPSBudWxsKSB7XG4gICAgICAgICAgICBkYXRhLmZvckVhY2goZCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGMgPSBuZXcgdGhpcy5fVk9DbGFzcyhkKTtcbiAgICAgICAgICAgICAgICBfZGF0YS5wdXNoKGMpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX2RhdGEgPSBkYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZGF0YSA9IF9kYXRhO1xuICAgICAgICB0aGlzLl90YWJsZXMgPSBuZXcgTWFwPEssIFQ+KCk7XG4gICAgICAgIGlmICh0aGlzLktFWSAhPSBudWxsICYmIHRoaXMuS0VZLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBrO1xuICAgICAgICAgICAgX2RhdGEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBrID0gdGhpcy5fY3JlYXRlS2V5KGl0ZW0pXG4gICAgICAgICAgICAgICAgaWYgKGsgIT0gbnVsbCAmJiBrICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbC5Ub29sLmlzTnVtYmVyKGspKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXhLZXkgPSBNYXRoLm1heCh0aGlzLl9tYXhLZXksIGspXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFibGVzLnNldChrLCBpdGVtKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNSZWFkeSA9IHRydWU7XG4gICAgICAgIExvZy5pKGDmlbDmja7ooahbJHt0aGlzLkNMU31dIOWKoOi9veaIkOWKn2ApO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZUtleShpdGVtOiBUKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGsgPSBcIlwiO1xuICAgICAgICBpZiAodGhpcy5LRVkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgbGV0IGthcnIgPSBbXVxuICAgICAgICAgICAgdGhpcy5LRVkuZm9yRWFjaChLRVkgPT4ge1xuICAgICAgICAgICAgICAgIGthcnIucHVzaChpdGVtW0tFWV0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgayA9IGthcnIuam9pbihcIl9cIilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGsgPSBpdGVtW3RoaXMuS0VZXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmAmui/h+S8oOWFpeeahOS4u+mUruadpeiOt+WPluWvueixoVxuICAgICAqIEBwYXJhbSBrZXkgXG4gICAgICovXG4gICAgcHVibGljIGdldEJ5UHJpbWFyeUtleShrZXk6IEspOiBUIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhYmxlcyA/IHRoaXMuX3RhYmxlcy5nZXQoa2V5KSA6IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5aSa5Liq5Li76ZSu5pe255So6L+Z5Liq5Y+W5YC8XG4gICAgICogQHBhcmFtIGtleXMgXG4gICAgICovXG4gICAgcHVibGljIGdldEJ5UHJpbWFyeUtleXMoLi4ua2V5czogQXJyYXk8YW55Pikge1xuICAgICAgICBsZXQgayA9IGtleXMuam9pbihcIl9cIilcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhYmxlcy5nZXQoaylcbiAgICB9XG5cbiAgICAvKiog6I635Y+W5omA5pyJ55qEZGF0YSovXG4gICAgcHVibGljIGdldERhdGEoKTogQXJyYXk8VD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflvpfmnIDlpKfnmoRrZXnlgLxcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0TWF4UHJpbWFyeUtleSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4S2V5O1xuICAgIH1cbn1cblxuIl19