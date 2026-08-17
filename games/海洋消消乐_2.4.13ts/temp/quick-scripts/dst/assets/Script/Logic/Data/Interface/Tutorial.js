
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Data/Interface/Tutorial.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'adc64WvGb1MZL9wy3FwRmEi', 'Tutorial');
// Script/Logic/Data/Interface/Tutorial.ts

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
var Turorial = /** @class */ (function () {
    function Turorial() {
        this.retryCount = 0;
    }
    /**
     * 拿指定等级的配置文件,默认取当前关卡
     * @param lv
     */
    Turorial.prototype.getTurCfgData = function (lv, callback) {
        if (lv === void 0) { lv = null; }
        return __awaiter(this, void 0, Promise, function () {
            var isRemotReqeust, path, cfg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lv = lv || RuntimeMgr_1.default.ins.getMatch3Level();
                        if (lv > RuntimeMgr_1.default.ins.maxMatch3Level) {
                            lv = RuntimeMgr_1.default.ins.maxMatch3Level;
                        }
                        isRemotReqeust = this.retryCount < 2;
                        path = isRemotReqeust ? Paths_1.default.TurorialRemotPath : Paths_1.default.TurorialCfgPath;
                        return [4 /*yield*/, this._requestTurorial(lv, path, isRemotReqeust)];
                    case 1:
                        cfg = _a.sent();
                        if (cfg) {
                            this.retryCount = 0;
                            callback && callback(cfg);
                            return [2 /*return*/, cfg];
                        }
                        else {
                            this.retryCount++;
                            if (this.retryCount > 5) {
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, this.getTurCfgData(lv, callback)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**暂时从resources里头取,如果后期需要取cdn.再改 */
    Turorial.prototype._requestTurorial = function (lv, p, isRemotReqeust) {
        var lvStr = '0000' + lv;
        var path = p + "levels-0" + (Math.floor((lv - 1) / 100) + 1) + "/" + lvStr.slice(-4) + ".json"; //`${Paths.LevelCfgPath}${lv}`;
        var loadStr = isRemotReqeust ? 'load' : 'loadRes';
        console.error(loadStr, path);
        return new Promise(function (resolve) {
            cc.loader[loadStr](path, function (err, res) {
                if (err || !res) {
                    return resolve(null);
                }
                resolve(isRemotReqeust ? res : res.json);
            });
        });
        // const lvStr = '0000' + lv;
        // const path = `${p}levels-0${Math.floor((lv - 1) / 100) + 1}/${lvStr.slice(-4)}.json`;//`${Paths.LevelCfgPath}${lv}`;
        // const loadStr = isRemotReqeust ? 'load' : 'loadRes'
        // console.error(loadStr, path);
        // // return new Promise((resolve) => {
        // //     cc.loader[loadStr](path, (err, res: cc.JsonAsset) => {
        // //         if (err || !res) {
        // //             return resolve(null);
        // //         }
        // //         resolve(isRemotReqeust ? res : res.json);
        // //     });
        // // })
        // if(isRemotReqeust) {
        //     return new Promise((resolve) => {
        //     cc.loader["loadRes"](path,cc.Asset,(completedCount: number, totalCount: number, item: any) => {},(err, res: cc.JsonAsset)=>{
        //             if (err || !res) {
        //                 return resolve(null);
        //             }
        //             resolve(isRemotReqeust ? res : res.json);
        //         })
        //     })
        // }
        // else {
        //     return new Promise((resolve) => {
        //         cc.loader["load"](path,(err, res: cc.JsonAsset)=>{
        //             if (err || !res) {
        //                 return resolve(null);
        //             }
        //             resolve(isRemotReqeust ? res : res.json);
        //         })
        //     })
        // }
    };
    Turorial.ins = SingletonFactory_1.SingletonFactory.getInstance(Turorial);
    return Turorial;
}());
exports.default = Turorial;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcRGF0YVxcSW50ZXJmYWNlXFxUdXRvcmlhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlFQUF3RTtBQUN4RSw0Q0FBdUM7QUFDdkMsbURBQThDO0FBRzlDO0lBQUE7UUFJWSxlQUFVLEdBQUcsQ0FBQyxDQUFDO0lBOEUzQixDQUFDO0lBNUVHOzs7T0FHRztJQUNVLGdDQUFhLEdBQTFCLFVBQTJCLEVBQWlCLEVBQUUsUUFBbUI7UUFBdEMsbUJBQUEsRUFBQSxTQUFpQjt1Q0FBd0IsT0FBTzs7Ozs7d0JBRXZFLEVBQUUsR0FBRyxFQUFFLElBQUksb0JBQVUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7d0JBQzNDLElBQUksRUFBRSxHQUFHLG9CQUFVLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRTs0QkFDcEMsRUFBRSxHQUFHLG9CQUFVLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQzt5QkFDdEM7d0JBRUssY0FBYyxHQUFZLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO3dCQUM5QyxJQUFJLEdBQVcsY0FBYyxDQUFDLENBQUMsQ0FBQyxlQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLGVBQUssQ0FBQyxlQUFlLENBQUM7d0JBQzFFLHFCQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxFQUFBOzt3QkFBM0QsR0FBRyxHQUFHLFNBQXFEO3dCQUNqRSxJQUFJLEdBQUcsRUFBRTs0QkFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzs0QkFDcEIsUUFBUSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDMUIsc0JBQU8sR0FBRyxFQUFDO3lCQUNkOzZCQUFNOzRCQUNILElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs0QkFDbEIsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRTtnQ0FDckIsc0JBQU8sSUFBSSxFQUFDOzZCQUNmOzRCQUNELHNCQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFDO3lCQUMzQzs7Ozs7S0FDSjtJQUVELG1DQUFtQztJQUMzQixtQ0FBZ0IsR0FBeEIsVUFBeUIsRUFBVSxFQUFFLENBQVMsRUFBRSxjQUF1QjtRQUNuRSxJQUFNLEtBQUssR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQU0sSUFBSSxHQUFNLENBQUMsaUJBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFPLENBQUMsQ0FBQSwrQkFBK0I7UUFDcEgsSUFBTSxPQUFPLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtRQUNuRCxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTztZQUN2QixFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFpQjtnQkFDNUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ2IsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3hCO2dCQUNELE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUE7UUFFRiw2QkFBNkI7UUFDN0IsdUhBQXVIO1FBQ3ZILHNEQUFzRDtRQUN0RCxnQ0FBZ0M7UUFDaEMsdUNBQXVDO1FBQ3ZDLGdFQUFnRTtRQUNoRSxnQ0FBZ0M7UUFDaEMsdUNBQXVDO1FBQ3ZDLGVBQWU7UUFDZix1REFBdUQ7UUFDdkQsYUFBYTtRQUNiLFFBQVE7UUFDUix1QkFBdUI7UUFDdkIsd0NBQXdDO1FBQ3hDLG1JQUFtSTtRQUNuSSxpQ0FBaUM7UUFDakMsd0NBQXdDO1FBQ3hDLGdCQUFnQjtRQUNoQix3REFBd0Q7UUFDeEQsYUFBYTtRQUNiLFNBQVM7UUFDVCxJQUFJO1FBQ0osU0FBUztRQUNULHdDQUF3QztRQUN4Qyw2REFBNkQ7UUFDN0QsaUNBQWlDO1FBQ2pDLHdDQUF3QztRQUN4QyxnQkFBZ0I7UUFDaEIsd0RBQXdEO1FBQ3hELGFBQWE7UUFDYixTQUFTO1FBQ1QsSUFBSTtJQUNSLENBQUM7SUE5RWEsWUFBRyxHQUFhLG1DQUFnQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQWdGekUsZUFBQztDQWxGRCxBQWtGQyxJQUFBO2tCQWxGb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNpbmdsZXRvbkZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9VdGlscy9TaW5nbGV0b25GYWN0b3J5XCI7XG5pbXBvcnQgUnVudGltZU1nciBmcm9tIFwiLi4vUnVudGltZU1nclwiO1xuaW1wb3J0IFBhdGhzIGZyb20gXCIuLi8uLi8uLi9CYXNlL1V0aWxzL1BhdGhzXCI7XG5pbXBvcnQgeyBJVHV0b3JpYWwgfSBmcm9tIFwiLi9MZXZlbC9JVHV0b3JpYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHVyb3JpYWwge1xuXG4gICAgcHVibGljIHN0YXRpYyBpbnM6IFR1cm9yaWFsID0gU2luZ2xldG9uRmFjdG9yeS5nZXRJbnN0YW5jZShUdXJvcmlhbCk7XG5cbiAgICBwcml2YXRlIHJldHJ5Q291bnQgPSAwO1xuXG4gICAgLyoqXG4gICAgICog5ou/5oyH5a6a562J57qn55qE6YWN572u5paH5Lu2LOm7mOiupOWPluW9k+WJjeWFs+WNoVxuICAgICAqIEBwYXJhbSBsdiBcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0VHVyQ2ZnRGF0YShsdjogbnVtYmVyID0gbnVsbCwgY2FsbGJhY2s/OiBGdW5jdGlvbik6IFByb21pc2U8SVR1dG9yaWFsPiB7XG5cbiAgICAgICAgbHYgPSBsdiB8fCBSdW50aW1lTWdyLmlucy5nZXRNYXRjaDNMZXZlbCgpO1xuICAgICAgICBpZiAobHYgPiBSdW50aW1lTWdyLmlucy5tYXhNYXRjaDNMZXZlbCkge1xuICAgICAgICAgICAgbHYgPSBSdW50aW1lTWdyLmlucy5tYXhNYXRjaDNMZXZlbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlzUmVtb3RSZXFldXN0OiBib29sZWFuID0gdGhpcy5yZXRyeUNvdW50IDwgMjtcbiAgICAgICAgY29uc3QgcGF0aDogc3RyaW5nID0gaXNSZW1vdFJlcWV1c3QgPyBQYXRocy5UdXJvcmlhbFJlbW90UGF0aCA6IFBhdGhzLlR1cm9yaWFsQ2ZnUGF0aDtcbiAgICAgICAgY29uc3QgY2ZnID0gYXdhaXQgdGhpcy5fcmVxdWVzdFR1cm9yaWFsKGx2LCBwYXRoLCBpc1JlbW90UmVxZXVzdCk7XG4gICAgICAgIGlmIChjZmcpIHtcbiAgICAgICAgICAgIHRoaXMucmV0cnlDb3VudCA9IDA7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhjZmcpO1xuICAgICAgICAgICAgcmV0dXJuIGNmZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmV0cnlDb3VudCsrO1xuICAgICAgICAgICAgaWYgKHRoaXMucmV0cnlDb3VudCA+IDUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFR1ckNmZ0RhdGEobHYsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKuaaguaXtuS7jnJlc291cmNlc+mHjOWktOWPlizlpoLmnpzlkI7mnJ/pnIDopoHlj5ZjZG4u5YaN5pS5ICovXG4gICAgcHJpdmF0ZSBfcmVxdWVzdFR1cm9yaWFsKGx2OiBudW1iZXIsIHA6IHN0cmluZywgaXNSZW1vdFJlcWV1c3Q6IGJvb2xlYW4pOiBQcm9taXNlPElUdXRvcmlhbD4ge1xuICAgICAgICBjb25zdCBsdlN0ciA9ICcwMDAwJyArIGx2O1xuICAgICAgICBjb25zdCBwYXRoID0gYCR7cH1sZXZlbHMtMCR7TWF0aC5mbG9vcigobHYgLSAxKSAvIDEwMCkgKyAxfS8ke2x2U3RyLnNsaWNlKC00KX0uanNvbmA7Ly9gJHtQYXRocy5MZXZlbENmZ1BhdGh9JHtsdn1gO1xuICAgICAgICBjb25zdCBsb2FkU3RyID0gaXNSZW1vdFJlcWV1c3QgPyAnbG9hZCcgOiAnbG9hZFJlcydcbiAgICAgICAgY29uc29sZS5lcnJvcihsb2FkU3RyLCBwYXRoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjYy5sb2FkZXJbbG9hZFN0cl0ocGF0aCwgKGVyciwgcmVzOiBjYy5Kc29uQXNzZXQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyIHx8ICFyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUoaXNSZW1vdFJlcWV1c3QgPyByZXMgOiByZXMuanNvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBjb25zdCBsdlN0ciA9ICcwMDAwJyArIGx2O1xuICAgICAgICAvLyBjb25zdCBwYXRoID0gYCR7cH1sZXZlbHMtMCR7TWF0aC5mbG9vcigobHYgLSAxKSAvIDEwMCkgKyAxfS8ke2x2U3RyLnNsaWNlKC00KX0uanNvbmA7Ly9gJHtQYXRocy5MZXZlbENmZ1BhdGh9JHtsdn1gO1xuICAgICAgICAvLyBjb25zdCBsb2FkU3RyID0gaXNSZW1vdFJlcWV1c3QgPyAnbG9hZCcgOiAnbG9hZFJlcydcbiAgICAgICAgLy8gY29uc29sZS5lcnJvcihsb2FkU3RyLCBwYXRoKTtcbiAgICAgICAgLy8gLy8gcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIC8vIC8vICAgICBjYy5sb2FkZXJbbG9hZFN0cl0ocGF0aCwgKGVyciwgcmVzOiBjYy5Kc29uQXNzZXQpID0+IHtcbiAgICAgICAgLy8gLy8gICAgICAgICBpZiAoZXJyIHx8ICFyZXMpIHtcbiAgICAgICAgLy8gLy8gICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgIC8vIC8vICAgICAgICAgfVxuICAgICAgICAvLyAvLyAgICAgICAgIHJlc29sdmUoaXNSZW1vdFJlcWV1c3QgPyByZXMgOiByZXMuanNvbik7XG4gICAgICAgIC8vIC8vICAgICB9KTtcbiAgICAgICAgLy8gLy8gfSlcbiAgICAgICAgLy8gaWYoaXNSZW1vdFJlcWV1c3QpIHtcbiAgICAgICAgLy8gICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAvLyAgICAgY2MubG9hZGVyW1wibG9hZFJlc1wiXShwYXRoLGNjLkFzc2V0LChjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSkgPT4ge30sKGVyciwgcmVzOiBjYy5Kc29uQXNzZXQpPT57XG4gICAgICAgIC8vICAgICAgICAgICAgIGlmIChlcnIgfHwgIXJlcykge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICAgICAgcmVzb2x2ZShpc1JlbW90UmVxZXVzdCA/IHJlcyA6IHJlcy5qc29uKTtcbiAgICAgICAgLy8gICAgICAgICB9KVxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgLy8gICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIGNjLmxvYWRlcltcImxvYWRcIl0ocGF0aCwoZXJyLCByZXM6IGNjLkpzb25Bc3NldCk9PntcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYgKGVyciB8fCAhcmVzKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICByZXNvbHZlKGlzUmVtb3RSZXFldXN0ID8gcmVzIDogcmVzLmpzb24pO1xuICAgICAgICAvLyAgICAgICAgIH0pXG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyB9XG4gICAgfVxuXG59Il19