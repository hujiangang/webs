"use strict";
cc._RF.push(module, '508baU8zyVEJKefr30j1/Nf', 'HotelRoomCfg');
// Script/Base/Tabls/HotelRoomCfg.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HotelRoomCfg = /** @class */ (function () {
    function HotelRoomCfg(data) {
        this.id = null;
        this.roomId = null;
        this.slotId = null;
        this.slotName = null;
        this.prices = null;
        this.animationOpts = null;
        this.id = data.id;
        this.roomId = data.roomId;
        this.slotId = data.slotId;
        this.slotName = data.name;
        this._parsePrices(data.price);
        this._parseAnimationOpt(data.animation);
    }
    HotelRoomCfg.prototype._parseAnimationOpt = function (opt) {
        if (opt) {
            this.animationOpts = new Map();
            var opts = opt.split('|');
            for (var i = 1; i <= opts.length; i++) {
                this.animationOpts.set(i, !!Number(opts[i - 1]));
            }
        }
    };
    HotelRoomCfg.prototype._parsePrices = function (data) {
        if (!this.prices && data) {
            this.prices = [];
            for (var i = 0; i < data.length; i++) {
                var sd = data[i].split('|');
                if (sd[0]) {
                    this.prices.push({ id: i + 1, itemId: Number(sd[0]), num: Number(sd[1]), extData: Number(sd[2]) });
                }
            }
        }
    };
    return HotelRoomCfg;
}());
exports.default = HotelRoomCfg;

cc._RF.pop();