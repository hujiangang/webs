
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Tabls/PropInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxUYWJsc1xcUHJvcEluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBMEM7QUFHMUM7SUFFSSxrQkFBWSxJQUFTO1FBWUwsT0FBRSxHQUFXLElBQUksQ0FBQztRQUUzQixpQkFBWSxHQUFlLHNCQUFVLENBQUMsSUFBSSxDQUFDO1FBRTNDLFVBQUssR0FBVyxJQUFJLENBQUM7UUFFWixTQUFJLEdBQVcsSUFBSSxDQUFDO1FBRXBCLFdBQU0sR0FBVyxJQUFJLENBQUM7UUFFdEIsUUFBRyxHQUFXLElBQUksQ0FBQztRQUVuQixVQUFLLEdBQVcsSUFBSSxDQUFDO1FBRXJCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFMUIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQTNCakMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFakMsQ0FBQztJQW9CTyw4QkFBVyxHQUFuQixVQUFvQixLQUFhO1FBQzdCLElBQUksS0FBSyxFQUFFO1lBQ1AsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFTCxlQUFDO0FBQUQsQ0F4Q0EsQUF3Q0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEN1cnJlbmN5SWQgfSBmcm9tIFwiLi4vQmFzZUNvbnN0XCI7XG5pbXBvcnQgeyBwcm9taXNpZnkgfSBmcm9tIFwidXRpbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9wSW5mbyB7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcbiAgICAgICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICAgICAgdGhpcy5kZXRhaWwgPSBkYXRhLmRldGFpbCB8fCAnJztcbiAgICAgICAgdGhpcy5yZXMgPSBkYXRhLnJlcztcbiAgICAgICAgdGhpcy52YWx1ZSA9IGRhdGEudjtcbiAgICAgICAgdGhpcy5pc0JhZ1VzZSA9IGRhdGEuYmFndXNlO1xuICAgICAgICB0aGlzLnVubG9ja0x2ID0gZGF0YS51bmxvY2sgfHwgMDtcbiAgICAgICAgdGhpcy5fcGFyc2VQcmljZShkYXRhLnByaWNlKTtcblxuICAgIH1cblxuICAgIHB1YmxpYyByZWFkb25seSBpZDogbnVtYmVyID0gbnVsbDtcblxuICAgIHB1YmxpYyBjdXJyZW5jeVR5cGU6IEN1cnJlbmN5SWQgPSBDdXJyZW5jeUlkLkNvaW47XG5cbiAgICBwdWJsaWMgcHJpY2U6IG51bWJlciA9IG51bGw7XG5cbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZTogc3RyaW5nID0gbnVsbDtcblxuICAgIHB1YmxpYyByZWFkb25seSBkZXRhaWw6IHN0cmluZyA9IG51bGw7XG5cbiAgICBwdWJsaWMgcmVhZG9ubHkgcmVzOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgcHVibGljIHJlYWRvbmx5IHZhbHVlOiBudW1iZXIgPSBudWxsO1xuXG4gICAgcHVibGljIHJlYWRvbmx5IGlzQmFnVXNlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgcmVhZG9ubHkgdW5sb2NrTHY6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIF9wYXJzZVByaWNlKHByaWNlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHByaWNlKSB7XG4gICAgICAgICAgICBjb25zdCBjZmcgPSBwcmljZS5zcGxpdCgnfCcpXG4gICAgICAgICAgICB0aGlzLmN1cnJlbmN5VHlwZSA9IE51bWJlcihjZmdbMF0pO1xuICAgICAgICAgICAgdGhpcy5wcmljZSA9IE51bWJlcihjZmdbMV0pO1xuICAgICAgICB9XG4gICAgfVxuXG59Il19