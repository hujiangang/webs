import UI, {Palette} from '../../../Common/UI/ForestUI';
import PlayerPanels from '../../../Common/UI/PlayerPanels';
import OverHightLightCtrl from '../../../Common/UI/OverHightLightCtrl';
import PropCtrl from "./PropCtrl";
import InfoPanelCtrl from "./InfoPanelCtrl";
import M from "../../../../Application/M";
import { Event } from "../../../Data/Const/Event";
import UIMgr from "../../../Common/UI/UIMgr";
import { UIHudDef } from "../../../Data/Interface/UIData";
import { PropType, CellType, ElimateType, Scene, PowerConfig, WaringTips, ConditionType } from "../../../Data/Const/Constant";
import { Util } from "../../../../Framework/Utils/Util";
import Common from "../../../Common/Common";
import { ILevel } from "../../../Data/Interface/Level/ILevel";
import MainCtrl from '../../MainCtrl';
import ReportMgr from "../../../Services/ReportMgr";
import GameModel from '../../Model/GameModel';
import Apps from "../../../../Application/Apps";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainUiCtrl extends cc.Component {

    @property(cc.Node)
    topBar: cc.Node = null;

    @property(cc.Node)
    bottomBar: cc.Node = null;

    @property(cc.Node)
    propBar: cc.Node = null;

    @property(cc.Node)
    centerBar: cc.Node = null;

    @property(cc.Prefab)
    dotPrefab: cc.Prefab = null;

    @property(cc.ProgressBar)
    scoreBar: cc.ProgressBar = null;

    @property(cc.Node)
    scoreNode: cc.Node = null;

    @property(cc.Node)
    tmpTestPropShowLable: cc.Node = null;

    @property(cc.Label)
    version: cc.Label = null;

    private _cfg: ILevel = null;

    private _mainCtrl: MainCtrl = null;

    private _maxScore: number = 0;

    /**直行进度条 */
    private _nextStarScore: number = null;

    /**弧形进度条 */
    private _scoreStarLights: Map<number, cc.Node> = null;

    private propCtrl: PropCtrl = null;
    private infoPanelCtrl: InfoPanelCtrl = null;

    private isSquareBar: boolean = false;


    onLoad() {
        this.restoreSceneBindings();
        this.initEvent();
        this.initSubCtrl();
        this.initView();
    }

    /** Editor preview can retain an older scene instance after script recompilation. */
    private restoreSceneBindings() {
        this.topBar = this.topBar || cc.find('top', this.node);
        this.bottomBar = this.bottomBar || cc.find('bottom', this.node);
        this.propBar = this.propBar || cc.find('bottom/propsBar', this.node);
        this.centerBar = this.centerBar || cc.find('top/Auto_record', this.node);
        this.scoreNode = this.scoreNode || cc.find('socre', this.node);
        this.tmpTestPropShowLable = this.tmpTestPropShowLable || cc.find('tmpTestLabel', this.node);
        const progress = this.scoreBar ? null : cc.find('top/Auto_record/ScoreProgressBar', this.node);
        if (progress) this.scoreBar = progress.getComponent(cc.ProgressBar);
        const version = this.version ? null : cc.find('version', this.node.parent);
        if (version) this.version = version.getComponent(cc.Label);
    }

    onDestroy() {
        this.destoryEvent();
    }

    private initEvent() {
        M.event.register(Event.GameCMD.PropClick, this.onUseProp, this);
        M.event.register(Event.GameCMD.PropUsed, this.onPropOver, this)
        M.event.register(Event.Effect.ShowDot, this.onShowDot, this);
        M.event.register(Event.UI.AddScore, this.updateScore, this);
    }

    private destoryEvent() {
        M.event.unRegister(Event.GameCMD.PropClick, this.onUseProp, this);
        M.event.unRegister(Event.GameCMD.PropUsed, this.onPropOver, this)
        M.event.unRegister(Event.Effect.ShowDot, this.onShowDot, this);
        M.event.unRegister(Event.UI.AddScore, this.updateScore, this);
    }

    public init(mc: MainCtrl, cfg: ILevel) {
        this._cfg = cfg;
        this._mainCtrl = mc;
        this.initStarProgress(cfg.levelInfo.score);
        this.infoPanelCtrl = this.getInfoPanelCtrl();
        if (this.infoPanelCtrl) {
            this.infoPanelCtrl.init();
            this.applyTheme();
        } else {
            console.error("[MainUiCtrl] missing InfoPanelCtrl on topBar");
        }
    }

    private applyTheme() {
        if(this.node.getChildByName('ModernHUD'))return;
        const info=this.infoPanelCtrl,w=Math.min(cc.winSize.width-54,710),h=cc.winSize.height;
        const hud=UI.node(this.node,'ModernHUD');hud.zIndex=5;
        this.topBar.children.forEach(n=>n.active=false);this.scoreNode.active=false;this.version.node.active=false;
        const oldStep=info.stepLable.node.parent;oldStep.opacity=0;
        const head=UI.panel(hud,'TopCard',w,206,0,h/2-220,Palette.cream,28);
        const title=UI.box(hud,'LevelTitle',300,70,0,h/2-87,Palette.blue,26,true);
        info.currentLvLable=UI.text(title,'第 '+M.runtime.CurLevel+' 关',38,0,0,'#FFFFFF',280,60);
        const steps=UI.box(head,'Moves',139,150,-w/2+88,0,Palette.blue,24);UI.text(steps,'步数',24,0,49,'#DCE6FF',96,30);
        info.stepLable=UI.text(steps,String(GameModel.ins.stepLimit),58,0,-11,'#FFFFFF',120,85);
        const highlight=this._mainCtrl.overHightLightNode.getComponent(OverHightLightCtrl);
        highlight.stepNode=steps;highlight.stepLabel=info.stepLable;
        highlight.countDownNode.active=false;
        const bonus=UI.box(hud,'BonusCountdown',290,62,0,-h/2+235,Palette.purple,22);
        UI.text(bonus,'奖励倒计时',21,-35,0,'#FFFFFF',180,42);
        highlight.countDownLabel=UI.text(bonus,'0',27,104,0,'#FFFFFF',65,42);
        highlight.countDownNode=bonus;bonus.active=false;
        const collectWidget=info.collectContent.getComponent(cc.Widget);if(collectWidget)collectWidget.enabled=false;
        const collectBackground=info.collectContent.getComponent(cc.Sprite);if(collectBackground)collectBackground.enabled=false;
        info.collectContent.parent=head;info.collectContent.active=true;info.collectContent.setPosition(77,0);info.collectContent.scale=1;
        UI.text(head,'目标',24,67,66,Palette.muted,240,32);
        const score=UI.node(head,'Score',77,-82);
        UI.text(score,'得分',20,-49,0,Palette.muted,75,28);
        info.scoreLable=UI.text(score,'0',23,38,0,Palette.ink,140,28);
        this.bottomBar.children.forEach(n=>{if(n!==this.propBar)n.active=false;});
        this.propBar.parent=hud;this.propBar.setPosition(-62,-h/2+113);this.propBar.anchorX=.5;
        const widget=this.propBar.getComponent(cc.Widget);if(widget)widget.enabled=false;
        const layout=this.propBar.getComponent(cc.Layout);if(layout)layout.enabled=false;
        this.propBar.children.slice().sort((a,b)=>a.name.localeCompare(b.name)).forEach((n,i)=>{n.setPosition((i-1.5)*128,0);n.active=true;});
        UI.panel(hud,'BoosterTray',w+4,144,0,-h/2+118,'#426DCE',28).zIndex=-1;
        const pause=UI.box(hud,'Pause',87,87,w/2-50,-h/2+126,'#4B9FF3',30,true);UI.icon(pause,'menu',0,0,42);UI.tap(pause,()=>PlayerPanels.pause(this.node));
        UI.text(hud,'菜单',20,w/2-50,-h/2+61,'#FFFFFF',100,34);
        const settings=UI.box(hud,'Settings',66,66,w/2-38,h/2-69,'#2688F2',24);UI.icon(settings,'settings',0,0,36);UI.tap(settings,()=>PlayerPanels.settings(this.node));
        info.onUpdateInfo();
    }

    private initStarProgress(scoreCfg: Array<number>) {
        if (scoreCfg) {
            const starParent = this.scoreBar.node;
            const trajectory = starParent.getChildByName('trajectory');
            this._maxScore = scoreCfg[scoreCfg.length - 1];
            this._maxScore += this._maxScore * 0.15;
            this.scoreBar.progress = 0;
            if (trajectory) {
                this.isSquareBar = true;
                this._scoreStarLights = new Map();
                //算出百分比
                for (let i = 0; i < scoreCfg.length; i++) {
                    const star = this.scoreBar.node.getChildByName(`star${i}`);
                    const coefficient = Math.round((scoreCfg[i] / this._maxScore) * 10);
                    star.setPosition(trajectory.getChildByName(`${coefficient}`).position);
                    this._scoreStarLights.set(coefficient, star);
                    Common.switchGray(true, star);
                }
            } else {
                this.isSquareBar = false;
                this._nextStarScore = scoreCfg[0];
                this._scoreStarLights = new Map();
                for (let i = 0; i < scoreCfg.length; i++) {
                    const star = this.scoreBar.node.getChildByName(`star${i}`);
                    const coefficient = scoreCfg[i] / this._maxScore;
                    star.x = (starParent.width * coefficient) - starParent.width / 2;
                    Common.switchGray(true, star);
                    this._scoreStarLights.set(i, null);
                }
            }
        }
    }

    private initView() {
        this.version.string = Apps.Version;
        this.updateScore(0, null);
        this.centerBar.y -= M.platform.getTopBangPosition();
        this.scheduleOnce(() => {
            //延迟加载,初始状态可能会没读取到胶囊位置!
            const c: cc.Rect = M.platform.getMenuButtonBoundingClientRect();
            if (c) {
                this.scoreNode.setPosition(c.x + c.width / 2, c.y - 10);
                if (Util.Tool.isIpx()) {
                    this.scoreNode.setScale(0.8);
                    this.centerBar.y -= c.height;
                    this.scoreNode.y += c.height + this.scoreNode.height;
                }
            }
        }, 0.1);
    }

    private initSubCtrl() {
        this.propCtrl = this.propBar.getComponent(PropCtrl);
        this.propCtrl.init();
    }

    private onUseProp(type: PropType) {
        switch (type) {
            case PropType.BeikeBomb:
            case PropType.Board:
            case PropType.Hammer:
                this.tmpTestPropShowLable.active = true;
                this.tmpTestPropShowLable.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.2, 1.1), cc.scaleTo(0.2, 1))));
                break;
        }
    }


    private onShowDot(type: ElimateType, startPoint: cc.Vec2) {
        // let count = Util.Tool.rangeInt(2, 5);
        // for (let i = count; i--;) {
        //     const dotNode = M.nodePool.getItem(NodePoolKey.Dot, this.dotPrefab);
        //     dotNode.parent = this.node;
        //     dotNode.setScale(Util.Tool.rangeInt(3, 7) / 10);
        //     // dotNode.color = cc.color(Util.Tool.rangeInt(0, 255), Util.Tool.rangeInt(0, 255), Util.Tool.rangeInt(0, 255));
        //     dotNode.setPosition(this.node.convertToNodeSpaceAR(startPoint));
        //     const targetPos = this.node.convertToNodeSpaceAR(Common.getWorldPos(this.scoreBar.node)) as cc.Vec2;
        //     // targetPos.x += this.scoreBar.node.width / 2;
        //     let moveTime = dotNode.position.sub(targetPos).mag() * (Util.Tool.rangeInt(10, 20) / 10000);

        //     const a0 = cc.moveTo(moveTime, targetPos);
        //     const a1 = cc.callFunc(() => {
        //         M.nodePool.freeItem(NodePoolKey.Dot, dotNode);
        //     })
        //     dotNode.runAction(cc.sequence(a0, a1));

        //     if (type != ElimateType.Default) {
        //         this.updateScore(ScoreConfig.SingleElimate[type], startPoint);
        //     }
        // }
    }

    private onPropOver() {
        this.tmpTestPropShowLable.stopAllActions();
        this.tmpTestPropShowLable.active = false;
    }

    public getLevelLabelPos(): cc.Vec2 {
        const ctrl = this.getInfoPanelCtrl();
        return ctrl ? ctrl.getLevelLabPos() : null;
    }

    public getCollectPos(type: CellType | string): cc.Vec2 {
        const ctrl = this.getInfoPanelCtrl();
        return ctrl ? ctrl.getCollectPos(type) : cc.v2(0, 0);
    }

    public getStepPos() {
        const ctrl = this.getInfoPanelCtrl();
        return ctrl ? ctrl.getStepPos() : null;
    }

    private getInfoPanelCtrl(): InfoPanelCtrl {
        if (!this.infoPanelCtrl && this.topBar) {
            this.infoPanelCtrl = this.topBar.getComponent(InfoPanelCtrl);
        }
        return this.infoPanelCtrl;
    }

    public onGoMapScene() {
        M.ui.closeAllUI();
        M.runtime.SelectLevel = 0;
        Common.jumpScene(Scene.Home);
    }

    public onTestShowWin() {
        UIMgr.ins.showUI(UIHudDef.GameOverWin, { type: UIHudDef.GameOverWin, data: 1 });
    }

    public onTestShowFail() {
        this.showResultDialog(false, 0, 0);
    }

    public showResultDialog(result: boolean, stepCount?: number, timeCount?: number) {
        ReportMgr.ins.reportMatchOver(M.runtime.CurLevel, result, stepCount, timeCount);
        if (result) {
            M.runtime.SelectLevel = 0;
            const starCount = 3;//this._scoreStarLights ? 3 - this._scoreStarLights.size : 0;
            let rewardCoins=0;
            const isNew = M.runtime.CurLevel < 9000 && M.runtime.savaLvData(starCount);
            if (isNew) {
                //奖励!
                const info = M.table.LevelUpReward.getByPrimaryKey(M.runtime.CurLevel);
                if (info && info.rewards) {
                    info.rewards.forEach(item => {
                        M.runtime.addCurrency(item.type, item.count);
                        if(item.type===0)rewardCoins+=item.count;
                    })
                }
                //判断是否有新解锁的道具
                const propInfos = M.table.PropInfo.getData();
                if (propInfos) {
                    propInfos.forEach(info => {
                        if (info.unlockLv == M.runtime.CurLevel) {
                            M.tips.show(WaringTips.UnlockProp);
                        }
                    })
                }

            }
            cc.log("调用显示成功界面")
            UIMgr.ins.showUI(UIHudDef.GameOverWin, { type: UIHudDef.GameOverWin, data: starCount, rewardCoins });
            if(M.runtime.CurLevel < 9000)M.runtime.setMatch3Level(M.runtime.CurLevel + 1);
        } else {
            //UIMgr.ins.showUI(UIHudDef.GameOverFail, { type: UIHudDef.GameOverFail, data: this._cfg.collect });
            cc.log("调用显示失败界面")
            UIMgr.ins.showUI(UIHudDef.UIGameFailEncourage, { data: this._cfg.collect });
        }
    }

    public updateScore(as: number, pos: cc.Vec2, isOverEff: boolean = false) {
        if (as) {
            pos && M.event.send(Event.Effect.AddScore, as, pos, isOverEff);
            const score = M.runtime.addScore(as);
            this.infoPanelCtrl && this.infoPanelCtrl.onUpdateInfo();
            this.updateScoreProgress(score);
        }
    }

    public showTargetDialog(dialogOverCallback: Function) {
        const data: any = {}
        data.collect = this._cfg.collect;
        UIMgr.ins.showUI(UIHudDef.GameShowTarget, { type: UIHudDef.GameShowTarget, data }, null, () => {
            dialogOverCallback();
        });
    }

    private updateScoreProgress(curScore: number) {
        if (this._cfg) {
            this.scoreBar.progress = curScore / this._maxScore;
            if (this.isSquareBar && this._scoreStarLights) {
                const coefficient = Math.round(this.scoreBar.progress * 10);
                this._scoreStarLights.forEach((v, k) => {
                    if (coefficient >= k) {
                        Common.switchGray(false, v);
                        this._scoreStarLights.delete(k);
                    }
                });
            } else if (this._nextStarScore && curScore >= this._nextStarScore) {
                const currentIndex = this._cfg.levelInfo.score.indexOf(this._nextStarScore);
                const star = this.scoreBar.node.getChildByName(`star${currentIndex}`);
                this._scoreStarLights.delete(currentIndex);
                Common.switchGray(false, star);
                this._nextStarScore = this._cfg.levelInfo.score[currentIndex + 1];
                this._nextStarScore == -1 && (this._nextStarScore = null);
            }
        }
    }

    public onOpenGM() {
        if (Apps.isOpenGM) {
            UIMgr.ins.showUI(UIHudDef.GMView);
        }
    }
}
