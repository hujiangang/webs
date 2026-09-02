"use strict";
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