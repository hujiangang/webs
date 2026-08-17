import { GameState, NativeKey, Scene } from "../../Data/Const/Constant";
import M from "../../../Base/Manager/M";
import { Util } from "../../../Base/Utils/Util";
import { Event } from "../../Data/Const/Event";
import Common from "../Common";
import { UIHudDef } from "../../Data/Interface/UIData";
import { StorageMgr } from "../../../Base/Manager/StorageMgr";
import ReportMgr from "../../../Base/Manager/ReportMgr";
import GameModel from "../../Match3/Model/GameModel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SettingViewCtrl extends cc.Component {

    @property([cc.SpriteFrame])
    soundEffFrames: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    musicFrames: cc.SpriteFrame[] = [];

    @property(cc.Sprite)
    musicSprite: cc.Sprite = null;

    @property(cc.Sprite)
    soundEffSprite: cc.Sprite = null;

    private _isOpenPause: boolean = false;
    private _animation: cc.Animation = null;
    private _animationState: cc.AnimationState = null;

    private _opt: { eff: boolean, bgm: boolean } = null;

    onLoad() {
        this._animation = this.node.getComponent(cc.Animation);
        this._animationState = this.node.getComponent(cc.Animation).getAnimationState(this._animation.defaultClip.name);
    }

    start() {

    }

    public onRestartGame() {
        if (M.runtime.GameState <= GameState.Pause) {
            M.runtime.SelectLevel = M.runtime.CurLevel;
            this.onShowPause();
            M.event.send(Event.GameCMD.GameReset);
        }
    }

    public onExitGame() {
        M.ui.closeAllUI();
        const useStep = GameModel.ins.stepCount - GameModel.ins.stepLimit;
        ReportMgr.ins.reportMatchOver(M.runtime.CurLevel, false, useStep, M.runtime.MatchGameTime);

        M.runtime.SelectLevel = M.runtime.CurLevel;
        M.event.send(Event.GameCMD.GameReset);
    }

    public onMusicOpt() {
        this._opt.bgm = !this._opt.bgm
        this._changeMusicBtnState(this._opt.bgm);
    }

    public onSoundEffOpt() {
        this._opt.eff = !this._opt.eff
        this._changeEffBtnState(this._opt.eff);
    }

    public onShowPause() {
        if (Common.curScene == Scene.Match && M.runtime.GameState == GameState.preReady) {
            return;
        }
        this._initSoundOpt();
        // UIMgr.ins.showUI(UIHudDef.GamePause, { type: UIHudDef.GamePause }); 
        this._isOpenPause = !this._isOpenPause;
        if (!this._isOpenPause) {
            this._animationState.wrapMode = cc.WrapMode.Reverse;
        } else {
            this._animationState.wrapMode = cc.WrapMode.Normal;
        }
        this._animationState.play();
    }

    /**展示背包 */
    public onShowBag() {
        M.ui.showUI(UIHudDef.Bag);
    }

    private _initSoundOpt() {
        this._opt = <any>StorageMgr.Storage.getObject(NativeKey.Sound, { eff: false, bgm: true });
        this._changeMusicBtnState(this._opt.bgm);
        this._changeEffBtnState(this._opt.eff);
    }

    private _changeMusicBtnState(opt: boolean) {
        this.musicSprite.spriteFrame = this.musicFrames[opt ? 0 : 1];
        M.event.send(Event.Sound.UpdateOpt, 'bgm', opt);
    }

    private _changeEffBtnState(opt: boolean) {
        this.soundEffSprite.spriteFrame = this.soundEffFrames[opt ? 0 : 1];
        M.event.send(Event.Sound.UpdateOpt, 'eff', opt);
    }
}
