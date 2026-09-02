import { SingletonFactory } from "../../../Base/Utils/SingletonFactory";
import RuntimeMgr from "../RuntimeMgr";
import Paths from "../../../Base/Utils/Paths";
import { ILevel } from "./Level/ILevel";

export default class Level {

    public static ins: Level = SingletonFactory.getInstance(Level);

    public LvDataPool: Map<number, ILevel> = new Map();

    private retryCount = 0;

    /**
     * 预加载下一个关卡!
     * @param lv 当前关卡
     */
    public preLoadNextCfg(lv: number) {
        const curLv = lv || RuntimeMgr.ins.getMatch3Level();
        if (curLv >= RuntimeMgr.ins.maxMatch3Level) {
            return;
        }
        this._request(curLv + 1);
    }

    /**
     * 拿指定等级的配置文件,默认取当前关卡
     * @param lv 
     */
    public async getLvCfgData(lv: number = null, callback?: Function): Promise<ILevel> {
        lv = lv || RuntimeMgr.ins.getMatch3Level();
        if (lv > RuntimeMgr.ins.maxMatch3Level) {
            lv = RuntimeMgr.ins.maxMatch3Level;
        }
        RuntimeMgr.ins.CurLevel = lv;
        let cfg = this.LvDataPool.get(lv);
        if (cfg) {
            callback && callback(cfg);
            return cfg;
        }
        //执行请求!
        cfg = await this._request(lv);
        callback && callback(cfg);
        return cfg;
    }

    private async _request(lv: number) {
        const isRemotReqeust: boolean = false;//this.retryCount < 2;  //false;
        const version = await this._getLevelVersion()
        const path: string = isRemotReqeust ? (Paths.LevelRemotPath + version + '/') : Paths.LevelCfgPath;
        const cfg = await this._execRequest(lv, path, isRemotReqeust);
        if (cfg) {
            this.retryCount = 0;
            this.LvDataPool.set(lv, cfg);
            return cfg;
        } else {
            this.retryCount++;
            if (this.retryCount > 5) {
                return null;
            }
            return this._request(lv);
        }
    }

    private async _getLevelVersion(): Promise<string> {
        let version = '1.0.0';
        // const cfg = await RuntimeMgr.ins.getServerConfig();
        // if (cfg) {
        //     version = cfg.res_ver;
        // }
        return version;
    }

    /**暂时从resources里头取,如果后期需要取cdn.再改 */
    private _execRequest(lv: number, p: string, isRemotReqeust: boolean): Promise<ILevel> {
        const lvStr = '0000' + lv;
        const path = `${p}levels-0${Math.floor((lv - 1) / 100) + 1}/${lvStr.slice(-4)}.json`;//`${Paths.LevelCfgPath}${lv}`;
        const loadStr = isRemotReqeust ? 'load' : 'loadRes'
        console.log(loadStr, path);
        return new Promise((resolve, reject) => {
            let isTimeout = false;
            const timeout = setTimeout(() => {
                isTimeout = true;
                resolve(null);
            }, 3000);
            cc.loader[loadStr](path, (err, res: cc.JsonAsset) => {
                if (isTimeout) {
                    return reject();
                }
                clearTimeout(timeout);
                if (err || !res) {
                    return resolve(null);
                }
                resolve(isRemotReqeust ? res : res.json);
            });
        })
    }


    public destory() {
        this.LvDataPool.clear();
    }

}
