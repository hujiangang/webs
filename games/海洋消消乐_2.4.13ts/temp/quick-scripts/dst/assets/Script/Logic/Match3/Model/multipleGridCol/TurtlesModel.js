
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/multipleGridCol/TurtlesModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'aa2fbyDEP1FqqTrkhIQEun4', 'TurtlesModel');
// Script/Logic/Match3/Model/multipleGridCol/TurtlesModel.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MultipleGridColBase_1 = require("./MultipleGridColBase");
var GameModel_1 = require("../GameModel");
var Common_1 = require("../../../Common/Common");
var CellBase_1 = require("../CellBase");
var TurtlesModel = /** @class */ (function (_super) {
    __extends(TurtlesModel, _super);
    function TurtlesModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TurtlesModel.prototype.onComplet = function (index, topPoint) {
        var stateDirs = [cc.v2(0, 0), cc.v2(1, 0), cc.v2(1, 1), cc.v2(0, 1)];
        stateDirs.forEach(function (dir) {
            var gcell = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.GroundList, topPoint.add(dir));
            if (gcell) {
                gcell.freeThisPos();
            }
        });
        var notifyDirs = [cc.v2(0, -1), cc.v2(1, -1)];
        notifyDirs.forEach(function (dir) {
            var cell = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.CellList, topPoint.add(dir));
            if (cell) {
                cell.onMsg(CellBase_1.MsgType.Fall);
            }
        });
    };
    TurtlesModel.prototype.sync2View = function (groundList) {
        var _this = this;
        if (!this._cfg)
            return;
        this._count = this._cfg.length;
        var _loop_1 = function (i) {
            var cfg = this_1._cfg[i];
            if (!this_1._pool[i])
                this_1._pool[i] = [];
            var pos = cc.v2(cfg.x, cfg.y);
            var topPointModel = Common_1.default.safeGet2ArrayValue(groundList, pos);
            topPointModel.initTurtles(pos);
            this_1._pool[i].push(pos);
            var tmpDirs = [cc.v2(1, 0), cc.v2(0, 1), cc.v2(1, 1)];
            tmpDirs.forEach(function (dir) {
                var groundItem = Common_1.default.safeGet2ArrayValue(groundList, pos.add(dir));
                if (groundItem) {
                    groundItem.initTurtles(pos);
                    _this._pool[i].push(groundItem.pos);
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < this._count; i++) {
            _loop_1(i);
        }
    };
    return TurtlesModel;
}(MultipleGridColBase_1.default));
exports.default = TurtlesModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcbXVsdGlwbGVHcmlkQ29sXFxUdXJ0bGVzTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNkRBQXdEO0FBQ3hELDBDQUFxQztBQUVyQyxpREFBNEM7QUFDNUMsd0NBQXNDO0FBR3RDO0lBQTBDLGdDQUFtQjtJQUE3RDs7SUF3Q0EsQ0FBQztJQXRDVSxnQ0FBUyxHQUFoQixVQUFpQixLQUFhLEVBQUUsUUFBaUI7UUFDN0MsSUFBTSxTQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ2pCLElBQU0sS0FBSyxHQUFHLGdCQUFNLENBQUMsa0JBQWtCLENBQUMsbUJBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNyRixJQUFJLEtBQUssRUFBRTtnQkFDUCxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDdkI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQU0sVUFBVSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDbEIsSUFBTSxJQUFJLEdBQUcsZ0JBQU0sQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLElBQUksSUFBSSxFQUFFO2dCQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM1QjtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLGdDQUFTLEdBQWhCLFVBQWlCLFVBQStCO1FBQWhELGlCQW1CQztRQWxCRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Z0NBQ3RCLENBQUM7WUFDTixJQUFNLEdBQUcsR0FBVSxPQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUFFLE9BQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN2QyxJQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQU0sYUFBYSxHQUFHLGdCQUFNLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2pFLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsT0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLElBQU0sT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztnQkFDZixJQUFNLFVBQVUsR0FBRyxnQkFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZFLElBQUksVUFBVSxFQUFFO29CQUNaLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzVCLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDdEM7WUFDTCxDQUFDLENBQUMsQ0FBQzs7O1FBZFAsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO29CQUEzQixDQUFDO1NBZVQ7SUFDTCxDQUFDO0lBRUwsbUJBQUM7QUFBRCxDQXhDQSxBQXdDQyxDQXhDeUMsNkJBQW1CLEdBd0M1RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IE11bHRpcGxlR3JpZENvbEJhc2UgZnJvbSBcIi4vTXVsdGlwbGVHcmlkQ29sQmFzZVwiO1xuaW1wb3J0IEdhbWVNb2RlbCBmcm9tIFwiLi4vR2FtZU1vZGVsXCI7XG5pbXBvcnQgeyBHbm9tZSB9IGZyb20gXCIuLi8uLi8uLi9EYXRhL0ludGVyZmFjZS9MZXZlbC9JTGV2ZWxcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCB7IE1zZ1R5cGUgfSBmcm9tIFwiLi4vQ2VsbEJhc2VcIjtcbmltcG9ydCBHcm91bmRDZWxsTW9kZWwgZnJvbSBcIi4uL0dyb3VuZENlbGxNb2RlbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUdXJ0bGVzTW9kZWwgZXh0ZW5kcyBNdWx0aXBsZUdyaWRDb2xCYXNlIHtcblxuICAgIHB1YmxpYyBvbkNvbXBsZXQoaW5kZXg6IG51bWJlciwgdG9wUG9pbnQ6IGNjLlZlYzIpIHtcbiAgICAgICAgY29uc3Qgc3RhdGVEaXJzID0gW2NjLnYyKDAsIDApLCBjYy52MigxLCAwKSwgY2MudjIoMSwgMSksIGNjLnYyKDAsIDEpXTtcbiAgICAgICAgc3RhdGVEaXJzLmZvckVhY2goZGlyID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGdjZWxsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShHYW1lTW9kZWwuaW5zLkdyb3VuZExpc3QsIHRvcFBvaW50LmFkZChkaXIpKTtcbiAgICAgICAgICAgIGlmIChnY2VsbCkge1xuICAgICAgICAgICAgICAgIGdjZWxsLmZyZWVUaGlzUG9zKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBub3RpZnlEaXJzID0gW2NjLnYyKDAsIC0xKSwgY2MudjIoMSwgLTEpXTtcbiAgICAgICAgbm90aWZ5RGlycy5mb3JFYWNoKGRpciA9PiB7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShHYW1lTW9kZWwuaW5zLkNlbGxMaXN0LCB0b3BQb2ludC5hZGQoZGlyKSk7XG4gICAgICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgICAgIGNlbGwub25Nc2coTXNnVHlwZS5GYWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgc3luYzJWaWV3KGdyb3VuZExpc3Q6IEdyb3VuZENlbGxNb2RlbFtdW10pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jZmcpIHJldHVybjtcbiAgICAgICAgdGhpcy5fY291bnQgPSB0aGlzLl9jZmcubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNmZzogR25vbWUgPSB0aGlzLl9jZmdbaV07XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3Bvb2xbaV0pIHRoaXMuX3Bvb2xbaV0gPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IGNjLnYyKGNmZy54LCBjZmcueSk7XG4gICAgICAgICAgICBjb25zdCB0b3BQb2ludE1vZGVsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShncm91bmRMaXN0LCBwb3MpO1xuICAgICAgICAgICAgdG9wUG9pbnRNb2RlbC5pbml0VHVydGxlcyhwb3MpO1xuICAgICAgICAgICAgdGhpcy5fcG9vbFtpXS5wdXNoKHBvcyk7XG4gICAgICAgICAgICBjb25zdCB0bXBEaXJzID0gW2NjLnYyKDEsIDApLCBjYy52MigwLCAxKSwgY2MudjIoMSwgMSldO1xuICAgICAgICAgICAgdG1wRGlycy5mb3JFYWNoKGRpciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ3JvdW5kSXRlbSA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUoZ3JvdW5kTGlzdCwgcG9zLmFkZChkaXIpKTtcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdW5kSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBncm91bmRJdGVtLmluaXRUdXJ0bGVzKHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Bvb2xbaV0ucHVzaChncm91bmRJdGVtLnBvcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=