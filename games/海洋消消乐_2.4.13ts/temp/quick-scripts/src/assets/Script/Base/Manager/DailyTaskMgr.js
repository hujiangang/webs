"use strict";
cc._RF.push(module, '3d8b4oG/jJBYpfbGJ11NqzC', 'DailyTaskMgr');
// Script/Base/Manager/DailyTaskMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constant_1 = require("../../Logic/Data/Const/Constant");
var M_1 = require("./M");
var StorageMgr_1 = require("./StorageMgr");
var Event_1 = require("../../Logic/Data/Const/Event");
var DailyTaskMgr = /** @class */ (function () {
    function DailyTaskMgr() {
    }
    Object.defineProperty(DailyTaskMgr, "ins", {
        get: function () {
            if (!this._instance) {
                this._instance = new DailyTaskMgr();
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    DailyTaskMgr.prototype.syncPro2Ser = function (key, subType, dailyCount, monthCount) {
        //增加的类型中如果有任务满足条件!????
        var type = this._getConditionTypeByNatieKey(key);
        //类型 收集 
        if (type && M_1.default.table.DailyTaskInfo) {
            var infos = M_1.default.table.DailyTaskInfo.getData();
            for (var i = 0; i < infos.length; i++) {
                var info = infos[i];
                //匹配主要类型,
                if (info.conditionType == type) {
                    //匹配子类型!
                    if (!info.conditionSubType || info.conditionSubType == subType) {
                        if (info.type == 2 || info.type == 3) {
                            var count = info.type == 2 ? dailyCount : monthCount;
                            if (count <= info.condition) {
                                M_1.default.net.putDailyTaskProgress(info.id, count);
                            }
                        }
                    }
                }
            }
        }
    };
    DailyTaskMgr.prototype.receiveOK = function (taskid) {
        M_1.default.net.putDailyTaskProgress(taskid, -1);
    };
    DailyTaskMgr.prototype.syncPro2Native = function (propgress) {
        console.error('开始同步数据到本地!');
        if (propgress && M_1.default.table.DailyTaskInfo) {
            for (var taskId in propgress) {
                var count = propgress[taskId];
                var info = M_1.default.table.DailyTaskInfo.getByPrimaryKey(Number(taskId));
                var ringStr = ['day', 'month'][info.type - 2];
                if (ringStr) {
                    var key = this._getNativeKeyByConditionType(info.conditionType, info.type);
                    var data = null;
                    if (info.conditionSubType) {
                        data = StorageMgr_1.StorageMgr.RingStorage[ringStr]().getValue(key, {});
                        data[info.conditionSubType] = count;
                    }
                    else {
                        data = count;
                    }
                    StorageMgr_1.StorageMgr.RingStorage[ringStr]().setValue(key, data);
                }
            }
        }
        else {
            for (var i = Constant_1.NativeKey.DailyCollect; i <= Constant_1.NativeKey.UsePropCount; i++) {
                var key = Constant_1.NativeKey[i];
                StorageMgr_1.StorageMgr.RingStorage.day().deleteValue(key);
                StorageMgr_1.StorageMgr.RingStorage.month().deleteValue(key);
            }
        }
    };
    DailyTaskMgr.prototype._getNativeKeyByConditionType = function (conditionType, type) {
        var result = null;
        switch (conditionType) {
            case Constant_1.ConditionType.collect:
                result = Constant_1.NativeKey.DailyCollect;
                break;
            case Constant_1.ConditionType.doprop:
                result = Constant_1.NativeKey.DailyUsePropCount;
                break;
            case Constant_1.ConditionType.gameCount:
                result = Constant_1.NativeKey.DailyGameCount;
                break;
            case Constant_1.ConditionType.merge:
                result = Constant_1.NativeKey.DailyMerge;
                break;
        }
        if (result && type == 3) {
            result += 1;
        }
        return result;
    };
    DailyTaskMgr.prototype._getConditionTypeByNatieKey = function (key) {
        var type = null;
        if (key >= Constant_1.NativeKey.DailyCollect && key < Constant_1.NativeKey.Collect) {
            type = Constant_1.ConditionType.collect;
            //类型 合成
        }
        else if (key >= Constant_1.NativeKey.DailyMerge && key < Constant_1.NativeKey.Merge) {
            type = Constant_1.ConditionType.merge;
            //类型 游戏次数
        }
        else if (key >= Constant_1.NativeKey.DailyGameCount && key < Constant_1.NativeKey.GameCount) {
            type = Constant_1.ConditionType.gameCount;
            //类型 使用道具
        }
        else if (key >= Constant_1.NativeKey.DailyUsePropCount && key < Constant_1.NativeKey.UsePropCount) {
            type = Constant_1.ConditionType.doprop;
        }
        return type;
    };
    DailyTaskMgr.prototype.addDailyTaskKey = function (num) {
        var count = this.getDailyTaskKey() + num;
        StorageMgr_1.StorageMgr.Storage.setInt(Constant_1.NativeKey.CurrencyTaskKey, count, true);
        M_1.default.event.send(Event_1.Event.DailyTask.UpdateTaskKey, count);
        return count;
    };
    DailyTaskMgr.prototype.getDailyTaskKey = function () {
        return StorageMgr_1.StorageMgr.Storage.getInt(Constant_1.NativeKey.CurrencyTaskKey, 0);
    };
    DailyTaskMgr._instance = null;
    return DailyTaskMgr;
}());
exports.default = DailyTaskMgr;

cc._RF.pop();