"use strict";
cc._RF.push(module, 'ae3ff8/VF9IIqh4U9Hc8x6p', 'TalkPanel');
// Script/Logic/SimulationOperation/View/Talk/TalkPanel.ts

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
exports.TalkPanel = void 0;
var Log_1 = require("../../../../Base/Utils/Log");
var UIBase_1 = require("../../../../Base/UI/UIBase");
var UIMgr_1 = require("../../../../Base/Manager/UIMgr");
var UIData_1 = require("../../../Data/Interface/UIData");
var JumpUtils_1 = require("../JumpUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
// const CHINESE_REG = /[\u4E00-\u9FFF\u3400-\u4DFF]/g;//中文
// const JAPANESE_REG = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;//日文
// const KOREAN_REG = /[\u1100-\u11FF]|[\u3130-\u318F]|[\uA960-\uA97F]|[\uAC00-\uD7AF]|[\uD7B0-\uD7FF]/g;//韩文
// const ENGLISHWORD_REG = /[a-z]+[\-\']?[a-z]*/ig;//英文单词
// const SPACE_REG = /(^\s+)|(\s+$)|\s+/g;//空格
// const SYMBOL_REG = /[，；。？！!,.:;'}\]%\?>、‘“》？。，！]/g;//常用符号
// const EMOJI_REG = /[\uDF00-\uDFFF\uDC00-\uDE4F]/g;//emoji
var REG = /[\u4E00-\u9FFF\u3400-\u4DFF]|[a-z]+[\-\']?[a-z]*|(^\s+)|(\s+$)|\s+|[!,.:;'}\]%\?>、‘“》？。，！：；]|....../ig;
var TalkPanel = /** @class */ (function (_super) {
    __extends(TalkPanel, _super);
    function TalkPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = null;
        _this.bg = null;
        _this.role = null;
        _this.roleName = null;
        _this.other = null;
        _this.otherName = null;
        _this.talkFrame = null;
        _this.chatto = null;
        _this.curStoryId = null;
        _this.curIdx = 0;
        _this.autoNext = true;
        _this.configPath = 'config/story/';
        _this.backgroundPath = 'texture/story/bg/';
        _this.roleMap = new Map();
        _this.bgMap = new Map();
        _this.storyMap = new Map();
        return _this;
    }
    TalkPanel.prototype.onUILoad = function () {
        var _this = this;
        cc.loader.loadRes(this.configPath + 'role', cc.JsonAsset, function (err, resource) {
            if (err) {
                Log_1.Log.error(_this.configPath + 'role' + '加载不成功');
                return;
            }
            var roleData = resource.json;
            for (var rid in roleData) {
                _this.roleMap.set(rid, roleData[rid]);
            }
            cc.loader.loadRes(_this.configPath + 'background', cc.JsonAsset, function (err, resource) {
                if (err) {
                    Log_1.Log.error(_this.configPath + 'background' + '加载不成功');
                    return;
                }
                var bgData = resource.json;
                for (var bgId in bgData) {
                    _this.bgMap.set(bgId, bgData[bgId]);
                }
                cc.loader.loadRes(_this.configPath + 'story', cc.JsonAsset, function (err, resource) {
                    if (err) {
                        Log_1.Log.error(_this.configPath + 'story' + '加载不成功');
                        return;
                    }
                    var storyData = resource.json;
                    for (var id in storyData) {
                        _this.storyMap.set(id, storyData[id]);
                    }
                    if (_this.curStoryId != null)
                        _this.showNext();
                });
            });
        });
    };
    TalkPanel.prototype.onInit = function (storyId) {
        this.curStoryId = storyId;
        this.curIdx = 0;
    };
    TalkPanel.prototype.onShow = function () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.showNext, this);
        this.showNext();
    };
    TalkPanel.prototype.showNext = function () {
        var story = this.storyMap.get(this.curStoryId);
        if (!story)
            return;
        var content = story.content;
        if (!content || this.curIdx > content.length) {
            this.node.off(cc.Node.EventType.TOUCH_END, this.showNext, this);
            this.role.node.active = false;
            this.other.node.active = false;
            this.text.string = '';
            this.bg.spriteFrame = null;
            this.talkFrame.active = false;
            UIMgr_1.default.ins.hideUI(UIData_1.UIHudDef.TalkPanel, function () {
                if (story.jump.length == 1) {
                    JumpUtils_1.default.jump(story.jump[0]);
                }
            });
            return;
        }
        this.talkFrame.active = true;
        if (this.curIdx == content.length && story.jump.length > 1) {
        }
        if (this.curIdx != 0) {
            var words = content[this.curIdx - 1].words;
            this.text.string = words;
        }
        this.unscheduleAllCallbacks();
        this.scheduleOnce(this.setNext, 0.5);
    };
    TalkPanel.prototype.setNext = function () {
        var _this = this;
        var content = this.storyMap.get(this.curStoryId).content;
        var nextData = content[this.curIdx];
        this.curIdx++;
        if (!nextData) {
            this.showNext();
            return;
        }
        var bgID = nextData.bgID;
        if (bgID != undefined) {
            this.bg.node.active = true;
            cc.loader.loadRes(this.backgroundPath + this.bgMap.get(bgID + '').url, cc.SpriteFrame, function (err, resource) {
                if (err) {
                    Log_1.Log.error(_this.backgroundPath + _this.bgMap.get(bgID + '').url + '加载不成功');
                    return;
                }
                _this.bg.spriteFrame = resource;
            });
        }
        else {
            this.bg.node.active = false;
        }
        var roleID = nextData.roleID;
        if (roleID) {
            if (roleID == 1) {
                this.role.node.active = true;
                this.other.node.active = false;
                this.chatto.x = 490;
                this.roleName.string = 'kkk';
            }
            else {
                this.role.node.active = false;
                this.other.node.active = true;
                this.chatto.x = -490;
                this.otherName.string = this.roleMap.get(roleID + '').name;
            }
        }
        else {
            this.role.node.active = false;
            this.other.node.active = false;
            this.chatto.x = 490;
        }
        var imgIdx = nextData.figureID;
        if (imgIdx != undefined) {
        }
        var words = nextData.words;
        this.showWords(words);
    };
    TalkPanel.prototype.showWords = function (text) {
        var _this = this;
        var textArr = text.match(REG);
        var index = 0;
        this.text.string = '';
        this.schedule(function () {
            _this.text.string += textArr[index];
            index++;
            if (index >= textArr.length && _this.autoNext) {
                _this.scheduleOnce(_this.showNext, 0.2);
            }
        }, 0.05, textArr.length - 1);
    };
    __decorate([
        property(cc.RichText)
    ], TalkPanel.prototype, "text", void 0);
    __decorate([
        property(cc.Sprite)
    ], TalkPanel.prototype, "bg", void 0);
    __decorate([
        property(cc.Sprite)
    ], TalkPanel.prototype, "role", void 0);
    __decorate([
        property(cc.Label)
    ], TalkPanel.prototype, "roleName", void 0);
    __decorate([
        property(cc.Sprite)
    ], TalkPanel.prototype, "other", void 0);
    __decorate([
        property(cc.Label)
    ], TalkPanel.prototype, "otherName", void 0);
    __decorate([
        property(cc.Node)
    ], TalkPanel.prototype, "talkFrame", void 0);
    __decorate([
        property(cc.Node)
    ], TalkPanel.prototype, "chatto", void 0);
    TalkPanel = __decorate([
        ccclass
    ], TalkPanel);
    return TalkPanel;
}(UIBase_1.default));
exports.TalkPanel = TalkPanel;

cc._RF.pop();