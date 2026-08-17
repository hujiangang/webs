"use strict";
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