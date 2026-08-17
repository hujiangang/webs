"use strict";
cc._RF.push(module, 'b5479qDeQFJ1L2tIXtUUYFl', 'DataPool');
// Script/Base/DataPool.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPool = void 0;
var DataPool = /** @class */ (function () {
    function DataPool(size, CLS, initCreate, isClean) {
        if (size === void 0) { size = 10; }
        if (initCreate === void 0) { initCreate = false; }
        if (isClean === void 0) { isClean = true; }
        this.CLS = null;
        this.datas = null;
        this.SIZE = null;
        this._isClean = true;
        this.SIZE = size;
        this.CLS = CLS;
        this.datas = [];
        this._isClean = isClean;
        if (initCreate) {
            for (var i = size; i--;) {
                this.datas.push(new CLS());
            }
        }
    }
    /**
     * 分配一个数据
     */
    DataPool.prototype.getData = function () {
        if (this.datas.length <= 0) {
            return new this.CLS();
        }
        return this.datas.pop();
    };
    /**
     * free一个数据
     * @param data
     */
    DataPool.prototype.freeData = function (data) {
        if (this.datas.length < this.SIZE) {
            this._isClean && data.destory();
            this.datas.push(data);
        }
    };
    /**
     * free所有数据
     */
    DataPool.prototype.freeAll = function () {
        if (this._isClean) {
            this.datas.forEach(function (data) {
                data.destory();
            });
        }
        this.datas.length = 0;
    };
    Object.defineProperty(DataPool.prototype, "size", {
        get: function () {
            return this.datas.length;
        },
        enumerable: false,
        configurable: true
    });
    return DataPool;
}());
exports.DataPool = DataPool;

cc._RF.pop();