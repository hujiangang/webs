import Paths from "../Paths";

export abstract class BytesTable {

    protected CLS: string = ""

    protected _afpb = null
    protected _isReady = false;
    protected _isLoading = false;

    constructor(afpb) {
        this._afpb = afpb
    }

    /**
     * 加载线上cdn的配置表
     * @param fileName 这个文件名应该以md5做版本管理
     */
    private requestTableData(fileName: string): Promise<any> {
        // This project currently reads local resource tables on every platform.
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error(`配置表加载超时: ${fileName}`)), 5000);
            cc.loader.loadRes(`${Paths.NativeTablePath}${fileName}`, cc.JsonAsset, (error, asset: cc.JsonAsset) => {
                clearTimeout(timer);
                if (error || !asset) {
                    reject(error || new Error(`缺少配置表: ${fileName}`));
                    return;
                }
                resolve(asset.json);
            });
        });
    }

    private loading: Promise<void> = null;

    public get isReady(): boolean {
        if (!this._isReady) this.load().catch(error => console.warn(error));
        return this._isReady;
    }

    /** Share concurrent requests; reset failed loads so callers can retry. */
    public load(): Promise<void> {
        if (this._isReady) return Promise.resolve();
        if (this.loading) return this.loading;
        this._isLoading = true;
        this.loading = this.requestTableData(this.CLS).then(data => {
            if (data == null) throw new Error(`配置表为空: ${this.CLS}`);
            this.readyOK(typeof data === 'string' ? JSON.parse(data) : data);
            this._isLoading = false;
            this.loading = null;
        }).catch(error => {
            this._isLoading = false;
            this.loading = null;
            throw error;
        });
        return this.loading;
    }

    private conversionData2pb(data: any): any {
        const pbc = this._afpb[this.CLS];
        const c = pbc ? pbc['decode'](data) : null;
        if (c && c.Ary) {
            return c.Ary;
        }
    }

    /** 准备完毕 开始灌入数据 */
    protected abstract readyOK(data: any);

    /**
     * 拆分表格属性
     * @param originalData 
     */
    protected splitAttribute(originalData: string): Map<any, any> {
        return null;
    }

}