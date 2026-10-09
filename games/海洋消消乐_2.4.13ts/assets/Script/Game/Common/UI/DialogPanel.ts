import ForestUI, {Palette} from './ForestUI';
import M from "../../../Application/M";
import UIBase from "./UIBase";
import UIMgr from "./UIMgr";
import { UIHudDef } from "../../Data/Interface/UIData";
import CollectItemCtrl from "../../Match3/View/UI/CollectItemCtrl";
import { Event } from "../../Data/Const/Event";
import { Collect } from "../../Data/Interface/Level/ILevel";
import { Util } from "../../../Framework/Utils/Util";
import { NativeKey, Scene, PowerConfig, WaringTips, SceneTaskKey } from '../../Data/Const/Constant';
import SlideButton from '../../../Framework/Components/SlideButton';
import RuntimeMgr from '../../Data/RuntimeMgr';
import Common from "../Common";
import EventMgr from "../../../Framework/Events/EventMgr";
import { CurrencyId } from "../../Data/Const/BaseConst";
import SelectPropCtrl from "../../Match3/View/UI/SelectPropCtrl";
import { StorageMgr } from "../../Data/StorageMgr";
import ShareMgr from "../../Services/ShareMgr";
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


    private curData: { type: any, data: any, rewardCoins?:number } = null;

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

    public onInit(params: { type: any, data: any, rewardCoins?:number }) {
        if (params) {
            this.curData = params;
            if(params.type===UIHudDef.OverShow){
                this.node.children.forEach(n=>n.active=false);
                const old=this.node.getChildByName('ForestBonus');if(old){old.removeFromParent();old.destroy();}
                const banner=ForestUI.box(this.node,'ForestBonus',570,140,0,100,Palette.cream,32,true);
                ForestUI.icon(banner,'star',-216,0,78,Palette.gold);
                ForestUI.text(banner,'目标完成',36,36,25,Palette.ink,370);
                ForestUI.text(banner,'剩余步数转为奖励消除',23,36,-32,Palette.muted,400);
                return;
            }
            if(params.type===UIHudDef.GameOverWin || params.type===UIHudDef.GameOverFail){
                const win=params.type===UIHudDef.GameOverWin;
                EventMgr.ins.send(Event.Sound.PlaySoundEff,win?AudioID.GameWin:AudioID.GameFail);
                this.drawForestResult(win);return;
            }
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
        if(this.curData && this.curData.type===UIHudDef.OverShow){
            this.node.opacity=255;this.node.scale=1;
            this.scheduleOnce(()=>UIMgr.ins.hideUI(UIHudDef.OverShow),.9);return;
        }
        if(this.curData && (this.curData.type===UIHudDef.GameOverWin || this.curData.type===UIHudDef.GameOverFail)) {
            this.node.opacity=255;this.node.scale=1;return;
        }
        this.initAnimation();
        this.playAnimation();
    }

    private drawForestResult(win:boolean) {
        this.node.children.forEach(n=>n.active=false);
        const old=this.node.getChildByName('ForestResult');if(old){old.removeFromParent();old.destroy();}
        const m=ForestUI.modal(this.node,win?'挑战成功':'再试一次',710);m.root.name='ForestResult';
        const p=m.panel;
        [-1,0,1].forEach((x,i)=>ForestUI.icon(p,'star',x*105,205+(i===1?20:0),i===1?103:79,win&&i<Number(this.curData.data)?Palette.gold:'#C2CADA'));
        ForestUI.text(p,'第 '+M.runtime.CurLevel+' 关'+(win?' · 挑战成功':''),30,0,100);
        ForestUI.text(p,win?'本关目标已完成':'目标尚未完成',24,0,48,Palette.muted,510);
        const stats=ForestUI.box(p,'Stats',470,122,0,-50,'#EAEDFA',24);
        ForestUI.text(stats,'本关得分',22,-115,27,Palette.muted,210);ForestUI.text(stats,String(M.runtime.currentScore),32,-115,-20,Palette.ink,210);
        ForestUI.text(stats,'本关金币',22,115,27,Palette.muted,210);ForestUI.text(stats,String(this.curData.rewardCoins||0),32,115,-20,Palette.ink,210);
        ForestUI.button(p,win?'继续下一关':'重新挑战',440,83,0,-173,()=>win?this.onGameOverNext():this.onGameOverRestart(),Palette.green);
        const home=()=>{M.ui.closeAllUI();M.runtime.SelectLevel=0;Common.jumpScene(Scene.Home);};
        ForestUI.button(p,'返回关卡',440,72,0,-270,home,Palette.purple);
        const close=p.getChildByName('Button-');close.off(cc.Node.EventType.TOUCH_END);ForestUI.tap(close,home);
    }

    public onUILoad() {

    }

    public onStartGame() {
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
        let curLevel = M.runtime.CurLevel;
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
