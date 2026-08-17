"use strict";
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