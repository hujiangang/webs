
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/AudioCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4ec03k12YxAbZFH3kjlD1Zo', 'AudioCtrl');
// Script/Logic/Common/AudioCtrl.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioID = void 0;
var EventMgr_1 = require("../../Base/Manager/EventMgr");
var Event_1 = require("../Data/Const/Event");
var Paths_1 = require("../../Base/Utils/Paths");
var Constant_1 = require("../Data/Const/Constant");
var StorageMgr_1 = require("../../Base/Manager/StorageMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AudioID;
(function (AudioID) {
    AudioID[AudioID["BGM1"] = 100] = "BGM1";
    AudioID[AudioID["Click1"] = 101] = "Click1";
    AudioID[AudioID["Elimate"] = 102] = "Elimate";
    AudioID[AudioID["BGM2"] = 103] = "BGM2";
    AudioID[AudioID["GameWin"] = 104] = "GameWin";
    AudioID[AudioID["GameFail"] = 105] = "GameFail";
    AudioID[AudioID["GameShowTarget"] = 106] = "GameShowTarget";
    AudioID[AudioID["Octopus"] = 107] = "Octopus";
    AudioID[AudioID["AddThree"] = 108] = "AddThree";
    AudioID[AudioID["Hammer"] = 109] = "Hammer";
    AudioID[AudioID["Reset"] = 110] = "Reset";
    AudioID[AudioID["OpenBox"] = 111] = "OpenBox";
    AudioID[AudioID["CellFall"] = 112] = "CellFall";
    AudioID[AudioID["Bomb"] = 113] = "Bomb";
    /** 结算获得星星 */ AudioID[AudioID["GetStar"] = 114] = "GetStar";
    /** 开始游戏按钮 */ AudioID[AudioID["StartGame"] = 115] = "StartGame";
    /** partyTime发射音效 */ AudioID[AudioID["partytime_shoot"] = 116] = "partytime_shoot";
    /** partyTime转换音效 */ AudioID[AudioID["partytime_change"] = 117] = "partytime_change";
    /** 合成爆炸cell */ AudioID[AudioID["merge_boom"] = 118] = "merge_boom";
})(AudioID = exports.AudioID || (exports.AudioID = {}));
var AudioCtrl = /** @class */ (function () {
    function AudioCtrl() {
        this._isPauseMusic = false;
        this._playingId = 0;
        this.opt = null;
        var soundNode = new cc.Node('sound');
        cc.game.addPersistRootNode(soundNode);
        this.registerEvent();
        this.opt = StorageMgr_1.StorageMgr.Storage.getObject(Constant_1.NativeKey.Sound, { eff: true, bgm: true });
        this.syncOpt2Native();
    }
    AudioCtrl_1 = AudioCtrl;
    Object.defineProperty(AudioCtrl, "ins", {
        get: function () {
            if (this.instance == null) {
                this.instance = new AudioCtrl_1();
            }
            return this.instance;
        },
        enumerable: false,
        configurable: true
    });
    AudioCtrl.prototype.registerEvent = function () {
        EventMgr_1.default.ins.register(Event_1.Event.Sound.PlaySoundEff, this.onPlayEff, this);
        EventMgr_1.default.ins.register(Event_1.Event.Sound.PlayBGM, this.onPlayBGM, this);
        EventMgr_1.default.ins.register(Event_1.Event.Sound.StopBGM, this.onStopBGM, this);
        EventMgr_1.default.ins.register(Event_1.Event.Sound.UpdateOpt, this.onUpdateOpt, this);
    };
    AudioCtrl.prototype.unRegisterEvent = function () {
        EventMgr_1.default.ins.unRegister(Event_1.Event.Sound.PlaySoundEff, this.onPlayEff, this);
        EventMgr_1.default.ins.unRegister(Event_1.Event.Sound.PlayBGM, this.onPlayBGM, this);
        EventMgr_1.default.ins.unRegister(Event_1.Event.Sound.StopBGM, this.onStopBGM, this);
        EventMgr_1.default.ins.unRegister(Event_1.Event.Sound.UpdateOpt, this.onUpdateOpt, this);
    };
    AudioCtrl.prototype.syncOpt2Native = function () {
        StorageMgr_1.StorageMgr.Storage.setObject(Constant_1.NativeKey.Sound, this.opt);
    };
    AudioCtrl.prototype.onUpdateOpt = function (type, opt) {
        this.opt[type] = opt;
        if (type == 'bgm' && !cc.audioEngine.isMusicPlaying() && this._playingId) {
            this.onPlayBGM();
        }
        this.syncOpt2Native();
    };
    AudioCtrl.prototype.onPlayEff = function (id) {
        this.opt.eff && this.play(id);
    };
    AudioCtrl.prototype.onPlayBGM = function (id) {
        if (id === void 0) { id = null; }
        if (this.opt.bgm) {
            if (this._isPauseMusic && (id == null || this._playingId == id)) {
                this.onResumeMusic();
            }
            else if (!cc.audioEngine.isMusicPlaying() || this._playingId != id) {
                if (this._playingId != id) {
                    this.onStopBGM();
                }
                this.play(id || AudioID.BGM1, true);
                this._playingId = id;
            }
        }
        else {
            this.onPauseBGM();
        }
    };
    AudioCtrl.prototype.onResumeMusic = function () {
        if (this._playingId) {
            this._isPauseMusic = false;
            cc.audioEngine.resumeMusic();
        }
    };
    AudioCtrl.prototype.onPauseBGM = function () {
        if (!this._isPauseMusic) {
            this._isPauseMusic = true;
            cc.audioEngine.pauseMusic();
        }
    };
    AudioCtrl.prototype.onStopBGM = function () {
        cc.audioEngine.stopAll();
    };
    AudioCtrl.prototype.getAudioPathById = function (id) {
        var name = null;
        switch (id) {
            case AudioID.BGM1:
                name = 'bgm1';
                break;
            case AudioID.BGM2:
                name = 'bgm2';
                break;
            case AudioID.Click1:
                name = 'click';
                break;
            case AudioID.GameWin:
                name = 'game_win';
                break;
            case AudioID.GameFail:
                name = 'game_fail';
                break;
            case AudioID.GameShowTarget:
                name = 'dlg_gamestart';
                break;
            case AudioID.Octopus:
                name = 'bomb_oct';
                break;
            case AudioID.AddThree:
                name = 'prop_add3';
                break;
            case AudioID.Hammer:
                name = 'prop_hammer';
                break;
            case AudioID.Reset:
                name = 'prop_reset';
                break;
            case AudioID.OpenBox:
                name = 'openbox';
                break;
            case AudioID.CellFall:
                name = 'cellfall';
                break;
            case AudioID.GetStar:
                name = 'getstar';
                break;
            case AudioID.Bomb:
                name = 'bomb_fish';
                break;
            // case AudioID.Elimate:
            //     name = 'elimate';
            //     break; 
            case AudioID.StartGame:
                name = "start_game";
                break;
            case AudioID.partytime_shoot:
                name = "partytime_shoot";
                break;
            case AudioID.partytime_change:
                name = "partytime_change";
                break;
            case AudioID.merge_boom:
                name = "merge_boom";
                break;
        }
        return name ? "" + Paths_1.default.SoundPath + name : null;
    };
    AudioCtrl.prototype.play = function (id, isloop, volume) {
        if (isloop === void 0) { isloop = false; }
        if (volume === void 0) { volume = 0.5; }
        var audioPath = this.getAudioPathById(id);
        if (!audioPath) {
            return;
        }
        cc.loader.loadRes(audioPath, cc.AudioClip, function (err, res) {
            if (err) {
                return;
            }
            if (id == AudioID.BGM1 || id == AudioID.BGM2) {
                if (cc.audioEngine.getMusicVolume() != volume) {
                    cc.audioEngine.setMusicVolume(volume);
                }
                cc.audioEngine.playMusic(res, isloop);
            }
            else {
                if (cc.audioEngine.getEffectsVolume() != volume) {
                    cc.audioEngine.setEffectsVolume(volume);
                }
                cc.audioEngine.playEffect(res, isloop);
            }
        });
    };
    var AudioCtrl_1;
    AudioCtrl = AudioCtrl_1 = __decorate([
        ccclass
    ], AudioCtrl);
    return AudioCtrl;
}());
exports.default = AudioCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxBdWRpb0N0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQW1EO0FBQ25ELDZDQUE0QztBQUM1QyxnREFBMkM7QUFDM0MsbURBQW1EO0FBQ25ELDREQUEyRDtBQUVyRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1QyxJQUFZLE9Bb0JYO0FBcEJELFdBQVksT0FBTztJQUNmLHVDQUFVLENBQUE7SUFDViwyQ0FBTSxDQUFBO0lBQ04sNkNBQU8sQ0FBQTtJQUNQLHVDQUFJLENBQUE7SUFDSiw2Q0FBTyxDQUFBO0lBQ1AsK0NBQVEsQ0FBQTtJQUNSLDJEQUFjLENBQUE7SUFDZCw2Q0FBTyxDQUFBO0lBQ1AsK0NBQVEsQ0FBQTtJQUNSLDJDQUFNLENBQUE7SUFDTix5Q0FBSyxDQUFBO0lBQ0wsNkNBQU8sQ0FBQTtJQUNQLCtDQUFRLENBQUE7SUFDUix1Q0FBSSxDQUFBO0lBQ0osYUFBYSxDQUFBLDZDQUFPLENBQUE7SUFDcEIsYUFBYSxDQUFBLGlEQUFTLENBQUE7SUFDdEIsb0JBQW9CLENBQUEsNkRBQWUsQ0FBQTtJQUNuQyxvQkFBb0IsQ0FBQSwrREFBZ0IsQ0FBQTtJQUNwQyxlQUFlLENBQUEsbURBQVUsQ0FBQTtBQUM3QixDQUFDLEVBcEJXLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQW9CbEI7QUFHRDtJQWdCSTtRQUxRLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGVBQVUsR0FBWSxDQUFDLENBQUM7UUFFeEIsUUFBRyxHQUFtQyxJQUFJLENBQUM7UUFHL0MsSUFBTSxTQUFTLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7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aUJBQ3pDO2dCQUNELEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUN6QztpQkFBTTtnQkFDSCxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxNQUFNLEVBQUU7b0JBQzdDLEVBQUUsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzNDO2dCQUNELEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUMxQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7SUEzS2dCLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0E0SzdCO0lBQUQsZ0JBQUM7Q0E1S0QsQUE0S0MsSUFBQTtrQkE1S29CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRNZ3IgZnJvbSBcIi4uLy4uL0Jhc2UvTWFuYWdlci9FdmVudE1nclwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IFBhdGhzIGZyb20gXCIuLi8uLi9CYXNlL1V0aWxzL1BhdGhzXCI7XG5pbXBvcnQgeyBOYXRpdmVLZXkgfSBmcm9tICcuLi9EYXRhL0NvbnN0L0NvbnN0YW50JztcbmltcG9ydCB7IFN0b3JhZ2VNZ3IgfSBmcm9tIFwiLi4vLi4vQmFzZS9NYW5hZ2VyL1N0b3JhZ2VNZ3JcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbmV4cG9ydCBlbnVtIEF1ZGlvSUQge1xuICAgIEJHTTEgPSAxMDAsXG4gICAgQ2xpY2sxLFxuICAgIEVsaW1hdGUsXG4gICAgQkdNMixcbiAgICBHYW1lV2luLFxuICAgIEdhbWVGYWlsLFxuICAgIEdhbWVTaG93VGFyZ2V0LFxuICAgIE9jdG9wdXMsXG4gICAgQWRkVGhyZWUsXG4gICAgSGFtbWVyLFxuICAgIFJlc2V0LFxuICAgIE9wZW5Cb3gsXG4gICAgQ2VsbEZhbGwsXG4gICAgQm9tYixcbiAgICAvKiog57uT566X6I635b6X5pif5pifICovR2V0U3RhcixcbiAgICAvKiog5byA5aeL5ri45oiP5oyJ6ZKuICovU3RhcnRHYW1lLFxuICAgIC8qKiBwYXJ0eVRpbWXlj5HlsITpn7PmlYggKi9wYXJ0eXRpbWVfc2hvb3QsXG4gICAgLyoqIHBhcnR5VGltZei9rOaNoumfs+aViCAqL3BhcnR5dGltZV9jaGFuZ2UsXG4gICAgLyoqIOWQiOaIkOeIhueCuGNlbGwgKi9tZXJnZV9ib29tXG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdWRpb0N0cmwge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEF1ZGlvQ3RybDtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGlucygpOiBBdWRpb0N0cmwge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IEF1ZGlvQ3RybCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lzUGF1c2VNdXNpYzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX3BsYXlpbmdJZDogQXVkaW9JRCA9IDA7XG5cbiAgICBwcml2YXRlIG9wdDogeyBlZmY6IGJvb2xlYW4sIGJnbTogYm9vbGVhbiB9ID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBjb25zdCBzb3VuZE5vZGUgPSBuZXcgY2MuTm9kZSgnc291bmQnKTtcbiAgICAgICAgY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUoc291bmROb2RlKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XG4gICAgICAgIHRoaXMub3B0ID0gPGFueT5TdG9yYWdlTWdyLlN0b3JhZ2UuZ2V0T2JqZWN0KE5hdGl2ZUtleS5Tb3VuZCwgeyBlZmY6IHRydWUsIGJnbTogdHJ1ZSB9KTtcbiAgICAgICAgdGhpcy5zeW5jT3B0Mk5hdGl2ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVnaXN0ZXJFdmVudCgpIHtcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnJlZ2lzdGVyKEV2ZW50LlNvdW5kLlBsYXlTb3VuZEVmZiwgdGhpcy5vblBsYXlFZmYsIHRoaXMpO1xuICAgICAgICBFdmVudE1nci5pbnMucmVnaXN0ZXIoRXZlbnQuU291bmQuUGxheUJHTSwgdGhpcy5vblBsYXlCR00sIHRoaXMpO1xuICAgICAgICBFdmVudE1nci5pbnMucmVnaXN0ZXIoRXZlbnQuU291bmQuU3RvcEJHTSwgdGhpcy5vblN0b3BCR00sIHRoaXMpO1xuICAgICAgICBFdmVudE1nci5pbnMucmVnaXN0ZXIoRXZlbnQuU291bmQuVXBkYXRlT3B0LCB0aGlzLm9uVXBkYXRlT3B0LCB0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdW5SZWdpc3RlckV2ZW50KCkge1xuICAgICAgICBFdmVudE1nci5pbnMudW5SZWdpc3RlcihFdmVudC5Tb3VuZC5QbGF5U291bmRFZmYsIHRoaXMub25QbGF5RWZmLCB0aGlzKTtcbiAgICAgICAgRXZlbnRNZ3IuaW5zLnVuUmVnaXN0ZXIoRXZlbnQuU291bmQuUGxheUJHTSwgdGhpcy5vblBsYXlCR00sIHRoaXMpO1xuICAgICAgICBFdmVudE1nci5pbnMudW5SZWdpc3RlcihFdmVudC5Tb3VuZC5TdG9wQkdNLCB0aGlzLm9uU3RvcEJHTSwgdGhpcyk7XG4gICAgICAgIEV2ZW50TWdyLmlucy51blJlZ2lzdGVyKEV2ZW50LlNvdW5kLlVwZGF0ZU9wdCwgdGhpcy5vblVwZGF0ZU9wdCwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzeW5jT3B0Mk5hdGl2ZSgpIHtcbiAgICAgICAgU3RvcmFnZU1nci5TdG9yYWdlLnNldE9iamVjdChOYXRpdmVLZXkuU291bmQsIHRoaXMub3B0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uVXBkYXRlT3B0KHR5cGUsIG9wdDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLm9wdFt0eXBlXSA9IG9wdDtcbiAgICAgICAgaWYgKHR5cGUgPT0gJ2JnbScgJiYgIWNjLmF1ZGlvRW5naW5lLmlzTXVzaWNQbGF5aW5nKCkgJiYgdGhpcy5fcGxheWluZ0lkKSB7XG4gICAgICAgICAgICB0aGlzLm9uUGxheUJHTSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3luY09wdDJOYXRpdmUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uUGxheUVmZihpZDogQXVkaW9JRCkge1xuICAgICAgICB0aGlzLm9wdC5lZmYgJiYgdGhpcy5wbGF5KGlkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uUGxheUJHTShpZDogQXVkaW9JRCA9IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0LmJnbSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzUGF1c2VNdXNpYyAmJiAoaWQgPT0gbnVsbCB8fCB0aGlzLl9wbGF5aW5nSWQgPT0gaWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblJlc3VtZU11c2ljKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFjYy5hdWRpb0VuZ2luZS5pc011c2ljUGxheWluZygpIHx8IHRoaXMuX3BsYXlpbmdJZCAhPSBpZCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wbGF5aW5nSWQgIT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblN0b3BCR00oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5KGlkIHx8IEF1ZGlvSUQuQkdNMSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWluZ0lkID0gaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uUGF1c2VCR00oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25SZXN1bWVNdXNpYygpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BsYXlpbmdJZCkge1xuICAgICAgICAgICAgdGhpcy5faXNQYXVzZU11c2ljID0gZmFsc2U7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWVNdXNpYygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblBhdXNlQkdNKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2lzUGF1c2VNdXNpYykge1xuICAgICAgICAgICAgdGhpcy5faXNQYXVzZU11c2ljID0gdHJ1ZTtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBhdXNlTXVzaWMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25TdG9wQkdNKCkge1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRBdWRpb1BhdGhCeUlkKGlkOiBBdWRpb0lEKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IG5hbWUgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKGlkKSB7XG4gICAgICAgICAgICBjYXNlIEF1ZGlvSUQuQkdNMTpcbiAgICAgICAgICAgICAgICBuYW1lID0gJ2JnbTEnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBdWRpb0lELkJHTTI6XG4gICAgICAgICAgICAgICAgbmFtZSA9ICdiZ20yJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQXVkaW9JRC5DbGljazE6XG4gICAgICAgICAgICAgICAgbmFtZSA9ICdjbGljayc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEF1ZGlvSUQuR2FtZVdpbjpcbiAgICAgICAgICAgICAgICBuYW1lID0gJ2dhbWVfd2luJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQXVkaW9JRC5HYW1lRmFpbDpcbiAgICAgICAgICAgICAgICBuYW1lID0gJ2dhbWVfZmFpbCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEF1ZGlvSUQuR2FtZVNob3dUYXJnZXQ6XG4gICAgICAgICAgICAgICAgbmFtZSA9ICdkbGdfZ2FtZXN0YXJ0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQXVkaW9JRC5PY3RvcHVzOlxuICAgICAgICAgICAgICAgIG5hbWUgPSAnYm9tYl9vY3QnXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEF1ZGlvSUQuQWRkVGhyZWU6XG4gICAgICAgICAgICAgICAgbmFtZSA9ICdwcm9wX2FkZDMnXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEF1ZGlvSUQuSGFtbWVyOlxuICAgICAgICAgICAgICAgIG5hbWUgPSAncHJvcF9oYW1tZXInXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEF1ZGlvSUQuUmVzZXQ6XG4gICAgICAgICAgICAgICAgbmFtZSA9ICdwcm9wX3Jlc2V0J1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBdWRpb0lELk9wZW5Cb3g6XG4gICAgICAgICAgICAgICAgbmFtZSA9ICdvcGVuYm94J1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBdWRpb0lELkNlbGxGYWxsOlxuICAgICAgICAgICAgICAgIG5hbWUgPSAnY2VsbGZhbGwnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBdWRpb0lELkdldFN0YXI6XG4gICAgICAgICAgICAgICAgbmFtZSA9ICdnZXRzdGFyJ1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBdWRpb0lELkJvbWI6XG4gICAgICAgICAgICAgICAgbmFtZSA9ICdib21iX2Zpc2gnXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBjYXNlIEF1ZGlvSUQuRWxpbWF0ZTpcbiAgICAgICAgICAgIC8vICAgICBuYW1lID0gJ2VsaW1hdGUnO1xuICAgICAgICAgICAgLy8gICAgIGJyZWFrOyBcbiAgICAgICAgICAgIGNhc2UgQXVkaW9JRC5TdGFydEdhbWU6XG4gICAgICAgICAgICAgICAgbmFtZSA9IFwic3RhcnRfZ2FtZVwiXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEF1ZGlvSUQucGFydHl0aW1lX3Nob290OlxuICAgICAgICAgICAgICAgIG5hbWUgPSBcInBhcnR5dGltZV9zaG9vdFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBdWRpb0lELnBhcnR5dGltZV9jaGFuZ2U6XG4gICAgICAgICAgICAgICAgbmFtZSA9IFwicGFydHl0aW1lX2NoYW5nZVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBdWRpb0lELm1lcmdlX2Jvb206XG4gICAgICAgICAgICAgICAgbmFtZSA9IFwibWVyZ2VfYm9vbVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYW1lID8gYCR7UGF0aHMuU291bmRQYXRofSR7bmFtZX1gIDogbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBsYXkoaWQ6IEF1ZGlvSUQsIGlzbG9vcDogYm9vbGVhbiA9IGZhbHNlLCB2b2x1bWU6IG51bWJlciA9IDAuNSkge1xuICAgICAgICBjb25zdCBhdWRpb1BhdGggPSB0aGlzLmdldEF1ZGlvUGF0aEJ5SWQoaWQpO1xuICAgICAgICBpZiAoIWF1ZGlvUGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKGF1ZGlvUGF0aCwgY2MuQXVkaW9DbGlwLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICBpZiAoaWQgPT0gQXVkaW9JRC5CR00xIHx8IGlkID09IEF1ZGlvSUQuQkdNMikge1xuICAgICAgICAgICAgICAgIGlmIChjYy5hdWRpb0VuZ2luZS5nZXRNdXNpY1ZvbHVtZSgpICE9IHZvbHVtZSkge1xuICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRNdXNpY1ZvbHVtZSh2b2x1bWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWMocmVzLCBpc2xvb3ApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoY2MuYXVkaW9FbmdpbmUuZ2V0RWZmZWN0c1ZvbHVtZSgpICE9IHZvbHVtZSkge1xuICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRFZmZlY3RzVm9sdW1lKHZvbHVtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QocmVzLCBpc2xvb3ApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=