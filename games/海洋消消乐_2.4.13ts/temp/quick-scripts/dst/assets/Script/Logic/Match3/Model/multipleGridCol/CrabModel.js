
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/multipleGridCol/CrabModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a70592cUXBMl5IbChJ8cnJL', 'CrabModel');
// Script/Logic/Match3/Model/multipleGridCol/CrabModel.ts

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
var Common_1 = require("../../../Common/Common");
var GameModel_1 = require("../GameModel");
var CellBase_1 = require("../CellBase");
var Constant_1 = require("../../../Data/Const/Constant");
var CrabModel = /** @class */ (function (_super) {
    __extends(CrabModel, _super);
    function CrabModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CrabModel.prototype.sync2View = function (groundList) {
        if (!this._cfg)
            return;
        this._count = this._cfg.length;
        for (var i = 0; i < this._count; i++) {
            var cfg = this._cfg[i];
            if (!this._pool[i])
                this._pool[i] = [];
            var isCross = false;
            if (cfg.type % 2 == 0) {
                //横着的 
                isCross = true;
            }
            var max = ((Math.floor(cfg.type / 2) + 1) * 2);
            var min = max / 2;
            var dir = null;
            for (var k = 0; k < min; k++) {
                for (var j = 0; j < max; j++) {
                    isCross ? (dir = cc.v2(j, k)) : (dir = cc.v2(k, j));
                    var pos = cc.v2(cfg.x, cfg.y).add(dir);
                    var groundItem = Common_1.default.safeGet2ArrayValue(groundList, pos);
                    if (groundItem) {
                        groundItem.initCrab(i);
                        this._pool[i].push(pos);
                    }
                }
            }
        }
    };
    CrabModel.prototype.onComplet = function (dir, pos) {
        var line = GameModel_1.default.ins.CellList[pos.y];
        var closeAry = null;
        if (dir > 0) {
            closeAry = line.slice(pos.x, line.length);
        }
        else {
            closeAry = line.slice(0, pos.x);
            closeAry.sort(function (a, b) {
                if (a && b) {
                    return b.pos.x - a.pos.x;
                }
            });
        }
        GameModel_1.default.ins.execElimate(closeAry[0], new Set(closeAry), Constant_1.ElimateType.Bomb6, null, null);
    };
    CrabModel.prototype.freeGrid = function (point, index) {
        var list = GameModel_1.default.ins.GroundList;
        for (var i = 0; i < list.length; i++) {
            var listx = list[i];
            for (var x = 0; x < listx.length; x++) {
                var gc = listx[x];
                if (gc && gc.getType() == Constant_1.GroundType.Crab && gc.zIndex == index) {
                    gc.freeThisPos();
                }
            }
        }
        var notifyPosY = point.y == 0 ? 0 : point.y - 1;
        var notifyCell = GameModel_1.default.ins.CellList[notifyPosY];
        notifyCell.forEach(function (c) {
            c && c.onMsg(CellBase_1.MsgType.Fall);
        });
    };
    return CrabModel;
}(MultipleGridColBase_1.default));
exports.default = CrabModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcbXVsdGlwbGVHcmlkQ29sXFxDcmFiTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQXdEO0FBR3hELGlEQUE0QztBQUM1QywwQ0FBcUM7QUFFckMsd0NBQXNDO0FBQ3RDLHlEQUF1RTtBQUV2RTtJQUF1Qyw2QkFBbUI7SUFBMUQ7O0lBbUVBLENBQUM7SUFqRVUsNkJBQVMsR0FBaEIsVUFBaUIsVUFBK0I7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTztRQUV2QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLElBQU0sR0FBRyxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRXZDLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbkIsTUFBTTtnQkFDTixPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ2xCO1lBQ0QsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElB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QUMsV0FBVyxFQUFFLENBQUM7aUJBQ3BCO2FBQ0o7U0FDSjtRQUNELElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELElBQU0sVUFBVSxHQUFHLG1CQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0RCxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUNoQixDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxrQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVMLGdCQUFDO0FBQUQsQ0FuRUEsQUFtRUMsQ0FuRXNDLDZCQUFtQixHQW1FekQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTXVsdGlwbGVHcmlkQ29sQmFzZSBmcm9tIFwiLi9NdWx0aXBsZUdyaWRDb2xCYXNlXCI7XG5pbXBvcnQgR3JvdW5kQ2VsbE1vZGVsIGZyb20gXCIuLi9Hcm91bmRDZWxsTW9kZWxcIjtcbmltcG9ydCB7IEdub21lIH0gZnJvbSBcIi4uLy4uLy4uL0RhdGEvSW50ZXJmYWNlL0xldmVsL0lMZXZlbFwiO1xuaW1wb3J0IENvbW1vbiBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0NvbW1vblwiO1xuaW1wb3J0IEdhbWVNb2RlbCBmcm9tIFwiLi4vR2FtZU1vZGVsXCI7XG5pbXBvcnQgeyBDZWxsTW9kZWwgfSBmcm9tIFwiLi4vQ2VsbE1vZGVsXCI7XG5pbXBvcnQgeyBNc2dUeXBlIH0gZnJvbSBcIi4uL0NlbGxCYXNlXCI7XG5pbXBvcnQgeyBFbGltYXRlVHlwZSwgR3JvdW5kVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyYWJNb2RlbCBleHRlbmRzIE11bHRpcGxlR3JpZENvbEJhc2Uge1xuXG4gICAgcHVibGljIHN5bmMyVmlldyhncm91bmRMaXN0OiBHcm91bmRDZWxsTW9kZWxbXVtdKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2ZnKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fY291bnQgPSB0aGlzLl9jZmcubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNmZzogR25vbWUgPSB0aGlzLl9jZmdbaV07XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3Bvb2xbaV0pIHRoaXMuX3Bvb2xbaV0gPSBbXTtcblxuICAgICAgICAgICAgbGV0IGlzQ3Jvc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChjZmcudHlwZSAlIDIgPT0gMCkge1xuICAgICAgICAgICAgICAgIC8v5qiq552A55qEIFxuICAgICAgICAgICAgICAgIGlzQ3Jvc3MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbWF4ID0gKChNYXRoLmZsb29yKGNmZy50eXBlIC8gMikgKyAxKSAqIDIpO1xuICAgICAgICAgICAgY29uc3QgbWluID0gbWF4IC8gMjtcbiAgICAgICAgICAgIGxldCBkaXIgPSBudWxsO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1pbjsgaysrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpc0Nyb3NzID8gKGRpciA9IGNjLnYyKGosIGspKSA6IChkaXIgPSBjYy52MihrLCBqKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvcyA9IGNjLnYyKGNmZy54LCBjZmcueSkuYWRkKGRpcik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VuZEl0ZW0gPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKGdyb3VuZExpc3QsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChncm91bmRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91bmRJdGVtLmluaXRDcmFiKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9vbFtpXS5wdXNoKHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25Db21wbGV0KGRpcjogbnVtYmVyLCBwb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgY29uc3QgbGluZSA9IEdhbWVNb2RlbC5pbnMuQ2VsbExpc3RbcG9zLnldO1xuICAgICAgICBsZXQgY2xvc2VBcnk6IEFycmF5PENlbGxNb2RlbD4gPSBudWxsO1xuICAgICAgICBpZiAoZGlyID4gMCkge1xuICAgICAgICAgICAgY2xvc2VBcnkgPSBsaW5lLnNsaWNlKHBvcy54LCBsaW5lLmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbG9zZUFyeSA9IGxpbmUuc2xpY2UoMCwgcG9zLngpO1xuICAgICAgICAgICAgY2xvc2VBcnkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhICYmIGIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGIucG9zLnggLSBhLnBvcy54O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgR2FtZU1vZGVsLmlucy5leGVjRWxpbWF0ZShjbG9zZUFyeVswXSwgbmV3IFNldChjbG9zZUFyeSksIEVsaW1hdGVUeXBlLkJvbWI2LCBudWxsLCBudWxsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZnJlZUdyaWQocG9pbnQ6IGNjLlZlYzIsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IEdhbWVNb2RlbC5pbnMuR3JvdW5kTGlzdDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0eCA9IGxpc3RbaV07XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGxpc3R4Lmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ2MgPSBsaXN0eFt4XTtcbiAgICAgICAgICAgICAgICBpZiAoZ2MgJiYgZ2MuZ2V0VHlwZSgpID09IEdyb3VuZFR5cGUuQ3JhYiAmJiBnYy56SW5kZXggPT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2MuZnJlZVRoaXNQb3MoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5vdGlmeVBvc1kgPSBwb2ludC55ID09IDAgPyAwIDogcG9pbnQueSAtIDE7XG4gICAgICAgIGNvbnN0IG5vdGlmeUNlbGwgPSBHYW1lTW9kZWwuaW5zLkNlbGxMaXN0W25vdGlmeVBvc1ldO1xuICAgICAgICBub3RpZnlDZWxsLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICBjICYmIGMub25Nc2coTXNnVHlwZS5GYWxsKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbn0iXX0=