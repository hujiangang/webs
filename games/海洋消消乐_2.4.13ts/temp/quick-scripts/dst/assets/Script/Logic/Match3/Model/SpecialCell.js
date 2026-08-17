
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/SpecialCell.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcU3BlY2lhbENlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBeUQ7QUFFekQ7SUFRSSxxQkFBWSxJQUFrQixFQUFFLEVBQVU7UUFObEMsVUFBSyxHQUFpQix1QkFBWSxDQUFDLElBQUksQ0FBQztRQUV4QyxRQUFHLEdBQVcsQ0FBQyxDQUFDO1FBRWhCLFNBQUksR0FBRyxJQUFJLENBQUM7UUFHaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFZCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVPLDhCQUFRLEdBQWhCO1FBQ0ksUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2YsS0FBSyx1QkFBWSxDQUFDLEdBQUc7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixNQUFNO1lBQ1YsS0FBSyx1QkFBWSxDQUFDLEdBQUc7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixNQUFNO1lBQ1YsS0FBSyx1QkFBWSxDQUFDLElBQUk7Z0JBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBRUQsc0JBQVcsMkJBQUU7YUFBYjtZQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixDQUFDOzs7T0FBQTtJQUVELGVBQWU7SUFDUiwyQkFBSyxHQUFaLFVBQWEsR0FBVztRQUNwQixJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQztRQUNoQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxzQkFBVyw2QkFBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBRU0sb0NBQWMsR0FBckI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVMLGtCQUFDO0FBQUQsQ0FoREEsQUFnREMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVwR3JvdW5kVHlwZSB9IGZyb20gXCIuLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwZWNpYWxDZWxsIHtcblxuICAgIHByaXZhdGUgX3R5cGU6IFVwR3JvdW5kVHlwZSA9IFVwR3JvdW5kVHlwZS5Ob25lO1xuXG4gICAgcHJpdmF0ZSBfbHY6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIHBsdWcgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IodHlwZTogVXBHcm91bmRUeXBlLCBsdjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLl9sdiA9IGx2O1xuXG4gICAgICAgIHRoaXMuaW5pdFBsdWcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRQbHVnKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBVcEdyb3VuZFR5cGUuQm94OlxuICAgICAgICAgICAgICAgIHRoaXMucGx1ZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFVwR3JvdW5kVHlwZS5JY2U6XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnID0gbnVsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVXBHcm91bmRUeXBlLkxvY2s6XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnID0gbnVsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbHYoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2x2O1xuICAgIH1cblxuICAgIC8qKuWinumHj+abtOaWsOmanOeijeeJqeetiee6pyAqL1xuICAgIHB1YmxpYyBzZXRMdihudW06IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHRoaXMuX2x2ICs9IG51bTtcbiAgICAgICAgdGhpcy5fbHYgPSB0aGlzLl9sdiA8IDAgPyAwIDogdGhpcy5fbHY7XG4gICAgICAgIHJldHVybiB0aGlzLl9sdjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHR5cGUoKTogVXBHcm91bmRUeXBlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEZlYXR1cmVQbHVnKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wbHVnO1xuICAgIH1cblxufVxuIl19