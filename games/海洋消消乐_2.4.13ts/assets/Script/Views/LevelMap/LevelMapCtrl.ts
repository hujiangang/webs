import UIMgr from "../../Base/Manager/UIMgr";
import { UIHudDef } from "../../Logic/Data/Interface/UIData";
import Common from "../../Logic/Common/Common";
import { MaxPowerCount, PowerConfig, WaringTips, SceneTaskKey } from "../../Logic/Data/Const/Constant";
import M from "../../Base/Manager/M";
import { Util } from "../../Base/Utils/Util";
import { CurrencyId, IUserInfo } from "../../Base/BaseConst";
import { Event } from "../../Logic/Data/Const/Event";
import SelectChapterCtrl from "./SelectChapterCtrl";
import ChapterInfo from "../../Base/Tabls/ChapterInfo";
import SelectLevelCtrl from "../../Logic/Common/UI/SelectLevelCtrl";
import ChapterItemCtrl from "./ChapterItemCtrl";
import BoxGiftCtrl from "../../Logic/Common/UI/BoxGiftCtrl";
import RankPanelCtrl from "./RankPanelCtrl";
import { GuideUtils } from "../../../GodGuide/GuideUtils";
import MapIslandUtils from "../../Logic/SimulationOperation/View/Map/MapIslandUtils";
import Apps from "../../Base/Apps";
import BuyPowerCtrl from "../../Logic/Common/UI/BuyPowerCtrl";
import { AudioID } from "../../Logic/Common/AudioCtrl";

const { ccclass, property } = cc._decorator;
@ccclass
export default class LevelMapCtrl extends cc.Component {

    @property(cc.Label)
    curLvLab: cc.Label = null;

    @property(cc.Label)
    powerLab: cc.Label = null;

    @property(cc.Label)
    coinLab: cc.Label = null;

    @property(cc.Label)
    diamondLab: cc.Label = null;

    @property(cc.Label)
    starLab: cc.Label = null;

    @property(cc.Label)
    remainTimeLab: cc.Label = null;

    @property(cc.Sprite)
    avatarSprite: cc.Sprite = null;

    @property(cc.Node)
    islandParent: cc.Node = null;

    @property(cc.Node)
    chapterNode: cc.Node = null;

    @property(cc.Node)
    boxGiftNode: cc.Node = null;

    @property(cc.Node)
    uiNode: cc.Node = null;

    @property(cc.Node)
    rankPanel: cc.Node = null;

    @property(cc.Node)
    buyPowerPanel: cc.Node = null;

    @property(cc.Node)
    selectLvNode: cc.Node = null;

    @property(cc.Prefab)
    chapterItemPrefab: cc.Prefab = null;

    @property(cc.Node)
    goMapBtn: cc.Node = null;

    @property(cc.Node)
    buyPowerBtn: cc.Node = null;

    @property(cc.Prefab)
    guidePrefab: cc.Prefab = null;

    @property(cc.Node)
    btnGoMatchBtn: cc.Node = null;

    @property(cc.Node)
    tili: cc.Node = null;

    private _selectChapterCtrl: SelectChapterCtrl = null;
    private _selectLevelCtrl: SelectLevelCtrl = null;

    private _mainPageView: cc.PageView = null;

    private _boxGiftCtrl: BoxGiftCtrl = null;

    onLoad() {
        // M.init();
        // GameTableMgr.ins.execute().then(() => {

        this._initView();
        this._initEvent();
        this._checkOfflineReward();
        this._checkJumpSceneTask();
        this._checkHavaReward();
        this._onUpdateReminTime();

        // GuideUtils.initGuide(this.guidePrefab);

        // });
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchBegin, this);
        // this.node.pauseSystemEvents(true);

