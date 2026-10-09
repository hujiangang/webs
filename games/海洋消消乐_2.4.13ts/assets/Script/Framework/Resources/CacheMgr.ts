import { SingletonFactory } from "../Utils/SingletonFactory";

/** Observe the public 2.4 asset cache without replacing cc.loader's read-only cache. */
export default class CacheMgr {
    public static ins: CacheMgr = SingletonFactory.getInstance(CacheMgr);
    public onWarning: () => void = null;
    public warningLimit = 300;
    private started = false;
    private lastCheck = 0;
    private previousCount = 0;

    public start(): void {
        if (this.started) return;
        this.started = true;
        cc.director.on(cc.Director.EVENT_AFTER_UPDATE, this.check, this);
    }

    public stop(): void {
        if (!this.started) return;
        cc.director.off(cc.Director.EVENT_AFTER_UPDATE, this.check, this);
        this.started = false;
    }

    private check(): void {
        const now = Date.now();
        if (now - this.lastCheck < 1000) return;
        this.lastCheck = now;
        const count = cc.assetManager.assets.count;
        if (count > this.warningLimit && count > this.previousCount && this.onWarning) this.onWarning();
        this.previousCount = count;
    }
}
