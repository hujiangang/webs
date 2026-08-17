"use strict";
cc._RF.push(module, 'e5d46FzdJpKuoZJKYplD7QH', 'ChapterItemCtrl');
// Script/Views/LevelMap/ChapterItemCtrl.ts

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
var Common_1 = require("../../Logic/Common/Common");
var Paths_1 = require("../../Base/Utils/Paths");
var M_1 = require("../../Base/Manager/M");
var EventMgr_1 = require("../../Base/Manager/EventMgr");
var Event_1 = require("../../Logic/Data/Const/Event");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ContentOffsetX = 120;
var ChapterItemCtrl = /** @class */ (function (_super) {
    __extends(ChapterItemCtrl, _super);
    function ChapterItemCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg = null;
        _this.islandParent = null;
        _this.content = null;
        _this.lvScope = null;
        _this.chapterName = null;
        _this.detailLab = null;
        _this.lockNode = null;
        _this.infoNode = null;
        _this._data = null;
        _this._isLocked = false;
        _this._clickCallBack = null;
        return _this;
    }
    ChapterItemCtrl.prototype.init = function (data, isLandScale, clickCallback) {
        if (isLandScale === void 0) { isLandScale = 1; }
        this.lockNode.active = false;
        if (data) {
            this._data = data;
            this.chapterName.string = data.name;
            this.detailLab.string = data.detail;
            this.islandParent.scale = isLandScale;
            this._clickCallBack = clickCallback;
            this.lockNode.scale = isLandScale;
            this.lvScope.string = data.minLv + "-" + data.maxLv + "\u5173";
            this.lockNode.active = this._isLocked = (M_1.default.runtime.getMatch3Level() < data.minLv);
            this._initIsland(data.resId);
        }
    };
    ChapterItemCtrl.prototype._onClick = function () {
        if (this._data && !this._isLocked) {
            this._clickCallBack && this._clickCallBack(this._data);
            // M.event.send(Event.UI.ShowSelectLevelView, this._data);
        }
    };
    ChapterItemCtrl.prototype._initIsland = function (resId) {
        var _this = this;
        Common_1.default.getRes(Paths_1.default.LevelMapPath + "island_" + resId, cc.Prefab).then(function (eff) {
            if (eff) {
                var island = M_1.default.nodePool.createItem(eff);
                island.parent = _this.islandParent;
                island.on(cc.Node.EventType.TOUCH_END, _this._onClick, _this);
                _this.infoNode.active = false;
                if (_this.islandParent.scale != 1) {
                    _this._setIslandOffset(Number(resId));
                }
                _this._showLock(island);
            }
            else {
                console.error('章节岛屿加载失败!');
            }
        });
    };
    ChapterItemCtrl.prototype._showLock = function (islandNode) {
        if (this._isLocked) {
            islandNode.getComponent(cc.Button).interactable = false;
            this.chapterName.getComponent(cc.LabelOutline).enabled = true;
        }
        else {
            islandNode.getComponent(cc.Button).interactable = true;
            this.chapterName.getComponent(cc.LabelOutline).enabled = false;
        }
    };
    ChapterItemCtrl.prototype._setIslandOffset = function (resId) {
        this.infoNode.active = true;
        if (resId % 2 == 0) {
            this.node.x += ContentOffsetX;
        }
        else {
            this.node.x += -ContentOffsetX;
        }
    };
    ChapterItemCtrl.prototype.doCloudUnlock = function () {
        var _this = this;
        this.lockNode.active = true;
        this.scheduleOnce(function () {
            var animation = _this.lockNode.getComponent(cc.Animation);
            animation.play();
            EventMgr_1.default.ins.send(Event_1.Event.UI.LevelSceneTouched, true);
        }, 1.5);
    };
    ChapterItemCtrl.prototype.onFinished = function () {
        console.error("播放解锁动画完毕");
        this.lockNode.active = false;
    };
    __decorate([
        property(cc.Sprite)
    ], ChapterItemCtrl.prototype, "bg", void 0);
    __decorate([
        property(cc.Node)
    ], ChapterItemCtrl.prototype, "islandParent", void 0);
    __decorate([
        property(cc.Node)
    ], ChapterItemCtrl.prototype, "content", void 0);
    __decorate([
        property(cc.Label)
    ], ChapterItemCtrl.prototype, "lvScope", void 0);
    __decorate([
        property(cc.Label)
    ], ChapterItemCtrl.prototype, "chapterName", void 0);
    __decorate([
        property(cc.Label)
    ], ChapterItemCtrl.prototype, "detailLab", void 0);
    __decorate([
        property(cc.Node)
    ], ChapterItemCtrl.prototype, "lockNode", void 0);
    __decorate([
        property(cc.Node)
    ], ChapterItemCtrl.prototype, "infoNode", void 0);
    ChapterItemCtrl = __decorate([
        ccclass
    ], ChapterItemCtrl);
    return ChapterItemCtrl;
}(cc.Component));
exports.default = ChapterItemCtrl;

cc._RF.pop();