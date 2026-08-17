
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/NodePoolMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxOb2RlUG9vbE1nci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhEQUE2RDtBQUU3RCwrQkFBK0I7QUFDL0I7SUFNSTtRQUZRLGNBQVMsR0FBNkIsSUFBSSxDQUFDO1FBRy9DLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQXVCLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksNEJBQU0sR0FBYixVQUFjLElBQXFCLEVBQUUsTUFBWSxFQUFFLEtBQWlCO1FBQWpCLHNCQUFBLEVBQUEsU0FBaUI7UUFDaEUsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDNUI7UUFDRCxJQUFJLE1BQU0sRUFBRTtZQUNSLElBQUksV0FBVyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3RFLEtBQUssSUFBSSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxHQUFHO2dCQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUNyQztTQUNKO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksOEJBQVEsR0FBZixVQUFnQixJQUFxQixFQUFFLElBQWE7UUFDaEQsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsQjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzdCO1NBQ0o7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDZCQUFPLEdBQWQsVUFBZSxJQUFxQixFQUFFLE1BQWtCO1FBQWxCLHVCQUFBLEVBQUEsYUFBa0I7UUFDcEQsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksSUFBSSxHQUFZLElBQUksQ0FBQztRQUN6QixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7U0FDcEI7YUFBTTtZQUNILElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM5QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQ3BDO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDZCQUFPLEdBQWQsVUFBZSxJQUFxQjtRQUNoQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7O09BR0c7SUFDSSwrQkFBUyxHQUFoQixVQUFpQixJQUFxQjtRQUNsQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSw2QkFBTyxHQUFkO1FBQ0ksS0FBSyxJQUFNLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRU0sZ0NBQVUsR0FBakIsVUFBa0IsTUFBVztRQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxNQUFNLEVBQUU7WUFDUixJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqQzthQUFNO1lBQ0gsSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQTNHYSxlQUFHLEdBQWdCLG1DQUFnQixDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQTZHL0Usa0JBQUM7Q0EvR0QsQUErR0MsSUFBQTtrQkEvR29CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaW5nbGV0b25GYWN0b3J5IH0gZnJvbSBcIi4uL1V0aWxzL1NpbmdsZXRvbkZhY3RvcnlcIjtcblxuLyoq6ZKI5a+5Y29jb3NDcmVhdG9y55qE5a+56LGh5rGg566h55CGLi4uLi4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vZGVQb29sTWdyIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgaW5zOiBOb2RlUG9vbE1nciA9IFNpbmdsZXRvbkZhY3RvcnkuZ2V0SW5zdGFuY2UoTm9kZVBvb2xNZ3IpO1xuXG4gICAgcHJpdmF0ZSBtUG9vbERhdGE6IE1hcDxzdHJpbmcsIGNjLk5vZGVQb29sPiA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tUG9vbERhdGEgPSBuZXcgTWFwPHN0cmluZywgY2MuTm9kZVBvb2w+KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yib5bu65LiA5Liq5ZCN5Li6bmFtZSzmlbDph4/kuLpjb3VudCznsbvlnovkuLogcHJlZmFiIOeahOWvueixoeaxoFxuICAgICAqIEBwYXJhbSBuYW1lIFxuICAgICAqIEBwYXJhbSBwcmVmYWIg5Y+v5Lul5LiN5LygLOS4jeS8oOWImeWIm+W7uuepum5vZGVcbiAgICAgKiBAcGFyYW0gY291bnQg6buY6K6k5Li6NVxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGUobmFtZTogc3RyaW5nIHwgbnVtYmVyLCBwcmVmYWI/OiBhbnksIGNvdW50OiBudW1iZXIgPSA1KSB7XG4gICAgICAgIG5hbWUgPSBuYW1lLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBwb29sID0gdGhpcy5nZXRQb29sKG5hbWUpO1xuICAgICAgICBpZiAoIXBvb2wpIHtcbiAgICAgICAgICAgIHBvb2wgPSBuZXcgY2MuTm9kZVBvb2woKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJlZmFiKSB7XG4gICAgICAgICAgICBsZXQgcmVtYWluQ291bnQgPSAoY291bnQgLSBwb29sLnNpemUoKSkgPCAwID8gMCA6IGNvdW50IC0gcG9vbC5zaXplKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gcmVtYWluQ291bnQ7IGktLTspIHtcbiAgICAgICAgICAgICAgICBwb29sLnB1dCh0aGlzLmNyZWF0ZUl0ZW0ocHJlZmFiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tUG9vbERhdGEuc2V0KG5hbWUsIHBvb2wpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOmHiuaUvuS4gOS4qm5vZGXov5vmsaBcbiAgICAgKiBAcGFyYW0gbmFtZSDmsaDlkI1cbiAgICAgKiBAcGFyYW0gaXRlbSBub2Rl5a6e5L6LXG4gICAgICovXG4gICAgcHVibGljIGZyZWVJdGVtKG5hbWU6IHN0cmluZyB8IG51bWJlciwgaXRlbTogY2MuTm9kZSkge1xuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IHBvb2wgPSB0aGlzLmdldFBvb2wobmFtZSk7XG4gICAgICAgICAgICBpZiAocG9vbCkge1xuICAgICAgICAgICAgICAgIHBvb2wucHV0KGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZShuYW1lLCBpdGVtLCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVJdGVtKG5hbWUsIGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5LuO5oyH5a6a5rGg5Lit6I635Y+W5LiA5Liq5a6e5L6LXG4gICAgICogQHBhcmFtIG5hbWUgXG4gICAgICogQHBhcmFtIHByZWZhYiBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0SXRlbShuYW1lOiBzdHJpbmcgfCBudW1iZXIsIHByZWZhYjogYW55ID0gbnVsbCk6IGNjLk5vZGUge1xuICAgICAgICBuYW1lID0gU3RyaW5nKG5hbWUpO1xuICAgICAgICBjb25zdCBwb29sID0gdGhpcy5nZXRQb29sKG5hbWUpO1xuICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgICAgIGlmIChwb29sICYmIHBvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgbm9kZSA9IHBvb2wuZ2V0KClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLmNyZWF0ZUl0ZW0ocHJlZmFiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5jaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ+WvueixoeegtOaNnyA6ICcsIG5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbShuYW1lLCBwcmVmYWIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOagueaNruaxoOWQjSzmi7/mlbTkuKrmsaBcbiAgICAgKiBAcGFyYW0gbmFtZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0UG9vbChuYW1lOiBzdHJpbmcgfCBudW1iZXIpOiBjYy5Ob2RlUG9vbCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5tUG9vbERhdGEuZ2V0KFN0cmluZyhuYW1lKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6ZSA5q+B5p+Q5Liq5a+56LGh5rGgXG4gICAgICogQHBhcmFtIG5hbWUgXG4gICAgICovXG4gICAgcHVibGljIGNsZWFyUG9vbChuYW1lOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKTtcbiAgICAgICAgY29uc3QgcG9vbCA9IHRoaXMuZ2V0UG9vbChuYW1lKTtcbiAgICAgICAgaWYgKHBvb2wpIHtcbiAgICAgICAgICAgIHBvb2wuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1Qb29sRGF0YS5kZWxldGUobmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6ZSA5q+B5omA5pyJ55qE5rGg6YeM55qE5a+56LGhXG4gICAgICovXG4gICAgcHVibGljIGRlc3RvcnkoKSB7XG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBpbiB0aGlzLm1Qb29sRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclBvb2wobmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlSXRlbShwcmVmYWI6IGFueSk6IGNjLk5vZGUge1xuICAgICAgICBsZXQgbm9kZSA9IG51bGw7XG4gICAgICAgIGlmIChwcmVmYWIpIHtcbiAgICAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZSA9IG5ldyBjYy5Ob2RlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG59Il19