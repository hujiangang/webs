
import NetMgr from "./NetMgr";
import PlatformMgr from "./PlatformMgr";
import { PlatformType } from "../BaseConst";

const FLUSH_2_NET_TIME = 3 * 1000;

export namespace StorageMgr {

    export class Storage {
        public static readonly BuildingState: string = "_island";
        public static readonly GuideIds: string = "_guideMap";
        public static readonly HotelData: string = "_hotelDatas";
        private static _localStorages = new Map<string, any>();
        private static _awaitServerStorages = new Map<string, string>();
        private static _flushTimer = null;

        /**
         * 初始化缓存，主要是为了同步服务器的资源
         */
        public static init(res: {}) {
            if (res) {
                for (let key in res) {
                    Storage.setStorage(key, res[key]);
                }
            }
            if (Storage._flushTimer) {
                clearInterval(Storage._flushTimer);
                Storage._flushTimer = null
            }
            //定时同步到网络
            Storage._flushTimer = setInterval(Storage.flush, FLUSH_2_NET_TIME);
        }

        /**
         * 设置缓存数据
         * @param key 
         * @param data 
         */
        public static setStorage(key: string | number, data: any, syncRemote: boolean = false) {

            if (data == null) {
                data = "";
            }
            if (typeof (data) == 'object') {
                data = JSON.stringify(data);
            }
            if (syncRemote) {
                Storage._awaitServerStorages.set(key + '', data);
            }
            Storage._setLocalStorageData(key, data)
        }

        /**
         * 设置Object缓存
         * @param key 
         * @param data 
         * @param syncRemote 
         */
        public static setObject(key: string | number, data: Object, syncRemote: boolean = false) {
            if (data == null) {
                data = {};
            }
            try {
                data = JSON.stringify(data)
            } catch (e) {
                data = {}
            }
            Storage.setStorage(key, data, syncRemote);
        }

        /**
         * 设置Int缓存
         * @param key 
         * @param data 
         * @param syncRemote 
         */
        public static setInt(key: string | number, data: Number, syncRemote: boolean = false) {

            Storage.setStorage(key, data || 0, syncRemote);
        }

        /**
         * 设置Float缓存
         * @param key 
         * @param data 
         * @param syncRemote 
         */
        public static setFloat(key: string | number, data: Number, syncRemote: boolean = false) {
            if (!data) {
                data = 0;
            }
            Storage.setStorage(key, data, syncRemote);
        }

        /**
         * 设置Boolean缓存
         * @param key 
         * @param data 
         * @param syncRemote 
         */
        public static setBoolean(key: string | number, data: boolean, syncRemote: boolean = false) {
            let value = data ? "1" : "0";
            Storage.setStorage(key, value, syncRemote);
        }

        /**
         * 设置string类型
         * @param key 
         * @param data 
         * @param syncRemote 
         */
        public static setString(key: string | number, data: string, syncRemote: boolean = false) {
            Storage.setStorage(key, data || "", syncRemote);
        }

        /**
         * 获取缓存数据
         * @param key 
         * @param defData 
         */
        public static getStorage(key: string | number, defData?: any): string {
            return Storage._getLocalStorageData(key, defData)
        }

        /**
         * 获取缓存数据
         * @param key 
         * @param defData 
         */
        public static getObject(key: string | number, defData?: Object): Object {
            let value = Storage._getLocalStorageData(key, defData);
            if (!value) {
                return defData;
            }

            let type = typeof (value)
            if (type == 'object') {
                return value
            } else if (type != 'string') {
                value = String(value)
            }

            try {
                value = JSON.parse(value)
            } catch (e) {

            }
            return value ? value : defData;
        }

        /**
         * 获取缓存数据
         * @param key 
         * @param defData 
         */
        public static getString(key: string | number, defData?: string): string {
            let value = Storage._getLocalStorageData(key, defData);
            if (!value) {
                return defData;
            }
            return String(value)
        }

