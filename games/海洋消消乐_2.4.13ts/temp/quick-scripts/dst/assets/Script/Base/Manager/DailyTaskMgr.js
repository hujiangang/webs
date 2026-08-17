
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/DailyTaskMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxEYWlseVRhc2tNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw0REFBMkU7QUFDM0UseUJBQW9CO0FBQ3BCLDJDQUEwQztBQUMxQyxzREFBcUQ7QUFFckQ7SUFBQTtJQXFIQSxDQUFDO0lBakhHLHNCQUFrQixtQkFBRzthQUFyQjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7YUFDdkM7WUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFTSxrQ0FBVyxHQUFsQixVQUFtQixHQUFjLEVBQUUsT0FBYSxFQUFFLFVBQW1CLEVBQUUsVUFBbUI7UUFDdEYsc0JBQXNCO1FBQ3RCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqRCxRQUFRO1FBQ1IsSUFBSSxJQUFJLElBQUksV0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7WUFDL0IsSUFBTSxLQUFLLEdBQUcsV0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDOUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsU0FBUztnQkFDVCxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxFQUFFO29CQUM1QixRQUFRO29CQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLE9BQU8sRUFBRTt3QkFDNUQsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJ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QUMsZUFBZSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQzNDLHVCQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxvQkFBUyxDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEUsV0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVNLHNDQUFlLEdBQXRCO1FBQ0ksT0FBTyx1QkFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsb0JBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQWpIYyxzQkFBUyxHQUFpQixJQUFJLENBQUM7SUFtSGxELG1CQUFDO0NBckhELEFBcUhDLElBQUE7a0JBckhvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBOYXRpdmVLZXksIENvbmRpdGlvblR5cGUgfSBmcm9tIFwiLi4vLi4vTG9naWMvRGF0YS9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IE0gZnJvbSBcIi4vTVwiO1xuaW1wb3J0IHsgU3RvcmFnZU1nciB9IGZyb20gXCIuL1N0b3JhZ2VNZ3JcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL0xvZ2ljL0RhdGEvQ29uc3QvRXZlbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFpbHlUYXNrTWdyIHtcblxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRGFpbHlUYXNrTWdyID0gbnVsbDtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGlucygpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgRGFpbHlUYXNrTWdyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzeW5jUHJvMlNlcihrZXk6IE5hdGl2ZUtleSwgc3ViVHlwZT86IGFueSwgZGFpbHlDb3VudD86IG51bWJlciwgbW9udGhDb3VudD86IG51bWJlcikge1xuICAgICAgICAvL+WinuWKoOeahOexu+Wei+S4reWmguaenOacieS7u+WKoea7oei2s+adoeS7tiE/Pz8/XG4gICAgICAgIGxldCB0eXBlID0gdGhpcy5fZ2V0Q29uZGl0aW9uVHlwZUJ5TmF0aWVLZXkoa2V5KTtcbiAgICAgICAgLy/nsbvlnosg5pS26ZuGIFxuICAgICAgICBpZiAodHlwZSAmJiBNLnRhYmxlLkRhaWx5VGFza0luZm8pIHtcbiAgICAgICAgICAgIGNvbnN0IGluZm9zID0gTS50YWJsZS5EYWlseVRhc2tJbmZvLmdldERhdGEoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5mb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmZvID0gaW5mb3NbaV07XG4gICAgICAgICAgICAgICAgLy/ljLnphY3kuLvopoHnsbvlnossXG4gICAgICAgICAgICAgICAgaWYgKGluZm8uY29uZGl0aW9uVHlwZSA9PSB0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8v5Yy56YWN5a2Q57G75Z6LIVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWluZm8uY29uZGl0aW9uU3ViVHlwZSB8fCBpbmZvLmNvbmRpdGlvblN1YlR5cGUgPT0gc3ViVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8udHlwZSA9PSAyIHx8IGluZm8udHlwZSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY291bnQgPSBpbmZvLnR5cGUgPT0gMiA/IGRhaWx5Q291bnQgOiBtb250aENvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA8PSBpbmZvLmNvbmRpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNLm5ldC5wdXREYWlseVRhc2tQcm9ncmVzcyhpbmZvLmlkLCBjb3VudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHJlY2VpdmVPSyh0YXNraWQpIHtcbiAgICAgICAgTS5uZXQucHV0RGFpbHlUYXNrUHJvZ3Jlc3ModGFza2lkLCAtMSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN5bmNQcm8yTmF0aXZlKHByb3BncmVzczogeyBba2V5OiBudW1iZXJdOiBudW1iZXIgfSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCflvIDlp4vlkIzmraXmlbDmja7liLDmnKzlnLAhJyk7XG4gICAgICAgIGlmIChwcm9wZ3Jlc3MgJiYgTS50YWJsZS5EYWlseVRhc2tJbmZvKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRhc2tJZCBpbiBwcm9wZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IHByb3BncmVzc1t0YXNrSWRdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZm8gPSBNLnRhYmxlLkRhaWx5VGFza0luZm8uZ2V0QnlQcmltYXJ5S2V5KE51bWJlcih0YXNrSWQpKTtcbiAgICAgICAgICAgICAgICBjb25zdCByaW5nU3RyID0gWydkYXknLCAnbW9udGgnXVtpbmZvLnR5cGUgLSAyXTtcbiAgICAgICAgICAgICAgICBpZiAocmluZ1N0cikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSB0aGlzLl9nZXROYXRpdmVLZXlCeUNvbmRpdGlvblR5cGUoaW5mby5jb25kaXRpb25UeXBlLCBpbmZvLnR5cGUpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLmNvbmRpdGlvblN1YlR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBTdG9yYWdlTWdyLlJpbmdTdG9yYWdlW3JpbmdTdHJdKCkuZ2V0VmFsdWUoa2V5LCB7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2luZm8uY29uZGl0aW9uU3ViVHlwZV0gPSBjb3VudDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBjb3VudDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBTdG9yYWdlTWdyLlJpbmdTdG9yYWdlW3JpbmdTdHJdKCkuc2V0VmFsdWUoa2V5LCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gTmF0aXZlS2V5LkRhaWx5Q29sbGVjdDsgaSA8PSBOYXRpdmVLZXkuVXNlUHJvcENvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBOYXRpdmVLZXlbaV07XG4gICAgICAgICAgICAgICAgU3RvcmFnZU1nci5SaW5nU3RvcmFnZS5kYXkoKS5kZWxldGVWYWx1ZShrZXkpO1xuICAgICAgICAgICAgICAgIFN0b3JhZ2VNZ3IuUmluZ1N0b3JhZ2UubW9udGgoKS5kZWxldGVWYWx1ZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0TmF0aXZlS2V5QnlDb25kaXRpb25UeXBlKGNvbmRpdGlvblR5cGU6IHN0cmluZywgdHlwZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKGNvbmRpdGlvblR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgQ29uZGl0aW9uVHlwZS5jb2xsZWN0OlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IE5hdGl2ZUtleS5EYWlseUNvbGxlY3Q7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENvbmRpdGlvblR5cGUuZG9wcm9wOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IE5hdGl2ZUtleS5EYWlseVVzZVByb3BDb3VudDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ29uZGl0aW9uVHlwZS5nYW1lQ291bnQ6XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gTmF0aXZlS2V5LkRhaWx5R2FtZUNvdW50O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDb25kaXRpb25UeXBlLm1lcmdlOlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IE5hdGl2ZUtleS5EYWlseU1lcmdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHQgJiYgdHlwZSA9PSAzKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldENvbmRpdGlvblR5cGVCeU5hdGllS2V5KGtleSkge1xuICAgICAgICBsZXQgdHlwZSA9IG51bGw7XG4gICAgICAgIGlmIChrZXkgPj0gTmF0aXZlS2V5LkRhaWx5Q29sbGVjdCAmJiBrZXkgPCBOYXRpdmVLZXkuQ29sbGVjdCkge1xuICAgICAgICAgICAgdHlwZSA9IENvbmRpdGlvblR5cGUuY29sbGVjdDtcbiAgICAgICAgICAgIC8v57G75Z6LIOWQiOaIkFxuICAgICAgICB9IGVsc2UgaWYgKGtleSA+PSBOYXRpdmVLZXkuRGFpbHlNZXJnZSAmJiBrZXkgPCBOYXRpdmVLZXkuTWVyZ2UpIHtcbiAgICAgICAgICAgIHR5cGUgPSBDb25kaXRpb25UeXBlLm1lcmdlO1xuICAgICAgICAgICAgLy/nsbvlnosg5ri45oiP5qyh5pWwXG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID49IE5hdGl2ZUtleS5EYWlseUdhbWVDb3VudCAmJiBrZXkgPCBOYXRpdmVLZXkuR2FtZUNvdW50KSB7XG4gICAgICAgICAgICB0eXBlID0gQ29uZGl0aW9uVHlwZS5nYW1lQ291bnQ7XG4gICAgICAgICAgICAvL+exu+WeiyDkvb/nlKjpgZPlhbdcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPj0gTmF0aXZlS2V5LkRhaWx5VXNlUHJvcENvdW50ICYmIGtleSA8IE5hdGl2ZUtleS5Vc2VQcm9wQ291bnQpIHtcbiAgICAgICAgICAgIHR5cGUgPSBDb25kaXRpb25UeXBlLmRvcHJvcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkRGFpbHlUYXNrS2V5KG51bTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGNvdW50ID0gdGhpcy5nZXREYWlseVRhc2tLZXkoKSArIG51bTtcbiAgICAgICAgU3RvcmFnZU1nci5TdG9yYWdlLnNldEludChOYXRpdmVLZXkuQ3VycmVuY3lUYXNrS2V5LCBjb3VudCwgdHJ1ZSk7XG4gICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5EYWlseVRhc2suVXBkYXRlVGFza0tleSwgY291bnQpO1xuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhaWx5VGFza0tleSgpIHtcbiAgICAgICAgcmV0dXJuIFN0b3JhZ2VNZ3IuU3RvcmFnZS5nZXRJbnQoTmF0aXZlS2V5LkN1cnJlbmN5VGFza0tleSwgMCk7XG4gICAgfVxuXG59Il19