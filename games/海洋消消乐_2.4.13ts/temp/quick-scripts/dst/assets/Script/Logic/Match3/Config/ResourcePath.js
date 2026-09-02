
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Config/ResourcePath.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxDb25maWdcXFJlc291cmNlUGF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQWFBO0lBQUE7SUFzRkEsQ0FBQztJQXBGaUIsb0JBQU8sR0FBckIsVUFBc0IsS0FBd0IsRUFBRSxJQUE2QixFQUFFLElBQWlCO1FBQWhELHFCQUFBLEVBQUEsV0FBNkI7UUFBRSxxQkFBQSxFQUFBLFNBQWlCO1FBQzVGLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixPQUFPLEVBQUUsQ0FBQztTQUNiO1FBQ0QsSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFRLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3pEO1FBRUQsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQztRQUM3RCxJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVhLHlCQUFZLEdBQTFCLFVBQTJCLEtBQThDLEVBQUUsSUFBNkIsRUFBRSxJQUFpQjtRQUEzSCxpQkFZQztRQVowRSxxQkFBQSxFQUFBLFdBQTZCO1FBQUUscUJBQUEsRUFBQSxTQUFpQjtRQUN2SCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENB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Q0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3RGLENBQUM7SUFDTCxtQkFBQztBQUFELENBdEZBLEFBc0ZDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdHlwZSBSZXNvdXJjZVBhdGhWYWx1ZSA9IHN0cmluZyB8IFJlc291cmNlUGF0aEdyb3VwIHwgbnVsbDtcblxuZXhwb3J0IGludGVyZmFjZSBSZXNvdXJjZVBhdGhHcm91cCB7XG4gICAgX2Jhc2U/OiBzdHJpbmc7XG4gICAgaXRlbXM/OiBSZXNvdXJjZVBhdGhWYWx1ZVtdIHwgeyBba2V5OiBzdHJpbmddOiBSZXNvdXJjZVBhdGhWYWx1ZSB9O1xuICAgIHBhdGg/OiBzdHJpbmc7XG4gICAgc291cmNlUGF0aD86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXNvdXJjZVBhdGhSb290IHtcbiAgICBfYmFzZXM/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNvdXJjZVBhdGgge1xuXG4gICAgcHVibGljIHN0YXRpYyByZXNvbHZlKHZhbHVlOiBSZXNvdXJjZVBhdGhWYWx1ZSwgcm9vdDogUmVzb3VyY2VQYXRoUm9vdCA9IG51bGwsIGJhc2U6IHN0cmluZyA9IFwiXCIpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmpvaW4odGhpcy5yZXNvbHZlQmFzZShyb290LCBiYXNlKSwgdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dEJhc2UgPSB0aGlzLnJlc29sdmVCYXNlKHJvb3QsIHZhbHVlLl9iYXNlIHx8IGJhc2UpO1xuICAgICAgICBjb25zdCBwYXRoID0gdmFsdWUucGF0aCB8fCB0aGlzLnNvdXJjZVBhdGhUb1Jlc291cmNlc1BhdGgodmFsdWUuc291cmNlUGF0aCk7XG4gICAgICAgIHJldHVybiBwYXRoID8gdGhpcy5qb2luKG5leHRCYXNlLCBwYXRoKSA6IFwiXCI7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZXNvbHZlQXJyYXkodmFsdWU6IFJlc291cmNlUGF0aFZhbHVlIHwgUmVzb3VyY2VQYXRoVmFsdWVbXSwgcm9vdDogUmVzb3VyY2VQYXRoUm9vdCA9IG51bGwsIGJhc2U6IHN0cmluZyA9IFwiXCIpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5tYXAoaXRlbSA9PiB0aGlzLnJlc29sdmUoaXRlbSwgcm9vdCwgYmFzZSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIiAmJiBBcnJheS5pc0FycmF5KHZhbHVlLml0ZW1zKSkge1xuICAgICAgICAgICAgY29uc3QgbmV4dEJhc2UgPSB0aGlzLnJlc29sdmVCYXNlKHJvb3QsIHZhbHVlLl9iYXNlIHx8IGJhc2UpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLml0ZW1zLm1hcChpdGVtID0+IHRoaXMucmVzb2x2ZShpdGVtLCByb290LCBuZXh0QmFzZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbdGhpcy5yZXNvbHZlKHZhbHVlLCByb290LCBiYXNlKV07XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZXNvbHZlTWFwKHZhbHVlOiBSZXNvdXJjZVBhdGhHcm91cCB8IHsgW2tleTogc3RyaW5nXTogUmVzb3VyY2VQYXRoVmFsdWUgfSwgcm9vdDogUmVzb3VyY2VQYXRoUm9vdCA9IG51bGwsIGJhc2U6IHN0cmluZyA9IFwiXCIpOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHtcbiAgICAgICAgY29uc3QgcmVzdWx0OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtYXAgPSA8YW55PnZhbHVlO1xuICAgICAgICBjb25zdCBuZXh0QmFzZSA9IHRoaXMucmVzb2x2ZUJhc2Uocm9vdCwgbWFwLl9iYXNlIHx8IGJhc2UpO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBtYXAuaXRlbXMgJiYgIUFycmF5LmlzQXJyYXkobWFwLml0ZW1zKSA/IG1hcC5pdGVtcyA6IG1hcDtcbiAgICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5ID09IFwiX2Jhc2VcIiB8fCBrZXkgPT0gXCJpdGVtc1wiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzLnJlc29sdmUoc291cmNlW2tleV0sIHJvb3QsIG5leHRCYXNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBub3JtYWxpemUocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcGF0aCA9IHR5cGVvZiBwYXRoID09IFwic3RyaW5nXCIgPyBwYXRoLnRyaW0oKS5yZXBsYWNlKC9cXFxcL2csIFwiL1wiKSA6IFwiXCI7XG4gICAgICAgIGlmICghcGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXmFzc2V0c1xcL3Jlc291cmNlc1xcLy8sIFwiXCIpO1xuICAgICAgICBwYXRoID0gcGF0aC5yZXBsYWNlKC9cXC4ocG5nfGpwZ3xqcGVnfGpzb258cHJlZmFiKSQvaSwgXCJcIik7XG4gICAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcLysvZywgXCIvXCIpLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyByZXNvbHZlQmFzZShyb290OiBSZXNvdXJjZVBhdGhSb290LCBiYXNlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBiYXNlID0gdGhpcy5ub3JtYWxpemUoYmFzZSk7XG4gICAgICAgIGlmICghYmFzZSB8fCAhcm9vdCB8fCAhcm9vdC5fYmFzZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBiYXNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZShyb290Ll9iYXNlc1tiYXNlXSB8fCBiYXNlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBqb2luKGJhc2U6IHN0cmluZywgcGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcGF0aCA9IHRoaXMubm9ybWFsaXplKHBhdGgpO1xuICAgICAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzQWJzb2x1dGVSZXNvdXJjZVBhdGgocGF0aCkgfHwgIWJhc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXRoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZShgJHtiYXNlfS8ke3BhdGh9YCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaXNBYnNvbHV0ZVJlc291cmNlUGF0aChwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIC9eKGNvbmZpZ3xjc3Z8ZWZmZWN0fGZvbnR8cHJlZmFifHNvdW5kfHRleHR1cmUpXFwvLy50ZXN0KHBhdGgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHNvdXJjZVBhdGhUb1Jlc291cmNlc1BhdGgoc291cmNlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgc291cmNlUGF0aCA9IHR5cGVvZiBzb3VyY2VQYXRoID09IFwic3RyaW5nXCIgPyBzb3VyY2VQYXRoLnRyaW0oKS5yZXBsYWNlKC9cXFxcL2csIFwiL1wiKSA6IFwiXCI7XG4gICAgICAgIHNvdXJjZVBhdGggPSBzb3VyY2VQYXRoLnJlcGxhY2UoL1xcLihwbmd8anBnfGpwZWd8anNvbnxwcmVmYWIpJC9pLCBcIlwiKTtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gXCJhc3NldHMvcmVzb3VyY2VzL1wiO1xuICAgICAgICByZXR1cm4gc291cmNlUGF0aC5pbmRleE9mKHByZWZpeCkgPT0gMCA/IHNvdXJjZVBhdGguc3Vic3RyaW5nKHByZWZpeC5sZW5ndGgpIDogXCJcIjtcbiAgICB9XG59XG4iXX0=