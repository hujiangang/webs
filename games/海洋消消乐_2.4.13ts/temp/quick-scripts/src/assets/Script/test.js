"use strict";
cc._RF.push(module, '4900dcJSf5K0YAvZGM4iW7q', 'test');
// Script/test.ts

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
var EventMgr_1 = require("./Base/Manager/EventMgr");
var HttpRequest_1 = require("./Base/Network/HttpRequest");
var Socket_1 = require("./Base/Network/Socket");
var Event_1 = require("./Logic/Data/Const/Event");
var GameTableMgr_1 = require("./Base/Manager/GameTableMgr");
var RuntimeMgr_1 = require("./Logic/Data/RuntimeMgr");
var BaseConst_1 = require("./Base/BaseConst");
var Level_1 = require("./Logic/Data/Interface/Level");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var test = /** @class */ (function (_super) {
    __extends(test, _super);
    function test() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ws = null;
        return _this;
    }
    test.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // this._initEvent();
                        console.error('onload');
                        return [4 /*yield*/, Level_1.default.ins.getLvCfgData()];
                    case 1:
                        result = _a.sent();
                        console.error(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    test.prototype.start = function () {
        // this._requestTest();
        // this._websocketTest();
        // this._testSound();
        this._testGetTable();
        this._testPlayerMgr();
        EventMgr_1.default.ins.register(Event_1.Event.UI.UpdateCurrency, function (type, count) {
            console.error(type, count);
        }, this);
    };
    test.prototype._testLoadLv = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Level_1.default.ins.getLvCfgData()];
                    case 1:
                        data = _a.sent();
                        console.error(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    test.prototype._testPlayerMgr = function () {
    };
    test.prototype._testGetTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, GameTableMgr_1.GameTableMgr.ins.execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    test.prototype._testSound = function () {
        this.scheduleOnce(function () {
            EventMgr_1.default.ins.send(Event_1.Event.Sound.PlayBGM);
        }, 1);
    };
    test.prototype._initEvent = function () {
        EventMgr_1.default.ins.register('1', this.test1, this);
        EventMgr_1.default.ins.register('1', this.test2, this);
    };
    test.prototype._websocketTest = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.ws = new Socket_1.default('ws://192.168.91.102:3001');
                        return [4 /*yield*/, this.ws.connect()];
                    case 1:
                        _a.sent();
                        this.ws.send('hello ws');
                        return [2 /*return*/];
                }
            });
        });
    };
    test.prototype.onCloseWS = function () {
        this.ws.disconnect();
    };
    test.prototype._requestTest = function () {
        var url = 'http://19.8.91.102:3000/';
        var req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.GET);
        req.execute().then(function (result) {
            console.warn(result);
        });
    };
    test.prototype.test2 = function () {
        console.warn('test2');
    };
    test.prototype.test1 = function () {
        console.warn('test1');
    };
    test.prototype.test3 = function () {
        console.warn('test3');
    };
    test.prototype.onTouchTestBtn = function () {
        EventMgr_1.default.ins.send('1');
        EventMgr_1.default.ins.unRegister('1', this.test1, this);
    };
    test.prototype.onTouchAddCoinOrDiamon = function (event, customStr) {
        var type = BaseConst_1.CurrencyId.Coin;
        if (customStr == 1) {
            type = BaseConst_1.CurrencyId.Diamond;
        }
        RuntimeMgr_1.default.ins.addCurrency(type, 100);
        this._testLoadLv();
    };
    test = __decorate([
        ccclass
    ], test);
    return test;
}(cc.Component));
exports.default = test;

cc._RF.pop();