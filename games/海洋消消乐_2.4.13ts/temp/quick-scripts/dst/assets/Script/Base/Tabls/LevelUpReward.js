
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Tabls/LevelUpReward.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '70eadDtb0hJsJLVa4fJ+s/d', 'LevelUpReward');
// Script/Base/Tabls/LevelUpReward.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LevelUpReward = /** @class */ (function () {
    function LevelUpReward(data) {
        this.id = null;
        this.rewards = null;
        this.id = data.id;
        this._parseRewardInfo(data.reward);
    }
    LevelUpReward.prototype._parseRewardInfo = function (reward) {
        var _this = this;
        if (reward) {
            this.rewards = [];
            reward.forEach(function (item) {
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
    return LevelUpReward;
}());
exports.default = LevelUpReward;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxUYWJsc1xcTGV2ZWxVcFJld2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0lBRUksdUJBQVksSUFBUztRQUtMLE9BQUUsR0FBVyxJQUFJLENBQUM7UUFFM0IsWUFBTyxHQUEyQyxJQUFJLENBQUM7UUFOMUQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQU1PLHdDQUFnQixHQUF4QixVQUF5QixNQUFxQjtRQUE5QyxpQkFhQztRQVpHLElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDbEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQ2YsSUFBSSxJQUFJLEVBQUU7b0JBQ04sSUFBTSxFQUFFLEdBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEMsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQixJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLFNBQVMsRUFBRTt3QkFDbkMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDckQ7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0F6QkEsQUF5QkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGV2ZWxVcFJld2FyZCB7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcbiAgICAgICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG4gICAgICAgIHRoaXMuX3BhcnNlUmV3YXJkSW5mbyhkYXRhLnJld2FyZCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlYWRvbmx5IGlkOiBudW1iZXIgPSBudWxsO1xuXG4gICAgcHVibGljIHJld2FyZHM6IEFycmF5PHsgdHlwZTogbnVtYmVyLCBjb3VudDogbnVtYmVyIH0+ID0gbnVsbDtcblxuICAgIHByaXZhdGUgX3BhcnNlUmV3YXJkSW5mbyhyZXdhcmQ6IEFycmF5PHN0cmluZz4pIHtcbiAgICAgICAgaWYgKHJld2FyZCkge1xuICAgICAgICAgICAgdGhpcy5yZXdhcmRzID0gW107XG4gICAgICAgICAgICByZXdhcmQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzYyA9IDxhbnk+aXRlbS5zcGxpdCgnfCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gTnVtYmVyKHNjWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgIT0gbnVsbCAmJiB0eXBlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRzLnB1c2goeyB0eXBlLCBjb3VudDogTnVtYmVyKHNjWzFdKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==