
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/test.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFx0ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUErQztBQUMvQywwREFBeUQ7QUFDekQsZ0RBQTJDO0FBQzNDLGtEQUFpRDtBQUNqRCw0REFBMkQ7QUFDM0Qsc0RBQWlEO0FBQ2pELDhDQUE4QztBQUM5QyxzREFBaUQ7QUFDM0MsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFJNUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUErR0M7UUFoRFcsUUFBRSxHQUFXLElBQUksQ0FBQTs7SUFnRDdCLENBQUM7SUE3R1MscUJBQU0sR0FBWjs7Ozs7O3dCQUNJLHFCQUFxQjt3QkFHckIsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFHVCxxQkFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxFQUFBOzt3QkFBdkMsTUFBTSxHQUFHLFNBQThCO3dCQUM3QyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7OztLQUV6QjtJQUVELG9CQUFLLEdBQUw7UUFFSSx1QkFBdUI7UUFDdkIseUJBQXlCO1FBQ3pCLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBR3RCLGtCQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxVQUFDLElBQUksRUFBRSxLQUFLO1lBRXZELE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRS9CLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUViLENBQUM7SUFFYSwwQkFBVyxH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QUFDO0NBL0dELEFBK0dDLENBL0dpQyxFQUFFLENBQUMsU0FBUyxHQStHN0M7a0JBL0dvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuL0Jhc2UvTWFuYWdlci9FdmVudE1nclwiO1xuaW1wb3J0IHsgSHR0cFJlcXVlc3QgfSBmcm9tIFwiLi9CYXNlL05ldHdvcmsvSHR0cFJlcXVlc3RcIjtcbmltcG9ydCBTY29rZXQgZnJvbSBcIi4vQmFzZS9OZXR3b3JrL1NvY2tldFwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi9Mb2dpYy9EYXRhL0NvbnN0L0V2ZW50XCI7XG5pbXBvcnQgeyBHYW1lVGFibGVNZ3IgfSBmcm9tIFwiLi9CYXNlL01hbmFnZXIvR2FtZVRhYmxlTWdyXCI7XG5pbXBvcnQgUnVudGltZU1nciBmcm9tIFwiLi9Mb2dpYy9EYXRhL1J1bnRpbWVNZ3JcIjtcbmltcG9ydCB7IEN1cnJlbmN5SWQgfSBmcm9tIFwiLi9CYXNlL0Jhc2VDb25zdFwiO1xuaW1wb3J0IExldmVsIGZyb20gXCIuL0xvZ2ljL0RhdGEvSW50ZXJmYWNlL0xldmVsXCI7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0ZXN0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIGFzeW5jIG9uTG9hZCgpIHtcbiAgICAgICAgLy8gdGhpcy5faW5pdEV2ZW50KCk7XG5cblxuICAgICAgICBjb25zb2xlLmVycm9yKCdvbmxvYWQnKTtcblxuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IExldmVsLmlucy5nZXRMdkNmZ0RhdGEoKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihyZXN1bHQpO1xuXG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgLy8gdGhpcy5fcmVxdWVzdFRlc3QoKTtcbiAgICAgICAgLy8gdGhpcy5fd2Vic29ja2V0VGVzdCgpO1xuICAgICAgICAvLyB0aGlzLl90ZXN0U291bmQoKTtcbiAgICAgICAgdGhpcy5fdGVzdEdldFRhYmxlKCk7XG4gICAgICAgIHRoaXMuX3Rlc3RQbGF5ZXJNZ3IoKTtcblxuXG4gICAgICAgIEV2ZW50TWdyLmlucy5yZWdpc3RlcihFdmVudC5VSS5VcGRhdGVDdXJyZW5jeSwgKHR5cGUsIGNvdW50KSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IodHlwZSwgY291bnQpO1xuXG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBfdGVzdExvYWRMdigpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IExldmVsLmlucy5nZXRMdkNmZ0RhdGEoKTtcbiAgICAgICAgY29uc29sZS5lcnJvcihkYXRhKTtcblxuICAgIH1cblxuICAgIHByaXZhdGUgX3Rlc3RQbGF5ZXJNZ3IoKSB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIF90ZXN0R2V0VGFibGUoKSB7XG5cbiAgICAgICAgYXdhaXQgR2FtZVRhYmxlTWdyLmlucy5leGVjdXRlKCk7XG4gICAgICAgIC8vdGVzdFxuICAgICAgICAvLyBMb2cuaSgnaWQxIOihqOWGheWuuSA6ICcsIEdhbWVUYWJsZU1nci5pbnMudGVzdFRhYmxlLmdldEJ5UHJpbWFyeUtleSgxKSk7XG4gICAgICAgIC8vIExvZy5pKCflpJrooajlhoXlrrkgOiAnLCBHYW1lVGFibGVNZ3IuaW5zLnRlc3RUYWJsZS5nZXRCeVByaW1hcnlLZXlzKFsyLCAzXSkpO1xuICAgICAgICAvLyBMb2cuaShHYW1lVGFibGVNZ3IuaW5zLnRlc3RUYWJsZS5nZXREYXRhKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Rlc3RTb3VuZCgpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuU291bmQuUGxheUJHTSk7XG4gICAgICAgIH0sIDEpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdEV2ZW50KCkge1xuXG4gICAgICAgIEV2ZW50TWdyLmlucy5yZWdpc3RlcignMScsIHRoaXMudGVzdDEsIHRoaXMpO1xuICAgICAgICBFdmVudE1nci5pbnMucmVnaXN0ZXIoJzEnLCB0aGlzLnRlc3QyLCB0aGlzKTtcblxuICAgIH1cblxuICAgIHByaXZhdGUgd3M6IFNjb2tldCA9IG51bGxcbiAgICBwcml2YXRlIGFzeW5jIF93ZWJzb2NrZXRUZXN0KCkge1xuICAgICAgICB0aGlzLndzID0gbmV3IFNjb2tldCgnd3M6Ly8xOTIuMTY4LjkxLjEwMjozMDAxJyk7XG4gICAgICAgIGF3YWl0IHRoaXMud3MuY29ubmVjdCgpO1xuXG4gICAgICAgIHRoaXMud3Muc2VuZCgnaGVsbG8gd3MnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbG9zZVdTKCkge1xuICAgICAgICB0aGlzLndzLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXF1ZXN0VGVzdCgpIHtcbiAgICAgICAgY29uc3QgdXJsID0gJ2h0dHA6Ly8xOS44LjkxLjEwMjozMDAwLyc7XG5cbiAgICAgICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KHVybCwgSHR0cFJlcXVlc3QuTUVUSE9ELkdFVCk7XG4gICAgICAgIHJlcS5leGVjdXRlKCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4ocmVzdWx0KTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHRlc3QyKCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ3Rlc3QyJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0ZXN0MSgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCd0ZXN0MScpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdGVzdDMoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybigndGVzdDMnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25Ub3VjaFRlc3RCdG4oKSB7XG4gICAgICAgIEV2ZW50TWdyLmlucy5zZW5kKCcxJyk7XG4gICAgICAgIEV2ZW50TWdyLmlucy51blJlZ2lzdGVyKCcxJywgdGhpcy50ZXN0MSwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uVG91Y2hBZGRDb2luT3JEaWFtb24oZXZlbnQsIGN1c3RvbVN0cikge1xuICAgICAgICBsZXQgdHlwZSA9IEN1cnJlbmN5SWQuQ29pblxuICAgICAgICBpZiAoY3VzdG9tU3RyID09IDEpIHtcbiAgICAgICAgICAgIHR5cGUgPSBDdXJyZW5jeUlkLkRpYW1vbmRcbiAgICAgICAgfVxuICAgICAgICBSdW50aW1lTWdyLmlucy5hZGRDdXJyZW5jeSh0eXBlLCAxMDApO1xuXG4gICAgICAgIHRoaXMuX3Rlc3RMb2FkTHYoKTtcbiAgICB9XG59XG4iXX0=