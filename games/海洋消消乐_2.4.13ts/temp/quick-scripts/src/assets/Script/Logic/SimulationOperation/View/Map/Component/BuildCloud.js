"use strict";
cc._RF.push(module, '664b3LoSHhG2ZlVBqJNvOLf', 'BuildCloud');
// Script/Logic/SimulationOperation/View/Map/Component/BuildCloud.ts

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
var M_1 = require("../../../../../Base/Manager/M");
var MapIslandUtils_1 = require("../MapIslandUtils");
var Util_1 = require("../../../../../Base/Utils/Util");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 海岛装扮云的遮挡层
 */
var BuildCloud = /** @class */ (function (_super) {
    __extends(BuildCloud, _super);
    function BuildCloud() {
        // @property(cc.Integer)
        // beginId: number = -1;  //遮挡起始建筑id
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cloudId = -1; //遮挡结束建筑id
        _this.buildingIds = [];
        return _this;
        // onDestroy() {
        // cc.loader.releaseRes("texture/map/cloud/map_cloud_" + this.cloudId);
        // }
    }
    BuildCloud.prototype.onLoad = function () {
        var _this = this;
        if (this.buildingIds.length <= 0)
            return;
        // // var beginConfig = MapIslandUtils.getBuildConfigById(this.beginId);
        // // if (beginConfig) {
        // //     if (star >= beginConfig.starlv) {
        // //         console.error("隐藏");
        // //         this.node.active = false;
        // //     } else {
        // //         this.node.active = true;
        // //     }
        // // }
        var show = true;
        var star = M_1.default.runtime.getStarCount();
        for (var i = 0; i < this.buildingIds.length; ++i) {
            var iconfig = MapIslandUtils_1.default.getBuildConfigById(this.buildingIds[i]);
            if (iconfig && star >= iconfig.starlv) {
                show = false;
                break;
            }
        }
        this.node.active = show;
        if (show) {
            Util_1.Util.Loader.loadSpriteFrame("texture/map/cloud/map_cloud_" + this.cloudId, function (err, texture) {
                var Sprite = _this.node.getComponent(cc.Sprite);
                Sprite && (Sprite.spriteFrame = texture);
            });
        }
    };
    __decorate([
        property(cc.Integer)
    ], BuildCloud.prototype, "cloudId", void 0);
    __decorate([
        property([cc.Integer])
    ], BuildCloud.prototype, "buildingIds", void 0);
    BuildCloud = __decorate([
        ccclass
    ], BuildCloud);
    return BuildCloud;
}(cc.Component));
exports.default = BuildCloud;

cc._RF.pop();