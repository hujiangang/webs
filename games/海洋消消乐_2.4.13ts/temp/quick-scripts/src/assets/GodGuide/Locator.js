"use strict";
cc._RF.push(module, '71c10J7fzpJspAGp3Oow6Hq', 'Locator');
// GodGuide/Locator.ts

"use strict";
/**
 * @object
 * Location主要用从场景树中检索UI节点
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locator = void 0;
// const { ccclass, property } = cc._decorator;
// @ccclass
var Locator = /** @class */ (function () {
    function Locator() {
    }
    Locator.init = function () {
        this.locating = false;
        this.startTime = 0;
        this.timeout = 5000;
    };
    /**
     * 定位解析
     * @param locator
     * @returns {Array}
     */
    Locator.parse = function (locator) {
        cc['assert'](locator, 'locator string is null');
        //使用正则表达示分隔名字
        var names = locator.split(/[.,//,>,#]/g);
        var segments = names.map(function (name) {
            var index = locator.indexOf(name);
            var symbol = locator[index - 1] || '>';
            return { symbol: symbol, name: name.trim() };
        });
        // console.log('segments----->', segments);
        return segments;
    };
    /**
     * 通过节点名搜索节点对象
     * @param root
     * @param name
     * @returns {*}
     */
    Locator.seekNodeByName = function (root, name) {
        if (!root)
            return null;
        if (root.getName() == name)
            return root;
        var arrayRootChildren = root.getChildren();
        var length = arrayRootChildren.length;
        for (var i = 0; i < length; i++) {
            var child = arrayRootChildren[i];
            var res = this.seekNodeByName(child, name);
            if (res != null)
                return res;
        }
        return null;
    };
    /**
     * 在root节点中，定位locator
     * @param root
     * @param locator
     * @param cb
     */
    Locator.locateNode = function (root, locator, cb) {
        var _this = this;
        if (!Locator.locating) {
            this.startTime = Date.now();
            this.locating = true;
        }
        var segments = Locator.parse(locator);
        cc['assert'](segments && segments.length);
        //cc.log('locateNode:' + locator);
        var child, node = root;
        for (var i = 0; i < segments.length; i++) {
            var item = segments[i];
            switch (item.symbol) {
                case '/':
                    child = node.getChildByName(item.name);
                    break;
                case '.':
                    child = node[item.name];
                    break;
                case '>':
                    child = this.seekNodeByName(node, item.name);
                    break;
                // case '#':
                //     child = this.seekNodeByName(node, item.name);
                //     break;
            }
            if (!child) {
                node = null;
                break;
            }
            node = child;
        }
        if (node && node.active && cb) {
            this.locating = false;
            cb(null, node);
        }
        else if (cb) {
            if (Date.now() - this.startTime > this.timeout) {
                cb({ error: 'timeout', locator: locator });
            }
            else {
                setTimeout(function () {
                    _this.locateNode(root, locator, cb);
                }, 10);
            }
        }
        return node;
    };
    Locator.getNodeFullPath = function (node) {
        var array = [];
        var temp = node;
        do {
            array.unshift(temp.name);
            temp = temp.parent;
        } while (temp && temp.name !== 'Canvas');
        return array.join('/');
    };
    Locator.timeout = 5000;
    return Locator;
}());
exports.Locator = Locator;
window["Locator"] = Locator;

cc._RF.pop();