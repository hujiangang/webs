
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/UI/StoryTalkPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxVSVxcU3RvcnlUYWxrUGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQTZDO0FBRTdDLHFEQUFnRDtBQUNoRCxzREFBdUQ7QUFFakQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEMsa0NBQU07SUFBbEQ7UUFBQSxxRUFtRkM7UUFoRkcsV0FBSyxHQUFZLElBQUksQ0FBQztRQUd0QixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsZ0JBQVUsR0FBYSxJQUFJLENBQUM7UUFHNUIsY0FBUSxHQUFjLElBQUksQ0FBQztRQUczQixlQUFTLEdBQWMsSUFBSSxDQUFDO1FBRzVCLGVBQVMsR0FBcUIsRUFBRSxDQUFDO1FBRXpCLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGdCQUFVLEdBQWlCLElBQUksQ0FBQyxDQUFDLHVEQUF1RDs7SUEyRHBHLENBQUM7SUF6REcsK0JBQU0sR0FBTjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCw4QkFBSyxHQUFMO0lBQ0EsQ0FBQztJQUVNLCtCQUFNLEdBQWIsVUFBYyxhQUF3QjtRQUNsQyxpQkFBTSxNQUFNLFlBQUMsYUFBYSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLCtCQUFNLEdBQWIsVUFBYyxTQUF1QjtRQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVPLGlDQUFRLEdBQWhCO1FBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQU0s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LyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVSUJhc2UgZnJvbSAnLi4vLi4vLi4vQmFzZS9VSS9VSUJhc2UnO1xuaW1wb3J0IENoYXB0ZXJTdG9yeSBmcm9tICcuLi8uLi8uLi9CYXNlL1RhYmxzL0NoYXB0ZXJTdG9yeSc7XG5pbXBvcnQgVUlNZ3IgZnJvbSAnLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL1VJTWdyJztcbmltcG9ydCB7IFVJSHVkRGVmIH0gZnJvbSAnLi4vLi4vRGF0YS9JbnRlcmZhY2UvVUlEYXRhJztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3J5VGFsa1BhbmVsIGV4dGVuZHMgVUlCYXNlIHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHBhbmVsOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsZWZ0TmFtZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHJpZ2h0TmFtZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGNvbnRlbnRMYWI6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgbGVmdEljb246IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHJpZ2h0SWNvbjogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIHJvbGVJY29uczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBfY3VycmVudEluZGV4OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3N0b3J5RGF0YTogQ2hhcHRlclN0b3J5ID0gbnVsbDsgLy9BcnJheTx7IHJpZDogbnVtYmVyLCBuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZyB9PlxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBzdXBlci5vbkxvYWQoKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TaG93KGNsb3NlQ2FsbEJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgICBzdXBlci5vblNob3coY2xvc2VDYWxsQmFjayk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uSW5pdChzdG9yeURhdGE6IENoYXB0ZXJTdG9yeSkge1xuICAgICAgICB0aGlzLl9jdXJyZW50SW5kZXggPSAwO1xuICAgICAgICB0aGlzLl9zdG9yeURhdGEgPSBzdG9yeURhdGE7XG4gICAgICAgIHRoaXMuc2hvd05leHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dOZXh0KCkge1xuICAgICAgICBpZiAodGhpcy5fc3RvcnlEYXRhKSB7XG4gICAgICAgICAgICBjb25zdCBzZCA9IHRoaXMuX3N0b3J5RGF0YS5zdG9yeXNbdGhpcy5fY3VycmVudEluZGV4XTtcbiAgICAgICAgICAgIGlmIChzZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudExhYi5zdHJpbmcgPSBzZC5jb250ZW50O1xuICAgICAgICAgICAgICAgIGlmIChzZC5pc0xlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TGVmdChzZC5yaWQsIHNkLm5hbWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JpZ2h0KHNkLnJpZCwgc2QubmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRJbmRleCsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBVSU1nci5pbnMuaGlkZVVJKFVJSHVkRGVmLlN0b3J5VGFsa1BhbmVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd0xlZnQocm9sZUlkOiBudW1iZXIsIG5hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmxlZnRJY29uLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sZWZ0TmFtZS5ub2RlLnBhcmVudC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJpZ2h0SWNvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJpZ2h0TmFtZS5ub2RlLnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmxlZnROYW1lLnN0cmluZyA9IG5hbWU7XG4gICAgICAgIHRoaXMubGVmdEljb24uc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVJY29uc1tyb2xlSWRdO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd1JpZ2h0KHJvbGVJZDogbnVtYmVyLCBuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5sZWZ0SWNvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxlZnROYW1lLm5vZGUucGFyZW50LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJpZ2h0SWNvbi5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmlnaHROYW1lLm5vZGUucGFyZW50LmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5yaWdodE5hbWUuc3RyaW5nID0gbmFtZTtcbiAgICAgICAgdGhpcy5yaWdodEljb24uc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVJY29uc1tyb2xlSWRdO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNvbnRpbnVlQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuc2hvd05leHQoKTtcbiAgICB9XG59XG4iXX0=