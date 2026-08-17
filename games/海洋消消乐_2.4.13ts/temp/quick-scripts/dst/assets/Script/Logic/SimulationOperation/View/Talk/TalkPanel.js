
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/SimulationOperation/View/Talk/TalkPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcU2ltdWxhdGlvbk9wZXJhdGlvblxcVmlld1xcVGFsa1xcVGFsa1BhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBaUQ7QUFDakQscURBQWdEO0FBQ2hELHdEQUFtRDtBQUNuRCx5REFBMEQ7QUFDMUQsMENBQXFDO0FBRS9CLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLDJEQUEyRDtBQUMzRCxzSkFBc0o7QUFDdEosNkdBQTZHO0FBQzdHLHlEQUF5RDtBQUN6RCw4Q0FBOEM7QUFDOUMsNERBQTREO0FBQzVELDREQUE0RDtBQUU1RCxJQUFNLEdBQUcsR0FBRyx1R0FBdUcsQ0FBQztBQUdwSDtJQUErQiw2QkFBTTtJQUFyQztRQUFBLHFFQXVMQztRQXBMRyxVQUFJLEdBQWdCLElBQUksQ0FBQztRQUd6QixRQUFFLEdBQWMsSUFBSSxDQUFDO1FBR3JCLFVBQUksR0FBYyxJQUFJLENBQUM7UUFHdkIsY0FBUSxHQUFhLElBQUksQ0FBQztRQUcxQixXQUFLLEdBQWMsSUFBSSxDQUFDO1FBR3hCLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixZQUFNLEdBQVksSUFBSSxDQUFDO1FBRXZCLGdCQUFVLEdBQVcsSUFBSSxDQUFDO1FBQzFCLFlBQU0sR0FBVyxDQUFDLENBQUM7UUFFbkIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUV6QixnQkFBVSxHQUFXLGVBQWUsQ0FBQztRQUNyQyxvQkFBYyxHQUFXLG1CQUFtQixDQUFBO1FBRTVDLGFBQU8sR0FBc0IsSUFBSSxHQUFHLEVBQWdCLENBQUM7UUFDckQsV0FBSyxHQUE0QixJQUFJLEdBQUcsRUFBc0IsQ0FBQztRQUMvRCxjQUFRLEdBQXVCLElBQUksR0FBRyxFQUFp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QyxJQUFJLENBQUM7Z0RBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2Q0FDSztJQXhCZCxTQUFTO1FBRHJCLE9BQU87T0FDSyxTQUFTLENBdUxyQjtJQUFELGdCQUFDO0NBdkxELEFBdUxDLENBdkw4QixnQkFBTSxHQXVMcEM7QUF2TFksOEJBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2cgfSBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9VdGlscy9Mb2dcIjtcbmltcG9ydCBVSUJhc2UgZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvVUkvVUlCYXNlXCI7XG5pbXBvcnQgVUlNZ3IgZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvTWFuYWdlci9VSU1nclwiO1xuaW1wb3J0IHsgVUlIdWREZWYgfSBmcm9tIFwiLi4vLi4vLi4vRGF0YS9JbnRlcmZhY2UvVUlEYXRhXCI7XG5pbXBvcnQgSnVtcFV0aWxzIGZyb20gXCIuLi9KdW1wVXRpbHNcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuLy8gY29uc3QgQ0hJTkVTRV9SRUcgPSAvW1xcdTRFMDAtXFx1OUZGRlxcdTM0MDAtXFx1NERGRl0vZzsvL+S4reaWh1xuLy8gY29uc3QgSkFQQU5FU0VfUkVHID0gL1tcXHUzMDAwLVxcdTMwM0ZdfFtcXHUzMDQwLVxcdTMwOUZdfFtcXHUzMEEwLVxcdTMwRkZdfFtcXHVGRjAwLVxcdUZGRUZdfFtcXHU0RTAwLVxcdTlGQUZdfFtcXHUyNjA1LVxcdTI2MDZdfFtcXHUyMTkwLVxcdTIxOTVdfFxcdTIwM0IvZzsvL+aXpeaWh1xuLy8gY29uc3QgS09SRUFOX1JFRyA9IC9bXFx1MTEwMC1cXHUxMUZGXXxbXFx1MzEzMC1cXHUzMThGXXxbXFx1QTk2MC1cXHVBOTdGXXxbXFx1QUMwMC1cXHVEN0FGXXxbXFx1RDdCMC1cXHVEN0ZGXS9nOy8v6Z+p5paHXG4vLyBjb25zdCBFTkdMSVNIV09SRF9SRUcgPSAvW2Etel0rW1xcLVxcJ10/W2Etel0qL2lnOy8v6Iux5paH5Y2V6K+NXG4vLyBjb25zdCBTUEFDRV9SRUcgPSAvKF5cXHMrKXwoXFxzKyQpfFxccysvZzsvL+epuuagvFxuLy8gY29uc3QgU1lNQk9MX1JFRyA9IC9b77yM77yb44CC77yf77yBISwuOjsnfVxcXSVcXD8+44CB4oCY4oCc44CL77yf44CC77yM77yBXS9nOy8v5bi455So56ym5Y+3XG4vLyBjb25zdCBFTU9KSV9SRUcgPSAvW1xcdURGMDAtXFx1REZGRlxcdURDMDAtXFx1REU0Rl0vZzsvL2Vtb2ppXG5cbmNvbnN0IFJFRyA9IC9bXFx1NEUwMC1cXHU5RkZGXFx1MzQwMC1cXHU0REZGXXxbYS16XStbXFwtXFwnXT9bYS16XSp8KF5cXHMrKXwoXFxzKyQpfFxccyt8WyEsLjo7J31cXF0lXFw/PuOAgeKAmOKAnOOAi++8n+OAgu+8jO+8ge+8mu+8m118Li4uLi4uL2lnO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGNsYXNzIFRhbGtQYW5lbCBleHRlbmRzIFVJQmFzZSB7XG5cbiAgICBAcHJvcGVydHkoY2MuUmljaFRleHQpXG4gICAgdGV4dDogY2MuUmljaFRleHQgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBiZzogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgcm9sZTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICByb2xlTmFtZTogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBvdGhlcjogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBvdGhlck5hbWU6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRhbGtGcmFtZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBjaGF0dG86IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgY3VyU3RvcnlJZDogc3RyaW5nID0gbnVsbDtcbiAgICBjdXJJZHg6IG51bWJlciA9IDA7XG5cbiAgICBhdXRvTmV4dDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBjb25maWdQYXRoOiBzdHJpbmcgPSAnY29uZmlnL3N0b3J5Lyc7XG4gICAgYmFja2dyb3VuZFBhdGg6IHN0cmluZyA9ICd0ZXh0dXJlL3N0b3J5L2JnLydcblxuICAgIHJvbGVNYXA6IE1hcDxzdHJpbmcsIFJvbGU+ID0gbmV3IE1hcDxzdHJpbmcsIFJvbGU+KCk7XG4gICAgYmdNYXA6IE1hcDxzdHJpbmcsIEJhY2tncm91bmQ+ID0gbmV3IE1hcDxzdHJpbmcsIEJhY2tncm91bmQ+KCk7XG4gICAgc3RvcnlNYXA6IE1hcDxzdHJpbmcsIFN0b3J5PiA9IG5ldyBNYXA8c3RyaW5nLCBTdG9yeT4oKTtcblxuICAgIG9uVUlMb2FkKCkge1xuXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHRoaXMuY29uZmlnUGF0aCArICdyb2xlJywgY2MuSnNvbkFzc2V0LCAoZXJyOiBFcnJvciwgcmVzb3VyY2U6IGNjLkpzb25Bc3NldCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIExvZy5lcnJvcih0aGlzLmNvbmZpZ1BhdGggKyAncm9sZScgKyAn5Yqg6L295LiN5oiQ5YqfJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHJvbGVEYXRhID0gcmVzb3VyY2UuanNvbjtcbiAgICAgICAgICAgIGZvciAobGV0IHJpZCBpbiByb2xlRGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9sZU1hcC5zZXQocmlkLCByb2xlRGF0YVtyaWRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHRoaXMuY29uZmlnUGF0aCArICdiYWNrZ3JvdW5kJywgY2MuSnNvbkFzc2V0LCAoZXJyOiBFcnJvciwgcmVzb3VyY2U6IGNjLkpzb25Bc3NldCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKHRoaXMuY29uZmlnUGF0aCArICdiYWNrZ3JvdW5kJyArICfliqDovb3kuI3miJDlip8nKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgYmdEYXRhID0gcmVzb3VyY2UuanNvbjtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBiZ0lkIGluIGJnRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJnTWFwLnNldChiZ0lkLCBiZ0RhdGFbYmdJZF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyh0aGlzLmNvbmZpZ1BhdGggKyAnc3RvcnknLCBjYy5Kc29uQXNzZXQsIChlcnI6IEVycm9yLCByZXNvdXJjZTogY2MuSnNvbkFzc2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZy5lcnJvcih0aGlzLmNvbmZpZ1BhdGggKyAnc3RvcnknICsgJ+WKoOi9veS4jeaIkOWKnycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdG9yeURhdGEgPSByZXNvdXJjZS5qc29uO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpZCBpbiBzdG9yeURhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcnlNYXAuc2V0KGlkLCBzdG9yeURhdGFbaWRdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJTdG9yeUlkICE9IG51bGwpIHRoaXMuc2hvd05leHQoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvbkluaXQoc3RvcnlJZCkge1xuICAgICAgICB0aGlzLmN1clN0b3J5SWQgPSBzdG9yeUlkO1xuICAgICAgICB0aGlzLmN1cklkeCA9IDA7XG4gICAgfVxuXG4gICAgb25TaG93KCkge1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnNob3dOZXh0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5zaG93TmV4dCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd05leHQoKSB7XG4gICAgICAgIGxldCBzdG9yeSA9IHRoaXMuc3RvcnlNYXAuZ2V0KHRoaXMuY3VyU3RvcnlJZCk7XG4gICAgICAgIGlmICghc3RvcnkpIHJldHVybjtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBzdG9yeS5jb250ZW50O1xuICAgICAgICBpZiAoIWNvbnRlbnQgfHwgdGhpcy5jdXJJZHggPiBjb250ZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuc2hvd05leHQsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5yb2xlLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm90aGVyLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnRleHQuc3RyaW5nID0gJyc7XG4gICAgICAgICAgICB0aGlzLmJnLnNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMudGFsa0ZyYW1lLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgVUlNZ3IuaW5zLmhpZGVVSShVSUh1ZERlZi5UYWxrUGFuZWwsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc3RvcnkuanVtcC5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBKdW1wVXRpbHMuanVtcChzdG9yeS5qdW1wWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGFsa0ZyYW1lLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMuY3VySWR4ID09IGNvbnRlbnQubGVuZ3RoICYmIHN0b3J5Lmp1bXAubGVuZ3RoID4gMSkge1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jdXJJZHggIT0gMCkge1xuICAgICAgICAgICAgbGV0IHdvcmRzOiBzdHJpbmcgPSBjb250ZW50W3RoaXMuY3VySWR4IC0gMV0ud29yZHM7XG4gICAgICAgICAgICB0aGlzLnRleHQuc3RyaW5nID0gd29yZHM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5zZXROZXh0LCAwLjUpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXROZXh0KCkge1xuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuc3RvcnlNYXAuZ2V0KHRoaXMuY3VyU3RvcnlJZCkuY29udGVudFxuICAgICAgICBsZXQgbmV4dERhdGEgPSBjb250ZW50W3RoaXMuY3VySWR4XTtcbiAgICAgICAgdGhpcy5jdXJJZHgrKztcbiAgICAgICAgaWYgKCFuZXh0RGF0YSkge1xuICAgICAgICAgICAgdGhpcy5zaG93TmV4dCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJnSUQgPSBuZXh0RGF0YS5iZ0lEO1xuICAgICAgICBpZiAoYmdJRCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYmcubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXModGhpcy5iYWNrZ3JvdW5kUGF0aCArIHRoaXMuYmdNYXAuZ2V0KGJnSUQgKyAnJykudXJsLCBjYy5TcHJpdGVGcmFtZSwgKGVycjogRXJyb3IsIHJlc291cmNlOiBjYy5TcHJpdGVGcmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nLmVycm9yKHRoaXMuYmFja2dyb3VuZFBhdGggKyB0aGlzLmJnTWFwLmdldChiZ0lEICsgJycpLnVybCArICfliqDovb3kuI3miJDlip8nKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmJnLnNwcml0ZUZyYW1lID0gcmVzb3VyY2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5iZy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJvbGVJRCA9IG5leHREYXRhLnJvbGVJRDtcbiAgICAgICAgaWYgKHJvbGVJRCkge1xuICAgICAgICAgICAgaWYgKHJvbGVJRCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm90aGVyLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGF0dG8ueCA9IDQ5MDtcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGVOYW1lLnN0cmluZyA9ICdra2snO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLm90aGVyLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXR0by54ID0gLTQ5MDtcbiAgICAgICAgICAgICAgICB0aGlzLm90aGVyTmFtZS5zdHJpbmcgPSB0aGlzLnJvbGVNYXAuZ2V0KHJvbGVJRCArICcnKS5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yb2xlLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm90aGVyLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNoYXR0by54ID0gNDkwO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGltZ0lkeCA9IG5leHREYXRhLmZpZ3VyZUlEO1xuICAgICAgICBpZiAoaW1nSWR4ICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgd29yZHM6IHN0cmluZyA9IG5leHREYXRhLndvcmRzO1xuICAgICAgICB0aGlzLnNob3dXb3Jkcyh3b3Jkcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93V29yZHModGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGxldCB0ZXh0QXJyID0gdGV4dC5tYXRjaChSRUcpO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICB0aGlzLnRleHQuc3RyaW5nID0gJyc7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50ZXh0LnN0cmluZyArPSB0ZXh0QXJyW2luZGV4XTtcbiAgICAgICAgICAgIGluZGV4Kys7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA+PSB0ZXh0QXJyLmxlbmd0aCAmJiB0aGlzLmF1dG9OZXh0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5zaG93TmV4dCwgMC4yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMC4wNSwgdGV4dEFyci5sZW5ndGggLSAxKVxuICAgIH1cblxuXG59Il19