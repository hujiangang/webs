
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Loading/LoadingScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2e934QmhcRJrJAW1PYlvuYi', 'LoadingScene');
// Script/Logic/Loading/LoadingScene.ts

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
var M_1 = require("../../Base/Manager/M");
var Common_1 = require("../Common/Common");
var Constant_1 = require("../Data/Const/Constant");
var Level_1 = require("../Data/Interface/Level");
var Paths_1 = require("../../Base/Utils/Paths");
var DailyTaskInfo_1 = require("../../Base/Tabls/DailyTaskInfo");
var BaseTable_1 = require("../../Base/Manager/Table/BaseTable");
var GameTableMgr_1 = require("../../Base/Manager/GameTableMgr");
var Apps_1 = require("../../Base/Apps");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoadingScene = /** @class */ (function (_super) {
    __extends(LoadingScene, _super);
    function LoadingScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingLabel = null;
        _this.versionLabel = null;
        _this.loding = null;
        _this.progress = null;
        _this.startButton = null;
        return _this;
    }
    LoadingScene.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        M_1.default.init();
                        M_1.default.platform.init({ appId: Constant_1.APPID });
                        return [4 /*yield*/, this._withTimeout(M_1.default.net.login(), 3000, null, "登录")];
                    case 1:
                        data = _a.sent();
                        /**解析远程用户数据! */
                        M_1.default.runtime.initRemotData(data);
                        /**解析配置表 */
                        return [4 /*yield*/, this._withTimeout(GameTableMgr_1.GameTableMgr.ins.execute(), 5000, false, "配置表加载")];
                    case 2:
                        /**解析配置表 */
                        _a.sent();
                        this._updateProgress(10);
                        /**预加载三消主玩法 */
                        this._preLoadMatch3();
                        /**每日任务模块 */
                        this._initDailyTask();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
        private _preLoadMapScene() {
            cc.director.preloadScene(Scene.Map, null, (error: Error, asset: cc.SceneAsset) => {
                let buildingArr = [];
                let buildingState = StorageMgr.Storage.getObject(StorageMgr.Storage.BuildingState);
                let exchanges = asset.scene.getComponentsInChildren(Exchange);
                exchanges.forEach((exchange: Exchange) => {
                    if (exchange.enabled) {
                        let key = exchange.buildingId;
                        let singleBuildState = buildingState ? buildingState[key] : null;
                        if (singleBuildState) {
                            buildingArr.push('prefab/map/' + exchange.path + singleBuildState.state);
                        } else {
                            buildingArr.push('prefab/map/' + exchange.path + exchange.state);
                        }
                    }
                });
                for (let i = 1; i <= 25; i++) {
                    buildingArr.push('texture/map/bg/map_' + (i < 10 ? '0' + i : i));
                }
                cc.loader.loadResArray(buildingArr, null, (err, resource: any[]) => {
                    if (!err) {
                        console.log('预加载map资源完毕!');
                    } else {
                        console.warn("加载出错" + err);
                    }
                })
            });
        }
    */
    /**预加载酒店的关系信息 */
    // private _preLoadAccData() {
    //     //请求访客信息
    //     M.net.getOnlineList().then(data => {
    //     });
    //     //请求好友信息
    //     M.net.getFriendList().then(data => {
    //     });
    //     //请求事件信息
    //     M.net.getInteractiveList().then(data => {
    //     });
    // }
    //进入游戏直接加载三消主玩法
    LoadingScene.prototype._preLoadMatch3 = function () {
        var _this = this;
        var testLevel = Apps_1.default.isDebug ? 9999 : null;
        var preloadArr = [
            "prefab/ui/GameLoading",
            "prefab/ui/GameShowTarget",
            "prefab/ui/GameWin",
            "prefab/ui/GameFail",
            "prefab/ui/GameFailEncourage",
            "texture/guide/guide_role_2"
        ];
        cc.loader.loadResArray(preloadArr, function (completedCount, totalCount, item) {
            _this._updateProgress(Math.ceil(10 + (completedCount / totalCount) * 40));
        }, function (err, resource) {
            if (err) {
                console.error('预加载三消资源出错!', err);
                return;
            }
            cc.director.preloadScene(Constant_1.Scene.Match, function (completedCount, totalCount, item) {
                _this._updateProgress(Math.ceil(50 + (completedCount / totalCount) * 50));
            }, function (error) {
                if (error) {
                    console.error('预加载三消场景出错!', error);
                    return;
                }
                // 预加载测试关卡或当前关卡
                Level_1.default.ins.getLvCfgData(testLevel);
                _this._updateProgress(100);
                _this.scheduleOnce(function () {
                    M_1.default.runtime.SelectLevel = testLevel || 0;
                    Common_1.default.jumpScene(Constant_1.Scene.Match);
                }, 0.2);
            });
        });
    };
    LoadingScene.prototype._initDailyTask = function () {
        var _this = this;
        //请求配置!
        cc.loader.load(Paths_1.default.DailyTaskConfig, function (err, tex) { return __awaiter(_this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (err || !tex) {
                            console.error('获取任务配置出错!');
                            return [2 /*return*/];
                        }
                        GameTableMgr_1.GameTableMgr.ins.DailyTaskInfo = new BaseTable_1.BaseTable("id", "DailyTaskInfo", DailyTaskInfo_1.default, null);
                        GameTableMgr_1.GameTableMgr.ins.DailyTaskInfo['readyOK'](tex);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = M_1.default.runtime;
                        return [4 /*yield*/, this._withTimeout(M_1.default.net.getDailyTask(), 3000, null, "每日任务数据")];
                    case 2:
                        _a.DailyTaskProgress = _b.sent();
                        M_1.default.runtime.initTaskNativeData();
                        console.error(' M.runtime.DailyTaskProgress: ', M_1.default.runtime.DailyTaskProgress);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.warn('每日任务初始化失败，不影响主玩法进入:', error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    LoadingScene.prototype._updateProgress = function (progress) {
        this.loadingLabel.string = '加载中 ' + progress + '%';
    };
    LoadingScene.prototype._withTimeout = function (promise, timeoutMs, fallback, name) {
        return new Promise(function (resolve) {
            var finished = false;
            var timer = setTimeout(function () {
                if (finished) {
                    return;
                }
                finished = true;
                console.warn(name + "\u8D85\u65F6\uFF0C\u4F7F\u7528\u672C\u5730\u515C\u5E95\u7EE7\u7EED\u6E38\u620F");
                resolve(fallback);
            }, timeoutMs);
            promise.then(function (result) {
                if (finished) {
                    return;
                }
                finished = true;
                clearTimeout(timer);
                resolve(result);
            }).catch(function (error) {
                if (finished) {
                    return;
                }
                finished = true;
                clearTimeout(timer);
                console.warn(name + "\u5931\u8D25\uFF0C\u4F7F\u7528\u672C\u5730\u515C\u5E95\u7EE7\u7EED\u6E38\u620F:", error);
                resolve(fallback);
            });
        });
    };
    LoadingScene.prototype.testDownloadZip = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://mini-game-cent251001060.cos.ap-guangzhou.myqcloud.com/soe/test.zip';
                        return [4 /*yield*/, M_1.default.platform.downLoadFile({ url: url, filePath: null })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        property(cc.Label)
    ], LoadingScene.prototype, "loadingLabel", void 0);
    __decorate([
        property(cc.Label)
    ], LoadingScene.prototype, "versionLabel", void 0);
    __decorate([
        property(cc.Node)
    ], LoadingScene.prototype, "loding", void 0);
    __decorate([
        property(cc.Node)
    ], LoadingScene.prototype, "progress", void 0);
    __decorate([
        property(cc.Node)
    ], LoadingScene.prototype, "startButton", void 0);
    LoadingScene = __decorate([
        ccclass
    ], LoadingScene);
    return LoadingScene;
}(cc.Component));
exports.default = LoadingScene;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTG9hZGluZ1xcTG9hZGluZ1NjZW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDBDQUFxQztBQUNyQywyQ0FBc0M7QUFDdEMsbURBQXNEO0FBQ3RELGlEQUE0QztBQUM1QyxnREFBMkM7QUFDM0MsZ0VBQTJEO0FBQzNELGdFQUErRDtBQUMvRCxnRUFBK0Q7QUFDL0Qsd0NBQW1DO0FBRTdCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBcUxDO1FBbExHLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFHdkIsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixpQkFBVyxHQUFZLElBQUksQ0FBQzs7SUFzS2hDLENBQUM7SUFwS1MsNkJBQU0sR0FBWjs7Ozs7O3dCQUVJLFdBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDVCxXQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxnQkFBSyxFQUFFLENBQUMsQ0FBQzt3QkFHckIscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUE7O3dCQUEvRCxJQUFJLEdBQUcsU0FBd0Q7d0JBQ3JFLGVBQWU7d0JBQ2YsV0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzlCLFdBQVc7d0JBQ1gscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQywyQkFB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R3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1U7SUFmWCxZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBcUxoQztJQUFELG1CQUFDO0NBckxELEFBcUxDLENBckx5QyxFQUFFLENBQUMsU0FBUyxHQXFMckQ7a0JBckxvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCBDb21tb24gZnJvbSBcIi4uL0NvbW1vbi9Db21tb25cIjtcbmltcG9ydCB7IFNjZW5lLCBBUFBJRCB9IGZyb20gXCIuLi9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5pbXBvcnQgTGV2ZWwgZnJvbSBcIi4uL0RhdGEvSW50ZXJmYWNlL0xldmVsXCI7XG5pbXBvcnQgUGF0aHMgZnJvbSBcIi4uLy4uL0Jhc2UvVXRpbHMvUGF0aHNcIjtcbmltcG9ydCBEYWlseVRhc2tJbmZvIGZyb20gXCIuLi8uLi9CYXNlL1RhYmxzL0RhaWx5VGFza0luZm9cIjtcbmltcG9ydCB7IEJhc2VUYWJsZSB9IGZyb20gXCIuLi8uLi9CYXNlL01hbmFnZXIvVGFibGUvQmFzZVRhYmxlXCI7XG5pbXBvcnQgeyBHYW1lVGFibGVNZ3IgfSBmcm9tIFwiLi4vLi4vQmFzZS9NYW5hZ2VyL0dhbWVUYWJsZU1nclwiO1xuaW1wb3J0IEFwcHMgZnJvbSBcIi4uLy4uL0Jhc2UvQXBwc1wiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZ1NjZW5lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsb2FkaW5nTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB2ZXJzaW9uTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGxvZGluZzogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwcm9ncmVzczogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBzdGFydEJ1dHRvbjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBhc3luYyBvbkxvYWQoKSB7XG5cbiAgICAgICAgTS5pbml0KCk7XG4gICAgICAgIE0ucGxhdGZvcm0uaW5pdCh7IGFwcElkOiBBUFBJRCB9KTtcblxuICAgICAgICAvKirov5vooYznmbvlvZXvvIzmtYvor5Xnjq/looPnvZHnu5zlvILluLjml7bkuI3pmLvloZ7ov5vlhaXkuLvnjqnms5UgKi9cbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuX3dpdGhUaW1lb3V0KE0ubmV0LmxvZ2luKCksIDMwMDAsIG51bGwsIFwi55m75b2VXCIpO1xuICAgICAgICAvKirop6PmnpDov5znqIvnlKjmiLfmlbDmja4hICovXG4gICAgICAgIE0ucnVudGltZS5pbml0UmVtb3REYXRhKGRhdGEpO1xuICAgICAgICAvKirop6PmnpDphY3nva7ooaggKi9cbiAgICAgICAgYXdhaXQgdGhpcy5fd2l0aFRpbWVvdXQoR2FtZVRhYmxlTWdyLmlucy5leGVjdXRlKCksIDUwMDAsIGZhbHNlLCBcIumFjee9ruihqOWKoOi9vVwiKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlUHJvZ3Jlc3MoMTApO1xuICAgICAgICAvKirpooTliqDovb3kuInmtojkuLvnjqnms5UgKi9cbiAgICAgICAgdGhpcy5fcHJlTG9hZE1hdGNoMygpO1xuICAgICAgICAvKirmr4/ml6Xku7vliqHmqKHlnZcgKi9cbiAgICAgICAgdGhpcy5faW5pdERhaWx5VGFzaygpO1xuICAgIH1cbiAgICAvKlxuICAgICAgICBwcml2YXRlIF9wcmVMb2FkTWFwU2NlbmUoKSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUoU2NlbmUuTWFwLCBudWxsLCAoZXJyb3I6IEVycm9yLCBhc3NldDogY2MuU2NlbmVBc3NldCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBidWlsZGluZ0FyciA9IFtdO1xuICAgICAgICAgICAgICAgIGxldCBidWlsZGluZ1N0YXRlID0gU3RvcmFnZU1nci5TdG9yYWdlLmdldE9iamVjdChTdG9yYWdlTWdyLlN0b3JhZ2UuQnVpbGRpbmdTdGF0ZSk7XG4gICAgICAgICAgICAgICAgbGV0IGV4Y2hhbmdlcyA9IGFzc2V0LnNjZW5lLmdldENvbXBvbmVudHNJbkNoaWxkcmVuKEV4Y2hhbmdlKTtcbiAgICAgICAgICAgICAgICBleGNoYW5nZXMuZm9yRWFjaCgoZXhjaGFuZ2U6IEV4Y2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChleGNoYW5nZS5lbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gZXhjaGFuZ2UuYnVpbGRpbmdJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzaW5nbGVCdWlsZFN0YXRlID0gYnVpbGRpbmdTdGF0ZSA/IGJ1aWxkaW5nU3RhdGVba2V5XSA6IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2luZ2xlQnVpbGRTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkaW5nQXJyLnB1c2goJ3ByZWZhYi9tYXAvJyArIGV4Y2hhbmdlLnBhdGggKyBzaW5nbGVCdWlsZFN0YXRlLnN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRpbmdBcnIucHVzaCgncHJlZmFiL21hcC8nICsgZXhjaGFuZ2UucGF0aCArIGV4Y2hhbmdlLnN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDI1OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRpbmdBcnIucHVzaCgndGV4dHVyZS9tYXAvYmcvbWFwXycgKyAoaSA8IDEwID8gJzAnICsgaSA6IGkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNBcnJheShidWlsZGluZ0FyciwgbnVsbCwgKGVyciwgcmVzb3VyY2U6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6aKE5Yqg6L29bWFw6LWE5rqQ5a6M5q+VIScpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwi5Yqg6L295Ye66ZSZXCIgKyBlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgKi9cblxuICAgIC8qKumihOWKoOi9vemFkuW6l+eahOWFs+ezu+S/oeaBryAqL1xuICAgIC8vIHByaXZhdGUgX3ByZUxvYWRBY2NEYXRhKCkge1xuICAgIC8vICAgICAvL+ivt+axguiuv+WuouS/oeaBr1xuICAgIC8vICAgICBNLm5ldC5nZXRPbmxpbmVMaXN0KCkudGhlbihkYXRhID0+IHtcblxuICAgIC8vICAgICB9KTtcbiAgICAvLyAgICAgLy/or7fmsYLlpb3lj4vkv6Hmga9cbiAgICAvLyAgICAgTS5uZXQuZ2V0RnJpZW5kTGlzdCgpLnRoZW4oZGF0YSA9PiB7XG5cbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICAgIC8v6K+35rGC5LqL5Lu25L+h5oGvXG4gICAgLy8gICAgIE0ubmV0LmdldEludGVyYWN0aXZlTGlzdCgpLnRoZW4oZGF0YSA9PiB7XG5cbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfVxuXG4gICAgLy/ov5vlhaXmuLjmiI/nm7TmjqXliqDovb3kuInmtojkuLvnjqnms5VcbiAgICBwcml2YXRlIF9wcmVMb2FkTWF0Y2gzKCkge1xuICAgICAgICBjb25zdCB0ZXN0TGV2ZWwgPSBBcHBzLmlzRGVidWcgPyA5OTk5IDogbnVsbDtcbiAgICAgICAgY29uc3QgcHJlbG9hZEFyciA9IFtcbiAgICAgICAgICAgIFwicHJlZmFiL3VpL0dhbWVMb2FkaW5nXCIsXG4gICAgICAgICAgICBcInByZWZhYi91aS9HYW1lU2hvd1RhcmdldFwiLFxuICAgICAgICAgICAgXCJwcmVmYWIvdWkvR2FtZVdpblwiLFxuICAgICAgICAgICAgXCJwcmVmYWIvdWkvR2FtZUZhaWxcIixcbiAgICAgICAgICAgIFwicHJlZmFiL3VpL0dhbWVGYWlsRW5jb3VyYWdlXCIsXG4gICAgICAgICAgICBcInRleHR1cmUvZ3VpZGUvZ3VpZGVfcm9sZV8yXCJcbiAgICAgICAgXTtcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNBcnJheShwcmVsb2FkQXJyLCAoY29tcGxldGVkQ291bnQ6IG51bWJlciwgdG90YWxDb3VudDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVByb2dyZXNzKE1hdGguY2VpbCgxMCArIChjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQpICogNDApKTtcbiAgICAgICAgfSwgKGVyciwgcmVzb3VyY2U6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign6aKE5Yqg6L295LiJ5raI6LWE5rqQ5Ye66ZSZIScsIGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKFNjZW5lLk1hdGNoLCAoY29tcGxldGVkQ291bnQ6IG51bWJlciwgdG90YWxDb3VudDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVQcm9ncmVzcyhNYXRoLmNlaWwoNTAgKyAoY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50KSAqIDUwKSk7XG4gICAgICAgICAgICB9LCAoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+mihOWKoOi9veS4iea2iOWcuuaZr+WHuumUmSEnLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g6aKE5Yqg6L295rWL6K+V5YWz5Y2h5oiW5b2T5YmN5YWz5Y2hXG4gICAgICAgICAgICAgICAgTGV2ZWwuaW5zLmdldEx2Q2ZnRGF0YSh0ZXN0TGV2ZWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVByb2dyZXNzKDEwMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBNLnJ1bnRpbWUuU2VsZWN0TGV2ZWwgPSB0ZXN0TGV2ZWwgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgQ29tbW9uLmp1bXBTY2VuZShTY2VuZS5NYXRjaCk7XG4gICAgICAgICAgICAgICAgfSwgMC4yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0RGFpbHlUYXNrKCkge1xuICAgICAgICAvL+ivt+axgumFjee9riFcbiAgICAgICAgY2MubG9hZGVyLmxvYWQoUGF0aHMuRGFpbHlUYXNrQ29uZmlnLCBhc3luYyAoZXJyLCB0ZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIgfHwgIXRleCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+iOt+WPluS7u+WKoemFjee9ruWHuumUmSEnKTtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEdhbWVUYWJsZU1nci5pbnMuRGFpbHlUYXNrSW5mbyA9IG5ldyBCYXNlVGFibGU8bnVtYmVyLCBEYWlseVRhc2tJbmZvPihcImlkXCIsIFwiRGFpbHlUYXNrSW5mb1wiLCBEYWlseVRhc2tJbmZvLCBudWxsKTtcbiAgICAgICAgICAgIEdhbWVUYWJsZU1nci5pbnMuRGFpbHlUYXNrSW5mb1sncmVhZHlPSyddKHRleCk7XG5cbiAgICAgICAgICAgIC8v6Kej6KGo5a6M5oiQflxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBNLnJ1bnRpbWUuRGFpbHlUYXNrUHJvZ3Jlc3MgPSBhd2FpdCB0aGlzLl93aXRoVGltZW91dChNLm5ldC5nZXREYWlseVRhc2soKSwgMzAwMCwgbnVsbCwgXCLmr4/ml6Xku7vliqHmlbDmja5cIik7XG4gICAgICAgICAgICAgICAgTS5ydW50aW1lLmluaXRUYXNrTmF0aXZlRGF0YSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJyBNLnJ1bnRpbWUuRGFpbHlUYXNrUHJvZ3Jlc3M6ICcsIE0ucnVudGltZS5EYWlseVRhc2tQcm9ncmVzcyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybign5q+P5pel5Lu75Yqh5Yid5aeL5YyW5aSx6LSl77yM5LiN5b2x5ZON5Li7546p5rOV6L+b5YWlOicsIGVycm9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVQcm9ncmVzcyhwcm9ncmVzczogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubG9hZGluZ0xhYmVsLnN0cmluZyA9ICfliqDovb3kuK0gJyArIHByb2dyZXNzICsgJyUnO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3dpdGhUaW1lb3V0PFQ+KHByb21pc2U6IFByb21pc2U8VD4sIHRpbWVvdXRNczogbnVtYmVyLCBmYWxsYmFjazogVCwgbmFtZTogc3RyaW5nKTogUHJvbWlzZTxUPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpbmlzaGVkID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaW5pc2hlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bmFtZX3otoXml7bvvIzkvb/nlKjmnKzlnLDlhZzlupXnu6fnu63muLjmiI9gKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZhbGxiYWNrKTtcbiAgICAgICAgICAgIH0sIHRpbWVvdXRNcyk7XG5cbiAgICAgICAgICAgIHByb21pc2UudGhlbigocmVzdWx0OiBUKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke25hbWV95aSx6LSl77yM5L2/55So5pys5Zyw5YWc5bqV57un57ut5ri45oiPOmAsIGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZhbGxiYWNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgdGVzdERvd25sb2FkWmlwKCkge1xuICAgICAgICBjb25zdCB1cmwgPSAnaHR0cHM6Ly9taW5pLWdhbWUtY2VudDI1MTAwMTA2MC5jb3MuYXAtZ3Vhbmd6aG91Lm15cWNsb3VkLmNvbS9zb2UvdGVzdC56aXAnO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IE0ucGxhdGZvcm0uZG93bkxvYWRGaWxlKHsgdXJsOiB1cmwsIGZpbGVQYXRoOiBudWxsIH0pO1xuICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdkb3dubG9hZCBvayA6ICcsIHJlc3VsdCk7XG5cbiAgICB9XG59XG4iXX0=