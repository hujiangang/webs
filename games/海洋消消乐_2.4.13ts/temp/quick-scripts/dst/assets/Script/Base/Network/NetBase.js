
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Network/NetBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '83e83zoFwdKfr9ZFLjhUL0C', 'NetBase');
// Script/Base/Network/NetBase.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequence_1 = require("./Sequence");
var Seq = new Sequence_1.default();
//最大重连次数
var MaxRetryCount = 3;
//自动重连开关
var AutoRetryOpt = true;
var NetBase = /** @class */ (function () {
    function NetBase() {
        this.url = null;
        this._isReady = false;
        /**当前重试次数 */
        this.retryCount = 0;
    }
    NetBase.prototype.getRequestId = function () {
        return Seq.nextString();
    };
    Object.defineProperty(NetBase.prototype, "retryMaxCount", {
        get: function () {
            return MaxRetryCount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NetBase.prototype, "isAutoRetry", {
        get: function () {
            return AutoRetryOpt;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NetBase.prototype, "isReady", {
        get: function () {
            return this._isReady;
        },
        enumerable: false,
        configurable: true
    });
    return NetBase;
}());
exports.default = NetBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxOZXR3b3JrXFxOZXRCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQWtDO0FBRWxDLElBQU0sR0FBRyxHQUFhLElBQUksa0JBQVEsRUFBRSxDQUFDO0FBQ3JDLFFBQVE7QUFDUixJQUFNLGFBQWEsR0FBVyxDQUFDLENBQUM7QUFDaEMsUUFBUTtBQUNSLElBQU0sWUFBWSxHQUFZLElBQUksQ0FBQztBQUVuQztJQUFBO1FBRWMsUUFBRyxHQUFXLElBQUksQ0FBQztRQUVuQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQ3BDLFlBQVk7UUFDRixlQUFVLEdBQVcsQ0FBQyxDQUFDO0lBb0JyQyxDQUFDO0lBbEJhLDhCQUFZLEdBQXRCO1FBQ0ksT0FBTyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELHNCQUFjLGtDQUFhO2FBQTNCO1lBQ0ksT0FBTyxhQUFhLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxnQ0FBVzthQUF0QjtZQUNJLE9BQU8sWUFBWSxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsNEJBQU87YUFBbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFJTCxjQUFDO0FBQUQsQ0ExQkEsQUEwQkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZXF1ZW5jZSBmcm9tIFwiLi9TZXF1ZW5jZVwiO1xuXG5jb25zdCBTZXE6IFNlcXVlbmNlID0gbmV3IFNlcXVlbmNlKCk7XG4vL+acgOWkp+mHjei/nuasoeaVsFxuY29uc3QgTWF4UmV0cnlDb3VudDogbnVtYmVyID0gMztcbi8v6Ieq5Yqo6YeN6L+e5byA5YWzXG5jb25zdCBBdXRvUmV0cnlPcHQ6IGJvb2xlYW4gPSB0cnVlO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBOZXRCYXNlIHtcblxuICAgIHByb3RlY3RlZCB1cmw6IHN0cmluZyA9IG51bGw7XG5cbiAgICBwcm90ZWN0ZWQgX2lzUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKirlvZPliY3ph43or5XmrKHmlbAgKi9cbiAgICBwcm90ZWN0ZWQgcmV0cnlDb3VudDogbnVtYmVyID0gMDtcblxuICAgIHByb3RlY3RlZCBnZXRSZXF1ZXN0SWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFNlcS5uZXh0U3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCByZXRyeU1heENvdW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXhSZXRyeUNvdW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNBdXRvUmV0cnkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBBdXRvUmV0cnlPcHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc1JlYWR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNSZWFkeTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgY29ubmVjdCgpO1xuXG59Il19