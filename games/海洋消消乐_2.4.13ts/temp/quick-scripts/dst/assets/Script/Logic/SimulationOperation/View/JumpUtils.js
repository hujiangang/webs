
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/SimulationOperation/View/JumpUtils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a4de5XknPVK4Z2dvuJnRI8r', 'JumpUtils');
// Script/Logic/SimulationOperation/View/JumpUtils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UIMgr_1 = require("../../../Base/Manager/UIMgr");
var UIData_1 = require("../../Data/Interface/UIData");
var Common_1 = require("../../Common/Common");
var JumpUtils = /** @class */ (function () {
    function JumpUtils() {
    }
    JumpUtils.jump = function (content) {
        var _this = this;
        if (!content)
            return;
        var _a = content.split('#'), cmd = _a[0], parameter = _a[1];
        var _b = parameter.split('*'), delay = _b[0], param = _b[1];
        if (delay && param != undefined) {
            setTimeout(function () {
                _this.doAction(cmd, param);
            }, 1000 * Number(delay));
        }
        else {
            this.doAction(cmd, parameter);
        }
    };
    JumpUtils.doAction = function (cmd, param) {
        switch (cmd) {
            case 'scene':
                Common_1.default.jumpScene(param);
                break;
            case 'talk':
                UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.TalkPanel, param);
                break;
            case 'guide':
                UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.GuideLayer, null, function (guideLayer) {
                    cc.loader.loadRes('config/guide/guide_' + param, cc.JsonAsset, function (err, resource) {
                        if (err) {
                            return;
                        }
                        var task = resource.json;
                        guideLayer.setTask(task);
                        guideLayer.run();
                    });
                });
                break;
            case 'ui':
        }
    };
    return JumpUtils;
}());
exports.default = JumpUtils;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcU2ltdWxhdGlvbk9wZXJhdGlvblxcVmlld1xcSnVtcFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdEO0FBRWhELHNEQUF1RDtBQUV2RCw4Q0FBeUM7QUFFekM7SUFBQTtJQXdDQSxDQUFDO0lBdkNVLGNBQUksR0FBWCxVQUFZLE9BQWU7UUFBM0IsaUJBYUM7UUFaRyxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU87UUFFakIsSUFBQSxLQUFtQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFwQyxHQUFHLFFBQUEsRUFBRSxTQUFTLFFBQXNCLENBQUM7UUFDdEMsSUFBQSxLQUFpQixTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFwQyxLQUFLLFFBQUEsRUFBRSxLQUFLLFFBQXdCLENBQUM7UUFDMUMsSUFBSSxLQUFLLElBQUksS0FBSyxJQUFJLFNBQVMsRUFBRTtZQUM3QixVQUFVLENBQUM7Z0JBQ1AsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxFQUFFLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtTQUMzQjthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDakM7SUFFTCxDQUFDO0lBRWMsa0JBQVEsR0FBdkIsVUFBd0IsR0FBVyxFQUFFLEtBQWE7UUFDOUMsUUFBUSxHQUFHLEVBQUU7WUFDVCxLQUFLLE9BQU87Z0JBQ1IsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU07WUFDVixLQUFLLE1BQU07Z0JBQ1AsZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQVEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzVDLE1BQU07WUFDVixLQUFLLE9BQU87Z0JBQ1IsZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFVBQUMsVUFBc0I7b0JBQy9ELEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLHFCQUFxQixHQUFHLEtBQUssRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQUMsR0FBVSxFQUFFLFFBQXNCO3dCQUM5RixJQUFJLEdBQUcsRUFBRTs0QkFDTCxPQUFPO3lCQUNWO3dCQUNELElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7d0JBQ3pCLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3pCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDckIsQ0FBQyxDQUFDLENBQUE7Z0JBQ04sQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsTUFBTTtZQUNWLEtBQUssSUFBSSxDQUFDO1NBRWI7SUFDTCxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQXhDQSxBQXdDQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVJTWdyIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvVUlNZ3JcIjtcbmltcG9ydCBHdWlkZUxheWVyIGZyb20gXCIuL0d1aWRlL0d1aWRlTGF5ZXJcIjtcbmltcG9ydCB7IFVJSHVkRGVmIH0gZnJvbSBcIi4uLy4uL0RhdGEvSW50ZXJmYWNlL1VJRGF0YVwiO1xuaW1wb3J0IHsgVGFsa1BhbmVsIH0gZnJvbSBcIi4vVGFsay9UYWxrUGFuZWxcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uL0NvbW1vbi9Db21tb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSnVtcFV0aWxzIHtcbiAgICBzdGF0aWMganVtcChjb250ZW50OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFjb250ZW50KSByZXR1cm47XG5cbiAgICAgICAgbGV0IFtjbWQsIHBhcmFtZXRlcl0gPSBjb250ZW50LnNwbGl0KCcjJyk7XG4gICAgICAgIGxldCBbZGVsYXksIHBhcmFtXSA9IHBhcmFtZXRlci5zcGxpdCgnKicpO1xuICAgICAgICBpZiAoZGVsYXkgJiYgcGFyYW0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQWN0aW9uKGNtZCwgcGFyYW0pO1xuICAgICAgICAgICAgfSwgMTAwMCAqIE51bWJlcihkZWxheSkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRvQWN0aW9uKGNtZCwgcGFyYW1ldGVyKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZG9BY3Rpb24oY21kOiBzdHJpbmcsIHBhcmFtOiBzdHJpbmcpIHtcbiAgICAgICAgc3dpdGNoIChjbWQpIHtcbiAgICAgICAgICAgIGNhc2UgJ3NjZW5lJzpcbiAgICAgICAgICAgICAgICBDb21tb24uanVtcFNjZW5lKHBhcmFtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RhbGsnOlxuICAgICAgICAgICAgICAgIFVJTWdyLmlucy5zaG93VUkoVUlIdWREZWYuVGFsa1BhbmVsLCBwYXJhbSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdndWlkZSc6XG4gICAgICAgICAgICAgICAgVUlNZ3IuaW5zLnNob3dVSShVSUh1ZERlZi5HdWlkZUxheWVyLCBudWxsLCAoZ3VpZGVMYXllcjogR3VpZGVMYXllcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcygnY29uZmlnL2d1aWRlL2d1aWRlXycgKyBwYXJhbSwgY2MuSnNvbkFzc2V0LCAoZXJyOiBFcnJvciwgcmVzb3VyY2U6IGNjLkpzb25Bc3NldCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YXNrID0gcmVzb3VyY2UuanNvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGd1aWRlTGF5ZXIuc2V0VGFzayh0YXNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGd1aWRlTGF5ZXIucnVuKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3VpJzpcblxuICAgICAgICB9XG4gICAgfVxufSJdfQ==