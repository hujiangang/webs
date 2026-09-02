
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/Skin/Match3Skin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '11914jGxB5GuL9dicNRXeLv', 'Match3Skin');
// Script/Logic/Match3/Skin/Match3Skin.ts

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Common_1 = require("../../Common/Common");
var ResourcePath_1 = require("../Config/ResourcePath");
var ConfigPath = "config/match3_skin/default";
var Match3Skin = /** @class */ (function () {
    function Match3Skin() {
    }
    Match3Skin.load = function () {
        return __awaiter(this, void 0, Promise, function () {
            var jsonAsset, spritePaths, prefabPaths;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._config = {};
                        this._spriteFrames = {};
                        this._prefabs = {};
                        return [4 /*yield*/, Common_1.default.getRes(ConfigPath, cc.JsonAsset)];
                    case 1:
                        jsonAsset = _a.sent();
                        this._config = jsonAsset && jsonAsset.json ? jsonAsset.json : {};
                        spritePaths = [];
                        prefabPaths = [];
                        this.collectPaths(this._config, spritePaths, prefabPaths);
                        return [4 /*yield*/, Promise.all([
                                this.loadSpriteFrames(spritePaths),
                                this.loadPrefabs(prefabPaths),
                            ])];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Match3Skin.getConfig = function () {
        return this._config || {};
    };
    Match3Skin.getThemeConfig = function (theme) {
        return this._config && this._config.themes ? this._config.themes[theme] : null;
    };
    Match3Skin.getCellBaseFrame = function (theme, index) {
        if (index === void 0) { index = 0; }
        var themeConfig = this.getThemeConfig(theme);
        if (!themeConfig || !themeConfig.cellBase) {
            return null;
        }
        var path = Array.isArray(themeConfig.cellBase) ? themeConfig.cellBase[index] || themeConfig.cellBase[0] : themeConfig.cellBase;
        return this.getSpriteFrame(path, themeConfig._base);
    };
    Match3Skin.getUpBorderFrame = function (theme, key) {
        var themeConfig = this.getThemeConfig(theme);
        return this.getFrameFromMap(themeConfig && themeConfig.upBorders, key, themeConfig && themeConfig._base);
    };
    Match3Skin.getMiddleBorderFrame = function (theme, key) {
        var themeConfig = this.getThemeConfig(theme);
        return this.getFrameFromMap(themeConfig && themeConfig.middleBorders, key, themeConfig && themeConfig._base);
    };
    Match3Skin.getComplexGroundFrame = function (theme, key) {
        var themeConfig = this.getThemeConfig(theme);
        return this.getFrameFromMap(themeConfig && themeConfig.complexGround, key, themeConfig && themeConfig._base);
    };
    Match3Skin.getLotusleafFrame = function () {
        var ground = this._config && this._config.ground;
        return this.getSpriteFrame(ground && ground.lotusleaf, ground && ground._base);
    };
    Match3Skin.getGirlRoadFrame = function () {
        var ground = this._config && this._config.ground;
        return this.getSpriteFrame(ground && ground.girlRoad, ground && ground._base);
    };
    Match3Skin.getPrefab = function (key, index) {
        if (index === void 0) { index = 0; }
        var path = this.getConfigPath("prefabs", key, index);
        return this.getPrefabByPath(path);
    };
    Match3Skin.getPrefabList = function (key) {
        var _this = this;
        var paths = this.getConfigPaths("prefabs", key);
        return paths.map(function (path) { return _this.getPrefabByPath(path); }).filter(function (item) { return !!item; });
    };
    Match3Skin.requirePrefab = function (key, index) {
        if (index === void 0) { index = 0; }
        var prefab = this.getPrefab(key, index);
        if (!prefab) {
            var path = this.getConfigPath("prefabs", key, index);
            console.error("[Match3Skin] missing prefab: " + key + (path ? " -> " + path : ""));
        }
        return prefab;
    };
    Match3Skin.getFrameFromMap = function (map, key, base) {
        if (base === void 0) { base = ""; }
        if (!map) {
            return null;
        }
        var mapBase = map._base || base;
        var source = map.items && !Array.isArray(map.items) ? map.items : map;
        return this.getSpriteFrame(source && source[key], mapBase);
    };
    Match3Skin.getSpriteFrame = function (path, base) {
        if (base === void 0) { base = ""; }
        path = ResourcePath_1.default.resolve(path, this._config, base);
        return path ? this._spriteFrames[path] : null;
    };
    Match3Skin.getPrefabByPath = function (path) {
        path = this.normalizePath(path);
        return path ? this._prefabs[path] : null;
    };
    Match3Skin.loadSpriteFrames = function (paths) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.unique(paths).map(function (path) { return __awaiter(_this, void 0, void 0, function () {
                            var frame;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Common_1.default.getRes(path, cc.SpriteFrame)];
                                    case 1:
                                        frame = _a.sent();
                                        if (frame) {
                                            this._spriteFrames[path] = frame;
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Match3Skin.loadPrefabs = function (paths) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.unique(paths).map(function (path) { return __awaiter(_this, void 0, void 0, function () {
                            var prefab;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Common_1.default.getRes(path, cc.Prefab)];
                                    case 1:
                                        prefab = _a.sent();
                                        if (prefab) {
                                            this._prefabs[path] = prefab;
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Match3Skin.collectPaths = function (config, spritePaths, prefabPaths) {
        var _this = this;
        if (!config) {
            return;
        }
        this.pushPathMap(prefabPaths, config.prefabs, config);
        if (config.themes) {
            Object.keys(config.themes).forEach(function (themeKey) {
                var theme = config.themes[themeKey];
                _this.pushPath(spritePaths, theme.cellBase, config, theme._base);
                _this.pushMapPaths(spritePaths, theme.upBorders, config, theme._base);
                _this.pushMapPaths(spritePaths, theme.middleBorders, config, theme._base);
                _this.pushMapPaths(spritePaths, theme.complexGround, config, theme._base);
            });
        }
        if (config.ground) {
            this.pushPath(spritePaths, config.ground.lotusleaf, config, config.ground._base);
            this.pushPath(spritePaths, config.ground.girlRoad, config, config.ground._base);
        }
    };
    Match3Skin.pushPathMap = function (paths, map, config) {
        var _this = this;
        if (!map) {
            return;
        }
        var base = map._base || "";
        var source = map.items && !Array.isArray(map.items) ? map.items : map;
        Object.keys(source).forEach(function (key) {
            if (key == "_base" || key == "items") {
                return;
            }
            _this.pushPath(paths, source[key], config, base);
        });
    };
    Match3Skin.pushMapPaths = function (paths, map, config, base) {
        var _this = this;
        if (base === void 0) { base = ""; }
        if (!map) {
            return;
        }
        var mapBase = map._base || base;
        var source = map.items && !Array.isArray(map.items) ? map.items : map;
        Object.keys(source).forEach(function (key) {
            if (key == "_base" || key == "items") {
                return;
            }
            _this.pushPath(paths, source[key], config, mapBase);
        });
    };
    Match3Skin.pushPath = function (paths, path, config, base) {
        var _this = this;
        if (base === void 0) { base = ""; }
        if (!path) {
            return;
        }
        if (Array.isArray(path)) {
            path.forEach(function (item) { return _this.pushPath(paths, item, config, base); });
            return;
        }
        path = ResourcePath_1.default.resolve(path, config, base);
        if (path) {
            paths.push(path);
        }
    };
    Match3Skin.getConfigPaths = function (section, key) {
        var _this = this;
        var value = this._config && this._config[section] ? this._config[section][key] : null;
        if (!value) {
            return [];
        }
        var values = Array.isArray(value) ? value : [value];
        var sectionBase = this._config[section]._base || "";
        return values.map(function (item) { return ResourcePath_1.default.resolve(item, _this._config, sectionBase); }).filter(function (item) { return !!item; });
    };
    Match3Skin.getConfigPath = function (section, key, index) {
        if (index === void 0) { index = 0; }
        var paths = this.getConfigPaths(section, key);
        return paths[index] || paths[0] || "";
    };
    Match3Skin.unique = function (paths) {
        var result = [];
        var map = {};
        paths.forEach(function (path) {
            if (path && !map[path]) {
                map[path] = true;
                result.push(path);
            }
        });
        return result;
    };
    Match3Skin.normalizePath = function (path) {
        return ResourcePath_1.default.normalize(path);
    };
    Match3Skin._config = null;
    Match3Skin._spriteFrames = {};
    Match3Skin._prefabs = {};
    return Match3Skin;
}());
exports.default = Match3Skin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxTa2luXFxNYXRjaDNTa2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBQ3pDLHVEQUFrRDtBQWlDbEQsSUFBTSxVQUFVLEdBQUcsNEJBQTRCLENBQUM7QUFFaEQ7SUFBQTtJQXlOQSxDQUFDO0lBbk51QixlQUFJLEdBQXhCO3VDQUE0QixPQUFPOzs7Ozt3QkFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7d0JBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO3dCQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzt3QkFFRCxxQkFBTSxnQkFBTSxDQUFDLE1BQU0sQ0FBZSxVQUFVLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFBOzt3QkFBdkUsU0FBUyxHQUFHLFNBQTJEO3dCQUM3RSxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7d0JBRTNELFdBQVcsR0FBYSxFQUFFLENBQUM7d0JBQzNCLFdBQVcsR0FBYSxFQUFFLENBQUM7d0JBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7d0JBRTFELHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0NBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztnQ0FDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7NkJBQ2hDLENBQUMsRUFBQTs7d0JBSEYsU0FHRSxDQUFDOzs7OztLQUNOO0lBRWEsb0JBQVMsR0FBdkI7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLElB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dCBDb21tb24gZnJvbSBcIi4uLy4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCBSZXNvdXJjZVBhdGggZnJvbSBcIi4uL0NvbmZpZy9SZXNvdXJjZVBhdGhcIjtcblxuZXhwb3J0IHR5cGUgTWF0Y2gzU2tpblRoZW1lID0gXCJ3YXRlclwiIHwgXCJncmFzc1wiIHwgXCJzYW5kXCIgfCBzdHJpbmc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWF0Y2gzU2tpbkZyYW1lTWFwIHtcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWF0Y2gzU2tpblBhdGhNYXAge1xuICAgIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXRjaDNTa2luVGhlbWVDb25maWcge1xuICAgIF9iYXNlPzogc3RyaW5nO1xuICAgIGNlbGxCYXNlPzogc3RyaW5nIHwgc3RyaW5nW107XG4gICAgdXBCb3JkZXJzPzogTWF0Y2gzU2tpbkZyYW1lTWFwO1xuICAgIG1pZGRsZUJvcmRlcnM/OiBNYXRjaDNTa2luRnJhbWVNYXA7XG4gICAgY29tcGxleEdyb3VuZD86IE1hdGNoM1NraW5GcmFtZU1hcDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXRjaDNTa2luR3JvdW5kQ29uZmlnIHtcbiAgICBfYmFzZT86IHN0cmluZztcbiAgICBsb3R1c2xlYWY/OiBzdHJpbmc7XG4gICAgZ2lybFJvYWQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWF0Y2gzU2tpbkNvbmZpZyB7XG4gICAgX2Jhc2VzPzogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcbiAgICBwcmVmYWJzPzogTWF0Y2gzU2tpblBhdGhNYXA7XG4gICAgdGhlbWVzPzogeyBba2V5OiBzdHJpbmddOiBNYXRjaDNTa2luVGhlbWVDb25maWcgfTtcbiAgICBncm91bmQ/OiBNYXRjaDNTa2luR3JvdW5kQ29uZmlnO1xufVxuXG5jb25zdCBDb25maWdQYXRoID0gXCJjb25maWcvbWF0Y2gzX3NraW4vZGVmYXVsdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRjaDNTa2luIHtcblxuICAgIHByaXZhdGUgc3RhdGljIF9jb25maWc6IE1hdGNoM1NraW5Db25maWcgPSBudWxsO1xuICAgIHByaXZhdGUgc3RhdGljIF9zcHJpdGVGcmFtZXM6IHsgW3BhdGg6IHN0cmluZ106IGNjLlNwcml0ZUZyYW1lIH0gPSB7fTtcbiAgICBwcml2YXRlIHN0YXRpYyBfcHJlZmFiczogeyBbcGF0aDogc3RyaW5nXTogY2MuUHJlZmFiIH0gPSB7fTtcblxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgbG9hZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdGhpcy5fY29uZmlnID0ge307XG4gICAgICAgIHRoaXMuX3Nwcml0ZUZyYW1lcyA9IHt9O1xuICAgICAgICB0aGlzLl9wcmVmYWJzID0ge307XG5cbiAgICAgICAgY29uc3QganNvbkFzc2V0ID0gYXdhaXQgQ29tbW9uLmdldFJlczxjYy5Kc29uQXNzZXQ+KENvbmZpZ1BhdGgsIGNjLkpzb25Bc3NldCk7XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGpzb25Bc3NldCAmJiBqc29uQXNzZXQuanNvbiA/IGpzb25Bc3NldC5qc29uIDoge307XG5cbiAgICAgICAgY29uc3Qgc3ByaXRlUGF0aHM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGNvbnN0IHByZWZhYlBhdGhzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICB0aGlzLmNvbGxlY3RQYXRocyh0aGlzLl9jb25maWcsIHNwcml0ZVBhdGhzLCBwcmVmYWJQYXRocyk7XG5cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5sb2FkU3ByaXRlRnJhbWVzKHNwcml0ZVBhdGhzKSxcbiAgICAgICAgICAgIHRoaXMubG9hZFByZWZhYnMocHJlZmFiUGF0aHMpLFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldENvbmZpZygpOiBNYXRjaDNTa2luQ29uZmlnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZyB8fCB7fTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFRoZW1lQ29uZmlnKHRoZW1lOiBNYXRjaDNTa2luVGhlbWUpOiBNYXRjaDNTa2luVGhlbWVDb25maWcge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnICYmIHRoaXMuX2NvbmZpZy50aGVtZXMgPyB0aGlzLl9jb25maWcudGhlbWVzW3RoZW1lXSA6IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRDZWxsQmFzZUZyYW1lKHRoZW1lOiBNYXRjaDNTa2luVGhlbWUsIGluZGV4OiBudW1iZXIgPSAwKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICBjb25zdCB0aGVtZUNvbmZpZyA9IHRoaXMuZ2V0VGhlbWVDb25maWcodGhlbWUpO1xuICAgICAgICBpZiAoIXRoZW1lQ29uZmlnIHx8ICF0aGVtZUNvbmZpZy5jZWxsQmFzZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGF0aCA9IEFycmF5LmlzQXJyYXkodGhlbWVDb25maWcuY2VsbEJhc2UpID8gdGhlbWVDb25maWcuY2VsbEJhc2VbaW5kZXhdIHx8IHRoZW1lQ29uZmlnLmNlbGxCYXNlWzBdIDogdGhlbWVDb25maWcuY2VsbEJhc2U7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNwcml0ZUZyYW1lKHBhdGgsIHRoZW1lQ29uZmlnLl9iYXNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFVwQm9yZGVyRnJhbWUodGhlbWU6IE1hdGNoM1NraW5UaGVtZSwga2V5OiBzdHJpbmcpOiBjYy5TcHJpdGVGcmFtZSB7XG4gICAgICAgIGNvbnN0IHRoZW1lQ29uZmlnID0gdGhpcy5nZXRUaGVtZUNvbmZpZyh0aGVtZSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZyYW1lRnJvbU1hcCh0aGVtZUNvbmZpZyAmJiB0aGVtZUNvbmZpZy51cEJvcmRlcnMsIGtleSwgdGhlbWVDb25maWcgJiYgdGhlbWVDb25maWcuX2Jhc2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWlkZGxlQm9yZGVyRnJhbWUodGhlbWU6IE1hdGNoM1NraW5UaGVtZSwga2V5OiBzdHJpbmcpOiBjYy5TcHJpdGVGcmFtZSB7XG4gICAgICAgIGNvbnN0IHRoZW1lQ29uZmlnID0gdGhpcy5nZXRUaGVtZUNvbmZpZyh0aGVtZSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZyYW1lRnJvbU1hcCh0aGVtZUNvbmZpZyAmJiB0aGVtZUNvbmZpZy5taWRkbGVCb3JkZXJzLCBrZXksIHRoZW1lQ29uZmlnICYmIHRoZW1lQ29uZmlnLl9iYXNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldENvbXBsZXhHcm91bmRGcmFtZSh0aGVtZTogTWF0Y2gzU2tpblRoZW1lLCBrZXk6IHN0cmluZyk6IGNjLlNwcml0ZUZyYW1lIHtcbiAgICAgICAgY29uc3QgdGhlbWVDb25maWcgPSB0aGlzLmdldFRoZW1lQ29uZmlnKHRoZW1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RnJhbWVGcm9tTWFwKHRoZW1lQ29uZmlnICYmIHRoZW1lQ29uZmlnLmNvbXBsZXhHcm91bmQsIGtleSwgdGhlbWVDb25maWcgJiYgdGhlbWVDb25maWcuX2Jhc2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TG90dXNsZWFmRnJhbWUoKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICBjb25zdCBncm91bmQgPSB0aGlzLl9jb25maWcgJiYgdGhpcy5fY29uZmlnLmdyb3VuZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3ByaXRlRnJhbWUoZ3JvdW5kICYmIGdyb3VuZC5sb3R1c2xlYWYsIGdyb3VuZCAmJiBncm91bmQuX2Jhc2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0R2lybFJvYWRGcmFtZSgpOiBjYy5TcHJpdGVGcmFtZSB7XG4gICAgICAgIGNvbnN0IGdyb3VuZCA9IHRoaXMuX2NvbmZpZyAmJiB0aGlzLl9jb25maWcuZ3JvdW5kO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcHJpdGVGcmFtZShncm91bmQgJiYgZ3JvdW5kLmdpcmxSb2FkLCBncm91bmQgJiYgZ3JvdW5kLl9iYXNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFByZWZhYihrZXk6IHN0cmluZywgaW5kZXg6IG51bWJlciA9IDApOiBjYy5QcmVmYWIge1xuICAgICAgICBjb25zdCBwYXRoID0gdGhpcy5nZXRDb25maWdQYXRoKFwicHJlZmFic1wiLCBrZXksIGluZGV4KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJlZmFiQnlQYXRoKHBhdGgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UHJlZmFiTGlzdChrZXk6IHN0cmluZyk6IGNjLlByZWZhYltdIHtcbiAgICAgICAgY29uc3QgcGF0aHMgPSB0aGlzLmdldENvbmZpZ1BhdGhzKFwicHJlZmFic1wiLCBrZXkpO1xuICAgICAgICByZXR1cm4gcGF0aHMubWFwKHBhdGggPT4gdGhpcy5nZXRQcmVmYWJCeVBhdGgocGF0aCkpLmZpbHRlcihpdGVtID0+ICEhaXRlbSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZXF1aXJlUHJlZmFiKGtleTogc3RyaW5nLCBpbmRleDogbnVtYmVyID0gMCk6IGNjLlByZWZhYiB7XG4gICAgICAgIGNvbnN0IHByZWZhYiA9IHRoaXMuZ2V0UHJlZmFiKGtleSwgaW5kZXgpO1xuICAgICAgICBpZiAoIXByZWZhYikge1xuICAgICAgICAgICAgY29uc3QgcGF0aCA9IHRoaXMuZ2V0Q29uZmlnUGF0aChcInByZWZhYnNcIiwga2V5LCBpbmRleCk7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbTWF0Y2gzU2tpbl0gbWlzc2luZyBwcmVmYWI6ICR7a2V5fSR7cGF0aCA/IGAgLT4gJHtwYXRofWAgOiBcIlwifWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmVmYWI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0RnJhbWVGcm9tTWFwKG1hcDogTWF0Y2gzU2tpbkZyYW1lTWFwLCBrZXk6IHN0cmluZywgYmFzZTogc3RyaW5nID0gXCJcIik6IGNjLlNwcml0ZUZyYW1lIHtcbiAgICAgICAgaWYgKCFtYXApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hcEJhc2UgPSBtYXAuX2Jhc2UgfHwgYmFzZTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gbWFwLml0ZW1zICYmICFBcnJheS5pc0FycmF5KG1hcC5pdGVtcykgPyBtYXAuaXRlbXMgOiBtYXA7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFNwcml0ZUZyYW1lKHNvdXJjZSAmJiBzb3VyY2Vba2V5XSwgbWFwQmFzZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0U3ByaXRlRnJhbWUocGF0aDogc3RyaW5nLCBiYXNlOiBzdHJpbmcgPSBcIlwiKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICBwYXRoID0gUmVzb3VyY2VQYXRoLnJlc29sdmUocGF0aCwgdGhpcy5fY29uZmlnLCBiYXNlKTtcbiAgICAgICAgcmV0dXJuIHBhdGggPyB0aGlzLl9zcHJpdGVGcmFtZXNbcGF0aF0gOiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldFByZWZhYkJ5UGF0aChwYXRoOiBzdHJpbmcpOiBjYy5QcmVmYWIge1xuICAgICAgICBwYXRoID0gdGhpcy5ub3JtYWxpemVQYXRoKHBhdGgpO1xuICAgICAgICByZXR1cm4gcGF0aCA/IHRoaXMuX3ByZWZhYnNbcGF0aF0gOiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIGxvYWRTcHJpdGVGcmFtZXMocGF0aHM6IHN0cmluZ1tdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHRoaXMudW5pcXVlKHBhdGhzKS5tYXAoYXN5bmMgcGF0aCA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcmFtZSA9IGF3YWl0IENvbW1vbi5nZXRSZXM8Y2MuU3ByaXRlRnJhbWU+KHBhdGgsIGNjLlNwcml0ZUZyYW1lKTtcbiAgICAgICAgICAgIGlmIChmcmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Nwcml0ZUZyYW1lc1twYXRoXSA9IGZyYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgbG9hZFByZWZhYnMocGF0aHM6IHN0cmluZ1tdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHRoaXMudW5pcXVlKHBhdGhzKS5tYXAoYXN5bmMgcGF0aCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcmVmYWIgPSBhd2FpdCBDb21tb24uZ2V0UmVzPGNjLlByZWZhYj4ocGF0aCwgY2MuUHJlZmFiKTtcbiAgICAgICAgICAgIGlmIChwcmVmYWIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcmVmYWJzW3BhdGhdID0gcHJlZmFiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgY29sbGVjdFBhdGhzKGNvbmZpZzogTWF0Y2gzU2tpbkNvbmZpZywgc3ByaXRlUGF0aHM6IHN0cmluZ1tdLCBwcmVmYWJQYXRoczogc3RyaW5nW10pIHtcbiAgICAgICAgaWYgKCFjb25maWcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHVzaFBhdGhNYXAocHJlZmFiUGF0aHMsIGNvbmZpZy5wcmVmYWJzLCBjb25maWcpO1xuXG4gICAgICAgIGlmIChjb25maWcudGhlbWVzKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhjb25maWcudGhlbWVzKS5mb3JFYWNoKHRoZW1lS2V5ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aGVtZSA9IGNvbmZpZy50aGVtZXNbdGhlbWVLZXldO1xuICAgICAgICAgICAgICAgIHRoaXMucHVzaFBhdGgoc3ByaXRlUGF0aHMsIHRoZW1lLmNlbGxCYXNlLCBjb25maWcsIHRoZW1lLl9iYXNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2hNYXBQYXRocyhzcHJpdGVQYXRocywgdGhlbWUudXBCb3JkZXJzLCBjb25maWcsIHRoZW1lLl9iYXNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2hNYXBQYXRocyhzcHJpdGVQYXRocywgdGhlbWUubWlkZGxlQm9yZGVycywgY29uZmlnLCB0aGVtZS5fYmFzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoTWFwUGF0aHMoc3ByaXRlUGF0aHMsIHRoZW1lLmNvbXBsZXhHcm91bmQsIGNvbmZpZywgdGhlbWUuX2Jhc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlnLmdyb3VuZCkge1xuICAgICAgICAgICAgdGhpcy5wdXNoUGF0aChzcHJpdGVQYXRocywgY29uZmlnLmdyb3VuZC5sb3R1c2xlYWYsIGNvbmZpZywgY29uZmlnLmdyb3VuZC5fYmFzZSk7XG4gICAgICAgICAgICB0aGlzLnB1c2hQYXRoKHNwcml0ZVBhdGhzLCBjb25maWcuZ3JvdW5kLmdpcmxSb2FkLCBjb25maWcsIGNvbmZpZy5ncm91bmQuX2Jhc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgcHVzaFBhdGhNYXAocGF0aHM6IHN0cmluZ1tdLCBtYXA6IE1hdGNoM1NraW5QYXRoTWFwLCBjb25maWc6IE1hdGNoM1NraW5Db25maWcpIHtcbiAgICAgICAgaWYgKCFtYXApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBiYXNlID0gbWFwLl9iYXNlIHx8IFwiXCI7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IG1hcC5pdGVtcyAmJiAhQXJyYXkuaXNBcnJheShtYXAuaXRlbXMpID8gbWFwLml0ZW1zIDogbWFwO1xuICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT0gXCJfYmFzZVwiIHx8IGtleSA9PSBcIml0ZW1zXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnB1c2hQYXRoKHBhdGhzLCBzb3VyY2Vba2V5XSwgY29uZmlnLCBiYXNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgcHVzaE1hcFBhdGhzKHBhdGhzOiBzdHJpbmdbXSwgbWFwOiBNYXRjaDNTa2luRnJhbWVNYXAsIGNvbmZpZzogTWF0Y2gzU2tpbkNvbmZpZywgYmFzZTogc3RyaW5nID0gXCJcIikge1xuICAgICAgICBpZiAoIW1hcCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hcEJhc2UgPSBtYXAuX2Jhc2UgfHwgYmFzZTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gbWFwLml0ZW1zICYmICFBcnJheS5pc0FycmF5KG1hcC5pdGVtcykgPyBtYXAuaXRlbXMgOiBtYXA7XG4gICAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSA9PSBcIl9iYXNlXCIgfHwga2V5ID09IFwiaXRlbXNcIikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucHVzaFBhdGgocGF0aHMsIHNvdXJjZVtrZXldLCBjb25maWcsIG1hcEJhc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBwdXNoUGF0aChwYXRoczogc3RyaW5nW10sIHBhdGg6IHN0cmluZyB8IHN0cmluZ1tdLCBjb25maWc6IE1hdGNoM1NraW5Db25maWcsIGJhc2U6IHN0cmluZyA9IFwiXCIpIHtcbiAgICAgICAgaWYgKCFwYXRoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGF0aCkpIHtcbiAgICAgICAgICAgIHBhdGguZm9yRWFjaChpdGVtID0+IHRoaXMucHVzaFBhdGgocGF0aHMsIGl0ZW0sIGNvbmZpZywgYmFzZSkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHBhdGggPSBSZXNvdXJjZVBhdGgucmVzb2x2ZShwYXRoLCBjb25maWcsIGJhc2UpO1xuICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgcGF0aHMucHVzaChwYXRoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldENvbmZpZ1BhdGhzKHNlY3Rpb246IFwicHJlZmFic1wiLCBrZXk6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9jb25maWcgJiYgdGhpcy5fY29uZmlnW3NlY3Rpb25dID8gdGhpcy5fY29uZmlnW3NlY3Rpb25dW2tleV0gOiBudWxsO1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWVzID0gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV07XG4gICAgICAgIGNvbnN0IHNlY3Rpb25CYXNlID0gKDxhbnk+dGhpcy5fY29uZmlnW3NlY3Rpb25dKS5fYmFzZSB8fCBcIlwiO1xuICAgICAgICByZXR1cm4gdmFsdWVzLm1hcChpdGVtID0+IFJlc291cmNlUGF0aC5yZXNvbHZlKGl0ZW0sIHRoaXMuX2NvbmZpZywgc2VjdGlvbkJhc2UpKS5maWx0ZXIoaXRlbSA9PiAhIWl0ZW0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldENvbmZpZ1BhdGgoc2VjdGlvbjogXCJwcmVmYWJzXCIsIGtleTogc3RyaW5nLCBpbmRleDogbnVtYmVyID0gMCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHBhdGhzID0gdGhpcy5nZXRDb25maWdQYXRocyhzZWN0aW9uLCBrZXkpO1xuICAgICAgICByZXR1cm4gcGF0aHNbaW5kZXhdIHx8IHBhdGhzWzBdIHx8IFwiXCI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgdW5pcXVlKHBhdGhzOiBzdHJpbmdbXSk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGNvbnN0IG1hcCA9IHt9O1xuICAgICAgICBwYXRocy5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICAgICAgaWYgKHBhdGggJiYgIW1hcFtwYXRoXSkge1xuICAgICAgICAgICAgICAgIG1hcFtwYXRoXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIG5vcm1hbGl6ZVBhdGgocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFJlc291cmNlUGF0aC5ub3JtYWxpemUocGF0aCk7XG4gICAgfVxufVxuIl19