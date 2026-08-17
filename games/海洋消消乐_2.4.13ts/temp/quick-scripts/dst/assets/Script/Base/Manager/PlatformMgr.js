
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/PlatformMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxQbGF0Zm9ybU1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDJDQUFzQztBQUN0QywyQ0FBc0M7QUFDdEMsc0NBQXFDO0FBQ3JDLDBDQUE0QztBQUU1QyxXQUFXO0FBQ1g7SUFBQTtJQTZCQSxDQUFDO0lBekJHLHNCQUFrQixrQkFBRzthQUFyQjtZQUVJLElBQUksV0FBVyxDQUFDLFNBQVMsRUFBRTtnQkFDdkIsT0FBTyxXQUFXLENBQUMsU0FBUyxDQUFDO2FBQ2hDO1lBQ0QsUUFBUSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsRUFBRTtnQkFDbkMsS0FBSyx3QkFBWSxDQUFDLEdBQUc7b0JBQ2pCLFdBQVcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxnQkFBTSxFQUFFLENBQUM7b0JBQ3JDLE1BQUs7Z0JBQ1QsS0FBSyx3QkFBWSxDQUFDLE1BQU07b0JBQ3BCLFdBQVcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxnQkFBTSxFQUFFLENBQUE7b0JBQ3BDLE1BQUs7YUFDWjtZQUNELE9BQU8sV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUNqQyxDQUFDOzs7T0FBQTtJQUVELGNBQWM7SUFDQSxrQ0FBc0IsR0FBcEM7UUFDSSxJQUFJLElBQUksR0FBRyx3QkFBWSxDQUFDLEdBQUcsQ0FBQztRQUM1QixJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDMUIsSUFBSSxHQUFHLHdCQUFZLENBQUMsTUFBTSxDQUFDO1NBQzlCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVMLGtCQUFDO0FBQUQsQ0E3QkEsQUE2QkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJUGxhdGZvcm0gZnJvbSBcIi4vUGxhZm9ybS9JUGxhdGZvcm1cIjtcbmltcG9ydCBXZWJhcHAgZnJvbSBcIi4vUGxhZm9ybS9XZWJhcHBcIjtcbmltcG9ydCBXZWNoYXQgZnJvbSBcIi4vUGxhZm9ybS9XZWNoYXRcIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vVXRpbHMvVXRpbFwiO1xuaW1wb3J0IHsgUGxhdGZvcm1UeXBlIH0gZnJvbSBcIi4uL0Jhc2VDb25zdFwiO1xuXG4vKirlubPlj7DnrqHnkIbnsbsgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXRmb3JtTWdyIHtcblxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogSVBsYXRmb3JtO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgaW5zKCk6IElQbGF0Zm9ybSB7XG5cbiAgICAgICAgaWYgKFBsYXRmb3JtTWdyLl9pbnN0YW5jZSkge1xuICAgICAgICAgICAgcmV0dXJuIFBsYXRmb3JtTWdyLl9pbnN0YW5jZTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0Q3VycmVudFBsYXRmb3JtVHlwZSgpKSB7XG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtVHlwZS5XZWI6XG4gICAgICAgICAgICAgICAgUGxhdGZvcm1NZ3IuX2luc3RhbmNlID0gbmV3IFdlYmFwcCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIFBsYXRmb3JtVHlwZS5XeEdhbWU6XG4gICAgICAgICAgICAgICAgUGxhdGZvcm1NZ3IuX2luc3RhbmNlID0gbmV3IFdlY2hhdCgpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUGxhdGZvcm1NZ3IuX2luc3RhbmNlO1xuICAgIH1cblxuICAgIC8qKuiOt+WPluW9k+WJjeW5s+WPsOexu+WeiyAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q3VycmVudFBsYXRmb3JtVHlwZSgpOiBQbGF0Zm9ybVR5cGUge1xuICAgICAgICBsZXQgdHlwZSA9IFBsYXRmb3JtVHlwZS5XZWI7XG4gICAgICAgIGlmIChVdGlsLlRvb2wuaXNXZWNoYXRHYW1lKCkpIHtcbiAgICAgICAgICAgIHR5cGUgPSBQbGF0Zm9ybVR5cGUuV3hHYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cblxufSJdfQ==