import EventMgr from "../../Base/Manager/EventMgr";
import { Event } from "../Data/Const/Event";
import Paths from "../../Base/Utils/Paths";
import { NativeKey } from '../Data/Const/Constant';
import { StorageMgr } from "../../Base/Manager/StorageMgr";

const { ccclass, property } = cc._decorator;
export enum AudioID {
    BGM1 = 100,
    Click1,
    Elimate,
    BGM2,
    GameWin,
    GameFail,
    GameShowTarget,
    Octopus,
    AddThree,
    Hammer,
    Reset,
    OpenBox,
    CellFall,
    Bomb,
    /** 结算获得星星 */GetStar,
    /** 开始游戏按钮 */StartGame,
    /** partyTime发射音效 */partytime_shoot,
    /** partyTime转换音效 */partytime_change,
    /** 合成爆炸cell */merge_boom
}

@ccclass
export default class AudioCtrl {

    private static instance: AudioCtrl;

    public static get ins(): AudioCtrl {
        if (this.instance == null) {
            this.instance = new AudioCtrl();
        }
        return this.instance;
    }

    private _isPauseMusic: boolean = false;
    private _playingId: AudioID = 0;

    private opt: { eff: boolean, bgm: boolean } = null;

    constructor() {
        const soundNode = new cc.Node('sound');
        cc.game.addPersistRootNode(soundNode);
        this.registerEvent();
        this.opt = <any>StorageMgr.Storage.getObject(NativeKey.Sound, { eff: true, bgm: true });
        this.syncOpt2Native();
    }

    private registerEvent() {
        EventMgr.ins.register(Event.Sound.PlaySoundEff, this.onPlayEff, this);
        EventMgr.ins.register(Event.Sound.PlayBGM, this.onPlayBGM, this);
        EventMgr.ins.register(Event.Sound.StopBGM, this.onStopBGM, this);
        EventMgr.ins.register(Event.Sound.UpdateOpt, this.onUpdateOpt, this);
    }

    public unRegisterEvent() {
        EventMgr.ins.unRegister(Event.Sound.PlaySoundEff, this.onPlayEff, this);
        EventMgr.ins.unRegister(Event.Sound.PlayBGM, this.onPlayBGM, this);
        EventMgr.ins.unRegister(Event.Sound.StopBGM, this.onStopBGM, this);
        EventMgr.ins.unRegister(Event.Sound.UpdateOpt, this.onUpdateOpt, this);
    }

    private syncOpt2Native() {
        StorageMgr.Storage.setObject(NativeKey.Sound, this.opt);
    }

    private onUpdateOpt(type, opt: boolean) {
        this.opt[type] = opt;
        if (type == 'bgm' && !cc.audioEngine.isMusicPlaying() && this._playingId) {
            this.onPlayBGM();
        }
        this.syncOpt2Native();
    }

    private onPlayEff(id: AudioID) {
        this.opt.eff && this.play(id);
    }

    private onPlayBGM(id: AudioID = null) {
        if (this.opt.bgm) {
            if (this._isPauseMusic && (id == null || this._playingId == id)) {
                this.onResumeMusic();
            } else if (!cc.audioEngine.isMusicPlaying() || this._playingId != id) {
                if (this._playingId != id) {
                    this.onStopBGM();
                }
                this.play(id || AudioID.BGM1, true);
                this._playingId = id;
            }
        } else {
            this.onPauseBGM();
        }
    }

    private onResumeMusic() {
        if (this._playingId) {
            this._isPauseMusic = false;
            cc.audioEngine.resumeMusic();
        }
    }

    private onPauseBGM() {
        if (!this._isPauseMusic) {
            this._isPauseMusic = true;
            cc.audioEngine.pauseMusic();
        }
    }

    private onStopBGM() {
        cc.audioEngine.stopAll();
    }

    private getAudioPathById(id: AudioID): string {
        let name = null;
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
                name = 'bomb_oct'
                break;
            case AudioID.AddThree:
                name = 'prop_add3'
                break;
            case AudioID.Hammer:
                name = 'prop_hammer'
                break;
            case AudioID.Reset:
                name = 'prop_reset'
                break;
            case AudioID.OpenBox:
                name = 'openbox'
                break;
            case AudioID.CellFall:
                name = 'cellfall';
                break;
            case AudioID.GetStar:
                name = 'getstar'
                break;
            case AudioID.Bomb:
                name = 'bomb_fish'
                break;
            // case AudioID.Elimate:
            //     name = 'elimate';
            //     break; 
            case AudioID.StartGame:
                name = "start_game"
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
        return name ? `${Paths.SoundPath}${name}` : null;
    }

    private play(id: AudioID, isloop: boolean = false, volume: number = 0.5) {
        const audioPath = this.getAudioPathById(id);
        if (!audioPath) {
            return;
        }
        cc.loader.loadRes(audioPath, cc.AudioClip, (err, res) => {
            if (err) { return; }
            if (id == AudioID.BGM1 || id == AudioID.BGM2) {
                if (cc.audioEngine.getMusicVolume() != volume) {
                    cc.audioEngine.setMusicVolume(volume);
                }
                cc.audioEngine.playMusic(res, isloop);
            } else {
                if (cc.audioEngine.getEffectsVolume() != volume) {
                    cc.audioEngine.setEffectsVolume(volume);
                }
                cc.audioEngine.playEffect(res, isloop);
            }
        });
    }
}
