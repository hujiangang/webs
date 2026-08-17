"use strict";
cc._RF.push(module, '93810zRYHtM9ZwHjg4YtmCP', 'TrafficSystem');
// Script/Logic/SimulationOperation/View/Map/TrafficSystem/TrafficSystem.ts

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
var RoadUtil_1 = require("../../../../../Base/Utils/RoadUtil");
var Walk_1 = require("./Walk");
var Util_1 = require("../../../../../Base/Utils/Util");
var Event_1 = require("../../../../Data/Const/Event");
var EventMgr_1 = require("../../../../../Base/Manager/EventMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TrafficSystem = /** @class */ (function (_super) {
    __extends(TrafficSystem, _super);
    function TrafficSystem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.walkMap = new Map();
        _this.walkNode = new Map();
        _this.walkPrefab = [];
        _this.area = [];
        _this.walkList = [];
        return _this;
    }
    TrafficSystem.prototype.onLoad = function () {
    };
    TrafficSystem.prototype.onDestroy = function () {
        EventMgr_1.default.ins.unRegister(Event_1.Event.Map.WalkEnd, this.doNextWalk, this);
    };
    TrafficSystem.prototype.start = function () {
        EventMgr_1.default.ins.register(Event_1.Event.Map.WalkEnd, this.doNextWalk, this);
        this.initWalkRoad();
        this.executeWalk();
    };
    TrafficSystem.prototype.initWalkRoad = function () {
        var anim_com = this.node.getComponent(cc.Animation);
        var clips = anim_com.getClips();
        var clip = clips[0];
        var paths = clip.curveData.paths;
        for (var key in paths) {
            var data = paths[key].props.position;
            this.walkMap.set(key, RoadUtil_1.default.getRoadData(data));
            var node = key.split('-');
            var arr1 = this.walkNode.get(node[0]) || [];
            arr1.push(key);
            this.walkNode.set(node[0], arr1);
            var arr2 = this.walkNode.get(node[1]) || [];
            arr2.push(key.split('').reverse().join(''));
            this.walkNode.set(node[1], arr2);
        }
    };
    TrafficSystem.prototype.executeWalk = function () {
        var walkPrefab = [].concat(this.walkPrefab);
        var startKeys = Array.from(this.walkNode.keys());
        for (var i = 0; i < 3; i++) {
            var start = startKeys.splice(Util_1.Util.Tool.rangeInt(0, startKeys.length, false), 1)[0];
            var _a = this.getRandomPath(start), end = _a[0], path = _a[1];
            var idx = Util_1.Util.Tool.rangeInt(0, walkPrefab.length, false);
            var walk = cc.instantiate(walkPrefab.splice(idx, 1)[0]);
            walk.getComponent(Walk_1.default).startWalk({
                start: start,
                end: end,
                path: path
            });
            this.area[0].addChild(walk);
        }
    };
    TrafficSystem.prototype.getRandomPath = function (start) {
        var pathArr = this.walkNode.get(start);
        var pathName = pathArr[Util_1.Util.Tool.rangeInt(0, pathArr.length, false)];
        var end = pathName.replace(start + '-', '');
        var pathdata = this.walkMap.get(this.walkMap.has(pathName) ? pathName : end + "-" + start);
        var path = this.walkMap.has(start + "-" + end) ? [].concat(pathdata) : [].concat(pathdata).reverse();
        return [end, path];
    };
    TrafficSystem.prototype.doNextWalk = function (walk) {
        var start = walk.road.end;
        var _a = this.getRandomPath(start), end = _a[0], path = _a[1];
        walk.startWalk({
            start: start,
            end: end,
            path: path
        }, true);
    };
    __decorate([
        property([cc.Prefab])
    ], TrafficSystem.prototype, "walkPrefab", void 0);
    __decorate([
        property([cc.Node])
    ], TrafficSystem.prototype, "area", void 0);
    TrafficSystem = __decorate([
        ccclass
    ], TrafficSystem);
    return TrafficSystem;
}(cc.Component));
exports.default = TrafficSystem;

cc._RF.pop();