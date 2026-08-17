
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Network/HttpRequest.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dc9f6UFauBFiJuzPC1b2vtw', 'HttpRequest');
// Script/Base/Network/HttpRequest.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequest = void 0;
var NetBase_1 = require("./NetBase");
var Log_1 = require("../Utils/Log");
var Apps_1 = require("../Apps");
//请求超时时间 (ms)
var DefaultTimeout = 3000;
var requestCachePool = new Map();
var HttpRequest = /** @class */ (function (_super) {
    __extends(HttpRequest, _super);
    /**
     *
     * @param url 请求连接
     * @param method 请求方法
     * @param headers 请求头
     * @param data 请求附加内容
     * @param isJsonFromat 是否对回复进行json格式化
     * @param rspType 指定接收类型
     */
    function HttpRequest(url, method, headers, data, isJsonFromat, rspType) {
        if (headers === void 0) { headers = null; }
        if (data === void 0) { data = null; }
        if (isJsonFromat === void 0) { isJsonFromat = false; }
        if (rspType === void 0) { rspType = null; }
        var _this = _super.call(this) || this;
        _this.data = null;
        _this.method = null;
        _this.rspType = null;
        _this.headers = null;
        _this.isJsonFromat = false;
        /**当前请求序列号 */
        _this.requestID = null;
        /**当前请求XmlHttp句柄 */
        _this.request = null;
        /**请求完成回调接口 */
        _this.reqCompletedCallback = null;
        _this.url = url;
        _this.data = data;
        _this.method = method;
        _this.rspType = rspType;
        _this.headers = headers;
        _this._isReady = true;
        _this.isJsonFromat = isJsonFromat;
        return _this;
    }
    /**执行一个请求 */
    HttpRequest.prototype.execute = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (!_this.isReady) {
                resolve(null);
            }
            else if (!Apps_1.default.isOpenNet) {
                resolve({ code: 0 });
            }
            else {
                _this.reqCompletedCallback = resolve;
                _this.connect();
            }
        });
    };
    /**取消这个请求 */
    HttpRequest.prototype.cancel = function () {
        this.resultHandler(null);
        this.destory();
    };
    HttpRequest.prototype.onReadyStateChange = function (evt) {
        if (evt && evt.target !== this.request) {
            return;
        }
        if (this.request.readyState == XMLHttpRequest.DONE) {
            if (this.request.status >= 200 && this.request.status < 400) {
                this.resultHandler(this.request.responseText);
                this.destory();
            }
            else {
                this.onError("ErrorCode " + this.request.status);
                this.resultHandler(this.request.responseText);
                this.destory();
            }
        }
    };
    HttpRequest.prototype.onProgress = function () {
    };
    HttpRequest.prototype.onTimeOut = function () {
        this.onError('Time out!');
    };
    HttpRequest.prototype.onError = function (err) {
        Log_1.Log.d("request Error ! \n url:" + this.url + " \n method:" + this.method + " \n requestID:" + this.requestID, err);
        //重试机制 
        if (!this.isAutoRetry || this.retryCount >= this.retryMaxCount) {
            this.resultHandler(null);
            this.destory();
        }
        else {
            this.retry(err);
        }
    };
    /**链接 */
    HttpRequest.prototype.connect = function () {
        this.request = new XMLHttpRequest();
        this.setResponseType();
        this.request.open(this.method, this.url, true);
        /**设置超时时间 */
        this.request.timeout = DefaultTimeout * this.retryCount;
        /**绑定回调事件 */
        this.request.ontimeout = this.onTimeOut.bind(this);
        this.request.onerror = this.onError.bind(this);
        this.request.onreadystatechange = this.onReadyStateChange.bind(this);
        this.request.onprogress = this.onProgress.bind(this);
        // this.addHeaders(PublicHeaders);
        this.addHeaders(this.headers);
        this.requestID = this.getRequestId();
        try {
            // this.request.send(this.data);
            requestCachePool.set(this.requestID, this);
        }
        catch (err) {
            this.onError(err);
        }
    };
    HttpRequest.prototype.retry = function (err) {
        var _this = this;
        if (this.retryCount < this.retryMaxCount) {
            this.retryCount++;
            this.destory();
            setTimeout(function () {
                _this.connect();
            }, this.retryCount * 1000);
        }
        else {
            this.onError(err);
        }
    };
    HttpRequest.prototype.destory = function () {
        requestCachePool.delete(this.requestID);
        if (this.request) {
            this.request.ontimeout = null;
            this.request.onerror = null;
            this.request.onreadystatechange = null;
            this.request.onprogress = null;
            try {
                this.request.abort();
            }
            catch (error) { }
        }
    };
    HttpRequest.prototype.resultHandler = function (result) {
        if (this.reqCompletedCallback && requestCachePool.get(this.requestID)) {
            if (this.isJsonFromat) {
                try {
                    result = JSON.parse(result);
                }
                catch (error) {
                    try {
                        result = JSON.parse(result);
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
            }
            this.reqCompletedCallback(result);
        }
        else {
        }
    };
    HttpRequest.prototype.addHeaders = function (headers) {
        if (headers) {
            for (var key in headers) {
                var value = headers[key];
                this.request.setRequestHeader(key, value);
                if (key == 'Content-Type' && value.indexOf('json') > 0) {
                    this.isJsonFromat = true;
                }
            }
        }
    };
    HttpRequest.prototype.setResponseType = function () {
        if (this.rspType) {
            this.request.responseType = this.rspType;
        }
    };
    return HttpRequest;
}(NetBase_1.default));
exports.HttpRequest = HttpRequest;
(function (HttpRequest) {
    var METHOD;
    (function (METHOD) {
        METHOD["GET"] = "GET";
        METHOD["POST"] = "POST";
    })(METHOD = HttpRequest.METHOD || (HttpRequest.METHOD = {}));
})(HttpRequest || (HttpRequest = {}));
exports.HttpRequest = HttpRequest;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxOZXR3b3JrXFxIdHRwUmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EscUNBQWdDO0FBQ2hDLG9DQUFtQztBQUNuQyxnQ0FBMkI7QUFFM0IsYUFBYTtBQUNiLElBQU0sY0FBYyxHQUFXLElBQUksQ0FBQztBQUVwQyxJQUFNLGdCQUFnQixHQUE2QixJQUFJLEdBQUcsRUFBdUIsQ0FBQztBQUVsRjtJQUEwQiwrQkFBTztJQWU3Qjs7Ozs7Ozs7T0FRRztJQUNILHFCQUFZLEdBQVcsRUFBRSxNQUEwQixFQUFFLE9BQXlDLEVBQUUsSUFBbUIsRUFBRSxZQUE2QixFQUFFLE9BQTBDO1FBQXpJLHdCQUFBLEVBQUEsY0FBeUM7UUFBRSxxQkFBQSxFQUFBLFdBQW1CO1FBQUUsNkJBQUEsRUFBQSxvQkFBNkI7UUFBRSx3QkFBQSxFQUFBLGNBQTBDO1FBQTlMLFlBQ0ksaUJBQU8sU0FRVjtRQS9CTyxVQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ3BCLFlBQU0sR0FBVyxJQUFJLENBQUM7UUFDdEIsYUFBTyxHQUErQixJQUFJLENBQUM7UUFDM0MsYUFBTyxHQUE4QixJQUFJLENBQUM7UUFFMUMsa0JBQVksR0FBWSxLQUFLLENBQUM7UUFDdEMsYUFBYTtRQUNMLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFDakMsbUJBQW1CO1FBQ1gsYUFBTyxHQUFtQixJQUFJLENBQUM7UUFDdkMsY0FBYztRQUNOLDBCQUFvQixHQUFhLElBQUksQ0FBQztRQWExQyxLQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDOztJQUNyQyxDQUFDO0lBRUQsWUFBWTtJQUNMLDZCQUFPLEdBQWQ7UUFBQSxpQkFXQztRQVZHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO1lBQ3ZCLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQjtpQkFBTSxJQUFJLENBQUMsY0FBSSxDQUFDLFNBQVMsRUFBRTtnQkFDeEIsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDeEI7aUJBQU07Z0JBQ0gsS0FBSSxDQUFDLG9CQUFvQixHQUFHLE9BQU8sQ0FBQztnQkFDcEMsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2xCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtJQUNMLDRCQUFNLEdBQWI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRU8sd0NBQWtCLEdBQTFCLFVBQTJCLEdBQVU7UUFDakMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3BDLE9BQU87U0FDVjtRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksY0FBYyxDQUFDLElBQUksRUFBRTtZQUNoRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7Z0JBQ3pELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2xCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxPQUFPLENBQUMsZUFBYSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQVEsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNsQjtTQUNKO0lBQ0wsQ0FBQztJQUVPLGdDQUFVLEdBQWxCO0lBRUEsQ0FBQztJQUVPLCtCQUFTLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU8sNkJBQU8sR0FBZixVQUFnQixHQUFHO1FBQ2YsU0FBRyxDQUFDLENBQUMsQ0FBQyw0QkFBMEIsSUFBSSxDQUFDLEdBQUcsbUJBQWMsSUFBSSxDQUFDLE1BQU0sc0JBQWlCLElBQUksQ0FBQyxTQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekcsT0FBTztRQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUM1RCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNsQjthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFFRCxRQUFRO0lBQ0UsNkJBQU8sR0FBakI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvQyxZQUFZO1FBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDeEQsWUFBWTtRQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckMsSUFBSTtZQUNELGdDQUFnQztZQUMvQixnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM5QztRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFHTywyQkFBSyxHQUFiLFVBQWMsR0FBRztRQUFqQixpQkFVQztRQVRHLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDZixVQUFVLENBQUM7Z0JBQ1AsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ25CLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQzlCO2FBQU07WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVPLDZCQUFPLEdBQWY7UUFDSSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7WUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQy9CLElBQUk7Z0JBQ0EsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN4QjtZQUFDLE9BQU8sS0FBSyxFQUFFLEdBQUc7U0FDdEI7SUFDTCxDQUFDO0lBRU8sbUNBQWEsR0FBckIsVUFBc0IsTUFBVztRQUM3QixJQUFJLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ25FLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDbkIsSUFBSTtvQkFDQSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDL0I7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ1osSUFBSTt3QkFDQSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDL0I7b0JBQUMsT0FBTyxLQUFLLEVBQUU7d0JBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDeEI7aUJBQ0o7YUFDSjtZQUNELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyQzthQUFNO1NBRU47SUFDTCxDQUFDO0lBRU8sZ0NBQVUsR0FBbEIsVUFBbUIsT0FBa0M7UUFDakQsSUFBSSxPQUFPLEVBQUU7WUFDVCxLQUFLLElBQU0sR0FBRyxJQUFJLE9BQU8sRUFBRTtnQkFDdkIsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxHQUFHLElBQUksY0FBYyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNwRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztpQkFDNUI7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVPLHFDQUFlLEdBQXZCO1FBQ0ksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUM1QztJQUNMLENBQUM7SUFDTCxrQkFBQztBQUFELENBaExBLEFBZ0xDLENBaEx5QixpQkFBTyxHQWdMaEM7QUFNUSxrQ0FBVztBQUpwQixXQUFVLFdBQVc7SUFDakIsSUFBWSxNQUFxQztJQUFqRCxXQUFZLE1BQU07UUFBRyxxQkFBVyxDQUFBO1FBQUUsdUJBQWEsQ0FBQTtJQUFDLENBQUMsRUFBckMsTUFBTSxHQUFOLGtCQUFNLEtBQU4sa0JBQU0sUUFBK0I7QUFDckQsQ0FBQyxFQUZTLFdBQVcsS0FBWCxXQUFXLFFBRXBCO0FBRVEsa0NBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBOZXRCYXNlIGZyb20gXCIuL05ldEJhc2VcIjtcbmltcG9ydCB7IExvZyB9IGZyb20gXCIuLi9VdGlscy9Mb2dcIjtcbmltcG9ydCBBcHBzIGZyb20gXCIuLi9BcHBzXCI7XG5cbi8v6K+35rGC6LaF5pe25pe26Ze0IChtcylcbmNvbnN0IERlZmF1bHRUaW1lb3V0OiBudW1iZXIgPSAzMDAwO1xuXG5jb25zdCByZXF1ZXN0Q2FjaGVQb29sOiBNYXA8c3RyaW5nLCBIdHRwUmVxdWVzdD4gPSBuZXcgTWFwPHN0cmluZywgSHR0cFJlcXVlc3Q+KCk7XG5cbmNsYXNzIEh0dHBSZXF1ZXN0IGV4dGVuZHMgTmV0QmFzZSB7XG5cbiAgICBwcml2YXRlIGRhdGE6IHN0cmluZyA9IG51bGw7XG4gICAgcHJpdmF0ZSBtZXRob2Q6IHN0cmluZyA9IG51bGw7XG4gICAgcHJpdmF0ZSByc3BUeXBlOiBYTUxIdHRwUmVxdWVzdFJlc3BvbnNlVHlwZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBoZWFkZXJzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0gbnVsbDtcblxuICAgIHByaXZhdGUgaXNKc29uRnJvbWF0OiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoq5b2T5YmN6K+35rGC5bqP5YiX5Y+3ICovXG4gICAgcHJpdmF0ZSByZXF1ZXN0SUQ6IHN0cmluZyA9IG51bGw7XG4gICAgLyoq5b2T5YmN6K+35rGCWG1sSHR0cOWPpeafhCAqL1xuICAgIHByaXZhdGUgcmVxdWVzdDogWE1MSHR0cFJlcXVlc3QgPSBudWxsO1xuICAgIC8qKuivt+axguWujOaIkOWbnuiwg+aOpeWPoyAqL1xuICAgIHByaXZhdGUgcmVxQ29tcGxldGVkQ2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB1cmwg6K+35rGC6L+e5o6lXG4gICAgICogQHBhcmFtIG1ldGhvZCDor7fmsYLmlrnms5VcbiAgICAgKiBAcGFyYW0gaGVhZGVycyDor7fmsYLlpLRcbiAgICAgKiBAcGFyYW0gZGF0YSDor7fmsYLpmYTliqDlhoXlrrlcbiAgICAgKiBAcGFyYW0gaXNKc29uRnJvbWF0IOaYr+WQpuWvueWbnuWkjei/m+ihjGpzb27moLzlvI/ljJZcbiAgICAgKiBAcGFyYW0gcnNwVHlwZSDmjIflrprmjqXmlLbnsbvlnotcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZywgbWV0aG9kOiBIdHRwUmVxdWVzdC5NRVRIT0QsIGhlYWRlcnM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSBudWxsLCBkYXRhOiBzdHJpbmcgPSBudWxsLCBpc0pzb25Gcm9tYXQ6IGJvb2xlYW4gPSBmYWxzZSwgcnNwVHlwZTogWE1MSHR0cFJlcXVlc3RSZXNwb25zZVR5cGUgPSBudWxsKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgICAgdGhpcy5yc3BUeXBlID0gcnNwVHlwZTtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gaGVhZGVycztcbiAgICAgICAgdGhpcy5faXNSZWFkeSA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNKc29uRnJvbWF0ID0gaXNKc29uRnJvbWF0O1xuICAgIH1cblxuICAgIC8qKuaJp+ihjOS4gOS4quivt+axgiAqL1xuICAgIHB1YmxpYyBleGVjdXRlKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzUmVhZHkpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghQXBwcy5pc09wZW5OZXQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHsgY29kZTogMCB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXFDb21wbGV0ZWRDYWxsYmFjayA9IHJlc29sdmU7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKuWPlua2iOi/meS4quivt+axgiAqL1xuICAgIHB1YmxpYyBjYW5jZWwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVzdWx0SGFuZGxlcihudWxsKTtcbiAgICAgICAgdGhpcy5kZXN0b3J5KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblJlYWR5U3RhdGVDaGFuZ2UoZXZ0OiBFdmVudCkge1xuICAgICAgICBpZiAoZXZ0ICYmIGV2dC50YXJnZXQgIT09IHRoaXMucmVxdWVzdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3QucmVhZHlTdGF0ZSA9PSBYTUxIdHRwUmVxdWVzdC5ET05FKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5yZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0SGFuZGxlcih0aGlzLnJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3RvcnkoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yKGBFcnJvckNvZGUgJHt0aGlzLnJlcXVlc3Quc3RhdHVzfWApO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0SGFuZGxlcih0aGlzLnJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3RvcnkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25Qcm9ncmVzcygpIHtcblxuICAgIH1cblxuICAgIHByaXZhdGUgb25UaW1lT3V0KCkge1xuICAgICAgICB0aGlzLm9uRXJyb3IoJ1RpbWUgb3V0IScpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25FcnJvcihlcnIpIHtcbiAgICAgICAgTG9nLmQoYHJlcXVlc3QgRXJyb3IgISBcXG4gdXJsOiR7dGhpcy51cmx9IFxcbiBtZXRob2Q6JHt0aGlzLm1ldGhvZH0gXFxuIHJlcXVlc3RJRDoke3RoaXMucmVxdWVzdElEfWAsIGVycik7XG4gICAgICAgIC8v6YeN6K+V5py65Yi2IFxuICAgICAgICBpZiAoIXRoaXMuaXNBdXRvUmV0cnkgfHwgdGhpcy5yZXRyeUNvdW50ID49IHRoaXMucmV0cnlNYXhDb3VudCkge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRIYW5kbGVyKG51bGwpO1xuICAgICAgICAgICAgdGhpcy5kZXN0b3J5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJldHJ5KGVycik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirpk77mjqUgKi9cbiAgICBwcm90ZWN0ZWQgY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHRoaXMuc2V0UmVzcG9uc2VUeXBlKCk7XG4gICAgICAgIHRoaXMucmVxdWVzdC5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSk7XG4gICAgICAgIC8qKuiuvue9rui2heaXtuaXtumXtCAqL1xuICAgICAgICB0aGlzLnJlcXVlc3QudGltZW91dCA9IERlZmF1bHRUaW1lb3V0ICogdGhpcy5yZXRyeUNvdW50O1xuICAgICAgICAvKirnu5Hlrprlm57osIPkuovku7YgKi9cbiAgICAgICAgdGhpcy5yZXF1ZXN0Lm9udGltZW91dCA9IHRoaXMub25UaW1lT3V0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVxdWVzdC5vbmVycm9yID0gdGhpcy5vbkVycm9yLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSB0aGlzLm9uUmVhZHlTdGF0ZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnJlcXVlc3Qub25wcm9ncmVzcyA9IHRoaXMub25Qcm9ncmVzcy5iaW5kKHRoaXMpO1xuXG4gICAgICAgIC8vIHRoaXMuYWRkSGVhZGVycyhQdWJsaWNIZWFkZXJzKTtcbiAgICAgICAgdGhpcy5hZGRIZWFkZXJzKHRoaXMuaGVhZGVycyk7XG4gICAgICAgIHRoaXMucmVxdWVzdElEID0gdGhpcy5nZXRSZXF1ZXN0SWQoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgLy8gdGhpcy5yZXF1ZXN0LnNlbmQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgIHJlcXVlc3RDYWNoZVBvb2wuc2V0KHRoaXMucmVxdWVzdElELCB0aGlzKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHJpdmF0ZSByZXRyeShlcnIpIHtcbiAgICAgICAgaWYgKHRoaXMucmV0cnlDb3VudCA8IHRoaXMucmV0cnlNYXhDb3VudCkge1xuICAgICAgICAgICAgdGhpcy5yZXRyeUNvdW50Kys7XG4gICAgICAgICAgICB0aGlzLmRlc3RvcnkoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdCgpO1xuICAgICAgICAgICAgfSwgdGhpcy5yZXRyeUNvdW50ICogMTAwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGVzdG9yeSgpIHtcbiAgICAgICAgcmVxdWVzdENhY2hlUG9vbC5kZWxldGUodGhpcy5yZXF1ZXN0SUQpO1xuICAgICAgICBpZiAodGhpcy5yZXF1ZXN0KSB7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3Qub250aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5vbmVycm9yID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0Lm9ucHJvZ3Jlc3MgPSBudWxsO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7IH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVzdWx0SGFuZGxlcihyZXN1bHQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5yZXFDb21wbGV0ZWRDYWxsYmFjayAmJiByZXF1ZXN0Q2FjaGVQb29sLmdldCh0aGlzLnJlcXVlc3RJRCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSnNvbkZyb21hdCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2UocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlcUNvbXBsZXRlZENhbGxiYWNrKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkSGVhZGVycyhoZWFkZXJzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9KTogdm9pZCB7XG4gICAgICAgIGlmIChoZWFkZXJzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBoZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBoZWFkZXJzW2tleV07XG4gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSAnQ29udGVudC1UeXBlJyAmJiB2YWx1ZS5pbmRleE9mKCdqc29uJykgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNKc29uRnJvbWF0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFJlc3BvbnNlVHlwZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucnNwVHlwZSkge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IHRoaXMucnNwVHlwZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubmFtZXNwYWNlIEh0dHBSZXF1ZXN0IHtcbiAgICBleHBvcnQgZW51bSBNRVRIT0QgeyBHRVQgPSAnR0VUJywgUE9TVCA9ICdQT1NUJyB9XG59XG5cbmV4cG9ydCB7IEh0dHBSZXF1ZXN0IH0iXX0=