"use strict";
cc._RF.push(module, 'bf2392uyA5Ik6ysAaAfwTnr', 'ResourcePath');
// Script/Logic/Match3/Config/ResourcePath.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResourcePath = /** @class */ (function () {
    function ResourcePath() {
    }
    ResourcePath.resolve = function (value, root, base) {
        if (root === void 0) { root = null; }
        if (base === void 0) { base = ""; }
        if (!value) {
            return "";
        }
        if (typeof value == "string") {
            return this.join(this.resolveBase(root, base), value);
        }
        var nextBase = this.resolveBase(root, value._base || base);
        var path = value.path || this.sourcePathToResourcesPath(value.sourcePath);
        return path ? this.join(nextBase, path) : "";
    };
    ResourcePath.resolveArray = function (value, root, base) {
        var _this = this;
        if (root === void 0) { root = null; }
        if (base === void 0) { base = ""; }
        if (!value) {
            return [];
        }
        if (Array.isArray(value)) {
            return value.map(function (item) { return _this.resolve(item, root, base); });
        }
        if (typeof value == "object" && Array.isArray(value.items)) {
            var nextBase_1 = this.resolveBase(root, value._base || base);
            return value.items.map(function (item) { return _this.resolve(item, root, nextBase_1); });
        }
        return [this.resolve(value, root, base)];
    };
    ResourcePath.resolveMap = function (value, root, base) {
        var _this = this;
        if (root === void 0) { root = null; }
        if (base === void 0) { base = ""; }
        var result = {};
        if (!value) {
            return result;
        }
        var map = value;
        var nextBase = this.resolveBase(root, map._base || base);
        var source = map.items && !Array.isArray(map.items) ? map.items : map;
        Object.keys(source).forEach(function (key) {
            if (key == "_base" || key == "items") {
                return;
            }
            result[key] = _this.resolve(source[key], root, nextBase);
        });
        return result;
    };
    ResourcePath.normalize = function (path) {
        path = typeof path == "string" ? path.trim().replace(/\\/g, "/") : "";
        if (!path) {
            return "";
        }
        path = path.replace(/^assets\/resources\//, "");
        path = path.replace(/\.(png|jpg|jpeg|json|prefab)$/i, "");
        return path.replace(/\/+/g, "/").replace(/^\.\//, "");
    };
    ResourcePath.resolveBase = function (root, base) {
        base = this.normalize(base);
        if (!base || !root || !root._bases) {
            return base;
        }
        return this.normalize(root._bases[base] || base);
    };
    ResourcePath.join = function (base, path) {
        path = this.normalize(path);
        if (!path) {
            return "";
        }
        if (this.isAbsoluteResourcePath(path) || !base) {
            return path;
        }
        return this.normalize(base + "/" + path);
    };
    ResourcePath.isAbsoluteResourcePath = function (path) {
        return /^(config|csv|effect|font|prefab|sound|texture)\//.test(path);
    };
    ResourcePath.sourcePathToResourcesPath = function (sourcePath) {
        sourcePath = typeof sourcePath == "string" ? sourcePath.trim().replace(/\\/g, "/") : "";
        sourcePath = sourcePath.replace(/\.(png|jpg|jpeg|json|prefab)$/i, "");
        var prefix = "assets/resources/";
        return sourcePath.indexOf(prefix) == 0 ? sourcePath.substring(prefix.length) : "";
    };
    return ResourcePath;
}());
exports.default = ResourcePath;

cc._RF.pop();