"use strict";
cc._RF.push(module, '72621mL9I9Bcr83XbKkt9t/', 'NodePoolMgr');
// Script/Base/Manager/NodePoolMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SingletonFactory_1 = require("../Utils/SingletonFactory");
/**针对cocosCreator的对象池管理..... */
var NodePoolMgr = /** @class */ (function () {
    function NodePoolMgr() {
        this.mPoolData = null;
        this.mPoolData = new Map();
    }
    /**
     * 创建一个名为name,数量为count,类型为 prefab 的对象池
     * @param name
     * @param prefab 可以不传,不传则创建空node
     * @param count 默认为5
     */
    NodePoolMgr.prototype.create = function (name, prefab, count) {
        if (count === void 0) { count = 5; }
        name = name.toString();
        var pool = this.getPool(name);
        if (!pool) {
            pool = new cc.NodePool();
        }
        if (prefab) {
            var remainCount = (count - pool.size()) < 0 ? 0 : count - pool.size();
            for (var i = remainCount; i--;) {
                pool.put(this.createItem(prefab));
            }
        }
        this.mPoolData.set(name, pool);
    };
    /**
     * 释放一个node进池
     * @param name 池名
     * @param item node实例
     */
    NodePoolMgr.prototype.freeItem = function (name, item) {
        if (item) {
            name = String(name);
            var pool = this.getPool(name);
            if (pool) {
                pool.put(item);
            }
            else {
                this.create(name, item, 1);
                this.freeItem(name, item);
            }
        }
    };
    /**
     * 从指定池中获取一个实例
     * @param name
     * @param prefab
     */
    NodePoolMgr.prototype.getItem = function (name, prefab) {
        if (prefab === void 0) { prefab = null; }
        name = String(name);
        var pool = this.getPool(name);
        var node = null;
        if (pool && pool.size() > 0) {
            node = pool.get();
        }
        else {
            node = this.createItem(prefab);
        }
        if (node.children == null) {
            console.warn('对象破损 : ', name);
            return this.getItem(name, prefab);
        }
        else {
            return node;
        }
    };
    /**
     * 根据池名,拿整个池
     * @param name
     */
    NodePoolMgr.prototype.getPool = function (name) {
        return this.mPoolData.get(String(name));
    };
    /**
     * 销毁某个对象池
     * @param name
     */
    NodePoolMgr.prototype.clearPool = function (name) {
        name = String(name);
        var pool = this.getPool(name);
        if (pool) {
            pool.clear();
        }
        this.mPoolData.delete(name);
    };
    /**
     * 销毁所有的池里的对象
     */
    NodePoolMgr.prototype.destory = function () {
        for (var name in this.mPoolData) {
            this.clearPool(name);
        }
    };
    NodePoolMgr.prototype.createItem = function (prefab) {
        var node = null;
        if (prefab) {
            node = cc.instantiate(prefab);
        }
        else {
            node = new cc.Node();
        }
        return node;
    };
    NodePoolMgr.ins = SingletonFactory_1.SingletonFactory.getInstance(NodePoolMgr);
    return NodePoolMgr;
}());
exports.default = NodePoolMgr;

cc._RF.pop();