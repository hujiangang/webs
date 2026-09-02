
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/ResCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b7437pZvS9EEJ35BYoXCOAy', 'ResCtrl');
// Script/Logic/Match3/ResCtrl.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var Constant_1 = require("../Data/Const/Constant");
var RuntimeMgr_1 = require("../Data/RuntimeMgr");
var Common_1 = require("../Common/Common");
var GameModel_1 = require("./Model/GameModel");
var ResourcePath_1 = require("./Config/ResourcePath");
var ccclass = cc._decorator.ccclass;
var ConfigPath = "config/match3_res/default";
var UuidReg = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
var ResCtrl = /** @class */ (function (_super) {
    __extends(ResCtrl, _super);
    function ResCtrl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResCtrl_1 = ResCtrl;
    ResCtrl.prototype.onLoad = function () {
        ResCtrl_1.ins = this;
    };
    ResCtrl.prototype.onDestroy = function () {
        if (ResCtrl_1.ins === this) {
            ResCtrl_1.ins = null;
        }
    };
    ResCtrl.load = function () {
        return __awaiter(this, void 0, Promise, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._loading) {
                            return [2 /*return*/, this._loading];
                        }
                        this._loading = this._load();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._loading];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this._loading = null;
                        console.error("[ResCtrl] load failed:", err_1);
                        throw err_1;
                    case 4:
                        this._loading = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    ResCtrl.destory = function () {
        this._config = {};
        this._data = this.createEmptyData();
        this._loading = null;
    };
    ResCtrl.prototype.getCellPrefab = function (index) {
        return ResCtrl_1._data.CellPrefab[index];
    };
    ResCtrl.prototype.getBombBg = function (index) {
        return ResCtrl_1._data.BombFlashingBg[index];
    };
    ResCtrl.prototype.getCellFrame = function (type, index) {
        var frames = ResCtrl_1._data.NormalCellFrame;
        if (Common_1.default.isBombType(type)) {
            frames = ResCtrl_1._data.BombStaticFrame;
        }
        var frame = frames[index];
        if (type == Constant_1.CellType.Flower && GameModel_1.default.ins.HaveFlowers) {
            frame = ResCtrl_1._data.pearlFrame;
        }
        if (type < Constant_1.CellType.Bomb1 && RuntimeMgr_1.default.ins.CurBgIndex == 2) {
            var bg2frame = ResCtrl_1._data.Map2NormalCellFrame[index];
            if (bg2frame) {
                frame = bg2frame;
            }
        }
        return frame;
    };
    ResCtrl.prototype.getLockFrame = function (index) {
        return ResCtrl_1._data.lockFrames[index];
    };
    ResCtrl.prototype.getBoxFrame = function (index, type) {
        if (type === void 0) { type = null; }
        var area = 0;
        if (type != null) {
            area = (type + 1) * 3;
        }
        return ResCtrl_1._data.boxFrames[area + index];
    };
    ResCtrl.prototype.getIceFrame = function (index) {
        return ResCtrl_1._data.iceFrames[index];
    };
    ResCtrl.prototype.getStoneFrame = function (index) {
        return ResCtrl_1._data.stoneFrames[index];
    };
    ResCtrl.prototype.getLeavesFrame = function (index) {
        return ResCtrl_1._data.LeaveFrames[index];
    };
    ResCtrl.prototype.getGroundFrame = function (index) {
        return ResCtrl_1._data.GroundFrames[index];
    };
    ResCtrl.prototype.getFlowerFrame = function (index) {
        return ResCtrl_1._data.FlowerFrames[index];
    };
    ResCtrl.prototype.getFirefly = function (index) {
        return ResCtrl_1._data.FireflyFrames[index];
    };
    ResCtrl.prototype.getGemFrame = function (index) {
        return ResCtrl_1._data.GemFrames[index];
    };
    ResCtrl.prototype.getCollectFrame = function (index) {
        return ResCtrl_1._data.CollectIcon[index];
    };
    ResCtrl.prototype.getGroundBorderPrefab = function (index) {
        return ResCtrl_1._data.groundPrefabs[index];
    };
    ResCtrl.prototype.getGroundCenter = function () {
        return ResCtrl_1._data.groundCenter;
    };
    ResCtrl.prototype.getRoketPrefab = function () {
        return ResCtrl_1._data.rocketPrefab;
    };
    ResCtrl.prototype.getMushroomFrame = function (index) {
        return ResCtrl_1._data.mushroomFrames[index];
    };
    ResCtrl._load = function () {
        return __awaiter(this, void 0, Promise, function () {
            var jsonAsset, tasks;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Common_1.default.getRes(ConfigPath, cc.JsonAsset)];
                    case 1:
                        jsonAsset = _a.sent();
                        this._config = jsonAsset && jsonAsset.json ? jsonAsset.json : {};
                        this._data = this.createEmptyData();
                        if (!jsonAsset) {
                            console.error("[ResCtrl] missing config: resources/" + ConfigPath + ".json");
                            return [2 /*return*/];
                        }
                        tasks = [
                            this.loadSpriteFrameArray("BombFlashingBg").then(function (list) { return _this._data.BombFlashingBg = list; }),
                            this.loadSpriteFrameArray("BombStaticFrame").then(function (list) { return _this._data.BombStaticFrame = list; }),
                            this.loadSpriteFrameArray("NormalCellFrame").then(function (list) { return _this._data.NormalCellFrame = list; }),
                            this.loadSpriteFrame("pearlFrame").then(function (frame) { return _this._data.pearlFrame = frame; }),
                            this.loadSpriteFrameArray("Map2NormalCellFrame").then(function (list) { return _this._data.Map2NormalCellFrame = list; }),
                            this.loadPrefabArray("CellPrefab").then(function (list) { return _this._data.CellPrefab = list; }),
                            this.loadSpriteFrameArray("lockFrames").then(function (list) { return _this._data.lockFrames = list; }),
                            this.loadSpriteFrameArray("boxFrames").then(function (list) { return _this._data.boxFrames = list; }),
                            this.loadSpriteFrameArray("iceFrames").then(function (list) { return _this._data.iceFrames = list; }),
                            this.loadSpriteFrameArray("stoneFrames").then(function (list) { return _this._data.stoneFrames = list; }),
                            this.loadSpriteFrameArray("LeaveFrames").then(function (list) { return _this._data.LeaveFrames = list; }),
                            this.loadSpriteFrameArray("GroundFrames").then(function (list) { return _this._data.GroundFrames = list; }),
                            this.loadSpriteFrameArray("GemFrames").then(function (list) { return _this._data.GemFrames = list; }),
                            this.loadSpriteFrameArray("FlowerFrames").then(function (list) { return _this._data.FlowerFrames = list; }),
                            this.loadSpriteFrameArray("FireflyFrames").then(function (list) { return _this._data.FireflyFrames = list; }),
                            this.loadSpriteFrameArray("CollectIcon").then(function (list) { return _this._data.CollectIcon = list; }),
                            this.loadPrefabArray("groundPrefabs").then(function (list) { return _this._data.groundPrefabs = list; }),
                            this.loadSpriteFrame("groundCenter").then(function (frame) { return _this._data.groundCenter = frame; }),
                            this.loadPrefab("rocketPrefab").then(function (prefab) { return _this._data.rocketPrefab = prefab; }),
                            this.loadSpriteFrameArray("mushroomFrames").then(function (list) { return _this._data.mushroomFrames = list; }),
                        ];
                        return [4 /*yield*/, Promise.all(tasks)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ResCtrl.loadPrefabArray = function (key) {
        return __awaiter(this, void 0, Promise, function () {
            var paths;
            var _this = this;
            return __generator(this, function (_a) {
                paths = this.getArrayPaths(key);
                return [2 /*return*/, Promise.all(paths.map(function (path) { return _this.loadAsset(path, cc.Prefab); }))];
            });
        });
    };
    ResCtrl.loadSpriteFrameArray = function (key) {
        return __awaiter(this, void 0, Promise, function () {
            var paths;
            var _this = this;
            return __generator(this, function (_a) {
                paths = this.getArrayPaths(key);
                return [2 /*return*/, Promise.all(paths.map(function (path) { return _this.loadAsset(path, cc.SpriteFrame); }))];
            });
        });
    };
    ResCtrl.loadPrefab = function (key) {
        return __awaiter(this, void 0, Promise, function () {
            var path;
            return __generator(this, function (_a) {
                path = this.getStringPath(key);
                return [2 /*return*/, this.loadAsset(path, cc.Prefab)];
            });
        });
    };
    ResCtrl.loadSpriteFrame = function (key) {
        return __awaiter(this, void 0, Promise, function () {
            var path;
            return __generator(this, function (_a) {
                path = this.getStringPath(key);
                return [2 /*return*/, this.loadAsset(path, cc.SpriteFrame)];
            });
        });
    };
    ResCtrl.loadAsset = function (path, type) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                path = this.normalizePath(path);
                if (path) {
                    if (UuidReg.test(path)) {
                        return [2 /*return*/, this.loadAssetByUuid(path, type)];
                    }
                    return [2 /*return*/, Common_1.default.getRes(path, type)];
                }
                return [2 /*return*/, null];
            });
        });
    };
    ResCtrl.loadAssetByUuid = function (uuid, type) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                if (!uuid) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, new Promise(function (resolve) {
                        var assetManager = cc.assetManager;
                        if (!assetManager || !assetManager.loadAny) {
                            console.error("[ResCtrl] cc.assetManager.loadAny is unavailable, uuid config cannot be loaded:", uuid);
                            return resolve(null);
                        }
                        assetManager.loadAny({ uuid: uuid, type: type }, function (err, asset) {
                            if (err || !asset) {
                                console.error("[ResCtrl] load asset failed:", uuid, err);
                                return resolve(null);
                            }
                            resolve(asset);
                        });
                    })];
            });
        });
    };
    ResCtrl.getStringPath = function (key) {
        var value = this._config ? this._config[key] : null;
        if (!value) {
            return "";
        }
        if (Array.isArray(value)) {
            for (var i = 0; i < value.length; i++) {
                var path = ResourcePath_1.default.resolve(value[i], this._config);
                if (path) {
                    return path;
                }
            }
            return "";
        }
        return ResourcePath_1.default.resolve(value, this._config);
    };
    ResCtrl.getArrayPaths = function (key) {
        var value = this._config ? this._config[key] : null;
        return ResourcePath_1.default.resolveArray(value, this._config);
    };
    ResCtrl.normalizeValue = function (value) {
        return typeof value == "string" ? value.trim() : "";
    };
    ResCtrl.normalizePath = function (path) {
        return ResourcePath_1.default.normalize(path);
    };
    ResCtrl.createEmptyData = function () {
        return {
            BombFlashingBg: [],
            BombStaticFrame: [],
            NormalCellFrame: [],
            pearlFrame: null,
            Map2NormalCellFrame: [],
            CellPrefab: [],
            lockFrames: [],
            boxFrames: [],
            iceFrames: [],
            stoneFrames: [],
            LeaveFrames: [],
            GroundFrames: [],
            GemFrames: [],
            FlowerFrames: [],
            FireflyFrames: [],
            CollectIcon: [],
            groundPrefabs: [],
            groundCenter: null,
            rocketPrefab: null,
            mushroomFrames: [],
        };
    };
    var ResCtrl_1;
    ResCtrl.ins = null;
    ResCtrl._config = {};
    ResCtrl._loading = null;
    ResCtrl._data = ResCtrl_1.createEmptyData();
    ResCtrl = ResCtrl_1 = __decorate([
        ccclass
    ], ResCtrl);
    return ResCtrl;
}(cc.Component));
exports.default = ResCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxSZXNDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFrRDtBQUNsRCxpREFBNEM7QUFDNUMsMkNBQXNDO0FBQ3RDLCtDQUEwQztBQUMxQyxzREFBMEY7QUFFbEYsSUFBQSxPQUFPLEdBQUssRUFBRSxDQUFDLFVBQVUsUUFBbEIsQ0FBbUI7QUFFbEMsSUFBTSxVQUFVLEdBQUcsMkJBQTJCLENBQUM7QUFDL0MsSUFBTSxPQUFPLEdBQUcsaUVBQWlFLENBQUM7QUFvRGxGO0lBQXFDLDJCQUFZO0lBQWpEOztJQTRRQSxDQUFDO2dCQTVRb0IsT0FBTztJQVF4Qix3QkFBTSxHQUFOO1FBQ0ksU0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELDJCQUFTLEdBQVQ7UUFDSSxJQUFJLFNBQU8sQ0FBQyxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQ3RCLFNBQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUVtQixZQUFJLEdBQXhCO3VDQUE0QixPQUFPOzs7Ozt3QkFDL0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFOzRCQUNmLHNCQUFPLElBQUksQ0FBQyxRQUFRLEVBQUM7eUJBQ3hCO3dCQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDOzs7O3dCQUV6QixxQkFBTSxJQUFJLENBQUMsUUFBUSxFQUFBOzt3QkFBbkIsU0FBbUIsQ0FBQzs7Ozt3QkFFcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7d0JBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsS0FBRyxDQUFDLENBQUM7d0JBQzdDLE1BQU0sS0FBRyxDQUFDOzt3QkFFZCxJQUFJ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QUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksRUFBNUIsQ0FBNEIsQ0FBQzs0QkFDbEYsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksRUFBM0IsQ0FBMkIsQ0FBQzs0QkFDaEYsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksRUFBM0IsQ0FBMkIsQ0FBQzs0QkFDaEYsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksRUFBN0IsQ0FBNkIsQ0FBQzs0QkFDcEYsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksRUFBN0IsQ0FBNkIsQ0FBQzs0QkFDcEYsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksRUFBOUIsQ0FBOEIsQ0FBQzs0QkFDdEYsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksRUFBM0IsQ0FBMkIsQ0FBQzs0QkFDaEYsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFD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bSBcIi4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCBSdW50aW1lTWdyIGZyb20gXCIuLi9EYXRhL1J1bnRpbWVNZ3JcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCBHYW1lTW9kZWwgZnJvbSBcIi4vTW9kZWwvR2FtZU1vZGVsXCI7XG5pbXBvcnQgUmVzb3VyY2VQYXRoLCB7IFJlc291cmNlUGF0aFJvb3QsIFJlc291cmNlUGF0aFZhbHVlIH0gZnJvbSBcIi4vQ29uZmlnL1Jlc291cmNlUGF0aFwiO1xuXG5jb25zdCB7IGNjY2xhc3MgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbmNvbnN0IENvbmZpZ1BhdGggPSBcImNvbmZpZy9tYXRjaDNfcmVzL2RlZmF1bHRcIjtcbmNvbnN0IFV1aWRSZWcgPSAvXlswLTlhLWZdezh9LVswLTlhLWZdezR9LVswLTlhLWZdezR9LVswLTlhLWZdezR9LVswLTlhLWZdezEyfSQvaTtcblxudHlwZSBNYXRjaDNSZXNWYWx1ZSA9IFJlc291cmNlUGF0aFZhbHVlO1xudHlwZSBNYXRjaDNSZXNBcnJheSA9IEFycmF5PE1hdGNoM1Jlc1ZhbHVlPjtcblxuaW50ZXJmYWNlIE1hdGNoM1Jlc0NvbmZpZyBleHRlbmRzIFJlc291cmNlUGF0aFJvb3Qge1xuICAgIEJvbWJGbGFzaGluZ0JnPzogTWF0Y2gzUmVzQXJyYXk7XG4gICAgQm9tYlN0YXRpY0ZyYW1lPzogTWF0Y2gzUmVzQXJyYXk7XG4gICAgTm9ybWFsQ2VsbEZyYW1lPzogTWF0Y2gzUmVzQXJyYXk7XG4gICAgcGVhcmxGcmFtZT86IE1hdGNoM1Jlc1ZhbHVlO1xuICAgIE1hcDJOb3JtYWxDZWxsRnJhbWU/OiBNYXRjaDNSZXNBcnJheTtcbiAgICBDZWxsUHJlZmFiPzogTWF0Y2gzUmVzQXJyYXk7XG4gICAgbG9ja0ZyYW1lcz86IE1hdGNoM1Jlc0FycmF5O1xuICAgIGJveEZyYW1lcz86IE1hdGNoM1Jlc0FycmF5O1xuICAgIGljZUZyYW1lcz86IE1hdGNoM1Jlc0FycmF5O1xuICAgIHN0b25lRnJhbWVzPzogTWF0Y2gzUmVzQXJyYXk7XG4gICAgTGVhdmVGcmFtZXM/OiBNYXRjaDNSZXNBcnJheTtcbiAgICBHcm91bmRGcmFtZXM/OiBNYXRjaDNSZXNBcnJheTtcbiAgICBHZW1GcmFtZXM/OiBNYXRjaDNSZXNBcnJheTtcbiAgICBGbG93ZXJGcmFtZXM/OiBNYXRjaDNSZXNBcnJheTtcbiAgICBGaXJlZmx5RnJhbWVzPzogTWF0Y2gzUmVzQXJyYXk7XG4gICAgQ29sbGVjdEljb24/OiBNYXRjaDNSZXNBcnJheTtcbiAgICBncm91bmRQcmVmYWJzPzogTWF0Y2gzUmVzQXJyYXk7XG4gICAgZ3JvdW5kQ2VudGVyPzogTWF0Y2gzUmVzVmFsdWU7XG4gICAgcm9ja2V0UHJlZmFiPzogTWF0Y2gzUmVzVmFsdWU7XG4gICAgbXVzaHJvb21GcmFtZXM/OiBNYXRjaDNSZXNBcnJheTtcbn1cblxuaW50ZXJmYWNlIE1hdGNoM1Jlc0RhdGEge1xuICAgIEJvbWJGbGFzaGluZ0JnOiBBcnJheTxjYy5TcHJpdGVGcmFtZSB8IG51bGw+O1xuICAgIEJvbWJTdGF0aWNGcmFtZTogQXJyYXk8Y2MuU3ByaXRlRnJhbWUgfCBudWxsPjtcbiAgICBOb3JtYWxDZWxsRnJhbWU6IEFycmF5PGNjLlNwcml0ZUZyYW1lIHwgbnVsbD47XG4gICAgcGVhcmxGcmFtZTogY2MuU3ByaXRlRnJhbWU7XG4gICAgTWFwMk5vcm1hbENlbGxGcmFtZTogQXJyYXk8Y2MuU3ByaXRlRnJhbWUgfCBudWxsPjtcbiAgICBDZWxsUHJlZmFiOiBBcnJheTxjYy5QcmVmYWIgfCBudWxsPjtcbiAgICBsb2NrRnJhbWVzOiBBcnJheTxjYy5TcHJpdGVGcmFtZSB8IG51bGw+O1xuICAgIGJveEZyYW1lczogQXJyYXk8Y2MuU3ByaXRlRnJhbWUgfCBudWxsPjtcbiAgICBpY2VGcmFtZXM6IEFycmF5PGNjLlNwcml0ZUZyYW1lIHwgbnVsbD47XG4gICAgc3RvbmVGcmFtZXM6IEFycmF5PGNjLlNwcml0ZUZyYW1lIHwgbnVsbD47XG4gICAgTGVhdmVGcmFtZXM6IEFycmF5PGNjLlNwcml0ZUZyYW1lIHwgbnVsbD47XG4gICAgR3JvdW5kRnJhbWVzOiBBcnJheTxjYy5TcHJpdGVGcmFtZSB8IG51bGw+O1xuICAgIEdlbUZyYW1lczogQXJyYXk8Y2MuU3ByaXRlRnJhbWUgfCBudWxsPjtcbiAgICBGbG93ZXJGcmFtZXM6IEFycmF5PGNjLlNwcml0ZUZyYW1lIHwgbnVsbD47XG4gICAgRmlyZWZseUZyYW1lczogQXJyYXk8Y2MuU3ByaXRlRnJhbWUgfCBudWxsPjtcbiAgICBDb2xsZWN0SWNvbjogQXJyYXk8Y2MuU3ByaXRlRnJhbWUgfCBudWxsPjtcbiAgICBncm91bmRQcmVmYWJzOiBBcnJheTxjYy5QcmVmYWIgfCBudWxsPjtcbiAgICBncm91bmRDZW50ZXI6IGNjLlNwcml0ZUZyYW1lO1xuICAgIHJvY2tldFByZWZhYjogY2MuUHJlZmFiO1xuICAgIG11c2hyb29tRnJhbWVzOiBBcnJheTxjYy5TcHJpdGVGcmFtZSB8IG51bGw+O1xufVxuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzQ3RybCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBwdWJsaWMgc3RhdGljIGluczogUmVzQ3RybCA9IG51bGw7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBfY29uZmlnOiBNYXRjaDNSZXNDb25maWcgPSB7fTtcbiAgICBwcml2YXRlIHN0YXRpYyBfbG9hZGluZzogUHJvbWlzZTx2b2lkPiA9IG51bGw7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2RhdGE6IE1hdGNoM1Jlc0RhdGEgPSBSZXNDdHJsLmNyZWF0ZUVtcHR5RGF0YSgpO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBSZXNDdHJsLmlucyA9IHRoaXM7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBpZiAoUmVzQ3RybC5pbnMgPT09IHRoaXMpIHtcbiAgICAgICAgICAgIFJlc0N0cmwuaW5zID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgbG9hZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2FkaW5nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvYWRpbmcgPSB0aGlzLl9sb2FkKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9sb2FkaW5nO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvYWRpbmcgPSBudWxsO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIltSZXNDdHJsXSBsb2FkIGZhaWxlZDpcIiwgZXJyKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb2FkaW5nID0gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGRlc3RvcnkoKSB7XG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IHt9O1xuICAgICAgICB0aGlzLl9kYXRhID0gdGhpcy5jcmVhdGVFbXB0eURhdGEoKTtcbiAgICAgICAgdGhpcy5fbG9hZGluZyA9IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENlbGxQcmVmYWIoaW5kZXg6IG51bWJlcik6IGNjLlByZWZhYiB7XG4gICAgICAgIHJldHVybiBSZXNDdHJsLl9kYXRhLkNlbGxQcmVmYWJbaW5kZXhdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRCb21iQmcoaW5kZXg6IG51bWJlcik6IGNjLlNwcml0ZUZyYW1lIHtcbiAgICAgICAgcmV0dXJuIFJlc0N0cmwuX2RhdGEuQm9tYkZsYXNoaW5nQmdbaW5kZXhdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDZWxsRnJhbWUodHlwZTogQ2VsbFR5cGUsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGZyYW1lcyA9IFJlc0N0cmwuX2RhdGEuTm9ybWFsQ2VsbEZyYW1lO1xuICAgICAgICBpZiAoQ29tbW9uLmlzQm9tYlR5cGUodHlwZSkpIHtcbiAgICAgICAgICAgIGZyYW1lcyA9IFJlc0N0cmwuX2RhdGEuQm9tYlN0YXRpY0ZyYW1lO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmcmFtZSA9IGZyYW1lc1tpbmRleF07XG4gICAgICAgIGlmICh0eXBlID09IENlbGxUeXBlLkZsb3dlciAmJiBHYW1lTW9kZWwuaW5zLkhhdmVGbG93ZXJzKSB7XG4gICAgICAgICAgICBmcmFtZSA9IFJlc0N0cmwuX2RhdGEucGVhcmxGcmFtZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA8IENlbGxUeXBlLkJvbWIxICYmIFJ1bnRpbWVNZ3IuaW5zLkN1ckJnSW5kZXggPT0gMikge1xuICAgICAgICAgICAgY29uc3QgYmcyZnJhbWUgPSBSZXNDdHJsLl9kYXRhLk1hcDJOb3JtYWxDZWxsRnJhbWVbaW5kZXhdO1xuICAgICAgICAgICAgaWYgKGJnMmZyYW1lKSB7XG4gICAgICAgICAgICAgICAgZnJhbWUgPSBiZzJmcmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnJhbWU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldExvY2tGcmFtZShpbmRleDogbnVtYmVyKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICByZXR1cm4gUmVzQ3RybC5fZGF0YS5sb2NrRnJhbWVzW2luZGV4XTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Qm94RnJhbWUoaW5kZXg6IG51bWJlciwgdHlwZTogbnVtYmVyID0gbnVsbCk6IGNjLlNwcml0ZUZyYW1lIHtcbiAgICAgICAgbGV0IGFyZWEgPSAwO1xuICAgICAgICBpZiAodHlwZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBhcmVhID0gKHR5cGUgKyAxKSAqIDM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJlc0N0cmwuX2RhdGEuYm94RnJhbWVzW2FyZWEgKyBpbmRleF07XG4gICAgfVxuXG4gICAgcHVibGljIGdldEljZUZyYW1lKGluZGV4OiBudW1iZXIpOiBjYy5TcHJpdGVGcmFtZSB7XG4gICAgICAgIHJldHVybiBSZXNDdHJsLl9kYXRhLmljZUZyYW1lc1tpbmRleF07XG4gICAgfVxuXG4gICAgcHVibGljIGdldFN0b25lRnJhbWUoaW5kZXg6IG51bWJlcik6IGNjLlNwcml0ZUZyYW1lIHtcbiAgICAgICAgcmV0dXJuIFJlc0N0cmwuX2RhdGEuc3RvbmVGcmFtZXNbaW5kZXhdO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRMZWF2ZXNGcmFtZShpbmRleDogbnVtYmVyKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICByZXR1cm4gUmVzQ3RybC5fZGF0YS5MZWF2ZUZyYW1lc1tpbmRleF07XG4gICAgfVxuXG4gICAgcHVibGljIGdldEdyb3VuZEZyYW1lKGluZGV4OiBudW1iZXIpOiBjYy5TcHJpdGVGcmFtZSB7XG4gICAgICAgIHJldHVybiBSZXNDdHJsLl9kYXRhLkdyb3VuZEZyYW1lc1tpbmRleF07XG4gICAgfVxuXG4gICAgcHVibGljIGdldEZsb3dlckZyYW1lKGluZGV4OiBudW1iZXIpOiBjYy5TcHJpdGVGcmFtZSB7XG4gICAgICAgIHJldHVybiBSZXNDdHJsLl9kYXRhLkZsb3dlckZyYW1lc1tpbmRleF07XG4gICAgfVxuXG4gICAgcHVibGljIGdldEZpcmVmbHkoaW5kZXg6IG51bWJlcik6IGNjLlNwcml0ZUZyYW1lIHtcbiAgICAgICAgcmV0dXJuIFJlc0N0cmwuX2RhdGEuRmlyZWZseUZyYW1lc1tpbmRleF07XG4gICAgfVxuXG4gICAgcHVibGljIGdldEdlbUZyYW1lKGluZGV4OiBudW1iZXIpOiBjYy5TcHJpdGVGcmFtZSB7XG4gICAgICAgIHJldHVybiBSZXNDdHJsLl9kYXRhLkdlbUZyYW1lc1tpbmRleF07XG4gICAgfVxuXG4gICAgcHVibGljIGdldENvbGxlY3RGcmFtZShpbmRleDogbnVtYmVyKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICByZXR1cm4gUmVzQ3RybC5fZGF0YS5Db2xsZWN0SWNvbltpbmRleF07XG4gICAgfVxuXG4gICAgcHVibGljIGdldEdyb3VuZEJvcmRlclByZWZhYihpbmRleDogbnVtYmVyKTogY2MuUHJlZmFiIHtcbiAgICAgICAgcmV0dXJuIFJlc0N0cmwuX2RhdGEuZ3JvdW5kUHJlZmFic1tpbmRleF07XG4gICAgfVxuXG4gICAgcHVibGljIGdldEdyb3VuZENlbnRlcigpOiBjYy5TcHJpdGVGcmFtZSB7XG4gICAgICAgIHJldHVybiBSZXNDdHJsLl9kYXRhLmdyb3VuZENlbnRlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Um9rZXRQcmVmYWIoKTogY2MuUHJlZmFiIHtcbiAgICAgICAgcmV0dXJuIFJlc0N0cmwuX2RhdGEucm9ja2V0UHJlZmFiO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRNdXNocm9vbUZyYW1lKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIFJlc0N0cmwuX2RhdGEubXVzaHJvb21GcmFtZXNbaW5kZXhdO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIF9sb2FkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBjb25zdCBqc29uQXNzZXQgPSBhd2FpdCBDb21tb24uZ2V0UmVzPGNjLkpzb25Bc3NldD4oQ29uZmlnUGF0aCwgY2MuSnNvbkFzc2V0KTtcbiAgICAgICAgdGhpcy5fY29uZmlnID0ganNvbkFzc2V0ICYmIGpzb25Bc3NldC5qc29uID8ganNvbkFzc2V0Lmpzb24gOiB7fTtcbiAgICAgICAgdGhpcy5fZGF0YSA9IHRoaXMuY3JlYXRlRW1wdHlEYXRhKCk7XG5cbiAgICAgICAgaWYgKCFqc29uQXNzZXQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFtSZXNDdHJsXSBtaXNzaW5nIGNvbmZpZzogcmVzb3VyY2VzLyR7Q29uZmlnUGF0aH0uanNvbmApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGFza3MgPSBbXG4gICAgICAgICAgICB0aGlzLmxvYWRTcHJpdGVGcmFtZUFycmF5KFwiQm9tYkZsYXNoaW5nQmdcIikudGhlbihsaXN0ID0+IHRoaXMuX2RhdGEuQm9tYkZsYXNoaW5nQmcgPSBsaXN0KSxcbiAgICAgICAgICAgIHRoaXMubG9hZFNwcml0ZUZyYW1lQXJyYXkoXCJCb21iU3RhdGljRnJhbWVcIikudGhlbihsaXN0ID0+IHRoaXMuX2RhdGEuQm9tYlN0YXRpY0ZyYW1lID0gbGlzdCksXG4gICAgICAgICAgICB0aGlzLmxvYWRTcHJpdGVGcmFtZUFycmF5KFwiTm9ybWFsQ2VsbEZyYW1lXCIpLnRoZW4obGlzdCA9PiB0aGlzLl9kYXRhLk5vcm1hbENlbGxGcmFtZSA9IGxpc3QpLFxuICAgICAgICAgICAgdGhpcy5sb2FkU3ByaXRlRnJhbWUoXCJwZWFybEZyYW1lXCIpLnRoZW4oZnJhbWUgPT4gdGhpcy5fZGF0YS5wZWFybEZyYW1lID0gZnJhbWUpLFxuICAgICAgICAgICAgdGhpcy5sb2FkU3ByaXRlRnJhbWVBcnJheShcIk1hcDJOb3JtYWxDZWxsRnJhbWVcIikudGhlbihsaXN0ID0+IHRoaXMuX2RhdGEuTWFwMk5vcm1hbENlbGxGcmFtZSA9IGxpc3QpLFxuICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiQXJyYXkoXCJDZWxsUHJlZmFiXCIpLnRoZW4obGlzdCA9PiB0aGlzLl9kYXRhLkNlbGxQcmVmYWIgPSBsaXN0KSxcbiAgICAgICAgICAgIHRoaXMubG9hZFNwcml0ZUZyYW1lQXJyYXkoXCJsb2NrRnJhbWVzXCIpLnRoZW4obGlzdCA9PiB0aGlzLl9kYXRhLmxvY2tGcmFtZXMgPSBsaXN0KSxcbiAgICAgICAgICAgIHRoaXMubG9hZFNwcml0ZUZyYW1lQXJyYXkoXCJib3hGcmFtZXNcIikudGhlbihsaXN0ID0+IHRoaXMuX2RhdGEuYm94RnJhbWVzID0gbGlzdCksXG4gICAgICAgICAgICB0aGlzLmxvYWRTcHJpdGVGcmFtZUFycmF5KFwiaWNlRnJhbWVzXCIpLnRoZW4obGlzdCA9PiB0aGlzLl9kYXRhLmljZUZyYW1lcyA9IGxpc3QpLFxuICAgICAgICAgICAgdGhpcy5sb2FkU3ByaXRlRnJhbWVBcnJheShcInN0b25lRnJhbWVzXCIpLnRoZW4obGlzdCA9PiB0aGlzLl9kYXRhLnN0b25lRnJhbWVzID0gbGlzdCksXG4gICAgICAgICAgICB0aGlzLmxvYWRTcHJpdGVGcmFtZUFycmF5KFwiTGVhdmVGcmFtZXNcIikudGhlbihsaXN0ID0+IHRoaXMuX2RhdGEuTGVhdmVGcmFtZXMgPSBsaXN0KSxcbiAgICAgICAgICAgIHRoaXMubG9hZFNwcml0ZUZyYW1lQXJyYXkoXCJHcm91bmRGcmFtZXNcIikudGhlbihsaXN0ID0+IHRoaXMuX2RhdGEuR3JvdW5kRnJhbWVzID0gbGlzdCksXG4gICAgICAgICAgICB0aGlzLmxvYWRTcHJpdGVGcmFtZUFycmF5KFwiR2VtRnJhbWVzXCIpLnRoZW4obGlzdCA9PiB0aGlzLl9kYXRhLkdlbUZyYW1lcyA9IGxpc3QpLFxuICAgICAgICAgICAgdGhpcy5sb2FkU3ByaXRlRnJhbWVBcnJheShcIkZsb3dlckZyYW1lc1wiKS50aGVuKGxpc3QgPT4gdGhpcy5fZGF0YS5GbG93ZXJGcmFtZXMgPSBsaXN0KSxcbiAgICAgICAgICAgIHRoaXMubG9hZFNwcml0ZUZyYW1lQXJyYXkoXCJGaXJlZmx5RnJhbWVzXCIpLnRoZW4obGlzdCA9PiB0aGlzLl9kYXRhLkZpcmVmbHlGcmFtZXMgPSBsaXN0KSxcbiAgICAgICAgICAgIHRoaXMubG9hZFNwcml0ZUZyYW1lQXJyYXkoXCJDb2xsZWN0SWNvblwiKS50aGVuKGxpc3QgPT4gdGhpcy5fZGF0YS5Db2xsZWN0SWNvbiA9IGxpc3QpLFxuICAgICAgICAgICAgdGhpcy5sb2FkUHJlZmFiQXJyYXkoXCJncm91bmRQcmVmYWJzXCIpLnRoZW4obGlzdCA9PiB0aGlzLl9kYXRhLmdyb3VuZFByZWZhYnMgPSBsaXN0KSxcbiAgICAgICAgICAgIHRoaXMubG9hZFNwcml0ZUZyYW1lKFwiZ3JvdW5kQ2VudGVyXCIpLnRoZW4oZnJhbWUgPT4gdGhpcy5fZGF0YS5ncm91bmRDZW50ZXIgPSBmcmFtZSksXG4gICAgICAgICAgICB0aGlzLmxvYWRQcmVmYWIoXCJyb2NrZXRQcmVmYWJcIikudGhlbihwcmVmYWIgPT4gdGhpcy5fZGF0YS5yb2NrZXRQcmVmYWIgPSBwcmVmYWIpLFxuICAgICAgICAgICAgdGhpcy5sb2FkU3ByaXRlRnJhbWVBcnJheShcIm11c2hyb29tRnJhbWVzXCIpLnRoZW4obGlzdCA9PiB0aGlzLl9kYXRhLm11c2hyb29tRnJhbWVzID0gbGlzdCksXG4gICAgICAgIF07XG5cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodGFza3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIGxvYWRQcmVmYWJBcnJheShrZXk6IGtleW9mIE1hdGNoM1Jlc0NvbmZpZyk6IFByb21pc2U8QXJyYXk8Y2MuUHJlZmFiIHwgbnVsbD4+IHtcbiAgICAgICAgY29uc3QgcGF0aHMgPSB0aGlzLmdldEFycmF5UGF0aHMoa2V5KTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHBhdGhzLm1hcChwYXRoID0+IHRoaXMubG9hZEFzc2V0KHBhdGgsIGNjLlByZWZhYikpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBsb2FkU3ByaXRlRnJhbWVBcnJheShrZXk6IGtleW9mIE1hdGNoM1Jlc0NvbmZpZyk6IFByb21pc2U8QXJyYXk8Y2MuU3ByaXRlRnJhbWUgfCBudWxsPj4ge1xuICAgICAgICBjb25zdCBwYXRocyA9IHRoaXMuZ2V0QXJyYXlQYXRocyhrZXkpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocGF0aHMubWFwKHBhdGggPT4gdGhpcy5sb2FkQXNzZXQocGF0aCwgY2MuU3ByaXRlRnJhbWUpKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgbG9hZFByZWZhYihrZXk6IGtleW9mIE1hdGNoM1Jlc0NvbmZpZyk6IFByb21pc2U8Y2MuUHJlZmFiPiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLmdldFN0cmluZ1BhdGgoa2V5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZEFzc2V0KHBhdGgsIGNjLlByZWZhYik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgbG9hZFNwcml0ZUZyYW1lKGtleToga2V5b2YgTWF0Y2gzUmVzQ29uZmlnKTogUHJvbWlzZTxjYy5TcHJpdGVGcmFtZT4ge1xuICAgICAgICBjb25zdCBwYXRoID0gdGhpcy5nZXRTdHJpbmdQYXRoKGtleSk7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRBc3NldChwYXRoLCBjYy5TcHJpdGVGcmFtZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgbG9hZEFzc2V0PFQgZXh0ZW5kcyBjYy5Bc3NldD4ocGF0aDogc3RyaW5nLCB0eXBlOiBhbnkpOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgcGF0aCA9IHRoaXMubm9ybWFsaXplUGF0aChwYXRoKTtcbiAgICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgICAgIGlmIChVdWlkUmVnLnRlc3QocGF0aCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkQXNzZXRCeVV1aWQ8VD4ocGF0aCwgdHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gQ29tbW9uLmdldFJlczxUPihwYXRoLCB0eXBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBsb2FkQXNzZXRCeVV1aWQ8VCBleHRlbmRzIGNjLkFzc2V0Pih1dWlkOiBzdHJpbmcsIHR5cGU6IGFueSk6IFByb21pc2U8VD4ge1xuICAgICAgICBpZiAoIXV1aWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhc3NldE1hbmFnZXIgPSAoPGFueT5jYykuYXNzZXRNYW5hZ2VyO1xuICAgICAgICAgICAgaWYgKCFhc3NldE1hbmFnZXIgfHwgIWFzc2V0TWFuYWdlci5sb2FkQW55KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIltSZXNDdHJsXSBjYy5hc3NldE1hbmFnZXIubG9hZEFueSBpcyB1bmF2YWlsYWJsZSwgdXVpZCBjb25maWcgY2Fubm90IGJlIGxvYWRlZDpcIiwgdXVpZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFzc2V0TWFuYWdlci5sb2FkQW55KHsgdXVpZCwgdHlwZSB9LCAoZXJyOiBFcnJvciwgYXNzZXQ6IFQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyIHx8ICFhc3NldCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW1Jlc0N0cmxdIGxvYWQgYXNzZXQgZmFpbGVkOlwiLCB1dWlkLCBlcnIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShhc3NldCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0U3RyaW5nUGF0aChrZXk6IGtleW9mIE1hdGNoM1Jlc0NvbmZpZyk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fY29uZmlnID8gdGhpcy5fY29uZmlnW2tleV0gOiBudWxsO1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRoID0gUmVzb3VyY2VQYXRoLnJlc29sdmUodmFsdWVbaV0sIHRoaXMuX2NvbmZpZyk7XG4gICAgICAgICAgICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJlc291cmNlUGF0aC5yZXNvbHZlKHZhbHVlIGFzIE1hdGNoM1Jlc1ZhbHVlLCB0aGlzLl9jb25maWcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldEFycmF5UGF0aHMoa2V5OiBrZXlvZiBNYXRjaDNSZXNDb25maWcpOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fY29uZmlnID8gdGhpcy5fY29uZmlnW2tleV0gOiBudWxsO1xuICAgICAgICByZXR1cm4gUmVzb3VyY2VQYXRoLnJlc29sdmVBcnJheSh2YWx1ZSBhcyBNYXRjaDNSZXNWYWx1ZSB8IE1hdGNoM1Jlc1ZhbHVlW10sIHRoaXMuX2NvbmZpZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgbm9ybWFsaXplVmFsdWUodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gXCJzdHJpbmdcIiA/IHZhbHVlLnRyaW0oKSA6IFwiXCI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgbm9ybWFsaXplUGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gUmVzb3VyY2VQYXRoLm5vcm1hbGl6ZShwYXRoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVFbXB0eURhdGEoKTogTWF0Y2gzUmVzRGF0YSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBCb21iRmxhc2hpbmdCZzogW10sXG4gICAgICAgICAgICBCb21iU3RhdGljRnJhbWU6IFtdLFxuICAgICAgICAgICAgTm9ybWFsQ2VsbEZyYW1lOiBbXSxcbiAgICAgICAgICAgIHBlYXJsRnJhbWU6IG51bGwsXG4gICAgICAgICAgICBNYXAyTm9ybWFsQ2VsbEZyYW1lOiBbXSxcbiAgICAgICAgICAgIENlbGxQcmVmYWI6IFtdLFxuICAgICAgICAgICAgbG9ja0ZyYW1lczogW10sXG4gICAgICAgICAgICBib3hGcmFtZXM6IFtdLFxuICAgICAgICAgICAgaWNlRnJhbWVzOiBbXSxcbiAgICAgICAgICAgIHN0b25lRnJhbWVzOiBbXSxcbiAgICAgICAgICAgIExlYXZlRnJhbWVzOiBbXSxcbiAgICAgICAgICAgIEdyb3VuZEZyYW1lczogW10sXG4gICAgICAgICAgICBHZW1GcmFtZXM6IFtdLFxuICAgICAgICAgICAgRmxvd2VyRnJhbWVzOiBbXSxcbiAgICAgICAgICAgIEZpcmVmbHlGcmFtZXM6IFtdLFxuICAgICAgICAgICAgQ29sbGVjdEljb246IFtdLFxuICAgICAgICAgICAgZ3JvdW5kUHJlZmFiczogW10sXG4gICAgICAgICAgICBncm91bmRDZW50ZXI6IG51bGwsXG4gICAgICAgICAgICByb2NrZXRQcmVmYWI6IG51bGwsXG4gICAgICAgICAgICBtdXNocm9vbUZyYW1lczogW10sXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19