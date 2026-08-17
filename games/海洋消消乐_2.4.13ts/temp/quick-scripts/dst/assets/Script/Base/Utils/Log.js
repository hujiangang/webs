
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Utils/Log.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9e0b0hp2d1P6azFHsIT9cLM', 'Log');
// Script/Base/Utils/Log.ts

"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = exports.LOG_TAG = void 0;
var Apps_1 = require("../Apps");
// 个人开关，只对log方法有效
exports.LOG_TAG = {
    SOCKET: { desc: 'LOG_SOCKET', isOpen: true },
    TEST: { desc: 'LOG_TEST', isOpen: false },
    CACHE: { desc: 'LOG_CACHE', isOpen: false },
    GUIDE: { desc: 'LOG_GUIDE', isOpen: true }
};
var LEVEL;
(function (LEVEL) {
    LEVEL[LEVEL["DEBUG"] = 0] = "DEBUG";
    LEVEL[LEVEL["INFO"] = 1] = "INFO";
    LEVEL[LEVEL["WARN"] = 2] = "WARN";
    LEVEL[LEVEL["ERROR"] = 3] = "ERROR";
})(LEVEL || (LEVEL = {}));
;
var CURRENT_LEVEL = LEVEL.DEBUG;
var TARGET_TAG = 'SOE => ';
var ShowStackAndTime = false;
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.d = function (msg) {
        var subst = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            subst[_i - 1] = arguments[_i];
        }
        (CURRENT_LEVEL < LEVEL.INFO && Apps_1.default.isDebug) && console.log.apply(console, __spreadArrays([TARGET_TAG, msg], subst));
    };
    Log.i = function (msg) {
        var subst = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            subst[_i - 1] = arguments[_i];
        }
        (CURRENT_LEVEL < LEVEL.WARN && Apps_1.default.isDebug) && console.log.apply(console, __spreadArrays([TARGET_TAG, msg], subst));
    };
    Log.w = function (msg) {
        var subst = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            subst[_i - 1] = arguments[_i];
        }
        (CURRENT_LEVEL < LEVEL.ERROR && Apps_1.default.isDebug) && console.warn.apply(console, __spreadArrays([TARGET_TAG, msg], subst));
    };
    Log.e = function (msg) {
        var subst = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            subst[_i - 1] = arguments[_i];
        }
        Apps_1.default.isDebug && console.error.apply(console, __spreadArrays([TARGET_TAG, msg], subst));
    };
    Log.log = function (tag) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var backLog = console.log || cc.log;
        if (!tag || !tag.isOpen) {
            return;
        }
        var arr = Array.prototype.slice.call(arguments);
        arr.splice(0, 1, "[" + tag.desc + "]");
        this.addStackAndTime(arr);
        backLog.apply(backLog, arr);
    };
    Log.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var backLog = console.warn || cc.warn;
        var arr = Array.prototype.slice.call(arguments);
        this.addStackAndTime(arr);
        backLog.apply(backLog, arr);
    };
    Log.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var backLog = console.error || cc.error;
        var arr = Array.prototype.slice.call(arguments);
        this.addStackAndTime(arr);
        backLog.apply(backLog, arr);
    };
    Log.addStackAndTime = function (arr) {
        if (ShowStackAndTime) {
            var info = Log.stack(2) + Log.getDateString() + " ";
            arr.splice(0, 0, info);
        }
    };
    Log.getDateString = function () {
        var d = new Date();
        var str = d.getHours().toString();
        var timeStr = "";
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMinutes().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getSeconds().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMilliseconds().toString();
        if (str.length == 1)
            str = "00" + str;
        if (str.length == 2)
            str = "0" + str;
        timeStr += str;
        timeStr = "[" + timeStr + "]";
        return timeStr;
    };
    Log.stack = function (index) {
        if (index === void 0) { index = 2; }
        var e = new Error();
        var lines = e.stack.split("\n");
        lines.shift();
        var result = [];
        lines.forEach(function (line) {
            var _a;
            line = line.substring(7);
            var lineBreak = line.split(" ");
            if (lineBreak.length < 2) {
                result.push(lineBreak[0]);
            }
            else {
                result.push((_a = {}, _a[lineBreak[0]] = lineBreak[1], _a));
            }
        });
        var list = [];
        if (index < result.length - 1) {
            for (var a in result[index]) {
                list.push(a);
            }
        }
        var splitList = list[0].split(".");
        return (splitList[0] + ".js->" + splitList[1] + ":");
    };
    return Log;
}());
exports.Log = Log;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxVdGlsc1xcTG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnQ0FBMkI7QUFFM0IsaUJBQWlCO0FBQ0osUUFBQSxPQUFPLEdBQUc7SUFDbkIsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0lBQzVDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtJQUN6QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7SUFDM0MsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0NBQzdDLENBQUE7QUFFRCxJQUFLLEtBQWtDO0FBQXZDLFdBQUssS0FBSztJQUFHLG1DQUFLLENBQUE7SUFBRSxpQ0FBSSxDQUFBO0lBQUUsaUNBQUksQ0FBQTtJQUFFLG1DQUFLLENBQUE7QUFBQyxDQUFDLEVBQWxDLEtBQUssS0FBTCxLQUFLLFFBQTZCO0FBQUEsQ0FBQztBQUV4QyxJQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO0FBQ2pDLElBQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQztBQUU3QixJQUFNLGdCQUFnQixHQUFHLEtBQUssQ0FBQztBQUUvQjtJQUFBO0lBNkZBLENBQUM7SUEzRmlCLEtBQUMsR0FBZixVQUFnQixHQUFpQjtRQUFFLGVBQWU7YUFBZixVQUFlLEVBQWYscUJBQWUsRUFBZixJQUFlO1lBQWYsOEJBQWU7O1FBQzlDLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksY0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxHQUFHLE9BQVgsT0FBTyxrQkFBSyxVQUFVLEVBQUUsR0FBRyxHQUFLLEtBQUssRUFBQyxDQUFDO0lBQzNG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LENBQUM7YUFDaEI7U0FDSjtRQUVELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFDTCxVQUFDO0FBQUQsQ0E3RkEsQUE2RkMsSUFBQTtBQTdGWSxrQkFBRyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcHBzIGZyb20gXCIuLi9BcHBzXCI7XG5cbi8vIOS4quS6uuW8gOWFs++8jOWPquWvuWxvZ+aWueazleacieaViFxuZXhwb3J0IGNvbnN0IExPR19UQUcgPSB7XG4gICAgU09DS0VUOiB7IGRlc2M6ICdMT0dfU09DS0VUJywgaXNPcGVuOiB0cnVlIH0sXG4gICAgVEVTVDogeyBkZXNjOiAnTE9HX1RFU1QnLCBpc09wZW46IGZhbHNlIH0sXG4gICAgQ0FDSEU6IHsgZGVzYzogJ0xPR19DQUNIRScsIGlzT3BlbjogZmFsc2UgfSxcbiAgICBHVUlERTogeyBkZXNjOiAnTE9HX0dVSURFJywgaXNPcGVuOiB0cnVlIH1cbn1cblxuZW51bSBMRVZFTCB7IERFQlVHLCBJTkZPLCBXQVJOLCBFUlJPUiB9O1xuXG5jb25zdCBDVVJSRU5UX0xFVkVMID0gTEVWRUwuREVCVUdcbmNvbnN0IFRBUkdFVF9UQUcgPSAnU09FID0+ICc7XG5cbmNvbnN0IFNob3dTdGFja0FuZFRpbWUgPSBmYWxzZTtcblxuZXhwb3J0IGNsYXNzIExvZyB7XG5cbiAgICBwdWJsaWMgc3RhdGljIGQobXNnOiBzdHJpbmcgfCBhbnksIC4uLnN1YnN0OiBhbnlbXSkge1xuICAgICAgICAoQ1VSUkVOVF9MRVZFTCA8IExFVkVMLklORk8gJiYgQXBwcy5pc0RlYnVnKSAmJiBjb25zb2xlLmxvZyhUQVJHRVRfVEFHLCBtc2csIC4uLnN1YnN0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGkobXNnOiBzdHJpbmcgfCBhbnksIC4uLnN1YnN0OiBhbnlbXSkge1xuICAgICAgICAoQ1VSUkVOVF9MRVZFTCA8IExFVkVMLldBUk4gJiYgQXBwcy5pc0RlYnVnKSAmJiBjb25zb2xlLmxvZyhUQVJHRVRfVEFHLCBtc2csIC4uLnN1YnN0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHcobXNnOiBzdHJpbmcgfCBhbnksIC4uLnN1YnN0OiBhbnlbXSkge1xuICAgICAgICAoQ1VSUkVOVF9MRVZFTCA8IExFVkVMLkVSUk9SICYmIEFwcHMuaXNEZWJ1ZykgJiYgY29uc29sZS53YXJuKFRBUkdFVF9UQUcsIG1zZywgLi4uc3Vic3QpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZShtc2c6IHN0cmluZyB8IGFueSwgLi4uc3Vic3Q6IGFueVtdKSB7XG4gICAgICAgIEFwcHMuaXNEZWJ1ZyAmJiBjb25zb2xlLmVycm9yKFRBUkdFVF9UQUcsIG1zZywgLi4uc3Vic3QpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgbG9nKHRhZywgLi4uYXJncykge1xuICAgICAgICB2YXIgYmFja0xvZyA9IGNvbnNvbGUubG9nIHx8IGNjLmxvZ1xuICAgICAgICBpZiAoIXRhZyB8fCAhdGFnLmlzT3Blbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhcnI6IEFycmF5PGFueT4gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICBhcnIuc3BsaWNlKDAsIDEsIGBbJHt0YWcuZGVzY31dYCk7XG4gICAgICAgIHRoaXMuYWRkU3RhY2tBbmRUaW1lKGFycik7XG4gICAgICAgIGJhY2tMb2cuYXBwbHkoYmFja0xvZywgYXJyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHdhcm4oLi4uYXJncykge1xuICAgICAgICB2YXIgYmFja0xvZyA9IGNvbnNvbGUud2FybiB8fCBjYy53YXJuXG4gICAgICAgIGxldCBhcnI6IEFycmF5PGFueT4gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICB0aGlzLmFkZFN0YWNrQW5kVGltZShhcnIpO1xuICAgICAgICBiYWNrTG9nLmFwcGx5KGJhY2tMb2csIGFycik7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBlcnJvciguLi5hcmdzKSB7XG4gICAgICAgIHZhciBiYWNrTG9nID0gY29uc29sZS5lcnJvciB8fCBjYy5lcnJvclxuICAgICAgICBsZXQgYXJyOiBBcnJheTxhbnk+ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5hZGRTdGFja0FuZFRpbWUoYXJyKTtcbiAgICAgICAgYmFja0xvZy5hcHBseShiYWNrTG9nLCBhcnIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGFkZFN0YWNrQW5kVGltZShhcnIpIHtcbiAgICAgICAgaWYgKFNob3dTdGFja0FuZFRpbWUpIHtcbiAgICAgICAgICAgIGxldCBpbmZvID0gTG9nLnN0YWNrKDIpICsgTG9nLmdldERhdGVTdHJpbmcoKSArIFwiIFwiO1xuICAgICAgICAgICAgYXJyLnNwbGljZSgwLCAwLCBpbmZvKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldERhdGVTdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBsZXQgc3RyID0gZC5nZXRIb3VycygpLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCB0aW1lU3RyID0gXCJcIjtcbiAgICAgICAgdGltZVN0ciArPSAoc3RyLmxlbmd0aCA9PSAxID8gXCIwXCIgKyBzdHIgOiBzdHIpICsgXCI6XCI7XG4gICAgICAgIHN0ciA9IGQuZ2V0TWludXRlcygpLnRvU3RyaW5nKCk7XG4gICAgICAgIHRpbWVTdHIgKz0gKHN0ci5sZW5ndGggPT0gMSA/IFwiMFwiICsgc3RyIDogc3RyKSArIFwiOlwiO1xuICAgICAgICBzdHIgPSBkLmdldFNlY29uZHMoKS50b1N0cmluZygpO1xuICAgICAgICB0aW1lU3RyICs9IChzdHIubGVuZ3RoID09IDEgPyBcIjBcIiArIHN0ciA6IHN0cikgKyBcIjpcIjtcbiAgICAgICAgc3RyID0gZC5nZXRNaWxsaXNlY29uZHMoKS50b1N0cmluZygpO1xuICAgICAgICBpZiAoc3RyLmxlbmd0aCA9PSAxKSBzdHIgPSBcIjAwXCIgKyBzdHI7XG4gICAgICAgIGlmIChzdHIubGVuZ3RoID09IDIpIHN0ciA9IFwiMFwiICsgc3RyO1xuICAgICAgICB0aW1lU3RyICs9IHN0cjtcblxuICAgICAgICB0aW1lU3RyID0gXCJbXCIgKyB0aW1lU3RyICsgXCJdXCI7XG4gICAgICAgIHJldHVybiB0aW1lU3RyO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHN0YWNrKGluZGV4ID0gMik6IHN0cmluZyB7XG4gICAgICAgIHZhciBlID0gbmV3IEVycm9yKCk7XG4gICAgICAgIHZhciBsaW5lcyA9IGUuc3RhY2suc3BsaXQoXCJcXG5cIik7XG4gICAgICAgIGxpbmVzLnNoaWZ0KCk7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgbGluZXMuZm9yRWFjaChmdW5jdGlvbiAobGluZSkge1xuICAgICAgICAgICAgbGluZSA9IGxpbmUuc3Vic3RyaW5nKDcpO1xuICAgICAgICAgICAgdmFyIGxpbmVCcmVhayA9IGxpbmUuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgaWYgKGxpbmVCcmVhay5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobGluZUJyZWFrWzBdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goeyBbbGluZUJyZWFrWzBdXTogbGluZUJyZWFrWzFdIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbGlzdCA9IFtdO1xuICAgICAgICBpZiAoaW5kZXggPCByZXN1bHQubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgZm9yICh2YXIgYSBpbiByZXN1bHRbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNwbGl0TGlzdCA9IGxpc3RbMF0uc3BsaXQoXCIuXCIpO1xuICAgICAgICByZXR1cm4gKHNwbGl0TGlzdFswXSArIFwiLmpzLT5cIiArIHNwbGl0TGlzdFsxXSArIFwiOlwiKTtcbiAgICB9XG59Il19