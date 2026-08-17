
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Tabls/ShopInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxUYWJsc1xcU2hvcEluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtJQVVJLGtCQUFZLElBQVM7UUFSTCxPQUFFLEdBQVcsSUFBSSxDQUFDO1FBQ2xCLFNBQUksR0FBVyxJQUFJLENBQUM7UUFDcEIsU0FBSSxHQUFXLElBQUksQ0FBQztRQUNwQixRQUFHLEdBQVcsSUFBSSxDQUFDO1FBQzVCLGlCQUFZLEdBQVcsSUFBSSxDQUFDO1FBQzVCLFVBQUssR0FBVyxJQUFJLENBQUM7UUFDckIsWUFBTyxHQUEyQyxJQUFJLENBQUM7UUFHMUQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTyw4QkFBVyxHQUFuQixVQUFvQixRQUFnQjtRQUNoQyxJQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTyxnQ0FBYSxHQUFyQixVQUFzQixNQUFxQjtRQUEzQyxpQkFhQztRQVpHLElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDbEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0JBQ2YsSUFBSSxJQUFJLEVBQUU7b0JBQ04sSUFBTSxFQUFFLEdBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDaEMsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQixJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLFNBQVMsRUFBRTt3QkFDbkMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDckQ7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQXZDQSxBQXVDQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BJbmZvIHtcblxuICAgIHB1YmxpYyByZWFkb25seSBpZDogbnVtYmVyID0gbnVsbDtcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZTogc3RyaW5nID0gbnVsbDtcbiAgICBwdWJsaWMgcmVhZG9ubHkgZmxhZzogbnVtYmVyID0gbnVsbDtcbiAgICBwdWJsaWMgcmVhZG9ubHkgcmVzOiBzdHJpbmcgPSBudWxsO1xuICAgIHB1YmxpYyBjdXJyZW5jeVR5cGU6IG51bWJlciA9IG51bGw7XG4gICAgcHVibGljIHByaWNlOiBudW1iZXIgPSBudWxsO1xuICAgIHB1YmxpYyBjb250ZW50OiBBcnJheTx7IHR5cGU6IG51bWJlciwgY291bnQ6IG51bWJlciB9PiA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcbiAgICAgICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG4gICAgICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcbiAgICAgICAgdGhpcy5mbGFnID0gZGF0YS5mbGFnO1xuICAgICAgICB0aGlzLnJlcyA9IGRhdGEucmVzO1xuICAgICAgICB0aGlzLl9wYXJzZVByaWNlKGRhdGEucHJpY2UpO1xuICAgICAgICB0aGlzLl9wYXJzZUNvbnRlbnQoZGF0YS5jb250ZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wYXJzZVByaWNlKHByaWNlQ2ZnOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc2MgPSBwcmljZUNmZy5zcGxpdCgnfCcpO1xuICAgICAgICB0aGlzLmN1cnJlbmN5VHlwZSA9IE51bWJlcihzY1swXSk7XG4gICAgICAgIHRoaXMucHJpY2UgPSBOdW1iZXIoc2NbMV0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3BhcnNlQ29udGVudChyZXdhcmQ6IEFycmF5PHN0cmluZz4pIHtcbiAgICAgICAgaWYgKHJld2FyZCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gW107XG4gICAgICAgICAgICByZXdhcmQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzYyA9IDxhbnk+aXRlbS5zcGxpdCgnfCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gTnVtYmVyKHNjWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgIT0gbnVsbCAmJiB0eXBlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnB1c2goeyB0eXBlLCBjb3VudDogTnVtYmVyKHNjWzFdKSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==