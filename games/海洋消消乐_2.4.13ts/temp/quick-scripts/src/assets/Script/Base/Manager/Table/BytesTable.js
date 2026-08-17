"use strict";
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