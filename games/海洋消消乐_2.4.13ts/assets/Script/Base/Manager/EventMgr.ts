import { DataPool, IPoolData } from "../DataPool";
import { SingletonFactory } from "../Utils/SingletonFactory";

class EventData implements IPoolData {
    public eventHandler: Function
    public thisArg: any
    public isOnce: boolean;

    public destory() {
        this.eventHandler = null;
        this.thisArg = null;
        this.isOnce = false
    }
}

export default class EventMgr {

    public static ins: EventMgr = SingletonFactory.getInstance(EventMgr);

    private _dataPool: DataPool<EventData> = null;

    private events: Map<string | number, Set<EventData>> = null

    public constructor() {
        this._dataPool = new DataPool<EventData>(20, EventData);
        this.events = new Map<string | number, Set<EventData>>()
    }

    // 是否已注册
    private hasRegister(event: Set<EventData>, eventHandler: Function, thisArg?: any): EventData {
        let ed: EventData = null
        event.forEach(e => {
            if (e.eventHandler == eventHandler && e.thisArg == thisArg) {
                ed = e;
            }
        })
        return ed
    }

    public register(id: string | number, eventHandler: Function, thisArg?: any): void {

        let event: Set<EventData> | undefined = this.events.get(id)
        if (!event) {
            event = new Set<EventData>()
            this.events.set(id, event);
        }

        if (this.hasRegister(event, eventHandler, thisArg)) {
            console.error("事件重复注册")
        } else {
            let eventData = this._dataPool.getData()
            eventData.eventHandler = eventHandler
            eventData.thisArg = thisArg
            eventData.isOnce = false
            event.add(eventData)
        }
    }

    public once(id: string | number, eventHandler: Function, thisArg?: any): void {

        let event: Set<EventData> | undefined = this.events.get(id)
        if (!event) {
            event = new Set<EventData>()
            this.events.set(id, event);
        }

        if (this.hasRegister(event, eventHandler)) {
            console.error("事件重复注册");
        } else {
            let eventData = this._dataPool.getData()
            eventData.eventHandler = eventHandler
            eventData.thisArg = thisArg
            eventData.isOnce = true
            event.add(eventData)
        }
    }

    /**
     * 反注册
     * @param id 
     * @param thisArg 
     */
    public unRegister(id: string | number, eventHandler: Function, thisArg: any): void {

        let event: Set<EventData> | undefined = this.events.get(id)
        if (!event) {
            return
        }

        let d = this.hasRegister(event, eventHandler, thisArg);
        if (d != null) {
            event.delete(d);
            this._dataPool.freeData(d)
        }
    }

    /**
     * 反注册所有事件
     */
    public destory() {
        this.events = null;
        this.events = new Map<string | number, Set<EventData>>();
    }

    /**
     * 发送事件
     * @param id 
     * @param data 
     */
    public send(id: string | number, ...data: any) {

        let event: Set<EventData> | undefined = this.events.get(id)
        if (!event) {
            return
        }

        event.forEach((d) => {
            d.eventHandler.apply(d.thisArg, data)
            if (d.isOnce) {
                event.delete(d)
                this._dataPool.freeData(d)
            }
        })
    }

}

window["EventMgr"] = EventMgr;