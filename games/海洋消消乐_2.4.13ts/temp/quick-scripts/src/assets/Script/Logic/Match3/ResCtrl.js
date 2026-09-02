"use strict";
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