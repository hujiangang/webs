"use strict";
cc._RF.push(module, 'd795dPvQlNJD47uiGgPm8kD', 'CollectItemCtrl');
// Script/Logic/Match3/View/UI/CollectItemCtrl.ts

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
var ResCtrl_1 = require("../../ResCtrl");
var M_1 = require("../../../../Base/Manager/M");
var GameModel_1 = require("../../Model/GameModel");
var Event_1 = require("../../../Data/Const/Event");
var CollectModel_1 = require("../../Model/CollectModel");
var Constant_1 = require("../../../Data/Const/Constant");
var Common_1 = require("../../../Common/Common");
var RuntimeMgr_1 = require("../../../Data/RuntimeMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CollectItemCtrl = /** @class */ (function (_super) {
    __extends(CollectItemCtrl, _super);
    function CollectItemCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = null;
        _this.icon = null;
        /**炸弹的单张图 */
        _this.BombStaticFrame = [];
        /**普通元素的图 */
        _this.NormalCellFrame = [];
        /**森林地图的元素图 */
        _this.Map2NormalCellFrame = [];
        /**收集物目标icon */
        _this.CollectIcon = [];
        _this._type = null;
        return _this;
    }
    CollectItemCtrl.prototype.onDestroy = function () {
        M_1.default.event.unRegister(Event_1.Event.UI.UpdateInfoPanel, this.onUpdateCollectCount, this);
    };
    CollectItemCtrl.prototype.init = function (type, count) {
        this._type = type;
        this.icon.spriteFrame = this.getIcon(type);
        var heithLimit = 60;
        if (this.node.name == 'showTargetPrefab') {
            heithLimit = 80;
        }
        this.icon.node.setScale(heithLimit / this.icon.node.height);
        this.count.string = "x" + count;
        M_1.default.event.register(Event_1.Event.UI.UpdateInfoPanel, this.onUpdateCollectCount, this);
    };
    CollectItemCtrl.prototype.changeLabelColor = function (color) {
        if (color === void 0) { color = null; }
        this.count.node.color = color || cc.color(255, 0, 0, 255);
    };
    CollectItemCtrl.prototype.onUpdateCollectCount = function (type) {
        if (type == this._type) {
            var c = GameModel_1.default.ins.getCollect();
            if (c) {
                this.count.string = "" + c.get(type + '');
            }
        }
    };
    CollectItemCtrl.prototype.getIcon = function (type) {
        var index = null;
        var result = null;
        switch (type) {
            case CollectModel_1.CollectType.box:
                index = 0;
                break;
            case CollectModel_1.CollectType.gnome:
                index = 1;
                break;
            case CollectModel_1.CollectType.turtles:
                index = 2;
                break;
            case CollectModel_1.CollectType.tree:
                index = 3;
                break;
            case CollectModel_1.CollectType.crab:
                index = 4;
                break;
            case CollectModel_1.CollectType.stone:
                index = 5;
                break;
            case CollectModel_1.CollectType.gem:
                index = 6;
                break;
            case CollectModel_1.CollectType.firefly:
                index = 7;
                break;
            case CollectModel_1.CollectType.colorbox:
                index = 8;
                break;
        }
        result = this._getRes(type, index);
        return result;
    };
    CollectItemCtrl.prototype._getRes = function (type, index) {
        var result = null;
        if (ResCtrl_1.default.ins) {
            if (index == null) {
                result = ResCtrl_1.default.ins.getCellFrame(type, type);
            }
            else {
                result = ResCtrl_1.default.ins.getCollectFrame(index);
            }
        }
        else {
            if (index == null) {
                result = this._getCellFrame(type, type);
            }
            else {
                result = this._getCollectFrame(index);
            }
        }
        return result;
    };
    CollectItemCtrl.prototype._getCellFrame = function (type, index) {
        var frames = this.NormalCellFrame;
        if (Common_1.default.isBombType(type)) {
            frames = this.BombStaticFrame;
        }
        var frame = frames[index];
        //应急
        if (type < Constant_1.CellType.Bomb1 && RuntimeMgr_1.default.ins.CurBgIndex == 2) {
            var bg2frame = this.Map2NormalCellFrame[index];
            if (bg2frame) {
                frame = bg2frame;
            }
        }
        return frame;
    };
    CollectItemCtrl.prototype._getCollectFrame = function (index) {
        return this.CollectIcon[index];
    };
    __decorate([
        property(cc.Label)
    ], CollectItemCtrl.prototype, "count", void 0);
    __decorate([
        property(cc.Sprite)
    ], CollectItemCtrl.prototype, "icon", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], CollectItemCtrl.prototype, "BombStaticFrame", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], CollectItemCtrl.prototype, "NormalCellFrame", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], CollectItemCtrl.prototype, "Map2NormalCellFrame", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], CollectItemCtrl.prototype, "CollectIcon", void 0);
    CollectItemCtrl = __decorate([
        ccclass
    ], CollectItemCtrl);
    return CollectItemCtrl;
}(cc.Component));
exports.default = CollectItemCtrl;

cc._RF.pop();