
import { NativeKey, ConditionType } from "../../Logic/Data/Const/Constant";
import M from "./M";
import { StorageMgr } from "./StorageMgr";
import { Event } from "../../Logic/Data/Const/Event";

export default class DailyTaskMgr {

    private static _instance: DailyTaskMgr = null;

    public static get ins() {
        if (!this._instance) {
            this._instance = new DailyTaskMgr();
        }
        return this._instance;
    }

    public syncPro2Ser(key: NativeKey, subType?: any, dailyCount?: number, monthCount?: number) {
        //增加的类型中如果有任务满足条件!????
        let type = this._getConditionTypeByNatieKey(key);
        //类型 收集 
        if (type && M.table.DailyTaskInfo) {
            const infos = M.table.DailyTaskInfo.getData();
            for (let i = 0; i < infos.length; i++) {
                const info = infos[i];
                //匹配主要类型,
                if (info.conditionType == type) {
                    //匹配子类型!
                    if (!info.conditionSubType || info.conditionSubType == subType) {
                        if (info.type == 2 || info.type == 3) {
                            const count = info.type == 2 ? dailyCount : monthCount;
                            if (count <= info.condition) {
                                M.net.putDailyTaskProgress(info.id, count);
                            }
                        }
                    }
                }
            }
        }
    }

    public receiveOK(taskid) {
        M.net.putDailyTaskProgress(taskid, -1);
    }

    public syncPro2Native(propgress: { [key: number]: number }) {
        console.error('开始同步数据到本地!');
        if (propgress && M.table.DailyTaskInfo) {
            for (const taskId in propgress) {
                const count = propgress[taskId];
                const info = M.table.DailyTaskInfo.getByPrimaryKey(Number(taskId));
                const ringStr = ['day', 'month'][info.type - 2];
                if (ringStr) {
                    const key = this._getNativeKeyByConditionType(info.conditionType, info.type);
                    let data = null;
                    if (info.conditionSubType) {
                        data = StorageMgr.RingStorage[ringStr]().getValue(key, {});
                        data[info.conditionSubType] = count;
                    } else {
                        data = count;
                    }
                    StorageMgr.RingStorage[ringStr]().setValue(key, data);
                }
            }
        } else {
            for (let i = NativeKey.DailyCollect; i <= NativeKey.UsePropCount; i++) {
                const key = NativeKey[i];
                StorageMgr.RingStorage.day().deleteValue(key);
                StorageMgr.RingStorage.month().deleteValue(key);
            }
        }
    }

    private _getNativeKeyByConditionType(conditionType: string, type: number) {
        let result = null;
        switch (conditionType) {
            case ConditionType.collect:
                result = NativeKey.DailyCollect;
                break;
            case ConditionType.doprop:
                result = NativeKey.DailyUsePropCount;
                break;
            case ConditionType.gameCount:
                result = NativeKey.DailyGameCount;
                break;
            case ConditionType.merge:
                result = NativeKey.DailyMerge;
                break;
        }
        if (result && type == 3) {
            result += 1;
        }
        return result;
    }

    private _getConditionTypeByNatieKey(key) {
        let type = null;
        if (key >= NativeKey.DailyCollect && key < NativeKey.Collect) {
            type = ConditionType.collect;
            //类型 合成
        } else if (key >= NativeKey.DailyMerge && key < NativeKey.Merge) {
            type = ConditionType.merge;
            //类型 游戏次数
        } else if (key >= NativeKey.DailyGameCount && key < NativeKey.GameCount) {
            type = ConditionType.gameCount;
            //类型 使用道具
        } else if (key >= NativeKey.DailyUsePropCount && key < NativeKey.UsePropCount) {
            type = ConditionType.doprop;
        }
        return type;
    }

    public addDailyTaskKey(num: number) {
        const count = this.getDailyTaskKey() + num;
        StorageMgr.Storage.setInt(NativeKey.CurrencyTaskKey, count, true);
        M.event.send(Event.DailyTask.UpdateTaskKey, count);
        return count;
    }

    public getDailyTaskKey() {
        return StorageMgr.Storage.getInt(NativeKey.CurrencyTaskKey, 0);
    }

}