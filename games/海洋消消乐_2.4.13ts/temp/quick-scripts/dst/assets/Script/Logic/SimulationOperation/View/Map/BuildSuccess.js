
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/SimulationOperation/View/Map/BuildSuccess.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e56c0hF9vpMv6xpLUngHk9M', 'BuildSuccess');
// Script/Logic/SimulationOperation/View/Map/BuildSuccess.ts

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
exports.BuildSuccess = void 0;
var UIBase_1 = require("../../../../Base/UI/UIBase");
var UIMgr_1 = require("../../../../Base/Manager/UIMgr");
var UIData_1 = require("../../../Data/Interface/UIData");
var Util_1 = require("../../../../Base/Utils/Util");
var ShareMgr_1 = require("../../../../Base/Manager/ShareMgr");
var HotelData_1 = require("../../../Hotel/HotelData");
var CloudView_1 = require("./CloudView");
var Constant_1 = require("../../../Data/Const/Constant");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BuildSuccess = /** @class */ (function (_super) {
    __extends(BuildSuccess, _super);
    function BuildSuccess() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.photo = null;
        _this.buildName = null;
        _this.labelShareTip = null;
        _this.labelButton = null;
        _this._buildingId = null;
        _this._isShare = false;
        return _this;
    }
    BuildSuccess.prototype.onInit = function (buildingId) {
        this._buildingId = buildingId;
    };
    BuildSuccess.prototype.onStart = function () {
        this.initRoomData();
    };
    // private initIslandData() {
    //     var buildState = MapIslandUtils.getBuildingState(this._buildingId);
    //     var config = MapIslandUtils.getBuildConfigById(this._buildingId);
    //     Util.Loader.loadSpriteFrame(MapIslandUtils.getBuildShareIcon(this._buildingId, buildState), (err, resource) => {
    //         this.photo.spriteFrame = resource;
    //     });
    //     this.buildName.string = config.desc;
    //     let openShare = this._isShare = config.isShare == 1;
    //     if (openShare) {
    //         this.labelButton.string = "炫 耀";
    //     } else {
    //         this.labelButton.string = "确 定";
    //     }
    // }
    /** 新海岛酒店版本 */
    BuildSuccess.prototype.initRoomData = function () {
        var _this = this;
        //检查是否有下一个房间可以解锁
        var nextRoomConfig = HotelData_1.HotelData.getHotelRoomConfig(this._buildingId + 1);
        if (nextRoomConfig == null) {
            console.error("没有下一个房间可以解锁了");
            // return;
        }
        var roomConfig = HotelData_1.HotelData.getHotelRoomConfig(this._buildingId);
        if (roomConfig) {
            Util_1.Util.Loader.loadSpriteFrame("texture/hotel/shareIcon/room_share_" + this._buildingId, function (err, resource) {
                _this.photo.spriteFrame = resource;
            });
            this.buildName.string = roomConfig.roomName;
            var openShare = this._isShare = true;
            var shareData = ShareMgr_1.default.ins.getConfig(this._buildingId, "buildId");
            if (openShare && shareData) {
                this.labelButton.string = "炫 耀";
                this.labelShareTip.node.active = true;
                this.labelShareTip.string = Util_1.Util.Tool.stringFormat(Constant_1.WaringTips.ShareTip, shareData.reward[0].num);
            }
            else {
                this.labelButton.string = "确 定";
                this.labelShareTip.node.active = false;
            }
        }
    };
    BuildSuccess.prototype.close = function () {
        // if (this._isShare) {
        //     ShareMgr.ins.doShareBuild(this._buildingId, (result) => {
        //         UIMgr.ins.closeUI(UIHudDef.BuildSuccess);
        //         GuideUtils.pushGuide("_Guide_level3_2");
        //     });
        // } else {
        //     UIMgr.ins.closeUI(UIHudDef.BuildSuccess);
        //     GuideUtils.pushGuide("_Guide_level3_2");
        // }
        var _this = this;
        if (this._isShare) {
            ShareMgr_1.default.ins.doShareBuild(this._buildingId, function (result) {
                UIMgr_1.default.ins.hideUI(UIData_1.UIHudDef.BuildSuccess);
                if (result) {
                    var shareData = ShareMgr_1.default.ins.getConfig(_this._buildingId, "buildId");
                    UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.CommonReward, shareData.reward[0], null, _this.doCloseCallback.bind(_this));
                }
                else {
                    _this.doCloseCallback();
                }
            });
        }
        else {
            UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.BuildSuccess);
            UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.CloudView, CloudView_1.ICloudData.RoomRefresh);
        }
    };
    BuildSuccess.prototype.doCloseCallback = function () {
        var nextRoomConfig = HotelData_1.HotelData.getHotelRoomConfig(this._buildingId + 1);
        if (nextRoomConfig == null) {
            console.error("没有下一个房间可以解锁了");
            return;
        }
        UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.CloudView, CloudView_1.ICloudData.RoomRefresh);
    };
    __decorate([
        property(cc.Sprite)
    ], BuildSuccess.prototype, "photo", void 0);
    __decorate([
        property(cc.Label)
    ], BuildSuccess.prototype, "buildName", void 0);
    __decorate([
        property(cc.RichText)
    ], BuildSuccess.prototype, "labelShareTip", void 0);
    __decorate([
        property(cc.Label)
    ], BuildSuccess.prototype, "labelButton", void 0);
    BuildSuccess = __decorate([
        ccclass
    ], BuildSuccess);
    return BuildSuccess;
}(UIBase_1.default));
exports.BuildSuccess = BuildSuccess;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcU2ltdWxhdGlvbk9wZXJhdGlvblxcVmlld1xcTWFwXFxCdWlsZFN1Y2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUFnRDtBQUNoRCx3REFBbUQ7QUFDbkQseURBQTBEO0FBRTFELG9EQUFtRDtBQUduRCw4REFBeUQ7QUFDekQsc0RBQXFEO0FBR3JELHlDQUF5QztBQUN6Qyx5REFBMEQ7QUFFcEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0MsZ0NBQU07SUFBeEM7UUFBQSxxRUEwR0M7UUF2R0csV0FBSyxHQUFjLElBQUksQ0FBQztRQUd4QixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLG1CQUFhLEdBQWdCLElBQUksQ0FBQztRQUdsQyxpQkFBVyxHQUFhLElBQUksQ0FBQztRQUVyQixpQkFBVyxHQUFXLElBQUksQ0FBQztRQUUzQixjQUFRLEdBQVksS0FBSyxDQUFDOztJQTBGdEMsQ0FBQztJQXhGVSw2QkFBTSxHQUFiLFVBQWMsVUFBa0I7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDbEMsQ0FBQztJQUVELDhCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELDZCQUE2QjtJQUM3QiwwRUFBMEU7SUFDMUUsd0VBQXdFO0lBQ3hFLHVIQUF1SDtJQUN2SCw2Q0FBNkM7SUFDN0MsVUFBVTtJQUNWLDJDQUEyQztJQUUzQywyREFBMkQ7SUFDM0QsdUJBQXVCO0lBQ3ZCLDJDQUEyQztJQUMzQyxlQUFlO0lBQ2YsMkNBQTJDO0lBQzNDLFFBQVE7SUFDUixJQUFJO0lBRUosY0FBYztJQUNOLG1DQUFZLEdBQXBCO1FBQUEsaUJBeUJDO1FBeEJHLGdCQUFnQjtRQUNoQixJ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QUFDO0lBRU8sc0NBQWUsR0FBdkI7UUFDSSxJQUFJLGNBQWMsR0FBRyxxQkFBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEUsSUFBSSxjQUFjLElBQUksSUFBSSxFQUFFO1lBQ3hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDOUIsT0FBTztTQUNWO1FBQ0QsZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQVEsQ0FBQyxTQUFTLEVBQUUsc0JBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBdEdEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7K0NBQ0k7SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDUTtJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO3VEQUNZO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ1U7SUFacEIsWUFBWTtRQUR4QixPQUFPO09BQ0ssWUFBWSxDQTBHeEI7SUFBRCxtQkFBQztDQTFHRCxBQTBHQyxDQTFHaUMsZ0JBQU0sR0EwR3ZDO0FBMUdZLG9DQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVJQmFzZSBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9VSS9VSUJhc2VcIjtcbmltcG9ydCBVSU1nciBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL1VJTWdyXCI7XG5pbXBvcnQgeyBVSUh1ZERlZiB9IGZyb20gXCIuLi8uLi8uLi9EYXRhL0ludGVyZmFjZS9VSURhdGFcIjtcbmltcG9ydCBNYXBJc2xhbmRVdGlscyBmcm9tIFwiLi9NYXBJc2xhbmRVdGlsc1wiO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL1V0aWxzL1V0aWxcIjtcbmltcG9ydCB7IEd1aWRlVXRpbHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vR29kR3VpZGUvR3VpZGVVdGlsc1wiO1xuaW1wb3J0IE0gZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgU2hhcmVNZ3IgZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9TaGFyZU1nclwiO1xuaW1wb3J0IHsgSG90ZWxEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL0hvdGVsL0hvdGVsRGF0YVwiO1xuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL01hbmFnZXIvRXZlbnRNZ3JcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCB7IElDbG91ZERhdGEgfSBmcm9tIFwiLi9DbG91ZFZpZXdcIjtcbmltcG9ydCB7IFdhcmluZ1RpcHMgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGNsYXNzIEJ1aWxkU3VjY2VzcyBleHRlbmRzIFVJQmFzZSB7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHBob3RvOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGJ1aWxkTmFtZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlJpY2hUZXh0KVxuICAgIGxhYmVsU2hhcmVUaXA6IGNjLlJpY2hUZXh0ID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJlbEJ1dHRvbjogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfYnVpbGRpbmdJZDogbnVtYmVyID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2lzU2hhcmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBvbkluaXQoYnVpbGRpbmdJZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2J1aWxkaW5nSWQgPSBidWlsZGluZ0lkO1xuICAgIH1cblxuICAgIG9uU3RhcnQoKSB7XG4gICAgICAgIHRoaXMuaW5pdFJvb21EYXRhKCk7XG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZSBpbml0SXNsYW5kRGF0YSgpIHtcbiAgICAvLyAgICAgdmFyIGJ1aWxkU3RhdGUgPSBNYXBJc2xhbmRVdGlscy5nZXRCdWlsZGluZ1N0YXRlKHRoaXMuX2J1aWxkaW5nSWQpO1xuICAgIC8vICAgICB2YXIgY29uZmlnID0gTWFwSXNsYW5kVXRpbHMuZ2V0QnVpbGRDb25maWdCeUlkKHRoaXMuX2J1aWxkaW5nSWQpO1xuICAgIC8vICAgICBVdGlsLkxvYWRlci5sb2FkU3ByaXRlRnJhbWUoTWFwSXNsYW5kVXRpbHMuZ2V0QnVpbGRTaGFyZUljb24odGhpcy5fYnVpbGRpbmdJZCwgYnVpbGRTdGF0ZSksIChlcnIsIHJlc291cmNlKSA9PiB7XG4gICAgLy8gICAgICAgICB0aGlzLnBob3RvLnNwcml0ZUZyYW1lID0gcmVzb3VyY2U7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgICB0aGlzLmJ1aWxkTmFtZS5zdHJpbmcgPSBjb25maWcuZGVzYztcblxuICAgIC8vICAgICBsZXQgb3BlblNoYXJlID0gdGhpcy5faXNTaGFyZSA9IGNvbmZpZy5pc1NoYXJlID09IDE7XG4gICAgLy8gICAgIGlmIChvcGVuU2hhcmUpIHtcbiAgICAvLyAgICAgICAgIHRoaXMubGFiZWxCdXR0b24uc3RyaW5nID0gXCLngqsg6ICAXCI7XG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICB0aGlzLmxhYmVsQnV0dG9uLnN0cmluZyA9IFwi56GuIOWumlwiO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgLyoqIOaWsOa1t+Wym+mFkuW6l+eJiOacrCAqL1xuICAgIHByaXZhdGUgaW5pdFJvb21EYXRhKCkge1xuICAgICAgICAvL+ajgOafpeaYr+WQpuacieS4i+S4gOS4quaIv+mXtOWPr+S7peino+mUgVxuICAgICAgICBsZXQgbmV4dFJvb21Db25maWcgPSBIb3RlbERhdGEuZ2V0SG90ZWxSb29tQ29uZmlnKHRoaXMuX2J1aWxkaW5nSWQgKyAxKTtcbiAgICAgICAgaWYgKG5leHRSb29tQ29uZmlnID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLmsqHmnInkuIvkuIDkuKrmiL/pl7Tlj6/ku6Xop6PplIHkuoZcIik7XG4gICAgICAgICAgICAvLyByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcm9vbUNvbmZpZyA9IEhvdGVsRGF0YS5nZXRIb3RlbFJvb21Db25maWcodGhpcy5fYnVpbGRpbmdJZCk7XG4gICAgICAgIGlmIChyb29tQ29uZmlnKSB7XG4gICAgICAgICAgICBVdGlsLkxvYWRlci5sb2FkU3ByaXRlRnJhbWUoXCJ0ZXh0dXJlL2hvdGVsL3NoYXJlSWNvbi9yb29tX3NoYXJlX1wiICsgdGhpcy5fYnVpbGRpbmdJZCwgKGVyciwgcmVzb3VyY2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBob3RvLnNwcml0ZUZyYW1lID0gcmVzb3VyY2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYnVpbGROYW1lLnN0cmluZyA9IHJvb21Db25maWcucm9vbU5hbWU7XG4gICAgICAgICAgICBsZXQgb3BlblNoYXJlID0gdGhpcy5faXNTaGFyZSA9IHRydWU7XG4gICAgICAgICAgICBsZXQgc2hhcmVEYXRhID0gU2hhcmVNZ3IuaW5zLmdldENvbmZpZyh0aGlzLl9idWlsZGluZ0lkLCBcImJ1aWxkSWRcIik7XG4gICAgICAgICAgICBpZiAob3BlblNoYXJlICYmIHNoYXJlRGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGFiZWxCdXR0b24uc3RyaW5nID0gXCLngqsg6ICAXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbFNoYXJlVGlwLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsU2hhcmVUaXAuc3RyaW5nID0gVXRpbC5Ub29sLnN0cmluZ0Zvcm1hdChXYXJpbmdUaXBzLlNoYXJlVGlwLCBzaGFyZURhdGEucmV3YXJkWzBdLm51bSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbEJ1dHRvbi5zdHJpbmcgPSBcIuehriDlrppcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsU2hhcmVUaXAubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjbG9zZSgpIHtcbiAgICAgICAgLy8gaWYgKHRoaXMuX2lzU2hhcmUpIHtcbiAgICAgICAgLy8gICAgIFNoYXJlTWdyLmlucy5kb1NoYXJlQnVpbGQodGhpcy5fYnVpbGRpbmdJZCwgKHJlc3VsdCkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIFVJTWdyLmlucy5jbG9zZVVJKFVJSHVkRGVmLkJ1aWxkU3VjY2Vzcyk7XG4gICAgICAgIC8vICAgICAgICAgR3VpZGVVdGlscy5wdXNoR3VpZGUoXCJfR3VpZGVfbGV2ZWwzXzJcIik7XG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIFVJTWdyLmlucy5jbG9zZVVJKFVJSHVkRGVmLkJ1aWxkU3VjY2Vzcyk7XG4gICAgICAgIC8vICAgICBHdWlkZVV0aWxzLnB1c2hHdWlkZShcIl9HdWlkZV9sZXZlbDNfMlwiKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGlmICh0aGlzLl9pc1NoYXJlKSB7XG4gICAgICAgICAgICBTaGFyZU1nci5pbnMuZG9TaGFyZUJ1aWxkKHRoaXMuX2J1aWxkaW5nSWQsIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBVSU1nci5pbnMuaGlkZVVJKFVJSHVkRGVmLkJ1aWxkU3VjY2Vzcyk7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzaGFyZURhdGEgPSBTaGFyZU1nci5pbnMuZ2V0Q29uZmlnKHRoaXMuX2J1aWxkaW5nSWQsIFwiYnVpbGRJZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgVUlNZ3IuaW5zLnNob3dVSShVSUh1ZERlZi5Db21tb25SZXdhcmQsIHNoYXJlRGF0YS5yZXdhcmRbMF0sIG51bGwsIHRoaXMuZG9DbG9zZUNhbGxiYWNrLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9DbG9zZUNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBVSU1nci5pbnMuY2xvc2VVSShVSUh1ZERlZi5CdWlsZFN1Y2Nlc3MpO1xuICAgICAgICAgICAgVUlNZ3IuaW5zLnNob3dVSShVSUh1ZERlZi5DbG91ZFZpZXcsIElDbG91ZERhdGEuUm9vbVJlZnJlc2gpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkb0Nsb3NlQ2FsbGJhY2soKSB7XG4gICAgICAgIGxldCBuZXh0Um9vbUNvbmZpZyA9IEhvdGVsRGF0YS5nZXRIb3RlbFJvb21Db25maWcodGhpcy5fYnVpbGRpbmdJZCArIDEpO1xuICAgICAgICBpZiAobmV4dFJvb21Db25maWcgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuayoeacieS4i+S4gOS4quaIv+mXtOWPr+S7peino+mUgeS6hlwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBVSU1nci5pbnMuc2hvd1VJKFVJSHVkRGVmLkNsb3VkVmlldywgSUNsb3VkRGF0YS5Sb29tUmVmcmVzaCk7XG4gICAgfVxufSJdfQ==