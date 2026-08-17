
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Utils/LRUCache.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5d097H4LQlJ0YYSa/9oIwSC', 'LRUCache');
// Script/Base/Utils/LRUCache.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LRUCache = void 0;
var Node = /** @class */ (function () {
    function Node(key, data) {
        this.key = key;
        this.data = data;
    }
    return Node;
}());
var LRUCache = /** @class */ (function () {
    function LRUCache(capacity) {
        this.capacity = 0;
        this._hashmap = {};
        this.capacity = capacity;
        this.head = new Node();
        this.tail = new Node();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    LRUCache.prototype.print = function () {
        console.log(this._hashmap);
    };
    LRUCache.prototype.get = function (key) {
        var node = this._hashmap[key];
        if (!node)
            return '';
        if (this.count == 1)
            return node.data;
        this.detach(node);
        this.attach(this.head, node);
        return node.data;
    };
    LRUCache.prototype.pack = function (key, data) {
        if (this.capacity <= 0)
            return;
        var node = this._hashmap[key];
        if (node) {
            this.detach(node);
            this.attach(this.head, node);
            node.data = data;
        }
        else {
            node = new Node(key, data);
            this._hashmap[key] = node;
            this.attach(this.head, node);
            if (this.count > this.capacity) {
                var nodeToRemove = this.tail.prev;
                return nodeToRemove;
            }
        }
        return null;
    };
    LRUCache.prototype.remove = function (key) {
        var nodeToRemove = this._hashmap[key];
        if (!nodeToRemove)
            return;
        this.detach(nodeToRemove);
        this._hashmap[key] = null;
        delete this._hashmap[key];
    };
    LRUCache.prototype.removeAll = function () {
        var keys = Object.keys(this._hashmap);
        for (var i = 0; i < keys.length; i++) {
            this.remove(keys[i]);
        }
    };
    Object.defineProperty(LRUCache.prototype, "hashmap", {
        get: function () {
            return this._hashmap;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LRUCache.prototype, "count", {
        get: function () {
            var keys = Object.keys(this._hashmap);
            return keys.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LRUCache.prototype, "oldNode", {
        get: function () {
            return this.tail.prev;
        },
        enumerable: false,
        configurable: true
    });
    LRUCache.prototype.attach = function (head, node) {
        node.prev = head;
        node.next = head.next;
        node.next.prev = node;
        node.prev.next = node;
    };
    LRUCache.prototype.detach = function (node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    };
    return LRUCache;
}());
exports.LRUCache = LRUCache;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxVdGlsc1xcTFJVQ2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFNQyxjQUFtQixHQUFTLEVBQUUsSUFBVTtRQUN2QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLENBQUM7SUFDRixXQUFDO0FBQUQsQ0FWQSxBQVVDLElBQUE7QUFDRDtJQU1DLGtCQUFtQixRQUFRO1FBSG5CLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUcxQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRU0sd0JBQUssR0FBWjtRQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFTSxzQkFBRyxHQUFWLFVBQVcsR0FBRztRQUNiLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUNyQixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUV0QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxN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Q0FBQyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUM1QixDQUFDO0lBQ0YsZUFBQztBQUFELENBMUZBLEFBMEZDLElBQUE7QUExRlksNEJBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBOb2RlIHtcblx0cHVibGljIGtleTtcblx0cHVibGljIGRhdGE7XG5cdHB1YmxpYyBuZXh0OiBOb2RlO1xuXHRwdWJsaWMgcHJldjogTm9kZTtcblxuXHRwdWJsaWMgY29uc3RydWN0b3Ioa2V5PzogYW55LCBkYXRhPzogYW55KSB7XG5cdFx0dGhpcy5rZXkgPSBrZXk7XG5cdFx0dGhpcy5kYXRhID0gZGF0YTtcblx0fVxufVxuZXhwb3J0IGNsYXNzIExSVUNhY2hlIHtcblx0cHJpdmF0ZSBoZWFkOiBOb2RlO1xuXHRwcml2YXRlIHRhaWw6IE5vZGU7XG5cdHByaXZhdGUgY2FwYWNpdHk6IG51bWJlciA9IDA7XG5cdHByaXZhdGUgX2hhc2htYXA6IGFueSA9IHt9O1xuXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihjYXBhY2l0eSkge1xuXHRcdHRoaXMuY2FwYWNpdHkgPSBjYXBhY2l0eTtcblx0XHR0aGlzLmhlYWQgPSBuZXcgTm9kZSgpO1xuXHRcdHRoaXMudGFpbCA9IG5ldyBOb2RlKCk7XG5cblx0XHR0aGlzLmhlYWQubmV4dCA9IHRoaXMudGFpbDtcblx0XHR0aGlzLnRhaWwucHJldiA9IHRoaXMuaGVhZDtcblx0fVxuXG5cdHB1YmxpYyBwcmludCgpIHtcblx0XHRjb25zb2xlLmxvZyh0aGlzLl9oYXNobWFwKTtcblx0fVxuXG5cdHB1YmxpYyBnZXQoa2V5KSB7XG5cdFx0dmFyIG5vZGU6IE5vZGUgPSB0aGlzLl9oYXNobWFwW2tleV07XG5cdFx0aWYgKCFub2RlKSByZXR1cm4gJyc7XG5cdFx0aWYgKHRoaXMuY291bnQgPT0gMSkgcmV0dXJuIG5vZGUuZGF0YTtcblxuXHRcdHRoaXMuZGV0YWNoKG5vZGUpO1xuXHRcdHRoaXMuYXR0YWNoKHRoaXMuaGVhZCwgbm9kZSk7XG5cblx0XHRyZXR1cm4gbm9kZS5kYXRhO1xuXHR9XG5cblx0cHVibGljIHBhY2soa2V5LCBkYXRhKTogTm9kZSB7XG5cdFx0aWYgKHRoaXMuY2FwYWNpdHkgPD0gMCkgcmV0dXJuO1xuXG5cdFx0dmFyIG5vZGU6IE5vZGUgPSB0aGlzLl9oYXNobWFwW2tleV07XG5cdFx0aWYgKG5vZGUpIHtcblx0XHRcdHRoaXMuZGV0YWNoKG5vZGUpO1xuXHRcdFx0dGhpcy5hdHRhY2godGhpcy5oZWFkLCBub2RlKTtcblx0XHRcdG5vZGUuZGF0YSA9IGRhdGE7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5vZGUgPSBuZXcgTm9kZShrZXksIGRhdGEpO1xuXHRcdFx0dGhpcy5faGFzaG1hcFtrZXldID0gbm9kZTtcblx0XHRcdHRoaXMuYXR0YWNoKHRoaXMuaGVhZCwgbm9kZSk7XG5cblx0XHRcdGlmICh0aGlzLmNvdW50ID4gdGhpcy5jYXBhY2l0eSkge1xuXHRcdFx0XHR2YXIgbm9kZVRvUmVtb3ZlOiBOb2RlID0gdGhpcy50YWlsLnByZXY7XG5cdFx0XHRcdHJldHVybiBub2RlVG9SZW1vdmU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cHVibGljIHJlbW92ZShrZXkpIHtcblx0XHR2YXIgbm9kZVRvUmVtb3ZlOiBOb2RlID0gdGhpcy5faGFzaG1hcFtrZXldO1xuXHRcdGlmICghbm9kZVRvUmVtb3ZlKSByZXR1cm47XG5cdFx0dGhpcy5kZXRhY2gobm9kZVRvUmVtb3ZlKTtcblx0XHR0aGlzLl9oYXNobWFwW2tleV0gPSBudWxsO1xuXHRcdGRlbGV0ZSB0aGlzLl9oYXNobWFwW2tleV07XG5cdH1cblxuXHRwdWJsaWMgcmVtb3ZlQWxsKCkge1xuXHRcdHZhciBrZXlzOiBhbnlbXSA9IE9iamVjdC5rZXlzKHRoaXMuX2hhc2htYXApO1xuXHRcdGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0aGlzLnJlbW92ZShrZXlzW2ldKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGhhc2htYXAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2hhc2htYXA7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IGNvdW50KCkge1xuXHRcdHZhciBrZXlzOiBhbnlbXSA9IE9iamVjdC5rZXlzKHRoaXMuX2hhc2htYXApO1xuXHRcdHJldHVybiBrZXlzLmxlbmd0aDtcblx0fVxuXG5cdHB1YmxpYyBnZXQgb2xkTm9kZSgpIHtcblx0XHRyZXR1cm4gdGhpcy50YWlsLnByZXY7XG5cdH1cblxuXHRwcml2YXRlIGF0dGFjaChoZWFkOiBOb2RlLCBub2RlOiBOb2RlKSB7XG5cdFx0bm9kZS5wcmV2ID0gaGVhZDtcblx0XHRub2RlLm5leHQgPSBoZWFkLm5leHQ7XG5cdFx0bm9kZS5uZXh0LnByZXYgPSBub2RlO1xuXHRcdG5vZGUucHJldi5uZXh0ID0gbm9kZTtcblx0fVxuXG5cdHByaXZhdGUgZGV0YWNoKG5vZGU6IE5vZGUpIHtcblx0XHRub2RlLnByZXYubmV4dCA9IG5vZGUubmV4dDtcblx0XHRub2RlLm5leHQucHJldiA9IG5vZGUucHJldjtcblx0fVxufVxuIl19