"use strict";
cc._RF.push(module, 'f540cZpeHtKd6OyKO0TkDxv', 'LevelGoMapBtn');
// Script/Views/LevelMap/component/LevelGoMapBtn.ts

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
var EventMgr_1 = require("../../../Base/Manager/EventMgr");
var Event_1 = require("../../../Logic/Data/Const/Event");
var M_1 = require("../../../Base/Manager/M");
var MapIslandUtils_1 = require("../../../Logic/SimulationOperation/View/Map/MapIslandUtils");
var HotelData_1 = require("../../../Logic/Hotel/HotelData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelGoMapBtn = /** @class */ (function (_super) {
    __extends(LevelGoMapBtn, _super);
    function LevelGoMapBtn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.openNode = null;
        _this.starLabel = null;
        _this.animation = null;
        return _this;
    }
    LevelGoMapBtn.prototype.onDestroy = function () {
        EventMgr_1.default.ins.unRegister(Event_1.Event.Map.UnLockIsland, this.doAnimation, this);
    };
    LevelGoMapBtn.prototype.onLoad = function () {
        EventMgr_1.default.ins.register(Event_1.Event.Map.UnLockIsland, this.doAnimation, this);
    };
    LevelGoMapBtn.prototype.start = function () {
        // let star = M.runtime.getStarCount();
        // let needStar = MapIslandUtils.openMapNeedStar();
        // if (star >= needStar  && GuideUtils.checkGuideDone(303)) {
        //     this.openNode.opacity = 0;
        // }
        var roomConfig = HotelData_1.HotelData.getHotelRoomConfig(1);
        var lvData = M_1.default.runtime.getNativeLvData(roomConfig.openLevel);
        if (lvData && lvData.star > 0 && lvData.score > 0) {
            this.openNode.opacity = 0;
        }
        else {
            this.starLabel.string = "\u7B2C" + roomConfig.openLevel + "\u5173\u5F00\u542F"; //needStar.toString();
        }
    };
    //播放解锁动画
    LevelGoMapBtn.prototype.doAnimation = function () {
        this.openNode.opacity = 255;
        this.animation.play();
    };
    LevelGoMapBtn.prototype.onFinished = function () {
        // console.error("onFInish");
        // EventMgr.ins.send(Event.Map.GuideMask, true);
        EventMgr_1.default.ins.send(Event_1.Event.UI.LevelSceneTouched, true);
        // GuideUtils.checkGuide();
    };
    LevelGoMapBtn.prototype.onClickBtn = function () {
        var roomConfig = HotelData_1.HotelData.getHotelRoomConfig(1);
        var lvData = M_1.default.runtime.getNativeLvData(roomConfig.openLevel);
        MapIslandUtils_1.default.openMapIsland();
        // if (lvData && lvData.star > 0 && lvData.score > 0) {
        //     MapIslandUtils.openMapIsland();
        // } else {
        //     M.tips.show("通关第四关开启海岛酒店!");
        // }
    };
    __decorate([
        property(cc.Node)
    ], LevelGoMapBtn.prototype, "openNode", void 0);
    __decorate([
        property(cc.Label)
    ], LevelGoMapBtn.prototype, "starLabel", void 0);
    __decorate([
        property(cc.Animation)
    ], LevelGoMapBtn.prototype, "animation", void 0);
    LevelGoMapBtn = __decorate([
        ccclass
    ], LevelGoMapBtn);
    return LevelGoMapBtn;
}(cc.Component));
exports.default = LevelGoMapBtn;

cc._RF.pop();