"use strict";
cc._RF.push(module, 'd7fd6WsVr9KsZQt5Wq2QNg7', 'GroundModel');
// Script/Logic/Match3/Model/GroundModel.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroundModel = void 0;
var GroundCellModel_1 = require("./GroundCellModel");
var GroundModel = /** @class */ (function () {
    function GroundModel() {
        //地面网格数据列表(一些不会动的东西)
        this.gCellList = null;
        this.gCellList = [];
    }
    /**初始化网格数据 */
    GroundModel.prototype.initGroupCell = function (data, x, y, index) {
        var item = new GroundCellModel_1.default(data, cc.v2(x, y), index);
        var warr = this.gCellList[y] || [];
        warr.push(item);
        this.gCellList[y] = warr;
        return item;
    };
    GroundModel.prototype.getGroupCellList = function () {
        return this.gCellList;
    };
    /**通过网格坐标获取cell值 */
    GroundModel.prototype.getGCellByPos = function (pos) {
        return this.gCellList[pos.y][pos.x];
    };
    return GroundModel;
}());
exports.GroundModel = GroundModel;

cc._RF.pop();