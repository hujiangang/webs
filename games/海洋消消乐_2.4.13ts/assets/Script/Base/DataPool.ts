import { CellModel } from "../Logic/Match3/Model/CellModel";

export interface IPoolData {
    destory();
}

export class DataPool<T extends IPoolData>{

    private CLS: { new() } = null;
    private datas: Array<T> = null;
    private SIZE: number = null;
    private _isClean: boolean = true;

    constructor(size: number = 10, CLS: { new() }, initCreate: boolean = false, isClean: boolean = true) {
        this.SIZE = size
        this.CLS = CLS
        this.datas = [];
        this._isClean = isClean;
        if (initCreate) {
            for (let i = size; i--;) {
                this.datas.push(new CLS());
            }
        }
    }

    /**
     * 分配一个数据
     */
    public getData(): T {
        if (this.datas.length <= 0) {
            return new this.CLS()
        }
        return this.datas.pop()
    }

    /**
     * free一个数据
     * @param data 
     */
    public freeData(data: T) {
        if (this.datas.length < this.SIZE) {
            this._isClean && data.destory()
            this.datas.push(data)
        }
    }

    /**
     * free所有数据
     */
    public freeAll() {
        if (this._isClean) {
            this.datas.forEach(data => {
                data.destory();
            });
        }
        this.datas.length = 0;
    }

    public get size() {
        return this.datas.length;
    }
}