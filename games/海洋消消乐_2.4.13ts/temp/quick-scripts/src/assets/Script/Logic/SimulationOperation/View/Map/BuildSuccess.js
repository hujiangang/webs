"use strict";
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