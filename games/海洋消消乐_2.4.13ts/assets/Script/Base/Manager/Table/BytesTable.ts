import Paths from "../../Utils/Paths";
import { HttpRequest } from "../../Network/HttpRequest";
import Common from "../../../Logic/Common/Common";
import { StorageMgr } from "../StorageMgr";

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
        return new Promise(async (resolve) => {
            const isWeb = true;//PlatformMgr.ins.type == PlatformType.Web;
            const tablePath = isWeb ? `${Paths.NativeTablePath}${fileName}` : `${Paths.CDNTablePath}${fileName}`;
            const vKey = `__${fileName}_version_`;
            const dKey = `__${fileName}_data_`;

            let data = null;
            const v = StorageMgr.RingStorage.week().getValue(vKey, null);
            if (v) {
                data = StorageMgr.RingStorage.week().getValue(dKey, null);
            }
            if (!data || isWeb) {
                if (isWeb) {
                    const jsonAss: cc.JsonAsset = await Common.getRes(tablePath, cc.JsonAsset);
                    data = jsonAss.json;
                } else {
                    const http = new HttpRequest(tablePath, HttpRequest.METHOD.GET);
                    data = await http.execute();
                }
            }
            resolve(data);
            if (data) {
                // StorageMgr.RingStorage.week().setValue(vKey, fileName);
                // StorageMgr.RingStorage.week().setValue(dKey, data);
            }
        });
    }

    public get isReady(): boolean {
        if (!this._isReady) {
            this.loadTable()
        }
        return this._isReady;
    }

    private async loadTable() {
        if (this._isLoading) {
            return
        }
        this._isLoading = true;
        let data = await this.requestTableData(this.CLS);
        if (data) {
            // data = this.conversionData2pb(data); 
            data = typeof data == 'string' ? JSON.parse(data) : data;
            this.readyOK(data);
        }
        this._isLoading = false;
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