        /**
        * 获取缓存数据
        * @param key 
        * @param defData 
        */
        public static getInt(key: string | number, defData?: number): number {

            let value = Storage._getLocalStorageData(key, defData);
            if (!value) {
                return defData;
            }
            let type = typeof (value)
            try {
                if (type == 'string') {
                    value = parseInt(value)
                } else {
                    value = Number(value)
                }
            } catch (e) {

            }
            return (value != null && typeof (value) != "undefined") ? value : defData;
        }

        /**
        * 获取缓存数据
        * @param key 
        * @param defData 
        */
        public static getStorageFloat(key: string | number, defData?: Number): Number {

            let value = Storage._getLocalStorageData(key, defData);
            if (!value) {
                return defData;
            }

            let type = typeof (value)
            try {

                if (type == 'string') {
                    value = parseFloat(value)
                } else {
                    value = Number(value)
                }
            } catch (e) {

            }
            return (value != null && typeof (value) != "undefined") ? value : defData;
        }

        /**
         * 清除所有数据
         */
        public static removeAll() {
            // cc.sys.localStorage.clear();
            if (PlatformMgr.ins.type == PlatformType.Web) {  //网页上用作切换账号
                let data = cc.sys.localStorage;
                for (let i = 0; i < data.length; ++i) {
                    if (data.key(i) == "__userId") {
                        continue;
                    }
                    data.removeItem(data.key(i));
                    i = i - 1;
                }
            } else {
                cc.sys.localStorage.clear();
            }
        }

        /**
         * 获取缓存数据
         * @param key 
         * @param defData 
         */
        public static getBoolean(key: string | number, defData?: boolean): boolean {

            let value = Storage._getLocalStorageData(key, defData);
            if (!value) {
                return defData;
            }

            let type = typeof (value)
            try {
                if (type == 'string') {
                    value = (value == 'true' || value == '1')
                } else {
                    value = Boolean(value)
                }
            } catch (e) {

            }

            return (value != null && typeof (value) != "undefined") ? value : defData;
        }

        /**
         * 删除缓存数据
         * @param key 
         * @param syncRemote 
         */
        public static removeStorage(key: string | number, syncRemote: boolean = false) {
            if (syncRemote) {
                // 从远程服务器上删除, 先在这里弄成null
                Storage._awaitServerStorages.set(key + '', '');
            }
            Storage._removeStorageData(key)
        }

        /**
         * 推送到服务器
         */
        public static flush() {

            if (Storage._awaitServerStorages.size == 0) {
                return
            }

            let data = {};
            Storage._awaitServerStorages.forEach((v, k) => {
                data[k] = v;
            })

            NetMgr.ins.putUserData(data).then((result: boolean) => {
                // if (result) {
                // Storage._awaitServerStorages.clear();
                // }
            });

            Storage._awaitServerStorages.clear();

            // let keys = []
            // Storage._awaitServerStorages.forEach((value, key) => {
            //     keys.push(key)
            //     const data: { key, value: string, opt, token?, max?, min?} = <any>{};
            //     data.key = key
            //     data.value = String(value);
            //     data.opt = 'set';
            //     netMgr.pushRes(data, false)
            // })

            // if (keys.length > 0) {
            //     let result = netMgr.submitRes();
            //     if (result) {
            //         result.then(v => {
            //             if (v.err == null) {
            //                 for (let key of keys) {
            //                     Storage._awaitServerStorages.delete(key)
            //                 }
            //             }
            //         })
            //     }
            // }
        }

        /**
         * 获取本地缓存
         * @param key 
         * @param defData 
         */
        private static _getLocalStorageData(key: string | number, defData?: any): any {

            let data = Storage._localStorages.get(key + '')
            if (data) {
                return data
            }
            data = cc.sys.localStorage.getItem(key + '');
            return data || defData
        }

