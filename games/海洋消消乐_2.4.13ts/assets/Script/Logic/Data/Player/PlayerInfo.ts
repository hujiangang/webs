import { PropType, NativeKey } from "../Const/Constant";
import { Util } from "../../../Base/Utils/Util";
import { StorageMgr } from "../../../Base/Manager/StorageMgr";

export default class PlayerInfo {

    /**用户唯一识别id,比如微信就是openid */
    public userId: number = -1;
    /** 用户昵称*/
    public nickName: string = 'tt';
    /** 用户头像图片的 URL。URL 最后一个数值代表正方形头像大小（有 0、46、64、96、132 数值可选，0 代表 640x640 的正方形头像，46 表示 46x46 的正方形头像，剩余数值以此类推。默认132），用户没有头像时该项为空。若用户更换头像，原有头像 URL 将失效。*/
    public avatarUrl: string = '';
    /** 用户性别*/
    public gender: 0 | 1 | 2 = 0;
    /** 用户所在国家*/
    public country: string = 'cn';
    /** 用户所在城市*/
    public city: string = 'sz';
    /** 服务器当前的系统时间戳 */
    public serverTime: number = 0;
    /** 上一次下线时间戳 */
    public offlineTime: number = 0;
    /** 当前场景 */
    public scene: string = '';
    /** 开关设置 */
    public switchSet: any = {};

    /** 当前体力*/
    public power: number = 0;
    /** 用户金钱 */
    public coin: number = 0;
    /** 用户钻石 */
    public diamond: number = 0;
    /** 用户等级 */
    public level: number = 1;
    /** 消除关卡(同步到的最高关卡) */
    public mathc3Level: number = 1;
    /**当前章节 */
    public chapter: number = 1;
    /** 当前的道具数据(背包信息) */
    public propData: { [type: number]: { count: number } } = <any>{};
    /**当前的记时时间 */
    public timeCounter: number = 0;

    public lvMap: Map<number | string, { score: number, star: number }> = new Map();

    /**塞数据 */
    public initRemotData(data) {
        this.lvMap.clear();
        if (data) {
            if (typeof data == 'string') {
                data = JSON.parse(data);
            }
            if (!data[NativeKey.PlayerInfo]) {
                this.setNormalPower();
            }
            for (const key in data) {
                if (key == <any>NativeKey.PlayerInfo) {
                    this.syncPlayerData(data[key])
                } else if (key.indexOf(`${NativeKey.LvDataKey.toString()}_`) != -1) {
                    this.lvMap.set(key, JSON.parse(data[key]));
                }
            }
        } else {
            this.setNormalPower();
        }
    }

    private syncPlayerData(data) {
        if (typeof data == 'string') data = JSON.parse(data);
        for (const playerKey in data) {
            if (this[playerKey] != undefined) {
                this[playerKey] = data[playerKey];
            }
        }
    }

    private setNormalPower() {
        const data = StorageMgr.Storage.getObject(NativeKey.PlayerInfo, null)
        if (data) {
            // this.syncPlayerData(data);
            StorageMgr.Storage.removeAll();
        }
        this.power = 30;
        this.saveData('power');
    }

    public saveLastTime() {
        StorageMgr.Storage.setInt(NativeKey.LastTime, this.serverTime);
    }

    public getLastTime() {
        return StorageMgr.Storage.getInt(NativeKey.LastTime, 0);
    }

    public saveData(key: string) {
        return new Promise((resolve) => {
            const data = StorageMgr.Storage.getObject(NativeKey.PlayerInfo, {});
            data[key] = this[key];
            StorageMgr.Storage.setObject(NativeKey.PlayerInfo, data, true);
            resolve(true);
        })
    }

    public _saveAll() {
        // StorageMgr.Storage.setStorage(NativeKey.PlayerInfo, this, true);
    }
}