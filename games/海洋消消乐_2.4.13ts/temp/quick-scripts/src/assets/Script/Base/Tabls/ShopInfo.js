"use strict";
cc._RF.push(module, '52d38jpEUtKwJr3Bv9gnOk6', 'ShopInfo');
// Script/Base/Tabls/ShopInfo.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShopInfo = /** @class */ (function () {
    function ShopInfo(data) {
        this.id = null;
        this.name = null;
        this.flag = null;
        this.res = null;
        this.currencyType = null;
        this.price = null;
        this.content = null;
        this.id = data.id;
        this.name = data.name;
        this.flag = data.flag;
        this.res = data.res;
        this._parsePrice(data.price);
        this._parseContent(data.content);
    }
    ShopInfo.prototype._parsePrice = function (priceCfg) {
        var sc = priceCfg.split('|');
        this.currencyType = Number(sc[0]);
        this.price = Number(sc[1]);
    };
    ShopInfo.prototype._parseContent = function (reward) {
        var _this = this;
        if (reward) {
            this.content = [];
            reward.forEach(function (item) {
                if (item) {
                    var sc = item.split('|');
                    var type = Number(sc[0]);
                    if (type != null && type != undefined) {
                        _this.content.push({ type: type, count: Number(sc[1]) });
                    }
                }
            });
        }
    };
    return ShopInfo;
}());
exports.default = ShopInfo;

cc._RF.pop();