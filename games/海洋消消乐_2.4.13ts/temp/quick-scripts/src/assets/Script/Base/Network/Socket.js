"use strict";
cc._RF.push(module, '005admXZVhMQretsIbDKX6n', 'Socket');
// Script/Base/Network/Socket.ts

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
var NetBase_1 = require("./NetBase");
var Log_1 = require("../Utils/Log");
/**自动心跳模式 */
var AutoHearBeat = true;
/**心跳间隔时间 */
var HeartBeatGapTime = 30 * 1000;
/**重连间隔时间 */
var ReConnectGapTime = 1 * 1000;
var Scoket = /** @class */ (function (_super) {
    __extends(Scoket, _super);
    function Scoket(url, data) {
        if (data === void 0) { data = null; }
        var _this = _super.call(this) || this;
        _this.ws = null;
        _this.data = null;
        _this.connectCallBack = null;
        _this.heartBeatTimer = null;
        _this.reConnectTimer = null;
        _this.url = url;
        _this.data = data;
        return _this;
    }
    Scoket.prototype.connect = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.connectCallBack = resolve;
            _this.createWebSocket();
        });
    };
    Scoket.prototype.disconnect = function () {
        this.destoryWs();
    };
    Scoket.prototype.send = function (pack) {
        if (this.isReady && this.ws.readyState == WebSocket.OPEN) {
            this.ws.send(pack);
        }
        else {
            //还没准备好 ? 需要怎么处理 ? 保存包吗 ? 待定 
            Log_1.Log.e('Error websocket 状态异常!', this.isReady, this.ws.readyState);
        }
    };
    Scoket.prototype.createWebSocket = function () {
        this.ws = new WebSocket(this.url);
        this.ws.binaryType = "arraybuffer"; //    "blob" | "arraybuffer"
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onerror = this.onError.bind(this);
    };
    Scoket.prototype.onOpen = function (evt) {
        Log_1.Log.d("ws " + this.url + " opened");
        if (this.ws === evt.target) {
            this.onConnected();
        }
    };
    Scoket.prototype.onClose = function (evt) {
        Log_1.Log.d("ws " + this.url + " close");
        this.destoryWs();
        this.checkIsNeedReConnect();
    };
    Scoket.prototype.onError = function (evt) {
        Log_1.Log.d("ws " + this.url + " error", evt);
        this.destoryWs();
        this.checkIsNeedReConnect();
    };
    Scoket.prototype.onMessage = function (msg) {
        console.info('onMessage:', msg.data);
    };
    Scoket.prototype.onSendHeartBeat = function () {
        this.send('HeartBeat');
    };
    /** 连接建立之后调用，这里可以发送身份验证等.......*/
    Scoket.prototype.onConnected = function () {
        this._isReady = true;
        this.retryCount = 0;
        if (AutoHearBeat) {
            this.scheduleHeartBeat();
        }
        if (this.connectCallBack) {
            this.connectCallBack();
            this.connectCallBack = null;
        }
    };
    Scoket.prototype.onReConnect = function () {
        //断线后一直进入重连
        if (!this.ws && !this._isReady) {
            this.retryCount++;
            this.connect();
        }
        else {
            this.unScheduleReConnect();
        }
    };
    Scoket.prototype.destoryWs = function () {
        this._isReady = false;
        this.unScheduleHeartBeat();
        this.unScheduleReConnect();
        if (this.ws) {
            this.ws.onopen = null;
            this.ws.onmessage = null;
            this.ws.onclose = null;
            this.ws.onerror = null;
            if (this.ws.readyState !== WebSocket.CLOSING && this.ws.readyState !== WebSocket.CLOSED) {
                this.ws.close(3000, 'client close .');
            }
        }
        this.ws = null;
    };
    Scoket.prototype.checkIsNeedReConnect = function () {
        if (this.isAutoRetry) {
            this.scheduleReConnect();
        }
    };
    Scoket.prototype.scheduleReConnect = function () {
        this.unScheduleReConnect();
        this.reConnectTimer = setInterval(this.onReConnect.bind(this), ReConnectGapTime);
    };
    Scoket.prototype.unScheduleReConnect = function () {
        clearInterval(this.reConnectTimer);
    };
    Scoket.prototype.scheduleHeartBeat = function () {
        this.unScheduleHeartBeat();
        this.heartBeatTimer = setInterval(this.onSendHeartBeat.bind(this), HeartBeatGapTime);
    };
    Scoket.prototype.unScheduleHeartBeat = function () {
        clearInterval(this.heartBeatTimer);
    };
    return Scoket;
}(NetBase_1.default));
exports.default = Scoket;

cc._RF.pop();