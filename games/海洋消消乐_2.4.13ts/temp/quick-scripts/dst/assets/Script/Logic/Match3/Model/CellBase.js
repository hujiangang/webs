
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/CellBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcQ2VsbEJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBR3pDOztHQUVHO0FBQ0gsSUFBWSxPQVVYO0FBVkQsV0FBWSxPQUFPO0lBQ2YsdURBQWEsQ0FBQTtJQUNiLGlEQUFVLENBQUE7SUFDViwyQ0FBTyxDQUFBO0lBQ1AscUNBQUksQ0FBQTtJQUNKLDJDQUFPLENBQUE7SUFDUCxxREFBWSxDQUFBO0lBQ1oscUNBQUksQ0FBQTtJQUNKLHlDQUFNLENBQUE7SUFDTixtREFBVyxDQUFBO0FBQ2YsQ0FBQyxFQVZXLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQVVsQjtBQUNEO0lBQUE7UUFFWSxhQUFRLEdBQVksSUFBSSxDQUFDO1FBRXZCLE9BQUUsR0FBVyxDQUFDLENBQUM7UUFDZixTQUFJLEdBQU0sSUFBSSxDQUFDO1FBQ2YsU0FBSSxHQUFTLElBQUksQ0FBQztRQUM1QixlQUFlO1FBQ0wsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixhQUFRLEdBQVcsSUFBSSxDQUFDO1FBRWxDLFVBQVU7UUFDQSxTQUFJLEdBQVksSUFBSSxDQUFDO1FBRXJCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFN0IsWUFBTyxHQUFNLElBQUksQ0FBQztJQXlFN0IsQ0FBQztJQXZFRyxzQkFBVyw2QkFBTzthQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQU9ELHNCQUFXLHlCQUFHO1FBTGQsdUNBQXVDO1FBQ3ZDLDRCQUE0QjtRQUM1QixJQUFJO1FBRUosYUFBYTthQUNiO1lBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLENBQUM7YUFFRCxVQUFlLENBQVU7WUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNsQixDQUFDOzs7T0FMQTtJQU9ELFVBQVU7SUFDSCw4QkFBVyxHQUFsQjtRQUNJLE9BQU8sZ0JBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxhQUFhO0lBQ04sd0JBQUssR0FBWjtRQUNJLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsZUFBZTtJQUNSLHdCQUFLLEdBQVosVUFBYSxHQUFXO1FBQ3BCLElBQUksQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTSw4QkFBVyxHQUFsQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUN4QixDQUFDO0lBRU0sMEJBQU8sR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsc0JBQVcsOEJBQVE7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw2QkFBTzthQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDO2FBRUQsVUFBbUIsSUFBYTtZQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELENBQUM7OztPQUxBO0lBT00sMEJBQU8sR0FBZDtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFZTCxlQUFDO0FBQUQsQ0F6RkEsQUF5RkMsSUFBQTtBQXpGcUIsNEJBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbW9uIGZyb20gXCIuLi8uLi9Db21tb24vQ29tbW9uXCI7XG5pbXBvcnQgeyBHcmlkIH0gZnJvbSBcIi4uLy4uL0RhdGEvSW50ZXJmYWNlL0xldmVsL0lMZXZlbFwiO1xuXG4vKipcbiAqIOaJgOacieWFg+e0oOeahOWfuuehgOeIuOeIuFxuICovXG5leHBvcnQgZW51bSBNc2dUeXBlIHtcbiAgICBCZXNpZGVFbGltYXRlLFxuICAgIEVsaW1hdGVBbGwsXG4gICAgRWxpbWF0ZSxcbiAgICBGYWxsLFxuICAgIEZhbGxFbmQsXG4gICAgVXBHcm91bmREb25lLFxuICAgIEJvbWIsXG4gICAgUG9ydGFsLFxuICAgIENvbXBsZXhCb21iXG59XG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2VsbEJhc2U8VCwgSz4ge1xuXG4gICAgcHJpdmF0ZSBfZXh0RGF0YTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBwcm90ZWN0ZWQgbHY6IG51bWJlciA9IDA7XG4gICAgcHJvdGVjdGVkIHR5cGU6IFQgPSBudWxsO1xuICAgIHByb3RlY3RlZCBkYXRhOiBHcmlkID0gbnVsbDtcbiAgICAvKirlsZ7kuo7lk6rkuKrkuIvmoIfnmoTlnLDlm74gKi9cbiAgICBwcm90ZWN0ZWQgbWFwSW5kZXg6IG51bWJlciA9IDA7XG4gICAgcHJvdGVjdGVkIGN0cmxOYW1lOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgLyoq572R57uc5Z2Q5qCHICovXG4gICAgcHJvdGVjdGVkIF9wb3M6IGNjLlZlYzIgPSBudWxsO1xuXG4gICAgcHJvdGVjdGVkIF9pc0RlYXRoOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgZXh0Q3RybDogSyA9IG51bGw7XG5cbiAgICBwdWJsaWMgZ2V0IGlzRGVhdGgoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0RlYXRoO1xuICAgIH1cblxuICAgIC8vIHB1YmxpYyBzZXQgaXNEZWF0aChzdGF0ZTogYm9vbGVhbikge1xuICAgIC8vICAgICB0aGlzLl9pc0RlYXRoID0gc3RhdGVcbiAgICAvLyB9XG5cbiAgICAvKirlvZPliY3nmoTnvZHmoLzlnZDmoIcgKi9cbiAgICBwdWJsaWMgZ2V0IHBvcygpOiBjYy5WZWMyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHBvcyhwOiBjYy5WZWMyKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2VQb3MocCk7XG4gICAgICAgIHRoaXMuX3BvcyA9IHA7XG4gICAgfVxuXG4gICAgLyoq55WM6Z2i5Z2Q5qCHICovXG4gICAgcHVibGljIGdldFBvc2l0aW9uKCk6IGNjLlZlYzIge1xuICAgICAgICByZXR1cm4gQ29tbW9uLmdldFBvcyh0aGlzLl9wb3MueCwgdGhpcy5fcG9zLnksIHRoaXMubWFwSW5kZXgpO1xuICAgIH1cblxuICAgIC8qKuiOt+WPlumanOeijeeJqeetiee6pyAqL1xuICAgIHB1YmxpYyBnZXRMdigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5sdjtcbiAgICB9XG5cbiAgICAvKirlop7ph4/mm7TmlrDpmpznoo3niannrYnnuqcgKi9cbiAgICBwdWJsaWMgc2V0THYobnVtOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5sdiArPSBudW07XG4gICAgICAgIHRoaXMubHYgPSB0aGlzLmx2IDwgMCA/IDAgOiB0aGlzLmx2O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNYXBJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXBJbmRleFxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IFQge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZ3JpZERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBleHREYXRhKCk6IGNjLk5vZGUge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXh0RGF0YTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGV4dERhdGEobm9kZTogY2MuTm9kZSkge1xuICAgICAgICB0aGlzLl9leHREYXRhID0gbm9kZTtcbiAgICAgICAgdGhpcy5leHRDdHJsID0gbm9kZS5nZXRDb21wb25lbnQodGhpcy5jdHJsTmFtZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlc3RvcnkoKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2V4dERhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLmV4dEN0cmwgPSBudWxsO1xuICAgIH1cblxuICAgIHB1YmxpYyBhYnN0cmFjdCBpbml0KGRhdGE6IEdyaWQpO1xuXG4gICAgcHVibGljIGFic3RyYWN0IG9uVW5CaW5kKHVuQmluZFBvczogY2MuVmVjMik7XG5cbiAgICBwdWJsaWMgYWJzdHJhY3Qgb25CaW5kKGJpbmRNb2RlbDogYW55KTtcblxuICAgIHB1YmxpYyBhYnN0cmFjdCBvbk1zZyh0eXBlOiBNc2dUeXBlKTtcblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBvbkNoYW5nZVBvcyhwb3M6IGNjLlZlYzIpO1xuXG59Il19