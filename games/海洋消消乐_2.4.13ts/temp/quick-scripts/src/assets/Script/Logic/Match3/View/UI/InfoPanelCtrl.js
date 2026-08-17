"use strict";
cc._RF.push(module, '66365FI5kZETLe/pwz9l3ID', 'InfoPanelCtrl');
// Script/Logic/Match3/View/UI/InfoPanelCtrl.ts

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
var M_1 = require("../../../../Base/Manager/M");
var GameModel_1 = require("../../Model/GameModel");
var Event_1 = require("../../../Data/Const/Event");
var CollectItemCtrl_1 = require("./CollectItemCtrl");
var RuntimeMgr_1 = require("../../../Data/RuntimeMgr");
var EnergyModel_1 = require("../../Model/EnergyModel");
var Common_1 = require("../../../Common/Common");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var InfoPanelCtrl = /** @class */ (function (_super) {
    __extends(InfoPanelCtrl, _super);
    function InfoPanelCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stepLable = null;
        _this.currentLvLable = null;
        _this.scoreLable = null;
        _this.collectContent = null;
        _this.collectItemPrefab = null;
        _this.energyProgress = null;
        _this.colletctPool = null;
        _this.progress = 0;
        _this.max = 0;
        return _this;
    }
    InfoPanelCtrl.prototype.onLoad = function () {
        M_1.default.event.register(Event_1.Event.UI.UpdateInfoPanel, this.onUpdateInfo, this);
        M_1.default.event.register(Event_1.Event.GameCMD.EnergyStorage, this.updataEnergy, this);
    };
    InfoPanelCtrl.prototype.onDestroy = function () {
        M_1.default.event.unRegister(Event_1.Event.UI.UpdateInfoPanel, this.onUpdateInfo, this);
        M_1.default.event.unRegister(Event_1.Event.GameCMD.EnergyStorage, this.updataEnergy, this);
    };
    InfoPanelCtrl.prototype.init = function () {
        if (this.currentLvLable) {
            this.currentLvLable.string = "\u5173\u5361 : " + RuntimeMgr_1.default.ins.CurLevel;
        }
        this.onUpdateInfo();
        this.initCollectTarget();
        EnergyModel_1.EnergyModel.ins.setCurLevel();
    };
    InfoPanelCtrl.prototype.onUpdateInfo = function () {
        this.stepLable.string = "" + GameModel_1.default.ins.stepLimit;
        if (Number(this.scoreLable.string) != RuntimeMgr_1.default.ins.currentScore) {
            this.scoreLable.string = "" + RuntimeMgr_1.default.ins.currentScore;
            this.scoreLable.getComponent(cc.Animation).play('scoreJump');
        }
    };
    InfoPanelCtrl.prototype.initCollectTarget = function () {
        var _this = this;
        var cs = GameModel_1.default.ins.getCollect();
        this.colletctPool = new Map();
        if (cs) {
            this.collectContent.width = [158, 208, 258][cs.size - 1];
            if (cs.size > 1) {
                // this.collectContent.x += 25 * (cs.size - 1);
            }
            this.collectContent.destroyAllChildren();
            cs.forEach(function (collect, key) {
                var item = M_1.default.nodePool.createItem(_this.collectItemPrefab);
                var itemCtrl = item.getComponent(CollectItemCtrl_1.default);
                itemCtrl.init(key, collect);
                item.parent = _this.collectContent;
                _this.colletctPool.set(key, item);
            });
        }
    };
    //获取关卡文字的世界坐标
    InfoPanelCtrl.prototype.getLevelLabPos = function () {
        var pos = Common_1.default.getWorldPos(this.currentLvLable.node);
        return pos;
    };
    //获得步数坐标
    InfoPanelCtrl.prototype.getStepPos = function () {
        return Common_1.default.getWorldPos(this.stepLable.node);
    };
    //获取收集物的UI坐标
    InfoPanelCtrl.prototype.getCollectPos = function (type) {
        var pos = cc.v2(0, 0);
        var cNode = this.colletctPool.get(type + '');
        if (cNode) {
            // const rect = cNode.getBoundingBoxToWorld()
            // pos = cc.v2(rect.x, rect.y);
            pos = Common_1.default.getWorldPos(cNode);
        }
        return pos;
    };
    InfoPanelCtrl.prototype.updataEnergy = function (progress, max) {
        this.progress = progress;
        this.max = max;
    };
    InfoPanelCtrl.prototype.update = function () {
        if (this.max) {
            var progress = Math.floor(this.energyProgress.progress * this.max);
            if (progress < this.progress) {
                progress++;
            }
            else if (progress == this.progress && progress == this.max) {
                progress = 0;
                this.progress = 0;
            }
            else if (progress >= this.progress) {
                progress = this.progress;
            }
            this.energyProgress.progress = progress / this.max;
        }
    };
    __decorate([
        property(cc.Label)
    ], InfoPanelCtrl.prototype, "stepLable", void 0);
    __decorate([
        property(cc.Label)
    ], InfoPanelCtrl.prototype, "currentLvLable", void 0);
    __decorate([
        property(cc.Label)
    ], InfoPanelCtrl.prototype, "scoreLable", void 0);
    __decorate([
        property(cc.Node)
    ], InfoPanelCtrl.prototype, "collectContent", void 0);
    __decorate([
        property(cc.Prefab)
    ], InfoPanelCtrl.prototype, "collectItemPrefab", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], InfoPanelCtrl.prototype, "energyProgress", void 0);
    InfoPanelCtrl = __decorate([
        ccclass
    ], InfoPanelCtrl);
    return InfoPanelCtrl;
}(cc.Component));
exports.default = InfoPanelCtrl;

cc._RF.pop();