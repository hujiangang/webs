import Common from "../../Common/Common";
import { Util } from "../../../Base/Utils/Util";
import GameModel from "../Model/GameModel";

export default class LockCtrl {

    /**出生锁 */
    private bornLock: { [key: string]: number } = <any>{};
    /**下落锁 */
    private fallLock: { [key: string]: { pos: cc.Vec2, time: number } } = <any>{};

    private autoChangeLock: Set<string> = new Set();

    constructor() {

    }

    /**
     * 判断一个出生点是否被占用
     * @param pos 出生点
     */
    public isBornPosLocked(pos: cc.Vec2): boolean {
        return !!this.bornLock[Common.getStringkey(pos)];
    }

    /**
     * 锁定一个出生点!
     * @param pos 
     */
    public lockBornPos(pos: cc.Vec2) {
        this.bornLock[Common.getStringkey(pos)] = Date.now();
    }

    /**
     * 释放一个出生点!
     * @param pos 
     */
    public unLockBornPos(pos: cc.Vec2) {
        delete this.bornLock[Common.getStringkey(pos)];
    }


    /**这个点是否是炸弹出生点 */
    public isBombBornPos(pos: cc.Vec2) {
        const lockEntity = this.fallLock[Common.getStringkey(pos)];
        if (lockEntity && Util.Tool.compareV2(pos, lockEntity.pos)) {
            return true;
        }
        return false;
    }


    /**是否有下落锁 */
    public isFallLocked(pos: cc.Vec2): boolean {
        return !!this.fallLock[Common.getStringkey(pos)]
    }

    /**
     * 是否是我自己上的这个锁,如果没锁也为true
     * @param pos 锁定的点!
     * @param keyPos 钥匙!
     */
    public isMyLocked(pos: cc.Vec2, keyPos: cc.Vec2) {
        const lock = this.fallLock[Common.getStringkey(pos)];
        return lock ? Util.Tool.compareV2(lock.pos, keyPos) : true;
    }

    /**
     * 解锁一个下落点!
     * @param keyPos 钥匙!
     */
    public unLockFallLockByKey(keyPos: cc.Vec2) {
        for (let key in this.fallLock) {
            const keyEntity = this.fallLock[key];
            if (keyEntity && Util.Tool.compareV2(keyEntity.pos, keyPos)) {
                delete this.fallLock[key];
                break;
            }
        }
    }

    /**
     * 强制解锁某个已经上锁的点!
     * @param pos 
     */
    public unLockFallPos(pos: cc.Vec2) {
        delete this.fallLock[Common.getStringkey(pos)];
    }

    /**
     * 锁住一个下落点,独占这个点!
     * @param pos 待锁点
     * @param keyPos 钥匙!
     */
    public lockFallPos(pos: cc.Vec2, keyPos: cc.Vec2, isForced: boolean = false) {
        const key = Common.getStringkey(pos);
        const keyEntity = this.fallLock[key];
        if (isForced || !keyEntity || (keyEntity && keyEntity.pos == keyPos)) {
            this.fallLock[key] = { pos: keyPos, time: Date.now() };
        }
    }

    /**
     * 全局出现不可消除的现象时,全局交换的锁
     * @param pos 
     */

    public addAutoExchange(pos: cc.Vec2) {
        this.autoChangeLock.add(Common.getStringkey(pos));
    }

    public isAutoExchangeLocked(pos: cc.Vec2): boolean {
        return this.autoChangeLock.has(Common.getStringkey(pos));
    }

    public deleteAutoExchangeLock(pos: cc.Vec2) {
        this.autoChangeLock.delete(Common.getStringkey(pos));
    }

    public deleteAutoExchangeAll() {
        this.autoChangeLock.clear();
    }

    public update() {
        if (this.fallLock) {
            for (const key in this.fallLock) {
                const lockItem = this.fallLock[key];
                const owner = Common.safeGet2ArrayValue(GameModel.ins.CellList, lockItem.pos);
                if (!owner || (owner && (owner.isRemoved() || owner.isDestoryed))) {
                    delete this.fallLock[key];
                }
            }
        }
    }

}