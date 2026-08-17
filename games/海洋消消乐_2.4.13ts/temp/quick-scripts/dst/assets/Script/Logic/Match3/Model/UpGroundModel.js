
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/UpGroundModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2543djlU/JE87VTZ3cYRvHC', 'UpGroundModel');
// Script/Logic/Match3/Model/UpGroundModel.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpGroundModel = void 0;
var UpGroundCellModel_1 = require("./UpGroundCellModel");
var UpGroundModel = /** @class */ (function () {
    function UpGroundModel() {
        //上层特殊元素
        this.ugCellList = null;
        this.boxMap = null;
        this.portalMap = null;
        this.ugCellList = [];
        this.boxMap = new Map();
        this.portalMap = new Map();
    }
    /**初始化网格数据 */
    UpGroundModel.prototype.initUpGroupCell = function (data, x, y, index) {
        var item = new UpGroundCellModel_1.default();
        item.init(data, x, y, index);
        var warr = this.ugCellList[y] || [];
        warr.push(item);
        this.ugCellList[y] = warr;
        if (item.isBox) {
            this.boxMap.set(this.getPosKey(item.pos), item.pos);
        }
        if (item.portalIdx) {
            this.syncPortal(item);
        }
        return item;
    };
    UpGroundModel.prototype.getUGroupCellList = function () {
        return this.ugCellList;
    };
    /**通过网格坐标获取cell值 */
    UpGroundModel.prototype.getUGCellByPos = function (pos) {
        return this.ugCellList[pos.y][pos.x];
    };
    UpGroundModel.prototype.updateCollectCount = function (type, pos) {
        if (type == 'box') {
            var key = this.getPosKey(pos);
            this.boxMap.has(key) && this.boxMap.delete(key);
        }
    };
    /**同步传送门的对照表! */
    UpGroundModel.prototype.syncPortal = function (model) {
        var key = Math.abs(model.portalIdx);
        var data = this.portalMap.get(key) || {};
        if (model.portalIdx < 0) {
            data.in = model.pos;
        }
        else {
            data.out = model.pos;
        }
        this.portalMap.set(key, data);
    };
    UpGroundModel.prototype.getPosKey = function (pos) {
        return pos.x + "-" + pos.y;
    };
    UpGroundModel.prototype.getPortalPos = function (index) {
        return this.portalMap.get(Math.abs(index));
    };
    UpGroundModel.prototype.getAllPortal = function () {
        return this.portalMap;
    };
    Object.defineProperty(UpGroundModel.prototype, "BoxMap", {
        get: function () {
            return this.boxMap;
        },
        enumerable: false,
        configurable: true
    });
    return UpGroundModel;
}());
exports.UpGroundModel = UpGroundModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcVXBHcm91bmRNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5REFBbUQ7QUFHbkQ7SUFRSTtRQU5BLFFBQVE7UUFDQSxlQUFVLEdBQW1DLElBQUksQ0FBQztRQUVsRCxXQUFNLEdBQXlCLElBQUksQ0FBQTtRQUNuQyxjQUFTLEdBQStDLElBQUksQ0FBQTtRQUdoRSxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxhQUFhO0lBQ04sdUNBQWUsR0FBdEIsVUFBdUIsSUFBVSxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsS0FBYTtRQUNsRSxJQUFNLElBQUksR0FBRyxJQUFJLDJCQUFnQixFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2RDtRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLHlDQUFpQixHQUF4QjtRQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQsbUJBQW1CO0lBQ1osc0NBQWMsR0FBckIsVUFBc0IsR0FBNkI7UUFDL0MsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVNLDBDQUFrQixHQUF6QixVQUEwQixJQUF1QixFQUFFLEdBQVk7UUFDM0QsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQ2YsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNuRDtJQUNMLENBQUM7SUFFRCxnQkFBZ0I7SUFDUixrQ0FBVSxHQUFsQixVQUFtQixLQUF1QjtRQUN0QyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxJQUFNLElBQUksR0FBUSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEQsSUFBSSxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDdkI7YUFBTTtZQUNILElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUN4QjtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU8saUNBQVMsR0FBakIsVUFBa0IsR0FBWTtRQUMxQixPQUFVLEdBQUcsQ0FBQyxDQUFDLFNBQUksR0FBRyxDQUFDLENBQUcsQ0FBQTtJQUM5QixDQUFDO0lBRU0sb0NBQVksR0FBbkIsVUFBb0IsS0FBYTtRQUM3QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU0sb0NBQVksR0FBbkI7UUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELHNCQUFXLGlDQUFNO2FBQWpCO1lBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRUwsb0JBQUM7QUFBRCxDQTFFQSxBQTBFQyxJQUFBO0FBMUVZLHNDQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JpZCB9IGZyb20gXCIuLi8uLi9EYXRhL0ludGVyZmFjZS9MZXZlbC9JTGV2ZWxcIjtcbmltcG9ydCBVR3JvdW5kQ2VsbE1vZGVsIGZyb20gXCIuL1VwR3JvdW5kQ2VsbE1vZGVsXCI7XG5pbXBvcnQgeyBDZWxsVHlwZSB9IGZyb20gXCIuLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5cbmV4cG9ydCBjbGFzcyBVcEdyb3VuZE1vZGVsIHtcblxuICAgIC8v5LiK5bGC54m55q6K5YWD57SgXG4gICAgcHJpdmF0ZSB1Z0NlbGxMaXN0OiBBcnJheTxBcnJheTxVR3JvdW5kQ2VsbE1vZGVsPj4gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBib3hNYXA6IE1hcDxzdHJpbmcsIGNjLlZlYzI+ID0gbnVsbFxuICAgIHByaXZhdGUgcG9ydGFsTWFwOiBNYXA8bnVtYmVyLCB7IG91dDogY2MuVmVjMiwgaW46IGNjLlZlYzIgfT4gPSBudWxsXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy51Z0NlbGxMaXN0ID0gW107XG4gICAgICAgIHRoaXMuYm94TWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnBvcnRhbE1hcCA9IG5ldyBNYXAoKTtcbiAgICB9XG5cbiAgICAvKirliJ3lp4vljJbnvZHmoLzmlbDmja4gKi9cbiAgICBwdWJsaWMgaW5pdFVwR3JvdXBDZWxsKGRhdGE6IEdyaWQsIHg6IG51bWJlciwgeTogbnVtYmVyLCBpbmRleDogbnVtYmVyKTogVUdyb3VuZENlbGxNb2RlbCB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXcgVUdyb3VuZENlbGxNb2RlbCgpO1xuICAgICAgICBpdGVtLmluaXQoZGF0YSwgeCwgeSwgaW5kZXgpO1xuICAgICAgICBjb25zdCB3YXJyID0gdGhpcy51Z0NlbGxMaXN0W3ldIHx8IFtdO1xuICAgICAgICB3YXJyLnB1c2goaXRlbSk7XG4gICAgICAgIHRoaXMudWdDZWxsTGlzdFt5XSA9IHdhcnI7XG4gICAgICAgIGlmIChpdGVtLmlzQm94KSB7XG4gICAgICAgICAgICB0aGlzLmJveE1hcC5zZXQodGhpcy5nZXRQb3NLZXkoaXRlbS5wb3MpLCBpdGVtLnBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0ucG9ydGFsSWR4KSB7XG4gICAgICAgICAgICB0aGlzLnN5bmNQb3J0YWwoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVHcm91cENlbGxMaXN0KCk6IEFycmF5PEFycmF5PFVHcm91bmRDZWxsTW9kZWw+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnVnQ2VsbExpc3Q7XG4gICAgfVxuXG4gICAgLyoq6YCa6L+H572R5qC85Z2Q5qCH6I635Y+WY2VsbOWAvCAqL1xuICAgIHB1YmxpYyBnZXRVR0NlbGxCeVBvcyhwb3M6IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSk6IFVHcm91bmRDZWxsTW9kZWwge1xuICAgICAgICByZXR1cm4gdGhpcy51Z0NlbGxMaXN0W3Bvcy55XVtwb3MueF1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQ29sbGVjdENvdW50KHR5cGU6IENlbGxUeXBlIHwgc3RyaW5nLCBwb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgaWYgKHR5cGUgPT0gJ2JveCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMuZ2V0UG9zS2V5KHBvcyk7XG4gICAgICAgICAgICB0aGlzLmJveE1hcC5oYXMoa2V5KSAmJiB0aGlzLmJveE1hcC5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuWQjOatpeS8oOmAgemXqOeahOWvueeFp+ihqCEgKi9cbiAgICBwcml2YXRlIHN5bmNQb3J0YWwobW9kZWw6IFVHcm91bmRDZWxsTW9kZWwpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gTWF0aC5hYnMobW9kZWwucG9ydGFsSWR4KTtcbiAgICAgICAgY29uc3QgZGF0YSA9IDxhbnk+dGhpcy5wb3J0YWxNYXAuZ2V0KGtleSkgfHwge307XG4gICAgICAgIGlmIChtb2RlbC5wb3J0YWxJZHggPCAwKSB7XG4gICAgICAgICAgICBkYXRhLmluID0gbW9kZWwucG9zO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YS5vdXQgPSBtb2RlbC5wb3M7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb3J0YWxNYXAuc2V0KGtleSwgZGF0YSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQb3NLZXkocG9zOiBjYy5WZWMyKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3Bvcy54fS0ke3Bvcy55fWBcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UG9ydGFsUG9zKGluZGV4OiBudW1iZXIpOiB7IGluOiBjYy5WZWMyLCBvdXQ6IGNjLlZlYzIgfSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcnRhbE1hcC5nZXQoTWF0aC5hYnMoaW5kZXgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsUG9ydGFsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3J0YWxNYXA7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBCb3hNYXAoKTogTWFwPHN0cmluZywgY2MuVmVjMj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5ib3hNYXA7XG4gICAgfVxuXG59XG4iXX0=