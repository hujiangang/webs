
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/SpecialPlug/Girl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ee577rU6N5AzLkSvnLFNthV', 'Girl');
// Script/Logic/Match3/Model/SpecialPlug/Girl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameModel_1 = require("../GameModel");
var Common_1 = require("../../../Common/Common");
var Constant_1 = require("../../../Data/Const/Constant");
var Girl = /** @class */ (function () {
    function Girl(cfg) {
        this._cfg = null;
        this._path = null;
        this._currentStep = 0;
        this._triggerCount = 0;
        this._girlCell = null;
        this._cfg = cfg;
        this._path = [];
    }
    Girl.prototype.initStartPoint = function () {
        this._currentStep = 0;
        this._girlCell = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.CellList, this._path[0]);
        this._girlCell.change2Cell(Constant_1.CellType.Girl);
    };
    Girl.prototype.initEndPoint = function () {
        var endPos = this._path[this._path.length - 1];
        var endCellModel = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.CellList, endPos);
        endCellModel.change2Cell(Constant_1.CellType.Conch);
    };
    Girl.prototype.initRoad = function (pos) {
        //渲染路面
        var groundCellModel = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.GroundList, pos);
        if (groundCellModel) {
            groundCellModel.showGirlGround();
        }
    };
    Girl.prototype.execJump2NextStep = function () {
        if (this._girlCell) {
            this._currentStep++;
            if (this.nextPos) {
                if (GameModel_1.default.ins.isPassable(this.nextPos, null)) {
                    //开始跳动
                    this._girlCell.mermaidJumpTo(this.nextPos);
                }
            }
        }
    };
    Object.defineProperty(Girl.prototype, "nextPos", {
        get: function () {
            return this._path[this._currentStep];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Girl.prototype, "path", {
        get: function () {
            return this._path;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Girl.prototype, "index", {
        get: function () {
            return this._cfg.index;
        },
        enumerable: false,
        configurable: true
    });
    Girl.prototype.onTrigger = function () {
        this._triggerCount++;
        this.execJump2NextStep();
    };
    Girl.prototype.init = function () {
        for (var i = 0; i < this._cfg.path.length; i++) {
            var pos = cc.v2(this._cfg.path[i][0], this._cfg.path[i][1]);
            this._path.push(pos);
            this.initRoad(pos);
        }
        this.initStartPoint();
        this.initEndPoint();
    };
    return Girl;
}());
exports.default = Girl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcU3BlY2lhbFBsdWdcXEdpcmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBcUM7QUFDckMsaURBQTRDO0FBQzVDLHlEQUF3RDtBQUt4RDtJQVFJLGNBQVksR0FBVTtRQU5kLFNBQUksR0FBVSxJQUFJLENBQUM7UUFDbkIsVUFBSyxHQUFjLElBQUksQ0FBQztRQUN4QixpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUN6QixrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUMxQixjQUFTLEdBQWMsSUFBSSxDQUFDO1FBR2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTyw2QkFBYyxHQUF0QjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsZ0JBQU0sQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLG1CQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVPLDJCQUFZLEdBQXBCO1FBQ0ksSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqRCxJQUFNLFlBQVksR0FBRyxnQkFBTSxDQUFDLGtCQUFrQixDQUFDLG1CQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMvRSxZQUFZLENBQUMsV0FBVyxDQUFDLG1CQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVPLHVCQUFRLEdBQWhCLFVBQWlCLEdBQVk7UUFDekIsTUFBTTtRQUNOLElBQU0sZUFBZSxHQUFHLGdCQUFNLENBQUMsa0JBQWtCLENBQUMsbUJBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pGLElBQUksZUFBZSxFQUFFO1lBQ2pCLGVBQWUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFTyxnQ0FBaUIsR0FBekI7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDZCxJQUFJLG1CQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFO29CQUM5QyxNQUFNO29CQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDOUM7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVELHNCQUFZLHlCQUFPO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHNCQUFJO2FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDckIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyx1QkFBSzthQUFoQjtZQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFFTSx3QkFBUyxHQUFoQjtRQUNJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU0sbUJBQUksR0FBWDtRQUNJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEI7UUFDRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0F2RUEsQUF1RUMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lTW9kZWwgZnJvbSBcIi4uL0dhbWVNb2RlbFwiO1xuaW1wb3J0IENvbW1vbiBmcm9tIFwiLi4vLi4vLi4vQ29tbW9uL0NvbW1vblwiO1xuaW1wb3J0IHsgQ2VsbFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IHsgQ2VsbE1vZGVsIH0gZnJvbSBcIi4uL0NlbGxNb2RlbFwiO1xuXG5pbnRlcmZhY2UgSUdpcmwgeyBpbmRleDogbnVtYmVyLCBwYXRoOiBudW1iZXJbXVtdIH1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2lybCB7XG5cbiAgICBwcml2YXRlIF9jZmc6IElHaXJsID0gbnVsbDtcbiAgICBwcml2YXRlIF9wYXRoOiBjYy5WZWMyW10gPSBudWxsO1xuICAgIHByaXZhdGUgX2N1cnJlbnRTdGVwOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3RyaWdnZXJDb3VudDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9naXJsQ2VsbDogQ2VsbE1vZGVsID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKGNmZzogSUdpcmwpIHtcbiAgICAgICAgdGhpcy5fY2ZnID0gY2ZnO1xuICAgICAgICB0aGlzLl9wYXRoID0gW107XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0U3RhcnRQb2ludCgpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFN0ZXAgPSAwO1xuICAgICAgICB0aGlzLl9naXJsQ2VsbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUoR2FtZU1vZGVsLmlucy5DZWxsTGlzdCwgdGhpcy5fcGF0aFswXSk7XG4gICAgICAgIHRoaXMuX2dpcmxDZWxsLmNoYW5nZTJDZWxsKENlbGxUeXBlLkdpcmwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEVuZFBvaW50KCkge1xuICAgICAgICBjb25zdCBlbmRQb3MgPSB0aGlzLl9wYXRoW3RoaXMuX3BhdGgubGVuZ3RoIC0gMV07XG4gICAgICAgIGNvbnN0IGVuZENlbGxNb2RlbCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUoR2FtZU1vZGVsLmlucy5DZWxsTGlzdCwgZW5kUG9zKTtcbiAgICAgICAgZW5kQ2VsbE1vZGVsLmNoYW5nZTJDZWxsKENlbGxUeXBlLkNvbmNoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRSb2FkKHBvczogY2MuVmVjMikge1xuICAgICAgICAvL+a4suafk+i3r+mdolxuICAgICAgICBjb25zdCBncm91bmRDZWxsTW9kZWwgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuR3JvdW5kTGlzdCwgcG9zKTtcbiAgICAgICAgaWYgKGdyb3VuZENlbGxNb2RlbCkge1xuICAgICAgICAgICAgZ3JvdW5kQ2VsbE1vZGVsLnNob3dHaXJsR3JvdW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGV4ZWNKdW1wMk5leHRTdGVwKCkge1xuICAgICAgICBpZiAodGhpcy5fZ2lybENlbGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGVwKys7XG4gICAgICAgICAgICBpZiAodGhpcy5uZXh0UG9zKSB7XG4gICAgICAgICAgICAgICAgaWYgKEdhbWVNb2RlbC5pbnMuaXNQYXNzYWJsZSh0aGlzLm5leHRQb3MsIG51bGwpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8v5byA5aeL6Lez5YqoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dpcmxDZWxsLm1lcm1haWRKdW1wVG8odGhpcy5uZXh0UG9zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBuZXh0UG9zKCk6IGNjLlZlYzIge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGF0aFt0aGlzLl9jdXJyZW50U3RlcF07XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBwYXRoKCk6IGNjLlZlYzJbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoXG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2ZnLmluZGV4O1xuICAgIH1cblxuICAgIHB1YmxpYyBvblRyaWdnZXIoKSB7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJDb3VudCsrO1xuICAgICAgICB0aGlzLmV4ZWNKdW1wMk5leHRTdGVwKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY2ZnLnBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBwb3MgPSBjYy52Mih0aGlzLl9jZmcucGF0aFtpXVswXSwgdGhpcy5fY2ZnLnBhdGhbaV1bMV0pO1xuICAgICAgICAgICAgdGhpcy5fcGF0aC5wdXNoKHBvcyk7XG4gICAgICAgICAgICB0aGlzLmluaXRSb2FkKHBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0U3RhcnRQb2ludCgpO1xuICAgICAgICB0aGlzLmluaXRFbmRQb2ludCgpO1xuICAgIH1cbn0iXX0=