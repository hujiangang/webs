"use strict";
cc._RF.push(module, 'c6bbfYLRvZP57Iuq/3RjsVc', 'MultipleGridColBase');
// Script/Logic/Match3/Model/multipleGridCol/MultipleGridColBase.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MultipleGridColBase = /** @class */ (function () {
    function MultipleGridColBase(data, index) {
        this.index = 0;
        this._cfg = null;
        this._count = 0;
        this._pool = {};
        this.index = index;
        this._cfg = [];
        for (var i = data.length; i--;) {
            if (data[i].index == undefined || data[i].index == index) {
                this._cfg.push(data[i]);
            }
        }
        this._cfg.sort(function (a, b) {
            return a.y - b.y;
        });
    }
    Object.defineProperty(MultipleGridColBase.prototype, "config", {
        get: function () {
            return this._cfg;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MultipleGridColBase.prototype, "count", {
        get: function () {
            return this._count;
        },
        enumerable: false,
        configurable: true
    });
    MultipleGridColBase.prototype.getData = function () {
        return this._pool;
    };
    MultipleGridColBase.prototype.checkItemCompletByIndex = function (idx) {
        var result = (this._pool[idx] && this._pool[idx].length <= 0);
        if (result) {
            this._count--;
            delete this._pool[idx];
        }
        return result;
    };
    MultipleGridColBase.prototype.updateItemCountByPos = function (pos) {
        for (var idx in this._pool) {
            var items = this._pool[idx];
            for (var i = items.length; i--;) {
                var item = items[i];
                if (pos.x == item.x && pos.y == item.y) {
                    items.splice(i, 1);
                    return idx;
                }
            }
        }
    };
    return MultipleGridColBase;
}());
exports.default = MultipleGridColBase;

cc._RF.pop();