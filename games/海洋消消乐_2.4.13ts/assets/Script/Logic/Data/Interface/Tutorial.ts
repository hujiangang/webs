import { SingletonFactory } from "../../../Base/Utils/SingletonFactory";
import RuntimeMgr from "../RuntimeMgr";
import Paths from "../../../Base/Utils/Paths";
import { ITutorial } from "./Level/ITutorial";

export default class Turorial {

    public static ins: Turorial = SingletonFactory.getInstance(Turorial);

    private retryCount = 0;

    /**
     * 拿指定等级的配置文件,默认取当前关卡
     * @param lv 
     */
    public async getTurCfgData(lv: number = null, callback?: Function): Promise<ITutorial> {

        lv = lv || RuntimeMgr.ins.getMatch3Level();
        if (lv > RuntimeMgr.ins.maxMatch3Level) {
            lv = RuntimeMgr.ins.maxMatch3Level;
        }

        const isRemotReqeust: boolean = this.retryCount < 2;
        const path: string = isRemotReqeust ? Paths.TurorialRemotPath : Paths.TurorialCfgPath;
        const cfg = await this._requestTurorial(lv, path, isRemotReqeust);
        if (cfg) {
            this.retryCount = 0;
            callback && callback(cfg);
            return cfg;
        } else {
            this.retryCount++;
            if (this.retryCount > 5) {
                return null;
            }
            return this.getTurCfgData(lv, callback);
        }
    }

    /**暂时从resources里头取,如果后期需要取cdn.再改 */
    private _requestTurorial(lv: number, p: string, isRemotReqeust: boolean): Promise<ITutorial> {
        const lvStr = '0000' + lv;
        const path = `${p}levels-0${Math.floor((lv - 1) / 100) + 1}/${lvStr.slice(-4)}.json`;//`${Paths.LevelCfgPath}${lv}`;
        const loadStr = isRemotReqeust ? 'load' : 'loadRes'
        console.error(loadStr, path);
        return new Promise((resolve) => {
            cc.loader[loadStr](path, (err, res: cc.JsonAsset) => {
                if (err || !res) {
                    return resolve(null);
                }
                resolve(isRemotReqeust ? res : res.json);
            });
        })

        // const lvStr = '0000' + lv;
        // const path = `${p}levels-0${Math.floor((lv - 1) / 100) + 1}/${lvStr.slice(-4)}.json`;//`${Paths.LevelCfgPath}${lv}`;
        // const loadStr = isRemotReqeust ? 'load' : 'loadRes'
        // console.error(loadStr, path);
        // // return new Promise((resolve) => {
        // //     cc.loader[loadStr](path, (err, res: cc.JsonAsset) => {
        // //         if (err || !res) {
        // //             return resolve(null);
        // //         }
        // //         resolve(isRemotReqeust ? res : res.json);
        // //     });
        // // })
        // if(isRemotReqeust) {
        //     return new Promise((resolve) => {
        //     cc.loader["loadRes"](path,cc.Asset,(completedCount: number, totalCount: number, item: any) => {},(err, res: cc.JsonAsset)=>{
        //             if (err || !res) {
        //                 return resolve(null);
        //             }
        //             resolve(isRemotReqeust ? res : res.json);
        //         })
        //     })
        // }
        // else {
        //     return new Promise((resolve) => {
        //         cc.loader["load"](path,(err, res: cc.JsonAsset)=>{
        //             if (err || !res) {
        //                 return resolve(null);
        //             }
        //             resolve(isRemotReqeust ? res : res.json);
        //         })
        //     })
        // }
    }

}