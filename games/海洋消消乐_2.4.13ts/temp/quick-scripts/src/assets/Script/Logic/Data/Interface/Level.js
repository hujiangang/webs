"use strict";
cc._RF.push(module, '14628GHFeBNoI5fGpDGpjdM', 'Level');
// Script/Logic/Data/Interface/Level.ts

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
var SingletonFactory_1 = require("../../../Base/Utils/SingletonFactory");
var RuntimeMgr_1 = require("../RuntimeMgr");
var Paths_1 = require("../../../Base/Utils/Paths");
var Level = /** @class */ (function () {
    function Level() {
        this.LvDataPool = new Map();
        this.retryCount = 0;
    }
    /**
     * 预加载下一个关卡!
     * @param lv 当前关卡
     */
    Level.prototype.preLoadNextCfg = function (lv) {
        this._request((lv || RuntimeMgr_1.default.ins.getMatch3Level()) + 1);
    };
    /**
     * 拿指定等级的配置文件,默认取当前关卡
     * @param lv
     */
    Level.prototype.getLvCfgData = function (lv, callback) {
        if (lv === void 0) { lv = null; }
        return __awaiter(this, void 0, Promise, function () {
            var cfg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lv = lv || RuntimeMgr_1.default.ins.getMatch3Level();
                        if (lv > RuntimeMgr_1.default.ins.maxMatch3Level) {
                            lv = RuntimeMgr_1.default.ins.maxMatch3Level;
                        }
                        RuntimeMgr_1.default.ins.CurLevel = lv;
                        cfg = this.LvDataPool.get(lv);
                        if (cfg) {
                            callback && callback(cfg);
                            return [2 /*return*/, cfg];
                        }
                        return [4 /*yield*/, this._request(lv)];
                    case 1:
                        //执行请求!
                        cfg = _a.sent();
                        callback && callback(cfg);
                        return [2 /*return*/, cfg];
                }
            });
        });
    };
    Level.prototype._request = function (lv) {
        return __awaiter(this, void 0, void 0, function () {
            var isRemotReqeust, version, path, cfg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isRemotReqeust = false;
                        return [4 /*yield*/, this._getLevelVersion()];
                    case 1:
                        version = _a.sent();
                        path = isRemotReqeust ? (Paths_1.default.LevelRemotPath + version + '/') : Paths_1.default.LevelCfgPath;
                        return [4 /*yield*/, this._execRequest(lv, path, isRemotReqeust)];
                    case 2:
                        cfg = _a.sent();
                        if (cfg) {
                            this.retryCount = 0;
                            this.LvDataPool.set(lv, cfg);
                            return [2 /*return*/, cfg];
                        }
                        else {
                            this.retryCount++;
                            if (this.retryCount > 5) {
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, this._request(lv)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Level.prototype._getLevelVersion = function () {
        return __awaiter(this, void 0, Promise, function () {
            var version;
            return __generator(this, function (_a) {
                version = '1.0.0';
                // const cfg = await RuntimeMgr.ins.getServerConfig();
                // if (cfg) {
                //     version = cfg.res_ver;
                // }
                return [2 /*return*/, version];
            });
        });
    };
    /**暂时从resources里头取,如果后期需要取cdn.再改 */
    Level.prototype._execRequest = function (lv, p, isRemotReqeust) {
        var lvStr = '0000' + lv;
        var path = p + "levels-0" + (Math.floor((lv - 1) / 100) + 1) + "/" + lvStr.slice(-4) + ".json"; //`${Paths.LevelCfgPath}${lv}`;
        var loadStr = isRemotReqeust ? 'load' : 'loadRes';
        console.log(loadStr, path);
        return new Promise(function (resolve, reject) {
            var isTimeout = false;
            var timeout = setTimeout(function () {
                isTimeout = true;
                resolve(null);
            }, 3000);
            cc.loader[loadStr](path, function (err, res) {
                if (isTimeout) {
                    return reject();
                }
                clearTimeout(timeout);
                if (err || !res) {
                    return resolve(null);
                }
                resolve(isRemotReqeust ? res : res.json);
            });
        });
    };
    Level.prototype.destory = function () {
        this.LvDataPool.clear();
    };
    Level.ins = SingletonFactory_1.SingletonFactory.getInstance(Level);
    return Level;
}());
exports.default = Level;

cc._RF.pop();