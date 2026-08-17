
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcRGF0YVxcSW50ZXJmYWNlXFxMZXZlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlFQUF3RTtBQUN4RSw0Q0FBdUM7QUFDdkMsbURBQThDO0FBRzlDO0lBQUE7UUFJVyxlQUFVLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7UUFFM0MsZUFBVSxHQUFHLENBQUMsQ0FBQztJQXdGM0IsQ0FBQztJQXRGRzs7O09BR0c7SUFDSSw4QkFBYyxHQUFyQixVQUFzQixFQUFVO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksb0JBQVUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ1UsNEJBQVksR0FBekIsVUFBMEIsRUFBaUIsRUFBRSxRQUFtQjtRQUF0QyxtQkFBQSxFQUFBLFNBQWlCO3VDQUF3QixPQUFPOzs7Ozt3QkFDdEUsRUFBRSxHQUFHLEVBQUUsSUFBSSxvQkFBVSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDM0MsSUFBSSxFQUFFLEdBQUcsb0JBQVUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFOzRCQUNwQyxFQUFFLEdBQUcsb0JBQVUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO3lCQUN0Qzt3QkFDRCxvQkFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO3dCQUN6QixHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ2xDLElBQUksR0FBRyxFQUFFOzRCQUNMLFFBQVEsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzFCLHNCQUFPLEdBQUcsRUFBQzt5QkFDZDt3QkFFSyxxQkFBTSxJ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R0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFHTSx1QkFBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBMUZhLFNBQUcsR0FBVSxtQ0FBZ0IsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUE0Rm5FLFlBQUM7Q0E5RkQsQUE4RkMsSUFBQTtrQkE5Rm9CLEtBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaW5nbGV0b25GYWN0b3J5IH0gZnJvbSBcIi4uLy4uLy4uL0Jhc2UvVXRpbHMvU2luZ2xldG9uRmFjdG9yeVwiO1xuaW1wb3J0IFJ1bnRpbWVNZ3IgZnJvbSBcIi4uL1J1bnRpbWVNZ3JcIjtcbmltcG9ydCBQYXRocyBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VdGlscy9QYXRoc1wiO1xuaW1wb3J0IHsgSUxldmVsIH0gZnJvbSBcIi4vTGV2ZWwvSUxldmVsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgaW5zOiBMZXZlbCA9IFNpbmdsZXRvbkZhY3RvcnkuZ2V0SW5zdGFuY2UoTGV2ZWwpO1xuXG4gICAgcHVibGljIEx2RGF0YVBvb2w6IE1hcDxudW1iZXIsIElMZXZlbD4gPSBuZXcgTWFwKCk7XG5cbiAgICBwcml2YXRlIHJldHJ5Q291bnQgPSAwO1xuXG4gICAgLyoqXG4gICAgICog6aKE5Yqg6L295LiL5LiA5Liq5YWz5Y2hIVxuICAgICAqIEBwYXJhbSBsdiDlvZPliY3lhbPljaFcbiAgICAgKi9cbiAgICBwdWJsaWMgcHJlTG9hZE5leHRDZmcobHY6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9yZXF1ZXN0KChsdiB8fCBSdW50aW1lTWdyLmlucy5nZXRNYXRjaDNMZXZlbCgpKSArIDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaLv+aMh+Wumuetiee6p+eahOmFjee9ruaWh+S7tizpu5jorqTlj5blvZPliY3lhbPljaFcbiAgICAgKiBAcGFyYW0gbHYgXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdldEx2Q2ZnRGF0YShsdjogbnVtYmVyID0gbnVsbCwgY2FsbGJhY2s/OiBGdW5jdGlvbik6IFByb21pc2U8SUxldmVsPiB7XG4gICAgICAgIGx2ID0gbHYgfHwgUnVudGltZU1nci5pbnMuZ2V0TWF0Y2gzTGV2ZWwoKTtcbiAgICAgICAgaWYgKGx2ID4gUnVudGltZU1nci5pbnMubWF4TWF0Y2gzTGV2ZWwpIHtcbiAgICAgICAgICAgIGx2ID0gUnVudGltZU1nci5pbnMubWF4TWF0Y2gzTGV2ZWw7XG4gICAgICAgIH1cbiAgICAgICAgUnVudGltZU1nci5pbnMuQ3VyTGV2ZWwgPSBsdjtcbiAgICAgICAgbGV0IGNmZyA9IHRoaXMuTHZEYXRhUG9vbC5nZXQobHYpO1xuICAgICAgICBpZiAoY2ZnKSB7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjZmcpO1xuICAgICAgICAgICAgcmV0dXJuIGNmZztcbiAgICAgICAgfVxuICAgICAgICAvL+aJp+ihjOivt+axgiFcbiAgICAgICAgY2ZnID0gYXdhaXQgdGhpcy5fcmVxdWVzdChsdik7XG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGNmZyk7XG4gICAgICAgIHJldHVybiBjZmc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfcmVxdWVzdChsdjogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGlzUmVtb3RSZXFldXN0OiBib29sZWFuID0gZmFsc2U7Ly90aGlzLnJldHJ5Q291bnQgPCAyOyAgLy9mYWxzZTtcbiAgICAgICAgY29uc3QgdmVyc2lvbiA9IGF3YWl0IHRoaXMuX2dldExldmVsVmVyc2lvbigpXG4gICAgICAgIGNvbnN0IHBhdGg6IHN0cmluZyA9IGlzUmVtb3RSZXFldXN0ID8gKFBhdGhzLkxldmVsUmVtb3RQYXRoICsgdmVyc2lvbiArICcvJykgOiBQYXRocy5MZXZlbENmZ1BhdGg7XG4gICAgICAgIGNvbnN0IGNmZyA9IGF3YWl0IHRoaXMuX2V4ZWNSZXF1ZXN0KGx2LCBwYXRoLCBpc1JlbW90UmVxZXVzdCk7XG4gICAgICAgIGlmIChjZmcpIHtcbiAgICAgICAgICAgIHRoaXMucmV0cnlDb3VudCA9IDA7XG4gICAgICAgICAgICB0aGlzLkx2RGF0YVBvb2wuc2V0KGx2LCBjZmcpO1xuICAgICAgICAgICAgcmV0dXJuIGNmZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmV0cnlDb3VudCsrO1xuICAgICAgICAgICAgaWYgKHRoaXMucmV0cnlDb3VudCA+IDUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0KGx2KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYXN5bmMgX2dldExldmVsVmVyc2lvbigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBsZXQgdmVyc2lvbiA9ICcxLjAuMCc7XG4gICAgICAgIC8vIGNvbnN0IGNmZyA9IGF3YWl0IFJ1bnRpbWVNZ3IuaW5zLmdldFNlcnZlckNvbmZpZygpO1xuICAgICAgICAvLyBpZiAoY2ZnKSB7XG4gICAgICAgIC8vICAgICB2ZXJzaW9uID0gY2ZnLnJlc192ZXI7XG4gICAgICAgIC8vIH1cbiAgICAgICAgcmV0dXJuIHZlcnNpb247XG4gICAgfVxuXG4gICAgLyoq5pqC5pe25LuOcmVzb3VyY2Vz6YeM5aS05Y+WLOWmguaenOWQjuacn+mcgOimgeWPlmNkbi7lho3mlLkgKi9cbiAgICBwcml2YXRlIF9leGVjUmVxdWVzdChsdjogbnVtYmVyLCBwOiBzdHJpbmcsIGlzUmVtb3RSZXFldXN0OiBib29sZWFuKTogUHJvbWlzZTxJTGV2ZWw+IHtcbiAgICAgICAgY29uc3QgbHZTdHIgPSAnMDAwMCcgKyBsdjtcbiAgICAgICAgY29uc3QgcGF0aCA9IGAke3B9bGV2ZWxzLTAke01hdGguZmxvb3IoKGx2IC0gMSkgLyAxMDApICsgMX0vJHtsdlN0ci5zbGljZSgtNCl9Lmpzb25gOy8vYCR7UGF0aHMuTGV2ZWxDZmdQYXRofSR7bHZ9YDtcbiAgICAgICAgY29uc3QgbG9hZFN0ciA9IGlzUmVtb3RSZXFldXN0ID8gJ2xvYWQnIDogJ2xvYWRSZXMnXG4gICAgICAgIGNvbnNvbGUubG9nKGxvYWRTdHIsIHBhdGgpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbGV0IGlzVGltZW91dCA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlzVGltZW91dCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIH0sIDMwMDApO1xuICAgICAgICAgICAgY2MubG9hZGVyW2xvYWRTdHJdKHBhdGgsIChlcnIsIHJlczogY2MuSnNvbkFzc2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzVGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyIHx8ICFyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUoaXNSZW1vdFJlcWV1c3QgPyByZXMgOiByZXMuanNvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIHB1YmxpYyBkZXN0b3J5KCkge1xuICAgICAgICB0aGlzLkx2RGF0YVBvb2wuY2xlYXIoKTtcbiAgICB9XG5cbn0iXX0=