/**
 * spine动画控制器
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class SpinePlayerCtrl extends sp.Skeleton {
    private callback: Function = null;
    private frameCallback: Function = null;
    private _curPlayName: string = null;
    private _timeout = null;

    onLoad() {
        this.setCompleteListener(this._handleAniCompleteEvent.bind(this));
        this.setEventListener(this._handleFrameEvent.bind(this));
    }

    /** 
     * 播放动画
     * @param name 动画名字
     * @param trackIndex ..搞不清这是个什么玩意
     * @param isloop 是否循环
     * @param callback 动画播放完成回调
     * @param frameEventCallback 动画自定义事件回调
     * @param nextData 如果需要播放下一个动画的数据
     */
    public play(name: string, trackIndex: number, isloop: boolean = false, callback?: Function, frameEventCallback?: Function, nextData?: { name: string, loop: boolean }) {
        this.callback = callback;
        this.frameCallback = frameEventCallback;
        this.node.active = true;
        this._curPlayName = name;
        // if (this.callback) {
        //     this._timeout = setTimeout(() => {
        //         this.callback && this.callback();
        //         this.callback = null;
        //         this._curPlayName = null;
        //     }, 5 * 1000);
        // }
        this.setAnimation(trackIndex, name, isloop);
        if (nextData) {
            this.addAnimation(0, nextData.name, nextData.loop, 0);
        }
    }

    public isStopSpine(isPaused: boolean) {
        this.paused = isPaused;
    }

    /**
     * 动画播放完成处理
     */
    private _handleAniCompleteEvent(trackEntry, loopCount) {
        // console.error("播放完毕");
        clearTimeout(this._timeout);
        this._curPlayName = null;
        if (this.callback) {
            this.callback();
            // this.callback = null;
        }
    }

    /**动画帧监听 */
    private _handleFrameEvent(event) {
        if (this.frameCallback) {
            this.frameCallback(event);
        }
    }


    onDestroy() {
        this.callback = null;
        this.frameCallback = null;
    }

    _setMix(anim1, anim2) {
        this.setMix(anim1, anim2, 0.5);
        this.setMix(anim2, anim1, 0.5);
    }

    /**
     * 获得当前节点
     */
    public get curPlay(): string {
        return this._curPlayName;
    }

}

