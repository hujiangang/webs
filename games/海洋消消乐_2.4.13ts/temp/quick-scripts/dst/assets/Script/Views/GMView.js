
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Views/GMView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
        this.editLevel.string = M_1.default.runtime.CurLevel.toString();
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
        var nextLv = Number(this.editLevel.string) || 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxWaWV3c1xcR01WaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBdUM7QUFDdkMsdUNBQWtDO0FBQ2xDLCtDQUErQztBQUMvQywrQ0FBMEM7QUFDMUMseURBQTBEO0FBQzFELGlEQUE0QztBQUM1Qyx5REFBcUQ7QUFDckQseURBQXdEO0FBQ3hELGlEQUE0QztBQUM1QyxtREFBa0Q7QUFFNUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFJNUM7SUFBNEIsMEJBQU07SUFBbEM7UUFBQSxxRUE4RkM7UUEzRkcsY0FBUSxHQUFlLElBQUksQ0FBQztRQUc1QixpQkFBVyxHQUFlLElBQUksQ0FBQztRQUcvQixlQUFTLEdBQWUsSUFBSSxDQUFDO1FBRzdCLGdCQUFVLEdBQWUsSUFBSSxDQUFDOztJQWtGbEMsQ0FBQztJQWhGRyx1QkFBTSxHQUFOO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHNCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxXQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0RCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyx1QkFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELE1BQU07SUFDQywwQkFBUyxHQUFoQjtRQUNJLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQztRQUMvQyxXQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxzQkFBVSxDQUFD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RSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7b0JBQ3JCLFdBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLENBQUMsQ0FBQTthQUNMO1NBQ0o7UUFDRCxlQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxpQkFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBUSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRixXQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqRCxlQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUExRkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzs0Q0FDTztJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDOytDQUNVO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7NkNBQ1E7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzs4Q0FDUztJQVpyQixNQUFNO1FBRGxCLE9BQU87T0FDSyxNQUFNLENBOEZsQjtJQUFELGFBQUM7Q0E5RkQsQUE4RkMsQ0E5RjJCLGdCQUFNLEdBOEZqQztBQTlGWSx3QkFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBVSUJhc2UgZnJvbSBcIi4uL0Jhc2UvVUkvVUlCYXNlXCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCB7IEN1cnJlbmN5SWQgfSBmcm9tIFwiLi4vQmFzZS9CYXNlQ29uc3RcIjtcbmltcG9ydCBVSU1nciBmcm9tIFwiLi4vQmFzZS9NYW5hZ2VyL1VJTWdyXCI7XG5pbXBvcnQgeyBVSUh1ZERlZiB9IGZyb20gXCIuLi9Mb2dpYy9EYXRhL0ludGVyZmFjZS9VSURhdGFcIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uL0xvZ2ljL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4uL0xvZ2ljL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCB7IFN0b3JhZ2VNZ3IgfSBmcm9tIFwiLi4vQmFzZS9NYW5hZ2VyL1N0b3JhZ2VNZ3JcIjtcbmltcG9ydCBOZXRNZ3IgZnJvbSBcIi4uL0Jhc2UvTWFuYWdlci9OZXRNZ3JcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uL0xvZ2ljL0RhdGEvQ29uc3QvRXZlbnRcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuXG5AY2NjbGFzc1xuZXhwb3J0IGNsYXNzIEdNVmlldyBleHRlbmRzIFVJQmFzZSB7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBlZGl0Q29pbjogY2MuRWRpdEJveCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBlZGl0RGlhbW9uZDogY2MuRWRpdEJveCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBlZGl0TGV2ZWw6IGNjLkVkaXRCb3ggPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gICAgZWRpdFVzZXJJZDogY2MuRWRpdEJveCA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmVkaXRMZXZlbC5zdHJpbmcgPSBNLnJ1bnRpbWUuQ3VyTGV2ZWwudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5lZGl0VXNlcklkLnN0cmluZyA9IFN0b3JhZ2VNZ3IuU3RvcmFnZS5nZXRTdHJpbmcoXCJfX3VzZXJJZFwiKTtcbiAgICB9XG5cbiAgICAvL+WinuWKoOmHkeW4gVxuICAgIHB1YmxpYyBvbkFkZENvaW4oKSB7XG4gICAgICAgIGxldCBudW0gPSBOdW1iZXIodGhpcy5lZGl0Q29pbi5zdHJpbmcpIHx8IDEwMDA7XG4gICAgICAgIE0ucnVudGltZS5hZGRDdXJyZW5jeShDdXJyZW5jeUlkLkNvaW4sIG51bSk7XG4gICAgICAgIFVJTWdyLmlucy5jbG9zZVVJKFVJSHVkRGVmLkdNVmlldyk7XG4gICAgfVxuXG4gICAgLy/lop7liqDpkrvnn7NcbiAgICBwdWJsaWMgb25BZGREaWFtb25kKCkge1xuICAgICAgICBsZXQgbnVtID0gTnVtYmVyKHRoaXMuZWRpdERpYW1vbmQuc3RyaW5nKSB8fCAxMDA7XG4gICAgICAgIE0ucnVudGltZS5hZGRDdXJyZW5jeShDdXJyZW5jeUlkLkRpYW1vbmQsIG51bSk7XG4gICAgICAgIFVJTWdyLmlucy5jbG9zZVVJKFVJSHVkRGVmLkdNVmlldyk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uSnVtcExldmVsKCkge1xuICAgICAgICBNLnJ1bnRpbWUuU2VsZWN0TGV2ZWwgPSAwO1xuICAgICAgICBjb25zdCBuZXh0THYgPSBOdW1iZXIodGhpcy5lZGl0TGV2ZWwuc3RyaW5nKSB8fCAxO1xuICAgICAgICBNLnJ1bnRpbWUuc2V0TWF0Y2gzTGV2ZWwobmV4dEx2LCB0cnVlKTtcbiAgICAgICAgQ29tbW9uLmp1bXBTY2VuZShTY2VuZS5NYXRjaCk7XG4gICAgICAgIFVJTWdyLmlucy5jbG9zZVVJKFVJSHVkRGVmLkdNVmlldyk7XG4gICAgfVxuXG4gICAgLy/liIfmjaLotKblj7dcbiAgICBwdWJsaWMgb25DaGFuZ2VQbGF5ZXIoKSB7XG4gICAgICAgIGxldCB1c2VySWQgPSB0aGlzLlJlbW92ZUNoaW5lc2UodGhpcy5lZGl0VXNlcklkLnN0cmluZykgfHwgRGF0ZS5ub3coKS50b1N0cmluZygpO1xuICAgICAgICBTdG9yYWdlTWdyLlN0b3JhZ2Uuc2V0U3RyaW5nKFwiX191c2VySWRcIiwgdXNlcklkLCB0cnVlKTtcblxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIG9uQ2xlYW5QbGF5ZXIoKSB7XG4gICAgICAgIGxldCBzcyA9IGF3YWl0IE5ldE1nci5pbnMuY2xlYW5QbGF5ZXIoKTtcbiAgICAgICAgaWYgKHNzKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25HYW1lT3ZlcigpIHtcbiAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LkdhbWVDTUQuR2FtZU92ZXIsIHRydWUpO1xuICAgICAgICB0aGlzLm9uQ2xpY2tDbG9zZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsaWNrQ2xvc2UoKSB7XG4gICAgICAgIFVJTWdyLmlucy5jbG9zZVVJKFVJSHVkRGVmLkdNVmlldyk7XG4gICAgfVxuXG4gICAgcHVibGljIFJlbW92ZUNoaW5lc2Uoc3RyVmFsdWUpIHtcbiAgICAgICAgaWYgKHN0clZhbHVlICE9IG51bGwgJiYgc3RyVmFsdWUgIT0gXCJcIikge1xuICAgICAgICAgICAgdmFyIHJlZyA9IC9bXFx1NGUwMC1cXHU5ZmE1XS9nO1xuICAgICAgICAgICAgcmV0dXJuIHN0clZhbHVlLnJlcGxhY2UocmVnLCBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25XaW4oKSB7XG4gICAgICAgIE0ucnVudGltZS5TZWxlY3RMZXZlbCA9IDA7XG4gICAgICAgIGNvbnN0IGlzTmV3ID0gTS5ydW50aW1lLnNhdmFMdkRhdGEoMyk7XG4gICAgICAgIGlmIChpc05ldykge1xuICAgICAgICAgICAgLy/lpZblirEhXG4gICAgICAgICAgICBjb25zdCBpbmZvID0gTS50YWJsZS5MZXZlbFVwUmV3YXJkLmdldEJ5UHJpbWFyeUtleShNLnJ1bnRpbWUuQ3VyTGV2ZWwpO1xuICAgICAgICAgICAgaWYgKGluZm8gJiYgaW5mby5yZXdhcmRzKSB7XG4gICAgICAgICAgICAgICAgaW5mby5yZXdhcmRzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIE0ucnVudGltZS5hZGRDdXJyZW5jeShpdGVtLnR5cGUsIGl0ZW0uY291bnQpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgVUlNZ3IuaW5zLnNob3dVSShVSUh1ZERlZi5HYW1lT3ZlcldpbiwgeyB0eXBlOiBVSUh1ZERlZi5HYW1lT3ZlcldpbiwgZGF0YTogMyB9KTtcbiAgICAgICAgTS5ydW50aW1lLnNldE1hdGNoM0xldmVsKE0ucnVudGltZS5DdXJMZXZlbCArIDEpO1xuICAgICAgICBVSU1nci5pbnMuY2xvc2VVSShVSUh1ZERlZi5HTVZpZXcpO1xuICAgIH1cbn0gICAiXX0=