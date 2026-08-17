"use strict";
cc._RF.push(module, 'b7437pZvS9EEJ35BYoXCOAy', 'ResCtrl');
// Script/Logic/Match3/ResCtrl.ts

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
var Constant_1 = require("../Data/Const/Constant");
var RuntimeMgr_1 = require("../Data/RuntimeMgr");
var Common_1 = require("../Common/Common");
var GameModel_1 = require("./Model/GameModel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ResCtrl = /** @class */ (function (_super) {
    __extends(ResCtrl, _super);
    function ResCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**炸弹背后闪烁的背景方框 */
        _this.BombFlashingBg = [];
        /**炸弹的单张图 */
        _this.BombStaticFrame = [];
        /**普通元素的图 */
        _this.NormalCellFrame = [];
        /**珍珠的单图 */
        _this.pearlFrame = null;
        /**森林地图的元素图 */
        _this.Map2NormalCellFrame = [];
        /**特殊元素的动画文件 */
        _this.CellPrefab = [];
        /**锁链的图 */
        _this.lockFrames = [];
        /**木箱的图 */
        _this.boxFrames = [];
        /**冰块的图 */
        _this.iceFrames = [];
        /**石头的图 */
        _this.stoneFrames = [];
        /**草地的图 */
        _this.LeaveFrames = [];
        /**可移动土地的等级图 */
        _this.GroundFrames = [];
        /**宝石的图 */
        _this.GemFrames = [];
        /**花花的图 */
        _this.FlowerFrames = [];
        /**萤火虫的图,后期可能会改成动画 */
        _this.FireflyFrames = [];
        /**收集物目标icon */
        _this.CollectIcon = [];
        /**复杂地块(可移动土地的包边图) */
        _this.groundPrefabs = [];
        /**移动土地中间的地块! */
        _this.groundCenter = null;
        /**移动土地中间的地块! */
        _this.tuituji = null;
        /**小火箭的图 */
        _this.rocketPrefab = null;
        /**蘑菇 */
        _this.mushroomFrames = [];
        return _this;
    }
    ResCtrl_1 = ResCtrl;
    ResCtrl.prototype.onLoad = function () {
        ResCtrl_1.ins = this;
    };
    ResCtrl.prototype.onDestroy = function () {
        ResCtrl_1.ins = null;
    };
    ResCtrl.prototype.getCellPrefab = function (index) {
        return this.CellPrefab[index];
    };
    ResCtrl.prototype.getBombBg = function (index) {
        return this.BombFlashingBg[index];
    };
    ResCtrl.prototype.getCellFrame = function (type, index) {
        var frames = this.NormalCellFrame;
        if (Common_1.default.isBombType(type)) {
            frames = this.BombStaticFrame;
        }
        var frame = frames[index];
        if (type == Constant_1.CellType.Flower && GameModel_1.default.ins.HaveFlowers) {
            frame = this.pearlFrame;
        }
        //应急
        if (type < Constant_1.CellType.Bomb1 && RuntimeMgr_1.default.ins.CurBgIndex == 2) {
            var bg2frame = this.Map2NormalCellFrame[index];
            if (bg2frame) {
                frame = bg2frame;
            }
        }
        return frame;
    };
    ResCtrl.prototype.getLockFrame = function (index) {
        return this.lockFrames[index];
    };
    ResCtrl.prototype.getBoxFrame = function (index, type) {
        if (type === void 0) { type = null; }
        var area = 0;
        if (type != null) {
            area = (type + 1) * 3;
        }
        return this.boxFrames[area + index];
    };
    ResCtrl.prototype.getIceFrame = function (index) {
        return this.iceFrames[index];
    };
    ResCtrl.prototype.getStoneFrame = function (index) {
        return this.stoneFrames[index];
    };
    ResCtrl.prototype.getLeavesFrame = function (index) {
        return this.LeaveFrames[index];
    };
    ResCtrl.prototype.getGroundFrame = function (index) {
        return this.GroundFrames[index];
    };
    ResCtrl.prototype.getFlowerFrame = function (index) {
        return this.FlowerFrames[index];
    };
    ResCtrl.prototype.getFirefly = function (index) {
        return this.FireflyFrames[index];
    };
    ResCtrl.prototype.getGemFrame = function (index) {
        return this.GemFrames[index];
    };
    ResCtrl.prototype.getCollectFrame = function (index) {
        return this.CollectIcon[index];
    };
    ResCtrl.prototype.getGroundBorderPrefab = function (index) {
        return this.groundPrefabs[index];
    };
    ResCtrl.prototype.getRoketPrefab = function () {
        return this.rocketPrefab;
    };
    ResCtrl.prototype.getMushroomFrame = function (index) {
        return this.mushroomFrames[index];
    };
    var ResCtrl_1;
    ResCtrl.ins = null;
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "BombFlashingBg", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "BombStaticFrame", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "NormalCellFrame", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ResCtrl.prototype, "pearlFrame", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "Map2NormalCellFrame", void 0);
    __decorate([
        property([cc.Prefab])
    ], ResCtrl.prototype, "CellPrefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "lockFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "boxFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "iceFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "stoneFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "LeaveFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "GroundFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "GemFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "FlowerFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "FireflyFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "CollectIcon", void 0);
    __decorate([
        property([cc.Prefab])
    ], ResCtrl.prototype, "groundPrefabs", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ResCtrl.prototype, "groundCenter", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], ResCtrl.prototype, "tuituji", void 0);
    __decorate([
        property(cc.Prefab)
    ], ResCtrl.prototype, "rocketPrefab", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ResCtrl.prototype, "mushroomFrames", void 0);
    ResCtrl = ResCtrl_1 = __decorate([
        ccclass
    ], ResCtrl);
    return ResCtrl;
}(cc.Component));
exports.default = ResCtrl;

cc._RF.pop();