import DailyTaskInfo from "../../../../Base/Tabls/DailyTaskInfo";
import DailyTaskMgr from "../../../../Base/Manager/DailyTaskMgr";
import M from "../../../../Base/Manager/M";
import { Event } from "../../../Data/Const/Event";
import { UIHudDef } from "../../../Data/Interface/UIData";
import { StorageMgr } from "../../../../Base/Manager/StorageMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CustomTaskItem extends cc.Component {

    @property(cc.Label)
    count: cc.Label = null;

    @property(cc.Label)
    stateLabel: cc.Label = null;

    @property(cc.Sprite)
    icon: cc.Sprite = null;

    private _isReceivd: boolean = false;

    private _isComplet: boolean = false;

    private _info: DailyTaskInfo = null;

    onLoad() {
        M.event.register(Event.DailyTask.UpdateTaskKey, this._onUpdateTaskKey, this)
    }

    start() {
        M.event.unRegister(Event.DailyTask.UpdateTaskKey, this._onUpdateTaskKey, this)
    }

    public init(info: DailyTaskInfo, iconFrame: cc.SpriteFrame) {
        this._info = info;

        this.icon.spriteFrame = iconFrame;
        this.icon.node.scale = 60 / this.icon.node.height;
        this.count.string = info.rewards[0].count.toString();

        this._isComplet = info.condition >= DailyTaskMgr.ins.getDailyTaskKey();
        if (M.runtime.DailyTaskProgress.progress && M.runtime.DailyTaskProgress.progress[this._info.id] == -1) {
            this._isReceivd = true;
        }
        this._isComplet = (DailyTaskMgr.ins.getDailyTaskKey() >= this._info.condition)
        if (this._isComplet) {
            this.stateLabel.node.active = true;
            if (this._isReceivd) {
                this.stateLabel.string = '已领取'
            } else {
                this.stateLabel.string = '待领取'
            }
        } else {
            this.stateLabel.node.active = false;
        }
    }

    public onClick() {
        if (this._isComplet && !this._isReceivd) {
            //領取獎勵!
            M.ui.showUI(UIHudDef.OpenBox, { config: { rewards: this._info.rewards }, text: '挂机奖励!', isHideBox: true });
            DailyTaskMgr.ins.receiveOK(this._info.id);
            M.runtime.DailyTaskProgress.progress[this._info.id] = -1
            this._isReceivd = true;
            this.stateLabel.string = '已领取'
        }
    }

    private _onUpdateTaskKey(count) {
        if (count >= this._info.condition && !this._isReceivd) {
            this._isComplet = true;
            //show complet state
            this.stateLabel.node.active = true;
            this.stateLabel.string = '待领取'
        }
    }

}
