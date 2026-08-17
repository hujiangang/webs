import NetBase from "./NetBase";
import { Log } from "../Utils/Log";

/**自动心跳模式 */
const AutoHearBeat: boolean = true;
/**心跳间隔时间 */
const HeartBeatGapTime: number = 30 * 1000;
/**重连间隔时间 */
const ReConnectGapTime: number = 1 * 1000;

export default class Scoket extends NetBase {

    private ws: WebSocket = null;
    private data: string = null;

    private connectCallBack: Function = null;

    private heartBeatTimer: any = null;
    private reConnectTimer: any = null;

    protected _delaySendPacks: Array<any>;

    constructor(url: string, data: string = null) {
        super();
        this.url = url;
        this.data = data;
    }

    public connect(): Promise<boolean> {
        return new Promise((resolve) => {
            this.connectCallBack = resolve;
            this.createWebSocket();
        })
    }

    public disconnect() {
        this.destoryWs();
    }

    public send(pack) {
        if (this.isReady && this.ws.readyState == WebSocket.OPEN) {
            this.ws!.send(pack);
        } else {
            //还没准备好 ? 需要怎么处理 ? 保存包吗 ? 待定 
            Log.e('Error websocket 状态异常!', this.isReady, this.ws.readyState);
        }
    }

    private createWebSocket() {
        this.ws = new WebSocket(this.url);
        this.ws.binaryType = "arraybuffer";  //    "blob" | "arraybuffer"
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onerror = this.onError.bind(this);
    }

    private onOpen(evt: Event): void {
        Log.d(`ws ${this.url} opened`);
        if (this.ws === evt.target) {
            this.onConnected();
        }
    }

    private onClose(evt: CloseEvent) {
        Log.d(`ws ${this.url} close`);
        this.destoryWs();
        this.checkIsNeedReConnect();
    }

    private onError(evt: ErrorEvent) {
        Log.d(`ws ${this.url} error`, evt);
        this.destoryWs();
        this.checkIsNeedReConnect();
    }

    private onMessage(msg: MessageEvent) {
        console.info('onMessage:', msg.data);

    }

    private onSendHeartBeat() {
        this.send('HeartBeat');
    }

    /** 连接建立之后调用，这里可以发送身份验证等.......*/
    private onConnected() {
        this._isReady = true;
        this.retryCount = 0;
        if (AutoHearBeat) {
            this.scheduleHeartBeat();
        }
        if (this.connectCallBack) {
            this.connectCallBack();
            this.connectCallBack = null;
        }
    }

    private onReConnect() {
        //断线后一直进入重连
        if (!this.ws && !this._isReady) {
            this.retryCount++;
            this.connect();
        } else {
            this.unScheduleReConnect();
        }
    }

    private destoryWs() {
        this._isReady = false;
        this.unScheduleHeartBeat();
        this.unScheduleReConnect();
        if (this.ws) {
            this.ws.onopen = null;
            this.ws.onmessage = null;
            this.ws.onclose = null;
            this.ws.onerror = null;
            if (this.ws.readyState !== WebSocket.CLOSING && this.ws.readyState !== WebSocket.CLOSED) {
                this.ws.close(3000, 'client close .');
            }
        }
        this.ws = null;
    }

    private checkIsNeedReConnect() {
        if (this.isAutoRetry) {
            this.scheduleReConnect();
        }
    }

    private scheduleReConnect() {
        this.unScheduleReConnect();
        this.reConnectTimer = setInterval(this.onReConnect.bind(this), ReConnectGapTime);
    }

    private unScheduleReConnect() {
        clearInterval(this.reConnectTimer);
    }

    private scheduleHeartBeat() {
        this.unScheduleHeartBeat();
        this.heartBeatTimer = setInterval(this.onSendHeartBeat.bind(this), HeartBeatGapTime);
    }

    private unScheduleHeartBeat() {
        clearInterval(this.heartBeatTimer);
    }
}