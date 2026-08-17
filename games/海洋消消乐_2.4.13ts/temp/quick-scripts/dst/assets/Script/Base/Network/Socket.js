
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Network/Socket.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxOZXR3b3JrXFxTb2NrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWdDO0FBQ2hDLG9DQUFtQztBQUVuQyxZQUFZO0FBQ1osSUFBTSxZQUFZLEdBQVksSUFBSSxDQUFDO0FBQ25DLFlBQVk7QUFDWixJQUFNLGdCQUFnQixHQUFXLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDM0MsWUFBWTtBQUNaLElBQU0sZ0JBQWdCLEdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUUxQztJQUFvQywwQkFBTztJQVl2QyxnQkFBWSxHQUFXLEVBQUUsSUFBbUI7UUFBbkIscUJBQUEsRUFBQSxXQUFtQjtRQUE1QyxZQUNJLGlCQUFPLFNBR1Y7UUFkTyxRQUFFLEdBQWMsSUFBSSxDQUFDO1FBQ3JCLFVBQUksR0FBVyxJQUFJLENBQUM7UUFFcEIscUJBQWUsR0FBYSxJQUFJLENBQUM7UUFFakMsb0JBQWMsR0FBUSxJQUFJLENBQUM7UUFDM0Isb0JBQWMsR0FBUSxJQUFJLENBQUM7UUFNL0IsS0FBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7SUFDckIsQ0FBQztJQUVNLHdCQUFPLEdBQWQ7UUFBQSxpQkFLQztRQUpHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO1lBQ3ZCLEtBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO1lBQy9CLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTSwyQkFBVSxHQUFqQjtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0scUJBQUksR0FBWCxVQUFZLElBQUk7UUFDWixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLElB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Q0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVPLGtDQUFpQixHQUF6QjtRQUNJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVPLG9DQUFtQixHQUEzQjtRQUNJLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQXpJQSxBQXlJQyxDQXpJbUMsaUJBQU8sR0F5STFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5ldEJhc2UgZnJvbSBcIi4vTmV0QmFzZVwiO1xuaW1wb3J0IHsgTG9nIH0gZnJvbSBcIi4uL1V0aWxzL0xvZ1wiO1xuXG4vKiroh6rliqjlv4Pot7PmqKHlvI8gKi9cbmNvbnN0IEF1dG9IZWFyQmVhdDogYm9vbGVhbiA9IHRydWU7XG4vKirlv4Pot7Ppl7TpmpTml7bpl7QgKi9cbmNvbnN0IEhlYXJ0QmVhdEdhcFRpbWU6IG51bWJlciA9IDMwICogMTAwMDtcbi8qKumHjei/numXtOmalOaXtumXtCAqL1xuY29uc3QgUmVDb25uZWN0R2FwVGltZTogbnVtYmVyID0gMSAqIDEwMDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb2tldCBleHRlbmRzIE5ldEJhc2Uge1xuXG4gICAgcHJpdmF0ZSB3czogV2ViU29ja2V0ID0gbnVsbDtcbiAgICBwcml2YXRlIGRhdGE6IHN0cmluZyA9IG51bGw7XG5cbiAgICBwcml2YXRlIGNvbm5lY3RDYWxsQmFjazogRnVuY3Rpb24gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBoZWFydEJlYXRUaW1lcjogYW55ID0gbnVsbDtcbiAgICBwcml2YXRlIHJlQ29ubmVjdFRpbWVyOiBhbnkgPSBudWxsO1xuXG4gICAgcHJvdGVjdGVkIF9kZWxheVNlbmRQYWNrczogQXJyYXk8YW55PjtcblxuICAgIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nLCBkYXRhOiBzdHJpbmcgPSBudWxsKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb25uZWN0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdENhbGxCYWNrID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlV2ViU29ja2V0KCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuZGVzdG9yeVdzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNlbmQocGFjaykge1xuICAgICAgICBpZiAodGhpcy5pc1JlYWR5ICYmIHRoaXMud3MucmVhZHlTdGF0ZSA9PSBXZWJTb2NrZXQuT1BFTikge1xuICAgICAgICAgICAgdGhpcy53cyEuc2VuZChwYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v6L+Y5rKh5YeG5aSH5aW9ID8g6ZyA6KaB5oCO5LmI5aSE55CGID8g5L+d5a2Y5YyF5ZCXID8g5b6F5a6aIFxuICAgICAgICAgICAgTG9nLmUoJ0Vycm9yIHdlYnNvY2tldCDnirbmgIHlvILluLghJywgdGhpcy5pc1JlYWR5LCB0aGlzLndzLnJlYWR5U3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVXZWJTb2NrZXQoKSB7XG4gICAgICAgIHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KHRoaXMudXJsKTtcbiAgICAgICAgdGhpcy53cy5iaW5hcnlUeXBlID0gXCJhcnJheWJ1ZmZlclwiOyAgLy8gICAgXCJibG9iXCIgfCBcImFycmF5YnVmZmVyXCJcbiAgICAgICAgdGhpcy53cy5vbm9wZW4gPSB0aGlzLm9uT3Blbi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLndzLm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMud3Mub25jbG9zZSA9IHRoaXMub25DbG9zZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLndzLm9uZXJyb3IgPSB0aGlzLm9uRXJyb3IuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uT3BlbihldnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIExvZy5kKGB3cyAke3RoaXMudXJsfSBvcGVuZWRgKTtcbiAgICAgICAgaWYgKHRoaXMud3MgPT09IGV2dC50YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMub25Db25uZWN0ZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25DbG9zZShldnQ6IENsb3NlRXZlbnQpIHtcbiAgICAgICAgTG9nLmQoYHdzICR7dGhpcy51cmx9IGNsb3NlYCk7XG4gICAgICAgIHRoaXMuZGVzdG9yeVdzKCk7XG4gICAgICAgIHRoaXMuY2hlY2tJc05lZWRSZUNvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRXJyb3IoZXZ0OiBFcnJvckV2ZW50KSB7XG4gICAgICAgIExvZy5kKGB3cyAke3RoaXMudXJsfSBlcnJvcmAsIGV2dCk7XG4gICAgICAgIHRoaXMuZGVzdG9yeVdzKCk7XG4gICAgICAgIHRoaXMuY2hlY2tJc05lZWRSZUNvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTWVzc2FnZShtc2c6IE1lc3NhZ2VFdmVudCkge1xuICAgICAgICBjb25zb2xlLmluZm8oJ29uTWVzc2FnZTonLCBtc2cuZGF0YSk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU2VuZEhlYXJ0QmVhdCgpIHtcbiAgICAgICAgdGhpcy5zZW5kKCdIZWFydEJlYXQnKTtcbiAgICB9XG5cbiAgICAvKiog6L+e5o6l5bu656uL5LmL5ZCO6LCD55So77yM6L+Z6YeM5Y+v5Lul5Y+R6YCB6Lqr5Lu96aqM6K+B562JLi4uLi4uLiovXG4gICAgcHJpdmF0ZSBvbkNvbm5lY3RlZCgpIHtcbiAgICAgICAgdGhpcy5faXNSZWFkeSA9IHRydWU7XG4gICAgICAgIHRoaXMucmV0cnlDb3VudCA9IDA7XG4gICAgICAgIGlmIChBdXRvSGVhckJlYXQpIHtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVIZWFydEJlYXQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb25uZWN0Q2FsbEJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdENhbGxCYWNrKCk7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RDYWxsQmFjayA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uUmVDb25uZWN0KCkge1xuICAgICAgICAvL+aWree6v+WQjuS4gOebtOi/m+WFpemHjei/nlxuICAgICAgICBpZiAoIXRoaXMud3MgJiYgIXRoaXMuX2lzUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMucmV0cnlDb3VudCsrO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVuU2NoZWR1bGVSZUNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGVzdG9yeVdzKCkge1xuICAgICAgICB0aGlzLl9pc1JlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudW5TY2hlZHVsZUhlYXJ0QmVhdCgpO1xuICAgICAgICB0aGlzLnVuU2NoZWR1bGVSZUNvbm5lY3QoKTtcbiAgICAgICAgaWYgKHRoaXMud3MpIHtcbiAgICAgICAgICAgIHRoaXMud3Mub25vcGVuID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMud3Mub25tZXNzYWdlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMud3Mub25jbG9zZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLndzLm9uZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHRoaXMud3MucmVhZHlTdGF0ZSAhPT0gV2ViU29ja2V0LkNMT1NJTkcgJiYgdGhpcy53cy5yZWFkeVN0YXRlICE9PSBXZWJTb2NrZXQuQ0xPU0VEKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cy5jbG9zZSgzMDAwLCAnY2xpZW50IGNsb3NlIC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLndzID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrSXNOZWVkUmVDb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5pc0F1dG9SZXRyeSkge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZVJlQ29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzY2hlZHVsZVJlQ29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy51blNjaGVkdWxlUmVDb25uZWN0KCk7XG4gICAgICAgIHRoaXMucmVDb25uZWN0VGltZXIgPSBzZXRJbnRlcnZhbCh0aGlzLm9uUmVDb25uZWN0LmJpbmQodGhpcyksIFJlQ29ubmVjdEdhcFRpbWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdW5TY2hlZHVsZVJlQ29ubmVjdCgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnJlQ29ubmVjdFRpbWVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNjaGVkdWxlSGVhcnRCZWF0KCkge1xuICAgICAgICB0aGlzLnVuU2NoZWR1bGVIZWFydEJlYXQoKTtcbiAgICAgICAgdGhpcy5oZWFydEJlYXRUaW1lciA9IHNldEludGVydmFsKHRoaXMub25TZW5kSGVhcnRCZWF0LmJpbmQodGhpcyksIEhlYXJ0QmVhdEdhcFRpbWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdW5TY2hlZHVsZUhlYXJ0QmVhdCgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmhlYXJ0QmVhdFRpbWVyKTtcbiAgICB9XG59Il19