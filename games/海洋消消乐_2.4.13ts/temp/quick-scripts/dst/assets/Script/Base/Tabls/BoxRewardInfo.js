
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Tabls/BoxRewardInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6cd130NXqFLU4hAMc94Ahik', 'BoxRewardInfo');
// Script/Base/Tabls/BoxRewardInfo.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoxRewardInfo = /** @class */ (function () {
    function BoxRewardInfo(data) {
        this.id = null;
        this.content = null;
        this.rewards = null;
        this.id = data.id;
        this.content = data.content;
        this._parseRewardInfo();
    }
    BoxRewardInfo.prototype._parseRewardInfo = function () {
        var _this = this;
        if (this.content) {
            this.rewards = [];
            this.content.forEach(function (item) {
                if (item) {
                    var sc = item.split('|');
                    var type = Number(sc[0]);
                    if (type != null && type != undefined) {
                        _this.rewards.push({ type: type, count: Number(sc[1]) });
                    }
                }
            });
        }
    };
    return BoxRewardInfo;
}());
exports.default = BoxRewardInfo;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxUYWJsc1xcQm94UmV3YXJkSW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0lBRUksdUJBQVksSUFBUztRQU1MLE9BQUUsR0FBVyxJQUFJLENBQUM7UUFFbEIsWUFBTyxHQUFrQixJQUFJLENBQUM7UUFFdkMsWUFBTyxHQUEyQyxJQUFJLENBQUM7UUFUMUQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBUU8sd0NBQWdCLEdBQXhCO1FBQUEsaUJBYUM7UUFaRyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQ3JCLElBQUksSUFBSSxFQUFFO29CQUNOLElBQU0sRUFBRSxHQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2hDLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0IsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7d0JBQ25DLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDM0Q7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0E1QkEsQUE0QkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm94UmV3YXJkSW5mbyB7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcbiAgICAgICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGRhdGEuY29udGVudDtcbiAgICAgICAgdGhpcy5fcGFyc2VSZXdhcmRJbmZvKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlYWRvbmx5IGlkOiBudW1iZXIgPSBudWxsO1xuXG4gICAgcHVibGljIHJlYWRvbmx5IGNvbnRlbnQ6IEFycmF5PHN0cmluZz4gPSBudWxsO1xuXG4gICAgcHVibGljIHJld2FyZHM6IEFycmF5PHsgdHlwZTogbnVtYmVyLCBjb3VudDogbnVtYmVyIH0+ID0gbnVsbDtcblxuICAgIHByaXZhdGUgX3BhcnNlUmV3YXJkSW5mbygpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5yZXdhcmRzID0gW107XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzYyA9IDxhbnk+aXRlbS5zcGxpdCgnfCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gTnVtYmVyKHNjWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgIT0gbnVsbCAmJiB0eXBlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRzLnB1c2goeyB0eXBlOiB0eXBlLCBjb3VudDogTnVtYmVyKHNjWzFdKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==