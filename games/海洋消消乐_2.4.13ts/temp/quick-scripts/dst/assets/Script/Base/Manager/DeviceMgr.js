
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/DeviceMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b13b0MaaixLu6ryB/di8Jse', 'DeviceMgr');
// Script/Base/Manager/DeviceMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlatformMgr_1 = require("./PlatformMgr");
var SingletonFactory_1 = require("../Utils/SingletonFactory");
var DeviceMgr = /** @class */ (function () {
    function DeviceMgr() {
    }
    /**获取设备型号! */
    DeviceMgr.prototype.getDeviceModel = function () {
        var systemInfo = PlatformMgr_1.default.ins.getSystemInfoSync();
        if (!systemInfo || !systemInfo['system']) {
            return null;
        }
        if (systemInfo['system'].indexOf("Android") >= 0) {
            return "Android";
        }
        else if (systemInfo['model'].indexOf("iPhone X") >= 0 || systemInfo['model'].indexOf("unknow") >= 0) {
            return "ipX";
        }
        else {
            return "iphone";
        }
    };
    Object.defineProperty(DeviceMgr.prototype, "isAndroid", {
        get: function () {
            if (cc.sys.platform == cc.sys.ANDROID) {
                return 1;
            }
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    DeviceMgr.ins = SingletonFactory_1.SingletonFactory.getInstance(DeviceMgr);
    return DeviceMgr;
}());
exports.default = DeviceMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxEZXZpY2VNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBd0M7QUFDeEMsOERBQTZEO0FBRzdEO0lBQUE7SUF5QkEsQ0FBQztJQXJCRyxhQUFhO0lBQ04sa0NBQWMsR0FBckI7UUFDSSxJQUFNLFVBQVUsR0FBRyxxQkFBVyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdEMsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDOUMsT0FBTyxTQUFTLENBQUM7U0FDcEI7YUFBTSxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ25HLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO2FBQU07WUFDSCxPQUFPLFFBQVEsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFFRCxzQkFBVyxnQ0FBUzthQUFwQjtZQUNJLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ25DLE9BQU8sQ0FBQyxDQUFDO2FBQ1o7WUFDRCxPQUFPLENBQUMsQ0FBQztRQUNiLENBQUM7OztPQUFBO0lBdEJhLGFBQUcsR0FBYyxtQ0FBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUF1QjNFLGdCQUFDO0NBekJELEFBeUJDLElBQUE7a0JBekJvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYXRmb3JtTWdyIGZyb20gXCIuL1BsYXRmb3JtTWdyXCI7XG5pbXBvcnQgeyBTaW5nbGV0b25GYWN0b3J5IH0gZnJvbSBcIi4uL1V0aWxzL1NpbmdsZXRvbkZhY3RvcnlcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXZpY2VNZ3Ige1xuXG4gICAgcHVibGljIHN0YXRpYyBpbnM6IERldmljZU1nciA9IFNpbmdsZXRvbkZhY3RvcnkuZ2V0SW5zdGFuY2UoRGV2aWNlTWdyKTtcblxuICAgIC8qKuiOt+WPluiuvuWkh+Wei+WPtyEgKi9cbiAgICBwdWJsaWMgZ2V0RGV2aWNlTW9kZWwoKSB7XG4gICAgICAgIGNvbnN0IHN5c3RlbUluZm8gPSBQbGF0Zm9ybU1nci5pbnMuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgICAgaWYgKCFzeXN0ZW1JbmZvIHx8ICFzeXN0ZW1JbmZvWydzeXN0ZW0nXSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN5c3RlbUluZm9bJ3N5c3RlbSddLmluZGV4T2YoXCJBbmRyb2lkXCIpID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiBcIkFuZHJvaWRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChzeXN0ZW1JbmZvWydtb2RlbCddLmluZGV4T2YoXCJpUGhvbmUgWFwiKSA+PSAwIHx8IHN5c3RlbUluZm9bJ21vZGVsJ10uaW5kZXhPZihcInVua25vd1wiKSA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJpcFhcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcImlwaG9uZVwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc0FuZHJvaWQoKSB7XG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLkFORFJPSUQpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbn0iXX0=