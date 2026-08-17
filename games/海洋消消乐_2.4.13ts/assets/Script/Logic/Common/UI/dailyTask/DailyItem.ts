import DailyTaskInfo from "../../../../Base/Tabls/DailyTaskInfo";
import M from "../../../../Base/Manager/M";
import { Event } from "../../../Data/Const/Event";
import { ConditionType, NativeKey } from "../../../Data/Const/Constant";
import { StorageMgr } from "../../../../Base/Manager/StorageMgr";
import DailyTaskMgr from "../../../../Base/Manager/DailyTaskMgr";
import { UIHudDef } from "../../../Data/Interface/UIData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DailyItem extends cc.Component {

    @property(cc.Sprite)
    bg: cc.Sprite = null;

    @property(cc.Label)
    nameLab: cc.Label = null;

    @property(cc.Label)
    count: cc.Label = null;

    @property(cc.Label)
    progressLab: cc.Label = null;

    @property(cc.Label)
    stateLab: cc.Label = null;

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    @property(cc.ProgressBar)
    progress: cc.ProgressBar = null;

    private _info: DailyTaskInfo = null;

    //目标主类型
    private _conditionType: any = null;
    //目标子类型
    private _conditionSubType: any = null;
    //是否完成
    private _isComplet: boolean = false;
    //是否领取
    private _isReceivd: boolean = false;


    onLoad() {

    }

    onDestroy() {

    }

    public init(info: DailyTaskInfo, icon: cc.SpriteFrame) {
        this._info = info;

        this.count.string = `x${info.rewards[0].count}`;
        this.icon.spriteFrame = icon;
        this.nameLab.string = info.name;

        this._parseCondition();
        this._updateProgress();
    }

    private _parseCondition() {
        this._conditionType = this._info.conditionType;
        this._conditionSubType = this._info.conditionSubType;
    }

    private _updateProgress() {
        let count = this._getConditionCount();
        let max = this._info.condition;
        count = count == -1 ? max : count
        this.progress.progress = count / max;
        this.progressLab.string = `${count > max ? max : count}/${max}`
        const data = M.runtime.DailyTaskProgress.progress ? M.runtime.DailyTaskProgress.progress[this._info.id] : null;
        if (data == -1 || count >= this._info.condition) {
            //满足要求!
            this._isComplet = true;
            this.stateLab.node.active = true;
            if (data == -1) {
                this._isReceivd = true;
                this.stateLab.string = '已领取!';
            } else {
                this.stateLab.string = '待领取!';
            }
        } else {
            this.stateLab.node.active = false;
        }
    }

    public onClick() {
        //判断当前是否可以完成任务.
        if (this._isComplet && !this._isReceivd) {
            M.net.checkTaskIsOK(this._info.id).then(result => {
                if (result) {

                    M.ui.showUI(UIHudDef.OpenBox, { config: { rewards: this._info.rewards }, isHideBox: true, text: this._info.type == 2 ? '日任務獎勵!' : '月任務獎勵!' });

                    //发放奖励!  
                    this.stateLab.string = '已领取!';
                    this._isReceivd = true;
                    M.runtime.DailyTaskProgress[this._info.id] = -1;
                    DailyTaskMgr.ins.receiveOK(this._info.id);
                }
            });
        }
    }

    private _getConditionCount() {
        let count = 0;
        const dateStr = ['day', 'month'][this._info.type - 2];
        let key = null;
        switch (this._conditionType) {
            case ConditionType.collect:
                key = [NativeKey.DailyCollect, NativeKey.MonthCollect][this._info.type - 2];
                const cd = StorageMgr.RingStorage[dateStr]().getValue(key, null);
                if (cd) {
                    count = cd[this._conditionSubType] || 0;
                }
                break;
            case ConditionType.merge:
                key = [NativeKey.DailyMerge, NativeKey.MonthMerge][this._info.type - 2];
                const md = StorageMgr.RingStorage[dateStr]().getValue(key, null);
                if (md) {
                    count = md[this._conditionSubType] || 0;
                }
                break;
            case ConditionType.doprop:
                key = [NativeKey.DailyUsePropCount, NativeKey.MonthUsePropCount][this._info.type - 2];
                count = StorageMgr.RingStorage[dateStr]().getValue(key, 0);
                break;
            case ConditionType.gameCount:
                key = [NativeKey.DailyGameCount, NativeKey.MonthGameCount][this._info.type - 2];
                count = StorageMgr.RingStorage[dateStr]().getValue(key, 0);
                break;
        }
        return count;
    }


}
