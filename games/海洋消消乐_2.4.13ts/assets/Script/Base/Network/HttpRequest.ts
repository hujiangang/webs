
import NetBase from "./NetBase";
import { Log } from "../Utils/Log";
import Apps from "../Apps";

//请求超时时间 (ms)
const DefaultTimeout: number = 3000;

const requestCachePool: Map<string, HttpRequest> = new Map<string, HttpRequest>();

class HttpRequest extends NetBase {

    private data: string = null;
    private method: string = null;
    private rspType: XMLHttpRequestResponseType = null;
    private headers: { [key: string]: string } = null;

    private isJsonFromat: boolean = false;
    /**当前请求序列号 */
    private requestID: string = null;
    /**当前请求XmlHttp句柄 */
    private request: XMLHttpRequest = null;
    /**请求完成回调接口 */
    private reqCompletedCallback: Function = null;

    /**
     * 
     * @param url 请求连接
     * @param method 请求方法
     * @param headers 请求头
     * @param data 请求附加内容
     * @param isJsonFromat 是否对回复进行json格式化
     * @param rspType 指定接收类型
     */
    constructor(url: string, method: HttpRequest.METHOD, headers: { [key: string]: string } = null, data: string = null, isJsonFromat: boolean = false, rspType: XMLHttpRequestResponseType = null) {
        super();
        this.url = url;
        this.data = data;
        this.method = method;
        this.rspType = rspType;
        this.headers = headers;
        this._isReady = true;
        this.isJsonFromat = isJsonFromat;
    }

    /**执行一个请求 */
    public execute(): Promise<any> {
        return new Promise((resolve) => {
            if (!this.isReady) {
                resolve(null);
            } else if (!Apps.isOpenNet) {
                resolve({ code: 0 });
            } else {
                this.reqCompletedCallback = resolve;
                this.connect();
            }
        });
    }

    /**取消这个请求 */
    public cancel(): void {
        this.resultHandler(null);
        this.destory();
    }

    private onReadyStateChange(evt: Event) {
        if (evt && evt.target !== this.request) {
            return;
        }
        if (this.request.readyState == XMLHttpRequest.DONE) {
            if (this.request.status >= 200 && this.request.status < 400) {
                this.resultHandler(this.request.responseText);
                this.destory();
            } else {
                this.onError(`ErrorCode ${this.request.status}`);
                this.resultHandler(this.request.responseText);
                this.destory();
            }
        }
    }

    private onProgress() {

    }

    private onTimeOut() {
        this.onError('Time out!');
    }

    private onError(err) {
        Log.d(`request Error ! \n url:${this.url} \n method:${this.method} \n requestID:${this.requestID}`, err);
        //重试机制 
        if (!this.isAutoRetry || this.retryCount >= this.retryMaxCount) {
            this.resultHandler(null);
            this.destory();
        } else {
            this.retry(err);
        }
    }

    /**链接 */
    protected connect() {
        this.request = new XMLHttpRequest();
        this.setResponseType();
        this.request.open(this.method, this.url, true);
        /**设置超时时间 */
        this.request.timeout = DefaultTimeout * this.retryCount;
        /**绑定回调事件 */
        this.request.ontimeout = this.onTimeOut.bind(this);
        this.request.onerror = this.onError.bind(this);
        this.request.onreadystatechange = this.onReadyStateChange.bind(this);
        this.request.onprogress = this.onProgress.bind(this);

        // this.addHeaders(PublicHeaders);
        this.addHeaders(this.headers);
        this.requestID = this.getRequestId();
        try {
           // this.request.send(this.data);
            requestCachePool.set(this.requestID, this);
        } catch (err) {
            this.onError(err);
        }
    }


    private retry(err) {
        if (this.retryCount < this.retryMaxCount) {
            this.retryCount++;
            this.destory();
            setTimeout(() => {
                this.connect();
            }, this.retryCount * 1000);
        } else {
            this.onError(err);
        }
    }

    private destory() {
        requestCachePool.delete(this.requestID);
        if (this.request) {
            this.request.ontimeout = null;
            this.request.onerror = null;
            this.request.onreadystatechange = null;
            this.request.onprogress = null;
            try {
                this.request.abort();
            } catch (error) { }
        }
    }

    private resultHandler(result: any) {
        if (this.reqCompletedCallback && requestCachePool.get(this.requestID)) {
            if (this.isJsonFromat) {
                try {
                    result = JSON.parse(result);
                } catch (error) {
                    try {
                        result = JSON.parse(result);
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
            this.reqCompletedCallback(result);
        } else {

        }
    }

    private addHeaders(headers: { [key: string]: string }): void {
        if (headers) {
            for (const key in headers) {
                const value = headers[key];
                this.request.setRequestHeader(key, value);
                if (key == 'Content-Type' && value.indexOf('json') > 0) {
                    this.isJsonFromat = true;
                }
            }
        }
    }

    private setResponseType() {
        if (this.rspType) {
            this.request.responseType = this.rspType;
        }
    }
}

namespace HttpRequest {
    export enum METHOD { GET = 'GET', POST = 'POST' }
}

export { HttpRequest }