import { SingletonFactory } from "../Utils/SingletonFactory";

/**针对cocosCreator的对象池管理..... */
export default class NodePoolMgr {

    public static ins: NodePoolMgr = SingletonFactory.getInstance(NodePoolMgr);

    private mPoolData: Map<string, cc.NodePool> = null;

    constructor() {
        this.mPoolData = new Map<string, cc.NodePool>();
    }

    /**
     * 创建一个名为name,数量为count,类型为 prefab 的对象池
     * @param name 
     * @param prefab 可以不传,不传则创建空node
     * @param count 默认为5
     */
    public create(name: string | number, prefab?: any, count: number = 5) {
        name = name.toString();
        let pool = this.getPool(name);
        if (!pool) {
            pool = new cc.NodePool();
        }
        if (prefab) {
            let remainCount = (count - pool.size()) < 0 ? 0 : count - pool.size();
            for (let i = remainCount; i--;) {
                pool.put(this.createItem(prefab));
            }
        }
        this.mPoolData.set(name, pool);
    }

    /**
     * 释放一个node进池
     * @param name 池名
     * @param item node实例
     */
    public freeItem(name: string | number, item: cc.Node) {
        if (item) {
            name = String(name);
            const pool = this.getPool(name);
            if (pool) {
                pool.put(item);
            } else {
                this.create(name, item, 1);
                this.freeItem(name, item);
            }
        }
    }

    /**
     * 从指定池中获取一个实例
     * @param name 
     * @param prefab 
     */
    public getItem(name: string | number, prefab: any = null): cc.Node {
        name = String(name);
        const pool = this.getPool(name);
        let node: cc.Node = null;
        if (pool && pool.size() > 0) {
            node = pool.get()
        } else {
            node = this.createItem(prefab);
        }
        if (node.children == null) {
            console.warn('对象破损 : ', name);
            return this.getItem(name, prefab)
        } else {
            return node;
        }
    }

    /**
     * 根据池名,拿整个池
     * @param name 
     */
    public getPool(name: string | number): cc.NodePool | null {
        return this.mPoolData.get(String(name));
    }

    /**
     * 销毁某个对象池
     * @param name 
     */
    public clearPool(name: string | number) {
        name = String(name);
        const pool = this.getPool(name);
        if (pool) {
            pool.clear();
        }
        this.mPoolData.delete(name);
    }

    /**
     * 销毁所有的池里的对象
     */
    public destory() {
        for (const name in this.mPoolData) {
            this.clearPool(name);
        }
    }

    public createItem(prefab: any): cc.Node {
        let node = null;
        if (prefab) {
            node = cc.instantiate(prefab);
        } else {
            node = new cc.Node();
        }
        return node;
    }

}