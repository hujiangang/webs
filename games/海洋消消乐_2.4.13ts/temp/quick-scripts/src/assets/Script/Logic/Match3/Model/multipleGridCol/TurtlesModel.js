"use strict";
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