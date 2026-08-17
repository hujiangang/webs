"use strict";
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