
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/CustomComponent/TTMask.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7f0b7zqwTFPLbUCU91kQsEV', 'TTMask');
// Script/Base/CustomComponent/TTMask.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, inspector = _a.inspector;
var TTMask = /** @class */ (function (_super) {
    __extends(TTMask, _super);
    function TTMask() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._curPoints = [];
        _this._polygonCom = null;
        return _this;
    }
    TTMask.prototype.updateMask = function () {
        var graphics = this['_graphics'];
        graphics.clear(false);
        for (var i = 0; i < this._curPoints.length; ++i) {
            var point = this._curPoints[i];
            if (i === 0) {
                graphics.moveTo(point.x, point.y);
            }
            else {
                graphics.lineTo(point.x, point.y);
            }
        }
        graphics.close();
        graphics.fill();
    };
    TTMask.prototype._compareArray = function (arr1, arr2) {
        var result = true;
        if (arr1 !== arr2 || arr1.length != arr2.length) {
            result = false;
        }
        else {
            for (var i = 0; i < arr1.length; i++) {
                var p1 = arr1[i];
                var p2 = arr2[i];
                if (p1.x !== p2.x || p1.y !== p2.y) {
                    result = false;
                    break;
                }
            }
        }
        return result;
    };
    TTMask.prototype.onEnable = function () {
        var _this = this;
        _super.prototype.onEnable.call(this);
        this._polygonCom = this.node.getComponent(cc.PolygonCollider);
        this.scheduleOnce(function () {
            _this.updateMask();
            // Editor.log("正在执行打包命令中，请稍候...");
        }, 0);
    };
    TTMask.prototype.update = function () {
        if (this._polygonCom && !this._compareArray(this._polygonCom.points, this._curPoints)) {
            this._curPoints = this._polygonCom.points;
            this.updateMask();
        }
    };
    TTMask = __decorate([
        ccclass
        // @executeInEditMode
        ,
        inspector('packages://CustomComponent/mask.js')
    ], TTMask);
    return TTMask;
}(cc.Mask));
exports.default = TTMask;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxDdXN0b21Db21wb25lbnRcXFRUTWFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLEtBQXlCLEVBQUUsQ0FBQyxVQUFVLEVBQXBDLE9BQU8sYUFBQSxFQUFFLFNBQVMsZUFBa0IsQ0FBQztBQUs3QztJQUFvQywwQkFBTztJQUEzQztRQUFBLHFFQTJEQztRQXhEVyxnQkFBVSxHQUFjLEVBQUUsQ0FBQztRQUMzQixpQkFBVyxHQUF1QixJQUFJLENBQUM7O0lBdURuRCxDQUFDO0lBcERXLDJCQUFVLEdBQWxCO1FBQ0ksSUFBTSxRQUFRLEdBQWdCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoRCxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtZQUM3QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFHVCxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3JDO2lCQUFNO2dCQUNILFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDckM7U0FHSjtRQUNELFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVPLDhCQUFhLEdBQXJCLFVBQXNCLElBQWUsRUFBRSxJQUFlO1FBQ2xELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzdDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDbEI7YUFBTTtZQUNILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFO29CQUNoQyxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUNmLE1BQU07aUJBQ1Q7YUFDSjtTQUNKO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELHlCQUFRLEdBQVI7UUFBQSxpQkFPQztRQU5HLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsa0NBQWtDO1FBQ3RDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNWLENBQUM7SUFFRCx1QkFBTSxHQUFOO1FBQ0ksSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDbkYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUMxQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBekRnQixNQUFNO1FBSDFCLE9BQU87UUFDUixxQkFBcUI7O1FBQ3BCLFNBQVMsQ0FBQyxvQ0FBb0MsQ0FBQztPQUMzQixNQUFNLENBMkQxQjtJQUFELGFBQUM7Q0EzREQsQUEyREMsQ0EzRG1DLEVBQUUsQ0FBQyxJQUFJLEdBMkQxQztrQkEzRG9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IHsgY2NjbGFzcywgaW5zcGVjdG9yIH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuLy8gQGV4ZWN1dGVJbkVkaXRNb2RlXG5AaW5zcGVjdG9yKCdwYWNrYWdlczovL0N1c3RvbUNvbXBvbmVudC9tYXNrLmpzJylcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRUTWFzayBleHRlbmRzIGNjLk1hc2sge1xuXG5cbiAgICBwcml2YXRlIF9jdXJQb2ludHM6IGNjLlZlYzJbXSA9IFtdO1xuICAgIHByaXZhdGUgX3BvbHlnb25Db206IGNjLlBvbHlnb25Db2xsaWRlciA9IG51bGw7XG5cblxuICAgIHByaXZhdGUgdXBkYXRlTWFzaygpIHtcbiAgICAgICAgY29uc3QgZ3JhcGhpY3M6IGNjLkdyYXBoaWNzID0gdGhpc1snX2dyYXBoaWNzJ107XG4gICAgICAgIGdyYXBoaWNzLmNsZWFyKGZhbHNlKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jdXJQb2ludHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBwb2ludCA9IHRoaXMuX2N1clBvaW50c1tpXTtcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG5cblxuICAgICAgICAgICAgICAgIGdyYXBoaWNzLm1vdmVUbyhwb2ludC54LCBwb2ludC55KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKHBvaW50LngsIHBvaW50LnkpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuICAgICAgICBncmFwaGljcy5jbG9zZSgpO1xuICAgICAgICBncmFwaGljcy5maWxsKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29tcGFyZUFycmF5KGFycjE6IGNjLlZlYzJbXSwgYXJyMjogY2MuVmVjMltdKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCByZXN1bHQgPSB0cnVlO1xuICAgICAgICBpZiAoYXJyMSAhPT0gYXJyMiB8fCBhcnIxLmxlbmd0aCAhPSBhcnIyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycjEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwMSA9IGFycjFbaV07XG4gICAgICAgICAgICAgICAgY29uc3QgcDIgPSBhcnIyW2ldO1xuICAgICAgICAgICAgICAgIGlmIChwMS54ICE9PSBwMi54IHx8IHAxLnkgIT09IHAyLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICBzdXBlci5vbkVuYWJsZSgpO1xuICAgICAgICB0aGlzLl9wb2x5Z29uQ29tID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5Qb2x5Z29uQ29sbGlkZXIpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1hc2soKTtcbiAgICAgICAgICAgIC8vIEVkaXRvci5sb2coXCLmraPlnKjmiafooYzmiZPljIXlkb3ku6TkuK3vvIzor7fnqI3lgJkuLi5cIik7XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BvbHlnb25Db20gJiYgIXRoaXMuX2NvbXBhcmVBcnJheSh0aGlzLl9wb2x5Z29uQ29tLnBvaW50cywgdGhpcy5fY3VyUG9pbnRzKSkge1xuICAgICAgICAgICAgdGhpcy5fY3VyUG9pbnRzID0gdGhpcy5fcG9seWdvbkNvbS5wb2ludHM7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1hc2soKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19