"use strict";
cc._RF.push(module, 'c18edLWRGhAKInihPZoc02V', 'MapScene');
// Script/Logic/SimulationOperation/View/Map/MapScene.ts

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
var UIMgr_1 = require("../../../../Base/Manager/UIMgr");
var UIData_1 = require("../../../Data/Interface/UIData");
var EventMgr_1 = require("../../../../Base/Manager/EventMgr");
var Event_1 = require("../../../Data/Const/Event");
var TrafficSystem_1 = require("./TrafficSystem/TrafficSystem");
var M_1 = require("../../../../Base/Manager/M");
var MapIslandUtils_1 = require("./MapIslandUtils");
var Exchange_1 = require("./Exchange");
var Util_1 = require("../../../../Base/Utils/Util");
var GuideUtils_1 = require("../../../../../GodGuide/GuideUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MapScene = /** @class */ (function (_super) {
    __extends(MapScene, _super);
    function MapScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mapCamera = null;
        _this.buildingCamera = null;
        _this.trafficSystem = null;
        _this.mapNode = null;
        _this.mapBg = null;
        return _this;
    }
    // buildingSpMap: Map<cc.Node, cc.Sprite> = new Map<cc.Node, cc.Sprite>();
    MapScene.prototype.onLoad = function () {
        // M.init();
        M_1.default.changeScene();
    };
    MapScene.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_END);
        gsap.TweenLite.killTweensOf(this.mapNode);
        MapIslandUtils_1.default.mapLoadFinished = false;
    };
    MapScene.prototype.start = function () {
        // this.mapCamera.zoomRatio = 0.75;
        var _this = this;
        var windowSize = cc.view.getVisibleSize();
        var minRatio = windowSize.height / this.mapBg.height;
        gsap.TweenLite.to(this.mapNode, 1.5, {
            scale: minRatio,
            onComplete: function () {
                UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.MenuPanel);
                // this.test();
                MapIslandUtils_1.default.mapLoadFinished = true;
                MapIslandUtils_1.default.MapScale = minRatio;
                EventMgr_1.default.ins.send(Event_1.Event.Map.MapTouchMoveEnable, true);
                GuideUtils_1.GuideUtils.stopGuide = true;
                _this.moveToLastBuild(function () {
                    GuideUtils_1.GuideUtils.stopGuide = false;
                    GuideUtils_1.GuideUtils.pushGuide("_Guide_level3_1", true);
                });
            }
        });
        // this.mapCamera.zoomRatio = 1;
        // EventMgr.ins.send(Event.Map.MapTouchMoveEnable, true);
    };
    /** 进入的时候定位到最小一个id开放了但是未修理或者未二选一 */
    MapScene.prototype.moveToLastBuild = function (moveEndNext) {
        var buildId = 0;
        if (!MapIslandUtils_1.default.checkBuildFinished(15)) { //如果引导没有完成 先定位到引导
            buildId = 15;
        }
        else if (!MapIslandUtils_1.default.checkBuildFinished(16)) {
            buildId = 16;
        }
        else {
            buildId = MapIslandUtils_1.default.getSmallOpenBuildingId();
        }
        MapIslandUtils_1.default.mapMoveTo(buildId, moveEndNext);
    };
    MapScene.prototype.onEnable = function () {
        // console.error("MapScene onEnable");
    };
    MapScene.prototype.onDisable = function () {
        UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.MenuPanel);
    };
    MapScene.prototype.test = function () {
        var exchanges = this.node.getComponentsInChildren(Exchange_1.default);
        var buidlingPosition = {};
        exchanges.forEach(function (exchange) {
            if (exchange.enabled) {
                var key = exchange.buildingId;
                var lock = Util_1.Util.Tool.getChildByName(exchange.node, "Lock");
                if (lock) {
                    console.error(key, lock.position);
                    buidlingPosition[key] = lock.position;
                }
            }
        });
        console.error(JSON.stringify(buidlingPosition));
    };
    __decorate([
        property(cc.Camera)
    ], MapScene.prototype, "mapCamera", void 0);
    __decorate([
        property(cc.Camera)
    ], MapScene.prototype, "buildingCamera", void 0);
    __decorate([
        property(TrafficSystem_1.default)
    ], MapScene.prototype, "trafficSystem", void 0);
    __decorate([
        property(cc.Node)
    ], MapScene.prototype, "mapNode", void 0);
    __decorate([
        property(cc.Node)
    ], MapScene.prototype, "mapBg", void 0);
    MapScene = __decorate([
        ccclass
    ], MapScene);
    return MapScene;
}(cc.Component));
exports.default = MapScene;

cc._RF.pop();