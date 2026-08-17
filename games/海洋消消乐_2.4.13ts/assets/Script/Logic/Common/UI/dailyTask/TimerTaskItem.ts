import DailyTaskInfo from "../../../../Base/Tabls/DailyTaskInfo";
import { ConditionType, NativeKey } from "../../../Data/Const/Constant";
import { StorageMgr } from "../../../../Base/Manager/StorageMgr";
import M from "../../../../Base/Manager/M";
import { Event } from "../../../Data/Const/Event";
import { Util } from "../../../../Base/Utils/Util";
import { UIHudDef } from "../../../Data/Interface/UIData";

const { ccclass, property } = cc._decorator;

const DAILY_TASK_DATA_KEY = 'DAILY_TASK_DATA';


@ccclass
export default class TimerTaskItem extends cc.Component {

    @property(cc.Label)
    count: cc.Label = null;

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.Label)
    countDown: cc.Label = null;

    private _info: DailyTaskInfo = null;

    //目标主类型
    private _conditionType: string = null;

    private _active: boolean = false;

    private _isReceivd: boolean = false;

    private _isComplet: boolean = false;

    onLoad() {
        M.event.register(Event.DailyTask.UpdateProgress, this.updateProgress, this);
        M.event.register(Event.DailyTask.UpdateTimerTaskActive, this.updateActive, this);
    }

    onDestroy() {
        M.event.unRegister(Event.DailyTask.UpdateProgress, this.updateProgress, this);
        M.event.unRegister(Event.DailyTask.UpdateTimerTaskActive, this.updateActive, this);
    }


    public init(info: DailyTaskInfo, iconFrame: cc.SpriteFrame) {

        this._info = info;
        this._conditionType = info.conditionType;
        this.icon.spriteFrame = iconFrame;
        this.icon.node.scale = 70 / this.icon.node.height;
        this.count.string = `x${info.rewards[0].count}`;

        this.updateActive();
    }

    public updateActive() {
        //是否开启
        this._active = false;
        const data: { isReceivd: boolean } = StorageMgr.RingStorage.day().getValue(DAILY_TASK_DATA_KEY, {})[this._info.id];
        if (data) {
            this._isReceivd = data.isReceivd;
            if (this._isReceivd) {
                this.countDown.string = '领完'
            }
        }
        const preIndex = this._info.id - 1;
        const preData = StorageMgr.RingStorage.day().getValue(DAILY_TASK_DATA_KEY, {})[preIndex];
        if (preIndex < 1 || (preData && preData.isReceivd)) {
            if (!this._isReceivd) {
                this._active = true;
                this.countDown.node.active = true;
            }
        } else {
            this.countDown.node.active = false;
        }
    }

    public onClick() {
        if (this._isComplet && !this._isReceivd) {
            //领取奖励 
            M.ui.showUI(UIHudDef.OpenBox, { config: { rewards: this._info.rewards }, text: '挂机奖励!', isHideBox: true });
            //重置状态
            M.runtime.setDailyTime(0);
            let datas = StorageMgr.RingStorage.day().getValue(DAILY_TASK_DATA_KEY, {});
            this._isReceivd = true;
            datas[this._info.id] = { isReceivd: true };
            StorageMgr.RingStorage.day().setValue(DAILY_TASK_DATA_KEY, datas);
            //开启下一个!
            M.event.send(Event.DailyTask.UpdateTimerTaskActive);
        }
    }

    private updateProgress(type: string) {
        if (type == this._conditionType && this._active) {
            const num = this._info.condition - M.runtime.DailyTime;
            if (num < 0) {
                this._isComplet = true;
                this.countDown.string = '待领取'
            } else {
                this.countDown.string = Util.Timer.conversionTime(num);
            }
        }
    }

}
