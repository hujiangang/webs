
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Apps.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b8271REATBDrqYiVEv4BxE0', 'Apps');
// Script/Base/Apps.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("./Utils/Util");
var Apps = /** @class */ (function () {
    function Apps() {
    }
    Apps.Version = "1.0.2";
    /** 当前国家的语言版本 */
    Apps.country = "cn";
    /** 是否开启加密传输 */
    Apps.isEncode = false;
    /** 是否开发模式 */
    Apps.isDebug = !Util_1.Util.Tool.isWechatGame();
    /** 是否打印消息 */
    Apps.isLog = true;
    /** 是否打开网络同步开关 */
    Apps.isOpenNet = true;
    /** 是否打开GM面板 */
    Apps.isOpenGM = true; // !Util.Tool.isWechatGame();
    return Apps;
}());
exports.default = Apps;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxBcHBzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQW9DO0FBRXBDO0lBQUE7SUFnQkEsQ0FBQztJQWQwQixZQUFPLEdBQVcsT0FBTyxDQUFDO0lBQ2pELGdCQUFnQjtJQUNPLFlBQU8sR0FBVyxJQUFJLENBQUM7SUFDOUMsZUFBZTtJQUNRLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFDakQsYUFBYTtJQUNVLFlBQU8sR0FBWSxDQUFDLFdBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDcEUsYUFBYTtJQUNVLFVBQUssR0FBWSxJQUFJLENBQUM7SUFDN0MsaUJBQWlCO0lBQ00sY0FBUyxHQUFZLElBQUksQ0FBQztJQUNqRCxlQUFlO0lBQ1EsYUFBUSxHQUFZLElBQUksQ0FBQyxDQUFBLDZCQUE2QjtJQUVqRixXQUFDO0NBaEJELEFBZ0JDLElBQUE7a0JBaEJvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuL1V0aWxzL1V0aWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwcyB7XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFZlcnNpb246IHN0cmluZyA9IFwiMS4wLjJcIjtcbiAgICAvKiog5b2T5YmN5Zu95a6255qE6K+t6KiA54mI5pysICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBjb3VudHJ5OiBzdHJpbmcgPSBcImNuXCI7XG4gICAgLyoqIOaYr+WQpuW8gOWQr+WKoOWvhuS8oOi+kyAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaXNFbmNvZGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKiog5piv5ZCm5byA5Y+R5qih5byPICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBpc0RlYnVnOiBib29sZWFuID0gIVV0aWwuVG9vbC5pc1dlY2hhdEdhbWUoKTtcbiAgICAvKiog5piv5ZCm5omT5Y2w5raI5oGvICovXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBpc0xvZzogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqIOaYr+WQpuaJk+W8gOe9kee7nOWQjOatpeW8gOWFsyAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgaXNPcGVuTmV0OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKiog5piv5ZCm5omT5byAR03pnaLmnb8gKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGlzT3BlbkdNOiBib29sZWFuID0gdHJ1ZTsvLyAhVXRpbC5Ub29sLmlzV2VjaGF0R2FtZSgpO1xuXG59Il19