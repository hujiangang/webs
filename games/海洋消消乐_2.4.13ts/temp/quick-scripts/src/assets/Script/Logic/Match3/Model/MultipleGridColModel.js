"use strict";
cc._RF.push(module, 'fd2d4GYSOZAwrVh6W+0qnCV', 'MultipleGridColModel');
// Script/Logic/Match3/Model/MultipleGridColModel.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GnomeModel_1 = require("./multipleGridCol/GnomeModel");
var TurtlesModel_1 = require("./multipleGridCol/TurtlesModel");
var CrabModel_1 = require("./multipleGridCol/CrabModel");
var MultipleGridColModel = /** @class */ (function () {
    function MultipleGridColModel(data, index) {
        this._gnome = null;
        this._turtles = null;
        this._crab = null;
        if (data.gnome) {
            this._gnome = new GnomeModel_1.default(data.gnome, index);
        }
        if (data.turtles) {
            this._turtles = new TurtlesModel_1.default(data.turtles, index);
        }
        if (data.crab) {
            this._crab = new CrabModel_1.default(data.crab, index);
        }
    }
    MultipleGridColModel.prototype.sync2View = function (list) {
        this._crab && this._crab.sync2View(list);
        this._gnome && this._gnome.sync2View(list);
        this._turtles && this._turtles.sync2View(list);
    };
    MultipleGridColModel.prototype.getConfig = function (type) {
        var result = null;
        var m = this.getModel(type);
        if (m) {
            result = m.config;
        }
        return result;
    };
    MultipleGridColModel.prototype.getData = function (type) {
        var result = null;
        var m = this.getModel(type);
        if (m) {
            result = m.getData();
        }
        return result;
    };
    MultipleGridColModel.prototype.checkItemOver = function (type, idx) {
        var result = null;
        var m = this.getModel(type);
        if (m) {
            result = m.checkItemCompletByIndex(idx);
        }
        return result;
    };
    MultipleGridColModel.prototype.updateItemCountByPos = function (type, pos) {
        var result = null;
        var m = this.getModel(type);
        if (m) {
            result = m.updateItemCountByPos(pos);
        }
        return result;
    };
    MultipleGridColModel.prototype.onComplet = function (type, index, topPoint) {
        var m = this.getModel(type);
        if (m) {
            m.onComplet(index, topPoint);
        }
    };
    MultipleGridColModel.prototype.getModel = function (type) {
        return { gnome: this._gnome, turtles: this._turtles, crab: this._crab }[type];
    };
    return MultipleGridColModel;
}());
exports.default = MultipleGridColModel;

cc._RF.pop();