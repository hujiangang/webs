import { BytesTable } from "./BytesTable";
import { Util } from "../../Utils/Util";
import { Log } from "../../Utils/Log";

export class BaseTable<K, T> extends BytesTable {

    protected _data: Array<T>;
    protected _tables: Map<any, T>;
    protected _class: T;
    protected _VOClass: { new(type: any) }

    protected KEY: string | Array<string> = null;
    protected _maxKey = 0;

    constructor(key: string | Array<string>, clsName: string, VOClass: { new(type: any) }, afpb) {
        super(afpb);
        this.KEY = key;
        this.CLS = clsName;
        this._VOClass = VOClass;
    }

    protected readyOK(data: Array<T>) {
        let _data = []
        if (this._VOClass != null) {
            data.forEach(d => {
                let c = new this._VOClass(d);
                _data.push(c)
            })
        } else {
            _data = data;
        }

        this._data = _data;
        this._tables = new Map<K, T>();
        if (this.KEY != null && this.KEY.length > 0) {
            let k;
            _data.forEach(item => {
                k = this._createKey(item)
                if (k != null && k != undefined) {
                    if (Util.Tool.isNumber(k)) {
                        this._maxKey = Math.max(this._maxKey, k)
                    }
                    this._tables.set(k, item)
                }
            })
        }
        this._isReady = true;
        Log.i(`数据表[${this.CLS}] 加载成功`);
    }

    private _createKey(item: T): string {
        let k = "";
        if (this.KEY instanceof Array) {
            let karr = []
            this.KEY.forEach(KEY => {
                karr.push(item[KEY])
            })
            k = karr.join("_")
        } else {
            k = item[this.KEY]
        }
        return k;
    }

    /**
     * 通过传入的主键来获取对象
     * @param key 
     */
    public getByPrimaryKey(key: K): T {
        return this._tables ? this._tables.get(key) : null;
    }

    /**
     * 多个主键时用这个取值
     * @param keys 
     */
    public getByPrimaryKeys(...keys: Array<any>) {
        let k = keys.join("_")
        return this._tables.get(k)
    }

    /** 获取所有的data*/
    public getData(): Array<T> {
        return this._data;
    }

    /**
     * 获得最大的key值
     */
    public getMaxPrimaryKey(): number {
        return this._maxKey;
    }
}

