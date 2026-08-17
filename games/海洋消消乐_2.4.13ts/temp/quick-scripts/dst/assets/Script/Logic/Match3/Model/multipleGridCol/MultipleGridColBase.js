
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/multipleGridCol/MultipleGridColBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcbXVsdGlwbGVHcmlkQ29sXFxNdWx0aXBsZUdyaWRDb2xCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7SUFVSSw2QkFBWSxJQUFhLEVBQUUsS0FBSztRQVJ0QixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBRWxCLFNBQUksR0FBWSxJQUFJLENBQUM7UUFFckIsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUVYLFVBQUssR0FBaUMsRUFBRSxDQUFDO1FBRy9DLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHO1lBQzVCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLEVBQUU7Z0JBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNCO1NBQ0o7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHNCQUFXLHVDQUFNO2FBQWpCO1lBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsc0NBQUs7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFTSxxQ0FBTyxHQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFTSxxREFBdUIsR0FBOUIsVUFBK0IsR0FBb0I7UUFDL0MsSUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVNLGtEQUFvQixHQUEzQixVQUE0QixHQUFZO1FBQ3BDLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN4QixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRztnQkFDN0IsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUU7b0JBQ3BDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNuQixPQUFPLEdBQUcsQ0FBQztpQkFDZDthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBS0wsMEJBQUM7QUFBRCxDQTVEQSxBQTREQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR25vbWUgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9JbnRlcmZhY2UvTGV2ZWwvSUxldmVsXCI7XG5pbXBvcnQgR3JvdW5kQ2VsbE1vZGVsIGZyb20gXCIuLi9Hcm91bmRDZWxsTW9kZWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgTXVsdGlwbGVHcmlkQ29sQmFzZSB7XG5cbiAgICBwcm90ZWN0ZWQgaW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBwcm90ZWN0ZWQgX2NmZzogR25vbWVbXSA9IG51bGw7XG5cbiAgICBwcm90ZWN0ZWQgX2NvdW50ID0gMDtcblxuICAgIHByb3RlY3RlZCBfcG9vbDogeyBbaW54OiBudW1iZXJdOiBjYy5WZWMyW10gfSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IoZGF0YTogR25vbWVbXSwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLl9jZmcgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGRhdGEubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBpZiAoZGF0YVtpXS5pbmRleCA9PSB1bmRlZmluZWQgfHwgZGF0YVtpXS5pbmRleCA9PSBpbmRleCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NmZy5wdXNoKGRhdGFbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NmZy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYS55IC0gYi55XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IEdub21lW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2ZnO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRhKCk6IHsgW2lueDogbnVtYmVyXTogY2MuVmVjMltdIH0ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcG9vbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2hlY2tJdGVtQ29tcGxldEJ5SW5kZXgoaWR4OiBudW1iZXIgfCBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gKHRoaXMuX3Bvb2xbaWR4XSAmJiB0aGlzLl9wb29sW2lkeF0ubGVuZ3RoIDw9IDApO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb3VudC0tO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3Bvb2xbaWR4XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVJdGVtQ291bnRCeVBvcyhwb3M6IGNjLlZlYzIpOiBudW1iZXIgfCBzdHJpbmcge1xuICAgICAgICBmb3IgKGxldCBpZHggaW4gdGhpcy5fcG9vbCkge1xuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLl9wb29sW2lkeF07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gaXRlbXMubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIGlmIChwb3MueCA9PSBpdGVtLnggJiYgcG9zLnkgPT0gaXRlbS55KSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlkeDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYWJzdHJhY3Qgc3luYzJWaWV3KGdyb3VuZExpc3Q6IEdyb3VuZENlbGxNb2RlbFtdW10pO1xuICAgIHB1YmxpYyBhYnN0cmFjdCBvbkNvbXBsZXQoaW5kZXg6IG51bWJlciwgdG9wUG9pbnQ6IGNjLlZlYzIpO1xuXG59Il19