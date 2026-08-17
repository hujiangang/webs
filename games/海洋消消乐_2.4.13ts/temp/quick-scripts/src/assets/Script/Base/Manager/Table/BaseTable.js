"use strict";
cc._RF.push(module, 'b0419LwSphOIbTyanvd2RyF', 'BaseTable');
// Script/Base/Manager/Table/BaseTable.ts

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
exports.BaseTable = void 0;
var BytesTable_1 = require("./BytesTable");
var Util_1 = require("../../Utils/Util");
var Log_1 = require("../../Utils/Log");
var BaseTable = /** @class */ (function (_super) {
    __extends(BaseTable, _super);
    function BaseTable(key, clsName, VOClass, afpb) {
        var _this = _super.call(this, afpb) || this;
        _this.KEY = null;
        _this._maxKey = 0;
        _this.KEY = key;
        _this.CLS = clsName;
        _this._VOClass = VOClass;
        return _this;
    }
    BaseTable.prototype.readyOK = function (data) {
        var _this = this;
        var _data = [];
        if (this._VOClass != null) {
            data.forEach(function (d) {
                var c = new _this._VOClass(d);
                _data.push(c);
            });
        }
        else {
            _data = data;
        }
        this._data = _data;
        this._tables = new Map();
        if (this.KEY != null && this.KEY.length > 0) {
            var k_1;
            _data.forEach(function (item) {
                k_1 = _this._createKey(item);
                if (k_1 != null && k_1 != undefined) {
                    if (Util_1.Util.Tool.isNumber(k_1)) {
                        _this._maxKey = Math.max(_this._maxKey, k_1);
                    }
                    _this._tables.set(k_1, item);
                }
            });
        }
        this._isReady = true;
        Log_1.Log.i("\u6570\u636E\u8868[" + this.CLS + "] \u52A0\u8F7D\u6210\u529F");
    };
    BaseTable.prototype._createKey = function (item) {
        var k = "";
        if (this.KEY instanceof Array) {
            var karr_1 = [];
            this.KEY.forEach(function (KEY) {
                karr_1.push(item[KEY]);
            });
            k = karr_1.join("_");
        }
        else {
            k = item[this.KEY];
        }
        return k;
    };
    /**
     * 通过传入的主键来获取对象
     * @param key
     */
    BaseTable.prototype.getByPrimaryKey = function (key) {
        return this._tables ? this._tables.get(key) : null;
    };
    /**
     * 多个主键时用这个取值
     * @param keys
     */
    BaseTable.prototype.getByPrimaryKeys = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        var k = keys.join("_");
        return this._tables.get(k);
    };
    /** 获取所有的data*/
    BaseTable.prototype.getData = function () {
        return this._data;
    };
    /**
     * 获得最大的key值
     */
    BaseTable.prototype.getMaxPrimaryKey = function () {
        return this._maxKey;
    };
    return BaseTable;
}(BytesTable_1.BytesTable));
exports.BaseTable = BaseTable;

cc._RF.pop();