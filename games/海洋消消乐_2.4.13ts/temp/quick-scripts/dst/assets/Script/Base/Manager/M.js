
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/M.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxNLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXdDO0FBQ3hDLHlDQUFvQztBQUNwQyw2Q0FBd0M7QUFDeEMsdUNBQWtDO0FBRWxDLCtDQUE4QztBQUM5Qyx1Q0FBa0M7QUFDbEMsaUNBQTRCO0FBQzVCLDBEQUFxRDtBQUNyRCxvQ0FBK0I7QUFDL0IsMERBQXFEO0FBQ3JELG1DQUE4QjtBQUU5QixZQUFZO0FBQ1o7SUFBQTtJQWlEQSxDQUFDO0lBeEJpQixNQUFJLEdBQWxCO1FBRUksSUFBSSxDQUFDLFFBQVEsR0FBRyxxQkFBVyxDQUFDLEdBQUcsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLG1CQUFTLENBQUMsR0FBRyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcscUJBQVcsQ0FBQyxHQUFHLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBUSxDQUFDLEdBQUcsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLDJCQUFZLENBQUMsR0FBRyxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBSSxDQUFDLEdBQUcsQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFTLENBQUMsR0FBRyxDQUFDO1FBQzNCLElBQUksQ0FBQyxHQUFHLEdBQUcsZ0JBQU0sQ0FBQyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBUSxDQUFDLEdBQUcsQ0FBQztRQUMxQixJQUFJLENBQUMsRUFBRSxHQUFHLGVBQUssQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxvQkFBVSxDQUFDLEdBQUcsQ0FBQztRQUU5QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFYSxhQUFXLEdBQXpCO0lBRUEsQ0FBQztJQUVhLFNBQU8sR0FBckI7SUFFQSxDQUFDO0lBOUNELFdBQVc7SUFDRyxJQUFFLEdBQVUsSUFBSSxDQUFDO0lBQy9CLFVBQVU7SUFDSSxPQUFLLEdBQWEsSUFBSSxDQUFDO0lBQ3JDLFVBQVU7SUFDSSxVQUFRLEdBQWMsSUFBSSxDQUFDO0lBQ3pDLFlBQVk7SUFDRSxRQUFNLEdBQWMsSUFBSSxDQUFDO0lBQ3ZDLFdBQVc7SUFDRyxVQUFRLEdBQWdCLElBQUksQ0FBQztJQUMzQyxVQUFVO0lBQ0ksT0FBSyxHQUFhLElBQUksQ0FBQztJQUNyQyxVQUFVO0lBQ0ksT0FBSyxHQUFpQixJQUFJLENBQUM7SUFDekMsWUFBWTtJQUNFLFNBQU8sR0FBZSxJQUFJLENBQUM7SUFDekMsUUFBUTtJQUNNLE1BQUksR0FBUyxJQUFJLENBQUM7SUFDaEMsY0FBYztJQUNBLEtBQUcsR0FBVyxJQUFJLENBQUM7SUFFbkIsT0FBSyxHQUFjLElBQUksQ0FBQztJQTBCMUMsUUFBQztDQWpERCxBQWlEQyxJQUFBO2tCQWpEb0IsQ0FBQztBQW1EdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF0Zm9ybU1nciBmcm9tIFwiLi9QbGF0Zm9ybU1nclwiO1xuaW1wb3J0IERldmljZU1nciBmcm9tIFwiLi9EZXZpY2VNZ3JcIjtcbmltcG9ydCBOb2RlUG9vbE1nciBmcm9tIFwiLi9Ob2RlUG9vbE1nclwiO1xuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuL0V2ZW50TWdyXCI7XG5pbXBvcnQgSVBsYXRmb3JtIGZyb20gXCIuL1BsYWZvcm0vSVBsYXRmb3JtXCI7XG5pbXBvcnQgeyBHYW1lVGFibGVNZ3IgfSBmcm9tIFwiLi9HYW1lVGFibGVNZ3JcIjtcbmltcG9ydCBDYWNoZU1nciBmcm9tIFwiLi9DYWNoZU1nclwiO1xuaW1wb3J0IFVJTWdyIGZyb20gXCIuL1VJTWdyXCI7XG5pbXBvcnQgUnVudGltZU1nciBmcm9tIFwiLi4vLi4vTG9naWMvRGF0YS9SdW50aW1lTWdyXCI7XG5pbXBvcnQgVGlwcyBmcm9tIFwiLi9WaWV3L1RpcHNcIjtcbmltcG9ydCBBdWRpb0N0cmwgZnJvbSBcIi4uLy4uL0xvZ2ljL0NvbW1vbi9BdWRpb0N0cmxcIjtcbmltcG9ydCBOZXRNZ3IgZnJvbSBcIi4vTmV0TWdyXCI7XG5cbi8qKiDnrqHnkIbnsbvlkIjpm4YgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE0ge1xuXG4gICAgLyoqVUkg566h55CGICovXG4gICAgcHVibGljIHN0YXRpYyB1aTogVUlNZ3IgPSBudWxsO1xuICAgIC8qKue8k+WtmOeuoeeQhiAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2FjaGU6IENhY2hlTWdyID0gbnVsbDtcbiAgICAvKirlubPlj7DnrqHnkIYgKi9cbiAgICBwdWJsaWMgc3RhdGljIHBsYXRmb3JtOiBJUGxhdGZvcm0gPSBudWxsO1xuICAgIC8qKuiuvuWkh+S/oeaBr+euoeeQhiAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZGV2aWNlOiBEZXZpY2VNZ3IgPSBudWxsO1xuICAgIC8qKuWvueixoeaxoOeuoeeQhiAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbm9kZVBvb2w6IE5vZGVQb29sTWdyID0gbnVsbDtcbiAgICAvKirkuovku7bnrqHnkIYgKi9cbiAgICBwdWJsaWMgc3RhdGljIGV2ZW50OiBFdmVudE1nciA9IG51bGw7XG4gICAgLyoq5LqL5Lu2566h55CGICovXG4gICAgcHVibGljIHN0YXRpYyB0YWJsZTogR2FtZVRhYmxlTWdyID0gbnVsbDtcbiAgICAvKirnlKjmiLfmlbDmja7nrqHnkIYgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJ1bnRpbWU6IFJ1bnRpbWVNZ3IgPSBudWxsO1xuICAgIC8qKuW8ueahhiAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdGlwczogVGlwcyA9IG51bGw7XG4gICAgLyoqaHR0cOi/nuaOpeeuoeeQhiAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbmV0OiBOZXRNZ3IgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBhdWRpbzogQXVkaW9DdHJsID0gbnVsbDtcblxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdCgpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLnBsYXRmb3JtID0gUGxhdGZvcm1NZ3IuaW5zO1xuICAgICAgICB0aGlzLmRldmljZSA9IERldmljZU1nci5pbnM7XG4gICAgICAgIHRoaXMubm9kZVBvb2wgPSBOb2RlUG9vbE1nci5pbnM7XG4gICAgICAgIHRoaXMuZXZlbnQgPSBFdmVudE1nci5pbnM7XG4gICAgICAgIHRoaXMudGFibGUgPSBHYW1lVGFibGVNZ3IuaW5zO1xuICAgICAgICB0aGlzLnRpcHMgPSBUaXBzLmlucztcbiAgICAgICAgdGhpcy5hdWRpbyA9IEF1ZGlvQ3RybC5pbnM7XG4gICAgICAgIHRoaXMubmV0ID0gTmV0TWdyLmlucztcbiAgICAgICAgdGhpcy5jYWNoZSA9IENhY2hlTWdyLmlucztcbiAgICAgICAgdGhpcy51aSA9IFVJTWdyLmlucztcbiAgICAgICAgdGhpcy5ydW50aW1lID0gUnVudGltZU1nci5pbnM7XG5cbiAgICAgICAgdGhpcy50YWJsZS5leGVjdXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjaGFuZ2VTY2VuZSgpIHtcblxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZGVzdG9yeSgpIHtcblxuICAgIH1cbn1cblxud2luZG93W1wiTVwiXSA9IE07Il19