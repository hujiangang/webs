"use strict";
cc._RF.push(module, '514fdRPkCRKRqUha5xUlRI9', 'GMView');
// Script/Views/GMView.ts

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
exports.GMView = void 0;
var UIBase_1 = require("../Base/UI/UIBase");
var M_1 = require("../Base/Manager/M");
var BaseConst_1 = require("../Base/BaseConst");
var UIMgr_1 = require("../Base/Manager/UIMgr");
var UIData_1 = require("../Logic/Data/Interface/UIData");
var Common_1 = require("../Logic/Common/Common");
var Constant_1 = require("../Logic/Data/Const/Constant");
var StorageMgr_1 = require("../Base/Manager/StorageMgr");
var NetMgr_1 = require("../Base/Manager/NetMgr");
var Event_1 = require("../Logic/Data/Const/Event");
var Apps_1 = require("../Base/Apps");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GMView = /** @class */ (function (_super) {
    __extends(GMView, _super);
    function GMView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editCoin = null;
        _this.editDiamond = null;
        _this.editLevel = null;
        _this.editUserId = null;
        return _this;
    }
    GMView.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
    };
    GMView.prototype.start = function () {
        this.editLevel.string = Apps_1.default.isDebug ? "9999" : M_1.default.runtime.CurLevel.toString();
        this.editUserId.string = StorageMgr_1.StorageMgr.Storage.getString("__userId");
    };
    //增加金币
    GMView.prototype.onAddCoin = function () {
        var num = Number(this.editCoin.string) || 1000;
        M_1.default.runtime.addCurrency(BaseConst_1.CurrencyId.Coin, num);
        UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.GMView);
    };
    //增加钻石
    GMView.prototype.onAddDiamond = function () {
        var num = Number(this.editDiamond.string) || 100;
        M_1.default.runtime.addCurrency(BaseConst_1.CurrencyId.Diamond, num);
        UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.GMView);
    };
    GMView.prototype.onJumpLevel = function () {
        M_1.default.runtime.SelectLevel = 0;
        var nextLv = Number(this.editLevel.string) || (Apps_1.default.isDebug ? 9999 : 1);
        M_1.default.runtime.setMatch3Level(nextLv, true);
        Common_1.default.jumpScene(Constant_1.Scene.Match);
        UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.GMView);
    };
    //切换账号
    GMView.prototype.onChangePlayer = function () {
        var userId = this.RemoveChinese(this.editUserId.string) || Date.now().toString();
        StorageMgr_1.StorageMgr.Storage.setString("__userId", userId, true);
        window.location.reload();
    };
    GMView.prototype.onCleanPlayer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ss;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NetMgr_1.default.ins.cleanPlayer()];
                    case 1:
                        ss = _a.sent();
                        if (ss) {
                            window.location.reload();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GMView.prototype.onGameOver = function () {
        M_1.default.event.send(Event_1.Event.GameCMD.GameOver, true);
        this.onClickClose();
    };
    GMView.prototype.onClickClose = function () {
        UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.GMView);
    };
    GMView.prototype.RemoveChinese = function (strValue) {
        if (strValue != null && strValue != "") {
            var reg = /[\u4e00-\u9fa5]/g;
            return strValue.replace(reg, "");
        }
        else
            return "";
    };
    GMView.prototype.onWin = function () {
        M_1.default.runtime.SelectLevel = 0;
        var isNew = M_1.default.runtime.savaLvData(3);
        if (isNew) {
            //奖励!
            var info = M_1.default.table.LevelUpReward.getByPrimaryKey(M_1.default.runtime.CurLevel);
            if (info && info.rewards) {
                info.rewards.forEach(function (item) {
                    M_1.default.runtime.addCurrency(item.type, item.count);
                });
            }
        }
        UIMgr_1.default.ins.showUI(UIData_1.UIHudDef.GameOverWin, { type: UIData_1.UIHudDef.GameOverWin, data: 3 });
        M_1.default.runtime.setMatch3Level(M_1.default.runtime.CurLevel + 1);
        UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.GMView);
    };
    __decorate([
        property(cc.EditBox)
    ], GMView.prototype, "editCoin", void 0);
    __decorate([
        property(cc.EditBox)
    ], GMView.prototype, "editDiamond", void 0);
    __decorate([
        property(cc.EditBox)
    ], GMView.prototype, "editLevel", void 0);
    __decorate([
        property(cc.EditBox)
    ], GMView.prototype, "editUserId", void 0);
    GMView = __decorate([
        ccclass
    ], GMView);
    return GMView;
}(UIBase_1.default));
exports.GMView = GMView;

cc._RF.pop();