"use strict";
cc._RF.push(module, '99d13k/ZZZGvrUqgkxgjQtO', 'LevelMarkItem');
// Script/Views/LevelMap/LevelMarkItem.ts

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
var UIMgr_1 = require("../../Base/Manager/UIMgr");
var UIData_1 = require("../../Logic/Data/Interface/UIData");
var RuntimeMgr_1 = require("../../Logic/Data/RuntimeMgr");
var M_1 = require("../../Base/Manager/M");
var Event_1 = require("../../Logic/Data/Const/Event");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelMarkItem = /** @class */ (function (_super) {
    __extends(LevelMarkItem, _super);
    function LevelMarkItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.LabelLevel = null;
        _this.SpBg = null;
        _this.StarNode = null;
        _this.stars = [];
        _this.SpState_complete = null;
        _this.SpState_disable = null;
        _this.SpState_open = null;
        return _this;
    }
    LevelMarkItem.prototype.updateData = function (levelNum) {
        this.curLevelNum = levelNum;
        this.LabelLevel.string = levelNum.toString();
        var curLevel = RuntimeMgr_1.default.ins.getMatch3Level();
        if (levelNum > curLevel) { //未解锁
            this.SpBg.spriteFrame = this.SpState_disable;
        }
        else if (levelNum == curLevel) { //正在当前关卡
            this.SpBg.spriteFrame = this.SpState_open;
            this.setStar(0);
        }
        else { //已通关
            this.SpBg.spriteFrame = this.SpState_complete;
            this.StarNode.active = true;
            var lvData = RuntimeMgr_1.default.ins.getNativeLvData(levelNum);
            this.setStar(lvData.score);
        }
    };
    LevelMarkItem.prototype.setStar = function (star) {
        for (var i = 1; i <= 3; ++i) {
            this.stars[i - 1].active = star >= i;
        }
    };
    LevelMarkItem.prototype.onClickLevel = function () {
        if (this.curLevelNum > RuntimeMgr_1.default.ins.getMatch3Level()) {
            return;
        }
        M_1.default.event.send(Event_1.Event.UI.HideSelectLevelView);
        UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.SelectShowTarget, { type: UIData_1.UIHudDef.SelectShowTarget, data: this.curLevelNum });
    };
    __decorate([
        property(cc.Label)
    ], LevelMarkItem.prototype, "LabelLevel", void 0);
    __decorate([
        property(cc.Sprite)
    ], LevelMarkItem.prototype, "SpBg", void 0);
    __decorate([
        property(cc.Node)
    ], LevelMarkItem.prototype, "StarNode", void 0);
    __decorate([
        property([cc.Node])
    ], LevelMarkItem.prototype, "stars", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], LevelMarkItem.prototype, "SpState_complete", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], LevelMarkItem.prototype, "SpState_disable", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], LevelMarkItem.prototype, "SpState_open", void 0);
    LevelMarkItem = __decorate([
        ccclass
    ], LevelMarkItem);
    return LevelMarkItem;
}(cc.Component));
exports.default = LevelMarkItem;

cc._RF.pop();