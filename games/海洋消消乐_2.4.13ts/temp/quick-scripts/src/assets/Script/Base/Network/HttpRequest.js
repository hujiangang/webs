"use strict";
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