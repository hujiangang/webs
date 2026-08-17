"use strict";
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