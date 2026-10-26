import EventMgr from "../../Framework/Events/EventMgr";
import { Event } from "../Data/Const/Event";
import Paths from "../Config/Paths";
import { NativeKey } from '../Data/Const/Constant';
import { StorageMgr } from "../Data/StorageMgr";

const { ccclass } = cc._decorator;
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
    /** 合成爆炸cell */merge_boom,
    /** 旧连消提示音，保留资源和枚举兼容 */ComboPraise,
    ComboGreat,
    ComboAwesome,
    ComboFantastic,
    ComboBlossom
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
    private _playingId: AudioID = null;
    private _loadedMusicId: AudioID = null;
    private _musicAudioId: number = null;
    private _pendingMusicId: AudioID = null;
    private _musicRequest = 0;
    private _effectRequest = 0;
    private _praiseRequest = 0;
    private _praiseAudioId: number = null;
    private _active = true;

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
        this._active = false;
        this._effectRequest++;
        this.stopPraise();
        this.onStopBGM();
    }

    private syncOpt2Native() {
        StorageMgr.Storage.setObject(NativeKey.Sound, this.opt);
    }

    private onUpdateOpt(type, opt: boolean) {
        if (type !== 'bgm' && type !== 'eff') return;
        this.opt[type] = opt;
        if (type === 'bgm') {
            if (!opt) this.onPauseBGM();
            else if (this._playingId != null) this.onPlayBGM(this._playingId);
        } else if (!opt) {
            // A load requested before mute must not become audible after re-enabling effects.
            this._effectRequest++;
            this.stopPraise();
            cc.audioEngine.stopAllEffects();
        }
        this.syncOpt2Native();
    }

    private onPlayEff(id: AudioID) {
        if (!this._active || !this.opt.eff) return;
        const audioPath = this.getAudioPathById(id);
        if (!audioPath || id === AudioID.BGM1 || id === AudioID.BGM2) return;
        if (id === AudioID.ComboGreat || id === AudioID.ComboAwesome || id === AudioID.ComboFantastic || id === AudioID.ComboBlossom) {
            this.playPraise(audioPath);
            return;
        }
        const request = this._effectRequest;
        cc.loader.loadRes(audioPath, cc.AudioClip, (err, clip) => {
            if (err || !clip || !this._active || !this.opt.eff || request !== this._effectRequest) return;
            cc.audioEngine.setEffectsVolume(0.5);
            cc.audioEngine.playEffect(clip, false);
        });
    }

    /** Voice praise has one channel: the latest word replaces any playing or loading word. */
    private playPraise(audioPath:string) {
        this.stopPraise();
        const request=this._praiseRequest,effectRequest=this._effectRequest;
        cc.loader.loadRes(audioPath,cc.AudioClip,(err,clip)=>{
            if(err||!clip||!this._active||!this.opt.eff||request!==this._praiseRequest||effectRequest!==this._effectRequest)return;
            cc.audioEngine.setEffectsVolume(0.5);
            const audioId=cc.audioEngine.playEffect(clip,false);
            this._praiseAudioId=audioId!=null&&audioId>=0?audioId:null;
            if(this._praiseAudioId!=null)cc.audioEngine.setFinishCallback(audioId,()=>{
                if(request===this._praiseRequest&&this._praiseAudioId===audioId)this._praiseAudioId=null;
            });
        });
    }

    private stopPraise() {
        this._praiseRequest++;
        const audioId=this._praiseAudioId;
        this._praiseAudioId=null;
        if(audioId!=null)cc.audioEngine.stopEffect(audioId);
    }

    private onPlayBGM(id: AudioID = null) {
        if (!this._active) return;
        const next = id == null ? (this._playingId == null ? AudioID.BGM1 : this._playingId) : id;
        if (next !== AudioID.BGM1 && next !== AudioID.BGM2) return;
        if (this._playingId !== next) {
            this.stopMusicPlayback();
            this._playingId = next;
            this._effectRequest++;
            this.stopPraise();
        }
        // Remember the destination while muted so re-enabling plays the current scene's track.
        if (!this.opt.bgm) { this.onPauseBGM(); return; }
        if (this._pendingMusicId === next) return;
        if (this._loadedMusicId === next && this._musicAudioId != null) {
            if (this._isPauseMusic) {
                this._isPauseMusic = false;
                cc.audioEngine.resumeMusic();
                return;
            }
            if (cc.audioEngine.isMusicPlaying()) return;
        }
        const request = ++this._musicRequest;
        this._pendingMusicId = next;
        this._isPauseMusic = false;
        cc.loader.loadRes(this.getAudioPathById(next), cc.AudioClip, (err, clip) => {
            if (request !== this._musicRequest || !this._active || !this.opt.bgm || this._playingId !== next) return;
            this._pendingMusicId = null;
            if (err || !clip) return;
            cc.audioEngine.setMusicVolume(0.32);
            const audioId = cc.audioEngine.playMusic(clip, true);
            // The first engine playback may have ID 0; only null/negative means unavailable.
            this._musicAudioId = audioId != null && audioId >= 0 ? audioId : null;
            this._loadedMusicId = this._musicAudioId == null ? null : next;
        });
    }

    private onPauseBGM() {
        this._musicRequest++;
        this._pendingMusicId = null;
        this._isPauseMusic = this._musicAudioId != null;
        if (this._isPauseMusic) {
            cc.audioEngine.pauseMusic();
        }
    }

    private onStopBGM() {
        this._playingId = null;
        this.stopMusicPlayback();
    }

    private stopMusicPlayback() {
        this._musicRequest++;
        this._pendingMusicId = null;
        this._loadedMusicId = null;
        this._musicAudioId = null;
        this._isPauseMusic = false;
        cc.audioEngine.stopMusic();
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
            case AudioID.ComboPraise:
                name = "combo_praise";
                break;
            case AudioID.ComboGreat:
                name = "combo_great";
                break;
            case AudioID.ComboAwesome:
                name = "combo_awesome";
                break;
            case AudioID.ComboFantastic:
                name = "combo_fantastic";
                break;
            case AudioID.ComboBlossom:
                name = "combo_blossom";
                break;
        }
        return name ? `${Paths.SoundPath}${name}` : null;
    }

}
