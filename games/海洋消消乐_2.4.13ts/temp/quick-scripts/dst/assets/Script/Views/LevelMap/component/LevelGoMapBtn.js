
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Views/LevelMap/component/LevelGoMapBtn.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxWaWV3c1xcTGV2ZWxNYXBcXGNvbXBvbmVudFxcTGV2ZWxHb01hcEJ0bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyREFBc0Q7QUFDdEQseURBQXdEO0FBQ3hELDZDQUF3QztBQUN4Qyw2RkFBd0Y7QUFDeEYsNERBQTJEO0FBRXJELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBMERDO1FBeERHLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixlQUFTLEdBQWlCLElBQUksQ0FBQzs7SUFrRG5DLENBQUM7SUFoREcsaUNBQVMsR0FBVDtRQUNJLGtCQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxhQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRCw4QkFBTSxHQUFOO1FBQ0ksa0JBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGFBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELDZCQUFLLEdBQUw7UUFDSSx1Q0FBdUM7UUFDdkMsbURBQW1EO1FBQ25ELDZEQUE2RDtRQUM3RCxpQ0FBaUM7UUFDakMsSUFBSTtRQUNKLElBQUksVUFBVSxHQUFHLHFCQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBTSxNQUFNLEdBQUcsV0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9ELElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztTQUM3QjthQUFNO1lBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsV0FBSSxVQUFVLENBQUMsU0FBUyx1QkFBSyxDQUFBLENBQUMsc0JBQXNCO1NBQy9FO0lBQ0wsQ0FBQztJQUVELFFBQVE7SUFDUixtQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGtDQUFVLEdBQVY7UUFDSSw2QkFBNkI7UUFDN0IsZ0RBQWdEO1FBQ2hELGtCQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFLLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BELDJCQUEyQjtJQUMvQixDQUFDO0lBRU0sa0NBQVUsR0FBakI7UUFDSSxJQUFJLFVBQVUsR0FBRyxxQkFBUyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELElBQU0sTUFBTSxHQUFHLFdBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUvRCx3QkFBYyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRS9CLHVEQUF1RDtRQUN2RCxzQ0FBc0M7UUFDdEMsV0FBVztRQUNYLG1DQUFtQztRQUNuQyxJQUFJO0lBQ1IsQ0FBQztJQXZERDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ1E7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQztvREFDUTtJQVJkLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0EwRGpDO0lBQUQsb0JBQUM7Q0ExREQsQUEwREMsQ0ExRDBDLEVBQUUsQ0FBQyxTQUFTLEdBMER0RDtrQkExRG9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHdWlkZVV0aWxzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL0dvZEd1aWRlL0d1aWRlVXRpbHNcIjtcbmltcG9ydCBFdmVudE1nciBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL0V2ZW50TWdyXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9Mb2dpYy9EYXRhL0NvbnN0L0V2ZW50XCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCBNYXBJc2xhbmRVdGlscyBmcm9tIFwiLi4vLi4vLi4vTG9naWMvU2ltdWxhdGlvbk9wZXJhdGlvbi9WaWV3L01hcC9NYXBJc2xhbmRVdGlsc1wiO1xuaW1wb3J0IHsgSG90ZWxEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL0xvZ2ljL0hvdGVsL0hvdGVsRGF0YVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGV2ZWxHb01hcEJ0biBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgb3Blbk5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHN0YXJMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkFuaW1hdGlvbilcbiAgICBhbmltYXRpb246IGNjLkFuaW1hdGlvbiA9IG51bGw7XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIEV2ZW50TWdyLmlucy51blJlZ2lzdGVyKEV2ZW50Lk1hcC5VbkxvY2tJc2xhbmQsIHRoaXMuZG9BbmltYXRpb24sIHRoaXMpO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnJlZ2lzdGVyKEV2ZW50Lk1hcC5VbkxvY2tJc2xhbmQsIHRoaXMuZG9BbmltYXRpb24sIHRoaXMpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICAvLyBsZXQgc3RhciA9IE0ucnVudGltZS5nZXRTdGFyQ291bnQoKTtcbiAgICAgICAgLy8gbGV0IG5lZWRTdGFyID0gTWFwSXNsYW5kVXRpbHMub3Blbk1hcE5lZWRTdGFyKCk7XG4gICAgICAgIC8vIGlmIChzdGFyID49IG5lZWRTdGFyICAmJiBHdWlkZVV0aWxzLmNoZWNrR3VpZGVEb25lKDMwMykpIHtcbiAgICAgICAgLy8gICAgIHRoaXMub3Blbk5vZGUub3BhY2l0eSA9IDA7XG4gICAgICAgIC8vIH1cbiAgICAgICAgbGV0IHJvb21Db25maWcgPSBIb3RlbERhdGEuZ2V0SG90ZWxSb29tQ29uZmlnKDEpO1xuICAgICAgICBjb25zdCBsdkRhdGEgPSBNLnJ1bnRpbWUuZ2V0TmF0aXZlTHZEYXRhKHJvb21Db25maWcub3BlbkxldmVsKTtcbiAgICAgICAgaWYgKGx2RGF0YSAmJiBsdkRhdGEuc3RhciA+IDAgJiYgbHZEYXRhLnNjb3JlID4gMCkge1xuICAgICAgICAgICAgdGhpcy5vcGVuTm9kZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhckxhYmVsLnN0cmluZyA9IGDnrKwke3Jvb21Db25maWcub3BlbkxldmVsfeWFs+W8gOWQr2AgLy9uZWVkU3Rhci50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/mkq3mlL7op6PplIHliqjnlLtcbiAgICBkb0FuaW1hdGlvbigpIHtcbiAgICAgICAgdGhpcy5vcGVuTm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5wbGF5KCk7XG4gICAgfVxuXG4gICAgb25GaW5pc2hlZCgpIHtcbiAgICAgICAgLy8gY29uc29sZS5lcnJvcihcIm9uRkluaXNoXCIpO1xuICAgICAgICAvLyBFdmVudE1nci5pbnMuc2VuZChFdmVudC5NYXAuR3VpZGVNYXNrLCB0cnVlKTtcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuVUkuTGV2ZWxTY2VuZVRvdWNoZWQsIHRydWUpO1xuICAgICAgICAvLyBHdWlkZVV0aWxzLmNoZWNrR3VpZGUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbGlja0J0bigpIHtcbiAgICAgICAgbGV0IHJvb21Db25maWcgPSBIb3RlbERhdGEuZ2V0SG90ZWxSb29tQ29uZmlnKDEpO1xuICAgICAgICBjb25zdCBsdkRhdGEgPSBNLnJ1bnRpbWUuZ2V0TmF0aXZlTHZEYXRhKHJvb21Db25maWcub3BlbkxldmVsKTtcblxuICAgICAgICBNYXBJc2xhbmRVdGlscy5vcGVuTWFwSXNsYW5kKCk7XG5cbiAgICAgICAgLy8gaWYgKGx2RGF0YSAmJiBsdkRhdGEuc3RhciA+IDAgJiYgbHZEYXRhLnNjb3JlID4gMCkge1xuICAgICAgICAvLyAgICAgTWFwSXNsYW5kVXRpbHMub3Blbk1hcElzbGFuZCgpO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgTS50aXBzLnNob3coXCLpgJrlhbPnrKzlm5vlhbPlvIDlkK/mtbflspvphZLlupchXCIpO1xuICAgICAgICAvLyB9XG4gICAgfVxufSJdfQ==