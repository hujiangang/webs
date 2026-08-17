import M from "../../Base/Manager/M";
import { IUserInfo, CurrencyId } from "../../Base/BaseConst";
import Common from "../Common/Common";
import { MaxPowerCount, PowerConfig, WaringTips, SceneTaskKey } from "../Data/Const/Constant";
import { Util } from "../../Base/Utils/Util";
import { Event } from "../Data/Const/Event";
import BuyPowerCtrl from "../Common/UI/BuyPowerCtrl";
import Apps from "../../Base/Apps";
import UIMgr from "../../Base/Manager/UIMgr";
import { UIHudDef } from "../Data/Interface/UIData";
import { GuideUtils } from "../../../GodGuide/GuideUtils";
import { ICloudData } from "../SimulationOperation/View/Map/CloudView";
import HotelViewCtrl from "./HotelViewCtrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HotelUiCtrl extends cc.Component {

    @property(cc.Node)
    topNode: cc.Node = null;

    @property(cc.Node)
    buyPowerPanel: cc.Node = null;

    @property(cc.Node)
    buyPowerBtn: cc.Node = null;

    @property(cc.Node)
    bottomBox: cc.Node = null;

    @property(cc.Label)
    coinLabel: cc.Label = null;

    @property(cc.Label)
    diamondLabel: cc.Label = null;

    @property(cc.Label)
    powerLabel: cc.Label = null;

    @property(cc.Label)
    countDownLabel: cc.Label = null;

    @property(cc.Label)
    lvLabelOnStartBtn: cc.Label = null;

    @property(cc.Sprite)
    avatarSprite: cc.Sprite = null;

    @property(cc.Node)
    rankPanel: cc.Node = null;

    @property(cc.Node)
    hotelView: cc.Node = null;


    private _orginBottomBoxPosY: number = null;

    onLoad() {

        M.runtime.addCurrency(CurrencyId.Coin, 100000);
        M.runtime.addCurrency(CurrencyId.Diamond, 100000);
        M.runtime.addCurrency(CurrencyId.Power, 1000);

        this._initView();
        this._initEvent();
        this._initTouch();
        this._checkHavaReward();
        this._onUpdateReminTime();
        this._checkOfflineReward();
        this._checkJumpSceneTask();
    }

    onDestroy() {
        this._destoryEvent();
    }

    private _destoryEvent() {
        M.event.unRegister(Event.UI.UpdateCurrency, this._onUpdateCrrencyView, this);
        M.event.unRegister(Event.UI.UpdateRemainAddPowerTime, this._onUpdateReminTime, this);
    }

    private _initEvent() {
        M.event.register(Event.UI.UpdateCurrency, this._onUpdateCrrencyView, this);
        M.event.register(Event.UI.UpdateRemainAddPowerTime, this._onUpdateReminTime, this);
    }

    private _initTouch() {
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchCancel, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this._touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._touchEnd, this);
    }

    private _initView() {
        this._initLevelDisplay();
        this._initCrrencyDisplay();
        this._checkAuth();
        this._orginBottomBoxPosY = this.bottomBox.y;
        if (Util.Tool.isIpx()) {
            const widget = this.topNode.getComponent(cc.Widget);
            widget.top = 70;
            widget.updateAlignment();
            // this.coinLab.node.parent.setPosition(-24, -12);
        }
    }
    private _startPos = null;
    private _touchStart(event) {
        this._startPos = event.touch.getLocation();
    }

    private _touchEnd(event) {
        if (this._movePos && this._startPos) {
            //判断x的距离
            if (Math.abs(this._startPos.x - this._movePos.x) < 100) {
                //判断y的距离
                if (this._startPos.y < 200 && this._movePos.y > this._startPos.y && Math.abs(this._movePos.y - this._startPos.y) > 100) {
                    const a0 = cc.moveTo(0.2, cc.v2(0, this.bottomBox.y + 50));
                    const a1 = cc.moveTo(0.1, cc.v2(0, this.bottomBox.y - 100));
                    const a2 = cc.callFunc(() => {
                        UIMgr.ins.showUI(UIHudDef.CloudView, ICloudData.OpenHotel, () => {
                            //开
                            this.node.active = false;
                            this.hotelView.active = true;
                            this.hotelView.getComponent(HotelViewCtrl).init();
                        }, () => {
                            //关
                        });
                    });
                    this.bottomBox.runAction(cc.sequence(a0, a1, a2));
                }
            }
        }
        this._touchCancel();
    }

    private _touchCancel() {
        this._startPos = null;
        this._movePos = null;
    }

    private _movePos = null;
    private _touchMove(event) {
        if (this._startPos) {
            this._movePos = event.touch.getLocation();
        }
    }


    private _initLevelDisplay() {
        this.lvLabelOnStartBtn.string = `${M.runtime.getMatch3Level()}`;
    }

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
        this.coinLabel.string = M.runtime.getFormateCoin();
        this.diamondLabel.string = M.runtime.getCurrencyStr(CurrencyId.Diamond);
        // this..string = M.runtime.getStarCount().toString();
        const curPower = M.runtime.getCurrency(CurrencyId.Power);
        this.powerLabel.string = `${curPower}/${MaxPowerCount}`;
        this.buyPowerBtn.active = !(curPower > MaxPowerCount)
    }

    private _showSelectDlg() {
        let next = GuideUtils.checkMatchNext();
        next && UIMgr.ins.showUI(UIHudDef.SelectShowTarget, { type: UIHudDef.SelectShowTarget, data: M.runtime.SelectLevel || null });
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

    public initBottomBoxPosition() {
        if (this._orginBottomBoxPosY) {
            this.bottomBox.y = this._orginBottomBoxPosY;
        }
    }

    public onLevelBtnClick() {
        M.runtime.SelectLevel = 0;
        this._showSelectDlg();
    }

    public onShowDailyTaskBtnClick() {
        UIMgr.ins.showUI(UIHudDef.DailyTaskPanel);
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

    private _onUpdateReminTime(curTimeCount: number = 0) {
        if (M.runtime.getCurrency(CurrencyId.Power) >= MaxPowerCount) {
            this.countDownLabel.string = '满了!'
        } else if (curTimeCount) {
            const time = PowerConfig.NormalTime - (curTimeCount % PowerConfig.NormalTime);
            this.countDownLabel.string = `${Util.Timer.conversionTime(time, true, { m: true })} 后 +${PowerConfig.NormalCount}`;
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



    // public onSelectLvClick() {
    //     // UIMgr.ins.hideUI(UIHudDef.MenuPanel);
    //     // Common.jumpScene(Scene.Level);
    //     // MapIslandUtils.leaveMapIsland();
    //     UIMgr.ins.showUI(UIHudDef.CloudView, ICloudData.LeaveIsland);
    // }


    /**执行添加货币操作! */
    private _addCrrencyClick(type: CurrencyId) {
        if (Apps.isDebug) {
            M.runtime.addCurrency(type, 10000000);
        }
    }


}
