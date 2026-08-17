"use strict";
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