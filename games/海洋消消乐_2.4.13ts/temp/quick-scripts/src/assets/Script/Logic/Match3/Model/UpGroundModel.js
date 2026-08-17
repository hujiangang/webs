"use strict";
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