
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Utils/RoadUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '22558BDLdpPF4YbZgzSHzJm', 'RoadUtil');
// Script/Base/Utils/RoadUtil.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, requireComponent = _a.requireComponent;
var RoadUtils = /** @class */ (function (_super) {
    __extends(RoadUtils, _super);
    function RoadUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoadUtils_1 = RoadUtils;
    RoadUtils.prototype.onEnable = function () {
        var anim = this.node.getComponent(cc.Animation);
        var clips = anim.getClips();
        var clip = clips[0];
        var paths = clip.curveData.paths;
        for (var k in paths) {
            var data = paths[k].props.position;
            this.drawRoad(RoadUtils_1.getRoadData(data));
        }
    };
    RoadUtils.prototype.drawRoad = function (roadDatas) {
        var graphics = this.node.getComponent(cc.Graphics) || this.node.addComponent(cc.Graphics);
        graphics.lineWidth = 10;
        for (var j = 0; j < roadDatas.length; j++) {
            var path = roadDatas[j];
            var len = path.length;
            for (var i = 0; i < len; i++) {
                if (i == 0)
                    graphics.moveTo(path[i].x, path[i].y);
                else
                    graphics.lineTo(path[i].x, path[i].y);
            }
        }
        // 画先，填充;
        graphics.stroke();
        graphics.fill();
    };
    RoadUtils.getRoadData = function (road_data) {
        var ctrl1 = null;
        var start_point = null;
        var end_point = null;
        var ctrl2 = null;
        var road_curve_path = []; // [start_point, ctrl1, ctrl2, end_point],
        for (var i = 0; i < road_data.length; i++) {
            var key_frame = road_data[i];
            if (!key_frame.motionPath)
                break;
            if (ctrl1 !== null) {
                road_curve_path.push([start_point, ctrl1, ctrl1, cc.v2(key_frame.value[0], key_frame.value[1])]);
            }
            start_point = cc.v2(key_frame.value[0], key_frame.value[1]);
            for (var j = 0; j < key_frame.motionPath.length; j++) {
                end_point = cc.v2(key_frame.motionPath[j][0], key_frame.motionPath[j][1]);
                ctrl2 = cc.v2(key_frame.motionPath[j][2], key_frame.motionPath[j][3]);
                if (ctrl1 === null) {
                    ctrl1 = ctrl2;
                }
                // 贝塞尔曲线 start_point, ctrl1, ctrl2, end_point,
                road_curve_path.push([start_point, ctrl1, ctrl2, end_point]);
                ctrl1 = cc.v2(key_frame.motionPath[j][4], key_frame.motionPath[j][5]);
                start_point = end_point;
            }
        }
        var one_road = [];
        for (var index = 0; index < road_curve_path.length; index++) {
            start_point = road_curve_path[index][0];
            ctrl1 = road_curve_path[index][1];
            ctrl2 = road_curve_path[index][2];
            end_point = road_curve_path[index][3];
            var len = this.bezierLength(start_point, ctrl1, ctrl2, end_point);
            var OFFSET = 16;
            var count = len / OFFSET;
            count = Math.floor(count);
            var t_delta = 1 / count;
            var t = t_delta;
            for (var i = 0; i < count; i++) {
                var x = start_point.x * (1 - t) * (1 - t) * (1 - t) + 3 * ctrl1.x * t * (1 - t) * (1 - t) + 3 * ctrl2.x * t * t * (1 - t) + end_point.x * t * t * t;
                var y = start_point.y * (1 - t) * (1 - t) * (1 - t) + 3 * ctrl1.y * t * (1 - t) * (1 - t) + 3 * ctrl2.y * t * t * (1 - t) + end_point.y * t * t * t;
                one_road.push(cc.v2(Math.ceil(x), Math.ceil(y)));
                t += t_delta;
            }
        }
        return one_road;
    };
    RoadUtils.bezierLength = function (start_point, ctrl1, ctrl2, end_point) {
        // t [0, 1] t 分成20等分 1 / 20 = 0.05
        var prev_point = start_point;
        var length = 0;
        var t = 0.05;
        for (var i = 0; i < 20; i++) {
            var x = start_point.x * (1 - t) * (1 - t) * (1 - t) + 3 * ctrl1.x * t * (1 - t) * (1 - t) + 3 * ctrl2.x * t * t * (1 - t) + end_point.x * t * t * t;
            var y = start_point.y * (1 - t) * (1 - t) * (1 - t) + 3 * ctrl1.y * t * (1 - t) * (1 - t) + 3 * ctrl2.y * t * t * (1 - t) + end_point.y * t * t * t;
            var now_point = cc.v2(x, y);
            var dir = now_point.sub(prev_point);
            prev_point = now_point;
            length += dir.mag();
            t += 0.05;
        }
        return length;
    };
    var RoadUtils_1;
    RoadUtils = RoadUtils_1 = __decorate([
        ccclass
        // @executeInEditMode
        ,
        requireComponent(cc.Animation)
    ], RoadUtils);
    return RoadUtils;
}(cc.Component));
exports.default = RoadUtils;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxVdGlsc1xcUm9hZFV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFnQyxFQUFFLENBQUMsVUFBVSxFQUEzQyxPQUFPLGFBQUEsRUFBRSxnQkFBZ0Isc0JBQWtCLENBQUM7QUFLcEQ7SUFBdUMsNkJBQVk7SUFBbkQ7O0lBMEdBLENBQUM7a0JBMUdvQixTQUFTO0lBRTFCLDRCQUFRLEdBQVI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUVqQyxLQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRTtZQUNqQixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM5QztJQUNMLENBQUM7SUFFRCw0QkFBUSxHQUFSLFVBQVMsU0FBUztRQUNkLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUYsUUFBUSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxH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QUFJLFVBQVUsR0FBRyxXQUFXLENBQUM7UUFDN0IsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QixJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEosSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BKLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEMsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUN2QixNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRXBCLENBQUMsSUFBSSxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7O0lBekdnQixTQUFTO1FBSDdCLE9BQU87UUFDUixxQkFBcUI7O1FBQ3BCLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7T0FDVixTQUFTLENBMEc3QjtJQUFELGdCQUFDO0NBMUdELEFBMEdDLENBMUdzQyxFQUFFLENBQUMsU0FBUyxHQTBHbEQ7a0JBMUdvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCByZXF1aXJlQ29tcG9uZW50IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuLy8gQGV4ZWN1dGVJbkVkaXRNb2RlXG5AcmVxdWlyZUNvbXBvbmVudChjYy5BbmltYXRpb24pXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2FkVXRpbHMgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIGxldCBhbmltID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICBsZXQgY2xpcHMgPSBhbmltLmdldENsaXBzKCk7XG4gICAgICAgIGxldCBjbGlwID0gY2xpcHNbMF07XG4gICAgICAgIGxldCBwYXRocyA9IGNsaXAuY3VydmVEYXRhLnBhdGhzO1xuXG4gICAgICAgIGZvciAobGV0IGsgaW4gcGF0aHMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gcGF0aHNba10ucHJvcHMucG9zaXRpb247XG4gICAgICAgICAgICB0aGlzLmRyYXdSb2FkKFJvYWRVdGlscy5nZXRSb2FkRGF0YShkYXRhKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmF3Um9hZChyb2FkRGF0YXMpIHtcbiAgICAgICAgbGV0IGdyYXBoaWNzID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5HcmFwaGljcykgfHwgdGhpcy5ub2RlLmFkZENvbXBvbmVudChjYy5HcmFwaGljcyk7XG4gICAgICAgIGdyYXBoaWNzLmxpbmVXaWR0aCA9IDEwO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJvYWREYXRhcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyIHBhdGggPSByb2FkRGF0YXNbal07XG4gICAgICAgICAgICBsZXQgbGVuID0gcGF0aC5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMCkgZ3JhcGhpY3MubW92ZVRvKHBhdGhbaV0ueCwgcGF0aFtpXS55KTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGdyYXBoaWNzLmxpbmVUbyhwYXRoW2ldLngsIHBhdGhbaV0ueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyDnlLvlhYjvvIzloavlhYU7XG4gICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xuICAgICAgICBncmFwaGljcy5maWxsKCk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFJvYWREYXRhKHJvYWRfZGF0YSkge1xuICAgICAgICB2YXIgY3RybDEgPSBudWxsO1xuICAgICAgICB2YXIgc3RhcnRfcG9pbnQgPSBudWxsO1xuICAgICAgICB2YXIgZW5kX3BvaW50ID0gbnVsbDtcbiAgICAgICAgdmFyIGN0cmwyID0gbnVsbDtcblxuICAgICAgICB2YXIgcm9hZF9jdXJ2ZV9wYXRoID0gW107IC8vIFtzdGFydF9wb2ludCwgY3RybDEsIGN0cmwyLCBlbmRfcG9pbnRdLFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvYWRfZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGtleV9mcmFtZSA9IHJvYWRfZGF0YVtpXTtcbiAgICAgICAgICAgIGlmICgha2V5X2ZyYW1lLm1vdGlvblBhdGgpIGJyZWFrO1xuXG4gICAgICAgICAgICBpZiAoY3RybDEgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByb2FkX2N1cnZlX3BhdGgucHVzaChbc3RhcnRfcG9pbnQsIGN0cmwxLCBjdHJsMSwgY2MudjIoa2V5X2ZyYW1lLnZhbHVlWzBdLCBrZXlfZnJhbWUudmFsdWVbMV0pXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0YXJ0X3BvaW50ID0gY2MudjIoa2V5X2ZyYW1lLnZhbHVlWzBdLCBrZXlfZnJhbWUudmFsdWVbMV0pO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGtleV9mcmFtZS5tb3Rpb25QYXRoLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgZW5kX3BvaW50ID0gY2MudjIoa2V5X2ZyYW1lLm1vdGlvblBhdGhbal1bMF0sIGtleV9mcmFtZS5tb3Rpb25QYXRoW2pdWzFdKTtcbiAgICAgICAgICAgICAgICBjdHJsMiA9IGNjLnYyKGtleV9mcmFtZS5tb3Rpb25QYXRoW2pdWzJdLCBrZXlfZnJhbWUubW90aW9uUGF0aFtqXVszXSk7XG4gICAgICAgICAgICAgICAgaWYgKGN0cmwxID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0cmwxID0gY3RybDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIOi0neWhnuWwlOabsue6vyBzdGFydF9wb2ludCwgY3RybDEsIGN0cmwyLCBlbmRfcG9pbnQsXG4gICAgICAgICAgICAgICAgcm9hZF9jdXJ2ZV9wYXRoLnB1c2goW3N0YXJ0X3BvaW50LCBjdHJsMSwgY3RybDIsIGVuZF9wb2ludF0pO1xuICAgICAgICAgICAgICAgIGN0cmwxID0gY2MudjIoa2V5X2ZyYW1lLm1vdGlvblBhdGhbal1bNF0sIGtleV9mcmFtZS5tb3Rpb25QYXRoW2pdWzVdKTtcbiAgICAgICAgICAgICAgICBzdGFydF9wb2ludCA9IGVuZF9wb2ludDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvbmVfcm9hZCA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCByb2FkX2N1cnZlX3BhdGgubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBzdGFydF9wb2ludCA9IHJvYWRfY3VydmVfcGF0aFtpbmRleF1bMF07XG4gICAgICAgICAgICBjdHJsMSA9IHJvYWRfY3VydmVfcGF0aFtpbmRleF1bMV07XG4gICAgICAgICAgICBjdHJsMiA9IHJvYWRfY3VydmVfcGF0aFtpbmRleF1bMl07XG4gICAgICAgICAgICBlbmRfcG9pbnQgPSByb2FkX2N1cnZlX3BhdGhbaW5kZXhdWzNdO1xuXG4gICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5iZXppZXJMZW5ndGgoc3RhcnRfcG9pbnQsIGN0cmwxLCBjdHJsMiwgZW5kX3BvaW50KTtcbiAgICAgICAgICAgIHZhciBPRkZTRVQgPSAxNjtcbiAgICAgICAgICAgIHZhciBjb3VudCA9IGxlbiAvIE9GRlNFVDtcbiAgICAgICAgICAgIGNvdW50ID0gTWF0aC5mbG9vcihjb3VudCk7XG4gICAgICAgICAgICB2YXIgdF9kZWx0YSA9IDEgLyBjb3VudDtcbiAgICAgICAgICAgIHZhciB0ID0gdF9kZWx0YTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHggPSBzdGFydF9wb2ludC54ICogKDEgLSB0KSAqICgxIC0gdCkgKiAoMSAtIHQpICsgMyAqIGN0cmwxLnggKiB0ICogKDEgLSB0KSAqICgxIC0gdCkgKyAzICogY3RybDIueCAqIHQgKiB0ICogKDEgLSB0KSArIGVuZF9wb2ludC54ICogdCAqIHQgKiB0O1xuICAgICAgICAgICAgICAgIHZhciB5ID0gc3RhcnRfcG9pbnQueSAqICgxIC0gdCkgKiAoMSAtIHQpICogKDEgLSB0KSArIDMgKiBjdHJsMS55ICogdCAqICgxIC0gdCkgKiAoMSAtIHQpICsgMyAqIGN0cmwyLnkgKiB0ICogdCAqICgxIC0gdCkgKyBlbmRfcG9pbnQueSAqIHQgKiB0ICogdDtcbiAgICAgICAgICAgICAgICBvbmVfcm9hZC5wdXNoKGNjLnYyKE1hdGguY2VpbCh4KSwgTWF0aC5jZWlsKHkpKSk7XG4gICAgICAgICAgICAgICAgdCArPSB0X2RlbHRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9uZV9yb2FkO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGJlemllckxlbmd0aChzdGFydF9wb2ludCwgY3RybDEsIGN0cmwyLCBlbmRfcG9pbnQpIHtcbiAgICAgICAgLy8gdCBbMCwgMV0gdCDliIbmiJAyMOetieWIhiAxIC8gMjAgPSAwLjA1XG4gICAgICAgIHZhciBwcmV2X3BvaW50ID0gc3RhcnRfcG9pbnQ7XG4gICAgICAgIHZhciBsZW5ndGggPSAwO1xuICAgICAgICB2YXIgdCA9IDAuMDU7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjA7IGkrKykge1xuICAgICAgICAgICAgdmFyIHggPSBzdGFydF9wb2ludC54ICogKDEgLSB0KSAqICgxIC0gdCkgKiAoMSAtIHQpICsgMyAqIGN0cmwxLnggKiB0ICogKDEgLSB0KSAqICgxIC0gdCkgKyAzICogY3RybDIueCAqIHQgKiB0ICogKDEgLSB0KSArIGVuZF9wb2ludC54ICogdCAqIHQgKiB0O1xuICAgICAgICAgICAgdmFyIHkgPSBzdGFydF9wb2ludC55ICogKDEgLSB0KSAqICgxIC0gdCkgKiAoMSAtIHQpICsgMyAqIGN0cmwxLnkgKiB0ICogKDEgLSB0KSAqICgxIC0gdCkgKyAzICogY3RybDIueSAqIHQgKiB0ICogKDEgLSB0KSArIGVuZF9wb2ludC55ICogdCAqIHQgKiB0O1xuICAgICAgICAgICAgdmFyIG5vd19wb2ludCA9IGNjLnYyKHgsIHkpO1xuICAgICAgICAgICAgdmFyIGRpciA9IG5vd19wb2ludC5zdWIocHJldl9wb2ludCk7XG4gICAgICAgICAgICBwcmV2X3BvaW50ID0gbm93X3BvaW50O1xuICAgICAgICAgICAgbGVuZ3RoICs9IGRpci5tYWcoKTtcblxuICAgICAgICAgICAgdCArPSAwLjA1O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxufVxuXG4iXX0=