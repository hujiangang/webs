"use strict";
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