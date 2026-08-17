"use strict";
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