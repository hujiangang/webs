"use strict";
cc._RF.push(module, 'a8a3dLbMypMN4Yl0xoWIurp', 'GnomeModel');
// Script/Logic/Match3/Model/multipleGridCol/GnomeModel.ts

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
var GnomeModel = /** @class */ (function (_super) {
    __extends(GnomeModel, _super);
    function GnomeModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GnomeModel.prototype.sync2View = function (groundList) {
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
                        groundItem.isGnome = true;
                        this._pool[i].push(pos);
                    }
                }
            }
        }
    };
    GnomeModel.prototype.onComplet = function (index, topPoint) {
    };
    return GnomeModel;
}(MultipleGridColBase_1.default));
exports.default = GnomeModel;

cc._RF.pop();