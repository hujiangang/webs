import M from "../../../Base/Manager/M";
import UIBase from "../../../Base/UI/UIBase";
import UIMgr from "../../../Base/Manager/UIMgr";
import { UIHudDef } from "../../Data/Interface/UIData";
import CollectItemCtrl from "../../Match3/View/UI/CollectItemCtrl";
import { Event } from "../../Data/Const/Event";
import { Collect } from "../../Data/Interface/Level/ILevel";
import { Util } from "../../../Base/Utils/Util";
import { NativeKey, Scene, PowerConfig, WaringTips, SceneTaskKey } from '../../Data/Const/Constant';
import SlideButton from '../../../Base/CustomComponent/SlideButton';
import RuntimeMgr from '../../Data/RuntimeMgr';
import Common from "../Common";
import EventMgr from "../../../Base/Manager/EventMgr";
import { CurrencyId } from "../../../Base/BaseConst";
import SelectPropCtrl from "../../Match3/View/UI/SelectPropCtrl";
import { StorageMgr } from "../../../Base/Manager/StorageMgr";
import { GuideUtils } from "../../../../GodGuide/GuideUtils";
import ShareMgr from "../../../Base/Manager/ShareMgr";
import { AudioID } from "../AudioCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DialogPanel extends UIBase {

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Prefab)
    collectPrefab: cc.Prefab = null;

    @property([cc.SpriteFrame])
    frames: cc.SpriteFrame[] = [];


    private curData: { type: any, data: any } = null;

    private _animation: cc.Animation = null;

    onLoad() {
        super.onLoad();
        this.initEvent();
        this.initAnimation();
    }

    onDestroy() {
        this.node.stopAllActions();
        this.unscheduleAllCallbacks();
        this.removeEvent();

    }

    private initEvent() {
        M.event.register(Event.UI.ChangeScene, this.onSceneChanged, this);
    }

    private removeEvent() {
        M.event.unRegister(Event.UI.ChangeScene, this.onSceneChanged, this);
    }

    private _clearDisplay() {
        if (this.curData && this.curData.type == UIHudDef.SelectShowTarget) {
            this.node.getChildByName('lab_lv').getComponent(cc.Label).string = '';
        }
    }

    public onInit(params: { type: any, data: any }) {
        if (params) {
            this.curData = params;
            switch (params.type) {
                case UIHudDef.GameOverWin:
                    EventMgr.ins.send(Event.Sound.PlaySoundEff, AudioID.GameWin);
                    this.fillGameWinData();
                    break;
                case UIHudDef.SelectShowTarget:
                    this.fillShowSelectTargetData(params.data);
                    this.node.getChildByName('propContent').getComponent(SelectPropCtrl).init();
                    break;
                case UIHudDef.GameShowTarget:
                    EventMgr.ins.send(Event.Sound.PlaySoundEff, AudioID.GameShowTarget);
                    this.fillShowTargetData();
                    this.initShowTargetContent(params.data.collect);
                    break;
                case UIHudDef.GameOverFail:
                    EventMgr.ins.send(Event.Sound.PlaySoundEff, AudioID.GameFail);
                    this.fillGameFailData();
                    this.initShowTargetContent(params.data);
                    break;
                case UIHudDef.GamePause:
                    this.initSoundOpt();
                    break;
            }
        }
    }

    public onHide() {
        super.onHide();
        this._animation && this._animation.stop();
        this._clearDisplay();
    }

    public onShow(closeCallBack?: Function) {
        super.onShow(closeCallBack);
        this.initAnimation();
        this.playAnimation();
    }

    public onUILoad() {

    }

    public onStartGame() {
        UIMgr.ins.hideUI(UIHudDef.MenuPanel)
        this.hide();
        M.event.send(Event.Sound.PlaySoundEff, AudioID.StartGame);

        if (Common.curScene == Scene.Match) {
            M.event.send(Event.GameCMD.GameReset);
        } else {
            UIMgr.ins.showUI(UIHudDef.GameLoading, null, () => {
                cc.director.preloadScene(Scene.Match, (completedCount: number, totalCount: number, item: any) => {
                    EventMgr.ins.send(Event.UI.UpdateTmpLoadingProgress, Math.ceil((completedCount / totalCount) * 50));
                }, () => {
                    M.runtime.SelectLevel = 0;
                    Common.jumpScene(Scene.Match);

                    //进入关卡，设置每个指定id的关卡的失败步数为0
                    StorageMgr.Storage.setInt(NativeKey.LevelFailTag, 0);
                });
            });
        }
    }

    public onGameOverClose() {
        if (this.curData && this.curData.type == UIHudDef.GameOverWin) {
            this.onGameOverNext();
        } else {
            this.onGameOverRestart();
        }
    }

    public onGameOverRestart() {
        const currentType = this.curData && this.curData.type;
        M.runtime.SelectLevel = M.runtime.CurLevel;
        currentType != null ? UIMgr.ins.hideUI(currentType, this.resetMatch3Scene.bind(this)) : this.resetMatch3Scene();
    }

    public onGameOverNext() {
        // console.error("GudieUtis", GuideUtils.curGuideId);
        if (GuideUtils.curGuideId != -1) return;
        let curLevel = M.runtime.CurLevel;
        GuideUtils.onMatch3Next(curLevel);
        M.runtime.SelectLevel = 0;
        const currentType = this.curData && this.curData.type;
        currentType != null ? UIMgr.ins.hideUI(currentType, this.resetMatch3Scene.bind(this)) : this.resetMatch3Scene();


        // if (M.runtime.isPowerEnough()) {
        //     M.runtime.addCurrency(CurrencyId.Power, -PowerConfig.LvConsumption);
        //     UIMgr.ins.hideUI(this.curData.type);
        //     M.event.send(Event.UI.ChangeScene);
        //     this.resetMatch3Scene();
        // } else {
        //     M.tips.show(WaringTips.PowerNotEnough);
        // }
    }

    //关卡分享
    public onGameShare() {
        const level = M.runtime.CurLevel;
        let shareConfig = ShareMgr.ins.getConfig(level, "level");
        if (shareConfig) {
            const bottom = this.node.getChildByName('bottom');
            if (bottom) {
                let ButtonShare = bottom.getChildByName("ButtonShare")
                ButtonShare && ShareMgr.ins.doShareLevel(level, () => {
                    ButtonShare && (ButtonShare.active = false);
                });
            }
        }
    }

    public onShowGameTargetOver() {
        UIMgr.ins.hideUI(UIHudDef.GameShowTarget);
    }

    public onBgmOptChanged(opt: boolean) {
        console.error('onBgmOptChanged:', opt);
        M.event.send(Event.Sound.UpdateOpt, 'bgm', opt);
    }

    public resetMatch3Scene() {
        M.event.send(Event.GameCMD.GameReset);
    }

    public onEffSoundOptChanged(opt: boolean) {
        console.error('onEffSoundOptChanged:', opt);
        M.event.send(Event.Sound.UpdateOpt, 'eff', opt);
    }

    private onSceneChanged() {
        this.hide();
        this.unscheduleAllCallbacks();
        this.node.stopAllActions();
    }

    private initAnimation() {
        if (!this._animation) {
            this._animation = this.getComponent(cc.Animation);
            if (this._animation) {
                this._animation.stop();
                this._animation.on('stop', <any>this.onAnimationStop, this);
            }
        }
    }

    private initSoundOpt() {
        const opt = StorageMgr.Storage.getObject(NativeKey.Sound, { eff: false, bgm: true });
        const bgmBtn = this.node.getChildByName('bgm').getComponent(SlideButton);
        const effBtn = this.node.getChildByName('eff').getComponent(SlideButton);
        bgmBtn.onChange(null, opt['bgm']);
        effBtn.onChange(null, opt['eff']);
    }

    public onAnimationFrameEvent() {
        //console.error('play get start sound : ', Date.now());
        EventMgr.ins.send(Event.Sound.PlaySoundEff, AudioID.GetStar);
    }

    private onAnimationStop(eventName: string, aniState: cc.AnimationState) {
        switch (aniState.name) {
            case 'gameWin':
                this._animation.play(`star${this.curData.data || 0}`);
                break;
            case 'overShow':
                this.scheduleOnce(this.hide.bind(this), 0.3);
                break;

        }
    }

    private hide() {
        UIMgr.ins.hideUI(this.curData.type);
        this.unscheduleAllCallbacks();
    }

    private goMainScene() {
        M.runtime.SelectLevel = 0;
        this.resetMatch3Scene();
    }


    private playAnimation() {
        this._animation && this._animation.play();
    }

    private fillShowSelectTargetData(lv: number) {
        GuideUtils.onMatch3SelectShowTarget(lv);

        M.runtime.SelectLevel = lv = lv || M.runtime.getMatch3Level();
        this.setLv(this.node.getChildByName('lab_lv'), lv, '');


        const lvData = RuntimeMgr.ins.getNativeLvData(lv);
        const parent = this.node.getChildByName('starContent');
        for (var i = 1; i <= 3; ++i) {
            parent.getChildByName(i.toString()).active = lvData.star >= i;
        }
        //init tips!
    }

    private fillShowTargetData() {
        const cfg = M.table.Titles.getByPrimaryKey(M.runtime.CurLevel);
        if (cfg && cfg.showTargetContent) {
            cc.find('kunag/di/title', this.node).getComponent(cc.Label).string = cfg.showTargetContent;
        }
        // this.setLv(this.node.getChildByName('lab_lv'));
        this.unscheduleAllCallbacks();
        this.scheduleOnce(this.hide.bind(this), 2);
    }

    private fillGameFailData() {
        this.runContinueAction();
        this.setLv2(this.node.getChildByName('lab_lv'));
        GuideUtils.onMatch3Over(M.runtime.CurLevel, false);
    }

    private fillGameWinData() {
        const score = this.node.getChildByName('lab_score').getComponent(cc.Label);
        const bestScore = this.node.getChildByName('lab_best').getComponent(cc.Label);
        const curLevel = M.runtime.CurLevel;
        this.runContinueAction();
        this.setLv2(this.node.getChildByName('lab_lv'));

        const data = M.runtime.getNativeLvData();
        score.string = M.runtime.currentScore + '';
        bestScore.string = (data.score || M.runtime.currentScore) + '';

        const configInfo = M.table.LevelUpReward.getByPrimaryKey(curLevel);
        if (configInfo && configInfo.rewards) {
            this.content.removeAllChildren();
            configInfo.rewards.forEach(item => {
                let count: any = item.count;
                if (item.type == CurrencyId.Coin) {
                    count = Common.bytesToSize(count);
                }
                const node = M.nodePool.createItem(this.collectPrefab);
                node.parent = this.content;
                node.getComponent(cc.Sprite).spriteFrame = this.frames[item.type];
                node.getChildByName('count').getComponent(cc.Label).string = `x${count}`;
            })
        }

        let shareConfig = ShareMgr.ins.getConfig(curLevel, "level");
        if (shareConfig) {
            const bottom = this.node.getChildByName('bottom');
            if (bottom) {
                let ButtonShare = bottom.getChildByName("ButtonShare")
                ButtonShare && (ButtonShare.active = true);
            }
        }
    }

    private runContinueAction() {
        const node = cc.find('bottom/continue', this.node);
        if (node) {
            const a0 = cc.scaleTo(0.5, 1.1);
            const a1 = cc.scaleTo(0.5, 1);
            node.runAction(cc.repeatForever(cc.sequence(a0, a1)));
        }
    }

    private setLv(node: cc.Node, lv: number = 0, content: string = '关卡') {
        node.getComponent(cc.Label).string = `${content}${lv || RuntimeMgr.ins.CurLevel}`;
    }


    private setLv2(node: cc.Node, lv: number = 0, content: string = '第') {
        node.getComponent(cc.Label).string = `${content}${lv || RuntimeMgr.ins.CurLevel}${"关"}`;
    }


    private initShowTargetContent(data: Collect[]) {
        if (data) {
            this.content.destroyAllChildren();
            data.forEach((data) => {
                const collect = M.nodePool.createItem(this.collectPrefab);
                const itemCtrl = collect.getComponent(CollectItemCtrl);
                collect.parent = this.content;
                itemCtrl.init(data.type, data.count);
            });
        }
    }
}