        M.event.send(Event.Sound.PlayBGM, AudioID.BGM1);
    }

    start() {
        // MapIslandUtils.preloadMapBg();
    }

    // onTouchBegin(event) {

    // }

    onDestroy() {
        this._destoryEvent();
    }

    private _initView() {
        this._initChapter();
        this._initLevelDisplay();
        this._initIslandDisplay();
        this._initCrrencyDisplay();
        this._checkAuth();
        if (Util.Tool.isIpx()) {
            const widget = this.uiNode.getChildByName('Top').getComponent(cc.Widget);
            widget.top = 70;
            widget.updateAlignment();
            // this.coinLab.node.parent.setPosition(-24, -12);
        }
    }

    /**
     * 检查是否拿到了用户的授权.
     */
    private _checkAuth() {
        M.platform.getUserInfo().then((info) => {
            let result = null;
            if (!info) {
                result = M.platform.createAuthButton({ x: 0, y: 0, w: cc.winSize.width, h: cc.winSize.height });
            } else {
                result = new Promise((resolve) => resolve(info));
            }
            return result;
        }).then((userinfo) => {
            if (userinfo) {
                M.net.login(true);
                this._updateAvatar(userinfo);
            }
        });
    }

    private _initEvent() {
        M.event.register(Event.UI.UpdateCurrency, this._onUpdateCrrencyView, this);
        M.event.register(Event.UI.HideSelectLevelView, this.onHideSelectLevelView, this);
        M.event.register(Event.UI.UpdateRemainAddPowerTime, this._onUpdateReminTime, this);
        M.event.register(Event.UI.LevelSceneTouched, this.onTouchLayerEnable, this);
        M.event.register(Event.UI.ChapterUnlock, this.doChapterUnlock, this);
    }

    private _destoryEvent() {
        M.event.unRegister(Event.UI.UpdateCurrency, this._onUpdateCrrencyView, this);
        M.event.unRegister(Event.UI.HideSelectLevelView, this.onHideSelectLevelView, this);
        M.event.unRegister(Event.UI.UpdateRemainAddPowerTime, this._onUpdateReminTime, this);
        M.event.unRegister(Event.UI.ChapterUnlock, this.doChapterUnlock, this);
    }

    private _showSelectDlg() {
        let next = GuideUtils.checkMatchNext();
        next && UIMgr.ins.showUI(UIHudDef.SelectShowTarget, { type: UIHudDef.SelectShowTarget, data: M.runtime.SelectLevel || null });
    }

    /** 绑定关卡按钮 */
    public onLevelBtnClick() {

        M.runtime.SelectLevel = 0;
        this._showSelectDlg();


        // Util.Tool.moveTo(cc.v2(this.btnGoMatchBtn.position.x,this.btnGoMatchBtn.position.y),this.tili,()=>{


        // })
    }

    public onGoMapSceneBtnClick() {
        MapIslandUtils.openMapIsland();
    }


    public onShareBtnClick() {
        M.platform.share('分享测试.....', 'https://mini-ga0.cos.ap-guangzhou.myloud.com/soe/Share/testshare.png')
    }

    public onShowDailyTaskBtnClick() {
        UIMgr.ins.showUI(UIHudDef.DailyTaskPanel);
    }


    //离线奖励!
    private _checkOfflineReward() {
        M.runtime.getServerConfig().then(config => {
            config && this._showOfflineRewar(config.time);
        })
    }

    private _checkHavaReward() {
        if (M.runtime.RewardTask && M.runtime.RewardTask.reward) {
            const rewards = Common.getRewardArray(M.runtime.RewardTask.reward);
            M.ui.showUI(UIHudDef.OpenBox, { config: { rewards, text: M.runtime.RewardTask.text } });
            M.runtime.RewardTask = null;
            GuideUtils.stopGuide = true;
        }
        //for test
        // if (M.runtime.CurLevel > 3) {
        //     M.runtime.setBoxGiftData(10, false);
        //     const boxConfig = M.table.BoxRewardInfo.getByPrimaryKey(10);
        //     if (boxConfig) {
        //         //展示奖励ui . 发放奖励
        //         M.ui.showUI(UIHudDef.OpenBox, { config: boxConfig });
        //     }
        //     GuideUtils.stopGuide = true;
        // }
    }

    public onAddBtnClick(event, customValue: string) {
        let type: CurrencyId = CurrencyId.Diamond;
        switch (customValue) {
            case 'coin':
                type = CurrencyId.Coin;
                this._addCrrencyClick(type);
                break;
            case 'power':
                type = CurrencyId.Power;
                this.buyPowerPanel.getComponent(BuyPowerCtrl).show();
                break;
            case 'diamond':
                type = CurrencyId.Diamond;
                this._addCrrencyClick(type);
                break;
        }
    }

    /**检测是否有界面跳转任务 */
    private _checkJumpSceneTask() {
        if (M.runtime.SceneTask && M.runtime.SceneTask.length > 0) {
            const task = M.runtime.SceneTask.shift();
            switch (task) {
                case SceneTaskKey.ShowTargetDlg:
                    M.ui.closeAllUI();
                    this._showSelectDlg();
                    break;
            }
            this._checkJumpSceneTask();
        }
    }

    private _initLevelDisplay() {
        this.curLvLab.string = `第${M.runtime.getMatch3Level()}关`;
    }

    private _initChapter() {
        this._boxGiftCtrl = this.boxGiftNode.getComponent(BoxGiftCtrl);
        this._mainPageView = this.islandParent.parent.getComponent(cc.PageView);
        this._selectChapterCtrl = this.chapterNode.getComponent(SelectChapterCtrl);
        this._selectLevelCtrl = this.selectLvNode.getComponent(SelectLevelCtrl);
        if (this._selectChapterCtrl) {
            this._selectChapterCtrl.init(this._onShowSelectLevelView.bind(this));
        }
    }

    private _initIslandDisplay() {
        const datas = M.table.ChapterInfo.getData();
        // let [count, index] = [0, 0];
        let curIndex = 0;
        datas.forEach((info, i) => {
            const kk = M.nodePool.createItem(null);
            kk.setContentSize(cc.winSize.width, 0)
            this._mainPageView.addPage(kk);

            const item = M.nodePool.createItem(this.chapterItemPrefab);
            item.parent = kk;
            item.getComponent(ChapterItemCtrl).init(info, 1, this._onIslandClick.bind(this));
            const curLv = M.runtime.getMatch3Level();
            if (curLv > info.minLv && curLv < info.maxLv) {
                curIndex = i;
            }
        });
        if (GuideUtils.curGuideId == 3001) {  //引导解锁章节
            this.onTouchLayerEnable(false);
            curIndex = 0;
        }
        this.scheduleOnce(() => {
            this._mainPageView.scrollToPage(curIndex, 0.04);
            this.onPageViewChanged();
        }, 0.1);
    }

    private _updateAvatar(userinfo: IUserInfo) {
        if (userinfo.avatarUrl) {
            Common.getRemotPic(userinfo.avatarUrl).then(frame => {
                if (frame) {
                    this.avatarSprite.spriteFrame = frame
                }
            })
        }
    }

    private _initCrrencyDisplay() {
        this.coinLab.string = M.runtime.getFormateCoin();
        this.diamondLab.string = M.runtime.getCurrencyStr(CurrencyId.Diamond);
        this.starLab.string = M.runtime.getStarCount().toString();
        const curPower = M.runtime.getCurrency(CurrencyId.Power);
        this.powerLab.string = `${curPower}/${MaxPowerCount}`;
        this.buyPowerBtn.active = !(curPower > MaxPowerCount)
    }

    /**执行添加货币操作! */
    private _addCrrencyClick(type: CurrencyId) {
        if (Apps.isDebug) {
            M.runtime.addCurrency(type, 10000000);
        }
    }

    private _onIslandClick() {
        // console.error('岛屿被点击!');
        this._showSelectChapterView();
    }

    private _onUpdateCrrencyView(type: CurrencyId, count: number = 0) {
        const label = this[`${M.runtime.getCurrencyKey(type)}Lab`];
        if (label) {
            if (type == CurrencyId.Power) {
                const curPower = M.runtime.getCurrency(CurrencyId.Power);
                label.string = `${curPower}/${MaxPowerCount}`;
                this.buyPowerBtn.active = !(curPower >= MaxPowerCount);
            } else if (type == CurrencyId.Coin) {
                let v = count.toString();
                if (type == CurrencyId.Coin) {
                    v = Common.bytesToSize(count);
                }
                label.string = v;
            } else if (type == CurrencyId.Diamond) {
                label.string = M.runtime.getCurrency(CurrencyId.Diamond);
            }
        }
    }

    private _onShowSelectLevelView(data: ChapterInfo) {
        this.selectLvNode.active = true;
        this._selectLevelCtrl.init(data);
        const animation = this.selectLvNode.getComponent(cc.Animation);
        animation.play('ShowSelectLevel');
    }

    private _showOfflineRewar(currentSerTime: number) {
        const lastTime = M.runtime.getLastTime();
        const gapTime = currentSerTime - lastTime;
        if (lastTime > 1000000 && gapTime > PowerConfig.NormalTime) {
            let offlinePower = (gapTime / PowerConfig.NormalTime) >> 0;
            const cpower = M.runtime.getCurrency(CurrencyId.Power);
            if (cpower < MaxPowerCount) {
                const power = (cpower + offlinePower) > MaxPowerCount ? MaxPowerCount - cpower : offlinePower;
                if (power > 0) {
                    M.runtime.addCurrency(CurrencyId.Power, power);
                    M.tips.show(`${WaringTips.OfflineReward}${power}能量`);
                }
            }
        }
        M.runtime.setServerTime(currentSerTime);
        this._onUpdateReminTime();
    }

    private _showSelectChapterView() {
        this.chapterNode.active = true;
        this._boxGiftCtrl.onOtherClick();
    }

    private _onUpdateReminTime(curTimeCount: number = 0) {
        if (M.runtime.getCurrency(CurrencyId.Power) >= MaxPowerCount) {
            this.remainTimeLab.string = '满了!'
        } else if (curTimeCount) {
            const time = PowerConfig.NormalTime - (curTimeCount % PowerConfig.NormalTime);
            this.remainTimeLab.string = `${Util.Timer.conversionTime(time, true, { m: true })} 后 +${PowerConfig.NormalCount}`;
        }
    }

    public onHideSelectChapterView() {
        this.chapterNode.active = false;
    }

    public onPageViewChanged() {
        const data = M.table.ChapterInfo.getByPrimaryKey(this._mainPageView.getCurrentPageIndex() + 1);
        this._boxGiftCtrl.updatePage(data.minLv, data.maxLv);
    }

    public onRankBtnClick() {
        this.rankPanel.getComponent(RankPanelCtrl).onInit();
    }

    public onHideSelectLevelView() {
        const animation = this.selectLvNode.getComponent(cc.Animation);
        animation.play('HideSelectLevel');
        this.scheduleOnce(() => {
            this.selectLvNode.active = false;
        }, 0.5);
    }

    //作用： 屏蔽LevelScene是否可以被点击
    public onTouchLayerEnable(data) {
        let touchLayer = cc.find("TouchLayer");
        if (touchLayer) {
            let blockInputEvents = touchLayer.getComponent(cc.BlockInputEvents);
            blockInputEvents && (blockInputEvents.enabled = !data);
        }
    }


    public onShopBtnClick() {

        M.ui.showUI(UIHudDef.ShopPanel);

    }

    public onClickHead() {
        if (Apps.isOpenGM) {
            UIMgr.ins.showUI(UIHudDef.GMView);
        }
    }

    //作用：用于第一章节解锁动画
    public doChapterUnlock(data: { index: number, play: boolean }) {
        this._mainPageView.scrollToPage(data.index, 1);
        if (data.play) {
            let node = this._mainPageView.getPages()[data.index];
            if (node) {
                let itemCtrl = node.getComponentInChildren(ChapterItemCtrl);
                if (itemCtrl) {
                    itemCtrl.doCloudUnlock();
                }
            }
        }
    }
}
