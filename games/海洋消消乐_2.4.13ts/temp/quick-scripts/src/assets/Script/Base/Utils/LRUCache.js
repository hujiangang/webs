"use strict";
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