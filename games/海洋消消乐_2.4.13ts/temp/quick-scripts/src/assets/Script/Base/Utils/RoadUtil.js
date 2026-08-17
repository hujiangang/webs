"use strict";
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