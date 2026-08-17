"use strict";
cc._RF.push(module, '58d92lSMeNGDqIKCG56jWt0', 'StoryTalkPanel');
// Script/Logic/Common/UI/StoryTalkPanel.ts

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
var UIBase_1 = require("../../../Base/UI/UIBase");
var UIMgr_1 = require("../../../Base/Manager/UIMgr");
var UIData_1 = require("../../Data/Interface/UIData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StoryTalkPanel = /** @class */ (function (_super) {
    __extends(StoryTalkPanel, _super);
    function StoryTalkPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.leftName = null;
        _this.rightName = null;
        _this.contentLab = null;
        _this.leftIcon = null;
        _this.rightIcon = null;
        _this.roleIcons = [];
        _this._currentIndex = 0;
        _this._storyData = null; //Array<{ rid: number, name: string, content: string }>
        return _this;
    }
    StoryTalkPanel.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
    };
    StoryTalkPanel.prototype.start = function () {
    };
    StoryTalkPanel.prototype.onShow = function (closeCallBack) {
        _super.prototype.onShow.call(this, closeCallBack);
    };
    StoryTalkPanel.prototype.onInit = function (storyData) {
        this._currentIndex = 0;
        this._storyData = storyData;
        this.showNext();
    };
    StoryTalkPanel.prototype.showNext = function () {
        if (this._storyData) {
            var sd = this._storyData.storys[this._currentIndex];
            if (sd) {
                this.contentLab.string = sd.content;
                if (sd.isLeft) {
                    this.showLeft(sd.rid, sd.name);
                }
                else {
                    this.showRight(sd.rid, sd.name);
                }
                this._currentIndex++;
            }
            else {
                UIMgr_1.default.ins.hideUI(UIData_1.UIHudDef.StoryTalkPanel);
            }
        }
    };
    StoryTalkPanel.prototype.showLeft = function (roleId, name) {
        this.leftIcon.node.active = true;
        this.leftName.node.parent.active = true;
        this.rightIcon.node.active = false;
        this.rightName.node.parent.active = false;
        this.leftName.string = name;
        this.leftIcon.spriteFrame = this.roleIcons[roleId];
    };
    StoryTalkPanel.prototype.showRight = function (roleId, name) {
        this.leftIcon.node.active = false;
        this.leftName.node.parent.active = false;
        this.rightIcon.node.active = true;
        this.rightName.node.parent.active = true;
        this.rightName.string = name;
        this.rightIcon.spriteFrame = this.roleIcons[roleId];
    };
    StoryTalkPanel.prototype.onContinueClick = function () {
        this.showNext();
    };
    __decorate([
        property(cc.Node)
    ], StoryTalkPanel.prototype, "panel", void 0);
    __decorate([
        property(cc.Label)
    ], StoryTalkPanel.prototype, "leftName", void 0);
    __decorate([
        property(cc.Label)
    ], StoryTalkPanel.prototype, "rightName", void 0);
    __decorate([
        property(cc.Label)
    ], StoryTalkPanel.prototype, "contentLab", void 0);
    __decorate([
        property(cc.Sprite)
    ], StoryTalkPanel.prototype, "leftIcon", void 0);
    __decorate([
        property(cc.Sprite)
    ], StoryTalkPanel.prototype, "rightIcon", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], StoryTalkPanel.prototype, "roleIcons", void 0);
    StoryTalkPanel = __decorate([
        ccclass
    ], StoryTalkPanel);
    return StoryTalkPanel;
}(UIBase_1.default));
exports.default = StoryTalkPanel;

cc._RF.pop();