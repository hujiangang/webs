import UIBase from "../../../../Base/UI/UIBase";
import M from "../../../../Base/Manager/M";
import { UIHudDef } from "../../../Data/Interface/UIData";
import DailyTaskInfo from "../../../../Base/Tabls/DailyTaskInfo";
import DailyItem from "./DailyItem";
import TimerTaskItem from "./TimerTaskItem";
import { Event } from "../../../Data/Const/Event";
import { Util } from "../../../../Base/Utils/Util";
import CustomTaskItem from "./CustomTaskItem";
import DailyTaskMgr from "../../../../Base/Manager/DailyTaskMgr";


const { ccclass, property } = cc._decorator;

@ccclass
export default class DailyTaskPanel extends UIBase {

    @property(cc.Node)
    customContent: cc.Node = null;

    @property(cc.Node)
    dailyContent: cc.Node = null;

    @property(cc.Node)
    monthContent: cc.Node = null;

    @property(cc.Node)
    timerContent: cc.Node = null;

    @property(cc.Node)
    dailyNode: cc.Node = null;

    @property(cc.Node)
    monthNode: cc.Node = null;

    @property(cc.Label)
    customCountDown: cc.Label = null;

    @property(cc.Label)
    dailyCountDown: cc.Label = null;

    @property(cc.Label)
    monthCountDown: cc.Label = null;

    @property(cc.Prefab)
    customItemPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    timerItemPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    dailyItemPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    monthItemPrefab: cc.Prefab = null;

    @property([cc.SpriteFrame])
    rewardIconFrames: cc.SpriteFrame[] = [];

    private _customProgressPool: Array<{ data: DailyTaskInfo, node: cc.Node }> = [];

    private _customProgress = null;

    private _isCanUpdateRemoteData = true;

    onLoad() {
        M.event.register(Event.DailyTask.UpdateProgress, this._onTimerTick, this);
        M.event.register(Event.DailyTask.UpdateTaskKey, this._onUpdateTaskKey, this)
    }

    onDestroy() {
        M.event.unRegister(Event.DailyTask.UpdateProgress, this._onTimerTick, this);
        M.event.unRegister(Event.DailyTask.UpdateTaskKey, this._onUpdateTaskKey, this)
    }

    public onShow() {
        super.onShow()
        this._isCanUpdateRemoteData = true;
    }

    public onInit() {
        const datas = M.table.DailyTaskInfo.getData();
        const isNeedCreateCustomItem: boolean = this.customContent.children.length === 0;

        this.timerContent.removeAllChildren();
        this.dailyContent.removeAllChildren();
        this.monthContent.removeAllChildren();

        for (let i = 0; i < datas.length; i++) {
            const data = datas[i];
            //初始化显示!
            isNeedCreateCustomItem && this._initCustomTask(data);
            this._initDailyTask(data);
            this._initMonthTask(data);
        }
        this.scheduleOnce(this._delayInitTask.bind(this), 0.2);
        this._updateCountDown();
    }

    private _initCustomTask(data) {
        if (data.type == 4) {
            const node = M.nodePool.createItem(this.customItemPrefab);
            node.parent = this.customContent;
            node.getComponent(CustomTaskItem).init(data, this._getIconByType(data.rewards[0].type));
            this._customProgressPool.push({ data, node });
        }
    }

    private _updateCountDown() {
        if (this.node.active && M.runtime.DailyTaskProgress && M.runtime.DailyTaskProgress.expires) {
            const now = (Date.now() / 1000) >> 0;
            const dailyCountDown = M.runtime.DailyTaskProgress.expires.daily - now;
            this.dailyCountDown.string = Util.Timer.conversionTime(dailyCountDown);
            this.monthCountDown.string = Util.Timer.conversionTime(M.runtime.DailyTaskProgress.expires.monthly - now);
            this.customCountDown.string = Util.Timer.conversionTime(M.runtime.DailyTaskProgress.expires.custom - now);
            if (dailyCountDown < 0 && this._isCanUpdateRemoteData) {
                //重新更新进度信息! 
                this._isCanUpdateRemoteData = false;
                this.scheduleOnce(() => {
                    M.net.getDailyTask().then((res) => {
                        M.runtime.DailyTaskProgress = res;
                        M.runtime.initTaskNativeData();
                        this.customContent.removeAllChildren();
                        this._customProgress.parent = this.customContent.parent.parent;
                        this._customProgress.active = false;
                        this._customProgress = null;
                        this.customContent.getComponent(cc.Layout).enabled = true;
                        this.onInit();
                    });
                }, 1)
            }
        }
    }

    private _delayInitTask() {

        this.customContent.getComponent(cc.Layout).enabled = false;
        if (!this._customProgress) {
            this._customProgress = this.customContent.parent.parent.getChildByName('keyProgress');
            this._customProgress.parent = this.customContent;
        }
        this._customProgress.active = true;
        this._customProgress.x = 21
        this._customProgress.y = -58;
        this._customProgress.width = this.customContent.width - 50;
        this._onUpdateTaskKey();
    }

    private _initTimerTask(data) {
        if (data.type == 1) {
            const node = M.nodePool.createItem(this.timerItemPrefab);
            node.parent = this.timerContent;
            node.getComponent(TimerTaskItem).init(data, this._getIconByType(data.rewards[0].type));
        }
    }

    private _initDailyTask(data) {
        if (data.type == 2) {
            const node = M.nodePool.createItem(this.dailyItemPrefab);
            node.parent = this.dailyContent;
            node.getComponent(DailyItem).init(data, this._getIconByType(data.rewards[0].type));
        } else {
            this._initTimerTask(data);
        }
    }

    private _initMonthTask(data) {
        if (data.type == 3) {
            const node = M.nodePool.createItem(this.dailyItemPrefab);
            node.parent = this.monthContent;
            node.getComponent(DailyItem).init(data, this._getIconByType(data.rewards[0].type));
        }
    }

    public onCloseBtnClick() { 
        M.ui.hideUI(UIHudDef.DailyTaskPanel);
    }

    private _onUpdateTaskKey() {
        ///更新进度条!
        let lastData = this._customProgressPool[this._customProgressPool.length - 1].data;
        const unit = this._customProgress.width / lastData.condition
        this._customProgress.getChildByName('bar').width = unit * DailyTaskMgr.ins.getDailyTaskKey();
        this._customProgress.getChildByName('label').getComponent(cc.Label).string = DailyTaskMgr.ins.getDailyTaskKey()
    }

    public onChangeTaskTypeClick(event) {
        switch (event.node.name) {
            case 'daily':
                this.dailyNode.active = true;
                this.monthNode.active = false;
                break;
            case 'monty':
                this.dailyNode.active = false;
                this.monthNode.active = true;
                break;
        }
    }

    private _getIconByType(type): cc.SpriteFrame {
        let frame = null;
        if (type < 100) {
            frame = this.rewardIconFrames[20 + type];
        } else {
            frame = this.rewardIconFrames[type - 100];
        }
        return frame;
    }

    private _onTimerTick() {
        this._updateCountDown();
    }


}
