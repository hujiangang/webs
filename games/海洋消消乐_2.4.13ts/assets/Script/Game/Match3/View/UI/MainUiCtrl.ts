import UI from '../../../Common/UI/ForestUI';
import PlayerPanels from '../../../Common/UI/PlayerPanels';
import OverHightLightCtrl from '../../../Common/UI/OverHightLightCtrl';
import PropCtrl from "./PropCtrl";
import InfoPanelCtrl from "./InfoPanelCtrl";
import M from "../../../../Application/M";
import { Event } from "../../../Data/Const/Event";
import UIMgr from "../../../Common/UI/UIMgr";
import { UIHudDef } from "../../../Data/Interface/UIData";
import { PropType, CellType, Scene, WaringTips } from "../../../Data/Const/Constant";
import Common from "../../../Common/Common";
import { ILevel } from "../../../Data/Interface/Level/ILevel";
import MainCtrl from '../../MainCtrl';
import ReportMgr from "../../../Services/ReportMgr";
import Apps from "../../../../Application/Apps";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainUiCtrl extends cc.Component {

    @property(cc.Node)
    topBar: cc.Node = null;

    @property(cc.Node)
    propBar: cc.Node = null;

    private _cfg: ILevel = null;
    private _mainCtrl: MainCtrl = null;
    private propCtrl: PropCtrl = null;
    private infoPanelCtrl: InfoPanelCtrl = null;
    private propHint: cc.Node = null;
    private hudView: {
        stepNode: cc.Node; stepLabel: cc.Label; levelLabel: cc.Label; scoreLabel: cc.Label;
        collectContent: cc.Node; collectWidth: number;
        countDownNode: cc.Node; countDownLabel: cc.Label;
    } = null;

    onLoad() {
        this.restoreSceneBindings();
        this.initEvent();
        this.initSubCtrl();
    }

    /** Editor preview can retain an older scene instance after script recompilation. */
    private restoreSceneBindings() {
        this.topBar = this.topBar || cc.find('top', this.node);
        this.propBar = this.propBar || cc.find('bottom/propsBar', this.node);
    }

    onDestroy() {
        this.destoryEvent();
    }

    private initEvent() {
        M.event.register(Event.GameCMD.PropClick, this.onUseProp, this);
        M.event.register(Event.GameCMD.PropUsed, this.onPropOver, this)
        M.event.register(Event.UI.AddScore, this.updateScore, this);
    }

    private destoryEvent() {
        M.event.unRegister(Event.GameCMD.PropClick, this.onUseProp, this);
        M.event.unRegister(Event.GameCMD.PropUsed, this.onPropOver, this)
        M.event.unRegister(Event.UI.AddScore, this.updateScore, this);
    }

    public init(mc: MainCtrl, cfg: ILevel) {
        this._cfg = cfg;
        this._mainCtrl = mc;
        this.infoPanelCtrl = this.getInfoPanelCtrl();
        if (this.infoPanelCtrl) {
            this.applyTheme();
            this.infoPanelCtrl.init();
            this.onPropOver();
        } else {
            console.error("[MainUiCtrl] missing InfoPanelCtrl on topBar");
        }
    }

    private applyTheme() {
        if (!this.hudView) this.createHUD();
        this.infoPanelCtrl.bindView(this.hudView);
        this._mainCtrl.overHightLightNode.getComponent(OverHightLightCtrl).bindView(this.hudView);
    }

    /** Build the current UI directly, without loading or hiding a legacy HUD. */
    private createHUD() {
        const w = Math.min(cc.winSize.width - 54, 710), h = cc.winSize.height;
        const hud = UI.node(this.node, 'ModernHUD');
        hud.zIndex = 5;
        const title = UI.box(hud, 'LevelTitle', 276, 64, 0, h / 2 - 79, '#355641', 26, true);
        const levelLabel = UI.text(title, '', 34, 0, 0, '#FFFFFF', 254, 56);
        const steps = UI.box(hud, 'Moves', 154, 168, -w / 2 + 88, h / 2 - 216, '#A95C3D', 45, true);
        UI.text(steps, '剩余步数', 22, 0, 53, '#FFF1D0', 140, 32);
        const stepLabel = UI.text(steps, '0', 72, 0, -13, '#FFFFFF', 138, 100);
        const targetWidth = w - 186;
        const head = UI.box(hud, 'Targets', targetWidth, 156, 91, h / 2 - 211, '#F0E5C8', 32, true);
        const targetLabel = UI.box(head, 'TargetLabel', 160, 37, 0, 74, '#46634B', 16);
        UI.text(targetLabel, '本关目标', 22, 0, 0, '#FFFFFF', 148, 32);
        const collectContent = UI.node(head, 'CollectContent', 0, -4);
        collectContent.setContentSize(0, 110);
        const bonus = UI.box(hud, 'BonusCountdown', 290, 62, 0, -h / 2 + 235, '#A66B35', 22);
        UI.text(bonus, '奖励倒计时', 21, -35, 0, '#FFFFFF', 180, 42);
        const countDownLabel = UI.text(bonus, '0', 27, 104, 0, '#FFFFFF', 65, 42);
        bonus.active = false;
        const score = UI.node(hud, 'Score', 0, h / 2 - 321);
        UI.text(score, '得分', 21, -51, 0, '#EDE9D3', 72, 30);
        const scoreLabel = UI.text(score, '0', 24, 39, 0, '#FFFFFF', 140, 32);

        this.propBar.parent = hud;
        this.propBar.setPosition(0, -h / 2 + 110);
        this.propBar.anchorX = .5;
        const spacing = Math.min(162, (w - 28) / 4);
        this.propBar.setContentSize(spacing * 4, 178);
        this.propBar.children.slice().sort((a, b) => a.name.localeCompare(b.name)).forEach((node, i) => {
            node.setPosition((i - 1.5) * spacing, 0);
            node.active = true;
        });
        const tray = UI.node(hud, 'BoosterTray', 0, -h / 2 + 68);
        tray.setContentSize(w - 8, 100);
        tray.zIndex = -1;
        const trayArt = tray.addComponent(cc.Graphics), trayWidth = tray.width;
        trayArt.fillColor = cc.color().fromHEX('#182F25');
        trayArt.roundRect(-trayWidth / 2, -56, trayWidth, 100, 20); trayArt.fill();
        trayArt.fillColor = cc.color().fromHEX('#2A4938');
        trayArt.roundRect(-trayWidth / 2, -50, trayWidth, 100, 20); trayArt.fill();
        trayArt.lineWidth = 2; trayArt.strokeColor = cc.color().fromHEX('#B5AD79');
        trayArt.moveTo(-trayWidth / 2 + 20, 49); trayArt.lineTo(trayWidth / 2 - 20, 49); trayArt.stroke();
        this.propHint = UI.box(hud, 'PropHint', Math.min(w - 40, 480), 54, 0, -h / 2 + 224, '#355641', 18);
        UI.text(this.propHint, '请选择道具作用的位置', 24, 0, 0, '#FFF1D0', this.propHint.width - 20, 42);
        this.propHint.active = false;

        const pause = UI.box(hud, 'Pause', 70, 70, w / 2 - 38, h / 2 - 78, '#E9DDC1', 25, true);
        const pauseMark = UI.node(pause, 'PauseMark'), g = pauseMark.addComponent(cc.Graphics);
        g.fillColor = cc.color().fromHEX('#3D5742');
        g.roundRect(-18, -19, 13, 38, 4); g.fill(); g.roundRect(5, -19, 13, 38, 4); g.fill();
        UI.tap(pause, () => PlayerPanels.pause(this.node));
        const settings = UI.box(hud, 'Settings', 62, 62, -w / 2 + 38, h / 2 - 78, '#E9DDC1', 23);
        UI.icon(settings, 'settings', 0, 0, 34, '#3D5742');
        UI.tap(settings, () => PlayerPanels.settings(this.node));
        this.hudView = {stepNode: steps, stepLabel, levelLabel, scoreLabel, collectContent,
            collectWidth: targetWidth - 30, countDownNode: bonus, countDownLabel};
    }

    public getCollectContent(): cc.Node {
        return this.hudView ? this.hudView.collectContent : null;
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
                if (!this.propHint) return;
                this.propHint.stopAllActions();
                this.propHint.scale = 1;
                this.propHint.active = true;
                this.propHint.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.2, 1.1), cc.scaleTo(0.2, 1))));
                break;
        }
    }


    private onPropOver() {
        if (!this.propHint) return;
        this.propHint.stopAllActions();
        this.propHint.scale = 1;
        this.propHint.active = false;
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
            const starCount = 3;
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
            M.runtime.addScore(as);
            this.infoPanelCtrl && this.infoPanelCtrl.onUpdateInfo();
        }
    }

    public showTargetDialog(dialogOverCallback: Function) {
        const data: any = {}
        data.collect = this._cfg.collect;
        UIMgr.ins.showUI(UIHudDef.GameShowTarget, { type: UIHudDef.GameShowTarget, data }, null, () => {
            dialogOverCallback();
        });
    }

    public onOpenGM() {
        if (Apps.isOpenGM) {
            UIMgr.ins.showUI(UIHudDef.GMView);
        }
    }
}
