"use strict";
cc._RF.push(module, 'e20102YpnJP56fteVvIKIeT', 'PlatformMgr');
// Script/Base/Manager/PlatformMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Webapp_1 = require("./Plaform/Webapp");
var Wechat_1 = require("./Plaform/Wechat");
var Util_1 = require("../Utils/Util");
var BaseConst_1 = require("../BaseConst");
/**平台管理类 */
var PlatformMgr = /** @class */ (function () {
    function PlatformMgr() {
    }
    Object.defineProperty(PlatformMgr, "ins", {
        get: function () {
            if (PlatformMgr._instance) {
                return PlatformMgr._instance;
            }
            switch (this.getCurrentPlatformType()) {
                case BaseConst_1.PlatformType.Web:
                    PlatformMgr._instance = new Webapp_1.default();
                    break;
                case BaseConst_1.PlatformType.WxGame:
                    PlatformMgr._instance = new Wechat_1.default();
                    break;
            }
            return PlatformMgr._instance;
        },
        enumerable: false,
        configurable: true
    });
    /**获取当前平台类型 */
    PlatformMgr.getCurrentPlatformType = function () {
        var type = BaseConst_1.PlatformType.Web;
        if (Util_1.Util.Tool.isWechatGame()) {
            type = BaseConst_1.PlatformType.WxGame;
        }
        return type;
    };
    return PlatformMgr;
}());
exports.default = PlatformMgr;

cc._RF.pop();