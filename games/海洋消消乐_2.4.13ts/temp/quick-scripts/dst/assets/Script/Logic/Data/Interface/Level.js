
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Data/Interface/Level.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
        var curLv = lv || RuntimeMgr_1.default.ins.getMatch3Level();
        if (curLv >= RuntimeMgr_1.default.ins.maxMatch3Level) {
            return;
        }
        this._request(curLv + 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcRGF0YVxcSW50ZXJmYWNlXFxMZXZlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlFQUF3RTtBQUN4RSw0Q0FBdUM7QUFDdkMsbURBQThDO0FBRzlDO0lBQUE7UUFJVyxlQUFVLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7UUFFM0MsZUFBVSxHQUFHLENBQUMsQ0FBQztJQTRGM0IsQ0FBQztJQTFGRzs7O09BR0c7SUFDSSw4QkFBYyxHQUFyQixVQUFzQixFQUFVO1FBQzVCLElBQU0sS0FBSyxHQUFHLEVBQUUsSUFBSSxvQkFBVSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNwRCxJQUFJLEtBQUssSUFBSSxvQkFBVSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUU7WUFDeEMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7T0FHRztJQUNVLDRCQUFZLEdBQXpCLFVBQTBCLEVBQWlCLEVBQUUsUUFBbUI7UUFBdEMsbUJBQUEsRUFBQSxTQUFpQjt1Q0FBd0IsT0FBTzs7Ozs7d0JBQ3RFLEVBQUUsR0FBRyxFQUFFLElBQUksb0JBQVUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7d0JBQzNDLElBQUksRUFBRSxHQUFHLG9CQUFVLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRTs0QkFDcEMsRUFBRSxHQUFHLG9CQUFVLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQzt5QkFDdEM7d0JBQ0Qsb0JBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzt3QkFDekIsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUNsQyxJQUFJLEdBQUcs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QUFHLEVBQUU7b0JBQ2IsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3hCO2dCQUNELE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBR00sdUJBQU8sR0FBZDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQTlGYSxTQUFHLEdBQVUsbUNBQWdCLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBZ0duRSxZQUFDO0NBbEdELEFBa0dDLElBQUE7a0JBbEdvQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2luZ2xldG9uRmFjdG9yeSB9IGZyb20gXCIuLi8uLi8uLi9CYXNlL1V0aWxzL1NpbmdsZXRvbkZhY3RvcnlcIjtcbmltcG9ydCBSdW50aW1lTWdyIGZyb20gXCIuLi9SdW50aW1lTWdyXCI7XG5pbXBvcnQgUGF0aHMgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvVXRpbHMvUGF0aHNcIjtcbmltcG9ydCB7IElMZXZlbCB9IGZyb20gXCIuL0xldmVsL0lMZXZlbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMZXZlbCB7XG5cbiAgICBwdWJsaWMgc3RhdGljIGluczogTGV2ZWwgPSBTaW5nbGV0b25GYWN0b3J5LmdldEluc3RhbmNlKExldmVsKTtcblxuICAgIHB1YmxpYyBMdkRhdGFQb29sOiBNYXA8bnVtYmVyLCBJTGV2ZWw+ID0gbmV3IE1hcCgpO1xuXG4gICAgcHJpdmF0ZSByZXRyeUNvdW50ID0gMDtcblxuICAgIC8qKlxuICAgICAqIOmihOWKoOi9veS4i+S4gOS4quWFs+WNoSFcbiAgICAgKiBAcGFyYW0gbHYg5b2T5YmN5YWz5Y2hXG4gICAgICovXG4gICAgcHVibGljIHByZUxvYWROZXh0Q2ZnKGx2OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgY3VyTHYgPSBsdiB8fCBSdW50aW1lTWdyLmlucy5nZXRNYXRjaDNMZXZlbCgpO1xuICAgICAgICBpZiAoY3VyTHYgPj0gUnVudGltZU1nci5pbnMubWF4TWF0Y2gzTGV2ZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZXF1ZXN0KGN1ckx2ICsgMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5ou/5oyH5a6a562J57qn55qE6YWN572u5paH5Lu2LOm7mOiupOWPluW9k+WJjeWFs+WNoVxuICAgICAqIEBwYXJhbSBsdiBcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0THZDZmdEYXRhKGx2OiBudW1iZXIgPSBudWxsLCBjYWxsYmFjaz86IEZ1bmN0aW9uKTogUHJvbWlzZTxJTGV2ZWw+IHtcbiAgICAgICAgbHYgPSBsdiB8fCBSdW50aW1lTWdyLmlucy5nZXRNYXRjaDNMZXZlbCgpO1xuICAgICAgICBpZiAobHYgPiBSdW50aW1lTWdyLmlucy5tYXhNYXRjaDNMZXZlbCkge1xuICAgICAgICAgICAgbHYgPSBSdW50aW1lTWdyLmlucy5tYXhNYXRjaDNMZXZlbDtcbiAgICAgICAgfVxuICAgICAgICBSdW50aW1lTWdyLmlucy5DdXJMZXZlbCA9IGx2O1xuICAgICAgICBsZXQgY2ZnID0gdGhpcy5MdkRhdGFQb29sLmdldChsdik7XG4gICAgICAgIGlmIChjZmcpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGNmZyk7XG4gICAgICAgICAgICByZXR1cm4gY2ZnO1xuICAgICAgICB9XG4gICAgICAgIC8v5omn6KGM6K+35rGCIVxuICAgICAgICBjZmcgPSBhd2FpdCB0aGlzLl9yZXF1ZXN0KGx2KTtcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soY2ZnKTtcbiAgICAgICAgcmV0dXJuIGNmZztcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIF9yZXF1ZXN0KGx2OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgaXNSZW1vdFJlcWV1c3Q6IGJvb2xlYW4gPSBmYWxzZTsvL3RoaXMucmV0cnlDb3VudCA8IDI7ICAvL2ZhbHNlO1xuICAgICAgICBjb25zdCB2ZXJzaW9uID0gYXdhaXQgdGhpcy5fZ2V0TGV2ZWxWZXJzaW9uKClcbiAgICAgICAgY29uc3QgcGF0aDogc3RyaW5nID0gaXNSZW1vdFJlcWV1c3QgPyAoUGF0aHMuTGV2ZWxSZW1vdFBhdGggKyB2ZXJzaW9uICsgJy8nKSA6IFBhdGhzLkxldmVsQ2ZnUGF0aDtcbiAgICAgICAgY29uc3QgY2ZnID0gYXdhaXQgdGhpcy5fZXhlY1JlcXVlc3QobHYsIHBhdGgsIGlzUmVtb3RSZXFldXN0KTtcbiAgICAgICAgaWYgKGNmZykge1xuICAgICAgICAgICAgdGhpcy5yZXRyeUNvdW50ID0gMDtcbiAgICAgICAgICAgIHRoaXMuTHZEYXRhUG9vbC5zZXQobHYsIGNmZyk7XG4gICAgICAgICAgICByZXR1cm4gY2ZnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXRyeUNvdW50Kys7XG4gICAgICAgICAgICBpZiAodGhpcy5yZXRyeUNvdW50ID4gNSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QobHYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfZ2V0TGV2ZWxWZXJzaW9uKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGxldCB2ZXJzaW9uID0gJzEuMC4wJztcbiAgICAgICAgLy8gY29uc3QgY2ZnID0gYXdhaXQgUnVudGltZU1nci5pbnMuZ2V0U2VydmVyQ29uZmlnKCk7XG4gICAgICAgIC8vIGlmIChjZmcpIHtcbiAgICAgICAgLy8gICAgIHZlcnNpb24gPSBjZmcucmVzX3ZlcjtcbiAgICAgICAgLy8gfVxuICAgICAgICByZXR1cm4gdmVyc2lvbjtcbiAgICB9XG5cbiAgICAvKirmmoLml7bku45yZXNvdXJjZXPph4zlpLTlj5Ys5aaC5p6c5ZCO5pyf6ZyA6KaB5Y+WY2RuLuWGjeaUuSAqL1xuICAgIHByaXZhdGUgX2V4ZWNSZXF1ZXN0KGx2OiBudW1iZXIsIHA6IHN0cmluZywgaXNSZW1vdFJlcWV1c3Q6IGJvb2xlYW4pOiBQcm9taXNlPElMZXZlbD4ge1xuICAgICAgICBjb25zdCBsdlN0ciA9ICcwMDAwJyArIGx2O1xuICAgICAgICBjb25zdCBwYXRoID0gYCR7cH1sZXZlbHMtMCR7TWF0aC5mbG9vcigobHYgLSAxKSAvIDEwMCkgKyAxfS8ke2x2U3RyLnNsaWNlKC00KX0uanNvbmA7Ly9gJHtQYXRocy5MZXZlbENmZ1BhdGh9JHtsdn1gO1xuICAgICAgICBjb25zdCBsb2FkU3RyID0gaXNSZW1vdFJlcWV1c3QgPyAnbG9hZCcgOiAnbG9hZFJlcydcbiAgICAgICAgY29uc29sZS5sb2cobG9hZFN0ciwgcGF0aCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgaXNUaW1lb3V0ID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaXNUaW1lb3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgfSwgMzAwMCk7XG4gICAgICAgICAgICBjYy5sb2FkZXJbbG9hZFN0cl0ocGF0aCwgKGVyciwgcmVzOiBjYy5Kc29uQXNzZXQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXNUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIGlmIChlcnIgfHwgIXJlcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpc1JlbW90UmVxZXVzdCA/IHJlcyA6IHJlcy5qc29uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgcHVibGljIGRlc3RvcnkoKSB7XG4gICAgICAgIHRoaXMuTHZEYXRhUG9vbC5jbGVhcigpO1xuICAgIH1cblxufVxuIl19