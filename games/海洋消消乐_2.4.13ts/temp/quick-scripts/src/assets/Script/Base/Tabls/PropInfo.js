"use strict";
cc._RF.push(module, '42417Qg2H1PMrAR6fj9uTj/', 'PropInfo');
// Script/Base/Tabls/PropInfo.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseConst_1 = require("../BaseConst");
var PropInfo = /** @class */ (function () {
    function PropInfo(data) {
        this.id = null;
        this.currencyType = BaseConst_1.CurrencyId.Coin;
        this.price = null;
        this.name = null;
        this.detail = null;
        this.res = null;
        this.value = null;
        this.isBagUse = false;
        this.unlockLv = 0;
        this.id = data.id;
        this.name = data.name;
        this.detail = data.detail || '';
        this.res = data.res;
        this.value = data.v;
        this.isBagUse = data.baguse;
        this.unlockLv = data.unlock || 0;
        this._parsePrice(data.price);
    }
    PropInfo.prototype._parsePrice = function (price) {
        if (price) {
            var cfg = price.split('|');
            this.currencyType = Number(cfg[0]);
            this.price = Number(cfg[1]);
        }
    };
    return PropInfo;
}());
exports.default = PropInfo;

cc._RF.pop();