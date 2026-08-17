import UIBase from "../../../Base/UI/UIBase";
import { PropType, WaringTips } from "../../Data/Const/Constant";
import M from "../../../Base/Manager/M";
import PropInfo from "../../../Base/Tabls/PropInfo";
import Common from "../Common";
import { UIHudDef } from "../../Data/Interface/UIData";
import { CurrencyId } from '../../../Base/BaseConst';
import ReportMgr from "../../../Base/Manager/ReportMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuyPropPanel extends UIBase {

    @property(cc.Label)
    propName: cc.Label = null;

    @property(cc.Label)
    propDetail: cc.Label = null;

    @property(cc.Label)
    buyCount: cc.Label = null;

    @property(cc.Label)
    buyMoney: cc.Label = null;

    @property(cc.Label)
    havaCoinLab: cc.Label = null;

    @property(cc.Sprite)
    propIcon: cc.Sprite = null;

    @property(cc.Sprite)
    currencyIcon: cc.Sprite = null;

    @property([cc.SpriteFrame])
    propFrames: cc.SpriteFrame[] = [];

    @property([cc.SpriteFrame])
    currencyFrames: cc.SpriteFrame[] = [];

    private _type: PropType = null;
    private _buyCount: number = 1;
    private _buyMaxCount: number = 10;
    private _cfg: PropInfo = null;
    private _content: cc.Node = null;
    private _isRuning: boolean = false;
    private _originY: number = null;

    onLoad() {
        super.onLoad();
        this._content.on(cc.Node.EventType.POSITION_CHANGED, () => {
            if (!this._originY) {
                this._originY = this._content.y;
                this._playIn(null);
            }
        }, this);
    }

    public onInit(type: PropType) {
        this._buyCount = 1;
        this._content = this.node.getChildByName('content');
        this._initView(type);
    }

    public onShow() {
        if (this._originY) {
            this._playIn(null);
        }
    }

    private _initView(type: PropType) {
        this._type = type;
        this._cfg = M.table.PropInfo.getByPrimaryKey(type);
        if (this._cfg) {
            this.propName.string = this._cfg.name;
            this.propDetail.string = this._cfg.detail;
            this.propIcon.spriteFrame = this.propFrames[this._type - 100];
            this.currencyIcon.spriteFrame = this.currencyFrames[this._cfg.currencyType];
            this._updateView();
            this._updateBuyCount();
        }
    }

    private _updateView() {
        this.havaCoinLab.string = `当前金币:${M.runtime.getFormateCoin()}`;
    }

    public onAdd() {
        this._buyCount++;
        if (this._buyCount > this._buyMaxCount) {
            this._buyCount = this._buyMaxCount;
        }
        this._updateBuyCount();
    }

    public onSub() {
        this._buyCount--
        if (this._buyCount < 1) {
            this._buyCount = 1;
        }
        this._updateBuyCount();
    }

    public onCloseBtnClick() {
        if (!this._isRuning) {
            this._playOut(() => {
                M.ui.hideUI(UIHudDef.BuyProp)
            });
        }
    }

    public onBuy() {
        if (this._buyCount > 0) {
            const price = this._buyCount * this._cfg.price
            const currency = this._cfg.currencyType;

            if (price <= M.runtime.getCurrency(currency)) {
                M.runtime.addCurrency(currency, -price);
                M.runtime.updatePropCount(this._type, this._buyCount);
                M.tips.show(WaringTips.BuyOk);
                this._updateView();
                ReportMgr.ins.reportBuyProp(this._type, this._buyCount, M.runtime.getMatch3Level());
            } else {
                M.tips.show(`${Common.getCurrencyName(currency)}不够!`);
            }
        }
    }

    private _updateBuyCount() {
        this.buyCount.string = this._buyCount.toString();
        this.buyMoney.string = (this._buyCount * this._cfg.price).toString();
    }

    private _playIn(callback?: Function) {
        if (!this._isRuning) {
            this._content.y = this._originY - this._content.height;
            const a0 = cc.delayTime(0.0);
            const a1 = cc.moveTo(0.3, cc.v2(0, this._originY));
            const a2 = cc.callFunc(() => {
                callback && callback();
                this._isRuning = false;
            }, this)
            this._isRuning = true;
            this._content.runAction(cc.sequence(a0, a1, a2));
        }
    }

    private _playOut(callback?: Function) {
        if (!this._isRuning) {
            const a1 = cc.moveTo(0.3, cc.v2(0, this._originY - this._content.height))
            const a2 = cc.callFunc(() => {
                callback && callback();
                this._isRuning = false;
            }, this)
            this._isRuning = true;
            this._content.runAction(cc.sequence(a1, a2));
        }
    }

}


