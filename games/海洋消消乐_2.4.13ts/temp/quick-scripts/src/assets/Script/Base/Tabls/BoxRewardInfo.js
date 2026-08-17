"use strict";
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