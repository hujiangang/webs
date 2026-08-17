
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/CacheMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '63603frOBBDxLHcQmZID8Bb', 'CacheMgr');
// Script/Base/Manager/CacheMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = require("../Utils/Log");
var LRUCache_1 = require("../Utils/LRUCache");
var EventMgr_1 = require("./EventMgr");
var SingletonFactory_1 = require("../Utils/SingletonFactory");
var Event_1 = require("../../Logic/Data/Const/Event");
var CacheMgr = /** @class */ (function () {
    function CacheMgr() {
        this.lru = new LRUCache_1.LRUCache(300); //内存中存在的缓存资源数的警告值
        var self = this;
        cc.loader['_cache'] = new Proxy(cc.loader['_cache'], {
            get: function (target, property) {
                if (property in target) {
                    self.getCache(property, target[property]);
                    return target[property];
                }
            },
            set: function (target, property, value) {
                self.setCache(property, value);
                target[property] = value;
                return true;
            },
            deleteProperty: function (target, property) {
                self.deleteCache(property, target[property]) &&
                    delete target[property];
                return true;
            }
        });
    }
    CacheMgr.prototype.getCache = function (property, cache) {
        Log_1.Log.log(Log_1.LOG_TAG.CACHE, property);
        this.lru.get(property);
    };
    CacheMgr.prototype.setCache = function (property, cache) {
        Log_1.Log.log(Log_1.LOG_TAG.CACHE, property);
        var remove = this.lru.pack(property, cache);
        if (remove) {
            EventMgr_1.default.ins.send(Event_1.Event.System.CacheWarning);
        }
    };
    CacheMgr.prototype.deleteCache = function (property, cache) {
        Log_1.Log.log(Log_1.LOG_TAG.CACHE, property);
        this.lru.remove(property);
        return true;
    };
    CacheMgr.ins = SingletonFactory_1.SingletonFactory.getInstance(CacheMgr);
    return CacheMgr;
}());
exports.default = CacheMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxDYWNoZU1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9DQUE0QztBQUM1Qyw4Q0FBNkM7QUFDN0MsdUNBQWtDO0FBQ2xDLDhEQUE2RDtBQUM3RCxzREFBcUQ7QUFFckQ7SUFNSTtRQUpRLFFBQUcsR0FBYSxJQUFJLG1CQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7UUFLeEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNqRCxHQUFHLFlBQUMsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLElBQUksUUFBUSxJQUFJLE1BQU0sRUFBRTtvQkFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzFDLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUMzQjtZQUNMLENBQUM7WUFDRCxHQUFHLFlBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLO2dCQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDekIsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUNELGNBQWMsWUFBQyxNQUFNLEVBQUUsUUFBUTtnQkFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN4QyxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDNUIsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTywyQkFBUSxHQUFoQixVQUFpQixRQUFRLEVBQUUsS0FBSztRQUM1QixTQUFHLENBQUMsR0FBRyxDQUFDLGFBQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVPLDJCQUFRLEdBQWhCLFVBQWlCLFFBQVEsRUFBRSxLQUFLO1FBQzVCLFNBQUcsQ0FBQyxHQUFHLENBQUMsYUFBTyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUMsSUFBSSxNQUFNLEVBQUU7WUFDUixrQkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNoRDtJQUNMLENBQUM7SUFFTyw4QkFBVyxHQUFuQixVQUFvQixRQUFRLEVBQUUsS0FBSztRQUMvQixTQUFHLENBQUMsR0FBRyxDQUFDLGFBQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQXpDYSxZQUFHLEdBQWEsbUNBQWdCLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBMEN6RSxlQUFDO0NBOUNELEFBOENDLElBQUE7a0JBOUNvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTE9HX1RBRywgTG9nIH0gZnJvbSBcIi4uL1V0aWxzL0xvZ1wiO1xuaW1wb3J0IHsgTFJVQ2FjaGUgfSBmcm9tIFwiLi4vVXRpbHMvTFJVQ2FjaGVcIjtcbmltcG9ydCBFdmVudE1nciBmcm9tIFwiLi9FdmVudE1nclwiO1xuaW1wb3J0IHsgU2luZ2xldG9uRmFjdG9yeSB9IGZyb20gXCIuLi9VdGlscy9TaW5nbGV0b25GYWN0b3J5XCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi9Mb2dpYy9EYXRhL0NvbnN0L0V2ZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhY2hlTWdyIHtcblxuICAgIHByaXZhdGUgbHJ1OiBMUlVDYWNoZSA9IG5ldyBMUlVDYWNoZSgzMDApOyAvL+WGheWtmOS4reWtmOWcqOeahOe8k+WtmOi1hOa6kOaVsOeahOitpuWRiuWAvFxuXG4gICAgcHVibGljIHN0YXRpYyBpbnM6IENhY2hlTWdyID0gU2luZ2xldG9uRmFjdG9yeS5nZXRJbnN0YW5jZShDYWNoZU1ncik7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBjYy5sb2FkZXJbJ19jYWNoZSddID0gbmV3IFByb3h5KGNjLmxvYWRlclsnX2NhY2hlJ10sIHtcbiAgICAgICAgICAgIGdldCh0YXJnZXQsIHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5IGluIHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmdldENhY2hlKHByb3BlcnR5LCB0YXJnZXRbcHJvcGVydHldKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0Q2FjaGUocHJvcGVydHksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZGVsZXRlQ2FjaGUocHJvcGVydHksIHRhcmdldFtwcm9wZXJ0eV0pICYmXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0YXJnZXRbcHJvcGVydHldO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENhY2hlKHByb3BlcnR5LCBjYWNoZSkge1xuICAgICAgICBMb2cubG9nKExPR19UQUcuQ0FDSEUsIHByb3BlcnR5KTtcbiAgICAgICAgdGhpcy5scnUuZ2V0KHByb3BlcnR5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldENhY2hlKHByb3BlcnR5LCBjYWNoZSkge1xuICAgICAgICBMb2cubG9nKExPR19UQUcuQ0FDSEUsIHByb3BlcnR5KTtcbiAgICAgICAgbGV0IHJlbW92ZSA9IHRoaXMubHJ1LnBhY2socHJvcGVydHksIGNhY2hlKTtcbiAgICAgICAgaWYgKHJlbW92ZSkge1xuICAgICAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuU3lzdGVtLkNhY2hlV2FybmluZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRlbGV0ZUNhY2hlKHByb3BlcnR5LCBjYWNoZSkge1xuICAgICAgICBMb2cubG9nKExPR19UQUcuQ0FDSEUsIHByb3BlcnR5KTtcbiAgICAgICAgdGhpcy5scnUucmVtb3ZlKHByb3BlcnR5KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufSJdfQ==