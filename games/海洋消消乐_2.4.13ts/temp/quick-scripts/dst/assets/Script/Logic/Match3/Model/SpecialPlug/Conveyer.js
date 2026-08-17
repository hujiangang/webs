
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Model/SpecialPlug/Conveyer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '51044aYfvdP4bsXrTJrLdMP', 'Conveyer');
// Script/Logic/Match3/Model/SpecialPlug/Conveyer.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameModel_1 = require("../GameModel");
var Common_1 = require("../../../Common/Common");
var MainCtrl_1 = require("../../MainCtrl");
var Conveyer = /** @class */ (function () {
    function Conveyer(data) {
        this._cfg = null;
        this._triggerCount = 0;
        this._nodeHandler = null;
        this._cfgData = null;
        if (data && data.conveyerList) {
            this._cfgData = data.conveyerList;
            this._nodeHandler = cc.find('Canvas/main').getComponent(MainCtrl_1.default);
        }
    }
    Conveyer.prototype.moveTo = function () {
        var _this = this;
        this._cfg.forEach(function (valuse, index) {
            for (var i = 0; i < valuse.length; i++) {
                var item = valuse[i];
                var nextItem = valuse[i + 1] || valuse[0];
                //判断下一个元素是否是相邻的..否则就渐影
                //每个元素往下一个点移动 
                var cell = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.CellList, item.pos);
                if (cell) {
                    cell.conveyerMoveTo(nextItem.pos, null);
                }
            }
            _this.moveOver(index);
        });
    };
    Conveyer.prototype.moveOver = function (index) {
        var _this = this;
        if (this._nodeHandler) {
            this._nodeHandler.scheduleOnce(function () {
                var values = _this._cfg.get(index);
                //全部移动完毕!做操作! 
                //检测是否有落下的  
                for (var i = values.length; i--;) {
                    var pos = values[i].pos;
                    var cell = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.CellList, pos);
                    if (cell) {
                        if (!cell.isFall) {
                            cell.continue2Fall();
                            cell.notifyRoundFall();
                            //检测是否有需要消除 
                            GameModel_1.default.ins.checkHavaElimate(cell.pos);
                        }
                    }
                    else {
                        GameModel_1.default.ins.testFindCanFallCell(pos, null);
                    }
                }
            }, 0.5);
        }
    };
    /**
     * 检测这个坐标是否是传输带中的一个
     * @param pos
     */
    Conveyer.prototype.checkIsConveyerItemForPos = function (pos) {
        var result = false;
        for (var i = this._cfgData.length; i--;) {
            var list = this._cfgData[i];
            for (var index = list.length; index--;) {
                var item = list[index];
                if (pos.x == item.x && pos.y == item.y) {
                    i = 0;
                    result = true;
                    break;
                }
            }
        }
        return result;
    };
    Conveyer.prototype.init = function () {
        if (this._cfgData) {
            this._cfg = new Map();
            var _loop_1 = function (i) {
                var p = [];
                var m = this_1._cfgData[i];
                m.forEach(function (item) {
                    var c = { pos: cc.v2(item.x, item.y), exist: item.exist };
                    p.push(c);
                });
                this_1._cfg.set(i, p);
            };
            var this_1 = this;
            for (var i = 0; i < this._cfgData.length; i++) {
                _loop_1(i);
            }
        }
    };
    /**被触发 */
    Conveyer.prototype.onTrigger = function () {
        this._triggerCount++;
        this.moveTo();
    };
    return Conveyer;
}());
exports.default = Conveyer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxNb2RlbFxcU3BlY2lhbFBsdWdcXENvbnZleWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQXFEO0FBQ3JELGlEQUE0QztBQUU1QywyQ0FBc0M7QUFJdEM7SUFPSSxrQkFBWSxJQUFZO1FBTGhCLFNBQUksR0FBNkIsSUFBSSxDQUFDO1FBQ3RDLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGlCQUFZLEdBQWEsSUFBSSxDQUFDO1FBQzlCLGFBQVEsR0FBMkQsSUFBSSxDQUFDO1FBRzVFLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFBO1lBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxDQUFDO1NBQ3JFO0lBQ0wsQ0FBQztJQUVPLHlCQUFNLEdBQWQ7UUFBQSxpQkFjQztRQWJHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTSxFQUFFLEtBQUs7WUFDNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BDLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLHNCQUFzQjtnQkFDdEIsY0FBYztnQkFDZCxJQUFNLElBQUksR0FBRyxnQkFBTSxDQUFDLGtCQUFrQixDQUFDLG1CQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFD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QUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNkLENBQUMsQ0FBQyxDQUFBO2dCQUNGLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztZQVB4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO3dCQUFwQyxDQUFDO2FBUVQ7U0FDSjtJQUNMLENBQUM7SUFFRCxTQUFTO0lBQ0YsNEJBQVMsR0FBaEI7UUFDSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0E5RkEsQUE4RkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lTW9kZWwsIHsgQ3JlYXRlVHlwZSB9IGZyb20gXCIuLi9HYW1lTW9kZWxcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCB7IElMZXZlbCB9IGZyb20gXCIuLi8uLi8uLi9EYXRhL0ludGVyZmFjZS9MZXZlbC9JTGV2ZWxcIjtcbmltcG9ydCBNYWluQ3RybCBmcm9tIFwiLi4vLi4vTWFpbkN0cmxcIjtcblxuaW50ZXJmYWNlIElDb252ZXllciB7IHBvczogY2MuVmVjMiwgZXhpc3Q6IGJvb2xlYW4gfVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb252ZXllciB7XG5cbiAgICBwcml2YXRlIF9jZmc6IE1hcDxudW1iZXIsIElDb252ZXllcltdPiA9IG51bGw7XG4gICAgcHJpdmF0ZSBfdHJpZ2dlckNvdW50OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX25vZGVIYW5kbGVyOiBNYWluQ3RybCA9IG51bGw7XG4gICAgcHJpdmF0ZSBfY2ZnRGF0YTogQXJyYXk8QXJyYXk8eyB4OiBudW1iZXIsIHk6IG51bWJlciwgZXhpc3Q6IGJvb2xlYW4gfT4+ID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IElMZXZlbCkge1xuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmNvbnZleWVyTGlzdCkge1xuICAgICAgICAgICAgdGhpcy5fY2ZnRGF0YSA9IGRhdGEuY29udmV5ZXJMaXN0XG4gICAgICAgICAgICB0aGlzLl9ub2RlSGFuZGxlciA9IGNjLmZpbmQoJ0NhbnZhcy9tYWluJykuZ2V0Q29tcG9uZW50KE1haW5DdHJsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbW92ZVRvKCkge1xuICAgICAgICB0aGlzLl9jZmcuZm9yRWFjaCgodmFsdXNlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1c2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdmFsdXNlW2ldO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5leHRJdGVtID0gdmFsdXNlW2kgKyAxXSB8fCB2YWx1c2VbMF07XG4gICAgICAgICAgICAgICAgLy/liKTmlq3kuIvkuIDkuKrlhYPntKDmmK/lkKbmmK/nm7jpgrvnmoQuLuWQpuWImeWwsea4kOW9sVxuICAgICAgICAgICAgICAgIC8v5q+P5Liq5YWD57Sg5b6A5LiL5LiA5Liq54K556e75YqoIFxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuQ2VsbExpc3QsIGl0ZW0ucG9zKTtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNvbnZleWVyTW92ZVRvKG5leHRJdGVtLnBvcywgbnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tb3ZlT3ZlcihpbmRleCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3ZlT3ZlcihpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLl9ub2RlSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5fbm9kZUhhbmRsZXIuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLl9jZmcuZ2V0KGluZGV4KTtcbiAgICAgICAgICAgICAgICAvL+WFqOmDqOenu+WKqOWujOavlSHlgZrmk43kvZwhIFxuICAgICAgICAgICAgICAgIC8v5qOA5rWL5piv5ZCm5pyJ6JC95LiL55qEICBcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gdmFsdWVzLmxlbmd0aDsgaS0tOykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3MgPSB2YWx1ZXNbaV0ucG9zO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShHYW1lTW9kZWwuaW5zLkNlbGxMaXN0LCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjZWxsLmlzRmFsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwuY29udGludWUyRmFsbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwubm90aWZ5Um91bmRGYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mo4DmtYvmmK/lkKbmnInpnIDopoHmtojpmaQgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5jaGVja0hhdmFFbGltYXRlKGNlbGwucG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNb2RlbC5pbnMudGVzdEZpbmRDYW5GYWxsQ2VsbChwb3MsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMC41KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOajgOa1i+i/meS4quWdkOagh+aYr+WQpuaYr+S8oOi+k+W4puS4reeahOS4gOS4qlxuICAgICAqIEBwYXJhbSBwb3MgXG4gICAgICovXG4gICAgcHVibGljIGNoZWNrSXNDb252ZXllckl0ZW1Gb3JQb3MocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX2NmZ0RhdGEubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5fY2ZnRGF0YVtpXTtcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gbGlzdC5sZW5ndGg7IGluZGV4LS07KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGxpc3RbaW5kZXhdO1xuICAgICAgICAgICAgICAgIGlmIChwb3MueCA9PSBpdGVtLnggJiYgcG9zLnkgPT0gaXRlbS55KSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NmZ0RhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuX2NmZyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY2ZnRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHA6IElDb252ZXllcltdID0gW107XG4gICAgICAgICAgICAgICAgY29uc3QgbSA9IHRoaXMuX2NmZ0RhdGFbaV1cbiAgICAgICAgICAgICAgICBtLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGM6IElDb252ZXllciA9IHsgcG9zOiBjYy52MihpdGVtLngsIGl0ZW0ueSksIGV4aXN0OiBpdGVtLmV4aXN0IH1cbiAgICAgICAgICAgICAgICAgICAgcC5wdXNoKGMpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGhpcy5fY2ZnLnNldChpLCBwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuiiq+inpuWPkSAqL1xuICAgIHB1YmxpYyBvblRyaWdnZXIoKSB7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJDb3VudCsrO1xuICAgICAgICB0aGlzLm1vdmVUbygpO1xuICAgIH1cbn0iXX0=