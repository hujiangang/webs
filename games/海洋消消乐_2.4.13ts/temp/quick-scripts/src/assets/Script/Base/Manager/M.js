"use strict";
cc._RF.push(module, '78cb3i1bW9AErD14YvbVYvX', 'M');
// Script/Base/Manager/M.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlatformMgr_1 = require("./PlatformMgr");
var DeviceMgr_1 = require("./DeviceMgr");
var NodePoolMgr_1 = require("./NodePoolMgr");
var EventMgr_1 = require("./EventMgr");
var GameTableMgr_1 = require("./GameTableMgr");
var CacheMgr_1 = require("./CacheMgr");
var UIMgr_1 = require("./UIMgr");
var RuntimeMgr_1 = require("../../Logic/Data/RuntimeMgr");
var Tips_1 = require("./View/Tips");
var AudioCtrl_1 = require("../../Logic/Common/AudioCtrl");
var NetMgr_1 = require("./NetMgr");
/** 管理类合集 */
var M = /** @class */ (function () {
    function M() {
    }
    M.init = function () {
        this.platform = PlatformMgr_1.default.ins;
        this.device = DeviceMgr_1.default.ins;
        this.nodePool = NodePoolMgr_1.default.ins;
        this.event = EventMgr_1.default.ins;
        this.table = GameTableMgr_1.GameTableMgr.ins;
        this.tips = Tips_1.default.ins;
        this.audio = AudioCtrl_1.default.ins;
        this.net = NetMgr_1.default.ins;
        this.cache = CacheMgr_1.default.ins;
        this.ui = UIMgr_1.default.ins;
        this.runtime = RuntimeMgr_1.default.ins;
        this.table.execute();
    };
    M.changeScene = function () {
    };
    M.destory = function () {
    };
    /**UI 管理 */
    M.ui = null;
    /**缓存管理 */
    M.cache = null;
    /**平台管理 */
    M.platform = null;
    /**设备信息管理 */
    M.device = null;
    /**对象池管理 */
    M.nodePool = null;
    /**事件管理 */
    M.event = null;
    /**事件管理 */
    M.table = null;
    /**用户数据管理 */
    M.runtime = null;
    /**弹框 */
    M.tips = null;
    /**http连接管理 */
    M.net = null;
    M.audio = null;
    return M;
}());
exports.default = M;
window["M"] = M;

cc._RF.pop();