        /**
         * 设置本地缓存
         * @param key 
         * @param data 
         */
        private static _setLocalStorageData(key: string | number, data: any) {
            Storage._localStorages.set(key + '', data);
            cc.sys.localStorage.setItem(key + '', data);
        }

        /**
         * 移除本地缓存
         * @param key 
         */
        private static _removeStorageData(key: string | number) {
            Storage._localStorages.delete(key + '')
            cc.sys.localStorage.removeItem(key + '')
        }

    }

    export class RingStorage {

        public static readonly DAY_KEY: string = '__RING_DAY_KEY__'
        public static readonly WEEK_KEY: string = '__RING_WEEK_KEY__'
        public static readonly MONTH_KEY: string = '__RING_MONTH_KEY__'

        private static _rs: Map<string, RingStorage>;
        private __RING_KEY__: string = ""



        /**
         * 
         * @param key 
         */
        constructor(key: string) {
            this.__RING_KEY__ = key;
        }

        private getNowTime() {
            return Date.now();
        }

        private static _g(k: string): RingStorage {
            if (RingStorage._rs == null) {
                RingStorage._rs = new Map<string, RingStorage>();
            }
            let s: RingStorage = RingStorage._rs.get(k)
            if (!s) {
                s = new RingStorage(k)
                RingStorage._rs.set(k, s)
            }
            return s;
        }

        /**
         * 每天
         */
        public static day(): RingStorage {
            return RingStorage._g(RingStorage.DAY_KEY);
        }

        /**
         * 每周
         */
        public static week(): RingStorage {
            return RingStorage._g(RingStorage.WEEK_KEY);
        }

        /**
         * 每周
         */
        public static month(): RingStorage {
            return RingStorage._g(RingStorage.MONTH_KEY);
        }


        /**
         * 构造一个时间戳
         */
        private createTimestamp(): number {
            let d: Date = new Date(this.getNowTime());
            if (this.__RING_KEY__ == RingStorage.MONTH_KEY) {
                return d.getFullYear() << 16 | d.getMonth() << 8;
            } else if (this.__RING_KEY__ == RingStorage.WEEK_KEY) {
                d.setHours(0);
                d.setMinutes(0);
                d.setSeconds(0);
                return d.getTime();
            } else {
                return d.getFullYear() << 16 | d.getMonth() << 8 | d.getDate()
            }
        }

        /**
         * 和今天的差值
         * @param t 
         */
        private diffDay(t: number): number {
            let d: Date = new Date(this.getNowTime())
            d.setHours(0)
            d.setMinutes(0)
            d.setSeconds(0)
            return (d.getTime() - t) / 86400000;
        }

        /**
         * 获取data
         */
        private getStorageData(): any {
            let changed: boolean = false;
            let t: number = this.createTimestamp()
            let data = Storage.getObject(this.__RING_KEY__, { t: 0, d: {} }) as any
            if (this.__RING_KEY__ == RingStorage.WEEK_KEY) {
                changed = this.diffDay(data.t) > 7
            } else {
                changed = data.t != t
            }

            if (changed) {
                data.t = t;
                data.d = {}
                Storage.setObject(this.__RING_KEY__, data);
            }
            return data;
        }

        public deleteValue(key: string | number) {
            key = key.toString();
            let data = this.getStorageData();
            delete data[key];
            Storage.setObject(this.__RING_KEY__, data);
        }

        /**
         * 设置值
         * @param key 
         * @param value 
         */
        public setValue(key: string | number, value: any) {
            key = key.toString();
            let data = this.getStorageData();
            data.d[key] = value;
            Storage.setObject(this.__RING_KEY__, data)
        }

        /**
         * 获取值
         * @param key 
         * @param value 
         */
        public getValue(key: string | number, defVal: any): any {
            key = key.toString();
            let data = this.getStorageData();
            let value: any = data.d[key];
            if (value == null) {
                return defVal
            }
            return value;
        }
    }
}

