"use strict";
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