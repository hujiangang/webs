
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/Table/BytesTable.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'db940Xdfw9ENI5/e0XRkq/F', 'BytesTable');
// Script/Base/Manager/Table/BytesTable.ts

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
exports.BytesTable = void 0;
var Paths_1 = require("../../Utils/Paths");
var HttpRequest_1 = require("../../Network/HttpRequest");
var Common_1 = require("../../../Logic/Common/Common");
var StorageMgr_1 = require("../StorageMgr");
var BytesTable = /** @class */ (function () {
    function BytesTable(afpb) {
        this.CLS = "";
        this._afpb = null;
        this._isReady = false;
        this._isLoading = false;
        this._afpb = afpb;
    }
    /**
     * 加载线上cdn的配置表
     * @param fileName 这个文件名应该以md5做版本管理
     */
    BytesTable.prototype.requestTableData = function (fileName) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var isWeb, tablePath, vKey, dKey, data, v, jsonAss, http;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isWeb = true;
                        tablePath = isWeb ? "" + Paths_1.default.NativeTablePath + fileName : "" + Paths_1.default.CDNTablePath + fileName;
                        vKey = "__" + fileName + "_version_";
                        dKey = "__" + fileName + "_data_";
                        data = null;
                        v = StorageMgr_1.StorageMgr.RingStorage.week().getValue(vKey, null);
                        if (v) {
                            data = StorageMgr_1.StorageMgr.RingStorage.week().getValue(dKey, null);
                        }
                        if (!(!data || isWeb)) return [3 /*break*/, 4];
                        if (!isWeb) return [3 /*break*/, 2];
                        return [4 /*yield*/, Common_1.default.getRes(tablePath, cc.JsonAsset)];
                    case 1:
                        jsonAss = _a.sent();
                        data = jsonAss.json;
                        return [3 /*break*/, 4];
                    case 2:
                        http = new HttpRequest_1.HttpRequest(tablePath, HttpRequest_1.HttpRequest.METHOD.GET);
                        return [4 /*yield*/, http.execute()];
                    case 3:
                        data = _a.sent();
                        _a.label = 4;
                    case 4:
                        resolve(data);
                        if (data) {
                            // StorageMgr.RingStorage.week().setValue(vKey, fileName);
                            // StorageMgr.RingStorage.week().setValue(dKey, data);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    Object.defineProperty(BytesTable.prototype, "isReady", {
        get: function () {
            if (!this._isReady) {
                this.loadTable();
            }
            return this._isReady;
        },
        enumerable: false,
        configurable: true
    });
    BytesTable.prototype.loadTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._isLoading) {
                            return [2 /*return*/];
                        }
                        this._isLoading = true;
                        return [4 /*yield*/, this.requestTableData(this.CLS)];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            // data = this.conversionData2pb(data); 
                            data = typeof data == 'string' ? JSON.parse(data) : data;
                            this.readyOK(data);
                        }
                        this._isLoading = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    BytesTable.prototype.conversionData2pb = function (data) {
        var pbc = this._afpb[this.CLS];
        var c = pbc ? pbc['decode'](data) : null;
        if (c && c.Ary) {
            return c.Ary;
        }
    };
    /**
     * 拆分表格属性
     * @param originalData
     */
    BytesTable.prototype.splitAttribute = function (originalData) {
        return null;
    };
    return BytesTable;
}());
exports.BytesTable = BytesTable;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxUYWJsZVxcQnl0ZXNUYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBc0M7QUFDdEMseURBQXdEO0FBQ3hELHVEQUFrRDtBQUNsRCw0Q0FBMkM7QUFFM0M7SUFRSSxvQkFBWSxJQUFJO1FBTk4sUUFBRyxHQUFXLEVBQUUsQ0FBQTtRQUVoQixVQUFLLEdBQUcsSUFBSSxDQUFBO1FBQ1osYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBR3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO0lBQ3JCLENBQUM7SUFFRDs7O09BR0c7SUFDSyxxQ0FBZ0IsR0FBeEIsVUFBeUIsUUFBZ0I7UUFBekMsaUJBMkJDO1FBMUJHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBTyxPQUFPOzs7Ozt3QkFDdkIsS0FBSyxHQUFHLElBQUksQ0FBQzt3QkFDYixTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFHLGVBQUssQ0FBQyxlQUFlLEdBQUcsUUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFHLGVBQUssQ0FBQyxZQUFZLEdBQUcsUUFBVSxDQUFDO3dCQUMvRixJQUFJLEdBQUcsT0FBSyxRQUFRLGNBQVcsQ0FBQzt3QkFDaEMsSUFBSSxHQUFHLE9BQUssUUFBUSxXQUFRLENBQUM7d0JBRS9CLElBQUksR0FBRyxJQUFJLENBQUM7d0JBQ1YsQ0FBQyxHQUFHLHVCQUFVLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQzdELElBQUksQ0FBQyxFQUFFOzRCQUNILElBQUksR0FBRyx1QkFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO3lCQUM3RDs2QkFDRyxDQUFBLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQSxFQUFkLHdCQUFjOzZCQUNWLEtBQUssRUFBTCx3QkFBSzt3QkFDeUIscUJBQU0sZ0JBQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBQTs7d0JBQXBFLE9BQU8sR0FBaUIsU0FBNEM7d0JBQzFFLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDOzs7d0JBRWQsSUFBSSxHQUFHLElBQUkseUJBQVcsQ0FBQyxTQUFTLEVBQUUseUJBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3pELHFCQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBQTs7d0JBQTNCLElBQUksR0FBRyxTQUFvQixDQUFDOzs7d0JBR3BDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDZCxJQUFJLElBQUksRUFBRTs0QkFDTiwwREFBMEQ7NEJBQzFELHNEQUFzRDt5QkFDekQ7Ozs7YUFDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsc0JBQVcsK0JBQU87YUFBbEI7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO2FBQ25CO1lBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRWEsOEJBQVMsR0FBdkI7Ozs7Ozt3QkFDSSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7NEJBQ2pCLHNCQUFNO3lCQUNUO3dCQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO3dCQUNaLHFCQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUE7O3dCQUE1QyxJQUFJLEdBQUcsU0FBcUM7d0JBQ2hELElBQUksSUFBSSxFQUFFOzRCQUNOLHdDQUF3Qzs0QkFDeEMsSUFBSSxHQUFHLE9BQU8sSUFBSSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUN6RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUN0Qjt3QkFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzs7Ozs7S0FDM0I7SUFFTyxzQ0FBaUIsR0FBekIsVUFBMEIsSUFBUztRQUMvQixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUU7WUFDWixPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBS0Q7OztPQUdHO0lBQ08sbUNBQWMsR0FBeEIsVUFBeUIsWUFBb0I7UUFDekMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVMLGlCQUFDO0FBQUQsQ0FyRkEsQUFxRkMsSUFBQTtBQXJGcUIsZ0NBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGF0aHMgZnJvbSBcIi4uLy4uL1V0aWxzL1BhdGhzXCI7XG5pbXBvcnQgeyBIdHRwUmVxdWVzdCB9IGZyb20gXCIuLi8uLi9OZXR3b3JrL0h0dHBSZXF1ZXN0XCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuLi8uLi8uLi9Mb2dpYy9Db21tb24vQ29tbW9uXCI7XG5pbXBvcnQgeyBTdG9yYWdlTWdyIH0gZnJvbSBcIi4uL1N0b3JhZ2VNZ3JcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJ5dGVzVGFibGUge1xuXG4gICAgcHJvdGVjdGVkIENMUzogc3RyaW5nID0gXCJcIlxuXG4gICAgcHJvdGVjdGVkIF9hZnBiID0gbnVsbFxuICAgIHByb3RlY3RlZCBfaXNSZWFkeSA9IGZhbHNlO1xuICAgIHByb3RlY3RlZCBfaXNMb2FkaW5nID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihhZnBiKSB7XG4gICAgICAgIHRoaXMuX2FmcGIgPSBhZnBiXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yqg6L2957q/5LiKY2Ru55qE6YWN572u6KGoXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOi/meS4quaWh+S7tuWQjeW6lOivpeS7pW1kNeWBmueJiOacrOeuoeeQhlxuICAgICAqL1xuICAgIHByaXZhdGUgcmVxdWVzdFRhYmxlRGF0YShmaWxlTmFtZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc1dlYiA9IHRydWU7Ly9QbGF0Zm9ybU1nci5pbnMudHlwZSA9PSBQbGF0Zm9ybVR5cGUuV2ViO1xuICAgICAgICAgICAgY29uc3QgdGFibGVQYXRoID0gaXNXZWIgPyBgJHtQYXRocy5OYXRpdmVUYWJsZVBhdGh9JHtmaWxlTmFtZX1gIDogYCR7UGF0aHMuQ0ROVGFibGVQYXRofSR7ZmlsZU5hbWV9YDtcbiAgICAgICAgICAgIGNvbnN0IHZLZXkgPSBgX18ke2ZpbGVOYW1lfV92ZXJzaW9uX2A7XG4gICAgICAgICAgICBjb25zdCBkS2V5ID0gYF9fJHtmaWxlTmFtZX1fZGF0YV9gO1xuXG4gICAgICAgICAgICBsZXQgZGF0YSA9IG51bGw7XG4gICAgICAgICAgICBjb25zdCB2ID0gU3RvcmFnZU1nci5SaW5nU3RvcmFnZS53ZWVrKCkuZ2V0VmFsdWUodktleSwgbnVsbCk7XG4gICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBTdG9yYWdlTWdyLlJpbmdTdG9yYWdlLndlZWsoKS5nZXRWYWx1ZShkS2V5LCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZGF0YSB8fCBpc1dlYikge1xuICAgICAgICAgICAgICAgIGlmIChpc1dlYikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBqc29uQXNzOiBjYy5Kc29uQXNzZXQgPSBhd2FpdCBDb21tb24uZ2V0UmVzKHRhYmxlUGF0aCwgY2MuSnNvbkFzc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGpzb25Bc3MuanNvbjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBodHRwID0gbmV3IEh0dHBSZXF1ZXN0KHRhYmxlUGF0aCwgSHR0cFJlcXVlc3QuTUVUSE9ELkdFVCk7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBhd2FpdCBodHRwLmV4ZWN1dGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAvLyBTdG9yYWdlTWdyLlJpbmdTdG9yYWdlLndlZWsoKS5zZXRWYWx1ZSh2S2V5LCBmaWxlTmFtZSk7XG4gICAgICAgICAgICAgICAgLy8gU3RvcmFnZU1nci5SaW5nU3RvcmFnZS53ZWVrKCkuc2V0VmFsdWUoZEtleSwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgaXNSZWFkeSgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc1JlYWR5KSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRUYWJsZSgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzUmVhZHk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBsb2FkVGFibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0xvYWRpbmcpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzTG9hZGluZyA9IHRydWU7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgdGhpcy5yZXF1ZXN0VGFibGVEYXRhKHRoaXMuQ0xTKTtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIC8vIGRhdGEgPSB0aGlzLmNvbnZlcnNpb25EYXRhMnBiKGRhdGEpOyBcbiAgICAgICAgICAgIGRhdGEgPSB0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UoZGF0YSkgOiBkYXRhO1xuICAgICAgICAgICAgdGhpcy5yZWFkeU9LKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzTG9hZGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29udmVyc2lvbkRhdGEycGIoZGF0YTogYW55KTogYW55IHtcbiAgICAgICAgY29uc3QgcGJjID0gdGhpcy5fYWZwYlt0aGlzLkNMU107XG4gICAgICAgIGNvbnN0IGMgPSBwYmMgPyBwYmNbJ2RlY29kZSddKGRhdGEpIDogbnVsbDtcbiAgICAgICAgaWYgKGMgJiYgYy5BcnkpIHtcbiAgICAgICAgICAgIHJldHVybiBjLkFyeTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiDlh4blpIflrozmr5Ug5byA5aeL54GM5YWl5pWw5o2uICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHJlYWR5T0soZGF0YTogYW55KTtcblxuICAgIC8qKlxuICAgICAqIOaLhuWIhuihqOagvOWxnuaAp1xuICAgICAqIEBwYXJhbSBvcmlnaW5hbERhdGEgXG4gICAgICovXG4gICAgcHJvdGVjdGVkIHNwbGl0QXR0cmlidXRlKG9yaWdpbmFsRGF0YTogc3RyaW5nKTogTWFwPGFueSwgYW55PiB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxufSJdfQ==