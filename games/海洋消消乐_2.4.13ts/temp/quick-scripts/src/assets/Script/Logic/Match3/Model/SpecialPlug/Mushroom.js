"use strict";
cc._RF.push(module, 'df4e8RXKo1CiKDiEYuvX6MZ', 'Mushroom');
// Script/Logic/Match3/Model/SpecialPlug/Mushroom.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameModel_1 = require("../GameModel");
var Mushroom = /** @class */ (function () {
    function Mushroom() {
        this._content = null;
        this._map = null;
        this._content = new Set();
        this._map = new Map();
    }
    Mushroom.prototype.init = function () {
    };
    Mushroom.prototype.add = function (pos, model) {
        this._content.add(model);
        this._map.set(pos, model);
    };
    Mushroom.prototype.del = function (pos) {
        this._map.delete(pos);
        if (this._map.size <= 0) {
            requestAnimationFrame(this._destory.bind(this));
        }
    };
    Mushroom.prototype._destory = function () {
        this._content.forEach(function (cell) {
            cell.freeThisPos();
            GameModel_1.default.ins.testFindCanFallCell(cell.pos, GameModel_1.default.ins.seq.next());
            cell.extCtrl && cell.extCtrl.hideMushroom();
            cell.extCtrl && cell.extCtrl.PlayShanhuAnim();
        });
        this._content.clear();
    };
    return Mushroom;
}());
exports.default = Mushroom;

cc._RF.pop();