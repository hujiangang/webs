
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/EnergyModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '84248scDy9PHIUvnIpaW1hB', 'EnergyModel');
// Script/Logic/Match3/Model/EnergyModel.ts

"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnergyModel = void 0;
var M_1 = require("../../../Base/Manager/M");
var Event_1 = require("../../Data/Const/Event");
var SingletonFactory_1 = require("../../../Base/Utils/SingletonFactory");
var GameModel_1 = require("./GameModel");
var Common_1 = require("../../Common/Common");
var Util_1 = require("../../../Base/Utils/Util");
var Constant_1 = require("../../Data/Const/Constant");
var ComboMaxInterval = 2000;
var BoomScore = (_a = {},
    _a[Constant_1.CellType.Bomb1] = 6,
    _a[Constant_1.CellType.Bomb2] = 5,
    _a[Constant_1.CellType.Bomb3] = 5,
    _a[Constant_1.CellType.Bomb4] = 3,
    _a[Constant_1.CellType.Bomb5] = 9,
    _a);
var EnergyLevel = {
    1: 30,
    2: 35,
    3: 40
};
var EnergyModel = /** @class */ (function () {
    function EnergyModel() {
        this.comboTimes = 0;
        this.sendComboTimes = 0;
        this.lastComboTime = 0;
        this.energy = 0;
        this.curLevel = 1;
        this.curMaxEnergy = 0;
    }
    EnergyModel.prototype.setCurLevel = function () {
        var level = M_1.default.runtime.getMatch3Level();
        this.curLevel = Math.ceil(level / 10);
        this.curMaxEnergy = EnergyLevel[this.curLevel];
        this.energy = 0;
        this.comboTimes = 0;
        this.lastComboTime = 0;
    };
    EnergyModel.prototype.updataEnergy = function (type, cellType) {
        var now = cc.sys.now();
        if (type == Constant_1.ElimateType.Default) {
            if (!this.lastComboTime || now - this.lastComboTime < ComboMaxInterval) {
                this.comboTimes++;
                this.lastComboTime = now;
                if (this.sendComboTimes != this.comboTimes) {
                    this.sendComboTimes = this.comboTimes;
                    M_1.default.runtime.CurCombo = this.comboTimes;
                    M_1.default.event.send(Event_1.Event.Effect.Combo, this.comboTimes);
                }
            }
            else {
                // if (this.comboTimes >= 5) {//每5个combo加3分
                // cc.log('comboTimes = ' + this.comboTimes)
                //     this.addEnergy(3 * Math.floor(this.comboTimes / 5));
                // }
                this.comboTimes = M_1.default.runtime.CurCombo = 0;
                this.lastComboTime = 0;
            }
        }
        else if (type >= Constant_1.ElimateType.Bomb1) {
            // this.addEnergy(BoomScore[cellType] || 0);
        }
    };
    EnergyModel.prototype.addEnergy = function (energy) {
        // let lastEnergy = this.energy;
        // lastEnergy += energy;
        // let curMax = this.curMaxEnergy;
        // if (lastEnergy > curMax) {
        //     // this.energy = lastEnergy - curMax;
        //     this.energy = 0;
        //     lastEnergy = curMax;
        //     this.addBoomToGame();
        // } else {
        //     this.energy = lastEnergy;
        // }
        // M.event.send(Event.GameCMD.EnergyStorage, lastEnergy, curMax);
    };
    EnergyModel.prototype.addBoomToGame = function () {
        if (this.curLevel == 1) {
            for (var i = 0; i < 3; i++) {
                this.randomChangeNormal2Boom(Constant_1.CellType.Bomb4);
            }
        }
        else if (this.curLevel == 2) {
            this.randomChangeNormal2Boom(Constant_1.CellType.Bomb1);
            this.randomChangeNormal2Boom(Math.random() > 0.5 ? Constant_1.CellType.Bomb2 : Constant_1.CellType.Bomb3);
        }
        else if (this.curLevel == 3) {
            this.randomChangeNormal2Boom(Constant_1.CellType.Bomb5);
        }
    };
    EnergyModel.prototype.randomChangeNormal2Boom = function (type) {
        var list = GameModel_1.default.ins.CellList;
        var x = Util_1.Util.Tool.rangeInt(1, GameModel_1.default.GridSize.W, false);
        var y = Util_1.Util.Tool.rangeInt(1, GameModel_1.default.GridSize.H, false);
        var cell = Common_1.default.safeGet2ArrayValue(list, cc.v2(x, y));
        if (cell && cell.extCtrl && cell.getType() < Constant_1.CellType.Bomb1 && cell.getType() != Constant_1.CellType.Fish && !cell.bindUpGModel) {
            cell.isExecBomb = false;
            cell.extCtrl.change2Bomb(type);
        }
        else {
            this.randomChangeNormal2Boom(type);
        }
    };
    EnergyModel.ins = SingletonFactory_1.SingletonFactory.getInstance(EnergyModel);
    return EnergyModel;
}());
exports.EnergyModel = EnergyModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcRW5lcmd5TW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUF3QztBQUN4QyxnREFBK0M7QUFDL0MseUVBQXdFO0FBQ3hFLHlDQUFvQztBQUNwQyw4Q0FBeUM7QUFDekMsaURBQWdEO0FBQ2hELHNEQUFrRTtBQUVsRSxJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQztBQUU5QixJQUFNLFNBQVM7SUFDWCxHQUFDLG1CQUFRLENBQUMsS0FBSyxJQUFHLENBQUM7SUFDbkIsR0FBQyxtQkFBUSxDQUFDLEtBQUssSUFBRyxDQUFDO0lBQ25CLEdBQUMsbUJBQVEsQ0FBQyxLQUFLLElBQUcsQ0FBQztJQUNuQixHQUFDLG1CQUFRLENBQUMsS0FBSyxJQUFHLENBQUM7SUFDbkIsR0FBQyxtQkFBUSxDQUFDLEtBQUssSUFBRyxDQUFDO09BQ3RCLENBQUE7QUFFRCxJQUFNLFdBQVcsR0FBRztJQUNoQixDQUFDLEVBQUUsRUFBRTtJQUNMLENBQUMsRUFBRSxFQUFFO0lBQ0wsQ0FBQyxFQUFFLEVBQUU7Q0FDUixDQUFBO0FBRUQ7SUFBQTtRQUlZLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0Isa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFHMUIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBRXJCLGlCQUFZLEdBQVcsQ0FBQyxDQUFBO0lBMkVwQyxDQUFDO0lBekVVLGlDQUFXLEdBQWxCO1FBQ0ksSUFBTSxLQUFLLEdBQUcsV0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FB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QUFFLG1CQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsR0FBRyxXQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsbUJBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNELElBQU0sSUFBSSxHQUFHLGdCQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsbUJBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLG1CQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNsSCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUNqQzthQUFNO1lBQ0gsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQztJQXBGYSxlQUFHLEdBQWdCLG1DQUFnQixDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQXFGL0Usa0JBQUM7Q0F2RkQsQUF1RkMsSUFBQTtBQXZGWSxrQ0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IHsgU2luZ2xldG9uRmFjdG9yeSB9IGZyb20gXCIuLi8uLi8uLi9CYXNlL1V0aWxzL1NpbmdsZXRvbkZhY3RvcnlcIjtcbmltcG9ydCBHYW1lTW9kZWwgZnJvbSBcIi4vR2FtZU1vZGVsXCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuLi8uLi9Db21tb24vQ29tbW9uXCI7XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uLy4uLy4uL0Jhc2UvVXRpbHMvVXRpbFwiO1xuaW1wb3J0IHsgQ2VsbFR5cGUsIEVsaW1hdGVUeXBlIH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcblxuY29uc3QgQ29tYm9NYXhJbnRlcnZhbCA9IDIwMDA7XG5cbmNvbnN0IEJvb21TY29yZSA9IHtcbiAgICBbQ2VsbFR5cGUuQm9tYjFdOiA2LC8v5ZyG5b2i54K45by5XG4gICAgW0NlbGxUeXBlLkJvbWIyXTogNSwvL+aoquWQkeeCuOW8uVxuICAgIFtDZWxsVHlwZS5Cb21iM106IDUsLy/nq5blkJHngrjlvLlcbiAgICBbQ2VsbFR5cGUuQm9tYjRdOiAzLC8v6aOe5py6XG4gICAgW0NlbGxUeXBlLkJvbWI1XTogOSwvL+W9qeiZueeCuOW8uVxufVxuXG5jb25zdCBFbmVyZ3lMZXZlbCA9IHtcbiAgICAxOiAzMCxcbiAgICAyOiAzNSxcbiAgICAzOiA0MFxufVxuXG5leHBvcnQgY2xhc3MgRW5lcmd5TW9kZWwge1xuXG4gICAgcHVibGljIHN0YXRpYyBpbnM6IEVuZXJneU1vZGVsID0gU2luZ2xldG9uRmFjdG9yeS5nZXRJbnN0YW5jZShFbmVyZ3lNb2RlbCk7XG5cbiAgICBwcml2YXRlIGNvbWJvVGltZXM6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBzZW5kQ29tYm9UaW1lczogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGxhc3RDb21ib1RpbWU6IG51bWJlciA9IDA7XG5cblxuICAgIHByaXZhdGUgZW5lcmd5OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgY3VyTGV2ZWw6IG51bWJlciA9IDE7XG5cbiAgICBwcml2YXRlIGN1ck1heEVuZXJneTogbnVtYmVyID0gMFxuXG4gICAgcHVibGljIHNldEN1ckxldmVsKCkge1xuICAgICAgICBjb25zdCBsZXZlbCA9IE0ucnVudGltZS5nZXRNYXRjaDNMZXZlbCgpO1xuICAgICAgICB0aGlzLmN1ckxldmVsID0gTWF0aC5jZWlsKGxldmVsIC8gMTApO1xuICAgICAgICB0aGlzLmN1ck1heEVuZXJneSA9IEVuZXJneUxldmVsW3RoaXMuY3VyTGV2ZWxdO1xuICAgICAgICB0aGlzLmVuZXJneSA9IDA7XG4gICAgICAgIHRoaXMuY29tYm9UaW1lcyA9IDA7XG4gICAgICAgIHRoaXMubGFzdENvbWJvVGltZSA9IDA7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0YUVuZXJneSh0eXBlOiBFbGltYXRlVHlwZSwgY2VsbFR5cGU/OiBDZWxsVHlwZSkge1xuICAgICAgICBsZXQgbm93ID0gY2Muc3lzLm5vdygpO1xuICAgICAgICBpZiAodHlwZSA9PSBFbGltYXRlVHlwZS5EZWZhdWx0KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMubGFzdENvbWJvVGltZSB8fCBub3cgLSB0aGlzLmxhc3RDb21ib1RpbWUgPCBDb21ib01heEludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21ib1RpbWVzKys7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0Q29tYm9UaW1lID0gbm93O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbmRDb21ib1RpbWVzICE9IHRoaXMuY29tYm9UaW1lcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRDb21ib1RpbWVzID0gdGhpcy5jb21ib1RpbWVzXG4gICAgICAgICAgICAgICAgICAgIE0ucnVudGltZS5DdXJDb21ibyA9IHRoaXMuY29tYm9UaW1lcztcbiAgICAgICAgICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LkVmZmVjdC5Db21ibywgdGhpcy5jb21ib1RpbWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLmNvbWJvVGltZXMgPj0gNSkgey8v5q+PNeS4qmNvbWJv5YqgM+WIhlxuICAgICAgICAgICAgICAgIC8vIGNjLmxvZygnY29tYm9UaW1lcyA9ICcgKyB0aGlzLmNvbWJvVGltZXMpXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuYWRkRW5lcmd5KDMgKiBNYXRoLmZsb29yKHRoaXMuY29tYm9UaW1lcyAvIDUpKTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgdGhpcy5jb21ib1RpbWVzID0gTS5ydW50aW1lLkN1ckNvbWJvID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RDb21ib1RpbWUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPj0gRWxpbWF0ZVR5cGUuQm9tYjEpIHtcbiAgICAgICAgICAgIC8vIHRoaXMuYWRkRW5lcmd5KEJvb21TY29yZVtjZWxsVHlwZV0gfHwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZEVuZXJneShlbmVyZ3k6IG51bWJlcikge1xuICAgICAgICAvLyBsZXQgbGFzdEVuZXJneSA9IHRoaXMuZW5lcmd5O1xuICAgICAgICAvLyBsYXN0RW5lcmd5ICs9IGVuZXJneTtcbiAgICAgICAgLy8gbGV0IGN1ck1heCA9IHRoaXMuY3VyTWF4RW5lcmd5O1xuICAgICAgICAvLyBpZiAobGFzdEVuZXJneSA+IGN1ck1heCkge1xuICAgICAgICAvLyAgICAgLy8gdGhpcy5lbmVyZ3kgPSBsYXN0RW5lcmd5IC0gY3VyTWF4O1xuICAgICAgICAvLyAgICAgdGhpcy5lbmVyZ3kgPSAwO1xuICAgICAgICAvLyAgICAgbGFzdEVuZXJneSA9IGN1ck1heDtcbiAgICAgICAgLy8gICAgIHRoaXMuYWRkQm9vbVRvR2FtZSgpO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgdGhpcy5lbmVyZ3kgPSBsYXN0RW5lcmd5O1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIE0uZXZlbnQuc2VuZChFdmVudC5HYW1lQ01ELkVuZXJneVN0b3JhZ2UsIGxhc3RFbmVyZ3ksIGN1ck1heCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRCb29tVG9HYW1lKCkge1xuICAgICAgICBpZiAodGhpcy5jdXJMZXZlbCA9PSAxKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucmFuZG9tQ2hhbmdlTm9ybWFsMkJvb20oQ2VsbFR5cGUuQm9tYjQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VyTGV2ZWwgPT0gMikge1xuICAgICAgICAgICAgdGhpcy5yYW5kb21DaGFuZ2VOb3JtYWwyQm9vbShDZWxsVHlwZS5Cb21iMSk7XG4gICAgICAgICAgICB0aGlzLnJhbmRvbUNoYW5nZU5vcm1hbDJCb29tKE1hdGgucmFuZG9tKCkgPiAwLjUgPyBDZWxsVHlwZS5Cb21iMiA6IENlbGxUeXBlLkJvbWIzKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1ckxldmVsID09IDMpIHtcbiAgICAgICAgICAgIHRoaXMucmFuZG9tQ2hhbmdlTm9ybWFsMkJvb20oQ2VsbFR5cGUuQm9tYjUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByYW5kb21DaGFuZ2VOb3JtYWwyQm9vbSh0eXBlKSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBHYW1lTW9kZWwuaW5zLkNlbGxMaXN0O1xuICAgICAgICBsZXQgeCA9IFV0aWwuVG9vbC5yYW5nZUludCgxLCBHYW1lTW9kZWwuR3JpZFNpemUuVywgZmFsc2UpO1xuICAgICAgICBsZXQgeSA9IFV0aWwuVG9vbC5yYW5nZUludCgxLCBHYW1lTW9kZWwuR3JpZFNpemUuSCwgZmFsc2UpO1xuICAgICAgICBjb25zdCBjZWxsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShsaXN0LCBjYy52Mih4LCB5KSk7XG4gICAgICAgIGlmIChjZWxsICYmIGNlbGwuZXh0Q3RybCAmJiBjZWxsLmdldFR5cGUoKSA8IENlbGxUeXBlLkJvbWIxICYmIGNlbGwuZ2V0VHlwZSgpICE9IENlbGxUeXBlLkZpc2ggJiYgIWNlbGwuYmluZFVwR01vZGVsKSB7XG4gICAgICAgICAgICBjZWxsLmlzRXhlY0JvbWIgPSBmYWxzZTtcbiAgICAgICAgICAgIGNlbGwuZXh0Q3RybC5jaGFuZ2UyQm9tYih0eXBlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yYW5kb21DaGFuZ2VOb3JtYWwyQm9vbSh0eXBlKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=