import M from "../../../Base/Manager/M";
import { PropType, PowerConfig, MaxPowerCount, WaringTips } from "../../Data/Const/Constant";
import { CurrencyId } from "../../../Base/BaseConst";
import Common from "../Common";
import { Event } from "../../Data/Const/Event";
import { Util } from "../../../Base/Utils/Util";
import { MoneyManager } from "../../Data/MoneyManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuyPowerCtrl extends cc.Component {

    @property(cc.Label)
    remainPowerCount: cc.Label = null;

    @property(cc.Label)
    countDown: cc.Label = null;

    @property(cc.Label)
    fillFullLabl: cc.Label = null;

    @property(cc.Node)
    littleMoney: cc.Node = null;

    @property(cc.Label)
    littlePrice: cc.Label = null;

    @property(cc.Label)
    littleCount: cc.Label = null;

    @property(cc.Label)
    bigPrice: cc.Label = null;

    @property(cc.Label)
    bigCount: cc.Label = null;

    @property(cc.Node)
    bigMoney: cc.Node = null;

    private fillallPrice = 0;
    private fullCount = 0;

    private _animation: cc.Animation = null;

    onLoad() {
        this._initView();
        this._animation = this.node.getComponent(cc.Animation);
        M.event.register(Event.UI.UpdateRemainAddPowerTime, this.updateCountDown, this);
    }

    onDestroy() {
        M.event.unRegister(Event.UI.UpdateRemainAddPowerTime, this.updateCountDown, this);
    }

    private _initView() {
        this._updateFillFull();
        this._initTowBottle();
    }

    private _updateFillFull() {
        const unityPrice = M.table.PropInfo.getByPrimaryKey(PropType.PowerUnitPrice).price;
        const curPower = M.runtime.getCurrency(CurrencyId.Power);

        this.fullCount = MaxPowerCount - curPower
        this.fillallPrice = unityPrice * this.fullCount;
        this.fillFullLabl.string = `${Common.bytesToSize(this.fillallPrice)}补满精力`;
        this.remainPowerCount.string = `${curPower}/${MaxPowerCount}`;
    }

    private _initTowBottle() {
        const keys = [PropType.PowerBottle1, PropType.PowerBottle2];
        const countLabs = [this.littleCount, this.bigCount];
        const moneyNodes = [this.littleMoney, this.bigMoney];
        const prices = [this.littlePrice, this.bigPrice];
        keys.forEach((key, index) => {
            const info = M.table.PropInfo.getByPrimaryKey(key);
            const data: { count: number } = M.runtime.getPropData(key);
            if (info) {
                if (data && data.count) {
                    countLabs[index].node.active = true;
                    countLabs[index].string = `x${data.count}`;
                    moneyNodes[index].active = false;
                } else {
                    countLabs[index].node.active = false;
                    moneyNodes[index].active = true;
                    prices[index].string = Common.bytesToSize(info.price);
                }
            }
        })
    }

    public show() {
        this.node.active = true;
        this._animation.play('ShowSelectLevel');
    }

    public onCloseBtnClick() {
        M.event.send(Event.UI.UpdateRemainAddPowerTime);
        this._animation.play('HideSelectLevel');
        this.scheduleOnce(() => {
            this.node.active = false;
        }, 0.30);
    }

    public updateCountDown(time) {
        if (this.node.active) {
            //当前能力值
            const currentPower = M.runtime.getCurrency(CurrencyId.Power);
            //计算增量
            const incremental = time % PowerConfig.NormalTime;//Math.ceil((time / PowerConfig.NormalTime)) * (time % PowerConfig.NormalTime);
            //计算现在的总量 
            const maxTime = (MaxPowerCount - currentPower) * PowerConfig.NormalTime;
            this.countDown.string = Util.Timer.conversionTime(maxTime - incremental, false)
            this._updateFillFull();
        }
    }

    public onFillFullClick() {
        if (MoneyManager.CheckMoney(CurrencyId.Coin, this.fillallPrice, true)) {
            M.tips.show(WaringTips.BuyOk);
            M.runtime.addCurrency(CurrencyId.Power, this.fullCount);
            this._initView();
            this.onCloseBtnClick();
        }
    }

    public onLittleClick() {
        this._doBottle(PropType.PowerBottle1);
    }

    public onBigClick() {
        this._doBottle(PropType.PowerBottle2);
    }

    private _doBottle(type: PropType) {
        const data: { count: number } = M.runtime.getPropData(type);
        const info = M.table.PropInfo.getByPrimaryKey(type);
        if (data && data.count > 0) {
            //直接使用!
            M.runtime.addCurrency(CurrencyId.Power, info.value);
            M.runtime.updatePropCount(type, -1);
            if (M.runtime.getCurrency(CurrencyId.Power) >= MaxPowerCount) {
                this.onCloseBtnClick();
            }
        } else {
            //直接购买!
            if (MoneyManager.CheckMoney(CurrencyId.Coin, info.price, true)) {
                M.tips.show(WaringTips.BuyOk);
                M.runtime.updatePropCount(type, 1);
            }
        }
        this._initView();
    }

}
