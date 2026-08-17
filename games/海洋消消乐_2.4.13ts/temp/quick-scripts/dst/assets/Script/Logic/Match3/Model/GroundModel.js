
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/GroundModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcR3JvdW5kTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EscURBQWdEO0FBR2hEO0lBS0k7UUFIQSxvQkFBb0I7UUFDWixjQUFTLEdBQXdCLElBQUksQ0FBQztRQUcxQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsYUFBYTtJQUNOLG1DQUFhLEdBQXBCLFVBQXFCLElBQVUsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWE7UUFDaEUsSUFBTSxJQUFJLEdBQUcsSUFBSSx5QkFBZSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxzQ0FBZ0IsR0FBdkI7UUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELG1CQUFtQjtJQUNaLG1DQUFhLEdBQXBCLFVBQXFCLEdBQTZCO1FBQzlDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFFTCxrQkFBQztBQUFELENBM0JBLEFBMkJDLElBQUE7QUEzQlksa0NBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmlkIH0gZnJvbSBcIi4uLy4uL0RhdGEvSW50ZXJmYWNlL0xldmVsL0lMZXZlbFwiO1xuaW1wb3J0IEdyb3VuZENlbGxNb2RlbCBmcm9tIFwiLi9Hcm91bmRDZWxsTW9kZWxcIjtcblxuXG5leHBvcnQgY2xhc3MgR3JvdW5kTW9kZWwge1xuXG4gICAgLy/lnLDpnaLnvZHmoLzmlbDmja7liJfooago5LiA5Lqb5LiN5Lya5Yqo55qE5Lic6KW/KVxuICAgIHByaXZhdGUgZ0NlbGxMaXN0OiBHcm91bmRDZWxsTW9kZWxbXVtdID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmdDZWxsTGlzdCA9IFtdO1xuICAgIH1cblxuICAgIC8qKuWIneWni+WMlue9keagvOaVsOaNriAqL1xuICAgIHB1YmxpYyBpbml0R3JvdXBDZWxsKGRhdGE6IEdyaWQsIHg6IG51bWJlciwgeTogbnVtYmVyLCBpbmRleDogbnVtYmVyKTogR3JvdW5kQ2VsbE1vZGVsIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IG5ldyBHcm91bmRDZWxsTW9kZWwoZGF0YSwgY2MudjIoeCwgeSksIGluZGV4KTtcbiAgICAgICAgY29uc3Qgd2FyciA9IHRoaXMuZ0NlbGxMaXN0W3ldIHx8IFtdO1xuICAgICAgICB3YXJyLnB1c2goaXRlbSk7XG4gICAgICAgIHRoaXMuZ0NlbGxMaXN0W3ldID0gd2FycjtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgcHVibGljIGdldEdyb3VwQ2VsbExpc3QoKTogQXJyYXk8QXJyYXk8R3JvdW5kQ2VsbE1vZGVsPj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nQ2VsbExpc3Q7XG4gICAgfVxuXG4gICAgLyoq6YCa6L+H572R5qC85Z2Q5qCH6I635Y+WY2VsbOWAvCAqL1xuICAgIHB1YmxpYyBnZXRHQ2VsbEJ5UG9zKHBvczogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9KTogR3JvdW5kQ2VsbE1vZGVsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ0NlbGxMaXN0W3Bvcy55XVtwb3MueF1cbiAgICB9XG5cbn1cbiJdfQ==