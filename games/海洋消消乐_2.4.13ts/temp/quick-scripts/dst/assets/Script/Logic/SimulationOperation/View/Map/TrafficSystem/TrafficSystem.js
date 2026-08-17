
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/SimulationOperation/View/Map/TrafficSystem/TrafficSystem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcU2ltdWxhdGlvbk9wZXJhdGlvblxcVmlld1xcTWFwXFxUcmFmZmljU3lzdGVtXFxUcmFmZmljU3lzdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtEQUEyRDtBQUMzRCwrQkFBMEI7QUFDMUIsdURBQXNEO0FBQ3RELHNEQUFxRDtBQUNyRCxpRUFBNEQ7QUFFdEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUF3RkM7UUF2RlcsYUFBTyxHQUFnQyxJQUFJLEdBQUcsRUFBMEIsQ0FBQztRQUN6RSxjQUFRLEdBQStCLElBQUksR0FBRyxFQUF5QixDQUFDO1FBR2hGLGdCQUFVLEdBQWdCLEVBQUUsQ0FBQztRQUc3QixVQUFJLEdBQWMsRUFBRSxDQUFDO1FBRXJCLGNBQVEsR0FBYyxFQUFFLENBQUM7O0lBOEU3QixDQUFDO0lBNUVHLDhCQUFNLEdBQU47SUFDQSxDQUFDO0lBRUQsaUNBQVMsR0FBVDtRQUNJLGtCQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxhQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3JFLENBQUM7SUFFRCw2QkFBSyxHQUFMO1FBQ0ksa0JBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGFBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFFL0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU8sb0NBQVksR0FBcEI7UUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLENB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O1lBQ1IsSUFBSSxFQUFFLElBQUk7U0FDYixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQS9FRDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztxREFDTztJQUc3QjtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzsrQ0FDQztJQVJKLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0F3RmpDO0lBQUQsb0JBQUM7Q0F4RkQsQUF3RkMsQ0F4RjBDLEVBQUUsQ0FBQyxTQUFTLEdBd0Z0RDtrQkF4Rm9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUm9hZFV0aWxzIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9CYXNlL1V0aWxzL1JvYWRVdGlsXCI7XG5pbXBvcnQgV2FsayBmcm9tIFwiLi9XYWxrXCI7XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL0Jhc2UvVXRpbHMvVXRpbFwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9CYXNlL01hbmFnZXIvRXZlbnRNZ3JcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYWZmaWNTeXN0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIHByaXZhdGUgd2Fsa01hcDogTWFwPHN0cmluZywgQXJyYXk8Y2MuVmVjMj4+ID0gbmV3IE1hcDxzdHJpbmcsIEFycmF5PGNjLlZlYzI+PigpO1xuICAgIHByaXZhdGUgd2Fsa05vZGU6IE1hcDxzdHJpbmcsIEFycmF5PHN0cmluZz4+ID0gbmV3IE1hcDxzdHJpbmcsIEFycmF5PHN0cmluZz4+KCk7XG5cbiAgICBAcHJvcGVydHkoW2NjLlByZWZhYl0pXG4gICAgd2Fsa1ByZWZhYjogY2MuUHJlZmFiW10gPSBbXTtcblxuICAgIEBwcm9wZXJ0eShbY2MuTm9kZV0pXG4gICAgYXJlYTogY2MuTm9kZVtdID0gW107XG5cbiAgICB3YWxrTGlzdDogY2MuTm9kZVtdID0gW107XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBFdmVudE1nci5pbnMudW5SZWdpc3RlcihFdmVudC5NYXAuV2Fsa0VuZCwgdGhpcy5kb05leHRXYWxrLCB0aGlzKVxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICBFdmVudE1nci5pbnMucmVnaXN0ZXIoRXZlbnQuTWFwLldhbGtFbmQsIHRoaXMuZG9OZXh0V2FsaywgdGhpcylcblxuICAgICAgICB0aGlzLmluaXRXYWxrUm9hZCgpO1xuICAgICAgICB0aGlzLmV4ZWN1dGVXYWxrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0V2Fsa1JvYWQoKSB7XG4gICAgICAgIGxldCBhbmltX2NvbSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgdmFyIGNsaXBzID0gYW5pbV9jb20uZ2V0Q2xpcHMoKTtcbiAgICAgICAgdmFyIGNsaXAgPSBjbGlwc1swXTtcbiAgICAgICAgdmFyIHBhdGhzID0gY2xpcC5jdXJ2ZURhdGEucGF0aHM7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIHBhdGhzKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHBhdGhzW2tleV0ucHJvcHMucG9zaXRpb247XG4gICAgICAgICAgICB0aGlzLndhbGtNYXAuc2V0KGtleSwgUm9hZFV0aWxzLmdldFJvYWREYXRhKGRhdGEpKTtcblxuICAgICAgICAgICAgbGV0IG5vZGUgPSBrZXkuc3BsaXQoJy0nKTtcbiAgICAgICAgICAgIGxldCBhcnIxID0gdGhpcy53YWxrTm9kZS5nZXQobm9kZVswXSkgfHwgW107XG4gICAgICAgICAgICBhcnIxLnB1c2goa2V5KTtcbiAgICAgICAgICAgIHRoaXMud2Fsa05vZGUuc2V0KG5vZGVbMF0sIGFycjEpO1xuXG4gICAgICAgICAgICBsZXQgYXJyMiA9IHRoaXMud2Fsa05vZGUuZ2V0KG5vZGVbMV0pIHx8IFtdO1xuICAgICAgICAgICAgYXJyMi5wdXNoKGtleS5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpKTtcbiAgICAgICAgICAgIHRoaXMud2Fsa05vZGUuc2V0KG5vZGVbMV0sIGFycjIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBleGVjdXRlV2FsaygpIHtcbiAgICAgICAgbGV0IHdhbGtQcmVmYWIgPSBbXS5jb25jYXQodGhpcy53YWxrUHJlZmFiKTtcbiAgICAgICAgbGV0IHN0YXJ0S2V5cyA9IEFycmF5LmZyb20odGhpcy53YWxrTm9kZS5rZXlzKCkpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc3RhcnQgPSBzdGFydEtleXMuc3BsaWNlKFV0aWwuVG9vbC5yYW5nZUludCgwLCBzdGFydEtleXMubGVuZ3RoLCBmYWxzZSksIDEpWzBdO1xuICAgICAgICAgICAgbGV0IFtlbmQsIHBhdGhdID0gdGhpcy5nZXRSYW5kb21QYXRoKHN0YXJ0KTtcblxuICAgICAgICAgICAgbGV0IGlkeCA9IFV0aWwuVG9vbC5yYW5nZUludCgwLCB3YWxrUHJlZmFiLmxlbmd0aCwgZmFsc2UpO1xuICAgICAgICAgICAgbGV0IHdhbGsgPSBjYy5pbnN0YW50aWF0ZSh3YWxrUHJlZmFiLnNwbGljZShpZHgsIDEpWzBdKTtcbiAgICAgICAgICAgIHdhbGsuZ2V0Q29tcG9uZW50KFdhbGspLnN0YXJ0V2Fsayh7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgICAgIGVuZDogZW5kLFxuICAgICAgICAgICAgICAgIHBhdGg6IHBhdGhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5hcmVhWzBdLmFkZENoaWxkKHdhbGspO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSYW5kb21QYXRoKHN0YXJ0OiBzdHJpbmcpOiBbc3RyaW5nLCBjYy5WZWMyW11dIHtcbiAgICAgICAgbGV0IHBhdGhBcnIgPSB0aGlzLndhbGtOb2RlLmdldChzdGFydCk7XG4gICAgICAgIGxldCBwYXRoTmFtZSA9IHBhdGhBcnJbVXRpbC5Ub29sLnJhbmdlSW50KDAsIHBhdGhBcnIubGVuZ3RoLCBmYWxzZSldO1xuICAgICAgICBsZXQgZW5kID0gcGF0aE5hbWUucmVwbGFjZShzdGFydCArICctJywgJycpO1xuXG4gICAgICAgIGxldCBwYXRoZGF0YSA9IHRoaXMud2Fsa01hcC5nZXQodGhpcy53YWxrTWFwLmhhcyhwYXRoTmFtZSkgPyBwYXRoTmFtZSA6IGAke2VuZH0tJHtzdGFydH1gKTtcbiAgICAgICAgbGV0IHBhdGggPSB0aGlzLndhbGtNYXAuaGFzKGAke3N0YXJ0fS0ke2VuZH1gKSA/IFtdLmNvbmNhdChwYXRoZGF0YSkgOiBbXS5jb25jYXQocGF0aGRhdGEpLnJldmVyc2UoKTtcbiAgICAgICAgcmV0dXJuIFtlbmQsIHBhdGhdXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkb05leHRXYWxrKHdhbGs6IFdhbGspIHtcbiAgICAgICAgbGV0IHN0YXJ0ID0gd2Fsay5yb2FkLmVuZDtcbiAgICAgICAgbGV0IFtlbmQsIHBhdGhdID0gdGhpcy5nZXRSYW5kb21QYXRoKHN0YXJ0KTtcbiAgICAgICAgd2Fsay5zdGFydFdhbGsoe1xuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgZW5kOiBlbmQsXG4gICAgICAgICAgICBwYXRoOiBwYXRoXG4gICAgICAgIH0sIHRydWUpO1xuICAgIH1cblxuXG5cbn0iXX0=