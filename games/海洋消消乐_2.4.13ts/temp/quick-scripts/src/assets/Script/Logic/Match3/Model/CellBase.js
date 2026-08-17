"use strict";
cc._RF.push(module, '79f6cWA/bZNkLJrtFnKbL1T', 'CellBase');
// Script/Logic/Match3/Model/CellBase.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellBase = exports.MsgType = void 0;
var Common_1 = require("../../Common/Common");
/**
 * 所有元素的基础爸爸
 */
var MsgType;
(function (MsgType) {
    MsgType[MsgType["BesideElimate"] = 0] = "BesideElimate";
    MsgType[MsgType["ElimateAll"] = 1] = "ElimateAll";
    MsgType[MsgType["Elimate"] = 2] = "Elimate";
    MsgType[MsgType["Fall"] = 3] = "Fall";
    MsgType[MsgType["FallEnd"] = 4] = "FallEnd";
    MsgType[MsgType["UpGroundDone"] = 5] = "UpGroundDone";
    MsgType[MsgType["Bomb"] = 6] = "Bomb";
    MsgType[MsgType["Portal"] = 7] = "Portal";
    MsgType[MsgType["ComplexBomb"] = 8] = "ComplexBomb";
})(MsgType = exports.MsgType || (exports.MsgType = {}));
var CellBase = /** @class */ (function () {
    function CellBase() {
        this._extData = null;
        this.lv = 0;
        this.type = null;
        this.data = null;
        /**属于哪个下标的地图 */
        this.mapIndex = 0;
        this.ctrlName = null;
        /**网络坐标 */
        this._pos = null;
        this._isDeath = false;
        this.extCtrl = null;
    }
    Object.defineProperty(CellBase.prototype, "isDeath", {
        get: function () {
            return this._isDeath;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CellBase.prototype, "pos", {
        // public set isDeath(state: boolean) {
        //     this._isDeath = state
        // }
        /**当前的网格坐标 */
        get: function () {
            return this._pos;
        },
        set: function (p) {
            this.onChangePos(p);
            this._pos = p;
        },
        enumerable: false,
        configurable: true
    });
    /**界面坐标 */
    CellBase.prototype.getPosition = function () {
        return Common_1.default.getPos(this._pos.x, this._pos.y, this.mapIndex);
    };
    /**获取障碍物等级 */
    CellBase.prototype.getLv = function () {
        return this.lv;
    };
    /**增量更新障碍物等级 */
    CellBase.prototype.setLv = function (num) {
        this.lv += num;
        this.lv = this.lv < 0 ? 0 : this.lv;
    };
    CellBase.prototype.getMapIndex = function () {
        return this.mapIndex;
    };
    CellBase.prototype.getType = function () {
        return this.type;
    };
    Object.defineProperty(CellBase.prototype, "gridData", {
        get: function () {
            return this.data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CellBase.prototype, "extData", {
        get: function () {
            return this._extData;
        },
        set: function (node) {
            this._extData = node;
            this.extCtrl = node.getComponent(this.ctrlName);
        },
        enumerable: false,
        configurable: true
    });
    CellBase.prototype.destory = function () {
        this.data = null;
        this._extData = null;
        this.extCtrl = null;
    };
    return CellBase;
}());
exports.CellBase = CellBase;

cc._RF.pop();