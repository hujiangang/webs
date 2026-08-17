"use strict";
cc._RF.push(module, '875d2ZQiE9OZYdmPmJ0RPtq', 'DailyTaskInfo');
// Script/Base/Tabls/DailyTaskInfo.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DailyTaskInfo = /** @class */ (function () {
    function DailyTaskInfo(data) {
        this.id = null;
        this.type = null;
        this.name = null;
        this.condition = null;
        this.conditionType = null;
        this.conditionSubType = null;
        this.rewards = null;
        this.id = Number(data.id);
        this.type = Number(data.type);
        this.condition = Number(data.condition);
        this.name = data.name;
        this._parseConditionType(data.conditionType);
        this.rewards = [{ type: Number(data.rewards.name), count: data.rewards.count }];
    }
    DailyTaskInfo.prototype._parseConditionType = function (type) {
        if (type) {
            var tmpData = type.split('|');
            if (tmpData.length == 1) {
                this.conditionType = type;
            }
            else {
                this.conditionType = tmpData[0];
                this.conditionSubType = tmpData[1];
            }
        }
    };
    return DailyTaskInfo;
}());
exports.default = DailyTaskInfo;

cc._RF.pop();