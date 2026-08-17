
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/multipleGridCol/GnomeModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcbXVsdGlwbGVHcmlkQ29sXFxHbm9tZU1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZEQUF3RDtBQUV4RCxpREFBNEM7QUFHNUM7SUFBd0MsOEJBQW1CO0lBQTNEOztJQXFDQSxDQUFDO0lBbkNVLDhCQUFTLEdBQWhCLFVBQWlCLFVBQStCO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU87UUFFdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMvQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxJQUFNLEdBQUcsR0FBVSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUV2QyxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ25CLE1BQU07Z0JBQ04sT0FBTyxHQUFHLElBQUksQ0FBQzthQUNsQjtZQUNELElBQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNwQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7WUFFZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUMxQixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BELElBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN6QyxJQUFNLFVBQVUsR0FBRyxnQkFBTSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDOUQsSUFBSSxVQUFVLEVBQUU7d0JBQ1osVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7d0JBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUMzQjtpQkFDSjthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRU0sOEJBQVMsR0FBaEIsVUFBaUIsS0FBYSxFQUFFLFFBQWlCO0lBRWpELENBQUM7SUFFTCxpQkFBQztBQUFELENBckNBLEFBcUNDLENBckN1Qyw2QkFBbUIsR0FxQzFEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE11bHRpcGxlR3JpZENvbEJhc2UgZnJvbSBcIi4vTXVsdGlwbGVHcmlkQ29sQmFzZVwiO1xuaW1wb3J0IHsgR25vbWUgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9JbnRlcmZhY2UvTGV2ZWwvSUxldmVsXCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuLi8uLi8uLi9Db21tb24vQ29tbW9uXCI7XG5pbXBvcnQgR3JvdW5kQ2VsbE1vZGVsIGZyb20gXCIuLi9Hcm91bmRDZWxsTW9kZWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR25vbWVNb2RlbCBleHRlbmRzIE11bHRpcGxlR3JpZENvbEJhc2Uge1xuXG4gICAgcHVibGljIHN5bmMyVmlldyhncm91bmRMaXN0OiBHcm91bmRDZWxsTW9kZWxbXVtdKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2ZnKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fY291bnQgPSB0aGlzLl9jZmcubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNmZzogR25vbWUgPSB0aGlzLl9jZmdbaV07XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3Bvb2xbaV0pIHRoaXMuX3Bvb2xbaV0gPSBbXTtcblxuICAgICAgICAgICAgbGV0IGlzQ3Jvc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChjZmcudHlwZSAlIDIgPT0gMCkge1xuICAgICAgICAgICAgICAgIC8v5qiq552A55qEIFxuICAgICAgICAgICAgICAgIGlzQ3Jvc3MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbWF4ID0gKChNYXRoLmZsb29yKGNmZy50eXBlIC8gMikgKyAxKSAqIDIpO1xuICAgICAgICAgICAgY29uc3QgbWluID0gbWF4IC8gMjtcbiAgICAgICAgICAgIGxldCBkaXIgPSBudWxsO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1pbjsgaysrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYXg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpc0Nyb3NzID8gKGRpciA9IGNjLnYyKGosIGspKSA6IChkaXIgPSBjYy52MihrLCBqKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvcyA9IGNjLnYyKGNmZy54LCBjZmcueSkuYWRkKGRpcik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VuZEl0ZW0gPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKGdyb3VuZExpc3QsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChncm91bmRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91bmRJdGVtLmlzR25vbWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9vbFtpXS5wdXNoKHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25Db21wbGV0KGluZGV4OiBudW1iZXIsIHRvcFBvaW50OiBjYy5WZWMyKSB7XG5cbiAgICB9XG5cbn0iXX0=