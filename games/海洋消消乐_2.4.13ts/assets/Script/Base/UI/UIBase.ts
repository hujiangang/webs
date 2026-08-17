import EventMgr from "../Manager/EventMgr";
import { Event } from "../../Logic/Data/Const/Event";
import { UIHudDef } from "../../Logic/Data/Interface/UIData";
import { GuideUtils } from "../../../GodGuide/GuideUtils";

const { ccclass, property } = cc._decorator;
@ccclass
export default abstract class UIBase extends cc.Component {
    /**通知事件列表 */
    private uiEventList: Map<Event.UI, Function> = null;

    private _closeCallBack: Function = null;

    public uiHudDef: UIHudDef;

    public isShow: boolean = false;
    /* ----------------------------- 以下方法不能在子类重写 ----------------------------- */
    /**初始化函数，在onLoad之前被调用，params为打开ui时传入的不定参数数组 */
    init(params) {
        this.onInit(params);
    }

    /**onLoad 会在组件被首次加载的时候被回调。且优先于任何start */
    onLoad() {
        this.uiEventList = new Map<Event.UI, Function>(this.initUIEvent());
        this.uiEventList.forEach((cb, key) => {
            EventMgr.ins.register(key, cb, this);
        }, this)
        this.onUILoad();
    }

    onDestroy() {
        if (this.uiEventList) {
            this.uiEventList.forEach((cb, key) => {
                EventMgr.ins.unRegister(key, cb, this);
            }, this);
            this.uiEventList.clear();
        }
        this.onUIDestroy();
    }

    onEnable() {
    }

    onDisable() {
        this.onHide();
    }

    start() {
        this.onStart();
    }

    update(dt) {
        this.onUpdate(dt);
    }
    /* ---------------------------------------------------------------------------------- */

    /**注册notice事件，disable的时候会自动移除 */
    public addUIEventListener(eventName: Event.UI, cb: Function) {
        EventMgr.ins.register(eventName, cb, this);
        this.uiEventList.set(eventName, cb);
    }

    public initUIEvent(): Array<[Event.UI, Function]> {
        return [];
    }

    public onInit(params) {

    }

    public onUILoad() {

    }

    public onUIDestroy() {

    }

    public onShow(closeCallBack?: Function) {
        this._closeCallBack = closeCallBack;

        if (this.uiHudDef == UIHudDef.GameOverWin) {
            GuideUtils.checkGuide();
        }
    }

    public onHide() {
        this._closeCallBack && this._closeCallBack();
        this._closeCallBack = null;
    }

    public onStart() {

    }

    public onUpdate(dt) {

    }

    public onClose() {
        this._closeCallBack && this._closeCallBack();
        this._closeCallBack = null;
    }
}