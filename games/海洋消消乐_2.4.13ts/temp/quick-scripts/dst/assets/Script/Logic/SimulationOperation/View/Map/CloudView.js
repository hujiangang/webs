
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/SimulationOperation/View/Map/CloudView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '12093WvMqZNFrs8PI0DhElx', 'CloudView');
// Script/Logic/SimulationOperation/View/Map/CloudView.ts

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
exports.ICloudData = void 0;
var SpinePlayerCtrl_1 = require("../../../../Base/CustomComponent/SpinePlayerCtrl");
var UIBase_1 = require("../../../../Base/UI/UIBase");
var Constant_1 = require("../../../Data/Const/Constant");
var UIMgr_1 = require("../../../../Base/Manager/UIMgr");
var UIData_1 = require("../../../Data/Interface/UIData");
var Common_1 = require("../../../Common/Common");
var EventMgr_1 = require("../../../../Base/Manager/EventMgr");
var Event_1 = require("../../../Data/Const/Event");
var ICloudData;
(function (ICloudData) {
    ICloudData[ICloudData["JumpIsland"] = 1] = "JumpIsland";
    ICloudData[ICloudData["LeaveIsland"] = 2] = "LeaveIsland";
    ICloudData[ICloudData["OpenHotel"] = 3] = "OpenHotel";
    ICloudData[ICloudData["RoomRefresh"] = 4] = "RoomRefresh";
    ICloudData[ICloudData["VisitFriendHotel"] = 5] = "VisitFriendHotel";
})(ICloudData = exports.ICloudData || (exports.ICloudData = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CloudView = /** @class */ (function (_super) {
    __extends(CloudView, _super);
    function CloudView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._data = null;
        _this._hasPlayer = false;
        _this._hasLoaded = false;
        return _this;
    }
    CloudView.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
    };
    CloudView.prototype.onInit = function (param) {
        var spinePlayerCtrl = this._spinePlayerCtrl = this.getComponent(SpinePlayerCtrl_1.default);
        spinePlayerCtrl.enabled = true;
        spinePlayerCtrl.paused = true;
        this._data = param;
        this.timePlay();
        //可以在云遮挡的时候加载资源
        // if (param == ICloudData.JumpIsland) {
        //     this.preloadIslandMap();
        // } else if (param == ICloudData.LeaveIsland) {
        //     this._hasLoaded = true;
        //     this.playCloud();
        // } else if (param == ICloudData.OpenHotel) {
        // }
        // else if (param == )
        //可以在云遮挡的时候加载资源
        switch (param) {
            case ICloudData.JumpIsland:
                this.preloadIslandMap();
                break;
            case ICloudData.LeaveIsland:
                this._hasLoaded = true;
                this.playCloud();
                break;
            case ICloudData.OpenHotel:
                this._hasLoaded = true;
                // cc.director.loadScene("HotelScene");
                break;
            case ICloudData.RoomRefresh:
                this._hasLoaded = true;
                EventMgr_1.default.ins.send(Event_1.Event.Hotel.RoomFinished);
                break;
            case ICloudData.VisitFriendHotel:
                this._hasLoaded = true;
                break;
        }
    };
    CloudView.prototype.preloadIslandMap = function () {
        this.playCloud();
        // cc.director.preloadScene(Scene.Map, null, (error: Error, asset: cc.SceneAsset) => {
        //     this._hasLoaded = true;
        //     let buildingArr = [];
        //     let buildingState = StorageMgr.Storage.getObject(StorageMgr.Storage.BuildingState);
        //     let exchanges = asset.scene.getComponentsInChildren(Exchange);
        //     exchanges.forEach((exchange: Exchange) => {
        //         if (exchange.enabled) {
        //             let key = exchange.buildingId;
        //             let singleBuildState = buildingState ? buildingState[key] : null;
        //             if (singleBuildState) {
        //                 buildingArr.push('prefab/map/' + exchange.path + singleBuildState.state);
        //             } else {
        //                 buildingArr.push('prefab/map/' + exchange.path + exchange.state);
        //             }
        //         }
        //     });
        //     // for (let i = 1; i <= 25; i++) {
        //     //     buildingArr.push('texture/map/bg/map_' + (i < 10 ? '0' + i : i));
        //     // }
        //     cc.loader.loadResArray(buildingArr, null, (err, resource: any[]) => {
        //         if (!err) {
        //             // console.warn('预加载map资源完毕!');
        //         } else {
        //             console.warn("加载出错" + err);
        //         }
        //         this.playCloud();
        //     })
        // });
    };
    CloudView.prototype.timePlay = function () {
        this.scheduleOnce(this.playCloud, 1);
    };
    CloudView.prototype.playCloud = function () {
        if (this._hasPlayer || !this._hasLoaded || this._spinePlayerCtrl == null)
            return;
        this._hasPlayer = true;
        this.unschedule(this.playCloud);
        this.doBeforePlay();
    };
    CloudView.prototype.doBeforePlay = function () {
        if (this._data == ICloudData.JumpIsland) {
            Common_1.default.jumpScene(Constant_1.Scene.Map, this.beginPlay.bind(this));
        }
        else if (this._data == ICloudData.LeaveIsland) {
            Common_1.default.jumpScene(Constant_1.Scene.Level, this.beginPlay.bind(this));
        }
        else {
            this.beginPlay();
        }
    };
    CloudView.prototype.beginPlay = function () {
        if (this._spinePlayerCtrl == null)
            return;
        this._spinePlayerCtrl.paused = false;
        this._spinePlayerCtrl.play("cloud", 0, false, this.playCloudComplete);
    };
    CloudView.prototype.playCloudComplete = function () {
        UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.CloudView, true);
    };
    CloudView.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        // console.error("clear");
        this.unschedule(this.playCloud);
        this._spinePlayerCtrl = null;
        this._hasPlayer = false;
        this._hasLoaded = false;
    };
    CloudView = __decorate([
        ccclass
    ], CloudView);
    return CloudView;
}(UIBase_1.default));
exports.default = CloudView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcU2ltdWxhdGlvbk9wZXJhdGlvblxcVmlld1xcTWFwXFxDbG91ZFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUErRTtBQUMvRSxxREFBZ0Q7QUFDaEQseURBQXFEO0FBR3JELHdEQUFtRDtBQUNuRCx5REFBMEQ7QUFDMUQsaURBQTRDO0FBQzVDLDhEQUF5RDtBQUN6RCxtREFBa0Q7QUFFbEQsSUFBWSxVQU1YO0FBTkQsV0FBWSxVQUFVO0lBQ2xCLHVEQUFjLENBQUE7SUFDZCx5REFBVyxDQUFBO0lBQ1gscURBQVMsQ0FBQTtJQUNULHlEQUFXLENBQUE7SUFDWCxtRUFBZ0IsQ0FBQTtBQUNwQixDQUFDLEVBTlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFNckI7QUFFSyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF1Qyw2QkFBTTtJQUE3QztRQUFBLHFFQThIQztRQTNIVyxXQUFLLEdBQWUsSUFBSSxDQUFDO1FBQ3pCLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGdCQUFVLEdBQVksS0FBSyxDQUFDOztJQXlIeEMsQ0FBQztJQXhIVSwwQkFBTSxHQUFiO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELDBCQUFNLEdBQU4sVUFBTyxLQUFLO1FBQ1IsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMseUJBQWUsQ0FBQyxDQUFDO1FBQ2pGLGVBQWUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQy9CLGVBQWUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRTlCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVoQixlQUFlO1FBQ2Ysd0NBQXdDO1FBQ3hDLCtCQUErQjtRQUMvQixnREFBZ0Q7UUFDaEQsOEJBQThCO1FBQzlCLHdCQUF3QjtRQUN4Qiw4Q0FBOEM7UUFFOUMsSUFBSTtRQUNKLHNCQUFzQjtRQUV0QixlQUFlO1FBQ2YsUUFBUSxLQUFLLEVBQUU7WUFDWCxLQUFLLFVBQVUsQ0FBQyxVQUFVO2dCQUN0QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDeEIsTUFBTTtZQUNWLEtBQUssVUFBVSxDQUFDLFdBQVc7Z0JBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLE1BQU07WUFDVixLQUFLLFVBQVUsQ0FBQyxTQUFTO2dCQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDdkIsdUNBQXVDO2dCQUN2QyxNQUFNO1lBQ1YsS0FBSyxVQUFVLENBQUMsV0FBVztnQkFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLGtCQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUM1QyxNQUFNO1lBQ1YsS0FBSyxVQUFVLENBQUMsZ0JBQWdCO2dCQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFHdkIsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUVNLG9DQUFnQixHQUF2QjtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixzRkFBc0Y7UUFDdEYsOEJBQThCO1FBQzlCLDRCQUE0QjtRQUM1QiwwRkFBMEY7UUFDMUYscUVBQXFFO1FBQ3JFLGtEQUFrRDtRQUNsRCxrQ0FBa0M7UUFDbEMsNkNBQTZDO1FBQzdDLGdGQUFnRjtRQUNoRixzQ0FBc0M7UUFDdEMsNEZBQTRGO1FBQzVGLHVCQUF1QjtRQUN2QixvRkFBb0Y7UUFDcEYsZ0JBQWdCO1FBQ2hCLFlBQVk7UUFDWixVQUFVO1FBQ1YseUNBQXlDO1FBQ3pDLCtFQUErRTtRQUMvRSxXQUFXO1FBQ1gsNEVBQTRFO1FBQzVFLHNCQUFzQjtRQUN0Qiw4Q0FBOEM7UUFDOUMsbUJBQW1CO1FBQ25CLDBDQUEwQztRQUMxQyxZQUFZO1FBQ1osNEJBQTRCO1FBQzVCLFNBQVM7UUFDVCxNQUFNO0lBQ1YsQ0FBQztJQUVNLDRCQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLDZCQUFTLEdBQWhCO1FBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSTtZQUFFLE9BQU87UUFDakYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxnQ0FBWSxHQUFuQjtRQUNJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxVQUFVLENBQUMsVUFBVSxFQUFFO1lBQ3JDLGdCQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDMUQ7YUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksVUFBVSxDQUFDLFdBQVcsRUFBRTtZQUM3QyxnQkFBTSxDQUFDLFNBQVMsQ0FBQyxnQkFBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzVEO2FBQU07WUFDSCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRU0sNkJBQVMsR0FBaEI7UUFDSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJO1lBQUUsT0FBTztRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFTSxxQ0FBaUIsR0FBeEI7UUFDSSxlQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBUSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsNkJBQVMsR0FBVDtRQUNJLGlCQUFNLFNBQVMsV0FBRSxDQUFDO1FBQ2xCLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUE3SGdCLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0E4SDdCO0lBQUQsZ0JBQUM7Q0E5SEQsQUE4SEMsQ0E5SHNDLGdCQUFNLEdBOEg1QztrQkE5SG9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3BpbmVQbGF5ZXJDdHJsIGZyb20gXCIuLi8uLi8uLi8uLi9CYXNlL0N1c3RvbUNvbXBvbmVudC9TcGluZVBsYXllckN0cmxcIjtcbmltcG9ydCBVSUJhc2UgZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvVUkvVUlCYXNlXCI7XG5pbXBvcnQgeyBTY2VuZSB9IGZyb20gXCIuLi8uLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5pbXBvcnQgeyBTdG9yYWdlTWdyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9TdG9yYWdlTWdyXCI7XG5pbXBvcnQgRXhjaGFuZ2UgZnJvbSBcIi4vRXhjaGFuZ2VcIjtcbmltcG9ydCBVSU1nciBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL1VJTWdyXCI7XG5pbXBvcnQgeyBVSUh1ZERlZiB9IGZyb20gXCIuLi8uLi8uLi9EYXRhL0ludGVyZmFjZS9VSURhdGFcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uLy4uLy4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCBFdmVudE1nciBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL0V2ZW50TWdyXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi8uLi9EYXRhL0NvbnN0L0V2ZW50XCI7XG5cbmV4cG9ydCBlbnVtIElDbG91ZERhdGEge1xuICAgIEp1bXBJc2xhbmQgPSAxLCAgLy/miZPlvIDmtbflsptcbiAgICBMZWF2ZUlzbGFuZCwgICAgIC8v5YWz6Zet5rW35bKbXG4gICAgT3BlbkhvdGVsLCAgICAgICAvL+aJk+W8gOmFkuW6l1xuICAgIFJvb21SZWZyZXNoLCAgICAgLy/phZLlupflrozmiJDop6PplIFcbiAgICBWaXNpdEZyaWVuZEhvdGVsXG59XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbG91ZFZpZXcgZXh0ZW5kcyBVSUJhc2Uge1xuXG4gICAgcHJpdmF0ZSBfc3BpbmVQbGF5ZXJDdHJsOiBTcGluZVBsYXllckN0cmw7XG4gICAgcHJpdmF0ZSBfZGF0YTogSUNsb3VkRGF0YSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfaGFzUGxheWVyOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfaGFzTG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgfVxuXG4gICAgb25Jbml0KHBhcmFtKSB7XG4gICAgICAgIGxldCBzcGluZVBsYXllckN0cmwgPSB0aGlzLl9zcGluZVBsYXllckN0cmwgPSB0aGlzLmdldENvbXBvbmVudChTcGluZVBsYXllckN0cmwpO1xuICAgICAgICBzcGluZVBsYXllckN0cmwuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHNwaW5lUGxheWVyQ3RybC5wYXVzZWQgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX2RhdGEgPSBwYXJhbTtcblxuICAgICAgICB0aGlzLnRpbWVQbGF5KCk7XG5cbiAgICAgICAgLy/lj6/ku6XlnKjkupHpga7mjKHnmoTml7blgJnliqDovb3otYTmupBcbiAgICAgICAgLy8gaWYgKHBhcmFtID09IElDbG91ZERhdGEuSnVtcElzbGFuZCkge1xuICAgICAgICAvLyAgICAgdGhpcy5wcmVsb2FkSXNsYW5kTWFwKCk7XG4gICAgICAgIC8vIH0gZWxzZSBpZiAocGFyYW0gPT0gSUNsb3VkRGF0YS5MZWF2ZUlzbGFuZCkge1xuICAgICAgICAvLyAgICAgdGhpcy5faGFzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgIHRoaXMucGxheUNsb3VkKCk7XG4gICAgICAgIC8vIH0gZWxzZSBpZiAocGFyYW0gPT0gSUNsb3VkRGF0YS5PcGVuSG90ZWwpIHtcblxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGVsc2UgaWYgKHBhcmFtID09IClcblxuICAgICAgICAvL+WPr+S7peWcqOS6kemBruaMoeeahOaXtuWAmeWKoOi9vei1hOa6kFxuICAgICAgICBzd2l0Y2ggKHBhcmFtKSB7XG4gICAgICAgICAgICBjYXNlIElDbG91ZERhdGEuSnVtcElzbGFuZDpcbiAgICAgICAgICAgICAgICB0aGlzLnByZWxvYWRJc2xhbmRNYXAoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgSUNsb3VkRGF0YS5MZWF2ZUlzbGFuZDpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUNsb3VkKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIElDbG91ZERhdGEuT3BlbkhvdGVsOlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhc0xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiSG90ZWxTY2VuZVwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgSUNsb3VkRGF0YS5Sb29tUmVmcmVzaDpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIEV2ZW50TWdyLmlucy5zZW5kKEV2ZW50LkhvdGVsLlJvb21GaW5pc2hlZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIElDbG91ZERhdGEuVmlzaXRGcmllbmRIb3RlbDpcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNMb2FkZWQgPSB0cnVlO1xuXG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBwcmVsb2FkSXNsYW5kTWFwKCkge1xuICAgICAgICB0aGlzLnBsYXlDbG91ZCgpO1xuICAgICAgICAvLyBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoU2NlbmUuTWFwLCBudWxsLCAoZXJyb3I6IEVycm9yLCBhc3NldDogY2MuU2NlbmVBc3NldCkgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy5faGFzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgIGxldCBidWlsZGluZ0FyciA9IFtdO1xuICAgICAgICAvLyAgICAgbGV0IGJ1aWxkaW5nU3RhdGUgPSBTdG9yYWdlTWdyLlN0b3JhZ2UuZ2V0T2JqZWN0KFN0b3JhZ2VNZ3IuU3RvcmFnZS5CdWlsZGluZ1N0YXRlKTtcbiAgICAgICAgLy8gICAgIGxldCBleGNoYW5nZXMgPSBhc3NldC5zY2VuZS5nZXRDb21wb25lbnRzSW5DaGlsZHJlbihFeGNoYW5nZSk7XG4gICAgICAgIC8vICAgICBleGNoYW5nZXMuZm9yRWFjaCgoZXhjaGFuZ2U6IEV4Y2hhbmdlKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgaWYgKGV4Y2hhbmdlLmVuYWJsZWQpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IGtleSA9IGV4Y2hhbmdlLmJ1aWxkaW5nSWQ7XG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCBzaW5nbGVCdWlsZFN0YXRlID0gYnVpbGRpbmdTdGF0ZSA/IGJ1aWxkaW5nU3RhdGVba2V5XSA6IG51bGw7XG4gICAgICAgIC8vICAgICAgICAgICAgIGlmIChzaW5nbGVCdWlsZFN0YXRlKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBidWlsZGluZ0Fyci5wdXNoKCdwcmVmYWIvbWFwLycgKyBleGNoYW5nZS5wYXRoICsgc2luZ2xlQnVpbGRTdGF0ZS5zdGF0ZSk7XG4gICAgICAgIC8vICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBidWlsZGluZ0Fyci5wdXNoKCdwcmVmYWIvbWFwLycgKyBleGNoYW5nZS5wYXRoICsgZXhjaGFuZ2Uuc3RhdGUpO1xuICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vICAgICAvLyBmb3IgKGxldCBpID0gMTsgaSA8PSAyNTsgaSsrKSB7XG4gICAgICAgIC8vICAgICAvLyAgICAgYnVpbGRpbmdBcnIucHVzaCgndGV4dHVyZS9tYXAvYmcvbWFwXycgKyAoaSA8IDEwID8gJzAnICsgaSA6IGkpKTtcbiAgICAgICAgLy8gICAgIC8vIH1cbiAgICAgICAgLy8gICAgIGNjLmxvYWRlci5sb2FkUmVzQXJyYXkoYnVpbGRpbmdBcnIsIG51bGwsIChlcnIsIHJlc291cmNlOiBhbnlbXSkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIC8vIGNvbnNvbGUud2Fybign6aKE5Yqg6L29bWFw6LWE5rqQ5a6M5q+VIScpO1xuICAgICAgICAvLyAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIuWKoOi9veWHuumUmVwiICsgZXJyKTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5wbGF5Q2xvdWQoKTtcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyB0aW1lUGxheSgpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5wbGF5Q2xvdWQsIDEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5Q2xvdWQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9oYXNQbGF5ZXIgfHwgIXRoaXMuX2hhc0xvYWRlZCB8fCB0aGlzLl9zcGluZVBsYXllckN0cmwgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9oYXNQbGF5ZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5wbGF5Q2xvdWQpO1xuICAgICAgICB0aGlzLmRvQmVmb3JlUGxheSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkb0JlZm9yZVBsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhID09IElDbG91ZERhdGEuSnVtcElzbGFuZCkge1xuICAgICAgICAgICAgQ29tbW9uLmp1bXBTY2VuZShTY2VuZS5NYXAsIHRoaXMuYmVnaW5QbGF5LmJpbmQodGhpcykpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2RhdGEgPT0gSUNsb3VkRGF0YS5MZWF2ZUlzbGFuZCkge1xuICAgICAgICAgICAgQ29tbW9uLmp1bXBTY2VuZShTY2VuZS5MZXZlbCwgdGhpcy5iZWdpblBsYXkuYmluZCh0aGlzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJlZ2luUGxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGJlZ2luUGxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NwaW5lUGxheWVyQ3RybCA9PSBudWxsKSByZXR1cm47XG4gICAgICAgIHRoaXMuX3NwaW5lUGxheWVyQ3RybC5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc3BpbmVQbGF5ZXJDdHJsLnBsYXkoXCJjbG91ZFwiLCAwLCBmYWxzZSwgdGhpcy5wbGF5Q2xvdWRDb21wbGV0ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlDbG91ZENvbXBsZXRlKCkge1xuICAgICAgICBVSU1nci5pbnMuY2xvc2VVSShVSUh1ZERlZi5DbG91ZFZpZXcsIHRydWUpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIub25EZXN0cm95KCk7XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJjbGVhclwiKTtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMucGxheUNsb3VkKTtcbiAgICAgICAgdGhpcy5fc3BpbmVQbGF5ZXJDdHJsID0gbnVsbDtcbiAgICAgICAgdGhpcy5faGFzUGxheWVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2hhc0xvYWRlZCA9IGZhbHNlO1xuICAgIH1cbn0iXX0=