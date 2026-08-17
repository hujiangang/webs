
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Control/LockCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '06addOU3PFBj53mFqsdwoeP', 'LockCtrl');
// Script/Logic/Match3/Control/LockCtrl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Common_1 = require("../../Common/Common");
var Util_1 = require("../../../Base/Utils/Util");
var GameModel_1 = require("../Model/GameModel");
var LockCtrl = /** @class */ (function () {
    function LockCtrl() {
        /**出生锁 */
        this.bornLock = {};
        /**下落锁 */
        this.fallLock = {};
        this.autoChangeLock = new Set();
    }
    /**
     * 判断一个出生点是否被占用
     * @param pos 出生点
     */
    LockCtrl.prototype.isBornPosLocked = function (pos) {
        return !!this.bornLock[Common_1.default.getStringkey(pos)];
    };
    /**
     * 锁定一个出生点!
     * @param pos
     */
    LockCtrl.prototype.lockBornPos = function (pos) {
        this.bornLock[Common_1.default.getStringkey(pos)] = Date.now();
    };
    /**
     * 释放一个出生点!
     * @param pos
     */
    LockCtrl.prototype.unLockBornPos = function (pos) {
        delete this.bornLock[Common_1.default.getStringkey(pos)];
    };
    /**这个点是否是炸弹出生点 */
    LockCtrl.prototype.isBombBornPos = function (pos) {
        var lockEntity = this.fallLock[Common_1.default.getStringkey(pos)];
        if (lockEntity && Util_1.Util.Tool.compareV2(pos, lockEntity.pos)) {
            return true;
        }
        return false;
    };
    /**是否有下落锁 */
    LockCtrl.prototype.isFallLocked = function (pos) {
        return !!this.fallLock[Common_1.default.getStringkey(pos)];
    };
    /**
     * 是否是我自己上的这个锁,如果没锁也为true
     * @param pos 锁定的点!
     * @param keyPos 钥匙!
     */
    LockCtrl.prototype.isMyLocked = function (pos, keyPos) {
        var lock = this.fallLock[Common_1.default.getStringkey(pos)];
        return lock ? Util_1.Util.Tool.compareV2(lock.pos, keyPos) : true;
    };
    /**
     * 解锁一个下落点!
     * @param keyPos 钥匙!
     */
    LockCtrl.prototype.unLockFallLockByKey = function (keyPos) {
        for (var key in this.fallLock) {
            var keyEntity = this.fallLock[key];
            if (keyEntity && Util_1.Util.Tool.compareV2(keyEntity.pos, keyPos)) {
                delete this.fallLock[key];
                break;
            }
        }
    };
    /**
     * 强制解锁某个已经上锁的点!
     * @param pos
     */
    LockCtrl.prototype.unLockFallPos = function (pos) {
        delete this.fallLock[Common_1.default.getStringkey(pos)];
    };
    /**
     * 锁住一个下落点,独占这个点!
     * @param pos 待锁点
     * @param keyPos 钥匙!
     */
    LockCtrl.prototype.lockFallPos = function (pos, keyPos, isForced) {
        if (isForced === void 0) { isForced = false; }
        var key = Common_1.default.getStringkey(pos);
        var keyEntity = this.fallLock[key];
        if (isForced || !keyEntity || (keyEntity && keyEntity.pos == keyPos)) {
            this.fallLock[key] = { pos: keyPos, time: Date.now() };
        }
    };
    /**
     * 全局出现不可消除的现象时,全局交换的锁
     * @param pos
     */
    LockCtrl.prototype.addAutoExchange = function (pos) {
        this.autoChangeLock.add(Common_1.default.getStringkey(pos));
    };
    LockCtrl.prototype.isAutoExchangeLocked = function (pos) {
        return this.autoChangeLock.has(Common_1.default.getStringkey(pos));
    };
    LockCtrl.prototype.deleteAutoExchangeLock = function (pos) {
        this.autoChangeLock.delete(Common_1.default.getStringkey(pos));
    };
    LockCtrl.prototype.deleteAutoExchangeAll = function () {
        this.autoChangeLock.clear();
    };
    LockCtrl.prototype.update = function () {
        if (this.fallLock) {
            for (var key in this.fallLock) {
                var lockItem = this.fallLock[key];
                var owner = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.CellList, lockItem.pos);
                if (!owner || (owner && (owner.isRemoved() || owner.isDestoryed))) {
                    delete this.fallLock[key];
                }
            }
        }
    };
    return LockCtrl;
}());
exports.default = LockCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxDb250cm9sXFxMb2NrQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUN6QyxpREFBZ0Q7QUFDaEQsZ0RBQTJDO0FBRTNDO0lBU0k7UUFQQSxTQUFTO1FBQ0QsYUFBUSxHQUFtQyxFQUFFLENBQUM7UUFDdEQsU0FBUztRQUNELGFBQVEsR0FBMkQsRUFBRSxDQUFDO1FBRXRFLG1CQUFjLEdBQWdCLElBQUksR0FBRyxFQUFFLENBQUM7SUFJaEQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGtDQUFlLEdBQXRCLFVBQXVCLEdBQVk7UUFDL0IsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDs7O09BR0c7SUFDSSw4QkFBVyxHQUFsQixVQUFtQixHQUFZO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGdDQUFhLEdBQXBCLFVBQXFCLEdBQVk7UUFDN0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUdELGlCQUFpQjtJQUNWLGdDQUFhLEdBQXBCLFVBQXFCLEdBQVk7UUFDN0IsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksVUFBVSxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFD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UUFBUSxFQUFFO2dCQUM3QixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQyxJQUFNLEtBQUssR0FBRyxnQkFBTSxDQUFDLGtCQUFrQixDQUFDLG1CQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlFLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUU7b0JBQy9ELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDN0I7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUVMLGVBQUM7QUFBRCxDQW5JQSxBQW1JQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbW1vbiBmcm9tIFwiLi4vLi4vQ29tbW9uL0NvbW1vblwiO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuLi8uLi8uLi9CYXNlL1V0aWxzL1V0aWxcIjtcbmltcG9ydCBHYW1lTW9kZWwgZnJvbSBcIi4uL01vZGVsL0dhbWVNb2RlbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2NrQ3RybCB7XG5cbiAgICAvKirlh7rnlJ/plIEgKi9cbiAgICBwcml2YXRlIGJvcm5Mb2NrOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9ID0gPGFueT57fTtcbiAgICAvKirkuIvokL3plIEgKi9cbiAgICBwcml2YXRlIGZhbGxMb2NrOiB7IFtrZXk6IHN0cmluZ106IHsgcG9zOiBjYy5WZWMyLCB0aW1lOiBudW1iZXIgfSB9ID0gPGFueT57fTtcblxuICAgIHByaXZhdGUgYXV0b0NoYW5nZUxvY2s6IFNldDxzdHJpbmc+ID0gbmV3IFNldCgpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliKTmlq3kuIDkuKrlh7rnlJ/ngrnmmK/lkKbooqvljaDnlKhcbiAgICAgKiBAcGFyYW0gcG9zIOWHuueUn+eCuVxuICAgICAqL1xuICAgIHB1YmxpYyBpc0Jvcm5Qb3NMb2NrZWQocG9zOiBjYy5WZWMyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuYm9ybkxvY2tbQ29tbW9uLmdldFN0cmluZ2tleShwb3MpXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDplIHlrprkuIDkuKrlh7rnlJ/ngrkhXG4gICAgICogQHBhcmFtIHBvcyBcbiAgICAgKi9cbiAgICBwdWJsaWMgbG9ja0Jvcm5Qb3MocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIHRoaXMuYm9ybkxvY2tbQ29tbW9uLmdldFN0cmluZ2tleShwb3MpXSA9IERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6YeK5pS+5LiA5Liq5Ye655Sf54K5IVxuICAgICAqIEBwYXJhbSBwb3MgXG4gICAgICovXG4gICAgcHVibGljIHVuTG9ja0Jvcm5Qb3MocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmJvcm5Mb2NrW0NvbW1vbi5nZXRTdHJpbmdrZXkocG9zKV07XG4gICAgfVxuXG5cbiAgICAvKirov5nkuKrngrnmmK/lkKbmmK/ngrjlvLnlh7rnlJ/ngrkgKi9cbiAgICBwdWJsaWMgaXNCb21iQm9yblBvcyhwb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgY29uc3QgbG9ja0VudGl0eSA9IHRoaXMuZmFsbExvY2tbQ29tbW9uLmdldFN0cmluZ2tleShwb3MpXTtcbiAgICAgICAgaWYgKGxvY2tFbnRpdHkgJiYgVXRpbC5Ub29sLmNvbXBhcmVWMihwb3MsIGxvY2tFbnRpdHkucG9zKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuXG4gICAgLyoq5piv5ZCm5pyJ5LiL6JC96ZSBICovXG4gICAgcHVibGljIGlzRmFsbExvY2tlZChwb3M6IGNjLlZlYzIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5mYWxsTG9ja1tDb21tb24uZ2V0U3RyaW5na2V5KHBvcyldXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5piv5ZCm5piv5oiR6Ieq5bex5LiK55qE6L+Z5Liq6ZSBLOWmguaenOayoemUgeS5n+S4unRydWVcbiAgICAgKiBAcGFyYW0gcG9zIOmUgeWumueahOeCuSFcbiAgICAgKiBAcGFyYW0ga2V5UG9zIOmSpeWMmSFcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNNeUxvY2tlZChwb3M6IGNjLlZlYzIsIGtleVBvczogY2MuVmVjMikge1xuICAgICAgICBjb25zdCBsb2NrID0gdGhpcy5mYWxsTG9ja1tDb21tb24uZ2V0U3RyaW5na2V5KHBvcyldO1xuICAgICAgICByZXR1cm4gbG9jayA/IFV0aWwuVG9vbC5jb21wYXJlVjIobG9jay5wb3MsIGtleVBvcykgOiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOino+mUgeS4gOS4quS4i+iQveeCuSFcbiAgICAgKiBAcGFyYW0ga2V5UG9zIOmSpeWMmSFcbiAgICAgKi9cbiAgICBwdWJsaWMgdW5Mb2NrRmFsbExvY2tCeUtleShrZXlQb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuZmFsbExvY2spIHtcbiAgICAgICAgICAgIGNvbnN0IGtleUVudGl0eSA9IHRoaXMuZmFsbExvY2tba2V5XTtcbiAgICAgICAgICAgIGlmIChrZXlFbnRpdHkgJiYgVXRpbC5Ub29sLmNvbXBhcmVWMihrZXlFbnRpdHkucG9zLCBrZXlQb3MpKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZmFsbExvY2tba2V5XTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOW8uuWItuino+mUgeafkOS4quW3sue7j+S4iumUgeeahOeCuSFcbiAgICAgKiBAcGFyYW0gcG9zIFxuICAgICAqL1xuICAgIHB1YmxpYyB1bkxvY2tGYWxsUG9zKHBvczogY2MuVmVjMikge1xuICAgICAgICBkZWxldGUgdGhpcy5mYWxsTG9ja1tDb21tb24uZ2V0U3RyaW5na2V5KHBvcyldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmUgeS9j+S4gOS4quS4i+iQveeCuSzni6zljaDov5nkuKrngrkhXG4gICAgICogQHBhcmFtIHBvcyDlvoXplIHngrlcbiAgICAgKiBAcGFyYW0ga2V5UG9zIOmSpeWMmSFcbiAgICAgKi9cbiAgICBwdWJsaWMgbG9ja0ZhbGxQb3MocG9zOiBjYy5WZWMyLCBrZXlQb3M6IGNjLlZlYzIsIGlzRm9yY2VkOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gQ29tbW9uLmdldFN0cmluZ2tleShwb3MpO1xuICAgICAgICBjb25zdCBrZXlFbnRpdHkgPSB0aGlzLmZhbGxMb2NrW2tleV07XG4gICAgICAgIGlmIChpc0ZvcmNlZCB8fCAha2V5RW50aXR5IHx8IChrZXlFbnRpdHkgJiYga2V5RW50aXR5LnBvcyA9PSBrZXlQb3MpKSB7XG4gICAgICAgICAgICB0aGlzLmZhbGxMb2NrW2tleV0gPSB7IHBvczoga2V5UG9zLCB0aW1lOiBEYXRlLm5vdygpIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhajlsYDlh7rnjrDkuI3lj6/mtojpmaTnmoTnjrDosaHml7Ys5YWo5bGA5Lqk5o2i55qE6ZSBXG4gICAgICogQHBhcmFtIHBvcyBcbiAgICAgKi9cblxuICAgIHB1YmxpYyBhZGRBdXRvRXhjaGFuZ2UocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIHRoaXMuYXV0b0NoYW5nZUxvY2suYWRkKENvbW1vbi5nZXRTdHJpbmdrZXkocG9zKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGlzQXV0b0V4Y2hhbmdlTG9ja2VkKHBvczogY2MuVmVjMik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hdXRvQ2hhbmdlTG9jay5oYXMoQ29tbW9uLmdldFN0cmluZ2tleShwb3MpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlQXV0b0V4Y2hhbmdlTG9jayhwb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgdGhpcy5hdXRvQ2hhbmdlTG9jay5kZWxldGUoQ29tbW9uLmdldFN0cmluZ2tleShwb3MpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlQXV0b0V4Y2hhbmdlQWxsKCkge1xuICAgICAgICB0aGlzLmF1dG9DaGFuZ2VMb2NrLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmFsbExvY2spIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuZmFsbExvY2spIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb2NrSXRlbSA9IHRoaXMuZmFsbExvY2tba2V5XTtcbiAgICAgICAgICAgICAgICBjb25zdCBvd25lciA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUoR2FtZU1vZGVsLmlucy5DZWxsTGlzdCwgbG9ja0l0ZW0ucG9zKTtcbiAgICAgICAgICAgICAgICBpZiAoIW93bmVyIHx8IChvd25lciAmJiAob3duZXIuaXNSZW1vdmVkKCkgfHwgb3duZXIuaXNEZXN0b3J5ZWQpKSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5mYWxsTG9ja1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufSJdfQ==