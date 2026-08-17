"use strict";
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