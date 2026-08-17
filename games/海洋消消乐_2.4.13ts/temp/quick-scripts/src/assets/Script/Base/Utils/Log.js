"use strict";
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