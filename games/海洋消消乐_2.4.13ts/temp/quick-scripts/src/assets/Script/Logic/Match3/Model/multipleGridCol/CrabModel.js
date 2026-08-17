"use strict";
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