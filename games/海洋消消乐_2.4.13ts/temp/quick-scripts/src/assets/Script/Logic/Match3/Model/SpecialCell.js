"use strict";
cc._RF.push(module, '40461ekjJhLq4IseYa6K4J5', 'SpecialCell');
// Script/Logic/Match3/Model/SpecialCell.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constant_1 = require("../../Data/Const/Constant");
var SpecialCell = /** @class */ (function () {
    function SpecialCell(type, lv) {
        this._type = Constant_1.UpGroundType.None;
        this._lv = 0;
        this.plug = null;
        this._type = type;
        this._lv = lv;
        this.initPlug();
    }
    SpecialCell.prototype.initPlug = function () {
        switch (this.type) {
            case Constant_1.UpGroundType.Box:
                this.plug = null;
                break;
            case Constant_1.UpGroundType.Ice:
                this.plug = null;
                break;
            case Constant_1.UpGroundType.Lock:
                this.plug = null;
                break;
        }
    };
    Object.defineProperty(SpecialCell.prototype, "lv", {
        get: function () {
            return this._lv;
        },
        enumerable: false,
        configurable: true
    });
    /**增量更新障碍物等级 */
    SpecialCell.prototype.setLv = function (num) {
        this._lv += num;
        this._lv = this._lv < 0 ? 0 : this._lv;
        return this._lv;
    };
    Object.defineProperty(SpecialCell.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    SpecialCell.prototype.getFeaturePlug = function () {
        return this.plug;
    };
    return SpecialCell;
}());
exports.default = SpecialCell;

cc._RF.pop();