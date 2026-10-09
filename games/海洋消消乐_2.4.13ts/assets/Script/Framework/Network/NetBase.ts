import Sequence from "./Sequence";

const Seq: Sequence = new Sequence();
//最大重连次数
const MaxRetryCount: number = 3;
//自动重连开关
const AutoRetryOpt: boolean = true;

export default abstract class NetBase {

    protected url: string = null;

    protected _isReady: boolean = false;
    /**当前重试次数 */
    protected retryCount: number = 0;

    protected getRequestId(): string {
        return Seq.nextString();
    }

    protected get retryMaxCount(): number {
        return MaxRetryCount;
    }

    public get isAutoRetry(): boolean {
        return AutoRetryOpt;
    }

    public get isReady(): boolean {
        return this._isReady;
    }

    protected abstract connect();

}