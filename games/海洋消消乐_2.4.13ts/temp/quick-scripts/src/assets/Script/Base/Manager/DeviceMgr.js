"use strict";
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