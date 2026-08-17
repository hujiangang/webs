
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/DataPool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxEYXRhUG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQTtJQU9JLGtCQUFZLElBQWlCLEVBQUUsR0FBYyxFQUFFLFVBQTJCLEVBQUUsT0FBdUI7UUFBdkYscUJBQUEsRUFBQSxTQUFpQjtRQUFrQiwyQkFBQSxFQUFBLGtCQUEyQjtRQUFFLHdCQUFBLEVBQUEsY0FBdUI7UUFMM0YsUUFBRyxHQUFjLElBQUksQ0FBQztRQUN0QixVQUFLLEdBQWEsSUFBSSxDQUFDO1FBQ3ZCLFNBQUksR0FBVyxJQUFJLENBQUM7UUFDcEIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUc3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtRQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksVUFBVSxFQUFFO1lBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUc7Z0JBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQzthQUM5QjtTQUNKO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMEJBQU8sR0FBZDtRQUNJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ3hCLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7U0FDeEI7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDM0IsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDJCQUFRLEdBQWYsVUFBZ0IsSUFBTztRQUNuQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7WUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDeEI7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSwwQkFBTyxHQUFkO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dCQUNuQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsc0JBQVcsMEJBQUk7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFDTCxlQUFDO0FBQUQsQ0F2REEsQUF1REMsSUFBQTtBQXZEWSw0QkFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENlbGxNb2RlbCB9IGZyb20gXCIuLi9Mb2dpYy9NYXRjaDMvTW9kZWwvQ2VsbE1vZGVsXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVBvb2xEYXRhIHtcbiAgICBkZXN0b3J5KCk7XG59XG5cbmV4cG9ydCBjbGFzcyBEYXRhUG9vbDxUIGV4dGVuZHMgSVBvb2xEYXRhPntcblxuICAgIHByaXZhdGUgQ0xTOiB7IG5ldygpIH0gPSBudWxsO1xuICAgIHByaXZhdGUgZGF0YXM6IEFycmF5PFQ+ID0gbnVsbDtcbiAgICBwcml2YXRlIFNJWkU6IG51bWJlciA9IG51bGw7XG4gICAgcHJpdmF0ZSBfaXNDbGVhbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3RvcihzaXplOiBudW1iZXIgPSAxMCwgQ0xTOiB7IG5ldygpIH0sIGluaXRDcmVhdGU6IGJvb2xlYW4gPSBmYWxzZSwgaXNDbGVhbjogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5TSVpFID0gc2l6ZVxuICAgICAgICB0aGlzLkNMUyA9IENMU1xuICAgICAgICB0aGlzLmRhdGFzID0gW107XG4gICAgICAgIHRoaXMuX2lzQ2xlYW4gPSBpc0NsZWFuO1xuICAgICAgICBpZiAoaW5pdENyZWF0ZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHNpemU7IGktLTspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFzLnB1c2gobmV3IENMUygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIhumFjeS4gOS4quaVsOaNrlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXREYXRhKCk6IFQge1xuICAgICAgICBpZiAodGhpcy5kYXRhcy5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzLkNMUygpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YXMucG9wKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBmcmVl5LiA5Liq5pWw5o2uXG4gICAgICogQHBhcmFtIGRhdGEgXG4gICAgICovXG4gICAgcHVibGljIGZyZWVEYXRhKGRhdGE6IFQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YXMubGVuZ3RoIDwgdGhpcy5TSVpFKSB7XG4gICAgICAgICAgICB0aGlzLl9pc0NsZWFuICYmIGRhdGEuZGVzdG9yeSgpXG4gICAgICAgICAgICB0aGlzLmRhdGFzLnB1c2goZGF0YSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGZyZWXmiYDmnInmlbDmja5cbiAgICAgKi9cbiAgICBwdWJsaWMgZnJlZUFsbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzQ2xlYW4pIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YXMuZm9yRWFjaChkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBkYXRhLmRlc3RvcnkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YXMubGVuZ3RoID0gMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFzLmxlbmd0aDtcbiAgICB9XG59Il19