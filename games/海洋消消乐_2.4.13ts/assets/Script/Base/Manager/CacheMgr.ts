import { LOG_TAG, Log } from "../Utils/Log";
import { LRUCache } from "../Utils/LRUCache";
import EventMgr from "./EventMgr";
import { SingletonFactory } from "../Utils/SingletonFactory";
import { Event } from "../../Logic/Data/Const/Event";

export default class CacheMgr {

    private lru: LRUCache = new LRUCache(300); //内存中存在的缓存资源数的警告值

    public static ins: CacheMgr = SingletonFactory.getInstance(CacheMgr);

    constructor() {
        let self = this;
        cc.loader['_cache'] = new Proxy(cc.loader['_cache'], {
            get(target, property) {
                if (property in target) {
                    self.getCache(property, target[property]);
                    return target[property];
                }
            },
            set(target, property, value) {
                self.setCache(property, value);
                target[property] = value;
                return true;
            },
            deleteProperty(target, property) {
                self.deleteCache(property, target[property]) &&
                    delete target[property];
                return true;
            }
        });
    }

    private getCache(property, cache) {
        Log.log(LOG_TAG.CACHE, property);
        this.lru.get(property);
    }

    private setCache(property, cache) {
        Log.log(LOG_TAG.CACHE, property);
        let remove = this.lru.pack(property, cache);
        if (remove) {
            EventMgr.ins.send(Event.System.CacheWarning);
        }
    }

    private deleteCache(property, cache) {
        Log.log(LOG_TAG.CACHE, property);
        this.lru.remove(property);
        return true;
    }
}