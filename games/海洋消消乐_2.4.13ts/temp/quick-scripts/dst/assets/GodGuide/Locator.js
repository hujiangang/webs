
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/Locator.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXExvY2F0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7R0FHRzs7O0FBRUgsK0NBQStDO0FBQy9DLFdBQVc7QUFDWDtJQUFBO0lBdUhBLENBQUM7SUEvR1UsWUFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUNEOzs7O09BSUc7SUFDSSxhQUFLLEdBQVosVUFBYSxPQUFPO1FBQ2hCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztRQUNoRCxhQUFhO1FBQ2IsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN6QyxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSTtZQUNuQyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDO1lBQ3ZDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztRQUNILDJDQUEyQztRQUMzQyxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxzQkFBYyxHQUFyQixVQUFzQixJQUFJLEVBQUUsSUFBSTtRQUM1QixJQUFJLENBQUMsSUFBSTtZQUNMLE9BQU8sSUFBSSxDQUFDO1FBRWhCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLElBQUk7WUFD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dUIsSUFBSTtRQUN2QixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsR0FBRztZQUNDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3RCLFFBQVEsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFDO1FBQ3hDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBaEhNLGVBQU8sR0FBVyxJQUFJLENBQUM7SUFpSGxDLGNBQUM7Q0F2SEQsQUF1SEMsSUFBQTtBQXZIWSwwQkFBTztBQXdIcEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQG9iamVjdFxuICogTG9jYXRpb27kuLvopoHnlKjku47lnLrmma/moJHkuK3mo4DntKJVSeiKgueCuVxuICovXG5cbi8vIGNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG4vLyBAY2NjbGFzc1xuZXhwb3J0IGNsYXNzIExvY2F0b3Ige1xuICAgIC8vIHRpbWVvdXQ6IDUwMDA7IC8v6LaF5pe2XG4gICAgLy8gbG9jYXRpbmc6IGFueTtcbiAgICAvLyBzdGFydFRpbWU6IG51bWJlcjtcbiAgICBzdGF0aWMgbG9jYXRpbmc6IGFueTtcbiAgICBzdGF0aWMgc3RhcnRUaW1lOiBudW1iZXI7XG4gICAgc3RhdGljIHRpbWVvdXQ6IG51bWJlciA9IDUwMDA7XG5cbiAgICBzdGF0aWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5sb2NhdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XG4gICAgICAgIHRoaXMudGltZW91dCA9IDUwMDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWumuS9jeino+aekFxuICAgICAqIEBwYXJhbSBsb2NhdG9yXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIHN0YXRpYyBwYXJzZShsb2NhdG9yKSB7XG4gICAgICAgIGNjWydhc3NlcnQnXShsb2NhdG9yLCAnbG9jYXRvciBzdHJpbmcgaXMgbnVsbCcpO1xuICAgICAgICAvL+S9v+eUqOato+WImeihqOi+vuekuuWIhumalOWQjeWtl1xuICAgICAgICBsZXQgbmFtZXMgPSBsb2NhdG9yLnNwbGl0KC9bLiwvLyw+LCNdL2cpO1xuICAgICAgICBsZXQgc2VnbWVudHMgPSBuYW1lcy5tYXAoZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGxvY2F0b3IuaW5kZXhPZihuYW1lKTtcbiAgICAgICAgICAgIGxldCBzeW1ib2wgPSBsb2NhdG9yW2luZGV4IC0gMV0gfHwgJz4nO1xuICAgICAgICAgICAgcmV0dXJuIHsgc3ltYm9sOiBzeW1ib2wsIG5hbWU6IG5hbWUudHJpbSgpIH07XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnc2VnbWVudHMtLS0tLT4nLCBzZWdtZW50cyk7XG4gICAgICAgIHJldHVybiBzZWdtZW50cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpgJrov4foioLngrnlkI3mkJzntKLoioLngrnlr7nosaFcbiAgICAgKiBAcGFyYW0gcm9vdFxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgc3RhdGljIHNlZWtOb2RlQnlOYW1lKHJvb3QsIG5hbWUpIHtcbiAgICAgICAgaWYgKCFyb290KVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYgKHJvb3QuZ2V0TmFtZSgpID09IG5hbWUpXG4gICAgICAgICAgICByZXR1cm4gcm9vdDtcbiAgICAgICAgbGV0IGFycmF5Um9vdENoaWxkcmVuID0gcm9vdC5nZXRDaGlsZHJlbigpO1xuICAgICAgICBsZXQgbGVuZ3RoID0gYXJyYXlSb290Q2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGQgPSBhcnJheVJvb3RDaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGxldCByZXMgPSB0aGlzLnNlZWtOb2RlQnlOYW1lKGNoaWxkLCBuYW1lKTtcbiAgICAgICAgICAgIGlmIChyZXMgIT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWcqHJvb3ToioLngrnkuK3vvIzlrprkvY1sb2NhdG9yXG4gICAgICogQHBhcmFtIHJvb3RcbiAgICAgKiBAcGFyYW0gbG9jYXRvclxuICAgICAqIEBwYXJhbSBjYlxuICAgICAqL1xuICAgIHN0YXRpYyBsb2NhdGVOb2RlKHJvb3QsIGxvY2F0b3IsIGNiKSB7XG4gICAgICAgIGlmICghTG9jYXRvci5sb2NhdGluZykge1xuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5sb2NhdGluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlZ21lbnRzID0gTG9jYXRvci5wYXJzZShsb2NhdG9yKTtcbiAgICAgICAgY2NbJ2Fzc2VydCddKHNlZ21lbnRzICYmIHNlZ21lbnRzLmxlbmd0aCk7XG4gICAgICAgIC8vY2MubG9nKCdsb2NhdGVOb2RlOicgKyBsb2NhdG9yKTtcbiAgICAgICAgbGV0IGNoaWxkLCBub2RlID0gcm9vdDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ21lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IHNlZ21lbnRzW2ldO1xuICAgICAgICAgICAgc3dpdGNoIChpdGVtLnN5bWJvbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJy8nOlxuICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoaXRlbS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnLic6XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkID0gbm9kZVtpdGVtLm5hbWVdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICc+JzpcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQgPSB0aGlzLnNlZWtOb2RlQnlOYW1lKG5vZGUsIGl0ZW0ubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIC8vIGNhc2UgJyMnOlxuICAgICAgICAgICAgICAgIC8vICAgICBjaGlsZCA9IHRoaXMuc2Vla05vZGVCeU5hbWUobm9kZSwgaXRlbS5uYW1lKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghY2hpbGQpIHtcbiAgICAgICAgICAgICAgICBub2RlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUgPSBjaGlsZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub2RlICYmIG5vZGUuYWN0aXZlICYmIGNiKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2F0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBjYihudWxsLCBub2RlKTtcbiAgICAgICAgfSBlbHNlIGlmIChjYikge1xuICAgICAgICAgICAgaWYgKERhdGUubm93KCkgLSB0aGlzLnN0YXJ0VGltZSA+IHRoaXMudGltZW91dCkge1xuICAgICAgICAgICAgICAgIGNiKHsgZXJyb3I6ICd0aW1lb3V0JywgbG9jYXRvciB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYXRlTm9kZShyb290LCBsb2NhdG9yLCBjYik7XG4gICAgICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldE5vZGVGdWxsUGF0aChub2RlKSB7XG4gICAgICAgIGxldCBhcnJheSA9IFtdO1xuICAgICAgICBsZXQgdGVtcCA9IG5vZGU7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGFycmF5LnVuc2hpZnQodGVtcC5uYW1lKTtcbiAgICAgICAgICAgIHRlbXAgPSB0ZW1wLnBhcmVudDtcbiAgICAgICAgfSB3aGlsZSAodGVtcCAmJiB0ZW1wLm5hbWUgIT09ICdDYW52YXMnKVxuICAgICAgICByZXR1cm4gYXJyYXkuam9pbignLycpO1xuICAgIH1cbn1cbndpbmRvd1tcIkxvY2F0b3JcIl0gPSBMb2NhdG9yOyJdfQ==